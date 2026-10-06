import { Sora, DM_Sans, IBM_Plex_Mono } from "next/font/google";

/**
 * UDYOG ENGINEERS — TYPOGRAPHY SYSTEM T1
 *
 * DISPLAY / HEADINGS:
 * - Sora (Weights: 500, 600, 700)
 *   Editorial, premium, modern geometry for H1, H2, category titles, product names.
 *
 * BODY / UI:
 * - DM Sans (Weights: 400, 500, 600)
 *   Warm, sophisticated, highly legible type for paragraphs, navigation, buttons, forms, cards.
 *
 * TECHNICAL MICRO LABELS:
 * - IBM Plex Mono (Weights: 400, 500, 600)
 *   Restrained technical indexing (01–08), model numbers, micro telemetry.
 */

export const fontDisplay = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const fontBody = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});
