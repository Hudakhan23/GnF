import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  ARTISTS,
  FACETS,
  artists,
  getArtist,
  isIndexable,
  relatedArtists,
  suitabilityFor,
  filterArtists,
  homepageNextWaveArtists,
} from "../src/data/artists.js";

const ROOT = process.cwd();

test("artists roster integrity", async (t) => {
  await t.test("all artist slugs are unique and well-formed", () => {
    const seen = new Set();
    for (const a of ARTISTS) {
      assert.ok(a.slug, `artist ${a.name} must have a slug`);
      assert.match(
        a.slug,
        /^[a-z0-9-]+$/,
        `slug ${a.slug} must only contain lowercase alphanumeric and hyphens`
      );
      assert.ok(!seen.has(a.slug), `duplicate slug found: ${a.slug}`);
      seen.add(a.slug);
    }
  });

  await t.test("all artist names are unique", () => {
    const seen = new Set();
    for (const a of ARTISTS) {
      const lower = a.name.trim().toLowerCase();
      assert.ok(!seen.has(lower), `duplicate artist name found: ${a.name}`);
      seen.add(lower);
    }
  });

  await t.test("all artists are confirmed and indexable (0 pending review)", () => {
    const pendingReview = ARTISTS.filter((a) => !isIndexable(a));
    assert.equal(
      pendingReview.length,
      0,
      "expected 0 artists to remain flagged with needsReview"
    );
    const confirmedIndexable = ARTISTS.filter(isIndexable);
    assert.equal(
      confirmedIndexable.length,
      342,
      "expected all 342 confirmed artists to be indexable"
    );
  });

  await t.test("every artist with an image has an existing file under public/", () => {
    for (const a of ARTISTS) {
      if (a.image) {
        const fullPath = path.join(ROOT, "public", a.image);
        assert.ok(
          fs.existsSync(fullPath),
          `image for ${a.name} does not exist: ${fullPath}`
        );
      }
    }
  });

  await t.test("homepage discovery strip artists resolve to valid roster profiles", () => {
    assert.ok(homepageNextWaveArtists.length > 0);
    for (const pick of homepageNextWaveArtists) {
      assert.ok(pick.name, `pick ${pick.slug} must have a name`);
      assert.ok(pick.href, `pick ${pick.slug} must resolve to a valid href`);
      assert.ok(
        pick.href.startsWith("/artists/"),
        `pick ${pick.slug} href must point to /artists/:slug`
      );
      const resolved = getArtist(pick.slug);
      assert.ok(resolved, `discovery pick ${pick.slug} must exist in main ARTISTS roster`);
    }
  });

  await t.test("nationalities for Annural Khalid and Alycia Dias are correctly Pakistan", () => {
    const annural = getArtist("annural-khalid");
    assert.ok(annural);
    assert.equal(annural.country, "Pakistan");
    assert.equal(annural.internationalOnly, false);

    const alycia = getArtist("alycia-dias");
    assert.ok(alycia);
    assert.equal(alycia.country, "Pakistan");
    assert.equal(alycia.internationalOnly, false);
  });

  await t.test("every indexable artist receives at least one related inbound link", () => {
    const inbound = new Map();
    for (const a of artists) {
      inbound.set(a.slug, 0);
    }
    for (const a of artists) {
      const rel = relatedArtists(a);
      assert.ok(
        rel.length <= 4,
        `artist ${a.slug} should have at most 4 related artists`
      );
      for (const r of rel) {
        inbound.set(r.slug, (inbound.get(r.slug) || 0) + 1);
      }
    }
    const orphans = artists
      .filter(isIndexable)
      .filter((a) => (inbound.get(a.slug) || 0) === 0);
    assert.deepEqual(
      orphans.map((a) => a.name),
      [],
      "every indexable artist must receive at least 1 inbound related link"
    );
  });

  await t.test("suitabilityFor returns valid event types for all artists", () => {
    for (const a of ARTISTS) {
      const suit = suitabilityFor(a);
      assert.ok(Array.isArray(suit) && suit.length > 0, `artist ${a.name} must have suitability`);
    }
  });

  await t.test("FACETS include Classical, Electronic / EDM, and Music Producers", () => {
    const classical = FACETS.find((f) => f.id === "classical");
    assert.ok(classical, "Classical facet must exist");
    assert.equal(classical.group, "genre");

    const electronic = FACETS.find((f) => f.id === "electronic");
    assert.ok(electronic, "Electronic facet must exist");
    assert.equal(electronic.group, "genre");

    const producers = FACETS.find((f) => f.id === "producers");
    assert.ok(producers, "Producers facet must exist");
    assert.equal(producers.group, "more");

    const classicalMatches = filterArtists(ARTISTS, { facets: ["classical"] });
    assert.ok(classicalMatches.length >= 25, "Classical facet should match at least 25 artists");

    const electronicMatches = filterArtists(ARTISTS, { facets: ["electronic"] });
    assert.ok(electronicMatches.length >= 4, "Electronic facet should match electronic artists & DJs");

    const producerMatches = filterArtists(ARTISTS, { facets: ["producers"] });
    assert.ok(producerMatches.length >= 5, "Producer facet should match music producers");
  });

  await t.test("every artist has valid suitability for FAQ generation", () => {
    for (const a of ARTISTS) {
      const suit = suitabilityFor(a);
      assert.ok(Array.isArray(suit) && suit.length > 0, `artist ${a.slug} has no suitability tags`);
    }
  });
});
