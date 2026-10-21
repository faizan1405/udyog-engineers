"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, ShieldCheck, Compass, Phone } from "lucide-react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { siteConfig } from "@/config/site";
import { buildWhatsAppInquiryUrl, isWhatsAppConfigured } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const MOBILE_CATEGORIES = [
  { index: "01", name: "Optics", slug: "optics" },
  { index: "02", name: "GPS", slug: "gps" },
  { index: "03", name: "Night Vision", slug: "night-vision" },
  { index: "04", name: "Thermal", slug: "thermal" },
  { index: "05", name: "Geological Equipment", slug: "geological-equipment" },
  { index: "06", name: "Camping Equipment", slug: "camping-equipment" },
  { index: "07", name: "Weather Station", slug: "weather-station" },
  { index: "08", name: "Camera Trap", slug: "camera-trap" },
];

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close menu on route change during render
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Products", href: "/products" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <div className="lg:hidden">
      {/* Mobile Menu Trigger Button (Min 48px touch target) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-drawer"
        aria-label={isOpen ? "Close main navigation" : "Open main navigation"}
        className="inline-flex items-center justify-center min-w-[48px] min-h-[48px] p-2.5 rounded-xl border border-border bg-surface text-text-primary hover:bg-surface-secondary focus-visible:outline-accent"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-text-primary" aria-hidden="true" />
        ) : (
          <Menu className="w-5 h-5 text-text-primary" aria-hidden="true" />
        )}
      </button>

      {/* Structured Mobile Drawer Panel */}
      {isOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
          className="fixed inset-0 top-[64px] sm:top-[68px] z-50 bg-background flex flex-col overflow-y-auto overscroll-contain overflow-x-hidden animate-mobile-drawer"
        >
          {/* Top Navigation Bar with Official Brand Logo */}
          <div className="flex items-center justify-between px-5 py-3 bg-surface border-b border-border">
            <BrandLogo size="sm" />
            <div className="text-right font-mono text-[10px] text-text-muted">
              <span className="text-accent-secondary font-semibold block">Catalogue</span>
              <span className="block">01–08 Disciplines</span>
            </div>
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between">
            {/* Primary Site Navigation */}
            <div>
              <div className="font-mono text-xs text-text-muted mb-2 font-medium">
                Navigation
              </div>
              <nav aria-label="Mobile Primary Navigation" className="flex flex-col space-y-1">
                {navLinks.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center justify-between min-h-[48px] px-3 rounded-[2px] border transition-colors",
                        isActive
                          ? "bg-surface border-accent-primary text-accent font-semibold"
                          : "border-transparent text-text-primary hover:bg-surface-secondary"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className="font-sans text-[15px] font-medium">
                        {item.title}
                      </span>
                      <ArrowRight className="w-4 h-4 text-text-muted" />
                    </Link>
                  );
                })}
              </nav>

              {/* 8 Equipment Categories Section */}
              <div className="mt-6 pt-5 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 font-mono text-xs text-accent-secondary font-semibold">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Equipment Categories (01–08)</span>
                  </div>
                  <Link
                    href="/categories"
                    onClick={() => setIsOpen(false)}
                    className="font-sans text-xs text-accent font-semibold hover:underline"
                  >
                    View All →
                  </Link>
                </div>

                <div className="flex flex-col space-y-1">
                  {MOBILE_CATEGORIES.map((cat) => {
                    const isCatActive = pathname === `/categories/${cat.slug}`;

                    return (
                      <Link
                        key={cat.slug}
                        href={`/categories/${cat.slug}`}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center justify-between min-h-[48px] px-3 rounded-[2px] border transition-colors",
                          isCatActive
                            ? "bg-surface-secondary border-accent-primary"
                            : "border-border/40 bg-surface/50 hover:bg-surface-secondary"
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <span className="font-mono text-xs text-accent-secondary font-semibold shrink-0">
                            {cat.index}
                          </span>
                          <span className="font-display text-sm font-semibold text-text-primary truncate">
                            {cat.name}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-text-muted shrink-0 ml-2" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Conversion Actions */}
            <div className="mt-8 pt-6 border-t border-border flex flex-col gap-3">
              <a
                href={buildWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] px-5 bg-accent-whatsapp text-white font-sans font-semibold text-[15px] rounded-xl hover:bg-emerald-700 transition-colors shadow-xs"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Inquire on WhatsApp</span>
              </a>

              {/* Concise Verified Contact Bar */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${siteConfig.contact.phones[0]?.international || siteConfig.contact.phone}`}
                  className="flex items-center justify-center gap-1.5 min-h-[44px] px-3 bg-surface border border-border rounded-[2px] font-sans text-xs sm:text-[13px] font-medium text-text-primary hover:text-accent transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  <span>{siteConfig.contact.phones[0]?.display || siteConfig.contact.phone}</span>
                </a>

                {isWhatsAppConfigured() && (
                  <a
                    href={buildWhatsAppInquiryUrl() || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 min-h-[44px] px-3 bg-accent-whatsapp text-white rounded-[2px] font-sans font-semibold text-xs sm:text-[13px] hover:brightness-95 transition-all shadow-xs"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>

              <Link
                href="/products"
                onClick={() => setIsOpen(false)}
                className="w-full inline-flex items-center justify-center min-h-[44px] px-5 bg-surface-secondary text-text-primary border border-border-strong font-sans font-semibold text-xs sm:text-[13px] rounded-[2px] hover:bg-surface-tertiary transition-colors"
              >
                <span>Explore Products</span>
              </Link>

              <div className="text-center font-mono text-[11px] text-text-muted mt-1 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-accent-secondary" />
                <span>Direct Technical Inquiry Coordination</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
