/**
 * Created by Shawn Miller on 5/12/2015.
 * Path: public/app/layout/directives/assignActions.js
 */
define(['layout/module'], function (module) {

	'use strict';
	module.registerDirective('assignActions', function ($compile) {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'app/layout/partials/assign-actions.tpl.html',
			link:function(scope, element, attributes) {

				/*attributes.$set('ngClick', attributes.function);
				$compile(element)(scope);*/
			}
		}
	});
});


