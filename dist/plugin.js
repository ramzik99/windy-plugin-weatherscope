const __pluginConfig =  {
  "name": "windy-plugin-weatherscope",
  "version": "0.3.0",
  "icon": "◉",
  "title": "WeatherScope",
  "description": "Every detail. One clear forecast. Meteoblue baseline and complete returned-parameter explorer.",
  "desktopUI": "rhpane",
  "mobileUI": "fullscreen",
  "routerPath": "/weatherscope/:lat?/:lon?",
  "addToContextmenu": true,
  "listenToSingleclick": true,
  "private": true,
  "built": 1790022071516,
  "builtReadable": "2026-09-21T20:21:11.516Z"
};

// transformCode: import { map } from '@windy/map';
const { map } = W.map;

// transformCode: import store from '@windy/store';
const store = W.store;

// transformCode: import { singleclick } from '@windy/singleclick';
const { singleclick } = W.singleclick;

// transformCode: import { get } from '@windy/reverseName';
const { get } = W.reverseName;

// transformCode: import { getPointForecastData } from '@windy/fetch';
const { getPointForecastData } = W.fetch;


/** @returns {void} */
function noop() {}

function run(fn) {
	return fn();
}

function blank_object() {
	return Object.create(null);
}

/**
 * @param {Function[]} fns
 * @returns {void}
 */
function run_all(fns) {
	fns.forEach(run);
}

/**
 * @param {any} thing
 * @returns {thing is Function}
 */
function is_function(thing) {
	return typeof thing === 'function';
}

/** @returns {boolean} */
function safe_not_equal(a, b) {
	return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
}

/** @returns {boolean} */
function is_empty(obj) {
	return Object.keys(obj).length === 0;
}

/**
 * @param {Node} target
 * @param {Node} node
 * @returns {void}
 */
function append(target, node) {
	target.appendChild(node);
}

/**
 * @param {Node} target
 * @param {string} style_sheet_id
 * @param {string} styles
 * @returns {void}
 */
function append_styles(target, style_sheet_id, styles) {
	const append_styles_to = get_root_for_style(target);
	if (!append_styles_to.getElementById(style_sheet_id)) {
		const style = element('style');
		style.id = style_sheet_id;
		style.textContent = styles;
		append_stylesheet(append_styles_to, style);
	}
}

/**
 * @param {Node} node
 * @returns {ShadowRoot | Document}
 */
function get_root_for_style(node) {
	if (!node) return document;
	const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
	if (root && /** @type {ShadowRoot} */ (root).host) {
		return /** @type {ShadowRoot} */ (root);
	}
	return node.ownerDocument;
}

/**
 * @param {ShadowRoot | Document} node
 * @param {HTMLStyleElement} style
 * @returns {CSSStyleSheet}
 */
function append_stylesheet(node, style) {
	append(/** @type {Document} */ (node).head || node, style);
	return style.sheet;
}

/**
 * @param {Node} target
 * @param {Node} node
 * @param {Node} [anchor]
 * @returns {void}
 */
function insert(target, node, anchor) {
	target.insertBefore(node, anchor || null);
}

/**
 * @param {Node} node
 * @returns {void}
 */
function detach(node) {
	if (node.parentNode) {
		node.parentNode.removeChild(node);
	}
}

/**
 * @returns {void} */
function destroy_each(iterations, detaching) {
	for (let i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d(detaching);
	}
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} name
 * @returns {HTMLElementTagNameMap[K]}
 */
function element(name) {
	return document.createElement(name);
}

/**
 * @template {keyof SVGElementTagNameMap} K
 * @param {K} name
 * @returns {SVGElement}
 */
function svg_element(name) {
	return document.createElementNS('http://www.w3.org/2000/svg', name);
}

/**
 * @param {string} data
 * @returns {Text}
 */
function text(data) {
	return document.createTextNode(data);
}

/**
 * @returns {Text} */
function space() {
	return text(' ');
}

/**
 * @returns {Text} */
function empty() {
	return text('');
}

/**
 * @param {EventTarget} node
 * @param {string} event
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
 * @returns {() => void}
 */
function listen(node, event, handler, options) {
	node.addEventListener(event, handler, options);
	return () => node.removeEventListener(event, handler, options);
}

/**
 * @param {Element} node
 * @param {string} attribute
 * @param {string} [value]
 * @returns {void}
 */
function attr(node, attribute, value) {
	if (value == null) node.removeAttribute(attribute);
	else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}

/** @returns {number} */
function to_number(value) {
	return value === '' ? null : +value;
}

/**
 * @param {Element} element
 * @returns {ChildNode[]}
 */
function children(element) {
	return Array.from(element.childNodes);
}

/**
 * @param {Text} text
 * @param {unknown} data
 * @returns {void}
 */
function set_data(text, data) {
	data = '' + data;
	if (text.data === data) return;
	text.data = /** @type {string} */ (data);
}

/**
 * @returns {void} */
function set_input_value(input, value) {
	input.value = value == null ? '' : value;
}

/**
 * @returns {void} */
function set_style(node, key, value, important) {
	{
		node.style.setProperty(key, value, '');
	}
}

/**
 * @returns {void} */
function select_option(select, value, mounting) {
	for (let i = 0; i < select.options.length; i += 1) {
		const option = select.options[i];
		if (option.__value === value) {
			option.selected = true;
			return;
		}
	}
	if (!mounting || value !== undefined) {
		select.selectedIndex = -1; // no option should be selected
	}
}

function select_value(select) {
	const selected_option = select.querySelector(':checked');
	return selected_option && selected_option.__value;
}

/**
 * @returns {void} */
function toggle_class(element, name, toggle) {
	// The `!!` is required because an `undefined` flag means flipping the current state.
	element.classList.toggle(name, !!toggle);
}

/**
 * @typedef {Node & {
 * 	claim_order?: number;
 * 	hydrate_init?: true;
 * 	actual_end_child?: NodeEx;
 * 	childNodes: NodeListOf<NodeEx>;
 * }} NodeEx
 */

/** @typedef {ChildNode & NodeEx} ChildNodeEx */

/** @typedef {NodeEx & { claim_order: number }} NodeEx2 */

/**
 * @typedef {ChildNodeEx[] & {
 * 	claim_info?: {
 * 		last_index: number;
 * 		total_claimed: number;
 * 	};
 * }} ChildNodeArray
 */

let current_component;

/** @returns {void} */
function set_current_component(component) {
	current_component = component;
}

function get_current_component() {
	if (!current_component) throw new Error('Function called outside component initialization');
	return current_component;
}

/**
 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
 * it can be called from an external module).
 *
 * If a function is returned _synchronously_ from `onMount`, it will be called when the component is unmounted.
 *
 * `onMount` does not run inside a [server-side component](https://svelte.dev/docs#run-time-server-side-component-api).
 *
 * https://svelte.dev/docs/svelte#onmount
 * @template T
 * @param {() => import('./private.js').NotFunction<T> | Promise<import('./private.js').NotFunction<T>> | (() => any)} fn
 * @returns {void}
 */
function onMount(fn) {
	get_current_component().$$.on_mount.push(fn);
}

/**
 * Schedules a callback to run immediately before the component is unmounted.
 *
 * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
 * only one that runs inside a server-side component.
 *
 * https://svelte.dev/docs/svelte#ondestroy
 * @param {() => any} fn
 * @returns {void}
 */
function onDestroy(fn) {
	get_current_component().$$.on_destroy.push(fn);
}

const dirty_components = [];
const binding_callbacks = [];

let render_callbacks = [];

const flush_callbacks = [];

const resolved_promise = /* @__PURE__ */ Promise.resolve();

let update_scheduled = false;

/** @returns {void} */
function schedule_update() {
	if (!update_scheduled) {
		update_scheduled = true;
		resolved_promise.then(flush);
	}
}

/** @returns {void} */
function add_render_callback(fn) {
	render_callbacks.push(fn);
}

// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();

let flushidx = 0; // Do *not* move this inside the flush() function

/** @returns {void} */
function flush() {
	// Do not reenter flush while dirty components are updated, as this can
	// result in an infinite loop. Instead, let the inner flush handle it.
	// Reentrancy is ok afterwards for bindings etc.
	if (flushidx !== 0) {
		return;
	}
	const saved_component = current_component;
	do {
		// first, call beforeUpdate functions
		// and update components
		try {
			while (flushidx < dirty_components.length) {
				const component = dirty_components[flushidx];
				flushidx++;
				set_current_component(component);
				update(component.$$);
			}
		} catch (e) {
			// reset dirty state to not end up in a deadlocked state and then rethrow
			dirty_components.length = 0;
			flushidx = 0;
			throw e;
		}
		set_current_component(null);
		dirty_components.length = 0;
		flushidx = 0;
		while (binding_callbacks.length) binding_callbacks.pop()();
		// then, once components are updated, call
		// afterUpdate functions. This may cause
		// subsequent updates...
		for (let i = 0; i < render_callbacks.length; i += 1) {
			const callback = render_callbacks[i];
			if (!seen_callbacks.has(callback)) {
				// ...so guard against infinite loops
				seen_callbacks.add(callback);
				callback();
			}
		}
		render_callbacks.length = 0;
	} while (dirty_components.length);
	while (flush_callbacks.length) {
		flush_callbacks.pop()();
	}
	update_scheduled = false;
	seen_callbacks.clear();
	set_current_component(saved_component);
}

/** @returns {void} */
function update($$) {
	if ($$.fragment !== null) {
		$$.update();
		run_all($$.before_update);
		const dirty = $$.dirty;
		$$.dirty = [-1];
		$$.fragment && $$.fragment.p($$.ctx, dirty);
		$$.after_update.forEach(add_render_callback);
	}
}

/**
 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
 * @param {Function[]} fns
 * @returns {void}
 */
function flush_render_callbacks(fns) {
	const filtered = [];
	const targets = [];
	render_callbacks.forEach((c) => (fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c)));
	targets.forEach((c) => c());
	render_callbacks = filtered;
}

const outroing = new Set();

/**
 * @type {Outro}
 */
let outros;

/**
 * @param {import('./private.js').Fragment} block
 * @param {0 | 1} [local]
 * @returns {void}
 */
function transition_in(block, local) {
	if (block && block.i) {
		outroing.delete(block);
		block.i(local);
	}
}

/**
 * @param {import('./private.js').Fragment} block
 * @param {0 | 1} local
 * @param {0 | 1} [detach]
 * @param {() => void} [callback]
 * @returns {void}
 */
function transition_out(block, local, detach, callback) {
	if (block && block.o) {
		if (outroing.has(block)) return;
		outroing.add(block);
		outros.c.push(() => {
			outroing.delete(block);
		});
		block.o(local);
	}
}

/** @typedef {1} INTRO */
/** @typedef {0} OUTRO */
/** @typedef {{ direction: 'in' | 'out' | 'both' }} TransitionOptions */
/** @typedef {(node: Element, params: any, options: TransitionOptions) => import('../transition/public.js').TransitionConfig} TransitionFn */

/**
 * @typedef {Object} Outro
 * @property {number} r
 * @property {Function[]} c
 * @property {Object} p
 */

/**
 * @typedef {Object} PendingProgram
 * @property {number} start
 * @property {INTRO|OUTRO} b
 * @property {Outro} [group]
 */

/**
 * @typedef {Object} Program
 * @property {number} a
 * @property {INTRO|OUTRO} b
 * @property {1|-1} d
 * @property {number} duration
 * @property {number} start
 * @property {number} end
 * @property {Outro} [group]
 */

// general each functions:

function ensure_array_like(array_like_or_iterator) {
	return array_like_or_iterator?.length !== undefined
		? array_like_or_iterator
		: Array.from(array_like_or_iterator);
}

/** @returns {void} */
function create_component(block) {
	block && block.c();
}

/** @returns {void} */
function mount_component(component, target, anchor) {
	const { fragment, after_update } = component.$$;
	fragment && fragment.m(target, anchor);
	// onMount happens before the initial afterUpdate
	add_render_callback(() => {
		const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
		// if the component was destroyed immediately
		// it will update the `$$.on_destroy` reference to `null`.
		// the destructured on_destroy may still reference to the old array
		if (component.$$.on_destroy) {
			component.$$.on_destroy.push(...new_on_destroy);
		} else {
			// Edge case - component was destroyed immediately,
			// most likely as a result of a binding initialising
			run_all(new_on_destroy);
		}
		component.$$.on_mount = [];
	});
	after_update.forEach(add_render_callback);
}

/** @returns {void} */
function destroy_component(component, detaching) {
	const $$ = component.$$;
	if ($$.fragment !== null) {
		flush_render_callbacks($$.after_update);
		run_all($$.on_destroy);
		$$.fragment && $$.fragment.d(detaching);
		// TODO null out other refs, including component.$$ (but need to
		// preserve final state?)
		$$.on_destroy = $$.fragment = null;
		$$.ctx = [];
	}
}

/** @returns {void} */
function make_dirty(component, i) {
	if (component.$$.dirty[0] === -1) {
		dirty_components.push(component);
		schedule_update();
		component.$$.dirty.fill(0);
	}
	component.$$.dirty[(i / 31) | 0] |= 1 << i % 31;
}

// TODO: Document the other params
/**
 * @param {SvelteComponent} component
 * @param {import('./public.js').ComponentConstructorOptions} options
 *
 * @param {import('./utils.js')['not_equal']} not_equal Used to compare props and state values.
 * @param {(target: Element | ShadowRoot) => void} [append_styles] Function that appends styles to the DOM when the component is first initialised.
 * This will be the `add_css` function from the compiled component.
 *
 * @returns {void}
 */
function init(
	component,
	options,
	instance,
	create_fragment,
	not_equal,
	props,
	append_styles = null,
	dirty = [-1]
) {
	const parent_component = current_component;
	set_current_component(component);
	/** @type {import('./private.js').T$$} */
	const $$ = (component.$$ = {
		fragment: null,
		ctx: [],
		// state
		props,
		update: noop,
		not_equal,
		bound: blank_object(),
		// lifecycle
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
		// everything else
		callbacks: blank_object(),
		dirty,
		skip_bound: false,
		root: options.target || parent_component.$$.root
	});
	append_styles && append_styles($$.root);
	let ready = false;
	$$.ctx = instance
		? instance(component, options.props || {}, (i, ret, ...rest) => {
				const value = rest.length ? rest[0] : ret;
				if ($$.ctx && not_equal($$.ctx[i], ($$.ctx[i] = value))) {
					if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
					if (ready) make_dirty(component, i);
				}
				return ret;
		  })
		: [];
	$$.update();
	ready = true;
	run_all($$.before_update);
	// `false` as a special case of no DOM component
	$$.fragment = create_fragment ? create_fragment($$.ctx) : false;
	if (options.target) {
		if (options.hydrate) {
			// TODO: what is the correct type here?
			// @ts-expect-error
			const nodes = children(options.target);
			$$.fragment && $$.fragment.l(nodes);
			nodes.forEach(detach);
		} else {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			$$.fragment && $$.fragment.c();
		}
		if (options.intro) transition_in(component.$$.fragment);
		mount_component(component, options.target, options.anchor);
		flush();
	}
	set_current_component(parent_component);
}

/**
 * Base class for Svelte components. Used when dev=false.
 *
 * @template {Record<string, any>} [Props=any]
 * @template {Record<string, any>} [Events=any]
 */
class SvelteComponent {
	/**
	 * ### PRIVATE API
	 *
	 * Do not use, may change at any time
	 *
	 * @type {any}
	 */
	$$ = undefined;
	/**
	 * ### PRIVATE API
	 *
	 * Do not use, may change at any time
	 *
	 * @type {any}
	 */
	$$set = undefined;

	/** @returns {void} */
	$destroy() {
		destroy_component(this, 1);
		this.$destroy = noop;
	}

	/**
	 * @template {Extract<keyof Events, string>} K
	 * @param {K} type
	 * @param {((e: Events[K]) => void) | null | undefined} callback
	 * @returns {() => void}
	 */
	$on(type, callback) {
		if (!is_function(callback)) {
			return noop;
		}
		const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
		callbacks.push(callback);
		return () => {
			const index = callbacks.indexOf(callback);
			if (index !== -1) callbacks.splice(index, 1);
		};
	}

	/**
	 * @param {Partial<Props>} props
	 * @returns {void}
	 */
	$set(props) {
		if (this.$$set && !is_empty(props)) {
			this.$$.skip_bound = true;
			this.$$set(props);
			this.$$.skip_bound = false;
		}
	}
}

/**
 * @typedef {Object} CustomElementPropDefinition
 * @property {string} [attribute]
 * @property {boolean} [reflect]
 * @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
 */

// generated during release, do not modify

const PUBLIC_VERSION = '4';

if (typeof window !== 'undefined')
	// @ts-ignore
	(window.__svelte || (window.__svelte = { v: new Set() })).v.add(PUBLIC_VERSION);

