import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { getProductionProducts } from "@/data/products";
import { getAllCategories } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { ProductsCatalogueBrowser } from "@/components/products/ProductsCatalogueBrowser";

export const metadata: Metadata = {
  title: "Equipment Catalogue & Products | Udyog Engineers",
  description:
    "Comprehensive technical equipment catalogue covering optical, positioning, thermal, geological, and field survey instruments.",
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
  const products = getProductionProducts();
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
          <ProductsCatalogueBrowser products={products} categories={categories} />

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
