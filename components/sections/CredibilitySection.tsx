import React from "react";
import { Container } from "@/components/ui/Container";

interface CredibilityPillar {
  index: string;
  tag: string;
  title: string;
  description: string;
  highlight: string;
}

const CREDIBILITY_PILLARS: CredibilityPillar[] = [
  {
    index: "01",
    tag: "Knowledge-First",
    title: "Technical Understanding",
    description:
      "Led by qualified technical professionals and scholarly leadership, ensuring each requirement is analyzed with sound engineering knowledge and rigorous application assessment.",
    highlight: "Engineering Grounding",
  },
  {
    index: "02",
    tag: "Verified Standards",
    title: "Quality-Focused Selection",
    description:
      "We partner with reputed national and international manufacturers, identifying equipment built to exact tolerances, high reliability, and dependable field durability.",
    highlight: "Reputed Brands",
  },
  {
    index: "03",
    tag: "Complete Solutions",
    title: "Application-Oriented Solutions",
    description:
      "Supplying an instrument is never enough. We identify the exact operational context and deliver the proper complete solution based on performance and long-term value.",
    highlight: "Purpose-Built",
  },
  {
    index: "04",
    tag: "Institutional Service",
    title: "Professional Coordination",
    description:
      "Responsive coordination and technical documentation for Government Departments, PSUs, research institutes, and demanding industrial procurement teams.",
    highlight: "Direct Guidance",
  },
  {
    index: "05",
    tag: "Enduring Trust",
    title: "Reliable Support & Integrity",
    description:
      "Committed to building long-term customer partnerships based on transparent guidance, reliable performance, and dependable technical assistance.",
    highlight: "Partnership Value",
  },
];

/**
 * CREDIBILITY / WHY CHOOSE UDYOG ENGINEERS SECTION
 *
 * Modern editorial credibility presentation grounded in verified client positioning.
 * Avoids corporate brags, fake statistics, or unverified claims.
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
            <div className="flex items-center gap-2 font-sans text-xs text-accent-secondary mb-3 font-medium">
              <span className="font-mono font-semibold">05</span>
              <span>·</span>
              <span className="font-semibold text-accent-secondary">Why Udyog Engineers</span>
              <span className="text-border-strong">·</span>
              <span className="text-text-muted">Core Capabilities</span>
            </div>
            <h2
              id="credibility-heading"
              className="text-[30px] sm:text-[36px] md:text-[42px] lg:text-[50px] font-display font-semibold tracking-[-0.035em] leading-[1.06] text-text-primary max-w-2xl"
            >
              Bridging Advanced Technology with Practical Application
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-base sm:text-lg text-text-secondary leading-[1.6]">
              A professionally managed organization providing reliable, technically sound, and application-oriented solutions across India.
            </p>
          </div>
        </div>

        {/* Editorial Modern Composition: 2 Feature Cards + 3 Supporting Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CREDIBILITY_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.index}
              className={`p-7 sm:p-8 rounded-2xl border bg-surface-secondary/40 hover:bg-surface border-border hover:border-accent-primary/40 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                idx === 0 ? "lg:col-span-2 bg-gradient-to-br from-surface to-surface-secondary/60" : ""
              }`}
            >
              {/* Subtle top accent line on hover */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent via-accent-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-xs font-semibold text-accent-secondary bg-surface px-2.5 py-1 rounded-full border border-border-subtle">
                    {pillar.index} / 05
                  </span>
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-accent">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-xl sm:text-2xl text-text-primary mb-3 tracking-[-0.02em]">
                  {pillar.title}
                </h3>

                <p className="font-sans text-sm sm:text-[15px] text-text-secondary leading-[1.65]">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between text-xs font-sans text-text-muted">
                <span>{pillar.highlight}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary/50 group-hover:bg-accent transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Footnote statement */}
        <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans text-text-muted">
          <div className="flex items-center gap-2">
            <span className="text-accent-secondary font-semibold">Udyog Engineers</span>
            <span>·</span>
            <span className="text-text-secondary">Professionally Managed Engineering Partner</span>
          </div>
          <div className="text-text-secondary">
            Serving Government, PSU, institutional research, and industrial sectors.
          </div>
        </div>
      </Container>
    </section>
  );
}
