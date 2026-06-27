import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import {
  getAllMessages,
  getMessages,
  saveMessages,
  LOCALES,
  type Locale,
} from "@/lib/messages";
import { snapshot } from "@/lib/backups";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// 读取 zh/en 双语文案（后台编辑用，需登录）
export async function GET() {
  if (!isAuthed()) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }
  return NextResponse.json(getAllMessages());
}

// 保存双语文案，body: { zh?: {...}, en?: {...} }（需登录）
export async function POST(request: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const saved: Locale[] = [];
    for (const locale of LOCALES) {
      if (body && body[locale] !== undefined) {
        snapshot(`messages-${locale}`, getMessages(locale));
        if (!saveMessages(locale, body[locale])) {
          return NextResponse.json(
            { error: `保存 ${locale} 失败` },
            { status: 400 },
          );
        }
        saved.push(locale);
      }
    }
    if (saved.length === 0) {
      return NextResponse.json({ error: "无可保存内容" }, { status: 400 });
    }
    return NextResponse.json({ success: true, saved });
  } catch (error) {
    console.error("Messages POST error:", error);
    return NextResponse.json({ error: "保存失败" }, { status: 500 });
  }
}
