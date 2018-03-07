/**
 * Created by Pancham Bhagwat on 09/30/2015.
 * Path: public/app/layout/filters/uniqueFilter.js
 */

define(['layout/module'], function (module) {

	'use strict';

	module.registerFilter('uniqueFilter', function() {

		return function(collection, keyname) {
			var output = [],
				keys = [];

			angular.forEach(collection, function(item) {
				var key = item[keyname];
				if(keys.indexOf(key) === -1) {
					keys.push(key);
					output.push(item);
				}
			});

			return output;
		};
	});
});