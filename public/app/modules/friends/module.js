/**
 * Filename: public/app/auth/module.js
 */
define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router'
], function (ng, couchPotato) {

    "use strict";

    var module = ng.module('app.friends', ['ui.router']);

    couchPotato.configureApp(module);
    module.config(function ($stateProvider, $couchPotatoProvider,$urlRouterProvider) {


    });

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });
    return module;
});
