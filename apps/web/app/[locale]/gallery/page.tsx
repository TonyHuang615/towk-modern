"use client";

import { useEffect, useState } from "react";
import DesignShell from "../../components/DesignShell";
import { useDesign } from "../../components/DesignContext";
import GalleryShared from "../../components/pagebodies/gallery/GalleryShared";
import GalleryPaper from "../../components/pagebodies/gallery/GalleryPaper";
import GalleryEditorial from "../../components/pagebodies/gallery/GalleryEditorial";
import GalleryVibrant from "../../components/pagebodies/gallery/GalleryVibrant";
import GalleryStately from "../../components/pagebodies/gallery/GalleryStately";

const BODIES: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ComponentType<{ content: Record<string, any> }>
> = {
  classic: GalleryShared,
  paper: GalleryPaper,
  editorial: GalleryEditorial,
  vibrant: GalleryVibrant,
  stately: GalleryStately,
};

export default function GalleryPage() {
  const { design } = useDesign();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<Record<string, any>>({});
  useEffect(() => {
    fetch("/api/cms")
      .then((r) => r.json())
      .then(setContent)
      .catch(() => setContent({}));
  }, []);
  const Body = BODIES[design] ?? GalleryShared;
  return (
    <DesignShell>
      <Body content={content} />
    </DesignShell>
  );
}
