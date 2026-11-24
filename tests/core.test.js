import test from 'node:test';
import assert from 'node:assert/strict';
import {parseCSV,analyzeCSV,toCSV,calculateQuote,SAMPLE_CSV} from '../src/core.js';

test('parses CSV with quoted commas, escaped quotes and multiline cells',()=>{
  assert.deepEqual(parseCSV('name,note\n"A, B","say ""hello"""\nC,"line1\nline2"'),{headers:['name','note'],rows:[['A, B','say "hello"'],['C','line1\nline2']]});
});
test('computes duplicates, missing and completeness without discarding source rows',()=>{
  const a=analyzeCSV(SAMPLE_CSV);assert.equal(a.rows,6);assert.equal(a.duplicates,1);assert.equal(a.missing,2);assert.equal(a.cleanedRows.length,5);assert.equal(a.completeness,92);
});
test('does not consider two distinct records to be duplicates',()=>{
  const a=analyzeCSV('id,name\n1,Alex\n2,Alex');assert.equal(a.duplicates,0);
});
test('rejects malformed or inconsistent CSV rows',()=>{
  assert.throws(()=>parseCSV('x,y\n1'),/different number/);assert.throws(()=>parseCSV('x,x\n1,2'),/unique/);assert.throws(()=>parseCSV('x,y\n"bad,1'),/unclosed/);
});
test('CSV export quotes data and neutralizes formulas',()=>{
  const s=toCSV(['name','value'],[['A, B','=HYPERLINK("bad")']]);assert.match(s,/"A, B"/);assert.match(s,/'=HYPERLINK/);
});
test('prices a five-day rental accurately in MAD',()=>{
  const q=calculateQuote('comfort','2026-12-01','2026-12-06');assert.equal(q.days,5);assert.equal(q.total,2100);
});
test('rejects invalid dates, reversed ranges and extreme durations',()=>{
  assert.throws(()=>calculateQuote('city','2026-02-30','2026-03-01'),/valid/);
  assert.throws(()=>calculateQuote('city','2026-12-06','2026-12-01'),/after/);
  assert.throws(()=>calculateQuote('city','2026-12-01','2027-06-01'),/90/);
});
