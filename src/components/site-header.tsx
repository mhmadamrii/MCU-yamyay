"use client";

import { mcuItems } from "@/data/mcu";
import { progressFor } from "@/lib/mcu";
import { useWatchedIds } from "@/store/watchlist-store";

const NAV = [
  { href: "#watchlist", label: "Watchlist" },
  { href: "#doomsday", label: "Essential" },
  { href: "#progress", label: "Progress" },
];

export function SiteHeader() {
  const watchedIds = useWatchedIds();
  const progress = progressFor(mcuItems, watchedIds);

  return (
    <header className="sticky top-0 z-40 border-b border-gutter bg-ink/95 backdrop-blur-[2px]">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2.5 sm:px-6">
        <a
          href="#top"
          className="cover-type text-2xl leading-none text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plate-red-bright sm:text-3xl"
        >
          MCU<span className="text-plate-red">·</span>Watchlist
        </a>

        <nav aria-label="Sections" className="ml-2 hidden sm:block">
          <ul className="flex items-center gap-1">
            {NAV.map((entry) => (
              <li key={entry.href}>
                <a
                  href={entry.href}
                  className="credit-type block px-3 py-1 text-[0.8rem] text-paper-dim transition-colors hover:bg-panel-raised hover:text-paper focus-visible:outline-2 focus-visible:outline-plate-red-bright"
                >
                  {entry.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="credit-type ml-auto shrink-0 text-[0.8rem] text-paper-dim">
          <span className="text-plate-red-bright">{progress.watched}</span>
          {" / "}
          {progress.total} watched
        </p>
      </div>

      <nav aria-label="Sections" className="border-t border-gutter sm:hidden">
        <ul className="flex">
          {NAV.map((entry) => (
            <li key={entry.href} className="flex-1">
              <a
                href={entry.href}
                className="credit-type block py-2.5 text-center text-[0.75rem] text-paper-dim"
              >
                {entry.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
