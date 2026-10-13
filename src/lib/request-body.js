/**
 * Reads a JSON object body with a hard byte limit enforced while streaming,
 * so an oversized request is rejected before it is buffered in full.
 *
 * Resolves to `{ value }` for a JSON object, or `{ status, error }` with a
 * client-safe error code (413 too_large, 400 invalid_encoding / invalid_json
 * / invalid_payload). Never throws for malformed input.
 */
export async function readJsonObject(request, maxBytes) {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > maxBytes) {
    return { status: 413, error: "too_large" };
  }
  if (!request.body) return { status: 400, error: "invalid_json" };

  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel().catch(() => {});
        return { status: 413, error: "too_large" };
      }
      chunks.push(value);
    }
  } catch {
    return { status: 400, error: "invalid_json" };
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  let text;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return { status: 400, error: "invalid_encoding" };
  }

  let value;
  try {
    value = JSON.parse(text);
  } catch {
    return { status: 400, error: "invalid_json" };
  }

  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return { status: 400, error: "invalid_payload" };
  }
  return { value };
}
