"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getAllCategories } from "@/data/categories";
import { ProductCategory } from "@/types/category";
import { getCategoryTheme, CategoryVisualTheme } from "@/config/categoryThemes";
import { cn, assetPath } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { PRECISION_EASE, DURATION } from "@/lib/motion";

const CATEGORY_IMAGE_MAP: Record<
  string,
  { src: string; alt: string }
> = {
  optics: {
    src: "/images/generated/categories/category-optics.webp",
    alt: "Precision binoculars and field optical instruments",
  },
  gps: {
    src: "/images/generated/categories/category-gps.webp",
    alt: "Rugged handheld GPS and GNSS field mapping receiver",
  },
  "night-vision": {
    src: "/images/generated/categories/category-night-vision.webp",
    alt: "Professional night vision observation monocular",
  },
  thermal: {
    src: "/images/generated/categories/category-thermal.webp",
    alt: "High-resolution handheld thermal imaging observation monocular",
  },
  "geological-compass": {
    src: "/images/generated/categories/category-geological-compass.webp",
    alt: "Authentic Brunton pocket transit geological compass with sighting mirror",
  },
  "camping-equipment": {
    src: "/images/generated/categories/category-camping-equipment.webp",
    alt: "Durable expedition equipment and field research pack",
  },
  "weather-station": {
    src: "/images/generated/categories/category-weather-station.webp",
    alt: "Compact ultrasonic meteorological weather station sensor",
  },
  "forestry-items": {
    src: "/images/generated/categories/category-forestry-items.webp",
    alt: "Precision forestry measurement caliper and dendrometry tool",
  },
};

/**
 * Photorealistic Product Photography visual component for each of the 8 Categories.
 * Replaces geometric icon/illustration visuals with realistic studio product photography placeholders.
 */
