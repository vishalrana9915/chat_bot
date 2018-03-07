/**
 * Created by Pancham Bhagwat on 06/24/2015.
 * Path: public/app/layout/directives/accessLevelButtonsParentChild.js
 */
define(['layout/module'], function (module) {

    'use strict';

    module.registerDirective('accessLevelButtonsParentChild', function ($rootScope) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'app/layout/partials/access-buttons-parent-child.tpl.html',
            link:function(scope, element, attrs){

                var childLevel = attrs.accessLevel;

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

                if($rootScope.user) {
                    if ($rootScope.user.isSysAdmin) {
                        scope.objectFacilityGroupId = undefined;
                        scope.objectFacilityId = undefined;
                    }
                    else if ($rootScope.user.isFacGrpAdmin) {
                        scope.objectFacilityGroupId = $rootScope.user.curFacilityGrpId;
                        scope.objectFacilityId = undefined;
                    }
                    else {
                        scope.objectFacilityId = $rootScope.user.curFacilityId;
                        scope.objectFacilityGroupId = undefined;
                    }
                }

                scope.showGlobal = false;
                scope.showGroup = false;
                scope.showFacility = false;

                if(scope.id) {
                    switch (parseInt(childLevel)) {
                        case 1:
                            scope.showGlobal = true;
                            scope.showGroup = false;
                            scope.showFacility = false;
                            break;
                        case 2:
                            scope.showGroup = true;
                            scope.showGlobal = false;
                            scope.showFacility = false;
                            break;
                        case 3:
                            scope.showFacility = true;
                            scope.showGlobal = false;
                            scope.showGroup = false;
                            break;
                    }
                }
                else {
                    if(scope.parentLevel == 1)
                    {
                        scope.showGlobal = true;
                        scope.showGroup = true;
                        scope.showFacility = true;
                        $("#globalSelectBtn").click();
                    }
                    else if(scope.parentLevel == 2)
                    {
                        scope.showGlobal = false;
                        scope.showGroup = true;
                        scope.showFacility = true;
                        $("#groupSelectBtn").click();
                    }
                    else if(scope.parentLevel == 3)
                    {
                        scope.showGlobal = false;
                        scope.showGroup = false;
                        scope.showFacility = false;
                        $("#facilitySelectBtn").click();
                    }
                }
            }
        }
    });
});


