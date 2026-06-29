"use client";

import DesignShell from "../../../components/DesignShell";
import { useDesign } from "../../../components/DesignContext";
import BoardShared from "../../../components/pagebodies/board/BoardShared";
import BoardPaper from "../../../components/pagebodies/board/BoardPaper";
import BoardEditorial from "../../../components/pagebodies/board/BoardEditorial";
import BoardVibrant from "../../../components/pagebodies/board/BoardVibrant";
import BoardStately from "../../../components/pagebodies/board/BoardStately";

const BODIES: Record<string, React.ComponentType> = {
  classic: BoardShared,
  paper: BoardPaper,
  editorial: BoardEditorial,
  vibrant: BoardVibrant,
  stately: BoardStately,
};

export default function BoardPage() {
  const { design } = useDesign();
  const Body = BODIES[design] ?? BoardShared;
  return (
    <DesignShell>
      <Body />
    </DesignShell>
  );
}
