# UDYOG ENGINEERS — DESIGN SYSTEM & VISUAL IDENTITY SYSTEM
**Status:** Approved Architectural Document  
**Version:** 1.0.0  
**Phase:** Phase 3 — Visual Identity System  
**Mode:** Strict Light Mode Only  

---

## 1. BRAND PERSONALITY & POSITIONING

### Visual Positioning Statement
> **"A precision technical instrumentation catalogue reimagined as a modern, tactile, editorial showcase for professional field, survey, optical, geological, environmental, and outdoor equipment."**

Udyog Engineers represents high-caliber engineering, metrology, and professional exploration. The brand identity balances scientific rigor, field-tested dependability, and editorial sophistication.

### Core Brand Pillars

1. **Precision & Metrology:**  
   Every element reflects calibration, optical clarity, accuracy, and engineering standards. The interface feels calibrated rather than decorated.
2. **Field-Tested Utility:**  
   Grounded in physical reality—earth, topography, coordinates, optical lenses, and ruggedized casings. Never synthetic or artificial.
3. **Editorial Sophistication:**  
   Presented like a high-end European scientific journal or an archival equipment monograph. Controlled whitespace, deliberate typography, and high visual hierarchy.
4. **Institutional Authority:**  
   A specialized technical supplier, not a transactional retail shop. We do not persuade with sales gimmicks; we inform with datasheets, specifications, and direct engineer-to-engineer inquiries.

### Visual Spectrum
- **Technical** (not sterile)
- **Refined** (not luxurious or flashy)
- **Authoritative** (not intimidating)
- **Field-Ready** (not tactical/military)
- **Editorial** (not template-driven)

---

## 2. COLOR SYSTEM (LIGHT MODE ONLY)

The design system operates **strictly in Light Mode**. Precision measurement equipment, field survey logs, and optical catalogues rely on high-contrast daylight readability and paper-like clarity.

### Semantic Color Tokens

| Token | HEX Code | CSS Variable | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `#F8F7F4` | `--background` | Warm Alabaster / Chalk Sand. Anti-glare, tactile base canvas resembling heavy archival paper. |
| **Surface Pure** | `#FFFFFF` | `--surface` | Pure Studio White. Used for isolated product pedestals, focused cards, and high-clarity focal modules. |
| **Surface Secondary** | `#F2F0EB` | `--surface-secondary` | Soft Limestone / Raw Sand. Alternating sections, spec panels, and card wells. |
| **Surface Tertiary** | `#E8E5DC` | `--surface-tertiary` | Tamped Sandstone. Spec table headers, badge backdrops, subtle hover fills. |
| **Surface Elevated** | `#FFFFFF` | `--surface-elevated` | Raised flyouts, dropdowns, sticky headers, and mobile navigation overlays. |
| **Text Primary** | `#141715` | `--text-primary` | Deep Technical Graphite. High-contrast typography without the harshness of pure black. |
| **Text Secondary** | `#4D544F` | `--text-secondary` | Weathered Charcoal. Long-form descriptions, section narratives, body copy. |
| **Text Muted** | `#7C837E` | `--text-muted` | Field Slate. Metadata tags, model numbers, coordinates, and subtle labels. |
| **Border Hairline** | `#E2DFD6` | `--border` | 1px architectural dividers, card perimeters, technical grid rules. |
| **Border Subtle** | `#EFECE5` | `--border-subtle` | Micro-dividers within dense data tables and nested cards. |
| **Border Strong** | `#CBC7BA` | `--border-strong` | Active state borders, focused cards, input borders, and primary dividers. |
| **Primary Accent** | `#1E3A2F` | `--accent-primary` | Deep Alpine Moss. Sophisticated, restrained field green. **Must NOT dominate the page.** |
| **Primary Accent Hover** | `#152A22` | `--accent-hover` | Deep Forest Shadow. Hover state for primary buttons and active indicators. |
| **Primary Accent Muted**| `#E8EFEB` | `--accent-muted` | Pale Moss Tint. Subtle badge backgrounds, active navigation markers. |
| **Secondary Accent** | `#9C824A` | `--accent-secondary` | Aged Compass Brass / Instrument Bronze. Matte metallic tone evoking vernier dials and compass bezels. |
| **Secondary Accent Hover**| `#826C3C` | `--accent-secondary-hover`| Burnished Bronze. Hover states for secondary highlights. |
| **Secondary Accent Muted**| `#F5F1E6` | `--accent-secondary-muted`| Sandstone Gold Parchment. Spec highlight chips and reference badges. |
| **Contextual WhatsApp** | `#1D7349` | `--accent-whatsapp` | Subdued Tactical Green. Professional, non-neon WhatsApp conversion touchpoints. |
| **Focus Ring** | `#1E3A2F` | `--ring` | 2px accessible focus outline. |

