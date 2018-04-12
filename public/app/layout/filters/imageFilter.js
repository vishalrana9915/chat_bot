/**
 * Created by Vishal rana .
 * Path: public/app/layout/filters/imageFilter.js
 */

define(['app'], function (module) {

	'use strict';

	module.registerFilter('imageFilter', function() {

		return function(collection, keyname) {
			var output = [],
				keys = [];
				console.log(JSON.stringify(collection))
			// angular.forEach(collection, function(item) {
			// 	var key = item[keyname];
			// 	if(keys.indexOf(key) === -1) {
			// 		keys.push(key);
			// 		output.push(item);
			// 	}
			// });
			output = 'data:image/jpeg;base64,/' + btoa(collection)

			return output;
		};
	});
});