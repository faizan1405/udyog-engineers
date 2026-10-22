const fs = require('fs');
const path = require('path');

function getWebPDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  if (buf.length < 30) return null;
  const riff = buf.toString('ascii', 0, 4);
  const webp = buf.toString('ascii', 8, 12);
  if (riff !== 'RIFF' || webp !== 'WEBP') return null;

  const type = buf.toString('ascii', 12, 16);
  if (type === 'VP8X') {
    const width = 1 + buf.readUIntLE(24, 3);
    const height = 1 + buf.readUIntLE(27, 3);
    return { type, width, height };
  } else if (type === 'VP8 ') {
    const startCode = buf.readUIntLE(23, 3);
    if (startCode === 0x2a019d) {
      const width = buf.readUInt16LE(26) & 0x3fff;
      const height = buf.readUInt16LE(28) & 0x3fff;
      return { type, width, height };
    }
  } else if (type === 'VP8L') {
    const b0 = buf[21];
    const b1 = buf[22];
    const b2 = buf[23];
    const b3 = buf[24];
    const width = 1 + (((b1 & 0x3f) << 8) | b0);
    const height = 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
    return { type, width, height };
  }
  return { type, width: 'unknown', height: 'unknown' };
}

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
let smallCount = 0;
products.forEach(p => {
  if (p.heroImage.endsWith('.webp')) {
    const full = path.join('public', p.heroImage.replace(/^\//, ''));
    const dim = getWebPDimensions(full);
    if (dim && (dim.width < 400 || dim.height < 400)) {
      console.log(`SMALL IMAGE: ${p.id} -> ${dim.width}x${dim.height}`);
      smallCount++;
    }
  }
});
console.log(`Audit complete. Found ${smallCount} products with small images (<400px).`);
