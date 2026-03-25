"use client";

import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Announcements from "./components/Announcements";
import About from "./components/About";
import News from "./components/News";
import History from "./components/History";
import Conference from "./components/Conference";
import Activities from "./components/Activities";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";

export default function Home() {
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    fetch("/api/cms")
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => setContent({}));
  }, []);

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero data={content.hero} />
      <Announcements />
      <About data={content.about} />
      <News />
      <History data={content.history} />
      <Conference data={content.conference} />
      <Activities data={content.activities} />
      <Footer data={content.site} />
    </main>
  );
}
