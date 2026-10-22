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

const targetIds = [
  // 3 Geological field accessories
  'generic-geological-pen', 'generic-geological-lens', 'generic-geological-diary',
  // 24 Camping products
  'camping-tent-4-person', 'camping-tent-6-person', 'adventure-camping-tent', 'car-boot-tent', 'portable-privacy-tent',
  'camping-sleeping-bag', 'multipurpose-camping-tarp', 'camping-shelter', 'large-camping-base-shelter',
  'foldable-camping-chair', 'camping-table', 'ice-cooler-box',
  'stainless-steel-backpacking-stove', 'portable-camping-gas-stove',
  'led-headlamp', 'search-light', 'camping-torch', 'licence-free-walkie-talkie',
  'water-purifier-bottle', 'isothermal-hiking-flask',
  'trekking-rucksack-under-50l', 'trekking-rucksack-50l', 'trekking-rucksack-60l', 'trekking-rucksack-70l'
];

const selected = products.filter(p => targetIds.includes(p.id));

console.log(`Found ${selected.length} products to audit:\n`);
selected.forEach(p => {
  console.log(`ID: ${p.id}`);
  console.log(`  Name: ${p.name}`);
  console.log(`  Brand: ${p.brand || 'N/A'}`);
  console.log(`  Model: ${p.model || 'N/A'}`);
  console.log(`  VerificationStatus: ${p.verificationStatus}`);
  console.log(`  ShortDesc: ${p.shortDescription}`);
  console.log(`  Image: ${p.heroImage}`);
  console.log('---');
});
