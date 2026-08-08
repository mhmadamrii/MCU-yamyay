"use client";

import { PlateToggle } from "@/components/plate-toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PHASES } from "@/data/mcu";
import type {
  ImportanceFilter,
  OrderMode,
  PhaseFilter,
  StatusFilter,
  TypeFilter,
  WatchlistFilters,
} from "@/types/mcu";

const ORDER_OPTIONS = [
  { value: "timeline", label: "Timeline order" },
  { value: "release", label: "Release order" },
] as const satisfies readonly { value: OrderMode; label: string }[];

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "watched", label: "Watched" },
  { value: "unwatched", label: "Unwatched" },
] as const satisfies readonly { value: StatusFilter; label: string }[];

const TYPE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "movie", label: "Movies" },
  { value: "series", label: "Series" },
] as const satisfies readonly { value: TypeFilter; label: string }[];

const IMPORTANCE_OPTIONS = [
  { value: "all", label: "All MCU" },
  { value: "essential", label: "Essential" },
] as const satisfies readonly { value: ImportanceFilter; label: string }[];

const PHASE_ITEMS = [
  { value: "all", label: "All phases" },
  ...PHASES.map((phase) => ({ value: phase, label: phase })),
];

interface FilterBarProps {
  filters: WatchlistFilters;
  onChange: <K extends keyof WatchlistFilters>(
    key: K,
    value: WatchlistFilters[K],
  ) => void;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="credit-type text-[0.55rem] text-paper-dim">{label}</span>
      {children}
    </div>
  );
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
      <Field label="Reading order">
        <PlateToggle
          label="Reading order"
          value={filters.order}
          options={ORDER_OPTIONS}
          onChange={(value) => onChange("order", value)}
        />
      </Field>

      <Field label="Importance">
        <PlateToggle
          label="Importance"
          value={filters.importance}
          options={IMPORTANCE_OPTIONS}
          onChange={(value) => onChange("importance", value)}
        />
      </Field>

      <Field label="Status">
        <PlateToggle
          label="Status"
          value={filters.status}
          options={STATUS_OPTIONS}
          onChange={(value) => onChange("status", value)}
        />
      </Field>

      <Field label="Type">
        <PlateToggle
          label="Type"
          value={filters.type}
          options={TYPE_OPTIONS}
          onChange={(value) => onChange("type", value)}
        />
      </Field>

      <Field label="Phase">
        <Select
          items={PHASE_ITEMS}
          value={filters.phase}
          onValueChange={(value) => onChange("phase", value as PhaseFilter)}
        >
          <SelectTrigger
            aria-label="Filter by phase"
            className="credit-type h-[34px] min-w-[9.5rem] rounded-none border-gutter bg-panel text-[0.65rem] text-paper"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-none border-gutter bg-panel">
            {PHASE_ITEMS.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="credit-type rounded-none text-[0.65rem]"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
}
