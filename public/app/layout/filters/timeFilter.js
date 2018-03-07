/**
 * Created by Pancham Bhagwat on 5/27/2015.
 * Path: app/layout/filters/timeFilter.js
 */

//// Filter should be used in following format:
//// | time:'mm':'hh:mm':false
//// 'mm' : the type of value that is if converting minutes use mm if seconds use ss
//// 'hh:mm' : format required to display can go up to hh:mm:ss or without the : as well
//// 'false' if not used padding will be set by default eg: 2 to 02

define(['layout/module'], function (module) {

    'use strict';

    module.registerFilter('timeFilter', function () {
        var conversions = {
            'ss': angular.identity,
            'mm': function (value) {
                return value * 60;
            },
            'hh': function (value) {
                return value * 3600;
            },
            'dd': function (value) {
                return value * 86400;
            }
        };

        var padding = function (value, length) {
            var zeroes = length - ('' + (value)).length,
                pad = '';
            while (zeroes-- > 0) pad += '0';
            return pad + value;
        };


        return function (value, unit, format, isPadded,noColon) {
            var totalSeconds = conversions[unit || 'ss'](value),
                dd = Math.floor(totalSeconds / 86400),
                hh = Math.floor((totalSeconds % 86400) / 3600),
                mm = Math.floor((totalSeconds % 3600) / 60),
                ss = totalSeconds % 60;

             format = format || 'dd:hh:mm:ss';
            // newFormat = format;
            isPadded = angular.isDefined(isPadded) ? isPadded : true;
            dd = isPadded ? padding(dd, 2) : dd;
            hh = isPadded ? padding(hh, 2) : hh;
            mm = isPadded ? padding(mm, 2) : mm;
            ss = isPadded ? padding(ss, 2) : ss;

            dd = dd=="00" ? '' : dd + 'd';
            hh = hh =="00" ? '' : hh + 'h';
            mm = mm == "00" ? '' : mm + 'm';
            ss = ss == "00" ? '' : ss;

            format = noColon ? format.split(':').join(' '): format ;

            return format.replace(/dd/, dd).replace(/hh/, hh).replace(/mm/, mm).replace(/ss/, ss);
        };
    });
});