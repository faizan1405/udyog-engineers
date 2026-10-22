const https = require('https');

const list = [
  { name: 'headlamp', url: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFr1Ci8GiZ5Oo8trnkDhfz5jQKfcekj3NhXNKIaxbNV_dTYOt8poPSP2-4O-a_pAhsG7dZrTN2ctb3UgfQ7E5KswUyFwoi_gL25eASqtis9dkqm7omCpKC8Y9ODoJ07pYcLZYvrjEiLbFcOjIqBHINKbFuDoeRYOPJ-eKxwo0gumlNmlN0tv9XTdeSEC9rs0z30Zcz78FWbqC9-8JBeQHEvNaRQIF7oYXAtpwinfHr3af0=' },
  { name: 'searchlight', url: 'https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEUTsp3Q6_NOD6eFsKuDT9KrEDnPt4YISWN8dcQBrRShEB5xKTJ96u9133IBs8hoGHoHkQHTNqt56jnnVM8HTOW5YfDQqM_FeyBpvppLz8rpj5IMiPlc5kU-pmMPRZ5usGKm50XrA0eaU4IOlhZUnWR5-5Qw-On22UvWiQauwVZPrZriyIR2zqbRaA7uA==' }
];

async function run() {
  for (const it of list) {
    const loc = await new Promise(r => https.get(it.url, res => r(res.headers.location)));
    console.log(it.name, '->', loc);
    if (loc) {
      https.get(loc, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
        let d = ''; res.on('data', c => d += c);
        res.on('end', () => {
          const og = d.match(/property="og:image"\s+content="([^"]+)"/i) || d.match(/content="([^"]+)"\s+property="og:image"/i);
          console.log(it.name, 'OG:', og ? og[1] : null);
        });
      });
    }
  }
}

run();
