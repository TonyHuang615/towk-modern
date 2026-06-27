"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  LogOut,
  ImageIcon,
  Trash2,
  X,
  ExternalLink,
  Inbox,
  Monitor,
  MessageSquare,
  ChevronUp,
  ChevronDown,
  Plus,
} from "lucide-react";

/** 列表条目卡片：统一的标题 + 上移/下移/删除控件 */
function ItemCard({
  title,
  index,
  total,
  onUp,
  onDown,
  onRemove,
  children,
}: {
  title: string;
  index: number;
  total: number;
  onUp: () => void;
  onDown: () => void;
  onRemove: () => void;
  children: React.ReactNode;
}) {
  const ctrlBtn =
    "p-1.5 rounded hover:bg-gray-100 text-gray-500 disabled:opacity-30 disabled:hover:bg-transparent";
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={onUp}
            disabled={index === 0}
            title="上移"
            className={ctrlBtn}
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onDown}
            disabled={index === total - 1}
            title="下移"
            className={ctrlBtn}
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            title="删除"
            className="p-1.5 rounded hover:bg-red-50 text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}

const MESSAGE_SECTION_LABELS: Record<string, string> = {
  nav: "导航",
  mobileNav: "移动端导航",
  hero: "首页横幅",
  announcements: "公告",
  about: "关于会馆",
  news: "新闻",
  history: "历史传承",
  conference: "恳亲大会",
  activities: "会馆活动",
  gallery: "影相库",
  contact: "联系我们",
  footer: "页脚",
  board: "理事会",
  structure: "组织架构",
  member: "会员",
  common: "通用",
};

/** 不可变地按路径写入嵌套值（保留数组结构） */
function setNested(obj: any, path: string[], value: any): any {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  if (Array.isArray(obj)) {
    const copy = obj.slice();
    copy[Number(head)] = setNested(copy[Number(head)], rest, value);
    return copy;
  }
  const cur = obj && typeof obj === "object" ? obj : {};
  return { ...cur, [head]: setNested(cur[head], rest, value) };
}

/** 递归渲染 zh / en 双语字段；叶子为输入框，对象/数组继续下钻 */
function MessageFields({
  zh,
  en,
  path,
  onChange,
}: {
  zh: any;
  en: any;
  path: string[];
  onChange: (path: string[], locale: "zh" | "en", value: string) => void;
}) {
  const keys = Array.from(
    new Set([...Object.keys(zh || {}), ...Object.keys(en || {})]),
  );
  return (
    <div className="space-y-2">
      {keys.map((k) => {
        const zv = zh ? zh[k] : undefined;
        const ev = en ? en[k] : undefined;
        const zObj = zv !== null && typeof zv === "object";
        const eObj = ev !== null && typeof ev === "object";
        const childPath = [...path, k];
        if (!zObj && !eObj) {
          return (
            <div
              key={k}
              className="grid grid-cols-[130px_1fr_1fr] gap-2 items-start"
            >
              <div className="pt-2 text-xs text-gray-500 break-all">{k}</div>
              <textarea
                value={zv == null ? "" : String(zv)}
                onChange={(e) => onChange(childPath, "zh", e.target.value)}
                rows={1}
                className="w-full px-2 py-1.5 border rounded text-sm resize-y"
              />
              <textarea
                value={ev == null ? "" : String(ev)}
                onChange={(e) => onChange(childPath, "en", e.target.value)}
                rows={1}
                className="w-full px-2 py-1.5 border rounded text-sm resize-y"
              />
            </div>
          );
        }
        return (
          <div key={k} className="border-l-2 border-gray-100 pl-3 py-1">
            <div className="mb-1 text-sm font-medium text-gray-600">{k}</div>
            <MessageFields
              zh={zObj ? zv : {}}
              en={eObj ? ev : {}}
              path={childPath}
              onChange={onChange}
            />
          </div>
        );
      })}
    </div>
  );
}

