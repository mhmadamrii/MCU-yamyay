"use client";

import { Check, Plus } from "lucide-react";

import { CoverArt } from "@/components/cover-art";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { displayNumber, formatReleaseDate } from "@/lib/mcu";
import type { MCUItem, OrderMode } from "@/types/mcu";

interface MCUDetailProps {
  item: MCUItem | null;
  order: OrderMode;
  watched: boolean;
  onOpenChange: (open: boolean) => void;
  onToggle: (id: string) => void;
}

export function MCUDetail({
  item,
  order,
  watched,
  onOpenChange,
  onToggle,
}: MCUDetailProps) {
  return (
    <Dialog open={item !== null} onOpenChange={onOpenChange}>
      {item ? (
        <DialogContent className="max-h-[90vh] overflow-y-auto rounded-none border border-gutter bg-panel p-0 ring-0 sm:max-w-2xl">
          <div className="grid gap-0 sm:grid-cols-[minmax(0,11rem)_1fr]">
            <div className="relative">
              <CoverArt
                item={item}
                size="lg"
                className="aspect-[3/4] w-full sm:h-full"
                sizes="(min-width: 640px) 176px, 100vw"
              />
              <div className="absolute top-0 left-0 flex flex-col items-start border-r border-b border-gutter bg-ink/95 px-2 py-1">
                <span className="cover-type text-2xl leading-none text-paper">
                  {displayNumber(item, order)}
                </span>
                <span className="credit-type text-[0.5rem] text-paper-dim">
                  {item.phase}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 p-5 pr-12">
              <DialogTitle className="cover-type text-3xl text-paper sm:text-4xl">
                {item.title}
              </DialogTitle>

              <dl className="credit-type grid grid-cols-2 gap-x-4 gap-y-2 text-[0.6rem] text-paper-dim">
                <div>
                  <dt className="text-paper-dim/70">Released</dt>
                  <dd className="text-paper">
                    {formatReleaseDate(item.releaseDate)}
                  </dd>
                </div>
                <div>
                  <dt className="text-paper-dim/70">Format</dt>
                  <dd className="text-paper">
                    {item.type === "movie" ? "Movie" : "Series"}
                    {item.duration ? ` · ${item.duration}` : ""}
                    {item.episodes ? ` · ${item.episodes} ep` : ""}
                  </dd>
                </div>
                <div>
                  <dt className="text-paper-dim/70">Phase</dt>
                  <dd className="text-paper">{item.phase}</dd>
                </div>
                <div>
                  <dt className="text-paper-dim/70">Doomsday</dt>
                  <dd
                    className={
                      item.essentialForDoomsday
                        ? "text-plate-red-bright"
                        : "text-paper"
                    }
                  >
                    {item.essentialForDoomsday ? "Essential" : "Optional"}
                  </dd>
                </div>
              </dl>

              <DialogDescription className="max-w-[68ch] text-sm leading-relaxed text-paper-dim">
                {item.synopsis}
              </DialogDescription>

              {item.note ? (
                <p className="border-l border-plate-yellow pl-3 text-xs text-plate-yellow">
                  {item.note}
                </p>
              ) : null}

              <div className="mt-auto flex items-center gap-3 pt-2">
                <Button
                  onClick={() => onToggle(item.id)}
                  className="credit-type h-10 rounded-none px-4 text-[0.7rem]"
                  variant={watched ? "outline" : "default"}
                >
                  {watched ? (
                    <>
                      <Check strokeWidth={3} /> Watched — undo
                    </>
                  ) : (
                    <>
                      <Plus strokeWidth={3} /> Mark as watched
                    </>
                  )}
                </Button>
                <span className="credit-type text-[0.6rem] text-paper-dim">
                  {watched ? "In your collection" : "Not yet collected"}
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
}
