import {test} from 'node:test';
import assert from 'node:assert/strict';
import {HOUR,normalize,format,value,derived,compare} from '../src/engine.mjs';
const t=Date.UTC(2026,8,21,12);
const payload={data:{ts:[t,t+3*HOUR],temperature:[293.15,null],pressure:[100000,99700],wind:[0,3],newField:[42,43]},header:{model:'mblue'},meteogram:{ts:[t,t+3*HOUR],dewPoint:[283.15,null]}};
test('missing values stay missing and calm winds stay zero',()=>{const d=normalize(payload,'mblue');assert.equal(value(d,'temperature',t+3*HOUR),null);assert.equal(value(d,'wind',t),0);assert.equal(value(d,'wind',t+24*HOUR),null);});
test('all returned fields survive including unknown variables',()=>{const d=normalize(payload,'mblue');assert.equal(d.fields.find(f=>f.key==='newField').unit,'raw');assert.equal(value(d,'dewPoint',t),283.15);});
test('unit conversion',()=>{assert.equal(format(273.15,'K'),'0 °C');assert.equal(format(273.15,'K',{temp:'F'}),'32 °F');assert.equal(format(100000,'Pa'),'1000 hPa');assert.equal(format(null,'K'),'—');});
test('RH and exact pressure tendency',()=>{const d=normalize(payload,'mblue');assert.ok(Math.abs(derived(d,t).find(f=>f.key==='rh').values[0]-52.54)<.2);assert.equal(derived(d,t+3*HOUR).find(f=>f.key==='pressureTrend').values[0],-300);});
test('comparison refuses misaligned times',()=>{const a=normalize(payload,'mblue'),b=normalize({...payload,data:{...payload.data,ts:[t+HOUR,t+4*HOUR]},header:{model:'gfs'}},'gfs');assert.equal(compare([a,b],'temperature',t).entries.length,1);assert.equal(compare([a,b],'temperature',t).spread,null);});
test('malformed timestamps rejected',()=>{assert.throws(()=>normalize({...payload,data:{ts:[t,t-1]}},'mblue'));});
test('actual served model retained',()=>{assert.equal(normalize({...payload,header:{model:'gfs'}},'mblue').model,'gfs');});
test('profile and surface values must have identical valid times',()=>{const d=normalize({...payload,meteogram:{ts:[t+HOUR],dewPoint:[283.15]}},'mblue');assert.equal(value(d,'dewPoint',t),null);assert.equal(derived(d,t).some(f=>f.key==='rh'),false);});
test('duplicate served sources do not inflate comparison count',()=>{const d=normalize(payload,'mblue');assert.equal(compare([d,d],'temperature',t).entries.length,1);assert.equal(compare([d,d],'temperature',t).spread,null);});

test('whole-number display preserves trace amounts, missing values and calculation precision',()=>{
 assert.equal(format(293.76,'K'),'21 °C');assert.equal(format(100153,'Pa'),'1002 hPa');assert.equal(format(.2,'mm'),'<1 mm');assert.equal(format(0,'mm'),'0 mm');assert.equal(format(-.1,'°C/km'),'0 °C/km');assert.equal(format(2.25,'m/s',{wind:'ms'}),'2 m/s');assert.equal(value(normalize(payload,'mblue'),'temperature',t),293.15);
});
