import {getPointForecastData} from '@windy/fetch';
import {normalize} from './engine.mjs';
const cache=new Map();
export async function fetchForecast(model,location,refresh=false){
 const key=`${model}:${location.lat.toFixed(4)},${location.lon.toFixed(4)}`,cached=cache.get(key);
 if(!refresh&&cached&&Date.now()-cached.at<300000)return cached.data;
 const response=await getPointForecastData(model,{...location,days:3,step:3},{header:true,summary:true,meteogram:true,airgram:true,sounding:true,celestial:true});
 const data=normalize(response.data,model);cache.set(key,{at:Date.now(),data});
 if(cache.size>24)cache.delete(cache.keys().next().value);
 return data;
}
