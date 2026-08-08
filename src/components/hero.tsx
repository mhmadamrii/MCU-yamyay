"use client";

import { ArrowDown } from "lucide-react";

import { HalftoneBar } from "@/components/halftone-bar";
import { Button } from "@/components/ui/button";
import { essentialItems } from "@/lib/mcu";
import { progressFor } from "@/lib/mcu";
import { useWatchedIds } from "@/store/watchlist-store";

export function Hero() {
  const watchedIds = useWatchedIds();
  const progress = progressFor(essentialItems, watchedIds);

  return (
    <section
      id="doomsday"
      aria-labelledby="doomsday-heading"
      className="relative overflow-hidden border-b border-gutter"
    >
      {/* The red plate, laid down as dots and bleeding off the right edge. */}
      <div
        aria-hidden
        className="benday pointer-events-none absolute inset-y-0 right-0 w-2/3 opacity-70"
        style={
          {
            "--dot-color": "var(--plate-red)",
            "--dot-size": "2px",
            "--dot-gap": "10px",
            maskImage:
              "linear-gradient(to left, rgba(0,0,0,0.9), transparent 78%)",
          } as React.CSSProperties
        }
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-12 sm:px-6 sm:pt-14 sm:pb-16">
        <p className="credit-type text-[0.6rem] text-paper-dim">
          Issue 01 — the run so far
        </p>

        <h1
          id="doomsday-heading"
          className="cover-type mt-3 max-w-[14ch] text-[clamp(2.75rem,9vw,6rem)] text-paper"
        >
          Road to <span className="text-plate-red">Avengers: Doomsday</span>
        </h1>

        <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-paper-dim sm:text-lg">
          Track your journey through the Marvel Cinematic Universe — from Iron
          Man to Avengers: Doomsday. Not everything is required reading. These{" "}
          {progress.total} titles are.
        </p>

        <div className="mt-8 flex flex-wrap items-end gap-x-8 gap-y-4">
          <p className="flex items-baseline gap-2">
            <span className="cover-type text-[clamp(4.5rem,16vw,10rem)] leading-[0.8] text-paper tabular-nums">
              {progress.watched}
            </span>
            <span className="cover-type text-[clamp(2rem,7vw,4.5rem)] leading-none text-paper-dim tabular-nums">
              / {progress.total}
            </span>
            <span className="credit-type pb-2 text-[0.7rem] text-paper-dim">
              essential watched
            </span>
          </p>
        </div>

        <div className="mt-6 max-w-3xl">
          <HalftoneBar
            size="lg"
            value={progress.percent}
            label={`Road to Doomsday progress: ${progress.percent}% complete`}
          />
          <p className="credit-type mt-2 flex flex-wrap gap-x-4 text-[0.65rem] text-paper-dim">
            <span className="text-plate-red-bright">
              {progress.percent}% complete
            </span>
            <span>{progress.remaining} titles remaining</span>
          </p>
        </div>

        <div className="mt-8">
          <Button
            render={<a href="#watchlist" />}
            className="credit-type h-12 rounded-none px-6 text-[0.75rem]"
          >
            Start watching
            <ArrowDown aria-hidden strokeWidth={3} />
          </Button>
        </div>
      </div>
    </section>
  );
}
