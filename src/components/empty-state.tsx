"use client";

import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="panel flex flex-col items-center gap-4 px-6 py-16 text-center">
      <div
        aria-hidden
        className="benday h-16 w-full max-w-xs"
        style={
          {
            "--dot-color": "var(--paper-dim)",
            "--dot-size": "1.5px",
            "--dot-gap": "8px",
          } as React.CSSProperties
        }
      />
      <h3 className="cover-type text-2xl text-paper">No MCU titles found.</h3>
      <p className="max-w-sm text-sm text-paper-dim">
        Try another search or change your filters.
      </p>
      <Button
        onClick={onClearFilters}
        className="credit-type h-10 rounded-none px-4 text-[0.7rem]"
      >
        Clear filters
      </Button>
    </div>
  );
}
