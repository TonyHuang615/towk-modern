"use client";

import { useEffect, useState } from "react";

// Returns true only when the Google OAuth provider is actually configured
// (GOOGLE_CLIENT_ID/SECRET present → next-auth lists it in /api/auth/providers).
// Lets the login designs hide the Google button when it would only error.
export function useGoogleEnabled(): boolean {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    let active = true;
    fetch("/api/auth/providers")
      .then((r) => (r.ok ? r.json() : null))
      .then((p) => {
        if (active) setEnabled(Boolean(p && p.google));
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);
  return enabled;
}
