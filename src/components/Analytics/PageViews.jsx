"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { initAnalytics, trackPageView } from "@/lib/analytics";

// Artist pages render <main data-artist="slug"> from the roster; nothing else
// sets it, so this never carries visitor input.
const currentArtist = () => document.querySelector("main[data-artist]")?.dataset.artist;

/** Sends route-ID page views only; the real URL never reaches analytics. */
export default function PageViews({ measurementId, analyticsStorage }) {
  const pathname = usePathname();
  const previous = useRef(null);

  useEffect(() => {
    if (previous.current === null) {
      initAnalytics(window, {
        measurementId,
        analyticsStorage,
        pathname,
        referrer: document.referrer,
        artistSlug: currentArtist(),
      });
    } else if (previous.current !== pathname) {
      trackPageView(window, {
        pathname,
        previousPathname: previous.current,
        artistSlug: currentArtist(),
      });
    }
    previous.current = pathname;
  }, [pathname, measurementId, analyticsStorage]);

  return null;
}
