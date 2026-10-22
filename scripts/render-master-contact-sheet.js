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

// Group by category
const categories = {};
products.forEach(p => {
  if (!categories[p.category]) categories[p.category] = [];
  categories[p.category].push(p);
});

async function generateMasterContactSheet() {
  console.log('Generating master contact sheet for all 94 products...');

  // Columns: 6 per row.
  // Card width: 320px, height: 310px. (Image: 320x240, text box: 320x70)
  // Grid layout with category header bars.
  const cols = 6;
  const cardW = 320;
  const imgH = 240;
  const cardH = 310;
  const gap = 16;
  const margin = 32;
  const headerH = 60;
  const bannerH = 120;

  const totalGridW = margin * 2 + cols * cardW + (cols - 1) * gap;

  // Compute total height
  let totalH = bannerH + margin;
  for (const [cat, items] of Object.entries(categories)) {
    const rows = Math.ceil(items.length / cols);
    totalH += headerH + rows * cardH + (rows - 1) * gap + 32;
  }

  console.log(`Canvas dimensions: ${totalGridW} x ${totalH}`);

  const composites = [];

  // Title Banner SVG
  const bannerSvg = `
    <svg width="${totalGridW}" height="${bannerH}">
      <rect width="100%" height="100%" fill="#090d16"/>
      <text x="${totalGridW / 2}" y="50" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#38bdf8" text-anchor="middle">UDYOG ENGINEERS INDIA — MASTER PRODUCT PHOTOGRAPHY CATALOGUE</text>
      <text x="${totalGridW / 2}" y="85" font-family="Arial, sans-serif" font-size="16" fill="#94a3b8" text-anchor="middle">Verified Visual Contact Sheet • 94 Products • 100% Genuine Equipment Photography • Phase 9.2 Verification</text>
    </svg>
  `;
  composites.push({ input: Buffer.from(bannerSvg), top: 0, left: 0 });

  let currentY = bannerH + 20;

  for (const [cat, items] of Object.entries(categories)) {
    // Category Header SVG
    const catSvg = `
      <svg width="${totalGridW - margin * 2}" height="50">
        <rect width="100%" height="100%" fill="#1e293b" rx="6"/>
        <text x="20" y="32" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#f8fafc">${cat.toUpperCase()}</text>
        <text x="${totalGridW - margin * 2 - 20}" y="32" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#38bdf8" text-anchor="end">${items.length} Products</text>
      </svg>
    `;
    composites.push({ input: Buffer.from(catSvg), top: currentY, left: margin });
    currentY += 60;

    for (let i = 0; i < items.length; i++) {
      const p = items[i];
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = margin + col * (cardW + gap);
      const y = currentY + row * (cardH + gap);

      // Card border & text SVG
      // Clean safe title
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

      // Image
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

  // Create base canvas and composite
  const outPath = 'docs/screenshots/all_94_products_master_contact_sheet.png';
  console.log(`Rendering master contact sheet (${composites.length} elements)...`);

  await sharp({
    create: {
      width: totalGridW,
      height: totalH,
      channels: 4,
      background: { r: 15, g: 23, b: 42, alpha: 1 }
    }
  })
  .composite(composites)
  .png({ quality: 90, compressionLevel: 6 })
  .toFile(outPath);

  const stats = fs.statSync(outPath);
  console.log(`✓ Successfully saved: ${outPath} (${stats.size} bytes)`);
}

generateMasterContactSheet().catch(console.error);
