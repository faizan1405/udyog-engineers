const https = require('https');

https.get('https://www.flipkart.com/home-improvement/home-utilities/torches/pr?sid=h1m,b60,7f1', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
}, res => {
  let d = ''; res.on('data', c => d += c);
  res.on('end', () => {
    const m = [...d.matchAll(/https:\/\/rukminim[^\s"']+\.jpeg/gi)].map(x => x[0]);
    console.log('Torches:', [...new Set(m)].slice(0, 5));
  });
});
