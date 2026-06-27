import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  createSessionValue,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/admin-auth";
import { verifyCredentials } from "@/lib/admin-account";

// 内存级登录限流（单实例部署有效，best-effort 防爆破）
const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 5 * 60 * 1000;
const MAX_FAILS = 8;

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  );
}
function isRateLimited(ip: string): boolean {
  const rec = attempts.get(ip);
  return !!rec && Date.now() <= rec.resetAt && rec.count >= MAX_FAILS;
}
function recordFail(ip: string): void {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || now > rec.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  } else {
    rec.count++;
  }
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "尝试过于频繁，请稍后再试" },
      { status: 429 },
    );
  }
  try {
    const { username, password } = await request.json();

    if (verifyCredentials(String(username || ""), String(password || ""))) {
      attempts.delete(ip);
      const cookieStore = cookies();
      cookieStore.set(SESSION_COOKIE, createSessionValue(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: SESSION_MAX_AGE,
      });

      return NextResponse.json({ success: true });
    }

    recordFail(ip);
    return NextResponse.json(
      { error: "用户名或密码错误" },
      { status: 401 },
    );
  } catch (error) {
    return NextResponse.json({ error: "登录失败" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = cookies();
    cookieStore.delete(SESSION_COOKIE);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
