const https = require('https');

const redirectUrl = 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEGUvYLnGvvvGx2ho-0CZbRtR-h0B0DAVzuq2YVR3EQtXXERTqMDYKUWij-MhVM_2Eaz3urzlweS9PaChVGZYElQ3ThVkb8OGL21r4cA3tX0kekrcvMKoEPe104xzXvBm37J3SYT5EiTSVxg-IbhSm0Hou_FSjkV0qO-QclB4S3Cxs=';

https.get(redirectUrl, res => {
  console.log('Location:', res.headers.location);
  if (res.headers.location) {
    https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => {
        const og = d.match(/property="og:image"\s+content="([^"]+)"/i) || d.match(/content="([^"]+)"\s+property="og:image"/i);
        console.log('70L OG:', og ? og[1] : null);
      });
    });
  }
});