### Color Usage Ratios
- **65% Canvas & Soft Neutral Surfaces** (`#F8F7F4`, `#FFFFFF`, `#F2F0EB`)
- **25% High-Contrast Technical Typography & Borders** (`#141715`, `#4D544F`, `#E2DFD6`)
- **7% Primary Field Accent** (`#1E3A2F` — buttons, key links, active badges)
- **3% Secondary Brass Accent** (`#9C824A` — model tags, precision markers, technical highlights)

---

## 3. TYPOGRAPHY SYSTEM

The typography pairs clean geometric architectural stability with technical data legibility.

### Font Pairing
1. **Primary Display & Headings:** `Plus Jakarta Sans`  
   *Attributes:* Geometric clarity, structured letterforms, balanced modern proportions.  
   *Weights:* `600` (SemiBold), `700` (Bold), `800` (ExtraBold).
2. **Body & Reading Text:** `Inter`  
   *Attributes:* Maximum legibility at small sizes, neutral, transparent reading experience.  
   *Weights:* `400` (Regular), `500` (Medium).
3. **Technical & Specification Accent:** `JetBrains Mono`  
   *Attributes:* Fixed-width technical clarity. Used for model identifiers, telemetry, coordinates, and datasheet parameters.  
   *Weights:* `400` (Regular), `500` (Medium).

### Type Hierarchy Scale

| Role | Font Family | Size (Mobile / Desktop) | Weight | Letter Spacing | Line Height | Case / Style |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | Plus Jakarta Sans | `2.5rem` / `4.25rem` (68px) | 700 | `-0.03em` | `1.08` | Sentence case |
| **H1 (Page Title)** | Plus Jakarta Sans | `2.0rem` / `2.75rem` (44px) | 700 | `-0.025em`| `1.15` | Sentence case |
| **H2 (Section Header)** | Plus Jakarta Sans | `1.5rem` / `2.0rem` (32px) | 600 | `-0.02em` | `1.20` | Sentence case |
| **H3 (Card / Subsection)**| Plus Jakarta Sans | `1.125rem` / `1.25rem` (20px)| 600 | `-0.015em`| `1.30` | Sentence case |
| **Eyebrow / Category Tag**| JetBrains Mono | `0.75rem` (12px) | 500 | `+0.08em` | `1.40` | UPPERCASE |
| **Product Titles** | Plus Jakarta Sans | `1.0rem` / `1.125rem` (18px)| 600 | `-0.01em` | `1.35` | Sentence case |
| **Body (Editorial)** | Inter | `1.0rem` (16px) | 400 | `normal` | `1.65` | Sentence case |
| **Body (Standard/Card)**| Inter | `0.875rem` (14px) | 400 | `normal` | `1.55` | Sentence case |
| **Technical Specs / Data**| JetBrains Mono | `0.8125rem` (13px) | 400 / 500 | `+0.02em` | `1.45` | Monospace |
| **Button Labels** | Plus Jakarta Sans | `0.875rem` (14px) | 600 | `+0.02em` | `1.0` | Sentence case |
| **Micro Labels / Indices**| JetBrains Mono | `0.6875rem` (11px) | 500 | `+0.1em` | `1.2` | UPPERCASE |

---

## 4. GRID & LAYOUT LANGUAGE

