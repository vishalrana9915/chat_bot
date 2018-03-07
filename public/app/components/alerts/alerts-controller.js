/**
 * Created by Shawn Miller on 7/28/2015.
 * Path: public/app/components/alerts/alerts-controller.js
 */

define(['app'], function (app) {

	"use strict";

	return app.controller("AlertsCtrl", AlertsCtrl)

		.filter('alertClass', function () {
			return function (input) {
				input = input || '';
				switch (input) {
					case 'Incoming':
						return 'label-success';
					case 'Accepted':
						return 'label-info';
					case 'Declined':
						return 'label-danger';
					case 'Pickup':
                        return 'label-warning';
                    case 'PastDue':
						return 'label-danger';
				}
				return;
			};
		});

	function AlertsCtrl($scope, alertService) {

		//Define Scope to avoid collisions
		$scope.activeAlertTab = 'priority';
		$scope.jobAlerts = [];
		$scope.notifyPriorityJobs = [];
		$scope.notifyOtherJobs = [];

		$scope.jobNotificationsHub = $.connection.jobNotificationsHub;

        if($scope.jobNotificationsHub) {
            $scope.jobNotificationsHub.on('OnGetJobNotifications', function (data) {
                buildNotificationSource(data);
            });

            $scope.jobNotificationsHub.on('receiveJobNotification', function (data) {
                addItemToList(data)
            });

            $scope.jobNotificationsHub.on('removeJobNotification', function (id) {
                _.remove($scope.jobAlerts, function(item) {
                    return item.Id == id;
                });
                _.remove($scope.notifyPriorityJobs, function(item) {
                    return item.Id == id;
                });
                _.remove($scope.notifyOtherJobs, function(item) {
                    return item.Id == id;
                });
            });
        }

        $scope.editJob = function(jobId, acknowledgeId){
            $scope.acknowledgeJob(acknowledgeId);
            $('#activity').click();
            $state.transitionTo('app.jobs.jobs-details', {id: jobId});
        };

		$scope.acknowledgeJob = function(acknowledgeId){
			$scope.jobNotificationsHub.server.acknowledgeJobNotification(acknowledgeId);
		};

		var buildNotificationSource = function(items){
			$scope.jobAlerts = [];
			$scope.notifyPriorityJobs = [];
			$scope.notifyOtherJobs = [];

            _.forEach(items, function(item){
                addItemToList(item)
            });
		};

        var addItemToList = function(item){
            switch(item.NotificationType)
            {
                case 1:
                    item.Status = 'Incoming';
                    $scope.jobAlerts.push(item);
                    break;
                case 2:
                    item.Status = 'Accepted';
                    $scope.jobAlerts.push(item);
                    break;
                case 3:
                    item.Status = 'Declined';
                    $scope.jobAlerts.push(item);
                    break;
                case 4:
                    item.Status = 'Pickup';
                    $scope.jobAlerts.push(item);
                    break;
                case 5:
                    item.Status = 'Redo';
                    $scope.notifyPriorityJobs.push(item);
                    break;
                case 6:
                    item.Status = 'Rush';
                    $scope.notifyPriorityJobs.push(item);
                    break;
                case 7:
                    item.Status = 'Hold';
                    $scope.notifyPriorityJobs.push(item);
                    break;
                case 8:
                    item.Status = 'New';
                    $scope.notifyOtherJobs.push(item);
                    break;
                case 9:
                    item.Status = 'PastDue';
                    $scope.jobAlerts.push(item);
                    break;
            }
        };

		// Getting the different type of alerts
		// TODO: If we have only one type we need to set a class on the ajax-dropdown container
		alertService.get(function () {
			alertService.get(function (data) {
				$scope.alerts = data.alerts;
			});
		});

		$scope.isActiveAlert = function (tab) {
			return $scope.activeAlertTab === tab;
		};

		$scope.setAlertTab = function (alertType) {
			$scope.activeAlertTab = alertType;
		};

		//TODO: Select active tab, we only have one in this case
		$scope.setAlertTab("alerts");

	}

});