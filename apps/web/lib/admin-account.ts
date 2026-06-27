import crypto from "crypto";
import fs from "fs";
import path from "path";

// 管理员账号口令校验。口令来源优先级：
//   1) data/admin.json 里的 passwordHash（后台「账号设置」改密写入）
//   2) 环境变量 ADMIN_PASSWORD_HASH（scrypt$salt$hash 格式）
//   3) 环境变量 ADMIN_PASSWORD 明文（仅开发兜底，默认 admin123）
// 用户名固定来自 ADMIN_USERNAME（默认 admin）。
const accountFile = path.join(process.cwd(), "data", "admin.json");
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64);
  return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}

function verifyHash(password: string, stored: string): boolean {
  const parts = stored.split("$");
  if (parts.length !== 3 || parts[0] !== "scrypt") return false;
  try {
    const salt = Buffer.from(parts[1], "hex");
    const expected = Buffer.from(parts[2], "hex");
    const actual = crypto.scryptSync(password, salt, expected.length);
    return (
      actual.length === expected.length &&
      crypto.timingSafeEqual(actual, expected)
    );
  } catch {
    return false;
  }
}

function timingEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) {
    crypto.timingSafeEqual(ab, ab); // 抹平长度差异的时序
    return false;
  }
  return crypto.timingSafeEqual(ab, bb);
}

function readStoredHash(): string | null {
  try {
    if (fs.existsSync(accountFile)) {
      const j = JSON.parse(fs.readFileSync(accountFile, "utf8"));
      if (typeof j.passwordHash === "string" && j.passwordHash) {
        return j.passwordHash;
      }
    }
  } catch {}
  if (process.env.ADMIN_PASSWORD_HASH) return process.env.ADMIN_PASSWORD_HASH;
  return null;
}

export function verifyCredentials(username: string, password: string): boolean {
  const uOk = timingEqual(username, ADMIN_USERNAME);
  const hash = readStoredHash();
  const pOk = hash
    ? verifyHash(password, hash)
    : timingEqual(password, process.env.ADMIN_PASSWORD || "admin123");
  return uOk && pOk;
}

export function setPassword(newPassword: string): boolean {
  try {
    const dir = path.dirname(accountFile);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const data = fs.existsSync(accountFile)
      ? JSON.parse(fs.readFileSync(accountFile, "utf8"))
      : {};
    data.passwordHash = hashPassword(newPassword);
    data.updatedAt = new Date().toISOString();
    fs.writeFileSync(accountFile, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("setPassword error:", error);
    return false;
  }
}

/** 是否仍在使用「未配置任何口令」的开发默认值（用于后台告警） */
export function usingDefaultPassword(): boolean {
  return !readStoredHash() && !process.env.ADMIN_PASSWORD;
}
