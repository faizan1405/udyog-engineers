import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import { getAllCategories } from "@/data/categories";
import { getCategoryTheme } from "@/config/categoryThemes";
import { assetPath } from "@/lib/utils";
import {
  ShieldCheck,
  Compass,
  Target,
  ArrowRight,
  Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Udyog Engineers",
  description:
    "Learn about Udyog Engineers — professionally managed organization delivering reliable, technically sound solutions to Government, PSU, and institutional sectors.",
  alternates: {
    canonical: "/about",
  },
};

const APPROACH_STEPS = [
  {
    index: "01",
    title: "Understand Requirements",
    description: "Understand the exact technical and operational requirement.",
    tag: "Requirement Analysis",
  },
  {
    index: "02",
    title: "Identify Suitable Technology",
    description: "Identify suitable products and technologies from reputed brands.",
    tag: "Brand Identification",
  },
  {
    index: "03",
    title: "Evaluate Specifications & Quality",
    description: "Evaluate quality, specifications, performance, and application suitability.",
    tag: "Technical Evaluation",
  },
  {
    index: "04",
    title: "Provide Complete Solutions",
    description: "Provide the right solution rather than simply supplying a product.",
    tag: "Solution Delivery",
  },
  {
    index: "05",
    title: "Technical Coordination & Support",
    description: "Support customers with professional coordination and technical assistance.",
    tag: "Professional Support",
  },
  {
    index: "06",
    title: "Build Long-Term Relationships",
    description: "Build long-term relationships based on trust, transparency, quality, and performance.",
    tag: "Trust & Integrity",
  },
];

