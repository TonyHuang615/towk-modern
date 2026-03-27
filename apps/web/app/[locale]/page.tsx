import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Announcements from "../components/Announcements";
import About from "../components/About";
import News from "../components/News";
import History from "../components/History";
import Conference from "../components/Conference";
import Activities from "../components/Activities";
import Footer from "../components/Footer";
import { getContent } from "../../lib/cms";

export default function Home() {
  const content = getContent() as Record<string, Record<string, unknown>>;

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero data={content.hero as any} />
      <Announcements />
      <About data={content.about as any} />
      <News />
      <History data={content.history as any} />
      <Conference data={content.conference as any} />
      <Activities data={content.activities as any} />
      <Footer data={content.site as any} />
    </main>
  );
}
