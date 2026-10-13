"use client";

import { useEffect, useRef, useState } from "react";
import { useEnquirySubmit } from "@/components/Enquiry/useEnquirySubmit";
import { EVENT_TYPES, summariseEnquiry } from "@/lib/enquiry";
import { PHONE_PRIMARY, telHref, whatsappLink } from "@/data/site";
import styles from "./ContactForm.module.css";

// Visual order of the fields, for focusing the first error.
const FIELD_ORDER = ["name", "phone", "email", "eventType", "city", "eventDate", "artist"];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  eventType: "",
  city: "",
  eventDate: "",
  artist: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [website, setWebsite] = useState("");
  const { status, fieldErrors, message, reference, submit } = useEnquirySubmit({
    kind: "contact",
    source: "contact_form",
  });
  const successRef = useRef(null);
  const submitting = status === "submitting";

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  // After a failed attempt the controls are re-enabled; move focus to the
  // first field that needs fixing, or to the error message.
  const alertRef = useRef(null);
  useEffect(() => {
    if (status !== "error") return;
    const first = FIELD_ORDER.find((key) => fieldErrors[key]);
    if (first) document.getElementById(`cf-${first}`)?.focus();
    else alertRef.current?.focus();
  }, [status, fieldErrors]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function onSubmit(event) {
    event.preventDefault();
    submit(form, { website });
  }

  const fieldProps = (name) => ({
    id: `cf-${name}`,
    name,
    value: form[name],
    onChange: updateField,
    "aria-invalid": fieldErrors[name] ? true : undefined,
    "aria-describedby": fieldErrors[name] ? `cf-${name}-error` : undefined,
  });
  const errorFor = (name) =>
    fieldErrors[name] ? (
      <em id={`cf-${name}-error`} className={styles.error}>
        {fieldErrors[name]}
      </em>
    ) : null;

  if (status === "success") {
    return (
      <div className={styles.form} role="status">
        <h2 tabIndex={-1} ref={successRef}>
          Thank you — your enquiry has been submitted
        </h2>
        <p className={styles.success}>
          It has been accepted for processing and our team will review it.
          {reference && <> Your reference is <strong>{reference}</strong>.</>}
        </p>
        <p className={styles.success}>
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
      </div>
    );
  }

  const fallbackWhatsApp = whatsappLink(
    `Hi GnF Events, I tried to send an enquiry from your website.\n${summariseEnquiry(form)}`
  );

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <h2>Send an enquiry</h2>
      {/* Frozen while sending, so what is on screen is exactly what was sent. */}
      <fieldset className={styles.fields} disabled={submitting}>
        <div className={styles.twoColumns}>
          <label htmlFor="cf-name">
            <span>Name *</span>
            <input
              {...fieldProps("name")}
              placeholder="Your name"
              autoComplete="name"
              required
            />
            {errorFor("name")}
          </label>
          <label htmlFor="cf-phone">
            <span>Phone / WhatsApp *</span>
            <input
              {...fieldProps("phone")}
              type="tel"
              inputMode="tel"
              placeholder="+92 3xx xxxxxxx"
              autoComplete="tel"
              required
            />
            {errorFor("phone")}
          </label>
        </div>
        <label htmlFor="cf-email">
          <span>Email</span>
          <input
            {...fieldProps("email")}
            type="email"
            placeholder="you@example.com (optional)"
            autoComplete="email"
          />
          {errorFor("email")}
        </label>
        <div className={styles.twoColumns}>
          <label htmlFor="cf-eventType">
            <span>Event type *</span>
            <select {...fieldProps("eventType")} required>
              <option value="">Select…</option>
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errorFor("eventType")}
          </label>
          <label htmlFor="cf-city">
            <span>City *</span>
            <input
              {...fieldProps("city")}
              placeholder="e.g. Lahore"
              autoComplete="address-level2"
              required
            />
            {errorFor("city")}
          </label>
        </div>
        <div className={styles.twoColumns}>
          <label htmlFor="cf-eventDate">
            <span>Event date</span>
            <input {...fieldProps("eventDate")} type="date" />
            {errorFor("eventDate")}
          </label>
          <label htmlFor="cf-artist">
            <span>Artist of interest</span>
            <input {...fieldProps("artist")} placeholder="Optional" autoComplete="off" />
            {errorFor("artist")}
          </label>
        </div>
        <label htmlFor="cf-message">
          <span>Anything else</span>
          <textarea
            {...fieldProps("message")}
            rows="4"
            placeholder="Venue, expected audience, timings — whatever you know so far"
          />
        </label>

        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor="cf-website">Leave this field empty</label>
          <input
            id="cf-website"
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
            <p data-cta="contact_form_fallback">
              <a href={fallbackWhatsApp} target="_blank" rel="noreferrer">
                Send these details on WhatsApp
              </a>{" "}
              or call <a href={telHref(PHONE_PRIMARY)}>{PHONE_PRIMARY.display}</a>.
            </p>
          )}
        </div>
      )}

      <button type="submit" disabled={submitting} aria-busy={submitting}>
        {submitting ? "Sending…" : "Send enquiry"}
      </button>
      <p className={styles.note}>
        We use these details only to reply to your enquiry.
      </p>
    </form>
  );
}
