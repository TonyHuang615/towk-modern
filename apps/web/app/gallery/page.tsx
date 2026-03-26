"use client";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { useState } from "react";

const albums = [
  {
    id: 1,
    category: "恳亲大会",
    title: "第11届世界东安恳亲大会",
    date: "2019",
    cover:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80",
      "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=800&q=80",
    ],
  },
  {
    id: 2,
    category: "文化活动",
    title: "粤剧组年度公演",
    date: "2025",
    cover:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
    ],
  },
  {
    id: 3,
    category: "青年活动",
    title: "青年团东莞交流之旅",
    date: "2026",
    cover:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    ],
  },
  {
    id: 4,
    category: "节庆活动",
    title: "中秋联欢晚会",
    date: "2025",
    cover:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    ],
  },
  {
    id: 5,
    category: "商务活动",
    title: "商务交流晚宴",
    date: "2025",
    cover:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    ],
  },
  {
    id: 6,
    category: "会馆",
    title: "会馆建筑留影",
    date: "2024",
    cover:
      "https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=800&q=80",
    ],
  },
];

const categories = ["全部", "恳亲大会", "文化活动", "青年活动", "节庆活动", "商务活动", "会馆"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered =
    activeCategory === "全部"
      ? albums
      : albums.filter((a) => a.category === activeCategory);

  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent text-sm tracking-[0.3em] uppercase">
              Photo Gallery
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold">
              影相库
            </h1>
            <p className="mt-4 text-xl text-foreground/70 max-w-2xl mx-auto">
              记录东安会馆精彩时刻，珍藏共同记忆
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* 分类筛选 */}
          <div className="flex gap-2 flex-wrap mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-testid={`gallery-filter-${cat}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground/70 hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 相册网格 */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((album, index) => (
              <motion.div
                key={album.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover transition-shadow"
                onClick={() => setLightbox(album.cover)}
                data-testid={`gallery-album-${album.id}`}
              >
                <div className="aspect-[4/3]">
                  <img
                    src={album.cover}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-xs text-accent font-medium">
                    {album.category} · {album.date}
                  </span>
                  <h3 className="text-white font-bold mt-1">{album.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
            data-testid="lightbox"
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors"
              onClick={() => setLightbox(null)}
              data-testid="lightbox-close"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightbox}
              alt="大图预览"
              className="max-w-full max-h-[85vh] rounded-lg object-contain"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
