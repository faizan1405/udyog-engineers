const https = require('https');

const urls = [
  { name: 'sleeping-bag', url: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFtvQUSzUZWJxIpju8wjhhrXYR-hkNVmxs_-P0m5ytyw7v0efbJyWi-xa61CsLNEbUgWfHx29g3vJcAxZqEObpWMYq43KQoV8x8_uf9dSbrcHqozvdjFYM5QOAlT2veZ4l4pnC6IsW2sta2c26tedkyCXKg-BUMx3ZYfBM1QqtGzLmE0q5KKb16qPQnW4c-fJ7y' },
  { name: 'chair', url: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHeS8EPS-j-_2-zXzwH4XS_u0losVgUFY0AUm-7EOVsCSqR6TC8fgkIH1LGyttUrHo3lp5kw9QHcKkYO7fTfX4imIB5904V9hVNo3zKELDrsgoWpb6pRT930J33JDJpXfizTIB_JarD47JI-xA1uQPShkT4Df86YrV4go22EqyhIZ5-0krhumtNrORXXg==' },
  { name: 'table', url: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHW7L8vDhYIVhvBOXy_zoCRKjLp5lWfGPPRilvsJcQQdB77dYv5HjMEpSfQZu6d6NI6UKkZFtJG9cGSNcV5Sot27dqJhHJ8gnXPNAmWlbbbwY2H4AksThQ9rIVQZeP8o3-oUP08HBa1SXayOC48SNsxEXsddncW8-x-RDUuAmpFVLjWxkOoGBG_re-NVFZTwiOGjqUXcSbf8VZ-BUjyJLyVzqtio4QASmrq9Lh6Pl3Vxs9FpZBt0vPGZg==' }
];

async function check() {
  for (const item of urls) {
    const loc = await new Promise(res => {
      https.get(item.url, r => res(r.headers.location));
    });
    console.log(item.name, '->', loc);
  }
}

check();
