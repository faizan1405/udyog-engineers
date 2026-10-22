const https = require('https');

const redirectUrl = 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFq-46PcHgnnsuuFUrxT6QTJ1dbMRrednbeQzhUxfW8zb7yMZ2HMPqPMAEsqOtdnhAq7Iu-yOCSLv0IMRyo8hYyGZCT382yAjOcVpM81hDwSImsi4R19paD3m8MU9ix1kgRmbsdtSxX7SYxsrRnQXdRNYfFsiaJFmAc_EkPgEc5Tebk-zgqHznfxecey8Ty_-wyFcZU_k4NJP3HuvjwdKoeKWUQf5yRxfHs';

https.get(redirectUrl, res => {
  console.log('Location:', res.headers.location);
  if (res.headers.location) {
    https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => {
        const og = d.match(/property="og:image"\s+content="([^"]+)"/i) || d.match(/content="([^"]+)"\s+property="og:image"/i);
        console.log('Flask OG:', og ? og[1] : null);
      });
    });
  }
});
