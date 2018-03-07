/**
 * Created by Shawn Miller on 8/18/2015.
 * Path: public/app/layout/directives/ui/jquiTabs.js
 */
define(['layout/module', 'jquery-ui'], function (module) {

	'use strict';

	module.registerDirective('jquiTabs', function () {
		return {
			restrict: 'A',
			link: function (scope, element, attributes) {

				element.tabs();
			}
		}
	});
});