### Philosophy: The Art-Directed Technical Folio
Standard B2B websites rely on monotonous, mechanical rows:
$$\text{Heading} \rightarrow \text{Paragraph} \rightarrow \text{3 Identical Cards}$$

Udyog Engineers breaks this template monotony with an **art-directed, asymmetric editorial layout** inspired by archival equipment dossiers and high-end technical catalogues.

### Architectural Rules
1. **12-Column Flexible Grid:**  
   Sections utilize asymmetric column splits (e.g., `7:5` split where an oversized product visual on the left is counterbalanced by an architectural spec sheet on the right).
2. **Alternating Visual Rhythm:**  
   Vary layout density between sections:
   - *Expansive Focus Section:* Open negative space, large isolated hero equipment plate, minimal typography.
   - *High-Density Instrumentation Section:* Structured grid of technical parameters, comparative matrices, and coordinate references.
3. **Controlled Overlaps:**  
   Product photography slightly overlapping structural divider lines or background stone pedestals by `24px` to `40px` creates tactile depth without tacky drop-shadows.
4. **Hairline Structural Framing:**  
   Sections are demarcated by fine 1px hairline rules (`border-t border-border`) with subtle corner registration crosshairs (`+`) or numeric index stamps (`01 // OVERVIEW`).

---

## 5. SHAPE LANGUAGE

The physical identity of precision instruments is defined by machined aluminum, calibrated glass, milled brass gears, and knurled grips.

### Geometry Guidelines
- **Corner Radii:**  
  - Standard Cards: `rounded-[2px]` to `rounded-sm` (4px max).
  - Badges & Metric Chips: `rounded-[2px]` or sharp `rounded-none`.
  - Buttons: Crisp `rounded-[3px]` or `rounded-sm`.
  - Image Pedestals: `rounded-[2px]`.
  - **Strictly Prohibited:** `rounded-2xl`, `rounded-3xl`, and bubbly pill containers.
- **Borders & Edges:**  
  - 1px crisp solid borders (`--border: #E2DFD6`).
  - Active or hover states transition border tone to `--border-strong: #CBC7BA` or `--accent: #1E3A2F`.
- **Elevation & Shadows:**  
  - **Zero heavy blur drop-shadows.**
  - Separation is achieved through surface contrast (`#FFFFFF` on `#F2F0EB`) and fine 1px hairline borders.
  - Ambient contact shadow: `0 1px 3px rgba(20, 23, 21, 0.04), 0 8px 20px -4px rgba(20, 23, 21, 0.03)`.

---

## 6. IMAGE DIRECTION

Product imagery is the centerpiece of the website. Every image must convey optical precision, physical mass, and uncompromising engineering quality.

### Photographic Standards
1. **Isolated Hardware on Warm Neutral Backdrops:**  
   Equipment isolated with crisp alpha channels or photographed directly on warm limestone/chalk backgrounds (`#F2F0EB` / `#F8F7F4`), grounded by a soft natural contact shadow.
2. **Macro Detail & Optical Clarity:**  
   Close-ups highlighting:
   - Multi-coated objective lenses with emerald/violet reflections.
   - Knurled diopter adjustment rings.
   - Anodized aluminum housing and IPX-rated weather seals.
   - Laser-engraved azimuth marks and metric scales.
3. **Consistent Lighting:**  
   Soft directional daylight studio lighting (45-degree angle). No colored neon lighting, high-contrast digital flares, or artificial CGI glows.
4. **Contextual & Field Imagery (When Applicable):**  
   Only authentic documentary photography of high-altitude surveys, geological strata, meteorological towers, or dense canopy forestry.  
   **Banned:** Generic stock models, smiling office workers, random hikers, laptop coffee shops, or industrial smokestacks.

---

## 7. TECHNICAL GRAPHIC LANGUAGE

Subtle, non-distracting graphic notations ground the website in genuine scientific instrumentation.

