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
			output = 'data:image/jpeg;base64,/' + btoa(collection)

			return output;
		};
	});
});