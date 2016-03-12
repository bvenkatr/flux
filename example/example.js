import { dispatcher, createStore} from '@nsisodiya/flux';


var counterStore = createStore({
	INIT: function (state) {
		state.count = 0;
	},
	COUNTER_INCREMENT: function (state) {
		state.count = state.count + 1;
	},
	COUNTER_INCREMENT_NUM: function (state, num) {
		state.count = state.count + num;
	},
	COUNTER_DECREMENT: function (state) {
		state.count = state.count - 1;
	}
});


counterStore.onChange(() => {
	console.log("New State is ", counterStore.getState());
});


dispatcher.subscribeAll((evtName, args) => {
	console.log("Some Event was Fired", evtName, args);
});

dispatcher.publish('COUNTER_INCREMENT');
dispatcher.publish('COUNTER_INCREMENT');
dispatcher.publish('COUNTER_INCREMENT_NUM', 3);
dispatcher.publish('COUNTER_DECREMENT');
dispatcher.publish('COUNTER_INCREMENT');

console.log("All Events", counterStore.getAllEvents());
