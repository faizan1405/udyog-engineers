import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center text-xs text-text-secondary py-3", className)}
    >
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link
            href="/"
            className="hover:text-text-primary transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-accent rounded-[2px] py-0.5"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight
                className="w-3.5 h-3.5 text-text-muted shrink-0"
                aria-hidden="true"
              />
              {isLast || !item.href ? (
                <span
                  className="font-medium text-text-primary truncate max-w-[200px] sm:max-w-xs"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-text-primary transition-colors hover:underline truncate max-w-[150px] sm:max-w-none focus-visible:outline-2 focus-visible:outline-accent rounded-[2px] py-0.5"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
