"use client";

import DesignShell from "../../../components/DesignShell";
import { useDesign } from "../../../components/DesignContext";
import ActivityDetailShared from "../../../components/pagebodies/activity-detail/ActivityDetailShared";
import ActivityDetailPaper from "../../../components/pagebodies/activity-detail/ActivityDetailPaper";
import ActivityDetailEditorial from "../../../components/pagebodies/activity-detail/ActivityDetailEditorial";
import ActivityDetailVibrant from "../../../components/pagebodies/activity-detail/ActivityDetailVibrant";
import ActivityDetailStately from "../../../components/pagebodies/activity-detail/ActivityDetailStately";

const BODIES: Record<string, React.ComponentType> = {
  classic: ActivityDetailShared,
  paper: ActivityDetailPaper,
  editorial: ActivityDetailEditorial,
  vibrant: ActivityDetailVibrant,
  stately: ActivityDetailStately,
};

export default function ActivityDetailPage() {
  const { design } = useDesign();
  const Body = BODIES[design] ?? ActivityDetailShared;
  return (
    <DesignShell>
      <Body />
    </DesignShell>
  );
}
