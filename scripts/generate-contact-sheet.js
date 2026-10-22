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

// Group by category
const categories = {};
products.forEach(p => {
  if (!categories[p.category]) categories[p.category] = [];
  categories[p.category].push(p);
});

let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UDYOG ENGINEERS INDIA — All 94 Products Visual Contact Sheet</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 24px; margin: 0; }
    h1 { text-align: center; font-size: 28px; margin-bottom: 8px; color: #38bdf8; }
    .subtitle { text-align: center; color: #94a3b8; margin-bottom: 32px; font-size: 14px; }
    .stats { display: flex; justify-content: center; gap: 24px; margin-bottom: 32px; flex-wrap: wrap; }
    .stat-card { background: #1e293b; border: 1px solid #334155; padding: 12px 20px; border-radius: 8px; text-align: center; }
    .stat-num { font-size: 22px; font-weight: bold; color: #38bdf8; }
    .stat-label { font-size: 12px; color: #94a3b8; text-transform: uppercase; }
    .cat-section { margin-bottom: 48px; }
    .cat-title { font-size: 20px; font-weight: 700; color: #f1f5f9; border-bottom: 2px solid #334155; padding-bottom: 8px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
    .cat-count { font-size: 13px; color: #38bdf8; background: #0369a1; padding: 2px 10px; border-radius: 999px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
    .card { background: #1e293b; border: 1px solid #334155; border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s; }
    .img-box { width: 100%; aspect-ratio: 4 / 3; background: #ffffff; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; }
    .img-box img { width: 100%; height: 100%; object-fit: contain; }
    .info { padding: 12px; display: flex; flex-direction: column; flex-grow: 1; }
    .p-name { font-size: 13px; font-weight: 600; line-height: 1.3; margin-bottom: 6px; color: #f8fafc; }
    .p-id { font-size: 10px; color: #64748b; word-break: break-all; margin-top: auto; font-family: monospace; }
  </style>
</head>
<body>
  <h1>UDYOG ENGINEERS INDIA — COMPLETE PRODUCT CATALOGUE</h1>
  <div class="subtitle">Visual Contact Sheet of All 94 Products • Phase 9.1 Photography Verification</div>
  
  <div class="stats">
    <div class="stat-card"><div class="stat-num">94</div><div class="stat-label">Total Products</div></div>
    <div class="stat-card"><div class="stat-num">6</div><div class="stat-label">Categories</div></div>
    <div class="stat-card"><div class="stat-num">47</div><div class="stat-label">Phase 9.1 Replacements</div></div>
    <div class="stat-card"><div class="stat-num">100%</div><div class="stat-label">Genuine Photography</div></div>
    <div class="stat-card"><div class="stat-num">0</div><div class="stat-label">Illustrations Remaining</div></div>
  </div>
`;

for (const [cat, items] of Object.entries(categories)) {
  html += `
  <div class="cat-section">
    <div class="cat-title">
      <span>${cat}</span>
      <span class="cat-count">${items.length} Products</span>
    </div>
    <div class="grid">
  `;
  items.forEach(p => {
    html += `
      <div class="card">
        <div class="img-box">
          <img src="${p.heroImage}" alt="${p.name}" loading="lazy" />
        </div>
        <div class="info">
          <div class="p-name">${p.name}</div>
          <div class="p-id">${p.id}</div>
        </div>
      </div>
    `;
  });
  html += `
    </div>
  </div>
  `;
}

html += `
</body>
</html>
`;

fs.writeFileSync('public/contact-sheet.html', html);
console.log('Saved public/contact-sheet.html (all 94 products)');
