"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeaderMegaMenu } from "./HeaderMegaMenu";
import { MobileNavigation } from "./MobileNavigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 12) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-[background-color,border-color,box-shadow] duration-200 ease-precision",
        isScrolled
          ? "bg-surface/98 border-b border-border shadow-[0_1px_3px_rgba(20,23,21,0.03),0_6px_16px_-4px_rgba(20,23,21,0.02)]"
          : "bg-background border-b border-border-subtle"
      )}
    >
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-4 z-50 px-3 py-1.5 bg-accent text-white rounded-[2px] text-xs font-semibold"
      >
        Skip to main content
      </a>

      <Container className="flex h-16 sm:h-[68px] items-center justify-between">
        {/* Brand Area / Official Udyog Engineers Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="group flex items-center gap-3 text-text-primary transition-opacity hover:opacity-95"
            aria-label={`${siteConfig.companyName} Home`}
          >
            <BrandLogo size="md" priority />
            <span className="sr-only">{siteConfig.companyName}</span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Desktop Primary Navigation"
          className="hidden lg:flex items-center gap-8"
        >
          {/* Home Link */}
          <Link
            href="/"
            className={cn(
              "py-1 text-sm font-medium transition-colors",
              pathname === "/"
                ? "text-accent font-semibold"
                : "text-text-secondary hover:text-text-primary"
            )}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Home
          </Link>

          {/* 8-Category Refined Mega-Menu Dropdown */}
          <HeaderMegaMenu />

          {/* About & Contact Links */}
          {navLinks.slice(1).map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "py-1 text-sm font-medium transition-colors",
                  isActive
                    ? "text-accent font-semibold"
                    : "text-text-secondary hover:text-text-primary"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Mobile Trigger */}
        <div className="flex items-center gap-3">
          <Button
            href="/contact"
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex h-9 px-4 rounded-[2px] font-display font-semibold text-xs tracking-wide bg-accent hover:bg-accent-hover text-white transition-colors shadow-xs"
          >
            Send Inquiry
          </Button>

          {/* Mobile Navigation Drawer */}
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
