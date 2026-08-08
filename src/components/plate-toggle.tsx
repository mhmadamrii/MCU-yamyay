"use client";

import { cn } from "@/lib/utils";

interface PlateToggleOption<T extends string> {
  value: T;
  label: string;
}

interface PlateToggleProps<T extends string> {
  label: string;
  value: T;
  options: readonly PlateToggleOption<T>[];
  onChange: (value: T) => void;
  className?: string;
}

/**
 * Segmented control printed as a strip of plate tabs: the selected tab is
 * inked solid, the rest are unprinted. Built in the world's own vocabulary
 * rather than dropped in as a stock toggle.
 */
export function PlateToggle<T extends string>({
  label,
  value,
  options,
  onChange,
  className,
}: PlateToggleProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex flex-wrap border border-gutter", className)}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "credit-type px-3 py-1.5 text-[0.65rem] transition-colors duration-150",
              "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-plate-red-bright",
              active
                ? "bg-plate-red text-white"
                : "text-paper-dim hover:bg-panel-raised hover:text-paper",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
