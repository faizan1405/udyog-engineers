const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const base = 'http://localhost:3000';

const targets = [
  { name: 'homepage_desktop', url: `${base}/`, out: 'docs/screenshots/homepage_desktop.png', size: '1440,1100' },
  { name: 'homepage_mobile', url: `${base}/`, out: 'docs/screenshots/homepage_mobile.png', size: '390,844' },
  { name: 'categories_desktop', url: `${base}/categories/`, out: 'docs/screenshots/categories_desktop.png', size: '1440,1100' },
  { name: 'category_camera_trap', url: `${base}/categories/camera-trap/`, out: 'docs/screenshots/category_camera_trap_desktop.png', size: '1440,1100' },
  { name: 'category_optics', url: `${base}/categories/optics/`, out: 'docs/screenshots/category_optics_desktop.png', size: '1440,1100' },
  { name: 'category_geological', url: `${base}/categories/geological-equipment/`, out: 'docs/screenshots/category_geological_equipment_desktop.png', size: '1440,1100' },
  { name: 'category_weather_station', url: `${base}/categories/weather-station/`, out: 'docs/screenshots/category_weather_station_desktop.png', size: '1440,1100' },
  { name: 'products_desktop', url: `${base}/products/`, out: 'docs/screenshots/products_desktop.png', size: '1440,1100' },
  { name: 'products_mobile', url: `${base}/products/`, out: 'docs/screenshots/products_mobile.png', size: '390,844' },
  { name: 'product_gardepro_a60', url: `${base}/products/gardepro-a60-4k/`, out: 'docs/screenshots/product_gardepro_a60_4k_desktop.png', size: '1440,1100' },
  { name: 'product_gardepro_a5wf', url: `${base}/products/gardepro-a5wf/`, out: 'docs/screenshots/product_gardepro_a5wf_desktop.png', size: '1440,1100' },
  { name: 'product_bushnell_core_ds', url: `${base}/products/bushnell-core-ds-4k/`, out: 'docs/screenshots/product_bushnell_core_ds_4k_desktop.png', size: '1440,1100' },
  { name: 'product_garmin_gpsmap_h1', url: `${base}/products/garmin-gpsmap-h1/`, out: 'docs/screenshots/product_garmin_gpsmap_h1_desktop.png', size: '1440,1100' }
];

async function capture() {
  for (const t of targets) {
    const absOut = path.resolve(t.out);
    console.log(`[CAPTURE] ${t.name} -> ${t.url}`);
    try {
      execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=3000 --window-size=${t.size} "--screenshot=${absOut}" "${t.url}"`, { timeout: 20000 });
      const size = fs.statSync(absOut).size;
      console.log(`  ✓ Saved ${t.out} (${size} bytes)`);
    } catch (err) {
      console.error(`  ✗ Error capturing ${t.name}:`, err.message);
    }
  }
}

capture();
