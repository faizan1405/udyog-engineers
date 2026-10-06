import React from "react";
import { ProductSpecification } from "@/types/product";
import { cn } from "@/lib/utils";

export interface SpecificationTableProps {
  specifications: ProductSpecification[];
  className?: string;
}

/**
 * TECHNICAL SPECIFICATION MATRIX
 * Adheres to R2 visual system:
 * - Rounded-2xl container with hairline row separation
 * - Clean DM Sans & Sora typography
 * - Natural editorial labels
 */
export function SpecificationTable({
  specifications,
  className,
}: SpecificationTableProps) {
  if (!specifications || specifications.length === 0) {
    return (
      <div className="p-5 border border-border/80 bg-surface-secondary/40 rounded-2xl text-sm font-sans text-text-muted italic">
        Technical specifications available upon direct inquiry.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "border border-border/80 rounded-2xl overflow-hidden bg-surface shadow-xs",
        className
      )}
    >
      {/* Header */}
      <div className="hidden sm:grid sm:grid-cols-12 bg-surface-secondary/70 border-b border-border/70 px-5 py-3 text-xs font-sans text-text-secondary uppercase tracking-wider">
        <div className="col-span-5 font-semibold">
          Technical Parameter
        </div>
        <div className="col-span-7 font-semibold">
          Specification Value
        </div>
      </div>

      {/* Specification Rows */}
      <dl className="divide-y divide-border/70 m-0 font-sans">
        {specifications.map((spec, idx) => (
          <div
            key={idx}
            className={cn(
              "grid grid-cols-1 sm:grid-cols-12 px-5 py-3.5 items-baseline text-sm transition-colors",
              idx % 2 === 0 ? "bg-surface" : "bg-surface-secondary/25"
            )}
          >
            {/* Parameter Label */}
            <dt className="col-span-5 font-sans font-medium text-text-secondary pr-4 pb-1 sm:pb-0 flex items-center justify-between sm:block">
              <span className="text-text-primary sm:text-text-secondary font-medium">
                {spec.label}
              </span>
              {spec.group && (
                <span className="sm:hidden font-sans text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20">
                  {spec.group}
                </span>
              )}
            </dt>

            {/* Parameter Value */}
            <dd className="col-span-7 font-sans text-text-primary text-sm sm:text-[15px] font-normal leading-relaxed m-0 flex items-center justify-between sm:justify-start gap-3">
              <span>{spec.value}</span>
              {spec.group && (
                <span className="hidden sm:inline-block font-sans text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20 ml-auto">
                  {spec.group}
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
