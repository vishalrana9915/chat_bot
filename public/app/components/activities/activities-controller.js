/**
 * Created by Shawn Miller on 4/26/2015.
 * Path: app/components/activities/activities-controller.js
 */

define(['app'], function (app) {
	"use strict";

	return app.controller("ActivitiesCtrl", ActivitiesCtrl)

		.filter('reverse', function () {
			return function (input, uppercase) {
				input = input || '';
				var out = "";
				for (var i = 0; i < input.length; i++) {
					out = input.charAt(i) + out;
				}
				// conditional based on optional argument
				if (uppercase) {
					out = out.toUpperCase();
				}
				return out;
			};
		})

		.filter('priority', function () {
			return function (input) {
				input = input || '';
				switch (input) {
					case 'Redo':
						return 'label-danger';
					case 'Rush':
						return 'label-warning';
					case 'Hold':
						return 'label-info';
					case 'New':
						return 'label-success';
					case 'PastDue':
						return 'label-danger';
				}
				return;
			};
		})


		.filter('alertClass', function () {
			return function (input) {
				input = input || '';
				switch (input) {
					case 'Declined':
					case 'Redo':
						return 'label-danger';
					case 'Accepted':
						return 'label-info';
					case 'Incoming':
						return 'label-success';
					case 'Pickup':
					case 'Rush':
					case 'On-Hold':
						return 'label-warning';
				}
				return;
			};
		})

		.filter('bdp1', function () {
			return function (input) {

				input = input || '';
				var out = "";

				if (input === '1') {
					out = "<i class='fa fa-university fa-lg' title='Staples Rewards'></i>";
				} else if (input === '2') {
					out = "<i class='fa fa-certificate fa-lg' title='Staples Rewards'></i>";
				} else if (input === '3') {
					out = "<i class='fa fa-briefcase fa-2x' title='Staples Rewards'></i>";
				}

				return out;
			};
		});

	function ActivitiesCtrl($scope, $log, activityService, $state) {

		$scope.activeTab = 'priority';

		// Getting different type of activities
		activityService.get(function (data) {
			$scope.activities = data.activities;
		});

		$scope.isActive = function (tab) {
			return $scope.activeTab === tab;
		};

		$scope.setTab = function (activityType) {
			$scope.activeTab = activityType;
		};

		$scope.editJob = function(jobId, acknowledgeId){
			$scope.acknowledgeJob(acknowledgeId);
			$('#activity').click();
			$state.transitionTo('app.jobs.jobs-details', {id: jobId});
		};

		$scope.acknowledgeJob = function(acknowledgeId){
			$scope.jobNotificationsHub.server.acknowledgeJobNotification(acknowledgeId);
		};

	}

});