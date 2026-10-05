import React from "react";
import { cn } from "@/lib/utils";

export interface ProductFeaturesProps {
  features: string[];
  className?: string;
}

/**
 * PRODUCT FEATURES
 *
 * Renders verified equipment engineering attributes and functional capabilities.
 * Omitted completely if no feature data exists.
 */
export function ProductFeatures({ features, className }: ProductFeaturesProps) {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between border-b border-border pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <h2 className="text-xs font-mono uppercase tracking-wider text-text-primary font-semibold">
            ENGINEERING {"//"} FUNCTIONAL FEATURES
          </h2>
        </div>
        <span className="font-mono text-[10px] text-text-muted">
          VERIFIED ATTRIBUTES {"//"}{" "}
          {String(features.length).padStart(2, "0")}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="p-4 bg-surface border border-border rounded-[2px] shadow-[0_1px_2px_rgba(20,23,21,0.02)] flex items-start gap-3"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 font-mono text-[10px] text-accent-secondary font-semibold shrink-0"
            >
              [{String(idx + 1).padStart(2, "0")}]
            </span>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              {feat}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
