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

__$styleInject("input{background:none}input,textarea{border-radius:4px}.fl{float:left}.fr{float:right}.container{width:1100px;margin:20px auto 0}.content{line-height:30px;border:1px solid #999;padding:0 10px}.container .title{font-size:18px;color:#333;font-weight:700;padding:10px 20px}.container .title,.logout{height:32px;line-height:32px}.logout{font-weight:400;cursor:pointer}.left_area{width:200px;text-align:center;padding:20px 0}.right_area{padding:20px}.left_area ul{display:inline-block;width:150px;border-top:1px solid #999}.left_area li{border:1px solid #999;border-top:none}.right_area li{padding:0 20px;margin-bottom:10px;line-height:34px}.userlist .btn{font-size:12px;padding:4px 10px;border-radius:5px;border:1px solid #999;margin-top:6px;margin-right:10px}.userlist .btn.delete{background-color:#169bd5;color:#fff;border-color:#169bd5}.domains,.password,.username{width:200px;border:1px solid #dcd6d6;padding:4px}.password,.username{height:20px}.domains{height:80px}.changepass .content_title,.useradd .content_title,.userdetail .content_title,.userlist .content_title{font-size:18px;text-indent:20px;color:#333;font-weight:700;height:32px;padding-bottom:30px}.changepass .title,.useradd .title,.userdetail .title,.userlist .title{border:1px solid #999;border-bottom:none}.submit{padding-top:60px;text-align:center}.submit input{margin-right:30px;height:40px;line-height:40px;width:140px;border-radius:4px;background-color:#169bd5;color:#fff}.right_area label{width:100px;display:inline-block}.changepass .right_area li,.userdetail .right_area li{border-bottom:none}.userlist table{width:100%;border:1px solid #e8e8e8}.userlist table td,.userlist table th{padding:10px 20px;border-bottom:1px solid #e8e8e8;line-height:30px}.userlist table th{text-align:left}.userlist table td{color:#666}.userlist table tr:hover td{background:#f9f9f9}.userlist table td a{color:#333}",undefined);

/*!
 * Vue.js v2.2.1
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

/**
 * Convert a value to a string that is actually rendered.
 */
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
function remove (arr, item) {
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
function bind (fn, ctx) {
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

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn();
    }
  }
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
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

  /**
   * Whether to record perf
   */
  performance: "production" !== 'production',

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
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
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

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

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

var perf;

/*  */

var emptyObject = Object.freeze({});

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

var warn = noop;
var formatComponentName;

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
  remove(this.subs, sub);
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
      if ("production" !== 'production' && customSetter) {
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
function set (obj, key, val) {
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
    "production" !== 'production' && warn(
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
  if (Array.isArray(obj)) {
    obj.splice(key, 1);
    return
  }
  var ob = obj.__ob__;
  if (obj._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
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
      set(to, key, fromVal);
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
      "production" !== 'production' && warn(
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
 * Hooks and props are merged as arrays.
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
  if (!childVal) { return Object.create(parentVal || null) }
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
  if (!childVal) { return Object.create(parentVal || null) }
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
      } else {}
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
      if (mixin.prototype instanceof Vue$2$1) {
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
  if ("production" !== 'production' && warnMissing && !res) {
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
  if ("production" !== 'production' && isObject(def)) {
    warn(
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
    vm._props[key] !== undefined) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
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

function handleError (err, vm, type) {
  if (config.errorHandler) {
    config.errorHandler.call(null, err, vm, type);
  } else {
    if (inBrowser && typeof console !== 'undefined') {
      console.error(err);
    } else {
      throw err
    }
  }
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

var normalizeEvent = cached(function (name) {
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      for (var i = 0; i < fns.length; i++) {
        fns[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
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
      "production" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (!old) {
      if (!cur.fns) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (!on[name]) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (!oldHook) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (oldHook.fns && oldHook.merged) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
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
// normalization is needed - if any child is an Array, we flatten the whole
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

function add (event, fn, once$$1) {
  if (once$$1) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
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

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
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

function resolveScopedSlots (
  fns
) {
  var res = {};
  for (var i = 0; i < fns.length; i++) {
    res[fns[i][0]] = fns[i][1];
  }
  return res
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
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
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
      remove(parent.$children, vm);
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

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("production" !== 'production' && config.performance && perf) {
    updateComponent = function () {
      var name = vm._name;
      var startTag = "start " + name;
      var endTag = "end " + name;
      perf.mark(startTag);
      var vnode = vm._render();
      perf.mark(endTag);
      perf.measure((name + " render"), startTag, endTag);
      perf.mark(startTag);
      vm._update(vnode, hydrating);
      perf.mark(endTag);
      perf.measure((name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
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
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive == null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var queue = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index$1 = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  queue.length = 0;
  has = {};
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
  for (index$1 = 0; index$1 < queue.length; index$1++) {
    watcher = queue[index$1];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("production" !== 'production' && has[id] != null) {
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
  index$1 = queue.length;
  while (index$1--) {
    watcher = queue[index$1];
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
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i >= 0 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index$1) + 1, 0, watcher);
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
  this.expression = '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "production" !== 'production' && warn(
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
  var value;
  var vm = this.vm;
  if (this.user) {
    try {
      value = this.getter.call(vm, vm);
    } catch (e) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    }
  } else {
    value = this.getter.call(vm, vm);
  }
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
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
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
      remove(this.vm._watchers, this);
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

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

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

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    {
      defineReactive$$1(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) { loop( key ); }
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? data.call(vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "production" !== 'production' && warn(
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
      "production" !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(keys[i])) {
      proxy(vm, "_data", keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    // create internal watcher for the computed property.
    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    }
  }
}

function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
    
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
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
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

/*  */

var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy };
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

  // transform component v-model data into props & events
  if (data.model) {
    transformModel(Ctor.options, data);
  }

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
  updateChildComponent(
    child,
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
    activateChildComponent(vnode.componentInstance, true /* direct */);
  }
}

function destroy (vnode) {
  if (!vnode.componentInstance._isDestroyed) {
    if (!vnode.data.keepAlive) {
      vnode.componentInstance.$destroy();
    } else {
      deactivateChildComponent(vnode.componentInstance, true /* direct */);
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
      "production" !== 'production' && warn(
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

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (on[event]) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
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
    "production" !== 'production' && warn(
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

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
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
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
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
    if (slotNodes && "production" !== 'production') {
      slotNodes._rendered && warn(
        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
        "- this will likely cause render errors.",
        this
      );
      slotNodes._rendered = true;
    }
    return slotNodes || fallback
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 */
function checkKeyCodes (
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
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp
) {
  if (value) {
    if (!isObject(value)) {
      "production" !== 'production' && warn(
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
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
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
  tree = this._staticTrees[index] =
    this.$options.staticRenderFns[index].call(this._renderProxy);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
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

/*  */

function initRender (vm) {
  vm.$vnode = null; // the placeholder node in parent tree
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$options._parentVnode;
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
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

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

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
      handleError(e, vm, "render function");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("production" !== 'production' && Array.isArray(vnode)) {
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

  // internal render helpers.
  // these are exposed on the instance prototype to reduce generated render
  // code size.
  Vue.prototype._o = markOnce;
  Vue.prototype._n = toNumber;
  Vue.prototype._s = _toString;
  Vue.prototype._l = renderList;
  Vue.prototype._t = renderSlot;
  Vue.prototype._q = looseEqual;
  Vue.prototype._i = looseIndexOf;
  Vue.prototype._m = renderStatic;
  Vue.prototype._f = resolveFilter;
  Vue.prototype._k = checkKeyCodes;
  Vue.prototype._b = bindObjectProps;
  Vue.prototype._v = createTextVNode;
  Vue.prototype._e = createEmptyVNode;
  Vue.prototype._u = resolveScopedSlots;
}

/*  */

function initInjections (vm) {
  var provide = vm.$options.provide;
  var inject = vm.$options.inject;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    // isArray here
    var isArray = Array.isArray(inject);
    var keys = isArray
      ? inject
      : hasSymbol
        ? Reflect.ownKeys(inject)
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = isArray ? key : inject[key];
      var source = vm;
      while (source) {
        if (source._provided && source._provided[provideKey]) {
          vm[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
    }
  }
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    /* istanbul ignore if */
    if ("production" !== 'production' && config.performance && perf) {
      perf.mark('init');
    }

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
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initState(vm);
    initInjections(vm);
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("production" !== 'production' && config.performance && perf) {
      vm._name = formatComponentName(vm, false);
      perf.mark('init end');
      perf.measure(((vm._name) + " init"), 'init', 'init end');
    }

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
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    for (var i = 0; i < latest.length; i++) {
      if (sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$2$1 (options) {
  if ("production" !== 'production' &&
    !(this instanceof Vue$2$1)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$2$1);
stateMixin(Vue$2$1);
eventsMixin(Vue$2$1);
lifecycleMixin(Vue$2$1);
renderMixin(Vue$2$1);

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
    } else if (typeof plugin === 'function') {
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

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

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
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
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
  } else if (pattern instanceof RegExp) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
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
    var this$1 = this;

    for (var key in this$1.cache) {
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
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
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

initGlobalAPI(Vue$2$1);

Object.defineProperty(Vue$2$1.prototype, '$isServer', {
  get: isServerRendering
});

Vue$2$1.version = '2.2.1';

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
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
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
    var selected = document.querySelector(el);
    if (!selected) {
      "production" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
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
      remove(refs[key], ref);
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

      if ("production" !== 'production' && data && data.pre) {
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
    var ancestor = vnode;
    while (ancestor) {
      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
      ancestor = ancestor.parent;
    }
    // for slot content they should also get the scopeId from the host instance.
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
          if ("production" !== 'production' && !elmToMove) {
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
            if ("production" !== 'production' &&
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
            } else {}
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
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
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

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  var event;
  /* istanbul ignore if */
  if (on[RANGE_TOKEN]) {
    // IE input[type=range] only supports `change` event
    event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  if (on[CHECKBOX_RADIO_TOKEN]) {
    // Chrome fires microtasks in between click/change, leads to #4521
    event = isChrome ? 'click' : 'change';
    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function add$1 (
  event,
  handler,
  once,
  capture
) {
  if (once) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      var res = arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
      if (res !== null) {
        remove$2(event, handler, capture, _target);
      }
    };
  }
  target$1.addEventListener(event, handler, capture);
}

function remove$2 (
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
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
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
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if ((modifiers && modifiers.number) || elm.type === 'number') {
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
  if (!cls || !(cls = cls.trim())) {
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
    var cur = " " + (el.getAttribute('class') || '') + " ";
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
  if (!cls || !(cls = cls.trim())) {
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
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

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
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

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
    remove(el._transitionClasses, cls);
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
  var duration = data.duration;

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

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("production" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookAgumentsLength(enterHook);

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
    });
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
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
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
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookAgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("production" !== 'production' && explicitLeaveDuration != null) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

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
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookAgumentsLength (fn) {
  if (!fn) { return false }
  var invokerFns = fn.fns;
  if (invokerFns) {
    // invoker
    return getHookAgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
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
  remove: function remove$$1 (vnode, rm) {
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

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

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

var model$1 = {
  inserted: function inserted (el, binding, vnode) {
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
    "production" !== 'production' && warn(
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
  model: model$1,
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
  appearToClass: String,
  duration: [Number, String, Object]
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
    data[camelize(key$1)] = listeners[key$1];
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
    if ("production" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("production" !== 'production' &&
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
    child.key = child.key == null
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
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
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
        } else {}
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
    var body = document.body;
    var f = body.offsetHeight; // eslint-disable-line

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
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
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
Vue$2$1.config.mustUseProp = mustUseProp;
Vue$2$1.config.isReservedTag = isReservedTag;
Vue$2$1.config.getTagNamespace = getTagNamespace;
Vue$2$1.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$2$1.options.directives, platformDirectives);
extend(Vue$2$1.options.components, platformComponents);

// install platform patch function
Vue$2$1.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$2$1.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$2$1);
    } else if ("production" !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if ("production" !== 'production' &&
      config.productionTip !== false &&
      inBrowser && typeof console !== 'undefined') {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/**
 * vuex v2.2.1
 * (c) 2017 Evan You
 * @license MIT
 */
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

function isObject$1 (obj) {
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

var Vue$1; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) { options = {}; }

  assert(Vue$1, "must call Vue.use(Vuex) before creating a store instance.");
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
  this._watcherVM = new Vue$1();

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

var prototypeAccessors$1$1 = { state: {} };

prototypeAccessors$1$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1$1.state.set = function (v) {
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
    this$1._vm._data.$$state = state;
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
    Vue$1.delete(parentState, path[path.length - 1]);
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

Object.defineProperties( Store.prototype, prototypeAccessors$1$1 );

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
  var silent = Vue$1.config.silent;
  Vue$1.config.silent = true;
  store._vm = new Vue$1({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue$1.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue$1.nextTick(function () { return oldVm.$destroy(); });
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
      Vue$1.set(parentState, moduleName, module.state);
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
  store._vm.$watch(function () { return this._data.$$state }, function () {
    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject$1(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue$1) {
    console.error(
      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
    );
    return
  }
  Vue$1 = _Vue;
  applyMixin(Vue$1);
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var mapState$1 = normalizeNamespace(function (namespace, states) {
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
    // mark vuex getter for devtools
    res[key].vuex = true;
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
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions$1 = normalizeNamespace(function (namespace, actions) {
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

var index_esm = {
  Store: Store,
  install: install,
  version: '2.2.1',
  mapState: mapState$1,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions$1
};

//import store from '../index.js';

var state = {
    character: GLOBAL_CONFIG.character,
    isAdmin: GLOBAL_CONFIG.character === 'admin',
    userName: GLOBAL_CONFIG.userName
};

var mutations = {
    /*EDIT_TEST: ( state) => {
     	state.test = '234242242343';
    },
    EDIT_TEST1: (state) => {
    	state.test1 = '我是test1';
    }*/
};

var actions = {
    /*EDIT_TEST: (store)=>{
    	store.commit( 'EDIT_TEST');
    },
    EDIT_TEST1: (store) => {
    	store.commit('EDIT_TEST1');
    }*/
};

var initModule = {
    state: state,
    mutations: mutations,
    actions: actions
};

var state$1 = {
    character: GLOBAL_CONFIG.character,
    isAdmin: GLOBAL_CONFIG.character === 'admin',
    test: '1111111',
    test1: '我是 test1'
};

var mutations$1 = {
    EDIT_TEST: function ( state) {
     	state.test = '234242242343';
    },
    EDIT_TEST1: function (state) {
    	state.test1 = '我是test1';
    }
};

var actions$1 = {
    EDIT_TEST: function (store$$1){
    	store$$1.commit( 'EDIT_TEST');
    },
    EDIT_TEST1: function (store$$1) {
    	store$$1.commit('EDIT_TEST1');
    }
};

var userList = {
    state: state$1,
    mutations: mutations$1,
    actions: actions$1
};

Vue$2$1.use(index_esm);
var store = new index_esm.Store({
	modules:{
		initModule: initModule,
		userList: userList
	}
});

var mapState$$1 = index_esm.mapState;
	var topBox = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('header',{staticClass:"header clearfix"},[_c('div',{staticClass:"f-l"},[_vm._v("GER错误监控系统")]),_vm._v(" "),_c('div',{staticClass:"f-r"},[_c('router-link',{attrs:{"to":{ name: 'modpwd', query: { uname: _vm.userName }},"active-class":"active"}},[_vm._v("修改密码")]),_vm._v(" "),_c('a',{attrs:{"href":"/logout"}},[_vm._v(" 退出")])],1)])},
staticRenderFns: [],
	    computed: Object.assign({}, mapState$$1({
	            userName:function (state) { return store.state.initModule.userName; }
	        }))
	   
	};

var mapState$2 = index_esm.mapState;
var leftMenu = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ger-menu"},[_c('ul',[(_vm.isAdmin)?_c('li',[_c('router-link',{attrs:{"to":"/user","active-class":"active"}},[_vm._v("添加列表")])],1):_vm._e(),_vm._v(" "),_c('li',[_c('router-link',{attrs:{"to":"/report","active-class":"active"}},[_vm._v("错误列表")])],1)])])},
staticRenderFns: [],
    computed: Object.assign({}, mapState$2({
            isAdmin:function (state) { return store.state.initModule.isAdmin; }
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
/*  */

function assert$1 (condition, message) {
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

function install$1 (Vue) {
  if (install$1.installed) { return }
  install$1.installed = true;

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

var index$1$2 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

var isarray = index$1$2;

/**
 * Expose `pathToRegexp`.
 */
var index$2 = pathToRegexp;
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

index$2.parse = parse_1;
index$2.compile = compile_1;
index$2.tokensToFunction = tokensToFunction_1;
index$2.tokensToRegExp = tokensToRegExp_1;

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
    regexp = index$2(path, keys);
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
      (regexpCompileCache[path] = index$2.compile(path));
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
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
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
      base = (baseEl && baseEl.getAttribute('href')) || '/';
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

var VueRouter$1 = function VueRouter (options) {
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

var prototypeAccessors$2 = { currentRoute: {} };

VueRouter$1.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors$2.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter$1.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  "production" !== 'production' && assert$1(
    install$1.installed,
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

VueRouter$1.prototype.beforeEach = function beforeEach (fn) {
  this.beforeHooks.push(fn);
};

VueRouter$1.prototype.afterEach = function afterEach (fn) {
  this.afterHooks.push(fn);
};

VueRouter$1.prototype.onReady = function onReady (cb) {
  this.history.onReady(cb);
};

VueRouter$1.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter$1.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter$1.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter$1.prototype.back = function back () {
  this.go(-1);
};

VueRouter$1.prototype.forward = function forward () {
  this.go(1);
};

VueRouter$1.prototype.getMatchedComponents = function getMatchedComponents (to) {
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

VueRouter$1.prototype.resolve = function resolve (
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

VueRouter$1.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter$1.prototype, prototypeAccessors$2 );

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter$1.install = install$1;
VueRouter$1.version = '2.2.1';

if (inBrowser$1 && window.Vue) {
  window.Vue.use(VueRouter$1);
}

var mapState$3 = index_esm.mapState;
var report$1 = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)},
staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',[_c('thead',[_c('tr',[_c('td',[_vm._v("域名")]),_vm._v(" "),_c('td',[_vm._v("今日错误数")]),_vm._v(" "),_c('td',[_vm._v("7日错误数")]),_vm._v(" "),_c('td',[_vm._v("15日错误数")]),_vm._v(" "),_c('td',[_vm._v("错误类型数")]),_vm._v(" "),_c('td',[_vm._v("报错脚本数")]),_vm._v(" "),_c('td',[_vm._v("最高错误类型")]),_vm._v(" "),_c('td',[_vm._v("操作")])])])])}],
    computed: Object.assign({}, mapState$3({
           
        })),
    methods: {
        
    }

   
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
		component: report$1,
		name: 'report'
	},
	{
		path: '/report/list',
		component: report$1,
		name: 'list'
	},
	{
		path: '/report/detail',
		component: detail,
		name:'reportDetail'
	}
];

var mapState$4 = index_esm.mapState;
var mapActions$4 = index_esm.mapActions;
var user$2 = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"right_area userlist"},[_c('p',{staticClass:"content_title"},[_vm._v("用户列表")]),_vm._v(" "),(_vm.items)?_c('ul',{staticClass:"list-group"},_vm._l((_vm.items),function(item){return _c('li',[_c('a',{attrs:{"data-id":item.id,"href":"#"}},[_vm._v(_vm._s(item.message))]),_vm._v(" "),_c('input',{staticClass:"btn delete fr",attrs:{"type":"button","value":"删除"}}),_vm._v(" "),_c('input',{staticClass:"btn edit fr",attrs:{"type":"button","value":"编辑"}})])})):_vm._e(),_vm._v(" "),_c('div',{staticClass:"table_box"},[_c('table',{attrs:{"align":"center"}},[_vm._m(0),_vm._v(" "),_c('tbody',{attrs:{"id":"tbody"}},[_c('tr',[_c('td',[_c('router-link',{attrs:{"to":"/user/edit/test"}},[_vm._v("1. 用户名 user-1")])],1),_vm._v(" "),_c('td',[_c('router-link',{attrs:{"to":"/user/edit/test"}},[_vm._v("创建时间:2017-02-01")])],1),_vm._v(" "),_c('td',[_c('input',{staticClass:"btn delete",attrs:{"type":"button","value":"删除"}}),_vm._v(" "),_c('router-link',{staticClass:"edit",attrs:{"to":"/user/add","active-class":"active"}},[_vm._v("添加")]),_vm._v(" "),_c('router-link',{staticClass:"edit",attrs:{"to":"/user/edit/test","active-class":"active"}},[_vm._v("编辑")]),_vm._v(" "),_c('router-link',{staticClass:"edit",attrs:{"to":"/user/modpwd/test","active-class":"active"}},[_vm._v("修改密码")])],1)]),_vm._v(" "),_c('tr',[_c('td',[_c('router-link',{attrs:{"to":"/user/edit/test"}},[_vm._v("2. 用户名 user-2")])],1),_vm._v(" "),_c('td',[_c('router-link',{attrs:{"to":"/user/edit/test"}},[_vm._v("创建时间:2017-02-01")])],1),_vm._v(" "),_c('td',[_c('input',{staticClass:"btn delete",attrs:{"type":"button","value":"删除"}}),_vm._v(" "),_c('router-link',{staticClass:"edit",attrs:{"to":"/user/add","active-class":"active"}},[_vm._v("添加")]),_vm._v(" "),_c('router-link',{staticClass:"edit",attrs:{"to":"/user/edit/test","active-class":"active"}},[_vm._v("编辑")])],1)]),_vm._v(" "),_c('tr',[_c('td',[_c('router-link',{attrs:{"to":"/user/edit/test"}},[_vm._v("1. 用户名 user-1")])],1),_vm._v(" "),_c('td',[_c('router-link',{attrs:{"to":"/user/edit/test"}},[_vm._v("创建时间:2017-02-01")])],1),_vm._v(" "),_c('td',[_c('input',{staticClass:"btn delete",attrs:{"type":"button","value":"删除"}}),_vm._v(" "),_c('router-link',{staticClass:"edit",attrs:{"to":"/user/add","active-class":"active"}},[_vm._v("添加")]),_vm._v(" "),_c('router-link',{staticClass:"edit",attrs:{"to":"/user/edit/test","active-class":"active"}},[_vm._v("编辑")])],1)]),_vm._v(" "),_c('tr',[_c('td',[_c('router-link',{attrs:{"to":"/user/edit/test"}},[_vm._v("2. 用户名 user-2")])],1),_vm._v(" "),_c('td',[_c('router-link',{attrs:{"to":"/user/edit/test"}},[_vm._v("创建时间:2017-02-01")])],1),_vm._v(" "),_c('td',[_c('input',{staticClass:"btn delete",attrs:{"type":"button","value":"删除"}}),_vm._v(" "),_c('router-link',{staticClass:"edit",attrs:{"to":"/user/add","active-class":"active"}},[_vm._v("添加")]),_vm._v(" "),_c('router-link',{staticClass:"edit",attrs:{"to":"/user/edit/test","active-class":"active"}},[_vm._v("编辑")])],1)]),_vm._v(" "),_c('tr',[_c('td',[_c('router-link',{attrs:{"to":"/user/edit/test"}},[_vm._v("1. 用户名 user-1")])],1),_vm._v(" "),_c('td',[_c('router-link',{attrs:{"to":"/user/edit/test"}},[_vm._v("创建时间:2017-02-01")])],1),_vm._v(" "),_c('td',[_c('input',{staticClass:"btn delete",attrs:{"type":"button","value":"删除"}}),_vm._v(" "),_c('router-link',{staticClass:"edit",attrs:{"to":"/user/add","active-class":"active"}},[_vm._v("添加")]),_vm._v(" "),_c('router-link',{staticClass:"edit",attrs:{"to":"/user/edit/test","active-class":"active"}},[_vm._v("编辑")])],1)]),_vm._v(" "),_c('tr',[_c('td',[_c('router-link',{attrs:{"to":"/user/edit/test"}},[_vm._v("2. 用户名 user-2")])],1),_vm._v(" "),_c('td',[_c('router-link',{attrs:{"to":"/user/edit/test"}},[_vm._v("创建时间:2017-02-01")])],1),_vm._v(" "),_c('td',[_c('input',{staticClass:"btn delete",attrs:{"type":"button","value":"删除"}}),_vm._v(" "),_c('router-link',{staticClass:"edit",attrs:{"to":"/user/add","active-class":"active"}},[_vm._v("添加")]),_vm._v(" "),_c('router-link',{staticClass:"edit",attrs:{"to":"/user/edit/test","active-class":"active"}},[_vm._v("编辑")])],1)]),_vm._v(" "),_c('tr',[_c('td',[_c('router-link',{attrs:{"to":"/user/edit/test"}},[_vm._v("1. 用户名 user-1")])],1),_vm._v(" "),_c('td',[_c('router-link',{attrs:{"to":"/user/edit/test"}},[_vm._v("创建时间:2017-02-01")])],1),_vm._v(" "),_c('td',[_c('input',{staticClass:"btn delete",attrs:{"type":"button","value":"删除"}}),_vm._v(" "),_c('router-link',{staticClass:"edit",attrs:{"to":"/user/add","active-class":"active"}},[_vm._v("添加")]),_vm._v(" "),_c('router-link',{staticClass:"edit",attrs:{"to":"/user/edit/test","active-class":"active"}},[_vm._v("编辑")])],1)]),_vm._v(" "),_c('tr',[_c('td',[_c('router-link',{attrs:{"to":"/user/edit/test"}},[_vm._v("2. 用户名 user-2")])],1),_vm._v(" "),_c('td',[_c('router-link',{attrs:{"to":"/user/edit/test"}},[_vm._v("创建时间:2017-02-01")])],1),_vm._v(" "),_c('td',[_c('input',{staticClass:"btn delete",attrs:{"type":"button","value":"删除"}}),_vm._v(" "),_c('router-link',{staticClass:"edit",attrs:{"to":"/user/add","active-class":"active"}},[_vm._v("添加")]),_vm._v(" "),_c('router-link',{staticClass:"edit",attrs:{"to":"/user/edit/test","active-class":"active"}},[_vm._v("编辑")])],1)])])])])])])},
staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',[_vm._v("用户名")]),_vm._v(" "),_c('th',[_vm._v("创建时间")]),_vm._v(" "),_c('th',[_vm._v("操作")])])])}],
    computed: Object.assign({}, mapState$4({
            test: function (state) { return store.state.initModule.test; },
            test1: function (state) { return store.state.initModule.test1; }
        })),
    methods: Object.assign({}, mapActions$4(['EDIT_TEST','EDIT_TEST1']))/*,
    created: {

        let trs = document.getElementsByTagName('tr');
        console.log(trs.length);
    }*/
};

var add$1$1 = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"right_area useradd"},[_c('p',{staticClass:"content_title"},[_vm._v("添加用户")]),_vm._v(" "),_c('label',{attrs:{"for":"username"}},[_vm._v("用户名: ")]),_c('input',{staticClass:"username",attrs:{"type":"text","id":"username"}}),_vm._v(" "),_c('div',{staticClass:"submit"},[_c('input',{staticClass:"create",attrs:{"type":"button","value":"创建"}}),_vm._v(" "),_c('router-link',{staticClass:"back",attrs:{"to":"/index","active-class":"active"}},[_vm._v("返回")])],1)])])},
staticRenderFns: [],
stub: 1
};

var edit = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{},[_c('div',{staticClass:"right_area userdetail"},[_c('p',{staticClass:"content_title"},[_vm._v("用户详情")]),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('div',{staticClass:"submit"},[_c('input',{staticClass:"create",attrs:{"type":"button","value":"创建"}}),_vm._v(" "),_c('router-link',{staticClass:"back",attrs:{"to":"/index","active-class":"active"}},[_vm._v("返回")])],1)])])},
staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',[_c('li',[_c('label',{attrs:{"for":"username"}},[_vm._v("用户名: ")]),_c('input',{staticClass:"username",attrs:{"type":"text","id":"username"}})]),_vm._v(" "),_c('li',[_c('label',{attrs:{"for":"password"}},[_vm._v("密　码: ")]),_c('input',{staticClass:"password",attrs:{"type":"password","id":"password"}})]),_vm._v(" "),_c('li',{staticClass:"clearfix"},[_c('label',{staticClass:"fl",attrs:{"for":"domains"}},[_vm._v("域名组: ")]),_vm._v(" "),_c('textarea',{staticClass:"domains",attrs:{"id":"domains"}})])])}],
stub: 1
};

var modpwd = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"right_area userdetail"},[_c('p',{staticClass:"content_title"},[_vm._v("修改密码")]),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('div',{staticClass:"submit"},[_c('input',{staticClass:"change",attrs:{"type":"button","value":"修改"}}),_vm._v(" "),_c('router-link',{staticClass:"back",attrs:{"to":"/index","active-class":"active"}},[_vm._v("返回")])],1)])])},
staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',[_c('li',[_c('label',{attrs:{"for":"password"}},[_vm._v("新密码: ")]),_c('input',{staticClass:"password",attrs:{"type":"password","id":"password"}})]),_vm._v(" "),_c('li',[_c('label',{attrs:{"for":"password"}},[_vm._v("确认密码: ")]),_c('input',{staticClass:"password",attrs:{"type":"password","id":"password"}})])])}],
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
		component: index,
		redirect: function () {
			if(!store.state.initModule.isAdmin){
				return '/report';
			}else{
				return '/user'
			}
	    }
	},
	{
		path: '/user', 
		component: user$2,
		name: 'user'
	},
	{
		path: '/user/edit', 
		component: edit,
		name: 'edit'
	},
	{
		path: '/user/add', 
		component: add$1$1,
		name: 'add'
	},
	{
		path: '/user/modpwd', 
		component: modpwd,
		name: 'modpwd'/*,
		redirect: () => {
			console.log(modpwd)
		}*/
	}
];

/**
 * @author zhaodonghong
 * @fileoverview routers index.js
 * @date 2017/02/27
 */

var drouters = Array.prototype.concat.call(user$1,report);

Vue$2$1.use(VueRouter$1);
var router = new VueRouter$1({
	hashbang: false, 
	mode:'history',
  	routes: drouters
});
router.beforeEach(function (to, from, next) {
  console.log(to);
  console.log(from);
  next();
});

var vueApp = new Vue$2$1(Object.assign({}, {store: store,
    el: '#ger-ui'},
   	App,
   	{router: router}));

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3Z1ZS9kaXN0L3Z1ZS5ydW50aW1lLmVzbS5qcyIsIi4uL25vZGVfbW9kdWxlcy92dWV4L2Rpc3QvdnVleC5lc20uanMiLCIuLi9zcmMvc3RvcmUvbW9kdWxlcy9pbml0TW9kdWxlLmpzIiwiLi4vc3JjL3N0b3JlL21vZHVsZXMvdXNlckxpc3QuanMiLCIuLi9zcmMvc3RvcmUvaW5kZXguanMiLCIuLi9zcmMvcGFnZXMvcHVibGljL2hlYWRlci52dWUiLCIuLi9zcmMvcGFnZXMvcHVibGljL21lbnUudnVlIiwiLi4vc3JjL3BhZ2VzL3B1YmxpYy9jb250ZW50LnZ1ZSIsIi4uL3NyYy9hcHAudnVlIiwiLi4vbm9kZV9tb2R1bGVzL3Z1ZS1yb3V0ZXIvZGlzdC92dWUtcm91dGVyLmVzbS5qcyIsIi4uL3NyYy9wYWdlcy9yZXBvcnQvcmVwb3J0LnZ1ZSIsIi4uL3NyYy9wYWdlcy9yZXBvcnQvZGV0YWlsLnZ1ZSIsIi4uL3NyYy9yb3V0ZXJzL3JlcG9ydC5qcyIsIi4uL3NyYy9wYWdlcy91c2VyL2xpc3QudnVlIiwiLi4vc3JjL3BhZ2VzL3VzZXIvYWRkLnZ1ZSIsIi4uL3NyYy9wYWdlcy91c2VyL2VkaXQudnVlIiwiLi4vc3JjL3BhZ2VzL3VzZXIvbW9kcHdkLnZ1ZSIsIi4uL3NyYy9yb3V0ZXJzL3VzZXIuanMiLCIuLi9zcmMvcm91dGVycy9pbmRleC5qcyIsIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIFZ1ZS5qcyB2Mi4yLjFcbiAqIChjKSAyMDE0LTIwMTcgRXZhbiBZb3VcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuLyogICovXG5cbi8qKlxuICogQ29udmVydCBhIHZhbHVlIHRvIGEgc3RyaW5nIHRoYXQgaXMgYWN0dWFsbHkgcmVuZGVyZWQuXG4gKi9cbmZ1bmN0aW9uIF90b1N0cmluZyAodmFsKSB7XG4gIHJldHVybiB2YWwgPT0gbnVsbFxuICAgID8gJydcbiAgICA6IHR5cGVvZiB2YWwgPT09ICdvYmplY3QnXG4gICAgICA/IEpTT04uc3RyaW5naWZ5KHZhbCwgbnVsbCwgMilcbiAgICAgIDogU3RyaW5nKHZhbClcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgaW5wdXQgdmFsdWUgdG8gYSBudW1iZXIgZm9yIHBlcnNpc3RlbmNlLlxuICogSWYgdGhlIGNvbnZlcnNpb24gZmFpbHMsIHJldHVybiBvcmlnaW5hbCBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyICh2YWwpIHtcbiAgdmFyIG4gPSBwYXJzZUZsb2F0KHZhbCk7XG4gIHJldHVybiBpc05hTihuKSA/IHZhbCA6IG5cbn1cblxuLyoqXG4gKiBNYWtlIGEgbWFwIGFuZCByZXR1cm4gYSBmdW5jdGlvbiBmb3IgY2hlY2tpbmcgaWYgYSBrZXlcbiAqIGlzIGluIHRoYXQgbWFwLlxuICovXG5mdW5jdGlvbiBtYWtlTWFwIChcbiAgc3RyLFxuICBleHBlY3RzTG93ZXJDYXNlXG4pIHtcbiAgdmFyIG1hcCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHZhciBsaXN0ID0gc3RyLnNwbGl0KCcsJyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIG1hcFtsaXN0W2ldXSA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIGV4cGVjdHNMb3dlckNhc2VcbiAgICA/IGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuIG1hcFt2YWwudG9Mb3dlckNhc2UoKV07IH1cbiAgICA6IGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuIG1hcFt2YWxdOyB9XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYSB0YWcgaXMgYSBidWlsdC1pbiB0YWcuXG4gKi9cbnZhciBpc0J1aWx0SW5UYWcgPSBtYWtlTWFwKCdzbG90LGNvbXBvbmVudCcsIHRydWUpO1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpdGVtIGZyb20gYW4gYXJyYXlcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlIChhcnIsIGl0ZW0pIHtcbiAgaWYgKGFyci5sZW5ndGgpIHtcbiAgICB2YXIgaW5kZXggPSBhcnIuaW5kZXhPZihpdGVtKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgcmV0dXJuIGFyci5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciB0aGUgb2JqZWN0IGhhcyB0aGUgcHJvcGVydHkuXG4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5mdW5jdGlvbiBoYXNPd24gKG9iaiwga2V5KSB7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KVxufVxuXG4vKipcbiAqIENoZWNrIGlmIHZhbHVlIGlzIHByaW1pdGl2ZVxuICovXG5mdW5jdGlvbiBpc1ByaW1pdGl2ZSAodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJ1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGNhY2hlZCB2ZXJzaW9uIG9mIGEgcHVyZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY2FjaGVkIChmbikge1xuICB2YXIgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICByZXR1cm4gKGZ1bmN0aW9uIGNhY2hlZEZuIChzdHIpIHtcbiAgICB2YXIgaGl0ID0gY2FjaGVbc3RyXTtcbiAgICByZXR1cm4gaGl0IHx8IChjYWNoZVtzdHJdID0gZm4oc3RyKSlcbiAgfSlcbn1cblxuLyoqXG4gKiBDYW1lbGl6ZSBhIGh5cGhlbi1kZWxpbWl0ZWQgc3RyaW5nLlxuICovXG52YXIgY2FtZWxpemVSRSA9IC8tKFxcdykvZztcbnZhciBjYW1lbGl6ZSA9IGNhY2hlZChmdW5jdGlvbiAoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZShjYW1lbGl6ZVJFLCBmdW5jdGlvbiAoXywgYykgeyByZXR1cm4gYyA/IGMudG9VcHBlckNhc2UoKSA6ICcnOyB9KVxufSk7XG5cbi8qKlxuICogQ2FwaXRhbGl6ZSBhIHN0cmluZy5cbiAqL1xudmFyIGNhcGl0YWxpemUgPSBjYWNoZWQoZnVuY3Rpb24gKHN0cikge1xuICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpXG59KTtcblxuLyoqXG4gKiBIeXBoZW5hdGUgYSBjYW1lbENhc2Ugc3RyaW5nLlxuICovXG52YXIgaHlwaGVuYXRlUkUgPSAvKFteLV0pKFtBLVpdKS9nO1xudmFyIGh5cGhlbmF0ZSA9IGNhY2hlZChmdW5jdGlvbiAoc3RyKSB7XG4gIHJldHVybiBzdHJcbiAgICAucmVwbGFjZShoeXBoZW5hdGVSRSwgJyQxLSQyJylcbiAgICAucmVwbGFjZShoeXBoZW5hdGVSRSwgJyQxLSQyJylcbiAgICAudG9Mb3dlckNhc2UoKVxufSk7XG5cbi8qKlxuICogU2ltcGxlIGJpbmQsIGZhc3RlciB0aGFuIG5hdGl2ZVxuICovXG5mdW5jdGlvbiBiaW5kIChmbiwgY3R4KSB7XG4gIGZ1bmN0aW9uIGJvdW5kRm4gKGEpIHtcbiAgICB2YXIgbCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgcmV0dXJuIGxcbiAgICAgID8gbCA+IDFcbiAgICAgICAgPyBmbi5hcHBseShjdHgsIGFyZ3VtZW50cylcbiAgICAgICAgOiBmbi5jYWxsKGN0eCwgYSlcbiAgICAgIDogZm4uY2FsbChjdHgpXG4gIH1cbiAgLy8gcmVjb3JkIG9yaWdpbmFsIGZuIGxlbmd0aFxuICBib3VuZEZuLl9sZW5ndGggPSBmbi5sZW5ndGg7XG4gIHJldHVybiBib3VuZEZuXG59XG5cbi8qKlxuICogQ29udmVydCBhbiBBcnJheS1saWtlIG9iamVjdCB0byBhIHJlYWwgQXJyYXkuXG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkgKGxpc3QsIHN0YXJ0KSB7XG4gIHN0YXJ0ID0gc3RhcnQgfHwgMDtcbiAgdmFyIGkgPSBsaXN0Lmxlbmd0aCAtIHN0YXJ0O1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGkpO1xuICB3aGlsZSAoaS0tKSB7XG4gICAgcmV0W2ldID0gbGlzdFtpICsgc3RhcnRdO1xuICB9XG4gIHJldHVybiByZXRcbn1cblxuLyoqXG4gKiBNaXggcHJvcGVydGllcyBpbnRvIHRhcmdldCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZCAodG8sIF9mcm9tKSB7XG4gIGZvciAodmFyIGtleSBpbiBfZnJvbSkge1xuICAgIHRvW2tleV0gPSBfZnJvbVtrZXldO1xuICB9XG4gIHJldHVybiB0b1xufVxuXG4vKipcbiAqIFF1aWNrIG9iamVjdCBjaGVjayAtIHRoaXMgaXMgcHJpbWFyaWx5IHVzZWQgdG8gdGVsbFxuICogT2JqZWN0cyBmcm9tIHByaW1pdGl2ZSB2YWx1ZXMgd2hlbiB3ZSBrbm93IHRoZSB2YWx1ZVxuICogaXMgYSBKU09OLWNvbXBsaWFudCB0eXBlLlxuICovXG5mdW5jdGlvbiBpc09iamVjdCAob2JqKSB7XG4gIHJldHVybiBvYmogIT09IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcbn1cblxuLyoqXG4gKiBTdHJpY3Qgb2JqZWN0IHR5cGUgY2hlY2suIE9ubHkgcmV0dXJucyB0cnVlXG4gKiBmb3IgcGxhaW4gSmF2YVNjcmlwdCBvYmplY3RzLlxuICovXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xudmFyIE9CSkVDVF9TVFJJTkcgPSAnW29iamVjdCBPYmplY3RdJztcbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QgKG9iaikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSBPQkpFQ1RfU1RSSU5HXG59XG5cbi8qKlxuICogTWVyZ2UgYW4gQXJyYXkgb2YgT2JqZWN0cyBpbnRvIGEgc2luZ2xlIE9iamVjdC5cbiAqL1xuZnVuY3Rpb24gdG9PYmplY3QgKGFycikge1xuICB2YXIgcmVzID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGFycltpXSkge1xuICAgICAgZXh0ZW5kKHJlcywgYXJyW2ldKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG4vKipcbiAqIFBlcmZvcm0gbm8gb3BlcmF0aW9uLlxuICovXG5mdW5jdGlvbiBub29wICgpIHt9XG5cbi8qKlxuICogQWx3YXlzIHJldHVybiBmYWxzZS5cbiAqL1xudmFyIG5vID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH07XG5cbi8qKlxuICogUmV0dXJuIHNhbWUgdmFsdWVcbiAqL1xudmFyIGlkZW50aXR5ID0gZnVuY3Rpb24gKF8pIHsgcmV0dXJuIF87IH07XG5cbi8qKlxuICogR2VuZXJhdGUgYSBzdGF0aWMga2V5cyBzdHJpbmcgZnJvbSBjb21waWxlciBtb2R1bGVzLlxuICovXG5cblxuLyoqXG4gKiBDaGVjayBpZiB0d28gdmFsdWVzIGFyZSBsb29zZWx5IGVxdWFsIC0gdGhhdCBpcyxcbiAqIGlmIHRoZXkgYXJlIHBsYWluIG9iamVjdHMsIGRvIHRoZXkgaGF2ZSB0aGUgc2FtZSBzaGFwZT9cbiAqL1xuZnVuY3Rpb24gbG9vc2VFcXVhbCAoYSwgYikge1xuICB2YXIgaXNPYmplY3RBID0gaXNPYmplY3QoYSk7XG4gIHZhciBpc09iamVjdEIgPSBpc09iamVjdChiKTtcbiAgaWYgKGlzT2JqZWN0QSAmJiBpc09iamVjdEIpIHtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoYSkgPT09IEpTT04uc3RyaW5naWZ5KGIpXG4gIH0gZWxzZSBpZiAoIWlzT2JqZWN0QSAmJiAhaXNPYmplY3RCKSB7XG4gICAgcmV0dXJuIFN0cmluZyhhKSA9PT0gU3RyaW5nKGIpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24gbG9vc2VJbmRleE9mIChhcnIsIHZhbCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChsb29zZUVxdWFsKGFycltpXSwgdmFsKSkgeyByZXR1cm4gaSB9XG4gIH1cbiAgcmV0dXJuIC0xXG59XG5cbi8qKlxuICogRW5zdXJlIGEgZnVuY3Rpb24gaXMgY2FsbGVkIG9ubHkgb25jZS5cbiAqL1xuZnVuY3Rpb24gb25jZSAoZm4pIHtcbiAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmICghY2FsbGVkKSB7XG4gICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgZm4oKTtcbiAgICB9XG4gIH1cbn1cblxuLyogICovXG5cbnZhciBjb25maWcgPSB7XG4gIC8qKlxuICAgKiBPcHRpb24gbWVyZ2Ugc3RyYXRlZ2llcyAodXNlZCBpbiBjb3JlL3V0aWwvb3B0aW9ucylcbiAgICovXG4gIG9wdGlvbk1lcmdlU3RyYXRlZ2llczogT2JqZWN0LmNyZWF0ZShudWxsKSxcblxuICAvKipcbiAgICogV2hldGhlciB0byBzdXBwcmVzcyB3YXJuaW5ncy5cbiAgICovXG4gIHNpbGVudDogZmFsc2UsXG5cbiAgLyoqXG4gICAqIFNob3cgcHJvZHVjdGlvbiBtb2RlIHRpcCBtZXNzYWdlIG9uIGJvb3Q/XG4gICAqL1xuICBwcm9kdWN0aW9uVGlwOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLFxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGVuYWJsZSBkZXZ0b29sc1xuICAgKi9cbiAgZGV2dG9vbHM6IHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsXG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdG8gcmVjb3JkIHBlcmZcbiAgICovXG4gIHBlcmZvcm1hbmNlOiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nLFxuXG4gIC8qKlxuICAgKiBFcnJvciBoYW5kbGVyIGZvciB3YXRjaGVyIGVycm9yc1xuICAgKi9cbiAgZXJyb3JIYW5kbGVyOiBudWxsLFxuXG4gIC8qKlxuICAgKiBJZ25vcmUgY2VydGFpbiBjdXN0b20gZWxlbWVudHNcbiAgICovXG4gIGlnbm9yZWRFbGVtZW50czogW10sXG5cbiAgLyoqXG4gICAqIEN1c3RvbSB1c2VyIGtleSBhbGlhc2VzIGZvciB2LW9uXG4gICAqL1xuICBrZXlDb2RlczogT2JqZWN0LmNyZWF0ZShudWxsKSxcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSB0YWcgaXMgcmVzZXJ2ZWQgc28gdGhhdCBpdCBjYW5ub3QgYmUgcmVnaXN0ZXJlZCBhcyBhXG4gICAqIGNvbXBvbmVudC4gVGhpcyBpcyBwbGF0Zm9ybS1kZXBlbmRlbnQgYW5kIG1heSBiZSBvdmVyd3JpdHRlbi5cbiAgICovXG4gIGlzUmVzZXJ2ZWRUYWc6IG5vLFxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHRhZyBpcyBhbiB1bmtub3duIGVsZW1lbnQuXG4gICAqIFBsYXRmb3JtLWRlcGVuZGVudC5cbiAgICovXG4gIGlzVW5rbm93bkVsZW1lbnQ6IG5vLFxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG5hbWVzcGFjZSBvZiBhbiBlbGVtZW50XG4gICAqL1xuICBnZXRUYWdOYW1lc3BhY2U6IG5vb3AsXG5cbiAgLyoqXG4gICAqIFBhcnNlIHRoZSByZWFsIHRhZyBuYW1lIGZvciB0aGUgc3BlY2lmaWMgcGxhdGZvcm0uXG4gICAqL1xuICBwYXJzZVBsYXRmb3JtVGFnTmFtZTogaWRlbnRpdHksXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGFuIGF0dHJpYnV0ZSBtdXN0IGJlIGJvdW5kIHVzaW5nIHByb3BlcnR5LCBlLmcuIHZhbHVlXG4gICAqIFBsYXRmb3JtLWRlcGVuZGVudC5cbiAgICovXG4gIG11c3RVc2VQcm9wOiBubyxcblxuICAvKipcbiAgICogTGlzdCBvZiBhc3NldCB0eXBlcyB0aGF0IGEgY29tcG9uZW50IGNhbiBvd24uXG4gICAqL1xuICBfYXNzZXRUeXBlczogW1xuICAgICdjb21wb25lbnQnLFxuICAgICdkaXJlY3RpdmUnLFxuICAgICdmaWx0ZXInXG4gIF0sXG5cbiAgLyoqXG4gICAqIExpc3Qgb2YgbGlmZWN5Y2xlIGhvb2tzLlxuICAgKi9cbiAgX2xpZmVjeWNsZUhvb2tzOiBbXG4gICAgJ2JlZm9yZUNyZWF0ZScsXG4gICAgJ2NyZWF0ZWQnLFxuICAgICdiZWZvcmVNb3VudCcsXG4gICAgJ21vdW50ZWQnLFxuICAgICdiZWZvcmVVcGRhdGUnLFxuICAgICd1cGRhdGVkJyxcbiAgICAnYmVmb3JlRGVzdHJveScsXG4gICAgJ2Rlc3Ryb3llZCcsXG4gICAgJ2FjdGl2YXRlZCcsXG4gICAgJ2RlYWN0aXZhdGVkJ1xuICBdLFxuXG4gIC8qKlxuICAgKiBNYXggY2lyY3VsYXIgdXBkYXRlcyBhbGxvd2VkIGluIGEgc2NoZWR1bGVyIGZsdXNoIGN5Y2xlLlxuICAgKi9cbiAgX21heFVwZGF0ZUNvdW50OiAxMDBcbn07XG5cbi8qICAqL1xuLyogZ2xvYmFscyBNdXRhdGlvbk9ic2VydmVyICovXG5cbi8vIGNhbiB3ZSB1c2UgX19wcm90b19fP1xudmFyIGhhc1Byb3RvID0gJ19fcHJvdG9fXycgaW4ge307XG5cbi8vIEJyb3dzZXIgZW52aXJvbm1lbnQgc25pZmZpbmdcbnZhciBpbkJyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcbnZhciBVQSA9IGluQnJvd3NlciAmJiB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xudmFyIGlzSUUgPSBVQSAmJiAvbXNpZXx0cmlkZW50Ly50ZXN0KFVBKTtcbnZhciBpc0lFOSA9IFVBICYmIFVBLmluZGV4T2YoJ21zaWUgOS4wJykgPiAwO1xudmFyIGlzRWRnZSA9IFVBICYmIFVBLmluZGV4T2YoJ2VkZ2UvJykgPiAwO1xudmFyIGlzQW5kcm9pZCA9IFVBICYmIFVBLmluZGV4T2YoJ2FuZHJvaWQnKSA+IDA7XG52YXIgaXNJT1MgPSBVQSAmJiAvaXBob25lfGlwYWR8aXBvZHxpb3MvLnRlc3QoVUEpO1xudmFyIGlzQ2hyb21lID0gVUEgJiYgL2Nocm9tZVxcL1xcZCsvLnRlc3QoVUEpICYmICFpc0VkZ2U7XG5cbi8vIHRoaXMgbmVlZHMgdG8gYmUgbGF6eS1ldmFsZWQgYmVjYXVzZSB2dWUgbWF5IGJlIHJlcXVpcmVkIGJlZm9yZVxuLy8gdnVlLXNlcnZlci1yZW5kZXJlciBjYW4gc2V0IFZVRV9FTlZcbnZhciBfaXNTZXJ2ZXI7XG52YXIgaXNTZXJ2ZXJSZW5kZXJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIGlmIChfaXNTZXJ2ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghaW5Ccm93c2VyICYmIHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBkZXRlY3QgcHJlc2VuY2Ugb2YgdnVlLXNlcnZlci1yZW5kZXJlciBhbmQgYXZvaWRcbiAgICAgIC8vIFdlYnBhY2sgc2hpbW1pbmcgdGhlIHByb2Nlc3NcbiAgICAgIF9pc1NlcnZlciA9IGdsb2JhbFsncHJvY2VzcyddLmVudi5WVUVfRU5WID09PSAnc2VydmVyJztcbiAgICB9IGVsc2Uge1xuICAgICAgX2lzU2VydmVyID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiBfaXNTZXJ2ZXJcbn07XG5cbi8vIGRldGVjdCBkZXZ0b29sc1xudmFyIGRldnRvb2xzID0gaW5Ccm93c2VyICYmIHdpbmRvdy5fX1ZVRV9ERVZUT09MU19HTE9CQUxfSE9PS19fO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZnVuY3Rpb24gaXNOYXRpdmUgKEN0b3IpIHtcbiAgcmV0dXJuIC9uYXRpdmUgY29kZS8udGVzdChDdG9yLnRvU3RyaW5nKCkpXG59XG5cbnZhciBoYXNTeW1ib2wgPVxuICB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShTeW1ib2wpICYmXG4gIHR5cGVvZiBSZWZsZWN0ICE9PSAndW5kZWZpbmVkJyAmJiBpc05hdGl2ZShSZWZsZWN0Lm93bktleXMpO1xuXG4vKipcbiAqIERlZmVyIGEgdGFzayB0byBleGVjdXRlIGl0IGFzeW5jaHJvbm91c2x5LlxuICovXG52YXIgbmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgY2FsbGJhY2tzID0gW107XG4gIHZhciBwZW5kaW5nID0gZmFsc2U7XG4gIHZhciB0aW1lckZ1bmM7XG5cbiAgZnVuY3Rpb24gbmV4dFRpY2tIYW5kbGVyICgpIHtcbiAgICBwZW5kaW5nID0gZmFsc2U7XG4gICAgdmFyIGNvcGllcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcbiAgICBjYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvcGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29waWVzW2ldKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gdGhlIG5leHRUaWNrIGJlaGF2aW9yIGxldmVyYWdlcyB0aGUgbWljcm90YXNrIHF1ZXVlLCB3aGljaCBjYW4gYmUgYWNjZXNzZWRcbiAgLy8gdmlhIGVpdGhlciBuYXRpdmUgUHJvbWlzZS50aGVuIG9yIE11dGF0aW9uT2JzZXJ2ZXIuXG4gIC8vIE11dGF0aW9uT2JzZXJ2ZXIgaGFzIHdpZGVyIHN1cHBvcnQsIGhvd2V2ZXIgaXQgaXMgc2VyaW91c2x5IGJ1Z2dlZCBpblxuICAvLyBVSVdlYlZpZXcgaW4gaU9TID49IDkuMy4zIHdoZW4gdHJpZ2dlcmVkIGluIHRvdWNoIGV2ZW50IGhhbmRsZXJzLiBJdFxuICAvLyBjb21wbGV0ZWx5IHN0b3BzIHdvcmtpbmcgYWZ0ZXIgdHJpZ2dlcmluZyBhIGZldyB0aW1lcy4uLiBzbywgaWYgbmF0aXZlXG4gIC8vIFByb21pc2UgaXMgYXZhaWxhYmxlLCB3ZSB3aWxsIHVzZSBpdDpcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICh0eXBlb2YgUHJvbWlzZSAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYXRpdmUoUHJvbWlzZSkpIHtcbiAgICB2YXIgcCA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIHZhciBsb2dFcnJvciA9IGZ1bmN0aW9uIChlcnIpIHsgY29uc29sZS5lcnJvcihlcnIpOyB9O1xuICAgIHRpbWVyRnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHAudGhlbihuZXh0VGlja0hhbmRsZXIpLmNhdGNoKGxvZ0Vycm9yKTtcbiAgICAgIC8vIGluIHByb2JsZW1hdGljIFVJV2ViVmlld3MsIFByb21pc2UudGhlbiBkb2Vzbid0IGNvbXBsZXRlbHkgYnJlYWssIGJ1dFxuICAgICAgLy8gaXQgY2FuIGdldCBzdHVjayBpbiBhIHdlaXJkIHN0YXRlIHdoZXJlIGNhbGxiYWNrcyBhcmUgcHVzaGVkIGludG8gdGhlXG4gICAgICAvLyBtaWNyb3Rhc2sgcXVldWUgYnV0IHRoZSBxdWV1ZSBpc24ndCBiZWluZyBmbHVzaGVkLCB1bnRpbCB0aGUgYnJvd3NlclxuICAgICAgLy8gbmVlZHMgdG8gZG8gc29tZSBvdGhlciB3b3JrLCBlLmcuIGhhbmRsZSBhIHRpbWVyLiBUaGVyZWZvcmUgd2UgY2FuXG4gICAgICAvLyBcImZvcmNlXCIgdGhlIG1pY3JvdGFzayBxdWV1ZSB0byBiZSBmbHVzaGVkIGJ5IGFkZGluZyBhbiBlbXB0eSB0aW1lci5cbiAgICAgIGlmIChpc0lPUykgeyBzZXRUaW1lb3V0KG5vb3ApOyB9XG4gICAgfTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgKFxuICAgIGlzTmF0aXZlKE11dGF0aW9uT2JzZXJ2ZXIpIHx8XG4gICAgLy8gUGhhbnRvbUpTIGFuZCBpT1MgNy54XG4gICAgTXV0YXRpb25PYnNlcnZlci50b1N0cmluZygpID09PSAnW29iamVjdCBNdXRhdGlvbk9ic2VydmVyQ29uc3RydWN0b3JdJ1xuICApKSB7XG4gICAgLy8gdXNlIE11dGF0aW9uT2JzZXJ2ZXIgd2hlcmUgbmF0aXZlIFByb21pc2UgaXMgbm90IGF2YWlsYWJsZSxcbiAgICAvLyBlLmcuIFBoYW50b21KUyBJRTExLCBpT1M3LCBBbmRyb2lkIDQuNFxuICAgIHZhciBjb3VudGVyID0gMTtcbiAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihuZXh0VGlja0hhbmRsZXIpO1xuICAgIHZhciB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFN0cmluZyhjb3VudGVyKSk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0ZXh0Tm9kZSwge1xuICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZVxuICAgIH0pO1xuICAgIHRpbWVyRnVuYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvdW50ZXIgPSAoY291bnRlciArIDEpICUgMjtcbiAgICAgIHRleHROb2RlLmRhdGEgPSBTdHJpbmcoY291bnRlcik7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICAvLyBmYWxsYmFjayB0byBzZXRUaW1lb3V0XG4gICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICB0aW1lckZ1bmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzZXRUaW1lb3V0KG5leHRUaWNrSGFuZGxlciwgMCk7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBxdWV1ZU5leHRUaWNrIChjYiwgY3R4KSB7XG4gICAgdmFyIF9yZXNvbHZlO1xuICAgIGNhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChjYikgeyBjYi5jYWxsKGN0eCk7IH1cbiAgICAgIGlmIChfcmVzb2x2ZSkgeyBfcmVzb2x2ZShjdHgpOyB9XG4gICAgfSk7XG4gICAgaWYgKCFwZW5kaW5nKSB7XG4gICAgICBwZW5kaW5nID0gdHJ1ZTtcbiAgICAgIHRpbWVyRnVuYygpO1xuICAgIH1cbiAgICBpZiAoIWNiICYmIHR5cGVvZiBQcm9taXNlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIF9yZXNvbHZlID0gcmVzb2x2ZTtcbiAgICAgIH0pXG4gICAgfVxuICB9XG59KSgpO1xuXG52YXIgX1NldDtcbi8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuaWYgKHR5cGVvZiBTZXQgIT09ICd1bmRlZmluZWQnICYmIGlzTmF0aXZlKFNldCkpIHtcbiAgLy8gdXNlIG5hdGl2ZSBTZXQgd2hlbiBhdmFpbGFibGUuXG4gIF9TZXQgPSBTZXQ7XG59IGVsc2Uge1xuICAvLyBhIG5vbi1zdGFuZGFyZCBTZXQgcG9seWZpbGwgdGhhdCBvbmx5IHdvcmtzIHdpdGggcHJpbWl0aXZlIGtleXMuXG4gIF9TZXQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNldCAoKSB7XG4gICAgICB0aGlzLnNldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfVxuICAgIFNldC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gaGFzIChrZXkpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldFtrZXldID09PSB0cnVlXG4gICAgfTtcbiAgICBTZXQucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIGFkZCAoa2V5KSB7XG4gICAgICB0aGlzLnNldFtrZXldID0gdHJ1ZTtcbiAgICB9O1xuICAgIFNldC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiBjbGVhciAoKSB7XG4gICAgICB0aGlzLnNldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfTtcblxuICAgIHJldHVybiBTZXQ7XG4gIH0oKSk7XG59XG5cbnZhciBwZXJmO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBwZXJmID0gaW5Ccm93c2VyICYmIHdpbmRvdy5wZXJmb3JtYW5jZTtcbiAgaWYgKHBlcmYgJiYgKCFwZXJmLm1hcmsgfHwgIXBlcmYubWVhc3VyZSkpIHtcbiAgICBwZXJmID0gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8qICAqL1xuXG52YXIgZW1wdHlPYmplY3QgPSBPYmplY3QuZnJlZXplKHt9KTtcblxuLyoqXG4gKiBDaGVjayBpZiBhIHN0cmluZyBzdGFydHMgd2l0aCAkIG9yIF9cbiAqL1xuZnVuY3Rpb24gaXNSZXNlcnZlZCAoc3RyKSB7XG4gIHZhciBjID0gKHN0ciArICcnKS5jaGFyQ29kZUF0KDApO1xuICByZXR1cm4gYyA9PT0gMHgyNCB8fCBjID09PSAweDVGXG59XG5cbi8qKlxuICogRGVmaW5lIGEgcHJvcGVydHkuXG4gKi9cbmZ1bmN0aW9uIGRlZiAob2JqLCBrZXksIHZhbCwgZW51bWVyYWJsZSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICB2YWx1ZTogdmFsLFxuICAgIGVudW1lcmFibGU6ICEhZW51bWVyYWJsZSxcbiAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5cbi8qKlxuICogUGFyc2Ugc2ltcGxlIHBhdGguXG4gKi9cbnZhciBiYWlsUkUgPSAvW15cXHcuJF0vO1xuZnVuY3Rpb24gcGFyc2VQYXRoIChwYXRoKSB7XG4gIGlmIChiYWlsUkUudGVzdChwYXRoKSkge1xuICAgIHJldHVyblxuICB9IGVsc2Uge1xuICAgIHZhciBzZWdtZW50cyA9IHBhdGguc3BsaXQoJy4nKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWdtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIW9iaikgeyByZXR1cm4gfVxuICAgICAgICBvYmogPSBvYmpbc2VnbWVudHNbaV1dO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9ialxuICAgIH1cbiAgfVxufVxuXG52YXIgd2FybiA9IG5vb3A7XG52YXIgdGlwID0gbm9vcDtcbnZhciBmb3JtYXRDb21wb25lbnROYW1lO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgaGFzQ29uc29sZSA9IHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJztcbiAgdmFyIGNsYXNzaWZ5UkUgPSAvKD86XnxbLV9dKShcXHcpL2c7XG4gIHZhciBjbGFzc2lmeSA9IGZ1bmN0aW9uIChzdHIpIHsgcmV0dXJuIHN0clxuICAgIC5yZXBsYWNlKGNsYXNzaWZ5UkUsIGZ1bmN0aW9uIChjKSB7IHJldHVybiBjLnRvVXBwZXJDYXNlKCk7IH0pXG4gICAgLnJlcGxhY2UoL1stX10vZywgJycpOyB9O1xuXG4gIHdhcm4gPSBmdW5jdGlvbiAobXNnLCB2bSkge1xuICAgIGlmIChoYXNDb25zb2xlICYmICghY29uZmlnLnNpbGVudCkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJbVnVlIHdhcm5dOiBcIiArIG1zZyArIFwiIFwiICsgKFxuICAgICAgICB2bSA/IGZvcm1hdExvY2F0aW9uKGZvcm1hdENvbXBvbmVudE5hbWUodm0pKSA6ICcnXG4gICAgICApKTtcbiAgICB9XG4gIH07XG5cbiAgdGlwID0gZnVuY3Rpb24gKG1zZywgdm0pIHtcbiAgICBpZiAoaGFzQ29uc29sZSAmJiAoIWNvbmZpZy5zaWxlbnQpKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJbVnVlIHRpcF06IFwiICsgbXNnICsgXCIgXCIgKyAoXG4gICAgICAgIHZtID8gZm9ybWF0TG9jYXRpb24oZm9ybWF0Q29tcG9uZW50TmFtZSh2bSkpIDogJydcbiAgICAgICkpO1xuICAgIH1cbiAgfTtcblxuICBmb3JtYXRDb21wb25lbnROYW1lID0gZnVuY3Rpb24gKHZtLCBpbmNsdWRlRmlsZSkge1xuICAgIGlmICh2bS4kcm9vdCA9PT0gdm0pIHtcbiAgICAgIHJldHVybiAnPFJvb3Q+J1xuICAgIH1cbiAgICB2YXIgbmFtZSA9IHZtLl9pc1Z1ZVxuICAgICAgPyB2bS4kb3B0aW9ucy5uYW1lIHx8IHZtLiRvcHRpb25zLl9jb21wb25lbnRUYWdcbiAgICAgIDogdm0ubmFtZTtcblxuICAgIHZhciBmaWxlID0gdm0uX2lzVnVlICYmIHZtLiRvcHRpb25zLl9fZmlsZTtcbiAgICBpZiAoIW5hbWUgJiYgZmlsZSkge1xuICAgICAgdmFyIG1hdGNoID0gZmlsZS5tYXRjaCgvKFteL1xcXFxdKylcXC52dWUkLyk7XG4gICAgICBuYW1lID0gbWF0Y2ggJiYgbWF0Y2hbMV07XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIChuYW1lID8gKFwiPFwiICsgKGNsYXNzaWZ5KG5hbWUpKSArIFwiPlwiKSA6IFwiPEFub255bW91cz5cIikgK1xuICAgICAgKGZpbGUgJiYgaW5jbHVkZUZpbGUgIT09IGZhbHNlID8gKFwiIGF0IFwiICsgZmlsZSkgOiAnJylcbiAgICApXG4gIH07XG5cbiAgdmFyIGZvcm1hdExvY2F0aW9uID0gZnVuY3Rpb24gKHN0cikge1xuICAgIGlmIChzdHIgPT09IFwiPEFub255bW91cz5cIikge1xuICAgICAgc3RyICs9IFwiIC0gdXNlIHRoZSBcXFwibmFtZVxcXCIgb3B0aW9uIGZvciBiZXR0ZXIgZGVidWdnaW5nIG1lc3NhZ2VzLlwiO1xuICAgIH1cbiAgICByZXR1cm4gKFwiXFxuKGZvdW5kIGluIFwiICsgc3RyICsgXCIpXCIpXG4gIH07XG59XG5cbi8qICAqL1xuXG5cbnZhciB1aWQkMSA9IDA7XG5cbi8qKlxuICogQSBkZXAgaXMgYW4gb2JzZXJ2YWJsZSB0aGF0IGNhbiBoYXZlIG11bHRpcGxlXG4gKiBkaXJlY3RpdmVzIHN1YnNjcmliaW5nIHRvIGl0LlxuICovXG52YXIgRGVwID0gZnVuY3Rpb24gRGVwICgpIHtcbiAgdGhpcy5pZCA9IHVpZCQxKys7XG4gIHRoaXMuc3VicyA9IFtdO1xufTtcblxuRGVwLnByb3RvdHlwZS5hZGRTdWIgPSBmdW5jdGlvbiBhZGRTdWIgKHN1Yikge1xuICB0aGlzLnN1YnMucHVzaChzdWIpO1xufTtcblxuRGVwLnByb3RvdHlwZS5yZW1vdmVTdWIgPSBmdW5jdGlvbiByZW1vdmVTdWIgKHN1Yikge1xuICByZW1vdmUodGhpcy5zdWJzLCBzdWIpO1xufTtcblxuRGVwLnByb3RvdHlwZS5kZXBlbmQgPSBmdW5jdGlvbiBkZXBlbmQgKCkge1xuICBpZiAoRGVwLnRhcmdldCkge1xuICAgIERlcC50YXJnZXQuYWRkRGVwKHRoaXMpO1xuICB9XG59O1xuXG5EZXAucHJvdG90eXBlLm5vdGlmeSA9IGZ1bmN0aW9uIG5vdGlmeSAoKSB7XG4gIC8vIHN0YWJsaXplIHRoZSBzdWJzY3JpYmVyIGxpc3QgZmlyc3RcbiAgdmFyIHN1YnMgPSB0aGlzLnN1YnMuc2xpY2UoKTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBzdWJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHN1YnNbaV0udXBkYXRlKCk7XG4gIH1cbn07XG5cbi8vIHRoZSBjdXJyZW50IHRhcmdldCB3YXRjaGVyIGJlaW5nIGV2YWx1YXRlZC5cbi8vIHRoaXMgaXMgZ2xvYmFsbHkgdW5pcXVlIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb25seSBvbmVcbi8vIHdhdGNoZXIgYmVpbmcgZXZhbHVhdGVkIGF0IGFueSB0aW1lLlxuRGVwLnRhcmdldCA9IG51bGw7XG52YXIgdGFyZ2V0U3RhY2sgPSBbXTtcblxuZnVuY3Rpb24gcHVzaFRhcmdldCAoX3RhcmdldCkge1xuICBpZiAoRGVwLnRhcmdldCkgeyB0YXJnZXRTdGFjay5wdXNoKERlcC50YXJnZXQpOyB9XG4gIERlcC50YXJnZXQgPSBfdGFyZ2V0O1xufVxuXG5mdW5jdGlvbiBwb3BUYXJnZXQgKCkge1xuICBEZXAudGFyZ2V0ID0gdGFyZ2V0U3RhY2sucG9wKCk7XG59XG5cbi8qXG4gKiBub3QgdHlwZSBjaGVja2luZyB0aGlzIGZpbGUgYmVjYXVzZSBmbG93IGRvZXNuJ3QgcGxheSB3ZWxsIHdpdGhcbiAqIGR5bmFtaWNhbGx5IGFjY2Vzc2luZyBtZXRob2RzIG9uIEFycmF5IHByb3RvdHlwZVxuICovXG5cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xudmFyIGFycmF5TWV0aG9kcyA9IE9iamVjdC5jcmVhdGUoYXJyYXlQcm90byk7W1xuICAncHVzaCcsXG4gICdwb3AnLFxuICAnc2hpZnQnLFxuICAndW5zaGlmdCcsXG4gICdzcGxpY2UnLFxuICAnc29ydCcsXG4gICdyZXZlcnNlJ1xuXVxuLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZCkge1xuICAvLyBjYWNoZSBvcmlnaW5hbCBtZXRob2RcbiAgdmFyIG9yaWdpbmFsID0gYXJyYXlQcm90b1ttZXRob2RdO1xuICBkZWYoYXJyYXlNZXRob2RzLCBtZXRob2QsIGZ1bmN0aW9uIG11dGF0b3IgKCkge1xuICAgIHZhciBhcmd1bWVudHMkMSA9IGFyZ3VtZW50cztcblxuICAgIC8vIGF2b2lkIGxlYWtpbmcgYXJndW1lbnRzOlxuICAgIC8vIGh0dHA6Ly9qc3BlcmYuY29tL2Nsb3N1cmUtd2l0aC1hcmd1bWVudHNcbiAgICB2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoaSk7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50cyQxW2ldO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gb3JpZ2luYWwuYXBwbHkodGhpcywgYXJncyk7XG4gICAgdmFyIG9iID0gdGhpcy5fX29iX187XG4gICAgdmFyIGluc2VydGVkO1xuICAgIHN3aXRjaCAobWV0aG9kKSB7XG4gICAgICBjYXNlICdwdXNoJzpcbiAgICAgICAgaW5zZXJ0ZWQgPSBhcmdzO1xuICAgICAgICBicmVha1xuICAgICAgY2FzZSAndW5zaGlmdCc6XG4gICAgICAgIGluc2VydGVkID0gYXJncztcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ3NwbGljZSc6XG4gICAgICAgIGluc2VydGVkID0gYXJncy5zbGljZSgyKTtcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gICAgaWYgKGluc2VydGVkKSB7IG9iLm9ic2VydmVBcnJheShpbnNlcnRlZCk7IH1cbiAgICAvLyBub3RpZnkgY2hhbmdlXG4gICAgb2IuZGVwLm5vdGlmeSgpO1xuICAgIHJldHVybiByZXN1bHRcbiAgfSk7XG59KTtcblxuLyogICovXG5cbnZhciBhcnJheUtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhhcnJheU1ldGhvZHMpO1xuXG4vKipcbiAqIEJ5IGRlZmF1bHQsIHdoZW4gYSByZWFjdGl2ZSBwcm9wZXJ0eSBpcyBzZXQsIHRoZSBuZXcgdmFsdWUgaXNcbiAqIGFsc28gY29udmVydGVkIHRvIGJlY29tZSByZWFjdGl2ZS4gSG93ZXZlciB3aGVuIHBhc3NpbmcgZG93biBwcm9wcyxcbiAqIHdlIGRvbid0IHdhbnQgdG8gZm9yY2UgY29udmVyc2lvbiBiZWNhdXNlIHRoZSB2YWx1ZSBtYXkgYmUgYSBuZXN0ZWQgdmFsdWVcbiAqIHVuZGVyIGEgZnJvemVuIGRhdGEgc3RydWN0dXJlLiBDb252ZXJ0aW5nIGl0IHdvdWxkIGRlZmVhdCB0aGUgb3B0aW1pemF0aW9uLlxuICovXG52YXIgb2JzZXJ2ZXJTdGF0ZSA9IHtcbiAgc2hvdWxkQ29udmVydDogdHJ1ZSxcbiAgaXNTZXR0aW5nUHJvcHM6IGZhbHNlXG59O1xuXG4vKipcbiAqIE9ic2VydmVyIGNsYXNzIHRoYXQgYXJlIGF0dGFjaGVkIHRvIGVhY2ggb2JzZXJ2ZWRcbiAqIG9iamVjdC4gT25jZSBhdHRhY2hlZCwgdGhlIG9ic2VydmVyIGNvbnZlcnRzIHRhcmdldFxuICogb2JqZWN0J3MgcHJvcGVydHkga2V5cyBpbnRvIGdldHRlci9zZXR0ZXJzIHRoYXRcbiAqIGNvbGxlY3QgZGVwZW5kZW5jaWVzIGFuZCBkaXNwYXRjaGVzIHVwZGF0ZXMuXG4gKi9cbnZhciBPYnNlcnZlciA9IGZ1bmN0aW9uIE9ic2VydmVyICh2YWx1ZSkge1xuICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIHRoaXMuZGVwID0gbmV3IERlcCgpO1xuICB0aGlzLnZtQ291bnQgPSAwO1xuICBkZWYodmFsdWUsICdfX29iX18nLCB0aGlzKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgdmFyIGF1Z21lbnQgPSBoYXNQcm90b1xuICAgICAgPyBwcm90b0F1Z21lbnRcbiAgICAgIDogY29weUF1Z21lbnQ7XG4gICAgYXVnbWVudCh2YWx1ZSwgYXJyYXlNZXRob2RzLCBhcnJheUtleXMpO1xuICAgIHRoaXMub2JzZXJ2ZUFycmF5KHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLndhbGsodmFsdWUpO1xuICB9XG59O1xuXG4vKipcbiAqIFdhbGsgdGhyb3VnaCBlYWNoIHByb3BlcnR5IGFuZCBjb252ZXJ0IHRoZW0gaW50b1xuICogZ2V0dGVyL3NldHRlcnMuIFRoaXMgbWV0aG9kIHNob3VsZCBvbmx5IGJlIGNhbGxlZCB3aGVuXG4gKiB2YWx1ZSB0eXBlIGlzIE9iamVjdC5cbiAqL1xuT2JzZXJ2ZXIucHJvdG90eXBlLndhbGsgPSBmdW5jdGlvbiB3YWxrIChvYmopIHtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBkZWZpbmVSZWFjdGl2ZSQkMShvYmosIGtleXNbaV0sIG9ialtrZXlzW2ldXSk7XG4gIH1cbn07XG5cbi8qKlxuICogT2JzZXJ2ZSBhIGxpc3Qgb2YgQXJyYXkgaXRlbXMuXG4gKi9cbk9ic2VydmVyLnByb3RvdHlwZS5vYnNlcnZlQXJyYXkgPSBmdW5jdGlvbiBvYnNlcnZlQXJyYXkgKGl0ZW1zKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gaXRlbXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgb2JzZXJ2ZShpdGVtc1tpXSk7XG4gIH1cbn07XG5cbi8vIGhlbHBlcnNcblxuLyoqXG4gKiBBdWdtZW50IGFuIHRhcmdldCBPYmplY3Qgb3IgQXJyYXkgYnkgaW50ZXJjZXB0aW5nXG4gKiB0aGUgcHJvdG90eXBlIGNoYWluIHVzaW5nIF9fcHJvdG9fX1xuICovXG5mdW5jdGlvbiBwcm90b0F1Z21lbnQgKHRhcmdldCwgc3JjKSB7XG4gIC8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG4gIHRhcmdldC5fX3Byb3RvX18gPSBzcmM7XG4gIC8qIGVzbGludC1lbmFibGUgbm8tcHJvdG8gKi9cbn1cblxuLyoqXG4gKiBBdWdtZW50IGFuIHRhcmdldCBPYmplY3Qgb3IgQXJyYXkgYnkgZGVmaW5pbmdcbiAqIGhpZGRlbiBwcm9wZXJ0aWVzLlxuICovXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuZnVuY3Rpb24gY29weUF1Z21lbnQgKHRhcmdldCwgc3JjLCBrZXlzKSB7XG4gIGZvciAodmFyIGkgPSAwLCBsID0ga2V5cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICBkZWYodGFyZ2V0LCBrZXksIHNyY1trZXldKTtcbiAgfVxufVxuXG4vKipcbiAqIEF0dGVtcHQgdG8gY3JlYXRlIGFuIG9ic2VydmVyIGluc3RhbmNlIGZvciBhIHZhbHVlLFxuICogcmV0dXJucyB0aGUgbmV3IG9ic2VydmVyIGlmIHN1Y2Nlc3NmdWxseSBvYnNlcnZlZCxcbiAqIG9yIHRoZSBleGlzdGluZyBvYnNlcnZlciBpZiB0aGUgdmFsdWUgYWxyZWFkeSBoYXMgb25lLlxuICovXG5mdW5jdGlvbiBvYnNlcnZlICh2YWx1ZSwgYXNSb290RGF0YSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVyblxuICB9XG4gIHZhciBvYjtcbiAgaWYgKGhhc093bih2YWx1ZSwgJ19fb2JfXycpICYmIHZhbHVlLl9fb2JfXyBpbnN0YW5jZW9mIE9ic2VydmVyKSB7XG4gICAgb2IgPSB2YWx1ZS5fX29iX187XG4gIH0gZWxzZSBpZiAoXG4gICAgb2JzZXJ2ZXJTdGF0ZS5zaG91bGRDb252ZXJ0ICYmXG4gICAgIWlzU2VydmVyUmVuZGVyaW5nKCkgJiZcbiAgICAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgaXNQbGFpbk9iamVjdCh2YWx1ZSkpICYmXG4gICAgT2JqZWN0LmlzRXh0ZW5zaWJsZSh2YWx1ZSkgJiZcbiAgICAhdmFsdWUuX2lzVnVlXG4gICkge1xuICAgIG9iID0gbmV3IE9ic2VydmVyKHZhbHVlKTtcbiAgfVxuICBpZiAoYXNSb290RGF0YSAmJiBvYikge1xuICAgIG9iLnZtQ291bnQrKztcbiAgfVxuICByZXR1cm4gb2Jcbn1cblxuLyoqXG4gKiBEZWZpbmUgYSByZWFjdGl2ZSBwcm9wZXJ0eSBvbiBhbiBPYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGRlZmluZVJlYWN0aXZlJCQxIChcbiAgb2JqLFxuICBrZXksXG4gIHZhbCxcbiAgY3VzdG9tU2V0dGVyXG4pIHtcbiAgdmFyIGRlcCA9IG5ldyBEZXAoKTtcblxuICB2YXIgcHJvcGVydHkgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgaWYgKHByb3BlcnR5ICYmIHByb3BlcnR5LmNvbmZpZ3VyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIGNhdGVyIGZvciBwcmUtZGVmaW5lZCBnZXR0ZXIvc2V0dGVyc1xuICB2YXIgZ2V0dGVyID0gcHJvcGVydHkgJiYgcHJvcGVydHkuZ2V0O1xuICB2YXIgc2V0dGVyID0gcHJvcGVydHkgJiYgcHJvcGVydHkuc2V0O1xuXG4gIHZhciBjaGlsZE9iID0gb2JzZXJ2ZSh2YWwpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIHJlYWN0aXZlR2V0dGVyICgpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGdldHRlciA/IGdldHRlci5jYWxsKG9iaikgOiB2YWw7XG4gICAgICBpZiAoRGVwLnRhcmdldCkge1xuICAgICAgICBkZXAuZGVwZW5kKCk7XG4gICAgICAgIGlmIChjaGlsZE9iKSB7XG4gICAgICAgICAgY2hpbGRPYi5kZXAuZGVwZW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgZGVwZW5kQXJyYXkodmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gcmVhY3RpdmVTZXR0ZXIgKG5ld1ZhbCkge1xuICAgICAgdmFyIHZhbHVlID0gZ2V0dGVyID8gZ2V0dGVyLmNhbGwob2JqKSA6IHZhbDtcbiAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXNlbGYtY29tcGFyZSAqL1xuICAgICAgaWYgKG5ld1ZhbCA9PT0gdmFsdWUgfHwgKG5ld1ZhbCAhPT0gbmV3VmFsICYmIHZhbHVlICE9PSB2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSAqL1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgY3VzdG9tU2V0dGVyKSB7XG4gICAgICAgIGN1c3RvbVNldHRlcigpO1xuICAgICAgfVxuICAgICAgaWYgKHNldHRlcikge1xuICAgICAgICBzZXR0ZXIuY2FsbChvYmosIG5ld1ZhbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBuZXdWYWw7XG4gICAgICB9XG4gICAgICBjaGlsZE9iID0gb2JzZXJ2ZShuZXdWYWwpO1xuICAgICAgZGVwLm5vdGlmeSgpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogU2V0IGEgcHJvcGVydHkgb24gYW4gb2JqZWN0LiBBZGRzIHRoZSBuZXcgcHJvcGVydHkgYW5kXG4gKiB0cmlnZ2VycyBjaGFuZ2Ugbm90aWZpY2F0aW9uIGlmIHRoZSBwcm9wZXJ0eSBkb2Vzbid0XG4gKiBhbHJlYWR5IGV4aXN0LlxuICovXG5mdW5jdGlvbiBzZXQgKG9iaiwga2V5LCB2YWwpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIG9iai5sZW5ndGggPSBNYXRoLm1heChvYmoubGVuZ3RoLCBrZXkpO1xuICAgIG9iai5zcGxpY2Uoa2V5LCAxLCB2YWwpO1xuICAgIHJldHVybiB2YWxcbiAgfVxuICBpZiAoaGFzT3duKG9iaiwga2V5KSkge1xuICAgIG9ialtrZXldID0gdmFsO1xuICAgIHJldHVyblxuICB9XG4gIHZhciBvYiA9IG9iai5fX29iX187XG4gIGlmIChvYmouX2lzVnVlIHx8IChvYiAmJiBvYi52bUNvdW50KSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICdBdm9pZCBhZGRpbmcgcmVhY3RpdmUgcHJvcGVydGllcyB0byBhIFZ1ZSBpbnN0YW5jZSBvciBpdHMgcm9vdCAkZGF0YSAnICtcbiAgICAgICdhdCBydW50aW1lIC0gZGVjbGFyZSBpdCB1cGZyb250IGluIHRoZSBkYXRhIG9wdGlvbi4nXG4gICAgKTtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAoIW9iKSB7XG4gICAgb2JqW2tleV0gPSB2YWw7XG4gICAgcmV0dXJuXG4gIH1cbiAgZGVmaW5lUmVhY3RpdmUkJDEob2IudmFsdWUsIGtleSwgdmFsKTtcbiAgb2IuZGVwLm5vdGlmeSgpO1xuICByZXR1cm4gdmFsXG59XG5cbi8qKlxuICogRGVsZXRlIGEgcHJvcGVydHkgYW5kIHRyaWdnZXIgY2hhbmdlIGlmIG5lY2Vzc2FyeS5cbiAqL1xuZnVuY3Rpb24gZGVsIChvYmosIGtleSkge1xuICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgb2JqLnNwbGljZShrZXksIDEpO1xuICAgIHJldHVyblxuICB9XG4gIHZhciBvYiA9IG9iai5fX29iX187XG4gIGlmIChvYmouX2lzVnVlIHx8IChvYiAmJiBvYi52bUNvdW50KSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICdBdm9pZCBkZWxldGluZyBwcm9wZXJ0aWVzIG9uIGEgVnVlIGluc3RhbmNlIG9yIGl0cyByb290ICRkYXRhICcgK1xuICAgICAgJy0ganVzdCBzZXQgaXQgdG8gbnVsbC4nXG4gICAgKTtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAoIWhhc093bihvYmosIGtleSkpIHtcbiAgICByZXR1cm5cbiAgfVxuICBkZWxldGUgb2JqW2tleV07XG4gIGlmICghb2IpIHtcbiAgICByZXR1cm5cbiAgfVxuICBvYi5kZXAubm90aWZ5KCk7XG59XG5cbi8qKlxuICogQ29sbGVjdCBkZXBlbmRlbmNpZXMgb24gYXJyYXkgZWxlbWVudHMgd2hlbiB0aGUgYXJyYXkgaXMgdG91Y2hlZCwgc2luY2VcbiAqIHdlIGNhbm5vdCBpbnRlcmNlcHQgYXJyYXkgZWxlbWVudCBhY2Nlc3MgbGlrZSBwcm9wZXJ0eSBnZXR0ZXJzLlxuICovXG5mdW5jdGlvbiBkZXBlbmRBcnJheSAodmFsdWUpIHtcbiAgZm9yICh2YXIgZSA9ICh2b2lkIDApLCBpID0gMCwgbCA9IHZhbHVlLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGUgPSB2YWx1ZVtpXTtcbiAgICBlICYmIGUuX19vYl9fICYmIGUuX19vYl9fLmRlcC5kZXBlbmQoKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShlKSkge1xuICAgICAgZGVwZW5kQXJyYXkoZSk7XG4gICAgfVxuICB9XG59XG5cbi8qICAqL1xuXG4vKipcbiAqIE9wdGlvbiBvdmVyd3JpdGluZyBzdHJhdGVnaWVzIGFyZSBmdW5jdGlvbnMgdGhhdCBoYW5kbGVcbiAqIGhvdyB0byBtZXJnZSBhIHBhcmVudCBvcHRpb24gdmFsdWUgYW5kIGEgY2hpbGQgb3B0aW9uXG4gKiB2YWx1ZSBpbnRvIHRoZSBmaW5hbCB2YWx1ZS5cbiAqL1xudmFyIHN0cmF0cyA9IGNvbmZpZy5vcHRpb25NZXJnZVN0cmF0ZWdpZXM7XG5cbi8qKlxuICogT3B0aW9ucyB3aXRoIHJlc3RyaWN0aW9uc1xuICovXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBzdHJhdHMuZWwgPSBzdHJhdHMucHJvcHNEYXRhID0gZnVuY3Rpb24gKHBhcmVudCwgY2hpbGQsIHZtLCBrZXkpIHtcbiAgICBpZiAoIXZtKSB7XG4gICAgICB3YXJuKFxuICAgICAgICBcIm9wdGlvbiBcXFwiXCIgKyBrZXkgKyBcIlxcXCIgY2FuIG9ubHkgYmUgdXNlZCBkdXJpbmcgaW5zdGFuY2UgXCIgK1xuICAgICAgICAnY3JlYXRpb24gd2l0aCB0aGUgYG5ld2Aga2V5d29yZC4nXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFN0cmF0KHBhcmVudCwgY2hpbGQpXG4gIH07XG59XG5cbi8qKlxuICogSGVscGVyIHRoYXQgcmVjdXJzaXZlbHkgbWVyZ2VzIHR3byBkYXRhIG9iamVjdHMgdG9nZXRoZXIuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlRGF0YSAodG8sIGZyb20pIHtcbiAgaWYgKCFmcm9tKSB7IHJldHVybiB0byB9XG4gIHZhciBrZXksIHRvVmFsLCBmcm9tVmFsO1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGZyb20pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICBrZXkgPSBrZXlzW2ldO1xuICAgIHRvVmFsID0gdG9ba2V5XTtcbiAgICBmcm9tVmFsID0gZnJvbVtrZXldO1xuICAgIGlmICghaGFzT3duKHRvLCBrZXkpKSB7XG4gICAgICBzZXQodG8sIGtleSwgZnJvbVZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHRvVmFsKSAmJiBpc1BsYWluT2JqZWN0KGZyb21WYWwpKSB7XG4gICAgICBtZXJnZURhdGEodG9WYWwsIGZyb21WYWwpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdG9cbn1cblxuLyoqXG4gKiBEYXRhXG4gKi9cbnN0cmF0cy5kYXRhID0gZnVuY3Rpb24gKFxuICBwYXJlbnRWYWwsXG4gIGNoaWxkVmFsLFxuICB2bVxuKSB7XG4gIGlmICghdm0pIHtcbiAgICAvLyBpbiBhIFZ1ZS5leHRlbmQgbWVyZ2UsIGJvdGggc2hvdWxkIGJlIGZ1bmN0aW9uc1xuICAgIGlmICghY2hpbGRWYWwpIHtcbiAgICAgIHJldHVybiBwYXJlbnRWYWxcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjaGlsZFZhbCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgICAnVGhlIFwiZGF0YVwiIG9wdGlvbiBzaG91bGQgYmUgYSBmdW5jdGlvbiAnICtcbiAgICAgICAgJ3RoYXQgcmV0dXJucyBhIHBlci1pbnN0YW5jZSB2YWx1ZSBpbiBjb21wb25lbnQgJyArXG4gICAgICAgICdkZWZpbml0aW9ucy4nLFxuICAgICAgICB2bVxuICAgICAgKTtcbiAgICAgIHJldHVybiBwYXJlbnRWYWxcbiAgICB9XG4gICAgaWYgKCFwYXJlbnRWYWwpIHtcbiAgICAgIHJldHVybiBjaGlsZFZhbFxuICAgIH1cbiAgICAvLyB3aGVuIHBhcmVudFZhbCAmIGNoaWxkVmFsIGFyZSBib3RoIHByZXNlbnQsXG4gICAgLy8gd2UgbmVlZCB0byByZXR1cm4gYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlXG4gICAgLy8gbWVyZ2VkIHJlc3VsdCBvZiBib3RoIGZ1bmN0aW9ucy4uLiBubyBuZWVkIHRvXG4gICAgLy8gY2hlY2sgaWYgcGFyZW50VmFsIGlzIGEgZnVuY3Rpb24gaGVyZSBiZWNhdXNlXG4gICAgLy8gaXQgaGFzIHRvIGJlIGEgZnVuY3Rpb24gdG8gcGFzcyBwcmV2aW91cyBtZXJnZXMuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1lcmdlZERhdGFGbiAoKSB7XG4gICAgICByZXR1cm4gbWVyZ2VEYXRhKFxuICAgICAgICBjaGlsZFZhbC5jYWxsKHRoaXMpLFxuICAgICAgICBwYXJlbnRWYWwuY2FsbCh0aGlzKVxuICAgICAgKVxuICAgIH1cbiAgfSBlbHNlIGlmIChwYXJlbnRWYWwgfHwgY2hpbGRWYWwpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gbWVyZ2VkSW5zdGFuY2VEYXRhRm4gKCkge1xuICAgICAgLy8gaW5zdGFuY2UgbWVyZ2VcbiAgICAgIHZhciBpbnN0YW5jZURhdGEgPSB0eXBlb2YgY2hpbGRWYWwgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBjaGlsZFZhbC5jYWxsKHZtKVxuICAgICAgICA6IGNoaWxkVmFsO1xuICAgICAgdmFyIGRlZmF1bHREYXRhID0gdHlwZW9mIHBhcmVudFZhbCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICA/IHBhcmVudFZhbC5jYWxsKHZtKVxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIGlmIChpbnN0YW5jZURhdGEpIHtcbiAgICAgICAgcmV0dXJuIG1lcmdlRGF0YShpbnN0YW5jZURhdGEsIGRlZmF1bHREYXRhKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHREYXRhXG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEhvb2tzIGFuZCBwcm9wcyBhcmUgbWVyZ2VkIGFzIGFycmF5cy5cbiAqL1xuZnVuY3Rpb24gbWVyZ2VIb29rIChcbiAgcGFyZW50VmFsLFxuICBjaGlsZFZhbFxuKSB7XG4gIHJldHVybiBjaGlsZFZhbFxuICAgID8gcGFyZW50VmFsXG4gICAgICA/IHBhcmVudFZhbC5jb25jYXQoY2hpbGRWYWwpXG4gICAgICA6IEFycmF5LmlzQXJyYXkoY2hpbGRWYWwpXG4gICAgICAgID8gY2hpbGRWYWxcbiAgICAgICAgOiBbY2hpbGRWYWxdXG4gICAgOiBwYXJlbnRWYWxcbn1cblxuY29uZmlnLl9saWZlY3ljbGVIb29rcy5mb3JFYWNoKGZ1bmN0aW9uIChob29rKSB7XG4gIHN0cmF0c1tob29rXSA9IG1lcmdlSG9vaztcbn0pO1xuXG4vKipcbiAqIEFzc2V0c1xuICpcbiAqIFdoZW4gYSB2bSBpcyBwcmVzZW50IChpbnN0YW5jZSBjcmVhdGlvbiksIHdlIG5lZWQgdG8gZG9cbiAqIGEgdGhyZWUtd2F5IG1lcmdlIGJldHdlZW4gY29uc3RydWN0b3Igb3B0aW9ucywgaW5zdGFuY2VcbiAqIG9wdGlvbnMgYW5kIHBhcmVudCBvcHRpb25zLlxuICovXG5mdW5jdGlvbiBtZXJnZUFzc2V0cyAocGFyZW50VmFsLCBjaGlsZFZhbCkge1xuICB2YXIgcmVzID0gT2JqZWN0LmNyZWF0ZShwYXJlbnRWYWwgfHwgbnVsbCk7XG4gIHJldHVybiBjaGlsZFZhbFxuICAgID8gZXh0ZW5kKHJlcywgY2hpbGRWYWwpXG4gICAgOiByZXNcbn1cblxuY29uZmlnLl9hc3NldFR5cGVzLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgc3RyYXRzW3R5cGUgKyAncyddID0gbWVyZ2VBc3NldHM7XG59KTtcblxuLyoqXG4gKiBXYXRjaGVycy5cbiAqXG4gKiBXYXRjaGVycyBoYXNoZXMgc2hvdWxkIG5vdCBvdmVyd3JpdGUgb25lXG4gKiBhbm90aGVyLCBzbyB3ZSBtZXJnZSB0aGVtIGFzIGFycmF5cy5cbiAqL1xuc3RyYXRzLndhdGNoID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICghY2hpbGRWYWwpIHsgcmV0dXJuIE9iamVjdC5jcmVhdGUocGFyZW50VmFsIHx8IG51bGwpIH1cbiAgaWYgKCFwYXJlbnRWYWwpIHsgcmV0dXJuIGNoaWxkVmFsIH1cbiAgdmFyIHJldCA9IHt9O1xuICBleHRlbmQocmV0LCBwYXJlbnRWYWwpO1xuICBmb3IgKHZhciBrZXkgaW4gY2hpbGRWYWwpIHtcbiAgICB2YXIgcGFyZW50ID0gcmV0W2tleV07XG4gICAgdmFyIGNoaWxkID0gY2hpbGRWYWxba2V5XTtcbiAgICBpZiAocGFyZW50ICYmICFBcnJheS5pc0FycmF5KHBhcmVudCkpIHtcbiAgICAgIHBhcmVudCA9IFtwYXJlbnRdO1xuICAgIH1cbiAgICByZXRba2V5XSA9IHBhcmVudFxuICAgICAgPyBwYXJlbnQuY29uY2F0KGNoaWxkKVxuICAgICAgOiBbY2hpbGRdO1xuICB9XG4gIHJldHVybiByZXRcbn07XG5cbi8qKlxuICogT3RoZXIgb2JqZWN0IGhhc2hlcy5cbiAqL1xuc3RyYXRzLnByb3BzID1cbnN0cmF0cy5tZXRob2RzID1cbnN0cmF0cy5jb21wdXRlZCA9IGZ1bmN0aW9uIChwYXJlbnRWYWwsIGNoaWxkVmFsKSB7XG4gIGlmICghY2hpbGRWYWwpIHsgcmV0dXJuIE9iamVjdC5jcmVhdGUocGFyZW50VmFsIHx8IG51bGwpIH1cbiAgaWYgKCFwYXJlbnRWYWwpIHsgcmV0dXJuIGNoaWxkVmFsIH1cbiAgdmFyIHJldCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGV4dGVuZChyZXQsIHBhcmVudFZhbCk7XG4gIGV4dGVuZChyZXQsIGNoaWxkVmFsKTtcbiAgcmV0dXJuIHJldFxufTtcblxuLyoqXG4gKiBEZWZhdWx0IHN0cmF0ZWd5LlxuICovXG52YXIgZGVmYXVsdFN0cmF0ID0gZnVuY3Rpb24gKHBhcmVudFZhbCwgY2hpbGRWYWwpIHtcbiAgcmV0dXJuIGNoaWxkVmFsID09PSB1bmRlZmluZWRcbiAgICA/IHBhcmVudFZhbFxuICAgIDogY2hpbGRWYWxcbn07XG5cbi8qKlxuICogVmFsaWRhdGUgY29tcG9uZW50IG5hbWVzXG4gKi9cbmZ1bmN0aW9uIGNoZWNrQ29tcG9uZW50cyAob3B0aW9ucykge1xuICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucy5jb21wb25lbnRzKSB7XG4gICAgdmFyIGxvd2VyID0ga2V5LnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKGlzQnVpbHRJblRhZyhsb3dlcikgfHwgY29uZmlnLmlzUmVzZXJ2ZWRUYWcobG93ZXIpKSB7XG4gICAgICB3YXJuKFxuICAgICAgICAnRG8gbm90IHVzZSBidWlsdC1pbiBvciByZXNlcnZlZCBIVE1MIGVsZW1lbnRzIGFzIGNvbXBvbmVudCAnICtcbiAgICAgICAgJ2lkOiAnICsga2V5XG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEVuc3VyZSBhbGwgcHJvcHMgb3B0aW9uIHN5bnRheCBhcmUgbm9ybWFsaXplZCBpbnRvIHRoZVxuICogT2JqZWN0LWJhc2VkIGZvcm1hdC5cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplUHJvcHMgKG9wdGlvbnMpIHtcbiAgdmFyIHByb3BzID0gb3B0aW9ucy5wcm9wcztcbiAgaWYgKCFwcm9wcykgeyByZXR1cm4gfVxuICB2YXIgcmVzID0ge307XG4gIHZhciBpLCB2YWwsIG5hbWU7XG4gIGlmIChBcnJheS5pc0FycmF5KHByb3BzKSkge1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdmFsID0gcHJvcHNbaV07XG4gICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbmFtZSA9IGNhbWVsaXplKHZhbCk7XG4gICAgICAgIHJlc1tuYW1lXSA9IHsgdHlwZTogbnVsbCB9O1xuICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHdhcm4oJ3Byb3BzIG11c3QgYmUgc3RyaW5ncyB3aGVuIHVzaW5nIGFycmF5IHN5bnRheC4nKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNQbGFpbk9iamVjdChwcm9wcykpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHtcbiAgICAgIHZhbCA9IHByb3BzW2tleV07XG4gICAgICBuYW1lID0gY2FtZWxpemUoa2V5KTtcbiAgICAgIHJlc1tuYW1lXSA9IGlzUGxhaW5PYmplY3QodmFsKVxuICAgICAgICA/IHZhbFxuICAgICAgICA6IHsgdHlwZTogdmFsIH07XG4gICAgfVxuICB9XG4gIG9wdGlvbnMucHJvcHMgPSByZXM7XG59XG5cbi8qKlxuICogTm9ybWFsaXplIHJhdyBmdW5jdGlvbiBkaXJlY3RpdmVzIGludG8gb2JqZWN0IGZvcm1hdC5cbiAqL1xuZnVuY3Rpb24gbm9ybWFsaXplRGlyZWN0aXZlcyAob3B0aW9ucykge1xuICB2YXIgZGlycyA9IG9wdGlvbnMuZGlyZWN0aXZlcztcbiAgaWYgKGRpcnMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGlycykge1xuICAgICAgdmFyIGRlZiA9IGRpcnNba2V5XTtcbiAgICAgIGlmICh0eXBlb2YgZGVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGRpcnNba2V5XSA9IHsgYmluZDogZGVmLCB1cGRhdGU6IGRlZiB9O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIE1lcmdlIHR3byBvcHRpb24gb2JqZWN0cyBpbnRvIGEgbmV3IG9uZS5cbiAqIENvcmUgdXRpbGl0eSB1c2VkIGluIGJvdGggaW5zdGFudGlhdGlvbiBhbmQgaW5oZXJpdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1lcmdlT3B0aW9ucyAoXG4gIHBhcmVudCxcbiAgY2hpbGQsXG4gIHZtXG4pIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBjaGVja0NvbXBvbmVudHMoY2hpbGQpO1xuICB9XG4gIG5vcm1hbGl6ZVByb3BzKGNoaWxkKTtcbiAgbm9ybWFsaXplRGlyZWN0aXZlcyhjaGlsZCk7XG4gIHZhciBleHRlbmRzRnJvbSA9IGNoaWxkLmV4dGVuZHM7XG4gIGlmIChleHRlbmRzRnJvbSkge1xuICAgIHBhcmVudCA9IHR5cGVvZiBleHRlbmRzRnJvbSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyBtZXJnZU9wdGlvbnMocGFyZW50LCBleHRlbmRzRnJvbS5vcHRpb25zLCB2bSlcbiAgICAgIDogbWVyZ2VPcHRpb25zKHBhcmVudCwgZXh0ZW5kc0Zyb20sIHZtKTtcbiAgfVxuICBpZiAoY2hpbGQubWl4aW5zKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBjaGlsZC5taXhpbnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIgbWl4aW4gPSBjaGlsZC5taXhpbnNbaV07XG4gICAgICBpZiAobWl4aW4ucHJvdG90eXBlIGluc3RhbmNlb2YgVnVlJDIpIHtcbiAgICAgICAgbWl4aW4gPSBtaXhpbi5vcHRpb25zO1xuICAgICAgfVxuICAgICAgcGFyZW50ID0gbWVyZ2VPcHRpb25zKHBhcmVudCwgbWl4aW4sIHZtKTtcbiAgICB9XG4gIH1cbiAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gcGFyZW50KSB7XG4gICAgbWVyZ2VGaWVsZChrZXkpO1xuICB9XG4gIGZvciAoa2V5IGluIGNoaWxkKSB7XG4gICAgaWYgKCFoYXNPd24ocGFyZW50LCBrZXkpKSB7XG4gICAgICBtZXJnZUZpZWxkKGtleSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG1lcmdlRmllbGQgKGtleSkge1xuICAgIHZhciBzdHJhdCA9IHN0cmF0c1trZXldIHx8IGRlZmF1bHRTdHJhdDtcbiAgICBvcHRpb25zW2tleV0gPSBzdHJhdChwYXJlbnRba2V5XSwgY2hpbGRba2V5XSwgdm0sIGtleSk7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnNcbn1cblxuLyoqXG4gKiBSZXNvbHZlIGFuIGFzc2V0LlxuICogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIGJlY2F1c2UgY2hpbGQgaW5zdGFuY2VzIG5lZWQgYWNjZXNzXG4gKiB0byBhc3NldHMgZGVmaW5lZCBpbiBpdHMgYW5jZXN0b3IgY2hhaW4uXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmVBc3NldCAoXG4gIG9wdGlvbnMsXG4gIHR5cGUsXG4gIGlkLFxuICB3YXJuTWlzc2luZ1xuKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAodHlwZW9mIGlkICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVyblxuICB9XG4gIHZhciBhc3NldHMgPSBvcHRpb25zW3R5cGVdO1xuICAvLyBjaGVjayBsb2NhbCByZWdpc3RyYXRpb24gdmFyaWF0aW9ucyBmaXJzdFxuICBpZiAoaGFzT3duKGFzc2V0cywgaWQpKSB7IHJldHVybiBhc3NldHNbaWRdIH1cbiAgdmFyIGNhbWVsaXplZElkID0gY2FtZWxpemUoaWQpO1xuICBpZiAoaGFzT3duKGFzc2V0cywgY2FtZWxpemVkSWQpKSB7IHJldHVybiBhc3NldHNbY2FtZWxpemVkSWRdIH1cbiAgdmFyIFBhc2NhbENhc2VJZCA9IGNhcGl0YWxpemUoY2FtZWxpemVkSWQpO1xuICBpZiAoaGFzT3duKGFzc2V0cywgUGFzY2FsQ2FzZUlkKSkgeyByZXR1cm4gYXNzZXRzW1Bhc2NhbENhc2VJZF0gfVxuICAvLyBmYWxsYmFjayB0byBwcm90b3R5cGUgY2hhaW5cbiAgdmFyIHJlcyA9IGFzc2V0c1tpZF0gfHwgYXNzZXRzW2NhbWVsaXplZElkXSB8fCBhc3NldHNbUGFzY2FsQ2FzZUlkXTtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2Fybk1pc3NpbmcgJiYgIXJlcykge1xuICAgIHdhcm4oXG4gICAgICAnRmFpbGVkIHRvIHJlc29sdmUgJyArIHR5cGUuc2xpY2UoMCwgLTEpICsgJzogJyArIGlkLFxuICAgICAgb3B0aW9uc1xuICAgICk7XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gdmFsaWRhdGVQcm9wIChcbiAga2V5LFxuICBwcm9wT3B0aW9ucyxcbiAgcHJvcHNEYXRhLFxuICB2bVxuKSB7XG4gIHZhciBwcm9wID0gcHJvcE9wdGlvbnNba2V5XTtcbiAgdmFyIGFic2VudCA9ICFoYXNPd24ocHJvcHNEYXRhLCBrZXkpO1xuICB2YXIgdmFsdWUgPSBwcm9wc0RhdGFba2V5XTtcbiAgLy8gaGFuZGxlIGJvb2xlYW4gcHJvcHNcbiAgaWYgKGlzVHlwZShCb29sZWFuLCBwcm9wLnR5cGUpKSB7XG4gICAgaWYgKGFic2VudCAmJiAhaGFzT3duKHByb3AsICdkZWZhdWx0JykpIHtcbiAgICAgIHZhbHVlID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmICghaXNUeXBlKFN0cmluZywgcHJvcC50eXBlKSAmJiAodmFsdWUgPT09ICcnIHx8IHZhbHVlID09PSBoeXBoZW5hdGUoa2V5KSkpIHtcbiAgICAgIHZhbHVlID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgLy8gY2hlY2sgZGVmYXVsdCB2YWx1ZVxuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhbHVlID0gZ2V0UHJvcERlZmF1bHRWYWx1ZSh2bSwgcHJvcCwga2V5KTtcbiAgICAvLyBzaW5jZSB0aGUgZGVmYXVsdCB2YWx1ZSBpcyBhIGZyZXNoIGNvcHksXG4gICAgLy8gbWFrZSBzdXJlIHRvIG9ic2VydmUgaXQuXG4gICAgdmFyIHByZXZTaG91bGRDb252ZXJ0ID0gb2JzZXJ2ZXJTdGF0ZS5zaG91bGRDb252ZXJ0O1xuICAgIG9ic2VydmVyU3RhdGUuc2hvdWxkQ29udmVydCA9IHRydWU7XG4gICAgb2JzZXJ2ZSh2YWx1ZSk7XG4gICAgb2JzZXJ2ZXJTdGF0ZS5zaG91bGRDb252ZXJ0ID0gcHJldlNob3VsZENvbnZlcnQ7XG4gIH1cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBhc3NlcnRQcm9wKHByb3AsIGtleSwgdmFsdWUsIHZtLCBhYnNlbnQpO1xuICB9XG4gIHJldHVybiB2YWx1ZVxufVxuXG4vKipcbiAqIEdldCB0aGUgZGVmYXVsdCB2YWx1ZSBvZiBhIHByb3AuXG4gKi9cbmZ1bmN0aW9uIGdldFByb3BEZWZhdWx0VmFsdWUgKHZtLCBwcm9wLCBrZXkpIHtcbiAgLy8gbm8gZGVmYXVsdCwgcmV0dXJuIHVuZGVmaW5lZFxuICBpZiAoIWhhc093bihwcm9wLCAnZGVmYXVsdCcpKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG4gIHZhciBkZWYgPSBwcm9wLmRlZmF1bHQ7XG4gIC8vIHdhcm4gYWdhaW5zdCBub24tZmFjdG9yeSBkZWZhdWx0cyBmb3IgT2JqZWN0ICYgQXJyYXlcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgaXNPYmplY3QoZGVmKSkge1xuICAgIHdhcm4oXG4gICAgICAnSW52YWxpZCBkZWZhdWx0IHZhbHVlIGZvciBwcm9wIFwiJyArIGtleSArICdcIjogJyArXG4gICAgICAnUHJvcHMgd2l0aCB0eXBlIE9iamVjdC9BcnJheSBtdXN0IHVzZSBhIGZhY3RvcnkgZnVuY3Rpb24gJyArXG4gICAgICAndG8gcmV0dXJuIHRoZSBkZWZhdWx0IHZhbHVlLicsXG4gICAgICB2bVxuICAgICk7XG4gIH1cbiAgLy8gdGhlIHJhdyBwcm9wIHZhbHVlIHdhcyBhbHNvIHVuZGVmaW5lZCBmcm9tIHByZXZpb3VzIHJlbmRlcixcbiAgLy8gcmV0dXJuIHByZXZpb3VzIGRlZmF1bHQgdmFsdWUgdG8gYXZvaWQgdW5uZWNlc3Nhcnkgd2F0Y2hlciB0cmlnZ2VyXG4gIGlmICh2bSAmJiB2bS4kb3B0aW9ucy5wcm9wc0RhdGEgJiZcbiAgICB2bS4kb3B0aW9ucy5wcm9wc0RhdGFba2V5XSA9PT0gdW5kZWZpbmVkICYmXG4gICAgdm0uX3Byb3BzW2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB2bS5fcHJvcHNba2V5XVxuICB9XG4gIC8vIGNhbGwgZmFjdG9yeSBmdW5jdGlvbiBmb3Igbm9uLUZ1bmN0aW9uIHR5cGVzXG4gIC8vIGEgdmFsdWUgaXMgRnVuY3Rpb24gaWYgaXRzIHByb3RvdHlwZSBpcyBmdW5jdGlvbiBldmVuIGFjcm9zcyBkaWZmZXJlbnQgZXhlY3V0aW9uIGNvbnRleHRcbiAgcmV0dXJuIHR5cGVvZiBkZWYgPT09ICdmdW5jdGlvbicgJiYgZ2V0VHlwZShwcm9wLnR5cGUpICE9PSAnRnVuY3Rpb24nXG4gICAgPyBkZWYuY2FsbCh2bSlcbiAgICA6IGRlZlxufVxuXG4vKipcbiAqIEFzc2VydCB3aGV0aGVyIGEgcHJvcCBpcyB2YWxpZC5cbiAqL1xuZnVuY3Rpb24gYXNzZXJ0UHJvcCAoXG4gIHByb3AsXG4gIG5hbWUsXG4gIHZhbHVlLFxuICB2bSxcbiAgYWJzZW50XG4pIHtcbiAgaWYgKHByb3AucmVxdWlyZWQgJiYgYWJzZW50KSB7XG4gICAgd2FybihcbiAgICAgICdNaXNzaW5nIHJlcXVpcmVkIHByb3A6IFwiJyArIG5hbWUgKyAnXCInLFxuICAgICAgdm1cbiAgICApO1xuICAgIHJldHVyblxuICB9XG4gIGlmICh2YWx1ZSA9PSBudWxsICYmICFwcm9wLnJlcXVpcmVkKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIHR5cGUgPSBwcm9wLnR5cGU7XG4gIHZhciB2YWxpZCA9ICF0eXBlIHx8IHR5cGUgPT09IHRydWU7XG4gIHZhciBleHBlY3RlZFR5cGVzID0gW107XG4gIGlmICh0eXBlKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgICB0eXBlID0gW3R5cGVdO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGUubGVuZ3RoICYmICF2YWxpZDsgaSsrKSB7XG4gICAgICB2YXIgYXNzZXJ0ZWRUeXBlID0gYXNzZXJ0VHlwZSh2YWx1ZSwgdHlwZVtpXSk7XG4gICAgICBleHBlY3RlZFR5cGVzLnB1c2goYXNzZXJ0ZWRUeXBlLmV4cGVjdGVkVHlwZSB8fCAnJyk7XG4gICAgICB2YWxpZCA9IGFzc2VydGVkVHlwZS52YWxpZDtcbiAgICB9XG4gIH1cbiAgaWYgKCF2YWxpZCkge1xuICAgIHdhcm4oXG4gICAgICAnSW52YWxpZCBwcm9wOiB0eXBlIGNoZWNrIGZhaWxlZCBmb3IgcHJvcCBcIicgKyBuYW1lICsgJ1wiLicgK1xuICAgICAgJyBFeHBlY3RlZCAnICsgZXhwZWN0ZWRUeXBlcy5tYXAoY2FwaXRhbGl6ZSkuam9pbignLCAnKSArXG4gICAgICAnLCBnb3QgJyArIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkuc2xpY2UoOCwgLTEpICsgJy4nLFxuICAgICAgdm1cbiAgICApO1xuICAgIHJldHVyblxuICB9XG4gIHZhciB2YWxpZGF0b3IgPSBwcm9wLnZhbGlkYXRvcjtcbiAgaWYgKHZhbGlkYXRvcikge1xuICAgIGlmICghdmFsaWRhdG9yKHZhbHVlKSkge1xuICAgICAgd2FybihcbiAgICAgICAgJ0ludmFsaWQgcHJvcDogY3VzdG9tIHZhbGlkYXRvciBjaGVjayBmYWlsZWQgZm9yIHByb3AgXCInICsgbmFtZSArICdcIi4nLFxuICAgICAgICB2bVxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBc3NlcnQgdGhlIHR5cGUgb2YgYSB2YWx1ZVxuICovXG5mdW5jdGlvbiBhc3NlcnRUeXBlICh2YWx1ZSwgdHlwZSkge1xuICB2YXIgdmFsaWQ7XG4gIHZhciBleHBlY3RlZFR5cGUgPSBnZXRUeXBlKHR5cGUpO1xuICBpZiAoZXhwZWN0ZWRUeXBlID09PSAnU3RyaW5nJykge1xuICAgIHZhbGlkID0gdHlwZW9mIHZhbHVlID09PSAoZXhwZWN0ZWRUeXBlID0gJ3N0cmluZycpO1xuICB9IGVsc2UgaWYgKGV4cGVjdGVkVHlwZSA9PT0gJ051bWJlcicpIHtcbiAgICB2YWxpZCA9IHR5cGVvZiB2YWx1ZSA9PT0gKGV4cGVjdGVkVHlwZSA9ICdudW1iZXInKTtcbiAgfSBlbHNlIGlmIChleHBlY3RlZFR5cGUgPT09ICdCb29sZWFuJykge1xuICAgIHZhbGlkID0gdHlwZW9mIHZhbHVlID09PSAoZXhwZWN0ZWRUeXBlID0gJ2Jvb2xlYW4nKTtcbiAgfSBlbHNlIGlmIChleHBlY3RlZFR5cGUgPT09ICdGdW5jdGlvbicpIHtcbiAgICB2YWxpZCA9IHR5cGVvZiB2YWx1ZSA9PT0gKGV4cGVjdGVkVHlwZSA9ICdmdW5jdGlvbicpO1xuICB9IGVsc2UgaWYgKGV4cGVjdGVkVHlwZSA9PT0gJ09iamVjdCcpIHtcbiAgICB2YWxpZCA9IGlzUGxhaW5PYmplY3QodmFsdWUpO1xuICB9IGVsc2UgaWYgKGV4cGVjdGVkVHlwZSA9PT0gJ0FycmF5Jykge1xuICAgIHZhbGlkID0gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgdmFsaWQgPSB2YWx1ZSBpbnN0YW5jZW9mIHR5cGU7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICB2YWxpZDogdmFsaWQsXG4gICAgZXhwZWN0ZWRUeXBlOiBleHBlY3RlZFR5cGVcbiAgfVxufVxuXG4vKipcbiAqIFVzZSBmdW5jdGlvbiBzdHJpbmcgbmFtZSB0byBjaGVjayBidWlsdC1pbiB0eXBlcyxcbiAqIGJlY2F1c2UgYSBzaW1wbGUgZXF1YWxpdHkgY2hlY2sgd2lsbCBmYWlsIHdoZW4gcnVubmluZ1xuICogYWNyb3NzIGRpZmZlcmVudCB2bXMgLyBpZnJhbWVzLlxuICovXG5mdW5jdGlvbiBnZXRUeXBlIChmbikge1xuICB2YXIgbWF0Y2ggPSBmbiAmJiBmbi50b1N0cmluZygpLm1hdGNoKC9eXFxzKmZ1bmN0aW9uIChcXHcrKS8pO1xuICByZXR1cm4gbWF0Y2ggJiYgbWF0Y2hbMV1cbn1cblxuZnVuY3Rpb24gaXNUeXBlICh0eXBlLCBmbikge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoZm4pKSB7XG4gICAgcmV0dXJuIGdldFR5cGUoZm4pID09PSBnZXRUeXBlKHR5cGUpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGZuLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGdldFR5cGUoZm5baV0pID09PSBnZXRUeXBlKHR5cGUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gaGFuZGxlRXJyb3IgKGVyciwgdm0sIHR5cGUpIHtcbiAgaWYgKGNvbmZpZy5lcnJvckhhbmRsZXIpIHtcbiAgICBjb25maWcuZXJyb3JIYW5kbGVyLmNhbGwobnVsbCwgZXJyLCB2bSwgdHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHdhcm4oKFwiRXJyb3IgaW4gXCIgKyB0eXBlICsgXCI6XCIpLCB2bSk7XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKGluQnJvd3NlciAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZXJyXG4gICAgfVxuICB9XG59XG5cbi8qIG5vdCB0eXBlIGNoZWNraW5nIHRoaXMgZmlsZSBiZWNhdXNlIGZsb3cgZG9lc24ndCBwbGF5IHdlbGwgd2l0aCBQcm94eSAqL1xuXG52YXIgaW5pdFByb3h5O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgYWxsb3dlZEdsb2JhbHMgPSBtYWtlTWFwKFxuICAgICdJbmZpbml0eSx1bmRlZmluZWQsTmFOLGlzRmluaXRlLGlzTmFOLCcgK1xuICAgICdwYXJzZUZsb2F0LHBhcnNlSW50LGRlY29kZVVSSSxkZWNvZGVVUklDb21wb25lbnQsZW5jb2RlVVJJLGVuY29kZVVSSUNvbXBvbmVudCwnICtcbiAgICAnTWF0aCxOdW1iZXIsRGF0ZSxBcnJheSxPYmplY3QsQm9vbGVhbixTdHJpbmcsUmVnRXhwLE1hcCxTZXQsSlNPTixJbnRsLCcgK1xuICAgICdyZXF1aXJlJyAvLyBmb3IgV2VicGFjay9Ccm93c2VyaWZ5XG4gICk7XG5cbiAgdmFyIHdhcm5Ob25QcmVzZW50ID0gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7XG4gICAgd2FybihcbiAgICAgIFwiUHJvcGVydHkgb3IgbWV0aG9kIFxcXCJcIiArIGtleSArIFwiXFxcIiBpcyBub3QgZGVmaW5lZCBvbiB0aGUgaW5zdGFuY2UgYnV0IFwiICtcbiAgICAgIFwicmVmZXJlbmNlZCBkdXJpbmcgcmVuZGVyLiBNYWtlIHN1cmUgdG8gZGVjbGFyZSByZWFjdGl2ZSBkYXRhIFwiICtcbiAgICAgIFwicHJvcGVydGllcyBpbiB0aGUgZGF0YSBvcHRpb24uXCIsXG4gICAgICB0YXJnZXRcbiAgICApO1xuICB9O1xuXG4gIHZhciBoYXNQcm94eSA9XG4gICAgdHlwZW9mIFByb3h5ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIFByb3h5LnRvU3RyaW5nKCkubWF0Y2goL25hdGl2ZSBjb2RlLyk7XG5cbiAgaWYgKGhhc1Byb3h5KSB7XG4gICAgdmFyIGlzQnVpbHRJbk1vZGlmaWVyID0gbWFrZU1hcCgnc3RvcCxwcmV2ZW50LHNlbGYsY3RybCxzaGlmdCxhbHQsbWV0YScpO1xuICAgIGNvbmZpZy5rZXlDb2RlcyA9IG5ldyBQcm94eShjb25maWcua2V5Q29kZXMsIHtcbiAgICAgIHNldDogZnVuY3Rpb24gc2V0ICh0YXJnZXQsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGlzQnVpbHRJbk1vZGlmaWVyKGtleSkpIHtcbiAgICAgICAgICB3YXJuKChcIkF2b2lkIG92ZXJ3cml0aW5nIGJ1aWx0LWluIG1vZGlmaWVyIGluIGNvbmZpZy5rZXlDb2RlczogLlwiICsga2V5KSk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFyZ2V0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB2YXIgaGFzSGFuZGxlciA9IHtcbiAgICBoYXM6IGZ1bmN0aW9uIGhhcyAodGFyZ2V0LCBrZXkpIHtcbiAgICAgIHZhciBoYXMgPSBrZXkgaW4gdGFyZ2V0O1xuICAgICAgdmFyIGlzQWxsb3dlZCA9IGFsbG93ZWRHbG9iYWxzKGtleSkgfHwga2V5LmNoYXJBdCgwKSA9PT0gJ18nO1xuICAgICAgaWYgKCFoYXMgJiYgIWlzQWxsb3dlZCkge1xuICAgICAgICB3YXJuTm9uUHJlc2VudCh0YXJnZXQsIGtleSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGFzIHx8ICFpc0FsbG93ZWRcbiAgICB9XG4gIH07XG5cbiAgdmFyIGdldEhhbmRsZXIgPSB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQgKHRhcmdldCwga2V5KSB7XG4gICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYgIShrZXkgaW4gdGFyZ2V0KSkge1xuICAgICAgICB3YXJuTm9uUHJlc2VudCh0YXJnZXQsIGtleSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGFyZ2V0W2tleV1cbiAgICB9XG4gIH07XG5cbiAgaW5pdFByb3h5ID0gZnVuY3Rpb24gaW5pdFByb3h5ICh2bSkge1xuICAgIGlmIChoYXNQcm94eSkge1xuICAgICAgLy8gZGV0ZXJtaW5lIHdoaWNoIHByb3h5IGhhbmRsZXIgdG8gdXNlXG4gICAgICB2YXIgb3B0aW9ucyA9IHZtLiRvcHRpb25zO1xuICAgICAgdmFyIGhhbmRsZXJzID0gb3B0aW9ucy5yZW5kZXIgJiYgb3B0aW9ucy5yZW5kZXIuX3dpdGhTdHJpcHBlZFxuICAgICAgICA/IGdldEhhbmRsZXJcbiAgICAgICAgOiBoYXNIYW5kbGVyO1xuICAgICAgdm0uX3JlbmRlclByb3h5ID0gbmV3IFByb3h5KHZtLCBoYW5kbGVycyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZtLl9yZW5kZXJQcm94eSA9IHZtO1xuICAgIH1cbiAgfTtcbn1cblxuLyogICovXG5cbnZhciBWTm9kZSA9IGZ1bmN0aW9uIFZOb2RlIChcbiAgdGFnLFxuICBkYXRhLFxuICBjaGlsZHJlbixcbiAgdGV4dCxcbiAgZWxtLFxuICBjb250ZXh0LFxuICBjb21wb25lbnRPcHRpb25zXG4pIHtcbiAgdGhpcy50YWcgPSB0YWc7XG4gIHRoaXMuZGF0YSA9IGRhdGE7XG4gIHRoaXMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgdGhpcy5lbG0gPSBlbG07XG4gIHRoaXMubnMgPSB1bmRlZmluZWQ7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMuZnVuY3Rpb25hbENvbnRleHQgPSB1bmRlZmluZWQ7XG4gIHRoaXMua2V5ID0gZGF0YSAmJiBkYXRhLmtleTtcbiAgdGhpcy5jb21wb25lbnRPcHRpb25zID0gY29tcG9uZW50T3B0aW9ucztcbiAgdGhpcy5jb21wb25lbnRJbnN0YW5jZSA9IHVuZGVmaW5lZDtcbiAgdGhpcy5wYXJlbnQgPSB1bmRlZmluZWQ7XG4gIHRoaXMucmF3ID0gZmFsc2U7XG4gIHRoaXMuaXNTdGF0aWMgPSBmYWxzZTtcbiAgdGhpcy5pc1Jvb3RJbnNlcnQgPSB0cnVlO1xuICB0aGlzLmlzQ29tbWVudCA9IGZhbHNlO1xuICB0aGlzLmlzQ2xvbmVkID0gZmFsc2U7XG4gIHRoaXMuaXNPbmNlID0gZmFsc2U7XG59O1xuXG52YXIgcHJvdG90eXBlQWNjZXNzb3JzID0geyBjaGlsZDoge30gfTtcblxuLy8gREVQUkVDQVRFRDogYWxpYXMgZm9yIGNvbXBvbmVudEluc3RhbmNlIGZvciBiYWNrd2FyZHMgY29tcGF0LlxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbnByb3RvdHlwZUFjY2Vzc29ycy5jaGlsZC5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmNvbXBvbmVudEluc3RhbmNlXG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydGllcyggVk5vZGUucHJvdG90eXBlLCBwcm90b3R5cGVBY2Nlc3NvcnMgKTtcblxudmFyIGNyZWF0ZUVtcHR5Vk5vZGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBub2RlID0gbmV3IFZOb2RlKCk7XG4gIG5vZGUudGV4dCA9ICcnO1xuICBub2RlLmlzQ29tbWVudCA9IHRydWU7XG4gIHJldHVybiBub2RlXG59O1xuXG5mdW5jdGlvbiBjcmVhdGVUZXh0Vk5vZGUgKHZhbCkge1xuICByZXR1cm4gbmV3IFZOb2RlKHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFN0cmluZyh2YWwpKVxufVxuXG4vLyBvcHRpbWl6ZWQgc2hhbGxvdyBjbG9uZVxuLy8gdXNlZCBmb3Igc3RhdGljIG5vZGVzIGFuZCBzbG90IG5vZGVzIGJlY2F1c2UgdGhleSBtYXkgYmUgcmV1c2VkIGFjcm9zc1xuLy8gbXVsdGlwbGUgcmVuZGVycywgY2xvbmluZyB0aGVtIGF2b2lkcyBlcnJvcnMgd2hlbiBET00gbWFuaXB1bGF0aW9ucyByZWx5XG4vLyBvbiB0aGVpciBlbG0gcmVmZXJlbmNlLlxuZnVuY3Rpb24gY2xvbmVWTm9kZSAodm5vZGUpIHtcbiAgdmFyIGNsb25lZCA9IG5ldyBWTm9kZShcbiAgICB2bm9kZS50YWcsXG4gICAgdm5vZGUuZGF0YSxcbiAgICB2bm9kZS5jaGlsZHJlbixcbiAgICB2bm9kZS50ZXh0LFxuICAgIHZub2RlLmVsbSxcbiAgICB2bm9kZS5jb250ZXh0LFxuICAgIHZub2RlLmNvbXBvbmVudE9wdGlvbnNcbiAgKTtcbiAgY2xvbmVkLm5zID0gdm5vZGUubnM7XG4gIGNsb25lZC5pc1N0YXRpYyA9IHZub2RlLmlzU3RhdGljO1xuICBjbG9uZWQua2V5ID0gdm5vZGUua2V5O1xuICBjbG9uZWQuaXNDbG9uZWQgPSB0cnVlO1xuICByZXR1cm4gY2xvbmVkXG59XG5cbmZ1bmN0aW9uIGNsb25lVk5vZGVzICh2bm9kZXMpIHtcbiAgdmFyIHJlcyA9IG5ldyBBcnJheSh2bm9kZXMubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB2bm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICByZXNbaV0gPSBjbG9uZVZOb2RlKHZub2Rlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG4vKiAgKi9cblxudmFyIG5vcm1hbGl6ZUV2ZW50ID0gY2FjaGVkKGZ1bmN0aW9uIChuYW1lKSB7XG4gIHZhciBvbmNlJCQxID0gbmFtZS5jaGFyQXQoMCkgPT09ICd+JzsgLy8gUHJlZml4ZWQgbGFzdCwgY2hlY2tlZCBmaXJzdFxuICBuYW1lID0gb25jZSQkMSA/IG5hbWUuc2xpY2UoMSkgOiBuYW1lO1xuICB2YXIgY2FwdHVyZSA9IG5hbWUuY2hhckF0KDApID09PSAnISc7XG4gIG5hbWUgPSBjYXB0dXJlID8gbmFtZS5zbGljZSgxKSA6IG5hbWU7XG4gIHJldHVybiB7XG4gICAgbmFtZTogbmFtZSxcbiAgICBvbmNlOiBvbmNlJCQxLFxuICAgIGNhcHR1cmU6IGNhcHR1cmVcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUZuSW52b2tlciAoZm5zKSB7XG4gIGZ1bmN0aW9uIGludm9rZXIgKCkge1xuICAgIHZhciBhcmd1bWVudHMkMSA9IGFyZ3VtZW50cztcblxuICAgIHZhciBmbnMgPSBpbnZva2VyLmZucztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShmbnMpKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBmbnNbaV0uYXBwbHkobnVsbCwgYXJndW1lbnRzJDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZXR1cm4gaGFuZGxlciByZXR1cm4gdmFsdWUgZm9yIHNpbmdsZSBoYW5kbGVyc1xuICAgICAgcmV0dXJuIGZucy5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgfVxuICB9XG4gIGludm9rZXIuZm5zID0gZm5zO1xuICByZXR1cm4gaW52b2tlclxufVxuXG5mdW5jdGlvbiB1cGRhdGVMaXN0ZW5lcnMgKFxuICBvbixcbiAgb2xkT24sXG4gIGFkZCxcbiAgcmVtb3ZlJCQxLFxuICB2bVxuKSB7XG4gIHZhciBuYW1lLCBjdXIsIG9sZCwgZXZlbnQ7XG4gIGZvciAobmFtZSBpbiBvbikge1xuICAgIGN1ciA9IG9uW25hbWVdO1xuICAgIG9sZCA9IG9sZE9uW25hbWVdO1xuICAgIGV2ZW50ID0gbm9ybWFsaXplRXZlbnQobmFtZSk7XG4gICAgaWYgKCFjdXIpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgXCJJbnZhbGlkIGhhbmRsZXIgZm9yIGV2ZW50IFxcXCJcIiArIChldmVudC5uYW1lKSArIFwiXFxcIjogZ290IFwiICsgU3RyaW5nKGN1ciksXG4gICAgICAgIHZtXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoIW9sZCkge1xuICAgICAgaWYgKCFjdXIuZm5zKSB7XG4gICAgICAgIGN1ciA9IG9uW25hbWVdID0gY3JlYXRlRm5JbnZva2VyKGN1cik7XG4gICAgICB9XG4gICAgICBhZGQoZXZlbnQubmFtZSwgY3VyLCBldmVudC5vbmNlLCBldmVudC5jYXB0dXJlKTtcbiAgICB9IGVsc2UgaWYgKGN1ciAhPT0gb2xkKSB7XG4gICAgICBvbGQuZm5zID0gY3VyO1xuICAgICAgb25bbmFtZV0gPSBvbGQ7XG4gICAgfVxuICB9XG4gIGZvciAobmFtZSBpbiBvbGRPbikge1xuICAgIGlmICghb25bbmFtZV0pIHtcbiAgICAgIGV2ZW50ID0gbm9ybWFsaXplRXZlbnQobmFtZSk7XG4gICAgICByZW1vdmUkJDEoZXZlbnQubmFtZSwgb2xkT25bbmFtZV0sIGV2ZW50LmNhcHR1cmUpO1xuICAgIH1cbiAgfVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gbWVyZ2VWTm9kZUhvb2sgKGRlZiwgaG9va0tleSwgaG9vaykge1xuICB2YXIgaW52b2tlcjtcbiAgdmFyIG9sZEhvb2sgPSBkZWZbaG9va0tleV07XG5cbiAgZnVuY3Rpb24gd3JhcHBlZEhvb2sgKCkge1xuICAgIGhvb2suYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAvLyBpbXBvcnRhbnQ6IHJlbW92ZSBtZXJnZWQgaG9vayB0byBlbnN1cmUgaXQncyBjYWxsZWQgb25seSBvbmNlXG4gICAgLy8gYW5kIHByZXZlbnQgbWVtb3J5IGxlYWtcbiAgICByZW1vdmUoaW52b2tlci5mbnMsIHdyYXBwZWRIb29rKTtcbiAgfVxuXG4gIGlmICghb2xkSG9vaykge1xuICAgIC8vIG5vIGV4aXN0aW5nIGhvb2tcbiAgICBpbnZva2VyID0gY3JlYXRlRm5JbnZva2VyKFt3cmFwcGVkSG9va10pO1xuICB9IGVsc2Uge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChvbGRIb29rLmZucyAmJiBvbGRIb29rLm1lcmdlZCkge1xuICAgICAgLy8gYWxyZWFkeSBhIG1lcmdlZCBpbnZva2VyXG4gICAgICBpbnZva2VyID0gb2xkSG9vaztcbiAgICAgIGludm9rZXIuZm5zLnB1c2god3JhcHBlZEhvb2spO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBleGlzdGluZyBwbGFpbiBob29rXG4gICAgICBpbnZva2VyID0gY3JlYXRlRm5JbnZva2VyKFtvbGRIb29rLCB3cmFwcGVkSG9va10pO1xuICAgIH1cbiAgfVxuXG4gIGludm9rZXIubWVyZ2VkID0gdHJ1ZTtcbiAgZGVmW2hvb2tLZXldID0gaW52b2tlcjtcbn1cblxuLyogICovXG5cbi8vIFRoZSB0ZW1wbGF0ZSBjb21waWxlciBhdHRlbXB0cyB0byBtaW5pbWl6ZSB0aGUgbmVlZCBmb3Igbm9ybWFsaXphdGlvbiBieVxuLy8gc3RhdGljYWxseSBhbmFseXppbmcgdGhlIHRlbXBsYXRlIGF0IGNvbXBpbGUgdGltZS5cbi8vXG4vLyBGb3IgcGxhaW4gSFRNTCBtYXJrdXAsIG5vcm1hbGl6YXRpb24gY2FuIGJlIGNvbXBsZXRlbHkgc2tpcHBlZCBiZWNhdXNlIHRoZVxuLy8gZ2VuZXJhdGVkIHJlbmRlciBmdW5jdGlvbiBpcyBndWFyYW50ZWVkIHRvIHJldHVybiBBcnJheTxWTm9kZT4uIFRoZXJlIGFyZVxuLy8gdHdvIGNhc2VzIHdoZXJlIGV4dHJhIG5vcm1hbGl6YXRpb24gaXMgbmVlZGVkOlxuXG4vLyAxLiBXaGVuIHRoZSBjaGlsZHJlbiBjb250YWlucyBjb21wb25lbnRzIC0gYmVjYXVzZSBhIGZ1bmN0aW9uYWwgY29tcG9uZW50XG4vLyBtYXkgcmV0dXJuIGFuIEFycmF5IGluc3RlYWQgb2YgYSBzaW5nbGUgcm9vdC4gSW4gdGhpcyBjYXNlLCBqdXN0IGEgc2ltcGxlXG4vLyBub3JtYWxpemF0aW9uIGlzIG5lZWRlZCAtIGlmIGFueSBjaGlsZCBpcyBhbiBBcnJheSwgd2UgZmxhdHRlbiB0aGUgd2hvbGVcbi8vIHRoaW5nIHdpdGggQXJyYXkucHJvdG90eXBlLmNvbmNhdC4gSXQgaXMgZ3VhcmFudGVlZCB0byBiZSBvbmx5IDEtbGV2ZWwgZGVlcFxuLy8gYmVjYXVzZSBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYWxyZWFkeSBub3JtYWxpemUgdGhlaXIgb3duIGNoaWxkcmVuLlxuZnVuY3Rpb24gc2ltcGxlTm9ybWFsaXplQ2hpbGRyZW4gKGNoaWxkcmVuKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbltpXSkpIHtcbiAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLCBjaGlsZHJlbilcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNoaWxkcmVuXG59XG5cbi8vIDIuIFdoZW4gdGhlIGNoaWxkcmVuIGNvbnRhaW5zIGNvbnN0cmN1dHMgdGhhdCBhbHdheXMgZ2VuZXJhdGVkIG5lc3RlZCBBcnJheXMsXG4vLyBlLmcuIDx0ZW1wbGF0ZT4sIDxzbG90Piwgdi1mb3IsIG9yIHdoZW4gdGhlIGNoaWxkcmVuIGlzIHByb3ZpZGVkIGJ5IHVzZXJcbi8vIHdpdGggaGFuZC13cml0dGVuIHJlbmRlciBmdW5jdGlvbnMgLyBKU1guIEluIHN1Y2ggY2FzZXMgYSBmdWxsIG5vcm1hbGl6YXRpb25cbi8vIGlzIG5lZWRlZCB0byBjYXRlciB0byBhbGwgcG9zc2libGUgdHlwZXMgb2YgY2hpbGRyZW4gdmFsdWVzLlxuZnVuY3Rpb24gbm9ybWFsaXplQ2hpbGRyZW4gKGNoaWxkcmVuKSB7XG4gIHJldHVybiBpc1ByaW1pdGl2ZShjaGlsZHJlbilcbiAgICA/IFtjcmVhdGVUZXh0Vk5vZGUoY2hpbGRyZW4pXVxuICAgIDogQXJyYXkuaXNBcnJheShjaGlsZHJlbilcbiAgICAgID8gbm9ybWFsaXplQXJyYXlDaGlsZHJlbihjaGlsZHJlbilcbiAgICAgIDogdW5kZWZpbmVkXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUFycmF5Q2hpbGRyZW4gKGNoaWxkcmVuLCBuZXN0ZWRJbmRleCkge1xuICB2YXIgcmVzID0gW107XG4gIHZhciBpLCBjLCBsYXN0O1xuICBmb3IgKGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBjID0gY2hpbGRyZW5baV07XG4gICAgaWYgKGMgPT0gbnVsbCB8fCB0eXBlb2YgYyA9PT0gJ2Jvb2xlYW4nKSB7IGNvbnRpbnVlIH1cbiAgICBsYXN0ID0gcmVzW3Jlcy5sZW5ndGggLSAxXTtcbiAgICAvLyAgbmVzdGVkXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYykpIHtcbiAgICAgIHJlcy5wdXNoLmFwcGx5KHJlcywgbm9ybWFsaXplQXJyYXlDaGlsZHJlbihjLCAoKG5lc3RlZEluZGV4IHx8ICcnKSArIFwiX1wiICsgaSkpKTtcbiAgICB9IGVsc2UgaWYgKGlzUHJpbWl0aXZlKGMpKSB7XG4gICAgICBpZiAobGFzdCAmJiBsYXN0LnRleHQpIHtcbiAgICAgICAgbGFzdC50ZXh0ICs9IFN0cmluZyhjKTtcbiAgICAgIH0gZWxzZSBpZiAoYyAhPT0gJycpIHtcbiAgICAgICAgLy8gY29udmVydCBwcmltaXRpdmUgdG8gdm5vZGVcbiAgICAgICAgcmVzLnB1c2goY3JlYXRlVGV4dFZOb2RlKGMpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGMudGV4dCAmJiBsYXN0ICYmIGxhc3QudGV4dCkge1xuICAgICAgICByZXNbcmVzLmxlbmd0aCAtIDFdID0gY3JlYXRlVGV4dFZOb2RlKGxhc3QudGV4dCArIGMudGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBkZWZhdWx0IGtleSBmb3IgbmVzdGVkIGFycmF5IGNoaWxkcmVuIChsaWtlbHkgZ2VuZXJhdGVkIGJ5IHYtZm9yKVxuICAgICAgICBpZiAoYy50YWcgJiYgYy5rZXkgPT0gbnVsbCAmJiBuZXN0ZWRJbmRleCAhPSBudWxsKSB7XG4gICAgICAgICAgYy5rZXkgPSBcIl9fdmxpc3RcIiArIG5lc3RlZEluZGV4ICsgXCJfXCIgKyBpICsgXCJfX1wiO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5wdXNoKGMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBnZXRGaXJzdENvbXBvbmVudENoaWxkIChjaGlsZHJlbikge1xuICByZXR1cm4gY2hpbGRyZW4gJiYgY2hpbGRyZW4uZmlsdGVyKGZ1bmN0aW9uIChjKSB7IHJldHVybiBjICYmIGMuY29tcG9uZW50T3B0aW9uczsgfSlbMF1cbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGluaXRFdmVudHMgKHZtKSB7XG4gIHZtLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2bS5faGFzSG9va0V2ZW50ID0gZmFsc2U7XG4gIC8vIGluaXQgcGFyZW50IGF0dGFjaGVkIGV2ZW50c1xuICB2YXIgbGlzdGVuZXJzID0gdm0uJG9wdGlvbnMuX3BhcmVudExpc3RlbmVycztcbiAgaWYgKGxpc3RlbmVycykge1xuICAgIHVwZGF0ZUNvbXBvbmVudExpc3RlbmVycyh2bSwgbGlzdGVuZXJzKTtcbiAgfVxufVxuXG52YXIgdGFyZ2V0O1xuXG5mdW5jdGlvbiBhZGQgKGV2ZW50LCBmbiwgb25jZSQkMSkge1xuICBpZiAob25jZSQkMSkge1xuICAgIHRhcmdldC4kb25jZShldmVudCwgZm4pO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldC4kb24oZXZlbnQsIGZuKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmUkMSAoZXZlbnQsIGZuKSB7XG4gIHRhcmdldC4kb2ZmKGV2ZW50LCBmbik7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNvbXBvbmVudExpc3RlbmVycyAoXG4gIHZtLFxuICBsaXN0ZW5lcnMsXG4gIG9sZExpc3RlbmVyc1xuKSB7XG4gIHRhcmdldCA9IHZtO1xuICB1cGRhdGVMaXN0ZW5lcnMobGlzdGVuZXJzLCBvbGRMaXN0ZW5lcnMgfHwge30sIGFkZCwgcmVtb3ZlJDEsIHZtKTtcbn1cblxuZnVuY3Rpb24gZXZlbnRzTWl4aW4gKFZ1ZSkge1xuICB2YXIgaG9va1JFID0gL15ob29rOi87XG4gIFZ1ZS5wcm90b3R5cGUuJG9uID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIHZtID0gdGhpcztcbiAgICBpZiAoQXJyYXkuaXNBcnJheShldmVudCkpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZXZlbnQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHRoaXMkMS4kb24oZXZlbnRbaV0sIGZuKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgKHZtLl9ldmVudHNbZXZlbnRdIHx8ICh2bS5fZXZlbnRzW2V2ZW50XSA9IFtdKSkucHVzaChmbik7XG4gICAgICAvLyBvcHRpbWl6ZSBob29rOmV2ZW50IGNvc3QgYnkgdXNpbmcgYSBib29sZWFuIGZsYWcgbWFya2VkIGF0IHJlZ2lzdHJhdGlvblxuICAgICAgLy8gaW5zdGVhZCBvZiBhIGhhc2ggbG9va3VwXG4gICAgICBpZiAoaG9va1JFLnRlc3QoZXZlbnQpKSB7XG4gICAgICAgIHZtLl9oYXNIb29rRXZlbnQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdm1cbiAgfTtcblxuICBWdWUucHJvdG90eXBlLiRvbmNlID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgZnVuY3Rpb24gb24gKCkge1xuICAgICAgdm0uJG9mZihldmVudCwgb24pO1xuICAgICAgZm4uYXBwbHkodm0sIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIG9uLmZuID0gZm47XG4gICAgdm0uJG9uKGV2ZW50LCBvbik7XG4gICAgcmV0dXJuIHZtXG4gIH07XG5cbiAgVnVlLnByb3RvdHlwZS4kb2ZmID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgLy8gYWxsXG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICB2bS5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgIHJldHVybiB2bVxuICAgIH1cbiAgICAvLyBzcGVjaWZpYyBldmVudFxuICAgIHZhciBjYnMgPSB2bS5fZXZlbnRzW2V2ZW50XTtcbiAgICBpZiAoIWNicykge1xuICAgICAgcmV0dXJuIHZtXG4gICAgfVxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICB2bS5fZXZlbnRzW2V2ZW50XSA9IG51bGw7XG4gICAgICByZXR1cm4gdm1cbiAgICB9XG4gICAgLy8gc3BlY2lmaWMgaGFuZGxlclxuICAgIHZhciBjYjtcbiAgICB2YXIgaSA9IGNicy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgY2IgPSBjYnNbaV07XG4gICAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xuICAgICAgICBjYnMuc3BsaWNlKGksIDEpO1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdm1cbiAgfTtcblxuICBWdWUucHJvdG90eXBlLiRlbWl0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICB2YXIgY2JzID0gdm0uX2V2ZW50c1tldmVudF07XG4gICAgaWYgKGNicykge1xuICAgICAgY2JzID0gY2JzLmxlbmd0aCA+IDEgPyB0b0FycmF5KGNicykgOiBjYnM7XG4gICAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzLCAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gY2JzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBjYnNbaV0uYXBwbHkodm0sIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdm1cbiAgfTtcbn1cblxuLyogICovXG5cbi8qKlxuICogUnVudGltZSBoZWxwZXIgZm9yIHJlc29sdmluZyByYXcgY2hpbGRyZW4gVk5vZGVzIGludG8gYSBzbG90IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZVNsb3RzIChcbiAgY2hpbGRyZW4sXG4gIGNvbnRleHRcbikge1xuICB2YXIgc2xvdHMgPSB7fTtcbiAgaWYgKCFjaGlsZHJlbikge1xuICAgIHJldHVybiBzbG90c1xuICB9XG4gIHZhciBkZWZhdWx0U2xvdCA9IFtdO1xuICB2YXIgbmFtZSwgY2hpbGQ7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAvLyBuYW1lZCBzbG90cyBzaG91bGQgb25seSBiZSByZXNwZWN0ZWQgaWYgdGhlIHZub2RlIHdhcyByZW5kZXJlZCBpbiB0aGVcbiAgICAvLyBzYW1lIGNvbnRleHQuXG4gICAgaWYgKChjaGlsZC5jb250ZXh0ID09PSBjb250ZXh0IHx8IGNoaWxkLmZ1bmN0aW9uYWxDb250ZXh0ID09PSBjb250ZXh0KSAmJlxuICAgICAgICBjaGlsZC5kYXRhICYmIChuYW1lID0gY2hpbGQuZGF0YS5zbG90KSkge1xuICAgICAgdmFyIHNsb3QgPSAoc2xvdHNbbmFtZV0gfHwgKHNsb3RzW25hbWVdID0gW10pKTtcbiAgICAgIGlmIChjaGlsZC50YWcgPT09ICd0ZW1wbGF0ZScpIHtcbiAgICAgICAgc2xvdC5wdXNoLmFwcGx5KHNsb3QsIGNoaWxkLmNoaWxkcmVuKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNsb3QucHVzaChjaGlsZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlZmF1bHRTbG90LnB1c2goY2hpbGQpO1xuICAgIH1cbiAgfVxuICAvLyBpZ25vcmUgc2luZ2xlIHdoaXRlc3BhY2VcbiAgaWYgKGRlZmF1bHRTbG90Lmxlbmd0aCAmJiAhKFxuICAgIGRlZmF1bHRTbG90Lmxlbmd0aCA9PT0gMSAmJlxuICAgIChkZWZhdWx0U2xvdFswXS50ZXh0ID09PSAnICcgfHwgZGVmYXVsdFNsb3RbMF0uaXNDb21tZW50KVxuICApKSB7XG4gICAgc2xvdHMuZGVmYXVsdCA9IGRlZmF1bHRTbG90O1xuICB9XG4gIHJldHVybiBzbG90c1xufVxuXG5mdW5jdGlvbiByZXNvbHZlU2NvcGVkU2xvdHMgKFxuICBmbnNcbikge1xuICB2YXIgcmVzID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZm5zLmxlbmd0aDsgaSsrKSB7XG4gICAgcmVzW2Zuc1tpXVswXV0gPSBmbnNbaV1bMV07XG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG4vKiAgKi9cblxudmFyIGFjdGl2ZUluc3RhbmNlID0gbnVsbDtcblxuZnVuY3Rpb24gaW5pdExpZmVjeWNsZSAodm0pIHtcbiAgdmFyIG9wdGlvbnMgPSB2bS4kb3B0aW9ucztcblxuICAvLyBsb2NhdGUgZmlyc3Qgbm9uLWFic3RyYWN0IHBhcmVudFxuICB2YXIgcGFyZW50ID0gb3B0aW9ucy5wYXJlbnQ7XG4gIGlmIChwYXJlbnQgJiYgIW9wdGlvbnMuYWJzdHJhY3QpIHtcbiAgICB3aGlsZSAocGFyZW50LiRvcHRpb25zLmFic3RyYWN0ICYmIHBhcmVudC4kcGFyZW50KSB7XG4gICAgICBwYXJlbnQgPSBwYXJlbnQuJHBhcmVudDtcbiAgICB9XG4gICAgcGFyZW50LiRjaGlsZHJlbi5wdXNoKHZtKTtcbiAgfVxuXG4gIHZtLiRwYXJlbnQgPSBwYXJlbnQ7XG4gIHZtLiRyb290ID0gcGFyZW50ID8gcGFyZW50LiRyb290IDogdm07XG5cbiAgdm0uJGNoaWxkcmVuID0gW107XG4gIHZtLiRyZWZzID0ge307XG5cbiAgdm0uX3dhdGNoZXIgPSBudWxsO1xuICB2bS5faW5hY3RpdmUgPSBudWxsO1xuICB2bS5fZGlyZWN0SW5hY3RpdmUgPSBmYWxzZTtcbiAgdm0uX2lzTW91bnRlZCA9IGZhbHNlO1xuICB2bS5faXNEZXN0cm95ZWQgPSBmYWxzZTtcbiAgdm0uX2lzQmVpbmdEZXN0cm95ZWQgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gbGlmZWN5Y2xlTWl4aW4gKFZ1ZSkge1xuICBWdWUucHJvdG90eXBlLl91cGRhdGUgPSBmdW5jdGlvbiAodm5vZGUsIGh5ZHJhdGluZykge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgaWYgKHZtLl9pc01vdW50ZWQpIHtcbiAgICAgIGNhbGxIb29rKHZtLCAnYmVmb3JlVXBkYXRlJyk7XG4gICAgfVxuICAgIHZhciBwcmV2RWwgPSB2bS4kZWw7XG4gICAgdmFyIHByZXZWbm9kZSA9IHZtLl92bm9kZTtcbiAgICB2YXIgcHJldkFjdGl2ZUluc3RhbmNlID0gYWN0aXZlSW5zdGFuY2U7XG4gICAgYWN0aXZlSW5zdGFuY2UgPSB2bTtcbiAgICB2bS5fdm5vZGUgPSB2bm9kZTtcbiAgICAvLyBWdWUucHJvdG90eXBlLl9fcGF0Y2hfXyBpcyBpbmplY3RlZCBpbiBlbnRyeSBwb2ludHNcbiAgICAvLyBiYXNlZCBvbiB0aGUgcmVuZGVyaW5nIGJhY2tlbmQgdXNlZC5cbiAgICBpZiAoIXByZXZWbm9kZSkge1xuICAgICAgLy8gaW5pdGlhbCByZW5kZXJcbiAgICAgIHZtLiRlbCA9IHZtLl9fcGF0Y2hfXyhcbiAgICAgICAgdm0uJGVsLCB2bm9kZSwgaHlkcmF0aW5nLCBmYWxzZSAvKiByZW1vdmVPbmx5ICovLFxuICAgICAgICB2bS4kb3B0aW9ucy5fcGFyZW50RWxtLFxuICAgICAgICB2bS4kb3B0aW9ucy5fcmVmRWxtXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB1cGRhdGVzXG4gICAgICB2bS4kZWwgPSB2bS5fX3BhdGNoX18ocHJldlZub2RlLCB2bm9kZSk7XG4gICAgfVxuICAgIGFjdGl2ZUluc3RhbmNlID0gcHJldkFjdGl2ZUluc3RhbmNlO1xuICAgIC8vIHVwZGF0ZSBfX3Z1ZV9fIHJlZmVyZW5jZVxuICAgIGlmIChwcmV2RWwpIHtcbiAgICAgIHByZXZFbC5fX3Z1ZV9fID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHZtLiRlbCkge1xuICAgICAgdm0uJGVsLl9fdnVlX18gPSB2bTtcbiAgICB9XG4gICAgLy8gaWYgcGFyZW50IGlzIGFuIEhPQywgdXBkYXRlIGl0cyAkZWwgYXMgd2VsbFxuICAgIGlmICh2bS4kdm5vZGUgJiYgdm0uJHBhcmVudCAmJiB2bS4kdm5vZGUgPT09IHZtLiRwYXJlbnQuX3Zub2RlKSB7XG4gICAgICB2bS4kcGFyZW50LiRlbCA9IHZtLiRlbDtcbiAgICB9XG4gICAgLy8gdXBkYXRlZCBob29rIGlzIGNhbGxlZCBieSB0aGUgc2NoZWR1bGVyIHRvIGVuc3VyZSB0aGF0IGNoaWxkcmVuIGFyZVxuICAgIC8vIHVwZGF0ZWQgaW4gYSBwYXJlbnQncyB1cGRhdGVkIGhvb2suXG4gIH07XG5cbiAgVnVlLnByb3RvdHlwZS4kZm9yY2VVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICBpZiAodm0uX3dhdGNoZXIpIHtcbiAgICAgIHZtLl93YXRjaGVyLnVwZGF0ZSgpO1xuICAgIH1cbiAgfTtcblxuICBWdWUucHJvdG90eXBlLiRkZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgaWYgKHZtLl9pc0JlaW5nRGVzdHJveWVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY2FsbEhvb2sodm0sICdiZWZvcmVEZXN0cm95Jyk7XG4gICAgdm0uX2lzQmVpbmdEZXN0cm95ZWQgPSB0cnVlO1xuICAgIC8vIHJlbW92ZSBzZWxmIGZyb20gcGFyZW50XG4gICAgdmFyIHBhcmVudCA9IHZtLiRwYXJlbnQ7XG4gICAgaWYgKHBhcmVudCAmJiAhcGFyZW50Ll9pc0JlaW5nRGVzdHJveWVkICYmICF2bS4kb3B0aW9ucy5hYnN0cmFjdCkge1xuICAgICAgcmVtb3ZlKHBhcmVudC4kY2hpbGRyZW4sIHZtKTtcbiAgICB9XG4gICAgLy8gdGVhcmRvd24gd2F0Y2hlcnNcbiAgICBpZiAodm0uX3dhdGNoZXIpIHtcbiAgICAgIHZtLl93YXRjaGVyLnRlYXJkb3duKCk7XG4gICAgfVxuICAgIHZhciBpID0gdm0uX3dhdGNoZXJzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICB2bS5fd2F0Y2hlcnNbaV0udGVhcmRvd24oKTtcbiAgICB9XG4gICAgLy8gcmVtb3ZlIHJlZmVyZW5jZSBmcm9tIGRhdGEgb2JcbiAgICAvLyBmcm96ZW4gb2JqZWN0IG1heSBub3QgaGF2ZSBvYnNlcnZlci5cbiAgICBpZiAodm0uX2RhdGEuX19vYl9fKSB7XG4gICAgICB2bS5fZGF0YS5fX29iX18udm1Db3VudC0tO1xuICAgIH1cbiAgICAvLyBjYWxsIHRoZSBsYXN0IGhvb2suLi5cbiAgICB2bS5faXNEZXN0cm95ZWQgPSB0cnVlO1xuICAgIGNhbGxIb29rKHZtLCAnZGVzdHJveWVkJyk7XG4gICAgLy8gdHVybiBvZmYgYWxsIGluc3RhbmNlIGxpc3RlbmVycy5cbiAgICB2bS4kb2ZmKCk7XG4gICAgLy8gcmVtb3ZlIF9fdnVlX18gcmVmZXJlbmNlXG4gICAgaWYgKHZtLiRlbCkge1xuICAgICAgdm0uJGVsLl9fdnVlX18gPSBudWxsO1xuICAgIH1cbiAgICAvLyBpbnZva2UgZGVzdHJveSBob29rcyBvbiBjdXJyZW50IHJlbmRlcmVkIHRyZWVcbiAgICB2bS5fX3BhdGNoX18odm0uX3Zub2RlLCBudWxsKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbW91bnRDb21wb25lbnQgKFxuICB2bSxcbiAgZWwsXG4gIGh5ZHJhdGluZ1xuKSB7XG4gIHZtLiRlbCA9IGVsO1xuICBpZiAoIXZtLiRvcHRpb25zLnJlbmRlcikge1xuICAgIHZtLiRvcHRpb25zLnJlbmRlciA9IGNyZWF0ZUVtcHR5Vk5vZGU7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKHZtLiRvcHRpb25zLnRlbXBsYXRlICYmIHZtLiRvcHRpb25zLnRlbXBsYXRlLmNoYXJBdCgwKSAhPT0gJyMnKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgJ1lvdSBhcmUgdXNpbmcgdGhlIHJ1bnRpbWUtb25seSBidWlsZCBvZiBWdWUgd2hlcmUgdGhlIHRlbXBsYXRlICcgK1xuICAgICAgICAgICdvcHRpb24gaXMgbm90IGF2YWlsYWJsZS4gRWl0aGVyIHByZS1jb21waWxlIHRoZSB0ZW1wbGF0ZXMgaW50byAnICtcbiAgICAgICAgICAncmVuZGVyIGZ1bmN0aW9ucywgb3IgdXNlIHRoZSBjb21waWxlci1pbmNsdWRlZCBidWlsZC4nLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgICdGYWlsZWQgdG8gbW91bnQgY29tcG9uZW50OiB0ZW1wbGF0ZSBvciByZW5kZXIgZnVuY3Rpb24gbm90IGRlZmluZWQuJyxcbiAgICAgICAgICB2bVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBjYWxsSG9vayh2bSwgJ2JlZm9yZU1vdW50Jyk7XG5cbiAgdmFyIHVwZGF0ZUNvbXBvbmVudDtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNvbmZpZy5wZXJmb3JtYW5jZSAmJiBwZXJmKSB7XG4gICAgdXBkYXRlQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG5hbWUgPSB2bS5fbmFtZTtcbiAgICAgIHZhciBzdGFydFRhZyA9IFwic3RhcnQgXCIgKyBuYW1lO1xuICAgICAgdmFyIGVuZFRhZyA9IFwiZW5kIFwiICsgbmFtZTtcbiAgICAgIHBlcmYubWFyayhzdGFydFRhZyk7XG4gICAgICB2YXIgdm5vZGUgPSB2bS5fcmVuZGVyKCk7XG4gICAgICBwZXJmLm1hcmsoZW5kVGFnKTtcbiAgICAgIHBlcmYubWVhc3VyZSgobmFtZSArIFwiIHJlbmRlclwiKSwgc3RhcnRUYWcsIGVuZFRhZyk7XG4gICAgICBwZXJmLm1hcmsoc3RhcnRUYWcpO1xuICAgICAgdm0uX3VwZGF0ZSh2bm9kZSwgaHlkcmF0aW5nKTtcbiAgICAgIHBlcmYubWFyayhlbmRUYWcpO1xuICAgICAgcGVyZi5tZWFzdXJlKChuYW1lICsgXCIgcGF0Y2hcIiksIHN0YXJ0VGFnLCBlbmRUYWcpO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgdXBkYXRlQ29tcG9uZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgdm0uX3VwZGF0ZSh2bS5fcmVuZGVyKCksIGh5ZHJhdGluZyk7XG4gICAgfTtcbiAgfVxuXG4gIHZtLl93YXRjaGVyID0gbmV3IFdhdGNoZXIodm0sIHVwZGF0ZUNvbXBvbmVudCwgbm9vcCk7XG4gIGh5ZHJhdGluZyA9IGZhbHNlO1xuXG4gIC8vIG1hbnVhbGx5IG1vdW50ZWQgaW5zdGFuY2UsIGNhbGwgbW91bnRlZCBvbiBzZWxmXG4gIC8vIG1vdW50ZWQgaXMgY2FsbGVkIGZvciByZW5kZXItY3JlYXRlZCBjaGlsZCBjb21wb25lbnRzIGluIGl0cyBpbnNlcnRlZCBob29rXG4gIGlmICh2bS4kdm5vZGUgPT0gbnVsbCkge1xuICAgIHZtLl9pc01vdW50ZWQgPSB0cnVlO1xuICAgIGNhbGxIb29rKHZtLCAnbW91bnRlZCcpO1xuICB9XG4gIHJldHVybiB2bVxufVxuXG5mdW5jdGlvbiB1cGRhdGVDaGlsZENvbXBvbmVudCAoXG4gIHZtLFxuICBwcm9wc0RhdGEsXG4gIGxpc3RlbmVycyxcbiAgcGFyZW50Vm5vZGUsXG4gIHJlbmRlckNoaWxkcmVuXG4pIHtcbiAgLy8gZGV0ZXJtaW5lIHdoZXRoZXIgY29tcG9uZW50IGhhcyBzbG90IGNoaWxkcmVuXG4gIC8vIHdlIG5lZWQgdG8gZG8gdGhpcyBiZWZvcmUgb3ZlcndyaXRpbmcgJG9wdGlvbnMuX3JlbmRlckNoaWxkcmVuXG4gIHZhciBoYXNDaGlsZHJlbiA9ICEhKFxuICAgIHJlbmRlckNoaWxkcmVuIHx8ICAgICAgICAgICAgICAgLy8gaGFzIG5ldyBzdGF0aWMgc2xvdHNcbiAgICB2bS4kb3B0aW9ucy5fcmVuZGVyQ2hpbGRyZW4gfHwgIC8vIGhhcyBvbGQgc3RhdGljIHNsb3RzXG4gICAgcGFyZW50Vm5vZGUuZGF0YS5zY29wZWRTbG90cyB8fCAvLyBoYXMgbmV3IHNjb3BlZCBzbG90c1xuICAgIHZtLiRzY29wZWRTbG90cyAhPT0gZW1wdHlPYmplY3QgLy8gaGFzIG9sZCBzY29wZWQgc2xvdHNcbiAgKTtcblxuICB2bS4kb3B0aW9ucy5fcGFyZW50Vm5vZGUgPSBwYXJlbnRWbm9kZTtcbiAgdm0uJHZub2RlID0gcGFyZW50Vm5vZGU7IC8vIHVwZGF0ZSB2bSdzIHBsYWNlaG9sZGVyIG5vZGUgd2l0aG91dCByZS1yZW5kZXJcbiAgaWYgKHZtLl92bm9kZSkgeyAvLyB1cGRhdGUgY2hpbGQgdHJlZSdzIHBhcmVudFxuICAgIHZtLl92bm9kZS5wYXJlbnQgPSBwYXJlbnRWbm9kZTtcbiAgfVxuICB2bS4kb3B0aW9ucy5fcmVuZGVyQ2hpbGRyZW4gPSByZW5kZXJDaGlsZHJlbjtcblxuICAvLyB1cGRhdGUgcHJvcHNcbiAgaWYgKHByb3BzRGF0YSAmJiB2bS4kb3B0aW9ucy5wcm9wcykge1xuICAgIG9ic2VydmVyU3RhdGUuc2hvdWxkQ29udmVydCA9IGZhbHNlO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBvYnNlcnZlclN0YXRlLmlzU2V0dGluZ1Byb3BzID0gdHJ1ZTtcbiAgICB9XG4gICAgdmFyIHByb3BzID0gdm0uX3Byb3BzO1xuICAgIHZhciBwcm9wS2V5cyA9IHZtLiRvcHRpb25zLl9wcm9wS2V5cyB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0gcHJvcEtleXNbaV07XG4gICAgICBwcm9wc1trZXldID0gdmFsaWRhdGVQcm9wKGtleSwgdm0uJG9wdGlvbnMucHJvcHMsIHByb3BzRGF0YSwgdm0pO1xuICAgIH1cbiAgICBvYnNlcnZlclN0YXRlLnNob3VsZENvbnZlcnQgPSB0cnVlO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBvYnNlcnZlclN0YXRlLmlzU2V0dGluZ1Byb3BzID0gZmFsc2U7XG4gICAgfVxuICAgIC8vIGtlZXAgYSBjb3B5IG9mIHJhdyBwcm9wc0RhdGFcbiAgICB2bS4kb3B0aW9ucy5wcm9wc0RhdGEgPSBwcm9wc0RhdGE7XG4gIH1cbiAgLy8gdXBkYXRlIGxpc3RlbmVyc1xuICBpZiAobGlzdGVuZXJzKSB7XG4gICAgdmFyIG9sZExpc3RlbmVycyA9IHZtLiRvcHRpb25zLl9wYXJlbnRMaXN0ZW5lcnM7XG4gICAgdm0uJG9wdGlvbnMuX3BhcmVudExpc3RlbmVycyA9IGxpc3RlbmVycztcbiAgICB1cGRhdGVDb21wb25lbnRMaXN0ZW5lcnModm0sIGxpc3RlbmVycywgb2xkTGlzdGVuZXJzKTtcbiAgfVxuICAvLyByZXNvbHZlIHNsb3RzICsgZm9yY2UgdXBkYXRlIGlmIGhhcyBjaGlsZHJlblxuICBpZiAoaGFzQ2hpbGRyZW4pIHtcbiAgICB2bS4kc2xvdHMgPSByZXNvbHZlU2xvdHMocmVuZGVyQ2hpbGRyZW4sIHBhcmVudFZub2RlLmNvbnRleHQpO1xuICAgIHZtLiRmb3JjZVVwZGF0ZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzSW5JbmFjdGl2ZVRyZWUgKHZtKSB7XG4gIHdoaWxlICh2bSAmJiAodm0gPSB2bS4kcGFyZW50KSkge1xuICAgIGlmICh2bS5faW5hY3RpdmUpIHsgcmV0dXJuIHRydWUgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5mdW5jdGlvbiBhY3RpdmF0ZUNoaWxkQ29tcG9uZW50ICh2bSwgZGlyZWN0KSB7XG4gIGlmIChkaXJlY3QpIHtcbiAgICB2bS5fZGlyZWN0SW5hY3RpdmUgPSBmYWxzZTtcbiAgICBpZiAoaXNJbkluYWN0aXZlVHJlZSh2bSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgfSBlbHNlIGlmICh2bS5fZGlyZWN0SW5hY3RpdmUpIHtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAodm0uX2luYWN0aXZlIHx8IHZtLl9pbmFjdGl2ZSA9PSBudWxsKSB7XG4gICAgdm0uX2luYWN0aXZlID0gZmFsc2U7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2bS4kY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFjdGl2YXRlQ2hpbGRDb21wb25lbnQodm0uJGNoaWxkcmVuW2ldKTtcbiAgICB9XG4gICAgY2FsbEhvb2sodm0sICdhY3RpdmF0ZWQnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWFjdGl2YXRlQ2hpbGRDb21wb25lbnQgKHZtLCBkaXJlY3QpIHtcbiAgaWYgKGRpcmVjdCkge1xuICAgIHZtLl9kaXJlY3RJbmFjdGl2ZSA9IHRydWU7XG4gICAgaWYgKGlzSW5JbmFjdGl2ZVRyZWUodm0pKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gIH1cbiAgaWYgKCF2bS5faW5hY3RpdmUpIHtcbiAgICB2bS5faW5hY3RpdmUgPSB0cnVlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdm0uJGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZWFjdGl2YXRlQ2hpbGRDb21wb25lbnQodm0uJGNoaWxkcmVuW2ldKTtcbiAgICB9XG4gICAgY2FsbEhvb2sodm0sICdkZWFjdGl2YXRlZCcpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNhbGxIb29rICh2bSwgaG9vaykge1xuICB2YXIgaGFuZGxlcnMgPSB2bS4kb3B0aW9uc1tob29rXTtcbiAgaWYgKGhhbmRsZXJzKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGogPSBoYW5kbGVycy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGhhbmRsZXJzW2ldLmNhbGwodm0pO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBoYW5kbGVFcnJvcihlLCB2bSwgKGhvb2sgKyBcIiBob29rXCIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHZtLl9oYXNIb29rRXZlbnQpIHtcbiAgICB2bS4kZW1pdCgnaG9vazonICsgaG9vayk7XG4gIH1cbn1cblxuLyogICovXG5cblxudmFyIHF1ZXVlID0gW107XG52YXIgaGFzID0ge307XG52YXIgY2lyY3VsYXIgPSB7fTtcbnZhciB3YWl0aW5nID0gZmFsc2U7XG52YXIgZmx1c2hpbmcgPSBmYWxzZTtcbnZhciBpbmRleCA9IDA7XG5cbi8qKlxuICogUmVzZXQgdGhlIHNjaGVkdWxlcidzIHN0YXRlLlxuICovXG5mdW5jdGlvbiByZXNldFNjaGVkdWxlclN0YXRlICgpIHtcbiAgcXVldWUubGVuZ3RoID0gMDtcbiAgaGFzID0ge307XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgY2lyY3VsYXIgPSB7fTtcbiAgfVxuICB3YWl0aW5nID0gZmx1c2hpbmcgPSBmYWxzZTtcbn1cblxuLyoqXG4gKiBGbHVzaCBib3RoIHF1ZXVlcyBhbmQgcnVuIHRoZSB3YXRjaGVycy5cbiAqL1xuZnVuY3Rpb24gZmx1c2hTY2hlZHVsZXJRdWV1ZSAoKSB7XG4gIGZsdXNoaW5nID0gdHJ1ZTtcbiAgdmFyIHdhdGNoZXIsIGlkLCB2bTtcblxuICAvLyBTb3J0IHF1ZXVlIGJlZm9yZSBmbHVzaC5cbiAgLy8gVGhpcyBlbnN1cmVzIHRoYXQ6XG4gIC8vIDEuIENvbXBvbmVudHMgYXJlIHVwZGF0ZWQgZnJvbSBwYXJlbnQgdG8gY2hpbGQuIChiZWNhdXNlIHBhcmVudCBpcyBhbHdheXNcbiAgLy8gICAgY3JlYXRlZCBiZWZvcmUgdGhlIGNoaWxkKVxuICAvLyAyLiBBIGNvbXBvbmVudCdzIHVzZXIgd2F0Y2hlcnMgYXJlIHJ1biBiZWZvcmUgaXRzIHJlbmRlciB3YXRjaGVyIChiZWNhdXNlXG4gIC8vICAgIHVzZXIgd2F0Y2hlcnMgYXJlIGNyZWF0ZWQgYmVmb3JlIHRoZSByZW5kZXIgd2F0Y2hlcilcbiAgLy8gMy4gSWYgYSBjb21wb25lbnQgaXMgZGVzdHJveWVkIGR1cmluZyBhIHBhcmVudCBjb21wb25lbnQncyB3YXRjaGVyIHJ1bixcbiAgLy8gICAgaXRzIHdhdGNoZXJzIGNhbiBiZSBza2lwcGVkLlxuICBxdWV1ZS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLmlkIC0gYi5pZDsgfSk7XG5cbiAgLy8gZG8gbm90IGNhY2hlIGxlbmd0aCBiZWNhdXNlIG1vcmUgd2F0Y2hlcnMgbWlnaHQgYmUgcHVzaGVkXG4gIC8vIGFzIHdlIHJ1biBleGlzdGluZyB3YXRjaGVyc1xuICBmb3IgKGluZGV4ID0gMDsgaW5kZXggPCBxdWV1ZS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICB3YXRjaGVyID0gcXVldWVbaW5kZXhdO1xuICAgIGlkID0gd2F0Y2hlci5pZDtcbiAgICBoYXNbaWRdID0gbnVsbDtcbiAgICB3YXRjaGVyLnJ1bigpO1xuICAgIC8vIGluIGRldiBidWlsZCwgY2hlY2sgYW5kIHN0b3AgY2lyY3VsYXIgdXBkYXRlcy5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBoYXNbaWRdICE9IG51bGwpIHtcbiAgICAgIGNpcmN1bGFyW2lkXSA9IChjaXJjdWxhcltpZF0gfHwgMCkgKyAxO1xuICAgICAgaWYgKGNpcmN1bGFyW2lkXSA+IGNvbmZpZy5fbWF4VXBkYXRlQ291bnQpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAnWW91IG1heSBoYXZlIGFuIGluZmluaXRlIHVwZGF0ZSBsb29wICcgKyAoXG4gICAgICAgICAgICB3YXRjaGVyLnVzZXJcbiAgICAgICAgICAgICAgPyAoXCJpbiB3YXRjaGVyIHdpdGggZXhwcmVzc2lvbiBcXFwiXCIgKyAod2F0Y2hlci5leHByZXNzaW9uKSArIFwiXFxcIlwiKVxuICAgICAgICAgICAgICA6IFwiaW4gYSBjb21wb25lbnQgcmVuZGVyIGZ1bmN0aW9uLlwiXG4gICAgICAgICAgKSxcbiAgICAgICAgICB3YXRjaGVyLnZtXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gY2FsbCB1cGRhdGVkIGhvb2tzXG4gIGluZGV4ID0gcXVldWUubGVuZ3RoO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHdhdGNoZXIgPSBxdWV1ZVtpbmRleF07XG4gICAgdm0gPSB3YXRjaGVyLnZtO1xuICAgIGlmICh2bS5fd2F0Y2hlciA9PT0gd2F0Y2hlciAmJiB2bS5faXNNb3VudGVkKSB7XG4gICAgICBjYWxsSG9vayh2bSwgJ3VwZGF0ZWQnKTtcbiAgICB9XG4gIH1cblxuICAvLyBkZXZ0b29sIGhvb2tcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChkZXZ0b29scyAmJiBjb25maWcuZGV2dG9vbHMpIHtcbiAgICBkZXZ0b29scy5lbWl0KCdmbHVzaCcpO1xuICB9XG5cbiAgcmVzZXRTY2hlZHVsZXJTdGF0ZSgpO1xufVxuXG4vKipcbiAqIFB1c2ggYSB3YXRjaGVyIGludG8gdGhlIHdhdGNoZXIgcXVldWUuXG4gKiBKb2JzIHdpdGggZHVwbGljYXRlIElEcyB3aWxsIGJlIHNraXBwZWQgdW5sZXNzIGl0J3NcbiAqIHB1c2hlZCB3aGVuIHRoZSBxdWV1ZSBpcyBiZWluZyBmbHVzaGVkLlxuICovXG5mdW5jdGlvbiBxdWV1ZVdhdGNoZXIgKHdhdGNoZXIpIHtcbiAgdmFyIGlkID0gd2F0Y2hlci5pZDtcbiAgaWYgKGhhc1tpZF0gPT0gbnVsbCkge1xuICAgIGhhc1tpZF0gPSB0cnVlO1xuICAgIGlmICghZmx1c2hpbmcpIHtcbiAgICAgIHF1ZXVlLnB1c2god2F0Y2hlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIGFscmVhZHkgZmx1c2hpbmcsIHNwbGljZSB0aGUgd2F0Y2hlciBiYXNlZCBvbiBpdHMgaWRcbiAgICAgIC8vIGlmIGFscmVhZHkgcGFzdCBpdHMgaWQsIGl0IHdpbGwgYmUgcnVuIG5leHQgaW1tZWRpYXRlbHkuXG4gICAgICB2YXIgaSA9IHF1ZXVlLmxlbmd0aCAtIDE7XG4gICAgICB3aGlsZSAoaSA+PSAwICYmIHF1ZXVlW2ldLmlkID4gd2F0Y2hlci5pZCkge1xuICAgICAgICBpLS07XG4gICAgICB9XG4gICAgICBxdWV1ZS5zcGxpY2UoTWF0aC5tYXgoaSwgaW5kZXgpICsgMSwgMCwgd2F0Y2hlcik7XG4gICAgfVxuICAgIC8vIHF1ZXVlIHRoZSBmbHVzaFxuICAgIGlmICghd2FpdGluZykge1xuICAgICAgd2FpdGluZyA9IHRydWU7XG4gICAgICBuZXh0VGljayhmbHVzaFNjaGVkdWxlclF1ZXVlKTtcbiAgICB9XG4gIH1cbn1cblxuLyogICovXG5cbnZhciB1aWQkMiA9IDA7XG5cbi8qKlxuICogQSB3YXRjaGVyIHBhcnNlcyBhbiBleHByZXNzaW9uLCBjb2xsZWN0cyBkZXBlbmRlbmNpZXMsXG4gKiBhbmQgZmlyZXMgY2FsbGJhY2sgd2hlbiB0aGUgZXhwcmVzc2lvbiB2YWx1ZSBjaGFuZ2VzLlxuICogVGhpcyBpcyB1c2VkIGZvciBib3RoIHRoZSAkd2F0Y2goKSBhcGkgYW5kIGRpcmVjdGl2ZXMuXG4gKi9cbnZhciBXYXRjaGVyID0gZnVuY3Rpb24gV2F0Y2hlciAoXG4gIHZtLFxuICBleHBPckZuLFxuICBjYixcbiAgb3B0aW9uc1xuKSB7XG4gIHRoaXMudm0gPSB2bTtcbiAgdm0uX3dhdGNoZXJzLnB1c2godGhpcyk7XG4gIC8vIG9wdGlvbnNcbiAgaWYgKG9wdGlvbnMpIHtcbiAgICB0aGlzLmRlZXAgPSAhIW9wdGlvbnMuZGVlcDtcbiAgICB0aGlzLnVzZXIgPSAhIW9wdGlvbnMudXNlcjtcbiAgICB0aGlzLmxhenkgPSAhIW9wdGlvbnMubGF6eTtcbiAgICB0aGlzLnN5bmMgPSAhIW9wdGlvbnMuc3luYztcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmRlZXAgPSB0aGlzLnVzZXIgPSB0aGlzLmxhenkgPSB0aGlzLnN5bmMgPSBmYWxzZTtcbiAgfVxuICB0aGlzLmNiID0gY2I7XG4gIHRoaXMuaWQgPSArK3VpZCQyOyAvLyB1aWQgZm9yIGJhdGNoaW5nXG4gIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgdGhpcy5kaXJ0eSA9IHRoaXMubGF6eTsgLy8gZm9yIGxhenkgd2F0Y2hlcnNcbiAgdGhpcy5kZXBzID0gW107XG4gIHRoaXMubmV3RGVwcyA9IFtdO1xuICB0aGlzLmRlcElkcyA9IG5ldyBfU2V0KCk7XG4gIHRoaXMubmV3RGVwSWRzID0gbmV3IF9TZXQoKTtcbiAgdGhpcy5leHByZXNzaW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJ1xuICAgID8gZXhwT3JGbi50b1N0cmluZygpXG4gICAgOiAnJztcbiAgLy8gcGFyc2UgZXhwcmVzc2lvbiBmb3IgZ2V0dGVyXG4gIGlmICh0eXBlb2YgZXhwT3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHRoaXMuZ2V0dGVyID0gZXhwT3JGbjtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmdldHRlciA9IHBhcnNlUGF0aChleHBPckZuKTtcbiAgICBpZiAoIXRoaXMuZ2V0dGVyKSB7XG4gICAgICB0aGlzLmdldHRlciA9IGZ1bmN0aW9uICgpIHt9O1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgICBcIkZhaWxlZCB3YXRjaGluZyBwYXRoOiBcXFwiXCIgKyBleHBPckZuICsgXCJcXFwiIFwiICtcbiAgICAgICAgJ1dhdGNoZXIgb25seSBhY2NlcHRzIHNpbXBsZSBkb3QtZGVsaW1pdGVkIHBhdGhzLiAnICtcbiAgICAgICAgJ0ZvciBmdWxsIGNvbnRyb2wsIHVzZSBhIGZ1bmN0aW9uIGluc3RlYWQuJyxcbiAgICAgICAgdm1cbiAgICAgICk7XG4gICAgfVxuICB9XG4gIHRoaXMudmFsdWUgPSB0aGlzLmxhenlcbiAgICA/IHVuZGVmaW5lZFxuICAgIDogdGhpcy5nZXQoKTtcbn07XG5cbi8qKlxuICogRXZhbHVhdGUgdGhlIGdldHRlciwgYW5kIHJlLWNvbGxlY3QgZGVwZW5kZW5jaWVzLlxuICovXG5XYXRjaGVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiBnZXQgKCkge1xuICBwdXNoVGFyZ2V0KHRoaXMpO1xuICB2YXIgdmFsdWU7XG4gIHZhciB2bSA9IHRoaXMudm07XG4gIGlmICh0aGlzLnVzZXIpIHtcbiAgICB0cnkge1xuICAgICAgdmFsdWUgPSB0aGlzLmdldHRlci5jYWxsKHZtLCB2bSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaGFuZGxlRXJyb3IoZSwgdm0sIChcImdldHRlciBmb3Igd2F0Y2hlciBcXFwiXCIgKyAodGhpcy5leHByZXNzaW9uKSArIFwiXFxcIlwiKSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhbHVlID0gdGhpcy5nZXR0ZXIuY2FsbCh2bSwgdm0pO1xuICB9XG4gIC8vIFwidG91Y2hcIiBldmVyeSBwcm9wZXJ0eSBzbyB0aGV5IGFyZSBhbGwgdHJhY2tlZCBhc1xuICAvLyBkZXBlbmRlbmNpZXMgZm9yIGRlZXAgd2F0Y2hpbmdcbiAgaWYgKHRoaXMuZGVlcCkge1xuICAgIHRyYXZlcnNlKHZhbHVlKTtcbiAgfVxuICBwb3BUYXJnZXQoKTtcbiAgdGhpcy5jbGVhbnVwRGVwcygpO1xuICByZXR1cm4gdmFsdWVcbn07XG5cbi8qKlxuICogQWRkIGEgZGVwZW5kZW5jeSB0byB0aGlzIGRpcmVjdGl2ZS5cbiAqL1xuV2F0Y2hlci5wcm90b3R5cGUuYWRkRGVwID0gZnVuY3Rpb24gYWRkRGVwIChkZXApIHtcbiAgdmFyIGlkID0gZGVwLmlkO1xuICBpZiAoIXRoaXMubmV3RGVwSWRzLmhhcyhpZCkpIHtcbiAgICB0aGlzLm5ld0RlcElkcy5hZGQoaWQpO1xuICAgIHRoaXMubmV3RGVwcy5wdXNoKGRlcCk7XG4gICAgaWYgKCF0aGlzLmRlcElkcy5oYXMoaWQpKSB7XG4gICAgICBkZXAuYWRkU3ViKHRoaXMpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBDbGVhbiB1cCBmb3IgZGVwZW5kZW5jeSBjb2xsZWN0aW9uLlxuICovXG5XYXRjaGVyLnByb3RvdHlwZS5jbGVhbnVwRGVwcyA9IGZ1bmN0aW9uIGNsZWFudXBEZXBzICgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgaSA9IHRoaXMuZGVwcy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICB2YXIgZGVwID0gdGhpcyQxLmRlcHNbaV07XG4gICAgaWYgKCF0aGlzJDEubmV3RGVwSWRzLmhhcyhkZXAuaWQpKSB7XG4gICAgICBkZXAucmVtb3ZlU3ViKHRoaXMkMSk7XG4gICAgfVxuICB9XG4gIHZhciB0bXAgPSB0aGlzLmRlcElkcztcbiAgdGhpcy5kZXBJZHMgPSB0aGlzLm5ld0RlcElkcztcbiAgdGhpcy5uZXdEZXBJZHMgPSB0bXA7XG4gIHRoaXMubmV3RGVwSWRzLmNsZWFyKCk7XG4gIHRtcCA9IHRoaXMuZGVwcztcbiAgdGhpcy5kZXBzID0gdGhpcy5uZXdEZXBzO1xuICB0aGlzLm5ld0RlcHMgPSB0bXA7XG4gIHRoaXMubmV3RGVwcy5sZW5ndGggPSAwO1xufTtcblxuLyoqXG4gKiBTdWJzY3JpYmVyIGludGVyZmFjZS5cbiAqIFdpbGwgYmUgY2FsbGVkIHdoZW4gYSBkZXBlbmRlbmN5IGNoYW5nZXMuXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSAoKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmICh0aGlzLmxhenkpIHtcbiAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcbiAgfSBlbHNlIGlmICh0aGlzLnN5bmMpIHtcbiAgICB0aGlzLnJ1bigpO1xuICB9IGVsc2Uge1xuICAgIHF1ZXVlV2F0Y2hlcih0aGlzKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTY2hlZHVsZXIgam9iIGludGVyZmFjZS5cbiAqIFdpbGwgYmUgY2FsbGVkIGJ5IHRoZSBzY2hlZHVsZXIuXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIHJ1biAoKSB7XG4gIGlmICh0aGlzLmFjdGl2ZSkge1xuICAgIHZhciB2YWx1ZSA9IHRoaXMuZ2V0KCk7XG4gICAgaWYgKFxuICAgICAgdmFsdWUgIT09IHRoaXMudmFsdWUgfHxcbiAgICAgIC8vIERlZXAgd2F0Y2hlcnMgYW5kIHdhdGNoZXJzIG9uIE9iamVjdC9BcnJheXMgc2hvdWxkIGZpcmUgZXZlblxuICAgICAgLy8gd2hlbiB0aGUgdmFsdWUgaXMgdGhlIHNhbWUsIGJlY2F1c2UgdGhlIHZhbHVlIG1heVxuICAgICAgLy8gaGF2ZSBtdXRhdGVkLlxuICAgICAgaXNPYmplY3QodmFsdWUpIHx8XG4gICAgICB0aGlzLmRlZXBcbiAgICApIHtcbiAgICAgIC8vIHNldCBuZXcgdmFsdWVcbiAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgICBpZiAodGhpcy51c2VyKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhpcy5jYi5jYWxsKHRoaXMudm0sIHZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBoYW5kbGVFcnJvcihlLCB0aGlzLnZtLCAoXCJjYWxsYmFjayBmb3Igd2F0Y2hlciBcXFwiXCIgKyAodGhpcy5leHByZXNzaW9uKSArIFwiXFxcIlwiKSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2IuY2FsbCh0aGlzLnZtLCB2YWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBFdmFsdWF0ZSB0aGUgdmFsdWUgb2YgdGhlIHdhdGNoZXIuXG4gKiBUaGlzIG9ubHkgZ2V0cyBjYWxsZWQgZm9yIGxhenkgd2F0Y2hlcnMuXG4gKi9cbldhdGNoZXIucHJvdG90eXBlLmV2YWx1YXRlID0gZnVuY3Rpb24gZXZhbHVhdGUgKCkge1xuICB0aGlzLnZhbHVlID0gdGhpcy5nZXQoKTtcbiAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xufTtcblxuLyoqXG4gKiBEZXBlbmQgb24gYWxsIGRlcHMgY29sbGVjdGVkIGJ5IHRoaXMgd2F0Y2hlci5cbiAqL1xuV2F0Y2hlci5wcm90b3R5cGUuZGVwZW5kID0gZnVuY3Rpb24gZGVwZW5kICgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgaSA9IHRoaXMuZGVwcy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICB0aGlzJDEuZGVwc1tpXS5kZXBlbmQoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZW1vdmUgc2VsZiBmcm9tIGFsbCBkZXBlbmRlbmNpZXMnIHN1YnNjcmliZXIgbGlzdC5cbiAqL1xuV2F0Y2hlci5wcm90b3R5cGUudGVhcmRvd24gPSBmdW5jdGlvbiB0ZWFyZG93biAoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgLy8gcmVtb3ZlIHNlbGYgZnJvbSB2bSdzIHdhdGNoZXIgbGlzdFxuICAgIC8vIHRoaXMgaXMgYSBzb21ld2hhdCBleHBlbnNpdmUgb3BlcmF0aW9uIHNvIHdlIHNraXAgaXRcbiAgICAvLyBpZiB0aGUgdm0gaXMgYmVpbmcgZGVzdHJveWVkLlxuICAgIGlmICghdGhpcy52bS5faXNCZWluZ0Rlc3Ryb3llZCkge1xuICAgICAgcmVtb3ZlKHRoaXMudm0uX3dhdGNoZXJzLCB0aGlzKTtcbiAgICB9XG4gICAgdmFyIGkgPSB0aGlzLmRlcHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHRoaXMkMS5kZXBzW2ldLnJlbW92ZVN1Yih0aGlzJDEpO1xuICAgIH1cbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9XG59O1xuXG4vKipcbiAqIFJlY3Vyc2l2ZWx5IHRyYXZlcnNlIGFuIG9iamVjdCB0byBldm9rZSBhbGwgY29udmVydGVkXG4gKiBnZXR0ZXJzLCBzbyB0aGF0IGV2ZXJ5IG5lc3RlZCBwcm9wZXJ0eSBpbnNpZGUgdGhlIG9iamVjdFxuICogaXMgY29sbGVjdGVkIGFzIGEgXCJkZWVwXCIgZGVwZW5kZW5jeS5cbiAqL1xudmFyIHNlZW5PYmplY3RzID0gbmV3IF9TZXQoKTtcbmZ1bmN0aW9uIHRyYXZlcnNlICh2YWwpIHtcbiAgc2Vlbk9iamVjdHMuY2xlYXIoKTtcbiAgX3RyYXZlcnNlKHZhbCwgc2Vlbk9iamVjdHMpO1xufVxuXG5mdW5jdGlvbiBfdHJhdmVyc2UgKHZhbCwgc2Vlbikge1xuICB2YXIgaSwga2V5cztcbiAgdmFyIGlzQSA9IEFycmF5LmlzQXJyYXkodmFsKTtcbiAgaWYgKCghaXNBICYmICFpc09iamVjdCh2YWwpKSB8fCAhT2JqZWN0LmlzRXh0ZW5zaWJsZSh2YWwpKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKHZhbC5fX29iX18pIHtcbiAgICB2YXIgZGVwSWQgPSB2YWwuX19vYl9fLmRlcC5pZDtcbiAgICBpZiAoc2Vlbi5oYXMoZGVwSWQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgc2Vlbi5hZGQoZGVwSWQpO1xuICB9XG4gIGlmIChpc0EpIHtcbiAgICBpID0gdmFsLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKSB7IF90cmF2ZXJzZSh2YWxbaV0sIHNlZW4pOyB9XG4gIH0gZWxzZSB7XG4gICAga2V5cyA9IE9iamVjdC5rZXlzKHZhbCk7XG4gICAgaSA9IGtleXMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHsgX3RyYXZlcnNlKHZhbFtrZXlzW2ldXSwgc2Vlbik7IH1cbiAgfVxufVxuXG4vKiAgKi9cblxudmFyIHNoYXJlZFByb3BlcnR5RGVmaW5pdGlvbiA9IHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgY29uZmlndXJhYmxlOiB0cnVlLFxuICBnZXQ6IG5vb3AsXG4gIHNldDogbm9vcFxufTtcblxuZnVuY3Rpb24gcHJveHkgKHRhcmdldCwgc291cmNlS2V5LCBrZXkpIHtcbiAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLmdldCA9IGZ1bmN0aW9uIHByb3h5R2V0dGVyICgpIHtcbiAgICByZXR1cm4gdGhpc1tzb3VyY2VLZXldW2tleV1cbiAgfTtcbiAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLnNldCA9IGZ1bmN0aW9uIHByb3h5U2V0dGVyICh2YWwpIHtcbiAgICB0aGlzW3NvdXJjZUtleV1ba2V5XSA9IHZhbDtcbiAgfTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24pO1xufVxuXG5mdW5jdGlvbiBpbml0U3RhdGUgKHZtKSB7XG4gIHZtLl93YXRjaGVycyA9IFtdO1xuICB2YXIgb3B0cyA9IHZtLiRvcHRpb25zO1xuICBpZiAob3B0cy5wcm9wcykgeyBpbml0UHJvcHModm0sIG9wdHMucHJvcHMpOyB9XG4gIGlmIChvcHRzLm1ldGhvZHMpIHsgaW5pdE1ldGhvZHModm0sIG9wdHMubWV0aG9kcyk7IH1cbiAgaWYgKG9wdHMuZGF0YSkge1xuICAgIGluaXREYXRhKHZtKTtcbiAgfSBlbHNlIHtcbiAgICBvYnNlcnZlKHZtLl9kYXRhID0ge30sIHRydWUgLyogYXNSb290RGF0YSAqLyk7XG4gIH1cbiAgaWYgKG9wdHMuY29tcHV0ZWQpIHsgaW5pdENvbXB1dGVkKHZtLCBvcHRzLmNvbXB1dGVkKTsgfVxuICBpZiAob3B0cy53YXRjaCkgeyBpbml0V2F0Y2godm0sIG9wdHMud2F0Y2gpOyB9XG59XG5cbnZhciBpc1Jlc2VydmVkUHJvcCA9IHsga2V5OiAxLCByZWY6IDEsIHNsb3Q6IDEgfTtcblxuZnVuY3Rpb24gaW5pdFByb3BzICh2bSwgcHJvcHNPcHRpb25zKSB7XG4gIHZhciBwcm9wc0RhdGEgPSB2bS4kb3B0aW9ucy5wcm9wc0RhdGEgfHwge307XG4gIHZhciBwcm9wcyA9IHZtLl9wcm9wcyA9IHt9O1xuICAvLyBjYWNoZSBwcm9wIGtleXMgc28gdGhhdCBmdXR1cmUgcHJvcHMgdXBkYXRlcyBjYW4gaXRlcmF0ZSB1c2luZyBBcnJheVxuICAvLyBpbnN0ZWFkIG9mIGR5bmFtaWMgb2JqZWN0IGtleSBlbnVtZXJhdGlvbi5cbiAgdmFyIGtleXMgPSB2bS4kb3B0aW9ucy5fcHJvcEtleXMgPSBbXTtcbiAgdmFyIGlzUm9vdCA9ICF2bS4kcGFyZW50O1xuICAvLyByb290IGluc3RhbmNlIHByb3BzIHNob3VsZCBiZSBjb252ZXJ0ZWRcbiAgb2JzZXJ2ZXJTdGF0ZS5zaG91bGRDb252ZXJ0ID0gaXNSb290O1xuICB2YXIgbG9vcCA9IGZ1bmN0aW9uICgga2V5ICkge1xuICAgIGtleXMucHVzaChrZXkpO1xuICAgIHZhciB2YWx1ZSA9IHZhbGlkYXRlUHJvcChrZXksIHByb3BzT3B0aW9ucywgcHJvcHNEYXRhLCB2bSk7XG4gICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKGlzUmVzZXJ2ZWRQcm9wW2tleV0pIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAoXCJcXFwiXCIgKyBrZXkgKyBcIlxcXCIgaXMgYSByZXNlcnZlZCBhdHRyaWJ1dGUgYW5kIGNhbm5vdCBiZSB1c2VkIGFzIGNvbXBvbmVudCBwcm9wLlwiKSxcbiAgICAgICAgICB2bVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgZGVmaW5lUmVhY3RpdmUkJDEocHJvcHMsIGtleSwgdmFsdWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHZtLiRwYXJlbnQgJiYgIW9ic2VydmVyU3RhdGUuaXNTZXR0aW5nUHJvcHMpIHtcbiAgICAgICAgICB3YXJuKFxuICAgICAgICAgICAgXCJBdm9pZCBtdXRhdGluZyBhIHByb3AgZGlyZWN0bHkgc2luY2UgdGhlIHZhbHVlIHdpbGwgYmUgXCIgK1xuICAgICAgICAgICAgXCJvdmVyd3JpdHRlbiB3aGVuZXZlciB0aGUgcGFyZW50IGNvbXBvbmVudCByZS1yZW5kZXJzLiBcIiArXG4gICAgICAgICAgICBcIkluc3RlYWQsIHVzZSBhIGRhdGEgb3IgY29tcHV0ZWQgcHJvcGVydHkgYmFzZWQgb24gdGhlIHByb3AncyBcIiArXG4gICAgICAgICAgICBcInZhbHVlLiBQcm9wIGJlaW5nIG11dGF0ZWQ6IFxcXCJcIiArIGtleSArIFwiXFxcIlwiLFxuICAgICAgICAgICAgdm1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVmaW5lUmVhY3RpdmUkJDEocHJvcHMsIGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICAvLyBzdGF0aWMgcHJvcHMgYXJlIGFscmVhZHkgcHJveGllZCBvbiB0aGUgY29tcG9uZW50J3MgcHJvdG90eXBlXG4gICAgLy8gZHVyaW5nIFZ1ZS5leHRlbmQoKS4gV2Ugb25seSBuZWVkIHRvIHByb3h5IHByb3BzIGRlZmluZWQgYXRcbiAgICAvLyBpbnN0YW50aWF0aW9uIGhlcmUuXG4gICAgaWYgKCEoa2V5IGluIHZtKSkge1xuICAgICAgcHJveHkodm0sIFwiX3Byb3BzXCIsIGtleSk7XG4gICAgfVxuICB9O1xuXG4gIGZvciAodmFyIGtleSBpbiBwcm9wc09wdGlvbnMpIGxvb3AoIGtleSApO1xuICBvYnNlcnZlclN0YXRlLnNob3VsZENvbnZlcnQgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBpbml0RGF0YSAodm0pIHtcbiAgdmFyIGRhdGEgPSB2bS4kb3B0aW9ucy5kYXRhO1xuICBkYXRhID0gdm0uX2RhdGEgPSB0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gZGF0YS5jYWxsKHZtKVxuICAgIDogZGF0YSB8fCB7fTtcbiAgaWYgKCFpc1BsYWluT2JqZWN0KGRhdGEpKSB7XG4gICAgZGF0YSA9IHt9O1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICdkYXRhIGZ1bmN0aW9ucyBzaG91bGQgcmV0dXJuIGFuIG9iamVjdDpcXG4nICtcbiAgICAgICdodHRwczovL3Z1ZWpzLm9yZy92Mi9ndWlkZS9jb21wb25lbnRzLmh0bWwjZGF0YS1NdXN0LUJlLWEtRnVuY3Rpb24nLFxuICAgICAgdm1cbiAgICApO1xuICB9XG4gIC8vIHByb3h5IGRhdGEgb24gaW5zdGFuY2VcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhkYXRhKTtcbiAgdmFyIHByb3BzID0gdm0uJG9wdGlvbnMucHJvcHM7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICBpZiAocHJvcHMgJiYgaGFzT3duKHByb3BzLCBrZXlzW2ldKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgICBcIlRoZSBkYXRhIHByb3BlcnR5IFxcXCJcIiArIChrZXlzW2ldKSArIFwiXFxcIiBpcyBhbHJlYWR5IGRlY2xhcmVkIGFzIGEgcHJvcC4gXCIgK1xuICAgICAgICBcIlVzZSBwcm9wIGRlZmF1bHQgdmFsdWUgaW5zdGVhZC5cIixcbiAgICAgICAgdm1cbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICghaXNSZXNlcnZlZChrZXlzW2ldKSkge1xuICAgICAgcHJveHkodm0sIFwiX2RhdGFcIiwga2V5c1tpXSk7XG4gICAgfVxuICB9XG4gIC8vIG9ic2VydmUgZGF0YVxuICBvYnNlcnZlKGRhdGEsIHRydWUgLyogYXNSb290RGF0YSAqLyk7XG59XG5cbnZhciBjb21wdXRlZFdhdGNoZXJPcHRpb25zID0geyBsYXp5OiB0cnVlIH07XG5cbmZ1bmN0aW9uIGluaXRDb21wdXRlZCAodm0sIGNvbXB1dGVkKSB7XG4gIHZhciB3YXRjaGVycyA9IHZtLl9jb21wdXRlZFdhdGNoZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICBmb3IgKHZhciBrZXkgaW4gY29tcHV0ZWQpIHtcbiAgICB2YXIgdXNlckRlZiA9IGNvbXB1dGVkW2tleV07XG4gICAgdmFyIGdldHRlciA9IHR5cGVvZiB1c2VyRGVmID09PSAnZnVuY3Rpb24nID8gdXNlckRlZiA6IHVzZXJEZWYuZ2V0O1xuICAgIC8vIGNyZWF0ZSBpbnRlcm5hbCB3YXRjaGVyIGZvciB0aGUgY29tcHV0ZWQgcHJvcGVydHkuXG4gICAgd2F0Y2hlcnNba2V5XSA9IG5ldyBXYXRjaGVyKHZtLCBnZXR0ZXIsIG5vb3AsIGNvbXB1dGVkV2F0Y2hlck9wdGlvbnMpO1xuXG4gICAgLy8gY29tcG9uZW50LWRlZmluZWQgY29tcHV0ZWQgcHJvcGVydGllcyBhcmUgYWxyZWFkeSBkZWZpbmVkIG9uIHRoZVxuICAgIC8vIGNvbXBvbmVudCBwcm90b3R5cGUuIFdlIG9ubHkgbmVlZCB0byBkZWZpbmUgY29tcHV0ZWQgcHJvcGVydGllcyBkZWZpbmVkXG4gICAgLy8gYXQgaW5zdGFudGlhdGlvbiBoZXJlLlxuICAgIGlmICghKGtleSBpbiB2bSkpIHtcbiAgICAgIGRlZmluZUNvbXB1dGVkKHZtLCBrZXksIHVzZXJEZWYpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZpbmVDb21wdXRlZCAodGFyZ2V0LCBrZXksIHVzZXJEZWYpIHtcbiAgaWYgKHR5cGVvZiB1c2VyRGVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLmdldCA9IGNyZWF0ZUNvbXB1dGVkR2V0dGVyKGtleSk7XG4gICAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLnNldCA9IG5vb3A7XG4gIH0gZWxzZSB7XG4gICAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLmdldCA9IHVzZXJEZWYuZ2V0XG4gICAgICA/IHVzZXJEZWYuY2FjaGUgIT09IGZhbHNlXG4gICAgICAgID8gY3JlYXRlQ29tcHV0ZWRHZXR0ZXIoa2V5KVxuICAgICAgICA6IHVzZXJEZWYuZ2V0XG4gICAgICA6IG5vb3A7XG4gICAgc2hhcmVkUHJvcGVydHlEZWZpbml0aW9uLnNldCA9IHVzZXJEZWYuc2V0XG4gICAgICA/IHVzZXJEZWYuc2V0XG4gICAgICA6IG5vb3A7XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzaGFyZWRQcm9wZXJ0eURlZmluaXRpb24pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21wdXRlZEdldHRlciAoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbiBjb21wdXRlZEdldHRlciAoKSB7XG4gICAgdmFyIHdhdGNoZXIgPSB0aGlzLl9jb21wdXRlZFdhdGNoZXJzICYmIHRoaXMuX2NvbXB1dGVkV2F0Y2hlcnNba2V5XTtcbiAgICBpZiAod2F0Y2hlcikge1xuICAgICAgaWYgKHdhdGNoZXIuZGlydHkpIHtcbiAgICAgICAgd2F0Y2hlci5ldmFsdWF0ZSgpO1xuICAgICAgfVxuICAgICAgaWYgKERlcC50YXJnZXQpIHtcbiAgICAgICAgd2F0Y2hlci5kZXBlbmQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3YXRjaGVyLnZhbHVlXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRNZXRob2RzICh2bSwgbWV0aG9kcykge1xuICB2YXIgcHJvcHMgPSB2bS4kb3B0aW9ucy5wcm9wcztcbiAgZm9yICh2YXIga2V5IGluIG1ldGhvZHMpIHtcbiAgICB2bVtrZXldID0gbWV0aG9kc1trZXldID09IG51bGwgPyBub29wIDogYmluZChtZXRob2RzW2tleV0sIHZtKTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKG1ldGhvZHNba2V5XSA9PSBudWxsKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgXCJtZXRob2QgXFxcIlwiICsga2V5ICsgXCJcXFwiIGhhcyBhbiB1bmRlZmluZWQgdmFsdWUgaW4gdGhlIGNvbXBvbmVudCBkZWZpbml0aW9uLiBcIiArXG4gICAgICAgICAgXCJEaWQgeW91IHJlZmVyZW5jZSB0aGUgZnVuY3Rpb24gY29ycmVjdGx5P1wiLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAocHJvcHMgJiYgaGFzT3duKHByb3BzLCBrZXkpKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgKFwibWV0aG9kIFxcXCJcIiArIGtleSArIFwiXFxcIiBoYXMgYWxyZWFkeSBiZWVuIGRlZmluZWQgYXMgYSBwcm9wLlwiKSxcbiAgICAgICAgICB2bVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0V2F0Y2ggKHZtLCB3YXRjaCkge1xuICBmb3IgKHZhciBrZXkgaW4gd2F0Y2gpIHtcbiAgICB2YXIgaGFuZGxlciA9IHdhdGNoW2tleV07XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaGFuZGxlcikpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGFuZGxlci5sZW5ndGg7IGkrKykge1xuICAgICAgICBjcmVhdGVXYXRjaGVyKHZtLCBrZXksIGhhbmRsZXJbaV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjcmVhdGVXYXRjaGVyKHZtLCBrZXksIGhhbmRsZXIpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVXYXRjaGVyICh2bSwga2V5LCBoYW5kbGVyKSB7XG4gIHZhciBvcHRpb25zO1xuICBpZiAoaXNQbGFpbk9iamVjdChoYW5kbGVyKSkge1xuICAgIG9wdGlvbnMgPSBoYW5kbGVyO1xuICAgIGhhbmRsZXIgPSBoYW5kbGVyLmhhbmRsZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnc3RyaW5nJykge1xuICAgIGhhbmRsZXIgPSB2bVtoYW5kbGVyXTtcbiAgfVxuICB2bS4kd2F0Y2goa2V5LCBoYW5kbGVyLCBvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gc3RhdGVNaXhpbiAoVnVlKSB7XG4gIC8vIGZsb3cgc29tZWhvdyBoYXMgcHJvYmxlbXMgd2l0aCBkaXJlY3RseSBkZWNsYXJlZCBkZWZpbml0aW9uIG9iamVjdFxuICAvLyB3aGVuIHVzaW5nIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSwgc28gd2UgaGF2ZSB0byBwcm9jZWR1cmFsbHkgYnVpbGQgdXBcbiAgLy8gdGhlIG9iamVjdCBoZXJlLlxuICB2YXIgZGF0YURlZiA9IHt9O1xuICBkYXRhRGVmLmdldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX2RhdGEgfTtcbiAgdmFyIHByb3BzRGVmID0ge307XG4gIHByb3BzRGVmLmdldCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuX3Byb3BzIH07XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZGF0YURlZi5zZXQgPSBmdW5jdGlvbiAobmV3RGF0YSkge1xuICAgICAgd2FybihcbiAgICAgICAgJ0F2b2lkIHJlcGxhY2luZyBpbnN0YW5jZSByb290ICRkYXRhLiAnICtcbiAgICAgICAgJ1VzZSBuZXN0ZWQgZGF0YSBwcm9wZXJ0aWVzIGluc3RlYWQuJyxcbiAgICAgICAgdGhpc1xuICAgICAgKTtcbiAgICB9O1xuICAgIHByb3BzRGVmLnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdhcm4oXCIkcHJvcHMgaXMgcmVhZG9ubHkuXCIsIHRoaXMpO1xuICAgIH07XG4gIH1cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZ1ZS5wcm90b3R5cGUsICckZGF0YScsIGRhdGFEZWYpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLnByb3RvdHlwZSwgJyRwcm9wcycsIHByb3BzRGVmKTtcblxuICBWdWUucHJvdG90eXBlLiRzZXQgPSBzZXQ7XG4gIFZ1ZS5wcm90b3R5cGUuJGRlbGV0ZSA9IGRlbDtcblxuICBWdWUucHJvdG90eXBlLiR3YXRjaCA9IGZ1bmN0aW9uIChcbiAgICBleHBPckZuLFxuICAgIGNiLFxuICAgIG9wdGlvbnNcbiAgKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBvcHRpb25zLnVzZXIgPSB0cnVlO1xuICAgIHZhciB3YXRjaGVyID0gbmV3IFdhdGNoZXIodm0sIGV4cE9yRm4sIGNiLCBvcHRpb25zKTtcbiAgICBpZiAob3B0aW9ucy5pbW1lZGlhdGUpIHtcbiAgICAgIGNiLmNhbGwodm0sIHdhdGNoZXIudmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gZnVuY3Rpb24gdW53YXRjaEZuICgpIHtcbiAgICAgIHdhdGNoZXIudGVhcmRvd24oKTtcbiAgICB9XG4gIH07XG59XG5cbi8qICAqL1xuXG52YXIgaG9va3MgPSB7IGluaXQ6IGluaXQsIHByZXBhdGNoOiBwcmVwYXRjaCwgaW5zZXJ0OiBpbnNlcnQsIGRlc3Ryb3k6IGRlc3Ryb3kgfTtcbnZhciBob29rc1RvTWVyZ2UgPSBPYmplY3Qua2V5cyhob29rcyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvbmVudCAoXG4gIEN0b3IsXG4gIGRhdGEsXG4gIGNvbnRleHQsXG4gIGNoaWxkcmVuLFxuICB0YWdcbikge1xuICBpZiAoIUN0b3IpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBiYXNlQ3RvciA9IGNvbnRleHQuJG9wdGlvbnMuX2Jhc2U7XG4gIGlmIChpc09iamVjdChDdG9yKSkge1xuICAgIEN0b3IgPSBiYXNlQ3Rvci5leHRlbmQoQ3Rvcik7XG4gIH1cblxuICBpZiAodHlwZW9mIEN0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgd2FybigoXCJJbnZhbGlkIENvbXBvbmVudCBkZWZpbml0aW9uOiBcIiArIChTdHJpbmcoQ3RvcikpKSwgY29udGV4dCk7XG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgLy8gYXN5bmMgY29tcG9uZW50XG4gIGlmICghQ3Rvci5jaWQpIHtcbiAgICBpZiAoQ3Rvci5yZXNvbHZlZCkge1xuICAgICAgQ3RvciA9IEN0b3IucmVzb2x2ZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIEN0b3IgPSByZXNvbHZlQXN5bmNDb21wb25lbnQoQ3RvciwgYmFzZUN0b3IsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gaXQncyBvayB0byBxdWV1ZSB0aGlzIG9uIGV2ZXJ5IHJlbmRlciBiZWNhdXNlXG4gICAgICAgIC8vICRmb3JjZVVwZGF0ZSBpcyBidWZmZXJlZCBieSB0aGUgc2NoZWR1bGVyLlxuICAgICAgICBjb250ZXh0LiRmb3JjZVVwZGF0ZSgpO1xuICAgICAgfSk7XG4gICAgICBpZiAoIUN0b3IpIHtcbiAgICAgICAgLy8gcmV0dXJuIG5vdGhpbmcgaWYgdGhpcyBpcyBpbmRlZWQgYW4gYXN5bmMgY29tcG9uZW50XG4gICAgICAgIC8vIHdhaXQgZm9yIHRoZSBjYWxsYmFjayB0byB0cmlnZ2VyIHBhcmVudCB1cGRhdGUuXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHJlc29sdmUgY29uc3RydWN0b3Igb3B0aW9ucyBpbiBjYXNlIGdsb2JhbCBtaXhpbnMgYXJlIGFwcGxpZWQgYWZ0ZXJcbiAgLy8gY29tcG9uZW50IGNvbnN0cnVjdG9yIGNyZWF0aW9uXG4gIHJlc29sdmVDb25zdHJ1Y3Rvck9wdGlvbnMoQ3Rvcik7XG5cbiAgZGF0YSA9IGRhdGEgfHwge307XG5cbiAgLy8gdHJhbnNmb3JtIGNvbXBvbmVudCB2LW1vZGVsIGRhdGEgaW50byBwcm9wcyAmIGV2ZW50c1xuICBpZiAoZGF0YS5tb2RlbCkge1xuICAgIHRyYW5zZm9ybU1vZGVsKEN0b3Iub3B0aW9ucywgZGF0YSk7XG4gIH1cblxuICAvLyBleHRyYWN0IHByb3BzXG4gIHZhciBwcm9wc0RhdGEgPSBleHRyYWN0UHJvcHMoZGF0YSwgQ3Rvcik7XG5cbiAgLy8gZnVuY3Rpb25hbCBjb21wb25lbnRcbiAgaWYgKEN0b3Iub3B0aW9ucy5mdW5jdGlvbmFsKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUZ1bmN0aW9uYWxDb21wb25lbnQoQ3RvciwgcHJvcHNEYXRhLCBkYXRhLCBjb250ZXh0LCBjaGlsZHJlbilcbiAgfVxuXG4gIC8vIGV4dHJhY3QgbGlzdGVuZXJzLCBzaW5jZSB0aGVzZSBuZWVkcyB0byBiZSB0cmVhdGVkIGFzXG4gIC8vIGNoaWxkIGNvbXBvbmVudCBsaXN0ZW5lcnMgaW5zdGVhZCBvZiBET00gbGlzdGVuZXJzXG4gIHZhciBsaXN0ZW5lcnMgPSBkYXRhLm9uO1xuICAvLyByZXBsYWNlIHdpdGggbGlzdGVuZXJzIHdpdGggLm5hdGl2ZSBtb2RpZmllclxuICBkYXRhLm9uID0gZGF0YS5uYXRpdmVPbjtcblxuICBpZiAoQ3Rvci5vcHRpb25zLmFic3RyYWN0KSB7XG4gICAgLy8gYWJzdHJhY3QgY29tcG9uZW50cyBkbyBub3Qga2VlcCBhbnl0aGluZ1xuICAgIC8vIG90aGVyIHRoYW4gcHJvcHMgJiBsaXN0ZW5lcnNcbiAgICBkYXRhID0ge307XG4gIH1cblxuICAvLyBtZXJnZSBjb21wb25lbnQgbWFuYWdlbWVudCBob29rcyBvbnRvIHRoZSBwbGFjZWhvbGRlciBub2RlXG4gIG1lcmdlSG9va3MoZGF0YSk7XG5cbiAgLy8gcmV0dXJuIGEgcGxhY2Vob2xkZXIgdm5vZGVcbiAgdmFyIG5hbWUgPSBDdG9yLm9wdGlvbnMubmFtZSB8fCB0YWc7XG4gIHZhciB2bm9kZSA9IG5ldyBWTm9kZShcbiAgICAoXCJ2dWUtY29tcG9uZW50LVwiICsgKEN0b3IuY2lkKSArIChuYW1lID8gKFwiLVwiICsgbmFtZSkgOiAnJykpLFxuICAgIGRhdGEsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNvbnRleHQsXG4gICAgeyBDdG9yOiBDdG9yLCBwcm9wc0RhdGE6IHByb3BzRGF0YSwgbGlzdGVuZXJzOiBsaXN0ZW5lcnMsIHRhZzogdGFnLCBjaGlsZHJlbjogY2hpbGRyZW4gfVxuICApO1xuICByZXR1cm4gdm5vZGVcbn1cblxuZnVuY3Rpb24gY3JlYXRlRnVuY3Rpb25hbENvbXBvbmVudCAoXG4gIEN0b3IsXG4gIHByb3BzRGF0YSxcbiAgZGF0YSxcbiAgY29udGV4dCxcbiAgY2hpbGRyZW5cbikge1xuICB2YXIgcHJvcHMgPSB7fTtcbiAgdmFyIHByb3BPcHRpb25zID0gQ3Rvci5vcHRpb25zLnByb3BzO1xuICBpZiAocHJvcE9wdGlvbnMpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gcHJvcE9wdGlvbnMpIHtcbiAgICAgIHByb3BzW2tleV0gPSB2YWxpZGF0ZVByb3Aoa2V5LCBwcm9wT3B0aW9ucywgcHJvcHNEYXRhKTtcbiAgICB9XG4gIH1cbiAgLy8gZW5zdXJlIHRoZSBjcmVhdGVFbGVtZW50IGZ1bmN0aW9uIGluIGZ1bmN0aW9uYWwgY29tcG9uZW50c1xuICAvLyBnZXRzIGEgdW5pcXVlIGNvbnRleHQgLSB0aGlzIGlzIG5lY2Vzc2FyeSBmb3IgY29ycmVjdCBuYW1lZCBzbG90IGNoZWNrXG4gIHZhciBfY29udGV4dCA9IE9iamVjdC5jcmVhdGUoY29udGV4dCk7XG4gIHZhciBoID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQpIHsgcmV0dXJuIGNyZWF0ZUVsZW1lbnQoX2NvbnRleHQsIGEsIGIsIGMsIGQsIHRydWUpOyB9O1xuICB2YXIgdm5vZGUgPSBDdG9yLm9wdGlvbnMucmVuZGVyLmNhbGwobnVsbCwgaCwge1xuICAgIHByb3BzOiBwcm9wcyxcbiAgICBkYXRhOiBkYXRhLFxuICAgIHBhcmVudDogY29udGV4dCxcbiAgICBjaGlsZHJlbjogY2hpbGRyZW4sXG4gICAgc2xvdHM6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlc29sdmVTbG90cyhjaGlsZHJlbiwgY29udGV4dCk7IH1cbiAgfSk7XG4gIGlmICh2bm9kZSBpbnN0YW5jZW9mIFZOb2RlKSB7XG4gICAgdm5vZGUuZnVuY3Rpb25hbENvbnRleHQgPSBjb250ZXh0O1xuICAgIGlmIChkYXRhLnNsb3QpIHtcbiAgICAgICh2bm9kZS5kYXRhIHx8ICh2bm9kZS5kYXRhID0ge30pKS5zbG90ID0gZGF0YS5zbG90O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdm5vZGVcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50SW5zdGFuY2VGb3JWbm9kZSAoXG4gIHZub2RlLCAvLyB3ZSBrbm93IGl0J3MgTW91bnRlZENvbXBvbmVudFZOb2RlIGJ1dCBmbG93IGRvZXNuJ3RcbiAgcGFyZW50LCAvLyBhY3RpdmVJbnN0YW5jZSBpbiBsaWZlY3ljbGUgc3RhdGVcbiAgcGFyZW50RWxtLFxuICByZWZFbG1cbikge1xuICB2YXIgdm5vZGVDb21wb25lbnRPcHRpb25zID0gdm5vZGUuY29tcG9uZW50T3B0aW9ucztcbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgX2lzQ29tcG9uZW50OiB0cnVlLFxuICAgIHBhcmVudDogcGFyZW50LFxuICAgIHByb3BzRGF0YTogdm5vZGVDb21wb25lbnRPcHRpb25zLnByb3BzRGF0YSxcbiAgICBfY29tcG9uZW50VGFnOiB2bm9kZUNvbXBvbmVudE9wdGlvbnMudGFnLFxuICAgIF9wYXJlbnRWbm9kZTogdm5vZGUsXG4gICAgX3BhcmVudExpc3RlbmVyczogdm5vZGVDb21wb25lbnRPcHRpb25zLmxpc3RlbmVycyxcbiAgICBfcmVuZGVyQ2hpbGRyZW46IHZub2RlQ29tcG9uZW50T3B0aW9ucy5jaGlsZHJlbixcbiAgICBfcGFyZW50RWxtOiBwYXJlbnRFbG0gfHwgbnVsbCxcbiAgICBfcmVmRWxtOiByZWZFbG0gfHwgbnVsbFxuICB9O1xuICAvLyBjaGVjayBpbmxpbmUtdGVtcGxhdGUgcmVuZGVyIGZ1bmN0aW9uc1xuICB2YXIgaW5saW5lVGVtcGxhdGUgPSB2bm9kZS5kYXRhLmlubGluZVRlbXBsYXRlO1xuICBpZiAoaW5saW5lVGVtcGxhdGUpIHtcbiAgICBvcHRpb25zLnJlbmRlciA9IGlubGluZVRlbXBsYXRlLnJlbmRlcjtcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IGlubGluZVRlbXBsYXRlLnN0YXRpY1JlbmRlckZucztcbiAgfVxuICByZXR1cm4gbmV3IHZub2RlQ29tcG9uZW50T3B0aW9ucy5DdG9yKG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIGluaXQgKFxuICB2bm9kZSxcbiAgaHlkcmF0aW5nLFxuICBwYXJlbnRFbG0sXG4gIHJlZkVsbVxuKSB7XG4gIGlmICghdm5vZGUuY29tcG9uZW50SW5zdGFuY2UgfHwgdm5vZGUuY29tcG9uZW50SW5zdGFuY2UuX2lzRGVzdHJveWVkKSB7XG4gICAgdmFyIGNoaWxkID0gdm5vZGUuY29tcG9uZW50SW5zdGFuY2UgPSBjcmVhdGVDb21wb25lbnRJbnN0YW5jZUZvclZub2RlKFxuICAgICAgdm5vZGUsXG4gICAgICBhY3RpdmVJbnN0YW5jZSxcbiAgICAgIHBhcmVudEVsbSxcbiAgICAgIHJlZkVsbVxuICAgICk7XG4gICAgY2hpbGQuJG1vdW50KGh5ZHJhdGluZyA/IHZub2RlLmVsbSA6IHVuZGVmaW5lZCwgaHlkcmF0aW5nKTtcbiAgfSBlbHNlIGlmICh2bm9kZS5kYXRhLmtlZXBBbGl2ZSkge1xuICAgIC8vIGtlcHQtYWxpdmUgY29tcG9uZW50cywgdHJlYXQgYXMgYSBwYXRjaFxuICAgIHZhciBtb3VudGVkTm9kZSA9IHZub2RlOyAvLyB3b3JrIGFyb3VuZCBmbG93XG4gICAgcHJlcGF0Y2gobW91bnRlZE5vZGUsIG1vdW50ZWROb2RlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcmVwYXRjaCAoXG4gIG9sZFZub2RlLFxuICB2bm9kZVxuKSB7XG4gIHZhciBvcHRpb25zID0gdm5vZGUuY29tcG9uZW50T3B0aW9ucztcbiAgdmFyIGNoaWxkID0gdm5vZGUuY29tcG9uZW50SW5zdGFuY2UgPSBvbGRWbm9kZS5jb21wb25lbnRJbnN0YW5jZTtcbiAgdXBkYXRlQ2hpbGRDb21wb25lbnQoXG4gICAgY2hpbGQsXG4gICAgb3B0aW9ucy5wcm9wc0RhdGEsIC8vIHVwZGF0ZWQgcHJvcHNcbiAgICBvcHRpb25zLmxpc3RlbmVycywgLy8gdXBkYXRlZCBsaXN0ZW5lcnNcbiAgICB2bm9kZSwgLy8gbmV3IHBhcmVudCB2bm9kZVxuICAgIG9wdGlvbnMuY2hpbGRyZW4gLy8gbmV3IGNoaWxkcmVuXG4gICk7XG59XG5cbmZ1bmN0aW9uIGluc2VydCAodm5vZGUpIHtcbiAgaWYgKCF2bm9kZS5jb21wb25lbnRJbnN0YW5jZS5faXNNb3VudGVkKSB7XG4gICAgdm5vZGUuY29tcG9uZW50SW5zdGFuY2UuX2lzTW91bnRlZCA9IHRydWU7XG4gICAgY2FsbEhvb2sodm5vZGUuY29tcG9uZW50SW5zdGFuY2UsICdtb3VudGVkJyk7XG4gIH1cbiAgaWYgKHZub2RlLmRhdGEua2VlcEFsaXZlKSB7XG4gICAgYWN0aXZhdGVDaGlsZENvbXBvbmVudCh2bm9kZS5jb21wb25lbnRJbnN0YW5jZSwgdHJ1ZSAvKiBkaXJlY3QgKi8pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3kgKHZub2RlKSB7XG4gIGlmICghdm5vZGUuY29tcG9uZW50SW5zdGFuY2UuX2lzRGVzdHJveWVkKSB7XG4gICAgaWYgKCF2bm9kZS5kYXRhLmtlZXBBbGl2ZSkge1xuICAgICAgdm5vZGUuY29tcG9uZW50SW5zdGFuY2UuJGRlc3Ryb3koKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVhY3RpdmF0ZUNoaWxkQ29tcG9uZW50KHZub2RlLmNvbXBvbmVudEluc3RhbmNlLCB0cnVlIC8qIGRpcmVjdCAqLyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlc29sdmVBc3luY0NvbXBvbmVudCAoXG4gIGZhY3RvcnksXG4gIGJhc2VDdG9yLFxuICBjYlxuKSB7XG4gIGlmIChmYWN0b3J5LnJlcXVlc3RlZCkge1xuICAgIC8vIHBvb2wgY2FsbGJhY2tzXG4gICAgZmFjdG9yeS5wZW5kaW5nQ2FsbGJhY2tzLnB1c2goY2IpO1xuICB9IGVsc2Uge1xuICAgIGZhY3RvcnkucmVxdWVzdGVkID0gdHJ1ZTtcbiAgICB2YXIgY2JzID0gZmFjdG9yeS5wZW5kaW5nQ2FsbGJhY2tzID0gW2NiXTtcbiAgICB2YXIgc3luYyA9IHRydWU7XG5cbiAgICB2YXIgcmVzb2x2ZSA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIGlmIChpc09iamVjdChyZXMpKSB7XG4gICAgICAgIHJlcyA9IGJhc2VDdG9yLmV4dGVuZChyZXMpO1xuICAgICAgfVxuICAgICAgLy8gY2FjaGUgcmVzb2x2ZWRcbiAgICAgIGZhY3RvcnkucmVzb2x2ZWQgPSByZXM7XG4gICAgICAvLyBpbnZva2UgY2FsbGJhY2tzIG9ubHkgaWYgdGhpcyBpcyBub3QgYSBzeW5jaHJvbm91cyByZXNvbHZlXG4gICAgICAvLyAoYXN5bmMgcmVzb2x2ZXMgYXJlIHNoaW1tZWQgYXMgc3luY2hyb25vdXMgZHVyaW5nIFNTUilcbiAgICAgIGlmICghc3luYykge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGNicy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBjYnNbaV0ocmVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgcmVqZWN0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiB3YXJuKFxuICAgICAgICBcIkZhaWxlZCB0byByZXNvbHZlIGFzeW5jIGNvbXBvbmVudDogXCIgKyAoU3RyaW5nKGZhY3RvcnkpKSArXG4gICAgICAgIChyZWFzb24gPyAoXCJcXG5SZWFzb246IFwiICsgcmVhc29uKSA6ICcnKVxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgdmFyIHJlcyA9IGZhY3RvcnkocmVzb2x2ZSwgcmVqZWN0KTtcblxuICAgIC8vIGhhbmRsZSBwcm9taXNlXG4gICAgaWYgKHJlcyAmJiB0eXBlb2YgcmVzLnRoZW4gPT09ICdmdW5jdGlvbicgJiYgIWZhY3RvcnkucmVzb2x2ZWQpIHtcbiAgICAgIHJlcy50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgfVxuXG4gICAgc3luYyA9IGZhbHNlO1xuICAgIC8vIHJldHVybiBpbiBjYXNlIHJlc29sdmVkIHN5bmNocm9ub3VzbHlcbiAgICByZXR1cm4gZmFjdG9yeS5yZXNvbHZlZFxuICB9XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RQcm9wcyAoZGF0YSwgQ3Rvcikge1xuICAvLyB3ZSBhcmUgb25seSBleHRyYWN0aW5nIHJhdyB2YWx1ZXMgaGVyZS5cbiAgLy8gdmFsaWRhdGlvbiBhbmQgZGVmYXVsdCB2YWx1ZXMgYXJlIGhhbmRsZWQgaW4gdGhlIGNoaWxkXG4gIC8vIGNvbXBvbmVudCBpdHNlbGYuXG4gIHZhciBwcm9wT3B0aW9ucyA9IEN0b3Iub3B0aW9ucy5wcm9wcztcbiAgaWYgKCFwcm9wT3B0aW9ucykge1xuICAgIHJldHVyblxuICB9XG4gIHZhciByZXMgPSB7fTtcbiAgdmFyIGF0dHJzID0gZGF0YS5hdHRycztcbiAgdmFyIHByb3BzID0gZGF0YS5wcm9wcztcbiAgdmFyIGRvbVByb3BzID0gZGF0YS5kb21Qcm9wcztcbiAgaWYgKGF0dHJzIHx8IHByb3BzIHx8IGRvbVByb3BzKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHByb3BPcHRpb25zKSB7XG4gICAgICB2YXIgYWx0S2V5ID0gaHlwaGVuYXRlKGtleSk7XG4gICAgICBjaGVja1Byb3AocmVzLCBwcm9wcywga2V5LCBhbHRLZXksIHRydWUpIHx8XG4gICAgICBjaGVja1Byb3AocmVzLCBhdHRycywga2V5LCBhbHRLZXkpIHx8XG4gICAgICBjaGVja1Byb3AocmVzLCBkb21Qcm9wcywga2V5LCBhbHRLZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGNoZWNrUHJvcCAoXG4gIHJlcyxcbiAgaGFzaCxcbiAga2V5LFxuICBhbHRLZXksXG4gIHByZXNlcnZlXG4pIHtcbiAgaWYgKGhhc2gpIHtcbiAgICBpZiAoaGFzT3duKGhhc2gsIGtleSkpIHtcbiAgICAgIHJlc1trZXldID0gaGFzaFtrZXldO1xuICAgICAgaWYgKCFwcmVzZXJ2ZSkge1xuICAgICAgICBkZWxldGUgaGFzaFtrZXldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2UgaWYgKGhhc093bihoYXNoLCBhbHRLZXkpKSB7XG4gICAgICByZXNba2V5XSA9IGhhc2hbYWx0S2V5XTtcbiAgICAgIGlmICghcHJlc2VydmUpIHtcbiAgICAgICAgZGVsZXRlIGhhc2hbYWx0S2V5XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5mdW5jdGlvbiBtZXJnZUhvb2tzIChkYXRhKSB7XG4gIGlmICghZGF0YS5ob29rKSB7XG4gICAgZGF0YS5ob29rID0ge307XG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBob29rc1RvTWVyZ2UubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0gaG9va3NUb01lcmdlW2ldO1xuICAgIHZhciBmcm9tUGFyZW50ID0gZGF0YS5ob29rW2tleV07XG4gICAgdmFyIG91cnMgPSBob29rc1trZXldO1xuICAgIGRhdGEuaG9va1trZXldID0gZnJvbVBhcmVudCA/IG1lcmdlSG9vayQxKG91cnMsIGZyb21QYXJlbnQpIDogb3VycztcbiAgfVxufVxuXG5mdW5jdGlvbiBtZXJnZUhvb2skMSAob25lLCB0d28pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjLCBkKSB7XG4gICAgb25lKGEsIGIsIGMsIGQpO1xuICAgIHR3byhhLCBiLCBjLCBkKTtcbiAgfVxufVxuXG4vLyB0cmFuc2Zvcm0gY29tcG9uZW50IHYtbW9kZWwgaW5mbyAodmFsdWUgYW5kIGNhbGxiYWNrKSBpbnRvXG4vLyBwcm9wIGFuZCBldmVudCBoYW5kbGVyIHJlc3BlY3RpdmVseS5cbmZ1bmN0aW9uIHRyYW5zZm9ybU1vZGVsIChvcHRpb25zLCBkYXRhKSB7XG4gIHZhciBwcm9wID0gKG9wdGlvbnMubW9kZWwgJiYgb3B0aW9ucy5tb2RlbC5wcm9wKSB8fCAndmFsdWUnO1xuICB2YXIgZXZlbnQgPSAob3B0aW9ucy5tb2RlbCAmJiBvcHRpb25zLm1vZGVsLmV2ZW50KSB8fCAnaW5wdXQnOyhkYXRhLnByb3BzIHx8IChkYXRhLnByb3BzID0ge30pKVtwcm9wXSA9IGRhdGEubW9kZWwudmFsdWU7XG4gIHZhciBvbiA9IGRhdGEub24gfHwgKGRhdGEub24gPSB7fSk7XG4gIGlmIChvbltldmVudF0pIHtcbiAgICBvbltldmVudF0gPSBbZGF0YS5tb2RlbC5jYWxsYmFja10uY29uY2F0KG9uW2V2ZW50XSk7XG4gIH0gZWxzZSB7XG4gICAgb25bZXZlbnRdID0gZGF0YS5tb2RlbC5jYWxsYmFjaztcbiAgfVxufVxuXG4vKiAgKi9cblxudmFyIFNJTVBMRV9OT1JNQUxJWkUgPSAxO1xudmFyIEFMV0FZU19OT1JNQUxJWkUgPSAyO1xuXG4vLyB3cmFwcGVyIGZ1bmN0aW9uIGZvciBwcm92aWRpbmcgYSBtb3JlIGZsZXhpYmxlIGludGVyZmFjZVxuLy8gd2l0aG91dCBnZXR0aW5nIHllbGxlZCBhdCBieSBmbG93XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50IChcbiAgY29udGV4dCxcbiAgdGFnLFxuICBkYXRhLFxuICBjaGlsZHJlbixcbiAgbm9ybWFsaXphdGlvblR5cGUsXG4gIGFsd2F5c05vcm1hbGl6ZVxuKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGRhdGEpIHx8IGlzUHJpbWl0aXZlKGRhdGEpKSB7XG4gICAgbm9ybWFsaXphdGlvblR5cGUgPSBjaGlsZHJlbjtcbiAgICBjaGlsZHJlbiA9IGRhdGE7XG4gICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgfVxuICBpZiAoYWx3YXlzTm9ybWFsaXplKSB7IG5vcm1hbGl6YXRpb25UeXBlID0gQUxXQVlTX05PUk1BTElaRTsgfVxuICByZXR1cm4gX2NyZWF0ZUVsZW1lbnQoY29udGV4dCwgdGFnLCBkYXRhLCBjaGlsZHJlbiwgbm9ybWFsaXphdGlvblR5cGUpXG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVFbGVtZW50IChcbiAgY29udGV4dCxcbiAgdGFnLFxuICBkYXRhLFxuICBjaGlsZHJlbixcbiAgbm9ybWFsaXphdGlvblR5cGVcbikge1xuICBpZiAoZGF0YSAmJiBkYXRhLl9fb2JfXykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgIFwiQXZvaWQgdXNpbmcgb2JzZXJ2ZWQgZGF0YSBvYmplY3QgYXMgdm5vZGUgZGF0YTogXCIgKyAoSlNPTi5zdHJpbmdpZnkoZGF0YSkpICsgXCJcXG5cIiArXG4gICAgICAnQWx3YXlzIGNyZWF0ZSBmcmVzaCB2bm9kZSBkYXRhIG9iamVjdHMgaW4gZWFjaCByZW5kZXIhJyxcbiAgICAgIGNvbnRleHRcbiAgICApO1xuICAgIHJldHVybiBjcmVhdGVFbXB0eVZOb2RlKClcbiAgfVxuICBpZiAoIXRhZykge1xuICAgIC8vIGluIGNhc2Ugb2YgY29tcG9uZW50IDppcyBzZXQgdG8gZmFsc3kgdmFsdWVcbiAgICByZXR1cm4gY3JlYXRlRW1wdHlWTm9kZSgpXG4gIH1cbiAgLy8gc3VwcG9ydCBzaW5nbGUgZnVuY3Rpb24gY2hpbGRyZW4gYXMgZGVmYXVsdCBzY29wZWQgc2xvdFxuICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikgJiZcbiAgICAgIHR5cGVvZiBjaGlsZHJlblswXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGRhdGEgPSBkYXRhIHx8IHt9O1xuICAgIGRhdGEuc2NvcGVkU2xvdHMgPSB7IGRlZmF1bHQ6IGNoaWxkcmVuWzBdIH07XG4gICAgY2hpbGRyZW4ubGVuZ3RoID0gMDtcbiAgfVxuICBpZiAobm9ybWFsaXphdGlvblR5cGUgPT09IEFMV0FZU19OT1JNQUxJWkUpIHtcbiAgICBjaGlsZHJlbiA9IG5vcm1hbGl6ZUNoaWxkcmVuKGNoaWxkcmVuKTtcbiAgfSBlbHNlIGlmIChub3JtYWxpemF0aW9uVHlwZSA9PT0gU0lNUExFX05PUk1BTElaRSkge1xuICAgIGNoaWxkcmVuID0gc2ltcGxlTm9ybWFsaXplQ2hpbGRyZW4oY2hpbGRyZW4pO1xuICB9XG4gIHZhciB2bm9kZSwgbnM7XG4gIGlmICh0eXBlb2YgdGFnID09PSAnc3RyaW5nJykge1xuICAgIHZhciBDdG9yO1xuICAgIG5zID0gY29uZmlnLmdldFRhZ05hbWVzcGFjZSh0YWcpO1xuICAgIGlmIChjb25maWcuaXNSZXNlcnZlZFRhZyh0YWcpKSB7XG4gICAgICAvLyBwbGF0Zm9ybSBidWlsdC1pbiBlbGVtZW50c1xuICAgICAgdm5vZGUgPSBuZXcgVk5vZGUoXG4gICAgICAgIGNvbmZpZy5wYXJzZVBsYXRmb3JtVGFnTmFtZSh0YWcpLCBkYXRhLCBjaGlsZHJlbixcbiAgICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGNvbnRleHRcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmICgoQ3RvciA9IHJlc29sdmVBc3NldChjb250ZXh0LiRvcHRpb25zLCAnY29tcG9uZW50cycsIHRhZykpKSB7XG4gICAgICAvLyBjb21wb25lbnRcbiAgICAgIHZub2RlID0gY3JlYXRlQ29tcG9uZW50KEN0b3IsIGRhdGEsIGNvbnRleHQsIGNoaWxkcmVuLCB0YWcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB1bmtub3duIG9yIHVubGlzdGVkIG5hbWVzcGFjZWQgZWxlbWVudHNcbiAgICAgIC8vIGNoZWNrIGF0IHJ1bnRpbWUgYmVjYXVzZSBpdCBtYXkgZ2V0IGFzc2lnbmVkIGEgbmFtZXNwYWNlIHdoZW4gaXRzXG4gICAgICAvLyBwYXJlbnQgbm9ybWFsaXplcyBjaGlsZHJlblxuICAgICAgdm5vZGUgPSBuZXcgVk5vZGUoXG4gICAgICAgIHRhZywgZGF0YSwgY2hpbGRyZW4sXG4gICAgICAgIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBjb250ZXh0XG4gICAgICApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBkaXJlY3QgY29tcG9uZW50IG9wdGlvbnMgLyBjb25zdHJ1Y3RvclxuICAgIHZub2RlID0gY3JlYXRlQ29tcG9uZW50KHRhZywgZGF0YSwgY29udGV4dCwgY2hpbGRyZW4pO1xuICB9XG4gIGlmICh2bm9kZSkge1xuICAgIGlmIChucykgeyBhcHBseU5TKHZub2RlLCBucyk7IH1cbiAgICByZXR1cm4gdm5vZGVcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY3JlYXRlRW1wdHlWTm9kZSgpXG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlOUyAodm5vZGUsIG5zKSB7XG4gIHZub2RlLm5zID0gbnM7XG4gIGlmICh2bm9kZS50YWcgPT09ICdmb3JlaWduT2JqZWN0Jykge1xuICAgIC8vIHVzZSBkZWZhdWx0IG5hbWVzcGFjZSBpbnNpZGUgZm9yZWlnbk9iamVjdFxuICAgIHJldHVyblxuICB9XG4gIGlmICh2bm9kZS5jaGlsZHJlbikge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gdm5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB2YXIgY2hpbGQgPSB2bm9kZS5jaGlsZHJlbltpXTtcbiAgICAgIGlmIChjaGlsZC50YWcgJiYgIWNoaWxkLm5zKSB7XG4gICAgICAgIGFwcGx5TlMoY2hpbGQsIG5zKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyogICovXG5cbi8qKlxuICogUnVudGltZSBoZWxwZXIgZm9yIHJlbmRlcmluZyB2LWZvciBsaXN0cy5cbiAqL1xuZnVuY3Rpb24gcmVuZGVyTGlzdCAoXG4gIHZhbCxcbiAgcmVuZGVyXG4pIHtcbiAgdmFyIHJldCwgaSwgbCwga2V5cywga2V5O1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpIHx8IHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0ID0gbmV3IEFycmF5KHZhbC5sZW5ndGgpO1xuICAgIGZvciAoaSA9IDAsIGwgPSB2YWwubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICByZXRbaV0gPSByZW5kZXIodmFsW2ldLCBpKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICByZXQgPSBuZXcgQXJyYXkodmFsKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdmFsOyBpKyspIHtcbiAgICAgIHJldFtpXSA9IHJlbmRlcihpICsgMSwgaSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbCkpIHtcbiAgICBrZXlzID0gT2JqZWN0LmtleXModmFsKTtcbiAgICByZXQgPSBuZXcgQXJyYXkoa2V5cy5sZW5ndGgpO1xuICAgIGZvciAoaSA9IDAsIGwgPSBrZXlzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgIHJldFtpXSA9IHJlbmRlcih2YWxba2V5XSwga2V5LCBpKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG4vKiAgKi9cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3IgcmVuZGVyaW5nIDxzbG90PlxuICovXG5mdW5jdGlvbiByZW5kZXJTbG90IChcbiAgbmFtZSxcbiAgZmFsbGJhY2ssXG4gIHByb3BzLFxuICBiaW5kT2JqZWN0XG4pIHtcbiAgdmFyIHNjb3BlZFNsb3RGbiA9IHRoaXMuJHNjb3BlZFNsb3RzW25hbWVdO1xuICBpZiAoc2NvcGVkU2xvdEZuKSB7IC8vIHNjb3BlZCBzbG90XG4gICAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcbiAgICBpZiAoYmluZE9iamVjdCkge1xuICAgICAgZXh0ZW5kKHByb3BzLCBiaW5kT2JqZWN0KTtcbiAgICB9XG4gICAgcmV0dXJuIHNjb3BlZFNsb3RGbihwcm9wcykgfHwgZmFsbGJhY2tcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xvdE5vZGVzID0gdGhpcy4kc2xvdHNbbmFtZV07XG4gICAgLy8gd2FybiBkdXBsaWNhdGUgc2xvdCB1c2FnZVxuICAgIGlmIChzbG90Tm9kZXMgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgc2xvdE5vZGVzLl9yZW5kZXJlZCAmJiB3YXJuKFxuICAgICAgICBcIkR1cGxpY2F0ZSBwcmVzZW5jZSBvZiBzbG90IFxcXCJcIiArIG5hbWUgKyBcIlxcXCIgZm91bmQgaW4gdGhlIHNhbWUgcmVuZGVyIHRyZWUgXCIgK1xuICAgICAgICBcIi0gdGhpcyB3aWxsIGxpa2VseSBjYXVzZSByZW5kZXIgZXJyb3JzLlwiLFxuICAgICAgICB0aGlzXG4gICAgICApO1xuICAgICAgc2xvdE5vZGVzLl9yZW5kZXJlZCA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzbG90Tm9kZXMgfHwgZmFsbGJhY2tcbiAgfVxufVxuXG4vKiAgKi9cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3IgcmVzb2x2aW5nIGZpbHRlcnNcbiAqL1xuZnVuY3Rpb24gcmVzb2x2ZUZpbHRlciAoaWQpIHtcbiAgcmV0dXJuIHJlc29sdmVBc3NldCh0aGlzLiRvcHRpb25zLCAnZmlsdGVycycsIGlkLCB0cnVlKSB8fCBpZGVudGl0eVxufVxuXG4vKiAgKi9cblxuLyoqXG4gKiBSdW50aW1lIGhlbHBlciBmb3IgY2hlY2tpbmcga2V5Q29kZXMgZnJvbSBjb25maWcuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrS2V5Q29kZXMgKFxuICBldmVudEtleUNvZGUsXG4gIGtleSxcbiAgYnVpbHRJbkFsaWFzXG4pIHtcbiAgdmFyIGtleUNvZGVzID0gY29uZmlnLmtleUNvZGVzW2tleV0gfHwgYnVpbHRJbkFsaWFzO1xuICBpZiAoQXJyYXkuaXNBcnJheShrZXlDb2RlcykpIHtcbiAgICByZXR1cm4ga2V5Q29kZXMuaW5kZXhPZihldmVudEtleUNvZGUpID09PSAtMVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBrZXlDb2RlcyAhPT0gZXZlbnRLZXlDb2RlXG4gIH1cbn1cblxuLyogICovXG5cbi8qKlxuICogUnVudGltZSBoZWxwZXIgZm9yIG1lcmdpbmcgdi1iaW5kPVwib2JqZWN0XCIgaW50byBhIFZOb2RlJ3MgZGF0YS5cbiAqL1xuZnVuY3Rpb24gYmluZE9iamVjdFByb3BzIChcbiAgZGF0YSxcbiAgdGFnLFxuICB2YWx1ZSxcbiAgYXNQcm9wXG4pIHtcbiAgaWYgKHZhbHVlKSB7XG4gICAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgJ3YtYmluZCB3aXRob3V0IGFyZ3VtZW50IGV4cGVjdHMgYW4gT2JqZWN0IG9yIEFycmF5IHZhbHVlJyxcbiAgICAgICAgdGhpc1xuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gdG9PYmplY3QodmFsdWUpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgICAgIGlmIChrZXkgPT09ICdjbGFzcycgfHwga2V5ID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgZGF0YVtrZXldID0gdmFsdWVba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgdHlwZSA9IGRhdGEuYXR0cnMgJiYgZGF0YS5hdHRycy50eXBlO1xuICAgICAgICAgIHZhciBoYXNoID0gYXNQcm9wIHx8IGNvbmZpZy5tdXN0VXNlUHJvcCh0YWcsIHR5cGUsIGtleSlcbiAgICAgICAgICAgID8gZGF0YS5kb21Qcm9wcyB8fCAoZGF0YS5kb21Qcm9wcyA9IHt9KVxuICAgICAgICAgICAgOiBkYXRhLmF0dHJzIHx8IChkYXRhLmF0dHJzID0ge30pO1xuICAgICAgICAgIGhhc2hba2V5XSA9IHZhbHVlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRhdGFcbn1cblxuLyogICovXG5cbi8qKlxuICogUnVudGltZSBoZWxwZXIgZm9yIHJlbmRlcmluZyBzdGF0aWMgdHJlZXMuXG4gKi9cbmZ1bmN0aW9uIHJlbmRlclN0YXRpYyAoXG4gIGluZGV4LFxuICBpc0luRm9yXG4pIHtcbiAgdmFyIHRyZWUgPSB0aGlzLl9zdGF0aWNUcmVlc1tpbmRleF07XG4gIC8vIGlmIGhhcyBhbHJlYWR5LXJlbmRlcmVkIHN0YXRpYyB0cmVlIGFuZCBub3QgaW5zaWRlIHYtZm9yLFxuICAvLyB3ZSBjYW4gcmV1c2UgdGhlIHNhbWUgdHJlZSBieSBkb2luZyBhIHNoYWxsb3cgY2xvbmUuXG4gIGlmICh0cmVlICYmICFpc0luRm9yKSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkodHJlZSlcbiAgICAgID8gY2xvbmVWTm9kZXModHJlZSlcbiAgICAgIDogY2xvbmVWTm9kZSh0cmVlKVxuICB9XG4gIC8vIG90aGVyd2lzZSwgcmVuZGVyIGEgZnJlc2ggdHJlZS5cbiAgdHJlZSA9IHRoaXMuX3N0YXRpY1RyZWVzW2luZGV4XSA9XG4gICAgdGhpcy4kb3B0aW9ucy5zdGF0aWNSZW5kZXJGbnNbaW5kZXhdLmNhbGwodGhpcy5fcmVuZGVyUHJveHkpO1xuICBtYXJrU3RhdGljKHRyZWUsIChcIl9fc3RhdGljX19cIiArIGluZGV4KSwgZmFsc2UpO1xuICByZXR1cm4gdHJlZVxufVxuXG4vKipcbiAqIFJ1bnRpbWUgaGVscGVyIGZvciB2LW9uY2UuXG4gKiBFZmZlY3RpdmVseSBpdCBtZWFucyBtYXJraW5nIHRoZSBub2RlIGFzIHN0YXRpYyB3aXRoIGEgdW5pcXVlIGtleS5cbiAqL1xuZnVuY3Rpb24gbWFya09uY2UgKFxuICB0cmVlLFxuICBpbmRleCxcbiAga2V5XG4pIHtcbiAgbWFya1N0YXRpYyh0cmVlLCAoXCJfX29uY2VfX1wiICsgaW5kZXggKyAoa2V5ID8gKFwiX1wiICsga2V5KSA6IFwiXCIpKSwgdHJ1ZSk7XG4gIHJldHVybiB0cmVlXG59XG5cbmZ1bmN0aW9uIG1hcmtTdGF0aWMgKFxuICB0cmVlLFxuICBrZXksXG4gIGlzT25jZVxuKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHRyZWUpKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAodHJlZVtpXSAmJiB0eXBlb2YgdHJlZVtpXSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgbWFya1N0YXRpY05vZGUodHJlZVtpXSwgKGtleSArIFwiX1wiICsgaSksIGlzT25jZSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIG1hcmtTdGF0aWNOb2RlKHRyZWUsIGtleSwgaXNPbmNlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBtYXJrU3RhdGljTm9kZSAobm9kZSwga2V5LCBpc09uY2UpIHtcbiAgbm9kZS5pc1N0YXRpYyA9IHRydWU7XG4gIG5vZGUua2V5ID0ga2V5O1xuICBub2RlLmlzT25jZSA9IGlzT25jZTtcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGluaXRSZW5kZXIgKHZtKSB7XG4gIHZtLiR2bm9kZSA9IG51bGw7IC8vIHRoZSBwbGFjZWhvbGRlciBub2RlIGluIHBhcmVudCB0cmVlXG4gIHZtLl92bm9kZSA9IG51bGw7IC8vIHRoZSByb290IG9mIHRoZSBjaGlsZCB0cmVlXG4gIHZtLl9zdGF0aWNUcmVlcyA9IG51bGw7XG4gIHZhciBwYXJlbnRWbm9kZSA9IHZtLiRvcHRpb25zLl9wYXJlbnRWbm9kZTtcbiAgdmFyIHJlbmRlckNvbnRleHQgPSBwYXJlbnRWbm9kZSAmJiBwYXJlbnRWbm9kZS5jb250ZXh0O1xuICB2bS4kc2xvdHMgPSByZXNvbHZlU2xvdHModm0uJG9wdGlvbnMuX3JlbmRlckNoaWxkcmVuLCByZW5kZXJDb250ZXh0KTtcbiAgdm0uJHNjb3BlZFNsb3RzID0gZW1wdHlPYmplY3Q7XG4gIC8vIGJpbmQgdGhlIGNyZWF0ZUVsZW1lbnQgZm4gdG8gdGhpcyBpbnN0YW5jZVxuICAvLyBzbyB0aGF0IHdlIGdldCBwcm9wZXIgcmVuZGVyIGNvbnRleHQgaW5zaWRlIGl0LlxuICAvLyBhcmdzIG9yZGVyOiB0YWcsIGRhdGEsIGNoaWxkcmVuLCBub3JtYWxpemF0aW9uVHlwZSwgYWx3YXlzTm9ybWFsaXplXG4gIC8vIGludGVybmFsIHZlcnNpb24gaXMgdXNlZCBieSByZW5kZXIgZnVuY3Rpb25zIGNvbXBpbGVkIGZyb20gdGVtcGxhdGVzXG4gIHZtLl9jID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQpIHsgcmV0dXJuIGNyZWF0ZUVsZW1lbnQodm0sIGEsIGIsIGMsIGQsIGZhbHNlKTsgfTtcbiAgLy8gbm9ybWFsaXphdGlvbiBpcyBhbHdheXMgYXBwbGllZCBmb3IgdGhlIHB1YmxpYyB2ZXJzaW9uLCB1c2VkIGluXG4gIC8vIHVzZXItd3JpdHRlbiByZW5kZXIgZnVuY3Rpb25zLlxuICB2bS4kY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uIChhLCBiLCBjLCBkKSB7IHJldHVybiBjcmVhdGVFbGVtZW50KHZtLCBhLCBiLCBjLCBkLCB0cnVlKTsgfTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyTWl4aW4gKFZ1ZSkge1xuICBWdWUucHJvdG90eXBlLiRuZXh0VGljayA9IGZ1bmN0aW9uIChmbikge1xuICAgIHJldHVybiBuZXh0VGljayhmbiwgdGhpcylcbiAgfTtcblxuICBWdWUucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICB2YXIgcmVmID0gdm0uJG9wdGlvbnM7XG4gICAgdmFyIHJlbmRlciA9IHJlZi5yZW5kZXI7XG4gICAgdmFyIHN0YXRpY1JlbmRlckZucyA9IHJlZi5zdGF0aWNSZW5kZXJGbnM7XG4gICAgdmFyIF9wYXJlbnRWbm9kZSA9IHJlZi5fcGFyZW50Vm5vZGU7XG5cbiAgICBpZiAodm0uX2lzTW91bnRlZCkge1xuICAgICAgLy8gY2xvbmUgc2xvdCBub2RlcyBvbiByZS1yZW5kZXJzXG4gICAgICBmb3IgKHZhciBrZXkgaW4gdm0uJHNsb3RzKSB7XG4gICAgICAgIHZtLiRzbG90c1trZXldID0gY2xvbmVWTm9kZXModm0uJHNsb3RzW2tleV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZtLiRzY29wZWRTbG90cyA9IChfcGFyZW50Vm5vZGUgJiYgX3BhcmVudFZub2RlLmRhdGEuc2NvcGVkU2xvdHMpIHx8IGVtcHR5T2JqZWN0O1xuXG4gICAgaWYgKHN0YXRpY1JlbmRlckZucyAmJiAhdm0uX3N0YXRpY1RyZWVzKSB7XG4gICAgICB2bS5fc3RhdGljVHJlZXMgPSBbXTtcbiAgICB9XG4gICAgLy8gc2V0IHBhcmVudCB2bm9kZS4gdGhpcyBhbGxvd3MgcmVuZGVyIGZ1bmN0aW9ucyB0byBoYXZlIGFjY2Vzc1xuICAgIC8vIHRvIHRoZSBkYXRhIG9uIHRoZSBwbGFjZWhvbGRlciBub2RlLlxuICAgIHZtLiR2bm9kZSA9IF9wYXJlbnRWbm9kZTtcbiAgICAvLyByZW5kZXIgc2VsZlxuICAgIHZhciB2bm9kZTtcbiAgICB0cnkge1xuICAgICAgdm5vZGUgPSByZW5kZXIuY2FsbCh2bS5fcmVuZGVyUHJveHksIHZtLiRjcmVhdGVFbGVtZW50KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBoYW5kbGVFcnJvcihlLCB2bSwgXCJyZW5kZXIgZnVuY3Rpb25cIik7XG4gICAgICAvLyByZXR1cm4gZXJyb3IgcmVuZGVyIHJlc3VsdCxcbiAgICAgIC8vIG9yIHByZXZpb3VzIHZub2RlIHRvIHByZXZlbnQgcmVuZGVyIGVycm9yIGNhdXNpbmcgYmxhbmsgY29tcG9uZW50XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgdm5vZGUgPSB2bS4kb3B0aW9ucy5yZW5kZXJFcnJvclxuICAgICAgICAgID8gdm0uJG9wdGlvbnMucmVuZGVyRXJyb3IuY2FsbCh2bS5fcmVuZGVyUHJveHksIHZtLiRjcmVhdGVFbGVtZW50LCBlKVxuICAgICAgICAgIDogdm0uX3Zub2RlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdm5vZGUgPSB2bS5fdm5vZGU7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHJldHVybiBlbXB0eSB2bm9kZSBpbiBjYXNlIHRoZSByZW5kZXIgZnVuY3Rpb24gZXJyb3JlZCBvdXRcbiAgICBpZiAoISh2bm9kZSBpbnN0YW5jZW9mIFZOb2RlKSkge1xuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgQXJyYXkuaXNBcnJheSh2bm9kZSkpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICAnTXVsdGlwbGUgcm9vdCBub2RlcyByZXR1cm5lZCBmcm9tIHJlbmRlciBmdW5jdGlvbi4gUmVuZGVyIGZ1bmN0aW9uICcgK1xuICAgICAgICAgICdzaG91bGQgcmV0dXJuIGEgc2luZ2xlIHJvb3Qgbm9kZS4nLFxuICAgICAgICAgIHZtXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB2bm9kZSA9IGNyZWF0ZUVtcHR5Vk5vZGUoKTtcbiAgICB9XG4gICAgLy8gc2V0IHBhcmVudFxuICAgIHZub2RlLnBhcmVudCA9IF9wYXJlbnRWbm9kZTtcbiAgICByZXR1cm4gdm5vZGVcbiAgfTtcblxuICAvLyBpbnRlcm5hbCByZW5kZXIgaGVscGVycy5cbiAgLy8gdGhlc2UgYXJlIGV4cG9zZWQgb24gdGhlIGluc3RhbmNlIHByb3RvdHlwZSB0byByZWR1Y2UgZ2VuZXJhdGVkIHJlbmRlclxuICAvLyBjb2RlIHNpemUuXG4gIFZ1ZS5wcm90b3R5cGUuX28gPSBtYXJrT25jZTtcbiAgVnVlLnByb3RvdHlwZS5fbiA9IHRvTnVtYmVyO1xuICBWdWUucHJvdG90eXBlLl9zID0gX3RvU3RyaW5nO1xuICBWdWUucHJvdG90eXBlLl9sID0gcmVuZGVyTGlzdDtcbiAgVnVlLnByb3RvdHlwZS5fdCA9IHJlbmRlclNsb3Q7XG4gIFZ1ZS5wcm90b3R5cGUuX3EgPSBsb29zZUVxdWFsO1xuICBWdWUucHJvdG90eXBlLl9pID0gbG9vc2VJbmRleE9mO1xuICBWdWUucHJvdG90eXBlLl9tID0gcmVuZGVyU3RhdGljO1xuICBWdWUucHJvdG90eXBlLl9mID0gcmVzb2x2ZUZpbHRlcjtcbiAgVnVlLnByb3RvdHlwZS5fayA9IGNoZWNrS2V5Q29kZXM7XG4gIFZ1ZS5wcm90b3R5cGUuX2IgPSBiaW5kT2JqZWN0UHJvcHM7XG4gIFZ1ZS5wcm90b3R5cGUuX3YgPSBjcmVhdGVUZXh0Vk5vZGU7XG4gIFZ1ZS5wcm90b3R5cGUuX2UgPSBjcmVhdGVFbXB0eVZOb2RlO1xuICBWdWUucHJvdG90eXBlLl91ID0gcmVzb2x2ZVNjb3BlZFNsb3RzO1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdEluamVjdGlvbnMgKHZtKSB7XG4gIHZhciBwcm92aWRlID0gdm0uJG9wdGlvbnMucHJvdmlkZTtcbiAgdmFyIGluamVjdCA9IHZtLiRvcHRpb25zLmluamVjdDtcbiAgaWYgKHByb3ZpZGUpIHtcbiAgICB2bS5fcHJvdmlkZWQgPSB0eXBlb2YgcHJvdmlkZSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgPyBwcm92aWRlLmNhbGwodm0pXG4gICAgICA6IHByb3ZpZGU7XG4gIH1cbiAgaWYgKGluamVjdCkge1xuICAgIC8vIGluamVjdCBpcyA6YW55IGJlY2F1c2UgZmxvdyBpcyBub3Qgc21hcnQgZW5vdWdoIHRvIGZpZ3VyZSBvdXQgY2FjaGVkXG4gICAgLy8gaXNBcnJheSBoZXJlXG4gICAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5KGluamVjdCk7XG4gICAgdmFyIGtleXMgPSBpc0FycmF5XG4gICAgICA/IGluamVjdFxuICAgICAgOiBoYXNTeW1ib2xcbiAgICAgICAgPyBSZWZsZWN0Lm93bktleXMoaW5qZWN0KVxuICAgICAgICA6IE9iamVjdC5rZXlzKGluamVjdCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgdmFyIHByb3ZpZGVLZXkgPSBpc0FycmF5ID8ga2V5IDogaW5qZWN0W2tleV07XG4gICAgICB2YXIgc291cmNlID0gdm07XG4gICAgICB3aGlsZSAoc291cmNlKSB7XG4gICAgICAgIGlmIChzb3VyY2UuX3Byb3ZpZGVkICYmIHNvdXJjZS5fcHJvdmlkZWRbcHJvdmlkZUtleV0pIHtcbiAgICAgICAgICB2bVtrZXldID0gc291cmNlLl9wcm92aWRlZFtwcm92aWRlS2V5XTtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIHNvdXJjZSA9IHNvdXJjZS4kcGFyZW50O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKiAgKi9cblxudmFyIHVpZCA9IDA7XG5cbmZ1bmN0aW9uIGluaXRNaXhpbiAoVnVlKSB7XG4gIFZ1ZS5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGNvbmZpZy5wZXJmb3JtYW5jZSAmJiBwZXJmKSB7XG4gICAgICBwZXJmLm1hcmsoJ2luaXQnKTtcbiAgICB9XG5cbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIC8vIGEgdWlkXG4gICAgdm0uX3VpZCA9IHVpZCsrO1xuICAgIC8vIGEgZmxhZyB0byBhdm9pZCB0aGlzIGJlaW5nIG9ic2VydmVkXG4gICAgdm0uX2lzVnVlID0gdHJ1ZTtcbiAgICAvLyBtZXJnZSBvcHRpb25zXG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5faXNDb21wb25lbnQpIHtcbiAgICAgIC8vIG9wdGltaXplIGludGVybmFsIGNvbXBvbmVudCBpbnN0YW50aWF0aW9uXG4gICAgICAvLyBzaW5jZSBkeW5hbWljIG9wdGlvbnMgbWVyZ2luZyBpcyBwcmV0dHkgc2xvdywgYW5kIG5vbmUgb2YgdGhlXG4gICAgICAvLyBpbnRlcm5hbCBjb21wb25lbnQgb3B0aW9ucyBuZWVkcyBzcGVjaWFsIHRyZWF0bWVudC5cbiAgICAgIGluaXRJbnRlcm5hbENvbXBvbmVudCh2bSwgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZtLiRvcHRpb25zID0gbWVyZ2VPcHRpb25zKFxuICAgICAgICByZXNvbHZlQ29uc3RydWN0b3JPcHRpb25zKHZtLmNvbnN0cnVjdG9yKSxcbiAgICAgICAgb3B0aW9ucyB8fCB7fSxcbiAgICAgICAgdm1cbiAgICAgICk7XG4gICAgfVxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGluaXRQcm94eSh2bSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZtLl9yZW5kZXJQcm94eSA9IHZtO1xuICAgIH1cbiAgICAvLyBleHBvc2UgcmVhbCBzZWxmXG4gICAgdm0uX3NlbGYgPSB2bTtcbiAgICBpbml0TGlmZWN5Y2xlKHZtKTtcbiAgICBpbml0RXZlbnRzKHZtKTtcbiAgICBpbml0UmVuZGVyKHZtKTtcbiAgICBjYWxsSG9vayh2bSwgJ2JlZm9yZUNyZWF0ZScpO1xuICAgIGluaXRTdGF0ZSh2bSk7XG4gICAgaW5pdEluamVjdGlvbnModm0pO1xuICAgIGNhbGxIb29rKHZtLCAnY3JlYXRlZCcpO1xuXG4gICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgY29uZmlnLnBlcmZvcm1hbmNlICYmIHBlcmYpIHtcbiAgICAgIHZtLl9uYW1lID0gZm9ybWF0Q29tcG9uZW50TmFtZSh2bSwgZmFsc2UpO1xuICAgICAgcGVyZi5tYXJrKCdpbml0IGVuZCcpO1xuICAgICAgcGVyZi5tZWFzdXJlKCgodm0uX25hbWUpICsgXCIgaW5pdFwiKSwgJ2luaXQnLCAnaW5pdCBlbmQnKTtcbiAgICB9XG5cbiAgICBpZiAodm0uJG9wdGlvbnMuZWwpIHtcbiAgICAgIHZtLiRtb3VudCh2bS4kb3B0aW9ucy5lbCk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBpbml0SW50ZXJuYWxDb21wb25lbnQgKHZtLCBvcHRpb25zKSB7XG4gIHZhciBvcHRzID0gdm0uJG9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKHZtLmNvbnN0cnVjdG9yLm9wdGlvbnMpO1xuICAvLyBkb2luZyB0aGlzIGJlY2F1c2UgaXQncyBmYXN0ZXIgdGhhbiBkeW5hbWljIGVudW1lcmF0aW9uLlxuICBvcHRzLnBhcmVudCA9IG9wdGlvbnMucGFyZW50O1xuICBvcHRzLnByb3BzRGF0YSA9IG9wdGlvbnMucHJvcHNEYXRhO1xuICBvcHRzLl9wYXJlbnRWbm9kZSA9IG9wdGlvbnMuX3BhcmVudFZub2RlO1xuICBvcHRzLl9wYXJlbnRMaXN0ZW5lcnMgPSBvcHRpb25zLl9wYXJlbnRMaXN0ZW5lcnM7XG4gIG9wdHMuX3JlbmRlckNoaWxkcmVuID0gb3B0aW9ucy5fcmVuZGVyQ2hpbGRyZW47XG4gIG9wdHMuX2NvbXBvbmVudFRhZyA9IG9wdGlvbnMuX2NvbXBvbmVudFRhZztcbiAgb3B0cy5fcGFyZW50RWxtID0gb3B0aW9ucy5fcGFyZW50RWxtO1xuICBvcHRzLl9yZWZFbG0gPSBvcHRpb25zLl9yZWZFbG07XG4gIGlmIChvcHRpb25zLnJlbmRlcikge1xuICAgIG9wdHMucmVuZGVyID0gb3B0aW9ucy5yZW5kZXI7XG4gICAgb3B0cy5zdGF0aWNSZW5kZXJGbnMgPSBvcHRpb25zLnN0YXRpY1JlbmRlckZucztcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlQ29uc3RydWN0b3JPcHRpb25zIChDdG9yKSB7XG4gIHZhciBvcHRpb25zID0gQ3Rvci5vcHRpb25zO1xuICBpZiAoQ3Rvci5zdXBlcikge1xuICAgIHZhciBzdXBlck9wdGlvbnMgPSByZXNvbHZlQ29uc3RydWN0b3JPcHRpb25zKEN0b3Iuc3VwZXIpO1xuICAgIHZhciBjYWNoZWRTdXBlck9wdGlvbnMgPSBDdG9yLnN1cGVyT3B0aW9ucztcbiAgICBpZiAoc3VwZXJPcHRpb25zICE9PSBjYWNoZWRTdXBlck9wdGlvbnMpIHtcbiAgICAgIC8vIHN1cGVyIG9wdGlvbiBjaGFuZ2VkLFxuICAgICAgLy8gbmVlZCB0byByZXNvbHZlIG5ldyBvcHRpb25zLlxuICAgICAgQ3Rvci5zdXBlck9wdGlvbnMgPSBzdXBlck9wdGlvbnM7XG4gICAgICAvLyBjaGVjayBpZiB0aGVyZSBhcmUgYW55IGxhdGUtbW9kaWZpZWQvYXR0YWNoZWQgb3B0aW9ucyAoIzQ5NzYpXG4gICAgICB2YXIgbW9kaWZpZWRPcHRpb25zID0gcmVzb2x2ZU1vZGlmaWVkT3B0aW9ucyhDdG9yKTtcbiAgICAgIC8vIHVwZGF0ZSBiYXNlIGV4dGVuZCBvcHRpb25zXG4gICAgICBpZiAobW9kaWZpZWRPcHRpb25zKSB7XG4gICAgICAgIGV4dGVuZChDdG9yLmV4dGVuZE9wdGlvbnMsIG1vZGlmaWVkT3B0aW9ucyk7XG4gICAgICB9XG4gICAgICBvcHRpb25zID0gQ3Rvci5vcHRpb25zID0gbWVyZ2VPcHRpb25zKHN1cGVyT3B0aW9ucywgQ3Rvci5leHRlbmRPcHRpb25zKTtcbiAgICAgIGlmIChvcHRpb25zLm5hbWUpIHtcbiAgICAgICAgb3B0aW9ucy5jb21wb25lbnRzW29wdGlvbnMubmFtZV0gPSBDdG9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gb3B0aW9uc1xufVxuXG5mdW5jdGlvbiByZXNvbHZlTW9kaWZpZWRPcHRpb25zIChDdG9yKSB7XG4gIHZhciBtb2RpZmllZDtcbiAgdmFyIGxhdGVzdCA9IEN0b3Iub3B0aW9ucztcbiAgdmFyIHNlYWxlZCA9IEN0b3Iuc2VhbGVkT3B0aW9ucztcbiAgZm9yICh2YXIga2V5IGluIGxhdGVzdCkge1xuICAgIGlmIChsYXRlc3Rba2V5XSAhPT0gc2VhbGVkW2tleV0pIHtcbiAgICAgIGlmICghbW9kaWZpZWQpIHsgbW9kaWZpZWQgPSB7fTsgfVxuICAgICAgbW9kaWZpZWRba2V5XSA9IGRlZHVwZShsYXRlc3Rba2V5XSwgc2VhbGVkW2tleV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbW9kaWZpZWRcbn1cblxuZnVuY3Rpb24gZGVkdXBlIChsYXRlc3QsIHNlYWxlZCkge1xuICAvLyBjb21wYXJlIGxhdGVzdCBhbmQgc2VhbGVkIHRvIGVuc3VyZSBsaWZlY3ljbGUgaG9va3Mgd29uJ3QgYmUgZHVwbGljYXRlZFxuICAvLyBiZXR3ZWVuIG1lcmdlc1xuICBpZiAoQXJyYXkuaXNBcnJheShsYXRlc3QpKSB7XG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIHNlYWxlZCA9IEFycmF5LmlzQXJyYXkoc2VhbGVkKSA/IHNlYWxlZCA6IFtzZWFsZWRdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGF0ZXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoc2VhbGVkLmluZGV4T2YobGF0ZXN0W2ldKSA8IDApIHtcbiAgICAgICAgcmVzLnB1c2gobGF0ZXN0W2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsYXRlc3RcbiAgfVxufVxuXG5mdW5jdGlvbiBWdWUkMiAob3B0aW9ucykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgICEodGhpcyBpbnN0YW5jZW9mIFZ1ZSQyKSkge1xuICAgIHdhcm4oJ1Z1ZSBpcyBhIGNvbnN0cnVjdG9yIGFuZCBzaG91bGQgYmUgY2FsbGVkIHdpdGggdGhlIGBuZXdgIGtleXdvcmQnKTtcbiAgfVxuICB0aGlzLl9pbml0KG9wdGlvbnMpO1xufVxuXG5pbml0TWl4aW4oVnVlJDIpO1xuc3RhdGVNaXhpbihWdWUkMik7XG5ldmVudHNNaXhpbihWdWUkMik7XG5saWZlY3ljbGVNaXhpbihWdWUkMik7XG5yZW5kZXJNaXhpbihWdWUkMik7XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbml0VXNlIChWdWUpIHtcbiAgVnVlLnVzZSA9IGZ1bmN0aW9uIChwbHVnaW4pIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICBpZiAocGx1Z2luLmluc3RhbGxlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIC8vIGFkZGl0aW9uYWwgcGFyYW1ldGVyc1xuICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMsIDEpO1xuICAgIGFyZ3MudW5zaGlmdCh0aGlzKTtcbiAgICBpZiAodHlwZW9mIHBsdWdpbi5pbnN0YWxsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBwbHVnaW4uaW5zdGFsbC5hcHBseShwbHVnaW4sIGFyZ3MpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHBsdWdpbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcGx1Z2luLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH1cbiAgICBwbHVnaW4uaW5zdGFsbGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpc1xuICB9O1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdE1peGluJDEgKFZ1ZSkge1xuICBWdWUubWl4aW4gPSBmdW5jdGlvbiAobWl4aW4pIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBtZXJnZU9wdGlvbnModGhpcy5vcHRpb25zLCBtaXhpbik7XG4gIH07XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbml0RXh0ZW5kIChWdWUpIHtcbiAgLyoqXG4gICAqIEVhY2ggaW5zdGFuY2UgY29uc3RydWN0b3IsIGluY2x1ZGluZyBWdWUsIGhhcyBhIHVuaXF1ZVxuICAgKiBjaWQuIFRoaXMgZW5hYmxlcyB1cyB0byBjcmVhdGUgd3JhcHBlZCBcImNoaWxkXG4gICAqIGNvbnN0cnVjdG9yc1wiIGZvciBwcm90b3R5cGFsIGluaGVyaXRhbmNlIGFuZCBjYWNoZSB0aGVtLlxuICAgKi9cbiAgVnVlLmNpZCA9IDA7XG4gIHZhciBjaWQgPSAxO1xuXG4gIC8qKlxuICAgKiBDbGFzcyBpbmhlcml0YW5jZVxuICAgKi9cbiAgVnVlLmV4dGVuZCA9IGZ1bmN0aW9uIChleHRlbmRPcHRpb25zKSB7XG4gICAgZXh0ZW5kT3B0aW9ucyA9IGV4dGVuZE9wdGlvbnMgfHwge307XG4gICAgdmFyIFN1cGVyID0gdGhpcztcbiAgICB2YXIgU3VwZXJJZCA9IFN1cGVyLmNpZDtcbiAgICB2YXIgY2FjaGVkQ3RvcnMgPSBleHRlbmRPcHRpb25zLl9DdG9yIHx8IChleHRlbmRPcHRpb25zLl9DdG9yID0ge30pO1xuICAgIGlmIChjYWNoZWRDdG9yc1tTdXBlcklkXSkge1xuICAgICAgcmV0dXJuIGNhY2hlZEN0b3JzW1N1cGVySWRdXG4gICAgfVxuXG4gICAgdmFyIG5hbWUgPSBleHRlbmRPcHRpb25zLm5hbWUgfHwgU3VwZXIub3B0aW9ucy5uYW1lO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoIS9eW2EtekEtWl1bXFx3LV0qJC8udGVzdChuYW1lKSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgICdJbnZhbGlkIGNvbXBvbmVudCBuYW1lOiBcIicgKyBuYW1lICsgJ1wiLiBDb21wb25lbnQgbmFtZXMgJyArXG4gICAgICAgICAgJ2NhbiBvbmx5IGNvbnRhaW4gYWxwaGFudW1lcmljIGNoYXJhY3RlcnMgYW5kIHRoZSBoeXBoZW4sICcgK1xuICAgICAgICAgICdhbmQgbXVzdCBzdGFydCB3aXRoIGEgbGV0dGVyLidcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgU3ViID0gZnVuY3Rpb24gVnVlQ29tcG9uZW50IChvcHRpb25zKSB7XG4gICAgICB0aGlzLl9pbml0KG9wdGlvbnMpO1xuICAgIH07XG4gICAgU3ViLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoU3VwZXIucHJvdG90eXBlKTtcbiAgICBTdWIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3ViO1xuICAgIFN1Yi5jaWQgPSBjaWQrKztcbiAgICBTdWIub3B0aW9ucyA9IG1lcmdlT3B0aW9ucyhcbiAgICAgIFN1cGVyLm9wdGlvbnMsXG4gICAgICBleHRlbmRPcHRpb25zXG4gICAgKTtcbiAgICBTdWJbJ3N1cGVyJ10gPSBTdXBlcjtcblxuICAgIC8vIEZvciBwcm9wcyBhbmQgY29tcHV0ZWQgcHJvcGVydGllcywgd2UgZGVmaW5lIHRoZSBwcm94eSBnZXR0ZXJzIG9uXG4gICAgLy8gdGhlIFZ1ZSBpbnN0YW5jZXMgYXQgZXh0ZW5zaW9uIHRpbWUsIG9uIHRoZSBleHRlbmRlZCBwcm90b3R5cGUuIFRoaXNcbiAgICAvLyBhdm9pZHMgT2JqZWN0LmRlZmluZVByb3BlcnR5IGNhbGxzIGZvciBlYWNoIGluc3RhbmNlIGNyZWF0ZWQuXG4gICAgaWYgKFN1Yi5vcHRpb25zLnByb3BzKSB7XG4gICAgICBpbml0UHJvcHMkMShTdWIpO1xuICAgIH1cbiAgICBpZiAoU3ViLm9wdGlvbnMuY29tcHV0ZWQpIHtcbiAgICAgIGluaXRDb21wdXRlZCQxKFN1Yik7XG4gICAgfVxuXG4gICAgLy8gYWxsb3cgZnVydGhlciBleHRlbnNpb24vbWl4aW4vcGx1Z2luIHVzYWdlXG4gICAgU3ViLmV4dGVuZCA9IFN1cGVyLmV4dGVuZDtcbiAgICBTdWIubWl4aW4gPSBTdXBlci5taXhpbjtcbiAgICBTdWIudXNlID0gU3VwZXIudXNlO1xuXG4gICAgLy8gY3JlYXRlIGFzc2V0IHJlZ2lzdGVycywgc28gZXh0ZW5kZWQgY2xhc3Nlc1xuICAgIC8vIGNhbiBoYXZlIHRoZWlyIHByaXZhdGUgYXNzZXRzIHRvby5cbiAgICBjb25maWcuX2Fzc2V0VHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgU3ViW3R5cGVdID0gU3VwZXJbdHlwZV07XG4gICAgfSk7XG4gICAgLy8gZW5hYmxlIHJlY3Vyc2l2ZSBzZWxmLWxvb2t1cFxuICAgIGlmIChuYW1lKSB7XG4gICAgICBTdWIub3B0aW9ucy5jb21wb25lbnRzW25hbWVdID0gU3ViO1xuICAgIH1cblxuICAgIC8vIGtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIHN1cGVyIG9wdGlvbnMgYXQgZXh0ZW5zaW9uIHRpbWUuXG4gICAgLy8gbGF0ZXIgYXQgaW5zdGFudGlhdGlvbiB3ZSBjYW4gY2hlY2sgaWYgU3VwZXIncyBvcHRpb25zIGhhdmVcbiAgICAvLyBiZWVuIHVwZGF0ZWQuXG4gICAgU3ViLnN1cGVyT3B0aW9ucyA9IFN1cGVyLm9wdGlvbnM7XG4gICAgU3ViLmV4dGVuZE9wdGlvbnMgPSBleHRlbmRPcHRpb25zO1xuICAgIFN1Yi5zZWFsZWRPcHRpb25zID0gZXh0ZW5kKHt9LCBTdWIub3B0aW9ucyk7XG5cbiAgICAvLyBjYWNoZSBjb25zdHJ1Y3RvclxuICAgIGNhY2hlZEN0b3JzW1N1cGVySWRdID0gU3ViO1xuICAgIHJldHVybiBTdWJcbiAgfTtcbn1cblxuZnVuY3Rpb24gaW5pdFByb3BzJDEgKENvbXApIHtcbiAgdmFyIHByb3BzID0gQ29tcC5vcHRpb25zLnByb3BzO1xuICBmb3IgKHZhciBrZXkgaW4gcHJvcHMpIHtcbiAgICBwcm94eShDb21wLnByb3RvdHlwZSwgXCJfcHJvcHNcIiwga2V5KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0Q29tcHV0ZWQkMSAoQ29tcCkge1xuICB2YXIgY29tcHV0ZWQgPSBDb21wLm9wdGlvbnMuY29tcHV0ZWQ7XG4gIGZvciAodmFyIGtleSBpbiBjb21wdXRlZCkge1xuICAgIGRlZmluZUNvbXB1dGVkKENvbXAucHJvdG90eXBlLCBrZXksIGNvbXB1dGVkW2tleV0pO1xuICB9XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBpbml0QXNzZXRSZWdpc3RlcnMgKFZ1ZSkge1xuICAvKipcbiAgICogQ3JlYXRlIGFzc2V0IHJlZ2lzdHJhdGlvbiBtZXRob2RzLlxuICAgKi9cbiAgY29uZmlnLl9hc3NldFR5cGVzLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICBWdWVbdHlwZV0gPSBmdW5jdGlvbiAoXG4gICAgICBpZCxcbiAgICAgIGRlZmluaXRpb25cbiAgICApIHtcbiAgICAgIGlmICghZGVmaW5pdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5vcHRpb25zW3R5cGUgKyAncyddW2lkXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgaWYgKHR5cGUgPT09ICdjb21wb25lbnQnICYmIGNvbmZpZy5pc1Jlc2VydmVkVGFnKGlkKSkge1xuICAgICAgICAgICAgd2FybihcbiAgICAgICAgICAgICAgJ0RvIG5vdCB1c2UgYnVpbHQtaW4gb3IgcmVzZXJ2ZWQgSFRNTCBlbGVtZW50cyBhcyBjb21wb25lbnQgJyArXG4gICAgICAgICAgICAgICdpZDogJyArIGlkXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PT0gJ2NvbXBvbmVudCcgJiYgaXNQbGFpbk9iamVjdChkZWZpbml0aW9uKSkge1xuICAgICAgICAgIGRlZmluaXRpb24ubmFtZSA9IGRlZmluaXRpb24ubmFtZSB8fCBpZDtcbiAgICAgICAgICBkZWZpbml0aW9uID0gdGhpcy5vcHRpb25zLl9iYXNlLmV4dGVuZChkZWZpbml0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PT0gJ2RpcmVjdGl2ZScgJiYgdHlwZW9mIGRlZmluaXRpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBkZWZpbml0aW9uID0geyBiaW5kOiBkZWZpbml0aW9uLCB1cGRhdGU6IGRlZmluaXRpb24gfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdGlvbnNbdHlwZSArICdzJ11baWRdID0gZGVmaW5pdGlvbjtcbiAgICAgICAgcmV0dXJuIGRlZmluaXRpb25cbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn1cblxuLyogICovXG5cbnZhciBwYXR0ZXJuVHlwZXMgPSBbU3RyaW5nLCBSZWdFeHBdO1xuXG5mdW5jdGlvbiBnZXRDb21wb25lbnROYW1lIChvcHRzKSB7XG4gIHJldHVybiBvcHRzICYmIChvcHRzLkN0b3Iub3B0aW9ucy5uYW1lIHx8IG9wdHMudGFnKVxufVxuXG5mdW5jdGlvbiBtYXRjaGVzIChwYXR0ZXJuLCBuYW1lKSB7XG4gIGlmICh0eXBlb2YgcGF0dGVybiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gcGF0dGVybi5zcGxpdCgnLCcpLmluZGV4T2YobmFtZSkgPiAtMVxuICB9IGVsc2UgaWYgKHBhdHRlcm4gaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICByZXR1cm4gcGF0dGVybi50ZXN0KG5hbWUpXG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmZ1bmN0aW9uIHBydW5lQ2FjaGUgKGNhY2hlLCBmaWx0ZXIpIHtcbiAgZm9yICh2YXIga2V5IGluIGNhY2hlKSB7XG4gICAgdmFyIGNhY2hlZE5vZGUgPSBjYWNoZVtrZXldO1xuICAgIGlmIChjYWNoZWROb2RlKSB7XG4gICAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWUoY2FjaGVkTm9kZS5jb21wb25lbnRPcHRpb25zKTtcbiAgICAgIGlmIChuYW1lICYmICFmaWx0ZXIobmFtZSkpIHtcbiAgICAgICAgcHJ1bmVDYWNoZUVudHJ5KGNhY2hlZE5vZGUpO1xuICAgICAgICBjYWNoZVtrZXldID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJ1bmVDYWNoZUVudHJ5ICh2bm9kZSkge1xuICBpZiAodm5vZGUpIHtcbiAgICBpZiAoIXZub2RlLmNvbXBvbmVudEluc3RhbmNlLl9pbmFjdGl2ZSkge1xuICAgICAgY2FsbEhvb2sodm5vZGUuY29tcG9uZW50SW5zdGFuY2UsICdkZWFjdGl2YXRlZCcpO1xuICAgIH1cbiAgICB2bm9kZS5jb21wb25lbnRJbnN0YW5jZS4kZGVzdHJveSgpO1xuICB9XG59XG5cbnZhciBLZWVwQWxpdmUgPSB7XG4gIG5hbWU6ICdrZWVwLWFsaXZlJyxcbiAgYWJzdHJhY3Q6IHRydWUsXG5cbiAgcHJvcHM6IHtcbiAgICBpbmNsdWRlOiBwYXR0ZXJuVHlwZXMsXG4gICAgZXhjbHVkZTogcGF0dGVyblR5cGVzXG4gIH0sXG5cbiAgY3JlYXRlZDogZnVuY3Rpb24gY3JlYXRlZCAoKSB7XG4gICAgdGhpcy5jYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH0sXG5cbiAgZGVzdHJveWVkOiBmdW5jdGlvbiBkZXN0cm95ZWQgKCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMkMS5jYWNoZSkge1xuICAgICAgcHJ1bmVDYWNoZUVudHJ5KHRoaXMkMS5jYWNoZVtrZXldKTtcbiAgICB9XG4gIH0sXG5cbiAgd2F0Y2g6IHtcbiAgICBpbmNsdWRlOiBmdW5jdGlvbiBpbmNsdWRlICh2YWwpIHtcbiAgICAgIHBydW5lQ2FjaGUodGhpcy5jYWNoZSwgZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIG1hdGNoZXModmFsLCBuYW1lKTsgfSk7XG4gICAgfSxcbiAgICBleGNsdWRlOiBmdW5jdGlvbiBleGNsdWRlICh2YWwpIHtcbiAgICAgIHBydW5lQ2FjaGUodGhpcy5jYWNoZSwgZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuICFtYXRjaGVzKHZhbCwgbmFtZSk7IH0pO1xuICAgIH1cbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlciAoKSB7XG4gICAgdmFyIHZub2RlID0gZ2V0Rmlyc3RDb21wb25lbnRDaGlsZCh0aGlzLiRzbG90cy5kZWZhdWx0KTtcbiAgICB2YXIgY29tcG9uZW50T3B0aW9ucyA9IHZub2RlICYmIHZub2RlLmNvbXBvbmVudE9wdGlvbnM7XG4gICAgaWYgKGNvbXBvbmVudE9wdGlvbnMpIHtcbiAgICAgIC8vIGNoZWNrIHBhdHRlcm5cbiAgICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZShjb21wb25lbnRPcHRpb25zKTtcbiAgICAgIGlmIChuYW1lICYmIChcbiAgICAgICAgKHRoaXMuaW5jbHVkZSAmJiAhbWF0Y2hlcyh0aGlzLmluY2x1ZGUsIG5hbWUpKSB8fFxuICAgICAgICAodGhpcy5leGNsdWRlICYmIG1hdGNoZXModGhpcy5leGNsdWRlLCBuYW1lKSlcbiAgICAgICkpIHtcbiAgICAgICAgcmV0dXJuIHZub2RlXG4gICAgICB9XG4gICAgICB2YXIga2V5ID0gdm5vZGUua2V5ID09IG51bGxcbiAgICAgICAgLy8gc2FtZSBjb25zdHJ1Y3RvciBtYXkgZ2V0IHJlZ2lzdGVyZWQgYXMgZGlmZmVyZW50IGxvY2FsIGNvbXBvbmVudHNcbiAgICAgICAgLy8gc28gY2lkIGFsb25lIGlzIG5vdCBlbm91Z2ggKCMzMjY5KVxuICAgICAgICA/IGNvbXBvbmVudE9wdGlvbnMuQ3Rvci5jaWQgKyAoY29tcG9uZW50T3B0aW9ucy50YWcgPyAoXCI6OlwiICsgKGNvbXBvbmVudE9wdGlvbnMudGFnKSkgOiAnJylcbiAgICAgICAgOiB2bm9kZS5rZXk7XG4gICAgICBpZiAodGhpcy5jYWNoZVtrZXldKSB7XG4gICAgICAgIHZub2RlLmNvbXBvbmVudEluc3RhbmNlID0gdGhpcy5jYWNoZVtrZXldLmNvbXBvbmVudEluc3RhbmNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jYWNoZVtrZXldID0gdm5vZGU7XG4gICAgICB9XG4gICAgICB2bm9kZS5kYXRhLmtlZXBBbGl2ZSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB2bm9kZVxuICB9XG59O1xuXG52YXIgYnVpbHRJbkNvbXBvbmVudHMgPSB7XG4gIEtlZXBBbGl2ZTogS2VlcEFsaXZlXG59O1xuXG4vKiAgKi9cblxuZnVuY3Rpb24gaW5pdEdsb2JhbEFQSSAoVnVlKSB7XG4gIC8vIGNvbmZpZ1xuICB2YXIgY29uZmlnRGVmID0ge307XG4gIGNvbmZpZ0RlZi5nZXQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBjb25maWc7IH07XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgY29uZmlnRGVmLnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHdhcm4oXG4gICAgICAgICdEbyBub3QgcmVwbGFjZSB0aGUgVnVlLmNvbmZpZyBvYmplY3QsIHNldCBpbmRpdmlkdWFsIGZpZWxkcyBpbnN0ZWFkLidcbiAgICAgICk7XG4gICAgfTtcbiAgfVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlLCAnY29uZmlnJywgY29uZmlnRGVmKTtcblxuICAvLyBleHBvc2VkIHV0aWwgbWV0aG9kcy5cbiAgLy8gTk9URTogdGhlc2UgYXJlIG5vdCBjb25zaWRlcmVkIHBhcnQgb2YgdGhlIHB1YmxpYyBBUEkgLSBhdm9pZCByZWx5aW5nIG9uXG4gIC8vIHRoZW0gdW5sZXNzIHlvdSBhcmUgYXdhcmUgb2YgdGhlIHJpc2suXG4gIFZ1ZS51dGlsID0ge1xuICAgIHdhcm46IHdhcm4sXG4gICAgZXh0ZW5kOiBleHRlbmQsXG4gICAgbWVyZ2VPcHRpb25zOiBtZXJnZU9wdGlvbnMsXG4gICAgZGVmaW5lUmVhY3RpdmU6IGRlZmluZVJlYWN0aXZlJCQxXG4gIH07XG5cbiAgVnVlLnNldCA9IHNldDtcbiAgVnVlLmRlbGV0ZSA9IGRlbDtcbiAgVnVlLm5leHRUaWNrID0gbmV4dFRpY2s7XG5cbiAgVnVlLm9wdGlvbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBjb25maWcuX2Fzc2V0VHlwZXMuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgIFZ1ZS5vcHRpb25zW3R5cGUgKyAncyddID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgfSk7XG5cbiAgLy8gdGhpcyBpcyB1c2VkIHRvIGlkZW50aWZ5IHRoZSBcImJhc2VcIiBjb25zdHJ1Y3RvciB0byBleHRlbmQgYWxsIHBsYWluLW9iamVjdFxuICAvLyBjb21wb25lbnRzIHdpdGggaW4gV2VleCdzIG11bHRpLWluc3RhbmNlIHNjZW5hcmlvcy5cbiAgVnVlLm9wdGlvbnMuX2Jhc2UgPSBWdWU7XG5cbiAgZXh0ZW5kKFZ1ZS5vcHRpb25zLmNvbXBvbmVudHMsIGJ1aWx0SW5Db21wb25lbnRzKTtcblxuICBpbml0VXNlKFZ1ZSk7XG4gIGluaXRNaXhpbiQxKFZ1ZSk7XG4gIGluaXRFeHRlbmQoVnVlKTtcbiAgaW5pdEFzc2V0UmVnaXN0ZXJzKFZ1ZSk7XG59XG5cbmluaXRHbG9iYWxBUEkoVnVlJDIpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoVnVlJDIucHJvdG90eXBlLCAnJGlzU2VydmVyJywge1xuICBnZXQ6IGlzU2VydmVyUmVuZGVyaW5nXG59KTtcblxuVnVlJDIudmVyc2lvbiA9ICcyLjIuMSc7XG5cbi8qICAqL1xuXG4vLyBhdHRyaWJ1dGVzIHRoYXQgc2hvdWxkIGJlIHVzaW5nIHByb3BzIGZvciBiaW5kaW5nXG52YXIgYWNjZXB0VmFsdWUgPSBtYWtlTWFwKCdpbnB1dCx0ZXh0YXJlYSxvcHRpb24sc2VsZWN0Jyk7XG52YXIgbXVzdFVzZVByb3AgPSBmdW5jdGlvbiAodGFnLCB0eXBlLCBhdHRyKSB7XG4gIHJldHVybiAoXG4gICAgKGF0dHIgPT09ICd2YWx1ZScgJiYgYWNjZXB0VmFsdWUodGFnKSkgJiYgdHlwZSAhPT0gJ2J1dHRvbicgfHxcbiAgICAoYXR0ciA9PT0gJ3NlbGVjdGVkJyAmJiB0YWcgPT09ICdvcHRpb24nKSB8fFxuICAgIChhdHRyID09PSAnY2hlY2tlZCcgJiYgdGFnID09PSAnaW5wdXQnKSB8fFxuICAgIChhdHRyID09PSAnbXV0ZWQnICYmIHRhZyA9PT0gJ3ZpZGVvJylcbiAgKVxufTtcblxudmFyIGlzRW51bWVyYXRlZEF0dHIgPSBtYWtlTWFwKCdjb250ZW50ZWRpdGFibGUsZHJhZ2dhYmxlLHNwZWxsY2hlY2snKTtcblxudmFyIGlzQm9vbGVhbkF0dHIgPSBtYWtlTWFwKFxuICAnYWxsb3dmdWxsc2NyZWVuLGFzeW5jLGF1dG9mb2N1cyxhdXRvcGxheSxjaGVja2VkLGNvbXBhY3QsY29udHJvbHMsZGVjbGFyZSwnICtcbiAgJ2RlZmF1bHQsZGVmYXVsdGNoZWNrZWQsZGVmYXVsdG11dGVkLGRlZmF1bHRzZWxlY3RlZCxkZWZlcixkaXNhYmxlZCwnICtcbiAgJ2VuYWJsZWQsZm9ybW5vdmFsaWRhdGUsaGlkZGVuLGluZGV0ZXJtaW5hdGUsaW5lcnQsaXNtYXAsaXRlbXNjb3BlLGxvb3AsbXVsdGlwbGUsJyArXG4gICdtdXRlZCxub2hyZWYsbm9yZXNpemUsbm9zaGFkZSxub3ZhbGlkYXRlLG5vd3JhcCxvcGVuLHBhdXNlb25leGl0LHJlYWRvbmx5LCcgK1xuICAncmVxdWlyZWQscmV2ZXJzZWQsc2NvcGVkLHNlYW1sZXNzLHNlbGVjdGVkLHNvcnRhYmxlLHRyYW5zbGF0ZSwnICtcbiAgJ3RydWVzcGVlZCx0eXBlbXVzdG1hdGNoLHZpc2libGUnXG4pO1xuXG52YXIgeGxpbmtOUyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJztcblxudmFyIGlzWGxpbmsgPSBmdW5jdGlvbiAobmFtZSkge1xuICByZXR1cm4gbmFtZS5jaGFyQXQoNSkgPT09ICc6JyAmJiBuYW1lLnNsaWNlKDAsIDUpID09PSAneGxpbmsnXG59O1xuXG52YXIgZ2V0WGxpbmtQcm9wID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIGlzWGxpbmsobmFtZSkgPyBuYW1lLnNsaWNlKDYsIG5hbWUubGVuZ3RoKSA6ICcnXG59O1xuXG52YXIgaXNGYWxzeUF0dHJWYWx1ZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgcmV0dXJuIHZhbCA9PSBudWxsIHx8IHZhbCA9PT0gZmFsc2Vcbn07XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBnZW5DbGFzc0ZvclZub2RlICh2bm9kZSkge1xuICB2YXIgZGF0YSA9IHZub2RlLmRhdGE7XG4gIHZhciBwYXJlbnROb2RlID0gdm5vZGU7XG4gIHZhciBjaGlsZE5vZGUgPSB2bm9kZTtcbiAgd2hpbGUgKGNoaWxkTm9kZS5jb21wb25lbnRJbnN0YW5jZSkge1xuICAgIGNoaWxkTm9kZSA9IGNoaWxkTm9kZS5jb21wb25lbnRJbnN0YW5jZS5fdm5vZGU7XG4gICAgaWYgKGNoaWxkTm9kZS5kYXRhKSB7XG4gICAgICBkYXRhID0gbWVyZ2VDbGFzc0RhdGEoY2hpbGROb2RlLmRhdGEsIGRhdGEpO1xuICAgIH1cbiAgfVxuICB3aGlsZSAoKHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudCkpIHtcbiAgICBpZiAocGFyZW50Tm9kZS5kYXRhKSB7XG4gICAgICBkYXRhID0gbWVyZ2VDbGFzc0RhdGEoZGF0YSwgcGFyZW50Tm9kZS5kYXRhKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGdlbkNsYXNzRnJvbURhdGEoZGF0YSlcbn1cblxuZnVuY3Rpb24gbWVyZ2VDbGFzc0RhdGEgKGNoaWxkLCBwYXJlbnQpIHtcbiAgcmV0dXJuIHtcbiAgICBzdGF0aWNDbGFzczogY29uY2F0KGNoaWxkLnN0YXRpY0NsYXNzLCBwYXJlbnQuc3RhdGljQ2xhc3MpLFxuICAgIGNsYXNzOiBjaGlsZC5jbGFzc1xuICAgICAgPyBbY2hpbGQuY2xhc3MsIHBhcmVudC5jbGFzc11cbiAgICAgIDogcGFyZW50LmNsYXNzXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2VuQ2xhc3NGcm9tRGF0YSAoZGF0YSkge1xuICB2YXIgZHluYW1pY0NsYXNzID0gZGF0YS5jbGFzcztcbiAgdmFyIHN0YXRpY0NsYXNzID0gZGF0YS5zdGF0aWNDbGFzcztcbiAgaWYgKHN0YXRpY0NsYXNzIHx8IGR5bmFtaWNDbGFzcykge1xuICAgIHJldHVybiBjb25jYXQoc3RhdGljQ2xhc3MsIHN0cmluZ2lmeUNsYXNzKGR5bmFtaWNDbGFzcykpXG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgcmV0dXJuICcnXG59XG5cbmZ1bmN0aW9uIGNvbmNhdCAoYSwgYikge1xuICByZXR1cm4gYSA/IGIgPyAoYSArICcgJyArIGIpIDogYSA6IChiIHx8ICcnKVxufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlDbGFzcyAodmFsdWUpIHtcbiAgdmFyIHJlcyA9ICcnO1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIHJlc1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgdmFyIHN0cmluZ2lmaWVkO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gdmFsdWUubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAodmFsdWVbaV0pIHtcbiAgICAgICAgaWYgKChzdHJpbmdpZmllZCA9IHN0cmluZ2lmeUNsYXNzKHZhbHVlW2ldKSkpIHtcbiAgICAgICAgICByZXMgKz0gc3RyaW5naWZpZWQgKyAnICc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcy5zbGljZSgwLCAtMSlcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgICBpZiAodmFsdWVba2V5XSkgeyByZXMgKz0ga2V5ICsgJyAnOyB9XG4gICAgfVxuICAgIHJldHVybiByZXMuc2xpY2UoMCwgLTEpXG4gIH1cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgcmV0dXJuIHJlc1xufVxuXG4vKiAgKi9cblxudmFyIG5hbWVzcGFjZU1hcCA9IHtcbiAgc3ZnOiAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLFxuICBtYXRoOiAnaHR0cDovL3d3dy53My5vcmcvMTk5OC9NYXRoL01hdGhNTCdcbn07XG5cbnZhciBpc0hUTUxUYWcgPSBtYWtlTWFwKFxuICAnaHRtbCxib2R5LGJhc2UsaGVhZCxsaW5rLG1ldGEsc3R5bGUsdGl0bGUsJyArXG4gICdhZGRyZXNzLGFydGljbGUsYXNpZGUsZm9vdGVyLGhlYWRlcixoMSxoMixoMyxoNCxoNSxoNixoZ3JvdXAsbmF2LHNlY3Rpb24sJyArXG4gICdkaXYsZGQsZGwsZHQsZmlnY2FwdGlvbixmaWd1cmUsaHIsaW1nLGxpLG1haW4sb2wscCxwcmUsdWwsJyArXG4gICdhLGIsYWJicixiZGksYmRvLGJyLGNpdGUsY29kZSxkYXRhLGRmbixlbSxpLGtiZCxtYXJrLHEscnAscnQscnRjLHJ1YnksJyArXG4gICdzLHNhbXAsc21hbGwsc3BhbixzdHJvbmcsc3ViLHN1cCx0aW1lLHUsdmFyLHdicixhcmVhLGF1ZGlvLG1hcCx0cmFjayx2aWRlbywnICtcbiAgJ2VtYmVkLG9iamVjdCxwYXJhbSxzb3VyY2UsY2FudmFzLHNjcmlwdCxub3NjcmlwdCxkZWwsaW5zLCcgK1xuICAnY2FwdGlvbixjb2wsY29sZ3JvdXAsdGFibGUsdGhlYWQsdGJvZHksdGQsdGgsdHIsJyArXG4gICdidXR0b24sZGF0YWxpc3QsZmllbGRzZXQsZm9ybSxpbnB1dCxsYWJlbCxsZWdlbmQsbWV0ZXIsb3B0Z3JvdXAsb3B0aW9uLCcgK1xuICAnb3V0cHV0LHByb2dyZXNzLHNlbGVjdCx0ZXh0YXJlYSwnICtcbiAgJ2RldGFpbHMsZGlhbG9nLG1lbnUsbWVudWl0ZW0sc3VtbWFyeSwnICtcbiAgJ2NvbnRlbnQsZWxlbWVudCxzaGFkb3csdGVtcGxhdGUnXG4pO1xuXG4vLyB0aGlzIG1hcCBpcyBpbnRlbnRpb25hbGx5IHNlbGVjdGl2ZSwgb25seSBjb3ZlcmluZyBTVkcgZWxlbWVudHMgdGhhdCBtYXlcbi8vIGNvbnRhaW4gY2hpbGQgZWxlbWVudHMuXG52YXIgaXNTVkcgPSBtYWtlTWFwKFxuICAnc3ZnLGFuaW1hdGUsY2lyY2xlLGNsaXBwYXRoLGN1cnNvcixkZWZzLGRlc2MsZWxsaXBzZSxmaWx0ZXIsZm9udC1mYWNlLCcgK1xuICAnZm9yZWlnbk9iamVjdCxnLGdseXBoLGltYWdlLGxpbmUsbWFya2VyLG1hc2ssbWlzc2luZy1nbHlwaCxwYXRoLHBhdHRlcm4sJyArXG4gICdwb2x5Z29uLHBvbHlsaW5lLHJlY3Qsc3dpdGNoLHN5bWJvbCx0ZXh0LHRleHRwYXRoLHRzcGFuLHVzZSx2aWV3JyxcbiAgdHJ1ZVxuKTtcblxuXG5cbnZhciBpc1Jlc2VydmVkVGFnID0gZnVuY3Rpb24gKHRhZykge1xuICByZXR1cm4gaXNIVE1MVGFnKHRhZykgfHwgaXNTVkcodGFnKVxufTtcblxuZnVuY3Rpb24gZ2V0VGFnTmFtZXNwYWNlICh0YWcpIHtcbiAgaWYgKGlzU1ZHKHRhZykpIHtcbiAgICByZXR1cm4gJ3N2ZydcbiAgfVxuICAvLyBiYXNpYyBzdXBwb3J0IGZvciBNYXRoTUxcbiAgLy8gbm90ZSBpdCBkb2Vzbid0IHN1cHBvcnQgb3RoZXIgTWF0aE1MIGVsZW1lbnRzIGJlaW5nIGNvbXBvbmVudCByb290c1xuICBpZiAodGFnID09PSAnbWF0aCcpIHtcbiAgICByZXR1cm4gJ21hdGgnXG4gIH1cbn1cblxudmFyIHVua25vd25FbGVtZW50Q2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuZnVuY3Rpb24gaXNVbmtub3duRWxlbWVudCAodGFnKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoIWluQnJvd3Nlcikge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgaWYgKGlzUmVzZXJ2ZWRUYWcodGFnKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHRhZyA9IHRhZy50b0xvd2VyQ2FzZSgpO1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKHVua25vd25FbGVtZW50Q2FjaGVbdGFnXSAhPSBudWxsKSB7XG4gICAgcmV0dXJuIHVua25vd25FbGVtZW50Q2FjaGVbdGFnXVxuICB9XG4gIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgaWYgKHRhZy5pbmRleE9mKCctJykgPiAtMSkge1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI4MjEwMzY0LzEwNzAyNDRcbiAgICByZXR1cm4gKHVua25vd25FbGVtZW50Q2FjaGVbdGFnXSA9IChcbiAgICAgIGVsLmNvbnN0cnVjdG9yID09PSB3aW5kb3cuSFRNTFVua25vd25FbGVtZW50IHx8XG4gICAgICBlbC5jb25zdHJ1Y3RvciA9PT0gd2luZG93LkhUTUxFbGVtZW50XG4gICAgKSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKHVua25vd25FbGVtZW50Q2FjaGVbdGFnXSA9IC9IVE1MVW5rbm93bkVsZW1lbnQvLnRlc3QoZWwudG9TdHJpbmcoKSkpXG4gIH1cbn1cblxuLyogICovXG5cbi8qKlxuICogUXVlcnkgYW4gZWxlbWVudCBzZWxlY3RvciBpZiBpdCdzIG5vdCBhbiBlbGVtZW50IGFscmVhZHkuXG4gKi9cbmZ1bmN0aW9uIHF1ZXJ5IChlbCkge1xuICBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xuICAgIHZhciBzZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuICAgIGlmICghc2VsZWN0ZWQpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgICAgJ0Nhbm5vdCBmaW5kIGVsZW1lbnQ6ICcgKyBlbFxuICAgICAgKTtcbiAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIH1cbiAgICByZXR1cm4gc2VsZWN0ZWRcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWxcbiAgfVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCQxICh0YWdOYW1lLCB2bm9kZSkge1xuICB2YXIgZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcbiAgaWYgKHRhZ05hbWUgIT09ICdzZWxlY3QnKSB7XG4gICAgcmV0dXJuIGVsbVxuICB9XG4gIC8vIGZhbHNlIG9yIG51bGwgd2lsbCByZW1vdmUgdGhlIGF0dHJpYnV0ZSBidXQgdW5kZWZpbmVkIHdpbGwgbm90XG4gIGlmICh2bm9kZS5kYXRhICYmIHZub2RlLmRhdGEuYXR0cnMgJiYgdm5vZGUuZGF0YS5hdHRycy5tdWx0aXBsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZWxtLnNldEF0dHJpYnV0ZSgnbXVsdGlwbGUnLCAnbXVsdGlwbGUnKTtcbiAgfVxuICByZXR1cm4gZWxtXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnROUyAobmFtZXNwYWNlLCB0YWdOYW1lKSB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlTWFwW25hbWVzcGFjZV0sIHRhZ05hbWUpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRleHROb2RlICh0ZXh0KSB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KVxufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21tZW50ICh0ZXh0KSB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVDb21tZW50KHRleHQpXG59XG5cbmZ1bmN0aW9uIGluc2VydEJlZm9yZSAocGFyZW50Tm9kZSwgbmV3Tm9kZSwgcmVmZXJlbmNlTm9kZSkge1xuICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCByZWZlcmVuY2VOb2RlKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2hpbGQgKG5vZGUsIGNoaWxkKSB7XG4gIG5vZGUucmVtb3ZlQ2hpbGQoY2hpbGQpO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRDaGlsZCAobm9kZSwgY2hpbGQpIHtcbiAgbm9kZS5hcHBlbmRDaGlsZChjaGlsZCk7XG59XG5cbmZ1bmN0aW9uIHBhcmVudE5vZGUgKG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUucGFyZW50Tm9kZVxufVxuXG5mdW5jdGlvbiBuZXh0U2libGluZyAobm9kZSkge1xuICByZXR1cm4gbm9kZS5uZXh0U2libGluZ1xufVxuXG5mdW5jdGlvbiB0YWdOYW1lIChub2RlKSB7XG4gIHJldHVybiBub2RlLnRhZ05hbWVcbn1cblxuZnVuY3Rpb24gc2V0VGV4dENvbnRlbnQgKG5vZGUsIHRleHQpIHtcbiAgbm9kZS50ZXh0Q29udGVudCA9IHRleHQ7XG59XG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZSAobm9kZSwga2V5LCB2YWwpIHtcbiAgbm9kZS5zZXRBdHRyaWJ1dGUoa2V5LCB2YWwpO1xufVxuXG5cbnZhciBub2RlT3BzID0gT2JqZWN0LmZyZWV6ZSh7XG5cdGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQkMSxcblx0Y3JlYXRlRWxlbWVudE5TOiBjcmVhdGVFbGVtZW50TlMsXG5cdGNyZWF0ZVRleHROb2RlOiBjcmVhdGVUZXh0Tm9kZSxcblx0Y3JlYXRlQ29tbWVudDogY3JlYXRlQ29tbWVudCxcblx0aW5zZXJ0QmVmb3JlOiBpbnNlcnRCZWZvcmUsXG5cdHJlbW92ZUNoaWxkOiByZW1vdmVDaGlsZCxcblx0YXBwZW5kQ2hpbGQ6IGFwcGVuZENoaWxkLFxuXHRwYXJlbnROb2RlOiBwYXJlbnROb2RlLFxuXHRuZXh0U2libGluZzogbmV4dFNpYmxpbmcsXG5cdHRhZ05hbWU6IHRhZ05hbWUsXG5cdHNldFRleHRDb250ZW50OiBzZXRUZXh0Q29udGVudCxcblx0c2V0QXR0cmlidXRlOiBzZXRBdHRyaWJ1dGVcbn0pO1xuXG4vKiAgKi9cblxudmFyIHJlZiA9IHtcbiAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUgKF8sIHZub2RlKSB7XG4gICAgcmVnaXN0ZXJSZWYodm5vZGUpO1xuICB9LFxuICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSAob2xkVm5vZGUsIHZub2RlKSB7XG4gICAgaWYgKG9sZFZub2RlLmRhdGEucmVmICE9PSB2bm9kZS5kYXRhLnJlZikge1xuICAgICAgcmVnaXN0ZXJSZWYob2xkVm5vZGUsIHRydWUpO1xuICAgICAgcmVnaXN0ZXJSZWYodm5vZGUpO1xuICAgIH1cbiAgfSxcbiAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSAodm5vZGUpIHtcbiAgICByZWdpc3RlclJlZih2bm9kZSwgdHJ1ZSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyUmVmICh2bm9kZSwgaXNSZW1vdmFsKSB7XG4gIHZhciBrZXkgPSB2bm9kZS5kYXRhLnJlZjtcbiAgaWYgKCFrZXkpIHsgcmV0dXJuIH1cblxuICB2YXIgdm0gPSB2bm9kZS5jb250ZXh0O1xuICB2YXIgcmVmID0gdm5vZGUuY29tcG9uZW50SW5zdGFuY2UgfHwgdm5vZGUuZWxtO1xuICB2YXIgcmVmcyA9IHZtLiRyZWZzO1xuICBpZiAoaXNSZW1vdmFsKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmVmc1trZXldKSkge1xuICAgICAgcmVtb3ZlKHJlZnNba2V5XSwgcmVmKTtcbiAgICB9IGVsc2UgaWYgKHJlZnNba2V5XSA9PT0gcmVmKSB7XG4gICAgICByZWZzW2tleV0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICh2bm9kZS5kYXRhLnJlZkluRm9yKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShyZWZzW2tleV0pICYmIHJlZnNba2V5XS5pbmRleE9mKHJlZikgPCAwKSB7XG4gICAgICAgIHJlZnNba2V5XS5wdXNoKHJlZik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWZzW2tleV0gPSBbcmVmXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVmc1trZXldID0gcmVmO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFZpcnR1YWwgRE9NIHBhdGNoaW5nIGFsZ29yaXRobSBiYXNlZCBvbiBTbmFiYmRvbSBieVxuICogU2ltb24gRnJpaXMgVmluZHVtIChAcGFsZGVwaW5kKVxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vcGFsZGVwaW5kL3NuYWJiZG9tL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqXG4gKiBtb2RpZmllZCBieSBFdmFuIFlvdSAoQHl5eDk5MDgwMylcbiAqXG5cbi8qXG4gKiBOb3QgdHlwZS1jaGVja2luZyB0aGlzIGJlY2F1c2UgdGhpcyBmaWxlIGlzIHBlcmYtY3JpdGljYWwgYW5kIHRoZSBjb3N0XG4gKiBvZiBtYWtpbmcgZmxvdyB1bmRlcnN0YW5kIGl0IGlzIG5vdCB3b3J0aCBpdC5cbiAqL1xuXG52YXIgZW1wdHlOb2RlID0gbmV3IFZOb2RlKCcnLCB7fSwgW10pO1xuXG52YXIgaG9va3MkMSA9IFsnY3JlYXRlJywgJ2FjdGl2YXRlJywgJ3VwZGF0ZScsICdyZW1vdmUnLCAnZGVzdHJveSddO1xuXG5mdW5jdGlvbiBpc1VuZGVmIChzKSB7XG4gIHJldHVybiBzID09IG51bGxcbn1cblxuZnVuY3Rpb24gaXNEZWYgKHMpIHtcbiAgcmV0dXJuIHMgIT0gbnVsbFxufVxuXG5mdW5jdGlvbiBzYW1lVm5vZGUgKHZub2RlMSwgdm5vZGUyKSB7XG4gIHJldHVybiAoXG4gICAgdm5vZGUxLmtleSA9PT0gdm5vZGUyLmtleSAmJlxuICAgIHZub2RlMS50YWcgPT09IHZub2RlMi50YWcgJiZcbiAgICB2bm9kZTEuaXNDb21tZW50ID09PSB2bm9kZTIuaXNDb21tZW50ICYmXG4gICAgIXZub2RlMS5kYXRhID09PSAhdm5vZGUyLmRhdGFcbiAgKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVLZXlUb09sZElkeCAoY2hpbGRyZW4sIGJlZ2luSWR4LCBlbmRJZHgpIHtcbiAgdmFyIGksIGtleTtcbiAgdmFyIG1hcCA9IHt9O1xuICBmb3IgKGkgPSBiZWdpbklkeDsgaSA8PSBlbmRJZHg7ICsraSkge1xuICAgIGtleSA9IGNoaWxkcmVuW2ldLmtleTtcbiAgICBpZiAoaXNEZWYoa2V5KSkgeyBtYXBba2V5XSA9IGk7IH1cbiAgfVxuICByZXR1cm4gbWFwXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVBhdGNoRnVuY3Rpb24gKGJhY2tlbmQpIHtcbiAgdmFyIGksIGo7XG4gIHZhciBjYnMgPSB7fTtcblxuICB2YXIgbW9kdWxlcyA9IGJhY2tlbmQubW9kdWxlcztcbiAgdmFyIG5vZGVPcHMgPSBiYWNrZW5kLm5vZGVPcHM7XG5cbiAgZm9yIChpID0gMDsgaSA8IGhvb2tzJDEubGVuZ3RoOyArK2kpIHtcbiAgICBjYnNbaG9va3MkMVtpXV0gPSBbXTtcbiAgICBmb3IgKGogPSAwOyBqIDwgbW9kdWxlcy5sZW5ndGg7ICsraikge1xuICAgICAgaWYgKG1vZHVsZXNbal1baG9va3MkMVtpXV0gIT09IHVuZGVmaW5lZCkgeyBjYnNbaG9va3MkMVtpXV0ucHVzaChtb2R1bGVzW2pdW2hvb2tzJDFbaV1dKTsgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVtcHR5Tm9kZUF0IChlbG0pIHtcbiAgICByZXR1cm4gbmV3IFZOb2RlKG5vZGVPcHMudGFnTmFtZShlbG0pLnRvTG93ZXJDYXNlKCksIHt9LCBbXSwgdW5kZWZpbmVkLCBlbG0pXG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVSbUNiIChjaGlsZEVsbSwgbGlzdGVuZXJzKSB7XG4gICAgZnVuY3Rpb24gcmVtb3ZlJCQxICgpIHtcbiAgICAgIGlmICgtLXJlbW92ZSQkMS5saXN0ZW5lcnMgPT09IDApIHtcbiAgICAgICAgcmVtb3ZlTm9kZShjaGlsZEVsbSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlbW92ZSQkMS5saXN0ZW5lcnMgPSBsaXN0ZW5lcnM7XG4gICAgcmV0dXJuIHJlbW92ZSQkMVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlTm9kZSAoZWwpIHtcbiAgICB2YXIgcGFyZW50ID0gbm9kZU9wcy5wYXJlbnROb2RlKGVsKTtcbiAgICAvLyBlbGVtZW50IG1heSBoYXZlIGFscmVhZHkgYmVlbiByZW1vdmVkIGR1ZSB0byB2LWh0bWwgLyB2LXRleHRcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBub2RlT3BzLnJlbW92ZUNoaWxkKHBhcmVudCwgZWwpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBpblByZSA9IDA7XG4gIGZ1bmN0aW9uIGNyZWF0ZUVsbSAodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgcGFyZW50RWxtLCByZWZFbG0sIG5lc3RlZCkge1xuICAgIHZub2RlLmlzUm9vdEluc2VydCA9ICFuZXN0ZWQ7IC8vIGZvciB0cmFuc2l0aW9uIGVudGVyIGNoZWNrXG4gICAgaWYgKGNyZWF0ZUNvbXBvbmVudCh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBwYXJlbnRFbG0sIHJlZkVsbSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHZhciBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICB2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbjtcbiAgICB2YXIgdGFnID0gdm5vZGUudGFnO1xuICAgIGlmIChpc0RlZih0YWcpKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnByZSkge1xuICAgICAgICAgIGluUHJlKys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICFpblByZSAmJlxuICAgICAgICAgICF2bm9kZS5ucyAmJlxuICAgICAgICAgICEoY29uZmlnLmlnbm9yZWRFbGVtZW50cy5sZW5ndGggJiYgY29uZmlnLmlnbm9yZWRFbGVtZW50cy5pbmRleE9mKHRhZykgPiAtMSkgJiZcbiAgICAgICAgICBjb25maWcuaXNVbmtub3duRWxlbWVudCh0YWcpXG4gICAgICAgICkge1xuICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICAnVW5rbm93biBjdXN0b20gZWxlbWVudDogPCcgKyB0YWcgKyAnPiAtIGRpZCB5b3UgJyArXG4gICAgICAgICAgICAncmVnaXN0ZXIgdGhlIGNvbXBvbmVudCBjb3JyZWN0bHk/IEZvciByZWN1cnNpdmUgY29tcG9uZW50cywgJyArXG4gICAgICAgICAgICAnbWFrZSBzdXJlIHRvIHByb3ZpZGUgdGhlIFwibmFtZVwiIG9wdGlvbi4nLFxuICAgICAgICAgICAgdm5vZGUuY29udGV4dFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZub2RlLmVsbSA9IHZub2RlLm5zXG4gICAgICAgID8gbm9kZU9wcy5jcmVhdGVFbGVtZW50TlModm5vZGUubnMsIHRhZylcbiAgICAgICAgOiBub2RlT3BzLmNyZWF0ZUVsZW1lbnQodGFnLCB2bm9kZSk7XG4gICAgICBzZXRTY29wZSh2bm9kZSk7XG5cbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAge1xuICAgICAgICBjcmVhdGVDaGlsZHJlbih2bm9kZSwgY2hpbGRyZW4sIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgIGlmIChpc0RlZihkYXRhKSkge1xuICAgICAgICAgIGludm9rZUNyZWF0ZUhvb2tzKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICB9XG4gICAgICAgIGluc2VydChwYXJlbnRFbG0sIHZub2RlLmVsbSwgcmVmRWxtKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgZGF0YSAmJiBkYXRhLnByZSkge1xuICAgICAgICBpblByZS0tO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodm5vZGUuaXNDb21tZW50KSB7XG4gICAgICB2bm9kZS5lbG0gPSBub2RlT3BzLmNyZWF0ZUNvbW1lbnQodm5vZGUudGV4dCk7XG4gICAgICBpbnNlcnQocGFyZW50RWxtLCB2bm9kZS5lbG0sIHJlZkVsbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZub2RlLmVsbSA9IG5vZGVPcHMuY3JlYXRlVGV4dE5vZGUodm5vZGUudGV4dCk7XG4gICAgICBpbnNlcnQocGFyZW50RWxtLCB2bm9kZS5lbG0sIHJlZkVsbSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ29tcG9uZW50ICh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBwYXJlbnRFbG0sIHJlZkVsbSkge1xuICAgIHZhciBpID0gdm5vZGUuZGF0YTtcbiAgICBpZiAoaXNEZWYoaSkpIHtcbiAgICAgIHZhciBpc1JlYWN0aXZhdGVkID0gaXNEZWYodm5vZGUuY29tcG9uZW50SW5zdGFuY2UpICYmIGkua2VlcEFsaXZlO1xuICAgICAgaWYgKGlzRGVmKGkgPSBpLmhvb2spICYmIGlzRGVmKGkgPSBpLmluaXQpKSB7XG4gICAgICAgIGkodm5vZGUsIGZhbHNlIC8qIGh5ZHJhdGluZyAqLywgcGFyZW50RWxtLCByZWZFbG0pO1xuICAgICAgfVxuICAgICAgLy8gYWZ0ZXIgY2FsbGluZyB0aGUgaW5pdCBob29rLCBpZiB0aGUgdm5vZGUgaXMgYSBjaGlsZCBjb21wb25lbnRcbiAgICAgIC8vIGl0IHNob3VsZCd2ZSBjcmVhdGVkIGEgY2hpbGQgaW5zdGFuY2UgYW5kIG1vdW50ZWQgaXQuIHRoZSBjaGlsZFxuICAgICAgLy8gY29tcG9uZW50IGFsc28gaGFzIHNldCB0aGUgcGxhY2Vob2xkZXIgdm5vZGUncyBlbG0uXG4gICAgICAvLyBpbiB0aGF0IGNhc2Ugd2UgY2FuIGp1c3QgcmV0dXJuIHRoZSBlbGVtZW50IGFuZCBiZSBkb25lLlxuICAgICAgaWYgKGlzRGVmKHZub2RlLmNvbXBvbmVudEluc3RhbmNlKSkge1xuICAgICAgICBpbml0Q29tcG9uZW50KHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICBpZiAoaXNSZWFjdGl2YXRlZCkge1xuICAgICAgICAgIHJlYWN0aXZhdGVDb21wb25lbnQodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgcGFyZW50RWxtLCByZWZFbG0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW5pdENvbXBvbmVudCAodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgIGlmICh2bm9kZS5kYXRhLnBlbmRpbmdJbnNlcnQpIHtcbiAgICAgIGluc2VydGVkVm5vZGVRdWV1ZS5wdXNoLmFwcGx5KGluc2VydGVkVm5vZGVRdWV1ZSwgdm5vZGUuZGF0YS5wZW5kaW5nSW5zZXJ0KTtcbiAgICB9XG4gICAgdm5vZGUuZWxtID0gdm5vZGUuY29tcG9uZW50SW5zdGFuY2UuJGVsO1xuICAgIGlmIChpc1BhdGNoYWJsZSh2bm9kZSkpIHtcbiAgICAgIGludm9rZUNyZWF0ZUhvb2tzKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgc2V0U2NvcGUodm5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlbXB0eSBjb21wb25lbnQgcm9vdC5cbiAgICAgIC8vIHNraXAgYWxsIGVsZW1lbnQtcmVsYXRlZCBtb2R1bGVzIGV4Y2VwdCBmb3IgcmVmICgjMzQ1NSlcbiAgICAgIHJlZ2lzdGVyUmVmKHZub2RlKTtcbiAgICAgIC8vIG1ha2Ugc3VyZSB0byBpbnZva2UgdGhlIGluc2VydCBob29rXG4gICAgICBpbnNlcnRlZFZub2RlUXVldWUucHVzaCh2bm9kZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhY3RpdmF0ZUNvbXBvbmVudCAodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgcGFyZW50RWxtLCByZWZFbG0pIHtcbiAgICB2YXIgaTtcbiAgICAvLyBoYWNrIGZvciAjNDMzOTogYSByZWFjdGl2YXRlZCBjb21wb25lbnQgd2l0aCBpbm5lciB0cmFuc2l0aW9uXG4gICAgLy8gZG9lcyBub3QgdHJpZ2dlciBiZWNhdXNlIHRoZSBpbm5lciBub2RlJ3MgY3JlYXRlZCBob29rcyBhcmUgbm90IGNhbGxlZFxuICAgIC8vIGFnYWluLiBJdCdzIG5vdCBpZGVhbCB0byBpbnZvbHZlIG1vZHVsZS1zcGVjaWZpYyBsb2dpYyBpbiBoZXJlIGJ1dFxuICAgIC8vIHRoZXJlIGRvZXNuJ3Qgc2VlbSB0byBiZSBhIGJldHRlciB3YXkgdG8gZG8gaXQuXG4gICAgdmFyIGlubmVyTm9kZSA9IHZub2RlO1xuICAgIHdoaWxlIChpbm5lck5vZGUuY29tcG9uZW50SW5zdGFuY2UpIHtcbiAgICAgIGlubmVyTm9kZSA9IGlubmVyTm9kZS5jb21wb25lbnRJbnN0YW5jZS5fdm5vZGU7XG4gICAgICBpZiAoaXNEZWYoaSA9IGlubmVyTm9kZS5kYXRhKSAmJiBpc0RlZihpID0gaS50cmFuc2l0aW9uKSkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLmFjdGl2YXRlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgY2JzLmFjdGl2YXRlW2ldKGVtcHR5Tm9kZSwgaW5uZXJOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBpbnNlcnRlZFZub2RlUXVldWUucHVzaChpbm5lck5vZGUpO1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cbiAgICAvLyB1bmxpa2UgYSBuZXdseSBjcmVhdGVkIGNvbXBvbmVudCxcbiAgICAvLyBhIHJlYWN0aXZhdGVkIGtlZXAtYWxpdmUgY29tcG9uZW50IGRvZXNuJ3QgaW5zZXJ0IGl0c2VsZlxuICAgIGluc2VydChwYXJlbnRFbG0sIHZub2RlLmVsbSwgcmVmRWxtKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluc2VydCAocGFyZW50LCBlbG0sIHJlZikge1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIGlmIChyZWYpIHtcbiAgICAgICAgbm9kZU9wcy5pbnNlcnRCZWZvcmUocGFyZW50LCBlbG0sIHJlZik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlT3BzLmFwcGVuZENoaWxkKHBhcmVudCwgZWxtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVDaGlsZHJlbiAodm5vZGUsIGNoaWxkcmVuLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY3JlYXRlRWxtKGNoaWxkcmVuW2ldLCBpbnNlcnRlZFZub2RlUXVldWUsIHZub2RlLmVsbSwgbnVsbCwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1ByaW1pdGl2ZSh2bm9kZS50ZXh0KSkge1xuICAgICAgbm9kZU9wcy5hcHBlbmRDaGlsZCh2bm9kZS5lbG0sIG5vZGVPcHMuY3JlYXRlVGV4dE5vZGUodm5vZGUudGV4dCkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzUGF0Y2hhYmxlICh2bm9kZSkge1xuICAgIHdoaWxlICh2bm9kZS5jb21wb25lbnRJbnN0YW5jZSkge1xuICAgICAgdm5vZGUgPSB2bm9kZS5jb21wb25lbnRJbnN0YW5jZS5fdm5vZGU7XG4gICAgfVxuICAgIHJldHVybiBpc0RlZih2bm9kZS50YWcpXG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VDcmVhdGVIb29rcyAodm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkge1xuICAgIGZvciAodmFyIGkkMSA9IDA7IGkkMSA8IGNicy5jcmVhdGUubGVuZ3RoOyArK2kkMSkge1xuICAgICAgY2JzLmNyZWF0ZVtpJDFdKGVtcHR5Tm9kZSwgdm5vZGUpO1xuICAgIH1cbiAgICBpID0gdm5vZGUuZGF0YS5ob29rOyAvLyBSZXVzZSB2YXJpYWJsZVxuICAgIGlmIChpc0RlZihpKSkge1xuICAgICAgaWYgKGkuY3JlYXRlKSB7IGkuY3JlYXRlKGVtcHR5Tm9kZSwgdm5vZGUpOyB9XG4gICAgICBpZiAoaS5pbnNlcnQpIHsgaW5zZXJ0ZWRWbm9kZVF1ZXVlLnB1c2godm5vZGUpOyB9XG4gICAgfVxuICB9XG5cbiAgLy8gc2V0IHNjb3BlIGlkIGF0dHJpYnV0ZSBmb3Igc2NvcGVkIENTUy5cbiAgLy8gdGhpcyBpcyBpbXBsZW1lbnRlZCBhcyBhIHNwZWNpYWwgY2FzZSB0byBhdm9pZCB0aGUgb3ZlcmhlYWRcbiAgLy8gb2YgZ29pbmcgdGhyb3VnaCB0aGUgbm9ybWFsIGF0dHJpYnV0ZSBwYXRjaGluZyBwcm9jZXNzLlxuICBmdW5jdGlvbiBzZXRTY29wZSAodm5vZGUpIHtcbiAgICB2YXIgaTtcbiAgICB2YXIgYW5jZXN0b3IgPSB2bm9kZTtcbiAgICB3aGlsZSAoYW5jZXN0b3IpIHtcbiAgICAgIGlmIChpc0RlZihpID0gYW5jZXN0b3IuY29udGV4dCkgJiYgaXNEZWYoaSA9IGkuJG9wdGlvbnMuX3Njb3BlSWQpKSB7XG4gICAgICAgIG5vZGVPcHMuc2V0QXR0cmlidXRlKHZub2RlLmVsbSwgaSwgJycpO1xuICAgICAgfVxuICAgICAgYW5jZXN0b3IgPSBhbmNlc3Rvci5wYXJlbnQ7XG4gICAgfVxuICAgIC8vIGZvciBzbG90IGNvbnRlbnQgdGhleSBzaG91bGQgYWxzbyBnZXQgdGhlIHNjb3BlSWQgZnJvbSB0aGUgaG9zdCBpbnN0YW5jZS5cbiAgICBpZiAoaXNEZWYoaSA9IGFjdGl2ZUluc3RhbmNlKSAmJlxuICAgICAgICBpICE9PSB2bm9kZS5jb250ZXh0ICYmXG4gICAgICAgIGlzRGVmKGkgPSBpLiRvcHRpb25zLl9zY29wZUlkKSkge1xuICAgICAgbm9kZU9wcy5zZXRBdHRyaWJ1dGUodm5vZGUuZWxtLCBpLCAnJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkVm5vZGVzIChwYXJlbnRFbG0sIHJlZkVsbSwgdm5vZGVzLCBzdGFydElkeCwgZW5kSWR4LCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICBmb3IgKDsgc3RhcnRJZHggPD0gZW5kSWR4OyArK3N0YXJ0SWR4KSB7XG4gICAgICBjcmVhdGVFbG0odm5vZGVzW3N0YXJ0SWR4XSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBwYXJlbnRFbG0sIHJlZkVsbSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlRGVzdHJveUhvb2sgKHZub2RlKSB7XG4gICAgdmFyIGksIGo7XG4gICAgdmFyIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgIGlmIChpc0RlZihkYXRhKSkge1xuICAgICAgaWYgKGlzRGVmKGkgPSBkYXRhLmhvb2spICYmIGlzRGVmKGkgPSBpLmRlc3Ryb3kpKSB7IGkodm5vZGUpOyB9XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLmRlc3Ryb3kubGVuZ3RoOyArK2kpIHsgY2JzLmRlc3Ryb3lbaV0odm5vZGUpOyB9XG4gICAgfVxuICAgIGlmIChpc0RlZihpID0gdm5vZGUuY2hpbGRyZW4pKSB7XG4gICAgICBmb3IgKGogPSAwOyBqIDwgdm5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2opIHtcbiAgICAgICAgaW52b2tlRGVzdHJveUhvb2sodm5vZGUuY2hpbGRyZW5bal0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVZub2RlcyAocGFyZW50RWxtLCB2bm9kZXMsIHN0YXJ0SWR4LCBlbmRJZHgpIHtcbiAgICBmb3IgKDsgc3RhcnRJZHggPD0gZW5kSWR4OyArK3N0YXJ0SWR4KSB7XG4gICAgICB2YXIgY2ggPSB2bm9kZXNbc3RhcnRJZHhdO1xuICAgICAgaWYgKGlzRGVmKGNoKSkge1xuICAgICAgICBpZiAoaXNEZWYoY2gudGFnKSkge1xuICAgICAgICAgIHJlbW92ZUFuZEludm9rZVJlbW92ZUhvb2soY2gpO1xuICAgICAgICAgIGludm9rZURlc3Ryb3lIb29rKGNoKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gVGV4dCBub2RlXG4gICAgICAgICAgcmVtb3ZlTm9kZShjaC5lbG0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQW5kSW52b2tlUmVtb3ZlSG9vayAodm5vZGUsIHJtKSB7XG4gICAgaWYgKHJtIHx8IGlzRGVmKHZub2RlLmRhdGEpKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzID0gY2JzLnJlbW92ZS5sZW5ndGggKyAxO1xuICAgICAgaWYgKCFybSkge1xuICAgICAgICAvLyBkaXJlY3RseSByZW1vdmluZ1xuICAgICAgICBybSA9IGNyZWF0ZVJtQ2Iodm5vZGUuZWxtLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gd2UgaGF2ZSBhIHJlY3Vyc2l2ZWx5IHBhc3NlZCBkb3duIHJtIGNhbGxiYWNrXG4gICAgICAgIC8vIGluY3JlYXNlIHRoZSBsaXN0ZW5lcnMgY291bnRcbiAgICAgICAgcm0ubGlzdGVuZXJzICs9IGxpc3RlbmVycztcbiAgICAgIH1cbiAgICAgIC8vIHJlY3Vyc2l2ZWx5IGludm9rZSBob29rcyBvbiBjaGlsZCBjb21wb25lbnQgcm9vdCBub2RlXG4gICAgICBpZiAoaXNEZWYoaSA9IHZub2RlLmNvbXBvbmVudEluc3RhbmNlKSAmJiBpc0RlZihpID0gaS5fdm5vZGUpICYmIGlzRGVmKGkuZGF0YSkpIHtcbiAgICAgICAgcmVtb3ZlQW5kSW52b2tlUmVtb3ZlSG9vayhpLCBybSk7XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnJlbW92ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBjYnMucmVtb3ZlW2ldKHZub2RlLCBybSk7XG4gICAgICB9XG4gICAgICBpZiAoaXNEZWYoaSA9IHZub2RlLmRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkucmVtb3ZlKSkge1xuICAgICAgICBpKHZub2RlLCBybSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBybSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmVOb2RlKHZub2RlLmVsbSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQ2hpbGRyZW4gKHBhcmVudEVsbSwgb2xkQ2gsIG5ld0NoLCBpbnNlcnRlZFZub2RlUXVldWUsIHJlbW92ZU9ubHkpIHtcbiAgICB2YXIgb2xkU3RhcnRJZHggPSAwO1xuICAgIHZhciBuZXdTdGFydElkeCA9IDA7XG4gICAgdmFyIG9sZEVuZElkeCA9IG9sZENoLmxlbmd0aCAtIDE7XG4gICAgdmFyIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFswXTtcbiAgICB2YXIgb2xkRW5kVm5vZGUgPSBvbGRDaFtvbGRFbmRJZHhdO1xuICAgIHZhciBuZXdFbmRJZHggPSBuZXdDaC5sZW5ndGggLSAxO1xuICAgIHZhciBuZXdTdGFydFZub2RlID0gbmV3Q2hbMF07XG4gICAgdmFyIG5ld0VuZFZub2RlID0gbmV3Q2hbbmV3RW5kSWR4XTtcbiAgICB2YXIgb2xkS2V5VG9JZHgsIGlkeEluT2xkLCBlbG1Ub01vdmUsIHJlZkVsbTtcblxuICAgIC8vIHJlbW92ZU9ubHkgaXMgYSBzcGVjaWFsIGZsYWcgdXNlZCBvbmx5IGJ5IDx0cmFuc2l0aW9uLWdyb3VwPlxuICAgIC8vIHRvIGVuc3VyZSByZW1vdmVkIGVsZW1lbnRzIHN0YXkgaW4gY29ycmVjdCByZWxhdGl2ZSBwb3NpdGlvbnNcbiAgICAvLyBkdXJpbmcgbGVhdmluZyB0cmFuc2l0aW9uc1xuICAgIHZhciBjYW5Nb3ZlID0gIXJlbW92ZU9ubHk7XG5cbiAgICB3aGlsZSAob2xkU3RhcnRJZHggPD0gb2xkRW5kSWR4ICYmIG5ld1N0YXJ0SWR4IDw9IG5ld0VuZElkeCkge1xuICAgICAgaWYgKGlzVW5kZWYob2xkU3RhcnRWbm9kZSkpIHtcbiAgICAgICAgb2xkU3RhcnRWbm9kZSA9IG9sZENoWysrb2xkU3RhcnRJZHhdOyAvLyBWbm9kZSBoYXMgYmVlbiBtb3ZlZCBsZWZ0XG4gICAgICB9IGVsc2UgaWYgKGlzVW5kZWYob2xkRW5kVm5vZGUpKSB7XG4gICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgfSBlbHNlIGlmIChzYW1lVm5vZGUob2xkU3RhcnRWbm9kZSwgbmV3U3RhcnRWbm9kZSkpIHtcbiAgICAgICAgcGF0Y2hWbm9kZShvbGRTdGFydFZub2RlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICBvbGRTdGFydFZub2RlID0gb2xkQ2hbKytvbGRTdGFydElkeF07XG4gICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgIH0gZWxzZSBpZiAoc2FtZVZub2RlKG9sZEVuZFZub2RlLCBuZXdFbmRWbm9kZSkpIHtcbiAgICAgICAgcGF0Y2hWbm9kZShvbGRFbmRWbm9kZSwgbmV3RW5kVm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICBuZXdFbmRWbm9kZSA9IG5ld0NoWy0tbmV3RW5kSWR4XTtcbiAgICAgIH0gZWxzZSBpZiAoc2FtZVZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld0VuZFZub2RlKSkgeyAvLyBWbm9kZSBtb3ZlZCByaWdodFxuICAgICAgICBwYXRjaFZub2RlKG9sZFN0YXJ0Vm5vZGUsIG5ld0VuZFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICBjYW5Nb3ZlICYmIG5vZGVPcHMuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgb2xkU3RhcnRWbm9kZS5lbG0sIG5vZGVPcHMubmV4dFNpYmxpbmcob2xkRW5kVm5vZGUuZWxtKSk7XG4gICAgICAgIG9sZFN0YXJ0Vm5vZGUgPSBvbGRDaFsrK29sZFN0YXJ0SWR4XTtcbiAgICAgICAgbmV3RW5kVm5vZGUgPSBuZXdDaFstLW5ld0VuZElkeF07XG4gICAgICB9IGVsc2UgaWYgKHNhbWVWbm9kZShvbGRFbmRWbm9kZSwgbmV3U3RhcnRWbm9kZSkpIHsgLy8gVm5vZGUgbW92ZWQgbGVmdFxuICAgICAgICBwYXRjaFZub2RlKG9sZEVuZFZub2RlLCBuZXdTdGFydFZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICBjYW5Nb3ZlICYmIG5vZGVPcHMuaW5zZXJ0QmVmb3JlKHBhcmVudEVsbSwgb2xkRW5kVm5vZGUuZWxtLCBvbGRTdGFydFZub2RlLmVsbSk7XG4gICAgICAgIG9sZEVuZFZub2RlID0gb2xkQ2hbLS1vbGRFbmRJZHhdO1xuICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNVbmRlZihvbGRLZXlUb0lkeCkpIHsgb2xkS2V5VG9JZHggPSBjcmVhdGVLZXlUb09sZElkeChvbGRDaCwgb2xkU3RhcnRJZHgsIG9sZEVuZElkeCk7IH1cbiAgICAgICAgaWR4SW5PbGQgPSBpc0RlZihuZXdTdGFydFZub2RlLmtleSkgPyBvbGRLZXlUb0lkeFtuZXdTdGFydFZub2RlLmtleV0gOiBudWxsO1xuICAgICAgICBpZiAoaXNVbmRlZihpZHhJbk9sZCkpIHsgLy8gTmV3IGVsZW1lbnRcbiAgICAgICAgICBjcmVhdGVFbG0obmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBwYXJlbnRFbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICBuZXdTdGFydFZub2RlID0gbmV3Q2hbKytuZXdTdGFydElkeF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWxtVG9Nb3ZlID0gb2xkQ2hbaWR4SW5PbGRdO1xuICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmICFlbG1Ub01vdmUpIHtcbiAgICAgICAgICAgIHdhcm4oXG4gICAgICAgICAgICAgICdJdCBzZWVtcyB0aGVyZSBhcmUgZHVwbGljYXRlIGtleXMgdGhhdCBpcyBjYXVzaW5nIGFuIHVwZGF0ZSBlcnJvci4gJyArXG4gICAgICAgICAgICAgICdNYWtlIHN1cmUgZWFjaCB2LWZvciBpdGVtIGhhcyBhIHVuaXF1ZSBrZXkuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNhbWVWbm9kZShlbG1Ub01vdmUsIG5ld1N0YXJ0Vm5vZGUpKSB7XG4gICAgICAgICAgICBwYXRjaFZub2RlKGVsbVRvTW92ZSwgbmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlKTtcbiAgICAgICAgICAgIG9sZENoW2lkeEluT2xkXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNhbk1vdmUgJiYgbm9kZU9wcy5pbnNlcnRCZWZvcmUocGFyZW50RWxtLCBuZXdTdGFydFZub2RlLmVsbSwgb2xkU3RhcnRWbm9kZS5lbG0pO1xuICAgICAgICAgICAgbmV3U3RhcnRWbm9kZSA9IG5ld0NoWysrbmV3U3RhcnRJZHhdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBzYW1lIGtleSBidXQgZGlmZmVyZW50IGVsZW1lbnQuIHRyZWF0IGFzIG5ldyBlbGVtZW50XG4gICAgICAgICAgICBjcmVhdGVFbG0obmV3U3RhcnRWbm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBwYXJlbnRFbG0sIG9sZFN0YXJ0Vm5vZGUuZWxtKTtcbiAgICAgICAgICAgIG5ld1N0YXJ0Vm5vZGUgPSBuZXdDaFsrK25ld1N0YXJ0SWR4XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKG9sZFN0YXJ0SWR4ID4gb2xkRW5kSWR4KSB7XG4gICAgICByZWZFbG0gPSBpc1VuZGVmKG5ld0NoW25ld0VuZElkeCArIDFdKSA/IG51bGwgOiBuZXdDaFtuZXdFbmRJZHggKyAxXS5lbG07XG4gICAgICBhZGRWbm9kZXMocGFyZW50RWxtLCByZWZFbG0sIG5ld0NoLCBuZXdTdGFydElkeCwgbmV3RW5kSWR4LCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgIH0gZWxzZSBpZiAobmV3U3RhcnRJZHggPiBuZXdFbmRJZHgpIHtcbiAgICAgIHJlbW92ZVZub2RlcyhwYXJlbnRFbG0sIG9sZENoLCBvbGRTdGFydElkeCwgb2xkRW5kSWR4KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYXRjaFZub2RlIChvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSwgcmVtb3ZlT25seSkge1xuICAgIGlmIChvbGRWbm9kZSA9PT0gdm5vZGUpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICAvLyByZXVzZSBlbGVtZW50IGZvciBzdGF0aWMgdHJlZXMuXG4gICAgLy8gbm90ZSB3ZSBvbmx5IGRvIHRoaXMgaWYgdGhlIHZub2RlIGlzIGNsb25lZCAtXG4gICAgLy8gaWYgdGhlIG5ldyBub2RlIGlzIG5vdCBjbG9uZWQgaXQgbWVhbnMgdGhlIHJlbmRlciBmdW5jdGlvbnMgaGF2ZSBiZWVuXG4gICAgLy8gcmVzZXQgYnkgdGhlIGhvdC1yZWxvYWQtYXBpIGFuZCB3ZSBuZWVkIHRvIGRvIGEgcHJvcGVyIHJlLXJlbmRlci5cbiAgICBpZiAodm5vZGUuaXNTdGF0aWMgJiZcbiAgICAgICAgb2xkVm5vZGUuaXNTdGF0aWMgJiZcbiAgICAgICAgdm5vZGUua2V5ID09PSBvbGRWbm9kZS5rZXkgJiZcbiAgICAgICAgKHZub2RlLmlzQ2xvbmVkIHx8IHZub2RlLmlzT25jZSkpIHtcbiAgICAgIHZub2RlLmVsbSA9IG9sZFZub2RlLmVsbTtcbiAgICAgIHZub2RlLmNvbXBvbmVudEluc3RhbmNlID0gb2xkVm5vZGUuY29tcG9uZW50SW5zdGFuY2U7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdmFyIGk7XG4gICAgdmFyIGRhdGEgPSB2bm9kZS5kYXRhO1xuICAgIHZhciBoYXNEYXRhID0gaXNEZWYoZGF0YSk7XG4gICAgaWYgKGhhc0RhdGEgJiYgaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkucHJlcGF0Y2gpKSB7XG4gICAgICBpKG9sZFZub2RlLCB2bm9kZSk7XG4gICAgfVxuICAgIHZhciBlbG0gPSB2bm9kZS5lbG0gPSBvbGRWbm9kZS5lbG07XG4gICAgdmFyIG9sZENoID0gb2xkVm5vZGUuY2hpbGRyZW47XG4gICAgdmFyIGNoID0gdm5vZGUuY2hpbGRyZW47XG4gICAgaWYgKGhhc0RhdGEgJiYgaXNQYXRjaGFibGUodm5vZGUpKSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgY2JzLnVwZGF0ZS5sZW5ndGg7ICsraSkgeyBjYnMudXBkYXRlW2ldKG9sZFZub2RlLCB2bm9kZSk7IH1cbiAgICAgIGlmIChpc0RlZihpID0gZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS51cGRhdGUpKSB7IGkob2xkVm5vZGUsIHZub2RlKTsgfVxuICAgIH1cbiAgICBpZiAoaXNVbmRlZih2bm9kZS50ZXh0KSkge1xuICAgICAgaWYgKGlzRGVmKG9sZENoKSAmJiBpc0RlZihjaCkpIHtcbiAgICAgICAgaWYgKG9sZENoICE9PSBjaCkgeyB1cGRhdGVDaGlsZHJlbihlbG0sIG9sZENoLCBjaCwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCByZW1vdmVPbmx5KTsgfVxuICAgICAgfSBlbHNlIGlmIChpc0RlZihjaCkpIHtcbiAgICAgICAgaWYgKGlzRGVmKG9sZFZub2RlLnRleHQpKSB7IG5vZGVPcHMuc2V0VGV4dENvbnRlbnQoZWxtLCAnJyk7IH1cbiAgICAgICAgYWRkVm5vZGVzKGVsbSwgbnVsbCwgY2gsIDAsIGNoLmxlbmd0aCAtIDEsIGluc2VydGVkVm5vZGVRdWV1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGlzRGVmKG9sZENoKSkge1xuICAgICAgICByZW1vdmVWbm9kZXMoZWxtLCBvbGRDaCwgMCwgb2xkQ2gubGVuZ3RoIC0gMSk7XG4gICAgICB9IGVsc2UgaWYgKGlzRGVmKG9sZFZub2RlLnRleHQpKSB7XG4gICAgICAgIG5vZGVPcHMuc2V0VGV4dENvbnRlbnQoZWxtLCAnJyk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvbGRWbm9kZS50ZXh0ICE9PSB2bm9kZS50ZXh0KSB7XG4gICAgICBub2RlT3BzLnNldFRleHRDb250ZW50KGVsbSwgdm5vZGUudGV4dCk7XG4gICAgfVxuICAgIGlmIChoYXNEYXRhKSB7XG4gICAgICBpZiAoaXNEZWYoaSA9IGRhdGEuaG9vaykgJiYgaXNEZWYoaSA9IGkucG9zdHBhdGNoKSkgeyBpKG9sZFZub2RlLCB2bm9kZSk7IH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VJbnNlcnRIb29rICh2bm9kZSwgcXVldWUsIGluaXRpYWwpIHtcbiAgICAvLyBkZWxheSBpbnNlcnQgaG9va3MgZm9yIGNvbXBvbmVudCByb290IG5vZGVzLCBpbnZva2UgdGhlbSBhZnRlciB0aGVcbiAgICAvLyBlbGVtZW50IGlzIHJlYWxseSBpbnNlcnRlZFxuICAgIGlmIChpbml0aWFsICYmIHZub2RlLnBhcmVudCkge1xuICAgICAgdm5vZGUucGFyZW50LmRhdGEucGVuZGluZ0luc2VydCA9IHF1ZXVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXVlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHF1ZXVlW2ldLmRhdGEuaG9vay5pbnNlcnQocXVldWVbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBiYWlsZWQgPSBmYWxzZTtcbiAgLy8gbGlzdCBvZiBtb2R1bGVzIHRoYXQgY2FuIHNraXAgY3JlYXRlIGhvb2sgZHVyaW5nIGh5ZHJhdGlvbiBiZWNhdXNlIHRoZXlcbiAgLy8gYXJlIGFscmVhZHkgcmVuZGVyZWQgb24gdGhlIGNsaWVudCBvciBoYXMgbm8gbmVlZCBmb3IgaW5pdGlhbGl6YXRpb25cbiAgdmFyIGlzUmVuZGVyZWRNb2R1bGUgPSBtYWtlTWFwKCdhdHRycyxzdHlsZSxjbGFzcyxzdGF0aWNDbGFzcyxzdGF0aWNTdHlsZSxrZXknKTtcblxuICAvLyBOb3RlOiB0aGlzIGlzIGEgYnJvd3Nlci1vbmx5IGZ1bmN0aW9uIHNvIHdlIGNhbiBhc3N1bWUgZWxtcyBhcmUgRE9NIG5vZGVzLlxuICBmdW5jdGlvbiBoeWRyYXRlIChlbG0sIHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKCFhc3NlcnROb2RlTWF0Y2goZWxtLCB2bm9kZSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICAgIHZub2RlLmVsbSA9IGVsbTtcbiAgICB2YXIgdGFnID0gdm5vZGUudGFnO1xuICAgIHZhciBkYXRhID0gdm5vZGUuZGF0YTtcbiAgICB2YXIgY2hpbGRyZW4gPSB2bm9kZS5jaGlsZHJlbjtcbiAgICBpZiAoaXNEZWYoZGF0YSkpIHtcbiAgICAgIGlmIChpc0RlZihpID0gZGF0YS5ob29rKSAmJiBpc0RlZihpID0gaS5pbml0KSkgeyBpKHZub2RlLCB0cnVlIC8qIGh5ZHJhdGluZyAqLyk7IH1cbiAgICAgIGlmIChpc0RlZihpID0gdm5vZGUuY29tcG9uZW50SW5zdGFuY2UpKSB7XG4gICAgICAgIC8vIGNoaWxkIGNvbXBvbmVudC4gaXQgc2hvdWxkIGhhdmUgaHlkcmF0ZWQgaXRzIG93biB0cmVlLlxuICAgICAgICBpbml0Q29tcG9uZW50KHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNEZWYodGFnKSkge1xuICAgICAgaWYgKGlzRGVmKGNoaWxkcmVuKSkge1xuICAgICAgICAvLyBlbXB0eSBlbGVtZW50LCBhbGxvdyBjbGllbnQgdG8gcGljayB1cCBhbmQgcG9wdWxhdGUgY2hpbGRyZW5cbiAgICAgICAgaWYgKCFlbG0uaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICAgICAgY3JlYXRlQ2hpbGRyZW4odm5vZGUsIGNoaWxkcmVuLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBjaGlsZHJlbk1hdGNoID0gdHJ1ZTtcbiAgICAgICAgICB2YXIgY2hpbGROb2RlID0gZWxtLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgZm9yICh2YXIgaSQxID0gMDsgaSQxIDwgY2hpbGRyZW4ubGVuZ3RoOyBpJDErKykge1xuICAgICAgICAgICAgaWYgKCFjaGlsZE5vZGUgfHwgIWh5ZHJhdGUoY2hpbGROb2RlLCBjaGlsZHJlbltpJDFdLCBpbnNlcnRlZFZub2RlUXVldWUpKSB7XG4gICAgICAgICAgICAgIGNoaWxkcmVuTWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoaWxkTm9kZSA9IGNoaWxkTm9kZS5uZXh0U2libGluZztcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gaWYgY2hpbGROb2RlIGlzIG5vdCBudWxsLCBpdCBtZWFucyB0aGUgYWN0dWFsIGNoaWxkTm9kZXMgbGlzdCBpc1xuICAgICAgICAgIC8vIGxvbmdlciB0aGFuIHRoZSB2aXJ0dWFsIGNoaWxkcmVuIGxpc3QuXG4gICAgICAgICAgaWYgKCFjaGlsZHJlbk1hdGNoIHx8IGNoaWxkTm9kZSkge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgICAhYmFpbGVkKSB7XG4gICAgICAgICAgICAgIGJhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGNvbnNvbGUud2FybignUGFyZW50OiAnLCBlbG0pO1xuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ01pc21hdGNoaW5nIGNoaWxkTm9kZXMgdnMuIFZOb2RlczogJywgZWxtLmNoaWxkTm9kZXMsIGNoaWxkcmVuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlzRGVmKGRhdGEpKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgaWYgKCFpc1JlbmRlcmVkTW9kdWxlKGtleSkpIHtcbiAgICAgICAgICAgIGludm9rZUNyZWF0ZUhvb2tzKHZub2RlLCBpbnNlcnRlZFZub2RlUXVldWUpO1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGVsbS5kYXRhICE9PSB2bm9kZS50ZXh0KSB7XG4gICAgICBlbG0uZGF0YSA9IHZub2RlLnRleHQ7XG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBhc3NlcnROb2RlTWF0Y2ggKG5vZGUsIHZub2RlKSB7XG4gICAgaWYgKHZub2RlLnRhZykge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgdm5vZGUudGFnLmluZGV4T2YoJ3Z1ZS1jb21wb25lbnQnKSA9PT0gMCB8fFxuICAgICAgICB2bm9kZS50YWcudG9Mb3dlckNhc2UoKSA9PT0gKG5vZGUudGFnTmFtZSAmJiBub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSlcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09ICh2bm9kZS5pc0NvbW1lbnQgPyA4IDogMylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gcGF0Y2ggKG9sZFZub2RlLCB2bm9kZSwgaHlkcmF0aW5nLCByZW1vdmVPbmx5LCBwYXJlbnRFbG0sIHJlZkVsbSkge1xuICAgIGlmICghdm5vZGUpIHtcbiAgICAgIGlmIChvbGRWbm9kZSkgeyBpbnZva2VEZXN0cm95SG9vayhvbGRWbm9kZSk7IH1cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHZhciBpc0luaXRpYWxQYXRjaCA9IGZhbHNlO1xuICAgIHZhciBpbnNlcnRlZFZub2RlUXVldWUgPSBbXTtcblxuICAgIGlmICghb2xkVm5vZGUpIHtcbiAgICAgIC8vIGVtcHR5IG1vdW50IChsaWtlbHkgYXMgY29tcG9uZW50KSwgY3JlYXRlIG5ldyByb290IGVsZW1lbnRcbiAgICAgIGlzSW5pdGlhbFBhdGNoID0gdHJ1ZTtcbiAgICAgIGNyZWF0ZUVsbSh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBwYXJlbnRFbG0sIHJlZkVsbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBpc1JlYWxFbGVtZW50ID0gaXNEZWYob2xkVm5vZGUubm9kZVR5cGUpO1xuICAgICAgaWYgKCFpc1JlYWxFbGVtZW50ICYmIHNhbWVWbm9kZShvbGRWbm9kZSwgdm5vZGUpKSB7XG4gICAgICAgIC8vIHBhdGNoIGV4aXN0aW5nIHJvb3Qgbm9kZVxuICAgICAgICBwYXRjaFZub2RlKG9sZFZub2RlLCB2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCByZW1vdmVPbmx5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc1JlYWxFbGVtZW50KSB7XG4gICAgICAgICAgLy8gbW91bnRpbmcgdG8gYSByZWFsIGVsZW1lbnRcbiAgICAgICAgICAvLyBjaGVjayBpZiB0aGlzIGlzIHNlcnZlci1yZW5kZXJlZCBjb250ZW50IGFuZCBpZiB3ZSBjYW4gcGVyZm9ybVxuICAgICAgICAgIC8vIGEgc3VjY2Vzc2Z1bCBoeWRyYXRpb24uXG4gICAgICAgICAgaWYgKG9sZFZub2RlLm5vZGVUeXBlID09PSAxICYmIG9sZFZub2RlLmhhc0F0dHJpYnV0ZSgnc2VydmVyLXJlbmRlcmVkJykpIHtcbiAgICAgICAgICAgIG9sZFZub2RlLnJlbW92ZUF0dHJpYnV0ZSgnc2VydmVyLXJlbmRlcmVkJyk7XG4gICAgICAgICAgICBoeWRyYXRpbmcgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaHlkcmF0aW5nKSB7XG4gICAgICAgICAgICBpZiAoaHlkcmF0ZShvbGRWbm9kZSwgdm5vZGUsIGluc2VydGVkVm5vZGVRdWV1ZSkpIHtcbiAgICAgICAgICAgICAgaW52b2tlSW5zZXJ0SG9vayh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9sZFZub2RlXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgd2FybihcbiAgICAgICAgICAgICAgICAnVGhlIGNsaWVudC1zaWRlIHJlbmRlcmVkIHZpcnR1YWwgRE9NIHRyZWUgaXMgbm90IG1hdGNoaW5nICcgK1xuICAgICAgICAgICAgICAgICdzZXJ2ZXItcmVuZGVyZWQgY29udGVudC4gVGhpcyBpcyBsaWtlbHkgY2F1c2VkIGJ5IGluY29ycmVjdCAnICtcbiAgICAgICAgICAgICAgICAnSFRNTCBtYXJrdXAsIGZvciBleGFtcGxlIG5lc3RpbmcgYmxvY2stbGV2ZWwgZWxlbWVudHMgaW5zaWRlICcgK1xuICAgICAgICAgICAgICAgICc8cD4sIG9yIG1pc3NpbmcgPHRib2R5Pi4gQmFpbGluZyBoeWRyYXRpb24gYW5kIHBlcmZvcm1pbmcgJyArXG4gICAgICAgICAgICAgICAgJ2Z1bGwgY2xpZW50LXNpZGUgcmVuZGVyLidcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gZWl0aGVyIG5vdCBzZXJ2ZXItcmVuZGVyZWQsIG9yIGh5ZHJhdGlvbiBmYWlsZWQuXG4gICAgICAgICAgLy8gY3JlYXRlIGFuIGVtcHR5IG5vZGUgYW5kIHJlcGxhY2UgaXRcbiAgICAgICAgICBvbGRWbm9kZSA9IGVtcHR5Tm9kZUF0KG9sZFZub2RlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyByZXBsYWNpbmcgZXhpc3RpbmcgZWxlbWVudFxuICAgICAgICB2YXIgb2xkRWxtID0gb2xkVm5vZGUuZWxtO1xuICAgICAgICB2YXIgcGFyZW50RWxtJDEgPSBub2RlT3BzLnBhcmVudE5vZGUob2xkRWxtKTtcbiAgICAgICAgY3JlYXRlRWxtKFxuICAgICAgICAgIHZub2RlLFxuICAgICAgICAgIGluc2VydGVkVm5vZGVRdWV1ZSxcbiAgICAgICAgICAvLyBleHRyZW1lbHkgcmFyZSBlZGdlIGNhc2U6IGRvIG5vdCBpbnNlcnQgaWYgb2xkIGVsZW1lbnQgaXMgaW4gYVxuICAgICAgICAgIC8vIGxlYXZpbmcgdHJhbnNpdGlvbi4gT25seSBoYXBwZW5zIHdoZW4gY29tYmluaW5nIHRyYW5zaXRpb24gK1xuICAgICAgICAgIC8vIGtlZXAtYWxpdmUgKyBIT0NzLiAoIzQ1OTApXG4gICAgICAgICAgb2xkRWxtLl9sZWF2ZUNiID8gbnVsbCA6IHBhcmVudEVsbSQxLFxuICAgICAgICAgIG5vZGVPcHMubmV4dFNpYmxpbmcob2xkRWxtKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmICh2bm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAvLyBjb21wb25lbnQgcm9vdCBlbGVtZW50IHJlcGxhY2VkLlxuICAgICAgICAgIC8vIHVwZGF0ZSBwYXJlbnQgcGxhY2Vob2xkZXIgbm9kZSBlbGVtZW50LCByZWN1cnNpdmVseVxuICAgICAgICAgIHZhciBhbmNlc3RvciA9IHZub2RlLnBhcmVudDtcbiAgICAgICAgICB3aGlsZSAoYW5jZXN0b3IpIHtcbiAgICAgICAgICAgIGFuY2VzdG9yLmVsbSA9IHZub2RlLmVsbTtcbiAgICAgICAgICAgIGFuY2VzdG9yID0gYW5jZXN0b3IucGFyZW50O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaXNQYXRjaGFibGUodm5vZGUpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNicy5jcmVhdGUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgY2JzLmNyZWF0ZVtpXShlbXB0eU5vZGUsIHZub2RlLnBhcmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmVudEVsbSQxICE9PSBudWxsKSB7XG4gICAgICAgICAgcmVtb3ZlVm5vZGVzKHBhcmVudEVsbSQxLCBbb2xkVm5vZGVdLCAwLCAwKTtcbiAgICAgICAgfSBlbHNlIGlmIChpc0RlZihvbGRWbm9kZS50YWcpKSB7XG4gICAgICAgICAgaW52b2tlRGVzdHJveUhvb2sob2xkVm5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW52b2tlSW5zZXJ0SG9vayh2bm9kZSwgaW5zZXJ0ZWRWbm9kZVF1ZXVlLCBpc0luaXRpYWxQYXRjaCk7XG4gICAgcmV0dXJuIHZub2RlLmVsbVxuICB9XG59XG5cbi8qICAqL1xuXG52YXIgZGlyZWN0aXZlcyA9IHtcbiAgY3JlYXRlOiB1cGRhdGVEaXJlY3RpdmVzLFxuICB1cGRhdGU6IHVwZGF0ZURpcmVjdGl2ZXMsXG4gIGRlc3Ryb3k6IGZ1bmN0aW9uIHVuYmluZERpcmVjdGl2ZXMgKHZub2RlKSB7XG4gICAgdXBkYXRlRGlyZWN0aXZlcyh2bm9kZSwgZW1wdHlOb2RlKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gdXBkYXRlRGlyZWN0aXZlcyAob2xkVm5vZGUsIHZub2RlKSB7XG4gIGlmIChvbGRWbm9kZS5kYXRhLmRpcmVjdGl2ZXMgfHwgdm5vZGUuZGF0YS5kaXJlY3RpdmVzKSB7XG4gICAgX3VwZGF0ZShvbGRWbm9kZSwgdm5vZGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF91cGRhdGUgKG9sZFZub2RlLCB2bm9kZSkge1xuICB2YXIgaXNDcmVhdGUgPSBvbGRWbm9kZSA9PT0gZW1wdHlOb2RlO1xuICB2YXIgaXNEZXN0cm95ID0gdm5vZGUgPT09IGVtcHR5Tm9kZTtcbiAgdmFyIG9sZERpcnMgPSBub3JtYWxpemVEaXJlY3RpdmVzJDEob2xkVm5vZGUuZGF0YS5kaXJlY3RpdmVzLCBvbGRWbm9kZS5jb250ZXh0KTtcbiAgdmFyIG5ld0RpcnMgPSBub3JtYWxpemVEaXJlY3RpdmVzJDEodm5vZGUuZGF0YS5kaXJlY3RpdmVzLCB2bm9kZS5jb250ZXh0KTtcblxuICB2YXIgZGlyc1dpdGhJbnNlcnQgPSBbXTtcbiAgdmFyIGRpcnNXaXRoUG9zdHBhdGNoID0gW107XG5cbiAgdmFyIGtleSwgb2xkRGlyLCBkaXI7XG4gIGZvciAoa2V5IGluIG5ld0RpcnMpIHtcbiAgICBvbGREaXIgPSBvbGREaXJzW2tleV07XG4gICAgZGlyID0gbmV3RGlyc1trZXldO1xuICAgIGlmICghb2xkRGlyKSB7XG4gICAgICAvLyBuZXcgZGlyZWN0aXZlLCBiaW5kXG4gICAgICBjYWxsSG9vayQxKGRpciwgJ2JpbmQnLCB2bm9kZSwgb2xkVm5vZGUpO1xuICAgICAgaWYgKGRpci5kZWYgJiYgZGlyLmRlZi5pbnNlcnRlZCkge1xuICAgICAgICBkaXJzV2l0aEluc2VydC5wdXNoKGRpcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGV4aXN0aW5nIGRpcmVjdGl2ZSwgdXBkYXRlXG4gICAgICBkaXIub2xkVmFsdWUgPSBvbGREaXIudmFsdWU7XG4gICAgICBjYWxsSG9vayQxKGRpciwgJ3VwZGF0ZScsIHZub2RlLCBvbGRWbm9kZSk7XG4gICAgICBpZiAoZGlyLmRlZiAmJiBkaXIuZGVmLmNvbXBvbmVudFVwZGF0ZWQpIHtcbiAgICAgICAgZGlyc1dpdGhQb3N0cGF0Y2gucHVzaChkaXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChkaXJzV2l0aEluc2VydC5sZW5ndGgpIHtcbiAgICB2YXIgY2FsbEluc2VydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlyc1dpdGhJbnNlcnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2FsbEhvb2skMShkaXJzV2l0aEluc2VydFtpXSwgJ2luc2VydGVkJywgdm5vZGUsIG9sZFZub2RlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGlmIChpc0NyZWF0ZSkge1xuICAgICAgbWVyZ2VWTm9kZUhvb2sodm5vZGUuZGF0YS5ob29rIHx8ICh2bm9kZS5kYXRhLmhvb2sgPSB7fSksICdpbnNlcnQnLCBjYWxsSW5zZXJ0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FsbEluc2VydCgpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChkaXJzV2l0aFBvc3RwYXRjaC5sZW5ndGgpIHtcbiAgICBtZXJnZVZOb2RlSG9vayh2bm9kZS5kYXRhLmhvb2sgfHwgKHZub2RlLmRhdGEuaG9vayA9IHt9KSwgJ3Bvc3RwYXRjaCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlyc1dpdGhQb3N0cGF0Y2gubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2FsbEhvb2skMShkaXJzV2l0aFBvc3RwYXRjaFtpXSwgJ2NvbXBvbmVudFVwZGF0ZWQnLCB2bm9kZSwgb2xkVm5vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaWYgKCFpc0NyZWF0ZSkge1xuICAgIGZvciAoa2V5IGluIG9sZERpcnMpIHtcbiAgICAgIGlmICghbmV3RGlyc1trZXldKSB7XG4gICAgICAgIC8vIG5vIGxvbmdlciBwcmVzZW50LCB1bmJpbmRcbiAgICAgICAgY2FsbEhvb2skMShvbGREaXJzW2tleV0sICd1bmJpbmQnLCBvbGRWbm9kZSwgb2xkVm5vZGUsIGlzRGVzdHJveSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbnZhciBlbXB0eU1vZGlmaWVycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZURpcmVjdGl2ZXMkMSAoXG4gIGRpcnMsXG4gIHZtXG4pIHtcbiAgdmFyIHJlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGlmICghZGlycykge1xuICAgIHJldHVybiByZXNcbiAgfVxuICB2YXIgaSwgZGlyO1xuICBmb3IgKGkgPSAwOyBpIDwgZGlycy5sZW5ndGg7IGkrKykge1xuICAgIGRpciA9IGRpcnNbaV07XG4gICAgaWYgKCFkaXIubW9kaWZpZXJzKSB7XG4gICAgICBkaXIubW9kaWZpZXJzID0gZW1wdHlNb2RpZmllcnM7XG4gICAgfVxuICAgIHJlc1tnZXRSYXdEaXJOYW1lKGRpcildID0gZGlyO1xuICAgIGRpci5kZWYgPSByZXNvbHZlQXNzZXQodm0uJG9wdGlvbnMsICdkaXJlY3RpdmVzJywgZGlyLm5hbWUsIHRydWUpO1xuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gZ2V0UmF3RGlyTmFtZSAoZGlyKSB7XG4gIHJldHVybiBkaXIucmF3TmFtZSB8fCAoKGRpci5uYW1lKSArIFwiLlwiICsgKE9iamVjdC5rZXlzKGRpci5tb2RpZmllcnMgfHwge30pLmpvaW4oJy4nKSkpXG59XG5cbmZ1bmN0aW9uIGNhbGxIb29rJDEgKGRpciwgaG9vaywgdm5vZGUsIG9sZFZub2RlLCBpc0Rlc3Ryb3kpIHtcbiAgdmFyIGZuID0gZGlyLmRlZiAmJiBkaXIuZGVmW2hvb2tdO1xuICBpZiAoZm4pIHtcbiAgICBmbih2bm9kZS5lbG0sIGRpciwgdm5vZGUsIG9sZFZub2RlLCBpc0Rlc3Ryb3kpO1xuICB9XG59XG5cbnZhciBiYXNlTW9kdWxlcyA9IFtcbiAgcmVmLFxuICBkaXJlY3RpdmVzXG5dO1xuXG4vKiAgKi9cblxuZnVuY3Rpb24gdXBkYXRlQXR0cnMgKG9sZFZub2RlLCB2bm9kZSkge1xuICBpZiAoIW9sZFZub2RlLmRhdGEuYXR0cnMgJiYgIXZub2RlLmRhdGEuYXR0cnMpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIga2V5LCBjdXIsIG9sZDtcbiAgdmFyIGVsbSA9IHZub2RlLmVsbTtcbiAgdmFyIG9sZEF0dHJzID0gb2xkVm5vZGUuZGF0YS5hdHRycyB8fCB7fTtcbiAgdmFyIGF0dHJzID0gdm5vZGUuZGF0YS5hdHRycyB8fCB7fTtcbiAgLy8gY2xvbmUgb2JzZXJ2ZWQgb2JqZWN0cywgYXMgdGhlIHVzZXIgcHJvYmFibHkgd2FudHMgdG8gbXV0YXRlIGl0XG4gIGlmIChhdHRycy5fX29iX18pIHtcbiAgICBhdHRycyA9IHZub2RlLmRhdGEuYXR0cnMgPSBleHRlbmQoe30sIGF0dHJzKTtcbiAgfVxuXG4gIGZvciAoa2V5IGluIGF0dHJzKSB7XG4gICAgY3VyID0gYXR0cnNba2V5XTtcbiAgICBvbGQgPSBvbGRBdHRyc1trZXldO1xuICAgIGlmIChvbGQgIT09IGN1cikge1xuICAgICAgc2V0QXR0cihlbG0sIGtleSwgY3VyKTtcbiAgICB9XG4gIH1cbiAgLy8gIzQzOTE6IGluIElFOSwgc2V0dGluZyB0eXBlIGNhbiByZXNldCB2YWx1ZSBmb3IgaW5wdXRbdHlwZT1yYWRpb11cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChpc0lFOSAmJiBhdHRycy52YWx1ZSAhPT0gb2xkQXR0cnMudmFsdWUpIHtcbiAgICBzZXRBdHRyKGVsbSwgJ3ZhbHVlJywgYXR0cnMudmFsdWUpO1xuICB9XG4gIGZvciAoa2V5IGluIG9sZEF0dHJzKSB7XG4gICAgaWYgKGF0dHJzW2tleV0gPT0gbnVsbCkge1xuICAgICAgaWYgKGlzWGxpbmsoa2V5KSkge1xuICAgICAgICBlbG0ucmVtb3ZlQXR0cmlidXRlTlMoeGxpbmtOUywgZ2V0WGxpbmtQcm9wKGtleSkpO1xuICAgICAgfSBlbHNlIGlmICghaXNFbnVtZXJhdGVkQXR0cihrZXkpKSB7XG4gICAgICAgIGVsbS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0QXR0ciAoZWwsIGtleSwgdmFsdWUpIHtcbiAgaWYgKGlzQm9vbGVhbkF0dHIoa2V5KSkge1xuICAgIC8vIHNldCBhdHRyaWJ1dGUgZm9yIGJsYW5rIHZhbHVlXG4gICAgLy8gZS5nLiA8b3B0aW9uIGRpc2FibGVkPlNlbGVjdCBvbmU8L29wdGlvbj5cbiAgICBpZiAoaXNGYWxzeUF0dHJWYWx1ZSh2YWx1ZSkpIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShrZXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoa2V5LCBrZXkpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0VudW1lcmF0ZWRBdHRyKGtleSkpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoa2V5LCBpc0ZhbHN5QXR0clZhbHVlKHZhbHVlKSB8fCB2YWx1ZSA9PT0gJ2ZhbHNlJyA/ICdmYWxzZScgOiAndHJ1ZScpO1xuICB9IGVsc2UgaWYgKGlzWGxpbmsoa2V5KSkge1xuICAgIGlmIChpc0ZhbHN5QXR0clZhbHVlKHZhbHVlKSkge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlTlMoeGxpbmtOUywgZ2V0WGxpbmtQcm9wKGtleSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGVOUyh4bGlua05TLCBrZXksIHZhbHVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGlzRmFsc3lBdHRyVmFsdWUodmFsdWUpKSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKGtleSwgdmFsdWUpO1xuICAgIH1cbiAgfVxufVxuXG52YXIgYXR0cnMgPSB7XG4gIGNyZWF0ZTogdXBkYXRlQXR0cnMsXG4gIHVwZGF0ZTogdXBkYXRlQXR0cnNcbn07XG5cbi8qICAqL1xuXG5mdW5jdGlvbiB1cGRhdGVDbGFzcyAob2xkVm5vZGUsIHZub2RlKSB7XG4gIHZhciBlbCA9IHZub2RlLmVsbTtcbiAgdmFyIGRhdGEgPSB2bm9kZS5kYXRhO1xuICB2YXIgb2xkRGF0YSA9IG9sZFZub2RlLmRhdGE7XG4gIGlmICghZGF0YS5zdGF0aWNDbGFzcyAmJiAhZGF0YS5jbGFzcyAmJlxuICAgICAgKCFvbGREYXRhIHx8ICghb2xkRGF0YS5zdGF0aWNDbGFzcyAmJiAhb2xkRGF0YS5jbGFzcykpKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgY2xzID0gZ2VuQ2xhc3NGb3JWbm9kZSh2bm9kZSk7XG5cbiAgLy8gaGFuZGxlIHRyYW5zaXRpb24gY2xhc3Nlc1xuICB2YXIgdHJhbnNpdGlvbkNsYXNzID0gZWwuX3RyYW5zaXRpb25DbGFzc2VzO1xuICBpZiAodHJhbnNpdGlvbkNsYXNzKSB7XG4gICAgY2xzID0gY29uY2F0KGNscywgc3RyaW5naWZ5Q2xhc3ModHJhbnNpdGlvbkNsYXNzKSk7XG4gIH1cblxuICAvLyBzZXQgdGhlIGNsYXNzXG4gIGlmIChjbHMgIT09IGVsLl9wcmV2Q2xhc3MpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgY2xzKTtcbiAgICBlbC5fcHJldkNsYXNzID0gY2xzO1xuICB9XG59XG5cbnZhciBrbGFzcyA9IHtcbiAgY3JlYXRlOiB1cGRhdGVDbGFzcyxcbiAgdXBkYXRlOiB1cGRhdGVDbGFzc1xufTtcblxuLyogICovXG5cbnZhciB2YWxpZERpdmlzaW9uQ2hhclJFID0gL1tcXHcpLitcXC1fJFxcXV0vO1xuXG5cblxuZnVuY3Rpb24gd3JhcEZpbHRlciAoZXhwLCBmaWx0ZXIpIHtcbiAgdmFyIGkgPSBmaWx0ZXIuaW5kZXhPZignKCcpO1xuICBpZiAoaSA8IDApIHtcbiAgICAvLyBfZjogcmVzb2x2ZUZpbHRlclxuICAgIHJldHVybiAoXCJfZihcXFwiXCIgKyBmaWx0ZXIgKyBcIlxcXCIpKFwiICsgZXhwICsgXCIpXCIpXG4gIH0gZWxzZSB7XG4gICAgdmFyIG5hbWUgPSBmaWx0ZXIuc2xpY2UoMCwgaSk7XG4gICAgdmFyIGFyZ3MgPSBmaWx0ZXIuc2xpY2UoaSArIDEpO1xuICAgIHJldHVybiAoXCJfZihcXFwiXCIgKyBuYW1lICsgXCJcXFwiKShcIiArIGV4cCArIFwiLFwiICsgYXJncylcbiAgfVxufVxuXG4vKiAgKi9cblxuLyogICovXG5cbi8qKlxuICogQ3Jvc3MtcGxhdGZvcm0gY29kZSBnZW5lcmF0aW9uIGZvciBjb21wb25lbnQgdi1tb2RlbFxuICovXG5cblxuLyoqXG4gKiBDcm9zcy1wbGF0Zm9ybSBjb2RlZ2VuIGhlbHBlciBmb3IgZ2VuZXJhdGluZyB2LW1vZGVsIHZhbHVlIGFzc2lnbm1lbnQgY29kZS5cbiAqL1xuXG5cbi8qKlxuICogcGFyc2UgZGlyZWN0aXZlIG1vZGVsIHRvIGRvIHRoZSBhcnJheSB1cGRhdGUgdHJhbnNmb3JtLiBhW2lkeF0gPSB2YWwgPT4gJCRhLnNwbGljZSgkJGlkeCwgMSwgdmFsKVxuICpcbiAqIGZvciBsb29wIHBvc3NpYmxlIGNhc2VzOlxuICpcbiAqIC0gdGVzdFxuICogLSB0ZXN0W2lkeF1cbiAqIC0gdGVzdFt0ZXN0MVtpZHhdXVxuICogLSB0ZXN0W1wiYVwiXVtpZHhdXG4gKiAtIHh4eC50ZXN0W2FbYV0udGVzdDFbaWR4XV1cbiAqIC0gdGVzdC54eHguYVtcImFzYVwiXVt0ZXN0MVtpZHhdXVxuICpcbiAqL1xuXG52YXIgc3RyO1xudmFyIGluZGV4JDE7XG5cbi8qICAqL1xuXG4vLyBpbiBzb21lIGNhc2VzLCB0aGUgZXZlbnQgdXNlZCBoYXMgdG8gYmUgZGV0ZXJtaW5lZCBhdCBydW50aW1lXG4vLyBzbyB3ZSB1c2VkIHNvbWUgcmVzZXJ2ZWQgdG9rZW5zIGR1cmluZyBjb21waWxlLlxudmFyIFJBTkdFX1RPS0VOID0gJ19fcic7XG52YXIgQ0hFQ0tCT1hfUkFESU9fVE9LRU4gPSAnX19jJztcblxuLyogICovXG5cbi8vIG5vcm1hbGl6ZSB2LW1vZGVsIGV2ZW50IHRva2VucyB0aGF0IGNhbiBvbmx5IGJlIGRldGVybWluZWQgYXQgcnVudGltZS5cbi8vIGl0J3MgaW1wb3J0YW50IHRvIHBsYWNlIHRoZSBldmVudCBhcyB0aGUgZmlyc3QgaW4gdGhlIGFycmF5IGJlY2F1c2Vcbi8vIHRoZSB3aG9sZSBwb2ludCBpcyBlbnN1cmluZyB0aGUgdi1tb2RlbCBjYWxsYmFjayBnZXRzIGNhbGxlZCBiZWZvcmVcbi8vIHVzZXItYXR0YWNoZWQgaGFuZGxlcnMuXG5mdW5jdGlvbiBub3JtYWxpemVFdmVudHMgKG9uKSB7XG4gIHZhciBldmVudDtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChvbltSQU5HRV9UT0tFTl0pIHtcbiAgICAvLyBJRSBpbnB1dFt0eXBlPXJhbmdlXSBvbmx5IHN1cHBvcnRzIGBjaGFuZ2VgIGV2ZW50XG4gICAgZXZlbnQgPSBpc0lFID8gJ2NoYW5nZScgOiAnaW5wdXQnO1xuICAgIG9uW2V2ZW50XSA9IFtdLmNvbmNhdChvbltSQU5HRV9UT0tFTl0sIG9uW2V2ZW50XSB8fCBbXSk7XG4gICAgZGVsZXRlIG9uW1JBTkdFX1RPS0VOXTtcbiAgfVxuICBpZiAob25bQ0hFQ0tCT1hfUkFESU9fVE9LRU5dKSB7XG4gICAgLy8gQ2hyb21lIGZpcmVzIG1pY3JvdGFza3MgaW4gYmV0d2VlbiBjbGljay9jaGFuZ2UsIGxlYWRzIHRvICM0NTIxXG4gICAgZXZlbnQgPSBpc0Nocm9tZSA/ICdjbGljaycgOiAnY2hhbmdlJztcbiAgICBvbltldmVudF0gPSBbXS5jb25jYXQob25bQ0hFQ0tCT1hfUkFESU9fVE9LRU5dLCBvbltldmVudF0gfHwgW10pO1xuICAgIGRlbGV0ZSBvbltDSEVDS0JPWF9SQURJT19UT0tFTl07XG4gIH1cbn1cblxudmFyIHRhcmdldCQxO1xuXG5mdW5jdGlvbiBhZGQkMSAoXG4gIGV2ZW50LFxuICBoYW5kbGVyLFxuICBvbmNlLFxuICBjYXB0dXJlXG4pIHtcbiAgaWYgKG9uY2UpIHtcbiAgICB2YXIgb2xkSGFuZGxlciA9IGhhbmRsZXI7XG4gICAgdmFyIF90YXJnZXQgPSB0YXJnZXQkMTsgLy8gc2F2ZSBjdXJyZW50IHRhcmdldCBlbGVtZW50IGluIGNsb3N1cmVcbiAgICBoYW5kbGVyID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICB2YXIgcmVzID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMVxuICAgICAgICA/IG9sZEhhbmRsZXIoZXYpXG4gICAgICAgIDogb2xkSGFuZGxlci5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgaWYgKHJlcyAhPT0gbnVsbCkge1xuICAgICAgICByZW1vdmUkMihldmVudCwgaGFuZGxlciwgY2FwdHVyZSwgX3RhcmdldCk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICB0YXJnZXQkMS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBjYXB0dXJlKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlJDIgKFxuICBldmVudCxcbiAgaGFuZGxlcixcbiAgY2FwdHVyZSxcbiAgX3RhcmdldFxuKSB7XG4gIChfdGFyZ2V0IHx8IHRhcmdldCQxKS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBjYXB0dXJlKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlRE9NTGlzdGVuZXJzIChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgaWYgKCFvbGRWbm9kZS5kYXRhLm9uICYmICF2bm9kZS5kYXRhLm9uKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIG9uID0gdm5vZGUuZGF0YS5vbiB8fCB7fTtcbiAgdmFyIG9sZE9uID0gb2xkVm5vZGUuZGF0YS5vbiB8fCB7fTtcbiAgdGFyZ2V0JDEgPSB2bm9kZS5lbG07XG4gIG5vcm1hbGl6ZUV2ZW50cyhvbik7XG4gIHVwZGF0ZUxpc3RlbmVycyhvbiwgb2xkT24sIGFkZCQxLCByZW1vdmUkMiwgdm5vZGUuY29udGV4dCk7XG59XG5cbnZhciBldmVudHMgPSB7XG4gIGNyZWF0ZTogdXBkYXRlRE9NTGlzdGVuZXJzLFxuICB1cGRhdGU6IHVwZGF0ZURPTUxpc3RlbmVyc1xufTtcblxuLyogICovXG5cbmZ1bmN0aW9uIHVwZGF0ZURPTVByb3BzIChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgaWYgKCFvbGRWbm9kZS5kYXRhLmRvbVByb3BzICYmICF2bm9kZS5kYXRhLmRvbVByb3BzKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIGtleSwgY3VyO1xuICB2YXIgZWxtID0gdm5vZGUuZWxtO1xuICB2YXIgb2xkUHJvcHMgPSBvbGRWbm9kZS5kYXRhLmRvbVByb3BzIHx8IHt9O1xuICB2YXIgcHJvcHMgPSB2bm9kZS5kYXRhLmRvbVByb3BzIHx8IHt9O1xuICAvLyBjbG9uZSBvYnNlcnZlZCBvYmplY3RzLCBhcyB0aGUgdXNlciBwcm9iYWJseSB3YW50cyB0byBtdXRhdGUgaXRcbiAgaWYgKHByb3BzLl9fb2JfXykge1xuICAgIHByb3BzID0gdm5vZGUuZGF0YS5kb21Qcm9wcyA9IGV4dGVuZCh7fSwgcHJvcHMpO1xuICB9XG5cbiAgZm9yIChrZXkgaW4gb2xkUHJvcHMpIHtcbiAgICBpZiAocHJvcHNba2V5XSA9PSBudWxsKSB7XG4gICAgICBlbG1ba2V5XSA9ICcnO1xuICAgIH1cbiAgfVxuICBmb3IgKGtleSBpbiBwcm9wcykge1xuICAgIGN1ciA9IHByb3BzW2tleV07XG4gICAgLy8gaWdub3JlIGNoaWxkcmVuIGlmIHRoZSBub2RlIGhhcyB0ZXh0Q29udGVudCBvciBpbm5lckhUTUwsXG4gICAgLy8gYXMgdGhlc2Ugd2lsbCB0aHJvdyBhd2F5IGV4aXN0aW5nIERPTSBub2RlcyBhbmQgY2F1c2UgcmVtb3ZhbCBlcnJvcnNcbiAgICAvLyBvbiBzdWJzZXF1ZW50IHBhdGNoZXMgKCMzMzYwKVxuICAgIGlmIChrZXkgPT09ICd0ZXh0Q29udGVudCcgfHwga2V5ID09PSAnaW5uZXJIVE1MJykge1xuICAgICAgaWYgKHZub2RlLmNoaWxkcmVuKSB7IHZub2RlLmNoaWxkcmVuLmxlbmd0aCA9IDA7IH1cbiAgICAgIGlmIChjdXIgPT09IG9sZFByb3BzW2tleV0pIHsgY29udGludWUgfVxuICAgIH1cblxuICAgIGlmIChrZXkgPT09ICd2YWx1ZScpIHtcbiAgICAgIC8vIHN0b3JlIHZhbHVlIGFzIF92YWx1ZSBhcyB3ZWxsIHNpbmNlXG4gICAgICAvLyBub24tc3RyaW5nIHZhbHVlcyB3aWxsIGJlIHN0cmluZ2lmaWVkXG4gICAgICBlbG0uX3ZhbHVlID0gY3VyO1xuICAgICAgLy8gYXZvaWQgcmVzZXR0aW5nIGN1cnNvciBwb3NpdGlvbiB3aGVuIHZhbHVlIGlzIHRoZSBzYW1lXG4gICAgICB2YXIgc3RyQ3VyID0gY3VyID09IG51bGwgPyAnJyA6IFN0cmluZyhjdXIpO1xuICAgICAgaWYgKHNob3VsZFVwZGF0ZVZhbHVlKGVsbSwgdm5vZGUsIHN0ckN1cikpIHtcbiAgICAgICAgZWxtLnZhbHVlID0gc3RyQ3VyO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbG1ba2V5XSA9IGN1cjtcbiAgICB9XG4gIH1cbn1cblxuLy8gY2hlY2sgcGxhdGZvcm1zL3dlYi91dGlsL2F0dHJzLmpzIGFjY2VwdFZhbHVlXG5cblxuZnVuY3Rpb24gc2hvdWxkVXBkYXRlVmFsdWUgKFxuICBlbG0sXG4gIHZub2RlLFxuICBjaGVja1ZhbFxuKSB7XG4gIHJldHVybiAoIWVsbS5jb21wb3NpbmcgJiYgKFxuICAgIHZub2RlLnRhZyA9PT0gJ29wdGlvbicgfHxcbiAgICBpc0RpcnR5KGVsbSwgY2hlY2tWYWwpIHx8XG4gICAgaXNJbnB1dENoYW5nZWQoZWxtLCBjaGVja1ZhbClcbiAgKSlcbn1cblxuZnVuY3Rpb24gaXNEaXJ0eSAoZWxtLCBjaGVja1ZhbCkge1xuICAvLyByZXR1cm4gdHJ1ZSB3aGVuIHRleHRib3ggKC5udW1iZXIgYW5kIC50cmltKSBsb3NlcyBmb2N1cyBhbmQgaXRzIHZhbHVlIGlzIG5vdCBlcXVhbCB0byB0aGUgdXBkYXRlZCB2YWx1ZVxuICByZXR1cm4gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gZWxtICYmIGVsbS52YWx1ZSAhPT0gY2hlY2tWYWxcbn1cblxuZnVuY3Rpb24gaXNJbnB1dENoYW5nZWQgKGVsbSwgbmV3VmFsKSB7XG4gIHZhciB2YWx1ZSA9IGVsbS52YWx1ZTtcbiAgdmFyIG1vZGlmaWVycyA9IGVsbS5fdk1vZGlmaWVyczsgLy8gaW5qZWN0ZWQgYnkgdi1tb2RlbCBydW50aW1lXG4gIGlmICgobW9kaWZpZXJzICYmIG1vZGlmaWVycy5udW1iZXIpIHx8IGVsbS50eXBlID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB0b051bWJlcih2YWx1ZSkgIT09IHRvTnVtYmVyKG5ld1ZhbClcbiAgfVxuICBpZiAobW9kaWZpZXJzICYmIG1vZGlmaWVycy50cmltKSB7XG4gICAgcmV0dXJuIHZhbHVlLnRyaW0oKSAhPT0gbmV3VmFsLnRyaW0oKVxuICB9XG4gIHJldHVybiB2YWx1ZSAhPT0gbmV3VmFsXG59XG5cbnZhciBkb21Qcm9wcyA9IHtcbiAgY3JlYXRlOiB1cGRhdGVET01Qcm9wcyxcbiAgdXBkYXRlOiB1cGRhdGVET01Qcm9wc1xufTtcblxuLyogICovXG5cbnZhciBwYXJzZVN0eWxlVGV4dCA9IGNhY2hlZChmdW5jdGlvbiAoY3NzVGV4dCkge1xuICB2YXIgcmVzID0ge307XG4gIHZhciBsaXN0RGVsaW1pdGVyID0gLzsoPyFbXihdKlxcKSkvZztcbiAgdmFyIHByb3BlcnR5RGVsaW1pdGVyID0gLzooLispLztcbiAgY3NzVGV4dC5zcGxpdChsaXN0RGVsaW1pdGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIHZhciB0bXAgPSBpdGVtLnNwbGl0KHByb3BlcnR5RGVsaW1pdGVyKTtcbiAgICAgIHRtcC5sZW5ndGggPiAxICYmIChyZXNbdG1wWzBdLnRyaW0oKV0gPSB0bXBbMV0udHJpbSgpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzXG59KTtcblxuLy8gbWVyZ2Ugc3RhdGljIGFuZCBkeW5hbWljIHN0eWxlIGRhdGEgb24gdGhlIHNhbWUgdm5vZGVcbmZ1bmN0aW9uIG5vcm1hbGl6ZVN0eWxlRGF0YSAoZGF0YSkge1xuICB2YXIgc3R5bGUgPSBub3JtYWxpemVTdHlsZUJpbmRpbmcoZGF0YS5zdHlsZSk7XG4gIC8vIHN0YXRpYyBzdHlsZSBpcyBwcmUtcHJvY2Vzc2VkIGludG8gYW4gb2JqZWN0IGR1cmluZyBjb21waWxhdGlvblxuICAvLyBhbmQgaXMgYWx3YXlzIGEgZnJlc2ggb2JqZWN0LCBzbyBpdCdzIHNhZmUgdG8gbWVyZ2UgaW50byBpdFxuICByZXR1cm4gZGF0YS5zdGF0aWNTdHlsZVxuICAgID8gZXh0ZW5kKGRhdGEuc3RhdGljU3R5bGUsIHN0eWxlKVxuICAgIDogc3R5bGVcbn1cblxuLy8gbm9ybWFsaXplIHBvc3NpYmxlIGFycmF5IC8gc3RyaW5nIHZhbHVlcyBpbnRvIE9iamVjdFxuZnVuY3Rpb24gbm9ybWFsaXplU3R5bGVCaW5kaW5nIChiaW5kaW5nU3R5bGUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYmluZGluZ1N0eWxlKSkge1xuICAgIHJldHVybiB0b09iamVjdChiaW5kaW5nU3R5bGUpXG4gIH1cbiAgaWYgKHR5cGVvZiBiaW5kaW5nU3R5bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHBhcnNlU3R5bGVUZXh0KGJpbmRpbmdTdHlsZSlcbiAgfVxuICByZXR1cm4gYmluZGluZ1N0eWxlXG59XG5cbi8qKlxuICogcGFyZW50IGNvbXBvbmVudCBzdHlsZSBzaG91bGQgYmUgYWZ0ZXIgY2hpbGQnc1xuICogc28gdGhhdCBwYXJlbnQgY29tcG9uZW50J3Mgc3R5bGUgY291bGQgb3ZlcnJpZGUgaXRcbiAqL1xuZnVuY3Rpb24gZ2V0U3R5bGUgKHZub2RlLCBjaGVja0NoaWxkKSB7XG4gIHZhciByZXMgPSB7fTtcbiAgdmFyIHN0eWxlRGF0YTtcblxuICBpZiAoY2hlY2tDaGlsZCkge1xuICAgIHZhciBjaGlsZE5vZGUgPSB2bm9kZTtcbiAgICB3aGlsZSAoY2hpbGROb2RlLmNvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgICBjaGlsZE5vZGUgPSBjaGlsZE5vZGUuY29tcG9uZW50SW5zdGFuY2UuX3Zub2RlO1xuICAgICAgaWYgKGNoaWxkTm9kZS5kYXRhICYmIChzdHlsZURhdGEgPSBub3JtYWxpemVTdHlsZURhdGEoY2hpbGROb2RlLmRhdGEpKSkge1xuICAgICAgICBleHRlbmQocmVzLCBzdHlsZURhdGEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmICgoc3R5bGVEYXRhID0gbm9ybWFsaXplU3R5bGVEYXRhKHZub2RlLmRhdGEpKSkge1xuICAgIGV4dGVuZChyZXMsIHN0eWxlRGF0YSk7XG4gIH1cblxuICB2YXIgcGFyZW50Tm9kZSA9IHZub2RlO1xuICB3aGlsZSAoKHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudCkpIHtcbiAgICBpZiAocGFyZW50Tm9kZS5kYXRhICYmIChzdHlsZURhdGEgPSBub3JtYWxpemVTdHlsZURhdGEocGFyZW50Tm9kZS5kYXRhKSkpIHtcbiAgICAgIGV4dGVuZChyZXMsIHN0eWxlRGF0YSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuLyogICovXG5cbnZhciBjc3NWYXJSRSA9IC9eLS0vO1xudmFyIGltcG9ydGFudFJFID0gL1xccyohaW1wb3J0YW50JC87XG52YXIgc2V0UHJvcCA9IGZ1bmN0aW9uIChlbCwgbmFtZSwgdmFsKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoY3NzVmFyUkUudGVzdChuYW1lKSkge1xuICAgIGVsLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIHZhbCk7XG4gIH0gZWxzZSBpZiAoaW1wb3J0YW50UkUudGVzdCh2YWwpKSB7XG4gICAgZWwuc3R5bGUuc2V0UHJvcGVydHkobmFtZSwgdmFsLnJlcGxhY2UoaW1wb3J0YW50UkUsICcnKSwgJ2ltcG9ydGFudCcpO1xuICB9IGVsc2Uge1xuICAgIGVsLnN0eWxlW25vcm1hbGl6ZShuYW1lKV0gPSB2YWw7XG4gIH1cbn07XG5cbnZhciBwcmVmaXhlcyA9IFsnV2Via2l0JywgJ01veicsICdtcyddO1xuXG52YXIgdGVzdEVsO1xudmFyIG5vcm1hbGl6ZSA9IGNhY2hlZChmdW5jdGlvbiAocHJvcCkge1xuICB0ZXN0RWwgPSB0ZXN0RWwgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHByb3AgPSBjYW1lbGl6ZShwcm9wKTtcbiAgaWYgKHByb3AgIT09ICdmaWx0ZXInICYmIChwcm9wIGluIHRlc3RFbC5zdHlsZSkpIHtcbiAgICByZXR1cm4gcHJvcFxuICB9XG4gIHZhciB1cHBlciA9IHByb3AuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wLnNsaWNlKDEpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHByZWZpeGVkID0gcHJlZml4ZXNbaV0gKyB1cHBlcjtcbiAgICBpZiAocHJlZml4ZWQgaW4gdGVzdEVsLnN0eWxlKSB7XG4gICAgICByZXR1cm4gcHJlZml4ZWRcbiAgICB9XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiB1cGRhdGVTdHlsZSAob2xkVm5vZGUsIHZub2RlKSB7XG4gIHZhciBkYXRhID0gdm5vZGUuZGF0YTtcbiAgdmFyIG9sZERhdGEgPSBvbGRWbm9kZS5kYXRhO1xuXG4gIGlmICghZGF0YS5zdGF0aWNTdHlsZSAmJiAhZGF0YS5zdHlsZSAmJlxuICAgICAgIW9sZERhdGEuc3RhdGljU3R5bGUgJiYgIW9sZERhdGEuc3R5bGUpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBjdXIsIG5hbWU7XG4gIHZhciBlbCA9IHZub2RlLmVsbTtcbiAgdmFyIG9sZFN0YXRpY1N0eWxlID0gb2xkVm5vZGUuZGF0YS5zdGF0aWNTdHlsZTtcbiAgdmFyIG9sZFN0eWxlQmluZGluZyA9IG9sZFZub2RlLmRhdGEuc3R5bGUgfHwge307XG5cbiAgLy8gaWYgc3RhdGljIHN0eWxlIGV4aXN0cywgc3R5bGViaW5kaW5nIGFscmVhZHkgbWVyZ2VkIGludG8gaXQgd2hlbiBkb2luZyBub3JtYWxpemVTdHlsZURhdGFcbiAgdmFyIG9sZFN0eWxlID0gb2xkU3RhdGljU3R5bGUgfHwgb2xkU3R5bGVCaW5kaW5nO1xuXG4gIHZhciBzdHlsZSA9IG5vcm1hbGl6ZVN0eWxlQmluZGluZyh2bm9kZS5kYXRhLnN0eWxlKSB8fCB7fTtcblxuICB2bm9kZS5kYXRhLnN0eWxlID0gc3R5bGUuX19vYl9fID8gZXh0ZW5kKHt9LCBzdHlsZSkgOiBzdHlsZTtcblxuICB2YXIgbmV3U3R5bGUgPSBnZXRTdHlsZSh2bm9kZSwgdHJ1ZSk7XG5cbiAgZm9yIChuYW1lIGluIG9sZFN0eWxlKSB7XG4gICAgaWYgKG5ld1N0eWxlW25hbWVdID09IG51bGwpIHtcbiAgICAgIHNldFByb3AoZWwsIG5hbWUsICcnKTtcbiAgICB9XG4gIH1cbiAgZm9yIChuYW1lIGluIG5ld1N0eWxlKSB7XG4gICAgY3VyID0gbmV3U3R5bGVbbmFtZV07XG4gICAgaWYgKGN1ciAhPT0gb2xkU3R5bGVbbmFtZV0pIHtcbiAgICAgIC8vIGllOSBzZXR0aW5nIHRvIG51bGwgaGFzIG5vIGVmZmVjdCwgbXVzdCB1c2UgZW1wdHkgc3RyaW5nXG4gICAgICBzZXRQcm9wKGVsLCBuYW1lLCBjdXIgPT0gbnVsbCA/ICcnIDogY3VyKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIHN0eWxlID0ge1xuICBjcmVhdGU6IHVwZGF0ZVN0eWxlLFxuICB1cGRhdGU6IHVwZGF0ZVN0eWxlXG59O1xuXG4vKiAgKi9cblxuLyoqXG4gKiBBZGQgY2xhc3Mgd2l0aCBjb21wYXRpYmlsaXR5IGZvciBTVkcgc2luY2UgY2xhc3NMaXN0IGlzIG5vdCBzdXBwb3J0ZWQgb25cbiAqIFNWRyBlbGVtZW50cyBpbiBJRVxuICovXG5mdW5jdGlvbiBhZGRDbGFzcyAoZWwsIGNscykge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKCFjbHMgfHwgIShjbHMgPSBjbHMudHJpbSgpKSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIGlmIChjbHMuaW5kZXhPZignICcpID4gLTEpIHtcbiAgICAgIGNscy5zcGxpdCgvXFxzKy8pLmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGVsLmNsYXNzTGlzdC5hZGQoYyk7IH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKGNscyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBjdXIgPSBcIiBcIiArIChlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgfHwgJycpICsgXCIgXCI7XG4gICAgaWYgKGN1ci5pbmRleE9mKCcgJyArIGNscyArICcgJykgPCAwKSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgKGN1ciArIGNscykudHJpbSgpKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmUgY2xhc3Mgd2l0aCBjb21wYXRpYmlsaXR5IGZvciBTVkcgc2luY2UgY2xhc3NMaXN0IGlzIG5vdCBzdXBwb3J0ZWQgb25cbiAqIFNWRyBlbGVtZW50cyBpbiBJRVxuICovXG5mdW5jdGlvbiByZW1vdmVDbGFzcyAoZWwsIGNscykge1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKCFjbHMgfHwgIShjbHMgPSBjbHMudHJpbSgpKSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIGlmIChjbHMuaW5kZXhPZignICcpID4gLTEpIHtcbiAgICAgIGNscy5zcGxpdCgvXFxzKy8pLmZvckVhY2goZnVuY3Rpb24gKGMpIHsgcmV0dXJuIGVsLmNsYXNzTGlzdC5yZW1vdmUoYyk7IH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNscyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBjdXIgPSBcIiBcIiArIChlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgfHwgJycpICsgXCIgXCI7XG4gICAgdmFyIHRhciA9ICcgJyArIGNscyArICcgJztcbiAgICB3aGlsZSAoY3VyLmluZGV4T2YodGFyKSA+PSAwKSB7XG4gICAgICBjdXIgPSBjdXIucmVwbGFjZSh0YXIsICcgJyk7XG4gICAgfVxuICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjdXIudHJpbSgpKTtcbiAgfVxufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gcmVzb2x2ZVRyYW5zaXRpb24gKGRlZiQkMSkge1xuICBpZiAoIWRlZiQkMSkge1xuICAgIHJldHVyblxuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gIGlmICh0eXBlb2YgZGVmJCQxID09PSAnb2JqZWN0Jykge1xuICAgIHZhciByZXMgPSB7fTtcbiAgICBpZiAoZGVmJCQxLmNzcyAhPT0gZmFsc2UpIHtcbiAgICAgIGV4dGVuZChyZXMsIGF1dG9Dc3NUcmFuc2l0aW9uKGRlZiQkMS5uYW1lIHx8ICd2JykpO1xuICAgIH1cbiAgICBleHRlbmQocmVzLCBkZWYkJDEpO1xuICAgIHJldHVybiByZXNcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmJCQxID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBhdXRvQ3NzVHJhbnNpdGlvbihkZWYkJDEpXG4gIH1cbn1cblxudmFyIGF1dG9Dc3NUcmFuc2l0aW9uID0gY2FjaGVkKGZ1bmN0aW9uIChuYW1lKSB7XG4gIHJldHVybiB7XG4gICAgZW50ZXJDbGFzczogKG5hbWUgKyBcIi1lbnRlclwiKSxcbiAgICBlbnRlclRvQ2xhc3M6IChuYW1lICsgXCItZW50ZXItdG9cIiksXG4gICAgZW50ZXJBY3RpdmVDbGFzczogKG5hbWUgKyBcIi1lbnRlci1hY3RpdmVcIiksXG4gICAgbGVhdmVDbGFzczogKG5hbWUgKyBcIi1sZWF2ZVwiKSxcbiAgICBsZWF2ZVRvQ2xhc3M6IChuYW1lICsgXCItbGVhdmUtdG9cIiksXG4gICAgbGVhdmVBY3RpdmVDbGFzczogKG5hbWUgKyBcIi1sZWF2ZS1hY3RpdmVcIilcbiAgfVxufSk7XG5cbnZhciBoYXNUcmFuc2l0aW9uID0gaW5Ccm93c2VyICYmICFpc0lFOTtcbnZhciBUUkFOU0lUSU9OID0gJ3RyYW5zaXRpb24nO1xudmFyIEFOSU1BVElPTiA9ICdhbmltYXRpb24nO1xuXG4vLyBUcmFuc2l0aW9uIHByb3BlcnR5L2V2ZW50IHNuaWZmaW5nXG52YXIgdHJhbnNpdGlvblByb3AgPSAndHJhbnNpdGlvbic7XG52YXIgdHJhbnNpdGlvbkVuZEV2ZW50ID0gJ3RyYW5zaXRpb25lbmQnO1xudmFyIGFuaW1hdGlvblByb3AgPSAnYW5pbWF0aW9uJztcbnZhciBhbmltYXRpb25FbmRFdmVudCA9ICdhbmltYXRpb25lbmQnO1xuaWYgKGhhc1RyYW5zaXRpb24pIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmICh3aW5kb3cub250cmFuc2l0aW9uZW5kID09PSB1bmRlZmluZWQgJiZcbiAgICB3aW5kb3cub253ZWJraXR0cmFuc2l0aW9uZW5kICE9PSB1bmRlZmluZWQpIHtcbiAgICB0cmFuc2l0aW9uUHJvcCA9ICdXZWJraXRUcmFuc2l0aW9uJztcbiAgICB0cmFuc2l0aW9uRW5kRXZlbnQgPSAnd2Via2l0VHJhbnNpdGlvbkVuZCc7XG4gIH1cbiAgaWYgKHdpbmRvdy5vbmFuaW1hdGlvbmVuZCA9PT0gdW5kZWZpbmVkICYmXG4gICAgd2luZG93Lm9ud2Via2l0YW5pbWF0aW9uZW5kICE9PSB1bmRlZmluZWQpIHtcbiAgICBhbmltYXRpb25Qcm9wID0gJ1dlYmtpdEFuaW1hdGlvbic7XG4gICAgYW5pbWF0aW9uRW5kRXZlbnQgPSAnd2Via2l0QW5pbWF0aW9uRW5kJztcbiAgfVxufVxuXG4vLyBiaW5kaW5nIHRvIHdpbmRvdyBpcyBuZWNlc3NhcnkgdG8gbWFrZSBob3QgcmVsb2FkIHdvcmsgaW4gSUUgaW4gc3RyaWN0IG1vZGVcbnZhciByYWYgPSBpbkJyb3dzZXIgJiYgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuICA/IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUuYmluZCh3aW5kb3cpXG4gIDogc2V0VGltZW91dDtcblxuZnVuY3Rpb24gbmV4dEZyYW1lIChmbikge1xuICByYWYoZnVuY3Rpb24gKCkge1xuICAgIHJhZihmbik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRUcmFuc2l0aW9uQ2xhc3MgKGVsLCBjbHMpIHtcbiAgKGVsLl90cmFuc2l0aW9uQ2xhc3NlcyB8fCAoZWwuX3RyYW5zaXRpb25DbGFzc2VzID0gW10pKS5wdXNoKGNscyk7XG4gIGFkZENsYXNzKGVsLCBjbHMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVUcmFuc2l0aW9uQ2xhc3MgKGVsLCBjbHMpIHtcbiAgaWYgKGVsLl90cmFuc2l0aW9uQ2xhc3Nlcykge1xuICAgIHJlbW92ZShlbC5fdHJhbnNpdGlvbkNsYXNzZXMsIGNscyk7XG4gIH1cbiAgcmVtb3ZlQ2xhc3MoZWwsIGNscyk7XG59XG5cbmZ1bmN0aW9uIHdoZW5UcmFuc2l0aW9uRW5kcyAoXG4gIGVsLFxuICBleHBlY3RlZFR5cGUsXG4gIGNiXG4pIHtcbiAgdmFyIHJlZiA9IGdldFRyYW5zaXRpb25JbmZvKGVsLCBleHBlY3RlZFR5cGUpO1xuICB2YXIgdHlwZSA9IHJlZi50eXBlO1xuICB2YXIgdGltZW91dCA9IHJlZi50aW1lb3V0O1xuICB2YXIgcHJvcENvdW50ID0gcmVmLnByb3BDb3VudDtcbiAgaWYgKCF0eXBlKSB7IHJldHVybiBjYigpIH1cbiAgdmFyIGV2ZW50ID0gdHlwZSA9PT0gVFJBTlNJVElPTiA/IHRyYW5zaXRpb25FbmRFdmVudCA6IGFuaW1hdGlvbkVuZEV2ZW50O1xuICB2YXIgZW5kZWQgPSAwO1xuICB2YXIgZW5kID0gZnVuY3Rpb24gKCkge1xuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIG9uRW5kKTtcbiAgICBjYigpO1xuICB9O1xuICB2YXIgb25FbmQgPSBmdW5jdGlvbiAoZSkge1xuICAgIGlmIChlLnRhcmdldCA9PT0gZWwpIHtcbiAgICAgIGlmICgrK2VuZGVkID49IHByb3BDb3VudCkge1xuICAgICAgICBlbmQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIGlmIChlbmRlZCA8IHByb3BDb3VudCkge1xuICAgICAgZW5kKCk7XG4gICAgfVxuICB9LCB0aW1lb3V0ICsgMSk7XG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIG9uRW5kKTtcbn1cblxudmFyIHRyYW5zZm9ybVJFID0gL1xcYih0cmFuc2Zvcm18YWxsKSgsfCQpLztcblxuZnVuY3Rpb24gZ2V0VHJhbnNpdGlvbkluZm8gKGVsLCBleHBlY3RlZFR5cGUpIHtcbiAgdmFyIHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKTtcbiAgdmFyIHRyYW5zaXRpb25lRGVsYXlzID0gc3R5bGVzW3RyYW5zaXRpb25Qcm9wICsgJ0RlbGF5J10uc3BsaXQoJywgJyk7XG4gIHZhciB0cmFuc2l0aW9uRHVyYXRpb25zID0gc3R5bGVzW3RyYW5zaXRpb25Qcm9wICsgJ0R1cmF0aW9uJ10uc3BsaXQoJywgJyk7XG4gIHZhciB0cmFuc2l0aW9uVGltZW91dCA9IGdldFRpbWVvdXQodHJhbnNpdGlvbmVEZWxheXMsIHRyYW5zaXRpb25EdXJhdGlvbnMpO1xuICB2YXIgYW5pbWF0aW9uRGVsYXlzID0gc3R5bGVzW2FuaW1hdGlvblByb3AgKyAnRGVsYXknXS5zcGxpdCgnLCAnKTtcbiAgdmFyIGFuaW1hdGlvbkR1cmF0aW9ucyA9IHN0eWxlc1thbmltYXRpb25Qcm9wICsgJ0R1cmF0aW9uJ10uc3BsaXQoJywgJyk7XG4gIHZhciBhbmltYXRpb25UaW1lb3V0ID0gZ2V0VGltZW91dChhbmltYXRpb25EZWxheXMsIGFuaW1hdGlvbkR1cmF0aW9ucyk7XG5cbiAgdmFyIHR5cGU7XG4gIHZhciB0aW1lb3V0ID0gMDtcbiAgdmFyIHByb3BDb3VudCA9IDA7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoZXhwZWN0ZWRUeXBlID09PSBUUkFOU0lUSU9OKSB7XG4gICAgaWYgKHRyYW5zaXRpb25UaW1lb3V0ID4gMCkge1xuICAgICAgdHlwZSA9IFRSQU5TSVRJT047XG4gICAgICB0aW1lb3V0ID0gdHJhbnNpdGlvblRpbWVvdXQ7XG4gICAgICBwcm9wQ291bnQgPSB0cmFuc2l0aW9uRHVyYXRpb25zLmxlbmd0aDtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZXhwZWN0ZWRUeXBlID09PSBBTklNQVRJT04pIHtcbiAgICBpZiAoYW5pbWF0aW9uVGltZW91dCA+IDApIHtcbiAgICAgIHR5cGUgPSBBTklNQVRJT047XG4gICAgICB0aW1lb3V0ID0gYW5pbWF0aW9uVGltZW91dDtcbiAgICAgIHByb3BDb3VudCA9IGFuaW1hdGlvbkR1cmF0aW9ucy5sZW5ndGg7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRpbWVvdXQgPSBNYXRoLm1heCh0cmFuc2l0aW9uVGltZW91dCwgYW5pbWF0aW9uVGltZW91dCk7XG4gICAgdHlwZSA9IHRpbWVvdXQgPiAwXG4gICAgICA/IHRyYW5zaXRpb25UaW1lb3V0ID4gYW5pbWF0aW9uVGltZW91dFxuICAgICAgICA/IFRSQU5TSVRJT05cbiAgICAgICAgOiBBTklNQVRJT05cbiAgICAgIDogbnVsbDtcbiAgICBwcm9wQ291bnQgPSB0eXBlXG4gICAgICA/IHR5cGUgPT09IFRSQU5TSVRJT05cbiAgICAgICAgPyB0cmFuc2l0aW9uRHVyYXRpb25zLmxlbmd0aFxuICAgICAgICA6IGFuaW1hdGlvbkR1cmF0aW9ucy5sZW5ndGhcbiAgICAgIDogMDtcbiAgfVxuICB2YXIgaGFzVHJhbnNmb3JtID1cbiAgICB0eXBlID09PSBUUkFOU0lUSU9OICYmXG4gICAgdHJhbnNmb3JtUkUudGVzdChzdHlsZXNbdHJhbnNpdGlvblByb3AgKyAnUHJvcGVydHknXSk7XG4gIHJldHVybiB7XG4gICAgdHlwZTogdHlwZSxcbiAgICB0aW1lb3V0OiB0aW1lb3V0LFxuICAgIHByb3BDb3VudDogcHJvcENvdW50LFxuICAgIGhhc1RyYW5zZm9ybTogaGFzVHJhbnNmb3JtXG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0VGltZW91dCAoZGVsYXlzLCBkdXJhdGlvbnMpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgd2hpbGUgKGRlbGF5cy5sZW5ndGggPCBkdXJhdGlvbnMubGVuZ3RoKSB7XG4gICAgZGVsYXlzID0gZGVsYXlzLmNvbmNhdChkZWxheXMpO1xuICB9XG5cbiAgcmV0dXJuIE1hdGgubWF4LmFwcGx5KG51bGwsIGR1cmF0aW9ucy5tYXAoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICByZXR1cm4gdG9NcyhkKSArIHRvTXMoZGVsYXlzW2ldKVxuICB9KSlcbn1cblxuZnVuY3Rpb24gdG9NcyAocykge1xuICByZXR1cm4gTnVtYmVyKHMuc2xpY2UoMCwgLTEpKSAqIDEwMDBcbn1cblxuLyogICovXG5cbmZ1bmN0aW9uIGVudGVyICh2bm9kZSwgdG9nZ2xlRGlzcGxheSkge1xuICB2YXIgZWwgPSB2bm9kZS5lbG07XG5cbiAgLy8gY2FsbCBsZWF2ZSBjYWxsYmFjayBub3dcbiAgaWYgKGVsLl9sZWF2ZUNiKSB7XG4gICAgZWwuX2xlYXZlQ2IuY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICBlbC5fbGVhdmVDYigpO1xuICB9XG5cbiAgdmFyIGRhdGEgPSByZXNvbHZlVHJhbnNpdGlvbih2bm9kZS5kYXRhLnRyYW5zaXRpb24pO1xuICBpZiAoIWRhdGEpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoZWwuX2VudGVyQ2IgfHwgZWwubm9kZVR5cGUgIT09IDEpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBjc3MgPSBkYXRhLmNzcztcbiAgdmFyIHR5cGUgPSBkYXRhLnR5cGU7XG4gIHZhciBlbnRlckNsYXNzID0gZGF0YS5lbnRlckNsYXNzO1xuICB2YXIgZW50ZXJUb0NsYXNzID0gZGF0YS5lbnRlclRvQ2xhc3M7XG4gIHZhciBlbnRlckFjdGl2ZUNsYXNzID0gZGF0YS5lbnRlckFjdGl2ZUNsYXNzO1xuICB2YXIgYXBwZWFyQ2xhc3MgPSBkYXRhLmFwcGVhckNsYXNzO1xuICB2YXIgYXBwZWFyVG9DbGFzcyA9IGRhdGEuYXBwZWFyVG9DbGFzcztcbiAgdmFyIGFwcGVhckFjdGl2ZUNsYXNzID0gZGF0YS5hcHBlYXJBY3RpdmVDbGFzcztcbiAgdmFyIGJlZm9yZUVudGVyID0gZGF0YS5iZWZvcmVFbnRlcjtcbiAgdmFyIGVudGVyID0gZGF0YS5lbnRlcjtcbiAgdmFyIGFmdGVyRW50ZXIgPSBkYXRhLmFmdGVyRW50ZXI7XG4gIHZhciBlbnRlckNhbmNlbGxlZCA9IGRhdGEuZW50ZXJDYW5jZWxsZWQ7XG4gIHZhciBiZWZvcmVBcHBlYXIgPSBkYXRhLmJlZm9yZUFwcGVhcjtcbiAgdmFyIGFwcGVhciA9IGRhdGEuYXBwZWFyO1xuICB2YXIgYWZ0ZXJBcHBlYXIgPSBkYXRhLmFmdGVyQXBwZWFyO1xuICB2YXIgYXBwZWFyQ2FuY2VsbGVkID0gZGF0YS5hcHBlYXJDYW5jZWxsZWQ7XG4gIHZhciBkdXJhdGlvbiA9IGRhdGEuZHVyYXRpb247XG5cbiAgLy8gYWN0aXZlSW5zdGFuY2Ugd2lsbCBhbHdheXMgYmUgdGhlIDx0cmFuc2l0aW9uPiBjb21wb25lbnQgbWFuYWdpbmcgdGhpc1xuICAvLyB0cmFuc2l0aW9uLiBPbmUgZWRnZSBjYXNlIHRvIGNoZWNrIGlzIHdoZW4gdGhlIDx0cmFuc2l0aW9uPiBpcyBwbGFjZWRcbiAgLy8gYXMgdGhlIHJvb3Qgbm9kZSBvZiBhIGNoaWxkIGNvbXBvbmVudC4gSW4gdGhhdCBjYXNlIHdlIG5lZWQgdG8gY2hlY2tcbiAgLy8gPHRyYW5zaXRpb24+J3MgcGFyZW50IGZvciBhcHBlYXIgY2hlY2suXG4gIHZhciBjb250ZXh0ID0gYWN0aXZlSW5zdGFuY2U7XG4gIHZhciB0cmFuc2l0aW9uTm9kZSA9IGFjdGl2ZUluc3RhbmNlLiR2bm9kZTtcbiAgd2hpbGUgKHRyYW5zaXRpb25Ob2RlICYmIHRyYW5zaXRpb25Ob2RlLnBhcmVudCkge1xuICAgIHRyYW5zaXRpb25Ob2RlID0gdHJhbnNpdGlvbk5vZGUucGFyZW50O1xuICAgIGNvbnRleHQgPSB0cmFuc2l0aW9uTm9kZS5jb250ZXh0O1xuICB9XG5cbiAgdmFyIGlzQXBwZWFyID0gIWNvbnRleHQuX2lzTW91bnRlZCB8fCAhdm5vZGUuaXNSb290SW5zZXJ0O1xuXG4gIGlmIChpc0FwcGVhciAmJiAhYXBwZWFyICYmIGFwcGVhciAhPT0gJycpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBzdGFydENsYXNzID0gaXNBcHBlYXIgJiYgYXBwZWFyQ2xhc3NcbiAgICA/IGFwcGVhckNsYXNzXG4gICAgOiBlbnRlckNsYXNzO1xuICB2YXIgYWN0aXZlQ2xhc3MgPSBpc0FwcGVhciAmJiBhcHBlYXJBY3RpdmVDbGFzc1xuICAgID8gYXBwZWFyQWN0aXZlQ2xhc3NcbiAgICA6IGVudGVyQWN0aXZlQ2xhc3M7XG4gIHZhciB0b0NsYXNzID0gaXNBcHBlYXIgJiYgYXBwZWFyVG9DbGFzc1xuICAgID8gYXBwZWFyVG9DbGFzc1xuICAgIDogZW50ZXJUb0NsYXNzO1xuXG4gIHZhciBiZWZvcmVFbnRlckhvb2sgPSBpc0FwcGVhclxuICAgID8gKGJlZm9yZUFwcGVhciB8fCBiZWZvcmVFbnRlcilcbiAgICA6IGJlZm9yZUVudGVyO1xuICB2YXIgZW50ZXJIb29rID0gaXNBcHBlYXJcbiAgICA/ICh0eXBlb2YgYXBwZWFyID09PSAnZnVuY3Rpb24nID8gYXBwZWFyIDogZW50ZXIpXG4gICAgOiBlbnRlcjtcbiAgdmFyIGFmdGVyRW50ZXJIb29rID0gaXNBcHBlYXJcbiAgICA/IChhZnRlckFwcGVhciB8fCBhZnRlckVudGVyKVxuICAgIDogYWZ0ZXJFbnRlcjtcbiAgdmFyIGVudGVyQ2FuY2VsbGVkSG9vayA9IGlzQXBwZWFyXG4gICAgPyAoYXBwZWFyQ2FuY2VsbGVkIHx8IGVudGVyQ2FuY2VsbGVkKVxuICAgIDogZW50ZXJDYW5jZWxsZWQ7XG5cbiAgdmFyIGV4cGxpY2l0RW50ZXJEdXJhdGlvbiA9IHRvTnVtYmVyKFxuICAgIGlzT2JqZWN0KGR1cmF0aW9uKVxuICAgICAgPyBkdXJhdGlvbi5lbnRlclxuICAgICAgOiBkdXJhdGlvblxuICApO1xuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGV4cGxpY2l0RW50ZXJEdXJhdGlvbiAhPSBudWxsKSB7XG4gICAgY2hlY2tEdXJhdGlvbihleHBsaWNpdEVudGVyRHVyYXRpb24sICdlbnRlcicsIHZub2RlKTtcbiAgfVxuXG4gIHZhciBleHBlY3RzQ1NTID0gY3NzICE9PSBmYWxzZSAmJiAhaXNJRTk7XG4gIHZhciB1c2VyV2FudHNDb250cm9sID0gZ2V0SG9va0FndW1lbnRzTGVuZ3RoKGVudGVySG9vayk7XG5cbiAgdmFyIGNiID0gZWwuX2VudGVyQ2IgPSBvbmNlKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZXhwZWN0c0NTUykge1xuICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCB0b0NsYXNzKTtcbiAgICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgYWN0aXZlQ2xhc3MpO1xuICAgIH1cbiAgICBpZiAoY2IuY2FuY2VsbGVkKSB7XG4gICAgICBpZiAoZXhwZWN0c0NTUykge1xuICAgICAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIHN0YXJ0Q2xhc3MpO1xuICAgICAgfVxuICAgICAgZW50ZXJDYW5jZWxsZWRIb29rICYmIGVudGVyQ2FuY2VsbGVkSG9vayhlbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFmdGVyRW50ZXJIb29rICYmIGFmdGVyRW50ZXJIb29rKGVsKTtcbiAgICB9XG4gICAgZWwuX2VudGVyQ2IgPSBudWxsO1xuICB9KTtcblxuICBpZiAoIXZub2RlLmRhdGEuc2hvdykge1xuICAgIC8vIHJlbW92ZSBwZW5kaW5nIGxlYXZlIGVsZW1lbnQgb24gZW50ZXIgYnkgaW5qZWN0aW5nIGFuIGluc2VydCBob29rXG4gICAgbWVyZ2VWTm9kZUhvb2sodm5vZGUuZGF0YS5ob29rIHx8ICh2bm9kZS5kYXRhLmhvb2sgPSB7fSksICdpbnNlcnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgcGFyZW50ID0gZWwucGFyZW50Tm9kZTtcbiAgICAgIHZhciBwZW5kaW5nTm9kZSA9IHBhcmVudCAmJiBwYXJlbnQuX3BlbmRpbmcgJiYgcGFyZW50Ll9wZW5kaW5nW3Zub2RlLmtleV07XG4gICAgICBpZiAocGVuZGluZ05vZGUgJiZcbiAgICAgICAgICBwZW5kaW5nTm9kZS50YWcgPT09IHZub2RlLnRhZyAmJlxuICAgICAgICAgIHBlbmRpbmdOb2RlLmVsbS5fbGVhdmVDYikge1xuICAgICAgICBwZW5kaW5nTm9kZS5lbG0uX2xlYXZlQ2IoKTtcbiAgICAgIH1cbiAgICAgIGVudGVySG9vayAmJiBlbnRlckhvb2soZWwsIGNiKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHN0YXJ0IGVudGVyIHRyYW5zaXRpb25cbiAgYmVmb3JlRW50ZXJIb29rICYmIGJlZm9yZUVudGVySG9vayhlbCk7XG4gIGlmIChleHBlY3RzQ1NTKSB7XG4gICAgYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCBzdGFydENsYXNzKTtcbiAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIGFjdGl2ZUNsYXNzKTtcbiAgICBuZXh0RnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCB0b0NsYXNzKTtcbiAgICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgc3RhcnRDbGFzcyk7XG4gICAgICBpZiAoIWNiLmNhbmNlbGxlZCAmJiAhdXNlcldhbnRzQ29udHJvbCkge1xuICAgICAgICBpZiAoaXNWYWxpZER1cmF0aW9uKGV4cGxpY2l0RW50ZXJEdXJhdGlvbikpIHtcbiAgICAgICAgICBzZXRUaW1lb3V0KGNiLCBleHBsaWNpdEVudGVyRHVyYXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdoZW5UcmFuc2l0aW9uRW5kcyhlbCwgdHlwZSwgY2IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBpZiAodm5vZGUuZGF0YS5zaG93KSB7XG4gICAgdG9nZ2xlRGlzcGxheSAmJiB0b2dnbGVEaXNwbGF5KCk7XG4gICAgZW50ZXJIb29rICYmIGVudGVySG9vayhlbCwgY2IpO1xuICB9XG5cbiAgaWYgKCFleHBlY3RzQ1NTICYmICF1c2VyV2FudHNDb250cm9sKSB7XG4gICAgY2IoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBsZWF2ZSAodm5vZGUsIHJtKSB7XG4gIHZhciBlbCA9IHZub2RlLmVsbTtcblxuICAvLyBjYWxsIGVudGVyIGNhbGxiYWNrIG5vd1xuICBpZiAoZWwuX2VudGVyQ2IpIHtcbiAgICBlbC5fZW50ZXJDYi5jYW5jZWxsZWQgPSB0cnVlO1xuICAgIGVsLl9lbnRlckNiKCk7XG4gIH1cblxuICB2YXIgZGF0YSA9IHJlc29sdmVUcmFuc2l0aW9uKHZub2RlLmRhdGEudHJhbnNpdGlvbik7XG4gIGlmICghZGF0YSkge1xuICAgIHJldHVybiBybSgpXG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKGVsLl9sZWF2ZUNiIHx8IGVsLm5vZGVUeXBlICE9PSAxKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgY3NzID0gZGF0YS5jc3M7XG4gIHZhciB0eXBlID0gZGF0YS50eXBlO1xuICB2YXIgbGVhdmVDbGFzcyA9IGRhdGEubGVhdmVDbGFzcztcbiAgdmFyIGxlYXZlVG9DbGFzcyA9IGRhdGEubGVhdmVUb0NsYXNzO1xuICB2YXIgbGVhdmVBY3RpdmVDbGFzcyA9IGRhdGEubGVhdmVBY3RpdmVDbGFzcztcbiAgdmFyIGJlZm9yZUxlYXZlID0gZGF0YS5iZWZvcmVMZWF2ZTtcbiAgdmFyIGxlYXZlID0gZGF0YS5sZWF2ZTtcbiAgdmFyIGFmdGVyTGVhdmUgPSBkYXRhLmFmdGVyTGVhdmU7XG4gIHZhciBsZWF2ZUNhbmNlbGxlZCA9IGRhdGEubGVhdmVDYW5jZWxsZWQ7XG4gIHZhciBkZWxheUxlYXZlID0gZGF0YS5kZWxheUxlYXZlO1xuICB2YXIgZHVyYXRpb24gPSBkYXRhLmR1cmF0aW9uO1xuXG4gIHZhciBleHBlY3RzQ1NTID0gY3NzICE9PSBmYWxzZSAmJiAhaXNJRTk7XG4gIHZhciB1c2VyV2FudHNDb250cm9sID0gZ2V0SG9va0FndW1lbnRzTGVuZ3RoKGxlYXZlKTtcblxuICB2YXIgZXhwbGljaXRMZWF2ZUR1cmF0aW9uID0gdG9OdW1iZXIoXG4gICAgaXNPYmplY3QoZHVyYXRpb24pXG4gICAgICA/IGR1cmF0aW9uLmxlYXZlXG4gICAgICA6IGR1cmF0aW9uXG4gICk7XG5cbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgZXhwbGljaXRMZWF2ZUR1cmF0aW9uICE9IG51bGwpIHtcbiAgICBjaGVja0R1cmF0aW9uKGV4cGxpY2l0TGVhdmVEdXJhdGlvbiwgJ2xlYXZlJywgdm5vZGUpO1xuICB9XG5cbiAgdmFyIGNiID0gZWwuX2xlYXZlQ2IgPSBvbmNlKGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZWwucGFyZW50Tm9kZSAmJiBlbC5wYXJlbnROb2RlLl9wZW5kaW5nKSB7XG4gICAgICBlbC5wYXJlbnROb2RlLl9wZW5kaW5nW3Zub2RlLmtleV0gPSBudWxsO1xuICAgIH1cbiAgICBpZiAoZXhwZWN0c0NTUykge1xuICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZVRvQ2xhc3MpO1xuICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZUFjdGl2ZUNsYXNzKTtcbiAgICB9XG4gICAgaWYgKGNiLmNhbmNlbGxlZCkge1xuICAgICAgaWYgKGV4cGVjdHNDU1MpIHtcbiAgICAgICAgcmVtb3ZlVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZUNsYXNzKTtcbiAgICAgIH1cbiAgICAgIGxlYXZlQ2FuY2VsbGVkICYmIGxlYXZlQ2FuY2VsbGVkKGVsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcm0oKTtcbiAgICAgIGFmdGVyTGVhdmUgJiYgYWZ0ZXJMZWF2ZShlbCk7XG4gICAgfVxuICAgIGVsLl9sZWF2ZUNiID0gbnVsbDtcbiAgfSk7XG5cbiAgaWYgKGRlbGF5TGVhdmUpIHtcbiAgICBkZWxheUxlYXZlKHBlcmZvcm1MZWF2ZSk7XG4gIH0gZWxzZSB7XG4gICAgcGVyZm9ybUxlYXZlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBwZXJmb3JtTGVhdmUgKCkge1xuICAgIC8vIHRoZSBkZWxheWVkIGxlYXZlIG1heSBoYXZlIGFscmVhZHkgYmVlbiBjYW5jZWxsZWRcbiAgICBpZiAoY2IuY2FuY2VsbGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgLy8gcmVjb3JkIGxlYXZpbmcgZWxlbWVudFxuICAgIGlmICghdm5vZGUuZGF0YS5zaG93KSB7XG4gICAgICAoZWwucGFyZW50Tm9kZS5fcGVuZGluZyB8fCAoZWwucGFyZW50Tm9kZS5fcGVuZGluZyA9IHt9KSlbdm5vZGUua2V5XSA9IHZub2RlO1xuICAgIH1cbiAgICBiZWZvcmVMZWF2ZSAmJiBiZWZvcmVMZWF2ZShlbCk7XG4gICAgaWYgKGV4cGVjdHNDU1MpIHtcbiAgICAgIGFkZFRyYW5zaXRpb25DbGFzcyhlbCwgbGVhdmVDbGFzcyk7XG4gICAgICBhZGRUcmFuc2l0aW9uQ2xhc3MoZWwsIGxlYXZlQWN0aXZlQ2xhc3MpO1xuICAgICAgbmV4dEZyYW1lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCBsZWF2ZVRvQ2xhc3MpO1xuICAgICAgICByZW1vdmVUcmFuc2l0aW9uQ2xhc3MoZWwsIGxlYXZlQ2xhc3MpO1xuICAgICAgICBpZiAoIWNiLmNhbmNlbGxlZCAmJiAhdXNlcldhbnRzQ29udHJvbCkge1xuICAgICAgICAgIGlmIChpc1ZhbGlkRHVyYXRpb24oZXhwbGljaXRMZWF2ZUR1cmF0aW9uKSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChjYiwgZXhwbGljaXRMZWF2ZUR1cmF0aW9uKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2hlblRyYW5zaXRpb25FbmRzKGVsLCB0eXBlLCBjYik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgbGVhdmUgJiYgbGVhdmUoZWwsIGNiKTtcbiAgICBpZiAoIWV4cGVjdHNDU1MgJiYgIXVzZXJXYW50c0NvbnRyb2wpIHtcbiAgICAgIGNiKCk7XG4gICAgfVxuICB9XG59XG5cbi8vIG9ubHkgdXNlZCBpbiBkZXYgbW9kZVxuZnVuY3Rpb24gY2hlY2tEdXJhdGlvbiAodmFsLCBuYW1lLCB2bm9kZSkge1xuICBpZiAodHlwZW9mIHZhbCAhPT0gJ251bWJlcicpIHtcbiAgICB3YXJuKFxuICAgICAgXCI8dHJhbnNpdGlvbj4gZXhwbGljaXQgXCIgKyBuYW1lICsgXCIgZHVyYXRpb24gaXMgbm90IGEgdmFsaWQgbnVtYmVyIC0gXCIgK1xuICAgICAgXCJnb3QgXCIgKyAoSlNPTi5zdHJpbmdpZnkodmFsKSkgKyBcIi5cIixcbiAgICAgIHZub2RlLmNvbnRleHRcbiAgICApO1xuICB9IGVsc2UgaWYgKGlzTmFOKHZhbCkpIHtcbiAgICB3YXJuKFxuICAgICAgXCI8dHJhbnNpdGlvbj4gZXhwbGljaXQgXCIgKyBuYW1lICsgXCIgZHVyYXRpb24gaXMgTmFOIC0gXCIgK1xuICAgICAgJ3RoZSBkdXJhdGlvbiBleHByZXNzaW9uIG1pZ2h0IGJlIGluY29ycmVjdC4nLFxuICAgICAgdm5vZGUuY29udGV4dFxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNWYWxpZER1cmF0aW9uICh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInICYmICFpc05hTih2YWwpXG59XG5cbi8qKlxuICogTm9ybWFsaXplIGEgdHJhbnNpdGlvbiBob29rJ3MgYXJndW1lbnQgbGVuZ3RoLiBUaGUgaG9vayBtYXkgYmU6XG4gKiAtIGEgbWVyZ2VkIGhvb2sgKGludm9rZXIpIHdpdGggdGhlIG9yaWdpbmFsIGluIC5mbnNcbiAqIC0gYSB3cmFwcGVkIGNvbXBvbmVudCBtZXRob2QgKGNoZWNrIC5fbGVuZ3RoKVxuICogLSBhIHBsYWluIGZ1bmN0aW9uICgubGVuZ3RoKVxuICovXG5mdW5jdGlvbiBnZXRIb29rQWd1bWVudHNMZW5ndGggKGZuKSB7XG4gIGlmICghZm4pIHsgcmV0dXJuIGZhbHNlIH1cbiAgdmFyIGludm9rZXJGbnMgPSBmbi5mbnM7XG4gIGlmIChpbnZva2VyRm5zKSB7XG4gICAgLy8gaW52b2tlclxuICAgIHJldHVybiBnZXRIb29rQWd1bWVudHNMZW5ndGgoXG4gICAgICBBcnJheS5pc0FycmF5KGludm9rZXJGbnMpXG4gICAgICAgID8gaW52b2tlckZuc1swXVxuICAgICAgICA6IGludm9rZXJGbnNcbiAgICApXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChmbi5fbGVuZ3RoIHx8IGZuLmxlbmd0aCkgPiAxXG4gIH1cbn1cblxuZnVuY3Rpb24gX2VudGVyIChfLCB2bm9kZSkge1xuICBpZiAoIXZub2RlLmRhdGEuc2hvdykge1xuICAgIGVudGVyKHZub2RlKTtcbiAgfVxufVxuXG52YXIgdHJhbnNpdGlvbiA9IGluQnJvd3NlciA/IHtcbiAgY3JlYXRlOiBfZW50ZXIsXG4gIGFjdGl2YXRlOiBfZW50ZXIsXG4gIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlJCQxICh2bm9kZSwgcm0pIHtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgIGlmICghdm5vZGUuZGF0YS5zaG93KSB7XG4gICAgICBsZWF2ZSh2bm9kZSwgcm0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBybSgpO1xuICAgIH1cbiAgfVxufSA6IHt9O1xuXG52YXIgcGxhdGZvcm1Nb2R1bGVzID0gW1xuICBhdHRycyxcbiAga2xhc3MsXG4gIGV2ZW50cyxcbiAgZG9tUHJvcHMsXG4gIHN0eWxlLFxuICB0cmFuc2l0aW9uXG5dO1xuXG4vKiAgKi9cblxuLy8gdGhlIGRpcmVjdGl2ZSBtb2R1bGUgc2hvdWxkIGJlIGFwcGxpZWQgbGFzdCwgYWZ0ZXIgYWxsXG4vLyBidWlsdC1pbiBtb2R1bGVzIGhhdmUgYmVlbiBhcHBsaWVkLlxudmFyIG1vZHVsZXMgPSBwbGF0Zm9ybU1vZHVsZXMuY29uY2F0KGJhc2VNb2R1bGVzKTtcblxudmFyIHBhdGNoID0gY3JlYXRlUGF0Y2hGdW5jdGlvbih7IG5vZGVPcHM6IG5vZGVPcHMsIG1vZHVsZXM6IG1vZHVsZXMgfSk7XG5cbi8qKlxuICogTm90IHR5cGUgY2hlY2tpbmcgdGhpcyBmaWxlIGJlY2F1c2UgZmxvdyBkb2Vzbid0IGxpa2UgYXR0YWNoaW5nXG4gKiBwcm9wZXJ0aWVzIHRvIEVsZW1lbnRzLlxuICovXG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuaWYgKGlzSUU5KSB7XG4gIC8vIGh0dHA6Ly93d3cubWF0dHM0MTEuY29tL3Bvc3QvaW50ZXJuZXQtZXhwbG9yZXItOS1vbmlucHV0L1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzZWxlY3Rpb25jaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICBpZiAoZWwgJiYgZWwudm1vZGVsKSB7XG4gICAgICB0cmlnZ2VyKGVsLCAnaW5wdXQnKTtcbiAgICB9XG4gIH0pO1xufVxuXG52YXIgbW9kZWwkMSA9IHtcbiAgaW5zZXJ0ZWQ6IGZ1bmN0aW9uIGluc2VydGVkIChlbCwgYmluZGluZywgdm5vZGUpIHtcbiAgICBpZiAodm5vZGUudGFnID09PSAnc2VsZWN0Jykge1xuICAgICAgdmFyIGNiID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZXRTZWxlY3RlZChlbCwgYmluZGluZywgdm5vZGUuY29udGV4dCk7XG4gICAgICB9O1xuICAgICAgY2IoKTtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgICAgaWYgKGlzSUUgfHwgaXNFZGdlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoY2IsIDApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodm5vZGUudGFnID09PSAndGV4dGFyZWEnIHx8IGVsLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgZWwuX3ZNb2RpZmllcnMgPSBiaW5kaW5nLm1vZGlmaWVycztcbiAgICAgIGlmICghYmluZGluZy5tb2RpZmllcnMubGF6eSkge1xuICAgICAgICBpZiAoIWlzQW5kcm9pZCkge1xuICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBvc2l0aW9uc3RhcnQnLCBvbkNvbXBvc2l0aW9uU3RhcnQpO1xuICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbXBvc2l0aW9uZW5kJywgb25Db21wb3NpdGlvbkVuZCk7XG4gICAgICAgIH1cbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmIChpc0lFOSkge1xuICAgICAgICAgIGVsLnZtb2RlbCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGNvbXBvbmVudFVwZGF0ZWQ6IGZ1bmN0aW9uIGNvbXBvbmVudFVwZGF0ZWQgKGVsLCBiaW5kaW5nLCB2bm9kZSkge1xuICAgIGlmICh2bm9kZS50YWcgPT09ICdzZWxlY3QnKSB7XG4gICAgICBzZXRTZWxlY3RlZChlbCwgYmluZGluZywgdm5vZGUuY29udGV4dCk7XG4gICAgICAvLyBpbiBjYXNlIHRoZSBvcHRpb25zIHJlbmRlcmVkIGJ5IHYtZm9yIGhhdmUgY2hhbmdlZCxcbiAgICAgIC8vIGl0J3MgcG9zc2libGUgdGhhdCB0aGUgdmFsdWUgaXMgb3V0LW9mLXN5bmMgd2l0aCB0aGUgcmVuZGVyZWQgb3B0aW9ucy5cbiAgICAgIC8vIGRldGVjdCBzdWNoIGNhc2VzIGFuZCBmaWx0ZXIgb3V0IHZhbHVlcyB0aGF0IG5vIGxvbmdlciBoYXMgYSBtYXRjaGluZ1xuICAgICAgLy8gb3B0aW9uIGluIHRoZSBET00uXG4gICAgICB2YXIgbmVlZFJlc2V0ID0gZWwubXVsdGlwbGVcbiAgICAgICAgPyBiaW5kaW5nLnZhbHVlLnNvbWUoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIGhhc05vTWF0Y2hpbmdPcHRpb24odiwgZWwub3B0aW9ucyk7IH0pXG4gICAgICAgIDogYmluZGluZy52YWx1ZSAhPT0gYmluZGluZy5vbGRWYWx1ZSAmJiBoYXNOb01hdGNoaW5nT3B0aW9uKGJpbmRpbmcudmFsdWUsIGVsLm9wdGlvbnMpO1xuICAgICAgaWYgKG5lZWRSZXNldCkge1xuICAgICAgICB0cmlnZ2VyKGVsLCAnY2hhbmdlJyk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiBzZXRTZWxlY3RlZCAoZWwsIGJpbmRpbmcsIHZtKSB7XG4gIHZhciB2YWx1ZSA9IGJpbmRpbmcudmFsdWU7XG4gIHZhciBpc011bHRpcGxlID0gZWwubXVsdGlwbGU7XG4gIGlmIChpc011bHRpcGxlICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgd2FybihcbiAgICAgIFwiPHNlbGVjdCBtdWx0aXBsZSB2LW1vZGVsPVxcXCJcIiArIChiaW5kaW5nLmV4cHJlc3Npb24pICsgXCJcXFwiPiBcIiArXG4gICAgICBcImV4cGVjdHMgYW4gQXJyYXkgdmFsdWUgZm9yIGl0cyBiaW5kaW5nLCBidXQgZ290IFwiICsgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkuc2xpY2UoOCwgLTEpKSxcbiAgICAgIHZtXG4gICAgKTtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgc2VsZWN0ZWQsIG9wdGlvbjtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBlbC5vcHRpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIG9wdGlvbiA9IGVsLm9wdGlvbnNbaV07XG4gICAgaWYgKGlzTXVsdGlwbGUpIHtcbiAgICAgIHNlbGVjdGVkID0gbG9vc2VJbmRleE9mKHZhbHVlLCBnZXRWYWx1ZShvcHRpb24pKSA+IC0xO1xuICAgICAgaWYgKG9wdGlvbi5zZWxlY3RlZCAhPT0gc2VsZWN0ZWQpIHtcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gc2VsZWN0ZWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChsb29zZUVxdWFsKGdldFZhbHVlKG9wdGlvbiksIHZhbHVlKSkge1xuICAgICAgICBpZiAoZWwuc2VsZWN0ZWRJbmRleCAhPT0gaSkge1xuICAgICAgICAgIGVsLnNlbGVjdGVkSW5kZXggPSBpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoIWlzTXVsdGlwbGUpIHtcbiAgICBlbC5zZWxlY3RlZEluZGV4ID0gLTE7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFzTm9NYXRjaGluZ09wdGlvbiAodmFsdWUsIG9wdGlvbnMpIHtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBvcHRpb25zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGlmIChsb29zZUVxdWFsKGdldFZhbHVlKG9wdGlvbnNbaV0pLCB2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBnZXRWYWx1ZSAob3B0aW9uKSB7XG4gIHJldHVybiAnX3ZhbHVlJyBpbiBvcHRpb25cbiAgICA/IG9wdGlvbi5fdmFsdWVcbiAgICA6IG9wdGlvbi52YWx1ZVxufVxuXG5mdW5jdGlvbiBvbkNvbXBvc2l0aW9uU3RhcnQgKGUpIHtcbiAgZS50YXJnZXQuY29tcG9zaW5nID0gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gb25Db21wb3NpdGlvbkVuZCAoZSkge1xuICBlLnRhcmdldC5jb21wb3NpbmcgPSBmYWxzZTtcbiAgdHJpZ2dlcihlLnRhcmdldCwgJ2lucHV0Jyk7XG59XG5cbmZ1bmN0aW9uIHRyaWdnZXIgKGVsLCB0eXBlKSB7XG4gIHZhciBlID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKTtcbiAgZS5pbml0RXZlbnQodHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gIGVsLmRpc3BhdGNoRXZlbnQoZSk7XG59XG5cbi8qICAqL1xuXG4vLyByZWN1cnNpdmVseSBzZWFyY2ggZm9yIHBvc3NpYmxlIHRyYW5zaXRpb24gZGVmaW5lZCBpbnNpZGUgdGhlIGNvbXBvbmVudCByb290XG5mdW5jdGlvbiBsb2NhdGVOb2RlICh2bm9kZSkge1xuICByZXR1cm4gdm5vZGUuY29tcG9uZW50SW5zdGFuY2UgJiYgKCF2bm9kZS5kYXRhIHx8ICF2bm9kZS5kYXRhLnRyYW5zaXRpb24pXG4gICAgPyBsb2NhdGVOb2RlKHZub2RlLmNvbXBvbmVudEluc3RhbmNlLl92bm9kZSlcbiAgICA6IHZub2RlXG59XG5cbnZhciBzaG93ID0ge1xuICBiaW5kOiBmdW5jdGlvbiBiaW5kIChlbCwgcmVmLCB2bm9kZSkge1xuICAgIHZhciB2YWx1ZSA9IHJlZi52YWx1ZTtcblxuICAgIHZub2RlID0gbG9jYXRlTm9kZSh2bm9kZSk7XG4gICAgdmFyIHRyYW5zaXRpb24gPSB2bm9kZS5kYXRhICYmIHZub2RlLmRhdGEudHJhbnNpdGlvbjtcbiAgICB2YXIgb3JpZ2luYWxEaXNwbGF5ID0gZWwuX192T3JpZ2luYWxEaXNwbGF5ID1cbiAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJyA/ICcnIDogZWwuc3R5bGUuZGlzcGxheTtcbiAgICBpZiAodmFsdWUgJiYgdHJhbnNpdGlvbiAmJiAhaXNJRTkpIHtcbiAgICAgIHZub2RlLmRhdGEuc2hvdyA9IHRydWU7XG4gICAgICBlbnRlcih2bm9kZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gb3JpZ2luYWxEaXNwbGF5O1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/IG9yaWdpbmFsRGlzcGxheSA6ICdub25lJztcbiAgICB9XG4gIH0sXG5cbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUgKGVsLCByZWYsIHZub2RlKSB7XG4gICAgdmFyIHZhbHVlID0gcmVmLnZhbHVlO1xuICAgIHZhciBvbGRWYWx1ZSA9IHJlZi5vbGRWYWx1ZTtcblxuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICh2YWx1ZSA9PT0gb2xkVmFsdWUpIHsgcmV0dXJuIH1cbiAgICB2bm9kZSA9IGxvY2F0ZU5vZGUodm5vZGUpO1xuICAgIHZhciB0cmFuc2l0aW9uID0gdm5vZGUuZGF0YSAmJiB2bm9kZS5kYXRhLnRyYW5zaXRpb247XG4gICAgaWYgKHRyYW5zaXRpb24gJiYgIWlzSUU5KSB7XG4gICAgICB2bm9kZS5kYXRhLnNob3cgPSB0cnVlO1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIGVudGVyKHZub2RlLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IGVsLl9fdk9yaWdpbmFsRGlzcGxheTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZWF2ZSh2bm9kZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyBlbC5fX3ZPcmlnaW5hbERpc3BsYXkgOiAnbm9uZSc7XG4gICAgfVxuICB9LFxuXG4gIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kIChcbiAgICBlbCxcbiAgICBiaW5kaW5nLFxuICAgIHZub2RlLFxuICAgIG9sZFZub2RlLFxuICAgIGlzRGVzdHJveVxuICApIHtcbiAgICBpZiAoIWlzRGVzdHJveSkge1xuICAgICAgZWwuc3R5bGUuZGlzcGxheSA9IGVsLl9fdk9yaWdpbmFsRGlzcGxheTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBwbGF0Zm9ybURpcmVjdGl2ZXMgPSB7XG4gIG1vZGVsOiBtb2RlbCQxLFxuICBzaG93OiBzaG93XG59O1xuXG4vKiAgKi9cblxuLy8gUHJvdmlkZXMgdHJhbnNpdGlvbiBzdXBwb3J0IGZvciBhIHNpbmdsZSBlbGVtZW50L2NvbXBvbmVudC5cbi8vIHN1cHBvcnRzIHRyYW5zaXRpb24gbW9kZSAob3V0LWluIC8gaW4tb3V0KVxuXG52YXIgdHJhbnNpdGlvblByb3BzID0ge1xuICBuYW1lOiBTdHJpbmcsXG4gIGFwcGVhcjogQm9vbGVhbixcbiAgY3NzOiBCb29sZWFuLFxuICBtb2RlOiBTdHJpbmcsXG4gIHR5cGU6IFN0cmluZyxcbiAgZW50ZXJDbGFzczogU3RyaW5nLFxuICBsZWF2ZUNsYXNzOiBTdHJpbmcsXG4gIGVudGVyVG9DbGFzczogU3RyaW5nLFxuICBsZWF2ZVRvQ2xhc3M6IFN0cmluZyxcbiAgZW50ZXJBY3RpdmVDbGFzczogU3RyaW5nLFxuICBsZWF2ZUFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gIGFwcGVhckNsYXNzOiBTdHJpbmcsXG4gIGFwcGVhckFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gIGFwcGVhclRvQ2xhc3M6IFN0cmluZyxcbiAgZHVyYXRpb246IFtOdW1iZXIsIFN0cmluZywgT2JqZWN0XVxufTtcblxuLy8gaW4gY2FzZSB0aGUgY2hpbGQgaXMgYWxzbyBhbiBhYnN0cmFjdCBjb21wb25lbnQsIGUuZy4gPGtlZXAtYWxpdmU+XG4vLyB3ZSB3YW50IHRvIHJlY3Vyc2l2ZWx5IHJldHJpZXZlIHRoZSByZWFsIGNvbXBvbmVudCB0byBiZSByZW5kZXJlZFxuZnVuY3Rpb24gZ2V0UmVhbENoaWxkICh2bm9kZSkge1xuICB2YXIgY29tcE9wdGlvbnMgPSB2bm9kZSAmJiB2bm9kZS5jb21wb25lbnRPcHRpb25zO1xuICBpZiAoY29tcE9wdGlvbnMgJiYgY29tcE9wdGlvbnMuQ3Rvci5vcHRpb25zLmFic3RyYWN0KSB7XG4gICAgcmV0dXJuIGdldFJlYWxDaGlsZChnZXRGaXJzdENvbXBvbmVudENoaWxkKGNvbXBPcHRpb25zLmNoaWxkcmVuKSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdm5vZGVcbiAgfVxufVxuXG5mdW5jdGlvbiBleHRyYWN0VHJhbnNpdGlvbkRhdGEgKGNvbXApIHtcbiAgdmFyIGRhdGEgPSB7fTtcbiAgdmFyIG9wdGlvbnMgPSBjb21wLiRvcHRpb25zO1xuICAvLyBwcm9wc1xuICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucy5wcm9wc0RhdGEpIHtcbiAgICBkYXRhW2tleV0gPSBjb21wW2tleV07XG4gIH1cbiAgLy8gZXZlbnRzLlxuICAvLyBleHRyYWN0IGxpc3RlbmVycyBhbmQgcGFzcyB0aGVtIGRpcmVjdGx5IHRvIHRoZSB0cmFuc2l0aW9uIG1ldGhvZHNcbiAgdmFyIGxpc3RlbmVycyA9IG9wdGlvbnMuX3BhcmVudExpc3RlbmVycztcbiAgZm9yICh2YXIga2V5JDEgaW4gbGlzdGVuZXJzKSB7XG4gICAgZGF0YVtjYW1lbGl6ZShrZXkkMSldID0gbGlzdGVuZXJzW2tleSQxXTtcbiAgfVxuICByZXR1cm4gZGF0YVxufVxuXG5mdW5jdGlvbiBwbGFjZWhvbGRlciAoaCwgcmF3Q2hpbGQpIHtcbiAgcmV0dXJuIC9cXGQta2VlcC1hbGl2ZSQvLnRlc3QocmF3Q2hpbGQudGFnKVxuICAgID8gaCgna2VlcC1hbGl2ZScpXG4gICAgOiBudWxsXG59XG5cbmZ1bmN0aW9uIGhhc1BhcmVudFRyYW5zaXRpb24gKHZub2RlKSB7XG4gIHdoaWxlICgodm5vZGUgPSB2bm9kZS5wYXJlbnQpKSB7XG4gICAgaWYgKHZub2RlLmRhdGEudHJhbnNpdGlvbikge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNTYW1lQ2hpbGQgKGNoaWxkLCBvbGRDaGlsZCkge1xuICByZXR1cm4gb2xkQ2hpbGQua2V5ID09PSBjaGlsZC5rZXkgJiYgb2xkQ2hpbGQudGFnID09PSBjaGlsZC50YWdcbn1cblxudmFyIFRyYW5zaXRpb24gPSB7XG4gIG5hbWU6ICd0cmFuc2l0aW9uJyxcbiAgcHJvcHM6IHRyYW5zaXRpb25Qcm9wcyxcbiAgYWJzdHJhY3Q6IHRydWUsXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIgKGgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuJHNsb3RzLmRlZmF1bHQ7XG4gICAgaWYgKCFjaGlsZHJlbikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gZmlsdGVyIG91dCB0ZXh0IG5vZGVzIChwb3NzaWJsZSB3aGl0ZXNwYWNlcylcbiAgICBjaGlsZHJlbiA9IGNoaWxkcmVuLmZpbHRlcihmdW5jdGlvbiAoYykgeyByZXR1cm4gYy50YWc7IH0pO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyB3YXJuIG11bHRpcGxlIGVsZW1lbnRzXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xuICAgICAgd2FybihcbiAgICAgICAgJzx0cmFuc2l0aW9uPiBjYW4gb25seSBiZSB1c2VkIG9uIGEgc2luZ2xlIGVsZW1lbnQuIFVzZSAnICtcbiAgICAgICAgJzx0cmFuc2l0aW9uLWdyb3VwPiBmb3IgbGlzdHMuJyxcbiAgICAgICAgdGhpcy4kcGFyZW50XG4gICAgICApO1xuICAgIH1cblxuICAgIHZhciBtb2RlID0gdGhpcy5tb2RlO1xuXG4gICAgLy8gd2FybiBpbnZhbGlkIG1vZGVcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJlxuICAgICAgICBtb2RlICYmIG1vZGUgIT09ICdpbi1vdXQnICYmIG1vZGUgIT09ICdvdXQtaW4nKSB7XG4gICAgICB3YXJuKFxuICAgICAgICAnaW52YWxpZCA8dHJhbnNpdGlvbj4gbW9kZTogJyArIG1vZGUsXG4gICAgICAgIHRoaXMuJHBhcmVudFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB2YXIgcmF3Q2hpbGQgPSBjaGlsZHJlblswXTtcblxuICAgIC8vIGlmIHRoaXMgaXMgYSBjb21wb25lbnQgcm9vdCBub2RlIGFuZCB0aGUgY29tcG9uZW50J3NcbiAgICAvLyBwYXJlbnQgY29udGFpbmVyIG5vZGUgYWxzbyBoYXMgdHJhbnNpdGlvbiwgc2tpcC5cbiAgICBpZiAoaGFzUGFyZW50VHJhbnNpdGlvbih0aGlzLiR2bm9kZSkpIHtcbiAgICAgIHJldHVybiByYXdDaGlsZFxuICAgIH1cblxuICAgIC8vIGFwcGx5IHRyYW5zaXRpb24gZGF0YSB0byBjaGlsZFxuICAgIC8vIHVzZSBnZXRSZWFsQ2hpbGQoKSB0byBpZ25vcmUgYWJzdHJhY3QgY29tcG9uZW50cyBlLmcuIGtlZXAtYWxpdmVcbiAgICB2YXIgY2hpbGQgPSBnZXRSZWFsQ2hpbGQocmF3Q2hpbGQpO1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICAgIGlmICghY2hpbGQpIHtcbiAgICAgIHJldHVybiByYXdDaGlsZFxuICAgIH1cblxuICAgIGlmICh0aGlzLl9sZWF2aW5nKSB7XG4gICAgICByZXR1cm4gcGxhY2Vob2xkZXIoaCwgcmF3Q2hpbGQpXG4gICAgfVxuXG4gICAgLy8gZW5zdXJlIGEga2V5IHRoYXQgaXMgdW5pcXVlIHRvIHRoZSB2bm9kZSB0eXBlIGFuZCB0byB0aGlzIHRyYW5zaXRpb25cbiAgICAvLyBjb21wb25lbnQgaW5zdGFuY2UuIFRoaXMga2V5IHdpbGwgYmUgdXNlZCB0byByZW1vdmUgcGVuZGluZyBsZWF2aW5nIG5vZGVzXG4gICAgLy8gZHVyaW5nIGVudGVyaW5nLlxuICAgIHZhciBpZCA9IFwiX190cmFuc2l0aW9uLVwiICsgKHRoaXMuX3VpZCkgKyBcIi1cIjtcbiAgICBjaGlsZC5rZXkgPSBjaGlsZC5rZXkgPT0gbnVsbFxuICAgICAgPyBpZCArIGNoaWxkLnRhZ1xuICAgICAgOiBpc1ByaW1pdGl2ZShjaGlsZC5rZXkpXG4gICAgICAgID8gKFN0cmluZyhjaGlsZC5rZXkpLmluZGV4T2YoaWQpID09PSAwID8gY2hpbGQua2V5IDogaWQgKyBjaGlsZC5rZXkpXG4gICAgICAgIDogY2hpbGQua2V5O1xuXG4gICAgdmFyIGRhdGEgPSAoY2hpbGQuZGF0YSB8fCAoY2hpbGQuZGF0YSA9IHt9KSkudHJhbnNpdGlvbiA9IGV4dHJhY3RUcmFuc2l0aW9uRGF0YSh0aGlzKTtcbiAgICB2YXIgb2xkUmF3Q2hpbGQgPSB0aGlzLl92bm9kZTtcbiAgICB2YXIgb2xkQ2hpbGQgPSBnZXRSZWFsQ2hpbGQob2xkUmF3Q2hpbGQpO1xuXG4gICAgLy8gbWFyayB2LXNob3dcbiAgICAvLyBzbyB0aGF0IHRoZSB0cmFuc2l0aW9uIG1vZHVsZSBjYW4gaGFuZCBvdmVyIHRoZSBjb250cm9sIHRvIHRoZSBkaXJlY3RpdmVcbiAgICBpZiAoY2hpbGQuZGF0YS5kaXJlY3RpdmVzICYmIGNoaWxkLmRhdGEuZGlyZWN0aXZlcy5zb21lKGZ1bmN0aW9uIChkKSB7IHJldHVybiBkLm5hbWUgPT09ICdzaG93JzsgfSkpIHtcbiAgICAgIGNoaWxkLmRhdGEuc2hvdyA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKG9sZENoaWxkICYmIG9sZENoaWxkLmRhdGEgJiYgIWlzU2FtZUNoaWxkKGNoaWxkLCBvbGRDaGlsZCkpIHtcbiAgICAgIC8vIHJlcGxhY2Ugb2xkIGNoaWxkIHRyYW5zaXRpb24gZGF0YSB3aXRoIGZyZXNoIG9uZVxuICAgICAgLy8gaW1wb3J0YW50IGZvciBkeW5hbWljIHRyYW5zaXRpb25zIVxuICAgICAgdmFyIG9sZERhdGEgPSBvbGRDaGlsZCAmJiAob2xkQ2hpbGQuZGF0YS50cmFuc2l0aW9uID0gZXh0ZW5kKHt9LCBkYXRhKSk7XG4gICAgICAvLyBoYW5kbGUgdHJhbnNpdGlvbiBtb2RlXG4gICAgICBpZiAobW9kZSA9PT0gJ291dC1pbicpIHtcbiAgICAgICAgLy8gcmV0dXJuIHBsYWNlaG9sZGVyIG5vZGUgYW5kIHF1ZXVlIHVwZGF0ZSB3aGVuIGxlYXZlIGZpbmlzaGVzXG4gICAgICAgIHRoaXMuX2xlYXZpbmcgPSB0cnVlO1xuICAgICAgICBtZXJnZVZOb2RlSG9vayhvbGREYXRhLCAnYWZ0ZXJMZWF2ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzJDEuX2xlYXZpbmcgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzJDEuJGZvcmNlVXBkYXRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGxhY2Vob2xkZXIoaCwgcmF3Q2hpbGQpXG4gICAgICB9IGVsc2UgaWYgKG1vZGUgPT09ICdpbi1vdXQnKSB7XG4gICAgICAgIHZhciBkZWxheWVkTGVhdmU7XG4gICAgICAgIHZhciBwZXJmb3JtTGVhdmUgPSBmdW5jdGlvbiAoKSB7IGRlbGF5ZWRMZWF2ZSgpOyB9O1xuICAgICAgICBtZXJnZVZOb2RlSG9vayhkYXRhLCAnYWZ0ZXJFbnRlcicsIHBlcmZvcm1MZWF2ZSk7XG4gICAgICAgIG1lcmdlVk5vZGVIb29rKGRhdGEsICdlbnRlckNhbmNlbGxlZCcsIHBlcmZvcm1MZWF2ZSk7XG4gICAgICAgIG1lcmdlVk5vZGVIb29rKG9sZERhdGEsICdkZWxheUxlYXZlJywgZnVuY3Rpb24gKGxlYXZlKSB7IGRlbGF5ZWRMZWF2ZSA9IGxlYXZlOyB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmF3Q2hpbGRcbiAgfVxufTtcblxuLyogICovXG5cbi8vIFByb3ZpZGVzIHRyYW5zaXRpb24gc3VwcG9ydCBmb3IgbGlzdCBpdGVtcy5cbi8vIHN1cHBvcnRzIG1vdmUgdHJhbnNpdGlvbnMgdXNpbmcgdGhlIEZMSVAgdGVjaG5pcXVlLlxuXG4vLyBCZWNhdXNlIHRoZSB2ZG9tJ3MgY2hpbGRyZW4gdXBkYXRlIGFsZ29yaXRobSBpcyBcInVuc3RhYmxlXCIgLSBpLmUuXG4vLyBpdCBkb2Vzbid0IGd1YXJhbnRlZSB0aGUgcmVsYXRpdmUgcG9zaXRpb25pbmcgb2YgcmVtb3ZlZCBlbGVtZW50cyxcbi8vIHdlIGZvcmNlIHRyYW5zaXRpb24tZ3JvdXAgdG8gdXBkYXRlIGl0cyBjaGlsZHJlbiBpbnRvIHR3byBwYXNzZXM6XG4vLyBpbiB0aGUgZmlyc3QgcGFzcywgd2UgcmVtb3ZlIGFsbCBub2RlcyB0aGF0IG5lZWQgdG8gYmUgcmVtb3ZlZCxcbi8vIHRyaWdnZXJpbmcgdGhlaXIgbGVhdmluZyB0cmFuc2l0aW9uOyBpbiB0aGUgc2Vjb25kIHBhc3MsIHdlIGluc2VydC9tb3ZlXG4vLyBpbnRvIHRoZSBmaW5hbCBkaXNpcmVkIHN0YXRlLiBUaGlzIHdheSBpbiB0aGUgc2Vjb25kIHBhc3MgcmVtb3ZlZFxuLy8gbm9kZXMgd2lsbCByZW1haW4gd2hlcmUgdGhleSBzaG91bGQgYmUuXG5cbnZhciBwcm9wcyA9IGV4dGVuZCh7XG4gIHRhZzogU3RyaW5nLFxuICBtb3ZlQ2xhc3M6IFN0cmluZ1xufSwgdHJhbnNpdGlvblByb3BzKTtcblxuZGVsZXRlIHByb3BzLm1vZGU7XG5cbnZhciBUcmFuc2l0aW9uR3JvdXAgPSB7XG4gIHByb3BzOiBwcm9wcyxcblxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlciAoaCkge1xuICAgIHZhciB0YWcgPSB0aGlzLnRhZyB8fCB0aGlzLiR2bm9kZS5kYXRhLnRhZyB8fCAnc3Bhbic7XG4gICAgdmFyIG1hcCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdmFyIHByZXZDaGlsZHJlbiA9IHRoaXMucHJldkNoaWxkcmVuID0gdGhpcy5jaGlsZHJlbjtcbiAgICB2YXIgcmF3Q2hpbGRyZW4gPSB0aGlzLiRzbG90cy5kZWZhdWx0IHx8IFtdO1xuICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICB2YXIgdHJhbnNpdGlvbkRhdGEgPSBleHRyYWN0VHJhbnNpdGlvbkRhdGEodGhpcyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhd0NoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYyA9IHJhd0NoaWxkcmVuW2ldO1xuICAgICAgaWYgKGMudGFnKSB7XG4gICAgICAgIGlmIChjLmtleSAhPSBudWxsICYmIFN0cmluZyhjLmtleSkuaW5kZXhPZignX192bGlzdCcpICE9PSAwKSB7XG4gICAgICAgICAgY2hpbGRyZW4ucHVzaChjKTtcbiAgICAgICAgICBtYXBbYy5rZXldID0gY1xuICAgICAgICAgIDsoYy5kYXRhIHx8IChjLmRhdGEgPSB7fSkpLnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uRGF0YTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgdmFyIG9wdHMgPSBjLmNvbXBvbmVudE9wdGlvbnM7XG4gICAgICAgICAgdmFyIG5hbWUgPSBvcHRzID8gKG9wdHMuQ3Rvci5vcHRpb25zLm5hbWUgfHwgb3B0cy50YWcgfHwgJycpIDogYy50YWc7XG4gICAgICAgICAgd2FybigoXCI8dHJhbnNpdGlvbi1ncm91cD4gY2hpbGRyZW4gbXVzdCBiZSBrZXllZDogPFwiICsgbmFtZSArIFwiPlwiKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJldkNoaWxkcmVuKSB7XG4gICAgICB2YXIga2VwdCA9IFtdO1xuICAgICAgdmFyIHJlbW92ZWQgPSBbXTtcbiAgICAgIGZvciAodmFyIGkkMSA9IDA7IGkkMSA8IHByZXZDaGlsZHJlbi5sZW5ndGg7IGkkMSsrKSB7XG4gICAgICAgIHZhciBjJDEgPSBwcmV2Q2hpbGRyZW5baSQxXTtcbiAgICAgICAgYyQxLmRhdGEudHJhbnNpdGlvbiA9IHRyYW5zaXRpb25EYXRhO1xuICAgICAgICBjJDEuZGF0YS5wb3MgPSBjJDEuZWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBpZiAobWFwW2MkMS5rZXldKSB7XG4gICAgICAgICAga2VwdC5wdXNoKGMkMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVtb3ZlZC5wdXNoKGMkMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMua2VwdCA9IGgodGFnLCBudWxsLCBrZXB0KTtcbiAgICAgIHRoaXMucmVtb3ZlZCA9IHJlbW92ZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGgodGFnLCBudWxsLCBjaGlsZHJlbilcbiAgfSxcblxuICBiZWZvcmVVcGRhdGU6IGZ1bmN0aW9uIGJlZm9yZVVwZGF0ZSAoKSB7XG4gICAgLy8gZm9yY2UgcmVtb3ZpbmcgcGFzc1xuICAgIHRoaXMuX19wYXRjaF9fKFxuICAgICAgdGhpcy5fdm5vZGUsXG4gICAgICB0aGlzLmtlcHQsXG4gICAgICBmYWxzZSwgLy8gaHlkcmF0aW5nXG4gICAgICB0cnVlIC8vIHJlbW92ZU9ubHkgKCFpbXBvcnRhbnQsIGF2b2lkcyB1bm5lY2Vzc2FyeSBtb3ZlcylcbiAgICApO1xuICAgIHRoaXMuX3Zub2RlID0gdGhpcy5rZXB0O1xuICB9LFxuXG4gIHVwZGF0ZWQ6IGZ1bmN0aW9uIHVwZGF0ZWQgKCkge1xuICAgIHZhciBjaGlsZHJlbiA9IHRoaXMucHJldkNoaWxkcmVuO1xuICAgIHZhciBtb3ZlQ2xhc3MgPSB0aGlzLm1vdmVDbGFzcyB8fCAoKHRoaXMubmFtZSB8fCAndicpICsgJy1tb3ZlJyk7XG4gICAgaWYgKCFjaGlsZHJlbi5sZW5ndGggfHwgIXRoaXMuaGFzTW92ZShjaGlsZHJlblswXS5lbG0sIG1vdmVDbGFzcykpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIC8vIHdlIGRpdmlkZSB0aGUgd29yayBpbnRvIHRocmVlIGxvb3BzIHRvIGF2b2lkIG1peGluZyBET00gcmVhZHMgYW5kIHdyaXRlc1xuICAgIC8vIGluIGVhY2ggaXRlcmF0aW9uIC0gd2hpY2ggaGVscHMgcHJldmVudCBsYXlvdXQgdGhyYXNoaW5nLlxuICAgIGNoaWxkcmVuLmZvckVhY2goY2FsbFBlbmRpbmdDYnMpO1xuICAgIGNoaWxkcmVuLmZvckVhY2gocmVjb3JkUG9zaXRpb24pO1xuICAgIGNoaWxkcmVuLmZvckVhY2goYXBwbHlUcmFuc2xhdGlvbik7XG5cbiAgICAvLyBmb3JjZSByZWZsb3cgdG8gcHV0IGV2ZXJ5dGhpbmcgaW4gcG9zaXRpb25cbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgdmFyIGYgPSBib2R5Lm9mZnNldEhlaWdodDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoYykge1xuICAgICAgaWYgKGMuZGF0YS5tb3ZlZCkge1xuICAgICAgICB2YXIgZWwgPSBjLmVsbTtcbiAgICAgICAgdmFyIHMgPSBlbC5zdHlsZTtcbiAgICAgICAgYWRkVHJhbnNpdGlvbkNsYXNzKGVsLCBtb3ZlQ2xhc3MpO1xuICAgICAgICBzLnRyYW5zZm9ybSA9IHMuV2Via2l0VHJhbnNmb3JtID0gcy50cmFuc2l0aW9uRHVyYXRpb24gPSAnJztcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0cmFuc2l0aW9uRW5kRXZlbnQsIGVsLl9tb3ZlQ2IgPSBmdW5jdGlvbiBjYiAoZSkge1xuICAgICAgICAgIGlmICghZSB8fCAvdHJhbnNmb3JtJC8udGVzdChlLnByb3BlcnR5TmFtZSkpIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodHJhbnNpdGlvbkVuZEV2ZW50LCBjYik7XG4gICAgICAgICAgICBlbC5fbW92ZUNiID0gbnVsbDtcbiAgICAgICAgICAgIHJlbW92ZVRyYW5zaXRpb25DbGFzcyhlbCwgbW92ZUNsYXNzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIG1ldGhvZHM6IHtcbiAgICBoYXNNb3ZlOiBmdW5jdGlvbiBoYXNNb3ZlIChlbCwgbW92ZUNsYXNzKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgICAgIGlmICghaGFzVHJhbnNpdGlvbikge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9oYXNNb3ZlICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhc01vdmVcbiAgICAgIH1cbiAgICAgIC8vIERldGVjdCB3aGV0aGVyIGFuIGVsZW1lbnQgd2l0aCB0aGUgbW92ZSBjbGFzcyBhcHBsaWVkIGhhc1xuICAgICAgLy8gQ1NTIHRyYW5zaXRpb25zLiBTaW5jZSB0aGUgZWxlbWVudCBtYXkgYmUgaW5zaWRlIGFuIGVudGVyaW5nXG4gICAgICAvLyB0cmFuc2l0aW9uIGF0IHRoaXMgdmVyeSBtb21lbnQsIHdlIG1ha2UgYSBjbG9uZSBvZiBpdCBhbmQgcmVtb3ZlXG4gICAgICAvLyBhbGwgb3RoZXIgdHJhbnNpdGlvbiBjbGFzc2VzIGFwcGxpZWQgdG8gZW5zdXJlIG9ubHkgdGhlIG1vdmUgY2xhc3NcbiAgICAgIC8vIGlzIGFwcGxpZWQuXG4gICAgICB2YXIgY2xvbmUgPSBlbC5jbG9uZU5vZGUoKTtcbiAgICAgIGlmIChlbC5fdHJhbnNpdGlvbkNsYXNzZXMpIHtcbiAgICAgICAgZWwuX3RyYW5zaXRpb25DbGFzc2VzLmZvckVhY2goZnVuY3Rpb24gKGNscykgeyByZW1vdmVDbGFzcyhjbG9uZSwgY2xzKTsgfSk7XG4gICAgICB9XG4gICAgICBhZGRDbGFzcyhjbG9uZSwgbW92ZUNsYXNzKTtcbiAgICAgIGNsb25lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB0aGlzLiRlbC5hcHBlbmRDaGlsZChjbG9uZSk7XG4gICAgICB2YXIgaW5mbyA9IGdldFRyYW5zaXRpb25JbmZvKGNsb25lKTtcbiAgICAgIHRoaXMuJGVsLnJlbW92ZUNoaWxkKGNsb25lKTtcbiAgICAgIHJldHVybiAodGhpcy5faGFzTW92ZSA9IGluZm8uaGFzVHJhbnNmb3JtKVxuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gY2FsbFBlbmRpbmdDYnMgKGMpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChjLmVsbS5fbW92ZUNiKSB7XG4gICAgYy5lbG0uX21vdmVDYigpO1xuICB9XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoYy5lbG0uX2VudGVyQ2IpIHtcbiAgICBjLmVsbS5fZW50ZXJDYigpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlY29yZFBvc2l0aW9uIChjKSB7XG4gIGMuZGF0YS5uZXdQb3MgPSBjLmVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbn1cblxuZnVuY3Rpb24gYXBwbHlUcmFuc2xhdGlvbiAoYykge1xuICB2YXIgb2xkUG9zID0gYy5kYXRhLnBvcztcbiAgdmFyIG5ld1BvcyA9IGMuZGF0YS5uZXdQb3M7XG4gIHZhciBkeCA9IG9sZFBvcy5sZWZ0IC0gbmV3UG9zLmxlZnQ7XG4gIHZhciBkeSA9IG9sZFBvcy50b3AgLSBuZXdQb3MudG9wO1xuICBpZiAoZHggfHwgZHkpIHtcbiAgICBjLmRhdGEubW92ZWQgPSB0cnVlO1xuICAgIHZhciBzID0gYy5lbG0uc3R5bGU7XG4gICAgcy50cmFuc2Zvcm0gPSBzLldlYmtpdFRyYW5zZm9ybSA9IFwidHJhbnNsYXRlKFwiICsgZHggKyBcInB4LFwiICsgZHkgKyBcInB4KVwiO1xuICAgIHMudHJhbnNpdGlvbkR1cmF0aW9uID0gJzBzJztcbiAgfVxufVxuXG52YXIgcGxhdGZvcm1Db21wb25lbnRzID0ge1xuICBUcmFuc2l0aW9uOiBUcmFuc2l0aW9uLFxuICBUcmFuc2l0aW9uR3JvdXA6IFRyYW5zaXRpb25Hcm91cFxufTtcblxuLyogICovXG5cbi8vIGluc3RhbGwgcGxhdGZvcm0gc3BlY2lmaWMgdXRpbHNcblZ1ZSQyLmNvbmZpZy5tdXN0VXNlUHJvcCA9IG11c3RVc2VQcm9wO1xuVnVlJDIuY29uZmlnLmlzUmVzZXJ2ZWRUYWcgPSBpc1Jlc2VydmVkVGFnO1xuVnVlJDIuY29uZmlnLmdldFRhZ05hbWVzcGFjZSA9IGdldFRhZ05hbWVzcGFjZTtcblZ1ZSQyLmNvbmZpZy5pc1Vua25vd25FbGVtZW50ID0gaXNVbmtub3duRWxlbWVudDtcblxuLy8gaW5zdGFsbCBwbGF0Zm9ybSBydW50aW1lIGRpcmVjdGl2ZXMgJiBjb21wb25lbnRzXG5leHRlbmQoVnVlJDIub3B0aW9ucy5kaXJlY3RpdmVzLCBwbGF0Zm9ybURpcmVjdGl2ZXMpO1xuZXh0ZW5kKFZ1ZSQyLm9wdGlvbnMuY29tcG9uZW50cywgcGxhdGZvcm1Db21wb25lbnRzKTtcblxuLy8gaW5zdGFsbCBwbGF0Zm9ybSBwYXRjaCBmdW5jdGlvblxuVnVlJDIucHJvdG90eXBlLl9fcGF0Y2hfXyA9IGluQnJvd3NlciA/IHBhdGNoIDogbm9vcDtcblxuLy8gcHVibGljIG1vdW50IG1ldGhvZFxuVnVlJDIucHJvdG90eXBlLiRtb3VudCA9IGZ1bmN0aW9uIChcbiAgZWwsXG4gIGh5ZHJhdGluZ1xuKSB7XG4gIGVsID0gZWwgJiYgaW5Ccm93c2VyID8gcXVlcnkoZWwpIDogdW5kZWZpbmVkO1xuICByZXR1cm4gbW91bnRDb21wb25lbnQodGhpcywgZWwsIGh5ZHJhdGluZylcbn07XG5cbi8vIGRldnRvb2xzIGdsb2JhbCBob29rXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gIGlmIChjb25maWcuZGV2dG9vbHMpIHtcbiAgICBpZiAoZGV2dG9vbHMpIHtcbiAgICAgIGRldnRvb2xzLmVtaXQoJ2luaXQnLCBWdWUkMik7XG4gICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIGlzQ2hyb21lKSB7XG4gICAgICBjb25zb2xlW2NvbnNvbGUuaW5mbyA/ICdpbmZvJyA6ICdsb2cnXShcbiAgICAgICAgJ0Rvd25sb2FkIHRoZSBWdWUgRGV2dG9vbHMgZXh0ZW5zaW9uIGZvciBhIGJldHRlciBkZXZlbG9wbWVudCBleHBlcmllbmNlOlxcbicgK1xuICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL3Z1ZWpzL3Z1ZS1kZXZ0b29scydcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmXG4gICAgICBjb25maWcucHJvZHVjdGlvblRpcCAhPT0gZmFsc2UgJiZcbiAgICAgIGluQnJvd3NlciAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb25zb2xlW2NvbnNvbGUuaW5mbyA/ICdpbmZvJyA6ICdsb2cnXShcbiAgICAgIFwiWW91IGFyZSBydW5uaW5nIFZ1ZSBpbiBkZXZlbG9wbWVudCBtb2RlLlxcblwiICtcbiAgICAgIFwiTWFrZSBzdXJlIHRvIHR1cm4gb24gcHJvZHVjdGlvbiBtb2RlIHdoZW4gZGVwbG95aW5nIGZvciBwcm9kdWN0aW9uLlxcblwiICtcbiAgICAgIFwiU2VlIG1vcmUgdGlwcyBhdCBodHRwczovL3Z1ZWpzLm9yZy9ndWlkZS9kZXBsb3ltZW50Lmh0bWxcIlxuICAgICk7XG4gIH1cbn0sIDApO1xuXG5leHBvcnQgZGVmYXVsdCBWdWUkMjtcbiIsIi8qKlxuICogdnVleCB2Mi4yLjFcbiAqIChjKSAyMDE3IEV2YW4gWW91XG4gKiBAbGljZW5zZSBNSVRcbiAqL1xudmFyIGFwcGx5TWl4aW4gPSBmdW5jdGlvbiAoVnVlKSB7XG4gIHZhciB2ZXJzaW9uID0gTnVtYmVyKFZ1ZS52ZXJzaW9uLnNwbGl0KCcuJylbMF0pO1xuXG4gIGlmICh2ZXJzaW9uID49IDIpIHtcbiAgICB2YXIgdXNlc0luaXQgPSBWdWUuY29uZmlnLl9saWZlY3ljbGVIb29rcy5pbmRleE9mKCdpbml0JykgPiAtMTtcbiAgICBWdWUubWl4aW4odXNlc0luaXQgPyB7IGluaXQ6IHZ1ZXhJbml0IH0gOiB7IGJlZm9yZUNyZWF0ZTogdnVleEluaXQgfSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gb3ZlcnJpZGUgaW5pdCBhbmQgaW5qZWN0IHZ1ZXggaW5pdCBwcm9jZWR1cmVcbiAgICAvLyBmb3IgMS54IGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICAgIHZhciBfaW5pdCA9IFZ1ZS5wcm90b3R5cGUuX2luaXQ7XG4gICAgVnVlLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICBpZiAoIG9wdGlvbnMgPT09IHZvaWQgMCApIG9wdGlvbnMgPSB7fTtcblxuICAgICAgb3B0aW9ucy5pbml0ID0gb3B0aW9ucy5pbml0XG4gICAgICAgID8gW3Z1ZXhJbml0XS5jb25jYXQob3B0aW9ucy5pbml0KVxuICAgICAgICA6IHZ1ZXhJbml0O1xuICAgICAgX2luaXQuY2FsbCh0aGlzLCBvcHRpb25zKTtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFZ1ZXggaW5pdCBob29rLCBpbmplY3RlZCBpbnRvIGVhY2ggaW5zdGFuY2VzIGluaXQgaG9va3MgbGlzdC5cbiAgICovXG5cbiAgZnVuY3Rpb24gdnVleEluaXQgKCkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy4kb3B0aW9ucztcbiAgICAvLyBzdG9yZSBpbmplY3Rpb25cbiAgICBpZiAob3B0aW9ucy5zdG9yZSkge1xuICAgICAgdGhpcy4kc3RvcmUgPSBvcHRpb25zLnN0b3JlO1xuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5wYXJlbnQgJiYgb3B0aW9ucy5wYXJlbnQuJHN0b3JlKSB7XG4gICAgICB0aGlzLiRzdG9yZSA9IG9wdGlvbnMucGFyZW50LiRzdG9yZTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBkZXZ0b29sSG9vayA9XG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gIHdpbmRvdy5fX1ZVRV9ERVZUT09MU19HTE9CQUxfSE9PS19fO1xuXG5mdW5jdGlvbiBkZXZ0b29sUGx1Z2luIChzdG9yZSkge1xuICBpZiAoIWRldnRvb2xIb29rKSB7IHJldHVybiB9XG5cbiAgc3RvcmUuX2RldnRvb2xIb29rID0gZGV2dG9vbEhvb2s7XG5cbiAgZGV2dG9vbEhvb2suZW1pdCgndnVleDppbml0Jywgc3RvcmUpO1xuXG4gIGRldnRvb2xIb29rLm9uKCd2dWV4OnRyYXZlbC10by1zdGF0ZScsIGZ1bmN0aW9uICh0YXJnZXRTdGF0ZSkge1xuICAgIHN0b3JlLnJlcGxhY2VTdGF0ZSh0YXJnZXRTdGF0ZSk7XG4gIH0pO1xuXG4gIHN0b3JlLnN1YnNjcmliZShmdW5jdGlvbiAobXV0YXRpb24sIHN0YXRlKSB7XG4gICAgZGV2dG9vbEhvb2suZW1pdCgndnVleDptdXRhdGlvbicsIG11dGF0aW9uLCBzdGF0ZSk7XG4gIH0pO1xufVxuXG4vKipcbiAqIEdldCB0aGUgZmlyc3QgaXRlbSB0aGF0IHBhc3MgdGhlIHRlc3RcbiAqIGJ5IHNlY29uZCBhcmd1bWVudCBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGxpc3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZcbiAqIEByZXR1cm4geyp9XG4gKi9cbi8qKlxuICogRGVlcCBjb3B5IHRoZSBnaXZlbiBvYmplY3QgY29uc2lkZXJpbmcgY2lyY3VsYXIgc3RydWN0dXJlLlxuICogVGhpcyBmdW5jdGlvbiBjYWNoZXMgYWxsIG5lc3RlZCBvYmplY3RzIGFuZCBpdHMgY29waWVzLlxuICogSWYgaXQgZGV0ZWN0cyBjaXJjdWxhciBzdHJ1Y3R1cmUsIHVzZSBjYWNoZWQgY29weSB0byBhdm9pZCBpbmZpbml0ZSBsb29wLlxuICpcbiAqIEBwYXJhbSB7Kn0gb2JqXG4gKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGNhY2hlXG4gKiBAcmV0dXJuIHsqfVxuICovXG5cblxuLyoqXG4gKiBmb3JFYWNoIGZvciBvYmplY3RcbiAqL1xuZnVuY3Rpb24gZm9yRWFjaFZhbHVlIChvYmosIGZuKSB7XG4gIE9iamVjdC5rZXlzKG9iaikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBmbihvYmpba2V5XSwga2V5KTsgfSk7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0IChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0J1xufVxuXG5mdW5jdGlvbiBpc1Byb21pc2UgKHZhbCkge1xuICByZXR1cm4gdmFsICYmIHR5cGVvZiB2YWwudGhlbiA9PT0gJ2Z1bmN0aW9uJ1xufVxuXG5mdW5jdGlvbiBhc3NlcnQgKGNvbmRpdGlvbiwgbXNnKSB7XG4gIGlmICghY29uZGl0aW9uKSB7IHRocm93IG5ldyBFcnJvcigoXCJbdnVleF0gXCIgKyBtc2cpKSB9XG59XG5cbnZhciBNb2R1bGUgPSBmdW5jdGlvbiBNb2R1bGUgKHJhd01vZHVsZSwgcnVudGltZSkge1xuICB0aGlzLnJ1bnRpbWUgPSBydW50aW1lO1xuICB0aGlzLl9jaGlsZHJlbiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHRoaXMuX3Jhd01vZHVsZSA9IHJhd01vZHVsZTtcbn07XG5cbnZhciBwcm90b3R5cGVBY2Nlc3NvcnMkMSA9IHsgc3RhdGU6IHt9LG5hbWVzcGFjZWQ6IHt9IH07XG5cbnByb3RvdHlwZUFjY2Vzc29ycyQxLnN0YXRlLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuX3Jhd01vZHVsZS5zdGF0ZSB8fCB7fVxufTtcblxucHJvdG90eXBlQWNjZXNzb3JzJDEubmFtZXNwYWNlZC5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAhIXRoaXMuX3Jhd01vZHVsZS5uYW1lc3BhY2VkXG59O1xuXG5Nb2R1bGUucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24gYWRkQ2hpbGQgKGtleSwgbW9kdWxlKSB7XG4gIHRoaXMuX2NoaWxkcmVuW2tleV0gPSBtb2R1bGU7XG59O1xuXG5Nb2R1bGUucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24gcmVtb3ZlQ2hpbGQgKGtleSkge1xuICBkZWxldGUgdGhpcy5fY2hpbGRyZW5ba2V5XTtcbn07XG5cbk1vZHVsZS5wcm90b3R5cGUuZ2V0Q2hpbGQgPSBmdW5jdGlvbiBnZXRDaGlsZCAoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9jaGlsZHJlbltrZXldXG59O1xuXG5Nb2R1bGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSAocmF3TW9kdWxlKSB7XG4gIHRoaXMuX3Jhd01vZHVsZS5uYW1lc3BhY2VkID0gcmF3TW9kdWxlLm5hbWVzcGFjZWQ7XG4gIGlmIChyYXdNb2R1bGUuYWN0aW9ucykge1xuICAgIHRoaXMuX3Jhd01vZHVsZS5hY3Rpb25zID0gcmF3TW9kdWxlLmFjdGlvbnM7XG4gIH1cbiAgaWYgKHJhd01vZHVsZS5tdXRhdGlvbnMpIHtcbiAgICB0aGlzLl9yYXdNb2R1bGUubXV0YXRpb25zID0gcmF3TW9kdWxlLm11dGF0aW9ucztcbiAgfVxuICBpZiAocmF3TW9kdWxlLmdldHRlcnMpIHtcbiAgICB0aGlzLl9yYXdNb2R1bGUuZ2V0dGVycyA9IHJhd01vZHVsZS5nZXR0ZXJzO1xuICB9XG59O1xuXG5Nb2R1bGUucHJvdG90eXBlLmZvckVhY2hDaGlsZCA9IGZ1bmN0aW9uIGZvckVhY2hDaGlsZCAoZm4pIHtcbiAgZm9yRWFjaFZhbHVlKHRoaXMuX2NoaWxkcmVuLCBmbik7XG59O1xuXG5Nb2R1bGUucHJvdG90eXBlLmZvckVhY2hHZXR0ZXIgPSBmdW5jdGlvbiBmb3JFYWNoR2V0dGVyIChmbikge1xuICBpZiAodGhpcy5fcmF3TW9kdWxlLmdldHRlcnMpIHtcbiAgICBmb3JFYWNoVmFsdWUodGhpcy5fcmF3TW9kdWxlLmdldHRlcnMsIGZuKTtcbiAgfVxufTtcblxuTW9kdWxlLnByb3RvdHlwZS5mb3JFYWNoQWN0aW9uID0gZnVuY3Rpb24gZm9yRWFjaEFjdGlvbiAoZm4pIHtcbiAgaWYgKHRoaXMuX3Jhd01vZHVsZS5hY3Rpb25zKSB7XG4gICAgZm9yRWFjaFZhbHVlKHRoaXMuX3Jhd01vZHVsZS5hY3Rpb25zLCBmbik7XG4gIH1cbn07XG5cbk1vZHVsZS5wcm90b3R5cGUuZm9yRWFjaE11dGF0aW9uID0gZnVuY3Rpb24gZm9yRWFjaE11dGF0aW9uIChmbikge1xuICBpZiAodGhpcy5fcmF3TW9kdWxlLm11dGF0aW9ucykge1xuICAgIGZvckVhY2hWYWx1ZSh0aGlzLl9yYXdNb2R1bGUubXV0YXRpb25zLCBmbik7XG4gIH1cbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBNb2R1bGUucHJvdG90eXBlLCBwcm90b3R5cGVBY2Nlc3NvcnMkMSApO1xuXG52YXIgTW9kdWxlQ29sbGVjdGlvbiA9IGZ1bmN0aW9uIE1vZHVsZUNvbGxlY3Rpb24gKHJhd1Jvb3RNb2R1bGUpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgLy8gcmVnaXN0ZXIgcm9vdCBtb2R1bGUgKFZ1ZXguU3RvcmUgb3B0aW9ucylcbiAgdGhpcy5yb290ID0gbmV3IE1vZHVsZShyYXdSb290TW9kdWxlLCBmYWxzZSk7XG5cbiAgLy8gcmVnaXN0ZXIgYWxsIG5lc3RlZCBtb2R1bGVzXG4gIGlmIChyYXdSb290TW9kdWxlLm1vZHVsZXMpIHtcbiAgICBmb3JFYWNoVmFsdWUocmF3Um9vdE1vZHVsZS5tb2R1bGVzLCBmdW5jdGlvbiAocmF3TW9kdWxlLCBrZXkpIHtcbiAgICAgIHRoaXMkMS5yZWdpc3Rlcihba2V5XSwgcmF3TW9kdWxlLCBmYWxzZSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbk1vZHVsZUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIGdldCAocGF0aCkge1xuICByZXR1cm4gcGF0aC5yZWR1Y2UoZnVuY3Rpb24gKG1vZHVsZSwga2V5KSB7XG4gICAgcmV0dXJuIG1vZHVsZS5nZXRDaGlsZChrZXkpXG4gIH0sIHRoaXMucm9vdClcbn07XG5cbk1vZHVsZUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldE5hbWVzcGFjZSA9IGZ1bmN0aW9uIGdldE5hbWVzcGFjZSAocGF0aCkge1xuICB2YXIgbW9kdWxlID0gdGhpcy5yb290O1xuICByZXR1cm4gcGF0aC5yZWR1Y2UoZnVuY3Rpb24gKG5hbWVzcGFjZSwga2V5KSB7XG4gICAgbW9kdWxlID0gbW9kdWxlLmdldENoaWxkKGtleSk7XG4gICAgcmV0dXJuIG5hbWVzcGFjZSArIChtb2R1bGUubmFtZXNwYWNlZCA/IGtleSArICcvJyA6ICcnKVxuICB9LCAnJylcbn07XG5cbk1vZHVsZUNvbGxlY3Rpb24ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZSQxIChyYXdSb290TW9kdWxlKSB7XG4gIHVwZGF0ZSh0aGlzLnJvb3QsIHJhd1Jvb3RNb2R1bGUpO1xufTtcblxuTW9kdWxlQ29sbGVjdGlvbi5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiByZWdpc3RlciAocGF0aCwgcmF3TW9kdWxlLCBydW50aW1lKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG4gICAgaWYgKCBydW50aW1lID09PSB2b2lkIDAgKSBydW50aW1lID0gdHJ1ZTtcblxuICB2YXIgcGFyZW50ID0gdGhpcy5nZXQocGF0aC5zbGljZSgwLCAtMSkpO1xuICB2YXIgbmV3TW9kdWxlID0gbmV3IE1vZHVsZShyYXdNb2R1bGUsIHJ1bnRpbWUpO1xuICBwYXJlbnQuYWRkQ2hpbGQocGF0aFtwYXRoLmxlbmd0aCAtIDFdLCBuZXdNb2R1bGUpO1xuXG4gIC8vIHJlZ2lzdGVyIG5lc3RlZCBtb2R1bGVzXG4gIGlmIChyYXdNb2R1bGUubW9kdWxlcykge1xuICAgIGZvckVhY2hWYWx1ZShyYXdNb2R1bGUubW9kdWxlcywgZnVuY3Rpb24gKHJhd0NoaWxkTW9kdWxlLCBrZXkpIHtcbiAgICAgIHRoaXMkMS5yZWdpc3RlcihwYXRoLmNvbmNhdChrZXkpLCByYXdDaGlsZE1vZHVsZSwgcnVudGltZSk7XG4gICAgfSk7XG4gIH1cbn07XG5cbk1vZHVsZUNvbGxlY3Rpb24ucHJvdG90eXBlLnVucmVnaXN0ZXIgPSBmdW5jdGlvbiB1bnJlZ2lzdGVyIChwYXRoKSB7XG4gIHZhciBwYXJlbnQgPSB0aGlzLmdldChwYXRoLnNsaWNlKDAsIC0xKSk7XG4gIHZhciBrZXkgPSBwYXRoW3BhdGgubGVuZ3RoIC0gMV07XG4gIGlmICghcGFyZW50LmdldENoaWxkKGtleSkucnVudGltZSkgeyByZXR1cm4gfVxuXG4gIHBhcmVudC5yZW1vdmVDaGlsZChrZXkpO1xufTtcblxuZnVuY3Rpb24gdXBkYXRlICh0YXJnZXRNb2R1bGUsIG5ld01vZHVsZSkge1xuICAvLyB1cGRhdGUgdGFyZ2V0IG1vZHVsZVxuICB0YXJnZXRNb2R1bGUudXBkYXRlKG5ld01vZHVsZSk7XG5cbiAgLy8gdXBkYXRlIG5lc3RlZCBtb2R1bGVzXG4gIGlmIChuZXdNb2R1bGUubW9kdWxlcykge1xuICAgIGZvciAodmFyIGtleSBpbiBuZXdNb2R1bGUubW9kdWxlcykge1xuICAgICAgaWYgKCF0YXJnZXRNb2R1bGUuZ2V0Q2hpbGQoa2V5KSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgXCJbdnVleF0gdHJ5aW5nIHRvIGFkZCBhIG5ldyBtb2R1bGUgJ1wiICsga2V5ICsgXCInIG9uIGhvdCByZWxvYWRpbmcsIFwiICtcbiAgICAgICAgICAnbWFudWFsIHJlbG9hZCBpcyBuZWVkZWQnXG4gICAgICAgICk7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdXBkYXRlKHRhcmdldE1vZHVsZS5nZXRDaGlsZChrZXkpLCBuZXdNb2R1bGUubW9kdWxlc1trZXldKTtcbiAgICB9XG4gIH1cbn1cblxudmFyIFZ1ZTsgLy8gYmluZCBvbiBpbnN0YWxsXG5cbnZhciBTdG9yZSA9IGZ1bmN0aW9uIFN0b3JlIChvcHRpb25zKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuICBpZiAoIG9wdGlvbnMgPT09IHZvaWQgMCApIG9wdGlvbnMgPSB7fTtcblxuICBhc3NlcnQoVnVlLCBcIm11c3QgY2FsbCBWdWUudXNlKFZ1ZXgpIGJlZm9yZSBjcmVhdGluZyBhIHN0b3JlIGluc3RhbmNlLlwiKTtcbiAgYXNzZXJ0KHR5cGVvZiBQcm9taXNlICE9PSAndW5kZWZpbmVkJywgXCJ2dWV4IHJlcXVpcmVzIGEgUHJvbWlzZSBwb2x5ZmlsbCBpbiB0aGlzIGJyb3dzZXIuXCIpO1xuXG4gIHZhciBzdGF0ZSA9IG9wdGlvbnMuc3RhdGU7IGlmICggc3RhdGUgPT09IHZvaWQgMCApIHN0YXRlID0ge307XG4gIHZhciBwbHVnaW5zID0gb3B0aW9ucy5wbHVnaW5zOyBpZiAoIHBsdWdpbnMgPT09IHZvaWQgMCApIHBsdWdpbnMgPSBbXTtcbiAgdmFyIHN0cmljdCA9IG9wdGlvbnMuc3RyaWN0OyBpZiAoIHN0cmljdCA9PT0gdm9pZCAwICkgc3RyaWN0ID0gZmFsc2U7XG5cbiAgLy8gc3RvcmUgaW50ZXJuYWwgc3RhdGVcbiAgdGhpcy5fY29tbWl0dGluZyA9IGZhbHNlO1xuICB0aGlzLl9hY3Rpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdGhpcy5fbXV0YXRpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdGhpcy5fd3JhcHBlZEdldHRlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB0aGlzLl9tb2R1bGVzID0gbmV3IE1vZHVsZUNvbGxlY3Rpb24ob3B0aW9ucyk7XG4gIHRoaXMuX21vZHVsZXNOYW1lc3BhY2VNYXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB0aGlzLl9zdWJzY3JpYmVycyA9IFtdO1xuICB0aGlzLl93YXRjaGVyVk0gPSBuZXcgVnVlKCk7XG5cbiAgLy8gYmluZCBjb21taXQgYW5kIGRpc3BhdGNoIHRvIHNlbGZcbiAgdmFyIHN0b3JlID0gdGhpcztcbiAgdmFyIHJlZiA9IHRoaXM7XG4gIHZhciBkaXNwYXRjaCA9IHJlZi5kaXNwYXRjaDtcbiAgdmFyIGNvbW1pdCA9IHJlZi5jb21taXQ7XG4gIHRoaXMuZGlzcGF0Y2ggPSBmdW5jdGlvbiBib3VuZERpc3BhdGNoICh0eXBlLCBwYXlsb2FkKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoLmNhbGwoc3RvcmUsIHR5cGUsIHBheWxvYWQpXG4gIH07XG4gIHRoaXMuY29tbWl0ID0gZnVuY3Rpb24gYm91bmRDb21taXQgKHR5cGUsIHBheWxvYWQsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gY29tbWl0LmNhbGwoc3RvcmUsIHR5cGUsIHBheWxvYWQsIG9wdGlvbnMpXG4gIH07XG5cbiAgLy8gc3RyaWN0IG1vZGVcbiAgdGhpcy5zdHJpY3QgPSBzdHJpY3Q7XG5cbiAgLy8gaW5pdCByb290IG1vZHVsZS5cbiAgLy8gdGhpcyBhbHNvIHJlY3Vyc2l2ZWx5IHJlZ2lzdGVycyBhbGwgc3ViLW1vZHVsZXNcbiAgLy8gYW5kIGNvbGxlY3RzIGFsbCBtb2R1bGUgZ2V0dGVycyBpbnNpZGUgdGhpcy5fd3JhcHBlZEdldHRlcnNcbiAgaW5zdGFsbE1vZHVsZSh0aGlzLCBzdGF0ZSwgW10sIHRoaXMuX21vZHVsZXMucm9vdCk7XG5cbiAgLy8gaW5pdGlhbGl6ZSB0aGUgc3RvcmUgdm0sIHdoaWNoIGlzIHJlc3BvbnNpYmxlIGZvciB0aGUgcmVhY3Rpdml0eVxuICAvLyAoYWxzbyByZWdpc3RlcnMgX3dyYXBwZWRHZXR0ZXJzIGFzIGNvbXB1dGVkIHByb3BlcnRpZXMpXG4gIHJlc2V0U3RvcmVWTSh0aGlzLCBzdGF0ZSk7XG5cbiAgLy8gYXBwbHkgcGx1Z2luc1xuICBwbHVnaW5zLmNvbmNhdChkZXZ0b29sUGx1Z2luKS5mb3JFYWNoKGZ1bmN0aW9uIChwbHVnaW4pIHsgcmV0dXJuIHBsdWdpbih0aGlzJDEpOyB9KTtcbn07XG5cbnZhciBwcm90b3R5cGVBY2Nlc3NvcnMgPSB7IHN0YXRlOiB7fSB9O1xuXG5wcm90b3R5cGVBY2Nlc3NvcnMuc3RhdGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5fdm0uX2RhdGEuJCRzdGF0ZVxufTtcblxucHJvdG90eXBlQWNjZXNzb3JzLnN0YXRlLnNldCA9IGZ1bmN0aW9uICh2KSB7XG4gIGFzc2VydChmYWxzZSwgXCJVc2Ugc3RvcmUucmVwbGFjZVN0YXRlKCkgdG8gZXhwbGljaXQgcmVwbGFjZSBzdG9yZSBzdGF0ZS5cIik7XG59O1xuXG5TdG9yZS5wcm90b3R5cGUuY29tbWl0ID0gZnVuY3Rpb24gY29tbWl0IChfdHlwZSwgX3BheWxvYWQsIF9vcHRpb25zKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgLy8gY2hlY2sgb2JqZWN0LXN0eWxlIGNvbW1pdFxuICB2YXIgcmVmID0gdW5pZnlPYmplY3RTdHlsZShfdHlwZSwgX3BheWxvYWQsIF9vcHRpb25zKTtcbiAgICB2YXIgdHlwZSA9IHJlZi50eXBlO1xuICAgIHZhciBwYXlsb2FkID0gcmVmLnBheWxvYWQ7XG4gICAgdmFyIG9wdGlvbnMgPSByZWYub3B0aW9ucztcblxuICB2YXIgbXV0YXRpb24gPSB7IHR5cGU6IHR5cGUsIHBheWxvYWQ6IHBheWxvYWQgfTtcbiAgdmFyIGVudHJ5ID0gdGhpcy5fbXV0YXRpb25zW3R5cGVdO1xuICBpZiAoIWVudHJ5KSB7XG4gICAgY29uc29sZS5lcnJvcigoXCJbdnVleF0gdW5rbm93biBtdXRhdGlvbiB0eXBlOiBcIiArIHR5cGUpKTtcbiAgICByZXR1cm5cbiAgfVxuICB0aGlzLl93aXRoQ29tbWl0KGZ1bmN0aW9uICgpIHtcbiAgICBlbnRyeS5mb3JFYWNoKGZ1bmN0aW9uIGNvbW1pdEl0ZXJhdG9yIChoYW5kbGVyKSB7XG4gICAgICBoYW5kbGVyKHBheWxvYWQpO1xuICAgIH0pO1xuICB9KTtcbiAgdGhpcy5fc3Vic2NyaWJlcnMuZm9yRWFjaChmdW5jdGlvbiAoc3ViKSB7IHJldHVybiBzdWIobXV0YXRpb24sIHRoaXMkMS5zdGF0ZSk7IH0pO1xuXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuc2lsZW50KSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgXCJbdnVleF0gbXV0YXRpb24gdHlwZTogXCIgKyB0eXBlICsgXCIuIFNpbGVudCBvcHRpb24gaGFzIGJlZW4gcmVtb3ZlZC4gXCIgK1xuICAgICAgJ1VzZSB0aGUgZmlsdGVyIGZ1bmN0aW9uYWxpdHkgaW4gdGhlIHZ1ZS1kZXZ0b29scydcbiAgICApO1xuICB9XG59O1xuXG5TdG9yZS5wcm90b3R5cGUuZGlzcGF0Y2ggPSBmdW5jdGlvbiBkaXNwYXRjaCAoX3R5cGUsIF9wYXlsb2FkKSB7XG4gIC8vIGNoZWNrIG9iamVjdC1zdHlsZSBkaXNwYXRjaFxuICB2YXIgcmVmID0gdW5pZnlPYmplY3RTdHlsZShfdHlwZSwgX3BheWxvYWQpO1xuICAgIHZhciB0eXBlID0gcmVmLnR5cGU7XG4gICAgdmFyIHBheWxvYWQgPSByZWYucGF5bG9hZDtcblxuICB2YXIgZW50cnkgPSB0aGlzLl9hY3Rpb25zW3R5cGVdO1xuICBpZiAoIWVudHJ5KSB7XG4gICAgY29uc29sZS5lcnJvcigoXCJbdnVleF0gdW5rbm93biBhY3Rpb24gdHlwZTogXCIgKyB0eXBlKSk7XG4gICAgcmV0dXJuXG4gIH1cbiAgcmV0dXJuIGVudHJ5Lmxlbmd0aCA+IDFcbiAgICA/IFByb21pc2UuYWxsKGVudHJ5Lm1hcChmdW5jdGlvbiAoaGFuZGxlcikgeyByZXR1cm4gaGFuZGxlcihwYXlsb2FkKTsgfSkpXG4gICAgOiBlbnRyeVswXShwYXlsb2FkKVxufTtcblxuU3RvcmUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIHN1YnNjcmliZSAoZm4pIHtcbiAgdmFyIHN1YnMgPSB0aGlzLl9zdWJzY3JpYmVycztcbiAgaWYgKHN1YnMuaW5kZXhPZihmbikgPCAwKSB7XG4gICAgc3Vicy5wdXNoKGZuKTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBpID0gc3Vicy5pbmRleE9mKGZuKTtcbiAgICBpZiAoaSA+IC0xKSB7XG4gICAgICBzdWJzLnNwbGljZShpLCAxKTtcbiAgICB9XG4gIH1cbn07XG5cblN0b3JlLnByb3RvdHlwZS53YXRjaCA9IGZ1bmN0aW9uIHdhdGNoIChnZXR0ZXIsIGNiLCBvcHRpb25zKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgYXNzZXJ0KHR5cGVvZiBnZXR0ZXIgPT09ICdmdW5jdGlvbicsIFwic3RvcmUud2F0Y2ggb25seSBhY2NlcHRzIGEgZnVuY3Rpb24uXCIpO1xuICByZXR1cm4gdGhpcy5fd2F0Y2hlclZNLiR3YXRjaChmdW5jdGlvbiAoKSB7IHJldHVybiBnZXR0ZXIodGhpcyQxLnN0YXRlLCB0aGlzJDEuZ2V0dGVycyk7IH0sIGNiLCBvcHRpb25zKVxufTtcblxuU3RvcmUucHJvdG90eXBlLnJlcGxhY2VTdGF0ZSA9IGZ1bmN0aW9uIHJlcGxhY2VTdGF0ZSAoc3RhdGUpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB0aGlzLl93aXRoQ29tbWl0KGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzJDEuX3ZtLl9kYXRhLiQkc3RhdGUgPSBzdGF0ZTtcbiAgfSk7XG59O1xuXG5TdG9yZS5wcm90b3R5cGUucmVnaXN0ZXJNb2R1bGUgPSBmdW5jdGlvbiByZWdpc3Rlck1vZHVsZSAocGF0aCwgcmF3TW9kdWxlKSB7XG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHsgcGF0aCA9IFtwYXRoXTsgfVxuICBhc3NlcnQoQXJyYXkuaXNBcnJheShwYXRoKSwgXCJtb2R1bGUgcGF0aCBtdXN0IGJlIGEgc3RyaW5nIG9yIGFuIEFycmF5LlwiKTtcbiAgdGhpcy5fbW9kdWxlcy5yZWdpc3RlcihwYXRoLCByYXdNb2R1bGUpO1xuICBpbnN0YWxsTW9kdWxlKHRoaXMsIHRoaXMuc3RhdGUsIHBhdGgsIHRoaXMuX21vZHVsZXMuZ2V0KHBhdGgpKTtcbiAgLy8gcmVzZXQgc3RvcmUgdG8gdXBkYXRlIGdldHRlcnMuLi5cbiAgcmVzZXRTdG9yZVZNKHRoaXMsIHRoaXMuc3RhdGUpO1xufTtcblxuU3RvcmUucHJvdG90eXBlLnVucmVnaXN0ZXJNb2R1bGUgPSBmdW5jdGlvbiB1bnJlZ2lzdGVyTW9kdWxlIChwYXRoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykgeyBwYXRoID0gW3BhdGhdOyB9XG4gIGFzc2VydChBcnJheS5pc0FycmF5KHBhdGgpLCBcIm1vZHVsZSBwYXRoIG11c3QgYmUgYSBzdHJpbmcgb3IgYW4gQXJyYXkuXCIpO1xuICB0aGlzLl9tb2R1bGVzLnVucmVnaXN0ZXIocGF0aCk7XG4gIHRoaXMuX3dpdGhDb21taXQoZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJlbnRTdGF0ZSA9IGdldE5lc3RlZFN0YXRlKHRoaXMkMS5zdGF0ZSwgcGF0aC5zbGljZSgwLCAtMSkpO1xuICAgIFZ1ZS5kZWxldGUocGFyZW50U3RhdGUsIHBhdGhbcGF0aC5sZW5ndGggLSAxXSk7XG4gIH0pO1xuICByZXNldFN0b3JlKHRoaXMpO1xufTtcblxuU3RvcmUucHJvdG90eXBlLmhvdFVwZGF0ZSA9IGZ1bmN0aW9uIGhvdFVwZGF0ZSAobmV3T3B0aW9ucykge1xuICB0aGlzLl9tb2R1bGVzLnVwZGF0ZShuZXdPcHRpb25zKTtcbiAgcmVzZXRTdG9yZSh0aGlzLCB0cnVlKTtcbn07XG5cblN0b3JlLnByb3RvdHlwZS5fd2l0aENvbW1pdCA9IGZ1bmN0aW9uIF93aXRoQ29tbWl0IChmbikge1xuICB2YXIgY29tbWl0dGluZyA9IHRoaXMuX2NvbW1pdHRpbmc7XG4gIHRoaXMuX2NvbW1pdHRpbmcgPSB0cnVlO1xuICBmbigpO1xuICB0aGlzLl9jb21taXR0aW5nID0gY29tbWl0dGluZztcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBTdG9yZS5wcm90b3R5cGUsIHByb3RvdHlwZUFjY2Vzc29ycyApO1xuXG5mdW5jdGlvbiByZXNldFN0b3JlIChzdG9yZSwgaG90KSB7XG4gIHN0b3JlLl9hY3Rpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgc3RvcmUuX211dGF0aW9ucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHN0b3JlLl93cmFwcGVkR2V0dGVycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIHN0b3JlLl9tb2R1bGVzTmFtZXNwYWNlTWFwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdmFyIHN0YXRlID0gc3RvcmUuc3RhdGU7XG4gIC8vIGluaXQgYWxsIG1vZHVsZXNcbiAgaW5zdGFsbE1vZHVsZShzdG9yZSwgc3RhdGUsIFtdLCBzdG9yZS5fbW9kdWxlcy5yb290LCB0cnVlKTtcbiAgLy8gcmVzZXQgdm1cbiAgcmVzZXRTdG9yZVZNKHN0b3JlLCBzdGF0ZSwgaG90KTtcbn1cblxuZnVuY3Rpb24gcmVzZXRTdG9yZVZNIChzdG9yZSwgc3RhdGUsIGhvdCkge1xuICB2YXIgb2xkVm0gPSBzdG9yZS5fdm07XG5cbiAgLy8gYmluZCBzdG9yZSBwdWJsaWMgZ2V0dGVyc1xuICBzdG9yZS5nZXR0ZXJzID0ge307XG4gIHZhciB3cmFwcGVkR2V0dGVycyA9IHN0b3JlLl93cmFwcGVkR2V0dGVycztcbiAgdmFyIGNvbXB1dGVkID0ge307XG4gIGZvckVhY2hWYWx1ZSh3cmFwcGVkR2V0dGVycywgZnVuY3Rpb24gKGZuLCBrZXkpIHtcbiAgICAvLyB1c2UgY29tcHV0ZWQgdG8gbGV2ZXJhZ2UgaXRzIGxhenktY2FjaGluZyBtZWNoYW5pc21cbiAgICBjb21wdXRlZFtrZXldID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZm4oc3RvcmUpOyB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzdG9yZS5nZXR0ZXJzLCBrZXksIHtcbiAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc3RvcmUuX3ZtW2tleV07IH0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlIC8vIGZvciBsb2NhbCBnZXR0ZXJzXG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIHVzZSBhIFZ1ZSBpbnN0YW5jZSB0byBzdG9yZSB0aGUgc3RhdGUgdHJlZVxuICAvLyBzdXBwcmVzcyB3YXJuaW5ncyBqdXN0IGluIGNhc2UgdGhlIHVzZXIgaGFzIGFkZGVkXG4gIC8vIHNvbWUgZnVua3kgZ2xvYmFsIG1peGluc1xuICB2YXIgc2lsZW50ID0gVnVlLmNvbmZpZy5zaWxlbnQ7XG4gIFZ1ZS5jb25maWcuc2lsZW50ID0gdHJ1ZTtcbiAgc3RvcmUuX3ZtID0gbmV3IFZ1ZSh7XG4gICAgZGF0YToge1xuICAgICAgJCRzdGF0ZTogc3RhdGVcbiAgICB9LFxuICAgIGNvbXB1dGVkOiBjb21wdXRlZFxuICB9KTtcbiAgVnVlLmNvbmZpZy5zaWxlbnQgPSBzaWxlbnQ7XG5cbiAgLy8gZW5hYmxlIHN0cmljdCBtb2RlIGZvciBuZXcgdm1cbiAgaWYgKHN0b3JlLnN0cmljdCkge1xuICAgIGVuYWJsZVN0cmljdE1vZGUoc3RvcmUpO1xuICB9XG5cbiAgaWYgKG9sZFZtKSB7XG4gICAgaWYgKGhvdCkge1xuICAgICAgLy8gZGlzcGF0Y2ggY2hhbmdlcyBpbiBhbGwgc3Vic2NyaWJlZCB3YXRjaGVyc1xuICAgICAgLy8gdG8gZm9yY2UgZ2V0dGVyIHJlLWV2YWx1YXRpb24gZm9yIGhvdCByZWxvYWRpbmcuXG4gICAgICBzdG9yZS5fd2l0aENvbW1pdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9sZFZtLl9kYXRhLiQkc3RhdGUgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuICAgIFZ1ZS5uZXh0VGljayhmdW5jdGlvbiAoKSB7IHJldHVybiBvbGRWbS4kZGVzdHJveSgpOyB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbnN0YWxsTW9kdWxlIChzdG9yZSwgcm9vdFN0YXRlLCBwYXRoLCBtb2R1bGUsIGhvdCkge1xuICB2YXIgaXNSb290ID0gIXBhdGgubGVuZ3RoO1xuICB2YXIgbmFtZXNwYWNlID0gc3RvcmUuX21vZHVsZXMuZ2V0TmFtZXNwYWNlKHBhdGgpO1xuXG4gIC8vIHJlZ2lzdGVyIGluIG5hbWVzcGFjZSBtYXBcbiAgaWYgKG5hbWVzcGFjZSkge1xuICAgIHN0b3JlLl9tb2R1bGVzTmFtZXNwYWNlTWFwW25hbWVzcGFjZV0gPSBtb2R1bGU7XG4gIH1cblxuICAvLyBzZXQgc3RhdGVcbiAgaWYgKCFpc1Jvb3QgJiYgIWhvdCkge1xuICAgIHZhciBwYXJlbnRTdGF0ZSA9IGdldE5lc3RlZFN0YXRlKHJvb3RTdGF0ZSwgcGF0aC5zbGljZSgwLCAtMSkpO1xuICAgIHZhciBtb2R1bGVOYW1lID0gcGF0aFtwYXRoLmxlbmd0aCAtIDFdO1xuICAgIHN0b3JlLl93aXRoQ29tbWl0KGZ1bmN0aW9uICgpIHtcbiAgICAgIFZ1ZS5zZXQocGFyZW50U3RhdGUsIG1vZHVsZU5hbWUsIG1vZHVsZS5zdGF0ZSk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgbG9jYWwgPSBtb2R1bGUuY29udGV4dCA9IG1ha2VMb2NhbENvbnRleHQoc3RvcmUsIG5hbWVzcGFjZSwgcGF0aCk7XG5cbiAgbW9kdWxlLmZvckVhY2hNdXRhdGlvbihmdW5jdGlvbiAobXV0YXRpb24sIGtleSkge1xuICAgIHZhciBuYW1lc3BhY2VkVHlwZSA9IG5hbWVzcGFjZSArIGtleTtcbiAgICByZWdpc3Rlck11dGF0aW9uKHN0b3JlLCBuYW1lc3BhY2VkVHlwZSwgbXV0YXRpb24sIGxvY2FsKTtcbiAgfSk7XG5cbiAgbW9kdWxlLmZvckVhY2hBY3Rpb24oZnVuY3Rpb24gKGFjdGlvbiwga2V5KSB7XG4gICAgdmFyIG5hbWVzcGFjZWRUeXBlID0gbmFtZXNwYWNlICsga2V5O1xuICAgIHJlZ2lzdGVyQWN0aW9uKHN0b3JlLCBuYW1lc3BhY2VkVHlwZSwgYWN0aW9uLCBsb2NhbCk7XG4gIH0pO1xuXG4gIG1vZHVsZS5mb3JFYWNoR2V0dGVyKGZ1bmN0aW9uIChnZXR0ZXIsIGtleSkge1xuICAgIHZhciBuYW1lc3BhY2VkVHlwZSA9IG5hbWVzcGFjZSArIGtleTtcbiAgICByZWdpc3RlckdldHRlcihzdG9yZSwgbmFtZXNwYWNlZFR5cGUsIGdldHRlciwgbG9jYWwpO1xuICB9KTtcblxuICBtb2R1bGUuZm9yRWFjaENoaWxkKGZ1bmN0aW9uIChjaGlsZCwga2V5KSB7XG4gICAgaW5zdGFsbE1vZHVsZShzdG9yZSwgcm9vdFN0YXRlLCBwYXRoLmNvbmNhdChrZXkpLCBjaGlsZCwgaG90KTtcbiAgfSk7XG59XG5cbi8qKlxuICogbWFrZSBsb2NhbGl6ZWQgZGlzcGF0Y2gsIGNvbW1pdCwgZ2V0dGVycyBhbmQgc3RhdGVcbiAqIGlmIHRoZXJlIGlzIG5vIG5hbWVzcGFjZSwganVzdCB1c2Ugcm9vdCBvbmVzXG4gKi9cbmZ1bmN0aW9uIG1ha2VMb2NhbENvbnRleHQgKHN0b3JlLCBuYW1lc3BhY2UsIHBhdGgpIHtcbiAgdmFyIG5vTmFtZXNwYWNlID0gbmFtZXNwYWNlID09PSAnJztcblxuICB2YXIgbG9jYWwgPSB7XG4gICAgZGlzcGF0Y2g6IG5vTmFtZXNwYWNlID8gc3RvcmUuZGlzcGF0Y2ggOiBmdW5jdGlvbiAoX3R5cGUsIF9wYXlsb2FkLCBfb3B0aW9ucykge1xuICAgICAgdmFyIGFyZ3MgPSB1bmlmeU9iamVjdFN0eWxlKF90eXBlLCBfcGF5bG9hZCwgX29wdGlvbnMpO1xuICAgICAgdmFyIHBheWxvYWQgPSBhcmdzLnBheWxvYWQ7XG4gICAgICB2YXIgb3B0aW9ucyA9IGFyZ3Mub3B0aW9ucztcbiAgICAgIHZhciB0eXBlID0gYXJncy50eXBlO1xuXG4gICAgICBpZiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMucm9vdCkge1xuICAgICAgICB0eXBlID0gbmFtZXNwYWNlICsgdHlwZTtcbiAgICAgICAgaWYgKCFzdG9yZS5fYWN0aW9uc1t0eXBlXSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoKFwiW3Z1ZXhdIHVua25vd24gbG9jYWwgYWN0aW9uIHR5cGU6IFwiICsgKGFyZ3MudHlwZSkgKyBcIiwgZ2xvYmFsIHR5cGU6IFwiICsgdHlwZSkpO1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdG9yZS5kaXNwYXRjaCh0eXBlLCBwYXlsb2FkKVxuICAgIH0sXG5cbiAgICBjb21taXQ6IG5vTmFtZXNwYWNlID8gc3RvcmUuY29tbWl0IDogZnVuY3Rpb24gKF90eXBlLCBfcGF5bG9hZCwgX29wdGlvbnMpIHtcbiAgICAgIHZhciBhcmdzID0gdW5pZnlPYmplY3RTdHlsZShfdHlwZSwgX3BheWxvYWQsIF9vcHRpb25zKTtcbiAgICAgIHZhciBwYXlsb2FkID0gYXJncy5wYXlsb2FkO1xuICAgICAgdmFyIG9wdGlvbnMgPSBhcmdzLm9wdGlvbnM7XG4gICAgICB2YXIgdHlwZSA9IGFyZ3MudHlwZTtcblxuICAgICAgaWYgKCFvcHRpb25zIHx8ICFvcHRpb25zLnJvb3QpIHtcbiAgICAgICAgdHlwZSA9IG5hbWVzcGFjZSArIHR5cGU7XG4gICAgICAgIGlmICghc3RvcmUuX211dGF0aW9uc1t0eXBlXSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoKFwiW3Z1ZXhdIHVua25vd24gbG9jYWwgbXV0YXRpb24gdHlwZTogXCIgKyAoYXJncy50eXBlKSArIFwiLCBnbG9iYWwgdHlwZTogXCIgKyB0eXBlKSk7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgc3RvcmUuY29tbWl0KHR5cGUsIHBheWxvYWQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfTtcblxuICAvLyBnZXR0ZXJzIGFuZCBzdGF0ZSBvYmplY3QgbXVzdCBiZSBnb3R0ZW4gbGF6aWx5XG4gIC8vIGJlY2F1c2UgdGhleSB3aWxsIGJlIGNoYW5nZWQgYnkgdm0gdXBkYXRlXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGxvY2FsLCB7XG4gICAgZ2V0dGVyczoge1xuICAgICAgZ2V0OiBub05hbWVzcGFjZVxuICAgICAgICA/IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN0b3JlLmdldHRlcnM7IH1cbiAgICAgICAgOiBmdW5jdGlvbiAoKSB7IHJldHVybiBtYWtlTG9jYWxHZXR0ZXJzKHN0b3JlLCBuYW1lc3BhY2UpOyB9XG4gICAgfSxcbiAgICBzdGF0ZToge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBnZXROZXN0ZWRTdGF0ZShzdG9yZS5zdGF0ZSwgcGF0aCk7IH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBsb2NhbFxufVxuXG5mdW5jdGlvbiBtYWtlTG9jYWxHZXR0ZXJzIChzdG9yZSwgbmFtZXNwYWNlKSB7XG4gIHZhciBnZXR0ZXJzUHJveHkgPSB7fTtcblxuICB2YXIgc3BsaXRQb3MgPSBuYW1lc3BhY2UubGVuZ3RoO1xuICBPYmplY3Qua2V5cyhzdG9yZS5nZXR0ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgLy8gc2tpcCBpZiB0aGUgdGFyZ2V0IGdldHRlciBpcyBub3QgbWF0Y2ggdGhpcyBuYW1lc3BhY2VcbiAgICBpZiAodHlwZS5zbGljZSgwLCBzcGxpdFBvcykgIT09IG5hbWVzcGFjZSkgeyByZXR1cm4gfVxuXG4gICAgLy8gZXh0cmFjdCBsb2NhbCBnZXR0ZXIgdHlwZVxuICAgIHZhciBsb2NhbFR5cGUgPSB0eXBlLnNsaWNlKHNwbGl0UG9zKTtcblxuICAgIC8vIEFkZCBhIHBvcnQgdG8gdGhlIGdldHRlcnMgcHJveHkuXG4gICAgLy8gRGVmaW5lIGFzIGdldHRlciBwcm9wZXJ0eSBiZWNhdXNlXG4gICAgLy8gd2UgZG8gbm90IHdhbnQgdG8gZXZhbHVhdGUgdGhlIGdldHRlcnMgaW4gdGhpcyB0aW1lLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShnZXR0ZXJzUHJveHksIGxvY2FsVHlwZSwge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzdG9yZS5nZXR0ZXJzW3R5cGVdOyB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gZ2V0dGVyc1Byb3h5XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyTXV0YXRpb24gKHN0b3JlLCB0eXBlLCBoYW5kbGVyLCBsb2NhbCkge1xuICB2YXIgZW50cnkgPSBzdG9yZS5fbXV0YXRpb25zW3R5cGVdIHx8IChzdG9yZS5fbXV0YXRpb25zW3R5cGVdID0gW10pO1xuICBlbnRyeS5wdXNoKGZ1bmN0aW9uIHdyYXBwZWRNdXRhdGlvbkhhbmRsZXIgKHBheWxvYWQpIHtcbiAgICBoYW5kbGVyKGxvY2FsLnN0YXRlLCBwYXlsb2FkKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyQWN0aW9uIChzdG9yZSwgdHlwZSwgaGFuZGxlciwgbG9jYWwpIHtcbiAgdmFyIGVudHJ5ID0gc3RvcmUuX2FjdGlvbnNbdHlwZV0gfHwgKHN0b3JlLl9hY3Rpb25zW3R5cGVdID0gW10pO1xuICBlbnRyeS5wdXNoKGZ1bmN0aW9uIHdyYXBwZWRBY3Rpb25IYW5kbGVyIChwYXlsb2FkLCBjYikge1xuICAgIHZhciByZXMgPSBoYW5kbGVyKHtcbiAgICAgIGRpc3BhdGNoOiBsb2NhbC5kaXNwYXRjaCxcbiAgICAgIGNvbW1pdDogbG9jYWwuY29tbWl0LFxuICAgICAgZ2V0dGVyczogbG9jYWwuZ2V0dGVycyxcbiAgICAgIHN0YXRlOiBsb2NhbC5zdGF0ZSxcbiAgICAgIHJvb3RHZXR0ZXJzOiBzdG9yZS5nZXR0ZXJzLFxuICAgICAgcm9vdFN0YXRlOiBzdG9yZS5zdGF0ZVxuICAgIH0sIHBheWxvYWQsIGNiKTtcbiAgICBpZiAoIWlzUHJvbWlzZShyZXMpKSB7XG4gICAgICByZXMgPSBQcm9taXNlLnJlc29sdmUocmVzKTtcbiAgICB9XG4gICAgaWYgKHN0b3JlLl9kZXZ0b29sSG9vaykge1xuICAgICAgcmV0dXJuIHJlcy5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHN0b3JlLl9kZXZ0b29sSG9vay5lbWl0KCd2dWV4OmVycm9yJywgZXJyKTtcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzXG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXJHZXR0ZXIgKHN0b3JlLCB0eXBlLCByYXdHZXR0ZXIsIGxvY2FsKSB7XG4gIGlmIChzdG9yZS5fd3JhcHBlZEdldHRlcnNbdHlwZV0pIHtcbiAgICBjb25zb2xlLmVycm9yKChcIlt2dWV4XSBkdXBsaWNhdGUgZ2V0dGVyIGtleTogXCIgKyB0eXBlKSk7XG4gICAgcmV0dXJuXG4gIH1cbiAgc3RvcmUuX3dyYXBwZWRHZXR0ZXJzW3R5cGVdID0gZnVuY3Rpb24gd3JhcHBlZEdldHRlciAoc3RvcmUpIHtcbiAgICByZXR1cm4gcmF3R2V0dGVyKFxuICAgICAgbG9jYWwuc3RhdGUsIC8vIGxvY2FsIHN0YXRlXG4gICAgICBsb2NhbC5nZXR0ZXJzLCAvLyBsb2NhbCBnZXR0ZXJzXG4gICAgICBzdG9yZS5zdGF0ZSwgLy8gcm9vdCBzdGF0ZVxuICAgICAgc3RvcmUuZ2V0dGVycyAvLyByb290IGdldHRlcnNcbiAgICApXG4gIH07XG59XG5cbmZ1bmN0aW9uIGVuYWJsZVN0cmljdE1vZGUgKHN0b3JlKSB7XG4gIHN0b3JlLl92bS4kd2F0Y2goZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5fZGF0YS4kJHN0YXRlIH0sIGZ1bmN0aW9uICgpIHtcbiAgICBhc3NlcnQoc3RvcmUuX2NvbW1pdHRpbmcsIFwiRG8gbm90IG11dGF0ZSB2dWV4IHN0b3JlIHN0YXRlIG91dHNpZGUgbXV0YXRpb24gaGFuZGxlcnMuXCIpO1xuICB9LCB7IGRlZXA6IHRydWUsIHN5bmM6IHRydWUgfSk7XG59XG5cbmZ1bmN0aW9uIGdldE5lc3RlZFN0YXRlIChzdGF0ZSwgcGF0aCkge1xuICByZXR1cm4gcGF0aC5sZW5ndGhcbiAgICA/IHBhdGgucmVkdWNlKGZ1bmN0aW9uIChzdGF0ZSwga2V5KSB7IHJldHVybiBzdGF0ZVtrZXldOyB9LCBzdGF0ZSlcbiAgICA6IHN0YXRlXG59XG5cbmZ1bmN0aW9uIHVuaWZ5T2JqZWN0U3R5bGUgKHR5cGUsIHBheWxvYWQsIG9wdGlvbnMpIHtcbiAgaWYgKGlzT2JqZWN0KHR5cGUpICYmIHR5cGUudHlwZSkge1xuICAgIG9wdGlvbnMgPSBwYXlsb2FkO1xuICAgIHBheWxvYWQgPSB0eXBlO1xuICAgIHR5cGUgPSB0eXBlLnR5cGU7XG4gIH1cblxuICBhc3NlcnQodHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnLCAoXCJFeHBlY3RzIHN0cmluZyBhcyB0aGUgdHlwZSwgYnV0IGZvdW5kIFwiICsgKHR5cGVvZiB0eXBlKSArIFwiLlwiKSk7XG5cbiAgcmV0dXJuIHsgdHlwZTogdHlwZSwgcGF5bG9hZDogcGF5bG9hZCwgb3B0aW9uczogb3B0aW9ucyB9XG59XG5cbmZ1bmN0aW9uIGluc3RhbGwgKF9WdWUpIHtcbiAgaWYgKFZ1ZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAnW3Z1ZXhdIGFscmVhZHkgaW5zdGFsbGVkLiBWdWUudXNlKFZ1ZXgpIHNob3VsZCBiZSBjYWxsZWQgb25seSBvbmNlLidcbiAgICApO1xuICAgIHJldHVyblxuICB9XG4gIFZ1ZSA9IF9WdWU7XG4gIGFwcGx5TWl4aW4oVnVlKTtcbn1cblxuLy8gYXV0byBpbnN0YWxsIGluIGRpc3QgbW9kZVxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5WdWUpIHtcbiAgaW5zdGFsbCh3aW5kb3cuVnVlKTtcbn1cblxudmFyIG1hcFN0YXRlID0gbm9ybWFsaXplTmFtZXNwYWNlKGZ1bmN0aW9uIChuYW1lc3BhY2UsIHN0YXRlcykge1xuICB2YXIgcmVzID0ge307XG4gIG5vcm1hbGl6ZU1hcChzdGF0ZXMpLmZvckVhY2goZnVuY3Rpb24gKHJlZikge1xuICAgIHZhciBrZXkgPSByZWYua2V5O1xuICAgIHZhciB2YWwgPSByZWYudmFsO1xuXG4gICAgcmVzW2tleV0gPSBmdW5jdGlvbiBtYXBwZWRTdGF0ZSAoKSB7XG4gICAgICB2YXIgc3RhdGUgPSB0aGlzLiRzdG9yZS5zdGF0ZTtcbiAgICAgIHZhciBnZXR0ZXJzID0gdGhpcy4kc3RvcmUuZ2V0dGVycztcbiAgICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgICAgdmFyIG1vZHVsZSA9IGdldE1vZHVsZUJ5TmFtZXNwYWNlKHRoaXMuJHN0b3JlLCAnbWFwU3RhdGUnLCBuYW1lc3BhY2UpO1xuICAgICAgICBpZiAoIW1vZHVsZSkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHN0YXRlID0gbW9kdWxlLmNvbnRleHQuc3RhdGU7XG4gICAgICAgIGdldHRlcnMgPSBtb2R1bGUuY29udGV4dC5nZXR0ZXJzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyB2YWwuY2FsbCh0aGlzLCBzdGF0ZSwgZ2V0dGVycylcbiAgICAgICAgOiBzdGF0ZVt2YWxdXG4gICAgfTtcbiAgICAvLyBtYXJrIHZ1ZXggZ2V0dGVyIGZvciBkZXZ0b29sc1xuICAgIHJlc1trZXldLnZ1ZXggPSB0cnVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc1xufSk7XG5cbnZhciBtYXBNdXRhdGlvbnMgPSBub3JtYWxpemVOYW1lc3BhY2UoZnVuY3Rpb24gKG5hbWVzcGFjZSwgbXV0YXRpb25zKSB7XG4gIHZhciByZXMgPSB7fTtcbiAgbm9ybWFsaXplTWFwKG11dGF0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7XG4gICAgdmFyIGtleSA9IHJlZi5rZXk7XG4gICAgdmFyIHZhbCA9IHJlZi52YWw7XG5cbiAgICB2YWwgPSBuYW1lc3BhY2UgKyB2YWw7XG4gICAgcmVzW2tleV0gPSBmdW5jdGlvbiBtYXBwZWRNdXRhdGlvbiAoKSB7XG4gICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgaWYgKG5hbWVzcGFjZSAmJiAhZ2V0TW9kdWxlQnlOYW1lc3BhY2UodGhpcy4kc3RvcmUsICdtYXBNdXRhdGlvbnMnLCBuYW1lc3BhY2UpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmNvbW1pdC5hcHBseSh0aGlzLiRzdG9yZSwgW3ZhbF0uY29uY2F0KGFyZ3MpKVxuICAgIH07XG4gIH0pO1xuICByZXR1cm4gcmVzXG59KTtcblxudmFyIG1hcEdldHRlcnMgPSBub3JtYWxpemVOYW1lc3BhY2UoZnVuY3Rpb24gKG5hbWVzcGFjZSwgZ2V0dGVycykge1xuICB2YXIgcmVzID0ge307XG4gIG5vcm1hbGl6ZU1hcChnZXR0ZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChyZWYpIHtcbiAgICB2YXIga2V5ID0gcmVmLmtleTtcbiAgICB2YXIgdmFsID0gcmVmLnZhbDtcblxuICAgIHZhbCA9IG5hbWVzcGFjZSArIHZhbDtcbiAgICByZXNba2V5XSA9IGZ1bmN0aW9uIG1hcHBlZEdldHRlciAoKSB7XG4gICAgICBpZiAobmFtZXNwYWNlICYmICFnZXRNb2R1bGVCeU5hbWVzcGFjZSh0aGlzLiRzdG9yZSwgJ21hcEdldHRlcnMnLCBuYW1lc3BhY2UpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYgKCEodmFsIGluIHRoaXMuJHN0b3JlLmdldHRlcnMpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoKFwiW3Z1ZXhdIHVua25vd24gZ2V0dGVyOiBcIiArIHZhbCkpO1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5nZXR0ZXJzW3ZhbF1cbiAgICB9O1xuICAgIC8vIG1hcmsgdnVleCBnZXR0ZXIgZm9yIGRldnRvb2xzXG4gICAgcmVzW2tleV0udnVleCA9IHRydWU7XG4gIH0pO1xuICByZXR1cm4gcmVzXG59KTtcblxudmFyIG1hcEFjdGlvbnMgPSBub3JtYWxpemVOYW1lc3BhY2UoZnVuY3Rpb24gKG5hbWVzcGFjZSwgYWN0aW9ucykge1xuICB2YXIgcmVzID0ge307XG4gIG5vcm1hbGl6ZU1hcChhY3Rpb25zKS5mb3JFYWNoKGZ1bmN0aW9uIChyZWYpIHtcbiAgICB2YXIga2V5ID0gcmVmLmtleTtcbiAgICB2YXIgdmFsID0gcmVmLnZhbDtcblxuICAgIHZhbCA9IG5hbWVzcGFjZSArIHZhbDtcbiAgICByZXNba2V5XSA9IGZ1bmN0aW9uIG1hcHBlZEFjdGlvbiAoKSB7XG4gICAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgaWYgKG5hbWVzcGFjZSAmJiAhZ2V0TW9kdWxlQnlOYW1lc3BhY2UodGhpcy4kc3RvcmUsICdtYXBBY3Rpb25zJywgbmFtZXNwYWNlKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLiRzdG9yZS5kaXNwYXRjaC5hcHBseSh0aGlzLiRzdG9yZSwgW3ZhbF0uY29uY2F0KGFyZ3MpKVxuICAgIH07XG4gIH0pO1xuICByZXR1cm4gcmVzXG59KTtcblxuZnVuY3Rpb24gbm9ybWFsaXplTWFwIChtYXApIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkobWFwKVxuICAgID8gbWFwLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiAoeyBrZXk6IGtleSwgdmFsOiBrZXkgfSk7IH0pXG4gICAgOiBPYmplY3Qua2V5cyhtYXApLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiAoeyBrZXk6IGtleSwgdmFsOiBtYXBba2V5XSB9KTsgfSlcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplTmFtZXNwYWNlIChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKG5hbWVzcGFjZSwgbWFwKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lc3BhY2UgIT09ICdzdHJpbmcnKSB7XG4gICAgICBtYXAgPSBuYW1lc3BhY2U7XG4gICAgICBuYW1lc3BhY2UgPSAnJztcbiAgICB9IGVsc2UgaWYgKG5hbWVzcGFjZS5jaGFyQXQobmFtZXNwYWNlLmxlbmd0aCAtIDEpICE9PSAnLycpIHtcbiAgICAgIG5hbWVzcGFjZSArPSAnLyc7XG4gICAgfVxuICAgIHJldHVybiBmbihuYW1lc3BhY2UsIG1hcClcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRNb2R1bGVCeU5hbWVzcGFjZSAoc3RvcmUsIGhlbHBlciwgbmFtZXNwYWNlKSB7XG4gIHZhciBtb2R1bGUgPSBzdG9yZS5fbW9kdWxlc05hbWVzcGFjZU1hcFtuYW1lc3BhY2VdO1xuICBpZiAoIW1vZHVsZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoKFwiW3Z1ZXhdIG1vZHVsZSBuYW1lc3BhY2Ugbm90IGZvdW5kIGluIFwiICsgaGVscGVyICsgXCIoKTogXCIgKyBuYW1lc3BhY2UpKTtcbiAgfVxuICByZXR1cm4gbW9kdWxlXG59XG5cbnZhciBpbmRleF9lc20gPSB7XG4gIFN0b3JlOiBTdG9yZSxcbiAgaW5zdGFsbDogaW5zdGFsbCxcbiAgdmVyc2lvbjogJzIuMi4xJyxcbiAgbWFwU3RhdGU6IG1hcFN0YXRlLFxuICBtYXBNdXRhdGlvbnM6IG1hcE11dGF0aW9ucyxcbiAgbWFwR2V0dGVyczogbWFwR2V0dGVycyxcbiAgbWFwQWN0aW9uczogbWFwQWN0aW9uc1xufTtcblxuZXhwb3J0IHsgU3RvcmUsIG1hcFN0YXRlLCBtYXBNdXRhdGlvbnMsIG1hcEdldHRlcnMsIG1hcEFjdGlvbnMgfTtleHBvcnQgZGVmYXVsdCBpbmRleF9lc207XG4iLCIvL2ltcG9ydCBzdG9yZSBmcm9tICcuLi9pbmRleC5qcyc7XHJcblxyXG5jb25zdCBzdGF0ZSA9IHtcclxuICAgIGNoYXJhY3RlcjogR0xPQkFMX0NPTkZJRy5jaGFyYWN0ZXIsXHJcbiAgICBpc0FkbWluOiBHTE9CQUxfQ09ORklHLmNoYXJhY3RlciA9PT0gJ2FkbWluJyxcclxuICAgIHVzZXJOYW1lOiBHTE9CQUxfQ09ORklHLnVzZXJOYW1lXHJcbn07XHJcblxyXG5jb25zdCBtdXRhdGlvbnMgPSB7XHJcbiAgICAvKkVESVRfVEVTVDogKCBzdGF0ZSkgPT4ge1xyXG4gICAgIFx0c3RhdGUudGVzdCA9ICcyMzQyNDIyNDIzNDMnO1xyXG4gICAgfSxcclxuICAgIEVESVRfVEVTVDE6IChzdGF0ZSkgPT4ge1xyXG4gICAgXHRzdGF0ZS50ZXN0MSA9ICfmiJHmmK90ZXN0MSc7XHJcbiAgICB9Ki9cclxufTtcclxuXHJcbmNvbnN0IGFjdGlvbnMgPSB7XHJcbiAgICAvKkVESVRfVEVTVDogKHN0b3JlKT0+e1xyXG4gICAgXHRzdG9yZS5jb21taXQoICdFRElUX1RFU1QnKTtcclxuICAgIH0sXHJcbiAgICBFRElUX1RFU1QxOiAoc3RvcmUpID0+IHtcclxuICAgIFx0c3RvcmUuY29tbWl0KCdFRElUX1RFU1QxJyk7XHJcbiAgICB9Ki9cclxufTtcclxuXHJcbmNvbnN0IGluaXRNb2R1bGUgPSB7XHJcbiAgICBzdGF0ZSxcclxuICAgIG11dGF0aW9ucyxcclxuICAgIGFjdGlvbnNcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgaW5pdE1vZHVsZTsiLCJpbXBvcnQgc3RvcmUgZnJvbSAnLi4vaW5kZXguanMnO1xyXG5cclxuY29uc3Qgc3RhdGUgPSB7XHJcbiAgICBjaGFyYWN0ZXI6IEdMT0JBTF9DT05GSUcuY2hhcmFjdGVyLFxyXG4gICAgaXNBZG1pbjogR0xPQkFMX0NPTkZJRy5jaGFyYWN0ZXIgPT09ICdhZG1pbicsXHJcbiAgICB0ZXN0OiAnMTExMTExMScsXHJcbiAgICB0ZXN0MTogJ+aIkeaYryB0ZXN0MSdcclxufTtcclxuXHJcbmNvbnN0IG11dGF0aW9ucyA9IHtcclxuICAgIEVESVRfVEVTVDogKCBzdGF0ZSkgPT4ge1xyXG4gICAgIFx0c3RhdGUudGVzdCA9ICcyMzQyNDIyNDIzNDMnO1xyXG4gICAgfSxcclxuICAgIEVESVRfVEVTVDE6IChzdGF0ZSkgPT4ge1xyXG4gICAgXHRzdGF0ZS50ZXN0MSA9ICfmiJHmmK90ZXN0MSc7XHJcbiAgICB9XHJcbn07XHJcblxyXG5jb25zdCBhY3Rpb25zID0ge1xyXG4gICAgRURJVF9URVNUOiAoc3RvcmUpPT57XHJcbiAgICBcdHN0b3JlLmNvbW1pdCggJ0VESVRfVEVTVCcpO1xyXG4gICAgfSxcclxuICAgIEVESVRfVEVTVDE6IChzdG9yZSkgPT4ge1xyXG4gICAgXHRzdG9yZS5jb21taXQoJ0VESVRfVEVTVDEnKTtcclxuICAgIH1cclxufTtcclxuXHJcbmNvbnN0IHVzZXJMaXN0ID0ge1xyXG4gICAgc3RhdGUsXHJcbiAgICBtdXRhdGlvbnMsXHJcbiAgICBhY3Rpb25zXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IHVzZXJMaXN0OyIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcclxuaW1wb3J0IFZ1ZXggZnJvbSAndnVleCc7XHJcbmltcG9ydCBpbml0TW9kdWxlIGZyb20gJy4vbW9kdWxlcy9pbml0TW9kdWxlJztcclxuaW1wb3J0IHVzZXJMaXN0IGZyb20gJy4vbW9kdWxlcy91c2VyTGlzdCc7XHJcblZ1ZS51c2UoVnVleCk7XHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBWdWV4LlN0b3JlKHtcclxuXHRtb2R1bGVzOntcclxuXHRcdGluaXRNb2R1bGU6IGluaXRNb2R1bGUsXHJcblx0XHR1c2VyTGlzdDogdXNlckxpc3RcclxuXHR9XHJcbn0pOyIsIjx0ZW1wbGF0ZT4gXHJcbiAgICA8aGVhZGVyIGNsYXNzPVwiaGVhZGVyIGNsZWFyZml4XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImYtbFwiPkdFUumUmeivr+ebkeaOp+ezu+e7nzwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJmLXJcIj5cclxuICAgICAgICAgICAgPHJvdXRlci1saW5rIDp0bz1cInsgbmFtZTogJ21vZHB3ZCcsIHF1ZXJ5OiB7IHVuYW1lOiB1c2VyTmFtZSB9fVwiIGFjdGl2ZS1jbGFzcz1cImFjdGl2ZVwiPuS/ruaUueWvhueggTwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCIvbG9nb3V0XCI+IOmAgOWHujwvYT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvaGVhZGVyPlxyXG48L3RlbXBsYXRlPlxyXG48c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIj5cclxuXHRpbXBvcnQgc3RvcmUgZnJvbSAnLi4vLi4vc3RvcmUnO1xyXG5cdGltcG9ydCB2dWV4IGZyb20gJ3Z1ZXgnO1xyXG5cdGNvbnN0IG1hcFN0YXRlID0gdnVleC5tYXBTdGF0ZTtcclxuXHRjb25zdCBtYXBBY3Rpb25zID0gdnVleC5tYXBBY3Rpb25zO1xyXG5cdGV4cG9ydCBkZWZhdWx0IHtcclxuXHQgICAgY29tcHV0ZWQ6IHtcclxuXHQgICAgICAgIC4uLm1hcFN0YXRlKHtcclxuXHQgICAgICAgICAgICB1c2VyTmFtZTpzdGF0ZSA9PiBzdG9yZS5zdGF0ZS5pbml0TW9kdWxlLnVzZXJOYW1lXHJcblx0ICAgICAgICB9KVxyXG5cdCAgICB9XHJcblx0ICAgXHJcblx0fVxyXG48L3NjcmlwdD4iLCI8dGVtcGxhdGU+IFxyXG4gICAgPGRpdiBjbGFzcz1cImdlci1tZW51XCI+XHJcbiAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICA8bGkgdi1pZj1cImlzQWRtaW5cIj5cclxuICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi91c2VyXCIgYWN0aXZlLWNsYXNzPVwiYWN0aXZlXCI+5re75Yqg5YiX6KGoPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL3JlcG9ydFwiICBhY3RpdmUtY2xhc3M9XCJhY3RpdmVcIj7plJnor6/liJfooag8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgIDwvdWw+XHJcbiAgICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT4gXHJcbjxzY3JpcHQ+IFxyXG5cclxuaW1wb3J0IHN0b3JlIGZyb20gJy4uLy4uL3N0b3JlJztcclxuaW1wb3J0IHZ1ZXggZnJvbSAndnVleCc7XHJcbmNvbnN0IG1hcFN0YXRlID0gdnVleC5tYXBTdGF0ZTtcclxuY29uc3QgbWFwQWN0aW9ucyA9IHZ1ZXgubWFwQWN0aW9ucztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgICAgLi4ubWFwU3RhdGUoe1xyXG4gICAgICAgICAgICBpc0FkbWluOnN0YXRlID0+c3RvcmUuc3RhdGUuaW5pdE1vZHVsZS5pc0FkbWluXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgXHJcbn1cclxuPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPiBcclxuICAgXHQ8ZGl2IGNsYXNzPVwiZ2VyLWNvdGVudFwiPlxyXG4gIFx0XHQ8cm91dGVyLXZpZXc+PC9yb3V0ZXItdmlldz5cclxuICAgXHQ8L2Rpdj5cclxuPC90ZW1wbGF0ZT4iLCI8dGVtcGxhdGU+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZ2VyLWJvZHlcIj5cclxuICAgICAgICA8dG9wQm94PjwvdG9wQm94PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJnZXItbWlkZGxlXCI+XHJcbiAgICAgICAgICAgPGxlZnRNZW51PjwvbGVmdE1lbnU+XHJcbiAgICAgICAgICAgPHJpZ2h0Y29udGVudD48L3JpZ2h0Y29udGVudD4gICBcclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG5cclxuICA8IS0tIDxkaXY+XHJcbiBcclxuICA8cD5cclxuICAgIDxyb3V0ZXItbGluayB0bz1cIi91c2VyXCI+L3VzZXIvZm9vPC9yb3V0ZXItbGluaz5cclxuICAgIDxyb3V0ZXItbGluayB0bz1cIi9lcnJvclwiPi91c2VyL2Jhcjwvcm91dGVyLWxpbms+XHJcbiAgPC9wPlxyXG4gIDxyb3V0ZXItdmlldz48L3JvdXRlci12aWV3PlxyXG4gIDwvZGl2PiAtLT5cclxuPC90ZW1wbGF0ZT5cclxuPHNjcmlwdD4gXHJcblxyXG5pbXBvcnQgdG9wQm94IGZyb20gJy4vcGFnZXMvcHVibGljL2hlYWRlci52dWUnO1xyXG5pbXBvcnQgbGVmdE1lbnUgZnJvbSAnLi9wYWdlcy9wdWJsaWMvbWVudS52dWUnO1xyXG5pbXBvcnQgcmlnaHRjb250ZW50IGZyb20gJy4vcGFnZXMvcHVibGljL2NvbnRlbnQudnVlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBjb21wb25lbnRzOiB7XHJcbiAgICB0b3BCb3gsXHJcbiAgICBsZWZ0TWVudSxcclxuICAgIHJpZ2h0Y29udGVudFxyXG4gIH1cclxufVxyXG48L3NjcmlwdD4iLCIvKipcbiAgKiB2dWUtcm91dGVyIHYyLjIuMVxuICAqIChjKSAyMDE3IEV2YW4gWW91XG4gICogQGxpY2Vuc2UgTUlUXG4gICovXG4vKiAgKi9cblxuZnVuY3Rpb24gYXNzZXJ0IChjb25kaXRpb24sIG1lc3NhZ2UpIHtcbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoKFwiW3Z1ZS1yb3V0ZXJdIFwiICsgbWVzc2FnZSkpXG4gIH1cbn1cblxuZnVuY3Rpb24gd2FybiAoY29uZGl0aW9uLCBtZXNzYWdlKSB7XG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGUud2FybigoXCJbdnVlLXJvdXRlcl0gXCIgKyBtZXNzYWdlKSk7XG4gIH1cbn1cblxudmFyIFZpZXcgPSB7XG4gIG5hbWU6ICdyb3V0ZXItdmlldycsXG4gIGZ1bmN0aW9uYWw6IHRydWUsXG4gIHByb3BzOiB7XG4gICAgbmFtZToge1xuICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgZGVmYXVsdDogJ2RlZmF1bHQnXG4gICAgfVxuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlciAoaCwgcmVmKSB7XG4gICAgdmFyIHByb3BzID0gcmVmLnByb3BzO1xuICAgIHZhciBjaGlsZHJlbiA9IHJlZi5jaGlsZHJlbjtcbiAgICB2YXIgcGFyZW50ID0gcmVmLnBhcmVudDtcbiAgICB2YXIgZGF0YSA9IHJlZi5kYXRhO1xuXG4gICAgZGF0YS5yb3V0ZXJWaWV3ID0gdHJ1ZTtcblxuICAgIHZhciBuYW1lID0gcHJvcHMubmFtZTtcbiAgICB2YXIgcm91dGUgPSBwYXJlbnQuJHJvdXRlO1xuICAgIHZhciBjYWNoZSA9IHBhcmVudC5fcm91dGVyVmlld0NhY2hlIHx8IChwYXJlbnQuX3JvdXRlclZpZXdDYWNoZSA9IHt9KTtcblxuICAgIC8vIGRldGVybWluZSBjdXJyZW50IHZpZXcgZGVwdGgsIGFsc28gY2hlY2sgdG8gc2VlIGlmIHRoZSB0cmVlXG4gICAgLy8gaGFzIGJlZW4gdG9nZ2xlZCBpbmFjdGl2ZSBidXQga2VwdC1hbGl2ZS5cbiAgICB2YXIgZGVwdGggPSAwO1xuICAgIHZhciBpbmFjdGl2ZSA9IGZhbHNlO1xuICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgIGlmIChwYXJlbnQuJHZub2RlICYmIHBhcmVudC4kdm5vZGUuZGF0YS5yb3V0ZXJWaWV3KSB7XG4gICAgICAgIGRlcHRoKys7XG4gICAgICB9XG4gICAgICBpZiAocGFyZW50Ll9pbmFjdGl2ZSkge1xuICAgICAgICBpbmFjdGl2ZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBwYXJlbnQgPSBwYXJlbnQuJHBhcmVudDtcbiAgICB9XG4gICAgZGF0YS5yb3V0ZXJWaWV3RGVwdGggPSBkZXB0aDtcblxuICAgIC8vIHJlbmRlciBwcmV2aW91cyB2aWV3IGlmIHRoZSB0cmVlIGlzIGluYWN0aXZlIGFuZCBrZXB0LWFsaXZlXG4gICAgaWYgKGluYWN0aXZlKSB7XG4gICAgICByZXR1cm4gaChjYWNoZVtuYW1lXSwgZGF0YSwgY2hpbGRyZW4pXG4gICAgfVxuXG4gICAgdmFyIG1hdGNoZWQgPSByb3V0ZS5tYXRjaGVkW2RlcHRoXTtcbiAgICAvLyByZW5kZXIgZW1wdHkgbm9kZSBpZiBubyBtYXRjaGVkIHJvdXRlXG4gICAgaWYgKCFtYXRjaGVkKSB7XG4gICAgICBjYWNoZVtuYW1lXSA9IG51bGw7XG4gICAgICByZXR1cm4gaCgpXG4gICAgfVxuXG4gICAgdmFyIGNvbXBvbmVudCA9IGNhY2hlW25hbWVdID0gbWF0Y2hlZC5jb21wb25lbnRzW25hbWVdO1xuXG4gICAgLy8gaW5qZWN0IGluc3RhbmNlIHJlZ2lzdHJhdGlvbiBob29rc1xuICAgIHZhciBob29rcyA9IGRhdGEuaG9vayB8fCAoZGF0YS5ob29rID0ge30pO1xuICAgIGhvb2tzLmluaXQgPSBmdW5jdGlvbiAodm5vZGUpIHtcbiAgICAgIG1hdGNoZWQuaW5zdGFuY2VzW25hbWVdID0gdm5vZGUuY2hpbGQ7XG4gICAgfTtcbiAgICBob29rcy5wcmVwYXRjaCA9IGZ1bmN0aW9uIChvbGRWbm9kZSwgdm5vZGUpIHtcbiAgICAgIG1hdGNoZWQuaW5zdGFuY2VzW25hbWVdID0gdm5vZGUuY2hpbGQ7XG4gICAgfTtcbiAgICBob29rcy5kZXN0cm95ID0gZnVuY3Rpb24gKHZub2RlKSB7XG4gICAgICBpZiAobWF0Y2hlZC5pbnN0YW5jZXNbbmFtZV0gPT09IHZub2RlLmNoaWxkKSB7XG4gICAgICAgIG1hdGNoZWQuaW5zdGFuY2VzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyByZXNvbHZlIHByb3BzXG4gICAgZGF0YS5wcm9wcyA9IHJlc29sdmVQcm9wcyhyb3V0ZSwgbWF0Y2hlZC5wcm9wcyAmJiBtYXRjaGVkLnByb3BzW25hbWVdKTtcblxuICAgIHJldHVybiBoKGNvbXBvbmVudCwgZGF0YSwgY2hpbGRyZW4pXG4gIH1cbn07XG5cbmZ1bmN0aW9uIHJlc29sdmVQcm9wcyAocm91dGUsIGNvbmZpZykge1xuICBzd2l0Y2ggKHR5cGVvZiBjb25maWcpIHtcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgcmV0dXJuXG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIHJldHVybiBjb25maWdcbiAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICByZXR1cm4gY29uZmlnKHJvdXRlKVxuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuIGNvbmZpZyA/IHJvdXRlLnBhcmFtcyA6IHVuZGVmaW5lZFxuICAgIGRlZmF1bHQ6XG4gICAgICB3YXJuKGZhbHNlLCAoXCJwcm9wcyBpbiBcXFwiXCIgKyAocm91dGUucGF0aCkgKyBcIlxcXCIgaXMgYSBcIiArICh0eXBlb2YgY29uZmlnKSArIFwiLCBleHBlY3RpbmcgYW4gb2JqZWN0LCBmdW5jdGlvbiBvciBib29sZWFuLlwiKSk7XG4gIH1cbn1cblxuLyogICovXG5cbnZhciBlbmNvZGVSZXNlcnZlUkUgPSAvWyEnKCkqXS9nO1xudmFyIGVuY29kZVJlc2VydmVSZXBsYWNlciA9IGZ1bmN0aW9uIChjKSB7IHJldHVybiAnJScgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpOyB9O1xudmFyIGNvbW1hUkUgPSAvJTJDL2c7XG5cbi8vIGZpeGVkIGVuY29kZVVSSUNvbXBvbmVudCB3aGljaCBpcyBtb3JlIGNvbWZvcm1hbnQgdG8gUkZDMzk4Njpcbi8vIC0gZXNjYXBlcyBbIScoKSpdXG4vLyAtIHByZXNlcnZlIGNvbW1hc1xudmFyIGVuY29kZSA9IGZ1bmN0aW9uIChzdHIpIHsgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHIpXG4gIC5yZXBsYWNlKGVuY29kZVJlc2VydmVSRSwgZW5jb2RlUmVzZXJ2ZVJlcGxhY2VyKVxuICAucmVwbGFjZShjb21tYVJFLCAnLCcpOyB9O1xuXG52YXIgZGVjb2RlID0gZGVjb2RlVVJJQ29tcG9uZW50O1xuXG5mdW5jdGlvbiByZXNvbHZlUXVlcnkgKFxuICBxdWVyeSxcbiAgZXh0cmFRdWVyeVxuKSB7XG4gIGlmICggZXh0cmFRdWVyeSA9PT0gdm9pZCAwICkgZXh0cmFRdWVyeSA9IHt9O1xuXG4gIGlmIChxdWVyeSkge1xuICAgIHZhciBwYXJzZWRRdWVyeTtcbiAgICB0cnkge1xuICAgICAgcGFyc2VkUXVlcnkgPSBwYXJzZVF1ZXJ5KHF1ZXJ5KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oZmFsc2UsIGUubWVzc2FnZSk7XG4gICAgICBwYXJzZWRRdWVyeSA9IHt9O1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gZXh0cmFRdWVyeSkge1xuICAgICAgcGFyc2VkUXVlcnlba2V5XSA9IGV4dHJhUXVlcnlba2V5XTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlZFF1ZXJ5XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGV4dHJhUXVlcnlcbiAgfVxufVxuXG5mdW5jdGlvbiBwYXJzZVF1ZXJ5IChxdWVyeSkge1xuICB2YXIgcmVzID0ge307XG5cbiAgcXVlcnkgPSBxdWVyeS50cmltKCkucmVwbGFjZSgvXihcXD98I3wmKS8sICcnKTtcblxuICBpZiAoIXF1ZXJ5KSB7XG4gICAgcmV0dXJuIHJlc1xuICB9XG5cbiAgcXVlcnkuc3BsaXQoJyYnKS5mb3JFYWNoKGZ1bmN0aW9uIChwYXJhbSkge1xuICAgIHZhciBwYXJ0cyA9IHBhcmFtLnJlcGxhY2UoL1xcKy9nLCAnICcpLnNwbGl0KCc9Jyk7XG4gICAgdmFyIGtleSA9IGRlY29kZShwYXJ0cy5zaGlmdCgpKTtcbiAgICB2YXIgdmFsID0gcGFydHMubGVuZ3RoID4gMFxuICAgICAgPyBkZWNvZGUocGFydHMuam9pbignPScpKVxuICAgICAgOiBudWxsO1xuXG4gICAgaWYgKHJlc1trZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlc1trZXldID0gdmFsO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShyZXNba2V5XSkpIHtcbiAgICAgIHJlc1trZXldLnB1c2godmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzW2tleV0gPSBbcmVzW2tleV0sIHZhbF07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeVF1ZXJ5IChvYmopIHtcbiAgdmFyIHJlcyA9IG9iaiA/IE9iamVjdC5rZXlzKG9iaikubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgdmFsID0gb2JqW2tleV07XG5cbiAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAnJ1xuICAgIH1cblxuICAgIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBlbmNvZGUoa2V5KVxuICAgIH1cblxuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgIHZhbC5zbGljZSgpLmZvckVhY2goZnVuY3Rpb24gKHZhbDIpIHtcbiAgICAgICAgaWYgKHZhbDIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmICh2YWwyID09PSBudWxsKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goZW5jb2RlKGtleSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHZhbDIpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJyYnKVxuICAgIH1cblxuICAgIHJldHVybiBlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2YWwpXG4gIH0pLmZpbHRlcihmdW5jdGlvbiAoeCkgeyByZXR1cm4geC5sZW5ndGggPiAwOyB9KS5qb2luKCcmJykgOiBudWxsO1xuICByZXR1cm4gcmVzID8gKFwiP1wiICsgcmVzKSA6ICcnXG59XG5cbi8qICAqL1xuXG52YXIgdHJhaWxpbmdTbGFzaFJFID0gL1xcLz8kLztcblxuZnVuY3Rpb24gY3JlYXRlUm91dGUgKFxuICByZWNvcmQsXG4gIGxvY2F0aW9uLFxuICByZWRpcmVjdGVkRnJvbVxuKSB7XG4gIHZhciByb3V0ZSA9IHtcbiAgICBuYW1lOiBsb2NhdGlvbi5uYW1lIHx8IChyZWNvcmQgJiYgcmVjb3JkLm5hbWUpLFxuICAgIG1ldGE6IChyZWNvcmQgJiYgcmVjb3JkLm1ldGEpIHx8IHt9LFxuICAgIHBhdGg6IGxvY2F0aW9uLnBhdGggfHwgJy8nLFxuICAgIGhhc2g6IGxvY2F0aW9uLmhhc2ggfHwgJycsXG4gICAgcXVlcnk6IGxvY2F0aW9uLnF1ZXJ5IHx8IHt9LFxuICAgIHBhcmFtczogbG9jYXRpb24ucGFyYW1zIHx8IHt9LFxuICAgIGZ1bGxQYXRoOiBnZXRGdWxsUGF0aChsb2NhdGlvbiksXG4gICAgbWF0Y2hlZDogcmVjb3JkID8gZm9ybWF0TWF0Y2gocmVjb3JkKSA6IFtdXG4gIH07XG4gIGlmIChyZWRpcmVjdGVkRnJvbSkge1xuICAgIHJvdXRlLnJlZGlyZWN0ZWRGcm9tID0gZ2V0RnVsbFBhdGgocmVkaXJlY3RlZEZyb20pO1xuICB9XG4gIHJldHVybiBPYmplY3QuZnJlZXplKHJvdXRlKVxufVxuXG4vLyB0aGUgc3RhcnRpbmcgcm91dGUgdGhhdCByZXByZXNlbnRzIHRoZSBpbml0aWFsIHN0YXRlXG52YXIgU1RBUlQgPSBjcmVhdGVSb3V0ZShudWxsLCB7XG4gIHBhdGg6ICcvJ1xufSk7XG5cbmZ1bmN0aW9uIGZvcm1hdE1hdGNoIChyZWNvcmQpIHtcbiAgdmFyIHJlcyA9IFtdO1xuICB3aGlsZSAocmVjb3JkKSB7XG4gICAgcmVzLnVuc2hpZnQocmVjb3JkKTtcbiAgICByZWNvcmQgPSByZWNvcmQucGFyZW50O1xuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gZ2V0RnVsbFBhdGggKHJlZikge1xuICB2YXIgcGF0aCA9IHJlZi5wYXRoO1xuICB2YXIgcXVlcnkgPSByZWYucXVlcnk7IGlmICggcXVlcnkgPT09IHZvaWQgMCApIHF1ZXJ5ID0ge307XG4gIHZhciBoYXNoID0gcmVmLmhhc2g7IGlmICggaGFzaCA9PT0gdm9pZCAwICkgaGFzaCA9ICcnO1xuXG4gIHJldHVybiAocGF0aCB8fCAnLycpICsgc3RyaW5naWZ5UXVlcnkocXVlcnkpICsgaGFzaFxufVxuXG5mdW5jdGlvbiBpc1NhbWVSb3V0ZSAoYSwgYikge1xuICBpZiAoYiA9PT0gU1RBUlQpIHtcbiAgICByZXR1cm4gYSA9PT0gYlxuICB9IGVsc2UgaWYgKCFiKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH0gZWxzZSBpZiAoYS5wYXRoICYmIGIucGF0aCkge1xuICAgIHJldHVybiAoXG4gICAgICBhLnBhdGgucmVwbGFjZSh0cmFpbGluZ1NsYXNoUkUsICcnKSA9PT0gYi5wYXRoLnJlcGxhY2UodHJhaWxpbmdTbGFzaFJFLCAnJykgJiZcbiAgICAgIGEuaGFzaCA9PT0gYi5oYXNoICYmXG4gICAgICBpc09iamVjdEVxdWFsKGEucXVlcnksIGIucXVlcnkpXG4gICAgKVxuICB9IGVsc2UgaWYgKGEubmFtZSAmJiBiLm5hbWUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgYS5uYW1lID09PSBiLm5hbWUgJiZcbiAgICAgIGEuaGFzaCA9PT0gYi5oYXNoICYmXG4gICAgICBpc09iamVjdEVxdWFsKGEucXVlcnksIGIucXVlcnkpICYmXG4gICAgICBpc09iamVjdEVxdWFsKGEucGFyYW1zLCBiLnBhcmFtcylcbiAgICApXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24gaXNPYmplY3RFcXVhbCAoYSwgYikge1xuICBpZiAoIGEgPT09IHZvaWQgMCApIGEgPSB7fTtcbiAgaWYgKCBiID09PSB2b2lkIDAgKSBiID0ge307XG5cbiAgdmFyIGFLZXlzID0gT2JqZWN0LmtleXMoYSk7XG4gIHZhciBiS2V5cyA9IE9iamVjdC5rZXlzKGIpO1xuICBpZiAoYUtleXMubGVuZ3RoICE9PSBiS2V5cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gYUtleXMuZXZlcnkoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gU3RyaW5nKGFba2V5XSkgPT09IFN0cmluZyhiW2tleV0pOyB9KVxufVxuXG5mdW5jdGlvbiBpc0luY2x1ZGVkUm91dGUgKGN1cnJlbnQsIHRhcmdldCkge1xuICByZXR1cm4gKFxuICAgIGN1cnJlbnQucGF0aC5yZXBsYWNlKHRyYWlsaW5nU2xhc2hSRSwgJy8nKS5pbmRleE9mKFxuICAgICAgdGFyZ2V0LnBhdGgucmVwbGFjZSh0cmFpbGluZ1NsYXNoUkUsICcvJylcbiAgICApID09PSAwICYmXG4gICAgKCF0YXJnZXQuaGFzaCB8fCBjdXJyZW50Lmhhc2ggPT09IHRhcmdldC5oYXNoKSAmJlxuICAgIHF1ZXJ5SW5jbHVkZXMoY3VycmVudC5xdWVyeSwgdGFyZ2V0LnF1ZXJ5KVxuICApXG59XG5cbmZ1bmN0aW9uIHF1ZXJ5SW5jbHVkZXMgKGN1cnJlbnQsIHRhcmdldCkge1xuICBmb3IgKHZhciBrZXkgaW4gdGFyZ2V0KSB7XG4gICAgaWYgKCEoa2V5IGluIGN1cnJlbnQpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuLyogICovXG5cbi8vIHdvcmsgYXJvdW5kIHdlaXJkIGZsb3cgYnVnXG52YXIgdG9UeXBlcyA9IFtTdHJpbmcsIE9iamVjdF07XG52YXIgZXZlbnRUeXBlcyA9IFtTdHJpbmcsIEFycmF5XTtcblxudmFyIExpbmsgPSB7XG4gIG5hbWU6ICdyb3V0ZXItbGluaycsXG4gIHByb3BzOiB7XG4gICAgdG86IHtcbiAgICAgIHR5cGU6IHRvVHlwZXMsXG4gICAgICByZXF1aXJlZDogdHJ1ZVxuICAgIH0sXG4gICAgdGFnOiB7XG4gICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICBkZWZhdWx0OiAnYSdcbiAgICB9LFxuICAgIGV4YWN0OiBCb29sZWFuLFxuICAgIGFwcGVuZDogQm9vbGVhbixcbiAgICByZXBsYWNlOiBCb29sZWFuLFxuICAgIGFjdGl2ZUNsYXNzOiBTdHJpbmcsXG4gICAgZXZlbnQ6IHtcbiAgICAgIHR5cGU6IGV2ZW50VHlwZXMsXG4gICAgICBkZWZhdWx0OiAnY2xpY2snXG4gICAgfVxuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlciAoaCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIHJvdXRlciA9IHRoaXMuJHJvdXRlcjtcbiAgICB2YXIgY3VycmVudCA9IHRoaXMuJHJvdXRlO1xuICAgIHZhciByZWYgPSByb3V0ZXIucmVzb2x2ZSh0aGlzLnRvLCBjdXJyZW50LCB0aGlzLmFwcGVuZCk7XG4gICAgdmFyIGxvY2F0aW9uID0gcmVmLmxvY2F0aW9uO1xuICAgIHZhciByb3V0ZSA9IHJlZi5yb3V0ZTtcbiAgICB2YXIgaHJlZiA9IHJlZi5ocmVmO1xuICAgIHZhciBjbGFzc2VzID0ge307XG4gICAgdmFyIGFjdGl2ZUNsYXNzID0gdGhpcy5hY3RpdmVDbGFzcyB8fCByb3V0ZXIub3B0aW9ucy5saW5rQWN0aXZlQ2xhc3MgfHwgJ3JvdXRlci1saW5rLWFjdGl2ZSc7XG4gICAgdmFyIGNvbXBhcmVUYXJnZXQgPSBsb2NhdGlvbi5wYXRoID8gY3JlYXRlUm91dGUobnVsbCwgbG9jYXRpb24pIDogcm91dGU7XG4gICAgY2xhc3Nlc1thY3RpdmVDbGFzc10gPSB0aGlzLmV4YWN0XG4gICAgICA/IGlzU2FtZVJvdXRlKGN1cnJlbnQsIGNvbXBhcmVUYXJnZXQpXG4gICAgICA6IGlzSW5jbHVkZWRSb3V0ZShjdXJyZW50LCBjb21wYXJlVGFyZ2V0KTtcblxuICAgIHZhciBoYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChndWFyZEV2ZW50KGUpKSB7XG4gICAgICAgIGlmICh0aGlzJDEucmVwbGFjZSkge1xuICAgICAgICAgIHJvdXRlci5yZXBsYWNlKGxvY2F0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByb3V0ZXIucHVzaChsb2NhdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIG9uID0geyBjbGljazogZ3VhcmRFdmVudCB9O1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuZXZlbnQpKSB7XG4gICAgICB0aGlzLmV2ZW50LmZvckVhY2goZnVuY3Rpb24gKGUpIHsgb25bZV0gPSBoYW5kbGVyOyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb25bdGhpcy5ldmVudF0gPSBoYW5kbGVyO1xuICAgIH1cblxuICAgIHZhciBkYXRhID0ge1xuICAgICAgY2xhc3M6IGNsYXNzZXNcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMudGFnID09PSAnYScpIHtcbiAgICAgIGRhdGEub24gPSBvbjtcbiAgICAgIGRhdGEuYXR0cnMgPSB7IGhyZWY6IGhyZWYgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZmluZCB0aGUgZmlyc3QgPGE+IGNoaWxkIGFuZCBhcHBseSBsaXN0ZW5lciBhbmQgaHJlZlxuICAgICAgdmFyIGEgPSBmaW5kQW5jaG9yKHRoaXMuJHNsb3RzLmRlZmF1bHQpO1xuICAgICAgaWYgKGEpIHtcbiAgICAgICAgLy8gaW4gY2FzZSB0aGUgPGE+IGlzIGEgc3RhdGljIG5vZGVcbiAgICAgICAgYS5pc1N0YXRpYyA9IGZhbHNlO1xuICAgICAgICB2YXIgZXh0ZW5kID0gX1Z1ZS51dGlsLmV4dGVuZDtcbiAgICAgICAgdmFyIGFEYXRhID0gYS5kYXRhID0gZXh0ZW5kKHt9LCBhLmRhdGEpO1xuICAgICAgICBhRGF0YS5vbiA9IG9uO1xuICAgICAgICB2YXIgYUF0dHJzID0gYS5kYXRhLmF0dHJzID0gZXh0ZW5kKHt9LCBhLmRhdGEuYXR0cnMpO1xuICAgICAgICBhQXR0cnMuaHJlZiA9IGhyZWY7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBkb2Vzbid0IGhhdmUgPGE+IGNoaWxkLCBhcHBseSBsaXN0ZW5lciB0byBzZWxmXG4gICAgICAgIGRhdGEub24gPSBvbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaCh0aGlzLnRhZywgZGF0YSwgdGhpcy4kc2xvdHMuZGVmYXVsdClcbiAgfVxufTtcblxuZnVuY3Rpb24gZ3VhcmRFdmVudCAoZSkge1xuICAvLyBkb24ndCByZWRpcmVjdCB3aXRoIGNvbnRyb2wga2V5c1xuICBpZiAoZS5tZXRhS2V5IHx8IGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5KSB7IHJldHVybiB9XG4gIC8vIGRvbid0IHJlZGlyZWN0IHdoZW4gcHJldmVudERlZmF1bHQgY2FsbGVkXG4gIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQpIHsgcmV0dXJuIH1cbiAgLy8gZG9uJ3QgcmVkaXJlY3Qgb24gcmlnaHQgY2xpY2tcbiAgaWYgKGUuYnV0dG9uICE9PSB1bmRlZmluZWQgJiYgZS5idXR0b24gIT09IDApIHsgcmV0dXJuIH1cbiAgLy8gZG9uJ3QgcmVkaXJlY3QgaWYgYHRhcmdldD1cIl9ibGFua1wiYFxuICBpZiAoZS50YXJnZXQgJiYgZS50YXJnZXQuZ2V0QXR0cmlidXRlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgndGFyZ2V0Jyk7XG4gICAgaWYgKC9cXGJfYmxhbmtcXGIvaS50ZXN0KHRhcmdldCkpIHsgcmV0dXJuIH1cbiAgfVxuICAvLyB0aGlzIG1heSBiZSBhIFdlZXggZXZlbnQgd2hpY2ggZG9lc24ndCBoYXZlIHRoaXMgbWV0aG9kXG4gIGlmIChlLnByZXZlbnREZWZhdWx0KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGZpbmRBbmNob3IgKGNoaWxkcmVuKSB7XG4gIGlmIChjaGlsZHJlbikge1xuICAgIHZhciBjaGlsZDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgaWYgKGNoaWxkLnRhZyA9PT0gJ2EnKSB7XG4gICAgICAgIHJldHVybiBjaGlsZFxuICAgICAgfVxuICAgICAgaWYgKGNoaWxkLmNoaWxkcmVuICYmIChjaGlsZCA9IGZpbmRBbmNob3IoY2hpbGQuY2hpbGRyZW4pKSkge1xuICAgICAgICByZXR1cm4gY2hpbGRcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxudmFyIF9WdWU7XG5cbmZ1bmN0aW9uIGluc3RhbGwgKFZ1ZSkge1xuICBpZiAoaW5zdGFsbC5pbnN0YWxsZWQpIHsgcmV0dXJuIH1cbiAgaW5zdGFsbC5pbnN0YWxsZWQgPSB0cnVlO1xuXG4gIF9WdWUgPSBWdWU7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFZ1ZS5wcm90b3R5cGUsICckcm91dGVyJywge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0ICgpIHsgcmV0dXJuIHRoaXMuJHJvb3QuX3JvdXRlciB9XG4gIH0pO1xuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShWdWUucHJvdG90eXBlLCAnJHJvdXRlJywge1xuICAgIGdldDogZnVuY3Rpb24gZ2V0ICgpIHsgcmV0dXJuIHRoaXMuJHJvb3QuX3JvdXRlIH1cbiAgfSk7XG5cbiAgVnVlLm1peGluKHtcbiAgICBiZWZvcmVDcmVhdGU6IGZ1bmN0aW9uIGJlZm9yZUNyZWF0ZSAoKSB7XG4gICAgICBpZiAodGhpcy4kb3B0aW9ucy5yb3V0ZXIpIHtcbiAgICAgICAgdGhpcy5fcm91dGVyID0gdGhpcy4kb3B0aW9ucy5yb3V0ZXI7XG4gICAgICAgIHRoaXMuX3JvdXRlci5pbml0KHRoaXMpO1xuICAgICAgICBWdWUudXRpbC5kZWZpbmVSZWFjdGl2ZSh0aGlzLCAnX3JvdXRlJywgdGhpcy5fcm91dGVyLmhpc3RvcnkuY3VycmVudCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBWdWUuY29tcG9uZW50KCdyb3V0ZXItdmlldycsIFZpZXcpO1xuICBWdWUuY29tcG9uZW50KCdyb3V0ZXItbGluaycsIExpbmspO1xuXG4gIHZhciBzdHJhdHMgPSBWdWUuY29uZmlnLm9wdGlvbk1lcmdlU3RyYXRlZ2llcztcbiAgLy8gdXNlIHRoZSBzYW1lIGhvb2sgbWVyZ2luZyBzdHJhdGVneSBmb3Igcm91dGUgaG9va3NcbiAgc3RyYXRzLmJlZm9yZVJvdXRlRW50ZXIgPSBzdHJhdHMuYmVmb3JlUm91dGVMZWF2ZSA9IHN0cmF0cy5jcmVhdGVkO1xufVxuXG4vKiAgKi9cblxudmFyIGluQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xuXG4vKiAgKi9cblxuZnVuY3Rpb24gcmVzb2x2ZVBhdGggKFxuICByZWxhdGl2ZSxcbiAgYmFzZSxcbiAgYXBwZW5kXG4pIHtcbiAgaWYgKHJlbGF0aXZlLmNoYXJBdCgwKSA9PT0gJy8nKSB7XG4gICAgcmV0dXJuIHJlbGF0aXZlXG4gIH1cblxuICBpZiAocmVsYXRpdmUuY2hhckF0KDApID09PSAnPycgfHwgcmVsYXRpdmUuY2hhckF0KDApID09PSAnIycpIHtcbiAgICByZXR1cm4gYmFzZSArIHJlbGF0aXZlXG4gIH1cblxuICB2YXIgc3RhY2sgPSBiYXNlLnNwbGl0KCcvJyk7XG5cbiAgLy8gcmVtb3ZlIHRyYWlsaW5nIHNlZ21lbnQgaWY6XG4gIC8vIC0gbm90IGFwcGVuZGluZ1xuICAvLyAtIGFwcGVuZGluZyB0byB0cmFpbGluZyBzbGFzaCAobGFzdCBzZWdtZW50IGlzIGVtcHR5KVxuICBpZiAoIWFwcGVuZCB8fCAhc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0pIHtcbiAgICBzdGFjay5wb3AoKTtcbiAgfVxuXG4gIC8vIHJlc29sdmUgcmVsYXRpdmUgcGF0aFxuICB2YXIgc2VnbWVudHMgPSByZWxhdGl2ZS5yZXBsYWNlKC9eXFwvLywgJycpLnNwbGl0KCcvJyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2VnbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc2VnbWVudCA9IHNlZ21lbnRzW2ldO1xuICAgIGlmIChzZWdtZW50ID09PSAnLicpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfSBlbHNlIGlmIChzZWdtZW50ID09PSAnLi4nKSB7XG4gICAgICBzdGFjay5wb3AoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhY2sucHVzaChzZWdtZW50KTtcbiAgICB9XG4gIH1cblxuICAvLyBlbnN1cmUgbGVhZGluZyBzbGFzaFxuICBpZiAoc3RhY2tbMF0gIT09ICcnKSB7XG4gICAgc3RhY2sudW5zaGlmdCgnJyk7XG4gIH1cblxuICByZXR1cm4gc3RhY2suam9pbignLycpXG59XG5cbmZ1bmN0aW9uIHBhcnNlUGF0aCAocGF0aCkge1xuICB2YXIgaGFzaCA9ICcnO1xuICB2YXIgcXVlcnkgPSAnJztcblxuICB2YXIgaGFzaEluZGV4ID0gcGF0aC5pbmRleE9mKCcjJyk7XG4gIGlmIChoYXNoSW5kZXggPj0gMCkge1xuICAgIGhhc2ggPSBwYXRoLnNsaWNlKGhhc2hJbmRleCk7XG4gICAgcGF0aCA9IHBhdGguc2xpY2UoMCwgaGFzaEluZGV4KTtcbiAgfVxuXG4gIHZhciBxdWVyeUluZGV4ID0gcGF0aC5pbmRleE9mKCc/Jyk7XG4gIGlmIChxdWVyeUluZGV4ID49IDApIHtcbiAgICBxdWVyeSA9IHBhdGguc2xpY2UocXVlcnlJbmRleCArIDEpO1xuICAgIHBhdGggPSBwYXRoLnNsaWNlKDAsIHF1ZXJ5SW5kZXgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBwYXRoOiBwYXRoLFxuICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICBoYXNoOiBoYXNoXG4gIH1cbn1cblxuZnVuY3Rpb24gY2xlYW5QYXRoIChwYXRoKSB7XG4gIHJldHVybiBwYXRoLnJlcGxhY2UoL1xcL1xcLy9nLCAnLycpXG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBjcmVhdGVSb3V0ZU1hcCAoXG4gIHJvdXRlcyxcbiAgb2xkUGF0aE1hcCxcbiAgb2xkTmFtZU1hcFxuKSB7XG4gIHZhciBwYXRoTWFwID0gb2xkUGF0aE1hcCB8fCBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB2YXIgbmFtZU1hcCA9IG9sZE5hbWVNYXAgfHwgT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICByb3V0ZXMuZm9yRWFjaChmdW5jdGlvbiAocm91dGUpIHtcbiAgICBhZGRSb3V0ZVJlY29yZChwYXRoTWFwLCBuYW1lTWFwLCByb3V0ZSk7XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgcGF0aE1hcDogcGF0aE1hcCxcbiAgICBuYW1lTWFwOiBuYW1lTWFwXG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkUm91dGVSZWNvcmQgKFxuICBwYXRoTWFwLFxuICBuYW1lTWFwLFxuICByb3V0ZSxcbiAgcGFyZW50LFxuICBtYXRjaEFzXG4pIHtcbiAgdmFyIHBhdGggPSByb3V0ZS5wYXRoO1xuICB2YXIgbmFtZSA9IHJvdXRlLm5hbWU7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgYXNzZXJ0KHBhdGggIT0gbnVsbCwgXCJcXFwicGF0aFxcXCIgaXMgcmVxdWlyZWQgaW4gYSByb3V0ZSBjb25maWd1cmF0aW9uLlwiKTtcbiAgICBhc3NlcnQoXG4gICAgICB0eXBlb2Ygcm91dGUuY29tcG9uZW50ICE9PSAnc3RyaW5nJyxcbiAgICAgIFwicm91dGUgY29uZmlnIFxcXCJjb21wb25lbnRcXFwiIGZvciBwYXRoOiBcIiArIChTdHJpbmcocGF0aCB8fCBuYW1lKSkgKyBcIiBjYW5ub3QgYmUgYSBcIiArXG4gICAgICBcInN0cmluZyBpZC4gVXNlIGFuIGFjdHVhbCBjb21wb25lbnQgaW5zdGVhZC5cIlxuICAgICk7XG4gIH1cblxuICB2YXIgcmVjb3JkID0ge1xuICAgIHBhdGg6IG5vcm1hbGl6ZVBhdGgocGF0aCwgcGFyZW50KSxcbiAgICBjb21wb25lbnRzOiByb3V0ZS5jb21wb25lbnRzIHx8IHsgZGVmYXVsdDogcm91dGUuY29tcG9uZW50IH0sXG4gICAgaW5zdGFuY2VzOiB7fSxcbiAgICBuYW1lOiBuYW1lLFxuICAgIHBhcmVudDogcGFyZW50LFxuICAgIG1hdGNoQXM6IG1hdGNoQXMsXG4gICAgcmVkaXJlY3Q6IHJvdXRlLnJlZGlyZWN0LFxuICAgIGJlZm9yZUVudGVyOiByb3V0ZS5iZWZvcmVFbnRlcixcbiAgICBtZXRhOiByb3V0ZS5tZXRhIHx8IHt9LFxuICAgIHByb3BzOiByb3V0ZS5wcm9wcyA9PSBudWxsXG4gICAgICA/IHt9XG4gICAgICA6IHJvdXRlLmNvbXBvbmVudHNcbiAgICAgICAgPyByb3V0ZS5wcm9wc1xuICAgICAgICA6IHsgZGVmYXVsdDogcm91dGUucHJvcHMgfVxuICB9O1xuXG4gIGlmIChyb3V0ZS5jaGlsZHJlbikge1xuICAgIC8vIFdhcm4gaWYgcm91dGUgaXMgbmFtZWQgYW5kIGhhcyBhIGRlZmF1bHQgY2hpbGQgcm91dGUuXG4gICAgLy8gSWYgdXNlcnMgbmF2aWdhdGUgdG8gdGhpcyByb3V0ZSBieSBuYW1lLCB0aGUgZGVmYXVsdCBjaGlsZCB3aWxsXG4gICAgLy8gbm90IGJlIHJlbmRlcmVkIChHSCBJc3N1ZSAjNjI5KVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAocm91dGUubmFtZSAmJiByb3V0ZS5jaGlsZHJlbi5zb21lKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gL15cXC8/JC8udGVzdChjaGlsZC5wYXRoKTsgfSkpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICBcIk5hbWVkIFJvdXRlICdcIiArIChyb3V0ZS5uYW1lKSArIFwiJyBoYXMgYSBkZWZhdWx0IGNoaWxkIHJvdXRlLiBcIiArXG4gICAgICAgICAgXCJXaGVuIG5hdmlnYXRpbmcgdG8gdGhpcyBuYW1lZCByb3V0ZSAoOnRvPVxcXCJ7bmFtZTogJ1wiICsgKHJvdXRlLm5hbWUpICsgXCInXFxcIiksIFwiICtcbiAgICAgICAgICBcInRoZSBkZWZhdWx0IGNoaWxkIHJvdXRlIHdpbGwgbm90IGJlIHJlbmRlcmVkLiBSZW1vdmUgdGhlIG5hbWUgZnJvbSBcIiArXG4gICAgICAgICAgXCJ0aGlzIHJvdXRlIGFuZCB1c2UgdGhlIG5hbWUgb2YgdGhlIGRlZmF1bHQgY2hpbGQgcm91dGUgZm9yIG5hbWVkIFwiICtcbiAgICAgICAgICBcImxpbmtzIGluc3RlYWQuXCJcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcm91dGUuY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICAgIHZhciBjaGlsZE1hdGNoQXMgPSBtYXRjaEFzXG4gICAgICAgID8gY2xlYW5QYXRoKChtYXRjaEFzICsgXCIvXCIgKyAoY2hpbGQucGF0aCkpKVxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIGFkZFJvdXRlUmVjb3JkKHBhdGhNYXAsIG5hbWVNYXAsIGNoaWxkLCByZWNvcmQsIGNoaWxkTWF0Y2hBcyk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAocm91dGUuYWxpYXMgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHJvdXRlLmFsaWFzKSkge1xuICAgICAgcm91dGUuYWxpYXMuZm9yRWFjaChmdW5jdGlvbiAoYWxpYXMpIHtcbiAgICAgICAgdmFyIGFsaWFzUm91dGUgPSB7XG4gICAgICAgICAgcGF0aDogYWxpYXMsXG4gICAgICAgICAgY2hpbGRyZW46IHJvdXRlLmNoaWxkcmVuXG4gICAgICAgIH07XG4gICAgICAgIGFkZFJvdXRlUmVjb3JkKHBhdGhNYXAsIG5hbWVNYXAsIGFsaWFzUm91dGUsIHBhcmVudCwgcmVjb3JkLnBhdGgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhbGlhc1JvdXRlID0ge1xuICAgICAgICBwYXRoOiByb3V0ZS5hbGlhcyxcbiAgICAgICAgY2hpbGRyZW46IHJvdXRlLmNoaWxkcmVuXG4gICAgICB9O1xuICAgICAgYWRkUm91dGVSZWNvcmQocGF0aE1hcCwgbmFtZU1hcCwgYWxpYXNSb3V0ZSwgcGFyZW50LCByZWNvcmQucGF0aCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFwYXRoTWFwW3JlY29yZC5wYXRoXSkge1xuICAgIHBhdGhNYXBbcmVjb3JkLnBhdGhdID0gcmVjb3JkO1xuICB9XG5cbiAgaWYgKG5hbWUpIHtcbiAgICBpZiAoIW5hbWVNYXBbbmFtZV0pIHtcbiAgICAgIG5hbWVNYXBbbmFtZV0gPSByZWNvcmQ7XG4gICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmICFtYXRjaEFzKSB7XG4gICAgICB3YXJuKFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgXCJEdXBsaWNhdGUgbmFtZWQgcm91dGVzIGRlZmluaXRpb246IFwiICtcbiAgICAgICAgXCJ7IG5hbWU6IFxcXCJcIiArIG5hbWUgKyBcIlxcXCIsIHBhdGg6IFxcXCJcIiArIChyZWNvcmQucGF0aCkgKyBcIlxcXCIgfVwiXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBub3JtYWxpemVQYXRoIChwYXRoLCBwYXJlbnQpIHtcbiAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXFwvJC8sICcnKTtcbiAgaWYgKHBhdGhbMF0gPT09ICcvJykgeyByZXR1cm4gcGF0aCB9XG4gIGlmIChwYXJlbnQgPT0gbnVsbCkgeyByZXR1cm4gcGF0aCB9XG4gIHJldHVybiBjbGVhblBhdGgoKChwYXJlbnQucGF0aCkgKyBcIi9cIiArIHBhdGgpKVxufVxuXG52YXIgaW5kZXgkMSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbnZhciBpc2FycmF5ID0gaW5kZXgkMTtcblxuLyoqXG4gKiBFeHBvc2UgYHBhdGhUb1JlZ2V4cGAuXG4gKi9cbnZhciBpbmRleCA9IHBhdGhUb1JlZ2V4cDtcbnZhciBwYXJzZV8xID0gcGFyc2U7XG52YXIgY29tcGlsZV8xID0gY29tcGlsZTtcbnZhciB0b2tlbnNUb0Z1bmN0aW9uXzEgPSB0b2tlbnNUb0Z1bmN0aW9uO1xudmFyIHRva2Vuc1RvUmVnRXhwXzEgPSB0b2tlbnNUb1JlZ0V4cDtcblxuLyoqXG4gKiBUaGUgbWFpbiBwYXRoIG1hdGNoaW5nIHJlZ2V4cCB1dGlsaXR5LlxuICpcbiAqIEB0eXBlIHtSZWdFeHB9XG4gKi9cbnZhciBQQVRIX1JFR0VYUCA9IG5ldyBSZWdFeHAoW1xuICAvLyBNYXRjaCBlc2NhcGVkIGNoYXJhY3RlcnMgdGhhdCB3b3VsZCBvdGhlcndpc2UgYXBwZWFyIGluIGZ1dHVyZSBtYXRjaGVzLlxuICAvLyBUaGlzIGFsbG93cyB0aGUgdXNlciB0byBlc2NhcGUgc3BlY2lhbCBjaGFyYWN0ZXJzIHRoYXQgd29uJ3QgdHJhbnNmb3JtLlxuICAnKFxcXFxcXFxcLiknLFxuICAvLyBNYXRjaCBFeHByZXNzLXN0eWxlIHBhcmFtZXRlcnMgYW5kIHVuLW5hbWVkIHBhcmFtZXRlcnMgd2l0aCBhIHByZWZpeFxuICAvLyBhbmQgb3B0aW9uYWwgc3VmZml4ZXMuIE1hdGNoZXMgYXBwZWFyIGFzOlxuICAvL1xuICAvLyBcIi86dGVzdChcXFxcZCspP1wiID0+IFtcIi9cIiwgXCJ0ZXN0XCIsIFwiXFxkK1wiLCB1bmRlZmluZWQsIFwiP1wiLCB1bmRlZmluZWRdXG4gIC8vIFwiL3JvdXRlKFxcXFxkKylcIiAgPT4gW3VuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFwiXFxkK1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZF1cbiAgLy8gXCIvKlwiICAgICAgICAgICAgPT4gW1wiL1wiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFwiKlwiXVxuICAnKFtcXFxcLy5dKT8oPzooPzpcXFxcOihcXFxcdyspKD86XFxcXCgoKD86XFxcXFxcXFwufFteXFxcXFxcXFwoKV0pKylcXFxcKSk/fFxcXFwoKCg/OlxcXFxcXFxcLnxbXlxcXFxcXFxcKCldKSspXFxcXCkpKFsrKj9dKT98KFxcXFwqKSknXG5dLmpvaW4oJ3wnKSwgJ2cnKTtcblxuLyoqXG4gKiBQYXJzZSBhIHN0cmluZyBmb3IgdGhlIHJhdyB0b2tlbnMuXG4gKlxuICogQHBhcmFtICB7c3RyaW5nfSAgc3RyXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSBvcHRpb25zXG4gKiBAcmV0dXJuIHshQXJyYXl9XG4gKi9cbmZ1bmN0aW9uIHBhcnNlIChzdHIsIG9wdGlvbnMpIHtcbiAgdmFyIHRva2VucyA9IFtdO1xuICB2YXIga2V5ID0gMDtcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIHBhdGggPSAnJztcbiAgdmFyIGRlZmF1bHREZWxpbWl0ZXIgPSBvcHRpb25zICYmIG9wdGlvbnMuZGVsaW1pdGVyIHx8ICcvJztcbiAgdmFyIHJlcztcblxuICB3aGlsZSAoKHJlcyA9IFBBVEhfUkVHRVhQLmV4ZWMoc3RyKSkgIT0gbnVsbCkge1xuICAgIHZhciBtID0gcmVzWzBdO1xuICAgIHZhciBlc2NhcGVkID0gcmVzWzFdO1xuICAgIHZhciBvZmZzZXQgPSByZXMuaW5kZXg7XG4gICAgcGF0aCArPSBzdHIuc2xpY2UoaW5kZXgsIG9mZnNldCk7XG4gICAgaW5kZXggPSBvZmZzZXQgKyBtLmxlbmd0aDtcblxuICAgIC8vIElnbm9yZSBhbHJlYWR5IGVzY2FwZWQgc2VxdWVuY2VzLlxuICAgIGlmIChlc2NhcGVkKSB7XG4gICAgICBwYXRoICs9IGVzY2FwZWRbMV07XG4gICAgICBjb250aW51ZVxuICAgIH1cblxuICAgIHZhciBuZXh0ID0gc3RyW2luZGV4XTtcbiAgICB2YXIgcHJlZml4ID0gcmVzWzJdO1xuICAgIHZhciBuYW1lID0gcmVzWzNdO1xuICAgIHZhciBjYXB0dXJlID0gcmVzWzRdO1xuICAgIHZhciBncm91cCA9IHJlc1s1XTtcbiAgICB2YXIgbW9kaWZpZXIgPSByZXNbNl07XG4gICAgdmFyIGFzdGVyaXNrID0gcmVzWzddO1xuXG4gICAgLy8gUHVzaCB0aGUgY3VycmVudCBwYXRoIG9udG8gdGhlIHRva2Vucy5cbiAgICBpZiAocGF0aCkge1xuICAgICAgdG9rZW5zLnB1c2gocGF0aCk7XG4gICAgICBwYXRoID0gJyc7XG4gICAgfVxuXG4gICAgdmFyIHBhcnRpYWwgPSBwcmVmaXggIT0gbnVsbCAmJiBuZXh0ICE9IG51bGwgJiYgbmV4dCAhPT0gcHJlZml4O1xuICAgIHZhciByZXBlYXQgPSBtb2RpZmllciA9PT0gJysnIHx8IG1vZGlmaWVyID09PSAnKic7XG4gICAgdmFyIG9wdGlvbmFsID0gbW9kaWZpZXIgPT09ICc/JyB8fCBtb2RpZmllciA9PT0gJyonO1xuICAgIHZhciBkZWxpbWl0ZXIgPSByZXNbMl0gfHwgZGVmYXVsdERlbGltaXRlcjtcbiAgICB2YXIgcGF0dGVybiA9IGNhcHR1cmUgfHwgZ3JvdXA7XG5cbiAgICB0b2tlbnMucHVzaCh7XG4gICAgICBuYW1lOiBuYW1lIHx8IGtleSsrLFxuICAgICAgcHJlZml4OiBwcmVmaXggfHwgJycsXG4gICAgICBkZWxpbWl0ZXI6IGRlbGltaXRlcixcbiAgICAgIG9wdGlvbmFsOiBvcHRpb25hbCxcbiAgICAgIHJlcGVhdDogcmVwZWF0LFxuICAgICAgcGFydGlhbDogcGFydGlhbCxcbiAgICAgIGFzdGVyaXNrOiAhIWFzdGVyaXNrLFxuICAgICAgcGF0dGVybjogcGF0dGVybiA/IGVzY2FwZUdyb3VwKHBhdHRlcm4pIDogKGFzdGVyaXNrID8gJy4qJyA6ICdbXicgKyBlc2NhcGVTdHJpbmcoZGVsaW1pdGVyKSArICddKz8nKVxuICAgIH0pO1xuICB9XG5cbiAgLy8gTWF0Y2ggYW55IGNoYXJhY3RlcnMgc3RpbGwgcmVtYWluaW5nLlxuICBpZiAoaW5kZXggPCBzdHIubGVuZ3RoKSB7XG4gICAgcGF0aCArPSBzdHIuc3Vic3RyKGluZGV4KTtcbiAgfVxuXG4gIC8vIElmIHRoZSBwYXRoIGV4aXN0cywgcHVzaCBpdCBvbnRvIHRoZSBlbmQuXG4gIGlmIChwYXRoKSB7XG4gICAgdG9rZW5zLnB1c2gocGF0aCk7XG4gIH1cblxuICByZXR1cm4gdG9rZW5zXG59XG5cbi8qKlxuICogQ29tcGlsZSBhIHN0cmluZyB0byBhIHRlbXBsYXRlIGZ1bmN0aW9uIGZvciB0aGUgcGF0aC5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgICAgIHN0clxuICogQHBhcmFtICB7T2JqZWN0PX0gICAgICAgICAgICBvcHRpb25zXG4gKiBAcmV0dXJuIHshZnVuY3Rpb24oT2JqZWN0PSwgT2JqZWN0PSl9XG4gKi9cbmZ1bmN0aW9uIGNvbXBpbGUgKHN0ciwgb3B0aW9ucykge1xuICByZXR1cm4gdG9rZW5zVG9GdW5jdGlvbihwYXJzZShzdHIsIG9wdGlvbnMpKVxufVxuXG4vKipcbiAqIFByZXR0aWVyIGVuY29kaW5nIG9mIFVSSSBwYXRoIHNlZ21lbnRzLlxuICpcbiAqIEBwYXJhbSAge3N0cmluZ31cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZW5jb2RlVVJJQ29tcG9uZW50UHJldHR5IChzdHIpIHtcbiAgcmV0dXJuIGVuY29kZVVSSShzdHIpLnJlcGxhY2UoL1tcXC8/I10vZywgZnVuY3Rpb24gKGMpIHtcbiAgICByZXR1cm4gJyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpXG4gIH0pXG59XG5cbi8qKlxuICogRW5jb2RlIHRoZSBhc3RlcmlzayBwYXJhbWV0ZXIuIFNpbWlsYXIgdG8gYHByZXR0eWAsIGJ1dCBhbGxvd3Mgc2xhc2hlcy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9XG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVuY29kZUFzdGVyaXNrIChzdHIpIHtcbiAgcmV0dXJuIGVuY29kZVVSSShzdHIpLnJlcGxhY2UoL1s/I10vZywgZnVuY3Rpb24gKGMpIHtcbiAgICByZXR1cm4gJyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpXG4gIH0pXG59XG5cbi8qKlxuICogRXhwb3NlIGEgbWV0aG9kIGZvciB0cmFuc2Zvcm1pbmcgdG9rZW5zIGludG8gdGhlIHBhdGggZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHRva2Vuc1RvRnVuY3Rpb24gKHRva2Vucykge1xuICAvLyBDb21waWxlIGFsbCB0aGUgdG9rZW5zIGludG8gcmVnZXhwcy5cbiAgdmFyIG1hdGNoZXMgPSBuZXcgQXJyYXkodG9rZW5zLmxlbmd0aCk7XG5cbiAgLy8gQ29tcGlsZSBhbGwgdGhlIHBhdHRlcm5zIGJlZm9yZSBjb21waWxhdGlvbi5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAodHlwZW9mIHRva2Vuc1tpXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIG1hdGNoZXNbaV0gPSBuZXcgUmVnRXhwKCdeKD86JyArIHRva2Vuc1tpXS5wYXR0ZXJuICsgJykkJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChvYmosIG9wdHMpIHtcbiAgICB2YXIgcGF0aCA9ICcnO1xuICAgIHZhciBkYXRhID0gb2JqIHx8IHt9O1xuICAgIHZhciBvcHRpb25zID0gb3B0cyB8fCB7fTtcbiAgICB2YXIgZW5jb2RlID0gb3B0aW9ucy5wcmV0dHkgPyBlbmNvZGVVUklDb21wb25lbnRQcmV0dHkgOiBlbmNvZGVVUklDb21wb25lbnQ7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldO1xuXG4gICAgICBpZiAodHlwZW9mIHRva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgICBwYXRoICs9IHRva2VuO1xuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZSA9IGRhdGFbdG9rZW4ubmFtZV07XG4gICAgICB2YXIgc2VnbWVudDtcblxuICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgaWYgKHRva2VuLm9wdGlvbmFsKSB7XG4gICAgICAgICAgLy8gUHJlcGVuZCBwYXJ0aWFsIHNlZ21lbnQgcHJlZml4ZXMuXG4gICAgICAgICAgaWYgKHRva2VuLnBhcnRpYWwpIHtcbiAgICAgICAgICAgIHBhdGggKz0gdG9rZW4ucHJlZml4O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBiZSBkZWZpbmVkJylcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaXNhcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgaWYgKCF0b2tlbi5yZXBlYXQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBcIicgKyB0b2tlbi5uYW1lICsgJ1wiIHRvIG5vdCByZXBlYXQsIGJ1dCByZWNlaXZlZCBgJyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKSArICdgJylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBpZiAodG9rZW4ub3B0aW9uYWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0V4cGVjdGVkIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbm90IGJlIGVtcHR5JylcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbHVlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgc2VnbWVudCA9IGVuY29kZSh2YWx1ZVtqXSk7XG5cbiAgICAgICAgICBpZiAoIW1hdGNoZXNbaV0udGVzdChzZWdtZW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYWxsIFwiJyArIHRva2VuLm5hbWUgKyAnXCIgdG8gbWF0Y2ggXCInICsgdG9rZW4ucGF0dGVybiArICdcIiwgYnV0IHJlY2VpdmVkIGAnICsgSlNPTi5zdHJpbmdpZnkoc2VnbWVudCkgKyAnYCcpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcGF0aCArPSAoaiA9PT0gMCA/IHRva2VuLnByZWZpeCA6IHRva2VuLmRlbGltaXRlcikgKyBzZWdtZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgc2VnbWVudCA9IHRva2VuLmFzdGVyaXNrID8gZW5jb2RlQXN0ZXJpc2sodmFsdWUpIDogZW5jb2RlKHZhbHVlKTtcblxuICAgICAgaWYgKCFtYXRjaGVzW2ldLnRlc3Qoc2VnbWVudCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgXCInICsgdG9rZW4ubmFtZSArICdcIiB0byBtYXRjaCBcIicgKyB0b2tlbi5wYXR0ZXJuICsgJ1wiLCBidXQgcmVjZWl2ZWQgXCInICsgc2VnbWVudCArICdcIicpXG4gICAgICB9XG5cbiAgICAgIHBhdGggKz0gdG9rZW4ucHJlZml4ICsgc2VnbWVudDtcbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aFxuICB9XG59XG5cbi8qKlxuICogRXNjYXBlIGEgcmVndWxhciBleHByZXNzaW9uIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IHN0clxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBlc2NhcGVTdHJpbmcgKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLyhbLisqPz1eIToke30oKVtcXF18XFwvXFxcXF0pL2csICdcXFxcJDEnKVxufVxuXG4vKipcbiAqIEVzY2FwZSB0aGUgY2FwdHVyaW5nIGdyb3VwIGJ5IGVzY2FwaW5nIHNwZWNpYWwgY2hhcmFjdGVycyBhbmQgbWVhbmluZy5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9IGdyb3VwXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGVzY2FwZUdyb3VwIChncm91cCkge1xuICByZXR1cm4gZ3JvdXAucmVwbGFjZSgvKFs9ITokXFwvKCldKS9nLCAnXFxcXCQxJylcbn1cblxuLyoqXG4gKiBBdHRhY2ggdGhlIGtleXMgYXMgYSBwcm9wZXJ0eSBvZiB0aGUgcmVnZXhwLlxuICpcbiAqIEBwYXJhbSAgeyFSZWdFeHB9IHJlXG4gKiBAcGFyYW0gIHtBcnJheX0gICBrZXlzXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBhdHRhY2hLZXlzIChyZSwga2V5cykge1xuICByZS5rZXlzID0ga2V5cztcbiAgcmV0dXJuIHJlXG59XG5cbi8qKlxuICogR2V0IHRoZSBmbGFncyBmb3IgYSByZWdleHAgZnJvbSB0aGUgb3B0aW9ucy5cbiAqXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZmxhZ3MgKG9wdGlvbnMpIHtcbiAgcmV0dXJuIG9wdGlvbnMuc2Vuc2l0aXZlID8gJycgOiAnaSdcbn1cblxuLyoqXG4gKiBQdWxsIG91dCBrZXlzIGZyb20gYSByZWdleHAuXG4gKlxuICogQHBhcmFtICB7IVJlZ0V4cH0gcGF0aFxuICogQHBhcmFtICB7IUFycmF5fSAga2V5c1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gcmVnZXhwVG9SZWdleHAgKHBhdGgsIGtleXMpIHtcbiAgLy8gVXNlIGEgbmVnYXRpdmUgbG9va2FoZWFkIHRvIG1hdGNoIG9ubHkgY2FwdHVyaW5nIGdyb3Vwcy5cbiAgdmFyIGdyb3VwcyA9IHBhdGguc291cmNlLm1hdGNoKC9cXCgoPyFcXD8pL2cpO1xuXG4gIGlmIChncm91cHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAga2V5cy5wdXNoKHtcbiAgICAgICAgbmFtZTogaSxcbiAgICAgICAgcHJlZml4OiBudWxsLFxuICAgICAgICBkZWxpbWl0ZXI6IG51bGwsXG4gICAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgICAgcmVwZWF0OiBmYWxzZSxcbiAgICAgICAgcGFydGlhbDogZmFsc2UsXG4gICAgICAgIGFzdGVyaXNrOiBmYWxzZSxcbiAgICAgICAgcGF0dGVybjogbnVsbFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGF0dGFjaEtleXMocGF0aCwga2V5cylcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gYW4gYXJyYXkgaW50byBhIHJlZ2V4cC5cbiAqXG4gKiBAcGFyYW0gIHshQXJyYXl9ICBwYXRoXG4gKiBAcGFyYW0gIHtBcnJheX0gICBrZXlzXG4gKiBAcGFyYW0gIHshT2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBhcnJheVRvUmVnZXhwIChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gIHZhciBwYXJ0cyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xuICAgIHBhcnRzLnB1c2gocGF0aFRvUmVnZXhwKHBhdGhbaV0sIGtleXMsIG9wdGlvbnMpLnNvdXJjZSk7XG4gIH1cblxuICB2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cCgnKD86JyArIHBhcnRzLmpvaW4oJ3wnKSArICcpJywgZmxhZ3Mob3B0aW9ucykpO1xuXG4gIHJldHVybiBhdHRhY2hLZXlzKHJlZ2V4cCwga2V5cylcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBwYXRoIHJlZ2V4cCBmcm9tIHN0cmluZyBpbnB1dC5cbiAqXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICBwYXRoXG4gKiBAcGFyYW0gIHshQXJyYXl9ICBrZXlzXG4gKiBAcGFyYW0gIHshT2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHshUmVnRXhwfVxuICovXG5mdW5jdGlvbiBzdHJpbmdUb1JlZ2V4cCAocGF0aCwga2V5cywgb3B0aW9ucykge1xuICByZXR1cm4gdG9rZW5zVG9SZWdFeHAocGFyc2UocGF0aCwgb3B0aW9ucyksIGtleXMsIG9wdGlvbnMpXG59XG5cbi8qKlxuICogRXhwb3NlIGEgZnVuY3Rpb24gZm9yIHRha2luZyB0b2tlbnMgYW5kIHJldHVybmluZyBhIFJlZ0V4cC5cbiAqXG4gKiBAcGFyYW0gIHshQXJyYXl9ICAgICAgICAgIHRva2Vuc1xuICogQHBhcmFtICB7KEFycmF5fE9iamVjdCk9fSBrZXlzXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSAgICAgICAgIG9wdGlvbnNcbiAqIEByZXR1cm4geyFSZWdFeHB9XG4gKi9cbmZ1bmN0aW9uIHRva2Vuc1RvUmVnRXhwICh0b2tlbnMsIGtleXMsIG9wdGlvbnMpIHtcbiAgaWYgKCFpc2FycmF5KGtleXMpKSB7XG4gICAgb3B0aW9ucyA9IC8qKiBAdHlwZSB7IU9iamVjdH0gKi8gKGtleXMgfHwgb3B0aW9ucyk7XG4gICAga2V5cyA9IFtdO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHN0cmljdCA9IG9wdGlvbnMuc3RyaWN0O1xuICB2YXIgZW5kID0gb3B0aW9ucy5lbmQgIT09IGZhbHNlO1xuICB2YXIgcm91dGUgPSAnJztcblxuICAvLyBJdGVyYXRlIG92ZXIgdGhlIHRva2VucyBhbmQgY3JlYXRlIG91ciByZWdleHAgc3RyaW5nLlxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcblxuICAgIGlmICh0eXBlb2YgdG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICByb3V0ZSArPSBlc2NhcGVTdHJpbmcodG9rZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcHJlZml4ID0gZXNjYXBlU3RyaW5nKHRva2VuLnByZWZpeCk7XG4gICAgICB2YXIgY2FwdHVyZSA9ICcoPzonICsgdG9rZW4ucGF0dGVybiArICcpJztcblxuICAgICAga2V5cy5wdXNoKHRva2VuKTtcblxuICAgICAgaWYgKHRva2VuLnJlcGVhdCkge1xuICAgICAgICBjYXB0dXJlICs9ICcoPzonICsgcHJlZml4ICsgY2FwdHVyZSArICcpKic7XG4gICAgICB9XG5cbiAgICAgIGlmICh0b2tlbi5vcHRpb25hbCkge1xuICAgICAgICBpZiAoIXRva2VuLnBhcnRpYWwpIHtcbiAgICAgICAgICBjYXB0dXJlID0gJyg/OicgKyBwcmVmaXggKyAnKCcgKyBjYXB0dXJlICsgJykpPyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2FwdHVyZSA9IHByZWZpeCArICcoJyArIGNhcHR1cmUgKyAnKT8nO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYXB0dXJlID0gcHJlZml4ICsgJygnICsgY2FwdHVyZSArICcpJztcbiAgICAgIH1cblxuICAgICAgcm91dGUgKz0gY2FwdHVyZTtcbiAgICB9XG4gIH1cblxuICB2YXIgZGVsaW1pdGVyID0gZXNjYXBlU3RyaW5nKG9wdGlvbnMuZGVsaW1pdGVyIHx8ICcvJyk7XG4gIHZhciBlbmRzV2l0aERlbGltaXRlciA9IHJvdXRlLnNsaWNlKC1kZWxpbWl0ZXIubGVuZ3RoKSA9PT0gZGVsaW1pdGVyO1xuXG4gIC8vIEluIG5vbi1zdHJpY3QgbW9kZSB3ZSBhbGxvdyBhIHNsYXNoIGF0IHRoZSBlbmQgb2YgbWF0Y2guIElmIHRoZSBwYXRoIHRvXG4gIC8vIG1hdGNoIGFscmVhZHkgZW5kcyB3aXRoIGEgc2xhc2gsIHdlIHJlbW92ZSBpdCBmb3IgY29uc2lzdGVuY3kuIFRoZSBzbGFzaFxuICAvLyBpcyB2YWxpZCBhdCB0aGUgZW5kIG9mIGEgcGF0aCBtYXRjaCwgbm90IGluIHRoZSBtaWRkbGUuIFRoaXMgaXMgaW1wb3J0YW50XG4gIC8vIGluIG5vbi1lbmRpbmcgbW9kZSwgd2hlcmUgXCIvdGVzdC9cIiBzaG91bGRuJ3QgbWF0Y2ggXCIvdGVzdC8vcm91dGVcIi5cbiAgaWYgKCFzdHJpY3QpIHtcbiAgICByb3V0ZSA9IChlbmRzV2l0aERlbGltaXRlciA/IHJvdXRlLnNsaWNlKDAsIC1kZWxpbWl0ZXIubGVuZ3RoKSA6IHJvdXRlKSArICcoPzonICsgZGVsaW1pdGVyICsgJyg/PSQpKT8nO1xuICB9XG5cbiAgaWYgKGVuZCkge1xuICAgIHJvdXRlICs9ICckJztcbiAgfSBlbHNlIHtcbiAgICAvLyBJbiBub24tZW5kaW5nIG1vZGUsIHdlIG5lZWQgdGhlIGNhcHR1cmluZyBncm91cHMgdG8gbWF0Y2ggYXMgbXVjaCBhc1xuICAgIC8vIHBvc3NpYmxlIGJ5IHVzaW5nIGEgcG9zaXRpdmUgbG9va2FoZWFkIHRvIHRoZSBlbmQgb3IgbmV4dCBwYXRoIHNlZ21lbnQuXG4gICAgcm91dGUgKz0gc3RyaWN0ICYmIGVuZHNXaXRoRGVsaW1pdGVyID8gJycgOiAnKD89JyArIGRlbGltaXRlciArICd8JCknO1xuICB9XG5cbiAgcmV0dXJuIGF0dGFjaEtleXMobmV3IFJlZ0V4cCgnXicgKyByb3V0ZSwgZmxhZ3Mob3B0aW9ucykpLCBrZXlzKVxufVxuXG4vKipcbiAqIE5vcm1hbGl6ZSB0aGUgZ2l2ZW4gcGF0aCBzdHJpbmcsIHJldHVybmluZyBhIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAqXG4gKiBBbiBlbXB0eSBhcnJheSBjYW4gYmUgcGFzc2VkIGluIGZvciB0aGUga2V5cywgd2hpY2ggd2lsbCBob2xkIHRoZVxuICogcGxhY2Vob2xkZXIga2V5IGRlc2NyaXB0aW9ucy4gRm9yIGV4YW1wbGUsIHVzaW5nIGAvdXNlci86aWRgLCBga2V5c2Agd2lsbFxuICogY29udGFpbiBgW3sgbmFtZTogJ2lkJywgZGVsaW1pdGVyOiAnLycsIG9wdGlvbmFsOiBmYWxzZSwgcmVwZWF0OiBmYWxzZSB9XWAuXG4gKlxuICogQHBhcmFtICB7KHN0cmluZ3xSZWdFeHB8QXJyYXkpfSBwYXRoXG4gKiBAcGFyYW0gIHsoQXJyYXl8T2JqZWN0KT19ICAgICAgIGtleXNcbiAqIEBwYXJhbSAge09iamVjdD19ICAgICAgICAgICAgICAgb3B0aW9uc1xuICogQHJldHVybiB7IVJlZ0V4cH1cbiAqL1xuZnVuY3Rpb24gcGF0aFRvUmVnZXhwIChwYXRoLCBrZXlzLCBvcHRpb25zKSB7XG4gIGlmICghaXNhcnJheShrZXlzKSkge1xuICAgIG9wdGlvbnMgPSAvKiogQHR5cGUgeyFPYmplY3R9ICovIChrZXlzIHx8IG9wdGlvbnMpO1xuICAgIGtleXMgPSBbXTtcbiAgfVxuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIGlmIChwYXRoIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgcmV0dXJuIHJlZ2V4cFRvUmVnZXhwKHBhdGgsIC8qKiBAdHlwZSB7IUFycmF5fSAqLyAoa2V5cykpXG4gIH1cblxuICBpZiAoaXNhcnJheShwYXRoKSkge1xuICAgIHJldHVybiBhcnJheVRvUmVnZXhwKC8qKiBAdHlwZSB7IUFycmF5fSAqLyAocGF0aCksIC8qKiBAdHlwZSB7IUFycmF5fSAqLyAoa2V5cyksIG9wdGlvbnMpXG4gIH1cblxuICByZXR1cm4gc3RyaW5nVG9SZWdleHAoLyoqIEB0eXBlIHtzdHJpbmd9ICovIChwYXRoKSwgLyoqIEB0eXBlIHshQXJyYXl9ICovIChrZXlzKSwgb3B0aW9ucylcbn1cblxuaW5kZXgucGFyc2UgPSBwYXJzZV8xO1xuaW5kZXguY29tcGlsZSA9IGNvbXBpbGVfMTtcbmluZGV4LnRva2Vuc1RvRnVuY3Rpb24gPSB0b2tlbnNUb0Z1bmN0aW9uXzE7XG5pbmRleC50b2tlbnNUb1JlZ0V4cCA9IHRva2Vuc1RvUmVnRXhwXzE7XG5cbi8qICAqL1xuXG52YXIgcmVnZXhwQ2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG5mdW5jdGlvbiBnZXRSb3V0ZVJlZ2V4IChwYXRoKSB7XG4gIHZhciBoaXQgPSByZWdleHBDYWNoZVtwYXRoXTtcbiAgdmFyIGtleXMsIHJlZ2V4cDtcblxuICBpZiAoaGl0KSB7XG4gICAga2V5cyA9IGhpdC5rZXlzO1xuICAgIHJlZ2V4cCA9IGhpdC5yZWdleHA7XG4gIH0gZWxzZSB7XG4gICAga2V5cyA9IFtdO1xuICAgIHJlZ2V4cCA9IGluZGV4KHBhdGgsIGtleXMpO1xuICAgIHJlZ2V4cENhY2hlW3BhdGhdID0geyBrZXlzOiBrZXlzLCByZWdleHA6IHJlZ2V4cCB9O1xuICB9XG5cbiAgcmV0dXJuIHsga2V5czoga2V5cywgcmVnZXhwOiByZWdleHAgfVxufVxuXG52YXIgcmVnZXhwQ29tcGlsZUNhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuZnVuY3Rpb24gZmlsbFBhcmFtcyAoXG4gIHBhdGgsXG4gIHBhcmFtcyxcbiAgcm91dGVNc2dcbikge1xuICB0cnkge1xuICAgIHZhciBmaWxsZXIgPVxuICAgICAgcmVnZXhwQ29tcGlsZUNhY2hlW3BhdGhdIHx8XG4gICAgICAocmVnZXhwQ29tcGlsZUNhY2hlW3BhdGhdID0gaW5kZXguY29tcGlsZShwYXRoKSk7XG4gICAgcmV0dXJuIGZpbGxlcihwYXJhbXMgfHwge30sIHsgcHJldHR5OiB0cnVlIH0pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgd2FybihmYWxzZSwgKFwibWlzc2luZyBwYXJhbSBmb3IgXCIgKyByb3V0ZU1zZyArIFwiOiBcIiArIChlLm1lc3NhZ2UpKSk7XG4gICAgfVxuICAgIHJldHVybiAnJ1xuICB9XG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBub3JtYWxpemVMb2NhdGlvbiAoXG4gIHJhdyxcbiAgY3VycmVudCxcbiAgYXBwZW5kXG4pIHtcbiAgdmFyIG5leHQgPSB0eXBlb2YgcmF3ID09PSAnc3RyaW5nJyA/IHsgcGF0aDogcmF3IH0gOiByYXc7XG4gIC8vIG5hbWVkIHRhcmdldFxuICBpZiAobmV4dC5uYW1lIHx8IG5leHQuX25vcm1hbGl6ZWQpIHtcbiAgICByZXR1cm4gbmV4dFxuICB9XG5cbiAgLy8gcmVsYXRpdmUgcGFyYW1zXG4gIGlmICghbmV4dC5wYXRoICYmIG5leHQucGFyYW1zICYmIGN1cnJlbnQpIHtcbiAgICBuZXh0ID0gYXNzaWduKHt9LCBuZXh0KTtcbiAgICBuZXh0Ll9ub3JtYWxpemVkID0gdHJ1ZTtcbiAgICB2YXIgcGFyYW1zID0gYXNzaWduKGFzc2lnbih7fSwgY3VycmVudC5wYXJhbXMpLCBuZXh0LnBhcmFtcyk7XG4gICAgaWYgKGN1cnJlbnQubmFtZSkge1xuICAgICAgbmV4dC5uYW1lID0gY3VycmVudC5uYW1lO1xuICAgICAgbmV4dC5wYXJhbXMgPSBwYXJhbXM7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50Lm1hdGNoZWQpIHtcbiAgICAgIHZhciByYXdQYXRoID0gY3VycmVudC5tYXRjaGVkW2N1cnJlbnQubWF0Y2hlZC5sZW5ndGggLSAxXS5wYXRoO1xuICAgICAgbmV4dC5wYXRoID0gZmlsbFBhcmFtcyhyYXdQYXRoLCBwYXJhbXMsIChcInBhdGggXCIgKyAoY3VycmVudC5wYXRoKSkpO1xuICAgIH0gZWxzZSBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgd2FybihmYWxzZSwgXCJyZWxhdGl2ZSBwYXJhbXMgbmF2aWdhdGlvbiByZXF1aXJlcyBhIGN1cnJlbnQgcm91dGUuXCIpO1xuICAgIH1cbiAgICByZXR1cm4gbmV4dFxuICB9XG5cbiAgdmFyIHBhcnNlZFBhdGggPSBwYXJzZVBhdGgobmV4dC5wYXRoIHx8ICcnKTtcbiAgdmFyIGJhc2VQYXRoID0gKGN1cnJlbnQgJiYgY3VycmVudC5wYXRoKSB8fCAnLyc7XG4gIHZhciBwYXRoID0gcGFyc2VkUGF0aC5wYXRoXG4gICAgPyByZXNvbHZlUGF0aChwYXJzZWRQYXRoLnBhdGgsIGJhc2VQYXRoLCBhcHBlbmQgfHwgbmV4dC5hcHBlbmQpXG4gICAgOiAoY3VycmVudCAmJiBjdXJyZW50LnBhdGgpIHx8ICcvJztcbiAgdmFyIHF1ZXJ5ID0gcmVzb2x2ZVF1ZXJ5KHBhcnNlZFBhdGgucXVlcnksIG5leHQucXVlcnkpO1xuICB2YXIgaGFzaCA9IG5leHQuaGFzaCB8fCBwYXJzZWRQYXRoLmhhc2g7XG4gIGlmIChoYXNoICYmIGhhc2guY2hhckF0KDApICE9PSAnIycpIHtcbiAgICBoYXNoID0gXCIjXCIgKyBoYXNoO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBfbm9ybWFsaXplZDogdHJ1ZSxcbiAgICBwYXRoOiBwYXRoLFxuICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICBoYXNoOiBoYXNoXG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzaWduIChhLCBiKSB7XG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgYVtrZXldID0gYltrZXldO1xuICB9XG4gIHJldHVybiBhXG59XG5cbi8qICAqL1xuXG5mdW5jdGlvbiBjcmVhdGVNYXRjaGVyIChyb3V0ZXMpIHtcbiAgdmFyIHJlZiA9IGNyZWF0ZVJvdXRlTWFwKHJvdXRlcyk7XG4gIHZhciBwYXRoTWFwID0gcmVmLnBhdGhNYXA7XG4gIHZhciBuYW1lTWFwID0gcmVmLm5hbWVNYXA7XG5cbiAgZnVuY3Rpb24gYWRkUm91dGVzIChyb3V0ZXMpIHtcbiAgICBjcmVhdGVSb3V0ZU1hcChyb3V0ZXMsIHBhdGhNYXAsIG5hbWVNYXApO1xuICB9XG5cbiAgZnVuY3Rpb24gbWF0Y2ggKFxuICAgIHJhdyxcbiAgICBjdXJyZW50Um91dGUsXG4gICAgcmVkaXJlY3RlZEZyb21cbiAgKSB7XG4gICAgdmFyIGxvY2F0aW9uID0gbm9ybWFsaXplTG9jYXRpb24ocmF3LCBjdXJyZW50Um91dGUpO1xuICAgIHZhciBuYW1lID0gbG9jYXRpb24ubmFtZTtcblxuICAgIGlmIChuYW1lKSB7XG4gICAgICB2YXIgcmVjb3JkID0gbmFtZU1hcFtuYW1lXTtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIHdhcm4ocmVjb3JkLCAoXCJSb3V0ZSB3aXRoIG5hbWUgJ1wiICsgbmFtZSArIFwiJyBkb2VzIG5vdCBleGlzdFwiKSk7XG4gICAgICB9XG4gICAgICB2YXIgcGFyYW1OYW1lcyA9IGdldFJvdXRlUmVnZXgocmVjb3JkLnBhdGgpLmtleXNcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7IHJldHVybiAha2V5Lm9wdGlvbmFsOyB9KVxuICAgICAgICAubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIGtleS5uYW1lOyB9KTtcblxuICAgICAgaWYgKHR5cGVvZiBsb2NhdGlvbi5wYXJhbXMgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGxvY2F0aW9uLnBhcmFtcyA9IHt9O1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudFJvdXRlICYmIHR5cGVvZiBjdXJyZW50Um91dGUucGFyYW1zID09PSAnb2JqZWN0Jykge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gY3VycmVudFJvdXRlLnBhcmFtcykge1xuICAgICAgICAgIGlmICghKGtleSBpbiBsb2NhdGlvbi5wYXJhbXMpICYmIHBhcmFtTmFtZXMuaW5kZXhPZihrZXkpID4gLTEpIHtcbiAgICAgICAgICAgIGxvY2F0aW9uLnBhcmFtc1trZXldID0gY3VycmVudFJvdXRlLnBhcmFtc1trZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkKSB7XG4gICAgICAgIGxvY2F0aW9uLnBhdGggPSBmaWxsUGFyYW1zKHJlY29yZC5wYXRoLCBsb2NhdGlvbi5wYXJhbXMsIChcIm5hbWVkIHJvdXRlIFxcXCJcIiArIG5hbWUgKyBcIlxcXCJcIikpO1xuICAgICAgICByZXR1cm4gX2NyZWF0ZVJvdXRlKHJlY29yZCwgbG9jYXRpb24sIHJlZGlyZWN0ZWRGcm9tKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobG9jYXRpb24ucGF0aCkge1xuICAgICAgbG9jYXRpb24ucGFyYW1zID0ge307XG4gICAgICBmb3IgKHZhciBwYXRoIGluIHBhdGhNYXApIHtcbiAgICAgICAgaWYgKG1hdGNoUm91dGUocGF0aCwgbG9jYXRpb24ucGFyYW1zLCBsb2NhdGlvbi5wYXRoKSkge1xuICAgICAgICAgIHJldHVybiBfY3JlYXRlUm91dGUocGF0aE1hcFtwYXRoXSwgbG9jYXRpb24sIHJlZGlyZWN0ZWRGcm9tKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vIG5vIG1hdGNoXG4gICAgcmV0dXJuIF9jcmVhdGVSb3V0ZShudWxsLCBsb2NhdGlvbilcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZGlyZWN0IChcbiAgICByZWNvcmQsXG4gICAgbG9jYXRpb25cbiAgKSB7XG4gICAgdmFyIG9yaWdpbmFsUmVkaXJlY3QgPSByZWNvcmQucmVkaXJlY3Q7XG4gICAgdmFyIHJlZGlyZWN0ID0gdHlwZW9mIG9yaWdpbmFsUmVkaXJlY3QgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyBvcmlnaW5hbFJlZGlyZWN0KGNyZWF0ZVJvdXRlKHJlY29yZCwgbG9jYXRpb24pKVxuICAgICAgICA6IG9yaWdpbmFsUmVkaXJlY3Q7XG5cbiAgICBpZiAodHlwZW9mIHJlZGlyZWN0ID09PSAnc3RyaW5nJykge1xuICAgICAgcmVkaXJlY3QgPSB7IHBhdGg6IHJlZGlyZWN0IH07XG4gICAgfVxuXG4gICAgaWYgKCFyZWRpcmVjdCB8fCB0eXBlb2YgcmVkaXJlY3QgIT09ICdvYmplY3QnKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHdhcm4oXG4gICAgICAgIGZhbHNlLCAoXCJpbnZhbGlkIHJlZGlyZWN0IG9wdGlvbjogXCIgKyAoSlNPTi5zdHJpbmdpZnkocmVkaXJlY3QpKSlcbiAgICAgICk7XG4gICAgICByZXR1cm4gX2NyZWF0ZVJvdXRlKG51bGwsIGxvY2F0aW9uKVxuICAgIH1cblxuICAgIHZhciByZSA9IHJlZGlyZWN0O1xuICAgIHZhciBuYW1lID0gcmUubmFtZTtcbiAgICB2YXIgcGF0aCA9IHJlLnBhdGg7XG4gICAgdmFyIHF1ZXJ5ID0gbG9jYXRpb24ucXVlcnk7XG4gICAgdmFyIGhhc2ggPSBsb2NhdGlvbi5oYXNoO1xuICAgIHZhciBwYXJhbXMgPSBsb2NhdGlvbi5wYXJhbXM7XG4gICAgcXVlcnkgPSByZS5oYXNPd25Qcm9wZXJ0eSgncXVlcnknKSA/IHJlLnF1ZXJ5IDogcXVlcnk7XG4gICAgaGFzaCA9IHJlLmhhc093blByb3BlcnR5KCdoYXNoJykgPyByZS5oYXNoIDogaGFzaDtcbiAgICBwYXJhbXMgPSByZS5oYXNPd25Qcm9wZXJ0eSgncGFyYW1zJykgPyByZS5wYXJhbXMgOiBwYXJhbXM7XG5cbiAgICBpZiAobmFtZSkge1xuICAgICAgLy8gcmVzb2x2ZWQgbmFtZWQgZGlyZWN0XG4gICAgICB2YXIgdGFyZ2V0UmVjb3JkID0gbmFtZU1hcFtuYW1lXTtcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGFzc2VydCh0YXJnZXRSZWNvcmQsIChcInJlZGlyZWN0IGZhaWxlZDogbmFtZWQgcm91dGUgXFxcIlwiICsgbmFtZSArIFwiXFxcIiBub3QgZm91bmQuXCIpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaCh7XG4gICAgICAgIF9ub3JtYWxpemVkOiB0cnVlLFxuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgIGhhc2g6IGhhc2gsXG4gICAgICAgIHBhcmFtczogcGFyYW1zXG4gICAgICB9LCB1bmRlZmluZWQsIGxvY2F0aW9uKVxuICAgIH0gZWxzZSBpZiAocGF0aCkge1xuICAgICAgLy8gMS4gcmVzb2x2ZSByZWxhdGl2ZSByZWRpcmVjdFxuICAgICAgdmFyIHJhd1BhdGggPSByZXNvbHZlUmVjb3JkUGF0aChwYXRoLCByZWNvcmQpO1xuICAgICAgLy8gMi4gcmVzb2x2ZSBwYXJhbXNcbiAgICAgIHZhciByZXNvbHZlZFBhdGggPSBmaWxsUGFyYW1zKHJhd1BhdGgsIHBhcmFtcywgKFwicmVkaXJlY3Qgcm91dGUgd2l0aCBwYXRoIFxcXCJcIiArIHJhd1BhdGggKyBcIlxcXCJcIikpO1xuICAgICAgLy8gMy4gcmVtYXRjaCB3aXRoIGV4aXN0aW5nIHF1ZXJ5IGFuZCBoYXNoXG4gICAgICByZXR1cm4gbWF0Y2goe1xuICAgICAgICBfbm9ybWFsaXplZDogdHJ1ZSxcbiAgICAgICAgcGF0aDogcmVzb2x2ZWRQYXRoLFxuICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgIGhhc2g6IGhhc2hcbiAgICAgIH0sIHVuZGVmaW5lZCwgbG9jYXRpb24pXG4gICAgfSBlbHNlIHtcbiAgICAgIHdhcm4oZmFsc2UsIChcImludmFsaWQgcmVkaXJlY3Qgb3B0aW9uOiBcIiArIChKU09OLnN0cmluZ2lmeShyZWRpcmVjdCkpKSk7XG4gICAgICByZXR1cm4gX2NyZWF0ZVJvdXRlKG51bGwsIGxvY2F0aW9uKVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFsaWFzIChcbiAgICByZWNvcmQsXG4gICAgbG9jYXRpb24sXG4gICAgbWF0Y2hBc1xuICApIHtcbiAgICB2YXIgYWxpYXNlZFBhdGggPSBmaWxsUGFyYW1zKG1hdGNoQXMsIGxvY2F0aW9uLnBhcmFtcywgKFwiYWxpYXNlZCByb3V0ZSB3aXRoIHBhdGggXFxcIlwiICsgbWF0Y2hBcyArIFwiXFxcIlwiKSk7XG4gICAgdmFyIGFsaWFzZWRNYXRjaCA9IG1hdGNoKHtcbiAgICAgIF9ub3JtYWxpemVkOiB0cnVlLFxuICAgICAgcGF0aDogYWxpYXNlZFBhdGhcbiAgICB9KTtcbiAgICBpZiAoYWxpYXNlZE1hdGNoKSB7XG4gICAgICB2YXIgbWF0Y2hlZCA9IGFsaWFzZWRNYXRjaC5tYXRjaGVkO1xuICAgICAgdmFyIGFsaWFzZWRSZWNvcmQgPSBtYXRjaGVkW21hdGNoZWQubGVuZ3RoIC0gMV07XG4gICAgICBsb2NhdGlvbi5wYXJhbXMgPSBhbGlhc2VkTWF0Y2gucGFyYW1zO1xuICAgICAgcmV0dXJuIF9jcmVhdGVSb3V0ZShhbGlhc2VkUmVjb3JkLCBsb2NhdGlvbilcbiAgICB9XG4gICAgcmV0dXJuIF9jcmVhdGVSb3V0ZShudWxsLCBsb2NhdGlvbilcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jcmVhdGVSb3V0ZSAoXG4gICAgcmVjb3JkLFxuICAgIGxvY2F0aW9uLFxuICAgIHJlZGlyZWN0ZWRGcm9tXG4gICkge1xuICAgIGlmIChyZWNvcmQgJiYgcmVjb3JkLnJlZGlyZWN0KSB7XG4gICAgICByZXR1cm4gcmVkaXJlY3QocmVjb3JkLCByZWRpcmVjdGVkRnJvbSB8fCBsb2NhdGlvbilcbiAgICB9XG4gICAgaWYgKHJlY29yZCAmJiByZWNvcmQubWF0Y2hBcykge1xuICAgICAgcmV0dXJuIGFsaWFzKHJlY29yZCwgbG9jYXRpb24sIHJlY29yZC5tYXRjaEFzKVxuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlUm91dGUocmVjb3JkLCBsb2NhdGlvbiwgcmVkaXJlY3RlZEZyb20pXG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1hdGNoOiBtYXRjaCxcbiAgICBhZGRSb3V0ZXM6IGFkZFJvdXRlc1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hdGNoUm91dGUgKFxuICBwYXRoLFxuICBwYXJhbXMsXG4gIHBhdGhuYW1lXG4pIHtcbiAgdmFyIHJlZiA9IGdldFJvdXRlUmVnZXgocGF0aCk7XG4gIHZhciByZWdleHAgPSByZWYucmVnZXhwO1xuICB2YXIga2V5cyA9IHJlZi5rZXlzO1xuICB2YXIgbSA9IHBhdGhuYW1lLm1hdGNoKHJlZ2V4cCk7XG5cbiAgaWYgKCFtKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH0gZWxzZSBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBmb3IgKHZhciBpID0gMSwgbGVuID0gbS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIHZhciBrZXkgPSBrZXlzW2kgLSAxXTtcbiAgICB2YXIgdmFsID0gdHlwZW9mIG1baV0gPT09ICdzdHJpbmcnID8gZGVjb2RlVVJJQ29tcG9uZW50KG1baV0pIDogbVtpXTtcbiAgICBpZiAoa2V5KSB7IHBhcmFtc1trZXkubmFtZV0gPSB2YWw7IH1cbiAgfVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIHJlc29sdmVSZWNvcmRQYXRoIChwYXRoLCByZWNvcmQpIHtcbiAgcmV0dXJuIHJlc29sdmVQYXRoKHBhdGgsIHJlY29yZC5wYXJlbnQgPyByZWNvcmQucGFyZW50LnBhdGggOiAnLycsIHRydWUpXG59XG5cbi8qICAqL1xuXG5cbnZhciBwb3NpdGlvblN0b3JlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuZnVuY3Rpb24gc2V0dXBTY3JvbGwgKCkge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBmdW5jdGlvbiAoZSkge1xuICAgIHNhdmVTY3JvbGxQb3NpdGlvbigpO1xuICAgIGlmIChlLnN0YXRlICYmIGUuc3RhdGUua2V5KSB7XG4gICAgICBzZXRTdGF0ZUtleShlLnN0YXRlLmtleSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlU2Nyb2xsIChcbiAgcm91dGVyLFxuICB0byxcbiAgZnJvbSxcbiAgaXNQb3Bcbikge1xuICBpZiAoIXJvdXRlci5hcHApIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBiZWhhdmlvciA9IHJvdXRlci5vcHRpb25zLnNjcm9sbEJlaGF2aW9yO1xuICBpZiAoIWJlaGF2aW9yKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGFzc2VydCh0eXBlb2YgYmVoYXZpb3IgPT09ICdmdW5jdGlvbicsIFwic2Nyb2xsQmVoYXZpb3IgbXVzdCBiZSBhIGZ1bmN0aW9uXCIpO1xuICB9XG5cbiAgLy8gd2FpdCB1bnRpbCByZS1yZW5kZXIgZmluaXNoZXMgYmVmb3JlIHNjcm9sbGluZ1xuICByb3V0ZXIuYXBwLiRuZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHBvc2l0aW9uID0gZ2V0U2Nyb2xsUG9zaXRpb24oKTtcbiAgICB2YXIgc2hvdWxkU2Nyb2xsID0gYmVoYXZpb3IodG8sIGZyb20sIGlzUG9wID8gcG9zaXRpb24gOiBudWxsKTtcbiAgICBpZiAoIXNob3VsZFNjcm9sbCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHZhciBpc09iamVjdCA9IHR5cGVvZiBzaG91bGRTY3JvbGwgPT09ICdvYmplY3QnO1xuICAgIGlmIChpc09iamVjdCAmJiB0eXBlb2Ygc2hvdWxkU2Nyb2xsLnNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgdmFyIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzaG91bGRTY3JvbGwuc2VsZWN0b3IpO1xuICAgICAgaWYgKGVsKSB7XG4gICAgICAgIHBvc2l0aW9uID0gZ2V0RWxlbWVudFBvc2l0aW9uKGVsKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNWYWxpZFBvc2l0aW9uKHNob3VsZFNjcm9sbCkpIHtcbiAgICAgICAgcG9zaXRpb24gPSBub3JtYWxpemVQb3NpdGlvbihzaG91bGRTY3JvbGwpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNPYmplY3QgJiYgaXNWYWxpZFBvc2l0aW9uKHNob3VsZFNjcm9sbCkpIHtcbiAgICAgIHBvc2l0aW9uID0gbm9ybWFsaXplUG9zaXRpb24oc2hvdWxkU2Nyb2xsKTtcbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbyhwb3NpdGlvbi54LCBwb3NpdGlvbi55KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzYXZlU2Nyb2xsUG9zaXRpb24gKCkge1xuICB2YXIga2V5ID0gZ2V0U3RhdGVLZXkoKTtcbiAgaWYgKGtleSkge1xuICAgIHBvc2l0aW9uU3RvcmVba2V5XSA9IHtcbiAgICAgIHg6IHdpbmRvdy5wYWdlWE9mZnNldCxcbiAgICAgIHk6IHdpbmRvdy5wYWdlWU9mZnNldFxuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0U2Nyb2xsUG9zaXRpb24gKCkge1xuICB2YXIga2V5ID0gZ2V0U3RhdGVLZXkoKTtcbiAgaWYgKGtleSkge1xuICAgIHJldHVybiBwb3NpdGlvblN0b3JlW2tleV1cbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRFbGVtZW50UG9zaXRpb24gKGVsKSB7XG4gIHZhciBkb2NFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgdmFyIGRvY1JlY3QgPSBkb2NFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIGVsUmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICByZXR1cm4ge1xuICAgIHg6IGVsUmVjdC5sZWZ0IC0gZG9jUmVjdC5sZWZ0LFxuICAgIHk6IGVsUmVjdC50b3AgLSBkb2NSZWN0LnRvcFxuICB9XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRQb3NpdGlvbiAob2JqKSB7XG4gIHJldHVybiBpc051bWJlcihvYmoueCkgfHwgaXNOdW1iZXIob2JqLnkpXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVBvc2l0aW9uIChvYmopIHtcbiAgcmV0dXJuIHtcbiAgICB4OiBpc051bWJlcihvYmoueCkgPyBvYmoueCA6IHdpbmRvdy5wYWdlWE9mZnNldCxcbiAgICB5OiBpc051bWJlcihvYmoueSkgPyBvYmoueSA6IHdpbmRvdy5wYWdlWU9mZnNldFxuICB9XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyICh2KSB7XG4gIHJldHVybiB0eXBlb2YgdiA9PT0gJ251bWJlcidcbn1cblxuLyogICovXG5cbnZhciBzdXBwb3J0c1B1c2hTdGF0ZSA9IGluQnJvd3NlciAmJiAoZnVuY3Rpb24gKCkge1xuICB2YXIgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuICBpZiAoXG4gICAgKHVhLmluZGV4T2YoJ0FuZHJvaWQgMi4nKSAhPT0gLTEgfHwgdWEuaW5kZXhPZignQW5kcm9pZCA0LjAnKSAhPT0gLTEpICYmXG4gICAgdWEuaW5kZXhPZignTW9iaWxlIFNhZmFyaScpICE9PSAtMSAmJlxuICAgIHVhLmluZGV4T2YoJ0Nocm9tZScpID09PSAtMSAmJlxuICAgIHVhLmluZGV4T2YoJ1dpbmRvd3MgUGhvbmUnKSA9PT0gLTFcbiAgKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4gd2luZG93Lmhpc3RvcnkgJiYgJ3B1c2hTdGF0ZScgaW4gd2luZG93Lmhpc3Rvcnlcbn0pKCk7XG5cbi8vIHVzZSBVc2VyIFRpbWluZyBhcGkgKGlmIHByZXNlbnQpIGZvciBtb3JlIGFjY3VyYXRlIGtleSBwcmVjaXNpb25cbnZhciBUaW1lID0gaW5Ccm93c2VyICYmIHdpbmRvdy5wZXJmb3JtYW5jZSAmJiB3aW5kb3cucGVyZm9ybWFuY2Uubm93XG4gID8gd2luZG93LnBlcmZvcm1hbmNlXG4gIDogRGF0ZTtcblxudmFyIF9rZXkgPSBnZW5LZXkoKTtcblxuZnVuY3Rpb24gZ2VuS2V5ICgpIHtcbiAgcmV0dXJuIFRpbWUubm93KCkudG9GaXhlZCgzKVxufVxuXG5mdW5jdGlvbiBnZXRTdGF0ZUtleSAoKSB7XG4gIHJldHVybiBfa2V5XG59XG5cbmZ1bmN0aW9uIHNldFN0YXRlS2V5IChrZXkpIHtcbiAgX2tleSA9IGtleTtcbn1cblxuZnVuY3Rpb24gcHVzaFN0YXRlICh1cmwsIHJlcGxhY2UpIHtcbiAgc2F2ZVNjcm9sbFBvc2l0aW9uKCk7XG4gIC8vIHRyeS4uLmNhdGNoIHRoZSBwdXNoU3RhdGUgY2FsbCB0byBnZXQgYXJvdW5kIFNhZmFyaVxuICAvLyBET00gRXhjZXB0aW9uIDE4IHdoZXJlIGl0IGxpbWl0cyB0byAxMDAgcHVzaFN0YXRlIGNhbGxzXG4gIHZhciBoaXN0b3J5ID0gd2luZG93Lmhpc3Rvcnk7XG4gIHRyeSB7XG4gICAgaWYgKHJlcGxhY2UpIHtcbiAgICAgIGhpc3RvcnkucmVwbGFjZVN0YXRlKHsga2V5OiBfa2V5IH0sICcnLCB1cmwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBfa2V5ID0gZ2VuS2V5KCk7XG4gICAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7IGtleTogX2tleSB9LCAnJywgdXJsKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB3aW5kb3cubG9jYXRpb25bcmVwbGFjZSA/ICdyZXBsYWNlJyA6ICdhc3NpZ24nXSh1cmwpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VTdGF0ZSAodXJsKSB7XG4gIHB1c2hTdGF0ZSh1cmwsIHRydWUpO1xufVxuXG4vKiAgKi9cblxuZnVuY3Rpb24gcnVuUXVldWUgKHF1ZXVlLCBmbiwgY2IpIHtcbiAgdmFyIHN0ZXAgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICBpZiAoaW5kZXggPj0gcXVldWUubGVuZ3RoKSB7XG4gICAgICBjYigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocXVldWVbaW5kZXhdKSB7XG4gICAgICAgIGZuKHF1ZXVlW2luZGV4XSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHN0ZXAoaW5kZXggKyAxKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGVwKGluZGV4ICsgMSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICBzdGVwKDApO1xufVxuXG4vKiAgKi9cblxuXG52YXIgSGlzdG9yeSA9IGZ1bmN0aW9uIEhpc3RvcnkgKHJvdXRlciwgYmFzZSkge1xuICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcbiAgdGhpcy5iYXNlID0gbm9ybWFsaXplQmFzZShiYXNlKTtcbiAgLy8gc3RhcnQgd2l0aCBhIHJvdXRlIG9iamVjdCB0aGF0IHN0YW5kcyBmb3IgXCJub3doZXJlXCJcbiAgdGhpcy5jdXJyZW50ID0gU1RBUlQ7XG4gIHRoaXMucGVuZGluZyA9IG51bGw7XG4gIHRoaXMucmVhZHkgPSBmYWxzZTtcbiAgdGhpcy5yZWFkeUNicyA9IFtdO1xufTtcblxuSGlzdG9yeS5wcm90b3R5cGUubGlzdGVuID0gZnVuY3Rpb24gbGlzdGVuIChjYikge1xuICB0aGlzLmNiID0gY2I7XG59O1xuXG5IaXN0b3J5LnByb3RvdHlwZS5vblJlYWR5ID0gZnVuY3Rpb24gb25SZWFkeSAoY2IpIHtcbiAgaWYgKHRoaXMucmVhZHkpIHtcbiAgICBjYigpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucmVhZHlDYnMucHVzaChjYik7XG4gIH1cbn07XG5cbkhpc3RvcnkucHJvdG90eXBlLnRyYW5zaXRpb25UbyA9IGZ1bmN0aW9uIHRyYW5zaXRpb25UbyAobG9jYXRpb24sIG9uQ29tcGxldGUsIG9uQWJvcnQpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgcm91dGUgPSB0aGlzLnJvdXRlci5tYXRjaChsb2NhdGlvbiwgdGhpcy5jdXJyZW50KTtcbiAgdGhpcy5jb25maXJtVHJhbnNpdGlvbihyb3V0ZSwgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMkMS51cGRhdGVSb3V0ZShyb3V0ZSk7XG4gICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKHJvdXRlKTtcbiAgICB0aGlzJDEuZW5zdXJlVVJMKCk7XG5cbiAgICAvLyBmaXJlIHJlYWR5IGNicyBvbmNlXG4gICAgaWYgKCF0aGlzJDEucmVhZHkpIHtcbiAgICAgIHRoaXMkMS5yZWFkeSA9IHRydWU7XG4gICAgICB0aGlzJDEucmVhZHlDYnMuZm9yRWFjaChmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgY2Iocm91dGUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCBvbkFib3J0KTtcbn07XG5cbkhpc3RvcnkucHJvdG90eXBlLmNvbmZpcm1UcmFuc2l0aW9uID0gZnVuY3Rpb24gY29uZmlybVRyYW5zaXRpb24gKHJvdXRlLCBvbkNvbXBsZXRlLCBvbkFib3J0KSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIGN1cnJlbnQgPSB0aGlzLmN1cnJlbnQ7XG4gIHZhciBhYm9ydCA9IGZ1bmN0aW9uICgpIHsgb25BYm9ydCAmJiBvbkFib3J0KCk7IH07XG4gIGlmIChcbiAgICBpc1NhbWVSb3V0ZShyb3V0ZSwgY3VycmVudCkgJiZcbiAgICAvLyBpbiB0aGUgY2FzZSB0aGUgcm91dGUgbWFwIGhhcyBiZWVuIGR5bmFtaWNhbGx5IGFwcGVuZGVkIHRvXG4gICAgcm91dGUubWF0Y2hlZC5sZW5ndGggPT09IGN1cnJlbnQubWF0Y2hlZC5sZW5ndGhcbiAgKSB7XG4gICAgdGhpcy5lbnN1cmVVUkwoKTtcbiAgICByZXR1cm4gYWJvcnQoKVxuICB9XG5cbiAgdmFyIHJlZiA9IHJlc29sdmVRdWV1ZSh0aGlzLmN1cnJlbnQubWF0Y2hlZCwgcm91dGUubWF0Y2hlZCk7XG4gICAgdmFyIHVwZGF0ZWQgPSByZWYudXBkYXRlZDtcbiAgICB2YXIgZGVhY3RpdmF0ZWQgPSByZWYuZGVhY3RpdmF0ZWQ7XG4gICAgdmFyIGFjdGl2YXRlZCA9IHJlZi5hY3RpdmF0ZWQ7XG5cbiAgdmFyIHF1ZXVlID0gW10uY29uY2F0KFxuICAgIC8vIGluLWNvbXBvbmVudCBsZWF2ZSBndWFyZHNcbiAgICBleHRyYWN0TGVhdmVHdWFyZHMoZGVhY3RpdmF0ZWQpLFxuICAgIC8vIGdsb2JhbCBiZWZvcmUgaG9va3NcbiAgICB0aGlzLnJvdXRlci5iZWZvcmVIb29rcyxcbiAgICAvLyBpbi1jb21wb25lbnQgdXBkYXRlIGhvb2tzXG4gICAgZXh0cmFjdFVwZGF0ZUhvb2tzKHVwZGF0ZWQpLFxuICAgIC8vIGluLWNvbmZpZyBlbnRlciBndWFyZHNcbiAgICBhY3RpdmF0ZWQubWFwKGZ1bmN0aW9uIChtKSB7IHJldHVybiBtLmJlZm9yZUVudGVyOyB9KSxcbiAgICAvLyBhc3luYyBjb21wb25lbnRzXG4gICAgcmVzb2x2ZUFzeW5jQ29tcG9uZW50cyhhY3RpdmF0ZWQpXG4gICk7XG5cbiAgdGhpcy5wZW5kaW5nID0gcm91dGU7XG4gIHZhciBpdGVyYXRvciA9IGZ1bmN0aW9uIChob29rLCBuZXh0KSB7XG4gICAgaWYgKHRoaXMkMS5wZW5kaW5nICE9PSByb3V0ZSkge1xuICAgICAgcmV0dXJuIGFib3J0KClcbiAgICB9XG4gICAgaG9vayhyb3V0ZSwgY3VycmVudCwgZnVuY3Rpb24gKHRvKSB7XG4gICAgICBpZiAodG8gPT09IGZhbHNlKSB7XG4gICAgICAgIC8vIG5leHQoZmFsc2UpIC0+IGFib3J0IG5hdmlnYXRpb24sIGVuc3VyZSBjdXJyZW50IFVSTFxuICAgICAgICB0aGlzJDEuZW5zdXJlVVJMKHRydWUpO1xuICAgICAgICBhYm9ydCgpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdG8gPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0byA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gbmV4dCgnLycpIG9yIG5leHQoeyBwYXRoOiAnLycgfSkgLT4gcmVkaXJlY3RcbiAgICAgICAgKHR5cGVvZiB0byA9PT0gJ29iamVjdCcgJiYgdG8ucmVwbGFjZSkgPyB0aGlzJDEucmVwbGFjZSh0bykgOiB0aGlzJDEucHVzaCh0byk7XG4gICAgICAgIGFib3J0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjb25maXJtIHRyYW5zaXRpb24gYW5kIHBhc3Mgb24gdGhlIHZhbHVlXG4gICAgICAgIG5leHQodG8pO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHJ1blF1ZXVlKHF1ZXVlLCBpdGVyYXRvciwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBwb3N0RW50ZXJDYnMgPSBbXTtcbiAgICB2YXIgaXNWYWxpZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMkMS5jdXJyZW50ID09PSByb3V0ZTsgfTtcbiAgICB2YXIgZW50ZXJHdWFyZHMgPSBleHRyYWN0RW50ZXJHdWFyZHMoYWN0aXZhdGVkLCBwb3N0RW50ZXJDYnMsIGlzVmFsaWQpO1xuICAgIC8vIHdhaXQgdW50aWwgYXN5bmMgY29tcG9uZW50cyBhcmUgcmVzb2x2ZWQgYmVmb3JlXG4gICAgLy8gZXh0cmFjdGluZyBpbi1jb21wb25lbnQgZW50ZXIgZ3VhcmRzXG4gICAgcnVuUXVldWUoZW50ZXJHdWFyZHMsIGl0ZXJhdG9yLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcyQxLnBlbmRpbmcgIT09IHJvdXRlKSB7XG4gICAgICAgIHJldHVybiBhYm9ydCgpXG4gICAgICB9XG4gICAgICB0aGlzJDEucGVuZGluZyA9IG51bGw7XG4gICAgICBvbkNvbXBsZXRlKHJvdXRlKTtcbiAgICAgIGlmICh0aGlzJDEucm91dGVyLmFwcCkge1xuICAgICAgICB0aGlzJDEucm91dGVyLmFwcC4kbmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHBvc3RFbnRlckNicy5mb3JFYWNoKGZ1bmN0aW9uIChjYikgeyByZXR1cm4gY2IoKTsgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn07XG5cbkhpc3RvcnkucHJvdG90eXBlLnVwZGF0ZVJvdXRlID0gZnVuY3Rpb24gdXBkYXRlUm91dGUgKHJvdXRlKSB7XG4gIHZhciBwcmV2ID0gdGhpcy5jdXJyZW50O1xuICB0aGlzLmN1cnJlbnQgPSByb3V0ZTtcbiAgdGhpcy5jYiAmJiB0aGlzLmNiKHJvdXRlKTtcbiAgdGhpcy5yb3V0ZXIuYWZ0ZXJIb29rcy5mb3JFYWNoKGZ1bmN0aW9uIChob29rKSB7XG4gICAgaG9vayAmJiBob29rKHJvdXRlLCBwcmV2KTtcbiAgfSk7XG59O1xuXG5mdW5jdGlvbiBub3JtYWxpemVCYXNlIChiYXNlKSB7XG4gIGlmICghYmFzZSkge1xuICAgIGlmIChpbkJyb3dzZXIpIHtcbiAgICAgIC8vIHJlc3BlY3QgPGJhc2U+IHRhZ1xuICAgICAgdmFyIGJhc2VFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Jhc2UnKTtcbiAgICAgIGJhc2UgPSAoYmFzZUVsICYmIGJhc2VFbC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSkgfHwgJy8nO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYXNlID0gJy8nO1xuICAgIH1cbiAgfVxuICAvLyBtYWtlIHN1cmUgdGhlcmUncyB0aGUgc3RhcnRpbmcgc2xhc2hcbiAgaWYgKGJhc2UuY2hhckF0KDApICE9PSAnLycpIHtcbiAgICBiYXNlID0gJy8nICsgYmFzZTtcbiAgfVxuICAvLyByZW1vdmUgdHJhaWxpbmcgc2xhc2hcbiAgcmV0dXJuIGJhc2UucmVwbGFjZSgvXFwvJC8sICcnKVxufVxuXG5mdW5jdGlvbiByZXNvbHZlUXVldWUgKFxuICBjdXJyZW50LFxuICBuZXh0XG4pIHtcbiAgdmFyIGk7XG4gIHZhciBtYXggPSBNYXRoLm1heChjdXJyZW50Lmxlbmd0aCwgbmV4dC5sZW5ndGgpO1xuICBmb3IgKGkgPSAwOyBpIDwgbWF4OyBpKyspIHtcbiAgICBpZiAoY3VycmVudFtpXSAhPT0gbmV4dFtpXSkge1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtcbiAgICB1cGRhdGVkOiBuZXh0LnNsaWNlKDAsIGkpLFxuICAgIGFjdGl2YXRlZDogbmV4dC5zbGljZShpKSxcbiAgICBkZWFjdGl2YXRlZDogY3VycmVudC5zbGljZShpKVxuICB9XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RHdWFyZHMgKFxuICByZWNvcmRzLFxuICBuYW1lLFxuICBiaW5kLFxuICByZXZlcnNlXG4pIHtcbiAgdmFyIGd1YXJkcyA9IGZsYXRNYXBDb21wb25lbnRzKHJlY29yZHMsIGZ1bmN0aW9uIChkZWYsIGluc3RhbmNlLCBtYXRjaCwga2V5KSB7XG4gICAgdmFyIGd1YXJkID0gZXh0cmFjdEd1YXJkKGRlZiwgbmFtZSk7XG4gICAgaWYgKGd1YXJkKSB7XG4gICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShndWFyZClcbiAgICAgICAgPyBndWFyZC5tYXAoZnVuY3Rpb24gKGd1YXJkKSB7IHJldHVybiBiaW5kKGd1YXJkLCBpbnN0YW5jZSwgbWF0Y2gsIGtleSk7IH0pXG4gICAgICAgIDogYmluZChndWFyZCwgaW5zdGFuY2UsIG1hdGNoLCBrZXkpXG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGZsYXR0ZW4ocmV2ZXJzZSA/IGd1YXJkcy5yZXZlcnNlKCkgOiBndWFyZHMpXG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RHdWFyZCAoXG4gIGRlZixcbiAga2V5XG4pIHtcbiAgaWYgKHR5cGVvZiBkZWYgIT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBleHRlbmQgbm93IHNvIHRoYXQgZ2xvYmFsIG1peGlucyBhcmUgYXBwbGllZC5cbiAgICBkZWYgPSBfVnVlLmV4dGVuZChkZWYpO1xuICB9XG4gIHJldHVybiBkZWYub3B0aW9uc1trZXldXG59XG5cbmZ1bmN0aW9uIGV4dHJhY3RMZWF2ZUd1YXJkcyAoZGVhY3RpdmF0ZWQpIHtcbiAgcmV0dXJuIGV4dHJhY3RHdWFyZHMoZGVhY3RpdmF0ZWQsICdiZWZvcmVSb3V0ZUxlYXZlJywgYmluZEd1YXJkLCB0cnVlKVxufVxuXG5mdW5jdGlvbiBleHRyYWN0VXBkYXRlSG9va3MgKHVwZGF0ZWQpIHtcbiAgcmV0dXJuIGV4dHJhY3RHdWFyZHModXBkYXRlZCwgJ2JlZm9yZVJvdXRlVXBkYXRlJywgYmluZEd1YXJkKVxufVxuXG5mdW5jdGlvbiBiaW5kR3VhcmQgKGd1YXJkLCBpbnN0YW5jZSkge1xuICByZXR1cm4gZnVuY3Rpb24gYm91bmRSb3V0ZUd1YXJkICgpIHtcbiAgICByZXR1cm4gZ3VhcmQuYXBwbHkoaW5zdGFuY2UsIGFyZ3VtZW50cylcbiAgfVxufVxuXG5mdW5jdGlvbiBleHRyYWN0RW50ZXJHdWFyZHMgKFxuICBhY3RpdmF0ZWQsXG4gIGNicyxcbiAgaXNWYWxpZFxuKSB7XG4gIHJldHVybiBleHRyYWN0R3VhcmRzKGFjdGl2YXRlZCwgJ2JlZm9yZVJvdXRlRW50ZXInLCBmdW5jdGlvbiAoZ3VhcmQsIF8sIG1hdGNoLCBrZXkpIHtcbiAgICByZXR1cm4gYmluZEVudGVyR3VhcmQoZ3VhcmQsIG1hdGNoLCBrZXksIGNicywgaXNWYWxpZClcbiAgfSlcbn1cblxuZnVuY3Rpb24gYmluZEVudGVyR3VhcmQgKFxuICBndWFyZCxcbiAgbWF0Y2gsXG4gIGtleSxcbiAgY2JzLFxuICBpc1ZhbGlkXG4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHJvdXRlRW50ZXJHdWFyZCAodG8sIGZyb20sIG5leHQpIHtcbiAgICByZXR1cm4gZ3VhcmQodG8sIGZyb20sIGZ1bmN0aW9uIChjYikge1xuICAgICAgbmV4dChjYik7XG4gICAgICBpZiAodHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGNicy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyAjNzUwXG4gICAgICAgICAgLy8gaWYgYSByb3V0ZXItdmlldyBpcyB3cmFwcGVkIHdpdGggYW4gb3V0LWluIHRyYW5zaXRpb24sXG4gICAgICAgICAgLy8gdGhlIGluc3RhbmNlIG1heSBub3QgaGF2ZSBiZWVuIHJlZ2lzdGVyZWQgYXQgdGhpcyB0aW1lLlxuICAgICAgICAgIC8vIHdlIHdpbGwgbmVlZCB0byBwb2xsIGZvciByZWdpc3RyYXRpb24gdW50aWwgY3VycmVudCByb3V0ZVxuICAgICAgICAgIC8vIGlzIG5vIGxvbmdlciB2YWxpZC5cbiAgICAgICAgICBwb2xsKGNiLCBtYXRjaC5pbnN0YW5jZXMsIGtleSwgaXNWYWxpZCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gcG9sbCAoXG4gIGNiLCAvLyBzb21laG93IGZsb3cgY2Fubm90IGluZmVyIHRoaXMgaXMgYSBmdW5jdGlvblxuICBpbnN0YW5jZXMsXG4gIGtleSxcbiAgaXNWYWxpZFxuKSB7XG4gIGlmIChpbnN0YW5jZXNba2V5XSkge1xuICAgIGNiKGluc3RhbmNlc1trZXldKTtcbiAgfSBlbHNlIGlmIChpc1ZhbGlkKCkpIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHBvbGwoY2IsIGluc3RhbmNlcywga2V5LCBpc1ZhbGlkKTtcbiAgICB9LCAxNik7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzb2x2ZUFzeW5jQ29tcG9uZW50cyAobWF0Y2hlZCkge1xuICByZXR1cm4gZmxhdE1hcENvbXBvbmVudHMobWF0Y2hlZCwgZnVuY3Rpb24gKGRlZiwgXywgbWF0Y2gsIGtleSkge1xuICAgIC8vIGlmIGl0J3MgYSBmdW5jdGlvbiBhbmQgZG9lc24ndCBoYXZlIFZ1ZSBvcHRpb25zIGF0dGFjaGVkLFxuICAgIC8vIGFzc3VtZSBpdCdzIGFuIGFzeW5jIGNvbXBvbmVudCByZXNvbHZlIGZ1bmN0aW9uLlxuICAgIC8vIHdlIGFyZSBub3QgdXNpbmcgVnVlJ3MgZGVmYXVsdCBhc3luYyByZXNvbHZpbmcgbWVjaGFuaXNtIGJlY2F1c2VcbiAgICAvLyB3ZSB3YW50IHRvIGhhbHQgdGhlIG5hdmlnYXRpb24gdW50aWwgdGhlIGluY29taW5nIGNvbXBvbmVudCBoYXMgYmVlblxuICAgIC8vIHJlc29sdmVkLlxuICAgIGlmICh0eXBlb2YgZGVmID09PSAnZnVuY3Rpb24nICYmICFkZWYub3B0aW9ucykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0bywgZnJvbSwgbmV4dCkge1xuICAgICAgICB2YXIgcmVzb2x2ZSA9IG9uY2UoZnVuY3Rpb24gKHJlc29sdmVkRGVmKSB7XG4gICAgICAgICAgbWF0Y2guY29tcG9uZW50c1trZXldID0gcmVzb2x2ZWREZWY7XG4gICAgICAgICAgbmV4dCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgcmVqZWN0ID0gb25jZShmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgICAgd2FybihmYWxzZSwgKFwiRmFpbGVkIHRvIHJlc29sdmUgYXN5bmMgY29tcG9uZW50IFwiICsga2V5ICsgXCI6IFwiICsgcmVhc29uKSk7XG4gICAgICAgICAgbmV4dChmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciByZXMgPSBkZWYocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgaWYgKHJlcyAmJiB0eXBlb2YgcmVzLnRoZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXMudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBmbGF0TWFwQ29tcG9uZW50cyAoXG4gIG1hdGNoZWQsXG4gIGZuXG4pIHtcbiAgcmV0dXJuIGZsYXR0ZW4obWF0Y2hlZC5tYXAoZnVuY3Rpb24gKG0pIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMobS5jb21wb25lbnRzKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gZm4oXG4gICAgICBtLmNvbXBvbmVudHNba2V5XSxcbiAgICAgIG0uaW5zdGFuY2VzW2tleV0sXG4gICAgICBtLCBrZXlcbiAgICApOyB9KVxuICB9KSlcbn1cblxuZnVuY3Rpb24gZmxhdHRlbiAoYXJyKSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLCBhcnIpXG59XG5cbi8vIGluIFdlYnBhY2sgMiwgcmVxdWlyZS5lbnN1cmUgbm93IGFsc28gcmV0dXJucyBhIFByb21pc2Vcbi8vIHNvIHRoZSByZXNvbHZlL3JlamVjdCBmdW5jdGlvbnMgbWF5IGdldCBjYWxsZWQgYW4gZXh0cmEgdGltZVxuLy8gaWYgdGhlIHVzZXIgdXNlcyBhbiBhcnJvdyBmdW5jdGlvbiBzaG9ydGhhbmQgdGhhdCBoYXBwZW5zIHRvXG4vLyByZXR1cm4gdGhhdCBQcm9taXNlLlxuZnVuY3Rpb24gb25jZSAoZm4pIHtcbiAgdmFyIGNhbGxlZCA9IGZhbHNlO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmIChjYWxsZWQpIHsgcmV0dXJuIH1cbiAgICBjYWxsZWQgPSB0cnVlO1xuICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gIH1cbn1cblxuLyogICovXG5cblxudmFyIEhUTUw1SGlzdG9yeSA9IChmdW5jdGlvbiAoSGlzdG9yeSQkMSkge1xuICBmdW5jdGlvbiBIVE1MNUhpc3RvcnkgKHJvdXRlciwgYmFzZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgSGlzdG9yeSQkMS5jYWxsKHRoaXMsIHJvdXRlciwgYmFzZSk7XG5cbiAgICB2YXIgZXhwZWN0U2Nyb2xsID0gcm91dGVyLm9wdGlvbnMuc2Nyb2xsQmVoYXZpb3I7XG5cbiAgICBpZiAoZXhwZWN0U2Nyb2xsKSB7XG4gICAgICBzZXR1cFNjcm9sbCgpO1xuICAgIH1cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICB0aGlzJDEudHJhbnNpdGlvblRvKGdldExvY2F0aW9uKHRoaXMkMS5iYXNlKSwgZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICAgIGlmIChleHBlY3RTY3JvbGwpIHtcbiAgICAgICAgICBoYW5kbGVTY3JvbGwocm91dGVyLCByb3V0ZSwgdGhpcyQxLmN1cnJlbnQsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGlmICggSGlzdG9yeSQkMSApIEhUTUw1SGlzdG9yeS5fX3Byb3RvX18gPSBIaXN0b3J5JCQxO1xuICBIVE1MNUhpc3RvcnkucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggSGlzdG9yeSQkMSAmJiBIaXN0b3J5JCQxLnByb3RvdHlwZSApO1xuICBIVE1MNUhpc3RvcnkucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gSFRNTDVIaXN0b3J5O1xuXG4gIEhUTUw1SGlzdG9yeS5wcm90b3R5cGUuZ28gPSBmdW5jdGlvbiBnbyAobikge1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKG4pO1xuICB9O1xuXG4gIEhUTUw1SGlzdG9yeS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2ggKGxvY2F0aW9uLCBvbkNvbXBsZXRlLCBvbkFib3J0KSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB0aGlzLnRyYW5zaXRpb25Ubyhsb2NhdGlvbiwgZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgICBwdXNoU3RhdGUoY2xlYW5QYXRoKHRoaXMkMS5iYXNlICsgcm91dGUuZnVsbFBhdGgpKTtcbiAgICAgIGhhbmRsZVNjcm9sbCh0aGlzJDEucm91dGVyLCByb3V0ZSwgdGhpcyQxLmN1cnJlbnQsIGZhbHNlKTtcbiAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShyb3V0ZSk7XG4gICAgfSwgb25BYm9ydCk7XG4gIH07XG5cbiAgSFRNTDVIaXN0b3J5LnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24gcmVwbGFjZSAobG9jYXRpb24sIG9uQ29tcGxldGUsIG9uQWJvcnQpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHRoaXMudHJhbnNpdGlvblRvKGxvY2F0aW9uLCBmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgIHJlcGxhY2VTdGF0ZShjbGVhblBhdGgodGhpcyQxLmJhc2UgKyByb3V0ZS5mdWxsUGF0aCkpO1xuICAgICAgaGFuZGxlU2Nyb2xsKHRoaXMkMS5yb3V0ZXIsIHJvdXRlLCB0aGlzJDEuY3VycmVudCwgZmFsc2UpO1xuICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKHJvdXRlKTtcbiAgICB9LCBvbkFib3J0KTtcbiAgfTtcblxuICBIVE1MNUhpc3RvcnkucHJvdG90eXBlLmVuc3VyZVVSTCA9IGZ1bmN0aW9uIGVuc3VyZVVSTCAocHVzaCkge1xuICAgIGlmIChnZXRMb2NhdGlvbih0aGlzLmJhc2UpICE9PSB0aGlzLmN1cnJlbnQuZnVsbFBhdGgpIHtcbiAgICAgIHZhciBjdXJyZW50ID0gY2xlYW5QYXRoKHRoaXMuYmFzZSArIHRoaXMuY3VycmVudC5mdWxsUGF0aCk7XG4gICAgICBwdXNoID8gcHVzaFN0YXRlKGN1cnJlbnQpIDogcmVwbGFjZVN0YXRlKGN1cnJlbnQpO1xuICAgIH1cbiAgfTtcblxuICBIVE1MNUhpc3RvcnkucHJvdG90eXBlLmdldEN1cnJlbnRMb2NhdGlvbiA9IGZ1bmN0aW9uIGdldEN1cnJlbnRMb2NhdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdldExvY2F0aW9uKHRoaXMuYmFzZSlcbiAgfTtcblxuICByZXR1cm4gSFRNTDVIaXN0b3J5O1xufShIaXN0b3J5KSk7XG5cbmZ1bmN0aW9uIGdldExvY2F0aW9uIChiYXNlKSB7XG4gIHZhciBwYXRoID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICBpZiAoYmFzZSAmJiBwYXRoLmluZGV4T2YoYmFzZSkgPT09IDApIHtcbiAgICBwYXRoID0gcGF0aC5zbGljZShiYXNlLmxlbmd0aCk7XG4gIH1cbiAgcmV0dXJuIChwYXRoIHx8ICcvJykgKyB3aW5kb3cubG9jYXRpb24uc2VhcmNoICsgd2luZG93LmxvY2F0aW9uLmhhc2hcbn1cblxuLyogICovXG5cblxudmFyIEhhc2hIaXN0b3J5ID0gKGZ1bmN0aW9uIChIaXN0b3J5JCQxKSB7XG4gIGZ1bmN0aW9uIEhhc2hIaXN0b3J5IChyb3V0ZXIsIGJhc2UsIGZhbGxiYWNrKSB7XG4gICAgSGlzdG9yeSQkMS5jYWxsKHRoaXMsIHJvdXRlciwgYmFzZSk7XG4gICAgLy8gY2hlY2sgaGlzdG9yeSBmYWxsYmFjayBkZWVwbGlua2luZ1xuICAgIGlmIChmYWxsYmFjayAmJiBjaGVja0ZhbGxiYWNrKHRoaXMuYmFzZSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBlbnN1cmVTbGFzaCgpO1xuICB9XG5cbiAgaWYgKCBIaXN0b3J5JCQxICkgSGFzaEhpc3RvcnkuX19wcm90b19fID0gSGlzdG9yeSQkMTtcbiAgSGFzaEhpc3RvcnkucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggSGlzdG9yeSQkMSAmJiBIaXN0b3J5JCQxLnByb3RvdHlwZSApO1xuICBIYXNoSGlzdG9yeS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBIYXNoSGlzdG9yeTtcblxuICAvLyB0aGlzIGlzIGRlbGF5ZWQgdW50aWwgdGhlIGFwcCBtb3VudHNcbiAgLy8gdG8gYXZvaWQgdGhlIGhhc2hjaGFuZ2UgbGlzdGVuZXIgYmVpbmcgZmlyZWQgdG9vIGVhcmx5XG4gIEhhc2hIaXN0b3J5LnByb3RvdHlwZS5zZXR1cExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldHVwTGlzdGVuZXJzICgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFlbnN1cmVTbGFzaCgpKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgdGhpcyQxLnRyYW5zaXRpb25UbyhnZXRIYXNoKCksIGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgICAgICByZXBsYWNlSGFzaChyb3V0ZS5mdWxsUGF0aCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICBIYXNoSGlzdG9yeS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIHB1c2ggKGxvY2F0aW9uLCBvbkNvbXBsZXRlLCBvbkFib3J0KSB7XG4gICAgdGhpcy50cmFuc2l0aW9uVG8obG9jYXRpb24sIGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgICAgcHVzaEhhc2gocm91dGUuZnVsbFBhdGgpO1xuICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKHJvdXRlKTtcbiAgICB9LCBvbkFib3J0KTtcbiAgfTtcblxuICBIYXNoSGlzdG9yeS5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIHJlcGxhY2UgKGxvY2F0aW9uLCBvbkNvbXBsZXRlLCBvbkFib3J0KSB7XG4gICAgdGhpcy50cmFuc2l0aW9uVG8obG9jYXRpb24sIGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgICAgcmVwbGFjZUhhc2gocm91dGUuZnVsbFBhdGgpO1xuICAgICAgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKHJvdXRlKTtcbiAgICB9LCBvbkFib3J0KTtcbiAgfTtcblxuICBIYXNoSGlzdG9yeS5wcm90b3R5cGUuZ28gPSBmdW5jdGlvbiBnbyAobikge1xuICAgIHdpbmRvdy5oaXN0b3J5LmdvKG4pO1xuICB9O1xuXG4gIEhhc2hIaXN0b3J5LnByb3RvdHlwZS5lbnN1cmVVUkwgPSBmdW5jdGlvbiBlbnN1cmVVUkwgKHB1c2gpIHtcbiAgICB2YXIgY3VycmVudCA9IHRoaXMuY3VycmVudC5mdWxsUGF0aDtcbiAgICBpZiAoZ2V0SGFzaCgpICE9PSBjdXJyZW50KSB7XG4gICAgICBwdXNoID8gcHVzaEhhc2goY3VycmVudCkgOiByZXBsYWNlSGFzaChjdXJyZW50KTtcbiAgICB9XG4gIH07XG5cbiAgSGFzaEhpc3RvcnkucHJvdG90eXBlLmdldEN1cnJlbnRMb2NhdGlvbiA9IGZ1bmN0aW9uIGdldEN1cnJlbnRMb2NhdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdldEhhc2goKVxuICB9O1xuXG4gIHJldHVybiBIYXNoSGlzdG9yeTtcbn0oSGlzdG9yeSkpO1xuXG5mdW5jdGlvbiBjaGVja0ZhbGxiYWNrIChiYXNlKSB7XG4gIHZhciBsb2NhdGlvbiA9IGdldExvY2F0aW9uKGJhc2UpO1xuICBpZiAoIS9eXFwvIy8udGVzdChsb2NhdGlvbikpIHtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShcbiAgICAgIGNsZWFuUGF0aChiYXNlICsgJy8jJyArIGxvY2F0aW9uKVxuICAgICk7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxufVxuXG5mdW5jdGlvbiBlbnN1cmVTbGFzaCAoKSB7XG4gIHZhciBwYXRoID0gZ2V0SGFzaCgpO1xuICBpZiAocGF0aC5jaGFyQXQoMCkgPT09ICcvJykge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgcmVwbGFjZUhhc2goJy8nICsgcGF0aCk7XG4gIHJldHVybiBmYWxzZVxufVxuXG5mdW5jdGlvbiBnZXRIYXNoICgpIHtcbiAgLy8gV2UgY2FuJ3QgdXNlIHdpbmRvdy5sb2NhdGlvbi5oYXNoIGhlcmUgYmVjYXVzZSBpdCdzIG5vdFxuICAvLyBjb25zaXN0ZW50IGFjcm9zcyBicm93c2VycyAtIEZpcmVmb3ggd2lsbCBwcmUtZGVjb2RlIGl0IVxuICB2YXIgaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICB2YXIgaW5kZXggPSBocmVmLmluZGV4T2YoJyMnKTtcbiAgcmV0dXJuIGluZGV4ID09PSAtMSA/ICcnIDogaHJlZi5zbGljZShpbmRleCArIDEpXG59XG5cbmZ1bmN0aW9uIHB1c2hIYXNoIChwYXRoKSB7XG4gIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gcGF0aDtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZUhhc2ggKHBhdGgpIHtcbiAgdmFyIGkgPSB3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCcjJyk7XG4gIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKFxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNsaWNlKDAsIGkgPj0gMCA/IGkgOiAwKSArICcjJyArIHBhdGhcbiAgKTtcbn1cblxuLyogICovXG5cblxudmFyIEFic3RyYWN0SGlzdG9yeSA9IChmdW5jdGlvbiAoSGlzdG9yeSQkMSkge1xuICBmdW5jdGlvbiBBYnN0cmFjdEhpc3RvcnkgKHJvdXRlciwgYmFzZSkge1xuICAgIEhpc3RvcnkkJDEuY2FsbCh0aGlzLCByb3V0ZXIsIGJhc2UpO1xuICAgIHRoaXMuc3RhY2sgPSBbXTtcbiAgICB0aGlzLmluZGV4ID0gLTE7XG4gIH1cblxuICBpZiAoIEhpc3RvcnkkJDEgKSBBYnN0cmFjdEhpc3RvcnkuX19wcm90b19fID0gSGlzdG9yeSQkMTtcbiAgQWJzdHJhY3RIaXN0b3J5LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEhpc3RvcnkkJDEgJiYgSGlzdG9yeSQkMS5wcm90b3R5cGUgKTtcbiAgQWJzdHJhY3RIaXN0b3J5LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEFic3RyYWN0SGlzdG9yeTtcblxuICBBYnN0cmFjdEhpc3RvcnkucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiBwdXNoIChsb2NhdGlvbiwgb25Db21wbGV0ZSwgb25BYm9ydCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdGhpcy50cmFuc2l0aW9uVG8obG9jYXRpb24sIGZ1bmN0aW9uIChyb3V0ZSkge1xuICAgICAgdGhpcyQxLnN0YWNrID0gdGhpcyQxLnN0YWNrLnNsaWNlKDAsIHRoaXMkMS5pbmRleCArIDEpLmNvbmNhdChyb3V0ZSk7XG4gICAgICB0aGlzJDEuaW5kZXgrKztcbiAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZShyb3V0ZSk7XG4gICAgfSwgb25BYm9ydCk7XG4gIH07XG5cbiAgQWJzdHJhY3RIaXN0b3J5LnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24gcmVwbGFjZSAobG9jYXRpb24sIG9uQ29tcGxldGUsIG9uQWJvcnQpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHRoaXMudHJhbnNpdGlvblRvKGxvY2F0aW9uLCBmdW5jdGlvbiAocm91dGUpIHtcbiAgICAgIHRoaXMkMS5zdGFjayA9IHRoaXMkMS5zdGFjay5zbGljZSgwLCB0aGlzJDEuaW5kZXgpLmNvbmNhdChyb3V0ZSk7XG4gICAgICBvbkNvbXBsZXRlICYmIG9uQ29tcGxldGUocm91dGUpO1xuICAgIH0sIG9uQWJvcnQpO1xuICB9O1xuXG4gIEFic3RyYWN0SGlzdG9yeS5wcm90b3R5cGUuZ28gPSBmdW5jdGlvbiBnbyAobikge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIHRhcmdldEluZGV4ID0gdGhpcy5pbmRleCArIG47XG4gICAgaWYgKHRhcmdldEluZGV4IDwgMCB8fCB0YXJnZXRJbmRleCA+PSB0aGlzLnN0YWNrLmxlbmd0aCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHZhciByb3V0ZSA9IHRoaXMuc3RhY2tbdGFyZ2V0SW5kZXhdO1xuICAgIHRoaXMuY29uZmlybVRyYW5zaXRpb24ocm91dGUsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMkMS5pbmRleCA9IHRhcmdldEluZGV4O1xuICAgICAgdGhpcyQxLnVwZGF0ZVJvdXRlKHJvdXRlKTtcbiAgICB9KTtcbiAgfTtcblxuICBBYnN0cmFjdEhpc3RvcnkucHJvdG90eXBlLmdldEN1cnJlbnRMb2NhdGlvbiA9IGZ1bmN0aW9uIGdldEN1cnJlbnRMb2NhdGlvbiAoKSB7XG4gICAgdmFyIGN1cnJlbnQgPSB0aGlzLnN0YWNrW3RoaXMuc3RhY2subGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIGN1cnJlbnQgPyBjdXJyZW50LmZ1bGxQYXRoIDogJy8nXG4gIH07XG5cbiAgQWJzdHJhY3RIaXN0b3J5LnByb3RvdHlwZS5lbnN1cmVVUkwgPSBmdW5jdGlvbiBlbnN1cmVVUkwgKCkge1xuICAgIC8vIG5vb3BcbiAgfTtcblxuICByZXR1cm4gQWJzdHJhY3RIaXN0b3J5O1xufShIaXN0b3J5KSk7XG5cbi8qICAqL1xuXG52YXIgVnVlUm91dGVyID0gZnVuY3Rpb24gVnVlUm91dGVyIChvcHRpb25zKSB7XG4gIGlmICggb3B0aW9ucyA9PT0gdm9pZCAwICkgb3B0aW9ucyA9IHt9O1xuXG4gIHRoaXMuYXBwID0gbnVsbDtcbiAgdGhpcy5hcHBzID0gW107XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIHRoaXMuYmVmb3JlSG9va3MgPSBbXTtcbiAgdGhpcy5hZnRlckhvb2tzID0gW107XG4gIHRoaXMubWF0Y2hlciA9IGNyZWF0ZU1hdGNoZXIob3B0aW9ucy5yb3V0ZXMgfHwgW10pO1xuXG4gIHZhciBtb2RlID0gb3B0aW9ucy5tb2RlIHx8ICdoYXNoJztcbiAgdGhpcy5mYWxsYmFjayA9IG1vZGUgPT09ICdoaXN0b3J5JyAmJiAhc3VwcG9ydHNQdXNoU3RhdGU7XG4gIGlmICh0aGlzLmZhbGxiYWNrKSB7XG4gICAgbW9kZSA9ICdoYXNoJztcbiAgfVxuICBpZiAoIWluQnJvd3Nlcikge1xuICAgIG1vZGUgPSAnYWJzdHJhY3QnO1xuICB9XG4gIHRoaXMubW9kZSA9IG1vZGU7XG5cbiAgc3dpdGNoIChtb2RlKSB7XG4gICAgY2FzZSAnaGlzdG9yeSc6XG4gICAgICB0aGlzLmhpc3RvcnkgPSBuZXcgSFRNTDVIaXN0b3J5KHRoaXMsIG9wdGlvbnMuYmFzZSk7XG4gICAgICBicmVha1xuICAgIGNhc2UgJ2hhc2gnOlxuICAgICAgdGhpcy5oaXN0b3J5ID0gbmV3IEhhc2hIaXN0b3J5KHRoaXMsIG9wdGlvbnMuYmFzZSwgdGhpcy5mYWxsYmFjayk7XG4gICAgICBicmVha1xuICAgIGNhc2UgJ2Fic3RyYWN0JzpcbiAgICAgIHRoaXMuaGlzdG9yeSA9IG5ldyBBYnN0cmFjdEhpc3RvcnkodGhpcywgb3B0aW9ucy5iYXNlKTtcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGFzc2VydChmYWxzZSwgKFwiaW52YWxpZCBtb2RlOiBcIiArIG1vZGUpKTtcbiAgICAgIH1cbiAgfVxufTtcblxudmFyIHByb3RvdHlwZUFjY2Vzc29ycyA9IHsgY3VycmVudFJvdXRlOiB7fSB9O1xuXG5WdWVSb3V0ZXIucHJvdG90eXBlLm1hdGNoID0gZnVuY3Rpb24gbWF0Y2ggKFxuICByYXcsXG4gIGN1cnJlbnQsXG4gIHJlZGlyZWN0ZWRGcm9tXG4pIHtcbiAgcmV0dXJuIHRoaXMubWF0Y2hlci5tYXRjaChyYXcsIGN1cnJlbnQsIHJlZGlyZWN0ZWRGcm9tKVxufTtcblxucHJvdG90eXBlQWNjZXNzb3JzLmN1cnJlbnRSb3V0ZS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmhpc3RvcnkgJiYgdGhpcy5oaXN0b3J5LmN1cnJlbnRcbn07XG5cblZ1ZVJvdXRlci5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIGluaXQgKGFwcCAvKiBWdWUgY29tcG9uZW50IGluc3RhbmNlICovKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyAmJiBhc3NlcnQoXG4gICAgaW5zdGFsbC5pbnN0YWxsZWQsXG4gICAgXCJub3QgaW5zdGFsbGVkLiBNYWtlIHN1cmUgdG8gY2FsbCBgVnVlLnVzZShWdWVSb3V0ZXIpYCBcIiArXG4gICAgXCJiZWZvcmUgY3JlYXRpbmcgcm9vdCBpbnN0YW5jZS5cIlxuICApO1xuXG4gIHRoaXMuYXBwcy5wdXNoKGFwcCk7XG5cbiAgLy8gbWFpbiBhcHAgYWxyZWFkeSBpbml0aWFsaXplZC5cbiAgaWYgKHRoaXMuYXBwKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB0aGlzLmFwcCA9IGFwcDtcblxuICB2YXIgaGlzdG9yeSA9IHRoaXMuaGlzdG9yeTtcblxuICBpZiAoaGlzdG9yeSBpbnN0YW5jZW9mIEhUTUw1SGlzdG9yeSkge1xuICAgIGhpc3RvcnkudHJhbnNpdGlvblRvKGhpc3RvcnkuZ2V0Q3VycmVudExvY2F0aW9uKCkpO1xuICB9IGVsc2UgaWYgKGhpc3RvcnkgaW5zdGFuY2VvZiBIYXNoSGlzdG9yeSkge1xuICAgIHZhciBzZXR1cEhhc2hMaXN0ZW5lciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGhpc3Rvcnkuc2V0dXBMaXN0ZW5lcnMoKTtcbiAgICB9O1xuICAgIGhpc3RvcnkudHJhbnNpdGlvblRvKFxuICAgICAgaGlzdG9yeS5nZXRDdXJyZW50TG9jYXRpb24oKSxcbiAgICAgIHNldHVwSGFzaExpc3RlbmVyLFxuICAgICAgc2V0dXBIYXNoTGlzdGVuZXJcbiAgICApO1xuICB9XG5cbiAgaGlzdG9yeS5saXN0ZW4oZnVuY3Rpb24gKHJvdXRlKSB7XG4gICAgdGhpcyQxLmFwcHMuZm9yRWFjaChmdW5jdGlvbiAoYXBwKSB7XG4gICAgICBhcHAuX3JvdXRlID0gcm91dGU7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuVnVlUm91dGVyLnByb3RvdHlwZS5iZWZvcmVFYWNoID0gZnVuY3Rpb24gYmVmb3JlRWFjaCAoZm4pIHtcbiAgdGhpcy5iZWZvcmVIb29rcy5wdXNoKGZuKTtcbn07XG5cblZ1ZVJvdXRlci5wcm90b3R5cGUuYWZ0ZXJFYWNoID0gZnVuY3Rpb24gYWZ0ZXJFYWNoIChmbikge1xuICB0aGlzLmFmdGVySG9va3MucHVzaChmbik7XG59O1xuXG5WdWVSb3V0ZXIucHJvdG90eXBlLm9uUmVhZHkgPSBmdW5jdGlvbiBvblJlYWR5IChjYikge1xuICB0aGlzLmhpc3Rvcnkub25SZWFkeShjYik7XG59O1xuXG5WdWVSb3V0ZXIucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiBwdXNoIChsb2NhdGlvbiwgb25Db21wbGV0ZSwgb25BYm9ydCkge1xuICB0aGlzLmhpc3RvcnkucHVzaChsb2NhdGlvbiwgb25Db21wbGV0ZSwgb25BYm9ydCk7XG59O1xuXG5WdWVSb3V0ZXIucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiByZXBsYWNlIChsb2NhdGlvbiwgb25Db21wbGV0ZSwgb25BYm9ydCkge1xuICB0aGlzLmhpc3RvcnkucmVwbGFjZShsb2NhdGlvbiwgb25Db21wbGV0ZSwgb25BYm9ydCk7XG59O1xuXG5WdWVSb3V0ZXIucHJvdG90eXBlLmdvID0gZnVuY3Rpb24gZ28gKG4pIHtcbiAgdGhpcy5oaXN0b3J5LmdvKG4pO1xufTtcblxuVnVlUm91dGVyLnByb3RvdHlwZS5iYWNrID0gZnVuY3Rpb24gYmFjayAoKSB7XG4gIHRoaXMuZ28oLTEpO1xufTtcblxuVnVlUm91dGVyLnByb3RvdHlwZS5mb3J3YXJkID0gZnVuY3Rpb24gZm9yd2FyZCAoKSB7XG4gIHRoaXMuZ28oMSk7XG59O1xuXG5WdWVSb3V0ZXIucHJvdG90eXBlLmdldE1hdGNoZWRDb21wb25lbnRzID0gZnVuY3Rpb24gZ2V0TWF0Y2hlZENvbXBvbmVudHMgKHRvKSB7XG4gIHZhciByb3V0ZSA9IHRvXG4gICAgPyB0aGlzLnJlc29sdmUodG8pLnJvdXRlXG4gICAgOiB0aGlzLmN1cnJlbnRSb3V0ZTtcbiAgaWYgKCFyb3V0ZSkge1xuICAgIHJldHVybiBbXVxuICB9XG4gIHJldHVybiBbXS5jb25jYXQuYXBwbHkoW10sIHJvdXRlLm1hdGNoZWQubWFwKGZ1bmN0aW9uIChtKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG0uY29tcG9uZW50cykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBtLmNvbXBvbmVudHNba2V5XVxuICAgIH0pXG4gIH0pKVxufTtcblxuVnVlUm91dGVyLnByb3RvdHlwZS5yZXNvbHZlID0gZnVuY3Rpb24gcmVzb2x2ZSAoXG4gIHRvLFxuICBjdXJyZW50LFxuICBhcHBlbmRcbikge1xuICB2YXIgbG9jYXRpb24gPSBub3JtYWxpemVMb2NhdGlvbih0bywgY3VycmVudCB8fCB0aGlzLmhpc3RvcnkuY3VycmVudCwgYXBwZW5kKTtcbiAgdmFyIHJvdXRlID0gdGhpcy5tYXRjaChsb2NhdGlvbiwgY3VycmVudCk7XG4gIHZhciBmdWxsUGF0aCA9IHJvdXRlLnJlZGlyZWN0ZWRGcm9tIHx8IHJvdXRlLmZ1bGxQYXRoO1xuICB2YXIgYmFzZSA9IHRoaXMuaGlzdG9yeS5iYXNlO1xuICB2YXIgaHJlZiA9IGNyZWF0ZUhyZWYoYmFzZSwgZnVsbFBhdGgsIHRoaXMubW9kZSk7XG4gIHJldHVybiB7XG4gICAgbG9jYXRpb246IGxvY2F0aW9uLFxuICAgIHJvdXRlOiByb3V0ZSxcbiAgICBocmVmOiBocmVmLFxuICAgIC8vIGZvciBiYWNrd2FyZHMgY29tcGF0XG4gICAgbm9ybWFsaXplZFRvOiBsb2NhdGlvbixcbiAgICByZXNvbHZlZDogcm91dGVcbiAgfVxufTtcblxuVnVlUm91dGVyLnByb3RvdHlwZS5hZGRSb3V0ZXMgPSBmdW5jdGlvbiBhZGRSb3V0ZXMgKHJvdXRlcykge1xuICB0aGlzLm1hdGNoZXIuYWRkUm91dGVzKHJvdXRlcyk7XG4gIGlmICh0aGlzLmhpc3RvcnkuY3VycmVudCAhPT0gU1RBUlQpIHtcbiAgICB0aGlzLmhpc3RvcnkudHJhbnNpdGlvblRvKHRoaXMuaGlzdG9yeS5nZXRDdXJyZW50TG9jYXRpb24oKSk7XG4gIH1cbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBWdWVSb3V0ZXIucHJvdG90eXBlLCBwcm90b3R5cGVBY2Nlc3NvcnMgKTtcblxuZnVuY3Rpb24gY3JlYXRlSHJlZiAoYmFzZSwgZnVsbFBhdGgsIG1vZGUpIHtcbiAgdmFyIHBhdGggPSBtb2RlID09PSAnaGFzaCcgPyAnIycgKyBmdWxsUGF0aCA6IGZ1bGxQYXRoO1xuICByZXR1cm4gYmFzZSA/IGNsZWFuUGF0aChiYXNlICsgJy8nICsgcGF0aCkgOiBwYXRoXG59XG5cblZ1ZVJvdXRlci5pbnN0YWxsID0gaW5zdGFsbDtcblZ1ZVJvdXRlci52ZXJzaW9uID0gJzIuMi4xJztcblxuaWYgKGluQnJvd3NlciAmJiB3aW5kb3cuVnVlKSB7XG4gIHdpbmRvdy5WdWUudXNlKFZ1ZVJvdXRlcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZ1ZVJvdXRlcjtcbiIsIjx0ZW1wbGF0ZT5cclxuICAgIDx0YWJsZT5cclxuICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZD7ln5/lkI08L3RkPlxyXG4gICAgICAgICAgICAgICAgPHRkPuS7iuaXpemUmeivr+aVsDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQ+N+aXpemUmeivr+aVsDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQ+MTXml6XplJnor6/mlbA8L3RkPlxyXG4gICAgICAgICAgICAgICAgPHRkPumUmeivr+exu+Wei+aVsDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQ+5oql6ZSZ6ISa5pys5pWwPC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZD7mnIDpq5jplJnor6/nsbvlnos8L3RkPlxyXG4gICAgICAgICAgICAgICAgPHRkPuaTjeS9nDwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgPC90aGVhZD5cclxuICAgIDwvdGFibGU+XHJcbjwvdGVtcGxhdGU+IFxyXG48c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIj5cclxuXHRcclxuaW1wb3J0IHN0b3JlIGZyb20gJy4uLy4uL3N0b3JlJztcclxuaW1wb3J0IHZ1ZXggZnJvbSAndnVleCc7XHJcbmNvbnN0IG1hcFN0YXRlID0gdnVleC5tYXBTdGF0ZTtcclxuY29uc3QgbWFwQWN0aW9ucyA9IHZ1ZXgubWFwQWN0aW9ucztcclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gICAgY29tcHV0ZWQ6IHtcclxuICAgICAgICAuLi5tYXBTdGF0ZSh7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICBcclxufVxyXG5cclxuPC9zY3JpcHQ+IiwiPHRlbXBsYXRlPiBcclxuICAgIDxkaXYgY2xhc3M9XCJnZXItY290ZW50XCI+XHJcbiAgICAgICAgcmVwb3J0RGV0YWlsXHJcbiAgICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT4gXHJcbjxzY3JpcHQ+IFxyXG48L3NjcmlwdD4iLCIvKipcclxuICogQGF1dGhvciB6aGFvZG9uZ2hvbmdcclxuICogQGZpbGVvdmVydmlldyByb3V0ZXJzIHJlcG9ydC5qc1xyXG4gKiBAZGF0ZSAyMDE3LzAyLzI3XHJcbiAqL1xyXG5cclxuaW1wb3J0IHJlcG9ydCBmcm9tICcuLi9wYWdlcy9yZXBvcnQvcmVwb3J0LnZ1ZSc7XHJcbmltcG9ydCBkZXRhaWwgZnJvbSAnLi4vcGFnZXMvcmVwb3J0L2RldGFpbC52dWUnO1xyXG5leHBvcnQgZGVmYXVsdCAgW1xyXG5cdHtcclxuXHRcdHBhdGg6ICcvcmVwb3J0JywgXHJcblx0XHRjb21wb25lbnQ6IHJlcG9ydCxcclxuXHRcdG5hbWU6ICdyZXBvcnQnXHJcblx0fSxcclxuXHR7XHJcblx0XHRwYXRoOiAnL3JlcG9ydC9saXN0JyxcclxuXHRcdGNvbXBvbmVudDogcmVwb3J0LFxyXG5cdFx0bmFtZTogJ2xpc3QnXHJcblx0fSxcclxuXHR7XHJcblx0XHRwYXRoOiAnL3JlcG9ydC9kZXRhaWwnLFxyXG5cdFx0Y29tcG9uZW50OiBkZXRhaWwsXHJcblx0XHRuYW1lOidyZXBvcnREZXRhaWwnXHJcblx0fVxyXG5dOyIsIjx0ZW1wbGF0ZT4gXHJcblx0PGRpdj5cclxuICAgIFx0PCEtLSB7e3Rlc3R9fVxyXG4gICAgXHQ8aW5wdXQgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwiYWFhXCIgQGNsaWNrPVwiRURJVF9URVNUXCIvPiAtLT5cclxuICAgIFx0PCEtLSBsaXN0IC0tPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodF9hcmVhIHVzZXJsaXN0XCI+XHJcbiAgICAgICAgXHQ8cCBjbGFzcz1cImNvbnRlbnRfdGl0bGVcIj7nlKjmiLfliJfooag8L3A+XHJcbiAgICAgICAgICAgIDx1bCBjbGFzcz1cImxpc3QtZ3JvdXBcIiB2LWlmPVwiaXRlbXNcIj5cclxuICAgICAgICAgICAgXHQ8bGkgdi1mb3I9XCJpdGVtIGluIGl0ZW1zXCI+XHJcblx0XHRcdFx0XHQ8YSA6ZGF0YS1pZD1cIml0ZW0uaWRcIiBocmVmPVwiI1wiPnt7IGl0ZW0ubWVzc2FnZSB9fTwvYT5cclxuICAgICAgICAgICAgXHRcdDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gZGVsZXRlIGZyXCIgdmFsdWU9XCLliKDpmaRcIiAvPlxyXG4gICAgICAgICAgICBcdFx0PGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBlZGl0IGZyXCIgdmFsdWU9XCLnvJbovpFcIiAvPlxyXG5cdFx0XHRcdDwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDwhLS0gPHVsIGNsYXNzPVwibGlzdC1ncm91cFwiPlxyXG4gICAgICAgICAgICBcdDxsaT5cclxuICAgICAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvdXNlci9lZGl0L3Rlc3RcIj4xLiDnlKjmiLflkI0gdXNlci0xIOWIm+W7uuaXtumXtDoyMDE3LTAyLTAxPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgXHRcdDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gZGVsZXRlIGZyXCIgdmFsdWU9XCLliKDpmaRcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi91c2VyL2FkZFwiICBhY3RpdmUtY2xhc3M9XCJhY3RpdmVcIiBjbGFzcz1cImVkaXQgZnJcIj7mt7vliqA8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MzBweDtjb2xvcjojZmZmO1wiPjE8L3NwYW4+XHJcbiAgICAgICAgICAgIFx0XHQ8cm91dGVyLWxpbmsgdG89XCIvdXNlci9lZGl0L3Rlc3RcIiAgYWN0aXZlLWNsYXNzPVwiYWN0aXZlXCIgY2xhc3M9XCJlZGl0IGZyXCI+57yW6L6RPC9yb3V0ZXItbGluaz5cclxuXHRcdFx0XHQ8L2xpPlxyXG4gICAgICAgICAgICBcdDxsaT5cclxuICAgICAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvdXNlci9lZGl0L3Rlc3RcIj4yLiDnlKjmiLflkI0gdXNlci0yIOWIm+W7uuaXtumXtDoyMDE3LTAyLTAxPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgXHRcdDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gZGVsZXRlIGZyXCIgdmFsdWU9XCLliKDpmaRcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi91c2VyL21vZHB3ZC90ZXN0XCIgIGFjdGl2ZS1jbGFzcz1cImFjdGl2ZVwiIGNsYXNzPVwiZWRpdCBmclwiPuS/ruaUueWvhueggTwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDozMHB4O2NvbG9yOiNmZmY7XCI+MTwvc3Bhbj5cclxuICAgICAgICAgICAgXHRcdDxyb3V0ZXItbGluayB0bz1cIi91c2VyL2VkaXQvdGVzdFwiICBhY3RpdmUtY2xhc3M9XCJhY3RpdmVcIiBjbGFzcz1cImVkaXQgZnJcIj7nvJbovpE8L3JvdXRlci1saW5rPlxyXG5cdFx0XHRcdDwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+IC0tPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFibGVfYm94XCI+XHJcbiAgICAgICAgICAgICAgICA8dGFibGUgYWxpZ249XCJjZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD7nlKjmiLflkI08L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPuWIm+W7uuaXtumXtDwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGg+5pON5L2cPC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keSBpZD1cInRib2R5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48cm91dGVyLWxpbmsgdG89XCIvdXNlci9lZGl0L3Rlc3RcIj4xLiDnlKjmiLflkI0gdXNlci0xPC9yb3V0ZXItbGluaz48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxyb3V0ZXItbGluayB0bz1cIi91c2VyL2VkaXQvdGVzdFwiPuWIm+W7uuaXtumXtDoyMDE3LTAyLTAxPC9yb3V0ZXItbGluaz48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gZGVsZXRlXCIgdmFsdWU9XCLliKDpmaRcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi91c2VyL2FkZFwiICBhY3RpdmUtY2xhc3M9XCJhY3RpdmVcIiBjbGFzcz1cImVkaXRcIj7mt7vliqA8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi91c2VyL2VkaXQvdGVzdFwiICBhY3RpdmUtY2xhc3M9XCJhY3RpdmVcIiBjbGFzcz1cImVkaXRcIj7nvJbovpE8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi91c2VyL21vZHB3ZC90ZXN0XCIgIGFjdGl2ZS1jbGFzcz1cImFjdGl2ZVwiIGNsYXNzPVwiZWRpdFwiPuS/ruaUueWvhueggTwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PHJvdXRlci1saW5rIHRvPVwiL3VzZXIvZWRpdC90ZXN0XCI+Mi4g55So5oi35ZCNIHVzZXItMjwvcm91dGVyLWxpbms+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48cm91dGVyLWxpbmsgdG89XCIvdXNlci9lZGl0L3Rlc3RcIj7liJvlu7rml7bpl7Q6MjAxNy0wMi0wMTwvcm91dGVyLWxpbms+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGRlbGV0ZVwiIHZhbHVlPVwi5Yig6ZmkXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvdXNlci9hZGRcIiAgYWN0aXZlLWNsYXNzPVwiYWN0aXZlXCIgY2xhc3M9XCJlZGl0XCI+5re75YqgPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvdXNlci9lZGl0L3Rlc3RcIiAgYWN0aXZlLWNsYXNzPVwiYWN0aXZlXCIgY2xhc3M9XCJlZGl0XCI+57yW6L6RPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48cm91dGVyLWxpbmsgdG89XCIvdXNlci9lZGl0L3Rlc3RcIj4xLiDnlKjmiLflkI0gdXNlci0xPC9yb3V0ZXItbGluaz48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxyb3V0ZXItbGluayB0bz1cIi91c2VyL2VkaXQvdGVzdFwiPuWIm+W7uuaXtumXtDoyMDE3LTAyLTAxPC9yb3V0ZXItbGluaz48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gZGVsZXRlXCIgdmFsdWU9XCLliKDpmaRcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi91c2VyL2FkZFwiICBhY3RpdmUtY2xhc3M9XCJhY3RpdmVcIiBjbGFzcz1cImVkaXRcIj7mt7vliqA8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi91c2VyL2VkaXQvdGVzdFwiICBhY3RpdmUtY2xhc3M9XCJhY3RpdmVcIiBjbGFzcz1cImVkaXRcIj7nvJbovpE8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxyb3V0ZXItbGluayB0bz1cIi91c2VyL2VkaXQvdGVzdFwiPjIuIOeUqOaIt+WQjSB1c2VyLTI8L3JvdXRlci1saW5rPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PHJvdXRlci1saW5rIHRvPVwiL3VzZXIvZWRpdC90ZXN0XCI+5Yib5bu65pe26Ze0OjIwMTctMDItMDE8L3JvdXRlci1saW5rPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBkZWxldGVcIiB2YWx1ZT1cIuWIoOmZpFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL3VzZXIvYWRkXCIgIGFjdGl2ZS1jbGFzcz1cImFjdGl2ZVwiIGNsYXNzPVwiZWRpdFwiPua3u+WKoDwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL3VzZXIvZWRpdC90ZXN0XCIgIGFjdGl2ZS1jbGFzcz1cImFjdGl2ZVwiIGNsYXNzPVwiZWRpdFwiPue8lui+kTwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PHJvdXRlci1saW5rIHRvPVwiL3VzZXIvZWRpdC90ZXN0XCI+MS4g55So5oi35ZCNIHVzZXItMTwvcm91dGVyLWxpbms+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48cm91dGVyLWxpbmsgdG89XCIvdXNlci9lZGl0L3Rlc3RcIj7liJvlu7rml7bpl7Q6MjAxNy0wMi0wMTwvcm91dGVyLWxpbms+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGRlbGV0ZVwiIHZhbHVlPVwi5Yig6ZmkXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvdXNlci9hZGRcIiAgYWN0aXZlLWNsYXNzPVwiYWN0aXZlXCIgY2xhc3M9XCJlZGl0XCI+5re75YqgPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvdXNlci9lZGl0L3Rlc3RcIiAgYWN0aXZlLWNsYXNzPVwiYWN0aXZlXCIgY2xhc3M9XCJlZGl0XCI+57yW6L6RPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48cm91dGVyLWxpbmsgdG89XCIvdXNlci9lZGl0L3Rlc3RcIj4yLiDnlKjmiLflkI0gdXNlci0yPC9yb3V0ZXItbGluaz48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxyb3V0ZXItbGluayB0bz1cIi91c2VyL2VkaXQvdGVzdFwiPuWIm+W7uuaXtumXtDoyMDE3LTAyLTAxPC9yb3V0ZXItbGluaz48L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gZGVsZXRlXCIgdmFsdWU9XCLliKDpmaRcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi91c2VyL2FkZFwiICBhY3RpdmUtY2xhc3M9XCJhY3RpdmVcIiBjbGFzcz1cImVkaXRcIj7mt7vliqA8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxyb3V0ZXItbGluayB0bz1cIi91c2VyL2VkaXQvdGVzdFwiICBhY3RpdmUtY2xhc3M9XCJhY3RpdmVcIiBjbGFzcz1cImVkaXRcIj7nvJbovpE8L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkPjxyb3V0ZXItbGluayB0bz1cIi91c2VyL2VkaXQvdGVzdFwiPjEuIOeUqOaIt+WQjSB1c2VyLTE8L3JvdXRlci1saW5rPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PHJvdXRlci1saW5rIHRvPVwiL3VzZXIvZWRpdC90ZXN0XCI+5Yib5bu65pe26Ze0OjIwMTctMDItMDE8L3JvdXRlci1saW5rPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBkZWxldGVcIiB2YWx1ZT1cIuWIoOmZpFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL3VzZXIvYWRkXCIgIGFjdGl2ZS1jbGFzcz1cImFjdGl2ZVwiIGNsYXNzPVwiZWRpdFwiPua3u+WKoDwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHJvdXRlci1saW5rIHRvPVwiL3VzZXIvZWRpdC90ZXN0XCIgIGFjdGl2ZS1jbGFzcz1cImFjdGl2ZVwiIGNsYXNzPVwiZWRpdFwiPue8lui+kTwvcm91dGVyLWxpbms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQ+PHJvdXRlci1saW5rIHRvPVwiL3VzZXIvZWRpdC90ZXN0XCI+Mi4g55So5oi35ZCNIHVzZXItMjwvcm91dGVyLWxpbms+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD48cm91dGVyLWxpbmsgdG89XCIvdXNlci9lZGl0L3Rlc3RcIj7liJvlu7rml7bpl7Q6MjAxNy0wMi0wMTwvcm91dGVyLWxpbms+PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGRlbGV0ZVwiIHZhbHVlPVwi5Yig6ZmkXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvdXNlci9hZGRcIiAgYWN0aXZlLWNsYXNzPVwiYWN0aXZlXCIgY2xhc3M9XCJlZGl0XCI+5re75YqgPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cm91dGVyLWxpbmsgdG89XCIvdXNlci9lZGl0L3Rlc3RcIiAgYWN0aXZlLWNsYXNzPVwiYWN0aXZlXCIgY2xhc3M9XCJlZGl0XCI+57yW6L6RPC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwhLS0gYWRkIC0tPlxyXG4gICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cInJpZ2h0X2FyZWEgdXNlcmFkZFwiPlxyXG4gICAgICAgIFx0PHAgY2xhc3M9XCJjb250ZW50X3RpdGxlXCI+5re75Yqg55So5oi3PC9wPlxyXG4gICAgICAgICAgICA8bGFiZWwgZm9yPVwidXNlcm5hbWVcIj7nlKjmiLflkI06IDwvbGFiZWw+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJ1c2VybmFtZVwiIGNsYXNzPVwidXNlcm5hbWVcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN1Ym1pdFwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNyZWF0ZVwiIHZhbHVlPVwi5Yib5bu6XCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYmFja1wiIHZhbHVlPVwi6L+U5ZueXCI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PiAtLT5cclxuICAgICAgICA8IS0tIGRldGFpbCAtLT5cclxuXHJcbiAgICAgICAgPCEtLSA8ZGl2IGNsYXNzPVwicmlnaHRfYXJlYSB1c2VyZGV0YWlsXCI+XHJcbiAgICAgICAgXHQ8cCBjbGFzcz1cImNvbnRlbnRfdGl0bGVcIj7nlKjmiLfor6bmg4U8L3A+XHJcbiAgICAgICAgXHQ8dWw+XHJcbiAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInVzZXJuYW1lXCI+55So5oi35ZCNOiA8L2xhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidXNlcm5hbWVcIiBjbGFzcz1cInVzZXJuYW1lXCI+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwYXNzd29yZFwiPuWvhuOAgOeggTogPC9sYWJlbD48aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIGNsYXNzPVwicGFzc3dvcmRcIj5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJjbGVhcmZpeFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZsXCIgZm9yPVwiZG9tYWluc1wiPuWfn+WQjee7hDogPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJkb21haW5zXCIgaWQ9XCJkb21haW5zXCI+PC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWJtaXRcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjcmVhdGVcIiB2YWx1ZT1cIuWIm+W7ulwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJhY2tcIiB2YWx1ZT1cIui/lOWbnlwiPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj4gLS0+XHJcbiAgICAgICAgPCEtLSBjaGFuZ2VwYXNzIC0tPlxyXG4gICAgICAgIDwhLS0gPGRpdiBjbGFzcz1cInJpZ2h0X2FyZWEgdXNlcmRldGFpbFwiPlxyXG5cdFx0XHQ8cCBjbGFzcz1cImNvbnRlbnRfdGl0bGVcIj7kv67mlLnlr4bnoIE8L3A+XHJcblx0XHRcdDx1bD5cclxuICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj7mlrDlr4bnoIE6IDwvbGFiZWw+PGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiBjbGFzcz1cInBhc3N3b3JkXCI+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwYXNzd29yZFwiPuehruiupOWvhueggTogPC9sYWJlbD48aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIGNsYXNzPVwicGFzc3dvcmRcIj5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWJtaXRcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjaGFuZ2VcIiB2YWx1ZT1cIuS/ruaUuVwiPlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJhY2tcIiB2YWx1ZT1cIui/lOWbnlwiPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj4gLS0+XHJcbiAgICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT4gXHJcbjxzY3JpcHQ+XHJcbmltcG9ydCBzdG9yZSBmcm9tICcuLi8uLi9zdG9yZSc7XHJcbmltcG9ydCB2dWV4IGZyb20gJ3Z1ZXgnO1xyXG5jb25zdCBtYXBTdGF0ZSA9IHZ1ZXgubWFwU3RhdGU7XHJcbmNvbnN0IG1hcEFjdGlvbnMgPSB2dWV4Lm1hcEFjdGlvbnM7XHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICAgIGNvbXB1dGVkOiB7XHJcbiAgICAgICAgLi4ubWFwU3RhdGUoe1xyXG4gICAgICAgICAgICB0ZXN0OiBzdGF0ZSA9PnN0b3JlLnN0YXRlLmluaXRNb2R1bGUudGVzdCxcclxuICAgICAgICAgICAgdGVzdDE6IHN0YXRlID0+IHN0b3JlLnN0YXRlLmluaXRNb2R1bGUudGVzdDFcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAuLi5tYXBBY3Rpb25zKFsnRURJVF9URVNUJywnRURJVF9URVNUMSddKVxyXG4gICAgfS8qLFxyXG4gICAgY3JlYXRlZDoge1xyXG5cclxuICAgICAgICBsZXQgdHJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3RyJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2codHJzLmxlbmd0aCk7XHJcbiAgICB9Ki9cclxufVxyXG5cclxuPC9zY3JpcHQ+XHJcbiIsIjx0ZW1wbGF0ZT4gXHJcbiAgICA8ZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodF9hcmVhIHVzZXJhZGRcIj5cclxuICAgICAgICBcdDxwIGNsYXNzPVwiY29udGVudF90aXRsZVwiPua3u+WKoOeUqOaItzwvcD5cclxuICAgICAgICAgICAgPGxhYmVsIGZvcj1cInVzZXJuYW1lXCI+55So5oi35ZCNOiA8L2xhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidXNlcm5hbWVcIiBjbGFzcz1cInVzZXJuYW1lXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWJtaXRcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjcmVhdGVcIiB2YWx1ZT1cIuWIm+W7ulwiPlxyXG4gICAgICAgICAgICAgICAgPCEtLSA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYmFja1wiIHZhbHVlPVwi6L+U5ZueXCI+IC0tPlxyXG4gICAgICAgICAgICBcdDxyb3V0ZXItbGluayB0bz1cIi9pbmRleFwiICBhY3RpdmUtY2xhc3M9XCJhY3RpdmVcIiBjbGFzcz1cImJhY2tcIj7ov5Tlm548L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L3RlbXBsYXRlPiAiLCI8dGVtcGxhdGU+IFxyXG4gICAgPGRpdiBjbGFzcz1cIlwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodF9hcmVhIHVzZXJkZXRhaWxcIj5cclxuICAgICAgICAgICAgPHAgY2xhc3M9XCJjb250ZW50X3RpdGxlXCI+55So5oi36K+m5oOFPC9wPlxyXG4gICAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInVzZXJuYW1lXCI+55So5oi35ZCNOiA8L2xhYmVsPjxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwidXNlcm5hbWVcIiBjbGFzcz1cInVzZXJuYW1lXCI+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJwYXNzd29yZFwiPuWvhuOAgOeggTogPC9sYWJlbD48aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgaWQ9XCJwYXNzd29yZFwiIGNsYXNzPVwicGFzc3dvcmRcIj5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJjbGVhcmZpeFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImZsXCIgZm9yPVwiZG9tYWluc1wiPuWfn+WQjee7hDogPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJkb21haW5zXCIgaWQ9XCJkb21haW5zXCI+PC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWJtaXRcIj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjcmVhdGVcIiB2YWx1ZT1cIuWIm+W7ulwiPlxyXG4gICAgICAgICAgICAgICAgPCEtLSA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYmFja1wiIHZhbHVlPVwi6L+U5ZueXCI+IC0tPlxyXG4gICAgICAgICAgICBcdDxyb3V0ZXItbGluayB0bz1cIi9pbmRleFwiICBhY3RpdmUtY2xhc3M9XCJhY3RpdmVcIiBjbGFzcz1cImJhY2tcIj7ov5Tlm548L3JvdXRlci1saW5rPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L3RlbXBsYXRlPiBcclxuPHNjcmlwdD5cclxuPC9zY3JpcHQ+XHJcbiIsIjx0ZW1wbGF0ZT4gXHJcbiAgICA8ZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodF9hcmVhIHVzZXJkZXRhaWxcIj5cclxuXHRcdFx0PHAgY2xhc3M9XCJjb250ZW50X3RpdGxlXCI+5L+u5pS55a+G56CBPC9wPlxyXG5cdFx0XHQ8dWw+XHJcbiAgICAgICAgICAgICAgICA8bGk+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cInBhc3N3b3JkXCI+5paw5a+G56CBOiA8L2xhYmVsPjxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBpZD1cInBhc3N3b3JkXCIgY2xhc3M9XCJwYXNzd29yZFwiPlxyXG4gICAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgICAgIDxsaT5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwicGFzc3dvcmRcIj7noa7orqTlr4bnoIE6IDwvbGFiZWw+PGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiBjbGFzcz1cInBhc3N3b3JkXCI+XHJcbiAgICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICA8L3VsPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3VibWl0XCI+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2hhbmdlXCIgdmFsdWU9XCLkv67mlLlcIj5cclxuICAgICAgICAgICAgICAgIDwhLS0gPGlucHV0IHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJhY2tcIiB2YWx1ZT1cIui/lOWbnlwiPiAtLT5cclxuICAgICAgICAgICAgXHQ8cm91dGVyLWxpbmsgdG89XCIvaW5kZXhcIiAgYWN0aXZlLWNsYXNzPVwiYWN0aXZlXCIgY2xhc3M9XCJiYWNrXCI+6L+U5ZuePC9yb3V0ZXItbGluaz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC90ZW1wbGF0ZT4gIiwiLyoqXHJcbiAqIEBhdXRob3Igemhhb2Rvbmdob25nXHJcbiAqIEBmaWxlb3ZlcnZpZXcgcm91dGVycyB1c2VyLmpzXHJcbiAqIEBkYXRlIDIwMTcvMDIvMjdcclxuICovXHJcbmltcG9ydCBzdHJvZSBmcm9tICcuLi9zdG9yZSc7XHJcbmltcG9ydCB1c2VyIGZyb20gJy4uL3BhZ2VzL3VzZXIvbGlzdC52dWUnO1xyXG5pbXBvcnQgYWRkIGZyb20gJy4uL3BhZ2VzL3VzZXIvYWRkLnZ1ZSc7XHJcbmltcG9ydCBlZGl0IGZyb20gJy4uL3BhZ2VzL3VzZXIvZWRpdC52dWUnO1xyXG5pbXBvcnQgbW9kcHdkIGZyb20gJy4uL3BhZ2VzL3VzZXIvbW9kcHdkLnZ1ZSc7XHJcbmV4cG9ydCBkZWZhdWx0ICBbXHJcblx0e1xyXG5cdFx0cGF0aDogJy9pbmRleCcsXHJcblx0XHRjb21wb25lbnQ6IGluZGV4LFxyXG5cdFx0cmVkaXJlY3Q6ICgpID0+IHtcclxuXHRcdFx0aWYoIXN0cm9lLnN0YXRlLmluaXRNb2R1bGUuaXNBZG1pbil7XHJcblx0XHRcdFx0cmV0dXJuICcvcmVwb3J0JztcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0cmV0dXJuICcvdXNlcidcclxuXHRcdFx0fVxyXG5cdCAgICB9XHJcblx0fSxcclxuXHR7XHJcblx0XHRwYXRoOiAnL3VzZXInLCBcclxuXHRcdGNvbXBvbmVudDogdXNlcixcclxuXHRcdG5hbWU6ICd1c2VyJ1xyXG5cdH0sXHJcblx0e1xyXG5cdFx0cGF0aDogJy91c2VyL2VkaXQnLCBcclxuXHRcdGNvbXBvbmVudDogZWRpdCxcclxuXHRcdG5hbWU6ICdlZGl0J1xyXG5cdH0sXHJcblx0e1xyXG5cdFx0cGF0aDogJy91c2VyL2FkZCcsIFxyXG5cdFx0Y29tcG9uZW50OiBhZGQsXHJcblx0XHRuYW1lOiAnYWRkJ1xyXG5cdH0sXHJcblx0e1xyXG5cdFx0cGF0aDogJy91c2VyL21vZHB3ZCcsIFxyXG5cdFx0Y29tcG9uZW50OiBtb2Rwd2QsXHJcblx0XHRuYW1lOiAnbW9kcHdkJy8qLFxyXG5cdFx0cmVkaXJlY3Q6ICgpID0+IHtcclxuXHRcdFx0Y29uc29sZS5sb2cobW9kcHdkKVxyXG5cdFx0fSovXHJcblx0fVxyXG5dOyIsIi8qKlxyXG4gKiBAYXV0aG9yIHpoYW9kb25naG9uZ1xyXG4gKiBAZmlsZW92ZXJ2aWV3IHJvdXRlcnMgaW5kZXguanNcclxuICogQGRhdGUgMjAxNy8wMi8yN1xyXG4gKi9cclxuXHJcbmltcG9ydCByZXBvcnQgZnJvbSAnLi9yZXBvcnQnO1xyXG5pbXBvcnQgdXNlciBmcm9tICcuL3VzZXInO1xyXG5leHBvcnQgZGVmYXVsdCAgQXJyYXkucHJvdG90eXBlLmNvbmNhdC5jYWxsKHVzZXIscmVwb3J0KTsiLCJpbXBvcnQgJy4vY3NzL21haW4uY3NzJztcclxuaW1wb3J0ICcuL2Nzcy91c2VyLmNzcyc7XHJcbmltcG9ydCBWdWUgZnJvbSAndnVlJztcclxuaW1wb3J0IEFwcCBmcm9tICcuL2FwcC52dWUnO1xyXG5pbXBvcnQgc3RvcmUgZnJvbSAnLi9zdG9yZSc7XHJcbmltcG9ydCB2dWVSb3V0ZXIgZnJvbSAndnVlLXJvdXRlcic7XHJcbmltcG9ydCBkcm91dGVycyBmcm9tICcuL3JvdXRlcnMnO1xyXG5WdWUudXNlKHZ1ZVJvdXRlcik7XHJcbmNvbnN0IHJvdXRlciA9IG5ldyB2dWVSb3V0ZXIoe1xyXG5cdGhhc2hiYW5nOiBmYWxzZSwgXHJcblx0bW9kZTonaGlzdG9yeScsXHJcbiAgXHRyb3V0ZXM6IGRyb3V0ZXJzXHJcbn0pXHJcbnJvdXRlci5iZWZvcmVFYWNoKCh0bywgZnJvbSwgbmV4dCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKHRvKTtcclxuICBjb25zb2xlLmxvZyhmcm9tKTtcclxuICBuZXh0KCk7XHJcbn0pXHJcblxyXG5sZXQgdnVlQXBwID0gbmV3IFZ1ZSh7XHJcblx0c3RvcmUsXHJcbiAgICBlbDogJyNnZXItdWknLFxyXG4gICBcdC4uLkFwcCxcclxuICAgXHRyb3V0ZXJcclxufSk7Il0sIm5hbWVzIjpbIlZ1ZSQyIiwiaW5kZXgiLCJpc09iamVjdCIsIlZ1ZSIsInByb3RvdHlwZUFjY2Vzc29ycyIsIm1hcFN0YXRlIiwiYXJndW1lbnRzIiwibWFwQWN0aW9ucyIsImNvbnN0Iiwic3RhdGUiLCJtdXRhdGlvbnMiLCJhY3Rpb25zIiwic3RvcmUiLCJWdWV4IiwidnVleCIsImFzc2VydCIsIndhcm4iLCJpbnN0YWxsIiwiaW5Ccm93c2VyIiwicGFyc2VQYXRoIiwiaW5kZXgkMSIsIm9uY2UiLCJWdWVSb3V0ZXIiLCJyZXBvcnQiLCJzdHJvZSIsInVzZXIiLCJhZGQiLCJ2dWVSb3V0ZXIiLCJsZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7O0FBVUEsU0FBUyxTQUFTLEVBQUUsR0FBRyxFQUFFO0VBQ3ZCLE9BQU8sR0FBRyxJQUFJLElBQUk7TUFDZCxFQUFFO01BQ0YsT0FBTyxHQUFHLEtBQUssUUFBUTtRQUNyQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUM7Q0FDbEI7Ozs7OztBQU1ELFNBQVMsUUFBUSxFQUFFLEdBQUcsRUFBRTtFQUN0QixJQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDeEIsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7Q0FDMUI7Ozs7OztBQU1ELFNBQVMsT0FBTztFQUNkLEdBQUc7RUFDSCxnQkFBZ0I7RUFDaEI7RUFDQSxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQzlCLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDMUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDcEMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztHQUNyQjtFQUNELE9BQU8sZ0JBQWdCO01BQ25CLFVBQVUsR0FB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
