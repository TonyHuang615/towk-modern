import fs from "fs";
import path from "path";

/** 单条圈选笔画：points 为归一化坐标 [x, y]（相对截图视口，范围 0~1） */
export interface FeedbackStroke {
  color: string;
  size: number;
  points: [number, number][];
}

/** 一条用户反馈记录 */
export interface FeedbackRecord {
  id: string;
  createdAt: string; // ISO 时间
  message: string;
  url: string;
  path: string;
  title: string;
  screenshot: string; // 已合成圈选标注的截图，public 路径，如 /uploads/feedback/xxx.jpg
  viewport: { w: number; h: number; dpr: number };
  strokes: FeedbackStroke[];
  userAgent: string;
  status: "new" | "read";
}

const dataFilePath = path.join(process.cwd(), "data", "feedback.json");
const imgDir = path.join(process.cwd(), "public", "uploads", "feedback");

export function getFeedback(): FeedbackRecord[] {
  try {
    if (!fs.existsSync(dataFilePath)) return [];
    const raw = fs.readFileSync(dataFilePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Error reading feedback:", error);
    return [];
  }
}

function writeFeedback(list: FeedbackRecord[]): boolean {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(dataFilePath, JSON.stringify(list, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error saving feedback:", error);
    return false;
  }
}

export function addFeedback(record: FeedbackRecord): boolean {
  const list = getFeedback();
  list.push(record);
  return writeFeedback(list);
}

export function deleteFeedback(id: string): FeedbackRecord | null {
  const list = getFeedback();
  const idx = list.findIndex((f) => f.id === id);
  if (idx === -1) return null;
  const [removed] = list.splice(idx, 1);
  writeFeedback(list);
  deleteScreenshotFile(removed.screenshot);
  return removed;
}

export function setFeedbackStatus(
  id: string,
  status: FeedbackRecord["status"],
): boolean {
  const list = getFeedback();
  const item = list.find((f) => f.id === id);
  if (!item) return false;
  item.status = status;
  return writeFeedback(list);
}

/** 将 base64 dataURL 截图落盘，返回可访问的 public 路径；格式非法返回 null */
export function saveScreenshotFile(id: string, dataUrl: string): string | null {
  const match = /^data:image\/(png|jpe?g|webp);base64,(.+)$/i.exec(dataUrl);
  if (!match) return null;
  const ext = match[1].toLowerCase() === "jpeg" ? "jpg" : match[1].toLowerCase();
  try {
    const buffer = Buffer.from(match[2], "base64");
    if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
    const filename = `${id}.${ext}`;
    fs.writeFileSync(path.join(imgDir, filename), buffer);
    return `/uploads/feedback/${filename}`;
  } catch (error) {
    console.error("Error saving screenshot:", error);
    return null;
  }
}

function deleteScreenshotFile(publicPath: string): void {
  if (!publicPath || !publicPath.startsWith("/uploads/feedback/")) return;
  try {
    const filePath = path.join(process.cwd(), "public", publicPath);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch (error) {
    console.error("Error deleting screenshot:", error);
  }
}
