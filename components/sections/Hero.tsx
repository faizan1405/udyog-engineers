"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import Image from "next/image";
import { HeroEquipmentPlate } from "./HeroEquipmentPlate";
import { PRECISION_EASE, DURATION, STAGGER } from "@/lib/motion";
import { assetPath } from "@/lib/utils";

const CATEGORY_DISCIPLINES = [
  { index: "01", name: "Optics", slug: "optics", color: "#059669", imageSrc: "/images/generated/home/category-strip/category-strip-optics.webp" },
  { index: "02", name: "GPS", slug: "gps", color: "#2563EB", imageSrc: "/images/generated/home/category-strip/category-strip-gps.webp" },
  { index: "03", name: "Night Vision", slug: "night-vision", color: "#4F46E5", imageSrc: "/images/generated/home/category-strip/category-strip-night-vision.webp" },
  { index: "04", name: "Thermal", slug: "thermal", color: "#EA580C", imageSrc: "/images/generated/home/category-strip/category-strip-thermal.webp" },
  { index: "05", name: "Geological Equipment", slug: "geological-equipment", color: "#D97706", imageSrc: "/images/generated/home/category-strip/category-strip-geological-equipment.webp" },
  { index: "06", name: "Camping Equipment", slug: "camping-equipment", color: "#65A30D", imageSrc: "/images/generated/home/category-strip/category-strip-camping.webp" },
  { index: "07", name: "Weather Station", slug: "weather-station", color: "#0284C7", imageSrc: "/images/generated/home/category-strip/category-strip-weather.webp" },
  { index: "08", name: "Camera Trap", slug: "camera-trap", color: "#16A34A", imageSrc: "/images/generated/home/category-strip/category-strip-camera-trap.webp" },
];

/**
 * HERO COMPONENT — REDESIGN R1.1
 *
 * Premium modern product brand hero.
 * Art-directed typography, clean CTA hierarchy, reduced technical decoration,
 * rich atmospheric background aura (green + yellow + teal), and dominant equipment visual.
 */
