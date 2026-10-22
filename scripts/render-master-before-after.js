const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// 1. Load PRODUCTS
const raw = fs.readFileSync('data/products.ts', 'utf8');
const lines = raw.split('\n');
let jsonLines = [];
let started = false;

for (let line of lines) {
  if (!started && line.startsWith('export const PRODUCTS')) {
    started = true;
    const bracketIdx = line.indexOf('= [') + 2;
    jsonLines.push(line.substring(bracketIdx));
    continue;
  }
  if (started) {
    if (line.trim().startsWith('];')) {
      jsonLines.push(']');
      break;
    }
    jsonLines.push(line);
  }
}

const products = JSON.parse(jsonLines.join('\n'));

const REPLACED_CATEGORIES = {
  'GPS (Garmin Foretrex 701)': ['garmin-foretrex-701-ballistic'],
  'Night Vision': ['nightfox-ember', 'nightfox-vulpes-hd', 'nightfox-swift'],
  'Thermal': ['hikmicro-ai56', 'hikmicro-fb21', 'hikmicro-eco', 'hikmicro-eco-v'],
  'Geological Equipment': [
    'brunton-f-5008-compro', 'brunton-f-5010-geo', 'brunton-f-5012-axis', 'brunton-f-5020-standard', 'brunton-truarc-15',
    'suunto-mc-2', 'suunto-kb-20', 'suunto-pm-5-clinometer',
    'estwing-e3-22p', 'estwing-e3-14p', 'estwing-e3-24blc',
    'breithaupt-3031-cothi',
    'generic-geological-pen', 'generic-geological-lens', 'generic-geological-diary'
  ],
  'Camping Equipment': [
    'camping-tent-4-person', 'camping-tent-6-person', 'adventure-camping-tent', 'car-boot-tent', 'portable-privacy-tent',
    'camping-sleeping-bag', 'multipurpose-camping-tarp', 'camping-shelter', 'large-camping-base-shelter',
    'foldable-camping-chair', 'camping-table', 'ice-cooler-box',
    'stainless-steel-backpacking-stove', 'portable-camping-gas-stove',
    'led-headlamp', 'search-light', 'camping-torch', 'licence-free-walkie-talkie',
    'water-purifier-bottle', 'isothermal-hiking-flask',
    'trekking-rucksack-under-50l', 'trekking-rucksack-50l', 'trekking-rucksack-60l', 'trekking-rucksack-70l'
  ]
};

