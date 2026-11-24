import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';

const source = readFileSync('build/kodyra-worker.js', 'utf8');
let handler;
runInNewContext(source, {
  URL, Response,
  addEventListener(event, fn) {
    if (event === 'fetch') handler = fn;
  }
});
assert.equal(typeof handler, 'function');
async function fetchMock(path, method='GET') {
  let response;
  handler({request:{method,url:'https://kodyra.test' + path},respondWith(promise) {response=promise;}});
  return await response;
}
const homepage=await fetchMock('/');
assert.equal(homepage.status, 200);
assert.match(await homepage.text(), /KODYRA/);
for (const [path,mime] of [['/src/main.js','text/javascript'],['/styles/main.css','text/css'],['/assets/favicon.svg','image/svg+xml']]) {
  const response=await fetchMock(path);
  assert.equal(response.status, 200);
  assert.ok(response.headers.get('content-type').startsWith(mime));
  assert.ok((await response.text()).length>50);
}
assert.equal((await fetchMock('/does-not-exist')).status,404);
assert.equal((await fetchMock('/', 'POST')).status,405);
assert.equal((await fetchMock('/', 'HEAD')).status,200);
console.log('Worker smoke tests passed.');
