/**
 * Created by Shawn Miller on 6/19/2015.
 * Path: public/app/layout/directives/input/multiSelect.js
 * Notes:  Select2
 *         The jQuery replacement for select boxes
 *         https://select2.github.io/
 */
define(['layout/module', 'select2'], function (module) {

    'use strict';

    module.registerDirective('multiSelect', function () {
        return {
            restrict: 'A',
            compile: function (element, attributes) {
                element.removeAttr('multi-select data-multi-select');
                element.select2();
            }
        }
    });
});
