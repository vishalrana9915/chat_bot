/**
 * Created by Shawn Miller on 5/28/2015.
 * Path: public/app/components/alerts/alerts-service.js
 */

define(['app'], function (app) {
    "use strict";

    return app.factory('alertService', function ($http, $log) {

        function getAlerts(callback) {

            $http.get('api/activities/alerts.json').success(function (data) {

                callback(data);

            }).error(function () {

                $log.log('Error');

                //TODO: Dump data to console
                $log.log(data.toString());

                callback([]);

            });

        }

        function getAlertsByType(type, callback) {

            $http.get('api/activities/alerts-' + type + '.json').success(function (data) {

                callback(data);

                //TODO: Dump type to console
                $log.log(type.toString());

                //TODO: Dump data to console
                $log.log(data.toString());

            }).error(function () {

                $log.log('Error');
                callback([]);

            });

        }

        return {
            get: function (callback) {
                getAlerts(callback);
            },
            getbytype: function (type, callback) {
                getAlertsByType(type, callback);
            }
        }
    })
})