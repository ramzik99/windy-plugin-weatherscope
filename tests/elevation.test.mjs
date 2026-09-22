import test from 'node:test';
import assert from 'node:assert/strict';
import {elevationNumber,readElevation,elevationDifference,elevationLoader} from '../src/elevation.mjs';
test('missing height never becomes sea level; negative terrain and numeric strings are valid',()=>{
 for(const value of [null,undefined,'',' ',false,true,NaN,Infinity,{}])assert.equal(elevationNumber(value),null);
 assert.equal(elevationNumber(0),0);assert.equal(elevationNumber('-430'),-430);
 assert.equal(readElevation({data:{data:-430}}),-430);assert.equal(readElevation({data:0}),0);
 assert.equal(elevationDifference(-430,100),-530);assert.equal(elevationDifference(800,200),600);assert.equal(elevationDifference(null,200),null);
});
test('terrain requests share cache, keep nearby points distinct and retry failures',async()=>{
 let calls=0;const load=elevationLoader(async(lat)=>{calls++;if(lat===1&&calls===1)throw Error('offline');return {data:lat*100};});
 assert.equal(await load({lat:1,lon:2}),null);assert.equal(await load({lat:1,lon:2}),100);
 await Promise.all([load({lat:1,lon:2}),load({lat:1,lon:2})]);assert.equal(calls,2);
 await load({lat:1.000001,lon:2});assert.equal(calls,3);
 assert.equal(await load({lat:91,lon:2}),null);assert.equal(calls,3);
});
