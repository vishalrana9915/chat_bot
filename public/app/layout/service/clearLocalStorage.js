/**
 * Path: public/app/layout/service/clearLocalStorage.js
 * Created by Pancham Bhagwat on 6/28/2015.
 */

define(['layout/module'], function (module) {

    'use strict';

    return module.registerFactory('clearLocalStorage', function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            alert('here');
        });
    });
});



