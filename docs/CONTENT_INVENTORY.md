# Authentic Business Content & Asset Inventory

This living inventory audits all business information, brand assets, category media, and product data.
It defines what is currently present as a development placeholder vs. what must be supplied by the client for Phase 6B and production deployment.

---

## 1. Company Information Inventory

| Item | Codebase Location | Current State | Required Client Information | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Official Company Name** | `config/site.ts` (`companyName`) | `"Udyog Engineers"` | Confirm legal registered business name | `[PENDING CLIENT CONFIRMATION]` |
| **Legal Entity Name** | `config/site.ts` (`legalName`) | Empty `""` | Legal name (e.g. Pvt Ltd, LLP, Partnership) | `[MISSING - PENDING CLIENT]` |
| **Official Logo (Vector)** | `public/images/brand/logo.svg` | Temporary SVG monogram | Master `.ai`, `.eps`, or clean `.svg` vector logo | `[MISSING - PENDING CLIENT]` |
| **Primary Phone** | `config/site.ts` (`contact.phone`) | Empty `""` | Official landline / office mobile number | `[MISSING - PENDING CLIENT]` |
| **Secondary Phone** | `config/site.ts` (`contact.secondaryPhone`) | Empty `""` | Alternate office / support contact | `[MISSING - PENDING CLIENT]` |
| **WhatsApp Number** | `config/site.ts` (`contact.whatsAppNumber`) | Empty `""` | Official business WhatsApp (with country code) | `[MISSING - PENDING CLIENT]` |
| **Official Email** | `config/site.ts` (`contact.email`) | Empty `""` | Corporate domain email (e.g. `info@...`) | `[MISSING - PENDING CLIENT]` |
| **Inquiry Mailbox** | `config/site.ts` (`inquiryRecipient.email`) | Empty `""` | Destination address for form inquiry routing | `[MISSING - PENDING CLIENT]` |
| **Full Physical Address** | `config/site.ts` (`contact.address`) | Empty `""` (India only) | Street, building, city, state, PIN code | `[MISSING - PENDING CLIENT]` |
| **Google Maps Location** | `config/site.ts` (`contact.googleMapsUrl`) | Empty `""` | Google Maps business profile URL | `[MISSING - PENDING CLIENT]` |
| **Official Web Domain** | `config/site.ts` (`domain`) | `process.env.NEXT_PUBLIC_SITE_URL` / fallback | Registered production domain (e.g. `.com`, `.in`) | `[PENDING CLIENT CONFIRMATION]` |
| **LinkedIn Profile** | `config/site.ts` (`socialLinks.linkedin`) | Empty `""` | Company LinkedIn URL | `[MISSING - PENDING CLIENT]` |
| **Twitter / X Profile** | `config/site.ts` (`socialLinks.twitter`) | Empty `""` | Official handle URL | `[MISSING - PENDING CLIENT]` |
| **Facebook Profile** | `config/site.ts` (`socialLinks.facebook`) | Empty `""` | Official page URL | `[MISSING - PENDING CLIENT]` |
| **Instagram Profile** | `config/site.ts` (`socialLinks.instagram`) | Empty `""` | Official profile URL | `[MISSING - PENDING CLIENT]` |
| **About Company Copy** | `app/about/page.tsx` | Neutral professional copy | Founding year, corporate history, leadership note | `[PENDING CLIENT COPY]` |
| **GSTIN / Tax ID** | `config/site.ts` (`legal.gstNumber`) | Empty `""` | GST number for formal quotation headers | `[MISSING - PENDING CLIENT]` |

---

## 2. Category Assets Inventory (8 Primary Disciplines)

