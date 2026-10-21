// Relative imports keep this module runnable under `node --test`.
import { SITE_URL } from "../data/site.js";
import { EVENT_TYPES } from "./enquiry.js";

/**
 * Conversion events. Opening WhatsApp, a phone dialler or a mail app is only a
 * click (`*_click`); `booking_submit` / `contact_submit` fire only after the
 * server has accepted an enquiry.
 *
 * Privacy rule: nothing derived from the visitor's URL, query string, referrer
 * path or anything they typed is ever sent. Pages are reported as a fixed route
 * ID (e.g. "/artists/:slug"), and every event parameter must pass a strict
 * format check or it is dropped.
 */
export const EVENTS = {
  whatsappClick: "whatsapp_click",
  phoneClick: "phone_click",
  emailClick: "email_click",
  bookingModalOpen: "booking_modal_open",
  bookingSubmit: "booking_submit",
  contactSubmit: "contact_submit",
  searchNoResults: "search_no_results",
};

// Every allowed parameter, with the only values it may carry. cta_location
// and artist_slug come from data-* attributes rendered by the server from
// source code and the artist roster — never from visitor input.
const PARAM_RULES = {
  cta_location: (v) => /^[a-z0-9_]{1,40}$/.test(v),
  artist_slug: (v) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v) && v.length <= 80,
  event_type: (v) => EVENT_TYPES.includes(v),
};

const STATIC_ROUTES = new Set(["/", "/about", "/artists", "/contact", "/how-to-book", "/work"]);

/** Maps any pathname to a fixed route ID; unknown paths become "/other". */
export function routeIdFor(pathname) {
  const path = typeof pathname === "string" ? pathname.split(/[?#]/)[0] : "";
  const trimmed = path.length > 1 ? path.replace(/\/+$/, "") : path;
  if (STATIC_ROUTES.has(trimmed)) return trimmed;
  if (/^\/artists\/[^/]+$/.test(trimmed)) return "/artists/:slug";
  return "/other";
}

/** Same-site referrers become a route ID; other sites are reduced to their origin. */
export function safeReferrer(referrer) {
  if (!referrer) return undefined;
  try {
    const url = new URL(referrer);
    if (url.origin === new URL(SITE_URL).origin) return `${SITE_URL}${routeIdFor(url.pathname)}`;
    if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
    return `${url.protocol}//${url.host}/`;
  } catch {
    return undefined;
  }
}

export function pageContext(pathname, referrer) {
  const route = routeIdFor(pathname);
  return {
    page_location: `${SITE_URL}${route}`,
    page_title: route,
    page_referrer: safeReferrer(referrer),
  };
}

export function cleanParams(params = {}) {
  const clean = {};
  for (const [key, raw] of Object.entries(params)) {
    if (raw == null) continue;
    const value = String(raw);
    if (PARAM_RULES[key]?.(value)) clean[key] = value;
  }
  return clean;
}

const gtagOf = (win) => (typeof win?.gtag === "function" ? win.gtag : null);

export function track(name, params = {}, win = typeof window === "undefined" ? null : window) {
  try {
    const gtag = gtagOf(win);
    if (gtag && Object.values(EVENTS).includes(name)) gtag("event", name, cleanParams(params));
  } catch {
    // Analytics must never break the page.
  }
}

/**
 * Queues consent defaults and config before gtag.js loads. Automatic page views
 * are off; the page location is replaced by a route ID for every hit.
 */
export function initAnalytics(win, { measurementId, analyticsStorage, pathname, referrer, artistSlug }) {
  if (!win || win.__gnfAnalyticsReady) return;
  win.__gnfAnalyticsReady = true;
  win.dataLayer = win.dataLayer || [];
  win.gtag =
    win.gtag ||
    function gtag() {
      win.dataLayer.push(arguments); // gtag.js requires the arguments object
    };
  const context = pageContext(pathname, referrer);
  win.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: analyticsStorage === "granted" ? "granted" : "denied",
  });
  win.gtag("set", "ads_data_redaction", true);
  win.gtag("set", context);
  win.gtag("js", new Date());
  win.gtag("config", measurementId, {
    ...context,
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  win.gtag("event", "page_view", { ...context, ...cleanParams({ artist_slug: artistSlug }) });
}

/** Client-side navigations: same normalisation, previous route as referrer. */
export function trackPageView(win, { pathname, previousPathname, artistSlug }) {
  const gtag = gtagOf(win);
  if (!gtag || !win.__gnfAnalyticsReady) return;
  const context = pageContext(pathname, previousPathname ? `${SITE_URL}${previousPathname}` : undefined);
  gtag("set", context);
  gtag("event", "page_view", { ...context, ...cleanParams({ artist_slug: artistSlug }) });
}
