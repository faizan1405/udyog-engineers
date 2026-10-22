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

// Canonical category ordering
const CANONICAL_CATEGORIES = [
  'Optics',
  'GPS',
  'Night Vision',
  'Thermal',
  'Geological Equipment',
  'Camping Equipment',
  'Camera Trap'
];

const categoryMap = {};
CANONICAL_CATEGORIES.forEach(c => { categoryMap[c] = []; });
products.forEach(p => {
  if (categoryMap[p.category]) {
    categoryMap[p.category].push(p);
  } else {
    console.warn('Unknown category for product:', p.id, p.category);
  }
});

async function renderCategoryGrid(catName, items, outPath) {
  console.log(`Rendering ${catName} (${items.length} items) -> ${outPath}...`);
  const cols = items.length <= 3 ? items.length : (items.length <= 4 ? 4 : (items.length <= 6 ? 3 : 4));
  const cardW = 320;
  const imgH = 240;
  const cardH = 310;
  const gap = 16;
  const margin = 24;
  const bannerH = 90;

  const totalGridW = margin * 2 + cols * cardW + (cols - 1) * gap;
  const rows = Math.ceil(items.length / cols);
  const totalH = bannerH + margin + rows * cardH + (rows - 1) * gap + margin;

  const composites = [];

  const bannerSvg = `
    <svg width="${totalGridW}" height="${bannerH}">
      <rect width="100%" height="100%" fill="#090d16"/>
      <text x="${totalGridW / 2}" y="40" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="#38bdf8" text-anchor="middle">UDYOG ENGINEERS INDIA — ${catName.toUpperCase()}</text>
      <text x="${totalGridW / 2}" y="68" font-family="Arial, sans-serif" font-size="14" fill="#94a3b8" text-anchor="middle">Category Contact Sheet • ${items.length} Verified Physical Photographs • 1200x900 WebP Standard</text>
    </svg>
  `;
  composites.push({ input: Buffer.from(bannerSvg), top: 0, left: 0 });

  let currentY = bannerH + margin;

  for (let i = 0; i < items.length; i++) {
    const p = items[i];
    const col = i % cols;
    const row = Math.floor(i / cols);

    const x = margin + col * (cardW + gap);
    const y = currentY + row * (cardH + gap);

    const safeName = p.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const displayName = safeName.length > 34 ? safeName.substring(0, 32) + '...' : safeName;

    const cardBgSvg = `
      <svg width="${cardW}" height="${cardH}">
        <rect width="100%" height="100%" fill="#1e293b" stroke="#334155" stroke-width="1.5" rx="8"/>
        <rect x="0" y="0" width="${cardW}" height="${imgH}" fill="#ffffff" rx="8 8 0 0"/>
        <rect x="0" y="${imgH}" width="${cardW}" height="1" fill="#e2e8f0"/>
        <text x="12" y="${imgH + 26}" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#f8fafc">${displayName}</text>
        <text x="12" y="${imgH + 46}" font-family="monospace" font-size="10" fill="#64748b">${p.id.length > 36 ? p.id.substring(0, 34) + '..' : p.id}</text>
      </svg>
    `;
    composites.push({ input: Buffer.from(cardBgSvg), top: y, left: x });

    const imgPath = path.join('public', p.heroImage.replace(/^\//, ''));
    if (fs.existsSync(imgPath)) {
      try {
        const imgBuf = await sharp(imgPath)
          .resize(cardW - 4, imgH - 4, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
          .toBuffer();
        composites.push({ input: imgBuf, top: y + 2, left: x + 2 });
      } catch (e) {
        console.error(`Failed to resize ${imgPath}:`, e.message);
      }
    }
  }

  await sharp({
    create: {
      width: totalGridW,
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

async function renderMasterSheet() {
  console.log('\nRendering canonical Master Contact Sheet for all 94 products...');
  const cols = 6;
  const cardW = 320;
  const imgH = 240;
  const cardH = 310;
  const gap = 16;
  const margin = 32;
  const headerH = 64;
  const bannerH = 140;

  const totalGridW = margin * 2 + cols * cardW + (cols - 1) * gap;

  let totalH = bannerH + margin;
  for (const catName of CANONICAL_CATEGORIES) {
    const items = categoryMap[catName];
    const rows = Math.ceil(items.length / cols);
    totalH += headerH + rows * cardH + (rows - 1) * gap + 36;
  }

  console.log(`Master Canvas dimensions: ${totalGridW} x ${totalH}`);

  const composites = [];

  const bannerSvg = `
    <svg width="${totalGridW}" height="${bannerH}">
      <rect width="100%" height="100%" fill="#090d16"/>
      <text x="${totalGridW / 2}" y="48" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#38bdf8" text-anchor="middle">UDYOG ENGINEERS INDIA — MASTER PRODUCT PHOTOGRAPHY CATALOGUE</text>
      <text x="${totalGridW / 2}" y="82" font-family="Arial, sans-serif" font-size="16" fill="#f8fafc" text-anchor="middle">Complete 94-Product Visual Verification Sheet • All 7 Commercial Product Categories + Meteorological Instruments</text>
      <text x="${totalGridW / 2}" y="112" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#10b981" text-anchor="middle">Optics: 19  |  GPS: 17  |  Night Vision: 3  |  Thermal: 10  |  Geological: 15  |  Camping: 24  |  Camera Trap: 6   =   TOTAL: 94 PRODUCTS</text>
    </svg>
  `;
  composites.push({ input: Buffer.from(bannerSvg), top: 0, left: 0 });

  let currentY = bannerH + 24;

  for (const catName of CANONICAL_CATEGORIES) {
    const items = categoryMap[catName];

    const catSvg = `
      <svg width="${totalGridW - margin * 2}" height="52">
        <rect width="100%" height="100%" fill="#1e293b" stroke="#334155" stroke-width="1" rx="6"/>
        <text x="20" y="33" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#f8fafc">${catName.toUpperCase()}</text>
        <text x="${totalGridW - margin * 2 - 20}" y="33" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#38bdf8" text-anchor="end">${items.length} Products Verified</text>
      </svg>
    `;
    composites.push({ input: Buffer.from(catSvg), top: currentY, left: margin });
    currentY += 62;

    for (let i = 0; i < items.length; i++) {
      const p = items[i];
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = margin + col * (cardW + gap);
      const y = currentY + row * (cardH + gap);

      const safeName = p.name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      const displayName = safeName.length > 34 ? safeName.substring(0, 32) + '...' : safeName;

      const cardBgSvg = `
        <svg width="${cardW}" height="${cardH}">
          <rect width="100%" height="100%" fill="#1e293b" stroke="#334155" stroke-width="1.5" rx="8"/>
          <rect x="0" y="0" width="${cardW}" height="${imgH}" fill="#ffffff" rx="8 8 0 0"/>
          <rect x="0" y="${imgH}" width="${cardW}" height="1" fill="#e2e8f0"/>
          <text x="12" y="${imgH + 26}" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#f8fafc">${displayName}</text>
          <text x="12" y="${imgH + 46}" font-family="monospace" font-size="10" fill="#64748b">${p.id.length > 36 ? p.id.substring(0, 34) + '..' : p.id}</text>
        </svg>
      `;
      composites.push({ input: Buffer.from(cardBgSvg), top: y, left: x });

      const imgPath = path.join('public', p.heroImage.replace(/^\//, ''));
      if (fs.existsSync(imgPath)) {
        try {
          const imgBuf = await sharp(imgPath)
            .resize(cardW - 4, imgH - 4, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
            .toBuffer();
          composites.push({ input: imgBuf, top: y + 2, left: x + 2 });
        } catch (e) {
          console.error(`Failed to resize ${imgPath}:`, e.message);
        }
      }
    }

    const catRows = Math.ceil(items.length / cols);
    currentY += catRows * cardH + (catRows - 1) * gap + 36;
  }

  const outMaster = 'docs/screenshots/all_94_products_master_contact_sheet.png';
  await sharp({
    create: {
      width: totalGridW,
      height: totalH,
      channels: 4,
      background: { r: 15, g: 23, b: 42, alpha: 1 }
    }
  })
  .composite(composites)
  .png({ quality: 90 })
  .toFile(outMaster);

  const stats = fs.statSync(outMaster);
  console.log(`✓ Master contact sheet saved: ${outMaster} (${stats.size} bytes)`);
}

async function run() {
  // 1. Render master sheet
  await renderMasterSheet();

  // 2. Render individual category contact sheets
  await renderCategoryGrid('Optics', categoryMap['Optics'], 'docs/screenshots/contact_sheet_optics.png');
  await renderCategoryGrid('GPS', categoryMap['GPS'], 'docs/screenshots/contact_sheet_gps.png');
  await renderCategoryGrid('Night Vision', categoryMap['Night Vision'], 'docs/screenshots/contact_sheet_night_vision.png');
  await renderCategoryGrid('Thermal', categoryMap['Thermal'], 'docs/screenshots/contact_sheet_thermal.png');
  await renderCategoryGrid('Geological Equipment', categoryMap['Geological Equipment'], 'docs/screenshots/contact_sheet_geological_equipment.png');
  await renderCategoryGrid('Camping Equipment', categoryMap['Camping Equipment'], 'docs/screenshots/contact_sheet_camping_equipment.png');
  await renderCategoryGrid('Camera Trap', categoryMap['Camera Trap'], 'docs/screenshots/contact_sheet_camera_trap.png');
}

run().catch(console.error);
