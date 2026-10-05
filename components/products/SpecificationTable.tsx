import React from "react";
import { ProductSpecification } from "@/types/product";
import { cn } from "@/lib/utils";

export interface SpecificationTableProps {
  specifications: ProductSpecification[];
  className?: string;
}

/**
 * TECHNICAL SPECIFICATION MATRIX
 *
 * Implements a responsive, precision metrology specification matrix:
 * - Desktop: 2-column calibrated data grid with parameter indexing
 * - Mobile: Stacked, non-overflowing responsive rows with zero horizontal scroll
 * - Strict Light Mode design tokens with hairline row separation
 * - Monospace styling for confirmed values & units
 */
export function SpecificationTable({
  specifications,
  className,
}: SpecificationTableProps) {
  if (!specifications || specifications.length === 0) {
    return (
      <div className="p-4 border border-border bg-surface-secondary/30 rounded-[2px] text-xs text-text-muted italic">
        Technical specifications pending factory verification.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border border-border rounded-[2px] overflow-hidden bg-surface shadow-[0_1px_2px_rgba(20,23,21,0.02)]",
        className
      )}
    >
      {/* Matrix Header (Desktop & Tablet) */}
      <div className="hidden sm:grid sm:grid-cols-12 bg-surface-secondary/80 border-b border-border px-4 py-2.5 text-[11px] font-mono uppercase tracking-wider text-text-secondary">
        <div className="col-span-5 font-semibold">
          Parameter / Metrology Metric
        </div>
        <div className="col-span-7 font-semibold">
          Verified Datasheet Specification
        </div>
      </div>

      {/* Responsive Specification Rows */}
      <dl className="divide-y divide-border m-0">
        {specifications.map((spec, idx) => (
          <div
            key={idx}
            className={cn(
              "grid grid-cols-1 sm:grid-cols-12 px-4 py-3 sm:py-2.5 items-baseline text-xs transition-colors",
              idx % 2 === 0 ? "bg-surface" : "bg-surface-secondary/25"
            )}
          >
            {/* Parameter Label */}
            <dt className="col-span-5 font-medium text-text-secondary pr-4 pb-1 sm:pb-0 flex items-center justify-between sm:block">
              <span className="text-text-primary sm:text-text-secondary font-medium">
                {spec.label}
              </span>
              <span
                aria-hidden="true"
                className="sm:hidden font-mono text-[9px] text-accent-secondary"
              >
                SPEC // {String(idx + 1).padStart(2, "0")}
              </span>
            </dt>

            {/* Confirmed Value */}
            <dd className="col-span-7 font-mono text-xs text-text-primary font-medium [overflow-wrap:anywhere] break-words m-0">
              <span>{spec.value}</span>
              {spec.unit && (
                <span className="text-text-muted ml-1.5 font-sans text-[11px]">
                  {spec.unit}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
