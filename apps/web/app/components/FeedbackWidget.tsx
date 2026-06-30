"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquarePlus,
  X,
  Undo2,
  Trash2,
  Send,
  Loader2,
  Check,
  Pencil,
} from "lucide-react";

type Pt = { x: number; y: number };
type Stroke = { color: string; size: number; points: Pt[] };

const COLORS = ["#C0392B", "#D4A017", "#2C5F8A"]; // 品牌红 / 金 / 蓝
const BRUSH_SIZE = 4;

const STRINGS = {
  zh: {
    button: "意见反馈",
    title: "圈出您觉得需要改进的地方",
    subtitle: "用画笔在页面上圈选，并在下方留言",
    placeholder: "请描述您遇到的问题或建议……（选填）",
    submit: "提交反馈",
    submitting: "提交中……",
    cancel: "取消",
    undo: "撤销",
    clear: "清除",
    color: "画笔颜色",
    needContent: "请先圈选或填写意见",
    success: "感谢您的反馈！",
    error: "提交失败，请稍后再试",
  },
  en: {
    button: "Feedback",
    title: "Circle anything that needs improving",
    subtitle: "Draw on the page, then leave your message below",
    placeholder: "Describe the issue or suggestion… (optional)",
    submit: "Submit",
    submitting: "Submitting…",
    cancel: "Cancel",
    undo: "Undo",
    clear: "Clear",
    color: "Brush color",
    needContent: "Please circle an area or write a message first",
    success: "Thanks for your feedback!",
    error: "Submission failed, please try again",
  },
};

