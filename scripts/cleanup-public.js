const fs = require('fs');
const path = require('path');

function move(src, dest) {
  if (fs.existsSync(src)) {
    if (fs.existsSync(dest)) {
      console.log(`Destination ${dest} already exists, replacing...`);
      fs.rmSync(dest, { recursive: true, force: true });
    }
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.renameSync(src, dest);
    console.log(`Moved: ${src} -> ${dest}`);
  } else {
    console.log(`Source does not exist: ${src}`);
  }
}

// 1. Move backup images out of public/
move('public/images/products_backup', 'docs/archive/products_backup');

// 2. Move QA contact sheets out of public/
move('public/contact-sheet.html', 'docs/qa/contact-sheet.html');
move('public/before-after.html', 'docs/qa/before-after.html');

console.log('Public folder cleanup complete.');
