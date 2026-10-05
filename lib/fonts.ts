import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

/**
 * TYPOGRAPHY FOUNDATION
 * - Display / Heading font: Plus Jakarta Sans (clean, geometric, architectural precision)
 * - Body font: Inter (highly legible technical/operational body type)
 * - Mono / Technical font: JetBrains Mono (precision coordinates, model codes, datasheets)
 */

export const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const fontDisplay = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});
