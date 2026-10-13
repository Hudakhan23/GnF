/**
 * Fixed-window rate limiter with a hard cap on memory.
 *
 * This is a per-instance fallback only: serverless instances do not share
 * memory, so the deployment-wide limit must come from a Vercel WAF rate-limit
 * rule on POST /api/enquiry (configured in the Vercel dashboard, not in code).
 * Each key costs one small object regardless of how many requests it makes —
 * rejected attempts only bump a counter, they are never stored individually.
 */
export function createRateLimiter({
  limit,
  windowMs,
  maxKeys = 1000,
  now = () => Date.now(),
}) {
  const buckets = new Map(); // key -> { count, resetAt }

  function evictExpired(time) {
    for (const [key, bucket] of buckets) {
      if (bucket.resetAt <= time) buckets.delete(key);
    }
  }

  return {
    /** Returns true if this request is over the limit for `key`. */
    hit(key, max = limit) {
      const time = now();
      let bucket = buckets.get(key);
      if (!bucket || bucket.resetAt <= time) {
        buckets.delete(key);
        if (buckets.size >= maxKeys) evictExpired(time);
        // Still full: drop the oldest key (Map keeps insertion order).
        if (buckets.size >= maxKeys) buckets.delete(buckets.keys().next().value);
        bucket = { count: 0, resetAt: time + windowMs };
        buckets.set(key, bucket);
      }
      if (bucket.count <= max) bucket.count += 1; // stops growing once over
      return bucket.count > max;
    },
    get size() {
      return buckets.size;
    },
  };
}
