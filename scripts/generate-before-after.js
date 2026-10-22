const fs = require('fs');

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

// Identify the 47 replaced products:
// 1 GPS (garmin-foretrex-701-ballistic)
// 3 Night Vision (nightfox-ember, vulpes-hd, swift)
// 4 Thermal (hikmicro-ai56, fb21, eco, eco-v)
// 15 Geological Equipment
// 24 Camping Equipment
const replacedIds = new Set([
  'garmin-foretrex-701-ballistic',
  'nightfox-ember', 'nightfox-vulpes-hd', 'nightfox-swift',
  'hikmicro-ai56', 'hikmicro-fb21', 'hikmicro-eco', 'hikmicro-eco-v',
  // 15 Geological
  'brunton-f-5008-compro', 'brunton-f-5010-geo', 'brunton-f-5012-axis', 'brunton-f-5020-standard', 'brunton-truarc-15',
  'suunto-mc-2', 'suunto-kb-20', 'suunto-pm-5-clinometer',
  'estwing-e3-22p', 'estwing-e3-14p', 'estwing-e3-24blc',
  'breithaupt-3031-cothi',
  'generic-geological-pen', 'generic-geological-lens', 'generic-geological-diary',
  // 24 Camping
  'camping-tent-4-person', 'camping-tent-6-person', 'adventure-camping-tent', 'car-boot-tent', 'portable-privacy-tent',
  'camping-sleeping-bag', 'multipurpose-camping-tarp', 'camping-shelter', 'large-camping-base-shelter',
  'foldable-camping-chair', 'camping-table', 'ice-cooler-box',
  'stainless-steel-backpacking-stove', 'portable-camping-gas-stove',
  'led-headlamp', 'search-light', 'camping-torch', 'licence-free-walkie-talkie',
  'water-purifier-bottle', 'isothermal-hiking-flask',
  'trekking-rucksack-under-50l', 'trekking-rucksack-50l', 'trekking-rucksack-60l', 'trekking-rucksack-70l'
]);

const replacedProducts = products.filter(p => replacedIds.has(p.id));

const categories = {};
replacedProducts.forEach(p => {
  if (!categories[p.category]) categories[p.category] = [];
  categories[p.category].push(p);
});

let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UDYOG ENGINEERS INDIA — Phase 9.1 Before & After Comparison</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 24px; margin: 0; }
    h1 { text-align: center; font-size: 26px; color: #38bdf8; margin-bottom: 6px; }
    .subtitle { text-align: center; color: #94a3b8; font-size: 14px; margin-bottom: 28px; }
    .cat-section { margin-bottom: 40px; }
    .cat-title { font-size: 18px; font-weight: 700; color: #e2e8f0; border-bottom: 1px solid #334155; padding-bottom: 8px; margin-bottom: 16px; }
    .table-container { background: #1e293b; border-radius: 8px; overflow: hidden; border: 1px solid #334155; }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th { background: #0f172a; color: #94a3b8; font-size: 12px; text-transform: uppercase; padding: 12px 16px; border-bottom: 1px solid #334155; }
    td { padding: 12px 16px; border-bottom: 1px solid #334155; vertical-align: middle; }
    tr:last-child td { border-bottom: none; }
    .p-title { font-weight: 600; font-size: 14px; color: #f8fafc; margin-bottom: 4px; }
    .p-id { font-size: 11px; color: #64748b; font-family: monospace; }
    .thumb-cell { width: 180px; }
    .thumb-wrapper { width: 180px; height: 135px; background: #ffffff; border-radius: 4px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
    .thumb-wrapper img { width: 100%; height: 100%; object-fit: contain; }
    .badge-before { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; background: #ef444420; color: #ef4444; border: 1px solid #ef444440; margin-bottom: 6px; }
    .badge-after { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; background: #10b98120; color: #10b981; border: 1px solid #10b98140; margin-bottom: 6px; }
  </style>
</head>
<body>
  <h1>PHASE 9.1 — BEFORE & AFTER COMPARISON</h1>
  <div class="subtitle">Side-by-Side Visual Proof of 47 Replaced Products Across All 5 Affected Categories</div>
`;

for (const [cat, items] of Object.entries(categories)) {
  html += `
  <div class="cat-section">
    <div class="cat-title">${cat} (${items.length} Products Replaced)</div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th style="width: 25%;">Product Information</th>
            <th style="width: 37.5%;">BEFORE (Phase 9 Illustration)</th>
            <th style="width: 37.5%;">AFTER (Phase 9.1 Real Photography)</th>
          </tr>
        </thead>
        <tbody>
  `;

  items.forEach(p => {
    const beforeSrc = `/images/products_backup/${p.id}/hero.webp`;
    const afterSrc = p.heroImage;
    html += `
          <tr>
            <td>
              <div class="p-title">${p.name}</div>
              <div class="p-id">${p.id}</div>
            </td>
            <td class="thumb-cell">
              <span class="badge-before">REPLACED ILLUSTRATION</span>
              <div class="thumb-wrapper">
                <img src="${beforeSrc}" alt="Before: ${p.name}" loading="lazy" />
              </div>
            </td>
            <td class="thumb-cell">
              <span class="badge-after">AUTHENTIC PHOTOGRAPH</span>
              <div class="thumb-wrapper">
                <img src="${afterSrc}" alt="After: ${p.name}" loading="lazy" />
              </div>
            </td>
          </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>
  </div>
  `;
}

html += `
</body>
</html>
`;

fs.writeFileSync('public/before-after.html', html);
console.log('Saved public/before-after.html (all 47 products comparison)');