function CategoryArtwork({ slug, className }: { slug: string; className?: string }) {
  const item = CATEGORY_IMAGE_MAP[slug];
  if (!item) return null;

  return (
    <div className={cn("relative w-full h-full", className)}>
      <Image
        src={assetPath(item.src)}
        alt={item.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-contain drop-shadow-[0_12px_24px_rgba(18,32,44,0.14)] select-none"
      />
    </div>
  );
}

/* =========================================================================
   PATTERN A: FEATURE CATEGORY MODULE (Type A — Large Feature)
   Used for 01 Optics (Tier 1) & 05 Geological Compass (Tier 2)
   Rich tinted background, edge accent, generous artwork canvas (45–55%)
   ========================================================================= */
function FeatureCategoryCard({
  category,
  theme,
  revealDirection = "left",
}: {
  category: ProductCategory;
  theme: CategoryVisualTheme;
  revealDirection?: "left" | "right";
}) {
  const shouldReduceMotion = useReducedMotion();

  const maskInitial =
    revealDirection === "left"
      ? "inset(0% 100% 0% 0%)"
      : "inset(0% 0% 0% 100%)";

  return (
    <motion.div
      initial={{
        clipPath: shouldReduceMotion ? "inset(0% 0% 0% 0%)" : maskInitial,
        opacity: shouldReduceMotion ? 1 : 0,
      }}
      whileInView={{
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: 1,
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : DURATION.reveal,
        ease: PRECISION_EASE,
      }}
      className="w-full flex"
    >
      <Link
        href={`/categories/${category.slug}`}
        style={{
          background: `linear-gradient(145deg, ${theme.bgLight} 0%, #FFFFFF 62%)`,
          borderColor: theme.borderLight,
        }}
        className={cn(
          "group relative flex flex-col justify-between w-full rounded-2xl sm:rounded-3xl border p-6 sm:p-8 transition-all duration-300 ease-precision shadow-xs select-none overflow-hidden",
          "hover:shadow-xl hover:-translate-y-1.5"
        )}
      >
        {/* Top Edge Accent Bar in Category Color */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-1.5 transition-opacity duration-300"
          style={{ backgroundColor: theme.accent }}
        />

        {/* Dynamic Color Wash on Hover */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, ${theme.gradientFrom} 0%, transparent 70%)`,
            boxShadow: `inset 0 0 0 1.5px ${theme.accent}`,
          }}
        />

        {/* Content Header: Number + Title + Arrow */}
        <div className="relative z-10 flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="font-mono text-[13px] font-semibold px-2.5 py-0.5 rounded-md"
                style={{ color: theme.accent, backgroundColor: theme.bgLight }}
              >
                {theme.index}
              </span>
              <span className="font-sans text-xs sm:text-[13px] font-medium text-text-muted">
                {theme.tagline}
              </span>
            </div>

            <h3 className="font-display font-semibold text-[24px] sm:text-[28px] lg:text-[32px] text-text-primary mt-1 leading-tight tracking-[-0.03em] group-hover:text-text-primary">
              {category.name}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed max-w-lg">
              {category.shortDescription}
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl border border-border/80 bg-white/90 shadow-2xs flex items-center justify-center shrink-0 transition-all duration-300 ease-precision group-hover:shadow-sm">
            <ArrowRight
              className="w-4 h-4 text-text-secondary transition-transform duration-300 ease-precision group-hover:translate-x-1.5"
              style={{ color: theme.accent }}
            />
          </div>
        </div>

        {/* Dominant Artwork Panel (Enlarged with category-tinted backdrop) */}
        <div
          className="relative z-10 w-full rounded-2xl overflow-hidden my-3 flex items-center justify-center transition-all duration-300 ease-precision border aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] p-3 sm:p-4 shadow-2xs"
          style={{
            backgroundColor: theme.bgLight,
            borderColor: theme.borderLight,
          }}
        >
          {/* Subtle Ambient Halo behind photo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-75 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${theme.accent}20 0%, transparent 70%)`,
            }}
          />
          <div className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-300 ease-precision group-hover:scale-[1.03]">
            <CategoryArtwork slug={category.slug} />
          </div>
        </div>

        {/* Bottom Contextual Application Micro-Labels & Explore Link */}
        <div className="relative z-10 pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {theme.features.slice(0, 2).map((feat, idx) => (
              <span
                key={idx}
                className="text-[11px] font-sans px-2.5 py-0.5 rounded-md bg-white/85 border border-border/80 text-text-secondary font-medium"
              >
                {feat}
              </span>
            ))}
          </div>

          <div
            className="flex items-center gap-1.5 font-sans text-xs sm:text-[13px] font-semibold"
            style={{ color: theme.accent }}
          >
            <span>Explore Discipline</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-precision group-hover:translate-x-1.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* =========================================================================
   PATTERN B: HORIZONTAL CATEGORY MODULE (Type B — Horizontal)
   Used for 02 GPS & 04 Thermal
   Side-by-side content + artwork, tinted background, edge accent
   ========================================================================= */
function HorizontalCategoryCard({
  category,
  theme,
}: {
  category: ProductCategory;
  theme: CategoryVisualTheme;
}) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      style={{
        background: `linear-gradient(135deg, ${theme.bgLight} 0%, #FFFFFF 65%)`,
        borderColor: theme.borderLight,
      }}
      className={cn(
        "group relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between w-full rounded-2xl border p-5 sm:p-6 transition-all duration-300 ease-precision shadow-xs select-none overflow-hidden",
        "hover:shadow-xl hover:-translate-y-1.5"
      )}
    >
      {/* Top Edge Accent Bar in Category Color */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300"
        style={{ backgroundColor: theme.accent }}
      />

      {/* Dynamic Color Wash on Hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${theme.gradientFrom} 0%, transparent 70%)`,
          boxShadow: `inset 0 0 0 1.5px ${theme.accent}`,
        }}
      />

      {/* Content Side */}
      <div className="relative z-10 flex-1 min-w-0 pr-0 sm:pr-4 order-2 sm:order-1">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="font-mono text-[13px] font-semibold px-2 py-0.5 rounded-md"
            style={{ color: theme.accent, backgroundColor: theme.bgLight }}
          >
            {theme.index}
          </span>
          <span className="font-sans text-xs font-medium text-text-muted truncate">
            {theme.tagline}
          </span>
        </div>

        <h3 className="font-display font-semibold text-xl sm:text-[22px] lg:text-[26px] text-text-primary leading-snug tracking-[-0.025em]">
          {category.name}
        </h3>

        <p className="font-sans text-xs sm:text-sm text-text-secondary mt-1 leading-relaxed line-clamp-2">
          {category.shortDescription}
        </p>

        <div
          className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-[13px] font-semibold mt-3.5"
          style={{ color: theme.accent }}
        >
          <span>Explore Discipline</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-precision group-hover:translate-x-1.5" />
        </div>
      </div>

      {/* Artwork Side (Dominant Framing with tinted backdrop) */}
      <div
        className="relative z-10 w-full sm:w-[195px] lg:w-[220px] aspect-[4/3] sm:aspect-[5/4] rounded-xl overflow-hidden flex items-center justify-center p-2.5 sm:p-3 mb-3 sm:mb-0 order-1 sm:order-2 shrink-0 border shadow-2xs"
        style={{ backgroundColor: theme.bgLight, borderColor: theme.borderLight }}
      >
        <div className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-300 ease-precision group-hover:scale-[1.03]">
          <CategoryArtwork slug={category.slug} />
        </div>
      </div>
    </Link>
  );
}

