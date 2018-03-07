/**
 * Created by Dante Garcia on 1/22/16.
 * path: app/layout/filters/distanceFilter.js
 */


define(['layout/module'], function (module) {

	'use strict';

	module.registerFilter('pressColor', function($rootScope) {


		return function(colors){
			var returnColors = "";
			var processColors = "";
			var spotColors = [];

			if(colors){
				var colorString = $rootScope.getWord('Color');
				var blackWhiteString = $rootScope.getWord('BlackAndWhite');

				if (colors.indexOf('|') > -1)
				{
					processColors = colors.split('|')[0].toUpperCase();
					spotColors = colors.split('|')[1].split(',');
				}
				else
				{
					processColors = colors;
				}

				if (processColors == "CMYK")
					returnColors = colorString;
				else if (processColors == "K")
					returnColors = blackWhiteString;
				else if (processColors.length > 0)
					returnColors = processColors;

				if (spotColors.length > 0 && spotColors != "")
				{
					_.forEach(spotColors, function(spot){
						returnColors += ", " + spot;
					});
				}
			}

			return returnColors;
		};
	});
});