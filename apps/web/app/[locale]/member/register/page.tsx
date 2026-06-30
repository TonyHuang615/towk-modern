"use client";

import DesignShell from "../../../components/DesignShell";
import { useDesign } from "../../../components/DesignContext";
import RegisterShared from "../../../components/pagebodies/register/RegisterShared";
import RegisterPaper from "../../../components/pagebodies/register/RegisterPaper";
import RegisterEditorial from "../../../components/pagebodies/register/RegisterEditorial";
import RegisterVibrant from "../../../components/pagebodies/register/RegisterVibrant";
import RegisterStately from "../../../components/pagebodies/register/RegisterStately";

const BODIES: Record<string, React.ComponentType> = {
  classic: RegisterShared,
  paper: RegisterPaper,
  editorial: RegisterEditorial,
  vibrant: RegisterVibrant,
  stately: RegisterStately,
};

export default function MemberRegisterPage() {
  const { design } = useDesign();
  const Body = BODIES[design] ?? RegisterShared;
  return (
    <DesignShell>
      <Body />
    </DesignShell>
  );
}
