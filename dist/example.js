(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@nsisodiya/flux"));
	else if(typeof define === 'function' && define.amd)
		define(["flux"], factory);
	else if(typeof exports === 'object')
		exports["example"] = factory(require("@nsisodiya/flux"));
	else
		root["example"] = factory(root["flux"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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

	"use strict";

	var _flux = __webpack_require__(1);

	var counterStore = (0, _flux.createStore)({
		INIT: function INIT(state) {
			state.count = 0;
		},
		COUNTER_INCREMENT: function COUNTER_INCREMENT(state) {
			state.count = state.count + 1;
		},
		COUNTER_INCREMENT_NUM: function COUNTER_INCREMENT_NUM(state, num) {
			state.count = state.count + num;
		},
		COUNTER_DECREMENT: function COUNTER_DECREMENT(state) {
			state.count = state.count - 1;
		}
	});

	var AnotherStore = (0, _flux.createStore)({
		INIT: function INIT(state) {},
		COUNTER_INCREMENT_NUM: function COUNTER_INCREMENT_NUM(state, num) {
			console.log("I am fired too", num);
		}
	});

	counterStore.onChange(function () {
		console.log("Part 1 Code ", counterStore.getState());
	});

	counterStore.onChange(function () {
		console.log("Part 2 Code ", counterStore.getState());
	});

	_flux.dispatcher.subscribeAll(function (evtName, args) {
		console.log("Some Event was Fired", evtName, args);
	});

	_flux.dispatcher.publish('COUNTER_INCREMENT');
	_flux.dispatcher.publish('COUNTER_INCREMENT');
	_flux.dispatcher.publish('COUNTER_INCREMENT_NUM', 3);
	_flux.dispatcher.publish('COUNTER_DECREMENT');
	_flux.dispatcher.publish('COUNTER_INCREMENT');

	console.log("All Events", counterStore.getAllEvents());

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;