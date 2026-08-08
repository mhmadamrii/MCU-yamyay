"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useWatchlistStore } from "@/store/watchlist-store";

export function ResetProgressDialog({ watchedCount }: { watchedCount: number }) {
  const [open, setOpen] = useState(false);
  const resetProgress = useWatchlistStore((state) => state.resetProgress);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            className="credit-type h-9 rounded-none px-3 text-[0.65rem] text-paper-dim hover:text-paper"
          />
        }
      >
        <RotateCcw aria-hidden />
        Reset progress
      </DialogTrigger>

      <DialogContent className="rounded-none border border-gutter bg-panel p-6 ring-0">
        <DialogTitle className="cover-type text-2xl text-paper">
          Reset your MCU progress?
        </DialogTitle>
        <DialogDescription className="text-sm text-paper-dim">
          This will mark all titles as unwatched
          {watchedCount > 0
            ? `, clearing the ${watchedCount} you have already stamped.`
            : "."}{" "}
          It cannot be undone — progress is stored only in this browser.
        </DialogDescription>
        <DialogFooter className="gap-2">
          <DialogClose
            render={
              <Button
                variant="outline"
                className="credit-type h-10 rounded-none px-4 text-[0.7rem]"
              />
            }
          >
            Cancel
          </DialogClose>
          <Button
            onClick={() => {
              resetProgress();
              setOpen(false);
            }}
            className="credit-type h-10 rounded-none px-4 text-[0.7rem]"
          >
            Reset progress
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
