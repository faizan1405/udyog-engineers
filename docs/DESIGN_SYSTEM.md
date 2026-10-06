# UDYOG ENGINEERS — DESIGN SYSTEM & VISUAL IDENTITY SPECIFICATION
**Version:** 2.0.0 (Redesign R1 — Premium Colorful Visual System & Motion Direction)  
**Status:** Approved Architectural Document  
**Mode:** Light-Mode First (Selective Isolated Contrast Sections Permitted)  

---

## 1. WHY THE OLD DESIGN DIRECTION WAS CHANGED

The initial website architecture was technically robust, responsive, and functionally sound. However, the client rejected the visual presentation for the following critical reasons:

1. **Overly Restrained & Sterile:** The palette relied almost entirely on chalk white, pale sand, and subdued grey-beige, creating an impression of an unrendered draft or an archival paper docket.
2. **Excessive Technical-Dossier Clutter:** Approximately 30–40% of the interface was dominated by engineering hairlines, corner registration crosshairs (`+`), monospace coordinate telemetry (`LAT 28°...`), reticle azimuth angles, and mock schematic stamps. Instead of inspiring confidence, it felt like an intimidating engineering manual or an internal government blueprint.
3. **Static Visual Experience:** Motion was overly dampened and cautious, lacking the dynamic energy and modern polish expected of a high-caliber equipment supplier.
4. **Lack of Category Excitement:** The 8 core product disciplines shared the exact same monochrome grey pedestal treatment, making it difficult for buyers to visually distinguish between optical instruments, GPS satellite units, thermal imagers, or weather arrays.

### The New Visual Positioning:
> **"Premium Technical Editorial × Modern Product Showcase × Dynamic Field Technology"**
- A high-end digital equipment showcase marrying corporate credibility with vivid, modern product presentation.
- Light-mode first, radiant, colorful, and engaging.
- Reduces technical decoration from 30–40% down to a tasteful 10–15% precision accent.

---

## 2. THE RICH COLOR SYSTEM

The visual system anchors itself on the official Udyog Engineers logo (Green + Golden Yellow) while introducing a sophisticated, expansive supporting palette.

### Core Brand Anchors (Derived from Official Logo)

| Token | HEX | Role & Usage |
| :--- | :--- | :--- |
| **Main Brand Green** | `#078C45` | Official logo green. Deep, energetic, professional. Primary CTAs, active states, key brand badges, focus rings. |
| **Brand Green Hover** | `#057037` | Deepened green state for button hovers and active links. |
| **Brand Green Muted** | `#E7F6ED` | Soft emerald tint for badge fills, category tags, and subtle button wells. |
| **Brand Golden Yellow** | `#E5A812` | Official logo golden yellow. Used selectively for index markers, highlights, hover pips, micro-accents. **Never used for body text.** |
| **Brand Yellow Muted** | `#FEF8E7` | Light golden parchment tint for feature badges and spec highlights. |

### Contrast & Supporting Palette

| Token | HEX | Role & Usage |
| :--- | :--- | :--- |
| **Deep Contrast Navy** | `#12202C` | Sophisticated blue-black navy replacing harsh pure black. Used for primary typography, authoritative headings, and high-impact dark contrast panels. |
| **Text Secondary Slate** | `#3D4F5E` | Refined slate for descriptions, specifications, and editorial body text. |
| **Text Muted Slate** | `#64748B` | Mid-tone slate for indices, labels, and secondary metadata. |
| **Cool Accent Teal** | `#198C96` / `#2A9FA8` | Restrained cyan/teal for meteorological, atmospheric, and satellite cues. |
| **Warm Accent Terracotta**| `#D66E3A` / `#C86B42` | Controlled warm orange for thermal signatures, heat indicators, and warnings. |
| **Contextual WhatsApp** | `#1D7349` | Direct procurement communication touchpoints. |

---

## 3. SECTION COLOR RHYTHM

To eliminate monotonous "white → beige → white" repetition, the layout adopts an intentional, rhythmic alternation of surface temperatures:

1. **Hero Introduction:** Warm White / Alabaster (`#FAF9F5`) layered with vibrant gradient lighting (emerald green aura `#078C45` + golden yellow warmth `#E5A812`).
2. **Category Showcase:** Cool Light-Blue / Sky Tint (`#F0F5F8`) creating an immediate visual break and framing the 8 colorful discipline cards.
3. **Featured Equipment:** Crisp Studio White (`#FFFFFF`) featuring bold product accent cards and category tags.
4. **Applications & Environments:** Soft Sage / Muted Field Green (`#F2F7F4`) with interactive environment panels.
5. **Why Udyog (Credibility):** Deep Navy Contrast Section (`#12202C`) as a single, powerful institutional anchor panel.
6. **Inquiry & Consultation:** Warm Sand / Golden Ivory (`#FAF8F2`) with high-contrast form fields.
7. **Footer:** Premium Dark Navy Surface (`#12202C`) or Crisp High-Contrast White with prominent official branding.

