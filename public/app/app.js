'use strict';

/**
 * @ngdoc overview
 * @name app [nextPrintApp]
 * @description
 * # app [nextPrintApp]
 *
 * main module of the chatBot application.
 */

define([
    'angular',

    // 'angular-couch-potato' -- lazy-load and register components
    // see http://laurelnaiad.github.io/angular-couch-potato/docs/
    'angular-couch-potato',

    //'angular-ui-router' --  routing framework for angular, which allows you to organize the
    // parts of your interface into a state machine.
    'angular-ui-router',

    'angular-animate',

    'smartwidgets',

    'notification',

    'ui-bootstrap',

    'angular-filter',

    'angular-cookies',

    'ngStorage'
], function (ng, couchPotato) {

    var app = ng.module('app', [

        // ngSanitize: Finds links in text input and turns them into html links.
        // Supports http/https/ftp/mailto and plain email address links.
        // 'ngSanitize',

        //ngCookies module provides a convenient wrapper for reading and writing browser cookies.
        'ngCookies',

        'angular.filter',

        //couch-potato: Lazy-Load and Register Components within application
        'scs.couch-potato',

        //ngAnimate: provides support for CSS-based animations
        'ngAnimate',

        'ngStorage',

        //ui.router: routing with nested views in AngularJS
        'ui.router',

        // ui.bootstrap: native AngularJS directives based on Bootstrap's markup
        // and CSS. As a result no dependency on jQuery or Bootstrap's JavaScript
        // is required.
        'ui.bootstrap',

        //'login, lock, and register user
        'app.auth', //load 'app.auth' first

        // ui application modules smart-admin
        // 'app.layout',
        // 'app.ui'
    // 'signalr'
        
        ]);

    couchPotato.configureApp(app);

    app.config(function ($provide, $httpProvider) {

        //$localStorageProvider.setKeyPrefix('NewPrefix');

        // Intercept http calls.
        $provide.factory('ErrorHttpInterceptor', function ($q, $rootScope, $cookies) {

            //******************************************************************************************************
            // userIsAuthorized field is added to avoid throwing error messages if user is unauthorized.
            //******************************************************************************************************
            $rootScope.userIsAuthorized = true;

            var errorCounter = 0;
            var requestToIgnore = [
                'brokerping',   
                'getJobFile'
            ];

            function notifyError(rejection) {
                var rejectionInfo = {};

                if (rejection) {
                    rejectionInfo = rejection;
                }

                try {
                    $.bigBox({
                        title:  $rootScope.getWord('Error'),
                        content: rejectionInfo.data ? rejectionInfo.data : '',
                        color: "#C46A69",
                        icon: "fa fa-warning shake animated",
                        //number: ++errorCounter,
                        timeout: 6000
                    });
                } catch (e) {
                    console.log(e);
                }

            }

            return {
                // On request failure
                requestError: function (rejection) {
                    console.log("in request error"+rejection)
                    $rootScope.stopSpinner();
                    // show notification
                    notifyError(rejection);

                    // Return the promise rejection.
                    return $q.reject(rejection);
                },

                // On response failure
                responseError: function (rejection) {
                    console.log("in response error"+JSON.stringify(rejection))

                    if ($rootScope.stopSpinner) {
                        $rootScope.stopSpinner();
                    }
                    // show notification
                    var ignore = false;
                    _.forEach(requestToIgnore, function (n, key) {
                        if (rejection.config.url.indexOf(requestToIgnore[key]) > -1)
                            ignore = true;
                    });

                    ignore = (ignore || !$rootScope.userIsAuthorized);
                    
                    if (!ignore)
                        notifyError(rejection);


                    //******************************************************************************************************
                    // userIsAuthorized field is added to avoid throwing error messages if user is unauthorized.
                    //******************************************************************************************************
                    if (rejection.status == 401 && $rootScope.userIsAuthorized && $rootScope.$state.current.name != 'login') {
                        event.preventDefault();
                        $rootScope.userIsAuthorized = false;
                        $cookies.remove("_Token");
                        $rootScope.$state.go('login');
                    }

                    // Return the promise rejection.
                    return $q.reject(rejection);

                }
            };
        });

        // Add the interceptor to the $httpProvider.
        $httpProvider.interceptors.push('ErrorHttpInterceptor');
    })

        .constant('APP_CONFIG', window.appConfig);

    app.run(function ($couchPotato, $rootScope, $state, $stateParams, Language,$location, $cookies, $http, User, $q, formValidationKeyService, buildInfo) {

    //     // Get build information.
        $http.get('build.json?' + Math.random()).success(function (data) {

            appConfig.build = data.buildNum;
            buildInfo.setBuildInfo(data.buildNum);
            console.log(appConfig.build);

            $rootScope.correctPath = function (pathExpression) {
                return buildInfo.correctPath(pathExpression);
            };

        }).error(function () {
            appConfig.build = 'app';
        });


    //     /****************************************************************************************************
    //      * The localised key is set here for all the form validations so that when the app loads
    //      * we can use the localised value for all the forms.
    //      ***************************************************************************************************/
        formValidationKeyService.initializeKey();

    //     /****************************************************************************************************
    //      * The currentYear is set here so that when the app loads we have the year for the footer to use.
    //      ***************************************************************************************************/
        $rootScope.currentYear = new Date().getFullYear();

        // CHECK BROWSER
        if (navigator.userAgent.indexOf('Firefox')
            != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Firefox') + 8)) >= 3.6) {
            //Firefox
            //Allow
            $rootScope.isFireFox = true;
        } else if (navigator.userAgent.indexOf('Chrome') != -1
            && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Chrome') + 7).split(' ')[0]) >= 15) {
            //Chrome
            //Allow
            $rootScope.isChrome = true;
        } else if (navigator.userAgent.indexOf('MSIE') != -1
            && navigator.userAgent.indexOf('Version') != -1
            && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Version') + 8).split(' ')[0]) >= 10) {
            //Safari
            //Allow
            $rootScope.isInternetExplorer = true;
        } else {
            // Block
        }

    //     // Initialize Facility changed status.
        $rootScope.facilityChanged = false;

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, from) {

            var requiresLogin = toState.data.requiresLogin;

            var currentDate = new Date();

            if ($cookies.get("_Token"))
                var tokenDate = new Date($cookies.get("expDate"));
            else
                requiresLogin = true;

            if ((requiresLogin || 'undefined') && ($cookies.get("_Token") && (tokenDate >= currentDate))) {
                $http.defaults.headers.common.Authorization = "Bearer " + $cookies.get("_Token");
                $http.defaults.headers.common['Accept-Language'] = $cookies.get("_locale");

                // If logged in and trying to go to login screen
                if (toState.name == 'login') {

                    $rootScope.$evalAsync(function () {
                        // If on dashboard need to reload the page
                        if ($location.path() == '/') {
                            location.reload();
                        } else {
                            // Redirect to dashboard
                            $location.path('/');
                        }
                    });

                    event.preventDefault();
                    return;
                }
            } else {
                if (toState.name != 'login') {
                    // Reset the authorization header if not logged in.
                    $http.defaults.headers.common.Authorization = undefined;

                    if (toState.name != 'logout') {
                        // Get the previous url for redirect after login
                        $rootScope.previousUrl = window.location.href.split('#')[1];
                    }

                    $state.go('login');
                    $rootScope.$evalAsync(function () {
                        $location.path('/login');
                    });

                    event.preventDefault();
                    return;
                }
                return;
            }
            // //SSM Issue my lie here - End

            /********************************************************************************************/
            // SignalR connection check and connect if disconnected.
            /********************************************************************************************/
            if (toState.name == 'login' || toState.name == 'logout') {
                //// SignalR disconnect if state is login or logout
                // connectionService.stopConnection();
            }
            else if (from.name == 'login' || from.name == '') {
               // ******************************************************************************************
                // SignalR connection check and connect if routing from login page.
                /********************************************************************************************/

                if ($rootScope.connection) {
                    if (!$rootScope.connection.hub.state) {
                        // connectionService.startConnection();
                    }
                    else if ($rootScope.connection.hub.state != $rootScope.connection.connectionState.connected) {
                        if ($rootScope.connection.hub.state == $rootScope.connection.connectionState.disconnected) {
                            // connectionService.startConnection();
                        }
                    }
                }
                else {
                    // connectionService.startConnection();
                }
            }
        });

    //     $rootScope.$on('$stateChangeSuccess', function (ev, toState, toParams, from, fromParams) {

    //         //******************************************************************************************************
    //         // userIsAuthorized field is added to avoid throwing error messages if user is unauthorized.
    //         //******************************************************************************************************
    //         if (!$rootScope.userIsAuthorized && toState.name != 'login') {
    //             var canceller = $q.defer();
    //             angular.forEach($http.pendingRequests, function (p) {
    //                 canceller.resolve(p);
    //             });
    //             $http.defaults.headers.common.Authorization = undefined;
    //             $state.go('login');
    //         }

    //         // To avoid infdig angularJS errors.
    //         // 1. When changing facility first change path to '/'.
    //         // 2. Check if the facility has changed, true: reload location : simple state change.
    //         if ($rootScope.facilityChanged) {
    //             $rootScope.facilityChanged = false;
    //             location.reload();
    //         }

    //         /********************************************************************************************/
    //         // Datatables: Clearing out the datatable filters on different state transitions.
    //         /********************************************************************************************/

    //         function clearFilterCaches() {
    //             localStorage.removeItem('DataTables_Filtered_Orders/');
    //             localStorage.removeItem('DataTables_Filtered_Jobs/');
    //         }

    //         function clearDTCache() {
    //             localStorage.removeItem('DataTables_dtOrders_/');
    //             localStorage.removeItem('DataTables_dtJobs_/');
    //         }

    //         if (toState.name == 'app.dashboard') {
    //             clearFilterCaches();
    //             clearDTCache();
    //         }

    //         var jobStateItems = ['app.jobs.jobs-details', 'app.jobs.quality-check', 'app.jobs.bin-job', 'app.jobs.route-job', 'app.jobs.mark-job-shipped'];

    //         function containsState(stateName) {
    //             return _.contains(jobStateItems, stateName);
    //         }

    //         if (toState.name == 'app.orders.list' && from && from.name != 'app.orders.orders-view') {
    //             clearDTCache();
    //             if (from.name != 'app.dashboard') {
    //                 clearFilterCaches();
    //             }
    //         }

    //         if (toState.name == 'app.jobs.list' && from && !containsState(from.name)) {
    //             clearDTCache();
    //             if (from.name != 'app.dashboard') {
    //                 clearFilterCaches();
    //             }
    //         }
    //         if (toState.name == 'app.jobs.hub' && from && !containsState(from.name)) {
    //             clearDTCache();
    //             if (from.name != 'app.dashboard') {
    //                 clearFilterCaches();
    //             }
    //         }

    //         if (toState.name == 'app.jobs.route-pending' && from && !containsState(from.name)) {
    //             localStorage.removeItem('DataTables_Filtered_JobsPendingRoute/');
    //             localStorage.removeItem('DataTables_dtJobsPendingRoute_/');
    //             localStorage.removeItem('DataTables_dtRoutePending_/');
    //             _
    //         }
    //         if (toState.name == 'app.closed-orders.list' && from && from.name != 'app.closed-orders.view') {
    //             localStorage.removeItem('DataTables_Filtered_ClosedOrders/');
    //             localStorage.removeItem('DataTables_dtArchivedOrders_/');
    //         }


    //     });

        app.lazy = $couchPotato;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        // editableOptions.theme = 'bs3';

    //     /********************************************************************************************/
    //     // Initialize localization and related objects
    //     /********************************************************************************************/
        Language.initializeLanguage();

    });

    return app;
});
