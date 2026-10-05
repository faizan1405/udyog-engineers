import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-16 sm:py-24 lg:py-32 bg-background">
      <Container className="max-w-xl">
        <div className="border border-border bg-surface rounded-[2px] p-8 sm:p-12 text-center relative overflow-hidden shadow-[0_1px_3px_rgba(20,23,21,0.03)]">
          {/* Corner Crosshairs */}
          <span
            aria-hidden="true"
            className="absolute top-2.5 left-2.5 font-mono text-[10px] text-accent-secondary/50 select-none"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute top-2.5 right-2.5 font-mono text-[10px] text-accent-secondary/50 select-none"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute bottom-2.5 left-2.5 font-mono text-[10px] text-accent-secondary/50 select-none"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute bottom-2.5 right-2.5 font-mono text-[10px] text-accent-secondary/50 select-none"
          >
            +
          </span>

          <div className="w-12 h-12 rounded-[2px] bg-surface-secondary border border-border flex items-center justify-center mx-auto mb-4">
            <Compass className="w-6 h-6 text-accent-secondary" />
          </div>

          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-secondary mb-2">
            00 // ERROR 404 · DIRECTORY EXCEPTION
          </div>

          <h1 className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight">
            Page or Equipment Not Found
          </h1>

          <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed mt-3 max-w-md mx-auto">
            The requested catalogue page or equipment specification does not exist or has been relocated within the directory.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button href="/" variant="primary" size="md" className="w-full sm:w-auto">
              Back Home
            </Button>
            <Button href="/categories" variant="secondary" size="md" className="w-full sm:w-auto">
              Browse Categories
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-border-subtle flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-text-muted">
            <span>LOOKING FOR SPECIFIC INSTRUMENTS?</span>
            <Link href="/contact" className="text-accent hover:underline font-semibold">
              DIRECT INQUIRY →
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
