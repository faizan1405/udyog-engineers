const https = require('https');

const redirectUrl = 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFWZxHLCM4KoYuTz-dW8zatIb4MOZU0tk3TxnFLPhYB4EFFy9ObS2d0OY3g6mde6avv9t4kPnES1t01Kq_YhR4qgzuzZt7N7CxQC0m48sTry0_54GFqIvsAMUcyUJSJsHtskj0gGjXkP45KgFPW-4NP4xFvLlD_7GETqTuv6Hq-qXUhCKKltHlSnvRHL3N7';

https.get(redirectUrl, res => {
  console.log('Location:', res.headers.location);
  if (res.headers.location) {
    https.get(res.headers.location, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
      let d = ''; r.on('data', c => d += c);
      r.on('end', () => {
        const og = d.match(/property="og:image"\s+content="([^"]+)"/i) || d.match(/content="([^"]+)"\s+property="og:image"/i);
        console.log('Shelter OG:', og ? og[1] : null);
      });
    });
  }
});
