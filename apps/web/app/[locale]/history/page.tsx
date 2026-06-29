"use client";

import { useEffect, useState } from "react";
import DesignShell from "../../components/DesignShell";
import { useDesign } from "../../components/DesignContext";
import HistoryShared from "../../components/pagebodies/history/HistoryShared";
import HistoryPaper from "../../components/pagebodies/history/HistoryPaper";
import HistoryEditorial from "../../components/pagebodies/history/HistoryEditorial";
import HistoryVibrant from "../../components/pagebodies/history/HistoryVibrant";
import HistoryStately from "../../components/pagebodies/history/HistoryStately";

const BODIES: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ComponentType<{ content: Record<string, any> }>
> = {
  classic: HistoryShared,
  paper: HistoryPaper,
  editorial: HistoryEditorial,
  vibrant: HistoryVibrant,
  stately: HistoryStately,
};

export default function HistoryPage() {
  const { design } = useDesign();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<Record<string, any>>({});
  useEffect(() => {
    fetch("/api/cms")
      .then((r) => r.json())
      .then(setContent)
      .catch(() => setContent({}));
  }, []);
  const Body = BODIES[design] ?? HistoryShared;
  return (
    <DesignShell>
      <Body content={content} />
    </DesignShell>
  );
}
