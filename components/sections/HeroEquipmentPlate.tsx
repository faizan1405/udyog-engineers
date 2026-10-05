"use client";

import React from "react";
import Image from "next/image";
import { cn, assetPath } from "@/lib/utils";
import { isStagingOrDevelopment } from "@/lib/staging";


export interface HeroEquipmentPlateProps {
  /**
   * Optional authentic product image source.
   * When provided, seamlessly replaces the technical blueprint placeholder.
   */
  imageSrc?: string;
  alt?: string;
  className?: string;
}

/**
 * HERO EQUIPMENT PLATE
 *
 * Art-directed technical equipment plate for Udyog Engineers.
 * Designed so official hardware photography can drop in directly
 * via `imageSrc` without modifying section layout or framing.
 *
 * NOTE: Currently displays a calibrated technical instrument schematic
 * while awaiting authentic client photography.
 */
export function HeroEquipmentPlate({
  imageSrc,
  alt = "Precision optical survey instrument technical dossier plate",
  className,
}: HeroEquipmentPlateProps) {
  return (
    <div
      className={cn(
        "relative w-full border border-border bg-surface rounded-[2px] overflow-hidden",
        "shadow-[0_1px_3px_rgba(20,23,21,0.04),0_12px_28px_-6px_rgba(20,23,21,0.04)]",
        className
      )}
    >
      {/* 4 Corner Registration Crosshairs */}
      <span
        aria-hidden="true"
        className="absolute top-1.5 left-1.5 font-mono text-[10px] text-accent-secondary/60 leading-none select-none z-20"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute top-1.5 right-1.5 font-mono text-[10px] text-accent-secondary/60 leading-none select-none z-20"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-1.5 left-1.5 font-mono text-[10px] text-accent-secondary/60 leading-none select-none z-20"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-1.5 right-1.5 font-mono text-[10px] text-accent-secondary/60 leading-none select-none z-20"
      >
        +
      </span>

      {/* Top Technical Metadata Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-surface-secondary/70 text-[10px] font-mono text-text-muted">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary shrink-0" />
          <span className="tracking-wider uppercase font-medium text-text-primary text-[9px] sm:text-[10px] truncate">
            PLATE 01 // PRECISION OPTICAL METROLOGY
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-text-muted">
          <span>AXIS // X-01 · Y-02</span>
          <span>·</span>
          <span>SCHEMATIC REF // 01</span>
        </div>
      </div>

      {/* Main Showcase Canvas */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-surface to-surface-secondary/40 overflow-hidden">
        {/* Subtle Precision Grid Lines */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.45] bg-[linear-gradient(to_right,#E2DFD6_1px,transparent_1px),linear-gradient(to_bottom,#E2DFD6_1px,transparent_1px)] bg-[size:32px_32px]"
        />

        {/* Optical Reticle Center Rings (Decorative Background) */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30 stroke-border-strong"
          viewBox="0 0 600 450"
          fill="none"
        >
          <circle cx="300" cy="225" r="160" strokeDasharray="3 3" />
          <circle cx="300" cy="225" r="110" />
          <circle cx="300" cy="225" r="50" strokeDasharray="2 4" />
          <line x1="300" y1="35" x2="300" y2="415" strokeDasharray="4 4" />
          <line x1="110" y1="225" x2="490" y2="225" strokeDasharray="4 4" />
          <text
            x="308"
            y="75"
            fill="#7C837E"
            fontSize="8"
            fontFamily="monospace"
            letterSpacing="0.1em"
          >
            000° AZIMUTH
          </text>
          <text
            x="455"
            y="220"
            fill="#7C837E"
            fontSize="8"
            fontFamily="monospace"
            letterSpacing="0.1em"
          >
            090°
          </text>
          <text
            x="308"
            y="410"
            fill="#7C837E"
            fontSize="8"
            fontFamily="monospace"
            letterSpacing="0.1em"
          >
            180°
          </text>
          <text
            x="115"
            y="220"
            fill="#7C837E"
            fontSize="8"
            fontFamily="monospace"
            letterSpacing="0.1em"
          >
            270°
          </text>
        </svg>

        {imageSrc ? (
          /* Production Equipment Photograph Mode */
          <div className="relative w-full h-full flex items-center justify-center z-10">
            <Image
              src={assetPath(imageSrc)}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
              priority
              className="object-contain drop-shadow-[0_16px_24px_rgba(20,23,21,0.08)]"
            />
          </div>
        ) : (
          /* TEMPORARY DEVELOPMENT ASSET: Precision Optical Survey Vector Monograph */
          <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
            <svg
              className="w-full h-full max-h-[300px] sm:max-h-[340px] drop-shadow-sm select-none"
              viewBox="0 0 520 380"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label={alt}
              role="img"
            >
              {/* Tribrach Base & Leveling Screws */}
              <rect
                x="170"
                y="315"
                width="180"
                height="16"
                rx="2"
                fill="#F2F0EB"
                stroke="#141715"
                strokeWidth="1.75"
              />
              <rect
                x="195"
                y="331"
                width="32"
                height="10"
                rx="1"
                fill="#E8E5DC"
                stroke="#141715"
                strokeWidth="1.5"
              />
              <rect
                x="293"
                y="331"
                width="32"
                height="10"
                rx="1"
                fill="#E8E5DC"
                stroke="#141715"
                strokeWidth="1.5"
              />
              <line
                x1="180"
                y1="323"
                x2="340"
                y2="323"
                stroke="#CBC7BA"
                strokeDasharray="2 3"
              />

              {/* Horizontal Graduated Bezel / Azimuth Dial */}
              <rect
                x="200"
                y="290"
                width="120"
                height="25"
                rx="2"
                fill="#FFFFFF"
                stroke="#141715"
                strokeWidth="1.75"
              />
              {/* Millimeter Degree Ticks */}
              {[...Array(13)].map((_, i) => (
                <line
                  key={i}
                  x1={208 + i * 8.5}
                  y1="290"
                  x2={208 + i * 8.5}
                  y2={i % 3 === 0 ? "300" : "296"}
                  stroke="#4D544F"
                  strokeWidth="1.2"
                />
              ))}

              {/* Vertical Standards (Dual Arms of the Theodolite) */}
              <path
                d="M215 290V160L235 150V290H215Z"
                fill="#F8F7F4"
                stroke="#141715"
                strokeWidth="1.75"
              />
              <path
                d="M305 290V160L285 150V290H305Z"
                fill="#F8F7F4"
                stroke="#141715"
                strokeWidth="1.75"
              />

              {/* Horizontal Trunnion Axis Center Pivot */}
              <circle
                cx="260"
                cy="175"
                r="18"
                fill="#FFFFFF"
                stroke="#141715"
                strokeWidth="1.75"
              />
              <circle cx="260" cy="175" r="7" fill="#9C824A" />

              {/* Main Optical Telescope Barrel (Asymmetric 18° Inclined) */}
              <g transform="rotate(-12 260 175)">
                {/* Sunshade Hood & Objective Lens Assembly */}
                <rect
                  x="110"
                  y="157"
                  width="44"
                  height="36"
                  rx="2"
                  fill="#1E3A2F"
                  stroke="#141715"
                  strokeWidth="1.75"
                />
                {/* Multi-Coated ED Objective Lens (Emerald Glint) */}
                <ellipse
                  cx="112"
                  cy="175"
                  rx="4"
                  ry="16"
                  fill="#2D5A46"
                  stroke="#9C824A"
                  strokeWidth="1.5"
                />
                <ellipse
                  cx="113"
                  cy="175"
                  rx="1.5"
                  ry="11"
                  fill="#A3E635"
                  fillOpacity="0.45"
                />

                {/* Main Telescope Housing Barrel */}
                <rect
                  x="154"
                  y="161"
                  width="180"
                  height="28"
                  fill="#FFFFFF"
                  stroke="#141715"
                  strokeWidth="1.75"
                />

                {/* Knurled Focus Barrel Ring */}
                <rect
                  x="218"
                  y="158"
                  width="26"
                  height="34"
                  rx="1"
                  fill="#F2F0EB"
                  stroke="#141715"
                  strokeWidth="1.5"
                />
                {[...Array(6)].map((_, i) => (
                  <line
                    key={i}
                    x1={222 + i * 3.5}
                    y1="158"
                    x2={222 + i * 3.5}
                    y2="192"
                    stroke="#7C837E"
                    strokeWidth="1"
                  />
                ))}

                {/* Eyepiece / Diopter Ring Assembly */}
                <rect
                  x="334"
                  y="163"
                  width="36"
                  height="24"
                  rx="1"
                  fill="#141715"
                  stroke="#141715"
                  strokeWidth="1.5"
                />
                <rect
                  x="370"
                  y="166"
                  width="18"
                  height="18"
                  rx="2"
                  fill="#4D544F"
                  stroke="#141715"
                  strokeWidth="1.5"
                />
                {/* Optical Collimation Line (Dashed) */}
                <line
                  x1="70"
                  y1="175"
                  x2="410"
                  y2="175"
                  stroke="#9C824A"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.6"
                />
              </g>

              {/* Optical Collimator Sight on Top */}
              <rect
                x="235"
                y="118"
                width="50"
                height="10"
                rx="1"
                fill="#E8E5DC"
                stroke="#141715"
                strokeWidth="1.25"
              />

              {/* Precision Dial Pointer & Metric Stamp */}
              <text
                x="260"
                y="368"
                textAnchor="middle"
                fontFamily="monospace"
                fontSize="9"
                fontWeight="600"
                fill="#4D544F"
                letterSpacing="0.08em"
              >
                OPTICAL ASSEMBLY // CROSS-SECTION SCHEMATIC REF. 01
              </text>
            </svg>

            {/* Clear Temporary Architecture Badge (Visible in staging/dev only) */}
            {isStagingOrDevelopment() && (
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface/95 border border-border-strong text-text-primary rounded-[2px] text-[10px] font-mono tracking-wider shadow-xs backdrop-blur-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
                <span>TEMPORARY ASSET // OFFICIAL PHOTOGRAPHY PENDING</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Technical Scale & Telemetry Rule */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3 py-2 border-t border-border bg-surface-secondary/40 text-[10px] sm:text-[11px] font-mono">
        {/* Vernier Measurement Micro Ticks */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-text-muted">
          <span className="text-[9px] uppercase tracking-wider text-accent-secondary font-semibold shrink-0">
            SCHEMATIC ANATOMY:
          </span>
          <span className="text-text-primary font-medium">OBJECTIVE BARREL</span>
          <span className="text-border-strong">|</span>
          <span className="text-text-secondary">AZIMUTH VERNIER BASE</span>
        </div>

        {/* Document Identifier */}
        <div className="text-[10px] text-text-muted tracking-tight">
          DOC.REF // <span className="text-text-primary">UE-SYS-2026-F</span>
        </div>
      </div>
    </div>
  );
}
