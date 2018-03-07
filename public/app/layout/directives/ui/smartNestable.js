/**
 * Created by Shawn Miller on 8/19/2015.
 * Path: public/app/layout/directives/ui/smartNestable.js
 */
define(['layout/module','jquery-nestable'], function (module) {

	'use strict';

	return module.registerDirective('smartNestable', function () {

		return {
			restrict: 'A',
			scope: {
				group: '@',
				output: '='
			},
			link: function (scope, element, attributes) {
				var options = {};
				if(scope.group){
					options.group = scope.group;
				}

				element.nestable(options);

				if(attributes.output){
					element.on('change', function(){
						scope.$apply(function(){
							scope.output = element.nestable('serialize');
						});
					});
					scope.output = element.nestable('serialize');
				}//eo if()

			}//eo link

		}//eo return

	});//eo module

});//eo define