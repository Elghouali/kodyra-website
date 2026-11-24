/** Pure browser-demo business logic. No network or tracking. */
export const SAMPLE_CSV = `order_id,customer,amount,status
ORD-101,Amina,450,paid
ORD-102,Omar,120,pending
ORD-102,Omar,120,pending
ORD-103,Nadia,,paid
ORD-104,Karim,680,paid
ORD-105,,280,pending`;

export const VEHICLES = Object.freeze({
  city: { en:'City · Urban hatchback', fr:'Citadine · Compacte', rate: 280 },
  comfort: { en:'Comfort · Family sedan', fr:'Confort · Berline familiale', rate: 420 },
  executive: { en:'Executive · Premium class', fr:'Exécutive · Premium', rate: 720 }
});

export function parseCSV(text){
  if(typeof text !== 'string' || !text.trim()) throw new Error('CSV input is empty.');
  if(text.length > 250_000) throw new Error('CSV input exceeds 250 KB demo limit.');
  text = text.replace(/^\uFEFF/, '');
  const rows=[]; let row=[], field='', quoted=false;
  for(let i=0;i<text.length;i++){
    const ch=text[i];
    if(ch === '"'){
      if(quoted && text[i+1]==='"'){field+='"';i++;}
      else if(quoted){quoted=false;}
      else if(field===''){quoted=true;}
      else throw new Error(`Unexpected quote at character ${i+1}.`);
    } else if(ch === ',' && !quoted){row.push(field);field='';}
    else if((ch==='\n'||ch==='\r')&&!quoted){
      if(ch==='\r'&&text[i+1]==='\n')i++;
      row.push(field); field='';
      if(row.some(v=>v!=='')) rows.push(row);
      row=[];
    } else field+=ch;
  }
  if(quoted) throw new Error('CSV has an unclosed quoted field.');
  row.push(field);if(row.some(v=>v!==''))rows.push(row);
  if(rows.length < 2) throw new Error('Add a header and at least one data row.');
  if(rows.length > 2001) throw new Error('Demo supports up to 2,000 data rows.');
  const headers=rows.shift().map(s=>s.trim());
  if(headers.some(h=>!h))throw new Error('Every column needs a header.');
  if(new Set(headers).size !== headers.length)throw new Error('Column headers must be unique.');
  if(headers.length > 30)throw new Error('Demo supports up to 30 columns.');
  if(rows.some(r=>r.length!==headers.length))throw new Error('Some rows have a different number of columns.');
  return {headers,rows};
}

export function analyzeCSV(csv){
  const {headers,rows}=parseCSV(csv); const unique=[],seen=new Set();let duplicates=0;
  for(const r of rows){const key=JSON.stringify(r);if(seen.has(key)){duplicates++;continue;}seen.add(key);unique.push(r);}
  const missing=rows.reduce((acc,row)=>acc+row.filter(v=>!v.trim()).length,0);
  const count=rows.length*headers.length;
  const fieldQuality=headers.map((name,index)=>({name,percent:Math.round(100*rows.filter(r=>r[index].trim()).length/rows.length)}));
  return {headers,rows:rows.length,duplicates,missing,completeness:Math.round(100*(count-missing)/count),fieldQuality,cleanedRows:unique};
}

function safeCell(value){
  const v=String(value);
  // Neutralize formula injection in spreadsheets opened from exported CSV.
  const escaped=/^[\s]*[=+\-@\t\r]/.test(v) ? "'"+v : v;
  return /[",\r\n]/.test(escaped) ? '"'+escaped.replace(/"/g,'""')+'"' : escaped;
}
export function toCSV(headers,rows){return [headers,...rows].map(r=>r.map(safeCell).join(',')).join('\r\n')+'\r\n';}
function parseDay(day){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(day))throw new Error('Enter valid dates.');
  const millis=Date.parse(day+'T00:00:00Z');
  if(!Number.isFinite(millis)||new Date(millis).toISOString().slice(0,10)!==day)throw new Error('Enter valid dates.');
  return millis;
}
export function calculateQuote(vehicle,pickup,returnDate){
  const option=VEHICLES[vehicle];if(!option)throw new Error('Select a vehicle.');
  const start=parseDay(pickup),end=parseDay(returnDate),days=(end-start)/86400000;
  if(days<=0)throw new Error('Return date must be after pickup.');
  if(days>90)throw new Error('Demo quote supports up to 90 rental days.');
  return {vehicle,days,dailyRate:option.rate,total:days*option.rate,currency:'MAD',pickup,returnDate};
}
