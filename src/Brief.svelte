<script>
 import {finite,value,format,describe,timeLabel,HOUR} from './engine.mjs';
 import {seriesGeometry} from './visuals.mjs';
 import {fieldFor} from './engine.mjs';
 import {nextSignal,winterRelevant} from './brief.mjs';
 export let data,valid,prefs,thresholds,onTime=()=>{},onWinter=()=>{};
 $: chart=seriesGeometry(fieldFor(data,'temperature'),valid,valid+24*HOUR);
 $: signal=nextSignal(data,valid,thresholds);
 $: winter=winterRelevant(data,valid);
 $: slots=data.ts.filter(t=>t>=valid&&t<=valid+24*HOUR);
 const show=(key,t)=>format(value(data,key,t),describe(key).unit,prefs);
 $: direction=value(data,'windDir',valid);
 $: speed=value(data,'wind',valid);
 $: windFrom=finite(speed)&&speed===0?'Calm':finite(direction)?'From '+['N','NE','E','SE','S','SW','W','NW'][Math.round(((direction%360+360)%360)/45)%8]:'';
</script>
<section aria-label="Forecast briefing">
 <div class="conditions"><div class="temperature"><small>Temperature</small><strong>{show('temperature',valid)}</strong><span>Dew point {show('dewPoint',valid)}</span></div><div class="wind"><small>Wind / gusts</small><strong>{show('wind',valid)} <span>/ {show('windGust',valid)}</span></strong><span>{windFrom}</span></div></div>
 <div class="essentials"><div><small>Precipitation</small><strong>{show('precipAmount',valid)}</strong></div><div><small>Cloud base</small><strong>{show('cloudBase',valid)}</strong></div><div><small>Pressure</small><strong>{show('pressure',valid)}</strong></div></div>
 <div class="signal"><small>NEXT 24 HOURS</small>{#if signal}<p><b>{signal.label}</b> · {timeLabel(signal.time,prefs.local)}{prefs.local?' local':' UTC'}<br/>{show(signal.key,signal.time)} · threshold {format(signal.limit,describe(signal.key).unit,prefs)}</p>{:else}<p>No rain or gust threshold exceedance found in the available samples.</p>{/if}</div>
 {#if winter}<button class="winter" on:click={onWinter}>Cold or snowy conditions in the source forecast → Winter details <small>Check ECMWF snowline and precipitation type</small></button>{/if}
 <div class="temperature-chart"><small>Temperature · next 24 hours · {prefs.local?'local':'UTC'}</small><svg viewBox="0 0 560 190" role="img" aria-label="24-hour temperature trend with gaps preserved"><path d={chart.path}/>{#each chart.points.filter(p=>p.y!==null) as p}<circle cx={p.x} cy={p.y} r="3"><title>{timeLabel(p.t,prefs.local)} · {format(p.v,'K',prefs)}</title></circle>{/each}<text x="48" y="15">{format(chart.max,'K',prefs)}</text><text x="48" y="166">{format(chart.min,'K',prefs)}</text><text x="48" y="184">{timeLabel(valid,prefs.local)}</text><text x="536" y="184" text-anchor="end">{timeLabel(valid+24*HOUR,prefs.local)}</text></svg></div>
 <details class="hourly"><summary>Hourly forecast table</summary>
 <div class="heading"><h2>Next 24 hours</h2><small>Tap a time · {prefs.local?'local':'UTC'}</small></div>
 <div class="timeline" role="region" aria-label="24-hour forecast timeline"><table><thead><tr><th>Forecast</th>{#each slots as t}<th><button aria-label={`Select ${timeLabel(t,prefs.local)}`} class:active={t===valid} on:click={()=>onTime(t)}>{timeLabel(t,prefs.local)}</button></th>{/each}</tr></thead><tbody>{#each ['temperature','wind','windGust','precipAmount'] as key}<tr><th>{describe(key).label}</th>{#each slots as t}{@const v=value(data,key,t)}<td class:wet={key==='precipAmount'&&finite(v)&&v>0}>{show(key,t)}</td>{/each}</tr>{/each}</tbody></table></div>
 </details><p class="note">Amounts are per forecast interval. — means unavailable. Forecasts are not observations.</p>

</section>
<style>
 .temperature-chart{margin:16px 0}.temperature-chart svg{width:100%;display:block}.temperature-chart path{fill:none;stroke:var(--mint,#7be4ca);stroke-width:2.5}.temperature-chart circle{fill:var(--mint,#7be4ca)}.temperature-chart text{fill:var(--muted,#b2c7d1);font-size:11px}.hourly{margin:12px 0}.hourly summary{font-size:12px;cursor:pointer;color:var(--muted,#b2c7d1)}

 section{color:var(--ink,#edf7fa)}small{display:block;color:var(--muted,#b2c7d1);font-size:11px}.conditions{display:grid;grid-template-columns:1.1fr 1fr;gap:16px;padding:20px;background:var(--aurora-hero,linear-gradient(125deg,#193e43,#183044));border-radius:14px;margin:16px 0 10px;align-items:center}.temperature>strong{display:block;font-size:40px;font-weight:500;letter-spacing:-1.5px;line-height:1.4}.conditions span{font-size:12px;color:var(--muted,#b2c7d1)}.wind>strong{display:block;font-size:20px;font-weight:500;margin:10px 0}.wind>strong span{display:block;font-size:16px;color:var(--ink,#edf7fa)}.essentials{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.essentials>div{padding:12px 10px;background:var(--panel,#152b37);border-radius:10px;min-width:0}.essentials strong{display:block;font-size:15px;font-weight:500;margin-top:6px;overflow-wrap:anywhere}.signal{border-left:2px solid var(--mint,#7be4ca);padding:2px 12px;margin:18px 0}.signal small{letter-spacing:.8px}.signal p{font-size:13px;line-height:1.65;margin:5px 0}.signal b{font-weight:500}.heading{display:flex;justify-content:space-between;gap:10px;align-items:center;margin:18px 0 10px}h2{font-size:16px;font-weight:500;color:inherit;margin:0}.timeline{overflow:auto;border:1px solid var(--line,#36505e);border-radius:12px}table{width:100%;border-collapse:collapse;font-size:12px;white-space:nowrap}th,td{padding:10px;text-align:right;border-bottom:1px solid #2b424f}th{font-weight:400;color:var(--muted,#b2c7d1)}th:first-child{position:sticky;left:0;z-index:1;background:var(--panel,#152b37);text-align:left}button{font:inherit;cursor:pointer}th button{background:transparent;border:0;color:inherit;min-height:42px;padding:6px}th button.active{background:#28504a;color:#d7fff1;border-radius:8px}.wet{background:#234956;color:#e1f8ff}.note{font-size:11px;color:var(--muted,#b2c7d1);line-height:1.6;margin:10px 0}.winter{display:block;width:100%;background:#1c3548;color:#e4f1fa;border:1px solid #456278;padding:12px;border-radius:10px;text-align:left;font-size:13px;line-height:1.5}.winter small{margin-top:5px}button:focus-visible{outline:2px solid var(--mint,#7be4ca);outline-offset:2px}@media(max-width:400px){.conditions{padding:16px;gap:12px}.temperature>strong{font-size:34px}.wind>strong{font-size:18px}.essentials strong{font-size:13px}.essentials>div{padding:10px 8px}}
</style>
