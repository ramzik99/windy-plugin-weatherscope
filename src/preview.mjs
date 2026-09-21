import App from './App.svelte';
import {HOUR,normalize} from './engine.mjs';
const base=Math.floor(Date.now()/(3*HOUR))*3*HOUR;
function sample(model){
 const offset={mblue:0,ecmwf:1,gfs:-1.8,icon:.5}[model]||0;
 const ts=Array.from({length:25},(_,i)=>base+(i-2)*3*HOUR);
 const temperatures=ts.map((_,i)=>273.15+16+5*Math.sin(i/3)+offset);
 const data={ts,temperature:temperatures,dewPoint:temperatures.map(t=>t-6),wind:ts.map((_,i)=>6+4*Math.sin(i/4)**2),windDir:ts.map((_,i)=>(220+i*4)%360),windGust:ts.map((_,i)=>12+6*Math.sin(i/4)**2),pressure:ts.map((_,i)=>101300-i*35),precipAmount:ts.map((_,i)=>i>4&&i<9?2.4:0),precipSnowAmount:ts.map(()=>0),precipConvectiveAmount:ts.map(()=>0)};
 const sounding={ts};
 for(const p of [1000,925,850,700,500,400,300,200,150]){
  const z=44330*(1-(p/1013.25)**.1903);
  sounding[`temp-${p}h`]=temperatures.map(t=>Math.max(213,t-z*.0065));
  sounding[`dewPoint-${p}h`]=sounding[`temp-${p}h`].map(t=>t-7);
  sounding[`rh-${p}h`]=ts.map(()=>60);sounding[`wind-${p}h`]=ts.map((_,i)=>6+z*.003+Math.sin(i)*2);
  sounding[`windDir-${p}h`]=ts.map(()=>240);sounding[`gh-${p}h`]=ts.map(()=>z);sounding[`cloud-${p}h`]=ts.map(()=>p===700?65:15);
 }
 return normalize({data,header:{model,refTime:new Date(base-6*HOUR).toISOString(),elevation:250,modelElevation:270,availableLevels:['850h','700h','500h','300h']},sounding,meteogram:{ts,dewPoint:data.dewPoint,cloudBase:ts.map(()=>1200)},summary:[]},model);
}
let app;
app=new App({target:document.getElementById('app'),props:{demo:true,placeName:'Basel, Switzerland',location:{lat:47.56,lon:7.59},timestamp:base,load:async model=>sample(model),onLocation:location=>app.$set({location}),onTime:timestamp=>app.$set({timestamp})}});
