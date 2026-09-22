<script>
 import {finite,derived,format,at,value,compare,MODELS,timeLabel} from './engine.mjs';
 import {diagnostics,verticalProfile} from './diagnostics.mjs';
 export let data,valid,prefs,comparisons=[],comparisonErrors=[],compareBusy=false,onCompare=()=>{};
 $: result=compare([data,...comparisons],'temperature',valid);
 $: surface=derived(data,valid);
 $: calculated=diagnostics(data,valid);
 $: rows=verticalProfile(data,valid).filter(r=>r.belowGround!==true);
 $: temperatures=rows.flatMap(r=>[r.t,r.td]).filter(finite).map(v=>v-273.15);
 $: min=temperatures.length?Math.floor((Math.min(...temperatures)-5)/10)*10:-80;
 $: max=temperatures.length?Math.ceil((Math.max(...temperatures)+5)/10)*10:40;
 $: top=rows.length?Math.min(...rows.map(r=>r.p)):100;
 $: bottom=rows.length?Math.max(...rows.map(r=>r.p)):1000;
 const show=(fields,key,unit,preferences)=>format(fields.find(f=>f.key===key)?.values[0],unit,preferences);
 function path(key,list,lo,hi,pTop,pBottom){let d='',drawing=false;for(const row of list){const v=row[key];if(!finite(v)){drawing=false;continue;}const x=48+(v-273.15-lo)/(hi-lo)*360,y=20+Math.log(row.p/pTop)/Math.max(.01,Math.log(pBottom/pTop))*170;d+=`${drawing?'L':'M'}${x},${y} `;drawing=true;}return d;}
</script>
<details class="meteorology">
 <summary>Meteorology <small>Surface · profile · model comparison</small></summary>
 <p>{MODELS[data.model]||data.model} · {timeLabel(valid,prefs.local)} {prefs.local?'device local':'UTC'} · All values below use this valid time.</p>
 <div class="metrics"><div><small>Relative humidity</small><b>{show(surface,'rh','%',prefs)}</b></div><div><small>3h pressure change</small><b>{show(surface,'pressureTrend','Pa',prefs)}</b></div><div><small>Dew point</small><b>{format(value(data,'dewPoint',valid),'K',prefs)}</b></div></div>
 <h3>Vertical structure</h3>
 {#if temperatures.length}<div class="profile"><svg viewBox="0 0 440 220" role="img" aria-label="Temperature and dew point versus pressure, not a Skew-T">
 {#each rows as row}<line x1="48" x2="408" y1={20+Math.log(row.p/top)/Math.max(.01,Math.log(bottom/top))*170} y2={20+Math.log(row.p/top)/Math.max(.01,Math.log(bottom/top))*170}/><text x="40" y={24+Math.log(row.p/top)/Math.max(.01,Math.log(bottom/top))*170} text-anchor="end">{row.p}</text>{/each}
 {#each [min,(min+max)/2,max] as t}<text x={48+(t-min)/(max-min)*360} y="212" text-anchor="middle">{t}</text>{/each}
 <path class="temperature" d={path('t',rows,min,max,top,bottom)}/><path class="dew" d={path('td',rows,min,max,top,bottom)}/></svg><p><span>Temperature</span> · <span>Dew point (dashed)</span> · °C vs hPa</p></div>{:else}<p>No temperature profile supplied at this time.</p>{/if}
 <div class="table-wrap"><table><thead><tr><th>hPa</th><th>T / Td</th><th>Wind</th><th>Height</th></tr></thead><tbody>{#each rows as row}<tr><th>{row.p}</th><td>{format(row.t,'K',prefs)} / {format(row.td,'K',prefs)}</td><td>{format(row.dir,'°',prefs)} / {format(row.wind,'m/s',prefs)}</td><td>{format(row.z,'m',prefs)}</td></tr>{/each}</tbody></table></div>
 <p>Known below-terrain levels are hidden. Terrain screening requires height metadata. Missing dew points remain blank.</p>
 <h3>Calculated diagnostics</h3><div class="diagnostics">{#each [['kIndex','K index'],['totalTotals','Total Totals'],['shear850500','850–500 hPa shear'],['freezingCrossing','Resolved freezing crossing']] as [key,label]}{@const f=calculated.find(f=>f.key===key)}<div><small>{label}</small><b>{f?format(at(f,valid),f.unit,prefs):'—'}</b></div>{/each}</div>
 <details class="methods"><summary>Methods & availability</summary><p>RH uses a Magnus approximation. Pressure change compares exact forecasts three hours apart. Profile diagnostics require all inputs above supplied model terrain. Pressure-level shear is not 0–6 km shear; freezing crossing is not snowline. CAPE, CIN and SRH are not calculated.</p>{#each [...surface,...calculated] as f}<p><b>{f.label}:</b> {f.method}</p>{/each}</details>
 <div class="comparison-heading"><h3>Model disagreement</h3><button disabled={compareBusy} on:click={onCompare}>{compareBusy?'Loading…':'Compare models'}</button></div>
 <div class="metrics">{#each result.entries as e}<div><small>{MODELS[e.model]||e.model}</small><b>{format(e.value,'K',prefs)}</b></div>{/each}</div>
 <p>Temperature · same point and exact time. Model differences are not probabilities.</p>{#each comparisonErrors as error}<p class="error">{error}</p>{/each}
</details>
<style>
 .meteorology{background:var(--panel,#152b37);border-radius:12px;padding:16px;margin-top:18px;color:var(--ink,#edf7fa)}summary{cursor:pointer;font-size:16px;font-weight:500}summary>small{display:block;margin:5px 0 0 16px;font-weight:400}small,p{font-size:11px;line-height:1.65;color:var(--muted,#b2c7d1)}p{margin:10px 0}small{display:block}.metrics,.diagnostics{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:16px 0}.diagnostics{grid-template-columns:repeat(2,minmax(0,1fr))}b{display:block;font-size:16px;font-weight:500;margin-top:5px}h3{font-size:15px;font-weight:500;color:inherit;margin:20px 0 10px}.profile svg{width:100%;height:auto;display:block}.profile line{stroke:#314b59;stroke-width:1}.profile text{fill:#b2c7d1;font-size:11px}.profile path{fill:none;stroke-width:2.5}.temperature{stroke:#efbb87}.dew{stroke:#82d9c1;stroke-dasharray:5 3}.profile p span:first-child{color:#efbb87}.profile p span:nth-child(2){color:#82d9c1}.table-wrap{overflow:auto}table{width:100%;border-collapse:collapse;font-size:11px;white-space:nowrap}th,td{padding:9px 5px;text-align:right;border-bottom:1px solid var(--line,#36505e)}th{font-weight:400;color:var(--muted,#b2c7d1)}th:first-child{text-align:left}.methods summary{font-size:12px}.methods b{display:inline;font-size:11px}.comparison-heading{display:flex;align-items:center;justify-content:space-between;gap:8px}.comparison-heading h3{margin:16px 0}button{font:12px system-ui;background:#213e49;color:inherit;border:1px solid var(--line,#36505e);padding:9px;border-radius:8px;min-height:40px;cursor:pointer}button:disabled{opacity:.6}button:focus-visible{outline:2px solid var(--mint,#7be4ca);outline-offset:2px}.error{color:#efb3a4}@media(max-width:400px){.metrics{grid-template-columns:repeat(2,minmax(0,1fr))}.meteorology{padding:13px}b{font-size:14px}}
</style>