async function renderCategoryComparison(catTitle, productIds, outPath) {
  const catProducts = productIds.map(id => products.find(p => p.id === id)).filter(Boolean);
  console.log(`Rendering ${catTitle} (${catProducts.length} items) -> ${outPath}...`);

  const canvasW = 1280;
  const bannerH = 100;
  const rowH = 260;
  const gap = 16;
  const margin = 24;
  const totalH = bannerH + margin + catProducts.length * (rowH + gap) + margin;

  const composites = [];

  // Header banner
  const bannerSvg = `
    <svg width="${canvasW}" height="${bannerH}">
      <rect width="100%" height="100%" fill="#090d16"/>
      <text x="${canvasW / 2}" y="42" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#38bdf8" text-anchor="middle">UDYOG ENGINEERS INDIA — BEFORE vs AFTER COMPARISON</text>
      <text x="${canvasW / 2}" y="74" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#f8fafc" text-anchor="middle">${catTitle.toUpperCase()} (${catProducts.length} Products Replaced)</text>
    </svg>
  `;
  composites.push({ input: Buffer.from(bannerSvg), top: 0, left: 0 });

  let currentY = bannerH + margin;

  for (const p of catProducts) {
    const safeName = p.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const safeModel = (p.model || 'Field Equipment').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const safeCat = p.category.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const rowSvg = `
      <svg width="${canvasW - margin * 2}" height="${rowH}">
        <rect width="100%" height="100%" fill="#1e293b" stroke="#334155" stroke-width="1.5" rx="8"/>
        <!-- Info Column -->
        <text x="20" y="45" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#f8fafc">${safeName}</text>
        <text x="20" y="72" font-family="monospace" font-size="12" fill="#64748b">ID: ${p.id}</text>
        <text x="20" y="105" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8">Discipline: ${safeCat}</text>
        <text x="20" y="128" font-family="Arial, sans-serif" font-size="12" fill="#94a3b8">Model: ${safeModel}</text>
        <rect x="20" y="155" width="220" height="28" fill="#0369a120" stroke="#0369a1" rx="4"/>
        <text x="30" y="174" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#38bdf8">1200x900 WebP Standard</text>

        <!-- Before Column Header -->
        <rect x="420" y="12" width="220" height="26" fill="#ef444420" stroke="#ef4444" rx="4"/>
        <text x="530" y="29" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#ef4444" text-anchor="middle">BEFORE: ILLUSTRATION</text>
        <rect x="420" y="44" width="266" height="200" fill="#ffffff" stroke="#475569" rx="4"/>

        <!-- After Column Header -->
        <rect x="820" y="12" width="220" height="26" fill="#10b98120" stroke="#10b981" rx="4"/>
        <text x="930" y="29" font-family="Arial, sans-serif" font-size="11" font-weight="bold" fill="#10b981" text-anchor="middle">AFTER: REAL PHOTOGRAPH</text>
        <rect x="820" y="44" width="266" height="200" fill="#ffffff" stroke="#10b981" stroke-width="1.5" rx="4"/>
      </svg>
    `;
    composites.push({ input: Buffer.from(rowSvg), top: currentY, left: margin });

    // 1. Before Image
    const beforeImgPath = path.join('docs/archive/products_backup', p.id, 'hero.webp');
    if (fs.existsSync(beforeImgPath)) {
      try {
        const bBuf = await sharp(beforeImgPath)
          .resize(262, 196, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
          .toBuffer();
        composites.push({ input: bBuf, top: currentY + 46, left: margin + 422 });
      } catch (e) {
        console.error(`Error loading before image ${beforeImgPath}:`, e.message);
      }
    }

    // 2. After Image
    const afterImgPath = path.join('public', p.heroImage.replace(/^\//, ''));
    if (fs.existsSync(afterImgPath)) {
      try {
        const aBuf = await sharp(afterImgPath)
          .resize(262, 196, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
          .toBuffer();
        composites.push({ input: aBuf, top: currentY + 46, left: margin + 822 });
      } catch (e) {
        console.error(`Error loading after image ${afterImgPath}:`, e.message);
      }
    }

    currentY += rowH + gap;
  }

  await sharp({
    create: {
      width: canvasW,
      height: totalH,
      channels: 4,
      background: { r: 15, g: 23, b: 42, alpha: 1 }
    }
  })
  .composite(composites)
  .png({ quality: 90 })
  .toFile(outPath);

  const stats = fs.statSync(outPath);
  console.log(`✓ Saved ${outPath} (${stats.size} bytes)`);
}

async function run() {
  // Render individual category comparisons
  await renderCategoryComparison('GPS — Garmin Foretrex 701 Ballistic', REPLACED_CATEGORIES['GPS (Garmin Foretrex 701)'], 'docs/screenshots/before_after_gps_foretrex701.png');
  await renderCategoryComparison('Night Vision Equipment', REPLACED_CATEGORIES['Night Vision'], 'docs/screenshots/before_after_night_vision.png');
  await renderCategoryComparison('Thermal Imaging Cameras', REPLACED_CATEGORIES['Thermal'], 'docs/screenshots/before_after_thermal.png');
  await renderCategoryComparison('Geological Equipment', REPLACED_CATEGORIES['Geological Equipment'], 'docs/screenshots/before_after_geological_equipment.png');
  await renderCategoryComparison('Camping Equipment', REPLACED_CATEGORIES['Camping Equipment'], 'docs/screenshots/before_after_camping_equipment.png');
}

run().catch(console.error);