const HOUR=3600000;
const MODELS={mblue:'Meteoblue',ecmwf:'ECMWF',gfs:'GFS',icon:'ICON'};
const finite=v=>typeof v==='number'&&Number.isFinite(v);
const defs={
 temperature:['Temperature','K','Surface'],feelTemperature:['Feels like','K','Surface'],dewPoint:['Dew point','K','Moisture'],
 wind:['Wind','m/s','Wind'],windGust:['Gust','m/s','Wind'],windDir:['Wind direction','°','Wind'],pressure:['Pressure','Pa','Surface'],
 precipAmount:['Precipitation','mm/step','Precipitation'],precipSnowAmount:['Snow water equivalent','mm/step','Precipitation'],
 precipConvectiveAmount:['Convective precipitation','mm/step','Precipitation'],precipType:['Precipitation type','code','Precipitation'],
 cloudBase:['Cloud base','m','Clouds'],visibility:['Visibility','m','Clouds'],
 icon:['Weather symbol','code','Other'],moonPhase:['Moon phase','code','Other'],hour:['Local hour','h','Other'],isDay:['Daylight','boolean','Other'],
 waves:['Wave height','m','Marine'],wavesDir:['Wave direction','°','Marine'],wavesPeriod:['Wave period','s','Marine'],
 swell:['Swell height','m','Marine'],swell1:['Swell 1 height','m','Marine'],swell2:['Swell 2 height','m','Marine'],aqiUs:['US AQI','index','Air quality']
};
function describe(key){
 if(defs[key])return {label:defs[key][0],unit:defs[key][1],group:defs[key][2]};
 const m=key.match(/^(temp|dewPoint|rh|wind|windDir|cloud|gh)-(surface|\d+h)$/);
 if(m){const [,kind,level]=m;const names={temp:['Temperature','K'],dewPoint:['Dew point','K'],rh:['Relative humidity','%'],wind:['Wind','m/s'],windDir:['Wind direction','°'],cloud:['Cloud fraction','%'],gh:['Geopotential height','m']};return {label:`${names[kind][0]} · ${level==='surface'?'surface':level.slice(0,-1)+' hPa'}`,unit:names[kind][1],group:kind==='cloud'?'Clouds':'Vertical profile'};}
 return {label:key,unit:'raw',group:'Other'};
}
function normalize(payload,requestedModel){
 if(!Array.isArray(payload?.data?.ts)||!payload.data.ts.length)throw Error('No supported forecast time series was returned.');
 const fields=[];
 for(const section of ['data','meteogram','airgram','sounding']){
  const block=payload[section];if(!block)continue;
  const ts=block.ts||payload.data.ts;
  if(!Array.isArray(ts)||!ts.every((v,i,a)=>finite(v)&&v>1e11&&(i===0||v>a[i-1])))throw Error('Unsupported or unordered forecast timestamps.');
  for(const [key,values] of Object.entries(block))if(key!=='ts'&&Array.isArray(values))fields.push({id:`${section}.${key}`,key,section,ts,values,...describe(key)});
 }
 const header=payload.header||{};
 return {fields,ts:payload.data.ts,header,summary:payload.summary||[],raw:payload,requestedModel,model:header.model||requestedModel};
}
function nearestIndex(ts,time,tolerance=90*60000){let best=-1,delta=Infinity;ts.forEach((t,i)=>{const d=Math.abs(t-time);if(d<delta){delta=d;best=i;}});return delta<=tolerance?best:-1;}
function at(field,time){const i=nearestIndex(field.ts,time,0);return i<0?null:field.values[i]??null;}
function fieldFor(data,key){return data?.fields.find(f=>f.key===key&&f.section==='data')||data?.fields.find(f=>f.key===key);}
function value(data,key,time){const f=fieldFor(data,key);return f?at(f,time):null;}
function format(v,unit,prefs={}){
 if(v===null||v===undefined||typeof v==='number'&&!finite(v))return '—';
 if(typeof v==='string'||typeof v==='boolean')return String(v);
 if(typeof v==='object')return JSON.stringify(v);
 let n=v,u=unit;
 if(unit==='K'){n=v-273.15;u='°C';if(prefs.temp==='F'){n=n*1.8+32;u='°F';}}
 if(unit==='Pa'){n=v/100;u='hPa';}
 if(unit==='m/s'&&prefs.wind!=='ms'){n=v*1.943844;u='kt';}
 return `${Number(n.toFixed(unit==='°'?0:1))}${u==='raw'?' (raw)':u==='code'?' (code)':' '+u}`;
}
function timeLabel(time,local=false){return new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit',...(local?{}:{timeZone:'UTC'})}).format(new Date(time));}
function derived(data,time){
 const get=k=>value(data,k,time),rows=[];
 const push=(key,label,v,unit,group,method)=>{if(finite(v))rows.push({id:`derived.${key}`,key,label,unit,group,section:'derived',ts:[time],values:[v],method});};
 const t=get('temperature'),td=get('dewPoint');
 if(finite(t)&&finite(td)&&t>150&&td>150&&td<=t){const c=t-273.15,d=td-273.15;push('rh','Relative humidity',Math.min(100,100*Math.exp(17.625*d/(243.04+d)-17.625*c/(243.04+c))),'%','Moisture','Magnus approximation over liquid water using the same-source surface temperature and dew point.');}
 const p=get('pressure'),p0=value(data,'pressure',time-3*HOUR),pf=fieldFor(data,'pressure');
 if(pf&&finite(p)&&finite(p0)&&pf.ts.includes(time)&&pf.ts.includes(time-3*HOUR))push('pressureTrend','3-hour pressure change',p-p0,'Pa','Surface','Exact forecast timestamps 3 hours apart. This is a forecast change, not an observed pressure tendency.');
 return rows;
}
function briefing(data,time,prefs,thresholds={gust:15,rain:2}){
 const items=[],wind=value(data,'wind',time),gust=value(data,'windGust',time),t=value(data,'temperature',time),td=value(data,'dewPoint',time);
 if(finite(t))items.push({label:'Selected forecast',text:`${format(t,'K',prefs)}${finite(td)?' · dew point '+format(td,'K',prefs):''}${finite(wind)?' · wind '+format(wind,'m/s',prefs):''}.`,key:'temperature'});
 if(finite(gust)&&gust>=thresholds.gust)items.push({label:'Wind signal',text:`Gusts ${format(gust,'m/s',prefs)} exceed your ${format(thresholds.gust,'m/s',prefs)} threshold.`,key:'windGust'});
 const rain=fieldFor(data,'precipAmount');
 if(rain){const i=rain.ts.findIndex((ts,i)=>ts>=time&&ts<=time+24*HOUR&&finite(rain.values[i])&&rain.values[i]>=thresholds.rain);if(i>=0)items.push({label:'Next wet interval',text:`${format(rain.values[i],'mm/step',prefs)} at ${timeLabel(rain.ts[i],prefs.local)}. Threshold ${thresholds.rain} mm/step.`,key:'precipAmount'});}
 const tendency=derived(data,time).find(f=>f.key==='pressureTrend');
 if(tendency)items.push({label:'Pressure evolution',text:`${format(tendency.values[0],'Pa',prefs)} over the preceding 3 forecast hours.`,key:'pressure'});
 if(!items.length)items.push({label:'Coverage',text:'No supported briefing parameters at this time. Inspect available fields below.',key:''});
 return items;
}
function compare(datasets,key,time){
 const unique=datasets.filter((d,i,all)=>all.findIndex(other=>other.model===d.model)===i);
 const entries=unique.map(d=>{const f=fieldFor(d,key),i=f?f.ts.indexOf(time):-1;return {model:d.model,value:i<0?null:f.values[i]};}).filter(x=>finite(x.value));
 return {entries,spread:entries.length>=2?Math.max(...entries.map(e=>e.value))-Math.min(...entries.map(e=>e.value)):null};
}
const requirements=[
 ['K index','kIndex','Calculated from exact 850, 700 and 500 hPa inputs'],['Total Totals','totalTotals','Calculated from exact 850 and 500 hPa inputs'],['850–500 hPa shear','shear850500','Calculated vector difference'],['850–500 hPa lapse rate','lapse850500','Calculated using geopotential heights'],['Resolved freezing crossing','freezingCrossing','Interpolated profile crossing; not snow level'],
 ['Surface temperature','temperature','Direct forecast'],['Dew point','dewPoint','Meteogram'],['Surface wind','wind','Direct forecast'],['Gusts','windGust','Direct forecast'],['Pressure','pressure','Direct forecast; verify surface vs MSL'],['Precipitation','precipAmount','Amount per returned time step'],['Cloud base','cloudBase','Meteogram'],
 ['850 hPa temperature','temp-850h','Profile'],['500 hPa temperature','temp-500h','Profile'],['300 hPa wind','wind-300h','Profile'],['850 hPa humidity','rh-850h','Sounding'],['Geopotential height','gh-500h','Profile'],
 ['CAPE / CIN',null,'Not guaranteed by Windy point-forecast schema; additional source or validated parcel calculation needed'],
 ['LCL / LFC / EL',null,'Requires validated parcel calculations'],['0–6 km shear / SRH',null,'Requires height-resolved winds and documented storm-motion method'],['Precipitable water',null,'Requires full moisture profile and validated integration'],
 ['Freezing / wet-bulb levels',null,'Requires validated profile calculations'],['Convergence / vorticity / advection',null,'Requires spatial model fields'],['Observed conditions / radar / satellite',null,'Separate observational sources'],['Waves / air quality / soil',null,'Separate specialized products']
];

// Only exact valid-time values enter diagnostics. No mixing across sources or levels.
function windComponents(speed,direction){
 if(!finite(speed)||speed<0||!finite(direction))return null;
 const r=direction*Math.PI/180;return {u:-speed*Math.sin(r),v:-speed*Math.cos(r)};
}
function verticalProfile(data,time){
 const levels=[...new Set((data?.fields||[]).map(f=>f.key.match(/^temp-(\d+)h$/)?.[1]).filter(Boolean))].map(Number).sort((a,b)=>b-a);
 const ground=data?.header?.modelElevation;
 return levels.map(p=>{
  const t=value(data,`temp-${p}h`,time),td=value(data,`dewPoint-${p}h`,time),z=value(data,`gh-${p}h`,time);
  return {p,t,td,z,wind:value(data,`wind-${p}h`,time),dir:value(data,`windDir-${p}h`,time),belowGround:finite(ground)&&finite(z)?z<ground:null};
 });
}
function diagnostics(data,time){
 const rows=[],get=k=>value(data,k,time),profile=verticalProfile(data,time);
 const add=(key,label,v,unit,method)=>{if(finite(v))rows.push({id:`derived.${key}`,key,label,unit,group:'Profile diagnostics',section:'derived',values:[v],ts:[time],method});};
 const t850=get('temp-850h'),t700=get('temp-700h'),t500=get('temp-500h'),td850=get('dewPoint-850h'),td700=get('dewPoint-700h');
 const ground=data?.header?.modelElevation;
 const above=levels=>finite(ground)&&levels.every(p=>{const z=get(`gh-${p}h`);return finite(z)&&z>=ground;});
 const baseMethod='Same source and exact valid time; withheld unless required levels are above the supplied model terrain.';
 if(above([850,500])&&[t850,t500].every(finite)){
  const dz=get('gh-500h')-get('gh-850h');
  if(dz>0)add('lapse850500','850–500 hPa lapse rate',(t850-t500)*1000/dz,'°C/km',`${baseMethod} Temperature decrease divided by geopotential-height difference.`);
  if(finite(td850)&&td850<=t850)add('totalTotals','Total Totals index',t850+td850-2*t500,'°C index',`${baseMethod} T850 + Td850 − 2×T500. Diagnostic only; not a severe-weather probability.`);
  const a=windComponents(get('wind-850h'),get('windDir-850h')),b=windComponents(get('wind-500h'),get('windDir-500h'));
  if(a&&b)add('shear850500','850–500 hPa vector shear',Math.hypot(b.u-a.u,b.v-a.v),'m/s',`${baseMethod} Magnitude of upper-minus-lower wind vector. This is not 0–6 km bulk shear.`);
 }
 if(above([850,700,500])&&[t850,t700,t500,td850,td700].every(finite)&&td850<=t850&&td700<=t700)add('kIndex','K index',(t850-t500)+(td850-273.15)-(t700-td700),'°C index',`${baseMethod} (T850 − T500) + Td850 − (T700 − Td700), with temperatures in Celsius.`);
 // Only bracketed crossings from adjacent available levels are reported; no extrapolation.
 for(let i=1;i<profile.length;i++){
  const a=profile[i-1],b=profile[i];
  if(a.belowGround!==false||b.belowGround!==false||![a.t,b.t,a.z,b.z].every(finite)||b.z<=a.z)continue;
  if(a.t>=273.15&&b.t<273.15){add('freezingCrossing','First resolved freezing crossing',a.z+(273.15-a.t)/(b.t-a.t)*(b.z-a.z),'m MSL',`${baseMethod} Linear interpolation between ${a.p} and ${b.p} hPa. Coarse profiles can miss other crossings; not a snow level.`);break;}
 }
 return rows;
}
function windowSummary(data,time,hours=24){
 const end=time+hours*HOUR;
 const list=key=>{const f=fieldFor(data,key);return f?f.ts.flatMap((ts,i)=>ts>=time&&ts<=end&&finite(f.values[i])?[f.values[i]]:[]):[];};
 const temps=list('temperature'),gusts=list('windGust');
 const rain=fieldFor(data,'precipAmount');let rainTotal=0,cursor=time,complete=false;
 if(rain){for(let i=0;i<rain.ts.length-1;i++){const from=rain.ts[i],to=rain.ts[i+1];if(from<time||from>=end)continue;if(from!==cursor||to>end||to-from>3*HOUR||!finite(rain.values[i])||rain.values[i]<0)break;rainTotal+=rain.values[i];cursor=to;}complete=cursor===end;}
 return {low:temps.length?Math.min(...temps):null,high:temps.length?Math.max(...temps):null,maxGust:gusts.length?Math.max(...gusts):null,rain:complete?rainTotal:null,rainComplete:complete};
}
function predictability(data,time){
 const summaries=Array.isArray(data?.summary)?data.summary:Object.values(data?.summary||{});
 const index=data?.ts.indexOf(time)??-1;if(index<0)return null;
 const day=summaries.find(s=>Number.isInteger(s.index)&&Number.isInteger(s.segments)&&index>=s.index&&index<s.index+s.segments);
 const p=day?.predictability;return finite(p)&&p>=0&&p<=100?p:null;
}

/* src\App.svelte generated by Svelte v4.2.20 */

function add_css(target) {
	append_styles(target, "svelte-oh3hkl", ".time-slider.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:block;color:var(--muted);font-size:10px;margin:8px 0}.time-slider.svelte-oh3hkl input.svelte-oh3hkl.svelte-oh3hkl{display:block;width:100%;padding:0;accent-color:var(--mint)}.outlook.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:10px 0}.outlook.svelte-oh3hkl>div.svelte-oh3hkl.svelte-oh3hkl{border:1px solid var(--line);border-radius:6px;padding:8px}.outlook.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl{display:block;font-size:8px}.outlook.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{display:block;font-size:12px;margin:3px 0}.diagnostics.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin:12px 0}.diagnostics.svelte-oh3hkl button.svelte-oh3hkl.svelte-oh3hkl{text-align:left}.diagnostics.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl,.diagnostics.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{display:block}.hodograph.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:block;width:100%;max-width:300px;margin:auto}.hodograph.svelte-oh3hkl text.svelte-oh3hkl.svelte-oh3hkl{fill:#93a8b8;font-size:8px}.weatherscope.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{--bg:#0d1722;--panel:#152330;--line:#293a48;--muted:#93a8b8;--mint:#69ddc3;color:#edf4f8;background:var(--bg);font:13px/1.5 system-ui,-apple-system,Segoe UI,sans-serif;box-sizing:border-box;min-height:100%;padding:16px;width:100%;max-width:780px;margin:auto;color-scheme:dark}.weatherscope.svelte-oh3hkl .svelte-oh3hkl.svelte-oh3hkl{box-sizing:border-box}h1.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl,h2.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl,p.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{margin:0}h1.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{font-size:24px;letter-spacing:-1px;font-weight:650}h1.svelte-oh3hkl span.svelte-oh3hkl.svelte-oh3hkl{font-size:9px;letter-spacing:2px;color:var(--mint);margin-left:10px}h2.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{font-size:14px;font-weight:600}header.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:flex;justify-content:space-between;align-items:center;padding-bottom:12px;border-bottom:1px solid var(--line)}.brand.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:flex;align-items:center;gap:12px}.mark.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{color:var(--mint);font-size:35px}.brand.svelte-oh3hkl p.svelte-oh3hkl.svelte-oh3hkl{font-size:11px;color:var(--muted)}button.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl,select.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl,input.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{font:inherit}button.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{background:#1c2d3b;color:#dce8ee;border:1px solid var(--line);border-radius:6px;padding:6px 10px;cursor:pointer}button.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl:hover{background:#294153;border-color:#688796}button.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl:focus-visible,input.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl:focus-visible,select.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl:focus-visible{outline:2px solid var(--mint);outline-offset:2px}button.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl:disabled{opacity:.5;cursor:wait}button.icon.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{font-size:20px;background:transparent;border:0}.location.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:flex;justify-content:space-between;align-items:center;margin:9px 0}.location.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl,.timebar.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{display:block;font-size:17px;font-weight:500;font-variant-numeric:tabular-nums}small.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{color:var(--muted);font-size:10px}.location.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl,.timebar.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl{letter-spacing:1.5px;font-size:9px}.source.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.source.svelte-oh3hkl label.svelte-oh3hkl.svelte-oh3hkl{color:var(--muted);font-size:11px}.source.svelte-oh3hkl select.svelte-oh3hkl.svelte-oh3hkl{margin-left:7px;color:var(--mint)}select.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl,input.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{background:#111f2b;color:#e5eef3;border:1px solid var(--line);border-radius:5px;padding:7px;max-width:100%}nav.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:flex;border-bottom:1px solid var(--line);gap:5px;margin-bottom:10px}nav.svelte-oh3hkl button.svelte-oh3hkl.svelte-oh3hkl{background:transparent;border:0;border-bottom:2px solid transparent;border-radius:0;padding:8px 9px;color:var(--muted);font-size:12px}nav.svelte-oh3hkl button.active.svelte-oh3hkl.svelte-oh3hkl{color:var(--mint);border-bottom-color:var(--mint)}.timebar.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:flex;justify-content:space-between;align-items:center;gap:8px}.shortcuts.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:flex;gap:3px}.shortcuts.svelte-oh3hkl button.svelte-oh3hkl.svelte-oh3hkl{padding:4px 6px;font-size:10px}.provenance.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:flex;align-items:center;gap:6px;flex-wrap:wrap;color:var(--muted);font-size:10px;margin:6px 0 10px}.provenance.svelte-oh3hkl>span.svelte-oh3hkl.svelte-oh3hkl:last-child{margin-left:auto}.dot.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{height:5px;width:5px;background:var(--mint);border-radius:50%}.briefing.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{border-left:2px solid var(--mint);background:linear-gradient(100deg,#16322e,#13222e);padding:7px 13px;margin-bottom:10px;border-radius:0 7px 7px 0}.briefing.svelte-oh3hkl button.svelte-oh3hkl.svelte-oh3hkl{display:block;text-align:left;background:none;border:0;padding:5px 0;width:100%;font-size:12px}.briefing.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl{display:block;color:var(--mint);font-size:9px;letter-spacing:.6px;text-transform:uppercase}.cards.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.card.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{text-align:left;padding:11px;background:var(--panel);min-width:0}.card.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.card.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{display:block;font-size:20px;font-weight:500;margin:4px 0;font-variant-numeric:tabular-nums}.card.svelte-oh3hkl span.svelte-oh3hkl.svelte-oh3hkl{color:var(--muted);font-size:9px}.section-title.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:flex;justify-content:space-between;align-items:center;gap:6px;margin:12px 0 8px}.section-title.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl{text-align:right}.timeline.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl,.scroll-table.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{overflow:auto;border:1px solid var(--line);border-radius:7px}table.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{border-collapse:collapse;font-size:10px;width:100%;white-space:nowrap}th.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl,td.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{text-align:right;padding:4px 9px;border-bottom:1px solid #233440;font-variant-numeric:tabular-nums}th.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{color:var(--muted);font-weight:500}th.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl:first-child{text-align:left;background:#152330}.timeline.svelte-oh3hkl th.svelte-oh3hkl.svelte-oh3hkl:first-child{position:sticky;left:0;z-index:1;min-width:95px}.timeline.svelte-oh3hkl th button.svelte-oh3hkl.svelte-oh3hkl{font-size:9px;border:0;background:none;padding:1px;min-width:45px}.timeline.svelte-oh3hkl th button.chosen.svelte-oh3hkl.svelte-oh3hkl{color:var(--mint)}.wet.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{background:#183b48;color:#9cdfee}.footnote.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{font-size:10px;color:var(--muted);margin:10px 0;line-height:1.65}footer.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:flex;justify-content:space-between;font-size:8px;letter-spacing:1px;color:#7290a3;border-top:1px solid var(--line);margin-top:20px;padding-top:12px}.notice.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{padding:9px;border:1px solid #67512c;color:#eed4a4;background:#302b21;border-radius:5px;font-size:11px;margin:10px 0}.empty.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{padding:45px 10px;text-align:center;color:var(--muted)}.empty.svelte-oh3hkl h2.svelte-oh3hkl.svelte-oh3hkl{font-size:18px;color:#e5edf3;margin:12px}.error.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{color:#efb3a4}.empty.svelte-oh3hkl button.svelte-oh3hkl.svelte-oh3hkl{margin:14px}.pulse.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:inline-block;width:16px;height:16px;border:2px solid var(--mint);border-radius:50%;animation:svelte-oh3hkl-breathe 1.3s infinite}@keyframes svelte-oh3hkl-breathe{50%{opacity:.25}}.settings.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{background:var(--panel);padding:12px;border-radius:7px;margin-bottom:12px;display:grid;gap:10px}.settings.svelte-oh3hkl label.svelte-oh3hkl.svelte-oh3hkl{display:flex;align-items:center;justify-content:space-between;gap:10px}.settings.svelte-oh3hkl input[type=number].svelte-oh3hkl.svelte-oh3hkl{width:80px}.favorites.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:12px}.favorites.svelte-oh3hkl button.svelte-oh3hkl.svelte-oh3hkl{font-size:10px}.filters.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:flex;gap:7px;margin-top:15px}.filters.svelte-oh3hkl input.svelte-oh3hkl.svelte-oh3hkl{flex:1;min-width:0}.filters.svelte-oh3hkl select.svelte-oh3hkl.svelte-oh3hkl{max-width:150px}.parameter.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:flex;gap:7px;border-bottom:1px solid var(--line);padding:5px 0}.field.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:flex;align-items:center;justify-content:space-between;gap:10px;flex:1;text-align:left;background:none;border:0;padding-left:0;min-width:0}.field.svelte-oh3hkl span.svelte-oh3hkl.svelte-oh3hkl{overflow-wrap:anywhere;font-size:12px}.field.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl{display:block;font-size:9px}.field.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{white-space:nowrap;font-size:12px;font-weight:500}.parameter.svelte-oh3hkl>button.svelte-oh3hkl.svelte-oh3hkl:last-child{background:none;border:0;padding:4px}.pinned.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{color:var(--mint)}.detail.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{background:var(--panel);padding:12px;border-radius:6px;font-size:11px;margin:10px 0}.detail.svelte-oh3hkl p.svelte-oh3hkl.svelte-oh3hkl{margin-top:6px;color:var(--muted)}.close.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{float:right}.coverage.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--line)}.coverage.svelte-oh3hkl>span.svelte-oh3hkl.svelte-oh3hkl{color:#7a8b9a;font-size:16px}.coverage.svelte-oh3hkl>span.available.svelte-oh3hkl.svelte-oh3hkl{color:var(--mint)}.coverage.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{font-size:12px;font-weight:500;display:block}.coverage.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl{display:block}.comparison.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{background:var(--panel);padding:12px;border-radius:7px;margin:10px 0}.comparison.svelte-oh3hkl>div.svelte-oh3hkl.svelte-oh3hkl{display:flex;gap:16px;flex-wrap:wrap;margin:8px 0}.comparison.svelte-oh3hkl span.svelte-oh3hkl.svelte-oh3hkl{font-size:16px}.comparison.svelte-oh3hkl span.svelte-oh3hkl small.svelte-oh3hkl{display:block}.profile.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{background:var(--panel);border-radius:8px;padding:10px;margin-bottom:10px}.profile.svelte-oh3hkl svg.svelte-oh3hkl.svelte-oh3hkl{width:100%;height:auto}.profile.svelte-oh3hkl text.svelte-oh3hkl.svelte-oh3hkl{fill:#92aabc;font-size:9px}.profile.svelte-oh3hkl p.svelte-oh3hkl.svelte-oh3hkl{text-align:center;font-size:10px;color:var(--muted)}.amber.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{color:#f4ba77}.mint.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{color:var(--mint)}details.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{margin-top:14px}summary.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{cursor:pointer;color:var(--muted)}pre.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{max-height:300px;overflow:auto;font-size:10px;background:#101f2c;padding:10px}@media(max-width:440px){.weatherscope.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{padding:14px}h1.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{font-size:22px}h1.svelte-oh3hkl span.svelte-oh3hkl.svelte-oh3hkl{display:none}.card.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{padding:8px}.card.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{font-size:17px}nav.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{gap:0}nav.svelte-oh3hkl button.svelte-oh3hkl.svelte-oh3hkl{padding:8px 7px;font-size:11px}.timebar.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{align-items:flex-start;flex-direction:column}.provenance.svelte-oh3hkl>span.svelte-oh3hkl.svelte-oh3hkl:last-child{margin-left:0}.source.svelte-oh3hkl select.svelte-oh3hkl.svelte-oh3hkl{max-width:165px}}.weatherscope.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{--bg:#0b1720;--panel:#122631;--line:#25404b;--muted:#aec1ca;--mint:#78e4ca;padding:24px;font-size:14px;background:radial-gradient(ellipse at 100% 0,#16373988,transparent 40%),var(--bg)}header.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{padding-bottom:20px;margin-bottom:16px}.mark.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:grid;place-items:center;width:46px;height:46px;border:1px solid #427b73;border-radius:15px;background:#1d494433;font-size:31px}h1.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{font-size:27px;font-weight:750;letter-spacing:-1.2px}h1.svelte-oh3hkl span.svelte-oh3hkl.svelte-oh3hkl{display:block;font-size:9px;letter-spacing:2.4px;margin:3px 0 0}.brand.svelte-oh3hkl p.svelte-oh3hkl.svelte-oh3hkl{display:none}h2.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{font-size:16px}.location.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{margin:18px 0}.location.svelte-oh3hkl h2.svelte-oh3hkl.svelte-oh3hkl{font-size:24px;letter-spacing:-.5px}.location.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{font-size:13px;color:var(--muted)}small.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{font-size:11px}.location.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl,.timebar.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl{font-size:10px;letter-spacing:1.2px}button.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl,select.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl,input.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{border-radius:10px;min-height:40px}button.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{transition:background .15s,border-color .15s}button.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl:hover{background:#23424c}.saved.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{color:var(--mint);border-color:#4c9786;background:#173e36}.source.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{margin:0 0 18px}.source.svelte-oh3hkl label.svelte-oh3hkl.svelte-oh3hkl{font-size:12px}.source.svelte-oh3hkl select.svelte-oh3hkl.svelte-oh3hkl{font-size:13px;padding:9px}.icon.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{min-width:44px}nav.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{position:sticky;top:0;z-index:5;padding:7px;background:#0d1d26f5;border:1px solid var(--line);border-radius:14px;gap:3px;margin:0 0 20px;backdrop-filter:blur(12px)}nav.svelte-oh3hkl button.svelte-oh3hkl.svelte-oh3hkl{flex:1;min-width:0;font-size:12px;padding:9px 4px;border-radius:9px;border:0;font-weight:600}nav.svelte-oh3hkl button.active.svelte-oh3hkl.svelte-oh3hkl{background:var(--mint);color:#092720;box-shadow:0 3px 14px #78e4ca18}.timebar.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{font-size:20px;font-weight:650}.shortcuts.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{gap:4px}.shortcuts.svelte-oh3hkl button.svelte-oh3hkl.svelte-oh3hkl{font-size:11px;padding:5px 8px;min-height:36px}.time-slider.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:flex;flex-wrap:wrap;justify-content:space-between;font-size:11px;margin:14px 0 8px}.time-slider.svelte-oh3hkl input.svelte-oh3hkl.svelte-oh3hkl{flex-basis:100%;height:30px;min-height:30px;cursor:pointer}.time-slider.svelte-oh3hkl span.svelte-oh3hkl.svelte-oh3hkl:last-of-type{opacity:.75}.provenance.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{font-size:10px;padding-bottom:8px}.dot.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{width:6px;height:6px}.forecast-hero.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;background:linear-gradient(125deg,#18443f,#14313b 60%,#192e44);border:1px solid #37665e;border-radius:20px;padding:24px;margin:10px 0 12px;box-shadow:0 14px 30px #0002}.forecast-hero.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl{font-size:10px;letter-spacing:1.2px;color:#b0d5cb}.hero-temperature.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{font-size:clamp(38px,8vw,58px);font-weight:650;line-height:1.2;letter-spacing:-2.5px;margin:8px 0}.forecast-hero.svelte-oh3hkl p.svelte-oh3hkl.svelte-oh3hkl{font-size:12px;color:#bcd1d5}.forecast-hero.svelte-oh3hkl b.svelte-oh3hkl.svelte-oh3hkl{font-weight:550;color:#e5f3ef}.weather-orbit.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{width:110px;height:110px;fill:none;stroke:#79caba30;stroke-width:1}.weather-orbit.svelte-oh3hkl .orbit-accent.svelte-oh3hkl.svelte-oh3hkl{stroke:#8eead1;stroke-width:3}.weather-orbit.svelte-oh3hkl .orbit-point.svelte-oh3hkl.svelte-oh3hkl{fill:#acecde;stroke:#173b38;stroke-width:3}.hero-facts.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:grid;grid-template-columns:repeat(3,1fr);width:100%;gap:12px;border-top:1px solid #83b7aa30;margin-top:20px;padding-top:16px}.hero-facts.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl,.hero-facts.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{display:block}.hero-facts.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{font-size:16px;margin-top:5px;font-weight:600}.outlook.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{gap:8px;margin:12px 0 18px}.outlook.svelte-oh3hkl>div.svelte-oh3hkl.svelte-oh3hkl{padding:12px;background:#11242d;border-radius:12px}.outlook.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl{font-size:10px;line-height:1.5}.outlook.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{font-size:15px;margin:8px 0}.briefing.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{border:1px solid #2c534d;border-left:3px solid var(--mint);border-radius:12px;padding:10px 14px;margin:0 0 18px;background:#12302b66}.briefing.svelte-oh3hkl button.svelte-oh3hkl.svelte-oh3hkl{font-size:13px;padding:8px 0}.briefing.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl{font-size:10px;margin-bottom:3px}.cards.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{gap:10px}.card.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{padding:15px;border-radius:13px;background:linear-gradient(135deg,#18313c,#12232e)}.card.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl{font-size:12px}.card.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{font-size:23px;margin:10px 0 6px;letter-spacing:-.6px}.card.svelte-oh3hkl span.svelte-oh3hkl.svelte-oh3hkl{font-size:10px}.section-title.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{margin:24px 0 12px}.section-title.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl{font-size:11px}.trend.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{background:#10232d;border:1px solid var(--line);border-radius:14px;padding:14px}.trend.svelte-oh3hkl svg.svelte-oh3hkl.svelte-oh3hkl{width:100%;display:block;color:#29434e}.trend.svelte-oh3hkl svg.svelte-oh3hkl text.svelte-oh3hkl{fill:#a6bec8;font-size:10px}.trend.svelte-oh3hkl>small.svelte-oh3hkl.svelte-oh3hkl{font-size:10px;display:block;margin-top:8px;color:var(--muted)}.trend-legend.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{display:flex;justify-content:space-between;gap:8px;font-size:10px;color:var(--muted)}.trend-legend.svelte-oh3hkl b.svelte-oh3hkl.svelte-oh3hkl{display:block;font-size:12px;color:#dfedf0;font-weight:500;margin:5px 0}.trend-legend.svelte-oh3hkl i.svelte-oh3hkl.svelte-oh3hkl{display:inline-block;width:7px;height:7px;background:var(--mint);border-radius:50%;margin-right:5px}.trend-legend.svelte-oh3hkl span:last-child i.svelte-oh3hkl.svelte-oh3hkl{background:#78baff}.timeline.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl,.scroll-table.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{border-radius:12px}th.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl,td.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{padding:10px;font-size:11px}.timeline.svelte-oh3hkl th button.svelte-oh3hkl.svelte-oh3hkl{font-size:11px;min-width:52px;min-height:44px}.timeline.svelte-oh3hkl th button.chosen.svelte-oh3hkl.svelte-oh3hkl{background:#28504a;border-radius:8px}.timeline.svelte-oh3hkl th.svelte-oh3hkl.svelte-oh3hkl:first-child{min-width:98px}.diagnostics.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{gap:10px}.diagnostics.svelte-oh3hkl button.svelte-oh3hkl.svelte-oh3hkl{padding:15px;border-radius:13px;background:var(--panel)}.diagnostics.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl{font-size:11px}.diagnostics.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{font-size:20px;margin:7px 0;color:#dfefea}.profile.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{padding:16px;border:1px solid var(--line);border-radius:14px}.profile.svelte-oh3hkl p.svelte-oh3hkl.svelte-oh3hkl,.footnote.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{font-size:11px}.comparison.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{padding:18px;border:1px solid var(--line);border-radius:14px}.comparison.svelte-oh3hkl>div.svelte-oh3hkl.svelte-oh3hkl{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:14px 0}.comparison.svelte-oh3hkl span.svelte-oh3hkl.svelte-oh3hkl{font-size:19px;letter-spacing:-.5px}.comparison.svelte-oh3hkl span.svelte-oh3hkl small.svelte-oh3hkl{font-size:10px;letter-spacing:0;margin-bottom:5px}.filters.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{flex-wrap:wrap}.filters.svelte-oh3hkl input.svelte-oh3hkl.svelte-oh3hkl{min-height:46px;font-size:13px}.field.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{padding:10px 0;min-height:56px}.field.svelte-oh3hkl span.svelte-oh3hkl.svelte-oh3hkl,.field.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{font-size:13px}.field.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl{font-size:10px;margin-top:4px}.parameter.svelte-oh3hkl>button.svelte-oh3hkl.svelte-oh3hkl:last-child{min-width:42px;font-size:22px}.coverage.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{padding:15px 0}.coverage.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{font-size:14px}.coverage.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl{font-size:11px;margin-top:4px}.notice.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{font-size:10px;border-radius:9px;padding:10px 12px}.detail.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{border:1px solid #498b7d;border-radius:12px;padding:16px}.favorites.svelte-oh3hkl button.svelte-oh3hkl.svelte-oh3hkl{font-size:12px}.settings.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{border:1px solid var(--line);padding:16px;gap:14px}.settings.svelte-oh3hkl label.svelte-oh3hkl.svelte-oh3hkl{font-size:13px}footer.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{font-size:9px;letter-spacing:.6px;gap:12px}.empty.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{min-height:230px}@media(max-width:440px){.weatherscope.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{padding:16px}h1.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{font-size:24px}h1.svelte-oh3hkl span.svelte-oh3hkl.svelte-oh3hkl{display:block;font-size:8px}.brand.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{gap:10px}.mark.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{width:39px;height:39px;font-size:27px}.timebar.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{flex-direction:row;align-items:center;flex-wrap:wrap}.timebar.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{font-size:17px}.shortcuts.svelte-oh3hkl button.svelte-oh3hkl.svelte-oh3hkl{padding:5px 7px}nav.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{gap:0;padding:5px}nav.svelte-oh3hkl button.svelte-oh3hkl.svelte-oh3hkl{font-size:11px;padding:8px 3px}.forecast-hero.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{padding:19px}.weather-orbit.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{width:86px;height:86px}.hero-temperature.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{font-size:44px}.hero-facts.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{gap:7px}.hero-facts.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{font-size:14px}.hero-facts.svelte-oh3hkl small.svelte-oh3hkl.svelte-oh3hkl{font-size:9px}.cards.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{grid-template-columns:repeat(2,minmax(0,1fr))}.card.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{font-size:23px}.outlook.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{grid-template-columns:1fr 1fr}.outlook.svelte-oh3hkl>div.svelte-oh3hkl.svelte-oh3hkl:last-child{grid-column:1/-1;display:grid;grid-template-columns:1fr auto;align-items:center;gap:0 8px}.outlook.svelte-oh3hkl>div.svelte-oh3hkl:last-child small.svelte-oh3hkl:last-child{grid-column:1/-1}.outlook.svelte-oh3hkl strong.svelte-oh3hkl.svelte-oh3hkl{font-size:14px}.comparison.svelte-oh3hkl>div.svelte-oh3hkl.svelte-oh3hkl{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.source.svelte-oh3hkl select.svelte-oh3hkl.svelte-oh3hkl{max-width:160px}.location.svelte-oh3hkl h2.svelte-oh3hkl.svelte-oh3hkl{font-size:22px}.location.svelte-oh3hkl button.svelte-oh3hkl.svelte-oh3hkl{font-size:12px}}@media(prefers-reduced-motion:reduce){button.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{transition:none}.pulse.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{animation:none}}header.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{padding-bottom:14px;margin-bottom:10px}.location.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{margin:12px 0}.source.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{margin-bottom:12px}.forecast-hero.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{margin:12px 0 18px}.notice.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{padding:7px 10px}.weatherscope.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{padding-top:18px}.hero-temperature.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{margin:5px 0}.hero-facts.svelte-oh3hkl.svelte-oh3hkl.svelte-oh3hkl{margin-top:14px;padding-top:12px}");
}

function get_each_context_19(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[139] = list[i];
	return child_ctx;
}

function get_each_context_17(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[104] = list[i];
	return child_ctx;
}

function get_each_context_18(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[136] = list[i];
	return child_ctx;
}

function get_each_context_14(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[125] = list[i];
	return child_ctx;
}

function get_each_context_15(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[88] = list[i];
	const constants_0 = compare([/*data*/ child_ctx[6], .../*comparisons*/ child_ctx[26]], /*key*/ child_ctx[88], /*valid*/ child_ctx[14]);
	child_ctx[128] = constants_0;
	return child_ctx;
}

function get_each_context_16(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[131] = list[i];
	return child_ctx;
}

function get_each_context_7(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[110] = list[i];
	return child_ctx;
}

function get_each_context_8(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[97] = list[i];
	return child_ctx;
}

function get_each_context_9(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[110] = list[i];
	return child_ctx;
}

function get_each_context_10(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[88] = list[i];
	return child_ctx;
}

function get_each_context_11(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[91] = list[i];
	return child_ctx;
}

function get_each_context_12(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[110] = list[i];
	return child_ctx;
}

function get_each_context_13(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[104] = list[i];
	return child_ctx;
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[88] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[91] = list[i];
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[91] = list[i];
	return child_ctx;
}

function get_each_context_3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[91] = list[i];
	child_ctx[100] = i;
	const constants_0 = value(/*data*/ child_ctx[6], 'temperature', /*t*/ child_ctx[91]);
	child_ctx[96] = constants_0;
	const constants_1 = value(/*data*/ child_ctx[6], 'precipAmount', /*t*/ child_ctx[91]);
	child_ctx[97] = constants_1;
	const constants_2 = 18 + /*i*/ child_ctx[100] / Math.max(1, /*slots*/ child_ctx[16].length - 1) * 524;
	child_ctx[98] = constants_2;
	return child_ctx;
}