export default function AboutPage() {
  const categories = getAllCategories();

  return (
    <div className="bg-background min-h-screen">
      <PageHeader
        eyebrow="Organization Profile"
        title="About UDYOG ENGINEERS INDIA"
        subtitle="Professionally managed organization providing reliable, technically sound, and application-oriented solutions."
        breadcrumbs={[{ label: "About" }]}
      />

      <Section variant="default" className="py-12 sm:py-16 lg:py-24">
        <Container className="space-y-16 sm:space-y-20 lg:space-y-24">
          {/* =========================================================================
              1. COMPANY STORY (ASYMMETRIC EDITORIAL LAYOUT)
             ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left 7 cols: Verified Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2.5 font-sans text-xs text-brand-green font-semibold">
                <Compass className="w-4 h-4 text-brand-green" />
                <span>Organization Profile &amp; Mission</span>
              </div>

              <h2 className="text-[30px] sm:text-[38px] md:text-[44px] lg:text-[48px] font-semibold font-display text-text-primary tracking-[-0.03em] leading-[1.12]">
                Bridging Advanced Technology with Practical Application
              </h2>

              <div className="space-y-4 font-sans text-[17px] sm:text-[18px] text-text-secondary leading-[1.7] max-w-[760px] pt-1">
                <p>
                  <strong className="text-text-primary font-semibold">{siteConfig.companyName}</strong> is a professionally managed organization led by <strong className="text-text-primary font-semibold">{siteConfig.leadership.name}</strong>, scholar and highly qualified professional, with a vision to provide reliable, technically sound, and application-oriented solutions to Government Departments, Semi-Government Organizations, Public Sector Undertakings (PSUs), and other institutional and industrial sectors.
                </p>
                <p>
                  With a strong emphasis on technical knowledge, quality, research, and innovation, {siteConfig.companyName} focuses on identifying and supplying products from reputed national and international brands that meet the specific technical and operational requirements of its customers.
                </p>
                <p>
                  Our vision is to bridge the gap between advanced technology and the practical requirements of Government and institutional organizations by offering the right products, appropriate technical solutions, and dependable support.
                </p>
                <p>
                  We believe that supplying a product is not enough. Our objective is to understand the customer&apos;s requirement, identify the appropriate technology or equipment, and provide a complete and proper solution based on quality, performance, reliability, and long-term value.
                </p>
              </div>
            </div>

            {/* Right 5 cols: Equipment Photography Showcase Plate */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-border/80 bg-surface shadow-md p-4 sm:p-5 group">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                  style={{
                    background: "radial-gradient(ellipse at 50% 50%, rgba(30,107,62,0.12) 0%, transparent 75%)",
                  }}
                />

                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-surface-secondary/40">
                  <Image
                    src={assetPath("/images/generated/home/environments/environment-survey.webp")}
                    alt="Precision Survey & Optical Field Operations"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-sans">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-brand-green/90 text-white font-medium text-[11px] mb-1">
                      Field Calibrated
                    </span>
                    <p className="font-display font-medium text-sm text-white/95">
                      Precision Survey &amp; Optical Instrumentation
                    </p>
                  </div>
                </div>

                {/* Sub-card highlights */}
                <div className="mt-4 pt-3 border-t border-border/70 grid grid-cols-2 gap-3 text-xs font-sans">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Building2 className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Government &amp; PSU Supply</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <ShieldCheck className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Verified Standards</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              2. STRATEGIC VISION (WARM EDITORIAL BANNER)
             ========================================================================= */}
          <div className="relative rounded-2xl border border-border/80 bg-surface-secondary/60 p-8 sm:p-12 overflow-hidden shadow-xs">
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 w-64 h-64 rounded-full pointer-events-none opacity-20"
              style={{
                background: "radial-gradient(circle, rgba(230,174,34,0.3) 0%, transparent 70%)",
              }}
            />

            <div className="max-w-4xl space-y-4">
              <div className="flex items-center gap-2 font-sans text-xs text-brand-green font-semibold">
                <Target className="w-4 h-4 text-brand-green" />
                <span>Strategic Direction</span>
              </div>

              <h3 className="font-display font-semibold text-2xl sm:text-3xl lg:text-4xl text-text-primary tracking-[-0.025em]">
                Our Vision
              </h3>

              <p className="font-sans text-[18px] sm:text-[20px] text-text-primary leading-[1.65] font-normal pt-1">
                To become a trusted technology and engineering solutions partner for Government, PSU, Semi-Government, industrial and institutional organizations by representing reputed brands and delivering technically appropriate, reliable, and cost-effective solutions.
              </p>
            </div>
          </div>

          {/* =========================================================================
              3. OUR APPROACH (6 CONNECTED EDITORIAL CARDS)
             ========================================================================= */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border/80 pb-4 gap-2">
              <div>
                <span className="font-sans text-xs text-brand-green block font-semibold">
                  Guiding Principles
                </span>
                <h3 className="font-display font-semibold text-2xl sm:text-3xl text-text-primary mt-1 tracking-[-0.025em]">
                  Our Approach
                </h3>
              </div>
              <span className="font-sans text-xs text-text-muted">
                6 Core Methodological Steps
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {APPROACH_STEPS.map((step) => (
                <div
                  key={step.index}
                  className="p-6 sm:p-7 border border-border/80 bg-surface rounded-2xl flex flex-col justify-between shadow-xs hover:border-brand-green/50 hover:shadow-sm transition-all duration-300 relative group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20">
                        {step.index}
                      </span>
                      <span className="font-sans text-xs font-medium text-text-muted">
                        {step.tag}
                      </span>
                    </div>

                    <h4 className="font-display font-semibold text-text-primary text-lg tracking-[-0.02em] mb-2.5 group-hover:text-brand-green transition-colors">
                      {step.title}
                    </h4>

                    <p className="font-sans text-sm sm:text-[15px] text-text-secondary leading-[1.65]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =========================================================================
              4. LEADERSHIP SECTION (AUTHORITATIVE MONOGRAM & VERIFIED STATEMENT)
             ========================================================================= */}
          <div className="border border-border/80 bg-surface rounded-2xl p-8 sm:p-12 shadow-sm relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 w-80 h-80 pointer-events-none opacity-15"
              style={{
                background: "radial-gradient(circle at top right, rgba(30,107,62,0.2) 0%, transparent 70%)",
              }}
            />

            <div className="max-w-4xl space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-border/70">
                {/* Monogram Emblem (Verified Leadership — No Fake Photo) */}
                <div className="w-16 h-16 rounded-2xl bg-brand-green text-white font-display font-semibold text-xl flex items-center justify-center shrink-0 shadow-sm border border-brand-green/30">
                  AS
                </div>
                <div>
                  <div className="font-sans text-xs text-brand-green font-semibold">
                    Organization Leadership
                  </div>
                  <h3 className="font-display font-semibold text-2xl sm:text-3xl text-text-primary tracking-[-0.025em] mt-0.5">
                    {siteConfig.leadership.name}
                  </h3>
                  <span className="font-sans text-xs text-text-muted">
                    Scholar &amp; Highly Qualified Professional · Leadership
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <p className="font-sans text-[17px] sm:text-[18px] text-text-secondary leading-[1.7] max-w-[760px]">
                  {siteConfig.leadership.statement}
                </p>
              </div>
            </div>
          </div>

          {/* =========================================================================
              5. SCOPE OF EQUIPMENT DISCIPLINES (8 CATEGORIES GRID PREVIEW)
             ========================================================================= */}
          <div className="p-8 sm:p-10 border border-border/80 bg-surface-secondary/40 rounded-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
              <div>
                <span className="font-sans text-xs text-brand-green block font-semibold">
                  Equipment Portfolio Scope
                </span>
                <h3 className="font-display font-semibold text-xl sm:text-2xl text-text-primary mt-0.5 tracking-[-0.02em]">
                  8 Disciplines We Coordinate
                </h3>
              </div>
              <Link
                href="/categories"
                className="inline-flex items-center gap-1.5 font-sans font-semibold text-xs sm:text-sm text-brand-green hover:underline"
              >
                <span>View All Categories</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {categories.map((c) => {
                const theme = getCategoryTheme(c.slug);
                return (
                  <Link
                    key={c.slug}
                    href={`/categories/${c.slug}`}
                    className="p-4 bg-surface border border-border/70 rounded-xl hover:border-brand-green/40 hover:shadow-xs transition-all duration-200 group"
                  >
                    <span
                      className="font-mono text-xs font-semibold block mb-1"
                      style={{ color: theme.accent }}
                    >
                      {String(c.order).padStart(2, "0")}
                    </span>
                    <span className="font-display font-semibold text-text-primary text-[14px] group-hover:text-brand-green transition-colors tracking-tight line-clamp-1">
                      {c.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              6. DIRECT INQUIRY BRIDGE
             ========================================================================= */}
          <div className="p-8 sm:p-12 rounded-2xl border border-border/80 bg-surface shadow-sm relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 font-sans text-xs text-brand-green mb-2 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-brand-green" />
                  <span>Direct Procurement Coordination</span>
                </div>
                <h3 className="font-display font-semibold text-2xl sm:text-3xl text-text-primary tracking-[-0.025em]">
                  Have an Institutional or Project Inquiry?
                </h3>
                <p className="font-sans text-base text-text-secondary mt-3 leading-[1.65]">
                  Our team assists Government Departments, PSUs, research institutions, and industrial organizations with specifications, quotations, and datasheets.
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-green text-white font-sans font-semibold text-[15px] rounded-xl hover:bg-brand-green-hover transition-colors shadow-xs tracking-normal"
                >
                  <span>Send Equipment Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
