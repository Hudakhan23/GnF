import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import {
  EVENTS,
  EVENT_CATEGORIES,
  EVENT_CREDITS,
  HOME_FEATURED_EVENTS,
  INTERNATIONAL_PARTNERS,
  SIGNATURE_EVENTS,
  eventPlace,
  formatEventDate,
  getEvent,
  getEventStats,
  joinNames,
} from "../src/data/events.js";

const PUBLIC = path.join(process.cwd(), "public");
const CATEGORY_KEYS = new Set(EVENT_CATEGORIES.map((category) => category.key));

describe("event archive data", () => {
  it("points every event at a poster that exists in /public", () => {
    for (const event of EVENTS) {
      assert.ok(fs.existsSync(path.join(PUBLIC, event.poster)), `${event.slug}: missing ${event.poster}`);
    }
  });

  it("uses each poster once and each slug once", () => {
    assert.equal(new Set(EVENTS.map((event) => event.poster)).size, EVENTS.length);
    assert.equal(new Set(EVENTS.map((event) => event.slug)).size, EVENTS.length);
  });

  it("lists dated events newest first", () => {
    const dates = EVENTS.map((event) => event.date).filter(Boolean);
    assert.deepEqual(dates, [...dates].sort().reverse());
  });

  it("only uses known categories and credits", () => {
    for (const event of EVENTS) {
      assert.ok(CATEGORY_KEYS.has(event.category), `${event.slug}: unknown category ${event.category}`);
      assert.ok(EVENT_CREDITS[event.credit], `${event.slug}: unknown credit ${event.credit}`);
    }
  });

  it("only features events and partner logos that exist", () => {
    for (const partner of INTERNATIONAL_PARTNERS) {
      assert.ok(fs.existsSync(path.join(PUBLIC, partner.logo)), `${partner.name}: missing ${partner.logo}`);
    }
    for (const slug of [
      ...HOME_FEATURED_EVENTS,
      ...SIGNATURE_EVENTS.map((s) => s.slug),
      ...INTERNATIONAL_PARTNERS.flatMap((p) => p.events),
    ]) {
      assert.ok(getEvent(slug), `${slug} is featured but not in EVENTS`);
    }
  });

  it("archives every poster in /public/RecentShows", () => {
    const used = new Set(EVENTS.map((event) => path.basename(event.poster)));
    const unused = fs.readdirSync(path.join(PUBLIC, "RecentShows")).filter((file) => !used.has(file));
    assert.deepEqual(unused, []);
  });
});

describe("event formatting", () => {
  it("formats dates and falls back when the poster has none", () => {
    assert.equal(formatEventDate({ date: "2024-08-10" }), "10 Aug 2024");
    assert.equal(formatEventDate({ date: "2025-02-23", dateLabel: "23–27 Feb 2025" }), "23–27 Feb 2025");
    assert.equal(formatEventDate({ date: null }), "Date not on poster");
  });

  it("joins names and places", () => {
    assert.equal(joinNames(["A"]), "A");
    assert.equal(joinNames(["A", "B", "C"]), "A, B & C");
    assert.equal(eventPlace({ venue: "", cities: ["Michigan"], country: "USA" }), "Michigan, USA");
    assert.equal(eventPlace({ venue: "LGS Gujrat", cities: ["Gujrat"], country: "Pakistan" }), "LGS Gujrat · Gujrat");
  });

  it("derives stats from the data", () => {
    const stats = getEventStats();
    assert.equal(stats.shows, EVENTS.length);
    assert.deepEqual(stats.countriesAbroad.sort(), ["Canada", "Denmark", "USA"]);
    assert.ok(stats.pakistanCities > 0 && stats.artists > 0);
  });
});
