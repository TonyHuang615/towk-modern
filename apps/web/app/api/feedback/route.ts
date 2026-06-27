import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { isAuthed } from "@/lib/admin-auth";
import {
  getFeedback,
  addFeedback,
  deleteFeedback,
  setFeedbackStatus,
  saveScreenshotFile,
  type FeedbackRecord,
  type FeedbackStroke,
} from "@/lib/feedback";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_SCREENSHOT_CHARS = 12_000_000; // base64 dataURL 上限，约 9MB
const MAX_MESSAGE_CHARS = 5000;
const MAX_STROKES = 500;

function sanitizeStrokes(input: unknown): FeedbackStroke[] {
  if (!Array.isArray(input)) return [];
  return input.slice(0, MAX_STROKES).map((s: any) => ({
    color: typeof s?.color === "string" ? s.color.slice(0, 32) : "#C0392B",
    size: Number.isFinite(s?.size) ? Number(s.size) : 4,
    points: Array.isArray(s?.points)
      ? s.points
          .slice(0, 5000)
          .map((p: any) => [Number(p?.[0]) || 0, Number(p?.[1]) || 0] as [number, number])
      : [],
  }));
}

// 提交反馈（前台公开调用）
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const screenshot: string = body?.screenshot ?? "";

    if (typeof screenshot !== "string" || !screenshot.startsWith("data:image/")) {
      return NextResponse.json({ error: "缺少有效的截图数据" }, { status: 400 });
    }
    if (screenshot.length > MAX_SCREENSHOT_CHARS) {
      return NextResponse.json({ error: "截图过大" }, { status: 413 });
    }

    const id = randomUUID();
    const url = saveScreenshotFile(id, screenshot);
    if (!url) {
      return NextResponse.json({ error: "截图格式不支持" }, { status: 400 });
    }

    const record: FeedbackRecord = {
      id,
      createdAt: new Date().toISOString(),
      message: String(body?.message ?? "").slice(0, MAX_MESSAGE_CHARS),
      url: String(body?.url ?? "").slice(0, 2048),
      path: String(body?.path ?? "").slice(0, 1024),
      title: String(body?.title ?? "").slice(0, 512),
      screenshot: url,
      viewport: {
        w: Number(body?.viewport?.w) || 0,
        h: Number(body?.viewport?.h) || 0,
        dpr: Number(body?.viewport?.dpr) || 1,
      },
      strokes: sanitizeStrokes(body?.strokes),
      userAgent: String(body?.userAgent ?? "").slice(0, 512),
      status: "new",
    };

    if (!addFeedback(record)) {
      return NextResponse.json({ error: "保存失败" }, { status: 500 });
    }
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Feedback POST error:", error);
    return NextResponse.json({ error: "提交失败" }, { status: 500 });
  }
}

// 查看全部反馈（后台，需登录），按时间倒序
export async function GET() {
  if (!isAuthed()) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }
  const list = getFeedback().sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
  return NextResponse.json({ feedback: list });
}

// 删除一条反馈（后台，需登录）
export async function DELETE(request: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }
  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "缺少 id" }, { status: 400 });
  }
  const removed = deleteFeedback(id);
  if (!removed) {
    return NextResponse.json({ error: "记录不存在" }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}

// 标记已读 / 未读（后台，需登录）
export async function PATCH(request: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }
  try {
    const { id, status } = await request.json();
    if (!id || (status !== "new" && status !== "read")) {
      return NextResponse.json({ error: "参数无效" }, { status: 400 });
    }
    if (!setFeedbackStatus(id, status)) {
      return NextResponse.json({ error: "记录不存在" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "更新失败" }, { status: 500 });
  }
}
