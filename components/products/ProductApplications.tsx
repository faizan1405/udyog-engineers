import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

export interface ProductApplicationsProps {
  applications: string[];
  className?: string;
}

/**
 * TYPICAL APPLICATION CONTEXTS
 * Adheres to R2 visual system:
 * - Rounded-2xl cards with warm hover
 * - Natural editorial hierarchy
 */
export function ProductApplications({
  applications,
  className,
}: ProductApplicationsProps) {
  if (!applications || applications.length === 0) {
    return null;
  }

  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-green" />
          <h2 className="text-xs font-sans tracking-wider text-text-primary font-semibold uppercase">
            Field Deployment · Typical Applications
          </h2>
        </div>
        <span className="font-sans text-xs text-text-muted">
          Applications ·{" "}
          <span className="font-mono">{String(applications.length).padStart(2, "0")}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {applications.map((app, idx) => (
          <div
            key={idx}
            className="p-5 bg-surface border border-border/80 rounded-2xl shadow-xs flex flex-col justify-between hover:border-brand-green/40 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-sans text-text-muted mb-2.5">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20">
                  Application 0{idx + 1}
                </span>
                <span className="text-text-muted">Field Scope</span>
              </div>
              <p className="text-sm sm:text-[15px] font-sans text-text-primary leading-[1.6]">
                {app}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border/70 flex items-center gap-2 text-xs font-sans text-text-secondary">
              <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
              <span>Verified Deployment</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
