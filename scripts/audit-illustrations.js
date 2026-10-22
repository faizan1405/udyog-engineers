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
console.log('Total products:', products.length);

const categories = {};
products.forEach(p => {
  const file = 'public/' + p.heroImage.replace(/^\//, '');
  const size = fs.existsSync(file) ? fs.statSync(file).size : 0;
  if (!categories[p.category]) categories[p.category] = [];
  categories[p.category].push({ id: p.id, name: p.name, size, file });
});

for (const [cat, items] of Object.entries(categories)) {
  console.log(`\n=== ${cat} (${items.length} items) ===`);
  items.forEach(it => {
    console.log(`  ${it.id.padEnd(38)} ${(it.size + ' B').padStart(10)} | ${it.name}`);
  });
}
