import crypto from "crypto";
import { cookies } from "next/headers";

// 管理员（CMS 后台）会话：用 HMAC 签名的 cookie，避免明文 "auth=true" 被伪造。
// 与会员端的 NextAuth（lib/auth.ts）是两套独立系统，互不影响。
// 生产请设置 ADMIN_SESSION_SECRET；未设置时回退到固定开发密钥（不安全）。
const SECRET =
  process.env.ADMIN_SESSION_SECRET || "dev-insecure-secret-change-me";

export const SESSION_COOKIE = "auth";
export const SESSION_MAX_AGE = 60 * 60 * 24; // 1 天（秒）

function sign(value: string): string {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

/** 生成签名后的会话值：`<过期毫秒时间戳>.<hmac>` */
export function createSessionValue(): string {
  const payload = String(Date.now() + SESSION_MAX_AGE * 1000);
  return `${payload}.${sign(payload)}`;
}

/** 校验会话值：签名正确且未过期 */
export function verifySessionValue(token?: string | null): boolean {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = sign(payload);
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expBuf)) return false;
  const exp = Number(payload);
  return Number.isFinite(exp) && Date.now() < exp;
}

/** 读取请求 cookie 判断是否为已登录管理员 */
export function isAuthed(): boolean {
  return verifySessionValue(cookies().get(SESSION_COOKIE)?.value);
}
