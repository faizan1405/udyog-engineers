import React from "react";
import { cn } from "@/lib/utils";

export interface ProductApplicationsProps {
  applications: string[];
  className?: string;
}

/**
 * TYPICAL APPLICATION CONTEXTS
 *
 * Implements representative field and operational use contexts.
 * Adheres strictly to non-guarantee wording guidelines:
 * - Uses "Typical application contexts"
 * - Avoids exaggerated marketing claims
 * - Omitted completely if no verified application data exists
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
      <div className="flex items-center justify-between border-b border-border pb-2.5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
          <h2 className="text-xs font-mono uppercase tracking-wider text-text-primary font-semibold">
            FIELD DEPLOYMENT {"//"} TYPICAL APPLICATION CONTEXTS
          </h2>
        </div>
        <span className="font-mono text-[10px] text-text-muted">
          CONTEXT SCOPES {"//"}{" "}
          {String(applications.length).padStart(2, "0")}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {applications.map((app, idx) => (
          <div
            key={idx}
            className="p-4 bg-surface border border-border rounded-[2px] shadow-[0_1px_2px_rgba(20,23,21,0.02)] flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-text-muted mb-2">
              <span className="uppercase text-accent-secondary font-medium">
                CONTEXT {String(idx + 1).padStart(2, "0")}
              </span>
              <span>FIELD SCOPE</span>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
              {app}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
