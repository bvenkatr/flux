/**
 * Created by narendrasisodiya on 11/03/16.
 */

module.exports = {
	clone(obj) {
		return JSON.parse(JSON.stringify(obj));
	},
	mapObject(obj, cb){
		var a = [];
		Object.keys(obj).map(function (key) {
			a.push(cb(obj[key], key));
		});
		return a;
	}
};