"use client";

import DesignShell from "../../components/DesignShell";
import { useDesign } from "../../components/DesignContext";
import MemberShared from "../../components/pagebodies/member/MemberShared";
import MemberPaper from "../../components/pagebodies/member/MemberPaper";
import MemberEditorial from "../../components/pagebodies/member/MemberEditorial";
import MemberVibrant from "../../components/pagebodies/member/MemberVibrant";
import MemberStately from "../../components/pagebodies/member/MemberStately";

const BODIES: Record<string, React.ComponentType> = {
  classic: MemberShared,
  paper: MemberPaper,
  editorial: MemberEditorial,
  vibrant: MemberVibrant,
  stately: MemberStately,
};

export default function MemberProfilePage() {
  const { design } = useDesign();
  const Body = BODIES[design] ?? MemberShared;
  return (
    <DesignShell>
      <Body />
    </DesignShell>
  );
}
