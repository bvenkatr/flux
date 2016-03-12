/*

 The MIT License (MIT)
 Copyright (c) 2016 Narendra Sisodiya https://github.com/nsisodiya

 */

import util from './util';
import EventBus from '@nsisodiya/eventbus';

var dispatcher = new EventBus();


function createStore(exposedAPI) {
	var storeBus = new EventBus();
	var state = {};

	var eventList = {};

	Object.keys(exposedAPI).filter(function (v) {
		return v !== "INIT";
	}).map(function (eventName) {
		eventList[eventName] = exposedAPI[eventName]
				.toString().split("{")[0].split("(")[1].split(")")[0].split(",")
				.filter(function (v) {
					return v !== "state";
				})
				.map(function (v) {
					return v.trim();
				});
	});

	if (typeof exposedAPI.INIT === "function") {
		exposedAPI.INIT(state);
	}
	util.mapObject(exposedAPI, function (fun, eventName) {
		if (eventName === "INIT") {
			return;
		}
		dispatcher.subscribe(eventName, function (...data) {
			var cloneState = util.clone(state);
			fun(cloneState, ...data);
			state = cloneState;
			//Now trigger onChange.
			storeBus.publish("onChange");
		});
	});

	var store = {
		onChange(cb){
			return storeBus.subscribe("onChange", cb);
		},
		getState(){
			return state;
		},
		getAllEvents(){
			return eventList;
		}
	};
	return store;
}

module.exports = {
	createStore: createStore,
	dispatcher: dispatcher
};