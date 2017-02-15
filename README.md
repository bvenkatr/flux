# @nsisodiya/flux
Simple Flux Implementation

# Installation

```
npm install --save @nsisodiya/flux
```

# Usage - Basic Store
 
```js
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
```

# Usage - Listening Changes from Store, and Publishing Events


```js
import counterStore from "./counterStore";
counterStore.onChange(() => {
  console.log("New State is ", counterStore.getState());
});

dispatcher.publish('COUNTER_INCREMENT');
dispatcher.publish('COUNTER_INCREMENT');
dispatcher.publish('COUNTER_INCREMENT_NUM', 3);
dispatcher.publish('COUNTER_DECREMENT');
dispatcher.publish('COUNTER_INCREMENT');

/* OutPut
New State is  Object {count: 1}
Some Event was Fired COUNTER_INCREMENT undefined
New State is  Object {count: 2}
Some Event was Fired COUNTER_INCREMENT undefined
New State is  Object {count: 5}
Some Event was Fired COUNTER_INCREMENT_NUM 3
New State is  Object {count: 4}
Some Event was Fired COUNTER_DECREMENT undefined
New State is  Object {count: 5}
Some Event was Fired COUNTER_INCREMENT undefined
*/
```

# Advance Usage - Reading State of One Store from Another

`counterStore.js`
```js
import { dispatcher, createStore} from '@nsisodiya/flux';

var counterStore = createStore({
  INIT: function (state) {
    state.count = 0;
  },
  COUNTER_INCREMENT: function (state) {
    state.count = state.count + 1;
  },
  COUNTER_DECREMENT: function (state) {
    state.count = state.count - 1;
  }
});
export default counterStore;
```

`uploadCountStore.js`
```js
import { dispatcher, createStore} from '@nsisodiya/flux';
import counterStore from "./counterStore";

var uploadCountStore = createStore({
  INIT: function (state) {
  },
  UPLOAD_COUNT_STATUS: function (state) {
    AjaxUploader({
      count: counterStore.getState().count
    })
  }
});
export default uploadCountStore;
```

# Advance Usage - Modify State in Async Callback

`uploadCountStore.js`
```js
import { dispatcher, createStore} from '@nsisodiya/flux';
import counterStore from "./counterStore";

var uploadCountStore = createStore({
  INIT: function (state) {
    state.loading = false;
  },
  UPLOAD_COUNT_STATUS: function (state) {
    state.loading = true;
    AjaxUploader({
      count: counterStore.getState().count
    }).then(function(){
      //Assume Success
      dispatcher.publish('UPLOAD_COUNT_STATUS_SUCCESS');
    })
  },
  UPLOAD_COUNT_STATUS_SUCCESS: function (state) {
    state.loading = true;
  }
});
export default uploadCountStore;
```


# Advance Usage - Triggering Store Action from Different Store

`uploadCountStore.js`
```js
import { dispatcher, createStore} from '@nsisodiya/flux';
import counterStore from "./counterStore";

var uploadCountStore = createStore({
   INIT: function (state) {
    state.loading = false;
  },
  UPLOAD_COUNT_STATUS: function (state) {
    state.loading = true;
    AjaxUploader({
        count: counterStore.getState().count
    }).then(function(){
        //Assume Success
        dispatcher.publish('UPLOAD_COUNT_STATUS_SUCCESS');
        dispatcher.publish('SHOW_NOTIFICATION', "Counter Successfully Saved");
    })
  },
  UPLOAD_COUNT_STATUS_SUCCESS: function (state) {
    state.loading = true;
  }
});
export default uploadCountStore;
```

notificationStore.js
```js
import { dispatcher, createStore} from '@nsisodiya/flux';

var notificationStore = createStore({
  INIT: function (state) {
    state.showMsg = false;
  },
  SHOW_NOTIFICATION: function (state, msg) {
    state.msg = msg;
    state.showMsg = true;
    //Bla, bla,
  },
  SHOW_NOTIFICATION: function (state) {
    state.showMsg = false;
  }
});
export default notificationStore;
```
