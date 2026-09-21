import {HOUR,finite,value,fieldFor} from './engine.mjs';

// These are invitations to inspect diagnostics, never precipitation-phase predictions.
export function winterRelevant(data,time){
 return (data?.ts||[]).some(t=>t>=time&&t<=time+24*HOUR&&(
  (finite(value(data,'temperature',t))&&value(data,'temperature',t)<=275.15)||
  (finite(value(data,'precipSnowAmount',t))&&value(data,'precipSnowAmount',t)>0)));
}
export function nextSignal(data,time,thresholds){
 const events=[];
 for(const [key,limit,label] of [['precipAmount',thresholds.rain,'Wet interval'],['windGust',thresholds.gust,'Gust signal']]){
  const f=fieldFor(data,key);if(!f||!finite(limit)||limit<=0)continue;
  const i=f.ts.findIndex((t,i)=>t>=time&&t<=time+24*HOUR&&finite(f.values[i])&&f.values[i]>=limit);
  if(i>=0)events.push({key,label,time:f.ts[i],value:f.values[i],limit});
 }
 return events.sort((a,b)=>a.time-b.time)[0]||null;
}
