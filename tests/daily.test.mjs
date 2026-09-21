import test from 'node:test';
import assert from 'node:assert/strict';
import {normalize,HOUR} from '../src/engine.mjs';
import {sevenDays} from '../src/daily.mjs';
const start=Date.UTC(2026,8,22);
function fixture(){const ts=Array.from({length:57},(_,i)=>start+i*3*HOUR);return normalize({data:{ts,temperature:ts.map((_,i)=>280+i),precipAmount:ts.map(()=>1)},summary:Array.from({length:7},(_,i)=>({index:i*8,segments:8,predictability:90-i*5}))},'mblue');}
test('seven calendar days retain provider indices and exclude next midnight from temperature range',()=>{
 const days=sevenDays(fixture(),start+12*HOUR);assert.equal(days.length,7);assert.equal(days[0].low,280);assert.equal(days[0].high,287);assert.equal(days[0].rain,8);assert.equal(days[6].predictability,60);assert.equal(days[6].rain,8);
});
test('missing rain or truncated horizon does not become a dry daily total',()=>{
 const d=fixture();d.fields.find(f=>f.key==='precipAmount').values[1]=null;assert.equal(sevenDays(d,start)[0].rain,null);
 d.ts=d.ts.slice(0,8);d.fields.forEach(f=>{f.ts=d.ts;f.values=f.values.slice(0,8);});const days=sevenDays(d,start);assert.equal(days[0].rain,null);assert.equal(days[1].available,false);assert.equal(days[1].predictability,null);
});
test('invalid, missing, overlapping or misaligned predictability stays unavailable',()=>{
 const d=fixture();d.summary[0].predictability=120;assert.equal(sevenDays(d,start)[0].predictability,null);
 d.summary=[{index:0,segments:4,predictability:80},{index:4,segments:4,predictability:70}];assert.equal(sevenDays(d,start)[0].predictability,null);
 d.summary=[{index:0,segments:8,predictability:0}];assert.equal(sevenDays(d,start)[0].predictability,0);
 d.summary.push({...d.summary[0]});assert.equal(sevenDays(d,start)[0].predictability,null);
});
