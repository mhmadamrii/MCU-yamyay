"use client";

import { Check } from "lucide-react";

import { CoverArt } from "@/components/cover-art";
import { Checkbox } from "@/components/ui/checkbox";
import { displayNumber, formatReleaseDate } from "@/lib/mcu";
import { cn } from "@/lib/utils";
import type { MCUItem, OrderMode } from "@/types/mcu";

interface MCUItemCardProps {
  item: MCUItem;
  order: OrderMode;
  watched: boolean;
  onToggle: (id: string) => void;
  onOpen: (id: string) => void;
}

export function MCUItemCard({
  item,
  order,
  watched,
  onToggle,
  onOpen,
}: MCUItemCardProps) {
  const number = displayNumber(item, order);
  const checkboxId = `watched-${item.id}`;

  return (
    <li
      className={cn(
        "group panel relative flex flex-col transition-colors duration-200",
        watched
          ? "border-plate-red/60 bg-panel-raised"
          : "hover:border-paper/30",
      )}
    >
      {/* Cover plate with the corner box printed over it, comic-cover fashion. */}
      <div className="relative">
        <CoverArt
          item={item}
          className="aspect-[3/4] w-full"
          sizes="(min-width: 1280px) 300px, (min-width: 768px) 45vw, 90vw"
        />

        <div className="absolute top-0 left-0 flex flex-col items-start border-r border-b border-gutter bg-ink/95 px-2 py-1">
          <span className="cover-type text-2xl leading-none text-paper">
            {number}
          </span>
          <span className="credit-type text-[0.5rem] text-paper-dim">
            {item.phase}
          </span>
        </div>

        <span
          className={cn(
            "credit-type absolute top-1.5 right-1.5 px-1.5 py-0.5 text-[0.55rem]",
            item.type === "movie"
              ? "bg-plate-cyan text-ink"
              : "bg-plate-yellow text-ink",
          )}
        >
          {item.type === "movie" ? "Movie" : "Series"}
        </span>

        {watched ? (
          <span className="stamp absolute right-2 bottom-2 text-sm">
            Watched
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <button
          type="button"
          onClick={() => onOpen(item.id)}
          className="text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plate-red-bright"
        >
          <h3 className="cover-type misreg text-xl text-paper sm:text-2xl">
            {item.title}
          </h3>
          <span className="sr-only">— open details</span>
        </button>

        <p className="credit-type text-[0.6rem] text-paper-dim">
          {formatReleaseDate(item.releaseDate)}
          {item.duration ? ` · ${item.duration}` : ""}
          {item.episodes && item.episodes > 1
            ? ` · ${item.episodes} episodes`
            : ""}
        </p>

        {item.essentialForDoomsday ? (
          <p className="credit-type flex items-center gap-1 text-[0.6rem] text-plate-red-bright">
            <span aria-hidden className="inline-block size-1.5 bg-current" />
            Essential for Doomsday
          </p>
        ) : null}

        <p className="line-clamp-3 text-sm leading-snug text-paper-dim">
          {item.synopsis}
        </p>

        {item.dataConfidence === "scheduled" ? (
          <p className="credit-type text-[0.55rem] text-plate-yellow">
            Scheduled · date may change
          </p>
        ) : null}

        <label
          htmlFor={checkboxId}
          className={cn(
            "mt-auto flex cursor-pointer items-center gap-2 border-t border-gutter pt-3 text-sm select-none",
            watched ? "text-plate-red-bright" : "text-paper-dim",
          )}
        >
          <Checkbox
            id={checkboxId}
            checked={watched}
            onCheckedChange={() => onToggle(item.id)}
            className="rounded-none"
          />
          <span className="credit-type text-[0.65rem]">
            {watched ? "Watched" : "Mark as watched"}
          </span>
          {watched ? (
            <Check aria-hidden className="ml-auto size-3.5" strokeWidth={3} />
          ) : null}
        </label>
      </div>
    </li>
  );
}
