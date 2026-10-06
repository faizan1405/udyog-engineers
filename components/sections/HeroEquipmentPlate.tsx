"use client";

import React from "react";
import Image from "next/image";
import { cn, assetPath } from "@/lib/utils";

export interface HeroEquipmentPlateProps {
  /**
   * Optional authentic product image source.
   * When provided, seamlessly replaces the vector showcase asset.
   */
  imageSrc?: string;
  alt?: string;
  className?: string;
}

/**
 * HERO EQUIPMENT PLATE — REDESIGN R1.2
 *
 * Dominant product brand visual showcase:
 * - Unverified "EST. 1974" and software UI framing bars completely removed
 * - Product visual made noticeably larger with minimal dead whitespace
 * - Rich layered composition: large soft green shape, warm yellow shape, subtle teal layer, controlled shadow depth
 * - Zero fake specifications, zero telemetry
 */
export function HeroEquipmentPlate({
  imageSrc = "/images/generated/hero/hero-optical-instrument.webp",
  alt = "Precision optical survey total station equipment showcase",
  className,
}: HeroEquipmentPlateProps) {
  return (
    <div
      className={cn(
        "relative w-full rounded-2xl sm:rounded-3xl border border-border/70 bg-white shadow-xl overflow-hidden group select-none",
        "transition-all duration-300 ease-precision hover:shadow-2xl hover:border-brand-green/35 hover:-translate-y-1",
        className
      )}
    >
      {/* 1. Rich Layered Color Atmosphere (Large Soft Green + Warm Yellow + Subtle Teal) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Large Soft Emerald Brand Glow (Top-Right) */}
        <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-brand-green/16 blur-3xl transition-opacity duration-300 group-hover:opacity-95" />
        {/* Warm Golden Yellow Ambient Shape (Bottom-Left) */}
        <div className="absolute -bottom-24 -left-20 w-[390px] h-[390px] rounded-full bg-brand-yellow/18 blur-3xl transition-opacity duration-300 group-hover:opacity-95" />
        {/* Subtle Atmospheric Teal Layer (Center-Offset) */}
        <div className="absolute top-1/4 left-1/4 w-[330px] h-[330px] rounded-full bg-accent-teal/12 blur-3xl" />
        {/* Soft Organic Geometric Depth Ring */}
        <div className="absolute inset-3 sm:inset-5 rounded-2xl border border-border/30 bg-gradient-to-br from-surface/70 via-surface-secondary/25 to-surface/80 -z-0" />
      </div>

      {/* 2. Unobtrusive Floating Authentic Micro-Badge */}
      <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/90 border border-border/80 shadow-2xs backdrop-blur-xs text-[11px] font-sans font-medium text-text-secondary">
          <span className="w-2 h-2 rounded-full bg-brand-green" />
          <span>Professional Equipment</span>
        </div>
      </div>

      {/* 3. Dominant Equipment Visual Showcase (Enlarged to fill plate) */}
      <div className="relative aspect-[4/3] w-full flex items-center justify-center p-2.5 sm:p-3.5 lg:p-4 overflow-hidden z-10">
        {imageSrc ? (
          /* Client Official Hardware Photography Mode */
          <div className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-precision group-hover:scale-[1.03]">
            <Image
              src={assetPath(imageSrc)}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
              priority
              className="object-contain drop-shadow-[0_24px_36px_rgba(18,32,44,0.18)]"
            />
          </div>
        ) : (
          /* Statuesque Precision Optical Survey Instrument Illustration */
          <div className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-precision group-hover:scale-[1.03]">
            {/* Subtle Radiant Silhouette Backdrop Halo */}
            <div
              aria-hidden="true"
              className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-brand-green/14 via-brand-yellow/14 to-accent-teal/12 blur-2xl pointer-events-none"
            />

            <svg
              className="w-full h-full max-h-[360px] sm:max-h-[400px] lg:max-h-[430px] drop-shadow-[0_20px_32px_rgba(18,32,44,0.15)] select-none"
              viewBox="0 0 520 380"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label={alt}
              role="img"
            >
              <defs>
                {/* Deep Slate Metallic Housing Gradient */}
                <linearGradient id="instrumentBody" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#263445" />
                  <stop offset="50%" stopColor="#14212D" />
                  <stop offset="100%" stopColor="#1E2B38" />
                </linearGradient>
                {/* Brand Green Precision Accent Stripe */}
                <linearGradient id="brandGreenAccent" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#078C45" />
                  <stop offset="50%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#057037" />
                </linearGradient>
                {/* Knurled Brass / Vernier Gold Ring */}
                <linearGradient id="knurledBrass" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#FDE68A" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                {/* Emerald Optical Multi-Coated Objective Reflection */}
                <radialGradient id="emeraldLensReflection" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="55%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#064E3B" />
                </radialGradient>
                {/* Violet Fluorite Optical Flare */}
                <radialGradient id="violetLensFlare" cx="70%" cy="30%" r="50%">
                  <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#4C1D95" stopOpacity="0" />
                </radialGradient>
                {/* Tribrach Shadow */}
                <radialGradient id="baseShadow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#12202C" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#12202C" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Ground Shadow Halo under Instrument */}
              <ellipse cx="260" cy="350" rx="160" ry="15" fill="url(#baseShadow)" />

              {/* Tribrach Base & Leveling Screws */}
              <rect
                x="150"
                y="312"
                width="220"
                height="18"
                rx="5"
                fill="url(#instrumentBody)"
                stroke="#12202C"
                strokeWidth="1.5"
              />
              {/* Leveling Foot Screws with Knurled Brass Rings */}
              <rect x="175" y="330" width="40" height="12" rx="3" fill="url(#knurledBrass)" stroke="#12202C" strokeWidth="1" />
              <rect x="305" y="330" width="40" height="12" rx="3" fill="url(#knurledBrass)" stroke="#12202C" strokeWidth="1" />

              {/* Horizontal Graduated Azimuth Bezel */}
              <rect
                x="190"
                y="278"
                width="140"
                height="34"
                rx="4"
                fill="#FFFFFF"
                stroke="#12202C"
                strokeWidth="1.5"
              />
              {/* Brand Green Highlight Band on Bezel */}
              <rect x="190" y="278" width="140" height="4" fill="url(#brandGreenAccent)" />

              {/* Subtle Precision Millimeter Calibration Ticks */}
              {[...Array(17)].map((_, i) => (
                <line
                  key={i}
                  x1={Number((198 + i * 7.7).toFixed(1))}
                  y1="286"
                  x2={Number((198 + i * 7.7).toFixed(1))}
                  y2={i % 4 === 0 ? "302" : "294"}
                  stroke="#475569"
                  strokeWidth="1.2"
                />
              ))}

              {/* Dual Vertical Standards (Upright Arms) */}
              <path
                d="M206 278V152L230 142V278H206Z"
                fill="url(#instrumentBody)"
                stroke="#12202C"
                strokeWidth="1.5"
              />
              <path
                d="M314 278V152L290 142V278H314Z"
                fill="url(#instrumentBody)"
                stroke="#12202C"
                strokeWidth="1.5"
              />

              {/* Center Core Instrument Column */}
              <rect
                x="234"
                y="204"
                width="52"
                height="74"
                rx="4"
                fill="#1E2B38"
                stroke="#12202C"
                strokeWidth="1.5"
              />
              <rect x="242" y="214" width="36" height="4" fill="url(#knurledBrass)" rx="1" />

              {/* Horizontal Trunnion Axis Center Pivot with Polished Brass Bezel */}
              <circle cx="260" cy="168" r="24" fill="#FFFFFF" stroke="#12202C" strokeWidth="1.5" />
              <circle cx="260" cy="168" r="17" fill="url(#knurledBrass)" stroke="#12202C" strokeWidth="1" />
              <circle cx="260" cy="168" r="7" fill="#078C45" />

              {/* Main Optical Telescope Barrel (Art-Directed 12° Incline) */}
              <g transform="rotate(-12 260 168)">
                {/* Sunshade Hood & Objective Lens Assembly */}
                <rect
                  x="90"
                  y="146"
                  width="65"
                  height="44"
                  rx="4"
                  fill="url(#instrumentBody)"
                  stroke="#12202C"
                  strokeWidth="1.5"
                />
                <rect x="90" y="146" width="7" height="44" fill="url(#brandGreenAccent)" />

                {/* Multi-Coated Objective Lens with Emerald & Violet Optical Reflections */}
                <ellipse cx="94" cy="168" rx="6" ry="20" fill="url(#emeraldLensReflection)" stroke="#E5A812" strokeWidth="1.5" />
                <ellipse cx="95" cy="168" rx="3" ry="14" fill="url(#violetLensFlare)" />

                {/* Main Telescope Body Tube */}
                <rect
                  x="155"
                  y="150"
                  width="188"
                  height="36"
                  fill="#F8FAFC"
                  stroke="#12202C"
                  strokeWidth="1.5"
                />
                {/* Brand Green Dynamic Ribbon on Barrel */}
                <rect x="155" y="166" width="188" height="4.5" fill="url(#brandGreenAccent)" />

                {/* Knurled Focus Ring Assembly */}
                <rect
                  x="220"
                  y="146"
                  width="34"
                  height="44"
                  rx="3"
                  fill="url(#knurledBrass)"
                  stroke="#12202C"
                  strokeWidth="1.2"
                />
                {[...Array(8)].map((_, i) => (
                  <line
                    key={i}
                    x1={Number((224 + i * 3.7).toFixed(1))}
                    y1="146"
                    x2={Number((224 + i * 3.7).toFixed(1))}
                    y2="190"
                    stroke="#78350F"
                    strokeWidth="1.2"
                  />
                ))}

                {/* Eyepiece / Diopter Adjustment Assembly */}
                <rect x="343" y="154" width="40" height="28" rx="3" fill="url(#instrumentBody)" stroke="#12202C" strokeWidth="1.5" />
                <rect x="383" y="157" width="22" height="22" rx="3" fill="#334155" stroke="#12202C" strokeWidth="1.2" />
              </g>

              {/* Optical Collimator Sight on Top */}
              <rect x="235" y="110" width="52" height="12" rx="3" fill="url(#brandGreenAccent)" stroke="#12202C" strokeWidth="1.2" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

