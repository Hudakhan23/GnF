import { Archivo, Cormorant_Garamond } from "next/font/google";
import ConversionTracker from "@/components/Analytics/ConversionTracker";
import GoogleAnalytics from "@/components/Analytics/GoogleAnalytics";
import JsonLd from "@/components/JsonLd/JsonLd";
import { SITE_NAME, SITE_URL } from "@/data/site";
import { DEFAULT_OPEN_GRAPH } from "@/lib/metadata";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Artist Booking in Pakistan | GnF Events",
    template: "%s | GnF Events",
  },
  description:
    "Book leading Pakistani singers and celebrities for weddings, corporate events, concerts and festivals. GnF Events manages artist availability, coordination and event production.",
  applicationName: SITE_NAME,
  keywords: [
    "artist booking Pakistan",
    "singer booking Pakistan",
    "book singer Lahore",
    "celebrity booking Pakistan",
    "event management Lahore",
    "Pakistani singers for events",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  // No layout-level canonical: each page declares its own, so a route that
  // forgets one is never canonicalised to the homepage.
  openGraph: DEFAULT_OPEN_GRAPH,
  twitter: {
    card: "summary_large_image",
    title: "Artist Booking in Pakistan | GnF Events",
    description: "Pakistani singer booking and event management from GnF Events.",
    images: ["/og-default.jpg"],
  },
  // index/follow is the default; stating it here would contradict the
  // noindex Next.js adds to 404s and to non-indexable artist pages.
  robots: {
    googleBot: {
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "entertainment",
  verification: verification(),
};

/** Search-engine ownership tags, only when the IDs are configured. */
function verification() {
  const google = process.env.GOOGLE_SITE_VERIFICATION;
  const bing = process.env.BING_SITE_VERIFICATION;
  if (!google && !bing) return undefined;
  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}

export const viewport = {
  themeColor: "#0E0C09",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-PK"
      className={`${archivo.variable} ${cormorant.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <JsonLd data={[organizationSchema, websiteSchema]} />
        {children}
        <ConversionTracker />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
