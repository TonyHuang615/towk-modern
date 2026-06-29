"use client";

import DesignShell from "../../../components/DesignShell";
import { useDesign } from "../../../components/DesignContext";
import StructureShared from "../../../components/pagebodies/structure/StructureShared";
import StructurePaper from "../../../components/pagebodies/structure/StructurePaper";
import StructureEditorial from "../../../components/pagebodies/structure/StructureEditorial";
import StructureVibrant from "../../../components/pagebodies/structure/StructureVibrant";
import StructureStately from "../../../components/pagebodies/structure/StructureStately";

const BODIES: Record<string, React.ComponentType> = {
  classic: StructureShared,
  paper: StructurePaper,
  editorial: StructureEditorial,
  vibrant: StructureVibrant,
  stately: StructureStately,
};

export default function StructurePage() {
  const { design } = useDesign();
  const Body = BODIES[design] ?? StructureShared;
  return (
    <DesignShell>
      <Body />
    </DesignShell>
  );
}
