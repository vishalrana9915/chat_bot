/**
 * Created by Vishal rana .
 * Path: public/app/layout/directives/side.js
 */
define(['app', 'jquery'],
    function (module, $) {
        'use strict';

        module.registerDirective('ngEnter', function ($rootScope,$parse) {
               return function (scope, element, attrs) {

            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };  

        });

    });

