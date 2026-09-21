const __pluginConfig =  {
  "name": "windy-plugin-weatherscope",
  "version": "0.4.0",
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
  "built": 1790023497724,
  "builtReadable": "2026-09-21T20:44:57.724Z"
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
 return `${Number(n.toFixed(unit==='°'?0:1))}${u==='raw'?' (raw)':u==='code'?' (code)':' '+u}`;
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
function briefing(data,time,prefs,thresholds={gust:15,rain:2}){
 const items=[],wind=value(data,'wind',time),gust=value(data,'windGust',time),t=value(data,'temperature',time),td=value(data,'dewPoint',time);
 if(finite(t))items.push({label:'Selected forecast',text:`${format(t,'K',prefs)}${finite(td)?' · dew point '+format(td,'K',prefs):''}${finite(wind)?' · wind '+format(wind,'m/s',prefs):''}.`,key:'temperature'});
 if(finite(gust)&&gust>=thresholds.gust)items.push({label:'Wind signal',text:`Gusts ${format(gust,'m/s',prefs)} exceed your ${format(thresholds.gust,'m/s',prefs)} threshold.`,key:'windGust'});
 const rain=fieldFor(data,'precipAmount');
 if(rain){const i=rain.ts.findIndex((ts,i)=>ts>=time&&ts<=time+24*HOUR$1&&finite(rain.values[i])&&rain.values[i]>=thresholds.rain);if(i>=0)items.push({label:'Next wet interval',text:`${format(rain.values[i],'mm/step',prefs)} at ${timeLabel(rain.ts[i],prefs.local)}. Threshold ${thresholds.rain} mm/step.`,key:'precipAmount'});}
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
 const end=time+hours*HOUR$1;
 const list=key=>{const f=fieldFor(data,key);return f?f.ts.flatMap((ts,i)=>ts>=time&&ts<=end&&finite(f.values[i])?[f.values[i]]:[]):[];};
 const temps=list('temperature'),gusts=list('windGust');
 const rain=fieldFor(data,'precipAmount');let rainTotal=0,cursor=time,complete=false;
 if(rain){for(let i=0;i<rain.ts.length-1;i++){const from=rain.ts[i],to=rain.ts[i+1];if(from<time||from>=end)continue;if(from!==cursor||to>end||to-from>3*HOUR$1||!finite(rain.values[i])||rain.values[i]<0)break;rainTotal+=rain.values[i];cursor=to;}complete=cursor===end;}
 return {low:temps.length?Math.min(...temps):null,high:temps.length?Math.max(...temps):null,maxGust:gusts.length?Math.max(...gusts):null,rain:complete?rainTotal:null,rainComplete:complete};
}
function predictability(data,time){
 const summaries=Array.isArray(data?.summary)?data.summary:Object.values(data?.summary||{});
 const index=data?.ts.indexOf(time)??-1;if(index<0)return null;
 const day=summaries.find(s=>Number.isInteger(s.index)&&Number.isInteger(s.segments)&&index>=s.index&&index<s.index+s.segments);
 const p=day?.predictability;return finite(p)&&p>=0&&p<=100?p:null;
}

/* src\App.svelte generated by Svelte v4.2.20 */

function add_css$3(target) {
	append_styles(target, "svelte-kljptn", ".time-slider.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:block;color:var(--muted);font-size:10px;margin:8px 0}.time-slider.svelte-kljptn input.svelte-kljptn.svelte-kljptn{display:block;width:100%;padding:0;accent-color:var(--mint)}.outlook.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:10px 0}.outlook.svelte-kljptn>div.svelte-kljptn.svelte-kljptn{border:1px solid var(--line);border-radius:6px;padding:8px}.outlook.svelte-kljptn small.svelte-kljptn.svelte-kljptn{display:block;font-size:8px}.outlook.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{display:block;font-size:12px;margin:3px 0}.diagnostics.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin:12px 0}.diagnostics.svelte-kljptn button.svelte-kljptn.svelte-kljptn{text-align:left}.diagnostics.svelte-kljptn small.svelte-kljptn.svelte-kljptn,.diagnostics.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{display:block}.hodograph.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:block;width:100%;max-width:300px;margin:auto}.hodograph.svelte-kljptn text.svelte-kljptn.svelte-kljptn{fill:#93a8b8;font-size:8px}.weatherscope.svelte-kljptn.svelte-kljptn.svelte-kljptn{--bg:#0d1722;--panel:#152330;--line:#293a48;--muted:#93a8b8;--mint:#69ddc3;color:#edf4f8;background:var(--bg);font:13px/1.5 system-ui,-apple-system,Segoe UI,sans-serif;box-sizing:border-box;min-height:100%;padding:16px;width:100%;max-width:780px;margin:auto;color-scheme:dark}.weatherscope.svelte-kljptn .svelte-kljptn.svelte-kljptn{box-sizing:border-box}h1.svelte-kljptn.svelte-kljptn.svelte-kljptn,h2.svelte-kljptn.svelte-kljptn.svelte-kljptn,p.svelte-kljptn.svelte-kljptn.svelte-kljptn{margin:0}h1.svelte-kljptn.svelte-kljptn.svelte-kljptn{font-size:24px;letter-spacing:-1px;font-weight:650}h1.svelte-kljptn span.svelte-kljptn.svelte-kljptn{font-size:9px;letter-spacing:2px;color:var(--mint);margin-left:10px}h2.svelte-kljptn.svelte-kljptn.svelte-kljptn{font-size:14px;font-weight:600}header.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:flex;justify-content:space-between;align-items:center;padding-bottom:12px;border-bottom:1px solid var(--line)}.brand.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:flex;align-items:center;gap:12px}.mark.svelte-kljptn.svelte-kljptn.svelte-kljptn{color:var(--mint);font-size:35px}.brand.svelte-kljptn p.svelte-kljptn.svelte-kljptn{font-size:11px;color:var(--muted)}button.svelte-kljptn.svelte-kljptn.svelte-kljptn,select.svelte-kljptn.svelte-kljptn.svelte-kljptn,input.svelte-kljptn.svelte-kljptn.svelte-kljptn{font:inherit}button.svelte-kljptn.svelte-kljptn.svelte-kljptn{background:#1c2d3b;color:#dce8ee;border:1px solid var(--line);border-radius:6px;padding:6px 10px;cursor:pointer}button.svelte-kljptn.svelte-kljptn.svelte-kljptn:hover{background:#294153;border-color:#688796}button.svelte-kljptn.svelte-kljptn.svelte-kljptn:focus-visible,input.svelte-kljptn.svelte-kljptn.svelte-kljptn:focus-visible,select.svelte-kljptn.svelte-kljptn.svelte-kljptn:focus-visible{outline:2px solid var(--mint);outline-offset:2px}button.svelte-kljptn.svelte-kljptn.svelte-kljptn:disabled{opacity:.5;cursor:wait}button.icon.svelte-kljptn.svelte-kljptn.svelte-kljptn{font-size:20px;background:transparent;border:0}.location.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:flex;justify-content:space-between;align-items:center;margin:9px 0}.location.svelte-kljptn strong.svelte-kljptn.svelte-kljptn,.timebar.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{display:block;font-size:17px;font-weight:500;font-variant-numeric:tabular-nums}small.svelte-kljptn.svelte-kljptn.svelte-kljptn{color:var(--muted);font-size:10px}.location.svelte-kljptn small.svelte-kljptn.svelte-kljptn,.timebar.svelte-kljptn small.svelte-kljptn.svelte-kljptn{letter-spacing:1.5px;font-size:9px}.source.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}.source.svelte-kljptn label.svelte-kljptn.svelte-kljptn{color:var(--muted);font-size:11px}.source.svelte-kljptn select.svelte-kljptn.svelte-kljptn{margin-left:7px;color:var(--mint)}select.svelte-kljptn.svelte-kljptn.svelte-kljptn,input.svelte-kljptn.svelte-kljptn.svelte-kljptn{background:#111f2b;color:#e5eef3;border:1px solid var(--line);border-radius:5px;padding:7px;max-width:100%}nav.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:flex;border-bottom:1px solid var(--line);gap:5px;margin-bottom:10px}nav.svelte-kljptn button.svelte-kljptn.svelte-kljptn{background:transparent;border:0;border-bottom:2px solid transparent;border-radius:0;padding:8px 9px;color:var(--muted);font-size:12px}nav.svelte-kljptn button.active.svelte-kljptn.svelte-kljptn{color:var(--mint);border-bottom-color:var(--mint)}.timebar.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:flex;justify-content:space-between;align-items:center;gap:8px}.shortcuts.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:flex;gap:3px}.shortcuts.svelte-kljptn button.svelte-kljptn.svelte-kljptn{padding:4px 6px;font-size:10px}.provenance.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:flex;align-items:center;gap:6px;flex-wrap:wrap;color:var(--muted);font-size:10px;margin:6px 0 10px}.provenance.svelte-kljptn>span.svelte-kljptn.svelte-kljptn:last-child{margin-left:auto}.dot.svelte-kljptn.svelte-kljptn.svelte-kljptn{height:5px;width:5px;background:var(--mint);border-radius:50%}.briefing.svelte-kljptn.svelte-kljptn.svelte-kljptn{border-left:2px solid var(--mint);background:linear-gradient(100deg,#16322e,#13222e);padding:7px 13px;margin-bottom:10px;border-radius:0 7px 7px 0}.briefing.svelte-kljptn button.svelte-kljptn.svelte-kljptn{display:block;text-align:left;background:none;border:0;padding:5px 0;width:100%;font-size:12px}.briefing.svelte-kljptn small.svelte-kljptn.svelte-kljptn{display:block;color:var(--mint);font-size:9px;letter-spacing:.6px;text-transform:uppercase}.cards.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.card.svelte-kljptn.svelte-kljptn.svelte-kljptn{text-align:left;padding:11px;background:var(--panel);min-width:0}.card.svelte-kljptn small.svelte-kljptn.svelte-kljptn{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.card.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{display:block;font-size:20px;font-weight:500;margin:4px 0;font-variant-numeric:tabular-nums}.card.svelte-kljptn span.svelte-kljptn.svelte-kljptn{color:var(--muted);font-size:9px}.section-title.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:flex;justify-content:space-between;align-items:center;gap:6px;margin:12px 0 8px}.section-title.svelte-kljptn small.svelte-kljptn.svelte-kljptn{text-align:right}.timeline.svelte-kljptn.svelte-kljptn.svelte-kljptn,.scroll-table.svelte-kljptn.svelte-kljptn.svelte-kljptn{overflow:auto;border:1px solid var(--line);border-radius:7px}table.svelte-kljptn.svelte-kljptn.svelte-kljptn{border-collapse:collapse;font-size:10px;width:100%;white-space:nowrap}th.svelte-kljptn.svelte-kljptn.svelte-kljptn,td.svelte-kljptn.svelte-kljptn.svelte-kljptn{text-align:right;padding:4px 9px;border-bottom:1px solid #233440;font-variant-numeric:tabular-nums}th.svelte-kljptn.svelte-kljptn.svelte-kljptn{color:var(--muted);font-weight:500}th.svelte-kljptn.svelte-kljptn.svelte-kljptn:first-child{text-align:left;background:#152330}.timeline.svelte-kljptn th.svelte-kljptn.svelte-kljptn:first-child{position:sticky;left:0;z-index:1;min-width:95px}.timeline.svelte-kljptn th button.svelte-kljptn.svelte-kljptn{font-size:9px;border:0;background:none;padding:1px;min-width:45px}.timeline.svelte-kljptn th button.chosen.svelte-kljptn.svelte-kljptn{color:var(--mint)}.wet.svelte-kljptn.svelte-kljptn.svelte-kljptn{background:#183b48;color:#9cdfee}.footnote.svelte-kljptn.svelte-kljptn.svelte-kljptn{font-size:10px;color:var(--muted);margin:10px 0;line-height:1.65}footer.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:flex;justify-content:space-between;font-size:8px;letter-spacing:1px;color:#7290a3;border-top:1px solid var(--line);margin-top:20px;padding-top:12px}.notice.svelte-kljptn.svelte-kljptn.svelte-kljptn{padding:9px;border:1px solid #67512c;color:#eed4a4;background:#302b21;border-radius:5px;font-size:11px;margin:10px 0}.empty.svelte-kljptn.svelte-kljptn.svelte-kljptn{padding:45px 10px;text-align:center;color:var(--muted)}.empty.svelte-kljptn h2.svelte-kljptn.svelte-kljptn{font-size:18px;color:#e5edf3;margin:12px}.error.svelte-kljptn.svelte-kljptn.svelte-kljptn{color:#efb3a4}.empty.svelte-kljptn button.svelte-kljptn.svelte-kljptn{margin:14px}.pulse.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:inline-block;width:16px;height:16px;border:2px solid var(--mint);border-radius:50%;animation:svelte-kljptn-breathe 1.3s infinite}@keyframes svelte-kljptn-breathe{50%{opacity:.25}}.settings.svelte-kljptn.svelte-kljptn.svelte-kljptn{background:var(--panel);padding:12px;border-radius:7px;margin-bottom:12px;display:grid;gap:10px}.settings.svelte-kljptn label.svelte-kljptn.svelte-kljptn{display:flex;align-items:center;justify-content:space-between;gap:10px}.settings.svelte-kljptn input[type=number].svelte-kljptn.svelte-kljptn{width:80px}.favorites.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:12px}.favorites.svelte-kljptn button.svelte-kljptn.svelte-kljptn{font-size:10px}.filters.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:flex;gap:7px;margin-top:15px}.filters.svelte-kljptn input.svelte-kljptn.svelte-kljptn{flex:1;min-width:0}.filters.svelte-kljptn select.svelte-kljptn.svelte-kljptn{max-width:150px}.parameter.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:flex;gap:7px;border-bottom:1px solid var(--line);padding:5px 0}.field.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:flex;align-items:center;justify-content:space-between;gap:10px;flex:1;text-align:left;background:none;border:0;padding-left:0;min-width:0}.field.svelte-kljptn span.svelte-kljptn.svelte-kljptn{overflow-wrap:anywhere;font-size:12px}.field.svelte-kljptn small.svelte-kljptn.svelte-kljptn{display:block;font-size:9px}.field.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{white-space:nowrap;font-size:12px;font-weight:500}.parameter.svelte-kljptn>button.svelte-kljptn.svelte-kljptn:last-child{background:none;border:0;padding:4px}.pinned.svelte-kljptn.svelte-kljptn.svelte-kljptn{color:var(--mint)}.detail.svelte-kljptn.svelte-kljptn.svelte-kljptn{background:var(--panel);padding:12px;border-radius:6px;font-size:11px;margin:10px 0}.detail.svelte-kljptn p.svelte-kljptn.svelte-kljptn{margin-top:6px;color:var(--muted)}.close.svelte-kljptn.svelte-kljptn.svelte-kljptn{float:right}.coverage.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--line)}.coverage.svelte-kljptn>span.svelte-kljptn.svelte-kljptn{color:#7a8b9a;font-size:16px}.coverage.svelte-kljptn>span.available.svelte-kljptn.svelte-kljptn{color:var(--mint)}.coverage.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{font-size:12px;font-weight:500;display:block}.coverage.svelte-kljptn small.svelte-kljptn.svelte-kljptn{display:block}.comparison.svelte-kljptn.svelte-kljptn.svelte-kljptn{background:var(--panel);padding:12px;border-radius:7px;margin:10px 0}.comparison.svelte-kljptn>div.svelte-kljptn.svelte-kljptn{display:flex;gap:16px;flex-wrap:wrap;margin:8px 0}.comparison.svelte-kljptn span.svelte-kljptn.svelte-kljptn{font-size:16px}.comparison.svelte-kljptn span.svelte-kljptn small.svelte-kljptn{display:block}.profile.svelte-kljptn.svelte-kljptn.svelte-kljptn{background:var(--panel);border-radius:8px;padding:10px;margin-bottom:10px}.profile.svelte-kljptn svg.svelte-kljptn.svelte-kljptn{width:100%;height:auto}.profile.svelte-kljptn text.svelte-kljptn.svelte-kljptn{fill:#92aabc;font-size:9px}.profile.svelte-kljptn p.svelte-kljptn.svelte-kljptn{text-align:center;font-size:10px;color:var(--muted)}.amber.svelte-kljptn.svelte-kljptn.svelte-kljptn{color:#f4ba77}.mint.svelte-kljptn.svelte-kljptn.svelte-kljptn{color:var(--mint)}details.svelte-kljptn.svelte-kljptn.svelte-kljptn{margin-top:14px}summary.svelte-kljptn.svelte-kljptn.svelte-kljptn{cursor:pointer;color:var(--muted)}pre.svelte-kljptn.svelte-kljptn.svelte-kljptn{max-height:300px;overflow:auto;font-size:10px;background:#101f2c;padding:10px}@media(max-width:440px){.weatherscope.svelte-kljptn.svelte-kljptn.svelte-kljptn{padding:14px}h1.svelte-kljptn.svelte-kljptn.svelte-kljptn{font-size:22px}h1.svelte-kljptn span.svelte-kljptn.svelte-kljptn{display:none}.card.svelte-kljptn.svelte-kljptn.svelte-kljptn{padding:8px}.card.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{font-size:17px}nav.svelte-kljptn.svelte-kljptn.svelte-kljptn{gap:0}nav.svelte-kljptn button.svelte-kljptn.svelte-kljptn{padding:8px 7px;font-size:11px}.timebar.svelte-kljptn.svelte-kljptn.svelte-kljptn{align-items:flex-start;flex-direction:column}.provenance.svelte-kljptn>span.svelte-kljptn.svelte-kljptn:last-child{margin-left:0}.source.svelte-kljptn select.svelte-kljptn.svelte-kljptn{max-width:165px}}.weatherscope.svelte-kljptn.svelte-kljptn.svelte-kljptn{--bg:#0b1720;--panel:#122631;--line:#25404b;--muted:#aec1ca;--mint:#78e4ca;padding:24px;font-size:14px;background:radial-gradient(ellipse at 100% 0,#16373988,transparent 40%),var(--bg)}header.svelte-kljptn.svelte-kljptn.svelte-kljptn{padding-bottom:20px;margin-bottom:16px}.mark.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:grid;place-items:center;width:46px;height:46px;border:1px solid #427b73;border-radius:15px;background:#1d494433;font-size:31px}h1.svelte-kljptn.svelte-kljptn.svelte-kljptn{font-size:27px;font-weight:750;letter-spacing:-1.2px}h1.svelte-kljptn span.svelte-kljptn.svelte-kljptn{display:block;font-size:9px;letter-spacing:2.4px;margin:3px 0 0}.brand.svelte-kljptn p.svelte-kljptn.svelte-kljptn{display:none}h2.svelte-kljptn.svelte-kljptn.svelte-kljptn{font-size:16px}.location.svelte-kljptn.svelte-kljptn.svelte-kljptn{margin:18px 0}.location.svelte-kljptn h2.svelte-kljptn.svelte-kljptn{font-size:24px;letter-spacing:-.5px}.location.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{font-size:13px;color:var(--muted)}small.svelte-kljptn.svelte-kljptn.svelte-kljptn{font-size:11px}.location.svelte-kljptn small.svelte-kljptn.svelte-kljptn,.timebar.svelte-kljptn small.svelte-kljptn.svelte-kljptn{font-size:10px;letter-spacing:1.2px}button.svelte-kljptn.svelte-kljptn.svelte-kljptn,select.svelte-kljptn.svelte-kljptn.svelte-kljptn,input.svelte-kljptn.svelte-kljptn.svelte-kljptn{border-radius:10px;min-height:40px}button.svelte-kljptn.svelte-kljptn.svelte-kljptn{transition:background .15s,border-color .15s}button.svelte-kljptn.svelte-kljptn.svelte-kljptn:hover{background:#23424c}.saved.svelte-kljptn.svelte-kljptn.svelte-kljptn{color:var(--mint);border-color:#4c9786;background:#173e36}.source.svelte-kljptn.svelte-kljptn.svelte-kljptn{margin:0 0 18px}.source.svelte-kljptn label.svelte-kljptn.svelte-kljptn{font-size:12px}.source.svelte-kljptn select.svelte-kljptn.svelte-kljptn{font-size:13px;padding:9px}.icon.svelte-kljptn.svelte-kljptn.svelte-kljptn{min-width:44px}nav.svelte-kljptn.svelte-kljptn.svelte-kljptn{position:sticky;top:0;z-index:5;padding:7px;background:#0d1d26f5;border:1px solid var(--line);border-radius:14px;gap:3px;margin:0 0 20px;backdrop-filter:blur(12px)}nav.svelte-kljptn button.svelte-kljptn.svelte-kljptn{flex:1;min-width:0;font-size:12px;padding:9px 4px;border-radius:9px;border:0;font-weight:600}nav.svelte-kljptn button.active.svelte-kljptn.svelte-kljptn{background:var(--mint);color:#092720;box-shadow:0 3px 14px #78e4ca18}.timebar.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{font-size:20px;font-weight:650}.shortcuts.svelte-kljptn.svelte-kljptn.svelte-kljptn{gap:4px}.shortcuts.svelte-kljptn button.svelte-kljptn.svelte-kljptn{font-size:11px;padding:5px 8px;min-height:36px}.time-slider.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:flex;flex-wrap:wrap;justify-content:space-between;font-size:11px;margin:14px 0 8px}.time-slider.svelte-kljptn input.svelte-kljptn.svelte-kljptn{flex-basis:100%;height:30px;min-height:30px;cursor:pointer}.time-slider.svelte-kljptn span.svelte-kljptn.svelte-kljptn:last-of-type{opacity:.75}.provenance.svelte-kljptn.svelte-kljptn.svelte-kljptn{font-size:10px;padding-bottom:8px}.dot.svelte-kljptn.svelte-kljptn.svelte-kljptn{width:6px;height:6px}.forecast-hero.svelte-kljptn.svelte-kljptn.svelte-kljptn{position:relative;overflow:hidden;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;background:linear-gradient(125deg,#18443f,#14313b 60%,#192e44);border:1px solid #37665e;border-radius:20px;padding:24px;margin:10px 0 12px;box-shadow:0 14px 30px #0002}.forecast-hero.svelte-kljptn small.svelte-kljptn.svelte-kljptn{font-size:10px;letter-spacing:1.2px;color:#b0d5cb}.hero-temperature.svelte-kljptn.svelte-kljptn.svelte-kljptn{font-size:clamp(38px,8vw,58px);font-weight:650;line-height:1.2;letter-spacing:-2.5px;margin:8px 0}.forecast-hero.svelte-kljptn p.svelte-kljptn.svelte-kljptn{font-size:12px;color:#bcd1d5}.forecast-hero.svelte-kljptn b.svelte-kljptn.svelte-kljptn{font-weight:550;color:#e5f3ef}.weather-orbit.svelte-kljptn.svelte-kljptn.svelte-kljptn{width:110px;height:110px;fill:none;stroke:#79caba30;stroke-width:1}.weather-orbit.svelte-kljptn .orbit-accent.svelte-kljptn.svelte-kljptn{stroke:#8eead1;stroke-width:3}.weather-orbit.svelte-kljptn .orbit-point.svelte-kljptn.svelte-kljptn{fill:#acecde;stroke:#173b38;stroke-width:3}.hero-facts.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:grid;grid-template-columns:repeat(3,1fr);width:100%;gap:12px;border-top:1px solid #83b7aa30;margin-top:20px;padding-top:16px}.hero-facts.svelte-kljptn small.svelte-kljptn.svelte-kljptn,.hero-facts.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{display:block}.hero-facts.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{font-size:16px;margin-top:5px;font-weight:600}.outlook.svelte-kljptn.svelte-kljptn.svelte-kljptn{gap:8px;margin:12px 0 18px}.outlook.svelte-kljptn>div.svelte-kljptn.svelte-kljptn{padding:12px;background:#11242d;border-radius:12px}.outlook.svelte-kljptn small.svelte-kljptn.svelte-kljptn{font-size:10px;line-height:1.5}.outlook.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{font-size:15px;margin:8px 0}.briefing.svelte-kljptn.svelte-kljptn.svelte-kljptn{border:1px solid #2c534d;border-left:3px solid var(--mint);border-radius:12px;padding:10px 14px;margin:0 0 18px;background:#12302b66}.briefing.svelte-kljptn button.svelte-kljptn.svelte-kljptn{font-size:13px;padding:8px 0}.briefing.svelte-kljptn small.svelte-kljptn.svelte-kljptn{font-size:10px;margin-bottom:3px}.cards.svelte-kljptn.svelte-kljptn.svelte-kljptn{gap:10px}.card.svelte-kljptn.svelte-kljptn.svelte-kljptn{padding:15px;border-radius:13px;background:linear-gradient(135deg,#18313c,#12232e)}.card.svelte-kljptn small.svelte-kljptn.svelte-kljptn{font-size:12px}.card.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{font-size:23px;margin:10px 0 6px;letter-spacing:-.6px}.card.svelte-kljptn span.svelte-kljptn.svelte-kljptn{font-size:10px}.section-title.svelte-kljptn.svelte-kljptn.svelte-kljptn{margin:24px 0 12px}.section-title.svelte-kljptn small.svelte-kljptn.svelte-kljptn{font-size:11px}.trend.svelte-kljptn.svelte-kljptn.svelte-kljptn{background:#10232d;border:1px solid var(--line);border-radius:14px;padding:14px}.trend.svelte-kljptn svg.svelte-kljptn.svelte-kljptn{width:100%;display:block;color:#29434e}.trend.svelte-kljptn svg.svelte-kljptn text.svelte-kljptn{fill:#a6bec8;font-size:10px}.trend.svelte-kljptn>small.svelte-kljptn.svelte-kljptn{font-size:10px;display:block;margin-top:8px;color:var(--muted)}.trend-legend.svelte-kljptn.svelte-kljptn.svelte-kljptn{display:flex;justify-content:space-between;gap:8px;font-size:10px;color:var(--muted)}.trend-legend.svelte-kljptn b.svelte-kljptn.svelte-kljptn{display:block;font-size:12px;color:#dfedf0;font-weight:500;margin:5px 0}.trend-legend.svelte-kljptn i.svelte-kljptn.svelte-kljptn{display:inline-block;width:7px;height:7px;background:var(--mint);border-radius:50%;margin-right:5px}.trend-legend.svelte-kljptn span:last-child i.svelte-kljptn.svelte-kljptn{background:#78baff}.timeline.svelte-kljptn.svelte-kljptn.svelte-kljptn,.scroll-table.svelte-kljptn.svelte-kljptn.svelte-kljptn{border-radius:12px}th.svelte-kljptn.svelte-kljptn.svelte-kljptn,td.svelte-kljptn.svelte-kljptn.svelte-kljptn{padding:10px;font-size:11px}.timeline.svelte-kljptn th button.svelte-kljptn.svelte-kljptn{font-size:11px;min-width:52px;min-height:44px}.timeline.svelte-kljptn th button.chosen.svelte-kljptn.svelte-kljptn{background:#28504a;border-radius:8px}.timeline.svelte-kljptn th.svelte-kljptn.svelte-kljptn:first-child{min-width:98px}.diagnostics.svelte-kljptn.svelte-kljptn.svelte-kljptn{gap:10px}.diagnostics.svelte-kljptn button.svelte-kljptn.svelte-kljptn{padding:15px;border-radius:13px;background:var(--panel)}.diagnostics.svelte-kljptn small.svelte-kljptn.svelte-kljptn{font-size:11px}.diagnostics.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{font-size:20px;margin:7px 0;color:#dfefea}.profile.svelte-kljptn.svelte-kljptn.svelte-kljptn{padding:16px;border:1px solid var(--line);border-radius:14px}.profile.svelte-kljptn p.svelte-kljptn.svelte-kljptn,.footnote.svelte-kljptn.svelte-kljptn.svelte-kljptn{font-size:11px}.comparison.svelte-kljptn.svelte-kljptn.svelte-kljptn{padding:18px;border:1px solid var(--line);border-radius:14px}.comparison.svelte-kljptn>div.svelte-kljptn.svelte-kljptn{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:14px 0}.comparison.svelte-kljptn span.svelte-kljptn.svelte-kljptn{font-size:19px;letter-spacing:-.5px}.comparison.svelte-kljptn span.svelte-kljptn small.svelte-kljptn{font-size:10px;letter-spacing:0;margin-bottom:5px}.filters.svelte-kljptn.svelte-kljptn.svelte-kljptn{flex-wrap:wrap}.filters.svelte-kljptn input.svelte-kljptn.svelte-kljptn{min-height:46px;font-size:13px}.field.svelte-kljptn.svelte-kljptn.svelte-kljptn{padding:10px 0;min-height:56px}.field.svelte-kljptn span.svelte-kljptn.svelte-kljptn,.field.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{font-size:13px}.field.svelte-kljptn small.svelte-kljptn.svelte-kljptn{font-size:10px;margin-top:4px}.parameter.svelte-kljptn>button.svelte-kljptn.svelte-kljptn:last-child{min-width:42px;font-size:22px}.coverage.svelte-kljptn.svelte-kljptn.svelte-kljptn{padding:15px 0}.coverage.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{font-size:14px}.coverage.svelte-kljptn small.svelte-kljptn.svelte-kljptn{font-size:11px;margin-top:4px}.notice.svelte-kljptn.svelte-kljptn.svelte-kljptn{font-size:10px;border-radius:9px;padding:10px 12px}.detail.svelte-kljptn.svelte-kljptn.svelte-kljptn{border:1px solid #498b7d;border-radius:12px;padding:16px}.favorites.svelte-kljptn button.svelte-kljptn.svelte-kljptn{font-size:12px}.settings.svelte-kljptn.svelte-kljptn.svelte-kljptn{border:1px solid var(--line);padding:16px;gap:14px}.settings.svelte-kljptn label.svelte-kljptn.svelte-kljptn{font-size:13px}footer.svelte-kljptn.svelte-kljptn.svelte-kljptn{font-size:9px;letter-spacing:.6px;gap:12px}.empty.svelte-kljptn.svelte-kljptn.svelte-kljptn{min-height:230px}@media(max-width:440px){.weatherscope.svelte-kljptn.svelte-kljptn.svelte-kljptn{padding:16px}h1.svelte-kljptn.svelte-kljptn.svelte-kljptn{font-size:24px}h1.svelte-kljptn span.svelte-kljptn.svelte-kljptn{display:block;font-size:8px}.brand.svelte-kljptn.svelte-kljptn.svelte-kljptn{gap:10px}.mark.svelte-kljptn.svelte-kljptn.svelte-kljptn{width:39px;height:39px;font-size:27px}.timebar.svelte-kljptn.svelte-kljptn.svelte-kljptn{flex-direction:row;align-items:center;flex-wrap:wrap}.timebar.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{font-size:17px}.shortcuts.svelte-kljptn button.svelte-kljptn.svelte-kljptn{padding:5px 7px}nav.svelte-kljptn.svelte-kljptn.svelte-kljptn{gap:0;padding:5px}nav.svelte-kljptn button.svelte-kljptn.svelte-kljptn{font-size:11px;padding:8px 3px}.forecast-hero.svelte-kljptn.svelte-kljptn.svelte-kljptn{padding:19px}.weather-orbit.svelte-kljptn.svelte-kljptn.svelte-kljptn{width:86px;height:86px}.hero-temperature.svelte-kljptn.svelte-kljptn.svelte-kljptn{font-size:44px}.hero-facts.svelte-kljptn.svelte-kljptn.svelte-kljptn{gap:7px}.hero-facts.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{font-size:14px}.hero-facts.svelte-kljptn small.svelte-kljptn.svelte-kljptn{font-size:9px}.cards.svelte-kljptn.svelte-kljptn.svelte-kljptn{grid-template-columns:repeat(2,minmax(0,1fr))}.card.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{font-size:23px}.outlook.svelte-kljptn.svelte-kljptn.svelte-kljptn{grid-template-columns:1fr 1fr}.outlook.svelte-kljptn>div.svelte-kljptn.svelte-kljptn:last-child{grid-column:1/-1;display:grid;grid-template-columns:1fr auto;align-items:center;gap:0 8px}.outlook.svelte-kljptn>div.svelte-kljptn:last-child small.svelte-kljptn:last-child{grid-column:1/-1}.outlook.svelte-kljptn strong.svelte-kljptn.svelte-kljptn{font-size:14px}.comparison.svelte-kljptn>div.svelte-kljptn.svelte-kljptn{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.source.svelte-kljptn select.svelte-kljptn.svelte-kljptn{max-width:160px}.location.svelte-kljptn h2.svelte-kljptn.svelte-kljptn{font-size:22px}.location.svelte-kljptn button.svelte-kljptn.svelte-kljptn{font-size:12px}}@media(prefers-reduced-motion:reduce){button.svelte-kljptn.svelte-kljptn.svelte-kljptn{transition:none}.pulse.svelte-kljptn.svelte-kljptn.svelte-kljptn{animation:none}}header.svelte-kljptn.svelte-kljptn.svelte-kljptn{padding-bottom:14px;margin-bottom:10px}.location.svelte-kljptn.svelte-kljptn.svelte-kljptn{margin:12px 0}.source.svelte-kljptn.svelte-kljptn.svelte-kljptn{margin-bottom:12px}.forecast-hero.svelte-kljptn.svelte-kljptn.svelte-kljptn{margin:12px 0 18px}.notice.svelte-kljptn.svelte-kljptn.svelte-kljptn{padding:7px 10px}.weatherscope.svelte-kljptn.svelte-kljptn.svelte-kljptn{padding-top:18px}.hero-temperature.svelte-kljptn.svelte-kljptn.svelte-kljptn{margin:5px 0}.hero-facts.svelte-kljptn.svelte-kljptn.svelte-kljptn{margin-top:14px;padding-top:12px}nav.svelte-kljptn.svelte-kljptn.svelte-kljptn{overflow-x:auto}nav.svelte-kljptn button.svelte-kljptn.svelte-kljptn{flex:1 0 auto;min-width:49px}@media(max-width:440px){nav.svelte-kljptn button.svelte-kljptn.svelte-kljptn{font-size:10px;padding:8px 5px}}h1.svelte-kljptn.svelte-kljptn.svelte-kljptn,h2.svelte-kljptn.svelte-kljptn.svelte-kljptn{color:#edf4f8}");
}

function get_each_context_19(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[141] = list[i];
	return child_ctx;
}

function get_each_context_17(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[106] = list[i];
	return child_ctx;
}

function get_each_context_18(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[138] = list[i];
	return child_ctx;
}

function get_each_context_14(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[127] = list[i];
	return child_ctx;
}

function get_each_context_15(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[90] = list[i];
	const constants_0 = compare([/*data*/ child_ctx[7], .../*comparisons*/ child_ctx[27]], /*key*/ child_ctx[90], /*valid*/ child_ctx[15]);
	child_ctx[130] = constants_0;
	return child_ctx;
}

function get_each_context_16(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[133] = list[i];
	return child_ctx;
}

function get_each_context_7(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[112] = list[i];
	return child_ctx;
}

function get_each_context_8(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[99] = list[i];
	return child_ctx;
}

function get_each_context_9(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[112] = list[i];
	return child_ctx;
}

function get_each_context_10(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[90] = list[i];
	return child_ctx;
}

function get_each_context_11(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[93] = list[i];
	return child_ctx;
}

function get_each_context_12(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[112] = list[i];
	return child_ctx;
}

function get_each_context_13(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[106] = list[i];
	return child_ctx;
}

function get_each_context$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[90] = list[i];
	return child_ctx;
}

