# Udyog Engineers — Image Generation Prompts & Style Guide
**Version:** R1.3 — Photorealistic AI Product Visual Placeholders  
**Standard:** Professional Studio Equipment Photography

---

## 1. Global Visual Direction & Guidelines

All imagery follows a unified commercial catalogue photography standard:
- **Style:** Professional B2B equipment studio photography
- **Lighting:** Soft diffuse studio lighting, crisp metallic & optical highlights, gentle contact shadows
- **Backdrop:** Light neutral / off-white cyc (`#F8F9FA` to `#E9ECEF`), clean negative space
- **Look:** Realistic, premium, clean, sharp, modern, commercial B2B catalogue quality
- **Aspect Ratio & Resolution:** 4:3 landscape ratio, 1200 × 900 resolution, `.webp` format
- **Commercial Neutrality:** Category-appropriate hardware with NO fake brand logos, NO fake telemetry HUDs, NO made-up certification stamps, NO text baked into image.

---

## 2. Equipment Visual Prompts

### 00. Homepage Hero — Survey Optical Instrument
- **File:** `public/images/generated/hero/hero-optical-instrument.webp`
- **Component:** `HeroEquipmentPlate.tsx` (`<HeroEquipmentPlate />`)
- **Subject:** Professional digital total station / optical survey theodolite
- **Prompt:**
  ```text
  Professional studio product photograph of a modern electronic total station surveying theodolite instrument. Heavy-duty textured matte dark grey and brushed titanium magnesium alloy housing, multi-element emerald-green multi-coated large optical objective lens reflecting studio softbox light, integrated backlit monochrome LCD alphanumeric status display, rugged rubberized control buttons, horizontal and vertical precision tangent screws with brass knurled rings, three-point tribrach leveling base with round circular spirit vial and leveling foot screws. Centered 3/4 beauty angle composition, resting on a clean off-white studio cyclorama floor with a soft diffuse contact shadow underneath. Pure catalogue photography, sharp focus, neutral commercial lighting, 8k resolution, no logos, no text overlays, no HUD telemetry.
  ```

---

### 01. Category 01 — Optics
- **File:** `public/images/generated/categories/category-optics.webp`
- **Component:** `CategoryShowcase.tsx` (`slug="optics"`)
- **Subject:** Field binoculars / survey optics instrument
- **Prompt:**
  ```text
  High-end commercial product photograph of professional field roof-prism binoculars. Textured ergonomic dark slate rubber-armored chassis with knurled aluminum central focus wheel, diopter adjustment ring, multi-coated deep green anti-reflective optical glass objective lenses with violet reflections, twist-up rubber eyecups. Centered isometric studio product shot on a clean off-white studio backdrop, crisp studio highlights, gentle realistic contact shadow, premium B2B optics catalogue quality, no logos, no printed text.
  ```

---

### 02. Category 02 — GPS
- **File:** `public/images/generated/categories/category-gps.webp`
- **Component:** `CategoryShowcase.tsx` (`slug="gps"`)
- **Subject:** Rugged handheld GPS / GNSS geospatial receiver
- **Prompt:**
  ```text
  Commercial studio product photograph of a rugged handheld GNSS field survey receiver. Impact-resistant dark graphite rubberized housing with reinforced shock-absorbing yellow corner bumpers, high-contrast transflective sunlight-readable color display showing a clean neutral topographical contour map without proprietary branding, directional navigational D-pad and ergonomic tactile function buttons, integrated helical antenna at top. Studio lighting, centered vertical composition, soft ground contact shadow, clean off-white backdrop, professional survey equipment photography.
  ```

---

### 03. Category 03 — Night Vision
- **File:** `public/images/generated/categories/category-night-vision.webp`
- **Component:** `CategoryShowcase.tsx` (`slug="night-vision"`)
- **Subject:** Professional night vision observation monocular
- **Prompt:**
  ```text
  Studio product photograph of a professional night vision monocular (PVS-14 style) optical device. Matte black composite polymer body, ribbed objective lens focus ring, knurled diopter adjustment ring, contoured winged rubber eyecup, lanyard mounting loop. Centered horizontal profile view resting on an off-white studio cyc backdrop with soft natural contact shadow, crisp edge definition, studio lighting, commercially neutral without logos or markings.
  ```

---

