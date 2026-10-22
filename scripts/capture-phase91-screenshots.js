const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const base = 'http://localhost:3000';

const targets = [
  // Contact Sheet & Before-After Verification
  { name: 'phase91_all94_contact_sheet', url: `${base}/contact-sheet.html`, out: 'docs/screenshots/phase91_all94_contact_sheet.png', size: '1440,2400' },
  { name: 'phase91_before_after_comparison', url: `${base}/before-after.html`, out: 'docs/screenshots/phase91_before_after_comparison.png', size: '1440,2400' },

  // Affected Category Pages (Desktop 1440px & Mobile 390px)
  { name: 'category_camping_desktop', url: `${base}/categories/camping-equipment/`, out: 'docs/screenshots/category_camping_desktop.png', size: '1440,1100' },
  { name: 'category_camping_mobile', url: `${base}/categories/camping-equipment/`, out: 'docs/screenshots/category_camping_mobile.png', size: '390,844' },

  { name: 'category_geological_desktop', url: `${base}/categories/geological-equipment/`, out: 'docs/screenshots/category_geological_desktop.png', size: '1440,1100' },
  { name: 'category_geological_mobile', url: `${base}/categories/geological-equipment/`, out: 'docs/screenshots/category_geological_mobile.png', size: '390,844' },

  { name: 'category_night_vision_desktop', url: `${base}/categories/night-vision/`, out: 'docs/screenshots/category_night_vision_desktop.png', size: '1440,1100' },
  { name: 'category_night_vision_mobile', url: `${base}/categories/night-vision/`, out: 'docs/screenshots/category_night_vision_mobile.png', size: '390,844' },

  { name: 'category_thermal_desktop', url: `${base}/categories/thermal/`, out: 'docs/screenshots/category_thermal_desktop.png', size: '1440,1100' },
  { name: 'category_thermal_mobile', url: `${base}/categories/thermal/`, out: 'docs/screenshots/category_thermal_mobile.png', size: '390,844' },

  { name: 'category_gps_desktop', url: `${base}/categories/gps/`, out: 'docs/screenshots/category_gps_desktop.png', size: '1440,1100' },
  { name: 'category_gps_mobile', url: `${base}/categories/gps/`, out: 'docs/screenshots/category_gps_mobile.png', size: '390,844' },

  // Representative Product Detail Pages
  { name: 'detail_camping_tent_4p', url: `${base}/products/camping-tent-4-person/`, out: 'docs/screenshots/detail_camping_tent_4p.png', size: '1440,1100' },
  { name: 'detail_camping_tent_6p', url: `${base}/products/camping-tent-6-person/`, out: 'docs/screenshots/detail_camping_tent_6p.png', size: '1440,1100' },
  { name: 'detail_brunton_f5008', url: `${base}/products/brunton-f-5008-compro/`, out: 'docs/screenshots/detail_brunton_f5008.png', size: '1440,1100' },
  { name: 'detail_estwing_e3_22p', url: `${base}/products/estwing-e3-22p/`, out: 'docs/screenshots/detail_estwing_e3_22p.png', size: '1440,1100' },
  { name: 'detail_nightfox_ember', url: `${base}/products/nightfox-ember/`, out: 'docs/screenshots/detail_nightfox_ember.png', size: '1440,1100' },
  { name: 'detail_hikmicro_eco', url: `${base}/products/hikmicro-eco/`, out: 'docs/screenshots/detail_hikmicro_eco.png', size: '1440,1100' },
  { name: 'detail_garmin_foretrex_701', url: `${base}/products/garmin-foretrex-701-ballistic/`, out: 'docs/screenshots/detail_garmin_foretrex_701.png', size: '1440,1100' }
];

async function capture() {
  for (const t of targets) {
    const absOut = path.resolve(t.out);
    console.log(`[CAPTURE] ${t.name} -> ${t.url}`);
    try {
      execSync(`"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=4000 --window-size=${t.size} "--screenshot=${absOut}" "${t.url}"`, { timeout: 25000 });
      const size = fs.statSync(absOut).size;
      console.log(`  ✓ Saved ${t.out} (${size} bytes)`);
    } catch (err) {
      console.error(`  ✗ Error capturing ${t.name}:`, err.message);
    }
  }
}

capture();
