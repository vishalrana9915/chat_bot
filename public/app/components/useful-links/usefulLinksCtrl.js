/**
 * Created by Shawn Miller on 6/29/2015.
 * Path: public/app/components/useful-links/usefulLinksCtrl.js
 */
define(['app'], function (module) {

    "use strict";

    module.registerController('usefulLinksCtrl', function ($scope,DefaultApiService) {
        $scope.usefulLink = undefined;
        //DefaultApiService.getAllListCall('HomeDashboardSummary')
        //    .success(function (data) {
        //        $scope.systemSettings = data;
        //        $scope.usefulLinks = $scope.systemSettings.usefulLinks;
        //    });

        //var getdata=function(){
        //    var index=  _.findIndex($scope.systemSettings, function(chr) {
        //        return chr.name == 'System.usefulLink';
        //    });
        //    // get index of announcement
        //    $scope.usefulLink=$scope.systemSettings[index];
        //}
    });

});
