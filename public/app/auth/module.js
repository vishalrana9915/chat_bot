/**
 * Filename: public/app/auth/module.js
 */
define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router'
], function (ng, couchPotato) {

    "use strict";

    var module = ng.module('app.auth', ['ui.router']);

    couchPotato.configureApp(module);
    module.config(function ($stateProvider, $couchPotatoProvider,$urlRouterProvider) {

        $stateProvider

        .state('login', {
            url: '/login',
            views: {
                root: {
                    templateUrl: "app/auth/views/login.html",
                    controller :"LoginCtrl",
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            'app/auth/models/User',
                            'app/auth/login/loginCtrl',
                            'app/auth/services/Authorization'
                                                                             ])
                    }
                }
            },
            data: {
                title: 'Login',
                rootId: 'extra-page',
                requiresLogin:false
            }

        })

        .state('register', {
            url: '/register',
            views: {
                root: {
                    templateUrl: "app/auth/views/signup.html",
                    controller :"signupCtrl",
                    resolve: {
                        deps: $couchPotatoProvider.resolveDependencies([
                            'app/auth/directives/signupForm',
                            'app/auth/signup/signupCtrl'
                        ])
                    }
                }
            },
            data: {
                title: 'register',
                rootId: 'extra-page',
                requiresLogin:false
            }

        })
        .state('logout',{
                url:'/logout',
                views:{
                    root:{
                        templateUrl:'',
	                    controller : function ($scope, $cookies) {

                            //Delete cookies.
                            $cookies.remove("_Token");
                            $cookies.remove("expDate");

                            //Clear out DataTables states.
                            localStorage.clear();
                            sessionStorage.clear();

                            //Reload back to the login screen.
                            location.reload();
	                    }

                    }
                },
                data:{
                    requiresLogin:false
                }

            })

        .state('forgotPassword', {
            url: '/forgot-password',
            views: {
                root: {
                    templateUrl: 'views/forgot-password.html'
                }
            },
            data: {
                title: 'Forgot Password',
                htmlId: 'extr-page'
            },
            resolve: {
                deps: $couchPotatoProvider.resolveDependencies([
                    'modules/forms/directives/validate/smartValidateForm'
                ])
            }
        })

        .state('lock', {
            url: '/lock',
            views: {
                root: {
                    templateUrl: 'views/lock.html'
                }
            },
            data: {
                title: 'Locked Screen',
                htmlId: 'lock-page'
            }
        })
         
         .state('PageNotFound', {
            url: '/pageNotFound',
            views: {
                    templateUrl: 'public/404.html'
            },
        })

        $urlRouterProvider.otherwise('login');

    })
        //.constant('authKeys', authKeys);

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });
    return module;
});
