"use client";

import { useEffect, useRef, useState } from "react";
import { EVENTS, track } from "@/lib/analytics";
import { validateEnquiry } from "@/lib/enquiry";

const REQUEST_TIMEOUT_MS = 20_000;

const MESSAGES = {
  rate_limited:
    "We've received several enquiries from this connection. Please wait a few minutes, or contact us on WhatsApp.",
  not_accepted:
    "We couldn't accept that submission. Please check the form and try again.",
  in_progress:
    "Your enquiry is still being processed. Please wait a moment, then press Send again — it won't be sent twice.",
  delivery_failed:
    "Your enquiry could not be sent right now. Your details are still in the form — please try again, or reach us on WhatsApp or by phone.",
  timeout:
    "We couldn't confirm whether your enquiry went through. Your details are still in the form — press Send again; the same enquiry won't be sent twice.",
  network:
    "We couldn't reach our server. Check your connection and try again — your details are still in the form.",
};

function newSubmissionId() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

/**
 * Submits an enquiry to /api/enquiry.
 *
 * - Success is reported only after the server says the email provider
 *   accepted the enquiry (accepted ≠ confirmed inbox delivery).
 * - On any failure the caller's form state is untouched, so nothing is lost.
 * - Only one request can be in flight at a time.
 * - Each logical submission carries a stable `submissionId`; retrying the
 *   same details reuses it, so the provider can drop duplicates. Changing any
 *   detail after a failure starts a new submission.
 */
export function useEnquirySubmit({ kind, source }) {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");
  const startedAt = useRef(0);
  const inFlight = useRef(false); // blocks double submits (double click, Enter + click)
  const submission = useRef({ fingerprint: null, id: null, submittedAt: null });
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function submit(values, { website = "" } = {}) {
    if (inFlight.current) return false;
    const payload = {
      ...values,
      kind,
      sourcePage: window.location.pathname,
    };
    const { errors } = validateEnquiry(payload);
    setFieldErrors(errors);
    if (Object.keys(errors).length) {
      setStatus("error");
      setMessage("Please correct the highlighted fields.");
      return false;
    }

    const fingerprint = JSON.stringify(payload);
    if (submission.current.fingerprint !== fingerprint) {
      submission.current = {
        fingerprint,
        id: newSubmissionId(),
        submittedAt: new Date().toISOString(),
      };
    }

    inFlight.current = true;
    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          submissionId: submission.current.id,
          submittedAt: submission.current.submittedAt,
          website,
          elapsedMs: Date.now() - startedAt.current,
        }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result.ok) {
        setStatus("success");
        setReference(result.reference || "");
        track(kind === "booking" ? EVENTS.bookingSubmit : EVENTS.contactSubmit, {
          cta_location: source,
          event_type: payload.eventType,
        });
        return true;
      }
      setFieldErrors(result.fields || {});
      setStatus("error");
      setMessage(
        result.fields
          ? "Please correct the highlighted fields."
          : MESSAGES[result.error] || MESSAGES.delivery_failed
      );
    } catch (error) {
      setStatus("error");
      setMessage(error?.name === "TimeoutError" ? MESSAGES.timeout : MESSAGES.network);
    } finally {
      inFlight.current = false;
    }
    return false;
  }

  return { status, fieldErrors, message, reference, submit };
}
