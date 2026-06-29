"use client";

import { useEffect, useState } from "react";
import DesignShell from "../../components/DesignShell";
import { useDesign } from "../../components/DesignContext";
import AboutShared from "../../components/pagebodies/about/AboutShared";
import AboutPaper from "../../components/pagebodies/about/AboutPaper";
import AboutEditorial from "../../components/pagebodies/about/AboutEditorial";
import AboutVibrant from "../../components/pagebodies/about/AboutVibrant";
import AboutStately from "../../components/pagebodies/about/AboutStately";

const BODIES: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ComponentType<{ content: Record<string, any> }>
> = {
  classic: AboutShared,
  paper: AboutPaper,
  editorial: AboutEditorial,
  vibrant: AboutVibrant,
  stately: AboutStately,
};

export default function AboutPage() {
  const { design } = useDesign();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<Record<string, any>>({});
  useEffect(() => {
    fetch("/api/cms")
      .then((r) => r.json())
      .then(setContent)
      .catch(() => setContent({}));
  }, []);
  const Body = BODIES[design] ?? AboutShared;
  return (
    <DesignShell>
      <Body content={content} />
    </DesignShell>
  );
}
