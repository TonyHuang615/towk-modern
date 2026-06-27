import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import {
  listBackups,
  readBackup,
  snapshot,
  BACKUP_TYPES,
} from "@/lib/backups";
import { getContent, saveContent } from "@/lib/cms";
import { getMessages, saveMessages } from "@/lib/messages";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function valid(type: string): boolean {
  return (BACKUP_TYPES as readonly string[]).includes(type);
}

// 列出某类备份，或读取单份内容（?type=&id=）
export async function GET(request: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "";
  const id = searchParams.get("id");
  if (!valid(type)) {
    return NextResponse.json({ error: "无效类型" }, { status: 400 });
  }
  if (id) {
    const data = readBackup(type, id);
    if (data == null) {
      return NextResponse.json({ error: "备份不存在" }, { status: 404 });
    }
    return NextResponse.json({ data });
  }
  return NextResponse.json({ backups: listBackups(type) });
}

// 回滚到指定备份（先快照当前版本，使回滚本身也可撤销）
export async function POST(request: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }
  try {
    const { type, id } = await request.json();
    if (!valid(type)) {
      return NextResponse.json({ error: "无效类型" }, { status: 400 });
    }
    const data = readBackup(type, id);
    if (data == null) {
      return NextResponse.json({ error: "备份不存在" }, { status: 404 });
    }
    if (type === "content") {
      snapshot("content", getContent());
      saveContent(data as Record<string, unknown>);
    } else if (type === "messages-zh") {
      snapshot("messages-zh", getMessages("zh"));
      saveMessages("zh", data);
    } else if (type === "messages-en") {
      snapshot("messages-en", getMessages("en"));
      saveMessages("en", data);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Backup restore error:", error);
    return NextResponse.json({ error: "回滚失败" }, { status: 500 });
  }
}
