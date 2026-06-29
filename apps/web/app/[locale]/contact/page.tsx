"use client";

import { useEffect, useState } from "react";
import DesignShell from "../../components/DesignShell";
import { useDesign } from "../../components/DesignContext";
import ContactShared from "../../components/pagebodies/contact/ContactShared";
import ContactPaper from "../../components/pagebodies/contact/ContactPaper";
import ContactEditorial from "../../components/pagebodies/contact/ContactEditorial";
import ContactVibrant from "../../components/pagebodies/contact/ContactVibrant";
import ContactStately from "../../components/pagebodies/contact/ContactStately";

const BODIES: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ComponentType<{ content: Record<string, any> }>
> = {
  classic: ContactShared,
  paper: ContactPaper,
  editorial: ContactEditorial,
  vibrant: ContactVibrant,
  stately: ContactStately,
};

export default function ContactPage() {
  const { design } = useDesign();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<Record<string, any>>({});
  useEffect(() => {
    fetch("/api/cms")
      .then((r) => r.json())
      .then(setContent)
      .catch(() => setContent({}));
  }, []);
  const Body = BODIES[design] ?? ContactShared;
  return (
    <DesignShell>
      <Body content={content} />
    </DesignShell>
  );
}
