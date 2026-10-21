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
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { cn, assetPath } from "@/lib/utils";
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
  imageSrc: string;
  imageAlt: string;
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
      { name: "Camera Trap", slug: "camera-trap" },
      { name: "Optics", slug: "optics" },
      { name: "GPS", slug: "gps" },
    ],
    environmentalContext: [
      "Woodland & canopy terrain",
      "Steep gradient timber areas",
      "High ambient moisture environments",
    ],
    coordinateRef: "Field Ref · App-01",
    elevationRef: "Deployment Context · Field",
    imageSrc: "/images/generated/home/environments/environment-forestry.webp",
    imageAlt: "Forestry resource observation and timber measurement environment",
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
    coordinateRef: "Field Ref · App-02",
    elevationRef: "Deployment Context · Field",
    imageSrc: "/images/generated/home/environments/environment-wildlife.webp",
    imageAlt: "Wildlife observation and fauna monitoring habitat environment",
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
      { name: "Geological Equipment", slug: "geological-equipment" },
      { name: "Optics", slug: "optics" },
    ],
    environmentalContext: [
      "Open field & direct sun conditions",
      "Benchmark & control point reference",
      "Variable topographical surfaces",
    ],
    coordinateRef: "Field Ref · App-03",
    elevationRef: "Deployment Context · Field",
    imageSrc: "/images/generated/home/environments/environment-survey.webp",
    imageAlt: "Topographical surveying and geodetic coordinate capture outdoor environment",
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
      { name: "Geological Equipment", slug: "geological-equipment" },
      { name: "Optics", slug: "optics" },
      { name: "GPS", slug: "gps" },
    ],
    environmentalContext: [
      "Exposed rock & stratum outcrops",
      "Mountainous & remote formations",
      "Field strike & dip recording",
    ],
    coordinateRef: "Field Ref · App-04",
    elevationRef: "Deployment Context · Field",
    imageSrc: "/images/generated/home/environments/environment-geological.webp",
    imageAlt: "Geological stratigraphic mapping and rock outcrop field research environment",
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
    coordinateRef: "Field Ref · App-05",
    elevationRef: "Deployment Context · Field",
    imageSrc: "/images/generated/home/environments/environment-environmental.webp",
    imageAlt: "Automated meteorological monitoring station in outdoor field conditions",
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
    coordinateRef: "Field Ref · App-06",
    elevationRef: "Deployment Context · Field",
    imageSrc: "/images/generated/home/environments/environment-security.webp",
    imageAlt: "Perimeter observation and electro-optical surveillance field station",
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
      { name: "Camera Trap", slug: "camera-trap" },
    ],
    environmentalContext: [
      "Backcountry research stations",
      "On-site manual data collection",
      "Diverse ecological habitats",
    ],
    coordinateRef: "Field Ref · App-07",
    elevationRef: "Deployment Context · Field",
    imageSrc: "/images/generated/home/environments/environment-field-research.webp",
    imageAlt: "Scientific expedition fieldwork and ecological research deployment",
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
    coordinateRef: "Field Ref · App-08",
    elevationRef: "Deployment Context · Field",
    imageSrc: "/images/generated/home/environments/environment-outdoor.webp",
    imageAlt: "Remote outdoor operations and high-altitude expedition terrain",
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
            <div className="flex items-center gap-2 font-sans text-xs text-accent-secondary mb-2 font-medium">
              <span className="font-mono font-semibold">04</span>
              <span>·</span>
              <span className="font-semibold text-accent-secondary">Operational Domains</span>
              <span className="text-border-strong">·</span>
              <span className="text-text-muted">Field Environments</span>
            </div>
            <h2
              id="applications-heading"
              className="font-display font-semibold text-[30px] sm:text-[36px] md:text-[42px] lg:text-[50px] text-text-primary tracking-[-0.035em] leading-[1.06]"
            >
              Selected for Demanding Field Environments
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="font-sans text-[15px] sm:text-base text-text-secondary max-w-md leading-relaxed">
              Technical instrumentation selected for rugged terrains, remote fieldwork, ecological monitoring, and precision geodetic measurement.
            </p>
          </div>
        </div>

        {/* =========================================================================
            MOBILE TAB BAR (< 1024px)
            Clean, horizontally scrollable tabs with clear active state
           ========================================================================= */}
        {/* =========================================================================
            MOBILE TAB BAR (< 1024px)
            Horizontally scrollable full-bleed photo cards with clear active state
           ========================================================================= */}
        <div className="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto scrollbar-none flex gap-2.5">
          {APPLICATION_DOMAINS.map((domain, index) => {
            const isSelected = index === selectedIndex;
            return (
              <button
                key={domain.id}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "group relative shrink-0 overflow-hidden rounded-xl border p-3 min-w-[145px] sm:min-w-[165px] min-h-[64px] flex flex-col justify-between transition-all duration-300 text-left",
                  isSelected
                    ? "border-accent ring-1 ring-accent shadow-md"
                    : "border-white/20 shadow-2xs"
                )}
                aria-selected={isSelected}
                role="tab"
              >
                {/* LAYER 1: Full-Bleed Environment Photo (z-0) */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={assetPath(domain.imageSrc)}
                    alt=""
                    fill
                    sizes="165px"
                    className="object-cover object-center"
                  />
                </div>

                {/* LAYER 2: Controlled Gradient Overlay (z-10) */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 z-10 transition-opacity duration-300 pointer-events-none",
                    isSelected
                      ? "bg-gradient-to-t from-black/85 via-black/45 to-black/20"
                      : "bg-gradient-to-t from-black/90 via-black/60 to-black/35"
                  )}
                />

                {/* LAYER 3: Content (z-20) */}
                <div className="relative z-20 flex items-center justify-between w-full">
                  <span
                    className={cn(
                      "font-mono text-xs font-bold px-1.5 py-0.5 rounded-sm text-[10px]",
                      isSelected
                        ? "bg-accent text-white"
                        : "bg-black/60 text-accent-secondary border border-white/10"
                    )}
                  >
                    {domain.index}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  )}
                </div>

                <span className="relative z-20 font-display font-semibold text-xs text-white mt-2 truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {domain.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            EDITORIAL SPLIT-SCREEN LAYOUT
            Left (5 cols): Architectural Vertical Photo Index (All 8 Domains)
            Right (7 cols): Active Technical Deployment Dossier
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Application Index (Desktop) — 8 Full-Bleed Photo Cards */}
          <div
            role="tablist"
            aria-label="Application Domains"
            className="hidden lg:flex flex-col gap-2.5 lg:col-span-5"
          >
            <div className="px-1 py-0.5 flex items-center justify-between text-xs font-sans text-text-muted font-medium">
              <span>Deployment Domains (01–08)</span>
              <span>Select to inspect</span>
            </div>

            <div className="flex flex-col gap-2.5">
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
                      "group relative w-full text-left p-3.5 rounded-xl border overflow-hidden transition-all duration-300 flex items-center justify-between min-h-[66px]",
                      isSelected
                        ? "border-accent ring-1 ring-accent shadow-md"
                        : "border-border/80 hover:border-white/40 shadow-2xs"
                    )}
                  >
                    {/* LAYER 1: Full-Bleed Environment Photo (z-0) */}
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <Image
                        src={assetPath(domain.imageSrc)}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className={cn(
                          "object-cover object-center transition-transform duration-500 ease-out",
                          isSelected ? "scale-[1.04]" : "group-hover:scale-[1.04]"
                        )}
                      />
                    </div>

                    {/* LAYER 2: Controlled Gradient Overlay (z-10, photo 65-80% visible) */}
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-0 z-10 transition-opacity duration-300 pointer-events-none",
                        isSelected
                          ? "bg-gradient-to-r from-black/75 via-black/45 to-black/25"
                          : "bg-gradient-to-r from-black/85 via-black/60 to-black/35 group-hover:from-black/75 group-hover:via-black/50 group-hover:to-black/25"
                      )}
                    />

                    {/* Active Brand Accent Bar (z-10) */}
                    {isSelected && (
                      <div
                        aria-hidden="true"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-accent z-10"
                      />
                    )}

                    {/* LAYER 3: Content (z-20) */}
                    <div className="relative z-20 flex items-center gap-3 min-w-0 flex-1 pl-1">
                      <span
                        className={cn(
                          "font-mono text-xs font-bold shrink-0 px-2 py-0.5 rounded-sm backdrop-blur-xs",
                          isSelected
                            ? "bg-accent text-white"
                            : "bg-black/60 text-accent-secondary border border-white/10"
                        )}
                      >
                        {domain.index}
                      </span>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-semibold text-sm text-white truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                            {domain.title}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-white/75 truncate mt-0.5 leading-snug drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                          {domain.shortScope}
                        </p>
                      </div>
                    </div>

                    <div className="relative z-20 flex items-center gap-2 shrink-0 ml-3">
                      {isSelected ? (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent/90 text-white text-[10px] font-mono font-semibold shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          <span>ACTIVE</span>
                        </div>
                      ) : (
                        <IconComponent className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                      )}
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
            <div className="p-4 sm:p-5 border-b border-border bg-surface-secondary/40 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-text-primary font-semibold tracking-wider uppercase">
                  Field Application Context · <span className="font-mono">{activeDomain.index}</span>
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
                  <span className="font-mono text-xs text-accent-secondary font-medium tracking-[0.04em]">
                    Application Sector
                  </span>
                  <h3 className="text-2xl sm:text-[28px] lg:text-[32px] font-semibold font-display text-text-primary mt-1 tracking-[-0.025em] leading-snug">
                    {activeDomain.title}
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-[2px] bg-surface-secondary border border-border-subtle flex items-center justify-center shrink-0">
                  <ActiveIcon className="w-6 h-6 text-accent" />
                </div>
              </div>

              {/* Field Purpose Statement */}
              <div className="border-l-2 border-accent-secondary pl-4 py-1">
                <p className="font-sans text-sm sm:text-[15px] text-text-secondary leading-relaxed">
                  {activeDomain.fieldPurpose}
                </p>
              </div>

              {/* Technical Pedestal / Plate with Full-Container Photography */}
              <div className="group/env relative aspect-[16/8] sm:aspect-[16/7] w-full rounded-[2px] bg-slate-950 border border-border-subtle flex flex-col justify-between p-4 sm:p-5 overflow-hidden shadow-xs">
                {/* 1. Full-Bleed Real-World Application Photography (z-0) */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={assetPath(activeDomain.imageSrc)}
                    alt={activeDomain.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-500 ease-precision group-hover/env:scale-[1.04]"
                  />
                </div>

                {/* 2. Sophisticated Directional Documentary Gradient Overlay (z-10) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/20 transition-opacity duration-300 group-hover/env:opacity-90 pointer-events-none"
                />

                {/* Subtle Brand Accent Line on top edge with hover movement */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-[2px] bg-accent/60 transition-all duration-300 group-hover/env:bg-accent group-hover/env:h-[3px] z-20"
                />

                {/* 4 Corner Registration Crosshairs */}
                <span
                  aria-hidden="true"
                  className="absolute top-2.5 left-2.5 font-mono text-[10px] text-white/60 select-none leading-none z-20"
                >
                  +
                </span>
                <span
                  aria-hidden="true"
                  className="absolute top-2.5 right-2.5 font-mono text-[10px] text-white/60 select-none leading-none z-20"
                >
                  +
                </span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-2.5 left-2.5 font-mono text-[10px] text-white/60 select-none leading-none z-20"
                >
                  +
                </span>
                <span
                  aria-hidden="true"
                  className="absolute bottom-2.5 right-2.5 font-mono text-[10px] text-white/60 select-none leading-none z-20"
                >
                  +
                </span>

                {/* Top Registration Telemetry Bar over photo */}
                <div className="relative z-20 flex flex-wrap items-center justify-between gap-1 text-[11px] font-sans text-white/90">
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-black/50 backdrop-blur-xs border border-white/15">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="uppercase tracking-wider font-semibold">Deployed Environment · {activeDomain.title}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-sm bg-black/40 backdrop-blur-xs border border-white/10 text-white/70">
                    Ref · Env-{activeDomain.index}
                  </span>
                </div>

                {/* Center subtle operational profile title badge */}
                <div className="self-center flex flex-col items-center justify-center text-center py-2 relative z-20 pointer-events-none">
                  <span className="font-sans text-xs uppercase tracking-widest text-white/90 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {activeDomain.title} Field Deployment
                  </span>
                  <span className="text-[11px] font-sans text-white/75 mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    Operational Terrain &amp; In-Situ Hardware Validation
                  </span>
                </div>

                {/* Bottom Telemetry Bar over photo */}
                <div className="relative z-20 flex flex-wrap items-center justify-between gap-1 text-[10px] font-sans text-white/80">
                  <span className="px-2 py-0.5 rounded-sm bg-black/40 backdrop-blur-xs border border-white/10">
                    Scale: Field Scale 1:1
                  </span>
                  <span className="px-2 py-0.5 rounded-sm bg-black/40 backdrop-blur-xs border border-white/10">
                    Environment Profile · {activeDomain.index} of 08
                  </span>
                </div>
              </div>

              {/* Two-Column Telemetry: Relevant Categories & Environmental Constraints */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {/* Relevant Disciplines */}
                <div className="p-4 rounded-[2px] border border-border-subtle bg-background">
                  <div className="font-sans text-xs uppercase tracking-wider text-text-primary font-semibold mb-3">
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
                  <div className="font-sans text-xs uppercase tracking-wider text-text-primary font-semibold mb-3">
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
                <span className="font-sans text-xs text-text-muted">
                  Need equipment for this environment?
                </span>
                <Link
                  href="#inquiry"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-accent text-white font-sans font-semibold text-xs sm:text-[13px] rounded-[2px] hover:bg-accent-hover transition-colors"
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
