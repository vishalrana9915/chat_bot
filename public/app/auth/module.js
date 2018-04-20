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
	                    controller : function ($scope, $cookies,$state) {
                            //Delete cookies
                            try{

                             var cookies = document.cookie.split(";");
                              for (var i = 0; i < cookies.length; i++) {
                                var cookie = cookies[i];
                                var eqPos = cookie.indexOf("=");
                                var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                            }
                            }catch(e){
                                console.log("hello")
                            }
                            localStorage.clear();
                            sessionStorage.clear();

                            //Reload back to the login screen.
                            $state.transitionTo('login')
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
         


         .state('dashboard', {
            url:'/dashboard',
            views: {
                root:{
                    templateUrl: 'app/modules/dashboard/views/dashboard.html',
                    controller:'dashboardCtrl',
                    resolve:{
                         deps: $couchPotatoProvider.resolveDependencies([
                            'app/modules/dashboard/controller/dashboard'
                            ])                        
                    }
                }
            },
            data: {
                requiresLogin:true
            }
        })

          .state('connect', {
            url:'/connect',
            views: {
                root:{
                    templateUrl: 'app/modules/connect/views/connect.html',
                    controller:'connectCtrl',
                    resolve:{
                         deps: $couchPotatoProvider.resolveDependencies([
                            'app/modules/connect/controller/connect'
                            ])                        
                    }
                }
            },
            data: {
                requiresLogin:true
            }
        })

           .state('message', {
            url:'/message',
            views: {
                root:{
                    templateUrl: 'app/modules/friends/views/friends.html',
                    controller:'friendsCtrl',
                    resolve:{
                         deps: $couchPotatoProvider.resolveDependencies([
                            'app/modules/friends/controllers/friends'
                            ])                        
                    }
                }
            },
            data: {
                requiresLogin:true
            }
        });

        // $urlRouterProvider.otherwise('login');

    })

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });
    return module;
});
