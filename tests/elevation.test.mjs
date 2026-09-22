import test from 'node:test';
import assert from 'node:assert/strict';
import {elevationNumber,readElevation,elevationDifference,elevationLoader,temperatureAtElevation} from '../src/elevation.mjs';
import {format} from '../src/engine.mjs';
const base={temperature:293.15,siteElevation:1000,modelElevation:500,lapseRate:6.5,enabled:true};
test('elevation temperature is opt-in, preserves its input and cools uphill or warms downhill',()=>{
 const input={...base};const result=temperatureAtElevation(input);
 assert.equal(temperatureAtElevation({...base,enabled:false}).status,'off');
 assert.deepEqual(input,base);assert.equal(result.original,293.15);assert.equal(result.change,-3.25);assert.equal(result.estimate,289.9);
 assert.equal(temperatureAtElevation({...base,siteElevation:0}).change,3.25);
 assert.equal(temperatureAtElevation({...base,siteElevation:-430,modelElevation:0}).change,2.795);
 assert.equal(temperatureAtElevation({...base,siteElevation:500}).estimate,293.15);
});
test('an explicitly entered inversion reverses the sign and zero lapse preserves temperature',()=>{
 assert.equal(temperatureAtElevation({...base,lapseRate:-2}).estimate,294.15);
 assert.equal(temperatureAtElevation({...base,lapseRate:0}).estimate,293.15);
});
test('missing temperatures, elevations and lapse rates never produce a correction; bounds are enforced',()=>{
 for(const key of ['temperature','siteElevation','modelElevation','lapseRate'])for(const value of [null,undefined,'',NaN,Infinity,false])assert.equal(temperatureAtElevation({...base,[key]:value}).status,'missing');
 for(const patch of [{siteElevation:9001},{siteElevation:-501},{modelElevation:9001},{lapseRate:21},{lapseRate:-21},{temperature:-1}])assert.equal(temperatureAtElevation({...base,...patch}).status,'invalid');
});
test('estimate retains calculation precision with rounded Celsius and Fahrenheit output',()=>{
 const result=temperatureAtElevation(base);assert.equal(result.change,-3.25);
 assert.equal(format(result.estimate,'K'),'17 °C');assert.equal(format(result.estimate,'K',{temp:'F'}),'62 °F');
 assert.equal(format(result.original,'K',{temp:'F'}),'68 °F');
});
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
