import {finite,fieldFor,HOUR} from './engine.mjs';
import {windowSummary} from './diagnostics.mjs';
export function dayOffset(data){const offset=data?.raw?.celestial?.TZoffset??data?.header?.utcOffset;return finite(offset)&&Math.abs(offset)<=14?offset:null;}
export function sevenDays(data,now=Date.now(),local=false){
 const offset=dayOffset(data),point=offset!==null;
 const midnight=new Date(now+(point?offset*HOUR:0));
 if(local&&!point)midnight.setHours(0,0,0,0);else midnight.setUTCHours(0,0,0,0);
 const summaries=(Array.isArray(data?.summary)?data.summary:Object.values(data?.summary||{})).filter(s=>s&&typeof s==='object');
 return Array.from({length:7},(_,day)=>{
  const a=new Date(midnight),b=new Date(midnight);
  if(local&&!point){a.setDate(a.getDate()+day);b.setDate(b.getDate()+day+1);}else{a.setUTCDate(a.getUTCDate()+day);b.setUTCDate(b.getUTCDate()+day+1);}
  let start=+a-(point?offset*HOUR:0),end=+b-(point?offset*HOUR:0);
  // Provider timestamps identify the forecast point's calendar days, independently of the device.
  const key=t=>new Date(t+offset*HOUR).toISOString().slice(0,10);
  const dated=point?summaries.filter(s=>finite(s.timestamp)&&key(s.timestamp)===key(start)):[];
  const summary=dated.length===1?dated[0]:null;
  if(summary){start=summary.timestamp;const next=summaries.find(s=>finite(s.timestamp)&&s.timestamp>start&&s.timestamp<=start+25*HOUR);end=next?.timestamp??start+24*HOUR;}
  const ts=(data?.ts||[]).filter(t=>t>=start&&t<end),f=fieldFor(data,'temperature');
  const temperatures=f?f.ts.flatMap((t,i)=>t>=start&&t<end&&finite(f.values[i])?[f.values[i]]:[]):[];
  const totals=windowSummary(data,start,(end-start)/HOUR);
  const indices=ts.map(t=>data.ts.indexOf(t));
  const matching=summary?[summary]:point?[]:summaries.filter(s=>Number.isInteger(s.index)&&Number.isInteger(s.segments)&&s.segments>0&&indices.length&&indices.every(i=>i>=s.index&&i<s.index+s.segments));
  const p=matching.length===1?matching[0].predictability:null;
  const providerRange=summary&&finite(summary.tempMin)&&finite(summary.tempMax)&&summary.tempMin<=summary.tempMax;
  return {start,end,time:ts.length?ts.reduce((best,t)=>Math.abs(t-(start+end)/2)<Math.abs(best-(start+end)/2)?t:best,ts[0]):null,
   low:providerRange?summary.tempMin:temperatures.length?Math.min(...temperatures):null,high:providerRange?summary.tempMax:temperatures.length?Math.max(...temperatures):null,
   label:new Date(start+(point?offset*HOUR:0)).toLocaleDateString('en-GB',{weekday:'short',day:'numeric',...(!local||point?{timeZone:'UTC'}:{})}),
   rain:totals.rain,predictability:finite(p)&&p>=0&&p<=100?p:null,partial:!totals.rainComplete,providerRange:!!providerRange,available:ts.length>0};
 });
}
