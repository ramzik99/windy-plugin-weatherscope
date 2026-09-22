<script>
 import {onDestroy} from 'svelte';
 import {elevationNumber,elevationDifference,temperatureAtElevation} from './elevation.mjs';
 import {format,timeLabel} from './engine.mjs';
 export let location=null,load=null,modelElevation=null,model='ECMWF',sourceKey='',temperature=null,valid=null,prefs={};
 let terrain=null,busy=false,request=0,enabled=false,siteOverride=undefined,lapseRate=6.5,preset='standard',context='';
 $: resetContext(location,sourceKey);
 function resetContext(point,source){const key=`${point?.lat},${point?.lon}:${source}`;if(context!==key){context=key;enabled=false;siteOverride=undefined;lapseRate=6.5;preset='standard';}}
 $: if(location)refresh(location,load);
 async function refresh(point,loader){const id=++request;terrain=null;busy=true;try{const v=loader?await loader(point):null;if(id===request)terrain=elevationNumber(v);}catch{if(id===request)terrain=null;}finally{if(id===request)busy=false;}}
 onDestroy(()=>request++);
 function choosePreset(name,value){preset=name;lapseRate=value;}
 $: grid=elevationNumber(modelElevation);
 $: difference=elevationDifference(terrain,grid);
 $: site=siteOverride==null||siteOverride===''?terrain:elevationNumber(siteOverride);
 $: estimate=temperatureAtElevation({temperature,siteElevation:site,modelElevation:grid,lapseRate,enabled});
 $: change=estimate.status==='ready'?estimate.change*(prefs.temp==='F'?1.8:1):null;
 $: shownChange=estimate.status==='ready'?temperatureInteger(estimate.estimate)-temperatureInteger(estimate.original):null;
 $: chartLow=Math.min(site??0,grid??0)-100;
 $: chartSpan=Math.max(400,Math.abs((site??0)-(grid??0))+200);
 $: siteY=130-((site??chartLow)-chartLow)/chartSpan*82;
 $: gridY=130-((grid??chartLow)-chartLow)/chartSpan*82;
 const metres=n=>n===null?'Unavailable':`${Math.round(n)} m`;
 const temperatureInteger=k=>Math.round(prefs.temp==='F'?(k-273.15)*1.8+32:k-273.15);
 const delta=n=>`${n===0?'':n>0?'+':'−'}${Math.abs(n)>0&&Math.abs(n)<1?'<1':Math.round(Math.abs(n))} °${prefs.temp==='F'?'F':'C'}`;
</script>

