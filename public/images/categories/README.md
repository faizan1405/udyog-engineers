# Category Asset Architecture & Replacement Inventory

This directory manages the visual assets for the **8 Primary Equipment Disciplines** of Udyog Engineers.

---

## Asset Naming Convention

For each category, two high-fidelity assets are required:

1. **Category Card Thumbnail** (`[slug].webp`):
   - **Aspect Ratio**: 4:3
   - **Recommended Dimensions**: 600 × 450 px
   - **Target Filesize**: < 90 KB
   - **Usage**: Category Showcase grid on Homepage (`/`), Category Directory index (`/categories`), and Mega Menu dropdowns.

2. **Category Hero Banner** (`[slug]-hero.webp`):
   - **Aspect Ratio**: 16:7 or 21:9 panoramic
   - **Recommended Dimensions**: 1440 × 630 px
   - **Target Filesize**: < 220 KB
   - **Usage**: Dynamic Category Detail Header (`/categories/[slug]`) and high-impact thematic plate.

---

## 8-Category Asset Replacement Inventory

| # | Discipline Slug | Category Name | Current Asset (Dev SVG) | Target Production Asset | Status |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **01** | `optics` | Optics | `optics.svg`<br>`optics-hero.svg` | `optics.webp`<br>`optics-hero.webp` | **Awaiting Official Photography** |
| **02** | `gps` | GPS | `gps.svg`<br>`gps-hero.svg` | `gps.webp`<br>`gps-hero.webp` | **Awaiting Official Photography** |
| **03** | `night-vision` | Night Vision | `night-vision.svg`<br>`night-vision-hero.svg` | `night-vision.webp`<br>`night-vision-hero.webp` | **Awaiting Official Photography** |
| **04** | `thermal` | Thermal | `thermal.svg`<br>`thermal-hero.svg` | `thermal.webp`<br>`thermal-hero.webp` | **Awaiting Official Photography** |
| **05** | `geological-compass` | Geological Compass | `geological-compass.svg`<br>`geological-compass-hero.svg` | `geological-compass.webp`<br>`geological-compass-hero.webp` | **Awaiting Official Photography** |
| **06** | `camping-equipment` | Camping Equipment | `camping-equipment.svg`<br>`camping-equipment-hero.svg` | `camping-equipment.webp`<br>`camping-equipment-hero.webp` | **Awaiting Official Photography** |
| **07** | `weather-station` | Weather Station | `weather-station.svg`<br>`weather-station-hero.svg` | `weather-station.webp`<br>`weather-station-hero.webp` | **Awaiting Official Photography** |
| **08** | `forestry-items` | Forestry Items | `forestry-items.svg`<br>`forestry-items-hero.svg` | `forestry-items.webp`<br>`forestry-items-hero.webp` | **Awaiting Official Photography** |

---

## Replacement Workflow

When authentic photography is supplied:
1. Optimize images to `.webp` format following the dimensions above.
2. Place files into `public/images/categories/[slug].webp` and `public/images/categories/[slug]-hero.webp`.
3. Update `data/categories.ts`:
   ```typescript
   image: "/images/categories/optics.webp",
   heroImage: "/images/categories/optics-hero.webp",
   status: "verified",
   ```
4. Verify rendering on both `/categories` and `/categories/[slug]`.
