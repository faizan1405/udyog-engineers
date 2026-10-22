const https = require('https');

https.get('https://www.decathlon.in/p/8640739/isothermal-flask-mh100-s-steel-double-wall-with-air-gap-0-75wide-opening-black', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}, res => {
  let d = ''; res.on('data', c => d += c);
  res.on('end', () => {
    const og = d.match(/property="og:image"\s+content="([^"]+)"/i) || d.match(/content="([^"]+)"\s+property="og:image"/i);
    console.log('Flask OG:', og ? og[1] : null);
  });
});
