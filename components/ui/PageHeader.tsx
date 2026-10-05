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
            <div className="flex items-center gap-2 font-mono text-xs text-accent-secondary tracking-wider uppercase mb-2.5 font-semibold">
              <span>{eyebrow}</span>
            </div>
          )}
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.75rem] text-text-primary tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed mt-3 max-w-xl">
              {subtitle}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </Container>
    </div>
  );
}
