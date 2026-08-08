"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface HalftoneBarProps {
  value: number;
  label: string;
  size?: "sm" | "lg";
  className?: string;
}

/**
 * Progress as a printed plate: the filled portion is laid down in red dots
 * over an unprinted track, so the bar reads as ink coverage rather than a meter.
 */
export function HalftoneBar({
  value,
  label,
  size = "sm",
  className,
}: HalftoneBarProps) {
  return (
    <Progress
      value={value}
      aria-label={label}
      className={cn(
        "block w-full",
        size === "lg"
          ? "[&_[data-slot=progress-track]]:h-6"
          : "[&_[data-slot=progress-track]]:h-3",
        "[&_[data-slot=progress-track]]:w-full [&_[data-slot=progress-track]]:rounded-none [&_[data-slot=progress-track]]:border [&_[data-slot=progress-track]]:border-gutter [&_[data-slot=progress-track]]:bg-panel",
        "[&_[data-slot=progress-indicator]]:benday [&_[data-slot=progress-indicator]]:bg-plate-red [&_[data-slot=progress-indicator]]:transition-[width] [&_[data-slot=progress-indicator]]:duration-500 [&_[data-slot=progress-indicator]]:ease-[cubic-bezier(0.16,1,0.3,1)]",
        className,
      )}
      style={
        {
          "--dot-color": "var(--ink)",
          "--dot-size": size === "lg" ? "2px" : "1.4px",
          "--dot-gap": size === "lg" ? "6px" : "5px",
        } as React.CSSProperties
      }
    />
  );
}
