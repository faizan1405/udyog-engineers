const fs = require('fs');
const content = fs.readFileSync('data/categories.ts', 'utf8');
const names = [...content.matchAll(/id:\s*"cat-([^"]+)",\s*name:\s*"([^"]+)"/g)].map(m => ({ id: m[1], name: m[2] }));
console.log('8 Primary Categories:');
names.forEach((c, idx) => console.log(`  ${idx + 1}. ${c.name} (${c.id})`));