### Allowable Decorative Elements (Opacity 20% – 40%)
- **Grid Crosshairs:** Minimal hairline `+` markers placed at grid intersections and image corners.
- **Geographic & Grid Coordinates:** Monospace coordinates marking sections (e.g., `LAT 28°38'12"N · LON 77°13'45"E`).
- **Index Counters:** Two-digit index numerals (`01 / 08`, `02 / 08`) set in `JetBrains Mono`.
- **Compass & Azimuth Ticks:** Minimalist degree lines (`0° · 90° · 180° · 270°`) or vernier scale ticks on dividers.
- **Document Reference Stamps:** Subtle technical reference markers (e.g., `DOC.REF // UE-SPEC-2026`).
- **Rule of Restraint:** Use no more than 1–2 technical elements per section viewport. They must whisper, never shout.

---

## 8. CATEGORY VISUAL SYSTEM (8 CATEGORIES)

The 8 core categories are:
1. **Optics**
2. **GPS**
3. **Night Vision**
4. **Thermal**
5. **Geological Compass**
6. **Camping Equipment**
7. **Weather Station**
8. **Forestry Items**

### Concept: "The Curated Field Portfolios"
Instead of a generic 4-column e-commerce grid, categories are presented as **curated technical portfolios**.

### Visual Structure
- **Asymmetric Editorial Layout:**  
  A dynamic modular showcase highlighting primary categories with expansive architectural panels and secondary categories with structured technical blocks.
- **Block Anatomy:**
  - **Index Number:** `01` through `08` in `JetBrains Mono` (`text-accent-secondary`).
  - **Category Headline:** Bold, authoritative typography (`Plus Jakarta Sans`).
  - **Sub-Domain Classification:** e.g., `Optics — Precision Terrestrial Observation & Metrology`.
  - **Hero Equipment Visual:** Studio-isolated hero instrument on warm stone backdrop.
  - **Micro-Specifications Preview:** 2–3 key technological features (e.g., `ED Fluorite Glass · BaK-4 Prisms · Nitrogen Purged`).
  - **Directional Indicator:** Minimal hairline arrow (`→`) that shifts slightly on hover.
- **Hover State:**  
  Subtle `1.03x` optical zoom of the equipment image, border transition from `--border` to `--accent-primary`, and brass highlight on the index numeral.

---

## 9. PRODUCT VISUAL SYSTEM

### Concept: "The Technical Equipment Dossier"
Products are showcased as precision instruments, not consumer impulse items.

### Card & Detail Hierarchy
1. **Isolated Product Visual:** Clear, centered image on warm `#F2F0EB` pedestal.
2. **Taxonomy & Model Code:** Monospace identifier (e.g., `OPTICS // REF-ED82` or `THERM // TS-640PRO`).
3. **Product Name:** Strong, clean heading in `Plus Jakarta Sans`.
4. **Single Critical Specification Metric:** A high-value technical highlight (e.g., `Spectral: 8–14µm | NETD <25mK | Sensor: 640×512`).
5. **Primary Action Link:** `View Specifications →`.

### Strict B2B Purity (Anti-Patterns)
- **NO retail pricing** or currency tags.
- **NO star ratings** or review counts.
- **NO "Add to Cart"** or "Buy Now" buttons.
- **NO quantity selectors**.
- **NO discount percentages**, "Sale" stickers, or countdown timers.

---

## 10. BUTTON & CTA LANGUAGE

Buttons communicate precision, decisiveness, and tactile feedback.

### CTA Hierarchy

| Level | Action Label | Visual Treatment | Role & Context |
| :--- | :--- | :--- | :--- |
| **Primary** | `Explore Equipment`, `View Specifications` | Background: `--accent-primary` (`#1E3A2F`), Text: White, Border: 1px solid `#1E3A2F`, Radius: `rounded-[3px]`. Hover: `--accent-hover` (`#152A22`). | Main user journey actions. |
| **Secondary** | `Send Inquiry`, `Request Datasheet` | Background: `--surface-secondary` (`#F2F0EB`), Text: `--text-primary`, Border: 1px solid `--border-strong` (`#CBC7BA`). Hover: `--surface-tertiary`. | Inquiry workflow initiation. |
| **Contextual** | `Direct WhatsApp Inquiry` | Background: `--accent-whatsapp` (`#1D7349`), Text: White, Radius: `rounded-[3px]`, Lucide `MessageCircle` / WhatsApp icon. | Fast real-time procurement support. |
| **Ghost / Text** | `Download Datasheet [PDF] →` | Background: Transparent, Text: `--text-primary`, subtle underline on hover. | Contextual documentation links. |

