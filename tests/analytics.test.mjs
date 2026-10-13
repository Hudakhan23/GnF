import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  EVENTS,
  cleanParams,
  initAnalytics,
  routeIdFor,
  safeReferrer,
  track,
  trackPageView,
} from "../src/lib/analytics.js";

// Values that must never appear in anything sent to analytics.
const PII = ["John", "Smith", "0300", "1234567", "john@example.com", "secret", "utm_source", "?", "%40"];

const HOSTILE_PATH = "/artists/john-smith-03001234567";
const HOSTILE_URLS = [
  "/contact?name=John+Smith&phone=03001234567&email=john%40example.com",
  "/artists?q=John%20Smith%200300%201234567",
  "/artists/john-smith-03001234567?utm_source=secret#john@example.com",
  "/John-Smith/0300-1234567",
];

function fakeWindow() {
  const win = { dataLayer: [] };
  return win;
}

// gtag pushes `arguments` objects; flatten them for inspection.
const sent = (win) => JSON.stringify(win.dataLayer.map((args) => Array.from(args)));

function assertNoPii(payload) {
  for (const value of PII) {
    assert.equal(payload.includes(value), false, `analytics payload leaked "${value}": ${payload}`);
  }
}

describe("routeIdFor", () => {
  it("maps known pages to themselves and artist pages to a template", () => {
    assert.equal(routeIdFor("/"), "/");
    assert.equal(routeIdFor("/contact/"), "/contact");
    assert.equal(routeIdFor("/artists/atif-aslam"), "/artists/:slug");
    assert.equal(routeIdFor(HOSTILE_PATH), "/artists/:slug");
  });

  it("collapses unknown, query-carrying and malformed paths", () => {
    assert.equal(routeIdFor("/John-Smith/0300-1234567"), "/other");
    assert.equal(routeIdFor("/contact?name=John"), "/contact");
    assert.equal(routeIdFor(undefined), "/other");
  });
});

describe("safeReferrer", () => {
  it("keeps only the origin of external referrers", () => {
    assert.equal(safeReferrer("https://www.google.com/search?q=john+smith+03001234567"), "https://www.google.com/");
    assert.equal(safeReferrer("https://chatgpt.com/c/abc?utm_source=secret"), "https://chatgpt.com/");
  });

  it("normalises same-site referrers and drops junk", () => {
    assert.equal(safeReferrer(`https://www.gnfevents.com.pk${HOSTILE_PATH}?x=1`), "https://www.gnfevents.com.pk/artists/:slug");
    assert.equal(safeReferrer("javascript:alert(1)"), undefined);
    assert.equal(safeReferrer("not a url"), undefined);
  });
});

describe("initAnalytics / trackPageView", () => {
  for (const url of HOSTILE_URLS) {
    it(`sends no URL data for ${url}`, () => {
      const win = fakeWindow();
      initAnalytics(win, {
        measurementId: "G-TEST1234",
        analyticsStorage: "denied",
        pathname: url,
        referrer: `https://www.google.com/search?q=John+Smith+03001234567`,
      });
      trackPageView(win, { pathname: url, previousPathname: url });
      assertNoPii(sent(win));
    });
  }

  it("disables automatic page views, defaults storage to denied and sends one page_view", () => {
    const win = fakeWindow();
    initAnalytics(win, { measurementId: "G-TEST1234", analyticsStorage: undefined, pathname: "/contact" });
    const calls = win.dataLayer.map((a) => Array.from(a));
    const consent = calls.find(([c, d]) => c === "consent" && d === "default");
    assert.equal(consent[2].analytics_storage, "denied");
    assert.equal(consent[2].ad_storage, "denied");
    const config = calls.find(([c]) => c === "config");
    assert.equal(config[2].send_page_view, false);
    assert.equal(config[2].page_location, "https://www.gnfevents.com.pk/contact");
    assert.equal(calls.filter(([c, n]) => c === "event" && n === "page_view").length, 1);
  });

  it("only grants analytics storage when explicitly configured", () => {
    const win = fakeWindow();
    initAnalytics(win, { measurementId: "G-TEST1234", analyticsStorage: "granted", pathname: "/" });
    const consent = win.dataLayer.map((a) => Array.from(a)).find(([c]) => c === "consent");
    assert.equal(consent[2].analytics_storage, "granted");
  });

  it("initialises once even if called twice", () => {
    const win = fakeWindow();
    initAnalytics(win, { measurementId: "G-TEST1234", pathname: "/" });
    const count = win.dataLayer.length;
    initAnalytics(win, { measurementId: "G-TEST1234", pathname: "/" });
    assert.equal(win.dataLayer.length, count);
  });
});

describe("track", () => {
  it("forwards only allow-listed, well-formed params", () => {
    const win = fakeWindow();
    initAnalytics(win, { measurementId: "G-TEST1234", pathname: "/" });
    win.dataLayer.length = 0;
    track(
      EVENTS.bookingSubmit,
      {
        cta_location: "artist_hero",
        event_type: "Wedding",
        name: "John Smith",
        phone: "03001234567",
        email: "john@example.com",
        message: "hello",
        page_path: HOSTILE_PATH,
        search_term: "John Smith",
      },
      win
    );
    assert.deepEqual(win.dataLayer.map((a) => Array.from(a)), [
      ["event", "booking_submit", { cta_location: "artist_hero", event_type: "Wedding" }],
    ]);
  });

  it("drops param values that are not in the allowed format", () => {
    assert.deepEqual(
      cleanParams({
        cta_location: "John Smith 0300",
        artist_slug: "john@example.com",
        event_type: "My wedding at John's house",
      }),
      {}
    );
  });

  it("ignores unknown event names", () => {
    const win = fakeWindow();
    initAnalytics(win, { measurementId: "G-TEST1234", pathname: "/" });
    win.dataLayer.length = 0;
    track("John Smith 03001234567", {}, win);
    assert.equal(win.dataLayer.length, 0);
  });

  it("never throws when gtag is missing or broken", () => {
    assert.doesNotThrow(() => track(EVENTS.whatsappClick, {}, {}));
    assert.doesNotThrow(() =>
      track(EVENTS.whatsappClick, {}, {
        gtag: () => {
          throw new Error("blocked");
        },
      })
    );
  });
});
