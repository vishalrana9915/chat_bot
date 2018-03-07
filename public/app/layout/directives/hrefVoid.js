/**
 * Created by Shawn Miller on 3/29/2015.
 * Filename: public/app/layout/directives/hrefVoid.js
 */
define(['layout/module'], function (module) {

    'use strict';

    module.registerDirective('hrefVoid', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                element.attr('href','javascript:void(0);');
                element.on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();
                })
            }
        }
    });
});
