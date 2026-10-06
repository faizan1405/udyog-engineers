import React from "react";
import { Container } from "@/components/ui/Container";

/**
 * APPLICATIONS TO CREDIBILITY TRANSITION (PHASE 4C)
 *
 * Dedicated architectural continuity bridge between:
 * Section 04 (Applications & Environments) and Section 05 (Why Choose Udyog).
 *
 * Connects operational context to company positioning and principles.
 */
export function ApplicationsToCredibilityTransition() {
  return (
    <div
      aria-hidden="true"
      className="relative w-full border-t border-border bg-gradient-to-b from-background via-surface/60 to-surface py-6 select-none"
    >
      <Container>
        <div className="flex items-center justify-between text-xs font-sans text-text-muted">
          {/* Left Registration Mark */}
          <div className="flex items-center gap-2">
            <span className="text-accent-secondary font-semibold">+</span>
            <span className="hidden sm:inline text-text-secondary font-medium">
              Applications Index (01–08)
            </span>
          </div>

          {/* Center Continuity Rule */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary/60 shrink-0" />
            <span className="font-medium text-text-primary text-[10px] sm:text-[11px] truncate max-w-[200px] sm:max-w-none">
              Continuity · Credibility &amp; Positioning
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary/60 shrink-0" />
          </div>

          {/* Right Registration Mark */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-text-secondary font-medium">
              Positioning (Sec. 05)
            </span>
            <span className="text-accent-secondary font-semibold">+</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