---

## 4. 8-CATEGORY COLOR IDENTITIES

Each of the 8 primary equipment domains possesses an individual accent system applied to index numerals, hover borders, micro-gradients, badge fills, and visual motifs:

| Category | Domain | Accent HEX | Light Wash | Border Tint | Visual Personality |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **01 Optics** | Terrestrial Observation & Metrology | `#059669` (Emerald) | `#ECFDF5` | `#A7F3D0` | Optical clarity, ED lens coatings, precision reticles |
| **02 GPS** | GNSS Geodetic Positioning | `#2563EB` (Blue) | `#EFF6FF` | `#BFDBFE` | Satellite constellations, RTK telemetry, coordinates |
| **03 Night Vision** | Electro-Optical Low-Light Systems | `#4F46E5` (Indigo) | `#EEF2FF` | `#C7D2FE` | Phosphor glow, image intensification, night surveillance |
| **04 Thermal** | Radiometric Thermography & Scopes | `#EA580C` (Flame Orange)| `#FFF7ED` | `#FED7AA` | Heat signatures, false-color spectra, infrared optics |
| **05 Geological Compass** | Stratum Strike & Dip Inclinometers | `#D97706` (Amber/Brass) | `#FFFBEB` | `#FDE68A` | Machined brass, magnetic azimuth, leveling vials |
| **06 Camping Equipment** | Field Expedition & Outpost Gear | `#65A30D` (Olive) | `#F7FEE7` | `#D9F99D` | Weatherproof shelter, anodized alloys, alpine field |
| **07 Weather Station** | Automated Meteorological Arrays | `#0284C7` (Cyan/Sky) | `#F0F9FF` | `#BAE6FD` | Anemometers, barometric sensors, telemetry towers |
| **08 Forestry Items** | Dendrometric Canopy & Tree Survey | `#16A34A` (Forest/Lime) | `#F0FDF4` | `#BBF7D0` | Tree calipers, increment borers, laser hypsometers |

*Usage Rule:* Category colors highlight card borders, index markers (`01`, `02`), tag pills, micro-gradients, and directional arrows. They do not overpower full page layouts.

---

## 5. TECHNICAL-DECORATION REDUCTION RULES

To shed the sterile "technical dossier" impression:

- **Target Reduction:** 30–40% decoration $\rightarrow$ **10–15% precision accent**.
- **REMOVED:**
  - Mock latitude/longitude coordinate strings.
  - Corner registration crosshairs (`+`) on every single box.
  - Fake telemetry stamps (`SCHEMATIC REF // 01`, `AXIS // X-01 · Y-02`).
  - Wireframe black/white schematic line drawings of instruments.
  - Overly dense monospace metadata bars spanning section headers.
- **RETAINED (Tactful Precision Accents):**
  - Clean two-digit monospace index badges (`01`, `02 / 08`).
  - Precise 1px borders with crisp 2–4px corner radii.
  - Authentic product specification pills (`ED Glass`, `<25mK NETD`, `RTK GNSS`).
  - Subtle hairline divider rules between visual blocks.

---

## 6. MOTION LANGUAGE & TOKENS

Motion is calibrated to feel energetic, fluid, and responsive without sluggish cinematic delays or bouncy cartoon springs.

### Timing Tokens

| Token | Duration | Application |
| :--- | :--- | :--- |
| `DURATION.micro` | `180ms – 250ms` (0.20s) | Micro-interactions, icon shifts, button active states, tab markers. |
| `DURATION.hover` | `250ms – 350ms` (0.28s) | Card lift, border color transitions, image scale, arrow translation. |
| `DURATION.headline`| `400ms – 550ms` (0.48s) | Hero heading line reveal, masked typography entrance. |
| `DURATION.reveal` | `400ms – 650ms` (0.50s) | Scroll reveals, section headers, content blocks. |
| `DURATION.heroPlate`| `500ms – 700ms` (0.60s) | Equipment plate entrance from right. |
| `DURATION.heroSequence`| `500ms – 800ms` (0.75s) | Full staggered entrance of the Hero introduction. |

### Easing Curves
- **Standard Damping:** `cubic-bezier(0.16, 1, 0.3, 1)` — immediate responsiveness with smooth, friction-braked deceleration. Zero overshoot.

