import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import { verifyCredentials, setPassword } from "@/lib/admin-account";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";

export async function POST(request: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }
  try {
    const { currentPassword, newPassword } = await request.json();
    if (!verifyCredentials(ADMIN_USERNAME, String(currentPassword || ""))) {
      return NextResponse.json({ error: "当前密码不正确" }, { status: 400 });
    }
    if (typeof newPassword !== "string" || newPassword.length < 8) {
      return NextResponse.json({ error: "新密码至少 8 位" }, { status: 400 });
    }
    if (!setPassword(newPassword)) {
      return NextResponse.json({ error: "保存失败" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "修改失败" }, { status: 500 });
  }
}
