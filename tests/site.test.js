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

test('hero and contact avoid generic glowing status dots', () => {
  assert.doesNotMatch(html, /class="pulse-dot"/);
});

test('FleetOps solution is linked and distinguishes demo from production', () => {
  const solution = readFileSync(new URL('../solutions/fleetops/index.html', import.meta.url), 'utf8');
  const solutionScript = readFileSync(new URL('../solutions/fleetops/fleetops.js', import.meta.url), 'utf8');
  assert.match(html, /href="\/solutions\/fleetops\/"/);
  assert.match(solution, /Demo vs\. client-ready system/);
  assert.match(solution, /not a secure multi-user SaaS/);
  assert.match(solution, /mailto:elghoualizakariae@gmail\.com/);
  assert.match(solution, /data-t="faqQ1"/);
  assert.match(solutionScript, /kodyra-site-lang/);
  assert.doesNotMatch(solution, /class="pulse-dot"/);
});
