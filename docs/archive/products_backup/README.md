# Product Asset Architecture — Phase 6B Preparation

This directory defines the scalable asset repository for authentic product photography and technical imagery to be onboarded during **Phase 6B**.

---

## Scalable Directory Structure

Each production product onboarded in Phase 6B must receive an isolated directory matching its exact kebab-case product slug:

```text
public/images/products/
├── placeholder-product.svg        <-- Development placeholder for unpopulated records
├── README.md                      <-- This specification document
└── [product-slug]/                <-- Subfolder per product (e.g. "total-station-ts07")
    ├── hero.webp                  <-- Master hero view (Required)
    ├── front.webp                 <-- Frontal elevation / faceplate
    ├── side.webp                  <-- Lateral profile / depth view
    ├── detail-01.webp             <-- Macro detail: sensor / lens / reticle
    ├── detail-02.webp             <-- Macro detail: controls / interface / mount
    └── application.webp           <-- Verified in-situ field application photography
```

---

## Standard Image Slot Specifications

| Slot Name | Intended Perspective | Aspect Ratio | Min Resolution | Max Filesize | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `hero.webp` | 3/4 isometric perspective on clean / neutral background | 4:3 or 16:10 | 1200 × 900 px | 200 KB | Primary dossier canvas, catalogue grid card, Open Graph snippet |
| `front.webp` | Orthogonal frontal elevation | 4:3 | 1200 × 900 px | 180 KB | Gallery slot 1: control interface & optics inspection |
| `side.webp` | Orthogonal side / lateral elevation | 4:3 | 1200 × 900 px | 180 KB | Gallery slot 2: chassis ergonomics, port access, profile |
| `detail-01.webp` | Close-up macro photograph | 4:3 or 1:1 | 1000 × 1000 px | 150 KB | Gallery slot 3: optical graduation, sensor glass, vernier scales |
| `detail-02.webp` | Mechanical / electrical interface | 4:3 or 1:1 | 1000 × 1000 px | 150 KB | Gallery slot 4: battery bay, data ports (RS-232, USB, Bluetooth antenna) |
| `application.webp` | Field deployment / real use | 16:9 or 4:3 | 1280 × 720 px | 250 KB | Gallery slot 5 / Application dossier: authentic field usage context |

---

## Format & Quality Standards

1. **File Format**: Modern `.webp` is strictly required for production.
2. **Compression**: Lossy WebP with quality factor `82–86%` to preserve sharp edge acutance without visual banding.
3. **Color Space**: sRGB strictly. CMYK or non-standard color profiles must be converted prior to deployment.
4. **Transparency vs Background**:
   - Studio product imagery: Pure neutral light background (`#F4F3EE` / `#FFFFFF`) or transparent alpha channel.
   - Field imagery: Authentic environmental lighting without artificial HDR saturation.
5. **Prohibited Practices**:
   - **DO NOT** download random unverified imagery from Google Search.
   - **DO NOT** scrape third-party distributor websites with copyright watermarks.
   - **DO NOT** use AI-generated fantasy hardware illustrations.
   - Only use authentic client photography or verified manufacturer press-kit materials.
