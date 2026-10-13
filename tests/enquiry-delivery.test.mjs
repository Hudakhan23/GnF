import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { DeliveryError, deliverEnquiry } from "../src/lib/enquiry-delivery.js";
import { summariseEnquiry, validateEnquiry } from "../src/lib/enquiry.js";

const { data } = validateEnquiry({
  kind: "booking",
  name: "Test",
  phone: "+92 300 0000000",
  eventType: "Wedding",
  city: "Lahore",
  artist: "Atif Aslam",
  sourcePage: "/artists/atif-aslam",
});
const meta = { reference: "ABC12345", idempotencyKey: "gnf-enquiry/0f8c6a2e-1b7d-4c3a-9e5f-2a6b8c0d4e1f" };
const realFetch = globalThis.fetch;
const ENV = ["RESEND_API_KEY", "ENQUIRY_FROM_EMAIL", "ENQUIRY_TO_EMAIL"];
const saved = Object.fromEntries(ENV.map((k) => [k, process.env[k]]));

function configure() {
  process.env.RESEND_API_KEY = "test-key";
  process.env.ENQUIRY_FROM_EMAIL = "GnF Website <enquiries@example.test>";
  delete process.env.ENQUIRY_TO_EMAIL;
}

afterEach(() => {
  globalThis.fetch = realFetch;
  for (const k of ENV) {
    if (saved[k] === undefined) delete process.env[k];
    else process.env[k] = saved[k];
  }
});

describe("deliverEnquiry", () => {
  it("fails with not_configured when credentials are missing, without calling out", async () => {
    delete process.env.RESEND_API_KEY;
    let called = false;
    globalThis.fetch = async () => {
      called = true;
    };
    await assert.rejects(deliverEnquiry(data, meta), (e) => e instanceof DeliveryError && e.code === "not_configured");
    assert.equal(called, false);
  });

  it("sends a plain-text email to the business address and returns the provider id", async () => {
    configure();
    let sent;
    globalThis.fetch = async (url, init) => {
      sent = { url, init };
      return new Response(JSON.stringify({ id: "re_123" }), { status: 200 });
    };
    const result = await deliverEnquiry(data, meta);
    const body = JSON.parse(sent.init.body);
    assert.equal(sent.url, "https://api.resend.com/emails");
    assert.equal(sent.init.headers.Authorization, "Bearer test-key");
    assert.deepEqual(body.to, ["gnfeventspakistan@gmail.com"]);
    assert.ok(body.subject.includes("Atif Aslam") && body.subject.includes("[ABC12345]"));
    assert.ok(body.text.includes("Source page: /artists/atif-aslam"));
    assert.equal(body.reply_to, undefined, "no reply_to without an email");
    assert.deepEqual(result, { providerId: "re_123" });
    assert.equal(sent.init.headers["Idempotency-Key"], meta.idempotencyKey);
  });

  it("builds an identical request for a retry of the same submission", async () => {
    configure();
    const bodies = [];
    globalThis.fetch = async (url, init) => {
      bodies.push(init.body);
      return new Response(JSON.stringify({ id: "re_same" }), { status: 200 });
    };
    const withTime = { ...data, submittedAt: "2026-10-12T05:00:00.000Z" };
    await deliverEnquiry(withTime, meta);
    await new Promise((r) => setTimeout(r, 5));
    await deliverEnquiry(withTime, meta);
    assert.equal(bodies[0], bodies[1], "same key must carry the same payload");
    assert.ok(JSON.parse(bodies[0]).text.includes("Submitted: 2026-10-12T05:00:00.000Z"));
  });

  it("maps a concurrent duplicate (409) to in_progress", async () => {
    configure();
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ name: "concurrent_idempotent_requests" }), { status: 409 });
    await assert.rejects(deliverEnquiry(data, meta), (e) => e.code === "in_progress");
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ name: "invalid_idempotent_request" }), { status: 409 });
    await assert.rejects(deliverEnquiry(data, meta), (e) => e.code === "provider_rejected");
  });

  it("omits the idempotency header when there is no submission id", async () => {
    configure();
    let sent;
    globalThis.fetch = async (url, init) => {
      sent = init;
      return new Response("{}", { status: 200 });
    };
    await deliverEnquiry(data, { reference: "X" });
    assert.equal("Idempotency-Key" in sent.headers, false);
  });

  it("maps provider rejection and network failure to distinct codes", async () => {
    configure();
    globalThis.fetch = async () => new Response("{}", { status: 422 });
    await assert.rejects(deliverEnquiry(data, meta), (e) => e.code === "provider_rejected" && e.detail === 422);
    globalThis.fetch = async () => {
      throw new TypeError("fetch failed");
    };
    await assert.rejects(deliverEnquiry(data, meta), (e) => e.code === "provider_unreachable");
  });

  it("keeps the subject on one line", async () => {
    configure();
    let sent;
    globalThis.fetch = async (url, init) => {
      sent = init;
      return new Response("{}", { status: 200 });
    };
    await deliverEnquiry({ ...data, artist: "A\r\nBcc: x@y.z" }, meta);
    assert.equal(JSON.parse(sent.body).subject.includes("\n"), false);
  });
});

describe("summariseEnquiry", () => {
  it("skips empty fields and never emits placeholder dashes", () => {
    const text = summariseEnquiry(data);
    assert.equal(text.includes("—"), false);
    assert.equal(text.includes("Venue"), false);
    assert.ok(text.includes("Artist: Atif Aslam"));
  });
});