### 04. Category 04 — Thermal
- **File:** `public/images/generated/categories/category-thermal.webp`
- **Component:** `CategoryShowcase.tsx` (`slug="thermal"`)
- **Subject:** Handheld thermal imaging observation monocular
- **Prompt:**
  ```text
  Studio catalogue photograph of a compact handheld thermal imaging monocular device. Rugged matte black housing, rubberized grip ridges, rotary control focus ring, precision buttons on top panel (+, -, power), cylindrical battery housing, contoured ocular eyecup. Centered angled beauty shot resting on a clean light-neutral studio surface with realistic diffuse contact shadow, high-end industrial design product shot, sharp details, no branding.
  ```

---

### 05. Category 05 — Geological Compass
- **File:** `public/images/generated/categories/category-geological-compass.webp`
- **Component:** `CategoryShowcase.tsx` (`slug="geological-compass"`)
- **Subject:** Brunton-style geological pocket transit compass
- **Prompt:**
  ```text
  Studio product photograph of an open professional geological pocket transit compass (Brunton type). Anodized matte black aluminum body, precision graduated azimuth dial ring with degree markings, balanced magnetic needle with red North indicator jewel-mounted, integrated clinometer level bubble vial, extended folding sighting arm on one side and open polished sighting mirror lid with hairline center guide on the other. Centered studio photograph on an off-white cyclorama backdrop with gentle contact shadow, scientific instrument catalogue standard, no branding.
  ```

---

### 06. Category 06 — Camping Equipment
- **File:** `public/images/generated/categories/category-camping-equipment.webp`
- **Component:** `CategoryShowcase.tsx` (`slug="camping-equipment"`)
- **Subject:** Expedition field equipment & research deployment pack
- **Prompt:**
  ```text
  Studio product photography of heavy-duty field research expedition equipment: structured heavy canvas and reinforced leather alpine field rucksack, weather-resistant brass buckle closures, external compression straps, reinforced base, expedition field deployment gear. Centered upright product shot on a clean off-white studio background with soft natural diffuse shadow, premium tactile material detail, durable expedition gear catalogue quality, clean and devoid of commercial logos.
  ```

---

### 07. Category 07 — Weather Station
- **File:** `public/images/generated/categories/category-weather-station.webp`
- **Component:** `CategoryShowcase.tsx` (`slug="weather-station"`)
- **Subject:** Compact ultrasonic meteorological weather sensor
- **Prompt:**
  ```text
  Clean studio product photograph of a compact ultrasonic meteorological sensor / automated weather station head unit. Cylindrical hard-anodized dark bronze alloy body, acoustic resonance ultrasonic wind speed measuring cavity with internal transducer louvers, mounting base with calibration pin. Centered vertical orientation on a seamless off-white studio cyc background with soft contact shadow, crisp precision industrial instrument photography, no fake telemetry text.
  ```

---

### 08. Category 08 — Forestry Items
- **File:** `public/images/generated/categories/category-forestry-items.webp`
- **Component:** `CategoryShowcase.tsx` (`slug="forestry-items"`)
- **Subject:** Precision dial / vernier forestry caliper measurement tool
- **Prompt:**
  ```text
  Studio product photograph of a precision stainless steel dial caliper forestry measurement tool. Brushed hardened stainless steel graduated beam with engraved millimeter scale, knurled thumb roller, dual outside and inside measurement jaws, high-contrast round dial indicator with vernier pointer. Centered horizontal composition on an off-white studio backdrop with soft contact shadow, crisp metallic textures, scientific precision instrument catalogue photography.
  ```

---

## 3. Directory Layout

```
public/
  └── images/
      └── generated/
          ├── hero/
          │   └── hero-optical-instrument.webp   (70 KB, 1200x900)
          └── categories/
              ├── category-optics.webp           (68 KB, 1200x900)
              ├── category-gps.webp              (48 KB, 1200x900)
              ├── category-night-vision.webp     (64 KB, 1200x900)
              ├── category-thermal.webp          (30 KB, 1200x900)
              ├── category-geological-compass.webp (47 KB, 1200x900)
              ├── category-camping-equipment.webp (101 KB, 1200x900)
              ├── category-weather-station.webp  (20 KB, 1200x900)
              └── category-forestry-items.webp   (29 KB, 1200x900)
```
