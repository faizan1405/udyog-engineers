import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { getAllProducts } from "@/data/products";
import { getAllCategories } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ProductCard } from "@/components/products/ProductCard";
import { getCategoryTheme } from "@/config/categoryThemes";

export const metadata: Metadata = {
  title: "Equipment Catalogue & Products | Udyog Engineers",
  description:
    "Comprehensive technical equipment catalogue covering optical, positioning, thermal, geological, and field survey instruments.",
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
  const products = getAllProducts();
  const categories = getAllCategories();

  return (
    <div className="bg-background min-h-screen">
      <PageHeader
        eyebrow="Equipment Catalogue"
        title="Equipment Catalogue"
        subtitle="Explore specialized precision instruments, optical devices, and field equipment. All items are available for institutional inquiry and quotation."
        breadcrumbs={[{ label: "Products" }]}
      />

      <Section variant="default" className="py-10 sm:py-14 lg:py-18">
        <Container>
          {/* Category Filter Pills */}
          <div className="mb-10 pb-5 border-b border-border/80">
            <span className="font-sans text-xs text-text-muted block mb-3 font-semibold uppercase tracking-wider">
              Browse by Discipline:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {categories.map((c) => {
                const theme = getCategoryTheme(c.slug);
                return (
                  <Link
                    key={c.slug}
                    href={`/categories/${c.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border/80 bg-surface text-xs font-sans font-medium text-text-secondary hover:text-text-primary hover:border-brand-green hover:shadow-2xs transition-all"
                  >
                    <span
                      className="font-mono text-[11px] font-semibold"
                      style={{ color: theme.accent }}
                    >
                      {String(c.order).padStart(2, "0")}
                    </span>
                    <span>{c.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-border/70">
            <div>
              <div className="flex items-center gap-2 font-sans text-xs text-brand-green mb-1 font-semibold">
                <span>Equipment Catalogue</span>
                <span className="text-border-strong">•</span>
                <span className="text-text-muted font-normal">All Disciplines</span>
              </div>
              <h2 className="font-display font-semibold text-2xl sm:text-3xl lg:text-4xl text-text-primary tracking-[-0.025em]">
                All Equipment Items ({products.length})
              </h2>
            </div>
            <span className="font-sans text-xs text-text-muted">
              Catalogue Overview · Direct Quotations
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bottom Specialized Requirement Bridge */}
          <div className="mt-16 p-8 sm:p-12 rounded-2xl border border-border/80 bg-surface shadow-xs relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 font-sans text-xs text-brand-green mb-2 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-brand-green" />
                  <span>Custom or Specialized Requirements</span>
                </div>
                <h3 className="font-display font-semibold text-2xl sm:text-3xl text-text-primary tracking-[-0.025em]">
                  Need equipment not listed in the catalogue?
                </h3>
                <p className="font-sans text-base text-text-secondary mt-2.5 leading-[1.65]">
                  Share your required specifications, accuracy parameters, or intended application. Our team can review availability and coordinate manufacturer documentation.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/contact"
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-green text-white font-sans font-semibold text-[15px] rounded-xl hover:bg-brand-green-hover transition-colors shadow-xs w-full sm:w-auto tracking-normal"
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
