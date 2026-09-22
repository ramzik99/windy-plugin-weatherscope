const __pluginConfig =  {
  "name": "windy-plugin-weatherscope",
  "version": "0.5.1",
  "icon": "◉",
  "title": "WeatherScope",
  "author": "Ramzi Kandah",
  "repository": "https://github.com/ramzik99/windy-plugin-weatherscope",
  "description": "Every detail. One clear forecast. Meteoblue baseline and complete returned-parameter explorer.",
  "desktopUI": "rhpane",
  "mobileUI": "fullscreen",
  "routerPath": "/weatherscope/:lat?/:lon?",
  "addToContextmenu": true,
  "listenToSingleclick": true,
  "private": true,
  "built": 1790059723530,
  "builtReadable": "2026-09-22T06:48:43.530Z"
};

// transformCode: import { map } from '@windy/map';
const { map } = W.map;

// transformCode: import store from '@windy/store';
const store = W.store;

// transformCode: import { register, release, singleclick } from '@windy/singleclick';
const { register, release, singleclick } = W.singleclick;

// transformCode: import { get } from '@windy/reverseName';
const { get } = W.reverseName;

// transformCode: import { getPointForecastData, getMeteogramForecastData, getElevation } from '@windy/fetch';
const { getPointForecastData, getMeteogramForecastData, getElevation } = W.fetch;


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

function null_to_empty(value) {
	return value == null ? '' : value;
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
 * @returns {(event: any) => any} */
function prevent_default(fn) {
	return function (event) {
		event.preventDefault();
		// @ts-ignore
		return fn.call(this, event);
	};
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
 * @template T
 * @param {string} type
 * @param {T} [detail]
 * @param {{ bubbles?: boolean, cancelable?: boolean }} [options]
 * @returns {CustomEvent<T>}
 */
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
	return new CustomEvent(type, { detail, bubbles, cancelable });
}

function construct_svelte_component(component, props) {
	return new component(props);
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

/**
 * Creates an event dispatcher that can be used to dispatch [component events](https://svelte.dev/docs#template-syntax-component-directives-on-eventname).
 * Event dispatchers are functions that can take two arguments: `name` and `detail`.
 *
 * Component events created with `createEventDispatcher` create a
 * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
 * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
 * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
 * property and can contain any type of data.
 *
 * The event dispatcher can be typed to narrow the allowed event names and the type of the `detail` argument:
 * ```ts
 * const dispatch = createEventDispatcher<{
 *  loaded: never; // does not take a detail argument
 *  change: string; // takes a detail argument of type string, which is required
 *  optional: number | null; // takes an optional detail argument of type number
 * }>();
 * ```
 *
 * https://svelte.dev/docs/svelte#createeventdispatcher
 * @template {Record<string, any>} [EventMap=any]
 * @returns {import('./public.js').EventDispatcher<EventMap>}
 */
function createEventDispatcher() {
	const component = get_current_component();
	return (type, detail, { cancelable = false } = {}) => {
		const callbacks = component.$$.callbacks[type];
		if (callbacks) {
			// TODO are there situations where events could be dispatched
			// in a server (non-DOM) environment?
			const event = custom_event(/** @type {string} */ (type), detail, { cancelable });
			callbacks.slice().forEach((fn) => {
				fn.call(component, event);
			});
			return !event.defaultPrevented;
		}
		return true;
	};
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

/** @returns {void} */
function add_flush_callback(fn) {
	flush_callbacks.push(fn);
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
 * @returns {void} */
function group_outros() {
	outros = {
		r: 0,
		c: [],
		p: outros // parent group
	};
}

/**
 * @returns {void} */
function check_outros() {
	if (!outros.r) {
		run_all(outros.c);
	}
	outros = outros.p;
}

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
			if (callback) {
				if (detach) block.d(1);
				callback();
			}
		});
		block.o(local);
	} else if (callback) {
		callback();
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
function bind(component, name, callback) {
	const index = component.$$.props[name];
	if (index !== undefined) {
		component.$$.bound[index] = callback;
		callback(component.$$.ctx[index]);
	}
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

const HOUR$1=3600000;
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
function nearestIndex$1(ts,time,tolerance=90*60000){let best=-1,delta=Infinity;ts.forEach((t,i)=>{const d=Math.abs(t-time);if(d<delta){delta=d;best=i;}});return delta<=tolerance?best:-1;}
function at(field,time){const i=nearestIndex$1(field.ts,time,0);return i<0?null:field.values[i]??null;}
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
 // Round presentation only. Preserve trace precipitation and all raw calculations.
 const displayed=n>0&&n<1&&/^mm|^cm|^in\//.test(unit)?'<1':String(Math.round(n)||0);
 return `${displayed}${u==='raw'?' (raw)':u==='code'?' (code)':' '+u}`;
}
function timeLabel(time,local=false){return new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit',...(local?{}:{timeZone:'UTC'})}).format(new Date(time));}
function derived(data,time){
 const get=k=>value(data,k,time),rows=[];
 const push=(key,label,v,unit,group,method)=>{if(finite(v))rows.push({id:`derived.${key}`,key,label,unit,group,section:'derived',ts:[time],values:[v],method});};
 const t=get('temperature'),td=get('dewPoint');
 if(finite(t)&&finite(td)&&t>150&&td>150&&td<=t){const c=t-273.15,d=td-273.15;push('rh','Relative humidity',Math.min(100,100*Math.exp(17.625*d/(243.04+d)-17.625*c/(243.04+c))),'%','Moisture','Magnus approximation over liquid water using the same-source surface temperature and dew point.');}
 const p=get('pressure'),p0=value(data,'pressure',time-3*HOUR$1),pf=fieldFor(data,'pressure');
 if(pf&&finite(p)&&finite(p0)&&pf.ts.includes(time)&&pf.ts.includes(time-3*HOUR$1))push('pressureTrend','3-hour pressure change',p-p0,'Pa','Surface','Exact forecast timestamps 3 hours apart. This is a forecast change, not an observed pressure tendency.');
 return rows;
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

function seriesGeometry(field,start,end){
 const points=(field?.ts||[]).flatMap((t,i)=>t>=start&&t<=end?[{t,v:finite(field.values[i])?field.values[i]:null}]:[]);
 const values=points.map(p=>p.v).filter(finite);
 if(!values.length)return {points,path:'',min:null,max:null};
 const min=Math.min(...values),max=Math.max(...values),pad=(max-min)*.08||1;
 let path='',previous=null;
 for(const p of points){p.x=48+(p.t-start)/Math.max(1,end-start)*488;p.y=finite(p.v)?24+(max+pad-p.v)/(max-min+2*pad)*130:null;
  if(p.y===null){previous=null;continue;}
  // Never bridge missing samples or long forecast gaps.
  path+=`${previous!==null&&p.t-previous<=3*HOUR$1?'L':'M'}${p.x},${p.y} `;previous=p.t;
 }
 return {points,path,min,max};
}
function fieldColor(v,min,max){
 if(!finite(v)||!finite(min)||!finite(max))return '#1a2936';
 const ratio=max===min?.5:Math.max(0,Math.min(1,(v-min)/(max-min)));
 return `hsl(${205-ratio*175} 55% ${24+ratio*14}%)`;
}
function sourceHealth(data,time,now=Date.now()){
 const supplied=data?.header?.refTime;
 const run=typeof supplied==='string'?Date.parse(supplied):NaN;
 const age=finite(run)?(now-run)/HOUR$1:null;
 const available=(data?.fields||[]).filter(f=>{const i=f.ts.indexOf(time);return i>=0&&finite(f.values[i]);}).length;
 return {age,available,total:data?.fields.length||0,lead:finite(run)?(time-run)/HOUR$1:null};
}

/* src\Explorer.svelte generated by Svelte v4.2.20 */

function add_css$8(target) {
	append_styles(target, "svelte-1uhhb8c", ".explorer.svelte-1uhhb8c.svelte-1uhhb8c{margin:20px 0;color:#eaf4f7}.eyebrow.svelte-1uhhb8c.svelte-1uhhb8c{font-size:10px;letter-spacing:2px;color:#7ee8d1}h2.svelte-1uhhb8c.svelte-1uhhb8c{font-size:26px;letter-spacing:-.8px;margin:6px 0;color:#f0f8fa}h3.svelte-1uhhb8c.svelte-1uhhb8c{font-size:17px;margin:26px 0 6px;color:#eaf4f7}p.svelte-1uhhb8c.svelte-1uhhb8c,small.svelte-1uhhb8c.svelte-1uhhb8c{color:#a9bdca;font-size:11px;line-height:1.7}p.svelte-1uhhb8c.svelte-1uhhb8c{margin:8px 0 14px}.controls.svelte-1uhhb8c.svelte-1uhhb8c{display:flex;gap:8px}.controls.svelte-1uhhb8c input.svelte-1uhhb8c{flex:1;min-width:0}input.svelte-1uhhb8c.svelte-1uhhb8c,select.svelte-1uhhb8c.svelte-1uhhb8c,button.svelte-1uhhb8c.svelte-1uhhb8c{font:inherit;color:inherit;background:#142936;border:1px solid #355061;border-radius:9px;padding:10px}select.svelte-1uhhb8c.svelte-1uhhb8c{max-width:100%}.parameter-select.svelte-1uhhb8c.svelte-1uhhb8c{width:100%;margin:8px 0 16px}.chart-card.svelte-1uhhb8c.svelte-1uhhb8c{background:radial-gradient(ellipse at top right,#214e4b66,transparent 75%),#101f2c;border:1px solid #315b5a;border-radius:18px;padding:18px}.chart-heading.svelte-1uhhb8c.svelte-1uhhb8c{display:flex;justify-content:space-between;gap:10px;align-items:center}.chart-heading.svelte-1uhhb8c strong.svelte-1uhhb8c{display:block;font-size:30px;letter-spacing:-1px}.chart-heading.svelte-1uhhb8c b.svelte-1uhhb8c{display:block;font-size:12px;font-weight:500}.chart-heading.svelte-1uhhb8c>div.svelte-1uhhb8c:last-child{text-align:right}.chart-heading.svelte-1uhhb8c small.svelte-1uhhb8c{font-size:10px}svg.svelte-1uhhb8c.svelte-1uhhb8c{width:100%;display:block;margin:14px 0}svg.svelte-1uhhb8c line.svelte-1uhhb8c{stroke:#2d4452}svg.svelte-1uhhb8c path.svelte-1uhhb8c{fill:none;stroke:#85ead0;stroke-width:3;stroke-linejoin:round}svg.svelte-1uhhb8c circle.svelte-1uhhb8c{fill:#c1fff1}svg.svelte-1uhhb8c text.svelte-1uhhb8c{fill:#a6becb;font-size:10px}.matrix.svelte-1uhhb8c.svelte-1uhhb8c{overflow:auto;border:1px solid #304553;border-radius:12px}table.svelte-1uhhb8c.svelte-1uhhb8c{border-collapse:collapse;width:100%;font-size:11px;white-space:nowrap}th.svelte-1uhhb8c.svelte-1uhhb8c,td.svelte-1uhhb8c.svelte-1uhhb8c{padding:5px;border:1px solid #263c49}th.svelte-1uhhb8c.svelte-1uhhb8c{font-weight:500;background:#142632}th.svelte-1uhhb8c.svelte-1uhhb8c:first-child{position:sticky;left:0;z-index:1;text-align:left;min-width:105px}th.svelte-1uhhb8c small.svelte-1uhhb8c{display:block}td.svelte-1uhhb8c button.svelte-1uhhb8c,th.svelte-1uhhb8c button.svelte-1uhhb8c{background:transparent;border:0;white-space:nowrap;padding:9px;cursor:pointer;font-size:11px;min-height:38px}td.svelte-1uhhb8c button.svelte-1uhhb8c{color:#fff}button.svelte-1uhhb8c.svelte-1uhhb8c:hover{outline:1px solid #a7f5df}button.svelte-1uhhb8c.svelte-1uhhb8c:focus-visible,input.svelte-1uhhb8c.svelte-1uhhb8c:focus-visible,select.svelte-1uhhb8c.svelte-1uhhb8c:focus-visible{outline:2px solid #8ef4d8;outline-offset:2px}details.svelte-1uhhb8c.svelte-1uhhb8c{margin-top:18px;font-size:11px}summary.svelte-1uhhb8c.svelte-1uhhb8c{cursor:pointer;color:#a9bdca}@media(max-width:400px){.chart-heading.svelte-1uhhb8c.svelte-1uhhb8c{align-items:flex-start;flex-direction:column}.chart-heading.svelte-1uhhb8c>div.svelte-1uhhb8c:last-child{text-align:left}h2.svelte-1uhhb8c.svelte-1uhhb8c{font-size:23px}}.explorer.svelte-1uhhb8c.svelte-1uhhb8c{color:var(--ink,#edf7fa)}.chart-card.svelte-1uhhb8c.svelte-1uhhb8c{background:var(--aurora-hero,linear-gradient(125deg,#193e43,#183044));border-color:var(--line,#36505e);border-radius:16px}.eyebrow.svelte-1uhhb8c.svelte-1uhhb8c{font-size:11px;color:var(--mint,#7be4ca)}h2.svelte-1uhhb8c.svelte-1uhhb8c{font-size:25px;font-weight:500}p.svelte-1uhhb8c.svelte-1uhhb8c,small.svelte-1uhhb8c.svelte-1uhhb8c{font-size:12px;color:var(--muted,#b2c7d1)}.chart-heading.svelte-1uhhb8c small.svelte-1uhhb8c{font-size:11px}.chart-heading.svelte-1uhhb8c strong.svelte-1uhhb8c{font-weight:500}.controls.svelte-1uhhb8c input.svelte-1uhhb8c,select.svelte-1uhhb8c.svelte-1uhhb8c{background:var(--panel,#152b37);min-height:44px;border-color:var(--line,#36505e)}svg.svelte-1uhhb8c path.svelte-1uhhb8c{stroke:var(--mint,#7be4ca)}svg.svelte-1uhhb8c text.svelte-1uhhb8c{fill:var(--muted,#b2c7d1);font-size:12px}.matrix.svelte-1uhhb8c.svelte-1uhhb8c{border-color:var(--line,#36505e)}th.svelte-1uhhb8c.svelte-1uhhb8c{background:var(--panel,#152b37)}td.svelte-1uhhb8c button.svelte-1uhhb8c,th.svelte-1uhhb8c button.svelte-1uhhb8c{min-height:44px}details.svelte-1uhhb8c.svelte-1uhhb8c{font-size:12px}summary.svelte-1uhhb8c.svelte-1uhhb8c{color:var(--muted,#b2c7d1)}");
}

function get_each_context$6(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[31] = list[i];
	return child_ctx;
}

function get_each_context_1$5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[34] = list[i];
	return child_ctx;
}

function get_each_context_2$5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[37] = list[i];
	const constants_0 = /*curtainValue*/ child_ctx[18](/*row*/ child_ctx[34], /*t*/ child_ctx[37]);
	child_ctx[38] = constants_0;
	return child_ctx;
}

function get_each_context_3$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[37] = list[i];
	return child_ctx;
}

function get_each_context_4$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[43] = list[i];
	const constants_0 = seriesGeometry(/*f*/ child_ctx[43], /*start*/ child_ctx[11], /*end*/ child_ctx[10]);
	child_ctx[44] = constants_0;
	return child_ctx;
}

function get_each_context_5$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[37] = list[i];
	const constants_0 = at(/*f*/ child_ctx[43], /*t*/ child_ctx[37]);
	child_ctx[38] = constants_0;
	return child_ctx;
}

function get_each_context_6$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[37] = list[i];
	return child_ctx;
}

function get_each_context_8$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[31] = list[i];
	return child_ctx;
}

function get_each_context_7$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[31] = list[i];
	return child_ctx;
}

function get_each_context_9$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[55] = list[i];
	return child_ctx;
}

function get_each_context_10$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[43] = list[i];
	return child_ctx;
}

// (26:83) {#each matches as f}
function create_each_block_10$1(ctx) {
	let option;
	let t0_value = /*f*/ ctx[43].label + "";
	let t0;
	let t1;
	let t2_value = /*f*/ ctx[43].section + "";
	let t2;
	let option_value_value;

	return {
		c() {
			option = element("option");
			t0 = text(t0_value);
			t1 = text(" · ");
			t2 = text(t2_value);
			option.__value = option_value_value = /*f*/ ctx[43].id;
			set_input_value(option, option.__value);
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t0);
			append(option, t1);
			append(option, t2);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*matches*/ 8192 && t0_value !== (t0_value = /*f*/ ctx[43].label + "")) set_data(t0, t0_value);
			if (dirty[0] & /*matches*/ 8192 && t2_value !== (t2_value = /*f*/ ctx[43].section + "")) set_data(t2, t2_value);

			if (dirty[0] & /*matches*/ 8192 && option_value_value !== (option_value_value = /*f*/ ctx[43].id)) {
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

// (27:1) {#if !matches.length}
function create_if_block_4$4(ctx) {
	let p_1;

	return {
		c() {
			p_1 = element("p");
			p_1.textContent = "No matching chart parameters. Clear your search to see available fields.";
			attr(p_1, "class", "svelte-1uhhb8c");
		},
		m(target, anchor) {
			insert(target, p_1, anchor);
		},
		d(detaching) {
			if (detaching) {
				detach(p_1);
			}
		}
	};
}

// (28:1) {#if field}
function create_if_block_1$6(ctx) {
	let div3;
	let div2;
	let div0;
	let small0;
	let t0_value = /*field*/ ctx[12].label + "";
	let t0;
	let strong;
	let t1_value = format(at(/*field*/ ctx[12], /*valid*/ ctx[0]), /*field*/ ctx[12].unit, /*prefs*/ ctx[1]) + "";
	let t1;
	let div1;
	let small1;
	let b;
	let t3_value = format(/*geometry*/ ctx[17].min, /*field*/ ctx[12].unit, /*prefs*/ ctx[1]) + "";
	let t3;
	let t4;
	let t5_value = format(/*geometry*/ ctx[17].max, /*field*/ ctx[12].unit, /*prefs*/ ctx[1]) + "";
	let t5;
	let t6;
	let t7;
	let small2;
	let t8_value = (/*prefs*/ ctx[1].local ? 'Device local time' : 'UTC') + "";
	let t8;
	let t9;

	let t10_value = (/*field*/ ctx[12].unit === 'mm/step'
	? 'Amount per returned interval; not a rate.'
	: 'Values are sampled forecasts.') + "";

	let t10;
	let t11;

	function select_block_type(ctx, dirty) {
		if (/*geometry*/ ctx[17].path) return create_if_block_2$5;
		return create_else_block_1$2;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			div3 = element("div");
			div2 = element("div");
			div0 = element("div");
			small0 = element("small");
			t0 = text(t0_value);
			strong = element("strong");
			t1 = text(t1_value);
			div1 = element("div");
			small1 = element("small");
			small1.textContent = "WINDOW RANGE";
			b = element("b");
			t3 = text(t3_value);
			t4 = text(" → ");
			t5 = text(t5_value);
			t6 = space();
			if_block.c();
			t7 = space();
			small2 = element("small");
			t8 = text(t8_value);
			t9 = text(" · ");
			t10 = text(t10_value);
			t11 = text(" Gaps are not filled.");
			attr(small0, "class", "svelte-1uhhb8c");
			attr(strong, "class", "svelte-1uhhb8c");
			attr(div0, "class", "svelte-1uhhb8c");
			attr(small1, "class", "svelte-1uhhb8c");
			attr(b, "class", "svelte-1uhhb8c");
			attr(div1, "class", "svelte-1uhhb8c");
			attr(div2, "class", "chart-heading svelte-1uhhb8c");
			attr(small2, "class", "svelte-1uhhb8c");
			attr(div3, "class", "chart-card svelte-1uhhb8c");
		},
		m(target, anchor) {
			insert(target, div3, anchor);
			append(div3, div2);
			append(div2, div0);
			append(div0, small0);
			append(small0, t0);
			append(div0, strong);
			append(strong, t1);
			append(div2, div1);
			append(div1, small1);
			append(div1, b);
			append(b, t3);
			append(b, t4);
			append(b, t5);
			append(div3, t6);
			if_block.m(div3, null);
			append(div3, t7);
			append(div3, small2);
			append(small2, t8);
			append(small2, t9);
			append(small2, t10);
			append(small2, t11);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*field*/ 4096 && t0_value !== (t0_value = /*field*/ ctx[12].label + "")) set_data(t0, t0_value);
			if (dirty[0] & /*field, valid, prefs*/ 4099 && t1_value !== (t1_value = format(at(/*field*/ ctx[12], /*valid*/ ctx[0]), /*field*/ ctx[12].unit, /*prefs*/ ctx[1]) + "")) set_data(t1, t1_value);
			if (dirty[0] & /*geometry, field, prefs*/ 135170 && t3_value !== (t3_value = format(/*geometry*/ ctx[17].min, /*field*/ ctx[12].unit, /*prefs*/ ctx[1]) + "")) set_data(t3, t3_value);
			if (dirty[0] & /*geometry, field, prefs*/ 135170 && t5_value !== (t5_value = format(/*geometry*/ ctx[17].max, /*field*/ ctx[12].unit, /*prefs*/ ctx[1]) + "")) set_data(t5, t5_value);

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div3, t7);
				}
			}

			if (dirty[0] & /*prefs*/ 2 && t8_value !== (t8_value = (/*prefs*/ ctx[1].local ? 'Device local time' : 'UTC') + "")) set_data(t8, t8_value);

			if (dirty[0] & /*field*/ 4096 && t10_value !== (t10_value = (/*field*/ ctx[12].unit === 'mm/step'
			? 'Amount per returned interval; not a rate.'
			: 'Values are sampled forecasts.') + "")) set_data(t10, t10_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div3);
			}

			if_block.d();
		}
	};
}

// (34:7) {:else}
function create_else_block_1$2(ctx) {
	let p_1;

	return {
		c() {
			p_1 = element("p");
			p_1.textContent = "No numeric samples in this window.";
			attr(p_1, "class", "svelte-1uhhb8c");
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

// (29:1) {#if geometry.path}
function create_if_block_2$5(ctx) {
	let svg;
	let text0;
	let t0_value = format(/*geometry*/ ctx[17].max, /*field*/ ctx[12].unit, /*prefs*/ ctx[1]) + "";
	let t0;
	let text1;
	let t1_value = format(/*geometry*/ ctx[17].min, /*field*/ ctx[12].unit, /*prefs*/ ctx[1]) + "";
	let t1;
	let text2;
	let t2_value = timeLabel(/*start*/ ctx[11], /*prefs*/ ctx[1].local) + "";
	let t2;
	let text3;
	let t3_value = timeLabel(/*end*/ ctx[10], /*prefs*/ ctx[1].local) + "";
	let t3;
	let svg_aria_label_value;
	let each_value_9 = ensure_array_like([24, 89, 154]);
	let each_blocks = [];

	for (let i = 0; i < 3; i += 1) {
		each_blocks[i] = create_each_block_9$1(get_each_context_9$1(ctx, each_value_9, i));
	}

	function select_block_type_1(ctx, dirty) {
		if (/*field*/ ctx[12].unit === 'mm/step') return create_if_block_3$4;
		return create_else_block$5;
	}

	let current_block_type = select_block_type_1(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			svg = svg_element("svg");

			for (let i = 0; i < 3; i += 1) {
				each_blocks[i].c();
			}

			text0 = svg_element("text");
			t0 = text(t0_value);
			text1 = svg_element("text");
			t1 = text(t1_value);
			if_block.c();
			text2 = svg_element("text");
			t2 = text(t2_value);
			text3 = svg_element("text");
			t3 = text(t3_value);
			attr(text0, "x", "48");
			attr(text0, "y", "14");
			attr(text0, "class", "svelte-1uhhb8c");
			attr(text1, "x", "48");
			attr(text1, "y", "166");
			attr(text1, "class", "svelte-1uhhb8c");
			attr(text2, "x", "48");
			attr(text2, "y", "180");
			attr(text2, "class", "svelte-1uhhb8c");
			attr(text3, "x", "536");
			attr(text3, "y", "180");
			attr(text3, "text-anchor", "end");
			attr(text3, "class", "svelte-1uhhb8c");
			attr(svg, "viewBox", "0 0 560 192");
			attr(svg, "role", "img");
			attr(svg, "aria-label", svg_aria_label_value = `${/*field*/ ctx[12].label} over ${/*hours*/ ctx[5]} hours; gaps indicate missing data`);
			attr(svg, "class", "svelte-1uhhb8c");
		},
		m(target, anchor) {
			insert(target, svg, anchor);

			for (let i = 0; i < 3; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(svg, null);
				}
			}

			append(svg, text0);
			append(text0, t0);
			append(svg, text1);
			append(text1, t1);
			if_block.m(svg, null);
			append(svg, text2);
			append(text2, t2);
			append(svg, text3);
			append(text3, t3);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*geometry, field, prefs*/ 135170 && t0_value !== (t0_value = format(/*geometry*/ ctx[17].max, /*field*/ ctx[12].unit, /*prefs*/ ctx[1]) + "")) set_data(t0, t0_value);
			if (dirty[0] & /*geometry, field, prefs*/ 135170 && t1_value !== (t1_value = format(/*geometry*/ ctx[17].min, /*field*/ ctx[12].unit, /*prefs*/ ctx[1]) + "")) set_data(t1, t1_value);

			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(svg, text2);
				}
			}

			if (dirty[0] & /*start, prefs*/ 2050 && t2_value !== (t2_value = timeLabel(/*start*/ ctx[11], /*prefs*/ ctx[1].local) + "")) set_data(t2, t2_value);
			if (dirty[0] & /*end, prefs*/ 1026 && t3_value !== (t3_value = timeLabel(/*end*/ ctx[10], /*prefs*/ ctx[1].local) + "")) set_data(t3, t3_value);

			if (dirty[0] & /*field, hours*/ 4128 && svg_aria_label_value !== (svg_aria_label_value = `${/*field*/ ctx[12].label} over ${/*hours*/ ctx[5]} hours; gaps indicate missing data`)) {
				attr(svg, "aria-label", svg_aria_label_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(svg);
			}

			destroy_each(each_blocks, detaching);
			if_block.d();
		}
	};
}

// (30:1) {#each [24,89,154] as y}
function create_each_block_9$1(ctx) {
	let line;

	return {
		c() {
			line = svg_element("line");
			attr(line, "x1", "48");
			attr(line, "x2", "536");
			attr(line, "y1", /*y*/ ctx[55]);
			attr(line, "y2", /*y*/ ctx[55]);
			attr(line, "class", "svelte-1uhhb8c");
		},
		m(target, anchor) {
			insert(target, line, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(line);
			}
		}
	};
}

// (32:316) {:else}
function create_else_block$5(ctx) {
	let path;
	let path_d_value;
	let each_1_anchor;
	let each_value_8 = ensure_array_like(/*geometry*/ ctx[17].points.filter(func_1$1));
	let each_blocks = [];

	for (let i = 0; i < each_value_8.length; i += 1) {
		each_blocks[i] = create_each_block_8$1(get_each_context_8$1(ctx, each_value_8, i));
	}

	return {
		c() {
			path = svg_element("path");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
			attr(path, "d", path_d_value = /*geometry*/ ctx[17].path);
			attr(path, "class", "svelte-1uhhb8c");
		},
		m(target, anchor) {
			insert(target, path, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert(target, each_1_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*geometry*/ 131072 && path_d_value !== (path_d_value = /*geometry*/ ctx[17].path)) {
				attr(path, "d", path_d_value);
			}

			if (dirty[0] & /*geometry, field, prefs*/ 135170) {
				each_value_8 = ensure_array_like(/*geometry*/ ctx[17].points.filter(func_1$1));
				let i;

				for (i = 0; i < each_value_8.length; i += 1) {
					const child_ctx = get_each_context_8$1(ctx, each_value_8, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_8$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_8.length;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(path);
				detach(each_1_anchor);
			}

			destroy_each(each_blocks, detaching);
		}
	};
}

// (32:1) {#if field.unit==='mm/step'}
function create_if_block_3$4(ctx) {
	let each_1_anchor;
	let each_value_7 = ensure_array_like(/*geometry*/ ctx[17].points.filter(func$1));
	let each_blocks = [];

	for (let i = 0; i < each_value_7.length; i += 1) {
		each_blocks[i] = create_each_block_7$1(get_each_context_7$1(ctx, each_value_7, i));
	}

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert(target, each_1_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*geometry, field, prefs*/ 135170) {
				each_value_7 = ensure_array_like(/*geometry*/ ctx[17].points.filter(func$1));
				let i;

				for (i = 0; i < each_value_7.length; i += 1) {
					const child_ctx = get_each_context_7$1(ctx, each_value_7, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_7$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
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
				detach(each_1_anchor);
			}

			destroy_each(each_blocks, detaching);
		}
	};
}

// (32:348) {#each geometry.points.filter(p=>p.y!==null) as p}
function create_each_block_8$1(ctx) {
	let circle;
	let title;
	let t0_value = timeLabel(/*p*/ ctx[31].t, /*prefs*/ ctx[1].local) + "";
	let t0;
	let t1;
	let t2_value = format(/*p*/ ctx[31].v, /*field*/ ctx[12].unit, /*prefs*/ ctx[1]) + "";
	let t2;
	let circle_cx_value;
	let circle_cy_value;

	return {
		c() {
			circle = svg_element("circle");
			title = svg_element("title");
			t0 = text(t0_value);
			t1 = text(": ");
			t2 = text(t2_value);
			attr(circle, "cx", circle_cx_value = /*p*/ ctx[31].x);
			attr(circle, "cy", circle_cy_value = /*p*/ ctx[31].y);
			attr(circle, "r", "3");
			attr(circle, "class", "svelte-1uhhb8c");
		},
		m(target, anchor) {
			insert(target, circle, anchor);
			append(circle, title);
			append(title, t0);
			append(title, t1);
			append(title, t2);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*geometry, prefs*/ 131074 && t0_value !== (t0_value = timeLabel(/*p*/ ctx[31].t, /*prefs*/ ctx[1].local) + "")) set_data(t0, t0_value);
			if (dirty[0] & /*geometry, field, prefs*/ 135170 && t2_value !== (t2_value = format(/*p*/ ctx[31].v, /*field*/ ctx[12].unit, /*prefs*/ ctx[1]) + "")) set_data(t2, t2_value);

			if (dirty[0] & /*geometry*/ 131072 && circle_cx_value !== (circle_cx_value = /*p*/ ctx[31].x)) {
				attr(circle, "cx", circle_cx_value);
			}

			if (dirty[0] & /*geometry*/ 131072 && circle_cy_value !== (circle_cy_value = /*p*/ ctx[31].y)) {
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

// (32:29) {#each geometry.points.filter(p=>p.y!==null) as p}
function create_each_block_7$1(ctx) {
	let rect;
	let title;
	let t0_value = timeLabel(/*p*/ ctx[31].t, /*prefs*/ ctx[1].local) + "";
	let t0;
	let t1;
	let t2_value = format(/*p*/ ctx[31].v, /*field*/ ctx[12].unit, /*prefs*/ ctx[1]) + "";
	let t2;
	let rect_x_value;
	let rect_y_value;
	let rect_height_value;

	return {
		c() {
			rect = svg_element("rect");
			title = svg_element("title");
			t0 = text(t0_value);
			t1 = text(": ");
			t2 = text(t2_value);
			attr(rect, "x", rect_x_value = /*p*/ ctx[31].x - 3);
			attr(rect, "y", rect_y_value = 154 - 130 * Math.max(0, /*p*/ ctx[31].v) / Math.max(1, /*geometry*/ ctx[17].max));
			attr(rect, "width", "6");
			attr(rect, "height", rect_height_value = 130 * Math.max(0, /*p*/ ctx[31].v) / Math.max(1, /*geometry*/ ctx[17].max));
			attr(rect, "fill", "#80c9ff");
		},
		m(target, anchor) {
			insert(target, rect, anchor);
			append(rect, title);
			append(title, t0);
			append(title, t1);
			append(title, t2);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*geometry, prefs*/ 131074 && t0_value !== (t0_value = timeLabel(/*p*/ ctx[31].t, /*prefs*/ ctx[1].local) + "")) set_data(t0, t0_value);
			if (dirty[0] & /*geometry, field, prefs*/ 135170 && t2_value !== (t2_value = format(/*p*/ ctx[31].v, /*field*/ ctx[12].unit, /*prefs*/ ctx[1]) + "")) set_data(t2, t2_value);

			if (dirty[0] & /*geometry*/ 131072 && rect_x_value !== (rect_x_value = /*p*/ ctx[31].x - 3)) {
				attr(rect, "x", rect_x_value);
			}

			if (dirty[0] & /*geometry*/ 131072 && rect_y_value !== (rect_y_value = 154 - 130 * Math.max(0, /*p*/ ctx[31].v) / Math.max(1, /*geometry*/ ctx[17].max))) {
				attr(rect, "y", rect_y_value);
			}

			if (dirty[0] & /*geometry*/ 131072 && rect_height_value !== (rect_height_value = 130 * Math.max(0, /*p*/ ctx[31].v) / Math.max(1, /*geometry*/ ctx[17].max))) {
				attr(rect, "height", rect_height_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(rect);
			}
		}
	};
}

// (37:117) {#each times as t}
function create_each_block_6$2(ctx) {
	let th;
	let button;
	let t_1_value = timeLabel(/*t*/ ctx[37], /*prefs*/ ctx[1].local) + "";
	let t_1;
	let button_aria_label_value;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[26](/*t*/ ctx[37]);
	}

	return {
		c() {
			th = element("th");
			button = element("button");
			t_1 = text(t_1_value);
			attr(button, "aria-label", button_aria_label_value = `Select ${timeLabel(/*t*/ ctx[37], /*prefs*/ ctx[1].local)}`);
			attr(button, "class", "svelte-1uhhb8c");
			attr(th, "class", "svelte-1uhhb8c");
		},
		m(target, anchor) {
			insert(target, th, anchor);
			append(th, button);
			append(button, t_1);

			if (!mounted) {
				dispose = listen(button, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*times, prefs*/ 130 && t_1_value !== (t_1_value = timeLabel(/*t*/ ctx[37], /*prefs*/ ctx[1].local) + "")) set_data(t_1, t_1_value);

			if (dirty[0] & /*times, prefs*/ 130 && button_aria_label_value !== (button_aria_label_value = `Select ${timeLabel(/*t*/ ctx[37], /*prefs*/ ctx[1].local)}`)) {
				attr(button, "aria-label", button_aria_label_value);
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

// (38:107) {#each times as t}
function create_each_block_5$2(ctx) {
	let td;
	let button;
	let t_1_value = format(/*v*/ ctx[38], /*f*/ ctx[43].unit, /*prefs*/ ctx[1]) + "";
	let t_1;
	let button_title_value;
	let td_style_value;
	let mounted;
	let dispose;

	function click_handler_1() {
		return /*click_handler_1*/ ctx[27](/*t*/ ctx[37]);
	}

	return {
		c() {
			td = element("td");
			button = element("button");
			t_1 = text(t_1_value);
			attr(button, "title", button_title_value = `${/*f*/ ctx[43].label} · ${timeLabel(/*t*/ ctx[37], /*prefs*/ ctx[1].local)}`);
			attr(button, "class", "svelte-1uhhb8c");
			attr(td, "style", td_style_value = `background:${fieldColor(/*v*/ ctx[38], /*stats*/ ctx[44].min, /*stats*/ ctx[44].max)}`);
			attr(td, "class", "svelte-1uhhb8c");
		},
		m(target, anchor) {
			insert(target, td, anchor);
			append(td, button);
			append(button, t_1);

			if (!mounted) {
				dispose = listen(button, "click", click_handler_1);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*matrix, times, prefs*/ 65666 && t_1_value !== (t_1_value = format(/*v*/ ctx[38], /*f*/ ctx[43].unit, /*prefs*/ ctx[1]) + "")) set_data(t_1, t_1_value);

			if (dirty[0] & /*matrix, times, prefs*/ 65666 && button_title_value !== (button_title_value = `${/*f*/ ctx[43].label} · ${timeLabel(/*t*/ ctx[37], /*prefs*/ ctx[1].local)}`)) {
				attr(button, "title", button_title_value);
			}

			if (dirty[0] & /*matrix, times, start, end*/ 68736 && td_style_value !== (td_style_value = `background:${fieldColor(/*v*/ ctx[38], /*stats*/ ctx[44].min, /*stats*/ ctx[44].max)}`)) {
				attr(td, "style", td_style_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(td);
			}

			mounted = false;
			dispose();
		}
	};
}

// (38:1) {#each matrix as f}
function create_each_block_4$2(ctx) {
	let tr;
	let th;
	let t0_value = /*f*/ ctx[43].label + "";
	let t0;
	let small;
	let t1_value = /*f*/ ctx[43].unit + "";
	let t1;
	let each_value_5 = ensure_array_like(/*times*/ ctx[7]);
	let each_blocks = [];

	for (let i = 0; i < each_value_5.length; i += 1) {
		each_blocks[i] = create_each_block_5$2(get_each_context_5$2(ctx, each_value_5, i));
	}

	return {
		c() {
			tr = element("tr");
			th = element("th");
			t0 = text(t0_value);
			small = element("small");
			t1 = text(t1_value);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(small, "class", "svelte-1uhhb8c");
			attr(th, "class", "svelte-1uhhb8c");
		},
		m(target, anchor) {
			insert(target, tr, anchor);
			append(tr, th);
			append(th, t0);
			append(th, small);
			append(small, t1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(tr, null);
				}
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*matrix*/ 65536 && t0_value !== (t0_value = /*f*/ ctx[43].label + "")) set_data(t0, t0_value);
			if (dirty[0] & /*matrix*/ 65536 && t1_value !== (t1_value = /*f*/ ctx[43].unit + "")) set_data(t1, t1_value);

			if (dirty[0] & /*matrix, times, start, end, prefs, onTime*/ 68742) {
				each_value_5 = ensure_array_like(/*times*/ ctx[7]);
				let i;

				for (i = 0; i < each_value_5.length; i += 1) {
					const child_ctx = get_each_context_5$2(ctx, each_value_5, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_5$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(tr, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_5.length;
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

// (40:1) {#if levels.length}
function create_if_block$7(ctx) {
	let h3;
	let p0;
	let t2;
	let select;
	let option0;
	let option1;
	let option2;
	let option3;
	let t7;
	let p1;
	let t8;

	let t9_value = format(
		/*curtainMin*/ ctx[15],
		/*layer*/ ctx[6] === 'temp'
		? 'K'
		: /*layer*/ ctx[6] === 'wind' ? 'm/s' : '%',
		/*prefs*/ ctx[1]
	) + "";

	let t9;
	let t10;

	let t11_value = format(
		/*curtainMax*/ ctx[14],
		/*layer*/ ctx[6] === 'temp'
		? 'K'
		: /*layer*/ ctx[6] === 'wind' ? 'm/s' : '%',
		/*prefs*/ ctx[1]
	) + "";

	let t11;
	let t12;
	let t13;
	let div;
	let table;
	let thead;
	let tr;
	let th;
	let tbody;
	let mounted;
	let dispose;
	let each_value_3 = ensure_array_like(/*times*/ ctx[7]);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_3.length; i += 1) {
		each_blocks_1[i] = create_each_block_3$3(get_each_context_3$3(ctx, each_value_3, i));
	}

	let each_value_1 = ensure_array_like(/*curtain*/ ctx[8]);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$5(get_each_context_1$5(ctx, each_value_1, i));
	}

	return {
		c() {
			h3 = element("h3");
			h3.textContent = "Atmospheric curtain";
			p0 = element("p");
			p0.textContent = "Follow layers through time. Rows are discrete pressure levels, not equal height bands. Known below-terrain values are hidden.";
			t2 = space();
			select = element("select");
			option0 = element("option");
			option0.textContent = "Relative humidity";
			option1 = element("option");
			option1.textContent = "Temperature";
			option2 = element("option");
			option2.textContent = "Wind speed";
			option3 = element("option");
			option3.textContent = "Cloud fraction";
			t7 = space();
			p1 = element("p");
			t8 = text("Blue → amber: ");
			t9 = text(t9_value);
			t10 = text(" → ");
			t11 = text(t11_value);
			t12 = text(". — means missing or below terrain. Terrain screening requires height metadata.");
			t13 = space();
			div = element("div");
			table = element("table");
			thead = element("thead");
			tr = element("tr");
			th = element("th");
			th.textContent = "Pressure";

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			tbody = element("tbody");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(h3, "class", "svelte-1uhhb8c");
			attr(p0, "class", "svelte-1uhhb8c");
			option0.__value = "rh";
			set_input_value(option0, option0.__value);
			option1.__value = "temp";
			set_input_value(option1, option1.__value);
			option2.__value = "wind";
			set_input_value(option2, option2.__value);
			option3.__value = "cloud";
			set_input_value(option3, option3.__value);
			attr(select, "aria-label", "Atmospheric curtain parameter");
			attr(select, "class", "svelte-1uhhb8c");
			if (/*layer*/ ctx[6] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[28].call(select));
			attr(p1, "class", "svelte-1uhhb8c");
			attr(th, "class", "svelte-1uhhb8c");
			attr(table, "class", "svelte-1uhhb8c");
			attr(div, "class", "matrix svelte-1uhhb8c");
			attr(div, "role", "region");
			attr(div, "aria-label", "Pressure level forecast curtain");
		},
		m(target, anchor) {
			insert(target, h3, anchor);
			insert(target, p0, anchor);
			insert(target, t2, anchor);
			insert(target, select, anchor);
			append(select, option0);
			append(select, option1);
			append(select, option2);
			append(select, option3);
			select_option(select, /*layer*/ ctx[6], true);
			insert(target, t7, anchor);
			insert(target, p1, anchor);
			append(p1, t8);
			append(p1, t9);
			append(p1, t10);
			append(p1, t11);
			append(p1, t12);
			insert(target, t13, anchor);
			insert(target, div, anchor);
			append(div, table);
			append(table, thead);
			append(thead, tr);
			append(tr, th);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(tr, null);
				}
			}

			append(table, tbody);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(tbody, null);
				}
			}

			if (!mounted) {
				dispose = listen(select, "change", /*select_change_handler*/ ctx[28]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*layer*/ 64) {
				select_option(select, /*layer*/ ctx[6]);
			}

			if (dirty[0] & /*curtainMin, layer, prefs*/ 32834 && t9_value !== (t9_value = format(
				/*curtainMin*/ ctx[15],
				/*layer*/ ctx[6] === 'temp'
				? 'K'
				: /*layer*/ ctx[6] === 'wind' ? 'm/s' : '%',
				/*prefs*/ ctx[1]
			) + "")) set_data(t9, t9_value);

			if (dirty[0] & /*curtainMax, layer, prefs*/ 16450 && t11_value !== (t11_value = format(
				/*curtainMax*/ ctx[14],
				/*layer*/ ctx[6] === 'temp'
				? 'K'
				: /*layer*/ ctx[6] === 'wind' ? 'm/s' : '%',
				/*prefs*/ ctx[1]
			) + "")) set_data(t11, t11_value);

			if (dirty[0] & /*onTime, times, prefs*/ 134) {
				each_value_3 = ensure_array_like(/*times*/ ctx[7]);
				let i;

				for (i = 0; i < each_value_3.length; i += 1) {
					const child_ctx = get_each_context_3$3(ctx, each_value_3, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_3$3(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(tr, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_3.length;
			}

			if (dirty[0] & /*times, curtainValue, curtain, curtainMin, curtainMax, prefs, onTime*/ 311686) {
				each_value_1 = ensure_array_like(/*curtain*/ ctx[8]);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$5(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1$5(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(tbody, null);
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
				detach(h3);
				detach(p0);
				detach(t2);
				detach(select);
				detach(t7);
				detach(p1);
				detach(t13);
				detach(div);
			}

			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};
}

// (43:115) {#each times as t}
function create_each_block_3$3(ctx) {
	let th;
	let button;
	let t_1_value = timeLabel(/*t*/ ctx[37], /*prefs*/ ctx[1].local) + "";
	let t_1;
	let mounted;
	let dispose;

	function click_handler_2() {
		return /*click_handler_2*/ ctx[29](/*t*/ ctx[37]);
	}

	return {
		c() {
			th = element("th");
			button = element("button");
			t_1 = text(t_1_value);
			attr(button, "class", "svelte-1uhhb8c");
			attr(th, "class", "svelte-1uhhb8c");
		},
		m(target, anchor) {
			insert(target, th, anchor);
			append(th, button);
			append(button, t_1);

			if (!mounted) {
				dispose = listen(button, "click", click_handler_2);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*times, prefs*/ 130 && t_1_value !== (t_1_value = timeLabel(/*t*/ ctx[37], /*prefs*/ ctx[1].local) + "")) set_data(t_1, t_1_value);
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

// (43:283) {#each times as t}
function create_each_block_2$5(ctx) {
	let td;
	let button;
	let t_1_value = format(/*v*/ ctx[38], /*row*/ ctx[34].field?.unit || 'raw', /*prefs*/ ctx[1]) + "";
	let t_1;
	let button_title_value;
	let td_style_value;
	let mounted;
	let dispose;

	function click_handler_3() {
		return /*click_handler_3*/ ctx[30](/*t*/ ctx[37]);
	}

	return {
		c() {
			td = element("td");
			button = element("button");
			t_1 = text(t_1_value);
			attr(button, "title", button_title_value = `${/*row*/ ctx[34].p} hPa · ${timeLabel(/*t*/ ctx[37], /*prefs*/ ctx[1].local)}`);
			attr(button, "class", "svelte-1uhhb8c");
			attr(td, "style", td_style_value = `background:${fieldColor(/*v*/ ctx[38], /*curtainMin*/ ctx[15], /*curtainMax*/ ctx[14])}`);
			attr(td, "class", "svelte-1uhhb8c");
		},
		m(target, anchor) {
			insert(target, td, anchor);
			append(td, button);
			append(button, t_1);

			if (!mounted) {
				dispose = listen(button, "click", click_handler_3);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*curtain, times, prefs*/ 386 && t_1_value !== (t_1_value = format(/*v*/ ctx[38], /*row*/ ctx[34].field?.unit || 'raw', /*prefs*/ ctx[1]) + "")) set_data(t_1, t_1_value);

			if (dirty[0] & /*curtain, times, prefs*/ 386 && button_title_value !== (button_title_value = `${/*row*/ ctx[34].p} hPa · ${timeLabel(/*t*/ ctx[37], /*prefs*/ ctx[1].local)}`)) {
				attr(button, "title", button_title_value);
			}

			if (dirty[0] & /*curtain, times, curtainMin, curtainMax*/ 49536 && td_style_value !== (td_style_value = `background:${fieldColor(/*v*/ ctx[38], /*curtainMin*/ ctx[15], /*curtainMax*/ ctx[14])}`)) {
				attr(td, "style", td_style_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(td);
			}

			mounted = false;
			dispose();
		}
	};
}

// (43:237) {#each curtain as row}
function create_each_block_1$5(ctx) {
	let tr;
	let th;
	let t0_value = /*row*/ ctx[34].p + "";
	let t0;
	let t1;
	let each_value_2 = ensure_array_like(/*times*/ ctx[7]);
	let each_blocks = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks[i] = create_each_block_2$5(get_each_context_2$5(ctx, each_value_2, i));
	}

	return {
		c() {
			tr = element("tr");
			th = element("th");
			t0 = text(t0_value);
			t1 = text(" hPa");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(th, "class", "svelte-1uhhb8c");
		},
		m(target, anchor) {
			insert(target, tr, anchor);
			append(tr, th);
			append(th, t0);
			append(th, t1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(tr, null);
				}
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*curtain*/ 256 && t0_value !== (t0_value = /*row*/ ctx[34].p + "")) set_data(t0, t0_value);

			if (dirty[0] & /*curtainValue, curtain, times, curtainMin, curtainMax, prefs, onTime*/ 311686) {
				each_value_2 = ensure_array_like(/*times*/ ctx[7]);
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2$5(ctx, each_value_2, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_2$5(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(tr, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_2.length;
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

// (44:196) {#each geometry.points as p}
function create_each_block$6(ctx) {
	let tr;
	let th;
	let t0_value = timeLabel(/*p*/ ctx[31].t, /*prefs*/ ctx[1].local) + "";
	let t0;
	let td;
	let t1_value = format(/*p*/ ctx[31].v, /*field*/ ctx[12]?.unit, /*prefs*/ ctx[1]) + "";
	let t1;

	return {
		c() {
			tr = element("tr");
			th = element("th");
			t0 = text(t0_value);
			td = element("td");
			t1 = text(t1_value);
			attr(th, "class", "svelte-1uhhb8c");
			attr(td, "class", "svelte-1uhhb8c");
		},
		m(target, anchor) {
			insert(target, tr, anchor);
			append(tr, th);
			append(th, t0);
			append(tr, td);
			append(td, t1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*geometry, prefs*/ 131074 && t0_value !== (t0_value = timeLabel(/*p*/ ctx[31].t, /*prefs*/ ctx[1].local) + "")) set_data(t0, t0_value);
			if (dirty[0] & /*geometry, field, prefs*/ 135170 && t1_value !== (t1_value = format(/*p*/ ctx[31].v, /*field*/ ctx[12]?.unit, /*prefs*/ ctx[1]) + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(tr);
			}
		}
	};
}

function create_fragment$9(ctx) {
	let section;
	let div0;
	let h2;
	let t2;
	let p0;
	let t4;
	let div1;
	let input;
	let select0;
	let option0;
	let option1;
	let option2;
	let t8;
	let select1;
	let t9;
	let t10;
	let t11;
	let h3;
	let p1;
	let t14;
	let div2;
	let table0;
	let thead;
	let tr;
	let th;
	let tbody0;
	let t16;
	let t17;
	let details;
	let summary;
	let p2;
	let t19_value = /*field*/ ctx[12]?.id + "";
	let t19;
	let t20;
	let div3;
	let table1;
	let tbody1;
	let mounted;
	let dispose;
	let each_value_10 = ensure_array_like(/*matches*/ ctx[13]);
	let each_blocks_3 = [];

	for (let i = 0; i < each_value_10.length; i += 1) {
		each_blocks_3[i] = create_each_block_10$1(get_each_context_10$1(ctx, each_value_10, i));
	}

	let if_block0 = !/*matches*/ ctx[13].length && create_if_block_4$4();
	let if_block1 = /*field*/ ctx[12] && create_if_block_1$6(ctx);
	let each_value_6 = ensure_array_like(/*times*/ ctx[7]);
	let each_blocks_2 = [];

	for (let i = 0; i < each_value_6.length; i += 1) {
		each_blocks_2[i] = create_each_block_6$2(get_each_context_6$2(ctx, each_value_6, i));
	}

	let each_value_4 = ensure_array_like(/*matrix*/ ctx[16]);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_4.length; i += 1) {
		each_blocks_1[i] = create_each_block_4$2(get_each_context_4$2(ctx, each_value_4, i));
	}

	let if_block2 = /*levels*/ ctx[9].length && create_if_block$7(ctx);
	let each_value = ensure_array_like(/*geometry*/ ctx[17].points);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
	}

	return {
		c() {
			section = element("section");
			div0 = element("div");
			div0.textContent = "ATMOSPHERE / EXPLORER";
			h2 = element("h2");
			h2.textContent = "See the forecast unfold.";
			t2 = space();
			p0 = element("p");
			p0.textContent = "Every chart uses the selected source. Choose a parameter, then tap a time.";
			t4 = space();
			div1 = element("div");
			input = element("input");
			select0 = element("select");
			option0 = element("option");
			option0.textContent = "24 hours";
			option1 = element("option");
			option1.textContent = "48 hours";
			option2 = element("option");
			option2.textContent = "5 days";
			t8 = space();
			select1 = element("select");

			for (let i = 0; i < each_blocks_3.length; i += 1) {
				each_blocks_3[i].c();
			}

			t9 = space();
			if (if_block0) if_block0.c();
			t10 = space();
			if (if_block1) if_block1.c();
			t11 = space();
			h3 = element("h3");
			h3.textContent = "Forecast fingerprint";
			p1 = element("p");
			p1.textContent = "Each row has its own colour scale: blue is lower, amber is higher. Colour is not a hazard rating. Exact values appear in every cell.";
			t14 = space();
			div2 = element("div");
			table0 = element("table");
			thead = element("thead");
			tr = element("tr");
			th = element("th");
			th.textContent = "Parameter";

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].c();
			}

			tbody0 = element("tbody");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t16 = space();
			if (if_block2) if_block2.c();
			t17 = space();
			details = element("details");
			summary = element("summary");
			summary.textContent = "Exact chart values & source";
			p2 = element("p");
			t19 = text(t19_value);
			t20 = text(" · numeric, mapped units only. Categorical and unknown-unit fields remain in Parameters.");
			div3 = element("div");
			table1 = element("table");
			tbody1 = element("tbody");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div0, "class", "eyebrow svelte-1uhhb8c");
			attr(h2, "class", "svelte-1uhhb8c");
			attr(p0, "class", "svelte-1uhhb8c");
			attr(input, "aria-label", "Find a chart parameter");
			attr(input, "placeholder", "Find temperature, wind, 850h…");
			attr(input, "class", "svelte-1uhhb8c");
			option0.__value = 24;
			set_input_value(option0, option0.__value);
			option1.__value = 48;
			set_input_value(option1, option1.__value);
			option2.__value = 120;
			set_input_value(option2, option2.__value);
			attr(select0, "aria-label", "Chart horizon");
			attr(select0, "class", "svelte-1uhhb8c");
			if (/*hours*/ ctx[5] === void 0) add_render_callback(() => /*select0_change_handler*/ ctx[24].call(select0));
			attr(div1, "class", "controls svelte-1uhhb8c");
			attr(select1, "class", "parameter-select svelte-1uhhb8c");
			attr(select1, "aria-label", "Chart parameter");
			if (/*chosen*/ ctx[3] === void 0) add_render_callback(() => /*select1_change_handler*/ ctx[25].call(select1));
			attr(h3, "class", "svelte-1uhhb8c");
			attr(p1, "class", "svelte-1uhhb8c");
			attr(th, "class", "svelte-1uhhb8c");
			attr(table0, "class", "svelte-1uhhb8c");
			attr(div2, "class", "matrix svelte-1uhhb8c");
			attr(div2, "role", "region");
			attr(div2, "aria-label", "Interactive forecast fingerprint");
			attr(summary, "class", "svelte-1uhhb8c");
			attr(p2, "class", "svelte-1uhhb8c");
			attr(table1, "class", "svelte-1uhhb8c");
			attr(div3, "class", "matrix svelte-1uhhb8c");
			attr(details, "class", "svelte-1uhhb8c");
			attr(section, "class", "explorer svelte-1uhhb8c");
			attr(section, "aria-label", "Visual forecast explorer");
		},
		m(target, anchor) {
			insert(target, section, anchor);
			append(section, div0);
			append(section, h2);
			append(section, t2);
			append(section, p0);
			append(section, t4);
			append(section, div1);
			append(div1, input);
			set_input_value(input, /*query*/ ctx[4]);
			append(div1, select0);
			append(select0, option0);
			append(select0, option1);
			append(select0, option2);
			select_option(select0, /*hours*/ ctx[5], true);
			append(section, t8);
			append(section, select1);

			for (let i = 0; i < each_blocks_3.length; i += 1) {
				if (each_blocks_3[i]) {
					each_blocks_3[i].m(select1, null);
				}
			}

			select_option(select1, /*chosen*/ ctx[3], true);
			append(section, t9);
			if (if_block0) if_block0.m(section, null);
			append(section, t10);
			if (if_block1) if_block1.m(section, null);
			append(section, t11);
			append(section, h3);
			append(section, p1);
			append(section, t14);
			append(section, div2);
			append(div2, table0);
			append(table0, thead);
			append(thead, tr);
			append(tr, th);

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				if (each_blocks_2[i]) {
					each_blocks_2[i].m(tr, null);
				}
			}

			append(table0, tbody0);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(tbody0, null);
				}
			}

			append(section, t16);
			if (if_block2) if_block2.m(section, null);
			append(section, t17);
			append(section, details);
			append(details, summary);
			append(details, p2);
			append(p2, t19);
			append(p2, t20);
			append(details, div3);
			append(div3, table1);
			append(table1, tbody1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(tbody1, null);
				}
			}

			if (!mounted) {
				dispose = [
					listen(input, "input", /*input_input_handler*/ ctx[23]),
					listen(select0, "change", /*select0_change_handler*/ ctx[24]),
					listen(select1, "change", /*select1_change_handler*/ ctx[25])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*query*/ 16 && input.value !== /*query*/ ctx[4]) {
				set_input_value(input, /*query*/ ctx[4]);
			}

			if (dirty[0] & /*hours*/ 32) {
				select_option(select0, /*hours*/ ctx[5]);
			}

			if (dirty[0] & /*matches*/ 8192) {
				each_value_10 = ensure_array_like(/*matches*/ ctx[13]);
				let i;

				for (i = 0; i < each_value_10.length; i += 1) {
					const child_ctx = get_each_context_10$1(ctx, each_value_10, i);

					if (each_blocks_3[i]) {
						each_blocks_3[i].p(child_ctx, dirty);
					} else {
						each_blocks_3[i] = create_each_block_10$1(child_ctx);
						each_blocks_3[i].c();
						each_blocks_3[i].m(select1, null);
					}
				}

				for (; i < each_blocks_3.length; i += 1) {
					each_blocks_3[i].d(1);
				}

				each_blocks_3.length = each_value_10.length;
			}

			if (dirty[0] & /*chosen, matches*/ 8200) {
				select_option(select1, /*chosen*/ ctx[3]);
			}

			if (!/*matches*/ ctx[13].length) {
				if (if_block0) ; else {
					if_block0 = create_if_block_4$4();
					if_block0.c();
					if_block0.m(section, t10);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*field*/ ctx[12]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_1$6(ctx);
					if_block1.c();
					if_block1.m(section, t11);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty[0] & /*times, prefs, onTime*/ 134) {
				each_value_6 = ensure_array_like(/*times*/ ctx[7]);
				let i;

				for (i = 0; i < each_value_6.length; i += 1) {
					const child_ctx = get_each_context_6$2(ctx, each_value_6, i);

					if (each_blocks_2[i]) {
						each_blocks_2[i].p(child_ctx, dirty);
					} else {
						each_blocks_2[i] = create_each_block_6$2(child_ctx);
						each_blocks_2[i].c();
						each_blocks_2[i].m(tr, null);
					}
				}

				for (; i < each_blocks_2.length; i += 1) {
					each_blocks_2[i].d(1);
				}

				each_blocks_2.length = each_value_6.length;
			}

			if (dirty[0] & /*times, matrix, start, end, prefs, onTime*/ 68742) {
				each_value_4 = ensure_array_like(/*matrix*/ ctx[16]);
				let i;

				for (i = 0; i < each_value_4.length; i += 1) {
					const child_ctx = get_each_context_4$2(ctx, each_value_4, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_4$2(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(tbody0, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_4.length;
			}

			if (/*levels*/ ctx[9].length) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block$7(ctx);
					if_block2.c();
					if_block2.m(section, t17);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (dirty[0] & /*field*/ 4096 && t19_value !== (t19_value = /*field*/ ctx[12]?.id + "")) set_data(t19, t19_value);

			if (dirty[0] & /*geometry, field, prefs*/ 135170) {
				each_value = ensure_array_like(/*geometry*/ ctx[17].points);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$6(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$6(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(tbody1, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(section);
			}

			destroy_each(each_blocks_3, detaching);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			destroy_each(each_blocks_2, detaching);
			destroy_each(each_blocks_1, detaching);
			if (if_block2) if_block2.d();
			destroy_each(each_blocks, detaching);
			mounted = false;
			run_all(dispose);
		}
	};
}

const func$1 = p => p.y !== null;
const func_1$1 = p => p.y !== null;

function instance$9($$self, $$props, $$invalidate) {
	let candidates;
	let matches;
	let field;
	let start;
	let end;
	let geometry;
	let matrix;
	let times;
	let levels;
	let curtain;
	let curtainValues;
	let curtainMin;
	let curtainMax;

	let { fields = [], valid, prefs = {}, onTime = () => {
		
	} } = $$props;

	let { terrain = null } = $$props;
	let chosen = 'data.temperature', query = '', hours = 48, layer = 'rh';

	function curtainValue(row, t) {
		const z = row.height ? at(row.height, t) : null;
		if (finite(terrain) && finite(z) && z < terrain) return null;
		return row.field ? at(row.field, t) : null;
	}

	function input_input_handler() {
		query = this.value;
		$$invalidate(4, query);
	}

	function select0_change_handler() {
		hours = select_value(this);
		$$invalidate(5, hours);
	}

	function select1_change_handler() {
		chosen = select_value(this);
		$$invalidate(3, chosen);
		((($$invalidate(13, matches), $$invalidate(22, candidates)), $$invalidate(4, query)), $$invalidate(19, fields));
	}

	const click_handler = t => onTime(t);
	const click_handler_1 = t => onTime(t);

	function select_change_handler() {
		layer = select_value(this);
		$$invalidate(6, layer);
	}

	const click_handler_2 = t => onTime(t);
	const click_handler_3 = t => onTime(t);

	$$self.$$set = $$props => {
		if ('fields' in $$props) $$invalidate(19, fields = $$props.fields);
		if ('valid' in $$props) $$invalidate(0, valid = $$props.valid);
		if ('prefs' in $$props) $$invalidate(1, prefs = $$props.prefs);
		if ('onTime' in $$props) $$invalidate(2, onTime = $$props.onTime);
		if ('terrain' in $$props) $$invalidate(20, terrain = $$props.terrain);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*fields*/ 524288) {
			$$invalidate(22, candidates = fields.filter(f => f.section !== 'derived' && f.values.some(finite) && !['code', 'boolean', 'raw', '°'].includes(f.unit)));
		}

		if ($$self.$$.dirty[0] & /*candidates, query*/ 4194320) {
			$$invalidate(13, matches = candidates.filter(f => `${f.label} ${f.key}`.toLowerCase().includes(query.toLowerCase())));
		}

		if ($$self.$$.dirty[0] & /*matches, chosen*/ 8200) {
			$$invalidate(12, field = matches.find(f => f.id === chosen) || matches[0]);
		}

		if ($$self.$$.dirty[0] & /*valid*/ 1) {
			$$invalidate(11, start = valid);
		}

		if ($$self.$$.dirty[0] & /*start, hours*/ 2080) {
			$$invalidate(10, end = start + hours * HOUR$1);
		}

		if ($$self.$$.dirty[0] & /*field, start, end*/ 7168) {
			$$invalidate(17, geometry = seriesGeometry(field, start, end));
		}

		if ($$self.$$.dirty[0] & /*candidates*/ 4194304) {
			$$invalidate(16, matrix = [
				'temperature',
				'dewPoint',
				'wind',
				'windGust',
				'pressure',
				'precipAmount',
				'cloud-surface'
			].map(k => candidates.find(f => f.key === k)).filter(Boolean));
		}

		if ($$self.$$.dirty[0] & /*field, start, end*/ 7168) {
			$$invalidate(7, times = field?.ts.filter(t => t >= start && t <= end) || []);
		}

		if ($$self.$$.dirty[0] & /*fields*/ 524288) {
			$$invalidate(9, levels = [
				...new Set(fields.map(f => f.key.match(/^(?:temp|rh|cloud|wind)-(\d+)h$/)?.[1]).filter(Boolean))
			].map(Number).sort((a, b) => a - b));
		}

		if ($$self.$$.dirty[0] & /*levels, fields, layer*/ 524864) {
			$$invalidate(8, curtain = levels.map(p => ({
				p,
				field: fields.find(f => f.key === `${layer}-${p}h`),
				height: fields.find(f => f.key === `gh-${p}h`)
			})));
		}

		if ($$self.$$.dirty[0] & /*curtain, times*/ 384) {
			$$invalidate(21, curtainValues = curtain.flatMap(row => times.map(t => curtainValue(row, t))).filter(finite));
		}

		if ($$self.$$.dirty[0] & /*layer, curtainValues*/ 2097216) {
			$$invalidate(15, curtainMin = ['rh', 'cloud'].includes(layer)
			? 0
			: curtainValues.length ? Math.min(...curtainValues) : null);
		}

		if ($$self.$$.dirty[0] & /*layer, curtainValues*/ 2097216) {
			$$invalidate(14, curtainMax = ['rh', 'cloud'].includes(layer)
			? 100
			: curtainValues.length ? Math.max(...curtainValues) : null);
		}
	};

	return [
		valid,
		prefs,
		onTime,
		chosen,
		query,
		hours,
		layer,
		times,
		curtain,
		levels,
		end,
		start,
		field,
		matches,
		curtainMax,
		curtainMin,
		matrix,
		geometry,
		curtainValue,
		fields,
		terrain,
		curtainValues,
		candidates,
		input_input_handler,
		select0_change_handler,
		select1_change_handler,
		click_handler,
		click_handler_1,
		select_change_handler,
		click_handler_2,
		click_handler_3
	];
}

class Explorer extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$9,
			create_fragment$9,
			safe_not_equal,
			{
				fields: 19,
				valid: 0,
				prefs: 1,
				onTime: 2,
				terrain: 20
			},
			add_css$8,
			[-1, -1]
		);
	}
}

// These are invitations to inspect diagnostics, never precipitation-phase predictions.
function winterRelevant(data,time){
 return (data?.ts||[]).some(t=>t>=time&&t<=time+24*HOUR$1&&(
  (finite(value(data,'temperature',t))&&value(data,'temperature',t)<=275.15)||
  (finite(value(data,'precipSnowAmount',t))&&value(data,'precipSnowAmount',t)>0)));
}
function nextSignal(data,time,thresholds){
 const events=[];
 for(const [key,limit,label] of [['precipAmount',thresholds.rain,'Wet interval'],['windGust',thresholds.gust,'Gust signal']]){
  const f=fieldFor(data,key);if(!f||!finite(limit)||limit<=0)continue;
  const i=f.ts.findIndex((t,i)=>t>=time&&t<=time+24*HOUR$1&&finite(f.values[i])&&f.values[i]>=limit);
  if(i>=0)events.push({key,label,time:f.ts[i],value:f.values[i],limit});
 }
 return events.sort((a,b)=>a.time-b.time)[0]||null;
}

/* src\Brief.svelte generated by Svelte v4.2.20 */

function add_css$7(target) {
	append_styles(target, "svelte-1jvfqv1", ".temperature-chart.svelte-1jvfqv1.svelte-1jvfqv1{margin:16px 0}.temperature-chart.svelte-1jvfqv1 svg.svelte-1jvfqv1{width:100%;display:block}.temperature-chart.svelte-1jvfqv1 path.svelte-1jvfqv1{fill:none;stroke:var(--mint,#7be4ca);stroke-width:2.5}.temperature-chart.svelte-1jvfqv1 circle.svelte-1jvfqv1{fill:var(--mint,#7be4ca)}.temperature-chart.svelte-1jvfqv1 text.svelte-1jvfqv1{fill:var(--muted,#b2c7d1);font-size:11px}.hourly.svelte-1jvfqv1.svelte-1jvfqv1{margin:12px 0}.hourly.svelte-1jvfqv1 summary.svelte-1jvfqv1{font-size:12px;cursor:pointer;color:var(--muted,#b2c7d1)}section.svelte-1jvfqv1.svelte-1jvfqv1{color:var(--ink,#edf7fa)}small.svelte-1jvfqv1.svelte-1jvfqv1{display:block;color:var(--muted,#b2c7d1);font-size:11px}.conditions.svelte-1jvfqv1.svelte-1jvfqv1{display:grid;grid-template-columns:1.1fr 1fr;gap:16px;padding:20px;background:var(--aurora-hero,linear-gradient(125deg,#193e43,#183044));border-radius:14px;margin:16px 0 10px;align-items:center}.temperature.svelte-1jvfqv1>strong.svelte-1jvfqv1{display:block;font-size:40px;font-weight:500;letter-spacing:-1.5px;line-height:1.4}.conditions.svelte-1jvfqv1 span.svelte-1jvfqv1{font-size:12px;color:var(--muted,#b2c7d1)}.wind.svelte-1jvfqv1>strong.svelte-1jvfqv1{display:block;font-size:20px;font-weight:500;margin:10px 0}.wind.svelte-1jvfqv1>strong span.svelte-1jvfqv1{display:block;font-size:16px;color:var(--ink,#edf7fa)}.essentials.svelte-1jvfqv1.svelte-1jvfqv1{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.essentials.svelte-1jvfqv1>div.svelte-1jvfqv1{padding:12px 10px;background:var(--panel,#152b37);border-radius:10px;min-width:0}.essentials.svelte-1jvfqv1 strong.svelte-1jvfqv1{display:block;font-size:15px;font-weight:500;margin-top:6px;overflow-wrap:anywhere}.signal.svelte-1jvfqv1.svelte-1jvfqv1{border-left:2px solid var(--mint,#7be4ca);padding:2px 12px;margin:18px 0}.signal.svelte-1jvfqv1 small.svelte-1jvfqv1{letter-spacing:.8px}.signal.svelte-1jvfqv1 p.svelte-1jvfqv1{font-size:13px;line-height:1.65;margin:5px 0}.signal.svelte-1jvfqv1 b.svelte-1jvfqv1{font-weight:500}.heading.svelte-1jvfqv1.svelte-1jvfqv1{display:flex;justify-content:space-between;gap:10px;align-items:center;margin:18px 0 10px}h2.svelte-1jvfqv1.svelte-1jvfqv1{font-size:16px;font-weight:500;color:inherit;margin:0}.timeline.svelte-1jvfqv1.svelte-1jvfqv1{overflow:auto;border:1px solid var(--line,#36505e);border-radius:12px}table.svelte-1jvfqv1.svelte-1jvfqv1{width:100%;border-collapse:collapse;font-size:12px;white-space:nowrap}th.svelte-1jvfqv1.svelte-1jvfqv1,td.svelte-1jvfqv1.svelte-1jvfqv1{padding:10px;text-align:right;border-bottom:1px solid #2b424f}th.svelte-1jvfqv1.svelte-1jvfqv1{font-weight:400;color:var(--muted,#b2c7d1)}th.svelte-1jvfqv1.svelte-1jvfqv1:first-child{position:sticky;left:0;z-index:1;background:var(--panel,#152b37);text-align:left}button.svelte-1jvfqv1.svelte-1jvfqv1{font:inherit;cursor:pointer}th.svelte-1jvfqv1 button.svelte-1jvfqv1{background:transparent;border:0;color:inherit;min-height:42px;padding:6px}th.svelte-1jvfqv1 button.active.svelte-1jvfqv1{background:#28504a;color:#d7fff1;border-radius:8px}.wet.svelte-1jvfqv1.svelte-1jvfqv1{background:#234956;color:#e1f8ff}.note.svelte-1jvfqv1.svelte-1jvfqv1{font-size:11px;color:var(--muted,#b2c7d1);line-height:1.6;margin:10px 0}.winter.svelte-1jvfqv1.svelte-1jvfqv1{display:block;width:100%;background:#1c3548;color:#e4f1fa;border:1px solid #456278;padding:12px;border-radius:10px;text-align:left;font-size:13px;line-height:1.5}.winter.svelte-1jvfqv1 small.svelte-1jvfqv1{margin-top:5px}button.svelte-1jvfqv1.svelte-1jvfqv1:focus-visible{outline:2px solid var(--mint,#7be4ca);outline-offset:2px}@media(max-width:400px){.conditions.svelte-1jvfqv1.svelte-1jvfqv1{padding:16px;gap:12px}.temperature.svelte-1jvfqv1>strong.svelte-1jvfqv1{font-size:34px}.wind.svelte-1jvfqv1>strong.svelte-1jvfqv1{font-size:18px}.essentials.svelte-1jvfqv1 strong.svelte-1jvfqv1{font-size:13px}.essentials.svelte-1jvfqv1>div.svelte-1jvfqv1{padding:10px 8px}}");
}

function get_each_context$5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[15] = list[i];
	return child_ctx;
}

function get_each_context_1$4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[18] = list[i];
	const constants_0 = value(/*data*/ child_ctx[0], /*key*/ child_ctx[15], /*t*/ child_ctx[18]);
	child_ctx[19] = constants_0;
	return child_ctx;
}

function get_each_context_2$4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[18] = list[i];
	return child_ctx;
}

function get_each_context_3$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[24] = list[i];
	return child_ctx;
}

// (19:259) {:else}
function create_else_block$4(ctx) {
	let p_1;

	return {
		c() {
			p_1 = element("p");
			p_1.textContent = "No rain or gust threshold exceedance found in the available samples.";
			attr(p_1, "class", "svelte-1jvfqv1");
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

// (19:49) {#if signal}
function create_if_block_1$5(ctx) {
	let p_1;
	let b;
	let t0_value = /*signal*/ ctx[8].label + "";
	let t0;
	let t1;
	let t2_value = timeLabel(/*signal*/ ctx[8].time, /*prefs*/ ctx[2].local) + "";
	let t2;
	let t3_value = (/*prefs*/ ctx[2].local ? ' local' : ' UTC') + "";
	let t3;
	let br;
	let t4_value = /*show*/ ctx[10](/*signal*/ ctx[8].key, /*signal*/ ctx[8].time) + "";
	let t4;
	let t5;
	let t6_value = format(/*signal*/ ctx[8].limit, describe(/*signal*/ ctx[8].key).unit, /*prefs*/ ctx[2]) + "";
	let t6;

	return {
		c() {
			p_1 = element("p");
			b = element("b");
			t0 = text(t0_value);
			t1 = text(" · ");
			t2 = text(t2_value);
			t3 = text(t3_value);
			br = element("br");
			t4 = text(t4_value);
			t5 = text(" · threshold ");
			t6 = text(t6_value);
			attr(b, "class", "svelte-1jvfqv1");
			attr(p_1, "class", "svelte-1jvfqv1");
		},
		m(target, anchor) {
			insert(target, p_1, anchor);
			append(p_1, b);
			append(b, t0);
			append(p_1, t1);
			append(p_1, t2);
			append(p_1, t3);
			append(p_1, br);
			append(p_1, t4);
			append(p_1, t5);
			append(p_1, t6);
		},
		p(ctx, dirty) {
			if (dirty & /*signal*/ 256 && t0_value !== (t0_value = /*signal*/ ctx[8].label + "")) set_data(t0, t0_value);
			if (dirty & /*signal, prefs*/ 260 && t2_value !== (t2_value = timeLabel(/*signal*/ ctx[8].time, /*prefs*/ ctx[2].local) + "")) set_data(t2, t2_value);
			if (dirty & /*prefs*/ 4 && t3_value !== (t3_value = (/*prefs*/ ctx[2].local ? ' local' : ' UTC') + "")) set_data(t3, t3_value);
			if (dirty & /*signal*/ 256 && t4_value !== (t4_value = /*show*/ ctx[10](/*signal*/ ctx[8].key, /*signal*/ ctx[8].time) + "")) set_data(t4, t4_value);
			if (dirty & /*signal, prefs*/ 260 && t6_value !== (t6_value = format(/*signal*/ ctx[8].limit, describe(/*signal*/ ctx[8].key).unit, /*prefs*/ ctx[2]) + "")) set_data(t6, t6_value);
		},
		d(detaching) {
			if (detaching) {
				detach(p_1);
			}
		}
	};
}

// (20:1) {#if winter}
function create_if_block$6(ctx) {
	let button;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
			button.innerHTML = `Cold or snowy conditions in the source forecast → Winter details <small class="svelte-1jvfqv1">Check ECMWF snowline and precipitation type</small>`;
			attr(button, "class", "winter svelte-1jvfqv1");
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (!mounted) {
				dispose = listen(button, "click", function () {
					if (is_function(/*onWinter*/ ctx[4])) /*onWinter*/ ctx[4].apply(this, arguments);
				});

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

// (21:223) {#each chart.points.filter(p=>p.y!==null) as p}
function create_each_block_3$2(ctx) {
	let circle;
	let title;
	let t0_value = timeLabel(/*p*/ ctx[24].t, /*prefs*/ ctx[2].local) + "";
	let t0;
	let t1;
	let t2_value = format(/*p*/ ctx[24].v, 'K', /*prefs*/ ctx[2]) + "";
	let t2;
	let circle_cx_value;
	let circle_cy_value;

	return {
		c() {
			circle = svg_element("circle");
			title = svg_element("title");
			t0 = text(t0_value);
			t1 = text(" · ");
			t2 = text(t2_value);
			attr(circle, "cx", circle_cx_value = /*p*/ ctx[24].x);
			attr(circle, "cy", circle_cy_value = /*p*/ ctx[24].y);
			attr(circle, "r", "3");
			attr(circle, "class", "svelte-1jvfqv1");
		},
		m(target, anchor) {
			insert(target, circle, anchor);
			append(circle, title);
			append(title, t0);
			append(title, t1);
			append(title, t2);
		},
		p(ctx, dirty) {
			if (dirty & /*chart, prefs*/ 516 && t0_value !== (t0_value = timeLabel(/*p*/ ctx[24].t, /*prefs*/ ctx[2].local) + "")) set_data(t0, t0_value);
			if (dirty & /*chart, prefs*/ 516 && t2_value !== (t2_value = format(/*p*/ ctx[24].v, 'K', /*prefs*/ ctx[2]) + "")) set_data(t2, t2_value);

			if (dirty & /*chart*/ 512 && circle_cx_value !== (circle_cx_value = /*p*/ ctx[24].x)) {
				attr(circle, "cx", circle_cx_value);
			}

			if (dirty & /*chart*/ 512 && circle_cy_value !== (circle_cy_value = /*p*/ ctx[24].y)) {
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

// (24:111) {#each slots as t}
function create_each_block_2$4(ctx) {
	let th;
	let button;
	let t_1_value = timeLabel(/*t*/ ctx[18], /*prefs*/ ctx[2].local) + "";
	let t_1;
	let button_aria_label_value;
	let mounted;
	let dispose;

	function click_handler() {
		return /*click_handler*/ ctx[14](/*t*/ ctx[18]);
	}

	return {
		c() {
			th = element("th");
			button = element("button");
			t_1 = text(t_1_value);
			attr(button, "aria-label", button_aria_label_value = `Select ${timeLabel(/*t*/ ctx[18], /*prefs*/ ctx[2].local)}`);
			attr(button, "class", "svelte-1jvfqv1");
			toggle_class(button, "active", /*t*/ ctx[18] === /*valid*/ ctx[1]);
			attr(th, "class", "svelte-1jvfqv1");
		},
		m(target, anchor) {
			insert(target, th, anchor);
			append(th, button);
			append(button, t_1);

			if (!mounted) {
				dispose = listen(button, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*slots, prefs*/ 68 && t_1_value !== (t_1_value = timeLabel(/*t*/ ctx[18], /*prefs*/ ctx[2].local) + "")) set_data(t_1, t_1_value);

			if (dirty & /*slots, prefs*/ 68 && button_aria_label_value !== (button_aria_label_value = `Select ${timeLabel(/*t*/ ctx[18], /*prefs*/ ctx[2].local)}`)) {
				attr(button, "aria-label", button_aria_label_value);
			}

			if (dirty & /*slots, valid*/ 66) {
				toggle_class(button, "active", /*t*/ ctx[18] === /*valid*/ ctx[1]);
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

// (24:405) {#each slots as t}
function create_each_block_1$4(ctx) {
	let td;
	let t_1_value = /*show*/ ctx[10](/*key*/ ctx[15], /*t*/ ctx[18]) + "";
	let t_1;

	return {
		c() {
			td = element("td");
			t_1 = text(t_1_value);
			attr(td, "class", "svelte-1jvfqv1");
			toggle_class(td, "wet", /*key*/ ctx[15] === 'precipAmount' && finite(/*v*/ ctx[19]) && /*v*/ ctx[19] > 0);
		},
		m(target, anchor) {
			insert(target, td, anchor);
			append(td, t_1);
		},
		p(ctx, dirty) {
			if (dirty & /*slots*/ 64 && t_1_value !== (t_1_value = /*show*/ ctx[10](/*key*/ ctx[15], /*t*/ ctx[18]) + "")) set_data(t_1, t_1_value);

			if (dirty & /*data, slots*/ 65) {
				toggle_class(td, "wet", /*key*/ ctx[15] === 'precipAmount' && finite(/*v*/ ctx[19]) && /*v*/ ctx[19] > 0);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(td);
			}
		}
	};
}

// (24:308) {#each ['temperature','wind','windGust','precipAmount'] as key}
function create_each_block$5(ctx) {
	let tr;
	let th;
	let each_value_1 = ensure_array_like(/*slots*/ ctx[6]);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$4(get_each_context_1$4(ctx, each_value_1, i));
	}

	return {
		c() {
			tr = element("tr");
			th = element("th");
			th.textContent = `${describe(/*key*/ ctx[15]).label}`;

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(th, "class", "svelte-1jvfqv1");
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
			if (dirty & /*data, slots, show*/ 1089) {
				each_value_1 = ensure_array_like(/*slots*/ ctx[6]);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$4(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1$4(child_ctx);
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

function create_fragment$8(ctx) {
	let section;
	let div2;
	let div0;
	let small0;
	let strong0;
	let t1_value = /*show*/ ctx[10]('temperature', /*valid*/ ctx[1]) + "";
	let t1;
	let span0;
	let t2;
	let t3_value = /*show*/ ctx[10]('dewPoint', /*valid*/ ctx[1]) + "";
	let t3;
	let div1;
	let small1;
	let strong1;
	let t5_value = /*show*/ ctx[10]('wind', /*valid*/ ctx[1]) + "";
	let t5;
	let t6;
	let span1;
	let t7;
	let t8_value = /*show*/ ctx[10]('windGust', /*valid*/ ctx[1]) + "";
	let t8;
	let span2;
	let t9;
	let t10;
	let div6;
	let div3;
	let small2;
	let strong2;
	let t12_value = /*show*/ ctx[10]('precipAmount', /*valid*/ ctx[1]) + "";
	let t12;
	let div4;
	let small3;
	let strong3;
	let t14_value = /*show*/ ctx[10]('cloudBase', /*valid*/ ctx[1]) + "";
	let t14;
	let div5;
	let small4;
	let strong4;
	let t16_value = /*show*/ ctx[10]('pressure', /*valid*/ ctx[1]) + "";
	let t16;
	let t17;
	let div7;
	let small5;
	let t19;
	let t20;
	let div8;
	let small6;
	let t21;
	let t22_value = (/*prefs*/ ctx[2].local ? 'local' : 'UTC') + "";
	let t22;
	let svg;
	let path;
	let path_d_value;
	let text0;
	let t23_value = format(/*chart*/ ctx[9].max, 'K', /*prefs*/ ctx[2]) + "";
	let t23;
	let text1;
	let t24_value = format(/*chart*/ ctx[9].min, 'K', /*prefs*/ ctx[2]) + "";
	let t24;
	let text2;
	let t25_value = timeLabel(/*valid*/ ctx[1], /*prefs*/ ctx[2].local) + "";
	let t25;
	let text3;
	let t26_value = timeLabel(/*valid*/ ctx[1] + 24 * HOUR$1, /*prefs*/ ctx[2].local) + "";
	let t26;
	let t27;
	let details;
	let summary;
	let t29;
	let div9;
	let h2;
	let small7;
	let t31;
	let t32_value = (/*prefs*/ ctx[2].local ? 'local' : 'UTC') + "";
	let t32;
	let t33;
	let div10;
	let table;
	let thead;
	let tr;
	let th;
	let tbody;
	let t35;
	let p_1;

	function select_block_type(ctx, dirty) {
		if (/*signal*/ ctx[8]) return create_if_block_1$5;
		return create_else_block$4;
	}

	let current_block_type = select_block_type(ctx);
	let if_block0 = current_block_type(ctx);
	let if_block1 = /*winter*/ ctx[7] && create_if_block$6(ctx);
	let each_value_3 = ensure_array_like(/*chart*/ ctx[9].points.filter(func));
	let each_blocks_2 = [];

	for (let i = 0; i < each_value_3.length; i += 1) {
		each_blocks_2[i] = create_each_block_3$2(get_each_context_3$2(ctx, each_value_3, i));
	}

	let each_value_2 = ensure_array_like(/*slots*/ ctx[6]);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks_1[i] = create_each_block_2$4(get_each_context_2$4(ctx, each_value_2, i));
	}

	let each_value = ensure_array_like(['temperature', 'wind', 'windGust', 'precipAmount']);
	let each_blocks = [];

	for (let i = 0; i < 4; i += 1) {
		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
	}

	return {
		c() {
			section = element("section");
			div2 = element("div");
			div0 = element("div");
			small0 = element("small");
			small0.textContent = "Temperature";
			strong0 = element("strong");
			t1 = text(t1_value);
			span0 = element("span");
			t2 = text("Dew point ");
			t3 = text(t3_value);
			div1 = element("div");
			small1 = element("small");
			small1.textContent = "Wind / gusts";
			strong1 = element("strong");
			t5 = text(t5_value);
			t6 = space();
			span1 = element("span");
			t7 = text("/ ");
			t8 = text(t8_value);
			span2 = element("span");
			t9 = text(/*windFrom*/ ctx[5]);
			t10 = space();
			div6 = element("div");
			div3 = element("div");
			small2 = element("small");
			small2.textContent = "Precipitation";
			strong2 = element("strong");
			t12 = text(t12_value);
			div4 = element("div");
			small3 = element("small");
			small3.textContent = "Cloud base";
			strong3 = element("strong");
			t14 = text(t14_value);
			div5 = element("div");
			small4 = element("small");
			small4.textContent = "Pressure";
			strong4 = element("strong");
			t16 = text(t16_value);
			t17 = space();
			div7 = element("div");
			small5 = element("small");
			small5.textContent = "NEXT 24 HOURS";
			if_block0.c();
			t19 = space();
			if (if_block1) if_block1.c();
			t20 = space();
			div8 = element("div");
			small6 = element("small");
			t21 = text("Temperature · next 24 hours · ");
			t22 = text(t22_value);
			svg = svg_element("svg");
			path = svg_element("path");

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].c();
			}

			text0 = svg_element("text");
			t23 = text(t23_value);
			text1 = svg_element("text");
			t24 = text(t24_value);
			text2 = svg_element("text");
			t25 = text(t25_value);
			text3 = svg_element("text");
			t26 = text(t26_value);
			t27 = space();
			details = element("details");
			summary = element("summary");
			summary.textContent = "Hourly forecast table";
			t29 = space();
			div9 = element("div");
			h2 = element("h2");
			h2.textContent = "Next 24 hours";
			small7 = element("small");
			t31 = text("Tap a time · ");
			t32 = text(t32_value);
			t33 = space();
			div10 = element("div");
			table = element("table");
			thead = element("thead");
			tr = element("tr");
			th = element("th");
			th.textContent = "Forecast";

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			tbody = element("tbody");

			for (let i = 0; i < 4; i += 1) {
				each_blocks[i].c();
			}

			t35 = space();
			p_1 = element("p");
			p_1.textContent = "Amounts are per forecast interval. — means unavailable. Forecasts are not observations.";
			attr(small0, "class", "svelte-1jvfqv1");
			attr(strong0, "class", "svelte-1jvfqv1");
			attr(span0, "class", "svelte-1jvfqv1");
			attr(div0, "class", "temperature svelte-1jvfqv1");
			attr(small1, "class", "svelte-1jvfqv1");
			attr(span1, "class", "svelte-1jvfqv1");
			attr(strong1, "class", "svelte-1jvfqv1");
			attr(span2, "class", "svelte-1jvfqv1");
			attr(div1, "class", "wind svelte-1jvfqv1");
			attr(div2, "class", "conditions svelte-1jvfqv1");
			attr(small2, "class", "svelte-1jvfqv1");
			attr(strong2, "class", "svelte-1jvfqv1");
			attr(div3, "class", "svelte-1jvfqv1");
			attr(small3, "class", "svelte-1jvfqv1");
			attr(strong3, "class", "svelte-1jvfqv1");
			attr(div4, "class", "svelte-1jvfqv1");
			attr(small4, "class", "svelte-1jvfqv1");
			attr(strong4, "class", "svelte-1jvfqv1");
			attr(div5, "class", "svelte-1jvfqv1");
			attr(div6, "class", "essentials svelte-1jvfqv1");
			attr(small5, "class", "svelte-1jvfqv1");
			attr(div7, "class", "signal svelte-1jvfqv1");
			attr(small6, "class", "svelte-1jvfqv1");
			attr(path, "d", path_d_value = /*chart*/ ctx[9].path);
			attr(path, "class", "svelte-1jvfqv1");
			attr(text0, "x", "48");
			attr(text0, "y", "15");
			attr(text0, "class", "svelte-1jvfqv1");
			attr(text1, "x", "48");
			attr(text1, "y", "166");
			attr(text1, "class", "svelte-1jvfqv1");
			attr(text2, "x", "48");
			attr(text2, "y", "184");
			attr(text2, "class", "svelte-1jvfqv1");
			attr(text3, "x", "536");
			attr(text3, "y", "184");
			attr(text3, "text-anchor", "end");
			attr(text3, "class", "svelte-1jvfqv1");
			attr(svg, "viewBox", "0 0 560 190");
			attr(svg, "role", "img");
			attr(svg, "aria-label", "24-hour temperature trend with gaps preserved");
			attr(svg, "class", "svelte-1jvfqv1");
			attr(div8, "class", "temperature-chart svelte-1jvfqv1");
			attr(summary, "class", "svelte-1jvfqv1");
			attr(h2, "class", "svelte-1jvfqv1");
			attr(small7, "class", "svelte-1jvfqv1");
			attr(div9, "class", "heading svelte-1jvfqv1");
			attr(th, "class", "svelte-1jvfqv1");
			attr(table, "class", "svelte-1jvfqv1");
			attr(div10, "class", "timeline svelte-1jvfqv1");
			attr(div10, "role", "region");
			attr(div10, "aria-label", "24-hour forecast timeline");
			attr(details, "class", "hourly svelte-1jvfqv1");
			attr(p_1, "class", "note svelte-1jvfqv1");
			attr(section, "aria-label", "Forecast briefing");
			attr(section, "class", "svelte-1jvfqv1");
		},
		m(target, anchor) {
			insert(target, section, anchor);
			append(section, div2);
			append(div2, div0);
			append(div0, small0);
			append(div0, strong0);
			append(strong0, t1);
			append(div0, span0);
			append(span0, t2);
			append(span0, t3);
			append(div2, div1);
			append(div1, small1);
			append(div1, strong1);
			append(strong1, t5);
			append(strong1, t6);
			append(strong1, span1);
			append(span1, t7);
			append(span1, t8);
			append(div1, span2);
			append(span2, t9);
			append(section, t10);
			append(section, div6);
			append(div6, div3);
			append(div3, small2);
			append(div3, strong2);
			append(strong2, t12);
			append(div6, div4);
			append(div4, small3);
			append(div4, strong3);
			append(strong3, t14);
			append(div6, div5);
			append(div5, small4);
			append(div5, strong4);
			append(strong4, t16);
			append(section, t17);
			append(section, div7);
			append(div7, small5);
			if_block0.m(div7, null);
			append(section, t19);
			if (if_block1) if_block1.m(section, null);
			append(section, t20);
			append(section, div8);
			append(div8, small6);
			append(small6, t21);
			append(small6, t22);
			append(div8, svg);
			append(svg, path);

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				if (each_blocks_2[i]) {
					each_blocks_2[i].m(svg, null);
				}
			}

			append(svg, text0);
			append(text0, t23);
			append(svg, text1);
			append(text1, t24);
			append(svg, text2);
			append(text2, t25);
			append(svg, text3);
			append(text3, t26);
			append(section, t27);
			append(section, details);
			append(details, summary);
			append(details, t29);
			append(details, div9);
			append(div9, h2);
			append(div9, small7);
			append(small7, t31);
			append(small7, t32);
			append(details, t33);
			append(details, div10);
			append(div10, table);
			append(table, thead);
			append(thead, tr);
			append(tr, th);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(tr, null);
				}
			}

			append(table, tbody);

			for (let i = 0; i < 4; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(tbody, null);
				}
			}

			append(details, t35);
			append(section, p_1);
		},
		p(ctx, [dirty]) {
			if (dirty & /*valid*/ 2 && t1_value !== (t1_value = /*show*/ ctx[10]('temperature', /*valid*/ ctx[1]) + "")) set_data(t1, t1_value);
			if (dirty & /*valid*/ 2 && t3_value !== (t3_value = /*show*/ ctx[10]('dewPoint', /*valid*/ ctx[1]) + "")) set_data(t3, t3_value);
			if (dirty & /*valid*/ 2 && t5_value !== (t5_value = /*show*/ ctx[10]('wind', /*valid*/ ctx[1]) + "")) set_data(t5, t5_value);
			if (dirty & /*valid*/ 2 && t8_value !== (t8_value = /*show*/ ctx[10]('windGust', /*valid*/ ctx[1]) + "")) set_data(t8, t8_value);
			if (dirty & /*windFrom*/ 32) set_data(t9, /*windFrom*/ ctx[5]);
			if (dirty & /*valid*/ 2 && t12_value !== (t12_value = /*show*/ ctx[10]('precipAmount', /*valid*/ ctx[1]) + "")) set_data(t12, t12_value);
			if (dirty & /*valid*/ 2 && t14_value !== (t14_value = /*show*/ ctx[10]('cloudBase', /*valid*/ ctx[1]) + "")) set_data(t14, t14_value);
			if (dirty & /*valid*/ 2 && t16_value !== (t16_value = /*show*/ ctx[10]('pressure', /*valid*/ ctx[1]) + "")) set_data(t16, t16_value);

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(div7, null);
				}
			}

			if (/*winter*/ ctx[7]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block$6(ctx);
					if_block1.c();
					if_block1.m(section, t20);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty & /*prefs*/ 4 && t22_value !== (t22_value = (/*prefs*/ ctx[2].local ? 'local' : 'UTC') + "")) set_data(t22, t22_value);

			if (dirty & /*chart*/ 512 && path_d_value !== (path_d_value = /*chart*/ ctx[9].path)) {
				attr(path, "d", path_d_value);
			}

			if (dirty & /*chart, prefs*/ 516) {
				each_value_3 = ensure_array_like(/*chart*/ ctx[9].points.filter(func));
				let i;

				for (i = 0; i < each_value_3.length; i += 1) {
					const child_ctx = get_each_context_3$2(ctx, each_value_3, i);

					if (each_blocks_2[i]) {
						each_blocks_2[i].p(child_ctx, dirty);
					} else {
						each_blocks_2[i] = create_each_block_3$2(child_ctx);
						each_blocks_2[i].c();
						each_blocks_2[i].m(svg, text0);
					}
				}

				for (; i < each_blocks_2.length; i += 1) {
					each_blocks_2[i].d(1);
				}

				each_blocks_2.length = each_value_3.length;
			}

			if (dirty & /*chart, prefs*/ 516 && t23_value !== (t23_value = format(/*chart*/ ctx[9].max, 'K', /*prefs*/ ctx[2]) + "")) set_data(t23, t23_value);
			if (dirty & /*chart, prefs*/ 516 && t24_value !== (t24_value = format(/*chart*/ ctx[9].min, 'K', /*prefs*/ ctx[2]) + "")) set_data(t24, t24_value);
			if (dirty & /*valid, prefs*/ 6 && t25_value !== (t25_value = timeLabel(/*valid*/ ctx[1], /*prefs*/ ctx[2].local) + "")) set_data(t25, t25_value);
			if (dirty & /*valid, prefs*/ 6 && t26_value !== (t26_value = timeLabel(/*valid*/ ctx[1] + 24 * HOUR$1, /*prefs*/ ctx[2].local) + "")) set_data(t26, t26_value);
			if (dirty & /*prefs*/ 4 && t32_value !== (t32_value = (/*prefs*/ ctx[2].local ? 'local' : 'UTC') + "")) set_data(t32, t32_value);

			if (dirty & /*slots, prefs, valid, onTime*/ 78) {
				each_value_2 = ensure_array_like(/*slots*/ ctx[6]);
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2$4(ctx, each_value_2, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_2$4(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(tr, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_2.length;
			}

			if (dirty & /*slots, data, show*/ 1089) {
				each_value = ensure_array_like(['temperature', 'wind', 'windGust', 'precipAmount']);
				let i;

				for (i = 0; i < 4; i += 1) {
					const child_ctx = get_each_context$5(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$5(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(tbody, null);
					}
				}

				for (; i < 4; i += 1) {
					each_blocks[i].d(1);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(section);
			}

			if_block0.d();
			if (if_block1) if_block1.d();
			destroy_each(each_blocks_2, detaching);
			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
		}
	};
}

const func = p => p.y !== null;

function instance$8($$self, $$props, $$invalidate) {
	let chart;
	let signal;
	let winter;
	let slots;
	let direction;
	let speed;
	let windFrom;

	let { data, valid, prefs, thresholds, onTime = () => {
		
	}, onWinter = () => {
		
	} } = $$props;

	const show = (key, t) => format(value(data, key, t), describe(key).unit, prefs);
	const click_handler = t => onTime(t);

	$$self.$$set = $$props => {
		if ('data' in $$props) $$invalidate(0, data = $$props.data);
		if ('valid' in $$props) $$invalidate(1, valid = $$props.valid);
		if ('prefs' in $$props) $$invalidate(2, prefs = $$props.prefs);
		if ('thresholds' in $$props) $$invalidate(11, thresholds = $$props.thresholds);
		if ('onTime' in $$props) $$invalidate(3, onTime = $$props.onTime);
		if ('onWinter' in $$props) $$invalidate(4, onWinter = $$props.onWinter);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*data, valid*/ 3) {
			$$invalidate(9, chart = seriesGeometry(fieldFor(data, 'temperature'), valid, valid + 24 * HOUR$1));
		}

		if ($$self.$$.dirty & /*data, valid, thresholds*/ 2051) {
			$$invalidate(8, signal = nextSignal(data, valid, thresholds));
		}

		if ($$self.$$.dirty & /*data, valid*/ 3) {
			$$invalidate(7, winter = winterRelevant(data, valid));
		}

		if ($$self.$$.dirty & /*data, valid*/ 3) {
			$$invalidate(6, slots = data.ts.filter(t => t >= valid && t <= valid + 24 * HOUR$1));
		}

		if ($$self.$$.dirty & /*data, valid*/ 3) {
			$$invalidate(12, direction = value(data, 'windDir', valid));
		}

		if ($$self.$$.dirty & /*data, valid*/ 3) {
			$$invalidate(13, speed = value(data, 'wind', valid));
		}

		if ($$self.$$.dirty & /*speed, direction*/ 12288) {
			$$invalidate(5, windFrom = finite(speed) && speed === 0
			? 'Calm'
			: finite(direction)
				? 'From ' + ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.round((direction % 360 + 360) % 360 / 45) % 8]
				: '');
		}
	};

	return [
		data,
		valid,
		prefs,
		onTime,
		onWinter,
		windFrom,
		slots,
		winter,
		signal,
		chart,
		show,
		thresholds,
		direction,
		speed,
		click_handler
	];
}

class Brief extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$8,
			create_fragment$8,
			safe_not_equal,
			{
				data: 0,
				valid: 1,
				prefs: 2,
				thresholds: 11,
				onTime: 3,
				onWinter: 4
			},
			add_css$7
		);
	}
}

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
 const end=time+hours*HOUR$1;
 const list=key=>{const f=fieldFor(data,key);return f?f.ts.flatMap((ts,i)=>ts>=time&&ts<=end&&finite(f.values[i])?[f.values[i]]:[]):[];};
 const temps=list('temperature'),gusts=list('windGust');
 const rain=fieldFor(data,'precipAmount');let rainTotal=0,cursor=time,complete=false;
 if(rain){for(let i=0;i<rain.ts.length-1;i++){const from=rain.ts[i],to=rain.ts[i+1];if(from<time||from>=end)continue;if(from!==cursor||to>end||to-from>3*HOUR$1||!finite(rain.values[i])||rain.values[i]<0)break;rainTotal+=rain.values[i];cursor=to;}complete=cursor===end;}
 return {low:temps.length?Math.min(...temps):null,high:temps.length?Math.max(...temps):null,maxGust:gusts.length?Math.max(...gusts):null,rain:complete?rainTotal:null,rainComplete:complete};
}

function dayOffset(data){const offset=data?.raw?.celestial?.TZoffset??data?.header?.utcOffset;return finite(offset)&&Math.abs(offset)<=14?offset:null;}
function sevenDays(data,now=Date.now(),local=false){
 const offset=dayOffset(data),point=offset!==null;
 const midnight=new Date(now+(point?offset*HOUR$1:0));
 if(local&&!point)midnight.setHours(0,0,0,0);else midnight.setUTCHours(0,0,0,0);
 const summaries=(Array.isArray(data?.summary)?data.summary:Object.values(data?.summary||{})).filter(s=>s&&typeof s==='object');
 return Array.from({length:7},(_,day)=>{
  const a=new Date(midnight),b=new Date(midnight);
  if(local&&!point){a.setDate(a.getDate()+day);b.setDate(b.getDate()+day+1);}else {a.setUTCDate(a.getUTCDate()+day);b.setUTCDate(b.getUTCDate()+day+1);}
  let start=+a-(point?offset*HOUR$1:0),end=+b-(point?offset*HOUR$1:0);
  // Provider timestamps identify the forecast point's calendar days, independently of the device.
  const key=t=>new Date(t+offset*HOUR$1).toISOString().slice(0,10);
  const dated=point?summaries.filter(s=>finite(s.timestamp)&&key(s.timestamp)===key(start)):[];
  const summary=dated.length===1?dated[0]:null;
  if(summary){start=summary.timestamp;const next=summaries.find(s=>finite(s.timestamp)&&s.timestamp>start&&s.timestamp<=start+25*HOUR$1);end=next?.timestamp??start+24*HOUR$1;}
  const ts=(data?.ts||[]).filter(t=>t>=start&&t<end),f=fieldFor(data,'temperature');
  const temperatures=f?f.ts.flatMap((t,i)=>t>=start&&t<end&&finite(f.values[i])?[f.values[i]]:[]):[];
  const totals=windowSummary(data,start,(end-start)/HOUR$1);
  const indices=ts.map(t=>data.ts.indexOf(t));
  const matching=summary?[summary]:point?[]:summaries.filter(s=>Number.isInteger(s.index)&&Number.isInteger(s.segments)&&s.segments>0&&indices.length&&indices.every(i=>i>=s.index&&i<s.index+s.segments));
  const p=matching.length===1?matching[0].predictability:null;
  const providerRange=summary&&finite(summary.tempMin)&&finite(summary.tempMax)&&summary.tempMin<=summary.tempMax;
  return {start,end,time:ts.length?ts.reduce((best,t)=>Math.abs(t-(start+end)/2)<Math.abs(best-(start+end)/2)?t:best,ts[0]):null,
   low:providerRange?summary.tempMin:temperatures.length?Math.min(...temperatures):null,high:providerRange?summary.tempMax:temperatures.length?Math.max(...temperatures):null,
   label:new Date(start+(point?offset*HOUR$1:0)).toLocaleDateString('en-GB',{weekday:'short',day:'numeric',...(!local||point?{timeZone:'UTC'}:{})}),
   rain:totals.rain,predictability:finite(p)&&p>=0&&p<=100?p:null,partial:!totals.rainComplete,providerRange:!!providerRange,available:ts.length>0};
 });
}

/* src\SevenDays.svelte generated by Svelte v4.2.20 */

function add_css$6(target) {
	append_styles(target, "svelte-1fkriqt", "details.svelte-1fkriqt.svelte-1fkriqt{margin-top:9px;color:var(--muted,#b2c7d1);font-size:11px}summary.svelte-1fkriqt.svelte-1fkriqt{cursor:pointer}.partial.svelte-1fkriqt.svelte-1fkriqt{display:block;font-size:9px;opacity:.8}.range.svelte-1fkriqt.svelte-1fkriqt{display:grid;grid-template-columns:25px 1fr 25px;gap:5px;align-items:center}.track.svelte-1fkriqt.svelte-1fkriqt{position:relative;height:4px;background:#304651;border-radius:4px;overflow:hidden}.track.svelte-1fkriqt em.svelte-1fkriqt{position:absolute;top:0;height:100%;border-radius:4px;background:var(--mint,#7be4ca)}.heading.svelte-1fkriqt.svelte-1fkriqt{display:flex;justify-content:space-between;align-items:center;gap:10px;margin:20px 0 10px}h2.svelte-1fkriqt.svelte-1fkriqt{margin:0;font-size:16px;font-weight:500;color:var(--ink,#edf7fa)}small.svelte-1fkriqt.svelte-1fkriqt{font-size:11px;color:var(--muted,#b2c7d1)}.week.svelte-1fkriqt.svelte-1fkriqt{border:1px solid var(--line,#36505e);border-radius:12px;overflow:hidden}.head.svelte-1fkriqt.svelte-1fkriqt,button.svelte-1fkriqt.svelte-1fkriqt{display:grid;grid-template-columns:.85fr 1.45fr .7fr 1fr;gap:8px;align-items:center;text-align:right;padding:10px 12px}.head.svelte-1fkriqt.svelte-1fkriqt{background:var(--panel,#152b37);font-size:11px;color:var(--muted,#b2c7d1)}.head.svelte-1fkriqt span.svelte-1fkriqt:first-child,button.svelte-1fkriqt span.svelte-1fkriqt:first-child{text-align:left}button.svelte-1fkriqt.svelte-1fkriqt{width:100%;font:12px/1.5 system-ui;border:0;border-top:1px solid var(--line,#36505e);background:transparent;color:var(--ink,#edf7fa);cursor:pointer;min-height:48px}button.chosen.svelte-1fkriqt.svelte-1fkriqt{background:#1b373c}button.svelte-1fkriqt.svelte-1fkriqt:hover{background:#23434a}button.svelte-1fkriqt.svelte-1fkriqt:disabled{opacity:.6;cursor:default}button.svelte-1fkriqt.svelte-1fkriqt:focus-visible{outline:2px solid var(--mint,#7be4ca);outline-offset:-2px}b.svelte-1fkriqt.svelte-1fkriqt{font-weight:500}i.svelte-1fkriqt.svelte-1fkriqt{display:block;height:4px;width:52px;max-width:100%;margin:5px 0 0 auto;background:#34515a;border-radius:3px;overflow:hidden}em.svelte-1fkriqt.svelte-1fkriqt{display:block;height:100%;background:var(--mint,#7be4ca)}p.svelte-1fkriqt.svelte-1fkriqt{font-size:11px;line-height:1.6;color:var(--muted,#b2c7d1);margin:10px 0}@media(max-width:380px){.head.svelte-1fkriqt.svelte-1fkriqt,button.svelte-1fkriqt.svelte-1fkriqt{padding:9px 8px;gap:5px}.head.svelte-1fkriqt.svelte-1fkriqt{font-size:10px}button.svelte-1fkriqt.svelte-1fkriqt{font-size:11px}}");
}

function get_each_context$4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[15] = list[i];
	return child_ctx;
}

// (20:18) {#if day.partial}
function create_if_block_2$4(ctx) {
	let small;

	return {
		c() {
			small = element("small");
			small.textContent = "Partial";
			attr(small, "class", "partial svelte-1fkriqt");
		},
		m(target, anchor) {
			insert(target, small, anchor);
		},
		d(detaching) {
			if (detaching) {
				detach(small);
			}
		}
	};
}

// (20:153) {#if finite(day.low)&&finite(day.high)}
function create_if_block_1$4(ctx) {
	let em;
	let em_style_value;

	return {
		c() {
			em = element("em");
			attr(em, "style", em_style_value = `left:${(/*day*/ ctx[15].low - /*low*/ ctx[3]) / /*extent*/ ctx[6] * 100}%;width:${Math.max(2, (/*day*/ ctx[15].high - /*day*/ ctx[15].low) / /*extent*/ ctx[6] * 100)}%`);
			attr(em, "class", "svelte-1fkriqt");
		},
		m(target, anchor) {
			insert(target, em, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*days, low, extent*/ 88 && em_style_value !== (em_style_value = `left:${(/*day*/ ctx[15].low - /*low*/ ctx[3]) / /*extent*/ ctx[6] * 100}%;width:${Math.max(2, (/*day*/ ctx[15].high - /*day*/ ctx[15].low) / /*extent*/ ctx[6] * 100)}%`)) {
				attr(em, "style", em_style_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(em);
			}
		}
	};
}

// (20:453) {#if day.predictability!==null}
function create_if_block$5(ctx) {
	let i;
	let em;
	let em_style_value;

	return {
		c() {
			i = element("i");
			em = element("em");
			attr(em, "style", em_style_value = `width:${/*day*/ ctx[15].predictability}%`);
			attr(em, "class", "svelte-1fkriqt");
			attr(i, "aria-hidden", "true");
			attr(i, "class", "svelte-1fkriqt");
		},
		m(target, anchor) {
			insert(target, i, anchor);
			append(i, em);
		},
		p(ctx, dirty) {
			if (dirty & /*days*/ 16 && em_style_value !== (em_style_value = `width:${/*day*/ ctx[15].predictability}%`)) {
				attr(em, "style", em_style_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(i);
			}
		}
	};
}

// (19:1) {#each days as day}
function create_each_block$4(ctx) {
	let button;
	let span0;
	let t0_value = /*day*/ ctx[15].label + "";
	let t0;
	let span3;
	let span1;
	let t1_value = /*temp*/ ctx[7](/*day*/ ctx[15].low) + "";
	let t1;
	let span2;
	let show_if = finite(/*day*/ ctx[15].low) && finite(/*day*/ ctx[15].high);
	let b;
	let t2_value = /*temp*/ ctx[7](/*day*/ ctx[15].high) + "";
	let t2;
	let span4;
	let t3_value = format(/*day*/ ctx[15].rain, 'mm', /*prefs*/ ctx[0]) + "";
	let t3;
	let span5;

	let t4_value = (/*day*/ ctx[15].predictability === null
	? '—'
	: Math.round(/*day*/ ctx[15].predictability) + '%') + "";

	let t4;
	let t5;
	let button_disabled_value;
	let button_aria_label_value;
	let mounted;
	let dispose;
	let if_block0 = /*day*/ ctx[15].partial && create_if_block_2$4();
	let if_block1 = show_if && create_if_block_1$4(ctx);
	let if_block2 = /*day*/ ctx[15].predictability !== null && create_if_block$5(ctx);

	function click_handler() {
		return /*click_handler*/ ctx[13](/*day*/ ctx[15]);
	}

	return {
		c() {
			button = element("button");
			span0 = element("span");
			t0 = text(t0_value);
			if (if_block0) if_block0.c();
			span3 = element("span");
			span1 = element("span");
			t1 = text(t1_value);
			span2 = element("span");
			if (if_block1) if_block1.c();
			b = element("b");
			t2 = text(t2_value);
			span4 = element("span");
			t3 = text(t3_value);
			span5 = element("span");
			t4 = text(t4_value);
			if (if_block2) if_block2.c();
			t5 = space();
			attr(span0, "class", "svelte-1fkriqt");
			attr(span1, "class", "svelte-1fkriqt");
			attr(span2, "class", "track svelte-1fkriqt");
			attr(b, "class", "svelte-1fkriqt");
			attr(span3, "class", "range svelte-1fkriqt");
			attr(span4, "class", "svelte-1fkriqt");
			attr(span5, "class", "svelte-1fkriqt");
			button.disabled = button_disabled_value = !/*day*/ ctx[15].available;

			attr(button, "aria-label", button_aria_label_value = `${/*day*/ ctx[15].label}, low ${format(/*day*/ ctx[15].low, 'K', /*prefs*/ ctx[0])}, high ${format(/*day*/ ctx[15].high, 'K', /*prefs*/ ctx[0])}, precipitation ${format(/*day*/ ctx[15].rain, 'mm', /*prefs*/ ctx[0])}, predictability ${/*day*/ ctx[15].predictability === null
			? 'not supplied'
			: Math.round(/*day*/ ctx[15].predictability) + ' percent'}`);

			attr(button, "class", "svelte-1fkriqt");
			toggle_class(button, "chosen", /*valid*/ ctx[1] >= /*day*/ ctx[15].start && /*valid*/ ctx[1] < /*day*/ ctx[15].end);
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, span0);
			append(span0, t0);
			if (if_block0) if_block0.m(span0, null);
			append(button, span3);
			append(span3, span1);
			append(span1, t1);
			append(span3, span2);
			if (if_block1) if_block1.m(span2, null);
			append(span3, b);
			append(b, t2);
			append(button, span4);
			append(span4, t3);
			append(button, span5);
			append(span5, t4);
			if (if_block2) if_block2.m(span5, null);
			append(button, t5);

			if (!mounted) {
				dispose = listen(button, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*days*/ 16 && t0_value !== (t0_value = /*day*/ ctx[15].label + "")) set_data(t0, t0_value);

			if (/*day*/ ctx[15].partial) {
				if (if_block0) ; else {
					if_block0 = create_if_block_2$4();
					if_block0.c();
					if_block0.m(span0, null);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty & /*days*/ 16 && t1_value !== (t1_value = /*temp*/ ctx[7](/*day*/ ctx[15].low) + "")) set_data(t1, t1_value);
			if (dirty & /*days*/ 16) show_if = finite(/*day*/ ctx[15].low) && finite(/*day*/ ctx[15].high);

			if (show_if) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_1$4(ctx);
					if_block1.c();
					if_block1.m(span2, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty & /*days*/ 16 && t2_value !== (t2_value = /*temp*/ ctx[7](/*day*/ ctx[15].high) + "")) set_data(t2, t2_value);
			if (dirty & /*days, prefs*/ 17 && t3_value !== (t3_value = format(/*day*/ ctx[15].rain, 'mm', /*prefs*/ ctx[0]) + "")) set_data(t3, t3_value);

			if (dirty & /*days*/ 16 && t4_value !== (t4_value = (/*day*/ ctx[15].predictability === null
			? '—'
			: Math.round(/*day*/ ctx[15].predictability) + '%') + "")) set_data(t4, t4_value);

			if (/*day*/ ctx[15].predictability !== null) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block$5(ctx);
					if_block2.c();
					if_block2.m(span5, null);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (dirty & /*days*/ 16 && button_disabled_value !== (button_disabled_value = !/*day*/ ctx[15].available)) {
				button.disabled = button_disabled_value;
			}

			if (dirty & /*days, prefs*/ 17 && button_aria_label_value !== (button_aria_label_value = `${/*day*/ ctx[15].label}, low ${format(/*day*/ ctx[15].low, 'K', /*prefs*/ ctx[0])}, high ${format(/*day*/ ctx[15].high, 'K', /*prefs*/ ctx[0])}, precipitation ${format(/*day*/ ctx[15].rain, 'mm', /*prefs*/ ctx[0])}, predictability ${/*day*/ ctx[15].predictability === null
			? 'not supplied'
			: Math.round(/*day*/ ctx[15].predictability) + ' percent'}`)) {
				attr(button, "aria-label", button_aria_label_value);
			}

			if (dirty & /*valid, days*/ 18) {
				toggle_class(button, "chosen", /*valid*/ ctx[1] >= /*day*/ ctx[15].start && /*valid*/ ctx[1] < /*day*/ ctx[15].end);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(button);
			}

			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			mounted = false;
			dispose();
		}
	};
}

function create_fragment$7(ctx) {
	let section;
	let div0;
	let h2;
	let small;
	let t1;
	let t2;
	let div2;
	let div1;
	let span0;
	let span1;
	let t4;
	let t5_value = /*prefs*/ ctx[0].temp + "";
	let t5;
	let span2;
	let span3;
	let t8;
	let t9;
	let details;
	let each_value = ensure_array_like(/*days*/ ctx[4]);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
	}

	return {
		c() {
			section = element("section");
			div0 = element("div");
			h2 = element("h2");
			h2.textContent = "The week ahead";
			small = element("small");
			t1 = text(/*zone*/ ctx[5]);
			t2 = space();
			div2 = element("div");
			div1 = element("div");
			span0 = element("span");
			span0.textContent = "Day";
			span1 = element("span");
			t4 = text("Low / high · °");
			t5 = text(t5_value);
			span2 = element("span");
			span2.textContent = "Rain";
			span3 = element("span");
			span3.textContent = "Predictability";
			t8 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t9 = space();
			details = element("details");
			details.innerHTML = `<summary class="svelte-1fkriqt">Forecast notes</summary><p class="svelte-1fkriqt">Daily values use the forecast point’s calendar when available. Provider daily minimum, maximum and predictability are preferred; otherwise temperature ranges use returned samples. Partial means precipitation does not cover the whole day. Trace amounts display as &lt;1, never zero. Predictability is a provider index, not rain probability.</p>`;
			attr(h2, "class", "svelte-1fkriqt");
			attr(small, "class", "svelte-1fkriqt");
			attr(div0, "class", "heading svelte-1fkriqt");
			attr(span0, "class", "svelte-1fkriqt");
			attr(span1, "class", "svelte-1fkriqt");
			attr(span2, "class", "svelte-1fkriqt");
			attr(span3, "class", "svelte-1fkriqt");
			attr(div1, "class", "head svelte-1fkriqt");
			attr(div2, "class", "week svelte-1fkriqt");
			attr(details, "class", "svelte-1fkriqt");
			attr(section, "aria-label", "Seven-day forecast");
		},
		m(target, anchor) {
			insert(target, section, anchor);
			append(section, div0);
			append(div0, h2);
			append(div0, small);
			append(small, t1);
			append(section, t2);
			append(section, div2);
			append(div2, div1);
			append(div1, span0);
			append(div1, span1);
			append(span1, t4);
			append(span1, t5);
			append(div1, span2);
			append(div1, span3);
			append(div2, t8);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div2, null);
				}
			}

			append(section, t9);
			append(section, details);
		},
		p(ctx, [dirty]) {
			if (dirty & /*zone*/ 32) set_data(t1, /*zone*/ ctx[5]);
			if (dirty & /*prefs*/ 1 && t5_value !== (t5_value = /*prefs*/ ctx[0].temp + "")) set_data(t5, t5_value);

			if (dirty & /*days, prefs, Math, valid, onTime, temp, low, extent*/ 223) {
				each_value = ensure_array_like(/*days*/ ctx[4]);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$4(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$4(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div2, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(section);
			}

			destroy_each(each_blocks, detaching);
		}
	};
}

function instance$7($$self, $$props, $$invalidate) {
	let days;
	let lows;
	let highs;
	let low;
	let high;
	let extent;
	let pointOffset;
	let zone;

	let { data, prefs, valid, onTime = () => {
		
	} } = $$props;

	const now = Date.now();

	const temp = v => finite(v)
	? Math.round(prefs.temp === 'F'
		? (v - 273.15) * 1.8 + 32
		: v - 273.15) + '°'
	: '—';

	const click_handler = day => onTime(day.time);

	$$self.$$set = $$props => {
		if ('data' in $$props) $$invalidate(8, data = $$props.data);
		if ('prefs' in $$props) $$invalidate(0, prefs = $$props.prefs);
		if ('valid' in $$props) $$invalidate(1, valid = $$props.valid);
		if ('onTime' in $$props) $$invalidate(2, onTime = $$props.onTime);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*data, prefs*/ 257) {
			$$invalidate(4, days = sevenDays(data, now, prefs.local));
		}

		if ($$self.$$.dirty & /*days*/ 16) {
			$$invalidate(12, lows = days.map(d => d.low).filter(finite));
		}

		if ($$self.$$.dirty & /*days*/ 16) {
			$$invalidate(11, highs = days.map(d => d.high).filter(finite));
		}

		if ($$self.$$.dirty & /*lows*/ 4096) {
			$$invalidate(3, low = lows.length ? Math.min(...lows) : 0);
		}

		if ($$self.$$.dirty & /*highs*/ 2048) {
			$$invalidate(10, high = highs.length ? Math.max(...highs) : 1);
		}

		if ($$self.$$.dirty & /*high, low*/ 1032) {
			$$invalidate(6, extent = Math.max(1, high - low));
		}

		if ($$self.$$.dirty & /*data*/ 256) {
			$$invalidate(9, pointOffset = dayOffset(data));
		}

		if ($$self.$$.dirty & /*pointOffset, prefs*/ 513) {
			$$invalidate(5, zone = pointOffset === null
			? prefs.local ? 'Device local days' : 'UTC days'
			: 'Forecast point · UTC' + (pointOffset >= 0 ? '+' : '') + pointOffset);
		}
	};

	return [
		prefs,
		valid,
		onTime,
		low,
		days,
		zone,
		extent,
		temp,
		data,
		pointOffset,
		high,
		highs,
		lows,
		click_handler
	];
}

class SevenDays extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$7, create_fragment$7, safe_not_equal, { data: 8, prefs: 0, valid: 1, onTime: 2 }, add_css$6);
	}
}

/* src\ForecastSlider.svelte generated by Svelte v4.2.20 */

function add_css$5(target) {
	append_styles(target, "svelte-1whtcy4", ".forecast-navigation.svelte-1whtcy4.svelte-1whtcy4{margin:14px 0;color:#b2c7d1;font:11px/1.5 system-ui}.caption.svelte-1whtcy4.svelte-1whtcy4,.endpoints.svelte-1whtcy4.svelte-1whtcy4{display:flex;justify-content:space-between;gap:12px}.control.svelte-1whtcy4.svelte-1whtcy4{display:flex;align-items:center;gap:10px;margin:4px 0}.control.svelte-1whtcy4 button.svelte-1whtcy4{width:36px;height:40px;flex:0 0 36px;border:1px solid #36505e;border-radius:9px;background:#152b37;color:#7be4ca;font:24px system-ui;cursor:pointer;padding:0}.control.svelte-1whtcy4 button.svelte-1whtcy4:disabled{opacity:.3;cursor:default}.forecast-navigation.svelte-1whtcy4 .control input[type=range].svelte-1whtcy4{appearance:none;-webkit-appearance:none;display:block;flex:1;width:0;min-width:0;height:40px;min-height:40px;margin:0;padding:0;border:0;border-radius:0;background:transparent;box-shadow:none;cursor:pointer;touch-action:pan-y;accent-color:#7be4ca}.forecast-navigation.svelte-1whtcy4 input[type=range].svelte-1whtcy4::-webkit-slider-runnable-track{height:5px;border:0;border-radius:9px;background:linear-gradient(to right,#7be4ca var(--progress),#36505e var(--progress))}.forecast-navigation.svelte-1whtcy4 input[type=range].svelte-1whtcy4::-webkit-slider-thumb{appearance:none;-webkit-appearance:none;width:18px;height:18px;border-radius:50%;border:3px solid #0d1b27;background:#7be4ca;box-shadow:0 0 0 1px #7be4ca;margin-top:-6.5px}.forecast-navigation.svelte-1whtcy4 input[type=range].svelte-1whtcy4::-moz-range-track{height:5px;border:0;border-radius:9px;background:#36505e}.forecast-navigation.svelte-1whtcy4 input[type=range].svelte-1whtcy4::-moz-range-progress{height:5px;background:#7be4ca}.forecast-navigation.svelte-1whtcy4 input[type=range].svelte-1whtcy4::-moz-range-thumb{width:14px;height:14px;border:3px solid #0d1b27;border-radius:50%;background:#7be4ca}.control.svelte-1whtcy4 button.svelte-1whtcy4:focus-visible,.forecast-navigation.svelte-1whtcy4 input[type=range].svelte-1whtcy4:focus-visible{outline:2px solid #7be4ca;outline-offset:3px}.endpoints.svelte-1whtcy4.svelte-1whtcy4{font-size:10px;margin:0 46px}");
}

function create_fragment$6(ctx) {
	let div3;
	let div0;
	let t2;
	let div1;
	let button0;
	let t3;
	let button0_disabled_value;
	let input;
	let input_aria_valuetext_value;
	let input_max_value;
	let input_disabled_value;
	let input_style_value;
	let button1;
	let t4;
	let button1_disabled_value;
	let t5;
	let div2;
	let span2;
	let t6_value = timeLabel(/*ts*/ ctx[0][0], /*local*/ ctx[1]) + "";
	let t6;
	let span3;
	let t7_value = timeLabel(/*ts*/ ctx[0][/*ts*/ ctx[0].length - 1], /*local*/ ctx[1]) + "";
	let t7;
	let mounted;
	let dispose;

	return {
		c() {
			div3 = element("div");
			div0 = element("div");
			div0.innerHTML = `<span>Explore forecast</span><span>Drag or use arrow keys</span>`;
			t2 = space();
			div1 = element("div");
			button0 = element("button");
			t3 = text("‹");
			input = element("input");
			button1 = element("button");
			t4 = text("›");
			t5 = space();
			div2 = element("div");
			span2 = element("span");
			t6 = text(t6_value);
			span3 = element("span");
			t7 = text(t7_value);
			attr(div0, "class", "caption svelte-1whtcy4");
			attr(button0, "aria-label", "Previous forecast time");
			attr(button0, "title", "Previous forecast time");
			button0.disabled = button0_disabled_value = /*index*/ ctx[2] === 0;
			attr(button0, "class", "svelte-1whtcy4");
			attr(input, "aria-label", "Forecast time");
			attr(input, "aria-valuetext", input_aria_valuetext_value = `${timeLabel(/*ts*/ ctx[0][/*index*/ ctx[2]], /*local*/ ctx[1])} ${/*local*/ ctx[1] ? 'device local' : 'UTC'}`);
			attr(input, "type", "range");
			attr(input, "min", "0");
			attr(input, "max", input_max_value = Math.max(0, /*ts*/ ctx[0].length - 1));
			attr(input, "step", "1");
			input.value = /*index*/ ctx[2];
			input.disabled = input_disabled_value = /*ts*/ ctx[0].length < 2;
			attr(input, "style", input_style_value = `--progress:${/*progress*/ ctx[3]}%`);
			attr(input, "class", "svelte-1whtcy4");
			attr(button1, "aria-label", "Next forecast time");
			attr(button1, "title", "Next forecast time");
			button1.disabled = button1_disabled_value = /*index*/ ctx[2] >= /*ts*/ ctx[0].length - 1;
			attr(button1, "class", "svelte-1whtcy4");
			attr(div1, "class", "control svelte-1whtcy4");
			attr(div2, "class", "endpoints svelte-1whtcy4");
			attr(div3, "class", "forecast-navigation svelte-1whtcy4");
			attr(div3, "role", "group");
			attr(div3, "aria-label", "Forecast navigation");
		},
		m(target, anchor) {
			insert(target, div3, anchor);
			append(div3, div0);
			append(div3, t2);
			append(div3, div1);
			append(div1, button0);
			append(button0, t3);
			append(div1, input);
			append(div1, button1);
			append(button1, t4);
			append(div3, t5);
			append(div3, div2);
			append(div2, span2);
			append(span2, t6);
			append(div2, span3);
			append(span3, t7);

			if (!mounted) {
				dispose = [
					listen(button0, "click", /*click_handler*/ ctx[7]),
					listen(input, "input", /*input_handler*/ ctx[8]),
					listen(button1, "click", /*click_handler_1*/ ctx[9])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (dirty & /*index*/ 4 && button0_disabled_value !== (button0_disabled_value = /*index*/ ctx[2] === 0)) {
				button0.disabled = button0_disabled_value;
			}

			if (dirty & /*ts, index, local*/ 7 && input_aria_valuetext_value !== (input_aria_valuetext_value = `${timeLabel(/*ts*/ ctx[0][/*index*/ ctx[2]], /*local*/ ctx[1])} ${/*local*/ ctx[1] ? 'device local' : 'UTC'}`)) {
				attr(input, "aria-valuetext", input_aria_valuetext_value);
			}

			if (dirty & /*ts*/ 1 && input_max_value !== (input_max_value = Math.max(0, /*ts*/ ctx[0].length - 1))) {
				attr(input, "max", input_max_value);
			}

			if (dirty & /*index*/ 4) {
				input.value = /*index*/ ctx[2];
			}

			if (dirty & /*ts*/ 1 && input_disabled_value !== (input_disabled_value = /*ts*/ ctx[0].length < 2)) {
				input.disabled = input_disabled_value;
			}

			if (dirty & /*progress*/ 8 && input_style_value !== (input_style_value = `--progress:${/*progress*/ ctx[3]}%`)) {
				attr(input, "style", input_style_value);
			}

			if (dirty & /*index, ts*/ 5 && button1_disabled_value !== (button1_disabled_value = /*index*/ ctx[2] >= /*ts*/ ctx[0].length - 1)) {
				button1.disabled = button1_disabled_value;
			}

			if (dirty & /*ts, local*/ 3 && t6_value !== (t6_value = timeLabel(/*ts*/ ctx[0][0], /*local*/ ctx[1]) + "")) set_data(t6, t6_value);
			if (dirty & /*ts, local*/ 3 && t7_value !== (t7_value = timeLabel(/*ts*/ ctx[0][/*ts*/ ctx[0].length - 1], /*local*/ ctx[1]) + "")) set_data(t7, t7_value);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(div3);
			}

			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$6($$self, $$props, $$invalidate) {
	let index;
	let progress;

	let { ts = [], valid, local = false, onTime = () => {
		
	} } = $$props;

	function move(i) {
		const t = ts[Math.max(0, Math.min(ts.length - 1, i))];
		if (Number.isFinite(t)) onTime(t);
	}

	const click_handler = () => move(index - 1);
	const input_handler = e => move(Number(e.currentTarget.value));
	const click_handler_1 = () => move(index + 1);

	$$self.$$set = $$props => {
		if ('ts' in $$props) $$invalidate(0, ts = $$props.ts);
		if ('valid' in $$props) $$invalidate(5, valid = $$props.valid);
		if ('local' in $$props) $$invalidate(1, local = $$props.local);
		if ('onTime' in $$props) $$invalidate(6, onTime = $$props.onTime);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*ts, valid*/ 33) {
			$$invalidate(2, index = Math.max(0, nearestIndex$1(ts, valid, Infinity)));
		}

		if ($$self.$$.dirty & /*ts, index*/ 5) {
			$$invalidate(3, progress = ts.length > 1 ? index / (ts.length - 1) * 100 : 0);
		}
	};

	return [
		ts,
		local,
		index,
		progress,
		move,
		valid,
		onTime,
		click_handler,
		input_handler,
		click_handler_1
	];
}

class ForecastSlider extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$6, create_fragment$6, safe_not_equal, { ts: 0, valid: 5, local: 1, onTime: 6 }, add_css$5);
	}
}

/* src\Meteorology.svelte generated by Svelte v4.2.20 */

function add_css$4(target) {
	append_styles(target, "svelte-1fusa7f", ".meteorology.svelte-1fusa7f.svelte-1fusa7f{background:var(--panel,#152b37);border-radius:12px;padding:16px;margin-top:18px;color:var(--ink,#edf7fa)}summary.svelte-1fusa7f.svelte-1fusa7f{cursor:pointer;font-size:16px;font-weight:500}summary.svelte-1fusa7f>small.svelte-1fusa7f{display:block;margin:5px 0 0 16px;font-weight:400}small.svelte-1fusa7f.svelte-1fusa7f,p.svelte-1fusa7f.svelte-1fusa7f{font-size:11px;line-height:1.65;color:var(--muted,#b2c7d1)}p.svelte-1fusa7f.svelte-1fusa7f{margin:10px 0}small.svelte-1fusa7f.svelte-1fusa7f{display:block}.metrics.svelte-1fusa7f.svelte-1fusa7f,.diagnostics.svelte-1fusa7f.svelte-1fusa7f{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin:16px 0}.diagnostics.svelte-1fusa7f.svelte-1fusa7f{grid-template-columns:repeat(2,minmax(0,1fr))}b.svelte-1fusa7f.svelte-1fusa7f{display:block;font-size:16px;font-weight:500;margin-top:5px}h3.svelte-1fusa7f.svelte-1fusa7f{font-size:15px;font-weight:500;color:inherit;margin:20px 0 10px}.profile.svelte-1fusa7f svg.svelte-1fusa7f{width:100%;height:auto;display:block}.profile.svelte-1fusa7f line.svelte-1fusa7f{stroke:#314b59;stroke-width:1}.profile.svelte-1fusa7f text.svelte-1fusa7f{fill:#b2c7d1;font-size:11px}.profile.svelte-1fusa7f path.svelte-1fusa7f{fill:none;stroke-width:2.5}.temperature.svelte-1fusa7f.svelte-1fusa7f{stroke:#efbb87}.dew.svelte-1fusa7f.svelte-1fusa7f{stroke:#82d9c1;stroke-dasharray:5 3}.profile.svelte-1fusa7f p span.svelte-1fusa7f:first-child{color:#efbb87}.profile.svelte-1fusa7f p span.svelte-1fusa7f:nth-child(2){color:#82d9c1}.table-wrap.svelte-1fusa7f.svelte-1fusa7f{overflow:auto}table.svelte-1fusa7f.svelte-1fusa7f{width:100%;border-collapse:collapse;font-size:11px;white-space:nowrap}th.svelte-1fusa7f.svelte-1fusa7f,td.svelte-1fusa7f.svelte-1fusa7f{padding:9px 5px;text-align:right;border-bottom:1px solid var(--line,#36505e)}th.svelte-1fusa7f.svelte-1fusa7f{font-weight:400;color:var(--muted,#b2c7d1)}th.svelte-1fusa7f.svelte-1fusa7f:first-child{text-align:left}.methods.svelte-1fusa7f summary.svelte-1fusa7f{font-size:12px}.methods.svelte-1fusa7f b.svelte-1fusa7f{display:inline;font-size:11px}.comparison-heading.svelte-1fusa7f.svelte-1fusa7f{display:flex;align-items:center;justify-content:space-between;gap:8px}.comparison-heading.svelte-1fusa7f h3.svelte-1fusa7f{margin:16px 0}button.svelte-1fusa7f.svelte-1fusa7f{font:12px system-ui;background:#213e49;color:inherit;border:1px solid var(--line,#36505e);padding:9px;border-radius:8px;min-height:40px;cursor:pointer}button.svelte-1fusa7f.svelte-1fusa7f:disabled{opacity:.6}button.svelte-1fusa7f.svelte-1fusa7f:focus-visible{outline:2px solid var(--mint,#7be4ca);outline-offset:2px}.error.svelte-1fusa7f.svelte-1fusa7f{color:#efb3a4}@media(max-width:400px){.metrics.svelte-1fusa7f.svelte-1fusa7f{grid-template-columns:repeat(2,minmax(0,1fr))}.meteorology.svelte-1fusa7f.svelte-1fusa7f{padding:13px}b.svelte-1fusa7f.svelte-1fusa7f{font-size:14px}}");
}

function get_each_context$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[19] = list[i];
	return child_ctx;
}

function get_each_context_1$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[22] = list[i];
	return child_ctx;
}

function get_each_context_2$3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[25] = list[i];
	return child_ctx;
}

function get_each_context_3$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[28] = list[i][0];
	child_ctx[29] = list[i][1];

	const constants_0 = /*calculated*/ child_ctx[12].find(function func(...args) {
		return /*func*/ ctx[18](/*key*/ child_ctx[28], ...args);
	});

	child_ctx[25] = constants_0;
	return child_ctx;
}

function get_each_context_4$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[32] = list[i];
	return child_ctx;
}

function get_each_context_5$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[35] = list[i];
	return child_ctx;
}

function get_each_context_6$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[32] = list[i];
	return child_ctx;
}

// (25:213) {:else}
function create_else_block$3(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "No temperature profile supplied at this time.";
			attr(p, "class", "svelte-1fusa7f");
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(p);
			}
		}
	};
}

// (22:1) {#if temperatures.length}
function create_if_block$4(ctx) {
	let div;
	let svg;
	let each0_anchor;
	let path0;
	let path0_d_value;
	let path1;
	let path1_d_value;
	let p;
	let each_value_6 = ensure_array_like(/*rows*/ ctx[6]);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_6.length; i += 1) {
		each_blocks_1[i] = create_each_block_6$1(get_each_context_6$1(ctx, each_value_6, i));
	}

	let each_value_5 = ensure_array_like([/*min*/ ctx[11], (/*min*/ ctx[11] + /*max*/ ctx[10]) / 2, /*max*/ ctx[10]]);
	let each_blocks = [];

	for (let i = 0; i < 3; i += 1) {
		each_blocks[i] = create_each_block_5$1(get_each_context_5$1(ctx, each_value_5, i));
	}

	return {
		c() {
			div = element("div");
			svg = svg_element("svg");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			each0_anchor = empty();

			for (let i = 0; i < 3; i += 1) {
				each_blocks[i].c();
			}

			path0 = svg_element("path");
			path1 = svg_element("path");
			p = element("p");
			p.innerHTML = `<span class="svelte-1fusa7f">Temperature</span> · <span class="svelte-1fusa7f">Dew point (dashed)</span> · °C vs hPa`;
			attr(path0, "class", "temperature svelte-1fusa7f");
			attr(path0, "d", path0_d_value = /*path*/ ctx[16]('t', /*rows*/ ctx[6], /*min*/ ctx[11], /*max*/ ctx[10], /*top*/ ctx[9], /*bottom*/ ctx[8]));
			attr(path1, "class", "dew svelte-1fusa7f");
			attr(path1, "d", path1_d_value = /*path*/ ctx[16]('td', /*rows*/ ctx[6], /*min*/ ctx[11], /*max*/ ctx[10], /*top*/ ctx[9], /*bottom*/ ctx[8]));
			attr(svg, "viewBox", "0 0 440 220");
			attr(svg, "role", "img");
			attr(svg, "aria-label", "Temperature and dew point versus pressure, not a Skew-T");
			attr(svg, "class", "svelte-1fusa7f");
			attr(p, "class", "svelte-1fusa7f");
			attr(div, "class", "profile svelte-1fusa7f");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, svg);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(svg, null);
				}
			}

			append(svg, each0_anchor);

			for (let i = 0; i < 3; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(svg, null);
				}
			}

			append(svg, path0);
			append(svg, path1);
			append(div, p);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*rows, top, bottom*/ 832) {
				each_value_6 = ensure_array_like(/*rows*/ ctx[6]);
				let i;

				for (i = 0; i < each_value_6.length; i += 1) {
					const child_ctx = get_each_context_6$1(ctx, each_value_6, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_6$1(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(svg, each0_anchor);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_6.length;
			}

			if (dirty[0] & /*min, max*/ 3072) {
				each_value_5 = ensure_array_like([
					/*min*/ ctx[11],
					(/*min*/ ctx[11] + /*max*/ ctx[10]) / 2,
					/*max*/ ctx[10]
				]);

				let i;

				for (i = 0; i < 3; i += 1) {
					const child_ctx = get_each_context_5$1(ctx, each_value_5, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_5$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(svg, path0);
					}
				}

				for (; i < 3; i += 1) {
					each_blocks[i].d(1);
				}
			}

			if (dirty[0] & /*rows, min, max, top, bottom*/ 3904 && path0_d_value !== (path0_d_value = /*path*/ ctx[16]('t', /*rows*/ ctx[6], /*min*/ ctx[11], /*max*/ ctx[10], /*top*/ ctx[9], /*bottom*/ ctx[8]))) {
				attr(path0, "d", path0_d_value);
			}

			if (dirty[0] & /*rows, min, max, top, bottom*/ 3904 && path1_d_value !== (path1_d_value = /*path*/ ctx[16]('td', /*rows*/ ctx[6], /*min*/ ctx[11], /*max*/ ctx[10], /*top*/ ctx[9], /*bottom*/ ctx[8]))) {
				attr(path1, "d", path1_d_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}

			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
		}
	};
}

// (23:1) {#each rows as row}
function create_each_block_6$1(ctx) {
	let line;
	let line_y__value;
	let line_y__value_1;
	let text_1;
	let t_1_value = /*row*/ ctx[32].p + "";
	let t_1;
	let text_1_y_value;

	return {
		c() {
			line = svg_element("line");
			text_1 = svg_element("text");
			t_1 = text(t_1_value);
			attr(line, "x1", "48");
			attr(line, "x2", "408");
			attr(line, "y1", line_y__value = 20 + Math.log(/*row*/ ctx[32].p / /*top*/ ctx[9]) / Math.max(.01, Math.log(/*bottom*/ ctx[8] / /*top*/ ctx[9])) * 170);
			attr(line, "y2", line_y__value_1 = 20 + Math.log(/*row*/ ctx[32].p / /*top*/ ctx[9]) / Math.max(.01, Math.log(/*bottom*/ ctx[8] / /*top*/ ctx[9])) * 170);
			attr(line, "class", "svelte-1fusa7f");
			attr(text_1, "x", "40");
			attr(text_1, "y", text_1_y_value = 24 + Math.log(/*row*/ ctx[32].p / /*top*/ ctx[9]) / Math.max(.01, Math.log(/*bottom*/ ctx[8] / /*top*/ ctx[9])) * 170);
			attr(text_1, "text-anchor", "end");
			attr(text_1, "class", "svelte-1fusa7f");
		},
		m(target, anchor) {
			insert(target, line, anchor);
			insert(target, text_1, anchor);
			append(text_1, t_1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*rows, top, bottom*/ 832 && line_y__value !== (line_y__value = 20 + Math.log(/*row*/ ctx[32].p / /*top*/ ctx[9]) / Math.max(.01, Math.log(/*bottom*/ ctx[8] / /*top*/ ctx[9])) * 170)) {
				attr(line, "y1", line_y__value);
			}

			if (dirty[0] & /*rows, top, bottom*/ 832 && line_y__value_1 !== (line_y__value_1 = 20 + Math.log(/*row*/ ctx[32].p / /*top*/ ctx[9]) / Math.max(.01, Math.log(/*bottom*/ ctx[8] / /*top*/ ctx[9])) * 170)) {
				attr(line, "y2", line_y__value_1);
			}

			if (dirty[0] & /*rows*/ 64 && t_1_value !== (t_1_value = /*row*/ ctx[32].p + "")) set_data(t_1, t_1_value);

			if (dirty[0] & /*rows, top, bottom*/ 832 && text_1_y_value !== (text_1_y_value = 24 + Math.log(/*row*/ ctx[32].p / /*top*/ ctx[9]) / Math.max(.01, Math.log(/*bottom*/ ctx[8] / /*top*/ ctx[9])) * 170)) {
				attr(text_1, "y", text_1_y_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(line);
				detach(text_1);
			}
		}
	};
}

// (24:1) {#each [min,(min+max)/2,max] as t}
function create_each_block_5$1(ctx) {
	let text_1;
	let t_1_value = /*t*/ ctx[35] + "";
	let t_1;
	let text_1_x_value;

	return {
		c() {
			text_1 = svg_element("text");
			t_1 = text(t_1_value);
			attr(text_1, "x", text_1_x_value = 48 + (/*t*/ ctx[35] - /*min*/ ctx[11]) / (/*max*/ ctx[10] - /*min*/ ctx[11]) * 360);
			attr(text_1, "y", "212");
			attr(text_1, "text-anchor", "middle");
			attr(text_1, "class", "svelte-1fusa7f");
		},
		m(target, anchor) {
			insert(target, text_1, anchor);
			append(text_1, t_1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*min, max*/ 3072 && t_1_value !== (t_1_value = /*t*/ ctx[35] + "")) set_data(t_1, t_1_value);

			if (dirty[0] & /*min, max*/ 3072 && text_1_x_value !== (text_1_x_value = 48 + (/*t*/ ctx[35] - /*min*/ ctx[11]) / (/*max*/ ctx[10] - /*min*/ ctx[11]) * 360)) {
				attr(text_1, "x", text_1_x_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(text_1);
			}
		}
	};
}

// (26:118) {#each rows as row}
function create_each_block_4$1(ctx) {
	let tr;
	let th;
	let t0_value = /*row*/ ctx[32].p + "";
	let t0;
	let td0;
	let t1_value = format(/*row*/ ctx[32].t, 'K', /*prefs*/ ctx[2]) + "";
	let t1;
	let t2;
	let t3_value = format(/*row*/ ctx[32].td, 'K', /*prefs*/ ctx[2]) + "";
	let t3;
	let td1;
	let t4_value = format(/*row*/ ctx[32].dir, '°', /*prefs*/ ctx[2]) + "";
	let t4;
	let t5;
	let t6_value = format(/*row*/ ctx[32].wind, 'm/s', /*prefs*/ ctx[2]) + "";
	let t6;
	let td2;
	let t7_value = format(/*row*/ ctx[32].z, 'm', /*prefs*/ ctx[2]) + "";
	let t7;

	return {
		c() {
			tr = element("tr");
			th = element("th");
			t0 = text(t0_value);
			td0 = element("td");
			t1 = text(t1_value);
			t2 = text(" / ");
			t3 = text(t3_value);
			td1 = element("td");
			t4 = text(t4_value);
			t5 = text(" / ");
			t6 = text(t6_value);
			td2 = element("td");
			t7 = text(t7_value);
			attr(th, "class", "svelte-1fusa7f");
			attr(td0, "class", "svelte-1fusa7f");
			attr(td1, "class", "svelte-1fusa7f");
			attr(td2, "class", "svelte-1fusa7f");
		},
		m(target, anchor) {
			insert(target, tr, anchor);
			append(tr, th);
			append(th, t0);
			append(tr, td0);
			append(td0, t1);
			append(td0, t2);
			append(td0, t3);
			append(tr, td1);
			append(td1, t4);
			append(td1, t5);
			append(td1, t6);
			append(tr, td2);
			append(td2, t7);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*rows*/ 64 && t0_value !== (t0_value = /*row*/ ctx[32].p + "")) set_data(t0, t0_value);
			if (dirty[0] & /*rows, prefs*/ 68 && t1_value !== (t1_value = format(/*row*/ ctx[32].t, 'K', /*prefs*/ ctx[2]) + "")) set_data(t1, t1_value);
			if (dirty[0] & /*rows, prefs*/ 68 && t3_value !== (t3_value = format(/*row*/ ctx[32].td, 'K', /*prefs*/ ctx[2]) + "")) set_data(t3, t3_value);
			if (dirty[0] & /*rows, prefs*/ 68 && t4_value !== (t4_value = format(/*row*/ ctx[32].dir, '°', /*prefs*/ ctx[2]) + "")) set_data(t4, t4_value);
			if (dirty[0] & /*rows, prefs*/ 68 && t6_value !== (t6_value = format(/*row*/ ctx[32].wind, 'm/s', /*prefs*/ ctx[2]) + "")) set_data(t6, t6_value);
			if (dirty[0] & /*rows, prefs*/ 68 && t7_value !== (t7_value = format(/*row*/ ctx[32].z, 'm', /*prefs*/ ctx[2]) + "")) set_data(t7, t7_value);
		},
		d(detaching) {
			if (detaching) {
				detach(tr);
			}
		}
	};
}

// (28:57) {#each [['kIndex','K index'],['totalTotals','Total Totals'],['shear850500','850–500 hPa shear'],['freezingCrossing','Resolved freezing crossing']] as [key,label]}
function create_each_block_3$1(ctx) {
	let div;
	let small;
	let b;

	let t1_value = (/*f*/ ctx[25]
	? format(at(/*f*/ ctx[25], /*valid*/ ctx[1]), /*f*/ ctx[25].unit, /*prefs*/ ctx[2])
	: '—') + "";

	let t1;

	return {
		c() {
			div = element("div");
			small = element("small");
			small.textContent = `${/*label*/ ctx[29]}`;
			b = element("b");
			t1 = text(t1_value);
			attr(small, "class", "svelte-1fusa7f");
			attr(b, "class", "svelte-1fusa7f");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, small);
			append(div, b);
			append(b, t1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*calculated, valid, prefs*/ 4102 && t1_value !== (t1_value = (/*f*/ ctx[25]
			? format(at(/*f*/ ctx[25], /*valid*/ ctx[1]), /*f*/ ctx[25].unit, /*prefs*/ ctx[2])
			: '—') + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

// (29:349) {#each [...surface,...calculated] as f}
function create_each_block_2$3(ctx) {
	let p;
	let b;
	let t0_value = /*f*/ ctx[25].label + "";
	let t0;
	let t1;
	let t2;
	let t3_value = /*f*/ ctx[25].method + "";
	let t3;

	return {
		c() {
			p = element("p");
			b = element("b");
			t0 = text(t0_value);
			t1 = text(":");
			t2 = space();
			t3 = text(t3_value);
			attr(b, "class", "svelte-1fusa7f");
			attr(p, "class", "svelte-1fusa7f");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, b);
			append(b, t0);
			append(b, t1);
			append(p, t2);
			append(p, t3);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*surface, calculated*/ 12288 && t0_value !== (t0_value = /*f*/ ctx[25].label + "")) set_data(t0, t0_value);
			if (dirty[0] & /*surface, calculated*/ 12288 && t3_value !== (t3_value = /*f*/ ctx[25].method + "")) set_data(t3, t3_value);
		},
		d(detaching) {
			if (detaching) {
				detach(p);
			}
		}
	};
}

// (31:22) {#each result.entries as e}
function create_each_block_1$3(ctx) {
	let div;
	let small;
	let t0_value = (MODELS[/*e*/ ctx[22].model] || /*e*/ ctx[22].model) + "";
	let t0;
	let b;
	let t1_value = format(/*e*/ ctx[22].value, 'K', /*prefs*/ ctx[2]) + "";
	let t1;

	return {
		c() {
			div = element("div");
			small = element("small");
			t0 = text(t0_value);
			b = element("b");
			t1 = text(t1_value);
			attr(small, "class", "svelte-1fusa7f");
			attr(b, "class", "svelte-1fusa7f");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, small);
			append(small, t0);
			append(div, b);
			append(b, t1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*result*/ 16384 && t0_value !== (t0_value = (MODELS[/*e*/ ctx[22].model] || /*e*/ ctx[22].model) + "")) set_data(t0, t0_value);
			if (dirty[0] & /*result, prefs*/ 16388 && t1_value !== (t1_value = format(/*e*/ ctx[22].value, 'K', /*prefs*/ ctx[2]) + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

// (32:129) {#each comparisonErrors as error}
function create_each_block$3(ctx) {
	let p;
	let t_1_value = /*error*/ ctx[19] + "";
	let t_1;

	return {
		c() {
			p = element("p");
			t_1 = text(t_1_value);
			attr(p, "class", "error svelte-1fusa7f");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t_1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*comparisonErrors*/ 8 && t_1_value !== (t_1_value = /*error*/ ctx[19] + "")) set_data(t_1, t_1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(p);
			}
		}
	};
}

function create_fragment$5(ctx) {
	let details1;
	let summary0;
	let t2;
	let p0;
	let t3_value = (MODELS[/*data*/ ctx[0].model] || /*data*/ ctx[0].model) + "";
	let t3;
	let t4;
	let t5_value = timeLabel(/*valid*/ ctx[1], /*prefs*/ ctx[2].local) + "";
	let t5;
	let t6;
	let t7_value = (/*prefs*/ ctx[2].local ? 'device local' : 'UTC') + "";
	let t7;
	let t8;
	let t9;
	let div3;
	let div0;
	let small1;
	let b0;
	let t11_value = /*show*/ ctx[15](/*surface*/ ctx[13], 'rh', '%', /*prefs*/ ctx[2]) + "";
	let t11;
	let div1;
	let small2;
	let b1;
	let t13_value = /*show*/ ctx[15](/*surface*/ ctx[13], 'pressureTrend', 'Pa', /*prefs*/ ctx[2]) + "";
	let t13;
	let div2;
	let small3;
	let b2;
	let t15_value = format(value(/*data*/ ctx[0], 'dewPoint', /*valid*/ ctx[1]), 'K', /*prefs*/ ctx[2]) + "";
	let t15;
	let t16;
	let h30;
	let t18;
	let t19;
	let div4;
	let table;
	let thead;
	let tbody;
	let t24;
	let p1;
	let t26;
	let h31;
	let div5;
	let t28;
	let details0;
	let summary1;
	let p2;
	let t31;
	let div6;
	let h32;
	let button;
	let t33_value = (/*compareBusy*/ ctx[4] ? 'Loading…' : 'Compare models') + "";
	let t33;
	let t34;
	let div7;
	let t35;
	let p3;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (/*temperatures*/ ctx[7].length) return create_if_block$4;
		return create_else_block$3;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);
	let each_value_4 = ensure_array_like(/*rows*/ ctx[6]);
	let each_blocks_4 = [];

	for (let i = 0; i < each_value_4.length; i += 1) {
		each_blocks_4[i] = create_each_block_4$1(get_each_context_4$1(ctx, each_value_4, i));
	}

	let each_value_3 = ensure_array_like([
		['kIndex', 'K index'],
		['totalTotals', 'Total Totals'],
		['shear850500', '850–500 hPa shear'],
		['freezingCrossing', 'Resolved freezing crossing']
	]);

	let each_blocks_3 = [];

	for (let i = 0; i < 4; i += 1) {
		each_blocks_3[i] = create_each_block_3$1(get_each_context_3$1(ctx, each_value_3, i));
	}

	let each_value_2 = ensure_array_like([.../*surface*/ ctx[13], .../*calculated*/ ctx[12]]);
	let each_blocks_2 = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks_2[i] = create_each_block_2$3(get_each_context_2$3(ctx, each_value_2, i));
	}

	let each_value_1 = ensure_array_like(/*result*/ ctx[14].entries);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1$3(get_each_context_1$3(ctx, each_value_1, i));
	}

	let each_value = ensure_array_like(/*comparisonErrors*/ ctx[3]);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
	}

	return {
		c() {
			details1 = element("details");
			summary0 = element("summary");
			summary0.innerHTML = `Meteorology <small class="svelte-1fusa7f">Surface · profile · model comparison</small>`;
			t2 = space();
			p0 = element("p");
			t3 = text(t3_value);
			t4 = text(" · ");
			t5 = text(t5_value);
			t6 = space();
			t7 = text(t7_value);
			t8 = text(" · All values below use this valid time.");
			t9 = space();
			div3 = element("div");
			div0 = element("div");
			small1 = element("small");
			small1.textContent = "Relative humidity";
			b0 = element("b");
			t11 = text(t11_value);
			div1 = element("div");
			small2 = element("small");
			small2.textContent = "3h pressure change";
			b1 = element("b");
			t13 = text(t13_value);
			div2 = element("div");
			small3 = element("small");
			small3.textContent = "Dew point";
			b2 = element("b");
			t15 = text(t15_value);
			t16 = space();
			h30 = element("h3");
			h30.textContent = "Vertical structure";
			t18 = space();
			if_block.c();
			t19 = space();
			div4 = element("div");
			table = element("table");
			thead = element("thead");
			thead.innerHTML = `<tr><th class="svelte-1fusa7f">hPa</th><th class="svelte-1fusa7f">T / Td</th><th class="svelte-1fusa7f">Wind</th><th class="svelte-1fusa7f">Height</th></tr>`;
			tbody = element("tbody");

			for (let i = 0; i < each_blocks_4.length; i += 1) {
				each_blocks_4[i].c();
			}

			t24 = space();
			p1 = element("p");
			p1.textContent = "Known below-terrain levels are hidden. Terrain screening requires height metadata. Missing dew points remain blank.";
			t26 = space();
			h31 = element("h3");
			h31.textContent = "Calculated diagnostics";
			div5 = element("div");

			for (let i = 0; i < 4; i += 1) {
				each_blocks_3[i].c();
			}

			t28 = space();
			details0 = element("details");
			summary1 = element("summary");
			summary1.textContent = "Methods & availability";
			p2 = element("p");
			p2.textContent = "RH uses a Magnus approximation. Pressure change compares exact forecasts three hours apart. Profile diagnostics require all inputs above supplied model terrain. Pressure-level shear is not 0–6 km shear; freezing crossing is not snowline. CAPE, CIN and SRH are not calculated.";

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].c();
			}

			t31 = space();
			div6 = element("div");
			h32 = element("h3");
			h32.textContent = "Model disagreement";
			button = element("button");
			t33 = text(t33_value);
			t34 = space();
			div7 = element("div");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t35 = space();
			p3 = element("p");
			p3.textContent = "Temperature · same point and exact time. Model differences are not probabilities; Meteoblue may incorporate these models.";

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(summary0, "class", "svelte-1fusa7f");
			attr(p0, "class", "svelte-1fusa7f");
			attr(small1, "class", "svelte-1fusa7f");
			attr(b0, "class", "svelte-1fusa7f");
			attr(small2, "class", "svelte-1fusa7f");
			attr(b1, "class", "svelte-1fusa7f");
			attr(small3, "class", "svelte-1fusa7f");
			attr(b2, "class", "svelte-1fusa7f");
			attr(div3, "class", "metrics svelte-1fusa7f");
			attr(h30, "class", "svelte-1fusa7f");
			attr(table, "class", "svelte-1fusa7f");
			attr(div4, "class", "table-wrap svelte-1fusa7f");
			attr(p1, "class", "svelte-1fusa7f");
			attr(h31, "class", "svelte-1fusa7f");
			attr(div5, "class", "diagnostics svelte-1fusa7f");
			attr(summary1, "class", "svelte-1fusa7f");
			attr(p2, "class", "svelte-1fusa7f");
			attr(details0, "class", "methods svelte-1fusa7f");
			attr(h32, "class", "svelte-1fusa7f");
			button.disabled = /*compareBusy*/ ctx[4];
			attr(button, "class", "svelte-1fusa7f");
			attr(div6, "class", "comparison-heading svelte-1fusa7f");
			attr(div7, "class", "metrics svelte-1fusa7f");
			attr(p3, "class", "svelte-1fusa7f");
			attr(details1, "class", "meteorology svelte-1fusa7f");
		},
		m(target, anchor) {
			insert(target, details1, anchor);
			append(details1, summary0);
			append(details1, t2);
			append(details1, p0);
			append(p0, t3);
			append(p0, t4);
			append(p0, t5);
			append(p0, t6);
			append(p0, t7);
			append(p0, t8);
			append(details1, t9);
			append(details1, div3);
			append(div3, div0);
			append(div0, small1);
			append(div0, b0);
			append(b0, t11);
			append(div3, div1);
			append(div1, small2);
			append(div1, b1);
			append(b1, t13);
			append(div3, div2);
			append(div2, small3);
			append(div2, b2);
			append(b2, t15);
			append(details1, t16);
			append(details1, h30);
			append(details1, t18);
			if_block.m(details1, null);
			append(details1, t19);
			append(details1, div4);
			append(div4, table);
			append(table, thead);
			append(table, tbody);

			for (let i = 0; i < each_blocks_4.length; i += 1) {
				if (each_blocks_4[i]) {
					each_blocks_4[i].m(tbody, null);
				}
			}

			append(details1, t24);
			append(details1, p1);
			append(details1, t26);
			append(details1, h31);
			append(details1, div5);

			for (let i = 0; i < 4; i += 1) {
				if (each_blocks_3[i]) {
					each_blocks_3[i].m(div5, null);
				}
			}

			append(details1, t28);
			append(details1, details0);
			append(details0, summary1);
			append(details0, p2);

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				if (each_blocks_2[i]) {
					each_blocks_2[i].m(details0, null);
				}
			}

			append(details1, t31);
			append(details1, div6);
			append(div6, h32);
			append(div6, button);
			append(button, t33);
			append(details1, t34);
			append(details1, div7);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(div7, null);
				}
			}

			append(details1, t35);
			append(details1, p3);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(details1, null);
				}
			}

			if (!mounted) {
				dispose = listen(button, "click", function () {
					if (is_function(/*onCompare*/ ctx[5])) /*onCompare*/ ctx[5].apply(this, arguments);
				});

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*data*/ 1 && t3_value !== (t3_value = (MODELS[/*data*/ ctx[0].model] || /*data*/ ctx[0].model) + "")) set_data(t3, t3_value);
			if (dirty[0] & /*valid, prefs*/ 6 && t5_value !== (t5_value = timeLabel(/*valid*/ ctx[1], /*prefs*/ ctx[2].local) + "")) set_data(t5, t5_value);
			if (dirty[0] & /*prefs*/ 4 && t7_value !== (t7_value = (/*prefs*/ ctx[2].local ? 'device local' : 'UTC') + "")) set_data(t7, t7_value);
			if (dirty[0] & /*surface, prefs*/ 8196 && t11_value !== (t11_value = /*show*/ ctx[15](/*surface*/ ctx[13], 'rh', '%', /*prefs*/ ctx[2]) + "")) set_data(t11, t11_value);
			if (dirty[0] & /*surface, prefs*/ 8196 && t13_value !== (t13_value = /*show*/ ctx[15](/*surface*/ ctx[13], 'pressureTrend', 'Pa', /*prefs*/ ctx[2]) + "")) set_data(t13, t13_value);
			if (dirty[0] & /*data, valid, prefs*/ 7 && t15_value !== (t15_value = format(value(/*data*/ ctx[0], 'dewPoint', /*valid*/ ctx[1]), 'K', /*prefs*/ ctx[2]) + "")) set_data(t15, t15_value);

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(details1, t19);
				}
			}

			if (dirty[0] & /*rows, prefs*/ 68) {
				each_value_4 = ensure_array_like(/*rows*/ ctx[6]);
				let i;

				for (i = 0; i < each_value_4.length; i += 1) {
					const child_ctx = get_each_context_4$1(ctx, each_value_4, i);

					if (each_blocks_4[i]) {
						each_blocks_4[i].p(child_ctx, dirty);
					} else {
						each_blocks_4[i] = create_each_block_4$1(child_ctx);
						each_blocks_4[i].c();
						each_blocks_4[i].m(tbody, null);
					}
				}

				for (; i < each_blocks_4.length; i += 1) {
					each_blocks_4[i].d(1);
				}

				each_blocks_4.length = each_value_4.length;
			}

			if (dirty[0] & /*calculated, valid, prefs*/ 4102) {
				each_value_3 = ensure_array_like([
					['kIndex', 'K index'],
					['totalTotals', 'Total Totals'],
					['shear850500', '850–500 hPa shear'],
					['freezingCrossing', 'Resolved freezing crossing']
				]);

				let i;

				for (i = 0; i < 4; i += 1) {
					const child_ctx = get_each_context_3$1(ctx, each_value_3, i);

					if (each_blocks_3[i]) {
						each_blocks_3[i].p(child_ctx, dirty);
					} else {
						each_blocks_3[i] = create_each_block_3$1(child_ctx);
						each_blocks_3[i].c();
						each_blocks_3[i].m(div5, null);
					}
				}

				for (; i < 4; i += 1) {
					each_blocks_3[i].d(1);
				}
			}

			if (dirty[0] & /*surface, calculated*/ 12288) {
				each_value_2 = ensure_array_like([.../*surface*/ ctx[13], .../*calculated*/ ctx[12]]);
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2$3(ctx, each_value_2, i);

					if (each_blocks_2[i]) {
						each_blocks_2[i].p(child_ctx, dirty);
					} else {
						each_blocks_2[i] = create_each_block_2$3(child_ctx);
						each_blocks_2[i].c();
						each_blocks_2[i].m(details0, null);
					}
				}

				for (; i < each_blocks_2.length; i += 1) {
					each_blocks_2[i].d(1);
				}

				each_blocks_2.length = each_value_2.length;
			}

			if (dirty[0] & /*compareBusy*/ 16 && t33_value !== (t33_value = (/*compareBusy*/ ctx[4] ? 'Loading…' : 'Compare models') + "")) set_data(t33, t33_value);

			if (dirty[0] & /*compareBusy*/ 16) {
				button.disabled = /*compareBusy*/ ctx[4];
			}

			if (dirty[0] & /*result, prefs*/ 16388) {
				each_value_1 = ensure_array_like(/*result*/ ctx[14].entries);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$3(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_1$3(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(div7, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_1.length;
			}

			if (dirty[0] & /*comparisonErrors*/ 8) {
				each_value = ensure_array_like(/*comparisonErrors*/ ctx[3]);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$3(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$3(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(details1, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(details1);
			}

			if_block.d();
			destroy_each(each_blocks_4, detaching);
			destroy_each(each_blocks_3, detaching);
			destroy_each(each_blocks_2, detaching);
			destroy_each(each_blocks_1, detaching);
			destroy_each(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};
}

function instance$5($$self, $$props, $$invalidate) {
	let result;
	let surface;
	let calculated;
	let rows;
	let temperatures;
	let min;
	let max;
	let top;
	let bottom;

	let { data, valid, prefs, comparisons = [], comparisonErrors = [], compareBusy = false, onCompare = () => {
		
	} } = $$props;

	const show = (fields, key, unit, preferences) => format(fields.find(f => f.key === key)?.values[0], unit, preferences);

	function path(key, list, lo, hi, pTop, pBottom) {
		let d = '', drawing = false;

		for (const row of list) {
			const v = row[key];

			if (!finite(v)) {
				drawing = false;
				continue;
			}

			const x = 48 + (v - 273.15 - lo) / (hi - lo) * 360,
				y = 20 + Math.log(row.p / pTop) / Math.max(.01, Math.log(pBottom / pTop)) * 170;

			d += `${drawing ? 'L' : 'M'}${x},${y} `;
			drawing = true;
		}

		return d;
	}

	const func = (key, f) => f.key === key;

	$$self.$$set = $$props => {
		if ('data' in $$props) $$invalidate(0, data = $$props.data);
		if ('valid' in $$props) $$invalidate(1, valid = $$props.valid);
		if ('prefs' in $$props) $$invalidate(2, prefs = $$props.prefs);
		if ('comparisons' in $$props) $$invalidate(17, comparisons = $$props.comparisons);
		if ('comparisonErrors' in $$props) $$invalidate(3, comparisonErrors = $$props.comparisonErrors);
		if ('compareBusy' in $$props) $$invalidate(4, compareBusy = $$props.compareBusy);
		if ('onCompare' in $$props) $$invalidate(5, onCompare = $$props.onCompare);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*data, comparisons, valid*/ 131075) {
			$$invalidate(14, result = compare([data, ...comparisons], 'temperature', valid));
		}

		if ($$self.$$.dirty[0] & /*data, valid*/ 3) {
			$$invalidate(13, surface = derived(data, valid));
		}

		if ($$self.$$.dirty[0] & /*data, valid*/ 3) {
			$$invalidate(12, calculated = diagnostics(data, valid));
		}

		if ($$self.$$.dirty[0] & /*data, valid*/ 3) {
			$$invalidate(6, rows = verticalProfile(data, valid).filter(r => r.belowGround !== true));
		}

		if ($$self.$$.dirty[0] & /*rows*/ 64) {
			$$invalidate(7, temperatures = rows.flatMap(r => [r.t, r.td]).filter(finite).map(v => v - 273.15));
		}

		if ($$self.$$.dirty[0] & /*temperatures*/ 128) {
			$$invalidate(11, min = temperatures.length
			? Math.floor((Math.min(...temperatures) - 5) / 10) * 10
			: -80);
		}

		if ($$self.$$.dirty[0] & /*temperatures*/ 128) {
			$$invalidate(10, max = temperatures.length
			? Math.ceil((Math.max(...temperatures) + 5) / 10) * 10
			: 40);
		}

		if ($$self.$$.dirty[0] & /*rows*/ 64) {
			$$invalidate(9, top = rows.length ? Math.min(...rows.map(r => r.p)) : 100);
		}

		if ($$self.$$.dirty[0] & /*rows*/ 64) {
			$$invalidate(8, bottom = rows.length ? Math.max(...rows.map(r => r.p)) : 1000);
		}
	};

	return [
		data,
		valid,
		prefs,
		comparisonErrors,
		compareBusy,
		onCompare,
		rows,
		temperatures,
		bottom,
		top,
		max,
		min,
		calculated,
		surface,
		result,
		show,
		path,
		comparisons,
		func
	];
}

class Meteorology extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$5,
			create_fragment$5,
			safe_not_equal,
			{
				data: 0,
				valid: 1,
				prefs: 2,
				comparisons: 17,
				comparisonErrors: 3,
				compareBusy: 4,
				onCompare: 5
			},
			add_css$4,
			[-1, -1]
		);
	}
}

/* src\App.svelte generated by Svelte v4.2.20 */

function add_css$3(target) {
	append_styles(target, "svelte-fyh19z", ".weatherscope.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{--bg:#0d1b27;--panel:#152b37;--line:#36505e;--muted:#b2c7d1;--mint:#7be4ca;--ink:#edf7fa;--aurora-hero:linear-gradient(125deg,#193e43,#183044);background:var(--bg);color:var(--ink);font:14px/1.5 system-ui,sans-serif;padding:20px;max-width:780px;margin:auto;min-height:100%;color-scheme:dark;box-sizing:border-box}.weatherscope.svelte-fyh19z .svelte-fyh19z.svelte-fyh19z{box-sizing:border-box}h1.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z,h2.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z,p.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{margin:0}h1.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{font-size:25px;font-weight:600;letter-spacing:-.8px}h1.svelte-fyh19z span.svelte-fyh19z.svelte-fyh19z{display:block;color:var(--mint);font-size:10px;letter-spacing:1.4px;margin-top:3px}h2.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{font-size:17px;font-weight:500;color:var(--ink)}header.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line);padding-bottom:14px}.brand.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{display:flex;align-items:center;gap:10px}.brand.svelte-fyh19z p.svelte-fyh19z.svelte-fyh19z{display:none}.mark.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{display:grid;place-items:center;width:39px;height:39px;background:#193e43;color:var(--mint);border-radius:12px;font-size:29px}button.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z,input.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z,select.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{font:inherit;background:var(--panel);color:var(--ink);border:1px solid var(--line);border-radius:9px;min-height:40px;padding:8px 10px;max-width:100%}button.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{cursor:pointer}button.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z:hover{background:#264451}button.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z:focus-visible,input.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z:focus-visible,select.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z:focus-visible{outline:2px solid var(--mint);outline-offset:2px}button.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z:disabled{opacity:.5;cursor:wait}.icon.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{border:0;background:transparent;font-size:20px}.location.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:16px 0}.location.svelte-fyh19z h2.svelte-fyh19z.svelte-fyh19z{font-size:22px;margin:4px 0}.location.svelte-fyh19z small.svelte-fyh19z.svelte-fyh19z{display:none}.location.svelte-fyh19z strong.svelte-fyh19z.svelte-fyh19z{font-size:12px;font-weight:400;color:var(--muted)}.location.svelte-fyh19z button.svelte-fyh19z.svelte-fyh19z{font-size:12px}.saved.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z,.pinned.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{color:var(--mint)}small.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{font-size:11px;color:var(--muted)}.source.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:12px 0}.source.svelte-fyh19z label.svelte-fyh19z.svelte-fyh19z{font-size:12px;color:var(--muted)}.source.svelte-fyh19z select.svelte-fyh19z.svelte-fyh19z{color:var(--mint);font-size:12px;margin-left:6px;max-width:170px}.source.svelte-fyh19z>button.svelte-fyh19z.svelte-fyh19z{font-size:12px}.workspace-actions.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{display:flex;justify-content:flex-end;gap:8px;margin:10px 0}.workspace-actions.svelte-fyh19z button.svelte-fyh19z.svelte-fyh19z{font-size:12px}.detail-menu.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{padding:12px;background:var(--panel);border-radius:10px;margin:10px 0}.detail-menu.svelte-fyh19z label.svelte-fyh19z.svelte-fyh19z{display:flex;gap:12px;align-items:center}.detail-menu.svelte-fyh19z select.svelte-fyh19z.svelte-fyh19z{flex:1}.timebar.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{display:flex;gap:8px;align-items:center;justify-content:space-between;flex-wrap:wrap}.timebar.svelte-fyh19z small.svelte-fyh19z.svelte-fyh19z{font-size:10px}.timebar.svelte-fyh19z strong.svelte-fyh19z.svelte-fyh19z{display:block;font-size:18px;font-weight:500}.shortcuts.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{display:flex;gap:4px}.shortcuts.svelte-fyh19z button.svelte-fyh19z.svelte-fyh19z{font-size:11px;padding:5px 7px;min-height:34px}.source-details.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{font-size:11px;margin:6px 0;color:var(--muted)}summary.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{cursor:pointer}details.svelte-fyh19z p.svelte-fyh19z.svelte-fyh19z{margin:8px 0}.footnote.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{font-size:11px;color:var(--muted);line-height:1.6;margin:10px 0}.notice.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{font-size:11px;border:1px solid #67512c;background:#302b21;color:#eed4a4;padding:8px 10px;border-radius:8px;margin:10px 0}.settings.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{display:grid;gap:12px;background:var(--panel);border-radius:12px;padding:14px;margin:12px 0}.settings.svelte-fyh19z label.svelte-fyh19z.svelte-fyh19z{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:12px}.settings.svelte-fyh19z input[type=number].svelte-fyh19z.svelte-fyh19z{width:80px}.settings.svelte-fyh19z input[type=checkbox].svelte-fyh19z.svelte-fyh19z{min-height:auto}.favorites.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{display:flex;flex-wrap:wrap;gap:6px}.favorites.svelte-fyh19z button.svelte-fyh19z.svelte-fyh19z{font-size:12px}.empty.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{text-align:center;color:var(--muted);padding:40px 10px}.empty.svelte-fyh19z h2.svelte-fyh19z.svelte-fyh19z{margin:12px}.empty.svelte-fyh19z button.svelte-fyh19z.svelte-fyh19z{margin:14px}.error.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{color:#efb3a4}.pulse.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{display:inline-block;border:2px solid var(--mint);border-radius:50%;width:16px;height:16px}.section-title.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{display:flex;justify-content:space-between;align-items:center;gap:8px;margin:20px 0 10px}.diagnostics.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:16px 0}.diagnostics.svelte-fyh19z button.svelte-fyh19z.svelte-fyh19z{text-align:left;padding:12px}.diagnostics.svelte-fyh19z small.svelte-fyh19z.svelte-fyh19z,.diagnostics.svelte-fyh19z strong.svelte-fyh19z.svelte-fyh19z{display:block}.diagnostics.svelte-fyh19z strong.svelte-fyh19z.svelte-fyh19z{font-size:19px;font-weight:500;margin:7px 0}.profile.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z,.comparison.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z,.detail.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{padding:15px;background:var(--panel);border:1px solid var(--line);border-radius:12px;margin:12px 0}.profile.svelte-fyh19z svg.svelte-fyh19z.svelte-fyh19z{width:100%;height:auto}.profile.svelte-fyh19z text.svelte-fyh19z.svelte-fyh19z{fill:var(--muted);font-size:10px}.profile.svelte-fyh19z p.svelte-fyh19z.svelte-fyh19z{font-size:11px;text-align:center}.amber.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{color:#f4ba77}.mint.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{color:var(--mint)}.scroll-table.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{overflow:auto;border:1px solid var(--line);border-radius:10px}table.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{border-collapse:collapse;width:100%;white-space:nowrap;font-size:11px}th.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z,td.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{padding:9px;text-align:right;border-bottom:1px solid var(--line)}th.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{font-weight:500;color:var(--muted)}.hodograph.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{display:block;width:100%;max-width:300px;margin:auto}.hodograph.svelte-fyh19z text.svelte-fyh19z.svelte-fyh19z{fill:var(--muted);font-size:9px}.comparison.svelte-fyh19z>div.svelte-fyh19z.svelte-fyh19z{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:12px 0}.comparison.svelte-fyh19z span.svelte-fyh19z.svelte-fyh19z{font-size:19px}.comparison.svelte-fyh19z span.svelte-fyh19z small.svelte-fyh19z{display:block}.filters.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{display:flex;gap:8px;margin-top:15px;flex-wrap:wrap}.filters.svelte-fyh19z input.svelte-fyh19z.svelte-fyh19z{flex:1;min-width:140px}.filters.svelte-fyh19z select.svelte-fyh19z.svelte-fyh19z{max-width:170px}.parameter.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{display:flex;border-bottom:1px solid var(--line);gap:6px}.field.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{display:flex;align-items:center;justify-content:space-between;gap:10px;flex:1;min-width:0;text-align:left;border:0;background:transparent;padding:12px 0}.field.svelte-fyh19z span.svelte-fyh19z.svelte-fyh19z{overflow-wrap:anywhere;font-size:13px}.field.svelte-fyh19z small.svelte-fyh19z.svelte-fyh19z{display:block;font-size:11px}.field.svelte-fyh19z strong.svelte-fyh19z.svelte-fyh19z{font-size:13px;white-space:nowrap;font-weight:500}.parameter.svelte-fyh19z>button.svelte-fyh19z.svelte-fyh19z:last-child{background:none;border:0;font-size:21px;min-width:40px}.detail.svelte-fyh19z p.svelte-fyh19z.svelte-fyh19z{font-size:12px;color:var(--muted);margin:8px 0}.close.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{float:right}.coverage.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{display:flex;gap:12px;align-items:center;border-bottom:1px solid var(--line);padding:12px 0}.coverage.svelte-fyh19z>span.svelte-fyh19z.svelte-fyh19z{font-size:18px;color:var(--muted)}.coverage.svelte-fyh19z>span.available.svelte-fyh19z.svelte-fyh19z{color:var(--mint)}.coverage.svelte-fyh19z strong.svelte-fyh19z.svelte-fyh19z,.coverage.svelte-fyh19z small.svelte-fyh19z.svelte-fyh19z{display:block}.coverage.svelte-fyh19z strong.svelte-fyh19z.svelte-fyh19z{font-size:13px;font-weight:500}pre.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{overflow:auto;max-height:300px;background:var(--panel);padding:12px;font-size:11px}footer.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;font-size:10px;color:var(--muted);border-top:1px solid var(--line);padding-top:12px;margin-top:18px}@media(max-width:440px){.weatherscope.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{padding:14px}h1.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{font-size:23px}.source.svelte-fyh19z.svelte-fyh19z.svelte-fyh19z{flex-wrap:wrap}.source.svelte-fyh19z select.svelte-fyh19z.svelte-fyh19z{max-width:145px}.source.svelte-fyh19z label.svelte-fyh19z.svelte-fyh19z{flex:1}.source.svelte-fyh19z>button.svelte-fyh19z.svelte-fyh19z{font-size:11px;padding:7px}.location.svelte-fyh19z h2.svelte-fyh19z.svelte-fyh19z{font-size:21px}.timebar.svelte-fyh19z strong.svelte-fyh19z.svelte-fyh19z{font-size:16px}.shortcuts.svelte-fyh19z button.svelte-fyh19z.svelte-fyh19z{min-height:36px}}");
}

function get_each_context_12(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[111] = list[i];
	return child_ctx;
}

function get_each_context_10(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[94] = list[i];
	return child_ctx;
}

function get_each_context_11(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[108] = list[i];
	return child_ctx;
}

function get_each_context_7(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[97] = list[i];
	return child_ctx;
}

function get_each_context_8(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[86] = list[i];
	const constants_0 = compare([/*data*/ child_ctx[7], .../*comparisons*/ child_ctx[24]], /*key*/ child_ctx[86], /*valid*/ child_ctx[13]);
	child_ctx[100] = constants_0;
	return child_ctx;
}

function get_each_context_9(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[103] = list[i];
	return child_ctx;
}

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[78] = list[i];
	return child_ctx;
}

function get_each_context_1$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[81] = list[i];
	return child_ctx;
}

function get_each_context_2$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[78] = list[i];
	return child_ctx;
}

function get_each_context_3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[86] = list[i];
	return child_ctx;
}

function get_each_context_4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[89] = list[i];
	return child_ctx;
}

function get_each_context_5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[78] = list[i];
	return child_ctx;
}

function get_each_context_6(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[94] = list[i];
	return child_ctx;
}

function get_each_context_13(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[114] = list[i];
	return child_ctx;
}

function get_each_context_14(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[117] = list[i];
	return child_ctx;
}

function get_each_context_15(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[86] = list[i][0];
	child_ctx[120] = list[i][1];
	return child_ctx;
}

function get_each_context_16(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[123] = list[i];
	return child_ctx;
}

// (51:1) {#if demo}
function create_if_block_25(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = "DESIGN PREVIEW · Synthetic sample data, not a weather forecast";
			attr(div, "class", "notice svelte-fyh19z");
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

// (52:62) {#if placeName}
function create_if_block_24(ctx) {
	let h2;
	let t_1;

	return {
		c() {
			h2 = element("h2");
			t_1 = text(/*placeName*/ ctx[4]);
			attr(h2, "class", "svelte-fyh19z");
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

// (53:1) {#if favorites.length}
function create_if_block_23$1(ctx) {
	let div;
	let each_value_16 = ensure_array_like(/*favorites*/ ctx[12]);
	let each_blocks = [];

	for (let i = 0; i < each_value_16.length; i += 1) {
		each_blocks[i] = create_each_block_16(get_each_context_16(ctx, each_value_16, i));
	}

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div, "class", "favorites svelte-fyh19z");
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
				each_value_16 = ensure_array_like(/*favorites*/ ctx[12]);
				let i;

				for (i = 0; i < each_value_16.length; i += 1) {
					const child_ctx = get_each_context_16(ctx, each_value_16, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_16(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_16.length;
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

// (53:46) {#each favorites as place}
function create_each_block_16(ctx) {
	let button;
	let t_1_value = (/*place*/ ctx[123].name || `${/*place*/ ctx[123].lat.toFixed(2)}, ${/*place*/ ctx[123].lon.toFixed(2)}`) + "";
	let t_1;
	let mounted;
	let dispose;

	function click_handler_1() {
		return /*click_handler_1*/ ctx[54](/*place*/ ctx[123]);
	}

	return {
		c() {
			button = element("button");
			t_1 = text(t_1_value);
			attr(button, "class", "svelte-fyh19z");
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
			if (dirty[0] & /*favorites*/ 4096 && t_1_value !== (t_1_value = (/*place*/ ctx[123].name || `${/*place*/ ctx[123].lat.toFixed(2)}, ${/*place*/ ctx[123].lon.toFixed(2)}`) + "")) set_data(t_1, t_1_value);
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

// (54:77) {:else}
function create_else_block_3$1(ctx) {
	let label_1;
	let t_1;
	let select;
	let mounted;
	let dispose;
	let each_value_15 = ensure_array_like(Object.entries(MODELS));
	let each_blocks = [];

	for (let i = 0; i < each_value_15.length; i += 1) {
		each_blocks[i] = create_each_block_15(get_each_context_15(ctx, each_value_15, i));
	}

	return {
		c() {
			label_1 = element("label");
			t_1 = text("Baseline ");
			select = element("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(select, "aria-label", "Baseline model");
			attr(select, "class", "svelte-fyh19z");
			if (/*model*/ ctx[6] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[55].call(select));
			attr(label_1, "class", "svelte-fyh19z");
		},
		m(target, anchor) {
			insert(target, label_1, anchor);
			append(label_1, t_1);
			append(label_1, select);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(select, null);
				}
			}

			select_option(select, /*model*/ ctx[6], true);

			if (!mounted) {
				dispose = [
					listen(select, "change", /*select_change_handler*/ ctx[55]),
					listen(select, "change", /*save*/ ctx[37])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*Object*/ 0) {
				each_value_15 = ensure_array_like(Object.entries(MODELS));
				let i;

				for (i = 0; i < each_value_15.length; i += 1) {
					const child_ctx = get_each_context_15(ctx, each_value_15, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_15(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_15.length;
			}

			if (dirty[0] & /*model*/ 64) {
				select_option(select, /*model*/ ctx[6]);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(label_1);
			}

			destroy_each(each_blocks, detaching);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (54:21) {#if view==='Winter'}
function create_if_block_22$1(ctx) {
	let small;

	return {
		c() {
			small = element("small");
			small.textContent = "Winter source: ECMWF";
			attr(small, "class", "svelte-fyh19z");
		},
		m(target, anchor) {
			insert(target, small, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(small);
			}
		}
	};
}

// (54:172) {#each Object.entries(MODELS) as [key,label]}
function create_each_block_15(ctx) {
	let option;
	let t0_value = /*label*/ ctx[120] + "";
	let t0;
	let t1_value = (/*key*/ ctx[86] === 'mblue' ? ' · default' : '') + "";
	let t1;

	return {
		c() {
			option = element("option");
			t0 = text(t0_value);
			t1 = text(t1_value);
			option.__value = /*key*/ ctx[86];
			set_input_value(option, option.__value);
			attr(option, "class", "svelte-fyh19z");
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

// (55:1) {#if settings}
function create_if_block_21$1(ctx) {
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
	let t7;
	let select2;
	let option4;
	let option5;
	let label3;
	let input0;
	let t10;
	let label4;
	let t11;
	let input1;
	let label5;
	let t12;
	let input2;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			h2 = element("h2");
			h2.textContent = "Display preferences";
			label0 = element("label");
			t1 = text("Winter units ");
			select0 = element("select");
			option0 = element("option");
			option0.textContent = "Metric (m, cm)";
			option1 = element("option");
			option1.textContent = "Imperial (ft, in)";
			label1 = element("label");
			t4 = text("Temperature ");
			select1 = element("select");
			option2 = element("option");
			option2.textContent = "°C";
			option3 = element("option");
			option3.textContent = "°F";
			label2 = element("label");
			t7 = text("Wind ");
			select2 = element("select");
			option4 = element("option");
			option4.textContent = "Knots";
			option5 = element("option");
			option5.textContent = "m/s";
			label3 = element("label");
			input0 = element("input");
			t10 = text(" Use this device’s timezone");
			label4 = element("label");
			t11 = text("Gust signal (m/s) ");
			input1 = element("input");
			label5 = element("label");
			t12 = text("Wet interval (mm/step) ");
			input2 = element("input");
			attr(h2, "class", "svelte-fyh19z");
			option0.__value = "metric";
			set_input_value(option0, option0.__value);
			attr(option0, "class", "svelte-fyh19z");
			option1.__value = "imperial";
			set_input_value(option1, option1.__value);
			attr(option1, "class", "svelte-fyh19z");
			attr(select0, "class", "svelte-fyh19z");
			if (/*prefs*/ ctx[26].winterUnits === void 0) add_render_callback(() => /*select0_change_handler*/ ctx[58].call(select0));
			attr(label0, "class", "svelte-fyh19z");
			option2.__value = "C";
			set_input_value(option2, option2.__value);
			attr(option2, "class", "svelte-fyh19z");
			option3.__value = "F";
			set_input_value(option3, option3.__value);
			attr(option3, "class", "svelte-fyh19z");
			attr(select1, "class", "svelte-fyh19z");
			if (/*prefs*/ ctx[26].temp === void 0) add_render_callback(() => /*select1_change_handler*/ ctx[59].call(select1));
			attr(label1, "class", "svelte-fyh19z");
			option4.__value = "kt";
			set_input_value(option4, option4.__value);
			attr(option4, "class", "svelte-fyh19z");
			option5.__value = "ms";
			set_input_value(option5, option5.__value);
			attr(option5, "class", "svelte-fyh19z");
			attr(select2, "class", "svelte-fyh19z");
			if (/*prefs*/ ctx[26].wind === void 0) add_render_callback(() => /*select2_change_handler*/ ctx[60].call(select2));
			attr(label2, "class", "svelte-fyh19z");
			attr(input0, "type", "checkbox");
			attr(input0, "class", "svelte-fyh19z");
			attr(label3, "class", "svelte-fyh19z");
			attr(input1, "type", "number");
			attr(input1, "min", "1");
			attr(input1, "max", "100");
			attr(input1, "class", "svelte-fyh19z");
			attr(label4, "class", "svelte-fyh19z");
			attr(input2, "type", "number");
			attr(input2, "min", "0.1");
			attr(input2, "max", "100");
			attr(input2, "step", "0.1");
			attr(input2, "class", "svelte-fyh19z");
			attr(label5, "class", "svelte-fyh19z");
			attr(div, "class", "settings svelte-fyh19z");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, h2);
			append(div, label0);
			append(label0, t1);
			append(label0, select0);
			append(select0, option0);
			append(select0, option1);
			select_option(select0, /*prefs*/ ctx[26].winterUnits, true);
			append(div, label1);
			append(label1, t4);
			append(label1, select1);
			append(select1, option2);
			append(select1, option3);
			select_option(select1, /*prefs*/ ctx[26].temp, true);
			append(div, label2);
			append(label2, t7);
			append(label2, select2);
			append(select2, option4);
			append(select2, option5);
			select_option(select2, /*prefs*/ ctx[26].wind, true);
			append(div, label3);
			append(label3, input0);
			input0.checked = /*prefs*/ ctx[26].local;
			append(label3, t10);
			append(div, label4);
			append(label4, t11);
			append(label4, input1);
			set_input_value(input1, /*thresholds*/ ctx[27].gust);
			append(div, label5);
			append(label5, t12);
			append(label5, input2);
			set_input_value(input2, /*thresholds*/ ctx[27].rain);

			if (!mounted) {
				dispose = [
					listen(select0, "change", /*select0_change_handler*/ ctx[58]),
					listen(select0, "change", /*save*/ ctx[37]),
					listen(select1, "change", /*select1_change_handler*/ ctx[59]),
					listen(select1, "change", /*save*/ ctx[37]),
					listen(select2, "change", /*select2_change_handler*/ ctx[60]),
					listen(select2, "change", /*save*/ ctx[37]),
					listen(input0, "change", /*input0_change_handler*/ ctx[61]),
					listen(input0, "change", /*save*/ ctx[37]),
					listen(input1, "input", /*input1_input_handler*/ ctx[62]),
					listen(input1, "change", /*save*/ ctx[37]),
					listen(input2, "input", /*input2_input_handler*/ ctx[63]),
					listen(input2, "change", /*save*/ ctx[37])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*prefs*/ 67108864) {
				select_option(select0, /*prefs*/ ctx[26].winterUnits);
			}

			if (dirty[0] & /*prefs*/ 67108864) {
				select_option(select1, /*prefs*/ ctx[26].temp);
			}

			if (dirty[0] & /*prefs*/ 67108864) {
				select_option(select2, /*prefs*/ ctx[26].wind);
			}

			if (dirty[0] & /*prefs*/ 67108864) {
				input0.checked = /*prefs*/ ctx[26].local;
			}

			if (dirty[0] & /*thresholds*/ 134217728 && to_number(input1.value) !== /*thresholds*/ ctx[27].gust) {
				set_input_value(input1, /*thresholds*/ ctx[27].gust);
			}

			if (dirty[0] & /*thresholds*/ 134217728 && to_number(input2.value) !== /*thresholds*/ ctx[27].rain) {
				set_input_value(input2, /*thresholds*/ ctx[27].rain);
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

// (56:1) {#if view!=='Brief'}
function create_if_block_20$1(ctx) {
	let div;
	let button;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			button = element("button");
			button.textContent = "← Briefing";
			attr(button, "class", "svelte-fyh19z");
			attr(div, "class", "workspace-actions svelte-fyh19z");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, button);

			if (!mounted) {
				dispose = listen(button, "click", /*click_handler_4*/ ctx[64]);
				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(div);
			}

			mounted = false;
			dispose();
		}
	};
}

// (57:1) {#if detailsOpen}
function create_if_block_19$1(ctx) {
	let div;
	let label_1;
	let t0;
	let select;
	let option;
	let select_value_value;
	let mounted;
	let dispose;
	let each_value_14 = ensure_array_like(['Explore', 'Winter', 'Profile', 'Compare', 'Parameters', 'Coverage']);
	let each_blocks = [];

	for (let i = 0; i < 6; i += 1) {
		each_blocks[i] = create_each_block_14(get_each_context_14(ctx, each_value_14, i));
	}

	return {
		c() {
			div = element("div");
			label_1 = element("label");
			t0 = text("Open ");
			select = element("select");
			option = element("option");
			option.textContent = "Choose a tool";

			for (let i = 0; i < 6; i += 1) {
				each_blocks[i].c();
			}

			option.__value = "";
			set_input_value(option, option.__value);
			option.disabled = true;
			attr(option, "class", "svelte-fyh19z");
			attr(select, "aria-label", "Advanced view");
			attr(select, "class", "svelte-fyh19z");
			attr(label_1, "class", "svelte-fyh19z");
			attr(div, "class", "detail-menu svelte-fyh19z");
			attr(div, "aria-label", "Advanced tools");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, label_1);
			append(label_1, t0);
			append(label_1, select);
			append(select, option);

			for (let i = 0; i < 6; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(select, null);
				}
			}

			select_option(select, /*view*/ ctx[20] === 'Brief' ? '' : /*view*/ ctx[20]);

			if (!mounted) {
				dispose = listen(select, "change", /*change_handler*/ ctx[65]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*view*/ 1048576 && select_value_value !== (select_value_value = /*view*/ ctx[20] === 'Brief' ? '' : /*view*/ ctx[20])) {
				select_option(select, /*view*/ ctx[20] === 'Brief' ? '' : /*view*/ ctx[20]);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}

			destroy_each(each_blocks, detaching);
			mounted = false;
			dispose();
		}
	};
}

// (57:246) {#each ['Explore','Winter','Profile','Compare','Parameters','Coverage'] as name}
function create_each_block_14(ctx) {
	let option;

	return {
		c() {
			option = element("option");

			option.textContent = `${/*name*/ ctx[117] === 'Explore'
			? 'Visual explorer'
			: /*name*/ ctx[117] === 'Profile'
				? 'Atmospheric profile'
				: /*name*/ ctx[117] === 'Compare'
					? 'Compare models'
					: /*name*/ ctx[117] === 'Coverage'
						? 'Data coverage'
						: /*name*/ ctx[117]}`;

			option.__value = /*name*/ ctx[117];
			set_input_value(option, option.__value);
			attr(option, "class", "svelte-fyh19z");
		},
		m(target, anchor) {
			insert(target, option, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(option);
			}
		}
	};
}

// (95:1) {:else}
function create_else_block_2$1(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.innerHTML = `<h2 class="svelte-fyh19z">Select a location</h2><p class="svelte-fyh19z">Click the map to load a Meteoblue briefing.</p>`;
			attr(div, "class", "empty svelte-fyh19z");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

// (61:16) 
function create_if_block_4$3(ctx) {
	let t0;
	let div2;
	let div0;
	let small;
	let t1;
	let t2_value = (/*prefs*/ ctx[26].local ? 'DEVICE LOCAL' : 'UTC') + "";
	let t2;
	let strong;
	let t3_value = timeLabel(/*valid*/ ctx[13], /*prefs*/ ctx[26].local) + "";
	let t3;
	let div1;
	let t4;
	let t5;
	let forecastslider;
	let t6;
	let details;
	let summary;
	let t7;
	let t8;

	let t9_value = (/*health*/ ctx[32].age === null
	? 'Run time unavailable'
	: /*health*/ ctx[32].age < 0
		? 'Check provider run time'
		: 'Run ' + Math.round(/*health*/ ctx[32].age) + 'h ago') + "";

	let t9;
	let p0;
	let t10_value = /*health*/ ctx[32].available + "";
	let t10;
	let t11;
	let t12_value = /*health*/ ctx[32].total + "";
	let t12;
	let t13;

	let t14_value = (/*health*/ ctx[32].lead === null
	? 'Forecast lead unavailable.'
	: 'Forecast lead ' + Math.round(/*health*/ ctx[32].lead) + 'h.') + "";

	let t14;
	let p1;

	let t15_value = (Number.isFinite(Date.parse(/*data*/ ctx[7].header.refTime))
	? 'Provider run: ' + timeLabel(Date.parse(/*data*/ ctx[7].header.refTime), false) + ' UTC'
	: 'Provider run timestamp missing or invalid') + "";

	let t15;
	let t16;
	let t17;
	let t18;
	let t19;
	let current_block_type_index;
	let if_block5;
	let t20;
	let footer;
	let span0;
	let span1;
	let t22;
	let t23_value = (/*demo*/ ctx[2] ? 'Preview' : 'Windy') + "";
	let t23;
	let current;
	let if_block0 = /*view*/ ctx[20] === 'Brief' && create_if_block_18$1(ctx);
	let each_value_13 = ensure_array_like([0, 6, 12, 24]);
	let each_blocks = [];

	for (let i = 0; i < 4; i += 1) {
		each_blocks[i] = create_each_block_13(get_each_context_13(ctx, each_value_13, i));
	}

	let if_block1 = /*index*/ ctx[17] < 0 && create_if_block_17$1();

	forecastslider = new ForecastSlider({
			props: {
				ts: /*data*/ ctx[7].ts,
				valid: /*valid*/ ctx[13],
				local: /*prefs*/ ctx[26].local,
				onTime: /*chooseTime*/ ctx[41]
			}
		});

	let if_block2 = /*mapModel*/ ctx[3] && /*mapModel*/ ctx[3] !== /*data*/ ctx[7].model && create_if_block_16$1(ctx);
	let if_block3 = /*data*/ ctx[7].model !== /*model*/ ctx[6] && create_if_block_15$1(ctx);
	let if_block4 = /*data*/ ctx[7].header.merged && create_if_block_14$1(ctx);

	const if_block_creators = [
		create_if_block_5$2,
		create_if_block_6$2,
		create_if_block_7$1,
		create_if_block_10$1,
		create_if_block_11$1,
		create_if_block_13$1
	];

	const if_blocks = [];

	function select_block_type_3(ctx, dirty) {
		if (/*view*/ ctx[20] === 'Brief') return 0;
		if (/*view*/ ctx[20] === 'Explore') return 1;
		if (/*view*/ ctx[20] === 'Profile') return 2;
		if (/*view*/ ctx[20] === 'Compare') return 3;
		if (/*view*/ ctx[20] === 'Parameters') return 4;
		if (/*view*/ ctx[20] === 'Coverage') return 5;
		return -1;
	}

	if (~(current_block_type_index = select_block_type_3(ctx))) {
		if_block5 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	return {
		c() {
			if (if_block0) if_block0.c();
			t0 = space();
			div2 = element("div");
			div0 = element("div");
			small = element("small");
			t1 = text("VALID TIME · ");
			t2 = text(t2_value);
			strong = element("strong");
			t3 = text(t3_value);
			div1 = element("div");

			for (let i = 0; i < 4; i += 1) {
				each_blocks[i].c();
			}

			t4 = space();
			if (if_block1) if_block1.c();
			t5 = space();
			create_component(forecastslider.$$.fragment);
			t6 = space();
			details = element("details");
			summary = element("summary");
			t7 = text(/*served*/ ctx[34]);
			t8 = text(" · ");
			t9 = text(t9_value);
			p0 = element("p");
			t10 = text(t10_value);
			t11 = text("/");
			t12 = text(t12_value);
			t13 = text(" numeric fields available at this time. ");
			t14 = text(t14_value);
			p1 = element("p");
			t15 = text(t15_value);
			t16 = space();
			if (if_block2) if_block2.c();
			t17 = space();
			if (if_block3) if_block3.c();
			t18 = space();
			if (if_block4) if_block4.c();
			t19 = space();
			if (if_block5) if_block5.c();
			t20 = space();
			footer = element("footer");
			span0 = element("span");
			span0.textContent = "METEOROLOGICAL WORKSPACE";
			span1 = element("span");
			t22 = text("WeatherScope 0.5.1 · ");
			t23 = text(t23_value);
			attr(small, "class", "svelte-fyh19z");
			attr(strong, "class", "svelte-fyh19z");
			attr(div0, "class", "svelte-fyh19z");
			attr(div1, "class", "shortcuts svelte-fyh19z");
			attr(div2, "class", "timebar svelte-fyh19z");
			attr(summary, "class", "svelte-fyh19z");
			attr(p0, "class", "svelte-fyh19z");
			attr(p1, "class", "svelte-fyh19z");
			attr(details, "class", "source-details svelte-fyh19z");
			attr(span0, "class", "svelte-fyh19z");
			attr(span1, "class", "svelte-fyh19z");
			attr(footer, "class", "svelte-fyh19z");
		},
		m(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert(target, t0, anchor);
			insert(target, div2, anchor);
			append(div2, div0);
			append(div0, small);
			append(small, t1);
			append(small, t2);
			append(div0, strong);
			append(strong, t3);
			append(div2, div1);

			for (let i = 0; i < 4; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div1, null);
				}
			}

			insert(target, t4, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, t5, anchor);
			mount_component(forecastslider, target, anchor);
			insert(target, t6, anchor);
			insert(target, details, anchor);
			append(details, summary);
			append(summary, t7);
			append(summary, t8);
			append(summary, t9);
			append(details, p0);
			append(p0, t10);
			append(p0, t11);
			append(p0, t12);
			append(p0, t13);
			append(p0, t14);
			append(details, p1);
			append(p1, t15);
			insert(target, t16, anchor);
			if (if_block2) if_block2.m(target, anchor);
			insert(target, t17, anchor);
			if (if_block3) if_block3.m(target, anchor);
			insert(target, t18, anchor);
			if (if_block4) if_block4.m(target, anchor);
			insert(target, t19, anchor);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(target, anchor);
			}

			insert(target, t20, anchor);
			insert(target, footer, anchor);
			append(footer, span0);
			append(footer, span1);
			append(span1, t22);
			append(span1, t23);
			current = true;
		},
		p(ctx, dirty) {
			if (/*view*/ ctx[20] === 'Brief') {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty[0] & /*view*/ 1048576) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_18$1(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t0.parentNode, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if ((!current || dirty[0] & /*prefs*/ 67108864) && t2_value !== (t2_value = (/*prefs*/ ctx[26].local ? 'DEVICE LOCAL' : 'UTC') + "")) set_data(t2, t2_value);
			if ((!current || dirty[0] & /*valid, prefs*/ 67117056) && t3_value !== (t3_value = timeLabel(/*valid*/ ctx[13], /*prefs*/ ctx[26].local) + "")) set_data(t3, t3_value);

			if (dirty[1] & /*shortcut*/ 2048) {
				each_value_13 = ensure_array_like([0, 6, 12, 24]);
				let i;

				for (i = 0; i < 4; i += 1) {
					const child_ctx = get_each_context_13(ctx, each_value_13, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_13(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div1, null);
					}
				}

				for (; i < 4; i += 1) {
					each_blocks[i].d(1);
				}
			}

			if (/*index*/ ctx[17] < 0) {
				if (if_block1) ; else {
					if_block1 = create_if_block_17$1();
					if_block1.c();
					if_block1.m(t5.parentNode, t5);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			const forecastslider_changes = {};
			if (dirty[0] & /*data*/ 128) forecastslider_changes.ts = /*data*/ ctx[7].ts;
			if (dirty[0] & /*valid*/ 8192) forecastslider_changes.valid = /*valid*/ ctx[13];
			if (dirty[0] & /*prefs*/ 67108864) forecastslider_changes.local = /*prefs*/ ctx[26].local;
			forecastslider.$set(forecastslider_changes);
			if (!current || dirty[1] & /*served*/ 8) set_data(t7, /*served*/ ctx[34]);

			if ((!current || dirty[1] & /*health*/ 2) && t9_value !== (t9_value = (/*health*/ ctx[32].age === null
			? 'Run time unavailable'
			: /*health*/ ctx[32].age < 0
				? 'Check provider run time'
				: 'Run ' + Math.round(/*health*/ ctx[32].age) + 'h ago') + "")) set_data(t9, t9_value);

			if ((!current || dirty[1] & /*health*/ 2) && t10_value !== (t10_value = /*health*/ ctx[32].available + "")) set_data(t10, t10_value);
			if ((!current || dirty[1] & /*health*/ 2) && t12_value !== (t12_value = /*health*/ ctx[32].total + "")) set_data(t12, t12_value);

			if ((!current || dirty[1] & /*health*/ 2) && t14_value !== (t14_value = (/*health*/ ctx[32].lead === null
			? 'Forecast lead unavailable.'
			: 'Forecast lead ' + Math.round(/*health*/ ctx[32].lead) + 'h.') + "")) set_data(t14, t14_value);

			if ((!current || dirty[0] & /*data*/ 128) && t15_value !== (t15_value = (Number.isFinite(Date.parse(/*data*/ ctx[7].header.refTime))
			? 'Provider run: ' + timeLabel(Date.parse(/*data*/ ctx[7].header.refTime), false) + ' UTC'
			: 'Provider run timestamp missing or invalid') + "")) set_data(t15, t15_value);

			if (/*mapModel*/ ctx[3] && /*mapModel*/ ctx[3] !== /*data*/ ctx[7].model) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_16$1(ctx);
					if_block2.c();
					if_block2.m(t17.parentNode, t17);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (/*data*/ ctx[7].model !== /*model*/ ctx[6]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block_15$1(ctx);
					if_block3.c();
					if_block3.m(t18.parentNode, t18);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (/*data*/ ctx[7].header.merged) {
				if (if_block4) {
					if_block4.p(ctx, dirty);
				} else {
					if_block4 = create_if_block_14$1(ctx);
					if_block4.c();
					if_block4.m(t19.parentNode, t19);
				}
			} else if (if_block4) {
				if_block4.d(1);
				if_block4 = null;
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_3(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block5) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block5 = if_blocks[current_block_type_index];

					if (!if_block5) {
						if_block5 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block5.c();
					} else {
						if_block5.p(ctx, dirty);
					}

					transition_in(if_block5, 1);
					if_block5.m(t20.parentNode, t20);
				} else {
					if_block5 = null;
				}
			}

			if ((!current || dirty[0] & /*demo*/ 4) && t23_value !== (t23_value = (/*demo*/ ctx[2] ? 'Preview' : 'Windy') + "")) set_data(t23, t23_value);
		},
		i(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(forecastslider.$$.fragment, local);
			transition_in(if_block5);
			current = true;
		},
		o(local) {
			transition_out(if_block0);
			transition_out(forecastslider.$$.fragment, local);
			transition_out(if_block5);
			current = false;
		},
		d(detaching) {
			if (detaching) {
				detach(t0);
				detach(div2);
				detach(t4);
				detach(t5);
				detach(t6);
				detach(details);
				detach(t16);
				detach(t17);
				detach(t18);
				detach(t19);
				detach(t20);
				detach(footer);
			}

			if (if_block0) if_block0.d(detaching);
			destroy_each(each_blocks, detaching);
			if (if_block1) if_block1.d(detaching);
			destroy_component(forecastslider, detaching);
			if (if_block2) if_block2.d(detaching);
			if (if_block3) if_block3.d(detaching);
			if (if_block4) if_block4.d(detaching);

			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d(detaching);
			}
		}
	};
}

// (60:17) 
function create_if_block_3$3(ctx) {
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
			t1 = text(/*error*/ ctx[19]);
			button = element("button");
			button.textContent = "Try again";
			p1 = element("p");
			p1.textContent = "No other model has been substituted.";
			attr(h2, "class", "svelte-fyh19z");
			attr(p0, "class", "svelte-fyh19z");
			attr(button, "class", "svelte-fyh19z");
			attr(p1, "class", "svelte-fyh19z");
			attr(div, "class", "empty error svelte-fyh19z");
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
				dispose = listen(button, "click", /*click_handler_5*/ ctx[66]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*error*/ 524288) set_data(t1, /*error*/ ctx[19]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(div);
			}

			mounted = false;
			dispose();
		}
	};
}

// (59:16) 
function create_if_block_2$3(ctx) {
	let div;
	let span;
	let h2;
	let p_1;
	let t1;
	let t2_value = MODELS[/*model*/ ctx[6]] + "";
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
			attr(span, "class", "pulse svelte-fyh19z");
			attr(h2, "class", "svelte-fyh19z");
			attr(p_1, "class", "svelte-fyh19z");
			attr(div, "class", "empty svelte-fyh19z");
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
			if (dirty[0] & /*model*/ 64 && t2_value !== (t2_value = MODELS[/*model*/ ctx[6]] + "")) set_data(t2, t2_value);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

// (58:1) {#if view==='Winter'}
function create_if_block$3(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_1$3, create_else_block$2];
	const if_blocks = [];

	function select_block_type_2(ctx, dirty) {
		if (/*winterComponent*/ ctx[5]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_2(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_2(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) {
				detach(if_block_anchor);
			}

			if_blocks[current_block_type_index].d(detaching);
		}
	};
}

// (62:1) {#if view==='Brief'}
function create_if_block_18$1(ctx) {
	let sevendays;
	let current;

	sevendays = new SevenDays({
			props: {
				data: /*data*/ ctx[7],
				prefs: /*prefs*/ ctx[26],
				valid: /*valid*/ ctx[13],
				onTime: /*chooseTime*/ ctx[41]
			}
		});

	return {
		c() {
			create_component(sevendays.$$.fragment);
		},
		m(target, anchor) {
			mount_component(sevendays, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const sevendays_changes = {};
			if (dirty[0] & /*data*/ 128) sevendays_changes.data = /*data*/ ctx[7];
			if (dirty[0] & /*prefs*/ 67108864) sevendays_changes.prefs = /*prefs*/ ctx[26];
			if (dirty[0] & /*valid*/ 8192) sevendays_changes.valid = /*valid*/ ctx[13];
			sevendays.$set(sevendays_changes);
		},
		i(local) {
			if (current) return;
			transition_in(sevendays.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(sevendays.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(sevendays, detaching);
		}
	};
}

// (63:165) {#each [0,6,12,24] as h}
function create_each_block_13(ctx) {
	let button;
	let mounted;
	let dispose;

	function click_handler_6() {
		return /*click_handler_6*/ ctx[67](/*h*/ ctx[114]);
	}

	return {
		c() {
			button = element("button");
			button.textContent = `${/*h*/ ctx[114] ? '+' + /*h*/ ctx[114] + 'h' : 'Now'}`;
			attr(button, "class", "svelte-fyh19z");
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (!mounted) {
				dispose = listen(button, "click", click_handler_6);
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

// (64:1) {#if index<0}
function create_if_block_17$1(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = "Selected time is outside the returned forecast range. Choose a time below.";
			attr(div, "class", "notice svelte-fyh19z");
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

// (67:1) {#if mapModel&&mapModel!==data.model}
function create_if_block_16$1(ctx) {
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
			t1 = text(/*served*/ ctx[34]);
			t2 = text(" · Windy map: ");
			t3 = text(t3_value);
			t4 = text(". These sources are separate.");
			attr(p_1, "class", "footnote svelte-fyh19z");
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
			if (dirty[1] & /*served*/ 8) set_data(t1, /*served*/ ctx[34]);
			if (dirty[0] & /*mapModel*/ 8 && t3_value !== (t3_value = (MODELS[/*mapModel*/ ctx[3]] || /*mapModel*/ ctx[3]) + "")) set_data(t3, t3_value);
		},
		d(detaching) {
			if (detaching) {
				detach(p_1);
			}
		}
	};
}

// (68:1) {#if data.model!==model}
function create_if_block_15$1(ctx) {
	let div;
	let t0;
	let t1_value = MODELS[/*model*/ ctx[6]] + "";
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
			t3 = text(/*served*/ ctx[34]);
			t4 = text(".");
			attr(div, "class", "notice svelte-fyh19z");
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
			if (dirty[0] & /*model*/ 64 && t1_value !== (t1_value = MODELS[/*model*/ ctx[6]] + "")) set_data(t1, t1_value);
			if (dirty[1] & /*served*/ 8) set_data(t3, /*served*/ ctx[34]);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

// (69:1) {#if data.header.merged}
function create_if_block_14$1(ctx) {
	let div;
	let t0;
	let t1_value = /*data*/ ctx[7].header.merged.mergedModelName + "";
	let t1;
	let t2;
	let t3_value = /*data*/ ctx[7].header.merged.mergedModelStart + "";
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
			attr(div, "class", "notice svelte-fyh19z");
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
			if (dirty[0] & /*data*/ 128 && t1_value !== (t1_value = /*data*/ ctx[7].header.merged.mergedModelName + "")) set_data(t1, t1_value);
			if (dirty[0] & /*data*/ 128 && t3_value !== (t3_value = /*data*/ ctx[7].header.merged.mergedModelStart + "")) set_data(t3, t3_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

// (89:29) 
function create_if_block_13$1(ctx) {
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
			header: /*data*/ ctx[7].header,
			summary: /*data*/ ctx[7].summary,
			celestial: /*data*/ ctx[7].raw.celestial
		},
		null,
		2
	) + "";

	let t7;
	let each_value_12 = ensure_array_like(/*coverage*/ ctx[30]);
	let each_blocks = [];

	for (let i = 0; i < each_value_12.length; i += 1) {
		each_blocks[i] = create_each_block_12(get_each_context_12(ctx, each_value_12, i));
	}

	return {
		c() {
			div = element("div");
			h2 = element("h2");
			h2.textContent = "What this source supplies";
			small = element("small");
			t1 = text(/*served*/ ctx[34]);
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
			attr(h2, "class", "svelte-fyh19z");
			attr(small, "class", "svelte-fyh19z");
			attr(div, "class", "section-title svelte-fyh19z");
			attr(p_1, "class", "footnote svelte-fyh19z");
			attr(summary, "class", "svelte-fyh19z");
			attr(pre, "class", "svelte-fyh19z");
			attr(details, "class", "svelte-fyh19z");
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
			if (dirty[1] & /*served*/ 8) set_data(t1, /*served*/ ctx[34]);

			if (dirty[0] & /*coverage*/ 1073741824) {
				each_value_12 = ensure_array_like(/*coverage*/ ctx[30]);
				let i;

				for (i = 0; i < each_value_12.length; i += 1) {
					const child_ctx = get_each_context_12(ctx, each_value_12, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_12(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(t5.parentNode, t5);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_12.length;
			}

			if (dirty[0] & /*data*/ 128 && t7_value !== (t7_value = JSON.stringify(
				{
					header: /*data*/ ctx[7].header,
					summary: /*data*/ ctx[7].summary,
					celestial: /*data*/ ctx[7].raw.celestial
				},
				null,
				2
			) + "")) set_data(t7, t7_value);
		},
		i: noop,
		o: noop,
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

// (84:31) 
function create_if_block_11$1(ctx) {
	let div0;
	let input;
	let select;
	let t0;
	let div1;
	let h2;
	let t1_value = /*filtered*/ ctx[35].length + "";
	let t1;
	let t2;
	let button;
	let t4;
	let t5;
	let div2;
	let mounted;
	let dispose;
	let each_value_11 = ensure_array_like(/*groups*/ ctx[36]);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_11.length; i += 1) {
		each_blocks_1[i] = create_each_block_11(get_each_context_11(ctx, each_value_11, i));
	}

	let if_block = /*selectedField*/ ctx[33] && create_if_block_12$1(ctx);
	let each_value_10 = ensure_array_like(/*filtered*/ ctx[35]);
	let each_blocks = [];

	for (let i = 0; i < each_value_10.length; i += 1) {
		each_blocks[i] = create_each_block_10(get_each_context_10(ctx, each_value_10, i));
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
			attr(input, "class", "svelte-fyh19z");
			attr(select, "aria-label", "Parameter group");
			attr(select, "class", "svelte-fyh19z");
			if (/*group*/ ctx[9] === void 0) add_render_callback(() => /*select_change_handler_1*/ ctx[72].call(select));
			attr(div0, "class", "filters svelte-fyh19z");
			attr(h2, "class", "svelte-fyh19z");
			attr(button, "class", "svelte-fyh19z");
			attr(div1, "class", "section-title svelte-fyh19z");
			attr(div2, "class", "parameter-list svelte-fyh19z");
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			append(div0, input);
			set_input_value(input, /*search*/ ctx[8]);
			append(div0, select);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(select, null);
				}
			}

			select_option(select, /*group*/ ctx[9], true);
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
					listen(input, "input", /*input_input_handler*/ ctx[71]),
					listen(select, "change", /*select_change_handler_1*/ ctx[72]),
					listen(button, "click", /*download*/ ctx[46])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*search*/ 256 && input.value !== /*search*/ ctx[8]) {
				set_input_value(input, /*search*/ ctx[8]);
			}

			if (dirty[1] & /*groups*/ 32) {
				each_value_11 = ensure_array_like(/*groups*/ ctx[36]);
				let i;

				for (i = 0; i < each_value_11.length; i += 1) {
					const child_ctx = get_each_context_11(ctx, each_value_11, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_11(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(select, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_11.length;
			}

			if (dirty[0] & /*group*/ 512 | dirty[1] & /*groups*/ 32) {
				select_option(select, /*group*/ ctx[9]);
			}

			if (dirty[1] & /*filtered*/ 16 && t1_value !== (t1_value = /*filtered*/ ctx[35].length + "")) set_data(t1, t1_value);

			if (/*selectedField*/ ctx[33]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_12$1(ctx);
					if_block.c();
					if_block.m(t5.parentNode, t5);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty[0] & /*pins, selected, valid, prefs*/ 67120128 | dirty[1] & /*filtered, pin*/ 272) {
				each_value_10 = ensure_array_like(/*filtered*/ ctx[35]);
				let i;

				for (i = 0; i < each_value_10.length; i += 1) {
					const child_ctx = get_each_context_10(ctx, each_value_10, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_10(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div2, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_10.length;
			}
		},
		i: noop,
		o: noop,
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

// (80:28) 
function create_if_block_10$1(ctx) {
	let div;
	let h2;
	let button;

	let t1_value = (/*compareBusy*/ ctx[23]
	? 'Loading…'
	: 'Load comparisons') + "";

	let t1;
	let p_1;
	let t3;
	let t4;
	let each1_anchor;
	let mounted;
	let dispose;
	let each_value_8 = ensure_array_like(['temperature', 'wind', 'windGust', 'pressure']);
	let each_blocks_1 = [];

	for (let i = 0; i < 4; i += 1) {
		each_blocks_1[i] = create_each_block_8(get_each_context_8(ctx, each_value_8, i));
	}

	let each_value_7 = ensure_array_like(/*comparisonErrors*/ ctx[25]);
	let each_blocks = [];

	for (let i = 0; i < each_value_7.length; i += 1) {
		each_blocks[i] = create_each_block_7(get_each_context_7(ctx, each_value_7, i));
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
			attr(h2, "class", "svelte-fyh19z");
			button.disabled = /*compareBusy*/ ctx[23];
			attr(button, "class", "svelte-fyh19z");
			attr(div, "class", "section-title svelte-fyh19z");
			attr(p_1, "class", "footnote svelte-fyh19z");
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
				dispose = listen(button, "click", /*compareModels*/ ctx[45]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*compareBusy*/ 8388608 && t1_value !== (t1_value = (/*compareBusy*/ ctx[23]
			? 'Loading…'
			: 'Load comparisons') + "")) set_data(t1, t1_value);

			if (dirty[0] & /*compareBusy*/ 8388608) {
				button.disabled = /*compareBusy*/ ctx[23];
			}

			if (dirty[0] & /*data, comparisons, valid, prefs*/ 83894400) {
				each_value_8 = ensure_array_like(['temperature', 'wind', 'windGust', 'pressure']);
				let i;

				for (i = 0; i < 4; i += 1) {
					const child_ctx = get_each_context_8(ctx, each_value_8, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_8(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(t4.parentNode, t4);
					}
				}

				for (; i < 4; i += 1) {
					each_blocks_1[i].d(1);
				}
			}

			if (dirty[0] & /*comparisonErrors*/ 33554432) {
				each_value_7 = ensure_array_like(/*comparisonErrors*/ ctx[25]);
				let i;

				for (i = 0; i < each_value_7.length; i += 1) {
					const child_ctx = get_each_context_7(ctx, each_value_7, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_7(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each1_anchor.parentNode, each1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_7.length;
			}
		},
		i: noop,
		o: noop,
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

// (75:28) 
function create_if_block_7$1(ctx) {
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
	let each_value_6 = ensure_array_like(/*extra*/ ctx[16].filter(func_1));
	let each_blocks = [];

	for (let i = 0; i < each_value_6.length; i += 1) {
		each_blocks[i] = create_each_block_6(get_each_context_6(ctx, each_value_6, i));
	}

	function select_block_type_4(ctx, dirty) {
		if (/*profile*/ ctx[28].length) return create_if_block_9$1;
		return create_else_block_1$1;
	}

	let current_block_type = select_block_type_4(ctx);
	let if_block0 = current_block_type(ctx);
	let if_block1 = /*hodo*/ ctx[15].length >= 2 && create_if_block_8$1(ctx);

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
			t2 = text(/*served*/ ctx[34]);
			t3 = text(" · selected forecast time");
			t4 = space();
			if_block0.c();
			t5 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			attr(div0, "class", "diagnostics svelte-fyh19z");
			attr(h2, "class", "svelte-fyh19z");
			attr(small, "class", "svelte-fyh19z");
			attr(div1, "class", "section-title svelte-fyh19z");
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
			if (dirty[0] & /*extra, valid, prefs*/ 67182592 | dirty[1] & /*inspect, served*/ 520) {
				each_value_6 = ensure_array_like(/*extra*/ ctx[16].filter(func_1));
				let i;

				for (i = 0; i < each_value_6.length; i += 1) {
					const child_ctx = get_each_context_6(ctx, each_value_6, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_6(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div0, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_6.length;
			}

			if (dirty[1] & /*served*/ 8) set_data(t2, /*served*/ ctx[34]);

			if (current_block_type === (current_block_type = select_block_type_4(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(t5.parentNode, t5);
				}
			}

			if (/*hodo*/ ctx[15].length >= 2) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_8$1(ctx);
					if_block1.c();
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		i: noop,
		o: noop,
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

// (73:28) 
function create_if_block_6$2(ctx) {
	let explorer;
	let current;

	explorer = new Explorer({
			props: {
				fields: /*fields*/ ctx[14],
				valid: /*valid*/ ctx[13],
				prefs: /*prefs*/ ctx[26],
				terrain: /*data*/ ctx[7].header.modelElevation,
				onTime: /*chooseTime*/ ctx[41]
			}
		});

	return {
		c() {
			create_component(explorer.$$.fragment);
		},
		m(target, anchor) {
			mount_component(explorer, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const explorer_changes = {};
			if (dirty[0] & /*fields*/ 16384) explorer_changes.fields = /*fields*/ ctx[14];
			if (dirty[0] & /*valid*/ 8192) explorer_changes.valid = /*valid*/ ctx[13];
			if (dirty[0] & /*prefs*/ 67108864) explorer_changes.prefs = /*prefs*/ ctx[26];
			if (dirty[0] & /*data*/ 128) explorer_changes.terrain = /*data*/ ctx[7].header.modelElevation;
			explorer.$set(explorer_changes);
		},
		i(local) {
			if (current) return;
			transition_in(explorer.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(explorer.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(explorer, detaching);
		}
	};
}

// (70:1) {#if view==='Brief'}
function create_if_block_5$2(ctx) {
	let brief;
	let t_1;
	let meteorology;
	let current;

	brief = new Brief({
			props: {
				data: /*data*/ ctx[7],
				valid: /*valid*/ ctx[13],
				prefs: /*prefs*/ ctx[26],
				thresholds: /*thresholds*/ ctx[27],
				onTime: /*chooseTime*/ ctx[41],
				onWinter: /*func*/ ctx[68]
			}
		});

	meteorology = new Meteorology({
			props: {
				data: /*data*/ ctx[7],
				valid: /*valid*/ ctx[13],
				prefs: /*prefs*/ ctx[26],
				comparisons: /*comparisons*/ ctx[24],
				comparisonErrors: /*comparisonErrors*/ ctx[25],
				compareBusy: /*compareBusy*/ ctx[23],
				onCompare: /*compareModels*/ ctx[45]
			}
		});

	return {
		c() {
			create_component(brief.$$.fragment);
			t_1 = space();
			create_component(meteorology.$$.fragment);
		},
		m(target, anchor) {
			mount_component(brief, target, anchor);
			insert(target, t_1, anchor);
			mount_component(meteorology, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const brief_changes = {};
			if (dirty[0] & /*data*/ 128) brief_changes.data = /*data*/ ctx[7];
			if (dirty[0] & /*valid*/ 8192) brief_changes.valid = /*valid*/ ctx[13];
			if (dirty[0] & /*prefs*/ 67108864) brief_changes.prefs = /*prefs*/ ctx[26];
			if (dirty[0] & /*thresholds*/ 134217728) brief_changes.thresholds = /*thresholds*/ ctx[27];
			if (dirty[0] & /*detailsOpen*/ 4194304) brief_changes.onWinter = /*func*/ ctx[68];
			brief.$set(brief_changes);
			const meteorology_changes = {};
			if (dirty[0] & /*data*/ 128) meteorology_changes.data = /*data*/ ctx[7];
			if (dirty[0] & /*valid*/ 8192) meteorology_changes.valid = /*valid*/ ctx[13];
			if (dirty[0] & /*prefs*/ 67108864) meteorology_changes.prefs = /*prefs*/ ctx[26];
			if (dirty[0] & /*comparisons*/ 16777216) meteorology_changes.comparisons = /*comparisons*/ ctx[24];
			if (dirty[0] & /*comparisonErrors*/ 33554432) meteorology_changes.comparisonErrors = /*comparisonErrors*/ ctx[25];
			if (dirty[0] & /*compareBusy*/ 8388608) meteorology_changes.compareBusy = /*compareBusy*/ ctx[23];
			meteorology.$set(meteorology_changes);
		},
		i(local) {
			if (current) return;
			transition_in(brief.$$.fragment, local);
			transition_in(meteorology.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(brief.$$.fragment, local);
			transition_out(meteorology.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) {
				detach(t_1);
			}

			destroy_component(brief, detaching);
			destroy_component(meteorology, detaching);
		}
	};
}

// (91:1) {#each coverage as row}
function create_each_block_12(ctx) {
	let div1;
	let span;
	let t0_value = (/*row*/ ctx[111].available ? '✓' : '—') + "";
	let t0;
	let div0;
	let strong;
	let t1_value = /*row*/ ctx[111].label + "";
	let t1;
	let small;

	let t2_value = (/*row*/ ctx[111].available
	? 'Returned · ' + /*row*/ ctx[111].note
	: /*row*/ ctx[111].key
		? 'Not supplied at this time · ' + /*row*/ ctx[111].note
		: /*row*/ ctx[111].note) + "";

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
			attr(span, "class", "svelte-fyh19z");
			toggle_class(span, "available", /*row*/ ctx[111].available);
			attr(strong, "class", "svelte-fyh19z");
			attr(small, "class", "svelte-fyh19z");
			attr(div0, "class", "svelte-fyh19z");
			attr(div1, "class", "coverage svelte-fyh19z");
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
			if (dirty[0] & /*coverage*/ 1073741824 && t0_value !== (t0_value = (/*row*/ ctx[111].available ? '✓' : '—') + "")) set_data(t0, t0_value);

			if (dirty[0] & /*coverage*/ 1073741824) {
				toggle_class(span, "available", /*row*/ ctx[111].available);
			}

			if (dirty[0] & /*coverage*/ 1073741824 && t1_value !== (t1_value = /*row*/ ctx[111].label + "")) set_data(t1, t1_value);

			if (dirty[0] & /*coverage*/ 1073741824 && t2_value !== (t2_value = (/*row*/ ctx[111].available
			? 'Returned · ' + /*row*/ ctx[111].note
			: /*row*/ ctx[111].key
				? 'Not supplied at this time · ' + /*row*/ ctx[111].note
				: /*row*/ ctx[111].note) + "")) set_data(t2, t2_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div1);
			}
		}
	};
}

// (85:205) {#each groups as g}
function create_each_block_11(ctx) {
	let option;
	let t_1_value = /*g*/ ctx[108] + "";
	let t_1;
	let option_value_value;

	return {
		c() {
			option = element("option");
			t_1 = text(t_1_value);
			option.__value = option_value_value = /*g*/ ctx[108];
			set_input_value(option, option.__value);
			attr(option, "class", "svelte-fyh19z");
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t_1);
		},
		p(ctx, dirty) {
			if (dirty[1] & /*groups*/ 32 && t_1_value !== (t_1_value = /*g*/ ctx[108] + "")) set_data(t_1, t_1_value);

			if (dirty[1] & /*groups*/ 32 && option_value_value !== (option_value_value = /*g*/ ctx[108])) {
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

// (87:1) {#if selectedField}
function create_if_block_12$1(ctx) {
	let div;
	let button;
	let h2;
	let t1_value = /*selectedField*/ ctx[33].label + "";
	let t1;
	let p0;
	let t2_value = /*selectedField*/ ctx[33].id + "";
	let t2;
	let t3;
	let t4;
	let p1;
	let t5_value = (/*selectedField*/ ctx[33].method || `Provider unit: ${/*selectedField*/ ctx[33].unit}. No invented value is used for missing data.`) + "";
	let t5;
	let p2;
	let t6;

	let t7_value = (nearestIndex$1(/*selectedField*/ ctx[33].ts, /*valid*/ ctx[13], 0) >= 0
	? timeLabel(/*selectedField*/ ctx[33].ts[nearestIndex$1(/*selectedField*/ ctx[33].ts, /*valid*/ ctx[13], 0)], /*prefs*/ ctx[26].local)
	: 'No matching time') + "";

	let t7;
	let t8;
	let t9_value = /*selectedField*/ ctx[33].ts.length + "";
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
			t4 = text(/*served*/ ctx[34]);
			p1 = element("p");
			t5 = text(t5_value);
			p2 = element("p");
			t6 = text("Sample time: ");
			t7 = text(t7_value);
			t8 = text(" · ");
			t9 = text(t9_value);
			t10 = text(" samples");
			attr(button, "class", "close svelte-fyh19z");
			attr(button, "aria-label", "Close field details");
			attr(h2, "class", "svelte-fyh19z");
			attr(p0, "class", "svelte-fyh19z");
			attr(p1, "class", "svelte-fyh19z");
			attr(p2, "class", "svelte-fyh19z");
			attr(div, "class", "detail svelte-fyh19z");
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
				dispose = listen(button, "click", /*click_handler_8*/ ctx[73]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[1] & /*selectedField*/ 4 && t1_value !== (t1_value = /*selectedField*/ ctx[33].label + "")) set_data(t1, t1_value);
			if (dirty[1] & /*selectedField*/ 4 && t2_value !== (t2_value = /*selectedField*/ ctx[33].id + "")) set_data(t2, t2_value);
			if (dirty[1] & /*served*/ 8) set_data(t4, /*served*/ ctx[34]);
			if (dirty[1] & /*selectedField*/ 4 && t5_value !== (t5_value = (/*selectedField*/ ctx[33].method || `Provider unit: ${/*selectedField*/ ctx[33].unit}. No invented value is used for missing data.`) + "")) set_data(t5, t5_value);

			if (dirty[0] & /*valid, prefs*/ 67117056 | dirty[1] & /*selectedField*/ 4 && t7_value !== (t7_value = (nearestIndex$1(/*selectedField*/ ctx[33].ts, /*valid*/ ctx[13], 0) >= 0
			? timeLabel(/*selectedField*/ ctx[33].ts[nearestIndex$1(/*selectedField*/ ctx[33].ts, /*valid*/ ctx[13], 0)], /*prefs*/ ctx[26].local)
			: 'No matching time') + "")) set_data(t7, t7_value);

			if (dirty[1] & /*selectedField*/ 4 && t9_value !== (t9_value = /*selectedField*/ ctx[33].ts.length + "")) set_data(t9, t9_value);
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

// (88:29) {#each filtered as f}
function create_each_block_10(ctx) {
	let div;
	let button0;
	let span;
	let t0_value = /*f*/ ctx[94].label + "";
	let t0;
	let small;
	let t1_value = /*f*/ ctx[94].section + "";
	let t1;
	let t2;
	let t3_value = /*f*/ ctx[94].key + "";
	let t3;
	let strong;
	let t4_value = format(at(/*f*/ ctx[94], /*valid*/ ctx[13]), /*f*/ ctx[94].unit, /*prefs*/ ctx[26]) + "";
	let t4;
	let button1;
	let t5_value = (/*pins*/ ctx[11].includes(/*f*/ ctx[94].key) ? '★' : '☆') + "";
	let t5;
	let button1_aria_label_value;
	let mounted;
	let dispose;

	function click_handler_9() {
		return /*click_handler_9*/ ctx[74](/*f*/ ctx[94]);
	}

	function click_handler_10() {
		return /*click_handler_10*/ ctx[75](/*f*/ ctx[94]);
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
			attr(small, "class", "svelte-fyh19z");
			attr(span, "class", "svelte-fyh19z");
			attr(strong, "class", "svelte-fyh19z");
			attr(button0, "class", "field svelte-fyh19z");
			attr(button1, "title", "Pin or unpin parameter");
			attr(button1, "aria-label", button1_aria_label_value = `Pin ${/*f*/ ctx[94].label}`);
			attr(button1, "class", "svelte-fyh19z");
			toggle_class(button1, "pinned", /*pins*/ ctx[11].includes(/*f*/ ctx[94].key));
			attr(div, "class", "parameter svelte-fyh19z");
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
					listen(button0, "click", click_handler_9),
					listen(button1, "click", click_handler_10)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[1] & /*filtered*/ 16 && t0_value !== (t0_value = /*f*/ ctx[94].label + "")) set_data(t0, t0_value);
			if (dirty[1] & /*filtered*/ 16 && t1_value !== (t1_value = /*f*/ ctx[94].section + "")) set_data(t1, t1_value);
			if (dirty[1] & /*filtered*/ 16 && t3_value !== (t3_value = /*f*/ ctx[94].key + "")) set_data(t3, t3_value);
			if (dirty[0] & /*valid, prefs*/ 67117056 | dirty[1] & /*filtered*/ 16 && t4_value !== (t4_value = format(at(/*f*/ ctx[94], /*valid*/ ctx[13]), /*f*/ ctx[94].unit, /*prefs*/ ctx[26]) + "")) set_data(t4, t4_value);
			if (dirty[0] & /*pins*/ 2048 | dirty[1] & /*filtered*/ 16 && t5_value !== (t5_value = (/*pins*/ ctx[11].includes(/*f*/ ctx[94].key) ? '★' : '☆') + "")) set_data(t5, t5_value);

			if (dirty[1] & /*filtered*/ 16 && button1_aria_label_value !== (button1_aria_label_value = `Pin ${/*f*/ ctx[94].label}`)) {
				attr(button1, "aria-label", button1_aria_label_value);
			}

			if (dirty[0] & /*pins*/ 2048 | dirty[1] & /*filtered*/ 16) {
				toggle_class(button1, "pinned", /*pins*/ ctx[11].includes(/*f*/ ctx[94].key));
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

// (82:178) {#each c.entries as e}
function create_each_block_9(ctx) {
	let span;
	let small;
	let t0_value = (MODELS[/*e*/ ctx[103].model] || /*e*/ ctx[103].model) + "";
	let t0;
	let t1_value = format(/*e*/ ctx[103].value, describe(/*key*/ ctx[86]).unit, /*prefs*/ ctx[26]) + "";
	let t1;

	return {
		c() {
			span = element("span");
			small = element("small");
			t0 = text(t0_value);
			t1 = text(t1_value);
			attr(small, "class", "svelte-fyh19z");
			attr(span, "class", "svelte-fyh19z");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, small);
			append(small, t0);
			append(span, t1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*data, comparisons, valid*/ 16785536 && t0_value !== (t0_value = (MODELS[/*e*/ ctx[103].model] || /*e*/ ctx[103].model) + "")) set_data(t0, t0_value);
			if (dirty[0] & /*data, comparisons, valid, prefs*/ 83894400 && t1_value !== (t1_value = format(/*e*/ ctx[103].value, describe(/*key*/ ctx[86]).unit, /*prefs*/ ctx[26]) + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}
		}
	};
}

// (82:1) {#each ['temperature','wind','windGust','pressure'] as key}
function create_each_block_8(ctx) {
	let div1;
	let strong;
	let div0;
	let small;

	let t1_value = (/*c*/ ctx[100].entries.length < 2
	? 'At least two matching forecasts needed'
	: `Range across ${/*c*/ ctx[100].entries.length} sources: ${format(Math.min(.../*c*/ ctx[100].entries.map(func_3)), describe(/*key*/ ctx[86]).unit, /*prefs*/ ctx[26])} – ${format(Math.max(.../*c*/ ctx[100].entries.map(func_4)), describe(/*key*/ ctx[86]).unit, /*prefs*/ ctx[26])}`) + "";

	let t1;
	let each_value_9 = ensure_array_like(/*c*/ ctx[100].entries);
	let each_blocks = [];

	for (let i = 0; i < each_value_9.length; i += 1) {
		each_blocks[i] = create_each_block_9(get_each_context_9(ctx, each_value_9, i));
	}

	return {
		c() {
			div1 = element("div");
			strong = element("strong");
			strong.textContent = `${describe(/*key*/ ctx[86]).label}`;
			div0 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			small = element("small");
			t1 = text(t1_value);
			attr(strong, "class", "svelte-fyh19z");
			attr(div0, "class", "svelte-fyh19z");
			attr(small, "class", "svelte-fyh19z");
			attr(div1, "class", "comparison svelte-fyh19z");
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
			if (dirty[0] & /*data, comparisons, valid, prefs*/ 83894400) {
				each_value_9 = ensure_array_like(/*c*/ ctx[100].entries);
				let i;

				for (i = 0; i < each_value_9.length; i += 1) {
					const child_ctx = get_each_context_9(ctx, each_value_9, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_9(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div0, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_9.length;
			}

			if (dirty[0] & /*data, comparisons, valid, prefs*/ 83894400 && t1_value !== (t1_value = (/*c*/ ctx[100].entries.length < 2
			? 'At least two matching forecasts needed'
			: `Range across ${/*c*/ ctx[100].entries.length} sources: ${format(Math.min(.../*c*/ ctx[100].entries.map(func_3)), describe(/*key*/ ctx[86]).unit, /*prefs*/ ctx[26])} – ${format(Math.max(.../*c*/ ctx[100].entries.map(func_4)), describe(/*key*/ ctx[86]).unit, /*prefs*/ ctx[26])}`) + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div1);
			}

			destroy_each(each_blocks, detaching);
		}
	};
}

// (83:1) {#each comparisonErrors as err}
function create_each_block_7(ctx) {
	let p_1;
	let t_1_value = /*err*/ ctx[97] + "";
	let t_1;

	return {
		c() {
			p_1 = element("p");
			t_1 = text(t_1_value);
			attr(p_1, "class", "notice svelte-fyh19z");
		},
		m(target, anchor) {
			insert(target, p_1, anchor);
			append(p_1, t_1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*comparisonErrors*/ 33554432 && t_1_value !== (t_1_value = /*err*/ ctx[97] + "")) set_data(t_1, t_1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(p_1);
			}
		}
	};
}

// (76:26) {#each extra.filter(f=>f.group==='Profile diagnostics') as f}
function create_each_block_6(ctx) {
	let button;
	let small0;
	let t0_value = /*f*/ ctx[94].label + "";
	let t0;
	let strong;
	let t1_value = format(at(/*f*/ ctx[94], /*valid*/ ctx[13]), /*f*/ ctx[94].unit, /*prefs*/ ctx[26]) + "";
	let t1;
	let small1;
	let t2;
	let t3;
	let button_title_value;
	let mounted;
	let dispose;

	function click_handler_7() {
		return /*click_handler_7*/ ctx[69](/*f*/ ctx[94]);
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
			t3 = text(/*served*/ ctx[34]);
			attr(small0, "class", "svelte-fyh19z");
			attr(strong, "class", "svelte-fyh19z");
			attr(small1, "class", "svelte-fyh19z");
			attr(button, "title", button_title_value = /*f*/ ctx[94].method);
			attr(button, "class", "svelte-fyh19z");
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
				dispose = listen(button, "click", click_handler_7);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty[0] & /*extra*/ 65536 && t0_value !== (t0_value = /*f*/ ctx[94].label + "")) set_data(t0, t0_value);
			if (dirty[0] & /*extra, valid, prefs*/ 67182592 && t1_value !== (t1_value = format(at(/*f*/ ctx[94], /*valid*/ ctx[13]), /*f*/ ctx[94].unit, /*prefs*/ ctx[26]) + "")) set_data(t1, t1_value);
			if (dirty[1] & /*served*/ 8) set_data(t3, /*served*/ ctx[34]);

			if (dirty[0] & /*extra*/ 65536 && button_title_value !== (button_title_value = /*f*/ ctx[94].method)) {
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

// (78:1413) {:else}
function create_else_block_1$1(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = "This source did not return a temperature profile. Try another baseline explicitly.";
			attr(div, "class", "empty svelte-fyh19z");
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

// (78:1) {#if profile.length}
function create_if_block_9$1(ctx) {
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
	let each_value_5 = ensure_array_like([1000, 850, 700, 500, 300, 200, 100]);
	let each_blocks_2 = [];

	for (let i = 0; i < 7; i += 1) {
		each_blocks_2[i] = create_each_block_5(get_each_context_5(ctx, each_value_5, i));
	}

	let each_value_4 = ensure_array_like([-80, -60, -40, -20, 0, 20, 40]);
	let each_blocks_1 = [];

	for (let i = 0; i < 7; i += 1) {
		each_blocks_1[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
	}

	let each_value_2 = ensure_array_like(/*profile*/ ctx[28]);
	let each_blocks = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks[i] = create_each_block_2$2(get_each_context_2$2(ctx, each_value_2, i));
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
			p0.innerHTML = `<span class="amber svelte-fyh19z">Temperature</span> / <span class="mint svelte-fyh19z">Dew point</span> · °C vs log pressure (hPa)`;
			div1 = element("div");
			table = element("table");
			thead = element("thead");
			thead.innerHTML = `<tr class="svelte-fyh19z"><th class="svelte-fyh19z">hPa</th><th class="svelte-fyh19z">T</th><th class="svelte-fyh19z">Td</th><th class="svelte-fyh19z">RH</th><th class="svelte-fyh19z">Wind</th><th class="svelte-fyh19z">Direction</th><th class="svelte-fyh19z">Height</th></tr>`;
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
			attr(rect, "class", "svelte-fyh19z");
			attr(path0, "d", /*profilePath*/ ctx[48]('temp'));
			attr(path0, "fill", "none");
			attr(path0, "stroke", "#f4ba77");
			attr(path0, "stroke-width", "2.5");
			attr(path0, "class", "svelte-fyh19z");
			attr(path1, "d", /*profilePath*/ ctx[48]('dewPoint'));
			attr(path1, "fill", "none");
			attr(path1, "stroke", "#57d8be");
			attr(path1, "stroke-width", "2.5");
			attr(path1, "class", "svelte-fyh19z");
			attr(svg, "viewBox", "0 0 440 225");
			attr(svg, "role", "img");
			attr(svg, "aria-label", "Temperature and dew point versus pressure; not a Skew-T diagram");
			attr(svg, "class", "svelte-fyh19z");
			attr(p0, "class", "svelte-fyh19z");
			attr(div0, "class", "profile svelte-fyh19z");
			attr(thead, "class", "svelte-fyh19z");
			attr(tbody, "class", "svelte-fyh19z");
			attr(table, "class", "svelte-fyh19z");
			attr(div1, "class", "scroll-table svelte-fyh19z");
			attr(p1, "class", "footnote svelte-fyh19z");
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
				each_value_5 = ensure_array_like([1000, 850, 700, 500, 300, 200, 100]);
				let i;

				for (i = 0; i < 7; i += 1) {
					const child_ctx = get_each_context_5(ctx, each_value_5, i);

					if (each_blocks_2[i]) {
						each_blocks_2[i].p(child_ctx, dirty);
					} else {
						each_blocks_2[i] = create_each_block_5(child_ctx);
						each_blocks_2[i].c();
						each_blocks_2[i].m(svg, each0_anchor);
					}
				}

				for (; i < 7; i += 1) {
					each_blocks_2[i].d(1);
				}
			}

			if (dirty[0] & /*profile*/ 268435456 | dirty[1] & /*show*/ 65536) {
				each_value_2 = ensure_array_like(/*profile*/ ctx[28]);
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2$2(ctx, each_value_2, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_2$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(tbody, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_2.length;
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

// (78:218) {#each [1000,850,700,500,300,200,100] as p}
function create_each_block_5(ctx) {
	let line;
	let text_1;
	let t_1;

	return {
		c() {
			line = svg_element("line");
			text_1 = svg_element("text");
			t_1 = text(/*p*/ ctx[78]);
			attr(line, "x1", "44");
			attr(line, "x2", "400");
			attr(line, "y1", 20 + Math.log(/*p*/ ctx[78] / 100) / Math.log(10) * 180);
			attr(line, "y2", 20 + Math.log(/*p*/ ctx[78] / 100) / Math.log(10) * 180);
			attr(line, "stroke", "#253747");
			attr(line, "class", "svelte-fyh19z");
			attr(text_1, "x", "4");
			attr(text_1, "y", 24 + Math.log(/*p*/ ctx[78] / 100) / Math.log(10) * 180);
			attr(text_1, "class", "svelte-fyh19z");
		},
		m(target, anchor) {
			insert(target, line, anchor);
			insert(target, text_1, anchor);
			append(text_1, t_1);
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(line);
				detach(text_1);
			}
		}
	};
}

// (78:453) {#each [-80,-60,-40,-20,0,20,40] as t}
function create_each_block_4(ctx) {
	let line;
	let text_1;
	let t_1;

	return {
		c() {
			line = svg_element("line");
			text_1 = svg_element("text");
			t_1 = text(/*t*/ ctx[89]);
			attr(line, "x1", 44 + (/*t*/ ctx[89] + 80) / 120 * 356);
			attr(line, "x2", 44 + (/*t*/ ctx[89] + 80) / 120 * 356);
			attr(line, "y1", "20");
			attr(line, "y2", "200");
			attr(line, "stroke", "#253747");
			attr(line, "class", "svelte-fyh19z");
			attr(text_1, "x", 37 + (/*t*/ ctx[89] + 80) / 120 * 356);
			attr(text_1, "y", "219");
			attr(text_1, "class", "svelte-fyh19z");
		},
		m(target, anchor) {
			insert(target, line, anchor);
			insert(target, text_1, anchor);
			append(text_1, t_1);
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(line);
				detach(text_1);
			}
		}
	};
}

// (78:1105) {#each [`temp-${p}h`,`dewPoint-${p}h`,`rh-${p}h`,`wind-${p}h`,`windDir-${p}h`,`gh-${p}h`] as key}
function create_each_block_3(ctx) {
	let td;
	let t_1_value = /*show*/ ctx[47](/*key*/ ctx[86]) + "";
	let t_1;

	return {
		c() {
			td = element("td");
			t_1 = text(t_1_value);
			attr(td, "class", "svelte-fyh19z");
		},
		m(target, anchor) {
			insert(target, td, anchor);
			append(td, t_1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*profile*/ 268435456 && t_1_value !== (t_1_value = /*show*/ ctx[47](/*key*/ ctx[86]) + "")) set_data(t_1, t_1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(td);
			}
		}
	};
}

// (78:1069) {#each profile as p}
function create_each_block_2$2(ctx) {
	let tr;
	let th;
	let t_1_value = /*p*/ ctx[78] + "";
	let t_1;

	let each_value_3 = ensure_array_like([
		`temp-${/*p*/ ctx[78]}h`,
		`dewPoint-${/*p*/ ctx[78]}h`,
		`rh-${/*p*/ ctx[78]}h`,
		`wind-${/*p*/ ctx[78]}h`,
		`windDir-${/*p*/ ctx[78]}h`,
		`gh-${/*p*/ ctx[78]}h`
	]);

	let each_blocks = [];

	for (let i = 0; i < 6; i += 1) {
		each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
	}

	return {
		c() {
			tr = element("tr");
			th = element("th");
			t_1 = text(t_1_value);

			for (let i = 0; i < 6; i += 1) {
				each_blocks[i].c();
			}

			attr(th, "class", "svelte-fyh19z");
			attr(tr, "class", "svelte-fyh19z");
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
			if (dirty[0] & /*profile*/ 268435456 && t_1_value !== (t_1_value = /*p*/ ctx[78] + "")) set_data(t_1, t_1_value);

			if (dirty[0] & /*profile*/ 268435456 | dirty[1] & /*show*/ 65536) {
				each_value_3 = ensure_array_like([
					`temp-${/*p*/ ctx[78]}h`,
					`dewPoint-${/*p*/ ctx[78]}h`,
					`rh-${/*p*/ ctx[78]}h`,
					`wind-${/*p*/ ctx[78]}h`,
					`windDir-${/*p*/ ctx[78]}h`,
					`gh-${/*p*/ ctx[78]}h`
				]);

				let i;

				for (i = 0; i < 6; i += 1) {
					const child_ctx = get_each_context_3(ctx, each_value_3, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_3(child_ctx);
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

// (79:1) {#if hodo.length>=2}
function create_if_block_8$1(ctx) {
	let div;
	let svg;
	let line0;
	let line1;
	let polyline;
	let polyline_points_value;
	let each_value_1 = ensure_array_like([0.25, 0.5, 0.75, 1]);
	let each_blocks_1 = [];

	for (let i = 0; i < 4; i += 1) {
		each_blocks_1[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
	}

	let each_value = ensure_array_like(/*hodo*/ ctx[15]);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
	}

	return {
		c() {
			div = element("div");
			div.innerHTML = `<h2 class="svelte-fyh19z">Wind hodograph</h2><small class="svelte-fyh19z">u / v · m/s · above model terrain</small>`;
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

			attr(div, "class", "section-title svelte-fyh19z");
			attr(line0, "x1", "20");
			attr(line0, "y1", "120");
			attr(line0, "x2", "220");
			attr(line0, "y2", "120");
			attr(line0, "stroke", "#405363");
			attr(line0, "class", "svelte-fyh19z");
			attr(line1, "x1", "120");
			attr(line1, "y1", "20");
			attr(line1, "x2", "120");
			attr(line1, "y2", "220");
			attr(line1, "stroke", "#405363");
			attr(line1, "class", "svelte-fyh19z");
			attr(polyline, "points", polyline_points_value = /*hodo*/ ctx[15].map(/*func_2*/ ctx[70]).join(' '));
			attr(polyline, "fill", "none");
			attr(polyline, "stroke", "#69ddc3");
			attr(polyline, "stroke-width", "2");
			attr(polyline, "class", "svelte-fyh19z");
			attr(svg, "class", "hodograph svelte-fyh19z");
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
			if (dirty[1] & /*hodoScale*/ 1) {
				each_value_1 = ensure_array_like([0.25, 0.5, 0.75, 1]);
				let i;

				for (i = 0; i < 4; i += 1) {
					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_1$2(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(svg, polyline);
					}
				}

				for (; i < 4; i += 1) {
					each_blocks_1[i].d(1);
				}
			}

			if (dirty[0] & /*hodo*/ 32768 | dirty[1] & /*hodoScale*/ 1 && polyline_points_value !== (polyline_points_value = /*hodo*/ ctx[15].map(/*func_2*/ ctx[70]).join(' '))) {
				attr(polyline, "points", polyline_points_value);
			}

			if (dirty[0] & /*hodo*/ 32768 | dirty[1] & /*hodoScale*/ 1) {
				each_value = ensure_array_like(/*hodo*/ ctx[15]);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(svg, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
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

// (79:348) {#each [0.25,0.5,0.75,1] as r}
function create_each_block_1$2(ctx) {
	let circle;
	let text_1;
	let t_1_value = Math.round(/*hodoScale*/ ctx[31] * /*r*/ ctx[81]) + "";
	let t_1;

	return {
		c() {
			circle = svg_element("circle");
			text_1 = svg_element("text");
			t_1 = text(t_1_value);
			attr(circle, "cx", "120");
			attr(circle, "cy", "120");
			attr(circle, "r", /*r*/ ctx[81] * 100);
			attr(circle, "fill", "none");
			attr(circle, "stroke", "#293a48");
			attr(circle, "class", "svelte-fyh19z");
			attr(text_1, "x", "123");
			attr(text_1, "y", 120 - /*r*/ ctx[81] * 100 + 10);
			attr(text_1, "class", "svelte-fyh19z");
		},
		m(target, anchor) {
			insert(target, circle, anchor);
			insert(target, text_1, anchor);
			append(text_1, t_1);
		},
		p(ctx, dirty) {
			if (dirty[1] & /*hodoScale*/ 1 && t_1_value !== (t_1_value = Math.round(/*hodoScale*/ ctx[31] * /*r*/ ctx[81]) + "")) set_data(t_1, t_1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(circle);
				detach(text_1);
			}
		}
	};
}

// (79:659) {#each hodo as p}
function create_each_block$2(ctx) {
	let circle;
	let title;
	let t0_value = /*p*/ ctx[78].p + "";
	let t0;
	let t1;
	let t2_value = /*p*/ ctx[78].wind + "";
	let t2;
	let t3;
	let t4_value = /*p*/ ctx[78].dir + "";
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
			attr(title, "class", "svelte-fyh19z");
			attr(circle, "cx", circle_cx_value = 120 + /*p*/ ctx[78].u / /*hodoScale*/ ctx[31] * 100);
			attr(circle, "cy", circle_cy_value = 120 - /*p*/ ctx[78].v / /*hodoScale*/ ctx[31] * 100);
			attr(circle, "r", "2");
			attr(circle, "fill", "#f4ba77");
			attr(circle, "class", "svelte-fyh19z");
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
			if (dirty[0] & /*hodo*/ 32768 && t0_value !== (t0_value = /*p*/ ctx[78].p + "")) set_data(t0, t0_value);
			if (dirty[0] & /*hodo*/ 32768 && t2_value !== (t2_value = /*p*/ ctx[78].wind + "")) set_data(t2, t2_value);
			if (dirty[0] & /*hodo*/ 32768 && t4_value !== (t4_value = /*p*/ ctx[78].dir + "")) set_data(t4, t4_value);

			if (dirty[0] & /*hodo*/ 32768 | dirty[1] & /*hodoScale*/ 1 && circle_cx_value !== (circle_cx_value = 120 + /*p*/ ctx[78].u / /*hodoScale*/ ctx[31] * 100)) {
				attr(circle, "cx", circle_cx_value);
			}

			if (dirty[0] & /*hodo*/ 32768 | dirty[1] & /*hodoScale*/ 1 && circle_cy_value !== (circle_cy_value = 120 - /*p*/ ctx[78].v / /*hodoScale*/ ctx[31] * 100)) {
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

// (58:134) {:else}
function create_else_block$2(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.innerHTML = `<h2 class="svelte-fyh19z">Wintry Forecast</h2><p class="svelte-fyh19z">Integrated ECMWF snowline, precipitation type, estimated new snow, 144-hour forecast, sounding and optional map contours. Open the live Windy plugin to use these tools.</p>`;
			attr(div, "class", "empty svelte-fyh19z");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

// (58:22) {#if winterComponent}
function create_if_block_1$3(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	var switch_value = /*winterComponent*/ ctx[5];

	function switch_props(ctx, dirty) {
		return {
			props: {
				location: /*location*/ ctx[0],
				placeName: /*placeName*/ ctx[4],
				units: /*prefs*/ ctx[26].winterUnits
			}
		};
	}

	if (switch_value) {
		switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m(target, anchor) {
			if (switch_instance) mount_component(switch_instance, target, anchor);
			insert(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty[0] & /*winterComponent*/ 32 && switch_value !== (switch_value = /*winterComponent*/ ctx[5])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				const switch_instance_changes = {};
				if (dirty[0] & /*location*/ 1) switch_instance_changes.location = /*location*/ ctx[0];
				if (dirty[0] & /*placeName*/ 16) switch_instance_changes.placeName = /*placeName*/ ctx[4];
				if (dirty[0] & /*prefs*/ 67108864) switch_instance_changes.units = /*prefs*/ ctx[26].winterUnits;
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) {
				detach(switch_instance_anchor);
			}

			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

function create_fragment$4(ctx) {
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
	let t9_value = (/*isFavorite*/ ctx[29] ? '★ Saved' : '☆ Save point') + "";
	let t9;
	let button1_disabled_value;
	let t10;
	let t11;
	let div4;
	let button2;
	let t12;
	let button2_disabled_value;
	let button3;
	let t13;
	let t14_value = (/*detailsOpen*/ ctx[22] ? '−' : '+') + "";
	let t14;
	let t15;
	let t16;
	let t17;
	let t18;
	let current_block_type_index;
	let if_block7;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*demo*/ ctx[2] && create_if_block_25();
	let if_block1 = /*placeName*/ ctx[4] && create_if_block_24(ctx);
	let if_block2 = /*favorites*/ ctx[12].length && create_if_block_23$1(ctx);

	function select_block_type(ctx, dirty) {
		if (/*view*/ ctx[20] === 'Winter') return create_if_block_22$1;
		return create_else_block_3$1;
	}

	let current_block_type = select_block_type(ctx);
	let if_block3 = current_block_type(ctx);
	let if_block4 = /*settings*/ ctx[21] && create_if_block_21$1(ctx);
	let if_block5 = /*view*/ ctx[20] !== 'Brief' && create_if_block_20$1(ctx);
	let if_block6 = /*detailsOpen*/ ctx[22] && create_if_block_19$1(ctx);

	const if_block_creators = [
		create_if_block$3,
		create_if_block_2$3,
		create_if_block_3$3,
		create_if_block_4$3,
		create_else_block_2$1
	];

	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (/*view*/ ctx[20] === 'Winter') return 0;
		if (/*busy*/ ctx[18]) return 1;
		if (/*error*/ ctx[19]) return 2;
		if (/*data*/ ctx[7]) return 3;
		return 4;
	}

	current_block_type_index = select_block_type_1(ctx);
	if_block7 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			section = element("section");
			header = element("header");
			div1 = element("div");
			div1.innerHTML = `<span class="mark svelte-fyh19z">◉</span><div class="svelte-fyh19z"><h1 class="svelte-fyh19z">WeatherScope<span class="svelte-fyh19z">FORECAST DESK</span></h1><p class="svelte-fyh19z">Every detail. One clear forecast.</p></div>`;
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
			if_block3.c();
			button2 = element("button");
			t12 = text("↻ Refresh");
			button3 = element("button");
			t13 = text("Details ");
			t14 = text(t14_value);
			t15 = space();
			if (if_block4) if_block4.c();
			t16 = space();
			if (if_block5) if_block5.c();
			t17 = space();
			if (if_block6) if_block6.c();
			t18 = space();
			if_block7.c();
			attr(div1, "class", "brand svelte-fyh19z");
			attr(button0, "class", "icon svelte-fyh19z");
			attr(button0, "aria-label", "Settings");
			attr(button0, "title", "Settings");
			attr(header, "class", "svelte-fyh19z");
			attr(small, "class", "svelte-fyh19z");
			attr(strong, "class", "svelte-fyh19z");
			attr(div2, "class", "svelte-fyh19z");
			button1.disabled = button1_disabled_value = !/*location*/ ctx[0];
			attr(button1, "title", "Save or remove favorite");
			attr(button1, "aria-pressed", /*isFavorite*/ ctx[29]);
			attr(button1, "class", "svelte-fyh19z");
			toggle_class(button1, "saved", /*isFavorite*/ ctx[29]);
			attr(div3, "class", "location svelte-fyh19z");
			button2.disabled = button2_disabled_value = /*busy*/ ctx[18] || !/*location*/ ctx[0] || /*view*/ ctx[20] === 'Winter';
			attr(button2, "class", "svelte-fyh19z");
			attr(button3, "aria-expanded", /*detailsOpen*/ ctx[22]);
			attr(button3, "class", "svelte-fyh19z");
			attr(div4, "class", "source svelte-fyh19z");
			attr(section, "class", "weatherscope aurora svelte-fyh19z");
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
			if_block3.m(div4, null);
			append(div4, button2);
			append(button2, t12);
			append(div4, button3);
			append(button3, t13);
			append(button3, t14);
			append(section, t15);
			if (if_block4) if_block4.m(section, null);
			append(section, t16);
			if (if_block5) if_block5.m(section, null);
			append(section, t17);
			if (if_block6) if_block6.m(section, null);
			append(section, t18);
			if_blocks[current_block_type_index].m(section, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(button0, "click", /*click_handler*/ ctx[53]),
					listen(button1, "click", /*favorite*/ ctx[44]),
					listen(button2, "click", /*click_handler_2*/ ctx[56]),
					listen(button3, "click", /*click_handler_3*/ ctx[57])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (/*demo*/ ctx[2]) {
				if (if_block0) ; else {
					if_block0 = create_if_block_25();
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
					if_block1 = create_if_block_24(ctx);
					if_block1.c();
					if_block1.m(div2, strong);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if ((!current || dirty[0] & /*location*/ 1) && t8_value !== (t8_value = (/*location*/ ctx[0]
			? `${/*location*/ ctx[0].lat.toFixed(3)}°, ${/*location*/ ctx[0].lon.toFixed(3)}°`
			: 'Click a location on Windy') + "")) set_data(t8, t8_value);

			if ((!current || dirty[0] & /*isFavorite*/ 536870912) && t9_value !== (t9_value = (/*isFavorite*/ ctx[29] ? '★ Saved' : '☆ Save point') + "")) set_data(t9, t9_value);

			if (!current || dirty[0] & /*location*/ 1 && button1_disabled_value !== (button1_disabled_value = !/*location*/ ctx[0])) {
				button1.disabled = button1_disabled_value;
			}

			if (!current || dirty[0] & /*isFavorite*/ 536870912) {
				attr(button1, "aria-pressed", /*isFavorite*/ ctx[29]);
			}

			if (!current || dirty[0] & /*isFavorite*/ 536870912) {
				toggle_class(button1, "saved", /*isFavorite*/ ctx[29]);
			}

			if (/*favorites*/ ctx[12].length) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_23$1(ctx);
					if_block2.c();
					if_block2.m(section, t11);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block3) {
				if_block3.p(ctx, dirty);
			} else {
				if_block3.d(1);
				if_block3 = current_block_type(ctx);

				if (if_block3) {
					if_block3.c();
					if_block3.m(div4, button2);
				}
			}

			if (!current || dirty[0] & /*busy, location, view*/ 1310721 && button2_disabled_value !== (button2_disabled_value = /*busy*/ ctx[18] || !/*location*/ ctx[0] || /*view*/ ctx[20] === 'Winter')) {
				button2.disabled = button2_disabled_value;
			}

			if ((!current || dirty[0] & /*detailsOpen*/ 4194304) && t14_value !== (t14_value = (/*detailsOpen*/ ctx[22] ? '−' : '+') + "")) set_data(t14, t14_value);

			if (!current || dirty[0] & /*detailsOpen*/ 4194304) {
				attr(button3, "aria-expanded", /*detailsOpen*/ ctx[22]);
			}

			if (/*settings*/ ctx[21]) {
				if (if_block4) {
					if_block4.p(ctx, dirty);
				} else {
					if_block4 = create_if_block_21$1(ctx);
					if_block4.c();
					if_block4.m(section, t16);
				}
			} else if (if_block4) {
				if_block4.d(1);
				if_block4 = null;
			}

			if (/*view*/ ctx[20] !== 'Brief') {
				if (if_block5) {
					if_block5.p(ctx, dirty);
				} else {
					if_block5 = create_if_block_20$1(ctx);
					if_block5.c();
					if_block5.m(section, t17);
				}
			} else if (if_block5) {
				if_block5.d(1);
				if_block5 = null;
			}

			if (/*detailsOpen*/ ctx[22]) {
				if (if_block6) {
					if_block6.p(ctx, dirty);
				} else {
					if_block6 = create_if_block_19$1(ctx);
					if_block6.c();
					if_block6.m(section, t18);
				}
			} else if (if_block6) {
				if_block6.d(1);
				if_block6 = null;
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_1(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block7 = if_blocks[current_block_type_index];

				if (!if_block7) {
					if_block7 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block7.c();
				} else {
					if_block7.p(ctx, dirty);
				}

				transition_in(if_block7, 1);
				if_block7.m(section, null);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block7);
			current = true;
		},
		o(local) {
			transition_out(if_block7);
			current = false;
		},
		d(detaching) {
			if (detaching) {
				detach(section);
			}

			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if_block3.d();
			if (if_block4) if_block4.d();
			if (if_block5) if_block5.d();
			if (if_block6) if_block6.d();
			if_blocks[current_block_type_index].d();
			mounted = false;
			run_all(dispose);
		}
	};
}

const func_1 = f => f.group === 'Profile diagnostics';
const func_3 = e => e.value;
const func_4 = e => e.value;

function instance$4($$self, $$props, $$invalidate) {
	let index;
	let valid;
	let extra;
	let fields;
	let groups;
	let filtered;
	let served;
	let selectedField;
	let profile;
	let health;
	let profileRows;
	let hodo;
	let hodoScale;
	let coverage;
	let isFavorite;

	let { location = null, timestamp = Date.now(), load, onLocation = () => {
		
	}, onTime = () => {
		
	}, demo = false, mapModel = null, placeName = '', winterComponent = null } = $$props;

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
		detailsOpen = false,
		compareBusy = false,
		comparisons = [],
		comparisonErrors = [],
		compareRequest = 0;

	let prefs = {
			temp: 'C',
			wind: 'kt',
			local: false,
			winterUnits: 'metric'
		},
		pins = ['temperature', 'dewPoint', 'wind', 'windGust', 'pressure', 'precipAmount'],
		favorites = [],
		thresholds = { gust: 15, rain: 2 };

	try {
		const saved = JSON.parse(localStorage.getItem('weatherscope-v1') || '{}');
		prefs = { ...prefs, ...saved.prefs };
		if (MODELS[saved.model]) model = saved.model;
		if (saved.thresholds && finite(saved.thresholds.gust) && saved.thresholds.gust > 0 && finite(saved.thresholds.rain) && saved.thresholds.rain > 0) thresholds = saved.thresholds;
		if (Array.isArray(saved.pins)) pins = saved.pins.filter(v => typeof v === 'string').slice(0, 12);
		if (Array.isArray(saved.favorites)) favorites = saved.favorites.filter(p => finite(p.lat) && finite(p.lon) && Math.abs(p.lat) <= 90 && Math.abs(p.lon) <= 180).slice(0, 30);
	} catch {
		
	}

	try {
		const old = JSON.parse(localStorage.getItem('snowline:favourites:v1') || '[]');

		if (!JSON.parse(localStorage.getItem('weatherscope-v1') || '{}').winterImported && Array.isArray(old)) for (const p of old) {
			const lat = Number(p.lat), lon = Number(p.lon);

			if (finite(lat) && finite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180 && !favorites.some(f => Math.abs(f.lat - lat) < .0001 && Math.abs(f.lon - lon) < .0001)) {
				favorites = [
					...favorites,
					{
						lat,
						lon,
						name: [p.primary, p.secondary].filter(Boolean).join(', ')
					}
				].slice(0, 30);
			}
		}
	} catch {
		
	}

	const save = () => {
		try {
			localStorage.setItem('weatherscope-v1', JSON.stringify({
				prefs,
				pins,
				favorites,
				model,
				thresholds,
				winterImported: true
			}));
		} catch {
			
		}
	};

	save();

	async function refresh(loc, source, force = false) {
		const token = ++request;
		compareRequest++;
		$$invalidate(23, compareBusy = false);
		$$invalidate(18, busy = true);
		$$invalidate(19, error = '');
		$$invalidate(7, data = null);
		$$invalidate(10, selected = null);
		$$invalidate(24, comparisons = []);
		$$invalidate(25, comparisonErrors = []);

		try {
			const result = await load(source, loc, force);
			if (token === request) $$invalidate(7, data = result);
		} catch(e) {
			if (token === request) $$invalidate(19, error = e?.message || 'Forecast unavailable. Try again.');
		} finally {
			if (token === request) $$invalidate(18, busy = false);
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
		$$invalidate(10, selected = (fields.find(f => f.key === key) || {}).id || null);
		$$invalidate(20, view = 'Parameters');
		$$invalidate(22, detailsOpen = true);
		$$invalidate(8, search = key);
		$$invalidate(9, group = 'All');
	}

	function chooseTime(t) {
		$$invalidate(49, timestamp = t);
		onTime(t);
	}

	function shortcut(hours) {
		const t = Date.now() + hours * HOUR$1;
		const i = data ? nearestIndex$1(data.ts, t, Infinity) : -1;
		if (i >= 0) chooseTime(data.ts[i]);
	}

	function switchView(name) {
		if (!name) return;
		$$invalidate(20, view = name);
		if (name === 'Compare' && !comparisons.length && !compareBusy && data) compareModels();
	}

	function favorite() {
		if (!location) return;
		const same = p => Math.abs(p.lat - location.lat) < 0.0001 && Math.abs(p.lon - location.lon) < 0.0001;

		$$invalidate(12, favorites = favorites.some(same)
		? favorites.filter(p => !same(p))
		: [...favorites.slice(-29), { ...location, name: placeName || '' }]);

		save();
	}

	async function compareModels() {
		const token = ++compareRequest;
		$$invalidate(23, compareBusy = true);
		$$invalidate(25, comparisonErrors = []);
		const loc = { ...location };
		const source = model;
		const results = await Promise.allSettled(Object.keys(MODELS).filter(m => m !== source).map(async m => ({ m, data: await load(m, loc) })));
		if (token !== compareRequest) return;
		$$invalidate(24, comparisons = results.filter(r => r.status === 'fulfilled').map(r => r.value.data));

		$$invalidate(25, comparisonErrors = results.flatMap((r, i) => r.status === 'rejected'
		? [
				`${Object.keys(MODELS).filter(m => m !== source)[i]}: ${r.reason?.message || 'Unavailable'}`
			]
		: []));

		$$invalidate(23, compareBusy = false);
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

	const click_handler = () => $$invalidate(21, settings = !settings);
	const click_handler_1 = place => onLocation({ lat: place.lat, lon: place.lon });

	function select_change_handler() {
		model = select_value(this);
		$$invalidate(6, model);
	}

	const click_handler_2 = () => refresh(location, model, true);
	const click_handler_3 = () => $$invalidate(22, detailsOpen = !detailsOpen);

	function select0_change_handler() {
		prefs.winterUnits = select_value(this);
		$$invalidate(26, prefs);
	}

	function select1_change_handler() {
		prefs.temp = select_value(this);
		$$invalidate(26, prefs);
	}

	function select2_change_handler() {
		prefs.wind = select_value(this);
		$$invalidate(26, prefs);
	}

	function input0_change_handler() {
		prefs.local = this.checked;
		$$invalidate(26, prefs);
	}

	function input1_input_handler() {
		thresholds.gust = to_number(this.value);
		$$invalidate(27, thresholds);
	}

	function input2_input_handler() {
		thresholds.rain = to_number(this.value);
		$$invalidate(27, thresholds);
	}

	const click_handler_4 = () => switchView('Brief');
	const change_handler = e => switchView(e.currentTarget.value);
	const click_handler_5 = () => refresh(location, model, true);
	const click_handler_6 = h => shortcut(h);

	const func = () => {
		$$invalidate(22, detailsOpen = true);
		switchView('Winter');
	};

	const click_handler_7 = f => inspect(f.key);
	const func_2 = p => [120 + p.u / hodoScale * 100, 120 - p.v / hodoScale * 100].join(',');

	function input_input_handler() {
		search = this.value;
		$$invalidate(8, search);
	}

	function select_change_handler_1() {
		group = select_value(this);
		$$invalidate(9, group);
		(((((($$invalidate(36, groups), $$invalidate(14, fields)), $$invalidate(7, data)), $$invalidate(16, extra)), $$invalidate(13, valid)), $$invalidate(17, index)), $$invalidate(49, timestamp));
	}

	const click_handler_8 = () => $$invalidate(10, selected = null);
	const click_handler_9 = f => $$invalidate(10, selected = f.id);
	const click_handler_10 = f => pin(f.key);

	$$self.$$set = $$props => {
		if ('location' in $$props) $$invalidate(0, location = $$props.location);
		if ('timestamp' in $$props) $$invalidate(49, timestamp = $$props.timestamp);
		if ('load' in $$props) $$invalidate(50, load = $$props.load);
		if ('onLocation' in $$props) $$invalidate(1, onLocation = $$props.onLocation);
		if ('onTime' in $$props) $$invalidate(51, onTime = $$props.onTime);
		if ('demo' in $$props) $$invalidate(2, demo = $$props.demo);
		if ('mapModel' in $$props) $$invalidate(3, mapModel = $$props.mapModel);
		if ('placeName' in $$props) $$invalidate(4, placeName = $$props.placeName);
		if ('winterComponent' in $$props) $$invalidate(5, winterComponent = $$props.winterComponent);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*location, model*/ 65) {
			if (location && model) refresh(location, model);
		}

		if ($$self.$$.dirty[0] & /*data*/ 128 | $$self.$$.dirty[1] & /*timestamp*/ 262144) {
			$$invalidate(17, index = data ? nearestIndex$1(data.ts, timestamp) : -1);
		}

		if ($$self.$$.dirty[0] & /*index, data*/ 131200 | $$self.$$.dirty[1] & /*timestamp*/ 262144) {
			$$invalidate(13, valid = index >= 0 ? data.ts[index] : timestamp);
		}

		if ($$self.$$.dirty[0] & /*data, valid*/ 8320) {
			$$invalidate(16, extra = data
			? [...derived(data, valid), ...diagnostics(data, valid)]
			: []);
		}

		if ($$self.$$.dirty[0] & /*data, extra*/ 65664) {
			$$invalidate(14, fields = data ? [...data.fields, ...extra] : []);
		}

		if ($$self.$$.dirty[0] & /*fields*/ 16384) {
			$$invalidate(36, groups = ['All', ...new Set(fields.map(f => f.group))]);
		}

		if ($$self.$$.dirty[0] & /*fields, group, search, pins*/ 19200) {
			$$invalidate(35, filtered = fields.filter(f => (group === 'All' || f.group === group) && `${f.label} ${f.key} ${f.section}`.toLowerCase().includes(search.toLowerCase())).sort((a, b) => Number(pins.includes(b.key)) - Number(pins.includes(a.key))));
		}

		if ($$self.$$.dirty[0] & /*data, model*/ 192) {
			$$invalidate(34, served = data ? MODELS[data.model] || data.model : MODELS[model]);
		}

		if ($$self.$$.dirty[0] & /*selected, fields*/ 17408) {
			$$invalidate(33, selectedField = selected ? fields.find(f => f.id === selected) : null);
		}

		if ($$self.$$.dirty[0] & /*data*/ 128) {
			$$invalidate(28, profile = data
			? [
					...new Set(data.fields.map(f => f.key.match(/^temp-(\d+)h$/)?.[1]).filter(Boolean))
				].map(Number).sort((a, b) => b - a)
			: []);
		}

		if ($$self.$$.dirty[0] & /*data, valid*/ 8320) {
			$$invalidate(32, health = data ? sourceHealth(data, valid) : null);
		}

		if ($$self.$$.dirty[0] & /*data, valid*/ 8320) {
			$$invalidate(52, profileRows = data ? verticalProfile(data, valid) : []);
		}

		if ($$self.$$.dirty[1] & /*profileRows*/ 2097152) {
			$$invalidate(15, hodo = profileRows.filter(p => p.belowGround === false).map(p => ({ ...p, ...windComponents(p.wind, p.dir) })).filter(p => finite(p.u) && finite(p.v)));
		}

		if ($$self.$$.dirty[0] & /*hodo*/ 32768) {
			$$invalidate(31, hodoScale = Math.max(20, ...hodo.map(p => Math.max(Math.abs(p.u), Math.abs(p.v)))) * 1.1);
		}

		if ($$self.$$.dirty[0] & /*fields, valid*/ 24576) {
			$$invalidate(30, coverage = requirements.map(([label, key, note]) => ({
				label,
				key,
				note,
				available: !!(key && fields.some(f => f.key === key && finite(at(f, valid))))
			})));
		}

		if ($$self.$$.dirty[0] & /*location, favorites*/ 4097) {
			$$invalidate(29, isFavorite = !!location && favorites.some(p => Math.abs(p.lat - location.lat) < 0.0001 && Math.abs(p.lon - location.lon) < 0.0001));
		}
	};

	return [
		location,
		onLocation,
		demo,
		mapModel,
		placeName,
		winterComponent,
		model,
		data,
		search,
		group,
		selected,
		pins,
		favorites,
		valid,
		fields,
		hodo,
		extra,
		index,
		busy,
		error,
		view,
		settings,
		detailsOpen,
		compareBusy,
		comparisons,
		comparisonErrors,
		prefs,
		thresholds,
		profile,
		isFavorite,
		coverage,
		hodoScale,
		health,
		selectedField,
		served,
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
		profilePath,
		timestamp,
		load,
		onTime,
		profileRows,
		click_handler,
		click_handler_1,
		select_change_handler,
		click_handler_2,
		click_handler_3,
		select0_change_handler,
		select1_change_handler,
		select2_change_handler,
		input0_change_handler,
		input1_input_handler,
		input2_input_handler,
		click_handler_4,
		change_handler,
		click_handler_5,
		click_handler_6,
		func,
		click_handler_7,
		func_2,
		input_input_handler,
		select_change_handler_1,
		click_handler_8,
		click_handler_9,
		click_handler_10
	];
}

class App extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$4,
			create_fragment$4,
			safe_not_equal,
			{
				location: 0,
				timestamp: 49,
				load: 50,
				onLocation: 1,
				onTime: 51,
				demo: 2,
				mapModel: 3,
				placeName: 4,
				winterComponent: 5
			},
			add_css$3,
			[-1, -1, -1, -1, -1]
		);
	}
}

const PRESSURE_LEVELS = [
    '1000h',
    '950h',
    '925h',
    '900h',
    '850h',
    '800h',
    '700h',
    '600h',
    '500h',
    '400h',
    '300h',
    '250h',
    '200h',
    '150h'
];
const DEFAULT_COLD_COLUMN_LAPSE_C_PER_M = -6e-3;
const MIN_COLD_COLUMN_GRADIENT_C_PER_M = -0.012;
const MAX_COLD_COLUMN_GRADIENT_C_PER_M = -1e-3;
/** Magnus saturation vapour pressure, hPa. */ function saturationVapourPressure$1(tempC) {
    return 6.112 * Math.exp(17.67 * tempC / (tempC + 243.5));
}
/**
 * Pressure-aware wet-bulb temperature from dry-bulb T, dew point Td and pressure.
 *
 * Solves the ventilated-psychrometer relation:
 * e(Td) = es(Tw) - A(Tw) * p * (T - Tw)
 *
 * using bisection between Td and T.
 */ function wetBulbFromDewpoint(tempC, dewpointC, pressureHpa) {
    const td = Math.min(tempC, dewpointC);
    const e = saturationVapourPressure$1(td);
    const f = (tw)=>{
        const A = 0.00066 * (1 + 0.00115 * tw);
        return saturationVapourPressure$1(tw) - A * pressureHpa * (tempC - tw) - e;
    };
    let lo = Math.min(td, tempC);
    let hi = Math.max(td, tempC);
    // In saturated air Tw ~= T.
    if (Math.abs(hi - lo) < 1e-6) return tempC;
    let flo = f(lo);
    let fhi = f(hi);
    // Defensive fallback if numerical bracketing is imperfect.
    if (!(flo <= 0 && fhi >= 0)) {
        lo = Math.min(td - 15, tempC - 30);
        hi = tempC;
        flo = f(lo);
        fhi = f(hi);
    }
    for(let n = 0; n < 60; n++){
        const mid = 0.5 * (lo + hi);
        const fm = f(mid);
        if (Math.abs(fm) < 1e-5) return mid;
        if (fm > 0) {
            hi = mid;
        } else {
            lo = mid;
        }
    }
    return 0.5 * (lo + hi);
}
/**
 * Keep the operational snowline field continuous when every resolved level is
 * already below 0 C wet-bulb temperature. The physical result is still
 * "below the lowest resolved level"; this finite value is a bounded downward
 * extrapolation for mapping, interpolation and terrain comparisons.
 */ function coldColumnSnowLevel(profile) {
    const lowest = profile[0];
    let gradient = DEFAULT_COLD_COLUMN_LAPSE_C_PER_M;
    for(let i = 1; i < profile.length; i++){
        const dz = profile[i].heightM - lowest.heightM;
        if (dz <= 50) continue;
        const candidate = (profile[i].wetBulbC - lowest.wetBulbC) / dz;
        if (Number.isFinite(candidate) && candidate >= MIN_COLD_COLUMN_GRADIENT_C_PER_M && candidate <= MAX_COLD_COLUMN_GRADIENT_C_PER_M) {
            gradient = candidate;
            break;
        }
    }
    const rawDz = (0 - lowest.wetBulbC) / gradient;
    const dz = Math.max(-4e3, Math.min(-1, rawDz));
    return lowest.heightM + dz;
}
/** Atmospheric WBZ estimate, retained for comparison with local map terrain.
 * A crossing below local terrain is a model-profile diagnostic, not local air.
 */ function wetBulbZeroHeight(profile) {
    const p = profile.filter((v)=>Number.isFinite(v.heightM) && Number.isFinite(v.wetBulbC)).sort((a, b)=>a.heightM - b.heightM);
    if (!p.length) return {
        snowLevelM: null,
        status: 'insufficient-profile'
    };
    if (p[0].wetBulbC === 0) {
        return {
            snowLevelM: p[0].heightM,
            status: 'resolved',
            lower: p[0],
            upper: p[0]
        };
    }
    // In an already-cold lowest level the true WBZ is below the resolved
    // profile. Retain that status, but provide a bounded operational estimate so
    // the map, chart and terrain comparison do not develop artificial gaps.
    if (p[0].wetBulbC < 0) {
        return {
            snowLevelM: coldColumnSnowLevel(p),
            status: 'below-lowest-level',
            upperBoundM: p[0].heightM,
            belowLowestLevel: true,
            extrapolated: true
        };
    }
    if (p.length < 2) return {
        snowLevelM: null,
        status: 'insufficient-profile'
    };
    for(let i = 0; i < p.length - 1; i++){
        const lower = p[i];
        const upper = p[i + 1];
        if (upper.heightM > lower.heightM && lower.wetBulbC > 0 && upper.wetBulbC <= 0) {
            const fraction = (0 - lower.wetBulbC) / (upper.wetBulbC - lower.wetBulbC);
            return {
                snowLevelM: lower.heightM + fraction * (upper.heightM - lower.heightM),
                lower,
                upper,
                belowLowestLevel: false,
                status: 'resolved'
            };
        }
    }
    return {
        snowLevelM: null,
        status: 'no-crossing'
    };
}
function buildProfile(data, timeIndex) {
    const profile = [];
    for (const level of PRESSURE_LEVELS){
        const t = valueAt(data[`temp-${level}`], timeIndex);
        const td = valueAt(data[`dewpoint-${level}`], timeIndex);
        const gh = valueAt(data[`gh-${level}`], timeIndex);
        if (t === null || td === null || gh === null) continue;
        const tempC = t > 150 ? t - 273.15 : t;
        const dewpointC = td > 150 ? td - 273.15 : td;
        const pressureHpa = Number(level.replace('h', ''));
        /*
     * Windy's meteogram `gh-*` values are geopotential HEIGHT.
     * Live values are on the normal metre scale (e.g. ~4 km at 600 hPa),
     * so do NOT divide by g.
     */ const heightM = gh;
        profile.push({
            level,
            pressureHpa,
            heightM,
            tempC,
            dewpointC,
            wetBulbC: wetBulbFromDewpoint(tempC, dewpointC, pressureHpa)
        });
    }
    return profile.sort((a, b)=>a.heightM - b.heightM);
}
/** Accept Arrays, TypedArrays, generic array-like values and scalars. */ function valueAt(value, i) {
    if (value == null) return null;
    let x;
    if (Array.isArray(value)) {
        x = value[i];
    } else if (ArrayBuffer.isView(value)) {
        x = value[i];
    } else if (typeof value === 'object' && 'length' in value) {
        x = value[i];
    } else if (typeof value === 'number' && i === 0) {
        x = value;
    } else {
        return null;
    }
    if (typeof x === 'number' && Number.isFinite(x)) return x;
    if (typeof x === 'string' && x.trim() !== '') {
        const n = Number(x);
        if (Number.isFinite(n)) return n;
    }
    return null;
}

/**
 * Windy's precipitation feed used by this plugin is normalized onto a 3-hour
 * accumulation-equivalent basis internally. Prefer the explicit past-3-hour field and
 * keep the returned value as a 3-hour-equivalent amount rather than presenting
 * it internally as an hourly rate.
 */ const EXACT_KEYS = [
    'past3hprecip-surface',
    'past1hprecip-surface',
    'precip-surface',
    'rain-surface',
    'precipitation-surface',
    'precipitation',
    'precip',
    'rain',
    'tp'
];
const METRE_WATER_KEYS = new Set([
    'past3hprecip-surface',
    'past1hprecip-surface'
]);
/** Minimum normalized 3-hour-equivalent amount used for ptype diagnosis. */ const PRECIP_THRESHOLD_MM_3H = 0.1;
/** @deprecated Use PRECIP_THRESHOLD_MM_3H; retained for source compatibility. */ const PRECIP_THRESHOLD_MM_H = PRECIP_THRESHOLD_MM_3H;
const precipFieldCache = new WeakMap();
function normalizedKey(key) {
    return key.toLowerCase().replace(/[_\s]/g, '-');
}
function isPrecipKey$1(key) {
    const normalized = normalizedKey(key);
    if (EXACT_KEYS.includes(normalized)) return true;
    return (normalized.includes('precip') || normalized === 'rain' || normalized.startsWith('rain-') || normalized === 'tp') && !normalized.includes('type') && !normalized.includes('snow');
}
function looksArrayLike(value) {
    if (Array.isArray(value)) return value.length > 0;
    if (ArrayBuffer.isView(value)) return Number(value?.length) > 0;
    return !!value && typeof value === 'object' && Number.isFinite(Number(value?.length));
}
function findPrecipFieldUncached(value, depth = 0) {
    if (!value || typeof value !== 'object' || depth > 5) return null;
    const object = value;
    for (const wanted of EXACT_KEYS){
        for (const [key, field] of Object.entries(object)){
            if (normalizedKey(key) === wanted && looksArrayLike(field)) return {
                key,
                field
            };
        }
    }
    // Compatibility fallback for unfamiliar precipitation aliases. Windy's
    // displayed precipitation values are treated as 3-hour-equivalent amounts.
    for (const [key, field] of Object.entries(object)){
        if (isPrecipKey$1(key) && looksArrayLike(field)) return {
            key,
            field
        };
    }
    for (const child of Object.values(object)){
        if (child && typeof child === 'object' && !looksArrayLike(child)) {
            const found = findPrecipFieldUncached(child, depth + 1);
            if (found) return found;
        }
    }
    return null;
}
function findPrecipField(data) {
    const cached = precipFieldCache.get(data);
    if (cached !== undefined) return cached;
    const found = findPrecipFieldUncached(data);
    precipFieldCache.set(data, found);
    return found;
}
function toThreeHourlyMillimetres(key, raw) {
    const normalized = normalizedKey(key);
    const millimetres = METRE_WATER_KEYS.has(normalized) ? raw * 1000 : raw;
    // If only Windy's explicit one-hour field is available, convert it to a
    // three-hour-equivalent amount so the rest of the UI keeps one unit.
    return normalized === 'past1hprecip-surface' ? millimetres * 3 : millimetres;
}
/** Precipitation amount in millimetres per 3-hour-equivalent period. */ function precipMmAt(data, index) {
    if ('__precipMm3h' in data) return valueAt(data.__precipMm3h, index);
    const found = findPrecipField(data);
    if (!found) return null;
    const raw = valueAt(found.field, index);
    if (raw === null || !Number.isFinite(raw)) return null;
    return Math.max(0, toThreeHourlyMillimetres(found.key, raw));
}

/** Qualify a model estimate without discarding its best-supported phase. */ function precipitationLabel(phase, confidence = phase.confidence) {
    return confidence === 'low' ? `${phase.label} possible` : phase.label;
}
const WARM_NODE_C = 0.2;
const MIN_MELTING_DM = 150;
const PARTIAL_MELTING_DM = 500;
const FULL_MELTING_DM = 1100;
const ICE_PELLET_REFREEZE_DM = 800;
const MAX_ANALYSIS_DEPTH_M = 5500;
function interpolateAtHeight(a, b, heightM) {
    const dz = b.heightM - a.heightM;
    const f = Math.abs(dz) < 1e-6 ? 0 : (heightM - a.heightM) / dz;
    const lerp = (x, y)=>x + f * (y - x);
    const logP = lerp(Math.log(a.pressureHpa), Math.log(b.pressureHpa));
    return {
        level: a.level,
        pressureHpa: Math.exp(logP),
        heightM,
        tempC: lerp(a.tempC, b.tempC),
        dewpointC: lerp(a.dewpointC, b.dewpointC),
        wetBulbC: lerp(a.wetBulbC, b.wetBulbC)
    };
}
function terrainProfile(profile, terrainM) {
    const p = profile.filter((v)=>Number.isFinite(v.heightM) && Number.isFinite(v.wetBulbC)).sort((a, b)=>a.heightM - b.heightM);
    if (p.length < 2 || !Number.isFinite(terrainM)) return null;
    if (terrainM > p[p.length - 1].heightM) return null;
    let surface;
    let extrapolated = false;
    let start = 0;
    if (terrainM <= p[0].heightM) {
        surface = {
            ...p[0],
            heightM: terrainM
        };
        extrapolated = true;
    } else {
        let bracket = -1;
        for(let i = 0; i < p.length - 1; i++){
            if (terrainM >= p[i].heightM && terrainM <= p[i + 1].heightM) {
                bracket = i;
                break;
            }
        }
        if (bracket < 0) return null;
        surface = interpolateAtHeight(p[bracket], p[bracket + 1], terrainM);
        start = bracket + 1;
    }
    const top = terrainM + MAX_ANALYSIS_DEPTH_M;
    const points = [
        surface,
        ...p.slice(start).filter((v)=>v.heightM > terrainM + 1 && v.heightM <= top)
    ];
    if (points.length < 2) return null;
    return {
        points,
        extrapolated
    };
}
function integrateSigned(points, sign, ceilingM = Infinity) {
    let sum = 0;
    for(let i = 0; i < points.length - 1; i++){
        const a = points[i];
        const b = points[i + 1];
        if (a.heightM >= ceilingM) break;
        const upper = Math.min(b.heightM, ceilingM);
        if (upper <= a.heightM) continue;
        const fraction = (upper - a.heightM) / Math.max(1e-6, b.heightM - a.heightM);
        const twB = a.wetBulbC + fraction * (b.wetBulbC - a.wetBulbC);
        const fa = sign === 'positive' ? Math.max(0, a.wetBulbC) : Math.max(0, -a.wetBulbC);
        const fb = sign === 'positive' ? Math.max(0, twB) : Math.max(0, -twB);
        // A layer crossing zero contributes only on the selected side of the crossing.
        const signedFraction = a.wetBulbC * twB < 0 ? (fa > 0 ? Math.abs(a.wetBulbC) : Math.abs(twB)) / (Math.abs(a.wetBulbC) + Math.abs(twB)) : 1;
        sum += 0.5 * (fa + fb) * (upper - a.heightM) * signedFraction;
    }
    return sum;
}
function classifyConfidence(points, extrapolated, warmDM, coldDM) {
    if (extrapolated) return 'low';
    let maxGap = 0;
    for(let i = 1; i < points.length; i++)maxGap = Math.max(maxGap, points[i].heightM - points[i - 1].heightM);
    if (maxGap > 1400) return 'low';
    const near = (value, threshold, margin)=>Math.abs(value - threshold) <= margin;
    if (near(warmDM, MIN_MELTING_DM, 90) || near(warmDM, PARTIAL_MELTING_DM, 180) || near(warmDM, FULL_MELTING_DM, 260) || near(coldDM, ICE_PELLET_REFREEZE_DM, 220)) return 'medium';
    return maxGap <= 850 ? 'high' : 'medium';
}
function result(key, label, icon, detail, confidence, surfaceWetBulbC, meltingDegreeMetres, refreezingDegreeMetres) {
    return {
        key,
        label,
        icon,
        detail,
        confidence,
        surfaceWetBulbC,
        meltingDegreeMetres,
        refreezingDegreeMetres
    };
}
/** Terrain-aware precipitation type from the wet-bulb vertical profile. */ function terrainPrecipitationType(profile, terrainM) {
    const prepared = terrainProfile(profile, terrainM);
    if (!prepared) return null;
    const points = prepared.points;
    const surfaceTw = points[0].wetBulbC;
    const warmPoints = points.filter((v)=>v.wetBulbC > WARM_NODE_C);
    const warmBottom = warmPoints.length ? Math.min(...warmPoints.map((v)=>v.heightM)) : Infinity;
    const warmDM = integrateSigned(points, 'positive');
    const coldDM = Number.isFinite(warmBottom) ? integrateSigned(points, 'negative', warmBottom) : integrateSigned(points, 'negative');
    const confidence = classifyConfidence(points, prepared.extrapolated, warmDM, coldDM);
    const approximate = confidence === 'low' ? '~ ' : '';
    if (warmDM < MIN_MELTING_DM) {
        if (surfaceTw <= -0.7) return result('snow', 'Snow', '❄', `${approximate}Cold column`, confidence, surfaceTw, warmDM, coldDM);
        if (surfaceTw <= 0.6) return result('wet-snow', 'Wet snow', '❄', `${approximate}Near-melting snow`, confidence, surfaceTw, warmDM, coldDM);
        return result('mix', 'Rain / snow mix', '🌨', `${approximate}Marginal melting near terrain`, confidence, surfaceTw, warmDM, coldDM);
    }
    if (warmDM < PARTIAL_MELTING_DM) {
        if (surfaceTw <= 0.3) return result('wet-snow', 'Wet snow', '❄', `${approximate}Partial melting`, confidence, surfaceTw, warmDM, coldDM);
        return result('mix', 'Rain / snow mix', '🌨', `${approximate}Partial melting`, confidence, surfaceTw, warmDM, coldDM);
    }
    if (surfaceTw <= 0 && warmDM >= PARTIAL_MELTING_DM) {
        if (coldDM >= ICE_PELLET_REFREEZE_DM) {
            return result('ice-pellets', 'Ice pellets', '🧊', `${approximate}Warm layer aloft · refreezing below`, confidence, surfaceTw, warmDM, coldDM);
        }
        return result('freezing-rain', 'Freezing rain', '⚠', `${approximate}Melted aloft · shallow surface cold layer`, confidence, surfaceTw, warmDM, coldDM);
    }
    if (warmDM < FULL_MELTING_DM && surfaceTw <= 1.2) {
        return result('mix', 'Rain / snow mix', '🌨', `${approximate}Incomplete melting`, confidence, surfaceTw, warmDM, coldDM);
    }
    return result('rain', 'Rain', '🌧', `${approximate}Melted before reaching terrain`, confidence, surfaceTw, warmDM, coldDM);
}

const HOUR_MS = 3600_000;
/** Profile timestamps represent interval starts, never the nearest future slot. */ function forecastIntervalHours(times, index) {
    if (index < 0 || index >= times.length) return 0;
    const difference = index + 1 < times.length ? times[index + 1] - times[index] : index > 0 ? times[index] - times[index - 1] : 3 * HOUR_MS;
    return Number.isFinite(difference) && difference > 0 ? Math.min(3, difference / HOUR_MS) : 0;
}
function forecastIntervalIndex(times, target) {
    if (!Number.isFinite(target)) return -1;
    for(let i = times.length - 1; i >= 0; i--){
        if (times[i] <= target) {
            return target < times[i] + forecastIntervalHours(times, i) * HOUR_MS ? i : -1;
        }
    }
    return -1;
}

function snowlineAt(point, index, terrainM) {
    try {
        const result = wetBulbZeroHeight(buildProfile(point.forecast, index));
        return result.snowLevelM !== null && Number.isFinite(result.snowLevelM) ? result.snowLevelM : null;
    } catch  {
        return null;
    }
}
function formatLead(hours) {
    const rounded = Math.max(0, Math.round(hours));
    if (rounded < 24) return `${rounded} h`;
    const days = Math.floor(rounded / 24);
    const remainder = rounded % 24;
    return remainder ? `${days}d ${remainder}h` : `${days}d`;
}
function formatUtc(time) {
    const date = new Date(time);
    const day = date.toLocaleDateString(undefined, {
        weekday: 'short',
        day: 'numeric',
        timeZone: 'UTC'
    });
    const hour = String(date.getUTCHours()).padStart(2, '0');
    const minute = String(date.getUTCMinutes()).padStart(2, '0');
    return `${day} ${hour}:${minute} UTC`;
}
function interpolateCrossingTime(beforeTime, afterTime, beforeSnowline, afterSnowline, terrainM) {
    const denominator = afterSnowline - beforeSnowline;
    if (Math.abs(denominator) < 1e-6) return afterTime;
    const fraction = Math.max(0, Math.min(1, (terrainM - beforeSnowline) / denominator));
    return beforeTime + fraction * (afterTime - beforeTime);
}
function terrainCrossingState(point, terrainM, targetTime) {
    if (!point || !Array.isArray(point.times) || !point.times.length || terrainM === null || !Number.isFinite(terrainM)) return null;
    const startIndex = forecastIntervalIndex(point.times, targetTime);
    if (startIndex < 0) return null;
    const current = snowlineAt(point, startIndex);
    const unresolved = {
        summary: 'Terrain crossing unresolved',
        detail: 'The atmospheric profile does not resolve WBZ at every required time; no crossing time is inferred across gaps.',
        crossingIndex: null,
        crossingTime: null,
        direction: 'none'
    };
    if (current === null) return unresolved;
    let currentBelowTerrain = current <= terrainM;
    let previousIndex = startIndex;
    let previousValue = current;
    for(let i = startIndex + 1; i < point.times.length; i++){
        if (point.times[i] > point.times[0] + 144 * 3600_000) break;
        if (point.times[i] - point.times[previousIndex] > 3 * 3600_000) return unresolved;
        const value = snowlineAt(point, i);
        if (value === null) return unresolved;
        const belowTerrain = value <= terrainM;
        if (belowTerrain !== currentBelowTerrain) {
            const crossingTime = interpolateCrossingTime(point.times[previousIndex], point.times[i], previousValue, value, terrainM);
            if (crossingTime < targetTime) {
                currentBelowTerrain = belowTerrain;
                previousIndex = i;
                previousValue = value;
                continue;
            }
            const leadHours = (crossingTime - targetTime) / 3600_000;
            if (belowTerrain) {
                return {
                    summary: `Snowline below terrain in ${formatLead(leadHours)}`,
                    detail: `Thermal snowline falls below local terrain around ${formatUtc(crossingTime)}; precipitation is still required for snowfall`,
                    crossingIndex: i,
                    crossingTime,
                    direction: 'below'
                };
            }
            return {
                summary: `Snowline above terrain in ${formatLead(leadHours)}`,
                detail: `Thermal snowline rises above local terrain around ${formatUtc(crossingTime)}`,
                crossingIndex: i,
                crossingTime,
                direction: 'above'
            };
        }
        previousIndex = i;
        previousValue = value;
    }
    return currentBelowTerrain ? {
        summary: 'Snowline below terrain in the available forecast',
        detail: 'Thermal snowline remains below local terrain in the available forecast; precipitation is still required for snowfall',
        crossingIndex: null,
        crossingTime: null,
        direction: 'none'
    } : {
        summary: 'Snowline above terrain in the available forecast',
        detail: 'Thermal snowline remains above local terrain in the available forecast',
        crossingIndex: null,
        crossingTime: null,
        direction: 'none'
    };
}

/**
 * Estimate forecast-created NEW snow depth.
 *
 * This is intentionally not total lying snow depth. It starts from zero and
 * converts forecast liquid precipitation into a terrain-aware fresh-snow
 * estimate, then applies simple settling and melt to that forecast-created
 * layer. The result should be treated as guidance, not model snow depth.
 *
 * Precipitation is supplied as a 3-hour-equivalent liquid amount (mm/3h).
 * Callers pass the represented forecast interval in hours; the conversion
 * scales the liquid amount by dt/3 so hourly and 3-hourly sampling integrate
 * consistently.
 */ function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}
/**
 * Fresh-snow ratio for the snow portion of the precipitation.
 *
 * SLR is kept separate from precipitation phase fraction so mixed/wet snow is
 * not penalised twice.
 */ function snowToLiquidRatio(phase) {
    const tw = phase.surfaceWetBulbC;
    if (phase.key === 'snow') {
        if (tw <= -8) return 18;
        if (tw <= -5) return 15;
        if (tw <= -3) return 12;
        if (tw <= -1) return 9;
        return 7;
    }
    if (phase.key === 'wet-snow') {
        if (tw <= -0.5) return 7.5;
        if (tw <= 0.2) return 6;
        return 4.5;
    }
    // For a rain/snow mix this is the ratio of the snow component only. The
    // amount assigned to that component is handled separately below.
    if (phase.key === 'mix') return 6;
    // Ice pellets are wintry precipitation, but they are not "new snow".
    return 0;
}
/** Fraction of liquid-equivalent precipitation represented by falling snow. */ function snowFraction(phase) {
    const tw = phase.surfaceWetBulbC;
    if (phase.key === 'snow') return 1;
    if (phase.key === 'wet-snow') {
        if (tw <= 0) return 0.95;
        if (tw <= 0.6) return 0.85;
        return 0.75;
    }
    if (phase.key === 'mix') {
        // Use the diagnosed positive wet-bulb energy to vary the snow share. A
        // shallow/weak warm layer retains more snow than a nearly fully melting
        // profile.
        const warmDM = Math.max(0, phase.meltingDegreeMetres);
        const fraction = 0.65 - 0.50 * clamp((warmDM - 150) / (1100 - 150), 0, 1);
        const surfaceAdjustment = tw > 0.8 ? 0.85 : 1;
        return clamp(fraction * surfaceAdjustment, 0.10, 0.65);
    }
    // Ice pellets, freezing rain and rain do not contribute to NEW SNOW depth.
    return 0;
}
function estimateNewSnowStep(precipMm3h, phase, previousCm, hours = 1) {
    const dt = Number.isFinite(hours) ? Math.max(0, Math.min(6, hours)) : 0;
    if (dt === 0) return {
        hourlyCm: 0,
        cumulativeCm: Math.max(0, previousCm)
    };
    let snowpack = Math.max(0, previousCm);
    if (!phase) {
        snowpack *= Math.pow(0.997, dt);
        return {
            hourlyCm: 0,
            cumulativeCm: snowpack
        };
    }
    const tw = phase.surfaceWetBulbC;
    // Fresh snow compacts fastest near the melting point and more slowly in a
    // colder boundary layer. This is deliberately modest because the plugin has
    // no full snowpack-energy model.
    const settlePerHour = tw >= -0.5 ? 0.010 : tw >= -3 ? 0.006 : 0.003;
    snowpack *= Math.pow(1 - settlePerHour, dt);
    // Simple temperature-dependent melt of forecast-created snow. This is not a
    // substitute for a surface-energy-balance snow model, so keep it bounded.
    if (tw > 0) {
        const meltCmH = Math.min(1.8, 0.18 + 0.22 * tw);
        snowpack = Math.max(0, snowpack - meltCmH * dt);
    }
    if (precipMm3h === null || !Number.isFinite(precipMm3h) || precipMm3h <= 0) {
        return {
            hourlyCm: 0,
            cumulativeCm: snowpack
        };
    }
    const slr = snowToLiquidRatio(phase);
    const fraction = snowFraction(phase);
    if (slr <= 0 || fraction <= 0) {
        return {
            hourlyCm: 0,
            cumulativeCm: snowpack
        };
    }
    // precipMm3h is a 3-hour-equivalent amount. Convert it to the represented
    // forecast interval before applying the snow ratio and snow fraction.
    const liquidMm = Math.max(0, precipMm3h) * (dt / 3);
    const addedCm = liquidMm * slr * fraction / 10;
    snowpack += addedCm;
    return {
        hourlyCm: addedCm / dt,
        cumulativeCm: snowpack
    };
}

const MAX_EVENT_GAP_HOURS = 3;
const WINTRY_KEYS = new Set([
    'snow',
    'wet-snow',
    'mix',
    'ice-pellets',
    'freezing-rain'
]);
const CONFIDENCE_SCORE = {
    low: 1,
    medium: 2,
    high: 3
};
function diagnosedPhase(point, index, terrainM) {
    const precip = precipMmAt(point.forecast, index);
    if (precip === null || precip < PRECIP_THRESHOLD_MM_H) return null;
    return terrainPrecipitationType(buildProfile(point.forecast, index), terrainM);
}
function aggregateConfidence(event) {
    let weight = 0;
    let score = 0;
    let lowWeight = 0;
    for (const step of event){
        const w = Math.max(step.precip, PRECIP_THRESHOLD_MM_H);
        weight += w;
        score += CONFIDENCE_SCORE[step.phase.confidence] * w;
        if (step.phase.confidence === 'low') lowWeight += w;
    }
    if (!weight) return 'low';
    const mean = score / weight;
    if (lowWeight / weight >= 0.35 || mean < 1.65) return 'low';
    if (mean >= 2.55) return 'high';
    return 'medium';
}
/** Summarise the next terrain-relevant wintry precipitation event. */ function nextWintryEvent(point, terrainM, fromTime, horizonHours = 144) {
    if (!point?.times?.length || terrainM === null || !Number.isFinite(terrainM)) return null;
    const times = point.times;
    const horizonEnd = Math.min(times[0] + 144 * 3600_000, times.at(-1) + forecastIntervalHours(times, times.length - 1) * 3600_000, fromTime + horizonHours * 3600_000);
    const qualifying = [];
    for(let i = 0; i < times.length && times[i] < horizonEnd; i++){
        const intervalEnd = times[i] + forecastIntervalHours(times, i) * 3600_000;
        if (intervalEnd <= fromTime) continue;
        const precip = precipMmAt(point.forecast, i);
        if (precip === null || precip < PRECIP_THRESHOLD_MM_H) continue;
        const phase = diagnosedPhase(point, i, terrainM);
        if (!phase || !WINTRY_KEYS.has(phase.key)) continue;
        qualifying.push({
            index: i,
            time: times[i],
            precip,
            phase
        });
    }
    if (!qualifying.length) return null;
    const event = [
        qualifying[0]
    ];
    for(let i = 1; i < qualifying.length; i++){
        const gapH = (qualifying[i].time - event[event.length - 1].time) / 3600_000;
        if (gapH > MAX_EVENT_GAP_HOURS) break;
        event.push(qualifying[i]);
    }
    const startTime = event[0].time;
    const last = event[event.length - 1];
    const endTime = Math.min(horizonEnd, last.time + forecastIntervalHours(times, last.index) * 3600_000);
    let peak = event[0];
    let minSnowlineM = null;
    const phaseWeights = new Map();
    for (const step of event){
        if (step.precip > peak.precip) peak = step;
        const snowline = wetBulbZeroHeight(buildProfile(point.forecast, step.index)).snowLevelM;
        if (snowline !== null && Number.isFinite(snowline)) minSnowlineM = minSnowlineM === null ? snowline : Math.min(minSnowlineM, snowline);
        const current = phaseWeights.get(step.phase.key);
        phaseWeights.set(step.phase.key, {
            weight: (current?.weight ?? 0) + Math.max(step.precip, PRECIP_THRESHOLD_MM_H),
            phase: current?.phase ?? step.phase
        });
    }
    let dominant = event[0].phase;
    let dominantWeight = -1;
    for (const value of phaseWeights.values()){
        if (value.weight > dominantWeight) {
            dominantWeight = value.weight;
            dominant = value.phase;
        }
    }
    let snowpack = 0;
    let incomplete = false;
    const startIndex = event[0].index;
    const endIndex = event[event.length - 1].index;
    for(let i = startIndex; i <= endIndex; i++){
        const phase = diagnosedPhase(point, i, terrainM);
        const precip = precipMmAt(point.forecast, i);
        const intervalStart = Math.max(fromTime, times[i]);
        const intervalEnd = Math.min(endTime, times[i] + forecastIntervalHours(times, i) * 3600_000);
        const dt = (intervalEnd - intervalStart) / 3600_000;
        if (dt <= 0) continue;
        if (precip === null || precip >= PRECIP_THRESHOLD_MM_H && !phase) incomplete = true;
        snowpack = estimateNewSnowStep(precip, phase, snowpack, dt).cumulativeCm;
    }
    return {
        startTime,
        endTime,
        peakTime: peak.time,
        peakPrecipMm3h: peak.precip,
        minSnowlineM: minSnowlineM === null ? null : Math.round(minSnowlineM / 10) * 10,
        newSnowCm: snowpack,
        dominantPhase: dominant,
        confidence: aggregateConfidence(event),
        activeNow: fromTime >= startTime && fromTime < endTime,
        incomplete
    };
}

function conditionLabel(precip, phase) {
    if (precip === null || !Number.isFinite(precip)) return 'Precipitation unavailable';
    if (precip < PRECIP_THRESHOLD_MM_3H) return 'Dry';
    return phase ? precipitationLabel(phase) : 'Precipitation · type uncertain';
}
/** Absence of an event is only meaningful over intervals we could classify. */ function noEventMessage(point, terrainM, fromTime) {
    if (!point?.times?.length || terrainM === null || !Number.isFinite(terrainM)) return 'Wintry outlook unavailable';
    const end = Math.min(point.times[0] + 144 * 3600_000, point.times.at(-1) + forecastIntervalHours(point.times, point.times.length - 1) * 3600_000);
    if (fromTime >= end) return 'Outside available forecast';
    let coveredUntil = fromTime;
    const partialOutlook = ()=>{
        const hours = Math.floor((coveredUntil - fromTime) / 3600_000);
        return coveredUntil > fromTime ? `No wintry precipitation for ${hours > 0 ? hours : '<1'} h` : 'Outlook unavailable · forecast data missing';
    };
    for(let i = 0; i < point.times.length && point.times[i] < end; i++){
        const start = point.times[i], intervalEnd = Math.min(end, start + forecastIntervalHours(point.times, i) * 3600_000);
        if (intervalEnd <= fromTime) continue;
        const precip = precipMmAt(point.forecast, i);
        if (start > coveredUntil || precip === null || precip >= PRECIP_THRESHOLD_MM_3H && !terrainPrecipitationType(buildProfile(point.forecast, i), terrainM)) {
            return partialOutlook();
        }
        coveredUntil = intervalEnd;
    }
    return coveredUntil >= end ? 'No wintry precipitation in the available forecast' : partialOutlook();
}

const HOUR = 3600_000;
/** Reject malformed axes instead of shifting weather values onto other times. */ function buildForecastTimes(data, refTime) {
    const length = Number(data.hours?.length);
    if (!Number.isInteger(length) || length <= 0) return [];
    const times = [];
    for(let i = 0; i < length; i++){
        const raw = valueAt(data.hours, i);
        if (raw === null) return [];
        const time = raw > 1e12 ? raw : raw > 1e9 ? raw * 1000 : refTime === null ? NaN : refTime + raw * HOUR;
        if (!Number.isFinite(time) || i > 0 && time <= times[i - 1]) return [];
        times.push(time);
    }
    return times.filter((time)=>time <= times[0] + 144 * HOUR);
}
function intervalEnd(times, index) {
    return Math.min(times[0] + 144 * HOUR, times[index] + forecastIntervalHours(times, index) * HOUR);
}
/** A total for a requested window requires continuous, known intervals. */ function coversWindow(times, known, start, end) {
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return false;
    let covered = start;
    for(let i = 0; i < times.length && times[i] < end; i++){
        const until = intervalEnd(times, i);
        if (until <= start) continue;
        if (times[i] > covered || !known[i]) return false;
        covered = Math.max(covered, until);
        if (covered >= end) return true;
    }
    return false;
}

/** A cumulative estimate is supported only up to the first unknown interval. */ function forecastCoverage(precip, phases, times) {
    const known = precip.map((value, i)=>value !== null && Number.isFinite(value) && value >= 0 && Number.isFinite(times[i]) && (value < PRECIP_THRESHOLD_MM_3H || phases[i] != null));
    let prefix = 0;
    while(prefix < known.length && known[prefix] && (prefix === 0 || times[prefix] > times[prefix - 1] && times[prefix] - times[prefix - 1] <= 3 * 3600_000))prefix++;
    const complete = known.length > 0 && prefix === known.length;
    const precipCount = precip.filter((value)=>value !== null && Number.isFinite(value)).length;
    const note = complete ? '' : known.slice(prefix).some(Boolean) ? 'Forecast has gaps' : '';
    return {
        known,
        prefix,
        complete,
        precipCount,
        note: precipCount === 0 ? 'Forecast unavailable' : note
    };
}

function metresToFeet(m) {
    return m * 3.280839895;
}
function cmToInches(cm) {
    return cm / 2.54;
}
function mmToInches(mm) {
    return mm / 25.4;
}
function cToF(c) {
    return c * 9 / 5 + 32;
}
function formatElevation(m, units, stepM = 10) {
    if (m === null || !Number.isFinite(m)) return '—';
    if (units === 'imperial') return `${Math.round(metresToFeet(m) / 50) * 50} ft`;
    return `${Math.round(m / stepM) * stepM} m`;
}
function formatSnow(cm, units) {
    if (cm === null || !Number.isFinite(cm)) return '—';
    if (cm === 0) return 'None';
    if (units === 'imperial') {
        const value = cmToInches(cm);
        return `${value > 0 && value < 1 ? '<1' : Math.round(value)} in`;
    }
    return `${cm > 0 && cm < 1 ? '<1' : Math.round(cm)} cm`;
}
function formatPrecip(mm3h, units) {
    if (mm3h === null || !Number.isFinite(mm3h)) return '—';
    const hourly = mm3h;
    if (units === 'imperial') {
        const value = mmToInches(hourly);
        return `${value > 0 && value < 1 ? '<1' : Math.round(value)} in/3h`;
    }
    return `${hourly > 0 && hourly < 1 ? '<1' : Math.round(hourly)} mm/3h`;
}
function formatTemperature(c, units, digits = 1) {
    if (c === null || !Number.isFinite(c)) return '—';
    const value = units === 'imperial' ? cToF(c) : c;
    return `${Math.round(value) || 0}°${units === 'imperial' ? 'F' : 'C'}`;
}

function saturationVapourPressure(tempC) {
    return 6.112 * Math.exp(17.67 * tempC / (tempC + 243.5));
}
function relativeHumidityPct(tempC, dewpointC) {
    const td = Math.min(tempC, dewpointC);
    const rh = 100 * saturationVapourPressure(td) / saturationVapourPressure(tempC);
    return Math.max(0, Math.min(100, rh));
}
function interpolate(a, b, heightM) {
    const dz = b.heightM - a.heightM;
    const f = Math.abs(dz) < 1e-6 ? 0 : (heightM - a.heightM) / dz;
    const lerp = (x, y)=>x + f * (y - x);
    return {
        level: a.level,
        pressureHpa: Math.exp(lerp(Math.log(a.pressureHpa), Math.log(b.pressureHpa))),
        heightM,
        tempC: lerp(a.tempC, b.tempC),
        dewpointC: lerp(a.dewpointC, b.dewpointC),
        wetBulbC: lerp(a.wetBulbC, b.wetBulbC)
    };
}
function profileAtHeight(profile, heightM) {
    const p = profile.filter((v)=>Number.isFinite(v.heightM) && Number.isFinite(v.tempC) && Number.isFinite(v.dewpointC)).sort((a, b)=>a.heightM - b.heightM);
    if (p.length < 2 || !Number.isFinite(heightM) || heightM > p[p.length - 1].heightM) return null;
    if (heightM <= p[0].heightM) return {
        point: {
            ...p[0],
            heightM
        },
        extrapolated: true
    };
    for(let i = 0; i < p.length - 1; i++){
        if (heightM >= p[i].heightM && heightM <= p[i + 1].heightM) {
            return {
                point: interpolate(p[i], p[i + 1], heightM),
                extrapolated: false
            };
        }
    }
    return null;
}
function layerPoint(profile, targetM) {
    return profileAtHeight(profile, targetM)?.point ?? null;
}
/**
 * Compact profile-only convective-snow environment diagnostic.
 *
 * This is intentionally not a thunder/lightning forecast. It flags a profile
 * that can support convective snow showers: steep low/mid-level lapse rate and
 * a moist dendritic-growth zone (-18 to -12 C). The precipitation-type routine
 * decides whether falling precipitation is actually snow/wet snow.
 */ function terrainDiagnostics(profile, terrainM) {
    const surface = profileAtHeight(profile, terrainM);
    if (!surface) return null;
    const topTarget = terrainM + 3000;
    const top = layerPoint(profile, topTarget);
    const lapseRateCPerKm = top ? (surface.point.tempC - top.tempC) / Math.max(0.1, (top.heightM - terrainM) / 1000) : null;
    const dgz = profile.filter((v)=>v.heightM >= terrainM && v.tempC <= -12 && v.tempC >= -18 && Number.isFinite(v.dewpointC));
    const snowGrowthRhPct = dgz.length ? dgz.reduce((sum, v)=>sum + relativeHumidityPct(v.tempC, v.dewpointC), 0) / dgz.length : null;
    // 6.5 C/km is a deliberately conservative "steep" profile threshold;
    // 80% RH requires a reasonably moist dendritic-growth layer.
    const convectiveEnvironment = lapseRateCPerKm !== null && lapseRateCPerKm >= 6.5 && snowGrowthRhPct !== null && snowGrowthRhPct >= 80;
    return {
        tempC: surface.point.tempC,
        dewpointC: surface.point.dewpointC,
        wetBulbC: surface.point.wetBulbC,
        rhPct: relativeHumidityPct(surface.point.tempC, surface.point.dewpointC),
        pressureHpa: surface.point.pressureHpa,
        extrapolated: surface.extrapolated,
        lapseRateCPerKm,
        snowGrowthRhPct,
        convectiveEnvironment
    };
}

/* src\winter\SoundingChart.svelte generated by Svelte v4.2.20 */

function add_css$2(target) {
	append_styles(target, "svelte-1b18sp1", ".sounding-shell.svelte-1b18sp1.svelte-1b18sp1{position:fixed;z-index:10025;width:min(390px, calc(100vw - 12px));padding:10px 11px;border:1px solid rgba(139, 213, 244, 0.34);border-radius:13px;background:linear-gradient(180deg, rgba(14, 23, 30, 0.995), rgba(8, 15, 20, 0.995));color:#fff;box-shadow:0 16px 42px rgba(0, 0, 0, 0.56)}.sounding-shell.sounding-embedded.svelte-1b18sp1.svelte-1b18sp1{position:relative;left:auto!important;top:auto!important;z-index:auto;width:100%;box-sizing:border-box;padding:0;border:0;border-radius:0;background:transparent;box-shadow:none}.sounding-shell.sounding-embedded.svelte-1b18sp1 .sounding-hover.svelte-1b18sp1{top:54px;right:10px}.sounding-embedded.svelte-1b18sp1 .embedded-head.svelte-1b18sp1{justify-content:flex-end;margin-bottom:4px}.sounding-embedded.svelte-1b18sp1 .sounding-viewport.svelte-1b18sp1{max-height:none;overflow:hidden;cursor:default}.sounding-embedded.svelte-1b18sp1 .sounding-viewport.zoomed.svelte-1b18sp1{max-height:56vh;overflow:auto;cursor:grab}.head.svelte-1b18sp1.svelte-1b18sp1{display:flex;justify-content:space-between;gap:8px}.head.svelte-1b18sp1>div.svelte-1b18sp1:first-child{min-width:0;flex:1}.head.svelte-1b18sp1 b.svelte-1b18sp1{display:block;font-size:14px}.head.svelte-1b18sp1 small.svelte-1b18sp1,.head.svelte-1b18sp1 em.svelte-1b18sp1{display:block;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-style:normal}.head.svelte-1b18sp1 small.svelte-1b18sp1{margin-top:2px;color:#a8b7c0;font-size:8px}.head.svelte-1b18sp1 em.svelte-1b18sp1{margin-top:2px;color:#6ecdf2;font-size:7.5px}.actions.svelte-1b18sp1.svelte-1b18sp1{display:flex;gap:3px;align-items:flex-start}.actions.svelte-1b18sp1 button.svelte-1b18sp1{min-width:25px;height:27px;padding:0 5px;border:1px solid rgba(255, 255, 255, 0.09);border-radius:7px;background:rgba(255, 255, 255, 0.07);color:#fff;font-size:13px;font-weight:800;cursor:pointer}.actions.svelte-1b18sp1 button.svelte-1b18sp1:hover{background:rgba(105, 212, 255, 0.14)}.actions.svelte-1b18sp1 .png.svelte-1b18sp1{font-size:7px;padding:0 6px}.actions.svelte-1b18sp1 .zoom-readout.svelte-1b18sp1{min-width:43px;font-size:7px}.drag.svelte-1b18sp1.svelte-1b18sp1{cursor:grab!important;touch-action:none}.phase-banner.svelte-1b18sp1.svelte-1b18sp1{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:2px 8px;margin-top:5px;padding:7px 9px;border:1px solid rgba(255, 255, 255, 0.08);border-left:3px solid #82939d;border-radius:8px;background:rgba(255, 255, 255, 0.035)}.phase-banner.svelte-1b18sp1 small.svelte-1b18sp1{grid-row:0.33333333;color:#7e8f99;font-size:6px;text-transform:uppercase;letter-spacing:0.3px}.phase-banner.svelte-1b18sp1 b.svelte-1b18sp1{font-size:10px}.phase-banner.snow.svelte-1b18sp1.svelte-1b18sp1{border-left-color:#f4f7fb}.phase-banner.wet-snow.svelte-1b18sp1.svelte-1b18sp1{border-left-color:#6bd47f}.phase-banner.mix.svelte-1b18sp1.svelte-1b18sp1{border-left-color:#f2d84f}.phase-banner.rain.svelte-1b18sp1.svelte-1b18sp1{border-left-color:#4f82ff}.phase-banner.ice.svelte-1b18sp1.svelte-1b18sp1{border-left-color:#a8753e}.phase-banner.freezing-rain.svelte-1b18sp1.svelte-1b18sp1{border-left-color:#a867e8}.phase-banner.dry.svelte-1b18sp1.svelte-1b18sp1{opacity:0.82}.sounding-viewport.svelte-1b18sp1.svelte-1b18sp1{max-height:430px;overflow:auto;margin-top:6px;border-radius:9px;overscroll-behavior:contain;touch-action:none;cursor:grab;scrollbar-width:thin}.sounding-viewport.svelte-1b18sp1.svelte-1b18sp1:active{cursor:grabbing}.sounding-viewport.svelte-1b18sp1.svelte-1b18sp1:focus-visible{outline:1px solid rgba(105, 212, 255, 0.55);outline-offset:2px}.sounding-viewport.svelte-1b18sp1 svg.svelte-1b18sp1{display:block;min-width:100%;height:auto;margin:0;transform-origin:top left;user-select:none;-webkit-user-select:none}.plot-bg.svelte-1b18sp1.svelte-1b18sp1{fill:#0d171d;stroke:#263a46}.terrain-zone.svelte-1b18sp1.svelte-1b18sp1{fill:rgba(255, 174, 86, 0.08)}.terrain-line.svelte-1b18sp1.svelte-1b18sp1{stroke:#ffae56;stroke-width:1.5;stroke-dasharray:5 4}.terrain-text.svelte-1b18sp1.svelte-1b18sp1{fill:#ffbd75;font-size:7px}.snowline-marker.svelte-1b18sp1.svelte-1b18sp1{stroke:#69d4ff;stroke-width:1.5;stroke-dasharray:4 3}.snowline-tag-bg.svelte-1b18sp1.svelte-1b18sp1{fill:rgba(16, 43, 54, 0.94)}.snowline-tag.svelte-1b18sp1.svelte-1b18sp1{fill:#aeeaff;font-size:7px;font-weight:800}.temp-grid.svelte-1b18sp1.svelte-1b18sp1{stroke:rgba(154, 181, 196, 0.1)}.temp-grid.zero.svelte-1b18sp1.svelte-1b18sp1{stroke:rgba(117, 202, 239, 0.5);stroke-width:1.3}.pressure-grid.svelte-1b18sp1.svelte-1b18sp1{stroke:rgba(154, 181, 196, 0.12)}.axis.svelte-1b18sp1.svelte-1b18sp1{fill:#758995;font-size:7px;font-family:sans-serif}.temp-line.svelte-1b18sp1.svelte-1b18sp1{fill:none;stroke:#ff765f;stroke-width:2.4}.dew-line.svelte-1b18sp1.svelte-1b18sp1{fill:none;stroke:#72d98b;stroke-width:2.1}.wetbulb-line.svelte-1b18sp1.svelte-1b18sp1{fill:none;stroke:#69d4ff;stroke-width:1.7;stroke-dasharray:4 3}.temp-dot.svelte-1b18sp1.svelte-1b18sp1{fill:#ff765f}.dew-dot.svelte-1b18sp1.svelte-1b18sp1{fill:#72d98b}.key.svelte-1b18sp1.svelte-1b18sp1{display:flex;flex-wrap:wrap;gap:5px 10px;margin:4px 2px 6px;color:#a0b0ba;font-size:7px}.key.svelte-1b18sp1 span.svelte-1b18sp1{display:flex;align-items:center;gap:4px}.key.svelte-1b18sp1 i.svelte-1b18sp1{display:inline-block;width:13px;border-top:2px solid}.key.svelte-1b18sp1 .t.svelte-1b18sp1{border-color:#ff765f}.key.svelte-1b18sp1 .d.svelte-1b18sp1{border-color:#72d98b}.key.svelte-1b18sp1 .w.svelte-1b18sp1{border-color:#69d4ff;border-top-style:dashed}.key.svelte-1b18sp1 .z.svelte-1b18sp1{border-color:#75caef}.stats.svelte-1b18sp1.svelte-1b18sp1{display:grid;grid-template-columns:repeat(2, 1fr);gap:4px}.stats.svelte-1b18sp1 span.svelte-1b18sp1{padding:5px 2px;border-radius:7px;background:rgba(255, 255, 255, 0.035);text-align:center}.stats.svelte-1b18sp1 small.svelte-1b18sp1{display:block;color:#71838e;font-size:5.6px}.stats.svelte-1b18sp1 b.svelte-1b18sp1{display:block;margin-top:2px;font-size:6.7px;white-space:nowrap}.hint.svelte-1b18sp1.svelte-1b18sp1{margin-top:5px;color:#60717b;font-size:6.2px;text-align:center}.empty.svelte-1b18sp1.svelte-1b18sp1{padding:30px 8px;text-align:center;color:#82939d;font-size:9px}@media(max-width: 520px){.sounding-shell.svelte-1b18sp1.svelte-1b18sp1{width:calc(100vw - 12px);padding:9px}.head.svelte-1b18sp1 small.svelte-1b18sp1,.head.svelte-1b18sp1 em.svelte-1b18sp1{max-width:125px}.stats.svelte-1b18sp1 b.svelte-1b18sp1{font-size:6.3px}.sounding-viewport.svelte-1b18sp1.svelte-1b18sp1{max-height:55vh}.actions.svelte-1b18sp1.svelte-1b18sp1{gap:2px}.actions.svelte-1b18sp1 button.svelte-1b18sp1{min-width:24px;height:26px}.actions.svelte-1b18sp1 .png.svelte-1b18sp1{display:none !important}.actions.svelte-1b18sp1 .zoom-readout.svelte-1b18sp1{min-width:38px}}.hover-level.svelte-1b18sp1.svelte-1b18sp1{stroke:rgba(255, 255, 255, 0.58);stroke-width:1;stroke-dasharray:2 2}.hover-temp.svelte-1b18sp1.svelte-1b18sp1{fill:#0d171d;stroke:#ff765f;stroke-width:2}.hover-dew.svelte-1b18sp1.svelte-1b18sp1{fill:#0d171d;stroke:#72d98b;stroke-width:2}.hover-wet.svelte-1b18sp1.svelte-1b18sp1{fill:#0d171d;stroke:#69d4ff;stroke-width:2}.sounding-hover.svelte-1b18sp1.svelte-1b18sp1{position:absolute;z-index:6;top:78px;right:14px;display:grid;grid-template-columns:repeat(3, auto);gap:4px 8px;width:160px;max-width:calc(100% - 28px);box-sizing:border-box;padding:7px 8px;border:1px solid rgba(255, 255, 255, 0.16);border-radius:8px;background:rgba(5, 10, 14, 0.96);box-shadow:0 8px 22px rgba(0, 0, 0, 0.48);pointer-events:none}.sounding-hover.svelte-1b18sp1 b.svelte-1b18sp1{grid-column:-1;color:#eaf5fa;font-size:8px}.sounding-hover.svelte-1b18sp1 span.svelte-1b18sp1{color:#aebcc4;font-size:7px;font-weight:750}.actions.svelte-1b18sp1 .png.svelte-1b18sp1{display:inline-block !important;font-size:10px}.actions.svelte-1b18sp1 button.svelte-1b18sp1{min-height:32px}.stats.svelte-1b18sp1 small.svelte-1b18sp1{font-size:10px}.stats.svelte-1b18sp1 b.svelte-1b18sp1{font-size:12px}.hint.svelte-1b18sp1.svelte-1b18sp1{font-size:10px}.sounding-shell.sounding-embedded.svelte-1b18sp1.svelte-1b18sp1{background:var(--panel, #152b37);color:var(--ink, #edf7fa)}.sounding-embedded.svelte-1b18sp1 .actions button.svelte-1b18sp1{min-height:38px;min-width:38px;font-weight:500}.sounding-embedded.svelte-1b18sp1 .actions .png.svelte-1b18sp1,.sounding-embedded.svelte-1b18sp1 .actions .zoom-readout.svelte-1b18sp1{font-size:11px}.sounding-embedded.svelte-1b18sp1 .stats small.svelte-1b18sp1{font-size:11px;color:var(--muted, #b2c7d1)}.sounding-embedded.svelte-1b18sp1 .stats b.svelte-1b18sp1{font-size:12px;font-weight:500}.sounding-embedded.svelte-1b18sp1 .stats span.svelte-1b18sp1{padding:10px 4px}.sounding-embedded.svelte-1b18sp1 .phase-banner small.svelte-1b18sp1,.sounding-embedded.svelte-1b18sp1 .phase-banner em.svelte-1b18sp1,.sounding-embedded.svelte-1b18sp1 .hint.svelte-1b18sp1{font-size:11px}.sounding-embedded.svelte-1b18sp1 .phase-banner b.svelte-1b18sp1{font-size:14px;font-weight:500}");
}

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[48] = list[i];
	return child_ctx;
}

function get_each_context_1$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[51] = list[i];
	return child_ctx;
}

function get_each_context_2$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[51] = list[i];
	return child_ctx;
}

// (3:4) {#if !embedded}
function create_if_block_6$1(ctx) {
	let div;
	let b;
	let t1;
	let small;
	let t2_value = (/*placeName*/ ctx[0] || 'Selected point') + "";
	let t2;
	let t3;
	let em;
	let t4;

	return {
		c() {
			div = element("div");
			b = element("b");
			b.textContent = "Forecast sounding";
			t1 = space();
			small = element("small");
			t2 = text(t2_value);
			t3 = space();
			em = element("em");
			t4 = text(/*validLabel*/ ctx[11]);
			attr(b, "class", "svelte-1b18sp1");
			attr(small, "class", "svelte-1b18sp1");
			attr(em, "class", "svelte-1b18sp1");
			attr(div, "class", "svelte-1b18sp1");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, b);
			append(div, t1);
			append(div, small);
			append(small, t2);
			append(div, t3);
			append(div, em);
			append(em, t4);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*placeName*/ 1 && t2_value !== (t2_value = (/*placeName*/ ctx[0] || 'Selected point') + "")) set_data(t2, t2_value);
			if (dirty[0] & /*validLabel*/ 2048) set_data(t4, /*validLabel*/ ctx[11]);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

// (13:6) {#if !embedded}
function create_if_block_5$1(ctx) {
	let button0;
	let t1;
	let button1;
	let mounted;
	let dispose;

	return {
		c() {
			button0 = element("button");
			button0.textContent = "↕";
			t1 = space();
			button1 = element("button");
			button1.textContent = "×";
			attr(button0, "class", "drag svelte-1b18sp1");
			attr(button0, "type", "button");
			attr(button0, "title", "Drag sounding window");
			attr(button0, "aria-label", "Drag sounding window");
			attr(button1, "type", "button");
			attr(button1, "title", "Close");
			attr(button1, "aria-label", "Close sounding");
			attr(button1, "class", "svelte-1b18sp1");
		},
		m(target, anchor) {
			insert(target, button0, anchor);
			insert(target, t1, anchor);
			insert(target, button1, anchor);

			if (!mounted) {
				dispose = [
					listen(button0, "pointerdown", /*startDrag*/ ctx[13]),
					listen(button1, "click", /*click_handler_2*/ ctx[28])
				];

				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(button0);
				detach(t1);
				detach(button1);
			}

			mounted = false;
			run_all(dispose);
		}
	};
}

// (76:2) {:else}
function create_else_block$1(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = "Sounding unavailable for this forecast time.";
			attr(div, "class", "empty svelte-1b18sp1");
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

// (18:2) {#if sounding}
function create_if_block$2(ctx) {
	let div0;
	let small0;
	let b0;
	let t1_value = /*sounding*/ ctx[3].phaseLabel + "";
	let t1;
	let t2;
	let div1;
	let svg;
	let rect;
	let each0_anchor;
	let each1_anchor;
	let if_block0_anchor;
	let polyline0;
	let polyline0_points_value;
	let polyline1;
	let polyline1_points_value;
	let polyline2;
	let polyline2_points_value;
	let each2_anchor;
	let svg_style_value;
	let t3;
	let t4;
	let div2;
	let t12;
	let div3;
	let span4;
	let small1;
	let b1;
	let t14_value = /*sounding*/ ctx[3].surfaceTw + "";
	let t14;
	let t15;
	let span5;
	let small2;
	let b2;
	let t17_value = /*sounding*/ ctx[3].snowline + "";
	let t17;
	let t18;
	let div4;
	let mounted;
	let dispose;
	let each_value_2 = ensure_array_like(/*sounding*/ ctx[3].tempGrid);
	let each_blocks_2 = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks_2[i] = create_each_block_2$1(get_each_context_2$1(ctx, each_value_2, i));
	}

	let each_value_1 = ensure_array_like(/*sounding*/ ctx[3].pressureGrid);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
	}

	let if_block0 = /*sounding*/ ctx[3].terrainY !== null && create_if_block_4$2(ctx);
	let if_block1 = /*sounding*/ ctx[3].snowlineY !== null && create_if_block_3$2(ctx);
	let each_value = ensure_array_like(/*sounding*/ ctx[3].nodes);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	let if_block2 = /*hoverNode*/ ctx[10] && create_if_block_2$2(ctx);
	let if_block3 = /*hoverNode*/ ctx[10] && create_if_block_1$2(ctx);

	return {
		c() {
			div0 = element("div");
			small0 = element("small");
			small0.textContent = "At terrain";
			b0 = element("b");
			t1 = text(t1_value);
			t2 = space();
			div1 = element("div");
			svg = svg_element("svg");
			rect = svg_element("rect");

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].c();
			}

			each0_anchor = empty();

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			each1_anchor = empty();
			if (if_block0) if_block0.c();
			if_block0_anchor = empty();
			if (if_block1) if_block1.c();
			polyline0 = svg_element("polyline");
			polyline1 = svg_element("polyline");
			polyline2 = svg_element("polyline");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each2_anchor = empty();
			if (if_block2) if_block2.c();
			t3 = space();
			if (if_block3) if_block3.c();
			t4 = space();
			div2 = element("div");
			div2.innerHTML = `<span class="svelte-1b18sp1"><i class="t svelte-1b18sp1"></i>Temp</span> <span class="svelte-1b18sp1"><i class="d svelte-1b18sp1"></i>Dew point</span> <span class="svelte-1b18sp1"><i class="w svelte-1b18sp1"></i>Wet bulb</span> <span class="svelte-1b18sp1"><i class="z svelte-1b18sp1"></i>0°C</span>`;
			t12 = space();
			div3 = element("div");
			span4 = element("span");
			small1 = element("small");
			small1.textContent = "Terrain Tw";
			b1 = element("b");
			t14 = text(t14_value);
			t15 = space();
			span5 = element("span");
			small2 = element("small");
			small2.textContent = "Snowline";
			b2 = element("b");
			t17 = text(t17_value);
			t18 = space();
			div4 = element("div");
			div4.textContent = "Hover/touch for T, Td and Tw · +/- to zoom · Fit to reset";
			attr(small0, "class", "svelte-1b18sp1");
			attr(b0, "class", "svelte-1b18sp1");
			attr(div0, "class", "phase-banner svelte-1b18sp1");
			toggle_class(div0, "dry", !/*sounding*/ ctx[3].phaseKey);
			toggle_class(div0, "snow", /*sounding*/ ctx[3].phaseKey === 'snow');
			toggle_class(div0, "wet-snow", /*sounding*/ ctx[3].phaseKey === 'wet-snow');
			toggle_class(div0, "mix", /*sounding*/ ctx[3].phaseKey === 'mix');
			toggle_class(div0, "rain", /*sounding*/ ctx[3].phaseKey === 'rain');
			toggle_class(div0, "ice", /*sounding*/ ctx[3].phaseKey === 'ice-pellets');
			toggle_class(div0, "freezing-rain", /*sounding*/ ctx[3].phaseKey === 'freezing-rain');
			attr(rect, "x", "48");
			attr(rect, "y", "22");
			attr(rect, "width", "262");
			attr(rect, "height", "320");
			attr(rect, "rx", "9");
			attr(rect, "class", "plot-bg svelte-1b18sp1");
			attr(polyline0, "points", polyline0_points_value = /*sounding*/ ctx[3].tempPoints);
			attr(polyline0, "class", "temp-line svelte-1b18sp1");
			attr(polyline1, "points", polyline1_points_value = /*sounding*/ ctx[3].dewPoints);
			attr(polyline1, "class", "dew-line svelte-1b18sp1");
			attr(polyline2, "points", polyline2_points_value = /*sounding*/ ctx[3].wetBulbPoints);
			attr(polyline2, "class", "wetbulb-line svelte-1b18sp1");
			attr(svg, "viewBox", "0 0 330 390");
			attr(svg, "role", "img");
			attr(svg, "aria-label", "Temperature, dew point and wet-bulb vertical profile");
			attr(svg, "style", svg_style_value = `width:${/*zoom*/ ctx[8] * 100}%;`);
			attr(svg, "class", "svelte-1b18sp1");
			attr(div1, "class", "sounding-viewport svelte-1b18sp1");
			attr(div1, "tabindex", "0");
			attr(div1, "role", "application");
			attr(div1, "aria-label", "Zoomable forecast sounding");
			toggle_class(div1, "zoomed", /*zoom*/ ctx[8] > 1.001);
			attr(div2, "class", "key svelte-1b18sp1");
			attr(small1, "class", "svelte-1b18sp1");
			attr(b1, "class", "svelte-1b18sp1");
			attr(span4, "class", "svelte-1b18sp1");
			attr(small2, "class", "svelte-1b18sp1");
			attr(b2, "class", "svelte-1b18sp1");
			attr(span5, "class", "svelte-1b18sp1");
			attr(div3, "class", "stats svelte-1b18sp1");
			attr(div4, "class", "hint svelte-1b18sp1");
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			append(div0, small0);
			append(div0, b0);
			append(b0, t1);
			insert(target, t2, anchor);
			insert(target, div1, anchor);
			append(div1, svg);
			append(svg, rect);

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				if (each_blocks_2[i]) {
					each_blocks_2[i].m(svg, null);
				}
			}

			append(svg, each0_anchor);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(svg, null);
				}
			}

			append(svg, each1_anchor);
			if (if_block0) if_block0.m(svg, null);
			append(svg, if_block0_anchor);
			if (if_block1) if_block1.m(svg, null);
			append(svg, polyline0);
			append(svg, polyline1);
			append(svg, polyline2);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(svg, null);
				}
			}

			append(svg, each2_anchor);
			if (if_block2) if_block2.m(svg, null);
			/*svg_binding*/ ctx[29](svg);
			/*div1_binding*/ ctx[30](div1);
			insert(target, t3, anchor);
			if (if_block3) if_block3.m(target, anchor);
			insert(target, t4, anchor);
			insert(target, div2, anchor);
			insert(target, t12, anchor);
			insert(target, div3, anchor);
			append(div3, span4);
			append(span4, small1);
			append(span4, b1);
			append(b1, t14);
			append(div3, t15);
			append(div3, span5);
			append(span5, small2);
			append(span5, b2);
			append(b2, t17);
			insert(target, t18, anchor);
			insert(target, div4, anchor);

			if (!mounted) {
				dispose = [
					listen(div1, "wheel", prevent_default(/*handleWheel*/ ctx[16])),
					listen(div1, "pointerdown", /*startPlotPointer*/ ctx[17]),
					listen(div1, "pointermove", /*movePlotPointer*/ ctx[19]),
					listen(div1, "pointerup", /*endPlotPointer*/ ctx[20]),
					listen(div1, "pointercancel", /*endPlotPointer*/ ctx[20]),
					listen(div1, "pointerleave", /*leavePlot*/ ctx[18]),
					listen(div1, "dblclick", /*resetZoom*/ ctx[15]),
					listen(div1, "keydown", /*handleViewportKey*/ ctx[21])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*sounding*/ 8 && t1_value !== (t1_value = /*sounding*/ ctx[3].phaseLabel + "")) set_data(t1, t1_value);

			if (dirty[0] & /*sounding*/ 8) {
				toggle_class(div0, "dry", !/*sounding*/ ctx[3].phaseKey);
			}

			if (dirty[0] & /*sounding*/ 8) {
				toggle_class(div0, "snow", /*sounding*/ ctx[3].phaseKey === 'snow');
			}

			if (dirty[0] & /*sounding*/ 8) {
				toggle_class(div0, "wet-snow", /*sounding*/ ctx[3].phaseKey === 'wet-snow');
			}

			if (dirty[0] & /*sounding*/ 8) {
				toggle_class(div0, "mix", /*sounding*/ ctx[3].phaseKey === 'mix');
			}

			if (dirty[0] & /*sounding*/ 8) {
				toggle_class(div0, "rain", /*sounding*/ ctx[3].phaseKey === 'rain');
			}

			if (dirty[0] & /*sounding*/ 8) {
				toggle_class(div0, "ice", /*sounding*/ ctx[3].phaseKey === 'ice-pellets');
			}

			if (dirty[0] & /*sounding*/ 8) {
				toggle_class(div0, "freezing-rain", /*sounding*/ ctx[3].phaseKey === 'freezing-rain');
			}

			if (dirty[0] & /*sounding, units*/ 12) {
				each_value_2 = ensure_array_like(/*sounding*/ ctx[3].tempGrid);
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2$1(ctx, each_value_2, i);

					if (each_blocks_2[i]) {
						each_blocks_2[i].p(child_ctx, dirty);
					} else {
						each_blocks_2[i] = create_each_block_2$1(child_ctx);
						each_blocks_2[i].c();
						each_blocks_2[i].m(svg, each0_anchor);
					}
				}

				for (; i < each_blocks_2.length; i += 1) {
					each_blocks_2[i].d(1);
				}

				each_blocks_2.length = each_value_2.length;
			}

			if (dirty[0] & /*sounding*/ 8) {
				each_value_1 = ensure_array_like(/*sounding*/ ctx[3].pressureGrid);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$1(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_1$1(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(svg, each1_anchor);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_1.length;
			}

			if (/*sounding*/ ctx[3].terrainY !== null) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_4$2(ctx);
					if_block0.c();
					if_block0.m(svg, if_block0_anchor);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*sounding*/ ctx[3].snowlineY !== null) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_3$2(ctx);
					if_block1.c();
					if_block1.m(svg, polyline0);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty[0] & /*sounding*/ 8 && polyline0_points_value !== (polyline0_points_value = /*sounding*/ ctx[3].tempPoints)) {
				attr(polyline0, "points", polyline0_points_value);
			}

			if (dirty[0] & /*sounding*/ 8 && polyline1_points_value !== (polyline1_points_value = /*sounding*/ ctx[3].dewPoints)) {
				attr(polyline1, "points", polyline1_points_value);
			}

			if (dirty[0] & /*sounding*/ 8 && polyline2_points_value !== (polyline2_points_value = /*sounding*/ ctx[3].wetBulbPoints)) {
				attr(polyline2, "points", polyline2_points_value);
			}

			if (dirty[0] & /*sounding*/ 8) {
				each_value = ensure_array_like(/*sounding*/ ctx[3].nodes);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(svg, each2_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (/*hoverNode*/ ctx[10]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_2$2(ctx);
					if_block2.c();
					if_block2.m(svg, null);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (dirty[0] & /*zoom*/ 256 && svg_style_value !== (svg_style_value = `width:${/*zoom*/ ctx[8] * 100}%;`)) {
				attr(svg, "style", svg_style_value);
			}

			if (dirty[0] & /*zoom*/ 256) {
				toggle_class(div1, "zoomed", /*zoom*/ ctx[8] > 1.001);
			}

			if (/*hoverNode*/ ctx[10]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block_1$2(ctx);
					if_block3.c();
					if_block3.m(t4.parentNode, t4);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (dirty[0] & /*sounding*/ 8 && t14_value !== (t14_value = /*sounding*/ ctx[3].surfaceTw + "")) set_data(t14, t14_value);
			if (dirty[0] & /*sounding*/ 8 && t17_value !== (t17_value = /*sounding*/ ctx[3].snowline + "")) set_data(t17, t17_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div0);
				detach(t2);
				detach(div1);
				detach(t3);
				detach(t4);
				detach(div2);
				detach(t12);
				detach(div3);
				detach(t18);
				detach(div4);
			}

			destroy_each(each_blocks_2, detaching);
			destroy_each(each_blocks_1, detaching);
			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			destroy_each(each_blocks, detaching);
			if (if_block2) if_block2.d();
			/*svg_binding*/ ctx[29](null);
			/*div1_binding*/ ctx[30](null);
			if (if_block3) if_block3.d(detaching);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (27:8) {#each sounding.tempGrid as g}
function create_each_block_2$1(ctx) {
	let line;
	let line_x__value;
	let line_x__value_1;
	let text_1;

	let t0_value = (/*units*/ ctx[2] === 'imperial'
	? Math.round(/*g*/ ctx[51].value * 9 / 5 + 32)
	: /*g*/ ctx[51].value) + "";

	let t0;
	let t1;
	let text_1_x_value;

	return {
		c() {
			line = svg_element("line");
			text_1 = svg_element("text");
			t0 = text(t0_value);
			t1 = text("°");
			attr(line, "x1", line_x__value = /*g*/ ctx[51].x);
			attr(line, "x2", line_x__value_1 = /*g*/ ctx[51].x);
			attr(line, "y1", "22");
			attr(line, "y2", "342");
			attr(line, "class", "temp-grid svelte-1b18sp1");
			toggle_class(line, "zero", /*g*/ ctx[51].value === 0);
			attr(text_1, "x", text_1_x_value = /*g*/ ctx[51].x);
			attr(text_1, "y", "360");
			attr(text_1, "text-anchor", "middle");
			attr(text_1, "class", "axis svelte-1b18sp1");
		},
		m(target, anchor) {
			insert(target, line, anchor);
			insert(target, text_1, anchor);
			append(text_1, t0);
			append(text_1, t1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*sounding*/ 8 && line_x__value !== (line_x__value = /*g*/ ctx[51].x)) {
				attr(line, "x1", line_x__value);
			}

			if (dirty[0] & /*sounding*/ 8 && line_x__value_1 !== (line_x__value_1 = /*g*/ ctx[51].x)) {
				attr(line, "x2", line_x__value_1);
			}

			if (dirty[0] & /*sounding*/ 8) {
				toggle_class(line, "zero", /*g*/ ctx[51].value === 0);
			}

			if (dirty[0] & /*units, sounding*/ 12 && t0_value !== (t0_value = (/*units*/ ctx[2] === 'imperial'
			? Math.round(/*g*/ ctx[51].value * 9 / 5 + 32)
			: /*g*/ ctx[51].value) + "")) set_data(t0, t0_value);

			if (dirty[0] & /*sounding*/ 8 && text_1_x_value !== (text_1_x_value = /*g*/ ctx[51].x)) {
				attr(text_1, "x", text_1_x_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(line);
				detach(text_1);
			}
		}
	};
}

// (31:8) {#each sounding.pressureGrid as g}
function create_each_block_1$1(ctx) {
	let line;
	let line_y__value;
	let line_y__value_1;
	let text_1;
	let t_value = /*g*/ ctx[51].label + "";
	let t;
	let text_1_y_value;

	return {
		c() {
			line = svg_element("line");
			text_1 = svg_element("text");
			t = text(t_value);
			attr(line, "x1", "48");
			attr(line, "x2", "310");
			attr(line, "y1", line_y__value = /*g*/ ctx[51].y);
			attr(line, "y2", line_y__value_1 = /*g*/ ctx[51].y);
			attr(line, "class", "pressure-grid svelte-1b18sp1");
			attr(text_1, "x", "42");
			attr(text_1, "y", text_1_y_value = /*g*/ ctx[51].y + 3);
			attr(text_1, "text-anchor", "end");
			attr(text_1, "class", "axis svelte-1b18sp1");
		},
		m(target, anchor) {
			insert(target, line, anchor);
			insert(target, text_1, anchor);
			append(text_1, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*sounding*/ 8 && line_y__value !== (line_y__value = /*g*/ ctx[51].y)) {
				attr(line, "y1", line_y__value);
			}

			if (dirty[0] & /*sounding*/ 8 && line_y__value_1 !== (line_y__value_1 = /*g*/ ctx[51].y)) {
				attr(line, "y2", line_y__value_1);
			}

			if (dirty[0] & /*sounding*/ 8 && t_value !== (t_value = /*g*/ ctx[51].label + "")) set_data(t, t_value);

			if (dirty[0] & /*sounding*/ 8 && text_1_y_value !== (text_1_y_value = /*g*/ ctx[51].y + 3)) {
				attr(text_1, "y", text_1_y_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(line);
				detach(text_1);
			}
		}
	};
}

// (36:8) {#if sounding.terrainY !== null}
function create_if_block_4$2(ctx) {
	let rect;
	let rect_y_value;
	let rect_height_value;
	let line;
	let line_y__value;
	let line_y__value_1;
	let text_1;
	let t;
	let text_1_y_value;

	return {
		c() {
			rect = svg_element("rect");
			line = svg_element("line");
			text_1 = svg_element("text");
			t = text("terrain");
			attr(rect, "x", "48");
			attr(rect, "y", rect_y_value = /*sounding*/ ctx[3].terrainY);
			attr(rect, "width", "262");
			attr(rect, "height", rect_height_value = Math.max(0, 342 - /*sounding*/ ctx[3].terrainY));
			attr(rect, "class", "terrain-zone svelte-1b18sp1");
			attr(line, "x1", "48");
			attr(line, "x2", "310");
			attr(line, "y1", line_y__value = /*sounding*/ ctx[3].terrainY);
			attr(line, "y2", line_y__value_1 = /*sounding*/ ctx[3].terrainY);
			attr(line, "class", "terrain-line svelte-1b18sp1");
			attr(text_1, "x", "306");
			attr(text_1, "y", text_1_y_value = Math.max(31, /*sounding*/ ctx[3].terrainY - 4));
			attr(text_1, "text-anchor", "end");
			attr(text_1, "class", "terrain-text svelte-1b18sp1");
		},
		m(target, anchor) {
			insert(target, rect, anchor);
			insert(target, line, anchor);
			insert(target, text_1, anchor);
			append(text_1, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*sounding*/ 8 && rect_y_value !== (rect_y_value = /*sounding*/ ctx[3].terrainY)) {
				attr(rect, "y", rect_y_value);
			}

			if (dirty[0] & /*sounding*/ 8 && rect_height_value !== (rect_height_value = Math.max(0, 342 - /*sounding*/ ctx[3].terrainY))) {
				attr(rect, "height", rect_height_value);
			}

			if (dirty[0] & /*sounding*/ 8 && line_y__value !== (line_y__value = /*sounding*/ ctx[3].terrainY)) {
				attr(line, "y1", line_y__value);
			}

			if (dirty[0] & /*sounding*/ 8 && line_y__value_1 !== (line_y__value_1 = /*sounding*/ ctx[3].terrainY)) {
				attr(line, "y2", line_y__value_1);
			}

			if (dirty[0] & /*sounding*/ 8 && text_1_y_value !== (text_1_y_value = Math.max(31, /*sounding*/ ctx[3].terrainY - 4))) {
				attr(text_1, "y", text_1_y_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(rect);
				detach(line);
				detach(text_1);
			}
		}
	};
}

// (41:8) {#if sounding.snowlineY !== null}
function create_if_block_3$2(ctx) {
	let line;
	let line_y__value;
	let line_y__value_1;
	let rect;
	let rect_y_value;
	let text_1;
	let t0;
	let t1_value = /*sounding*/ ctx[3].snowline + "";
	let t1;
	let text_1_y_value;

	return {
		c() {
			line = svg_element("line");
			rect = svg_element("rect");
			text_1 = svg_element("text");
			t0 = text("Snowline ");
			t1 = text(t1_value);
			attr(line, "x1", "48");
			attr(line, "x2", "310");
			attr(line, "y1", line_y__value = /*sounding*/ ctx[3].snowlineY);
			attr(line, "y2", line_y__value_1 = /*sounding*/ ctx[3].snowlineY);
			attr(line, "class", "snowline-marker svelte-1b18sp1");
			attr(rect, "x", "222");
			attr(rect, "y", rect_y_value = Math.max(24, /*sounding*/ ctx[3].snowlineY - 10));
			attr(rect, "width", "84");
			attr(rect, "height", "12");
			attr(rect, "rx", "3");
			attr(rect, "class", "snowline-tag-bg svelte-1b18sp1");
			attr(text_1, "x", "302");
			attr(text_1, "y", text_1_y_value = Math.max(33, /*sounding*/ ctx[3].snowlineY - 1));
			attr(text_1, "text-anchor", "end");
			attr(text_1, "class", "snowline-tag svelte-1b18sp1");
		},
		m(target, anchor) {
			insert(target, line, anchor);
			insert(target, rect, anchor);
			insert(target, text_1, anchor);
			append(text_1, t0);
			append(text_1, t1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*sounding*/ 8 && line_y__value !== (line_y__value = /*sounding*/ ctx[3].snowlineY)) {
				attr(line, "y1", line_y__value);
			}

			if (dirty[0] & /*sounding*/ 8 && line_y__value_1 !== (line_y__value_1 = /*sounding*/ ctx[3].snowlineY)) {
				attr(line, "y2", line_y__value_1);
			}

			if (dirty[0] & /*sounding*/ 8 && rect_y_value !== (rect_y_value = Math.max(24, /*sounding*/ ctx[3].snowlineY - 10))) {
				attr(rect, "y", rect_y_value);
			}

			if (dirty[0] & /*sounding*/ 8 && t1_value !== (t1_value = /*sounding*/ ctx[3].snowline + "")) set_data(t1, t1_value);

			if (dirty[0] & /*sounding*/ 8 && text_1_y_value !== (text_1_y_value = Math.max(33, /*sounding*/ ctx[3].snowlineY - 1))) {
				attr(text_1, "y", text_1_y_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(line);
				detach(rect);
				detach(text_1);
			}
		}
	};
}

// (51:8) {#each sounding.nodes as n}
function create_each_block$1(ctx) {
	let circle0;
	let circle0_cx_value;
	let circle0_cy_value;
	let circle1;
	let circle1_cx_value;
	let circle1_cy_value;

	return {
		c() {
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			attr(circle0, "cx", circle0_cx_value = /*n*/ ctx[48].tx);
			attr(circle0, "cy", circle0_cy_value = /*n*/ ctx[48].y);
			attr(circle0, "r", "2.1");
			attr(circle0, "class", "temp-dot svelte-1b18sp1");
			attr(circle1, "cx", circle1_cx_value = /*n*/ ctx[48].dx);
			attr(circle1, "cy", circle1_cy_value = /*n*/ ctx[48].y);
			attr(circle1, "r", "2");
			attr(circle1, "class", "dew-dot svelte-1b18sp1");
		},
		m(target, anchor) {
			insert(target, circle0, anchor);
			insert(target, circle1, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*sounding*/ 8 && circle0_cx_value !== (circle0_cx_value = /*n*/ ctx[48].tx)) {
				attr(circle0, "cx", circle0_cx_value);
			}

			if (dirty[0] & /*sounding*/ 8 && circle0_cy_value !== (circle0_cy_value = /*n*/ ctx[48].y)) {
				attr(circle0, "cy", circle0_cy_value);
			}

			if (dirty[0] & /*sounding*/ 8 && circle1_cx_value !== (circle1_cx_value = /*n*/ ctx[48].dx)) {
				attr(circle1, "cx", circle1_cx_value);
			}

			if (dirty[0] & /*sounding*/ 8 && circle1_cy_value !== (circle1_cy_value = /*n*/ ctx[48].y)) {
				attr(circle1, "cy", circle1_cy_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(circle0);
				detach(circle1);
			}
		}
	};
}

// (55:8) {#if hoverNode}
function create_if_block_2$2(ctx) {
	let line;
	let line_y__value;
	let line_y__value_1;
	let circle0;
	let circle0_cx_value;
	let circle0_cy_value;
	let circle1;
	let circle1_cx_value;
	let circle1_cy_value;
	let circle2;
	let circle2_cx_value;
	let circle2_cy_value;

	return {
		c() {
			line = svg_element("line");
			circle0 = svg_element("circle");
			circle1 = svg_element("circle");
			circle2 = svg_element("circle");
			attr(line, "x1", "48");
			attr(line, "x2", "310");
			attr(line, "y1", line_y__value = /*hoverNode*/ ctx[10].y);
			attr(line, "y2", line_y__value_1 = /*hoverNode*/ ctx[10].y);
			attr(line, "class", "hover-level svelte-1b18sp1");
			attr(circle0, "cx", circle0_cx_value = /*hoverNode*/ ctx[10].tx);
			attr(circle0, "cy", circle0_cy_value = /*hoverNode*/ ctx[10].y);
			attr(circle0, "r", "4");
			attr(circle0, "class", "hover-temp svelte-1b18sp1");
			attr(circle1, "cx", circle1_cx_value = /*hoverNode*/ ctx[10].dx);
			attr(circle1, "cy", circle1_cy_value = /*hoverNode*/ ctx[10].y);
			attr(circle1, "r", "4");
			attr(circle1, "class", "hover-dew svelte-1b18sp1");
			attr(circle2, "cx", circle2_cx_value = /*hoverNode*/ ctx[10].wx);
			attr(circle2, "cy", circle2_cy_value = /*hoverNode*/ ctx[10].y);
			attr(circle2, "r", "4");
			attr(circle2, "class", "hover-wet svelte-1b18sp1");
		},
		m(target, anchor) {
			insert(target, line, anchor);
			insert(target, circle0, anchor);
			insert(target, circle1, anchor);
			insert(target, circle2, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*hoverNode*/ 1024 && line_y__value !== (line_y__value = /*hoverNode*/ ctx[10].y)) {
				attr(line, "y1", line_y__value);
			}

			if (dirty[0] & /*hoverNode*/ 1024 && line_y__value_1 !== (line_y__value_1 = /*hoverNode*/ ctx[10].y)) {
				attr(line, "y2", line_y__value_1);
			}

			if (dirty[0] & /*hoverNode*/ 1024 && circle0_cx_value !== (circle0_cx_value = /*hoverNode*/ ctx[10].tx)) {
				attr(circle0, "cx", circle0_cx_value);
			}

			if (dirty[0] & /*hoverNode*/ 1024 && circle0_cy_value !== (circle0_cy_value = /*hoverNode*/ ctx[10].y)) {
				attr(circle0, "cy", circle0_cy_value);
			}

			if (dirty[0] & /*hoverNode*/ 1024 && circle1_cx_value !== (circle1_cx_value = /*hoverNode*/ ctx[10].dx)) {
				attr(circle1, "cx", circle1_cx_value);
			}

			if (dirty[0] & /*hoverNode*/ 1024 && circle1_cy_value !== (circle1_cy_value = /*hoverNode*/ ctx[10].y)) {
				attr(circle1, "cy", circle1_cy_value);
			}

			if (dirty[0] & /*hoverNode*/ 1024 && circle2_cx_value !== (circle2_cx_value = /*hoverNode*/ ctx[10].wx)) {
				attr(circle2, "cx", circle2_cx_value);
			}

			if (dirty[0] & /*hoverNode*/ 1024 && circle2_cy_value !== (circle2_cy_value = /*hoverNode*/ ctx[10].y)) {
				attr(circle2, "cy", circle2_cy_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(line);
				detach(circle0);
				detach(circle1);
				detach(circle2);
			}
		}
	};
}

// (63:4) {#if hoverNode}
function create_if_block_1$2(ctx) {
	let div;
	let b;
	let t0_value = Math.round(/*hoverNode*/ ctx[10].pressure) + "";
	let t0;
	let t1;
	let t2_value = formatElevation(/*hoverNode*/ ctx[10].height, /*units*/ ctx[2]) + "";
	let t2;
	let span0;
	let t3;
	let t4_value = formatTemperature(/*hoverNode*/ ctx[10].temp, /*units*/ ctx[2]) + "";
	let t4;
	let span1;
	let t5;
	let t6_value = formatTemperature(/*hoverNode*/ ctx[10].dew, /*units*/ ctx[2]) + "";
	let t6;
	let span2;
	let t7;
	let t8_value = formatTemperature(/*hoverNode*/ ctx[10].wet, /*units*/ ctx[2]) + "";
	let t8;

	return {
		c() {
			div = element("div");
			b = element("b");
			t0 = text(t0_value);
			t1 = text(" hPa · ");
			t2 = text(t2_value);
			span0 = element("span");
			t3 = text("T ");
			t4 = text(t4_value);
			span1 = element("span");
			t5 = text("Td ");
			t6 = text(t6_value);
			span2 = element("span");
			t7 = text("Tw ");
			t8 = text(t8_value);
			attr(b, "class", "svelte-1b18sp1");
			attr(span0, "class", "svelte-1b18sp1");
			attr(span1, "class", "svelte-1b18sp1");
			attr(span2, "class", "svelte-1b18sp1");
			attr(div, "class", "sounding-hover svelte-1b18sp1");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, b);
			append(b, t0);
			append(b, t1);
			append(b, t2);
			append(div, span0);
			append(span0, t3);
			append(span0, t4);
			append(div, span1);
			append(span1, t5);
			append(span1, t6);
			append(div, span2);
			append(span2, t7);
			append(span2, t8);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*hoverNode*/ 1024 && t0_value !== (t0_value = Math.round(/*hoverNode*/ ctx[10].pressure) + "")) set_data(t0, t0_value);
			if (dirty[0] & /*hoverNode, units*/ 1028 && t2_value !== (t2_value = formatElevation(/*hoverNode*/ ctx[10].height, /*units*/ ctx[2]) + "")) set_data(t2, t2_value);
			if (dirty[0] & /*hoverNode, units*/ 1028 && t4_value !== (t4_value = formatTemperature(/*hoverNode*/ ctx[10].temp, /*units*/ ctx[2]) + "")) set_data(t4, t4_value);
			if (dirty[0] & /*hoverNode, units*/ 1028 && t6_value !== (t6_value = formatTemperature(/*hoverNode*/ ctx[10].dew, /*units*/ ctx[2]) + "")) set_data(t6, t6_value);
			if (dirty[0] & /*hoverNode, units*/ 1028 && t8_value !== (t8_value = formatTemperature(/*hoverNode*/ ctx[10].wet, /*units*/ ctx[2]) + "")) set_data(t8, t8_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

function create_fragment$3(ctx) {
	let div2;
	let div1;
	let t0;
	let div0;
	let button0;
	let t1_value = (/*pngBusy*/ ctx[9] ? 'Saving…' : 'Save image') + "";
	let t1;
	let t2;
	let button1;
	let t4;
	let button2;
	let t6;
	let button3;
	let t8;
	let t9;
	let div2_style_value;
	let mounted;
	let dispose;
	let if_block0 = !/*embedded*/ ctx[1] && create_if_block_6$1(ctx);
	let if_block1 = !/*embedded*/ ctx[1] && create_if_block_5$1(ctx);

	function select_block_type(ctx, dirty) {
		if (/*sounding*/ ctx[3]) return create_if_block$2;
		return create_else_block$1;
	}

	let current_block_type = select_block_type(ctx);
	let if_block2 = current_block_type(ctx);

	return {
		c() {
			div2 = element("div");
			div1 = element("div");
			if (if_block0) if_block0.c();
			t0 = space();
			div0 = element("div");
			button0 = element("button");
			t1 = text(t1_value);
			t2 = space();
			button1 = element("button");
			button1.textContent = "−";
			t4 = space();
			button2 = element("button");
			button2.textContent = "Fit";
			t6 = space();
			button3 = element("button");
			button3.textContent = "+";
			t8 = space();
			if (if_block1) if_block1.c();
			t9 = space();
			if_block2.c();
			attr(button0, "class", "png svelte-1b18sp1");
			attr(button0, "type", "button");
			button0.disabled = /*pngBusy*/ ctx[9];
			attr(button1, "type", "button");
			attr(button1, "title", "Zoom out");
			attr(button1, "aria-label", "Zoom out");
			attr(button1, "class", "svelte-1b18sp1");
			attr(button2, "class", "zoom-readout svelte-1b18sp1");
			attr(button2, "type", "button");
			attr(button2, "title", "Fit sounding");
			attr(button2, "aria-label", "Fit sounding");
			attr(button3, "type", "button");
			attr(button3, "title", "Zoom in");
			attr(button3, "aria-label", "Zoom in");
			attr(button3, "class", "svelte-1b18sp1");
			attr(div0, "class", "actions svelte-1b18sp1");
			attr(div1, "class", "head svelte-1b18sp1");
			toggle_class(div1, "embedded-head", /*embedded*/ ctx[1]);
			attr(div2, "class", "sounding-shell svelte-1b18sp1");
			attr(div2, "role", "group");
			attr(div2, "aria-label", "Forecast sounding");

			attr(div2, "style", div2_style_value = /*embedded*/ ctx[1]
			? undefined
			: `left:${/*position*/ ctx[7].x}px;top:${/*position*/ ctx[7].y}px;`);

			toggle_class(div2, "sounding-embedded", /*embedded*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, div1);
			if (if_block0) if_block0.m(div1, null);
			append(div1, t0);
			append(div1, div0);
			append(div0, button0);
			append(button0, t1);
			append(div0, t2);
			append(div0, button1);
			append(div0, t4);
			append(div0, button2);
			append(div0, t6);
			append(div0, button3);
			append(div0, t8);
			if (if_block1) if_block1.m(div0, null);
			append(div2, t9);
			if_block2.m(div2, null);
			/*div2_binding*/ ctx[31](div2);

			if (!mounted) {
				dispose = [
					listen(button0, "click", /*downloadPng*/ ctx[22]),
					listen(button1, "click", /*click_handler*/ ctx[26]),
					listen(button2, "click", /*resetZoom*/ ctx[15]),
					listen(button3, "click", /*click_handler_1*/ ctx[27])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (!/*embedded*/ ctx[1]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_6$1(ctx);
					if_block0.c();
					if_block0.m(div1, t0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty[0] & /*pngBusy*/ 512 && t1_value !== (t1_value = (/*pngBusy*/ ctx[9] ? 'Saving…' : 'Save image') + "")) set_data(t1, t1_value);

			if (dirty[0] & /*pngBusy*/ 512) {
				button0.disabled = /*pngBusy*/ ctx[9];
			}

			if (!/*embedded*/ ctx[1]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_5$1(ctx);
					if_block1.c();
					if_block1.m(div0, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty[0] & /*embedded*/ 2) {
				toggle_class(div1, "embedded-head", /*embedded*/ ctx[1]);
			}

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block2) {
				if_block2.p(ctx, dirty);
			} else {
				if_block2.d(1);
				if_block2 = current_block_type(ctx);

				if (if_block2) {
					if_block2.c();
					if_block2.m(div2, null);
				}
			}

			if (dirty[0] & /*embedded, position*/ 130 && div2_style_value !== (div2_style_value = /*embedded*/ ctx[1]
			? undefined
			: `left:${/*position*/ ctx[7].x}px;top:${/*position*/ ctx[7].y}px;`)) {
				attr(div2, "style", div2_style_value);
			}

			if (dirty[0] & /*embedded*/ 2) {
				toggle_class(div2, "sounding-embedded", /*embedded*/ ctx[1]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(div2);
			}

			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if_block2.d();
			/*div2_binding*/ ctx[31](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

const MIN_ZOOM = 1;
const MAX_ZOOM = 3.5;

function clampZoom(value) {
	return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, value));
}

function instance$3($$self, $$props, $$invalidate) {
	let sounding;
	let validLabel;
	let { point } = $$props;
	let { terrainM = null } = $$props;
	let { placeName = '' } = $$props;
	let { embedded = false } = $$props;
	let { units = 'metric' } = $$props;
	const dispatch = createEventDispatcher();
	let timestamp = Date.now();

	const onTimestamp = v => {
		const n = Number(v);
		if (Number.isFinite(n)) $$invalidate(25, timestamp = n);
	};

	let shell = null;
	let svgEl = null;
	let viewport = null;
	let position = { x: 24, y: 64 };
	let dragPointerId = null;
	let dragOffset = { x: 0, y: 0 };
	let zoom = 1;
	let pngBusy = false;
	const plotPointers = new Map();
	let panPointerId = null;
	let panStart = { x: 0, y: 0, left: 0, top: 0 };
	let pinchDistance = 0;
	let hoverNode = null;

	function formatValid(p, target) {
		if (!p?.times?.length) return 'Selected forecast time';
		const index = forecastIntervalIndex(p.times, target);
		if (index < 0) return 'Forecast time unavailable';
		const t = p.times[index];

		return new Date(t).toLocaleString(undefined, {
			weekday: 'short',
			day: 'numeric',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function clampPosition(x, y) {
		const rect = shell?.getBoundingClientRect();
		const w = rect?.width ?? 390, h = rect?.height ?? 520;

		return {
			x: Math.max(6, Math.min(window.innerWidth - w - 6, x)),
			y: Math.max(6, Math.min(window.innerHeight - h - 6, y))
		};
	}

	function startDrag(event) {
		if (!shell) return;
		dragPointerId = event.pointerId;
		const rect = shell.getBoundingClientRect();

		dragOffset = {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};

		window.addEventListener('pointermove', dragMove);
		window.addEventListener('pointerup', stopDrag, { once: true });
		event.preventDefault();
	}

	function dragMove(event) {
		if (event.pointerId === dragPointerId) $$invalidate(7, position = clampPosition(event.clientX - dragOffset.x, event.clientY - dragOffset.y));
	}

	function stopDrag(event) {
		if (event.pointerId === dragPointerId) dragPointerId = null;
		window.removeEventListener('pointermove', dragMove);
	}

	function zoomAround(value, clientX, clientY) {
		if (!viewport) {
			$$invalidate(8, zoom = clampZoom(value));
			return;
		}

		const next = clampZoom(value), old = zoom;
		if (Math.abs(next - old) < 0.002) return;
		const rect = viewport.getBoundingClientRect();

		const anchorX = clientX === undefined
		? rect.width / 2
		: Math.max(0, Math.min(rect.width, clientX - rect.left));

		const anchorY = clientY === undefined
		? rect.height / 2
		: Math.max(0, Math.min(rect.height, clientY - rect.top));

		const contentX = (viewport.scrollLeft + anchorX) / old;
		const contentY = (viewport.scrollTop + anchorY) / old;
		$$invalidate(8, zoom = next);

		requestAnimationFrame(() => {
			if (!viewport) return;
			$$invalidate(6, viewport.scrollLeft = Math.max(0, contentX * next - anchorX), viewport);
			$$invalidate(6, viewport.scrollTop = Math.max(0, contentY * next - anchorY), viewport);
		});
	}

	function zoomAtCentre(value) {
		zoomAround(value);
	}

	function resetZoom() {
		$$invalidate(8, zoom = 1);

		requestAnimationFrame(() => {
			if (viewport) {
				$$invalidate(6, viewport.scrollLeft = 0, viewport);
				$$invalidate(6, viewport.scrollTop = 0, viewport);
			}
		});
	}

	function handleWheel(event) {
		const factor = Math.exp(-event.deltaY * 0.00135);
		zoomAround(zoom * factor, event.clientX, event.clientY);
	}

	function pointerDistance() {
		const pts = [...plotPointers.values()];

		return pts.length < 2
		? 0
		: Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
	}

	function pointerCentre() {
		const pts = [...plotPointers.values()];
		if (pts.length < 2) return null;

		return {
			x: (pts[0].x + pts[1].x) / 2,
			y: (pts[0].y + pts[1].y) / 2
		};
	}

	function startPlotPointer(event) {
		if (!viewport || event.pointerType === 'mouse' && event.button !== 0) return;
		inspectPointer(event);
		plotPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

		try {
			viewport.setPointerCapture(event.pointerId);
		} catch {
			
		}

		if (plotPointers.size === 1) {
			panPointerId = event.pointerId;

			panStart = {
				x: event.clientX,
				y: event.clientY,
				left: viewport.scrollLeft,
				top: viewport.scrollTop
			};
		} else if (plotPointers.size === 2) {
			panPointerId = null;
			pinchDistance = pointerDistance();
		}
	}

	function inspectPointer(event) {
		if (!svgEl || !viewport || !sounding?.nodes?.length) return;
		const rect = svgEl.getBoundingClientRect();
		const sx = (event.clientX - rect.left) / Math.max(1, rect.width) * 330;
		const sy = (event.clientY - rect.top) / Math.max(1, rect.height) * 390;

		if (sx < 48 || sx > 310 || sy < 22 || sy > 342) {
			if (!plotPointers.size) $$invalidate(10, hoverNode = null);
			return;
		}

		let nearest = sounding.nodes[0], distance = Math.abs(nearest.y - sy);

		for (let i = 1; i < sounding.nodes.length; i++) {
			const d = Math.abs(sounding.nodes[i].y - sy);

			if (d < distance) {
				nearest = sounding.nodes[i];
				distance = d;
			}
		}

		$$invalidate(10, hoverNode = { ...nearest });
	}

	function leavePlot() {
		if (!plotPointers.size) $$invalidate(10, hoverNode = null);
	}

	function movePlotPointer(event) {
		inspectPointer(event);
		if (!viewport || !plotPointers.has(event.pointerId)) return;
		plotPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

		if (plotPointers.size >= 2) {
			const distance = pointerDistance(), centre = pointerCentre();
			if (pinchDistance > 0 && distance > 0 && centre) zoomAround(zoom * (distance / pinchDistance), centre.x, centre.y);
			pinchDistance = distance;
			event.preventDefault();
			return;
		}

		if (panPointerId === event.pointerId && zoom > 1.001) {
			$$invalidate(6, viewport.scrollLeft = panStart.left - (event.clientX - panStart.x), viewport);
			$$invalidate(6, viewport.scrollTop = panStart.top - (event.clientY - panStart.y), viewport);
			event.preventDefault();
		}
	}

	function endPlotPointer(event) {
		plotPointers.delete(event.pointerId);

		try {
			viewport?.releasePointerCapture(event.pointerId);
		} catch {
			
		}

		if (plotPointers.size < 2) pinchDistance = 0;
		if (panPointerId === event.pointerId) panPointerId = null;

		if (plotPointers.size === 1 && viewport) {
			const [id, p] = [...plotPointers.entries()][0];
			panPointerId = id;

			panStart = {
				x: p.x,
				y: p.y,
				left: viewport.scrollLeft,
				top: viewport.scrollTop
			};
		}
	}

	function handleViewportKey(event) {
		if (event.key === '+' || event.key === '=') {
			event.preventDefault();
			zoomAtCentre(zoom * 1.25);
		} else if (event.key === '-') {
			event.preventDefault();
			zoomAtCentre(zoom / 1.25);
		} else if (event.key === '0' || event.key === 'Escape') {
			event.preventDefault();
			resetZoom();
		}
	}

	async function downloadPng() {
		if (!svgEl || pngBusy) return;
		$$invalidate(9, pngBusy = true);

		try {
			const clone = svgEl.cloneNode(true);
			clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
			clone.setAttribute('width', '1320');
			clone.setAttribute('height', '1560');
			const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
			style.textContent = 'text{font-family:Arial,sans-serif}.plot-bg{fill:#0d171d;stroke:#263a46}.terrain-zone{fill:#392716;opacity:.32}.terrain-line{stroke:#ffae56;stroke-width:1.5;stroke-dasharray:5 4}.terrain-text{fill:#ffbd75;font-size:7px}.snowline-marker{stroke:#69d4ff;stroke-width:1.5;stroke-dasharray:4 3}.snowline-tag-bg{fill:#102b36}.snowline-tag{fill:#aeeaff;font-size:7px;font-weight:700}.temp-grid{stroke:#2a3c46}.temp-grid.zero{stroke:#75caef;stroke-width:1.3}.pressure-grid{stroke:#2a3c46}.axis{fill:#94a7b1;font-size:7px}.temp-line{fill:none;stroke:#ff765f;stroke-width:2.4}.dew-line{fill:none;stroke:#72d98b;stroke-width:2.1}.wetbulb-line{fill:none;stroke:#69d4ff;stroke-width:1.7;stroke-dasharray:4 3}.temp-dot{fill:#ff765f}.dew-dot{fill:#72d98b}';
			clone.insertBefore(style, clone.firstChild);
			const blob = new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml' });
			const url = URL.createObjectURL(blob), img = new Image();

			await new Promise((resolve, reject) => {
					img.onload = () => resolve();
					img.onerror = () => reject(new Error('Sounding image failed'));
					img.src = url;
				});

			const canvas = document.createElement('canvas');
			canvas.width = 1320;
			canvas.height = 1760;
			const ctx = canvas.getContext('2d');
			if (!ctx) throw new Error('No canvas');
			ctx.fillStyle = '#0b141a';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = '#fff';
			ctx.font = '700 48px Arial';
			ctx.fillText('Wintry forecast · sounding', 54, 70);
			ctx.fillStyle = '#c3d0d7';
			ctx.font = '26px Arial';
			ctx.fillText(placeName || 'Selected point', 54, 112);
			ctx.fillStyle = '#6ecdf2';
			ctx.font = '22px Arial';
			ctx.fillText(validLabel, 54, 148);
			ctx.drawImage(img, 0, 170, 1320, 1560);
			URL.revokeObjectURL(url);
			const png = await new Promise((resolve, reject) => canvas.toBlob(v => v ? resolve(v) : reject(new Error('PNG failed')), 'image/png'));
			const href = URL.createObjectURL(png), a = document.createElement('a');
			a.href = href;
			a.download = `wintry-sounding-${(placeName || 'point').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
			document.body.appendChild(a);
			a.click();
			a.remove();
			setTimeout(() => URL.revokeObjectURL(href), 30000);
		} catch(e) {
			console.warn('Wintry forecast sounding PNG failed', e);
		} finally {
			$$invalidate(9, pngBusy = false);
		}
	}

	function buildSounding(p, terrain, target, units) {
		if (!p?.times?.length) return null;
		const idx = forecastIntervalIndex(p.times, target);
		if (idx < 0) return null;
		let profile;

		try {
			profile = buildProfile(p.forecast, idx).filter(v => Number.isFinite(v.heightM) && Number.isFinite(v.tempC) && Number.isFinite(v.dewpointC) && Number.isFinite(v.wetBulbC)).sort((a, b) => a.heightM - b.heightM);
		} catch {
			return null;
		}

		if (profile.length < 3) return null;

		const bottomH = Math.min(...profile.map(v => v.heightM)),
			topH = Math.max(...profile.map(v => v.heightM));

		const temps = profile.flatMap(v => [v.tempC, v.dewpointC, v.wetBulbC]);

		let minT = Math.floor((Math.min(...temps) - 4) / 10) * 10,
			maxT = Math.ceil((Math.max(...temps) + 4) / 10) * 10;

		minT = Math.min(minT, -20);
		maxT = Math.max(maxT, 10);
		if (maxT - minT < 40) maxT = minT + 40;
		const x = t => 48 + (t - minT) / Math.max(1, maxT - minT) * 262;
		const y = h => 342 - (h - bottomH) / Math.max(1, topH - bottomH) * 320;
		const tempPoints = profile.map(v => `${x(v.tempC).toFixed(1)},${y(v.heightM).toFixed(1)}`).join(' ');
		const dewPoints = profile.map(v => `${x(v.dewpointC).toFixed(1)},${y(v.heightM).toFixed(1)}`).join(' ');
		const wetBulbPoints = profile.map(v => `${x(v.wetBulbC).toFixed(1)},${y(v.heightM).toFixed(1)}`).join(' ');

		const nodes = profile.map(v => ({
			tx: x(v.tempC),
			dx: x(v.dewpointC),
			wx: x(v.wetBulbC),
			y: y(v.heightM),
			pressure: v.pressureHpa,
			height: v.heightM,
			temp: v.tempC,
			dew: v.dewpointC,
			wet: v.wetBulbC
		}));

		const tempGrid = [];
		for (let t = Math.ceil(minT / 10) * 10; t <= maxT; t += 10) tempGrid.push({ x: x(t), value: t });
		const pressureLevels = [1000, 925, 850, 700, 500, 300, 200];

		const pressureGrid = profile.filter(node => pressureLevels.includes(node.pressureHpa)).map(node => ({
			y: y(node.heightM),
			label: String(node.pressureHpa)
		}));

		const terrainY = terrain !== null && Number.isFinite(terrain) && terrain >= bottomH && terrain <= topH
		? y(terrain)
		: null;

		const wbz = wetBulbZeroHeight(profile);

		const snowlineM = wbz.snowLevelM !== null && Number.isFinite(wbz.snowLevelM)
		? wbz.snowLevelM
		: null;

		const snowlineY = snowlineM !== null && snowlineM >= bottomH && snowlineM <= topH
		? y(snowlineM)
		: null;

		const precip = precipMmAt(p.forecast, idx);
		const hasPrecip = precip !== null && precip >= PRECIP_THRESHOLD_MM_H;

		const diagnostics = terrain !== null && Number.isFinite(terrain)
		? terrainDiagnostics(profile, terrain)
		: null;

		const phase = hasPrecip && terrain !== null && Number.isFinite(terrain)
		? terrainPrecipitationType(profile, terrain)
		: null;

		return {
			tempPoints,
			dewPoints,
			wetBulbPoints,
			nodes,
			tempGrid,
			pressureGrid,
			terrainY,
			snowlineY,
			surfaceTw: diagnostics
			? `${diagnostics.extrapolated ? '~' : ''}${formatTemperature(diagnostics.wetBulbC, units)}`
			: '—',
			snowline: snowlineM === null
			? 'Unresolved'
			: (wbz.extrapolated ? '~ ' : '') + formatElevation(snowlineM, units),
			warmEnergy: phase
			? `${Math.round(phase.meltingDegreeMetres)} °C·m`
			: '—',
			coldEnergy: phase
			? `${Math.round(phase.refreezingDegreeMetres)} °C·m`
			: '—',
			phaseLabel: phase
			? `${phase.icon} ${precipitationLabel(phase)}`
			: conditionLabel(precip, phase),
			phaseDetail: phase ? phase.detail : conditionLabel(precip, phase),
			phaseKey: phase?.key ?? null
		};
	}

	onMount(() => {
		if (!embedded) {
			const width = Math.min(390, window.innerWidth - 12);

			$$invalidate(7, position = {
				x: Math.max(6, window.innerWidth - width - 16),
				y: window.innerWidth <= 520 ? 38 : 66
			});
		}

		try {
			const t = store.get('timestamp');
			if (typeof t === 'number') $$invalidate(25, timestamp = t);
			store.on('timestamp', onTimestamp);
		} catch {
			
		}
	});

	onDestroy(() => {
		plotPointers.clear();
		window.removeEventListener('pointermove', dragMove);
		window.removeEventListener('pointerup', stopDrag);

		try {
			store.off('timestamp', onTimestamp);
		} catch {
			
		}
	});

	const click_handler = () => zoomAtCentre(zoom / 1.25);
	const click_handler_1 = () => zoomAtCentre(zoom * 1.25);
	const click_handler_2 = () => dispatch('close');

	function svg_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			svgEl = $$value;
			$$invalidate(5, svgEl);
		});
	}

	function div1_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			viewport = $$value;
			$$invalidate(6, viewport);
		});
	}

	function div2_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			shell = $$value;
			$$invalidate(4, shell);
		});
	}

	$$self.$$set = $$props => {
		if ('point' in $$props) $$invalidate(23, point = $$props.point);
		if ('terrainM' in $$props) $$invalidate(24, terrainM = $$props.terrainM);
		if ('placeName' in $$props) $$invalidate(0, placeName = $$props.placeName);
		if ('embedded' in $$props) $$invalidate(1, embedded = $$props.embedded);
		if ('units' in $$props) $$invalidate(2, units = $$props.units);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*point, terrainM, timestamp, units*/ 58720260) {
			$$invalidate(3, sounding = buildSounding(point, terrainM, timestamp, units));
		}

		if ($$self.$$.dirty[0] & /*sounding*/ 8) {
			{
				$$invalidate(10, hoverNode = null);
			}
		}

		if ($$self.$$.dirty[0] & /*point, timestamp*/ 41943040) {
			$$invalidate(11, validLabel = formatValid(point, timestamp));
		}
	};

	return [
		placeName,
		embedded,
		units,
		sounding,
		shell,
		svgEl,
		viewport,
		position,
		zoom,
		pngBusy,
		hoverNode,
		validLabel,
		dispatch,
		startDrag,
		zoomAtCentre,
		resetZoom,
		handleWheel,
		startPlotPointer,
		leavePlot,
		movePlotPointer,
		endPlotPointer,
		handleViewportKey,
		downloadPng,
		point,
		terrainM,
		timestamp,
		click_handler,
		click_handler_1,
		click_handler_2,
		svg_binding,
		div1_binding,
		div2_binding
	];
}

class SoundingChart extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$3,
			create_fragment$3,
			safe_not_equal,
			{
				point: 23,
				terrainM: 24,
				placeName: 0,
				embedded: 1,
				units: 2
			},
			add_css$2,
			[-1, -1]
		);
	}
}

/* src\winter\SnowlineChart.svelte generated by Svelte v4.2.20 */

function add_css$1(target) {
	append_styles(target, "svelte-15xb6pf", ".chart-shell.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{position:fixed;z-index:10020;width:min(430px, calc(100vw - 16px));padding:11px 12px 10px;border:1px solid rgba(98, 213, 255, 0.35);border-radius:14px;background:linear-gradient(180deg, rgba(15, 24, 31, 0.99), rgba(9, 17, 23, 0.99));color:white;box-shadow:0 16px 42px rgba(0, 0, 0, 0.56);backdrop-filter:blur(6px)}.chart-head.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}.chart-title.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{min-width:0;flex:1}.chart-title.svelte-15xb6pf b.svelte-15xb6pf.svelte-15xb6pf{display:block;font-size:15px}.chart-title.svelte-15xb6pf small.svelte-15xb6pf.svelte-15xb6pf,.chart-title.svelte-15xb6pf em.svelte-15xb6pf.svelte-15xb6pf{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-style:normal}.chart-title.svelte-15xb6pf small.svelte-15xb6pf.svelte-15xb6pf{margin-top:3px;color:#a5b4bd;font-size:9px}.chart-title.svelte-15xb6pf em.svelte-15xb6pf.svelte-15xb6pf{margin-top:2px;color:#70cef4;font-size:8px}.chart-actions.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{display:flex;gap:4px}.chart-actions.svelte-15xb6pf button.svelte-15xb6pf.svelte-15xb6pf{height:26px;min-width:26px;padding:0 7px;border:1px solid rgba(255, 255, 255, 0.08);border-radius:7px;background:rgba(255, 255, 255, 0.075);color:#fff;font-size:12px;font-weight:800;cursor:pointer}.chart-actions.svelte-15xb6pf button.svelte-15xb6pf.svelte-15xb6pf:hover{background:rgba(98, 213, 255, 0.15)}.png-button.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{font-size:8px !important}.drag-button.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{cursor:grab!important;touch-action:none}.forecast-tabs.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:8px;padding:3px;border-radius:8px;background:rgba(255, 255, 255, 0.035)}.forecast-tabs.svelte-15xb6pf button.svelte-15xb6pf.svelte-15xb6pf{height:27px;border:0;border-radius:6px;background:transparent;color:#82939d;font-size:9px;font-weight:800;cursor:pointer}.forecast-tabs.svelte-15xb6pf button.active.svelte-15xb6pf.svelte-15xb6pf{background:rgba(98, 213, 255, 0.13);color:#eaf7fc;box-shadow:inset 0 0 0 1px rgba(98, 213, 255, 0.22)}.plot-wrap.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{position:relative;margin-top:5px}svg.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{display:block;width:100%;height:auto;overflow:visible;touch-action:none}.plot-bg.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf,.band-bg.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:rgba(255, 255, 255, 0.022);stroke:rgba(104, 151, 177, 0.22);stroke-width:1}.terrain-zone.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:rgba(55, 190, 232, 0.085)}.grid.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{stroke:rgba(160, 196, 216, 0.13)}.axis.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#8fa1ac;font-size:8px;font-family:sans-serif}.section-label.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#cbd8df;font-size:6.8px;font-family:sans-serif;font-weight:800;letter-spacing:0.35px}.section-label.svelte-15xb6pf tspan.svelte-15xb6pf.svelte-15xb6pf{fill:#657681;font-weight:500}.snowline-title.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#cfeefb}.precip-title.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf,.precip-axis.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#64d4f5}.phase-title.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#d9c75e}.snow-title.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf,.snow-axis.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#82e398}.terrain-line.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{stroke:#ffae56;stroke-width:1.5;stroke-dasharray:5 4}.terrain-tag.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#ffbd75;font-size:6px;font-family:sans-serif}.snowline-line.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:none;stroke:#65d5ff;stroke-width:2.7;stroke-linecap:round;stroke-linejoin:round}.min24-line.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{stroke:#9fe9ff;stroke-width:1;stroke-dasharray:2 3}.min24-dot.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#0d151b;stroke:#9fe9ff;stroke-width:2}.min24-tag.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#bdefff;font-size:5.8px;font-family:sans-serif;font-weight:800}.now-line.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{stroke:#ff6658;stroke-width:1.25}.now-tag-bg.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#ff6658}.now-tag.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#fff;font-size:7px;font-family:sans-serif;font-weight:800}.cursor.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{stroke:#b9c6cd;stroke-width:1;stroke-dasharray:2 3}.current-dot.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#fff;stroke:#65d5ff;stroke-width:2.3}.crossing-line.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{stroke:#ffe05b;stroke-width:1.3;stroke-dasharray:3 3;cursor:pointer}.crossing-dot.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#12191f;stroke:#ffe05b;stroke-width:2.1;cursor:pointer}.inspect-line.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{stroke:#83939d}.precip-bar.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#3f9fbe;opacity:0.72}.precip-bar.wet.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#67d6f5;opacity:0.96}.phase-base.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#0b1419}.phase-block.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{opacity:0.94}.phase-snow.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#f4f7fb}.phase-wet-snow.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#6bd47f}.phase-mix.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#f2d84f}.phase-rain.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#4f82ff}.phase-ice-pellets.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#a8753e}.phase-freezing-rain.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#a867e8}.phase-legend-svg.svelte-15xb6pf text.svelte-15xb6pf.svelte-15xb6pf{fill:#d4dfe6;font-size:9px;font-family:sans-serif}.new-snow-area.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#82e398;opacity:0.16}.new-snow-line.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:none;stroke:#82e398;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.empty-band.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{fill:#778993;font-size:7px;font-family:sans-serif}.tooltip.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{position:absolute;z-index:4;min-width:176px;transform:translateX(-50%);padding:7px 9px;border-radius:9px;background:rgba(5, 12, 17, 0.99);border:1px solid rgba(98, 213, 255, 0.25);box-shadow:0 7px 20px rgba(0, 0, 0, 0.44);pointer-events:none}.tooltip.svelte-15xb6pf>b.svelte-15xb6pf.svelte-15xb6pf{display:block;font-size:8.8px}.tooltip.svelte-15xb6pf>strong.svelte-15xb6pf.svelte-15xb6pf{display:flex;align-items:center;gap:5px;margin:4px 0 5px;font-size:9.2px}.tip-phase-dot.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf,.current-phase-dot.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{display:inline-block;width:8px;height:8px;border-radius:2px;flex:0 0 auto}.tip-grid.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{display:grid;grid-template-columns:1fr 1fr;gap:4px 9px}.tip-grid.svelte-15xb6pf span.svelte-15xb6pf.svelte-15xb6pf{font-size:7.3px;color:#8fa0aa}.tip-grid.svelte-15xb6pf b.svelte-15xb6pf.svelte-15xb6pf{color:#eaf3f7;font-weight:800}.text-snow.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{color:#f4f7fb}.text-wet-snow.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{color:#6bd47f}.text-mix.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{color:#f2d84f}.text-rain.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{color:#4f82ff}.text-ice-pellets.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{color:#c08a50}.text-freezing-rain.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{color:#bf83f4}.current-card.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{margin-top:3px;padding:7px;border:1px solid rgba(255, 255, 255, 0.07);border-left:3px solid rgba(255, 255, 255, 0.28);border-radius:9px;background:rgba(255, 255, 255, 0.028)}.active-snow.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{border-left-color:#f4f7fb}.active-wet-snow.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{border-left-color:#6bd47f}.active-mix.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{border-left-color:#f2d84f}.active-rain.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{border-left-color:#4f82ff}.active-ice-pellets.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{border-left-color:#a8753e}.active-freezing-rain.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{border-left-color:#a867e8}.current-type.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{text-align:center}.current-type.svelte-15xb6pf b.svelte-15xb6pf.svelte-15xb6pf{display:flex;align-items:center;justify-content:center;gap:6px;font-size:11px}.current-type.svelte-15xb6pf strong.svelte-15xb6pf.svelte-15xb6pf{display:block;margin-top:3px;color:#81dfff;font-size:7.3px}.metrics.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{display:grid;grid-template-columns:repeat(2, 1fr);gap:4px;margin-top:6px}.metrics.svelte-15xb6pf span.svelte-15xb6pf.svelte-15xb6pf{padding:5px 2px;border-radius:7px;background:rgba(255, 255, 255, 0.035);text-align:center;min-width:0}.metrics.svelte-15xb6pf small.svelte-15xb6pf.svelte-15xb6pf{display:block;color:#7f909a;font-size:5.8px}.metrics.svelte-15xb6pf b.svelte-15xb6pf.svelte-15xb6pf{display:block;margin-top:1px;font-size:7px;white-space:nowrap}.outlook24.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{display:grid;grid-template-columns:auto 1fr;gap:3px 8px;margin-top:6px;padding:6px 8px;border-radius:8px;background:rgba(98, 213, 255, 0.06);border:1px solid rgba(98, 213, 255, 0.11)}.outlook24.svelte-15xb6pf>b.svelte-15xb6pf.svelte-15xb6pf{grid-row:0.33333333;color:#8fdfff;font-size:7px;text-transform:uppercase;letter-spacing:0.3px}.outlook24.svelte-15xb6pf span.svelte-15xb6pf.svelte-15xb6pf{color:#dceaf0;font-size:7.5px;font-weight:700}.outlook24.svelte-15xb6pf button.svelte-15xb6pf.svelte-15xb6pf{justify-self:start;padding:2px 0;border:0;background:transparent;color:#f1d67d;font-size:7px;font-weight:800;cursor:pointer}.outlook24.svelte-15xb6pf button.svelte-15xb6pf.svelte-15xb6pf:hover{color:#fff2ae;text-decoration:underline}.note.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{margin-top:4px;color:#d7bc4e;font-size:7.2px;text-align:center}.hint.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{margin-top:5px;color:#66757e;font-size:6.7px;text-align:center}.empty.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{padding:25px 8px;text-align:center;color:#8a9aa4;font-size:10px}@media(max-width: 520px){.chart-shell.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{width:calc(100vw - 12px);padding:9px;border-radius:12px}.png-button.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{display:none !important}.chart-title.svelte-15xb6pf small.svelte-15xb6pf.svelte-15xb6pf,.chart-title.svelte-15xb6pf em.svelte-15xb6pf.svelte-15xb6pf{max-width:180px}.metrics.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{gap:3px}.metrics.svelte-15xb6pf small.svelte-15xb6pf.svelte-15xb6pf{font-size:5.3px}.metrics.svelte-15xb6pf b.svelte-15xb6pf.svelte-15xb6pf{font-size:6.4px}.tooltip.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{min-width:158px}.outlook24.svelte-15xb6pf span.svelte-15xb6pf.svelte-15xb6pf,.outlook24.svelte-15xb6pf button.svelte-15xb6pf.svelte-15xb6pf{font-size:6.6px}}.event-head.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf,.elevation-head.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{display:flex;align-items:center;justify-content:space-between;gap:8px}.confidence.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{padding:2px 5px;border-radius:8px;font-size:6.5px;font-style:normal;font-weight:850}.confidence-high.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{background:rgba(96, 211, 139, 0.12);color:#87e5aa}.confidence-medium.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{background:rgba(255, 209, 84, 0.12);color:#f5d76d}.confidence-low.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{background:rgba(255, 136, 104, 0.12);color:#ffad96}.event-hazard.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{border-color:rgba(193, 132, 255, 0.38) !important;box-shadow:inset 3px 0 rgba(193, 132, 255, 0.8)}.event-timeline.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{display:grid;grid-template-columns:repeat(3, 1fr);gap:4px;margin-top:3px}.elevation-impact.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{margin-top:6px;padding:7px;border:1px solid rgba(255, 255, 255, 0.08);border-radius:8px;background:rgba(255, 255, 255, 0.025)}.impact-band.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{color:#87a7b7;font-size:6.8px}.impact-band.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{margin-top:3px}.elevation-grid.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{display:grid;grid-template-columns:repeat(5, 1fr);gap:3px;margin-top:5px}.chart-shell.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{box-sizing:border-box;max-height:calc(100dvh - 48px);overflow-y:auto;overscroll-behavior:contain}.chart-head.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{position:sticky;top:-11px;z-index:5;padding:8px 0;background:#101a22}.chart-actions.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{flex-wrap:wrap;justify-content:flex-end}.chart-actions.svelte-15xb6pf button.svelte-15xb6pf.svelte-15xb6pf{min-height:32px}.png-button.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{display:inline-block !important;font-size:10px !important}.current-type.svelte-15xb6pf b.svelte-15xb6pf.svelte-15xb6pf{font-size:15px}.current-type.svelte-15xb6pf strong.svelte-15xb6pf.svelte-15xb6pf{font-size:11px}.metrics.svelte-15xb6pf small.svelte-15xb6pf.svelte-15xb6pf{font-size:10px}.metrics.svelte-15xb6pf b.svelte-15xb6pf.svelte-15xb6pf{font-size:13px}.outlook24.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{display:flex;flex-direction:column;gap:5px}.outlook24.svelte-15xb6pf>b.svelte-15xb6pf.svelte-15xb6pf{font-size:10px}.outlook24.svelte-15xb6pf span.svelte-15xb6pf.svelte-15xb6pf,.outlook24.svelte-15xb6pf button.svelte-15xb6pf.svelte-15xb6pf{font-size:12px;line-height:1.4}.crossing-action.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{width:100%;margin-top:7px;padding:9px;border:1px solid #35515c;border-radius:8px;background:#172932;color:#b7e6f8;text-align:left;font-size:11px;cursor:pointer}.quality-note.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{margin-top:6px;color:#edc881;font-size:11px;line-height:1.4}.hint.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{font-size:10px;line-height:1.35}.chart-shell.embedded.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{position:relative;inset:auto;z-index:0;width:100%;max-width:none;max-height:none;overflow:visible;padding:12px;box-shadow:none;box-sizing:border-box}.embedded.svelte-15xb6pf .chart-title small.svelte-15xb6pf.svelte-15xb6pf,.embedded.svelte-15xb6pf .chart-title em.svelte-15xb6pf.svelte-15xb6pf{font-size:11px}.embedded.svelte-15xb6pf .forecast-tabs button.svelte-15xb6pf.svelte-15xb6pf{min-height:38px}.embedded.svelte-15xb6pf .event-head b.svelte-15xb6pf.svelte-15xb6pf{font-size:13px}.chart-shell.embedded.svelte-15xb6pf.svelte-15xb6pf.svelte-15xb6pf{background:var(--panel, #152b37);border:1px solid var(--line, #36505e);border-radius:16px;padding:16px;color:var(--ink, #edf7fa)}.embedded.svelte-15xb6pf .chart-head.svelte-15xb6pf.svelte-15xb6pf{background:var(--panel, #152b37)}.embedded.svelte-15xb6pf .chart-title b.svelte-15xb6pf.svelte-15xb6pf{font-weight:500;font-size:17px}.embedded.svelte-15xb6pf .chart-actions button.svelte-15xb6pf.svelte-15xb6pf{min-height:40px;min-width:40px;font-weight:500}.embedded.svelte-15xb6pf .forecast-tabs button.svelte-15xb6pf.svelte-15xb6pf{font-size:12px;min-height:44px;font-weight:500}.embedded.svelte-15xb6pf .forecast-tabs button.active.svelte-15xb6pf.svelte-15xb6pf{background:#28524f;color:#d9fff5;box-shadow:none}.embedded.svelte-15xb6pf .metrics small.svelte-15xb6pf.svelte-15xb6pf,.embedded.svelte-15xb6pf .event-timeline small.svelte-15xb6pf.svelte-15xb6pf,.embedded.svelte-15xb6pf .elevation-grid small.svelte-15xb6pf.svelte-15xb6pf{font-size:11px}.embedded.svelte-15xb6pf .metrics b.svelte-15xb6pf.svelte-15xb6pf,.embedded.svelte-15xb6pf .event-timeline span.svelte-15xb6pf.svelte-15xb6pf,.embedded.svelte-15xb6pf .elevation-grid b.svelte-15xb6pf.svelte-15xb6pf{font-size:12px;font-weight:500}.embedded.svelte-15xb6pf .current-type b.svelte-15xb6pf.svelte-15xb6pf{font-size:15px;font-weight:500}.embedded.svelte-15xb6pf .current-type strong.svelte-15xb6pf.svelte-15xb6pf,.embedded.svelte-15xb6pf .outlook24.svelte-15xb6pf>b.svelte-15xb6pf,.embedded.svelte-15xb6pf .outlook24 span.svelte-15xb6pf.svelte-15xb6pf,.embedded.svelte-15xb6pf .outlook24 button.svelte-15xb6pf.svelte-15xb6pf{font-size:11px}.embedded.svelte-15xb6pf .metrics.svelte-15xb6pf.svelte-15xb6pf{gap:8px}.embedded.svelte-15xb6pf .metrics span.svelte-15xb6pf.svelte-15xb6pf{padding:10px 5px}.embedded.svelte-15xb6pf .event-head b.svelte-15xb6pf.svelte-15xb6pf{font-weight:500}.embedded.svelte-15xb6pf .confidence.svelte-15xb6pf.svelte-15xb6pf{font-size:11px}.embedded.svelte-15xb6pf .elevation-head b.svelte-15xb6pf.svelte-15xb6pf{font-size:13px}.embedded.svelte-15xb6pf .elevation-head span.svelte-15xb6pf.svelte-15xb6pf,.embedded.svelte-15xb6pf .impact-band.svelte-15xb6pf.svelte-15xb6pf,.embedded.svelte-15xb6pf .elevation-grid em.svelte-15xb6pf.svelte-15xb6pf{font-size:11px}.embedded.svelte-15xb6pf .elevation-grid.svelte-15xb6pf.svelte-15xb6pf{grid-template-columns:repeat(auto-fit, minmax(75px, 1fr));gap:6px}");
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[46] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[49] = list[i];
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[52] = list[i];
	return child_ctx;
}

// (9:6) {#if tab === 'graph' && showNow}
function create_if_block_23(ctx) {
	let button;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
			button.textContent = "Now";
			attr(button, "class", "now-action svelte-15xb6pf");
			attr(button, "type", "button");
			attr(button, "title", "Back to now");
			attr(button, "aria-label", "Back to now");
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (!mounted) {
				dispose = listen(button, "click", /*resetToNow*/ ctx[20]);
				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(button);
			}

			mounted = false;
			dispose();
		}
	};
}

// (10:6) {#if tab === 'graph' && chart}
function create_if_block_22(ctx) {
	let button;
	let t_value = (/*pngBusy*/ ctx[8] ? 'Saving…' : 'Save image') + "";
	let t;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
			t = text(t_value);
			attr(button, "class", "png-button svelte-15xb6pf");
			attr(button, "type", "button");
			button.disabled = /*pngBusy*/ ctx[8];
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, t);

			if (!mounted) {
				dispose = listen(button, "click", /*downloadPng*/ ctx[22]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*pngBusy*/ 256 && t_value !== (t_value = (/*pngBusy*/ ctx[8] ? 'Saving…' : 'Save image') + "")) set_data(t, t_value);

			if (dirty[0] & /*pngBusy*/ 256) {
				button.disabled = /*pngBusy*/ ctx[8];
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

// (11:6) {#if !embedded}
function create_if_block_21(ctx) {
	let button0;
	let t1;
	let button1;
	let mounted;
	let dispose;

	return {
		c() {
			button0 = element("button");
			button0.textContent = "↕";
			t1 = space();
			button1 = element("button");
			button1.textContent = "×";
			attr(button0, "class", "drag-button svelte-15xb6pf");
			attr(button0, "type", "button");
			attr(button0, "title", "Drag graph");
			attr(button0, "aria-label", "Drag graph");
			attr(button1, "type", "button");
			attr(button1, "title", "Close");
			attr(button1, "aria-label", "Close graph");
			attr(button1, "class", "svelte-15xb6pf");
		},
		m(target, anchor) {
			insert(target, button0, anchor);
			insert(target, t1, anchor);
			insert(target, button1, anchor);

			if (!mounted) {
				dispose = [
					listen(button0, "pointerdown", /*startDrag*/ ctx[17]),
					listen(button1, "click", /*click_handler*/ ctx[24])
				];

				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(button0);
				detach(t1);
				detach(button1);
			}

			mounted = false;
			run_all(dispose);
		}
	};
}

// (126:2) {:else}
function create_else_block_5(ctx) {
	let soundingchart;
	let current;

	soundingchart = new SoundingChart({
			props: {
				point: /*point*/ ctx[2],
				terrainM: /*terrainM*/ ctx[3],
				placeName: /*placeName*/ ctx[4],
				units: /*units*/ ctx[5],
				embedded: true
			}
		});

	return {
		c() {
			create_component(soundingchart.$$.fragment);
		},
		m(target, anchor) {
			mount_component(soundingchart, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const soundingchart_changes = {};
			if (dirty[0] & /*point*/ 4) soundingchart_changes.point = /*point*/ ctx[2];
			if (dirty[0] & /*terrainM*/ 8) soundingchart_changes.terrainM = /*terrainM*/ ctx[3];
			if (dirty[0] & /*placeName*/ 16) soundingchart_changes.placeName = /*placeName*/ ctx[4];
			if (dirty[0] & /*units*/ 32) soundingchart_changes.units = /*units*/ ctx[5];
			soundingchart.$set(soundingchart_changes);
		},
		i(local) {
			if (current) return;
			transition_in(soundingchart.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(soundingchart.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(soundingchart, detaching);
		}
	};
}

// (17:2) {#if tab === 'graph'}
function create_if_block$1(ctx) {
	let if_block_anchor;

	function select_block_type_1(ctx, dirty) {
		if (/*chart*/ ctx[13]) return create_if_block_1$1;
		return create_else_block_4;
	}

	let current_block_type = select_block_type_1(ctx);
	let if_block = current_block_type(ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(if_block_anchor);
			}

			if_block.d(detaching);
		}
	};
}

// (123:2) {:else}
function create_else_block_4(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = "Wintry forecast unavailable.";
			attr(div, "class", "empty svelte-15xb6pf");
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

// (18:2) {#if chart}
function create_if_block_1$1(ctx) {
	let div0;
	let svg;
	let text0;
	let t0;
	let tspan0;
	let t1_value = (/*units*/ ctx[5] === 'imperial' ? 'ft' : 'm') + "";
	let t1;
	let rect0;
	let line0;
	let line1;
	let line2;
	let text1;
	let t2_value = /*chart*/ ctx[13].maxLabel + "";
	let t2;
	let text2;
	let t3_value = /*chart*/ ctx[13].midLabel + "";
	let t3;
	let text3;
	let t4_value = /*chart*/ ctx[13].minLabel + "";
	let t4;
	let path;
	let path_d_value;
	let show_if = !/*chart*/ ctx[13].points.trim();
	let text4;
	let t5;
	let tspan1;
	let t6_value = (/*units*/ ctx[5] === 'imperial' ? 'in/3h' : 'mm/3h') + "";
	let t6;
	let rect1;
	let text5;
	let t7;
	let rect2;
	let g;
	let rect3;
	let text6;
	let t8;
	let rect4;
	let text7;
	let t9;
	let rect5;
	let text8;
	let t10;
	let rect6;
	let text9;
	let t11;
	let rect7;
	let text10;
	let t12;
	let rect8;
	let text11;
	let t13;
	let text12;
	let t14;
	let tspan2;
	let t15_value = (/*units*/ ctx[5] === 'imperial' ? 'est. in' : 'est. cm') + "";
	let t15;
	let rect9;
	let if_block3_anchor;
	let if_block4_anchor;
	let if_block5_anchor;
	let if_block6_anchor;
	let t16;
	let t17;
	let div3;
	let div1;
	let b0;
	let t18;
	let t19;
	let div2;
	let span0;
	let small0;
	let b1;

	let t21_value = (/*chart*/ ctx[13].currentSnowline === null
	? 'WBZ unresolved'
	: formatElevation(/*chart*/ ctx[13].currentSnowline, /*units*/ ctx[5])) + "";

	let t21;
	let t22;
	let span1;
	let small1;
	let b2;
	let t24_value = formatPrecip(/*chart*/ ctx[13].currentPrecip, /*units*/ ctx[5]) + "";
	let t24;
	let t25;
	let div4;
	let b3;

	let t26_value = ((/*event*/ ctx[14]?.activeNow)
	? 'Current wintry period'
	: 'Next wintry period') + "";

	let t26;
	let t27;
	let t28;
	let t29;
	let t30;
	let if_block13_anchor;
	let mounted;
	let dispose;
	let if_block0 = /*chart*/ ctx[13].terrainY !== null && create_if_block_20(ctx);
	let if_block1 = show_if && create_if_block_19();

	function select_block_type_2(ctx, dirty) {
		if (/*chart*/ ctx[13].hasPrecip) return create_if_block_18;
		return create_else_block_3;
	}

	let current_block_type = select_block_type_2(ctx);
	let if_block2 = current_block_type(ctx);
	let each_value_1 = ensure_array_like(/*chart*/ ctx[13].phaseBlocks);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	function select_block_type_3(ctx, dirty) {
		if (/*chart*/ ctx[13].newSnowMax > 0.05) return create_if_block_17;
		return create_else_block_2;
	}

	let current_block_type_1 = select_block_type_3(ctx);
	let if_block3 = current_block_type_1(ctx);
	let if_block4 = /*chart*/ ctx[13].nowX !== null && create_if_block_16(ctx);
	let if_block5 = /*chart*/ ctx[13].currentX !== null && /*chart*/ ctx[13].currentY !== null && create_if_block_15(ctx);
	let if_block6 = /*tooltip*/ ctx[12] && create_if_block_14(ctx);
	let each_value = ensure_array_like([24, 48, 72, 96, 120, 144]);
	let each_blocks = [];

	for (let i = 0; i < 6; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	let if_block7 = /*tooltip*/ ctx[12] && create_if_block_11(ctx);

	function select_block_type_4(ctx, dirty) {
		if (/*chart*/ ctx[13].currentPhase) return create_if_block_10;
		return create_else_block_1;
	}

	let current_block_type_2 = select_block_type_4(ctx);
	let if_block8 = current_block_type_2(ctx);
	let if_block9 = /*chart*/ ctx[13].currentPosition && create_if_block_9(ctx);

	function select_block_type_5(ctx, dirty) {
		if (/*event*/ ctx[14]) return create_if_block_5;
		return create_else_block;
	}

	let current_block_type_3 = select_block_type_5(ctx);
	let if_block10 = current_block_type_3(ctx);
	let if_block11 = /*crossing*/ ctx[7]?.crossingTime !== null && /*crossing*/ ctx[7]?.crossingTime !== undefined && /*crossing*/ ctx[7].crossingTime > /*timestamp*/ ctx[6] && create_if_block_4$1(ctx);
	let if_block12 = /*chart*/ ctx[13].currentPhase?.confidence === 'low' && create_if_block_3$1();
	let if_block13 = /*event*/ ctx[14] && /*chart*/ ctx[13].coverageNote && create_if_block_2$1(ctx);

	return {
		c() {
			div0 = element("div");
			svg = svg_element("svg");
			text0 = svg_element("text");
			t0 = text("SNOWLINE ");
			tspan0 = svg_element("tspan");
			t1 = text(t1_value);
			rect0 = svg_element("rect");
			if (if_block0) if_block0.c();
			line0 = svg_element("line");
			line1 = svg_element("line");
			line2 = svg_element("line");
			text1 = svg_element("text");
			t2 = text(t2_value);
			text2 = svg_element("text");
			t3 = text(t3_value);
			text3 = svg_element("text");
			t4 = text(t4_value);
			path = svg_element("path");
			if (if_block1) if_block1.c();
			text4 = svg_element("text");
			t5 = text("PRECIPITATION ");
			tspan1 = svg_element("tspan");
			t6 = text(t6_value);
			rect1 = svg_element("rect");
			if_block2.c();
			text5 = svg_element("text");
			t7 = text("PRECIPITATION TYPE");
			rect2 = svg_element("rect");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			g = svg_element("g");
			rect3 = svg_element("rect");
			text6 = svg_element("text");
			t8 = text("Snow");
			rect4 = svg_element("rect");
			text7 = svg_element("text");
			t9 = text("Wet snow");
			rect5 = svg_element("rect");
			text8 = svg_element("text");
			t10 = text("Mix");
			rect6 = svg_element("rect");
			text9 = svg_element("text");
			t11 = text("Rain");
			rect7 = svg_element("rect");
			text10 = svg_element("text");
			t12 = text("Ice pellets");
			rect8 = svg_element("rect");
			text11 = svg_element("text");
			t13 = text("Freezing rain");
			text12 = svg_element("text");
			t14 = text("NEW SNOW ");
			tspan2 = svg_element("tspan");
			t15 = text(t15_value);
			rect9 = svg_element("rect");
			if_block3.c();
			if_block3_anchor = empty();
			if (if_block4) if_block4.c();
			if_block4_anchor = empty();
			if (if_block5) if_block5.c();
			if_block5_anchor = empty();
			if (if_block6) if_block6.c();
			if_block6_anchor = empty();

			for (let i = 0; i < 6; i += 1) {
				each_blocks[i].c();
			}

			t16 = space();
			if (if_block7) if_block7.c();
			t17 = space();
			div3 = element("div");
			div1 = element("div");
			b0 = element("b");
			if_block8.c();
			t18 = space();
			if (if_block9) if_block9.c();
			t19 = space();
			div2 = element("div");
			span0 = element("span");
			small0 = element("small");
			small0.textContent = "Snowline";
			b1 = element("b");
			t21 = text(t21_value);
			t22 = space();
			span1 = element("span");
			small1 = element("small");
			small1.textContent = "Precip";
			b2 = element("b");
			t24 = text(t24_value);
			t25 = space();
			div4 = element("div");
			b3 = element("b");
			t26 = text(t26_value);
			t27 = space();
			if_block10.c();
			t28 = space();
			if (if_block11) if_block11.c();
			t29 = space();
			if (if_block12) if_block12.c();
			t30 = space();
			if (if_block13) if_block13.c();
			if_block13_anchor = empty();
			attr(tspan0, "class", "svelte-15xb6pf");
			attr(text0, "x", "42");
			attr(text0, "y", "11");
			attr(text0, "class", "section-label snowline-title svelte-15xb6pf");
			attr(rect0, "x", "42");
			attr(rect0, "y", "18");
			attr(rect0, "width", "306");
			attr(rect0, "height", "112");
			attr(rect0, "rx", "8");
			attr(rect0, "class", "plot-bg svelte-15xb6pf");
			attr(line0, "x1", "42");
			attr(line0, "x2", "348");
			attr(line0, "y1", "18");
			attr(line0, "y2", "18");
			attr(line0, "class", "grid svelte-15xb6pf");
			attr(line1, "x1", "42");
			attr(line1, "x2", "348");
			attr(line1, "y1", "74");
			attr(line1, "y2", "74");
			attr(line1, "class", "grid svelte-15xb6pf");
			attr(line2, "x1", "42");
			attr(line2, "x2", "348");
			attr(line2, "y1", "130");
			attr(line2, "y2", "130");
			attr(line2, "class", "grid svelte-15xb6pf");
			attr(text1, "x", "37");
			attr(text1, "y", "22");
			attr(text1, "text-anchor", "end");
			attr(text1, "class", "axis svelte-15xb6pf");
			attr(text2, "x", "37");
			attr(text2, "y", "78");
			attr(text2, "text-anchor", "end");
			attr(text2, "class", "axis svelte-15xb6pf");
			attr(text3, "x", "37");
			attr(text3, "y", "134");
			attr(text3, "text-anchor", "end");
			attr(text3, "class", "axis svelte-15xb6pf");
			attr(path, "d", path_d_value = /*chart*/ ctx[13].points);
			attr(path, "class", "snowline-line svelte-15xb6pf");
			attr(tspan1, "class", "svelte-15xb6pf");
			attr(text4, "x", "42");
			attr(text4, "y", "147");
			attr(text4, "class", "section-label precip-title svelte-15xb6pf");
			attr(rect1, "x", "42");
			attr(rect1, "y", "153");
			attr(rect1, "width", "306");
			attr(rect1, "height", "36");
			attr(rect1, "rx", "7");
			attr(rect1, "class", "band-bg svelte-15xb6pf");
			attr(text5, "x", "42");
			attr(text5, "y", "205");
			attr(text5, "class", "section-label phase-title svelte-15xb6pf");
			attr(rect2, "x", "42");
			attr(rect2, "y", "211");
			attr(rect2, "width", "306");
			attr(rect2, "height", "25");
			attr(rect2, "rx", "7");
			attr(rect2, "class", "band-bg phase-base svelte-15xb6pf");
			attr(rect3, "x", "42");
			attr(rect3, "y", "244");
			attr(rect3, "width", "7");
			attr(rect3, "height", "7");
			attr(rect3, "rx", "1.5");
			attr(rect3, "class", "phase-snow svelte-15xb6pf");
			attr(text6, "x", "53");
			attr(text6, "y", "251");
			attr(text6, "class", "svelte-15xb6pf");
			attr(rect4, "x", "145");
			attr(rect4, "y", "244");
			attr(rect4, "width", "7");
			attr(rect4, "height", "7");
			attr(rect4, "rx", "1.5");
			attr(rect4, "class", "phase-wet-snow svelte-15xb6pf");
			attr(text7, "x", "156");
			attr(text7, "y", "251");
			attr(text7, "class", "svelte-15xb6pf");
			attr(rect5, "x", "246");
			attr(rect5, "y", "244");
			attr(rect5, "width", "7");
			attr(rect5, "height", "7");
			attr(rect5, "rx", "1.5");
			attr(rect5, "class", "phase-mix svelte-15xb6pf");
			attr(text8, "x", "257");
			attr(text8, "y", "251");
			attr(text8, "class", "svelte-15xb6pf");
			attr(rect6, "x", "42");
			attr(rect6, "y", "258");
			attr(rect6, "width", "7");
			attr(rect6, "height", "7");
			attr(rect6, "rx", "1.5");
			attr(rect6, "class", "phase-rain svelte-15xb6pf");
			attr(text9, "x", "53");
			attr(text9, "y", "265");
			attr(text9, "class", "svelte-15xb6pf");
			attr(rect7, "x", "145");
			attr(rect7, "y", "258");
			attr(rect7, "width", "7");
			attr(rect7, "height", "7");
			attr(rect7, "rx", "1.5");
			attr(rect7, "class", "phase-ice-pellets svelte-15xb6pf");
			attr(text10, "x", "156");
			attr(text10, "y", "265");
			attr(text10, "class", "svelte-15xb6pf");
			attr(rect8, "x", "246");
			attr(rect8, "y", "258");
			attr(rect8, "width", "7");
			attr(rect8, "height", "7");
			attr(rect8, "rx", "1.5");
			attr(rect8, "class", "phase-freezing-rain svelte-15xb6pf");
			attr(text11, "x", "257");
			attr(text11, "y", "265");
			attr(text11, "class", "svelte-15xb6pf");
			attr(g, "class", "phase-legend-svg svelte-15xb6pf");
			attr(tspan2, "class", "svelte-15xb6pf");
			attr(text12, "x", "42");
			attr(text12, "y", "282");
			attr(text12, "class", "section-label snow-title svelte-15xb6pf");
			attr(rect9, "x", "42");
			attr(rect9, "y", "288");
			attr(rect9, "width", "306");
			attr(rect9, "height", "28");
			attr(rect9, "rx", "7");
			attr(rect9, "class", "band-bg svelte-15xb6pf");
			attr(svg, "viewBox", "0 0 360 338");
			attr(svg, "role", "img");
			attr(svg, "aria-label", "Terrain-aware wintry forecast through 144 hours");
			attr(svg, "class", "svelte-15xb6pf");
			attr(div0, "class", "plot-wrap svelte-15xb6pf");
			attr(b0, "class", "svelte-15xb6pf");
			attr(div1, "class", "current-type svelte-15xb6pf");
			attr(small0, "class", "svelte-15xb6pf");
			attr(b1, "class", "svelte-15xb6pf");
			attr(span0, "class", "svelte-15xb6pf");
			attr(small1, "class", "svelte-15xb6pf");
			attr(b2, "class", "svelte-15xb6pf");
			attr(span1, "class", "svelte-15xb6pf");
			attr(div2, "class", "metrics svelte-15xb6pf");
			attr(div3, "class", "current-card svelte-15xb6pf");
			toggle_class(div3, "active-snow", /*chart*/ ctx[13].currentPhase?.key === 'snow');
			toggle_class(div3, "active-wet-snow", /*chart*/ ctx[13].currentPhase?.key === 'wet-snow');
			toggle_class(div3, "active-mix", /*chart*/ ctx[13].currentPhase?.key === 'mix');
			toggle_class(div3, "active-rain", /*chart*/ ctx[13].currentPhase?.key === 'rain');
			toggle_class(div3, "active-ice-pellets", /*chart*/ ctx[13].currentPhase?.key === 'ice-pellets');
			toggle_class(div3, "active-freezing-rain", /*chart*/ ctx[13].currentPhase?.key === 'freezing-rain');
			attr(b3, "class", "svelte-15xb6pf");
			attr(div4, "class", "outlook24 event-intelligence svelte-15xb6pf");
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			append(div0, svg);
			append(svg, text0);
			append(text0, t0);
			append(text0, tspan0);
			append(tspan0, t1);
			append(svg, rect0);
			if (if_block0) if_block0.m(svg, null);
			append(svg, line0);
			append(svg, line1);
			append(svg, line2);
			append(svg, text1);
			append(text1, t2);
			append(svg, text2);
			append(text2, t3);
			append(svg, text3);
			append(text3, t4);
			append(svg, path);
			if (if_block1) if_block1.m(svg, null);
			append(svg, text4);
			append(text4, t5);
			append(text4, tspan1);
			append(tspan1, t6);
			append(svg, rect1);
			if_block2.m(svg, null);
			append(svg, text5);
			append(text5, t7);
			append(svg, rect2);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				if (each_blocks_1[i]) {
					each_blocks_1[i].m(svg, null);
				}
			}

			append(svg, g);
			append(g, rect3);
			append(g, text6);
			append(text6, t8);
			append(g, rect4);
			append(g, text7);
			append(text7, t9);
			append(g, rect5);
			append(g, text8);
			append(text8, t10);
			append(g, rect6);
			append(g, text9);
			append(text9, t11);
			append(g, rect7);
			append(g, text10);
			append(text10, t12);
			append(g, rect8);
			append(g, text11);
			append(text11, t13);
			append(svg, text12);
			append(text12, t14);
			append(text12, tspan2);
			append(tspan2, t15);
			append(svg, rect9);
			if_block3.m(svg, null);
			append(svg, if_block3_anchor);
			if (if_block4) if_block4.m(svg, null);
			append(svg, if_block4_anchor);
			if (if_block5) if_block5.m(svg, null);
			append(svg, if_block5_anchor);
			if (if_block6) if_block6.m(svg, null);
			append(svg, if_block6_anchor);

			for (let i = 0; i < 6; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(svg, null);
				}
			}

			/*svg_binding*/ ctx[27](svg);
			append(div0, t16);
			if (if_block7) if_block7.m(div0, null);
			insert(target, t17, anchor);
			insert(target, div3, anchor);
			append(div3, div1);
			append(div1, b0);
			if_block8.m(b0, null);
			append(div1, t18);
			if (if_block9) if_block9.m(div1, null);
			append(div3, t19);
			append(div3, div2);
			append(div2, span0);
			append(span0, small0);
			append(span0, b1);
			append(b1, t21);
			append(div2, t22);
			append(div2, span1);
			append(span1, small1);
			append(span1, b2);
			append(b2, t24);
			insert(target, t25, anchor);
			insert(target, div4, anchor);
			append(div4, b3);
			append(b3, t26);
			append(div4, t27);
			if_block10.m(div4, null);
			insert(target, t28, anchor);
			if (if_block11) if_block11.m(target, anchor);
			insert(target, t29, anchor);
			if (if_block12) if_block12.m(target, anchor);
			insert(target, t30, anchor);
			if (if_block13) if_block13.m(target, anchor);
			insert(target, if_block13_anchor, anchor);

			if (!mounted) {
				dispose = [
					listen(svg, "pointermove", /*handlePointer*/ ctx[21]),
					listen(svg, "pointerdown", /*handlePointer*/ ctx[21]),
					listen(svg, "pointerleave", /*pointerleave_handler*/ ctx[28])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*units*/ 32 && t1_value !== (t1_value = (/*units*/ ctx[5] === 'imperial' ? 'ft' : 'm') + "")) set_data(t1, t1_value);

			if (/*chart*/ ctx[13].terrainY !== null) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_20(ctx);
					if_block0.c();
					if_block0.m(svg, line0);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty[0] & /*chart*/ 8192 && t2_value !== (t2_value = /*chart*/ ctx[13].maxLabel + "")) set_data(t2, t2_value);
			if (dirty[0] & /*chart*/ 8192 && t3_value !== (t3_value = /*chart*/ ctx[13].midLabel + "")) set_data(t3, t3_value);
			if (dirty[0] & /*chart*/ 8192 && t4_value !== (t4_value = /*chart*/ ctx[13].minLabel + "")) set_data(t4, t4_value);

			if (dirty[0] & /*chart*/ 8192 && path_d_value !== (path_d_value = /*chart*/ ctx[13].points)) {
				attr(path, "d", path_d_value);
			}

			if (dirty[0] & /*chart*/ 8192) show_if = !/*chart*/ ctx[13].points.trim();

			if (show_if) {
				if (if_block1) ; else {
					if_block1 = create_if_block_19();
					if_block1.c();
					if_block1.m(svg, text4);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty[0] & /*units*/ 32 && t6_value !== (t6_value = (/*units*/ ctx[5] === 'imperial' ? 'in/3h' : 'mm/3h') + "")) set_data(t6, t6_value);

			if (current_block_type === (current_block_type = select_block_type_2(ctx)) && if_block2) {
				if_block2.p(ctx, dirty);
			} else {
				if_block2.d(1);
				if_block2 = current_block_type(ctx);

				if (if_block2) {
					if_block2.c();
					if_block2.m(svg, text5);
				}
			}

			if (dirty[0] & /*chart*/ 8192) {
				each_value_1 = ensure_array_like(/*chart*/ ctx[13].phaseBlocks);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_1(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(svg, g);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_1.length;
			}

			if (dirty[0] & /*units*/ 32 && t15_value !== (t15_value = (/*units*/ ctx[5] === 'imperial' ? 'est. in' : 'est. cm') + "")) set_data(t15, t15_value);

			if (current_block_type_1 === (current_block_type_1 = select_block_type_3(ctx)) && if_block3) {
				if_block3.p(ctx, dirty);
			} else {
				if_block3.d(1);
				if_block3 = current_block_type_1(ctx);

				if (if_block3) {
					if_block3.c();
					if_block3.m(svg, if_block3_anchor);
				}
			}

			if (/*chart*/ ctx[13].nowX !== null) {
				if (if_block4) {
					if_block4.p(ctx, dirty);
				} else {
					if_block4 = create_if_block_16(ctx);
					if_block4.c();
					if_block4.m(svg, if_block4_anchor);
				}
			} else if (if_block4) {
				if_block4.d(1);
				if_block4 = null;
			}

			if (/*chart*/ ctx[13].currentX !== null && /*chart*/ ctx[13].currentY !== null) {
				if (if_block5) {
					if_block5.p(ctx, dirty);
				} else {
					if_block5 = create_if_block_15(ctx);
					if_block5.c();
					if_block5.m(svg, if_block5_anchor);
				}
			} else if (if_block5) {
				if_block5.d(1);
				if_block5 = null;
			}

			if (/*tooltip*/ ctx[12]) {
				if (if_block6) {
					if_block6.p(ctx, dirty);
				} else {
					if_block6 = create_if_block_14(ctx);
					if_block6.c();
					if_block6.m(svg, if_block6_anchor);
				}
			} else if (if_block6) {
				if_block6.d(1);
				if_block6 = null;
			}

			if (/*tooltip*/ ctx[12]) {
				if (if_block7) {
					if_block7.p(ctx, dirty);
				} else {
					if_block7 = create_if_block_11(ctx);
					if_block7.c();
					if_block7.m(div0, null);
				}
			} else if (if_block7) {
				if_block7.d(1);
				if_block7 = null;
			}

			if (current_block_type_2 === (current_block_type_2 = select_block_type_4(ctx)) && if_block8) {
				if_block8.p(ctx, dirty);
			} else {
				if_block8.d(1);
				if_block8 = current_block_type_2(ctx);

				if (if_block8) {
					if_block8.c();
					if_block8.m(b0, null);
				}
			}

			if (/*chart*/ ctx[13].currentPosition) {
				if (if_block9) {
					if_block9.p(ctx, dirty);
				} else {
					if_block9 = create_if_block_9(ctx);
					if_block9.c();
					if_block9.m(div1, null);
				}
			} else if (if_block9) {
				if_block9.d(1);
				if_block9 = null;
			}

			if (dirty[0] & /*chart, units*/ 8224 && t21_value !== (t21_value = (/*chart*/ ctx[13].currentSnowline === null
			? 'WBZ unresolved'
			: formatElevation(/*chart*/ ctx[13].currentSnowline, /*units*/ ctx[5])) + "")) set_data(t21, t21_value);

			if (dirty[0] & /*chart, units*/ 8224 && t24_value !== (t24_value = formatPrecip(/*chart*/ ctx[13].currentPrecip, /*units*/ ctx[5]) + "")) set_data(t24, t24_value);

			if (dirty[0] & /*chart*/ 8192) {
				toggle_class(div3, "active-snow", /*chart*/ ctx[13].currentPhase?.key === 'snow');
			}

			if (dirty[0] & /*chart*/ 8192) {
				toggle_class(div3, "active-wet-snow", /*chart*/ ctx[13].currentPhase?.key === 'wet-snow');
			}

			if (dirty[0] & /*chart*/ 8192) {
				toggle_class(div3, "active-mix", /*chart*/ ctx[13].currentPhase?.key === 'mix');
			}

			if (dirty[0] & /*chart*/ 8192) {
				toggle_class(div3, "active-rain", /*chart*/ ctx[13].currentPhase?.key === 'rain');
			}

			if (dirty[0] & /*chart*/ 8192) {
				toggle_class(div3, "active-ice-pellets", /*chart*/ ctx[13].currentPhase?.key === 'ice-pellets');
			}

			if (dirty[0] & /*chart*/ 8192) {
				toggle_class(div3, "active-freezing-rain", /*chart*/ ctx[13].currentPhase?.key === 'freezing-rain');
			}

			if (dirty[0] & /*event*/ 16384 && t26_value !== (t26_value = ((/*event*/ ctx[14]?.activeNow)
			? 'Current wintry period'
			: 'Next wintry period') + "")) set_data(t26, t26_value);

			if (current_block_type_3 === (current_block_type_3 = select_block_type_5(ctx)) && if_block10) {
				if_block10.p(ctx, dirty);
			} else {
				if_block10.d(1);
				if_block10 = current_block_type_3(ctx);

				if (if_block10) {
					if_block10.c();
					if_block10.m(div4, null);
				}
			}

			if (/*crossing*/ ctx[7]?.crossingTime !== null && /*crossing*/ ctx[7]?.crossingTime !== undefined && /*crossing*/ ctx[7].crossingTime > /*timestamp*/ ctx[6]) {
				if (if_block11) {
					if_block11.p(ctx, dirty);
				} else {
					if_block11 = create_if_block_4$1(ctx);
					if_block11.c();
					if_block11.m(t29.parentNode, t29);
				}
			} else if (if_block11) {
				if_block11.d(1);
				if_block11 = null;
			}

			if (/*chart*/ ctx[13].currentPhase?.confidence === 'low') {
				if (if_block12) ; else {
					if_block12 = create_if_block_3$1();
					if_block12.c();
					if_block12.m(t30.parentNode, t30);
				}
			} else if (if_block12) {
				if_block12.d(1);
				if_block12 = null;
			}

			if (/*event*/ ctx[14] && /*chart*/ ctx[13].coverageNote) {
				if (if_block13) {
					if_block13.p(ctx, dirty);
				} else {
					if_block13 = create_if_block_2$1(ctx);
					if_block13.c();
					if_block13.m(if_block13_anchor.parentNode, if_block13_anchor);
				}
			} else if (if_block13) {
				if_block13.d(1);
				if_block13 = null;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(div0);
				detach(t17);
				detach(div3);
				detach(t25);
				detach(div4);
				detach(t28);
				detach(t29);
				detach(t30);
				detach(if_block13_anchor);
			}

			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if_block2.d();
			destroy_each(each_blocks_1, detaching);
			if_block3.d();
			if (if_block4) if_block4.d();
			if (if_block5) if_block5.d();
			if (if_block6) if_block6.d();
			destroy_each(each_blocks, detaching);
			/*svg_binding*/ ctx[27](null);
			if (if_block7) if_block7.d();
			if_block8.d();
			if (if_block9) if_block9.d();
			if_block10.d();
			if (if_block11) if_block11.d(detaching);
			if (if_block12) if_block12.d(detaching);
			if (if_block13) if_block13.d(detaching);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (23:8) {#if chart.terrainY !== null}
function create_if_block_20(ctx) {
	let rect;
	let rect_y_value;
	let rect_height_value;
	let line;
	let line_y__value;
	let line_y__value_1;
	let text_1;
	let t;
	let text_1_y_value;

	return {
		c() {
			rect = svg_element("rect");
			line = svg_element("line");
			text_1 = svg_element("text");
			t = text("Terrain");
			attr(rect, "x", "42");
			attr(rect, "y", rect_y_value = /*chart*/ ctx[13].terrainY);
			attr(rect, "width", "306");
			attr(rect, "height", rect_height_value = Math.max(0, 130 - /*chart*/ ctx[13].terrainY));
			attr(rect, "class", "terrain-zone svelte-15xb6pf");
			attr(line, "x1", "42");
			attr(line, "x2", "348");
			attr(line, "y1", line_y__value = /*chart*/ ctx[13].terrainY);
			attr(line, "y2", line_y__value_1 = /*chart*/ ctx[13].terrainY);
			attr(line, "class", "terrain-line svelte-15xb6pf");
			attr(text_1, "x", "344");
			attr(text_1, "y", text_1_y_value = Math.max(27, /*chart*/ ctx[13].terrainY - 4));
			attr(text_1, "text-anchor", "end");
			attr(text_1, "class", "terrain-tag svelte-15xb6pf");
		},
		m(target, anchor) {
			insert(target, rect, anchor);
			insert(target, line, anchor);
			insert(target, text_1, anchor);
			append(text_1, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*chart*/ 8192 && rect_y_value !== (rect_y_value = /*chart*/ ctx[13].terrainY)) {
				attr(rect, "y", rect_y_value);
			}

			if (dirty[0] & /*chart*/ 8192 && rect_height_value !== (rect_height_value = Math.max(0, 130 - /*chart*/ ctx[13].terrainY))) {
				attr(rect, "height", rect_height_value);
			}

			if (dirty[0] & /*chart*/ 8192 && line_y__value !== (line_y__value = /*chart*/ ctx[13].terrainY)) {
				attr(line, "y1", line_y__value);
			}

			if (dirty[0] & /*chart*/ 8192 && line_y__value_1 !== (line_y__value_1 = /*chart*/ ctx[13].terrainY)) {
				attr(line, "y2", line_y__value_1);
			}

			if (dirty[0] & /*chart*/ 8192 && text_1_y_value !== (text_1_y_value = Math.max(27, /*chart*/ ctx[13].terrainY - 4))) {
				attr(text_1, "y", text_1_y_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(rect);
				detach(line);
				detach(text_1);
			}
		}
	};
}

// (35:8) {#if !chart.points.trim()}
function create_if_block_19(ctx) {
	let text_1;
	let t;

	return {
		c() {
			text_1 = svg_element("text");
			t = text("Atmospheric WBZ unresolved");
			attr(text_1, "x", "195");
			attr(text_1, "y", "65");
			attr(text_1, "text-anchor", "middle");
			attr(text_1, "class", "empty-band svelte-15xb6pf");
		},
		m(target, anchor) {
			insert(target, text_1, anchor);
			append(text_1, t);
		},
		d(detaching) {
			if (detaching) {
				detach(text_1);
			}
		}
	};
}

// (43:8) {:else}
function create_else_block_3(ctx) {
	let text_1;

	let t_value = (/*chart*/ ctx[13].precipCount
	? /*chart*/ ctx[13].coverageComplete
		? 'Dry'
		: 'Dry where data available'
	: 'Precipitation unavailable') + "";

	let t;

	return {
		c() {
			text_1 = svg_element("text");
			t = text(t_value);
			attr(text_1, "x", "195");
			attr(text_1, "y", "175");
			attr(text_1, "text-anchor", "middle");
			attr(text_1, "class", "empty-band svelte-15xb6pf");
		},
		m(target, anchor) {
			insert(target, text_1, anchor);
			append(text_1, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*chart*/ 8192 && t_value !== (t_value = (/*chart*/ ctx[13].precipCount
			? /*chart*/ ctx[13].coverageComplete
				? 'Dry'
				: 'Dry where data available'
			: 'Precipitation unavailable') + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) {
				detach(text_1);
			}
		}
	};
}

// (39:8) {#if chart.hasPrecip}
function create_if_block_18(ctx) {
	let text0;
	let t0_value = /*chart*/ ctx[13].precipMaxLabel + "";
	let t0;
	let text1;
	let t1;
	let each_1_anchor;
	let each_value_2 = ensure_array_like(/*chart*/ ctx[13].precipBars);
	let each_blocks = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
	}

	return {
		c() {
			text0 = svg_element("text");
			t0 = text(t0_value);
			text1 = svg_element("text");
			t1 = text("0");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
			attr(text0, "x", "37");
			attr(text0, "y", "159");
			attr(text0, "text-anchor", "end");
			attr(text0, "class", "axis precip-axis svelte-15xb6pf");
			attr(text1, "x", "37");
			attr(text1, "y", "190");
			attr(text1, "text-anchor", "end");
			attr(text1, "class", "axis svelte-15xb6pf");
		},
		m(target, anchor) {
			insert(target, text0, anchor);
			append(text0, t0);
			insert(target, text1, anchor);
			append(text1, t1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert(target, each_1_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*chart*/ 8192 && t0_value !== (t0_value = /*chart*/ ctx[13].precipMaxLabel + "")) set_data(t0, t0_value);

			if (dirty[0] & /*chart*/ 8192) {
				each_value_2 = ensure_array_like(/*chart*/ ctx[13].precipBars);
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2(ctx, each_value_2, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_2(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_2.length;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(text0);
				detach(text1);
				detach(each_1_anchor);
			}

			destroy_each(each_blocks, detaching);
		}
	};
}

// (42:10) {#each chart.precipBars as bar}
function create_each_block_2(ctx) {
	let rect;
	let rect_x_value;
	let rect_y_value;
	let rect_width_value;
	let rect_height_value;

	return {
		c() {
			rect = svg_element("rect");
			attr(rect, "x", rect_x_value = /*bar*/ ctx[52].x);
			attr(rect, "y", rect_y_value = /*bar*/ ctx[52].y);
			attr(rect, "width", rect_width_value = /*bar*/ ctx[52].width);
			attr(rect, "height", rect_height_value = /*bar*/ ctx[52].height);
			attr(rect, "rx", "1.1");
			attr(rect, "class", "precip-bar svelte-15xb6pf");
			toggle_class(rect, "wet", /*bar*/ ctx[52].mm >= PRECIP_THRESHOLD_MM_H);
		},
		m(target, anchor) {
			insert(target, rect, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*chart*/ 8192 && rect_x_value !== (rect_x_value = /*bar*/ ctx[52].x)) {
				attr(rect, "x", rect_x_value);
			}

			if (dirty[0] & /*chart*/ 8192 && rect_y_value !== (rect_y_value = /*bar*/ ctx[52].y)) {
				attr(rect, "y", rect_y_value);
			}

			if (dirty[0] & /*chart*/ 8192 && rect_width_value !== (rect_width_value = /*bar*/ ctx[52].width)) {
				attr(rect, "width", rect_width_value);
			}

			if (dirty[0] & /*chart*/ 8192 && rect_height_value !== (rect_height_value = /*bar*/ ctx[52].height)) {
				attr(rect, "height", rect_height_value);
			}

			if (dirty[0] & /*chart*/ 8192) {
				toggle_class(rect, "wet", /*bar*/ ctx[52].mm >= PRECIP_THRESHOLD_MM_H);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(rect);
			}
		}
	};
}

// (49:8) {#each chart.phaseBlocks as block}
function create_each_block_1(ctx) {
	let rect;
	let rect_x_value;
	let rect_width_value;
	let rect_class_value;

	return {
		c() {
			rect = svg_element("rect");
			attr(rect, "x", rect_x_value = /*block*/ ctx[49].x);
			attr(rect, "y", "212");
			attr(rect, "width", rect_width_value = /*block*/ ctx[49].width);
			attr(rect, "height", "23");
			attr(rect, "rx", "2.8");
			attr(rect, "class", rect_class_value = "" + (null_to_empty(`phase-block phase-${/*block*/ ctx[49].key}`) + " svelte-15xb6pf"));
		},
		m(target, anchor) {
			insert(target, rect, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*chart*/ 8192 && rect_x_value !== (rect_x_value = /*block*/ ctx[49].x)) {
				attr(rect, "x", rect_x_value);
			}

			if (dirty[0] & /*chart*/ 8192 && rect_width_value !== (rect_width_value = /*block*/ ctx[49].width)) {
				attr(rect, "width", rect_width_value);
			}

			if (dirty[0] & /*chart*/ 8192 && rect_class_value !== (rect_class_value = "" + (null_to_empty(`phase-block phase-${/*block*/ ctx[49].key}`) + " svelte-15xb6pf"))) {
				attr(rect, "class", rect_class_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(rect);
			}
		}
	};
}

// (66:8) {:else}
function create_else_block_2(ctx) {
	let text_1;

	let t_value = (/*chart*/ ctx[13].coverageComplete
	? /*units*/ ctx[5] === 'imperial' ? '0 in' : '0 cm'
	: /*chart*/ ctx[13].snowPrefix > 0
		? '0 · available period only'
		: 'Unavailable') + "";

	let t;

	return {
		c() {
			text_1 = svg_element("text");
			t = text(t_value);
			attr(text_1, "x", "195");
			attr(text_1, "y", "305");
			attr(text_1, "text-anchor", "middle");
			attr(text_1, "class", "empty-band svelte-15xb6pf");
		},
		m(target, anchor) {
			insert(target, text_1, anchor);
			append(text_1, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*chart, units*/ 8224 && t_value !== (t_value = (/*chart*/ ctx[13].coverageComplete
			? /*units*/ ctx[5] === 'imperial' ? '0 in' : '0 cm'
			: /*chart*/ ctx[13].snowPrefix > 0
				? '0 · available period only'
				: 'Unavailable') + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) {
				detach(text_1);
			}
		}
	};
}

// (62:8) {#if chart.newSnowMax > 0.05}
function create_if_block_17(ctx) {
	let text_1;
	let t_value = /*chart*/ ctx[13].newSnowMaxLabel + "";
	let t;
	let path;
	let path_d_value;
	let polyline;
	let polyline_points_value;

	return {
		c() {
			text_1 = svg_element("text");
			t = text(t_value);
			path = svg_element("path");
			polyline = svg_element("polyline");
			attr(text_1, "x", "37");
			attr(text_1, "y", "294");
			attr(text_1, "text-anchor", "end");
			attr(text_1, "class", "axis snow-axis svelte-15xb6pf");
			attr(path, "d", path_d_value = /*chart*/ ctx[13].newSnowArea);
			attr(path, "class", "new-snow-area svelte-15xb6pf");
			attr(polyline, "points", polyline_points_value = /*chart*/ ctx[13].newSnowPoints);
			attr(polyline, "class", "new-snow-line svelte-15xb6pf");
		},
		m(target, anchor) {
			insert(target, text_1, anchor);
			append(text_1, t);
			insert(target, path, anchor);
			insert(target, polyline, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*chart*/ 8192 && t_value !== (t_value = /*chart*/ ctx[13].newSnowMaxLabel + "")) set_data(t, t_value);

			if (dirty[0] & /*chart*/ 8192 && path_d_value !== (path_d_value = /*chart*/ ctx[13].newSnowArea)) {
				attr(path, "d", path_d_value);
			}

			if (dirty[0] & /*chart*/ 8192 && polyline_points_value !== (polyline_points_value = /*chart*/ ctx[13].newSnowPoints)) {
				attr(polyline, "points", polyline_points_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(text_1);
				detach(path);
				detach(polyline);
			}
		}
	};
}

// (70:8) {#if chart.nowX !== null}
function create_if_block_16(ctx) {
	let line;
	let line_x__value;
	let line_x__value_1;
	let rect;
	let rect_x_value;
	let text_1;
	let t;
	let text_1_x_value;

	return {
		c() {
			line = svg_element("line");
			rect = svg_element("rect");
			text_1 = svg_element("text");
			t = text("Now");
			attr(line, "x1", line_x__value = /*chart*/ ctx[13].nowX);
			attr(line, "x2", line_x__value_1 = /*chart*/ ctx[13].nowX);
			attr(line, "y1", "18");
			attr(line, "y2", "316");
			attr(line, "class", "now-line svelte-15xb6pf");
			attr(rect, "x", rect_x_value = Math.max(43, Math.min(322, /*chart*/ ctx[13].nowX - 13)));
			attr(rect, "y", "20");
			attr(rect, "width", "26");
			attr(rect, "height", "12");
			attr(rect, "rx", "3");
			attr(rect, "class", "now-tag-bg svelte-15xb6pf");
			attr(text_1, "x", text_1_x_value = Math.max(56, Math.min(335, /*chart*/ ctx[13].nowX)));
			attr(text_1, "y", "29");
			attr(text_1, "text-anchor", "middle");
			attr(text_1, "class", "now-tag svelte-15xb6pf");
		},
		m(target, anchor) {
			insert(target, line, anchor);
			insert(target, rect, anchor);
			insert(target, text_1, anchor);
			append(text_1, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*chart*/ 8192 && line_x__value !== (line_x__value = /*chart*/ ctx[13].nowX)) {
				attr(line, "x1", line_x__value);
			}

			if (dirty[0] & /*chart*/ 8192 && line_x__value_1 !== (line_x__value_1 = /*chart*/ ctx[13].nowX)) {
				attr(line, "x2", line_x__value_1);
			}

			if (dirty[0] & /*chart*/ 8192 && rect_x_value !== (rect_x_value = Math.max(43, Math.min(322, /*chart*/ ctx[13].nowX - 13)))) {
				attr(rect, "x", rect_x_value);
			}

			if (dirty[0] & /*chart*/ 8192 && text_1_x_value !== (text_1_x_value = Math.max(56, Math.min(335, /*chart*/ ctx[13].nowX)))) {
				attr(text_1, "x", text_1_x_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(line);
				detach(rect);
				detach(text_1);
			}
		}
	};
}

// (75:8) {#if chart.currentX !== null && chart.currentY !== null}
function create_if_block_15(ctx) {
	let line;
	let line_x__value;
	let line_x__value_1;
	let circle;
	let circle_cx_value;
	let circle_cy_value;

	return {
		c() {
			line = svg_element("line");
			circle = svg_element("circle");
			attr(line, "x1", line_x__value = /*chart*/ ctx[13].currentX);
			attr(line, "x2", line_x__value_1 = /*chart*/ ctx[13].currentX);
			attr(line, "y1", "18");
			attr(line, "y2", "316");
			attr(line, "class", "cursor svelte-15xb6pf");
			attr(circle, "cx", circle_cx_value = /*chart*/ ctx[13].currentX);
			attr(circle, "cy", circle_cy_value = /*chart*/ ctx[13].currentY);
			attr(circle, "r", "4.2");
			attr(circle, "class", "current-dot svelte-15xb6pf");
		},
		m(target, anchor) {
			insert(target, line, anchor);
			insert(target, circle, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*chart*/ 8192 && line_x__value !== (line_x__value = /*chart*/ ctx[13].currentX)) {
				attr(line, "x1", line_x__value);
			}

			if (dirty[0] & /*chart*/ 8192 && line_x__value_1 !== (line_x__value_1 = /*chart*/ ctx[13].currentX)) {
				attr(line, "x2", line_x__value_1);
			}

			if (dirty[0] & /*chart*/ 8192 && circle_cx_value !== (circle_cx_value = /*chart*/ ctx[13].currentX)) {
				attr(circle, "cx", circle_cx_value);
			}

			if (dirty[0] & /*chart*/ 8192 && circle_cy_value !== (circle_cy_value = /*chart*/ ctx[13].currentY)) {
				attr(circle, "cy", circle_cy_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(line);
				detach(circle);
			}
		}
	};
}

// (79:8) {#if tooltip}
function create_if_block_14(ctx) {
	let line;
	let line_x__value;
	let line_x__value_1;

	return {
		c() {
			line = svg_element("line");
			attr(line, "x1", line_x__value = /*tooltip*/ ctx[12].x);
			attr(line, "x2", line_x__value_1 = /*tooltip*/ ctx[12].x);
			attr(line, "y1", "18");
			attr(line, "y2", "316");
			attr(line, "class", "inspect-line svelte-15xb6pf");
		},
		m(target, anchor) {
			insert(target, line, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*tooltip*/ 4096 && line_x__value !== (line_x__value = /*tooltip*/ ctx[12].x)) {
				attr(line, "x1", line_x__value);
			}

			if (dirty[0] & /*tooltip*/ 4096 && line_x__value_1 !== (line_x__value_1 = /*tooltip*/ ctx[12].x)) {
				attr(line, "x2", line_x__value_1);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(line);
			}
		}
	};
}

// (81:8) {#each [24,48,72,96,120,144] as hour}
function create_each_block(ctx) {
	let text_1;
	let t0;
	let t1;
	let t2;

	return {
		c() {
			text_1 = svg_element("text");
			t0 = text("+");
			t1 = text(/*hour*/ ctx[46]);
			t2 = text(" h");
			attr(text_1, "x", 42 + 306 * /*hour*/ ctx[46] / 144);
			attr(text_1, "y", "334");
			attr(text_1, "text-anchor", /*hour*/ ctx[46] === 144 ? 'end' : 'middle');
			attr(text_1, "class", "axis timeline-tick svelte-15xb6pf");
		},
		m(target, anchor) {
			insert(target, text_1, anchor);
			append(text_1, t0);
			append(text_1, t1);
			append(text_1, t2);
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(text_1);
			}
		}
	};
}

// (86:6) {#if tooltip}
function create_if_block_11(ctx) {
	let div1;
	let b0;
	let t0_value = /*tooltip*/ ctx[12].timeLabel + "";
	let t0;
	let t1;
	let t2;
	let div0;
	let span0;
	let t3;
	let b1;

	let t4_value = (/*tooltip*/ ctx[12].snowline === null
	? 'Unresolved'
	: formatElevation(/*tooltip*/ ctx[12].snowline, /*units*/ ctx[5])) + "";

	let t4;
	let t5;
	let span1;
	let t6;
	let b2;
	let t7_value = formatPrecip(/*tooltip*/ ctx[12].precip, /*units*/ ctx[5]) + "";
	let t7;
	let t8;
	let span2;
	let t9;
	let b3;
	let t10_value = formatSnow(/*tooltip*/ ctx[12].newSnow, /*units*/ ctx[5]) + "";
	let t10;
	let t11;
	let div1_style_value;
	let if_block0 = /*tooltip*/ ctx[12].phase && create_if_block_13(ctx);
	let if_block1 = /*terrainM*/ ctx[3] !== null && create_if_block_12(ctx);

	return {
		c() {
			div1 = element("div");
			b0 = element("b");
			t0 = text(t0_value);
			t1 = space();
			if (if_block0) if_block0.c();
			t2 = space();
			div0 = element("div");
			span0 = element("span");
			t3 = text("SL ");
			b1 = element("b");
			t4 = text(t4_value);
			t5 = space();
			span1 = element("span");
			t6 = text("Precip ");
			b2 = element("b");
			t7 = text(t7_value);
			t8 = space();
			span2 = element("span");
			t9 = text("New snow ");
			b3 = element("b");
			t10 = text(t10_value);
			t11 = space();
			if (if_block1) if_block1.c();
			attr(b0, "class", "svelte-15xb6pf");
			attr(b1, "class", "svelte-15xb6pf");
			attr(span0, "class", "svelte-15xb6pf");
			attr(b2, "class", "svelte-15xb6pf");
			attr(span1, "class", "svelte-15xb6pf");
			attr(b3, "class", "svelte-15xb6pf");
			attr(span2, "class", "svelte-15xb6pf");
			attr(div0, "class", "tip-grid svelte-15xb6pf");
			attr(div1, "class", "tooltip svelte-15xb6pf");
			attr(div1, "style", div1_style_value = `left:${/*tooltip*/ ctx[12].cssX}px;top:${/*tooltip*/ ctx[12].cssY}px;`);
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, b0);
			append(b0, t0);
			append(div1, t1);
			if (if_block0) if_block0.m(div1, null);
			append(div1, t2);
			append(div1, div0);
			append(div0, span0);
			append(span0, t3);
			append(span0, b1);
			append(b1, t4);
			append(div0, t5);
			append(div0, span1);
			append(span1, t6);
			append(span1, b2);
			append(b2, t7);
			append(div0, t8);
			append(div0, span2);
			append(span2, t9);
			append(span2, b3);
			append(b3, t10);
			append(div0, t11);
			if (if_block1) if_block1.m(div0, null);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*tooltip*/ 4096 && t0_value !== (t0_value = /*tooltip*/ ctx[12].timeLabel + "")) set_data(t0, t0_value);

			if (/*tooltip*/ ctx[12].phase) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_13(ctx);
					if_block0.c();
					if_block0.m(div1, t2);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty[0] & /*tooltip, units*/ 4128 && t4_value !== (t4_value = (/*tooltip*/ ctx[12].snowline === null
			? 'Unresolved'
			: formatElevation(/*tooltip*/ ctx[12].snowline, /*units*/ ctx[5])) + "")) set_data(t4, t4_value);

			if (dirty[0] & /*tooltip, units*/ 4128 && t7_value !== (t7_value = formatPrecip(/*tooltip*/ ctx[12].precip, /*units*/ ctx[5]) + "")) set_data(t7, t7_value);
			if (dirty[0] & /*tooltip, units*/ 4128 && t10_value !== (t10_value = formatSnow(/*tooltip*/ ctx[12].newSnow, /*units*/ ctx[5]) + "")) set_data(t10, t10_value);

			if (/*terrainM*/ ctx[3] !== null) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_12(ctx);
					if_block1.c();
					if_block1.m(div0, null);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (dirty[0] & /*tooltip*/ 4096 && div1_style_value !== (div1_style_value = `left:${/*tooltip*/ ctx[12].cssX}px;top:${/*tooltip*/ ctx[12].cssY}px;`)) {
				attr(div1, "style", div1_style_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(div1);
			}

			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
		}
	};
}

// (89:10) {#if tooltip.phase}
function create_if_block_13(ctx) {
	let strong;
	let i;
	let i_class_value;
	let t_value = precipitationLabel(/*tooltip*/ ctx[12].phase) + "";
	let t;
	let strong_class_value;

	return {
		c() {
			strong = element("strong");
			i = element("i");
			t = text(t_value);
			attr(i, "class", i_class_value = "" + (null_to_empty(`tip-phase-dot phase-${/*tooltip*/ ctx[12].phase.key}`) + " svelte-15xb6pf"));
			attr(strong, "class", strong_class_value = "" + (null_to_empty(`text-${/*tooltip*/ ctx[12].phase.key}`) + " svelte-15xb6pf"));
		},
		m(target, anchor) {
			insert(target, strong, anchor);
			append(strong, i);
			append(strong, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*tooltip*/ 4096 && i_class_value !== (i_class_value = "" + (null_to_empty(`tip-phase-dot phase-${/*tooltip*/ ctx[12].phase.key}`) + " svelte-15xb6pf"))) {
				attr(i, "class", i_class_value);
			}

			if (dirty[0] & /*tooltip*/ 4096 && t_value !== (t_value = precipitationLabel(/*tooltip*/ ctx[12].phase) + "")) set_data(t, t_value);

			if (dirty[0] & /*tooltip*/ 4096 && strong_class_value !== (strong_class_value = "" + (null_to_empty(`text-${/*tooltip*/ ctx[12].phase.key}`) + " svelte-15xb6pf"))) {
				attr(strong, "class", strong_class_value);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(strong);
			}
		}
	};
}

// (94:12) {#if terrainM !== null}
function create_if_block_12(ctx) {
	let span;
	let t0;
	let b;
	let t1_value = formatElevation(/*terrainM*/ ctx[3], /*units*/ ctx[5]) + "";
	let t1;

	return {
		c() {
			span = element("span");
			t0 = text("Terrain ");
			b = element("b");
			t1 = text(t1_value);
			attr(b, "class", "svelte-15xb6pf");
			attr(span, "class", "svelte-15xb6pf");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t0);
			append(span, b);
			append(b, t1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*terrainM, units*/ 40 && t1_value !== (t1_value = formatElevation(/*terrainM*/ ctx[3], /*units*/ ctx[5]) + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}
		}
	};
}

// (102:142) {:else}
function create_else_block_1(ctx) {
	let t_value = /*chart*/ ctx[13].currentCondition + "";
	let t;

	return {
		c() {
			t = text(t_value);
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*chart*/ 8192 && t_value !== (t_value = /*chart*/ ctx[13].currentCondition + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) {
				detach(t);
			}
		}
	};
}

// (102:11) {#if chart.currentPhase}
function create_if_block_10(ctx) {
	let i;
	let i_class_value;
	let t_value = precipitationLabel(/*chart*/ ctx[13].currentPhase) + "";
	let t;

	return {
		c() {
			i = element("i");
			t = text(t_value);
			attr(i, "class", i_class_value = "" + (null_to_empty(`current-phase-dot phase-${/*chart*/ ctx[13].currentPhase.key}`) + " svelte-15xb6pf"));
		},
		m(target, anchor) {
			insert(target, i, anchor);
			insert(target, t, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*chart*/ 8192 && i_class_value !== (i_class_value = "" + (null_to_empty(`current-phase-dot phase-${/*chart*/ ctx[13].currentPhase.key}`) + " svelte-15xb6pf"))) {
				attr(i, "class", i_class_value);
			}

			if (dirty[0] & /*chart*/ 8192 && t_value !== (t_value = precipitationLabel(/*chart*/ ctx[13].currentPhase) + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) {
				detach(i);
				detach(t);
			}
		}
	};
}

// (103:8) {#if chart.currentPosition}
function create_if_block_9(ctx) {
	let strong;
	let t_value = /*chart*/ ctx[13].currentPosition + "";
	let t;

	return {
		c() {
			strong = element("strong");
			t = text(t_value);
			attr(strong, "class", "svelte-15xb6pf");
		},
		m(target, anchor) {
			insert(target, strong, anchor);
			append(strong, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*chart*/ 8192 && t_value !== (t_value = /*chart*/ ctx[13].currentPosition + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) {
				detach(strong);
			}
		}
	};
}

// (116:6) {:else}
function create_else_block(ctx) {
	let span;
	let t_value = noEventMessage(/*point*/ ctx[2], /*terrainM*/ ctx[3], /*timestamp*/ ctx[6]) + "";
	let t;

	return {
		c() {
			span = element("span");
			t = text(t_value);
			attr(span, "class", "svelte-15xb6pf");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*point, terrainM, timestamp*/ 76 && t_value !== (t_value = noEventMessage(/*point*/ ctx[2], /*terrainM*/ ctx[3], /*timestamp*/ ctx[6]) + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}
		}
	};
}

// (113:6) {#if event}
function create_if_block_5(ctx) {
	let span;
	let t0_value = /*event*/ ctx[14].dominantPhase.icon + "";
	let t0;
	let t1;
	let t2_value = precipitationLabel(/*event*/ ctx[14].dominantPhase, /*event*/ ctx[14].confidence) + "";
	let t2;
	let t3;
	let t4_value = formatEventRange(/*event*/ ctx[14].startTime, /*event*/ ctx[14].endTime) + "";
	let t4;
	let t5;
	let if_block1_anchor;

	function select_block_type_6(ctx, dirty) {
		if (/*event*/ ctx[14].incomplete) return create_if_block_7;
		if (/*event*/ ctx[14].newSnowCm > 0.05) return create_if_block_8;
	}

	let current_block_type = select_block_type_6(ctx);
	let if_block0 = current_block_type && current_block_type(ctx);
	let if_block1 = !/*event*/ ctx[14].activeNow && create_if_block_6(ctx);

	return {
		c() {
			span = element("span");
			t0 = text(t0_value);
			t1 = space();
			t2 = text(t2_value);
			t3 = text(" · ");
			t4 = text(t4_value);
			if (if_block0) if_block0.c();
			t5 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			attr(span, "class", "svelte-15xb6pf");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t0);
			append(span, t1);
			append(span, t2);
			append(span, t3);
			append(span, t4);
			if (if_block0) if_block0.m(span, null);
			insert(target, t5, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert(target, if_block1_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*event*/ 16384 && t0_value !== (t0_value = /*event*/ ctx[14].dominantPhase.icon + "")) set_data(t0, t0_value);
			if (dirty[0] & /*event*/ 16384 && t2_value !== (t2_value = precipitationLabel(/*event*/ ctx[14].dominantPhase, /*event*/ ctx[14].confidence) + "")) set_data(t2, t2_value);
			if (dirty[0] & /*event*/ 16384 && t4_value !== (t4_value = formatEventRange(/*event*/ ctx[14].startTime, /*event*/ ctx[14].endTime) + "")) set_data(t4, t4_value);

			if (current_block_type === (current_block_type = select_block_type_6(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if (if_block0) if_block0.d(1);
				if_block0 = current_block_type && current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(span, null);
				}
			}

			if (!/*event*/ ctx[14].activeNow) {
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
		},
		d(detaching) {
			if (detaching) {
				detach(span);
				detach(t5);
				detach(if_block1_anchor);
			}

			if (if_block0) {
				if_block0.d();
			}

			if (if_block1) if_block1.d(detaching);
		}
	};
}

// (114:226) 
function create_if_block_8(ctx) {
	let t0;
	let t1_value = formatSnow(/*event*/ ctx[14].newSnowCm, /*units*/ ctx[5]) + "";
	let t1;
	let t2_value = (/*event*/ ctx[14].activeNow ? ' remaining' : '') + "";
	let t2;

	return {
		c() {
			t0 = text("· est. ");
			t1 = text(t1_value);
			t2 = text(t2_value);
		},
		m(target, anchor) {
			insert(target, t0, anchor);
			insert(target, t1, anchor);
			insert(target, t2, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*event, units*/ 16416 && t1_value !== (t1_value = formatSnow(/*event*/ ctx[14].newSnowCm, /*units*/ ctx[5]) + "")) set_data(t1, t1_value);
			if (dirty[0] & /*event*/ 16384 && t2_value !== (t2_value = (/*event*/ ctx[14].activeNow ? ' remaining' : '') + "")) set_data(t2, t2_value);
		},
		d(detaching) {
			if (detaching) {
				detach(t0);
				detach(t1);
				detach(t2);
			}
		}
	};
}

// (114:152) {#if event.incomplete}
function create_if_block_7(ctx) {
	let t;

	return {
		c() {
			t = text("· Amount uncertain");
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(t);
			}
		}
	};
}

// (115:8) {#if !event.activeNow}
function create_if_block_6(ctx) {
	let button;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
			button.textContent = "Go to event →";
			attr(button, "type", "button");
			attr(button, "title", "Jump to event start");
			attr(button, "class", "svelte-15xb6pf");
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (!mounted) {
				dispose = listen(button, "click", /*jumpToEvent*/ ctx[19]);
				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(button);
			}

			mounted = false;
			dispose();
		}
	};
}

// (120:4) {#if crossing?.crossingTime !== null && crossing?.crossingTime !== undefined && crossing.crossingTime > timestamp}
function create_if_block_4$1(ctx) {
	let button;

	let t0_value = (/*crossing*/ ctx[7].direction === 'below'
	? 'Snowline falls below this elevation'
	: 'Snowline rises above this elevation') + "";

	let t0;
	let t1;
	let t2_value = formatShortTime(/*crossing*/ ctx[7].crossingTime) + "";
	let t2;
	let t3;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
			t0 = text(t0_value);
			t1 = text(" · ");
			t2 = text(t2_value);
			t3 = text(" →");
			attr(button, "class", "crossing-action svelte-15xb6pf");
			attr(button, "type", "button");
		},
		m(target, anchor) {
			insert(target, button, anchor);
			append(button, t0);
			append(button, t1);
			append(button, t2);
			append(button, t3);

			if (!mounted) {
				dispose = listen(button, "click", /*click_handler_3*/ ctx[29]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*crossing*/ 128 && t0_value !== (t0_value = (/*crossing*/ ctx[7].direction === 'below'
			? 'Snowline falls below this elevation'
			: 'Snowline rises above this elevation') + "")) set_data(t0, t0_value);

			if (dirty[0] & /*crossing*/ 128 && t2_value !== (t2_value = formatShortTime(/*crossing*/ ctx[7].crossingTime) + "")) set_data(t2, t2_value);
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

// (121:4) {#if chart.currentPhase?.confidence === 'low'}
function create_if_block_3$1(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = "Limited atmospheric detail at this elevation; type may differ.";
			attr(div, "class", "quality-note svelte-15xb6pf");
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

// (122:4) {#if event && chart.coverageNote}
function create_if_block_2$1(ctx) {
	let div;
	let t_value = /*chart*/ ctx[13].coverageNote + "";
	let t;

	return {
		c() {
			div = element("div");
			t = text(t_value);
			attr(div, "class", "quality-note svelte-15xb6pf");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*chart*/ 8192 && t_value !== (t_value = /*chart*/ ctx[13].coverageNote + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

function create_fragment$2(ctx) {
	let div4;
	let div2;
	let div0;
	let b;
	let t1;
	let small;
	let t2_value = (/*placeName*/ ctx[4] || 'Selected point') + "";
	let t2;
	let t3;
	let em;
	let t4_value = (/*chart*/ ctx[13]?.validLabel ?? 'ECMWF profile · Windy terrain') + "";
	let t4;
	let t5;
	let div1;
	let t6;
	let t7;
	let t8;
	let div3;
	let button0;
	let t9;
	let button0_aria_selected_value;
	let button1;
	let t10;
	let button1_aria_selected_value;
	let t11;
	let current_block_type_index;
	let if_block3;
	let div4_role_value;
	let div4_style_value;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*tab*/ ctx[0] === 'graph' && /*showNow*/ ctx[15] && create_if_block_23(ctx);
	let if_block1 = /*tab*/ ctx[0] === 'graph' && /*chart*/ ctx[13] && create_if_block_22(ctx);
	let if_block2 = !/*embedded*/ ctx[1] && create_if_block_21(ctx);
	const if_block_creators = [create_if_block$1, create_else_block_5];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*tab*/ ctx[0] === 'graph') return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block3 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			div4 = element("div");
			div2 = element("div");
			div0 = element("div");
			b = element("b");
			b.textContent = "Wintry forecast";
			t1 = space();
			small = element("small");
			t2 = text(t2_value);
			t3 = space();
			em = element("em");
			t4 = text(t4_value);
			t5 = space();
			div1 = element("div");
			if (if_block0) if_block0.c();
			t6 = space();
			if (if_block1) if_block1.c();
			t7 = space();
			if (if_block2) if_block2.c();
			t8 = space();
			div3 = element("div");
			button0 = element("button");
			t9 = text("Forecast");
			button1 = element("button");
			t10 = text("Sounding");
			t11 = space();
			if_block3.c();
			attr(b, "class", "svelte-15xb6pf");
			attr(small, "class", "svelte-15xb6pf");
			attr(em, "class", "svelte-15xb6pf");
			attr(div0, "class", "chart-title svelte-15xb6pf");
			attr(div1, "class", "chart-actions svelte-15xb6pf");
			attr(div2, "class", "chart-head svelte-15xb6pf");
			attr(button0, "type", "button");
			attr(button0, "role", "tab");
			attr(button0, "aria-selected", button0_aria_selected_value = /*tab*/ ctx[0] === 'graph');
			attr(button0, "class", "svelte-15xb6pf");
			toggle_class(button0, "active", /*tab*/ ctx[0] === 'graph');
			attr(button1, "type", "button");
			attr(button1, "role", "tab");
			attr(button1, "aria-selected", button1_aria_selected_value = /*tab*/ ctx[0] === 'sounding');
			attr(button1, "class", "svelte-15xb6pf");
			toggle_class(button1, "active", /*tab*/ ctx[0] === 'sounding');
			attr(div3, "class", "forecast-tabs svelte-15xb6pf");
			attr(div3, "role", "tablist");
			attr(div3, "aria-label", "Forecast view");
			attr(div4, "class", "chart-shell svelte-15xb6pf");
			attr(div4, "role", div4_role_value = /*embedded*/ ctx[1] ? 'region' : 'dialog');
			attr(div4, "aria-modal", "false");
			attr(div4, "aria-label", "Wintry forecast graph");

			attr(div4, "style", div4_style_value = /*embedded*/ ctx[1]
			? ''
			: `left:${/*position*/ ctx[11].x}px;top:${/*position*/ ctx[11].y}px;transform:none;`);

			toggle_class(div4, "embedded", /*embedded*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, div4, anchor);
			append(div4, div2);
			append(div2, div0);
			append(div0, b);
			append(div0, t1);
			append(div0, small);
			append(small, t2);
			append(div0, t3);
			append(div0, em);
			append(em, t4);
			append(div2, t5);
			append(div2, div1);
			if (if_block0) if_block0.m(div1, null);
			append(div1, t6);
			if (if_block1) if_block1.m(div1, null);
			append(div1, t7);
			if (if_block2) if_block2.m(div1, null);
			append(div4, t8);
			append(div4, div3);
			append(div3, button0);
			append(button0, t9);
			append(div3, button1);
			append(button1, t10);
			append(div4, t11);
			if_blocks[current_block_type_index].m(div4, null);
			/*div4_binding*/ ctx[30](div4);
			current = true;

			if (!mounted) {
				dispose = [
					listen(button0, "click", /*click_handler_1*/ ctx[25]),
					listen(button1, "click", /*click_handler_2*/ ctx[26])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if ((!current || dirty[0] & /*placeName*/ 16) && t2_value !== (t2_value = (/*placeName*/ ctx[4] || 'Selected point') + "")) set_data(t2, t2_value);
			if ((!current || dirty[0] & /*chart*/ 8192) && t4_value !== (t4_value = (/*chart*/ ctx[13]?.validLabel ?? 'ECMWF profile · Windy terrain') + "")) set_data(t4, t4_value);

			if (/*tab*/ ctx[0] === 'graph' && /*showNow*/ ctx[15]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_23(ctx);
					if_block0.c();
					if_block0.m(div1, t6);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*tab*/ ctx[0] === 'graph' && /*chart*/ ctx[13]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_22(ctx);
					if_block1.c();
					if_block1.m(div1, t7);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (!/*embedded*/ ctx[1]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_21(ctx);
					if_block2.c();
					if_block2.m(div1, null);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (!current || dirty[0] & /*tab*/ 1 && button0_aria_selected_value !== (button0_aria_selected_value = /*tab*/ ctx[0] === 'graph')) {
				attr(button0, "aria-selected", button0_aria_selected_value);
			}

			if (!current || dirty[0] & /*tab*/ 1) {
				toggle_class(button0, "active", /*tab*/ ctx[0] === 'graph');
			}

			if (!current || dirty[0] & /*tab*/ 1 && button1_aria_selected_value !== (button1_aria_selected_value = /*tab*/ ctx[0] === 'sounding')) {
				attr(button1, "aria-selected", button1_aria_selected_value);
			}

			if (!current || dirty[0] & /*tab*/ 1) {
				toggle_class(button1, "active", /*tab*/ ctx[0] === 'sounding');
			}

			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block3 = if_blocks[current_block_type_index];

				if (!if_block3) {
					if_block3 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block3.c();
				} else {
					if_block3.p(ctx, dirty);
				}

				transition_in(if_block3, 1);
				if_block3.m(div4, null);
			}

			if (!current || dirty[0] & /*embedded*/ 2 && div4_role_value !== (div4_role_value = /*embedded*/ ctx[1] ? 'region' : 'dialog')) {
				attr(div4, "role", div4_role_value);
			}

			if (!current || dirty[0] & /*embedded, position*/ 2050 && div4_style_value !== (div4_style_value = /*embedded*/ ctx[1]
			? ''
			: `left:${/*position*/ ctx[11].x}px;top:${/*position*/ ctx[11].y}px;transform:none;`)) {
				attr(div4, "style", div4_style_value);
			}

			if (!current || dirty[0] & /*embedded*/ 2) {
				toggle_class(div4, "embedded", /*embedded*/ ctx[1]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block3);
			current = true;
		},
		o(local) {
			transition_out(if_block3);
			current = false;
		},
		d(detaching) {
			if (detaching) {
				detach(div4);
			}

			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if_blocks[current_block_type_index].d();
			/*div4_binding*/ ctx[30](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function formatTooltipTime(time) {
	return new Date(time).toLocaleString(undefined, {
		weekday: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
}

function formatShortTime(time) {
	return new Date(time).toLocaleString(undefined, {
		weekday: 'short',
		hour: '2-digit',
		minute: '2-digit'
	});
}

function formatRun(time) {
	if (time === null || !Number.isFinite(time)) return 'ECMWF · run unavailable';
	return `ECMWF ${String(new Date(Number(time)).getUTCHours()).padStart(2, '0')}Z`;
}

function phaseName(key) {
	if (!key) return 'Dry';

	const labels = {
		snow: 'Snow',
		'wet-snow': 'Wet snow',
		mix: 'Mix',
		rain: 'Rain',
		'ice-pellets': 'Ice pellets',
		'freezing-rain': 'Freezing rain'
	};

	return labels[key];
}

function formatEventRange(start, end) {
	const a = formatShortTime(start),
		b = new Date(start).toDateString() === new Date(end).toDateString()
		? new Date(end).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
		: formatShortTime(end);

	return start === end ? a : `${a}–${b}`;
}

function instance$2($$self, $$props, $$invalidate) {
	let crossing;
	let event;
	let chart;
	let showNow;
	let { embedded = false } = $$props;
	let { point } = $$props;
	let { terrainM = null } = $$props;
	let { placeName = '' } = $$props;
	let { tab = 'graph' } = $$props;
	let { units = 'metric' } = $$props;
	const dispatch = createEventDispatcher();
	let timestamp = Date.now();
	let realNow = Date.now();

	const onTimestamp = v => {
		const n = Number(v);
		if (Number.isFinite(n)) $$invalidate(6, timestamp = n);
	};

	let realNowTimer = null;
	let pngBusy = false;
	let chartShell = null;
	let svgEl = null;
	let position = { x: 24, y: 60 };
	let dragPointerId = null;
	let dragOffset = { x: 0, y: 0 };
	let tooltip = null;

	function snowlineAt(p, index) {
		try {
			const v = wetBulbZeroHeight(buildProfile(p.forecast, index)).snowLevelM;
			return v !== null && Number.isFinite(v) ? v : null;
		} catch {
			return null;
		}
	}

	function phaseAt(p, terrain, index) {
		if (terrain === null || !Number.isFinite(terrain)) return null;
		const precip = precipMmAt(p.forecast, index);
		if (precip === null || precip < PRECIP_THRESHOLD_MM_H) return null;
		return terrainPrecipitationType(buildProfile(p.forecast, index), terrain);
	}

	function terrainPosition(difference) {
		if (difference === null) return '';
		const value = formatElevation(Math.abs(difference), units);
		if (difference > 100) return `${value} above snowline`;
		if (difference < -100) return `${value} below snowline`;
		return 'Terrain near snowline';
	}

	function clampPosition(x, y) {
		const rect = chartShell?.getBoundingClientRect();
		const w = rect?.width ?? 430, h = rect?.height ?? 590;

		return {
			x: Math.max(6, Math.min(window.innerWidth - w - 6, x)),
			y: Math.max(6, Math.min(window.innerHeight - h - 6, y))
		};
	}

	function startDrag(event) {
		if (!chartShell) return;
		dragPointerId = event.pointerId;
		const rect = chartShell.getBoundingClientRect();

		dragOffset = {
			x: event.clientX - rect.left,
			y: event.clientY - rect.top
		};

		window.addEventListener('pointermove', dragMove);
		window.addEventListener('pointerup', stopDrag, { once: true });
		event.preventDefault();
	}

	function dragMove(event) {
		if (event.pointerId === dragPointerId) $$invalidate(11, position = clampPosition(event.clientX - dragOffset.x, event.clientY - dragOffset.y));
	}

	function stopDrag(event) {
		if (event.pointerId === dragPointerId) dragPointerId = null;
		window.removeEventListener('pointermove', dragMove);
	}

	function setTimeline(time) {
		if (!Number.isFinite(time)) return;

		try {
			store.set('timestamp', time);
			$$invalidate(6, timestamp = time);
			$$invalidate(12, tooltip = null);
		} catch {
			
		}
	}

	function jumpToCrossing(time) {
		setTimeline(time);
	}

	function jumpToEvent() {
		if (event?.startTime) setTimeline(event.startTime);
	}

	function resetToNow() {
		if (!point?.times?.length) return;
		$$invalidate(23, realNow = Date.now());
		setTimeline(realNow);
	}

	function buildBlocks(p, phases, x) {
		const blocks = [];

		for (let i = 0; i < phases.length; i++) {
			const phase = phases[i];
			if (!phase) continue;

			const left = Math.max(42, x(p.times[i])),
				right = Math.min(348, x(intervalEnd(p.times, i)));

			if (right <= left) continue;
			const previous = blocks.at(-1);

			if (previous?.key === phase.key && Math.abs(previous.x + previous.width - left) < 0.01) previous.width = right - previous.x; else blocks.push({
				x: left,
				width: right - left,
				key: phase.key
			});
		}

		return blocks;
	}

	function phaseSummary(phases, precip, newSnow) {
		const amounts = {
			snow: 0,
			'wet-snow': 0,
			mix: 0,
			rain: 0,
			'ice-pellets': 0,
			'freezing-rain': 0
		};

		let total = 0;

		phases.forEach((phase, i) => {
			const mm = precip[i];
			if (!phase || mm === null || mm < PRECIP_THRESHOLD_MM_H) return;
			amounts[phase.key] += mm;
			total += mm;
		});

		const finalSnow = newSnow.length ? newSnow[newSnow.length - 1] : 0;
		if (total < PRECIP_THRESHOLD_MM_H) return 'Dry forecast · no meaningful precipitation.';
		const ranked = Object.entries(amounts).sort((a, b) => b[1] - a[1]);
		const [key, amount] = ranked[0], pct = Math.round(amount / total * 100);
		return `${phaseName(key)} ${pct}% · new snow est. ${formatSnow(finalSnow, units)}`;
	}

	function buildChart(p, terrain, target, crossingTime, now, units) {
		if (!p?.times?.length) return null;
		const samples = p.times.map((time, i) => ({ time, value: snowlineAt(p, i) }));
		const entries = samples.filter(v => v.value !== null && Number.isFinite(v.value));

		const snow = entries.map(v => Number(v.value)),
			scaleValues = terrain !== null && Number.isFinite(terrain)
			? [...snow, terrain]
			: snow.length ? snow : [0];

		let min = Math.floor((Math.min(...scaleValues) - 150) / 100) * 100,
			max = Math.ceil((Math.max(...scaleValues) + 150) / 100) * 100;

		if (max - min < 600) {
			const mid = (min + max) / 2;
			min = Math.floor((mid - 300) / 100) * 100;
			max = Math.ceil((mid + 300) / 100) * 100;
		}

		const left = 42,
			right = 348,
			top = 18,
			bottom = 130,
			t0 = p.times[0],
			t1 = t0 + 144 * 3600_000;

		const x = t => left + (t - t0) / Math.max(1, t1 - t0) * (right - left),
			y = v => bottom - (v - min) / Math.max(1, max - min) * (bottom - top);

		let connected = false;

		const points = samples.map((v, i) => {
			if (i > 0 && v.time - samples[i - 1].time > 3 * 3600_000) connected = false;

			if (v.value === null) {
				connected = false;
				return '';
			}

			const command = connected ? 'L' : 'M';
			connected = true;
			return `${command}${x(v.time).toFixed(1)},${y(v.value).toFixed(1)}`;
		}).join(' ');

		const currentIndex = forecastIntervalIndex(p.times, target);
		if (currentIndex < 0) return null;

		const currentValue = snowlineAt(p, currentIndex),
			currentTime = p.times[currentIndex];

		const currentTerrainDifference = currentValue !== null && terrain !== null
		? Math.round((terrain - currentValue) / 10) * 10
		: null;

		const precipValues = p.times.map((_, i) => precipMmAt(p.forecast, i)),
			validPrecip = precipValues.filter(v => v !== null && Number.isFinite(v)),
			precipMax = validPrecip.length
			? Math.max(PRECIP_THRESHOLD_MM_H, ...validPrecip)
			: 0;

		const spacing = p.times.length > 1
			? x(p.times[1]) - x(p.times[0])
			: 306 * 3 / 144,
			barWidth = Math.max(1.1, Math.min(4.5, spacing * .78));

		const precipBars = precipValues.map((mm, i) => {
			const value = mm ?? 0,
				height = precipMax > 0 ? Math.min(30, value / precipMax * 30) : 0;

			return {
				x: Math.min(348 - barWidth, x(p.times[i])),
				y: 188 - height,
				width: barWidth,
				height,
				mm: value
			};
		}).filter((b, i) => b.height > .1 && p.times[i] < t1);

		const phases = p.times.map((_, i) => phaseAt(p, terrain, i));
		const coverage = forecastCoverage(precipValues, phases, p.times);
		const cumulativeNewSnow = [];
		let running = 0;

		for (let i = 0; i < p.times.length; i++) {
			const dt = Math.max(0, (intervalEnd(p.times, i) - p.times[i]) / 3600_000);
			running = estimateNewSnowStep(precipValues[i], phases[i], running, dt).cumulativeCm;
			cumulativeNewSnow.push(running);
		}

		const newSnowMax = Math.max(0, ...cumulativeNewSnow.slice(0, coverage.prefix)),
			snowTop = 288,
			snowBottom = 316;

		const snowY = v => snowBottom - (newSnowMax > 0
		? v / newSnowMax * (snowBottom - snowTop)
		: 0);

		const newSnowPoints = coverage.prefix
		? [
				`${x(t0).toFixed(1)},${snowBottom}`,
				...cumulativeNewSnow.slice(0, coverage.prefix).map((v, i) => `${x(intervalEnd(p.times, i)).toFixed(1)},${snowY(v).toFixed(1)}`)
			].join(' ')
		: '';

		const newSnowArea = coverage.prefix > 0
		? `M ${x(p.times[0]).toFixed(1)} ${snowBottom} L ${newSnowPoints.replace(/,/g, ' ')} L ${x(intervalEnd(p.times, coverage.prefix - 1)).toFixed(1)} ${snowBottom} Z`
		: '';

		const end24 = target + 24 * 3600_000;
		const windowIndices = p.times.map((time, i) => ({ time, i })).filter(v => v.time + forecastIntervalHours(p.times, v.i) * 3600_000 > target && v.time < end24).map(v => v.i);
		const minEntry = windowIndices.map(i => ({ i, value: snowlineAt(p, i) })).filter(v => v.value !== null && Number.isFinite(v.value)).sort((a, b) => a.value - b.value)[0] ?? null;

		const min24Snowline = minEntry
		? Math.round(Number(minEntry.value) / 10) * 10
		: null;

		let newSnow24h = 0;

		for (const i of windowIndices) {
			if (p.times[i] >= end24) continue;
			const dt = (Math.min(end24, p.times[i] + forecastIntervalHours(p.times, i) * 3600_000) - Math.max(target, p.times[i])) / 3600_000;
			newSnow24h = estimateNewSnowStep(precipValues[i], phases[i], newSnow24h, dt).cumulativeCm;
		}

		const currentKey = phases[currentIndex]?.key ?? null;
		let nextChangeLabel = '';
		let nextChangeTime = null;

		for (let i = currentIndex + 1; coverage.known[currentIndex] && i < p.times.length && p.times[i] <= end24; i++) {
			const candidate = phases[i]?.key ?? null;
			if (!coverage.known[i] || i > 0 && p.times[i] - p.times[i - 1] > 3 * 3600_000) break;
			if (candidate === currentKey) continue;
			const check = [i, i + 1, i + 2].filter(j => j < p.times.length && p.times[j] <= end24);
			if (!check.length || !check.every(j => coverage.known[j] && (phases[j]?.key ?? null) === candidate)) continue;
			nextChangeLabel = `${phaseName(currentKey)} → ${phaseName(candidate)} · ${formatShortTime(p.times[i])}`;
			nextChangeTime = p.times[i];
			break;
		}

		return {
			points,
			terrainY: terrain !== null
			? Math.max(top, Math.min(bottom, y(terrain)))
			: null,
			currentX: x(currentTime),
			currentY: currentValue !== null ? y(currentValue) : null,
			nowX: now >= t0 && now <= t1 ? x(now) : null,
			crossingX: crossingTime !== null ? x(crossingTime) : null,
			min24X: minEntry ? x(p.times[minEntry.i]) : null,
			min24Y: minEntry ? y(Number(minEntry.value)) : null,
			minLabel: formatElevation(min, units),
			midLabel: formatElevation((min + max) / 2, units),
			maxLabel: formatElevation(max, units),
			startLabel: new Date(t0).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' }),
			currentSnowline: currentValue !== null
			? Math.round(currentValue / 10) * 10
			: null,
			currentTerrainDifference,
			currentPosition: terrainPosition(currentTerrainDifference),
			currentPrecip: precipValues[currentIndex] ?? null,
			currentPhase: phases[currentIndex],
			currentCondition: conditionLabel(precipValues[currentIndex], phases[currentIndex]),
			coverageComplete: coverage.complete,
			precipCount: coverage.precipCount,
			snowPrefix: coverage.prefix,
			coverageNote: coverage.note,
			midTimeLabel: '+' + Math.round((t1 - t0) / 7200000) + ' h',
			endTimeLabel: '+' + Math.round((t1 - t0) / 3600000) + ' h',
			currentNewSnow: cumulativeNewSnow[currentIndex] ?? 0,
			precipBars,
			hasPrecip: validPrecip.some(v => v >= PRECIP_THRESHOLD_MM_H),
			precipMaxLabel: precipMax
			? formatPrecip(precipMax, units).replace(/\s*(mm|in)\/3h$/, '')
			: '—',
			minScale: min,
			maxScale: max,
			validLabel: `Forecast ${formatTooltipTime(target)} · ${formatRun(p.runTime)}`,
			phaseBlocks: buildBlocks(p, phases, x),
			phaseSummary: phaseSummary(phases, precipValues, cumulativeNewSnow),
			newSnowPoints,
			newSnowArea,
			newSnowMax,
			newSnowMaxLabel: formatSnow(newSnowMax, units),
			cumulativeNewSnow,
			min24Snowline,
			window24Complete: coversWindow(p.times, coverage.known, target, end24),
			newSnow24h: Math.max(0, newSnow24h),
			nextChangeLabel,
			nextChangeTime
		};
	}

	function handlePointer(event) {
		if (!svgEl || !chart || !point?.times?.length) return;

		const rect = svgEl.getBoundingClientRect(),
			vx = (event.clientX - rect.left) / rect.width * 360;

		if (vx < 42 || vx > 348) {
			$$invalidate(12, tooltip = null);
			return;
		}

		const t0 = point.times[0],
			t1 = t0 + 144 * 3600_000,
			hoverTime = t0 + (vx - 42) / 306 * (t1 - t0);

		const idx = forecastIntervalIndex(point.times, hoverTime);

		if (idx < 0) {
			$$invalidate(12, tooltip = null);
			return;
		}

		const time = point.times[idx], x = 42 + (time - t0) / (t1 - t0) * 306;
		if (event.type === 'pointerdown') setTimeline(time);

		$$invalidate(12, tooltip = {
			x,
			cssX: Math.max(92, Math.min(rect.width - 92, x / 360 * rect.width)),
			cssY: 44,
			snowline: (() => {
				const v = snowlineAt(point, idx);
				return v === null ? null : Math.round(v / 10) * 10;
			})(),
			precip: precipMmAt(point.forecast, idx),
			phase: phaseAt(point, terrainM, idx),
			newSnow: idx < chart.snowPrefix
			? idx === 0 ? 0 : chart.cumulativeNewSnow[idx - 1] ?? 0
			: null,
			timeLabel: formatTooltipTime(time)
		});
	}

	async function downloadPng() {
		if (!svgEl || !chart || pngBusy) return;
		$$invalidate(8, pngBusy = true);

		try {
			const clone = svgEl.cloneNode(true);
			clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
			clone.setAttribute('width', '1080');
			clone.setAttribute('height', '1002');
			const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
			style.textContent = 'text{font-family:Arial,sans-serif}.plot-bg,.band-bg{fill:#101b22;stroke:#29404d}.terrain-zone{fill:#17313a}.grid{stroke:#29404d}.axis{fill:#9fb0ba;font-size:8px}.section-label{fill:#dce8ee;font-size:7px;font-weight:700}.section-label tspan{fill:#72838d}.snowline-line{fill:none;stroke:#67d7ff;stroke-width:2.7}.terrain-line{stroke:#ffae56;stroke-width:1.5;stroke-dasharray:5 4}.terrain-tag{fill:#ffbd75;font-size:6px}.min24-line{stroke:#9fe9ff;stroke-dasharray:2 3}.min24-dot{fill:#0d151b;stroke:#9fe9ff;stroke-width:2}.min24-tag{fill:#bdefff;font-size:6px}.precip-bar{fill:#3794b8}.precip-bar.wet{fill:#64d4f5}.phase-snow{fill:#f4f7fb}.phase-wet-snow{fill:#6bd47f}.phase-mix{fill:#f2d84f}.phase-rain{fill:#4f82ff}.phase-ice-pellets{fill:#a8753e}.phase-freezing-rain{fill:#a867e8}.phase-block{opacity:.94}.phase-legend-svg text{fill:#d4dfe6;font-size:9px}.new-snow-line{fill:none;stroke:#82e398;stroke-width:2}.new-snow-area{fill:#82e398;opacity:.18}.now-line{stroke:#ff6759}.now-tag-bg{fill:#ff6759}.now-tag{fill:#fff;font-size:7px}.cursor{stroke:#dce8ee;stroke-dasharray:2 3}.current-dot{fill:#fff;stroke:#67d7ff;stroke-width:2}.crossing-line{stroke:#ffe05b;stroke-dasharray:3 3}.crossing-dot{fill:#111;stroke:#ffe05b;stroke-width:2}.empty-band{fill:#8596a2;font-size:7px}';
			clone.insertBefore(style, clone.firstChild);

			const blob = new Blob([new XMLSerializer().serializeToString(clone)], { type: 'image/svg+xml' }),
				url = URL.createObjectURL(blob),
				img = new Image();

			await new Promise((resolve, reject) => {
					img.onload = () => resolve();
					img.onerror = () => reject();
					img.src = url;
				});

			const canvas = document.createElement('canvas');
			canvas.width = 1200;
			canvas.height = 1430;
			const ctx = canvas.getContext('2d');
			if (!ctx) throw new Error('No canvas');
			ctx.fillStyle = '#0d151b';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = '#ffffff';
			ctx.font = '700 44px Arial';
			ctx.fillText('Wintry forecast', 52, 62);
			ctx.fillStyle = '#cbd7de';
			ctx.font = '24px Arial';
			ctx.fillText(placeName || 'Selected point', 52, 100);
			ctx.fillStyle = '#72cef4';
			ctx.font = '20px Arial';
			ctx.fillText(chart.validLabel, 52, 132);
			ctx.drawImage(img, 45, 155, 1110, 1030);
			URL.revokeObjectURL(url);
			let y = 1217;
			ctx.fillStyle = '#ffffff';
			ctx.font = '700 29px Arial';

			ctx.fillText(
				chart.currentPhase
				? precipitationLabel(chart.currentPhase)
				: chart.currentCondition,
				52,
				y
			);

			y += 34;
			ctx.fillStyle = '#b8c8d1';
			ctx.font = '22px Arial';

			ctx.fillText(
				`Snowline ${chart.currentSnowline === null
				? 'WBZ unresolved'
				: formatElevation(chart.currentSnowline, units)}   ·   Precip ${formatPrecip(chart.currentPrecip, units)}`,
				52,
				y
			);

			y += 38;
			ctx.fillStyle = '#dfeaf0';
			ctx.font = '700 21px Arial';

			ctx.fillText(
				`Next 24 h · min estimated snowline ${formatElevation(chart.min24Snowline, units)} · new snow ${chart.window24Complete
				? formatSnow(chart.newSnow24h, units)
				: 'unavailable'}`,
				52,
				y
			);

			if (chart.nextChangeLabel) {
				y += 30;
				ctx.fillStyle = '#e5cf7c';
				ctx.font = '700 20px Arial';
				ctx.fillText(chart.nextChangeLabel, 52, y);
			}

			y += 30;
			ctx.fillStyle = '#8799a4';
			ctx.font = '18px Arial';
			ctx.fillText('Estimated new snow, not existing snowpack. ECMWF profile and Windy terrain.', 52, y);
			const png = await new Promise((resolve, reject) => canvas.toBlob(v => v ? resolve(v) : reject(new Error('PNG failed')), 'image/png'));
			const href = URL.createObjectURL(png), a = document.createElement('a');
			a.href = href;
			a.download = `wintry-forecast-${(placeName || 'point').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
			document.body.appendChild(a);
			a.click();
			a.remove();
			setTimeout(() => URL.revokeObjectURL(href), 30000);
		} catch(e) {
			console.warn('Wintry forecast PNG export failed', e);
		} finally {
			$$invalidate(8, pngBusy = false);
		}
	}

	onMount(() => {
		const width = Math.min(430, window.innerWidth - 16);

		$$invalidate(11, position = {
			x: Math.max(6, (window.innerWidth - width) / 2),
			y: window.innerWidth <= 520 ? 34 : 54
		});

		$$invalidate(23, realNow = Date.now());
		realNowTimer = setInterval(() => $$invalidate(23, realNow = Date.now()), 30000);

		try {
			const t = store.get('timestamp');
			if (typeof t === 'number') $$invalidate(6, timestamp = t);
			store.on('timestamp', onTimestamp);
		} catch {
			
		}
	});

	onDestroy(() => {
		if (realNowTimer) clearInterval(realNowTimer);
		window.removeEventListener('pointermove', dragMove);
		window.removeEventListener('pointerup', stopDrag);

		try {
			store.off('timestamp', onTimestamp);
		} catch {
			
		}
	});

	const click_handler = () => dispatch('close');
	const click_handler_1 = () => $$invalidate(0, tab = 'graph');
	const click_handler_2 = () => $$invalidate(0, tab = 'sounding');

	function svg_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			svgEl = $$value;
			$$invalidate(10, svgEl);
		});
	}

	const pointerleave_handler = () => $$invalidate(12, tooltip = null);
	const click_handler_3 = () => jumpToCrossing(Number(crossing.crossingTime));

	function div4_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			chartShell = $$value;
			$$invalidate(9, chartShell);
		});
	}

	$$self.$$set = $$props => {
		if ('embedded' in $$props) $$invalidate(1, embedded = $$props.embedded);
		if ('point' in $$props) $$invalidate(2, point = $$props.point);
		if ('terrainM' in $$props) $$invalidate(3, terrainM = $$props.terrainM);
		if ('placeName' in $$props) $$invalidate(4, placeName = $$props.placeName);
		if ('tab' in $$props) $$invalidate(0, tab = $$props.tab);
		if ('units' in $$props) $$invalidate(5, units = $$props.units);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*point, terrainM, timestamp*/ 76) {
			$$invalidate(7, crossing = terrainCrossingState(point, terrainM, timestamp));
		}

		if ($$self.$$.dirty[0] & /*point, terrainM, timestamp*/ 76) {
			$$invalidate(14, event = nextWintryEvent(point, terrainM, timestamp));
		}

		if ($$self.$$.dirty[0] & /*point, terrainM, timestamp, crossing, realNow, units*/ 8388844) {
			$$invalidate(13, chart = buildChart(point, terrainM, timestamp, crossing?.crossingTime ?? null, realNow, units));
		}

		if ($$self.$$.dirty[0] & /*timestamp, realNow*/ 8388672) {
			$$invalidate(15, showNow = Math.abs(timestamp - realNow) > 90 * 60_000);
		}
	};

	return [
		tab,
		embedded,
		point,
		terrainM,
		placeName,
		units,
		timestamp,
		crossing,
		pngBusy,
		chartShell,
		svgEl,
		position,
		tooltip,
		chart,
		event,
		showNow,
		dispatch,
		startDrag,
		jumpToCrossing,
		jumpToEvent,
		resetToNow,
		handlePointer,
		downloadPng,
		realNow,
		click_handler,
		click_handler_1,
		click_handler_2,
		svg_binding,
		pointerleave_handler,
		click_handler_3,
		div4_binding
	];
}

class SnowlineChart extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$2,
			create_fragment$2,
			safe_not_equal,
			{
				embedded: 1,
				point: 2,
				terrainM: 3,
				placeName: 4,
				tab: 0,
				units: 5
			},
			add_css$1,
			[-1, -1]
		);
	}
}

/** Clip each sampled terrain-minus-WBZ triangle to the strictly positive side,
 * then intersect it with parallel screen-space diagonals. Unknown cells stay blank.
 */ function terrainHatchSegments(grid, spacing = 12) {
    if (!(spacing > 0) || !Number.isFinite(spacing)) return [];
    const segments = [];
    function triangle(vertices) {
        if (vertices.some((p)=>p.difference === null || !Number.isFinite(p.difference) || !Number.isFinite(p.x) || !Number.isFinite(p.y))) return;
        const polygon = [];
        for(let i = 0; i < 3; i++){
            const a = vertices[i], b = vertices[(i + 1) % 3], da = a.difference, db = b.difference;
            if (da > 0) polygon.push(a);
            if (da > 0 !== db > 0) {
                const f = da / (da - db);
                polygon.push({
                    x: a.x + f * (b.x - a.x),
                    y: a.y + f * (b.y - a.y),
                    difference: 0
                });
            }
        }
        if (polygon.length < 3) return;
        const offsets = polygon.map((p)=>p.x + p.y), lo = Math.ceil(Math.min(...offsets) / spacing) * spacing, hi = Math.max(...offsets);
        for(let k = lo; k <= hi; k += spacing){
            const hits = [];
            for(let i = 0; i < polygon.length; i++){
                const a = polygon[i], b = polygon[(i + 1) % polygon.length], den = b.x + b.y - a.x - a.y;
                if (Math.abs(den) < 1e-9) continue;
                const f = (k - a.x - a.y) / den;
                if (f >= 0 && f <= 1) hits.push([
                    a.x + f * (b.x - a.x),
                    a.y + f * (b.y - a.y)
                ]);
            }
            hits.sort((a, b)=>a[0] - b[0]);
            if (hits.length >= 2) {
                const a = hits[0], b = hits[hits.length - 1];
                if (Math.hypot(a[0] - b[0], a[1] - b[1]) > .1) segments.push([
                    a,
                    b
                ]);
            }
        }
    }
    for(let r = 0; r < grid.length - 1; r++)for(let c = 0; c < grid[r].length - 1; c++){
        const a = grid[r][c], b = grid[r][c + 1], d = grid[r + 1]?.[c], e = grid[r + 1]?.[c + 1];
        if (!a || !b || !d || !e || [
            a,
            b,
            d,
            e
        ].some((p)=>p.difference === null)) continue;
        triangle([
            a,
            b,
            e
        ]);
        triangle([
            a,
            e,
            d
        ]);
    }
    // Join touching fragments on the same stripe. Keep genuine gaps (including
    // missing terrain) open, and avoid darker overlaps at triangle boundaries.
    const stripes = new Map();
    for (const segment of segments){
        const stripe = Math.round((segment[0][0] + segment[0][1]) / spacing);
        const parts = stripes.get(stripe) ?? [];
        parts.push(segment);
        stripes.set(stripe, parts);
    }
    const joined = [];
    for (const parts of stripes.values()){
        parts.sort((a, b)=>a[0][0] - b[0][0]);
        let current = null;
        for (const part of parts){
            if (current && part[0][0] <= current[1][0] + 1e-7) {
                if (part[1][0] > current[1][0]) current[1] = part[1];
            } else {
                current = [
                    part[0],
                    part[1]
                ];
                joined.push(current);
            }
        }
    }
    return joined;
}

/** Match interval-start timestamps to profile times. Canonical internal amounts
 * remain three-hour equivalents so existing snow integration retains its units. */ function alignPrecipIntervals(times, amounts, targets) {
    const values = [], periods = [];
    for (const time of targets){
        let index = -1;
        for(let i = 0; i < times.length; i++){
            if (times[i] <= time) index = i;
            else break;
        }
        const dt = index >= 0 ? (index + 1 < times.length ? times[index + 1] - times[index] : index > 0 ? times[index] - times[index - 1] : NaN) / 3600000 : NaN;
        const raw = index >= 0 ? amounts[index] : null;
        const mm = typeof raw === 'number' ? raw : typeof raw === 'string' && raw.trim() ? Number(raw) : NaN;
        if (!Number.isFinite(dt) || dt <= 0 || dt > 3 || time >= times[index] + dt * 3600000 || !Number.isFinite(mm)) {
            values.push(null);
            periods.push(null);
            continue;
        }
        values.push(Math.max(0, mm) * 3 / dt);
        periods.push(dt);
    }
    return {
        '__precipMm3h': values,
        '__precipPeriodsH': periods
    };
}

function isNumericArrayLike(value) {
    if (ArrayBuffer.isView(value)) return Number(value?.length) > 0;
    if (!Array.isArray(value) || !value.length) return false;
    return value.some((item)=>typeof item === 'number' || typeof item === 'string');
}
function normaliseKey(key) {
    return key.toLowerCase().replace(/[_\s]/g, '-');
}
function isPrecipKey(key) {
    const keyNormalised = normaliseKey(key);
    return (keyNormalised.includes('precip') || keyNormalised === 'rain' || keyNormalised.startsWith('rain-') || keyNormalised === 'tp') && !keyNormalised.includes('type') && !keyNormalised.includes('snow');
}
function collectFromRecordArray(items, out) {
    if (!items.length || !items.every((item)=>!!item && typeof item === 'object' && !Array.isArray(item))) return;
    const keys = new Set();
    for (const item of items){
        for (const key of Object.keys(item))if (isPrecipKey(key)) keys.add(key);
    }
    for (const key of keys){
        const values = items.map((item)=>{
            const raw = item[key];
            const number = typeof raw === 'number' ? raw : Number(raw);
            return Number.isFinite(number) ? number : null;
        });
        if (values.some((value)=>value !== null)) out[key] = values;
    }
}
function collectPrecipFields(value, out, depth = 0) {
    if (!value || typeof value !== 'object' || depth > 9) return;
    if (Array.isArray(value)) {
        collectFromRecordArray(value, out);
        for (const child of value)collectPrecipFields(child, out, depth + 1);
        return;
    }
    const object = value;
    if (Array.isArray(object.ts) && Array.isArray(object.precipAmount)) {
        out.__intervalTs = object.ts;
        out.__intervalPrecipMm = object.precipAmount;
    }
    for (const [key, field] of Object.entries(object)){
        if (isPrecipKey(key) && isNumericArrayLike(field)) out[key] = field;
    }
    for (const child of Object.values(object)){
        if (child && typeof child === 'object' && !isNumericArrayLike(child)) {
            collectPrecipFields(child, out, depth + 1);
        }
    }
}
/**
 * Load precipitation fields from Windy's ECMWF point feed.
 *
 * The meteogram response is authoritative for the vertical profile; this
 * supplemental request is only used to fill precipitation fields that are not
 * always exposed by the meteogram endpoint. No snow-depth request is made here:
 * the plugin's "new snow" product is calculated from forecast precipitation
 * and the terrain-aware precipitation-type diagnosis.
 */ async function loadSelectedPrecipFields(lat, lon, days = 6, model = 'ecmwf') {
    try {
        const response = await getPointForecastData(model, {
            lat,
            lon,
            step: 3,
            days,
            source: 'detail'
        });
        const out = {};
        collectPrecipFields(response, out);
        return out;
    } catch (error) {
        console.warn('Wintry forecast precipitation request failed', lat, lon, error);
        return {};
    }
}
function alignSelectedPrecipFields(fields, targetTimes) {
    if (Array.isArray(fields.__intervalTs) && Array.isArray(fields.__intervalPrecipMm)) {
        return alignPrecipIntervals(fields.__intervalTs, fields.__intervalPrecipMm, targetTimes);
    }
    // Unknown time axes must not be merged by array index.
    return {};
}

const MIN_SNOWLINE_CONTOUR_M = -500;
/** Prepare display values only; retain raw diagnostics for terrain comparisons. */ function prepareSnowlineContours(rawField, interval) {
    const field = rawField.map((row)=>row.map((point)=>({
                ...point,
                value: point.value !== null && Number.isFinite(point.value) ? Math.max(MIN_SNOWLINE_CONTOUR_M, point.value) : null
            })));
    const values = field.flat().map((point)=>point.value).filter((v)=>v !== null);
    const levels = [];
    if (!values.length) return {
        field,
        levels
    };
    const min = Math.max(MIN_SNOWLINE_CONTOUR_M, Math.floor(Math.min(...values) / interval) * interval);
    const max = Math.ceil(Math.max(...values) / interval) * interval;
    // At 200 m spacing, include the floor without shifting zero/major contours.
    if (min % interval !== 0) levels.push(min);
    for(let level = Math.ceil(min / interval) * interval; level <= max; level += interval){
        levels.push(level);
    }
    return {
        field,
        levels
    };
}

function median(values) {
    if (!values.length) return 0;
    const sorted = [
        ...values
    ].sort((a, b)=>a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : 0.5 * (sorted[mid - 1] + sorted[mid]);
}
function reconstructAxis(known, length) {
    if (!known.length) return Array.from({
        length
    }, (_, i)=>i);
    if (known.length === 1) return Array.from({
        length
    }, ()=>known[0].value);
    const ordered = [
        ...known
    ].sort((a, b)=>a.index - b.index);
    const slopes = [];
    for(let i = 1; i < ordered.length; i++){
        const di = ordered[i].index - ordered[i - 1].index;
        if (di > 0) slopes.push((ordered[i].value - ordered[i - 1].value) / di);
    }
    const step = median(slopes);
    const anchor = ordered[Math.floor(ordered.length / 2)];
    return Array.from({
        length
    }, (_, i)=>anchor.value + (i - anchor.index) * step);
}
/**
 * Contours are a visual interpolation of a regularly sampled viewport field.
 * A single failed profile request must not punch a four-cell hole in marching
 * squares. Reconstruct missing grid geometry and fill missing values from the
 * nearest available samples in grid space. The raw point data remain untouched.
 */ function continuousContourGrid(grid) {
    const rows = grid.length;
    const cols = grid[0]?.length ?? 0;
    if (!rows || !cols) return grid;
    const valid = [];
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < cols; c++){
            const p = grid[r][c];
            if (p && p.value !== null && Number.isFinite(p.value)) valid.push({
                ...p,
                r,
                c
            });
        }
    }
    if (!valid.length) return grid;
    const rowLatKnown = [];
    for(let r = 0; r < rows; r++){
        const latitudes = valid.filter((p)=>p.r === r).map((p)=>p.lat).filter(Number.isFinite);
        if (latitudes.length) rowLatKnown.push({
            index: r,
            value: latitudes.reduce((a, b)=>a + b, 0) / latitudes.length
        });
    }
    const colLonKnown = [];
    for(let c = 0; c < cols; c++){
        const longitudes = valid.filter((p)=>p.c === c).map((p)=>p.lon).filter(Number.isFinite);
        if (longitudes.length) colLonKnown.push({
            index: c,
            value: longitudes.reduce((a, b)=>a + b, 0) / longitudes.length
        });
    }
    const rowLat = reconstructAxis(rowLatKnown, rows);
    const colLon = reconstructAxis(colLonKnown, cols);
    return grid.map((row, r)=>row.map((p, c)=>{
            if (p.value !== null && Number.isFinite(p.value)) return p;
            const neighbours = valid.map((v)=>({
                    v,
                    d2: (v.r - r) ** 2 + (v.c - c) ** 2
                })).sort((a, b)=>a.d2 - b.d2).slice(0, 8);
            let weighted = 0;
            let weights = 0;
            for (const item of neighbours){
                const weight = 1 / Math.max(0.25, item.d2);
                weighted += item.v.value * weight;
                weights += weight;
            }
            return {
                lat: Number.isFinite(p.lat) && (p.lat !== 0 || rowLat[r] === 0) ? p.lat : rowLat[r],
                lon: Number.isFinite(p.lon) && (p.lon !== 0 || colLon[c] === 0) ? p.lon : colLon[c],
                value: weights > 0 ? weighted / weights : null
            };
        }));
}
function interp(p1, p2, v1, v2, level) {
    if (Math.abs(v2 - v1) < 1e-9) {
        return [
            (p1[0] + p2[0]) / 2,
            (p1[1] + p2[1]) / 2
        ];
    }
    const f = Math.max(0, Math.min(1, (level - v1) / (v2 - v1)));
    return [
        p1[0] + f * (p2[0] - p1[0]),
        p1[1] + f * (p2[1] - p1[1])
    ];
}
/**
 * Marching-squares line segments for one contour level.
 * Grid is rows x cols; rows increase northward and columns eastward.
 *
 * Saddle cases (5 and 10) use a centre-value decider rather than a fixed
 * connection. This reduces artificial contour flips and broken-looking lines.
 */ function contourSegments(grid, level, prepared = false) {
    const out = [];
    const source = prepared ? grid : continuousContourGrid(grid);
    for(let r = 0; r < source.length - 1; r++){
        for(let c = 0; c < source[r].length - 1; c++){
            const sw = source[r][c];
            const se = source[r][c + 1];
            const nw = source[r + 1][c];
            const ne = source[r + 1][c + 1];
            if (sw.value === null || se.value === null || ne.value === null || nw.value === null) continue;
            const v = [
                sw.value,
                se.value,
                ne.value,
                nw.value
            ];
            const p = [
                [
                    sw.lat,
                    sw.lon
                ],
                [
                    se.lat,
                    se.lon
                ],
                [
                    ne.lat,
                    ne.lon
                ],
                [
                    nw.lat,
                    nw.lon
                ]
            ];
            const edgePoint = (edge)=>{
                switch(edge){
                    case 0:
                        return interp(p[0], p[1], v[0], v[1], level);
                    case 1:
                        return interp(p[1], p[2], v[1], v[2], level);
                    case 2:
                        return interp(p[2], p[3], v[2], v[3], level);
                    default:
                        return interp(p[3], p[0], v[3], v[0], level);
                }
            };
            let code = 0;
            if (v[0] >= level) code |= 1;
            if (v[1] >= level) code |= 2;
            if (v[2] >= level) code |= 4;
            if (v[3] >= level) code |= 8;
            let pairs;
            if (code === 5 || code === 10) {
                const centre = (v[0] + v[1] + v[2] + v[3]) / 4;
                const centreHigh = centre >= level;
                if (code === 5) {
                    pairs = centreHigh ? [
                        [
                            3,
                            0
                        ],
                        [
                            1,
                            2
                        ]
                    ] : [
                        [
                            3,
                            2
                        ],
                        [
                            0,
                            1
                        ]
                    ];
                } else {
                    pairs = centreHigh ? [
                        [
                            0,
                            1
                        ],
                        [
                            2,
                            3
                        ]
                    ] : [
                        [
                            0,
                            3
                        ],
                        [
                            1,
                            2
                        ]
                    ];
                }
            } else {
                const table = {
                    0: [],
                    1: [
                        [
                            3,
                            0
                        ]
                    ],
                    2: [
                        [
                            0,
                            1
                        ]
                    ],
                    3: [
                        [
                            3,
                            1
                        ]
                    ],
                    4: [
                        [
                            1,
                            2
                        ]
                    ],
                    6: [
                        [
                            0,
                            2
                        ]
                    ],
                    7: [
                        [
                            3,
                            2
                        ]
                    ],
                    8: [
                        [
                            2,
                            3
                        ]
                    ],
                    9: [
                        [
                            0,
                            2
                        ]
                    ],
                    11: [
                        [
                            1,
                            2
                        ]
                    ],
                    12: [
                        [
                            1,
                            3
                        ]
                    ],
                    13: [
                        [
                            0,
                            1
                        ]
                    ],
                    14: [
                        [
                            3,
                            0
                        ]
                    ],
                    15: []
                };
                pairs = table[code] ?? [];
            }
            for (const pair of pairs){
                out.push([
                    edgePoint(pair[0]),
                    edgePoint(pair[1])
                ]);
            }
        }
    }
    return out;
}
function pointKey(p) {
    // Shared cell-edge intersections should be identical; rounding protects
    // against tiny floating-point differences without visibly moving a line.
    return `${p[0].toFixed(6)},${p[1].toFixed(6)}`;
}
/** Stitch touching marching-squares segments into continuous polylines. */ function stitchSegments(segments) {
    if (!segments.length) return [];
    const endpointMap = new Map();
    const used = new Array(segments.length).fill(false);
    const addEndpoint = (key, index)=>{
        const list = endpointMap.get(key);
        if (list) list.push(index);
        else endpointMap.set(key, [
            index
        ]);
    };
    segments.forEach((segment, i)=>{
        addEndpoint(pointKey(segment[0]), i);
        addEndpoint(pointKey(segment[1]), i);
    });
    const extend = (line, atStart)=>{
        while(true){
            const end = atStart ? line[0] : line[line.length - 1];
            const candidates = endpointMap.get(pointKey(end)) ?? [];
            const nextIndex = candidates.find((i)=>!used[i]);
            if (nextIndex === undefined) return;
            used[nextIndex] = true;
            const seg = segments[nextIndex];
            const aMatches = pointKey(seg[0]) === pointKey(end);
            const nextPoint = aMatches ? seg[1] : seg[0];
            if (atStart) line.unshift(nextPoint);
            else line.push(nextPoint);
            // Closed contour: stop once both ends meet.
            if (line.length > 3 && pointKey(line[0]) === pointKey(line[line.length - 1])) {
                return;
            }
        }
    };
    const lines = [];
    for(let i = 0; i < segments.length; i++){
        if (used[i]) continue;
        used[i] = true;
        const line = [
            segments[i][0],
            segments[i][1]
        ];
        extend(line, false);
        extend(line, true);
        lines.push(line);
    }
    return lines;
}
/** Reconstruct missing samples once per frame, rather than once per elevation. */ function contourLinesForLevels(grid, levels) {
    const source = continuousContourGrid(grid);
    return new Map(levels.map((level)=>[
            level,
            stitchSegments(contourSegments(source, level, true))
        ]));
}

const PROFILE_CACHE_TTL_MS = 15 * 60_000;
function isOlderRun(run, activeRun) {
    return run !== null && activeRun !== null && run < activeRun - 60_000;
}
function profileIsFresh(fetchedAt, run, activeRun, now = Date.now()) {
    return Number.isFinite(fetchedAt) && now >= fetchedAt && now - fetchedAt < PROFILE_CACHE_TTL_MS && (activeRun === null || run !== null && Math.abs(run - activeRun) < 60_000);
}

const AUTO_REFRESH_MS = 15 * 60_000;
const RETRY_REFRESH_MS = 2 * 60_000;
function automaticRefreshDue(state, now = Date.now()) {
    if (state.busy || state.hidden || !state.online) return false;
    const elapsed = now - state.lastAttempt;
    return elapsed < 0 || elapsed >= (state.failed ? RETRY_REFRESH_MS : AUTO_REFRESH_MS);
}

const config = {
    name: 'windy-plugin-weatherscope'};

// Submitted place searches and user-requested reverse lookups share one queue.
// Public Nominatim does not support autocomplete. Cache and pace this client;
// a multi-user deployment must also enforce the provider's application-wide limit.
Promise.resolve();

/* src\winter\Winter.svelte generated by Svelte v4.2.20 */

function add_css(target) {
	append_styles(target, "svelte-msbih7", ".forecast-quality{margin-top:5px;color:#edc881;font-size:10px;line-height:1.3}@keyframes svelte-msbih7-snowline-pulse{0%,100%{opacity:0.45;transform:scale(0.85)}50%{opacity:1;transform:scale(1)}}.snowline-label{text-align:center;pointer-events:none}.snowline-label,.snowline-click-label{background:transparent!important;border:0 !important}.snowline-label span{display:inline-block;padding:1px 4px 1px 6px;border-radius:3px;border-left:4px solid var(--snowline-color, white);background:rgba(15, 17, 20, 0.86);color:white;font-size:10px;font-weight:800;white-space:nowrap;text-shadow:0 1px 2px rgba(0, 0, 0, 0.8);box-shadow:0 0 0 1px rgba(255, 255, 255, 0.12)}.snowline-label-major span{padding-left:7px;border-left-width:5px;background:rgba(10, 13, 16, 0.92);font-weight:900;box-shadow:0 0 0 1px rgba(255, 255, 255, 0.18), 0 2px 5px rgba(0, 0, 0, 0.28)}.snowline-click-label{pointer-events:auto !important}.snowline-click-label>span{position:relative;display:flex;flex-direction:column;gap:6px;width:228px;min-height:146px;box-sizing:border-box;padding:40px 9px 9px;border-radius:14px;border:1px solid rgba(255, 255, 255, 0.11);border-top:2px solid var(--probe-accent, rgba(255, 255, 255, 0.4));border-bottom:3px solid var(--snowline-color, white);background:linear-gradient(180deg, rgba(11, 17, 21, 0.985), rgba(7, 12, 16, 0.99));color:#fff;text-align:center;white-space:normal;text-shadow:none;box-shadow:0 10px 30px rgba(0, 0, 0, 0.54)}.snowline-card-kicker{position:absolute;top:12px;left:74px;right:74px;color:#7f929e;font-size:6px;line-height:1;font-weight:900;letter-spacing:1.15px;text-align:center;white-space:nowrap;pointer-events:none}.snowline-label-close,.snowline-label-share,.snowline-label-chart,.snowline-label-favourite{position:absolute;top:7px;height:27px;padding:0;border:1px solid rgba(255, 255, 255, 0.085);border-radius:8px;background:rgba(255, 255, 255, 0.045);color:#dfe9ee;font-size:12px;line-height:25px;font-weight:800;text-shadow:none;cursor:pointer;pointer-events:auto;transition:background 0.12s ease, border-color 0.12s ease}.snowline-label-close:hover,.snowline-label-share:hover,.snowline-label-chart:hover,.snowline-label-favourite:hover{background:rgba(255, 255, 255, 0.09);border-color:rgba(255, 255, 255, 0.16)}.snowline-label-close{right:7px;width:27px;font-size:17px}.snowline-label-share{right:40px;width:27px;font-size:0;background-repeat:no-repeat;background-position:center;background-size:14px;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='18' cy='5' r='3'/%3E%3Ccircle cx='6' cy='12' r='3'/%3E%3Ccircle cx='18' cy='19' r='3'/%3E%3Cpath d='M8.6 10.5l6.8-4M8.6 13.5l6.8 4'/%3E%3C/svg%3E\")}.snowline-label-chart{left:7px;width:29px;font-size:15px}.snowline-label-favourite{left:42px;width:29px;font-size:16px;color:#aab6bd}.snowline-label-favourite.saved{color:#ffe45c;border-color:rgba(255, 228, 92, 0.42);background:rgba(255, 228, 92, 0.08)}.snowline-click-label b{display:block;padding:4px 7px 2px;border-radius:8px;background:transparent;color:var(--probe-accent, white);font-size:15px;line-height:1.05;font-weight:900;letter-spacing:0.25px}.snowline-card-dry>span>b{padding:3px 7px 1px;background:transparent;font-size:12px;letter-spacing:0.8px;opacity:0.95}.snowline-label-detail{width:100%}.snowline-position{padding:6px 8px;border-radius:8px;background:rgba(255, 255, 255, 0.055);color:var(--probe-accent, white);line-height:1.05}.snowline-position strong{display:block;font-size:11px;font-weight:900}.snowline-position small{display:block;margin-top:3px;color:rgba(255, 255, 255, 0.68);font-size:7.5px;font-weight:750}.snowline-label-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px;width:100%}.snowline-label-grid span,.snowline-outlook-grid span{min-width:0;padding:6px 4px 5px;border-radius:8px;background:rgba(255, 255, 255, 0.028);border:1px solid rgba(255, 255, 255, 0.045);text-align:center}.snowline-label-grid small,.snowline-outlook-grid small{display:block;color:#7f919b;font-size:6.2px;line-height:1;text-transform:uppercase;letter-spacing:0.42px;font-weight:800}.snowline-label-grid strong,.snowline-outlook-grid strong{display:block;margin-top:4px;color:#eef5f8;font-size:10.5px;line-height:1;font-weight:900}.metric-terrain strong{color:#ffd39a}.metric-snowline strong{color:#dff6ff}.metric-precip strong{color:#9fe5ff}.snowline-label-grid.has-precip .metric-precip{grid-column:-1}.snowline-outlook{padding:5px;border:1px solid rgba(110, 203, 255, 0.08);border-radius:8px;background:rgba(60, 150, 205, 0.035)}.snowline-outlook-title{margin-bottom:4px;color:#79badc;font-size:6.5px;font-weight:900;letter-spacing:0.75px}.snowline-outlook-grid{display:grid;grid-template-columns:1fr 1fr;gap:4px}.snowline-outlook-grid span{padding:4px 3px;background:rgba(255, 255, 255, 0.028)}.snowline-outlook-grid strong{font-size:8.8px}.snowline-no-snow strong{color:#8f9da5;font-weight:700}.snowline-transition{margin-top:4px;padding:4px 5px;border-radius:6px;background:rgba(255, 255, 255, 0.035);color:#dce9ef;font-size:8px;line-height:1.12;font-weight:800}.snowline-valid{margin:-1px 0 1px;color:#8799a4;font-size:7.2px;line-height:1;font-weight:800;text-align:center}.snowline-compact-relation{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;box-sizing:border-box;padding:5px 7px;border-radius:8px;background:rgba(255, 255, 255, 0.025);color:var(--probe-accent, white);font-size:8.2px;line-height:1.1;font-weight:850;text-align:left}.snowline-compact-relation strong{display:inline!important;padding:0!important;background:none!important;color:inherit!important;font-size:8px!important;letter-spacing:0 !important}.snowline-compact-relation small{display:none}.snowline-compact-relation span{color:#aebbc2;font-weight:750;white-space:nowrap}.snowline-event-line{width:100%;box-sizing:border-box;padding:6px 7px;border:0;border-radius:8px;background:rgba(110, 203, 255, 0.045);color:#d8e5eb;text-align:left;font-family:inherit;font-size:7.8px;line-height:1.2;font-weight:800}button.snowline-event-line{display:flex;align-items:center;justify-content:space-between;gap:6px;cursor:pointer;pointer-events:auto}button.snowline-event-line:hover{background:rgba(110, 203, 255, 0.11)}button.snowline-event-line span{flex:0 0 auto;color:#8edcff;font-size:14px;line-height:8px}.snowline-loading{padding:20px 0 14px;color:#9fb0ba;font-size:10px}.snowline-probe-above>span{background:linear-gradient(180deg, rgba(8, 25, 34, 0.99), rgba(8, 14, 18, 0.99))}.snowline-probe-below>span{background:linear-gradient(180deg, rgba(32, 21, 12, 0.99), rgba(18, 13, 10, 0.99))}.snowline-probe-near>span{background:linear-gradient(180deg, rgba(29, 27, 11, 0.99), rgba(17, 16, 9, 0.99))}.snowline-card-hazard>span{border-top-color:#c184ff !important;box-shadow:0 0 0 1px rgba(193, 132, 255, 0.35), 0 12px 32px rgba(77, 27, 107, 0.58)}.snowline-card-hazard>span>b{color:#e7c8ff !important;background:rgba(174, 91, 230, 0.12) !important}@media(max-width: 520px){.snowline-click-label>span{width:220px;min-height:142px;padding:40px 8px 8px}.snowline-card-kicker{left:72px;right:72px}.snowline-click-label b{font-size:13px}.snowline-card-dry>span>b{font-size:10.5px}.snowline-position strong{font-size:10.5px}.snowline-label-grid strong,.snowline-outlook-grid strong{font-size:8.5px}}.snowline-label-chart{left:7px;width:69px;font-size:10px}.snowline-label-favourite{left:81px;width:46px;font-size:10px}.snowline-label-share{right:40px;width:45px;background-image:none;font-size:10px}.snowline-card-kicker{display:none}.snowline-valid{font-size:10px;line-height:1.25}.snowline-label-grid small{font-size:9px;line-height:1.2}.snowline-label-grid strong{font-size:13px;line-height:1.2}.snowline-event-line{font-size:11px;line-height:1.4;padding:8px}.snowline-compact-relation,.snowline-compact-relation strong{font-size:10px!important;line-height:1.3}.winter-workspace.svelte-msbih7.svelte-msbih7{color:#edf4f8;font:13px/1.5 system-ui}.winter-heading.svelte-msbih7.svelte-msbih7{display:flex;align-items:center;justify-content:space-between}.winter-heading.svelte-msbih7 h2.svelte-msbih7{font-size:22px;color:#edf4f8;margin:0}.winter-heading.svelte-msbih7 p.svelte-msbih7,.source-note.svelte-msbih7.svelte-msbih7{color:#aec1ca;font-size:11px}.snowflake.svelte-msbih7.svelte-msbih7{font-size:35px;color:#8ed9fa}.winter-tools.svelte-msbih7.svelte-msbih7{display:flex;gap:8px;margin:14px 0;flex-wrap:wrap}.winter-tools.svelte-msbih7 button.svelte-msbih7,.winter-time.svelte-msbih7 button.svelte-msbih7,.copy-winter.svelte-msbih7.svelte-msbih7{padding:9px 12px;border:1px solid #34515d;border-radius:9px;background:#17323e;color:#e2f0f1;cursor:pointer;min-height:40px}.winter-tools.svelte-msbih7 .enabled.svelte-msbih7{border-color:#78e4ca;color:#78e4ca}.winter-point.svelte-msbih7.svelte-msbih7{padding:18px;border:1px solid #35505c;border-top:3px solid var(--winter-accent);border-radius:14px;background:linear-gradient(130deg, #13343d, #182537);margin:15px 0}.winter-point.svelte-msbih7>small.svelte-msbih7{font-size:10px;color:#adc4cf}.winter-point.svelte-msbih7 h3.svelte-msbih7{color:var(--winter-accent);font-size:24px;margin:10px 0}.winter-time.svelte-msbih7.svelte-msbih7{display:flex;align-items:center;gap:12px;margin:16px 0}.winter-time.svelte-msbih7 label.svelte-msbih7{flex:1;font-size:12px;color:#aec1ca}.winter-time.svelte-msbih7 input.svelte-msbih7{display:block;width:100%;accent-color:#78e4ca;min-height:32px}.copy-winter.svelte-msbih7.svelte-msbih7{margin-top:14px}.map-legend.svelte-msbih7.svelte-msbih7{font-size:11px;color:#d0afef}details.svelte-msbih7.svelte-msbih7{margin:16px 0;color:#aec1ca;font-size:12px}summary.svelte-msbih7.svelte-msbih7{cursor:pointer}.winter-detail.svelte-msbih7 .snowline-label-grid{gap:8px}.winter-detail.svelte-msbih7 .snowline-label-grid span{padding:10px}.winter-detail.svelte-msbih7 .snowline-label-grid strong{font-size:17px}.winter-detail.svelte-msbih7 .snowline-label-grid small{font-size:10px}.winter-detail.svelte-msbih7 .snowline-event-line{font-size:12px}.winter-detail.svelte-msbih7 .snowline-valid{font-size:12px;margin-bottom:10px}.winter-workspace.svelte-msbih7.svelte-msbih7{color:var(--ink, #edf7fa)}.winter-heading.svelte-msbih7 h2.svelte-msbih7{font-weight:500}.winter-heading.svelte-msbih7 p.svelte-msbih7,.source-note.svelte-msbih7.svelte-msbih7{font-size:12px;color:var(--muted, #b2c7d1)}.winter-point.svelte-msbih7.svelte-msbih7{background:var(--aurora-hero, linear-gradient(125deg, #193e43, #183044));border-radius:16px;border-color:var(--line, #36505e);border-top-color:var(--winter-accent)}.winter-point.svelte-msbih7>small.svelte-msbih7{font-size:11px}.winter-point.svelte-msbih7 h3.svelte-msbih7{font-weight:500}.winter-tools.svelte-msbih7 button.svelte-msbih7,.winter-time.svelte-msbih7 button.svelte-msbih7,.copy-winter.svelte-msbih7.svelte-msbih7{background:var(--panel, #152b37);border-color:var(--line, #36505e);min-height:44px;border-radius:10px}.winter-tools.svelte-msbih7 .enabled.svelte-msbih7{color:var(--mint, #7be4ca);border-color:var(--mint, #7be4ca)}.winter-time.svelte-msbih7 input.svelte-msbih7{accent-color:var(--mint, #7be4ca)}.winter-detail.svelte-msbih7 .snowline-label-grid small{font-size:11px}.winter-detail.svelte-msbih7 .snowline-label-grid strong{font-weight:500}.winter-detail.svelte-msbih7 .snowline-label-grid span{background:#152b37;border-radius:12px;padding:12px}");
}

// (5:1) {#if contoursEnabled}
function create_if_block_4(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "╱ Terrain above estimated snowline · contours −500 to 6000 m";
			attr(p, "class", "map-legend svelte-msbih7");
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		d(detaching) {
			if (detaching) {
				detach(p);
			}
		}
	};
}

// (6:1) {#if viewportLoading}
function create_if_block_3(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "Updating snowline contours…";
			attr(p, "role", "status");
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		d(detaching) {
			if (detaching) {
				detach(p);
			}
		}
	};
}

// (7:1) {#if refreshError}
function create_if_block_2(ctx) {
	let p;
	let t;

	return {
		c() {
			p = element("p");
			t = text(/*refreshError*/ ctx[15]);
			attr(p, "role", "status");
		},
		m(target, anchor) {
			insert(target, p, anchor);
			append(p, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*refreshError*/ 32768) set_data(t, /*refreshError*/ ctx[15]);
		},
		d(detaching) {
			if (detaching) {
				detach(p);
			}
		}
	};
}

// (9:1) {#if clickedPoint}
function create_if_block(ctx) {
	let div;
	let label;
	let t0;
	let input;
	let input_max_value;
	let button0;
	let t2;
	let snowlinechart;
	let updating_tab;
	let t3;
	let t4;
	let button1;
	let current;
	let mounted;
	let dispose;

	function snowlinechart_tab_binding(value) {
		/*snowlinechart_tab_binding*/ ctx[31](value);
	}

	let snowlinechart_props = {
		embedded: true,
		point: /*clickedPoint*/ ctx[11],
		terrainM: /*clickedMapElevationM*/ ctx[12],
		placeName: /*clickedPlaceName*/ ctx[13] || /*placeName*/ ctx[1] || 'Selected point',
		units: /*unitSystem*/ ctx[4]
	};

	if (/*forecastTab*/ ctx[3] !== void 0) {
		snowlinechart_props.tab = /*forecastTab*/ ctx[3];
	}

	snowlinechart = new SnowlineChart({ props: snowlinechart_props });
	binding_callbacks.push(() => bind(snowlinechart, 'tab', snowlinechart_tab_binding));
	let if_block = /*clickedNextEventTime*/ ctx[14] !== null && create_if_block_1(ctx);

	return {
		c() {
			div = element("div");
			label = element("label");
			t0 = text("Explore winter forecast");
			input = element("input");
			button0 = element("button");
			button0.textContent = "Now";
			t2 = space();
			create_component(snowlinechart.$$.fragment);
			t3 = space();
			if (if_block) if_block.c();
			t4 = space();
			button1 = element("button");
			button1.textContent = "Copy winter summary";
			attr(input, "aria-label", "Winter forecast time");
			attr(input, "type", "range");
			attr(input, "min", "0");
			attr(input, "max", input_max_value = /*clickedPoint*/ ctx[11].times.length - 1);
			input.value = /*selectedSlot*/ ctx[8];
			attr(input, "class", "svelte-msbih7");
			attr(label, "class", "svelte-msbih7");
			attr(button0, "class", "svelte-msbih7");
			attr(div, "class", "winter-time svelte-msbih7");
			attr(button1, "class", "copy-winter svelte-msbih7");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, label);
			append(label, t0);
			append(label, input);
			append(div, button0);
			insert(target, t2, anchor);
			mount_component(snowlinechart, target, anchor);
			insert(target, t3, anchor);
			if (if_block) if_block.m(target, anchor);
			insert(target, t4, anchor);
			insert(target, button1, anchor);
			current = true;

			if (!mounted) {
				dispose = [
					listen(input, "input", /*input_handler*/ ctx[29]),
					listen(button0, "click", /*click_handler*/ ctx[30]),
					listen(button1, "click", /*click_handler_2*/ ctx[33])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (!current || dirty[0] & /*clickedPoint*/ 2048 && input_max_value !== (input_max_value = /*clickedPoint*/ ctx[11].times.length - 1)) {
				attr(input, "max", input_max_value);
			}

			if (!current || dirty[0] & /*selectedSlot*/ 256) {
				input.value = /*selectedSlot*/ ctx[8];
			}

			const snowlinechart_changes = {};
			if (dirty[0] & /*clickedPoint*/ 2048) snowlinechart_changes.point = /*clickedPoint*/ ctx[11];
			if (dirty[0] & /*clickedMapElevationM*/ 4096) snowlinechart_changes.terrainM = /*clickedMapElevationM*/ ctx[12];
			if (dirty[0] & /*clickedPlaceName, placeName*/ 8194) snowlinechart_changes.placeName = /*clickedPlaceName*/ ctx[13] || /*placeName*/ ctx[1] || 'Selected point';
			if (dirty[0] & /*unitSystem*/ 16) snowlinechart_changes.units = /*unitSystem*/ ctx[4];

			if (!updating_tab && dirty[0] & /*forecastTab*/ 8) {
				updating_tab = true;
				snowlinechart_changes.tab = /*forecastTab*/ ctx[3];
				add_flush_callback(() => updating_tab = false);
			}

			snowlinechart.$set(snowlinechart_changes);

			if (/*clickedNextEventTime*/ ctx[14] !== null) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					if_block.m(t4.parentNode, t4);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i(local) {
			if (current) return;
			transition_in(snowlinechart.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(snowlinechart.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) {
				detach(div);
				detach(t2);
				detach(t3);
				detach(t4);
				detach(button1);
			}

			destroy_component(snowlinechart, detaching);
			if (if_block) if_block.d(detaching);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (11:1) {#if clickedNextEventTime!==null}
function create_if_block_1(ctx) {
	let button;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
			button.textContent = "Go to next wintry interval →";
			attr(button, "class", "copy-winter svelte-msbih7");
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (!mounted) {
				dispose = listen(button, "click", /*click_handler_1*/ ctx[32]);
				mounted = true;
			}
		},
		p: noop,
		d(detaching) {
			if (detaching) {
				detach(button);
			}

			mounted = false;
			dispose();
		}
	};
}

function create_fragment$1(ctx) {
	let section;
	let div1;
	let t3;
	let p1;
	let t5;
	let div2;
	let button0;
	let t6_value = (/*contoursEnabled*/ ctx[2] ? 'Hide' : 'Show') + "";
	let t6;
	let t7;
	let button1;
	let t8;
	let button1_disabled_value;
	let t9;
	let t10;
	let t11;
	let t12;
	let div4;
	let small;
	let h3;
	let t14;
	let div3;
	let div4_style_value;
	let t15;
	let t16;
	let details;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*contoursEnabled*/ ctx[2] && create_if_block_4();
	let if_block1 = /*viewportLoading*/ ctx[9] && create_if_block_3();
	let if_block2 = /*refreshError*/ ctx[15] && create_if_block_2(ctx);
	let if_block3 = /*clickedPoint*/ ctx[11] && create_if_block(ctx);

	return {
		c() {
			section = element("section");
			div1 = element("div");
			div1.innerHTML = `<div><h2 class="svelte-msbih7">Wintry Forecast</h2><p class="svelte-msbih7">ECMWF profiles · Windy terrain · up to 144 hours</p></div><span class="snowflake svelte-msbih7" aria-hidden="true">❄</span>`;
			t3 = space();
			p1 = element("p");
			p1.textContent = "Winter diagnostics use ECMWF, independently of the general forecast baseline. All views follow the same selected point and Windy time. Winter times use this device's timezone.";
			t5 = space();
			div2 = element("div");
			button0 = element("button");
			t6 = text(t6_value);
			t7 = text(" snowline contours");
			button1 = element("button");
			t8 = text("Refresh winter data");
			t9 = space();
			if (if_block0) if_block0.c();
			t10 = space();
			if (if_block1) if_block1.c();
			t11 = space();
			if (if_block2) if_block2.c();
			t12 = space();
			div4 = element("div");
			small = element("small");
			small.textContent = "AT THE SELECTED TIME · ECMWF";
			h3 = element("h3");
			t14 = text(/*pointTitle*/ ctx[5]);
			div3 = element("div");
			t15 = space();
			if (if_block3) if_block3.c();
			t16 = space();
			details = element("details");
			details.innerHTML = `<summary class="svelte-msbih7">How to interpret winter guidance</summary><p>The snowline is a wet-bulb-zero proxy, not proof of snowfall. Precipitation type is profile-derived. New snow is a forecast estimate, not observed snow depth. Low confidence and unavailable inputs remain visible. Contours sample the visible map and may miss small terrain features.</p>`;
			attr(div1, "class", "winter-heading svelte-msbih7");
			attr(p1, "class", "source-note svelte-msbih7");
			attr(button0, "aria-pressed", /*contoursEnabled*/ ctx[2]);
			attr(button0, "class", "svelte-msbih7");
			toggle_class(button0, "enabled", /*contoursEnabled*/ ctx[2]);
			button1.disabled = button1_disabled_value = /*probeLoading*/ ctx[10] || !/*location*/ ctx[0];
			attr(button1, "class", "svelte-msbih7");
			attr(div2, "class", "winter-tools svelte-msbih7");
			attr(small, "class", "svelte-msbih7");
			attr(h3, "class", "svelte-msbih7");
			attr(div3, "class", "winter-detail svelte-msbih7");
			attr(div4, "class", "winter-point svelte-msbih7");
			attr(div4, "style", div4_style_value = `--winter-accent:${/*pointAccent*/ ctx[7]}`);
			attr(details, "class", "svelte-msbih7");
			attr(section, "class", "winter-workspace svelte-msbih7");
			attr(section, "aria-label", "Wintry Forecast integrated workspace");
		},
		m(target, anchor) {
			insert(target, section, anchor);
			append(section, div1);
			append(section, t3);
			append(section, p1);
			append(section, t5);
			append(section, div2);
			append(div2, button0);
			append(button0, t6);
			append(button0, t7);
			append(div2, button1);
			append(button1, t8);
			append(section, t9);
			if (if_block0) if_block0.m(section, null);
			append(section, t10);
			if (if_block1) if_block1.m(section, null);
			append(section, t11);
			if (if_block2) if_block2.m(section, null);
			append(section, t12);
			append(section, div4);
			append(div4, small);
			append(div4, h3);
			append(h3, t14);
			append(div4, div3);
			div3.innerHTML = /*pointDetail*/ ctx[6];
			append(section, t15);
			if (if_block3) if_block3.m(section, null);
			append(section, t16);
			append(section, details);
			current = true;

			if (!mounted) {
				dispose = [
					listen(button0, "click", /*toggleContours*/ ctx[16]),
					listen(button1, "click", /*refreshForecast*/ ctx[18])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if ((!current || dirty[0] & /*contoursEnabled*/ 4) && t6_value !== (t6_value = (/*contoursEnabled*/ ctx[2] ? 'Hide' : 'Show') + "")) set_data(t6, t6_value);

			if (!current || dirty[0] & /*contoursEnabled*/ 4) {
				attr(button0, "aria-pressed", /*contoursEnabled*/ ctx[2]);
			}

			if (!current || dirty[0] & /*contoursEnabled*/ 4) {
				toggle_class(button0, "enabled", /*contoursEnabled*/ ctx[2]);
			}

			if (!current || dirty[0] & /*probeLoading, location*/ 1025 && button1_disabled_value !== (button1_disabled_value = /*probeLoading*/ ctx[10] || !/*location*/ ctx[0])) {
				button1.disabled = button1_disabled_value;
			}

			if (/*contoursEnabled*/ ctx[2]) {
				if (if_block0) ; else {
					if_block0 = create_if_block_4();
					if_block0.c();
					if_block0.m(section, t10);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*viewportLoading*/ ctx[9]) {
				if (if_block1) ; else {
					if_block1 = create_if_block_3();
					if_block1.c();
					if_block1.m(section, t11);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*refreshError*/ ctx[15]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_2(ctx);
					if_block2.c();
					if_block2.m(section, t12);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (!current || dirty[0] & /*pointTitle*/ 32) set_data(t14, /*pointTitle*/ ctx[5]);
			if (!current || dirty[0] & /*pointDetail*/ 64) div3.innerHTML = /*pointDetail*/ ctx[6];
			if (!current || dirty[0] & /*pointAccent*/ 128 && div4_style_value !== (div4_style_value = `--winter-accent:${/*pointAccent*/ ctx[7]}`)) {
				attr(div4, "style", div4_style_value);
			}

			if (/*clickedPoint*/ ctx[11]) {
				if (if_block3) {
					if_block3.p(ctx, dirty);

					if (dirty[0] & /*clickedPoint*/ 2048) {
						transition_in(if_block3, 1);
					}
				} else {
					if_block3 = create_if_block(ctx);
					if_block3.c();
					transition_in(if_block3, 1);
					if_block3.m(section, t16);
				}
			} else if (if_block3) {
				group_outros();

				transition_out(if_block3, 1, 1, () => {
					if_block3 = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block3);
			current = true;
		},
		o(local) {
			transition_out(if_block3);
			current = false;
		},
		d(detaching) {
			if (detaching) {
				detach(section);
			}

			if (if_block0) if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
			mounted = false;
			run_all(dispose);
		}
	};
}

const MODEL = 'ecmwf';

const MAX_CONCURRENT = 12,
	CONTOUR_STEP_H = 1,
	FORECAST_DAYS = 6,
	MAX_FORECAST_HOURS = 144,
	PROFILE_CACHE_MAX = 1600,
	MIN_VALID_FRACTION = 0.32,
	POSITION_NEAR_SNOWLINE_METRES = 100,
	TENDENCY_HOURS = 1,
	MAX_VIEWPORT_LATITUDE = 85;

function hexToRgb(hex) {
	const v = hex.replace('#', '');

	return [
		parseInt(v.slice(0, 2), 16),
		parseInt(v.slice(2, 4), 16),
		parseInt(v.slice(4, 6), 16)
	];
}

function rgbToHex(r, g, b) {
	const p = v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
	return `#${p(r)}${p(g)}${p(b)}`;
}

function parseTime(v) {
	if (typeof v === 'number' && Number.isFinite(v)) return v > 1e12 ? v : v > 1e9 ? v * 1000 : null;

	if (typeof v === 'string') {
		const p = Date.parse(v);
		if (Number.isFinite(p)) return p;
	}

	return null;
}

function scalarNumber(v) {
	if (typeof v === 'number' && Number.isFinite(v)) return v;

	if (typeof v === 'string' && v.trim() !== '') {
		const p = Number(v);
		if (Number.isFinite(p)) return p;
	}

	return null;
}

function nearestIndex(times, target) {
	let best = 0, d = Infinity;

	times.forEach((t, i) => {
		const x = Math.abs(t - target);

		if (x < d) {
			d = x;
			best = i;
		}
	});

	return best;
}

function extractPayload(payload) {
	const r = payload;

	return {
		forecast: r?.data?.data && typeof r.data.data === 'object'
		? r.data.data
		: {},
		header: r?.data?.header && typeof r.data.header === 'object'
		? r.data.header
		: {}
	};
}

function profileKey(lat, lon, step) {
	return `${step}:${lat.toFixed(4)},${lon.toFixed(4)}`;
}

async function mapLimit(items, limit, fn) {
	const out = new Array(items.length);
	let next = 0;

	async function worker() {
		while (true) {
			const i = next++;
			if (i >= items.length) return;
			out[i] = await fn(items[i]);
		}
	}

	await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
	return out;
}

function statusColor(s) {
	return s === 'above'
	? '#46d9ff'
	: s === 'below'
		? '#ff9d3d'
		: s === 'near' ? '#ffe45c' : '#fff';
}

function statusForDifference(d) {
	return d > POSITION_NEAR_SNOWLINE_METRES
	? 'above'
	: d < -POSITION_NEAR_SNOWLINE_METRES ? 'below' : 'near';
}

function shortValid(t) {
	return new Date(t).toLocaleString(undefined, {
		weekday: 'short',
		hour: '2-digit',
		minute: '2-digit'
	});
}

function formatCoordinate(lat, lon) {
	return `${Math.abs(lat).toFixed(4)}°${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lon).toFixed(4)}°${lon >= 0 ? 'E' : 'W'}`;
}

function formatLocal(t) {
	return new Date(t).toLocaleString(undefined, {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZoneName: 'short'
	});
}

async function copyText(text) {
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(text);
		return;
	}

	const t = document.createElement('textarea');
	t.value = text;
	t.style.position = 'fixed';
	t.style.opacity = '0';
	document.body.appendChild(t);
	t.focus();
	t.select();
	const copied = document.execCommand('copy');
	t.remove();
	if (!copied) throw new Error('Copy failed');
}

function metricTile(label, value, className = '') {
	return `<span class="${className}"><small>${label}</small><strong>${value}</strong></span>`;
}

function instance$1($$self, $$props, $$invalidate) {
	let { location = null } = $$props;
	let { placeName = '' } = $$props;
	let { units = 'metric' } = $$props;

	let mounted = false,
		contoursEnabled = false,
		pointTitle = 'Select a location',
		pointDetail = '',
		pointAccent = '#78e4ca',
		selectedInput = '',
		selectedSlot = 0;

	function toggleContours() {
		$$invalidate(2, contoursEnabled = !contoursEnabled);

		if (contoursEnabled) void refreshViewport(); else {
			generation++;
			$$invalidate(9, viewportLoading = false);
			refreshQueued = false;
			clearContours();
		}
	}

	function setTime(index) {
		const t = clickedPoint?.times[index];
		if (Number.isFinite(t)) store.set('timestamp', t);
	}

	const syncTimestamp = () => {
		if (contoursEnabled && cache.length && !viewportLoading) renderFromCache();

		if (clickedPoint) {
			$$invalidate(8, selectedSlot = Math.max(0, forecastIntervalIndex(clickedPoint.times, getStoreTimestamp())));
			updatePersistentClickLabel();
		}
	};

	let enabled = true,
		panelHidden = false,
		chartOpen = false,
		forecastTab = 'graph',
		viewportLoading = false,
		refreshQueued = false,
		probeLoading = false,
		unitSystem = 'metric',
		prefsReady = false;

	let cache = [],
		contourLayer = null,
		clickedPoint = null,
		clickedLatLon = null,
		clickedMapElevationM = null,
		clickedPlaceName = null,
		pointSource = null,
		clickedNextEventTime = null;

	let moveTimer = null,
		generation = 0,
		clickGeneration = 0,
		activeRunTime = null;

	const profileCache = new Map();
	const pendingProfiles = new Map();
	let refreshEpoch = 0, lastChecked = null, refreshError = '', destroyed = false;
	let freshnessTimer = null;
	let lastRefreshAttempt = Date.now();

	const COLOUR_STOPS = [
		{ value: -500, color: '#b04de8' },
		{ value: 500, color: '#4b3fbf' },
		{ value: 1500, color: '#2196f3' },
		{ value: 2500, color: '#32c75a' },
		{ value: 3500, color: '#ffeb3b' },
		{ value: 4500, color: '#ff9800' },
		{ value: 6000, color: '#f44336' }
	];

	function contourIntervalForZoom() {
		const z = Number(map.getZoom?.() ?? 6);
		return z <= 4 ? 500 : z <= 7 ? 200 : 100;
	}

	function colorForLevel(level) {
		if (level <= COLOUR_STOPS[0].value) return COLOUR_STOPS[0].color;
		if (level >= COLOUR_STOPS.at(-1).value) return COLOUR_STOPS.at(-1).color;

		for (let i = 0; i < COLOUR_STOPS.length - 1; i++) {
			const a = COLOUR_STOPS[i], b = COLOUR_STOPS[i + 1];
			if (level < a.value || level > b.value) continue;

			const f = (level - a.value) / (b.value - a.value),
				x = hexToRgb(a.color),
				y = hexToRgb(b.color);

			return rgbToHex(x[0] + (y[0] - x[0]) * f, x[1] + (y[1] - x[1]) * f, x[2] + (y[2] - x[2]) * f);
		}

		return '#fff';
	}

	function getStoreTimestamp() {
		try {
			const t = store.get('timestamp');
			if (typeof t === 'number' && Number.isFinite(t)) return t;
		} catch {
			
		}

		return Date.now();
	}

	async function fetchMapElevation(lat, lon) {
		try {
			const r = await getElevation(lat, lon);

			for (const c of [r?.data, r?.data?.data, r?.value]) {
				const e = scalarNumber(c);
				if (e !== null) return e;
			}
		} catch(e) {
			console.warn('Wintry forecast map elevation failed', lat, lon, e);
		}

		return null;
	}

	function invalidateForNewRun(run) {
		if (run === null || isOlderRun(run, activeRunTime)) return;

		if (activeRunTime === null) {
			activeRunTime = run;
			return;
		}

		if (run > activeRunTime + 60_000) {
			activeRunTime = run;
			profileCache.clear();
			cache = [];
			clearContours();
		}
	}

	const elevationCache = new Map();

	function loadMapElevation(lat, lon) {
		const key = `${lat.toFixed(4)},${lon.toFixed(4)}`;
		const cached = elevationCache.get(key);
		if (cached) return cached;

		const request = fetchMapElevation(lat, lon).then(value => {
			if (value === null) elevationCache.delete(key);
			return value;
		});

		elevationCache.set(key, request);
		while (elevationCache.size > PROFILE_CACHE_MAX) elevationCache.delete(elevationCache.keys().next().value);
		return request;
	}

	function rememberProfile(p) {
		const k = profileKey(p.lat, p.lon, p.step);
		profileCache.delete(k);
		profileCache.set(k, p);

		while (profileCache.size > PROFILE_CACHE_MAX) {
			const o = profileCache.keys().next().value;
			if (o === undefined) break;
			profileCache.delete(o);
		}
	}

	function cachedProfile(lat, lon, step) {
		const k = profileKey(lat, lon, step), p = profileCache.get(k);
		if (!p) return null;

		if (!profileIsFresh(p.fetchedAt, p.runTime, activeRunTime)) {
			profileCache.delete(k);
			return null;
		}

		profileCache.delete(k);
		profileCache.set(k, p);
		return p;
	}

	async function loadPoint(lat, lon, step = 1) {
		const c = cachedProfile(lat, lon, step);

		if (c) {
			if (c.terrainM === null) c.terrainM = await loadMapElevation(lat, lon);
			return c;
		}

		const key = profileKey(lat, lon, step),
			epoch = refreshEpoch,
			pending = pendingProfiles.get(key);

		if (pending) return pending;

		const request = (async () => {
			try {
				const [r, terrainM] = await Promise.all([
					getMeteogramForecastData(MODEL, { lat, lon, step, days: FORECAST_DAYS }),
					loadMapElevation(lat, lon)
				]);

				if (destroyed || epoch !== refreshEpoch) return null;
				const { forecast, header } = extractPayload(r);
				if (!Object.keys(forecast).length) return null;
				const runTime = parseTime(header.refTime);
				if (isOlderRun(runTime, activeRunTime)) return null;
				invalidateForNewRun(runTime);

				const p = {
					lat,
					lon,
					forecast,
					header,
					times: buildForecastTimes(forecast, runTime),
					runTime,
					step,
					terrainM,
					fetchedAt: Date.now()
				};

				if (!p.times.length) return null;
				rememberProfile(p);
				return p;
			} catch(e) {
				console.warn('Wintry forecast point request failed', lat, lon, e);
				return null;
			}
		})();

		pendingProfiles.set(key, request);

		try {
			return await request;
		} finally {
			if (pendingProfiles.get(key) === request) pendingProfiles.delete(key);
		}
	}

	function gridShapeForZoom() {
		const z = Number(map.getZoom?.() ?? 6);

		return z <= 4
		? { rows: 9, cols: 15 }
		: z <= 6
			? { rows: 13, cols: 21 }
			: z <= 8 ? { rows: 17, cols: 27 } : { rows: 19, cols: 31 };
	}

	function buildViewportPoints() {
		const { rows, cols } = gridShapeForZoom(),
			b = map.getBounds(),
			rawSouth = Math.min(b.getSouth(), b.getNorth()),
			rawNorth = Math.max(b.getSouth(), b.getNorth()),
			south = Math.max(-MAX_VIEWPORT_LATITUDE, Math.min(MAX_VIEWPORT_LATITUDE, rawSouth)),
			north = Math.max(-MAX_VIEWPORT_LATITUDE, Math.min(MAX_VIEWPORT_LATITUDE, rawNorth)),
			west = b.getWest(),
			east = b.getEast(),
			dy = (north - south) / (rows - 1),
			dx = (east - west) / (cols - 1),
			points = [];

		for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) points.push({
			lat: south + r * dy,
			lon: west + c * dx,
			r,
			c
		});

		return { points, rows, cols };
	}

	async function refreshViewport() {
		if (!contoursEnabled || destroyed) return;

		if (viewportLoading) {
			refreshQueued = true;
			return;
		}

		refreshQueued = false;
		const my = ++generation;
		$$invalidate(9, viewportLoading = true);
		const { points, rows, cols } = buildViewportPoints();

		try {
			const results = await mapLimit(points, MAX_CONCURRENT, async p => ({
				...p,
				result: my === generation && enabled && !destroyed
				? await loadPoint(p.lat, p.lon, CONTOUR_STEP_H)
				: null
			}));

			if (my !== generation || !enabled || destroyed) return;
			const sameRun = p => p && profileIsFresh(p.fetchedAt, p.runTime, activeRunTime);
			const valid = results.filter(x => x.result?.times.length && sameRun(x.result)).length;

			if (valid < Math.max(4, Math.floor(points.length * MIN_VALID_FRACTION))) {
				cache = [];
				clearContours();
				$$invalidate(15, refreshError = 'Map forecast unavailable.');
				return;
			}

			const next = Array.from({ length: rows }, () => Array(cols).fill(null));
			for (const x of results) if (sameRun(x.result)) next[x.r][x.c] = x.result;
			cache = next;
			lastChecked = Date.now();
			$$invalidate(15, refreshError = '');
			renderFromCache();
			if (clickedPoint && clickedLatLon && !profileIsFresh(clickedPoint.fetchedAt, clickedPoint.runTime, activeRunTime)) void probeLocation(...clickedLatLon, pointSource ?? 'map-click', clickedPlaceName);
		} finally {
			if (my === generation) $$invalidate(9, viewportLoading = false);

			if (refreshQueued && enabled && !destroyed) {
				refreshQueued = false;
				setTimeout(refreshViewport, 0);
			}
		}
	}

	function checkAutomaticRefresh() {
		if (!destroyed && automaticRefreshDue({
			busy: viewportLoading || probeLoading,
			hidden: document.hidden,
			online: navigator.onLine,
			failed: !!refreshError || lastChecked === null,
			lastAttempt: lastRefreshAttempt
		})) refreshForecast();
	}

	function refreshForecast() {
		if (destroyed) return;
		lastRefreshAttempt = Date.now();
		refreshEpoch++;
		generation++;
		$$invalidate(9, viewportLoading = false);
		refreshQueued = false;
		profileCache.clear();
		pendingProfiles.clear();
		$$invalidate(15, refreshError = '');
		if (clickedLatLon) void probeLocation(...clickedLatLon, pointSource ?? 'map-click', clickedPlaceName);
		void refreshViewport();
	}

	function clearContours() {
		if (!contourLayer) return;

		try {
			map.removeLayer(contourLayer);
		} catch {
			
		}

		contourLayer = null;
	}

	function positionText(d) {
		const a = Math.abs(d);
		if (a <= POSITION_NEAR_SNOWLINE_METRES) return `<strong>Near snowline</strong><small>within ±${formatElevation(POSITION_NEAR_SNOWLINE_METRES, unitSystem)}</small>`;

		const side = d > 0 ? 'above' : 'below',
			label = a > 1000
			? `Far ${side} snowline`
			: a > 300
				? `Well ${side} snowline`
				: `Slightly ${side} snowline`;

		return `<strong>${label}</strong><small>${formatElevation(a, unitSystem)} ${side}</small>`;
	}

	function snowlineAt(point, index) {
		const r = wetBulbZeroHeight(buildProfile(point.forecast, index));

		return r.snowLevelM !== null && Number.isFinite(r.snowLevelM)
		? r.snowLevelM
		: null;
	}

	function tendencyText(point, index) {
		const now = snowlineAt(point, index);
		if (now === null) return '';
		const target = point.times[index] + TENDENCY_HOURS * 3600_000;
		if (target > point.times.at(-1) + 30 * 60_000) return '';
		const fi = nearestIndex(point.times, target);
		if (fi === index) return '';
		const future = snowlineAt(point, fi);
		if (future === null) return '';
		const d = Math.round((future - now) / ((point.times[fi] - point.times[index]) / 3600_000) / 10) * 10;

		return Math.abs(d) < 20
		? '→ Steady'
		: `${d > 0 ? '↑' : '↓'} ${formatElevation(Math.abs(d), unitSystem)}/h`;
	}

	function phaseAt(point, index, terrainM) {
		const precip = precipMmAt(point.forecast, index);
		if (precip === null || precip < PRECIP_THRESHOLD_MM_H) return null;
		return terrainPrecipitationType(buildProfile(point.forecast, index), terrainM);
	}

	async function shareCurrentPoint(button) {
		if (!clickedPoint || !clickedLatLon || !clickedPoint.times.length) return;

		const point = clickedPoint,
			[lat, lon] = clickedLatLon,
			target = getStoreTimestamp(),
			index = forecastIntervalIndex(point.times, target);

		if (index < 0) return;

		const terrain = clickedMapElevationM,
			units = unitSystem,
			place = clickedPlaceName || formatCoordinate(lat, lon),
			validTime = point.times[index];

		const snowline = snowlineAt(point, index),
			precip = precipMmAt(point.forecast, index),
			phase = terrain !== null ? phaseAt(point, index, terrain) : null;

		const event = terrain !== null
		? nextWintryEvent(point, terrain, target)
		: null;

		const text = [
			'Wintry forecast',
			place,
			'Valid: ' + formatLocal(validTime),
			conditionLabel(precip, phase),
			'Snowline: ' + formatElevation(snowline, units),
			'Terrain: ' + formatElevation(terrain, units),
			'Precipitation: ' + formatPrecip(precip, units),
			event
			? (event.activeNow ? 'Current' : 'Next') + ' wintry period: ' + formatLocal(event.startTime) + ' to ' + formatLocal(event.endTime)
			: noEventMessage(point, terrain, target),
			event
			? event.incomplete
				? 'Snow amount uncertain'
				: 'Estimated new snow' + (event.activeNow ? ' remaining' : '') + ': ' + formatSnow(event.newSnowCm, units)
			: '',
			'ECMWF atmospheric profile · Windy terrain. Snow amounts are estimates.'
		].filter(Boolean).join('\n');

		button.disabled = true;

		try {
			await copyText(text);
			button.textContent = 'Copied';
		} catch {
			button.textContent = 'Retry';
		} finally {
			button.disabled = false;

			setTimeout(
				() => {
					if (button.isConnected) button.textContent = 'Copy';
				},
				1600
			);
		}
	}

	function compactEventSummary(point, terrainM, target) {
		const event = nextWintryEvent(point, terrainM, target);

		if (!event) return {
			text: noEventMessage(point, terrainM, target),
			jumpTime: null
		};

		const amount = event.incomplete
		? ' · amount uncertain'
		: event.newSnowCm > 0.05
			? ' · est. ' + formatSnow(event.newSnowCm, unitSystem) + (event.activeNow ? ' remaining' : '')
			: '';

		if (event.activeNow) return {
			text: precipitationLabel(event.dominantPhase, event.confidence) + ' until ' + shortValid(event.endTime) + amount,
			jumpTime: null
		};

		return {
			text: precipitationLabel(event.dominantPhase, event.confidence) + ' · ' + shortValid(event.startTime) + amount,
			jumpTime: event.startTime
		};
	}

	function labelGrid(args) {
		const terrain = metricTile('Terrain', formatElevation(args.terrain, unitSystem), 'metric-terrain');
		const snowline = metricTile('Snowline', formatElevation(args.snowline, unitSystem), 'metric-snowline');

		const relation = `<div class="snowline-compact-relation">${positionText(args.difference)}<span>${args.precip === null
		? 'Precip unavailable'
		: args.hasPrecip
			? `Precip ${formatPrecip(args.precip, unitSystem)}`
			: 'Dry'}</span></div>`;

		const grid = `<div class="snowline-label-grid">${terrain}${snowline}</div>`;

		const summary = `<div class="snowline-event-line">${args.eventLine}</div>`;

		return `<div class="snowline-valid">${args.valid}</div>${grid}${relation}${summary}`;
	}

	function showClickLabel(
		lat,
	lon,
	mainText,
	detailHtml = '',
	snowlineColor = '#fff',
	status = 'neutral'
	) {
		$$invalidate(5, pointTitle = mainText);
		$$invalidate(6, pointDetail = detailHtml);
		$$invalidate(7, pointAccent = statusColor(status));
	}

	function updatePersistentClickLabel() {

		if (!clickedPoint || !clickedLatLon || !clickedPoint.times.length) return;
		$$invalidate(14, clickedNextEventTime = null);

		const [lat, lon] = clickedLatLon,
			target = getStoreTimestamp(),
			first = clickedPoint.times[0],
			end = Math.min(clickedPoint.times.at(-1), first + MAX_FORECAST_HOURS * 3600_000);

		if (target < first - 30 * 60_000 || target > end + 30 * 60_000) {
			showClickLabel(lat, lon, 'Outside +144 h');
			return;
		}

		const index = forecastIntervalIndex(clickedPoint.times, target);

		if (index < 0) {
			showClickLabel(lat, lon, 'Forecast unavailable at this time');
			return;
		}

		const valid = clickedPoint.times[index],
			profile = buildProfile(clickedPoint.forecast, index),
			slr = wetBulbZeroHeight(profile),
			snowline = slr.snowLevelM !== null && Number.isFinite(slr.snowLevelM)
			? slr.snowLevelM
			: null;

		if (snowline === null) {
			const precip = precipMmAt(clickedPoint.forecast, index),
				phase = clickedMapElevationM !== null
				? phaseAt(clickedPoint, index, clickedMapElevationM)
				: null;

			const reason = slr.status === 'below-lowest-level'
			? 'WBZ is below the lowest resolved level or absent in a cold column'
			: 'No atmospheric crossing resolved';

			const detail = `<div class="snowline-valid">${shortValid(valid)}</div><div class="snowline-label-grid">${metricTile('Terrain', formatElevation(clickedMapElevationM, unitSystem), 'metric-terrain')}${metricTile('Precip', formatPrecip(precip, unitSystem), '')}</div><div class="snowline-event-line">${reason}. ${phase
			? precipitationLabel(phase)
			: precip !== null && precip < PRECIP_THRESHOLD_MM_H
				? 'Dry'
				: 'Precipitation type unavailable'}</div>`;

			showClickLabel(
				lat,
				lon,
				phase
				? `${phase.icon} ${precipitationLabel(phase).toUpperCase()}`
				: precip !== null && precip < PRECIP_THRESHOLD_MM_H
					? 'DRY'
					: 'WBZ unresolved',
				detail
			);

			return;
		}

		const rounded = Math.round(snowline / 10) * 10,
			tendency = tendencyText(clickedPoint, index),
			precip = precipMmAt(clickedPoint.forecast, index),
			hasPrecip = precip !== null && precip >= PRECIP_THRESHOLD_MM_H;

		if (clickedMapElevationM !== null && Number.isFinite(clickedMapElevationM)) {
			const terrain = Math.round(clickedMapElevationM / 10) * 10,
				difference = clickedMapElevationM - snowline,
				status = statusForDifference(difference),
				phase = hasPrecip
				? terrainPrecipitationType(profile, clickedMapElevationM)
				: null,
				summary = compactEventSummary(clickedPoint, clickedMapElevationM, target);

			$$invalidate(14, clickedNextEventTime = summary.jumpTime);

			const grid = labelGrid({
				valid: shortValid(valid),
				terrain,
				snowline: rounded,
				difference,
				precip,
				hasPrecip,
				eventLine: summary.text}) + (slr.extrapolated
			? '<div class="forecast-quality">Snowline estimated below the resolved profile</div>'
			: '') + (phase?.confidence === 'low'
			? '<div class="forecast-quality">Limited atmospheric detail; type may differ</div>'
			: '');

			if (phase) {
				showClickLabel(lat, lon, `${phase.icon} ${precipitationLabel(phase).toUpperCase()}`, grid, colorForLevel(snowline), status);
				return;
			}

			showClickLabel(lat, lon, conditionLabel(precip, phase).toUpperCase(), grid, colorForLevel(snowline), status);
			return;
		}

		showClickLabel(lat, lon, formatElevation(rounded, unitSystem), `<div class="snowline-label-grid"><span><small>Valid</small><strong>${shortValid(valid)}</strong></span><span><small>Trend</small><strong>${tendency || '—'}</strong></span></div>`, colorForLevel(snowline), 'neutral');
	}

	async function probeLocation(lat, lon, source, placeName = null) {
		if (destroyed || !Number.isFinite(lat) || !Number.isFinite(lon)) return;
		const keep = chartOpen, my = ++clickGeneration;
		$$invalidate(11, clickedPoint = null);
		$$invalidate(12, clickedMapElevationM = null);
		$$invalidate(14, clickedNextEventTime = null);
		$$invalidate(28, clickedLatLon = [lat, lon]);
		$$invalidate(13, clickedPlaceName = placeName);
		pointSource = source;
		$$invalidate(10, probeLoading = true);
		showClickLabel(lat, lon, 'Loading forecast…', '<div class="snowline-loading">Checking snow, timing and amounts</div>');

		try {
			const [point, elev, fields] = await Promise.all([
				loadPoint(lat, lon, 3),
				loadMapElevation(lat, lon),
				loadSelectedPrecipFields(lat, lon, FORECAST_DAYS)
			]);

			if (my !== clickGeneration || pointSource !== source || !enabled || destroyed) return;

			if (!point || !point.times.length || !profileIsFresh(point.fetchedAt, point.runTime, activeRunTime)) {
				showClickLabel(lat, lon, 'Forecast unavailable', '<div class="snowline-loading">Select this place again to retry.</div>');
				return;
			}

			const aligned = alignSelectedPrecipFields(fields, point.times);

			$$invalidate(11, clickedPoint = Object.keys(aligned).length
			? {
					...point,
					forecast: { ...point.forecast, ...aligned }
				}
			: point);

			$$invalidate(12, clickedMapElevationM = elev);
			$$invalidate(11, clickedPoint.terrainM = elev, clickedPoint);
			lastChecked = Date.now();
			if (keep) chartOpen = true;
			$$invalidate(8, selectedSlot = Math.max(0, forecastIntervalIndex(point.times, getStoreTimestamp())));
			updatePersistentClickLabel();
		} finally {
			if (my === clickGeneration) $$invalidate(10, probeLoading = false);
		}
	}

	function isEnabled() {
		return enabled;
	}

	function selectMapPoint(lat, lon) {
		if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
		void probeLocation(lat, lon, 'map-click');
	}

	function lineLength(line) {
		let total = 0;

		for (let i = 1; i < line.length; i++) {
			const a = map.latLngToContainerPoint(line[i - 1]),
				b = map.latLngToContainerPoint(line[i]);

			total += Math.hypot(b.x - a.x, b.y - a.y);
		}

		return total;
	}

	function midpointAlongLine(line) {
		if (line.length < 2) return null;
		const total = lineLength(line);
		let travelled = 0;

		for (let i = 1; i < line.length; i++) {
			const a = map.latLngToContainerPoint(line[i - 1]),
				b = map.latLngToContainerPoint(line[i]),
				length = Math.hypot(b.x - a.x, b.y - a.y);

			if (length > 0 && travelled + length >= total / 2) {
				const f = (total / 2 - travelled) / length;

				return [
					line[i - 1][0] + f * (line[i][0] - line[i - 1][0]),
					line[i - 1][1] + f * (line[i][1] - line[i - 1][1])
				];
			}

			travelled += length;
		}

		return line[0];
	}

	function drawDeclutteredLabels(candidates, layer) {
		const size = map.getSize(),
			w = Number(size.x),
			h = Number(size.y),
			max = w < 520 ? 5 : w < 900 ? 8 : 12;

		const ordered = [...candidates].sort((a, b) => a.isMajor !== b.isMajor
		? a.isMajor ? -1 : 1
		: b.length - a.length);

		const occupied = [];

		for (const c of ordered) {
			if (occupied.length >= max) break;
			const p = map.latLngToContainerPoint(c.point);
			if (p.x < 54 || p.x > w - 54 || p.y < 24 || p.y > h - 60) continue;
			if (occupied.some(o => Math.abs(p.x - o.x) < 110 && Math.abs(p.y - o.y) < 38)) continue;

			L.marker(c.point, {
				interactive: false,
				icon: L.divIcon({
					className: 'snowline-label' + (c.isMajor ? ' snowline-label-major' : ' '),
					html: '<span style="--snowline-color:' + c.color + '">' + formatElevation(c.level, unitSystem) + '</span>',
					iconSize: [96, 22],
					iconAnchor: [48, 11]
				})
			}).addTo(layer);

			occupied.push({ x: p.x, y: p.y });
		}
	}

	function addTerrainHatching(field, layer) {
		const projected = field.map((row, r) => row.map((v, c) => {
			const point = map.latLngToLayerPoint([v.lat, v.lon]),
				terrain = cache[r]?.[c]?.terrainM;

			return {
				x: point.x,
				y: point.y,
				difference: v.value !== null && terrain !== null && terrain !== undefined
				? terrain - v.value
				: null
			};
		}));

		const lines = terrainHatchSegments(projected, 24).map(line => line.map(([x, y]) => map.layerPointToLatLng([x, y])));

		if (lines.length) L.polyline(lines, {
			color: '#ef70cf',
			weight: 1.8,
			opacity: .65,
			interactive: false,
			lineCap: 'butt',
			smoothFactor: 0
		}).addTo(layer);
	}

	function interpolatedSnowline(p, target) {
		const i = nearestIndex(p.times, target), t = p.times[i];
		if (t === target) return snowlineAt(p, i);
		const a = t < target ? i : i - 1, b = a + 1;
		if (a < 0 || b >= p.times.length) return snowlineAt(p, i);
		const lo = snowlineAt(p, a), hi = snowlineAt(p, b), gap = p.times[b] - p.times[a];
		if (lo === null || hi === null || gap <= 0 || gap > 3 * 3600_000) return null;
		return lo + (hi - lo) * (target - p.times[a]) / gap;
	}

	function renderFromCache() {
		if (!contoursEnabled || !cache.length) return;

		const target = getStoreTimestamp(),
			firstPoint = cache.flat().find(p => p !== null && p.times.length > 0);

		if (!firstPoint) return;

		const first = firstPoint.times[0],
			end = Math.min(firstPoint.times.at(-1), first + MAX_FORECAST_HOURS * 3600_000);

		if (target < first - 30 * 60_000 || target > end + 30 * 60_000) {
			clearContours();
			return;
		}

		const field = [];

		for (let r = 0; r < cache.length; r++) {
			const row = [];

			for (let c = 0; c < cache[r].length; c++) {
				const p = cache[r][c];

				if (!p || !p.times.length) {
					row.push({ lat: 0, lon: 0, value: null });
					continue;
				}

				row.push({
					lat: p.lat,
					lon: p.lon,
					value: interpolatedSnowline(p, target)
				});
			}

			field.push(row);
		}

		const interval = contourIntervalForZoom(),
			{ field: contourField, levels } = prepareSnowlineContours(field, interval);

		if (!levels.length) {
			clearContours();
			return;
		}

		const next = L.layerGroup(), candidates = [];
		addTerrainHatching(field, next);
		const linesByLevel = contourLinesForLevels(contourField, levels);

		for (const level of levels) {
			const lines = linesByLevel.get(level).filter(line => line.length >= 2);
			if (!lines.length) continue;

			const is1000 = level % 1000 === 0,
				is500 = level % 500 === 0,
				color = colorForLevel(level),
				weight = is1000 ? 3 : is500 ? 2.2 : 1.5;

			const common = {
				interactive: false,
				lineCap: 'round',
				lineJoin: 'round',
				smoothFactor: .5
			};

			const [red, green, blue] = hexToRgb(color),
				brightness = .299 * red + .587 * green + .114 * blue;

			const casing = brightness > 150 ? '#14212b' : '#ffffff';

			L.polyline(lines, {
				...common,
				color: casing,
				weight: weight + 2,
				opacity: .95
			}).addTo(next);

			L.polyline(lines, { ...common, color, weight, opacity: 1 }).addTo(next);

			if (is1000 || level === -500 || interval === 100 && is500) {
				const ranked = lines.map(line => ({ line, length: lineLength(line) })).filter(x => x.length >= 110).sort((a, b) => b.length - a.length).slice(0, 3);

				for (const { line, length } of ranked) {
					const point = midpointAlongLine(line);

					if (point) candidates.push({
						point,
						level,
						color,
						length,
						isMajor: is1000
					});
				}
			}
		}

		drawDeclutteredLabels(candidates, next);
		next.addTo(map);
		const old = contourLayer;
		contourLayer = next;

		if (old) try {
			map.removeLayer(old);
		} catch {
			
		}
	}

	function handleMapNavigation() {
		if (moveTimer) clearTimeout(moveTimer);
		moveTimer = setTimeout(refreshViewport, 350);
	}

	onMount(() => {
		$$invalidate(23, mounted = true);
		$$invalidate(4, unitSystem = units);
		register(config.name, 'high');
		freshnessTimer = setInterval(checkAutomaticRefresh, 30_000);
		document.addEventListener('visibilitychange', checkAutomaticRefresh);
		window.addEventListener('online', checkAutomaticRefresh);
		map.on('moveend', handleMapNavigation);
		map.on('zoomend', handleMapNavigation);
		store.on('timestamp', syncTimestamp);
	});

	onDestroy(() => {
		$$invalidate(23, mounted = false);
		destroyed = true;
		release(config.name, 'high');
		refreshEpoch++;
		generation++;
		clickGeneration++;
		pendingProfiles.clear();
		if (freshnessTimer) clearInterval(freshnessTimer);
		document.removeEventListener('visibilitychange', checkAutomaticRefresh);
		window.removeEventListener('online', checkAutomaticRefresh);
		if (moveTimer) clearTimeout(moveTimer);
		map.off('moveend', handleMapNavigation);
		map.off('zoomend', handleMapNavigation);
		store.off('timestamp', syncTimestamp);
		clearContours();
		profileCache.clear();
	});

	const input_handler = e => setTime(Number(e.currentTarget.value));
	const click_handler = () => setTime(nearestIndex(clickedPoint.times, Date.now()));

	function snowlinechart_tab_binding(value) {
		forecastTab = value;
		$$invalidate(3, forecastTab);
	}

	const click_handler_1 = () => store.set('timestamp', clickedNextEventTime);
	const click_handler_2 = e => shareCurrentPoint(e.currentTarget);

	$$self.$$set = $$props => {
		if ('location' in $$props) $$invalidate(0, location = $$props.location);
		if ('placeName' in $$props) $$invalidate(1, placeName = $$props.placeName);
		if ('units' in $$props) $$invalidate(20, units = $$props.units);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*mounted, units, contoursEnabled*/ 9437188) {
			if (mounted) {
				$$invalidate(4, unitSystem = units);
				updatePersistentClickLabel();
				if (contoursEnabled) renderFromCache();
			}
		}

		if ($$self.$$.dirty[0] & /*mounted, location, selectedInput, placeName*/ 25165827) {
			if (mounted && location && selectedInput !== location.lat + ',' + location.lon) {
				$$invalidate(24, selectedInput = location.lat + ',' + location.lon);
				void probeLocation(location.lat, location.lon, 'map-click', placeName || null);
			}
		}

		if ($$self.$$.dirty[0] & /*placeName, clickedLatLon*/ 268435458) {
			if (placeName && clickedLatLon) $$invalidate(13, clickedPlaceName = placeName);
		}

		if ($$self.$$.dirty[0] & /*prefsReady, enabled, panelHidden, forecastTab*/ 234881032) ;

		if ($$self.$$.dirty[0] & /*prefsReady, unitSystem*/ 134217744) ;
	};

	return [
		location,
		placeName,
		contoursEnabled,
		forecastTab,
		unitSystem,
		pointTitle,
		pointDetail,
		pointAccent,
		selectedSlot,
		viewportLoading,
		probeLoading,
		clickedPoint,
		clickedMapElevationM,
		clickedPlaceName,
		clickedNextEventTime,
		refreshError,
		toggleContours,
		setTime,
		refreshForecast,
		shareCurrentPoint,
		units,
		isEnabled,
		selectMapPoint,
		mounted,
		selectedInput,
		enabled,
		panelHidden,
		prefsReady,
		clickedLatLon,
		input_handler,
		click_handler,
		snowlinechart_tab_binding,
		click_handler_1,
		click_handler_2
	];
}

class Winter extends SvelteComponent {
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
				placeName: 1,
				units: 20,
				isEnabled: 21,
				selectMapPoint: 22
			},
			add_css,
			[-1, -1, -1, -1]
		);
	}

	get isEnabled() {
		return this.$$.ctx[21];
	}

	get selectMapPoint() {
		return this.$$.ctx[22];
	}
}

const cache=new Map();
async function fetchForecast(model,location,refresh=false){
 const key=`${model}:${location.lat.toFixed(4)},${location.lon.toFixed(4)}`,cached=cache.get(key);
 if(!refresh&&cached&&Date.now()-cached.at<300000)return cached.data;
 const response=await getPointForecastData(model,{...location,days:8,step:1},{header:true,summary:true,meteogram:true,airgram:true,sounding:true,celestial:true});
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
				winterComponent: Winter,
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
