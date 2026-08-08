"use client";

import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

export function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <label htmlFor="mcu-search" className="sr-only">
        Search MCU titles by name or synopsis
      </label>
      <Search
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-paper-dim"
      />
      <Input
        id="mcu-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search MCU..."
        autoComplete="off"
        className="h-11 rounded-none border-gutter bg-panel pr-10 pl-9 text-base text-paper placeholder:text-paper-dim focus-visible:border-plate-red-bright"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute top-1/2 right-2 -translate-y-1/2 p-1 text-paper-dim transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-plate-red-bright"
        >
          <X aria-hidden className="size-4" />
          <span className="sr-only">Clear search</span>
        </button>
      ) : null}
      <p aria-live="polite" className="sr-only">
        {resultCount} titles match the current search and filters.
      </p>
    </div>
  );
}
