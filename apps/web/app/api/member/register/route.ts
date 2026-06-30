import { NextResponse } from "next/server";
import { createMember } from "@/lib/member-account";

// 会员注册接口。校验 + 简单内存限流（单实例 best-effort 防滥用）。
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 10;

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  );
}
function rateLimited(ip: string): boolean {
  const rec = attempts.get(ip);
  return !!rec && Date.now() <= rec.resetAt && rec.count >= MAX;
}
function record(ip: string): void {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || now > rec.resetAt) attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  else rec.count++;
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "尝试过于频繁，请稍后再试" }, { status: 429 });
  }
  try {
    const body = await request.json();
    const name = String(body?.name || "");
    const email = String(body?.email || "");
    const password = String(body?.password || "");
    const confirm = String(body?.confirmPassword ?? body?.confirm ?? "");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "weak_password" }, { status: 400 });
    }
    if (confirm && confirm !== password) {
      return NextResponse.json({ error: "password_mismatch" }, { status: 400 });
    }

    record(ip);
    const result = createMember(email, password, name);
    if (!result.ok) {
      if (result.error === "exists") {
        return NextResponse.json({ error: "email_taken" }, { status: 409 });
      }
      return NextResponse.json({ error: "invalid" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "register_failed" }, { status: 500 });
  }
}
