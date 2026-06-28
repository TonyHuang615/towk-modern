"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { DEFAULT_DESIGN, DESIGN_STORAGE_KEY } from "../../lib/designs";

interface DesignCtx {
  design: string;
  setDesign: (id: string) => void;
}

const Ctx = createContext<DesignCtx>({
  design: DEFAULT_DESIGN,
  setDesign: () => {},
});

export function DesignProvider({
  initialDesign,
  children,
}: {
  initialDesign?: string;
  children: React.ReactNode;
}) {
  const [design, setDesignState] = useState(initialDesign || DEFAULT_DESIGN);

  const setDesign = useCallback((id: string) => {
    setDesignState(id);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.design = id;
      try {
        localStorage.setItem(DESIGN_STORAGE_KEY, id);
      } catch {}
      // 一年期 cookie：让服务端 SSR 直接渲染所选设计的版式，避免闪烁
      document.cookie = `${DESIGN_STORAGE_KEY}=${id};path=/;max-age=31536000;samesite=lax`;
    }
  }, []);

  return <Ctx.Provider value={{ design, setDesign }}>{children}</Ctx.Provider>;
}

export const useDesign = () => useContext(Ctx);
