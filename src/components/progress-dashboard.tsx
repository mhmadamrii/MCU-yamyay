"use client";

import { HalftoneBar } from "@/components/halftone-bar";
import { ResetProgressDialog } from "@/components/reset-progress-dialog";
import { mcuItems } from "@/data/mcu";
import { progressFor } from "@/lib/mcu";
import { useWatchedIds } from "@/store/watchlist-store";

export function ProgressDashboard() {
  const watchedIds = useWatchedIds();
  const progress = progressFor(mcuItems, watchedIds);

  const movies = mcuItems.filter((item) => item.type === "movie");
  const series = mcuItems.filter((item) => item.type === "series");
  const movieProgress = progressFor(movies, watchedIds);
  const seriesProgress = progressFor(series, watchedIds);

  return (
    <section
      id="progress"
      aria-labelledby="progress-heading"
      className="border-b border-gutter"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2
            id="progress-heading"
            className="cover-type text-2xl text-paper sm:text-3xl"
          >
            The whole collection
          </h2>
          <ResetProgressDialog watchedCount={progress.watched} />
        </div>

        <div className="mt-5 grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div>
            <p className="flex items-baseline gap-2">
              <span className="cover-type text-5xl text-paper tabular-nums">
                {progress.watched}
              </span>
              <span className="cover-type text-2xl text-paper-dim tabular-nums">
                / {progress.total}
              </span>
              <span className="credit-type text-[0.65rem] text-paper-dim">
                watched · {progress.percent}% complete
              </span>
            </p>
            <div className="mt-3">
              <HalftoneBar
                value={progress.percent}
                label={`Full catalogue progress: ${progress.percent}% complete`}
              />
            </div>
          </div>

          <dl className="credit-type flex gap-6 text-[0.6rem] text-paper-dim">
            <div>
              <dt>Movies</dt>
              <dd className="cover-type text-xl text-paper tabular-nums">
                {movieProgress.watched}/{movieProgress.total}
              </dd>
            </div>
            <div>
              <dt>Series</dt>
              <dd className="cover-type text-xl text-paper tabular-nums">
                {seriesProgress.watched}/{seriesProgress.total}
              </dd>
            </div>
            <div>
              <dt>Remaining</dt>
              <dd className="cover-type text-xl text-plate-red-bright tabular-nums">
                {progress.remaining}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
