/**
 * Filename: public/app/auth/module.js
 */
define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router'
], function (ng, couchPotato) {

    "use strict";

    var module = ng.module('app.dashboard', ['ui.router']);

    couchPotato.configureApp(module);
    module.config(function ($stateProvider, $couchPotatoProvider,$urlRouterProvider) {

        $stateProvider

        .state('dashboard', {
            url: '/dashboard',
            views: {
                root: {
                    templateUrl: "public/404.html",
                    controller :"dashboardCtrl",
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            'app/modules/dashboard/controllers/dashboard.js'
                                                    ])
                    }
                }
            }

        })

        $urlRouterProvider.otherwise('login');

    })
        //.constant('authKeys', authKeys);

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });
    return module;
});
