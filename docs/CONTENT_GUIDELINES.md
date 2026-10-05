# Content Guidelines & Source-of-Truth Protocol

This document establishes the mandatory content standards for **Udyog Engineers**.
All development, copywriting, asset onboarding, and data entry must strictly adhere to these protocols.

---

## 1. Business Information

All corporate credentials, registration details, and contact coordination must originate directly from the client or verified official company records.

- **Source of Truth**: `config/site.ts` is the single source of truth for the entire application.
- **Verification Rule**: No phone numbers, email addresses, street addresses, GSTIN numbers, or legal registration codes may be assumed or invented.
- **Handling Missing Data**: Missing information must remain blank `""` in configuration. UI components must conditionally hide unconfigured channels rather than displaying broken links or placeholder strings.

---

## 2. Product Information

All technical specifications, dimensions, optical tolerances, and equipment highlights must originate from verified technical documents:

- **Approved Sources**:
  1. Official manufacturer datasheets (PDF).
  2. Official manufacturer web product specifications.
  3. Client-provided commercial product catalogues or quotation master sheets.
  4. Verified OEM supplier technical documentation.
- **Prohibited Sources**:
  - Competitor or third-party retailer marketing blurbs.
  - LLM-hallucinated or synthetic specification matrices.
  - Unverified forum or marketplace listings.

---

## 3. Product & Brand Images

All visual media across the catalogue must satisfy strict provenance verification:

- **Approved Image Sources**:
  1. Client-provided original hardware photography.
  2. Official manufacturer press kits, distributor media portals, or OEM approved asset packs.
  3. Properly licensed and permitted technical photography.
- **Prohibited Practices**:
  - **NEVER** use random Google Image search downloads.
  - **NEVER** use consumer stock photos with unrelated or generic equipment.
  - **NEVER** use watermarked competitor or distributor imagery.
  - **NEVER** use AI-generated fantasy hardware mockups.

---

## 4. Prohibited Commercial & Promotional Claims

To protect business reputation and regulatory compliance, the following claims must **NEVER** be invented:

| Category | Prohibited Inventions |
| :--- | :--- |
| **Experience & History** | Do not invent "established in 19XX", "over 25 years of excellence", or fictitious founding milestones. |
| **Client Metrics** | Do not invent "10,000+ satisfied clients", "trusted by 500+ research institutes", or fabricated testimonials. |
| **Geographic Reach** | Do not claim "pan-India network across 28 states" or "nationwide sales presence" unless explicitly documented. |
| **Partnership Status** | Do not claim "Sole Authorized Indian Distributor" or "Official Partner" without signed OEM agency agreements. |
| **Certifications** | Do not claim ISO-9001, CE, NABL, or BIS certifications unless genuine certificates are on file. |
| **Inventory & Stock** | Do not promise "ready stock", "immediate dispatch within 24 hours", or "in-stock guarantee". |
| **Warranty & Service** | Do not state "5-year comprehensive warranty" or "free lifetime calibration" unless formally documented. |
| **Response Timelines** | Do not promise "response within 1 hour" or "24/7 dedicated support" unless backed by formal SLAs. |

---

## 5. Content Status Model

Every data entity in the application (products, categories, company credentials) operates under a three-state verification lifecycle:

```text
[development-placeholder]  ──(Client Data Received)──>  [pending]  ──(Verified against Datasheet)──>  [verified]
```

### Status Definitions

1. **`development-placeholder`**:
   - Temporary structural data used strictly for layout rendering, route testing, and TypeScript schema validation.
   - Identified in code via `status: "development-placeholder"` and `isDemoPlaceholder: true`.
   - Strictly excluded from search engines (`noindex`, `nofollow`), sitemaps, production category lists, and structured data.

2. **`pending`**:
   - An authentic product or company field has been identified, but awaits client sign-off, official datasheet confirmation, or final high-resolution imagery.
   - Kept in staging or gated behind verification flags.

3. **`verified`**:
   - Data has been cross-referenced against official manufacturer datasheets or signed client approval.
   - Eligible for public search indexing, sitemap inclusion, and schema.org metadata generation.

---

## 6. Implementation Reference

- Type definition: `types/content.ts` (`ContentStatus`, `ContentRecordMeta`)
- Central configuration: `config/site.ts`
- Product repository: `data/products.ts`
- Category repository: `data/categories.ts`