function get_each_context_4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[101] = list[i];
	return child_ctx;
}

function get_each_context_5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[104] = list[i];
	return child_ctx;
}

function get_each_context_6(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[107] = list[i];
	return child_ctx;
}

function get_each_context_20(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[142] = list[i];
	return child_ctx;
}

function get_each_context_21(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[145] = list[i];
	return child_ctx;
}

function get_each_context_22(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[88] = list[i][0];
	child_ctx[148] = list[i][1];
	return child_ctx;
}

function get_each_context_23(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[151] = list[i];
	return child_ctx;
}

// (54:1) {#if demo}
function create_if_block_24(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = "DESIGN PREVIEW · Synthetic sample data, not a weather forecast";
			attr(div, "class", "notice svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

// (55:62) {#if placeName}
function create_if_block_23(ctx) {
	let h2;
	let t_1;

	return {
		c() {
			h2 = element("h2");
			t_1 = text(/*placeName*/ ctx[4]);
			attr(h2, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, h2, anchor);
			append(h2, t_1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*placeName*/ 16) set_data(t_1, /*placeName*/ ctx[4]);
		},
		d(detaching) {
			if (detaching) {
				detach(h2);
			}
		}
	};
}

// (56:1) {#if favorites.length}
function create_if_block_22(ctx) {
	let div;
	let each_value_23 = ensure_array_like(/*favorites*/ ctx[12]);
	let each_blocks = [];

	for (let i = 0; i < each_value_23.length; i += 1) {
		each_blocks[i] = create_each_block_23(get_each_context_23(ctx, each_value_23, i));
	}

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div, "class", "favorites svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div, null);
				}
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*onLocation, favorites*/ 4098) {
				each_value_23 = ensure_array_like(/*favorites*/ ctx[12]);
				let i;

				for (i = 0; i < each_value_23.length; i += 1) {
					const child_ctx = get_each_context_23(ctx, each_value_23, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_23(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_23.length;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}

			destroy_each(each_blocks, detaching);
		}
	};
}

// (56:46) {#each favorites as place}
function create_each_block_23(ctx) {
	let button;
	let t_1_value = (/*place*/ ctx[151].name || `${/*place*/ ctx[151].lat.toFixed(2)}, ${/*place*/ ctx[151].lon.toFixed(2)}`) + "";
	let t_1;
	let mounted;
	let dispose;

	function click_handler_1() {
		return /*click_handler_1*/ ctx[64](/*place*/ ctx[151]);
	}

	return {
		c() {
			button = element("button");
			t_1 = text(t_1_value);
			attr(button, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, t_1);

			if (!mounted) {
				dispose = listen(button, "click", click_handler_1);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*favorites*/ 4096 && t_1_value !== (t_1_value = (/*place*/ ctx[151].name || `${/*place*/ ctx[151].lat.toFixed(2)}, ${/*place*/ ctx[151].lon.toFixed(2)}`) + "")) set_data(t_1, t_1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(button);
			}

			mounted = false;
			dispose();
		}
	};
}

// (57:109) {#each Object.entries(MODELS) as [key,label]}
function create_each_block_22(ctx) {
	let option;
	let t0_value = /*label*/ ctx[148] + "";
	let t0;
	let t1_value = (/*key*/ ctx[88] === 'mblue' ? ' · default' : '') + "";
	let t1;

	return {
		c() {
			option = element("option");
			t0 = text(t0_value);
			t1 = text(t1_value);
			option.__value = /*key*/ ctx[88];
			set_input_value(option, option.__value);
			attr(option, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t0);
			append(option, t1);
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(option);
			}
		}
	};
}

// (58:1) {#if data&&!busy&&view==='Brief'}
function create_if_block_21(ctx) {
	let div6;
	let div1;
	let small0;
	let t0_value = timeLabel(/*valid*/ ctx[14], /*prefs*/ ctx[10].local) + "";
	let t0;
	let t1;
	let t2_value = (/*prefs*/ ctx[10].local ? 'LOCAL' : 'UTC') + "";
	let t2;
	let div0;
	let p_1;
	let t4;
	let b;
	let t6;
	let svg;
	let circle0;
	let circle1;
	let path0;
	let path1;
	let circle2;
	let t7;
	let div5;
	let div2;
	let small1;
	let strong0;
	let div3;
	let small2;
	let strong1;
	let div4;
	let small3;
	let strong2;

	return {
		c() {
			div6 = element("div");
			div1 = element("div");
			small0 = element("small");
			t0 = text(t0_value);
			t1 = text(" · ");
			t2 = text(t2_value);
			div0 = element("div");
			div0.textContent = `${/*show*/ ctx[53]('temperature')}`;
			p_1 = element("p");
			t4 = text("Dew point ");
			b = element("b");
			b.textContent = `${/*show*/ ctx[53]('dewPoint')}`;
			t6 = space();
			svg = svg_element("svg");
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			path0 = svg_element("path");
			path1 = svg_element("path");
			circle2 = svg_element("circle");
			t7 = space();
			div5 = element("div");
			div2 = element("div");
			small1 = element("small");
			small1.textContent = "WIND";
			strong0 = element("strong");
			strong0.textContent = `${/*show*/ ctx[53]('wind')}`;
			div3 = element("div");
			small2 = element("small");
			small2.textContent = "GUSTS";
			strong1 = element("strong");
			strong1.textContent = `${/*show*/ ctx[53]('windGust')}`;
			div4 = element("div");
			small3 = element("small");
			small3.textContent = "PRECIPITATION";
			strong2 = element("strong");
			strong2.textContent = `${/*show*/ ctx[53]('precipAmount')}`;
			attr(small0, "class", "svelte-oh3hkl");
			attr(div0, "class", "hero-temperature svelte-oh3hkl");
			attr(b, "class", "svelte-oh3hkl");
			attr(p_1, "class", "svelte-oh3hkl");
			attr(div1, "class", "svelte-oh3hkl");
			attr(circle0, "cx", "60");
			attr(circle0, "cy", "60");
			attr(circle0, "r", "49");
			attr(circle0, "class", "svelte-oh3hkl");
			attr(circle1, "cx", "60");
			attr(circle1, "cy", "60");
			attr(circle1, "r", "34");
			attr(circle1, "class", "svelte-oh3hkl");
			attr(path0, "d", "M11 60H109M60 11V109");
			attr(path0, "class", "svelte-oh3hkl");
			attr(path1, "class", "orbit-accent svelte-oh3hkl");
			attr(path1, "d", "M16 76C32 76 34 37 54 37S78 89 104 47");
			attr(circle2, "class", "orbit-point svelte-oh3hkl");
			attr(circle2, "cx", "54");
			attr(circle2, "cy", "37");
			attr(circle2, "r", "5");
			attr(svg, "class", "weather-orbit svelte-oh3hkl");
			attr(svg, "viewBox", "0 0 120 120");
			attr(svg, "aria-hidden", "true");
			attr(small1, "class", "svelte-oh3hkl");
			attr(strong0, "class", "svelte-oh3hkl");
			attr(div2, "class", "svelte-oh3hkl");
			attr(small2, "class", "svelte-oh3hkl");
			attr(strong1, "class", "svelte-oh3hkl");
			attr(div3, "class", "svelte-oh3hkl");
			attr(small3, "class", "svelte-oh3hkl");
			attr(strong2, "class", "svelte-oh3hkl");
			attr(div4, "class", "svelte-oh3hkl");
			attr(div5, "class", "hero-facts svelte-oh3hkl");
			attr(div6, "class", "forecast-hero svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div6, anchor);
			append(div6, div1);
			append(div1, small0);
			append(small0, t0);
			append(small0, t1);
			append(small0, t2);
			append(div1, div0);
			append(div1, p_1);
			append(p_1, t4);
			append(p_1, b);
			append(div6, t6);
			append(div6, svg);
			append(svg, circle0);
			append(svg, circle1);
			append(svg, path0);
			append(svg, path1);
			append(svg, circle2);
			append(div6, t7);
			append(div6, div5);
			append(div5, div2);
			append(div2, small1);
			append(div2, strong0);
			append(div5, div3);
			append(div3, small2);
			append(div3, strong1);
			append(div5, div4);
			append(div4, small3);
			append(div4, strong2);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*valid, prefs*/ 17408 && t0_value !== (t0_value = timeLabel(/*valid*/ ctx[14], /*prefs*/ ctx[10].local) + "")) set_data(t0, t0_value);
			if (dirty[0] & /*prefs*/ 1024 && t2_value !== (t2_value = (/*prefs*/ ctx[10].local ? 'LOCAL' : 'UTC') + "")) set_data(t2, t2_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div6);
			}
		}
	};
}

// (64:1) {#if settings}
function create_if_block_20(ctx) {
	let div;
	let h2;
	let label0;
	let t1;
	let select0;
	let option0;
	let option1;
	let label1;
	let t4;
	let select1;
	let option2;
	let option3;
	let label2;
	let input0;
	let t7;
	let label3;
	let t8;
	let input1;
	let label4;
	let t9;
	let input2;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			h2 = element("h2");
			h2.textContent = "Display preferences";
			label0 = element("label");
			t1 = text("Temperature ");
			select0 = element("select");
			option0 = element("option");
			option0.textContent = "°C";
			option1 = element("option");
			option1.textContent = "°F";
			label1 = element("label");
			t4 = text("Wind ");
			select1 = element("select");
			option2 = element("option");
			option2.textContent = "Knots";
			option3 = element("option");
			option3.textContent = "m/s";
			label2 = element("label");
			input0 = element("input");
			t7 = text(" Use this device’s timezone");
			label3 = element("label");
			t8 = text("Gust signal (m/s) ");
			input1 = element("input");
			label4 = element("label");
			t9 = text("Wet interval (mm/step) ");
			input2 = element("input");
			attr(h2, "class", "svelte-oh3hkl");
			option0.__value = "C";
			set_input_value(option0, option0.__value);
			attr(option0, "class", "svelte-oh3hkl");
			option1.__value = "F";
			set_input_value(option1, option1.__value);
			attr(option1, "class", "svelte-oh3hkl");
			attr(select0, "class", "svelte-oh3hkl");
			if (/*prefs*/ ctx[10].temp === void 0) add_render_callback(() => /*select0_change_handler*/ ctx[67].call(select0));
			attr(label0, "class", "svelte-oh3hkl");
			option2.__value = "kt";
			set_input_value(option2, option2.__value);
			attr(option2, "class", "svelte-oh3hkl");
			option3.__value = "ms";
			set_input_value(option3, option3.__value);
			attr(option3, "class", "svelte-oh3hkl");
			attr(select1, "class", "svelte-oh3hkl");
			if (/*prefs*/ ctx[10].wind === void 0) add_render_callback(() => /*select1_change_handler*/ ctx[68].call(select1));
			attr(label1, "class", "svelte-oh3hkl");
			attr(input0, "type", "checkbox");
			attr(input0, "class", "svelte-oh3hkl");
			attr(label2, "class", "svelte-oh3hkl");
			attr(input1, "type", "number");
			attr(input1, "min", "1");
			attr(input1, "max", "100");
			attr(input1, "class", "svelte-oh3hkl");
			attr(label3, "class", "svelte-oh3hkl");
			attr(input2, "type", "number");
			attr(input2, "min", "0.1");
			attr(input2, "max", "100");
			attr(input2, "step", "0.1");
			attr(input2, "class", "svelte-oh3hkl");
			attr(label4, "class", "svelte-oh3hkl");
			attr(div, "class", "settings svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, h2);
			append(div, label0);
			append(label0, t1);
			append(label0, select0);
			append(select0, option0);
			append(select0, option1);
			select_option(select0, /*prefs*/ ctx[10].temp, true);
			append(div, label1);
			append(label1, t4);
			append(label1, select1);
			append(select1, option2);
			append(select1, option3);
			select_option(select1, /*prefs*/ ctx[10].wind, true);
			append(div, label2);
			append(label2, input0);
			input0.checked = /*prefs*/ ctx[10].local;
			append(label2, t7);
			append(div, label3);
			append(label3, t8);
			append(label3, input1);
			set_input_value(input1, /*thresholds*/ ctx[13].gust);
			append(div, label4);
			append(label4, t9);
			append(label4, input2);
			set_input_value(input2, /*thresholds*/ ctx[13].rain);

			if (!mounted) {
				dispose = [
					listen(select0, "change", /*select0_change_handler*/ ctx[67]),
					listen(select0, "change", /*save*/ ctx[43]),
					listen(select1, "change", /*select1_change_handler*/ ctx[68]),
					listen(select1, "change", /*save*/ ctx[43]),
					listen(input0, "change", /*input0_change_handler*/ ctx[69]),
					listen(input0, "change", /*save*/ ctx[43]),
					listen(input1, "input", /*input1_input_handler*/ ctx[70]),
					listen(input1, "change", /*save*/ ctx[43]),
					listen(input2, "input", /*input2_input_handler*/ ctx[71]),
					listen(input2, "change", /*save*/ ctx[43])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*prefs*/ 1024) {
				select_option(select0, /*prefs*/ ctx[10].temp);
			}

			if (dirty[0] & /*prefs*/ 1024) {
				select_option(select1, /*prefs*/ ctx[10].wind);
			}

			if (dirty[0] & /*prefs*/ 1024) {
				input0.checked = /*prefs*/ ctx[10].local;
			}

			if (dirty[0] & /*thresholds*/ 8192 && to_number(input1.value) !== /*thresholds*/ ctx[13].gust) {
				set_input_value(input1, /*thresholds*/ ctx[13].gust);
			}

			if (dirty[0] & /*thresholds*/ 8192 && to_number(input2.value) !== /*thresholds*/ ctx[13].rain) {
				set_input_value(input2, /*thresholds*/ ctx[13].rain);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}

			mounted = false;
			run_all(dispose);
		}
	};
}

// (65:35) {#each ['Brief','Profile','Compare','Parameters','Coverage'] as name}
function create_each_block_21(ctx) {
	let button;
	let t_1;
	let button_aria_pressed_value;
	let mounted;
	let dispose;

	function click_handler_3() {
		return /*click_handler_3*/ ctx[72](/*name*/ ctx[145]);
	}

	return {
		c() {
			button = element("button");
			t_1 = text(/*name*/ ctx[145]);
			attr(button, "aria-pressed", button_aria_pressed_value = /*view*/ ctx[23] === /*name*/ ctx[145]);
			attr(button, "class", "svelte-oh3hkl");
			toggle_class(button, "active", /*view*/ ctx[23] === /*name*/ ctx[145]);
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, t_1);

			if (!mounted) {
				dispose = listen(button, "click", click_handler_3);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[0] & /*view*/ 8388608 && button_aria_pressed_value !== (button_aria_pressed_value = /*view*/ ctx[23] === /*name*/ ctx[145])) {
				attr(button, "aria-pressed", button_aria_pressed_value);
			}

			if (dirty[0] & /*view*/ 8388608) {
				toggle_class(button, "active", /*view*/ ctx[23] === /*name*/ ctx[145]);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(button);
			}

			mounted = false;
			dispose();
		}
	};
}

