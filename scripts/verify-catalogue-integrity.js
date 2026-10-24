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
    if (line.trim().startsWith('];')) { jsonLines.push(']'); break; }
    jsonLines.push(line);
  }
}
const products = JSON.parse(jsonLines.join('\n'));

console.log(`Total Products: ${products.length}`);

// 1. Slug & ID uniqueness
const ids = new Set();
const slugs = new Set();
let dupes = 0;
products.forEach(p => {
  if (ids.has(p.id)) { console.error(`DUPLICATE ID: ${p.id}`); dupes++; }
  ids.add(p.id);
  if (slugs.has(p.slug)) { console.error(`DUPLICATE SLUG: ${p.slug}`); dupes++; }
  slugs.add(p.slug);
});

// 2. Check heroImage files exist
let missingImages = 0;
products.forEach(p => {
  const rel = p.heroImage.replace(/^\//, '');
  const full = path.join('public', rel);
  if (!fs.existsSync(full)) {
    console.error(`MISSING IMAGE for ${p.slug}: ${full}`);
    missingImages++;
  }
});

// 3. Category count
const cats = {};
products.forEach(p => {
  cats[p.category] = (cats[p.category] || 0) + 1;
});

console.log('\nCategory breakdown:');
for (const [c, cnt] of Object.entries(cats)) {
  console.log(`  ${c}: ${cnt}`);
}

// 4. GPS Subcategory breakdown
const gpsProds = products.filter(p => p.category === 'GPS');
const gpsSubcats = {};
gpsProds.forEach(p => {
  gpsSubcats[p.subcategory] = (gpsSubcats[p.subcategory] || 0) + 1;
});
console.log('\nGPS Subcategories breakdown:');
for (const [sc, cnt] of Object.entries(gpsSubcats)) {
  console.log(`  ${sc}: ${cnt}`);
}

// 5. Check the 6 reference Garmin products
const sixModels = [
  'garmin-etrex-32x',
  'garmin-montana-710',
  'garmin-gps-12h',
  'garmin-etrex-22x',
  'garmin-gpsmap-65s',
  'garmin-gpsmap-79s'
];

console.log('\nVerification of the 6 Garmin Reference Products:');
sixModels.forEach(slug => {
  const p = products.find(x => x.slug === slug);
  if (!p) {
    console.error(`  MISSING: ${slug}`);
  } else {
    console.log(`  ✓ [${p.slug}] ${p.name} | Subcat: ${p.subcategory} | Image: ${p.heroImage} | Source: ${p.imageSourceType}`);
  }
});

if (dupes === 0 && missingImages === 0 && products.length === 97 && gpsProds.length === 20) {
  console.log('\n>>> ALL INTEGRITY CHECKS PASSED PERFECTLY! <<<');
} else {
  console.error('\n>>> SOME CHECKS FAILED! <<<');
  process.exit(1);
}