/* =========================================================================
   PATTERN C: COMPACT EDITORIAL MODULE (Type C — Compact Editorial)
   Used for 03 Night Vision & 06 Camping Equipment
   High graphic clarity, clean title, tinted backdrop, 1 safe descriptor line
   ========================================================================= */
function CompactEditorialCard({
  category,
  theme,
}: {
  category: ProductCategory;
  theme: CategoryVisualTheme;
}) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      style={{
        background: `linear-gradient(150deg, ${theme.bgLight} 0%, #FFFFFF 65%)`,
        borderColor: theme.borderLight,
      }}
      className={cn(
        "group relative flex flex-col justify-between w-full rounded-2xl border p-5 sm:p-6 transition-all duration-300 ease-precision shadow-xs select-none overflow-hidden",
        "hover:shadow-xl hover:-translate-y-1.5"
      )}
    >
      {/* Top Edge Accent Bar in Category Color */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300"
        style={{ backgroundColor: theme.accent }}
      />

      {/* Dynamic Color Wash on Hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${theme.gradientFrom} 0%, transparent 70%)`,
          boxShadow: `inset 0 0 0 1.5px ${theme.accent}`,
        }}
      />

      {/* Top Header: Number + Title + Arrow */}
      <div className="relative z-10 flex items-start justify-between gap-3 mb-2">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="font-mono text-[13px] font-semibold tracking-tight"
              style={{ color: theme.accent }}
            >
              {`${theme.index} ·`}
            </span>
            <span className="font-sans text-xs font-medium text-text-muted">
              {theme.tagline}
            </span>
          </div>

          <h3 className="font-display font-semibold text-lg sm:text-[20px] lg:text-[22px] text-text-primary mt-1 tracking-[-0.02em] leading-snug">
            {category.name}
          </h3>
        </div>

        <div className="w-8 h-8 rounded-lg border border-border/80 bg-white/90 shadow-2xs flex items-center justify-center shrink-0">
          <ArrowRight
            className="w-3.5 h-3.5 text-text-secondary transition-transform duration-300 ease-precision group-hover:translate-x-1.5"
            style={{ color: theme.accent }}
          />
        </div>
      </div>

      {/* Artwork Canvas */}
      <div
        className="relative z-10 w-full rounded-xl overflow-hidden my-2.5 flex items-center justify-center border aspect-[4/3] sm:aspect-[16/11] p-2.5 sm:p-3 shadow-2xs"
        style={{ backgroundColor: theme.bgLight, borderColor: theme.borderLight }}
      >
        <div className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-300 ease-precision group-hover:scale-[1.03]">
          <CategoryArtwork slug={category.slug} />
        </div>
      </div>

      {/* Bottom 1-line safe descriptor */}
      <div className="relative z-10 pt-2 flex items-center justify-between text-xs text-text-secondary">
        <span className="font-sans line-clamp-1">{category.shortDescription}</span>
        <span
          className="font-sans text-xs font-semibold flex items-center gap-1 shrink-0 ml-2"
          style={{ color: theme.accent }}
        >
          View →
        </span>
      </div>
    </Link>
  );
}

