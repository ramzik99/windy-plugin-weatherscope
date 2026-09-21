import test from 'node:test';
import assert from 'node:assert/strict';
import {seriesGeometry,fieldColor,sourceHealth} from '../src/visuals.mjs';
import {HOUR} from '../src/engine.mjs';
test('chart keeps missing samples missing and uses actual time spacing',()=>{
 const g=seriesGeometry({ts:[0,HOUR,3*HOUR,4*HOUR],values:[2,null,5,7]},0,4*HOUR);
 assert.equal(g.points[1].y,null);assert.equal((g.path.match(/M/g)||[]).length,2);
 assert.equal(g.points[2].x,414);assert.equal(g.min,2);assert.equal(g.max,7);
});
test('constant, empty and long-gap series remain honest',()=>{
 assert.equal(seriesGeometry({ts:[0,HOUR],values:[null,NaN]},0,HOUR).path,'');
 const g=seriesGeometry({ts:[0,6*HOUR],values:[3,3]},0,6*HOUR);
 assert.equal((g.path.match(/M/g)||[]).length,2);assert.ok(g.points.every(p=>Number.isFinite(p.y)));
 assert.equal(fieldColor(null,0,1),'#1a2936');
});
test('source health distinguishes run age, lead and exact-time availability',()=>{
 const run=Date.parse('2026-09-20T00:00:00Z');
 const d={header:{refTime:'2026-09-20T00:00:00Z'},fields:[{ts:[run+HOUR],values:[4]},{ts:[run],values:[3]}]};
 assert.deepEqual(sourceHealth(d,run+HOUR,run+4*HOUR),{age:4,lead:1,available:1,total:2});
 assert.equal(sourceHealth({header:{},fields:[]},run).age,null);
});
