<script>
 import {finite,at,format,timeLabel,HOUR} from './engine.mjs';
 import {seriesGeometry,fieldColor} from './visuals.mjs';
 export let fields=[],valid,prefs={},onTime=()=>{};
 export let terrain=null;
 let chosen='data.temperature',query='',hours=48,layer='rh';
 $: candidates=fields.filter(f=>f.section!=='derived'&&f.values.some(finite)&&!['code','boolean','raw','°'].includes(f.unit));
 $: matches=candidates.filter(f=>`${f.label} ${f.key}`.toLowerCase().includes(query.toLowerCase()));
 $: field=matches.find(f=>f.id===chosen)||matches[0];
 $: start=valid;
 $: end=start+hours*HOUR;
 $: geometry=seriesGeometry(field,start,end);
 $: matrix=['temperature','dewPoint','wind','windGust','pressure','precipAmount','cloud-surface'].map(k=>candidates.find(f=>f.key===k)).filter(Boolean);
 $: times=field?.ts.filter(t=>t>=start&&t<=end)||[];
 $: levels=[...new Set(fields.map(f=>f.key.match(/^(?:temp|rh|cloud|wind)-(\d+)h$/)?.[1]).filter(Boolean))].map(Number).sort((a,b)=>a-b);
 $: curtain=levels.map(p=>({p,field:fields.find(f=>f.key===`${layer}-${p}h`),height:fields.find(f=>f.key===`gh-${p}h`)}));
 $: curtainValues=curtain.flatMap(row=>times.map(t=>curtainValue(row,t))).filter(finite);
 $: curtainMin=['rh','cloud'].includes(layer)?0:curtainValues.length?Math.min(...curtainValues):null;
 $: curtainMax=['rh','cloud'].includes(layer)?100:curtainValues.length?Math.max(...curtainValues):null;
 function curtainValue(row,t){const z=row.height?at(row.height,t):null;if(finite(terrain)&&finite(z)&&z<terrain)return null;return row.field?at(row.field,t):null;}
