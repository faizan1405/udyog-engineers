import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { siteConfig } from "@/config/site";
import { getAllCategories } from "@/data/categories";
import { ShieldCheck, Compass, Target, ArrowRight, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
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
    tag: "REQUIREMENT ANALYSIS",
  },
  {
    index: "02",
    title: "Identify Suitable Technology",
    description: "Identify suitable products and technologies from reputed brands.",
    tag: "BRAND IDENTIFICATION",
  },
  {
    index: "03",
    title: "Evaluate Specifications & Quality",
    description: "Evaluate quality, specifications, performance, and application suitability.",
    tag: "TECHNICAL EVALUATION",
  },
  {
    index: "04",
    title: "Provide Complete Solutions",
    description: "Provide the right solution rather than simply supplying a product.",
    tag: "SOLUTION DELIVERY",
  },
  {
    index: "05",
    title: "Technical Coordination & Support",
    description: "Support customers with professional coordination and technical assistance.",
    tag: "PROFESSIONAL SUPPORT",
  },
  {
    index: "06",
    title: "Build Long-Term Relationships",
    description: "Build long-term relationships based on trust, transparency, quality, and performance.",
    tag: "TRUST & INTEGRITY",
  },
];

export default function AboutPage() {
  const categories = getAllCategories();

  return (
    <div>
      <PageHeader
        eyebrow="04 // COMPANY PROFILE"
        title="About Udyog Engineers"
        subtitle="Professionally managed organization providing reliable, technically sound, and application-oriented solutions."
        breadcrumbs={[{ label: "About" }]}
      />

      <Section variant="default" className="py-12 sm:py-16 lg:py-20">
        <Container className="max-w-4xl space-y-16">
          {/* =========================================================================
              1. COMPANY OVERVIEW (VERIFIED CLIENT COPY)
             ========================================================================= */}
          <div className="border border-border bg-surface rounded-[2px] p-6 sm:p-10 relative overflow-hidden shadow-[0_1px_3px_rgba(20,23,21,0.03)] space-y-6">
            <span
              aria-hidden="true"
              className="absolute top-2.5 right-2.5 font-mono text-[10px] text-accent-secondary/50 select-none"
            >
              +
            </span>

            {/* Brand Logo & Registration Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
              <BrandLogo size="lg" priority />
              <div className="text-left sm:text-right font-mono text-[10px] text-text-muted">
                <span className="text-accent-secondary font-semibold uppercase tracking-wider block">
                  01 // COMPANY OVERVIEW
                </span>
                <span>PROFESSIONALLY MANAGED ORGANIZATION</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-accent-secondary uppercase tracking-wider font-semibold">
                <Compass className="w-4 h-4" />
                <span>ORGANIZATION PROFILE &amp; MISSION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-text-primary tracking-tight">
                Bridging Advanced Technology with Practical Application
              </h2>
            </div>

            <div className="space-y-4 font-sans text-sm sm:text-base text-text-secondary leading-relaxed pt-2">
              <p>
                {siteConfig.companyName} is a professionally managed organization led by {siteConfig.leadership.name}, scholar and highly qualified professional, with a vision to provide reliable, technically sound, and application-oriented solutions to Government Departments, Semi-Government Organizations, Public Sector Undertakings (PSUs), and other institutional and industrial sectors.
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

          {/* =========================================================================
              2. OUR VISION (VERIFIED CLIENT COPY)
             ========================================================================= */}
          <div className="border border-border bg-surface-secondary/50 rounded-[2px] p-6 sm:p-10 relative overflow-hidden shadow-[0_1px_3px_rgba(20,23,21,0.02)]">
            <span
              aria-hidden="true"
              className="absolute top-2.5 right-2.5 font-mono text-[10px] text-accent-secondary/50 select-none"
            >
              +
            </span>

            <div className="border-l-2 border-accent pl-5 sm:pl-6 space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-accent-secondary uppercase tracking-wider font-semibold">
                <Target className="w-4 h-4" />
                <span>02 // STRATEGIC DIRECTION</span>
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary">
                Our Vision
              </h3>

              <p className="font-sans text-base sm:text-lg text-text-primary leading-relaxed font-normal">
                To become a trusted technology and engineering solutions partner for Government, PSU, Semi-Government, industrial and institutional organizations by representing reputed brands and delivering technically appropriate, reliable, and cost-effective solutions.
              </p>
            </div>
          </div>

          {/* =========================================================================
              3. OUR APPROACH (EDITORIAL / ARCHITECTURAL FORMAT)
             ========================================================================= */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-border pb-3 gap-2">
              <div>
                <span className="font-mono text-xs text-accent-secondary uppercase tracking-wider block font-semibold">
                  03 // METHODOLOGY &amp; EXECUTION
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary mt-0.5">
                  Our Approach
                </h3>
              </div>
              <span className="font-mono text-xs text-text-muted">
                06 GUIDING PROTOCOLS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {APPROACH_STEPS.map((step) => (
                <div
                  key={step.index}
                  className="p-5 sm:p-6 border border-border bg-surface rounded-[2px] flex flex-col justify-between shadow-[0_1px_2px_rgba(20,23,21,0.02)] relative group hover:border-accent transition-colors duration-150"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-2 right-2 font-mono text-[9px] text-accent-secondary/40 select-none"
                  >
                    +
                  </span>
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs font-bold text-accent-secondary">
                        {step.index} {"//"} 06
                      </span>
                      <span className="font-mono text-[9px] text-text-muted uppercase tracking-wider">
                        {step.tag}
                      </span>
                    </div>
                    <h4 className="font-display font-semibold text-text-primary text-base mb-2">
                      {step.title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* =========================================================================
              4. LEADERSHIP SECTION (VERIFIED CLIENT COPY)
             ========================================================================= */}
          <div className="border border-border bg-surface rounded-[2px] p-6 sm:p-8 relative overflow-hidden shadow-[0_1px_3px_rgba(20,23,21,0.02)]">
            <span
              aria-hidden="true"
              className="absolute top-2.5 right-2.5 font-mono text-[10px] text-accent-secondary/50 select-none"
            >
              +
            </span>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pb-4 border-b border-border-subtle mb-4">
              <div className="w-12 h-12 rounded-[2px] bg-surface-secondary border border-border flex items-center justify-center shrink-0">
                <UserCheck className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="font-mono text-[10px] text-accent-secondary uppercase tracking-wider font-semibold">
                  04 // LEADERSHIP &amp; GOVERNANCE
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-text-primary">
                  {siteConfig.leadership.name}
                </h3>
                <span className="font-mono text-xs text-text-muted">
                  Organization Leadership
                </span>
              </div>
            </div>

            <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed">
              {siteConfig.leadership.statement}
            </p>
          </div>

          {/* Scope of Equipment Disciplines */}
          <div className="p-6 sm:p-8 border border-border bg-surface-secondary/40 rounded-[2px] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
              <div>
                <span className="font-mono text-xs text-accent-secondary uppercase tracking-wider block font-semibold">
                  CATALOGUE SCOPE // 8 DISCIPLINES
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-text-primary mt-0.5">
                  Disciplines We Coordinate
                </h3>
              </div>
              <Link
                href="/categories"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-accent font-semibold hover:underline"
              >
                <span>View All Categories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/categories/${c.slug}`}
                  className="p-3 bg-surface border border-border rounded-[2px] text-xs hover:border-accent-primary hover:bg-surface-secondary transition-colors"
                >
                  <span className="font-mono text-[10px] text-accent-secondary block mb-0.5">
                    {String(c.order).padStart(2, "0")}
                  </span>
                  <span className="font-display font-semibold text-text-primary">
                    {c.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Direct Inquiry Bridge */}
          <div className="p-6 sm:p-8 rounded-[2px] border border-border bg-surface relative overflow-hidden shadow-[0_1px_3px_rgba(20,23,21,0.03)]">
            <span
              aria-hidden="true"
              className="absolute top-2 right-2 font-mono text-[10px] text-accent-secondary/50 select-none"
            >
              +
            </span>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 font-mono text-xs text-accent-secondary uppercase tracking-wider mb-1.5 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>DIRECT PROCUREMENT COORDINATION</span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary">
                  Have an Institutional or Project Inquiry?
                </h3>
                <p className="font-sans text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
                  Our team assists Government Departments, PSUs, research institutions, and industrial organizations with specifications, quotations, and datasheets.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/contact"
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-display font-semibold text-xs tracking-wider uppercase rounded-[2px] hover:bg-accent-hover transition-colors shadow-xs w-full sm:w-auto"
                >
                  <span>Send Equipment Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
