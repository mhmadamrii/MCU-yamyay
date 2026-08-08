export type MCUItemType = "movie" | "series";

export type MCUPhase =
  | "Phase One"
  | "Phase Two"
  | "Phase Three"
  | "Phase Four"
  | "Phase Five"
  | "Phase Six";

/**
 * `confirmed` — released, dates and runtime are matters of record.
 * `scheduled` — announced with a studio-stated date that has moved before and may move again.
 */
export type MCUDataConfidence = "confirmed" | "scheduled";

export interface MCUItem {
  /** Stable slug. Also the localStorage identity and the expected poster filename. */
  id: string;
  title: string;
  /** ISO 8601. Theatrical release for films, premiere date for series. */
  releaseDate: string;
  year: number;
  type: MCUItemType;
  phase: MCUPhase;
  /** Short original paraphrase. Never copied marketing text. */
  synopsis: string;
  /** Position in in-story chronology. */
  timelineOrder: number;
  /** Position in real-world premiere order. */
  releaseOrder: number;
  /** Curated: needed to follow Avengers: Doomsday. Not a quality judgement. */
  essentialForDoomsday: boolean;
  /** `/posters/<id>.jpg` when present; falls back to generated cover art. */
  poster?: string;
  /** Films only, e.g. "2h 6m". */
  duration?: string;
  /** Series only. */
  episodes?: number;
  dataConfidence: MCUDataConfidence;
  /** Shown verbatim when the record is not settled. */
  note?: string;
}

export type OrderMode = "timeline" | "release";

export type StatusFilter = "all" | "watched" | "unwatched";

export type TypeFilter = "all" | "movie" | "series";

export type PhaseFilter = "all" | MCUPhase;

export type ImportanceFilter = "all" | "essential";

export interface WatchlistFilters {
  query: string;
  status: StatusFilter;
  type: TypeFilter;
  phase: PhaseFilter;
  importance: ImportanceFilter;
  order: OrderMode;
}
