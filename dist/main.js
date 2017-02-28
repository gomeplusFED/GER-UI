(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
  return returnValue;
}

__$styleInject("@charset \"UTF-8\";article,aside,body,button,dd,dl,dt,footer,h1,h2,h3,h4,h5,h6,header,input,li,menu,nav,ol,p,section,textarea,ul{margin:0;padding:0;border:0 none;outline:0;font-family:inherit;font-weight:inherit;font-size:100%;font-style:normal;vertical-align:baseline}body,button,input,select,textarea{font-size:14px;font-family:Microsoft YaHei,宋体,Tahoma,Helvetica,Arial,\\\\5b8b\\4f53,sans-serif}body,html{width:100%;height:100%;overflow:hidden;position:relative}table{border-spacing:0;vertical-align:middle;border-collapse:collapse}li,ul{list-style:none}img{border:0 none;vertical-align:middle}input,textarea{outline:0;resize:none}input:-webkit-autofill,textarea:-webkit-autofill{background-color:#fff;background-image:none}a{color:#333}a:active,a:hover,a:link,a:visited{text-decoration:none;outline:0}.clearfix{*zoom:1}.clearfix:after{content:\"\";display:block;height:0;clear:both;visibility:hidden}.f-l{float:left}.f-r{float:right}.ger-body{height:100%;position:relative}.ger-body .ger-middle{position:absolute;top:61px;left:0;bottom:0;width:100%}.ger-body .ger-cotent{padding-left:120px;height:100%}.header{line-height:60px;background:#fafafa;font-size:20px;padding:0 30px;border-bottom:1px solid #eee;color:#666}.header .f-r{font-size:12px}.header .f-r a{float:left;margin-left:20px;color:#666}.ger-menu{position:absolute;width:120px;height:100%;background:#3d454d;line-height:40px;box-sizing:border-box;padding:20px 0}.ger-menu ul li a{display:block;padding-left:10px;color:#fff}.ger-menu ul li .active,.ger-menu ul li a:hover{background:#353b41}",undefined);

__$styleInject("",undefined);

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function _toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove$1 (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind$1 (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject (obj) {
  return toString.call(obj) === OBJECT_STRING
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b)
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Whether to enable devtools
   */
  devtools: "" !== 'production',

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * List of asset types that a component can own.
   */
  _assetTypes: [
    'component',
    'directive',
    'filter'
  ],

  /**
   * List of lifecycle hooks.
   */
  _lifecycleHooks: [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated'
  ],

  /**
   * Max circular updates allowed in a scheduler flush cycle.
   */
  _maxUpdateCount: 100
};

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  } else {
    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]];
      }
      return obj
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof commonjsGlobal !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = commonjsGlobal['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return /native code/.test(Ctor.toString())
}

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) { cb.call(ctx); }
      if (_resolve) { _resolve(ctx); }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

var warn = noop;
var formatComponentName;

{
  var hasConsole = typeof console !== 'undefined';

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + " " + (
        vm ? formatLocation(formatComponentName(vm)) : ''
      ));
    }
  };

  formatComponentName = function (vm) {
    if (vm.$root === vm) {
      return 'root instance'
    }
    var name = vm._isVue
      ? vm.$options.name || vm.$options._componentTag
      : vm.name;
    return (
      (name ? ("component <" + name + ">") : "anonymous component") +
      (vm._isVue && vm.$options.__file ? (" at " + (vm.$options.__file)) : '')
    )
  };

  var formatLocation = function (str) {
    if (str === 'anonymous component') {
      str += " - use the \"name\" option for better debugging messages.";
    }
    return ("\n(found in " + str + ")")
  };
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove$1(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stablize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set$1 (obj, key, val) {
  if (Array.isArray(obj)) {
    obj.length = Math.max(obj.length, key);
    obj.splice(key, 1, val);
    return val
  }
  if (hasOwn(obj, key)) {
    obj[key] = val;
    return
  }
  var ob = obj.__ob__;
  if (obj._isVue || (ob && ob.vmCount)) {
    "" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return
  }
  if (!ob) {
    obj[key] = val;
    return
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (obj, key) {
  var ob = obj.__ob__;
  if (obj._isVue || (ob && ob.vmCount)) {
    "" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(obj, key)) {
    return
  }
  delete obj[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
{
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set$1(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      "" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and param attributes are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

config._lifecycleHooks.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return parentVal }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return parentVal }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  {
    checkComponents(child);
  }
  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = typeof extendsFrom === 'function'
      ? mergeOptions(parent, extendsFrom.options, vm)
      : mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      var mixin = child.mixins[i];
      if (mixin.prototype instanceof Vue$2) {
        mixin = mixin.options;
      }
      parent = mergeOptions(parent, mixin, vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {
    "" !== 'production' && warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm[key] !== undefined) {
    return vm[key]
  }
  // call factory function for non-Function types
  return typeof def === 'function' && prop.type !== Function
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

/**
 * Assert the type of a value
 */
function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (expectedType === 'String') {
    valid = typeof value === (expectedType = 'string');
  } else if (expectedType === 'Number') {
    valid = typeof value === (expectedType = 'number');
  } else if (expectedType === 'Boolean') {
    valid = typeof value === (expectedType = 'boolean');
  } else if (expectedType === 'Function') {
    valid = typeof value === (expectedType = 'function');
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match && match[1]
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}



var util = Object.freeze({
	defineReactive: defineReactive$$1,
	_toString: _toString,
	toNumber: toNumber,
	makeMap: makeMap,
	isBuiltInTag: isBuiltInTag,
	remove: remove$1,
	hasOwn: hasOwn,
	isPrimitive: isPrimitive,
	cached: cached,
	camelize: camelize,
	capitalize: capitalize,
	hyphenate: hyphenate,
	bind: bind$1,
	toArray: toArray,
	extend: extend,
	isObject: isObject,
	isPlainObject: isPlainObject,
	toObject: toObject,
	noop: noop,
	no: no,
	identity: identity,
	genStaticKeys: genStaticKeys,
	looseEqual: looseEqual,
	looseIndexOf: looseIndexOf,
	isReserved: isReserved,
	def: def,
	parsePath: parsePath,
	hasProto: hasProto,
	inBrowser: inBrowser,
	UA: UA,
	isIE: isIE,
	isIE9: isIE9,
	isEdge: isEdge,
	isAndroid: isAndroid,
	isIOS: isIOS,
	isServerRendering: isServerRendering,
	devtools: devtools,
	nextTick: nextTick,
	get _Set () { return _Set; },
	mergeOptions: mergeOptions,
	resolveAsset: resolveAsset,
	get warn () { return warn; },
	get formatComponentName () { return formatComponentName; },
	validateProp: validateProp
});

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

{
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var res = new Array(vnodes.length);
  for (var i = 0; i < vnodes.length; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy$1 };
var hooksToMerge = Object.keys(hooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (!Ctor) {
    return
  }

  var baseCtor = context.$options._base;
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  if (typeof Ctor !== 'function') {
    {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (!Ctor.cid) {
    if (Ctor.resolved) {
      Ctor = Ctor.resolved;
    } else {
      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
        // it's ok to queue this on every render because
        // $forceUpdate is buffered by the scheduler.
        context.$forceUpdate();
      });
      if (!Ctor) {
        // return nothing if this is indeed an async component
        // wait for the callback to trigger parent update.
        return
      }
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // extract props
  var propsData = extractProps(data, Ctor);

  // functional component
  if (Ctor.options.functional) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (Ctor.options.abstract) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (propOptions) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData);
    }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    props: props,
    data: data,
    parent: context,
    children: children,
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (inlineTemplate) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function init (
  vnode,
  hydrating,
  parentElm,
  refElm
) {
  if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
    var child = vnode.componentInstance = createComponentInstanceForVnode(
      vnode,
      activeInstance,
      parentElm,
      refElm
    );
    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
  } else if (vnode.data.keepAlive) {
    // kept-alive components, treat as a patch
    var mountedNode = vnode; // work around flow
    prepatch(mountedNode, mountedNode);
  }
}

function prepatch (
  oldVnode,
  vnode
) {
  var options = vnode.componentOptions;
  var child = vnode.componentInstance = oldVnode.componentInstance;
  child._updateFromParent(
    options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
  );
}

function insert (vnode) {
  if (!vnode.componentInstance._isMounted) {
    vnode.componentInstance._isMounted = true;
    callHook(vnode.componentInstance, 'mounted');
  }
  if (vnode.data.keepAlive) {
    vnode.componentInstance._inactive = false;
    callHook(vnode.componentInstance, 'activated');
  }
}

function destroy$1 (vnode) {
  if (!vnode.componentInstance._isDestroyed) {
    if (!vnode.data.keepAlive) {
      vnode.componentInstance.$destroy();
    } else {
      vnode.componentInstance._inactive = true;
      callHook(vnode.componentInstance, 'deactivated');
    }
  }
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  cb
) {
  if (factory.requested) {
    // pool callbacks
    factory.pendingCallbacks.push(cb);
  } else {
    factory.requested = true;
    var cbs = factory.pendingCallbacks = [cb];
    var sync = true;

    var resolve = function (res) {
      if (isObject(res)) {
        res = baseCtor.extend(res);
      }
      // cache resolved
      factory.resolved = res;
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        for (var i = 0, l = cbs.length; i < l; i++) {
          cbs[i](res);
        }
      }
    };

    var reject = function (reason) {
      "" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
    };

    var res = factory(resolve, reject);

    // handle promise
    if (res && typeof res.then === 'function' && !factory.resolved) {
      res.then(resolve, reject);
    }

    sync = false;
    // return in case resolved synchronously
    return factory.resolved
  }
}

function extractProps (data, Ctor) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (!propOptions) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  var domProps = data.domProps;
  if (attrs || props || domProps) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey) ||
      checkProp(res, domProps, key, altKey);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (hash) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = hooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook, key) {
  key = key + hookKey;
  var injectedHash = def.__injected || (def.__injected = {});
  if (!injectedHash[key]) {
    injectedHash[key] = true;
    var oldHook = def[hookKey];
    if (oldHook) {
      def[hookKey] = function () {
        oldHook.apply(this, arguments);
        hook.apply(this, arguments);
      };
    } else {
      def[hookKey] = hook;
    }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var once = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once,
    capture: capture
  }
});

function createEventHandle (fn) {
  var handle = {
    fn: fn,
    invoker: function () {
      var arguments$1 = arguments;

      var fn = handle.fn;
      if (Array.isArray(fn)) {
        for (var i = 0; i < fn.length; i++) {
          fn[i].apply(null, arguments$1);
        }
      } else {
        fn.apply(null, arguments);
      }
    }
  };
  return handle
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (!cur) {
      "" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (!old) {
      if (!cur.invoker) {
        cur = on[name] = createEventHandle(cur);
      }
      add(event.name, cur.invoker, event.once, event.capture);
    } else if (cur !== old) {
      old.fn = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (!on[name]) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name].invoker, event.capture);
    }
  }
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// nomralization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constrcuts that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (c == null || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (last && last.text) {
        last.text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (c.text && last && last.text) {
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (c.tag && c.key == null && nestedIndex != null) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function getFirstComponentChild (children) {
  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (alwaysNormalize) { normalizationType = ALWAYS_NORMALIZE; }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (data && data.__ob__) {
    "" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
      typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (vnode) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (vnode.children) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (child.tag && !child.ns) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm.$vnode = null; // the placeholder node in parent tree
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$options._parentVnode;
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = {};
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    if (_parentVnode && _parentVnode.data.scopedSlots) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots;
    }

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      /* istanbul ignore else */
      if (config.errorHandler) {
        config.errorHandler.call(null, e, vm);
      } else {
        {
          warn(("Error when rendering " + (formatComponentName(vm)) + ":"));
        }
        throw e
      }
      // return previous vnode to prevent render error causing blank component
      vnode = vm._vnode;
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // toString for mustaches
  Vue.prototype._s = _toString;
  // convert text to vnode
  Vue.prototype._v = createTextVNode;
  // number conversion
  Vue.prototype._n = toNumber;
  // empty vnode
  Vue.prototype._e = createEmptyVNode;
  // loose equal
  Vue.prototype._q = looseEqual;
  // loose indexOf
  Vue.prototype._i = looseIndexOf;

  // render static tree by index
  Vue.prototype._m = function renderStatic (
    index,
    isInFor
  ) {
    var tree = this._staticTrees[index];
    // if has already-rendered static tree and not inside v-for,
    // we can reuse the same tree by doing a shallow clone.
    if (tree && !isInFor) {
      return Array.isArray(tree)
        ? cloneVNodes(tree)
        : cloneVNode(tree)
    }
    // otherwise, render a fresh tree.
    tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy);
    markStatic(tree, ("__static__" + index), false);
    return tree
  };

  // mark node as static (v-once)
  Vue.prototype._o = function markOnce (
    tree,
    index,
    key
  ) {
    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
    return tree
  };

  function markStatic (tree, key, isOnce) {
    if (Array.isArray(tree)) {
      for (var i = 0; i < tree.length; i++) {
        if (tree[i] && typeof tree[i] !== 'string') {
          markStaticNode(tree[i], (key + "_" + i), isOnce);
        }
      }
    } else {
      markStaticNode(tree, key, isOnce);
    }
  }

  function markStaticNode (node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
  }

  // filter resolution helper
  Vue.prototype._f = function resolveFilter (id) {
    return resolveAsset(this.$options, 'filters', id, true) || identity
  };

  // render v-for
  Vue.prototype._l = function renderList (
    val,
    render
  ) {
    var ret, i, l, keys, key;
    if (Array.isArray(val) || typeof val === 'string') {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = render(val[i], i);
      }
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0; i < val; i++) {
        ret[i] = render(i + 1, i);
      }
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
    return ret
  };

  // renderSlot
  Vue.prototype._t = function (
    name,
    fallback,
    props,
    bindObject
  ) {
    var scopedSlotFn = this.$scopedSlots[name];
    if (scopedSlotFn) { // scoped slot
      props = props || {};
      if (bindObject) {
        extend(props, bindObject);
      }
      return scopedSlotFn(props) || fallback
    } else {
      var slotNodes = this.$slots[name];
      // warn duplicate slot usage
      if (slotNodes && "" !== 'production') {
        slotNodes._rendered && warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
        slotNodes._rendered = true;
      }
      return slotNodes || fallback
    }
  };

  // apply v-bind object
  Vue.prototype._b = function bindProps (
    data,
    tag,
    value,
    asProp
  ) {
    if (value) {
      if (!isObject(value)) {
        "" !== 'production' && warn(
          'v-bind without argument expects an Object or Array value',
          this
        );
      } else {
        if (Array.isArray(value)) {
          value = toObject(value);
        }
        for (var key in value) {
          if (key === 'class' || key === 'style') {
            data[key] = value[key];
          } else {
            var type = data.attrs && data.attrs.type;
            var hash = asProp || config.mustUseProp(tag, type, key)
              ? data.domProps || (data.domProps = {})
              : data.attrs || (data.attrs = {});
            hash[key] = value[key];
          }
        }
      }
    }
    return data
  };

  // check v-on keyCodes
  Vue.prototype._k = function checkKeyCodes (
    eventKeyCode,
    key,
    builtInAlias
  ) {
    var keyCodes = config.keyCodes[key] || builtInAlias;
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  };
}

function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  var name, child;
  for (var i = 0, l = children.length; i < l; i++) {
    child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
        child.data && (name = child.data.slot)) {
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore single whitespace
  if (defaultSlot.length && !(
    defaultSlot.length === 1 &&
    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
  )) {
    slots.default = defaultSlot;
  }
  return slots
}

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add$1 (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$2 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add$1, remove$2, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;(vm._events[event] || (vm._events[event] = [])).push(fn);
    // optimize hook:event cost by using a boolean flag marked at registration
    // instead of a hash lookup
    if (hookRE.test(event)) {
      vm._hasHookEvent = true;
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._mount = function (
    el,
    hydrating
  ) {
    var vm = this;
    vm.$el = el;
    if (!vm.$options.render) {
      vm.$options.render = createEmptyVNode;
      {
        /* istanbul ignore if */
        if (vm.$options.template && vm.$options.template.charAt(0) !== '#') {
          warn(
            'You are using the runtime-only build of Vue where the template ' +
            'option is not available. Either pre-compile the templates into ' +
            'render functions, or use the compiler-included build.',
            vm
          );
        } else {
          warn(
            'Failed to mount component: template or render function not defined.',
            vm
          );
        }
      }
    }
    callHook(vm, 'beforeMount');
    vm._watcher = new Watcher(vm, function updateComponent () {
      vm._update(vm._render(), hydrating);
    }, noop);
    hydrating = false;
    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook(vm, 'mounted');
    }
    return vm
  };

  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype._updateFromParent = function (
    propsData,
    listeners,
    parentVnode,
    renderChildren
  ) {
    var vm = this;
    var hasChildren = !!(vm.$options._renderChildren || renderChildren);
    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode; // update vm's placeholder node without re-render
    if (vm._vnode) { // update child tree's parent
      vm._vnode.parent = parentVnode;
    }
    vm.$options._renderChildren = renderChildren;
    // update props
    if (propsData && vm.$options.props) {
      observerState.shouldConvert = false;
      {
        observerState.isSettingProps = true;
      }
      var propKeys = vm.$options._propKeys || [];
      for (var i = 0; i < propKeys.length; i++) {
        var key = propKeys[i];
        vm[key] = validateProp(key, vm.$options.props, propsData, vm);
      }
      observerState.shouldConvert = true;
      {
        observerState.isSettingProps = false;
      }
      vm.$options.propsData = propsData;
    }
    // update listeners
    if (listeners) {
      var oldListeners = vm.$options._parentListeners;
      vm.$options._parentListeners = listeners;
      updateComponentListeners(vm, listeners, oldListeners);
    }
    // resolve slots + force update if has children
    if (hasChildren) {
      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
      vm.$forceUpdate();
    }
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove$1(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
  };
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      handlers[i].call(vm);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var queue = [];
var has$1 = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  queue.length = 0;
  has$1 = {};
  {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id, vm;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has$1[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("" !== 'production' && has$1[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > config._maxUpdateCount) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // call updated hooks
  index = queue.length;
  while (index--) {
    watcher = queue[index];
    vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }

  resetSchedulerState();
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has$1[id] == null) {
    has$1[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i >= 0 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = expOrFn.toString();
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value = this.getter.call(this.vm, this.vm);
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          /* istanbul ignore else */
          if (config.errorHandler) {
            config.errorHandler.call(null, e, this.vm);
          } else {
            "" !== 'production' && warn(
              ("Error in watcher \"" + (this.expression) + "\""),
              this.vm
            );
            throw e
          }
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove$1(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch) { initWatch(vm, opts.watch); }
}

var isReservedProp = { key: 1, ref: 1, slot: 1 };

function initProps (vm, props) {
  var propsData = vm.$options.propsData || {};
  var keys = vm.$options._propKeys = Object.keys(props);
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( i ) {
    var key = keys[i];
    /* istanbul ignore else */
    {
      if (isReservedProp[key]) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(vm, key, validateProp(key, props, propsData, vm), function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
  };

  for (var i = 0; i < keys.length; i++) { loop( i ); }
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? data.call(vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      "" !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else {
      proxy(vm, keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

var computedSharedDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function initComputed (vm, computed) {
  for (var key in computed) {
    /* istanbul ignore if */
    if ("" !== 'production' && key in vm) {
      warn(
        "existing instance property \"" + key + "\" will be " +
        "overwritten by a computed property with the same name.",
        vm
      );
    }
    var userDef = computed[key];
    if (typeof userDef === 'function') {
      computedSharedDefinition.get = makeComputedGetter(userDef, vm);
      computedSharedDefinition.set = noop;
    } else {
      computedSharedDefinition.get = userDef.get
        ? userDef.cache !== false
          ? makeComputedGetter(userDef.get, vm)
          : bind$1(userDef.get, vm)
        : noop;
      computedSharedDefinition.set = userDef.set
        ? bind$1(userDef.set, vm)
        : noop;
    }
    Object.defineProperty(vm, key, computedSharedDefinition);
  }
}

function makeComputedGetter (getter, owner) {
  var watcher = new Watcher(owner, getter, noop, {
    lazy: true
  });
  return function computedGetter () {
    if (watcher.dirty) {
      watcher.evaluate();
    }
    if (Dep.target) {
      watcher.depend();
    }
    return watcher.value
  }
}

function initMethods (vm, methods) {
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind$1(methods[key], vm);
    if ("" !== 'production' && methods[key] == null) {
      warn(
        "method \"" + key + "\" has an undefined value in the component definition. " +
        "Did you reference the function correctly?",
        vm
      );
    }
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () {
    return this._data
  };
  {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);

  Vue.prototype.$set = set$1;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

function proxy (vm, key) {
  if (!isReserved(key)) {
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter () {
        return vm._data[key]
      },
      set: function proxySetter (val) {
        vm._data[key] = val;
      }
    });
  }
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;
    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    {
      initProxy(vm);
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initState(vm);
    callHook(vm, 'created');
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = Ctor.super.options;
    var cachedSuperOptions = Ctor.superOptions;
    var extendOptions = Ctor.extendOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed
      Ctor.superOptions = superOptions;
      extendOptions.render = options.render;
      extendOptions.staticRenderFns = options.staticRenderFns;
      extendOptions._scopeId = options._scopeId;
      options = Ctor.options = mergeOptions(superOptions, extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function Vue$2 (options) {
  if ("" !== 'production' &&
    !(this instanceof Vue$2)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$2);
stateMixin(Vue$2);
eventsMixin(Vue$2);
lifecycleMixin(Vue$2);
renderMixin(Vue$2);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }
    var name = extendOptions.name || Super.options.name;
    {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }
    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;
    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;
    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }
    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  config._assetTypes.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else {
    return pattern.test(name)
  }
}

function pruneCache (cache, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cachedNode);
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    if (!vnode.componentInstance._inactive) {
      callHook(vnode.componentInstance, 'deactivated');
    }
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$2 = this;

    var this$1 = this;

    for (var key in this$2.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);
  Vue.util = util;
  Vue.set = set$1;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  config._assetTypes.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$2);

Object.defineProperty(Vue$2.prototype, '$isServer', {
  get: isServerRendering
});

Vue$2.version = '2.1.10';

/*  */

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (childNode.componentInstance) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: child.class
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (staticClass || dynamicClass) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  var res = '';
  if (!value) {
    return res
  }
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (value[i]) {
        if ((stringified = stringifyClass(value[i]))) {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,' +
  'font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);



var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selector = el;
    el = document.querySelector(el);
    if (!el) {
      "" !== 'production' && warn(
        'Cannot find element: ' + selector
      );
      return document.createElement('div')
    }
  }
  return el
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  if (vnode.data && vnode.data.attrs && 'multiple' in vnode.data.attrs) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove$1(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks$1 = ['create', 'activate', 'update', 'remove', 'destroy'];

function isUndef (s) {
  return s == null
}

function isDef (s) {
  return s != null
}

function sameVnode (vnode1, vnode2) {
  return (
    vnode1.key === vnode2.key &&
    vnode1.tag === vnode2.tag &&
    vnode1.isComment === vnode2.isComment &&
    !vnode1.data === !vnode2.data
  )
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks$1.length; ++i) {
    cbs[hooks$1[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]); }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (parent) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("" !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (vnode.isComment) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isReactivated) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (vnode.data.pendingInsert) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref) {
    if (parent) {
      if (ref) {
        nodeOps.insertBefore(parent, elm, ref);
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (i.create) { i.create(emptyNode, vnode); }
      if (i.insert) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.context) && isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
    if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (rm || isDef(vnode.data)) {
      var listeners = cbs.remove.length + 1;
      if (!rm) {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } else {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if ("" !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (vnode.isStatic &&
        oldVnode.isStatic &&
        vnode.key === oldVnode.key &&
        (vnode.isCloned || vnode.isOnce)) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }
    var i;
    var data = vnode.data;
    var hasData = isDef(data);
    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (hasData && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (hasData) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (initial && vnode.parent) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if ("" !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (vnode.tag) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (!vnode) {
      if (oldVnode) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (!oldVnode) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
            oldVnode.removeAttribute('server-rendered');
            hydrating = true;
          }
          if (hydrating) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (vnode.parent) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (parentElm$1 !== null) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert, 'dir-insert');
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    }, 'dir-postpatch');
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (!oldVnode.data.attrs && !vnode.data.attrs) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (attrs.__ob__) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (attrs[key] == null) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (!data.staticClass && !data.class &&
      (!oldData || (!oldData.staticClass && !oldData.class))) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (transitionClass) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var target$1;

function add$2 (
  event,
  handler,
  once,
  capture
) {
  if (once) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      remove$3(event, handler, capture, _target);
      arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
    };
  }
  target$1.addEventListener(event, handler, capture);
}

function remove$3 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  updateListeners(on, oldOn, add$2, remove$3, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (!oldVnode.data.domProps && !vnode.data.domProps) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (props.__ob__) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (props[key] == null) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = cur == null ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(vnode, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (vnode, newVal) {
  var value = vnode.elm.value;
  var modifiers = vnode.elm._vModifiers; // injected by v-model runtime
  if ((modifiers && modifiers.number) || vnode.elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (modifiers && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    el.style[normalize(name)] = val;
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (!data.staticStyle && !data.style &&
      !oldData.staticStyle && !oldData.style) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldVnode.data.staticStyle;
  var oldStyleBinding = oldVnode.data.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  vnode.data.style = style.__ob__ ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (newStyle[name] == null) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !cls.trim()) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = ' ' + el.getAttribute('class') + ' ';
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !cls.trim()) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = ' ' + el.getAttribute('class') + ' ';
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove$1(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitioneDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitioneDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (el._leaveCb) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return
  }

  /* istanbul ignore if */
  if (el._enterCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear ? appearClass : enterClass;
  var activeClass = isAppear ? appearActiveClass : enterActiveClass;
  var toClass = isAppear ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? (beforeAppear || beforeEnter) : beforeEnter;
  var enterHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter;
  var afterEnterHook = isAppear ? (afterAppear || afterEnter) : afterEnter;
  var enterCancelledHook = isAppear ? (appearCancelled || enterCancelled) : enterCancelled;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl =
    enterHook &&
    // enterHook may be a bound method which exposes
    // the length of original fn as _length
    (enterHook._length || enterHook.length) > 1;

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
          pendingNode.tag === vnode.tag &&
          pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    }, 'transition-insert');
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        whenTransitionEnds(el, type, cb);
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (el._enterCb) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return rm()
  }

  /* istanbul ignore if */
  if (el._leaveCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl =
    leave &&
    // leave hook may be a bound method which exposes
    // the length of original fn as _length
    (leave._length || leave.length) > 1;

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          whenTransitionEnds(el, type, cb);
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    leaveClass: (name + "-leave"),
    appearClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    leaveToClass: (name + "-leave-to"),
    appearToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveActiveClass: (name + "-leave-active"),
    appearActiveClass: (name + "-enter-active")
  }
});

function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn();
    }
  }
}

function _enter (_, vnode) {
  if (!vnode.data.show) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove (vnode, rm) {
    /* istanbul ignore else */
    if (!vnode.data.show) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch$1 = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

var modelableTagRE = /^input|select|textarea|vue-component-[0-9]+(-[0-9a-zA-Z_-]*)?$/;

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model = {
  inserted: function inserted (el, binding, vnode) {
    {
      if (!modelableTagRE.test(vnode.tag)) {
        warn(
          "v-model is not supported on element type: <" + (vnode.tag) + ">. " +
          'If you are working with contenteditable, it\'s recommended to ' +
          'wrap a library dedicated for that purpose inside a custom component.',
          vnode.context
        );
      }
    }
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1].fn;
  }
  return data
}

function placeholder (h, rawChild) {
  return /\d-keep-alive$/.test(rawChild.tag)
    ? h('keep-alive')
    : null
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("" !== 'production' &&
        mode && mode !== 'in-out' && mode !== 'out-in') {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    var key = child.key = child.key == null
      ? id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        }, key);
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave, key);
        mergeVNodeHook(data, 'enterCancelled', performLeave, key);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        }, key);
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final disired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else {
          var opts = c.componentOptions;
          var name = opts
            ? (opts.Ctor.options.name || opts.tag)
            : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var f = document.body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      addTransitionClass(el, moveClass);
      var info = getTransitionInfo(el);
      removeTransitionClass(el, moveClass);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$2.config.isUnknownElement = isUnknownElement;
Vue$2.config.isReservedTag = isReservedTag;
Vue$2.config.getTagNamespace = getTagNamespace;
Vue$2.config.mustUseProp = mustUseProp;

// install platform runtime directives & components
extend(Vue$2.options.directives, platformDirectives);
extend(Vue$2.options.components, platformComponents);

// install platform patch function
Vue$2.prototype.__patch__ = inBrowser ? patch$1 : noop;

// wrap mount
Vue$2.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return this._mount(el, hydrating)
};

if ("" !== 'production' &&
    inBrowser && typeof console !== 'undefined') {
  console[console.info ? 'info' : 'log'](
    "You are running Vue in development mode.\n" +
    "Make sure to turn on production mode when deploying for production.\n" +
    "See more tips at https://vuejs.org/guide/deployment.html"
  );
}

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$2);
    } else if (
      "" !== 'production' &&
      inBrowser && !isEdge && /Chrome\/\d+/.test(window.navigator.userAgent)
    ) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
}, 0);

var vue_runtime_common$1 = Vue$2;

var topBox = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('header',{staticClass:"header clearfix"},[_c('div',{staticClass:"f-l"},[_vm._v("GER错误监控系统")]),_vm._v(" "),_c('div',{staticClass:"f-r"},[_c('router-link',{attrs:{"to":"/user/modpwd"}},[_vm._v("修改密码")]),_vm._v(" "),_c('a',{attrs:{"href":"/logout"}},[_vm._v(" 退出")])],1)])},
staticRenderFns: [],
stub: 1
};

var vuex = createCommonjsModule(function (module, exports) {
/**
 * vuex v2.1.2
 * (c) 2017 Evan You
 * @license MIT
 */
(function (global, factory) {
	module.exports = factory();
}(commonjsGlobal, (function () { 'use strict';

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) { options = {}; }

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedMutation () {
      var arguments$1 = arguments;

      var args = [], len = arguments.length;
      while ( len-- ) { args[ len ] = arguments$1[ len ]; }

      if (namespace && !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
        return
      }
      return this.$store.commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (!(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedAction () {
      var arguments$1 = arguments;

      var args = [], len = arguments.length;
      while ( len-- ) { args[ len ] = arguments$1[ len ]; }

      if (namespace && !getModuleByNamespace(this.$store, 'mapActions', namespace)) {
        return
      }
      return this.$store.dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (!module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
};

var prototypeAccessors$1 = { state: {},namespaced: {} };

prototypeAccessors$1.state.get = function () {
  return this._rawModule.state || {}
};

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  var this$1 = this;

  // register root module (Vuex.Store options)
  this.root = new Module(rawRootModule, false);

  // register all nested modules
  if (rawRootModule.modules) {
    forEachValue(rawRootModule.modules, function (rawModule, key) {
      this$1.register([key], rawModule, false);
    });
  }
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update(this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) { runtime = true; }

  var parent = this.get(path.slice(0, -1));
  var newModule = new Module(rawModule, runtime);
  parent.addChild(path[path.length - 1], newModule);

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (targetModule, newModule) {
  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        console.warn(
          "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
          'manual reload is needed'
        );
        return
      }
      update(targetModule.getChild(key), newModule.modules[key]);
    }
  }
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) { options = {}; }

  assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
  assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");

  var state = options.state; if ( state === void 0 ) { state = {}; }
  var plugins = options.plugins; if ( plugins === void 0 ) { plugins = []; }
  var strict = options.strict; if ( strict === void 0 ) { strict = false; }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.concat(devtoolPlugin).forEach(function (plugin) { return plugin(this$1); });
};

var prototypeAccessors = { state: {} };

prototypeAccessors.state.get = function () {
  return this._vm.$data.state
};

prototypeAccessors.state.set = function (v) {
  assert(false, "Use store.replaceState() to explicit replace store state.");
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    console.error(("[vuex] unknown mutation type: " + type));
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (options && options.silent) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var entry = this._actions[type];
  if (!entry) {
    console.error(("[vuex] unknown action type: " + type));
    return
  }
  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  var subs = this._subscribers;
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  assert(typeof getter === 'function', "store.watch only accepts a function.");
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm.state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule) {
  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path));
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: { state: state },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm.state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (namespace) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var namespacedType = namespace + key;
    registerAction(store, namespacedType, action, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler(local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler({
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    console.error(("[vuex] duplicate getter key: " + type));
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch('state', function () {
    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue) {
    console.error(
      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
    );
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var index = {
  Store: Store,
  install: install,
  version: '2.1.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions
};

return index;

})));
});

//import store from '../index.js';

var state = {
    character: GLOBAL_CONFIG.character,
    isAdmin: GLOBAL_CONFIG.character === 'admin',
    test: '1111111',
    test1: '我是 test1'
};

var mutations = {
    EDIT_TEST: function ( state) {
     	state.test = '234242242343';
    },
    EDIT_TEST1: function (state) {
    	state.test1 = '我是test1';
    }
};

var actions = {
    EDIT_TEST: function (store){
    	store.commit( 'EDIT_TEST');
    },
    EDIT_TEST1: function (store) {
    	store.commit('EDIT_TEST1');
    }
};

var initModule = {
    state: state,
    mutations: mutations,
    actions: actions
};

vue_runtime_common$1.use(vuex);
var stroe = new vuex.Store({
	modules:{
		initModule: initModule
	}
});

var mapState = vuex.mapState;
var leftMenu = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ger-menu"},[_c('ul',[(_vm.isAdmin)?_c('li',[_c('router-link',{attrs:{"to":"/index","active-class":"active"}},[_vm._v("添加列表")])],1):_vm._e(),_vm._v(" "),_c('li',[_c('router-link',{attrs:{"to":"/report","active-class":"active"}},[_vm._v("错误列表")])],1)])])},
staticRenderFns: [],
    computed: Object.assign({}, mapState({
            isAdmin:function (state) { return stroe.state.initModule.isAdmin; }
        }))
   
};

var rightcontent = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ger-cotent"},[_c('router-view')],1)},
staticRenderFns: [],
stub: 1
};

var App = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ger-body"},[_c('topBox'),_vm._v(" "),_c('div',{staticClass:"ger-middle"},[_c('leftMenu'),_vm._v(" "),_c('rightcontent')],1)],1)},
staticRenderFns: [],
  components: {
    topBox: topBox,
    leftMenu: leftMenu,
    rightcontent: rightcontent
  }
};

/**
  * vue-router v2.2.1
  * (c) 2017 Evan You
  * @license MIT
  */
function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn$1 (condition, message) {
  if (!condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // inject instance registration hooks
    var hooks = data.hook || (data.hook = {});
    hooks.init = function (vnode) {
      matched.instances[name] = vnode.child;
    };
    hooks.prepatch = function (oldVnode, vnode) {
      matched.instances[name] = vnode.child;
    };
    hooks.destroy = function (vnode) {
      if (matched.instances[name] === vnode.child) {
        matched.instances[name] = undefined;
      }
    };

    // resolve props
    data.props = resolveProps(route, matched.props && matched.props[name]);

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      warn$1(false, ("props in \"" + (route.path) + "\" is a " + (typeof config) + ", expecting an object, function or boolean."));
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more comformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery
) {
  if ( extraQuery === void 0 ) { extraQuery = {}; }

  if (query) {
    var parsedQuery;
    try {
      parsedQuery = parseQuery(query);
    } catch (e) {
      "production" !== 'production' && warn$1(false, e.message);
      parsedQuery = {};
    }
    for (var key in extraQuery) {
      parsedQuery[key] = extraQuery[key];
    }
    return parsedQuery
  } else {
    return extraQuery
  }
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.slice().forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom
) {
  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: getFullPath(location),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom);
  }
  return Object.freeze(route)
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (ref) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) { query = {}; }
  var hash = ref.hash; if ( hash === void 0 ) { hash = ''; }

  return (path || '/') + stringifyQuery(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) { a = {}; }
  if ( b === void 0 ) { b = {}; }

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;
    var classes = {};
    var activeClass = this.activeClass || router.options.linkActiveClass || 'router-link-active';
    var compareTarget = location.path ? createRoute(null, location) : route;
    classes[activeClass] = this.exact
      ? isSameRoute(current, compareTarget)
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.target && e.target.getAttribute) {
    var target = e.target.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed) { return }
  install.installed = true;

  _Vue = Vue;

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this.$root._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this.$root._route }
  });

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (this.$options.router) {
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      }
    }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.created;
}

