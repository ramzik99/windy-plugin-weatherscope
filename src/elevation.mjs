// Elevations are metres above mean sea level. Missing values are never sea level.
export function elevationNumber(value){
 if(typeof value==='string'&&value.trim()!=='')value=Number(value);
 return typeof value==='number'&&Number.isFinite(value)?value:null;
}
export function readElevation(response){
 for(const value of [response?.data,response?.data?.data,response?.value]){
  const number=elevationNumber(value);if(number!==null)return number;
 }
 return null;
}
export function elevationDifference(terrain,model){
 const a=elevationNumber(terrain),b=elevationNumber(model);
 return a===null||b===null?null:a-b;
}
// A sensitivity estimate, not a calibrated forecast. Temperatures are in kelvin.
export function temperatureAtElevation({temperature,siteElevation,modelElevation,lapseRate,enabled=false}){
 if(!enabled)return {status:'off'};
 const values=[temperature,siteElevation,modelElevation,lapseRate].map(elevationNumber);
 if(values.some(v=>v===null))return {status:'missing'};
 const [original,site,grid,lapse]=values;
 if(original<=0||site< -500||site>9000||grid< -500||grid>9000||lapse< -20||lapse>20)return {status:'invalid'};
 const heightDifference=site-grid,change=-lapse*heightDifference/1000,estimate=original+change;
 if(estimate<=0)return {status:'invalid'};
 return {status:'ready',original,estimate,change,heightDifference,lapseRate:lapse,siteElevation:site,modelElevation:grid};
}
export function elevationLoader(fetchElevation){
 const cache=new Map();
 return async point=>{
  if(!point||!Number.isFinite(point.lat)||!Number.isFinite(point.lon)||Math.abs(point.lat)>90||Math.abs(point.lon)>180)return null;
  const key=`${point.lat},${point.lon}`;
  if(cache.has(key))return cache.get(key);
  const pending=Promise.resolve().then(()=>fetchElevation(point.lat,point.lon)).then(readElevation).catch(()=>null);
  cache.set(key,pending);if(cache.size>32)cache.delete(cache.keys().next().value);
  const result=await pending;
  if(result===null&&cache.get(key)===pending)cache.delete(key);
  return result;
 };
}
