/**
 * Created by Shawn Miller on 5/12/2015.
 * Path: app/layout/directives/access-level-buttons.js
 */
define(['layout/module'], function (module) {

    'use strict';

    module.registerDirective('accessButtons', function ($rootScope) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'app/layout/partials/access-buttons-sys-admin.tpl.html',
            link: function (scope, element, attrs) {

                var accessLevelView = attrs.accessLevel;

                var defaultLevel = attrs.defaultLevel ? parseInt(attrs.defaultLevel) : 'undefined';

                scope.accessLevel = {
                    access: 3
                };

                scope.showGlobal = false;
                scope.showGroup = false;
                scope.showFacility = false;

                $("#globalSelectBtn").click(function () {
                    scope.objectFacilityGroupId = undefined;
                    scope.objectFacilityId = undefined;
                });

                $("#groupSelectBtn").click(function () {
                    scope.objectFacilityGroupId = $rootScope.user.curFacilityGrpId;
                    scope.objectFacilityId = undefined;
                });

                $("#facilitySelectBtn").click(function () {
                    scope.objectFacilityId = $rootScope.user.curFacilityId;
                    scope.objectFacilityGroupId = undefined;
                });

                if ($rootScope.user){

                    $("#facilitySelectBtn").click();
                    scope.objectFacilityId = $rootScope.user.curFacilityId;
                    scope.objectFacilityGroupId = undefined;

                    if ($rootScope.user.isSysAdmin || defaultLevel == 1) {
                        $("#globalSelectBtn").click();
                        scope.objectFacilityGroupId = undefined;
                        scope.objectFacilityId = undefined;
                    }
                    if ($rootScope.user.isFacGrpAdmin || defaultLevel == 2) {
                        $("#groupSelectBtn").click();
                        scope.objectFacilityGroupId = $rootScope.user.curFacilityGrpId;
                        scope.objectFacilityId = undefined;
                    }
                    if (defaultLevel == 3) {
                        $("#facilitySelectBtn").click();
                        scope.objectFacilityId = $rootScope.user.curFacilityId;
                        scope.objectFacilityGroupId = undefined;
                    }
                }


                switch (parseInt(accessLevelView)) {
                    case 1:
                        scope.showGlobal = true;
                        break;
                    case 2:
                        scope.showGroup = true;
                        break;
                    case 3:
                        scope.showFacility = true;
                }
            }
        }
    });
});


