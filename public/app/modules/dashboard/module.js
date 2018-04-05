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

        // $stateProvider

        // .state('dash', {
        //     url: '/dash',
        //     data:{
        //         title:'Dashboard'
        //     },
        //     views: {
        //         root: {
        //             "content@app": {
        //             templateUrl: "app/modules/dashboard/views/dashboard.html",
        //             controller :"dashboardCtrl",
        //             resolve: {
        //                 deps: $couchPotatoProvider.resolveDependencies([
        //                     'app/modules/dashboard/controllers/dashboard'
        //                  ])
        //             }
        //         }
        //         }
        //     }

        // })

        // $urlRouterProvider.otherwise('/login');

    })
        //.constant('authKeys', authKeys);

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });
    return module;
});
