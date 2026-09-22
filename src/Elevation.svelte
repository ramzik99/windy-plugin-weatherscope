<script>
 import {onDestroy} from 'svelte';
 import {elevationNumber,elevationDifference,temperatureAtElevation} from './elevation.mjs';
 import {format,timeLabel} from './engine.mjs';
 export let location=null,load=null,modelElevation=null,model='ECMWF',sourceKey='',temperature=null,valid=null,prefs={};
 let terrain=null,busy=false,request=0,enabled=false,siteOverride=undefined,lapseRate=6.5,context='';
 $: resetContext(location,sourceKey);
 function resetContext(point,source){
  const key=`${point?.lat},${point?.lon}:${source}`;
  if(context!==key){context=key;enabled=false;siteOverride=undefined;lapseRate=6.5;}
 }
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
 $: site=siteOverride==null||siteOverride===''?terrain:elevationNumber(siteOverride);
 $: estimate=temperatureAtElevation({temperature,siteElevation:site,modelElevation:grid,lapseRate,enabled});
 $: change=estimate.status==='ready'?estimate.change*(prefs.temp==='F'?1.8:1):null;
 const changeLabel=(n,unit)=>`${n===0?'':n>0?'+':'−'}${Math.abs(n)>0&&Math.abs(n)<1?'<1':Math.round(Math.abs(n))} °${unit==='F'?'F':'C'}`;
 const metres=n=>n===null?'Unavailable':`${Math.round(n)} m`;