---

## 11. MOTION LANGUAGE

### Philosophy: Mechanical Damping & Optical Smoothness
Motion reflects physical, calibrated hardware—such as the oiled resistance of a survey tripod fluid head or the smooth rotational friction of an optical focus barrel.

### Motion Principles
- **Duration:** Fast to moderate (`200ms` to `350ms`). Never sluggish.
- **Easing Curve:** Smooth deceleration: `cubic-bezier(0.16, 1, 0.3, 1)` (Zero overshoot, zero cartoon bounce).
- **Allowed Transitions:**
  - Masked line reveals on major headings (`overflow-hidden` slide-up).
  - Staggered entry for cards (`50ms` delay between siblings).
  - Gentle image scale on hover (`1.02x` to `1.03x` scale with smooth ease).
  - Subtle horizontal translations on directional arrows (`translate-x-1`).
  - Hairline progress or border draw animations.
- **Strictly Banned:**
  - Bouncy springs or rubber-band animations.
  - 3D card flips or perspective rotations.
  - Exaggerated scroll zoom-outs.
  - Excessive blur/frosted glass transitions across whole pages.

---

## 12. MOBILE DESIGN PRINCIPLES

Mobile viewports must feel like an ergonomic handheld field data collector, not a cramped desktop compromise.

### Mobile Rules
1. **Single-Column Editorial Rhythm:** Asymmetric desktop layouts reconfigure into strong vertical stacks with clear hierarchy.
2. **Horizontal Swipeable Equipment Strips:** Collections and category previews can use smooth touch-snap horizontal carousels with index markers (`01 / 06`).
3. **Touch Target Ergonomics:** All buttons, interactive rows, and navigation toggles have a minimum touch height of `48px`.
4. **Selective Decluttering:** High-frequency technical decorative ticks and background coordinate marks are suppressed on viewports `< 640px` to maintain pristine legibility.
5. **Sticky Action Dock:** A clean, minimal bottom dock provides instant access to `Inquiry Form` and `WhatsApp`, ensuring effortless conversions.
6. **Responsive Type Scaling:** Display typography scales gracefully using CSS `clamp()` to avoid awkward wrapping on 375px screens.

---

## 13. THINGS TO AVOID (THE "NEVER DO" LIST)

- **NEVER use Dark Mode:** The site is strictly Light Mode only.
- **NEVER let Green Dominate:** The primary accent (`#1E3A2F`) is an authoritative field accent, not a full-page wash. Udyog Engineers is not an environmental charity or forestry nursery.
- **NEVER use Industrial Clichés:** No hazard yellow/black diagonal warning stripes, no rusty grunge textures, no heavy construction tropes.
- **NEVER use Corporate Blue Gradients:** No generic Silicon Valley tech gradients or SaaS aesthetics.
- **NEVER use eCommerce Retail UI:** No carts, wishlists, checkout steps, strikethrough sale prices, or promotional banners.
- **NEVER use Large SaaS Card Radii:** Avoid `rounded-2xl` / `rounded-3xl` bubble containers and large pill buttons.
- **NEVER use Excessive Glassmorphism:** No frosted acrylic panels obscuring readability.
- **NEVER use Fake or Stock Content:** No stock photos of models pretending to look through binoculars, no fake testimonials, no fabricated certificates.
- **NEVER mimic Afforda Technologies:** Maintain an entirely unique, sovereign visual identity tailored exclusively for precision instruments.

---

## 14. NEXT IMPLEMENTATION ROADMAP
With Phase 3 complete and the Design System established:
- **Phase 4:** Navigation, Header & Footer visual refinement.
- **Phase 5:** Premium Homepage Architecture & Hero Experience.
- **Phase 6:** Category Portfolios & Equipment Exploration.
- **Phase 7:** Technical Product Detail Pages & Datasheet Display.
- **Phase 8:** Inquiry & WhatsApp Integration Polish.
