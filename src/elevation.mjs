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
