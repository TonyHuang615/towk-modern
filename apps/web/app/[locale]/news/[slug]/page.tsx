"use client";

import DesignShell from "../../../components/DesignShell";
import { useDesign } from "../../../components/DesignContext";
import NewsArticleShared from "../../../components/pagebodies/news-article/NewsArticleShared";
import NewsArticlePaper from "../../../components/pagebodies/news-article/NewsArticlePaper";
import NewsArticleEditorial from "../../../components/pagebodies/news-article/NewsArticleEditorial";
import NewsArticleVibrant from "../../../components/pagebodies/news-article/NewsArticleVibrant";
import NewsArticleStately from "../../../components/pagebodies/news-article/NewsArticleStately";

const BODIES: Record<string, React.ComponentType> = {
  classic: NewsArticleShared,
  paper: NewsArticlePaper,
  editorial: NewsArticleEditorial,
  vibrant: NewsArticleVibrant,
  stately: NewsArticleStately,
};

export default function NewsArticlePage() {
  const { design } = useDesign();
  const Body = BODIES[design] ?? NewsArticleShared;
  return (
    <DesignShell>
      <Body />
    </DesignShell>
  );
}
