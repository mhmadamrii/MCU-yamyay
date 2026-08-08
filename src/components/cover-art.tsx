import Image from "next/image";

import { coverInk, coverMark } from "@/lib/mcu";
import { cn } from "@/lib/utils";
import type { MCUItem } from "@/types/mcu";

const PLATES = [
  { field: "var(--plate-red)", mark: "var(--paper)" },
  { field: "var(--plate-cyan)", mark: "var(--paper)" },
  { field: "var(--plate-yellow)", mark: "var(--ink)" },
  { field: "var(--plate-red-bright)", mark: "var(--ink)" },
] as const;

interface CoverArtProps {
  item: MCUItem;
  /** Dot gap scales with the printed size. */
  size?: "sm" | "lg";
  className?: string;
  sizes?: string;
}

/**
 * A title's cover. Real poster art when it exists at /posters/<id>.jpg,
 * otherwise a printed stand-in: one process plate laid down as a dot field
 * with the title's mark knocked out of it.
 */
export function CoverArt({
  item,
  size = "sm",
  className,
  sizes = "(min-width: 1024px) 200px, 33vw",
}: CoverArtProps) {
  if (item.poster) {
    return (
      <div
        className={cn("relative overflow-hidden bg-panel-raised", className)}
      >
        <Image
          src={item.poster}
          alt=""
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  const plate = PLATES[coverInk(item.id)];
  const mark = coverMark(item.title);

  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden bg-ink",
        size === "lg" ? "benday" : "benday",
        className,
      )}
      style={
        {
          "--dot-color": plate.field,
          "--dot-size": size === "lg" ? "2.5px" : "1.6px",
          "--dot-gap": size === "lg" ? "9px" : "6px",
        } as React.CSSProperties
      }
    >
      {/* Solid plate wedge: the printed area the dots fade out of. */}
      <div
        className="absolute inset-x-0 bottom-0 h-[46%]"
        style={{
          background: `linear-gradient(to top, ${plate.field} 62%, transparent)`,
        }}
      />
      <span
        className={cn(
          "cover-type absolute inset-x-0 bottom-0 px-2 pb-1 text-center",
          size === "lg" ? "text-5xl" : "text-2xl",
        )}
        style={{ color: plate.mark }}
      >
        {mark}
      </span>
    </div>
  );
}