// (114:1) {:else}
function create_else_block_2(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.innerHTML = `<h2 class="svelte-oh3hkl">Select a location</h2><p class="svelte-oh3hkl">Click the map to load a Meteoblue briefing.</p>`;
			attr(div, "class", "empty svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

// (68:16) 
function create_if_block_2(ctx) {
	let div2;
	let div0;
	let small;
	let t0;
	let t1_value = (/*prefs*/ ctx[10].local ? 'DEVICE LOCAL' : 'UTC') + "";
	let t1;
	let strong;
	let t2_value = timeLabel(/*valid*/ ctx[14], /*prefs*/ ctx[10].local) + "";
	let t2;
	let div1;
	let t3;
	let t4;
	let label_1;
	let span0;
	let span1;
	let input;
	let input_max_value;
	let input_value_value;
	let t7;
	let div3;
	let span2;
	let t8;
	let t9;
	let t10_value = new Set(/*data*/ ctx[6].fields.map(func)).size + "";
	let t10;
	let t11;
	let span3;

	let t12_value = (/*data*/ ctx[6].header.refTime
	? 'Run ' + timeLabel(Date.parse(/*data*/ ctx[6].header.refTime), false) + ' UTC'
	: 'Run time not supplied') + "";

	let t12;
	let t13;
	let t14;
	let t15;
	let t16;
	let t17;
	let footer;
	let span4;
	let span5;
	let t19;
	let t20_value = (/*demo*/ ctx[2] ? 'Preview' : 'Windy') + "";
	let t20;
	let mounted;
	let dispose;
	let each_value_20 = ensure_array_like([0, 6, 12, 24]);
	let each_blocks = [];

	for (let i = 0; i < 4; i += 1) {
		each_blocks[i] = create_each_block_20(get_each_context_20(ctx, each_value_20, i));
	}

	let if_block0 = /*index*/ ctx[20] < 0 && create_if_block_19();
	let if_block1 = /*mapModel*/ ctx[3] && /*mapModel*/ ctx[3] !== /*data*/ ctx[6].model && create_if_block_18(ctx);
	let if_block2 = /*data*/ ctx[6].model !== /*model*/ ctx[5] && create_if_block_17(ctx);
	let if_block3 = /*data*/ ctx[6].header.merged && create_if_block_16(ctx);

	function select_block_type_1(ctx, dirty) {
		if (/*view*/ ctx[23] === 'Brief') return create_if_block_3;
		if (/*view*/ ctx[23] === 'Profile') return create_if_block_9;
		if (/*view*/ ctx[23] === 'Compare') return create_if_block_12;
		if (/*view*/ ctx[23] === 'Parameters') return create_if_block_13;
		if (/*view*/ ctx[23] === 'Coverage') return create_if_block_15;
	}

	let current_block_type = select_block_type_1(ctx);
	let if_block4 = current_block_type && current_block_type(ctx);

	return {
		c() {
			div2 = element("div");
			div0 = element("div");
			small = element("small");
			t0 = text("VALID TIME · ");
			t1 = text(t1_value);
			strong = element("strong");
			t2 = text(t2_value);
			div1 = element("div");

			for (let i = 0; i < 4; i += 1) {
				each_blocks[i].c();
			}

			t3 = space();
			if (if_block0) if_block0.c();
			t4 = space();
			label_1 = element("label");
			span0 = element("span");
			span0.textContent = "Explore forecast";
			span1 = element("span");
			span1.textContent = "Drag to change time";
			input = element("input");
			t7 = space();
			div3 = element("div");
			span2 = element("span");
			t8 = text(/*served*/ ctx[38]);
			t9 = text(" forecast · ");
			t10 = text(t10_value);
			t11 = text(" distinct fields");
			span3 = element("span");
			t12 = text(t12_value);
			t13 = space();
			if (if_block1) if_block1.c();
			t14 = space();
			if (if_block2) if_block2.c();
			t15 = space();
			if (if_block3) if_block3.c();
			t16 = space();
			if (if_block4) if_block4.c();
			t17 = space();
			footer = element("footer");
			span4 = element("span");
			span4.textContent = "METEOROLOGICAL WORKSPACE";
			span5 = element("span");
			t19 = text("WeatherScope 0.3 · ");
			t20 = text(t20_value);
			attr(small, "class", "svelte-oh3hkl");
			attr(strong, "class", "svelte-oh3hkl");
			attr(div0, "class", "svelte-oh3hkl");
			attr(div1, "class", "shortcuts svelte-oh3hkl");
			attr(div2, "class", "timebar svelte-oh3hkl");
			attr(span0, "class", "svelte-oh3hkl");
			attr(span1, "class", "svelte-oh3hkl");
			attr(input, "aria-label", "Forecast time");
			attr(input, "type", "range");
			attr(input, "min", "0");
			attr(input, "max", input_max_value = /*data*/ ctx[6].ts.length - 1);
			input.value = input_value_value = Math.max(0, /*index*/ ctx[20]);
			attr(input, "class", "svelte-oh3hkl");
			attr(label_1, "class", "time-slider svelte-oh3hkl");
			attr(span2, "class", "dot svelte-oh3hkl");
			attr(span3, "class", "svelte-oh3hkl");
			attr(div3, "class", "provenance svelte-oh3hkl");
			attr(span4, "class", "svelte-oh3hkl");
			attr(span5, "class", "svelte-oh3hkl");
			attr(footer, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div0);
			append(div0, small);
			append(small, t0);
			append(small, t1);
			append(div0, strong);
			append(strong, t2);
			append(div2, div1);

			for (let i = 0; i < 4; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div1, null);
				}
			}

			insert(target, t3, anchor);
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t4, anchor);
			insert(target, label_1, anchor);
			append(label_1, span0);
			append(label_1, span1);
			append(label_1, input);
			insert(target, t7, anchor);
			insert(target, div3, anchor);
			append(div3, span2);
			append(div3, t8);
			append(div3, t9);
			append(div3, t10);
			append(div3, t11);
			append(div3, span3);
			append(span3, t12);
			insert(target, t13, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, t14, anchor);
			if (if_block2) if_block2.m(target, anchor);
			insert(target, t15, anchor);
			if (if_block3) if_block3.m(target, anchor);
			insert(target, t16, anchor);
			if (if_block4) if_block4.m(target, anchor);
			insert(target, t17, anchor);
			insert(target, footer, anchor);
			append(footer, span4);
			append(footer, span5);
			append(span5, t19);
			append(span5, t20);

			if (!mounted) {
				dispose = listen(input, "input", /*input_handler*/ ctx[75]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*prefs*/ 1024 && t1_value !== (t1_value = (/*prefs*/ ctx[10].local ? 'DEVICE LOCAL' : 'UTC') + "")) set_data(t1, t1_value);
			if (dirty[0] & /*valid, prefs*/ 17408 && t2_value !== (t2_value = timeLabel(/*valid*/ ctx[14], /*prefs*/ ctx[10].local) + "")) set_data(t2, t2_value);

			if (dirty[1] & /*shortcut*/ 131072) {
				each_value_20 = ensure_array_like([0, 6, 12, 24]);
				let i;

				for (i = 0; i < 4; i += 1) {
					const child_ctx = get_each_context_20(ctx, each_value_20, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_20(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div1, null);
					}
				}

				for (; i < 4; i += 1) {
					each_blocks[i].d(1);
				}
			}

			if (/*index*/ ctx[20] < 0) {
				if (if_block0) ; else {
					if_block0 = create_if_block_19();
					if_block0.c();
					if_block0.m(t4.parentNode, t4);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty[0] & /*data*/ 64 && input_max_value !== (input_max_value = /*data*/ ctx[6].ts.length - 1)) {
				attr(input, "max", input_max_value);
			}

			if (dirty[0] & /*index*/ 1048576 && input_value_value !== (input_value_value = Math.max(0, /*index*/ ctx[20]))) {
				input.value = input_value_value;
			}

			if (dirty[1] & /*served*/ 128) set_data(t8, /*served*/ ctx[38]);
			if (dirty[0] & /*data*/ 64 && t10_value !== (t10_value = new Set(/*data*/ ctx[6].fields.map(func)).size + "")) set_data(t10, t10_value);

			if (dirty[0] & /*data*/ 64 && t12_value !== (t12_value = (/*data*/ ctx[6].header.refTime
			? 'Run ' + timeLabel(Date.parse(/*data*/ ctx[6].header.refTime), false) + ' UTC'
			: 'Run time not supplied') + "")) set_data(t12, t12_value);

			if (/*mapModel*/ ctx[3] && /*mapModel*/ ctx[3] !== /*data*/ ctx[6].model) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_18(ctx);
					if_block1.c();
					if_block1.m(t14.parentNode, t14);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*data*/ ctx[6].model !== /*model*/ ctx[5]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_17(ctx);
					if_block2.c();
					if_block2.m(t15.parentNode, t15);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (/*data*/ ctx[6].header.merged) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block_16(ctx);
					if_block3.c();
					if_block3.m(t16.parentNode, t16);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block4) {
				if_block4.p(ctx, dirty);
			} else {
				if (if_block4) if_block4.d(1);
				if_block4 = current_block_type && current_block_type(ctx);

				if (if_block4) {
					if_block4.c();
					if_block4.m(t17.parentNode, t17);
				}
			}

			if (dirty[0] & /*demo*/ 4 && t20_value !== (t20_value = (/*demo*/ ctx[2] ? 'Preview' : 'Windy') + "")) set_data(t20, t20_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div2);
				detach(t3);
				detach(t4);
				detach(label_1);
				detach(t7);
				detach(div3);
				detach(t13);
				detach(t14);
				detach(t15);
				detach(t16);
				detach(t17);
				detach(footer);
			}

			destroy_each(each_blocks, detaching);
			if (if_block0) if_block0.d(detaching);
			if (if_block1) if_block1.d(detaching);
			if (if_block2) if_block2.d(detaching);
			if (if_block3) if_block3.d(detaching);

			if (if_block4) {
				if_block4.d(detaching);
			}

			mounted = false;
			dispose();
		}
	};
}

// (67:17) 
function create_if_block_1(ctx) {
	let div;
	let h2;
	let p0;
	let t1;
	let button;
	let p1;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			h2 = element("h2");
			h2.textContent = "Forecast unavailable";
			p0 = element("p");
			t1 = text(/*error*/ ctx[22]);
			button = element("button");
			button.textContent = "Try again";
			p1 = element("p");
			p1.textContent = "No other model has been substituted.";
			attr(h2, "class", "svelte-oh3hkl");
			attr(p0, "class", "svelte-oh3hkl");
			attr(button, "class", "svelte-oh3hkl");
			attr(p1, "class", "svelte-oh3hkl");
			attr(div, "class", "empty error svelte-oh3hkl");
			attr(div, "role", "alert");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, h2);
			append(div, p0);
			append(p0, t1);
			append(div, button);
			append(div, p1);

			if (!mounted) {
				dispose = listen(button, "click", /*click_handler_4*/ ctx[73]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*error*/ 4194304) set_data(t1, /*error*/ ctx[22]);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}

			mounted = false;
			dispose();
		}
	};
}

