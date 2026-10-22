const https = require('https');

https.get('https://www.addventureindia.com/camping-tents', { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
  let d = ''; res.on('data', c => d += c);
  res.on('end', () => {
    const urls = [...d.matchAll(/href="([^"]*product-page[^"]*)"/g)].map(x => x[1]);
    console.log('Tent product links:', [...new Set(urls)]);
  });
});