### Scroll Reveal Library
1. **Reveal A (Up Reveal):** `opacity: 0 → 1`, `translateY: 30px → 0`.
2. **Reveal B (Side Reveal / Zig-Zag):** `opacity: 0 → 1`, `translateX: -40px / +40px → 0`. Alternating section directions establish visual rhythm.
3. **Reveal C (Mask Reveal):** `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)`.
4. **Reveal D (Scale Reveal):** `scale: 0.96 → 1`, `opacity: 0 → 1`.

### Accessibility: `prefers-reduced-motion`
When reduced motion is signaled:
- Transitions set to 0s duration.
- Mask and slide offsets removed.
- Full layout displays instantly without delays or transforms.

---

## 7. HOVER & INTERACTION SYSTEM

Category and product modules feature multi-layered tactile feedback on desktop:

1. **Card Elevation:** Smooth `translateY(-4px)` with depth shadow expansion.
2. **Image Zoom:** Equipment visual scales `1.03x` to `1.04x` within an `overflow-hidden` container.
3. **Accent Activation:** Card border transitions from neutral `--border` to category accent color.
4. **Micro-Gradient Flare:** Ambient gradient backdrop illuminates from 0% to 100% opacity.
5. **Arrow Slide:** Directional icon shifts `+4px` to `+6px` horizontally.
6. **Zero Layout Shift:** All transforms utilize GPU-accelerated CSS transforms.

---

## 8. BUTTON & CTA LANGUAGE

- **Primary Action ("Explore Products"):**
  - Background: Brand Green (`#078C45`).
  - Text: White.
  - Hover: Darker green (`#057037`) with smooth fill transition, subtle elevation, and arrow translation (`+4px`).
- **Secondary Action ("Send Inquiry"):**
  - Background: Neutral Surface Secondary (`#F3F5F7`).
  - Border: 1px solid `--border-strong` (`#CBD5E1`).
  - Hover: Surface Tertiary (`#E8ECEF`), border shifts to Navy (`#12202C`).
- **WhatsApp Action:**
  - Background: Official WhatsApp Green (`#1D7349`).
  - Direct real-time consultation modal / link.

---

---

## 10. TYPOGRAPHY REDESIGN T1 SPECIFICATION

### Core Pairing & Roles
- **Display / Headings (Sora):** 
  - Weights: `500`, `600`, `700` (Avoid excessive `800`/`900` bold).
  - Used for Hero H1, Inner Page H1, Section H2, H3, Category titles, Product names, Major CTA headings.
  - Tracking: Intentional negative tracking (`-0.045em` on Hero, `-0.035em` on H2/H1, `-0.02em` on H3).
  - Line Heights: Tight architectural leading (`0.98–1.02` Hero, `1.02–1.08` Section H2/Page H1).
- **Body & Interface (DM Sans):**
  - Weights: `400` (Regular), `500` (Medium), `600` (Semibold).
  - Used for paragraphs, navigation links, buttons, form controls, labels, cards, specifications, and supporting text.
  - Line Heights: Comfortable reading leading (`1.55–1.70`). Line length target: 60–75 characters.
- **Microcopy & Technical Telemetry (IBM Plex Mono):**
  - Weights: `400`, `500`, `600`.
  - Strictly restrained to 5–10% of visible text: category numbering (`01–08`), model codes, micro indices.
  - Tracking: Positive editorial tracking (`+0.04em` to `+0.06em`).

### Type Scales Summary
- **Hero H1:** Fluid `clamp(2.375rem, 5.5vw + 1rem, 5.125rem)` (38px mobile → 82px desktop), Sora 600, leading `1.0`.
- **Section H2:** `text-[32px] sm:text-[38px] md:text-[44px] lg:text-[54px]`, Sora 600, leading `1.05`, tracking `-0.035em`.
- **Inner Page H1:** `text-[36px] sm:text-[44px] md:text-[50px] lg:text-[58px]`, Sora 600, leading `1.05`, tracking `-0.035em`.
- **Category Titles:** Sora 600 (Feature: 32–38px, Horizontal: 24–28px, Compact: 22–24px).
- **Product Titles:** Sora 600 (Cards: 18–22px, Product Detail H1: 34–54px).
- **Navigation:** DM Sans 15px, weight 500 (normal) / 600 (active), tracking normal.
- **Buttons & CTAs:** DM Sans 15–16px, weight 600, natural title/sentence case (no monospace, no all-caps).
- **Body Paragraphs:** DM Sans 16px mobile, 17–18px desktop, leading 1.6–1.65.
- **Micro Tags:** IBM Plex Mono 10–12px, natural title case, tracking 0.04em.
