// Relative imports (with extensions) keep this module runnable under
// `node --test` as well as in the Next.js bundle.
import { EMAIL, SITE_NAME } from "../data/site.js";
import { summariseEnquiry } from "./enquiry.js";

/**
 * Server-only delivery of a validated enquiry. Email via Resend's HTTP API is
 * the only channel today; add another channel (Google Sheet, CRM) by sending
 * to it here and deciding whether either succeeding counts as delivered.
 *
 * A resolved promise means the provider *accepted* the email for sending; it
 * does not prove the message reached the inbox. Check the provider's logs
 * (by the returned id) for final delivery status.
 *
 * Environment (never exposed to the browser — no NEXT_PUBLIC_ prefix):
 *   RESEND_API_KEY      Resend API key
 *   ENQUIRY_FROM_EMAIL  Sender on a domain verified in Resend,
 *                       e.g. "GnF Events Website <enquiries@gnfevents.com.pk>"
 *   ENQUIRY_TO_EMAIL    Optional; defaults to the business email
 */

export class DeliveryError extends Error {
  constructor(code, detail) {
    super(code);
    // "not_configured" | "provider_rejected" | "provider_unreachable" | "in_progress"
    this.code = code;
    this.detail = detail;
  }
}

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export function deliveryConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.ENQUIRY_FROM_EMAIL);
}

const singleLine = (value) => value.replace(/[\r\n]+/g, " ").slice(0, 120);

/**
 * `idempotencyKey` makes retries safe: for 24 hours Resend returns the original
 * result for a repeat of the same key and payload instead of sending again
 * (https://resend.com/docs/dashboard/emails/idempotency-keys). The email body
 * is therefore built only from the submission itself — no server timestamps —
 * so a retry produces an identical payload.
 */
export async function deliverEnquiry(enquiry, { reference, idempotencyKey }) {
  if (!deliveryConfigured()) throw new DeliveryError("not_configured");

  const kindLabel = enquiry.kind === "booking" ? "Booking enquiry" : "Website enquiry";
  const subject = singleLine(
    `${kindLabel}${enquiry.artist ? ` — ${enquiry.artist}` : ""} — ${enquiry.city} [${reference}]`
  );
  const body = [
    `${kindLabel} from the ${SITE_NAME} website`,
    "",
    summariseEnquiry(enquiry),
    "",
    `Source page: ${enquiry.sourcePage}`,
    ...(enquiry.submittedAt ? [`Submitted: ${enquiry.submittedAt} (visitor's device clock)`] : []),
    `Reference: ${reference}`,
  ].join("\n");

  let response;
  try {
    response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
      },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL,
        to: [process.env.ENQUIRY_TO_EMAIL || EMAIL],
        ...(enquiry.email ? { reply_to: enquiry.email } : {}),
        subject,
        text: body,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    throw new DeliveryError("provider_unreachable", error.name);
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    if (response.status === 409 && error.name === "concurrent_idempotent_requests") {
      // The same submission is already being sent; the client can retry.
      throw new DeliveryError("in_progress", response.status);
    }
    throw new DeliveryError("provider_rejected", response.status);
  }

  const result = await response.json().catch(() => ({}));
  return { providerId: typeof result.id === "string" ? result.id : null };
}
