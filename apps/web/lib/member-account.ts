import crypto from "crypto";
import fs from "fs";
import path from "path";

// 会员账号存储：扁平文件 data/members.json，密码用 scrypt 加盐哈希。
// 与管理员账号（lib/admin-account.ts）一致的哈希格式：`scrypt$salt$hash`。
// 这是开发/演示用的文件存储；生产应迁移到数据库（见架构文档）。
const membersFile = path.join(process.cwd(), "data", "members.json");

export interface Member {
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
}

/** 对外暴露给会话/资料的安全字段（不含密码哈希） */
export type PublicMember = Omit<Member, "passwordHash">;

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function hashPassword(password: string): string {
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

function readMembers(): Member[] {
  try {
    if (fs.existsSync(membersFile)) {
      const j = JSON.parse(fs.readFileSync(membersFile, "utf8"));
      if (Array.isArray(j)) return j as Member[];
    }
  } catch {}
  return [];
}

function writeMembers(list: Member[]): void {
  const dir = path.dirname(membersFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(membersFile, JSON.stringify(list, null, 2), "utf8");
}

export function memberExists(email: string): boolean {
  const e = normalizeEmail(email);
  return readMembers().some((m) => m.email === e);
}

/** 创建会员。返回 ok/错误码（错误码用于 API 决定文案/状态）。 */
export function createMember(
  email: string,
  password: string,
  name: string,
): { ok: true } | { ok: false; error: "exists" | "invalid" } {
  const e = normalizeEmail(email);
  if (!e || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return { ok: false, error: "invalid" };
  if (!password || password.length < 8) return { ok: false, error: "invalid" };
  const list = readMembers();
  if (list.some((m) => m.email === e)) return { ok: false, error: "exists" };
  list.push({
    email: e,
    name: (name || "").trim() || e.split("@")[0],
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  });
  writeMembers(list);
  return { ok: true };
}

/** 校验邮箱+密码，成功返回公开字段，失败返回 null。 */
export function verifyMember(email: string, password: string): PublicMember | null {
  const e = normalizeEmail(email);
  const m = readMembers().find((x) => x.email === e);
  if (!m) return null;
  if (!verifyHash(password, m.passwordHash)) return null;
  return { email: m.email, name: m.name, createdAt: m.createdAt };
}

export function getMember(email: string): PublicMember | null {
  const e = normalizeEmail(email);
  const m = readMembers().find((x) => x.email === e);
  return m ? { email: m.email, name: m.name, createdAt: m.createdAt } : null;
}
