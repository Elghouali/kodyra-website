import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
test('project inquiry requests a timeframe and opens a mail draft', () => {
  assert.match(html, /id="client-timeline" name="timeline"/);
  assert.match(html, /id="client-service" name="service"/);
  assert.match(html, /id="client-budget" name="budget"/);
  assert.match(main, /`Timeline: \$\{fields\.timeline\}`/);
  assert.match(main, /mailto:elghoualizakariae@gmail\.com/);
});
test('portfolio clearly labels its engineering demonstrations', () => {
  assert.match(html, /kodyra-fleetops-live\.elghoualizakariae\.workers\.dev/);
  assert.match(html, /Browser-local demo records/);
  assert.match(main, /formTimeline:'Desired timeframe'/);
  assert.match(main, /formTimeline:'Délai souhaité'/);
});
