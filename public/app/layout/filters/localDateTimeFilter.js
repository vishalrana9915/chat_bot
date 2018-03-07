/**
 * Created by Pancham Bhagwat on 5/27/2015.
 * Path: public/app/layout/filters/localDateTimeFilter.js
 */

//// Filter should be used in following format:
//// | time:'mm':'hh:mm':false
//// 'mm' : the type of value that is if converting minutes use mm if seconds use ss
//// 'hh:mm' : format required to display can go up to hh:mm:ss or without the : as well
//// 'false' if not used padding will be set by default eg: 2 to 02

define(['layout/module', 'moment'], function (module, moment) {

    'use strict';

    module.registerFilter('localDateTimeFilter', function ($filter) {

        var isUtcFormat = function (dateTimeString) {
            // TODO: Need to rework to confirm if string is in UTC format - PB
            if (dateTimeString.indexOf("T") > -1)
                return true;
            return false;
        };

        return function (value, type, format) {
            if(!value)
                return;

            if (type == 'date') {
                if(!format)
                    format = 'MM/dd/yy';
                return $filter('date')(moment.utc(value).toDate(), format);
            }
            if (type == 'time') {
                if (!format)
                    format = 'hh:mm a';
                return $filter('date')(moment.utc(value).toDate(), format);
            }
            if (type == 'dateTime') {
                if (!format)
                    format = 'MM/dd hh:mm:ss a';
                return $filter('date')(moment.utc(value).toDate(), format);
            }

            var dt = value;
            if (!isUtcFormat(value))
                dt = new Date(value + ' UTC').toISOString();
            var localTime = moment.utc(dt).toDate();

            if(!format)
                format = 'MM/dd/yy hh:mm a';

            return $filter('date')(localTime, format);
        };
    });
});