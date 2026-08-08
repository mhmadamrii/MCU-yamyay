# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16.3.0 (App Router) + TypeScript + Tailwind CSS v4 + ESLint, scaffolded via `create-next-app`. The brief additionally mandates Zustand (with `persist` middleware) for state and lucide-react for icons. No database and no backend: watch progress lives only in the browser's localStorage. Server Components are the default; `"use client"` is limited to components that genuinely need state or storage.

## Users

Primary user: someone preparing to watch **Avengers: Doomsday** who has either never followed the MCU or fell off years ago. They arrive knowing the franchise is large and not knowing where to start or what is skippable. Their job is to decide *what to watch, in what order*, and to keep track of that decision across many sittings over weeks — on a phone during commutes, on a laptop at home.

Because of this, "what is actually essential" is the product's leading answer, not a secondary filter. The complete franchise list is available but is not the default frame of the experience.

## Product Purpose

An MCU watchlist and checklist. The user browses MCU films and series in a deliberate viewing order, reads release date and a short synopsis, and ticks off what they have watched. Progress persists locally so closing or refreshing the tab never loses it.

Success is a user who can answer, in one glance, "how far am I from being ready for Doomsday, and what do I watch next?" — and who still has that answer three weeks later without an account.

## Positioning

Two things distinguish it from a generic checklist:

1. **A curated essential path.** Titles carry an `essentialForDoomsday` flag, and the product explicitly rejects the premise that all MCU content is required. The user can switch between *All MCU* and *Essential for Doomsday* and the progress math follows the active view.
2. **Order is a user choice, not an editorial one.** Timeline (story) order is the default; release order is one toggle away. The underlying data is never mutated — ordering and filtering happen in the UI layer.

## Operating Context

- Long-running, interrupted usage: a watchlist is worked through over weeks, across devices the user may not think of as linked. Progress is per-browser by design; there is no sync and no account.
- The primary interaction is repetitive and low-effort: find a title, mark it watched, see the number move. That loop must be fast on a phone and forgiving of mistaps (unchecking is as easy as checking).
- Secondary interactions: search by title or synopsis, filter by status / type / phase / importance, open a title for detail, reset all progress.
- Reset is destructive and irreversible (no undo, no server copy), so it is gated behind an explicit confirmation dialog.

## Capabilities and Constraints

Confirmed functionality:

- Ordered list of MCU movies and series, each with: sequence number, title, year, release date, type (`movie` | `series`), phase, synopsis, optional duration, optional episode count, optional poster, watched state.
- Watched / unwatched toggle per title; persisted to localStorage under the key `mcu-watchlist` via Zustand `persist`.
- Progress dashboard: watched count, remaining count, percentage, progress bar — recalculated against the currently *displayed* set, not always the full catalogue.
- A dedicated "Road to Avengers: Doomsday" progress view over the essential subset only.
- Search (title + synopsis, client-side), filters (status, type, phase, importance), order toggle (Timeline | Release, default Timeline).
- Detail view per title (modal or expandable card) with the full record and a mark-as-watched action.
- Empty state for zero search/filter results, with a Clear Filters action.
- Reset Progress with a confirmation dialog.

Technical constraints:

- No backend, no database, no user accounts. localStorage is the only store.
- Hydration must be handled explicitly so the server-rendered markup does not disagree with localStorage-derived state on first paint.
- React Context is ruled out for watchlist state; Zustand is the required mechanism.
- The whole app must not be blanket-marked `"use client"`.
- Data lives in `src/data/mcu.ts` with types in `src/types/mcu.ts`; the store in `src/store/watchlist-store.ts`; components split under `src/components/` rather than piled into `page.tsx`.
- `npm run build` must succeed; lint and typecheck must be clean.

Terminology: *Phase* (Phase One … Phase Six) is Marvel's own release-grouping and is used as a filter facet. *Timeline order* means in-story chronology; *Release order* means real-world premiere date. *Essential* means required to follow Doomsday, as curated — not "good" or "canonical."

## Brand Commitments

- Product name in the interface: **MCU WATCHLIST**.
- All interface copy is **English** (the brief itself is written in Indonesian; the UI is not).
- Marvel red is the accent colour, against a dark cinematic base. This is an homage palette, not a claim of affiliation — the product is an unofficial fan tool and must not present itself as a Marvel/Disney property.
- Tone: an informed friend giving directions. Confident about order and essentials, never breathless.

## Evidence on Hand

- **Poster images: none yet.** The user will supply real files later at `public/posters/<slug>.jpg`. Until then every card renders a gradient-plus-title fallback, and that fallback must look deliberate rather than broken. Copyrighted artwork must never be fetched from the internet automatically.
- **Title data must be real.** Release dates, phases, types, and episode counts are factual and are not to be invented. Synopses are short original paraphrases, not copied text.
- **Avengers: Doomsday is unreleased.** Its release date has moved more than once and must be verified before it is displayed; plot details do not exist publicly and must not be fabricated. It functions as the watchlist's endpoint, not as a catalogue entry with a synopsis.
- Any title whose data is unconfirmed is marked as such in the data file rather than filled with plausible-sounding invention.

## Product Principles

1. **Not everything is required.** The essential path is the product's point of view; a complete list without curation would be the thing the user already couldn't face.
2. **Progress is the interface.** Every screen answers "how far along am I" before it answers anything else.
3. **Never invent a fact.** An honest gap or an explicit "TBA" beats a confident wrong release date, especially for unreleased titles.
4. **The data file is the source of truth.** Ordering, filtering, and grouping are view concerns; adding a title should mean editing one array and nothing else.
5. **Local, private, accountless.** No sign-in, no sync, no tracking — and therefore an explicit confirmation before anything that destroys the only copy of the user's progress.

## Accessibility & Inclusion

- Watched state must never be conveyed by colour or opacity alone — a text or icon indicator carries it too.
- Checkboxes are labelled; every control has an accessible name; the full check/uncheck, search, filter, and reset flow is operable by keyboard.
- Contrast must hold on the dark theme, including for secondary grey text and for red-on-dark accents.
- Semantic HTML throughout (lists are lists, buttons are buttons).
