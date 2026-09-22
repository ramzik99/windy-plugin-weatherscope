export const HOUR=3600000;
export const MODELS={mblue:'Meteoblue',ecmwf:'ECMWF',gfs:'GFS',icon:'ICON'};
export const finite=v=>typeof v==='number'&&Number.isFinite(v);
const defs={
 temperature:['Temperature','K','Surface'],feelTemperature:['Feels like','K','Surface'],dewPoint:['Dew point','K','Moisture'],
 wind:['Wind','m/s','Wind'],windGust:['Gust','m/s','Wind'],windDir:['Wind direction','°','Wind'],pressure:['Pressure','Pa','Surface'],
 precipAmount:['Precipitation','mm/step','Precipitation'],precipSnowAmount:['Snow water equivalent','mm/step','Precipitation'],
 precipConvectiveAmount:['Convective precipitation','mm/step','Precipitation'],precipType:['Precipitation type','code','Precipitation'],
 cloudBase:['Cloud base','m','Clouds'],visibility:['Visibility','m','Clouds'],
 icon:['Weather symbol','code','Other'],moonPhase:['Moon phase','code','Other'],hour:['Local hour','h','Other'],isDay:['Daylight','boolean','Other'],
 waves:['Wave height','m','Marine'],wavesDir:['Wave direction','°','Marine'],wavesPeriod:['Wave period','s','Marine'],
 swell:['Swell height','m','Marine'],swell1:['Swell 1 height','m','Marine'],swell2:['Swell 2 height','m','Marine'],aqiUs:['US AQI','index','Air quality']
};
export function describe(key){
 if(defs[key])return {label:defs[key][0],unit:defs[key][1],group:defs[key][2]};
 const m=key.match(/^(temp|dewPoint|rh|wind|windDir|cloud|gh)-(surface|\d+h)$/);
 if(m){const [,kind,level]=m;const names={temp:['Temperature','K'],dewPoint:['Dew point','K'],rh:['Relative humidity','%'],wind:['Wind','m/s'],windDir:['Wind direction','°'],cloud:['Cloud fraction','%'],gh:['Geopotential height','m']};return {label:`${names[kind][0]} · ${level==='surface'?'surface':level.slice(0,-1)+' hPa'}`,unit:names[kind][1],group:kind==='cloud'?'Clouds':'Vertical profile'};}
 return {label:key,unit:'raw',group:'Other'};
}
export function normalize(payload,requestedModel){
 if(!Array.isArray(payload?.data?.ts)||!payload.data.ts.length)throw Error('No supported forecast time series was returned.');
 const fields=[];
 for(const section of ['data','meteogram','airgram','sounding']){
  const block=payload[section];if(!block)continue;
  const ts=block.ts||payload.data.ts;
  if(!Array.isArray(ts)||!ts.every((v,i,a)=>finite(v)&&v>1e11&&(i===0||v>a[i-1])))throw Error('Unsupported or unordered forecast timestamps.');
  for(const [key,values] of Object.entries(block))if(key!=='ts'&&Array.isArray(values))fields.push({id:`${section}.${key}`,key,section,ts,values,...describe(key)});
 }
 const header=payload.header||{};
 return {fields,ts:payload.data.ts,header,summary:payload.summary||[],raw:payload,requestedModel,model:header.model||requestedModel};
}
export function nearestIndex(ts,time,tolerance=90*60000){let best=-1,delta=Infinity;ts.forEach((t,i)=>{const d=Math.abs(t-time);if(d<delta){delta=d;best=i;}});return delta<=tolerance?best:-1;}
export function at(field,time){const i=nearestIndex(field.ts,time,0);return i<0?null:field.values[i]??null;}
export function fieldFor(data,key){return data?.fields.find(f=>f.key===key&&f.section==='data')||data?.fields.find(f=>f.key===key);}
export function value(data,key,time){const f=fieldFor(data,key);return f?at(f,time):null;}
export function format(v,unit,prefs={}){
 if(v===null||v===undefined||typeof v==='number'&&!finite(v))return '—';
 if(typeof v==='string'||typeof v==='boolean')return String(v);
 if(typeof v==='object')return JSON.stringify(v);
 let n=v,u=unit;
 if(unit==='K'){n=v-273.15;u='°C';if(prefs.temp==='F'){n=n*1.8+32;u='°F';}}
 if(unit==='Pa'){n=v/100;u='hPa';}
 if(unit==='m/s'&&prefs.wind!=='ms'){n=v*1.943844;u='kt';}
 // Round presentation only. Preserve trace precipitation and all raw calculations.
 const displayed=n>0&&n<1&&/^mm|^cm|^in\//.test(unit)?'<1':String(Math.round(n)||0);
 return `${displayed}${u==='raw'?' (raw)':u==='code'?' (code)':' '+u}`;
}
export function timeLabel(time,local=false){return new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit',...(local?{}:{timeZone:'UTC'})}).format(new Date(time));}
export function derived(data,time){
 const get=k=>value(data,k,time),rows=[];
 const push=(key,label,v,unit,group,method)=>{if(finite(v))rows.push({id:`derived.${key}`,key,label,unit,group,section:'derived',ts:[time],values:[v],method});};
 const t=get('temperature'),td=get('dewPoint');
 if(finite(t)&&finite(td)&&t>150&&td>150&&td<=t){const c=t-273.15,d=td-273.15;push('rh','Relative humidity',Math.min(100,100*Math.exp(17.625*d/(243.04+d)-17.625*c/(243.04+c))),'%','Moisture','Magnus approximation over liquid water using the same-source surface temperature and dew point.');}
 const p=get('pressure'),p0=value(data,'pressure',time-3*HOUR),pf=fieldFor(data,'pressure');
 if(pf&&finite(p)&&finite(p0)&&pf.ts.includes(time)&&pf.ts.includes(time-3*HOUR))push('pressureTrend','3-hour pressure change',p-p0,'Pa','Surface','Exact forecast timestamps 3 hours apart. This is a forecast change, not an observed pressure tendency.');
 return rows;
}
export function briefing(data,time,prefs,thresholds={gust:15,rain:2}){
 const items=[],wind=value(data,'wind',time),gust=value(data,'windGust',time),t=value(data,'temperature',time),td=value(data,'dewPoint',time);
 if(finite(t))items.push({label:'Selected forecast',text:`${format(t,'K',prefs)}${finite(td)?' · dew point '+format(td,'K',prefs):''}${finite(wind)?' · wind '+format(wind,'m/s',prefs):''}.`,key:'temperature'});
 if(finite(gust)&&gust>=thresholds.gust)items.push({label:'Wind signal',text:`Gusts ${format(gust,'m/s',prefs)} exceed your ${format(thresholds.gust,'m/s',prefs)} threshold.`,key:'windGust'});
 const rain=fieldFor(data,'precipAmount');
 if(rain){const i=rain.ts.findIndex((ts,i)=>ts>=time&&ts<=time+24*HOUR&&finite(rain.values[i])&&rain.values[i]>=thresholds.rain);if(i>=0)items.push({label:'Next wet interval',text:`${format(rain.values[i],'mm/step',prefs)} at ${timeLabel(rain.ts[i],prefs.local)}. Threshold ${thresholds.rain} mm/step.`,key:'precipAmount'});}
 const tendency=derived(data,time).find(f=>f.key==='pressureTrend');
 if(tendency)items.push({label:'Pressure evolution',text:`${format(tendency.values[0],'Pa',prefs)} over the preceding 3 forecast hours.`,key:'pressure'});
 if(!items.length)items.push({label:'Coverage',text:'No supported briefing parameters at this time. Inspect available fields below.',key:''});
 return items;
}
export function compare(datasets,key,time){
 const unique=datasets.filter((d,i,all)=>all.findIndex(other=>other.model===d.model)===i);
 const entries=unique.map(d=>{const f=fieldFor(d,key),i=f?f.ts.indexOf(time):-1;return {model:d.model,value:i<0?null:f.values[i]};}).filter(x=>finite(x.value));
 return {entries,spread:entries.length>=2?Math.max(...entries.map(e=>e.value))-Math.min(...entries.map(e=>e.value)):null};
}
export const requirements=[
 ['K index','kIndex','Calculated from exact 850, 700 and 500 hPa inputs'],['Total Totals','totalTotals','Calculated from exact 850 and 500 hPa inputs'],['850–500 hPa shear','shear850500','Calculated vector difference'],['850–500 hPa lapse rate','lapse850500','Calculated using geopotential heights'],['Resolved freezing crossing','freezingCrossing','Interpolated profile crossing; not snow level'],
 ['Surface temperature','temperature','Direct forecast'],['Dew point','dewPoint','Meteogram'],['Surface wind','wind','Direct forecast'],['Gusts','windGust','Direct forecast'],['Pressure','pressure','Direct forecast; verify surface vs MSL'],['Precipitation','precipAmount','Amount per returned time step'],['Cloud base','cloudBase','Meteogram'],
 ['850 hPa temperature','temp-850h','Profile'],['500 hPa temperature','temp-500h','Profile'],['300 hPa wind','wind-300h','Profile'],['850 hPa humidity','rh-850h','Sounding'],['Geopotential height','gh-500h','Profile'],
 ['CAPE / CIN',null,'Not guaranteed by Windy point-forecast schema; additional source or validated parcel calculation needed'],
 ['LCL / LFC / EL',null,'Requires validated parcel calculations'],['0–6 km shear / SRH',null,'Requires height-resolved winds and documented storm-motion method'],['Precipitable water',null,'Requires full moisture profile and validated integration'],
 ['Freezing / wet-bulb levels',null,'Requires validated profile calculations'],['Convergence / vorticity / advection',null,'Requires spatial model fields'],['Observed conditions / radar / satellite',null,'Separate observational sources'],['Waves / air quality / soil',null,'Separate specialized products']
];