function get_each_context_1$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[93] = list[i];
	return child_ctx;
}

function get_each_context_2$2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[93] = list[i];
	return child_ctx;
}

function get_each_context_3(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[93] = list[i];
	child_ctx[102] = i;
	const constants_0 = value(/*data*/ child_ctx[7], 'temperature', /*t*/ child_ctx[93]);
	child_ctx[98] = constants_0;
	const constants_1 = value(/*data*/ child_ctx[7], 'precipAmount', /*t*/ child_ctx[93]);
	child_ctx[99] = constants_1;
	const constants_2 = 18 + /*i*/ child_ctx[102] / Math.max(1, /*slots*/ child_ctx[17].length - 1) * 524;
	child_ctx[100] = constants_2;
	return child_ctx;
}

function get_each_context_4(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[103] = list[i];
	return child_ctx;
}

function get_each_context_5(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[106] = list[i];
	return child_ctx;
}

function get_each_context_6(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[109] = list[i];
	return child_ctx;
}

function get_each_context_20(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[144] = list[i];
	return child_ctx;
}

function get_each_context_21(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[147] = list[i];
	return child_ctx;
}

function get_each_context_22(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[90] = list[i][0];
	child_ctx[150] = list[i][1];
	return child_ctx;
}

function get_each_context_23(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[153] = list[i];
	return child_ctx;
}

