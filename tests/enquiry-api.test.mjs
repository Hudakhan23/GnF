import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createEnquiryHandler, clientIp, MAX_BODY_BYTES } from "../src/lib/enquiry-handler.js";
import { createRateLimiter } from "../src/lib/rate-limit.js";

const ORIGIN = "http://localhost:3000";
const VALID = {
  kind: "contact",
  name: "Test Person",
  phone: "+92 300 0000000",
  email: "",
  eventType: "Concert",
  city: "Lahore",
  eventDate: "2026-12-01",
  message: "Test enquiry",
  elapsedMs: 5000,
  website: "",
};

const quietLog = { info() {}, error() {} };

function makeHandler(overrides = {}) {
  const calls = [];
  const handler = createEnquiryHandler({
    deliver: async (data, meta) => {
      calls.push({ data, meta });
      return { providerId: "test-id" };
    },
    trustProxy: true,
    log: quietLog,
    ...overrides,
  });
  return { handler, calls };
}

function post(body, { headers = {}, raw = false } = {}) {
  return new Request(`${ORIGIN}/api/enquiry`, {
    method: "POST",
    headers: {
      host: "localhost:3000",
      origin: ORIGIN,
      "content-type": "application/json",
      "x-real-ip": "203.0.113.10",
      ...headers,
    },
    body: raw ? body : JSON.stringify(body),
  });
}

const read = async (response) => ({ status: response.status, body: await response.json() });

