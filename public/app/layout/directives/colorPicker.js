/**
 * Created by Shawn Miller on 4/18/2015.
 * Filename: public/app/layout/directives/colorPicker.js
 */
define(['layout/module',
    'jquery',
    'jquery-color'
], function (module) {

    'use strict';

    return module.registerDirective('colorPicker', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {

                //$(element).colorPicker();
            }
        }
    });
});