export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Controlled stagger for hero sequence
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

  // 01: Single small eyebrow reveal
  const eyebrowVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : DURATION.micro,
        ease: PRECISION_EASE,
      },
    },
  };

  // 02: Art-directed headline with masked upward line reveal
  const headlineVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : DURATION.headline,
        ease: PRECISION_EASE,
      },
    },
  };

  // 03: Supporting copy fade & slide
  const copyVariants = {
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

  // 04: CTAs reveal
  const ctaVariants = {
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

  // 05: Hero visual plate reveal from right
  const plateVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? 0 : 35,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : DURATION.heroPlate,
        ease: PRECISION_EASE,
      },
    },
  };

  return (
    <section
      aria-label="Hero Introduction"
      className="relative bg-background overflow-hidden border-b border-border/80 pt-8 pb-14 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24"
    >
      {/* Rich but elegant background atmosphere (warm base + green blob + gold accent + teal shape + minimal contour) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
      >
        {/* Soft Emerald Brand Glow (Top-Right) */}
        <div className="absolute -top-36 right-0 w-[580px] h-[580px] rounded-full bg-brand-green/8 blur-3xl" />
        {/* Golden Yellow Warm Ambient Aura (Bottom-Left) */}
        <div className="absolute bottom-0 -left-16 w-[480px] h-[480px] rounded-full bg-brand-yellow/10 blur-3xl" />
        {/* Cool Teal Atmospheric Shape (Center-Right) */}
        <div className="absolute top-1/3 right-1/4 w-[380px] h-[380px] rounded-full bg-accent-teal/6 blur-3xl" />
        {/* Minimal Subtle Contour Line (No excessive dotted grid) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20 stroke-border-strong"
          viewBox="0 0 1440 800"
          fill="none"
        >
          <path d="M-100 280C350 240 650 420 1540 300" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M-100 480C420 400 920 580 1540 500" strokeWidth="1" />
        </svg>
      </div>

      <Container>
        {/* 12-Column Responsive Composition */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* =====================================================================
              LEFT COLUMN (7 cols): Editorial Typography, Hierarchy & Structured CTAs
             ===================================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* 1. Single Small Eyebrow (No excessive mono badges) */}
            <motion.div variants={eyebrowVariants} className="order-1 mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-green/8 border border-brand-green/20 text-xs font-sans font-semibold text-brand-green shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                <span className="tracking-wide uppercase font-bold text-text-primary">UDYOG ENGINEERS INDIA</span>
                <span className="text-brand-green/50">•</span>
                <span className="tracking-normal font-medium text-brand-green">Field &amp; Survey Technology</span>
              </div>
            </motion.div>

            {/* 2. Art-Directed Headline with Green Highlight & Brand Yellow Underline */}
            <motion.div variants={headlineVariants} className="order-2">
              <h1 className="font-display font-semibold text-[38px] min-[390px]:text-[41px] min-[430px]:text-[43px] sm:text-[48px] md:text-[52px] lg:text-[60px] xl:text-[70px] 2xl:text-[74px] text-text-primary tracking-[-0.045em] leading-[1.0] lg:leading-[0.99]">
                Professional Field, Survey &amp;{" "}
                <span className="relative inline-block text-brand-green font-semibold">
                  Optical Equipment
                  {/* Brand yellow accent underline */}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full h-[3.5px] sm:h-[4px] rounded-full bg-brand-yellow/85"
                  />
                </span>
              </h1>
            </motion.div>

            {/* MOBILE & TABLET: Equipment Showcase Plate placed right after heading */}
            <motion.div
              variants={plateVariants}
              className="order-3 block lg:hidden my-6 max-w-xl mx-auto w-full"
            >
              <HeroEquipmentPlate imageSrc="/images/generated/hero/hero-optical-instrument.webp" />
            </motion.div>

            {/* 3. Supporting Positioning Copy (DM Sans 18-20px desktop, 16-17px mobile, line-height 1.6) */}
            <motion.div variants={copyVariants} className="order-4 mt-3 sm:mt-5">
              <p className="font-sans text-[16px] sm:text-[17px] lg:text-[19px] xl:text-[20px] text-text-secondary leading-[1.6] max-w-[620px]">
                Selected professional equipment for field research, surveying, optical observation, environmental monitoring and technical applications.
              </p>
            </motion.div>

            {/* 4. Structured CTA Hierarchy (Primary -> Secondary -> WhatsApp Contextual) */}
            <motion.div
              variants={ctaVariants}
              className="order-5 mt-6 sm:mt-8 flex flex-col items-start gap-3"
            >
              {/* Primary & Secondary Action Pair */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                {/* PRIMARY: Explore Products */}
                <Button
                  href="/products"
                  variant="primary"
                  size="lg"
                  className="group h-12 px-7 rounded-lg font-sans font-semibold text-[15px] sm:text-base text-white bg-brand-green hover:bg-brand-green-hover shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                </Button>

                {/* SECONDARY: Send Inquiry */}
                <Button
                  href="/contact"
                  variant="secondary"
                  size="lg"
                  className="h-12 px-7 rounded-lg font-sans font-semibold text-[15px] sm:text-base bg-surface text-text-primary border border-border-strong hover:border-brand-green hover:bg-surface-secondary transition-all duration-200"
                >
                  <span>Send Inquiry</span>
                </Button>
              </div>

              {/* Contextual WhatsApp Action */}
              <div className="mt-1 flex items-center gap-2 text-xs sm:text-[13px] text-text-muted">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0" />
                <span className="font-sans">Quick assistance:</span>
                <a
                  href={buildWhatsAppInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans font-medium text-brand-green hover:text-brand-green-hover underline underline-offset-2 transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* 5. Simplified 3-Part Discipline Strip */}
            <motion.div
              variants={copyVariants}
              className="order-6 mt-8 sm:mt-10 pt-6 border-t border-border/80 hidden sm:block"
            >
              <div className="grid grid-cols-3 gap-6 text-xs">
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-brand-green font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                    <span className="font-mono text-xs">01</span>
                    <span className="font-display text-[13px]">Observation</span>
                  </div>
                  <span className="font-sans text-text-secondary mt-1 text-xs sm:text-[13px] leading-relaxed">
                    Field optics and survey viewing instruments
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-brand-yellow font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                    <span className="font-mono text-xs">02</span>
                    <span className="font-display text-[13px]">Positioning</span>
                  </div>
                  <span className="font-sans text-text-secondary mt-1 text-xs sm:text-[13px] leading-relaxed">
                    Satellite navigation and directional tools
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5 text-accent-teal font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-teal" />
                    <span className="font-mono text-xs">03</span>
                    <span className="font-display text-[13px]">Monitoring</span>
                  </div>
                  <span className="font-sans text-text-secondary mt-1 text-xs sm:text-[13px] leading-relaxed">
                    Thermal imaging and environmental sensors
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* =====================================================================
              RIGHT COLUMN (5 cols): Equipment Visual Showcase Enters from Right
             ===================================================================== */}
          <motion.div
            variants={plateVariants}
            className="hidden lg:block lg:col-span-5"
          >
            <div className="relative">
              {/* Layered Accent Glow Halo */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 bg-gradient-to-tr from-brand-green/18 via-brand-yellow/12 to-accent-teal/10 rounded-3xl blur-xl -z-10"
              />
              <HeroEquipmentPlate imageSrc="/images/generated/hero/hero-optical-instrument.webp" />
            </div>
          </motion.div>
        </motion.div>

        {/* =========================================================================
            BOTTOM CATEGORY PORTFOLIO INDEX STRIP (8 Disciplines with individual colors)
           ========================================================================= */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-border/80">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <span className="font-sans text-xs text-text-muted flex items-center gap-2 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-brand-yellow" />
              <span>Explore 8 Equipment Disciplines:</span>
            </span>
            <Link
              href="/categories"
              className="font-sans text-xs sm:text-[13px] text-brand-green font-semibold hover:underline flex items-center gap-1.5 self-start md:self-auto group"
            >
              <span>View Full Category Architecture</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* 8 Distinct Category Blocks with Full-Bleed Photography & Directional Overlay */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {CATEGORY_DISCIPLINES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group relative flex flex-col justify-between p-3 min-h-[92px] sm:min-h-[98px] rounded-xl border overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300"
                style={{
                  borderColor: `${cat.color}40`,
                }}
              >
                {/* LAYER 1: Full-Bleed Photograph (z-0) */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={assetPath(cat.imageSrc)}
                    alt={`${cat.name} equipment discipline`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12.5vw"
                    className="object-cover object-right transition-transform duration-300 ease-out group-hover:scale-[1.06]"
                  />
                </div>

                {/* LAYER 2: Controlled Directional Gradient Overlay (z-10, dark on left for title, open on right for photo visibility) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-10 bg-gradient-to-r from-black/75 via-black/40 to-black/15 transition-opacity duration-300 group-hover:opacity-85 pointer-events-none"
                />

                {/* Category hover accent glow and border (z-10) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${cat.color}25 0%, transparent 75%)`,
                    boxShadow: `inset 0 0 0 1.5px ${cat.color}`,
                  }}
                />

                {/* LAYER 3: Interactive Content (z-20) */}
                <div className="relative z-20 flex items-center justify-between">
                  <span
                    className="font-mono text-xs font-semibold transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
                    style={{ color: cat.color }}
                  >
                    {cat.index}
                  </span>
                  <ArrowRight
                    className="w-3.5 h-3.5 transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:translate-x-1"
                    style={{ color: cat.color }}
                  />
                </div>

                {/* Bottom Row: High-Contrast Category Title */}
                <span className="relative z-20 font-display text-[12px] sm:text-[13px] font-semibold text-white/95 mt-2 leading-snug line-clamp-2 min-h-[2.5em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:text-white">
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