describe("POST /api/enquiry", () => {
  it("accepts a valid enquiry and delivers only validated fields", async () => {
    const { handler, calls } = makeHandler();
    const res = await read(await handler(post({ ...VALID, unexpected: "dropped" })));
    assert.equal(res.status, 200);
    assert.equal(res.body.ok, true);
    assert.match(res.body.reference, /^[0-9A-F]{8}$/);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].data.name, "Test Person");
    assert.equal("unexpected" in calls[0].data, false);
    assert.equal("elapsedMs" in calls[0].data, false);
  });

  it("rejects malformed JSON with 400", async () => {
    const { handler, calls } = makeHandler();
    const res = await read(await handler(post("{not json", { raw: true })));
    assert.deepEqual([res.status, res.body.error], [400, "invalid_json"]);
    assert.equal(calls.length, 0);
  });

  for (const [label, raw] of [
    ["null", "null"],
    ["an array", "[1,2]"],
    ["a number", "42"],
    ["a string", '"hello"'],
    ["a boolean", "true"],
  ]) {
    it(`rejects JSON ${label} with 400 invalid_payload`, async () => {
      const { handler, calls } = makeHandler();
      const res = await read(await handler(post(raw, { raw: true })));
      assert.deepEqual([res.status, res.body.error], [400, "invalid_payload"]);
      assert.equal(calls.length, 0);
    });
  }

  it("rejects an oversized ASCII body with 413", async () => {
    const { handler, calls } = makeHandler();
    const body = JSON.stringify({ ...VALID, message: "x".repeat(MAX_BODY_BYTES) });
    const res = await read(await handler(post(body, { raw: true })));
    assert.deepEqual([res.status, res.body.error], [413, "too_large"]);
    assert.equal(calls.length, 0);
  });

  it("measures the limit in UTF-8 bytes, not characters", async () => {
    const { handler, calls } = makeHandler();
    // 4,000 Urdu characters = ~8,000 bytes; 6,000 = ~12,000 bytes.
    const under = JSON.stringify({ ...VALID, message: "ا".repeat(4000) });
    const over = JSON.stringify({ ...VALID, message: "ا".repeat(6000) });
    assert.ok(over.length < MAX_BODY_BYTES, "character count alone would pass");
    assert.ok(new TextEncoder().encode(over).length > MAX_BODY_BYTES);

    const ok = await read(await handler(post(under, { raw: true })));
    assert.equal(ok.status, 200);
    const tooBig = await read(await handler(post(over, { raw: true, headers: { "x-real-ip": "203.0.113.11" } })));
    assert.deepEqual([tooBig.status, tooBig.body.error], [413, "too_large"]);
    assert.equal(calls.length, 1);
  });

  it("enforces the byte limit while streaming even when content-length lies", async () => {
    const { handler } = makeHandler();
    const body = JSON.stringify({ ...VALID, message: "x".repeat(MAX_BODY_BYTES) });
    const res = await handler(post(body, { raw: true, headers: { "content-length": "100" } }));
    assert.equal(res.status, 413);
  });

  it("rejects invalid UTF-8 with 400", async () => {
    const { handler } = makeHandler();
    const res = await read(await handler(post(new Uint8Array([0x7b, 0xff, 0xfe, 0x7d]), { raw: true })));
    assert.deepEqual([res.status, res.body.error], [400, "invalid_encoding"]);
  });

  it("returns field errors for missing and invalid fields", async () => {
    const { handler, calls } = makeHandler();
    const res = await read(
      await handler(
        post({
          kind: "booking",
          name: "",
          phone: "abc",
          email: "not-an-email",
          eventType: "Bogus",
          city: 12,
          eventDate: "2026-02-31",
          budget: "Free",
          elapsedMs: 5000,
        })
      )
    );
    assert.equal(res.status, 422);
    assert.deepEqual(Object.keys(res.body.fields).sort(), [
      "artist", "budget", "city", "email", "eventDate", "eventType", "name", "phone",
    ]);
    assert.equal(calls.length, 0);
  });

  it("returns field errors when every field is missing", async () => {
    const { handler } = makeHandler();
    const res = await read(await handler(post({ elapsedMs: 5000 })));
    assert.equal(res.status, 422);
  });

  it("rejects an unsupported content type with 415", async () => {
    const { handler } = makeHandler();
    const res = await read(await handler(post(VALID, { headers: { "content-type": "text/plain" } })));
    assert.deepEqual([res.status, res.body.error], [415, "unsupported_media_type"]);
  });

  it("accepts application/json with a charset parameter", async () => {
    const { handler } = makeHandler();
    const res = await handler(post(VALID, { headers: { "content-type": "application/json; charset=utf-8" } }));
    assert.equal(res.status, 200);
  });

  it("rejects a foreign or missing origin with 403", async () => {
    const { handler } = makeHandler();
    const foreign = await handler(post(VALID, { headers: { origin: "https://evil.example" } }));
    assert.equal(foreign.status, 403);
    const missing = await handler(post(VALID, { headers: { origin: "" } }));
    assert.equal(missing.status, 403);
  });

  it("rejects the honeypot and too-fast submissions without delivering", async () => {
    const { handler, calls } = makeHandler();
    const honeypot = await read(await handler(post({ ...VALID, website: "spam" })));
    assert.deepEqual([honeypot.status, honeypot.body.error], [400, "not_accepted"]);
    const fast = await read(await handler(post({ ...VALID, elapsedMs: 100 })));
    assert.equal(fast.status, 400);
    const missing = await read(await handler(post({ ...VALID, elapsedMs: undefined })));
    assert.equal(missing.status, 400);
    assert.equal(calls.length, 0);
  });

  it("rate-limits per IP with 429 and does not deliver", async () => {
    const { handler, calls } = makeHandler({
      limiter: createRateLimiter({ limit: 2, windowMs: 60_000 }),
    });
    const ip = { "x-real-ip": "198.51.100.7" };
    const statuses = [];
    for (let i = 0; i < 4; i++) statuses.push((await handler(post(VALID, { headers: ip }))).status);
    assert.deepEqual(statuses, [200, 200, 429, 429]);
    assert.equal(calls.length, 2);
    // A different IP is unaffected.
    assert.equal((await handler(post(VALID, { headers: { "x-real-ip": "198.51.100.8" } }))).status, 200);
  });

  it("reports provider failures honestly", async () => {
    const notConfigured = makeHandler({
      deliver: async () => {
        throw Object.assign(new Error("x"), { code: "not_configured" });
      },
    }).handler;
    const res = await read(await notConfigured(post(VALID)));
    assert.deepEqual([res.status, res.body.ok, res.body.error], [503, false, "delivery_failed"]);

    const rejected = makeHandler({
      deliver: async () => {
        throw Object.assign(new Error("x"), { code: "provider_rejected", detail: 422 });
      },
    }).handler;
    assert.equal((await rejected(post(VALID))).status, 502);

    const crashed = makeHandler({
      deliver: async () => {
        throw new TypeError("boom");
      },
    }).handler;
    const crash = await read(await crashed(post(VALID)));
    assert.equal(crash.status, 502);
    assert.equal(JSON.stringify(crash.body).includes("boom"), false, "no internal details leak");
  });

  it("never logs the enquirer's personal details", async () => {
    const lines = [];
    const log = { info: (...a) => lines.push(a.join(" ")), error: (...a) => lines.push(a.join(" ")) };
    const { handler } = makeHandler({ log });
    await handler(post(VALID));
    const failing = makeHandler({
      log,
      deliver: async () => {
        throw Object.assign(new Error("x"), { code: "provider_unreachable" });
      },
    }).handler;
    await failing(post(VALID, { headers: { "x-real-ip": "203.0.113.99" } }));
    const logged = lines.join("\n");
    for (const secret of ["Test Person", "+92 300 0000000", "Test enquiry"]) {
      assert.equal(logged.includes(secret), false, `log contains ${secret}`);
    }
  });
});

