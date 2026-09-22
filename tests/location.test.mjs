import test from 'node:test';
import assert from 'node:assert/strict';
import {currentPosition} from '../src/location.mjs';
test('location is requested on demand with bounded time and valid coordinate order',async()=>{let options;const point=await currentPosition({getCurrentPosition(ok,fail,o){options=o;ok({coords:{latitude:31.95,longitude:35.94}});}});assert.deepEqual(point,{lat:31.95,lon:35.94});assert.equal(options.timeout,15000);assert.equal(options.enableHighAccuracy,false);});
test('location errors explain denied permission, timeout and unavailable service',async()=>{for(const [code,message] of [[1,/denied/],[2,/unavailable/],[3,/timed out/]])await assert.rejects(currentPosition({getCurrentPosition(ok,fail){fail({code});}}),message);await assert.rejects(currentPosition(null),/unavailable/);});
test('invalid browser coordinates are rejected instead of selecting a wrong point',async()=>{for(const latitude of [NaN,91,null])await assert.rejects(currentPosition({getCurrentPosition(ok){ok({coords:{latitude,longitude:35}});}}),/could not be read/);});
