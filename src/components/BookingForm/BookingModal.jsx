"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./BookingModal.module.css";
import { EMAIL, WHATSAPP_URL } from "@/data/site";
import { MANAGEMENT } from "@/data/artists";

const EVENT_TYPES = [
  "Concert",
  "Corporate Dinner",
  "Wedding",
  "Festival",
  "Cruise",
  "Private Party",
  "Brand Activation",
  "Award Show",
  "Other",
];

const BUDGETS = [
  "Under PKR 1M",
  "PKR 1M – 3M",
  "PKR 3M – 7M",
  "PKR 7M – 15M",
  "PKR 15M+",
  "Prefer to discuss",
];

const EMPTY = {
  artist: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  eventType: "",
  eventDate: "",
  location: "",
  venue: "",
  audience: "",
  budget: "",
  details: "",
};

const LABELS = {
  artist: "Artist",
  name: "Full name",
  company: "Company / organization",
  email: "Email",
  phone: "Phone",
  eventType: "Event type",
  eventDate: "Event date",
  location: "City / country",
  venue: "Venue",
  audience: "Expected audience",
  budget: "Budget range",
  details: "Additional details",
};

export default function BookingModal({ artist, artists = [], onClose }) {
  const [form, setForm] = useState({ ...EMPTY, artist: artist?.name || "" });
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    firstFieldRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const summary = () =>
    Object.entries(LABELS)
      .map(([key, label]) => `${label}: ${form[key] || "—"}`)
      .join("\n");

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Booking enquiry${form.artist ? ` — ${form.artist}` : ""}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(summary())}`;
  };

  const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(
    `Booking enquiry\n\n${summary()}`
  )}`;

  const management = MANAGEMENT[artist?.managementType || "network"];

  return (
    <div
      className={styles.overlay}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        ref={dialogRef}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close booking enquiry"
        >
          ×
        </button>

        <p className="eyebrow">Booking enquiry</p>
        <h2 id="booking-title" className={styles.title}>
          {artist ? `Book ${artist.name}` : "Request a booking"}
        </h2>
        <p className={styles.note}>{management.statement}</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="bk-artist">
              Artist *
            </label>
            <input
              id="bk-artist"
              list="bk-artist-list"
              required
              ref={firstFieldRef}
              value={form.artist}
              onChange={set("artist")}
              placeholder="Start typing an artist name"
              className={styles.input}
            />
            <datalist id="bk-artist-list">
              {artists.map((a) => (
                <option key={a.slug} value={a.name} />
              ))}
            </datalist>
          </div>

          <div className={styles.pair}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="bk-name">
                Full name *
              </label>
              <input
                id="bk-name"
                required
                value={form.name}
                onChange={set("name")}
                placeholder="Your name"
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="bk-company">
                Company / organization
              </label>
              <input
                id="bk-company"
                value={form.company}
                onChange={set("company")}
                placeholder="Optional"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.pair}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="bk-email">
                Email *
              </label>
              <input
                id="bk-email"
                type="email"
                required
                value={form.email}
                onChange={set("email")}
                placeholder="you@example.com"
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="bk-phone">
                Phone *
              </label>
              <input
                id="bk-phone"
                type="tel"
                required
                value={form.phone}
                onChange={set("phone")}
                placeholder="03xx xxxxxxx"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.pair}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="bk-type">
                Event type
              </label>
              <select
                id="bk-type"
                value={form.eventType}
                onChange={set("eventType")}
                className={styles.input}
              >
                <option value="">Select…</option>
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="bk-date">
                Event date
              </label>
              <input
                id="bk-date"
                type="date"
                value={form.eventDate}
                onChange={set("eventDate")}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.pair}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="bk-location">
                City / country *
              </label>
              <input
                id="bk-location"
                required
                value={form.location}
                onChange={set("location")}
                placeholder="Lahore, Pakistan"
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="bk-venue">
                Venue
              </label>
              <input
                id="bk-venue"
                value={form.venue}
                onChange={set("venue")}
                placeholder="If confirmed"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.pair}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="bk-audience">
                Expected audience
              </label>
              <input
                id="bk-audience"
                inputMode="numeric"
                value={form.audience}
                onChange={set("audience")}
                placeholder="e.g. 1,200"
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="bk-budget">
                Budget range
              </label>
              <select
                id="bk-budget"
                value={form.budget}
                onChange={set("budget")}
                className={styles.input}
              >
                <option value="">Select…</option>
                {BUDGETS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="bk-details">
              Additional details
            </label>
            <textarea
              id="bk-details"
              rows={4}
              value={form.details}
              onChange={set("details")}
              placeholder="Running order, other acts, technical requirements, anything else we should know"
              className={`${styles.input} ${styles.textarea}`}
            />
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.submit}>
              Send enquiry
            </button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.alt}
            >
              Send on WhatsApp
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
