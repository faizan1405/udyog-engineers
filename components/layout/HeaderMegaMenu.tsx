"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight, Compass, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryMenuItem {
  index: string;
  name: string;
  slug: string;
  domain: string;
}

const CATEGORIES_MENU_DATA: CategoryMenuItem[] = [
  {
    index: "01",
    name: "Optics",
    slug: "optics",
    domain: "ED Terrestrial & Survey Optics",
  },
  {
    index: "02",
    name: "GPS",
    slug: "gps",
    domain: "GNSS Positioning & Geodetic Mapping",
  },
  {
    index: "03",
    name: "Night Vision",
    slug: "night-vision",
    domain: "Electro-Optical Low-Light Systems",
  },
  {
    index: "04",
    name: "Thermal",
    slug: "thermal",
    domain: "Radiometric Thermography & Scopes",
  },
  {
    index: "05",
    name: "Geological Compass",
    slug: "geological-compass",
    domain: "Stratum, Strike & Dip Inclinometers",
  },
  {
    index: "06",
    name: "Camping Equipment",
    slug: "camping-equipment",
    domain: "Engineered Field Expedition Gear",
  },
  {
    index: "07",
    name: "Weather Station",
    slug: "weather-station",
    domain: "Automated Meteorological Arrays",
  },
  {
    index: "08",
    name: "Forestry Items",
    slug: "forestry-items",
    domain: "Dendrometry & Timber Cruising Tools",
  },
];

export function HeaderMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isCategoriesActive =
    pathname.startsWith("/categories") || pathname.startsWith("/products");

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  const closeMenu = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(false);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close menu on route change during render
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Close on click outside & Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeMenu]);

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mega Menu Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="desktop-categories-megamenu"
        className={cn(
          "inline-flex items-center gap-1.5 py-2 px-1 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent select-none",
          isCategoriesActive
            ? "text-accent font-semibold"
            : "text-text-secondary hover:text-text-primary",
          isOpen && "text-text-primary"
        )}
      >
        <span>Categories</span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 text-text-muted transition-transform duration-200",
            isOpen && "rotate-180 text-text-primary"
          )}
          aria-hidden="true"
        />
      </button>

      {/* Structured Dropdown / Mega-Menu Panel */}
      {isOpen && (
        <div
          id="desktop-categories-megamenu"
          role="region"
          aria-label="Equipment Categories Menu"
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[700px] xl:w-[780px] max-w-[calc(100vw-2rem)] bg-surface border border-border rounded-[2px] shadow-[0_4px_16px_rgba(20,23,21,0.06),0_1px_3px_rgba(20,23,21,0.04)] z-50 overflow-hidden animate-megamenu before:content-[''] before:absolute before:-top-2 before:h-2 before:left-0 before:right-0"
        >
          {/* Top Hairline Notation Bar */}
          <div className="flex items-center justify-between px-5 py-2.5 bg-surface-secondary/60 border-b border-border text-[10px] font-mono text-text-muted">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
              <span className="uppercase tracking-wider font-semibold text-text-primary">
                EQUIPMENT DIRECTORY // 8 PRECISION DISCIPLINES
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>DOC.REF // METROLOGY-INDEX</span>
              <span className="text-accent-secondary font-bold">+</span>
            </div>
          </div>

          {/* Main 2-Column Content Layout: Left Summary & Right 8-Item Grid */}
          <div className="grid grid-cols-12 divide-x divide-border">
            {/* Left Strategic Overview Panel */}
            <div className="col-span-4 p-5 bg-surface-secondary/25 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-accent font-mono text-[11px] font-semibold mb-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>FIELD PORTFOLIO</span>
                </div>
                <h3 className="font-display font-bold text-base text-text-primary leading-snug">
                  Professional Field &amp; Optical Systems
                </h3>
                <p className="font-sans text-xs text-text-secondary mt-2 leading-relaxed">
                  Engineered instrumentation for scientific surveying, environmental telemetry, and demanding field missions.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/80 flex flex-col gap-2">
                <Link
                  href="/categories"
                  onClick={closeMenu}
                  className="group inline-flex items-center justify-between text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
                >
                  <span>Explore All 8 Categories</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 ease-precision group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/products"
                  onClick={closeMenu}
                  className="group inline-flex items-center justify-between text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  <span>View Equipment Catalogue</span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-muted transition-transform duration-200 ease-precision group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Right 8-Category Architectural Grid */}
            <div className="col-span-8 p-4 grid grid-cols-2 gap-2 bg-surface">
              {CATEGORIES_MENU_DATA.map((cat) => {
                const isCatActive = pathname === `/categories/${cat.slug}`;

                return (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    onClick={closeMenu}
                    className={cn(
                      "group flex flex-col p-2.5 rounded-[2px] border transition-colors duration-200 ease-precision",
                      isCatActive
                        ? "bg-surface-secondary border-accent-primary"
                        : "border-transparent hover:border-border hover:bg-surface-secondary/60"
                    )}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-mono text-[10px] text-accent-secondary group-hover:text-accent font-medium">
                        {cat.index}
                      </span>
                      <ArrowRight className="w-3 h-3 text-text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-precision" />
                    </div>
                    <span className="font-display text-sm font-semibold text-text-primary group-hover:text-accent transition-colors duration-150">
                      {cat.name}
                    </span>
                    <span className="font-sans text-[11px] text-text-muted line-clamp-1 mt-0.5">
                      {cat.domain}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Direct Inquiry Notification Bar */}
          <div className="px-5 py-2.5 bg-surface-secondary/40 border-t border-border flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-text-secondary">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-secondary" />
              <span>Looking for specific equipment or technical parameters?</span>
            </div>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="font-mono text-[11px] font-semibold text-accent hover:underline uppercase"
            >
              Direct Inquiry →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
