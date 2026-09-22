<script>
 import {onDestroy} from 'svelte';
 import {elevationNumber,elevationDifference} from './elevation.mjs';
 export let location=null,load=null,modelElevation=null,model='ECMWF';
 let terrain=null,busy=false,request=0;
 $: if(location)refresh(location,load);
 async function refresh(point,loader){
  const id=++request;terrain=null;busy=true;
  try{const value=loader?await loader(point):null;if(id===request)terrain=elevationNumber(value);}
  catch{if(id===request)terrain=null;}
  finally{if(id===request)busy=false;}
 }
 onDestroy(()=>request++);
 $: grid=elevationNumber(modelElevation);
 $: difference=elevationDifference(terrain,grid);
 const metres=n=>n===null?'Unavailable':`${Math.round(n)} m`;
</script>
<details class="elevation">
 <summary aria-label="Location and model elevation"><span class="mountain" aria-hidden="true">△</span><span><small>LOCATION ELEVATION</small><strong>{busy?'Loading…':metres(terrain)}</strong></span><span class="difference">{difference===null?'Elevation details':Math.round(difference)===0?'Same rounded height':`${Math.abs(Math.round(difference))} m ${difference>0?'above':'below'} model`} <span aria-hidden="true">⌄</span></span></summary>
 <div class="content">
  <div class="heights"><div><small>Location terrain</small><strong>{busy?'Loading…':metres(terrain)}</strong></div><div><small>{model} terrain</small><strong>{metres(grid)}</strong></div></div>
  <p>Metres above mean sea level. Location height comes from Windy’s terrain service; model height comes from the forecast header. Terrain is an estimate, not a surveyed elevation.</p>
  {#if !busy&&terrain===null}<button on:click={()=>refresh(location,load)}>Retry elevation</button>{/if}
  <h3>Should I adjust the forecast?</h3>
  <p>A height difference can affect local temperature. First establish whether the supplied temperature is already height-adjusted; applying another correction could count the difference twice. WeatherScope leaves provider values unchanged.</p>
  <p>For unadjusted temperature in well-mixed air: <strong>site temperature ≈ model temperature − lapse rate × height difference in km</strong>. Use a lapse rate supported by the local profile or observations. Inversions and valley cold pools can reverse the usual cooling with height.</p>
  <p>Wind, precipitation, cloud and humidity need their own local assessment. For repeat use, compare forecasts with a representative station across different hours, seasons and weather patterns before applying a local bias adjustment.</p>
  <a href="https://confluence.ecmwf.int/spaces/FUG/pages/673551627/Section+9.2.1+Causes+of+errors+in+forecast+temperature+and+humidity" target="_blank" rel="noopener noreferrer">ECMWF temperature guidance ↗</a>
 </div>
</details>
<style>
 .elevation{margin:8px 0 14px;border:1px solid #304c59;border-radius:13px;background:#122631;color:#e9f4f7}.elevation summary{display:flex;align-items:center;gap:10px;padding:12px;cursor:pointer;list-style:none}.elevation summary::-webkit-details-marker{display:none}.mountain{font-size:30px;color:#79ddc5}.elevation small{display:block;font-size:10px;letter-spacing:.04em;color:#a8c4cf}.elevation strong{display:block;font-size:16px;margin-top:3px}.difference{margin-left:auto;max-width:45%;text-align:right;font-size:12px;color:#9ce5d6}.content{padding:0 14px 14px;font-size:12px;line-height:1.6}.heights{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:12px 0;border-top:1px solid #304c59}.content h3{font-size:14px;margin:14px 0 6px}.content p{color:#bfd0d8;margin:8px 0}.content p strong{font-size:12px}.content a{color:#8ae6cf}.content button{padding:8px 12px;border:1px solid #507080;border-radius:8px;background:#183540;color:#e9f4f7}.elevation summary:focus-visible,.content button:focus-visible{outline:2px solid #8ae6cf;outline-offset:2px}
</style>
