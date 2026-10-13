import { isIP } from "node:net";
import { MIN_FILL_MS, validateEnquiry } from "./enquiry.js";
import { createRateLimiter } from "./rate-limit.js";
import { readJsonObject } from "./request-body.js";

export const MAX_BODY_BYTES = 10_000;
// Matches the Vercel Firewall rule on POST /api/enquiry (10 per IP per 10 min).
// Kept above 5 because mobile carriers and campus networks put many people
// behind one IP, and a blocked enquiry is a lost lead.
export const RATE_LIMIT = { perIp: 10, unknownIp: 30, windowMs: 10 * 60 * 1000 };

const json = (status, body) => Response.json(body, { status });
const reject = (status, error, extra = {}) => json(status, { ok: false, error, ...extra });

/**
 * Client IP for rate limiting. Forwarded-IP headers are only trusted on
 * Vercel, which overwrites them at its edge to prevent spoofing
 * (https://vercel.com/docs/headers/request-headers). Anywhere else they are
 * client-controlled, so all requests share the stricter "unknown" bucket.
 */
export function clientIp(request, { trustProxy }) {
  if (!trustProxy) return null;
  const raw =
    request.headers.get("x-vercel-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for") ||
    "";
  const candidate = raw.split(",")[0].trim();
  return isIP(candidate) ? candidate : null;
}

function sameOrigin(request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

const isJson = (request) =>
  (request.headers.get("content-type") || "").split(";")[0].trim().toLowerCase() ===
  "application/json";

/**
 * Builds the POST /api/enquiry handler. Dependencies are injected so the
 * whole request path can be tested without Next.js or a real email provider.
 */
export function createEnquiryHandler({
  deliver,
  trustProxy = false,
  limiter = createRateLimiter({ limit: RATE_LIMIT.perIp, windowMs: RATE_LIMIT.windowMs }),
  minFillMs = MIN_FILL_MS,
  log = console,
}) {
  return async function handleEnquiry(request) {
    if (!sameOrigin(request)) return reject(403, "forbidden");
    if (!isJson(request)) return reject(415, "unsupported_media_type");

    // Counted before the body is read, so floods are cheap to turn away.
    const ip = clientIp(request, { trustProxy });
    const limited = ip
      ? limiter.hit(`ip:${ip}`)
      : limiter.hit("ip:unknown", RATE_LIMIT.unknownIp);
    if (limited) return reject(429, "rate_limited");

    const body = await readJsonObject(request, MAX_BODY_BYTES);
    if (body.error) return reject(body.status, body.error);
    const payload = body.value;

    // Bot traps: a hidden field people never see, and a minimum fill time.
    // Neither returns a fake success — a real person gets a clear retry message.
    const elapsed = Number(payload.elapsedMs);
    if (payload.website || !Number.isFinite(elapsed) || elapsed < minFillMs) {
      return reject(400, "not_accepted");
    }

    const { data, errors } = validateEnquiry(payload);
    if (Object.keys(errors).length) return reject(422, "invalid", { fields: errors });

    // A retry of the same logical submission gets the same reference and the
    // same provider idempotency key, so the provider sends it only once.
    const reference = (data.submissionId || crypto.randomUUID())
      .replace(/-/g, "")
      .slice(0, 8)
      .toUpperCase();
    const idempotencyKey = data.submissionId ? `gnf-enquiry/${data.submissionId}` : undefined;

    try {
      const { providerId } = (await deliver(data, { reference, idempotencyKey })) || {};
      // "Accepted" means the provider queued the email — not that it reached
      // the inbox. Provider logs (by id) show the final delivery status.
      log.info?.(`[enquiry] accepted by email provider ref=${reference} id=${providerId ?? "n/a"}`);
    } catch (error) {
      // Log the failure type only — never the enquirer's details.
      const code = error?.code || "unexpected";
      log.error?.(`[enquiry] delivery failed: ${code} ref=${reference}`, error?.detail ?? "");
      if (code === "in_progress") return reject(409, "in_progress", { reference });
      return reject(code === "not_configured" ? 503 : 502, "delivery_failed", { reference });
    }

    return json(200, { ok: true, reference });
  };
}
