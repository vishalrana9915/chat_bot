/**
 * Created by Dante Garcia on 5/4/2016.
 * Path: app/layout/filters/customerNameLnFnParsing.js
 */

define(['layout/module'], function (module) {

	'use strict';

	module.registerFilter('lnFnNameParse', function () {

		return function (lastName, firstName) {

			var strLastName, strFirstName, strName;
			strName = "";

			strLastName = (lastName) ? lastName.trim() : '';
			strFirstName = (firstName) ? firstName.trim() : '';

			strName += (strLastName) ? strLastName : '';
			strName += (strFirstName) ? (strLastName ? ', ' + strFirstName : strFirstName) : ('');

			return strName.trim();
		};

	});
});