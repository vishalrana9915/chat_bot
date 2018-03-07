/**
 * Created by Shawn Miller on 3/29/2015.
 * Filename: public/app/layout/directives/inputEnter.js
 */
define(['layout/module'], function (module) {

    'use strict';

    module.registerDirective('inputEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.inputEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });
});
