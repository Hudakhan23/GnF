"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./ArtistDirectory.module.css";
import ArtistCard from "@/components/ArtistCard/ArtistCard";
import {
  ARTISTS,
  FACETS,
  SORTS,
  filterArtists,
  sortArtists,
} from "@/data/artists";

const GENRE_FACETS = FACETS.filter((f) => f.group === "genre");
const MORE_FACETS = FACETS.filter((f) => f.group === "more");

// Facets that would never match anything are dropped rather than shown dead.
const usable = (facets) => facets.filter((f) => ARTISTS.some(f.match));

export default function ArtistDirectory() {
  const [query, setQuery] = useState("");
  const [facets, setFacets] = useState([]);
  const [sort, setSort] = useState("featured");
  const [moreOpen, setMoreOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const moreRef = useRef(null);

  const genreFacets = useMemo(() => usable(GENRE_FACETS), []);
  const moreFacets = useMemo(() => usable(MORE_FACETS), []);

  const results = useMemo(
    () => sortArtists(filterArtists(ARTISTS, { query, facets }), sort),
    [query, facets, sort]
  );

  useEffect(() => {
    if (!moreOpen) return;
    const onClick = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setMoreOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [moreOpen]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = drawerOpen ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  const toggle = (id) =>
    setFacets((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const clearAll = () => {
    setFacets([]);
    setQuery("");
  };

  const activeMore = facets.filter((id) =>
    moreFacets.some((f) => f.id === id)
  ).length;

  const controls = (
    <>
      <div className={styles.chips} role="group" aria-label="Genre filters">
        <button
          type="button"
          className={`${styles.chip} ${!facets.length ? styles.chipOn : ""}`}
          onClick={clearAll}
          aria-pressed={!facets.length}
        >
          All Artists
        </button>
        {genreFacets.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`${styles.chip} ${
              facets.includes(f.id) ? styles.chipOn : ""
            } ${f.id === "exclusive" ? styles.chipExclusive : ""}`}
            onClick={() => toggle(f.id)}
            aria-pressed={facets.includes(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </>
  );

  return (
    <section className={styles.directory} id="directory">
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon} aria-hidden="true">
            ⌕
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search artists..."
            aria-label="Search artists by name"
            className={styles.search}
          />
        </div>

        <div className={styles.toolbarRight}>
          <div className={styles.moreWrap} ref={moreRef}>
            <button
              type="button"
              className={`${styles.control} ${activeMore ? styles.controlOn : ""}`}
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
            >
              More filters{activeMore ? ` (${activeMore})` : ""}
            </button>
            {moreOpen && (
              <div className={styles.dropdown}>
                {moreFacets.map((f) => (
                  <label key={f.id} className={styles.check}>
                    <input
                      type="checkbox"
                      checked={facets.includes(f.id)}
                      onChange={() => toggle(f.id)}
                    />
                    <span>{f.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <label className={styles.sortWrap}>
            <span className={styles.srOnly}>Sort artists</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className={styles.control}
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  Sort: {s.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            className={`${styles.control} ${styles.drawerTrigger}`}
            onClick={() => setDrawerOpen(true)}
          >
            Filters{facets.length ? ` (${facets.length})` : ""}
          </button>
        </div>
      </div>

      <div className={styles.chipRow}>{controls}</div>

      <div className={styles.status}>
        <p className={styles.count}>
          {results.length} {results.length === 1 ? "artist" : "artists"}
        </p>
        {(facets.length > 0 || query) && (
          <button type="button" className={styles.clear} onClick={clearAll}>
            Clear all
          </button>
        )}
      </div>

      {results.length ? (
        <div className={styles.grid}>
          {results.map((artist, i) => (
            <ArtistCard
              key={artist.slug}
              artist={artist}
              priority={i < 6}
            />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No artists match that search.</p>
          <p className={styles.emptyText}>
            Our network reaches well beyond this roster — tell us who you have
            in mind and we will source them.
          </p>
          <button type="button" className="btn-outline" onClick={clearAll}>
            Reset filters
          </button>
        </div>
      )}

      {drawerOpen && (
        <div
          className={styles.drawerOverlay}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setDrawerOpen(false);
          }}
        >
          <div className={styles.drawer} role="dialog" aria-label="Filters">
            <div className={styles.drawerHead}>
              <p className={styles.drawerTitle}>Filters</p>
              <button
                type="button"
                className={styles.drawerClose}
                onClick={() => setDrawerOpen(false)}
                aria-label="Close filters"
              >
                ×
              </button>
            </div>
            <div className={styles.drawerBody}>
              <p className={styles.drawerLabel}>Sort</p>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className={styles.drawerSort}
                aria-label="Sort artists"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              <p className={styles.drawerLabel}>Genre</p>
              {controls}
              <p className={styles.drawerLabel}>More filters</p>
              {moreFacets.map((f) => (
                <label key={f.id} className={styles.check}>
                  <input
                    type="checkbox"
                    checked={facets.includes(f.id)}
                    onChange={() => toggle(f.id)}
                  />
                  <span>{f.label}</span>
                </label>
              ))}
            </div>
            <div className={styles.drawerFoot}>
              <button type="button" className={styles.clear} onClick={clearAll}>
                Clear all
              </button>
              <button
                type="button"
                className="btn-gold"
                onClick={() => setDrawerOpen(false)}
              >
                Show {results.length} artists
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
