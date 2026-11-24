import { readFile, mkdir, writeFile } from 'node:fs/promises';

const assets = [
  ['index.html', 'text/html; charset=utf-8'],
  ['styles/main.css', 'text/css; charset=utf-8'],
  ['src/main.js', 'text/javascript; charset=utf-8'],
  ['src/core.js', 'text/javascript; charset=utf-8'],
  ['assets/favicon.svg', 'image/svg+xml']
];
const routes = {};
for (const [path, mime] of assets) {
  routes['/' + path] = { body: await readFile('dist/' + path, 'utf8'), mime };
}
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'none'; base-uri 'none'; form-action 'self'; object-src 'none'; frame-ancestors 'none'"
};
const source = [
  'const ROUTES = ' + JSON.stringify(routes) + ';',
  'const SECURITY = ' + JSON.stringify(securityHeaders) + ';',
  "addEventListener('fetch', event => event.respondWith(handleRequest(event.request)));",
  "function handleRequest(req) {",
  "  if (req.method !== 'GET' && req.method !== 'HEAD') return new Response('Method not allowed', {status:405, headers:{Allow:'GET, HEAD'}});",
  "  const path = new URL(req.url).pathname;",
  "  const route = ROUTES[path === '/' ? '/index.html' : path];",
  "  if (!route) return new Response('Not found', {status:404,headers:{'Content-Type':'text/plain; charset=utf-8',...SECURITY}});",
  "  return new Response(req.method === 'HEAD' ? null : route.body, {status:200,headers:{'Content-Type':route.mime,'Cache-Control':'public, max-age=300',...SECURITY}});",
  "}"
].join('\n') + '\n';

await mkdir('build', {recursive:true});
await writeFile('build/kodyra-worker.js', source, 'utf8');
console.log('Cloudflare Worker bundle generated; ' + Object.keys(routes).length + ' assets; ' + Buffer.byteLength(source) + ' bytes.');
