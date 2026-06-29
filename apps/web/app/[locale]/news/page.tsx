"use client";

import { useEffect, useState } from "react";
import DesignShell from "../../components/DesignShell";
import { useDesign } from "../../components/DesignContext";
import NewsShared from "../../components/pagebodies/news/NewsShared";
import NewsPaper from "../../components/pagebodies/news/NewsPaper";
import NewsEditorial from "../../components/pagebodies/news/NewsEditorial";
import NewsVibrant from "../../components/pagebodies/news/NewsVibrant";
import NewsStately from "../../components/pagebodies/news/NewsStately";

const BODIES: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ComponentType<{ content: Record<string, any> }>
> = {
  classic: NewsShared,
  paper: NewsPaper,
  editorial: NewsEditorial,
  vibrant: NewsVibrant,
  stately: NewsStately,
};

export default function NewsPage() {
  const { design } = useDesign();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<Record<string, any>>({});
  useEffect(() => {
    fetch("/api/cms")
      .then((r) => r.json())
      .then(setContent)
      .catch(() => setContent({}));
  }, []);
  const Body = BODIES[design] ?? NewsShared;
  return (
    <DesignShell>
      <Body content={content} />
    </DesignShell>
  );
}
