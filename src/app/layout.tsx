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

export const metadata: Metadata = {
  title: "MCU Watchlist — Marvel Cinematic Universe Checklist",
  description:
    "Track your Marvel Cinematic Universe watchlist, mark movies and series as watched, and follow your journey toward Avengers: Doomsday.",
  applicationName: "MCU Watchlist",
  openGraph: {
    title: "MCU Watchlist — Marvel Cinematic Universe Checklist",
    description:
      "Track your Marvel Cinematic Universe watchlist, mark movies and series as watched, and follow your journey toward Avengers: Doomsday.",
    type: "website",
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
        <span
          hidden
          dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }}
        />
        {children}
      </body>
    </html>
  );
}
