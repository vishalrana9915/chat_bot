/**
 * Created by Dante G. on 9/15/2016.
 * Path: public/app/layout/directives/editor/goJS.js
 *
 */
define(['layout/module', 'go-js', 'go-inspector'], function (module) {

	'use strict';

	return module.registerDirective('goJs', function () {
		return {
			restrict: 'EA',
			link: function (scope) {

				scope.gj = go.GraphObject.make;  // for conciseness in defining templates
			}
		}
	});
});