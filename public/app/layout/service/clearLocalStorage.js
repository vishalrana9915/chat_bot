/**
 * Path: public/app/layout/service/clearLocalStorage.js
 */

define(['layout/module'], function (module) {

    'use strict';

    return module.registerFactory('clearLocalStorage', function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
            alert('here');
        });
    });
});



