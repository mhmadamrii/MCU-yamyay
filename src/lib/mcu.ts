import { mcuItems } from "@/data/mcu";
import type { MCUItem, OrderMode, WatchlistFilters } from "@/types/mcu";

export const DEFAULT_FILTERS: WatchlistFilters = {
  query: "",
  status: "all",
  type: "all",
  phase: "all",
  importance: "all",
  order: "timeline",
};

export function isDefaultFilters(filters: WatchlistFilters): boolean {
  return (
    filters.query.trim() === "" &&
    filters.status === "all" &&
    filters.type === "all" &&
    filters.phase === "all" &&
    filters.importance === "all"
  );
}

/** Sorted copies. The source array in `data/mcu.ts` is never mutated. */
export const timelineOrdered: MCUItem[] = [...mcuItems].sort(
  (a, b) => a.timelineOrder - b.timelineOrder,
);

export const releaseOrdered: MCUItem[] = [...mcuItems].sort(
  (a, b) => a.releaseOrder - b.releaseOrder,
);

export function orderedItems(order: OrderMode): MCUItem[] {
  return order === "timeline" ? timelineOrdered : releaseOrdered;
}

export const essentialItems: MCUItem[] = mcuItems.filter(
  (item) => item.essentialForDoomsday,
);

export const ESSENTIAL_COUNT = essentialItems.length;

export function applyFilters(
  items: MCUItem[],
  filters: WatchlistFilters,
  watchedIds: Set<string>,
): MCUItem[] {
  const query = filters.query.trim().toLowerCase();

  return items.filter((item) => {
    if (filters.importance === "essential" && !item.essentialForDoomsday) {
      return false;
    }
    if (filters.type !== "all" && item.type !== filters.type) return false;
    if (filters.phase !== "all" && item.phase !== filters.phase) return false;

    if (filters.status !== "all") {
      const watched = watchedIds.has(item.id);
      if (filters.status === "watched" && !watched) return false;
      if (filters.status === "unwatched" && watched) return false;
    }

    if (query) {
      const haystack = `${item.title} ${item.synopsis}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    return true;
  });
}

export interface Progress {
  watched: number;
  total: number;
  remaining: number;
  percent: number;
}

export function progressFor(
  items: MCUItem[],
  watchedIds: Set<string>,
): Progress {
  const total = items.length;
  const watched = items.reduce(
    (count, item) => (watchedIds.has(item.id) ? count + 1 : count),
    0,
  );
  return {
    watched,
    total,
    remaining: total - watched,
    percent: total === 0 ? 0 : Math.round((watched / total) * 100),
  };
}

const DATE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatReleaseDate(isoDate: string): string {
  return DATE_FORMAT.format(new Date(`${isoDate}T00:00:00Z`));
}

export function displayNumber(item: MCUItem, order: OrderMode): string {
  const value = order === "timeline" ? item.timelineOrder : item.releaseOrder;
  return String(value).padStart(2, "0");
}

/**
 * Deterministic ink pairing for the generated cover art, so a title always
 * prints in the same two plates no matter where it appears.
 */
export function coverInk(id: string): 0 | 1 | 2 | 3 {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) % 100_000;
  }
  return (hash % 4) as 0 | 1 | 2 | 3;
}

/** Cover-art lettering: the shortest legible stand-in for a missing poster. */
export function coverMark(title: string): string {
  const stripped = title.replace(/^(The|A)\s+/i, "");
  const words = stripped.split(/[\s:]+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words
    .slice(0, 3)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}
