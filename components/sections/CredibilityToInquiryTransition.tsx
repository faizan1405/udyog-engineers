import React from "react";
import { Container } from "@/components/ui/Container";

/**
 * CREDIBILITY TO INQUIRY TRANSITION (PHASE 4C)
 *
 * Dedicated architectural continuity bridge between:
 * Section 05 (Why Choose Udyog) and Section 06 (Inquiry & Procurement).
 *
 * Leads the visitor from credibility principles to direct requirement submission.
 */
export function CredibilityToInquiryTransition() {
  return (
    <div
      aria-hidden="true"
      className="relative w-full border-t border-border bg-gradient-to-b from-surface via-surface-secondary/20 to-surface-secondary/50 py-6 select-none"
    >
      <Container>
        <div className="flex items-center justify-between text-xs font-sans text-text-muted">
          {/* Left Registration Mark */}
          <div className="flex items-center gap-2">
            <span className="text-accent-secondary font-semibold">+</span>
            <span className="hidden sm:inline text-text-secondary font-medium">
              Principles &amp; Scope (Sec. 05)
            </span>
          </div>

          {/* Center Continuity Rule */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary/60 shrink-0" />
            <span className="font-medium text-text-primary text-[10px] sm:text-[11px] truncate max-w-[220px] sm:max-w-none">
              Continuity · Requirement Coordination
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary/60 shrink-0" />
          </div>

          {/* Right Registration Mark */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline tracking-[0.04em] text-text-secondary">
              Direct Inquiry (Sec. 06)
            </span>
            <span className="text-accent-secondary font-semibold">+</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