// (57:1) {#if demo}
function create_if_block_27(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = "DESIGN PREVIEW · Synthetic sample data, not a weather forecast";
			attr(div, "class", "notice svelte-kljptn");
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

// (58:62) {#if placeName}
function create_if_block_26(ctx) {
	let h2;
	let t_1;

	return {
		c() {
			h2 = element("h2");
			t_1 = text(/*placeName*/ ctx[4]);
			attr(h2, "class", "svelte-kljptn");
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

// (59:1) {#if favorites.length}
function create_if_block_25(ctx) {
	let div;
	let each_value_23 = ensure_array_like(/*favorites*/ ctx[13]);
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

			attr(div, "class", "favorites svelte-kljptn");
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
			if (dirty[0] & /*onLocation, favorites*/ 8194) {
				each_value_23 = ensure_array_like(/*favorites*/ ctx[13]);
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

// (59:46) {#each favorites as place}
function create_each_block_23(ctx) {
	let button;
	let t_1_value = (/*place*/ ctx[153].name || `${/*place*/ ctx[153].lat.toFixed(2)}, ${/*place*/ ctx[153].lon.toFixed(2)}`) + "";
	let t_1;
	let mounted;
	let dispose;

	function click_handler_1() {
		return /*click_handler_1*/ ctx[65](/*place*/ ctx[153]);
	}

	return {
		c() {
			button = element("button");
			t_1 = text(t_1_value);
			attr(button, "class", "svelte-kljptn");
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
			if (dirty[0] & /*favorites*/ 8192 && t_1_value !== (t_1_value = (/*place*/ ctx[153].name || `${/*place*/ ctx[153].lat.toFixed(2)}, ${/*place*/ ctx[153].lon.toFixed(2)}`) + "")) set_data(t_1, t_1_value);
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

// (60:1) {#if view!=='Winter'}
function create_if_block_24(ctx) {
	let div;
	let label_1;
	let t0;
	let select;
	let button;
	let t1;
	let button_disabled_value;
	let mounted;
	let dispose;
	let each_value_22 = ensure_array_like(Object.entries(MODELS));
	let each_blocks = [];

	for (let i = 0; i < each_value_22.length; i += 1) {
		each_blocks[i] = create_each_block_22(get_each_context_22(ctx, each_value_22, i));
	}

	return {
		c() {
			div = element("div");
			label_1 = element("label");
			t0 = text("Baseline ");
			select = element("select");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			button = element("button");
			t1 = text("↻ Refresh");
			attr(select, "aria-label", "Baseline model");
			attr(select, "class", "svelte-kljptn");
			if (/*model*/ ctx[6] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[66].call(select));
			attr(label_1, "class", "svelte-kljptn");
			button.disabled = button_disabled_value = /*busy*/ ctx[22] || !/*location*/ ctx[0];
			attr(button, "class", "svelte-kljptn");
			attr(div, "class", "source svelte-kljptn");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, label_1);
			append(label_1, t0);
			append(label_1, select);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(select, null);
				}
			}

			select_option(select, /*model*/ ctx[6], true);
			append(div, button);
			append(button, t1);

			if (!mounted) {
				dispose = [
					listen(select, "change", /*select_change_handler*/ ctx[66]),
					listen(select, "change", /*save*/ ctx[44]),
					listen(button, "click", /*click_handler_2*/ ctx[67])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*Object*/ 0) {
				each_value_22 = ensure_array_like(Object.entries(MODELS));
				let i;

				for (i = 0; i < each_value_22.length; i += 1) {
					const child_ctx = get_each_context_22(ctx, each_value_22, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_22(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(select, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value_22.length;
			}

			if (dirty[0] & /*model*/ 64) {
				select_option(select, /*model*/ ctx[6]);
			}

			if (dirty[0] & /*busy, location*/ 4194305 && button_disabled_value !== (button_disabled_value = /*busy*/ ctx[22] || !/*location*/ ctx[0])) {
				button.disabled = button_disabled_value;
			}
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}

			destroy_each(each_blocks, detaching);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (60:130) {#each Object.entries(MODELS) as [key,label]}
function create_each_block_22(ctx) {
	let option;
	let t0_value = /*label*/ ctx[150] + "";
	let t0;
	let t1_value = (/*key*/ ctx[90] === 'mblue' ? ' · default' : '') + "";
	let t1;

	return {
		c() {
			option = element("option");
			t0 = text(t0_value);
			t1 = text(t1_value);
			option.__value = /*key*/ ctx[90];
			set_input_value(option, option.__value);
			attr(option, "class", "svelte-kljptn");
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

// (61:1) {#if data&&!busy&&view==='Brief'}
function create_if_block_23$1(ctx) {
	let div6;
	let div1;
	let small0;
	let t0_value = timeLabel(/*valid*/ ctx[15], /*prefs*/ ctx[11].local) + "";
	let t0;
	let t1;
	let t2_value = (/*prefs*/ ctx[11].local ? 'LOCAL' : 'UTC') + "";
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
			div0.textContent = `${/*show*/ ctx[54]('temperature')}`;
			p_1 = element("p");
			t4 = text("Dew point ");
			b = element("b");
			b.textContent = `${/*show*/ ctx[54]('dewPoint')}`;
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
			strong0.textContent = `${/*show*/ ctx[54]('wind')}`;
			div3 = element("div");
			small2 = element("small");
			small2.textContent = "GUSTS";
			strong1 = element("strong");
			strong1.textContent = `${/*show*/ ctx[54]('windGust')}`;
			div4 = element("div");
			small3 = element("small");
			small3.textContent = "PRECIPITATION";
			strong2 = element("strong");
			strong2.textContent = `${/*show*/ ctx[54]('precipAmount')}`;
			attr(small0, "class", "svelte-kljptn");
			attr(div0, "class", "hero-temperature svelte-kljptn");
			attr(b, "class", "svelte-kljptn");
			attr(p_1, "class", "svelte-kljptn");
			attr(div1, "class", "svelte-kljptn");
			attr(circle0, "cx", "60");
			attr(circle0, "cy", "60");
			attr(circle0, "r", "49");
			attr(circle0, "class", "svelte-kljptn");
			attr(circle1, "cx", "60");
			attr(circle1, "cy", "60");
			attr(circle1, "r", "34");
			attr(circle1, "class", "svelte-kljptn");
			attr(path0, "d", "M11 60H109M60 11V109");
			attr(path0, "class", "svelte-kljptn");
			attr(path1, "class", "orbit-accent svelte-kljptn");
			attr(path1, "d", "M16 76C32 76 34 37 54 37S78 89 104 47");
			attr(circle2, "class", "orbit-point svelte-kljptn");
			attr(circle2, "cx", "54");
			attr(circle2, "cy", "37");
			attr(circle2, "r", "5");
			attr(svg, "class", "weather-orbit svelte-kljptn");
			attr(svg, "viewBox", "0 0 120 120");
			attr(svg, "aria-hidden", "true");
			attr(small1, "class", "svelte-kljptn");
			attr(strong0, "class", "svelte-kljptn");
			attr(div2, "class", "svelte-kljptn");
			attr(small2, "class", "svelte-kljptn");
			attr(strong1, "class", "svelte-kljptn");
			attr(div3, "class", "svelte-kljptn");
			attr(small3, "class", "svelte-kljptn");
			attr(strong2, "class", "svelte-kljptn");
			attr(div4, "class", "svelte-kljptn");
			attr(div5, "class", "hero-facts svelte-kljptn");
			attr(div6, "class", "forecast-hero svelte-kljptn");
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
			if (dirty[0] & /*valid, prefs*/ 34816 && t0_value !== (t0_value = timeLabel(/*valid*/ ctx[15], /*prefs*/ ctx[11].local) + "")) set_data(t0, t0_value);
			if (dirty[0] & /*prefs*/ 2048 && t2_value !== (t2_value = (/*prefs*/ ctx[11].local ? 'LOCAL' : 'UTC') + "")) set_data(t2, t2_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div6);
			}
		}
	};
}

// (67:1) {#if settings}
function create_if_block_22$1(ctx) {
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
			attr(h2, "class", "svelte-kljptn");
			option0.__value = "metric";
			set_input_value(option0, option0.__value);
			attr(option0, "class", "svelte-kljptn");
			option1.__value = "imperial";
			set_input_value(option1, option1.__value);
			attr(option1, "class", "svelte-kljptn");
			attr(select0, "class", "svelte-kljptn");
			if (/*prefs*/ ctx[11].winterUnits === void 0) add_render_callback(() => /*select0_change_handler*/ ctx[68].call(select0));
			attr(label0, "class", "svelte-kljptn");
			option2.__value = "C";
			set_input_value(option2, option2.__value);
			attr(option2, "class", "svelte-kljptn");
			option3.__value = "F";
			set_input_value(option3, option3.__value);
			attr(option3, "class", "svelte-kljptn");
			attr(select1, "class", "svelte-kljptn");
			if (/*prefs*/ ctx[11].temp === void 0) add_render_callback(() => /*select1_change_handler*/ ctx[69].call(select1));
			attr(label1, "class", "svelte-kljptn");
			option4.__value = "kt";
			set_input_value(option4, option4.__value);
			attr(option4, "class", "svelte-kljptn");
			option5.__value = "ms";
			set_input_value(option5, option5.__value);
			attr(option5, "class", "svelte-kljptn");
			attr(select2, "class", "svelte-kljptn");
			if (/*prefs*/ ctx[11].wind === void 0) add_render_callback(() => /*select2_change_handler*/ ctx[70].call(select2));
			attr(label2, "class", "svelte-kljptn");
			attr(input0, "type", "checkbox");
			attr(input0, "class", "svelte-kljptn");
			attr(label3, "class", "svelte-kljptn");
			attr(input1, "type", "number");
			attr(input1, "min", "1");
			attr(input1, "max", "100");
			attr(input1, "class", "svelte-kljptn");
			attr(label4, "class", "svelte-kljptn");
			attr(input2, "type", "number");
			attr(input2, "min", "0.1");
			attr(input2, "max", "100");
			attr(input2, "step", "0.1");
			attr(input2, "class", "svelte-kljptn");
			attr(label5, "class", "svelte-kljptn");
			attr(div, "class", "settings svelte-kljptn");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, h2);
			append(div, label0);
			append(label0, t1);
			append(label0, select0);
			append(select0, option0);
			append(select0, option1);
			select_option(select0, /*prefs*/ ctx[11].winterUnits, true);
			append(div, label1);
			append(label1, t4);
			append(label1, select1);
			append(select1, option2);
			append(select1, option3);
			select_option(select1, /*prefs*/ ctx[11].temp, true);
			append(div, label2);
			append(label2, t7);
			append(label2, select2);
			append(select2, option4);
			append(select2, option5);
			select_option(select2, /*prefs*/ ctx[11].wind, true);
			append(div, label3);
			append(label3, input0);
			input0.checked = /*prefs*/ ctx[11].local;
			append(label3, t10);
			append(div, label4);
			append(label4, t11);
			append(label4, input1);
			set_input_value(input1, /*thresholds*/ ctx[14].gust);
			append(div, label5);
			append(label5, t12);
			append(label5, input2);
			set_input_value(input2, /*thresholds*/ ctx[14].rain);

			if (!mounted) {
				dispose = [
					listen(select0, "change", /*select0_change_handler*/ ctx[68]),
					listen(select0, "change", /*save*/ ctx[44]),
					listen(select1, "change", /*select1_change_handler*/ ctx[69]),
					listen(select1, "change", /*save*/ ctx[44]),
					listen(select2, "change", /*select2_change_handler*/ ctx[70]),
					listen(select2, "change", /*save*/ ctx[44]),
					listen(input0, "change", /*input0_change_handler*/ ctx[71]),
					listen(input0, "change", /*save*/ ctx[44]),
					listen(input1, "input", /*input1_input_handler*/ ctx[72]),
					listen(input1, "change", /*save*/ ctx[44]),
					listen(input2, "input", /*input2_input_handler*/ ctx[73]),
					listen(input2, "change", /*save*/ ctx[44])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*prefs*/ 2048) {
				select_option(select0, /*prefs*/ ctx[11].winterUnits);
			}

			if (dirty[0] & /*prefs*/ 2048) {
				select_option(select1, /*prefs*/ ctx[11].temp);
			}

			if (dirty[0] & /*prefs*/ 2048) {
				select_option(select2, /*prefs*/ ctx[11].wind);
			}

			if (dirty[0] & /*prefs*/ 2048) {
				input0.checked = /*prefs*/ ctx[11].local;
			}

			if (dirty[0] & /*thresholds*/ 16384 && to_number(input1.value) !== /*thresholds*/ ctx[14].gust) {
				set_input_value(input1, /*thresholds*/ ctx[14].gust);
			}

			if (dirty[0] & /*thresholds*/ 16384 && to_number(input2.value) !== /*thresholds*/ ctx[14].rain) {
				set_input_value(input2, /*thresholds*/ ctx[14].rain);
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

// (68:35) {#each ['Brief','Winter','Profile','Compare','Parameters','Coverage'] as name}
function create_each_block_21(ctx) {
	let button;
	let t_1;
	let button_aria_pressed_value;
	let mounted;
	let dispose;

	function click_handler_3() {
		return /*click_handler_3*/ ctx[74](/*name*/ ctx[147]);
	}

	return {
		c() {
			button = element("button");
			t_1 = text(/*name*/ ctx[147]);
			attr(button, "aria-pressed", button_aria_pressed_value = /*view*/ ctx[24] === /*name*/ ctx[147]);
			attr(button, "class", "svelte-kljptn");
			toggle_class(button, "active", /*view*/ ctx[24] === /*name*/ ctx[147]);
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

			if (dirty[0] & /*view*/ 16777216 && button_aria_pressed_value !== (button_aria_pressed_value = /*view*/ ctx[24] === /*name*/ ctx[147])) {
				attr(button, "aria-pressed", button_aria_pressed_value);
			}

			if (dirty[0] & /*view*/ 16777216) {
				toggle_class(button, "active", /*view*/ ctx[24] === /*name*/ ctx[147]);
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

// (118:1) {:else}
function create_else_block_3$1(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.innerHTML = `<h2 class="svelte-kljptn">Select a location</h2><p class="svelte-kljptn">Click the map to load a Meteoblue briefing.</p>`;
			attr(div, "class", "empty svelte-kljptn");
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

// (72:16) 
function create_if_block_4$3(ctx) {
	let div2;
	let div0;
	let small;
	let t0;
	let t1_value = (/*prefs*/ ctx[11].local ? 'DEVICE LOCAL' : 'UTC') + "";
	let t1;
	let strong;
	let t2_value = timeLabel(/*valid*/ ctx[15], /*prefs*/ ctx[11].local) + "";
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
	let t10_value = new Set(/*data*/ ctx[7].fields.map(func)).size + "";
	let t10;
	let t11;
	let span3;

	let t12_value = (/*data*/ ctx[7].header.refTime
	? 'Run ' + timeLabel(Date.parse(/*data*/ ctx[7].header.refTime), false) + ' UTC'
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

	let if_block0 = /*index*/ ctx[21] < 0 && create_if_block_21$1();
	let if_block1 = /*mapModel*/ ctx[3] && /*mapModel*/ ctx[3] !== /*data*/ ctx[7].model && create_if_block_20$1(ctx);
	let if_block2 = /*data*/ ctx[7].model !== /*model*/ ctx[6] && create_if_block_19$1(ctx);
	let if_block3 = /*data*/ ctx[7].header.merged && create_if_block_18$1(ctx);

	function select_block_type_2(ctx, dirty) {
		if (/*view*/ ctx[24] === 'Brief') return create_if_block_5$2;
		if (/*view*/ ctx[24] === 'Profile') return create_if_block_11$1;
		if (/*view*/ ctx[24] === 'Compare') return create_if_block_14$1;
		if (/*view*/ ctx[24] === 'Parameters') return create_if_block_15$1;
		if (/*view*/ ctx[24] === 'Coverage') return create_if_block_17$1;
	}

	let current_block_type = select_block_type_2(ctx);
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
			t8 = text(/*served*/ ctx[39]);
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
			t19 = text("WeatherScope 0.4 · ");
			t20 = text(t20_value);
			attr(small, "class", "svelte-kljptn");
			attr(strong, "class", "svelte-kljptn");
			attr(div0, "class", "svelte-kljptn");
			attr(div1, "class", "shortcuts svelte-kljptn");
			attr(div2, "class", "timebar svelte-kljptn");
			attr(span0, "class", "svelte-kljptn");
			attr(span1, "class", "svelte-kljptn");
			attr(input, "aria-label", "Forecast time");
			attr(input, "type", "range");
			attr(input, "min", "0");
			attr(input, "max", input_max_value = /*data*/ ctx[7].ts.length - 1);
			input.value = input_value_value = Math.max(0, /*index*/ ctx[21]);
			attr(input, "class", "svelte-kljptn");
			attr(label_1, "class", "time-slider svelte-kljptn");
			attr(span2, "class", "dot svelte-kljptn");
			attr(span3, "class", "svelte-kljptn");
			attr(div3, "class", "provenance svelte-kljptn");
			attr(span4, "class", "svelte-kljptn");
			attr(span5, "class", "svelte-kljptn");
			attr(footer, "class", "svelte-kljptn");
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
				dispose = listen(input, "input", /*input_handler*/ ctx[77]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*prefs*/ 2048 && t1_value !== (t1_value = (/*prefs*/ ctx[11].local ? 'DEVICE LOCAL' : 'UTC') + "")) set_data(t1, t1_value);
			if (dirty[0] & /*valid, prefs*/ 34816 && t2_value !== (t2_value = timeLabel(/*valid*/ ctx[15], /*prefs*/ ctx[11].local) + "")) set_data(t2, t2_value);

			if (dirty[1] & /*shortcut*/ 262144) {
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

			if (/*index*/ ctx[21] < 0) {
				if (if_block0) ; else {
					if_block0 = create_if_block_21$1();
					if_block0.c();
					if_block0.m(t4.parentNode, t4);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (dirty[0] & /*data*/ 128 && input_max_value !== (input_max_value = /*data*/ ctx[7].ts.length - 1)) {
				attr(input, "max", input_max_value);
			}

			if (dirty[0] & /*index*/ 2097152 && input_value_value !== (input_value_value = Math.max(0, /*index*/ ctx[21]))) {
				input.value = input_value_value;
			}

			if (dirty[1] & /*served*/ 256) set_data(t8, /*served*/ ctx[39]);
			if (dirty[0] & /*data*/ 128 && t10_value !== (t10_value = new Set(/*data*/ ctx[7].fields.map(func)).size + "")) set_data(t10, t10_value);

			if (dirty[0] & /*data*/ 128 && t12_value !== (t12_value = (/*data*/ ctx[7].header.refTime
			? 'Run ' + timeLabel(Date.parse(/*data*/ ctx[7].header.refTime), false) + ' UTC'
			: 'Run time not supplied') + "")) set_data(t12, t12_value);

			if (/*mapModel*/ ctx[3] && /*mapModel*/ ctx[3] !== /*data*/ ctx[7].model) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_20$1(ctx);
					if_block1.c();
					if_block1.m(t14.parentNode, t14);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}

			if (/*data*/ ctx[7].model !== /*model*/ ctx[6]) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_19$1(ctx);
					if_block2.c();
					if_block2.m(t15.parentNode, t15);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (/*data*/ ctx[7].header.merged) {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block_18$1(ctx);
					if_block3.c();
					if_block3.m(t16.parentNode, t16);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (current_block_type === (current_block_type = select_block_type_2(ctx)) && if_block4) {
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
		i: noop,
		o: noop,
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

// (71:17) 
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
			t1 = text(/*error*/ ctx[23]);
			button = element("button");
			button.textContent = "Try again";
			p1 = element("p");
			p1.textContent = "No other model has been substituted.";
			attr(h2, "class", "svelte-kljptn");
			attr(p0, "class", "svelte-kljptn");
			attr(button, "class", "svelte-kljptn");
			attr(p1, "class", "svelte-kljptn");
			attr(div, "class", "empty error svelte-kljptn");
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
				dispose = listen(button, "click", /*click_handler_4*/ ctx[75]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*error*/ 8388608) set_data(t1, /*error*/ ctx[23]);
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

// (70:16) 
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
			attr(span, "class", "pulse svelte-kljptn");
			attr(h2, "class", "svelte-kljptn");
			attr(p_1, "class", "svelte-kljptn");
			attr(div, "class", "empty svelte-kljptn");
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

// (69:1) {#if view==='Winter'}
function create_if_block$3(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_1$3, create_else_block$2];
	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (/*winterComponent*/ ctx[5]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_1(ctx);
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
			current_block_type_index = select_block_type_1(ctx);

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

// (73:165) {#each [0,6,12,24] as h}
function create_each_block_20(ctx) {
	let button;
	let mounted;
	let dispose;

	function click_handler_5() {
		return /*click_handler_5*/ ctx[76](/*h*/ ctx[144]);
	}

	return {
		c() {
			button = element("button");
			button.textContent = `${/*h*/ ctx[144] ? '+' + /*h*/ ctx[144] + 'h' : 'Now'}`;
			attr(button, "class", "svelte-kljptn");
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

// (74:1) {#if index<0}
function create_if_block_21$1(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = "Selected time is outside the returned forecast range. Choose a time below.";
			attr(div, "class", "notice svelte-kljptn");
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

// (77:1) {#if mapModel&&mapModel!==data.model}
function create_if_block_20$1(ctx) {
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
			t1 = text(/*served*/ ctx[39]);
			t2 = text(" · Windy map: ");
			t3 = text(t3_value);
			t4 = text(". These sources are separate.");
			attr(p_1, "class", "footnote svelte-kljptn");
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
			if (dirty[1] & /*served*/ 256) set_data(t1, /*served*/ ctx[39]);
			if (dirty[0] & /*mapModel*/ 8 && t3_value !== (t3_value = (MODELS[/*mapModel*/ ctx[3]] || /*mapModel*/ ctx[3]) + "")) set_data(t3, t3_value);
		},
		d(detaching) {
			if (detaching) {
				detach(p_1);
			}
		}
	};
}

// (78:1) {#if data.model!==model}
function create_if_block_19$1(ctx) {
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
			t3 = text(/*served*/ ctx[39]);
			t4 = text(".");
			attr(div, "class", "notice svelte-kljptn");
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
			if (dirty[1] & /*served*/ 256) set_data(t3, /*served*/ ctx[39]);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

// (79:1) {#if data.header.merged}
function create_if_block_18$1(ctx) {
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
			attr(div, "class", "notice svelte-kljptn");
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

// (112:29) 
function create_if_block_17$1(ctx) {
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
	let each_value_19 = ensure_array_like(/*coverage*/ ctx[34]);
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
			t1 = text(/*served*/ ctx[39]);
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
			attr(h2, "class", "svelte-kljptn");
			attr(small, "class", "svelte-kljptn");
			attr(div, "class", "section-title svelte-kljptn");
			attr(p_1, "class", "footnote svelte-kljptn");
			attr(summary, "class", "svelte-kljptn");
			attr(pre, "class", "svelte-kljptn");
			attr(details, "class", "svelte-kljptn");
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
			if (dirty[1] & /*served*/ 256) set_data(t1, /*served*/ ctx[39]);

			if (dirty[1] & /*coverage*/ 8) {
				each_value_19 = ensure_array_like(/*coverage*/ ctx[34]);
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

// (107:31) 
function create_if_block_15$1(ctx) {
	let div0;
	let input;
	let select;
	let t0;
	let div1;
	let h2;
	let t1_value = /*filtered*/ ctx[42].length + "";
	let t1;
	let t2;
	let button;
	let t4;
	let t5;
	let div2;
	let mounted;
	let dispose;
	let each_value_18 = ensure_array_like(/*groups*/ ctx[43]);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_18.length; i += 1) {
		each_blocks_1[i] = create_each_block_18(get_each_context_18(ctx, each_value_18, i));
	}

	let if_block = /*selectedField*/ ctx[38] && create_if_block_16$1(ctx);
	let each_value_17 = ensure_array_like(/*filtered*/ ctx[42]);
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
			attr(input, "class", "svelte-kljptn");
			attr(select, "aria-label", "Parameter group");
			attr(select, "class", "svelte-kljptn");
			if (/*group*/ ctx[9] === void 0) add_render_callback(() => /*select_change_handler_1*/ ctx[84].call(select));
			attr(div0, "class", "filters svelte-kljptn");
			attr(h2, "class", "svelte-kljptn");
			attr(button, "class", "svelte-kljptn");
			attr(div1, "class", "section-title svelte-kljptn");
			attr(div2, "class", "parameter-list svelte-kljptn");
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
					listen(input, "input", /*input_input_handler*/ ctx[83]),
					listen(select, "change", /*select_change_handler_1*/ ctx[84]),
					listen(button, "click", /*download*/ ctx[53])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*search*/ 256 && input.value !== /*search*/ ctx[8]) {
				set_input_value(input, /*search*/ ctx[8]);
			}

			if (dirty[1] & /*groups*/ 4096) {
				each_value_18 = ensure_array_like(/*groups*/ ctx[43]);
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

			if (dirty[0] & /*group*/ 512 | dirty[1] & /*groups*/ 4096) {
				select_option(select, /*group*/ ctx[9]);
			}

			if (dirty[1] & /*filtered*/ 2048 && t1_value !== (t1_value = /*filtered*/ ctx[42].length + "")) set_data(t1, t1_value);

			if (/*selectedField*/ ctx[38]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_16$1(ctx);
					if_block.c();
					if_block.m(t5.parentNode, t5);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty[0] & /*pins, selected, valid, prefs*/ 39936 | dirty[1] & /*filtered, pin*/ 34816) {
				each_value_17 = ensure_array_like(/*filtered*/ ctx[42]);
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

// (103:28) 
function create_if_block_14$1(ctx) {
	let div;
	let h2;
	let button;

	let t1_value = (/*compareBusy*/ ctx[26]
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

	let each_value_14 = ensure_array_like(/*comparisonErrors*/ ctx[28]);
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
			attr(h2, "class", "svelte-kljptn");
			button.disabled = /*compareBusy*/ ctx[26];
			attr(button, "class", "svelte-kljptn");
			attr(div, "class", "section-title svelte-kljptn");
			attr(p_1, "class", "footnote svelte-kljptn");
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
				dispose = listen(button, "click", /*compareModels*/ ctx[52]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[0] & /*compareBusy*/ 67108864 && t1_value !== (t1_value = (/*compareBusy*/ ctx[26]
			? 'Loading…'
			: 'Load comparisons') + "")) set_data(t1, t1_value);

			if (dirty[0] & /*compareBusy*/ 67108864) {
				button.disabled = /*compareBusy*/ ctx[26];
			}

			if (dirty[0] & /*data, comparisons, valid, prefs*/ 134252672) {
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

			if (dirty[0] & /*comparisonErrors*/ 268435456) {
				each_value_14 = ensure_array_like(/*comparisonErrors*/ ctx[28]);
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

// (98:28) 
function create_if_block_11$1(ctx) {
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
	let each_value_13 = ensure_array_like(/*extra*/ ctx[20].filter(func_1));
	let each_blocks = [];

	for (let i = 0; i < each_value_13.length; i += 1) {
		each_blocks[i] = create_each_block_13(get_each_context_13(ctx, each_value_13, i));
	}

	function select_block_type_4(ctx, dirty) {
		if (/*profile*/ ctx[29].length) return create_if_block_13$1;
		return create_else_block_2$1;
	}

	let current_block_type = select_block_type_4(ctx);
	let if_block0 = current_block_type(ctx);
	let if_block1 = /*hodo*/ ctx[19].length >= 2 && create_if_block_12$1(ctx);

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
			t2 = text(/*served*/ ctx[39]);
			t3 = text(" · selected forecast time");
			t4 = space();
			if_block0.c();
			t5 = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
			attr(div0, "class", "diagnostics svelte-kljptn");
			attr(h2, "class", "svelte-kljptn");
			attr(small, "class", "svelte-kljptn");
			attr(div1, "class", "section-title svelte-kljptn");
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
			if (dirty[0] & /*extra, valid, prefs*/ 1083392 | dirty[1] & /*inspect, served*/ 65792) {
				each_value_13 = ensure_array_like(/*extra*/ ctx[20].filter(func_1));
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

			if (dirty[1] & /*served*/ 256) set_data(t2, /*served*/ ctx[39]);

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

			if (/*hodo*/ ctx[19].length >= 2) {
				if (if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1 = create_if_block_12$1(ctx);
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

// (80:1) {#if view==='Brief'}
function create_if_block_5$2(ctx) {
	let div3;
	let div0;
	let small0;
	let strong0;
	let t1_value = format(/*outlook*/ ctx[37].low, 'K', /*prefs*/ ctx[11]) + "";
	let t1;
	let t2;
	let t3_value = format(/*outlook*/ ctx[37].high, 'K', /*prefs*/ ctx[11]) + "";
	let t3;
	let div1;
	let small1;
	let strong1;
	let t5_value = format(/*outlook*/ ctx[37].rain, 'mm', /*prefs*/ ctx[11]) + "";
	let t5;
	let small2;

	let t6_value = (/*outlook*/ ctx[37].rainComplete
	? 'Complete interval coverage'
	: 'Incomplete interval coverage') + "";

	let t6;
	let div2;
	let small3;
	let strong2;

	let t8_value = (/*confidence*/ ctx[36] === null
	? 'Not supplied'
	: /*confidence*/ ctx[36] + '%') + "";

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
	let t20_value = (/*prefs*/ ctx[11].local ? 'Local' : 'UTC') + "";
	let t20;
	let tbody;
	let t21;
	let p_1;
	let each_value_6 = ensure_array_like(/*lines*/ ctx[40]);
	let each_blocks_3 = [];

	for (let i = 0; i < each_value_6.length; i += 1) {
		each_blocks_3[i] = create_each_block_6(get_each_context_6(ctx, each_value_6, i));
	}

	let each_value_5 = ensure_array_like(/*cards*/ ctx[41]);
	let each_blocks_2 = [];

	for (let i = 0; i < each_value_5.length; i += 1) {
		each_blocks_2[i] = create_each_block_5(get_each_context_5(ctx, each_value_5, i));
	}

	function select_block_type_3(ctx, dirty) {
		if (/*trendValues*/ ctx[18].length) return create_if_block_6$2;
		return create_else_block_1$1;
	}

	let current_block_type = select_block_type_3(ctx);
	let if_block = current_block_type(ctx);
	let each_value_2 = ensure_array_like(/*slots*/ ctx[17]);
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_2.length; i += 1) {
		each_blocks_1[i] = create_each_block_2$2(get_each_context_2$2(ctx, each_value_2, i));
	}

	let each_value = ensure_array_like(['temperature', 'dewPoint', 'wind', 'windGust', 'precipAmount']);
	let each_blocks = [];

	for (let i = 0; i < 5; i += 1) {
		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
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
			div6.innerHTML = `<h2 class="svelte-kljptn">The next 48 hours</h2><small class="svelte-kljptn">Temperature &amp; precipitation</small>`;
			t15 = space();
			if_block.c();
			t16 = space();
			div7 = element("div");
			div7.innerHTML = `<h2 class="svelte-kljptn">Forecast details</h2><small class="svelte-kljptn">Click a column to select its time</small>`;
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
			attr(small0, "class", "svelte-kljptn");
			attr(strong0, "class", "svelte-kljptn");
			attr(div0, "class", "svelte-kljptn");
			attr(small1, "class", "svelte-kljptn");
			attr(strong1, "class", "svelte-kljptn");
			attr(small2, "class", "svelte-kljptn");
			attr(div1, "class", "svelte-kljptn");
			attr(small3, "class", "svelte-kljptn");
			attr(strong2, "class", "svelte-kljptn");
			attr(small4, "class", "svelte-kljptn");
			attr(div2, "class", "svelte-kljptn");
			attr(div3, "class", "outlook svelte-kljptn");
			attr(div4, "class", "briefing svelte-kljptn");
			attr(div5, "class", "cards svelte-kljptn");
			attr(div6, "class", "section-title svelte-kljptn");
			attr(div7, "class", "section-title svelte-kljptn");
			attr(th, "class", "svelte-kljptn");
			attr(tr, "class", "svelte-kljptn");
			attr(thead, "class", "svelte-kljptn");
			attr(tbody, "class", "svelte-kljptn");
			attr(table, "class", "svelte-kljptn");
			attr(div8, "class", "timeline svelte-kljptn");
			attr(div8, "role", "region");
			attr(div8, "aria-label", "48-hour forecast table");
			attr(p_1, "class", "footnote svelte-kljptn");
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
			if (dirty[0] & /*prefs*/ 2048 | dirty[1] & /*outlook*/ 64 && t1_value !== (t1_value = format(/*outlook*/ ctx[37].low, 'K', /*prefs*/ ctx[11]) + "")) set_data(t1, t1_value);
			if (dirty[0] & /*prefs*/ 2048 | dirty[1] & /*outlook*/ 64 && t3_value !== (t3_value = format(/*outlook*/ ctx[37].high, 'K', /*prefs*/ ctx[11]) + "")) set_data(t3, t3_value);
			if (dirty[0] & /*prefs*/ 2048 | dirty[1] & /*outlook*/ 64 && t5_value !== (t5_value = format(/*outlook*/ ctx[37].rain, 'mm', /*prefs*/ ctx[11]) + "")) set_data(t5, t5_value);

			if (dirty[1] & /*outlook*/ 64 && t6_value !== (t6_value = (/*outlook*/ ctx[37].rainComplete
			? 'Complete interval coverage'
			: 'Incomplete interval coverage') + "")) set_data(t6, t6_value);

			if (dirty[1] & /*confidence*/ 32 && t8_value !== (t8_value = (/*confidence*/ ctx[36] === null
			? 'Not supplied'
			: /*confidence*/ ctx[36] + '%') + "")) set_data(t8, t8_value);

			if (dirty[1] & /*inspect, lines*/ 66048) {
				each_value_6 = ensure_array_like(/*lines*/ ctx[40]);
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

			if (dirty[0] & /*valid, prefs*/ 34816 | dirty[1] & /*inspect, cards, served*/ 66816) {
				each_value_5 = ensure_array_like(/*cards*/ ctx[41]);
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

			if (current_block_type === (current_block_type = select_block_type_3(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(t16.parentNode, t16);
				}
			}

			if (dirty[0] & /*prefs*/ 2048 && t20_value !== (t20_value = (/*prefs*/ ctx[11].local ? 'Local' : 'UTC') + "")) set_data(t20, t20_value);

			if (dirty[0] & /*slots, valid, prefs*/ 165888 | dirty[1] & /*chooseTime*/ 131072) {
				each_value_2 = ensure_array_like(/*slots*/ ctx[17]);
				let i;

				for (i = 0; i < each_value_2.length; i += 1) {
					const child_ctx = get_each_context_2$2(ctx, each_value_2, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
					} else {
						each_blocks_1[i] = create_each_block_2$2(child_ctx);
						each_blocks_1[i].c();
						each_blocks_1[i].m(tr, null);
					}
				}

				for (; i < each_blocks_1.length; i += 1) {
					each_blocks_1[i].d(1);
				}

				each_blocks_1.length = each_value_2.length;
			}

			if (dirty[0] & /*slots, data*/ 131200 | dirty[1] & /*show*/ 8388608) {
				each_value = ensure_array_like(['temperature', 'dewPoint', 'wind', 'windGust', 'precipAmount']);
				let i;

				for (i = 0; i < 5; i += 1) {
					const child_ctx = get_each_context$2(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block$2(child_ctx);
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

// (114:1) {#each coverage as row}
function create_each_block_19(ctx) {
	let div1;
	let span;
	let t0_value = (/*row*/ ctx[141].available ? '✓' : '—') + "";
	let t0;
	let div0;
	let strong;
	let t1_value = /*row*/ ctx[141].label + "";
	let t1;
	let small;

	let t2_value = (/*row*/ ctx[141].available
	? 'Returned · ' + /*row*/ ctx[141].note
	: /*row*/ ctx[141].key
		? 'Not supplied at this time · ' + /*row*/ ctx[141].note
		: /*row*/ ctx[141].note) + "";

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
			attr(span, "class", "svelte-kljptn");
			toggle_class(span, "available", /*row*/ ctx[141].available);
			attr(strong, "class", "svelte-kljptn");
			attr(small, "class", "svelte-kljptn");
			attr(div0, "class", "svelte-kljptn");
			attr(div1, "class", "coverage svelte-kljptn");
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
			if (dirty[1] & /*coverage*/ 8 && t0_value !== (t0_value = (/*row*/ ctx[141].available ? '✓' : '—') + "")) set_data(t0, t0_value);

			if (dirty[1] & /*coverage*/ 8) {
				toggle_class(span, "available", /*row*/ ctx[141].available);
			}

			if (dirty[1] & /*coverage*/ 8 && t1_value !== (t1_value = /*row*/ ctx[141].label + "")) set_data(t1, t1_value);

			if (dirty[1] & /*coverage*/ 8 && t2_value !== (t2_value = (/*row*/ ctx[141].available
			? 'Returned · ' + /*row*/ ctx[141].note
			: /*row*/ ctx[141].key
				? 'Not supplied at this time · ' + /*row*/ ctx[141].note
				: /*row*/ ctx[141].note) + "")) set_data(t2, t2_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div1);
			}
		}
	};
}

// (108:205) {#each groups as g}
function create_each_block_18(ctx) {
	let option;
	let t_1_value = /*g*/ ctx[138] + "";
	let t_1;
	let option_value_value;

	return {
		c() {
			option = element("option");
			t_1 = text(t_1_value);
			option.__value = option_value_value = /*g*/ ctx[138];
			set_input_value(option, option.__value);
			attr(option, "class", "svelte-kljptn");
		},
		m(target, anchor) {
			insert(target, option, anchor);
			append(option, t_1);
		},
		p(ctx, dirty) {
			if (dirty[1] & /*groups*/ 4096 && t_1_value !== (t_1_value = /*g*/ ctx[138] + "")) set_data(t_1, t_1_value);

			if (dirty[1] & /*groups*/ 4096 && option_value_value !== (option_value_value = /*g*/ ctx[138])) {
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

// (110:1) {#if selectedField}
function create_if_block_16$1(ctx) {
	let div;
	let button;
	let h2;
	let t1_value = /*selectedField*/ ctx[38].label + "";
	let t1;
	let p0;
	let t2_value = /*selectedField*/ ctx[38].id + "";
	let t2;
	let t3;
	let t4;
	let p1;
	let t5_value = (/*selectedField*/ ctx[38].method || `Provider unit: ${/*selectedField*/ ctx[38].unit}. No invented value is used for missing data.`) + "";
	let t5;
	let p2;
	let t6;

	let t7_value = (nearestIndex$1(/*selectedField*/ ctx[38].ts, /*valid*/ ctx[15], 0) >= 0
	? timeLabel(/*selectedField*/ ctx[38].ts[nearestIndex$1(/*selectedField*/ ctx[38].ts, /*valid*/ ctx[15], 0)], /*prefs*/ ctx[11].local)
	: 'No matching time') + "";

	let t7;
	let t8;
	let t9_value = /*selectedField*/ ctx[38].ts.length + "";
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
			t4 = text(/*served*/ ctx[39]);
			p1 = element("p");
			t5 = text(t5_value);
			p2 = element("p");
			t6 = text("Sample time: ");
			t7 = text(t7_value);
			t8 = text(" · ");
			t9 = text(t9_value);
			t10 = text(" samples");
			attr(button, "class", "close svelte-kljptn");
			attr(button, "aria-label", "Close field details");
			attr(h2, "class", "svelte-kljptn");
			attr(p0, "class", "svelte-kljptn");
			attr(p1, "class", "svelte-kljptn");
			attr(p2, "class", "svelte-kljptn");
			attr(div, "class", "detail svelte-kljptn");
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
				dispose = listen(button, "click", /*click_handler_10*/ ctx[85]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty[1] & /*selectedField*/ 128 && t1_value !== (t1_value = /*selectedField*/ ctx[38].label + "")) set_data(t1, t1_value);
			if (dirty[1] & /*selectedField*/ 128 && t2_value !== (t2_value = /*selectedField*/ ctx[38].id + "")) set_data(t2, t2_value);
			if (dirty[1] & /*served*/ 256) set_data(t4, /*served*/ ctx[39]);
			if (dirty[1] & /*selectedField*/ 128 && t5_value !== (t5_value = (/*selectedField*/ ctx[38].method || `Provider unit: ${/*selectedField*/ ctx[38].unit}. No invented value is used for missing data.`) + "")) set_data(t5, t5_value);

			if (dirty[0] & /*valid, prefs*/ 34816 | dirty[1] & /*selectedField*/ 128 && t7_value !== (t7_value = (nearestIndex$1(/*selectedField*/ ctx[38].ts, /*valid*/ ctx[15], 0) >= 0
			? timeLabel(/*selectedField*/ ctx[38].ts[nearestIndex$1(/*selectedField*/ ctx[38].ts, /*valid*/ ctx[15], 0)], /*prefs*/ ctx[11].local)
			: 'No matching time') + "")) set_data(t7, t7_value);

			if (dirty[1] & /*selectedField*/ 128 && t9_value !== (t9_value = /*selectedField*/ ctx[38].ts.length + "")) set_data(t9, t9_value);
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

// (111:29) {#each filtered as f}
function create_each_block_17(ctx) {
	let div;
	let button0;
	let span;
	let t0_value = /*f*/ ctx[106].label + "";
	let t0;
	let small;
	let t1_value = /*f*/ ctx[106].section + "";
	let t1;
	let t2;
	let t3_value = /*f*/ ctx[106].key + "";
	let t3;
	let strong;
	let t4_value = format(at(/*f*/ ctx[106], /*valid*/ ctx[15]), /*f*/ ctx[106].unit, /*prefs*/ ctx[11]) + "";
	let t4;
	let button1;

	let t5_value = (/*pins*/ ctx[12].includes(/*f*/ ctx[106].key)
	? '★'
	: '☆') + "";

	let t5;
	let button1_aria_label_value;
	let mounted;
	let dispose;

	function click_handler_11() {
		return /*click_handler_11*/ ctx[86](/*f*/ ctx[106]);
	}

	function click_handler_12() {
		return /*click_handler_12*/ ctx[87](/*f*/ ctx[106]);
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
			attr(small, "class", "svelte-kljptn");
			attr(span, "class", "svelte-kljptn");
			attr(strong, "class", "svelte-kljptn");
			attr(button0, "class", "field svelte-kljptn");
			attr(button1, "title", "Pin or unpin parameter");
			attr(button1, "aria-label", button1_aria_label_value = `Pin ${/*f*/ ctx[106].label}`);
			attr(button1, "class", "svelte-kljptn");
			toggle_class(button1, "pinned", /*pins*/ ctx[12].includes(/*f*/ ctx[106].key));
			attr(div, "class", "parameter svelte-kljptn");
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
			if (dirty[1] & /*filtered*/ 2048 && t0_value !== (t0_value = /*f*/ ctx[106].label + "")) set_data(t0, t0_value);
			if (dirty[1] & /*filtered*/ 2048 && t1_value !== (t1_value = /*f*/ ctx[106].section + "")) set_data(t1, t1_value);
			if (dirty[1] & /*filtered*/ 2048 && t3_value !== (t3_value = /*f*/ ctx[106].key + "")) set_data(t3, t3_value);
			if (dirty[0] & /*valid, prefs*/ 34816 | dirty[1] & /*filtered*/ 2048 && t4_value !== (t4_value = format(at(/*f*/ ctx[106], /*valid*/ ctx[15]), /*f*/ ctx[106].unit, /*prefs*/ ctx[11]) + "")) set_data(t4, t4_value);

			if (dirty[0] & /*pins*/ 4096 | dirty[1] & /*filtered*/ 2048 && t5_value !== (t5_value = (/*pins*/ ctx[12].includes(/*f*/ ctx[106].key)
			? '★'
			: '☆') + "")) set_data(t5, t5_value);

			if (dirty[1] & /*filtered*/ 2048 && button1_aria_label_value !== (button1_aria_label_value = `Pin ${/*f*/ ctx[106].label}`)) {
				attr(button1, "aria-label", button1_aria_label_value);
			}

			if (dirty[0] & /*pins*/ 4096 | dirty[1] & /*filtered*/ 2048) {
				toggle_class(button1, "pinned", /*pins*/ ctx[12].includes(/*f*/ ctx[106].key));
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

// (105:178) {#each c.entries as e}
function create_each_block_16(ctx) {
	let span;
	let small;
	let t0_value = (MODELS[/*e*/ ctx[133].model] || /*e*/ ctx[133].model) + "";
	let t0;
	let t1_value = format(/*e*/ ctx[133].value, describe(/*key*/ ctx[90]).unit, /*prefs*/ ctx[11]) + "";
	let t1;

	return {
		c() {
			span = element("span");
			small = element("small");
			t0 = text(t0_value);
			t1 = text(t1_value);
			attr(small, "class", "svelte-kljptn");
			attr(span, "class", "svelte-kljptn");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, small);
			append(small, t0);
			append(span, t1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*data, comparisons, valid*/ 134250624 && t0_value !== (t0_value = (MODELS[/*e*/ ctx[133].model] || /*e*/ ctx[133].model) + "")) set_data(t0, t0_value);
			if (dirty[0] & /*data, comparisons, valid, prefs*/ 134252672 && t1_value !== (t1_value = format(/*e*/ ctx[133].value, describe(/*key*/ ctx[90]).unit, /*prefs*/ ctx[11]) + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(span);
			}
		}
	};
}

// (105:1) {#each ['temperature','wind','windGust','pressure'] as key}
function create_each_block_15(ctx) {
	let div1;
	let strong;
	let div0;
	let small;

	let t1_value = (/*c*/ ctx[130].entries.length < 2
	? 'At least two matching forecasts needed'
	: `Range across ${/*c*/ ctx[130].entries.length} sources: ${format(Math.min(.../*c*/ ctx[130].entries.map(func_3)), describe(/*key*/ ctx[90]).unit, /*prefs*/ ctx[11])} – ${format(Math.max(.../*c*/ ctx[130].entries.map(func_4)), describe(/*key*/ ctx[90]).unit, /*prefs*/ ctx[11])}`) + "";

	let t1;
	let each_value_16 = ensure_array_like(/*c*/ ctx[130].entries);
	let each_blocks = [];

	for (let i = 0; i < each_value_16.length; i += 1) {
		each_blocks[i] = create_each_block_16(get_each_context_16(ctx, each_value_16, i));
	}

	return {
		c() {
			div1 = element("div");
			strong = element("strong");
			strong.textContent = `${describe(/*key*/ ctx[90]).label}`;
			div0 = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			small = element("small");
			t1 = text(t1_value);
			attr(strong, "class", "svelte-kljptn");
			attr(div0, "class", "svelte-kljptn");
			attr(small, "class", "svelte-kljptn");
			attr(div1, "class", "comparison svelte-kljptn");
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
			if (dirty[0] & /*data, comparisons, valid, prefs*/ 134252672) {
				each_value_16 = ensure_array_like(/*c*/ ctx[130].entries);
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

			if (dirty[0] & /*data, comparisons, valid, prefs*/ 134252672 && t1_value !== (t1_value = (/*c*/ ctx[130].entries.length < 2
			? 'At least two matching forecasts needed'
			: `Range across ${/*c*/ ctx[130].entries.length} sources: ${format(Math.min(.../*c*/ ctx[130].entries.map(func_3)), describe(/*key*/ ctx[90]).unit, /*prefs*/ ctx[11])} – ${format(Math.max(.../*c*/ ctx[130].entries.map(func_4)), describe(/*key*/ ctx[90]).unit, /*prefs*/ ctx[11])}`) + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(div1);
			}

			destroy_each(each_blocks, detaching);
		}
	};
}

// (106:1) {#each comparisonErrors as err}
function create_each_block_14(ctx) {
	let p_1;
	let t_1_value = /*err*/ ctx[127] + "";
	let t_1;

	return {
		c() {
			p_1 = element("p");
			t_1 = text(t_1_value);
			attr(p_1, "class", "notice svelte-kljptn");
		},
		m(target, anchor) {
			insert(target, p_1, anchor);
			append(p_1, t_1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*comparisonErrors*/ 268435456 && t_1_value !== (t_1_value = /*err*/ ctx[127] + "")) set_data(t_1, t_1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(p_1);
			}
		}
	};
}

// (99:26) {#each extra.filter(f=>f.group==='Profile diagnostics') as f}
function create_each_block_13(ctx) {
	let button;
	let small0;
	let t0_value = /*f*/ ctx[106].label + "";
	let t0;
	let strong;
	let t1_value = format(at(/*f*/ ctx[106], /*valid*/ ctx[15]), /*f*/ ctx[106].unit, /*prefs*/ ctx[11]) + "";
	let t1;
	let small1;
	let t2;
	let t3;
	let button_title_value;
	let mounted;
	let dispose;

	function click_handler_9() {
		return /*click_handler_9*/ ctx[81](/*f*/ ctx[106]);
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
			t3 = text(/*served*/ ctx[39]);
			attr(small0, "class", "svelte-kljptn");
			attr(strong, "class", "svelte-kljptn");
			attr(small1, "class", "svelte-kljptn");
			attr(button, "title", button_title_value = /*f*/ ctx[106].method);
			attr(button, "class", "svelte-kljptn");
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
			if (dirty[0] & /*extra*/ 1048576 && t0_value !== (t0_value = /*f*/ ctx[106].label + "")) set_data(t0, t0_value);
			if (dirty[0] & /*extra, valid, prefs*/ 1083392 && t1_value !== (t1_value = format(at(/*f*/ ctx[106], /*valid*/ ctx[15]), /*f*/ ctx[106].unit, /*prefs*/ ctx[11]) + "")) set_data(t1, t1_value);
			if (dirty[1] & /*served*/ 256) set_data(t3, /*served*/ ctx[39]);

			if (dirty[0] & /*extra*/ 1048576 && button_title_value !== (button_title_value = /*f*/ ctx[106].method)) {
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

// (101:1413) {:else}
function create_else_block_2$1(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.textContent = "This source did not return a temperature profile. Try another baseline explicitly.";
			attr(div, "class", "empty svelte-kljptn");
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

// (101:1) {#if profile.length}
function create_if_block_13$1(ctx) {
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

	let each_value_9 = ensure_array_like(/*profile*/ ctx[29]);
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
			p0.innerHTML = `<span class="amber svelte-kljptn">Temperature</span> / <span class="mint svelte-kljptn">Dew point</span> · °C vs log pressure (hPa)`;
			div1 = element("div");
			table = element("table");
			thead = element("thead");
			thead.innerHTML = `<tr class="svelte-kljptn"><th class="svelte-kljptn">hPa</th><th class="svelte-kljptn">T</th><th class="svelte-kljptn">Td</th><th class="svelte-kljptn">RH</th><th class="svelte-kljptn">Wind</th><th class="svelte-kljptn">Direction</th><th class="svelte-kljptn">Height</th></tr>`;
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
			attr(rect, "class", "svelte-kljptn");
			attr(path0, "d", /*profilePath*/ ctx[56]('temp'));
			attr(path0, "fill", "none");
			attr(path0, "stroke", "#f4ba77");
			attr(path0, "stroke-width", "2.5");
			attr(path0, "class", "svelte-kljptn");
			attr(path1, "d", /*profilePath*/ ctx[56]('dewPoint'));
			attr(path1, "fill", "none");
			attr(path1, "stroke", "#57d8be");
			attr(path1, "stroke-width", "2.5");
			attr(path1, "class", "svelte-kljptn");
			attr(svg, "viewBox", "0 0 440 225");
			attr(svg, "role", "img");
			attr(svg, "aria-label", "Temperature and dew point versus pressure; not a Skew-T diagram");
			attr(svg, "class", "svelte-kljptn");
			attr(p0, "class", "svelte-kljptn");
			attr(div0, "class", "profile svelte-kljptn");
			attr(thead, "class", "svelte-kljptn");
			attr(tbody, "class", "svelte-kljptn");
			attr(table, "class", "svelte-kljptn");
			attr(div1, "class", "scroll-table svelte-kljptn");
			attr(p1, "class", "footnote svelte-kljptn");
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

			if (dirty[0] & /*profile*/ 536870912 | dirty[1] & /*show*/ 8388608) {
				each_value_9 = ensure_array_like(/*profile*/ ctx[29]);
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

// (101:218) {#each [1000,850,700,500,300,200,100] as p}
function create_each_block_12(ctx) {
	let line_1;
	let text_1;
	let t_1;

	return {
		c() {
			line_1 = svg_element("line");
			text_1 = svg_element("text");
			t_1 = text(/*p*/ ctx[112]);
			attr(line_1, "x1", "44");
			attr(line_1, "x2", "400");
			attr(line_1, "y1", 20 + Math.log(/*p*/ ctx[112] / 100) / Math.log(10) * 180);
			attr(line_1, "y2", 20 + Math.log(/*p*/ ctx[112] / 100) / Math.log(10) * 180);
			attr(line_1, "stroke", "#253747");
			attr(line_1, "class", "svelte-kljptn");
			attr(text_1, "x", "4");
			attr(text_1, "y", 24 + Math.log(/*p*/ ctx[112] / 100) / Math.log(10) * 180);
			attr(text_1, "class", "svelte-kljptn");
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

// (101:453) {#each [-80,-60,-40,-20,0,20,40] as t}
function create_each_block_11(ctx) {
	let line_1;
	let text_1;
	let t_1;

	return {
		c() {
			line_1 = svg_element("line");
			text_1 = svg_element("text");
			t_1 = text(/*t*/ ctx[93]);
			attr(line_1, "x1", 44 + (/*t*/ ctx[93] + 80) / 120 * 356);
			attr(line_1, "x2", 44 + (/*t*/ ctx[93] + 80) / 120 * 356);
			attr(line_1, "y1", "20");
			attr(line_1, "y2", "200");
			attr(line_1, "stroke", "#253747");
			attr(line_1, "class", "svelte-kljptn");
			attr(text_1, "x", 37 + (/*t*/ ctx[93] + 80) / 120 * 356);
			attr(text_1, "y", "219");
			attr(text_1, "class", "svelte-kljptn");
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

// (101:1105) {#each [`temp-${p}h`,`dewPoint-${p}h`,`rh-${p}h`,`wind-${p}h`,`windDir-${p}h`,`gh-${p}h`] as key}
function create_each_block_10(ctx) {
	let td;
	let t_1_value = /*show*/ ctx[54](/*key*/ ctx[90]) + "";
	let t_1;

	return {
		c() {
			td = element("td");
			t_1 = text(t_1_value);
			attr(td, "class", "svelte-kljptn");
		},
		m(target, anchor) {
			insert(target, td, anchor);
			append(td, t_1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*profile*/ 536870912 && t_1_value !== (t_1_value = /*show*/ ctx[54](/*key*/ ctx[90]) + "")) set_data(t_1, t_1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(td);
			}
		}
	};
}

// (101:1069) {#each profile as p}
function create_each_block_9(ctx) {
	let tr;
	let th;
	let t_1_value = /*p*/ ctx[112] + "";
	let t_1;

	let each_value_10 = ensure_array_like([
		`temp-${/*p*/ ctx[112]}h`,
		`dewPoint-${/*p*/ ctx[112]}h`,
		`rh-${/*p*/ ctx[112]}h`,
		`wind-${/*p*/ ctx[112]}h`,
		`windDir-${/*p*/ ctx[112]}h`,
		`gh-${/*p*/ ctx[112]}h`
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

			attr(th, "class", "svelte-kljptn");
			attr(tr, "class", "svelte-kljptn");
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
			if (dirty[0] & /*profile*/ 536870912 && t_1_value !== (t_1_value = /*p*/ ctx[112] + "")) set_data(t_1, t_1_value);

			if (dirty[0] & /*profile*/ 536870912 | dirty[1] & /*show*/ 8388608) {
				each_value_10 = ensure_array_like([
					`temp-${/*p*/ ctx[112]}h`,
					`dewPoint-${/*p*/ ctx[112]}h`,
					`rh-${/*p*/ ctx[112]}h`,
					`wind-${/*p*/ ctx[112]}h`,
					`windDir-${/*p*/ ctx[112]}h`,
					`gh-${/*p*/ ctx[112]}h`
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

// (102:1) {#if hodo.length>=2}
function create_if_block_12$1(ctx) {
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

	let each_value_7 = ensure_array_like(/*hodo*/ ctx[19]);
	let each_blocks = [];

	for (let i = 0; i < each_value_7.length; i += 1) {
		each_blocks[i] = create_each_block_7(get_each_context_7(ctx, each_value_7, i));
	}

	return {
		c() {
			div = element("div");
			div.innerHTML = `<h2 class="svelte-kljptn">Wind hodograph</h2><small class="svelte-kljptn">u / v · m/s · above model terrain</small>`;
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

			attr(div, "class", "section-title svelte-kljptn");
			attr(line0, "x1", "20");
			attr(line0, "y1", "120");
			attr(line0, "x2", "220");
			attr(line0, "y2", "120");
			attr(line0, "stroke", "#405363");
			attr(line0, "class", "svelte-kljptn");
			attr(line1, "x1", "120");
			attr(line1, "y1", "20");
			attr(line1, "x2", "120");
			attr(line1, "y2", "220");
			attr(line1, "stroke", "#405363");
			attr(line1, "class", "svelte-kljptn");
			attr(polyline, "points", polyline_points_value = /*hodo*/ ctx[19].map(/*func_2*/ ctx[82]).join(' '));
			attr(polyline, "fill", "none");
			attr(polyline, "stroke", "#69ddc3");
			attr(polyline, "stroke-width", "2");
			attr(polyline, "class", "svelte-kljptn");
			attr(svg, "class", "hodograph svelte-kljptn");
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
			if (dirty[1] & /*hodoScale*/ 16) {
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

			if (dirty[0] & /*hodo*/ 524288 | dirty[1] & /*hodoScale*/ 16 && polyline_points_value !== (polyline_points_value = /*hodo*/ ctx[19].map(/*func_2*/ ctx[82]).join(' '))) {
				attr(polyline, "points", polyline_points_value);
			}

			if (dirty[0] & /*hodo*/ 524288 | dirty[1] & /*hodoScale*/ 16) {
				each_value_7 = ensure_array_like(/*hodo*/ ctx[19]);
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

// (102:348) {#each [0.25,0.5,0.75,1] as r}
function create_each_block_8(ctx) {
	let circle;
	let text_1;
	let t_1_value = Math.round(/*hodoScale*/ ctx[35] * /*r*/ ctx[99]) + "";
	let t_1;

	return {
		c() {
			circle = svg_element("circle");
			text_1 = svg_element("text");
			t_1 = text(t_1_value);
			attr(circle, "cx", "120");
			attr(circle, "cy", "120");
			attr(circle, "r", /*r*/ ctx[99] * 100);
			attr(circle, "fill", "none");
			attr(circle, "stroke", "#293a48");
			attr(circle, "class", "svelte-kljptn");
			attr(text_1, "x", "123");
			attr(text_1, "y", 120 - /*r*/ ctx[99] * 100 + 10);
			attr(text_1, "class", "svelte-kljptn");
		},
		m(target, anchor) {
			insert(target, circle, anchor);
			insert(target, text_1, anchor);
			append(text_1, t_1);
		},
		p(ctx, dirty) {
			if (dirty[1] & /*hodoScale*/ 16 && t_1_value !== (t_1_value = Math.round(/*hodoScale*/ ctx[35] * /*r*/ ctx[99]) + "")) set_data(t_1, t_1_value);
		},
		d(detaching) {
			if (detaching) {
				detach(circle);
				detach(text_1);
			}
		}
	};
}

// (102:659) {#each hodo as p}
function create_each_block_7(ctx) {
	let circle;
	let title;
	let t0_value = /*p*/ ctx[112].p + "";
	let t0;
	let t1;
	let t2_value = /*p*/ ctx[112].wind + "";
	let t2;
	let t3;
	let t4_value = /*p*/ ctx[112].dir + "";
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
			attr(title, "class", "svelte-kljptn");
			attr(circle, "cx", circle_cx_value = 120 + /*p*/ ctx[112].u / /*hodoScale*/ ctx[35] * 100);
			attr(circle, "cy", circle_cy_value = 120 - /*p*/ ctx[112].v / /*hodoScale*/ ctx[35] * 100);
			attr(circle, "r", "2");
			attr(circle, "fill", "#f4ba77");
			attr(circle, "class", "svelte-kljptn");
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
			if (dirty[0] & /*hodo*/ 524288 && t0_value !== (t0_value = /*p*/ ctx[112].p + "")) set_data(t0, t0_value);
			if (dirty[0] & /*hodo*/ 524288 && t2_value !== (t2_value = /*p*/ ctx[112].wind + "")) set_data(t2, t2_value);
			if (dirty[0] & /*hodo*/ 524288 && t4_value !== (t4_value = /*p*/ ctx[112].dir + "")) set_data(t4, t4_value);

			if (dirty[0] & /*hodo*/ 524288 | dirty[1] & /*hodoScale*/ 16 && circle_cx_value !== (circle_cx_value = 120 + /*p*/ ctx[112].u / /*hodoScale*/ ctx[35] * 100)) {
				attr(circle, "cx", circle_cx_value);
			}

			if (dirty[0] & /*hodo*/ 524288 | dirty[1] & /*hodoScale*/ 16 && circle_cy_value !== (circle_cy_value = 120 - /*p*/ ctx[112].v / /*hodoScale*/ ctx[35] * 100)) {
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

// (82:23) {#each lines as line}
function create_each_block_6(ctx) {
	let button;
	let small;
	let t0_value = /*line*/ ctx[109].label + "";
	let t0;
	let span;
	let t1_value = /*line*/ ctx[109].text + "";
	let t1;
	let mounted;
	let dispose;

	function click_handler_6() {
		return /*click_handler_6*/ ctx[78](/*line*/ ctx[109]);
	}

	return {
		c() {
			button = element("button");
			small = element("small");
			t0 = text(t0_value);
			span = element("span");
			t1 = text(t1_value);
			attr(small, "class", "svelte-kljptn");
			attr(span, "class", "svelte-kljptn");
			attr(button, "class", "svelte-kljptn");
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
			if (dirty[1] & /*lines*/ 512 && t0_value !== (t0_value = /*line*/ ctx[109].label + "")) set_data(t0, t0_value);
			if (dirty[1] & /*lines*/ 512 && t1_value !== (t1_value = /*line*/ ctx[109].text + "")) set_data(t1, t1_value);
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

// (83:20) {#each cards as f}
function create_each_block_5(ctx) {
	let button;
	let small;
	let t0_value = /*f*/ ctx[106].label + "";
	let t0;
	let strong;
	let t1_value = format(at(/*f*/ ctx[106], /*valid*/ ctx[15]), /*f*/ ctx[106].unit, /*prefs*/ ctx[11]) + "";
	let t1;
	let span;

	let t2_value = (/*f*/ ctx[106].section === 'derived'
	? 'Calculated'
	: /*f*/ ctx[106].ts.length
		? /*served*/ ctx[39]
		: 'Not supplied') + "";

	let t2;
	let mounted;
	let dispose;

	function click_handler_7() {
		return /*click_handler_7*/ ctx[79](/*f*/ ctx[106]);
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
			attr(small, "class", "svelte-kljptn");
			attr(strong, "class", "svelte-kljptn");
			attr(span, "class", "svelte-kljptn");
			attr(button, "class", "card svelte-kljptn");
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
			if (dirty[1] & /*cards*/ 1024 && t0_value !== (t0_value = /*f*/ ctx[106].label + "")) set_data(t0, t0_value);
			if (dirty[0] & /*valid, prefs*/ 34816 | dirty[1] & /*cards*/ 1024 && t1_value !== (t1_value = format(at(/*f*/ ctx[106], /*valid*/ ctx[15]), /*f*/ ctx[106].unit, /*prefs*/ ctx[11]) + "")) set_data(t1, t1_value);

			if (dirty[1] & /*cards, served*/ 1280 && t2_value !== (t2_value = (/*f*/ ctx[106].section === 'derived'
			? 'Calculated'
			: /*f*/ ctx[106].ts.length
				? /*served*/ ctx[39]
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

// (94:90) {:else}
function create_else_block_1$1(ctx) {
	let p_1;

	return {
		c() {
			p_1 = element("p");
			p_1.textContent = "Temperature trend unavailable for this forecast window.";
			attr(p_1, "class", "footnote svelte-kljptn");
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

// (86:1) {#if trendValues.length}
function create_if_block_6$2(ctx) {
	let div1;
	let div0;
	let span0;
	let i0;
	let t0;
	let b0;
	let t1_value = format(/*trendMin*/ ctx[32] + 1, 'K', /*prefs*/ ctx[11]) + "";
	let t1;
	let t2;
	let t3_value = format(/*trendMax*/ ctx[31] - 1, 'K', /*prefs*/ ctx[11]) + "";
	let t3;
	let span1;
	let i1;
	let t4;
	let b1;
	let t5;
	let t6_value = format(/*rainPeak*/ ctx[16], 'mm', /*prefs*/ ctx[11]) + "";
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

	let each_value_3 = ensure_array_like(/*slots*/ ctx[17]);
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
			attr(i0, "class", "svelte-kljptn");
			attr(b0, "class", "svelte-kljptn");
			attr(span0, "class", "svelte-kljptn");
			attr(i1, "class", "svelte-kljptn");
			attr(b1, "class", "svelte-kljptn");
			attr(span1, "class", "svelte-kljptn");
			attr(div0, "class", "trend-legend svelte-kljptn");
			attr(path, "d", path_d_value = /*trendPath*/ ctx[55](/*slots*/ ctx[17], /*trendMin*/ ctx[32], /*trendMax*/ ctx[31]));
			attr(path, "fill", "none");
			attr(path, "stroke", "#75e5cd");
			attr(path, "stroke-width", "3");
			attr(path, "stroke-linecap", "round");
			attr(path, "class", "svelte-kljptn");
			attr(svg, "viewBox", "0 0 560 174");
			attr(svg, "role", "img");
			attr(svg, "aria-label", "48-hour temperature trend above precipitation bars; the two charts use separate scales");
			attr(svg, "class", "svelte-kljptn");
			attr(small, "class", "svelte-kljptn");
			attr(div1, "class", "trend svelte-kljptn");
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
			if (dirty[0] & /*prefs*/ 2048 | dirty[1] & /*trendMin*/ 2 && t1_value !== (t1_value = format(/*trendMin*/ ctx[32] + 1, 'K', /*prefs*/ ctx[11]) + "")) set_data(t1, t1_value);
			if (dirty[0] & /*prefs*/ 2048 | dirty[1] & /*trendMax*/ 1 && t3_value !== (t3_value = format(/*trendMax*/ ctx[31] - 1, 'K', /*prefs*/ ctx[11]) + "")) set_data(t3, t3_value);
			if (dirty[0] & /*rainPeak, prefs*/ 67584 && t6_value !== (t6_value = format(/*rainPeak*/ ctx[16], 'mm', /*prefs*/ ctx[11]) + "")) set_data(t6, t6_value);

			if (dirty[0] & /*slots*/ 131072 | dirty[1] & /*trendMin, trendMax*/ 3 && path_d_value !== (path_d_value = /*trendPath*/ ctx[55](/*slots*/ ctx[17], /*trendMin*/ ctx[32], /*trendMax*/ ctx[31]))) {
				attr(path, "d", path_d_value);
			}

			if (dirty[0] & /*slots, prefs, data, valid, rainMax*/ 1073907840 | dirty[1] & /*trendMax, trendMin*/ 3) {
				each_value_3 = ensure_array_like(/*slots*/ ctx[17]);
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

// (88:1) {#each [24,70,116] as y}
function create_each_block_4(ctx) {
	let line_1;

	return {
		c() {
			line_1 = svg_element("line");
			attr(line_1, "x1", "18");
			attr(line_1, "x2", "542");
			attr(line_1, "y1", /*y*/ ctx[103]);
			attr(line_1, "y2", /*y*/ ctx[103]);
			attr(line_1, "stroke", "currentColor");
			attr(line_1, "class", "svelte-kljptn");
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

// (91:1) {#if finite(r)}
function create_if_block_10$1(ctx) {
	let rect;
	let rect_x_value;
	let rect_y_value;
	let rect_height_value;
	let rect_opacity_value;

	return {
		c() {
			rect = svg_element("rect");
			attr(rect, "x", rect_x_value = /*x*/ ctx[100] - 5);
			attr(rect, "y", rect_y_value = 151 - /*r*/ ctx[99] / /*rainMax*/ ctx[30] * 24);
			attr(rect, "width", "10");
			attr(rect, "height", rect_height_value = Math.max(1, /*r*/ ctx[99] / /*rainMax*/ ctx[30] * 24));
			attr(rect, "rx", "3");
			attr(rect, "fill", "#78baff");
			attr(rect, "opacity", rect_opacity_value = /*r*/ ctx[99] > 0 ? .8 : .15);
			attr(rect, "class", "svelte-kljptn");
		},
		m(target, anchor) {
			insert(target, rect, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*slots*/ 131072 && rect_x_value !== (rect_x_value = /*x*/ ctx[100] - 5)) {
				attr(rect, "x", rect_x_value);
			}

			if (dirty[0] & /*data, slots, rainMax*/ 1073873024 && rect_y_value !== (rect_y_value = 151 - /*r*/ ctx[99] / /*rainMax*/ ctx[30] * 24)) {
				attr(rect, "y", rect_y_value);
			}

			if (dirty[0] & /*data, slots, rainMax*/ 1073873024 && rect_height_value !== (rect_height_value = Math.max(1, /*r*/ ctx[99] / /*rainMax*/ ctx[30] * 24))) {
				attr(rect, "height", rect_height_value);
			}

			if (dirty[0] & /*data, slots*/ 131200 && rect_opacity_value !== (rect_opacity_value = /*r*/ ctx[99] > 0 ? .8 : .15)) {
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

// (92:1) {#if t===valid}
function create_if_block_8$1(ctx) {
	let line_1;
	let line_1_x__value;
	let line_1_x__value_1;
	let show_if = finite(/*v*/ ctx[98]);
	let if_block_anchor;
	let if_block = show_if && create_if_block_9$1(ctx);

	return {
		c() {
			line_1 = svg_element("line");
			if (if_block) if_block.c();
			if_block_anchor = empty();
			attr(line_1, "x1", line_1_x__value = /*x*/ ctx[100]);
			attr(line_1, "x2", line_1_x__value_1 = /*x*/ ctx[100]);
			attr(line_1, "y1", "14");
			attr(line_1, "y2", "153");
			attr(line_1, "stroke", "#75e5cd");
			attr(line_1, "stroke-dasharray", "3 4");
			attr(line_1, "class", "svelte-kljptn");
		},
		m(target, anchor) {
			insert(target, line_1, anchor);
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*slots*/ 131072 && line_1_x__value !== (line_1_x__value = /*x*/ ctx[100])) {
				attr(line_1, "x1", line_1_x__value);
			}

			if (dirty[0] & /*slots*/ 131072 && line_1_x__value_1 !== (line_1_x__value_1 = /*x*/ ctx[100])) {
				attr(line_1, "x2", line_1_x__value_1);
			}

			if (dirty[0] & /*data, slots*/ 131200) show_if = finite(/*v*/ ctx[98]);

			if (show_if) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_9$1(ctx);
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

// (92:94) {#if finite(v)}
function create_if_block_9$1(ctx) {
	let circle;
	let circle_cx_value;
	let circle_cy_value;

	return {
		c() {
			circle = svg_element("circle");
			attr(circle, "cx", circle_cx_value = /*x*/ ctx[100]);
			attr(circle, "cy", circle_cy_value = 24 + (/*trendMax*/ ctx[31] - /*v*/ ctx[98]) / (/*trendMax*/ ctx[31] - /*trendMin*/ ctx[32]) * 92);
			attr(circle, "r", "5");
			attr(circle, "fill", "#75e5cd");
			attr(circle, "stroke", "#10282a");
			attr(circle, "stroke-width", "3");
			attr(circle, "class", "svelte-kljptn");
		},
		m(target, anchor) {
			insert(target, circle, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*slots*/ 131072 && circle_cx_value !== (circle_cx_value = /*x*/ ctx[100])) {
				attr(circle, "cx", circle_cx_value);
			}

			if (dirty[0] & /*data, slots*/ 131200 | dirty[1] & /*trendMax, trendMin*/ 3 && circle_cy_value !== (circle_cy_value = 24 + (/*trendMax*/ ctx[31] - /*v*/ ctx[98]) / (/*trendMax*/ ctx[31] - /*trendMin*/ ctx[32]) * 92)) {
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

// (93:1) {#if i%4===0}
function create_if_block_7$1(ctx) {
	let text_1;

	let t_1_value = new Date(/*t*/ ctx[93]).toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		.../*prefs*/ ctx[11].local ? {} : { timeZone: 'UTC' }
	}) + "";

	let t_1;
	let text_1_x_value;
	let text_1_text_anchor_value;

	return {
		c() {
			text_1 = svg_element("text");
			t_1 = text(t_1_value);
			attr(text_1, "x", text_1_x_value = /*x*/ ctx[100]);
			attr(text_1, "y", "170");

			attr(text_1, "text-anchor", text_1_text_anchor_value = /*i*/ ctx[102] === 0
			? 'start'
			: /*i*/ ctx[102] === /*slots*/ ctx[17].length - 1
				? 'end'
				: 'middle');

			attr(text_1, "class", "svelte-kljptn");
		},
		m(target, anchor) {
			insert(target, text_1, anchor);
			append(text_1, t_1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*slots, prefs*/ 133120 && t_1_value !== (t_1_value = new Date(/*t*/ ctx[93]).toLocaleTimeString('en-GB', {
				hour: '2-digit',
				minute: '2-digit',
				.../*prefs*/ ctx[11].local ? {} : { timeZone: 'UTC' }
			}) + "")) set_data(t_1, t_1_value);

			if (dirty[0] & /*slots*/ 131072 && text_1_x_value !== (text_1_x_value = /*x*/ ctx[100])) {
				attr(text_1, "x", text_1_x_value);
			}

			if (dirty[0] & /*slots*/ 131072 && text_1_text_anchor_value !== (text_1_text_anchor_value = /*i*/ ctx[102] === 0
			? 'start'
			: /*i*/ ctx[102] === /*slots*/ ctx[17].length - 1
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

// (90:1) {#each slots as t,i}
function create_each_block_3(ctx) {
	let show_if = finite(/*r*/ ctx[99]);
	let if_block0_anchor;
	let if_block1_anchor;
	let if_block2_anchor;
	let if_block0 = show_if && create_if_block_10$1(ctx);
	let if_block1 = /*t*/ ctx[93] === /*valid*/ ctx[15] && create_if_block_8$1(ctx);
	let if_block2 = /*i*/ ctx[102] % 4 === 0 && create_if_block_7$1(ctx);

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
			if (dirty[0] & /*data, slots*/ 131200) show_if = finite(/*r*/ ctx[99]);

			if (show_if) {
				if (if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0 = create_if_block_10$1(ctx);
					if_block0.c();
					if_block0.m(if_block0_anchor.parentNode, if_block0_anchor);
				}
			} else if (if_block0) {
				if_block0.d(1);
				if_block0 = null;
			}

			if (/*t*/ ctx[93] === /*valid*/ ctx[15]) {
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

			if (/*i*/ ctx[102] % 4 === 0) if_block2.p(ctx, dirty);
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

// (96:127) {#each slots as t}
function create_each_block_2$2(ctx) {
	let th;
	let button;

	let t0_value = new Date(/*t*/ ctx[93]).toLocaleDateString('en-GB', {
		day: '2-digit',
		.../*prefs*/ ctx[11].local ? {} : { timeZone: 'UTC' }
	}) + "";

	let t0;
	let br;

	let t1_value = new Date(/*t*/ ctx[93]).toLocaleTimeString('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		.../*prefs*/ ctx[11].local ? {} : { timeZone: 'UTC' }
	}) + "";

	let t1;
	let mounted;
	let dispose;

	function click_handler_8() {
		return /*click_handler_8*/ ctx[80](/*t*/ ctx[93]);
	}

	return {
		c() {
			th = element("th");
			button = element("button");
			t0 = text(t0_value);
			br = element("br");
			t1 = text(t1_value);
			attr(br, "class", "svelte-kljptn");
			attr(button, "class", "svelte-kljptn");
			toggle_class(button, "chosen", /*t*/ ctx[93] === /*valid*/ ctx[15]);
			attr(th, "class", "svelte-kljptn");
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

			if (dirty[0] & /*slots, prefs*/ 133120 && t0_value !== (t0_value = new Date(/*t*/ ctx[93]).toLocaleDateString('en-GB', {
				day: '2-digit',
				.../*prefs*/ ctx[11].local ? {} : { timeZone: 'UTC' }
			}) + "")) set_data(t0, t0_value);

			if (dirty[0] & /*slots, prefs*/ 133120 && t1_value !== (t1_value = new Date(/*t*/ ctx[93]).toLocaleTimeString('en-GB', {
				hour: '2-digit',
				minute: '2-digit',
				.../*prefs*/ ctx[11].local ? {} : { timeZone: 'UTC' }
			}) + "")) set_data(t1, t1_value);

			if (dirty[0] & /*slots, valid*/ 163840) {
				toggle_class(button, "chosen", /*t*/ ctx[93] === /*valid*/ ctx[15]);
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

// (96:571) {#each slots as t}
function create_each_block_1$2(ctx) {
	let td;
	let t_1_value = /*show*/ ctx[54](/*key*/ ctx[90], /*t*/ ctx[93]) + "";
	let t_1;

	return {
		c() {
			td = element("td");
			t_1 = text(t_1_value);
			attr(td, "class", "svelte-kljptn");
			toggle_class(td, "wet", /*key*/ ctx[90] === 'precipAmount' && value(/*data*/ ctx[7], /*key*/ ctx[90], /*t*/ ctx[93]) > 0);
		},
		m(target, anchor) {
			insert(target, td, anchor);
			append(td, t_1);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*slots*/ 131072 && t_1_value !== (t_1_value = /*show*/ ctx[54](/*key*/ ctx[90], /*t*/ ctx[93]) + "")) set_data(t_1, t_1_value);

			if (dirty[0] & /*data, slots*/ 131200) {
				toggle_class(td, "wet", /*key*/ ctx[90] === 'precipAmount' && value(/*data*/ ctx[7], /*key*/ ctx[90], /*t*/ ctx[93]) > 0);
			}
		},
		d(detaching) {
			if (detaching) {
				detach(td);
			}
		}
	};
}

// (96:463) {#each ['temperature','dewPoint','wind','windGust','precipAmount'] as key}
function create_each_block$2(ctx) {
	let tr;
	let th;
	let each_value_1 = ensure_array_like(/*slots*/ ctx[17]);
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
	}

	return {
		c() {
			tr = element("tr");
			th = element("th");
			th.textContent = `${describe(/*key*/ ctx[90]).label}`;

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(th, "class", "svelte-kljptn");
			attr(tr, "class", "svelte-kljptn");
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
			if (dirty[0] & /*data, slots*/ 131200 | dirty[1] & /*show*/ 8388608) {
				each_value_1 = ensure_array_like(/*slots*/ ctx[17]);
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1$2(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_1$2(child_ctx);
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

// (69:134) {:else}
function create_else_block$2(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			div.innerHTML = `<h2 class="svelte-kljptn">Wintry Forecast</h2><p class="svelte-kljptn">Integrated ECMWF snowline, precipitation type, estimated new snow, 144-hour forecast, sounding and optional map contours. Open the live Windy plugin to use these tools.</p>`;
			attr(div, "class", "empty svelte-kljptn");
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

// (69:22) {#if winterComponent}
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
				units: /*prefs*/ ctx[11].winterUnits
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
				if (dirty[0] & /*prefs*/ 2048) switch_instance_changes.units = /*prefs*/ ctx[11].winterUnits;
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
	let t9_value = (/*isFavorite*/ ctx[33] ? '★ Saved' : '☆ Save point') + "";
	let t9;
	let button1_disabled_value;
	let t10;
	let t11;
	let t12;
	let t13;
	let t14;
	let nav;
	let t15;
	let current_block_type_index;
	let if_block6;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*demo*/ ctx[2] && create_if_block_27();
	let if_block1 = /*placeName*/ ctx[4] && create_if_block_26(ctx);
	let if_block2 = /*favorites*/ ctx[13].length && create_if_block_25(ctx);
	let if_block3 = /*view*/ ctx[24] !== 'Winter' && create_if_block_24(ctx);
	let if_block4 = /*data*/ ctx[7] && !/*busy*/ ctx[22] && /*view*/ ctx[24] === 'Brief' && create_if_block_23$1(ctx);
	let if_block5 = /*settings*/ ctx[25] && create_if_block_22$1(ctx);
	let each_value_21 = ensure_array_like(['Brief', 'Winter', 'Profile', 'Compare', 'Parameters', 'Coverage']);
	let each_blocks = [];

	for (let i = 0; i < 6; i += 1) {
		each_blocks[i] = create_each_block_21(get_each_context_21(ctx, each_value_21, i));
	}

	const if_block_creators = [
		create_if_block$3,
		create_if_block_2$3,
		create_if_block_3$3,
		create_if_block_4$3,
		create_else_block_3$1
	];

	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*view*/ ctx[24] === 'Winter') return 0;
		if (/*busy*/ ctx[22]) return 1;
		if (/*error*/ ctx[23]) return 2;
		if (/*data*/ ctx[7]) return 3;
		return 4;
	}

	current_block_type_index = select_block_type(ctx);
	if_block6 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			section = element("section");
			header = element("header");
			div1 = element("div");
			div1.innerHTML = `<span class="mark svelte-kljptn">◉</span><div class="svelte-kljptn"><h1 class="svelte-kljptn">WeatherScope<span class="svelte-kljptn">POINT FORECAST</span></h1><p class="svelte-kljptn">Every detail. One clear forecast.</p></div>`;
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
			if (if_block3) if_block3.c();
			t12 = space();
			if (if_block4) if_block4.c();
			t13 = space();
			if (if_block5) if_block5.c();
			t14 = space();
			nav = element("nav");

			for (let i = 0; i < 6; i += 1) {
				each_blocks[i].c();
			}

			t15 = space();
			if_block6.c();
			attr(div1, "class", "brand svelte-kljptn");
			attr(button0, "class", "icon svelte-kljptn");
			attr(button0, "aria-label", "Settings");
			attr(button0, "title", "Settings");
			attr(header, "class", "svelte-kljptn");
			attr(small, "class", "svelte-kljptn");
			attr(strong, "class", "svelte-kljptn");
			attr(div2, "class", "svelte-kljptn");
			button1.disabled = button1_disabled_value = !/*location*/ ctx[0];
			attr(button1, "title", "Save or remove favorite");
			attr(button1, "aria-pressed", /*isFavorite*/ ctx[33]);
			attr(button1, "class", "svelte-kljptn");
			toggle_class(button1, "saved", /*isFavorite*/ ctx[33]);
			attr(div3, "class", "location svelte-kljptn");
			attr(nav, "aria-label", "Dashboard views");
			attr(nav, "class", "svelte-kljptn");
			attr(section, "class", "weatherscope svelte-kljptn");
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
			if (if_block3) if_block3.m(section, null);
			append(section, t12);
			if (if_block4) if_block4.m(section, null);
			append(section, t13);
			if (if_block5) if_block5.m(section, null);
			append(section, t14);
			append(section, nav);

			for (let i = 0; i < 6; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(nav, null);
				}
			}

			append(section, t15);
			if_blocks[current_block_type_index].m(section, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(button0, "click", /*click_handler*/ ctx[64]),
					listen(button1, "click", /*favorite*/ ctx[51])
				];

				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (/*demo*/ ctx[2]) {
				if (if_block0) ; else {
					if_block0 = create_if_block_27();
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
					if_block1 = create_if_block_26(ctx);
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

			if ((!current || dirty[1] & /*isFavorite*/ 4) && t9_value !== (t9_value = (/*isFavorite*/ ctx[33] ? '★ Saved' : '☆ Save point') + "")) set_data(t9, t9_value);

			if (!current || dirty[0] & /*location*/ 1 && button1_disabled_value !== (button1_disabled_value = !/*location*/ ctx[0])) {
				button1.disabled = button1_disabled_value;
			}

			if (!current || dirty[1] & /*isFavorite*/ 4) {
				attr(button1, "aria-pressed", /*isFavorite*/ ctx[33]);
			}

			if (!current || dirty[1] & /*isFavorite*/ 4) {
				toggle_class(button1, "saved", /*isFavorite*/ ctx[33]);
			}

			if (/*favorites*/ ctx[13].length) {
				if (if_block2) {
					if_block2.p(ctx, dirty);
				} else {
					if_block2 = create_if_block_25(ctx);
					if_block2.c();
					if_block2.m(section, t11);
				}
			} else if (if_block2) {
				if_block2.d(1);
				if_block2 = null;
			}

			if (/*view*/ ctx[24] !== 'Winter') {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block_24(ctx);
					if_block3.c();
					if_block3.m(section, t12);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (/*data*/ ctx[7] && !/*busy*/ ctx[22] && /*view*/ ctx[24] === 'Brief') {
				if (if_block4) {
					if_block4.p(ctx, dirty);
				} else {
					if_block4 = create_if_block_23$1(ctx);
					if_block4.c();
					if_block4.m(section, t13);
				}
			} else if (if_block4) {
				if_block4.d(1);
				if_block4 = null;
			}

			if (/*settings*/ ctx[25]) {
				if (if_block5) {
					if_block5.p(ctx, dirty);
				} else {
					if_block5 = create_if_block_22$1(ctx);
					if_block5.c();
					if_block5.m(section, t14);
				}
			} else if (if_block5) {
				if_block5.d(1);
				if_block5 = null;
			}

			if (dirty[0] & /*view*/ 16777216 | dirty[1] & /*switchView*/ 524288) {
				each_value_21 = ensure_array_like(['Brief', 'Winter', 'Profile', 'Compare', 'Parameters', 'Coverage']);
				let i;

				for (i = 0; i < 6; i += 1) {
					const child_ctx = get_each_context_21(ctx, each_value_21, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block_21(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(nav, null);
					}
				}

				for (; i < 6; i += 1) {
					each_blocks[i].d(1);
				}
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
				if_block6 = if_blocks[current_block_type_index];

				if (!if_block6) {
					if_block6 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block6.c();
				} else {
					if_block6.p(ctx, dirty);
				}

				transition_in(if_block6, 1);
				if_block6.m(section, null);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block6);
			current = true;
		},
		o(local) {
			transition_out(if_block6);
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
			if (if_block4) if_block4.d();
			if (if_block5) if_block5.d();
			destroy_each(each_blocks, detaching);
			if_blocks[current_block_type_index].d();
			mounted = false;
			run_all(dispose);
		}
	};
}

const func = f => f.key;
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
		$$invalidate(26, compareBusy = false);
		$$invalidate(22, busy = true);
		$$invalidate(23, error = '');
		$$invalidate(7, data = null);
		$$invalidate(10, selected = null);
		$$invalidate(27, comparisons = []);
		$$invalidate(28, comparisonErrors = []);

		try {
			const result = await load(source, loc, force);
			if (token === request) $$invalidate(7, data = result);
		} catch(e) {
			if (token === request) $$invalidate(23, error = e?.message || 'Forecast unavailable. Try again.');
		} finally {
			if (token === request) $$invalidate(22, busy = false);
		}
	}

	onDestroy(() => {
		request++;
		compareRequest++;
	});

	function pin(key) {
		$$invalidate(12, pins = pins.includes(key)
		? pins.filter(k => k !== key)
		: [...pins.slice(-11), key]);

		save();
	}

	function inspect(key) {
		$$invalidate(10, selected = (fields.find(f => f.key === key) || {}).id || null);
		$$invalidate(24, view = 'Parameters');
		$$invalidate(8, search = key);
		$$invalidate(9, group = 'All');
	}

	function chooseTime(t) {
		$$invalidate(57, timestamp = t);
		onTime(t);
	}

	function shortcut(hours) {
		const t = Date.now() + hours * HOUR$1;
		const i = data ? nearestIndex$1(data.ts, t) : -1;
		if (i >= 0) chooseTime(data.ts[i]);
	}

	function switchView(name) {
		$$invalidate(24, view = name);
		if (name === 'Compare' && !comparisons.length && !compareBusy && data) compareModels();
	}

	function favorite() {
		if (!location) return;
		const same = p => Math.abs(p.lat - location.lat) < 0.0001 && Math.abs(p.lon - location.lon) < 0.0001;

		$$invalidate(13, favorites = favorites.some(same)
		? favorites.filter(p => !same(p))
		: [...favorites.slice(-29), { ...location, name: placeName || '' }]);

		save();
	}

	async function compareModels() {
		const token = ++compareRequest;
		$$invalidate(26, compareBusy = true);
		$$invalidate(28, comparisonErrors = []);
		const loc = { ...location };
		const source = model;
		const results = await Promise.allSettled(Object.keys(MODELS).filter(m => m !== source).map(async m => ({ m, data: await load(m, loc) })));
		if (token !== compareRequest) return;
		$$invalidate(27, comparisons = results.filter(r => r.status === 'fulfilled').map(r => r.value.data));

		$$invalidate(28, comparisonErrors = results.flatMap((r, i) => r.status === 'rejected'
		? [
				`${Object.keys(MODELS).filter(m => m !== source)[i]}: ${r.reason?.message || 'Unavailable'}`
			]
		: []));

		$$invalidate(26, compareBusy = false);
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

	const click_handler = () => $$invalidate(25, settings = !settings);
	const click_handler_1 = place => onLocation({ lat: place.lat, lon: place.lon });

	function select_change_handler() {
		model = select_value(this);
		$$invalidate(6, model);
	}

	const click_handler_2 = () => refresh(location, model, true);

	function select0_change_handler() {
		prefs.winterUnits = select_value(this);
		$$invalidate(11, prefs);
	}

	function select1_change_handler() {
		prefs.temp = select_value(this);
		$$invalidate(11, prefs);
	}

	function select2_change_handler() {
		prefs.wind = select_value(this);
		$$invalidate(11, prefs);
	}

	function input0_change_handler() {
		prefs.local = this.checked;
		$$invalidate(11, prefs);
	}

	function input1_input_handler() {
		thresholds.gust = to_number(this.value);
		$$invalidate(14, thresholds);
	}

	function input2_input_handler() {
		thresholds.rain = to_number(this.value);
		$$invalidate(14, thresholds);
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
		$$invalidate(8, search);
	}

	function select_change_handler_1() {
		group = select_value(this);
		$$invalidate(9, group);
		(((((($$invalidate(43, groups), $$invalidate(61, fields)), $$invalidate(7, data)), $$invalidate(20, extra)), $$invalidate(15, valid)), $$invalidate(21, index)), $$invalidate(57, timestamp));
	}

	const click_handler_10 = () => $$invalidate(10, selected = null);
	const click_handler_11 = f => $$invalidate(10, selected = f.id);
	const click_handler_12 = f => pin(f.key);

	$$self.$$set = $$props => {
		if ('location' in $$props) $$invalidate(0, location = $$props.location);
		if ('timestamp' in $$props) $$invalidate(57, timestamp = $$props.timestamp);
		if ('load' in $$props) $$invalidate(58, load = $$props.load);
		if ('onLocation' in $$props) $$invalidate(1, onLocation = $$props.onLocation);
		if ('onTime' in $$props) $$invalidate(59, onTime = $$props.onTime);
		if ('demo' in $$props) $$invalidate(2, demo = $$props.demo);
		if ('mapModel' in $$props) $$invalidate(3, mapModel = $$props.mapModel);
		if ('placeName' in $$props) $$invalidate(4, placeName = $$props.placeName);
		if ('winterComponent' in $$props) $$invalidate(5, winterComponent = $$props.winterComponent);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty[0] & /*location, model*/ 65) {
			if (location && model) refresh(location, model);
		}

		if ($$self.$$.dirty[0] & /*data*/ 128 | $$self.$$.dirty[1] & /*timestamp*/ 67108864) {
			$$invalidate(21, index = data ? nearestIndex$1(data.ts, timestamp) : -1);
		}

		if ($$self.$$.dirty[0] & /*index, data*/ 2097280 | $$self.$$.dirty[1] & /*timestamp*/ 67108864) {
			$$invalidate(15, valid = index >= 0 ? data.ts[index] : timestamp);
		}

		if ($$self.$$.dirty[0] & /*data, valid*/ 32896) {
			$$invalidate(20, extra = data
			? [...derived(data, valid), ...diagnostics(data, valid)]
			: []);
		}

		if ($$self.$$.dirty[0] & /*data, extra*/ 1048704) {
			$$invalidate(61, fields = data ? [...data.fields, ...extra] : []);
		}

		if ($$self.$$.dirty[1] & /*fields*/ 1073741824) {
			$$invalidate(43, groups = ['All', ...new Set(fields.map(f => f.group))]);
		}

		if ($$self.$$.dirty[0] & /*group, search*/ 768 | $$self.$$.dirty[1] & /*fields*/ 1073741824) {
			$$invalidate(42, filtered = fields.filter(f => (group === 'All' || f.group === group) && `${f.label} ${f.key} ${f.section}`.toLowerCase().includes(search.toLowerCase())));
		}

		if ($$self.$$.dirty[0] & /*pins*/ 4096 | $$self.$$.dirty[1] & /*fields*/ 1073741824) {
			$$invalidate(41, cards = pins.map(key => fields.find(f => f.key === key) || {
				id: key,
				key,
				...describe(key),
				values: [],
				ts: []
			}));
		}

		if ($$self.$$.dirty[0] & /*data, valid, prefs, thresholds*/ 51328) {
			$$invalidate(40, lines = data ? briefing(data, valid, prefs, thresholds) : []);
		}

		if ($$self.$$.dirty[0] & /*data*/ 128) {
			$$invalidate(63, start = data
			? Math.max(data.ts[0], Math.floor(Date.now() / (3 * HOUR$1)) * 3 * HOUR$1)
			: 0);
		}

		if ($$self.$$.dirty[0] & /*data*/ 128 | $$self.$$.dirty[2] & /*start*/ 2) {
			$$invalidate(17, slots = data
			? data.ts.filter(t => t >= start && t <= start + 48 * HOUR$1)
			: []);
		}

		if ($$self.$$.dirty[0] & /*data, model*/ 192) {
			$$invalidate(39, served = data ? MODELS[data.model] || data.model : MODELS[model]);
		}

		if ($$self.$$.dirty[0] & /*selected*/ 1024 | $$self.$$.dirty[1] & /*fields*/ 1073741824) {
			$$invalidate(38, selectedField = selected ? fields.find(f => f.id === selected) : null);
		}

		if ($$self.$$.dirty[0] & /*data*/ 128) {
			$$invalidate(29, profile = data
			? [
					...new Set(data.fields.map(f => f.key.match(/^temp-(\d+)h$/)?.[1]).filter(Boolean))
				].map(Number).sort((a, b) => b - a)
			: []);
		}

		if ($$self.$$.dirty[0] & /*data, valid*/ 32896) {
			$$invalidate(37, outlook = data ? windowSummary(data, valid) : null);
		}

		if ($$self.$$.dirty[0] & /*data, valid*/ 32896) {
			$$invalidate(36, confidence = data ? predictability(data, valid) : null);
		}

		if ($$self.$$.dirty[0] & /*data, valid*/ 32896) {
			$$invalidate(62, profileRows = data ? verticalProfile(data, valid) : []);
		}

		if ($$self.$$.dirty[2] & /*profileRows*/ 1) {
			$$invalidate(19, hodo = profileRows.filter(p => p.belowGround === false).map(p => ({ ...p, ...windComponents(p.wind, p.dir) })).filter(p => finite(p.u) && finite(p.v)));
		}

		if ($$self.$$.dirty[0] & /*hodo*/ 524288) {
			$$invalidate(35, hodoScale = Math.max(20, ...hodo.map(p => Math.max(Math.abs(p.u), Math.abs(p.v)))) * 1.1);
		}

		if ($$self.$$.dirty[0] & /*valid*/ 32768 | $$self.$$.dirty[1] & /*fields*/ 1073741824) {
			$$invalidate(34, coverage = requirements.map(([label, key, note]) => ({
				label,
				key,
				note,
				available: !!(key && fields.some(f => f.key === key && finite(at(f, valid))))
			})));
		}

		if ($$self.$$.dirty[0] & /*location, favorites*/ 8193) {
			$$invalidate(33, isFavorite = !!location && favorites.some(p => Math.abs(p.lat - location.lat) < 0.0001 && Math.abs(p.lon - location.lon) < 0.0001));
		}

		if ($$self.$$.dirty[0] & /*slots, data*/ 131200) {
			$$invalidate(18, trendValues = slots.map(t => value(data, 'temperature', t)).filter(finite));
		}

		if ($$self.$$.dirty[0] & /*trendValues*/ 262144) {
			$$invalidate(32, trendMin = trendValues.length ? Math.min(...trendValues) - 1 : 0);
		}

		if ($$self.$$.dirty[0] & /*trendValues*/ 262144) {
			$$invalidate(31, trendMax = trendValues.length ? Math.max(...trendValues) + 1 : 1);
		}

		if ($$self.$$.dirty[0] & /*slots, data*/ 131200) {
			$$invalidate(60, rainValues = slots.map(t => value(data, 'precipAmount', t)).filter(finite));
		}

		if ($$self.$$.dirty[1] & /*rainValues*/ 536870912) {
			$$invalidate(16, rainPeak = rainValues.length ? Math.max(...rainValues) : null);
		}

		if ($$self.$$.dirty[0] & /*rainPeak*/ 65536) {
			$$invalidate(30, rainMax = Math.max(1, rainPeak || 0));
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
		select2_change_handler,
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
			instance$4,
			create_fragment$4,
			safe_not_equal,
			{
				location: 0,
				timestamp: 57,
				load: 58,
				onLocation: 1,
				onTime: 59,
				demo: 2,
				mapModel: 3,
				placeName: 4,
				winterComponent: 5
			},
			add_css$3,
			[-1, -1, -1, -1, -1, -1]
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
    if (cm < 0.05) return 'None';
    if (units === 'imperial') {
        const value = cmToInches(cm);
        return value < 4 ? `${value.toFixed(1).replace(/\.0$/, '')} in` : `${Math.round(value)} in`;
    }
    return cm < 10 ? `${cm.toFixed(1).replace(/\.0$/, '')} cm` : `${Math.round(cm)} cm`;
}
function formatPrecip(mm3h, units) {
    if (mm3h === null || !Number.isFinite(mm3h)) return '—';
    const hourly = mm3h;
    if (units === 'imperial') {
        const value = mmToInches(hourly);
        return `${value < 0.1 ? value.toFixed(2) : value.toFixed(1)} in/3h`;
    }
    return `${hourly < 10 ? hourly.toFixed(2).replace(/\.?0+$/, '') : Math.round(hourly)} mm/3h`;
}
function formatTemperature(c, units, digits = 1) {
    if (c === null || !Number.isFinite(c)) return '—';
    const value = units === 'imperial' ? cToF(c) : c;
    return `${value.toFixed(digits)}°${units === 'imperial' ? 'F' : 'C'}`;
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
	append_styles(target, "svelte-4a5zwy", ".sounding-shell.svelte-4a5zwy.svelte-4a5zwy{position:fixed;z-index:10025;width:min(390px, calc(100vw - 12px));padding:10px 11px;border:1px solid rgba(139, 213, 244, 0.34);border-radius:13px;background:linear-gradient(180deg, rgba(14, 23, 30, 0.995), rgba(8, 15, 20, 0.995));color:#fff;box-shadow:0 16px 42px rgba(0, 0, 0, 0.56)}.sounding-shell.sounding-embedded.svelte-4a5zwy.svelte-4a5zwy{position:relative;left:auto!important;top:auto!important;z-index:auto;width:100%;box-sizing:border-box;padding:0;border:0;border-radius:0;background:transparent;box-shadow:none}.sounding-shell.sounding-embedded.svelte-4a5zwy .sounding-hover.svelte-4a5zwy{top:54px;right:10px}.sounding-embedded.svelte-4a5zwy .embedded-head.svelte-4a5zwy{justify-content:flex-end;margin-bottom:4px}.sounding-embedded.svelte-4a5zwy .sounding-viewport.svelte-4a5zwy{max-height:none;overflow:hidden;cursor:default}.sounding-embedded.svelte-4a5zwy .sounding-viewport.zoomed.svelte-4a5zwy{max-height:56vh;overflow:auto;cursor:grab}.head.svelte-4a5zwy.svelte-4a5zwy{display:flex;justify-content:space-between;gap:8px}.head.svelte-4a5zwy>div.svelte-4a5zwy:first-child{min-width:0;flex:1}.head.svelte-4a5zwy b.svelte-4a5zwy{display:block;font-size:14px}.head.svelte-4a5zwy small.svelte-4a5zwy,.head.svelte-4a5zwy em.svelte-4a5zwy{display:block;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-style:normal}.head.svelte-4a5zwy small.svelte-4a5zwy{margin-top:2px;color:#a8b7c0;font-size:8px}.head.svelte-4a5zwy em.svelte-4a5zwy{margin-top:2px;color:#6ecdf2;font-size:7.5px}.actions.svelte-4a5zwy.svelte-4a5zwy{display:flex;gap:3px;align-items:flex-start}.actions.svelte-4a5zwy button.svelte-4a5zwy{min-width:25px;height:27px;padding:0 5px;border:1px solid rgba(255, 255, 255, 0.09);border-radius:7px;background:rgba(255, 255, 255, 0.07);color:#fff;font-size:13px;font-weight:800;cursor:pointer}.actions.svelte-4a5zwy button.svelte-4a5zwy:hover{background:rgba(105, 212, 255, 0.14)}.actions.svelte-4a5zwy .png.svelte-4a5zwy{font-size:7px;padding:0 6px}.actions.svelte-4a5zwy .zoom-readout.svelte-4a5zwy{min-width:43px;font-size:7px}.drag.svelte-4a5zwy.svelte-4a5zwy{cursor:grab!important;touch-action:none}.phase-banner.svelte-4a5zwy.svelte-4a5zwy{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:2px 8px;margin-top:5px;padding:7px 9px;border:1px solid rgba(255, 255, 255, 0.08);border-left:3px solid #82939d;border-radius:8px;background:rgba(255, 255, 255, 0.035)}.phase-banner.svelte-4a5zwy small.svelte-4a5zwy{grid-row:0.33333333;color:#7e8f99;font-size:6px;text-transform:uppercase;letter-spacing:0.3px}.phase-banner.svelte-4a5zwy b.svelte-4a5zwy{font-size:10px}.phase-banner.snow.svelte-4a5zwy.svelte-4a5zwy{border-left-color:#f4f7fb}.phase-banner.wet-snow.svelte-4a5zwy.svelte-4a5zwy{border-left-color:#6bd47f}.phase-banner.mix.svelte-4a5zwy.svelte-4a5zwy{border-left-color:#f2d84f}.phase-banner.rain.svelte-4a5zwy.svelte-4a5zwy{border-left-color:#4f82ff}.phase-banner.ice.svelte-4a5zwy.svelte-4a5zwy{border-left-color:#a8753e}.phase-banner.freezing-rain.svelte-4a5zwy.svelte-4a5zwy{border-left-color:#a867e8}.phase-banner.dry.svelte-4a5zwy.svelte-4a5zwy{opacity:0.82}.sounding-viewport.svelte-4a5zwy.svelte-4a5zwy{max-height:430px;overflow:auto;margin-top:6px;border-radius:9px;overscroll-behavior:contain;touch-action:none;cursor:grab;scrollbar-width:thin}.sounding-viewport.svelte-4a5zwy.svelte-4a5zwy:active{cursor:grabbing}.sounding-viewport.svelte-4a5zwy.svelte-4a5zwy:focus-visible{outline:1px solid rgba(105, 212, 255, 0.55);outline-offset:2px}.sounding-viewport.svelte-4a5zwy svg.svelte-4a5zwy{display:block;min-width:100%;height:auto;margin:0;transform-origin:top left;user-select:none;-webkit-user-select:none}.plot-bg.svelte-4a5zwy.svelte-4a5zwy{fill:#0d171d;stroke:#263a46}.terrain-zone.svelte-4a5zwy.svelte-4a5zwy{fill:rgba(255, 174, 86, 0.08)}.terrain-line.svelte-4a5zwy.svelte-4a5zwy{stroke:#ffae56;stroke-width:1.5;stroke-dasharray:5 4}.terrain-text.svelte-4a5zwy.svelte-4a5zwy{fill:#ffbd75;font-size:7px}.snowline-marker.svelte-4a5zwy.svelte-4a5zwy{stroke:#69d4ff;stroke-width:1.5;stroke-dasharray:4 3}.snowline-tag-bg.svelte-4a5zwy.svelte-4a5zwy{fill:rgba(16, 43, 54, 0.94)}.snowline-tag.svelte-4a5zwy.svelte-4a5zwy{fill:#aeeaff;font-size:7px;font-weight:800}.temp-grid.svelte-4a5zwy.svelte-4a5zwy{stroke:rgba(154, 181, 196, 0.1)}.temp-grid.zero.svelte-4a5zwy.svelte-4a5zwy{stroke:rgba(117, 202, 239, 0.5);stroke-width:1.3}.pressure-grid.svelte-4a5zwy.svelte-4a5zwy{stroke:rgba(154, 181, 196, 0.12)}.axis.svelte-4a5zwy.svelte-4a5zwy{fill:#758995;font-size:7px;font-family:sans-serif}.temp-line.svelte-4a5zwy.svelte-4a5zwy{fill:none;stroke:#ff765f;stroke-width:2.4}.dew-line.svelte-4a5zwy.svelte-4a5zwy{fill:none;stroke:#72d98b;stroke-width:2.1}.wetbulb-line.svelte-4a5zwy.svelte-4a5zwy{fill:none;stroke:#69d4ff;stroke-width:1.7;stroke-dasharray:4 3}.temp-dot.svelte-4a5zwy.svelte-4a5zwy{fill:#ff765f}.dew-dot.svelte-4a5zwy.svelte-4a5zwy{fill:#72d98b}.key.svelte-4a5zwy.svelte-4a5zwy{display:flex;flex-wrap:wrap;gap:5px 10px;margin:4px 2px 6px;color:#a0b0ba;font-size:7px}.key.svelte-4a5zwy span.svelte-4a5zwy{display:flex;align-items:center;gap:4px}.key.svelte-4a5zwy i.svelte-4a5zwy{display:inline-block;width:13px;border-top:2px solid}.key.svelte-4a5zwy .t.svelte-4a5zwy{border-color:#ff765f}.key.svelte-4a5zwy .d.svelte-4a5zwy{border-color:#72d98b}.key.svelte-4a5zwy .w.svelte-4a5zwy{border-color:#69d4ff;border-top-style:dashed}.key.svelte-4a5zwy .z.svelte-4a5zwy{border-color:#75caef}.stats.svelte-4a5zwy.svelte-4a5zwy{display:grid;grid-template-columns:repeat(2, 1fr);gap:4px}.stats.svelte-4a5zwy span.svelte-4a5zwy{padding:5px 2px;border-radius:7px;background:rgba(255, 255, 255, 0.035);text-align:center}.stats.svelte-4a5zwy small.svelte-4a5zwy{display:block;color:#71838e;font-size:5.6px}.stats.svelte-4a5zwy b.svelte-4a5zwy{display:block;margin-top:2px;font-size:6.7px;white-space:nowrap}.hint.svelte-4a5zwy.svelte-4a5zwy{margin-top:5px;color:#60717b;font-size:6.2px;text-align:center}.empty.svelte-4a5zwy.svelte-4a5zwy{padding:30px 8px;text-align:center;color:#82939d;font-size:9px}@media(max-width: 520px){.sounding-shell.svelte-4a5zwy.svelte-4a5zwy{width:calc(100vw - 12px);padding:9px}.head.svelte-4a5zwy small.svelte-4a5zwy,.head.svelte-4a5zwy em.svelte-4a5zwy{max-width:125px}.stats.svelte-4a5zwy b.svelte-4a5zwy{font-size:6.3px}.sounding-viewport.svelte-4a5zwy.svelte-4a5zwy{max-height:55vh}.actions.svelte-4a5zwy.svelte-4a5zwy{gap:2px}.actions.svelte-4a5zwy button.svelte-4a5zwy{min-width:24px;height:26px}.actions.svelte-4a5zwy .png.svelte-4a5zwy{display:none !important}.actions.svelte-4a5zwy .zoom-readout.svelte-4a5zwy{min-width:38px}}.hover-level.svelte-4a5zwy.svelte-4a5zwy{stroke:rgba(255, 255, 255, 0.58);stroke-width:1;stroke-dasharray:2 2}.hover-temp.svelte-4a5zwy.svelte-4a5zwy{fill:#0d171d;stroke:#ff765f;stroke-width:2}.hover-dew.svelte-4a5zwy.svelte-4a5zwy{fill:#0d171d;stroke:#72d98b;stroke-width:2}.hover-wet.svelte-4a5zwy.svelte-4a5zwy{fill:#0d171d;stroke:#69d4ff;stroke-width:2}.sounding-hover.svelte-4a5zwy.svelte-4a5zwy{position:absolute;z-index:6;top:78px;right:14px;display:grid;grid-template-columns:repeat(3, auto);gap:4px 8px;width:160px;max-width:calc(100% - 28px);box-sizing:border-box;padding:7px 8px;border:1px solid rgba(255, 255, 255, 0.16);border-radius:8px;background:rgba(5, 10, 14, 0.96);box-shadow:0 8px 22px rgba(0, 0, 0, 0.48);pointer-events:none}.sounding-hover.svelte-4a5zwy b.svelte-4a5zwy{grid-column:-1;color:#eaf5fa;font-size:8px}.sounding-hover.svelte-4a5zwy span.svelte-4a5zwy{color:#aebcc4;font-size:7px;font-weight:750}.actions.svelte-4a5zwy .png.svelte-4a5zwy{display:inline-block !important;font-size:10px}.actions.svelte-4a5zwy button.svelte-4a5zwy{min-height:32px}.stats.svelte-4a5zwy small.svelte-4a5zwy{font-size:10px}.stats.svelte-4a5zwy b.svelte-4a5zwy{font-size:12px}.hint.svelte-4a5zwy.svelte-4a5zwy{font-size:10px}");
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
			attr(b, "class", "svelte-4a5zwy");
			attr(small, "class", "svelte-4a5zwy");
			attr(em, "class", "svelte-4a5zwy");
			attr(div, "class", "svelte-4a5zwy");
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
			attr(button0, "class", "drag svelte-4a5zwy");
			attr(button0, "type", "button");
			attr(button0, "title", "Drag sounding window");
			attr(button0, "aria-label", "Drag sounding window");
			attr(button1, "type", "button");
			attr(button1, "title", "Close");
			attr(button1, "aria-label", "Close sounding");
			attr(button1, "class", "svelte-4a5zwy");
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
			attr(div, "class", "empty svelte-4a5zwy");
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
			div2.innerHTML = `<span class="svelte-4a5zwy"><i class="t svelte-4a5zwy"></i>Temp</span> <span class="svelte-4a5zwy"><i class="d svelte-4a5zwy"></i>Dew point</span> <span class="svelte-4a5zwy"><i class="w svelte-4a5zwy"></i>Wet bulb</span> <span class="svelte-4a5zwy"><i class="z svelte-4a5zwy"></i>0°C</span>`;
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
			attr(small0, "class", "svelte-4a5zwy");
			attr(b0, "class", "svelte-4a5zwy");
			attr(div0, "class", "phase-banner svelte-4a5zwy");
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
			attr(rect, "class", "plot-bg svelte-4a5zwy");
			attr(polyline0, "points", polyline0_points_value = /*sounding*/ ctx[3].tempPoints);
			attr(polyline0, "class", "temp-line svelte-4a5zwy");
			attr(polyline1, "points", polyline1_points_value = /*sounding*/ ctx[3].dewPoints);
			attr(polyline1, "class", "dew-line svelte-4a5zwy");
			attr(polyline2, "points", polyline2_points_value = /*sounding*/ ctx[3].wetBulbPoints);
			attr(polyline2, "class", "wetbulb-line svelte-4a5zwy");
			attr(svg, "viewBox", "0 0 330 390");
			attr(svg, "role", "img");
			attr(svg, "aria-label", "Temperature, dew point and wet-bulb vertical profile");
			attr(svg, "style", svg_style_value = `width:${/*zoom*/ ctx[8] * 100}%;`);
			attr(svg, "class", "svelte-4a5zwy");
			attr(div1, "class", "sounding-viewport svelte-4a5zwy");
			attr(div1, "tabindex", "0");
			attr(div1, "role", "application");
			attr(div1, "aria-label", "Zoomable forecast sounding");
			toggle_class(div1, "zoomed", /*zoom*/ ctx[8] > 1.001);
			attr(div2, "class", "key svelte-4a5zwy");
			attr(small1, "class", "svelte-4a5zwy");
			attr(b1, "class", "svelte-4a5zwy");
			attr(span4, "class", "svelte-4a5zwy");
			attr(small2, "class", "svelte-4a5zwy");
			attr(b2, "class", "svelte-4a5zwy");
			attr(span5, "class", "svelte-4a5zwy");
			attr(div3, "class", "stats svelte-4a5zwy");
			attr(div4, "class", "hint svelte-4a5zwy");
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
			attr(line, "class", "temp-grid svelte-4a5zwy");
			toggle_class(line, "zero", /*g*/ ctx[51].value === 0);
			attr(text_1, "x", text_1_x_value = /*g*/ ctx[51].x);
			attr(text_1, "y", "360");
			attr(text_1, "text-anchor", "middle");
			attr(text_1, "class", "axis svelte-4a5zwy");
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
			attr(line, "class", "pressure-grid svelte-4a5zwy");
			attr(text_1, "x", "42");
			attr(text_1, "y", text_1_y_value = /*g*/ ctx[51].y + 3);
			attr(text_1, "text-anchor", "end");
			attr(text_1, "class", "axis svelte-4a5zwy");
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
			attr(rect, "class", "terrain-zone svelte-4a5zwy");
			attr(line, "x1", "48");
			attr(line, "x2", "310");
			attr(line, "y1", line_y__value = /*sounding*/ ctx[3].terrainY);
			attr(line, "y2", line_y__value_1 = /*sounding*/ ctx[3].terrainY);
			attr(line, "class", "terrain-line svelte-4a5zwy");
			attr(text_1, "x", "306");
			attr(text_1, "y", text_1_y_value = Math.max(31, /*sounding*/ ctx[3].terrainY - 4));
			attr(text_1, "text-anchor", "end");
			attr(text_1, "class", "terrain-text svelte-4a5zwy");
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
			attr(line, "class", "snowline-marker svelte-4a5zwy");
			attr(rect, "x", "222");
			attr(rect, "y", rect_y_value = Math.max(24, /*sounding*/ ctx[3].snowlineY - 10));
			attr(rect, "width", "84");
			attr(rect, "height", "12");
			attr(rect, "rx", "3");
			attr(rect, "class", "snowline-tag-bg svelte-4a5zwy");
			attr(text_1, "x", "302");
			attr(text_1, "y", text_1_y_value = Math.max(33, /*sounding*/ ctx[3].snowlineY - 1));
			attr(text_1, "text-anchor", "end");
			attr(text_1, "class", "snowline-tag svelte-4a5zwy");
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
			attr(circle0, "class", "temp-dot svelte-4a5zwy");
			attr(circle1, "cx", circle1_cx_value = /*n*/ ctx[48].dx);
			attr(circle1, "cy", circle1_cy_value = /*n*/ ctx[48].y);
			attr(circle1, "r", "2");
			attr(circle1, "class", "dew-dot svelte-4a5zwy");
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
			attr(line, "class", "hover-level svelte-4a5zwy");
			attr(circle0, "cx", circle0_cx_value = /*hoverNode*/ ctx[10].tx);
			attr(circle0, "cy", circle0_cy_value = /*hoverNode*/ ctx[10].y);
			attr(circle0, "r", "4");
			attr(circle0, "class", "hover-temp svelte-4a5zwy");
			attr(circle1, "cx", circle1_cx_value = /*hoverNode*/ ctx[10].dx);
			attr(circle1, "cy", circle1_cy_value = /*hoverNode*/ ctx[10].y);
			attr(circle1, "r", "4");
			attr(circle1, "class", "hover-dew svelte-4a5zwy");
			attr(circle2, "cx", circle2_cx_value = /*hoverNode*/ ctx[10].wx);
			attr(circle2, "cy", circle2_cy_value = /*hoverNode*/ ctx[10].y);
			attr(circle2, "r", "4");
			attr(circle2, "class", "hover-wet svelte-4a5zwy");
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
			attr(b, "class", "svelte-4a5zwy");
			attr(span0, "class", "svelte-4a5zwy");
			attr(span1, "class", "svelte-4a5zwy");
			attr(span2, "class", "svelte-4a5zwy");
			attr(div, "class", "sounding-hover svelte-4a5zwy");
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
			attr(button0, "class", "png svelte-4a5zwy");
			attr(button0, "type", "button");
			button0.disabled = /*pngBusy*/ ctx[9];
			attr(button1, "type", "button");
			attr(button1, "title", "Zoom out");
			attr(button1, "aria-label", "Zoom out");
			attr(button1, "class", "svelte-4a5zwy");
			attr(button2, "class", "zoom-readout svelte-4a5zwy");
			attr(button2, "type", "button");
			attr(button2, "title", "Fit sounding");
			attr(button2, "aria-label", "Fit sounding");
			attr(button3, "type", "button");
			attr(button3, "title", "Zoom in");
			attr(button3, "aria-label", "Zoom in");
			attr(button3, "class", "svelte-4a5zwy");
			attr(div0, "class", "actions svelte-4a5zwy");
			attr(div1, "class", "head svelte-4a5zwy");
			toggle_class(div1, "embedded-head", /*embedded*/ ctx[1]);
			attr(div2, "class", "sounding-shell svelte-4a5zwy");
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
	append_styles(target, "svelte-lr0mcm", ".chart-shell.svelte-lr0mcm.svelte-lr0mcm{position:fixed;z-index:10020;width:min(430px, calc(100vw - 16px));padding:11px 12px 10px;border:1px solid rgba(98, 213, 255, 0.35);border-radius:14px;background:linear-gradient(180deg, rgba(15, 24, 31, 0.99), rgba(9, 17, 23, 0.99));color:white;box-shadow:0 16px 42px rgba(0, 0, 0, 0.56);backdrop-filter:blur(6px)}.chart-head.svelte-lr0mcm.svelte-lr0mcm{display:flex;align-items:flex-start;justify-content:space-between;gap:10px}.chart-title.svelte-lr0mcm.svelte-lr0mcm{min-width:0;flex:1}.chart-title.svelte-lr0mcm b.svelte-lr0mcm{display:block;font-size:15px}.chart-title.svelte-lr0mcm small.svelte-lr0mcm,.chart-title.svelte-lr0mcm em.svelte-lr0mcm{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-style:normal}.chart-title.svelte-lr0mcm small.svelte-lr0mcm{margin-top:3px;color:#a5b4bd;font-size:9px}.chart-title.svelte-lr0mcm em.svelte-lr0mcm{margin-top:2px;color:#70cef4;font-size:8px}.chart-actions.svelte-lr0mcm.svelte-lr0mcm{display:flex;gap:4px}.chart-actions.svelte-lr0mcm button.svelte-lr0mcm{height:26px;min-width:26px;padding:0 7px;border:1px solid rgba(255, 255, 255, 0.08);border-radius:7px;background:rgba(255, 255, 255, 0.075);color:#fff;font-size:12px;font-weight:800;cursor:pointer}.chart-actions.svelte-lr0mcm button.svelte-lr0mcm:hover{background:rgba(98, 213, 255, 0.15)}.png-button.svelte-lr0mcm.svelte-lr0mcm{font-size:8px !important}.drag-button.svelte-lr0mcm.svelte-lr0mcm{cursor:grab!important;touch-action:none}.forecast-tabs.svelte-lr0mcm.svelte-lr0mcm{display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-top:8px;padding:3px;border-radius:8px;background:rgba(255, 255, 255, 0.035)}.forecast-tabs.svelte-lr0mcm button.svelte-lr0mcm{height:27px;border:0;border-radius:6px;background:transparent;color:#82939d;font-size:9px;font-weight:800;cursor:pointer}.forecast-tabs.svelte-lr0mcm button.active.svelte-lr0mcm{background:rgba(98, 213, 255, 0.13);color:#eaf7fc;box-shadow:inset 0 0 0 1px rgba(98, 213, 255, 0.22)}.plot-wrap.svelte-lr0mcm.svelte-lr0mcm{position:relative;margin-top:5px}svg.svelte-lr0mcm.svelte-lr0mcm{display:block;width:100%;height:auto;overflow:visible;touch-action:none}.plot-bg.svelte-lr0mcm.svelte-lr0mcm,.band-bg.svelte-lr0mcm.svelte-lr0mcm{fill:rgba(255, 255, 255, 0.022);stroke:rgba(104, 151, 177, 0.22);stroke-width:1}.terrain-zone.svelte-lr0mcm.svelte-lr0mcm{fill:rgba(55, 190, 232, 0.085)}.grid.svelte-lr0mcm.svelte-lr0mcm{stroke:rgba(160, 196, 216, 0.13)}.axis.svelte-lr0mcm.svelte-lr0mcm{fill:#8fa1ac;font-size:8px;font-family:sans-serif}.section-label.svelte-lr0mcm.svelte-lr0mcm{fill:#cbd8df;font-size:6.8px;font-family:sans-serif;font-weight:800;letter-spacing:0.35px}.section-label.svelte-lr0mcm tspan.svelte-lr0mcm{fill:#657681;font-weight:500}.snowline-title.svelte-lr0mcm.svelte-lr0mcm{fill:#cfeefb}.precip-title.svelte-lr0mcm.svelte-lr0mcm,.precip-axis.svelte-lr0mcm.svelte-lr0mcm{fill:#64d4f5}.phase-title.svelte-lr0mcm.svelte-lr0mcm{fill:#d9c75e}.snow-title.svelte-lr0mcm.svelte-lr0mcm,.snow-axis.svelte-lr0mcm.svelte-lr0mcm{fill:#82e398}.terrain-line.svelte-lr0mcm.svelte-lr0mcm{stroke:#ffae56;stroke-width:1.5;stroke-dasharray:5 4}.terrain-tag.svelte-lr0mcm.svelte-lr0mcm{fill:#ffbd75;font-size:6px;font-family:sans-serif}.snowline-line.svelte-lr0mcm.svelte-lr0mcm{fill:none;stroke:#65d5ff;stroke-width:2.7;stroke-linecap:round;stroke-linejoin:round}.min24-line.svelte-lr0mcm.svelte-lr0mcm{stroke:#9fe9ff;stroke-width:1;stroke-dasharray:2 3}.min24-dot.svelte-lr0mcm.svelte-lr0mcm{fill:#0d151b;stroke:#9fe9ff;stroke-width:2}.min24-tag.svelte-lr0mcm.svelte-lr0mcm{fill:#bdefff;font-size:5.8px;font-family:sans-serif;font-weight:800}.now-line.svelte-lr0mcm.svelte-lr0mcm{stroke:#ff6658;stroke-width:1.25}.now-tag-bg.svelte-lr0mcm.svelte-lr0mcm{fill:#ff6658}.now-tag.svelte-lr0mcm.svelte-lr0mcm{fill:#fff;font-size:7px;font-family:sans-serif;font-weight:800}.cursor.svelte-lr0mcm.svelte-lr0mcm{stroke:#b9c6cd;stroke-width:1;stroke-dasharray:2 3}.current-dot.svelte-lr0mcm.svelte-lr0mcm{fill:#fff;stroke:#65d5ff;stroke-width:2.3}.crossing-line.svelte-lr0mcm.svelte-lr0mcm{stroke:#ffe05b;stroke-width:1.3;stroke-dasharray:3 3;cursor:pointer}.crossing-dot.svelte-lr0mcm.svelte-lr0mcm{fill:#12191f;stroke:#ffe05b;stroke-width:2.1;cursor:pointer}.inspect-line.svelte-lr0mcm.svelte-lr0mcm{stroke:#83939d}.precip-bar.svelte-lr0mcm.svelte-lr0mcm{fill:#3f9fbe;opacity:0.72}.precip-bar.wet.svelte-lr0mcm.svelte-lr0mcm{fill:#67d6f5;opacity:0.96}.phase-base.svelte-lr0mcm.svelte-lr0mcm{fill:#0b1419}.phase-block.svelte-lr0mcm.svelte-lr0mcm{opacity:0.94}.phase-snow.svelte-lr0mcm.svelte-lr0mcm{fill:#f4f7fb}.phase-wet-snow.svelte-lr0mcm.svelte-lr0mcm{fill:#6bd47f}.phase-mix.svelte-lr0mcm.svelte-lr0mcm{fill:#f2d84f}.phase-rain.svelte-lr0mcm.svelte-lr0mcm{fill:#4f82ff}.phase-ice-pellets.svelte-lr0mcm.svelte-lr0mcm{fill:#a8753e}.phase-freezing-rain.svelte-lr0mcm.svelte-lr0mcm{fill:#a867e8}.phase-legend-svg.svelte-lr0mcm text.svelte-lr0mcm{fill:#d4dfe6;font-size:9px;font-family:sans-serif}.new-snow-area.svelte-lr0mcm.svelte-lr0mcm{fill:#82e398;opacity:0.16}.new-snow-line.svelte-lr0mcm.svelte-lr0mcm{fill:none;stroke:#82e398;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}.empty-band.svelte-lr0mcm.svelte-lr0mcm{fill:#778993;font-size:7px;font-family:sans-serif}.tooltip.svelte-lr0mcm.svelte-lr0mcm{position:absolute;z-index:4;min-width:176px;transform:translateX(-50%);padding:7px 9px;border-radius:9px;background:rgba(5, 12, 17, 0.99);border:1px solid rgba(98, 213, 255, 0.25);box-shadow:0 7px 20px rgba(0, 0, 0, 0.44);pointer-events:none}.tooltip.svelte-lr0mcm>b.svelte-lr0mcm{display:block;font-size:8.8px}.tooltip.svelte-lr0mcm>strong.svelte-lr0mcm{display:flex;align-items:center;gap:5px;margin:4px 0 5px;font-size:9.2px}.tip-phase-dot.svelte-lr0mcm.svelte-lr0mcm,.current-phase-dot.svelte-lr0mcm.svelte-lr0mcm{display:inline-block;width:8px;height:8px;border-radius:2px;flex:0 0 auto}.tip-grid.svelte-lr0mcm.svelte-lr0mcm{display:grid;grid-template-columns:1fr 1fr;gap:4px 9px}.tip-grid.svelte-lr0mcm span.svelte-lr0mcm{font-size:7.3px;color:#8fa0aa}.tip-grid.svelte-lr0mcm b.svelte-lr0mcm{color:#eaf3f7;font-weight:800}.text-snow.svelte-lr0mcm.svelte-lr0mcm{color:#f4f7fb}.text-wet-snow.svelte-lr0mcm.svelte-lr0mcm{color:#6bd47f}.text-mix.svelte-lr0mcm.svelte-lr0mcm{color:#f2d84f}.text-rain.svelte-lr0mcm.svelte-lr0mcm{color:#4f82ff}.text-ice-pellets.svelte-lr0mcm.svelte-lr0mcm{color:#c08a50}.text-freezing-rain.svelte-lr0mcm.svelte-lr0mcm{color:#bf83f4}.current-card.svelte-lr0mcm.svelte-lr0mcm{margin-top:3px;padding:7px;border:1px solid rgba(255, 255, 255, 0.07);border-left:3px solid rgba(255, 255, 255, 0.28);border-radius:9px;background:rgba(255, 255, 255, 0.028)}.active-snow.svelte-lr0mcm.svelte-lr0mcm{border-left-color:#f4f7fb}.active-wet-snow.svelte-lr0mcm.svelte-lr0mcm{border-left-color:#6bd47f}.active-mix.svelte-lr0mcm.svelte-lr0mcm{border-left-color:#f2d84f}.active-rain.svelte-lr0mcm.svelte-lr0mcm{border-left-color:#4f82ff}.active-ice-pellets.svelte-lr0mcm.svelte-lr0mcm{border-left-color:#a8753e}.active-freezing-rain.svelte-lr0mcm.svelte-lr0mcm{border-left-color:#a867e8}.current-type.svelte-lr0mcm.svelte-lr0mcm{text-align:center}.current-type.svelte-lr0mcm b.svelte-lr0mcm{display:flex;align-items:center;justify-content:center;gap:6px;font-size:11px}.current-type.svelte-lr0mcm strong.svelte-lr0mcm{display:block;margin-top:3px;color:#81dfff;font-size:7.3px}.metrics.svelte-lr0mcm.svelte-lr0mcm{display:grid;grid-template-columns:repeat(2, 1fr);gap:4px;margin-top:6px}.metrics.svelte-lr0mcm span.svelte-lr0mcm{padding:5px 2px;border-radius:7px;background:rgba(255, 255, 255, 0.035);text-align:center;min-width:0}.metrics.svelte-lr0mcm small.svelte-lr0mcm{display:block;color:#7f909a;font-size:5.8px}.metrics.svelte-lr0mcm b.svelte-lr0mcm{display:block;margin-top:1px;font-size:7px;white-space:nowrap}.outlook24.svelte-lr0mcm.svelte-lr0mcm{display:grid;grid-template-columns:auto 1fr;gap:3px 8px;margin-top:6px;padding:6px 8px;border-radius:8px;background:rgba(98, 213, 255, 0.06);border:1px solid rgba(98, 213, 255, 0.11)}.outlook24.svelte-lr0mcm>b.svelte-lr0mcm{grid-row:0.33333333;color:#8fdfff;font-size:7px;text-transform:uppercase;letter-spacing:0.3px}.outlook24.svelte-lr0mcm span.svelte-lr0mcm{color:#dceaf0;font-size:7.5px;font-weight:700}.outlook24.svelte-lr0mcm button.svelte-lr0mcm{justify-self:start;padding:2px 0;border:0;background:transparent;color:#f1d67d;font-size:7px;font-weight:800;cursor:pointer}.outlook24.svelte-lr0mcm button.svelte-lr0mcm:hover{color:#fff2ae;text-decoration:underline}.note.svelte-lr0mcm.svelte-lr0mcm{margin-top:4px;color:#d7bc4e;font-size:7.2px;text-align:center}.hint.svelte-lr0mcm.svelte-lr0mcm{margin-top:5px;color:#66757e;font-size:6.7px;text-align:center}.empty.svelte-lr0mcm.svelte-lr0mcm{padding:25px 8px;text-align:center;color:#8a9aa4;font-size:10px}@media(max-width: 520px){.chart-shell.svelte-lr0mcm.svelte-lr0mcm{width:calc(100vw - 12px);padding:9px;border-radius:12px}.png-button.svelte-lr0mcm.svelte-lr0mcm{display:none !important}.chart-title.svelte-lr0mcm small.svelte-lr0mcm,.chart-title.svelte-lr0mcm em.svelte-lr0mcm{max-width:180px}.metrics.svelte-lr0mcm.svelte-lr0mcm{gap:3px}.metrics.svelte-lr0mcm small.svelte-lr0mcm{font-size:5.3px}.metrics.svelte-lr0mcm b.svelte-lr0mcm{font-size:6.4px}.tooltip.svelte-lr0mcm.svelte-lr0mcm{min-width:158px}.outlook24.svelte-lr0mcm span.svelte-lr0mcm,.outlook24.svelte-lr0mcm button.svelte-lr0mcm{font-size:6.6px}}.event-head.svelte-lr0mcm.svelte-lr0mcm,.elevation-head.svelte-lr0mcm.svelte-lr0mcm{display:flex;align-items:center;justify-content:space-between;gap:8px}.confidence.svelte-lr0mcm.svelte-lr0mcm{padding:2px 5px;border-radius:8px;font-size:6.5px;font-style:normal;font-weight:850}.confidence-high.svelte-lr0mcm.svelte-lr0mcm{background:rgba(96, 211, 139, 0.12);color:#87e5aa}.confidence-medium.svelte-lr0mcm.svelte-lr0mcm{background:rgba(255, 209, 84, 0.12);color:#f5d76d}.confidence-low.svelte-lr0mcm.svelte-lr0mcm{background:rgba(255, 136, 104, 0.12);color:#ffad96}.event-hazard.svelte-lr0mcm.svelte-lr0mcm{border-color:rgba(193, 132, 255, 0.38) !important;box-shadow:inset 3px 0 rgba(193, 132, 255, 0.8)}.event-timeline.svelte-lr0mcm.svelte-lr0mcm{display:grid;grid-template-columns:repeat(3, 1fr);gap:4px;margin-top:3px}.elevation-impact.svelte-lr0mcm.svelte-lr0mcm{margin-top:6px;padding:7px;border:1px solid rgba(255, 255, 255, 0.08);border-radius:8px;background:rgba(255, 255, 255, 0.025)}.impact-band.svelte-lr0mcm.svelte-lr0mcm{color:#87a7b7;font-size:6.8px}.impact-band.svelte-lr0mcm.svelte-lr0mcm{margin-top:3px}.elevation-grid.svelte-lr0mcm.svelte-lr0mcm{display:grid;grid-template-columns:repeat(5, 1fr);gap:3px;margin-top:5px}.chart-shell.svelte-lr0mcm.svelte-lr0mcm{box-sizing:border-box;max-height:calc(100dvh - 48px);overflow-y:auto;overscroll-behavior:contain}.chart-head.svelte-lr0mcm.svelte-lr0mcm{position:sticky;top:-11px;z-index:5;padding:8px 0;background:#101a22}.chart-actions.svelte-lr0mcm.svelte-lr0mcm{flex-wrap:wrap;justify-content:flex-end}.chart-actions.svelte-lr0mcm button.svelte-lr0mcm{min-height:32px}.png-button.svelte-lr0mcm.svelte-lr0mcm{display:inline-block !important;font-size:10px !important}.current-type.svelte-lr0mcm b.svelte-lr0mcm{font-size:15px}.current-type.svelte-lr0mcm strong.svelte-lr0mcm{font-size:11px}.metrics.svelte-lr0mcm small.svelte-lr0mcm{font-size:10px}.metrics.svelte-lr0mcm b.svelte-lr0mcm{font-size:13px}.outlook24.svelte-lr0mcm.svelte-lr0mcm{display:flex;flex-direction:column;gap:5px}.outlook24.svelte-lr0mcm>b.svelte-lr0mcm{font-size:10px}.outlook24.svelte-lr0mcm span.svelte-lr0mcm,.outlook24.svelte-lr0mcm button.svelte-lr0mcm{font-size:12px;line-height:1.4}.crossing-action.svelte-lr0mcm.svelte-lr0mcm{width:100%;margin-top:7px;padding:9px;border:1px solid #35515c;border-radius:8px;background:#172932;color:#b7e6f8;text-align:left;font-size:11px;cursor:pointer}.quality-note.svelte-lr0mcm.svelte-lr0mcm{margin-top:6px;color:#edc881;font-size:11px;line-height:1.4}.hint.svelte-lr0mcm.svelte-lr0mcm{font-size:10px;line-height:1.35}.chart-shell.embedded.svelte-lr0mcm.svelte-lr0mcm{position:relative;inset:auto;z-index:0;width:100%;max-width:none;max-height:none;overflow:visible;padding:12px;box-shadow:none;box-sizing:border-box}.embedded.svelte-lr0mcm .chart-title small.svelte-lr0mcm,.embedded.svelte-lr0mcm .chart-title em.svelte-lr0mcm{font-size:11px}.embedded.svelte-lr0mcm .forecast-tabs button.svelte-lr0mcm{min-height:38px}.embedded.svelte-lr0mcm .event-head b.svelte-lr0mcm{font-size:13px}");
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
			attr(button, "class", "now-action svelte-lr0mcm");
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
			attr(button, "class", "png-button svelte-lr0mcm");
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
			attr(button0, "class", "drag-button svelte-lr0mcm");
			attr(button0, "type", "button");
			attr(button0, "title", "Drag graph");
			attr(button0, "aria-label", "Drag graph");
			attr(button1, "type", "button");
			attr(button1, "title", "Close");
			attr(button1, "aria-label", "Close graph");
			attr(button1, "class", "svelte-lr0mcm");
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
			attr(div, "class", "empty svelte-lr0mcm");
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
			attr(tspan0, "class", "svelte-lr0mcm");
			attr(text0, "x", "42");
			attr(text0, "y", "11");
			attr(text0, "class", "section-label snowline-title svelte-lr0mcm");
			attr(rect0, "x", "42");
			attr(rect0, "y", "18");
			attr(rect0, "width", "306");
			attr(rect0, "height", "112");
			attr(rect0, "rx", "8");
			attr(rect0, "class", "plot-bg svelte-lr0mcm");
			attr(line0, "x1", "42");
			attr(line0, "x2", "348");
			attr(line0, "y1", "18");
			attr(line0, "y2", "18");
			attr(line0, "class", "grid svelte-lr0mcm");
			attr(line1, "x1", "42");
			attr(line1, "x2", "348");
			attr(line1, "y1", "74");
			attr(line1, "y2", "74");
			attr(line1, "class", "grid svelte-lr0mcm");
			attr(line2, "x1", "42");
			attr(line2, "x2", "348");
			attr(line2, "y1", "130");
			attr(line2, "y2", "130");
			attr(line2, "class", "grid svelte-lr0mcm");
			attr(text1, "x", "37");
			attr(text1, "y", "22");
			attr(text1, "text-anchor", "end");
			attr(text1, "class", "axis svelte-lr0mcm");
			attr(text2, "x", "37");
			attr(text2, "y", "78");
			attr(text2, "text-anchor", "end");
			attr(text2, "class", "axis svelte-lr0mcm");
			attr(text3, "x", "37");
			attr(text3, "y", "134");
			attr(text3, "text-anchor", "end");
			attr(text3, "class", "axis svelte-lr0mcm");
			attr(path, "d", path_d_value = /*chart*/ ctx[13].points);
			attr(path, "class", "snowline-line svelte-lr0mcm");
			attr(tspan1, "class", "svelte-lr0mcm");
			attr(text4, "x", "42");
			attr(text4, "y", "147");
			attr(text4, "class", "section-label precip-title svelte-lr0mcm");
			attr(rect1, "x", "42");
			attr(rect1, "y", "153");
			attr(rect1, "width", "306");
			attr(rect1, "height", "36");
			attr(rect1, "rx", "7");
			attr(rect1, "class", "band-bg svelte-lr0mcm");
			attr(text5, "x", "42");
			attr(text5, "y", "205");
			attr(text5, "class", "section-label phase-title svelte-lr0mcm");
			attr(rect2, "x", "42");
			attr(rect2, "y", "211");
			attr(rect2, "width", "306");
			attr(rect2, "height", "25");
			attr(rect2, "rx", "7");
			attr(rect2, "class", "band-bg phase-base svelte-lr0mcm");
			attr(rect3, "x", "42");
			attr(rect3, "y", "244");
			attr(rect3, "width", "7");
			attr(rect3, "height", "7");
			attr(rect3, "rx", "1.5");
			attr(rect3, "class", "phase-snow svelte-lr0mcm");
			attr(text6, "x", "53");
			attr(text6, "y", "251");
			attr(text6, "class", "svelte-lr0mcm");
			attr(rect4, "x", "145");
			attr(rect4, "y", "244");
			attr(rect4, "width", "7");
			attr(rect4, "height", "7");
			attr(rect4, "rx", "1.5");
			attr(rect4, "class", "phase-wet-snow svelte-lr0mcm");
			attr(text7, "x", "156");
			attr(text7, "y", "251");
			attr(text7, "class", "svelte-lr0mcm");
			attr(rect5, "x", "246");
			attr(rect5, "y", "244");
			attr(rect5, "width", "7");
			attr(rect5, "height", "7");
			attr(rect5, "rx", "1.5");
			attr(rect5, "class", "phase-mix svelte-lr0mcm");
			attr(text8, "x", "257");
			attr(text8, "y", "251");
			attr(text8, "class", "svelte-lr0mcm");
			attr(rect6, "x", "42");
			attr(rect6, "y", "258");
			attr(rect6, "width", "7");
			attr(rect6, "height", "7");
			attr(rect6, "rx", "1.5");
			attr(rect6, "class", "phase-rain svelte-lr0mcm");
			attr(text9, "x", "53");
			attr(text9, "y", "265");
			attr(text9, "class", "svelte-lr0mcm");
			attr(rect7, "x", "145");
			attr(rect7, "y", "258");
			attr(rect7, "width", "7");
			attr(rect7, "height", "7");
			attr(rect7, "rx", "1.5");
			attr(rect7, "class", "phase-ice-pellets svelte-lr0mcm");
			attr(text10, "x", "156");
			attr(text10, "y", "265");
			attr(text10, "class", "svelte-lr0mcm");
			attr(rect8, "x", "246");
			attr(rect8, "y", "258");
			attr(rect8, "width", "7");
			attr(rect8, "height", "7");
			attr(rect8, "rx", "1.5");
			attr(rect8, "class", "phase-freezing-rain svelte-lr0mcm");
			attr(text11, "x", "257");
			attr(text11, "y", "265");
			attr(text11, "class", "svelte-lr0mcm");
			attr(g, "class", "phase-legend-svg svelte-lr0mcm");
			attr(tspan2, "class", "svelte-lr0mcm");
			attr(text12, "x", "42");
			attr(text12, "y", "282");
			attr(text12, "class", "section-label snow-title svelte-lr0mcm");
			attr(rect9, "x", "42");
			attr(rect9, "y", "288");
			attr(rect9, "width", "306");
			attr(rect9, "height", "28");
			attr(rect9, "rx", "7");
			attr(rect9, "class", "band-bg svelte-lr0mcm");
			attr(svg, "viewBox", "0 0 360 338");
			attr(svg, "role", "img");
			attr(svg, "aria-label", "Terrain-aware wintry forecast through 144 hours");
			attr(svg, "class", "svelte-lr0mcm");
			attr(div0, "class", "plot-wrap svelte-lr0mcm");
			attr(b0, "class", "svelte-lr0mcm");
			attr(div1, "class", "current-type svelte-lr0mcm");
			attr(small0, "class", "svelte-lr0mcm");
			attr(b1, "class", "svelte-lr0mcm");
			attr(span0, "class", "svelte-lr0mcm");
			attr(small1, "class", "svelte-lr0mcm");
			attr(b2, "class", "svelte-lr0mcm");
			attr(span1, "class", "svelte-lr0mcm");
			attr(div2, "class", "metrics svelte-lr0mcm");
			attr(div3, "class", "current-card svelte-lr0mcm");
			toggle_class(div3, "active-snow", /*chart*/ ctx[13].currentPhase?.key === 'snow');
			toggle_class(div3, "active-wet-snow", /*chart*/ ctx[13].currentPhase?.key === 'wet-snow');
			toggle_class(div3, "active-mix", /*chart*/ ctx[13].currentPhase?.key === 'mix');
			toggle_class(div3, "active-rain", /*chart*/ ctx[13].currentPhase?.key === 'rain');
			toggle_class(div3, "active-ice-pellets", /*chart*/ ctx[13].currentPhase?.key === 'ice-pellets');
			toggle_class(div3, "active-freezing-rain", /*chart*/ ctx[13].currentPhase?.key === 'freezing-rain');
			attr(b3, "class", "svelte-lr0mcm");
			attr(div4, "class", "outlook24 event-intelligence svelte-lr0mcm");
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
			attr(rect, "class", "terrain-zone svelte-lr0mcm");
			attr(line, "x1", "42");
			attr(line, "x2", "348");
			attr(line, "y1", line_y__value = /*chart*/ ctx[13].terrainY);
			attr(line, "y2", line_y__value_1 = /*chart*/ ctx[13].terrainY);
			attr(line, "class", "terrain-line svelte-lr0mcm");
			attr(text_1, "x", "344");
			attr(text_1, "y", text_1_y_value = Math.max(27, /*chart*/ ctx[13].terrainY - 4));
			attr(text_1, "text-anchor", "end");
			attr(text_1, "class", "terrain-tag svelte-lr0mcm");
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
			attr(text_1, "class", "empty-band svelte-lr0mcm");
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
			attr(text_1, "class", "empty-band svelte-lr0mcm");
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
			attr(text0, "class", "axis precip-axis svelte-lr0mcm");
			attr(text1, "x", "37");
			attr(text1, "y", "190");
			attr(text1, "text-anchor", "end");
			attr(text1, "class", "axis svelte-lr0mcm");
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
			attr(rect, "class", "precip-bar svelte-lr0mcm");
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
			attr(rect, "class", rect_class_value = "" + (null_to_empty(`phase-block phase-${/*block*/ ctx[49].key}`) + " svelte-lr0mcm"));
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

			if (dirty[0] & /*chart*/ 8192 && rect_class_value !== (rect_class_value = "" + (null_to_empty(`phase-block phase-${/*block*/ ctx[49].key}`) + " svelte-lr0mcm"))) {
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
			attr(text_1, "class", "empty-band svelte-lr0mcm");
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
			attr(text_1, "class", "axis snow-axis svelte-lr0mcm");
			attr(path, "d", path_d_value = /*chart*/ ctx[13].newSnowArea);
			attr(path, "class", "new-snow-area svelte-lr0mcm");
			attr(polyline, "points", polyline_points_value = /*chart*/ ctx[13].newSnowPoints);
			attr(polyline, "class", "new-snow-line svelte-lr0mcm");
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
			attr(line, "class", "now-line svelte-lr0mcm");
			attr(rect, "x", rect_x_value = Math.max(43, Math.min(322, /*chart*/ ctx[13].nowX - 13)));
			attr(rect, "y", "20");
			attr(rect, "width", "26");
			attr(rect, "height", "12");
			attr(rect, "rx", "3");
			attr(rect, "class", "now-tag-bg svelte-lr0mcm");
			attr(text_1, "x", text_1_x_value = Math.max(56, Math.min(335, /*chart*/ ctx[13].nowX)));
			attr(text_1, "y", "29");
			attr(text_1, "text-anchor", "middle");
			attr(text_1, "class", "now-tag svelte-lr0mcm");
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
			attr(line, "class", "cursor svelte-lr0mcm");
			attr(circle, "cx", circle_cx_value = /*chart*/ ctx[13].currentX);
			attr(circle, "cy", circle_cy_value = /*chart*/ ctx[13].currentY);
			attr(circle, "r", "4.2");
			attr(circle, "class", "current-dot svelte-lr0mcm");
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
			attr(line, "class", "inspect-line svelte-lr0mcm");
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
			attr(text_1, "class", "axis timeline-tick svelte-lr0mcm");
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
			attr(b0, "class", "svelte-lr0mcm");
			attr(b1, "class", "svelte-lr0mcm");
			attr(span0, "class", "svelte-lr0mcm");
			attr(b2, "class", "svelte-lr0mcm");
			attr(span1, "class", "svelte-lr0mcm");
			attr(b3, "class", "svelte-lr0mcm");
			attr(span2, "class", "svelte-lr0mcm");
			attr(div0, "class", "tip-grid svelte-lr0mcm");
			attr(div1, "class", "tooltip svelte-lr0mcm");
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
			attr(i, "class", i_class_value = "" + (null_to_empty(`tip-phase-dot phase-${/*tooltip*/ ctx[12].phase.key}`) + " svelte-lr0mcm"));
			attr(strong, "class", strong_class_value = "" + (null_to_empty(`text-${/*tooltip*/ ctx[12].phase.key}`) + " svelte-lr0mcm"));
		},
		m(target, anchor) {
			insert(target, strong, anchor);
			append(strong, i);
			append(strong, t);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*tooltip*/ 4096 && i_class_value !== (i_class_value = "" + (null_to_empty(`tip-phase-dot phase-${/*tooltip*/ ctx[12].phase.key}`) + " svelte-lr0mcm"))) {
				attr(i, "class", i_class_value);
			}

			if (dirty[0] & /*tooltip*/ 4096 && t_value !== (t_value = precipitationLabel(/*tooltip*/ ctx[12].phase) + "")) set_data(t, t_value);

			if (dirty[0] & /*tooltip*/ 4096 && strong_class_value !== (strong_class_value = "" + (null_to_empty(`text-${/*tooltip*/ ctx[12].phase.key}`) + " svelte-lr0mcm"))) {
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
			attr(b, "class", "svelte-lr0mcm");
			attr(span, "class", "svelte-lr0mcm");
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
			attr(i, "class", i_class_value = "" + (null_to_empty(`current-phase-dot phase-${/*chart*/ ctx[13].currentPhase.key}`) + " svelte-lr0mcm"));
		},
		m(target, anchor) {
			insert(target, i, anchor);
			insert(target, t, anchor);
		},
		p(ctx, dirty) {
			if (dirty[0] & /*chart*/ 8192 && i_class_value !== (i_class_value = "" + (null_to_empty(`current-phase-dot phase-${/*chart*/ ctx[13].currentPhase.key}`) + " svelte-lr0mcm"))) {
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
			attr(strong, "class", "svelte-lr0mcm");
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
			attr(span, "class", "svelte-lr0mcm");
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
			attr(span, "class", "svelte-lr0mcm");
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
			attr(button, "class", "svelte-lr0mcm");
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
			attr(button, "class", "crossing-action svelte-lr0mcm");
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
			attr(div, "class", "quality-note svelte-lr0mcm");
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
			attr(div, "class", "quality-note svelte-lr0mcm");
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
			attr(b, "class", "svelte-lr0mcm");
			attr(small, "class", "svelte-lr0mcm");
			attr(em, "class", "svelte-lr0mcm");
			attr(div0, "class", "chart-title svelte-lr0mcm");
			attr(div1, "class", "chart-actions svelte-lr0mcm");
			attr(div2, "class", "chart-head svelte-lr0mcm");
			attr(button0, "type", "button");
			attr(button0, "role", "tab");
			attr(button0, "aria-selected", button0_aria_selected_value = /*tab*/ ctx[0] === 'graph');
			attr(button0, "class", "svelte-lr0mcm");
			toggle_class(button0, "active", /*tab*/ ctx[0] === 'graph');
			attr(button1, "type", "button");
			attr(button1, "role", "tab");
			attr(button1, "aria-selected", button1_aria_selected_value = /*tab*/ ctx[0] === 'sounding');
			attr(button1, "class", "svelte-lr0mcm");
			toggle_class(button1, "active", /*tab*/ ctx[0] === 'sounding');
			attr(div3, "class", "forecast-tabs svelte-lr0mcm");
			attr(div3, "role", "tablist");
			attr(div3, "aria-label", "Forecast view");
			attr(div4, "class", "chart-shell svelte-lr0mcm");
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
	append_styles(target, "svelte-x3gowb", ".forecast-quality{margin-top:5px;color:#edc881;font-size:10px;line-height:1.3}@keyframes svelte-x3gowb-snowline-pulse{0%,100%{opacity:0.45;transform:scale(0.85)}50%{opacity:1;transform:scale(1)}}.snowline-label{text-align:center;pointer-events:none}.snowline-label,.snowline-click-label{background:transparent!important;border:0 !important}.snowline-label span{display:inline-block;padding:1px 4px 1px 6px;border-radius:3px;border-left:4px solid var(--snowline-color, white);background:rgba(15, 17, 20, 0.86);color:white;font-size:10px;font-weight:800;white-space:nowrap;text-shadow:0 1px 2px rgba(0, 0, 0, 0.8);box-shadow:0 0 0 1px rgba(255, 255, 255, 0.12)}.snowline-label-major span{padding-left:7px;border-left-width:5px;background:rgba(10, 13, 16, 0.92);font-weight:900;box-shadow:0 0 0 1px rgba(255, 255, 255, 0.18), 0 2px 5px rgba(0, 0, 0, 0.28)}.snowline-click-label{pointer-events:auto !important}.snowline-click-label>span{position:relative;display:flex;flex-direction:column;gap:6px;width:228px;min-height:146px;box-sizing:border-box;padding:40px 9px 9px;border-radius:14px;border:1px solid rgba(255, 255, 255, 0.11);border-top:2px solid var(--probe-accent, rgba(255, 255, 255, 0.4));border-bottom:3px solid var(--snowline-color, white);background:linear-gradient(180deg, rgba(11, 17, 21, 0.985), rgba(7, 12, 16, 0.99));color:#fff;text-align:center;white-space:normal;text-shadow:none;box-shadow:0 10px 30px rgba(0, 0, 0, 0.54)}.snowline-card-kicker{position:absolute;top:12px;left:74px;right:74px;color:#7f929e;font-size:6px;line-height:1;font-weight:900;letter-spacing:1.15px;text-align:center;white-space:nowrap;pointer-events:none}.snowline-label-close,.snowline-label-share,.snowline-label-chart,.snowline-label-favourite{position:absolute;top:7px;height:27px;padding:0;border:1px solid rgba(255, 255, 255, 0.085);border-radius:8px;background:rgba(255, 255, 255, 0.045);color:#dfe9ee;font-size:12px;line-height:25px;font-weight:800;text-shadow:none;cursor:pointer;pointer-events:auto;transition:background 0.12s ease, border-color 0.12s ease}.snowline-label-close:hover,.snowline-label-share:hover,.snowline-label-chart:hover,.snowline-label-favourite:hover{background:rgba(255, 255, 255, 0.09);border-color:rgba(255, 255, 255, 0.16)}.snowline-label-close{right:7px;width:27px;font-size:17px}.snowline-label-share{right:40px;width:27px;font-size:0;background-repeat:no-repeat;background-position:center;background-size:14px;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='18' cy='5' r='3'/%3E%3Ccircle cx='6' cy='12' r='3'/%3E%3Ccircle cx='18' cy='19' r='3'/%3E%3Cpath d='M8.6 10.5l6.8-4M8.6 13.5l6.8 4'/%3E%3C/svg%3E\")}.snowline-label-chart{left:7px;width:29px;font-size:15px}.snowline-label-favourite{left:42px;width:29px;font-size:16px;color:#aab6bd}.snowline-label-favourite.saved{color:#ffe45c;border-color:rgba(255, 228, 92, 0.42);background:rgba(255, 228, 92, 0.08)}.snowline-click-label b{display:block;padding:4px 7px 2px;border-radius:8px;background:transparent;color:var(--probe-accent, white);font-size:15px;line-height:1.05;font-weight:900;letter-spacing:0.25px}.snowline-card-dry>span>b{padding:3px 7px 1px;background:transparent;font-size:12px;letter-spacing:0.8px;opacity:0.95}.snowline-label-detail{width:100%}.snowline-position{padding:6px 8px;border-radius:8px;background:rgba(255, 255, 255, 0.055);color:var(--probe-accent, white);line-height:1.05}.snowline-position strong{display:block;font-size:11px;font-weight:900}.snowline-position small{display:block;margin-top:3px;color:rgba(255, 255, 255, 0.68);font-size:7.5px;font-weight:750}.snowline-label-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px;width:100%}.snowline-label-grid span,.snowline-outlook-grid span{min-width:0;padding:6px 4px 5px;border-radius:8px;background:rgba(255, 255, 255, 0.028);border:1px solid rgba(255, 255, 255, 0.045);text-align:center}.snowline-label-grid small,.snowline-outlook-grid small{display:block;color:#7f919b;font-size:6.2px;line-height:1;text-transform:uppercase;letter-spacing:0.42px;font-weight:800}.snowline-label-grid strong,.snowline-outlook-grid strong{display:block;margin-top:4px;color:#eef5f8;font-size:10.5px;line-height:1;font-weight:900}.metric-terrain strong{color:#ffd39a}.metric-snowline strong{color:#dff6ff}.metric-precip strong{color:#9fe5ff}.snowline-label-grid.has-precip .metric-precip{grid-column:-1}.snowline-outlook{padding:5px;border:1px solid rgba(110, 203, 255, 0.08);border-radius:8px;background:rgba(60, 150, 205, 0.035)}.snowline-outlook-title{margin-bottom:4px;color:#79badc;font-size:6.5px;font-weight:900;letter-spacing:0.75px}.snowline-outlook-grid{display:grid;grid-template-columns:1fr 1fr;gap:4px}.snowline-outlook-grid span{padding:4px 3px;background:rgba(255, 255, 255, 0.028)}.snowline-outlook-grid strong{font-size:8.8px}.snowline-no-snow strong{color:#8f9da5;font-weight:700}.snowline-transition{margin-top:4px;padding:4px 5px;border-radius:6px;background:rgba(255, 255, 255, 0.035);color:#dce9ef;font-size:8px;line-height:1.12;font-weight:800}.snowline-valid{margin:-1px 0 1px;color:#8799a4;font-size:7.2px;line-height:1;font-weight:800;text-align:center}.snowline-compact-relation{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;box-sizing:border-box;padding:5px 7px;border-radius:8px;background:rgba(255, 255, 255, 0.025);color:var(--probe-accent, white);font-size:8.2px;line-height:1.1;font-weight:850;text-align:left}.snowline-compact-relation strong{display:inline!important;padding:0!important;background:none!important;color:inherit!important;font-size:8px!important;letter-spacing:0 !important}.snowline-compact-relation small{display:none}.snowline-compact-relation span{color:#aebbc2;font-weight:750;white-space:nowrap}.snowline-event-line{width:100%;box-sizing:border-box;padding:6px 7px;border:0;border-radius:8px;background:rgba(110, 203, 255, 0.045);color:#d8e5eb;text-align:left;font-family:inherit;font-size:7.8px;line-height:1.2;font-weight:800}button.snowline-event-line{display:flex;align-items:center;justify-content:space-between;gap:6px;cursor:pointer;pointer-events:auto}button.snowline-event-line:hover{background:rgba(110, 203, 255, 0.11)}button.snowline-event-line span{flex:0 0 auto;color:#8edcff;font-size:14px;line-height:8px}.snowline-loading{padding:20px 0 14px;color:#9fb0ba;font-size:10px}.snowline-probe-above>span{background:linear-gradient(180deg, rgba(8, 25, 34, 0.99), rgba(8, 14, 18, 0.99))}.snowline-probe-below>span{background:linear-gradient(180deg, rgba(32, 21, 12, 0.99), rgba(18, 13, 10, 0.99))}.snowline-probe-near>span{background:linear-gradient(180deg, rgba(29, 27, 11, 0.99), rgba(17, 16, 9, 0.99))}.snowline-card-hazard>span{border-top-color:#c184ff !important;box-shadow:0 0 0 1px rgba(193, 132, 255, 0.35), 0 12px 32px rgba(77, 27, 107, 0.58)}.snowline-card-hazard>span>b{color:#e7c8ff !important;background:rgba(174, 91, 230, 0.12) !important}@media(max-width: 520px){.snowline-click-label>span{width:220px;min-height:142px;padding:40px 8px 8px}.snowline-card-kicker{left:72px;right:72px}.snowline-click-label b{font-size:13px}.snowline-card-dry>span>b{font-size:10.5px}.snowline-position strong{font-size:10.5px}.snowline-label-grid strong,.snowline-outlook-grid strong{font-size:8.5px}}.snowline-label-chart{left:7px;width:69px;font-size:10px}.snowline-label-favourite{left:81px;width:46px;font-size:10px}.snowline-label-share{right:40px;width:45px;background-image:none;font-size:10px}.snowline-card-kicker{display:none}.snowline-valid{font-size:10px;line-height:1.25}.snowline-label-grid small{font-size:9px;line-height:1.2}.snowline-label-grid strong{font-size:13px;line-height:1.2}.snowline-event-line{font-size:11px;line-height:1.4;padding:8px}.snowline-compact-relation,.snowline-compact-relation strong{font-size:10px!important;line-height:1.3}.winter-workspace.svelte-x3gowb.svelte-x3gowb{color:#edf4f8;font:13px/1.5 system-ui}.winter-heading.svelte-x3gowb.svelte-x3gowb{display:flex;align-items:center;justify-content:space-between}.winter-heading.svelte-x3gowb h2.svelte-x3gowb{font-size:22px;color:#edf4f8;margin:0}.winter-heading.svelte-x3gowb p.svelte-x3gowb,.source-note.svelte-x3gowb.svelte-x3gowb{color:#aec1ca;font-size:11px}.snowflake.svelte-x3gowb.svelte-x3gowb{font-size:35px;color:#8ed9fa}.winter-tools.svelte-x3gowb.svelte-x3gowb{display:flex;gap:8px;margin:14px 0;flex-wrap:wrap}.winter-tools.svelte-x3gowb button.svelte-x3gowb,.winter-time.svelte-x3gowb button.svelte-x3gowb,.copy-winter.svelte-x3gowb.svelte-x3gowb{padding:9px 12px;border:1px solid #34515d;border-radius:9px;background:#17323e;color:#e2f0f1;cursor:pointer;min-height:40px}.winter-tools.svelte-x3gowb .enabled.svelte-x3gowb{border-color:#78e4ca;color:#78e4ca}.winter-point.svelte-x3gowb.svelte-x3gowb{padding:18px;border:1px solid #35505c;border-top:3px solid var(--winter-accent);border-radius:14px;background:linear-gradient(130deg, #13343d, #182537);margin:15px 0}.winter-point.svelte-x3gowb>small.svelte-x3gowb{font-size:10px;color:#adc4cf}.winter-point.svelte-x3gowb h3.svelte-x3gowb{color:var(--winter-accent);font-size:24px;margin:10px 0}.winter-time.svelte-x3gowb.svelte-x3gowb{display:flex;align-items:center;gap:12px;margin:16px 0}.winter-time.svelte-x3gowb label.svelte-x3gowb{flex:1;font-size:12px;color:#aec1ca}.winter-time.svelte-x3gowb input.svelte-x3gowb{display:block;width:100%;accent-color:#78e4ca;min-height:32px}.copy-winter.svelte-x3gowb.svelte-x3gowb{margin-top:14px}.map-legend.svelte-x3gowb.svelte-x3gowb{font-size:11px;color:#d0afef}details.svelte-x3gowb.svelte-x3gowb{margin:16px 0;color:#aec1ca;font-size:12px}summary.svelte-x3gowb.svelte-x3gowb{cursor:pointer}.winter-detail.svelte-x3gowb .snowline-label-grid{gap:8px}.winter-detail.svelte-x3gowb .snowline-label-grid span{padding:10px}.winter-detail.svelte-x3gowb .snowline-label-grid strong{font-size:17px}.winter-detail.svelte-x3gowb .snowline-label-grid small{font-size:10px}.winter-detail.svelte-x3gowb .snowline-event-line{font-size:12px}.winter-detail.svelte-x3gowb .snowline-valid{font-size:12px;margin-bottom:10px}");
}

// (5:1) {#if contoursEnabled}
function create_if_block_4(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = "╱ Terrain above estimated snowline · contours −500 to 6000 m";
			attr(p, "class", "map-legend svelte-x3gowb");
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
			attr(input, "class", "svelte-x3gowb");
			attr(label, "class", "svelte-x3gowb");
			attr(button0, "class", "svelte-x3gowb");
			attr(div, "class", "winter-time svelte-x3gowb");
			attr(button1, "class", "copy-winter svelte-x3gowb");
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
			attr(button, "class", "copy-winter svelte-x3gowb");
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
			div1.innerHTML = `<div><h2 class="svelte-x3gowb">Wintry Forecast</h2><p class="svelte-x3gowb">ECMWF profiles · Windy terrain · up to 144 hours</p></div><span class="snowflake svelte-x3gowb" aria-hidden="true">❄</span>`;
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
			details.innerHTML = `<summary class="svelte-x3gowb">How to interpret winter guidance</summary><p>The snowline is a wet-bulb-zero proxy, not proof of snowfall. Precipitation type is profile-derived. New snow is a forecast estimate, not observed snow depth. Low confidence and unavailable inputs remain visible. Contours sample the visible map and may miss small terrain features.</p>`;
			attr(div1, "class", "winter-heading svelte-x3gowb");
			attr(p1, "class", "source-note svelte-x3gowb");
			attr(button0, "aria-pressed", /*contoursEnabled*/ ctx[2]);
			attr(button0, "class", "svelte-x3gowb");
			toggle_class(button0, "enabled", /*contoursEnabled*/ ctx[2]);
			button1.disabled = button1_disabled_value = /*probeLoading*/ ctx[10] || !/*location*/ ctx[0];
			attr(button1, "class", "svelte-x3gowb");
			attr(div2, "class", "winter-tools svelte-x3gowb");
			attr(small, "class", "svelte-x3gowb");
			attr(h3, "class", "svelte-x3gowb");
			attr(div3, "class", "winter-detail svelte-x3gowb");
			attr(div4, "class", "winter-point svelte-x3gowb");
			attr(div4, "style", div4_style_value = `--winter-accent:${/*pointAccent*/ ctx[7]}`);
			attr(details, "class", "svelte-x3gowb");
			attr(section, "class", "winter-workspace svelte-x3gowb");
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
