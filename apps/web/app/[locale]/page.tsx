import DesignHome from "../components/home/DesignHome";
import { getContent } from "../../lib/cms";

export default function Home() {
  const content = getContent() as Record<string, Record<string, unknown>>;

  return <DesignHome content={content} />;
}