/* =========================================================================
   PATTERN D: IMAGE-LED MODULE (Type D — Image-Led)
   Used for 07 Weather Station & 08 Forestry Items
   Artwork first, clean category title + short descriptor below
   ========================================================================= */
function ImageLedCategoryCard({
  category,
  theme,
}: {
  category: ProductCategory;
  theme: CategoryVisualTheme;
}) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      style={{
        background: `linear-gradient(150deg, ${theme.bgLight} 0%, #FFFFFF 65%)`,
        borderColor: theme.borderLight,
      }}
      className={cn(
        "group relative flex flex-col justify-between w-full rounded-2xl border p-5 sm:p-6 transition-all duration-300 ease-precision shadow-xs select-none overflow-hidden",
        "hover:shadow-xl hover:-translate-y-1.5"
      )}
    >
      {/* Top Edge Accent Bar in Category Color */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300"
        style={{ backgroundColor: theme.accent }}
      />

      {/* Dynamic Color Wash on Hover */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${theme.gradientFrom} 0%, transparent 70%)`,
          boxShadow: `inset 0 0 0 1.5px ${theme.accent}`,
        }}
      />

      {/* Prominent Full-Width Visual First */}
      <div
        className="relative z-10 w-full rounded-xl overflow-hidden mb-3.5 flex items-center justify-center border aspect-[4/3] sm:aspect-[16/11] p-2.5 sm:p-3 shadow-2xs"
        style={{ backgroundColor: theme.bgLight, borderColor: theme.borderLight }}
      >
        <div className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-300 ease-precision group-hover:scale-[1.03]">
          <CategoryArtwork slug={category.slug} />
        </div>
      </div>

      {/* Content Area Below */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-1">
          <span
            className="font-mono text-[13px] font-semibold"
            style={{ color: theme.accent }}
          >
            {theme.index}
          </span>
          <ArrowRight
            className="w-3.5 h-3.5 text-text-muted transition-transform duration-300 ease-precision group-hover:translate-x-1.5"
            style={{ color: theme.accent }}
          />
        </div>

        <h3 className="font-display font-semibold text-lg sm:text-[20px] lg:text-[22px] text-text-primary tracking-[-0.02em] leading-snug">
          {category.name}
        </h3>

        <p className="font-sans text-xs sm:text-sm text-text-secondary mt-1 line-clamp-2 leading-relaxed">
          {category.shortDescription}
        </p>
      </div>
    </Link>
  );
}

/**
 * CATEGORY SHOWCASE — REDESIGN R1.2
 *
 * Rich editorial showcase featuring 4 distinct visual module patterns (Type A, B, C, D):
 * - Tinted module backgrounds and larger color fields for high category identity from a distance
 * - Top edge accents in category colors
 * - Unnecessary micro-labels removed for clean information density
 * - Safe, neutral, verified category copy only
 * - Verified visible animations: Optics enters from left, GPS/Night Vision enters from right,
 *   Geological Compass mask reveal from right, Thermal from left, remaining cards restrained up reveals.
 */
export function CategoryShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const categories = getAllCategories();

  const cat1 = categories.find((c) => c.order === 1) || categories[0];
  const cat2 = categories.find((c) => c.order === 2) || categories[1];
  const cat3 = categories.find((c) => c.order === 3) || categories[2];
  const cat4 = categories.find((c) => c.order === 4) || categories[3];
  const cat5 = categories.find((c) => c.order === 5) || categories[4];
  const cat6 = categories.find((c) => c.order === 6) || categories[5];
  const cat7 = categories.find((c) => c.order === 7) || categories[6];
  const cat8 = categories.find((c) => c.order === 8) || categories[7];

  return (
    <section
      id="equipment-categories"
      aria-label="Equipment Categories Portfolio"
      className="relative bg-surface-cool border-t border-border/80 py-16 md:py-24 overflow-hidden"
    >
      {/* Rich Sophisticated Atmosphere: Soft Blue-Grey base + subtle teal radial gradient + warm accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
      >
        {/* Soft Teal Radial Gradient (Top-Right) */}
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full bg-teal-500/5 blur-3xl" />
        {/* Warm Subtle Accent near Earth/Geological modules (Center-Left) */}
        <div className="absolute top-1/2 -left-20 w-[550px] h-[550px] rounded-full bg-amber-500/5 blur-3xl" />
        {/* Subtle Brand Green Presence (Bottom-Right) */}
        <div className="absolute -bottom-20 right-10 w-[500px] h-[500px] rounded-full bg-brand-green/4 blur-3xl" />
      </div>

      <Container>
        {/* Section Registration Header with Upward Reveal */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: shouldReduceMotion ? 0 : DURATION.reveal, ease: PRECISION_EASE }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-8 mb-12 border-b border-border/80"
        >
          <div>
            <div className="flex items-center gap-2 font-sans text-xs text-brand-green mb-2 font-medium">
              <span className="w-2 h-2 rounded-full bg-brand-green" />
              <span>Equipment Disciplines</span>
              <span className="text-border-strong">·</span>
              <span className="text-text-muted">8 Specializations</span>
            </div>
            <h2 className="font-display font-semibold text-[30px] sm:text-[36px] md:text-[42px] lg:text-[50px] text-text-primary tracking-[-0.035em] leading-[1.06]">
              Curated Equipment Portfolios
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="font-sans text-[15px] sm:text-base text-text-secondary max-w-md leading-relaxed">
              Specialized field instrumentation categorized across eight core disciplines for survey, optical observation, and precision measurement.
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-lg font-sans text-xs sm:text-[13px] font-semibold text-white bg-brand-green hover:bg-brand-green-hover shadow-xs transition-colors shrink-0 self-start sm:self-auto"
            >
              <span>View All 8 Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* =========================================================================
            DESKTOP EDITORIAL GRID (>= 1024px)
            Rhythm:
            - Tier 1: Pattern A (01 Optics, 7 cols) + Pattern B (02 GPS) & Pattern C (03 Night Vision, 5 cols)
            - Tier 2: Pattern B (04 Thermal, 5 cols) + Pattern A (05 Geological Compass, 7 cols)
            - Tier 3: Pattern C (06 Camping, 4 cols) + Pattern D (07 Weather, 4 cols) + Pattern D (08 Forestry, 4 cols)
           ========================================================================= */}
        <div className="hidden lg:flex flex-col gap-8">
          {/* --- TIER 1: Optics Feature (7, enters from left) + GPS / Night Vision Stack (5, enters from right) --- */}
          <div className="grid grid-cols-12 gap-8 items-stretch">
            {/* 01 Optics (Type A Feature Card with Mask Reveal from Left) */}
            <div className="col-span-7 flex">
              <FeatureCategoryCard
                category={cat1}
                theme={getCategoryTheme(cat1.slug)}
                revealDirection="left"
              />
            </div>

            {/* GPS (02, Type B) & Night Vision (03, Type C) Stack (Enters from right) */}
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: shouldReduceMotion ? 0 : DURATION.reveal, ease: PRECISION_EASE }}
              className="col-span-5 flex flex-col gap-6 justify-between"
            >
              <HorizontalCategoryCard
                category={cat2}
                theme={getCategoryTheme(cat2.slug)}
              />
              <CompactEditorialCard
                category={cat3}
                theme={getCategoryTheme(cat3.slug)}
              />
            </motion.div>
          </div>

          {/* --- TIER 2: Thermal (5, enters from left) + Geological Compass Feature (7, mask reveal from right) --- */}
          <div className="grid grid-cols-12 gap-8 items-stretch">
            {/* 04 Thermal (Type B Horizontal Card, enters from left) */}
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, x: shouldReduceMotion ? 0 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: shouldReduceMotion ? 0 : DURATION.reveal, ease: PRECISION_EASE }}
              className="col-span-5 flex"
            >
              <HorizontalCategoryCard
                category={cat4}
                theme={getCategoryTheme(cat4.slug)}
              />
            </motion.div>

            {/* 05 Geological Compass (Type A Feature Card with Mask Reveal from Right) */}
            <div className="col-span-7 flex">
              <FeatureCategoryCard
                category={cat5}
                theme={getCategoryTheme(cat5.slug)}
                revealDirection="right"
              />
            </div>
          </div>

          {/* --- TIER 3: Camping (4) + Weather Station (4) + Forestry Items (4) with Staggered Up Reveals --- */}
          <div className="grid grid-cols-12 gap-8 items-stretch">
            {/* 06 Camping (Type C Compact Editorial) */}
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: shouldReduceMotion ? 0 : DURATION.reveal, ease: PRECISION_EASE, delay: 0 }}
              className="col-span-4 flex"
            >
              <CompactEditorialCard
                category={cat6}
                theme={getCategoryTheme(cat6.slug)}
              />
            </motion.div>

            {/* 07 Weather Station (Type D Image-Led) */}
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: shouldReduceMotion ? 0 : DURATION.reveal, ease: PRECISION_EASE, delay: 0.08 }}
              className="col-span-4 flex"
            >
              <ImageLedCategoryCard
                category={cat7}
                theme={getCategoryTheme(cat7.slug)}
              />
            </motion.div>

            {/* 08 Forestry Items (Type D Image-Led) */}
            <motion.div
              initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: shouldReduceMotion ? 0 : DURATION.reveal, ease: PRECISION_EASE, delay: 0.16 }}
              className="col-span-4 flex"
            >
              <ImageLedCategoryCard
                category={cat8}
                theme={getCategoryTheme(cat8.slug)}
              />
            </motion.div>
          </div>
        </div>

        {/* =========================================================================
            TABLET VIEW (768px – 1023px): Varied 2-Column Grid
           ========================================================================= */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
          <FeatureCategoryCard category={cat1} theme={getCategoryTheme(cat1.slug)} />
          <FeatureCategoryCard category={cat5} theme={getCategoryTheme(cat5.slug)} />
          <HorizontalCategoryCard category={cat2} theme={getCategoryTheme(cat2.slug)} />
          <HorizontalCategoryCard category={cat4} theme={getCategoryTheme(cat4.slug)} />
          <CompactEditorialCard category={cat3} theme={getCategoryTheme(cat3.slug)} />
          <CompactEditorialCard category={cat6} theme={getCategoryTheme(cat6.slug)} />
          <ImageLedCategoryCard category={cat7} theme={getCategoryTheme(cat7.slug)} />
          <ImageLedCategoryCard category={cat8} theme={getCategoryTheme(cat8.slug)} />
        </div>

        {/* =========================================================================
            MOBILE VIEW (< 768px): Clean Streamlined Mobile Experience
            - 01 Optics rendered as a rich feature card
            - Remaining disciplines rendered as strong touch cards with category identity
           ========================================================================= */}
        <div className="flex flex-col gap-5 md:hidden">
          {/* Flagship Feature Card: 01 Optics */}
          <FeatureCategoryCard category={cat1} theme={getCategoryTheme(cat1.slug)} />

          {/* Remaining Disciplines (02 through 08) */}
          <div className="flex flex-col gap-3 mt-2">
            <span className="font-mono text-xs text-text-muted px-1 font-medium tracking-[0.04em]">
              Explore Disciplines (02–08):
            </span>

            {categories.slice(1).map((cat, idx) => {
              const th = getCategoryTheme(cat.slug);
              return (
                <motion.div
                  key={cat.slug}
                  initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: PRECISION_EASE, delay: idx * 0.04 }}
                >
                  <Link
                    href={`/categories/${cat.slug}`}
                    style={{
                      background: `linear-gradient(135deg, ${th.bgLight} 0%, #FFFFFF 65%)`,
                      borderColor: th.borderLight,
                    }}
                    className="group flex items-center justify-between min-h-[64px] p-4 rounded-xl border shadow-2xs hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div
                        className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 border"
                        style={{ backgroundColor: th.bgLight, borderColor: th.borderLight }}
                      >
                        <span className="font-mono text-[13px] font-semibold" style={{ color: th.accent }}>
                          {th.index}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-display font-semibold text-[15px] sm:text-base text-text-primary group-hover:text-brand-green transition-colors truncate">
                            {cat.name}
                          </h3>
                        </div>
                        <p className="font-sans text-xs text-text-muted truncate mt-0.5">
                          {cat.shortDescription}
                        </p>
                      </div>
                    </div>

                    <ArrowRight
                      className="w-4 h-4 text-text-muted transition-transform group-hover:translate-x-1 shrink-0 ml-2"
                      style={{ color: th.accent }}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

