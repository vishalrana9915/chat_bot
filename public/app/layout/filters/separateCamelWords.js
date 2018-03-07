/**
 * Created by Dante Garcia on 9/28/2015.
 * Path: public/app/layout/filters/camelCaseToHuman.js
 */

//{{data.name | camelCaseToHuman}}

define(['layout/module', 'humps'], function (module, humps) {

    'use strict';

    module.registerFilter('separateCamelWords', function () {

        return function (input, uppercaseFirst) {

            if (typeof input !== "string") {
                return input;
            }

            var result = humps.separateWords(input, ' ');

            if (uppercaseFirst) {
                result = result.charAt(0).toUpperCase() + result.slice(1);
            }

            return result;

        };

    });
});