describe("duplicate protection", () => {
  const ID = "0f8c6a2e-1b7d-4c3a-9e5f-2a6b8c0d4e1f";

  it("gives retries of one submission the same reference and idempotency key", async () => {
    const { handler, calls } = makeHandler();
    const first = await read(await handler(post({ ...VALID, submissionId: ID })));
    const retry = await read(await handler(post({ ...VALID, submissionId: ID })));
    assert.equal(first.body.reference, "0F8C6A2E");
    assert.equal(retry.body.reference, first.body.reference);
    assert.equal(calls[0].meta.idempotencyKey, `gnf-enquiry/${ID}`);
    assert.equal(calls[1].meta.idempotencyKey, calls[0].meta.idempotencyKey);
  });

  it("returns 409 in_progress while the same submission is still being sent", async () => {
    const { handler } = makeHandler({
      deliver: async () => {
        throw Object.assign(new Error("x"), { code: "in_progress" });
      },
    });
    const res = await read(await handler(post({ ...VALID, submissionId: ID })));
    assert.deepEqual([res.status, res.body.error], [409, "in_progress"]);
  });

  it("ignores malformed submission ids instead of crashing", async () => {
    for (const bad of [["x"], { a: 1 }, 42, "not-a-uuid", `${ID}; DROP`]) {
      const { handler, calls } = makeHandler();
      const res = await handler(post({ ...VALID, submissionId: bad }));
      assert.equal(res.status, 200, JSON.stringify(bad));
      assert.equal(calls[0].meta.idempotencyKey, undefined);
    }
  });
});

describe("clientIp", () => {
  const req = (headers) => new Request(ORIGIN, { headers });

  it("ignores forwarded headers unless the proxy is trusted", () => {
    assert.equal(clientIp(req({ "x-forwarded-for": "1.2.3.4" }), { trustProxy: false }), null);
  });

  it("uses the first valid forwarded address on a trusted proxy", () => {
    assert.equal(clientIp(req({ "x-forwarded-for": "1.2.3.4, 10.0.0.1" }), { trustProxy: true }), "1.2.3.4");
    assert.equal(clientIp(req({ "x-vercel-forwarded-for": "2001:db8::1" }), { trustProxy: true }), "2001:db8::1");
  });

  it("treats missing or malformed values as unknown", () => {
    assert.equal(clientIp(req({}), { trustProxy: true }), null);
    assert.equal(clientIp(req({ "x-real-ip": "not-an-ip" }), { trustProxy: true }), null);
    assert.equal(clientIp(req({ "x-real-ip": "999.1.1.1" }), { trustProxy: true }), null);
  });

  it("puts unidentifiable clients in one shared bucket", async () => {
    const limiter = createRateLimiter({ limit: 100, windowMs: 60_000 });
    const handler = createEnquiryHandler({
      deliver: async () => ({}),
      trustProxy: false,
      limiter,
      log: quietLog,
    });
    await handler(post(VALID));
    await handler(post(VALID, { headers: { "x-real-ip": "5.6.7.8" } }));
    assert.equal(limiter.size, 1);
  });
});

describe("createRateLimiter", () => {
  it("keeps memory bounded however many clients appear", () => {
    const limiter = createRateLimiter({ limit: 5, windowMs: 60_000, maxKeys: 100 });
    for (let i = 0; i < 10_000; i++) limiter.hit(`ip:${i}`);
    assert.ok(limiter.size <= 100);
  });

  it("does not grow with rejected attempts and resets after the window", () => {
    let time = 0;
    const limiter = createRateLimiter({ limit: 2, windowMs: 1000, now: () => time });
    const results = Array.from({ length: 50 }, () => limiter.hit("a"));
    assert.deepEqual(results.slice(0, 3), [false, false, true]);
    assert.equal(limiter.size, 1);
    time = 1000;
    assert.equal(limiter.hit("a"), false, "new window");
  });

  it("evicts expired keys before evicting live ones", () => {
    let time = 0;
    const limiter = createRateLimiter({ limit: 1, windowMs: 1000, maxKeys: 2, now: () => time });
    limiter.hit("old");
    time = 500;
    limiter.hit("live");
    limiter.hit("live"); // live is now over its limit
    time = 1200; // "old" expired, "live" has not
    limiter.hit("new");
    assert.equal(limiter.hit("live"), true, "live bucket kept its count");
  });
});
