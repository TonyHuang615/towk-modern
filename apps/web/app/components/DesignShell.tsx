"use client";

import { useDesign } from "./DesignContext";
import { ClassicHeader, ClassicFooter } from "./chrome/ClassicChrome";
import { PaperHeader, PaperFooter } from "./chrome/PaperChrome";
import { EditorialHeader, EditorialFooter } from "./chrome/EditorialChrome";
import { VibrantHeader, VibrantFooter } from "./chrome/VibrantChrome";
import { StatelyHeader, StatelyFooter } from "./chrome/StatelyChrome";

interface ChromeEntry {
  Header: React.ComponentType;
  Footer: React.ComponentType;
  wrap: string;
}

const CHROME: Record<string, ChromeEntry> = {
  classic: { Header: ClassicHeader, Footer: ClassicFooter, wrap: "" },
  paper: { Header: PaperHeader, Footer: PaperFooter, wrap: "towk-paper" },
  editorial: { Header: EditorialHeader, Footer: EditorialFooter, wrap: "" },
  vibrant: { Header: VibrantHeader, Footer: VibrantFooter, wrap: "" },
  stately: { Header: StatelyHeader, Footer: StatelyFooter, wrap: "" },
};

// Wraps every page in the active design's header + footer chrome so the
// chosen design applies site-wide (home AND inner pages).
export default function DesignShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { design } = useDesign();
  const c = CHROME[design] ?? CHROME.classic;
  const { Header, Footer, wrap } = c;

  return (
    <div className={wrap} data-design={design}>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
