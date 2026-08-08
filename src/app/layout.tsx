import type { Metadata } from "next";
import { Anton, Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === "production" &&
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://somethinglist.vercel.app");

export const metadata: Metadata = {
  title: "MCU Watchlist — Marvel Cinematic Universe Checklist",
  description:
    "Track your Marvel Cinematic Universe watchlist, mark movies and series as watched, and follow your journey toward Avengers: Doomsday.",
  applicationName: "MCU Watchlist",
  // Social scrapers only accept absolute URLs. Vercel supplies the deploy host at
  // build time; SITE_URL overrides it, and the production domain is the fallback.
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "MCU Watchlist — Marvel Cinematic Universe Checklist",
    description:
      "Track your Marvel Cinematic Universe watchlist, mark movies and series as watched, and follow your journey toward Avengers: Doomsday.",
    url: "/",
    siteName: "MCU Watchlist",
    type: "website",
    locale: "en_US",
    images: [
      {
        // JPEG rather than the source PNG: WhatsApp drops previews over ~300KB,
        // and the full-size PNG is 1.5MB. Source kept at /opengraph-image.png.
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 633,
        type: "image/jpeg",
        alt: "MCU Watchlist — track your road to Avengers: Doomsday.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MCU Watchlist — Marvel Cinematic Universe Checklist",
    description:
      "Track your Marvel Cinematic Universe watchlist, mark movies and series as watched, and follow your journey toward Avengers: Doomsday.",
    images: ["/opengraph-image.jpg"],
  },
};

const DIRECTION_CONTRACT = `<!--
FOUR-COLOR INGEST · seed da29b746 (direction/operate)
THESIS: a watchlist is a longbox being filled in, not a streaming shelf being browsed.
  Refuses the dark poster-grid tracker with a red accent that this category always ships.
OWN-WORLD: black ink ground, three process plates (red dominant, cyan and yellow supporting),
  Ben-Day dot fields where a gradient would go, ruled panel gutters instead of card shadows,
  cover-corner boxes carrying issue number and phase, Anton cover lettering against
  small tracked Barlow Condensed credits. Off-register plate slip on hover, once.
STORY: a newcomer sees how far the run to Doomsday actually is, learns which issues are
  required reading, and stamps each one as it is collected.
FIRST VIEWPORT: full-bleed corner box, ROAD TO AVENGERS: DOOMSDAY set at cover scale,
  the fraction printed as the largest object on the page, a halftone bar filling in dots
  rather than pixels, primary action bottom-left of the box.
FORM: candidate 4 of the grounded list (comic floppy / four-color offset), seed da29b746.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review,
  the verdict, and DESIGN.md.
-->`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <span hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        {children}
      </body>
    </html>
  );
}
