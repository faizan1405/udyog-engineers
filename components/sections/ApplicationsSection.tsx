"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trees,
  Eye,
  Navigation,
  Compass,
  CloudSun,
  Shield,
  Search,
  Mountain,
  ArrowRight,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { PRECISION_EASE, DURATION } from "@/lib/motion";

interface ApplicationDomain {
  id: string;
  index: string;
  title: string;
  shortScope: string;
  fieldPurpose: string;
  icon: LucideIcon;
  primaryCategories: { name: string; slug: string }[];
  environmentalContext: string[];
  coordinateRef: string;
  elevationRef: string;
}

const APPLICATION_DOMAINS: ApplicationDomain[] = [
  {
    id: "forestry",
    index: "01",
    title: "Forestry",
    shortScope: "Field observation, measurement and environmental work.",
    fieldPurpose:
      "Equipment selected for forest resource observation, timber measurement, boundary reference, and field studies in woodland environments.",
    icon: Trees,
    primaryCategories: [
      { name: "Forestry Items", slug: "forestry-items" },
      { name: "Optics", slug: "optics" },
      { name: "GPS", slug: "gps" },
    ],
    environmentalContext: [
      "Woodland & canopy terrain",
      "Steep gradient timber areas",
      "High ambient moisture environments",
    ],
    coordinateRef: "FIELD REF // APP-01",
    elevationRef: "DEPLOYMENT CONTEXT // FIELD",
  },
  {
    id: "wildlife",
    index: "02",
    title: "Wildlife",
    shortScope: "Fauna monitoring, habitat observation, and field study applications.",
    fieldPurpose:
      "Optical and thermal instruments suited for wildlife observation, nocturnal habitat monitoring, and non-invasive field studies.",
    icon: Eye,
    primaryCategories: [
      { name: "Night Vision", slug: "night-vision" },
      { name: "Thermal", slug: "thermal" },
      { name: "Optics", slug: "optics" },
    ],
    environmentalContext: [
      "Nocturnal observation environments",
      "Remote reserve & sanctuary locations",
      "Variable field lighting conditions",
    ],
    coordinateRef: "FIELD REF // APP-02",
    elevationRef: "DEPLOYMENT CONTEXT // FIELD",
  },
  {
    id: "survey",
    index: "03",
    title: "Survey",
    shortScope: "Positioning, measurement and field survey applications.",
    fieldPurpose:
      "Instruments used for topographical mapping, land boundary reference, civil alignment, and coordinate capture across field locations.",
    icon: Navigation,
    primaryCategories: [
      { name: "GPS", slug: "gps" },
      { name: "Geological Compass", slug: "geological-compass" },
      { name: "Optics", slug: "optics" },
    ],
    environmentalContext: [
      "Open field & direct sun conditions",
      "Benchmark & control point reference",
      "Variable topographical surfaces",
    ],
    coordinateRef: "FIELD REF // APP-03",
    elevationRef: "DEPLOYMENT CONTEXT // FIELD",
  },
  {
    id: "geological-research",
    index: "04",
    title: "Geological Research",
    shortScope: "Stratigraphic mapping, outcrop analysis, and structural field geology.",
    fieldPurpose:
      "Compasses, inclinometers, and field optics for rock stratum characterization, strike and dip measurement, and geological site surveys.",
    icon: Compass,
    primaryCategories: [
      { name: "Geological Compass", slug: "geological-compass" },
      { name: "Optics", slug: "optics" },
      { name: "GPS", slug: "gps" },
    ],
    environmentalContext: [
      "Exposed rock & stratum outcrops",
      "Mountainous & remote formations",
      "Field strike & dip recording",
    ],
    coordinateRef: "FIELD REF // APP-04",
    elevationRef: "DEPLOYMENT CONTEXT // FIELD",
  },
  {
    id: "environmental-monitoring",
    index: "05",
    title: "Environmental Monitoring",
    shortScope: "Monitoring and field data collection applications.",
    fieldPurpose:
      "Sensing arrays and weather logging equipment for baseline environmental assessment, microclimate tracking, and ecological studies.",
    icon: CloudSun,
    primaryCategories: [
      { name: "Weather Station", slug: "weather-station" },
      { name: "GPS", slug: "gps" },
      { name: "Camping Equipment", slug: "camping-equipment" },
    ],
    environmentalContext: [
      "Outdoor exposure conditions",
      "Continuous field recording setups",
      "Remote microclimate stations",
    ],
    coordinateRef: "FIELD REF // APP-05",
    elevationRef: "DEPLOYMENT CONTEXT // FIELD",
  },
  {
    id: "security",
    index: "06",
    title: "Security",
    shortScope: "Perimeter observation, night monitoring, and site surveillance.",
    fieldPurpose:
      "Thermal and optical instrumentation suited for site monitoring, perimeter observation, and night viewing requirements.",
    icon: Shield,
    primaryCategories: [
      { name: "Thermal", slug: "thermal" },
      { name: "Night Vision", slug: "night-vision" },
      { name: "Optics", slug: "optics" },
    ],
    environmentalContext: [
      "Night & low-visibility settings",
      "Perimeter line-of-sight monitoring",
      "Stationary & patrol deployments",
    ],
    coordinateRef: "FIELD REF // APP-06",
    elevationRef: "DEPLOYMENT CONTEXT // FIELD",
  },
  {
    id: "field-research",
    index: "07",
    title: "Field Research",
    shortScope: "Expedition fieldwork, ecological transects, and botanical studies.",
    fieldPurpose:
      "Portable field instruments supporting scientific researchers, specimen documentation, and baseline field data collection.",
    icon: Search,
    primaryCategories: [
      { name: "Optics", slug: "optics" },
      { name: "GPS", slug: "gps" },
      { name: "Forestry Items", slug: "forestry-items" },
    ],
    environmentalContext: [
      "Backcountry research stations",
      "On-site manual data collection",
      "Diverse ecological habitats",
    ],
    coordinateRef: "FIELD REF // APP-07",
    elevationRef: "DEPLOYMENT CONTEXT // FIELD",
  },
  {
    id: "outdoor-operations",
    index: "08",
    title: "Outdoor Operations",
    shortScope: "Harsh-terrain expeditions, remote camps, and outdoor team support.",
    fieldPurpose:
      "Shelters, field equipment, and support gear for survey crews and technical teams operating in remote outdoor environments.",
    icon: Mountain,
    primaryCategories: [
      { name: "Camping Equipment", slug: "camping-equipment" },
      { name: "Weather Station", slug: "weather-station" },
      { name: "GPS", slug: "gps" },
    ],
    environmentalContext: [
      "Remote backcountry locations",
      "Off-grid operational setups",
      "Exposure to outdoor elements",
    ],
    coordinateRef: "FIELD REF // APP-08",
    elevationRef: "DEPLOYMENT CONTEXT // FIELD",
  },
];

