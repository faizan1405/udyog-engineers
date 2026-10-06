import React from "react";
import { Container } from "./Container";
import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  eyebrow,
  breadcrumbs,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "border-b border-border bg-surface py-8 sm:py-12 lg:py-14 relative overflow-hidden",
        className
      )}
    >
      <Container>
        {breadcrumbs && <Breadcrumb items={breadcrumbs} className="mb-4 sm:mb-6" />}
        <div className="max-w-3xl">
          {eyebrow && (
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-accent-secondary tracking-[0.04em] mb-2.5 font-semibold">
              <span>{eyebrow}</span>
            </div>
          )}
          <h1 className="font-display font-semibold text-[36px] sm:text-[44px] md:text-[50px] lg:text-[58px] text-text-primary tracking-[-0.035em] leading-[1.05]">
            {title}
          </h1>
          {subtitle && (
            <p className="font-sans text-base sm:text-lg text-text-secondary leading-[1.6] mt-3.5 max-w-2xl">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </Container>
    </div>
  );
}
