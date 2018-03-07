/**
 * Created by Dante Garcia on 3/3/2016.
 * Path: public/app/layout/filters/carriageReturnFilter.js
 */

define(['layout/module'], function (module) {

	'use strict';

	module.registerFilter('carriageReturn', function () {

		return function (input) {
			var textString = input.replace(/\n/g, "<br />");
			return textString;
		};

	});
});