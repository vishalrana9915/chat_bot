/**
 * Created by Vishal rana .
 * Path: public/app/layout/directives/customSpinner.js
 * Notes: Directive for using the spin.js plugin
 */
define(['app', 'jquery', 'spinner-js', 'lodash'],
	function (module, $, Spinner, _) {
		'use strict';

		module.registerDirective('sideInitials', function ($rootScope) {
			return {
				restrict: 'EA',
				replace: true,
				templateUrl: 'app/modules/dashboard/partials/side.html',
				link: function (scope, element, attributes) {


			}
}

		});

	});