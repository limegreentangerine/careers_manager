// \0rolldown/runtime.js
var __esmMin = (fn, res, err) => () => {
	if (err) throw err[0];
	try {
		return fn && (res = fn(fn = 0)), res;
	} catch (e) {
		throw err = [e], e;
	}
};
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod, mod.exports), cb = null), mod.exports);
// \0@oxc-project+runtime@0.156.0/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
var init_typeof = __esmMin((() => {}));
// \0@oxc-project+runtime@0.156.0/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
var init_toPrimitive = __esmMin((() => {
	init_typeof();
}));
// \0@oxc-project+runtime@0.156.0/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
var init_toPropertyKey = __esmMin((() => {
	init_typeof();
	init_toPrimitive();
}));
// \0@oxc-project+runtime@0.156.0/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
var init_defineProperty = __esmMin((() => {
	init_toPropertyKey();
})), _globalThis$document, CLEAN, DIRTY, MAYBE_DIRTY, INERT, DESTROYED, REACTION_RAN, DESTROYING, EFFECT_TRANSPARENT, EFFECT_PRESERVED, USER_EFFECT, REACTION_IS_UPDATING, ASYNC, ERROR_VALUE, HAS_ABORT_CONTROLLER, ASSIGNED, STATE_SYMBOL, COMPONENT_SYMBOL, LEGACY_PROPS, ATTRIBUTES_CACHE, CLASS_CACHE, STYLE_CACHE, TEXT_CACHE, STALE_REACTION, CUSTOM_RENDERER_NODE_TYPE_MAP, init_constants$1 = __esmMin((() => {
	init_defineProperty();
	CLEAN = 1024;
	DIRTY = 2048;
	MAYBE_DIRTY = 4096;
	INERT = 8192;
	DESTROYED = 16384;
	REACTION_RAN = 32768;
	DESTROYING = 1 << 25;
	EFFECT_TRANSPARENT = 65536;
	EFFECT_PRESERVED = 1 << 19;
	USER_EFFECT = 1 << 20;
	REACTION_IS_UPDATING = 1 << 21;
	ASYNC = 1 << 22;
	ERROR_VALUE = 1 << 23;
	HAS_ABORT_CONTROLLER = 1 << 27;
	ASSIGNED = 1 << 26;
	STATE_SYMBOL = Symbol("$state");
	COMPONENT_SYMBOL = Symbol("component");
	LEGACY_PROPS = Symbol("legacy props");
	ATTRIBUTES_CACHE = Symbol("attributes");
	CLASS_CACHE = Symbol("class");
	STYLE_CACHE = Symbol("style");
	TEXT_CACHE = Symbol("text");
	STALE_REACTION = new class StaleReactionError extends Error {
		constructor(..._args) {
			super(..._args);
			_defineProperty(this, "name", "StaleReactionError");
			_defineProperty(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
		}
	}();
	(_globalThis$document = globalThis.document) !== null && _globalThis$document !== void 0 && _globalThis$document.contentType;
	CUSTOM_RENDERER_NODE_TYPE_MAP = {
		fragment: 11,
		element: 1,
		text: 3,
		comment: 8
	};
})), HYDRATION_ERROR, UNINITIALIZED;
var init_constants = __esmMin((() => {
	HYDRATION_ERROR = {};
	UNINITIALIZED = Symbol("uninitialized");
}));
// node_modules/esm-env/false.js
var init_false = __esmMin((() => {}));
// node_modules/esm-env/index.js
var init_esm_env = __esmMin((() => {
	init_false();
}));
/**
* Reading a derived belonging to a now-destroyed effect may result in stale values
*/
function derived_inert() {
	console.warn(`https://svelte.dev/e/derived_inert`);
}
/**
* Hydration failed because the initial UI does not match what was rendered on the server. The error occurred near %location%
* @param {string | undefined | null} [location]
*/
function hydration_mismatch(location) {
	console.warn(`https://svelte.dev/e/hydration_mismatch`);
}
/**
* A `<svelte:boundary>` `reset` function only resets the boundary the first time it is called
*/
function svelte_boundary_reset_noop() {
	console.warn(`https://svelte.dev/e/svelte_boundary_reset_noop`);
}
var init_warnings = __esmMin((() => {
	init_esm_env();
}));
// node_modules/svelte/src/internal/client/dom/hydration.js
/** @param {boolean} value */
function set_hydrating(value) {
	hydrating = value;
}
/** @param {TemplateNode | null} node */
function set_hydrate_node(node) {
	if (node === null) {
		hydration_mismatch();
		throw HYDRATION_ERROR;
	}
	return hydrate_node = node;
}
function hydrate_next() {
	return set_hydrate_node(/* @__PURE__ */ get_next_sibling(hydrate_node));
}
function next(count = 1) {
	if (hydrating) {
		var i = count;
		var node = hydrate_node;
		while (i--) node = /* @__PURE__ */ get_next_sibling(node);
		hydrate_node = node;
	}
}
/**
* Skips or removes (depending on {@link remove}) all nodes starting at `hydrate_node` up until the next hydration end comment
* @param {boolean} remove
*/
function skip_nodes(remove = true) {
	var depth = 0;
	var node = hydrate_node;
	while (true) {
		if (node_type(node) === 8) {
			var _get_node_value;
			var data = (_get_node_value = get_node_value(node)) !== null && _get_node_value !== void 0 ? _get_node_value : "";
			if (data === "]") {
				if (depth === 0) return node;
				depth -= 1;
			} else if (data === "[" || data === "[!" || data.startsWith("[?") || data[0] === "[" && !isNaN(Number(data.slice(1)))) depth += 1;
		}
		var next = /* @__PURE__ */ get_next_sibling(node);
		if (remove) remove_node(node);
		node = next;
	}
}
/**
*
* @param {TemplateNode} node
*/
function read_hydration_instruction(node) {
	var _get_node_value2;
	if (!node || node_type(node) !== 8) {
		hydration_mismatch();
		throw HYDRATION_ERROR;
	}
	return (_get_node_value2 = get_node_value(node)) !== null && _get_node_value2 !== void 0 ? _get_node_value2 : "";
}
var hydrating, hydrate_node;
var init_hydration = __esmMin((() => {
	init_constants$1();
	init_constants();
	init_warnings();
	init_operations$1();
	hydrating = false;
}));
// node_modules/svelte/src/internal/shared/utils.js
/** @param {Array<() => void>} arr */
function run_all(arr) {
	for (var i = 0; i < arr.length; i++) arr[i]();
}
/**
* TODO replace with Promise.withResolvers once supported widely enough
* @template [T=void]
*/
function deferred() {
	/** @type {(value: T) => void} */
	var resolve;
	/** @type {(reason: any) => void} */
	var reject;
	return {
		promise: new Promise((res, rej) => {
			resolve = res;
			reject = rej;
		}),
		resolve,
		reject
	};
}
var is_array, index_of, includes, array_from, object_keys, define_property, get_descriptor, object_prototype, array_prototype, get_prototype_of, is_extensible, noop;
var init_utils$2 = __esmMin((() => {
	is_array = Array.isArray;
	index_of = Array.prototype.indexOf;
	includes = Array.prototype.includes;
	array_from = Array.from;
	object_keys = Object.keys;
	define_property = Object.defineProperty;
	get_descriptor = Object.getOwnPropertyDescriptor;
	object_prototype = Object.prototype;
	array_prototype = Array.prototype;
	get_prototype_of = Object.getPrototypeOf;
	is_extensible = Object.isExtensible;
	noop = () => {};
}));
// node_modules/svelte/src/internal/client/error-handling.js
/**
* @param {unknown} error
*/
function handle_error(error) {
	var effect = active_effect;
	if (effect === null) return error;
	if ((effect.f & 32768) === 0 && (effect.f & 4) === 0) throw error;
	invoke_error_boundary(error, effect);
}
/**
* @param {unknown} error
* @param {Effect | null} effect
*/
function invoke_error_boundary(error, effect) {
	if (error === HYDRATION_ERROR) throw error;
	if (effect !== null && (effect.f & 16384) !== 0) return;
	while (effect !== null) {
		if ((effect.f & 128) !== 0 && (effect.f & 33570816) === 0) {
			if ((effect.f & 32768) === 0) throw error;
			try {
				/** @type {Boundary} */ effect.b.error(error);
				return;
			} catch (e) {
				error = e;
			}
		}
		effect = effect.parent;
	}
	throw error;
}
var init_error_handling = __esmMin((() => {
	init_esm_env();
	init_constants();
	init_operations$1();
	init_constants$1();
	init_utils$2();
	init_runtime();
}));
var init_errors$1 = __esmMin((() => {
	init_esm_env();
}));
/**
* Maximum update depth exceeded. This typically indicates that an effect reads and writes the same piece of state
* @returns {never}
*/
function effect_update_depth_exceeded() {
	throw new Error(`https://svelte.dev/e/effect_update_depth_exceeded`);
}
/**
* Failed to hydrate the application
* @returns {never}
*/
function hydration_failed() {
	throw new Error(`https://svelte.dev/e/hydration_failed`);
}
/**
* Property descriptors defined on `$state` objects must contain `value` and always be `enumerable`, `configurable` and `writable`.
* @returns {never}
*/
function state_descriptors_fixed() {
	throw new Error(`https://svelte.dev/e/state_descriptors_fixed`);
}
/**
* Cannot set prototype of `$state` object
* @returns {never}
*/
function state_prototype_fixed() {
	throw new Error(`https://svelte.dev/e/state_prototype_fixed`);
}
/**
* Updating state inside `$derived(...)`, `$inspect(...)` or a template expression is forbidden. If the value should not be reactive, declare it without `$state`
* @returns {never}
*/
function state_unsafe_mutation() {
	throw new Error(`https://svelte.dev/e/state_unsafe_mutation`);
}
/**
* A `<svelte:boundary>` `reset` function cannot be called while an error is still being handled
* @returns {never}
*/
function svelte_boundary_reset_onerror() {
	throw new Error(`https://svelte.dev/e/svelte_boundary_reset_onerror`);
}
var init_errors = __esmMin((() => {
	init_esm_env();
	init_errors$1();
}));
// node_modules/svelte/src/internal/flags/index.js
function enable_legacy_mode_flag() {
	legacy_mode_flag = true;
}
var async_mode_flag, legacy_mode_flag, custom_renderers_flag;
var init_flags = __esmMin((() => {
	async_mode_flag = false;
	legacy_mode_flag = false;
	custom_renderers_flag = false;
}));
// node_modules/svelte/src/internal/client/context.js
/** @param {ComponentContext | null} context */
function set_component_context(context) {
	component_context = context;
}
/**
* @param {Record<string, unknown>} props
* @param {any} runes
* @param {Function} [fn]
* @returns {void}
*/
function push(props, runes = false, fn) {
	component_context = {
		p: component_context,
		i: false,
		c: null,
		e: null,
		s: props,
		x: null,
		r: active_effect,
		l: legacy_mode_flag && !runes ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
/**
* @template {Record<string, any>} T
* @param {T} [component]
* @returns {T}
*/
function pop(component) {
	var context = component_context;
	var effects = context.e;
	if (effects !== null) {
		context.e = null;
		for (var fn of effects) create_user_effect(fn);
	}
	if (component !== void 0) context.x = component;
	context.i = true;
	component_context = context.p;
	return mark_as_component(component);
}
/**
* Add a symbol to the object (or create one if undefined) to mark it as a component so it isn't proxified.
* @param {any} component
*/
function mark_as_component(component = {}) {
	define_property(component, COMPONENT_SYMBOL, { value: true });
	return component;
}
/** @returns {boolean} */
function is_runes() {
	return !legacy_mode_flag || component_context !== null && component_context.l === null;
}
var component_context;
var init_context = __esmMin((() => {
	init_esm_env();
	init_errors();
	init_runtime();
	init_effects();
	init_flags();
	init_constants$1();
	init_utils$2();
	component_context = null;
}));
// node_modules/svelte/src/internal/client/dom/task.js
function run_micro_tasks() {
	var tasks = micro_tasks;
	micro_tasks = [];
	run_all(tasks);
}
/**
* @param {() => void} fn
*/
function queue_micro_task(fn) {
	if (micro_tasks.length === 0 && !is_flushing_sync) {
		var tasks = micro_tasks;
		queueMicrotask(() => {
			if (tasks === micro_tasks) run_micro_tasks();
		});
	}
	micro_tasks.push(fn);
}
/**
* Synchronously run any queued tasks.
*/
function flush_tasks() {
	while (micro_tasks.length > 0) run_micro_tasks();
}
var micro_tasks;
var init_task = __esmMin((() => {
	init_utils$2();
	init_batch();
	micro_tasks = [];
}));
// node_modules/svelte/src/internal/client/reactivity/equality.js
/** @import { Equals } from '#client' */
/** @type {Equals} */
function equals(value) {
	return value === this.v;
}
/**
* @param {unknown} a
* @param {unknown} b
* @returns {boolean}
*/
function safe_not_equal(a, b) {
	return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
/** @type {Equals} */
function safe_equals(value) {
	return !safe_not_equal(value, this.v);
}
var init_equality$1 = __esmMin((() => {}));
// node_modules/svelte/src/internal/shared/clone.js
var init_clone = __esmMin((() => {
	init_utils$2();
}));
var init_dev = __esmMin((() => {
	init_esm_env();
	init_utils$2();
	init_errors$1();
}));
// node_modules/svelte/src/internal/client/custom-renderer/state.js
/**
* Makes `value` the current renderer (`null` for the DOM), returning the previous one.
* Every call must be matched by a call to `pop_renderer` with the returned value
* (in a `finally` block, if anything in between can throw).
*
* Custom renderers never hydrate, so hydration is suspended while one is active.
* This doesn't allocate, since it runs for every effect when custom renderers are used.
* @param {Renderer<any> | null} value
* @returns {Renderer<any> | null}
*/
function push_renderer(value) {
	var previous = current_renderer;
	current_renderer = value;
	depth += 1;
	if (hydrating && value !== null) {
		set_hydrating(false);
		suspended_hydration_at.push(depth);
	}
	return previous;
}
/**
* Restores the renderer that was current before the matching `push_renderer` call
* @param {Renderer<any> | null} previous The value returned by `push_renderer`
*/
function pop_renderer(previous) {
	if (suspended_hydration_at[suspended_hydration_at.length - 1] === depth) {
		suspended_hydration_at.pop();
		set_hydrating(true);
	}
	depth -= 1;
	current_renderer = previous;
}
var current_renderer, depth, suspended_hydration_at;
var init_state = __esmMin((() => {
	init_hydration();
	current_renderer = null;
	depth = 0;
	suspended_hydration_at = [];
}));
// \0@oxc-project+runtime@0.156.0/helpers/esm/checkPrivateRedeclaration.js
function _checkPrivateRedeclaration(e, t) {
	if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
}
var init_checkPrivateRedeclaration = __esmMin((() => {}));
// \0@oxc-project+runtime@0.156.0/helpers/esm/classPrivateMethodInitSpec.js
function _classPrivateMethodInitSpec(e, a) {
	_checkPrivateRedeclaration(e, a), a.add(e);
}
var init_classPrivateMethodInitSpec = __esmMin((() => {
	init_checkPrivateRedeclaration();
}));
// \0@oxc-project+runtime@0.156.0/helpers/esm/classPrivateFieldInitSpec.js
function _classPrivateFieldInitSpec(e, t, a) {
	_checkPrivateRedeclaration(e, t), t.set(e, a);
}
var init_classPrivateFieldInitSpec = __esmMin((() => {
	init_checkPrivateRedeclaration();
}));
// \0@oxc-project+runtime@0.156.0/helpers/esm/assertClassBrand.js
function _assertClassBrand(e, t, n) {
	if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw new TypeError("Private element is not present on this object");
}
var init_assertClassBrand = __esmMin((() => {}));
// \0@oxc-project+runtime@0.156.0/helpers/esm/classPrivateFieldSet2.js
function _classPrivateFieldSet2(s, a, r) {
	return s.set(_assertClassBrand(s, a), r), r;
}
var init_classPrivateFieldSet2 = __esmMin((() => {
	init_assertClassBrand();
}));
// \0@oxc-project+runtime@0.156.0/helpers/esm/classPrivateFieldGet2.js
function _classPrivateFieldGet2(s, a) {
	return s.get(_assertClassBrand(s, a));
}
var init_classPrivateFieldGet2 = __esmMin((() => {
	init_assertClassBrand();
}));
// node_modules/svelte/src/internal/client/reactivity/async.js
/**
* The batch that `batch` was merged into, if any (transitively), else `batch` itself
* @param {Batch} batch
*/
function merge_target(batch) {
	while (batch.merged !== null) batch = batch.merged;
	return batch;
}
var init_async$1 = __esmMin((() => {
	init_constants$1();
	init_context();
	init_state();
	init_error_handling();
	init_runtime();
	init_batch();
	init_deriveds();
	init_effects();
}));
// node_modules/svelte/src/internal/client/reactivity/status.js
/**
* @param {Signal} signal
* @param {number} status
*/
function set_signal_status(signal, status) {
	signal.f = signal.f & STATUS_MASK | status;
}
/**
* Set a derived's status to CLEAN or MAYBE_DIRTY based on its connection state.
* @param {Derived} derived
*/
function update_derived_status(derived) {
	if ((derived.f & 512) !== 0 || derived.edges === null) set_signal_status(derived, CLEAN);
	else set_signal_status(derived, MAYBE_DIRTY);
}
var STATUS_MASK;
var init_status = __esmMin((() => {
	init_constants$1();
	STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
}));
// node_modules/svelte/src/internal/client/dev/debug.js
var init_debug = __esmMin((() => {
	init_constants$1();
	init_clone();
	init_runtime();
}));
// node_modules/svelte/src/internal/client/reactivity/deriveds.js
/**
* @param {Derived} derived
* @returns {void}
*/
function destroy_derived_effects(derived) {
	var effects = derived.effects;
	if (effects !== null) {
		derived.effects = null;
		for (var i = 0; i < effects.length; i += 1) destroy_effect(effects[i]);
	}
}
/**
* @template T
* @param {Derived} derived
* @returns {T}
*/
function execute_derived(derived) {
	var prev_active_effect = active_effect;
	var parent = derived.parent;
	if (!is_destroying_effect && parent !== null && derived.v !== UNINITIALIZED && (parent.f & 24576) !== 0) {
		derived_inert();
		update_derived_status(derived);
		return derived.v;
	}
	set_active_effect(parent);
	try {
		destroy_derived_effects(derived);
		return update_reaction(derived);
	} finally {
		set_active_effect(prev_active_effect);
	}
}
/**
* Update the global state of a derived, adopting the active batch's run if its view has
* become the real world (e.g. because a fork was committed), or re-evaluating it otherwise.
* `signal` can be a source, too, which is cheaper than checking first (this is called for every dependency that
* is checked): only reactions ever get a dirty status, so `is_dirty` returns `false` for a source right away
* @param {Value} signal
* @returns {void}
*/
function update_derived(signal) {
	var derived = signal;
	if (!is_dirty(derived)) return;
	var records = view_batch === null || view_batch === void 0 ? void 0 : view_batch.records;
	var record = records === null || records === void 0 ? void 0 : records.get(derived);
	if (record !== void 0 && is_current(record.deps, record.dv)) {
		/** @type {Map<Reaction, BatchRecord>} */ records.delete(derived);
		promote_record(derived, record);
	} else execute_derived(derived);
}
/**
* The value of `derived` as the view of the world of the active batch sees it, with its version: an
* assigned value that holds, or a run of it whose versions are what the view holds — a record in the
* batch, or the derived itself (i.e. its global state) — or else a new run. Results are cached for the
* lifetime of the view (see `view_cache`), unless the derived is disconnected, in which case nothing
* would remove them from the cache when they become stale.
* @param {Derived} derived
* @returns {Derived | DerivedRecord | BatchValue}
*/
function get_view(derived) {
	var cache = view_cache;
	var entry = cache.get(derived);
	if (entry !== void 0) return entry;
	var batch = view_batch;
	var written = batch_values.get(derived);
	var held = written !== null && written !== void 0 ? written : derived;
	var assigned = written === void 0 ? (derived.f & ASSIGNED) !== 0 : written.assigned;
	var record = batch.get_record(derived);
	if (assigned && !changed_since((record !== null && record !== void 0 ? record : derived).deps, held.wv)) entry = held;
	else if (record !== void 0 && is_current(record.deps, record.dv)) entry = record;
	else if (written === void 0 && !assigned && derived.dv !== null && is_current(derived.deps, derived.dv)) entry = derived;
	else {
		var _batch$records$get, _batch$records;
		execute_derived(derived);
		entry = (_batch$records$get = (_batch$records = batch.records) === null || _batch$records === void 0 ? void 0 : _batch$records.get(derived)) !== null && _batch$records$get !== void 0 ? _batch$records$get : derived;
	}
	if ((derived.f & 512) !== 0) cache.set(derived, entry);
	return entry;
}
/**
* @param {Derived} derived
*/
function freeze_derived_effects(derived) {
	if (derived.effects === null) return;
	for (const e of derived.effects) if (e.teardown || (e.f & 134217728) !== 0) {
		var _e$teardown;
		(_e$teardown = e.teardown) === null || _e$teardown === void 0 || _e$teardown.call(e);
		abort_all(e);
		if (e.fn !== null) e.teardown = noop;
		remove_reactions(e);
		destroy_effect_children(e);
	}
}
/**
* @param {Derived} derived
*/
function unfreeze_derived_effects(derived) {
	if (derived.effects === null) return;
	for (const e of derived.effects) if (e.teardown && e.fn !== null) update_effect(e);
}
var OBSOLETE;
var init_deriveds = __esmMin((() => {
	init_esm_env();
	init_constants$1();
	init_runtime();
	init_errors();
	init_warnings();
	init_effects();
	init_sources();
	init_dev();
	init_context();
	init_constants();
	init_batch();
	init_async$1();
	init_utils$2();
	init_status();
	init_debug();
	OBSOLETE = Symbol("obsolete");
}));
var init_tracing = __esmMin((() => {
	init_clone();
	init_constants$1();
	init_effects();
	init_batch();
	init_deriveds();
	init_runtime();
}));
/**
* @template V
* @param {V} v
* @param {Error | null} [stack]
* @returns {Source<V>}
*/
function source(v, stack) {
	return {
		f: 0,
		v,
		reactions: null,
		equals,
		rv: 0,
		wv: 0
	};
}
/**
* @template V
* @param {V} v
* @param {Error | null} [stack]
*/
/*#__NO_SIDE_EFFECTS__*/
function state(v, stack) {
	const s = source(v, stack);
	push_reaction_value(s);
	return s;
}
/**
* @template V
* @param {V} initial_value
* @param {boolean} [immutable]
* @returns {Source<V>}
*/
/*#__NO_SIDE_EFFECTS__*/
function mutable_source(initial_value, immutable = false, trackable = true) {
	const s = source(initial_value);
	if (!immutable) s.equals = safe_equals;
	if (legacy_mode_flag && trackable && component_context !== null && component_context.l !== null) {
		var _component_context$l, _component_context$l$;
		((_component_context$l$ = (_component_context$l = component_context.l).s) !== null && _component_context$l$ !== void 0 ? _component_context$l$ : _component_context$l.s = []).push(s);
	}
	return s;
}
/**
* @template V
* @param {Value<V>} source
* @param {V} value
* @param {boolean} [should_proxy]
* @returns {V}
*/
function set(source, value, should_proxy = false) {
	if (active_reaction !== null && (!untracking || (active_reaction.f & 131072) !== 0) && is_runes() && (active_reaction.f & 4325394) !== 0 && (current_sources === null || !current_sources.has(source))) state_unsafe_mutation();
	return internal_set(source, should_proxy ? proxy(value) : value, legacy_updates);
}
/**
* @template V
* @param {Value<V>} source
* @param {V} value
* @param {Effect[] | null} [updated_during_traversal]
* @returns {V}
*/
function internal_set(source, value, updated_during_traversal = null) {
	var same = source.equals(value) && (source.f & 8388608) === 0;
	var entry = batch_values === null || batch_values === void 0 ? void 0 : batch_values.get(source);
	if (!same || entry !== void 0 && (entry.e || !source.equals.call(entry, value))) {
		var batch = Batch.ensure();
		if ((source.f & 67110914) === 2050) execute_derived(source);
		batch.capture(source, value, same, false, updated_during_traversal);
		if (is_runes() && active_effect !== null && (active_effect.f & 1024) !== 0 && (active_effect.f & 96) === 0) {
			if (untracked_writes === null) set_untracked_writes([source]);
			else untracked_writes.push(source);
		}
	} else if (is_destroying_effect) teardown_write(source);
	return value;
}
function flush_eager_effects() {
	eager_effects_deferred = false;
	in_real_world(run_eager_effects);
}
function run_eager_effects() {
	for (const effect of eager_effects) {
		if ((effect.f & 1024) !== 0) set_signal_status(effect, MAYBE_DIRTY);
		let dirty;
		try {
			dirty = is_dirty(effect);
		} catch {
			dirty = true;
		}
		if (dirty) update_effect(effect);
	}
	eager_effects.clear();
}
/**
* Silently (without using `get`) increment a source
* @param {Source<number>} source
*/
function increment(source) {
	set(source, source.v + 1);
}
var eager_effects, eager_effects_deferred;
var init_sources = __esmMin((() => {
	init_esm_env();
	init_runtime();
	init_equality$1();
	init_constants$1();
	init_errors();
	init_flags();
	init_tracing();
	init_dev();
	init_context();
	init_batch();
	init_proxy();
	init_deriveds();
	init_status();
	eager_effects = /* @__PURE__ */ new Set();
	eager_effects_deferred = false;
}));
// node_modules/svelte/src/internal/client/reactivity/batch.js
/** @param {TeardownContext | null} context */
function set_teardown_context(context) {
	teardown_context = context;
}
/** @param {Map<Value, BatchValue>} [values] */
function push_teardown_context(values) {
	var context = teardown_context = {
		reverted_values: new Map(teardown_context === null || teardown_context === void 0 ? void 0 : teardown_context.reverted_values),
		derived_cache: /* @__PURE__ */ new Map(),
		parent: teardown_context
	};
	for (const [source, value] of values !== null && values !== void 0 ? values : []) context.reverted_values.set(source, value);
	return context;
}
/**
* A write in a teardown remains visible after returning to an enclosing teardown view,
* and the deriveds that teardowns evaluated may depend on it
* @param {Value} source
*/
function teardown_write(source) {
	for (var context = teardown_context; context !== null; context = context.parent) {
		context.reverted_values.delete(source);
		context.derived_cache.clear();
	}
}
function _is_deferred() {
	if (this.is_fork) return true;
	for (const effect of _classPrivateFieldGet2(_pending$1, this).keys()) if (this.is_blocked_by(effect)) return true;
	return false;
}
/**
* Whether `effect` is a branch that this batch skips, or that only exists offscreen for other batches
* @param {Effect} effect
*/
function _skips(effect) {
	return _classPrivateFieldGet2(_skipped_branches, this).has(effect) || (effect.f & 33554432) !== 0 && !_classPrivateFieldGet2(_unskipped_branches, this).has(effect);
}
/**
* Convert the effects that were scheduled in this batch into the root effects
* that need to be traversed, marking the path to each effect (by clearing the
* `CLEAN` flag on ancestor branches) so that the traversal can find them.
* This happens right before traversal rather than at scheduling time, so that
* the markers left on the (shared) effect tree are created and consumed within
* a single traversal — scheduling into other batches can never observe them
* @returns {Effect[]}
*/
function _resolve() {
	/** @type {Effect[]} */
	var roots = [];
	for (const effect of _classPrivateFieldGet2(_scheduled, this)) {
		if ((effect.f & 16384) !== 0 || (effect.f & 6144) === 0) continue;
		var e = effect;
		var covered = false;
		while (e.parent !== null) {
			e = e.parent;
			var flags = e.f;
			if ((flags & 96) !== 0) {
				if ((flags & 1024) === 0) {
					covered = true;
					break;
				}
				e.f ^= CLEAN;
			}
		}
		if (!covered) roots.push(e);
	}
	_classPrivateFieldSet2(_scheduled, this, []);
	return roots;
}
function _process() {
	var _classPrivateFieldGet2$2;
	current_batch = processing_batch = this;
	teardown_context === null || teardown_context === void 0 || teardown_context.derived_cache.clear();
	if (async_mode_flag && this.started && last_processed !== this.id) _assertClassBrand(_Batch_brand, this, _revalidate).call(this, this.current.keys());
	this.started = true;
	last_processed = this.id;
	if (_classPrivateFieldGet2(_unprocessed, this).size > 0) {
		for (const [e, status] of _classPrivateFieldGet2(_unprocessed, this)) _assertClassBrand(_Batch_brand, this, _add).call(this, e, status);
		_classPrivateFieldGet2(_unprocessed, this).clear();
	}
	this.activate();
	/** @type {Effect[]} */
	var effects = collected_effects = [];
	/** @type {Effect[]} */
	var render_effects = [];
	/** @type {Boundary[]} */
	var revealed_boundaries = [];
	/**
	* @type {Effect[]}
	* @deprecated when we get rid of legacy mode and stores, we can get rid of this
	*/
	var updates = legacy_updates = [];
	while (_classPrivateFieldGet2(_scheduled, this).length > 0) {
		if (flush_count++ > 1e3) {
			_assertClassBrand(_Batch_brand, this, _unlink).call(this);
			infinite_loop_guard();
		}
		for (const root of _assertClassBrand(_Batch_brand, this, _resolve).call(this)) try {
			_assertClassBrand(_Batch_brand, this, _traverse).call(this, root, effects, render_effects, revealed_boundaries);
		} catch (e) {
			reset_branch(root, true);
			if (!_assertClassBrand(_Batch_brand, this, _is_deferred).call(this)) this.discard();
			throw e;
		}
		if (_classPrivateFieldGet2(_scheduled, this).length > 0) {
			for (const effect of render_effects) _classPrivateFieldGet2(_scheduled, this).push(effect);
			for (const effect of effects) _classPrivateFieldGet2(_scheduled, this).push(effect);
			render_effects.length = 0;
			effects.length = 0;
		}
	}
	current_batch = null;
	if (updates.length > 0) {
		var batch = _Batch.ensure();
		for (const e of updates) if ((e.f & 1024) === 0) batch.schedule(e, MAYBE_DIRTY);
	}
	collected_effects = null;
	legacy_updates = null;
	if (this.merge_requests.size > 0) {
		const sorted = Array.from(this.merge_requests, merge_target).filter((batch) => batch !== this && batch.linked && !batch.is_fork).sort((a, b) => a.id - b.id);
		this.merge_requests.clear();
		if (sorted.length > 0) {
			_assertClassBrand(_Batch_brand, this, _defer_effects).call(this, render_effects);
			_assertClassBrand(_Batch_brand, this, _defer_effects).call(this, effects);
			/** @type {Batch} */
			var target = this;
			var i = sorted.length;
			while (i--) {
				var earlier = sorted[i];
				if (earlier === target) continue;
				_assertClassBrand(_Batch_brand, earlier, _merge).call(earlier, target);
				target = earlier;
			}
			_assertClassBrand(_Batch_brand, target, _process).call(target);
			return;
		}
	}
	if (_assertClassBrand(_Batch_brand, this, _is_deferred).call(this)) {
		_assertClassBrand(_Batch_brand, this, _defer_effects).call(this, render_effects);
		_assertClassBrand(_Batch_brand, this, _defer_effects).call(this, effects);
		for (const e of _classPrivateFieldGet2(_skipped_branches, this)) reset_branch(e);
		if (updates.length > 0)
 /** @type {Batch} */ _assertClassBrand(_Batch_brand, current_batch, _process).call(current_batch);
		return;
	}
	const earlier_batch = _assertClassBrand(_Batch_brand, this, _find_earlier_batch).call(this);
	if (earlier_batch) {
		_assertClassBrand(_Batch_brand, this, _defer_effects).call(this, render_effects);
		_assertClassBrand(_Batch_brand, this, _defer_effects).call(this, effects);
		_assertClassBrand(_Batch_brand, earlier_batch, _merge).call(earlier_batch, this);
		_assertClassBrand(_Batch_brand, earlier_batch, _process).call(earlier_batch);
		return;
	}
	for (const boundary of revealed_boundaries) if (boundary.is_pending && boundary.is_ready(this)) boundary.reveal(effects);
	_assertClassBrand(_Batch_brand, this, _release_records).call(this, true);
	_assertClassBrand(_Batch_brand, this, _run_callbacks).call(this, _classPrivateFieldGet2(_commit_callbacks, this));
	var earlier_writes = flush_queued_effects(render_effects);
	if (custom_renderers_flag && before_effects !== null) before_effects();
	flush_queued_effects(effects, earlier_writes);
	(_classPrivateFieldGet2$2 = _classPrivateFieldGet2(_deferred, this)) === null || _classPrivateFieldGet2$2 === void 0 || _classPrivateFieldGet2$2.resolve();
	var next_batch = current_batch;
	if (_classPrivateFieldGet2(_pending$1, this).size === 0 && (_classPrivateFieldGet2(_scheduled, this).length === 0 || next_batch !== null)) _assertClassBrand(_Batch_brand, this, _unlink).call(this);
	if (async_mode_flag) this.commit_writes();
	if (next_batch !== null) {
		if (teardown_context !== null) for (const [source, snapshot] of teardown_context.reverted_values) {
			var _next_batch$previous$;
			if (((_next_batch$previous$ = next_batch.previous.get(source)) === null || _next_batch$previous$ === void 0 ? void 0 : _next_batch$previous$.wv) !== snapshot.wv) teardown_context.reverted_values.delete(source);
		}
		_assertClassBrand(_Batch_brand, next_batch, _process).call(next_batch);
	}
}
/**
* Schedule the reactions that (transitively) depend on `sources` for re-validation in this batch.
* They are marked MAYBE_DIRTY, which means that they are only re-run if the exact versions
* of their dependencies differ from the ones they last saw (in this batch's view of the world)
* @param {Iterable<Source>} sources
*/
function _revalidate(sources) {
	/** @type {Set<Value>} */
	var values = new Set(sources);
	/** @type {Set<Effect>} */
	var effects = /* @__PURE__ */ new Set();
	for (const value of values) {
		var reactions = value.reactions;
		if (reactions === null) continue;
		for (const reaction of reactions) {
			var flags = reaction.f;
			if ((flags & 2) !== 0) {
				if ((flags & 1024) !== 0) set_signal_status(reaction, MAYBE_DIRTY);
				values.add(reaction);
				continue;
			}
			var effect = reaction;
			if (effects.has(effect)) continue;
			effects.add(effect);
			if ((flags & 155648) === 0 && !this.is_skipped(effect)) this.schedule(effect, MAYBE_DIRTY);
		}
	}
}
/**
* Traverse the effect tree, executing effects or stashing
* them for later execution as appropriate
* @param {Effect} root
* @param {Effect[]} effects
* @param {Effect[]} render_effects
* @param {Boundary[]} revealed_boundaries
*/
function _traverse(root, effects, render_effects, revealed_boundaries) {
	root.f ^= CLEAN;
	var effect = root.first;
	while (effect !== null) {
		var flags = effect.f;
		var is_branch = (flags & 96) !== 0;
		if (!(is_branch && (flags & 1024) !== 0 || (flags & 139264) !== 0 || _assertClassBrand(_Batch_brand, this, _skips).call(this, effect)) && effect.fn !== null) {
			if (is_branch) effect.f ^= CLEAN;
			else if ((flags & 4) !== 0) effects.push(effect);
			else if (async_mode_flag && (flags & 16777224) !== 0) render_effects.push(effect);
			else if (is_dirty(effect)) update_effect(effect);
			var child = effect.first;
			if (child !== null) {
				effect = child;
				continue;
			}
		}
		while (effect !== null) {
			if ((effect.f & 16512) === 128) {
				var boundary = effect.b;
				if (boundary.is_pending && boundary.is_ready(this)) revealed_boundaries.push(boundary);
			}
			var next = effect.next;
			if (next !== null) {
				effect = next;
				break;
			}
			effect = effect.parent;
		}
	}
}
function _find_earlier_batch() {
	for (var batch = this.prev; batch !== null; batch = batch.prev) if (!batch.is_fork && _assertClassBrand(_Batch_brand, this, _intersects).call(this, batch)) return batch;
	return null;
}
/** @param {Batch} batch */
function _intersects(batch) {
	for (const source of this.current.keys()) if (batch.current.has(source)) return true;
	return false;
}
/**
* Take over the writes of a later batch that depends on this one, because it finished first
* or aborted one of this batch's runs.
* Values it produced (async results, deriveds) remain valid; block effects select their
* branches again for this batch, if needed (their selections are keyed by batch)
* @param {Batch} batch
*/
function _merge(batch) {
	var _batch$records;
	for (const target of batch.merge_requests) this.merge_requests.add(target);
	batch.merge_requests.clear();
	for (const [source, entry] of batch.current) {
		if (!this.previous.has(source)) {
			const previous = batch.previous.get(source);
			if (previous) this.previous.set(source, previous);
		}
		this.current.set(source, entry);
	}
	for (const [effect, deferred] of batch.async_deriveds) {
		const d = this.async_deriveds.get(effect);
		if (d && d !== deferred) deferred.promise.then(d.resolve, d.reject);
		this.async_deriveds.set(effect, deferred);
	}
	for (const [reaction, record] of (_batch$records = batch.records) !== null && _batch$records !== void 0 ? _batch$records : []) if ((reaction.f & 16) === 0) {
		var _this$records, _this$records2, _batch$records2;
		var replaced = (_this$records = this.records) === null || _this$records === void 0 ? void 0 : _this$records.get(reaction);
		((_this$records2 = this.records) !== null && _this$records2 !== void 0 ? _this$records2 : this.records = /* @__PURE__ */ new Map()).set(reaction, record);
		(_batch$records2 = batch.records) === null || _batch$records2 === void 0 || _batch$records2.delete(reaction);
		abort_record(reaction, replaced);
	}
	batch.async_deriveds.clear();
	if (_classPrivateFieldGet2(_pending$1, batch).size > 0) {
		for (const [effect, count] of _classPrivateFieldGet2(_pending$1, batch)) {
			var _this$pending$get;
			_classPrivateFieldGet2(_pending$1, this).set(effect, ((_this$pending$get = _classPrivateFieldGet2(_pending$1, this).get(effect)) !== null && _this$pending$get !== void 0 ? _this$pending$get : 0) + count);
		}
		_classPrivateFieldGet2(_pending$1, batch).clear();
	}
	if (_classPrivateFieldGet2(_unprocessed, batch).size > 0) {
		for (const [effect, status] of _classPrivateFieldGet2(_unprocessed, batch)) _assertClassBrand(_Batch_brand, this, _add_dirty_effect).call(this, effect, status);
		_classPrivateFieldGet2(_unprocessed, batch).clear();
	}
	const discard = () => batch.discard();
	this.oncommit(discard);
	this.ondiscard(discard);
	batch.merged = this;
	_assertClassBrand(_Batch_brand, batch, _unlink).call(batch);
}
/**
* Note that `effect` needs to be (re-)validated, without downgrading a DIRTY effect to MAYBE_DIRTY
* @param {Effect} effect
* @param {number} status DIRTY or MAYBE_DIRTY
*/
function _add_dirty_effect(effect, status) {
	if (status === 2048 || _classPrivateFieldGet2(_unprocessed, this).get(effect) !== 2048) _classPrivateFieldGet2(_unprocessed, this).set(effect, status);
}
/**
* @param {Effect[]} effects
*/
function _defer_effects(effects) {
	for (var i = 0; i < effects.length; i += 1) {
		var effect = effects[i];
		var status = effect.f & (DIRTY | MAYBE_DIRTY);
		if (status !== 0) {
			_assertClassBrand(_Batch_brand, this, _add_dirty_effect).call(this, effect, effect.dv === null ? MAYBE_DIRTY : status);
			set_signal_status(effect, CLEAN);
		}
	}
}
function _commit() {
	for (let batch = first_batch; batch !== null; batch = batch.next) {
		if (batch === this) continue;
		var is_earlier = batch.id < this.id;
		/** @type {Source[]} */
		var sources = [];
		for (const [source, entry] of this.current) {
			var own = batch.current.get(source);
			if (own !== void 0) {
				if (is_earlier && entry.v !== own.v && !own.async) batch.current.set(source, entry);
				else continue;
			}
			sources.push(source);
		}
		if (!batch.started || batch.current.size === 0) continue;
		var obsolete = true;
		for (const source of batch.current.keys()) if (!this.current.has(source)) {
			obsolete = false;
			break;
		}
		if (obsolete && is_earlier) batch.discard();
		else if (sources.length > 0) {
			_assertClassBrand(_Batch_brand, batch, _revalidate).call(batch, sources);
			rebases.add(batch);
		}
	}
	this.current.clear();
	this.previous.clear();
}
/**
* Runs the commit/discard callbacks.
* A callback that was added while block effects re-ran eagerly detaches the branches that such a run
* deselected (see `flush_queued_effects`). The teardowns it causes see the writes that applied in the
* run's view, like they would have during the run: of the values that the current teardown context
* reverts, the writes of the effects that ran before the one whose writes caused the run are restored.
* Callbacks run untracked, because a batch can commit while an effect runs (e.g. one that calls `flushSync`)
* @param {Map<(batch: Batch) => void, Map<Value, BatchValue> | null>} callbacks
*/
function _run_callbacks(callbacks) {
	untrack(() => {
		for (const [fn, writes] of callbacks) {
			if (writes === null) {
				fn(this);
				continue;
			}
			var context = push_teardown_context();
			for (const [source, write] of writes) if (context.reverted_values.has(source)) context.reverted_values.set(source, write);
			try {
				fn(this);
			} finally {
				teardown_context = context.parent;
			}
		}
	});
	callbacks.clear();
}
/**
* @param {Effect} effect
* @param {number} status
*/
function _add(effect, status) {
	if ((effect.f & 2048) === 0) set_signal_status(effect, status);
	_classPrivateFieldGet2(_scheduled, this).push(effect);
}
/** @param {boolean} commit whether the effects' runs become global state */
function _release_records(commit = false) {
	var records = this.records;
	if (records === null) return;
	this.records = null;
	for (const [reaction, record] of records) {
		if ((reaction.f & 16386) === 0) {
			var replaced = (reaction.f & 4194304) !== 0 && is_outdated(record) && !is_outdated(reaction);
			if (commit && !replaced) {
				promote_record(reaction, record);
				if ((reaction.f & 4194304) !== 0) for (let b = first_batch; b !== null; b = b.next) {
					var _b$records;
					if (b !== this && !((_b$records = b.records) === null || _b$records === void 0 ? void 0 : _b$records.has(reaction))) {
						var _b$async_deriveds$get;
						(_b$async_deriveds$get = b.async_deriveds.get(reaction)) === null || _b$async_deriveds$get === void 0 || _b$async_deriveds$get.reject(OBSOLETE);
					}
				}
			}
			prune_edges(reaction);
		}
		abort_record(reaction, record);
	}
}
/**
* A batch that committed while work inside a pending boundary was in flight stays linked, so that the results
* arrive in it. Its writes are the real world now, part of every other batch's view, so it comes first from now
* on: This ensures logic about who sees what values in intersects/merge/etc work correctly.
*/
function _move_to_front() {
	var prev = this.prev;
	var first = first_batch;
	prev.next = this.next;
	if (this.next === null) last_batch = prev;
	else this.next.prev = prev;
	this.prev = null;
	this.next = first;
	first.prev = first_batch = this;
	this.id = first.id - 1;
}
function _unlink() {
	if (!this.linked) return;
	var prev = this.prev;
	var next = this.next;
	if (prev === null) first_batch = next;
	else prev.next = next;
	if (next === null) last_batch = prev;
	else next.prev = prev;
	this.linked = false;
	_assertClassBrand(_Batch_brand, this, _release_records).call(this);
}
/**
* Synchronously flush any pending updates.
* Returns void if no callback is provided, otherwise returns the result of calling the callback.
* @template [T=void]
* @param {(() => T) | undefined} [fn]
* @returns {T}
*/
function flushSync(fn) {
	var was_flushing_sync = is_flushing_sync;
	var previous_view_batch = view_batch !== current_batch ? view_batch : null;
	is_flushing_sync = true;
	try {
		var result;
		if (fn) {
			flushSync();
			result = fn();
		}
		while (true) {
			flush_tasks();
			if (current_batch === null) return result;
			current_batch.flush();
		}
	} finally {
		is_flushing_sync = was_flushing_sync;
		view_batch = previous_view_batch;
	}
}
function infinite_loop_guard() {
	try {
		effect_update_depth_exceeded();
	} catch (error) {
		invoke_error_boundary(error, last_scheduled_effect);
	}
}
/**
* An effect (as opposed to a render effect, which keeps the offscreen content up to date) inside a boundary
* that is still pending doesn't run when the batch commits. The boundary keeps it until it is revealed,
* and hands it to the batch that reveals it (see `Boundary#reveal`)
* TODO I feel like there's probably a less roundabout way to achieve this
* @param {Effect} effect
* @returns {boolean} whether the effect was deferred
*/
function defer_if_pending(effect) {
	if ((effect.f & 32772) !== 4) return false;
	for (var boundary = effect.b; boundary !== null; boundary = boundary.parent) if (boundary.is_pending) {
		boundary.defer_effect(effect);
		return true;
	}
	return false;
}
/**
* `earlier_writes` includes writes from the pre-effect phase. Eager block teardowns
* revert the running effect's writes, but not these earlier writes.
* @param {Array<Effect>} effects
* @param {Map<Value, BatchValue> | null} [earlier_writes]
* @returns {Map<Value, BatchValue> | null}
*/
function flush_queued_effects(effects, earlier_writes = null) {
	var length = effects.length;
	if (length === 0) return earlier_writes;
	var i = 0;
	while (i < length) {
		var effect = effects[i++];
		if ((effect.f & 24576) === 0 && !(current_batch === null || current_batch === void 0 ? void 0 : current_batch.is_skipped(effect)) && !defer_if_pending(effect) && is_dirty(effect)) {
			eager_block_effects = /* @__PURE__ */ new Set();
			var version = write_version;
			update_effect(effect);
			if (effect.edges === null && effect.first === null && effect.nodes === null && effect.teardown === null && effect.ac === null) unlink_effect(effect);
			if ((eager_block_effects === null || eager_block_effects === void 0 ? void 0 : eager_block_effects.size) > 0) {
				var previous_teardown_context = teardown_context;
				if (earlier_writes !== null) push_teardown_context(earlier_writes);
				var previous_eager_block_writes = eager_block_writes;
				eager_block_writes = new Map(earlier_writes);
				try {
					for (const e of eager_block_effects) {
						if ((e.f & 24576) !== 0 || (current_batch === null || current_batch === void 0 ? void 0 : current_batch.is_skipped(e))) continue;
						/** @type {Effect[]} */
						const ordered_effects = [e];
						let ancestor = e.parent;
						while (ancestor !== null) {
							if (eager_block_effects.has(ancestor)) {
								eager_block_effects.delete(ancestor);
								ordered_effects.push(ancestor);
							}
							ancestor = ancestor.parent;
						}
						for (let j = ordered_effects.length - 1; j >= 0; j--) {
							const e = ordered_effects[j];
							if ((e.f & 24576) !== 0 || (current_batch === null || current_batch === void 0 ? void 0 : current_batch.is_skipped(e))) continue;
							update_effect(e);
						}
					}
				} finally {
					eager_block_writes = previous_eager_block_writes;
					eager_block_effects === null || eager_block_effects === void 0 || eager_block_effects.clear();
					teardown_context = previous_teardown_context;
				}
			}
			if (write_version !== version && current_batch !== null) {
				for (const [value, write] of current_batch.current) if (write.wv > version) {
					var _earlier_writes;
					((_earlier_writes = earlier_writes) !== null && _earlier_writes !== void 0 ? _earlier_writes : earlier_writes = /* @__PURE__ */ new Map()).set(value, write);
				}
			}
		}
	}
	eager_block_effects = null;
	return earlier_writes;
}
/**
* The next batch after `batch` that wrote `source`, if any. Its write comes after one of `batch` in order, so
* that one isn't the real-world value. Forks are skipped: their writes only exist in their own view of the world
* @param {Batch} batch
* @param {Value} source
*/
function later_writer(batch, source) {
	var later = batch.next;
	while (later !== null && (later.is_fork || !later.current.has(source))) later = later.next;
	return later;
}
/**
* Make a write the real-world value of `source`. A write to a derived is an assignment, whose
* value holds until one of the derived's dependencies is written after it (see `changed_since`)
* @param {Value} source
* @param {BatchValue} entry
*/
function apply(source, entry) {
	source.v = entry.v;
	source.wv = entry.wv;
	source.f = entry.e ? source.f | ERROR_VALUE : source.f & ~ERROR_VALUE;
	if ((source.f & 2) !== 0) {
		source.f |= ASSIGNED;
		update_derived_status(source);
	}
}
/**
* Run `fn` with the real world (i.e. the latest values) as the active view, regardless of which batch is active
* @param {() => void} fn
*/
function in_real_world(fn) {
	var previous_batch_values = batch_values;
	var previous_view_cache = view_cache;
	var previous_view_batch = view_batch;
	batch_values = view_cache = view_batch = null;
	try {
		fn();
	} finally {
		batch_values = previous_batch_values;
		view_cache = previous_view_cache;
		view_batch = previous_view_batch;
	}
}
/**
* Mark all the effects inside a skipped branch CLEAN, so that they can be correctly
* rescheduled later (if the branch survives, its effects are re-validated, see `unskip_effect`)
* @param {Effect} effect
* @param {boolean} force reset even clean branches following an error
*/
function reset_branch(effect, force = false) {
	if (!force && (effect.f & 32) !== 0 && (effect.f & 1024) !== 0) return;
	set_signal_status(effect, CLEAN);
	var e = effect.first;
	while (e !== null) {
		reset_branch(e, force);
		e = e.next;
	}
}
var _Batch, first_batch, last_batch, current_batch, processing_batch, teardown_context, batch_values, view_cache, view_batch, last_scheduled_effect, rebases, is_flushing_sync, collected_effects, legacy_updates, flush_count, seen, count_deps, uid, last_processed, _commit_callbacks, _discard_callbacks, _pending$1, _deferred, _unprocessed, _scheduled, _skipped_branches, _unskipped_branches, _decrement_queued, _Batch_brand, Batch, before_effects, eager_block_effects, eager_block_writes;
var init_batch = __esmMin((() => {
	init_constants$1();
	init_flags();
	init_utils$2();
	init_runtime();
	init_errors();
	init_task();
	init_esm_env();
	init_error_handling();
	init_sources();
	init_effects();
	init_constants();
	init_status();
	init_dev();
	init_deriveds();
	init_context();
	init_async$1();
	init_classPrivateMethodInitSpec();
	init_defineProperty();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldGet2();
	init_assertClassBrand();
	init_classPrivateFieldSet2();
	first_batch = null;
	last_batch = null;
	current_batch = null;
	processing_batch = null;
	teardown_context = null;
	batch_values = null;
	view_cache = null;
	view_batch = null;
	last_scheduled_effect = null;
	rebases = /* @__PURE__ */ new Set();
	is_flushing_sync = false;
	collected_effects = null;
	legacy_updates = null;
	flush_count = 0;
	seen = null;
	count_deps = 0;
	uid = 1;
	last_processed = null;
	_commit_callbacks = /* @__PURE__ */ new WeakMap();
	_discard_callbacks = /* @__PURE__ */ new WeakMap();
	_pending$1 = /* @__PURE__ */ new WeakMap();
	_deferred = /* @__PURE__ */ new WeakMap();
	_unprocessed = /* @__PURE__ */ new WeakMap();
	_scheduled = /* @__PURE__ */ new WeakMap();
	_skipped_branches = /* @__PURE__ */ new WeakMap();
	_unskipped_branches = /* @__PURE__ */ new WeakMap();
	_decrement_queued = /* @__PURE__ */ new WeakMap();
	_Batch_brand = /* @__PURE__ */ new WeakSet();
	Batch = class Batch {
		constructor() {
			_classPrivateMethodInitSpec(this, _Batch_brand);
			_defineProperty(this, "id", uid++);
			_defineProperty(
				this,
				/** True as soon as `#process` was called */
				"started",
				false
			);
			_defineProperty(this, "linked", true);
			_defineProperty(
				this,
				/** @type {Batch | null} */
				"prev",
				null
			);
			_defineProperty(
				this,
				/** @type {Batch | null} */
				"next",
				null
			);
			_defineProperty(
				this,
				/** @type {Map<Effect, ReturnType<typeof deferred<any>>>} */
				"async_deriveds",
				/* @__PURE__ */ new Map()
			);
			_defineProperty(
				this,
				/**
				* The current values (and their versions) of any sources that are updated in this batch,
				* including deriveds that were overridden via assignment — until it commits them (see `#commit`).
				* Its keys are those of `this.previous`, plus the sources this batch gave their first value. `e` says whether
				* the value is an error
				* @type {Map<Value, BatchValue>}
				*/
				"current",
				/* @__PURE__ */ new Map()
			);
			_defineProperty(
				this,
				/**
				* The values (and their versions) of any sources that are updated in this batch _before_ those updates took place.
				* For a derived, `assigned` says whether its value before was assigned, too (otherwise it was computed).
				* A source that this batch gave its first value (e.g. an async expression that resolved for the first time) has
				* no entry: there's no value from before it, so other views can't undo the write, and teardowns don't revert it.
				* @type {Map<Value, BatchValue>}
				*/
				"previous",
				/* @__PURE__ */ new Map()
			);
			_defineProperty(
				this,
				/**
				* Results of reactions that belong to this batch rather than to the real world:
				* deriveds evaluated in this batch's view of the world with values that are not the
				* latest ones, and block/async effects that ran while this batch was processed.
				* Effect records become global state when the batch commits (see `promote_record`)
				* @type {Map<Reaction, BatchRecord> | null}
				*/
				"records",
				null
			);
			_defineProperty(
				this,
				/**
				* Earlier batches whose changes are part of this batch's view of the world, because
				* they intersect with it (this batch will be merged into them, see `#merge`)
				* @type {Batch[]}
				*/
				"folded",
				[]
			);
			_classPrivateFieldInitSpec(this, _commit_callbacks, /* @__PURE__ */ new Map());
			_classPrivateFieldInitSpec(this, _discard_callbacks, /* @__PURE__ */ new Map());
			_classPrivateFieldInitSpec(this, _pending$1, /* @__PURE__ */ new Map());
			_classPrivateFieldInitSpec(this, _deferred, null);
			_classPrivateFieldInitSpec(this, _unprocessed, /* @__PURE__ */ new Map());
			_classPrivateFieldInitSpec(this, _scheduled, []);
			_classPrivateFieldInitSpec(this, _skipped_branches, /* @__PURE__ */ new Set());
			_classPrivateFieldInitSpec(this, _unskipped_branches, /* @__PURE__ */ new Set());
			_defineProperty(this, "is_fork", false);
			_defineProperty(
				this,
				/**
				* The batch that this one was merged into, if any (see `#merge`). Its async work that is still in flight
				* continues as part of that one
				* @type {Batch | null}
				*/
				"merged",
				null
			);
			_defineProperty(
				this,
				/**
				* Batches whose runs this batch aborted. Merge into them before waiting for pending work.
				* Requests belong to this batch because a synchronous derived can abort outside traversal,
				* before an unrelated batch is processed (e.g. a fork being committed).
				* @type {Set<Batch>}
				*/
				"merge_requests",
				/* @__PURE__ */ new Set()
			);
			_classPrivateFieldInitSpec(this, _decrement_queued, false);
			if (last_batch === null) first_batch = last_batch = this;
			else {
				last_batch.next = this;
				this.prev = last_batch;
			}
			last_batch = this;
		}
		/**
		* Whether `effect` is inside a branch that this batch skips, i.e. doesn't exist in its view of the world
		* @param {Effect} effect
		*/
		is_skipped(effect) {
			for (var e = effect; e !== null; e = e.parent) if (_assertClassBrand(_Batch_brand, this, _skips).call(this, e)) return true;
			return false;
		}
		/**
		* Whether async work in `effect` holds up this batch — or, with `root`, the boundary whose content `root` is.
		* It doesn't if the effect is inside a branch that this batch skips (the branch is going to be destroyed),
		* or inside a boundary that is pending (which shows its pending snippet in the meantime).
		* Unlike a skipped branch, the content of a pending boundary does exist in the view of the batch: its
		* effects are still re-validated (see `#revalidate`), they just don't keep the batch from committing
		* @param {Effect} effect
		* @param {Effect | null} [root]
		*/
		is_blocked_by(effect, root = null) {
			for (var e = effect; e !== null && e !== root; e = e.parent) {
				if (_assertClassBrand(_Batch_brand, this, _skips).call(this, e)) return false;
				if ((e.f & 16512) === 128 && e.b.is_pending) return false;
			}
			return true;
		}
		/**
		* @param {Effect} effect
		*/
		skip_effect(effect) {
			_classPrivateFieldGet2(_skipped_branches, this).add(effect);
			_classPrivateFieldGet2(_unskipped_branches, this).delete(effect);
		}
		/**
		* @param {Effect} effect
		*/
		unskip_effect(effect) {
			if (_classPrivateFieldGet2(_skipped_branches, this).delete(effect) || !_classPrivateFieldGet2(_unskipped_branches, this).has(effect) && ((effect.f & 33554432) !== 0 || this.folded.some((batch) => _classPrivateFieldGet2(_skipped_branches, batch).has(effect)))) this.revalidate_branch(effect);
			_classPrivateFieldGet2(_unskipped_branches, this).add(effect);
		}
		/**
		* Like `unskip_effect`, for a branch that was just created offscreen while this batch is processed.
		* Its effects ran in this batch's view of the world when they were created, so there's nothing to re-validate
		* TODO can we skip revalidation in `unskip_effect` in more cases, by detecting whether things changed
		* inside a branch while it was skipped?
		* @param {Effect} effect
		*/
		unskip_new_effect(effect) {
			_classPrivateFieldGet2(_unskipped_branches, this).add(effect);
		}
		/**
		* @param {Effect} effect
		*/
		revalidate_branch(effect) {
			for (var e = effect.first; e !== null; e = e.next) {
				var flags = e.f;
				if ((flags & 24576) === 0 && !_assertClassBrand(_Batch_brand, this, _skips).call(this, e)) {
					if ((flags & 131168) === 0 && e.fn !== null) this.schedule(e, MAYBE_DIRTY);
					this.revalidate_branch(e);
				}
			}
		}
		/**
		* Associate a change to a given source with the current
		* batch, noting its previous and current values (and versions).
		* The source itself is only updated if this is its latest value, i.e. unless this
		* is a fork (whose writes only exist in its own view of the world) or a later batch
		* already wrote to it (e.g. because an async expression resolved in an earlier batch).
		* @param {Value} source
		* @param {any} value
		* @param {boolean} same whether the value equals the real one (it can, if this batch sees another one, see
		* `internal_set`) — in which case the source isn't updated, and the value gets the same version
		* @param {boolean} [error] whether the value is an error (thrown when read, see `runtime.js#get`)
		* @param {Effect[] | null} [updated_during_traversal]
		*/
		capture(source, value, same, error = false, updated_during_traversal = null) {
			var previous = this.previous.get(source);
			var later = later_writer(this, source);
			if (previous === void 0) {
				previous = later === null || later === void 0 ? void 0 : later.previous.get(source);
				if (previous === void 0 && source.v !== UNINITIALIZED) previous = {
					v: source.v,
					wv: source.wv,
					e: (source.f & ERROR_VALUE) !== 0,
					assigned: (source.f & ASSIGNED) !== 0
				};
				if (previous !== void 0) this.previous.set(source, previous);
			}
			if (is_destroying_effect) teardown_write(source);
			else if (previous !== void 0) {
				teardown_context === null || teardown_context === void 0 || teardown_context.reverted_values.set(source, previous);
				teardown_context === null || teardown_context === void 0 || teardown_context.derived_cache.clear();
			}
			/** @type {BatchValue} */
			var entry = {
				v: value,
				wv: same ? source.wv : increment_write_version(),
				e: error,
				assigned: (source.f & 2) !== 0,
				async: (source.f & ASYNC) !== 0
			};
			this.current.set(source, entry);
			batch_values === null || batch_values === void 0 || batch_values.set(source, entry);
			view_cache === null || view_cache === void 0 || view_cache.delete(source);
			if (!this.is_fork && later !== null) later.previous.set(source, entry);
			if (!this.is_fork && !same && later === null) apply(source, entry);
			if (!same) {
				seen = null;
				count_deps = 0;
				this.mark(source, DIRTY, updated_during_traversal);
				seen = null;
				if (eager_effects.size > 0 && !eager_effects_deferred) flush_eager_effects();
			}
		}
		deactivate() {
			current_batch = processing_batch = batch_values = view_cache = view_batch = null;
		}
		flush() {
			var context = push_teardown_context(this.previous);
			try {
				_assertClassBrand(_Batch_brand, this, _process).call(this);
				if (rebases.size > 0) for (const batch of rebases) {
					rebases.delete(batch);
					if (batch.linked && !_classPrivateFieldGet2(_decrement_queued, batch)) _assertClassBrand(_Batch_brand, batch, _process).call(batch);
				}
			} finally {
				flush_count = 0;
				last_scheduled_effect = null;
				collected_effects = null;
				legacy_updates = null;
				teardown_context = context.parent;
				this.deactivate();
			}
		}
		discard() {
			var _classPrivateFieldGet3;
			_assertClassBrand(_Batch_brand, this, _run_callbacks).call(this, _classPrivateFieldGet2(_discard_callbacks, this));
			for (const deferred of this.async_deriveds.values()) deferred.reject(OBSOLETE);
			_assertClassBrand(_Batch_brand, this, _unlink).call(this);
			(_classPrivateFieldGet3 = _classPrivateFieldGet2(_deferred, this)) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.resolve();
		}
		/**
		* Make this batch's writes the real world, part of every other batch's view (see `#commit`).
		* If it has pending work it stays linked, coming first from now on (see `#move_to_front`)
		*/
		commit_writes() {
			_assertClassBrand(_Batch_brand, this, _commit).call(this);
			if (this.linked && this.prev !== null) _assertClassBrand(_Batch_brand, this, _move_to_front).call(this);
		}
		/**
		* @param {Effect} effect
		*/
		increment(effect) {
			var _this$pending$get2;
			var count = (_this$pending$get2 = _classPrivateFieldGet2(_pending$1, this).get(effect)) !== null && _this$pending$get2 !== void 0 ? _this$pending$get2 : 0;
			_classPrivateFieldGet2(_pending$1, this).set(effect, count + 1);
		}
		/**
		* @param {Effect} effect
		*/
		decrement(effect) {
			var _this$pending$get3;
			var count = (_this$pending$get3 = _classPrivateFieldGet2(_pending$1, this).get(effect)) !== null && _this$pending$get3 !== void 0 ? _this$pending$get3 : 0;
			if (count === 1) _classPrivateFieldGet2(_pending$1, this).delete(effect);
			else _classPrivateFieldGet2(_pending$1, this).set(effect, count - 1);
			if (_classPrivateFieldGet2(_decrement_queued, this)) return;
			_classPrivateFieldSet2(_decrement_queued, this, true);
			queue_micro_task(() => {
				_classPrivateFieldSet2(_decrement_queued, this, false);
				if (this.linked) this.flush();
			});
		}
		/** @param {(batch: Batch) => void} fn */
		oncommit(fn) {
			_classPrivateFieldGet2(_commit_callbacks, this).set(fn, (eager_block_writes === null || eager_block_writes === void 0 ? void 0 : eager_block_writes.size) ? eager_block_writes : null);
		}
		/** @param {(batch: Batch) => void} fn */
		ondiscard(fn) {
			_classPrivateFieldGet2(_discard_callbacks, this).set(fn, (eager_block_writes === null || eager_block_writes === void 0 ? void 0 : eager_block_writes.size) ? eager_block_writes : null);
		}
		settled() {
			var _classPrivateFieldGet4;
			return ((_classPrivateFieldGet4 = _classPrivateFieldGet2(_deferred, this)) !== null && _classPrivateFieldGet4 !== void 0 ? _classPrivateFieldGet4 : _classPrivateFieldSet2(_deferred, this, deferred())).promise;
		}
		static ensure() {
			if (current_batch === null) {
				const batch = current_batch = new Batch();
				if (processing_batch === null && !is_flushing_sync) queue_micro_task(() => {
					if (!batch.started) batch.flush();
				});
			}
			return current_batch;
		}
		/**
		* Make this the current batch, and its view of the world the active one
		*/
		activate() {
			current_batch = this;
			view_batch = this;
			if (last_processed !== this.id) last_processed = null;
			if (!async_mode_flag) {
				batch_values = view_cache = null;
				return;
			}
			this.folded = [];
			if (!this.is_fork && this.prev === null && this.next === null) {
				batch_values = view_cache = null;
				return;
			}
			batch_values = new Map(this.current);
			view_cache = /* @__PURE__ */ new Map();
			for (let batch = first_batch; batch !== null; batch = batch.next) {
				if (batch === this || batch.is_fork) continue;
				if (batch.id < this.id && _assertClassBrand(_Batch_brand, batch, _intersects).call(batch, this)) this.folded.push(batch);
				else for (const [source, previous] of batch.previous) if (!batch_values.has(source) && ((source.f & 2) !== 0 || !source.equals(previous.v))) batch_values.set(source, previous);
			}
		}
		/**
		* The record of `reaction` in this batch's view of the world, i.e. that of this batch
		* or of the (earlier) batches whose changes it includes, if any
		* @param {Reaction} reaction
		* @returns {BatchRecord | undefined}
		*/
		get_record(reaction) {
			var _this$records3;
			var record = (_this$records3 = this.records) === null || _this$records3 === void 0 ? void 0 : _this$records3.get(reaction);
			var i = this.folded.length;
			while (record === void 0 && i--) {
				var _this$folded$i$record;
				record = (_this$folded$i$record = this.folded[i].records) === null || _this$folded$i$record === void 0 ? void 0 : _this$folded$i$record.get(reaction);
			}
			return record;
		}
		/**
		* @param {Value} signal
		* @param {number} status should be DIRTY or MAYBE_DIRTY
		* @param {Effect[] | null} [updated_during_traversal]
		* @returns {void}
		*/
		mark(signal, status, updated_during_traversal = null) {
			var reactions = signal.reactions;
			if (reactions === null) return;
			var runes = is_runes();
			var length = reactions.length;
			count_deps += length;
			if (count_deps > 1e5 && seen === null) seen = /* @__PURE__ */ new Set();
			if (seen !== null) {
				if (seen.has(signal)) return;
				seen.add(signal);
			}
			for (var i = 0; i < length; i++) {
				var reaction = reactions[i];
				var flags = reaction.f;
				if (!runes && reaction === active_effect) continue;
				var not_dirty = (flags & DIRTY) === 0;
				if ((flags & 131072) !== 0) {
					if (!this.is_fork) {
						if (not_dirty) set_signal_status(reaction, status);
						eager_effects.add(reaction);
					}
				} else if ((flags & 2) !== 0) {
					if (not_dirty) set_signal_status(reaction, status);
					var derived = reaction;
					view_cache === null || view_cache === void 0 || view_cache.delete(derived);
					this.mark(derived, MAYBE_DIRTY, updated_during_traversal);
				} else if (not_dirty) {
					var effect = reaction;
					if ((flags & 16) !== 0 && eager_block_effects !== null) {
						set_signal_status(effect, status);
						eager_block_effects.add(effect);
					}
					if (updated_during_traversal !== null) {
						set_signal_status(effect, status);
						updated_during_traversal.push(effect);
					} else this.schedule(effect, status);
				}
			}
		}
		/**
		* Schedule `effect` to be (re-)validated when this batch is processed. Its status only applies right
		* away if this is the batch that the current flush processes (next), or if a reaction is running (which
		* may have read what changed). Otherwise, whether an effect is dirty depends on this batch's view of the
		* world, so other batches (which may be processed first) mustn't see it: it is kept with this batch until
		* it is processed, and then checked against the exact versions of its dependencies (i.e. MAYBE_DIRTY)
		* @param {Effect} effect
		* @param {number} status DIRTY or MAYBE_DIRTY
		*/
		schedule(effect, status) {
			last_scheduled_effect = effect;
			if (view_batch !== null && view_batch !== this && effect !== active_reaction) {
				_assertClassBrand(_Batch_brand, this, _add_dirty_effect).call(this, effect, (effect.f & 2097152) !== 0 ? status : MAYBE_DIRTY);
				return;
			}
			if (processing_batch !== this && active_reaction === null) {
				if (this.prev !== null || this.next !== null || this.is_fork) {
					_assertClassBrand(_Batch_brand, this, _add_dirty_effect).call(this, effect, MAYBE_DIRTY);
					return;
				}
				status = MAYBE_DIRTY;
			}
			_assertClassBrand(_Batch_brand, this, _add).call(this, effect, status);
		}
	};
	_Batch = Batch;
	before_effects = null;
	eager_block_effects = null;
	eager_block_writes = null;
}));
// node_modules/svelte/src/internal/client/reactivity/effects.js
/**
* @param {Effect} effect
* @param {Effect} parent_effect
*/
function push_effect(effect, parent_effect) {
	var parent_last = parent_effect.last;
	if (parent_last === null) parent_effect.last = parent_effect.first = effect;
	else {
		parent_last.next = effect;
		effect.prev = parent_last;
		parent_effect.last = effect;
	}
}
/**
* @param {number} type
* @param {null | (() => void | (() => void))} fn
* @returns {Effect}
*/
function create_effect(type, fn) {
	var parent = active_effect;
	if (parent !== null && (parent.f & 8192) !== 0) type |= INERT;
	/** @type {Effect} */
	var effect = {
		ctx: component_context,
		deps: null,
		dv: null,
		edges: null,
		nodes: null,
		f: type | DIRTY | 512,
		first: null,
		fn,
		last: null,
		next: null,
		parent,
		b: parent && parent.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null,
		r: current_renderer
	};
	/** @type {Effect | null} */
	var e = effect;
	if ((type & 4) !== 0) {
		if (collected_effects !== null) collected_effects.push(effect);
		else Batch.ensure().schedule(effect, DIRTY);
	} else if (fn !== null) {
		try {
			update_effect(effect);
		} catch (e) {
			destroy_effect(effect);
			throw e;
		}
		if (e.edges === null && e.teardown === null && e.nodes === null && e.first === e.last && (e.f & 524288) === 0) {
			e = e.first;
			if ((type & 16) !== 0 && (type & 65536) !== 0 && e !== null) e.f |= EFFECT_TRANSPARENT;
		}
	}
	if (e !== null) {
		e.parent = parent;
		if (parent !== null) push_effect(e, parent);
		if (active_reaction !== null && (active_reaction.f & 2) !== 0 && (type & 64) === 0) {
			var _derived$effects;
			var derived = active_reaction;
			((_derived$effects = derived.effects) !== null && _derived$effects !== void 0 ? _derived$effects : derived.effects = []).push(e);
		}
	}
	return effect;
}
/**
* Internal representation of `$effect.tracking()`
* @returns {boolean}
*/
function effect_tracking() {
	return active_reaction !== null && !untracking;
}
/**
* @param {() => void | (() => void)} fn
*/
function create_user_effect(fn) {
	return create_effect(4 | USER_EFFECT, fn);
}
/**
* Internal representation of `$effect.root(...)`
* @param {() => void | (() => void)} fn
* @returns {() => void}
*/
function effect_root(fn) {
	Batch.ensure();
	const effect = create_effect(64 | EFFECT_PRESERVED, fn);
	return () => {
		destroy_effect(effect);
	};
}
/**
* An effect root whose children can transition out
* @param {() => void} fn
* @returns {(options?: { outro?: boolean }) => Promise<void>}
*/
function component_root(fn) {
	Batch.ensure();
	const effect = create_effect(64 | EFFECT_PRESERVED, fn);
	return (options = {}) => {
		return new Promise((fulfil) => {
			if (options.outro) pause_effect(effect, () => {
				destroy_effect(effect);
				fulfil(void 0);
			});
			else {
				destroy_effect(effect);
				fulfil(void 0);
			}
		});
	};
}
/**
* @param {() => void | (() => void)} fn
* @returns {Effect}
*/
function render_effect(fn, flags = 0) {
	return create_effect(8 | flags, fn);
}
/**
* @param {(() => void)} fn
* @param {number} flags
*/
function block(fn, flags = 0) {
	return create_effect(16 | flags, fn);
}
/**
* @param {(() => void)} fn
*/
function branch(fn) {
	return create_effect(32 | EFFECT_PRESERVED, fn);
}
/**
* @param {Effect} effect
*/
function execute_effect_teardown(effect) {
	var teardown = effect.teardown;
	if (teardown !== null) {
		const previously_destroying_effect = is_destroying_effect;
		const previous_teardown_version = teardown_version;
		const previous_teardown_context = teardown_context;
		const previous_reaction = active_reaction;
		set_is_destroying_effect(true);
		set_active_reaction(null);
		try {
			teardown.call(null);
		} catch (error) {
			invoke_error_boundary(error, effect.parent);
		} finally {
			set_is_destroying_effect(previously_destroying_effect, previous_teardown_version);
			set_teardown_context(previous_teardown_context);
			set_active_reaction(previous_reaction);
		}
	}
}
/**
* @param {Effect} signal
* @param {boolean} remove_dom
* @returns {void}
*/
function destroy_effect_children(signal, remove_dom = false) {
	var effect = signal.first;
	signal.first = signal.last = null;
	while (effect !== null) {
		abort_all(effect);
		var next = effect.next;
		if ((effect.f & 64) !== 0) effect.parent = null;
		else destroy_effect(effect, remove_dom);
		effect = next;
	}
}
/**
* @param {Effect} signal
* @returns {void}
*/
function destroy_block_effect_children(signal) {
	var effect = signal.first;
	while (effect !== null) {
		var next = effect.next;
		if ((effect.f & 32) === 0) destroy_effect(effect);
		effect = next;
	}
}
/**
* @param {Effect} effect
* @param {boolean} [remove_dom]
* @returns {void}
*/
function destroy_effect(effect, remove_dom = true) {
	var removed = false;
	var previous_renderer = custom_renderers_flag ? push_renderer(effect.r) : null;
	try {
		if ((remove_dom || (effect.f & 262144) !== 0) && effect.nodes !== null && effect.nodes.end !== null) {
			remove_effect_dom(effect.nodes.start, effect.nodes.end);
			removed = true;
		}
		effect.f |= DESTROYING;
		destroy_effect_children(effect, remove_dom && !removed);
		remove_reactions(effect);
		var transitions = effect.nodes && effect.nodes.t;
		if (transitions !== null) for (const transition of transitions) transition.stop();
		execute_effect_teardown(effect);
	} finally {
		if (custom_renderers_flag) pop_renderer(previous_renderer);
	}
	effect.f ^= DESTROYING;
	effect.f |= DESTROYED;
	var parent = effect.parent;
	if (parent !== null && parent.first !== null) unlink_effect(effect);
	effect.next = effect.prev = effect.teardown = effect.ctx = effect.deps = effect.dv = effect.edges = effect.fn = effect.nodes = effect.ac = effect.b = effect.r = null;
}
/**
*
* @param {TemplateNode | null} node
* @param {TemplateNode} end
*/
function remove_effect_dom(node, end) {
	while (node !== null) {
		/** @type {TemplateNode | null} */
		var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
		remove_node(node);
		node = next;
	}
}
/**
* Detach an effect from the effect tree, freeing up memory and
* reducing the amount of work that happens on subsequent traversals
* @param {Effect} effect
*/
function unlink_effect(effect) {
	var parent = effect.parent;
	var prev = effect.prev;
	var next = effect.next;
	if (prev !== null) prev.next = next;
	if (next !== null) next.prev = prev;
	if (parent !== null) {
		if (parent.first === effect) parent.first = next;
		if (parent.last === effect) parent.last = prev;
	}
}
/**
* When a block effect is removed, we don't immediately destroy it or yank it
* out of the DOM, because it might have transitions. Instead, we 'pause' it.
* It stays around (in memory, and in the DOM) until outro transitions have
* completed, and if the state change is reversed then we _resume_ it.
* A paused effect does not update, and the DOM subtree becomes inert.
* @param {Effect} effect
* @param {() => void} [callback]
* @param {boolean} [destroy]
*/
function pause_effect(effect, callback, destroy = true) {
	/** @type {TransitionManager[]} */
	var transitions = [];
	effect.f |= 256;
	pause_children(effect, transitions, true);
	var fn = () => {
		if (destroy) destroy_effect(effect);
		if (callback) callback();
	};
	var remaining = transitions.length;
	if (remaining > 0) {
		var context = teardown_context;
		var check = () => {
			if (!--remaining) {
				var previous_context = teardown_context;
				try {
					if (context) {
						context.derived_cache.clear();
						set_teardown_context(context);
					}
					fn();
				} finally {
					if (context) set_teardown_context(previous_context);
				}
			}
		};
		for (var transition of transitions) transition.out(check);
	} else fn();
}
/**
* @param {Effect} effect
* @param {TransitionManager[]} transitions
* @param {boolean} local
*/
function pause_children(effect, transitions, local) {
	if ((effect.f & 8192) !== 0) return;
	effect.f ^= INERT;
	var t = effect.nodes && effect.nodes.t;
	if (t !== null) {
		for (const transition of t) if (transition.is_global || local) transitions.push(transition);
	}
	var child = effect.first;
	while (child !== null) {
		var sibling = child.next;
		if ((child.f & 64) === 0) {
			var transparent = (child.f & 65536) !== 0 || (child.f & 32) !== 0 && (effect.f & 16) !== 0;
			pause_children(child, transitions, transparent ? local : false);
		}
		child = sibling;
	}
}
/**
* @param {Effect} effect
* @param {DocumentFragment} fragment
*/
function move_effect(effect, fragment) {
	if (!effect.nodes) return;
	var previous_renderer = custom_renderers_flag ? push_renderer(effect.r) : null;
	try {
		/** @type {TemplateNode | null} */
		var node = effect.nodes.start;
		var end = effect.nodes.end;
		while (node !== null) {
			/** @type {TemplateNode | null} */
			var next = node === end ? null : /* @__PURE__ */ get_next_sibling(node);
			append_child(fragment, node);
			node = next;
		}
	} finally {
		if (custom_renderers_flag) pop_renderer(previous_renderer);
	}
}
var init_effects = __esmMin((() => {
	init_runtime();
	init_constants$1();
	init_error_handling();
	init_errors();
	init_esm_env();
	init_utils$2();
	init_operations$1();
	init_context();
	init_batch();
	init_async$1();
	init_status();
	init_state();
	init_flags();
}));
// node_modules/svelte/src/internal/client/legacy.js
var captured_signals;
var init_legacy$2 = __esmMin((() => {
	init_sources();
	init_runtime();
	captured_signals = null;
}));
// node_modules/svelte/src/internal/client/dom/elements/misc.js
var init_misc$1 = __esmMin((() => {
	init_hydration();
	init_operations$1();
	init_task();
	init_constants$1();
}));
// node_modules/svelte/src/internal/client/dom/elements/bindings/shared.js
/**
* @template T
* @param {() => T} fn
*/
function without_reactive_context(fn) {
	var previous_reaction = active_reaction;
	var previous_effect = active_effect;
	set_active_reaction(null);
	set_active_effect(null);
	try {
		return fn();
	} finally {
		set_active_reaction(previous_reaction);
		set_active_effect(previous_effect);
	}
}
var init_shared$1 = __esmMin((() => {
	init_effects();
	init_runtime();
	init_constants$1();
	init_misc$1();
}));
// node_modules/svelte/src/internal/client/runtime.js
/**
* @param {boolean} value
* @param {number} [version]
*/
function set_is_destroying_effect(value, version = write_version) {
	is_destroying_effect = value;
	teardown_version = version;
}
/** @param {null | Reaction} reaction */
function set_active_reaction(reaction) {
	active_reaction = reaction;
}
/** @param {null | Effect} effect */
function set_active_effect(effect) {
	active_effect = effect;
}
/** @param {Value} value */
function push_reaction_value(value) {
	if (active_reaction !== null && (!async_mode_flag && (active_reaction.f & 2097152) !== 0 || (active_reaction.f & 2) !== 0)) {
		var _current_sources;
		((_current_sources = current_sources) !== null && _current_sources !== void 0 ? _current_sources : current_sources = /* @__PURE__ */ new Set()).add(value);
	}
}
/** @param {null | Value[]} value */
function set_untracked_writes(value) {
	untracked_writes = value;
}
/** @param {number} value */
function set_update_version(value) {
	update_version = value;
}
function increment_write_version() {
	return ++write_version;
}
/**
* The version `signal` has in the active view of the world, bringing deriveds up to date
* @param {Value} signal
*/
function version_of(signal) {
	var _batch_values$get;
	if (batch_values === null) {
		update_derived(signal);
		return signal.wv;
	}
	if ((signal.f & 2) !== 0) return get_view(signal).wv;
	return ((_batch_values$get = batch_values.get(signal)) !== null && _batch_values$get !== void 0 ? _batch_values$get : signal).wv;
}
/**
* Whether the values with the given versions are (still) what `deps` hold in the active view of the world.
* Dependencies are checked in order and deriveds are brought up to date along the way, so that we
* don't evaluate a derived that the reaction would no longer read (e.g. `a ? b : c` where `a` changed)
* @param {Value[] | null} deps
* @param {number[]} dv
*/
function is_current(deps, dv) {
	if (deps !== null) {
		for (var i = 0; i < dv.length; i++) if (version_of(deps[i]) !== dv[i]) return false;
	}
	return true;
}
/**
* Whether none of `deps` has been written since the version `wv` in the active view of the world, which is
* how a value assigned to a derived (whose version is `wv`) holds: until one of the values read by the run
* that applies in the view (see `get_view`) is written after it. Comparing versions with those the
* dependencies had at the time of the assignment, like `is_current` does, wouldn't work: a view might undo
* a write the assignment saw, and a committed fork might apply one it didn't see — but both writes happened
* before the assignment, so they don't make it outdated.
*
* This (and its counterpart in `teardown_view`) is where versions are compared by order across views. That only works for versions of writes
* (including assignments), which are allocated when the write happens. A derived's version is allocated when it is
* evaluated, which can be after the assignment even if everything it read was written before it (e.g. because it is
* evaluated lazily, or again in another view). So a derived only counts as changed if, in addition, one of the
* values its run in the view read was written after the assignment
* @param {Value[] | null} deps
* @param {number} wv
* @param {Set<Derived | DerivedRecord | BatchValue> | null} [unchanged] runs that this walk found unchanged,
* to avoid walking a derived that is reachable by more than one path (e.g. a diamond) once per path. Only valid
* within one top-level call: `wv` and the view are fixed, and the walk itself doesn't write anything
*/
function changed_since(deps, wv, unchanged = null) {
	if (deps !== null) for (var i = 0; i < deps.length; i++) {
		var dep = deps[i];
		if ((dep.f & 2) === 0) {
			if (version_of(dep) > wv) return true;
			continue;
		}
		/** @type {Derived | DerivedRecord | BatchValue} */
		var run = dep;
		if (batch_values === null) update_derived(dep);
		else run = get_view(dep);
		if (run.wv > wv) {
			if (run === dep ? (dep.f & 67108864) !== 0 : !("dv" in run)) return true;
			if (unchanged === null) unchanged = /* @__PURE__ */ new Set();
			else if (unchanged.has(run)) continue;
			if (changed_since(
				/** @type {DerivedRecord} */
				run.deps,
				wv,
				unchanged
			)) return true;
			unchanged.add(run);
		}
	}
	return false;
}
/**
* For block/async effects returns the record of the {@link view_batch} (if any), else reaction itself.
* @param {Reaction} reaction
* @returns {Reaction | BatchRecord}
*/
function run_of(reaction) {
	return (reaction.f & 4194320) !== 0 && (view_batch === null || view_batch === void 0 ? void 0 : view_batch.get_record(reaction)) || reaction;
}
/**
* Determines whether a derived or effect is dirty.
* If it is MAYBE_DIRTY (or an assigned derived) and isn't, will set the status to CLEAN.
* Deriveds are only checked like this in the real world — within the view of a batch,
* see {@link get_view}. Effects are checked against the run that applies (see `run_of`).
* @param {Reaction} reaction
* @returns {boolean}
*/
function is_dirty(reaction) {
	var flags = reaction.f;
	if ((flags & 6144) === 0) return false;
	if ((flags & 67108864) !== 0) {
		if (changed_since(reaction.deps, reaction.wv)) return true;
	} else if ((flags & 2048) !== 0) return true;
	else {
		var run = run_of(reaction);
		var deps = run.deps;
		var dv = run.dv;
		if (dv === null) return true;
		if (batch_values === null) for (var i = 0, length = dv.length; i < length; i++) {
			var dependency = deps[i];
			update_derived(dependency);
			if (dependency.wv !== dv[i]) return true;
		}
		else if (!is_current(deps, dv)) return true;
	}
	if ((flags & 512) !== 0) set_signal_status(reaction, CLEAN);
	return false;
}
/**
* @param {Value} signal
* @param {Effect} effect
* @param {boolean} [root]
*/
function schedule_possible_effect_self_invalidation(signal, effect, root = true) {
	var reactions = signal.reactions;
	if (reactions === null) return;
	if (!async_mode_flag && current_sources !== null && current_sources.has(signal)) return;
	for (var i = 0; i < reactions.length; i++) {
		var reaction = reactions[i];
		if ((reaction.f & 2) !== 0) schedule_possible_effect_self_invalidation(reaction, effect, false);
		else if (effect === reaction)
 /** @type {Batch} */ current_batch.schedule(reaction, root ? DIRTY : MAYBE_DIRTY);
	}
}
/** @param {AbortController | null | undefined} controller */
function abort_signal(controller) {
	if (controller) without_reactive_context(() => controller.abort(STALE_REACTION));
}
/**
* Abort the signal of a record of `reaction` that a batch replaces or drops — unless another batch holds the
* record, too (see `keep_global_run`), in which case it aborts once the last one lets go of it
* @param {Reaction} reaction
* @param {BatchRecord | undefined} record
* @param {boolean} [rerun] whether `reaction` is about to run again (see `abort_replaced`). The active batch
* and the batches that the new run supersedes still hold the record then, but don't count
*/
function abort_record(reaction, record, rerun = false) {
	if (!(record === null || record === void 0 ? void 0 : record.ac)) return;
	for (var b = first_batch; b !== null; b = b.next) {
		var _b$records;
		if (((_b$records = b.records) === null || _b$records === void 0 ? void 0 : _b$records.get(reaction)) === record && !(rerun && (b === view_batch || supersedes(current_batch, b)))) return;
	}
	abort_signal(record.ac);
	record.ac = null;
}
/**
* Before `reaction` runs again, abort the signals of the runs it replaces: its run in the active batch (which the
* new run replaces either way, see `update_record`), its global run if the new run is going to replace that one,
* and the runs of earlier batches that a run in a real batch supersedes (see `supersedes`). (Forks stay
* independent until they're committed or discarded.) Whether a derived's run in a view replaces the global run
* is only known once it's done (see `set_global_signal`) — unless the global run is outdated in the real world
* anyway
* @param {Reaction} reaction
* @param {number} flags
*/
function abort_replaced(reaction, flags) {
	var _view_batch$records;
	var batch = current_batch;
	var is_derived = (flags & 2) !== 0;
	if (is_derived && is_destroying_effect) return;
	var real = batch === null || !batch.is_fork;
	abort_record(reaction, view_batch === null || view_batch === void 0 || (_view_batch$records = view_batch.records) === null || _view_batch$records === void 0 ? void 0 : _view_batch$records.get(reaction), true);
	if (is_derived ? batch_values === null || real && is_outdated(reaction) : real) abort_signal(reaction.ac);
	for (var b = first_batch; b !== null; b = b.next) {
		var _b$records2;
		if (supersedes(batch, b)) abort_record(reaction, (_b$records2 = b.records) === null || _b$records2 === void 0 ? void 0 : _b$records2.get(reaction), true);
	}
}
/**
* The run that just ended is the global state of `reaction`: its signal replaces the global run's, which aborts —
* unless other batches took that run over, along with its signal (see `keep_global_run`)
* @param {Reaction} reaction
*/
function set_global_signal(reaction) {
	abort_signal(reaction.ac);
	reaction.ac = abort_controller;
}
/**
* Whether a run is invalid or a dependency's real-world version has changed.
* This does not evaluate derived dependencies, which may themselves be outdated.
* @param {Reaction | BatchRecord} run
*/
function is_outdated({ deps, dv }) {
	return dv === null || dv.some((version, i) => deps[i].wv !== version);
}
/**
* Whether a run in `batch` supersedes the runs of batch `other`, so that their signals abort (see `abort_replaced`):
* a run in a real batch supersedes those of earlier batches whose writes it saw — because it ran in the real world,
* or in a view that folds them, or undoes none of their writes (e.g. because they committed, see `Batch#activate`).
* The runs of other earlier batches read their writes, which this run didn't see, so they still apply in their
* views. Forks stay independent until they're committed or discarded
* @param {Batch | null} batch
* @param {Batch} other
*/
function supersedes(batch, other) {
	return batch !== null && !batch.is_fork && !other.is_fork && other.id < batch.id && (batch_values === null || other.previous.size === 0 || batch.folded.includes(other));
}
/**
* Abort all signals of `reaction` (see `getAbortSignal`), e.g. because it's destroyed.
* Returns whether a run had requested a signal, even if it was already aborted
* @param {Reaction} reaction
*/
function abort_all(reaction) {
	if ((reaction.f & 134217728) === 0) return false;
	reaction.f ^= HAS_ABORT_CONTROLLER;
	abort_signal(reaction.ac);
	reaction.ac = null;
	for (var b = first_batch; b !== null; b = b.next) {
		var _b$records3;
		var record = (_b$records3 = b.records) === null || _b$records3 === void 0 ? void 0 : _b$records3.get(reaction);
		if (record === null || record === void 0 ? void 0 : record.ac) {
			abort_signal(record.ac);
			record.ac = null;
		}
	}
	return true;
}
/**
* Whether or not we should unconditionally record a reaction run within a batch, as opposed
* to updating the signal directly. True for async effects, and previously-initialized
* block effects (as long as they run during traversal, rather than on commit)
* @param {number} flags
*/
function is_recorded_effect(flags) {
	if ((flags & 4194304) === 0 && (flags & 32784) !== 32784) return false;
	return view_batch !== null && view_batch === current_batch;
}
/** @param {Reaction} reaction */
function update_reaction(reaction) {
	const batch = current_batch;
	var previous_deps = new_deps;
	var previous_skipped_deps = skipped_deps;
	var previous_untracked_writes = untracked_writes;
	var previous_reaction = active_reaction;
	var previous_sources = current_sources;
	var previous_component_context = component_context;
	var previous_untracking = untracking;
	var previous_update_version = update_version;
	var flags = reaction.f;
	new_deps = null;
	skipped_deps = 0;
	untracked_writes = null;
	active_reaction = (flags & 96) === 0 ? reaction : null;
	current_sources = null;
	set_component_context(reaction.ctx);
	untracking = false;
	update_version = ++read_version;
	var previous_abort_controller = abort_controller;
	abort_controller = null;
	if ((flags & 134217728) !== 0) abort_replaced(reaction, flags);
	try {
		reaction.f |= REACTION_IS_UPDATING;
		var fn = reaction.fn;
		var result = fn();
		reaction.f |= REACTION_RAN;
		update_dependencies(reaction, flags, result, false);
		if (is_runes() && untracked_writes !== null && !untracking && (new_deps !== null || skipped_deps > 0) && (reaction.f & 6146) === 0) for (var i = 0; i < untracked_writes.length; i++) schedule_possible_effect_self_invalidation(untracked_writes[i], reaction);
		if (previous_reaction !== null && previous_reaction !== reaction) {
			read_version++;
			if (previous_reaction.deps !== null) for (let i = 0; i < previous_skipped_deps; i += 1) previous_reaction.deps[i].rv = read_version;
			if (previous_deps !== null) for (const dep of previous_deps) dep.rv = read_version;
			if (untracked_writes !== null) {
				if (previous_untracked_writes === null) previous_untracked_writes = untracked_writes;
				else previous_untracked_writes.push(...untracked_writes);
			}
		}
		return result;
	} catch (error) {
		var value = error;
		try {
			value = handle_error(error);
		} finally {
			update_dependencies(reaction, flags, value, value === error);
		}
		return value;
	} finally {
		var signal = abort_controller === null || abort_controller === void 0 ? void 0 : /** @type {AbortController | null} */ abort_controller.signal;
		if (batch !== null && signal !== void 0) signal.addEventListener("abort", () => {
			if (current_batch !== null) {
				const target = merge_target(batch);
				if (target !== current_batch && target.linked && !target.is_fork) current_batch.merge_requests.add(target);
			}
		});
		reaction.f ^= REACTION_IS_UPDATING;
		new_deps = previous_deps;
		skipped_deps = previous_skipped_deps;
		untracked_writes = previous_untracked_writes;
		active_reaction = previous_reaction;
		current_sources = previous_sources;
		set_component_context(previous_component_context);
		untracking = previous_untracking;
		update_version = previous_update_version;
		abort_controller = previous_abort_controller;
	}
}
/**
* Store the result of the current run of `reaction` where it belongs — the versions of the
* values it read and, for a derived, its value — and update the edges of the graph.
*
* A run belongs to the real world — and becomes the reaction's global state — unless
* - it is a derived that read values which aren't the latest ones (it is then stored in the batch
*   whose view of the world it ran in, see {@link get_view})
* - it is an effect run that belongs to a batch (see {@link update_record})
* - it is a derived evaluated in a teardown, in which case only the teardown sees it (see `teardown_view`)
*
* The edges of the graph (`reaction.edges` and the `reactions` of its dependencies) are a
* superset of the dependencies of every live record, so that changes to any of them reach
* the reaction. They are only pruned when a global run happens and no batch holds a record.
* @param {Reaction} reaction
* @param {number} flags the flags of the reaction before the run
* @param {any} value the value of the run (only relevant for deriveds)
* @param {boolean} error whether the value is an error
*/
function update_dependencies(reaction, flags, value, error) {
	var deps = reaction.deps;
	var length = skipped_deps + (new_deps === null ? 0 : new_deps.length);
	var dv = reaction.dv;
	if ((reaction.f & 16384) !== 0) {
		abort_signal(abort_controller);
		return;
	}
	if (abort_controller !== null && (reaction.f & 134217728) === 0) {
		abort_signal(abort_controller);
		abort_controller = null;
	}
	if ((flags & 2) !== 0 && is_destroying_effect) {
		var wv = 0;
		for (var j = 0; j < length; j++) {
			var dep = j < skipped_deps ? deps[j] : /** @type {Value[]} */ new_deps[j - skipped_deps];
			wv = Math.max(wv, teardown_version_of(dep));
		}
		teardown_run = {
			v: value,
			wv,
			e: error,
			assigned: (flags & ASSIGNED) !== 0
		};
		return;
	}
	if ((flags & 2) !== 0 && batch_values === null && first_batch !== null && first_batch.next !== null) keep_global_run(reaction, flags);
	if (new_deps === null && batch_values === null && dv !== null && length === (deps === null || deps === void 0 ? void 0 : deps.length) && reaction.edges === deps && (flags & 4194320) === 0) {
		for (var i = 0; i < length; i++) dv[i] = deps[i].wv;
		if (dv.length !== length) dv.length = length;
		if ((flags & 2) !== 0) set_derived_value(reaction, value, error);
		if (reaction.ac || abort_controller) set_global_signal(reaction);
		return;
	}
	update_record(reaction, flags, length, value, error);
}
/**
* Make `value` the (real-world) value of `derived` — it keeps its version if it is the same value
* @param {Derived} derived
* @param {any} value
* @param {boolean} error
*/
function set_derived_value(derived, value, error) {
	var flags = derived.f & ~ASSIGNED;
	if (error || (flags & 8388608) !== 0 || !derived.equals(value)) {
		derived.v = value;
		derived.wv = increment_write_version();
		flags = error ? flags | ERROR_VALUE : flags & ~ERROR_VALUE;
	}
	derived.f = flags;
	update_derived_status(derived);
}
/**
* The general case of `update_dependencies`, which
* 1. decides where the run belongs: to the batch whose view of the world is active (as a record, see
*    `Batch#records`), or to the real world (as the reaction's global state)
* 2. records the versions of the values the run read (`dv`)
* 3. updates the edges of the graph
* 4. stores the run where it belongs
* @param {Reaction} reaction
* @param {number} flags the flags of the reaction before the run
* @param {number} length the number of values the run read
* @param {any} value the value of the run (only relevant for deriveds)
* @param {boolean} error whether the value is an error
*/
function update_record(reaction, flags, length, value, error) {
	var should_record = is_recorded_effect(flags);
	if (batch_values !== null && (flags & 2) !== 0) {
		var written = batch_values.get(reaction);
		if (written !== void 0 && written.wv !== reaction.wv) should_record = true;
	}
	var deps = reaction.deps;
	var read = deps;
	if (new_deps !== null || skipped_deps !== (deps === null || deps === void 0 ? void 0 : deps.length)) {
		var _new_deps;
		read = skipped_deps === 0 ? new_deps : /** @type {Value[]} */ deps.slice(0, skipped_deps).concat((_new_deps = new_deps) !== null && _new_deps !== void 0 ? _new_deps : []);
	}
	var dv = !should_record && batch_values === null && reaction.dv !== null ? reaction.dv : [];
	for (var i = 0; i < length; i++) {
		var dep = read[i];
		dv[i] = seen_version(dep);
		if (batch_values !== null && (flags & 2) !== 0 && (dv[i] !== dep.wv || (dep.f & 1026) === 2)) should_record = true;
	}
	if (dv.length !== length) dv.length = length;
	if (!should_record && batch_values !== null && (flags & 2) !== 0) keep_global_run(reaction, flags);
	var keep = should_record || has_batch_record(reaction);
	var tracking = effect_tracking() && (reaction.f & 512) !== 0;
	var edges = reaction.edges;
	if (keep && edges !== null) {
		if (new_deps !== null) {
			reaction.edges = edges = edges.slice();
			for (dep of new_deps) if (!includes.call(edges, dep)) {
				var _dep, _dep$reactions;
				edges.push(dep);
				if (tracking) ((_dep$reactions = (_dep = dep).reactions) !== null && _dep$reactions !== void 0 ? _dep$reactions : _dep.reactions = []).push(reaction);
			}
		}
	} else {
		if (edges === deps) {
			if (edges !== null) for (i = skipped_deps; i < edges.length; i++) remove_reaction(reaction, edges[i]);
			if (tracking && new_deps !== null) {
				var _dep2, _dep2$reactions;
				for (dep of new_deps) ((_dep2$reactions = (_dep2 = dep).reactions) !== null && _dep2$reactions !== void 0 ? _dep2$reactions : _dep2.reactions = []).push(reaction);
			}
		} else {
			var added = new Set(read);
			for (dep of edges) if (!added.delete(dep)) remove_reaction(reaction, dep);
			if (tracking) {
				var _dep3, _dep3$reactions;
				for (dep of added) ((_dep3$reactions = (_dep3 = dep).reactions) !== null && _dep3$reactions !== void 0 ? _dep3$reactions : _dep3.reactions = []).push(reaction);
			}
		}
		reaction.edges = read;
	}
	if (should_record) {
		var _batch$records;
		var batch = view_batch;
		((_batch$records = batch.records) !== null && _batch$records !== void 0 ? _batch$records : batch.records = /* @__PURE__ */ new Map()).set(reaction, (flags & 2) !== 0 ? {
			deps: read,
			dv,
			v: value,
			e: error,
			wv: derived_version(reaction, batch, value, error),
			ac: abort_controller
		} : {
			deps: read,
			dv,
			ac: abort_controller
		});
	} else {
		reaction.deps = read;
		reaction.dv = dv;
		if (reaction.ac || abort_controller) set_global_signal(reaction);
		if ((flags & 2) !== 0) {
			var _view_batch$records2;
			set_derived_value(reaction, value, error);
			view_batch === null || view_batch === void 0 || (_view_batch$records2 = view_batch.records) === null || _view_batch$records2 === void 0 || _view_batch$records2.delete(reaction);
		}
	}
}
/**
* A run of `derived` that becomes its global state replaces the current one, which other batches may still see:
* their views differ from the real world, and can undo the writes that made it outdated. It is kept as a record in
* each of them that doesn't have one, so that they don't evaluate the derived again — which would give an equal value
* a new version, and re-run what saw the current one (restarting async work, for example). That's also the case if
* the new value is equal, and so keeps its version: the derived itself would still run again, with whatever side
* effects it has (like asking for a new abort signal). (Like any record, it is only used where it `is_current`)
*
* If the derived uses an abort signal, the kept run's may have been aborted when the derived ran again. Only the batches
* that the new run supersedes (see `supersedes`) keep it regardless — it stays aborted for them until something it read
* changes in their view. The others (forks, later batches) evaluate the derived again.
*
* A fork's run supersedes nothing, though, so the run it replaces isn't aborted: a batch may still be waiting for it.
* Every other batch keeps it then, and the record takes over its signal, which aborts once no batch holds the record
* anymore (see `abort_record`)
* @param {Derived} derived
* @param {number} flags the flags of the derived before the run
*/
function keep_global_run(derived, flags) {
	var dv = derived.dv;
	if (dv === null || dv.length === 0 || (flags & 67108864) !== 0) return;
	/** @type {DerivedRecord | undefined} */
	var record;
	var ac = derived.ac;
	var live = ac !== null && current_batch !== null && current_batch.is_fork && !ac.signal.aborted;
	for (var batch = first_batch; batch !== null; batch = batch.next) {
		var _batch$records2;
		if (batch !== view_batch && !((_batch$records2 = batch.records) === null || _batch$records2 === void 0 ? void 0 : _batch$records2.has(derived)) && (ac === null || live || supersedes(current_batch, batch))) {
			var _record, _batch, _batch$records3;
			(_record = record) !== null && _record !== void 0 || (record = {
				deps: derived.deps,
				dv: dv.slice(),
				v: derived.v,
				wv: derived.wv,
				e: (flags & 8388608) !== 0
			});
			((_batch$records3 = (_batch = batch).records) !== null && _batch$records3 !== void 0 ? _batch$records3 : _batch.records = /* @__PURE__ */ new Map()).set(derived, record);
		}
	}
	if (live && record !== void 0) {
		record.ac = ac;
		derived.ac = null;
	}
}
/**
* The version of `signal` that the current run saw. Recording it never evaluates anything: a derived that
* isn't in the view's cache (anymore) was invalidated by a write during the run, or can't be cached —
* the run then doesn't count as having seen its current version, just like in the real world, where
* a derived that changes during the run gets a new version only once it is evaluated again
* @param {Value} signal
*/
function seen_version(signal) {
	var _batch_values$get2;
	if (batch_values === null) return signal.wv;
	if ((signal.f & 2) !== 0) {
		var _cache$get$wv, _cache$get;
		return (_cache$get$wv = (_cache$get = view_cache.get(signal)) === null || _cache$get === void 0 ? void 0 : _cache$get.wv) !== null && _cache$get$wv !== void 0 ? _cache$get$wv : -1;
	}
	return ((_batch_values$get2 = batch_values.get(signal)) !== null && _batch_values$get2 !== void 0 ? _batch_values$get2 : signal).wv;
}
/**
* Reuse the version of an equal value in the batch's previous run, then the global value,
* or allocate a new one. Errors always get a new version
* @param {Derived} derived
* @param {Batch} batch
* @param {any} value
* @param {boolean} error
*/
function derived_version(derived, batch, value, error) {
	if (!error) {
		var previous = batch.get_record(derived);
		if (previous !== void 0 && !previous.e && derived.equals.call(previous, value)) return previous.wv;
		if ((derived.f & 8388608) === 0 && derived.equals(value)) return derived.wv;
	}
	return increment_write_version();
}
/**
* Make the record a batch holds of `reaction` its global state, e.g. because the batch
* committed, which makes its results the real-world ones (for a derived, that includes its value)
* @param {Reaction} reaction
* @param {BatchRecord} record
*/
function promote_record(reaction, record) {
	var _record$ac;
	reaction.deps = record.deps;
	reaction.dv = (reaction.f & 2) !== 0 ? record.dv.slice() : record.dv;
	if ((reaction.f & 2) !== 0) {
		var derived = reaction;
		derived.v = record.v;
		derived.wv = record.wv;
		derived.f = (record.e ? derived.f | ERROR_VALUE : derived.f & ~ERROR_VALUE) & ~ASSIGNED;
		update_derived_status(derived);
	}
	abort_signal(reaction.ac);
	reaction.ac = (_record$ac = record.ac) !== null && _record$ac !== void 0 ? _record$ac : null;
	record.ac = null;
}
/** @param {Reaction} reaction */
function has_batch_record(reaction) {
	for (var batch = first_batch; batch !== null; batch = batch.next) {
		var _batch$records4;
		if ((_batch$records4 = batch.records) === null || _batch$records4 === void 0 ? void 0 : _batch$records4.has(reaction)) return true;
	}
	return false;
}
/**
* Remove the edges of an effect that only runs no batch holds anymore needed (because the batch committed and
* its record was promoted, or because it was dropped), once no batch holds a record of it, so that its edges are
* what its global run read again. `update_record` only prunes edges in a global run that happens while no batch
* holds a record, which block and async effects hardly ever have: they run in batches.
* (Not for deriveds: their edges also notify the reactions that read the value of a record that was dropped. They
* are pruned by their next global run)
* @param {Reaction} effect
*/
function prune_edges(effect) {
	var edges = effect.edges;
	var deps = effect.deps;
	if (edges === deps || has_batch_record(effect)) return;
	for (var dep of edges) if (deps === null || !includes.call(deps, dep)) remove_reaction(effect, dep);
	effect.edges = deps;
}
/**
* Connect a reaction outside its normal dependency update, without duplicating subscriptions
* @param {Value} signal
* @param {Reaction} reaction
*/
function add_reaction(signal, reaction) {
	var _signal$reactions;
	var reactions = (_signal$reactions = signal.reactions) !== null && _signal$reactions !== void 0 ? _signal$reactions : signal.reactions = [];
	if (!includes.call(reactions, reaction)) reactions.push(reaction);
}
/**
* @template V
* @param {Reaction} signal
* @param {Value<V>} dependency
* @returns {void}
*/
function remove_reaction(signal, dependency) {
	let reactions = dependency.reactions;
	if (reactions !== null) {
		var index = index_of.call(reactions, signal);
		if (index !== -1) {
			var new_length = reactions.length - 1;
			if (new_length === 0) reactions = dependency.reactions = null;
			else {
				reactions[index] = reactions[new_length];
				reactions.pop();
			}
		}
	}
	if (reactions === null && (dependency.f & 2) !== 0 && (new_deps === null || !includes.call(new_deps, dependency))) {
		var derived = dependency;
		if ((derived.f & 512) !== 0) derived.f ^= 512;
		if (derived.v !== UNINITIALIZED) update_derived_status(derived);
		if (abort_all(derived)) {
			var _b$records4;
			set_signal_status(derived, DIRTY);
			derived.dv = null;
			for (var b = first_batch; b !== null; b = b.next) (_b$records4 = b.records) === null || _b$records4 === void 0 || _b$records4.delete(derived);
			view_cache === null || view_cache === void 0 || view_cache.delete(derived);
		}
		freeze_derived_effects(derived);
		remove_reactions(derived);
	}
}
/**
* @param {Reaction} signal
* @returns {void}
*/
function remove_reactions(signal) {
	var dependencies = signal.edges;
	if (dependencies === null) return;
	for (var i = 0; i < dependencies.length; i++) remove_reaction(signal, dependencies[i]);
}
/**
* @param {Effect} effect
* @returns {void}
*/
function update_effect(effect) {
	var flags = effect.f;
	if ((flags & 16384) !== 0) return;
	set_signal_status(effect, CLEAN);
	var previous_effect = active_effect;
	active_effect = effect;
	var previous_renderer = custom_renderers_flag ? push_renderer(effect.r) : null;
	try {
		if ((flags & 16777232) !== 0) destroy_block_effect_children(effect);
		else destroy_effect_children(effect);
		execute_effect_teardown(effect);
		var teardown = update_reaction(effect);
		effect.teardown = typeof teardown === "function" ? teardown : null;
		effect.wv = write_version;
	} finally {
		active_effect = previous_effect;
		if (custom_renderers_flag) pop_renderer(previous_renderer);
	}
}
/**
* @template V
* @param {Value<V>} signal
* @returns {V}
*/
function get(signal) {
	var is_derived = (signal.f & 2) !== 0;
	captured_signals === null || captured_signals === void 0 || captured_signals.add(signal);
	/** The reaction that reads `signal` after an `await`, if any */
	var late_reader = null;
	if (active_reaction !== null && !untracking) {
		if (!(active_effect !== null && (active_effect.f & 16384) !== 0) && (current_sources === null || !current_sources.has(signal))) {
			var deps = active_reaction.deps;
			if ((active_reaction.f & 2097152) !== 0) {
				if (signal.rv < read_version) {
					signal.rv = read_version;
					if (new_deps === null && deps !== null && deps[skipped_deps] === signal) skipped_deps++;
					else if (new_deps === null) new_deps = [signal];
					else new_deps.push(signal);
				}
			} else {
				late_reader = active_reaction;
				var edges = active_reaction.edges;
				if (edges === null || !includes.call(edges, signal)) active_reaction.edges = edges === null ? [signal] : [...edges, signal];
				add_reaction(signal, active_reaction);
			}
		}
	}
	if (is_destroying_effect) {
		var held = teardown_view(signal);
		if (held !== void 0) {
			if (held.e) throw held.v;
			return held.v;
		}
	}
	/**
	* The value (and version) as the active view of the world sees it, if it differs from the real
	* world — for a derived, this is the derived itself if its global state applies (see `get_view`)
	* @type {{ v: any, wv: number, e?: boolean } | undefined}
	*/
	var view;
	if (is_derived) {
		var derived = signal;
		var should_connect = (derived.f & 512) === 0 && !untracking && active_reaction !== null && (active_reaction.f & 512) !== 0;
		var is_new = (derived.f & REACTION_RAN) === 0;
		if (should_connect) derived.f |= 512;
		if (batch_values !== null) view = get_view(derived);
		else update_derived(derived);
		if (should_connect && !is_new) {
			unfreeze_derived_effects(derived);
			reconnect(derived);
		}
	} else if (batch_values !== null) view = batch_values.get(signal);
	if (late_reader !== null) record_late_read(late_reader, signal, view === void 0 ? signal.wv : view.wv);
	if (view !== void 0 && view !== signal) {
		if (view.e) throw view.v;
		return view.v;
	}
	if ((signal.f & 8388608) !== 0) throw signal.v;
	return signal.v;
}
/**
* Record that `reaction` read `signal` (with the given version) after an `await`, i.e. after
* its run — as part of the record of that run
* @param {Reaction} reaction
* @param {Value} signal
* @param {number} version
*/
function record_late_read(reaction, signal, version) {
	var run = run_of(reaction);
	var deps = run.deps;
	if (run.dv !== null && (deps === null || !includes.call(deps, signal))) {
		run.deps = deps === null ? [signal] : [...deps, signal];
		run.dv.push(version);
	}
}
/**
* (Re)connect a disconnected derived, so that it is notified
* of changes in `mark_reactions`
* @param {Derived} derived
*/
function reconnect(derived) {
	derived.f |= 512;
	if (derived.edges === null) return;
	for (const dep of derived.edges) {
		add_reaction(dep, derived);
		if ((dep.f & 2) !== 0 && (dep.f & 512) === 0) {
			unfreeze_derived_effects(dep);
			reconnect(dep);
		}
	}
}
/**
* The value of `signal` in the view of the world of the running teardown, if it differs from the active one:
* teardowns revert the writes that caused them, apart from their own (see `TeardownContext`). Deriveds always
* get one, since their runs in a teardown only belong to it, and it is cached until the view changes:
* - a value written to the derived, while none of its dependencies is written after it (like in `get_view`)
* - its global run, if its dependencies still have the versions that run read
* - otherwise a new run (see `update_dependencies`), which keeps the version of the value it replaces if equal
* @param {Value} signal
* @returns {BatchValue | undefined}
*/
function teardown_view(signal) {
	var _derived$deps, _dv$length, _held;
	var written = signal.wv > teardown_version ? void 0 : teardown_context === null || teardown_context === void 0 ? void 0 : teardown_context.reverted_values.get(signal);
	if ((signal.f & 2) === 0) return written;
	var derived = signal;
	var cache = (teardown_context !== null && teardown_context !== void 0 ? teardown_context : push_teardown_context()).derived_cache;
	var record = cache.get(derived);
	if (record !== void 0) return record;
	var held = written !== null && written !== void 0 ? written : batch_values === null || batch_values === void 0 ? void 0 : batch_values.get(derived);
	var assigned = held === void 0 ? (derived.f & ASSIGNED) !== 0 : held.assigned;
	var dv = held === void 0 && !assigned ? derived.dv : null;
	var deps = (_derived$deps = derived.deps) !== null && _derived$deps !== void 0 ? _derived$deps : [];
	var holds = assigned || dv !== null;
	var length = (_dv$length = dv === null || dv === void 0 ? void 0 : dv.length) !== null && _dv$length !== void 0 ? _dv$length : deps.length;
	(_held = held) !== null && _held !== void 0 || (held = {
		v: derived.v,
		wv: derived.wv,
		e: (derived.f & 8388608) !== 0,
		assigned: (derived.f & 67108864) !== 0
	});
	for (var i = 0; holds && i < length; i++) {
		var version = teardown_version_of(deps[i]);
		holds = dv === null ? version <= held.wv : version === dv[i];
	}
	if (holds) record = held;
	else {
		execute_derived(derived);
		record = teardown_run;
		if (held.wv < record.wv && !held.e && !record.e && derived.equals.call(held, record.v)) record.wv = held.wv;
	}
	cache.set(derived, record);
	return record;
}
/**
* The version of `signal` in the view of the world of the running teardown
* @param {Value} signal
*/
function teardown_version_of(signal) {
	var _ref, _teardown_view;
	return ((_ref = (_teardown_view = teardown_view(signal)) !== null && _teardown_view !== void 0 ? _teardown_view : batch_values === null || batch_values === void 0 ? void 0 : batch_values.get(signal)) !== null && _ref !== void 0 ? _ref : signal).wv;
}
/**
* When used inside a [`$derived`](https://svelte.dev/docs/svelte/$derived) or [`$effect`](https://svelte.dev/docs/svelte/$effect),
* any state read inside `fn` will not be treated as a dependency.
*
* ```ts
* $effect(() => {
*   // this will run when `data` changes, but not when `time` changes
*   save(data, {
*     timestamp: untrack(() => time)
*   });
* });
* ```
* @template T
* @param {() => T} fn
* @returns {T}
*/
function untrack(fn) {
	var previous_untracking = untracking;
	try {
		untracking = true;
		return fn();
	} finally {
		untracking = previous_untracking;
	}
}
var is_destroying_effect, teardown_version, teardown_run, active_reaction, untracking, active_effect, current_sources, new_deps, skipped_deps, untracked_writes, write_version, read_version, update_version, abort_controller;
var init_runtime = __esmMin((() => {
	init_esm_env();
	init_utils$2();
	init_effects();
	init_constants$1();
	init_deriveds();
	init_flags();
	init_tracing();
	init_dev();
	init_context();
	init_batch();
	init_error_handling();
	init_constants();
	init_legacy$2();
	init_shared$1();
	init_status();
	init_async$1();
	init_errors();
	init_warnings();
	init_state();
	is_destroying_effect = false;
	teardown_version = 0;
	teardown_run = {
		v: void 0,
		wv: 0,
		e: false,
		assigned: false
	};
	active_reaction = null;
	untracking = false;
	active_effect = null;
	current_sources = null;
	new_deps = null;
	skipped_deps = 0;
	untracked_writes = null;
	write_version = 1;
	read_version = 0;
	update_version = read_version;
	abort_controller = null;
}));
// node_modules/svelte/src/internal/client/proxy.js
/**
* @template T
* @param {T} value
* @returns {T}
*/
function proxy(value) {
	if (typeof value !== "object" || value === null || STATE_SYMBOL in value || COMPONENT_SYMBOL in value) return value;
	const prototype = get_prototype_of(value);
	if (prototype !== object_prototype && prototype !== array_prototype) return value;
	/** @type {Map<any, Source<any>>} */
	var sources = /* @__PURE__ */ new Map();
	var is_proxied_array = is_array(value);
	var version = /* @__PURE__ */ state(0);
	var stack = null;
	var parent_version = update_version;
	/**
	* Executes the proxy in the context of the reaction it was originally created in, if any
	* @template T
	* @param {() => T} fn
	*/
	var with_parent = (fn) => {
		if (update_version === parent_version) return fn();
		var reaction = active_reaction;
		var version = update_version;
		set_active_reaction(null);
		set_update_version(parent_version);
		var result = fn();
		set_active_reaction(reaction);
		set_update_version(version);
		return result;
	};
	if (is_proxied_array) sources.set("length", /* @__PURE__ */ state(
		/** @type {any[]} */
		value.length,
		stack
	));
	return new Proxy(value, {
		defineProperty(_, prop, descriptor) {
			if (!("value" in descriptor) || descriptor.configurable === false || descriptor.enumerable === false || descriptor.writable === false) state_descriptors_fixed();
			var s = sources.get(prop);
			if (s === void 0) with_parent(() => {
				var s = /* @__PURE__ */ state(descriptor.value, stack);
				sources.set(prop, s);
				return s;
			});
			else set(s, descriptor.value, true);
			return true;
		},
		deleteProperty(target, prop) {
			var s = sources.get(prop);
			if (s === void 0) {
				if (prop in target) {
					const s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED, stack));
					sources.set(prop, s);
					increment(version);
				}
			} else {
				set(s, UNINITIALIZED);
				increment(version);
			}
			return true;
		},
		get(target, prop, receiver) {
			var _get_descriptor;
			if (prop === STATE_SYMBOL) return value;
			var s = sources.get(prop);
			var exists = prop in target;
			if (s === void 0 && (!exists || ((_get_descriptor = get_descriptor(target, prop)) === null || _get_descriptor === void 0 ? void 0 : _get_descriptor.writable))) {
				s = with_parent(() => {
					return /* @__PURE__ */ state(proxy(exists ? target[prop] : UNINITIALIZED), stack);
				});
				sources.set(prop, s);
			}
			if (s !== void 0) {
				var v = get(s);
				return v === UNINITIALIZED ? void 0 : v;
			}
			return Reflect.get(target, prop, receiver);
		},
		getOwnPropertyDescriptor(target, prop) {
			var _this$has;
			(_this$has = this.has) === null || _this$has === void 0 || _this$has.call(this, target, prop);
			var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
			var s = sources.get(prop);
			if (s !== void 0) {
				var value = get(s);
				if (value === UNINITIALIZED) return;
				if (descriptor && "value" in descriptor) descriptor.value = value;
				else return {
					enumerable: true,
					configurable: true,
					value,
					writable: true
				};
			}
			return descriptor;
		},
		has(target, prop) {
			var _get_descriptor2;
			if (prop === STATE_SYMBOL) return true;
			var s = sources.get(prop);
			var has = s !== void 0 && s.v !== UNINITIALIZED || Reflect.has(target, prop);
			if (s !== void 0 || (active_effect !== null || active_reaction !== null) && (!has || ((_get_descriptor2 = get_descriptor(target, prop)) === null || _get_descriptor2 === void 0 ? void 0 : _get_descriptor2.writable))) {
				if (s === void 0) {
					s = with_parent(() => {
						return /* @__PURE__ */ state(has ? proxy(target[prop]) : UNINITIALIZED, stack);
					});
					sources.set(prop, s);
				}
				if (get(s) === UNINITIALIZED) return false;
			}
			return has;
		},
		set(target, prop, value, receiver) {
			var s = sources.get(prop);
			var has = prop in target;
			if (is_proxied_array && prop === "length") for (var i = value; i < s.v; i += 1) {
				var other_s = sources.get(i + "");
				if (other_s !== void 0) set(other_s, UNINITIALIZED);
				else if (i in target) {
					other_s = with_parent(() => /* @__PURE__ */ state(UNINITIALIZED, stack));
					sources.set(i + "", other_s);
				}
			}
			if (s === void 0) {
				var _get_descriptor3;
				if (!has || ((_get_descriptor3 = get_descriptor(target, prop)) === null || _get_descriptor3 === void 0 ? void 0 : _get_descriptor3.writable)) {
					s = with_parent(() => /* @__PURE__ */ state(void 0, stack));
					set(s, proxy(value));
					sources.set(prop, s);
				}
			} else {
				has = s.v !== UNINITIALIZED;
				var p = with_parent(() => proxy(value));
				set(s, p);
			}
			var descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
			if (descriptor === null || descriptor === void 0 ? void 0 : descriptor.set) descriptor.set.call(receiver, value);
			if (!has) {
				if (is_proxied_array && typeof prop === "string") {
					var ls = sources.get("length");
					var n = Number(prop);
					if (Number.isInteger(n) && n >= ls.v) set(ls, n + 1);
				}
				increment(version);
			}
			return true;
		},
		ownKeys(target) {
			get(version);
			var own_keys = Reflect.ownKeys(target).filter((key) => {
				var source = sources.get(key);
				return source === void 0 || source.v !== UNINITIALIZED;
			});
			for (var [key, source] of sources) if (source.v !== UNINITIALIZED && !(key in target)) own_keys.push(key);
			return own_keys;
		},
		setPrototypeOf() {
			state_prototype_fixed();
		}
	});
}
var init_proxy = __esmMin((() => {
	init_esm_env();
	init_runtime();
	init_utils$2();
	init_sources();
	init_constants$1();
	init_constants();
	init_errors();
	init_tracing();
	init_dev();
	init_flags();
}));
var init_equality = __esmMin((() => {
	init_warnings();
	init_proxy();
}));
// node_modules/svelte/src/internal/client/dom/operations.js
/**
* Initialize these lazily to avoid issues when using the runtime in a server context
* where these globals are not available while avoiding a separate server entry point
*/
function init_operations() {
	if ($window !== void 0) return;
	$window = window;
	$document = document;
	is_firefox = /Firefox/.test(navigator.userAgent);
	var element_prototype = Element.prototype;
	var node_prototype = Node.prototype;
	var text_prototype = Text.prototype;
	first_child_getter = get_descriptor(node_prototype, "firstChild").get;
	next_sibling_getter = get_descriptor(node_prototype, "nextSibling").get;
	if (is_extensible(element_prototype)) {
		/** @type {any} */ element_prototype[CLASS_CACHE] = void 0;
		/** @type {any} */ element_prototype[ATTRIBUTES_CACHE] = null;
		/** @type {any} */ element_prototype[STYLE_CACHE] = void 0;
		element_prototype.__e = void 0;
	}
	if (is_extensible(text_prototype))
 /** @type {any} */ text_prototype[TEXT_CACHE] = void 0;
}
/**
* @param {string} value
* @returns {Text}
*/
function create_text(value = "") {
	if (current_renderer) return current_renderer.createText(value);
	return document.createTextNode(value);
}
/**
* @template {Node} N
* @param {N} node
*/
/*@__NO_SIDE_EFFECTS__*/
function get_first_child(node) {
	if (current_renderer) return current_renderer.getFirstChild(node);
	return first_child_getter.call(node);
}
/**
* @template {Node} N
* @param {N} node
*/
/*@__NO_SIDE_EFFECTS__*/
function get_next_sibling(node) {
	if (current_renderer) return current_renderer.getNextSibling(node);
	return next_sibling_getter.call(node);
}
/**
* @template {Node} N
* @param {N} node
* @returns {void}
*/
function clear_text_content(node) {
	if (current_renderer) {
		var child = current_renderer.getFirstChild(node);
		while (child !== null) {
			var next = current_renderer.getNextSibling(child);
			current_renderer.remove(child);
			child = next;
		}
		return;
	}
	node.textContent = "";
}
/**
* Branching here is intentional and load-bearing for perf. `createElement(tag)`
* hits a fast path in Blink that `createElementNS(NAMESPACE_HTML, tag)` doesn't,
* and passing an explicit `undefined` as the trailing options arg measurably
* slows both APIs. Funnelling every case through a single `createElementNS(ns,
* tag, options)` call would be smaller but slower on the HTML path.
*
* @template {keyof HTMLElementTagNameMap | string} T
* @param {T} tag
* @param {string} [namespace]
* @param {string} [is]
* @returns {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element}
*/
function create_element(tag, namespace, is) {
	if (current_renderer) return current_renderer.createElement(tag);
	if (namespace == null || namespace === "http://www.w3.org/1999/xhtml") return is ? document.createElement(tag, { is }) : document.createElement(tag);
	return is ? document.createElementNS(namespace, tag, { is }) : document.createElementNS(namespace, tag);
}
function create_fragment() {
	if (current_renderer) return current_renderer.createFragment();
	return document.createDocumentFragment();
}
/**
* @param {Node | null | undefined} node
*/
function node_type(node) {
	if (node == null) return void 0;
	if (current_renderer) {
		const type = current_renderer.getNodeType(node);
		return CUSTOM_RENDERER_NODE_TYPE_MAP[type];
	}
	return node.nodeType;
}
/**
* @param {Node} node
* @returns {TemplateNode | null}
*/
function get_parent_node(node) {
	if (current_renderer) return current_renderer.getParent(node);
	return node.parentNode;
}
/**
* @param {Node} parent
* @param {Node} child
* @returns {Node}
*/
function append_child(parent, child) {
	if (current_renderer) {
		current_renderer.insert(parent, child, null);
		return child;
	}
	return parent.appendChild(child);
}
/**
* Insert `new_node` before `ref_node` (equivalent to `ref_node.before(new_node)`)
* @param {ChildNode} ref_node
* @param {Node} new_node
*/
function insert_before(ref_node, new_node) {
	if (current_renderer) {
		var parent = current_renderer.getParent(ref_node);
		current_renderer.insert(parent, new_node, ref_node);
		return;
	}
	ref_node.before(new_node);
}
/**
* @param {ChildNode} node
*/
function remove_node(node) {
	if (current_renderer) {
		current_renderer.remove(node);
		return;
	}
	node.remove();
}
/**
* @param {Node} parent
* @param {ChildNode} child
* @returns {ChildNode}
*/
function remove_child(parent, child) {
	if (current_renderer) {
		current_renderer.remove(child);
		return child;
	}
	return parent.removeChild(child);
}
/**
* @param {Node} node
* @returns {string | null}
*/
function get_node_value(node) {
	if (current_renderer) return current_renderer.getText(node);
	return node.nodeValue;
}
var $window, $document, is_firefox, first_child_getter, next_sibling_getter;
var init_operations$1 = __esmMin((() => {
	init_hydration();
	init_esm_env();
	init_equality();
	init_utils$2();
	init_runtime();
	init_constants$1();
	init_batch();
	init_constants();
	init_state();
	init_errors();
}));
// node_modules/svelte/src/internal/init-operations.js
var init_init_operations = __esmMin((() => {
	init_operations$1();
	init_operations();
}));
// node_modules/svelte/src/version.js
var init_version = __esmMin((() => {}));
// node_modules/svelte/src/internal/disclose-version.js
var _globalThis$__svelte, _globalThis$__svelte$, _globalThis$1, _globalThis$__svelte2;
var init_disclose_version = __esmMin((() => {
	init_version();
	if (typeof window !== "undefined") ((_globalThis$__svelte$ = (_globalThis$__svelte = (_globalThis$__svelte2 = (_globalThis$1 = globalThis).__svelte) !== null && _globalThis$__svelte2 !== void 0 ? _globalThis$__svelte2 : _globalThis$1.__svelte = {}).v) !== null && _globalThis$__svelte$ !== void 0 ? _globalThis$__svelte$ : _globalThis$__svelte.v = /* @__PURE__ */ new Set()).add("5");
}));
// node_modules/svelte/src/internal/flags/legacy.js
var init_legacy$1 = __esmMin((() => {
	init_flags();
	enable_legacy_mode_flag();
}));
// node_modules/svelte/src/internal/client/hydratable.js
var init_hydratable = __esmMin((() => {
	init_hydration();
	init_errors();
}));
// node_modules/svelte/src/utils.js
/**
* Returns `true` if `name` is a passive event
* @param {string} name
*/
function is_passive_event(name) {
	return PASSIVE_EVENTS.includes(name);
}
var DOM_BOOLEAN_ATTRIBUTES, PASSIVE_EVENTS, STATE_CREATION_RUNES;
var init_utils$1 = __esmMin((() => {
	DOM_BOOLEAN_ATTRIBUTES = [
		"allowfullscreen",
		"async",
		"autofocus",
		"autoplay",
		"checked",
		"controls",
		"default",
		"disabled",
		"formnovalidate",
		"indeterminate",
		"inert",
		"ismap",
		"loop",
		"multiple",
		"muted",
		"nomodule",
		"novalidate",
		"open",
		"playsinline",
		"readonly",
		"required",
		"reversed",
		"seamless",
		"selected",
		"webkitdirectory",
		"defer",
		"disablepictureinpicture",
		"disableremoteplayback"
	];
	[...DOM_BOOLEAN_ATTRIBUTES];
	PASSIVE_EVENTS = ["touchstart", "touchmove"];
	STATE_CREATION_RUNES = [
		"$state",
		"$state.raw",
		"$derived",
		"$derived.by"
	];
	[...STATE_CREATION_RUNES];
}));
// node_modules/svelte/src/internal/client/dom/elements/events.js
/**
* Makes `target` a root for delegated events: listens on `target` and on `document`
* for every delegated event type, including types registered later, and dispatches
* them to the handlers set with `delegated(...)`. Used for `mount`/`hydrate` targets,
* and for DOM containers that DOM content is rendered into from a custom renderer.
*
* This always uses DOM methods directly (rather than renderer-aware operations),
* since it may be torn down while a custom renderer is active.
* @param {EventTarget} target
* @returns {() => void} stops listening
*/
function listen_to_delegated_events(target) {
	/** @type {Set<string>} */
	var registered_events = /* @__PURE__ */ new Set();
	/** @param {Array<string>} events */
	var event_handle = (events) => {
		for (var i = 0; i < events.length; i++) {
			var event_name = events[i];
			if (registered_events.has(event_name)) continue;
			registered_events.add(event_name);
			var passive = is_passive_event(event_name);
			for (const node of [target, document]) {
				var counts = delegated_listeners.get(node);
				if (counts === void 0) {
					counts = /* @__PURE__ */ new Map();
					delegated_listeners.set(node, counts);
				}
				var count = counts.get(event_name);
				if (count === void 0) {
					node.addEventListener(event_name, handle_event_propagation, { passive });
					counts.set(event_name, 1);
				} else counts.set(event_name, count + 1);
			}
		}
	};
	event_handle(array_from(all_registered_events));
	root_event_handles.add(event_handle);
	return () => {
		for (var event_name of registered_events) for (const node of [target, document]) {
			var counts = delegated_listeners.get(node);
			var count = counts.get(event_name);
			if (--count == 0) {
				node.removeEventListener(event_name, handle_event_propagation);
				counts.delete(event_name);
				if (counts.size === 0) delegated_listeners.delete(node);
			} else counts.set(event_name, count);
		}
		root_event_handles.delete(event_handle);
	};
}
/**
* @this {EventTarget}
* @param {Event} event
* @returns {void}
*/
function handle_event_propagation(event) {
	var _event$composedPath;
	var handler_element = this;
	var was_stopped = event.cancelBubble;
	if (was_stopped && event[propagation_stopped_at] === handler_element) return;
	if (!was_stopped) delete event[propagation_stopped_at];
	var owner_document = handler_element.ownerDocument;
	var event_name = event.type;
	var path = ((_event$composedPath = event.composedPath) === null || _event$composedPath === void 0 ? void 0 : _event$composedPath.call(event)) || [];
	var current_target = path[0] || event.target;
	last_propagated_event = event;
	if (!last_propagated_event_clear_scheduled) {
		last_propagated_event_clear_scheduled = true;
		setTimeout(() => {
			last_propagated_event_clear_scheduled = false;
			last_propagated_event = null;
		});
	}
	var path_idx = 0;
	var handled_at = last_propagated_event === event && event[event_symbol];
	if (handled_at) {
		var at_idx = path.indexOf(handled_at);
		if (at_idx !== -1 && (handler_element === document || handler_element === window)) {
			event[event_symbol] = handler_element;
			return;
		}
		var handler_idx = path.indexOf(handler_element);
		if (handler_idx === -1) return;
		if (at_idx <= handler_idx) path_idx = at_idx;
	}
	current_target = path[path_idx] || event.target;
	if (current_target === handler_element) return;
	define_property(event, "currentTarget", {
		configurable: true,
		get() {
			return current_target || owner_document;
		}
	});
	var previous_reaction = active_reaction;
	var previous_effect = active_effect;
	set_active_reaction(null);
	set_active_effect(null);
	try {
		/**
		* @type {unknown}
		*/
		var throw_error;
		/**
		* @type {unknown[]}
		*/
		var other_errors = [];
		while (current_target !== null) {
			if (current_target === handler_element) break;
			try {
				var _current_target$event;
				var delegated = (_current_target$event = current_target[event_symbol]) === null || _current_target$event === void 0 ? void 0 : _current_target$event[event_name];
				if (delegated != null && (!current_target.disabled || event.target === current_target)) delegated.call(current_target, event);
			} catch (error) {
				if (throw_error) other_errors.push(error);
				else throw_error = error;
			}
			if (event.cancelBubble) {
				if (!was_stopped) event[propagation_stopped_at] = handler_element;
				break;
			}
			path_idx++;
			current_target = path_idx < path.length ? path[path_idx] : null;
		}
		if (throw_error) {
			for (let error of other_errors) queueMicrotask(() => {
				throw error;
			});
			throw throw_error;
		}
	} finally {
		event[event_symbol] = handler_element;
		delete event.currentTarget;
		set_active_reaction(previous_reaction);
		set_active_effect(previous_effect);
	}
}
var event_symbol, propagation_stopped_at, all_registered_events, root_event_handles, delegated_listeners, last_propagated_event, last_propagated_event_clear_scheduled;
var init_events = __esmMin((() => {
	init_effects();
	init_utils$2();
	init_utils$1();
	init_hydration();
	init_task();
	init_runtime();
	init_shared$1();
	init_operations$1();
	init_state();
	event_symbol = Symbol("events");
	propagation_stopped_at = Symbol("propagation stopped at");
	all_registered_events = /* @__PURE__ */ new Set();
	root_event_handles = /* @__PURE__ */ new Set();
	delegated_listeners = /* @__PURE__ */ new Map();
	last_propagated_event = null;
	last_propagated_event_clear_scheduled = false;
})), _globalThis;
var init_reconciler = __esmMin((() => {
	init_operations$1();
	(_globalThis = globalThis) !== null && _globalThis !== void 0 && (_globalThis = _globalThis.window) !== null && _globalThis !== void 0 && _globalThis.trustedTypes;
}));
// node_modules/svelte/src/internal/client/dom/template.js
/**
* @param {TemplateNode} start
* @param {TemplateNode | null} end
*/
function assign_nodes(start, end) {
	var effect = active_effect;
	if (effect.nodes === null) effect.nodes = {
		start,
		end,
		a: null,
		t: null
	};
}
/**
* Assign the created (or in hydration mode, traversed) dom elements to the current block
* and insert the elements into the dom (in client mode).
* @param {Text | Comment | Element} anchor
* @param {DocumentFragment | Element} dom
*/
function append(anchor, dom) {
	if (hydrating) {
		var effect = active_effect;
		if ((effect.f & 32768) === 0 || effect.nodes.end === null) effect.nodes.end = hydrate_node;
		hydrate_next();
		return;
	}
	if (anchor === null) return;
	insert_before(anchor, dom);
}
var init_template = __esmMin((() => {
	init_constants$1();
	init_state();
	init_runtime();
	init_hydration();
	init_operations$1();
	init_reconciler();
}));
// node_modules/svelte/src/reactivity/create-subscriber.js
/**
* Returns a `subscribe` function that integrates external event-based systems with Svelte's reactivity.
* It's particularly useful for integrating with web APIs like `MediaQuery`, `IntersectionObserver`, or `WebSocket`.
*
* If `subscribe` is called inside an effect (including indirectly, for example inside a getter),
* the `start` callback will be called with an `update` function. Whenever `update` is called, the effect re-runs.
*
* If `start` returns a cleanup function, it will be called when the effect is destroyed.
*
* If `subscribe` is called in multiple effects, `start` will only be called once as long as the effects
* are active, and the returned teardown function will only be called when all effects are destroyed.
*
* It's best understood with an example. Here's an implementation of [`MediaQuery`](https://svelte.dev/docs/svelte/svelte-reactivity#MediaQuery):
*
* ```js
* import { createSubscriber } from 'svelte/reactivity';
* import { on } from 'svelte/events';
*
* export class MediaQuery {
* 	#query;
* 	#subscribe;
*
* 	constructor(query) {
* 		this.#query = window.matchMedia(`(${query})`);
*
* 		this.#subscribe = createSubscriber((update) => {
* 			// when the `change` event occurs, re-run any effects that read `this.current`
* 			const off = on(this.#query, 'change', update);
*
* 			// stop listening when all the effects are destroyed
* 			return () => off();
* 		});
* 	}
*
* 	get current() {
* 		// This makes the getter reactive, if read in an effect
* 		this.#subscribe();
*
* 		// Return the current state of the query, whether or not we're in an effect
* 		return this.#query.matches;
* 	}
* }
* ```
* @param {(update: () => void) => (() => void) | void} start
* @since 5.7.0
*/
function createSubscriber(start) {
	let subscribers = 0;
	let version = source(0);
	/** @type {(() => void) | void} */
	let stop;
	return () => {
		if (effect_tracking()) {
			get(version);
			render_effect(() => {
				if (subscribers === 0) stop = untrack(() => start(() => increment(version)));
				subscribers += 1;
				return () => {
					queue_micro_task(() => {
						subscribers -= 1;
						if (subscribers === 0) {
							stop === null || stop === void 0 || stop();
							stop = void 0;
							increment(version);
						}
					});
				};
			});
		}
	};
}
var init_create_subscriber = __esmMin((() => {
	init_runtime();
	init_effects();
	init_sources();
	init_tracing();
	init_esm_env();
	init_task();
}));
// node_modules/svelte/src/internal/client/dom/blocks/boundary.js
/**
* @param {TemplateNode} node
* @param {BoundaryProps} props
* @param {((anchor: Node) => void)} children
* @param {((error: unknown) => unknown) | undefined} [transform_error]
* @returns {void}
*/
function boundary(node, props, children, transform_error) {
	new Boundary(node, props, children, transform_error);
}
function _hydrate_resolved_content() {
	try {
		_classPrivateFieldSet2(_main_effect, this, branch(() => _classPrivateFieldGet2(_children, this).call(this, _classPrivateFieldGet2(_anchor, this))));
	} catch (error) {
		this.error(error);
	}
}
/**
* @param {unknown} error The deserialized error from the server's hydration comment
*/
function _hydrate_failed_content(error) {
	const failed = _classPrivateFieldGet2(_props, this).failed;
	const { reset, invoke_onerror } = _assertClassBrand(_Boundary_brand, this, _create_reset).call(this, error);
	queue_micro_task(invoke_onerror);
	if (!failed) return;
	_classPrivateFieldSet2(_failed_effect, this, branch(() => {
		failed(_classPrivateFieldGet2(_anchor, this), () => error, () => reset);
	}));
}
/**
* Creates the `reset` function for a failed boundary, along with a function
* that invokes `onerror` with it (if provided)
* @param {unknown} error
* @returns {{ reset: () => void, invoke_onerror: () => void }}
*/
function _create_reset(error) {
	var did_reset = false;
	var calling_on_error = false;
	const reset = () => {
		if (_assertClassBrand(_Boundary_brand, this, _is_destroyed).call(this)) return;
		if (did_reset) {
			svelte_boundary_reset_noop();
			return;
		}
		did_reset = true;
		if (calling_on_error) svelte_boundary_reset_onerror();
		if (_classPrivateFieldGet2(_failed_effect, this) !== null) pause_effect(_classPrivateFieldGet2(_failed_effect, this), () => {
			_classPrivateFieldSet2(_failed_effect, this, null);
		});
		_assertClassBrand(_Boundary_brand, this, _run).call(this, () => {
			_assertClassBrand(_Boundary_brand, this, _render).call(this);
		});
	};
	const invoke_onerror = () => {
		if (_assertClassBrand(_Boundary_brand, this, _is_destroyed).call(this)) return;
		try {
			var _classPrivateFieldGet2$1, _classPrivateFieldGet3;
			calling_on_error = true;
			(_classPrivateFieldGet2$1 = (_classPrivateFieldGet3 = _classPrivateFieldGet2(_props, this)).onerror) === null || _classPrivateFieldGet2$1 === void 0 || _classPrivateFieldGet2$1.call(_classPrivateFieldGet3, error, reset);
			calling_on_error = false;
		} catch (err) {
			invoke_error_boundary(err, _classPrivateFieldGet2(_effect, this) && _classPrivateFieldGet2(_effect, this).parent);
		}
	};
	return {
		reset,
		invoke_onerror
	};
}
function _is_destroyed() {
	return (_classPrivateFieldGet2(_effect, this).f & (DESTROYED | DESTROYING)) !== 0;
}
function _hydrate_pending_content() {
	const pending = _classPrivateFieldGet2(_props, this).pending;
	if (!pending) return;
	this.is_pending = true;
	_classPrivateFieldSet2(_pending_effect, this, branch(() => pending(_classPrivateFieldGet2(_anchor, this))));
	queue_micro_task(() => {
		if (_assertClassBrand(_Boundary_brand, this, _is_destroyed).call(this)) return;
		var previous_renderer = custom_renderers_flag ? push_renderer(_classPrivateFieldGet2(_effect, this).r) : null;
		try {
			var fragment = _classPrivateFieldSet2(_offscreen_fragment, this, create_fragment());
			var anchor = create_text();
			append_child(fragment, anchor);
			_classPrivateFieldSet2(_main_effect, this, _assertClassBrand(_Boundary_brand, this, _run).call(this, () => {
				try {
					return branch(() => _classPrivateFieldGet2(_children, this).call(this, anchor));
				} catch (error) {
					try {
						this.error(error);
					} catch (error) {
						invoke_error_boundary(error, _classPrivateFieldGet2(_effect, this).parent);
					}
					return null;
				}
			}));
			if (_classPrivateFieldGet2(_main_effect, this) !== null && _classPrivateFieldGet2(_pending, this).size === 0) {
				this.is_pending = false;
				insert_before(_classPrivateFieldGet2(_anchor, this), fragment);
				_classPrivateFieldSet2(_offscreen_fragment, this, null);
				pause_effect(_classPrivateFieldGet2(_pending_effect, this), () => {
					_classPrivateFieldSet2(_pending_effect, this, null);
				});
			}
		} finally {
			if (custom_renderers_flag) pop_renderer(previous_renderer);
		}
	});
}
function _render() {
	try {
		this.is_pending = this.has_pending_snippet();
		_classPrivateFieldSet2(_local_pending_count, this, 0);
		_classPrivateFieldSet2(_main_effect, this, branch(() => {
			_classPrivateFieldGet2(_children, this).call(this, _classPrivateFieldGet2(_anchor, this));
		}));
		if (_classPrivateFieldGet2(_pending, this).size === 0) this.is_pending = false;
		else {
			const pending = _classPrivateFieldGet2(_props, this).pending;
			if (pending) {
				var fragment = _classPrivateFieldSet2(_offscreen_fragment, this, create_fragment());
				move_effect(_classPrivateFieldGet2(_main_effect, this), fragment);
				_classPrivateFieldSet2(_pending_effect, this, branch(() => pending(_classPrivateFieldGet2(_anchor, this))));
			}
		}
	} catch (error) {
		this.error(error);
	}
}
/**
* @template T
* @param {() => T} fn
*/
function _run(fn) {
	var previous_effect = active_effect;
	var previous_reaction = active_reaction;
	var previous_ctx = component_context;
	set_active_effect(_classPrivateFieldGet2(_effect, this));
	set_active_reaction(_classPrivateFieldGet2(_effect, this));
	set_component_context(_classPrivateFieldGet2(_effect, this).ctx);
	var previous_renderer = custom_renderers_flag ? push_renderer(_classPrivateFieldGet2(_effect, this).r) : null;
	try {
		Batch.ensure();
		return fn();
	} finally {
		set_active_effect(previous_effect);
		set_active_reaction(previous_reaction);
		set_component_context(previous_ctx);
		if (custom_renderers_flag) pop_renderer(previous_renderer);
	}
}
/**
* @param {unknown} error
*/
function _handle_error(error) {
	if (_classPrivateFieldGet2(_main_effect, this)) {
		destroy_effect(_classPrivateFieldGet2(_main_effect, this));
		_classPrivateFieldSet2(_main_effect, this, null);
	}
	if (_classPrivateFieldGet2(_pending_effect, this)) {
		destroy_effect(_classPrivateFieldGet2(_pending_effect, this));
		_classPrivateFieldSet2(_pending_effect, this, null);
	}
	if (_classPrivateFieldGet2(_failed_effect, this)) {
		destroy_effect(_classPrivateFieldGet2(_failed_effect, this));
		_classPrivateFieldSet2(_failed_effect, this, null);
	}
	if (hydrating) {
		set_hydrate_node(_classPrivateFieldGet2(_hydrate_open, this));
		next();
		set_hydrate_node(skip_nodes());
	}
	let failed = _classPrivateFieldGet2(_props, this).failed;
	/** @param {unknown} transformed_error */
	const handle_error_result = (transformed_error) => {
		if (_assertClassBrand(_Boundary_brand, this, _is_destroyed).call(this)) return;
		const { reset, invoke_onerror } = _assertClassBrand(_Boundary_brand, this, _create_reset).call(this, transformed_error);
		invoke_onerror();
		if (failed && !_assertClassBrand(_Boundary_brand, this, _is_destroyed).call(this)) _classPrivateFieldSet2(_failed_effect, this, _assertClassBrand(_Boundary_brand, this, _run).call(this, () => {
			try {
				return branch(() => {
					var effect = active_effect;
					effect.b = this;
					effect.f |= 128;
					failed(_classPrivateFieldGet2(_anchor, this), () => transformed_error, () => reset);
				});
			} catch (error) {
				invoke_error_boundary(error, _classPrivateFieldGet2(_effect, this).parent);
				return null;
			}
		}));
	};
	queue_micro_task(() => {
		if (_assertClassBrand(_Boundary_brand, this, _is_destroyed).call(this)) return;
		/** @type {unknown} */
		var result;
		try {
			result = this.transform_error(error);
		} catch (e) {
			invoke_error_boundary(e, _classPrivateFieldGet2(_effect, this) && _classPrivateFieldGet2(_effect, this).parent);
			return;
		}
		if (result !== null && typeof result === "object" && typeof result.then === "function")
 /** @type {any} */ result.then(
			handle_error_result,
			/** @param {unknown} e */
			(e) => invoke_error_boundary(e, _classPrivateFieldGet2(_effect, this) && _classPrivateFieldGet2(_effect, this).parent)
		);
		else handle_error_result(result);
	});
}
var flags, _anchor, _hydrate_open, _props, _children, _effect, _main_effect, _pending_effect, _failed_effect, _offscreen_fragment, _local_pending_count, _pending_count_update_queued, _effects, _pending, _effect_pending, _effect_pending_subscriber, _Boundary_brand, Boundary;
var init_boundary = __esmMin((() => {
	init_constants$1();
	init_constants();
	init_context();
	init_error_handling();
	init_effects();
	init_runtime();
	init_hydration();
	init_task();
	init_errors();
	init_warnings();
	init_esm_env();
	init_batch();
	init_sources();
	init_tracing();
	init_create_subscriber();
	init_operations$1();
	init_status();
	init_state();
	init_flags();
	init_classPrivateMethodInitSpec();
	init_defineProperty();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	init_assertClassBrand();
	flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED;
	_anchor = /* @__PURE__ */ new WeakMap();
	_hydrate_open = /* @__PURE__ */ new WeakMap();
	_props = /* @__PURE__ */ new WeakMap();
	_children = /* @__PURE__ */ new WeakMap();
	_effect = /* @__PURE__ */ new WeakMap();
	_main_effect = /* @__PURE__ */ new WeakMap();
	_pending_effect = /* @__PURE__ */ new WeakMap();
	_failed_effect = /* @__PURE__ */ new WeakMap();
	_offscreen_fragment = /* @__PURE__ */ new WeakMap();
	_local_pending_count = /* @__PURE__ */ new WeakMap();
	_pending_count_update_queued = /* @__PURE__ */ new WeakMap();
	_effects = /* @__PURE__ */ new WeakMap();
	_pending = /* @__PURE__ */ new WeakMap();
	_effect_pending = /* @__PURE__ */ new WeakMap();
	_effect_pending_subscriber = /* @__PURE__ */ new WeakMap();
	_Boundary_brand = /* @__PURE__ */ new WeakSet();
	Boundary = class {
		/**
		* @param {TemplateNode} node
		* @param {BoundaryProps} props
		* @param {((anchor: Node) => void)} children
		* @param {((error: unknown) => unknown) | undefined} [transform_error]
		*/
		constructor(node, props, children, transform_error) {
			var _ref, _this$parent;
			_classPrivateMethodInitSpec(this, _Boundary_brand);
			_defineProperty(
				this,
				/** @type {Boundary | null} */
				"parent",
				void 0
			);
			_defineProperty(this, "is_pending", false);
			_defineProperty(
				this,
				/**
				* API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
				* Inherited from parent boundary, or defaults to identity.
				* @type {(error: unknown) => unknown}
				*/
				"transform_error",
				void 0
			);
			_classPrivateFieldInitSpec(this, _anchor, void 0);
			_classPrivateFieldInitSpec(this, _hydrate_open, hydrating ? hydrate_node : null);
			_classPrivateFieldInitSpec(this, _props, void 0);
			_classPrivateFieldInitSpec(this, _children, void 0);
			_classPrivateFieldInitSpec(this, _effect, void 0);
			_classPrivateFieldInitSpec(this, _main_effect, null);
			_classPrivateFieldInitSpec(this, _pending_effect, null);
			_classPrivateFieldInitSpec(this, _failed_effect, null);
			_classPrivateFieldInitSpec(this, _offscreen_fragment, null);
			_classPrivateFieldInitSpec(this, _local_pending_count, 0);
			_classPrivateFieldInitSpec(this, _pending_count_update_queued, false);
			_classPrivateFieldInitSpec(this, _effects, []);
			_classPrivateFieldInitSpec(this, _pending, /* @__PURE__ */ new Map());
			_classPrivateFieldInitSpec(this, _effect_pending, null);
			_classPrivateFieldInitSpec(this, _effect_pending_subscriber, createSubscriber(() => {
				_classPrivateFieldSet2(_effect_pending, this, source(_classPrivateFieldGet2(_local_pending_count, this)));
				return () => {
					_classPrivateFieldSet2(_effect_pending, this, null);
				};
			}));
			_classPrivateFieldSet2(_anchor, this, node);
			_classPrivateFieldSet2(_props, this, props);
			_classPrivateFieldSet2(_children, this, (anchor) => {
				var effect = active_effect;
				effect.b = this;
				effect.f |= 128;
				children(anchor);
			});
			this.parent = active_effect.b;
			this.transform_error = (_ref = transform_error !== null && transform_error !== void 0 ? transform_error : (_this$parent = this.parent) === null || _this$parent === void 0 ? void 0 : _this$parent.transform_error) !== null && _ref !== void 0 ? _ref : ((e) => e);
			_classPrivateFieldSet2(_effect, this, block(() => {
				if (hydrating) {
					const comment_data = read_hydration_instruction(_classPrivateFieldGet2(_hydrate_open, this));
					hydrate_next();
					const server_rendered_pending = comment_data === "[!";
					if (comment_data.startsWith("[?")) {
						const serialized_error = JSON.parse(comment_data.slice(2));
						_assertClassBrand(_Boundary_brand, this, _hydrate_failed_content).call(this, serialized_error);
					} else if (server_rendered_pending) _assertClassBrand(_Boundary_brand, this, _hydrate_pending_content).call(this);
					else _assertClassBrand(_Boundary_brand, this, _hydrate_resolved_content).call(this);
				} else _assertClassBrand(_Boundary_brand, this, _render).call(this);
			}, flags));
			if (hydrating) _classPrivateFieldSet2(_anchor, this, hydrate_node);
		}
		/**
		* Defer an effect inside a pending boundary until the boundary resolves
		* @param {Effect} effect
		*/
		defer_effect(effect) {
			_classPrivateFieldGet2(_effects, this).push(effect);
		}
		has_pending_snippet() {
			return !!_classPrivateFieldGet2(_props, this).pending;
		}
		/**
		* @param {Batch} batch
		*/
		is_ready(batch) {
			if (batch.is_fork && _classPrivateFieldGet2(_pending, this).size > 0) return false;
			for (const [owner, pending] of _classPrivateFieldGet2(_pending, this)) {
				if (owner.is_fork) continue;
				for (const effect of pending.keys()) if (batch.is_blocked_by(effect, _classPrivateFieldGet2(_main_effect, this))) return false;
			}
			return true;
		}
		/**
		* @param {Effect[]} effects
		*/
		reveal(effects) {
			this.is_pending = false;
			for (const effect of _classPrivateFieldGet2(_effects, this)) {
				set_signal_status(effect, DIRTY);
				effects.push(effect);
			}
			_classPrivateFieldGet2(_effects, this).length = 0;
			if (_classPrivateFieldGet2(_pending_effect, this)) pause_effect(_classPrivateFieldGet2(_pending_effect, this), () => {
				_classPrivateFieldSet2(_pending_effect, this, null);
			});
			if (_classPrivateFieldGet2(_offscreen_fragment, this)) {
				var previous_renderer = custom_renderers_flag ? push_renderer(_classPrivateFieldGet2(_effect, this).r) : null;
				try {
					insert_before(_classPrivateFieldGet2(_anchor, this), _classPrivateFieldGet2(_offscreen_fragment, this));
					_classPrivateFieldSet2(_offscreen_fragment, this, null);
				} finally {
					if (custom_renderers_flag) pop_renderer(previous_renderer);
				}
			}
		}
		/**
		* @param {Effect} effect
		* @param {Batch} batch
		*/
		increment(effect, batch) {
			var _pending$get;
			var pending = _classPrivateFieldGet2(_pending, this).get(batch);
			if (pending === void 0) _classPrivateFieldGet2(_pending, this).set(batch, pending = /* @__PURE__ */ new Map());
			var count = (_pending$get = pending.get(effect)) !== null && _pending$get !== void 0 ? _pending$get : 0;
			pending.set(effect, count + 1);
		}
		/**
		* @param {Effect} effect
		* @param {Batch} batch
		*/
		decrement(effect, batch) {
			var pending = _classPrivateFieldGet2(_pending, this).get(batch);
			var count = pending.get(effect);
			if (count === 1) {
				pending.delete(effect);
				if (pending.size === 0) _classPrivateFieldGet2(_pending, this).delete(batch);
				queue_micro_task(() => {
					if (this.is_pending && !_assertClassBrand(_Boundary_brand, this, _is_destroyed).call(this)) Batch.ensure().schedule(_classPrivateFieldGet2(_effect, this), MAYBE_DIRTY);
				});
			} else pending.set(effect, count - 1);
		}
		/**
		* Update the source that powers `$effect.pending()` inside this boundary.
		* Do not call from inside the class
		* @param {1 | -1} d
		*/
		update_effect_pending(d) {
			_classPrivateFieldSet2(_local_pending_count, this, _classPrivateFieldGet2(_local_pending_count, this) + d);
			if (!_classPrivateFieldGet2(_effect_pending, this) || _classPrivateFieldGet2(_pending_count_update_queued, this)) return;
			_classPrivateFieldSet2(_pending_count_update_queued, this, true);
			queue_micro_task(() => {
				_classPrivateFieldSet2(_pending_count_update_queued, this, false);
				if (_classPrivateFieldGet2(_effect_pending, this)) internal_set(_classPrivateFieldGet2(_effect_pending, this), _classPrivateFieldGet2(_local_pending_count, this));
			});
		}
		get_effect_pending() {
			_classPrivateFieldGet2(_effect_pending_subscriber, this).call(this);
			return get(_classPrivateFieldGet2(_effect_pending, this));
		}
		/** @param {unknown} error */
		error(error) {
			if (error === HYDRATION_ERROR) throw error;
			if (!_classPrivateFieldGet2(_props, this).onerror && !_classPrivateFieldGet2(_props, this).failed) throw error;
			if (current_batch === null || current_batch === void 0 ? void 0 : current_batch.is_fork) {
				if (_classPrivateFieldGet2(_main_effect, this)) current_batch.skip_effect(_classPrivateFieldGet2(_main_effect, this));
				if (_classPrivateFieldGet2(_pending_effect, this)) current_batch.skip_effect(_classPrivateFieldGet2(_pending_effect, this));
				if (_classPrivateFieldGet2(_failed_effect, this)) current_batch.skip_effect(_classPrivateFieldGet2(_failed_effect, this));
				current_batch.oncommit(() => {
					if (!_assertClassBrand(_Boundary_brand, this, _is_destroyed).call(this)) _assertClassBrand(_Boundary_brand, this, _handle_error).call(this, error);
				});
			} else _assertClassBrand(_Boundary_brand, this, _handle_error).call(this, error);
		}
	};
}));
// node_modules/svelte/src/internal/client/render.js
/**
* Mounts a component to the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component.
* Transitions will play during the initial render unless the `intro` option is set to `false`.
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @template [Renderer=undefined]
* @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
* @param {MountOptions<Props, Renderer>} options
* @returns {Exports}
*/
function mount(component, options) {
	return _mount(component, options);
}
/**
* Hydrates a component on the given target and returns the exports and potentially the props (if compiled with `accessors: true`) of the component
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @template [Renderer=undefined]
* @param {ComponentType<SvelteComponent<Props>> | Component<Props, Exports, any>} component
* @param {{} extends Props ? {
* 		target: Document | Element | ShadowRoot;
* 		props?: Props;
* 		events?: Record<string, (e: any) => any>;
*  	context?: Map<any, any>;
* 		intro?: boolean;
* 		recover?: boolean;
*		transformError?: (error: unknown) => unknown;
* 	} : {
* 		target: Document | Element | ShadowRoot;
* 		props: Props;
* 		events?: Record<string, (e: any) => any>;
*  	context?: Map<any, any>;
* 		intro?: boolean;
* 		recover?: boolean;
*		transformError?: (error: unknown) => unknown;
* 	}} options
* @returns {Exports}
*/
function hydrate(component, options) {
	var _options$intro;
	options.intro = (_options$intro = options.intro) !== null && _options$intro !== void 0 ? _options$intro : false;
	const target = options.target;
	const was_hydrating = hydrating;
	const previous_hydrate_node = hydrate_node;
	try {
		var anchor = /* @__PURE__ */ get_first_child(target);
		while (anchor && (node_type(anchor) !== 8 || get_node_value(anchor) !== "[")) anchor = /* @__PURE__ */ get_next_sibling(anchor);
		if (!anchor) throw HYDRATION_ERROR;
		set_hydrating(true);
		set_hydrate_node(anchor);
		const instance = _mount(component, {
			...options,
			anchor
		});
		if (async_mode_flag && current_batch !== null) current_batch.commit_writes();
		set_hydrating(false);
		return instance;
	} catch (error) {
		if (error instanceof Error && error.message.split("\n").some((line) => line.startsWith("https://svelte.dev/e/"))) throw error;
		if (error !== HYDRATION_ERROR) console.warn("Failed to hydrate: ", error);
		if (options.recover === false) hydration_failed();
		clear_text_content(target);
		set_hydrating(false);
		return mount(component, options);
	} finally {
		set_hydrating(was_hydrating);
		set_hydrate_node(previous_hydrate_node);
	}
}
/**
* @template {Record<string, any>} Exports
* @param {ComponentType<SvelteComponent<any>> | Component<any>} Component
* @param {MountOptions<any, any> & { renderer?: Renderer }} options
* @returns {Exports}
*/
function _mount(Component, options) {
	if (custom_renderers_flag && options.renderer) {
		var previous_renderer = push_renderer(options.renderer);
		try {
			return _mount_inner(Component, options);
		} finally {
			pop_renderer(previous_renderer);
		}
	}
	return _mount_inner(Component, options);
}
/**
* @template {Record<string, any>} Exports
* @param {ComponentType<SvelteComponent<any>> | Component<any>} Component
* @param {MountOptions<any, any> & { renderer?: Renderer }} options
* @returns {Exports}
*/
function _mount_inner(Component, { target, anchor, props = {}, events, context, intro = true, transformError, renderer }) {
	/** @type {Exports} */
	var component = void 0;
	var unmount = component_root(() => {
		var anchor_node = anchor !== null && anchor !== void 0 ? anchor : append_child(target, create_text());
		boundary(anchor_node, { pending: () => {} }, (anchor_node) => {
			push({});
			var ctx = component_context;
			if (context) ctx.c = context;
			if (events)
 /** @type {any} */ props.$$events = events;
			if (hydrating) assign_nodes(anchor_node, null);
			should_intro = intro;
			component = Component(anchor_node, props) || mark_as_component();
			should_intro = true;
			if (hydrating) {
				/** @type {Effect & { nodes: EffectNodes }} */ active_effect.nodes.end = hydrate_node;
				if (hydrate_node === null || node_type(hydrate_node) !== 8 || get_node_value(hydrate_node) !== "]") {
					hydration_mismatch();
					throw HYDRATION_ERROR;
				}
			}
			pop();
		}, transformError);
		var stop_listening = renderer ? null : listen_to_delegated_events(target);
		return () => {
			stop_listening === null || stop_listening === void 0 || stop_listening();
			if (anchor_node !== anchor) {
				var parent = get_parent_node(anchor_node);
				if (parent) remove_child(parent, anchor_node);
			}
		};
	});
	mounted_components.set(component, unmount);
	return component;
}
/**
* Unmounts a component that was previously mounted using `mount` or `hydrate`.
*
* Since 5.13.0, if `options.outro` is `true`, [transitions](https://svelte.dev/docs/svelte/transition) will play before the component is removed from the DOM.
*
* Returns a `Promise` that resolves after transitions have completed if `options.outro` is true, or immediately otherwise (prior to 5.13.0, returns `void`).
*
* ```js
* import { mount, unmount } from 'svelte';
* import App from './App.svelte';
*
* const app = mount(App, { target: document.body });
*
* // later...
* unmount(app, { outro: true });
* ```
* @param {Record<string, any>} component
* @param {{ outro?: boolean }} [options]
* @returns {Promise<void>}
*/
function unmount(component, options) {
	const fn = mounted_components.get(component);
	if (fn) {
		mounted_components.delete(component);
		return fn(options);
	}
	return Promise.resolve();
}
var should_intro, mounted_components;
var init_render = __esmMin((() => {
	init_esm_env();
	init_operations$1();
	init_constants();
	init_runtime();
	init_context();
	init_effects();
	init_hydration();
	init_events();
	init_warnings();
	init_errors();
	init_template();
	init_constants$1();
	init_boundary();
	init_state();
	init_flags();
	init_batch();
	mounted_components = /* @__PURE__ */ new WeakMap();
}));
// node_modules/svelte/src/internal/shared/validate.js
var init_validate$1 = __esmMin((() => {
	init_utils$1();
	init_errors$1();
}));
// node_modules/svelte/src/internal/client/dom/blocks/branches.js
var init_branches = __esmMin((() => {
	init_batch();
	init_effects();
	init_constants$1();
	init_hydration();
	init_operations$1();
	init_state();
}));
// node_modules/svelte/src/internal/client/custom-renderer/containers.js
var init_containers = __esmMin((() => {
	init_constants$1();
	init_operations$1();
	init_task();
	init_batch();
	init_state();
}));
// node_modules/svelte/src/internal/client/custom-renderer/cross.js
var init_cross = __esmMin((() => {
	init_effects();
	init_template();
	init_operations$1();
	init_events();
	init_errors();
	init_state();
	init_containers();
}));
// node_modules/svelte/src/internal/client/dom/blocks/snippet.js
var init_snippet = __esmMin((() => {
	init_constants$1();
	init_effects();
	init_context();
	init_hydration();
	init_reconciler();
	init_template();
	init_errors();
	init_operations$1();
	init_validate$1();
	init_branches();
	init_state();
	init_cross();
	init_utils$2();
}));
// node_modules/svelte/src/index-client.js
var init_index_client = __esmMin((() => {
	init_runtime();
	init_utils$2();
	init_client();
	init_errors();
	init_context();
	init_esm_env();
	init_batch();
	init_hydratable();
	init_render();
	init_snippet();
}));
// node_modules/svelte/src/attachments/index.js
var init_attachments$1 = __esmMin((() => {
	init_client();
	init_index_client();
	init_effects();
}));
// node_modules/svelte/src/internal/client/dev/assign.js
var init_assign = __esmMin((() => {
	init_constants$1();
	init_utils$1();
	init_runtime();
}));
// node_modules/svelte/src/internal/client/dev/css.js
var init_css$1 = __esmMin((() => {
	init_operations$1();
}));
// node_modules/svelte/src/internal/client/dev/elements.js
var init_elements = __esmMin((() => {
	init_constants$1();
	init_hydration();
	init_context();
	init_operations$1();
}));
// node_modules/svelte/src/internal/client/dev/hmr.js
var init_hmr = __esmMin((() => {
	init_constants$1();
	init_hydration();
	init_effects();
	init_sources();
	init_render();
	init_runtime();
}));
// node_modules/svelte/src/internal/client/dev/ownership.js
var init_ownership = __esmMin((() => {
	init_utils$2();
	init_constants$1();
	init_context();
	init_utils$1();
}));
// node_modules/svelte/src/internal/client/dev/legacy.js
var init_legacy = __esmMin((() => {
	init_errors();
	init_context();
}));
// node_modules/svelte/src/internal/client/dev/inspect.js
var init_inspect = __esmMin((() => {
	init_clone();
	init_effects();
	init_runtime();
	init_dev();
}));
// node_modules/svelte/src/internal/client/dom/blocks/async.js
var init_async = __esmMin((() => {
	init_async$1();
	init_runtime();
	init_hydration();
	init_template();
}));
// node_modules/svelte/src/internal/client/dev/validation.js
var init_validation = __esmMin((() => {
	init_state();
	init_errors();
}));
// node_modules/svelte/src/internal/client/dom/blocks/await.js
var init_await = __esmMin((() => {
	init_utils$2();
	init_effects();
	init_sources();
	init_hydration();
	init_task();
	init_operations$1();
	init_constants$1();
	init_context();
	init_batch();
	init_branches();
	init_async$1();
	init_runtime();
}));
// node_modules/svelte/src/internal/client/dom/blocks/if.js
var init_if = __esmMin((() => {
	init_constants$1();
	init_hydration();
	init_effects();
	init_branches();
}));
// node_modules/svelte/src/internal/client/dom/blocks/key.js
var init_key = __esmMin((() => {
	init_context();
	init_effects();
	init_hydration();
	init_branches();
}));
// node_modules/svelte/src/internal/shared/attributes.js
var init_attributes$1 = __esmMin((() => {
	init_utils$2();
}));
// node_modules/svelte/src/internal/client/dom/blocks/css-props.js
var init_css_props = __esmMin((() => {
	init_effects();
	init_hydration();
	init_operations$1();
	init_attributes$1();
	init_state();
}));
// node_modules/svelte/src/internal/client/dom/blocks/each.js
var init_each = __esmMin((() => {
	init_hydration();
	init_operations$1();
	init_effects();
	init_sources();
	init_utils$2();
	init_constants$1();
	init_task();
	init_runtime();
	init_deriveds();
	init_batch();
	init_errors();
	init_tracing();
	init_state();
}));
// node_modules/svelte/src/internal/client/dom/blocks/html.js
var init_html = __esmMin((() => {
	init_effects();
	init_hydration();
	init_template();
	init_utils$1();
	init_context();
	init_operations$1();
	init_runtime();
	init_constants$1();
}));
// node_modules/svelte/src/internal/client/dom/blocks/slot.js
var init_slot = __esmMin((() => {
	init_context();
	init_hydration();
	init_operations$1();
	init_template();
}));
// node_modules/svelte/src/internal/client/dom/blocks/svelte-component.js
var init_svelte_component = __esmMin((() => {
	init_constants$1();
	init_effects();
	init_hydration();
	init_branches();
}));
// node_modules/svelte/src/internal/client/timing.js
var init_timing = __esmMin((() => {
	init_utils$2();
}));
// node_modules/svelte/src/internal/client/loop.js
var init_loop = __esmMin((() => {
	init_timing();
}));
// node_modules/svelte/src/internal/client/dom/elements/transitions.js
var init_transitions = __esmMin((() => {
	init_utils$2();
	init_effects();
	init_runtime();
	init_loop();
	init_render();
	init_constants$1();
	init_task();
	init_shared$1();
}));
// node_modules/svelte/src/internal/client/dom/blocks/svelte-element.js
var init_svelte_element = __esmMin((() => {
	init_hydration();
	init_operations$1();
	init_effects();
	init_render();
	init_runtime();
	init_context();
	init_constants$1();
	init_template();
	init_utils$1();
	init_branches();
	init_transitions();
}));
// node_modules/svelte/src/internal/client/dom/blocks/svelte-head.js
var init_svelte_head = __esmMin((() => {
	init_hydration();
	init_operations$1();
	init_effects();
	init_constants$1();
}));
// node_modules/svelte/src/internal/client/dom/css.js
var init_css = __esmMin((() => {
	init_css$1();
	init_effects();
	init_operations$1();
	init_runtime();
}));
// node_modules/svelte/src/internal/client/dom/elements/actions.js
var init_actions = __esmMin((() => {
	init_effects();
	init_runtime();
}));
// node_modules/svelte/src/internal/client/dom/elements/attachments.js
var init_attachments = __esmMin((() => {
	init_effects();
}));
// node_modules/svelte/src/internal/client/dom/elements/class.js
var init_class = __esmMin((() => {
	init_attributes$1();
	init_state();
	init_constants$1();
	init_hydration();
	init_operations$1();
}));
// node_modules/svelte/src/internal/client/dom/elements/style.js
var init_style = __esmMin((() => {
	init_attributes$1();
	init_state();
	init_constants$1();
	init_hydration();
	init_operations$1();
}));
// node_modules/svelte/src/internal/client/dom/elements/bindings/select.js
var init_select = __esmMin((() => {
	init_effects();
	init_shared$1();
	init_proxy();
	init_utils$2();
	init_batch();
	init_operations$1();
}));
// node_modules/svelte/src/internal/client/dom/elements/attributes.js
var init_attributes = __esmMin((() => {
	init_hydration();
	init_utils$2();
	init_events();
	init_misc$1();
	init_constants$1();
	init_task();
	init_utils$1();
	init_runtime();
	init_attachments();
	init_attributes$1();
	init_class();
	init_style();
	init_effects();
	init_select();
	init_async$1();
	init_operations$1();
	init_state();
}));
// node_modules/svelte/src/internal/client/dom/elements/customizable-select.js
var init_customizable_select = __esmMin((() => {
	init_hydration();
	init_operations$1();
	init_reconciler();
	init_attachments();
}));
// node_modules/svelte/src/internal/client/dom/elements/bindings/document.js
var init_document = __esmMin((() => {
	init_shared$1();
}));
// node_modules/svelte/src/internal/client/dom/elements/bindings/input.js
var init_input = __esmMin((() => {
	init_effects();
	init_shared$1();
	init_errors();
	init_proxy();
	init_task();
	init_hydration();
	init_runtime();
	init_batch();
}));
// node_modules/svelte/src/internal/client/dom/elements/bindings/media.js
var init_media = __esmMin((() => {
	init_effects();
	init_shared$1();
}));
// node_modules/svelte/src/internal/client/dom/elements/bindings/navigator.js
var init_navigator = __esmMin((() => {
	init_shared$1();
}));
// node_modules/svelte/src/internal/client/dom/elements/bindings/props.js
var init_props$1 = __esmMin((() => {
	init_effects();
	init_utils$2();
}));
// node_modules/svelte/src/internal/client/dom/elements/bindings/size.js
function _getObserver() {
	var _this$observer;
	return (_this$observer = _classPrivateFieldGet2(_observer, this)) !== null && _this$observer !== void 0 ? _this$observer : _classPrivateFieldSet2(_observer, this, new ResizeObserver(
		/** @param {any} entries */
		(entries) => {
			for (var entry of entries) {
				_ResizeObserverSingleton.entries.set(entry.target, entry);
				for (var listener of _classPrivateFieldGet2(_listeners, this).get(entry.target) || []) listener(entry);
			}
		}
	));
}
var _ResizeObserverSingleton, _listeners, _observer, _options, _ResizeObserverSingleton_brand, ResizeObserverSingleton;
var init_size = __esmMin((() => {
	init_effects();
	init_runtime();
	init_classPrivateMethodInitSpec();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	init_assertClassBrand();
	init_defineProperty();
	_listeners = /* @__PURE__ */ new WeakMap();
	_observer = /* @__PURE__ */ new WeakMap();
	_options = /* @__PURE__ */ new WeakMap();
	_ResizeObserverSingleton_brand = /* @__PURE__ */ new WeakSet();
	ResizeObserverSingleton = class {
		/** @param {ResizeObserverOptions} options */
		constructor(options) {
			_classPrivateMethodInitSpec(this, _ResizeObserverSingleton_brand);
			_classPrivateFieldInitSpec(this, _listeners, /* @__PURE__ */ new WeakMap());
			_classPrivateFieldInitSpec(this, _observer, void 0);
			_classPrivateFieldInitSpec(this, _options, void 0);
			_classPrivateFieldSet2(_options, this, options);
		}
		/**
		* @param {Element} element
		* @param {(entry: ResizeObserverEntry) => any} listener
		*/
		observe(element, listener) {
			var listeners = _classPrivateFieldGet2(_listeners, this).get(element) || /* @__PURE__ */ new Set();
			listeners.add(listener);
			_classPrivateFieldGet2(_listeners, this).set(element, listeners);
			_assertClassBrand(_ResizeObserverSingleton_brand, this, _getObserver).call(this).observe(element, _classPrivateFieldGet2(_options, this));
			return () => {
				var listeners = _classPrivateFieldGet2(_listeners, this).get(element);
				listeners.delete(listener);
				if (listeners.size === 0) {
					_classPrivateFieldGet2(_listeners, this).delete(element);
					/** @type {ResizeObserver} */ _classPrivateFieldGet2(_observer, this).unobserve(element);
				}
			};
		}
	};
	_ResizeObserverSingleton = ResizeObserverSingleton;
	_defineProperty(ResizeObserverSingleton, "entries", /* @__PURE__ */ new WeakMap());
}));
// node_modules/svelte/src/internal/client/dom/elements/bindings/this.js
var init_this = __esmMin((() => {
	init_constants$1();
	init_context();
	init_effects();
	init_runtime();
}));
// node_modules/svelte/src/internal/client/dom/elements/bindings/universal.js
var init_universal = __esmMin((() => {
	init_effects();
	init_shared$1();
}));
// node_modules/svelte/src/internal/client/dom/elements/bindings/window.js
var init_window = __esmMin((() => {
	init_effects();
	init_shared$1();
}));
// node_modules/svelte/src/internal/client/dom/legacy/event-modifiers.js
var init_event_modifiers = __esmMin((() => {
	init_utils$2();
	init_effects();
	init_events();
}));
// node_modules/svelte/src/internal/client/dom/legacy/lifecycle.js
var init_lifecycle = __esmMin((() => {
	init_utils$2();
	init_context();
	init_deriveds();
	init_effects();
	init_runtime();
}));
// node_modules/svelte/src/internal/client/dom/legacy/misc.js
var init_misc = __esmMin((() => {
	init_sources();
	init_runtime();
	init_utils$2();
}));
// node_modules/svelte/src/store/utils.js
var init_utils = __esmMin((() => {
	init_runtime();
	init_utils$2();
}));
// node_modules/svelte/src/store/shared/index.js
var init_shared = __esmMin((() => {
	init_utils$2();
	init_utils();
}));
// node_modules/svelte/src/internal/client/reactivity/store.js
var init_store = __esmMin((() => {
	init_utils();
	init_shared();
	init_utils$2();
	init_runtime();
	init_effects();
	init_sources();
}));
// node_modules/svelte/src/internal/client/reactivity/props.js
var init_props = __esmMin((() => {
	init_utils$2();
	init_sources();
	init_deriveds();
	init_runtime();
	init_errors();
	init_constants$1();
	init_proxy();
	init_store();
}));
// node_modules/svelte/src/internal/client/validate.js
var init_validate = __esmMin((() => {
	init_context();
	init_effects();
	init_store();
	init_async$1();
}));
// node_modules/svelte/src/legacy/legacy-client.js
/**
* Takes the same options as a Svelte 4 component and the component function and returns a Svelte 4 compatible component.
*
* @deprecated Use this only as a temporary solution to migrate your imperative component code to Svelte 5.
*
* @template {Record<string, any>} Props
* @template {Record<string, any>} Exports
* @template {Record<string, any>} Events
* @template {Record<string, any>} Slots
*
* @param {ComponentConstructorOptions<Props> & {
* 	component: ComponentType<SvelteComponent<Props, Events, Slots>> | Component<Props>;
* }} options
* @returns {SvelteComponent<Props, Events, Slots> & Exports}
*/
function createClassComponent(options) {
	return new Svelte4Component(options);
}
var _events, _instance, Svelte4Component;
var init_legacy_client = __esmMin((() => {
	init_constants$1();
	init_effects();
	init_sources();
	init_render();
	init_runtime();
	init_batch();
	init_utils$2();
	init_errors();
	init_context();
	init_flags();
	init_status();
	init_classPrivateFieldInitSpec();
	init_classPrivateFieldSet2();
	init_classPrivateFieldGet2();
	init_event_modifiers();
	_events = /* @__PURE__ */ new WeakMap();
	_instance = /* @__PURE__ */ new WeakMap();
	Svelte4Component = class {
		/**
		* @param {ComponentConstructorOptions & {
		*  component: any;
		* }} options
		*/
		constructor(options) {
			var _options$intro, _options$props;
			_classPrivateFieldInitSpec(this, _events, void 0);
			_classPrivateFieldInitSpec(this, _instance, void 0);
			var sources = /* @__PURE__ */ new Map();
			/**
			* @param {string | symbol} key
			* @param {unknown} value
			*/
			var add_source = (key, value) => {
				var s = /* @__PURE__ */ mutable_source(value, false, false);
				sources.set(key, s);
				return s;
			};
			const props = new Proxy({
				...options.props || {},
				$$events: {}
			}, {
				get(target, prop) {
					var _sources$get;
					return get((_sources$get = sources.get(prop)) !== null && _sources$get !== void 0 ? _sources$get : add_source(prop, Reflect.get(target, prop)));
				},
				has(target, prop) {
					var _sources$get2;
					if (prop === LEGACY_PROPS) return true;
					get((_sources$get2 = sources.get(prop)) !== null && _sources$get2 !== void 0 ? _sources$get2 : add_source(prop, Reflect.get(target, prop)));
					return Reflect.has(target, prop);
				},
				set(target, prop, value) {
					var _sources$get3;
					set((_sources$get3 = sources.get(prop)) !== null && _sources$get3 !== void 0 ? _sources$get3 : add_source(prop, value), value);
					return Reflect.set(target, prop, value);
				}
			});
			const render_options = {
				target: options.target,
				anchor: options.anchor,
				props,
				context: options.context,
				intro: (_options$intro = options.intro) !== null && _options$intro !== void 0 ? _options$intro : false,
				recover: options.recover,
				transformError: options.transformError
			};
			_classPrivateFieldSet2(_instance, this, options.hydrate ? hydrate(options.component, render_options) : mount(options.component, render_options));
			if (!async_mode_flag && (!(options === null || options === void 0 || (_options$props = options.props) === null || _options$props === void 0 ? void 0 : _options$props.$$host) || options.sync === false)) flushSync();
			_classPrivateFieldSet2(_events, this, props.$$events);
			for (const key of Object.keys(_classPrivateFieldGet2(_instance, this))) {
				if (key === "$set" || key === "$destroy" || key === "$on") continue;
				define_property(this, key, {
					get() {
						return _classPrivateFieldGet2(_instance, this)[key];
					},
					/** @param {any} value */
					set(value) {
						_classPrivateFieldGet2(_instance, this)[key] = value;
					},
					enumerable: true
				});
			}
			_classPrivateFieldGet2(_instance, this).$set = (next) => {
				Object.assign(props, next);
			};
			_classPrivateFieldGet2(_instance, this).$destroy = () => {
				unmount(_classPrivateFieldGet2(_instance, this));
			};
		}
		/** @param {Record<string, any>} props */
		$set(props) {
			_classPrivateFieldGet2(_instance, this).$set(props);
		}
		/**
		* @param {string} event
		* @param {(...args: any[]) => any} callback
		* @returns {any}
		*/
		$on(event, callback) {
			_classPrivateFieldGet2(_events, this)[event] = _classPrivateFieldGet2(_events, this)[event] || [];
			/** @param {any[]} args */
			const cb = (...args) => callback.call(this, ...args);
			_classPrivateFieldGet2(_events, this)[event].push(cb);
			return () => {
				_classPrivateFieldGet2(_events, this)[event] = _classPrivateFieldGet2(_events, this)[event].filter(
					/** @param {any} fn */
					(fn) => fn !== cb
				);
			};
		}
		$destroy() {
			_classPrivateFieldGet2(_instance, this).$destroy();
		}
	};
}));
// node_modules/svelte/src/internal/client/dom/elements/custom-element.js
/**
* @param {string} prop
* @param {any} value
* @param {Record<string, CustomElementPropDefinition>} props_definition
* @param {'toAttribute' | 'toProp'} [transform]
*/
function get_custom_element_value(prop, value, props_definition, transform) {
	var _props_definition$pro;
	const type = (_props_definition$pro = props_definition[prop]) === null || _props_definition$pro === void 0 ? void 0 : _props_definition$pro.type;
	value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
	if (!transform || !props_definition[prop]) return value;
	else if (transform === "toAttribute") switch (type) {
		case "Object":
		case "Array": return value == null ? null : JSON.stringify(value);
		case "Boolean": return value ? "" : null;
		case "Number": return value == null ? null : value;
		default: return value;
	}
	else switch (type) {
		case "Object":
		case "Array": return value && JSON.parse(value);
		case "Boolean": return value;
		case "Number": return value != null ? +value : value;
		default: return value;
	}
}
/**
* @param {HTMLElement} element
*/
function get_custom_elements_slots(element) {
	/** @type {Record<string, true>} */
	const result = {};
	element.childNodes.forEach((node) => {
		result[node.slot || "default"] = true;
	});
	return result;
}
/**
* @internal
*
* Turn a Svelte component into a custom element.
* @param {any} Component  A Svelte component function
* @param {Record<string, CustomElementPropDefinition>} props_definition  The props to observe
* @param {string[]} slots  The slots to create
* @param {string[]} exports  Explicitly exported values, other than props
* @param {ShadowRootInit | undefined} shadow_root_init  Options passed to shadow DOM constructor
* @param {(ce: new () => HTMLElement) => new () => HTMLElement} [extend]
*/
function create_custom_element(Component, props_definition, slots, exports, shadow_root_init, extend) {
	let Class = class extends SvelteElement {
		constructor() {
			super(Component, slots, shadow_root_init);
			this.$$p_d = props_definition;
		}
		static get observedAttributes() {
			return object_keys(props_definition).map((key) => (props_definition[key].attribute || key).toLowerCase());
		}
	};
	object_keys(props_definition).forEach((prop) => {
		define_property(Class.prototype, prop, {
			get() {
				return this.$$c && prop in this.$$c ? this.$$c[prop] : this.$$d[prop];
			},
			set(value) {
				value = get_custom_element_value(prop, value, props_definition);
				this.$$d[prop] = value;
				var component = this.$$c;
				if (component) {
					var _get_descriptor;
					if ((_get_descriptor = get_descriptor(component, prop)) === null || _get_descriptor === void 0 ? void 0 : _get_descriptor.get) component[prop] = value;
					else component.$set({ [prop]: value });
				}
			}
		});
	});
	exports.forEach((property) => {
		define_property(Class.prototype, property, { get() {
			var _this$$$c2;
			return (_this$$$c2 = this.$$c) === null || _this$$$c2 === void 0 ? void 0 : _this$$$c2[property];
		} });
	});
	if (extend) Class = extend(Class);
	Component.element = Class;
	return Class;
}
var SvelteElement;
var init_custom_element = __esmMin((() => {
	init_legacy_client();
	init_effects();
	init_template();
	init_utils$2();
	init_operations$1();
	init_defineProperty();
	if (typeof HTMLElement === "function") SvelteElement = class extends HTMLElement {
		/**
		* @param {*} $$componentCtor
		* @param {*} $$slots
		* @param {ShadowRootInit | undefined} shadow_root_init
		*/
		constructor($$componentCtor, $$slots, shadow_root_init) {
			super();
			_defineProperty(
				this,
				/** The Svelte component constructor */
				"$$ctor",
				void 0
			);
			_defineProperty(
				this,
				/** Slots */
				"$$s",
				void 0
			);
			_defineProperty(
				this,
				/** @type {any} The Svelte component instance */
				"$$c",
				void 0
			);
			_defineProperty(
				this,
				/** Whether or not the custom element is connected */
				"$$cn",
				false
			);
			_defineProperty(
				this,
				/** @type {Record<string, any>} Component props data */
				"$$d",
				{}
			);
			_defineProperty(
				this,
				/** `true` if currently in the process of reflecting component props back to attributes */
				"$$r",
				false
			);
			_defineProperty(
				this,
				/** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
				"$$p_d",
				{}
			);
			_defineProperty(
				this,
				/** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
				"$$l",
				{}
			);
			_defineProperty(
				this,
				/** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
				"$$l_u",
				/* @__PURE__ */ new Map()
			);
			_defineProperty(
				this,
				/** @type {any} The managed render effect for reflecting attributes */
				"$$me",
				void 0
			);
			_defineProperty(
				this,
				/** @type {ShadowRoot | null} The ShadowRoot of the custom element */
				"$$shadowRoot",
				null
			);
			this.$$ctor = $$componentCtor;
			this.$$s = $$slots;
			if (shadow_root_init) this.$$shadowRoot = this.attachShadow(shadow_root_init);
		}
		/**
		* @param {string} type
		* @param {EventListenerOrEventListenerObject} listener
		* @param {boolean | AddEventListenerOptions} [options]
		*/
		addEventListener(type, listener, options) {
			this.$$l[type] = this.$$l[type] || [];
			this.$$l[type].push(listener);
			if (this.$$c) {
				const unsub = this.$$c.$on(type, listener);
				this.$$l_u.set(listener, unsub);
			}
			super.addEventListener(type, listener, options);
		}
		/**
		* @param {string} type
		* @param {EventListenerOrEventListenerObject} listener
		* @param {boolean | AddEventListenerOptions} [options]
		*/
		removeEventListener(type, listener, options) {
			super.removeEventListener(type, listener, options);
			if (this.$$c) {
				const unsub = this.$$l_u.get(listener);
				if (unsub) {
					unsub();
					this.$$l_u.delete(listener);
				}
			}
		}
		async connectedCallback() {
			this.$$cn = true;
			if (!this.$$c) {
				await Promise.resolve();
				if (!this.$$cn || this.$$c) return;
				/** @param {string} name */
				function create_slot(name) {
					/**
					* @param {Element} anchor
					*/
					return (anchor) => {
						const slot = create_element("slot");
						if (name !== "default") slot.name = name;
						append(anchor, slot);
					};
				}
				/** @type {Record<string, any>} */
				const $$slots = {};
				const existing_slots = get_custom_elements_slots(this);
				for (const name of this.$$s) if (name in existing_slots) {
					if (name === "default" && !this.$$d.children) {
						this.$$d.children = create_slot(name);
						$$slots.default = true;
					} else $$slots[name] = create_slot(name);
				}
				for (const attribute of this.attributes) {
					const name = this.$$g_p(attribute.name);
					if (!(name in this.$$d)) this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
				}
				for (const key in this.$$p_d) if (!(key in this.$$d) && this[key] !== void 0) {
					this.$$d[key] = this[key];
					delete this[key];
				}
				this.$$c = createClassComponent({
					component: this.$$ctor,
					target: this.$$shadowRoot || this,
					props: {
						...this.$$d,
						$$slots,
						$$host: this
					}
				});
				this.$$me = effect_root(() => {
					render_effect(() => {
						this.$$r = true;
						for (const key of object_keys(this.$$c)) {
							var _this$$$p_d$key;
							if (!((_this$$$p_d$key = this.$$p_d[key]) === null || _this$$$p_d$key === void 0 ? void 0 : _this$$$p_d$key.reflect)) continue;
							this.$$d[key] = this.$$c[key];
							const attribute_value = get_custom_element_value(key, this.$$d[key], this.$$p_d, "toAttribute");
							if (attribute_value == null) this.removeAttribute(this.$$p_d[key].attribute || key);
							else this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
						}
						this.$$r = false;
					});
				});
				for (const type in this.$$l) for (const listener of this.$$l[type]) {
					const unsub = this.$$c.$on(type, listener);
					this.$$l_u.set(listener, unsub);
				}
				this.$$l = {};
			}
		}
		/**
		* @param {string} attr
		* @param {string} _oldValue
		* @param {string} newValue
		*/
		attributeChangedCallback(attr, _oldValue, newValue) {
			var _this$$$c;
			if (this.$$r) return;
			attr = this.$$g_p(attr);
			this.$$d[attr] = get_custom_element_value(attr, newValue, this.$$p_d, "toProp");
			(_this$$$c = this.$$c) === null || _this$$$c === void 0 || _this$$$c.$set({ [attr]: this.$$d[attr] });
		}
		disconnectedCallback() {
			this.$$cn = false;
			Promise.resolve().then(() => {
				if (!this.$$cn && this.$$c) {
					this.$$c.$destroy();
					this.$$me();
					this.$$c = void 0;
				}
			});
		}
		/**
		* @param {string} attribute_name
		*/
		$$g_p(attribute_name) {
			return object_keys(this.$$p_d).find((key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name) || attribute_name;
		}
	};
}));
// node_modules/svelte/src/internal/client/dev/console-log.js
var init_console_log = __esmMin((() => {
	init_constants$1();
	init_clone();
	init_runtime();
}));
// node_modules/svelte/src/internal/client/index.js
var init_client = __esmMin((() => {
	init_attachments$1();
	init_constants();
	init_context();
	init_assign();
	init_css$1();
	init_elements();
	init_hmr();
	init_ownership();
	init_legacy();
	init_tracing();
	init_inspect();
	init_async();
	init_validation();
	init_await();
	init_if();
	init_key();
	init_css_props();
	init_each();
	init_html();
	init_slot();
	init_snippet();
	init_svelte_component();
	init_svelte_element();
	init_svelte_head();
	init_css();
	init_actions();
	init_attachments();
	init_attributes();
	init_class();
	init_events();
	init_misc$1();
	init_customizable_select();
	init_style();
	init_transitions();
	init_document();
	init_input();
	init_media();
	init_navigator();
	init_props$1();
	init_select();
	init_size();
	init_this();
	init_universal();
	init_window();
	init_hydration();
	init_event_modifiers();
	init_lifecycle();
	init_misc();
	init_template();
	init_async$1();
	init_batch();
	init_deriveds();
	init_effects();
	init_sources();
	init_props();
	init_store();
	init_boundary();
	init_legacy$2();
	init_render();
	init_runtime();
	init_validate();
	init_timing();
	init_proxy();
	init_custom_element();
	init_operations$1();
	init_attributes$1();
	init_clone();
	init_utils$2();
	init_validate$1();
	init_equality();
	init_console_log();
	init_state();
	init_cross();
}));
// blocks/job_list/JobList.svelte
function JobList($$anchor) {
	"use strict";
}
var init_JobList = __esmMin((() => {
	init_init_operations();
	init_disclose_version();
	init_legacy$1();
	init_client();
	customElements.define("job-list", create_custom_element(JobList, {}, [], []));
}));
// blocks/job_list/ts/index.ts
var require_ts = /* @__PURE__ */ __commonJSMin((() => {
	init_JobList();
}));
export default require_ts();
