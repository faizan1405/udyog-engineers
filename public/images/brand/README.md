# Brand Asset Architecture — Udyog Engineers

This directory contains the central brand identity assets for the Udyog Engineers web platform.

## Asset Directory Map

| Asset Filename | Purpose | Target Format | Target Dimensions | Current Status |
| :--- | :--- | :--- | :--- | :--- |
| `logo.png` | Official Primary brand logo (Header & Footer) | PNG (Alpha RGBA) | 445 × 195 px | **OFFICIAL CLIENT LOGO (PHASE 6C)** |
| `logo@2x.png` | Retina/High-DPI brand mark | PNG (Alpha RGBA) | 890 × 390 px | **OFFICIAL CLIENT LOGO (PHASE 6C)** |
| `logo.svg` | Vector wrapper with embedded official logo | SVG | 445 × 195 px viewBox | **OFFICIAL CLIENT LOGO (PHASE 6C)** |
| `logo-original.png` | Official logo master crop (solid background) | PNG | 445 × 195 px | **OFFICIAL SOURCE CROP** |
| `logo-dark-text.svg` | Alternate brand mark for high-contrast / inverted surfaces | SVG (Vector) | 240 × 60 px viewBox | Pending Client Asset |
| `favicon.ico` | Browser address bar and bookmark favicon | ICO (16/32/48px) | Multi-resolution | Standard Staging Favicon |
| `og-image.png` | Open Graph social preview card (LinkedIn, WhatsApp, Twitter) | PNG / WebP | 1200 × 630 px | Pending Client Asset |
| `company-mark.svg` | Official registration seal / metrological crest (if applicable) | SVG (Vector) | Vector | Pending Client Asset |

---

## BRAND ASSET SPECIFICATIONS (PHASE 6C)

1. **OFFICIAL LOGO SOURCE OF TRUTH**
   - Sourced directly from official client asset (`media_1791188413037.jpg` / `logo.jpeg`).
   - Cleanly extracted with exact 445 × 195 proportions (2.28:1 aspect ratio).
   - High-precision alpha channel removes white card background while preserving all anti-aliased green lettering, cow sketch flourish, and golden "ENGINEERS INDIA" lettering.
   - Proportions strictly preserved without stretching, recoloring, or distortion.

2. **ASSET SPECIFICATIONS FOR CLIENT ONBOARDING**
   - **Vector Preferred**: SVG with clean bezier paths, outlines converted to curves (no un-embedded external fonts).
   - **Color Space**: sRGB adhering to brand standards (Deep Forest Slate `#1C352D`, Technical Warm Khaki `#9B824B`, Canvas Paper `#F4F3EE`).
   - **Aspect Ratio**: Standard horizontal lockup (approx. 4:1) for main header; 1:1 square lockup for icon mark.
   - **Transparency**: Transparent backgrounds for all SVG assets.
