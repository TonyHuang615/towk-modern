"use client";

import Navigation from "../Navigation";
import Footer from "../Footer";

// 经典传承 chrome — reuse the shared Navigation/Footer.
// Force the solid (scrolled) style so the header is readable on inner
// pages with light backgrounds (the default transparent overlay assumes a
// dark hero behind it).
export function ClassicHeader() {
  return <Navigation solid />;
}

export function ClassicFooter() {
  return <Footer />;
}