/**
 * APPLICATIONS & INDUSTRIES SECTION (PHASE 4C)
 *
 * Answers: "Where can this equipment be used?"
 * An editorial and technical dossier pairing a structured application index
 * with an expansive technical deployment profile.
 *
 * Avoids generic icon grids and unverified customer claims.
 */
export function ApplicationsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeDomain = APPLICATION_DOMAINS[selectedIndex];
  const ActiveIcon = activeDomain.icon;

  return (
    <section
      id="applications"
      aria-labelledby="applications-heading"
      className="relative bg-background border-t border-border py-16 md:py-24 overflow-hidden"
    >
      <Container>
        {/* Section Registration Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-border">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-accent-secondary tracking-wider uppercase mb-2">
              <span className="font-semibold">04 // APPLICATIONS &amp; ENVIRONMENTS</span>
              <span className="text-border-strong">|</span>
              <span className="text-text-muted">DEPLOYMENT DOMAINS</span>
            </div>
            <h2
              id="applications-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary font-display"
            >
              Selected for Demanding Field Environments
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="font-sans text-sm text-text-secondary max-w-md leading-relaxed">
              Technical instrumentation selected for rugged terrains, remote fieldwork, ecological monitoring, and precision geodetic measurement.
            </p>
          </div>
        </div>

        {/* =========================================================================
            MOBILE TAB BAR (< 1024px)
            Clean, horizontally scrollable tabs with clear active state
           ========================================================================= */}
        <div className="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto scrollbar-none flex gap-2">
          {APPLICATION_DOMAINS.map((domain, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-[2px] border text-xs font-mono transition-colors min-h-[44px]",
                  isSelected
                    ? "bg-accent text-white border-accent font-semibold"
                    : "bg-surface border-border text-text-secondary hover:border-accent-secondary"
                )}
                aria-selected={isSelected}
                role="tab"
              >
                <span className={isSelected ? "text-accent-secondary-muted" : "text-accent-secondary"}>
                  {domain.index}
                </span>
                <span>{domain.title}</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            EDITORIAL SPLIT-SCREEN LAYOUT
            Left (5 cols): Architectural Vertical Index
            Right (7 cols): Active Technical Deployment Dossier
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Application Index (Desktop) */}
          <div
            role="tablist"
            aria-label="Application Domains"
            className="hidden lg:flex flex-col border border-border bg-surface rounded-[2px] overflow-hidden lg:col-span-5"
          >
            <div className="px-5 py-3 border-b border-border bg-surface-secondary/40 flex items-center justify-between text-[11px] font-mono text-text-muted">
              <span>INDEX // 08 DOMAINS</span>
              <span>SELECT TO INSPECT</span>
            </div>

            <div className="divide-y divide-border-subtle">
              {APPLICATION_DOMAINS.map((domain, index) => {
                const isSelected = index === selectedIndex;
                const IconComponent = domain.icon;

                return (
                  <button
                    key={domain.id}
                    role="tab"
                    id={`tab-${domain.id}`}
                    aria-selected={isSelected}
                    aria-controls={`panel-${domain.id}`}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className={cn(
                      "w-full text-left p-4.5 transition-all flex items-start gap-3.5 group relative",
                      isSelected
                        ? "bg-surface-secondary/80 border-l-[3px] border-l-accent"
                        : "hover:bg-surface-secondary/30 border-l-[3px] border-l-transparent"
                    )}
                  >
                    <span
                      className={cn(
                        "font-mono text-xs font-semibold shrink-0 mt-0.5",
                        isSelected ? "text-accent font-bold" : "text-accent-secondary"
                      )}
                    >
                      {domain.index}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={cn(
                            "font-display font-semibold text-sm transition-colors",
                            isSelected
                              ? "text-text-primary font-bold"
                              : "text-text-primary group-hover:text-accent"
                          )}
                        >
                          {domain.title}
                        </span>
                        <IconComponent
                          className={cn(
                            "w-4 h-4 shrink-0 transition-colors",
                            isSelected ? "text-accent" : "text-text-muted group-hover:text-text-secondary"
                          )}
                        />
                      </div>
                      <p className="font-sans text-xs text-text-secondary mt-1 line-clamp-1 leading-relaxed">
                        {domain.shortScope}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Active Technical Deployment Dossier */}
          <div
            id={`panel-${activeDomain.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeDomain.id}`}
            className="lg:col-span-7 flex flex-col border border-border bg-surface rounded-[2px] overflow-hidden shadow-[0_1px_3px_rgba(20,23,21,0.03)]"
          >
            {/* Dossier Header Bar */}
            <div className="p-4 sm:p-5 border-b border-border bg-surface-secondary/40 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-text-primary font-semibold tracking-wider uppercase">
                  DEPLOYMENT DOSSIER // {activeDomain.index}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-text-muted">
                <span>{activeDomain.coordinateRef}</span>
                <span className="text-border-strong">|</span>
                <span className="text-accent-secondary font-medium">{activeDomain.elevationRef}</span>
              </div>
            </div>

            {/* Dossier Content Body */}
            <motion.div
              key={activeDomain.id}
              initial={{
                opacity: shouldReduceMotion ? 1 : 0,
                y: shouldReduceMotion ? 0 : 6,
              }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : DURATION.standard,
                ease: PRECISION_EASE,
              }}
              className="p-6 sm:p-8 space-y-6"
            >
              {/* Title & Icon Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-accent-secondary font-medium">
                    APPLICATION SECTOR
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-text-primary mt-1">
                    {activeDomain.title}
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-[2px] bg-surface-secondary border border-border-subtle flex items-center justify-center shrink-0">
                  <ActiveIcon className="w-6 h-6 text-accent" />
                </div>
              </div>

              {/* Field Purpose Statement */}
              <div className="border-l-2 border-accent-secondary pl-4 py-1">
                <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed">
                  {activeDomain.fieldPurpose}
                </p>
              </div>

              {/* Technical Pedestal / Plate */}
              <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full rounded-[2px] bg-surface-secondary/60 border border-border-subtle flex flex-col justify-between p-4 overflow-hidden">
                {/* 4 Corner Registration Crosshairs */}
                <span
                  aria-hidden="true"
                  className="absolute top-2 left-2 font-mono text-[10px] text-accent-secondary/50 select-none leading-none"
                >
                  +
                </span>
                <span
                  aria-hidden="true"
                  className="absolute top-2 right-2 font-mono text-[10px] text-accent-secondary/50 select-none leading-none"
                >
                  +
                </span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-2 left-2 font-mono text-[10px] text-accent-secondary/50 select-none leading-none"
                >
                  +
                </span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-2 right-2 font-mono text-[10px] text-accent-secondary/50 select-none leading-none"
                >
                  +
                </span>

                <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono text-text-muted">
                  <span className="uppercase">FIELD STAGING ENVIRONMENT</span>
                  <span>DOC.REF // ENV-{activeDomain.index}</span>
                </div>

                <div className="self-center flex flex-col items-center justify-center text-center py-2">
                  <ActiveIcon className="w-10 h-10 text-accent/40 mb-2" />
                  <span className="font-mono text-xs uppercase tracking-widest text-text-primary font-medium">
                    {activeDomain.title} Operational Profile
                  </span>
                  <span className="text-[11px] font-mono text-text-muted mt-0.5">
                    Instrument Configuration &amp; Deployment Parameters
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono text-text-muted">
                  <span>SCALE: FIELD SCALE 1:1</span>
                  <span>APPLICATION MATRIX // 01–08</span>
                </div>
              </div>

              {/* Two-Column Telemetry: Relevant Categories & Environmental Constraints */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {/* Relevant Disciplines */}
                <div className="p-4 rounded-[2px] border border-border-subtle bg-background">
                  <div className="font-mono text-xs uppercase tracking-wider text-text-primary font-semibold mb-3">
                    Relevant Disciplines
                  </div>
                  <ul className="space-y-2">
                    {activeDomain.primaryCategories.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={`/categories/${cat.slug}`}
                          className="group flex items-center justify-between text-xs text-text-secondary hover:text-accent font-medium py-0.5 transition-colors"
                        >
                          <span>{cat.name}</span>
                          <ArrowRight className="w-3 h-3 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Environmental Constraints */}
                <div className="p-4 rounded-[2px] border border-border-subtle bg-background">
                  <div className="font-mono text-xs uppercase tracking-wider text-text-primary font-semibold mb-3">
                    Field Conditions
                  </div>
                  <ul className="space-y-2">
                    {activeDomain.environmentalContext.map((condition, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-text-secondary leading-snug"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-secondary shrink-0 mt-0.5" />
                        <span>{condition}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="font-mono text-xs text-text-muted">
                  Need equipment for this environment?
                </span>
                <Link
                  href="#inquiry"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-accent text-white font-medium text-xs rounded-[2px] hover:bg-accent-hover transition-colors"
                >
                  <span>Submit Field Requirement</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
