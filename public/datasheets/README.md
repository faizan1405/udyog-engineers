# Technical Datasheet Repository — Architecture & Guidelines

This directory is reserved for hosting authentic manufacturer-supplied technical PDF datasheets, product brochures, and metrology specifications.

---

## Directory Organization

Official datasheets may be organized using either of the following clean conventions:

```text
public/datasheets/
├── README.md                          <-- This guideline
└── [product-slug].pdf                 <-- Flat convention (e.g. "nikon-x-series-total-station.pdf")
```
or grouped by equipment discipline:
```text
public/datasheets/
├── optics/
│   └── [product-slug].pdf
├── thermal/
│   └── [product-slug].pdf
└── gps/
    └── [product-slug].pdf
```

---

## Data Model Integration

In `types/product.ts`, each product record supports the optional property:
```typescript
datasheet?: string; // Example: "/datasheets/nikon-x-series-total-station.pdf"
```

---

## Strict Technical Safety Rules

1. **NO FAKE OR PLACEHOLDER PDFS**
   - Under no circumstances should empty `.pdf` files, mock documents, or generic placeholder PDFs be created.
   - If an official datasheet is not available, leave `datasheet` unset / undefined.

2. **AUTOMATIC UI GAURDS**
   - The product detail page (`/products/[slug]`) dynamically evaluates `product.datasheet`.
   - **If present**: Displays a direct "Download Datasheet (PDF)" link pointing to the authentic document.
   - **If absent**: Displays "Available on Inquiry" without rendering a broken download button or non-functional trigger.

3. **AUTHENTICITY REQUIREMENTS**
   - Only upload official PDFs released directly by the original equipment manufacturer (OEM) or supplied directly by the client.
   - Strip any third-party distributor watermark stamps or promotional overlays prior to upload.
