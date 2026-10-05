import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { getAllProducts } from "@/data/products";
import { getAllCategories } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ProductCard } from "@/components/products/ProductCard";

export const metadata: Metadata = {
  title: "Equipment Catalogue & Products",
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
    <div>
      <PageHeader
        eyebrow="03 // EQUIPMENT CATALOGUE"
        title="Equipment Catalogue"
        subtitle="Explore specialized precision instruments, optical devices, and field equipment. All items are available for institutional inquiry and quotation."
        breadcrumbs={[{ label: "Products" }]}
      />

      <Section variant="default">
        <Container>
          {/* Category Filter Pills (Minimal Architecture) */}
          <div className="mb-8 pb-4 border-b border-border">
            <span className="font-mono text-xs uppercase tracking-wider text-text-muted block mb-2 font-semibold">
              Browse by Discipline:
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/categories/${c.slug}`}
                  className="px-3 py-1 bg-surface-secondary hover:bg-surface-tertiary border border-border text-xs text-text-secondary hover:text-text-primary rounded-[2px] transition-colors"
                >
                  <span className="font-mono text-[10px] text-accent-secondary mr-1.5">
                    {String(c.order).padStart(2, "0")}
                  </span>
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-border">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-accent-secondary uppercase tracking-wider mb-1 font-semibold">
                <span>03 // EQUIPMENT REGISTRY</span>
                <span className="text-border-strong">|</span>
                <span className="text-text-muted">ALL MODELS</span>
              </div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary">
                All Equipment Items ({products.length})
              </h2>
            </div>
            <span className="font-mono text-xs text-text-muted">
              INQUIRY // SHOWCASE MODE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bottom Multi-Discipline / Specialized Inquiry Bridge */}
          <div className="mt-16 p-6 sm:p-8 rounded-[2px] border border-border bg-surface relative overflow-hidden shadow-[0_1px_3px_rgba(20,23,21,0.03)]">
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
                  <span>CUSTOM OR SPECIALIZED REQUIREMENTS</span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary">
                  Need equipment not listed in the catalogue?
                </h3>
                <p className="font-sans text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
                  Share your required specifications, accuracy parameters, or intended application. The team can review availability and coordinate manufacturer documentation.
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