// (66:1) {#if busy}
function create_if_block(ctx) {
	let div;
	let span;
	let h2;
	let p_1;
	let t1;
	let t2_value = MODELS[/*model*/ ctx[5]] + "";
	let t2;
	let t3;

	return {
		c() {
			div = element("div");
			span = element("span");
			h2 = element("h2");
			h2.textContent = "Reading the atmosphere";
			p_1 = element("p");
			t1 = text("Loading ");
			t2 = text(t2_value);
			t3 = text(" forecast and profile fields…");
			attr(span, "class", "pulse svelte-oh3hkl");
			attr(h2, "class", "svelte-oh3hkl");
			attr(p_1, "class", "svelte-oh3hkl");
			attr(div, "class", "empty svelte-oh3hkl");
			attr(div, "role", "status");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, span);
			append(div, h2);
			append(div, p_1);
			append(p_1, t1);
			append(p_1, t2);
			append(p_1, t3);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*model*/ 32 && t2_value !== (t2_value = MODELS[/*model*/ ctx[5]] + "")) set_data(t2, t2_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

// (69:165) {#each [0,6,12,24] as h}
function create_each_block_20(ctx) {
	let button;
	let mounted;
	let dispose;

	function click_handler_5() {
		return /*click_handler_5*/ ctx[74](/*h*/ ctx[142]);
	}

	return {
		c() {
			button = element("button");
			button.textContent = `${/*h*/ ctx[142] ? '+' + /*h*/ ctx[142] + 'h' : 'Now'}`;
			attr(button, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (!mounted) {
				dispose = listen(button, "click", click_handler_5);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
		},
		d(detaching) {
			if (detaching) {
				detach(button);
			}

			mounted = false;
			dispose();
		}
	};
}

// (70:1) {#if index<0}
function create_if_block_19(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = "Selected time is outside the returned forecast range. Choose a time below.";
			attr(div, "class", "notice svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

// (73:1) {#if mapModel&&mapModel!==data.model}
function create_if_block_18(ctx) {
	let p_1;
	let t0;
	let t1;
	let t2;
	let t3_value = (MODELS[/*mapModel*/ ctx[3]] || /*mapModel*/ ctx[3]) + "";
	let t3;
	let t4;

	return {
		c() {
			p_1 = element("p");
			t0 = text("Panel: ");
			t1 = text(/*served*/ ctx[38]);
			t2 = text(" · Windy map: ");
			t3 = text(t3_value);
			t4 = text(". These sources are separate.");
			attr(p_1, "class", "footnote svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, p_1, anchor);
			append(p_1, t0);
			append(p_1, t1);
			append(p_1, t2);
			append(p_1, t3);
			append(p_1, t4);
		},
		p(ctx, dirty) {
			if (dirty[1] & /*served*/ 128) set_data(t1, /*served*/ ctx[38]);
			if (dirty[0] & /*mapModel*/ 8 && t3_value !== (t3_value = (MODELS[/*mapModel*/ ctx[3]] || /*mapModel*/ ctx[3]) + "")) set_data(t3, t3_value);
		},
		d(detaching) {
			if (detaching) {
				detach(p_1);
			}
		}
	};
}

// (74:1) {#if data.model!==model}
function create_if_block_17(ctx) {
	let div;
	let t0;
	let t1_value = MODELS[/*model*/ ctx[5]] + "";
	let t1;
	let t2;
	let t3;
	let t4;

	return {
		c() {
			div = element("div");
			t0 = text("Requested ");
			t1 = text(t1_value);
			t2 = text("; provider returned ");
			t3 = text(/*served*/ ctx[38]);
			t4 = text(".");
			attr(div, "class", "notice svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t0);
			append(div, t1);
			append(div, t2);
			append(div, t3);
			append(div, t4);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*model*/ 32 && t1_value !== (t1_value = MODELS[/*model*/ ctx[5]] + "")) set_data(t1, t1_value);
			if (dirty[1] & /*served*/ 128) set_data(t3, /*served*/ ctx[38]);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

// (75:1) {#if data.header.merged}
function create_if_block_16(ctx) {
	let div;
	let t0;
	let t1_value = /*data*/ ctx[6].header.merged.mergedModelName + "";
	let t1;
	let t2;
	let t3_value = /*data*/ ctx[6].header.merged.mergedModelStart + "";
	let t3;
	let t4;

	return {
		c() {
			div = element("div");
			t0 = text("Provider reports merged data: ");
			t1 = text(t1_value);
			t2 = text(" from ");
			t3 = text(t3_value);
			t4 = text(".");
			attr(div, "class", "notice svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t0);
			append(div, t1);
			append(div, t2);
			append(div, t3);
			append(div, t4);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*data*/ 64 && t1_value !== (t1_value = /*data*/ ctx[6].header.merged.mergedModelName + "")) set_data(t1, t1_value);
			if (dirty[0] & /*data*/ 64 && t3_value !== (t3_value = /*data*/ ctx[6].header.merged.mergedModelStart + "")) set_data(t3, t3_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

// (108:29) 
function create_if_block_15(ctx) {
	let div;
	let h2;
	let small;
	let t1;
	let t2;
	let p_1;
	let t4;
	let t5;
	let details;
	let summary;
	let pre;

	let t7_value = JSON.stringify(
		{
			header: /*data*/ ctx[6].header,
			summary: /*data*/ ctx[6].summary,
			celestial: /*data*/ ctx[6].raw.celestial
		},
		null,
		2
	) + "";

	let t7;
	let each_value_19 = ensure_array_like(/*coverage*/ ctx[33]);
	let each_blocks = [];

	for (let i = 0; i < each_value_19.length; i += 1) {
		each_blocks[i] = create_each_block_19(get_each_context_19(ctx, each_value_19, i));
	}

	return {
		c() {
			div = element("div");
			h2 = element("h2");
			h2.textContent = "What this source supplies";
			small = element("small");
			t1 = text(/*served*/ ctx[38]);
			t2 = text(" · selected time");
			p_1 = element("p");
			p_1.textContent = "Returned data is checked at runtime. Additional returned variables remain accessible in Parameters, even if their meaning or units are not yet mapped.";
			t4 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t5 = space();
			details = element("details");
			summary = element("summary");
			summary.textContent = "Source metadata & daily summaries";
			pre = element("pre");
			t7 = text(t7_value);
			attr(h2, "class", "svelte-oh3hkl");
			attr(small, "class", "svelte-oh3hkl");
			attr(div, "class", "section-title svelte-oh3hkl");
			attr(p_1, "class", "footnote svelte-oh3hkl");
			attr(summary, "class", "svelte-oh3hkl");
			attr(pre, "class", "svelte-oh3hkl");
			attr(details, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, h2);
			append(div, small);
			append(small, t1);
			append(small, t2);
			insert(target, p_1, anchor);
			insert(target, t4, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert(target, t5, anchor);
			insert(target, details, anchor);
			append(details, summary);
			append(details, pre);
			append(pre, t7);
		},
		p(ctx, dirty) {
			if (dirty[1] & /*served*/ 128) set_data(t1, /*served*/ ctx[38]);

			if (dirty[1] & /*coverage*/ 4) {
				each_value_19 = ensure_array_like(/*coverage*/ ctx[33]);
				let i;

				for (i = 0; i < each_value_19.length; i += 1) {
					const child_ctx = get_each_context_19(ctx, each_value_19, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_19(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(t5.parentNode, t5);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_19.length;
			}

			if (dirty[0] & /*data*/ 64 && t7_value !== (t7_value = JSON.stringify(
				{
					header: /*data*/ ctx[6].header,
					summary: /*data*/ ctx[6].summary,
					celestial: /*data*/ ctx[6].raw.celestial
				},
				null,
				2
			) + "")) set_data(t7, t7_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
				detach(p_1);
				detach(t4);
				detach(t5);
				detach(details);
			}

			destroy_each(each_blocks, detaching);
		}
	};
}

// (103:31) 
function create_if_block_13(ctx) {
	let div0;
	let input;
	let select;
	let t0;
	let div1;
	let h2;
	let t1_value = /*filtered*/ ctx[41].length + "";
	let t1;
	let t2;
	let button;
	let t4;
	let t5;
	let div2;
	let mounted;
	let dispose;
	let each_value_18 = ensure_array_like(/*groups*/ ctx[42]);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_18.length; i += 1) {
		each_blocks_1[i] = create_each_block_18(get_each_context_18(ctx, each_value_18, i));
	}

	let if_block = /*selectedField*/ ctx[37] && create_if_block_14(ctx);
	let each_value_17 = ensure_array_like(/*filtered*/ ctx[41]);
	let each_blocks = [];

	for (let i = 0; i < each_value_17.length; i += 1) {
		each_blocks[i] = create_each_block_17(get_each_context_17(ctx, each_value_17, i));
	}

	return {
		c() {
			div0 = element("div");
			input = element("input");
			select = element("select");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t0 = space();
			div1 = element("div");
			h2 = element("h2");
			t1 = text(t1_value);
			t2 = text(" fields");
			button = element("button");
			button.textContent = "Export raw JSON ↓";
			t4 = space();
			if (if_block) if_block.c();
			t5 = space();
			div2 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(input, "type", "search");
			attr(input, "aria-label", "Search parameters");
			attr(input, "placeholder", "Search any parameter or pressure level…");
			attr(input, "class", "svelte-oh3hkl");
			attr(select, "aria-label", "Parameter group");
			attr(select, "class", "svelte-oh3hkl");
			if (/*group*/ ctx[8] === void 0) add_render_callback(() => /*select_change_handler_1*/ ctx[82].call(select));
			attr(div0, "class", "filters svelte-oh3hkl");
			attr(h2, "class", "svelte-oh3hkl");
			attr(button, "class", "svelte-oh3hkl");
			attr(div1, "class", "section-title svelte-oh3hkl");
			attr(div2, "class", "parameter-list svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			append(div0, input);
			set_input_value(input, /*search*/ ctx[7]);
			append(div0, select);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(select, null);
				}
			}

			select_option(select, /*group*/ ctx[8], true);
			insert(target, t0, anchor);
			insert(target, div1, anchor);
			append(div1, h2);
			append(h2, t1);
			append(h2, t2);
			append(div1, button);
			insert(target, t4, anchor);
			if (if_block) if_block.m(target, anchor);
			insert(target, t5, anchor);
			insert(target, div2, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div2, null);
				}
			}

			if (!mounted) {
				dispose = [
					listen(input, "input", /*input_input_handler*/ ctx[81]),
					listen(select, "change", /*select_change_handler_1*/ ctx[82]),
					listen(button, "click", /*download*/ ctx[52])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*search*/ 128 && input.value !== /*search*/ ctx[7]) {
				set_input_value(input, /*search*/ ctx[7]);
			}

			if (dirty[1] & /*groups*/ 2048) {
				each_value_18 = ensure_array_like(/*groups*/ ctx[42]);
				let i;

				for (i = 0; i < each_value_18.length; i += 1) {
					const child_ctx = get_each_context_18(ctx, each_value_18, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_18(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(select, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_18.length;
			}

			if (dirty[0] & /*group*/ 256 | dirty[1] & /*groups*/ 2048) {
				select_option(select, /*group*/ ctx[8]);
			}

			if (dirty[1] & /*filtered*/ 1024 && t1_value !== (t1_value = /*filtered*/ ctx[41].length + "")) set_data(t1, t1_value);

			if (/*selectedField*/ ctx[37]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_14(ctx);
					if_block.c();
					if_block.m(t5.parentNode, t5);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty[0] & /*pins, selected, valid, prefs*/ 19968 | dirty[1] & /*filtered, pin*/ 17408) {
				each_value_17 = ensure_array_like(/*filtered*/ ctx[41]);
				let i;

				for (i = 0; i < each_value_17.length; i += 1) {
					const child_ctx = get_each_context_17(ctx, each_value_17, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_17(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div2, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_17.length;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(div0);
				detach(t0);
				detach(div1);
				detach(t4);
				detach(t5);
				detach(div2);
			}

			destroy_each(each_blocks_1, detaching);
			if (if_block) if_block.d(detaching);
			destroy_each(each_blocks, detaching);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (99:28) 
function create_if_block_12(ctx) {
	let div;
	let h2;
	let button;

	let t1_value = (/*compareBusy*/ ctx[25]
	? 'Loading…'
	: 'Load comparisons') + "";

	let t1;
	let p_1;
	let t3;
	let t4;
	let each1_anchor;
	let mounted;
	let dispose;
	let each_value_15 = ensure_array_like(['temperature', 'wind', 'windGust', 'pressure']);
	let each_blocks_1 = [];

	for (let i = 0; i < 4; i += 1) {
		each_blocks_1[i] = create_each_block_15(get_each_context_15(ctx, each_value_15, i));
	}

	let each_value_14 = ensure_array_like(/*comparisonErrors*/ ctx[27]);
	let each_blocks = [];

	for (let i = 0; i < each_value_14.length; i += 1) {
		each_blocks[i] = create_each_block_14(get_each_context_14(ctx, each_value_14, i));
	}

	return {
		c() {
			div = element("div");
			h2 = element("h2");
			h2.textContent = "Model comparison";
			button = element("button");
			t1 = text(t1_value);
			p_1 = element("p");
			p_1.textContent = "Same location and exact valid time. Spread describes disagreement, not forecast probability. Meteoblue may incorporate the other models, so these are not independent ensemble members.";
			t3 = space();

			for (let i = 0; i < 4; i += 1) {
				each_blocks_1[i].c();
			}

			t4 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each1_anchor = empty();
			attr(h2, "class", "svelte-oh3hkl");
			button.disabled = /*compareBusy*/ ctx[25];
			attr(button, "class", "svelte-oh3hkl");
			attr(div, "class", "section-title svelte-oh3hkl");
			attr(p_1, "class", "footnote svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, h2);
			append(div, button);
			append(button, t1);
			insert(target, p_1, anchor);
			insert(target, t3, anchor);

			for (let i = 0; i < 4; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(target, anchor);
				}
			}

			insert(target, t4, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert(target, each1_anchor, anchor);

			if (!mounted) {
				dispose = listen(button, "click", /*compareModels*/ ctx[51]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*compareBusy*/ 33554432 && t1_value !== (t1_value = (/*compareBusy*/ ctx[25]
			? 'Loading…'
			: 'Load comparisons') + "")) set_data(t1, t1_value);

			if (dirty[0] & /*compareBusy*/ 33554432) {
				button.disabled = /*compareBusy*/ ctx[25];
			}

			if (dirty[0] & /*data, comparisons, valid, prefs*/ 67126336) {
				each_value_15 = ensure_array_like(['temperature', 'wind', 'windGust', 'pressure']);
				let i;

				for (i = 0; i < 4; i += 1) {
					const child_ctx = get_each_context_15(ctx, each_value_15, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_15(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(t4.parentNode, t4);
					}
				}

				for (; i < 4; i += 1) {
					each_blocks_1[i].d(1);
				}
			}

			if (dirty[0] & /*comparisonErrors*/ 134217728) {
				each_value_14 = ensure_array_like(/*comparisonErrors*/ ctx[27]);
				let i;

				for (i = 0; i < each_value_14.length; i += 1) {
					const child_ctx = get_each_context_14(ctx, each_value_14, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_14(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each1_anchor.parentNode, each1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_14.length;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(div);
				detach(p_1);
				detach(t3);
				detach(t4);
				detach(each1_anchor);
			}

			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};
}

// (94:28) 
function create_if_block_9(ctx) {
	let div0;
	let t0;
	let div1;
	let h2;
	let small;
	let t2;
	let t3;
	let t4;
	let t5;
	let if_block1_anchor;
	let each_value_13 = ensure_array_like(/*extra*/ ctx[19].filter(func_1));
	let each_blocks = [];

	for (let i = 0; i < each_value_13.length; i += 1) {
		each_blocks[i] = create_each_block_13(get_each_context_13(ctx, each_value_13, i));
	}

	function select_block_type_3(ctx, dirty) {
		if (/*profile*/ ctx[28].length) return create_if_block_11;
		return create_else_block_1;
	}

	let current_block_type = select_block_type_3(ctx);
	let if_block0 = current_block_type(ctx);
	let if_block1 = /*hodo*/ ctx[18].length >= 2 && create_if_block_10(ctx);

	return {
		c() {
			div0 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t0 = space();
			div1 = element("div");
			h2 = element("h2");
			h2.textContent = "Vertical structure";
			small = element("small");
			t2 = text(/*served*/ ctx[38]);
			t3 = text(" · selected forecast time");
			t4 = space();
			if_block0.c();
			t5 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			attr(div0, "class", "diagnostics svelte-oh3hkl");
			attr(h2, "class", "svelte-oh3hkl");
			attr(small, "class", "svelte-oh3hkl");
			attr(div1, "class", "section-title svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div0, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div0, null);
				}
			}

			insert(target, t0, anchor);
			insert(target, div1, anchor);
			append(div1, h2);
			append(div1, small);
			append(small, t2);
			append(small, t3);
			insert(target, t4, anchor);
			if_block0.m(target, anchor);
			insert(target, t5, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, if_block1_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*extra, valid, prefs*/ 541696 | dirty[1] & /*inspect, served*/ 32896) {
				each_value_13 = ensure_array_like(/*extra*/ ctx[19].filter(func_1));
				let i;

				for (i = 0; i < each_value_13.length; i += 1) {
					const child_ctx = get_each_context_13(ctx, each_value_13, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_13(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div0, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_13.length;
			}

			if (dirty[1] & /*served*/ 128) set_data(t2, /*served*/ ctx[38]);

			if (current_block_type === (current_block_type = select_block_type_3(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(t5.parentNode, t5);
				}
			}

			if (/*hodo*/ ctx[18].length >= 2) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_10(ctx);
					if_block1.c();
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(div0);
				detach(t0);
				detach(div1);
				detach(t4);
				detach(t5);
				detach(if_block1_anchor);
			}

			destroy_each(each_blocks, detaching);
			if_block0.d(detaching);
			if (if_block1) if_block1.d(detaching);
		}
	};
}

// (76:1) {#if view==='Brief'}
function create_if_block_3(ctx) {
	let div3;
	let div0;
	let small0;
	let strong0;
	let t1_value = format(/*outlook*/ ctx[36].low, 'K', /*prefs*/ ctx[10]) + "";
	let t1;
	let t2;
	let t3_value = format(/*outlook*/ ctx[36].high, 'K', /*prefs*/ ctx[10]) + "";
	let t3;
	let div1;
	let small1;
	let strong1;
	let t5_value = format(/*outlook*/ ctx[36].rain, 'mm', /*prefs*/ ctx[10]) + "";
	let t5;
	let small2;

	let t6_value = (/*outlook*/ ctx[36].rainComplete
	? 'Complete interval coverage'
	: 'Incomplete interval coverage') + "";

	let t6;
	let div2;
	let small3;
	let strong2;

	let t8_value = (/*confidence*/ ctx[35] === null
	? 'Not supplied'
	: /*confidence*/ ctx[35] + '%') + "";

	let t8;
	let small4;
	let t10;
	let div4;
	let t11;
	let div5;
	let t12;
	let div6;
	let t15;
	let t16;
	let div7;
	let t19;
	let div8;
	let table;
	let thead;
	let tr;
	let th;
	let t20_value = (/*prefs*/ ctx[10].local ? 'Local' : 'UTC') + "";
	let t20;
	let tbody;
	let t21;
	let p_1;
	let each_value_6 = ensure_array_like(/*lines*/ ctx[39]);
	let each_blocks_3 = [];

	for (let i = 0; i < each_value_6.length; i += 1) {
		each_blocks_3[i] = create_each_block_6(get_each_context_6(ctx, each_value_6, i));
	}

	let each_value_5 = ensure_array_like(/*cards*/ ctx[40]);
	let each_blocks_2 = [];

	for (let i = 0; i < each_value_5.length; i += 1) {
		each_blocks_2[i] = create_each_block_5(get_each_context_5(ctx, each_value_5, i));
	}

	function select_block_type_2(ctx, dirty) {
		if (/*trendValues*/ ctx[17].length) return create_if_block_4;
		return create_else_block;
	}

	let current_block_type = select_block_type_2(ctx);
	let if_block = current_block_type(ctx);
	let each_value_2 = ensure_array_like(/*slots*/ ctx[16]);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
	}

	let each_value = ensure_array_like(['temperature', 'dewPoint', 'wind', 'windGust', 'precipAmount']);
	let each_blocks = [];

	for (let i = 0; i < 5; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	return {
		c() {
			div3 = element("div");
			div0 = element("div");
			small0 = element("small");
			small0.textContent = "NEXT 24H · SAMPLED TEMPERATURE";
			strong0 = element("strong");
			t1 = text(t1_value);
			t2 = text(" / ");
			t3 = text(t3_value);
			div1 = element("div");
			small1 = element("small");
			small1.textContent = "24H PRECIPITATION";
			strong1 = element("strong");
			t5 = text(t5_value);
			small2 = element("small");
			t6 = text(t6_value);
			div2 = element("div");
			small3 = element("small");
			small3.textContent = "DAILY PREDICTABILITY";
			strong2 = element("strong");
			t8 = text(t8_value);
			small4 = element("small");
			small4.textContent = "Provider index, not rain probability";
			t10 = space();
			div4 = element("div");

			for (let i = 0; i < each_blocks_3.length; i += 1) {
				each_blocks_3[i].c();
			}

			t11 = space();
			div5 = element("div");

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].c();
			}

			t12 = space();
			div6 = element("div");
			div6.innerHTML = `<h2 class="svelte-oh3hkl">The next 48 hours</h2><small class="svelte-oh3hkl">Temperature &amp; precipitation</small>`;
			t15 = space();
			if_block.c();
			t16 = space();
			div7 = element("div");
			div7.innerHTML = `<h2 class="svelte-oh3hkl">Forecast details</h2><small class="svelte-oh3hkl">Click a column to select its time</small>`;
			t19 = space();
			div8 = element("div");
			table = element("table");
			thead = element("thead");
			tr = element("tr");
			th = element("th");
			t20 = text(t20_value);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			tbody = element("tbody");

			for (let i = 0; i < 5; i += 1) {
				each_blocks[i].c();
			}

			t21 = space();
			p_1 = element("p");
			p_1.textContent = "Precipitation is per returned interval, not mm/hour. Forecasts are not observations. Tap any card for its underlying field.";
			attr(small0, "class", "svelte-oh3hkl");
			attr(strong0, "class", "svelte-oh3hkl");
			attr(div0, "class", "svelte-oh3hkl");
			attr(small1, "class", "svelte-oh3hkl");
			attr(strong1, "class", "svelte-oh3hkl");
			attr(small2, "class", "svelte-oh3hkl");
			attr(div1, "class", "svelte-oh3hkl");
			attr(small3, "class", "svelte-oh3hkl");
			attr(strong2, "class", "svelte-oh3hkl");
			attr(small4, "class", "svelte-oh3hkl");
			attr(div2, "class", "svelte-oh3hkl");
			attr(div3, "class", "outlook svelte-oh3hkl");
			attr(div4, "class", "briefing svelte-oh3hkl");
			attr(div5, "class", "cards svelte-oh3hkl");
			attr(div6, "class", "section-title svelte-oh3hkl");
			attr(div7, "class", "section-title svelte-oh3hkl");
			attr(th, "class", "svelte-oh3hkl");
			attr(tr, "class", "svelte-oh3hkl");
			attr(thead, "class", "svelte-oh3hkl");
			attr(tbody, "class", "svelte-oh3hkl");
			attr(table, "class", "svelte-oh3hkl");
			attr(div8, "class", "timeline svelte-oh3hkl");
			attr(div8, "role", "region");
			attr(div8, "aria-label", "48-hour forecast table");
			attr(p_1, "class", "footnote svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div3, anchor);
			append(div3, div0);
			append(div0, small0);
			append(div0, strong0);
			append(strong0, t1);
			append(strong0, t2);
			append(strong0, t3);
			append(div3, div1);
			append(div1, small1);
			append(div1, strong1);
			append(strong1, t5);
			append(div1, small2);
			append(small2, t6);
			append(div3, div2);
			append(div2, small3);
			append(div2, strong2);
			append(strong2, t8);
			append(div2, small4);
			insert(target, t10, anchor);
			insert(target, div4, anchor);

			for (let i = 0; i < each_blocks_3.length; i += 1) {
				if (each_blocks_3[i]) {
					each_blocks_3[i].m(div4, null);
				}
			}

			insert(target, t11, anchor);
			insert(target, div5, anchor);

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				if (each_blocks_2[i]) {
					each_blocks_2[i].m(div5, null);
				}
			}

			insert(target, t12, anchor);
			insert(target, div6, anchor);
			insert(target, t15, anchor);
			if_block.m(target, anchor);
			insert(target, t16, anchor);
			insert(target, div7, anchor);
			insert(target, t19, anchor);
			insert(target, div8, anchor);
			append(div8, table);
			append(table, thead);
			append(thead, tr);
			append(tr, th);
			append(th, t20);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(tr, null);
				}
			}

			append(table, tbody);

			for (let i = 0; i < 5; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(tbody, null);
				}
			}

			insert(target, t21, anchor);
			insert(target, p_1, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*prefs*/ 1024 | dirty[1] & /*outlook*/ 32 && t1_value !== (t1_value = format(/*outlook*/ ctx[36].low, 'K', /*prefs*/ ctx[10]) + "")) set_data(t1, t1_value);
			if (dirty[0] & /*prefs*/ 1024 | dirty[1] & /*outlook*/ 32 && t3_value !== (t3_value = format(/*outlook*/ ctx[36].high, 'K', /*prefs*/ ctx[10]) + "")) set_data(t3, t3_value);
			if (dirty[0] & /*prefs*/ 1024 | dirty[1] & /*outlook*/ 32 && t5_value !== (t5_value = format(/*outlook*/ ctx[36].rain, 'mm', /*prefs*/ ctx[10]) + "")) set_data(t5, t5_value);

			if (dirty[1] & /*outlook*/ 32 && t6_value !== (t6_value = (/*outlook*/ ctx[36].rainComplete
			? 'Complete interval coverage'
			: 'Incomplete interval coverage') + "")) set_data(t6, t6_value);

			if (dirty[1] & /*confidence*/ 16 && t8_value !== (t8_value = (/*confidence*/ ctx[35] === null
			? 'Not supplied'
			: /*confidence*/ ctx[35] + '%') + "")) set_data(t8, t8_value);

			if (dirty[1] & /*inspect, lines*/ 33024) {
				each_value_6 = ensure_array_like(/*lines*/ ctx[39]);
				let i;

				for (i = 0; i < each_value_6.length; i += 1) {
					const child_ctx = get_each_context_6(ctx, each_value_6, i);

					if (each_blocks_3[i]) {
						each_blocks_3[i].p(child_ctx, dirty);
					} else {
						each_blocks_3[i] = create_each_block_6(child_ctx);
						each_blocks_3[i].c();
						each_blocks_3[i].m(div4, null);
					}
				}

				for (; i < each_blocks_3.length; i += 1) {
					each_blocks_3[i].d(1);
				}

				each_blocks_3.length = each_value_6.length;
			}

			if (dirty[0] & /*valid, prefs*/ 17408 | dirty[1] & /*inspect, cards, served*/ 33408) {
				each_value_5 = ensure_array_like(/*cards*/ ctx[40]);
				let i;

				for (i = 0; i < each_value_5.length; i += 1) {
					const child_ctx = get_each_context_5(ctx, each_value_5, i);

					if (each_blocks_2[i]) {
						each_blocks_2[i].p(child_ctx, dirty);
					} else {
						each_blocks_2[i] = create_each_block_5(child_ctx);
						each_blocks_2[i].c();
						each_blocks_2[i].m(div5, null);
					}
				}

				for (; i < each_blocks_2.length; i += 1) {
					each_blocks_2[i].d(1);
				}

				each_blocks_2.length = each_value_5.length;
			}

			if (current_block_type === (current_block_type = select_block_type_2(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(t16.parentNode, t16);
				}
			}

			if (dirty[0] & /*prefs*/ 1024 && t20_value !== (t20_value = (/*prefs*/ ctx[10].local ? 'Local' : 'UTC') + "")) set_data(t20, t20_value);

			if (dirty[0] & /*slots, valid, prefs*/ 82944 | dirty[1] & /*chooseTime*/ 65536) {
				each_value_2 = ensure_array_like(/*slots*/ ctx[16]);
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2(ctx, each_value_2, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_2(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(tr, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_2.length;
			}

			if (dirty[0] & /*slots, data*/ 65600 | dirty[1] & /*show*/ 4194304) {
				each_value = ensure_array_like(['temperature', 'dewPoint', 'wind', 'windGust', 'precipAmount']);
				let i;

				for (i = 0; i < 5; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(tbody, null);
					}
				}

				for (; i < 5; i += 1) {
					each_blocks[i].d(1);
				}
			}
		},
		d(detaching) {
			if (detaching) {
				detach(div3);
				detach(t10);
				detach(div4);
				detach(t11);
				detach(div5);
				detach(t12);
				detach(div6);
				detach(t15);
				detach(t16);
				detach(div7);
				detach(t19);
				detach(div8);
				detach(t21);
				detach(p_1);
			}

			destroy_each(each_blocks_3, detaching);
			destroy_each(each_blocks_2, detaching);
			if_block.d(detaching);
			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
		}
	};
}

// (110:1) {#each coverage as row}
function create_each_block_19(ctx) {
	let div1;
	let span;
	let t0_value = (/*row*/ ctx[139].available ? '✓' : '—') + "";
	let t0;
	let div0;
	let strong;
	let t1_value = /*row*/ ctx[139].label + "";
	let t1;
	let small;

	let t2_value = (/*row*/ ctx[139].available
	? 'Returned · ' + /*row*/ ctx[139].note
	: /*row*/ ctx[139].key
		? 'Not supplied at this time · ' + /*row*/ ctx[139].note
		: /*row*/ ctx[139].note) + "";

	let t2;

	return {
		c() {
			div1 = element("div");
			span = element("span");
			t0 = text(t0_value);
			div0 = element("div");
			strong = element("strong");
			t1 = text(t1_value);
			small = element("small");
			t2 = text(t2_value);
			attr(span, "class", "svelte-oh3hkl");
			toggle_class(span, "available", /*row*/ ctx[139].available);
			attr(strong, "class", "svelte-oh3hkl");
			attr(small, "class", "svelte-oh3hkl");
			attr(div0, "class", "svelte-oh3hkl");
			attr(div1, "class", "coverage svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, span);
			append(span, t0);
			append(div1, div0);
			append(div0, strong);
			append(strong, t1);
			append(div0, small);
			append(small, t2);
		},
		p(ctx, dirty) {
			if (dirty[1] & /*coverage*/ 4 && t0_value !== (t0_value = (/*row*/ ctx[139].available ? '✓' : '—') + "")) set_data(t0, t0_value);

			if (dirty[1] & /*coverage*/ 4) {
				toggle_class(span, "available", /*row*/ ctx[139].available);
			}

			if (dirty[1] & /*coverage*/ 4 && t1_value !== (t1_value = /*row*/ ctx[139].label + "")) set_data(t1, t1_value);

			if (dirty[1] & /*coverage*/ 4 && t2_value !== (t2_value = (/*row*/ ctx[139].available
			? 'Returned · ' + /*row*/ ctx[139].note
			: /*row*/ ctx[139].key
				? 'Not supplied at this time · ' + /*row*/ ctx[139].note
				: /*row*/ ctx[139].note) + "")) set_data(t2, t2_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div1);
			}
		}
	};
}

// (104:205) {#each groups as g}
function create_each_block_18(ctx) {
	let option;
	let t_1_value = /*g*/ ctx[136] + "";
	let t_1;
	let option_value_value;

	return {
		c() {
			option = element("option");
			t_1 = text(t_1_value);
			option.__value = option_value_value = /*g*/ ctx[136];
			set_input_value(option, option.__value);
			attr(option, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t_1);
		},
		p(ctx, dirty) {
			if (dirty[1] & /*groups*/ 2048 && t_1_value !== (t_1_value = /*g*/ ctx[136] + "")) set_data(t_1, t_1_value);

			if (dirty[1] & /*groups*/ 2048 && option_value_value !== (option_value_value = /*g*/ ctx[136])) {
				option.__value = option_value_value;
				set_input_value(option, option.__value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(option);
			}
		}
	};
}

// (106:1) {#if selectedField}
function create_if_block_14(ctx) {
	let div;
	let button;
	let h2;
	let t1_value = /*selectedField*/ ctx[37].label + "";
	let t1;
	let p0;
	let t2_value = /*selectedField*/ ctx[37].id + "";
	let t2;
	let t3;
	let t4;
	let p1;
	let t5_value = (/*selectedField*/ ctx[37].method || `Provider unit: ${/*selectedField*/ ctx[37].unit}. No invented value is used for missing data.`) + "";
	let t5;
	let p2;
	let t6;

	let t7_value = (nearestIndex(/*selectedField*/ ctx[37].ts, /*valid*/ ctx[14], 0) >= 0
	? timeLabel(/*selectedField*/ ctx[37].ts[nearestIndex(/*selectedField*/ ctx[37].ts, /*valid*/ ctx[14], 0)], /*prefs*/ ctx[10].local)
	: 'No matching time') + "";

	let t7;
	let t8;
	let t9_value = /*selectedField*/ ctx[37].ts.length + "";
	let t9;
	let t10;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			button = element("button");
			button.textContent = "×";
			h2 = element("h2");
			t1 = text(t1_value);
			p0 = element("p");
			t2 = text(t2_value);
			t3 = text(" · ");
			t4 = text(/*served*/ ctx[38]);
			p1 = element("p");
			t5 = text(t5_value);
			p2 = element("p");
			t6 = text("Sample time: ");
			t7 = text(t7_value);
			t8 = text(" · ");
			t9 = text(t9_value);
			t10 = text(" samples");
			attr(button, "class", "close svelte-oh3hkl");
			attr(button, "aria-label", "Close field details");
			attr(h2, "class", "svelte-oh3hkl");
			attr(p0, "class", "svelte-oh3hkl");
			attr(p1, "class", "svelte-oh3hkl");
			attr(p2, "class", "svelte-oh3hkl");
			attr(div, "class", "detail svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, button);
			append(div, h2);
			append(h2, t1);
			append(div, p0);
			append(p0, t2);
			append(p0, t3);
			append(p0, t4);
			append(div, p1);
			append(p1, t5);
			append(div, p2);
			append(p2, t6);
			append(p2, t7);
			append(p2, t8);
			append(p2, t9);
			append(p2, t10);

			if (!mounted) {
				dispose = listen(button, "click", /*click_handler_10*/ ctx[83]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[1] & /*selectedField*/ 64 && t1_value !== (t1_value = /*selectedField*/ ctx[37].label + "")) set_data(t1, t1_value);
			if (dirty[1] & /*selectedField*/ 64 && t2_value !== (t2_value = /*selectedField*/ ctx[37].id + "")) set_data(t2, t2_value);
			if (dirty[1] & /*served*/ 128) set_data(t4, /*served*/ ctx[38]);
			if (dirty[1] & /*selectedField*/ 64 && t5_value !== (t5_value = (/*selectedField*/ ctx[37].method || `Provider unit: ${/*selectedField*/ ctx[37].unit}. No invented value is used for missing data.`) + "")) set_data(t5, t5_value);

			if (dirty[0] & /*valid, prefs*/ 17408 | dirty[1] & /*selectedField*/ 64 && t7_value !== (t7_value = (nearestIndex(/*selectedField*/ ctx[37].ts, /*valid*/ ctx[14], 0) >= 0
			? timeLabel(/*selectedField*/ ctx[37].ts[nearestIndex(/*selectedField*/ ctx[37].ts, /*valid*/ ctx[14], 0)], /*prefs*/ ctx[10].local)
			: 'No matching time') + "")) set_data(t7, t7_value);

			if (dirty[1] & /*selectedField*/ 64 && t9_value !== (t9_value = /*selectedField*/ ctx[37].ts.length + "")) set_data(t9, t9_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}

			mounted = false;
			dispose();
		}
	};
}

// (107:29) {#each filtered as f}
function create_each_block_17(ctx) {
	let div;
	let button0;
	let span;
	let t0_value = /*f*/ ctx[104].label + "";
	let t0;
	let small;
	let t1_value = /*f*/ ctx[104].section + "";
	let t1;
	let t2;
	let t3_value = /*f*/ ctx[104].key + "";
	let t3;
	let strong;
	let t4_value = format(at(/*f*/ ctx[104], /*valid*/ ctx[14]), /*f*/ ctx[104].unit, /*prefs*/ ctx[10]) + "";
	let t4;
	let button1;

	let t5_value = (/*pins*/ ctx[11].includes(/*f*/ ctx[104].key)
	? '★'
	: '☆') + "";

	let t5;
	let button1_aria_label_value;
	let mounted;
	let dispose;

	function click_handler_11() {
		return /*click_handler_11*/ ctx[84](/*f*/ ctx[104]);
	}

	function click_handler_12() {
		return /*click_handler_12*/ ctx[85](/*f*/ ctx[104]);
	}

	return {
		c() {
			div = element("div");
			button0 = element("button");
			span = element("span");
			t0 = text(t0_value);
			small = element("small");
			t1 = text(t1_value);
			t2 = text(" · ");
			t3 = text(t3_value);
			strong = element("strong");
			t4 = text(t4_value);
			button1 = element("button");
			t5 = text(t5_value);
			attr(small, "class", "svelte-oh3hkl");
			attr(span, "class", "svelte-oh3hkl");
			attr(strong, "class", "svelte-oh3hkl");
			attr(button0, "class", "field svelte-oh3hkl");
			attr(button1, "title", "Pin or unpin parameter");
			attr(button1, "aria-label", button1_aria_label_value = `Pin ${/*f*/ ctx[104].label}`);
			attr(button1, "class", "svelte-oh3hkl");
			toggle_class(button1, "pinned", /*pins*/ ctx[11].includes(/*f*/ ctx[104].key));
			attr(div, "class", "parameter svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, button0);
			append(button0, span);
			append(span, t0);
			append(span, small);
			append(small, t1);
			append(small, t2);
			append(small, t3);
			append(button0, strong);
			append(strong, t4);
			append(div, button1);
			append(button1, t5);

			if (!mounted) {
				dispose = [
					listen(button0, "click", click_handler_11),
					listen(button1, "click", click_handler_12)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[1] & /*filtered*/ 1024 && t0_value !== (t0_value = /*f*/ ctx[104].label + "")) set_data(t0, t0_value);
			if (dirty[1] & /*filtered*/ 1024 && t1_value !== (t1_value = /*f*/ ctx[104].section + "")) set_data(t1, t1_value);
			if (dirty[1] & /*filtered*/ 1024 && t3_value !== (t3_value = /*f*/ ctx[104].key + "")) set_data(t3, t3_value);
			if (dirty[0] & /*valid, prefs*/ 17408 | dirty[1] & /*filtered*/ 1024 && t4_value !== (t4_value = format(at(/*f*/ ctx[104], /*valid*/ ctx[14]), /*f*/ ctx[104].unit, /*prefs*/ ctx[10]) + "")) set_data(t4, t4_value);

			if (dirty[0] & /*pins*/ 2048 | dirty[1] & /*filtered*/ 1024 && t5_value !== (t5_value = (/*pins*/ ctx[11].includes(/*f*/ ctx[104].key)
			? '★'
			: '☆') + "")) set_data(t5, t5_value);

			if (dirty[1] & /*filtered*/ 1024 && button1_aria_label_value !== (button1_aria_label_value = `Pin ${/*f*/ ctx[104].label}`)) {
				attr(button1, "aria-label", button1_aria_label_value);
			}

			if (dirty[0] & /*pins*/ 2048 | dirty[1] & /*filtered*/ 1024) {
				toggle_class(button1, "pinned", /*pins*/ ctx[11].includes(/*f*/ ctx[104].key));
			}
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}

			mounted = false;
			run_all(dispose);
		}
	};
}

// (101:178) {#each c.entries as e}
function create_each_block_16(ctx) {
	let span;
	let small;
	let t0_value = (MODELS[/*e*/ ctx[131].model] || /*e*/ ctx[131].model) + "";
	let t0;
	let t1_value = format(/*e*/ ctx[131].value, describe(/*key*/ ctx[88]).unit, /*prefs*/ ctx[10]) + "";
	let t1;

	return {
		c() {
			span = element("span");
			small = element("small");
			t0 = text(t0_value);
			t1 = text(t1_value);
			attr(small, "class", "svelte-oh3hkl");
			attr(span, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, small);
			append(small, t0);
			append(span, t1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*data, comparisons, valid*/ 67125312 && t0_value !== (t0_value = (MODELS[/*e*/ ctx[131].model] || /*e*/ ctx[131].model) + "")) set_data(t0, t0_value);
			if (dirty[0] & /*data, comparisons, valid, prefs*/ 67126336 && t1_value !== (t1_value = format(/*e*/ ctx[131].value, describe(/*key*/ ctx[88]).unit, /*prefs*/ ctx[10]) + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}
		}
	};
}

// (101:1) {#each ['temperature','wind','windGust','pressure'] as key}
function create_each_block_15(ctx) {
	let div1;
	let strong;
	let div0;
	let small;

	let t1_value = (/*c*/ ctx[128].entries.length < 2
	? 'At least two matching forecasts needed'
	: `Range across ${/*c*/ ctx[128].entries.length} sources: ${format(Math.min(.../*c*/ ctx[128].entries.map(func_3)), describe(/*key*/ ctx[88]).unit, /*prefs*/ ctx[10])} – ${format(Math.max(.../*c*/ ctx[128].entries.map(func_4)), describe(/*key*/ ctx[88]).unit, /*prefs*/ ctx[10])}`) + "";

	let t1;
	let each_value_16 = ensure_array_like(/*c*/ ctx[128].entries);
	let each_blocks = [];

	for (let i = 0; i < each_value_16.length; i += 1) {
		each_blocks[i] = create_each_block_16(get_each_context_16(ctx, each_value_16, i));
	}

	return {
		c() {
			div1 = element("div");
			strong = element("strong");
			strong.textContent = `${describe(/*key*/ ctx[88]).label}`;
			div0 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			small = element("small");
			t1 = text(t1_value);
			attr(strong, "class", "svelte-oh3hkl");
			attr(div0, "class", "svelte-oh3hkl");
			attr(small, "class", "svelte-oh3hkl");
			attr(div1, "class", "comparison svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, strong);
			append(div1, div0);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div0, null);
				}
			}

			append(div1, small);
			append(small, t1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*data, comparisons, valid, prefs*/ 67126336) {
				each_value_16 = ensure_array_like(/*c*/ ctx[128].entries);
				let i;

				for (i = 0; i < each_value_16.length; i += 1) {
					const child_ctx = get_each_context_16(ctx, each_value_16, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_16(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div0, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_16.length;
			}

			if (dirty[0] & /*data, comparisons, valid, prefs*/ 67126336 && t1_value !== (t1_value = (/*c*/ ctx[128].entries.length < 2
			? 'At least two matching forecasts needed'
			: `Range across ${/*c*/ ctx[128].entries.length} sources: ${format(Math.min(.../*c*/ ctx[128].entries.map(func_3)), describe(/*key*/ ctx[88]).unit, /*prefs*/ ctx[10])} – ${format(Math.max(.../*c*/ ctx[128].entries.map(func_4)), describe(/*key*/ ctx[88]).unit, /*prefs*/ ctx[10])}`) + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div1);
			}

			destroy_each(each_blocks, detaching);
		}
	};
}

// (102:1) {#each comparisonErrors as err}
function create_each_block_14(ctx) {
	let p_1;
	let t_1_value = /*err*/ ctx[125] + "";
	let t_1;

	return {
		c() {
			p_1 = element("p");
			t_1 = text(t_1_value);
			attr(p_1, "class", "notice svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, p_1, anchor);
			append(p_1, t_1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*comparisonErrors*/ 134217728 && t_1_value !== (t_1_value = /*err*/ ctx[125] + "")) set_data(t_1, t_1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(p_1);
			}
		}
	};
}

// (95:26) {#each extra.filter(f=>f.group==='Profile diagnostics') as f}
function create_each_block_13(ctx) {
	let button;
	let small0;
	let t0_value = /*f*/ ctx[104].label + "";
	let t0;
	let strong;
	let t1_value = format(at(/*f*/ ctx[104], /*valid*/ ctx[14]), /*f*/ ctx[104].unit, /*prefs*/ ctx[10]) + "";
	let t1;
	let small1;
	let t2;
	let t3;
	let button_title_value;
	let mounted;
	let dispose;

	function click_handler_9() {
		return /*click_handler_9*/ ctx[79](/*f*/ ctx[104]);
	}

	return {
		c() {
			button = element("button");
			small0 = element("small");
			t0 = text(t0_value);
			strong = element("strong");
			t1 = text(t1_value);
			small1 = element("small");
			t2 = text("Calculated · ");
			t3 = text(/*served*/ ctx[38]);
			attr(small0, "class", "svelte-oh3hkl");
			attr(strong, "class", "svelte-oh3hkl");
			attr(small1, "class", "svelte-oh3hkl");
			attr(button, "title", button_title_value = /*f*/ ctx[104].method);
			attr(button, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, small0);
			append(small0, t0);
			append(button, strong);
			append(strong, t1);
			append(button, small1);
			append(small1, t2);
			append(small1, t3);

			if (!mounted) {
				dispose = listen(button, "click", click_handler_9);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*extra*/ 524288 && t0_value !== (t0_value = /*f*/ ctx[104].label + "")) set_data(t0, t0_value);
			if (dirty[0] & /*extra, valid, prefs*/ 541696 && t1_value !== (t1_value = format(at(/*f*/ ctx[104], /*valid*/ ctx[14]), /*f*/ ctx[104].unit, /*prefs*/ ctx[10]) + "")) set_data(t1, t1_value);
			if (dirty[1] & /*served*/ 128) set_data(t3, /*served*/ ctx[38]);

			if (dirty[0] & /*extra*/ 524288 && button_title_value !== (button_title_value = /*f*/ ctx[104].method)) {
				attr(button, "title", button_title_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(button);
			}

			mounted = false;
			dispose();
		}
	};
}

// (97:1413) {:else}
function create_else_block_1(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = "This source did not return a temperature profile. Try another baseline explicitly.";
			attr(div, "class", "empty svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

// (97:1) {#if profile.length}
function create_if_block_11(ctx) {
	let div0;
	let svg;
	let rect;
	let each0_anchor;
	let path0;
	let path1;
	let p0;
	let div1;
	let table;
	let thead;
	let tbody;
	let p1;
	let each_value_12 = ensure_array_like([1000, 850, 700, 500, 300, 200, 100]);
	let each_blocks_2 = [];

	for (let i = 0; i < 7; i += 1) {
		each_blocks_2[i] = create_each_block_12(get_each_context_12(ctx, each_value_12, i));
	}

	let each_value_11 = ensure_array_like([-80, -60, -40, -20, 0, 20, 40]);
	let each_blocks_1 = [];

	for (let i = 0; i < 7; i += 1) {
		each_blocks_1[i] = create_each_block_11(get_each_context_11(ctx, each_value_11, i));
	}

	let each_value_9 = ensure_array_like(/*profile*/ ctx[28]);
	let each_blocks = [];

	for (let i = 0; i < each_value_9.length; i += 1) {
		each_blocks[i] = create_each_block_9(get_each_context_9(ctx, each_value_9, i));
	}

	return {
		c() {
			div0 = element("div");
			svg = svg_element("svg");
			rect = svg_element("rect");

			for (let i = 0; i < 7; i += 1) {
				each_blocks_2[i].c();
			}

			each0_anchor = empty();

			for (let i = 0; i < 7; i += 1) {
				each_blocks_1[i].c();
			}

			path0 = svg_element("path");
			path1 = svg_element("path");
			p0 = element("p");
			p0.innerHTML = `<span class="amber svelte-oh3hkl">Temperature</span> / <span class="mint svelte-oh3hkl">Dew point</span> · °C vs log pressure (hPa)`;
			div1 = element("div");
			table = element("table");
			thead = element("thead");
			thead.innerHTML = `<tr class="svelte-oh3hkl"><th class="svelte-oh3hkl">hPa</th><th class="svelte-oh3hkl">T</th><th class="svelte-oh3hkl">Td</th><th class="svelte-oh3hkl">RH</th><th class="svelte-oh3hkl">Wind</th><th class="svelte-oh3hkl">Direction</th><th class="svelte-oh3hkl">Height</th></tr>`;
			tbody = element("tbody");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			p1 = element("p");
			p1.textContent = "Raw model levels; below-ground levels may be present. No parcel ascent or severe-weather indices are inferred from this chart.";
			attr(rect, "x", "44");
			attr(rect, "y", "20");
			attr(rect, "width", "356");
			attr(rect, "height", "180");
			attr(rect, "fill", "#0b1825");
			attr(rect, "class", "svelte-oh3hkl");
			attr(path0, "d", /*profilePath*/ ctx[55]('temp'));
			attr(path0, "fill", "none");
			attr(path0, "stroke", "#f4ba77");
			attr(path0, "stroke-width", "2.5");
			attr(path0, "class", "svelte-oh3hkl");
			attr(path1, "d", /*profilePath*/ ctx[55]('dewPoint'));
			attr(path1, "fill", "none");
			attr(path1, "stroke", "#57d8be");
			attr(path1, "stroke-width", "2.5");
			attr(path1, "class", "svelte-oh3hkl");
			attr(svg, "viewBox", "0 0 440 225");
			attr(svg, "role", "img");
			attr(svg, "aria-label", "Temperature and dew point versus pressure; not a Skew-T diagram");
			attr(svg, "class", "svelte-oh3hkl");
			attr(p0, "class", "svelte-oh3hkl");
			attr(div0, "class", "profile svelte-oh3hkl");
			attr(thead, "class", "svelte-oh3hkl");
			attr(tbody, "class", "svelte-oh3hkl");
			attr(table, "class", "svelte-oh3hkl");
			attr(div1, "class", "scroll-table svelte-oh3hkl");
			attr(p1, "class", "footnote svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			append(div0, svg);
			append(svg, rect);

			for (let i = 0; i < 7; i += 1) {
				if (each_blocks_2[i]) {
					each_blocks_2[i].m(svg, null);
				}
			}

			append(svg, each0_anchor);

			for (let i = 0; i < 7; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(svg, null);
				}
			}

			append(svg, path0);
			append(svg, path1);
			append(div0, p0);
			insert(target, div1, anchor);
			append(div1, table);
			append(table, thead);
			append(table, tbody);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(tbody, null);
				}
			}

			insert(target, p1, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*Math*/ 0) {
				each_value_12 = ensure_array_like([1000, 850, 700, 500, 300, 200, 100]);
				let i;

				for (i = 0; i < 7; i += 1) {
					const child_ctx = get_each_context_12(ctx, each_value_12, i);

					if (each_blocks_2[i]) {
						each_blocks_2[i].p(child_ctx, dirty);
					} else {
						each_blocks_2[i] = create_each_block_12(child_ctx);
						each_blocks_2[i].c();
						each_blocks_2[i].m(svg, each0_anchor);
					}
				}

				for (; i < 7; i += 1) {
					each_blocks_2[i].d(1);
				}
			}

			if (dirty[0] & /*profile*/ 268435456 | dirty[1] & /*show*/ 4194304) {
				each_value_9 = ensure_array_like(/*profile*/ ctx[28]);
				let i;

				for (i = 0; i < each_value_9.length; i += 1) {
					const child_ctx = get_each_context_9(ctx, each_value_9, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_9(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(tbody, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_9.length;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(div0);
				detach(div1);
				detach(p1);
			}

			destroy_each(each_blocks_2, detaching);
			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
		}
	};
}

// (97:218) {#each [1000,850,700,500,300,200,100] as p}
function create_each_block_12(ctx) {
	let line_1;
	let text_1;
	let t_1;

	return {
		c() {
			line_1 = svg_element("line");
			text_1 = svg_element("text");
			t_1 = text(/*p*/ ctx[110]);
			attr(line_1, "x1", "44");
			attr(line_1, "x2", "400");
			attr(line_1, "y1", 20 + Math.log(/*p*/ ctx[110] / 100) / Math.log(10) * 180);
			attr(line_1, "y2", 20 + Math.log(/*p*/ ctx[110] / 100) / Math.log(10) * 180);
			attr(line_1, "stroke", "#253747");
			attr(line_1, "class", "svelte-oh3hkl");
			attr(text_1, "x", "4");
			attr(text_1, "y", 24 + Math.log(/*p*/ ctx[110] / 100) / Math.log(10) * 180);
			attr(text_1, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, line_1, anchor);
			insert(target, text_1, anchor);
			append(text_1, t_1);
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(line_1);
				detach(text_1);
			}
		}
	};
}

// (97:453) {#each [-80,-60,-40,-20,0,20,40] as t}
function create_each_block_11(ctx) {
	let line_1;
	let text_1;
	let t_1;

	return {
		c() {
			line_1 = svg_element("line");
			text_1 = svg_element("text");
			t_1 = text(/*t*/ ctx[91]);
			attr(line_1, "x1", 44 + (/*t*/ ctx[91] + 80) / 120 * 356);
			attr(line_1, "x2", 44 + (/*t*/ ctx[91] + 80) / 120 * 356);
			attr(line_1, "y1", "20");
			attr(line_1, "y2", "200");
			attr(line_1, "stroke", "#253747");
			attr(line_1, "class", "svelte-oh3hkl");
			attr(text_1, "x", 37 + (/*t*/ ctx[91] + 80) / 120 * 356);
			attr(text_1, "y", "219");
			attr(text_1, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, line_1, anchor);
			insert(target, text_1, anchor);
			append(text_1, t_1);
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(line_1);
				detach(text_1);
			}
		}
	};
}

// (97:1105) {#each [`temp-${p}h`,`dewPoint-${p}h`,`rh-${p}h`,`wind-${p}h`,`windDir-${p}h`,`gh-${p}h`] as key}
function create_each_block_10(ctx) {
	let td;
	let t_1_value = /*show*/ ctx[53](/*key*/ ctx[88]) + "";
	let t_1;

	return {
		c() {
			td = element("td");
			t_1 = text(t_1_value);
			attr(td, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, td, anchor);
			append(td, t_1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*profile*/ 268435456 && t_1_value !== (t_1_value = /*show*/ ctx[53](/*key*/ ctx[88]) + "")) set_data(t_1, t_1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(td);
			}
		}
	};
}

// (97:1069) {#each profile as p}
function create_each_block_9(ctx) {
	let tr;
	let th;
	let t_1_value = /*p*/ ctx[110] + "";
	let t_1;

	let each_value_10 = ensure_array_like([
		`temp-${/*p*/ ctx[110]}h`,
		`dewPoint-${/*p*/ ctx[110]}h`,
		`rh-${/*p*/ ctx[110]}h`,
		`wind-${/*p*/ ctx[110]}h`,
		`windDir-${/*p*/ ctx[110]}h`,
		`gh-${/*p*/ ctx[110]}h`
	]);

	let each_blocks = [];

	for (let i = 0; i < 6; i += 1) {
		each_blocks[i] = create_each_block_10(get_each_context_10(ctx, each_value_10, i));
	}

	return {
		c() {
			tr = element("tr");
			th = element("th");
			t_1 = text(t_1_value);

			for (let i = 0; i < 6; i += 1) {
				each_blocks[i].c();
			}

			attr(th, "class", "svelte-oh3hkl");
			attr(tr, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, tr, anchor);
			append(tr, th);
			append(th, t_1);

			for (let i = 0; i < 6; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(tr, null);
				}
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*profile*/ 268435456 && t_1_value !== (t_1_value = /*p*/ ctx[110] + "")) set_data(t_1, t_1_value);

			if (dirty[0] & /*profile*/ 268435456 | dirty[1] & /*show*/ 4194304) {
				each_value_10 = ensure_array_like([
					`temp-${/*p*/ ctx[110]}h`,
					`dewPoint-${/*p*/ ctx[110]}h`,
					`rh-${/*p*/ ctx[110]}h`,
					`wind-${/*p*/ ctx[110]}h`,
					`windDir-${/*p*/ ctx[110]}h`,
					`gh-${/*p*/ ctx[110]}h`
				]);

				let i;

				for (i = 0; i < 6; i += 1) {
					const child_ctx = get_each_context_10(ctx, each_value_10, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_10(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(tr, null);
					}
				}

				for (; i < 6; i += 1) {
					each_blocks[i].d(1);
				}
			}
		},
		d(detaching) {
			if (detaching) {
				detach(tr);
			}

			destroy_each(each_blocks, detaching);
		}
	};
}

// (98:1) {#if hodo.length>=2}
function create_if_block_10(ctx) {
	let div;
	let svg;
	let line0;
	let line1;
	let polyline;
	let polyline_points_value;
	let each_value_8 = ensure_array_like([0.25, 0.5, 0.75, 1]);
	let each_blocks_1 = [];

	for (let i = 0; i < 4; i += 1) {
		each_blocks_1[i] = create_each_block_8(get_each_context_8(ctx, each_value_8, i));
	}

	let each_value_7 = ensure_array_like(/*hodo*/ ctx[18]);
	let each_blocks = [];

	for (let i = 0; i < each_value_7.length; i += 1) {
		each_blocks[i] = create_each_block_7(get_each_context_7(ctx, each_value_7, i));
	}

	return {
		c() {
			div = element("div");
			div.innerHTML = `<h2 class="svelte-oh3hkl">Wind hodograph</h2><small class="svelte-oh3hkl">u / v · m/s · above model terrain</small>`;
			svg = svg_element("svg");
			line0 = svg_element("line");
			line1 = svg_element("line");

			for (let i = 0; i < 4; i += 1) {
				each_blocks_1[i].c();
			}

			polyline = svg_element("polyline");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div, "class", "section-title svelte-oh3hkl");
			attr(line0, "x1", "20");
			attr(line0, "y1", "120");
			attr(line0, "x2", "220");
			attr(line0, "y2", "120");
			attr(line0, "stroke", "#405363");
			attr(line0, "class", "svelte-oh3hkl");
			attr(line1, "x1", "120");
			attr(line1, "y1", "20");
			attr(line1, "x2", "120");
			attr(line1, "y2", "220");
			attr(line1, "stroke", "#405363");
			attr(line1, "class", "svelte-oh3hkl");
			attr(polyline, "points", polyline_points_value = /*hodo*/ ctx[18].map(/*func_2*/ ctx[80]).join(' '));
			attr(polyline, "fill", "none");
			attr(polyline, "stroke", "#69ddc3");
			attr(polyline, "stroke-width", "2");
			attr(polyline, "class", "svelte-oh3hkl");
			attr(svg, "class", "hodograph svelte-oh3hkl");
			attr(svg, "viewBox", "0 0 240 240");
			attr(svg, "role", "img");
			attr(svg, "aria-label", "Wind hodograph in metres per second");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			insert(target, svg, anchor);
			append(svg, line0);
			append(svg, line1);

			for (let i = 0; i < 4; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(svg, null);
				}
			}

			append(svg, polyline);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(svg, null);
				}
			}
		},
		p(ctx, dirty) {
			if (dirty[1] & /*hodoScale*/ 8) {
				each_value_8 = ensure_array_like([0.25, 0.5, 0.75, 1]);
				let i;

				for (i = 0; i < 4; i += 1) {
					const child_ctx = get_each_context_8(ctx, each_value_8, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_8(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(svg, polyline);
					}
				}

				for (; i < 4; i += 1) {
					each_blocks_1[i].d(1);
				}
			}

			if (dirty[0] & /*hodo*/ 262144 | dirty[1] & /*hodoScale*/ 8 && polyline_points_value !== (polyline_points_value = /*hodo*/ ctx[18].map(/*func_2*/ ctx[80]).join(' '))) {
				attr(polyline, "points", polyline_points_value);
			}

			if (dirty[0] & /*hodo*/ 262144 | dirty[1] & /*hodoScale*/ 8) {
				each_value_7 = ensure_array_like(/*hodo*/ ctx[18]);
				let i;

				for (i = 0; i < each_value_7.length; i += 1) {
					const child_ctx = get_each_context_7(ctx, each_value_7, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_7(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(svg, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_7.length;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(div);
				detach(svg);
			}

			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
		}
	};
}

// (98:348) {#each [0.25,0.5,0.75,1] as r}
function create_each_block_8(ctx) {
	let circle;
	let text_1;
	let t_1_value = Math.round(/*hodoScale*/ ctx[34] * /*r*/ ctx[97]) + "";
	let t_1;

	return {
		c() {
			circle = svg_element("circle");
			text_1 = svg_element("text");
			t_1 = text(t_1_value);
			attr(circle, "cx", "120");
			attr(circle, "cy", "120");
			attr(circle, "r", /*r*/ ctx[97] * 100);
			attr(circle, "fill", "none");
			attr(circle, "stroke", "#293a48");
			attr(circle, "class", "svelte-oh3hkl");
			attr(text_1, "x", "123");
			attr(text_1, "y", 120 - /*r*/ ctx[97] * 100 + 10);
			attr(text_1, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, circle, anchor);
			insert(target, text_1, anchor);
			append(text_1, t_1);
		},
		p(ctx, dirty) {
			if (dirty[1] & /*hodoScale*/ 8 && t_1_value !== (t_1_value = Math.round(/*hodoScale*/ ctx[34] * /*r*/ ctx[97]) + "")) set_data(t_1, t_1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(circle);
				detach(text_1);
			}
		}
	};
}

// (98:659) {#each hodo as p}
function create_each_block_7(ctx) {
	let circle;
	let title;
	let t0_value = /*p*/ ctx[110].p + "";
	let t0;
	let t1;
	let t2_value = /*p*/ ctx[110].wind + "";
	let t2;
	let t3;
	let t4_value = /*p*/ ctx[110].dir + "";
	let t4;
	let t5;
	let circle_cx_value;
	let circle_cy_value;

	return {
		c() {
			circle = svg_element("circle");
			title = svg_element("title");
			t0 = text(t0_value);
			t1 = text(" hPa: ");
			t2 = text(t2_value);
			t3 = text(" m/s from ");
			t4 = text(t4_value);
			t5 = text("°");
			attr(title, "class", "svelte-oh3hkl");
			attr(circle, "cx", circle_cx_value = 120 + /*p*/ ctx[110].u / /*hodoScale*/ ctx[34] * 100);
			attr(circle, "cy", circle_cy_value = 120 - /*p*/ ctx[110].v / /*hodoScale*/ ctx[34] * 100);
			attr(circle, "r", "2");
			attr(circle, "fill", "#f4ba77");
			attr(circle, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, circle, anchor);
			append(circle, title);
			append(title, t0);
			append(title, t1);
			append(title, t2);
			append(title, t3);
			append(title, t4);
			append(title, t5);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*hodo*/ 262144 && t0_value !== (t0_value = /*p*/ ctx[110].p + "")) set_data(t0, t0_value);
			if (dirty[0] & /*hodo*/ 262144 && t2_value !== (t2_value = /*p*/ ctx[110].wind + "")) set_data(t2, t2_value);
			if (dirty[0] & /*hodo*/ 262144 && t4_value !== (t4_value = /*p*/ ctx[110].dir + "")) set_data(t4, t4_value);

			if (dirty[0] & /*hodo*/ 262144 | dirty[1] & /*hodoScale*/ 8 && circle_cx_value !== (circle_cx_value = 120 + /*p*/ ctx[110].u / /*hodoScale*/ ctx[34] * 100)) {
				attr(circle, "cx", circle_cx_value);
			}

			if (dirty[0] & /*hodo*/ 262144 | dirty[1] & /*hodoScale*/ 8 && circle_cy_value !== (circle_cy_value = 120 - /*p*/ ctx[110].v / /*hodoScale*/ ctx[34] * 100)) {
				attr(circle, "cy", circle_cy_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(circle);
			}
		}
	};
}

// (78:23) {#each lines as line}
function create_each_block_6(ctx) {
	let button;
	let small;
	let t0_value = /*line*/ ctx[107].label + "";
	let t0;
	let span;
	let t1_value = /*line*/ ctx[107].text + "";
	let t1;
	let mounted;
	let dispose;

	function click_handler_6() {
		return /*click_handler_6*/ ctx[76](/*line*/ ctx[107]);
	}

	return {
		c() {
			button = element("button");
			small = element("small");
			t0 = text(t0_value);
			span = element("span");
			t1 = text(t1_value);
			attr(small, "class", "svelte-oh3hkl");
			attr(span, "class", "svelte-oh3hkl");
			attr(button, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, small);
			append(small, t0);
			append(button, span);
			append(span, t1);

			if (!mounted) {
				dispose = listen(button, "click", click_handler_6);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[1] & /*lines*/ 256 && t0_value !== (t0_value = /*line*/ ctx[107].label + "")) set_data(t0, t0_value);
			if (dirty[1] & /*lines*/ 256 && t1_value !== (t1_value = /*line*/ ctx[107].text + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(button);
			}

			mounted = false;
			dispose();
		}
	};
}

// (79:20) {#each cards as f}
function create_each_block_5(ctx) {
	let button;
	let small;
	let t0_value = /*f*/ ctx[104].label + "";
	let t0;
	let strong;
	let t1_value = format(at(/*f*/ ctx[104], /*valid*/ ctx[14]), /*f*/ ctx[104].unit, /*prefs*/ ctx[10]) + "";
	let t1;
	let span;

	let t2_value = (/*f*/ ctx[104].section === 'derived'
	? 'Calculated'
	: /*f*/ ctx[104].ts.length
		? /*served*/ ctx[38]
		: 'Not supplied') + "";

	let t2;
	let mounted;
	let dispose;

	function click_handler_7() {
		return /*click_handler_7*/ ctx[77](/*f*/ ctx[104]);
	}

	return {
		c() {
			button = element("button");
			small = element("small");
			t0 = text(t0_value);
			strong = element("strong");
			t1 = text(t1_value);
			span = element("span");
			t2 = text(t2_value);
			attr(small, "class", "svelte-oh3hkl");
			attr(strong, "class", "svelte-oh3hkl");
			attr(span, "class", "svelte-oh3hkl");
			attr(button, "class", "card svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, small);
			append(small, t0);
			append(button, strong);
			append(strong, t1);
			append(button, span);
			append(span, t2);

			if (!mounted) {
				dispose = listen(button, "click", click_handler_7);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[1] & /*cards*/ 512 && t0_value !== (t0_value = /*f*/ ctx[104].label + "")) set_data(t0, t0_value);
			if (dirty[0] & /*valid, prefs*/ 17408 | dirty[1] & /*cards*/ 512 && t1_value !== (t1_value = format(at(/*f*/ ctx[104], /*valid*/ ctx[14]), /*f*/ ctx[104].unit, /*prefs*/ ctx[10]) + "")) set_data(t1, t1_value);

			if (dirty[1] & /*cards, served*/ 640 && t2_value !== (t2_value = (/*f*/ ctx[104].section === 'derived'
			? 'Calculated'
			: /*f*/ ctx[104].ts.length
				? /*served*/ ctx[38]
				: 'Not supplied') + "")) set_data(t2, t2_value);
		},
		d(detaching) {
			if (detaching) {
				detach(button);
			}

			mounted = false;
			dispose();
		}
	};
}

// (90:90) {:else}
function create_else_block(ctx) {
	let p_1;

	return {
		c() {
			p_1 = element("p");
			p_1.textContent = "Temperature trend unavailable for this forecast window.";
			attr(p_1, "class", "footnote svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, p_1, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(p_1);
			}
		}
	};
}

// (82:1) {#if trendValues.length}
function create_if_block_4(ctx) {
	let div1;
	let div0;
	let span0;
	let i0;
	let t0;
	let b0;
	let t1_value = format(/*trendMin*/ ctx[31] + 1, 'K', /*prefs*/ ctx[10]) + "";
	let t1;
	let t2;
	let t3_value = format(/*trendMax*/ ctx[30] - 1, 'K', /*prefs*/ ctx[10]) + "";
	let t3;
	let span1;
	let i1;
	let t4;
	let b1;
	let t5;
	let t6_value = format(/*rainPeak*/ ctx[15], 'mm', /*prefs*/ ctx[10]) + "";
	let t6;
	let t7;
	let t8;
	let svg;
	let path;
	let path_d_value;
	let small;
	let each_value_4 = ensure_array_like([24, 70, 116]);
	let each_blocks_1 = [];

	for (let i = 0; i < 3; i += 1) {
		each_blocks_1[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
	}

	let each_value_3 = ensure_array_like(/*slots*/ ctx[16]);
	let each_blocks = [];

	for (let i = 0; i < each_value_3.length; i += 1) {
		each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
	}

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			span0 = element("span");
			i0 = element("i");
			t0 = text("Temperature ");
			b0 = element("b");
			t1 = text(t1_value);
			t2 = text(" – ");
			t3 = text(t3_value);
			span1 = element("span");
			i1 = element("i");
			t4 = text("Rain ");
			b1 = element("b");
			t5 = text("max ");
			t6 = text(t6_value);
			t7 = text("/step");
			t8 = space();
			svg = svg_element("svg");

			for (let i = 0; i < 3; i += 1) {
				each_blocks_1[i].c();
			}

			path = svg_element("path");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			small = element("small");
			small.textContent = "Read exact values and select a time in the table below.";
			attr(i0, "class", "svelte-oh3hkl");
			attr(b0, "class", "svelte-oh3hkl");
			attr(span0, "class", "svelte-oh3hkl");
			attr(i1, "class", "svelte-oh3hkl");
			attr(b1, "class", "svelte-oh3hkl");
			attr(span1, "class", "svelte-oh3hkl");
			attr(div0, "class", "trend-legend svelte-oh3hkl");
			attr(path, "d", path_d_value = /*trendPath*/ ctx[54](/*slots*/ ctx[16], /*trendMin*/ ctx[31], /*trendMax*/ ctx[30]));
			attr(path, "fill", "none");
			attr(path, "stroke", "#75e5cd");
			attr(path, "stroke-width", "3");
			attr(path, "stroke-linecap", "round");
			attr(path, "class", "svelte-oh3hkl");
			attr(svg, "viewBox", "0 0 560 174");
			attr(svg, "role", "img");
			attr(svg, "aria-label", "48-hour temperature trend above precipitation bars; the two charts use separate scales");
			attr(svg, "class", "svelte-oh3hkl");
			attr(small, "class", "svelte-oh3hkl");
			attr(div1, "class", "trend svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div0, span0);
			append(span0, i0);
			append(span0, t0);
			append(span0, b0);
			append(b0, t1);
			append(b0, t2);
			append(b0, t3);
			append(div0, span1);
			append(span1, i1);
			append(span1, t4);
			append(span1, b1);
			append(b1, t5);
			append(b1, t6);
			append(b1, t7);
			append(div1, t8);
			append(div1, svg);

			for (let i = 0; i < 3; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(svg, null);
				}
			}

			append(svg, path);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(svg, null);
				}
			}

			append(div1, small);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*prefs*/ 1024 | dirty[1] & /*trendMin*/ 1 && t1_value !== (t1_value = format(/*trendMin*/ ctx[31] + 1, 'K', /*prefs*/ ctx[10]) + "")) set_data(t1, t1_value);
			if (dirty[0] & /*trendMax, prefs*/ 1073742848 && t3_value !== (t3_value = format(/*trendMax*/ ctx[30] - 1, 'K', /*prefs*/ ctx[10]) + "")) set_data(t3, t3_value);
			if (dirty[0] & /*rainPeak, prefs*/ 33792 && t6_value !== (t6_value = format(/*rainPeak*/ ctx[15], 'mm', /*prefs*/ ctx[10]) + "")) set_data(t6, t6_value);

			if (dirty[0] & /*slots, trendMax*/ 1073807360 | dirty[1] & /*trendMin*/ 1 && path_d_value !== (path_d_value = /*trendPath*/ ctx[54](/*slots*/ ctx[16], /*trendMin*/ ctx[31], /*trendMax*/ ctx[30]))) {
				attr(path, "d", path_d_value);
			}

			if (dirty[0] & /*slots, prefs, trendMax, data, valid, rainMax*/ 1610695744 | dirty[1] & /*trendMin*/ 1) {
				each_value_3 = ensure_array_like(/*slots*/ ctx[16]);
				let i;

				for (i = 0; i < each_value_3.length; i += 1) {
					const child_ctx = get_each_context_3(ctx, each_value_3, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_3(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(svg, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_3.length;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(div1);
			}

			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
		}
	};
}

// (84:1) {#each [24,70,116] as y}
function create_each_block_4(ctx) {
	let line_1;

	return {
		c() {
			line_1 = svg_element("line");
			attr(line_1, "x1", "18");
			attr(line_1, "x2", "542");
			attr(line_1, "y1", /*y*/ ctx[101]);
			attr(line_1, "y2", /*y*/ ctx[101]);
			attr(line_1, "stroke", "currentColor");
			attr(line_1, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, line_1, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(line_1);
			}
		}
	};
}

// (87:1) {#if finite(r)}
function create_if_block_8(ctx) {
	let rect;
	let rect_x_value;
	let rect_y_value;
	let rect_height_value;
	let rect_opacity_value;

	return {
		c() {
			rect = svg_element("rect");
			attr(rect, "x", rect_x_value = /*x*/ ctx[98] - 5);
			attr(rect, "y", rect_y_value = 151 - /*r*/ ctx[97] / /*rainMax*/ ctx[29] * 24);
			attr(rect, "width", "10");
			attr(rect, "height", rect_height_value = Math.max(1, /*r*/ ctx[97] / /*rainMax*/ ctx[29] * 24));
			attr(rect, "rx", "3");
			attr(rect, "fill", "#78baff");
			attr(rect, "opacity", rect_opacity_value = /*r*/ ctx[97] > 0 ? .8 : .15);
			attr(rect, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, rect, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*slots*/ 65536 && rect_x_value !== (rect_x_value = /*x*/ ctx[98] - 5)) {
				attr(rect, "x", rect_x_value);
			}

			if (dirty[0] & /*data, slots, rainMax*/ 536936512 && rect_y_value !== (rect_y_value = 151 - /*r*/ ctx[97] / /*rainMax*/ ctx[29] * 24)) {
				attr(rect, "y", rect_y_value);
			}

			if (dirty[0] & /*data, slots, rainMax*/ 536936512 && rect_height_value !== (rect_height_value = Math.max(1, /*r*/ ctx[97] / /*rainMax*/ ctx[29] * 24))) {
				attr(rect, "height", rect_height_value);
			}

			if (dirty[0] & /*data, slots*/ 65600 && rect_opacity_value !== (rect_opacity_value = /*r*/ ctx[97] > 0 ? .8 : .15)) {
				attr(rect, "opacity", rect_opacity_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(rect);
			}
		}
	};
}

// (88:1) {#if t===valid}
function create_if_block_6(ctx) {
	let line_1;
	let line_1_x__value;
	let line_1_x__value_1;
	let show_if = finite(/*v*/ ctx[96]);
	let if_block_anchor;
	let if_block = show_if && create_if_block_7(ctx);

	return {
		c() {
			line_1 = svg_element("line");
			if (if_block) if_block.c();
			if_block_anchor = empty();
			attr(line_1, "x1", line_1_x__value = /*x*/ ctx[98]);
			attr(line_1, "x2", line_1_x__value_1 = /*x*/ ctx[98]);
			attr(line_1, "y1", "14");
			attr(line_1, "y2", "153");
			attr(line_1, "stroke", "#75e5cd");
			attr(line_1, "stroke-dasharray", "3 4");
			attr(line_1, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, line_1, anchor);
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*slots*/ 65536 && line_1_x__value !== (line_1_x__value = /*x*/ ctx[98])) {
				attr(line_1, "x1", line_1_x__value);
			}

			if (dirty[0] & /*slots*/ 65536 && line_1_x__value_1 !== (line_1_x__value_1 = /*x*/ ctx[98])) {
				attr(line_1, "x2", line_1_x__value_1);
			}

			if (dirty[0] & /*data, slots*/ 65600) show_if = finite(/*v*/ ctx[96]);

			if (show_if) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_7(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(line_1);
				detach(if_block_anchor);
			}

			if (if_block) if_block.d(detaching);
		}
	};
}

// (88:94) {#if finite(v)}
function create_if_block_7(ctx) {
	let circle;
	let circle_cx_value;
	let circle_cy_value;

	return {
		c() {
			circle = svg_element("circle");
			attr(circle, "cx", circle_cx_value = /*x*/ ctx[98]);
			attr(circle, "cy", circle_cy_value = 24 + (/*trendMax*/ ctx[30] - /*v*/ ctx[96]) / (/*trendMax*/ ctx[30] - /*trendMin*/ ctx[31]) * 92);
			attr(circle, "r", "5");
			attr(circle, "fill", "#75e5cd");
			attr(circle, "stroke", "#10282a");
			attr(circle, "stroke-width", "3");
			attr(circle, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, circle, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*slots*/ 65536 && circle_cx_value !== (circle_cx_value = /*x*/ ctx[98])) {
				attr(circle, "cx", circle_cx_value);
			}

			if (dirty[0] & /*trendMax, data, slots*/ 1073807424 | dirty[1] & /*trendMin*/ 1 && circle_cy_value !== (circle_cy_value = 24 + (/*trendMax*/ ctx[30] - /*v*/ ctx[96]) / (/*trendMax*/ ctx[30] - /*trendMin*/ ctx[31]) * 92)) {
				attr(circle, "cy", circle_cy_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(circle);
			}
		}
	};
}

// (89:1) {#if i%4===0}
function create_if_block_5(ctx) {
	let text_1;

	let t_1_value = new Date(/*t*/ ctx[91]).toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		.../*prefs*/ ctx[10].local ? {} : { timeZone: 'UTC' }
	}) + "";

	let t_1;
	let text_1_x_value;
	let text_1_text_anchor_value;

	return {
		c() {
			text_1 = svg_element("text");
			t_1 = text(t_1_value);
			attr(text_1, "x", text_1_x_value = /*x*/ ctx[98]);
			attr(text_1, "y", "170");

			attr(text_1, "text-anchor", text_1_text_anchor_value = /*i*/ ctx[100] === 0
			? 'start'
			: /*i*/ ctx[100] === /*slots*/ ctx[16].length - 1
				? 'end'
				: 'middle');

			attr(text_1, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, text_1, anchor);
			append(text_1, t_1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*slots, prefs*/ 66560 && t_1_value !== (t_1_value = new Date(/*t*/ ctx[91]).toLocaleTimeString('en-GB', {
				hour: '2-digit',
				minute: '2-digit',
				.../*prefs*/ ctx[10].local ? {} : { timeZone: 'UTC' }
			}) + "")) set_data(t_1, t_1_value);

			if (dirty[0] & /*slots*/ 65536 && text_1_x_value !== (text_1_x_value = /*x*/ ctx[98])) {
				attr(text_1, "x", text_1_x_value);
			}

			if (dirty[0] & /*slots*/ 65536 && text_1_text_anchor_value !== (text_1_text_anchor_value = /*i*/ ctx[100] === 0
			? 'start'
			: /*i*/ ctx[100] === /*slots*/ ctx[16].length - 1
				? 'end'
				: 'middle')) {
				attr(text_1, "text-anchor", text_1_text_anchor_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(text_1);
			}
		}
	};
}

// (86:1) {#each slots as t,i}
function create_each_block_3(ctx) {
	let show_if = finite(/*r*/ ctx[97]);
	let if_block0_anchor;
	let if_block1_anchor;
	let if_block2_anchor;
	let if_block0 = show_if && create_if_block_8(ctx);
	let if_block1 = /*t*/ ctx[91] === /*valid*/ ctx[14] && create_if_block_6(ctx);
	let if_block2 = /*i*/ ctx[100] % 4 === 0 && create_if_block_5(ctx);

	return {
		c() {
			if (if_block0) if_block0.c();
			if_block0_anchor = empty();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			if (if_block2) if_block2.c();
			if_block2_anchor = empty();
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, if_block0_anchor, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, if_block1_anchor, anchor);
			if (if_block2) if_block2.m(target, anchor);
			insert(target, if_block2_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*data, slots*/ 65600) show_if = finite(/*r*/ ctx[97]);

			if (show_if) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_8(ctx);
					if_block0.c();
					if_block0.m(if_block0_anchor.parentNode, if_block0_anchor);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*t*/ ctx[91] === /*valid*/ ctx[14]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_6(ctx);
					if_block1.c();
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*i*/ ctx[100] % 4 === 0) if_block2.p(ctx, dirty);
		},
		d(detaching) {
			if (detaching) {
				detach(if_block0_anchor);
				detach(if_block1_anchor);
				detach(if_block2_anchor);
			}

			if (if_block0) if_block0.d(detaching);
			if (if_block1) if_block1.d(detaching);
			if (if_block2) if_block2.d(detaching);
		}
	};
}

// (92:127) {#each slots as t}
function create_each_block_2(ctx) {
	let th;
	let button;

	let t0_value = new Date(/*t*/ ctx[91]).toLocaleDateString('en-GB', {
		day: '2-digit',
		.../*prefs*/ ctx[10].local ? {} : { timeZone: 'UTC' }
	}) + "";

	let t0;
	let br;

	let t1_value = new Date(/*t*/ ctx[91]).toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		.../*prefs*/ ctx[10].local ? {} : { timeZone: 'UTC' }
	}) + "";

	let t1;
	let mounted;
	let dispose;

	function click_handler_8() {
		return /*click_handler_8*/ ctx[78](/*t*/ ctx[91]);
	}

	return {
		c() {
			th = element("th");
			button = element("button");
			t0 = text(t0_value);
			br = element("br");
			t1 = text(t1_value);
			attr(br, "class", "svelte-oh3hkl");
			attr(button, "class", "svelte-oh3hkl");
			toggle_class(button, "chosen", /*t*/ ctx[91] === /*valid*/ ctx[14]);
			attr(th, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, th, anchor);
			append(th, button);
			append(button, t0);
			append(button, br);
			append(button, t1);

			if (!mounted) {
				dispose = listen(button, "click", click_handler_8);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;

			if (dirty[0] & /*slots, prefs*/ 66560 && t0_value !== (t0_value = new Date(/*t*/ ctx[91]).toLocaleDateString('en-GB', {
				day: '2-digit',
				.../*prefs*/ ctx[10].local ? {} : { timeZone: 'UTC' }
			}) + "")) set_data(t0, t0_value);

			if (dirty[0] & /*slots, prefs*/ 66560 && t1_value !== (t1_value = new Date(/*t*/ ctx[91]).toLocaleTimeString('en-GB', {
				hour: '2-digit',
				minute: '2-digit',
				.../*prefs*/ ctx[10].local ? {} : { timeZone: 'UTC' }
			}) + "")) set_data(t1, t1_value);

			if (dirty[0] & /*slots, valid*/ 81920) {
				toggle_class(button, "chosen", /*t*/ ctx[91] === /*valid*/ ctx[14]);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(th);
			}

			mounted = false;
			dispose();
		}
	};
}

// (92:571) {#each slots as t}
function create_each_block_1(ctx) {
	let td;
	let t_1_value = /*show*/ ctx[53](/*key*/ ctx[88], /*t*/ ctx[91]) + "";
	let t_1;

	return {
		c() {
			td = element("td");
			t_1 = text(t_1_value);
			attr(td, "class", "svelte-oh3hkl");
			toggle_class(td, "wet", /*key*/ ctx[88] === 'precipAmount' && value(/*data*/ ctx[6], /*key*/ ctx[88], /*t*/ ctx[91]) > 0);
		},
		m(target, anchor) {
			insert(target, td, anchor);
			append(td, t_1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*slots*/ 65536 && t_1_value !== (t_1_value = /*show*/ ctx[53](/*key*/ ctx[88], /*t*/ ctx[91]) + "")) set_data(t_1, t_1_value);

			if (dirty[0] & /*data, slots*/ 65600) {
				toggle_class(td, "wet", /*key*/ ctx[88] === 'precipAmount' && value(/*data*/ ctx[6], /*key*/ ctx[88], /*t*/ ctx[91]) > 0);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(td);
			}
		}
	};
}

// (92:463) {#each ['temperature','dewPoint','wind','windGust','precipAmount'] as key}
function create_each_block(ctx) {
	let tr;
	let th;
	let each_value_1 = ensure_array_like(/*slots*/ ctx[16]);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	return {
		c() {
			tr = element("tr");
			th = element("th");
			th.textContent = `${describe(/*key*/ ctx[88]).label}`;

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(th, "class", "svelte-oh3hkl");
			attr(tr, "class", "svelte-oh3hkl");
		},
		m(target, anchor) {
			insert(target, tr, anchor);
			append(tr, th);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(tr, null);
				}
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*data, slots*/ 65600 | dirty[1] & /*show*/ 4194304) {
				each_value_1 = ensure_array_like(/*slots*/ ctx[16]);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(tr, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_1.length;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(tr);
			}

			destroy_each(each_blocks, detaching);
		}
	};
}

function create_fragment$1(ctx) {
	let section;
	let header;
	let div1;
	let button0;
	let t5;
	let t6;
	let div3;
	let div2;
	let small;
	let strong;

	let t8_value = (/*location*/ ctx[0]
	? `${/*location*/ ctx[0].lat.toFixed(3)}°, ${/*location*/ ctx[0].lon.toFixed(3)}°`
	: 'Click a location on Windy') + "";

	let t8;
	let button1;
	let t9_value = (/*isFavorite*/ ctx[32] ? '★ Saved' : '☆ Save point') + "";
	let t9;
	let button1_disabled_value;
	let t10;
	let t11;
	let div4;
	let label_1;
	let t12;
	let select;
	let button2;
	let t13;
	let button2_disabled_value;
	let t14;
	let t15;
	let t16;
	let nav;
	let t17;
	let mounted;
	let dispose;
	let if_block0 = /*demo*/ ctx[2] && create_if_block_24();
	let if_block1 = /*placeName*/ ctx[4] && create_if_block_23(ctx);
	let if_block2 = /*favorites*/ ctx[12].length && create_if_block_22(ctx);
	let each_value_22 = ensure_array_like(Object.entries(MODELS));
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_22.length; i += 1) {
		each_blocks_1[i] = create_each_block_22(get_each_context_22(ctx, each_value_22, i));
	}

	let if_block3 = /*data*/ ctx[6] && !/*busy*/ ctx[21] && /*view*/ ctx[23] === 'Brief' && create_if_block_21(ctx);
	let if_block4 = /*settings*/ ctx[24] && create_if_block_20(ctx);
	let each_value_21 = ensure_array_like(['Brief', 'Profile', 'Compare', 'Parameters', 'Coverage']);
	let each_blocks = [];

	for (let i = 0; i < 5; i += 1) {
		each_blocks[i] = create_each_block_21(get_each_context_21(ctx, each_value_21, i));
	}

	function select_block_type(ctx, dirty) {
		if (/*busy*/ ctx[21]) return create_if_block;
		if (/*error*/ ctx[22]) return create_if_block_1;
		if (/*data*/ ctx[6]) return create_if_block_2;
		return create_else_block_2;
	}

	let current_block_type = select_block_type(ctx);
	let if_block5 = current_block_type(ctx);

	return {
		c() {
			section = element("section");
			header = element("header");
			div1 = element("div");
			div1.innerHTML = `<span class="mark svelte-oh3hkl">◉</span><div class="svelte-oh3hkl"><h1 class="svelte-oh3hkl">WeatherScope<span class="svelte-oh3hkl">POINT FORECAST</span></h1><p class="svelte-oh3hkl">Every detail. One clear forecast.</p></div>`;
			button0 = element("button");
			button0.textContent = "⚙";
			t5 = space();
			if (if_block0) if_block0.c();
			t6 = space();
			div3 = element("div");
			div2 = element("div");
			small = element("small");
			small.textContent = "YOUR FORECAST POINT";
			if (if_block1) if_block1.c();
			strong = element("strong");
			t8 = text(t8_value);
			button1 = element("button");
			t9 = text(t9_value);
			t10 = space();
			if (if_block2) if_block2.c();
			t11 = space();
			div4 = element("div");
			label_1 = element("label");
			t12 = text("Baseline ");
			select = element("select");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			button2 = element("button");
			t13 = text("↻ Refresh");
			t14 = space();
			if (if_block3) if_block3.c();
			t15 = space();
			if (if_block4) if_block4.c();
			t16 = space();
			nav = element("nav");

			for (let i = 0; i < 5; i += 1) {
				each_blocks[i].c();
			}

			t17 = space();
			if_block5.c();
			attr(div1, "class", "brand svelte-oh3hkl");
			attr(button0, "class", "icon svelte-oh3hkl");
			attr(button0, "aria-label", "Settings");
			attr(button0, "title", "Settings");
			attr(header, "class", "svelte-oh3hkl");
			attr(small, "class", "svelte-oh3hkl");
			attr(strong, "class", "svelte-oh3hkl");
			attr(div2, "class", "svelte-oh3hkl");
			button1.disabled = button1_disabled_value = !/*location*/ ctx[0];
			attr(button1, "title", "Save or remove favorite");
			attr(button1, "aria-pressed", /*isFavorite*/ ctx[32]);
			attr(button1, "class", "svelte-oh3hkl");
			toggle_class(button1, "saved", /*isFavorite*/ ctx[32]);
			attr(div3, "class", "location svelte-oh3hkl");
			attr(select, "aria-label", "Baseline model");
			attr(select, "class", "svelte-oh3hkl");
			if (/*model*/ ctx[5] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[65].call(select));
			attr(label_1, "class", "svelte-oh3hkl");
			button2.disabled = button2_disabled_value = /*busy*/ ctx[21] || !/*location*/ ctx[0];
			attr(button2, "class", "svelte-oh3hkl");
			attr(div4, "class", "source svelte-oh3hkl");
			attr(nav, "aria-label", "Dashboard views");
			attr(nav, "class", "svelte-oh3hkl");
			attr(section, "class", "weatherscope svelte-oh3hkl");
			attr(section, "aria-label", "WeatherScope meteorological dashboard");
		},
		m(target, anchor) {
			insert(target, section, anchor);
			append(section, header);
			append(header, div1);
			append(header, button0);
			append(section, t5);
			if (if_block0) if_block0.m(section, null);
			append(section, t6);
			append(section, div3);
			append(div3, div2);
			append(div2, small);
			if (if_block1) if_block1.m(div2, null);
			append(div2, strong);
			append(strong, t8);
			append(div3, button1);
			append(button1, t9);
			append(section, t10);
			if (if_block2) if_block2.m(section, null);
			append(section, t11);
			append(section, div4);
			append(div4, label_1);
			append(label_1, t12);
			append(label_1, select);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(select, null);
				}
			}

			select_option(select, /*model*/ ctx[5], true);
			append(div4, button2);
			append(button2, t13);
			append(section, t14);
			if (if_block3) if_block3.m(section, null);
			append(section, t15);
			if (if_block4) if_block4.m(section, null);
			append(section, t16);
			append(section, nav);

			for (let i = 0; i < 5; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(nav, null);
				}
			}

			append(section, t17);
			if_block5.m(section, null);

			if (!mounted) {
				dispose = [
					listen(button0, "click", /*click_handler*/ ctx[63]),
					listen(button1, "click", /*favorite*/ ctx[50]),
					listen(select, "change", /*select_change_handler*/ ctx[65]),
					listen(select, "change", /*save*/ ctx[43]),
					listen(button2, "click", /*click_handler_2*/ ctx[66])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (/*demo*/ ctx[2]) {
				if (if_block0) ; else {
					if_block0 = create_if_block_24();
					if_block0.c();
					if_block0.m(section, t6);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*placeName*/ ctx[4]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_23(ctx);
					if_block1.c();
					if_block1.m(div2, strong);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty[0] & /*location*/ 1 && t8_value !== (t8_value = (/*location*/ ctx[0]
			? `${/*location*/ ctx[0].lat.toFixed(3)}°, ${/*location*/ ctx[0].lon.toFixed(3)}°`
			: 'Click a location on Windy') + "")) set_data(t8, t8_value);

			if (dirty[1] & /*isFavorite*/ 2 && t9_value !== (t9_value = (/*isFavorite*/ ctx[32] ? '★ Saved' : '☆ Save point') + "")) set_data(t9, t9_value);

			if (dirty[0] & /*location*/ 1 && button1_disabled_value !== (button1_disabled_value = !/*location*/ ctx[0])) {
				button1.disabled = button1_disabled_value;
			}

			if (dirty[1] & /*isFavorite*/ 2) {
				attr(button1, "aria-pressed", /*isFavorite*/ ctx[32]);
			}

			if (dirty[1] & /*isFavorite*/ 2) {
				toggle_class(button1, "saved", /*isFavorite*/ ctx[32]);
			}

			if (/*favorites*/ ctx[12].length) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_22(ctx);
					if_block2.c();
					if_block2.m(section, t11);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (dirty & /*Object*/ 0) {
				each_value_22 = ensure_array_like(Object.entries(MODELS));
				let i;

				for (i = 0; i < each_value_22.length; i += 1) {
					const child_ctx = get_each_context_22(ctx, each_value_22, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_22(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(select, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_22.length;
			}

			if (dirty[0] & /*model*/ 32) {
				select_option(select, /*model*/ ctx[5]);
			}

			if (dirty[0] & /*busy, location*/ 2097153 && button2_disabled_value !== (button2_disabled_value = /*busy*/ ctx[21] || !/*location*/ ctx[0])) {
				button2.disabled = button2_disabled_value;
			}

			if (/*data*/ ctx[6] && !/*busy*/ ctx[21] && /*view*/ ctx[23] === 'Brief') {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block_21(ctx);
					if_block3.c();
					if_block3.m(section, t15);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (/*settings*/ ctx[24]) {
				if (if_block4) {
					if_block4.p(ctx, dirty);
				} else {
					if_block4 = create_if_block_20(ctx);
					if_block4.c();
					if_block4.m(section, t16);
				}
			} else if (if_block4) {
				if_block4.d(1);
				if_block4 = null;
			}

			if (dirty[0] & /*view*/ 8388608 | dirty[1] & /*switchView*/ 262144) {
				each_value_21 = ensure_array_like(['Brief', 'Profile', 'Compare', 'Parameters', 'Coverage']);
				let i;

				for (i = 0; i < 5; i += 1) {
					const child_ctx = get_each_context_21(ctx, each_value_21, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_21(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(nav, null);
					}
				}

				for (; i < 5; i += 1) {
					each_blocks[i].d(1);
				}
			}

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block5) {
				if_block5.p(ctx, dirty);
			} else {
				if_block5.d(1);
				if_block5 = current_block_type(ctx);

				if (if_block5) {
					if_block5.c();
					if_block5.m(section, null);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(section);
			}

			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			destroy_each(each_blocks_1, detaching);
			if (if_block3) if_block3.d();
			if (if_block4) if_block4.d();
			destroy_each(each_blocks, detaching);
			if_block5.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

const func = f => f.key;
const func_1 = f => f.group === 'Profile diagnostics';
const func_3 = e => e.value;
const func_4 = e => e.value;

function instance$1($$self, $$props, $$invalidate) {
	let index;
	let valid;
	let extra;
	let fields;
	let groups;
	let filtered;
	let cards;
	let lines;
	let start;
	let slots;
	let served;
	let selectedField;
	let profile;
	let outlook;
	let confidence;
	let profileRows;
	let hodo;
	let hodoScale;
	let coverage;
	let isFavorite;
	let trendValues;
	let trendMin;
	let trendMax;
	let rainValues;
	let rainPeak;
	let rainMax;

	let { location = null, timestamp = Date.now(), load, onLocation = () => {
		
	}, onTime = () => {
		
	}, demo = false, mapModel = null, placeName = '' } = $$props;

	let model = 'mblue',
		data = null,
		busy = false,
		error = '',
		request = 0,
		view = 'Brief',
		search = '',
		group = 'All',
		selected = null,
		settings = false,
		compareBusy = false,
		comparisons = [],
		comparisonErrors = [],
		compareRequest = 0;

	let prefs = { temp: 'C', wind: 'kt', local: false },
		pins = ['temperature', 'dewPoint', 'wind', 'windGust', 'pressure', 'precipAmount'],
		favorites = [],
		thresholds = { gust: 15, rain: 2 };

	try {
		const saved = JSON.parse(localStorage.getItem('weatherscope-v1') || '{}');
		prefs = { ...prefs, ...saved.prefs };
		if (MODELS[saved.model]) model = saved.model;
		if (saved.thresholds && finite(saved.thresholds.gust) && saved.thresholds.gust > 0 && finite(saved.thresholds.rain) && saved.thresholds.rain > 0) thresholds = saved.thresholds;
		if (Array.isArray(saved.pins)) pins = saved.pins.filter(v => typeof v === 'string').slice(0, 12);
		if (Array.isArray(saved.favorites)) favorites = saved.favorites.filter(p => finite(p.lat) && finite(p.lon) && Math.abs(p.lat) <= 90 && Math.abs(p.lon) <= 180).slice(0, 8);
	} catch {
		
	}

	const save = () => {
		try {
			localStorage.setItem('weatherscope-v1', JSON.stringify({
				prefs,
				pins,
				favorites,
				model,
				thresholds
			}));
		} catch {
			
		}
	};

	async function refresh(loc, source, force = false) {
		const token = ++request;
		compareRequest++;
		$$invalidate(25, compareBusy = false);
		$$invalidate(21, busy = true);
		$$invalidate(22, error = '');
		$$invalidate(6, data = null);
		$$invalidate(9, selected = null);
		$$invalidate(26, comparisons = []);
		$$invalidate(27, comparisonErrors = []);

		try {
			const result = await load(source, loc, force);
			if (token === request) $$invalidate(6, data = result);
		} catch(e) {
			if (token === request) $$invalidate(22, error = e?.message || 'Forecast unavailable. Try again.');
		} finally {
			if (token === request) $$invalidate(21, busy = false);
		}
	}

	onDestroy(() => {
		request++;
		compareRequest++;
	});

	function pin(key) {
		$$invalidate(11, pins = pins.includes(key)
		? pins.filter(k => k !== key)
		: [...pins.slice(-11), key]);

		save();
	}

	function inspect(key) {
		$$invalidate(9, selected = (fields.find(f => f.key === key) || {}).id || null);
		$$invalidate(23, view = 'Parameters');
		$$invalidate(7, search = key);
		$$invalidate(8, group = 'All');
	}

	function chooseTime(t) {
		$$invalidate(56, timestamp = t);
		onTime(t);
	}

	function shortcut(hours) {
		const t = Date.now() + hours * HOUR;
		const i = data ? nearestIndex(data.ts, t) : -1;
		if (i >= 0) chooseTime(data.ts[i]);
	}

	function switchView(name) {
		$$invalidate(23, view = name);
		if (name === 'Compare' && !comparisons.length && !compareBusy && data) compareModels();
	}

	function favorite() {
		if (!location) return;
		const same = p => Math.abs(p.lat - location.lat) < 0.0001 && Math.abs(p.lon - location.lon) < 0.0001;

		$$invalidate(12, favorites = favorites.some(same)
		? favorites.filter(p => !same(p))
		: [...favorites.slice(-7), { ...location, name: placeName || '' }]);

		save();
	}

	async function compareModels() {
		const token = ++compareRequest;
		$$invalidate(25, compareBusy = true);
		$$invalidate(27, comparisonErrors = []);
		const loc = { ...location };
		const source = model;
		const results = await Promise.allSettled(Object.keys(MODELS).filter(m => m !== source).map(async m => ({ m, data: await load(m, loc) })));
		if (token !== compareRequest) return;
		$$invalidate(26, comparisons = results.filter(r => r.status === 'fulfilled').map(r => r.value.data));

		$$invalidate(27, comparisonErrors = results.flatMap((r, i) => r.status === 'rejected'
		? [
				`${Object.keys(MODELS).filter(m => m !== source)[i]}: ${r.reason?.message || 'Unavailable'}`
			]
		: []));

		$$invalidate(25, compareBusy = false);
	}

	function download() {
		if (!data) return;

		const blob = new Blob([
				JSON.stringify(
					{
						exportedAt: new Date().toISOString(),
						location,
						selectedTime: new Date(valid).toISOString(),
						requestedModel: model,
						forecast: data.raw
					},
					null,
					2
				)
			],
		{ type: 'application/json' });

		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'weatherscope-forecast.json';
		a.click();
		setTimeout(() => URL.revokeObjectURL(url), 1000);
	}

	const show = (key, t = valid) => format(value(data, key, t), describe(key).unit, prefs);

	function trendPath(times, min, max) {
		let path = '', drawing = false;

		for (let i = 0; i < times.length; i++) {
			const v = value(data, 'temperature', times[i]);

			if (!finite(v)) {
				drawing = false;
				continue;
			}

			path += `${drawing ? 'L' : 'M'}${18 + i / Math.max(1, times.length - 1) * 524},${24 + (max - v) / (max - min) * 92} `;
			drawing = true;
		}

		return path;
	}

	function profilePath(key) {
		let path = '', drawing = false;

		for (const level of profile) {
			const v = value(data, `${key}-${level}h`, valid);

			if (!finite(v)) {
				drawing = false;
				continue;
			}

			const x = 44 + (v - 273.15 + 80) / 120 * 356,
				y = 20 + Math.log(level / 100) / Math.log(10) * 180;

			path += `${drawing ? 'L' : 'M'}${x},${y} `;
			drawing = true;
		}

		return path;
	}

	const click_handler = () => $$invalidate(24, settings = !settings);
	const click_handler_1 = place => onLocation({ lat: place.lat, lon: place.lon });

	function select_change_handler() {
		model = select_value(this);
		$$invalidate(5, model);
	}

	const click_handler_2 = () => refresh(location, model, true);

	function select0_change_handler() {
		prefs.temp = select_value(this);
		$$invalidate(10, prefs);
	}

	function select1_change_handler() {
		prefs.wind = select_value(this);
		$$invalidate(10, prefs);
	}

	function input0_change_handler() {
		prefs.local = this.checked;
		$$invalidate(10, prefs);
	}

	function input1_input_handler() {
		thresholds.gust = to_number(this.value);
		$$invalidate(13, thresholds);
	}

	function input2_input_handler() {
		thresholds.rain = to_number(this.value);
		$$invalidate(13, thresholds);
	}

	const click_handler_3 = name => switchView(name);
	const click_handler_4 = () => refresh(location, model, true);
	const click_handler_5 = h => shortcut(h);
	const input_handler = e => chooseTime(data.ts[Number(e.currentTarget.value)]);
	const click_handler_6 = line => inspect(line.key);
	const click_handler_7 = f => inspect(f.key);
	const click_handler_8 = t => chooseTime(t);
	const click_handler_9 = f => inspect(f.key);
	const func_2 = p => [120 + p.u / hodoScale * 100, 120 - p.v / hodoScale * 100].join(',');

	function input_input_handler() {
		search = this.value;
		$$invalidate(7, search);
	}

	function select_change_handler_1() {
		group = select_value(this);
		$$invalidate(8, group);
		(((((($$invalidate(42, groups), $$invalidate(60, fields)), $$invalidate(6, data)), $$invalidate(19, extra)), $$invalidate(14, valid)), $$invalidate(20, index)), $$invalidate(56, timestamp));
	}

	const click_handler_10 = () => $$invalidate(9, selected = null);
	const click_handler_11 = f => $$invalidate(9, selected = f.id);
	const click_handler_12 = f => pin(f.key);

	$$self.$$set = $$props => {
		if ('location' in $$props) $$invalidate(0, location = $$props.location);
		if ('timestamp' in $$props) $$invalidate(56, timestamp = $$props.timestamp);
		if ('load' in $$props) $$invalidate(57, load = $$props.load);
		if ('onLocation' in $$props) $$invalidate(1, onLocation = $$props.onLocation);
		if ('onTime' in $$props) $$invalidate(58, onTime = $$props.onTime);
		if ('demo' in $$props) $$invalidate(2, demo = $$props.demo);
		if ('mapModel' in $$props) $$invalidate(3, mapModel = $$props.mapModel);
		if ('placeName' in $$props) $$invalidate(4, placeName = $$props.placeName);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*location, model*/ 33) {
			if (location && model) refresh(location, model);
		}

		if ($$self.$$.dirty[0] & /*data*/ 64 | $$self.$$.dirty[1] & /*timestamp*/ 33554432) {
			$$invalidate(20, index = data ? nearestIndex(data.ts, timestamp) : -1);
		}

		if ($$self.$$.dirty[0] & /*index, data*/ 1048640 | $$self.$$.dirty[1] & /*timestamp*/ 33554432) {
			$$invalidate(14, valid = index >= 0 ? data.ts[index] : timestamp);
		}

		if ($$self.$$.dirty[0] & /*data, valid*/ 16448) {
			$$invalidate(19, extra = data
			? [...derived(data, valid), ...diagnostics(data, valid)]
			: []);
		}

		if ($$self.$$.dirty[0] & /*data, extra*/ 524352) {
			$$invalidate(60, fields = data ? [...data.fields, ...extra] : []);
		}

		if ($$self.$$.dirty[1] & /*fields*/ 536870912) {
			$$invalidate(42, groups = ['All', ...new Set(fields.map(f => f.group))]);
		}

		if ($$self.$$.dirty[0] & /*group, search*/ 384 | $$self.$$.dirty[1] & /*fields*/ 536870912) {
			$$invalidate(41, filtered = fields.filter(f => (group === 'All' || f.group === group) && `${f.label} ${f.key} ${f.section}`.toLowerCase().includes(search.toLowerCase())));
		}

		if ($$self.$$.dirty[0] & /*pins*/ 2048 | $$self.$$.dirty[1] & /*fields*/ 536870912) {
			$$invalidate(40, cards = pins.map(key => fields.find(f => f.key === key) || {
				id: key,
				key,
				...describe(key),
				values: [],
				ts: []
			}));
		}

		if ($$self.$$.dirty[0] & /*data, valid, prefs, thresholds*/ 25664) {
			$$invalidate(39, lines = data ? briefing(data, valid, prefs, thresholds) : []);
		}

		if ($$self.$$.dirty[0] & /*data*/ 64) {
			$$invalidate(62, start = data
			? Math.max(data.ts[0], Math.floor(Date.now() / (3 * HOUR)) * 3 * HOUR)
			: 0);
		}

		if ($$self.$$.dirty[0] & /*data*/ 64 | $$self.$$.dirty[2] & /*start*/ 1) {
			$$invalidate(16, slots = data
			? data.ts.filter(t => t >= start && t <= start + 48 * HOUR)
			: []);
		}

		if ($$self.$$.dirty[0] & /*data, model*/ 96) {
			$$invalidate(38, served = data ? MODELS[data.model] || data.model : MODELS[model]);
		}

		if ($$self.$$.dirty[0] & /*selected*/ 512 | $$self.$$.dirty[1] & /*fields*/ 536870912) {
			$$invalidate(37, selectedField = selected ? fields.find(f => f.id === selected) : null);
		}

		if ($$self.$$.dirty[0] & /*data*/ 64) {
			$$invalidate(28, profile = data
			? [
					...new Set(data.fields.map(f => f.key.match(/^temp-(\d+)h$/)?.[1]).filter(Boolean))
				].map(Number).sort((a, b) => b - a)
			: []);
		}

		if ($$self.$$.dirty[0] & /*data, valid*/ 16448) {
			$$invalidate(36, outlook = data ? windowSummary(data, valid) : null);
		}

		if ($$self.$$.dirty[0] & /*data, valid*/ 16448) {
			$$invalidate(35, confidence = data ? predictability(data, valid) : null);
		}

		if ($$self.$$.dirty[0] & /*data, valid*/ 16448) {
			$$invalidate(61, profileRows = data ? verticalProfile(data, valid) : []);
		}

		if ($$self.$$.dirty[1] & /*profileRows*/ 1073741824) {
			$$invalidate(18, hodo = profileRows.filter(p => p.belowGround === false).map(p => ({ ...p, ...windComponents(p.wind, p.dir) })).filter(p => finite(p.u) && finite(p.v)));
		}

		if ($$self.$$.dirty[0] & /*hodo*/ 262144) {
			$$invalidate(34, hodoScale = Math.max(20, ...hodo.map(p => Math.max(Math.abs(p.u), Math.abs(p.v)))) * 1.1);
		}

		if ($$self.$$.dirty[0] & /*valid*/ 16384 | $$self.$$.dirty[1] & /*fields*/ 536870912) {
			$$invalidate(33, coverage = requirements.map(([label, key, note]) => ({
				label,
				key,
				note,
				available: !!(key && fields.some(f => f.key === key && finite(at(f, valid))))
			})));
		}

		if ($$self.$$.dirty[0] & /*location, favorites*/ 4097) {
			$$invalidate(32, isFavorite = !!location && favorites.some(p => Math.abs(p.lat - location.lat) < 0.0001 && Math.abs(p.lon - location.lon) < 0.0001));
		}

		if ($$self.$$.dirty[0] & /*slots, data*/ 65600) {
			$$invalidate(17, trendValues = slots.map(t => value(data, 'temperature', t)).filter(finite));
		}

		if ($$self.$$.dirty[0] & /*trendValues*/ 131072) {
			$$invalidate(31, trendMin = trendValues.length ? Math.min(...trendValues) - 1 : 0);
		}

		if ($$self.$$.dirty[0] & /*trendValues*/ 131072) {
			$$invalidate(30, trendMax = trendValues.length ? Math.max(...trendValues) + 1 : 1);
		}

		if ($$self.$$.dirty[0] & /*slots, data*/ 65600) {
			$$invalidate(59, rainValues = slots.map(t => value(data, 'precipAmount', t)).filter(finite));
		}

		if ($$self.$$.dirty[1] & /*rainValues*/ 268435456) {
			$$invalidate(15, rainPeak = rainValues.length ? Math.max(...rainValues) : null);
		}

		if ($$self.$$.dirty[0] & /*rainPeak*/ 32768) {
			$$invalidate(29, rainMax = Math.max(1, rainPeak || 0));
		}
	};

	return [
		location,
		onLocation,
		demo,
		mapModel,
		placeName,
		model,
		data,
		search,
		group,
		selected,
		prefs,
		pins,
		favorites,
		thresholds,
		valid,
		rainPeak,
		slots,
		trendValues,
		hodo,
		extra,
		index,
		busy,
		error,
		view,
		settings,
		compareBusy,
		comparisons,
		comparisonErrors,
		profile,
		rainMax,
		trendMax,
		trendMin,
		isFavorite,
		coverage,
		hodoScale,
		confidence,
		outlook,
		selectedField,
		served,
		lines,
		cards,
		filtered,
		groups,
		save,
		refresh,
		pin,
		inspect,
		chooseTime,
		shortcut,
		switchView,
		favorite,
		compareModels,
		download,
		show,
		trendPath,
		profilePath,
		timestamp,
		load,
		onTime,
		rainValues,
		fields,
		profileRows,
		start,
		click_handler,
		click_handler_1,
		select_change_handler,
		click_handler_2,
		select0_change_handler,
		select1_change_handler,
		input0_change_handler,
		input1_input_handler,
		input2_input_handler,
		click_handler_3,
		click_handler_4,
		click_handler_5,
		input_handler,
		click_handler_6,
		click_handler_7,
		click_handler_8,
		click_handler_9,
		func_2,
		input_input_handler,
		select_change_handler_1,
		click_handler_10,
		click_handler_11,
		click_handler_12
	];
}

class App extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$1,
			create_fragment$1,
			safe_not_equal,
			{
				location: 0,
				timestamp: 56,
				load: 57,
				onLocation: 1,
				onTime: 58,
				demo: 2,
				mapModel: 3,
				placeName: 4
			},
			add_css,
			[-1, -1, -1, -1, -1]
		);
	}
}

const config = {
    name: 'windy-plugin-weatherscope'};

const cache=new Map();
async function fetchForecast(model,location,refresh=false){
 const key=`${model}:${location.lat.toFixed(4)},${location.lon.toFixed(4)}`,cached=cache.get(key);
 if(!refresh&&cached&&Date.now()-cached.at<300000)return cached.data;
 const response=await getPointForecastData(model,{...location,days:3,step:3},{header:true,summary:true,meteogram:true,airgram:true,sounding:true,celestial:true});
 const data=normalize(response.data,model);cache.set(key,{at:Date.now(),data});
 if(cache.size>24)cache.delete(cache.keys().next().value);
 return data;
}

/* src\plugin.svelte generated by Svelte v4.2.20 */

function create_fragment(ctx) {
	let section;
	let app;
	let current;

	app = new App({
			props: {
				location: /*location*/ ctx[0],
				timestamp: /*timestamp*/ ctx[1],
				mapModel: /*mapModel*/ ctx[2],
				placeName: /*placeName*/ ctx[3],
				load: fetchForecast,
				onLocation: /*setLocation*/ ctx[4],
				onTime: /*selectTime*/ ctx[5]
			}
		});

	return {
		c() {
			section = element("section");
			create_component(app.$$.fragment);
			attr(section, "class", "plugin__content");
			set_style(section, "padding", "0");
		},
		m(target, anchor) {
			insert(target, section, anchor);
			mount_component(app, section, null);
			current = true;
		},
		p(ctx, [dirty]) {
			const app_changes = {};
			if (dirty & /*location*/ 1) app_changes.location = /*location*/ ctx[0];
			if (dirty & /*timestamp*/ 2) app_changes.timestamp = /*timestamp*/ ctx[1];
			if (dirty & /*mapModel*/ 4) app_changes.mapModel = /*mapModel*/ ctx[2];
			if (dirty & /*placeName*/ 8) app_changes.placeName = /*placeName*/ ctx[3];
			app.$set(app_changes);
		},
		i(local) {
			if (current) return;
			transition_in(app.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(app.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) {
				detach(section);
			}

			destroy_component(app);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let location = null,
		timestamp = Date.now(),
		marker,
		mapModel = store.get('product'),
		placeName = '',
		nameRequest = 0;

	const setLocation = p => {
		const lat = Number(p?.lat), lon = Number(p?.lon ?? p?.lng);
		if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) return;
		$$invalidate(0, location = { lat, lon });
		$$invalidate(3, placeName = '');
		const id = ++nameRequest;

		get(location).then(r => {
			if (id === nameRequest) $$invalidate(3, placeName = r.name || '');
		}).catch(() => {
			
		});

		marker?.remove();
		if (typeof L !== 'undefined') marker = L.marker([lat, lon]).addTo(map);
	};

	const onTime = t => {
		if (Number.isFinite(t)) $$invalidate(1, timestamp = t);
	};

	const onProduct = p => {
		$$invalidate(2, mapModel = p);
	};

	const selectTime = t => {
		$$invalidate(1, timestamp = t);
		store.set('timestamp', t);
	};

	const onopen = params => {
		if (params?.lat != null) setLocation(params); else if (!location) {
			const c = map.getCenter();
			setLocation({ lat: c.lat, lon: c.lng });
		}

		onTime(store.get('timestamp'));
	};

	onMount(() => {
		singleclick.on(config.name, setLocation);
		store.on('timestamp', onTime);
		store.on('product', onProduct);
		if (!location) onopen();
	});

	onDestroy(() => {
		nameRequest++;
		singleclick.off(config.name, setLocation);
		store.off('timestamp', onTime);
		store.off('product', onProduct);
		marker?.remove();
	});

	return [location, timestamp, mapModel, placeName, setLocation, selectTime, onopen];
}

class Plugin extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { onopen: 6 });
	}

	get onopen() {
		return this.$$.ctx[6];
	}
}


// transformCode: Export statement was modified
export { __pluginConfig, Plugin as default };
//# sourceMappingURL=plugin.js.map
