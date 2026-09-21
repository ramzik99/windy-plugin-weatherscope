import {test} from 'node:test';
import assert from 'node:assert/strict';
import {normalize,HOUR} from '../src/engine.mjs';
import {diagnostics,windComponents,windowSummary,predictability} from '../src/diagnostics.mjs';
const now=Date.UTC(2026,8,21),ts=Array.from({length:9},(_,i)=>now+3*HOUR*i);
function fixture(){return normalize({data:{ts,temperature:ts.map(()=>293.15),precipAmount:ts.map(()=>2)},header:{model:'mblue',modelElevation:200},sounding:{ts:[now],'temp-850h':[293.15],'temp-700h':[283.15],'temp-500h':[263.15],'dewPoint-850h':[288.15],'dewPoint-700h':[278.15],'gh-850h':[1500],'gh-700h':[3000],'gh-500h':[5500],'wind-850h':[10],'windDir-850h':[270],'wind-500h':[20],'windDir-500h':[270]},summary:[{index:0,segments:8,predictability:80}]},'mblue');}
test('meteorological wind convention and direction wrap',()=>{assert.ok(Math.abs(windComponents(10,270).u-10)<1e-8);assert.ok(Math.abs(windComponents(10,0).v+10)<1e-8);assert.equal(windComponents(-1,0),null);});
test('known profile yields K=40 and TT=55, shear=10, lapse=7.5',()=>{const d=diagnostics(fixture(),now);const get=k=>d.find(f=>f.key===k).values[0];assert.equal(get('kIndex'),40);assert.equal(get('totalTotals'),55);assert.equal(get('shear850500'),10);assert.equal(get('lapse850500'),7.5);assert.equal(get('freezingCrossing'),4250);});
test('below-ground and unknown-terrain indices withheld',()=>{let f=fixture();f.header.modelElevation=2000;assert.equal(diagnostics(f,now).some(f=>f.key==='kIndex'),false);delete f.header.modelElevation;assert.equal(diagnostics(f,now).length,0);});
test('no humidity data means no humidity-dependent indices',()=>{const f=fixture();f.fields=f.fields.filter(r=>!r.key.startsWith('dewPoint'));assert.equal(diagnostics(f,now).some(f=>f.key==='kIndex'||f.key==='totalTotals'),false);});
test('24-hour total excludes ending interval and rejects gaps',()=>{const f=fixture();assert.equal(windowSummary(f,now).rain,16);f.fields.find(r=>r.key==='precipAmount').values[2]=null;assert.equal(windowSummary(f,now).rain,null);});
test('predictability respects day boundaries and valid range',()=>{const f=fixture();assert.equal(predictability(f,now),80);assert.equal(predictability(f,ts[8]),null);f.summary[0].predictability=120;assert.equal(predictability(f,now),null);});