<details class="elevation">
 <summary aria-label="Location and model elevation">
  <span class="mountain" aria-hidden="true">△</span><span><small>LOCATION ELEVATION</small><strong>{busy?'Loading…':metres(terrain)}</strong></span>
  <span class="difference">{difference===null?'View elevation':Math.round(difference)===0?'Same rounded height':`${Math.abs(Math.round(difference))} m ${difference>0?'above':'below'} model`}{#if estimate.status==='ready'}<small>What-if {format(estimate.estimate,'K',prefs)}</small>{/if}<span aria-hidden="true">⌄</span></span>
 </summary>
 <div class="content">
  {#if site!==null&&grid!==null}
   <svg class="terrain-visual" viewBox="0 0 320 158" role="img" aria-label={`Location elevation ${Math.round(site)} metres and ${model} model elevation ${Math.round(grid)} metres`}>
    <defs><linearGradient id="ground" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#244b50"/><stop offset="1" stop-color="#112630"/></linearGradient></defs>
    <path d={`M18 142 L18 ${siteY} L116 ${siteY} L204 ${gridY} L302 ${gridY} L302 142 Z`} fill="url(#ground)" stroke="#4e827d" stroke-width="1.5"/><line x1="116" y1={siteY} x2="204" y2={gridY} stroke="#7de3ca" stroke-width="2" stroke-dasharray="5 5"/>
    <circle cx="74" cy={siteY} r="5" fill="#7de3ca"/><circle cx="246" cy={gridY} r="5" fill="#f3bd72"/>
    <text x="74" y={Math.max(16,siteY-20)} text-anchor="middle" class="label">YOUR SITE</text><text x="74" y={Math.max(31,siteY-5)} text-anchor="middle" class="height">{Math.round(site)} m</text>
    <text x="246" y={Math.max(16,gridY-20)} text-anchor="middle" class="label">{model} TERRAIN</text><text x="246" y={Math.max(31,gridY-5)} text-anchor="middle" class="height">{Math.round(grid)} m</text><text x="160" y="153" text-anchor="middle" class="gap">Δ {Math.abs(Math.round(site-grid))} m</text>
   </svg>
  {:else}<div class="heights"><div><small>Location terrain</small><strong>{busy?'Loading…':metres(terrain)}</strong></div><div><small>{model} terrain</small><strong>{metres(grid)}</strong></div></div>{/if}
  <p class="source-note">Terrain height from Windy · model height from the forecast header · metres AMSL.</p>
  {#if !busy&&terrain===null}<button on:click={()=>refresh(location,load)}>Retry elevation</button>{/if}
  <button class="estimate-toggle" class:active={enabled} aria-pressed={enabled} on:click={()=>enabled=!enabled}><span class="number">{enabled?'✓':'1'}</span><span><strong>{enabled?'Elevation estimate on':'Estimate temperature at this elevation'}</strong><small>Optional what-if · original forecast stays unchanged</small></span><span class="toggle-arrow">{enabled?'Hide':'Start'} →</span></button>

  {#if enabled}
   <section class="calculator" aria-label="Elevation temperature estimate">
    <div class="step"><span class="number">1</span><div><h3>Confirm your height</h3><p>Windy terrain is filled in. Replace it with a surveyed elevation if known.</p></div></div>
    <div class="input-row"><label>Site elevation <span>m AMSL</span><input aria-label="Site elevation in metres" type="number" min="-500" max="9000" step="1" placeholder={terrain===null?'Enter elevation':String(Math.round(terrain))} bind:value={siteOverride}/></label><button disabled={siteOverride==null} on:click={()=>siteOverride=undefined}>Use terrain</button></div>
    <div class="step"><span class="number">2</span><div><h3>Choose the atmosphere</h3><p>Use a profile or observations when possible.</p></div></div>
    <div class="presets" role="group" aria-label="Lapse rate presets"><button aria-pressed={preset==='ecmwf'} class:chosen={preset==='ecmwf'} on:click={()=>choosePreset('ecmwf',5.5)}><strong>5.5</strong><small>ECMWF neutral</small></button><button aria-pressed={preset==='standard'} class:chosen={preset==='standard'} on:click={()=>choosePreset('standard',6.5)}><strong>6.5</strong><small>Standard</small></button><button aria-pressed={preset==='custom'} class:chosen={preset==='custom'} on:click={()=>preset='custom'}><strong>±</strong><small>Custom / inversion</small></button></div>
    {#if preset==='custom'}<label class="custom">Custom lapse rate <span>°C/km</span><input aria-label="Temperature lapse rate in Celsius per kilometre" type="number" min="-20" max="20" step="0.1" bind:value={lapseRate}/><small>Positive cools uphill; negative represents an inversion.</small></label>{/if}
    <div class="step"><span class="number">3</span><div><h3>Compare at selected time</h3><p>{timeLabel(valid,prefs.local)} · {prefs.local?'device local':'UTC'}</p></div></div>
    {#if estimate.status==='ready'}
     <div class="estimate-result" aria-live="polite"><div class="thermo"><span class="old">{format(estimate.original,'K',prefs)}</span><span class:warmer={shownChange>0} class="delta">{delta(shownChange)}</span><span class="new">{format(estimate.estimate,'K',prefs)}</span></div><div class="result-labels"><span>{model} provider</span><span>Height estimate</span></div><div class="delta-track"><i style={`--position:${Math.max(4,Math.min(96,50+(change||0)*4))}%`}></i></div><p>{Math.abs(Math.round(estimate.heightDifference))} m {estimate.heightDifference>=0?'uphill':'downhill'} · {Number(estimate.lapseRate).toFixed(1)} °C/km</p></div>
     <p class="caution">Sensitivity estimate only. It does not change the seven-day forecast, other parameters, Winter tools or exports.</p>
    {:else}<p class="status" role="status">{estimate.status==='invalid'?'Use −500 to 9000 m and −20 to 20 °C/km.':'A site height, model height and selected-time temperature are required.'}</p>{/if}
   </section>
  {/if}
  <details class="guidance"><summary>How to use this professionally</summary><p>First determine whether the supplied temperature is already height-adjusted; another correction could count the difference twice. Under neutral or unstable conditions ECMWF describes a 5.5 °C/km station-height adjustment, while stable layers use a different treatment.</p><p>Inversions, valley cold pools, snow, fog and coastal effects can overwhelm a fixed lapse rate. Wind, precipitation, clouds and humidity need separate local assessment. Validate repeated use against a representative station by hour, season and weather regime.</p><a href="https://confluence.ecmwf.int/spaces/FUG/pages/673551627/Section+9.2.1+Causes+of+errors+in+forecast+temperature+and+humidity" target="_blank" rel="noopener noreferrer">ECMWF temperature guidance ↗</a></details>
 </div>
</details>

<style>
 .elevation{margin:8px 0 14px;border:1px solid #304c59;border-radius:14px;background:#122631;color:#e9f4f7}.elevation>summary{display:flex;align-items:center;gap:10px;padding:12px;cursor:pointer;list-style:none}.elevation>summary::-webkit-details-marker{display:none}.mountain{font-size:30px;color:#79ddc5}.elevation small{display:block;font-size:10px;letter-spacing:.03em;color:#a8c4cf}.elevation strong{display:block;font-size:16px;margin-top:2px}.difference{margin-left:auto;max-width:46%;text-align:right;font-size:12px;color:#9ce5d6}.difference small{color:#8ae6cf;margin-top:3px}.content{padding:0 14px 14px;font-size:12px;line-height:1.55}.terrain-visual{display:block;width:100%;height:auto;border-top:1px solid #304c59;background:linear-gradient(#0d1b27,#122631);border-radius:0 0 10px 10px}.terrain-visual text{font-family:system-ui}.terrain-visual .label{font-size:9px;fill:#a8c4cf;letter-spacing:.08em}.terrain-visual .height{font-size:15px;font-weight:700;fill:#eff9fb}.terrain-visual .gap{font-size:10px;fill:#83cfc1}.source-note{margin:7px 0 12px;color:#91aab5;font-size:10px}.heights{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:12px 0;border-top:1px solid #304c59}.estimate-toggle{display:flex;align-items:center;width:100%;gap:10px;text-align:left;padding:11px;border:1px solid #476776;border-radius:11px;background:#142f3b;color:#eef8fa;cursor:pointer}.estimate-toggle.active{border-color:#72d9c1;background:#163a3d}.estimate-toggle strong{font-size:13px}.estimate-toggle .number,.step .number{display:grid;place-items:center;flex:0 0 25px;width:25px;height:25px;border-radius:50%;background:#79ddc5;color:#092029;font-weight:800}.toggle-arrow{margin-left:auto;color:#8ae6cf;font-size:11px}.calculator{margin-top:10px;padding:12px;border:1px solid #365867;border-radius:12px;background:#0c1d28}.step{display:flex;gap:9px;align-items:flex-start;margin:5px 0 8px}.step h3{margin:2px 0 0;font-size:13px}.step p{margin:2px 0;color:#9eb6c0;font-size:10px}.input-row{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:end;margin:0 0 17px 34px}.input-row label,.custom{color:#bdd0d7;font-size:11px}.input-row label span,.custom span{float:right;color:#819ba6}.input-row input,.custom input{display:block;width:100%;box-sizing:border-box;margin-top:4px;padding:9px;border:1px solid #507080;border-radius:8px;background:#102733;color:#eef8fa;font:600 15px system-ui;min-height:40px}.content button{padding:8px 10px;border:1px solid #507080;border-radius:8px;background:#183540;color:#e9f4f7}.input-row button{font-size:10px;white-space:nowrap}.input-row button:disabled{opacity:.4}.presets{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:0 0 16px 34px}.presets button{padding:8px 4px;text-align:center;min-width:0}.presets button strong{font-size:15px}.presets button small{font-size:8px}.presets button.chosen{border-color:#79ddc5;background:#194148}.custom{display:block;margin:0 0 16px 34px}.custom small{float:none;margin-top:4px}.estimate-result{padding:12px;background:linear-gradient(135deg,#193b40,#112d38);border:1px solid #4c8e84;border-radius:11px}.thermo{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:8px;text-align:center}.thermo .old,.thermo .new{font-size:25px;font-weight:750}.thermo .new{color:#8be5cf}.thermo .delta{padding:4px 7px;border-radius:10px;background:#18303a;color:#8be5cf;font-size:10px}.thermo .delta.warmer{color:#f3bd72}.result-labels{display:flex;justify-content:space-between;color:#a8c4cf;font-size:9px;padding:0 8px}.delta-track{height:3px;margin:11px 6px;background:linear-gradient(90deg,#79bde0,#566b73 50%,#e7aa69);position:relative}.delta-track i{position:absolute;left:var(--position);top:50%;width:9px;height:9px;border:2px solid #eef8fa;border-radius:50%;background:#122631;transform:translate(-50%,-50%)}.estimate-result p{text-align:center;color:#bcd0d7;font-size:10px;margin:8px 0 0}.caution,.status{color:#a9bec7;font-size:10px;margin:7px 2px 0 34px}.guidance{margin-top:10px}.guidance summary{padding:8px 0;color:#8ae6cf;font-weight:600;cursor:pointer}.guidance p{color:#bfd0d8;margin:8px 0}.guidance a{color:#8ae6cf}.elevation summary:focus-visible,.content button:focus-visible,.content input:focus-visible{outline:2px solid #8ae6cf;outline-offset:2px}@media(max-width:380px){.presets{margin-left:0}.input-row,.custom{margin-left:0}.thermo .old,.thermo .new{font-size:22px}}
</style>
