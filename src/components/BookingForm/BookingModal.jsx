"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./BookingModal.module.css";
import { useEnquirySubmit } from "@/components/Enquiry/useEnquirySubmit";
import { MANAGEMENT } from "@/data/artists";
import { PHONE_PRIMARY, telHref, whatsappLink } from "@/data/site";
import { BUDGETS, EVENT_TYPES, summariseEnquiry, validateEnquiry } from "@/lib/enquiry";

// Visual order of the fields, for focusing the first error.
const FIELD_ORDER = ["artist", "name", "phone", "eventType", "city", "eventDate", "email"];

const EMPTY = {
  artist: "",
  name: "",
  phone: "",
  email: "",
  eventType: "",
  eventDate: "",
  city: "",
  company: "",
  venue: "",
  audience: "",
  budget: "",
  message: "",
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([type="hidden"]):not([tabindex="-1"]), select, textarea, summary';

export default function BookingModal({
  artist,
  artists = [],
  defaultArtistName = "",
  source = "booking_modal",
  onClose,
}) {
  const [form, setForm] = useState({
    ...EMPTY,
    artist: artist?.name || defaultArtistName,
  });
  const [website, setWebsite] = useState("");
  const { status, fieldErrors, message, reference, submit } = useEnquirySubmit({
    kind: "booking",
    source,
  });
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const successRef = useRef(null);
  const submitting = status === "submitting";

  // While a submission is in flight the dialog cannot be dismissed (Escape,
  // backdrop or close button), so the visitor always sees the real outcome
  // and never loses what they typed.
  const submittingRef = useRef(false);
  useEffect(() => {
    submittingRef.current = submitting;
    // The submit and close buttons are disabled meanwhile; keep focus inside
    // the dialog rather than letting it fall back to the page behind.
    const active = document.activeElement;
    if (submitting && (!dialogRef.current?.contains(active) || active?.disabled)) {
      dialogRef.current?.focus();
    }
  }, [submitting]);
  const requestClose = useCallback(() => {
    if (!submittingRef.current) onClose();
  }, [onClose]);

  useEffect(() => {
    // Don't pop the keyboard open on touch devices.
    if (!window.matchMedia("(pointer: coarse)").matches) {
      firstFieldRef.current?.focus();
    } else {
      dialogRef.current?.focus();
    }
    const onKey = (e) => {
      if (e.key === "Escape") requestClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [requestClose]);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  // After a failed attempt the controls are re-enabled; move focus to the
  // first field that needs fixing, or to the error message.
  const alertRef = useRef(null);
  useEffect(() => {
    if (status !== "error") return;
    const first = FIELD_ORDER.find((key) => fieldErrors[key]);
    if (first) document.getElementById(`bk-${first}`)?.focus();
    else alertRef.current?.focus();
  }, [status, fieldErrors]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(form, { website });
  };

  // WhatsApp is an alternative channel, not a submission: it needs the same
  // required details, and the message carries only what was actually filled in.
  const requiredMissing = Object.keys(
    validateEnquiry({ ...form, kind: "booking", sourcePage: "/" }).errors
  ).length > 0;
  const whatsappHref = whatsappLink(`Booking enquiry\n\n${summariseEnquiry(form)}`);
  const onWhatsAppClick = (e) => {
    // Never open a second channel while a website submission is in flight.
    if (submitting) {
      e.preventDefault();
      return;
    }
    if (requiredMissing) {
      e.preventDefault();
      submit(form, { website }); // runs validation only; shows field errors
    }
  };

  const management = MANAGEMENT[artist?.managementType || "network"];

  const fieldProps = (key) => ({
    id: `bk-${key}`,
    value: form[key],
    onChange: set(key),
    className: styles.input,
    "aria-invalid": fieldErrors[key] ? true : undefined,
    "aria-describedby": fieldErrors[key] ? `bk-${key}-error` : undefined,
  });
  const errorFor = (key) =>
    fieldErrors[key] ? (
      <p id={`bk-${key}-error`} className={styles.error}>
        {fieldErrors[key]}
      </p>
    ) : null;

  return (
    <div
      className={styles.overlay}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        aria-busy={submitting}
        ref={dialogRef}
        tabIndex={-1}
        data-cta={source}
        data-artist={artist?.slug}
      >
        <button
          type="button"
          className={styles.close}
          onClick={requestClose}
          disabled={submitting}
          aria-label="Close booking enquiry"
        >
          ×
        </button>

        <p className="eyebrow">Booking enquiry</p>
        <h2 id="booking-title" className={styles.title}>
          {artist ? `Book ${artist.name}` : "Request a booking"}
        </h2>

        {status === "success" ? (
          <div className={styles.success} role="status">
            <p className={styles.successTitle} tabIndex={-1} ref={successRef}>
              Thank you — your enquiry has been submitted.
            </p>
            <p>
              It has been accepted for processing and our team will review it.
              {reference && (
                <>
                  {" "}
                  Your reference is <strong>{reference}</strong>.
                </>
              )}
            </p>
            <p>
              If you don&apos;t hear back, follow up on{" "}
              <a
                href={whatsappLink(`Hi GnF Events, following up on my website enquiry ${reference}.`)}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>{" "}
              or call <a href={telHref(PHONE_PRIMARY)}>{PHONE_PRIMARY.display}</a>.
            </p>
            <button type="button" className={styles.submit} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <p className={styles.note}>{management.short}</p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {/* Frozen while sending, so what is on screen is exactly what was sent. */}
              <fieldset className={styles.fields} disabled={submitting}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="bk-artist">
                    Artist *
                  </label>
                  <input
                    {...fieldProps("artist")}
                    list="bk-artist-list"
                    required
                    ref={firstFieldRef}
                    autoComplete="off"
                    placeholder="Start typing an artist name"
                  />
                  <datalist id="bk-artist-list">
                    {artists.map((a) => (
                      <option key={a.slug} value={a.name} />
                    ))}
                  </datalist>
                  {errorFor("artist")}
                </div>

                <div className={styles.pair}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="bk-name">
                      Full name *
                    </label>
                    <input
                      {...fieldProps("name")}
                      required
                      autoComplete="name"
                      placeholder="Your name"
                    />
                    {errorFor("name")}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="bk-phone">
                      Phone / WhatsApp *
                    </label>
                    <input
                      {...fieldProps("phone")}
                      type="tel"
                      inputMode="tel"
                      required
                      autoComplete="tel"
                      placeholder="+92 3xx xxxxxxx"
                    />
                    {errorFor("phone")}
                  </div>
                </div>

                <div className={styles.pair}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="bk-eventType">
                      Event type *
                    </label>
                    <select {...fieldProps("eventType")} required>
                      <option value="">Select…</option>
                      {EVENT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errorFor("eventType")}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="bk-city">
                      City *
                    </label>
                    <input
                      {...fieldProps("city")}
                      required
                      autoComplete="address-level2"
                      placeholder="e.g. Lahore"
                    />
                    {errorFor("city")}
                  </div>
                </div>

                <div className={styles.pair}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="bk-eventDate">
                      Event date
                    </label>
                    <input {...fieldProps("eventDate")} type="date" />
                    {errorFor("eventDate")}
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="bk-email">
                      Email
                    </label>
                    <input
                      {...fieldProps("email")}
                      type="email"
                      autoComplete="email"
                      placeholder="Optional"
                    />
                    {errorFor("email")}
                  </div>
                </div>

                <details className={styles.more}>
                  <summary>Add more details (optional)</summary>
                  <div className={styles.moreBody}>
                    <div className={styles.pair}>
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="bk-company">
                          Company / organisation
                        </label>
                        <input {...fieldProps("company")} autoComplete="organization" />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="bk-venue">
                          Venue
                        </label>
                        <input {...fieldProps("venue")} placeholder="If confirmed" />
                      </div>
                    </div>
                    <div className={styles.pair}>
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="bk-audience">
                          Expected audience
                        </label>
                        <input
                          {...fieldProps("audience")}
                          inputMode="numeric"
                          placeholder="e.g. 1,200"
                        />
                      </div>
                      <div className={styles.field}>
                        <label className={styles.label} htmlFor="bk-budget">
                          Budget range
                        </label>
                        <select {...fieldProps("budget")}>
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
                      <label className={styles.label} htmlFor="bk-message">
                        Additional details
                      </label>
                      <textarea
                        {...fieldProps("message")}
                        rows={4}
                        placeholder="Running order, other acts, technical requirements, anything else we should know"
                        className={`${styles.input} ${styles.textarea}`}
                      />
                    </div>
                  </div>
                </details>

                <div className={styles.honeypot} aria-hidden="true">
                  <label htmlFor="bk-website">Leave this field empty</label>
                  <input
                    id="bk-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </fieldset>

              {submitting && (
                <p className={styles.pending} role="status">
                  Sending the details above…
                </p>
              )}

              {status === "error" && message && (
                <div className={styles.alert} role="alert" tabIndex={-1} ref={alertRef}>
                  <p>{message}</p>
                  {!Object.keys(fieldErrors).length && (
                    <p>
                      You can also call{" "}
                      <a href={telHref(PHONE_PRIMARY)}>{PHONE_PRIMARY.display}</a>.
                    </p>
                  )}
                </div>
              )}

              <div className={styles.actions}>
                <button
                  type="submit"
                  className={styles.submit}
                  disabled={submitting}
                >
                  {submitting ? "Sending…" : "Send enquiry"}
                </button>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.alt}
                  onClick={onWhatsAppClick}
                  aria-disabled={submitting || undefined}
                >
                  Send on WhatsApp instead
                </a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