/*  */

var inBrowser$1 = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  if (relative.charAt(0) === '/') {
    return relative
  }

  if (relative.charAt(0) === '?' || relative.charAt(0) === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '.') {
      continue
    } else if (segment === '..') {
      stack.pop();
    } else {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath$1 (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

/*  */

function createRouteMap (
  routes,
  oldPathMap,
  oldNameMap
) {
  var pathMap = oldPathMap || Object.create(null);
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathMap, nameMap, route);
  });

  return {
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  var record = {
    path: normalizePath(path, parent),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    if (Array.isArray(route.alias)) {
      route.alias.forEach(function (alias) {
        var aliasRoute = {
          path: alias,
          children: route.children
        };
        addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path);
      });
    } else {
      var aliasRoute = {
        path: route.alias,
        children: route.children
      };
      addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path);
    }
  }

  if (!pathMap[record.path]) {
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ("production" !== 'production' && !matchAs) {
      warn$1(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function normalizePath (path, parent) {
  path = path.replace(/\/$/, '');
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

var index$1 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

var isarray = index$1;

/**
 * Expose `pathToRegexp`.
 */
var index$1$1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

index$1$1.parse = parse_1;
index$1$1.compile = compile_1;
index$1$1.tokensToFunction = tokensToFunction_1;
index$1$1.tokensToRegExp = tokensToRegExp_1;

/*  */

var regexpCache = Object.create(null);

function getRouteRegex (path) {
  var hit = regexpCache[path];
  var keys, regexp;

  if (hit) {
    keys = hit.keys;
    regexp = hit.regexp;
  } else {
    keys = [];
    regexp = index$1$1(path, keys);
    regexpCache[path] = { keys: keys, regexp: regexp };
  }

  return { keys: keys, regexp: regexp }
}

var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = index$1$1.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    return ''
  }
}

/*  */

function normalizeLocation (
  raw,
  current,
  append
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else {}
    return next
  }

  var parsedPath = parsePath$1(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : (current && current.path) || '/';
  var query = resolveQuery(parsedPath.query, next.query);
  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */

function createMatcher (routes) {
  var ref = createRouteMap(routes);
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      var paramNames = getRouteRegex(record.path).keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var path in pathMap) {
        if (matchRoute(path, location.params, location.path)) {
          return _createRoute(pathMap[path], location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      "production" !== 'production' && warn$1(
        false, ("invalid redirect option: " + (JSON.stringify(redirect)))
      );
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      warn$1(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  path,
  params,
  pathname
) {
  var ref = getRouteRegex(path);
  var regexp = ref.regexp;
  var keys = ref.keys;
  var m = pathname.match(regexp);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) { params[key.name] = val; }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);
    if (!shouldScroll) {
      return
    }
    var isObject = typeof shouldScroll === 'object';
    if (isObject && typeof shouldScroll.selector === 'string') {
      var el = document.querySelector(shouldScroll.selector);
      if (el) {
        position = getElementPosition(el);
      } else if (isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll);
      }
    } else if (isObject && isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }

    if (position) {
      window.scrollTo(position.x, position.y);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el) {
  var docRect = document.documentElement.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left,
    y: elRect.top - docRect.top
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

/*  */

var supportsPushState = inBrowser$1 && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser$1 && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */


var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
  }
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) {
        cb(route);
      });
    }
  }, onAbort);
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function () { onAbort && onAbort(); };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    hook(route, current, function (to) {
      if (to === false) {
        // next(false) -> abort navigation, ensure current URL
        this$1.ensureURL(true);
        abort();
      } else if (typeof to === 'string' || typeof to === 'object') {
        // next('/') or next({ path: '/' }) -> redirect
        (typeof to === 'object' && to.replace) ? this$1.replace(to) : this$1.push(to);
        abort();
      } else {
        // confirm transition and pass on the value
        next(to);
      }
    });
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    // wait until async components are resolved before
    // extracting in-component enter guards
    runQueue(enterGuards, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { return cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser$1) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = baseEl ? baseEl.getAttribute('href') : '/';
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  return function boundRouteGuard () {
    return guard.apply(instance, arguments)
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

function resolveAsyncComponents (matched) {
  return flatMapComponents(matched, function (def, _, match, key) {
    // if it's a function and doesn't have Vue options attached,
    // assume it's an async component resolve function.
    // we are not using Vue's default async resolving mechanism because
    // we want to halt the navigation until the incoming component has been
    // resolved.
    if (typeof def === 'function' && !def.options) {
      return function (to, from, next) {
        var resolve = once$1(function (resolvedDef) {
          match.components[key] = resolvedDef;
          next();
        });

        var reject = once$1(function (reason) {
          warn$1(false, ("Failed to resolve async component " + key + ": " + reason));
          next(false);
        });

        var res = def(resolve, reject);
        if (res && typeof res.then === 'function') {
          res.then(resolve, reject);
        }
      }
    }
  })
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once$1 (fn) {
  var called = false;
  return function () {
    if (called) { return }
    called = true;
    return fn.apply(this, arguments)
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    window.addEventListener('popstate', function (e) {
      this$1.transitionTo(getLocation(this$1.base), function (route) {
        if (expectScroll) {
          handleScroll(router, route, this$1.current, true);
        }
      });
    });
  }

  if ( History$$1 ) { HTML5History.__proto__ = History$$1; }
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, this$1.current, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, this$1.current, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) { HashHistory.__proto__ = History$$1; }
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    window.addEventListener('hashchange', function () {
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        replaceHash(route.fullPath);
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function pushHash (path) {
  window.location.hash = path;
}

function replaceHash (path) {
  var i = window.location.href.indexOf('#');
  window.location.replace(
    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
  );
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) { AbstractHistory.__proto__ = History$$1; }
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) { options = {}; }

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || []);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser$1) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      
  }
};

var prototypeAccessors$1 = { currentRoute: {} };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors$1.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  "production" !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  this.beforeHooks.push(fn);
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  this.afterHooks.push(fn);
};

VueRouter.prototype.onReady = function onReady (cb) {
  this.history.onReady(cb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(to, current || this.history.current, append);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors$1 );

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '2.2.1';

if (inBrowser$1 && window.Vue) {
  window.Vue.use(VueRouter);
}

var vueRouter_common$1 = VueRouter;

var mapState$1 = vuex.mapState;
var mapActions$1 = vuex.mapActions;
var report$1 = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._v("\n\t"+_vm._s(_vm.test)+"\n\t"),_c('br'),_vm._v("\n    "+_vm._s(_vm.test1)+"\n    "),_c('br'),_vm._v("\n    "+_vm._s(_vm.test2)+"\n    "),_c('br'),_vm._v(" "),_c('a',{attrs:{"href":"javascript:;"},on:{"click":_vm.EDIT_TEST}},[_vm._v("点击我")]),_vm._v(" "),_c('br'),_vm._v(" "),_c('a',{attrs:{"href":"javascript:;"},on:{"click":_vm.EDIT_TEST1}},[_vm._v("点击我test1")])])},
staticRenderFns: [],
    computed: Object.assign({}, mapState$1({
            test:function (state) { return stroe.state.initModule.test; },
            test1: function (state) { return stroe.state.initModule.test1; }
        }),
        {test2: function(){
            return 'eqqeqweqeqwqwewqeq';
        }}),
    methods: Object.assign({}, mapActions$1(['EDIT_TEST','EDIT_TEST1']))

   
};

var detail = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ger-cotent"},[_vm._v("\n    reportDetail\n")])},
staticRenderFns: [],
stub: 1
};

/**
 * @author zhaodonghong
 * @fileoverview routers report.js
 * @date 2017/02/27
 */

var report = [
	{
		path: '/report', 
		component: report$1 
	},
	{
		path: '/report/:id', 
		component: report$1 
	},
	{
		path: '/report/:id/detail', 
		component: detail 
	}
];

var index$2 = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ger-cotent"},[_c('div',{staticClass:"right_area userlist"},[(_vm.items)?_c('ul',{staticClass:"list-group"},[_vm._v("sadsadssadsad\n            \t"),_vm._l((_vm.items),function(item){return _c('li',[_c('a',{attrs:{"data-id":item.id,"href":"#"}},[_vm._v(_vm._s(item.message))]),_vm._v(" "),_c('input',{staticClass:"btn delete fr",attrs:{"type":"button","value":"删除"}}),_vm._v(" "),_c('input',{staticClass:"btn edit fr",attrs:{"type":"button","value":"编辑"}})])})],2):_vm._e()])])},
staticRenderFns: [],
stub: 1
};

var add = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ger-cotent"},[_vm._v("\n    fsfgdfhjkgjhfghdgsfad\n")])},
staticRenderFns: [],
stub: 1
};

var edit = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ger-cotent"},[_vm._v("\n    fsfgdfhjkgjhfghdgsfad\n")])},
staticRenderFns: [],
stub: 1
};

var modpwd = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ger-cotent"},[_vm._v("\n    fsfgdfhjkgjhfghdgsfad\n")])},
staticRenderFns: [],
stub: 1
};

/**
 * @author zhaodonghong
 * @fileoverview routers user.js
 * @date 2017/02/27
 */
var user$1 = [
	{
		path: '/index', 
		component: index$2,
		redirect: function () {
			if(!stroe.state.initModule.isAdmin){
				return '/report';
			}
	      // 方法接收 目标路由 作为参数
	      // return 重定向的 字符串路径/路径对象
	    }
	},
	{
		path: '/index/:id', 
		component: index$2 
	},
	{
		path: '/user/edit/:name', 
		component: edit 
	},
	{
		path: '/user/add', 
		component: add 
	},
	{
		path: '/user/modpwd/:name', 
		component: modpwd 
	}
];

/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/02/27
 */

var drouters = Array.prototype.concat.call(user$1,report);

vue_runtime_common$1.use(vueRouter_common$1);
var router = new vueRouter_common$1({
	hashbang: false, 
	mode:'history',
  	routes: drouters
});


