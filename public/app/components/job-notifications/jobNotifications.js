/**
 * Created by Pancham Bhagwat on 09/26/2015.
 * Path: public/app/components/job-notifications/jobNotifications.js
 */

define(['app'], function (module) {

    'use strict';

    module.registerDirective('jobNotifications', function (connectionService, $state, DefaultApiService, facilityRouteService, $rootScope) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: '',
            link: function (scope, elements, attributes) {

                scope.jobAlerts = [];
                scope.notifyPriorityJobs = [];
                scope.notifyOtherJobs = [];

                scope.jobNotificationsHub = $rootScope.connection.jobNotificationsHub;

                var updateCountOnTab = function () {
                    _.forEach(scope.notificationTabs, function (tab) {
                        switch (tab.title) {
                            case "Alerts":
                                tab.length = scope.jobAlerts.length;
                                break;
                            case "Priority":
                                tab.length = scope.notifyPriorityJobs.length;
                                break;
                            case "Other":
                                tab.length = scope.notifyOtherJobs.length;
                                break;
                        }
                    });
                };

                if(!scope.jobNotificationsHub || !scope.summaryRetrieved) {
                    DefaultApiService.getAllListCall('JobNotifications')
                        .success(function (data) {
                            buildNotificationSource(data);
                        });
                }

                if (scope.jobNotificationsHub) {
                    scope.jobNotificationsHub.on('OnGetJobNotifications', function (data) {
                        buildNotificationSource(data);
                    });

                    scope.jobNotificationsHub.on('receiveJobNotification', function (data) {
                        addItemToList(data);
                    });

                    scope.jobNotificationsHub.on('removeJobNotification', function (id) {
                        scope.updateNotificationList(id);
                    });
                }

                scope.updateNotificationList = function(id){
                    _.remove(scope.jobAlerts, function (item) {
                        return item.id == id;
                    });
                    _.remove(scope.notifyPriorityJobs, function (item) {
                        return item.id == id;
                    });
                    _.remove(scope.notifyOtherJobs, function (item) {
                        return item.id == id;
                    });

                    updateCountOnTab();
                };


                scope.editJob = function (jobId, acknowledgeId) {

                    // TODO: Validate the connection state - PB: 10/27/2015
                    // if($rootScope.connection.hub.state && $.connection.hub.state != 1) {
                    if(!$rootScope.signalRConnected) {
                        connectionService.startConnection();
                    }

                    scope.acknowledgeJob(acknowledgeId);
                    $state.transitionTo(facilityRouteService.getJobViewScreen(), {id: jobId}, { reload: true, inherit: false, notify: true });
                };

                scope.acknowledgeJob = function (acknowledgeId) {

                    //SSM 10/12/15 - Remove Notification on Button Click
                    //Traverse up through ancestors in the DOM tree to closest li and remove
                    $('#' + acknowledgeId).closest( "li" ).fadeTo("fast", 0.00,function(){
                        $(this).slideUp("fast", function() { //slide up
                            $(this).remove(); //then remove from the DOM
                        });
                    });

                    scope.jobNotificationsHub = $rootScope.connection.jobNotificationsHub;

                    DefaultApiService.deleteObjectCall('JobNotifications', acknowledgeId)
                        .success(function () {
                            scope.updateNotificationList(acknowledgeId);
                        });

                    //if(!$rootScope.signalRConnected) {
                    //    DefaultApiService.deleteObjectCall('JobNotifications', acknowledgeId)
                    //        .success(function () {
                    //            scope.jobNotificationsHub.trigger('removeJobNotification', [acknowledgeId]);
                    //        });
                    //} else {
                    //    scope.jobNotificationsHub.server.acknowledgeJobNotification(acknowledgeId);
                    //}
                };

                var buildNotificationSource = function (items) {
                    scope.jobAlerts = [];
                    scope.notifyPriorityJobs = [];
                    scope.notifyOtherJobs = [];
                    scope.summaryRetrieved = true;

                    _.forEach(items, function (item) {
                        addItemToList(item)
                    });
                };

                var addItemToList = function (item) {
                    switch (item.notificationType) {
                        case 1:
                            item.status = 'Incoming';
                            scope.jobAlerts.push(item);
                            break;
                        case 2:
                            item.status = 'Accepted';
                            scope.jobAlerts.push(item);
                            break;
                        case 3:
                            item.status = 'Declined';
                            scope.jobAlerts.push(item);
                            break;
                        case 4:
                            item.status = 'Pickup';
                            scope.jobAlerts.push(item);
                            break;
                        case 5:
                            item.status = 'Redo';
                            scope.notifyPriorityJobs.push(item);
                            break;
                        case 6:
                            item.status = 'Rush';
                            scope.notifyPriorityJobs.push(item);
                            break;
                        case 7:
                            item.status = 'Hold';
                            scope.notifyPriorityJobs.push(item);
                            break;
                        case 8:
                            item.status = 'New';
                            scope.notifyOtherJobs.push(item);
                            break;
                        case 9:
                            item.status = 'PastDue';
                            scope.jobAlerts.push(item);
                            break;
                    }
                    updateCountOnTab();
                };

                scope.notificationTabs = [
                    {
                        "title": "Alerts",
                        "name": "alerts",
                        "category": 'alerts',
                        "length": 0
                    },
                    {
                        "title": "Priority",
                        "name": "priority",
                        "category": 'notifications',
                        "length": 0
                    },
                    {
                        "title": "Other",
                        "name": "notify",
                        "category": 'notifications',
                        "length": 0
                    }];

                connectionService.startConnection();
            }
        }
    });
});
