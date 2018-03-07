/**
 * Created by Shawn Miller on 5/28/2015.
 * Path: public/app/layout/directives/datatableFilters.js
 */
define(['layout/module'], function (module) {

	'use strict';

	module.registerDirective('datatableFilters', function ($rootScope) {

		return {

			restrict: 'E',
			replace: false,
			templateUrl: 'app/layout/partials/datatable-filters.tpl.html',

			controller: function ($scope) {

				$scope.curFacilityType = $rootScope.user ? $rootScope.user.curFacilityType : localStorage.getItem('curFacilityType');

				$scope.updateFromToDate = function () {
					if (!$scope.dateType) {
						$scope.fromDate = null;
						$scope.toDate = null;
					}
				};

				$scope.updateFromToDate();

				$scope.showCategoryFilter = function () {
					if ($scope.object == "JobsPendingRoute") {
						return true;
					}

					return $scope.curFacilityType == 2 && $scope.object == "Jobs" ? 1 : 0;
				};

				$scope.showLoyaltyStatus = function () {
					if ($scope.object == "JobsPendingRoute") {
						return false;
					}

					return $scope.curFacilityType == 2 && $scope.object == "Jobs" ? 0 : 1;
				};

				$scope.showJobStatus = function () {
					return $scope.object == "Jobs" || $scope.object == "JobsPendingRoute";
				};

				$scope.showOrderStatus = function () {
					return $scope.object == "Orders" || $scope.object == "ClosedOrders";
				};

				$scope.showJobPriority = function () {
					return $scope.object == "Jobs" || $scope.object == "JobsPendingRoute";
				};

				$scope.showOrderPriority = function () {
					return $scope.object == "Orders" || $scope.object == "ClosedOrders";
				};

				$scope.showSearchJobs = function () {
					return $scope.object == "Jobs" || $scope.object == "JobsPendingRoute";
				};

				$scope.showSearchOrders = function () {
					return $scope.object == "Orders" || $scope.object == "ClosedOrders";
				};

				$scope.showIsPastDue = function () {
					//if ($scope.curFacilityType == 2)
					//	return false;
					return $scope.object == 'Orders' || $scope.object == 'Jobs' || $scope.object == "JobsPendingRoute";
				};

				$scope.checkObject = function (object) {
					if (object == $scope.object)
						return true;

					if (object == 'Orders' && $scope.object == 'ClosedOrders')
						return true;
				};
			}
		}

	});
});