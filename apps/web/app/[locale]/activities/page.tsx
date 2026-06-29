"use client";

import { useEffect, useState } from "react";
import DesignShell from "../../components/DesignShell";
import { useDesign } from "../../components/DesignContext";
import ActivitiesShared from "../../components/pagebodies/activities/ActivitiesShared";
import ActivitiesPaper from "../../components/pagebodies/activities/ActivitiesPaper";
import ActivitiesEditorial from "../../components/pagebodies/activities/ActivitiesEditorial";
import ActivitiesVibrant from "../../components/pagebodies/activities/ActivitiesVibrant";
import ActivitiesStately from "../../components/pagebodies/activities/ActivitiesStately";

const BODIES: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ComponentType<{ content: Record<string, any> }>
> = {
  classic: ActivitiesShared,
  paper: ActivitiesPaper,
  editorial: ActivitiesEditorial,
  vibrant: ActivitiesVibrant,
  stately: ActivitiesStately,
};

export default function ActivitiesPage() {
  const { design } = useDesign();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<Record<string, any>>({});
  useEffect(() => {
    fetch("/api/cms")
      .then((r) => r.json())
      .then(setContent)
      .catch(() => setContent({}));
  }, []);
  const Body = BODIES[design] ?? ActivitiesShared;
  return (
    <DesignShell>
      <Body content={content} />
    </DesignShell>
  );
}
