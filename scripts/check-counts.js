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
    if (line.trim().startsWith('];')) { jsonLines.push(']'); break; }
    jsonLines.push(line);
  }
}
const products = JSON.parse(jsonLines.join('\n'));
const cats = {};
products.forEach(p => {
  cats[p.category] = (cats[p.category] || 0) + 1;
});
console.log('Categories breakdown:');
let total = 0;
for (const [c, count] of Object.entries(cats)) {
  console.log(`  ${c}: ${count}`);
  total += count;
}
console.log('Total active products:', total);