</script>
<section class="explorer" aria-label="Visual forecast explorer">
 <div class="eyebrow">ATMOSPHERE / EXPLORER</div><h2>See the forecast unfold.</h2>
 <p>Every chart uses the selected source. Choose a parameter, then tap a time.</p>
 <div class="controls"><input aria-label="Find a chart parameter" placeholder="Find temperature, wind, 850h…" bind:value={query}/><select aria-label="Chart horizon" bind:value={hours}><option value={24}>24 hours</option><option value={48}>48 hours</option><option value={120}>5 days</option></select></div>
 <select class="parameter-select" aria-label="Chart parameter" bind:value={chosen}>{#each matches as f}<option value={f.id}>{f.label} · {f.section}</option>{/each}</select>
 {#if !matches.length}<p>No matching chart parameters. Clear your search to see available fields.</p>{/if}
 {#if field}<div class="chart-card"><div class="chart-heading"><div><small>{field.label}</small><strong>{format(at(field,valid),field.unit,prefs)}</strong></div><div><small>WINDOW RANGE</small><b>{format(geometry.min,field.unit,prefs)} → {format(geometry.max,field.unit,prefs)}</b></div></div>
 {#if geometry.path}<svg viewBox="0 0 560 192" role="img" aria-label={`${field.label} over ${hours} hours; gaps indicate missing data`}>
 {#each [24,89,154] as y}<line x1="48" x2="536" y1={y} y2={y}/>{/each}
 <text x="48" y="14">{format(geometry.max,field.unit,prefs)}</text><text x="48" y="166">{format(geometry.min,field.unit,prefs)}</text>
 {#if field.unit==='mm/step'}{#each geometry.points.filter(p=>p.y!==null) as p}<rect x={p.x-3} y={154-130*Math.max(0,p.v)/Math.max(1,geometry.max)} width="6" height={130*Math.max(0,p.v)/Math.max(1,geometry.max)} fill="#80c9ff"><title>{timeLabel(p.t,prefs.local)}: {format(p.v,field.unit,prefs)}</title></rect>{/each}{:else}<path d={geometry.path}/>{#each geometry.points.filter(p=>p.y!==null) as p}<circle cx={p.x} cy={p.y} r="3"><title>{timeLabel(p.t,prefs.local)}: {format(p.v,field.unit,prefs)}</title></circle>{/each}{/if}
 <text x="48" y="180">{timeLabel(start,prefs.local)}</text><text x="536" y="180" text-anchor="end">{timeLabel(end,prefs.local)}</text>
 </svg>{:else}<p>No numeric samples in this window.</p>{/if}
 <small>{prefs.local?'Device local time':'UTC'} · {field.unit==='mm/step'?'Amount per returned interval; not a rate.':'Values are sampled forecasts.'} Gaps are not filled.</small></div>{/if}
 <h3>Forecast fingerprint</h3><p>Each row has its own colour scale: blue is lower, amber is higher. Colour is not a hazard rating. Exact values appear in every cell.</p>
 <div class="matrix" role="region" aria-label="Interactive forecast fingerprint"><table><thead><tr><th>Parameter</th>{#each times as t}<th><button on:click={()=>onTime(t)} aria-label={`Select ${timeLabel(t,prefs.local)}`}>{timeLabel(t,prefs.local)}</button></th>{/each}</tr></thead><tbody>
 {#each matrix as f}{@const stats=seriesGeometry(f,start,end)}<tr><th>{f.label}<small>{f.unit}</small></th>{#each times as t}{@const v=at(f,t)}<td style={`background:${fieldColor(v,stats.min,stats.max)}`}><button on:click={()=>onTime(t)} title={`${f.label} · ${timeLabel(t,prefs.local)}`}>{format(v,f.unit,prefs)}</button></td>{/each}</tr>{/each}
 </tbody></table></div>
 {#if levels.length}<h3>Atmospheric curtain</h3><p>Follow layers through time. Rows are discrete pressure levels, not equal height bands. Known below-terrain values are hidden.</p>
 <select aria-label="Atmospheric curtain parameter" bind:value={layer}><option value="rh">Relative humidity</option><option value="temp">Temperature</option><option value="wind">Wind speed</option><option value="cloud">Cloud fraction</option></select>
 <p>Blue → amber: {format(curtainMin,layer==='temp'?'K':layer==='wind'?'m/s':'%',prefs)} → {format(curtainMax,layer==='temp'?'K':layer==='wind'?'m/s':'%',prefs)}. — means missing or below terrain. Terrain screening requires height metadata.</p>
 <div class="matrix" role="region" aria-label="Pressure level forecast curtain"><table><thead><tr><th>Pressure</th>{#each times as t}<th><button on:click={()=>onTime(t)}>{timeLabel(t,prefs.local)}</button></th>{/each}</tr></thead><tbody>{#each curtain as row}<tr><th>{row.p} hPa</th>{#each times as t}{@const v=curtainValue(row,t)}<td style={`background:${fieldColor(v,curtainMin,curtainMax)}`}><button on:click={()=>onTime(t)} title={`${row.p} hPa · ${timeLabel(t,prefs.local)}`}>{format(v,row.field?.unit||'raw',prefs)}</button></td>{/each}</tr>{/each}</tbody></table></div>{/if}
 <details><summary>Exact chart values & source</summary><p>{field?.id} · numeric, mapped units only. Categorical and unknown-unit fields remain in Parameters.</p><div class="matrix"><table><tbody>{#each geometry.points as p}<tr><th>{timeLabel(p.t,prefs.local)}</th><td>{format(p.v,field?.unit,prefs)}</td></tr>{/each}</tbody></table></div></details>
</section>
<style>
 .explorer{margin:20px 0;color:#eaf4f7}.eyebrow{font-size:10px;letter-spacing:2px;color:#7ee8d1}h2{font-size:26px;letter-spacing:-.8px;margin:6px 0;color:#f0f8fa}h3{font-size:17px;margin:26px 0 6px;color:#eaf4f7}p,small{color:#a9bdca;font-size:11px;line-height:1.7}p{margin:8px 0 14px}.controls{display:flex;gap:8px}.controls input{flex:1;min-width:0}input,select,button{font:inherit;color:inherit;background:#142936;border:1px solid #355061;border-radius:9px;padding:10px}select{max-width:100%}.parameter-select{width:100%;margin:8px 0 16px}.chart-card{background:radial-gradient(ellipse at top right,#214e4b66,transparent 75%),#101f2c;border:1px solid #315b5a;border-radius:18px;padding:18px}.chart-heading{display:flex;justify-content:space-between;gap:10px;align-items:center}.chart-heading strong{display:block;font-size:30px;letter-spacing:-1px}.chart-heading b{display:block;font-size:12px;font-weight:500}.chart-heading>div:last-child{text-align:right}.chart-heading small{font-size:10px}svg{width:100%;display:block;margin:14px 0}svg line{stroke:#2d4452}svg path{fill:none;stroke:#85ead0;stroke-width:3;stroke-linejoin:round}svg circle{fill:#c1fff1}svg text{fill:#a6becb;font-size:10px}.matrix{overflow:auto;border:1px solid #304553;border-radius:12px}table{border-collapse:collapse;width:100%;font-size:11px;white-space:nowrap}th,td{padding:5px;border:1px solid #263c49}th{font-weight:500;background:#142632}th:first-child{position:sticky;left:0;z-index:1;text-align:left;min-width:105px}th small{display:block}td button,th button{background:transparent;border:0;white-space:nowrap;padding:9px;cursor:pointer;font-size:11px;min-height:38px}td button{color:#fff}button:hover{outline:1px solid #a7f5df}button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid #8ef4d8;outline-offset:2px}details{margin-top:18px;font-size:11px}summary{cursor:pointer;color:#a9bdca} @media(max-width:400px){.chart-heading{align-items:flex-start;flex-direction:column}.chart-heading>div:last-child{text-align:left}h2{font-size:23px}}

 .explorer{color:var(--ink,#edf7fa)}.chart-card{background:var(--aurora-hero,linear-gradient(125deg,#193e43,#183044));border-color:var(--line,#36505e);border-radius:16px}.eyebrow{font-size:11px;color:var(--mint,#7be4ca)}h2{font-size:25px;font-weight:500}p,small{font-size:12px;color:var(--muted,#b2c7d1)}.chart-heading small{font-size:11px}.chart-heading strong{font-weight:500}.controls input,select{background:var(--panel,#152b37);min-height:44px;border-color:var(--line,#36505e)}svg path{stroke:var(--mint,#7be4ca)}svg text{fill:var(--muted,#b2c7d1);font-size:12px}.matrix{border-color:var(--line,#36505e)}th{background:var(--panel,#152b37)}td button,th button{min-height:44px}details{font-size:12px}summary{color:var(--muted,#b2c7d1)}

</style>

