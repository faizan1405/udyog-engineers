import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Compass, ArrowRight, Home, Grid } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-16 sm:py-24 lg:py-32 bg-background min-h-[70vh]">
      <Container className="max-w-xl">
        <div className="border border-border/80 bg-surface rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-sm">
          {/* Subtle Ambient Radial Glow */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background: "radial-gradient(circle at 50% 30%, rgba(30,107,62,0.12) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mx-auto mb-5 shadow-xs">
              <Compass className="w-7 h-7 text-brand-green" />
            </div>

            <div className="font-sans text-xs font-semibold text-brand-green mb-2.5">
              Error 404 · Page Not Found
            </div>

            <h1 className="font-display font-semibold text-2xl sm:text-3xl lg:text-[34px] text-text-primary tracking-[-0.025em] leading-[1.15]">
              Equipment or Page Not Found
            </h1>

            <p className="font-sans text-sm sm:text-base text-text-secondary leading-[1.65] mt-3.5 max-w-md mx-auto">
              The requested equipment specification or page is not available at this link. It may have been relocated or updated.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-green text-white font-sans font-semibold text-[15px] rounded-xl hover:bg-brand-green-hover transition-colors shadow-xs tracking-normal"
              >
                <Home className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
              <Link
                href="/categories"
                className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 bg-surface-secondary border border-border/80 text-text-primary font-sans font-semibold text-[15px] rounded-xl hover:bg-surface-tertiary transition-colors tracking-normal"
              >
                <Grid className="w-4 h-4 text-brand-green" />
                <span>Browse Categories</span>
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-border/70 flex flex-wrap items-center justify-center gap-2 text-xs font-sans text-text-secondary">
              <span>Looking for specific equipment?</span>
              <Link href="/contact" className="text-brand-green hover:underline font-semibold inline-flex items-center gap-1">
                <span>Send Equipment Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
