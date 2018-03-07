/**
 * Created by pmugunda on 10/7/2015.
 * public/app/layout/directives/navigation.js
 */

define(['layout/module'], function (module) {

	'use strict';

	module.registerDirective('systemMenu', function ($rootScope, $state, $log, buildInfo) {
		return {

			restrict: 'A',
			link    : function (scope, element, attrs) {

				scope.hideRoute = false;

				scope.getContentUrl = function () {

					if ($rootScope.user) {

						if ($rootScope.user.curFacilityCountry == 'US') {

							if ($rootScope.user.curFacilityType == 1) {
								scope.hideRoute = true;
							}

						}

						if ($rootScope.user.isSysAdmin) {
							return buildInfo.correctPath('app/layout/partials/navigation-system-admin.tpl.html');
						}

						else if ($rootScope.user.isFacGrpAdmin) {
							return buildInfo.correctPath('app/layout/partials/navigation-group-admin.tpl.html');
						}

						else if ($rootScope.user.isFacAdmin) {
							return buildInfo.correctPath('app/layout/partials/navigation-group-admin.tpl.html');
						}

						else {
							return buildInfo.correctPath('app/layout/partials/navigation-user.tpl.html');
						}
					}

					return buildInfo.correctPath('app/layout/partials/navigation-user.tpl.html');
				}
			},

			template: '<div ng-include="getContentUrl()"></div>'
		}


		/*
		return {
			restrict: 'EA',
			replace : true,
			//templateUrl: 'app/layout/partials/navigation.tpl.html',
			compile : function (tElement, tAttributes) {

				var directive = {};

				directive.restrict = 'E';
				/!* restrict this directive to elements *!/

				$rootScope.getSystemMenu = function () {
					if ($rootScope.user) {

						if ($rootScope.user.isSysAdmin)
							directive.templateUrl = 'app/layout/partials/navigation.tpl.html';
						else
							directive.templateUrl = 'app/layout/partials/navigation-user.tpl.html';
					}

				};
				$rootScope.getSystemMenu();
				return directive;
			}
		}
		*/

	})

});

