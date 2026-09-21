<script>
 import {onMount,onDestroy} from 'svelte';
 import {map} from '@windy/map';
 import store from '@windy/store';
 import {singleclick} from '@windy/singleclick';
 import {get as reverseName} from '@windy/reverseName';
 import App from './App.svelte';
 import config from './pluginConfig';
 import {fetchForecast} from './adapter.mjs';
 let location=null,timestamp=Date.now(),marker,mapModel=store.get('product'),placeName='',nameRequest=0;
 const setLocation=p=>{const lat=Number(p?.lat),lon=Number(p?.lon??p?.lng);if(!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>90||Math.abs(lon)>180)return;location={lat,lon};placeName='';const id=++nameRequest;reverseName(location).then(r=>{if(id===nameRequest)placeName=r.name||'';}).catch(()=>{});marker?.remove();if(typeof L!=='undefined')marker=L.marker([lat,lon]).addTo(map);};
 const onTime=t=>{if(Number.isFinite(t))timestamp=t;};
 const onProduct=p=>{mapModel=p;};
 const selectTime=t=>{timestamp=t;store.set('timestamp',t);};
 export const onopen=params=>{if(params?.lat!=null)setLocation(params);else if(!location){const c=map.getCenter();setLocation({lat:c.lat,lon:c.lng});}onTime(store.get('timestamp'));};
 onMount(()=>{singleclick.on(config.name,setLocation);store.on('timestamp',onTime);store.on('product',onProduct);if(!location)onopen();});
 onDestroy(()=>{nameRequest++;singleclick.off(config.name,setLocation);store.off('timestamp',onTime);store.off('product',onProduct);marker?.remove();});
</script>
<section class="plugin__content" style="padding:0"><App {location} {timestamp} {mapModel} {placeName} load={fetchForecast} onLocation={setLocation} onTime={selectTime}/></section>
