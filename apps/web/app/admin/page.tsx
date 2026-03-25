"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Upload, LogOut, ImageIcon } from "lucide-react";

export default function AdminPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("site");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/check");
      if (!res.ok) {
        router.push("/login");
        return;
      }
      fetchContent();
    } catch {
      router.push("/login");
    }
  };

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/cms");
      const data = await res.json();
      setContent(data);
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

  if (loading) return <div className="p-8">加载中...</div>;
  if (!content) return <div className="p-8">加载失败</div>;

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
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" /> 退出
            </button>
            <button
              onClick={saveContent}
              disabled={saving}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {saving ? "保存中..." : "保存更改"}
            </button>
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
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 ${activeTab === tab.id ? "bg-red-50 text-red-600 border-r-2 border-red-600" : ""}`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
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
              <h2 className="text-xl font-bold mb-4">首页轮播图</h2>
              {content.hero?.slides?.map((slide: any, index: number) => (
                <div key={slide.id} className="border rounded-lg p-4 space-y-3">
                  <h3 className="font-medium">轮播图 {index + 1}</h3>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      标题
                    </label>
                    <input
                      type="text"
                      value={slide.title}
                      onChange={(e) => {
                        const newSlides = [...content.hero.slides];
                        newSlides[index] = { ...slide, title: e.target.value };
                        updateField("hero", "slides", newSlides);
                      }}
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
                        value={slide.image}
                        onChange={(e) => {
                          const newSlides = [...content.hero.slides];
                          newSlides[index] = {
                            ...slide,
                            image: e.target.value,
                          };
                          updateField("hero", "slides", newSlides);
                        }}
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
                </div>
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
            </div>
          )}

          {activeTab === "activities" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-4">会馆活动</h2>
              {content.activities?.items?.map((item: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <h3 className="font-medium">活动 {index + 1}</h3>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      标题
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const newItems = [...content.activities.items];
                        newItems[index] = { ...item, title: e.target.value };
                        updateField("activities", "items", newItems);
                      }}
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
                        value={item.image}
                        onChange={(e) => {
                          const newItems = [...content.activities.items];
                          newItems[index] = { ...item, image: e.target.value };
                          updateField("activities", "items", newItems);
                        }}
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
                </div>
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
        </main>
      </div>
    </div>
  );
}
