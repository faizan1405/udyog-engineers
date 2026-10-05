import React from "react";
import { Container } from "@/components/ui/Container";

interface CredibilityPillar {
  index: string;
  tag: string;
  title: string;
  description: string;
  specificationNote: string;
}

const CREDIBILITY_PILLARS: CredibilityPillar[] = [
  {
    index: "01",
    tag: "PORTFOLIO FOCUS",
    title: "Specialist Equipment Focus",
    description:
      "Every discipline in our catalogue—from optical instruments and GNSS receivers to geological compasses—is curated strictly for professional survey, research, and field deployment.",
    specificationNote: "PROFESSIONAL CATALOGUE FOCUS",
  },
  {
    index: "02",
    tag: "SPECIFICATION CLARITY",
    title: "Clear Product Information",
    description:
      "Equipment specifications are organized around optical parameters, sensor ratings, and physical environmental characteristics to assist objective technical evaluation.",
    specificationNote: "STRUCTURED SPECIFICATIONS",
  },
  {
    index: "03",
    tag: "INQUIRY COORDINATION",
    title: "Requirement-Based Inquiry",
    description:
      "We operate through a direct, requirement-driven inquiry model. Field specialists and research teams receive responsive guidance tailored to project parameters.",
    specificationNote: "DIRECT SPECIFICATION MATCHING",
  },
  {
    index: "04",
    tag: "CATEGORY STRUCTURE",
    title: "Requirement-Oriented Selection",
    description:
      "Equipment categories organised around professional field, survey, observation and monitoring requirements.",
    specificationNote: "SPECIALIST CATEGORY STRUCTURE",
  },
];

/**
 * CREDIBILITY / WHY CHOOSE UDYOG ENGINEERS SECTION (PHASE 4C)
 *
 * Architectural credibility section grounded in positioning and capabilities.
 * Avoids corporate brags, fake statistics, unverified client counts, and awards.
 * Uses hairline dividers, monospace indexing, and balanced whitespace.
 */
export function CredibilitySection() {
  return (
    <section
      id="credibility"
      aria-labelledby="credibility-heading"
      className="relative bg-surface border-t border-border py-16 md:py-24 overflow-hidden"
    >
      <Container>
        {/* Section Registration Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-12 border-b border-border">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-accent-secondary tracking-wider uppercase mb-2">
              <span className="font-semibold">05 // WHY UDYOG ENGINEERS</span>
              <span className="text-border-strong">|</span>
              <span className="text-text-muted">POSITIONING &amp; PRINCIPLES</span>
            </div>
            <h2
              id="credibility-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary font-display max-w-2xl leading-tight"
            >
              Equipment Selected Around Professional Field Requirements
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              We focus strictly on precision instrumentation, structured technical information, and direct requirement-driven assistance for surveyors, researchers, and field specialists.
            </p>
          </div>
        </div>

        {/* =========================================================================
            ARCHITECTURAL CREDIBILITY PILLARS MATRIX
            Hairline dividers, monospace indexing, high-contrast typography
           ========================================================================= */}
        <div className="border border-border rounded-[2px] bg-border overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px">
            {CREDIBILITY_PILLARS.map((pillar) => (
              <div
                key={pillar.index}
                className="p-6 sm:p-8 flex flex-col justify-between relative group bg-background hover:bg-surface transition-colors duration-200 ease-precision"
              >
                {/* Corner Crosshair Decoration */}
                <span
                  aria-hidden="true"
                  className="absolute top-2.5 right-2.5 font-mono text-[10px] text-accent-secondary/40 select-none leading-none group-hover:text-accent-secondary transition-colors duration-200 ease-precision"
                >
                  +
                </span>

                <div>
                  {/* Index and Tag */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-sm font-bold text-accent-secondary">
                      {`${pillar.index} // 04`}
                    </span>
                    <span className="font-mono text-[10px] tracking-widest text-text-muted uppercase">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-semibold text-lg text-text-primary mb-3">
                    {pillar.title}
                  </h3>

                  {/* Body Copy */}
                  <p className="font-sans text-xs text-text-secondary leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Technical Note */}
                <div className="mt-8 pt-4 border-t border-border-subtle flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-wider text-text-muted uppercase">
                    {pillar.specificationNote}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/30 group-hover:bg-accent transition-colors duration-200 ease-precision" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Philosophy Footnote */}
        <div className="mt-8 pt-4 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-text-muted">
          <div className="flex items-center gap-2">
            <span className="text-accent-secondary font-bold">UE // PHILOSOPHY</span>
            <span>·</span>
            <span>Direct requirement-driven technical coordination</span>
          </div>
          <div className="text-[11px] text-text-secondary">
            Technical information &amp; specifications provided upon requirement submission.
          </div>
        </div>
      </Container>
    </section>
  );
}
