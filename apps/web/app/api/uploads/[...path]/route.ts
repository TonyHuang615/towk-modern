import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// 通过 API 读盘伺服 public/uploads 下的运行时上传文件。
// 静态 public/ 在 `next start` / output:standalone 下不会伺服「构建后」写入的文件，
// 因此用户上传的截图 / CMS 图片需经此接口读取，确保生产环境也能访问。
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const uploadsRoot = path.join(process.cwd(), "public", "uploads");

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
};

export async function GET(
  _request: Request,
  { params }: { params: { path: string[] } },
) {
  const segments = params.path || [];

  // 防目录穿越：拒绝包含 .. 或空字节的片段
  if (segments.some((s) => s.includes("..") || s.includes("\0"))) {
    return new NextResponse("Bad request", { status: 400 });
  }

  const filePath = path.join(uploadsRoot, ...segments);

  // 解析后必须仍位于 uploads 目录内
  if (filePath !== uploadsRoot && !filePath.startsWith(uploadsRoot + path.sep)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) {
      return new NextResponse("Not found", { status: 404 });
    }
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME[ext] || "application/octet-stream";
    const data = fs.readFileSync(filePath);
    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": String(stat.size),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
