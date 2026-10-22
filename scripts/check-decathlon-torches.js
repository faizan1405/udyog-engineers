const https = require('https');

https.get('https://www.decathlon.in/c/camping-lights-headlamps-hygiene-25886', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}, res => {
  let d = ''; res.on('data', c => d += c);
  res.on('end', () => {
    const m = [...d.matchAll(/https:\/\/contents\.mediadecathlon\.com\/p\d+\/[^"'\s]+\.jpg/gi)].map(x => x[0]);
    console.log('Matches:', [...new Set(m)].slice(0, 10));
  });
});
