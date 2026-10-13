"use client";

import { useEffect } from "react";
import { EVENTS, track } from "@/lib/analytics";

const CLICK_EVENTS = [
  [(href) => href.startsWith("https://wa.me/"), EVENTS.whatsappClick],
  [(href) => href.startsWith("tel:"), EVENTS.phoneClick],
  [(href) => href.startsWith("mailto:"), EVENTS.emailClick],
];

/**
 * One delegated listener for WhatsApp, phone and email links, so server
 * components only need `data-cta` / `data-artist` attributes on the anchor.
 * The link target itself (which can contain a prefilled message) is never
 * sent — only the fixed event name and allow-listed attributes.
 */
export default function ConversionTracker() {
  useEffect(() => {
    // Bubble phase, after React's own handlers: a click a component cancelled
    // (e.g. WhatsApp blocked until required fields are filled) is not counted.
    const onClick = (e) => {
      if (e.defaultPrevented) return;
      const link = e.target.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href");
      const match = CLICK_EVENTS.find(([test]) => test(href));
      if (!match) return;
      track(match[1], {
        cta_location: link.closest("[data-cta]")?.dataset.cta || "unlabelled",
        artist_slug: link.closest("[data-artist]")?.dataset.artist,
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
