/**
 * Created by Shawn Miller on 9/10/2015.
 * Path: public/app/layout/directives/ui/navigation.js
 */

define(['layout/module'], function (module) {

	'use strict';

	return module.registerDirective('smartNavigation', function () {

		return {
			restrict: 'A',

			scope: {
				group: '@',
				output: '='
			},

			link: function (scope, element, attributes) {


			}//eo link

		}//eo return

	});//eo module

});//eo define