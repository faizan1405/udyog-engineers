import React from "react";
import { cn } from "@/lib/utils";

export interface ProductHighlightsProps {
  highlights: string[];
  className?: string;
}

/**
 * KEY TECHNICAL HIGHLIGHTS
 *
 * Implements an architectural indexed technical grid (Phase 5B):
 * - Clean numeric indexing: `01`, `02`, `03`
 * - Hairline borders with technical crosshair markers
 * - Strictly avoids generic icon cards
 * - Renders only confirmed datasheet highlights
 */
export function ProductHighlights({
  highlights,
  className,
}: ProductHighlightsProps) {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  // Cap at 6 key highlights maximum as recommended
  const visibleHighlights = highlights.slice(0, 6);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between border-b border-border pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
          <h2 className="text-xs font-mono uppercase tracking-wider text-text-primary font-semibold">
            KEY HIGHLIGHTS {"//"} CORE ATTRIBUTES
          </h2>
        </div>
        <span className="font-mono text-[10px] text-text-muted">
          INDEX COUNT {"//"}{" "}
          {String(visibleHighlights.length).padStart(2, "0")}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleHighlights.map((highlight, idx) => {
          const indexNum = String(idx + 1).padStart(2, "0");
          return (
            <div
              key={idx}
              className="relative p-4 sm:p-5 border border-border bg-surface rounded-[2px] shadow-[0_1px_2px_rgba(20,23,21,0.02)] flex flex-col justify-between"
            >
              {/* Corner Registration Mark */}
              <span
                aria-hidden="true"
                className="absolute top-2 right-2 font-mono text-[9px] text-accent-secondary/50 select-none"
              >
                +
              </span>

              {/* Index Number */}
              <div className="flex items-center gap-2 mb-2.5">
                <span className="font-mono text-xs font-semibold text-accent-secondary">
                  {indexNum}
                </span>
                <span className="w-4 h-[1px] bg-border-strong" />
              </div>

              {/* Verified Highlight Copy */}
              <p className="text-xs sm:text-sm text-text-primary font-medium leading-relaxed">
                {highlight}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
