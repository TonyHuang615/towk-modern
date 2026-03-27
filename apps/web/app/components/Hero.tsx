"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

interface HeroProps {
  data?: {
    slides: Slide[];
  };
}

export default function Hero({ data }: HeroProps) {
  const t = useTranslations("hero");

  const defaultSlides: Slide[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=1600&q=80",
      title: t("slide1Title"),
      subtitle: t("slide1Subtitle"),
      description: t("slide1Desc"),
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=1600&q=80",
      title: t("slide2Title"),
      subtitle: t("slide2Subtitle"),
      description: t("slide2Desc"),
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=1600&q=80",
      title: t("slide3Title"),
      subtitle: t("slide3Subtitle"),
      description: t("slide3Desc"),
    },
  ];

  const slides = data?.slides || defaultSlides;
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      next();
    }
    if (touchStart - touchEnd < -50) {
      prev();
    }
  };

  return (
    <section
      id="hero"
      className="relative h-[100svh] w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-brand-dark"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          {/* 暗色遮罩：确保在任何背景色下文字都可读 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4 sm:space-y-6"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-accent text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase"
              >
                {slides[current].subtitle}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-white"
              >
                {slides[current].title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-2"
              >
                {slides[current].description}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 sm:mt-10"
          >
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-full font-medium text-sm sm:text-base hover:bg-primary-dark transition-colors duration-300"
            >
              {t("explore")}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Navigation Arrows - Hidden on small mobile, shown on larger screens */}
      <div className="absolute bottom-1/2 translate-y-1/2 left-4 right-4 sm:left-6 sm:right-6 flex justify-between pointer-events-none">
        <button
          onClick={prev}
          className="pointer-events-auto p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white transition-colors duration-200"
          aria-label={t("prev")}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={next}
          className="pointer-events-auto p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 text-white transition-colors duration-200"
          aria-label={t("next")}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
              index === current
                ? "w-6 sm:w-8 bg-primary"
                : "w-1.5 sm:w-2 bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={t("switchSlide", { number: index + 1 })}
          />
        ))}
      </div>

      {/* Scroll Indicator — hidden on mobile (bottom nav covers it) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 sm:bottom-24 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center pt-1.5 sm:pt-2"
        >
          <motion.div className="w-0.5 sm:w-1 h-1.5 sm:h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
