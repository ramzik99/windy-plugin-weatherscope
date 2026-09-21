import test from 'node:test';
import assert from 'node:assert/strict';
import {nextSignal,winterRelevant} from '../src/brief.mjs';
import {HOUR} from '../src/engine.mjs';
const thresholds={rain:2,gust:15};
const data=entries=>({ts:[0,3*HOUR,6*HOUR,30*HOUR],fields:Object.entries(entries).map(([key,values])=>({key,section:'data',ts:[0,3*HOUR,6*HOUR,30*HOUR],values}))});
test('brief prioritizes earliest signal and does not treat missing samples as clear weather',()=>{
 const d=data({precipAmount:[null,0,3,9],windGust:[null,18,20,30]});
 assert.equal(nextSignal(d,0,thresholds).key,'windGust');
 assert.equal(nextSignal(data({precipAmount:[null,null,null,8]}),0,thresholds),null);
});
test('winter invitation requires a valid cold or snow signal within 24 hours',()=>{
 assert.equal(winterRelevant(data({temperature:[null,280,281,270]}),0),false);
 assert.equal(winterRelevant(data({temperature:[280,275,281,290]}),0),true);
 assert.equal(winterRelevant(data({precipSnowAmount:[null,1,0,0]}),0),true);
 assert.equal(winterRelevant(data({temperature:['270',null,null,null]}),0),false);
});
