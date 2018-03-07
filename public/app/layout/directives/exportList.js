/**
 * Created by Pancham Bhagwat on 5/28/2015.
 * Path: public/app/layout/directives/exportList.js
 */
define(['layout/module',
], function (module) {

	'use strict';

	module.registerDirective('exportList', function () {
		return {
			restrict: 'E',
			replace: true,
			template: '<button type="button" id="btnExport" ng-click="exportDataList()" class="btn btn-default btn-sm">Export</button>',
			link: function(scope, element, attributes){
			},
			controller: function($scope){
				$scope.exportDataList = function () {
					window.open($scope.exportUrl + "&format=csv", '_blank');
				};
			}
		}
	});
});