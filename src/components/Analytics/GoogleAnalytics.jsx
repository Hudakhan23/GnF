import Script from "next/script";
import PageViews from "./PageViews";

const MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-RYKS94G35P";

/**
 * Consent default for analytics storage. Set to granted so GA4 tracks
 * visitor metrics, search queries, and artist page engagement.
 */
const ANALYTICS_STORAGE =
  process.env.NEXT_PUBLIC_GA_CONSENT_DEFAULT === "denied" ? "denied" : "granted";

/** Loads GA4 only when a real measurement ID is configured. */
export default function GoogleAnalytics() {
  if (!/^G-[A-Z0-9]{4,}$/.test(MEASUREMENT_ID)) return null;

  return (
    <>
      {/* Consent, config and page views are queued by PageViews before this loads. */}
      <PageViews measurementId={MEASUREMENT_ID} analyticsStorage={ANALYTICS_STORAGE} />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
