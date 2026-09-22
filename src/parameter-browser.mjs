import {at,finite} from './engine.mjs';
export function browseFields(fields,{query='',group='All',level='All',scope='all',pins=[],valid}={}){
 const terms=query.toLowerCase().trim().split(/\s+/).filter(Boolean);
 return fields.filter(f=>{
  const text=`${f.label} ${f.key} ${f.section} ${f.group} ${f.unit}`.toLowerCase();
  const v=at(f,valid),available=v!==null&&v!==undefined&&!(typeof v==='number'&&!finite(v));
  return terms.every(t=>text.includes(t))&&(group==='All'||f.group===group||(group==='Wind'&&/^wind/.test(f.key))||(group==='Moisture'&&/^(dewPoint|rh)(-|$)/.test(f.key))||(group==='Temperature'&&/^(temperature|temp|feelTemperature)(-|$)/.test(f.key)))&&(level==='All'||f.key.endsWith('-'+level+'h'))&&(scope!=='pinned'||pins.includes(f.key))&&(scope!=='available'||available)&&(scope!=='missing'||!available);
 }).sort((a,b)=>Number(pins.includes(b.key))-Number(pins.includes(a.key))||a.label.localeCompare(b.label)||a.section.localeCompare(b.section));
}
export function fieldSummary(field,start,end){
 const samples=field.ts.flatMap((t,i)=>t>=start&&t<=end?[{time:t,value:field.values[i]??null}]:[]);
 const numbers=samples.map(p=>p.value).filter(finite);
 return {samples,available:samples.filter(p=>p.value!==null&&p.value!==undefined&&!(typeof p.value==='number'&&!finite(p.value))).length,total:samples.length,min:numbers.length?Math.min(...numbers):null,max:numbers.length?Math.max(...numbers):null};
}
export function explainField(f){
 if(f.method)return f.method;
 const key=f.key.split('-')[0];
 const descriptions={temperature:'Air temperature at the source surface reference level.',temp:'Air temperature at the indicated model level.',feelTemperature:'The apparent temperature supplied by the provider.',dewPoint:'Temperature at which air reaches saturation when cooled at constant pressure.',rh:'Relative humidity: water-vapour content relative to saturation at the given temperature.',wind:'Wind speed at the indicated reference level.',windGust:'Forecast peak gust supplied for the source interval.',windDir:'Direction the wind comes from, measured clockwise from north. Direction is circular; 360° and 0° represent north.',pressure:'Pressure supplied by the source. Check provider metadata for surface versus mean sea level reference.',precipAmount:'Liquid-equivalent precipitation amount for each forecast interval. It is not a daily total or a probability.',precipSnowAmount:'Snow precipitation as water equivalent, not snow depth.',precipConvectiveAmount:'Convective precipitation amount for each source forecast interval.',cloudBase:'Provider cloud-base height. Verify its vertical reference in source documentation before interpreting it as height above ground.',visibility:'Forecast visibility distance.',gh:'Geopotential height of the indicated pressure surface.',cloud:'Cloud fraction at the indicated model level.',waves:'Provider wave height.',wavesDir:'Provider wave direction in degrees.',wavesPeriod:'Provider wave period.',swell:'Provider swell height.',swell1:'Provider first swell height.',swell2:'Provider second swell height.',aqiUs:'Provider air quality index on its US AQI scale.'};
 return descriptions[key]||(f.unit==='raw'?'Additional provider field. Its meaning and units have not been mapped; inspect its original values without assuming a physical interpretation.':f.unit==='code'||f.unit==='boolean'?'Provider categorical field. Original codes are retained; no undocumented code meanings are assumed.':'Provider forecast field. Its reported unit and source section are shown below.');
}
