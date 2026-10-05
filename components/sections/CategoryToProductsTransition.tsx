import React from "react";
import { Container } from "@/components/ui/Container";

/**
 * CATEGORY TO PRODUCTS TRANSITION (PHASE 4B)
 *
 * Dedicated architectural continuity bridge between:
 * Section 02 (Equipment Categories) and Section 03 (Selected Equipment).
 *
 * Provides controlled background transition from `--surface` to `--surface-secondary`,
 * unified hairline grid lines, and registration crosshairs.
 */
export function CategoryToProductsTransition() {
  return (
    <div
      aria-hidden="true"
      className="relative w-full border-t border-border bg-gradient-to-b from-surface via-surface-secondary/40 to-surface-secondary py-6 select-none"
    >
      <Container>
        <div className="flex items-center justify-between text-[11px] font-mono text-text-muted">
          {/* Left Registration Mark */}
          <div className="flex items-center gap-2">
            <span className="text-accent-secondary font-semibold">+</span>
            <span className="hidden sm:inline tracking-wider uppercase text-text-secondary">
              PORTFOLIO ARCHIVES (01–08)
            </span>
          </div>

          {/* Center Continuity Rule */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary/60 shrink-0" />
            <span className="tracking-wider sm:tracking-widest uppercase font-medium text-text-primary text-[9px] sm:text-[10px] truncate max-w-[200px] sm:max-w-none">
              CONTINUITY // BENCHMARK HARDWARE REGISTRY
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary/60 shrink-0" />
          </div>

          {/* Right Registration Mark */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline tracking-wider uppercase text-text-secondary">
              SELECTED EQUIPMENT
            </span>
            <span className="text-accent-secondary font-semibold">+</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
