"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

// Shared lightbox/modal reused by every Gallery design body so the zoom
// behaviour stays identical across designs while each body owns its own grid.
export default function GalleryLightbox({
  image,
  alt,
  onClose,
}: {
  image: string | null;
  alt: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={onClose}
          data-testid="lightbox"
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            onClick={onClose}
            data-testid="lightbox-close"
          >
            <X className="w-5 h-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            src={image}
            alt={alt}
            className="max-w-full max-h-[85vh] rounded-lg object-contain"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
