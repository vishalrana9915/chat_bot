/**
 * Created by Shawn Miller on 12/1/2015.
 * Path: public/app/layout/directives/input/autoComplete.js
 */
define(['layout/module', 'jquery-ui'], function (module) {

	'use strict';

	module.registerDirective('autoComplete', function () {
		return {
			restrict: 'A',
			scope: {
				'source': '='
			},
			link: function (scope, element, attributes) {

				element.autocomplete({
					source: scope.source
				});
			}
		}
	});
});
