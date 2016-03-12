(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["flux"] = factory();
	else
		root["flux"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _util = __webpack_require__(4);

	var _util2 = _interopRequireDefault(_util);

	var _eventbus = __webpack_require__(2);

	var _eventbus2 = _interopRequireDefault(_eventbus);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*

	 The MIT License (MIT)
	 Copyright (c) 2016 Narendra Sisodiya https://github.com/nsisodiya

	 */

	var dispatcher = new _eventbus2.default();

	function createStore(exposedAPI) {
		var storeBus = new _eventbus2.default();
		var state = {};

		var eventList = {};

		Object.keys(exposedAPI).filter(function (v) {
			return v !== "INIT";
		}).map(function (eventName) {
			eventList[eventName] = exposedAPI[eventName].toString().split("{")[0].split("(")[1].split(")")[0].split(",").filter(function (v) {
				return v !== "state";
			}).map(function (v) {
				return v.trim();
			});
		});

		if (typeof exposedAPI.INIT === "function") {
			exposedAPI.INIT(state);
		}
		_util2.default.mapObject(exposedAPI, function (fun, eventName) {
			if (eventName === "INIT") {
				return;
			}
			dispatcher.subscribe(eventName, function () {
				var cloneState = _util2.default.clone(state);

				for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
					data[_key] = arguments[_key];
				}

				fun.apply(undefined, [cloneState].concat(data));
				state = cloneState;
				//Now trigger onChange.
				storeBus.publish("onChange");
			});
		});

		var store = {
			onChange: function onChange(cb) {
				return storeBus.subscribe("onChange", cb);
			},
			getState: function getState() {
				return state;
			},
			getAllEvents: function getAllEvents() {
				return eventList;
			}
		};
		return store;
	}

	module.exports = {
		createStore: createStore,
		dispatcher: dispatcher
	};

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	(function webpackUniversalModuleDefinition(root, factory) {
		if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') exports["EventBus"] = factory();else root["EventBus"] = factory();
	})(undefined, function () {
		return (/******/function (modules) {
				// webpackBootstrap
				/******/ // The module cache
				/******/var installedModules = {};

				/******/ // The require function
				/******/function __webpack_require__(moduleId) {

					/******/ // Check if module is in cache
					/******/if (installedModules[moduleId])
						/******/return installedModules[moduleId].exports;

					/******/ // Create a new module (and put it into the cache)
					/******/var module = installedModules[moduleId] = {
						/******/exports: {},
						/******/id: moduleId,
						/******/loaded: false
						/******/ };

					/******/ // Execute the module function
					/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

					/******/ // Flag the module as loaded
					/******/module.loaded = true;

					/******/ // Return the exports of the module
					/******/return module.exports;
					/******/
				}

				/******/ // expose the modules object (__webpack_modules__)
				/******/__webpack_require__.m = modules;

				/******/ // expose the module cache
				/******/__webpack_require__.c = installedModules;

				/******/ // __webpack_public_path__
				/******/__webpack_require__.p = "";

				/******/ // Load entry module and return exports
				/******/return __webpack_require__(0);
				/******/
			}(
			/************************************************************************/
			/******/[
			/* 0 */
			/***/function (module, exports) {

				"use strict";

				var _createClass = function () {
					function defineProperties(target, props) {
						for (var i = 0; i < props.length; i++) {
							var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
						}
					}return function (Constructor, protoProps, staticProps) {
						if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
					};
				}();

				function _classCallCheck(instance, Constructor) {
					if (!(instance instanceof Constructor)) {
						throw new TypeError("Cannot call a class as a function");
					}
				}

				/*
	   	 The MIT License (MIT)
	    Copyright (c) 2016 Narendra Sisodiya https://github.com/nsisodiya
	   	 */

				var EventBus = function () {
					function EventBus() {
						_classCallCheck(this, EventBus);

						this._topicList = {};
						this._globalCallbackList = [];
					}

					_createClass(EventBus, [{
						key: "subscribe",
						value: function subscribe(topic, callback) {
							var _this = this;

							if (typeof topic !== "string" || typeof callback !== "function") {
								throw "EventBus Unable to subscribe - topic is not string or callback is not a function";
							}
							if (this._topicList[topic] === undefined) {
								this._topicList[topic] = [];
							}

							var i = this._topicList[topic].push(callback) - 1;

							//UnSub function !!
							return function () {
								//Setting Callback as null;
								_this._topicList[topic][i] = null;
							};
						}
					}, {
						key: "subscribeAll",
						value: function subscribeAll(callback) {
							var _this2 = this;

							var i = this._globalCallbackList.push(callback) - 1;
							return function () {
								_this2._globalCallbackList[i] = null;
							};
						}
					}, {
						key: "publish",
						value: function publish(topic) {
							for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
								args[_key - 1] = arguments[_key];
							}

							if (this._topicList[topic] !== undefined) {
								this._topicList[topic].map(function (callback) {
									if (callback !== null) {
										//SKIP the unsubscribed callback !
										callback.apply(null, args);
									}
								});
							}
							this._globalCallbackList.map(function (callback) {
								if (callback !== null) {
									//SKIP the unsubscribed callback !
									callback.apply(null, [topic].concat(args));
								}
							});
						}
					}]);

					return EventBus;
				}();

				module.exports = EventBus;

				/***/
			}
			/******/])
		);
	});
	;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)(module)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Created by narendrasisodiya on 11/03/16.
	 */

	module.exports = {
		clone: function clone(obj) {
			return JSON.parse(JSON.stringify(obj));
		},
		mapObject: function mapObject(obj, cb) {
			var a = [];
			Object.keys(obj).map(function (key) {
				a.push(cb(obj[key], key));
			});
			return a;
		}
	};

/***/ }
/******/ ])
});
;