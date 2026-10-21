"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryMenuItem {
  index: string;
  name: string;
  slug: string;
  descriptor: string;
  color: string;
}

const CATEGORIES_MENU_DATA: CategoryMenuItem[] = [
  {
    index: "01",
    name: "Optics",
    slug: "optics",
    descriptor: "Field & survey optics",
    color: "#059669",
  },
  {
    index: "02",
    name: "GPS",
    slug: "gps",
    descriptor: "Positioning & mapping equipment",
    color: "#2563EB",
  },
  {
    index: "03",
    name: "Night Vision",
    slug: "night-vision",
    descriptor: "Low-light & night observation",
    color: "#4F46E5",
  },
  {
    index: "04",
    name: "Thermal",
    slug: "thermal",
    descriptor: "Thermal observation & monitoring",
    color: "#EA580C",
  },
  {
    index: "05",
    name: "Geological Equipment",
    slug: "geological-equipment",
    descriptor: "Transits, rock picks & accessories",
    color: "#D97706",
  },
  {
    index: "06",
    name: "Camping Equipment",
    slug: "camping-equipment",
    descriptor: "Field outpost & expedition gear",
    color: "#65A30D",
  },
  {
    index: "07",
    name: "Weather Station",
    slug: "weather-station",
    descriptor: "Environmental monitoring",
    color: "#0284C7",
  },
  {
    index: "08",
    name: "Camera Trap",
    slug: "camera-trap",
    descriptor: "Wildlife camera traps & surveillance",
    color: "#16A34A",
  },
];

/**
 * DESKTOP CATEGORIES MEGA MENU — REDESIGN R1.2
 *
 * Streamlined premium website navigation with viewport-aware clamping:
 * - Reduced visual footprint (~560px width, sleek compact height)
 * - Guaranteed inside viewport at 1440px, 1280px, and 1024px desktop breakpoint
 * - 8 categories in 2 clean columns (number + name + concise descriptor)
 * - Minimal actions (Explore Equipment header + All Categories link)
 */
export function HeaderMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [panelLeftOffset, setPanelLeftOffset] = useState<number>(0);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isCategoriesActive =
    pathname.startsWith("/categories") || pathname.startsWith("/products");

  const updatePosition = useCallback(() => {
    if (!menuRef.current) return;
    const triggerRect = menuRef.current.getBoundingClientRect();
    const menuWidth = 560;
    const minMargin = 20; // 20px padding from viewport edge
    const viewportWidth = window.innerWidth;

    // Naturally align with left edge of trigger button (-12px optical offset)
    let desiredViewportLeft = triggerRect.left - 12;

    // Viewport clamp: prevent clipping right boundary
    if (desiredViewportLeft + menuWidth > viewportWidth - minMargin) {
      desiredViewportLeft = viewportWidth - minMargin - menuWidth;
    }

    // Viewport clamp: prevent clipping left boundary
    if (desiredViewportLeft < minMargin) {
      desiredViewportLeft = minMargin;
    }

    setPanelLeftOffset(desiredViewportLeft - triggerRect.left);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    updatePosition();
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

  // Close on click outside & Escape key; recalculate on resize/scroll
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
      updatePosition();
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, { passive: true });
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [isOpen, closeMenu, updatePosition]);

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
        onClick={() => {
          updatePosition();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="desktop-categories-megamenu"
        className={cn(
          "inline-flex items-center gap-1.5 py-2 px-1 text-[15px] font-sans font-medium tracking-[-0.01em] transition-colors focus-visible:outline-2 focus-visible:outline-accent select-none",
          isCategoriesActive
            ? "text-brand-green font-semibold"
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

      {/* Sleek, Viewport-Clamped Dropdown Panel */}
      {isOpen && (
        <div
          id="desktop-categories-megamenu"
          role="region"
          aria-label="Equipment Categories Menu"
          style={{
            left: `${panelLeftOffset}px`,
            width: "560px",
            maxWidth: "calc(100vw - 32px)",
          }}
          className="absolute top-full mt-2 bg-white border border-border/80 rounded-2xl shadow-xl z-50 overflow-hidden animate-megamenu before:content-[''] before:absolute before:-top-2 before:h-2 before:left-0 before:right-0 p-4 sm:p-5"
        >
          {/* Header Row: Explore Equipment + Direct All Categories Action */}
          <div className="flex items-center justify-between pb-3 mb-2.5 border-b border-border/70">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-green" />
              <h3 className="font-display font-semibold text-sm text-text-primary tracking-tight">
                Explore Equipment
              </h3>
              <span className="font-mono text-xs text-text-muted">
                (8 Disciplines)
              </span>
            </div>
            <Link
              href="/categories"
              onClick={closeMenu}
              className="group inline-flex items-center gap-1 font-sans text-xs font-semibold text-brand-green hover:text-brand-green-hover transition-colors"
            >
              <span>All Categories</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 ease-precision group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* 8 Categories in Clean 2-Column Grid */}
          <div className="grid grid-cols-2 gap-1.5">
            {CATEGORIES_MENU_DATA.map((cat) => {
              const isCatActive = pathname === `/categories/${cat.slug}`;

              return (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  onClick={closeMenu}
                  className={cn(
                    "group flex items-start gap-2.5 p-2 rounded-lg border transition-all duration-200 ease-precision",
                    isCatActive
                      ? "bg-brand-green/8 border-brand-green/30"
                      : "border-transparent hover:border-border/80 hover:bg-surface-secondary/70"
                  )}
                >
                  <span
                    className="font-mono text-xs font-semibold shrink-0 mt-0.5"
                    style={{ color: cat.color }}
                  >
                    {cat.index}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-[13px] font-semibold text-text-primary group-hover:text-brand-green transition-colors">
                        {cat.name}
                      </span>
                      <ArrowRight className="w-3 h-3 text-text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-precision" />
                    </div>
                    <span className="font-sans text-xs text-text-muted line-clamp-1 mt-0.5 block">
                      {cat.descriptor}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