</script>
<details class="elevation">
 <summary aria-label="Location and model elevation"><span class="mountain" aria-hidden="true">△</span><span><small>LOCATION ELEVATION</small><strong>{busy?'Loading…':metres(terrain)}</strong></span><span class="difference">{difference===null?'Elevation details':Math.round(difference)===0?'Same rounded height':`${Math.abs(Math.round(difference))} m ${difference>0?'above':'below'} model`}{#if estimate.status==='ready'}<small style="color:#8ae6cf">What-if {format(estimate.estimate,'K',prefs)} · selected time</small>{/if} <span aria-hidden="true">⌄</span></span></summary>
 <div class="content">
  <div class="heights"><div><small>Location terrain</small><strong>{busy?'Loading…':metres(terrain)}</strong></div><div><small>{model} terrain</small><strong>{metres(grid)}</strong></div></div>
  <p>Metres above mean sea level. Location height comes from Windy’s terrain service; model height comes from the forecast header. Terrain is an estimate, not a surveyed elevation.</p>
  {#if !busy&&terrain===null}<button on:click={()=>refresh(location,load)}>Retry elevation</button>{/if}
  <div class="calculator">
   <h3>Temperature at your elevation</h3>
   <p>A what-if estimate for the selected forecast time. Upstream height adjustment is unverified.</p>
   <label class="enable"><input type="checkbox" bind:checked={enabled}/> Estimate assuming provider temperature is unadjusted</label>
   {#if enabled}
    <div class="inputs"><label>Site elevation · m AMSL<input aria-label="Site elevation in metres" type="number" min="-500" max="9000" step="1" placeholder={terrain===null?'Enter elevation':String(Math.round(terrain))} bind:value={siteOverride}/></label><label>Lapse rate · °C/km<input aria-label="Temperature lapse rate in Celsius per kilometre" type="number" min="-20" max="20" step="0.1" bind:value={lapseRate}/></label></div>
    <div class="input-note"><span>{siteOverride==null?'Using terrain height':'Using your entered elevation'}</span><button disabled={siteOverride==null} on:click={()=>siteOverride=undefined}>Use terrain height</button></div>
    <p>6.5 °C/km is an illustrative standard-atmosphere starting value, not a measured local lapse rate. Positive means cooling with height; negative means an inversion.</p>
    {#if estimate.status==='ready'}
     <div class="estimate-result" aria-live="polite"><small>{model} · {timeLabel(valid,prefs.local)} · {prefs.local?'device local':'UTC'}</small><div class="comparison"><div><small>Provider forecast</small><strong>{format(estimate.original,'K',prefs)}</strong></div><span aria-hidden="true">→</span><div><small>Elevation estimate</small><strong>{format(estimate.estimate,'K',prefs)}</strong></div></div><p>{changeLabel(change,prefs.temp)} adjustment · site {Math.abs(Math.round(estimate.heightDifference))} m {estimate.heightDifference>=0?'above':'below'} model</p></div>
     <p>This is a sensitivity estimate, not a validated local forecast. The seven-day forecast, other parameters and exports retain provider values. Move the forecast slider to inspect another time.</p>
    {:else}<p role="status">{estimate.status==='invalid'?'Use an elevation between −500 and 9000 m and a lapse rate between −20 and 20 °C/km.':'Enter a site elevation and lapse rate. Model elevation and temperature at the selected time must also be available.'}</p>{/if}
   {/if}
  </div>
  <details class="guidance"><summary>When is a correction useful?</summary>
  <p>A height difference can affect local temperature. First establish whether the supplied temperature is already height-adjusted; applying another correction could count the difference twice. WeatherScope leaves provider values unchanged.</p>
  <p>For unadjusted temperature in well-mixed air: <strong>site temperature ≈ model temperature − lapse rate × height difference in km</strong>. Use a lapse rate supported by the local profile or observations. Inversions and valley cold pools can reverse the usual cooling with height.</p>
  <p>Wind, precipitation, cloud and humidity need their own local assessment. For repeat use, compare forecasts with a representative station across different hours, seasons and weather patterns before applying a local bias adjustment.</p>
  <a href="https://confluence.ecmwf.int/spaces/FUG/pages/673551627/Section+9.2.1+Causes+of+errors+in+forecast+temperature+and+humidity" target="_blank" rel="noopener noreferrer">ECMWF temperature guidance ↗</a></details>
 </div>
</details>
<style>
 .guidance{margin-top:10px}.guidance summary{padding:8px 0;color:#8ae6cf;font-weight:600}
 .calculator{padding:0 0 12px;border-bottom:1px solid #304c59}.enable{display:flex;gap:10px;align-items:center;padding:10px 0;cursor:pointer}.enable input{width:18px;height:18px;flex:0 0 18px;accent-color:#8ae6cf}.inputs{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 0}.inputs label{font-size:11px;color:#bfd0d8}.inputs input{display:block;width:100%;box-sizing:border-box;margin-top:5px;padding:10px 8px;border:1px solid #507080;border-radius:8px;background:#0d1b27;color:#e9f4f7;font:inherit;font-size:15px;min-height:42px}.input-note{display:flex;justify-content:space-between;align-items:center;gap:8px;font-size:10px;color:#bfd0d8}.input-note button{font-size:10px}.input-note button:disabled{opacity:.4;cursor:default}.estimate-result{padding:12px;background:#1b373e;border:1px solid #4c8e84;border-radius:10px}.comparison{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:10px 0}.comparison strong{font-size:25px}.comparison>span{font-size:24px;color:#8ae6cf}.estimate-result p{font-size:11px}.inputs input:focus-visible,.enable input:focus-visible{outline:2px solid #8ae6cf;outline-offset:2px}
 .elevation{margin:8px 0 14px;border:1px solid #304c59;border-radius:13px;background:#122631;color:#e9f4f7}.elevation summary{display:flex;align-items:center;gap:10px;padding:12px;cursor:pointer;list-style:none}.elevation summary::-webkit-details-marker{display:none}.mountain{font-size:30px;color:#79ddc5}.elevation small{display:block;font-size:10px;letter-spacing:.04em;color:#a8c4cf}.elevation strong{display:block;font-size:16px;margin-top:3px}.difference{margin-left:auto;max-width:45%;text-align:right;font-size:12px;color:#9ce5d6}.content{padding:0 14px 14px;font-size:12px;line-height:1.6}.heights{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:12px 0;border-top:1px solid #304c59}.content h3{font-size:14px;margin:14px 0 6px}.content p{color:#bfd0d8;margin:8px 0}.content p strong{font-size:12px}.content a{color:#8ae6cf}.content button{padding:8px 12px;border:1px solid #507080;border-radius:8px;background:#183540;color:#e9f4f7}.elevation summary:focus-visible,.content button:focus-visible{outline:2px solid #8ae6cf;outline-offset:2px}
</style>
