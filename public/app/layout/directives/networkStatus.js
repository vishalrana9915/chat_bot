/**
 * Created by Dante Garcia on 9/10/2015.
 * Path: public/app/layout/directives/networkStatus.js
 */
define(['layout/module', 'jquery'], function (module, $) {

    'use strict';

    $.root_ = $('body');
    var root = window;

    module.registerDirective('networkStatus', function ($log, DefaultApiService, $location, $interval, $http, $rootScope) {

        var link = function(scope, element) {



            scope.statusClass='network-down';
            var initialTimeInterval = 60000;
            var spacedTimeInterval = 600000;
            var timeInterval = initialTimeInterval;
            var numOfPings = 0;
            var pingBrokerInterval = '';
            function pingBrokerStatus() {

                if(scope.user.hasPrintBroker){
                    $http.get(scope.user.brokerApiHost + '/brokerping')
                        .success(function (data, response) {

                            ///Reset time interval back to every minute when print available.
                            if(timeInterval == spacedTimeInterval){
                                timeInterval = initialTimeInterval;
                                numOfPings = 0;
                                $interval.cancel(pingBrokerInterval);//Cancel timer.
                                pingBrokerInterval = $interval(pingBrokerStatus, timeInterval);//Restart with new interval.
                            }
                            if (response == 200){
                                scope.statusClass = 'network-up';
                            }
                            else{
                                scope.statusClass='network-down';
                            }}).error(function(data, response){
                            ///If printbroker ping fails more than once,
                            ///set set time interval to every 10 minutes.
                            if(response == 0 && (numOfPings > 1)){
                                timeInterval = spacedTimeInterval;
                                numOfPings = 0;
                                $interval.cancel(pingBrokerInterval);//Cancel timer.
                                pingBrokerInterval = $interval(pingBrokerStatus, timeInterval);//Restart with new interval.
                            }
                            scope.statusClass='network-down';
                            numOfPings++;});
                }
                else{
                    scope.statusClass='network-down';
                    //timeInterval = 600000;
                }
            }

            //This function gets call after the user has successfully signed in.
            //See public/app/auth/directives/loginInfo.js for method call    -DG
            $rootScope.startBrokerPing = function(){
                pingBrokerInterval = $interval(pingBrokerStatus, timeInterval);
                pingBrokerStatus();
            };

        };//eo variable link

        return {
            restrict: 'AE',
            link: link
        }
    });

});
