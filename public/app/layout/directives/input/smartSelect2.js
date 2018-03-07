/**
 * Created by Shawn Miller on 7/13/2015
 * Path: public/app/layout/directives/input/smartSelect2.js
 * Notes:  Select2
 *         The jQuery replacement for searchable select boxes
 *         https://select2.github.io/
 */
define(['layout/module', 'select2'], function (module) {

	'use strict';

	module.registerDirective('smartSelect2', function () {
		return {
			restrict: 'A',
			link: function (scope, element, attributes) {
				//element.removeAttr('smart-select2 data-smart-select2');

				var initSelect2 = function(){
					element.select2({
						theme: "bootstrap",
						placeholder: "-- Select --"
					});
				};
				initSelect2();

				scope.initSelect2 = function(){
					initSelect2();
				};
			}
		}
	});
});