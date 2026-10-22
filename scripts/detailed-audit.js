const fs = require('fs');
const path = require('path');

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

console.log('=== PRODUCT IMAGE AUDIT ===');
const imageStats = [];

for (const p of products) {
  const rel = p.heroImage.replace(/^\//, '');
  const full = path.join('public', rel);
  const exists = fs.existsSync(full);
  let size = 0;
  if (exists) {
    size = fs.statSync(full).size;
  }
  imageStats.push({
    id: p.id,
    name: p.name,
    category: p.category,
    categorySlug: p.categorySlug,
    heroImage: p.heroImage,
    exists,
    size,
    isSvg: p.heroImage.endsWith('.svg'),
    galleryCount: p.gallery ? p.gallery.length : 0
  });
}

console.log(`Total Products: ${imageStats.length}`);
const missing = imageStats.filter(s => !s.exists);
console.log(`Missing Files: ${missing.length}`);
if (missing.length) console.log('Missing:', missing);

const svg = imageStats.filter(s => s.isSvg);
console.log(`SVG / Placeholders: ${svg.length}`);
if (svg.length) console.log('SVG:', svg.map(s => ({ id: s.id, name: s.name, file: s.heroImage })));

const tiny = imageStats.filter(s => s.exists && !s.isSvg && s.size < 5000);
console.log(`Tiny Files (<5KB): ${tiny.length}`);
if (tiny.length) console.log('Tiny:', tiny);

// Let's check duplicates
const usage = {};
for (const s of imageStats) {
  if (!usage[s.heroImage]) usage[s.heroImage] = [];
  usage[s.heroImage].push(s);
}

console.log('\n--- Duplicate image usage across products ---');
let dupCount = 0;
for (const [img, list] of Object.entries(usage)) {
  if (list.length > 1) {
    dupCount++;
    console.log(`Shared by ${list.length} products: ${img}`);
    list.forEach(l => console.log(`   * [${l.category}] ${l.name} (${l.id})`));
  }
}
if (dupCount === 0) console.log('No duplicate images found!');
