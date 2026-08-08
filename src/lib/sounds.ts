"use client";

import { playSound, preloadSounds } from "react-sounds";

/**
 * react-sounds resolves any name that is not one of its bundled library names
 * as a plain URL, so these paths are fetched straight from /public.
 */
export const SOUND_CHECKED = "/sounds/info.mp3";
export const SOUND_UNCHECKED = "/sounds/popup.mp3";

const VOLUME = 0.35;

/** Warm the blob cache so the first stamp is not silent while the file loads. */
export function preloadWatchlistSounds(): void {
  void preloadSounds([SOUND_CHECKED, SOUND_UNCHECKED]).catch(() => {
    // A missing or blocked audio file must never break the checklist.
  });
}

/** `nowWatched` is the state the title is moving *to*. */
export function playWatchToggleSound(nowWatched: boolean): void {
  void playSound(nowWatched ? SOUND_CHECKED : SOUND_UNCHECKED, {
    volume: VOLUME,
  }).catch(() => {
    // Autoplay policy or a fetch failure — silence is an acceptable outcome.
  });
}
