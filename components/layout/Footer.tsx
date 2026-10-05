import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getAllCategories } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { ChevronUp, Mail, MapPin, Phone } from "lucide-react";

/**
 * FINAL HOMEPAGE & GLOBAL FOOTER (PHASE 4C)
 *
 * Premium light architectural footer.
 * Strict Light Mode adhering to DESIGN_SYSTEM.md.
 *
 * Includes:
 * - Brand Area with restrained positioning statement
 * - Complete index of all 8 primary equipment disciplines
 * - Essential site navigation
 * - Clean contact logic (only displays verified data; never fake/placeholder data)
 * - Restrained technical registration marks and light mode styling
 */
export function Footer() {
  const categories = getAllCategories();

  return (
    <footer className="mt-auto border-t border-border bg-surface-secondary text-text-secondary text-sm">
      {/* Top Registration Line */}
      <div className="border-b border-border-subtle py-3 bg-surface-secondary/80">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-text-muted">
            <div className="flex items-center gap-2">
              <span className="text-accent-secondary font-bold">+</span>
              <span className="tracking-wider uppercase text-text-secondary">
                UDYOG ENGINEERS // TECHNICAL INSTRUMENTATION ARCHIVE
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span>METROLOGY &amp; SURVEY</span>
              <span className="text-border-strong">|</span>
              <span className="text-text-secondary">LIGHT MODE SYSTEM</span>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Architectural Footer Grid */}
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand & Positioning Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block group" aria-label={`${siteConfig.companyName} Home`}>
              <BrandLogo size="lg" />
            </Link>

            <div className="font-display font-bold text-text-primary text-base tracking-tight">
              {siteConfig.companyName}
            </div>

            <p className="text-xs text-text-secondary leading-relaxed max-w-sm">
              {siteConfig.siteDescription}
            </p>

            <p className="text-[11px] text-text-muted leading-relaxed max-w-sm">
              Precision technical instrumentation catalogue for professional field, survey, optical, geological, environmental, and outdoor applications.
            </p>

            <div className="pt-2 text-[10px] font-mono text-text-muted flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
              <span>SPECIFICATION-FIRST ARCHITECTURE</span>
            </div>
          </div>

          {/* Equipment Disciplines: All 8 Categories (4 cols total: 2 cols + 2 cols) */}
          <div className="lg:col-span-4">
            <h2 className="text-xs font-mono font-semibold tracking-wider text-text-primary uppercase mb-4">
              Equipment Disciplines (01–08)
            </h2>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="group flex items-center gap-2 text-text-secondary hover:text-accent transition-colors duration-150 ease-precision py-0.5 min-w-0"
                >
                  <span className="font-mono text-[10px] text-accent-secondary group-hover:text-accent shrink-0">
                    {String(category.order).padStart(2, "0")}
                  </span>
                  <span className="group-hover:underline break-words leading-tight">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Column (2 cols) */}
          <div className="lg:col-span-2">
            <h2 className="text-xs font-mono font-semibold tracking-wider text-text-primary uppercase mb-4">
              Navigation
            </h2>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/"
                  className="hover:text-accent transition-colors duration-150 ease-precision hover:underline inline-block py-0.5"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-accent transition-colors duration-150 ease-precision hover:underline inline-block py-0.5"
                >
                  All Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="hover:text-accent transition-colors duration-150 ease-precision hover:underline inline-block py-0.5"
                >
                  Equipment Catalogue
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-accent transition-colors duration-150 ease-precision hover:underline inline-block py-0.5"
                >
                  About Udyog Engineers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-accent transition-colors duration-150 ease-precision hover:underline inline-block py-0.5"
                >
                  Contact &amp; Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Coordination / Contacts Column (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-xs font-mono font-semibold tracking-wider text-text-primary uppercase mb-4">
              Direct Inquiries
            </h2>

            <div className="space-y-3 text-xs">
              {/* Verified Email */}
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block">
                  Official Email
                </span>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-accent shrink-0" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="hover:text-accent transition-colors font-mono text-xs break-all"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              {/* Verified Phone & WhatsApp Lines */}
              <div className="space-y-1.5 pt-1">
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block">
                  Phone / WhatsApp
                </span>
                {siteConfig.contact.phones.map((p) => (
                  <div
                    key={p.national}
                    className="flex items-center justify-between gap-2 py-0.5"
                  >
                    <a
                      href={`tel:${p.international}`}
                      className="flex items-center gap-1.5 hover:text-accent font-mono text-xs text-text-primary transition-colors"
                      title={`Call ${p.display}`}
                    >
                      <Phone className="w-3 h-3 text-accent shrink-0" />
                      <span>{p.display}</span>
                    </a>
                    <a
                      href={buildWhatsAppInquiryUrl({}, p.whatsAppDigits) || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-whatsapp hover:opacity-85 transition-opacity p-0.5"
                      title={`Chat on WhatsApp (${p.display})`}
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>

              {/* Verified Address */}
              <div className="space-y-1 pt-1">
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block">
                  Registered Address
                </span>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                  <span className="text-text-secondary leading-relaxed text-xs">
                    {siteConfig.contact.address.formatted}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>
            &copy; {siteConfig.legal.copyrightYear} {siteConfig.siteName}. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>LIGHT MODE ARCHITECTURE</span>
            <span className="text-border-strong">·</span>
            <a
              href="#main-content"
              className="hover:text-text-primary transition-colors flex items-center gap-1"
            >
              <span>Back to Top</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
