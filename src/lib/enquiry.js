/**
 * Enquiry schema shared by the browser forms and the /api/enquiry route, so
 * client-side hints and server-side validation can never disagree.
 * Pure functions only — safe to import from client and server code.
 */

export const EVENT_TYPES = [
  "Concert",
  "University / college event",
  "Corporate event",
  "Wedding",
  "Festival",
  "Private party",
  "Brand activation",
  "Award show",
  "Cruise",
  "Other",
];

export const BUDGETS = [
  "Under PKR 1M",
  "PKR 1M – 3M",
  "PKR 3M – 7M",
  "PKR 7M – 15M",
  "PKR 15M+",
  "Prefer to discuss",
];

export const ENQUIRY_KINDS = ["booking", "contact"];

/** Minimum time a person plausibly needs to fill the form (bot trap). */
export const MIN_FILL_MS = 2500;

const LIMITS = {
  name: 100,
  phone: 25,
  email: 254,
  artist: 120,
  city: 100,
  company: 150,
  venue: 150,
  audience: 40,
  message: 2000,
  sourcePage: 200,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SUBMITTED_AT_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;
const PHONE_RE = /^\+?[0-9][0-9\s\-().]{6,22}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const text = (value, max) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";

/**
 * Returns `{ data, errors }`. `errors` maps field name → message and is empty
 * when the enquiry is valid. `data` contains only known, trimmed fields.
 */
export function validateEnquiry(input = {}) {
  const errors = {};
  const kind = ENQUIRY_KINDS.includes(input.kind) ? input.kind : "contact";

  const data = {
    kind,
    name: text(input.name, LIMITS.name),
    phone: text(input.phone, LIMITS.phone),
    email: text(input.email, LIMITS.email).toLowerCase(),
    eventType: text(input.eventType, 60),
    eventDate: text(input.eventDate, 10),
    city: text(input.city, LIMITS.city),
    artist: text(input.artist, LIMITS.artist),
    company: text(input.company, LIMITS.company),
    venue: text(input.venue, LIMITS.venue),
    audience: text(input.audience, LIMITS.audience),
    budget: text(input.budget, 40),
    message:
      typeof input.message === "string"
        ? input.message.trim().slice(0, LIMITS.message)
        : "",
    sourcePage: text(input.sourcePage, LIMITS.sourcePage),
    // Not visitor-entered: identifies one logical submission across retries.
    // Invalid values are dropped (the request is still accepted, just without
    // duplicate protection) rather than shown to the visitor as an error.
    submissionId:
      typeof input.submissionId === "string" && UUID_RE.test(input.submissionId)
        ? input.submissionId.toLowerCase()
        : "",
    submittedAt: plausibleTimestamp(input.submittedAt),
  };

  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!PHONE_RE.test(data.phone)) {
    errors.phone = "Please enter a phone or WhatsApp number we can reach.";
  }
  if (data.email && !EMAIL_RE.test(data.email)) {
    errors.email = "Please check the email address.";
  }
  if (!EVENT_TYPES.includes(data.eventType)) {
    errors.eventType = "Please choose an event type.";
  }
  if (data.city.length < 2) errors.city = "Please enter the event city.";
  if (kind === "booking" && data.artist.length < 2) {
    errors.artist = "Please enter the artist you are interested in.";
  }
  if (data.eventDate && !isValidDate(data.eventDate)) {
    errors.eventDate = "Please enter a valid date.";
  }
  if (data.budget && !BUDGETS.includes(data.budget)) {
    errors.budget = "Please choose a budget range from the list.";
  }
  if (!data.sourcePage.startsWith("/")) data.sourcePage = "/";

  return { data, errors };
}

/** The visitor's device time of the first attempt, if it is a sane ISO date. */
function plausibleTimestamp(value, now = Date.now()) {
  if (typeof value !== "string" || value.length > 40) return "";
  const time = Date.parse(value);
  if (Number.isNaN(time) || Math.abs(now - time) > SUBMITTED_AT_WINDOW_MS) return "";
  return new Date(time).toISOString();
}

function isValidDate(value) {
  if (!DATE_RE.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

/** Plain-text summary for email bodies and WhatsApp prefills; empty fields skipped. */
export function summariseEnquiry(data) {
  const rows = [
    ["Artist", data.artist],
    ["Event type", data.eventType],
    ["Event date", data.eventDate],
    ["City", data.city],
    ["Venue", data.venue],
    ["Expected audience", data.audience],
    ["Budget range", data.budget],
    ["Company / organisation", data.company],
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email],
  ];
  const lines = rows.filter(([, v]) => v).map(([label, v]) => `${label}: ${v}`);
  if (data.message) lines.push("", `Details: ${data.message}`);
  return lines.join("\n");
}
