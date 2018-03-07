/**
 * Created by Shawn Miller on 6/1/2015.
 * Path: public/app/layout/filters/phoneFilter.js
 */
define(['layout/module'], function (module) {

	'use strict';

	module.registerFilter('phoneType', function ($rootScope) {

		return function (telType) {

			var telStringType = '';

			switch(telType){
				case 1:
					telStringType =  $rootScope.getWord('Work');
					break;
				case 2:
					telStringType = $rootScope.getWord('Mobile');
					break;
				case 3:
					telStringType =  $rootScope.getWord('Home');
					break;
				case 4:
					telStringType =  $rootScope.getWord('Fax');
					break;
				default:
					telStringType =  $rootScope.getWord('Unknown');
			}
			return telStringType;
		};

	});
});