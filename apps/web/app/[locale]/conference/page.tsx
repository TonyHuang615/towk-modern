"use client";

import { useEffect, useState } from "react";
import DesignShell from "../../components/DesignShell";
import { useDesign } from "../../components/DesignContext";
import ConferenceShared from "../../components/pagebodies/conference/ConferenceShared";
import ConferencePaper from "../../components/pagebodies/conference/ConferencePaper";
import ConferenceEditorial from "../../components/pagebodies/conference/ConferenceEditorial";
import ConferenceVibrant from "../../components/pagebodies/conference/ConferenceVibrant";
import ConferenceStately from "../../components/pagebodies/conference/ConferenceStately";

const BODIES: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ComponentType<{ content: Record<string, any> }>
> = {
  classic: ConferenceShared,
  paper: ConferencePaper,
  editorial: ConferenceEditorial,
  vibrant: ConferenceVibrant,
  stately: ConferenceStately,
};

export default function ConferencePage() {
  const { design } = useDesign();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<Record<string, any>>({});
  useEffect(() => {
    fetch("/api/cms")
      .then((r) => r.json())
      .then(setContent)
      .catch(() => setContent({}));
  }, []);
  const Body = BODIES[design] ?? ConferenceShared;
  return (
    <DesignShell>
      <Body content={content} />
    </DesignShell>
  );
}
