<script>
 import {nearestIndex,timeLabel} from './engine.mjs';
 export let ts=[],valid,local=false,onTime=()=>{};
 $: index=Math.max(0,nearestIndex(ts,valid,Infinity));
 $: progress=ts.length>1?index/(ts.length-1)*100:0;
 function move(i){const t=ts[Math.max(0,Math.min(ts.length-1,i))];if(Number.isFinite(t))onTime(t);}
</script>
<div class="forecast-navigation" role="group" aria-label="Forecast navigation">
 <div class="caption"><span>Explore forecast</span><span>Drag or use arrow keys</span></div>
 <div class="control"><button aria-label="Previous forecast time" title="Previous forecast time" disabled={index===0} on:click={()=>move(index-1)}>‹</button><input aria-label="Forecast time" aria-valuetext={`${timeLabel(ts[index],local)} ${local?'device local':'UTC'}`} type="range" min="0" max={Math.max(0,ts.length-1)} step="1" value={index} disabled={ts.length<2} style={`--progress:${progress}%`} on:input={e=>move(Number(e.currentTarget.value))}/><button aria-label="Next forecast time" title="Next forecast time" disabled={index>=ts.length-1} on:click={()=>move(index+1)}>›</button></div>
 <div class="endpoints"><span>{timeLabel(ts[0],local)}</span><span>{timeLabel(ts[ts.length-1],local)}</span></div>
</div>
<style>
 .forecast-navigation{margin:14px 0;color:#b2c7d1;font:11px/1.5 system-ui}.caption,.endpoints{display:flex;justify-content:space-between;gap:12px}.control{display:flex;align-items:center;gap:10px;margin:4px 0}.control button{width:36px;height:40px;flex:0 0 36px;border:1px solid #36505e;border-radius:9px;background:#152b37;color:#7be4ca;font:24px system-ui;cursor:pointer;padding:0}.control button:disabled{opacity:.3;cursor:default}.forecast-navigation .control input[type=range]{appearance:none;-webkit-appearance:none;display:block;flex:1;width:0;min-width:0;height:40px;min-height:40px;margin:0;padding:0;border:0;border-radius:0;background:transparent;box-shadow:none;cursor:pointer;touch-action:pan-y;accent-color:#7be4ca}.forecast-navigation input[type=range]::-webkit-slider-runnable-track{height:5px;border:0;border-radius:9px;background:linear-gradient(to right,#7be4ca var(--progress),#36505e var(--progress))}.forecast-navigation input[type=range]::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:18px;height:18px;border-radius:50%;border:3px solid #0d1b27;background:#7be4ca;box-shadow:0 0 0 1px #7be4ca;margin-top:-6.5px}.forecast-navigation input[type=range]::-moz-range-track{height:5px;border:0;border-radius:9px;background:#36505e}.forecast-navigation input[type=range]::-moz-range-progress{height:5px;background:#7be4ca}.forecast-navigation input[type=range]::-moz-range-thumb{width:14px;height:14px;border:3px solid #0d1b27;border-radius:50%;background:#7be4ca}.control button:focus-visible,.forecast-navigation input[type=range]:focus-visible{outline:2px solid #7be4ca;outline-offset:3px}.endpoints{font-size:10px;margin:0 46px}
</style>
