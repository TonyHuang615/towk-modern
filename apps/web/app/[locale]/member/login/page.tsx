"use client";

import DesignShell from "../../../components/DesignShell";
import { useDesign } from "../../../components/DesignContext";
import LoginShared from "../../../components/pagebodies/login/LoginShared";
import LoginPaper from "../../../components/pagebodies/login/LoginPaper";
import LoginEditorial from "../../../components/pagebodies/login/LoginEditorial";
import LoginVibrant from "../../../components/pagebodies/login/LoginVibrant";
import LoginStately from "../../../components/pagebodies/login/LoginStately";

const BODIES: Record<string, React.ComponentType> = {
  classic: LoginShared,
  paper: LoginPaper,
  editorial: LoginEditorial,
  vibrant: LoginVibrant,
  stately: LoginStately,
};

export default function MemberLoginPage() {
  const { design } = useDesign();
  const Body = BODIES[design] ?? LoginShared;
  return (
    <DesignShell>
      <Body />
    </DesignShell>
  );
}
