import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isAuthed } from "@/lib/admin-auth";

// 媒体库：管理 public/uploads 下的 CMS 上传图（不含 feedback 子目录的反馈截图）
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const uploadsDir = path.join(process.cwd(), "public", "uploads");

export async function GET() {
  if (!isAuthed()) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }
  try {
    if (!fs.existsSync(uploadsDir)) return NextResponse.json({ files: [] });
    const files = fs
      .readdirSync(uploadsDir, { withFileTypes: true })
      .filter((e) => e.isFile())
      .map((e) => {
        const stat = fs.statSync(path.join(uploadsDir, e.name));
        return {
          name: e.name,
          url: `/api/uploads/${e.name}`,
          size: stat.size,
          mtime: stat.mtimeMs,
        };
      })
      .sort((a, b) => b.mtime - a.mtime);
    return NextResponse.json({ files });
  } catch (error) {
    console.error("Media GET error:", error);
    return NextResponse.json({ error: "读取失败" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }
  const name = new URL(request.url).searchParams.get("name") || "";
  if (!name || name.includes("/") || name.includes("..") || name.includes("\0")) {
    return NextResponse.json({ error: "非法文件名" }, { status: 400 });
  }
  try {
    const filePath = path.join(uploadsDir, name);
    if (!filePath.startsWith(uploadsDir + path.sep)) {
      return NextResponse.json({ error: "禁止" }, { status: 403 });
    }
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "文件不存在" }, { status: 404 });
  } catch (error) {
    console.error("Media DELETE error:", error);
    return NextResponse.json({ error: "删除失败" }, { status: 500 });
  }
}
