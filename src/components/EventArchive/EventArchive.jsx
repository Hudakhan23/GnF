"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { whatsappLink } from "@/data/site";
import styles from "./EventArchive.module.css";

const PAGE_SIZE = 16;
const SUPERIOR = "superior";

function enquiryLink(event) {
  return whatsappLink(
    `Hi GnF Events, I saw the ${event.headline} show (${event.dateLabel}) on your website and would like to discuss a similar event.\nEvent type: \nDate: \nCity: `,
  );
}

/**
 * Filterable poster archive with a <dialog> detail view. `events` arrive
 * pre-formatted from the server so this component only handles interaction.
 * The open show is mirrored in the URL hash (/work#<slug>) and the filter in
 * ?type=, so a single show or category can be shared as a link.
 */
export default function EventArchive({ events, categories }) {
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [openSlug, setOpenSlug] = useState(null);
  const dialogRef = useRef(null);

  const list = useMemo(() => {
    if (filter === "all") return events;
    if (filter === SUPERIOR) return events.filter((event) => event.superior);
    return events.filter((event) => event.category === filter);
  }, [events, filter]);

  const visible = showAll ? list : list.slice(0, PAGE_SIZE);
  const openIndex = list.findIndex((event) => event.slug === openSlug);
  const current = openIndex >= 0 ? list[openIndex] : null;

  // Read a shared link on load (?type=<category>, #<event slug>), and open a
  // show whenever an in-page link (e.g. a signature project) sets its hash.
  useEffect(() => {
    const openFromHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (!events.some((event) => event.slug === slug)) return false;
      setOpenSlug(slug);
      return true;
    };
    const timer = window.setTimeout(() => {
      const type = new URLSearchParams(window.location.search).get("type");
      const known = type === SUPERIOR || categories.some((category) => category.key === type);
      if (known) {
        setFilter(type);
        setShowAll(true);
      }
      openFromHash();
    }, 0);
    const onHashChange = () => {
      setFilter((currentFilter) => {
        const slug = decodeURIComponent(window.location.hash.slice(1));
        const event = events.find((item) => item.slug === slug);
        if (!event) return currentFilter;
        const fits =
          currentFilter === "all" ||
          (currentFilter === SUPERIOR ? event.superior : event.category === currentFilter);
        return fits ? currentFilter : "all";
      });
      openFromHash();
    };
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [categories, events]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (current && !dialog.open) dialog.showModal();
    if (!current && dialog.open) dialog.close();
  }, [current]);

  const writeUrl = useCallback((nextFilter, slug) => {
    const url = new URL(window.location.href);
    if (nextFilter === "all") url.searchParams.delete("type");
    else url.searchParams.set("type", nextFilter);
    url.hash = slug ? slug : "";
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  const pickFilter = (key) => {
    setFilter(key);
    setShowAll(false);
    writeUrl(key, null);
  };

  const open = (slug) => {
    setOpenSlug(slug);
    writeUrl(filter, slug);
  };

  const close = () => {
    setOpenSlug(null);
    writeUrl(filter, null);
  };

  const step = (direction) => {
    if (openIndex < 0) return;
    const next = list[(openIndex + direction + list.length) % list.length];
    open(next.slug);
  };

  const onDialogKeyDown = (keyEvent) => {
    if (keyEvent.key === "ArrowRight") step(1);
    if (keyEvent.key === "ArrowLeft") step(-1);
  };

  const filterButtons = [
    { key: "all", label: "All shows", count: events.length },
    ...categories,
  ];
  const activeLabel =
    filter === "all"
      ? "shows"
      : filter === SUPERIOR
        ? "Superior Group of Colleges shows"
        : categories.find((category) => category.key === filter)?.label.toLowerCase();

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filter shows by type">
        {filterButtons.map((button) => (
          <button
            type="button"
            key={button.key}
            className={styles.filter}
            aria-pressed={filter === button.key}
            onClick={() => pickFilter(button.key)}
          >
            {button.label} <span>{button.count}</span>
          </button>
        ))}
        {filter === SUPERIOR ? (
          <button
            type="button"
            className={styles.filter}
            aria-pressed
            aria-label={`Superior Group of Colleges, ${list.length} shows. Clear filter`}
            onClick={() => pickFilter("all")}
          >
            Superior Group of Colleges <span>{list.length}</span> <span aria-hidden="true">×</span>
          </button>
        ) : null}
      </div>

      <p className={styles.count} aria-live="polite">
        Showing {visible.length} of {list.length} {activeLabel}
      </p>

      <ul className={styles.grid}>
        {visible.map((event) => (
          <li key={event.slug}>
            <button
              type="button"
              className={styles.card}
              onClick={() => open(event.slug)}
            >
              <span className={styles.frame}>
                <Image
                  src={event.poster}
                  alt={event.alt}
                  fill
                  sizes="(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 300px"
                />
              </span>
              <span className={styles.meta}>
                <span className={styles.metaTop}>
                  <span>{event.dateLabel}</span>
                  <span>{event.categoryLabel}</span>
                </span>
                <span className={styles.name}>{event.headline}</span>
                <span className={styles.place}>{event.place || event.title}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {!showAll && list.length > PAGE_SIZE ? (
        <div className={styles.more}>
          <button type="button" className="btn-outline" onClick={() => setShowAll(true)}>
            Show all {list.length} shows
          </button>
        </div>
      ) : null}

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="event-dialog-title"
        onClose={close}
        onKeyDown={onDialogKeyDown}
        onClick={(clickEvent) => {
          if (clickEvent.target === dialogRef.current) close();
        }}
      >
        {current ? (
          <div className={styles.dialogInner}>
            <div className={styles.dialogPoster}>
              <Image
                src={current.poster}
                alt={current.alt}
                fill
                sizes="(max-width: 900px) 92vw, 620px"
                quality={85}
              />
            </div>
            <div className={styles.dialogBody}>
              <div className={styles.dialogTop}>
                <p>
                  {current.categoryLabel} · {openIndex + 1} of {list.length}
                </p>
                <button type="button" className={styles.iconButton} onClick={close} aria-label="Close">
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                    <path d="M3 3l12 12M15 3L3 15" />
                  </svg>
                </button>
              </div>
              <h2 id="event-dialog-title">{current.headline}</h2>
              <p className={styles.dialogTitle}>{current.title}</p>
              <dl className={styles.facts}>
                <dt>Date</dt>
                <dd>{current.dateLabel}</dd>
                <dt>Venue</dt>
                <dd>{current.venue || "—"}</dd>
                <dt>City</dt>
                <dd>{current.where || "—"}</dd>
                <dt>Our role</dt>
                <dd>{current.creditLabel}</dd>
                {current.artistLinks && current.artistLinks.length > 0 && (
                  <>
                    <dt>Artist</dt>
                    <dd className={styles.artistLinks}>
                      {current.artistLinks.map((al) => (
                        <a key={al.slug} href={al.href} className={styles.artistProfileLink}>
                          {al.name} (View Profile &amp; Booking) →
                        </a>
                      ))}
                    </dd>
                  </>
                )}
              </dl>
              <p className={styles.note}>Details are taken from the original poster shown here.</p>
              <div className={styles.dialogActions}>
                <a
                  className="btn-gold"
                  href={enquiryLink(current)}
                  target="_blank"
                  rel="noreferrer"
                  data-cta="work_event"
                >
                  Plan a similar event
                </a>
                <button type="button" className="btn-outline" onClick={() => step(-1)} aria-label="Previous show">
                  ← Prev
                </button>
                <button type="button" className="btn-outline" onClick={() => step(1)} aria-label="Next show">
                  Next →
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
