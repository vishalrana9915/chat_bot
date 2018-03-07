/**
 * Created by Shawn Miller on 5/12/2015.
 * Path: public/app/layout/directives/input/clockPicker.js
 * Notes: See http://weareoutman.github.io/clockpicker/ for options and operation
 */
define(['layout/module', 'clockpicker'], function (module) {

    'use strict';

    return module.registerDirective('clockPicker', function () {
        return {
            restrict: 'A',
            compile: function (tElement, tAttributes) {
                tElement.removeAttr('clock-picker data-clock-picker');

                var options = {
                    default: 'now',
                    placement: 'bottom',
                    donetext: 'Done'
                }

                tElement.clockpicker(options);
            }
        }
    });
});
