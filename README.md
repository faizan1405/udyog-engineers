# Udyog Engineers

## Overview

**Website Type:**  
Premium product showcase / catalogue website for professional field, survey, optical, and technical equipment.

**Primary Categories:**
1. Optics
2. GPS
3. Night Vision
4. Thermal
5. Geological Compass
6. Camping Equipment
7. Weather Station
8. Forestry Items

---

## Core Project Principles

> **DESIGN FIRST → PRESENTATION SECOND → INQUIRY CONVERSION THIRD**

- **Light Mode Only:** The entire visual architecture and token system are strictly tailored for light mode.
- **Not eCommerce:** No shopping cart, no checkout, no customer accounts, no online payment gateways.
- **Inquiry Driven:** Direct conversions occur via structured inquiry forms and direct WhatsApp communication.
- **Independent Visual Identity:** Clean, technical, precise; must never resemble Afforda Technologies or generic corporate themes.
- **Authentic Information Only:** No invented business claims, fake testimonials, fabricated certifications, or synthetic specs. Unknown values remain marked as TODO.
- **Centralized Data:** All categories (`data/categories.ts`), products (`data/products.ts`), and configuration settings (`config/site.ts`) remain centralized and strongly typed.

---

## Tech Stack

- **Framework:** Next.js (App Router, React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with custom design tokens
- **Icons:** Lucide Icons
- **Animation Ready:** Framer Motion installed (reserved for tomorrow's visual polish)
- **Architecture:** Mobile-first, semantic HTML, server components by default

---

## Project Structure

```text
app/
  ├── about/
  ├── categories/
  │    └── [slug]/
  ├── contact/
  ├── products/
  │    └── [slug]/
  ├── globals.css
  ├── layout.tsx
  ├── not-found.tsx
  ├── page.tsx
  ├── robots.ts
  └── sitemap.ts
components/
  ├── layout/
  │    ├── Footer.tsx
  │    ├── Header.tsx
  │    └── MobileNavigation.tsx
  ├── products/
  │    ├── CategoryCard.tsx
  │    ├── ProductCard.tsx
  │    └── SpecificationTable.tsx
  ├── sections/
  └── ui/
       ├── AppImage.tsx
       ├── Breadcrumb.tsx
       ├── Button.tsx
       ├── Container.tsx
       ├── MotionWrapper.tsx
       ├── PageHeader.tsx
       └── Section.tsx
config/
  └── site.ts
data/
  ├── categories.ts
  └── products.ts
lib/
  ├── fonts.ts
  ├── seo.ts
  ├── utils.ts
  └── whatsapp.ts
public/
  └── images/
       ├── brand/
       ├── categories/
       ├── general/
       └── products/
types/
  ├── category.ts
  ├── index.ts
  ├── inquiry.ts
  └── product.ts
```

---

## Next Development Stage

Tomorrow's roadmap will focus on the creative presentation and user experience:

1. Final visual direction & token fine-tuning
2. Header & navigation refinement
3. Premium homepage design
4. Hero experience & precision instrument aesthetics
5. Category exploration experience
6. Featured products showcase
7. Product detail page design & datasheets
8. About page storytelling
9. Inquiry & contact workflow refinement
10. Mobile optimization & touch interactions
11. Subtle animations (staggers, scroll reveals, micro-interactions)
12. Final performance & SEO QA
