/**
 * Created by Shawn Miller on 5/28/2015.
 * Path: public/app/layout/directives/smartSearch.js
 */
define(['layout/module', 'lodash'
], function (module, _) {

	'use strict';

	module.registerDirective('smartSearch', function ($rootScope) {
		return {
			restrict: 'E',
			replace: false,
			templateUrl: 'app/layout/partials/smart-search.tpl.html',
			link: function(scope){
				scope.field = undefined;
				scope.searchByList = [];
				scope.searchByList =
					[
						{ name: 'Customer Name', displayName: $rootScope.getWord('CustomerName'), backendName: 'CustomerName', id: 0 }
					];

				if (scope.object == 'Jobs' || scope.object == 'JobsPendingRoute') {
					scope.searchByList.push({name: 'Company Name', displayName: $rootScope.getWord('CompanyName'), backendName: 'CompanyName', id: 1});
					scope.searchByList.push({name: 'Phone Number', displayName: $rootScope.getWord('PhoneNumber'), backendName: 'BillToPhoneNumber', id: 2});
					scope.searchByList.push({name: 'Job Number', displayName: $rootScope.getWord('JobNumber'), backendName: 'JobNo', id: 3});
					scope.searchByList.push({name: 'Order Number', displayName: $rootScope.getWord('OrderNumber'), backendName: 'OrderNo', id: 4});
				}

				//if(scope.object == 'Orders' || scope.object == 'OrdersArchive') {
				if(scope.object == 'Orders' || scope.object == 'ClosedOrders') {
					scope.searchByList.push({name: 'Company Name', displayName: $rootScope.getWord('CompanyName'), backendName: 'BillToCompanyName', id: 1});
					scope.searchByList.push({name: 'Order Number', displayName: $rootScope.getWord('OrderNumber'), backendName: 'OrderNo', id: 2});
					scope.searchByList.push({name: 'Phone Number', displayName: $rootScope.getWord('PhoneNumber'), backendName: 'BillToPhoneNumber', id: 3});
				}

				scope.selectSearchBy = function (field) {
				    scope.searchBy = _(scope.searchByList)
						.filter(function(item) { return item.name == field; })
						.value()[0];
				};

				// default search
				if(scope.searchBy)
					scope.searchBy = scope.searchByList[scope.searchBy.id];
				else
					scope.searchBy = scope.searchByList[0];
			}
		}
	});
});