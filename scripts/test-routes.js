const http = require('http');

async function testUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve({ statusCode: res.statusCode });
    }).on('error', (err) => {
      resolve({ error: err.message });
    });
  });
}

async function run() {
  const urls = [
    'http://localhost:3000/',
    'http://localhost:3000/categories/',
    'http://localhost:3000/categories/optics/',
    'http://localhost:3000/categories/gps/',
    'http://localhost:3000/categories/night-vision/',
    'http://localhost:3000/categories/thermal/',
    'http://localhost:3000/categories/geological-equipment/',
    'http://localhost:3000/categories/camping-equipment/',
    'http://localhost:3000/categories/weather-station/',
    'http://localhost:3000/categories/camera-trap/',
    'http://localhost:3000/products/',
    'http://localhost:3000/products/gardepro-a60-4k/',
    'http://localhost:3000/products/gardepro-a5wf/',
    'http://localhost:3000/products/gardepro-e8wf/',
    'http://localhost:3000/products/bushnell-core-ds-4k/',
    'http://localhost:3000/products/bushnell-core-s-4k/',
    'http://localhost:3000/products/garmin-gpsmap-h1/',
  ];

  for (const u of urls) {
    const res = await testUrl(u);
    console.log(`${res.statusCode} ${u}`);
  }
}

run();
