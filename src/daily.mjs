import {finite,fieldFor,HOUR} from './engine.mjs';
import {windowSummary} from './diagnostics.mjs';

export function sevenDays(data,now=Date.now(),local=false){
 const midnight=new Date(now);
 if(local)midnight.setHours(0,0,0,0);else midnight.setUTCHours(0,0,0,0);
 const summaries=(Array.isArray(data?.summary)?data.summary:Object.values(data?.summary||{})).filter(s=>s&&Number.isInteger(s.index)&&s.index>=0&&Number.isInteger(s.segments)&&s.segments>0);
 return Array.from({length:7},(_,day)=>{
  const a=new Date(midnight),b=new Date(midnight);
  if(local){a.setDate(a.getDate()+day);b.setDate(b.getDate()+day+1);}else{a.setUTCDate(a.getUTCDate()+day);b.setUTCDate(b.getUTCDate()+day+1);}
  const start=+a,end=+b,ts=(data?.ts||[]).filter(t=>t>=start&&t<end);
  const f=fieldFor(data,'temperature');
  const temperatures=f?f.ts.flatMap((t,i)=>t>=start&&t<end&&finite(f.values[i])?[f.values[i]]:[]):[];
  const totals=windowSummary(data,start,(end-start)/HOUR);
  // Never average or relabel indices from multiple provider days as one daily score.
  const indices=ts.map(t=>data.ts.indexOf(t));
  const matching=summaries.filter(s=>indices.length&&indices.every(i=>i>=s.index&&i<s.index+s.segments));
  const p=matching.length===1?matching[0].predictability:null;
  const predictability=finite(p)&&p>=0&&p<=100?p:null;
  return {start,end,time:ts.length?ts.reduce((best,t)=>Math.abs(t-(start+end)/2)<Math.abs(best-(start+end)/2)?t:best,ts[0]):null,
   low:temperatures.length?Math.min(...temperatures):null,high:temperatures.length?Math.max(...temperatures):null,
   rain:totals.rain,predictability,partial:!totals.rainComplete,available:ts.length>0};
 });
}
