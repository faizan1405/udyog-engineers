"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Compass, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroEquipmentPlate } from "./HeroEquipmentPlate";

const CATEGORY_DISCIPLINES = [
  { index: "01", name: "Optics", slug: "optics" },
  { index: "02", name: "GPS", slug: "gps" },
  { index: "03", name: "Night Vision", slug: "night-vision" },
  { index: "04", name: "Thermal", slug: "thermal" },
  { index: "05", name: "Geological Compass", slug: "geological-compass" },
  { index: "06", name: "Camping Equipment", slug: "camping-equipment" },
  { index: "07", name: "Weather Station", slug: "weather-station" },
  { index: "08", name: "Forestry Items", slug: "forestry-items" },
];

/**
 * HERO COMPONENT (PHASE 4A)
 *
 * Art-directed editorial technical composition.
 * Balances scientific rigor, precision framing, oversized typography,
 * and restrained whitespace.
 *
 * Avoids generic split-screen SaaS clichés and retail e-commerce patterns.
 */
import { PRECISION_EASE, DURATION, STAGGER } from "@/lib/motion";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : STAGGER.hero,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 14,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : DURATION.reveal,
        ease: PRECISION_EASE,
      },
    },
  };

  const plateVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      scale: shouldReduceMotion ? 1 : 0.98,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : DURATION.reveal,
        ease: PRECISION_EASE,
      },
    },
  };

  return (
    <section
      aria-label="Hero Introduction"
      className="relative bg-background overflow-hidden border-b border-border pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20"
    >
      <Container>
        {/* Top Architectural Registration Rule (Desktop Only) */}
        <div className="hidden lg:flex items-center justify-between py-2 mb-8 border-y border-border text-[11px] font-mono text-text-muted select-none">
          <div className="flex items-center gap-3">
            <span className="text-accent-secondary font-semibold">+</span>
            <span className="tracking-wider uppercase text-text-primary">
              SYSTEM ARCHITECTURE // FIELD EQUIPMENT CATALOGUE
            </span>
          </div>
          <div className="flex items-center gap-4 text-text-muted">
            <span>GRID REF // DISCIPLINE MATRIX: 01–08</span>
            <span>·</span>
            <span>INDEX: ARCHIVE-SYS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-text-primary font-medium">UE-CAT-2026-F</span>
            <span className="text-accent-secondary font-semibold">+</span>
          </div>
        </div>

        {/* =========================================================================
            DESKTOP & TABLET LAYOUT (>= 768px): Asymmetric 12-Column Grid
            MOBILE LAYOUT (< 768px): Recomposed Vertical Hierarchy (Label -> Heading -> Visual -> Copy -> CTAs)
           ========================================================================= */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* =====================================================================
              LEFT COLUMN (Desktop 7 cols): Typography, Positioning & CTAs
              MOBILE: Label & Heading first, then Visual (rendered via order classes)
             ===================================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* 1. Positioning Eyebrow / Classification */}
            <motion.div variants={itemVariants} className="order-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-surface border border-border rounded-[2px] mb-4 sm:mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-text-primary">
                  01 // FIELD SYSTEMS ARCHITECTURE
                </span>
                <span className="text-border-strong hidden sm:inline">|</span>
                <span className="font-mono text-[11px] text-text-muted hidden sm:inline">
                  PRECISION INSTRUMENTATION
                </span>
              </div>
            </motion.div>

            {/* 2. Primary Authoritative Heading */}
            <motion.div variants={itemVariants} className="order-2">
              <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[4rem] text-text-primary tracking-[-0.03em] leading-[1.08]">
                Professional Field, Survey &amp; Optical Equipment
              </h1>
            </motion.div>

            {/* MOBILE & TABLET: Equipment Visual sits right after heading, capped at max-w-xl on tablets */}
            <motion.div
              variants={plateVariants}
              className="order-3 block lg:hidden my-6 max-w-xl mx-auto w-full"
            >
              <HeroEquipmentPlate />
            </motion.div>

            {/* 3. Supporting Positioning Copy (Concise & Restrained) */}
            <motion.div variants={itemVariants} className="order-4">
              <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed mt-2 sm:mt-5 max-w-xl">
                Selected professional equipment for field research, surveying, optical observation, environmental monitoring and technical applications.
              </p>
            </motion.div>

            {/* 4. Action Controls / CTAs */}
            <motion.div
              variants={itemVariants}
              className="order-5 mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <Button
                href="/products"
                variant="primary"
                size="lg"
                className="group h-12 px-6 rounded-[2px] font-display font-semibold text-sm tracking-wide text-white bg-accent hover:bg-accent-hover transition-colors shadow-xs"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>

              <Button
                href="/contact"
                variant="secondary"
                size="lg"
                className="h-12 px-6 rounded-[2px] font-display font-semibold text-sm tracking-wide bg-surface-secondary text-text-primary border border-border-strong hover:bg-surface-tertiary transition-colors"
              >
                <span>Send Inquiry</span>
              </Button>
            </motion.div>

            {/* 5. Lower Focus Disciplines Micro-Block (Desktop & Tablet) */}
            <motion.div
              variants={itemVariants}
              className="order-6 mt-8 sm:mt-10 pt-6 border-t border-border/80 hidden sm:block"
            >
              <div className="font-mono text-[10px] uppercase tracking-wider text-text-muted mb-3 flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-accent-secondary" />
                <span>PRIMARY FOCUS DISCIPLINES // CATALOGUE SCOPE</span>
              </div>
              <div className="grid grid-cols-3 gap-4 font-mono text-xs text-text-secondary">
                <div className="flex flex-col">
                  <span className="text-[10px] text-accent-secondary font-semibold">01 // OBSERVATION</span>
                  <span className="font-medium text-text-primary mt-0.5">Field &amp; Survey Optics</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-accent-secondary font-semibold">02 // POSITIONING</span>
                  <span className="font-medium text-text-primary mt-0.5">Satellite &amp; Compass Grid</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-accent-secondary font-semibold">03 // MONITORING</span>
                  <span className="font-medium text-text-primary mt-0.5">Thermal &amp; Weather Arrays</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* =====================================================================
              RIGHT COLUMN (Desktop 5 cols): Art-Directed Equipment Showcase Plate
              (Hidden on mobile here, as mobile renders it at order-3 above)
             ===================================================================== */}
          <motion.div
            variants={plateVariants}
            className="hidden lg:block lg:col-span-5"
          >
            <div className="relative">
              {/* Subtle architectural back-pedestal line */}
              <div
                aria-hidden="true"
                className="absolute -top-3 -right-3 w-full h-full border border-border-subtle bg-surface-secondary/40 rounded-[2px] -z-10"
              />
              <HeroEquipmentPlate />
            </div>
          </motion.div>
        </motion.div>

        {/* =========================================================================
            BOTTOM CATEGORY PORTFOLIO INDEX STRIP (Spanning all 8 disciplines)
           ========================================================================= */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-secondary" />
              <span>EQUIPMENT DISCIPLINES // 8 CATALOGUE DOMAINS:</span>
            </span>
            <Link
              href="/categories"
              className="font-mono text-[11px] text-accent font-semibold hover:underline flex items-center gap-1 self-start md:self-auto"
            >
              <span>View Full Category Architecture</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Clean 8-Domain Horizontal Index Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {CATEGORY_DISCIPLINES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group flex flex-col p-2.5 bg-surface border border-border hover:border-accent-primary hover:bg-surface-secondary/60 rounded-[2px] transition-all duration-200"
              >
                <span className="font-mono text-[10px] text-accent-secondary group-hover:text-accent font-medium">
                  {cat.index}
                </span>
                <span className="font-display text-[11px] sm:text-xs font-semibold text-text-primary mt-0.5 leading-snug line-clamp-2 min-h-[2.4em] group-hover:text-accent transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
