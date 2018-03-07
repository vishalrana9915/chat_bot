/**
 * Created by DanGar on 8/26/2016.
 * Path: ../app/components/frontend-session-validations/userSessionService.js
 */


define(['app'], function (module) {

    'use strict';

    module.registerService('userSessionService', function () {

        var userInfo = {};
        var userEnums = {
            systemAdmin : 1,
            facilityGroupAdmin : 2,
            facilityAdmin : 3
        };

        return {

            userSystemAdminEnum : userEnums.systemAdmin,
            userFacilityGroupAdminEnum : userEnums.facilityGroupAdmin,
            userFacilityAdminEnum : userEnums.facilityAdmin,
            getUserLevel : function(){

                userInfo.adminType = 4;

                var isSystemAdmin =  userInfo.isSystemAdmin ? userInfo.isSystemAdmin.toString() : localStorage.getItem('isSystemAdmin');
                var isFacilityGroupAdmin =  userInfo.isFacilityGroupAdmin ? userInfo.isFacilityGroupAdmin.toString() : localStorage.getItem('isFacilityGroupAdmin');
                var isFacilityAdmin =  userInfo.isFacilityAdmin ? userInfo.isFacilityAdmin.toString() : localStorage.getItem('isFacilityAdmin');

                switch("true"){
                    case isFacilityGroupAdmin :
                        userInfo.adminType = userEnums.facilityGroupAdmin;
                        break;
                    case isFacilityAdmin :
                        userInfo.adminType = userEnums.facilityAdmin;
                        break;
                    case isSystemAdmin :
                        userInfo.adminType = userEnums.systemAdmin;
                        break;
                }

                return userInfo.adminType;
            },
            getUserFacilityId : function(){

                return userInfo.currentFacilityId || localStorage.getItem('CurrentFacilityId');
            },
            getUserGroupFacilityId : function(){

                return userInfo.currentFacilityGroupId  || localStorage.getItem('CurrentFacilityGroupId');
            },
            setUserSessionInfo : function(data){

                localStorage.setItem('CurrentFacilityId', data.currentFacilityId);
                localStorage.setItem('curFacilityName', data.currentFacility);
                localStorage.setItem('CurrentFacilityGroupId', data.currentFacilityGroupId);
                localStorage.setItem('CurrentFacilityCountry', data.currentFacilityCountry);
                localStorage.setItem('defaultCurrency', data.defaultCurrency);
                localStorage.setItem('curFacilityType', data.currentFacilityType);
                localStorage.setItem('isSystemAdmin', data.isSystemAdmin);
                localStorage.setItem('isFacilityAdmin', data.isFacilityAdmin);
                localStorage.setItem('isFacilityGroupAdmin', data.isFacilityGroupAdmin);

                userInfo = data;
            }
        };

    });
});