/**
 * Created by Pardha on 6/1/2015.
 * Path: public/app/layout/directives/backToList.js
 */
define(['layout/module'
], function (module) {

	'use strict';

	module.registerDirective('backToList', function () {

		return {

			restrict: 'E',
			replace: true,
			templateUrl: 'app/layout/partials/back-to-list.tpl.html',

			link:function(scope, elements, attributes){

				if(attributes.label) {
					attributes.buttonLabel = attributes.label;
				}

				scope.buttonLabel = attributes.buttonLabel;

			}
		}
	});
});
