import React from "react";
import { cn } from "@/lib/utils";

export interface ProductFeaturesProps {
  features: string[];
  className?: string;
}

/**
 * PRODUCT FEATURES
 * Adheres to R2 visual system:
 * - Rounded-2xl cards with warm hover
 * - Natural editorial hierarchy
 */
export function ProductFeatures({ features, className }: ProductFeaturesProps) {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-green" />
          <h2 className="text-xs font-sans tracking-wider text-text-primary font-semibold uppercase">
            Engineering &amp; Functional Features
          </h2>
        </div>
        <span className="font-sans text-xs text-text-muted">
          Confirmed Features ·{" "}
          <span className="font-mono">{String(features.length).padStart(2, "0")}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="p-5 bg-surface border border-border/80 rounded-2xl shadow-xs flex items-start gap-3.5 hover:border-brand-green/40 transition-colors"
          >
            <span
              aria-hidden="true"
              className="mt-0.5 font-mono text-xs text-brand-green font-semibold shrink-0 px-2 py-0.5 rounded-full bg-brand-green/10 border border-brand-green/20"
            >
              {String(idx + 1).padStart(2, "0")}
            </span>
            <p className="text-sm font-sans text-text-secondary leading-[1.6]">
              {feat}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
