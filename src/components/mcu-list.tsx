"use client";

import { useMemo, useState } from "react";

import { EmptyState } from "@/components/empty-state";
import { FilterBar } from "@/components/filter-bar";
import { HalftoneBar } from "@/components/halftone-bar";
import { MCUDetail } from "@/components/mcu-detail";
import { MCUItemCard } from "@/components/mcu-item-card";
import { SearchBar } from "@/components/search-bar";
import { mcuItems } from "@/data/mcu";
import {
  DEFAULT_FILTERS,
  applyFilters,
  isDefaultFilters,
  orderedItems,
  progressFor,
} from "@/lib/mcu";
import { useWatchedIds, useWatchlistStore } from "@/store/watchlist-store";
import type { WatchlistFilters } from "@/types/mcu";

export function MCUList() {
  const [filters, setFilters] = useState<WatchlistFilters>(DEFAULT_FILTERS);
  const [openId, setOpenId] = useState<string | null>(null);

  const watchedIds = useWatchedIds();
  const toggleWatched = useWatchlistStore((state) => state.toggleWatched);

  const visible = useMemo(
    () => applyFilters(orderedItems(filters.order), filters, watchedIds),
    [filters, watchedIds],
  );

  const progress = progressFor(visible, watchedIds);
  const openItem = openId
    ? (mcuItems.find((item) => item.id === openId) ?? null)
    : null;

  const setFilter = <K extends keyof WatchlistFilters>(
    key: K,
    value: WatchlistFilters[K],
  ) => setFilters((current) => ({ ...current, [key]: value }));

  return (
    <section
      id="watchlist"
      aria-labelledby="watchlist-heading"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-10 sm:px-6"
    >
      <h2
        id="watchlist-heading"
        className="cover-type text-3xl text-paper sm:text-4xl"
      >
        The long box
      </h2>

      <div className="mt-6 flex flex-col gap-6">
        <SearchBar
          value={filters.query}
          onChange={(value) => setFilter("query", value)}
          resultCount={visible.length}
        />
        <FilterBar filters={filters} onChange={setFilter} />

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-gutter pt-4">
          <p className="credit-type shrink-0 text-[0.65rem] text-paper-dim">
            Showing{" "}
            <span className="text-paper">{visible.length}</span> of{" "}
            {mcuItems.length} · <span className="text-plate-red-bright">
              {progress.watched} watched
            </span>{" "}
            in this view
          </p>
          <div className="min-w-[10rem] flex-1">
            <HalftoneBar
              value={progress.percent}
              label={`Progress in the current view: ${progress.percent}% complete`}
            />
          </div>
          {!isDefaultFilters(filters) ? (
            <button
              type="button"
              onClick={() =>
                setFilters({ ...DEFAULT_FILTERS, order: filters.order })
              }
              className="credit-type text-[0.6rem] text-paper-dim underline underline-offset-4 hover:text-paper focus-visible:outline-2 focus-visible:outline-plate-red-bright"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="mt-8">
          <EmptyState
            onClearFilters={() =>
              setFilters({ ...DEFAULT_FILTERS, order: filters.order })
            }
          />
        </div>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((item) => (
            <MCUItemCard
              key={item.id}
              item={item}
              order={filters.order}
              watched={watchedIds.has(item.id)}
              onToggle={toggleWatched}
              onOpen={setOpenId}
            />
          ))}
        </ul>
      )}

      <MCUDetail
        item={openItem}
        order={filters.order}
        watched={openItem ? watchedIds.has(openItem.id) : false}
        onOpenChange={(open) => {
          if (!open) setOpenId(null);
        }}
        onToggle={toggleWatched}
      />
    </section>
  );
}
