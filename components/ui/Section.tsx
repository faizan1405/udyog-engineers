import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  variant?: "default" | "surface" | "secondary";
  className?: string;
  children: React.ReactNode;
}

/**
 * Reusable Section component.
 * Mobile-first vertical rhythm and semantic wrapping.
 */
export function Section({
  as: Component = "section",
  variant = "default",
  className,
  children,
  ...props
}: SectionProps) {
  const variantStyles = {
    default: "bg-background",
    surface: "bg-surface",
    secondary: "bg-surface-secondary",
  };

  return (
    <Component
      className={cn(
        "py-10 md:py-16 lg:py-20",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