export default function AdminPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("site");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [preview, setPreview] = useState<any | null>(null);
  const [feedbackSearch, setFeedbackSearch] = useState("");
  const [feedbackFilter, setFeedbackFilter] = useState<"all" | "new" | "read">(
    "all",
  );
  const [messages, setMessages] = useState<any>(null);
  const [messagesSection, setMessagesSection] = useState<string>("");
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [messagesSaving, setMessagesSaving] = useState(false);
  const [backups, setBackups] = useState<{ id: string; time: string }[]>([]);
  const [backupType, setBackupType] = useState<string>("content");
  const [backupsLoading, setBackupsLoading] = useState(false);
  const [media, setMedia] = useState<
    { name: string; url: string; size: number; mtime: number }[]
  >([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaUploading, setMediaUploading] = useState(false);
  const [usingDefaultPw, setUsingDefaultPw] = useState(false);
  const [pwCurrent, setPwCurrent] = useState("");
  const [pwNew, setPwNew] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const savedContentRef = useRef<string>("");
  const savedMessagesRef = useRef<string>("");
  const dirtyRef = useRef(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const fetchFeedback = useCallback(async () => {
    setFeedbackLoading(true);
    try {
      const res = await fetch("/api/feedback");
      if (res.ok) {
        const data = await res.json();
        setFeedback(data.feedback || []);
      }
    } catch (error) {
      console.error("Failed to fetch feedback:", error);
    } finally {
      setFeedbackLoading(false);
    }
  }, []);

  const fetchMessages = useCallback(async () => {
    setMessagesLoading(true);
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        savedMessagesRef.current = JSON.stringify(data);
        setMessagesSection((s) => s || Object.keys(data.zh || {})[0] || "");
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setMessagesLoading(false);
    }
  }, []);

  const fetchBackups = useCallback(async (type: string) => {
    setBackupsLoading(true);
    try {
      const res = await fetch(`/api/backups?type=${type}`);
      if (res.ok) {
        const data = await res.json();
        setBackups(data.backups || []);
      }
    } catch (error) {
      console.error("Failed to fetch backups:", error);
    } finally {
      setBackupsLoading(false);
    }
  }, []);

  const fetchMedia = useCallback(async () => {
    setMediaLoading(true);
    try {
      const res = await fetch("/api/media");
      if (res.ok) {
        const data = await res.json();
        setMedia(data.files || []);
      }
    } catch (error) {
      console.error("Failed to fetch media:", error);
    } finally {
      setMediaLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "feedback") fetchFeedback();
  }, [activeTab, fetchFeedback]);

  useEffect(() => {
    if (activeTab === "messages" && !messages) fetchMessages();
  }, [activeTab, messages, fetchMessages]);

  useEffect(() => {
    if (activeTab === "backups") fetchBackups(backupType);
  }, [activeTab, backupType, fetchBackups]);

  useEffect(() => {
    if (activeTab === "media") fetchMedia();
  }, [activeTab, fetchMedia]);

  // 追踪未保存改动
  useEffect(() => {
    const cd = content && savedContentRef.current !== JSON.stringify(content);
    const md =
      messages && savedMessagesRef.current !== JSON.stringify(messages);
    const d = !!(cd || md);
    dirtyRef.current = d;
    setDirty(d);
  }, [content, messages]);

  // 离开页面前拦截未保存改动
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (dirtyRef.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  const deleteFeedback = async (id: string) => {
    if (!confirm("确定删除这条反馈吗？")) return;
    try {
      const res = await fetch(`/api/feedback?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setFeedback((prev) => prev.filter((f) => f.id !== id));
        setPreview((p: any) => (p?.id === id ? null : p));
      }
    } catch (error) {
      console.error("Failed to delete feedback:", error);
    }
  };

  const markRead = async (id: string) => {
    try {
      await fetch("/api/feedback", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "read" }),
      });
      setFeedback((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: "read" } : f)),
      );
    } catch (error) {
      console.error("Failed to mark read:", error);
    }
  };

  const onMsgChange = useCallback(
    (path: string[], locale: "zh" | "en", value: string) => {
      setMessages((prev: any) => ({
        ...prev,
        [locale]: setNested(prev[locale], path, value),
      }));
    },
    [],
  );

  const saveMessages = async () => {
    setMessagesSaving(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messages),
      });
      if (res.ok) {
        savedMessagesRef.current = JSON.stringify(messages);
        setDirty(false);
        setMessage("双语内容已保存！");
      } else {
        setMessage("保存失败，请重试");
      }
    } catch {
      setMessage("保存失败，请重试");
    } finally {
      setMessagesSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const rollback = async (id: string) => {
    if (!confirm("确定回滚到该版本？当前内容会先自动备份。")) return;
    try {
      const res = await fetch("/api/backups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: backupType, id }),
      });
      if (res.ok) {
        setMessage("已回滚到所选版本！");
        if (backupType === "content") {
          fetchContent();
        } else {
          setMessages(null);
        }
        fetchBackups(backupType);
      } else {
        setMessage("回滚失败，请重试");
      }
    } catch {
      setMessage("回滚失败，请重试");
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const exportFeedbackCsv = () => {
    const header = [
      "时间",
      "状态",
      "页面",
      "链接",
      "留言",
      "视口",
      "圈选数",
      "截图",
    ];
    const rows = [header];
    for (const f of feedback) {
      rows.push([
        new Date(f.createdAt).toLocaleString("zh-CN"),
        f.status === "new" ? "未读" : "已读",
        f.path || "",
        f.url || "",
        (f.message || "").replace(/\s+/g, " "),
        `${f.viewport?.w ?? ""}x${f.viewport?.h ?? ""}`,
        String(f.strokes?.length || 0),
        f.screenshot || "",
      ]);
    }
    const csv = rows
      .map((r) =>
        r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    const blob = new Blob(["﻿" + csv], {
      type: "text/csv;charset=utf-8",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `feedback-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const uploadMedia = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMediaUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        setMessage("上传成功！");
        fetchMedia();
      } else {
        setMessage("上传失败");
      }
    } catch {
      setMessage("上传失败");
    } finally {
      setMediaUploading(false);
      setTimeout(() => setMessage(""), 3000);
      e.target.value = "";
    }
  };

  const deleteMedia = async (name: string) => {
    if (!confirm("确定删除该图片？引用它的页面会失效。")) return;
    try {
      const res = await fetch(`/api/media?name=${encodeURIComponent(name)}`, {
        method: "DELETE",
      });
      if (res.ok) setMedia((prev) => prev.filter((m) => m.name !== name));
    } catch (error) {
      console.error("Failed to delete media:", error);
    }
  };

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setMessage("链接已复制");
      setTimeout(() => setMessage(""), 2000);
    } catch {}
  };

  const changePassword = async () => {
    if (pwNew.length < 8) {
      setMessage("新密码至少 8 位");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    if (pwNew !== pwConfirm) {
      setMessage("两次输入的新密码不一致");
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    setPwSaving(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: pwCurrent, newPassword: pwNew }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setMessage("密码已修改！");
        setPwCurrent("");
        setPwNew("");
        setPwConfirm("");
        setUsingDefaultPw(false);
      } else {
        setMessage(data.error || "修改失败");
      }
    } catch {
      setMessage("修改失败");
    } finally {
      setPwSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/check");
      if (!res.ok) {
        router.push("/login");
        return;
      }
      const authData = await res.json().catch(() => ({}));
      setUsingDefaultPw(!!authData.usingDefaultPassword);
      fetchContent();
      fetchFeedback();
    } catch {
      router.push("/login");
    }
  };

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/cms");
      const data = await res.json();
      setContent(data);
      savedContentRef.current = JSON.stringify(data);
    } catch (error) {
      console.error("Failed to fetch content:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/login");
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        savedContentRef.current = JSON.stringify(content);
        setDirty(false);
        setMessage("保存成功！");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch {
      setMessage("保存失败，请重试");
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    section: string,
    index?: number,
    field?: string,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(`${section}-${index ?? "single"}`);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        if (index !== undefined && field) {
          const arr = [...content[section][field]];
          arr[index] = { ...arr[index], image: data.url };
          setContent((prev: any) => ({
            ...prev,
            [section]: { ...prev[section], [field]: arr },
          }));
        }
        setMessage("图片上传成功！");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch {
      setMessage("图片上传失败");
    } finally {
      setUploading(null);
    }
  };

  const updateField = useCallback(
    (section: string, field: string, value: any) => {
      setContent((prev: any) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }));
    },
    [],
  );

  // ── 数组型内容的增 / 删 / 改 / 排序 ──
  const updateItem = useCallback(
    (section: string, field: string, index: number, patch: any) => {
      setContent((prev: any) => {
        const arr = [...(prev[section]?.[field] || [])];
        arr[index] = { ...arr[index], ...patch };
        return { ...prev, [section]: { ...prev[section], [field]: arr } };
      });
    },
    [],
  );

  const addItem = useCallback(
    (section: string, field: string, template: any) => {
      setContent((prev: any) => {
        const arr = [...(prev[section]?.[field] || []), template];
        return { ...prev, [section]: { ...prev[section], [field]: arr } };
      });
    },
    [],
  );

  const removeItem = useCallback(
    (section: string, field: string, index: number) => {
      setContent((prev: any) => {
        const arr = (prev[section]?.[field] || []).filter(
          (_: any, i: number) => i !== index,
        );
        return { ...prev, [section]: { ...prev[section], [field]: arr } };
      });
    },
    [],
  );

  const moveItem = useCallback(
    (section: string, field: string, index: number, dir: -1 | 1) => {
      setContent((prev: any) => {
        const arr = [...(prev[section]?.[field] || [])];
        const j = index + dir;
        if (j < 0 || j >= arr.length) return prev;
        [arr[index], arr[j]] = [arr[j], arr[index]];
        return { ...prev, [section]: { ...prev[section], [field]: arr } };
      });
    },
    [],
  );

  if (loading) return <div className="p-8">加载中...</div>;
  if (!content) return <div className="p-8">加载失败</div>;

  const newFeedbackCount = feedback.filter((f) => f.status === "new").length;
  const filteredFeedback = feedback.filter((f) => {
    if (feedbackFilter !== "all" && f.status !== feedbackFilter) return false;
    const q = feedbackSearch.trim().toLowerCase();
    if (!q) return true;
    return `${f.message || ""} ${f.path || ""} ${f.url || ""}`
      .toLowerCase()
      .includes(q);
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            东安会馆 CMS 管理系统
          </h1>
          <div className="flex gap-4 items-center">
            <a
              href="/"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              查看网站
            </a>
            {dirty && (
              <span className="flex items-center gap-1.5 text-sm text-amber-600">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                未保存
              </span>
            )}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" /> 退出
            </button>
            {activeTab !== "feedback" &&
              activeTab !== "messages" &&
              activeTab !== "backups" &&
              activeTab !== "media" &&
              activeTab !== "account" && (
              <button
                onClick={saveContent}
                disabled={saving}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {saving ? "保存中..." : "保存更改"}
              </button>
            )}
          </div>
        </div>
      </header>

      {message && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div
            className={`p-4 rounded-lg ${message.includes("成功") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
          >
            {message}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
        <aside className="w-64 flex-shrink-0">
          <nav className="bg-white rounded-lg shadow-sm">
            {[
              { id: "site", label: "网站信息", icon: "🏠" },
              { id: "hero", label: "首页轮播", icon: "🖼️" },
              { id: "about", label: "关于会馆", icon: "🏛️" },
              { id: "history", label: "历史传承", icon: "📜" },
              { id: "activities", label: "会馆活动", icon: "🎭" },
              { id: "conference", label: "恳亲大会", icon: "🌍" },
              { id: "messages", label: "双语内容", icon: "🌐" },
              { id: "backups", label: "备份回滚", icon: "🗂️" },
              { id: "media", label: "媒体库", icon: "📁" },
              { id: "feedback", label: "用户反馈", icon: "💬" },
              { id: "account", label: "账号设置", icon: "⚙️" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 ${activeTab === tab.id ? "bg-red-50 text-red-600 border-r-2 border-red-600" : ""}`}
              >
                <span>{tab.icon}</span>
                <span className="flex-1">{tab.label}</span>
                {tab.id === "feedback" && newFeedbackCount > 0 && (
                  <span className="inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-red-600 px-1.5 text-xs font-medium text-white">
                    {newFeedbackCount}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 bg-white rounded-lg shadow-sm p-6">
          {activeTab === "site" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">网站基本信息</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  网站标题
                </label>
                <input
                  type="text"
                  value={content.site?.title || ""}
                  onChange={(e) => updateField("site", "title", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  副标题
                </label>
                <input
                  type="text"
                  value={content.site?.subtitle || ""}
                  onChange={(e) =>
                    updateField("site", "subtitle", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  网站描述
                </label>
                <textarea
                  value={content.site?.description || ""}
                  onChange={(e) =>
                    updateField("site", "description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          )}

          {activeTab === "hero" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">首页轮播图</h2>
                <button
                  type="button"
                  onClick={() =>
                    addItem("hero", "slides", {
                      id: Date.now(),
                      title: "",
                      subtitle: "",
                      description: "",
                      image: "",
                    })
                  }
                  className="flex items-center gap-1.5 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Plus className="w-4 h-4" /> 添加轮播图
                </button>
              </div>
              {(content.hero?.slides?.length ?? 0) === 0 && (
                <p className="text-sm text-gray-400">暂无轮播图，点右上角添加。</p>
              )}
              {content.hero?.slides?.map((slide: any, index: number) => (
                <ItemCard
                  key={slide.id ?? index}
                  title={`轮播图 ${index + 1}`}
                  index={index}
                  total={content.hero.slides.length}
                  onUp={() => moveItem("hero", "slides", index, -1)}
                  onDown={() => moveItem("hero", "slides", index, 1)}
                  onRemove={() => removeItem("hero", "slides", index)}
                >
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      标题
                    </label>
                    <input
                      type="text"
                      value={slide.title || ""}
                      onChange={(e) =>
                        updateItem("hero", "slides", index, {
                          title: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      副标题
                    </label>
                    <input
                      type="text"
                      value={slide.subtitle || ""}
                      onChange={(e) =>
                        updateItem("hero", "slides", index, {
                          subtitle: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      描述
                    </label>
                    <textarea
                      value={slide.description || ""}
                      onChange={(e) =>
                        updateItem("hero", "slides", index, {
                          description: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      图片
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={slide.image || ""}
                        onChange={(e) =>
                          updateItem("hero", "slides", index, {
                            image: e.target.value,
                          })
                        }
                        className="flex-1 px-3 py-2 border rounded-lg"
                      />
                      <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                        <Upload className="w-4 h-4" />
                        <span>
                          {uploading === `hero-${index}` ? "上传中..." : "上传"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, "hero", index, "slides")
                          }
                        />
                      </label>
                    </div>
                    {slide.image && (
                      <img
                        src={slide.image}
                        alt=""
                        className="mt-2 w-32 h-20 object-cover rounded"
                      />
                    )}
                  </div>
                </ItemCard>
              ))}
            </div>
          )}

          {activeTab === "about" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">关于会馆</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  标题
                </label>
                <input
                  type="text"
                  value={content.about?.title || ""}
                  onChange={(e) =>
                    updateField("about", "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  副标题
                </label>
                <input
                  type="text"
                  value={content.about?.subtitle || ""}
                  onChange={(e) =>
                    updateField("about", "subtitle", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  内容
                </label>
                <textarea
                  value={content.about?.content || ""}
                  onChange={(e) =>
                    updateField("about", "content", e.target.value)
                  }
                  rows={6}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    数据统计
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      addItem("about", "stats", { value: "", label: "" })
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <Plus className="w-4 h-4" /> 添加
                  </button>
                </div>
                <div className="space-y-3">
                  {content.about?.stats?.map((stat: any, index: number) => (
                    <ItemCard
                      key={index}
                      title={`统计 ${index + 1}`}
                      index={index}
                      total={content.about.stats.length}
                      onUp={() => moveItem("about", "stats", index, -1)}
                      onDown={() => moveItem("about", "stats", index, 1)}
                      onRemove={() => removeItem("about", "stats", index)}
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            数值
                          </label>
                          <input
                            type="text"
                            value={stat.value || ""}
                            onChange={(e) =>
                              updateItem("about", "stats", index, {
                                value: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1">
                            说明
                          </label>
                          <input
                            type="text"
                            value={stat.label || ""}
                            onChange={(e) =>
                              updateItem("about", "stats", index, {
                                label: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                      </div>
                    </ItemCard>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">历史传承</h2>
                <button
                  type="button"
                  onClick={() =>
                    addItem("history", "milestones", {
                      year: "",
                      title: "",
                      description: "",
                    })
                  }
                  className="flex items-center gap-1.5 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Plus className="w-4 h-4" /> 添加里程碑
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  栏目标题
                </label>
                <input
                  type="text"
                  value={content.history?.title || ""}
                  onChange={(e) =>
                    updateField("history", "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              {(content.history?.milestones?.length ?? 0) === 0 && (
                <p className="text-sm text-gray-400">
                  暂无里程碑，点右上角添加。
                </p>
              )}
              {content.history?.milestones?.map((m: any, index: number) => (
                <ItemCard
                  key={index}
                  title={`里程碑 ${index + 1}`}
                  index={index}
                  total={content.history.milestones.length}
                  onUp={() => moveItem("history", "milestones", index, -1)}
                  onDown={() => moveItem("history", "milestones", index, 1)}
                  onRemove={() => removeItem("history", "milestones", index)}
                >
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        年份
                      </label>
                      <input
                        type="text"
                        value={m.year || ""}
                        onChange={(e) =>
                          updateItem("history", "milestones", index, {
                            year: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs text-gray-500 mb-1">
                        标题
                      </label>
                      <input
                        type="text"
                        value={m.title || ""}
                        onChange={(e) =>
                          updateItem("history", "milestones", index, {
                            title: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">
                      描述
                    </label>
                    <textarea
                      value={m.description || ""}
                      onChange={(e) =>
                        updateItem("history", "milestones", index, {
                          description: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </ItemCard>
              ))}
            </div>
          )}

          {activeTab === "activities" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">会馆活动</h2>
                <button
                  type="button"
                  onClick={() =>
                    addItem("activities", "items", {
                      icon: "Sparkles",
                      title: "",
                      description: "",
                      image: "",
                    })
                  }
                  className="flex items-center gap-1.5 px-3 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Plus className="w-4 h-4" /> 添加活动
                </button>
              </div>
              {(content.activities?.items?.length ?? 0) === 0 && (
                <p className="text-sm text-gray-400">暂无活动，点右上角添加。</p>
              )}
              {content.activities?.items?.map((item: any, index: number) => (
                <ItemCard
                  key={index}
                  title={`活动 ${index + 1}`}
                  index={index}
                  total={content.activities.items.length}
                  onUp={() => moveItem("activities", "items", index, -1)}
                  onDown={() => moveItem("activities", "items", index, 1)}
                  onRemove={() => removeItem("activities", "items", index)}
                >
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        图标
                      </label>
                      <input
                        type="text"
                        value={item.icon || ""}
                        onChange={(e) =>
                          updateItem("activities", "items", index, {
                            icon: e.target.value,
                          })
                        }
                        placeholder="Music / Users…"
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm text-gray-600 mb-1">
                        标题
                      </label>
                      <input
                        type="text"
                        value={item.title || ""}
                        onChange={(e) =>
                          updateItem("activities", "items", index, {
                            title: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      描述
                    </label>
                    <textarea
                      value={item.description || ""}
                      onChange={(e) =>
                        updateItem("activities", "items", index, {
                          description: e.target.value,
                        })
                      }
                      rows={2}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      图片
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={item.image || ""}
                        onChange={(e) =>
                          updateItem("activities", "items", index, {
                            image: e.target.value,
                          })
                        }
                        className="flex-1 px-3 py-2 border rounded-lg"
                      />
                      <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                        <Upload className="w-4 h-4" />
                        <span>
                          {uploading === `activities-${index}`
                            ? "上传中..."
                            : "上传"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, "activities", index, "items")
                          }
                        />
                      </label>
                    </div>
                    {item.image && (
                      <img
                        src={item.image}
                        alt=""
                        className="mt-2 w-32 h-20 object-cover rounded"
                      />
                    )}
                  </div>
                </ItemCard>
              ))}
            </div>
          )}

          {activeTab === "conference" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold mb-4">恳亲大会</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  标题
                </label>
                <input
                  type="text"
                  value={content.conference?.title || ""}
                  onChange={(e) =>
                    updateField("conference", "title", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  描述
                </label>
                <textarea
                  value={content.conference?.description || ""}
                  onChange={(e) =>
                    updateField("conference", "description", e.target.value)
                  }
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">双语内容（i18n）</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    编辑 zh / en 站点文案，覆盖新闻、影相库、理事会、联系等页面。
                  </p>
                </div>
                <button
                  onClick={saveMessages}
                  disabled={messagesSaving || !messages}
                  className="flex-shrink-0 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {messagesSaving ? "保存中..." : "保存双语内容"}
                </button>
              </div>

              {messagesLoading || !messages ? (
                <div className="py-12 text-center text-gray-400">加载中...</div>
              ) : (
                <div className="flex gap-4">
                  <div className="w-36 flex-shrink-0 space-y-1">
                    {Object.keys(messages.zh || {}).map((sec) => (
                      <button
                        key={sec}
                        onClick={() => setMessagesSection(sec)}
                        className={`w-full text-left px-3 py-2 rounded text-sm ${
                          messagesSection === sec
                            ? "bg-red-50 text-red-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {MESSAGE_SECTION_LABELS[sec] || sec}
                      </button>
                    ))}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="grid grid-cols-[130px_1fr_1fr] gap-2 mb-2 text-xs font-medium text-gray-400">
                      <div>字段</div>
                      <div>中文</div>
                      <div>English</div>
                    </div>
                    {messagesSection && (
                      <MessageFields
                        zh={messages.zh?.[messagesSection] ?? {}}
                        en={messages.en?.[messagesSection] ?? {}}
                        path={[messagesSection]}
                        onChange={onMsgChange}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "backups" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold">备份与回滚</h2>
                <p className="mt-1 text-sm text-gray-500">
                  每次保存前自动快照旧版本（每类保留最近 30
                  份）。可回滚到任意历史版本，回滚前会再次自动备份，便于撤销。
                </p>
              </div>
              <div className="flex gap-2">
                {[
                  { id: "content", label: "网站内容" },
                  { id: "messages-zh", label: "中文文案" },
                  { id: "messages-en", label: "英文文案" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setBackupType(t.id)}
                    className={`px-3 py-1.5 rounded text-sm ${
                      backupType === t.id
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              {backupsLoading ? (
                <div className="py-12 text-center text-gray-400">加载中...</div>
              ) : backups.length === 0 ? (
                <div className="py-12 text-center text-gray-400">
                  暂无备份（保存一次内容后即生成）
                </div>
              ) : (
                <div className="divide-y border rounded-lg">
                  {backups.map((b) => (
                    <div
                      key={b.id}
                      className="flex items-center justify-between px-4 py-3"
                    >
                      <span className="text-sm text-gray-700">
                        {new Date(b.time).toLocaleString("zh-CN")}
                      </span>
                      <button
                        onClick={() => rollback(b.id)}
                        className="px-3 py-1.5 text-sm border border-red-200 text-red-600 rounded hover:bg-red-50"
                      >
                        回滚到此版本
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "media" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">媒体库</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    管理已上传图片，复制链接粘贴到各处的「图片」输入框，或删除不再使用的图片。
                  </p>
                </div>
                <label className="flex flex-shrink-0 items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-700">
                  <Upload className="w-4 h-4" />
                  <span>{mediaUploading ? "上传中..." : "上传图片"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={uploadMedia}
                    disabled={mediaUploading}
                  />
                </label>
              </div>
              {mediaLoading ? (
                <div className="py-12 text-center text-gray-400">加载中...</div>
              ) : media.length === 0 ? (
                <div className="py-12 text-center text-gray-400">
                  暂无图片，点右上角上传。
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {media.map((m) => (
                    <div
                      key={m.name}
                      className="border rounded-lg overflow-hidden"
                    >
                      <div className="aspect-video bg-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={m.url}
                          alt={m.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2 space-y-1">
                        <p
                          className="truncate text-xs text-gray-600"
                          title={m.name}
                        >
                          {m.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {(m.size / 1024).toFixed(0)} KB
                        </p>
                        <div className="flex gap-3 pt-1">
                          <button
                            onClick={() => copyUrl(m.url)}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            复制链接
                          </button>
                          <button
                            onClick={() => deleteMedia(m.name)}
                            className="text-xs text-red-600 hover:underline"
                          >
                            删除
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "account" && (
            <div className="max-w-md space-y-4">
              <h2 className="text-xl font-bold">账号设置</h2>
              {usingDefaultPw && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                  ⚠️ 当前仍在使用默认密码，请尽快修改以保障安全。
                </div>
              )}
              <p className="text-sm text-gray-500">
                修改管理员登录密码。新密码至少 8 位；保存后立即生效。
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  当前密码
                </label>
                <input
                  type="password"
                  value={pwCurrent}
                  onChange={(e) => setPwCurrent(e.target.value)}
                  autoComplete="current-password"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  新密码
                </label>
                <input
                  type="password"
                  value={pwNew}
                  onChange={(e) => setPwNew(e.target.value)}
                  autoComplete="new-password"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  确认新密码
                </label>
                <input
                  type="password"
                  value={pwConfirm}
                  onChange={(e) => setPwConfirm(e.target.value)}
                  autoComplete="new-password"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <button
                onClick={changePassword}
                disabled={pwSaving || !pwCurrent || !pwNew}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {pwSaving ? "保存中..." : "修改密码"}
              </button>
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xl font-bold">
                  <MessageSquare className="h-5 w-5 text-red-600" />
                  用户反馈
                  <span className="text-sm font-normal text-gray-400">
                    （{feedback.length}）
                  </span>
                </h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={exportFeedbackCsv}
                    disabled={feedback.length === 0}
                    className="text-sm text-blue-600 hover:underline disabled:text-gray-300"
                  >
                    导出 CSV
                  </button>
                  <button
                    onClick={fetchFeedback}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    刷新
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  value={feedbackSearch}
                  onChange={(e) => setFeedbackSearch(e.target.value)}
                  placeholder="搜索留言 / 页面 / 链接…"
                  className="flex-1 min-w-[200px] px-3 py-1.5 border rounded-lg text-sm"
                />
                {[
                  { id: "all", label: "全部" },
                  { id: "new", label: "未读" },
                  { id: "read", label: "已读" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFeedbackFilter(f.id as "all" | "new" | "read")}
                    className={`px-3 py-1.5 rounded text-sm ${
                      feedbackFilter === f.id
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {feedbackLoading ? (
                <div className="py-12 text-center text-gray-400">加载中...</div>
              ) : feedback.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
                  <Inbox className="h-12 w-12" />
                  <p>暂无用户反馈</p>
                </div>
              ) : filteredFeedback.length === 0 ? (
                <div className="py-12 text-center text-gray-400">
                  无匹配结果
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFeedback.map((item) => (
                    <div
                      key={item.id}
                      className={`flex flex-col gap-4 rounded-lg border p-4 sm:flex-row ${
                        item.status === "new"
                          ? "border-red-200 bg-red-50/40"
                          : "border-gray-200"
                      }`}
                    >
                      <button
                        onClick={() => {
                          setPreview(item);
                          if (item.status === "new") markRead(item.id);
                        }}
                        className="group relative h-32 w-full flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-gray-100 sm:h-28 sm:w-44"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.screenshot}
                          alt="反馈截图"
                          className="h-full w-full object-cover object-top"
                        />
                        <span className="absolute inset-0 hidden items-center justify-center bg-black/40 text-xs text-white group-hover:flex">
                          查看大图
                        </span>
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          {item.status === "new" && (
                            <span className="rounded-full bg-red-600 px-2 py-0.5 text-xs text-white">
                              新
                            </span>
                          )}
                          <span
                            className="truncate text-sm font-medium text-gray-700"
                            title={item.url}
                          >
                            {item.path || "/"}
                          </span>
                        </div>
                        <p className="mb-2 whitespace-pre-wrap break-words text-sm text-gray-800">
                          {item.message || (
                            <span className="text-gray-400">（无留言）</span>
                          )}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                          <span>
                            {new Date(item.createdAt).toLocaleString("zh-CN")}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Monitor className="h-3 w-3" />
                            {item.viewport?.w}×{item.viewport?.h}
                          </span>
                          <span>{item.strokes?.length || 0} 处圈选</span>
                        </div>
                        <div className="mt-2 flex items-center gap-3">
                          <button
                            onClick={() => setPreview(item)}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            查看大图
                          </button>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" />
                            打开页面
                          </a>
                          <button
                            onClick={() => deleteFeedback(item.id)}
                            className="inline-flex items-center gap-1 text-xs text-red-600 hover:underline"
                          >
                            <Trash2 className="h-3 w-3" />
                            删除
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-lg bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-gray-800">
                  {preview.path || "/"}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(preview.createdAt).toLocaleString("zh-CN")}
                </p>
              </div>
              <button
                onClick={() => setPreview(null)}
                className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-1 flex-col overflow-auto md:flex-row">
              <div className="flex-1 overflow-auto bg-gray-50 p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview.screenshot}
                  alt="反馈截图"
                  className="mx-auto max-w-full rounded border border-gray-200"
                />
              </div>
              <div className="w-full shrink-0 space-y-4 border-t p-4 text-sm md:w-72 md:border-l md:border-t-0">
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                    留言
                  </p>
                  <p className="whitespace-pre-wrap break-words text-gray-800">
                    {preview.message || (
                      <span className="text-gray-400">（无留言）</span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                    页面地址
                  </p>
                  <a
                    href={preview.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-start gap-1 break-all text-blue-600 hover:underline"
                  >
                    <ExternalLink className="mt-0.5 h-3 w-3 shrink-0" />
                    {preview.url}
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                  <div>
                    <p className="text-gray-400">视口</p>
                    <p>
                      {preview.viewport?.w}×{preview.viewport?.h} @
                      {preview.viewport?.dpr}x
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">圈选</p>
                    <p>{preview.strokes?.length || 0} 处</p>
                  </div>
                </div>
                {preview.userAgent && (
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                      设备信息
                    </p>
                    <p className="break-words text-xs text-gray-500">
                      {preview.userAgent}
                    </p>
                  </div>
                )}
                <button
                  onClick={() => deleteFeedback(preview.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" /> 删除此反馈
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
