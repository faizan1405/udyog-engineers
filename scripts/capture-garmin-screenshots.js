const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const base = 'http://localhost:3000';

const targets = [
  {
    name: 'GPS Category (Desktop)',
    url: `${base}/categories/gps/`,
    out: 'docs/screenshots/category_gps_desktop.png',
    size: '1440,1100'
  },
  {
    name: 'Garmin eTrex 22x Detail',
    url: `${base}/products/garmin-etrex-22x/`,
    out: 'docs/screenshots/product_garmin_etrex_22x_desktop.png',
    size: '1440,1100'
  },
  {
    name: 'Garmin GPSMAP 65s Detail',
    url: `${base}/products/garmin-gpsmap-65s/`,
    out: 'docs/screenshots/product_garmin_gpsmap_65s_desktop.png',
    size: '1440,1100'
  },
  {
    name: 'Garmin GPSMAP 79s Detail',
    url: `${base}/products/garmin-gpsmap-79s/`,
    out: 'docs/screenshots/product_garmin_gpsmap_79s_desktop.png',
    size: '1440,1100'
  },
  {
    name: 'GPS Category (Mobile 390px)',
    url: `${base}/categories/gps/`,
    out: 'docs/screenshots/category_gps_mobile.png',
    size: '390,844'
  }
];

async function capture() {
  for (const t of targets) {
    const absOut = path.resolve(t.out);
    console.log(`[CAPTURE] ${t.name} -> ${t.url}`);
    try {
      execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=4000 --window-size=${t.size} "--screenshot=${absOut}" "${t.url}"`, { timeout: 30000 });
      const size = fs.statSync(absOut).size;
      console.log(`  ✓ Saved ${t.out} (${size} bytes)`);
    } catch (err) {
      console.error(`  ✗ Error capturing ${t.name}:`, err.message);
    }
  }
}

capture();
