<script>
 import {sevenDays} from './daily.mjs';
 import {format,MODELS,finite} from './engine.mjs';
 export let data,prefs,valid,onTime=()=>{};
 const now=Date.now();
 $: days=sevenDays(data,now,prefs.local);
 $: lows=days.map(d=>d.low).filter(finite);
 $: highs=days.map(d=>d.high).filter(finite);
 $: low=lows.length?Math.min(...lows):0;
 $: high=highs.length?Math.max(...highs):1;
 $: extent=Math.max(1,high-low);
 const temp=v=>finite(v)?Math.round(prefs.temp==='F'?(v-273.15)*1.8+32:v-273.15)+'°':'—';
 const label=t=>new Date(t).toLocaleDateString('en-GB',{weekday:'short',day:'numeric',...(prefs.local?{}:{timeZone:'UTC'})});
</script>
<section aria-label="Seven-day forecast">
 <div class="heading"><h2>The week ahead</h2><small>{prefs.local?'Device local days':'UTC days'}</small></div>
 <div class="week"><div class="head"><span>Day</span><span>Low / high · °{prefs.temp}</span><span>Rain</span><span>Predictability</span></div>
 {#each days as day}<button class:chosen={valid>=day.start&&valid<day.end} disabled={!day.available} on:click={()=>onTime(day.time)} aria-label={`${label(day.start)}, low ${format(day.low,'K',prefs)}, high ${format(day.high,'K',prefs)}, precipitation ${format(day.rain,'mm',prefs)}, predictability ${day.predictability===null?'not supplied':day.predictability+' percent'}`}>
 <span>{label(day.start)}</span><span class="range"><span>{temp(day.low)}</span><span class="track">{#if finite(day.low)&&finite(day.high)}<em style={`left:${(day.low-low)/extent*100}%;width:${Math.max(2,(day.high-day.low)/extent*100)}%`}></em>{/if}</span><b>{temp(day.high)}</b></span><span>{format(day.rain,'mm',prefs)}</span><span>{day.predictability===null?'—':day.predictability+'%'}{#if day.predictability!==null}<i aria-hidden="true"><em style={`width:${day.predictability}%`}></em></i>{/if}</span>
 </button>{/each}</div>
 <p>Shared bar scale: {format(low,'K',prefs)} to {format(high,'K',prefs)}. Range of returned temperature samples. Rain totals require full-day interval coverage; incomplete totals are —. Predictability is the {MODELS[data.model]||data.model} provider index, not rain probability. — means unavailable or not aligned with the displayed day.</p>
</section>
<style>
 .range{display:grid;grid-template-columns:25px 1fr 25px;gap:5px;align-items:center}.track{position:relative;height:4px;background:#304651;border-radius:4px;overflow:hidden}.track em{position:absolute;top:0;height:100%;border-radius:4px;background:var(--mint,#7be4ca)}

 .heading{display:flex;justify-content:space-between;align-items:center;gap:10px;margin:20px 0 10px}h2{margin:0;font-size:16px;font-weight:500;color:var(--ink,#edf7fa)}small{font-size:11px;color:var(--muted,#b2c7d1)}.week{border:1px solid var(--line,#36505e);border-radius:12px;overflow:hidden}.head,button{display:grid;grid-template-columns:.85fr 1.45fr .7fr 1fr;gap:8px;align-items:center;text-align:right;padding:10px 12px}.head{background:var(--panel,#152b37);font-size:11px;color:var(--muted,#b2c7d1)}.head span:first-child,button span:first-child{text-align:left}button{width:100%;font:12px/1.5 system-ui;border:0;border-top:1px solid var(--line,#36505e);background:transparent;color:var(--ink,#edf7fa);cursor:pointer;min-height:48px}button.chosen{background:#1b373c}button:hover{background:#23434a}button:disabled{opacity:.6;cursor:default}button:focus-visible{outline:2px solid var(--mint,#7be4ca);outline-offset:-2px}b{font-weight:500}i{display:block;height:4px;width:52px;max-width:100%;margin:5px 0 0 auto;background:#34515a;border-radius:3px;overflow:hidden}em{display:block;height:100%;background:var(--mint,#7be4ca)}p{font-size:11px;line-height:1.6;color:var(--muted,#b2c7d1);margin:10px 0}@media(max-width:380px){.head,button{padding:9px 8px;gap:5px}.head{font-size:10px}button{font-size:11px}}
</style>
