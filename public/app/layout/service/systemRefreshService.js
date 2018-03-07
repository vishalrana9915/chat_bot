/**
 * Created by DanGar on 10/12/2015.
 * layout/service/systemRefreshService.js
 */

define(['layout/module'], function (module) {

    'use strict';

    module.registerService('systemRefreshService', function () {

        var facilitiesRefreshNeeded = '';

        return {
            facilitiesRefreshNeeded : function(){
                facilitiesRefreshNeeded= true;
            },
            getFacilitiesRefreshFlag : function(){
                return facilitiesRefreshNeeded;
            },
            resetFacilityFreshFlag : function(){
                facilitiesRefreshNeeded = false;
            }
        }
    });
});