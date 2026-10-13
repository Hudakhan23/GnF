import Script from "next/script";
import PageViews from "./PageViews";

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

/**
 * Consent default for analytics storage. The site has no consent banner and
 * visitors may include the UK/EU diaspora, so analytics cookies stay DENIED
 * unless the business explicitly sets NEXT_PUBLIC_GA_CONSENT_DEFAULT=granted
 * after its own legal review. Advertising storage is always denied.
 *
 * With storage denied, Google Analytics runs in Consent Mode: no analytics
 * cookies are set; Google may still receive cookieless pings. If that is not
 * acceptable either, leave NEXT_PUBLIC_GA_MEASUREMENT_ID empty until a
 * consent banner is added.
 */
const ANALYTICS_STORAGE =
  process.env.NEXT_PUBLIC_GA_CONSENT_DEFAULT === "granted" ? "granted" : "denied";

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
