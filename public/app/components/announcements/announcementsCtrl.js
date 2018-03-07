/**
 * Created by Shawn Miller on 6/29/2015.
 * Path: public/app/components/announcements/announcementsCtrl.js
 */
define(['app'], function (module) {

    "use strict";

    module.registerController('announcementsCtrl', function ($scope,DefaultApiService) {
        $scope.announcements = undefined;

        //DefaultApiService.getAllListCall('HomeDashboardSummary')
        //    .success(function (data) {
        //        $scope.systemSettings = data;
        //        $scope.binSummary = $scope.systemSettings.binSummary;
        //        $scope.jobSummary = $scope.systemSettings.jobSummary;
        //        $scope.orderSummary = $scope.systemSettings.orderSummary;
        //        $scope.usefulLinks = $scope.systemSettings.usefulLinks;
        //        $scope.announcement = $scope.systemSettings.announcements;
        //    });
    });

});
