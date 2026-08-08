"use client";

import { useMemo, useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface WatchlistState {
  watchedIds: string[];
  toggleWatched: (id: string) => void;
  markAsWatched: (id: string) => void;
  markAsUnwatched: (id: string) => void;
  resetProgress: () => void;
}

export const WATCHLIST_STORAGE_KEY = "mcu-watchlist";

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set) => ({
      watchedIds: [],

      toggleWatched: (id) =>
        set((state) => ({
          watchedIds: state.watchedIds.includes(id)
            ? state.watchedIds.filter((watchedId) => watchedId !== id)
            : [...state.watchedIds, id],
        })),

      markAsWatched: (id) =>
        set((state) =>
          state.watchedIds.includes(id)
            ? state
            : { watchedIds: [...state.watchedIds, id] },
        ),

      markAsUnwatched: (id) =>
        set((state) => ({
          watchedIds: state.watchedIds.filter((watchedId) => watchedId !== id),
        })),

      resetProgress: () => set({ watchedIds: [] }),
    }),
    {
      name: WATCHLIST_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      version: 1,
      partialize: (state) => ({ watchedIds: state.watchedIds }),
    },
  ),
);

/**
 * The server renders with an empty store; localStorage only exists in the browser.
 * Components read this and render the empty-progress shape until rehydration lands,
 * which keeps the first client render byte-identical to the server's.
 */
function subscribeToHydration(onStoreChange: () => void) {
  const unsubHydrate = useWatchlistStore.persist.onHydrate(onStoreChange);
  const unsubFinish = useWatchlistStore.persist.onFinishHydration(onStoreChange);
  return () => {
    unsubHydrate();
    unsubFinish();
  };
}

export function useWatchlistHydrated(): boolean {
  return useSyncExternalStore(
    subscribeToHydration,
    () => useWatchlistStore.persist.hasHydrated(),
    () => false,
  );
}

/** Watched lookups, safe to call during SSR — returns false until hydration completes. */
export function useIsWatched(id: string): boolean {
  const hydrated = useWatchlistHydrated();
  const watched = useWatchlistStore((state) => state.watchedIds.includes(id));
  return hydrated && watched;
}

const EMPTY_WATCHED = new Set<string>();

/** The hydration-safe watched set, as a Set for O(1) membership in list rendering. */
export function useWatchedIds(): Set<string> {
  const hydrated = useWatchlistHydrated();
  const watchedIds = useWatchlistStore((state) => state.watchedIds);
  return useMemo(
    () => (hydrated ? new Set(watchedIds) : EMPTY_WATCHED),
    [hydrated, watchedIds],
  );
}
