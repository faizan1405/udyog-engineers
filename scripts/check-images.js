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

// Group products by categorySlug
const byCat = {};
products.forEach(p => {
  const cat = p.categorySlug || 'no-cat';
  if (!byCat[cat]) byCat[cat] = [];
  byCat[cat].push(p);
});

console.log('Categories in products.ts:');
for (const [cat, list] of Object.entries(byCat)) {
  console.log(`- ${cat}: ${list.length} products`);
}

// Check Weather Station
const wsProds = products.filter(p => p.categorySlug === 'weather-station' || p.category === 'Weather Station');
console.log('\nWeather Station products count:', wsProds.length);
