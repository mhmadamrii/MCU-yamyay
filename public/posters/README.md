# Posters

Drop poster images here named after the title's `id` in `src/data/mcu.ts`, e.g.
`iron-man.jpg`, `wandavision.jpg`.

Then set `poster: "/posters/iron-man.jpg"` on that item. Anything without a
`poster` field prints a generated four-color cover instead — the app never
fetches artwork from the internet, so no copyrighted image ships by accident.

Portrait 2:3 or 3:4 crops look best; the card renders at `aspect-[3/4]`.
