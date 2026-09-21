import {finite,value,fieldFor,HOUR} from './engine.mjs';

// Only exact valid-time values enter diagnostics. No mixing across sources or levels.
export function windComponents(speed,direction){
 if(!finite(speed)||speed<0||!finite(direction))return null;
 const r=direction*Math.PI/180;return {u:-speed*Math.sin(r),v:-speed*Math.cos(r)};
}
export function verticalProfile(data,time){
 const levels=[...new Set((data?.fields||[]).map(f=>f.key.match(/^temp-(\d+)h$/)?.[1]).filter(Boolean))].map(Number).sort((a,b)=>b-a);
 const ground=data?.header?.modelElevation;
 return levels.map(p=>{
  const t=value(data,`temp-${p}h`,time),td=value(data,`dewPoint-${p}h`,time),z=value(data,`gh-${p}h`,time);
  return {p,t,td,z,wind:value(data,`wind-${p}h`,time),dir:value(data,`windDir-${p}h`,time),belowGround:finite(ground)&&finite(z)?z<ground:null};
 });
}
export function diagnostics(data,time){
 const rows=[],get=k=>value(data,k,time),profile=verticalProfile(data,time);
 const add=(key,label,v,unit,method)=>{if(finite(v))rows.push({id:`derived.${key}`,key,label,unit,group:'Profile diagnostics',section:'derived',values:[v],ts:[time],method});};
 const t850=get('temp-850h'),t700=get('temp-700h'),t500=get('temp-500h'),td850=get('dewPoint-850h'),td700=get('dewPoint-700h');
 const ground=data?.header?.modelElevation;
 const above=levels=>finite(ground)&&levels.every(p=>{const z=get(`gh-${p}h`);return finite(z)&&z>=ground;});
 const baseMethod='Same source and exact valid time; withheld unless required levels are above the supplied model terrain.';
 if(above([850,500])&&[t850,t500].every(finite)){
  const dz=get('gh-500h')-get('gh-850h');
  if(dz>0)add('lapse850500','850–500 hPa lapse rate',(t850-t500)*1000/dz,'°C/km',`${baseMethod} Temperature decrease divided by geopotential-height difference.`);
  if(finite(td850)&&td850<=t850)add('totalTotals','Total Totals index',t850+td850-2*t500,'°C index',`${baseMethod} T850 + Td850 − 2×T500. Diagnostic only; not a severe-weather probability.`);
  const a=windComponents(get('wind-850h'),get('windDir-850h')),b=windComponents(get('wind-500h'),get('windDir-500h'));
  if(a&&b)add('shear850500','850–500 hPa vector shear',Math.hypot(b.u-a.u,b.v-a.v),'m/s',`${baseMethod} Magnitude of upper-minus-lower wind vector. This is not 0–6 km bulk shear.`);
 }
 if(above([850,700,500])&&[t850,t700,t500,td850,td700].every(finite)&&td850<=t850&&td700<=t700)add('kIndex','K index',(t850-t500)+(td850-273.15)-(t700-td700),'°C index',`${baseMethod} (T850 − T500) + Td850 − (T700 − Td700), with temperatures in Celsius.`);
 // Only bracketed crossings from adjacent available levels are reported; no extrapolation.
 for(let i=1;i<profile.length;i++){
  const a=profile[i-1],b=profile[i];
  if(a.belowGround!==false||b.belowGround!==false||![a.t,b.t,a.z,b.z].every(finite)||b.z<=a.z)continue;
  if(a.t>=273.15&&b.t<273.15){add('freezingCrossing','First resolved freezing crossing',a.z+(273.15-a.t)/(b.t-a.t)*(b.z-a.z),'m MSL',`${baseMethod} Linear interpolation between ${a.p} and ${b.p} hPa. Coarse profiles can miss other crossings; not a snow level.`);break;}
 }
 return rows;
}
export function windowSummary(data,time,hours=24){
 const end=time+hours*HOUR;
 const list=key=>{const f=fieldFor(data,key);return f?f.ts.flatMap((ts,i)=>ts>=time&&ts<=end&&finite(f.values[i])?[f.values[i]]:[]):[];};
 const temps=list('temperature'),gusts=list('windGust');
 const rain=fieldFor(data,'precipAmount');let rainTotal=0,cursor=time,complete=false;
 if(rain){for(let i=0;i<rain.ts.length-1;i++){const from=rain.ts[i],to=rain.ts[i+1];if(from<time||from>=end)continue;if(from!==cursor||to>end||to-from>3*HOUR||!finite(rain.values[i])||rain.values[i]<0)break;rainTotal+=rain.values[i];cursor=to;}complete=cursor===end;}
 return {low:temps.length?Math.min(...temps):null,high:temps.length?Math.max(...temps):null,maxGust:gusts.length?Math.max(...gusts):null,rain:complete?rainTotal:null,rainComplete:complete};
}
export function predictability(data,time){
 const summaries=Array.isArray(data?.summary)?data.summary:Object.values(data?.summary||{});
 const index=data?.ts.indexOf(time)??-1;if(index<0)return null;
 const day=summaries.find(s=>Number.isInteger(s.index)&&Number.isInteger(s.segments)&&index>=s.index&&index<s.index+s.segments);
 const p=day?.predictability;return finite(p)&&p>=0&&p<=100?p:null;
}
