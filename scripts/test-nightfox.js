const { execSync } = require('child_process');
const https = require('https');

function testUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      resolve({ url, status: res.statusCode, length: res.headers['content-length'] });
    }).on('error', err => resolve({ url, error: err.message }));
  });
}

async function run() {
  const urls = [
    'https://in.nightfoxstore.com/cdn/shop/files/Laserware_Nightfox_Ember_Listing_Image_2_1.png',
    'https://in.nightfoxstore.com/cdn/shop/products/Laserware_Nightfox_Vulpes_Animal_Image_3_3.png',
    'https://in.nightfoxstore.com/cdn/shop/files/Laserware_Nightfox_Swift_Main_Listing_Image_1_Option_2_e1c4b7fb-0edc-4ec9-af65-50da4eec7895.png'
  ];
  for (const u of urls) {
    const res = await testUrl(u);
    console.log(res.status, res.length ? res.length + ' B' : '', u.split('/').pop());
  }
}

run();