var vueApp = new vue_runtime_common$1(Object.assign({}, {store: stroe,
    el: '#ger-ui'},
   	App,
   	{router: router}));

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL3BhZ2VzL3B1YmxpYy9oZWFkZXIudnVlIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZXgvZGlzdC92dWV4LmpzIiwiLi4vc3JjL3N0b3JlL21vZHVsZXMvaW5pdE1vZHVsZS5qcyIsIi4uL3NyYy9zdG9yZS9pbmRleC5qcyIsIi4uL3NyYy9wYWdlcy9wdWJsaWMvbWVudS52dWUiLCIuLi9zcmMvcGFnZXMvcHVibGljL2NvbnRlbnQudnVlIiwiLi4vc3JjL2FwcC52dWUiLCIuLi9ub2RlX21vZHVsZXMvdnVlLXJvdXRlci9kaXN0L3Z1ZS1yb3V0ZXIuY29tbW9uLmpzIiwiLi4vc3JjL3BhZ2VzL3JlcG9ydC9yZXBvcnQudnVlIiwiLi4vc3JjL3BhZ2VzL3JlcG9ydC9kZXRhaWwudnVlIiwiLi4vc3JjL3JvdXRlcnMvcmVwb3J0LmpzIiwiLi4vc3JjL3BhZ2VzL3VzZXIvbGlzdC52dWUiLCIuLi9zcmMvcGFnZXMvdXNlci9hZGQudnVlIiwiLi4vc3JjL3BhZ2VzL3VzZXIvZWRpdC52dWUiLCIuLi9zcmMvcGFnZXMvdXNlci9tb2Rwd2QudnVlIiwiLi4vc3JjL3JvdXRlcnMvdXNlci5qcyIsIi4uL3NyYy9yb3V0ZXJzL2luZGV4LmpzIiwiLi4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT4gXHJcbiAgICA8aGVhZGVyIGNsYXNzPVwiaGVhZGVyIGNsZWFyZml4XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImYtbFwiPkdFUumUmeivr+ebkeaOp+ezu+e7nzwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmLXJcIj5cclxuICAgICAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL3VzZXIvbW9kcHdkXCI+5L+u5pS55a+G56CBPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgPGEgaHJlZj1cIi9sb2dvdXRcIj4g6YCA5Ye6PC9hPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9oZWFkZXI+XHJcbjwvdGVtcGxhdGU+IiwiLyoqXG4gKiB2dWV4IHYyLjEuMlxuICogKGMpIDIwMTcgRXZhbiBZb3VcbiAqIEBsaWNlbnNlIE1JVFxuICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG5cdChnbG9iYWwuVnVleCA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxudmFyIGRldnRvb2xIb29rID1cbiAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgd2luZG93Ll9fVlVFX0RFVlRPT0xTX0dMT0JBTF9IT09LX187XG5cbmZ1bmN0aW9uIGRldnRvb2xQbHVnaW4gKHN0b3JlKSB7XG4gIGlmICghZGV2dG9vbEhvb2spIHsgcmV0dXJuIH1cblxuICBzdG9yZS5fZGV2dG9vbEhvb2sgPSBkZXZ0b29sSG9vaztcblxuICBkZXZ0b29sSG9vay5lbWl0KCd2dWV4OmluaXQnLCBzdG9yZSk7XG5cbiAgZGV2dG9vbEhvb2sub24oJ3Z1ZXg6dHJhdmVsLXRvLXN0YXRlJywgZnVuY3Rpb24gKHRhcmdldFN0YXRlKSB7XG4gICAgc3RvcmUucmVwbGFjZVN0YXRlKHRhcmdldFN0YXRlKTtcbiAgfSk7XG5cbiAgc3RvcmUuc3Vic2NyaWJlKGZ1bmN0aW9uIChtdXRhdGlvbiwgc3RhdGUpIHtcbiAgICBkZXZ0b29sSG9vay5lbWl0KCd2dWV4Om11dGF0aW9uJywgbXV0YXRpb24sIHN0YXRlKTtcbiAgfSk7XG59XG5cbnZhciBhcHBseU1peGluID0gZnVuY3Rpb24gKFZ1ZSkge1xuICB2YXIgdmVyc2lvbiA9IE51bWJlcihWdWUudmVyc2lvbi5zcGxpdCgnLicpWzBdKTtcblxuICBpZiAodmVyc2lvbiA+PSAyKSB7XG4gICAgdmFyIHVzZXNJbml0ID0gVnVlLmNvbmZpZy5fbGlmZWN5Y2xlSG9va3MuaW5kZXhPZignaW5pdCcpID4gLTE7XG4gICAgVnVlLm1peGluKHVzZXNJbml0ID8geyBpbml0OiB2dWV4SW5pdCB9IDogeyBiZWZvcmVDcmVhdGU6IHZ1ZXhJbml0IH0pO1xuICB9IGVsc2Uge1xuICAgIC8vIG92ZXJyaWRlIGluaXQgYW5kIGluamVjdCB2dWV4IGluaXQgcHJvY2VkdXJlXG4gICAgLy8gZm9yIDEueCBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbiAgICB2YXIgX2luaXQgPSBWdWUucHJvdG90eXBlLl9pbml0O1xuICAgIFZ1ZS5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgaWYgKCBvcHRpb25zID09PSB2b2lkIDAgKSBvcHRpb25zID0ge307XG5cbiAgICAgIG9wdGlvbnMuaW5pdCA9IG9wdGlvbnMuaW5pdFxuICAgICAgICA/IFt2dWV4SW5pdF0uY29uY2F0KG9wdGlvbnMuaW5pdClcbiAgICAgICAgOiB2dWV4SW5pdDtcbiAgICAgIF9pbml0LmNhbGwodGhpcywgb3B0aW9ucyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBWdWV4IGluaXQgaG9vaywgaW5qZWN0ZWQgaW50byBlYWNoIGluc3RhbmNlcyBpbml0IGhvb2tzIGxpc3QuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIHZ1ZXhJbml0ICgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMuJG9wdGlvbnM7XG4gICAgLy8gc3RvcmUgaW5qZWN0aW9uXG4gICAgaWYgKG9wdGlvbnMuc3RvcmUpIHtcbiAgICAgIHRoaXMuJHN0b3JlID0gb3B0aW9ucy5zdG9yZTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMucGFyZW50ICYmIG9wdGlvbnMucGFyZW50LiRzdG9yZSkge1xuICAgICAgdGhpcy4kc3RvcmUgPSBvcHRpb25zLnBhcmVudC4kc3RvcmU7XG4gICAgfVxuICB9XG59O1xuXG52YXIgbWFwU3RhdGUgPSBub3JtYWxpemVOYW1lc3BhY2UoZnVuY3Rpb24gKG5hbWVzcGFjZSwgc3RhdGVzKSB7XG4gIHZhciByZXMgPSB7fTtcbiAgbm9ybWFsaXplTWFwKHN0YXRlcykuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7XG4gICAgdmFyIGtleSA9IHJlZi5rZXk7XG4gICAgdmFyIHZhbCA9IHJlZi52YWw7XG5cbiAgICByZXNba2V5XSA9IGZ1bmN0aW9uIG1hcHBlZFN0YXRlICgpIHtcbiAgICAgIHZhciBzdGF0ZSA9IHRoaXMuJHN0b3JlLnN0YXRlO1xuICAgICAgdmFyIGdldHRlcnMgPSB0aGlzLiRzdG9yZS5nZXR0ZXJzO1xuICAgICAgaWYgKG5hbWVzcGFjZSkge1xuICAgICAgICB2YXIgbW9kdWxlID0gZ2V0TW9kdWxlQnlOYW1lc3BhY2UodGhpcy4kc3RvcmUsICdtYXBTdGF0ZScsIG5hbWVzcGFjZSk7XG4gICAgICAgIGlmICghbW9kdWxlKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUgPSBtb2R1bGUuY29udGV4dC5zdGF0ZTtcbiAgICAgICAgZ2V0dGVycyA9IG1vZHVsZS5jb250ZXh0LmdldHRlcnM7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IHZhbC5jYWxsKHRoaXMsIHN0YXRlLCBnZXR0ZXJzKVxuICAgICAgICA6IHN0YXRlW3ZhbF1cbiAgICB9O1xuICB9KTtcbiAgcmV0dXJuIHJlc1xufSk7XG5cbnZhciBtYXBNdXRhdGlvbnMgPSBub3JtYWxpemVOYW1lc3BhY2UoZnVuY3Rpb24gKG5hbWVzcGFjZSwgbXV0YXRpb25zKSB7XG4gIHZhciByZXMgPSB7fTtcbiAgbm9ybWFsaXplTWFwKG11dGF0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7XG4gICAgdmFyIGtleSA9IHJlZi5rZXk7XG4gICAgdmFyIHZhbCA9IHJlZi52YWw7XG5cbiAgICB2YWwgPSBuYW1lc3BhY2UgKyB2YWw7XG4gICAgcmVzW2tleV0gPSBmdW5jdGlvbiBtYXBwZWRNdXRhdGlvbiAoKSB7XG4gICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgaWYgKG5hbWVzcGFjZSAmJiAhZ2V0TW9kdWxlQnlOYW1lc3BhY2UodGhpcy4kc3RvcmUsICdtYXBNdXRhdGlvbnMnLCBuYW1lc3BhY2UpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmNvbW1pdC5hcHBseSh0aGlzLiRzdG9yZSwgW3ZhbF0uY29uY2F0KGFyZ3MpKVxuICAgIH07XG4gIH0pO1xuICByZXR1cm4gcmVzXG59KTtcblxudmFyIG1hcEdldHRlcnMgPSBub3JtYWxpemVOYW1lc3BhY2UoZnVuY3Rpb24gKG5hbWVzcGFjZSwgZ2V0dGVycykge1xuICB2YXIgcmVzID0ge307XG4gIG5vcm1hbGl6ZU1hcChnZXR0ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChyZWYpIHtcbiAgICB2YXIga2V5ID0gcmVmLmtleTtcbiAgICB2YXIgdmFsID0gcmVmLnZhbDtcblxuICAgIHZhbCA9IG5hbWVzcGFjZSArIHZhbDtcbiAgICByZXNba2V5XSA9IGZ1bmN0aW9uIG1hcHBlZEdldHRlciAoKSB7XG4gICAgICBpZiAobmFtZXNwYWNlICYmICFnZXRNb2R1bGVCeU5hbWVzcGFjZSh0aGlzLiRzdG9yZSwgJ21hcEdldHRlcnMnLCBuYW1lc3BhY2UpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYgKCEodmFsIGluIHRoaXMuJHN0b3JlLmdldHRlcnMpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoKFwiW3Z1ZXhdIHVua25vd24gZ2V0dGVyOiBcIiArIHZhbCkpO1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzW3ZhbF1cbiAgICB9O1xuICB9KTtcbiAgcmV0dXJuIHJlc1xufSk7XG5cbnZhciBtYXBBY3Rpb25zID0gbm9ybWFsaXplTmFtZXNwYWNlKGZ1bmN0aW9uIChuYW1lc3BhY2UsIGFjdGlvbnMpIHtcbiAgdmFyIHJlcyA9IHt9O1xuICBub3JtYWxpemVNYXAoYWN0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7XG4gICAgdmFyIGtleSA9IHJlZi5rZXk7XG4gICAgdmFyIHZhbCA9IHJlZi52YWw7XG5cbiAgICB2YWwgPSBuYW1lc3BhY2UgKyB2YWw7XG4gICAgcmVzW2tleV0gPSBmdW5jdGlvbiBtYXBwZWRBY3Rpb24gKCkge1xuICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICAgIGlmIChuYW1lc3BhY2UgJiYgIWdldE1vZHVsZUJ5TmFtZXNwYWNlKHRoaXMuJHN0b3JlLCAnbWFwQWN0aW9ucycsIG5hbWVzcGFjZSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy4kc3RvcmUuZGlzcGF0Y2guYXBwbHkodGhpcy4kc3RvcmUsIFt2YWxdLmNvbmNhdChhcmdzKSlcbiAgICB9O1xuICB9KTtcbiAgcmV0dXJuIHJlc1xufSk7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZU1hcCAobWFwKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KG1hcClcbiAgICA/IG1hcC5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gKHsga2V5OiBrZXksIHZhbDoga2V5IH0pOyB9KVxuICAgIDogT2JqZWN0LmtleXMobWFwKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gKHsga2V5OiBrZXksIHZhbDogbWFwW2tleV0gfSk7IH0pXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWVzcGFjZSAoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChuYW1lc3BhY2UsIG1hcCkge1xuICAgIGlmICh0eXBlb2YgbmFtZXNwYWNlICE9PSAnc3RyaW5nJykge1xuICAgICAgbWFwID0gbmFtZXNwYWNlO1xuICAgICAgbmFtZXNwYWNlID0gJyc7XG4gICAgfSBlbHNlIGlmIChuYW1lc3BhY2UuY2hhckF0KG5hbWVzcGFjZS5sZW5ndGggLSAxKSAhPT0gJy8nKSB7XG4gICAgICBuYW1lc3BhY2UgKz0gJy8nO1xuICAgIH1cbiAgICByZXR1cm4gZm4obmFtZXNwYWNlLCBtYXApXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0TW9kdWxlQnlOYW1lc3BhY2UgKHN0b3JlLCBoZWxwZXIsIG5hbWVzcGFjZSkge1xuICB2YXIgbW9kdWxlID0gc3RvcmUuX21vZHVsZXNOYW1lc3BhY2VNYXBbbmFtZXNwYWNlXTtcbiAgaWYgKCFtb2R1bGUpIHtcbiAgICBjb25zb2xlLmVycm9yKChcIlt2dWV4XSBtb2R1bGUgbmFtZXNwYWNlIG5vdCBmb3VuZCBpbiBcIiArIGhlbHBlciArIFwiKCk6IFwiICsgbmFtZXNwYWNlKSk7XG4gIH1cbiAgcmV0dXJuIG1vZHVsZVxufVxuXG4vKipcbiAqIEdldCB0aGUgZmlyc3QgaXRlbSB0aGF0IHBhc3MgdGhlIHRlc3RcbiAqIGJ5IHNlY29uZCBhcmd1bWVudCBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZcbiAqIEByZXR1cm4geyp9XG4gKi9cbi8qKlxuICogRGVlcCBjb3B5IHRoZSBnaXZlbiBvYmplY3QgY29uc2lkZXJpbmcgY2lyY3VsYXIgc3RydWN0dXJlLlxuICogVGhpcyBmdW5jdGlvbiBjYWNoZXMgYWxsIG5lc3RlZCBvYmplY3RzIGFuZCBpdHMgY29waWVzLlxuICogSWYgaXQgZGV0ZWN0cyBjaXJjdWxhciBzdHJ1Y3R1cmUsIHVzZSBjYWNoZWQgY29weSB0byBhdm9pZCBpbmZpbml0ZSBsb29wLlxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGNhY2hlXG4gKiBAcmV0dXJuIHsqfVxuICovXG5cblxuLyoqXG4gKiBmb3JFYWNoIGZvciBvYmplY3RcbiAqL1xuZnVuY3Rpb24gZm9yRWFjaFZhbHVlIChvYmosIGZuKSB7XG4gIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBmbihvYmpba2V5XSwga2V5KTsgfSk7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0IChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0J1xufVxuXG5mdW5jdGlvbiBpc1Byb21pc2UgKHZhbCkge1xuICByZXR1cm4gdmFsICYmIHR5cGVvZiB2YWwudGhlbiA9PT0gJ2Z1bmN0aW9uJ1xufVxuXG5mdW5jdGlvbiBhc3NlcnQgKGNvbmRpdGlvbiwgbXNnKSB7XG4gIGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcigoXCJbdnVleF0gXCIgKyBtc2cpKSB9XG59XG5cbnZhciBNb2R1bGUgPSBmdW5jdGlvbiBNb2R1bGUgKHJhd01vZHVsZSwgcnVudGltZSkge1xuICB0aGlzLnJ1bnRpbWUgPSBydW50aW1lO1xuICB0aGlzLl9jaGlsZHJlbiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHRoaXMuX3Jhd01vZHVsZSA9IHJhd01vZHVsZTtcbn07XG5cbnZhciBwcm90b3R5cGVBY2Nlc3NvcnMkMSA9IHsgc3RhdGU6IHt9LG5hbWVzcGFjZWQ6IHt9IH07XG5cbnByb3RvdHlwZUFjY2Vzc29ycyQxLnN0YXRlLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuX3Jhd01vZHVsZS5zdGF0ZSB8fCB7fVxufTtcblxucHJvdG90eXBlQWNjZXNzb3JzJDEubmFtZXNwYWNlZC5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAhIXRoaXMuX3Jhd01vZHVsZS5uYW1lc3BhY2VkXG59O1xuXG5Nb2R1bGUucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24gYWRkQ2hpbGQgKGtleSwgbW9kdWxlKSB7XG4gIHRoaXMuX2NoaWxkcmVuW2tleV0gPSBtb2R1bGU7XG59O1xuXG5Nb2R1bGUucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24gcmVtb3ZlQ2hpbGQgKGtleSkge1xuICBkZWxldGUgdGhpcy5fY2hpbGRyZW5ba2V5XTtcbn07XG5cbk1vZHVsZS5wcm90b3R5cGUuZ2V0Q2hpbGQgPSBmdW5jdGlvbiBnZXRDaGlsZCAoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9jaGlsZHJlbltrZXldXG59O1xuXG5Nb2R1bGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSAocmF3TW9kdWxlKSB7XG4gIHRoaXMuX3Jhd01vZHVsZS5uYW1lc3BhY2VkID0gcmF3TW9kdWxlLm5hbWVzcGFjZWQ7XG4gIGlmIChyYXdNb2R1bGUuYWN0aW9ucykge1xuICAgIHRoaXMuX3Jhd01vZHVsZS5hY3Rpb25zID0gcmF3TW9kdWxlLmFjdGlvbnM7XG4gIH1cbiAgaWYgKHJhd01vZHVsZS5tdXRhdGlvbnMpIHtcbiAgICB0aGlzLl9yYXdNb2R1bGUubXV0YXRpb25zID0gcmF3TW9kdWxlLm11dGF0aW9ucztcbiAgfVxuICBpZiAocmF3TW9kdWxlLmdldHRlcnMpIHtcbiAgICB0aGlzLl9yYXdNb2R1bGUuZ2V0dGVycyA9IHJhd01vZHVsZS5nZXR0ZXJzO1xuICB9XG59O1xuXG5Nb2R1bGUucHJvdG90eXBlLmZvckVhY2hDaGlsZCA9IGZ1bmN0aW9uIGZvckVhY2hDaGlsZCAoZm4pIHtcbiAgZm9yRWFjaFZhbHVlKHRoaXMuX2NoaWxkcmVuLCBmbik7XG59O1xuXG5Nb2R1bGUucHJvdG90eXBlLmZvckVhY2hHZXR0ZXIgPSBmdW5jdGlvbiBmb3JFYWNoR2V0dGVyIChmbikge1xuICBpZiAodGhpcy5fcmF3TW9kdWxlLmdldHRlcnMpIHtcbiAgICBmb3JFYWNoVmFsdWUodGhpcy5fcmF3TW9kdWxlLmdldHRlcnMsIGZuKTtcbiAgfVxufTtcblxuTW9kdWxlLnByb3RvdHlwZS5mb3JFYWNoQWN0aW9uID0gZnVuY3Rpb24gZm9yRWFjaEFjdGlvbiAoZm4pIHtcbiAgaWYgKHRoaXMuX3Jhd01vZHVsZS5hY3Rpb25zKSB7XG4gICAgZm9yRWFjaFZhbHVlKHRoaXMuX3Jhd01vZHVsZS5hY3Rpb25zLCBmbik7XG4gIH1cbn07XG5cbk1vZHVsZS5wcm90b3R5cGUuZm9yRWFjaE11dGF0aW9uID0gZnVuY3Rpb24gZm9yRWFjaE11dGF0aW9uIChmbikge1xuICBpZiAodGhpcy5fcmF3TW9kdWxlLm11dGF0aW9ucykge1xuICAgIGZvckVhY2hWYWx1ZSh0aGlzLl9yYXdNb2R1bGUubXV0YXRpb25zLCBmbik7XG4gIH1cbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBNb2R1bGUucHJvdG90eXBlLCBwcm90b3R5cGVBY2Nlc3NvcnMkMSApO1xuXG52YXIgTW9kdWxlQ29sbGVjdGlvbiA9IGZ1bmN0aW9uIE1vZHVsZUNvbGxlY3Rpb24gKHJhd1Jvb3RNb2R1bGUpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgLy8gcmVnaXN0ZXIgcm9vdCBtb2R1bGUgKFZ1ZXguU3RvcmUgb3B0aW9ucylcbiAgdGhpcy5yb290ID0gbmV3IE1vZHVsZShyYXdSb290TW9kdWxlLCBmYWxzZSk7XG5cbiAgLy8gcmVnaXN0ZXIgYWxsIG5lc3RlZCBtb2R1bGVzXG4gIGlmIChyYXdSb290TW9kdWxlLm1vZHVsZXMpIHtcbiAgICBmb3JFYWNoVmFsdWUocmF3Um9vdE1vZHVsZS5tb2R1bGVzLCBmdW5jdGlvbiAocmF3TW9kdWxlLCBrZXkpIHtcbiAgICAgIHRoaXMkMS5yZWdpc3Rlcihba2V5XSwgcmF3TW9kdWxlLCBmYWxzZSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbk1vZHVsZUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAocGF0aCkge1xuICByZXR1cm4gcGF0aC5yZWR1Y2UoZnVuY3Rpb24gKG1vZHVsZSwga2V5KSB7XG4gICAgcmV0dXJuIG1vZHVsZS5nZXRDaGlsZChrZXkpXG4gIH0sIHRoaXMucm9vdClcbn07XG5cbk1vZHVsZUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldE5hbWVzcGFjZSA9IGZ1bmN0aW9uIGdldE5hbWVzcGFjZSAocGF0aCkge1xuICB2YXIgbW9kdWxlID0gdGhpcy5yb290O1xuICByZXR1cm4gcGF0aC5yZWR1Y2UoZnVuY3Rpb24gKG5hbWVzcGFjZSwga2V5KSB7XG4gICAgbW9kdWxlID0gbW9kdWxlLmdldENoaWxkKGtleSk7XG4gICAgcmV0dXJuIG5hbWVzcGFjZSArIChtb2R1bGUubmFtZXNwYWNlZCA/IGtleSArICcvJyA6ICcnKVxuICB9LCAnJylcbn07XG5cbk1vZHVsZUNvbGxlY3Rpb24ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSQxIChyYXdSb290TW9kdWxlKSB7XG4gIHVwZGF0ZSh0aGlzLnJvb3QsIHJhd1Jvb3RNb2R1bGUpO1xufTtcblxuTW9kdWxlQ29sbGVjdGlvbi5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiByZWdpc3RlciAocGF0aCwgcmF3TW9kdWxlLCBydW50aW1lKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG4gICAgaWYgKCBydW50aW1lID09PSB2b2lkIDAgKSBydW50aW1lID0gdHJ1ZTtcblxuICB2YXIgcGFyZW50ID0gdGhpcy5nZXQocGF0aC5zbGljZSgwLCAtMSkpO1xuICB2YXIgbmV3TW9kdWxlID0gbmV3IE1vZHVsZShyYXdNb2R1bGUsIHJ1bnRpbWUpO1xuICBwYXJlbnQuYWRkQ2hpbGQocGF0aFtwYXRoLmxlbmd0aCAtIDFdLCBuZXdNb2R1bGUpO1xuXG4gIC8vIHJlZ2lzdGVyIG5lc3RlZCBtb2R1bGVzXG4gIGlmIChyYXdNb2R1bGUubW9kdWxlcykge1xuICAgIGZvckVhY2hWYWx1ZShyYXdNb2R1bGUubW9kdWxlcywgZnVuY3Rpb24gKHJhd0NoaWxkTW9kdWxlLCBrZXkpIHtcbiAgICAgIHRoaXMkMS5yZWdpc3RlcihwYXRoLmNvbmNhdChrZXkpLCByYXdDaGlsZE1vZHVsZSwgcnVudGltZSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbk1vZHVsZUNvbGxlY3Rpb24ucHJvdG90eXBlLnVucmVnaXN0ZXIgPSBmdW5jdGlvbiB1bnJlZ2lzdGVyIChwYXRoKSB7XG4gIHZhciBwYXJlbnQgPSB0aGlzLmdldChwYXRoLnNsaWNlKDAsIC0xKSk7XG4gIHZhciBrZXkgPSBwYXRoW3BhdGgubGVuZ3RoIC0gMV07XG4gIGlmICghcGFyZW50LmdldENoaWxkKGtleSkucnVudGltZSkgeyByZXR1cm4gfVxuXG4gIHBhcmVudC5yZW1vdmVDaGlsZChrZXkpO1xufTtcblxuZnVuY3Rpb24gdXBkYXRlICh0YXJnZXRNb2R1bGUsIG5ld01vZHVsZSkge1xuICAvLyB1cGRhdGUgdGFyZ2V0IG1vZHVsZVxuICB0YXJnZXRNb2R1bGUudXBkYXRlKG5ld01vZHVsZSk7XG5cbiAgLy8gdXBkYXRlIG5lc3RlZCBtb2R1bGVzXG4gIGlmIChuZXdNb2R1bGUubW9kdWxlcykge1xuICAgIGZvciAodmFyIGtleSBpbiBuZXdNb2R1bGUubW9kdWxlcykge1xuICAgICAgaWYgKCF0YXJnZXRNb2R1bGUuZ2V0Q2hpbGQoa2V5KSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgXCJbdnVleF0gdHJ5aW5nIHRvIGFkZCBhIG5ldyBtb2R1bGUgJ1wiICsga2V5ICsgXCInIG9uIGhvdCByZWxvYWRpbmcsIFwiICtcbiAgICAgICAgICAnbWFudWFsIHJlbG9hZCBpcyBuZWVkZWQnXG4gICAgICAgICk7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdXBkYXRlKHRhcmdldE1vZHVsZS5nZXRDaGlsZChrZXkpLCBuZXdNb2R1bGUubW9kdWxlc1trZXldKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIFZ1ZTsgLy8gYmluZCBvbiBpbnN0YWxsXG5cbnZhciBTdG9yZSA9IGZ1bmN0aW9uIFN0b3JlIChvcHRpb25zKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuICBpZiAoIG9wdGlvbnMgPT09IHZvaWQgMCApIG9wdGlvbnMgPSB7fTtcblxuICBhc3NlcnQoVnVlLCBcIm11c3QgY2FsbCBWdWUudXNlKFZ1ZXgpIGJlZm9yZSBjcmVhdGluZyBhIHN0b3JlIGluc3RhbmNlLlwiKTtcbiAgYXNzZXJ0KHR5cGVvZiBQcm9taXNlICE9PSAndW5kZWZpbmVkJywgXCJ2dWV4IHJlcXVpcmVzIGEgUHJvbWlzZSBwb2x5ZmlsbCBpbiB0aGlzIGJyb3dzZXIuXCIpO1xuXG4gIHZhciBzdGF0ZSA9IG9wdGlvbnMuc3RhdGU7IGlmICggc3RhdGUgPT09IHZvaWQgMCApIHN0YXRlID0ge307XG4gIHZhciBwbHVnaW5zID0gb3B0aW9ucy5wbHVnaW5zOyBpZiAoIHBsdWdpbnMgPT09IHZvaWQgMCApIHBsdWdpbnMgPSBbXTtcbiAgdmFyIHN0cmljdCA9IG9wdGlvbnMuc3RyaWN0OyBpZiAoIHN0cmljdCA9PT0gdm9pZCAwICkgc3RyaWN0ID0gZmFsc2U7XG5cbiAgLy8gc3RvcmUgaW50ZXJuYWwgc3RhdGVcbiAgdGhpcy5fY29tbWl0dGluZyA9IGZhbHNlO1xuICB0aGlzLl9hY3Rpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdGhpcy5fbXV0YXRpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdGhpcy5fd3JhcHBlZEdldHRlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB0aGlzLl9tb2R1bGVzID0gbmV3IE1vZHVsZUNvbGxlY3Rpb24ob3B0aW9ucyk7XG4gIHRoaXMuX21vZHVsZXNOYW1lc3BhY2VNYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB0aGlzLl9zdWJzY3JpYmVycyA9IFtdO1xuICB0aGlzLl93YXRjaGVyVk0gPSBuZXcgVnVlKCk7XG5cbiAgLy8gYmluZCBjb21taXQgYW5kIGRpc3BhdGNoIHRvIHNlbGZcbiAgdmFyIHN0b3JlID0gdGhpcztcbiAgdmFyIHJlZiA9IHRoaXM7XG4gIHZhciBkaXNwYXRjaCA9IHJlZi5kaXNwYXRjaDtcbiAgdmFyIGNvbW1pdCA9IHJlZi5jb21taXQ7XG4gIHRoaXMuZGlzcGF0Y2ggPSBmdW5jdGlvbiBib3VuZERpc3BhdGNoICh0eXBlLCBwYXlsb2FkKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoLmNhbGwoc3RvcmUsIHR5cGUsIHBheWxvYWQpXG4gIH07XG4gIHRoaXMuY29tbWl0ID0gZnVuY3Rpb24gYm91bmRDb21taXQgKHR5cGUsIHBheWxvYWQsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gY29tbWl0LmNhbGwoc3RvcmUsIHR5cGUsIHBheWxvYWQsIG9wdGlvbnMpXG4gIH07XG5cbiAgLy8gc3RyaWN0IG1vZGVcbiAgdGhpcy5zdHJpY3QgPSBzdHJpY3Q7XG5cbiAgLy8gaW5pdCByb290IG1vZHVsZS5cbiAgLy8gdGhpcyBhbHNvIHJlY3Vyc2l2ZWx5IHJlZ2lzdGVycyBhbGwgc3ViLW1vZHVsZXNcbiAgLy8gYW5kIGNvbGxlY3RzIGFsbCBtb2R1bGUgZ2V0dGVycyBpbnNpZGUgdGhpcy5fd3JhcHBlZEdldHRlcnNcbiAgaW5zdGFsbE1vZHVsZSh0aGlzLCBzdGF0ZSwgW10sIHRoaXMuX21vZHVsZXMucm9vdCk7XG5cbiAgLy8gaW5pdGlhbGl6ZSB0aGUgc3RvcmUgdm0sIHdoaWNoIGlzIHJlc3BvbnNpYmxlIGZvciB0aGUgcmVhY3Rpdml0eVxuICAvLyAoYWxzbyByZWdpc3RlcnMgX3dyYXBwZWRHZXR0ZXJzIGFzIGNvbXB1dGVkIHByb3BlcnRpZXMpXG4gIHJlc2V0U3RvcmVWTSh0aGlzLCBzdGF0ZSk7XG5cbiAgLy8gYXBwbHkgcGx1Z2luc1xuICBwbHVnaW5zLmNvbmNhdChkZXZ0b29sUGx1Z2luKS5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW4pIHsgcmV0dXJuIHBsdWdpbih0aGlzJDEpOyB9KTtcbn07XG5cbnZhciBwcm90b3R5cGVBY2Nlc3NvcnMgPSB7IHN0YXRlOiB7fSB9O1xuXG5wcm90b3R5cGVBY2Nlc3NvcnMuc3RhdGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5fdm0uJGRhdGEuc3RhdGVcbn07XG5cbnByb3RvdHlwZUFjY2Vzc29ycy5zdGF0ZS5zZXQgPSBmdW5jdGlvbiAodikge1xuICBhc3NlcnQoZmFsc2UsIFwiVXNlIHN0b3JlLnJlcGxhY2VTdGF0ZSgpIHRvIGV4cGxpY2l0IHJlcGxhY2Ugc3RvcmUgc3RhdGUuXCIpO1xufTtcblxuU3RvcmUucHJvdG90eXBlLmNvbW1pdCA9IGZ1bmN0aW9uIGNvbW1pdCAoX3R5cGUsIF9wYXlsb2FkLCBfb3B0aW9ucykge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIC8vIGNoZWNrIG9iamVjdC1zdHlsZSBjb21taXRcbiAgdmFyIHJlZiA9IHVuaWZ5T2JqZWN0U3R5bGUoX3R5cGUsIF9wYXlsb2FkLCBfb3B0aW9ucyk7XG4gICAgdmFyIHR5cGUgPSByZWYudHlwZTtcbiAgICB2YXIgcGF5bG9hZCA9IHJlZi5wYXlsb2FkO1xuICAgIHZhciBvcHRpb25zID0gcmVmLm9wdGlvbnM7XG5cbiAgdmFyIG11dGF0aW9uID0geyB0eXBlOiB0eXBlLCBwYXlsb2FkOiBwYXlsb2FkIH07XG4gIHZhciBlbnRyeSA9IHRoaXMuX211dGF0aW9uc1t0eXBlXTtcbiAgaWYgKCFlbnRyeSkge1xuICAgIGNvbnNvbGUuZXJyb3IoKFwiW3Z1ZXhdIHVua25vd24gbXV0YXRpb24gdHlwZTogXCIgKyB0eXBlKSk7XG4gICAgcmV0dXJuXG4gIH1cbiAgdGhpcy5fd2l0aENvbW1pdChmdW5jdGlvbiAoKSB7XG4gICAgZW50cnkuZm9yRWFjaChmdW5jdGlvbiBjb21taXRJdGVyYXRvciAoaGFuZGxlcikge1xuICAgICAgaGFuZGxlcihwYXlsb2FkKTtcbiAgICB9KTtcbiAgfSk7XG4gIHRoaXMuX3N1YnNjcmliZXJzLmZvckVhY2goZnVuY3Rpb24gKHN1YikgeyByZXR1cm4gc3ViKG11dGF0aW9uLCB0aGlzJDEuc3RhdGUpOyB9KTtcblxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnNpbGVudCkge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIFwiW3Z1ZXhdIG11dGF0aW9uIHR5cGU6IFwiICsgdHlwZSArIFwiLiBTaWxlbnQgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWQuIFwiICtcbiAgICAgICdVc2UgdGhlIGZpbHRlciBmdW5jdGlvbmFsaXR5IGluIHRoZSB2dWUtZGV2dG9vbHMnXG4gICAgKTtcbiAgfVxufTtcblxuU3RvcmUucHJvdG90eXBlLmRpc3BhdGNoID0gZnVuY3Rpb24gZGlzcGF0Y2ggKF90eXBlLCBfcGF5bG9hZCkge1xuICAvLyBjaGVjayBvYmplY3Qtc3R5bGUgZGlzcGF0Y2hcbiAgdmFyIHJlZiA9IHVuaWZ5T2JqZWN0U3R5bGUoX3R5cGUsIF9wYXlsb2FkKTtcbiAgICB2YXIgdHlwZSA9IHJlZi50eXBlO1xuICAgIHZhciBwYXlsb2FkID0gcmVmLnBheWxvYWQ7XG5cbiAgdmFyIGVudHJ5ID0gdGhpcy5fYWN0aW9uc1t0eXBlXTtcbiAgaWYgKCFlbnRyeSkge1xuICAgIGNvbnNvbGUuZXJyb3IoKFwiW3Z1ZXhdIHVua25vd24gYWN0aW9uIHR5cGU6IFwiICsgdHlwZSkpO1xuICAgIHJldHVyblxuICB9XG4gIHJldHVybiBlbnRyeS5sZW5ndGggPiAxXG4gICAgPyBQcm9taXNlLmFsbChlbnRyeS5tYXAoZnVuY3Rpb24gKGhhbmRsZXIpIHsgcmV0dXJuIGhhbmRsZXIocGF5bG9hZCk7IH0pKVxuICAgIDogZW50cnlbMF0ocGF5bG9hZClcbn07XG5cblN0b3JlLnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiBzdWJzY3JpYmUgKGZuKSB7XG4gIHZhciBzdWJzID0gdGhpcy5fc3Vic2NyaWJlcnM7XG4gIGlmIChzdWJzLmluZGV4T2YoZm4pIDwgMCkge1xuICAgIHN1YnMucHVzaChmbik7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaSA9IHN1YnMuaW5kZXhPZihmbik7XG4gICAgaWYgKGkgPiAtMSkge1xuICAgICAgc3Vicy5zcGxpY2UoaSwgMSk7XG4gICAgfVxuICB9XG59O1xuXG5TdG9yZS5wcm90b3R5cGUud2F0Y2ggPSBmdW5jdGlvbiB3YXRjaCAoZ2V0dGVyLCBjYiwgb3B0aW9ucykge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGFzc2VydCh0eXBlb2YgZ2V0dGVyID09PSAnZnVuY3Rpb24nLCBcInN0b3JlLndhdGNoIG9ubHkgYWNjZXB0cyBhIGZ1bmN0aW9uLlwiKTtcbiAgcmV0dXJuIHRoaXMuX3dhdGNoZXJWTS4kd2F0Y2goZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2V0dGVyKHRoaXMkMS5zdGF0ZSwgdGhpcyQxLmdldHRlcnMpOyB9LCBjYiwgb3B0aW9ucylcbn07XG5cblN0b3JlLnByb3RvdHlwZS5yZXBsYWNlU3RhdGUgPSBmdW5jdGlvbiByZXBsYWNlU3RhdGUgKHN0YXRlKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdGhpcy5fd2l0aENvbW1pdChmdW5jdGlvbiAoKSB7XG4gICAgdGhpcyQxLl92bS5zdGF0ZSA9IHN0YXRlO1xuICB9KTtcbn07XG5cblN0b3JlLnByb3RvdHlwZS5yZWdpc3Rlck1vZHVsZSA9IGZ1bmN0aW9uIHJlZ2lzdGVyTW9kdWxlIChwYXRoLCByYXdNb2R1bGUpIHtcbiAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykgeyBwYXRoID0gW3BhdGhdOyB9XG4gIGFzc2VydChBcnJheS5pc0FycmF5KHBhdGgpLCBcIm1vZHVsZSBwYXRoIG11c3QgYmUgYSBzdHJpbmcgb3IgYW4gQXJyYXkuXCIpO1xuICB0aGlzLl9tb2R1bGVzLnJlZ2lzdGVyKHBhdGgsIHJhd01vZHVsZSk7XG4gIGluc3RhbGxNb2R1bGUodGhpcywgdGhpcy5zdGF0ZSwgcGF0aCwgdGhpcy5fbW9kdWxlcy5nZXQocGF0aCkpO1xuICAvLyByZXNldCBzdG9yZSB0byB1cGRhdGUgZ2V0dGVycy4uLlxuICByZXNldFN0b3JlVk0odGhpcywgdGhpcy5zdGF0ZSk7XG59O1xuXG5TdG9yZS5wcm90b3R5cGUudW5yZWdpc3Rlck1vZHVsZSA9IGZ1bmN0aW9uIHVucmVnaXN0ZXJNb2R1bGUgKHBhdGgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7IHBhdGggPSBbcGF0aF07IH1cbiAgYXNzZXJ0KEFycmF5LmlzQXJyYXkocGF0aCksIFwibW9kdWxlIHBhdGggbXVzdCBiZSBhIHN0cmluZyBvciBhbiBBcnJheS5cIik7XG4gIHRoaXMuX21vZHVsZXMudW5yZWdpc3RlcihwYXRoKTtcbiAgdGhpcy5fd2l0aENvbW1pdChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBhcmVudFN0YXRlID0gZ2V0TmVzdGVkU3RhdGUodGhpcyQxLnN0YXRlLCBwYXRoLnNsaWNlKDAsIC0xKSk7XG4gICAgVnVlLmRlbGV0ZShwYXJlbnRTdGF0ZSwgcGF0aFtwYXRoLmxlbmd0aCAtIDFdKTtcbiAgfSk7XG4gIHJlc2V0U3RvcmUodGhpcyk7XG59O1xuXG5TdG9yZS5wcm90b3R5cGUuaG90VXBkYXRlID0gZnVuY3Rpb24gaG90VXBkYXRlIChuZXdPcHRpb25zKSB7XG4gIHRoaXMuX21vZHVsZXMudXBkYXRlKG5ld09wdGlvbnMpO1xuICByZXNldFN0b3JlKHRoaXMsIHRydWUpO1xufTtcblxuU3RvcmUucHJvdG90eXBlLl93aXRoQ29tbWl0ID0gZnVuY3Rpb24gX3dpdGhDb21taXQgKGZuKSB7XG4gIHZhciBjb21taXR0aW5nID0gdGhpcy5fY29tbWl0dGluZztcbiAgdGhpcy5fY29tbWl0dGluZyA9IHRydWU7XG4gIGZuKCk7XG4gIHRoaXMuX2NvbW1pdHRpbmcgPSBjb21taXR0aW5nO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoIFN0b3JlLnByb3RvdHlwZSwgcHJvdG90eXBlQWNjZXNzb3JzICk7XG5cbmZ1bmN0aW9uIHJlc2V0U3RvcmUgKHN0b3JlLCBob3QpIHtcbiAgc3RvcmUuX2FjdGlvbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBzdG9yZS5fbXV0YXRpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgc3RvcmUuX3dyYXBwZWRHZXR0ZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgc3RvcmUuX21vZHVsZXNOYW1lc3BhY2VNYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2YXIgc3RhdGUgPSBzdG9yZS5zdGF0ZTtcbiAgLy8gaW5pdCBhbGwgbW9kdWxlc1xuICBpbnN0YWxsTW9kdWxlKHN0b3JlLCBzdGF0ZSwgW10sIHN0b3JlLl9tb2R1bGVzLnJvb3QsIHRydWUpO1xuICAvLyByZXNldCB2bVxuICByZXNldFN0b3JlVk0oc3RvcmUsIHN0YXRlLCBob3QpO1xufVxuXG5mdW5jdGlvbiByZXNldFN0b3JlVk0gKHN0b3JlLCBzdGF0ZSwgaG90KSB7XG4gIHZhciBvbGRWbSA9IHN0b3JlLl92bTtcblxuICAvLyBiaW5kIHN0b3JlIHB1YmxpYyBnZXR0ZXJzXG4gIHN0b3JlLmdldHRlcnMgPSB7fTtcbiAgdmFyIHdyYXBwZWRHZXR0ZXJzID0gc3RvcmUuX3dyYXBwZWRHZXR0ZXJzO1xuICB2YXIgY29tcHV0ZWQgPSB7fTtcbiAgZm9yRWFjaFZhbHVlKHdyYXBwZWRHZXR0ZXJzLCBmdW5jdGlvbiAoZm4sIGtleSkge1xuICAgIC8vIHVzZSBjb21wdXRlZCB0byBsZXZlcmFnZSBpdHMgbGF6eS1jYWNoaW5nIG1lY2hhbmlzbVxuICAgIGNvbXB1dGVkW2tleV0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBmbihzdG9yZSk7IH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHN0b3JlLmdldHRlcnMsIGtleSwge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzdG9yZS5fdm1ba2V5XTsgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUgLy8gZm9yIGxvY2FsIGdldHRlcnNcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gdXNlIGEgVnVlIGluc3RhbmNlIHRvIHN0b3JlIHRoZSBzdGF0ZSB0cmVlXG4gIC8vIHN1cHByZXNzIHdhcm5pbmdzIGp1c3QgaW4gY2FzZSB0aGUgdXNlciBoYXMgYWRkZWRcbiAgLy8gc29tZSBmdW5reSBnbG9iYWwgbWl4aW5zXG4gIHZhciBzaWxlbnQgPSBWdWUuY29uZmlnLnNpbGVudDtcbiAgVnVlLmNvbmZpZy5zaWxlbnQgPSB0cnVlO1xuICBzdG9yZS5fdm0gPSBuZXcgVnVlKHtcbiAgICBkYXRhOiB7IHN0YXRlOiBzdGF0ZSB9LFxuICAgIGNvbXB1dGVkOiBjb21wdXRlZFxuICB9KTtcbiAgVnVlLmNvbmZpZy5zaWxlbnQgPSBzaWxlbnQ7XG5cbiAgLy8gZW5hYmxlIHN0cmljdCBtb2RlIGZvciBuZXcgdm1cbiAgaWYgKHN0b3JlLnN0cmljdCkge1xuICAgIGVuYWJsZVN0cmljdE1vZGUoc3RvcmUpO1xuICB9XG5cbiAgaWYgKG9sZFZtKSB7XG4gICAgaWYgKGhvdCkge1xuICAgICAgLy8gZGlzcGF0Y2ggY2hhbmdlcyBpbiBhbGwgc3Vic2NyaWJlZCB3YXRjaGVyc1xuICAgICAgLy8gdG8gZm9yY2UgZ2V0dGVyIHJlLWV2YWx1YXRpb24gZm9yIGhvdCByZWxvYWRpbmcuXG4gICAgICBzdG9yZS5fd2l0aENvbW1pdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9sZFZtLnN0YXRlID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBWdWUubmV4dFRpY2soZnVuY3Rpb24gKCkgeyByZXR1cm4gb2xkVm0uJGRlc3Ryb3koKTsgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5zdGFsbE1vZHVsZSAoc3RvcmUsIHJvb3RTdGF0ZSwgcGF0aCwgbW9kdWxlLCBob3QpIHtcbiAgdmFyIGlzUm9vdCA9ICFwYXRoLmxlbmd0aDtcbiAgdmFyIG5hbWVzcGFjZSA9IHN0b3JlLl9tb2R1bGVzLmdldE5hbWVzcGFjZShwYXRoKTtcblxuICAvLyByZWdpc3RlciBpbiBuYW1lc3BhY2UgbWFwXG4gIGlmIChuYW1lc3BhY2UpIHtcbiAgICBzdG9yZS5fbW9kdWxlc05hbWVzcGFjZU1hcFtuYW1lc3BhY2VdID0gbW9kdWxlO1xuICB9XG5cbiAgLy8gc2V0IHN0YXRlXG4gIGlmICghaXNSb290ICYmICFob3QpIHtcbiAgICB2YXIgcGFyZW50U3RhdGUgPSBnZXROZXN0ZWRTdGF0ZShyb290U3RhdGUsIHBhdGguc2xpY2UoMCwgLTEpKTtcbiAgICB2YXIgbW9kdWxlTmFtZSA9IHBhdGhbcGF0aC5sZW5ndGggLSAxXTtcbiAgICBzdG9yZS5fd2l0aENvbW1pdChmdW5jdGlvbiAoKSB7XG4gICAgICBWdWUuc2V0KHBhcmVudFN0YXRlLCBtb2R1bGVOYW1lLCBtb2R1bGUuc3RhdGUpO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIGxvY2FsID0gbW9kdWxlLmNvbnRleHQgPSBtYWtlTG9jYWxDb250ZXh0KHN0b3JlLCBuYW1lc3BhY2UsIHBhdGgpO1xuXG4gIG1vZHVsZS5mb3JFYWNoTXV0YXRpb24oZnVuY3Rpb24gKG11dGF0aW9uLCBrZXkpIHtcbiAgICB2YXIgbmFtZXNwYWNlZFR5cGUgPSBuYW1lc3BhY2UgKyBrZXk7XG4gICAgcmVnaXN0ZXJNdXRhdGlvbihzdG9yZSwgbmFtZXNwYWNlZFR5cGUsIG11dGF0aW9uLCBsb2NhbCk7XG4gIH0pO1xuXG4gIG1vZHVsZS5mb3JFYWNoQWN0aW9uKGZ1bmN0aW9uIChhY3Rpb24sIGtleSkge1xuICAgIHZhciBuYW1lc3BhY2VkVHlwZSA9IG5hbWVzcGFjZSArIGtleTtcbiAgICByZWdpc3RlckFjdGlvbihzdG9yZSwgbmFtZXNwYWNlZFR5cGUsIGFjdGlvbiwgbG9jYWwpO1xuICB9KTtcblxuICBtb2R1bGUuZm9yRWFjaEdldHRlcihmdW5jdGlvbiAoZ2V0dGVyLCBrZXkpIHtcbiAgICB2YXIgbmFtZXNwYWNlZFR5cGUgPSBuYW1lc3BhY2UgKyBrZXk7XG4gICAgcmVnaXN0ZXJHZXR0ZXIoc3RvcmUsIG5hbWVzcGFjZWRUeXBlLCBnZXR0ZXIsIGxvY2FsKTtcbiAgfSk7XG5cbiAgbW9kdWxlLmZvckVhY2hDaGlsZChmdW5jdGlvbiAoY2hpbGQsIGtleSkge1xuICAgIGluc3RhbGxNb2R1bGUoc3RvcmUsIHJvb3RTdGF0ZSwgcGF0aC5jb25jYXQoa2V5KSwgY2hpbGQsIGhvdCk7XG4gIH0pO1xufVxuXG4vKipcbiAqIG1ha2UgbG9jYWxpemVkIGRpc3BhdGNoLCBjb21taXQsIGdldHRlcnMgYW5kIHN0YXRlXG4gKiBpZiB0aGVyZSBpcyBubyBuYW1lc3BhY2UsIGp1c3QgdXNlIHJvb3Qgb25lc1xuICovXG5mdW5jdGlvbiBtYWtlTG9jYWxDb250ZXh0IChzdG9yZSwgbmFtZXNwYWNlLCBwYXRoKSB7XG4gIHZhciBub05hbWVzcGFjZSA9IG5hbWVzcGFjZSA9PT0gJyc7XG5cbiAgdmFyIGxvY2FsID0ge1xuICAgIGRpc3BhdGNoOiBub05hbWVzcGFjZSA/IHN0b3JlLmRpc3BhdGNoIDogZnVuY3Rpb24gKF90eXBlLCBfcGF5bG9hZCwgX29wdGlvbnMpIHtcbiAgICAgIHZhciBhcmdzID0gdW5pZnlPYmplY3RTdHlsZShfdHlwZSwgX3BheWxvYWQsIF9vcHRpb25zKTtcbiAgICAgIHZhciBwYXlsb2FkID0gYXJncy5wYXlsb2FkO1xuICAgICAgdmFyIG9wdGlvbnMgPSBhcmdzLm9wdGlvbnM7XG4gICAgICB2YXIgdHlwZSA9IGFyZ3MudHlwZTtcblxuICAgICAgaWYgKCFvcHRpb25zIHx8ICFvcHRpb25zLnJvb3QpIHtcbiAgICAgICAgdHlwZSA9IG5hbWVzcGFjZSArIHR5cGU7XG4gICAgICAgIGlmICghc3RvcmUuX2FjdGlvbnNbdHlwZV0pIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKChcIlt2dWV4XSB1bmtub3duIGxvY2FsIGFjdGlvbiB0eXBlOiBcIiArIChhcmdzLnR5cGUpICsgXCIsIGdsb2JhbCB0eXBlOiBcIiArIHR5cGUpKTtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3RvcmUuZGlzcGF0Y2godHlwZSwgcGF5bG9hZClcbiAgICB9LFxuXG4gICAgY29tbWl0OiBub05hbWVzcGFjZSA/IHN0b3JlLmNvbW1pdCA6IGZ1bmN0aW9uIChfdHlwZSwgX3BheWxvYWQsIF9vcHRpb25zKSB7XG4gICAgICB2YXIgYXJncyA9IHVuaWZ5T2JqZWN0U3R5bGUoX3R5cGUsIF9wYXlsb2FkLCBfb3B0aW9ucyk7XG4gICAgICB2YXIgcGF5bG9hZCA9IGFyZ3MucGF5bG9hZDtcbiAgICAgIHZhciBvcHRpb25zID0gYXJncy5vcHRpb25zO1xuICAgICAgdmFyIHR5cGUgPSBhcmdzLnR5cGU7XG5cbiAgICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5yb290KSB7XG4gICAgICAgIHR5cGUgPSBuYW1lc3BhY2UgKyB0eXBlO1xuICAgICAgICBpZiAoIXN0b3JlLl9tdXRhdGlvbnNbdHlwZV0pIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKChcIlt2dWV4XSB1bmtub3duIGxvY2FsIG11dGF0aW9uIHR5cGU6IFwiICsgKGFyZ3MudHlwZSkgKyBcIiwgZ2xvYmFsIHR5cGU6IFwiICsgdHlwZSkpO1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHN0b3JlLmNvbW1pdCh0eXBlLCBwYXlsb2FkLCBvcHRpb25zKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gZ2V0dGVycyBhbmQgc3RhdGUgb2JqZWN0IG11c3QgYmUgZ290dGVuIGxhemlseVxuICAvLyBiZWNhdXNlIHRoZXkgd2lsbCBiZSBjaGFuZ2VkIGJ5IHZtIHVwZGF0ZVxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhsb2NhbCwge1xuICAgIGdldHRlcnM6IHtcbiAgICAgIGdldDogbm9OYW1lc3BhY2VcbiAgICAgICAgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBzdG9yZS5nZXR0ZXJzOyB9XG4gICAgICAgIDogZnVuY3Rpb24gKCkgeyByZXR1cm4gbWFrZUxvY2FsR2V0dGVycyhzdG9yZSwgbmFtZXNwYWNlKTsgfVxuICAgIH0sXG4gICAgc3RhdGU6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZ2V0TmVzdGVkU3RhdGUoc3RvcmUuc3RhdGUsIHBhdGgpOyB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gbG9jYWxcbn1cblxuZnVuY3Rpb24gbWFrZUxvY2FsR2V0dGVycyAoc3RvcmUsIG5hbWVzcGFjZSkge1xuICB2YXIgZ2V0dGVyc1Byb3h5ID0ge307XG5cbiAgdmFyIHNwbGl0UG9zID0gbmFtZXNwYWNlLmxlbmd0aDtcbiAgT2JqZWN0LmtleXMoc3RvcmUuZ2V0dGVycykuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgIC8vIHNraXAgaWYgdGhlIHRhcmdldCBnZXR0ZXIgaXMgbm90IG1hdGNoIHRoaXMgbmFtZXNwYWNlXG4gICAgaWYgKHR5cGUuc2xpY2UoMCwgc3BsaXRQb3MpICE9PSBuYW1lc3BhY2UpIHsgcmV0dXJuIH1cblxuICAgIC8vIGV4dHJhY3QgbG9jYWwgZ2V0dGVyIHR5cGVcbiAgICB2YXIgbG9jYWxUeXBlID0gdHlwZS5zbGljZShzcGxpdFBvcyk7XG5cbiAgICAvLyBBZGQgYSBwb3J0IHRvIHRoZSBnZXR0ZXJzIHByb3h5LlxuICAgIC8vIERlZmluZSBhcyBnZXR0ZXIgcHJvcGVydHkgYmVjYXVzZVxuICAgIC8vIHdlIGRvIG5vdCB3YW50IHRvIGV2YWx1YXRlIHRoZSBnZXR0ZXJzIGluIHRoaXMgdGltZS5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZ2V0dGVyc1Byb3h5LCBsb2NhbFR5cGUsIHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc3RvcmUuZ2V0dGVyc1t0eXBlXTsgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGdldHRlcnNQcm94eVxufVxuXG5mdW5jdGlvbiByZWdpc3Rlck11dGF0aW9uIChzdG9yZSwgdHlwZSwgaGFuZGxlciwgbG9jYWwpIHtcbiAgdmFyIGVudHJ5ID0gc3RvcmUuX211dGF0aW9uc1t0eXBlXSB8fCAoc3RvcmUuX211dGF0aW9uc1t0eXBlXSA9IFtdKTtcbiAgZW50cnkucHVzaChmdW5jdGlvbiB3cmFwcGVkTXV0YXRpb25IYW5kbGVyIChwYXlsb2FkKSB7XG4gICAgaGFuZGxlcihsb2NhbC5zdGF0ZSwgcGF5bG9hZCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZWdpc3RlckFjdGlvbiAoc3RvcmUsIHR5cGUsIGhhbmRsZXIsIGxvY2FsKSB7XG4gIHZhciBlbnRyeSA9IHN0b3JlLl9hY3Rpb25zW3R5cGVdIHx8IChzdG9yZS5fYWN0aW9uc1t0eXBlXSA9IFtdKTtcbiAgZW50cnkucHVzaChmdW5jdGlvbiB3cmFwcGVkQWN0aW9uSGFuZGxlciAocGF5bG9hZCwgY2IpIHtcbiAgICB2YXIgcmVzID0gaGFuZGxlcih7XG4gICAgICBkaXNwYXRjaDogbG9jYWwuZGlzcGF0Y2gsXG4gICAgICBjb21taXQ6IGxvY2FsLmNvbW1pdCxcbiAgICAgIGdldHRlcnM6IGxvY2FsLmdldHRlcnMsXG4gICAgICBzdGF0ZTogbG9jYWwuc3RhdGUsXG4gICAgICByb290R2V0dGVyczogc3RvcmUuZ2V0dGVycyxcbiAgICAgIHJvb3RTdGF0ZTogc3RvcmUuc3RhdGVcbiAgICB9LCBwYXlsb2FkLCBjYik7XG4gICAgaWYgKCFpc1Byb21pc2UocmVzKSkge1xuICAgICAgcmVzID0gUHJvbWlzZS5yZXNvbHZlKHJlcyk7XG4gICAgfVxuICAgIGlmIChzdG9yZS5fZGV2dG9vbEhvb2spIHtcbiAgICAgIHJldHVybiByZXMuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICBzdG9yZS5fZGV2dG9vbEhvb2suZW1pdCgndnVleDplcnJvcicsIGVycik7XG4gICAgICAgIHRocm93IGVyclxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyR2V0dGVyIChzdG9yZSwgdHlwZSwgcmF3R2V0dGVyLCBsb2NhbCkge1xuICBpZiAoc3RvcmUuX3dyYXBwZWRHZXR0ZXJzW3R5cGVdKSB7XG4gICAgY29uc29sZS5lcnJvcigoXCJbdnVleF0gZHVwbGljYXRlIGdldHRlciBrZXk6IFwiICsgdHlwZSkpO1xuICAgIHJldHVyblxuICB9XG4gIHN0b3JlLl93cmFwcGVkR2V0dGVyc1t0eXBlXSA9IGZ1bmN0aW9uIHdyYXBwZWRHZXR0ZXIgKHN0b3JlKSB7XG4gICAgcmV0dXJuIHJhd0dldHRlcihcbiAgICAgIGxvY2FsLnN0YXRlLCAvLyBsb2NhbCBzdGF0ZVxuICAgICAgbG9jYWwuZ2V0dGVycywgLy8gbG9jYWwgZ2V0dGVyc1xuICAgICAgc3RvcmUuc3RhdGUsIC8vIHJvb3Qgc3RhdGVcbiAgICAgIHN0b3JlLmdldHRlcnMgLy8gcm9vdCBnZXR0ZXJzXG4gICAgKVxuICB9O1xufVxuXG5mdW5jdGlvbiBlbmFibGVTdHJpY3RNb2RlIChzdG9yZSkge1xuICBzdG9yZS5fdm0uJHdhdGNoKCdzdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBhc3NlcnQoc3RvcmUuX2NvbW1pdHRpbmcsIFwiRG8gbm90IG11dGF0ZSB2dWV4IHN0b3JlIHN0YXRlIG91dHNpZGUgbXV0YXRpb24gaGFuZGxlcnMuXCIpO1xuICB9LCB7IGRlZXA6IHRydWUsIHN5bmM6IHRydWUgfSk7XG59XG5cbmZ1bmN0aW9uIGdldE5lc3RlZFN0YXRlIChzdGF0ZSwgcGF0aCkge1xuICByZXR1cm4gcGF0aC5sZW5ndGhcbiAgICA/IHBhdGgucmVkdWNlKGZ1bmN0aW9uIChzdGF0ZSwga2V5KSB7IHJldHVybiBzdGF0ZVtrZXldOyB9LCBzdGF0ZSlcbiAgICA6IHN0YXRlXG59XG5cbmZ1bmN0aW9uIHVuaWZ5T2JqZWN0U3R5bGUgKHR5cGUsIHBheWxvYWQsIG9wdGlvbnMpIHtcbiAgaWYgKGlzT2JqZWN0KHR5cGUpICYmIHR5cGUudHlwZSkge1xuICAgIG9wdGlvbnMgPSBwYXlsb2FkO1xuICAgIHBheWxvYWQgPSB0eXBlO1xuICAgIHR5cGUgPSB0eXBlLnR5cGU7XG4gIH1cblxuICBhc3NlcnQodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnLCAoXCJFeHBlY3RzIHN0cmluZyBhcyB0aGUgdHlwZSwgYnV0IGZvdW5kIFwiICsgKHR5cGVvZiB0eXBlKSArIFwiLlwiKSk7XG5cbiAgcmV0dXJuIHsgdHlwZTogdHlwZSwgcGF5bG9hZDogcGF5bG9hZCwgb3B0aW9uczogb3B0aW9ucyB9XG59XG5cbmZ1bmN0aW9uIGluc3RhbGwgKF9WdWUpIHtcbiAgaWYgKFZ1ZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAnW3Z1ZXhdIGFscmVhZHkgaW5zdGFsbGVkLiBWdWUudXNlKFZ1ZXgpIHNob3VsZCBiZSBjYWxsZWQgb25seSBvbmNlLidcbiAgICApO1xuICAgIHJldHVyblxuICB9XG4gIFZ1ZSA9IF9WdWU7XG4gIGFwcGx5TWl4aW4oVnVlKTtcbn1cblxuLy8gYXV0byBpbnN0YWxsIGluIGRpc3QgbW9kZVxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5WdWUpIHtcbiAgaW5zdGFsbCh3aW5kb3cuVnVlKTtcbn1cblxudmFyIGluZGV4ID0ge1xuICBTdG9yZTogU3RvcmUsXG4gIGluc3RhbGw6IGluc3RhbGwsXG4gIHZlcnNpb246ICcyLjEuMicsXG4gIG1hcFN0YXRlOiBtYXBTdGF0ZSxcbiAgbWFwTXV0YXRpb25zOiBtYXBNdXRhdGlvbnMsXG4gIG1hcEdldHRlcnM6IG1hcEdldHRlcnMsXG4gIG1hcEFjdGlvbnM6IG1hcEFjdGlvbnNcbn07XG5cbnJldHVybiBpbmRleDtcblxufSkpKTtcbiIsIi8vaW1wb3J0IHN0b3JlIGZyb20gJy4uL2luZGV4LmpzJztcclxuXHJcbmNvbnN0IHN0YXRlID0ge1xyXG4gICAgY2hhcmFjdGVyOiBHTE9CQUxfQ09ORklHLmNoYXJhY3RlcixcclxuICAgIGlzQWRtaW46IEdMT0JBTF9DT05GSUcuY2hhcmFjdGVyID09PSAnYWRtaW4nLFxyXG4gICAgdGVzdDogJzExMTExMTEnLFxyXG4gICAgdGVzdDE6ICfmiJHmmK8gdGVzdDEnXHJcbn07XHJcblxyXG5jb25zdCBtdXRhdGlvbnMgPSB7XHJcbiAgICBFRElUX1RFU1Q6ICggc3RhdGUpID0+IHtcclxuICAgICBcdHN0YXRlLnRlc3QgPSAnMjM0MjQyMjQyMzQzJztcclxuICAgIH0sXHJcbiAgICBFRElUX1RFU1QxOiAoc3RhdGUpID0+IHtcclxuICAgIFx0c3RhdGUudGVzdDEgPSAn5oiR5pivdGVzdDEnO1xyXG4gICAgfVxyXG59O1xyXG5cclxuY29uc3QgYWN0aW9ucyA9IHtcclxuICAgIEVESVRfVEVTVDogKHN0b3JlKT0+e1xyXG4gICAgXHRzdG9yZS5jb21taXQoICdFRElUX1RFU1QnKTtcclxuICAgIH0sXHJcbiAgICBFRElUX1RFU1QxOiAoc3RvcmUpID0+IHtcclxuICAgIFx0c3RvcmUuY29tbWl0KCdFRElUX1RFU1QxJyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBpbml0TW9kdWxlID0ge1xyXG4gICAgc3RhdGUsXHJcbiAgICBtdXRhdGlvbnMsXHJcbiAgICBhY3Rpb25zXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IGluaXRNb2R1bGU7IiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xyXG5pbXBvcnQgVnVleCBmcm9tICd2dWV4JztcclxuaW1wb3J0IGluaXRNb2R1bGUgZnJvbSAnLi9tb2R1bGVzL2luaXRNb2R1bGUnO1xyXG5WdWUudXNlKFZ1ZXgpO1xyXG5leHBvcnQgZGVmYXVsdCBuZXcgVnVleC5TdG9yZSh7XHJcblx0bW9kdWxlczp7XHJcblx0XHRpbml0TW9kdWxlOiBpbml0TW9kdWxlXHJcblx0fVxyXG59KTsiLCI8dGVtcGxhdGU+IFxyXG4gICAgPGRpdiBjbGFzcz1cImdlci1tZW51XCI+XHJcbiAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICA8bGkgdi1pZj1cImlzQWRtaW5cIj5cclxuICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi9pbmRleFwiIGFjdGl2ZS1jbGFzcz1cImFjdGl2ZVwiPua3u+WKoOWIl+ihqDwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi9yZXBvcnRcIiAgYWN0aXZlLWNsYXNzPVwiYWN0aXZlXCI+6ZSZ6K+v5YiX6KGoPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+IFxyXG48c2NyaXB0PiBcclxuXHJcbmltcG9ydCBzdG9yZSBmcm9tICcuLi8uLi9zdG9yZSc7XHJcbmltcG9ydCB2dWV4IGZyb20gJ3Z1ZXgnO1xyXG5jb25zdCBtYXBTdGF0ZSA9IHZ1ZXgubWFwU3RhdGU7XHJcbmNvbnN0IG1hcEFjdGlvbnMgPSB2dWV4Lm1hcEFjdGlvbnM7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICBjb21wdXRlZDoge1xyXG4gICAgICAgIC4uLm1hcFN0YXRlKHtcclxuICAgICAgICAgICAgaXNBZG1pbjpzdGF0ZSA9PnN0b3JlLnN0YXRlLmluaXRNb2R1bGUuaXNBZG1pblxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgIFxyXG59XHJcbjwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT4gXHJcbiAgIFx0PGRpdiBjbGFzcz1cImdlci1jb3RlbnRcIj5cclxuICBcdFx0PHJvdXRlci12aWV3Pjwvcm91dGVyLXZpZXc+XHJcbiAgIFx0PC9kaXY+XHJcbjwvdGVtcGxhdGU+IiwiPHRlbXBsYXRlPlxyXG4gICAgPGRpdiBjbGFzcz1cImdlci1ib2R5XCI+XHJcbiAgICAgICAgPHRvcEJveD48L3RvcEJveD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZ2VyLW1pZGRsZVwiPlxyXG4gICAgICAgICAgIDxsZWZ0TWVudT48L2xlZnRNZW51PlxyXG4gICAgICAgICAgIDxyaWdodGNvbnRlbnQ+PC9yaWdodGNvbnRlbnQ+ICAgXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgPCEtLSA8ZGl2PlxyXG4gXHJcbiAgPHA+XHJcbiAgICA8cm91dGVyLWxpbmsgdG89XCIvdXNlclwiPi91c2VyL2Zvbzwvcm91dGVyLWxpbms+XHJcbiAgICA8cm91dGVyLWxpbmsgdG89XCIvZXJyb3JcIj4vdXNlci9iYXI8L3JvdXRlci1saW5rPlxyXG4gIDwvcD5cclxuICA8cm91dGVyLXZpZXc+PC9yb3V0ZXItdmlldz5cclxuICA8L2Rpdj4gLS0+XHJcbjwvdGVtcGxhdGU+XHJcbjxzY3JpcHQ+IFxyXG5cclxuaW1wb3J0IHRvcEJveCBmcm9tICcuL3BhZ2VzL3B1YmxpYy9oZWFkZXIudnVlJztcclxuaW1wb3J0IGxlZnRNZW51IGZyb20gJy4vcGFnZXMvcHVibGljL21lbnUudnVlJztcclxuaW1wb3J0IHJpZ2h0Y29udGVudCBmcm9tICcuL3BhZ2VzL3B1YmxpYy9jb250ZW50LnZ1ZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgY29tcG9uZW50czoge1xyXG4gICAgdG9wQm94LFxyXG4gICAgbGVmdE1lbnUsXHJcbiAgICByaWdodGNvbnRlbnRcclxuICB9XHJcbn1cclxuPC9zY3JpcHQ+IiwiLyoqXG4gICogdnVlLXJvdXRlciB2Mi4yLjFcbiAgKiAoYykgMjAxNyBFdmFuIFlvdVxuICAqIEBsaWNlbnNlIE1JVFxuICAqL1xuJ3VzZSBzdHJpY3QnO1xuXG4vKiAgKi9cblxuZnVuY3Rpb24gYXNzZXJ0IChjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoKFwiW3Z1ZS1yb3V0ZXJdIFwiICsgbWVzc2FnZSkpXG4gIH1cbn1cblxuZnVuY3Rpb24gd2FybiAoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGUud2FybigoXCJbdnVlLXJvdXRlcl0gXCIgKyBtZXNzYWdlKSk7XG4gIH1cbn1cblxudmFyIFZpZXcgPSB7XG4gIG5hbWU6ICdyb3V0ZXItdmlldycsXG4gIGZ1bmN0aW9uYWw6IHRydWUsXG4gIHByb3BzOiB7XG4gICAgbmFtZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2RlZmF1bHQnXG4gICAgfVxuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlciAoaCwgcmVmKSB7XG4gICAgdmFyIHByb3BzID0gcmVmLnByb3BzO1xuICAgIHZhciBjaGlsZHJlbiA9IHJlZi5jaGlsZHJlbjtcbiAgICB2YXIgcGFyZW50ID0gcmVmLnBhcmVudDtcbiAgICB2YXIgZGF0YSA9IHJlZi5kYXRhO1xuXG4gICAgZGF0YS5yb3V0ZXJWaWV3ID0gdHJ1ZTtcblxuICAgIHZhciBuYW1lID0gcHJvcHMubmFtZTtcbiAgICB2YXIgcm91dGUgPSBwYXJlbnQuJHJvdXRlO1xuICAgIHZhciBjYWNoZSA9IHBhcmVudC5fcm91dGVyVmlld0NhY2hlIHx8IChwYXJlbnQuX3JvdXRlclZpZXdDYWNoZSA9IHt9KTtcblxuICAgIC8vIGRldGVybWluZSBjdXJyZW50IHZpZXcgZGVwdGgsIGFsc28gY2hlY2sgdG8gc2VlIGlmIHRoZSB0cmVlXG4gICAgLy8gaGFzIGJlZW4gdG9nZ2xlZCBpbmFjdGl2ZSBidXQga2VwdC1hbGl2ZS5cbiAgICB2YXIgZGVwdGggPSAwO1xuICAgIHZhciBpbmFjdGl2ZSA9IGZhbHNlO1xuICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgIGlmIChwYXJlbnQuJHZub2RlICYmIHBhcmVudC4kdm5vZGUuZGF0YS5yb3V0ZXJWaWV3KSB7XG4gICAgICAgIGRlcHRoKys7XG4gICAgICB9XG4gICAgICBpZiAocGFyZW50Ll9pbmFjdGl2ZSkge1xuICAgICAgICBpbmFjdGl2ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBwYXJlbnQgPSBwYXJlbnQuJHBhcmVudDtcbiAgICB9XG4gICAgZGF0YS5yb3V0ZXJWaWV3RGVwdGggPSBkZXB0aDtcblxuICAgIC8vIHJlbmRlciBwcmV2aW91cyB2aWV3IGlmIHRoZSB0cmVlIGlzIGluYWN0aXZlIGFuZCBrZXB0LWFsaXZlXG4gICAgaWYgKGluYWN0aXZlKSB7XG4gICAgICByZXR1cm4gaChjYWNoZVtuYW1lXSwgZGF0YSwgY2hpbGRyZW4pXG4gICAgfVxuXG4gICAgdmFyIG1hdGNoZWQgPSByb3V0ZS5tYXRjaGVkW2RlcHRoXTtcbiAgICAvLyByZW5kZXIgZW1wdHkgbm9kZSBpZiBubyBtYXRjaGVkIHJvdXRlXG4gICAgaWYgKCFtYXRjaGVkKSB7XG4gICAgICBjYWNoZVtuYW1lXSA9IG51bGw7XG4gICAgICByZXR1cm4gaCgpXG4gICAgfVxuXG4gICAgdmFyIGNvbXBvbmVudCA9IGNhY2hlW25hbWVdID0gbWF0Y2hlZC5jb21wb25lbnRzW25hbWVdO1xuXG4gICAgLy8gaW5qZWN0IGluc3RhbmNlIHJlZ2lzdHJhdGlvbiBob29rc1xuICAgIHZhciBob29rcyA9IGRhdGEuaG9vayB8fCAoZGF0YS5ob29rID0ge30pO1xuICAgIGhvb2tzLmluaXQgPSBmdW5jdGlvbiAodm5vZGUpIHtcbiAgICAgIG1hdGNoZWQuaW5zdGFuY2VzW25hbWVdID0gdm5vZGUuY2hpbGQ7XG4gICAgfTtcbiAgICBob29rcy5wcmVwYXRjaCA9IGZ1bmN0aW9uIChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICAgIG1hdGNoZWQuaW5zdGFuY2VzW25hbWVdID0gdm5vZGUuY2hpbGQ7XG4gICAgfTtcbiAgICBob29rcy5kZXN0cm95ID0gZnVuY3Rpb24gKHZub2RlKSB7XG4gICAgICBpZiAobWF0Y2hlZC5pbnN0YW5jZXNbbmFtZV0gPT09IHZub2RlLmNoaWxkKSB7XG4gICAgICAgIG1hdGNoZWQuaW5zdGFuY2VzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyByZXNvbHZlIHByb3BzXG4gICAgZGF0YS5wcm9wcyA9IHJlc29sdmVQcm9wcyhyb3V0ZSwgbWF0Y2hlZC5wcm9wcyAmJiBtYXRjaGVkLnByb3BzW25hbWVdKTtcblxuICAgIHJldHVybiBoKGNvbXBvbmVudCwgZGF0YSwgY2hpbGRyZW4pXG4gIH1cbn07XG5cbmZ1bmN0aW9uIHJlc29sdmVQcm9wcyAocm91dGUsIGNvbmZpZykge1xuICBzd2l0Y2ggKHR5cGVvZiBjb25maWcpIHtcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgcmV0dXJuXG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIHJldHVybiBjb25maWdcbiAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICByZXR1cm4gY29uZmlnKHJvdXRlKVxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIGNvbmZpZyA/IHJvdXRlLnBhcmFtcyA6IHVuZGVmaW5lZFxuICAgIGRlZmF1bHQ6XG4gICAgICB3YXJuKGZhbHNlLCAoXCJwcm9wcyBpbiBcXFwiXCIgKyAocm91dGUucGF0aCkgKyBcIlxcXCIgaXMgYSBcIiArICh0eXBlb2YgY29uZmlnKSArIFwiLCBleHBlY3RpbmcgYW4gb2JqZWN0LCBmdW5jdGlvbiBvciBib29sZWFuLlwiKSk7XG4gIH1cbn1cblxuLyogICovXG5cbnZhciBlbmNvZGVSZXNlcnZlUkUgPSAvWyEnKCkqXS9nO1xudmFyIGVuY29kZVJlc2VydmVSZXBsYWNlciA9IGZ1bmN0aW9uIChjKSB7IHJldHVybiAnJScgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpOyB9O1xudmFyIGNvbW1hUkUgPSAvJTJDL2c7XG5cbi8vIGZpeGVkIGVuY29kZVVSSUNvbXBvbmVudCB3aGljaCBpcyBtb3JlIGNvbWZvcm1hbnQgdG8gUkZDMzk4Njpcbi8vIC0gZXNjYXBlcyBbIScoKSpdXG4vLyAtIHByZXNlcnZlIGNvbW1hc1xudmFyIGVuY29kZSA9IGZ1bmN0aW9uIChzdHIpIHsgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpXG4gIC5yZXBsYWNlKGVuY29kZVJlc2VydmVSRSwgZW5jb2RlUmVzZXJ2ZVJlcGxhY2VyKVxuICAucmVwbGFjZShjb21tYVJFLCAnLCcpOyB9O1xuXG52YXIgZGVjb2RlID0gZGVjb2RlVVJJQ29tcG9uZW50O1xuXG5mdW5jdGlvbiByZXNvbHZlUXVlcnkgKFxuICBxdWVyeSxcbiAgZXh0cmFRdWVyeVxuKSB7XG4gIGlmICggZXh0cmFRdWVyeSA9PT0gdm9pZCAwICkgZXh0cmFRdWVyeSA9IHt9O1xuXG4gIGlmIChxdWVyeSkge1xuICAgIHZhciBwYXJzZWRRdWVyeTtcbiAgICB0cnkge1xuICAgICAgcGFyc2VkUXVlcnkgPSBwYXJzZVF1ZXJ5KHF1ZXJ5KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oZmFsc2UsIGUubWVzc2FnZSk7XG4gICAgICBwYXJzZWRRdWVyeSA9IHt9O1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gZXh0cmFRdWVyeSkge1xuICAgICAgcGFyc2VkUXVlcnlba2V5XSA9IGV4dHJhUXVlcnlba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlZFF1ZXJ5XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGV4dHJhUXVlcnlcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZVF1ZXJ5IChxdWVyeSkge1xuICB2YXIgcmVzID0ge307XG5cbiAgcXVlcnkgPSBxdWVyeS50cmltKCkucmVwbGFjZSgvXihcXD98I3wmKS8sICcnKTtcblxuICBpZiAoIXF1ZXJ5KSB7XG4gICAgcmV0dXJuIHJlc1xuICB9XG5cbiAgcXVlcnkuc3BsaXQoJyYnKS5mb3JFYWNoKGZ1bmN0aW9uIChwYXJhbSkge1xuICAgIHZhciBwYXJ0cyA9IHBhcmFtLnJlcGxhY2UoL1xcKy9nLCAnICcpLnNwbGl0KCc9Jyk7XG4gICAgdmFyIGtleSA9IGRlY29kZShwYXJ0cy5zaGlmdCgpKTtcbiAgICB2YXIgdmFsID0gcGFydHMubGVuZ3RoID4gMFxuICAgICAgPyBkZWNvZGUocGFydHMuam9pbignPScpKVxuICAgICAgOiBudWxsO1xuXG4gICAgaWYgKHJlc1trZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlc1trZXldID0gdmFsO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXNba2V5XSkpIHtcbiAgICAgIHJlc1trZXldLnB1c2godmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzW2tleV0gPSBbcmVzW2tleV0sIHZhbF07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeVF1ZXJ5IChvYmopIHtcbiAgdmFyIHJlcyA9IG9iaiA/IE9iamVjdC5rZXlzKG9iaikubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgdmFsID0gb2JqW2tleV07XG5cbiAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cblxuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBlbmNvZGUoa2V5KVxuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgIHZhbC5zbGljZSgpLmZvckVhY2goZnVuY3Rpb24gKHZhbDIpIHtcbiAgICAgICAgaWYgKHZhbDIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmICh2YWwyID09PSBudWxsKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goZW5jb2RlKGtleSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHZhbDIpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJyYnKVxuICAgIH1cblxuICAgIHJldHVybiBlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2YWwpXG4gIH0pLmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPiAwOyB9KS5qb2luKCcmJykgOiBudWxsO1xuICByZXR1cm4gcmVzID8gKFwiP1wiICsgcmVzKSA6ICcnXG59XG5cbi8qICAqL1xuXG52YXIgdHJhaWxpbmdTbGFzaFJFID0gL1xcLz8kLztcblxuZnVuY3Rpb24gY3JlYXRlUm91dGUgKFxuICByZWNvcmQsXG4gIGxvY2F0aW9uLFxuICByZWRpcmVjdGVkRnJvbVxuKSB7XG4gIHZhciByb3V0ZSA9IHtcbiAgICBuYW1lOiBsb2NhdGlvbi5uYW1lIHx8IChyZWNvcmQgJiYgcmVjb3JkLm5hbWUpLFxuICAgIG1ldGE6IChyZWNvcmQgJiYgcmVjb3JkLm1ldGEpIHx8IHt9LFxuICAgIHBhdGg6IGxvY2F0aW9uLnBhdGggfHwgJy8nLFxuICAgIGhhc2g6IGxvY2F0aW9uLmhhc2ggfHwgJycsXG4gICAgcXVlcnk6IGxvY2F0aW9uLnF1ZXJ5IHx8IHt9LFxuICAgIHBhcmFtczogbG9jYXRpb24ucGFyYW1zIHx8IHt9LFxuICAgIGZ1bGxQYXRoOiBnZXRGdWxsUGF0aChsb2NhdGlvbiksXG4gICAgbWF0Y2hlZDogcmVjb3JkID8gZm9ybWF0TWF0Y2gocmVjb3JkKSA6IFtdXG4gIH07XG4gIGlmIChyZWRpcmVjdGVkRnJvbSkge1xuICAgIHJvdXRlLnJlZGlyZWN0ZWRGcm9tID0gZ2V0RnVsbFBhdGgocmVkaXJlY3RlZEZyb20pO1xuICB9XG4gIHJldHVybiBPYmplY3QuZnJlZXplKHJvdXRlKVxufVxuXG4vLyB0aGUgc3RhcnRpbmcgcm91dGUgdGhhdCByZXByZXNlbnRzIHRoZSBpbml0aWFsIHN0YXRlXG52YXIgU1RBUlQgPSBjcmVhdGVSb3V0ZShudWxsLCB7XG4gIHBhdGg6ICcvJ1xufSk7XG5cbmZ1bmN0aW9uIGZvcm1hdE1hdGNoIChyZWNvcmQpIHtcbiAgdmFyIHJlcyA9IFtdO1xuICB3aGlsZSAocmVjb3JkKSB7XG4gICAgcmVzLnVuc2hpZnQocmVjb3JkKTtcbiAgICByZWNvcmQgPSByZWNvcmQucGFyZW50O1xuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gZ2V0RnVsbFBhdGggKHJlZikge1xuICB2YXIgcGF0aCA9IHJlZi5wYXRoO1xuICB2YXIgcXVlcnkgPSByZWYucXVlcnk7IGlmICggcXVlcnkgPT09IHZvaWQgMCApIHF1ZXJ5ID0ge307XG4gIHZhciBoYXNoID0gcmVmLmhhc2g7IGlmICggaGFzaCA9PT0gdm9pZCAwICkgaGFzaCA9ICcnO1xuXG4gIHJldHVybiAocGF0aCB8fCAnLycpICsgc3RyaW5naWZ5UXVlcnkocXVlcnkpICsgaGFzaFxufVxuXG5mdW5jdGlvbiBpc1NhbWVSb3V0ZSAoYSwgYikge1xuICBpZiAoYiA9PT0gU1RBUlQpIHtcbiAgICByZXR1cm4gYSA9PT0gYlxuICB9IGVsc2UgaWYgKCFiKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH0gZWxzZSBpZiAoYS5wYXRoICYmIGIucGF0aCkge1xuICAgIHJldHVybiAoXG4gICAgICBhLnBhdGgucmVwbGFjZSh0cmFpbGluZ1NsYXNoUkUsICcnKSA9PT0gYi5wYXRoLnJlcGxhY2UodHJhaWxpbmdTbGFzaFJFLCAnJykgJiZcbiAgICAgIGEuaGFzaCA9PT0gYi5oYXNoICYmXG4gICAgICBpc09iamVjdEVxdWFsKGEucXVlcnksIGIucXVlcnkpXG4gICAgKVxuICB9IGVsc2UgaWYgKGEubmFtZSAmJiBiLm5hbWUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgYS5uYW1lID09PSBiLm5hbWUgJiZcbiAgICAgIGEuaGFzaCA9PT0gYi5oYXNoICYmXG4gICAgICBpc09iamVjdEVxdWFsKGEucXVlcnksIGIucXVlcnkpICYmXG4gICAgICBpc09iamVjdEVxdWFsKGEucGFyYW1zLCBiLnBhcmFtcylcbiAgICApXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24gaXNPYmplY3RFcXVhbCAoYSwgYikge1xuICBpZiAoIGEgPT09IHZvaWQgMCApIGEgPSB7fTtcbiAgaWYgKCBiID09PSB2b2lkIDAgKSBiID0ge307XG5cbiAgdmFyIGFLZXlzID0gT2JqZWN0LmtleXMoYSk7XG4gIHZhciBiS2V5cyA9IE9iamVjdC5rZXlzKGIpO1xuICBpZiAoYUtleXMubGVuZ3RoICE9PSBiS2V5cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gYUtleXMuZXZlcnkoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gU3RyaW5nKGFba2V5XSkgPT09IFN0cmluZyhiW2tleV0pOyB9KVxufVxuXG5mdW5jdGlvbiBpc0luY2x1ZGVkUm91dGUgKGN1cnJlbnQsIHRhcmdldCkge1xuICByZXR1cm4gKFxuICAgIGN1cnJlbnQucGF0aC5yZXBsYWNlKHRyYWlsaW5nU2xhc2hSRSwgJy8nKS5pbmRleE9mKFxuICAgICAgdGFyZ2V0LnBhdGgucmVwbGFjZSh0cmFpbGluZ1NsYXNoUkUsICcvJylcbiAgICApID09PSAwICYmXG4gICAgKCF0YXJnZXQuaGFzaCB8fCBjdXJyZW50Lmhhc2ggPT09IHRhcmdldC5oYXNoKSAmJlxuICAgIHF1ZXJ5SW5jbHVkZXMoY3VycmVudC5xdWVyeSwgdGFyZ2V0LnF1ZXJ5KVxuICApXG59XG5cbmZ1bmN0aW9uIHF1ZXJ5SW5jbHVkZXMgKGN1cnJlbnQsIHRhcmdldCkge1xuICBmb3IgKHZhciBrZXkgaW4gdGFyZ2V0KSB7XG4gICAgaWYgKCEoa2V5IGluIGN1cnJlbnQpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuLyogICovXG5cbi8vIHdvcmsgYXJvdW5kIHdlaXJkIGZsb3cgYnVnXG52YXIgdG9UeXBlcyA9IFtTdHJpbmcsIE9iamVjdF07XG52YXIgZXZlbnRUeXBlcyA9IFtTdHJpbmcsIEFycmF5XTtcblxudmFyIExpbmsgPSB7XG4gIG5hbWU6ICdyb3V0ZXItbGluaycsXG4gIHByb3BzOiB7XG4gICAgdG86IHtcbiAgICAgIHR5cGU6IHRvVHlwZXMsXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnYSdcbiAgICB9LFxuICAgIGV4YWN0OiBCb29sZWFuLFxuICAgIGFwcGVuZDogQm9vbGVhbixcbiAgICByZXBsYWNlOiBCb29sZWFuLFxuICAgIGFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gICAgZXZlbnQ6IHtcbiAgICAgIHR5cGU6IGV2ZW50VHlwZXMsXG4gICAgICBkZWZhdWx0OiAnY2xpY2snXG4gICAgfVxuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlciAoaCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIHJvdXRlciA9IHRoaXMuJHJvdXRlcjtcbiAgICB2YXIgY3VycmVudCA9IHRoaXMuJHJvdXRlO1xuICAgIHZhciByZWYgPSByb3V0ZXIucmVzb2x2ZSh0aGlzLnRvLCBjdXJyZW50LCB0aGlzLmFwcGVuZCk7XG4gICAgdmFyIGxvY2F0aW9uID0gcmVmLmxvY2F0aW9uO1xuICAgIHZhciByb3V0ZSA9IHJlZi5yb3V0ZTtcbiAgICB2YXIgaHJlZiA9IHJlZi5ocmVmO1xuICAgIHZhciBjbGFzc2VzID0ge307XG4gICAgdmFyIGFjdGl2ZUNsYXNzID0gdGhpcy5hY3RpdmVDbGFzcyB8fCByb3V0ZXIub3B0aW9ucy5saW5rQWN0aXZlQ2xhc3MgfHwgJ3JvdXRlci1saW5rLWFjdGl2ZSc7XG4gICAgdmFyIGNvbXBhcmVUYXJnZXQgPSBsb2NhdGlvbi5wYXRoID8gY3JlYXRlUm91dGUobnVsbCwgbG9jYXRpb24pIDogcm91dGU7XG4gICAgY2xhc3Nlc1thY3RpdmVDbGFzc10gPSB0aGlzLmV4YWN0XG4gICAgICA/IGlzU2FtZVJvdXRlKGN1cnJlbnQsIGNvbXBhcmVUYXJnZXQpXG4gICAgICA6IGlzSW5jbHVkZWRSb3V0ZShjdXJyZW50LCBjb21wYXJlVGFyZ2V0KTtcblxuICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChndWFyZEV2ZW50KGUpKSB7XG4gICAgICAgIGlmICh0aGlzJDEucmVwbGFjZSkge1xuICAgICAgICAgIHJvdXRlci5yZXBsYWNlKGxvY2F0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByb3V0ZXIucHVzaChsb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIG9uID0geyBjbGljazogZ3VhcmRFdmVudCB9O1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuZXZlbnQpKSB7XG4gICAgICB0aGlzLmV2ZW50LmZvckVhY2goZnVuY3Rpb24gKGUpIHsgb25bZV0gPSBoYW5kbGVyOyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb25bdGhpcy5ldmVudF0gPSBoYW5kbGVyO1xuICAgIH1cblxuICAgIHZhciBkYXRhID0ge1xuICAgICAgY2xhc3M6IGNsYXNzZXNcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMudGFnID09PSAnYScpIHtcbiAgICAgIGRhdGEub24gPSBvbjtcbiAgICAgIGRhdGEuYXR0cnMgPSB7IGhyZWY6IGhyZWYgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZmluZCB0aGUgZmlyc3QgPGE+IGNoaWxkIGFuZCBhcHBseSBsaXN0ZW5lciBhbmQgaHJlZlxuICAgICAgdmFyIGEgPSBmaW5kQW5jaG9yKHRoaXMuJHNsb3RzLmRlZmF1bHQpO1xuICAgICAgaWYgKGEpIHtcbiAgICAgICAgLy8gaW4gY2FzZSB0aGUgPGE+IGlzIGEgc3RhdGljIG5vZGVcbiAgICAgICAgYS5pc1N0YXRpYyA9IGZhbHNlO1xuICAgICAgICB2YXIgZXh0ZW5kID0gX1Z1ZS51dGlsLmV4dGVuZDtcbiAgICAgICAgdmFyIGFEYXRhID0gYS5kYXRhID0gZXh0ZW5kKHt9LCBhLmRhdGEpO1xuICAgICAgICBhRGF0YS5vbiA9IG9uO1xuICAgICAgICB2YXIgYUF0dHJzID0gYS5kYXRhLmF0dHJzID0gZXh0ZW5kKHt9LCBhLmRhdGEuYXR0cnMpO1xuICAgICAgICBhQXR0cnMuaHJlZiA9IGhyZWY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBkb2Vzbid0IGhhdmUgPGE+IGNoaWxkLCBhcHBseSBsaXN0ZW5lciB0byBzZWxmXG4gICAgICAgIGRhdGEub24gPSBvbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaCh0aGlzLnRhZywgZGF0YSwgdGhpcy4kc2xvdHMuZGVmYXVsdClcbiAgfVxufTtcblxuZnVuY3Rpb24gZ3VhcmRFdmVudCAoZSkge1xuICAvLyBkb24ndCByZWRpcmVjdCB3aXRoIGNvbnRyb2wga2V5c1xuICBpZiAoZS5tZXRhS2V5IHx8IGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5KSB7IHJldHVybiB9XG4gIC8vIGRvbid0IHJlZGlyZWN0IHdoZW4gcHJldmVudERlZmF1bHQgY2FsbGVkXG4gIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQpIHsgcmV0dXJuIH1cbiAgLy8gZG9uJ3QgcmVkaXJlY3Qgb24gcmlnaHQgY2xpY2tcbiAgaWYgKGUuYnV0dG9uICE9PSB1bmRlZmluZWQgJiYgZS5idXR0b24gIT09IDApIHsgcmV0dXJuIH1cbiAgLy8gZG9uJ3QgcmVkaXJlY3QgaWYgYHRhcmdldD1cIl9ibGFua1wiYFxuICBpZiAoZS50YXJnZXQgJiYgZS50YXJnZXQuZ2V0QXR0cmlidXRlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgndGFyZ2V0Jyk7XG4gICAgaWYgKC9cXGJfYmxhbmtcXGIvaS50ZXN0KHRhcmdldCkpIHsgcmV0dXJuIH1cbiAgfVxuICAvLyB0aGlzIG1heSBiZSBhIFdlZXggZXZlbnQgd2hpY2ggZG9lc24ndCBoYXZlIHRoaXMgbWV0aG9kXG4gIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGZpbmRBbmNob3IgKGNoaWxkcmVuKSB7XG4gIGlmIChjaGlsZHJlbikge1xuICAgIHZhciBjaGlsZDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgaWYgKGNoaWxkLnRhZyA9PT0gJ2EnKSB7XG4gICAgICAgIHJldHVybiBjaGlsZFxuICAgICAgfVxuICAgICAgaWYgKGNoaWxkLmNoaWxkcmVuICYmIChjaGlsZCA9IGZpbmRBbmNob3IoY2hpbGQuY2hpbGRyZW4pKSkge1xuICAgICAgICByZXR1cm4gY2hpbGRcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxudmFyIF9WdWU7XG5cbmZ1bmN0aW9uIGluc3RhbGwgKFZ1ZSkge1xuICBpZiAoaW5zdGFsbC5pbnN0YWxsZWQpIHsgcmV0dXJuIH1cbiAgaW5zdGFsbC5pbnN0YWxsZWQgPSB0cnVlO1xuXG4gIF9WdWUgPSBWdWU7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZ1ZS5wcm90b3R5cGUsICckcm91dGVyJywge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0ICgpIHsgcmV0dXJuIHRoaXMuJHJvb3QuX3JvdXRlciB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWdWUucHJvdG90eXBlLCAnJHJvdXRlJywge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0ICgpIHsgcmV0dXJuIHRoaXMuJHJvb3QuX3JvdXRlIH1cbiAgfSk7XG5cbiAgVnVlLm1peGluKHtcbiAgICBiZWZvcmVDcmVhdGU6IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZSAoKSB7XG4gICAgICBpZiAodGhpcy4kb3B0aW9ucy5yb3V0ZXIpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyID0gdGhpcy4kb3B0aW9ucy5yb3V0ZXI7XG4gICAgICAgIHRoaXMuX3JvdXRlci5pbml0KHRoaXMpO1xuICAgICAgICBWdWUudXRpbC5kZWZpbmVSZWFjdGl2ZSh0aGlzLCAnX3JvdXRlJywgdGhpcy5fcm91dGVyLmhpc3RvcnkuY3VycmVudCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBWdWUuY29tcG9uZW50KCdyb3V0ZXItdmlldycsIFZpZXcpO1xuICBWdWUuY29tcG9uZW50KCdyb3V0ZXItbGluaycsIExpbmspO1xuXG4gIHZhciBzdHJhdHMgPSBWdWUuY29uZmlnLm9wdGlvbk1lcmdlU3RyYXRlZ2llcztcbiAgLy8gdXNlIHRoZSBzYW1lIGhvb2sgbWVyZ2luZyBzdHJhdGVneSBmb3Igcm91dGUgaG9va3NcbiAgc3RyYXRzLmJlZm9yZVJvdXRlRW50ZXIgPSBzdHJhdHMuYmVmb3JlUm91dGVMZWF2ZSA9IHN0cmF0cy5jcmVhdGVkO1xufVxuXG4vKiAgKi9cblxudmFyIGluQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xuXG4vKiAgKi9cblxuZnVuY3Rpb24gcmVzb2x2ZVBhdGggKFxuICByZWxhdGl2ZSxcbiAgYmFzZSxcbiAgYXBwZW5kXG4pIHtcbiAgaWYgKHJlbGF0aXZlLmNoYXJBdCgwKSA9PT0gJy8nKSB7XG4gICAgcmV0dXJuIHJlbGF0aXZlXG4gIH1cblxuICBpZiAocmVsYXRpdmUuY2hhckF0KDApID09PSAnPycgfHwgcmVsYXRpdmUuY2hhckF0KDApID09PSAnIycpIHtcbiAgICByZXR1cm4gYmFzZSArIHJlbGF0aXZlXG4gIH1cblxuICB2YXIgc3RhY2sgPSBiYXNlLnNwbGl0KCcvJyk7XG5cbiAgLy8gcmVtb3ZlIHRyYWlsaW5nIHNlZ21lbnQgaWY6XG4gIC8vIC0gbm90IGFwcGVuZGluZ1xuICAvLyAtIGFwcGVuZGluZyB0byB0cmFpbGluZyBzbGFzaCAobGFzdCBzZWdtZW50IGlzIGVtcHR5KVxuICBpZiAoIWFwcGVuZCB8fCAhc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0pIHtcbiAgICBzdGFjay5wb3AoKTtcbiAgfVxuXG4gIC8vIHJlc29sdmUgcmVsYXRpdmUgcGF0aFxuICB2YXIgc2VnbWVudHMgPSByZWxhdGl2ZS5yZXBsYWNlKC9eXFwvLywgJycpLnNwbGl0KCcvJyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2VnbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc2VnbWVudCA9IHNlZ21lbnRzW2ldO1xuICAgIGlmIChzZWdtZW50ID09PSAnLicpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfSBlbHNlIGlmIChzZWdtZW50ID09PSAnLi4nKSB7XG4gICAgICBzdGFjay5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhY2sucHVzaChzZWdtZW50KTtcbiAgICB9XG4gIH1cblxuICAvLyBlbnN1cmUgbGVhZGluZyBzbGFzaFxuICBpZiAoc3RhY2tbMF0gIT09ICcnKSB7XG4gICAgc3RhY2sudW5zaGlmdCgnJyk7XG4gIH1cblxuICByZXR1cm4gc3RhY2suam9pbignLycpXG59XG5cbmZ1bmN0aW9uIHBhcnNlUGF0aCAocGF0aCkge1xuICB2YXIgaGFzaCA9ICcnO1xuICB2YXIgcXVlcnkgPSAnJztcblxuICB2YXIgaGFzaEluZGV4ID0gcGF0aC5pbmRleE9mKCcjJyk7XG4gIGlmIChoYXNoSW5kZXggPj0gMCkge1xuICAgIGhhc2ggPSBwYXRoLnNsaWNlKGhhc2hJbmRleCk7XG4gICAgcGF0aCA9IHBhdGguc2xpY2UoMCwgaGFzaEluZGV4KTtcbiAgfVxuXG4gIHZhciBxdWVyeUluZGV4ID0gcGF0aC5pbmRleE9mKCc/Jyk7XG4gIGlmIChxdWVyeUluZGV4ID49IDApIHtcbiAgICBxdWVyeSA9IHBhdGguc2xpY2UocXVlcnlJbmRleCArIDEpO1xuICAgIHBhdGggPSBwYXRoLnNsaWNlKDAsIHF1ZXJ5SW5kZXgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwYXRoOiBwYXRoLFxuICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICBoYXNoOiBoYXNoXG4gIH1cbn1cblxuZnVuY3Rpb24gY2xlYW5QYXRoIChwYXRoKSB7XG4gIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcL1xcLy9nLCAnLycpXG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBjcmVhdGVSb3V0ZU1hcCAoXG4gIHJvdXRlcyxcbiAgb2xkUGF0aE1hcCxcbiAgb2xkTmFtZU1hcFxuKSB7XG4gIHZhciBwYXRoTWFwID0gb2xkUGF0aE1hcCB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2YXIgbmFtZU1hcCA9IG9sZE5hbWVNYXAgfHwgT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICByb3V0ZXMuZm9yRWFjaChmdW5jdGlvbiAocm91dGUpIHtcbiAgICBhZGRSb3V0ZVJlY29yZChwYXRoTWFwLCBuYW1lTWFwLCByb3V0ZSk7XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgcGF0aE1hcDogcGF0aE1hcCxcbiAgICBuYW1lTWFwOiBuYW1lTWFwXG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkUm91dGVSZWNvcmQgKFxuICBwYXRoTWFwLFxuICBuYW1lTWFwLFxuICByb3V0ZSxcbiAgcGFyZW50LFxuICBtYXRjaEFzXG4pIHtcbiAgdmFyIHBhdGggPSByb3V0ZS5wYXRoO1xuICB2YXIgbmFtZSA9IHJvdXRlLm5hbWU7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYXNzZXJ0KHBhdGggIT0gbnVsbCwgXCJcXFwicGF0aFxcXCIgaXMgcmVxdWlyZWQgaW4gYSByb3V0ZSBjb25maWd1cmF0aW9uLlwiKTtcbiAgICBhc3NlcnQoXG4gICAgICB0eXBlb2Ygcm91dGUuY29tcG9uZW50ICE9PSAnc3RyaW5nJyxcbiAgICAgIFwicm91dGUgY29uZmlnIFxcXCJjb21wb25lbnRcXFwiIGZvciBwYXRoOiBcIiArIChTdHJpbmcocGF0aCB8fCBuYW1lKSkgKyBcIiBjYW5ub3QgYmUgYSBcIiArXG4gICAgICBcInN0cmluZyBpZC4gVXNlIGFuIGFjdHVhbCBjb21wb25lbnQgaW5zdGVhZC5cIlxuICAgICk7XG4gIH1cblxuICB2YXIgcmVjb3JkID0ge1xuICAgIHBhdGg6IG5vcm1hbGl6ZVBhdGgocGF0aCwgcGFyZW50KSxcbiAgICBjb21wb25lbnRzOiByb3V0ZS5jb21wb25lbnRzIHx8IHsgZGVmYXVsdDogcm91dGUuY29tcG9uZW50IH0sXG4gICAgaW5zdGFuY2VzOiB7fSxcbiAgICBuYW1lOiBuYW1lLFxuICAgIHBhcmVudDogcGFyZW50LFxuICAgIG1hdGNoQXM6IG1hdGNoQXMsXG4gICAgcmVkaXJlY3Q6IHJvdXRlLnJlZGlyZWN0LFxuICAgIGJlZm9yZUVudGVyOiByb3V0ZS5iZWZvcmVFbnRlcixcbiAgICBtZXRhOiByb3V0ZS5tZXRhIHx8IHt9LFxuICAgIHByb3BzOiByb3V0ZS5wcm9wcyA9PSBudWxsXG4gICAgICA/IHt9XG4gICAgICA6IHJvdXRlLmNvbXBvbmVudHNcbiAgICAgICAgPyByb3V0ZS5wcm9wc1xuICAgICAgICA6IHsgZGVmYXVsdDogcm91dGUucHJvcHMgfVxuICB9O1xuXG4gIGlmIChyb3V0ZS5jaGlsZHJlbikge1xuICAgIC8vIFdhcm4gaWYgcm91dGUgaXMgbmFtZWQgYW5kIGhhcyBhIGRlZmF1bHQgY2hpbGQgcm91dGUuXG4gICAgLy8gSWYgdXNlcnMgbmF2aWdhdGUgdG8gdGhpcyByb3V0ZSBieSBuYW1lLCB0aGUgZGVmYXVsdCBjaGlsZCB3aWxsXG4gICAgLy8gbm90IGJlIHJlbmRlcmVkIChHSCBJc3N1ZSAjNjI5KVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAocm91dGUubmFtZSAmJiByb3V0ZS5jaGlsZHJlbi5zb21lKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gL15cXC8/JC8udGVzdChjaGlsZC5wYXRoKTsgfSkpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICBcIk5hbWVkIFJvdXRlICdcIiArIChyb3V0ZS5uYW1lKSArIFwiJyBoYXMgYSBkZWZhdWx0IGNoaWxkIHJvdXRlLiBcIiArXG4gICAgICAgICAgXCJXaGVuIG5hdmlnYXRpbmcgdG8gdGhpcyBuYW1lZCByb3V0ZSAoOnRvPVxcXCJ7bmFtZTogJ1wiICsgKHJvdXRlLm5hbWUpICsgXCInXFxcIiksIFwiICtcbiAgICAgICAgICBcInRoZSBkZWZhdWx0IGNoaWxkIHJvdXRlIHdpbGwgbm90IGJlIHJlbmRlcmVkLiBSZW1vdmUgdGhlIG5hbWUgZnJvbSBcIiArXG4gICAgICAgICAgXCJ0aGlzIHJvdXRlIGFuZCB1c2UgdGhlIG5hbWUgb2YgdGhlIGRlZmF1bHQgY2hpbGQgcm91dGUgZm9yIG5hbWVkIFwiICtcbiAgICAgICAgICBcImxpbmtzIGluc3RlYWQuXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcm91dGUuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgIHZhciBjaGlsZE1hdGNoQXMgPSBtYXRjaEFzXG4gICAgICAgID8gY2xlYW5QYXRoKChtYXRjaEFzICsgXCIvXCIgKyAoY2hpbGQucGF0aCkpKVxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIGFkZFJvdXRlUmVjb3JkKHBhdGhNYXAsIG5hbWVNYXAsIGNoaWxkLCByZWNvcmQsIGNoaWxkTWF0Y2hBcyk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAocm91dGUuYWxpYXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHJvdXRlLmFsaWFzKSkge1xuICAgICAgcm91dGUuYWxpYXMuZm9yRWFjaChmdW5jdGlvbiAoYWxpYXMpIHtcbiAgICAgICAgdmFyIGFsaWFzUm91dGUgPSB7XG4gICAgICAgICAgcGF0aDogYWxpYXMsXG4gICAgICAgICAgY2hpbGRyZW46IHJvdXRlLmNoaWxkcmVuXG4gICAgICAgIH07XG4gICAgICAgIGFkZFJvdXRlUmVjb3JkKHBhdGhNYXAsIG5hbWVNYXAsIGFsaWFzUm91dGUsIHBhcmVudCwgcmVjb3JkLnBhdGgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhbGlhc1JvdXRlID0ge1xuICAgICAgICBwYXRoOiByb3V0ZS5hbGlhcyxcbiAgICAgICAgY2hpbGRyZW46IHJvdXRlLmNoaWxkcmVuXG4gICAgICB9O1xuICAgICAgYWRkUm91dGVSZWNvcmQocGF0aE1hcCwgbmFtZU1hcCwgYWxpYXNSb3V0ZSwgcGFyZW50LCByZWNvcmQucGF0aCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFwYXRoTWFwW3JlY29yZC5wYXRoXSkge1xuICAgIHBhdGhNYXBbcmVjb3JkLnBhdGhdID0gcmVjb3JkO1xuICB9XG5cbiAgaWYgKG5hbWUpIHtcbiAgICBpZiAoIW5hbWVNYXBbbmFtZV0pIHtcbiAgICAgIG5hbWVNYXBbbmFtZV0gPSByZWNvcmQ7XG4gICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmICFtYXRjaEFzKSB7XG4gICAgICB3YXJuKFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgXCJEdXBsaWNhdGUgbmFtZWQgcm91dGVzIGRlZmluaXRpb246IFwiICtcbiAgICAgICAgXCJ7IG5hbWU6IFxcXCJcIiArIG5hbWUgKyBcIlxcXCIsIHBhdGg6IFxcXCJcIiArIChyZWNvcmQucGF0aCkgKyBcIlxcXCIgfVwiXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVQYXRoIChwYXRoLCBwYXJlbnQpIHtcbiAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXFwvJC8sICcnKTtcbiAgaWYgKHBhdGhbMF0gPT09ICcvJykgeyByZXR1cm4gcGF0aCB9XG4gIGlmIChwYXJlbnQgPT0gbnVsbCkgeyByZXR1cm4gcGF0aCB9XG4gIHJldHVybiBjbGVhblBhdGgoKChwYXJlbnQucGF0aCkgKyBcIi9cIiArIHBhdGgpKVxufVxuXG52YXIgaW5kZXgkMSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnZhciBpc2FycmF5ID0gaW5kZXgkMTtcblxuLyoqXG4gKiBFeHBvc2UgYHBhdGhUb1JlZ2V4cGAuXG4gKi9cbnZhciBpbmRleCA9IHBhdGhUb1JlZ2V4cDtcbnZhciBwYXJzZV8xID0gcGFyc2U7XG52YXIgY29tcGlsZV8xID0gY29tcGlsZTtcbnZhciB0b2tlbnNUb0Z1bmN0aW9uXzEgPSB0b2tlbnNUb0Z1bmN0aW9uO1xudmFyIHRva2Vuc1RvUmVnRXhwXzEgPSB0b2tlbnNUb1JlZ0V4cDtcblxuLyoqXG4gKiBUaGUgbWFpbiBwYXRoIG1hdGNoaW5nIHJlZ2V4cCB1dGlsaXR5LlxuICpcbiAqIEB0eXBlIHtSZWdFeHB9XG4gKi9cbnZhciBQQVRIX1JFR0VYUCA9IG5ldyBSZWdFeHAoW1xuICAvLyBNYXRjaCBlc2NhcGVkIGNoYXJhY3RlcnMgdGhhdCB3b3VsZCBvdGhlcndpc2UgYXBwZWFyIGluIGZ1dHVyZSBtYXRjaGVzLlxuICAvLyBUaGlzIGFsbG93cyB0aGUgdXNlciB0byBlc2NhcGUgc3BlY2lhbCBjaGFyYWN0ZXJzIHRoYXQgd29uJ3QgdHJhbnNmb3JtLlxuICAnKFxcXFxcXFxcLiknLFxuICAvLyBNYXRjaCBFeHByZXNzLXN0eWxlIHBhcmFtZXRlcnMgYW5kIHVuLW5hbWVkIHBhcmFtZXRlcnMgd2l0aCBhIHByZWZpeFxuICAvLyBhbmQgb3B0aW9uYWwgc3VmZml4ZXMuIE1hdGNoZXMgYXBwZWFyIGFzOlxuICAvL1xuICAvLyBcIi86dGVzdChcXFxcZCspP1wiID0+IFtcIi9cIiwgXCJ0ZXN0XCIsIFwiXFxkK1wiLCB1bmRlZmluZWQsIFwiP1wiLCB1bmRlZmluZWRdXG4gIC8vIFwiL3JvdXRlKFxcXFxkKylcIiAgPT4gW3VuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFwiXFxkK1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1cbiAgLy8gXCIvKlwiICAgICAgICAgICAgPT4gW1wiL1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFwiKlwiXVxuICAnKFtcXFxcLy5dKT8oPzooPzpcXFxcOihcXFxcdyspKD86XFxcXCgoKD86XFxcXFxcXFwufFteXFxcXFxcXFwoKV0pKylcXFxcKSk/fFxcXFwoKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcKCldKSspXFxcXCkpKFsrKj9dKT98KFxcXFwqKSknXG5dLmpvaW4oJ3wnKSwgJ2cnKTtcblxuLyoqXG4gKiBQYXJzZSBhIHN0cmluZyBmb3IgdGhlIHJhdyB0b2tlbnMuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSAgc3RyXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSBvcHRpb25zXG4gKiBAcmV0dXJuIHshQXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlIChzdHIsIG9wdGlvbnMpIHtcbiAgdmFyIHRva2VucyA9IFtdO1xuICB2YXIga2V5ID0gMDtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIHBhdGggPSAnJztcbiAgdmFyIGRlZmF1bHREZWxpbWl0ZXIgPSBvcHRpb25zICYmIG9wdGlvbnMuZGVsaW1pdGVyIHx8ICcvJztcbiAgdmFyIHJlcztcblxuICB3aGlsZSAoKHJlcyA9IFBBVEhfUkVHRVhQLmV4ZWMoc3RyKSkgIT0gbnVsbCkge1xuICAgIHZhciBtID0gcmVzWzBdO1xuICAgIHZhciBlc2NhcGVkID0gcmVzWzFdO1xuICAgIHZhciBvZmZzZXQgPSByZXMuaW5kZXg7XG4gICAgcGF0aCArPSBzdHIuc2xpY2UoaW5kZXgsIG9mZnNldCk7XG4gICAgaW5kZXggPSBvZmZzZXQgKyBtLmxlbmd0aDtcblxuICAgIC8vIElnbm9yZSBhbHJlYWR5IGVzY2FwZWQgc2VxdWVuY2VzLlxuICAgIGlmIChlc2NhcGVkKSB7XG4gICAgICBwYXRoICs9IGVzY2FwZWRbMV07XG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIHZhciBuZXh0ID0gc3RyW2luZGV4XTtcbiAgICB2YXIgcHJlZml4ID0gcmVzWzJdO1xuICAgIHZhciBuYW1lID0gcmVzWzNdO1xuICAgIHZhciBjYXB0dXJlID0gcmVzWzRdO1xuICAgIHZhciBncm91cCA9IHJlc1s1XTtcbiAgICB2YXIgbW9kaWZpZXIgPSByZXNbNl07XG4gICAgdmFyIGFzdGVyaXNrID0gcmVzWzddO1xuXG4gICAgLy8gUHVzaCB0aGUgY3VycmVudCBwYXRoIG9udG8gdGhlIHRva2Vucy5cbiAgICBpZiAocGF0aCkge1xuICAgICAgdG9rZW5zLnB1c2gocGF0aCk7XG4gICAgICBwYXRoID0gJyc7XG4gICAgfVxuXG4gICAgdmFyIHBhcnRpYWwgPSBwcmVmaXggIT0gbnVsbCAmJiBuZXh0ICE9IG51bGwgJiYgbmV4dCAhPT0gcHJlZml4O1xuICAgIHZhciByZXBlYXQgPSBtb2RpZmllciA9PT0gJysnIHx8IG1vZGlmaWVyID09PSAnKic7XG4gICAgdmFyIG9wdGlvbmFsID0gbW9kaWZpZXIgPT09ICc/JyB8fCBtb2RpZmllciA9PT0gJyonO1xuICAgIHZhciBkZWxpbWl0ZXIgPSByZXNbMl0gfHwgZGVmYXVsdERlbGltaXRlcjtcbiAgICB2YXIgcGF0dGVybiA9IGNhcHR1cmUgfHwgZ3JvdXA7XG5cbiAgICB0b2tlbnMucHVzaCh7XG4gICAgICBuYW1lOiBuYW1lIHx8IGtleSsrLFxuICAgICAgcHJlZml4OiBwcmVmaXggfHwgJycsXG4gICAgICBkZWxpbWl0ZXI6IGRlbGltaXRlcixcbiAgICAgIG9wdGlvbmFsOiBvcHRpb25hbCxcbiAgICAgIHJlcGVhdDogcmVwZWF0LFxuICAgICAgcGFydGlhbDogcGFydGlhbCxcbiAgICAgIGFzdGVyaXNrOiAhIWFzdGVyaXNrLFxuICAgICAgcGF0dGVybjogcGF0dGVybiA/IGVzY2FwZUdyb3VwKHBhdHRlcm4pIDogKGFzdGVyaXNrID8gJy4qJyA6ICdbXicgKyBlc2NhcGVTdHJpbmcoZGVsaW1pdGVyKSArICddKz8nKVxuICAgIH0pO1xuICB9XG5cbiAgLy8gTWF0Y2ggYW55IGNoYXJhY3RlcnMgc3RpbGwgcmVtYWluaW5nLlxuICBpZiAoaW5kZXggPCBzdHIubGVuZ3RoKSB7XG4gICAgcGF0aCArPSBzdHIuc3Vic3RyKGluZGV4KTtcbiAgfVxuXG4gIC8vIElmIHRoZSBwYXRoIGV4aXN0cywgcHVzaCBpdCBvbnRvIHRoZSBlbmQuXG4gIGlmIChwYXRoKSB7XG4gICAgdG9rZW5zLnB1c2gocGF0aCk7XG4gIH1cblxuICByZXR1cm4gdG9rZW5zXG59XG5cbi8qKlxuICogQ29tcGlsZSBhIHN0cmluZyB0byBhIHRlbXBsYXRlIGZ1bmN0aW9uIGZvciB0aGUgcGF0aC5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgICAgIHN0clxuICogQHBhcmFtICB7T2JqZWN0PX0gICAgICAgICAgICBvcHRpb25zXG4gKiBAcmV0dXJuIHshZnVuY3Rpb24oT2JqZWN0PSwgT2JqZWN0PSl9XG4gKi9cbmZ1bmN0aW9uIGNvbXBpbGUgKHN0ciwgb3B0aW9ucykge1xuICByZXR1cm4gdG9rZW5zVG9GdW5jdGlvbihwYXJzZShzdHIsIG9wdGlvbnMpKVxufVxuXG4vKipcbiAqIFByZXR0aWVyIGVuY29kaW5nIG9mIFVSSSBwYXRoIHNlZ21lbnRzLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ31cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZW5jb2RlVVJJQ29tcG9uZW50UHJldHR5IChzdHIpIHtcbiAgcmV0dXJuIGVuY29kZVVSSShzdHIpLnJlcGxhY2UoL1tcXC8/I10vZywgZnVuY3Rpb24gKGMpIHtcbiAgICByZXR1cm4gJyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpXG4gIH0pXG59XG5cbi8qKlxuICogRW5jb2RlIHRoZSBhc3RlcmlzayBwYXJhbWV0ZXIuIFNpbWlsYXIgdG8gYHByZXR0eWAsIGJ1dCBhbGxvd3Mgc2xhc2hlcy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVuY29kZUFzdGVyaXNrIChzdHIpIHtcbiAgcmV0dXJuIGVuY29kZVVSSShzdHIpLnJlcGxhY2UoL1s/I10vZywgZnVuY3Rpb24gKGMpIHtcbiAgICByZXR1cm4gJyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpXG4gIH0pXG59XG5cbi8qKlxuICogRXhwb3NlIGEgbWV0aG9kIGZvciB0cmFuc2Zvcm1pbmcgdG9rZW5zIGludG8gdGhlIHBhdGggZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHRva2Vuc1RvRnVuY3Rpb24gKHRva2Vucykge1xuICAvLyBDb21waWxlIGFsbCB0aGUgdG9rZW5zIGludG8gcmVnZXhwcy5cbiAgdmFyIG1hdGNoZXMgPSBuZXcgQXJyYXkodG9rZW5zLmxlbmd0aCk7XG5cbiAgLy8gQ29tcGlsZSBhbGwgdGhlIHBhdHRlcm5zIGJlZm9yZSBjb21waWxhdGlvbi5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAodHlwZW9mIHRva2Vuc1tpXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG1hdGNoZXNbaV0gPSBuZXcgUmVnRXhwKCdeKD86JyArIHRva2Vuc1tpXS5wYXR0ZXJuICsgJykkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIG9wdHMpIHtcbiAgICB2YXIgcGF0aCA9ICcnO1xuICAgIHZhciBkYXRhID0gb2JqIHx8IHt9O1xuICAgIHZhciBvcHRpb25zID0gb3B0cyB8fCB7fTtcbiAgICB2YXIgZW5jb2RlID0gb3B0aW9ucy5wcmV0dHkgPyBlbmNvZGVVUklDb21wb25lbnRQcmV0dHkgOiBlbmNvZGVVUklDb21wb25lbnQ7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgICBwYXRoICs9IHRva2VuO1xuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZSA9IGRhdGFbdG9rZW4ubmFtZV07XG4gICAgICB2YXIgc2VnbWVudDtcblxuICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgaWYgKHRva2VuLm9wdGlvbmFsKSB7XG4gICAgICAgICAgLy8gUHJlcGVuZCBwYXJ0aWFsIHNlZ21lbnQgcHJlZml4ZXMuXG4gICAgICAgICAgaWYgKHRva2VuLnBhcnRpYWwpIHtcbiAgICAgICAgICAgIHBhdGggKz0gdG9rZW4ucHJlZml4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBiZSBkZWZpbmVkJylcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNhcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgaWYgKCF0b2tlbi5yZXBlYXQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIG5vdCByZXBlYXQsIGJ1dCByZWNlaXZlZCBgJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKSArICdgJylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpZiAodG9rZW4ub3B0aW9uYWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbm90IGJlIGVtcHR5JylcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbHVlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgc2VnbWVudCA9IGVuY29kZSh2YWx1ZVtqXSk7XG5cbiAgICAgICAgICBpZiAoIW1hdGNoZXNbaV0udGVzdChzZWdtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYWxsIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbWF0Y2ggXCInICsgdG9rZW4ucGF0dGVybiArICdcIiwgYnV0IHJlY2VpdmVkIGAnICsgSlNPTi5zdHJpbmdpZnkoc2VnbWVudCkgKyAnYCcpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcGF0aCArPSAoaiA9PT0gMCA/IHRva2VuLnByZWZpeCA6IHRva2VuLmRlbGltaXRlcikgKyBzZWdtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgc2VnbWVudCA9IHRva2VuLmFzdGVyaXNrID8gZW5jb2RlQXN0ZXJpc2sodmFsdWUpIDogZW5jb2RlKHZhbHVlKTtcblxuICAgICAgaWYgKCFtYXRjaGVzW2ldLnRlc3Qoc2VnbWVudCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBtYXRjaCBcIicgKyB0b2tlbi5wYXR0ZXJuICsgJ1wiLCBidXQgcmVjZWl2ZWQgXCInICsgc2VnbWVudCArICdcIicpXG4gICAgICB9XG5cbiAgICAgIHBhdGggKz0gdG9rZW4ucHJlZml4ICsgc2VnbWVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aFxuICB9XG59XG5cbi8qKlxuICogRXNjYXBlIGEgcmVndWxhciBleHByZXNzaW9uIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBlc2NhcGVTdHJpbmcgKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbLisqPz1eIToke30oKVtcXF18XFwvXFxcXF0pL2csICdcXFxcJDEnKVxufVxuXG4vKipcbiAqIEVzY2FwZSB0aGUgY2FwdHVyaW5nIGdyb3VwIGJ5IGVzY2FwaW5nIHNwZWNpYWwgY2hhcmFjdGVycyBhbmQgbWVhbmluZy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGdyb3VwXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVzY2FwZUdyb3VwIChncm91cCkge1xuICByZXR1cm4gZ3JvdXAucmVwbGFjZSgvKFs9ITokXFwvKCldKS9nLCAnXFxcXCQxJylcbn1cblxuLyoqXG4gKiBBdHRhY2ggdGhlIGtleXMgYXMgYSBwcm9wZXJ0eSBvZiB0aGUgcmVnZXhwLlxuICpcbiAqIEBwYXJhbSAgeyFSZWdFeHB9IHJlXG4gKiBAcGFyYW0gIHtBcnJheX0gICBrZXlzXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBhdHRhY2hLZXlzIChyZSwga2V5cykge1xuICByZS5rZXlzID0ga2V5cztcbiAgcmV0dXJuIHJlXG59XG5cbi8qKlxuICogR2V0IHRoZSBmbGFncyBmb3IgYSByZWdleHAgZnJvbSB0aGUgb3B0aW9ucy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZmxhZ3MgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG9wdGlvbnMuc2Vuc2l0aXZlID8gJycgOiAnaSdcbn1cblxuLyoqXG4gKiBQdWxsIG91dCBrZXlzIGZyb20gYSByZWdleHAuXG4gKlxuICogQHBhcmFtICB7IVJlZ0V4cH0gcGF0aFxuICogQHBhcmFtICB7IUFycmF5fSAga2V5c1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gcmVnZXhwVG9SZWdleHAgKHBhdGgsIGtleXMpIHtcbiAgLy8gVXNlIGEgbmVnYXRpdmUgbG9va2FoZWFkIHRvIG1hdGNoIG9ubHkgY2FwdHVyaW5nIGdyb3Vwcy5cbiAgdmFyIGdyb3VwcyA9IHBhdGguc291cmNlLm1hdGNoKC9cXCgoPyFcXD8pL2cpO1xuXG4gIGlmIChncm91cHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAga2V5cy5wdXNoKHtcbiAgICAgICAgbmFtZTogaSxcbiAgICAgICAgcHJlZml4OiBudWxsLFxuICAgICAgICBkZWxpbWl0ZXI6IG51bGwsXG4gICAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgICAgcmVwZWF0OiBmYWxzZSxcbiAgICAgICAgcGFydGlhbDogZmFsc2UsXG4gICAgICAgIGFzdGVyaXNrOiBmYWxzZSxcbiAgICAgICAgcGF0dGVybjogbnVsbFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGF0dGFjaEtleXMocGF0aCwga2V5cylcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gYW4gYXJyYXkgaW50byBhIHJlZ2V4cC5cbiAqXG4gKiBAcGFyYW0gIHshQXJyYXl9ICBwYXRoXG4gKiBAcGFyYW0gIHtBcnJheX0gICBrZXlzXG4gKiBAcGFyYW0gIHshT2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBhcnJheVRvUmVnZXhwIChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gIHZhciBwYXJ0cyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xuICAgIHBhcnRzLnB1c2gocGF0aFRvUmVnZXhwKHBhdGhbaV0sIGtleXMsIG9wdGlvbnMpLnNvdXJjZSk7XG4gIH1cblxuICB2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cCgnKD86JyArIHBhcnRzLmpvaW4oJ3wnKSArICcpJywgZmxhZ3Mob3B0aW9ucykpO1xuXG4gIHJldHVybiBhdHRhY2hLZXlzKHJlZ2V4cCwga2V5cylcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBwYXRoIHJlZ2V4cCBmcm9tIHN0cmluZyBpbnB1dC5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICBwYXRoXG4gKiBAcGFyYW0gIHshQXJyYXl9ICBrZXlzXG4gKiBAcGFyYW0gIHshT2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBzdHJpbmdUb1JlZ2V4cCAocGF0aCwga2V5cywgb3B0aW9ucykge1xuICByZXR1cm4gdG9rZW5zVG9SZWdFeHAocGFyc2UocGF0aCwgb3B0aW9ucyksIGtleXMsIG9wdGlvbnMpXG59XG5cbi8qKlxuICogRXhwb3NlIGEgZnVuY3Rpb24gZm9yIHRha2luZyB0b2tlbnMgYW5kIHJldHVybmluZyBhIFJlZ0V4cC5cbiAqXG4gKiBAcGFyYW0gIHshQXJyYXl9ICAgICAgICAgIHRva2Vuc1xuICogQHBhcmFtICB7KEFycmF5fE9iamVjdCk9fSBrZXlzXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSAgICAgICAgIG9wdGlvbnNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIHRva2Vuc1RvUmVnRXhwICh0b2tlbnMsIGtleXMsIG9wdGlvbnMpIHtcbiAgaWYgKCFpc2FycmF5KGtleXMpKSB7XG4gICAgb3B0aW9ucyA9IC8qKiBAdHlwZSB7IU9iamVjdH0gKi8gKGtleXMgfHwgb3B0aW9ucyk7XG4gICAga2V5cyA9IFtdO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHN0cmljdCA9IG9wdGlvbnMuc3RyaWN0O1xuICB2YXIgZW5kID0gb3B0aW9ucy5lbmQgIT09IGZhbHNlO1xuICB2YXIgcm91dGUgPSAnJztcblxuICAvLyBJdGVyYXRlIG92ZXIgdGhlIHRva2VucyBhbmQgY3JlYXRlIG91ciByZWdleHAgc3RyaW5nLlxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICByb3V0ZSArPSBlc2NhcGVTdHJpbmcodG9rZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcHJlZml4ID0gZXNjYXBlU3RyaW5nKHRva2VuLnByZWZpeCk7XG4gICAgICB2YXIgY2FwdHVyZSA9ICcoPzonICsgdG9rZW4ucGF0dGVybiArICcpJztcblxuICAgICAga2V5cy5wdXNoKHRva2VuKTtcblxuICAgICAgaWYgKHRva2VuLnJlcGVhdCkge1xuICAgICAgICBjYXB0dXJlICs9ICcoPzonICsgcHJlZml4ICsgY2FwdHVyZSArICcpKic7XG4gICAgICB9XG5cbiAgICAgIGlmICh0b2tlbi5vcHRpb25hbCkge1xuICAgICAgICBpZiAoIXRva2VuLnBhcnRpYWwpIHtcbiAgICAgICAgICBjYXB0dXJlID0gJyg/OicgKyBwcmVmaXggKyAnKCcgKyBjYXB0dXJlICsgJykpPyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FwdHVyZSA9IHByZWZpeCArICcoJyArIGNhcHR1cmUgKyAnKT8nO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYXB0dXJlID0gcHJlZml4ICsgJygnICsgY2FwdHVyZSArICcpJztcbiAgICAgIH1cblxuICAgICAgcm91dGUgKz0gY2FwdHVyZTtcbiAgICB9XG4gIH1cblxuICB2YXIgZGVsaW1pdGVyID0gZXNjYXBlU3RyaW5nKG9wdGlvbnMuZGVsaW1pdGVyIHx8ICcvJyk7XG4gIHZhciBlbmRzV2l0aERlbGltaXRlciA9IHJvdXRlLnNsaWNlKC1kZWxpbWl0ZXIubGVuZ3RoKSA9PT0gZGVsaW1pdGVyO1xuXG4gIC8vIEluIG5vbi1zdHJpY3QgbW9kZSB3ZSBhbGxvdyBhIHNsYXNoIGF0IHRoZSBlbmQgb2YgbWF0Y2guIElmIHRoZSBwYXRoIHRvXG4gIC8vIG1hdGNoIGFscmVhZHkgZW5kcyB3aXRoIGEgc2xhc2gsIHdlIHJlbW92ZSBpdCBmb3IgY29uc2lzdGVuY3kuIFRoZSBzbGFzaFxuICAvLyBpcyB2YWxpZCBhdCB0aGUgZW5kIG9mIGEgcGF0aCBtYXRjaCwgbm90IGluIHRoZSBtaWRkbGUuIFRoaXMgaXMgaW1wb3J0YW50XG4gIC8vIGluIG5vbi1lbmRpbmcgbW9kZSwgd2hlcmUgXCIvdGVzdC9cIiBzaG91bGRuJ3QgbWF0Y2ggXCIvdGVzdC8vcm91dGVcIi5cbiAgaWYgKCFzdHJpY3QpIHtcbiAgICByb3V0ZSA9IChlbmRzV2l0aERlbGltaXRlciA/IHJvdXRlLnNsaWNlKDAsIC1kZWxpbWl0ZXIubGVuZ3RoKSA6IHJvdXRlKSArICcoPzonICsgZGVsaW1pdGVyICsgJyg/PSQpKT8nO1xuICB9XG5cbiAgaWYgKGVuZCkge1xuICAgIHJvdXRlICs9ICckJztcbiAgfSBlbHNlIHtcbiAgICAvLyBJbiBub24tZW5kaW5nIG1vZGUsIHdlIG5lZWQgdGhlIGNhcHR1cmluZyBncm91cHMgdG8gbWF0Y2ggYXMgbXVjaCBhc1xuICAgIC8vIHBvc3NpYmxlIGJ5IHVzaW5nIGEgcG9zaXRpdmUgbG9va2FoZWFkIHRvIHRoZSBlbmQgb3IgbmV4dCBwYXRoIHNlZ21lbnQuXG4gICAgcm91dGUgKz0gc3RyaWN0ICYmIGVuZHNXaXRoRGVsaW1pdGVyID8gJycgOiAnKD89JyArIGRlbGltaXRlciArICd8JCknO1xuICB9XG5cbiAgcmV0dXJuIGF0dGFjaEtleXMobmV3IFJlZ0V4cCgnXicgKyByb3V0ZSwgZmxhZ3Mob3B0aW9ucykpLCBrZXlzKVxufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSB0aGUgZ2l2ZW4gcGF0aCBzdHJpbmcsIHJldHVybmluZyBhIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAqXG4gKiBBbiBlbXB0eSBhcnJheSBjYW4gYmUgcGFzc2VkIGluIGZvciB0aGUga2V5cywgd2hpY2ggd2lsbCBob2xkIHRoZVxuICogcGxhY2Vob2xkZXIga2V5IGRlc2NyaXB0aW9ucy4gRm9yIGV4YW1wbGUsIHVzaW5nIGAvdXNlci86aWRgLCBga2V5c2Agd2lsbFxuICogY29udGFpbiBgW3sgbmFtZTogJ2lkJywgZGVsaW1pdGVyOiAnLycsIG9wdGlvbmFsOiBmYWxzZSwgcmVwZWF0OiBmYWxzZSB9XWAuXG4gKlxuICogQHBhcmFtICB7KHN0cmluZ3xSZWdFeHB8QXJyYXkpfSBwYXRoXG4gKiBAcGFyYW0gIHsoQXJyYXl8T2JqZWN0KT19ICAgICAgIGtleXNcbiAqIEBwYXJhbSAge09iamVjdD19ICAgICAgICAgICAgICAgb3B0aW9uc1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gcGF0aFRvUmVnZXhwIChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gIGlmICghaXNhcnJheShrZXlzKSkge1xuICAgIG9wdGlvbnMgPSAvKiogQHR5cGUgeyFPYmplY3R9ICovIChrZXlzIHx8IG9wdGlvbnMpO1xuICAgIGtleXMgPSBbXTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIGlmIChwYXRoIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgcmV0dXJuIHJlZ2V4cFRvUmVnZXhwKHBhdGgsIC8qKiBAdHlwZSB7IUFycmF5fSAqLyAoa2V5cykpXG4gIH1cblxuICBpZiAoaXNhcnJheShwYXRoKSkge1xuICAgIHJldHVybiBhcnJheVRvUmVnZXhwKC8qKiBAdHlwZSB7IUFycmF5fSAqLyAocGF0aCksIC8qKiBAdHlwZSB7IUFycmF5fSAqLyAoa2V5cyksIG9wdGlvbnMpXG4gIH1cblxuICByZXR1cm4gc3RyaW5nVG9SZWdleHAoLyoqIEB0eXBlIHtzdHJpbmd9ICovIChwYXRoKSwgLyoqIEB0eXBlIHshQXJyYXl9ICovIChrZXlzKSwgb3B0aW9ucylcbn1cblxuaW5kZXgucGFyc2UgPSBwYXJzZV8xO1xuaW5kZXguY29tcGlsZSA9IGNvbXBpbGVfMTtcbmluZGV4LnRva2Vuc1RvRnVuY3Rpb24gPSB0b2tlbnNUb0Z1bmN0aW9uXzE7XG5pbmRleC50b2tlbnNUb1JlZ0V4cCA9IHRva2Vuc1RvUmVnRXhwXzE7XG5cbi8qICAqL1xuXG52YXIgcmVnZXhwQ2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5mdW5jdGlvbiBnZXRSb3V0ZVJlZ2V4IChwYXRoKSB7XG4gIHZhciBoaXQgPSByZWdleHBDYWNoZVtwYXRoXTtcbiAgdmFyIGtleXMsIHJlZ2V4cDtcblxuICBpZiAoaGl0KSB7XG4gICAga2V5cyA9IGhpdC5rZXlzO1xuICAgIHJlZ2V4cCA9IGhpdC5yZWdleHA7XG4gIH0gZWxzZSB7XG4gICAga2V5cyA9IFtdO1xuICAgIHJlZ2V4cCA9IGluZGV4KHBhdGgsIGtleXMpO1xuICAgIHJlZ2V4cENhY2hlW3BhdGhdID0geyBrZXlzOiBrZXlzLCByZWdleHA6IHJlZ2V4cCB9O1xuICB9XG5cbiAgcmV0dXJuIHsga2V5czoga2V5cywgcmVnZXhwOiByZWdleHAgfVxufVxuXG52YXIgcmVnZXhwQ29tcGlsZUNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuZnVuY3Rpb24gZmlsbFBhcmFtcyAoXG4gIHBhdGgsXG4gIHBhcmFtcyxcbiAgcm91dGVNc2dcbikge1xuICB0cnkge1xuICAgIHZhciBmaWxsZXIgPVxuICAgICAgcmVnZXhwQ29tcGlsZUNhY2hlW3BhdGhdIHx8XG4gICAgICAocmVnZXhwQ29tcGlsZUNhY2hlW3BhdGhdID0gaW5kZXguY29tcGlsZShwYXRoKSk7XG4gICAgcmV0dXJuIGZpbGxlcihwYXJhbXMgfHwge30sIHsgcHJldHR5OiB0cnVlIH0pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgd2FybihmYWxzZSwgKFwibWlzc2luZyBwYXJhbSBmb3IgXCIgKyByb3V0ZU1zZyArIFwiOiBcIiArIChlLm1lc3NhZ2UpKSk7XG4gICAgfVxuICAgIHJldHVybiAnJ1xuICB9XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBub3JtYWxpemVMb2NhdGlvbiAoXG4gIHJhdyxcbiAgY3VycmVudCxcbiAgYXBwZW5kXG4pIHtcbiAgdmFyIG5leHQgPSB0eXBlb2YgcmF3ID09PSAnc3RyaW5nJyA/IHsgcGF0aDogcmF3IH0gOiByYXc7XG4gIC8vIG5hbWVkIHRhcmdldFxuICBpZiAobmV4dC5uYW1lIHx8IG5leHQuX25vcm1hbGl6ZWQpIHtcbiAgICByZXR1cm4gbmV4dFxuICB9XG5cbiAgLy8gcmVsYXRpdmUgcGFyYW1zXG4gIGlmICghbmV4dC5wYXRoICYmIG5leHQucGFyYW1zICYmIGN1cnJlbnQpIHtcbiAgICBuZXh0ID0gYXNzaWduKHt9LCBuZXh0KTtcbiAgICBuZXh0Ll9ub3JtYWxpemVkID0gdHJ1ZTtcbiAgICB2YXIgcGFyYW1zID0gYXNzaWduKGFzc2lnbih7fSwgY3VycmVudC5wYXJhbXMpLCBuZXh0LnBhcmFtcyk7XG4gICAgaWYgKGN1cnJlbnQubmFtZSkge1xuICAgICAgbmV4dC5uYW1lID0gY3VycmVudC5uYW1lO1xuICAgICAgbmV4dC5wYXJhbXMgPSBwYXJhbXM7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50Lm1hdGNoZWQpIHtcbiAgICAgIHZhciByYXdQYXRoID0gY3VycmVudC5tYXRjaGVkW2N1cnJlbnQubWF0Y2hlZC5sZW5ndGggLSAxXS5wYXRoO1xuICAgICAgbmV4dC5wYXRoID0gZmlsbFBhcmFtcyhyYXdQYXRoLCBwYXJhbXMsIChcInBhdGggXCIgKyAoY3VycmVudC5wYXRoKSkpO1xuICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgd2FybihmYWxzZSwgXCJyZWxhdGl2ZSBwYXJhbXMgbmF2aWdhdGlvbiByZXF1aXJlcyBhIGN1cnJlbnQgcm91dGUuXCIpO1xuICAgIH1cbiAgICByZXR1cm4gbmV4dFxuICB9XG5cbiAgdmFyIHBhcnNlZFBhdGggPSBwYXJzZVBhdGgobmV4dC5wYXRoIHx8ICcnKTtcbiAgdmFyIGJhc2VQYXRoID0gKGN1cnJlbnQgJiYgY3VycmVudC5wYXRoKSB8fCAnLyc7XG4gIHZhciBwYXRoID0gcGFyc2VkUGF0aC5wYXRoXG4gICAgPyByZXNvbHZlUGF0aChwYXJzZWRQYXRoLnBhdGgsIGJhc2VQYXRoLCBhcHBlbmQgfHwgbmV4dC5hcHBlbmQpXG4gICAgOiAoY3VycmVudCAmJiBjdXJyZW50LnBhdGgpIHx8ICcvJztcbiAgdmFyIHF1ZXJ5ID0gcmVzb2x2ZVF1ZXJ5KHBhcnNlZFBhdGgucXVlcnksIG5leHQucXVlcnkpO1xuICB2YXIgaGFzaCA9IG5leHQuaGFzaCB8fCBwYXJzZWRQYXRoLmhhc2g7XG4gIGlmIChoYXNoICYmIGhhc2guY2hhckF0KDApICE9PSAnIycpIHtcbiAgICBoYXNoID0gXCIjXCIgKyBoYXNoO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBfbm9ybWFsaXplZDogdHJ1ZSxcbiAgICBwYXRoOiBwYXRoLFxuICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICBoYXNoOiBoYXNoXG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzaWduIChhLCBiKSB7XG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgYVtrZXldID0gYltrZXldO1xuICB9XG4gIHJldHVybiBhXG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBjcmVhdGVNYXRjaGVyIChyb3V0ZXMpIHtcbiAgdmFyIHJlZiA9IGNyZWF0ZVJvdXRlTWFwKHJvdXRlcyk7XG4gIHZhciBwYXRoTWFwID0gcmVmLnBhdGhNYXA7XG4gIHZhciBuYW1lTWFwID0gcmVmLm5hbWVNYXA7XG5cbiAgZnVuY3Rpb24gYWRkUm91dGVzIChyb3V0ZXMpIHtcbiAgICBjcmVhdGVSb3V0ZU1hcChyb3V0ZXMsIHBhdGhNYXAsIG5hbWVNYXApO1xuICB9XG5cbiAgZnVuY3Rpb24gbWF0Y2ggKFxuICAgIHJhdyxcbiAgICBjdXJyZW50Um91dGUsXG4gICAgcmVkaXJlY3RlZEZyb21cbiAgKSB7XG4gICAgdmFyIGxvY2F0aW9uID0gbm9ybWFsaXplTG9jYXRpb24ocmF3LCBjdXJyZW50Um91dGUpO1xuICAgIHZhciBuYW1lID0gbG9jYXRpb24ubmFtZTtcblxuICAgIGlmIChuYW1lKSB7XG4gICAgICB2YXIgcmVjb3JkID0gbmFtZU1hcFtuYW1lXTtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHdhcm4ocmVjb3JkLCAoXCJSb3V0ZSB3aXRoIG5hbWUgJ1wiICsgbmFtZSArIFwiJyBkb2VzIG5vdCBleGlzdFwiKSk7XG4gICAgICB9XG4gICAgICB2YXIgcGFyYW1OYW1lcyA9IGdldFJvdXRlUmVnZXgocmVjb3JkLnBhdGgpLmtleXNcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiAha2V5Lm9wdGlvbmFsOyB9KVxuICAgICAgICAubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGtleS5uYW1lOyB9KTtcblxuICAgICAgaWYgKHR5cGVvZiBsb2NhdGlvbi5wYXJhbXMgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGxvY2F0aW9uLnBhcmFtcyA9IHt9O1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudFJvdXRlICYmIHR5cGVvZiBjdXJyZW50Um91dGUucGFyYW1zID09PSAnb2JqZWN0Jykge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gY3VycmVudFJvdXRlLnBhcmFtcykge1xuICAgICAgICAgIGlmICghKGtleSBpbiBsb2NhdGlvbi5wYXJhbXMpICYmIHBhcmFtTmFtZXMuaW5kZXhPZihrZXkpID4gLTEpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnBhcmFtc1trZXldID0gY3VycmVudFJvdXRlLnBhcmFtc1trZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkKSB7XG4gICAgICAgIGxvY2F0aW9uLnBhdGggPSBmaWxsUGFyYW1zKHJlY29yZC5wYXRoLCBsb2NhdGlvbi5wYXJhbXMsIChcIm5hbWVkIHJvdXRlIFxcXCJcIiArIG5hbWUgKyBcIlxcXCJcIikpO1xuICAgICAgICByZXR1cm4gX2NyZWF0ZVJvdXRlKHJlY29yZCwgbG9jYXRpb24sIHJlZGlyZWN0ZWRGcm9tKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobG9jYXRpb24ucGF0aCkge1xuICAgICAgbG9jYXRpb24ucGFyYW1zID0ge307XG4gICAgICBmb3IgKHZhciBwYXRoIGluIHBhdGhNYXApIHtcbiAgICAgICAgaWYgKG1hdGNoUm91dGUocGF0aCwgbG9jYXRpb24ucGFyYW1zLCBsb2NhdGlvbi5wYXRoKSkge1xuICAgICAgICAgIHJldHVybiBfY3JlYXRlUm91dGUocGF0aE1hcFtwYXRoXSwgbG9jYXRpb24sIHJlZGlyZWN0ZWRGcm9tKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIG5vIG1hdGNoXG4gICAgcmV0dXJuIF9jcmVhdGVSb3V0ZShudWxsLCBsb2NhdGlvbilcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZGlyZWN0IChcbiAgICByZWNvcmQsXG4gICAgbG9jYXRpb25cbiAgKSB7XG4gICAgdmFyIG9yaWdpbmFsUmVkaXJlY3QgPSByZWNvcmQucmVkaXJlY3Q7XG4gICAgdmFyIHJlZGlyZWN0ID0gdHlwZW9mIG9yaWdpbmFsUmVkaXJlY3QgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBvcmlnaW5hbFJlZGlyZWN0KGNyZWF0ZVJvdXRlKHJlY29yZCwgbG9jYXRpb24pKVxuICAgICAgICA6IG9yaWdpbmFsUmVkaXJlY3Q7XG5cbiAgICBpZiAodHlwZW9mIHJlZGlyZWN0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmVkaXJlY3QgPSB7IHBhdGg6IHJlZGlyZWN0IH07XG4gICAgfVxuXG4gICAgaWYgKCFyZWRpcmVjdCB8fCB0eXBlb2YgcmVkaXJlY3QgIT09ICdvYmplY3QnKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAgIGZhbHNlLCAoXCJpbnZhbGlkIHJlZGlyZWN0IG9wdGlvbjogXCIgKyAoSlNPTi5zdHJpbmdpZnkocmVkaXJlY3QpKSlcbiAgICAgICk7XG4gICAgICByZXR1cm4gX2NyZWF0ZVJvdXRlKG51bGwsIGxvY2F0aW9uKVxuICAgIH1cblxuICAgIHZhciByZSA9IHJlZGlyZWN0O1xuICAgIHZhciBuYW1lID0gcmUubmFtZTtcbiAgICB2YXIgcGF0aCA9IHJlLnBhdGg7XG4gICAgdmFyIHF1ZXJ5ID0gbG9jYXRpb24ucXVlcnk7XG4gICAgdmFyIGhhc2ggPSBsb2NhdGlvbi5oYXNoO1xuICAgIHZhciBwYXJhbXMgPSBsb2NhdGlvbi5wYXJhbXM7XG4gICAgcXVlcnkgPSByZS5oYXNPd25Qcm9wZXJ0eSgncXVlcnknKSA/IHJlLnF1ZXJ5IDogcXVlcnk7XG4gICAgaGFzaCA9IHJlLmhhc093blByb3BlcnR5KCdoYXNoJykgPyByZS5oYXNoIDogaGFzaDtcbiAgICBwYXJhbXMgPSByZS5oYXNPd25Qcm9wZXJ0eSgncGFyYW1zJykgPyByZS5wYXJhbXMgOiBwYXJhbXM7XG5cbiAgICBpZiAobmFtZSkge1xuICAgICAgLy8gcmVzb2x2ZWQgbmFtZWQgZGlyZWN0XG4gICAgICB2YXIgdGFyZ2V0UmVjb3JkID0gbmFtZU1hcFtuYW1lXTtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGFzc2VydCh0YXJnZXRSZWNvcmQsIChcInJlZGlyZWN0IGZhaWxlZDogbmFtZWQgcm91dGUgXFxcIlwiICsgbmFtZSArIFwiXFxcIiBub3QgZm91bmQuXCIpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaCh7XG4gICAgICAgIF9ub3JtYWxpemVkOiB0cnVlLFxuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgIGhhc2g6IGhhc2gsXG4gICAgICAgIHBhcmFtczogcGFyYW1zXG4gICAgICB9LCB1bmRlZmluZWQsIGxvY2F0aW9uKVxuICAgIH0gZWxzZSBpZiAocGF0aCkge1xuICAgICAgLy8gMS4gcmVzb2x2ZSByZWxhdGl2ZSByZWRpcmVjdFxuICAgICAgdmFyIHJhd1BhdGggPSByZXNvbHZlUmVjb3JkUGF0aChwYXRoLCByZWNvcmQpO1xuICAgICAgLy8gMi4gcmVzb2x2ZSBwYXJhbXNcbiAgICAgIHZhciByZXNvbHZlZFBhdGggPSBmaWxsUGFyYW1zKHJhd1BhdGgsIHBhcmFtcywgKFwicmVkaXJlY3Qgcm91dGUgd2l0aCBwYXRoIFxcXCJcIiArIHJhd1BhdGggKyBcIlxcXCJcIikpO1xuICAgICAgLy8gMy4gcmVtYXRjaCB3aXRoIGV4aXN0aW5nIHF1ZXJ5IGFuZCBoYXNoXG4gICAgICByZXR1cm4gbWF0Y2goe1xuICAgICAgICBfbm9ybWFsaXplZDogdHJ1ZSxcbiAgICAgICAgcGF0aDogcmVzb2x2ZWRQYXRoLFxuICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgIGhhc2g6IGhhc2hcbiAgICAgIH0sIHVuZGVmaW5lZCwgbG9jYXRpb24pXG4gICAgfSBlbHNlIHtcbiAgICAgIHdhcm4oZmFsc2UsIChcImludmFsaWQgcmVkaXJlY3Qgb3B0aW9uOiBcIiArIChKU09OLnN0cmluZ2lmeShyZWRpcmVjdCkpKSk7XG4gICAgICByZXR1cm4gX2NyZWF0ZVJvdXRlKG51bGwsIGxvY2F0aW9uKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFsaWFzIChcbiAgICByZWNvcmQsXG4gICAgbG9jYXRpb24sXG4gICAgbWF0Y2hBc1xuICApIHtcbiAgICB2YXIgYWxpYXNlZFBhdGggPSBmaWxsUGFyYW1zKG1hdGNoQXMsIGxvY2F0aW9uLnBhcmFtcywgKFwiYWxpYXNlZCByb3V0ZSB3aXRoIHBhdGggXFxcIlwiICsgbWF0Y2hBcyArIFwiXFxcIlwiKSk7XG4gICAgdmFyIGFsaWFzZWRNYXRjaCA9IG1hdGNoKHtcbiAgICAgIF9ub3JtYWxpemVkOiB0cnVlLFxuICAgICAgcGF0aDogYWxpYXNlZFBhdGhcbiAgICB9KTtcbiAgICBpZiAoYWxpYXNlZE1hdGNoKSB7XG4gICAgICB2YXIgbWF0Y2hlZCA9IGFsaWFzZWRNYXRjaC5tYXRjaGVkO1xuICAgICAgdmFyIGFsaWFzZWRSZWNvcmQgPSBtYXRjaGVkW21hdGNoZWQubGVuZ3RoIC0gMV07XG4gICAgICBsb2NhdGlvbi5wYXJhbXMgPSBhbGlhc2VkTWF0Y2gucGFyYW1zO1xuICAgICAgcmV0dXJuIF9jcmVhdGVSb3V0ZShhbGlhc2VkUmVjb3JkLCBsb2NhdGlvbilcbiAgICB9XG4gICAgcmV0dXJuIF9jcmVhdGVSb3V0ZShudWxsLCBsb2NhdGlvbilcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jcmVhdGVSb3V0ZSAoXG4gICAgcmVjb3JkLFxuICAgIGxvY2F0aW9uLFxuICAgIHJlZGlyZWN0ZWRGcm9tXG4gICkge1xuICAgIGlmIChyZWNvcmQgJiYgcmVjb3JkLnJlZGlyZWN0KSB7XG4gICAgICByZXR1cm4gcmVkaXJlY3QocmVjb3JkLCByZWRpcmVjdGVkRnJvbSB8fCBsb2NhdGlvbilcbiAgICB9XG4gICAgaWYgKHJlY29yZCAmJiByZWNvcmQubWF0Y2hBcykge1xuICAgICAgcmV0dXJuIGFsaWFzKHJlY29yZCwgbG9jYXRpb24sIHJlY29yZC5tYXRjaEFzKVxuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlUm91dGUocmVjb3JkLCBsb2NhdGlvbiwgcmVkaXJlY3RlZEZyb20pXG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1hdGNoOiBtYXRjaCxcbiAgICBhZGRSb3V0ZXM6IGFkZFJvdXRlc1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hdGNoUm91dGUgKFxuICBwYXRoLFxuICBwYXJhbXMsXG4gIHBhdGhuYW1lXG4pIHtcbiAgdmFyIHJlZiA9IGdldFJvdXRlUmVnZXgocGF0aCk7XG4gIHZhciByZWdleHAgPSByZWYucmVnZXhwO1xuICB2YXIga2V5cyA9IHJlZi5rZXlzO1xuICB2YXIgbSA9IHBhdGhuYW1lLm1hdGNoKHJlZ2V4cCk7XG5cbiAgaWYgKCFtKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH0gZWxzZSBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBmb3IgKHZhciBpID0gMSwgbGVuID0gbS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIHZhciBrZXkgPSBrZXlzW2kgLSAxXTtcbiAgICB2YXIgdmFsID0gdHlwZW9mIG1baV0gPT09ICdzdHJpbmcnID8gZGVjb2RlVVJJQ29tcG9uZW50KG1baV0pIDogbVtpXTtcbiAgICBpZiAoa2V5KSB7IHBhcmFtc1trZXkubmFtZV0gPSB2YWw7IH1cbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIHJlc29sdmVSZWNvcmRQYXRoIChwYXRoLCByZWNvcmQpIHtcbiAgcmV0dXJuIHJlc29sdmVQYXRoKHBhdGgsIHJlY29yZC5wYXJlbnQgPyByZWNvcmQucGFyZW50LnBhdGggOiAnLycsIHRydWUpXG59XG5cbi8qICAqL1xuXG5cbnZhciBwb3NpdGlvblN0b3JlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuZnVuY3Rpb24gc2V0dXBTY3JvbGwgKCkge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBmdW5jdGlvbiAoZSkge1xuICAgIHNhdmVTY3JvbGxQb3NpdGlvbigpO1xuICAgIGlmIChlLnN0YXRlICYmIGUuc3RhdGUua2V5KSB7XG4gICAgICBzZXRTdGF0ZUtleShlLnN0YXRlLmtleSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlU2Nyb2xsIChcbiAgcm91dGVyLFxuICB0byxcbiAgZnJvbSxcbiAgaXNQb3Bcbikge1xuICBpZiAoIXJvdXRlci5hcHApIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBiZWhhdmlvciA9IHJvdXRlci5vcHRpb25zLnNjcm9sbEJlaGF2aW9yO1xuICBpZiAoIWJlaGF2aW9yKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGFzc2VydCh0eXBlb2YgYmVoYXZpb3IgPT09ICdmdW5jdGlvbicsIFwic2Nyb2xsQmVoYXZpb3IgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgLy8gd2FpdCB1bnRpbCByZS1yZW5kZXIgZmluaXNoZXMgYmVmb3JlIHNjcm9sbGluZ1xuICByb3V0ZXIuYXBwLiRuZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBvc2l0aW9uID0gZ2V0U2Nyb2xsUG9zaXRpb24oKTtcbiAgICB2YXIgc2hvdWxkU2Nyb2xsID0gYmVoYXZpb3IodG8sIGZyb20sIGlzUG9wID8gcG9zaXRpb24gOiBudWxsKTtcbiAgICBpZiAoIXNob3VsZFNjcm9sbCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHZhciBpc09iamVjdCA9IHR5cGVvZiBzaG91bGRTY3JvbGwgPT09ICdvYmplY3QnO1xuICAgIGlmIChpc09iamVjdCAmJiB0eXBlb2Ygc2hvdWxkU2Nyb2xsLnNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgdmFyIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzaG91bGRTY3JvbGwuc2VsZWN0b3IpO1xuICAgICAgaWYgKGVsKSB7XG4gICAgICAgIHBvc2l0aW9uID0gZ2V0RWxlbWVudFBvc2l0aW9uKGVsKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNWYWxpZFBvc2l0aW9uKHNob3VsZFNjcm9sbCkpIHtcbiAgICAgICAgcG9zaXRpb24gPSBub3JtYWxpemVQb3NpdGlvbihzaG91bGRTY3JvbGwpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QgJiYgaXNWYWxpZFBvc2l0aW9uKHNob3VsZFNjcm9sbCkpIHtcbiAgICAgIHBvc2l0aW9uID0gbm9ybWFsaXplUG9zaXRpb24oc2hvdWxkU2Nyb2xsKTtcbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyhwb3NpdGlvbi54LCBwb3NpdGlvbi55KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzYXZlU2Nyb2xsUG9zaXRpb24gKCkge1xuICB2YXIga2V5ID0gZ2V0U3RhdGVLZXkoKTtcbiAgaWYgKGtleSkge1xuICAgIHBvc2l0aW9uU3RvcmVba2V5XSA9IHtcbiAgICAgIHg6IHdpbmRvdy5wYWdlWE9mZnNldCxcbiAgICAgIHk6IHdpbmRvdy5wYWdlWU9mZnNldFxuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0U2Nyb2xsUG9zaXRpb24gKCkge1xuICB2YXIga2V5ID0gZ2V0U3RhdGVLZXkoKTtcbiAgaWYgKGtleSkge1xuICAgIHJldHVybiBwb3NpdGlvblN0b3JlW2tleV1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRFbGVtZW50UG9zaXRpb24gKGVsKSB7XG4gIHZhciBkb2NSZWN0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgZWxSZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIHJldHVybiB7XG4gICAgeDogZWxSZWN0LmxlZnQgLSBkb2NSZWN0LmxlZnQsXG4gICAgeTogZWxSZWN0LnRvcCAtIGRvY1JlY3QudG9wXG4gIH1cbn1cblxuZnVuY3Rpb24gaXNWYWxpZFBvc2l0aW9uIChvYmopIHtcbiAgcmV0dXJuIGlzTnVtYmVyKG9iai54KSB8fCBpc051bWJlcihvYmoueSlcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplUG9zaXRpb24gKG9iaikge1xuICByZXR1cm4ge1xuICAgIHg6IGlzTnVtYmVyKG9iai54KSA/IG9iai54IDogd2luZG93LnBhZ2VYT2Zmc2V0LFxuICAgIHk6IGlzTnVtYmVyKG9iai55KSA/IG9iai55IDogd2luZG93LnBhZ2VZT2Zmc2V0XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIgKHYpIHtcbiAgcmV0dXJuIHR5cGVvZiB2ID09PSAnbnVtYmVyJ1xufVxuXG4vKiAgKi9cblxudmFyIHN1cHBvcnRzUHVzaFN0YXRlID0gaW5Ccm93c2VyICYmIChmdW5jdGlvbiAoKSB7XG4gIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuXG4gIGlmIChcbiAgICAodWEuaW5kZXhPZignQW5kcm9pZCAyLicpICE9PSAtMSB8fCB1YS5pbmRleE9mKCdBbmRyb2lkIDQuMCcpICE9PSAtMSkgJiZcbiAgICB1YS5pbmRleE9mKCdNb2JpbGUgU2FmYXJpJykgIT09IC0xICYmXG4gICAgdWEuaW5kZXhPZignQ2hyb21lJykgPT09IC0xICYmXG4gICAgdWEuaW5kZXhPZignV2luZG93cyBQaG9uZScpID09PSAtMVxuICApIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiB3aW5kb3cuaGlzdG9yeSAmJiAncHVzaFN0YXRlJyBpbiB3aW5kb3cuaGlzdG9yeVxufSkoKTtcblxuLy8gdXNlIFVzZXIgVGltaW5nIGFwaSAoaWYgcHJlc2VudCkgZm9yIG1vcmUgYWNjdXJhdGUga2V5IHByZWNpc2lvblxudmFyIFRpbWUgPSBpbkJyb3dzZXIgJiYgd2luZG93LnBlcmZvcm1hbmNlICYmIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3dcbiAgPyB3aW5kb3cucGVyZm9ybWFuY2VcbiAgOiBEYXRlO1xuXG52YXIgX2tleSA9IGdlbktleSgpO1xuXG5mdW5jdGlvbiBnZW5LZXkgKCkge1xuICByZXR1cm4gVGltZS5ub3coKS50b0ZpeGVkKDMpXG59XG5cbmZ1bmN0aW9uIGdldFN0YXRlS2V5ICgpIHtcbiAgcmV0dXJuIF9rZXlcbn1cblxuZnVuY3Rpb24gc2V0U3RhdGVLZXkgKGtleSkge1xuICBfa2V5ID0ga2V5O1xufVxuXG5mdW5jdGlvbiBwdXNoU3RhdGUgKHVybCwgcmVwbGFjZSkge1xuICBzYXZlU2Nyb2xsUG9zaXRpb24oKTtcbiAgLy8gdHJ5Li4uY2F0Y2ggdGhlIHB1c2hTdGF0ZSBjYWxsIHRvIGdldCBhcm91bmQgU2FmYXJpXG4gIC8vIERPTSBFeGNlcHRpb24gMTggd2hlcmUgaXQgbGltaXRzIHRvIDEwMCBwdXNoU3RhdGUgY2FsbHNcbiAgdmFyIGhpc3RvcnkgPSB3aW5kb3cuaGlzdG9yeTtcbiAgdHJ5IHtcbiAgICBpZiAocmVwbGFjZSkge1xuICAgICAgaGlzdG9yeS5yZXBsYWNlU3RhdGUoeyBrZXk6IF9rZXkgfSwgJycsIHVybCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIF9rZXkgPSBnZW5LZXkoKTtcbiAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHsga2V5OiBfa2V5IH0sICcnLCB1cmwpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIHdpbmRvdy5sb2NhdGlvbltyZXBsYWNlID8gJ3JlcGxhY2UnIDogJ2Fzc2lnbiddKHVybCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVwbGFjZVN0YXRlICh1cmwpIHtcbiAgcHVzaFN0YXRlKHVybCwgdHJ1ZSk7XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBydW5RdWV1ZSAocXVldWUsIGZuLCBjYikge1xuICB2YXIgc3RlcCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIGlmIChpbmRleCA+PSBxdWV1ZS5sZW5ndGgpIHtcbiAgICAgIGNiKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChxdWV1ZVtpbmRleF0pIHtcbiAgICAgICAgZm4ocXVldWVbaW5kZXhdLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc3RlcChpbmRleCArIDEpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ZXAoaW5kZXggKyAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHN0ZXAoMCk7XG59XG5cbi8qICAqL1xuXG5cbnZhciBIaXN0b3J5ID0gZnVuY3Rpb24gSGlzdG9yeSAocm91dGVyLCBiYXNlKSB7XG4gIHRoaXMucm91dGVyID0gcm91dGVyO1xuICB0aGlzLmJhc2UgPSBub3JtYWxpemVCYXNlKGJhc2UpO1xuICAvLyBzdGFydCB3aXRoIGEgcm91dGUgb2JqZWN0IHRoYXQgc3RhbmRzIGZvciBcIm5vd2hlcmVcIlxuICB0aGlzLmN1cnJlbnQgPSBTVEFSVDtcbiAgdGhpcy5wZW5kaW5nID0gbnVsbDtcbiAgdGhpcy5yZWFkeSA9IGZhbHNlO1xuICB0aGlzLnJlYWR5Q2JzID0gW107XG59O1xuXG5IaXN0b3J5LnByb3RvdHlwZS5saXN0ZW4gPSBmdW5jdGlvbiBsaXN0ZW4gKGNiKSB7XG4gIHRoaXMuY2IgPSBjYjtcbn07XG5cbkhpc3RvcnkucHJvdG90eXBlLm9uUmVhZHkgPSBmdW5jdGlvbiBvblJlYWR5IChjYikge1xuICBpZiAodGhpcy5yZWFkeSkge1xuICAgIGNiKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5yZWFkeUNicy5wdXNoKGNiKTtcbiAgfVxufTtcblxuSGlzdG9yeS5wcm90b3R5cGUudHJhbnNpdGlvblRvID0gZnVuY3Rpb24gdHJhbnNpdGlvblRvIChsb2NhdGlvbiwgb25Db21wbGV0ZSwgb25BYm9ydCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHZhciByb3V0ZSA9IHRoaXMucm91dGVyLm1hdGNoKGxvY2F0aW9uLCB0aGlzLmN1cnJlbnQpO1xuICB0aGlzLmNvbmZpcm1UcmFuc2l0aW9uKHJvdXRlLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcyQxLnVwZGF0ZVJvdXRlKHJvdXRlKTtcbiAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUocm91dGUpO1xuICAgIHRoaXMkMS5lbnN1cmVVUkwoKTtcblxuICAgIC8vIGZpcmUgcmVhZHkgY2JzIG9uY2VcbiAgICBpZiAoIXRoaXMkMS5yZWFkeSkge1xuICAgICAgdGhpcyQxLnJlYWR5ID0gdHJ1ZTtcbiAgICAgIHRoaXMkMS5yZWFkeUNicy5mb3JFYWNoKGZ1bmN0aW9uIChjYikge1xuICAgICAgICBjYihyb3V0ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIG9uQWJvcnQpO1xufTtcblxuSGlzdG9yeS5wcm90b3R5cGUuY29uZmlybVRyYW5zaXRpb24gPSBmdW5jdGlvbiBjb25maXJtVHJhbnNpdGlvbiAocm91dGUsIG9uQ29tcGxldGUsIG9uQWJvcnQpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgY3VycmVudCA9IHRoaXMuY3VycmVudDtcbiAgdmFyIGFib3J0ID0gZnVuY3Rpb24gKCkgeyBvbkFib3J0ICYmIG9uQWJvcnQoKTsgfTtcbiAgaWYgKFxuICAgIGlzU2FtZVJvdXRlKHJvdXRlLCBjdXJyZW50KSAmJlxuICAgIC8vIGluIHRoZSBjYXNlIHRoZSByb3V0ZSBtYXAgaGFzIGJlZW4gZHluYW1pY2FsbHkgYXBwZW5kZWQgdG9cbiAgICByb3V0ZS5tYXRjaGVkLmxlbmd0aCA9PT0gY3VycmVudC5tYXRjaGVkLmxlbmd0aFxuICApIHtcbiAgICB0aGlzLmVuc3VyZVVSTCgpO1xuICAgIHJldHVybiBhYm9ydCgpXG4gIH1cblxuICB2YXIgcmVmID0gcmVzb2x2ZVF1ZXVlKHRoaXMuY3VycmVudC5tYXRjaGVkLCByb3V0ZS5tYXRjaGVkKTtcbiAgICB2YXIgdXBkYXRlZCA9IHJlZi51cGRhdGVkO1xuICAgIHZhciBkZWFjdGl2YXRlZCA9IHJlZi5kZWFjdGl2YXRlZDtcbiAgICB2YXIgYWN0aXZhdGVkID0gcmVmLmFjdGl2YXRlZDtcblxuICB2YXIgcXVldWUgPSBbXS5jb25jYXQoXG4gICAgLy8gaW4tY29tcG9uZW50IGxlYXZlIGd1YXJkc1xuICAgIGV4dHJhY3RMZWF2ZUd1YXJkcyhkZWFjdGl2YXRlZCksXG4gICAgLy8gZ2xvYmFsIGJlZm9yZSBob29rc1xuICAgIHRoaXMucm91dGVyLmJlZm9yZUhvb2tzLFxuICAgIC8vIGluLWNvbXBvbmVudCB1cGRhdGUgaG9va3NcbiAgICBleHRyYWN0VXBkYXRlSG9va3ModXBkYXRlZCksXG4gICAgLy8gaW4tY29uZmlnIGVudGVyIGd1YXJkc1xuICAgIGFjdGl2YXRlZC5tYXAoZnVuY3Rpb24gKG0pIHsgcmV0dXJuIG0uYmVmb3JlRW50ZXI7IH0pLFxuICAgIC8vIGFzeW5jIGNvbXBvbmVudHNcbiAgICByZXNvbHZlQXN5bmNDb21wb25lbnRzKGFjdGl2YXRlZClcbiAgKTtcblxuICB0aGlzLnBlbmRpbmcgPSByb3V0ZTtcbiAgdmFyIGl0ZXJhdG9yID0gZnVuY3Rpb24gKGhvb2ssIG5leHQpIHtcbiAgICBpZiAodGhpcyQxLnBlbmRpbmcgIT09IHJvdXRlKSB7XG4gICAgICByZXR1cm4gYWJvcnQoKVxuICAgIH1cbiAgICBob29rKHJvdXRlLCBjdXJyZW50LCBmdW5jdGlvbiAodG8pIHtcbiAgICAgIGlmICh0byA9PT0gZmFsc2UpIHtcbiAgICAgICAgLy8gbmV4dChmYWxzZSkgLT4gYWJvcnQgbmF2aWdhdGlvbiwgZW5zdXJlIGN1cnJlbnQgVVJMXG4gICAgICAgIHRoaXMkMS5lbnN1cmVVUkwodHJ1ZSk7XG4gICAgICAgIGFib3J0KCk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0byA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHRvID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBuZXh0KCcvJykgb3IgbmV4dCh7IHBhdGg6ICcvJyB9KSAtPiByZWRpcmVjdFxuICAgICAgICAodHlwZW9mIHRvID09PSAnb2JqZWN0JyAmJiB0by5yZXBsYWNlKSA/IHRoaXMkMS5yZXBsYWNlKHRvKSA6IHRoaXMkMS5wdXNoKHRvKTtcbiAgICAgICAgYWJvcnQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGNvbmZpcm0gdHJhbnNpdGlvbiBhbmQgcGFzcyBvbiB0aGUgdmFsdWVcbiAgICAgICAgbmV4dCh0byk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgcnVuUXVldWUocXVldWUsIGl0ZXJhdG9yLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBvc3RFbnRlckNicyA9IFtdO1xuICAgIHZhciBpc1ZhbGlkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcyQxLmN1cnJlbnQgPT09IHJvdXRlOyB9O1xuICAgIHZhciBlbnRlckd1YXJkcyA9IGV4dHJhY3RFbnRlckd1YXJkcyhhY3RpdmF0ZWQsIHBvc3RFbnRlckNicywgaXNWYWxpZCk7XG4gICAgLy8gd2FpdCB1bnRpbCBhc3luYyBjb21wb25lbnRzIGFyZSByZXNvbHZlZCBiZWZvcmVcbiAgICAvLyBleHRyYWN0aW5nIGluLWNvbXBvbmVudCBlbnRlciBndWFyZHNcbiAgICBydW5RdWV1ZShlbnRlckd1YXJkcywgaXRlcmF0b3IsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzJDEucGVuZGluZyAhPT0gcm91dGUpIHtcbiAgICAgICAgcmV0dXJuIGFib3J0KClcbiAgICAgIH1cbiAgICAgIHRoaXMkMS5wZW5kaW5nID0gbnVsbDtcbiAgICAgIG9uQ29tcGxldGUocm91dGUpO1xuICAgICAgaWYgKHRoaXMkMS5yb3V0ZXIuYXBwKSB7XG4gICAgICAgIHRoaXMkMS5yb3V0ZXIuYXBwLiRuZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcG9zdEVudGVyQ2JzLmZvckVhY2goZnVuY3Rpb24gKGNiKSB7IHJldHVybiBjYigpOyB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufTtcblxuSGlzdG9yeS5wcm90b3R5cGUudXBkYXRlUm91dGUgPSBmdW5jdGlvbiB1cGRhdGVSb3V0ZSAocm91dGUpIHtcbiAgdmFyIHByZXYgPSB0aGlzLmN1cnJlbnQ7XG4gIHRoaXMuY3VycmVudCA9IHJvdXRlO1xuICB0aGlzLmNiICYmIHRoaXMuY2Iocm91dGUpO1xuICB0aGlzLnJvdXRlci5hZnRlckhvb2tzLmZvckVhY2goZnVuY3Rpb24gKGhvb2spIHtcbiAgICBob29rICYmIGhvb2socm91dGUsIHByZXYpO1xuICB9KTtcbn07XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUJhc2UgKGJhc2UpIHtcbiAgaWYgKCFiYXNlKSB7XG4gICAgaWYgKGluQnJvd3Nlcikge1xuICAgICAgLy8gcmVzcGVjdCA8YmFzZT4gdGFnXG4gICAgICB2YXIgYmFzZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYmFzZScpO1xuICAgICAgYmFzZSA9IGJhc2VFbCA/IGJhc2VFbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSA6ICcvJztcbiAgICB9IGVsc2Uge1xuICAgICAgYmFzZSA9ICcvJztcbiAgICB9XG4gIH1cbiAgLy8gbWFrZSBzdXJlIHRoZXJlJ3MgdGhlIHN0YXJ0aW5nIHNsYXNoXG4gIGlmIChiYXNlLmNoYXJBdCgwKSAhPT0gJy8nKSB7XG4gICAgYmFzZSA9ICcvJyArIGJhc2U7XG4gIH1cbiAgLy8gcmVtb3ZlIHRyYWlsaW5nIHNsYXNoXG4gIHJldHVybiBiYXNlLnJlcGxhY2UoL1xcLyQvLCAnJylcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVF1ZXVlIChcbiAgY3VycmVudCxcbiAgbmV4dFxuKSB7XG4gIHZhciBpO1xuICB2YXIgbWF4ID0gTWF0aC5tYXgoY3VycmVudC5sZW5ndGgsIG5leHQubGVuZ3RoKTtcbiAgZm9yIChpID0gMDsgaSA8IG1heDsgaSsrKSB7XG4gICAgaWYgKGN1cnJlbnRbaV0gIT09IG5leHRbaV0pIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIHJldHVybiB7XG4gICAgdXBkYXRlZDogbmV4dC5zbGljZSgwLCBpKSxcbiAgICBhY3RpdmF0ZWQ6IG5leHQuc2xpY2UoaSksXG4gICAgZGVhY3RpdmF0ZWQ6IGN1cnJlbnQuc2xpY2UoaSlcbiAgfVxufVxuXG5mdW5jdGlvbiBleHRyYWN0R3VhcmRzIChcbiAgcmVjb3JkcyxcbiAgbmFtZSxcbiAgYmluZCxcbiAgcmV2ZXJzZVxuKSB7XG4gIHZhciBndWFyZHMgPSBmbGF0TWFwQ29tcG9uZW50cyhyZWNvcmRzLCBmdW5jdGlvbiAoZGVmLCBpbnN0YW5jZSwgbWF0Y2gsIGtleSkge1xuICAgIHZhciBndWFyZCA9IGV4dHJhY3RHdWFyZChkZWYsIG5hbWUpO1xuICAgIGlmIChndWFyZCkge1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoZ3VhcmQpXG4gICAgICAgID8gZ3VhcmQubWFwKGZ1bmN0aW9uIChndWFyZCkgeyByZXR1cm4gYmluZChndWFyZCwgaW5zdGFuY2UsIG1hdGNoLCBrZXkpOyB9KVxuICAgICAgICA6IGJpbmQoZ3VhcmQsIGluc3RhbmNlLCBtYXRjaCwga2V5KVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBmbGF0dGVuKHJldmVyc2UgPyBndWFyZHMucmV2ZXJzZSgpIDogZ3VhcmRzKVxufVxuXG5mdW5jdGlvbiBleHRyYWN0R3VhcmQgKFxuICBkZWYsXG4gIGtleVxuKSB7XG4gIGlmICh0eXBlb2YgZGVmICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gZXh0ZW5kIG5vdyBzbyB0aGF0IGdsb2JhbCBtaXhpbnMgYXJlIGFwcGxpZWQuXG4gICAgZGVmID0gX1Z1ZS5leHRlbmQoZGVmKTtcbiAgfVxuICByZXR1cm4gZGVmLm9wdGlvbnNba2V5XVxufVxuXG5mdW5jdGlvbiBleHRyYWN0TGVhdmVHdWFyZHMgKGRlYWN0aXZhdGVkKSB7XG4gIHJldHVybiBleHRyYWN0R3VhcmRzKGRlYWN0aXZhdGVkLCAnYmVmb3JlUm91dGVMZWF2ZScsIGJpbmRHdWFyZCwgdHJ1ZSlcbn1cblxuZnVuY3Rpb24gZXh0cmFjdFVwZGF0ZUhvb2tzICh1cGRhdGVkKSB7XG4gIHJldHVybiBleHRyYWN0R3VhcmRzKHVwZGF0ZWQsICdiZWZvcmVSb3V0ZVVwZGF0ZScsIGJpbmRHdWFyZClcbn1cblxuZnVuY3Rpb24gYmluZEd1YXJkIChndWFyZCwgaW5zdGFuY2UpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGJvdW5kUm91dGVHdWFyZCAoKSB7XG4gICAgcmV0dXJuIGd1YXJkLmFwcGx5KGluc3RhbmNlLCBhcmd1bWVudHMpXG4gIH1cbn1cblxuZnVuY3Rpb24gZXh0cmFjdEVudGVyR3VhcmRzIChcbiAgYWN0aXZhdGVkLFxuICBjYnMsXG4gIGlzVmFsaWRcbikge1xuICByZXR1cm4gZXh0cmFjdEd1YXJkcyhhY3RpdmF0ZWQsICdiZWZvcmVSb3V0ZUVudGVyJywgZnVuY3Rpb24gKGd1YXJkLCBfLCBtYXRjaCwga2V5KSB7XG4gICAgcmV0dXJuIGJpbmRFbnRlckd1YXJkKGd1YXJkLCBtYXRjaCwga2V5LCBjYnMsIGlzVmFsaWQpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGJpbmRFbnRlckd1YXJkIChcbiAgZ3VhcmQsXG4gIG1hdGNoLFxuICBrZXksXG4gIGNicyxcbiAgaXNWYWxpZFxuKSB7XG4gIHJldHVybiBmdW5jdGlvbiByb3V0ZUVudGVyR3VhcmQgKHRvLCBmcm9tLCBuZXh0KSB7XG4gICAgcmV0dXJuIGd1YXJkKHRvLCBmcm9tLCBmdW5jdGlvbiAoY2IpIHtcbiAgICAgIG5leHQoY2IpO1xuICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBjYnMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gIzc1MFxuICAgICAgICAgIC8vIGlmIGEgcm91dGVyLXZpZXcgaXMgd3JhcHBlZCB3aXRoIGFuIG91dC1pbiB0cmFuc2l0aW9uLFxuICAgICAgICAgIC8vIHRoZSBpbnN0YW5jZSBtYXkgbm90IGhhdmUgYmVlbiByZWdpc3RlcmVkIGF0IHRoaXMgdGltZS5cbiAgICAgICAgICAvLyB3ZSB3aWxsIG5lZWQgdG8gcG9sbCBmb3IgcmVnaXN0cmF0aW9uIHVudGlsIGN1cnJlbnQgcm91dGVcbiAgICAgICAgICAvLyBpcyBubyBsb25nZXIgdmFsaWQuXG4gICAgICAgICAgcG9sbChjYiwgbWF0Y2guaW5zdGFuY2VzLCBrZXksIGlzVmFsaWQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHBvbGwgKFxuICBjYiwgLy8gc29tZWhvdyBmbG93IGNhbm5vdCBpbmZlciB0aGlzIGlzIGEgZnVuY3Rpb25cbiAgaW5zdGFuY2VzLFxuICBrZXksXG4gIGlzVmFsaWRcbikge1xuICBpZiAoaW5zdGFuY2VzW2tleV0pIHtcbiAgICBjYihpbnN0YW5jZXNba2V5XSk7XG4gIH0gZWxzZSBpZiAoaXNWYWxpZCgpKSB7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBwb2xsKGNiLCBpbnN0YW5jZXMsIGtleSwgaXNWYWxpZCk7XG4gICAgfSwgMTYpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVBc3luY0NvbXBvbmVudHMgKG1hdGNoZWQpIHtcbiAgcmV0dXJuIGZsYXRNYXBDb21wb25lbnRzKG1hdGNoZWQsIGZ1bmN0aW9uIChkZWYsIF8sIG1hdGNoLCBrZXkpIHtcbiAgICAvLyBpZiBpdCdzIGEgZnVuY3Rpb24gYW5kIGRvZXNuJ3QgaGF2ZSBWdWUgb3B0aW9ucyBhdHRhY2hlZCxcbiAgICAvLyBhc3N1bWUgaXQncyBhbiBhc3luYyBjb21wb25lbnQgcmVzb2x2ZSBmdW5jdGlvbi5cbiAgICAvLyB3ZSBhcmUgbm90IHVzaW5nIFZ1ZSdzIGRlZmF1bHQgYXN5bmMgcmVzb2x2aW5nIG1lY2hhbmlzbSBiZWNhdXNlXG4gICAgLy8gd2Ugd2FudCB0byBoYWx0IHRoZSBuYXZpZ2F0aW9uIHVudGlsIHRoZSBpbmNvbWluZyBjb21wb25lbnQgaGFzIGJlZW5cbiAgICAvLyByZXNvbHZlZC5cbiAgICBpZiAodHlwZW9mIGRlZiA9PT0gJ2Z1bmN0aW9uJyAmJiAhZGVmLm9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAodG8sIGZyb20sIG5leHQpIHtcbiAgICAgICAgdmFyIHJlc29sdmUgPSBvbmNlKGZ1bmN0aW9uIChyZXNvbHZlZERlZikge1xuICAgICAgICAgIG1hdGNoLmNvbXBvbmVudHNba2V5XSA9IHJlc29sdmVkRGVmO1xuICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJlamVjdCA9IG9uY2UoZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICAgIHdhcm4oZmFsc2UsIChcIkZhaWxlZCB0byByZXNvbHZlIGFzeW5jIGNvbXBvbmVudCBcIiArIGtleSArIFwiOiBcIiArIHJlYXNvbikpO1xuICAgICAgICAgIG5leHQoZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgcmVzID0gZGVmKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIGlmIChyZXMgJiYgdHlwZW9mIHJlcy50aGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmVzLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gZmxhdE1hcENvbXBvbmVudHMgKFxuICBtYXRjaGVkLFxuICBmblxuKSB7XG4gIHJldHVybiBmbGF0dGVuKG1hdGNoZWQubWFwKGZ1bmN0aW9uIChtKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG0uY29tcG9uZW50cykubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGZuKFxuICAgICAgbS5jb21wb25lbnRzW2tleV0sXG4gICAgICBtLmluc3RhbmNlc1trZXldLFxuICAgICAgbSwga2V5XG4gICAgKTsgfSlcbiAgfSkpXG59XG5cbmZ1bmN0aW9uIGZsYXR0ZW4gKGFycikge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgYXJyKVxufVxuXG4vLyBpbiBXZWJwYWNrIDIsIHJlcXVpcmUuZW5zdXJlIG5vdyBhbHNvIHJldHVybnMgYSBQcm9taXNlXG4vLyBzbyB0aGUgcmVzb2x2ZS9yZWplY3QgZnVuY3Rpb25zIG1heSBnZXQgY2FsbGVkIGFuIGV4dHJhIHRpbWVcbi8vIGlmIHRoZSB1c2VyIHVzZXMgYW4gYXJyb3cgZnVuY3Rpb24gc2hvcnRoYW5kIHRoYXQgaGFwcGVucyB0b1xuLy8gcmV0dXJuIHRoYXQgUHJvbWlzZS5cbmZ1bmN0aW9uIG9uY2UgKGZuKSB7XG4gIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoY2FsbGVkKSB7IHJldHVybiB9XG4gICAgY2FsbGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICB9XG59XG5cbi8qICAqL1xuXG5cbnZhciBIVE1MNUhpc3RvcnkgPSAoZnVuY3Rpb24gKEhpc3RvcnkkJDEpIHtcbiAgZnVuY3Rpb24gSFRNTDVIaXN0b3J5IChyb3V0ZXIsIGJhc2UpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIEhpc3RvcnkkJDEuY2FsbCh0aGlzLCByb3V0ZXIsIGJhc2UpO1xuXG4gICAgdmFyIGV4cGVjdFNjcm9sbCA9IHJvdXRlci5vcHRpb25zLnNjcm9sbEJlaGF2aW9yO1xuXG4gICAgaWYgKGV4cGVjdFNjcm9sbCkge1xuICAgICAgc2V0dXBTY3JvbGwoKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdGhpcyQxLnRyYW5zaXRpb25UbyhnZXRMb2NhdGlvbih0aGlzJDEuYmFzZSksIGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgICAgICBpZiAoZXhwZWN0U2Nyb2xsKSB7XG4gICAgICAgICAgaGFuZGxlU2Nyb2xsKHJvdXRlciwgcm91dGUsIHRoaXMkMS5jdXJyZW50LCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoIEhpc3RvcnkkJDEgKSBIVE1MNUhpc3RvcnkuX19wcm90b19fID0gSGlzdG9yeSQkMTtcbiAgSFRNTDVIaXN0b3J5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEhpc3RvcnkkJDEgJiYgSGlzdG9yeSQkMS5wcm90b3R5cGUgKTtcbiAgSFRNTDVIaXN0b3J5LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEhUTUw1SGlzdG9yeTtcblxuICBIVE1MNUhpc3RvcnkucHJvdG90eXBlLmdvID0gZnVuY3Rpb24gZ28gKG4pIHtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbyhuKTtcbiAgfTtcblxuICBIVE1MNUhpc3RvcnkucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiBwdXNoIChsb2NhdGlvbiwgb25Db21wbGV0ZSwgb25BYm9ydCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdGhpcy50cmFuc2l0aW9uVG8obG9jYXRpb24sIGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgICAgcHVzaFN0YXRlKGNsZWFuUGF0aCh0aGlzJDEuYmFzZSArIHJvdXRlLmZ1bGxQYXRoKSk7XG4gICAgICBoYW5kbGVTY3JvbGwodGhpcyQxLnJvdXRlciwgcm91dGUsIHRoaXMkMS5jdXJyZW50LCBmYWxzZSk7XG4gICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUocm91dGUpO1xuICAgIH0sIG9uQWJvcnQpO1xuICB9O1xuXG4gIEhUTUw1SGlzdG9yeS5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIHJlcGxhY2UgKGxvY2F0aW9uLCBvbkNvbXBsZXRlLCBvbkFib3J0KSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB0aGlzLnRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICByZXBsYWNlU3RhdGUoY2xlYW5QYXRoKHRoaXMkMS5iYXNlICsgcm91dGUuZnVsbFBhdGgpKTtcbiAgICAgIGhhbmRsZVNjcm9sbCh0aGlzJDEucm91dGVyLCByb3V0ZSwgdGhpcyQxLmN1cnJlbnQsIGZhbHNlKTtcbiAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShyb3V0ZSk7XG4gICAgfSwgb25BYm9ydCk7XG4gIH07XG5cbiAgSFRNTDVIaXN0b3J5LnByb3RvdHlwZS5lbnN1cmVVUkwgPSBmdW5jdGlvbiBlbnN1cmVVUkwgKHB1c2gpIHtcbiAgICBpZiAoZ2V0TG9jYXRpb24odGhpcy5iYXNlKSAhPT0gdGhpcy5jdXJyZW50LmZ1bGxQYXRoKSB7XG4gICAgICB2YXIgY3VycmVudCA9IGNsZWFuUGF0aCh0aGlzLmJhc2UgKyB0aGlzLmN1cnJlbnQuZnVsbFBhdGgpO1xuICAgICAgcHVzaCA/IHB1c2hTdGF0ZShjdXJyZW50KSA6IHJlcGxhY2VTdGF0ZShjdXJyZW50KTtcbiAgICB9XG4gIH07XG5cbiAgSFRNTDVIaXN0b3J5LnByb3RvdHlwZS5nZXRDdXJyZW50TG9jYXRpb24gPSBmdW5jdGlvbiBnZXRDdXJyZW50TG9jYXRpb24gKCkge1xuICAgIHJldHVybiBnZXRMb2NhdGlvbih0aGlzLmJhc2UpXG4gIH07XG5cbiAgcmV0dXJuIEhUTUw1SGlzdG9yeTtcbn0oSGlzdG9yeSkpO1xuXG5mdW5jdGlvbiBnZXRMb2NhdGlvbiAoYmFzZSkge1xuICB2YXIgcGF0aCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgaWYgKGJhc2UgJiYgcGF0aC5pbmRleE9mKGJhc2UpID09PSAwKSB7XG4gICAgcGF0aCA9IHBhdGguc2xpY2UoYmFzZS5sZW5ndGgpO1xuICB9XG4gIHJldHVybiAocGF0aCB8fCAnLycpICsgd2luZG93LmxvY2F0aW9uLnNlYXJjaCArIHdpbmRvdy5sb2NhdGlvbi5oYXNoXG59XG5cbi8qICAqL1xuXG5cbnZhciBIYXNoSGlzdG9yeSA9IChmdW5jdGlvbiAoSGlzdG9yeSQkMSkge1xuICBmdW5jdGlvbiBIYXNoSGlzdG9yeSAocm91dGVyLCBiYXNlLCBmYWxsYmFjaykge1xuICAgIEhpc3RvcnkkJDEuY2FsbCh0aGlzLCByb3V0ZXIsIGJhc2UpO1xuICAgIC8vIGNoZWNrIGhpc3RvcnkgZmFsbGJhY2sgZGVlcGxpbmtpbmdcbiAgICBpZiAoZmFsbGJhY2sgJiYgY2hlY2tGYWxsYmFjayh0aGlzLmJhc2UpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgZW5zdXJlU2xhc2goKTtcbiAgfVxuXG4gIGlmICggSGlzdG9yeSQkMSApIEhhc2hIaXN0b3J5Ll9fcHJvdG9fXyA9IEhpc3RvcnkkJDE7XG4gIEhhc2hIaXN0b3J5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEhpc3RvcnkkJDEgJiYgSGlzdG9yeSQkMS5wcm90b3R5cGUgKTtcbiAgSGFzaEhpc3RvcnkucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSGFzaEhpc3Rvcnk7XG5cbiAgLy8gdGhpcyBpcyBkZWxheWVkIHVudGlsIHRoZSBhcHAgbW91bnRzXG4gIC8vIHRvIGF2b2lkIHRoZSBoYXNoY2hhbmdlIGxpc3RlbmVyIGJlaW5nIGZpcmVkIHRvbyBlYXJseVxuICBIYXNoSGlzdG9yeS5wcm90b3R5cGUuc2V0dXBMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXR1cExpc3RlbmVycyAoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghZW5zdXJlU2xhc2goKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHRoaXMkMS50cmFuc2l0aW9uVG8oZ2V0SGFzaCgpLCBmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgICAgcmVwbGFjZUhhc2gocm91dGUuZnVsbFBhdGgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgSGFzaEhpc3RvcnkucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiBwdXNoIChsb2NhdGlvbiwgb25Db21wbGV0ZSwgb25BYm9ydCkge1xuICAgIHRoaXMudHJhbnNpdGlvblRvKGxvY2F0aW9uLCBmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgIHB1c2hIYXNoKHJvdXRlLmZ1bGxQYXRoKTtcbiAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShyb3V0ZSk7XG4gICAgfSwgb25BYm9ydCk7XG4gIH07XG5cbiAgSGFzaEhpc3RvcnkucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiByZXBsYWNlIChsb2NhdGlvbiwgb25Db21wbGV0ZSwgb25BYm9ydCkge1xuICAgIHRoaXMudHJhbnNpdGlvblRvKGxvY2F0aW9uLCBmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgIHJlcGxhY2VIYXNoKHJvdXRlLmZ1bGxQYXRoKTtcbiAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShyb3V0ZSk7XG4gICAgfSwgb25BYm9ydCk7XG4gIH07XG5cbiAgSGFzaEhpc3RvcnkucHJvdG90eXBlLmdvID0gZnVuY3Rpb24gZ28gKG4pIHtcbiAgICB3aW5kb3cuaGlzdG9yeS5nbyhuKTtcbiAgfTtcblxuICBIYXNoSGlzdG9yeS5wcm90b3R5cGUuZW5zdXJlVVJMID0gZnVuY3Rpb24gZW5zdXJlVVJMIChwdXNoKSB7XG4gICAgdmFyIGN1cnJlbnQgPSB0aGlzLmN1cnJlbnQuZnVsbFBhdGg7XG4gICAgaWYgKGdldEhhc2goKSAhPT0gY3VycmVudCkge1xuICAgICAgcHVzaCA/IHB1c2hIYXNoKGN1cnJlbnQpIDogcmVwbGFjZUhhc2goY3VycmVudCk7XG4gICAgfVxuICB9O1xuXG4gIEhhc2hIaXN0b3J5LnByb3RvdHlwZS5nZXRDdXJyZW50TG9jYXRpb24gPSBmdW5jdGlvbiBnZXRDdXJyZW50TG9jYXRpb24gKCkge1xuICAgIHJldHVybiBnZXRIYXNoKClcbiAgfTtcblxuICByZXR1cm4gSGFzaEhpc3Rvcnk7XG59KEhpc3RvcnkpKTtcblxuZnVuY3Rpb24gY2hlY2tGYWxsYmFjayAoYmFzZSkge1xuICB2YXIgbG9jYXRpb24gPSBnZXRMb2NhdGlvbihiYXNlKTtcbiAgaWYgKCEvXlxcLyMvLnRlc3QobG9jYXRpb24pKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoXG4gICAgICBjbGVhblBhdGgoYmFzZSArICcvIycgKyBsb2NhdGlvbilcbiAgICApO1xuICAgIHJldHVybiB0cnVlXG4gIH1cbn1cblxuZnVuY3Rpb24gZW5zdXJlU2xhc2ggKCkge1xuICB2YXIgcGF0aCA9IGdldEhhc2goKTtcbiAgaWYgKHBhdGguY2hhckF0KDApID09PSAnLycpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIHJlcGxhY2VIYXNoKCcvJyArIHBhdGgpO1xuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gZ2V0SGFzaCAoKSB7XG4gIC8vIFdlIGNhbid0IHVzZSB3aW5kb3cubG9jYXRpb24uaGFzaCBoZXJlIGJlY2F1c2UgaXQncyBub3RcbiAgLy8gY29uc2lzdGVudCBhY3Jvc3MgYnJvd3NlcnMgLSBGaXJlZm94IHdpbGwgcHJlLWRlY29kZSBpdCFcbiAgdmFyIGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgdmFyIGluZGV4ID0gaHJlZi5pbmRleE9mKCcjJyk7XG4gIHJldHVybiBpbmRleCA9PT0gLTEgPyAnJyA6IGhyZWYuc2xpY2UoaW5kZXggKyAxKVxufVxuXG5mdW5jdGlvbiBwdXNoSGFzaCAocGF0aCkge1xuICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IHBhdGg7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VIYXNoIChwYXRoKSB7XG4gIHZhciBpID0gd2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignIycpO1xuICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZi5zbGljZSgwLCBpID49IDAgPyBpIDogMCkgKyAnIycgKyBwYXRoXG4gICk7XG59XG5cbi8qICAqL1xuXG5cbnZhciBBYnN0cmFjdEhpc3RvcnkgPSAoZnVuY3Rpb24gKEhpc3RvcnkkJDEpIHtcbiAgZnVuY3Rpb24gQWJzdHJhY3RIaXN0b3J5IChyb3V0ZXIsIGJhc2UpIHtcbiAgICBIaXN0b3J5JCQxLmNhbGwodGhpcywgcm91dGVyLCBiYXNlKTtcbiAgICB0aGlzLnN0YWNrID0gW107XG4gICAgdGhpcy5pbmRleCA9IC0xO1xuICB9XG5cbiAgaWYgKCBIaXN0b3J5JCQxICkgQWJzdHJhY3RIaXN0b3J5Ll9fcHJvdG9fXyA9IEhpc3RvcnkkJDE7XG4gIEFic3RyYWN0SGlzdG9yeS5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBIaXN0b3J5JCQxICYmIEhpc3RvcnkkJDEucHJvdG90eXBlICk7XG4gIEFic3RyYWN0SGlzdG9yeS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBBYnN0cmFjdEhpc3Rvcnk7XG5cbiAgQWJzdHJhY3RIaXN0b3J5LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gcHVzaCAobG9jYXRpb24sIG9uQ29tcGxldGUsIG9uQWJvcnQpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHRoaXMudHJhbnNpdGlvblRvKGxvY2F0aW9uLCBmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgIHRoaXMkMS5zdGFjayA9IHRoaXMkMS5zdGFjay5zbGljZSgwLCB0aGlzJDEuaW5kZXggKyAxKS5jb25jYXQocm91dGUpO1xuICAgICAgdGhpcyQxLmluZGV4Kys7XG4gICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUocm91dGUpO1xuICAgIH0sIG9uQWJvcnQpO1xuICB9O1xuXG4gIEFic3RyYWN0SGlzdG9yeS5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIHJlcGxhY2UgKGxvY2F0aW9uLCBvbkNvbXBsZXRlLCBvbkFib3J0KSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB0aGlzLnRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICB0aGlzJDEuc3RhY2sgPSB0aGlzJDEuc3RhY2suc2xpY2UoMCwgdGhpcyQxLmluZGV4KS5jb25jYXQocm91dGUpO1xuICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKHJvdXRlKTtcbiAgICB9LCBvbkFib3J0KTtcbiAgfTtcblxuICBBYnN0cmFjdEhpc3RvcnkucHJvdG90eXBlLmdvID0gZnVuY3Rpb24gZ28gKG4pIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciB0YXJnZXRJbmRleCA9IHRoaXMuaW5kZXggKyBuO1xuICAgIGlmICh0YXJnZXRJbmRleCA8IDAgfHwgdGFyZ2V0SW5kZXggPj0gdGhpcy5zdGFjay5sZW5ndGgpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB2YXIgcm91dGUgPSB0aGlzLnN0YWNrW3RhcmdldEluZGV4XTtcbiAgICB0aGlzLmNvbmZpcm1UcmFuc2l0aW9uKHJvdXRlLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzJDEuaW5kZXggPSB0YXJnZXRJbmRleDtcbiAgICAgIHRoaXMkMS51cGRhdGVSb3V0ZShyb3V0ZSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQWJzdHJhY3RIaXN0b3J5LnByb3RvdHlwZS5nZXRDdXJyZW50TG9jYXRpb24gPSBmdW5jdGlvbiBnZXRDdXJyZW50TG9jYXRpb24gKCkge1xuICAgIHZhciBjdXJyZW50ID0gdGhpcy5zdGFja1t0aGlzLnN0YWNrLmxlbmd0aCAtIDFdO1xuICAgIHJldHVybiBjdXJyZW50ID8gY3VycmVudC5mdWxsUGF0aCA6ICcvJ1xuICB9O1xuXG4gIEFic3RyYWN0SGlzdG9yeS5wcm90b3R5cGUuZW5zdXJlVVJMID0gZnVuY3Rpb24gZW5zdXJlVVJMICgpIHtcbiAgICAvLyBub29wXG4gIH07XG5cbiAgcmV0dXJuIEFic3RyYWN0SGlzdG9yeTtcbn0oSGlzdG9yeSkpO1xuXG4vKiAgKi9cblxudmFyIFZ1ZVJvdXRlciA9IGZ1bmN0aW9uIFZ1ZVJvdXRlciAob3B0aW9ucykge1xuICBpZiAoIG9wdGlvbnMgPT09IHZvaWQgMCApIG9wdGlvbnMgPSB7fTtcblxuICB0aGlzLmFwcCA9IG51bGw7XG4gIHRoaXMuYXBwcyA9IFtdO1xuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB0aGlzLmJlZm9yZUhvb2tzID0gW107XG4gIHRoaXMuYWZ0ZXJIb29rcyA9IFtdO1xuICB0aGlzLm1hdGNoZXIgPSBjcmVhdGVNYXRjaGVyKG9wdGlvbnMucm91dGVzIHx8IFtdKTtcblxuICB2YXIgbW9kZSA9IG9wdGlvbnMubW9kZSB8fCAnaGFzaCc7XG4gIHRoaXMuZmFsbGJhY2sgPSBtb2RlID09PSAnaGlzdG9yeScgJiYgIXN1cHBvcnRzUHVzaFN0YXRlO1xuICBpZiAodGhpcy5mYWxsYmFjaykge1xuICAgIG1vZGUgPSAnaGFzaCc7XG4gIH1cbiAgaWYgKCFpbkJyb3dzZXIpIHtcbiAgICBtb2RlID0gJ2Fic3RyYWN0JztcbiAgfVxuICB0aGlzLm1vZGUgPSBtb2RlO1xuXG4gIHN3aXRjaCAobW9kZSkge1xuICAgIGNhc2UgJ2hpc3RvcnknOlxuICAgICAgdGhpcy5oaXN0b3J5ID0gbmV3IEhUTUw1SGlzdG9yeSh0aGlzLCBvcHRpb25zLmJhc2UpO1xuICAgICAgYnJlYWtcbiAgICBjYXNlICdoYXNoJzpcbiAgICAgIHRoaXMuaGlzdG9yeSA9IG5ldyBIYXNoSGlzdG9yeSh0aGlzLCBvcHRpb25zLmJhc2UsIHRoaXMuZmFsbGJhY2spO1xuICAgICAgYnJlYWtcbiAgICBjYXNlICdhYnN0cmFjdCc6XG4gICAgICB0aGlzLmhpc3RvcnkgPSBuZXcgQWJzdHJhY3RIaXN0b3J5KHRoaXMsIG9wdGlvbnMuYmFzZSk7XG4gICAgICBicmVha1xuICAgIGRlZmF1bHQ6XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBhc3NlcnQoZmFsc2UsIChcImludmFsaWQgbW9kZTogXCIgKyBtb2RlKSk7XG4gICAgICB9XG4gIH1cbn07XG5cbnZhciBwcm90b3R5cGVBY2Nlc3NvcnMgPSB7IGN1cnJlbnRSb3V0ZToge30gfTtcblxuVnVlUm91dGVyLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uIG1hdGNoIChcbiAgcmF3LFxuICBjdXJyZW50LFxuICByZWRpcmVjdGVkRnJvbVxuKSB7XG4gIHJldHVybiB0aGlzLm1hdGNoZXIubWF0Y2gocmF3LCBjdXJyZW50LCByZWRpcmVjdGVkRnJvbSlcbn07XG5cbnByb3RvdHlwZUFjY2Vzc29ycy5jdXJyZW50Um91dGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5oaXN0b3J5ICYmIHRoaXMuaGlzdG9yeS5jdXJyZW50XG59O1xuXG5WdWVSb3V0ZXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiBpbml0IChhcHAgLyogVnVlIGNvbXBvbmVudCBpbnN0YW5jZSAqLykge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgYXNzZXJ0KFxuICAgIGluc3RhbGwuaW5zdGFsbGVkLFxuICAgIFwibm90IGluc3RhbGxlZC4gTWFrZSBzdXJlIHRvIGNhbGwgYFZ1ZS51c2UoVnVlUm91dGVyKWAgXCIgK1xuICAgIFwiYmVmb3JlIGNyZWF0aW5nIHJvb3QgaW5zdGFuY2UuXCJcbiAgKTtcblxuICB0aGlzLmFwcHMucHVzaChhcHApO1xuXG4gIC8vIG1haW4gYXBwIGFscmVhZHkgaW5pdGlhbGl6ZWQuXG4gIGlmICh0aGlzLmFwcCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdGhpcy5hcHAgPSBhcHA7XG5cbiAgdmFyIGhpc3RvcnkgPSB0aGlzLmhpc3Rvcnk7XG5cbiAgaWYgKGhpc3RvcnkgaW5zdGFuY2VvZiBIVE1MNUhpc3RvcnkpIHtcbiAgICBoaXN0b3J5LnRyYW5zaXRpb25UbyhoaXN0b3J5LmdldEN1cnJlbnRMb2NhdGlvbigpKTtcbiAgfSBlbHNlIGlmIChoaXN0b3J5IGluc3RhbmNlb2YgSGFzaEhpc3RvcnkpIHtcbiAgICB2YXIgc2V0dXBIYXNoTGlzdGVuZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBoaXN0b3J5LnNldHVwTGlzdGVuZXJzKCk7XG4gICAgfTtcbiAgICBoaXN0b3J5LnRyYW5zaXRpb25UbyhcbiAgICAgIGhpc3RvcnkuZ2V0Q3VycmVudExvY2F0aW9uKCksXG4gICAgICBzZXR1cEhhc2hMaXN0ZW5lcixcbiAgICAgIHNldHVwSGFzaExpc3RlbmVyXG4gICAgKTtcbiAgfVxuXG4gIGhpc3RvcnkubGlzdGVuKGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgIHRoaXMkMS5hcHBzLmZvckVhY2goZnVuY3Rpb24gKGFwcCkge1xuICAgICAgYXBwLl9yb3V0ZSA9IHJvdXRlO1xuICAgIH0pO1xuICB9KTtcbn07XG5cblZ1ZVJvdXRlci5wcm90b3R5cGUuYmVmb3JlRWFjaCA9IGZ1bmN0aW9uIGJlZm9yZUVhY2ggKGZuKSB7XG4gIHRoaXMuYmVmb3JlSG9va3MucHVzaChmbik7XG59O1xuXG5WdWVSb3V0ZXIucHJvdG90eXBlLmFmdGVyRWFjaCA9IGZ1bmN0aW9uIGFmdGVyRWFjaCAoZm4pIHtcbiAgdGhpcy5hZnRlckhvb2tzLnB1c2goZm4pO1xufTtcblxuVnVlUm91dGVyLnByb3RvdHlwZS5vblJlYWR5ID0gZnVuY3Rpb24gb25SZWFkeSAoY2IpIHtcbiAgdGhpcy5oaXN0b3J5Lm9uUmVhZHkoY2IpO1xufTtcblxuVnVlUm91dGVyLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gcHVzaCAobG9jYXRpb24sIG9uQ29tcGxldGUsIG9uQWJvcnQpIHtcbiAgdGhpcy5oaXN0b3J5LnB1c2gobG9jYXRpb24sIG9uQ29tcGxldGUsIG9uQWJvcnQpO1xufTtcblxuVnVlUm91dGVyLnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24gcmVwbGFjZSAobG9jYXRpb24sIG9uQ29tcGxldGUsIG9uQWJvcnQpIHtcbiAgdGhpcy5oaXN0b3J5LnJlcGxhY2UobG9jYXRpb24sIG9uQ29tcGxldGUsIG9uQWJvcnQpO1xufTtcblxuVnVlUm91dGVyLnByb3RvdHlwZS5nbyA9IGZ1bmN0aW9uIGdvIChuKSB7XG4gIHRoaXMuaGlzdG9yeS5nbyhuKTtcbn07XG5cblZ1ZVJvdXRlci5wcm90b3R5cGUuYmFjayA9IGZ1bmN0aW9uIGJhY2sgKCkge1xuICB0aGlzLmdvKC0xKTtcbn07XG5cblZ1ZVJvdXRlci5wcm90b3R5cGUuZm9yd2FyZCA9IGZ1bmN0aW9uIGZvcndhcmQgKCkge1xuICB0aGlzLmdvKDEpO1xufTtcblxuVnVlUm91dGVyLnByb3RvdHlwZS5nZXRNYXRjaGVkQ29tcG9uZW50cyA9IGZ1bmN0aW9uIGdldE1hdGNoZWRDb21wb25lbnRzICh0bykge1xuICB2YXIgcm91dGUgPSB0b1xuICAgID8gdGhpcy5yZXNvbHZlKHRvKS5yb3V0ZVxuICAgIDogdGhpcy5jdXJyZW50Um91dGU7XG4gIGlmICghcm91dGUpIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICByZXR1cm4gW10uY29uY2F0LmFwcGx5KFtdLCByb3V0ZS5tYXRjaGVkLm1hcChmdW5jdGlvbiAobSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhtLmNvbXBvbmVudHMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZXR1cm4gbS5jb21wb25lbnRzW2tleV1cbiAgICB9KVxuICB9KSlcbn07XG5cblZ1ZVJvdXRlci5wcm90b3R5cGUucmVzb2x2ZSA9IGZ1bmN0aW9uIHJlc29sdmUgKFxuICB0byxcbiAgY3VycmVudCxcbiAgYXBwZW5kXG4pIHtcbiAgdmFyIGxvY2F0aW9uID0gbm9ybWFsaXplTG9jYXRpb24odG8sIGN1cnJlbnQgfHwgdGhpcy5oaXN0b3J5LmN1cnJlbnQsIGFwcGVuZCk7XG4gIHZhciByb3V0ZSA9IHRoaXMubWF0Y2gobG9jYXRpb24sIGN1cnJlbnQpO1xuICB2YXIgZnVsbFBhdGggPSByb3V0ZS5yZWRpcmVjdGVkRnJvbSB8fCByb3V0ZS5mdWxsUGF0aDtcbiAgdmFyIGJhc2UgPSB0aGlzLmhpc3RvcnkuYmFzZTtcbiAgdmFyIGhyZWYgPSBjcmVhdGVIcmVmKGJhc2UsIGZ1bGxQYXRoLCB0aGlzLm1vZGUpO1xuICByZXR1cm4ge1xuICAgIGxvY2F0aW9uOiBsb2NhdGlvbixcbiAgICByb3V0ZTogcm91dGUsXG4gICAgaHJlZjogaHJlZixcbiAgICAvLyBmb3IgYmFja3dhcmRzIGNvbXBhdFxuICAgIG5vcm1hbGl6ZWRUbzogbG9jYXRpb24sXG4gICAgcmVzb2x2ZWQ6IHJvdXRlXG4gIH1cbn07XG5cblZ1ZVJvdXRlci5wcm90b3R5cGUuYWRkUm91dGVzID0gZnVuY3Rpb24gYWRkUm91dGVzIChyb3V0ZXMpIHtcbiAgdGhpcy5tYXRjaGVyLmFkZFJvdXRlcyhyb3V0ZXMpO1xuICBpZiAodGhpcy5oaXN0b3J5LmN1cnJlbnQgIT09IFNUQVJUKSB7XG4gICAgdGhpcy5oaXN0b3J5LnRyYW5zaXRpb25Ubyh0aGlzLmhpc3RvcnkuZ2V0Q3VycmVudExvY2F0aW9uKCkpO1xuICB9XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyggVnVlUm91dGVyLnByb3RvdHlwZSwgcHJvdG90eXBlQWNjZXNzb3JzICk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUhyZWYgKGJhc2UsIGZ1bGxQYXRoLCBtb2RlKSB7XG4gIHZhciBwYXRoID0gbW9kZSA9PT0gJ2hhc2gnID8gJyMnICsgZnVsbFBhdGggOiBmdWxsUGF0aDtcbiAgcmV0dXJuIGJhc2UgPyBjbGVhblBhdGgoYmFzZSArICcvJyArIHBhdGgpIDogcGF0aFxufVxuXG5WdWVSb3V0ZXIuaW5zdGFsbCA9IGluc3RhbGw7XG5WdWVSb3V0ZXIudmVyc2lvbiA9ICcyLjIuMSc7XG5cbmlmIChpbkJyb3dzZXIgJiYgd2luZG93LlZ1ZSkge1xuICB3aW5kb3cuVnVlLnVzZShWdWVSb3V0ZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFZ1ZVJvdXRlcjtcbiIsIjx0ZW1wbGF0ZT4gXHJcbiAgICA8ZGl2ID5cclxuICAgIFx0e3t0ZXN0fX1cclxuICAgIFx0PGJyLz5cclxuICAgICAgICB7e3Rlc3QxfX1cclxuICAgICAgICA8YnIvPlxyXG4gICAgICAgIHt7dGVzdDJ9fVxyXG4gICAgICAgIDxici8+XHJcbiAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6O1wiIEBjbGljaz1cIkVESVRfVEVTVFwiPueCueWHu+aIkTwvYT5cclxuICAgIFx0PGJyLz5cclxuICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDo7XCIgQGNsaWNrPVwiRURJVF9URVNUMVwiPueCueWHu+aIkXRlc3QxPC9hPlxyXG4gICAgXHRcclxuICAgIDwvZGl2PlxyXG48L3RlbXBsYXRlPiBcclxuPHNjcmlwdCB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCI+XHJcblx0XHJcbmltcG9ydCBzdG9yZSBmcm9tICcuLi8uLi9zdG9yZSc7XHJcbmltcG9ydCB2dWV4IGZyb20gJ3Z1ZXgnO1xyXG5jb25zdCBtYXBTdGF0ZSA9IHZ1ZXgubWFwU3RhdGU7XHJcbmNvbnN0IG1hcEFjdGlvbnMgPSB2dWV4Lm1hcEFjdGlvbnM7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgICAgLi4ubWFwU3RhdGUoe1xyXG4gICAgICAgICAgICB0ZXN0OnN0YXRlID0+c3RvcmUuc3RhdGUuaW5pdE1vZHVsZS50ZXN0LFxyXG4gICAgICAgICAgICB0ZXN0MTogc3RhdGUgPT4gc3RvcmUuc3RhdGUuaW5pdE1vZHVsZS50ZXN0MVxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHRlc3QyOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICByZXR1cm4gJ2VxcWVxd2VxZXF3cXdld3FlcSc7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAuLi5tYXBBY3Rpb25zKFsnRURJVF9URVNUJywnRURJVF9URVNUMSddKVxyXG4gICAgfVxyXG5cclxuICAgXHJcbn1cclxuXHJcbjwvc2NyaXB0PiIsIjx0ZW1wbGF0ZT4gXHJcbiAgICA8ZGl2IGNsYXNzPVwiZ2VyLWNvdGVudFwiPlxyXG4gICAgICAgIHJlcG9ydERldGFpbFxyXG4gICAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+IFxyXG48c2NyaXB0PiBcclxuPC9zY3JpcHQ+IiwiLyoqXHJcbiAqIEBhdXRob3Igemhhb2Rvbmdob25nXHJcbiAqIEBmaWxlb3ZlcnZpZXcgcm91dGVycyByZXBvcnQuanNcclxuICogQGRhdGUgMjAxNy8wMi8yN1xyXG4gKi9cclxuXHJcbmltcG9ydCByZXBvcnQgZnJvbSAnLi4vcGFnZXMvcmVwb3J0L3JlcG9ydC52dWUnO1xyXG5pbXBvcnQgZGV0YWlsIGZyb20gJy4uL3BhZ2VzL3JlcG9ydC9kZXRhaWwudnVlJztcclxuZXhwb3J0IGRlZmF1bHQgIFtcclxuXHR7XHJcblx0XHRwYXRoOiAnL3JlcG9ydCcsIFxyXG5cdFx0Y29tcG9uZW50OiByZXBvcnQgXHJcblx0fSxcclxuXHR7XHJcblx0XHRwYXRoOiAnL3JlcG9ydC86aWQnLCBcclxuXHRcdGNvbXBvbmVudDogcmVwb3J0IFxyXG5cdH0sXHJcblx0e1xyXG5cdFx0cGF0aDogJy9yZXBvcnQvOmlkL2RldGFpbCcsIFxyXG5cdFx0Y29tcG9uZW50OiBkZXRhaWwgXHJcblx0fVxyXG5dOyIsIjx0ZW1wbGF0ZT4gXHJcbiAgICA8ZGl2IGNsYXNzPVwiZ2VyLWNvdGVudFwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodF9hcmVhIHVzZXJsaXN0XCI+XHJcbiAgICAgICAgICAgIDx1bCBjbGFzcz1cImxpc3QtZ3JvdXBcIiB2LWlmPVwiaXRlbXNcIj5zYWRzYWRzc2Fkc2FkXHJcbiAgICAgICAgICAgIFx0PGxpIHYtZm9yPVwiaXRlbSBpbiBpdGVtc1wiPlxyXG5cdFx0XHRcdFx0PGEgOmRhdGEtaWQ9XCJpdGVtLmlkXCIgaHJlZj1cIiNcIj57eyBpdGVtLm1lc3NhZ2UgfX08L2E+XHJcbiAgICAgICAgICAgIFx0XHQ8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGRlbGV0ZSBmclwiIHZhbHVlPVwi5Yig6ZmkXCIgLz5cclxuICAgICAgICAgICAgXHRcdDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gZWRpdCBmclwiIHZhbHVlPVwi57yW6L6RXCIgLz5cclxuXHRcdFx0XHQ8L2xpPlxyXG4gICAgICAgICAgICBcdDwhLS0gXHJcbiAgICAgICAgICAgIFx0PGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+XHJcbiAgICAgICAgICAgIFx0XHQ8YSBocmVmPVwiI1wiPjEuIOeUqOaIt+WQjSB1c2VyLTEg5Yib5bu65pe26Ze0OjIwMTctMDItMDE8L2E+XHJcbiAgICAgICAgICAgIFx0XHQ8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5Yig6ZmkXCIgY2xhc3M9XCJidG4gZGVsZXRlIGZyXCI+XHJcbiAgICAgICAgICAgIFx0XHQ8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi57yW6L6RXCIgY2xhc3M9XCJidG4gZWRpdCBmclwiPlxyXG4gICAgICAgICAgICBcdDwvbGk+IFxyXG4gICAgICAgICAgICBcdC0tPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+ICIsIjx0ZW1wbGF0ZT4gXHJcbiAgICA8ZGl2IGNsYXNzPVwiZ2VyLWNvdGVudFwiPlxyXG4gICAgICAgIGZzZmdkZmhqa2dqaGZnaGRnc2ZhZFxyXG4gICAgPC9kaXY+XHJcbjwvdGVtcGxhdGU+IFxyXG48c2NyaXB0PiBcclxuPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPiBcclxuICAgIDxkaXYgY2xhc3M9XCJnZXItY290ZW50XCI+XHJcbiAgICAgICAgZnNmZ2RmaGprZ2poZmdoZGdzZmFkXHJcbiAgICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT4gXHJcbjxzY3JpcHQ+IFxyXG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+IFxyXG4gICAgPGRpdiBjbGFzcz1cImdlci1jb3RlbnRcIj5cclxuICAgICAgICBmc2ZnZGZoamtnamhmZ2hkZ3NmYWRcclxuICAgIDwvZGl2PlxyXG48L3RlbXBsYXRlPiBcclxuPHNjcmlwdD4gXHJcbjwvc2NyaXB0PiIsIi8qKlxyXG4gKiBAYXV0aG9yIHpoYW9kb25naG9uZ1xyXG4gKiBAZmlsZW92ZXJ2aWV3IHJvdXRlcnMgdXNlci5qc1xyXG4gKiBAZGF0ZSAyMDE3LzAyLzI3XHJcbiAqL1xyXG5pbXBvcnQgc3Ryb2UgZnJvbSAnLi4vc3RvcmUnO1xyXG5pbXBvcnQgaW5kZXggZnJvbSAnLi4vcGFnZXMvdXNlci9saXN0LnZ1ZSc7XHJcbmltcG9ydCBhZGQgZnJvbSAnLi4vcGFnZXMvdXNlci9hZGQudnVlJztcclxuaW1wb3J0IGVkaXQgZnJvbSAnLi4vcGFnZXMvdXNlci9lZGl0LnZ1ZSc7XHJcbmltcG9ydCBtb2Rwd2QgZnJvbSAnLi4vcGFnZXMvdXNlci9tb2Rwd2QudnVlJztcclxuZXhwb3J0IGRlZmF1bHQgIFtcclxuXHR7XHJcblx0XHRwYXRoOiAnL2luZGV4JywgXHJcblx0XHRjb21wb25lbnQ6IGluZGV4LFxyXG5cdFx0cmVkaXJlY3Q6ICgpID0+IHtcclxuXHRcdFx0aWYoIXN0cm9lLnN0YXRlLmluaXRNb2R1bGUuaXNBZG1pbil7XHJcblx0XHRcdFx0cmV0dXJuICcvcmVwb3J0JztcclxuXHRcdFx0fVxyXG5cdCAgICAgIC8vIOaWueazleaOpeaUtiDnm67moIfot6/nlLEg5L2c5Li65Y+C5pWwXHJcblx0ICAgICAgLy8gcmV0dXJuIOmHjeWumuWQkeeahCDlrZfnrKbkuLLot6/lvoQv6Lev5b6E5a+56LGhXHJcblx0ICAgIH1cclxuXHR9LFxyXG5cdHtcclxuXHRcdHBhdGg6ICcvaW5kZXgvOmlkJywgXHJcblx0XHRjb21wb25lbnQ6IGluZGV4IFxyXG5cdH0sXHJcblx0e1xyXG5cdFx0cGF0aDogJy91c2VyL2VkaXQvOm5hbWUnLCBcclxuXHRcdGNvbXBvbmVudDogZWRpdCBcclxuXHR9LFxyXG5cdHtcclxuXHRcdHBhdGg6ICcvdXNlci9hZGQnLCBcclxuXHRcdGNvbXBvbmVudDogYWRkIFxyXG5cdH0sXHJcblx0e1xyXG5cdFx0cGF0aDogJy91c2VyL21vZHB3ZC86bmFtZScsIFxyXG5cdFx0Y29tcG9uZW50OiBtb2Rwd2QgXHJcblx0fVxyXG5dOyIsIi8qKlxyXG4gKiBAYXV0aG9yIHpoYW9kb25naG9uZ1xyXG4gKiBAZmlsZW92ZXJ2aWV3IHJvdXRlcnMgaW5kZXguanNcclxuICogQGRhdGUgMjAxNy8wMi8yN1xyXG4gKi9cclxuXHJcbmltcG9ydCByZXBvcnQgZnJvbSAnLi9yZXBvcnQnO1xyXG5pbXBvcnQgdXNlciBmcm9tICcuL3VzZXInO1xyXG5leHBvcnQgZGVmYXVsdCAgQXJyYXkucHJvdG90eXBlLmNvbmNhdC5jYWxsKHVzZXIscmVwb3J0KTsiLCJpbXBvcnQgJy4vY3NzL21haW4uY3NzJztcclxuaW1wb3J0ICcuL2Nzcy91c2VyLmNzcyc7XHJcbmltcG9ydCBWdWUgZnJvbSAndnVlJztcclxuaW1wb3J0IEFwcCBmcm9tICcuL2FwcC52dWUnO1xyXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9zdG9yZSc7XHJcbmltcG9ydCB2dWVSb3V0ZXIgZnJvbSAndnVlLXJvdXRlcic7XHJcbmltcG9ydCBkcm91dGVycyBmcm9tICcuL3JvdXRlcnMnO1xyXG5WdWUudXNlKHZ1ZVJvdXRlcik7XHJcbmNvbnN0IHJvdXRlciA9IG5ldyB2dWVSb3V0ZXIoe1xyXG5cdGhhc2hiYW5nOiBmYWxzZSwgXHJcblx0bW9kZTonaGlzdG9yeScsXHJcbiAgXHRyb3V0ZXM6IGRyb3V0ZXJzXHJcbn0pXHJcblxyXG5cclxubGV0IHZ1ZUFwcCA9IG5ldyBWdWUoe1xyXG5cdHN0b3JlLFxyXG4gICAgZWw6ICcjZ2VyLXVpJyxcclxuICAgXHQuLi5BcHAsXHJcbiAgIFx0cm91dGVyXHJcbn0pOyJdLCJuYW1lcyI6WyJ0aGlzIiwiYXJndW1lbnRzIiwiY29uc3QiLCJWdWUiLCJWdWV4Iiwic3RvcmUiLCJ3YXJuIiwiaW5Ccm93c2VyIiwicGFyc2VQYXRoIiwiaW5kZXgiLCJvbmNlIiwicHJvdG90eXBlQWNjZXNzb3JzIiwibWFwU3RhdGUiLCJtYXBBY3Rpb25zIiwicmVwb3J0IiwidXNlciIsInZ1ZVJvdXRlciIsImxldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