| # | Discipline | Thumbnail Asset (600×450) | Hero Banner Asset (1440×630) | Description & Copy Status | Application Context Status |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **01** | **Optics** | `optics.svg` (Dev Stub) | `optics-hero.svg` (Dev Stub) | Structured draft | Verified draft (3 contexts) |
| **02** | **GPS** | `gps.svg` (Dev Stub) | `gps-hero.svg` (Dev Stub) | Structured draft | Verified draft (3 contexts) |
| **03** | **Night Vision** | `night-vision.svg` (Dev Stub) | `night-vision-hero.svg` (Dev Stub) | Structured draft | Verified draft (3 contexts) |
| **04** | **Thermal** | `thermal.svg` (Dev Stub) | `thermal-hero.svg` (Dev Stub) | Structured draft | Verified draft (3 contexts) |
| **05** | **Geological Compass** | `geological-compass.svg` (Dev Stub) | `geological-compass-hero.svg` (Dev Stub) | Structured draft | Verified draft (3 contexts) |
| **06** | **Camping Equipment** | `camping-equipment.svg` (Dev Stub) | `camping-equipment-hero.svg` (Dev Stub) | Structured draft | Verified draft (3 contexts) |
| **07** | **Weather Station** | `weather-station.svg` (Dev Stub) | `weather-station-hero.svg` (Dev Stub) | Structured draft | Verified draft (3 contexts) |
| **08** | **Forestry Items** | `forestry-items.svg` (Dev Stub) | `forestry-items-hero.svg` (Dev Stub) | Structured draft | Verified draft (3 contexts) |

*Action Required: 16 high-resolution WebP images needed from client / approved supplier media.*

---

## 3. Product Information Required for Phase 6B Onboarding

Real product onboarding commences in Phase 6B. Each real product will require the following structured fields:

| Field Name | Type | Description | Mandatory? |
| :--- | :--- | :--- | :-: |
| `id` | String | Unique slug identifier (e.g. `opt-nikon-x10`) | Yes |
| `name` | String | Official commercial equipment name | Yes |
| `slug` | String | URL kebab-case slug | Yes |
| `model` | String | Exact manufacturer model code | Yes |
| `manufacturer` | String | OEM Brand name (e.g. Nikon, Leica, Garmin, Brunton) | Recommended |
| `category` | String | Display category name (must match one of 8 disciplines) | Yes |
| `categorySlug` | String | Matching slug of one of 8 disciplines | Yes |
| `shortDescription` | String | 1–2 sentence metrology summary | Yes |
| `description` | String | Comprehensive technical overview & operational scope | Yes |
| `heroImage` | String | Path to `hero.webp` (min 1200×900 px) | Yes |
| `gallery` | String[] | Paths to `front.webp`, `side.webp`, `detail-01.webp`, etc. | Recommended |
| `highlights` | String[] | 3–5 bulleted technical differentiators | Yes |
| `specifications` | Array | Structured `label`, `value`, `unit`, and optional `group` | Yes (Min 5) |
| `features` | String[] | 3–6 key operational features | Yes |
| `applications` | String[] | 3–4 practical field deployment contexts | Yes |
| `datasheet` | String | Path to authentic manufacturer PDF in `public/datasheets/` | Highly Recommended |
| `relatedProducts` | String[] | Slugs of complementary or alternative instruments | Optional |
| `featured` | Boolean | True for curated homepage showcase items | Yes |
| `status` | String | Must be set to `"verified"` for production release | Yes |

---

## 4. Search Engine Optimization (SEO) Inventory

| Field | Location | Current State | Required Client Confirmation | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Official Domain** | `config/site.ts` | Staging URL / fallback | Final DNS domain confirmation | `[PENDING CLIENT CONFIRMATION]` |
| **Default Open Graph Image** | `public/images/brand/og-image.png` | None (Pending asset) | 1200×630 branded card | `[MISSING - PENDING CLIENT]` |
| **Final Site Description** | `config/site.ts` (`siteDescription`) | Structured generic technical copy | Client marketing sign-off | `[DRAFT IN PLACE]` |
| **Structured Data Organization** | `lib/seo.ts` | Dynamically excludes unconfigured fields | Real phone, address, and legal name | `[CONFIG-GATED]` |
| **Demo Product Safeguards** | `data/products.ts`, `app/products/[slug]/page.tsx` | Strictly `noindex`, excluded from sitemaps | Retained across all layers | `[VERIFIED SECURE]` |
