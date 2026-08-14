import { Archivo, Cormorant_Garamond } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/data/site";
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Artist Booking in Pakistan | GnF Events",
    description:
      "Bring Pakistan's leading artists to your stage with end-to-end booking and event coordination.",
    images: [
      {
        url: "/EventHighlights/E14.jpeg",
        width: 1080,
        height: 707,
        alt: "Live concert produced by GnF Events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artist Booking in Pakistan | GnF Events",
    description: "Pakistani singer booking and event management from GnF Events.",
    images: ["/EventHighlights/E14.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "entertainment",
};

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
      <body>{children}</body>
    </html>
  );
}