export default function FeedbackWidget() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = STRINGS[locale === "en" ? "en" : "zh"];

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const [hasStrokes, setHasStrokes] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(
    null,
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const strokesRef = useRef<Stroke[]>([]);
  const drawingRef = useRef<Stroke | null>(null);
  const colorRef = useRef(color);
  const scrollLockRef = useRef<{ html: string; body: string } | null>(null);

  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  const showToast = useCallback((type: "success" | "error", text: string) => {
    setToast({ type, text });
    window.setTimeout(() => setToast(null), 3200);
  }, []);

  // ─── 画布绘制 ──────────────────────────────────────────────
  const drawStroke = (ctx: CanvasRenderingContext2D, s: Stroke) => {
    if (s.points.length === 0) return;
    ctx.strokeStyle = s.color;
    ctx.fillStyle = s.color;
    ctx.lineWidth = s.size;
    if (s.points.length === 1) {
      const p = s.points[0];
      ctx.beginPath();
      ctx.arc(p.x, p.y, s.size / 2, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    ctx.beginPath();
    ctx.moveTo(s.points[0].x, s.points[0].y);
    for (let i = 1; i < s.points.length; i++) {
      ctx.lineTo(s.points[i].x, s.points[i].y);
    }
    ctx.stroke();
  };

  const redrawAll = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const s of strokesRef.current) drawStroke(ctx, s);
  }, []);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;
    redrawAll();
  }, [redrawAll]);

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>): Pt => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (submitting) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    const stroke: Stroke = {
      color: colorRef.current,
      size: BRUSH_SIZE,
      points: [getPoint(e)],
    };
    drawingRef.current = stroke;
    const ctx = ctxRef.current;
    if (ctx) drawStroke(ctx, stroke);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const stroke = drawingRef.current;
    const ctx = ctxRef.current;
    if (!stroke || !ctx) return;
    e.preventDefault();
    const p = getPoint(e);
    const last = stroke.points[stroke.points.length - 1];
    stroke.points.push(p);
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };

  const endStroke = () => {
    if (!drawingRef.current) return;
    strokesRef.current.push(drawingRef.current);
    drawingRef.current = null;
    setHasStrokes(true);
  };

  const undo = () => {
    strokesRef.current.pop();
    redrawAll();
    setHasStrokes(strokesRef.current.length > 0);
  };

  const clearAll = () => {
    strokesRef.current = [];
    redrawAll();
    setHasStrokes(false);
  };

  // ─── 打开 / 关闭 ───────────────────────────────────────────
  const lockScroll = () => {
    const el = document.documentElement;
    scrollLockRef.current = { html: el.style.overflow, body: document.body.style.overflow };
    el.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  };

  const unlockScroll = () => {
    const s = scrollLockRef.current;
    if (!s) return;
    document.documentElement.style.overflow = s.html;
    document.body.style.overflow = s.body;
    scrollLockRef.current = null;
  };

  const openWidget = () => {
    strokesRef.current = [];
    drawingRef.current = null;
    setHasStrokes(false);
    setMessage("");
    lockScroll();
    setOpen(true);
  };

  const closeWidget = useCallback(() => {
    setOpen(false);
    unlockScroll();
    strokesRef.current = [];
    drawingRef.current = null;
    setHasStrokes(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    setupCanvas();
    const onResize = () => setupCanvas();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !submitting) closeWidget();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, submitting, setupCanvas, closeWidget]);

  // 卸载时确保解锁滚动
  useEffect(() => () => unlockScroll(), []);

  // ─── 提交：截图 + 合成圈选 + 上报 ──────────────────────────
  const submit = async () => {
    if (!hasStrokes && !message.trim()) {
      showToast("error", t.needContent);
      return;
    }
    setSubmitting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const sx = window.scrollX;
      const sy = window.scrollY;

      const bodyBg = getComputedStyle(document.body).backgroundColor;
      const background =
        bodyBg && bodyBg !== "rgba(0, 0, 0, 0)" && bodyBg !== "transparent"
          ? bodyBg
          : "#f8f6f0";

      // html2canvas 会把整页按当前滚动量整体下移渲染，直接用 x/y 裁剪当前视口会
      // 截到错误的区域（页面顶部）。改为：先滚到顶 → 渲染整页 → 自行裁剪原视口
      // → 还原滚动，保证截图与用户所见一致。
      const prevScrollBehavior =
        document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      // 预滚动：framer-motion 的 whileInView 内容需进入视口后才显示（once:true，
      // 显示后保持）。整页渲染前快速滚一遍，避免把未触发的区块截成空白。
      const docHeight = document.documentElement.scrollHeight;
      const revealStep = Math.max(Math.round(vh * 0.9), 400);
      // ~90ms per step so IntersectionObserver (whileInView) actually fires
      for (let yy = 0; yy <= docHeight; yy += revealStep) {
        window.scrollTo(0, yy);
        await new Promise((r) => setTimeout(r, 90));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 120));
      const full = await html2canvas(document.body, {
        backgroundColor: background,
        useCORS: true,
        allowTaint: false,
        logging: false,
        scale: dpr,
        scrollX: 0,
        scrollY: 0,
        windowWidth: document.documentElement.clientWidth,
        windowHeight: document.documentElement.clientHeight,
        ignoreElements: (el) =>
          (el as HTMLElement)?.dataset?.feedbackIgnore === "true",
      });
      window.scrollTo(sx, sy);
      document.documentElement.style.scrollBehavior = prevScrollBehavior;

      // 裁剪出原视口区域，再把圈选画布叠加上去
      const out = document.createElement("canvas");
      out.width = Math.round(vw * dpr);
      out.height = Math.round(vh * dpr);
      const octx = out.getContext("2d");
      if (!octx) throw new Error("no 2d context");
      octx.drawImage(
        full,
        sx * dpr,
        sy * dpr,
        out.width,
        out.height,
        0,
        0,
        out.width,
        out.height,
      );
      if (canvasRef.current) {
        octx.drawImage(canvasRef.current, 0, 0, out.width, out.height);
      }
      const screenshot = out.toDataURL("image/jpeg", 0.85);

      const round4 = (n: number) => Math.round(n * 1e4) / 1e4;
      const strokes = strokesRef.current.map((s) => ({
        color: s.color,
        size: s.size,
        points: s.points.map(
          (p) => [round4(p.x / vw), round4(p.y / vh)] as [number, number],
        ),
      }));

      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          screenshot,
          url: window.location.href,
          path: window.location.pathname,
          title: document.title,
          viewport: { w: vw, h: vh, dpr },
          strokes,
          userAgent: navigator.userAgent,
        }),
      });

      if (!res.ok) throw new Error(`status ${res.status}`);
      closeWidget();
      showToast("success", t.success);
    } catch (err) {
      console.error("Feedback submit failed:", err);
      showToast("error", t.error);
    } finally {
      setSubmitting(false);
    }
  };

  // 后台 / 登录页不显示
  if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
    return null;
  }

  return (
    <div data-feedback-ignore="true">
      {/* 浮窗按钮 */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openWidget}
            aria-label={t.button}
            className="fixed bottom-24 right-4 z-[9980] flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-primary-foreground shadow-banner hover:bg-primary-hover lg:bottom-6 lg:right-6"
          >
            <MessageSquarePlus className="h-5 w-5" />
            <span className="hidden text-sm font-medium sm:inline">{t.button}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* 圈选 + 留言层 */}
      {open && (
        <>
          {/* 顶部提示条 */}
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed inset-x-0 top-0 z-[9992] flex items-center justify-between gap-3 border-b border-border bg-card/95 px-4 py-2.5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 text-foreground">
              <Pencil className="h-4 w-4 shrink-0 text-primary" />
              <div className="leading-tight">
                <p className="text-sm font-semibold">{t.title}</p>
                <p className="hidden text-xs text-muted-foreground sm:block">
                  {t.subtitle}
                </p>
              </div>
            </div>
            <button
              onClick={closeWidget}
              disabled={submitting}
              aria-label={t.cancel}
              className="rounded-full p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>

          {/* 绘图画布 */}
          <canvas
            ref={canvasRef}
            data-feedback-ignore="true"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endStroke}
            onPointerLeave={endStroke}
            onPointerCancel={endStroke}
            className="fixed inset-0 z-[9990] cursor-crosshair"
            style={{ touchAction: "none" }}
          />

          {/* 底部工具 + 留言 + 提交 */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed inset-x-0 bottom-0 z-[9992] border-t border-border bg-card/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm"
          >
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
              {/* 工具行 */}
              <div className="flex items-center gap-2">
                <span className="hidden text-xs text-muted-foreground sm:inline">
                  {t.color}
                </span>
                <div className="flex items-center gap-1.5">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      aria-label={c}
                      className={`h-6 w-6 rounded-full border-2 transition-transform ${
                        color === c
                          ? "scale-110 border-foreground"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <div className="mx-1 h-5 w-px bg-border" />
                <button
                  onClick={undo}
                  disabled={!hasStrokes || submitting}
                  className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-muted disabled:opacity-40"
                >
                  <Undo2 className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.undo}</span>
                </button>
                <button
                  onClick={clearAll}
                  disabled={!hasStrokes || submitting}
                  className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-muted disabled:opacity-40"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">{t.clear}</span>
                </button>
              </div>

              {/* 留言 + 操作 */}
              <div className="flex items-end gap-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.placeholder}
                  rows={2}
                  disabled={submitting}
                  className="flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30 disabled:opacity-60"
                />
                <div className="flex flex-col gap-2">
                  <button
                    onClick={closeWidget}
                    disabled={submitting}
                    className="rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-muted disabled:opacity-50"
                  >
                    {t.cancel}
                  </button>
                  <button
                    onClick={submit}
                    disabled={submitting}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-hover disabled:opacity-60"
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    <span className="whitespace-nowrap">
                      {submitting ? t.submitting : t.submit}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* 提交结果提示 */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 left-1/2 z-[9999] flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white shadow-lg ${
              toast.type === "success" ? "bg-emerald-600" : "bg-primary"
            }`}
          >
            {toast.type === "success" ? (
              <Check className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
