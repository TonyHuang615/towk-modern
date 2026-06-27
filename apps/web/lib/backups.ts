import fs from "fs";
import path from "path";

// 每次保存 content / messages 前，把旧版本快照到 data/backups/<type>/<时间戳>.json，
// 供后台查看历史并一键回滚。每类最多保留 MAX_PER_TYPE 份，超出自动清理最旧的。
const backupsRoot = path.join(process.cwd(), "data", "backups");
const MAX_PER_TYPE = 30;

export const BACKUP_TYPES = ["content", "messages-zh", "messages-en"] as const;
export type BackupType = (typeof BACKUP_TYPES)[number];

function typeDir(type: string): string {
  const safe = type.replace(/[^a-zA-Z0-9_-]/g, "_");
  return path.join(backupsRoot, safe);
}

function fileTimeFromId(id: string): string {
  const base = id.replace(/\.json$/, "");
  const m = base.match(
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2})-(\d{2})-(\d{2})-(\d{3})Z$/,
  );
  if (m) return `${m[1]}-${m[2]}-${m[3]}T${m[4]}:${m[5]}:${m[6]}.${m[7]}Z`;
  return base;
}

export function snapshot(type: string, data: unknown): void {
  try {
    if (data === undefined || data === null) return;
    const dir = typeDir(type);
    fs.mkdirSync(dir, { recursive: true });
    const id = `${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
    fs.writeFileSync(path.join(dir, id), JSON.stringify(data, null, 2), "utf8");
    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".json"))
      .sort();
    if (files.length > MAX_PER_TYPE) {
      for (const f of files.slice(0, files.length - MAX_PER_TYPE)) {
        try {
          fs.unlinkSync(path.join(dir, f));
        } catch {}
      }
    }
  } catch (error) {
    console.error("snapshot error:", error);
  }
}

export function listBackups(type: string): { id: string; time: string }[] {
  try {
    const dir = typeDir(type);
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".json"))
      .sort()
      .reverse()
      .map((f) => ({ id: f, time: fileTimeFromId(f) }));
  } catch {
    return [];
  }
}

export function readBackup(type: string, id: string): unknown | null {
  if (!/^[a-zA-Z0-9._-]+\.json$/.test(id) || id.includes("..")) return null;
  try {
    return JSON.parse(fs.readFileSync(path.join(typeDir(type), id), "utf8"));
  } catch {
    return null;
  }
}
