import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-display font-semibold transition-colors duration-200 ease-precision focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer tracking-[0.02em]";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 min-h-[36px] rounded-[2px] gap-1.5",
    md: "text-xs sm:text-sm px-4 py-2 min-h-[44px] rounded-[2px] gap-2",
    lg: "text-sm px-6 py-2.5 min-h-[48px] rounded-[2px] gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-accent text-white hover:bg-accent-hover focus-visible:outline-accent border border-accent shadow-xs",
    secondary:
      "bg-surface-secondary text-text-primary border border-border-strong hover:bg-surface-tertiary focus-visible:outline-accent",
    outline:
      "bg-transparent text-text-primary border border-border-strong hover:bg-surface-secondary focus-visible:outline-accent",
    ghost:
      "bg-transparent text-text-primary hover:bg-surface-secondary focus-visible:outline-accent",
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}
