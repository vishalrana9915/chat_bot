/**
 * Created by Shawn Miller on 7/13/2015.
 * Path:   /public/app/layout/directives/input/xEditable.js
 * Notes:  X-editable
 *         In-place editing with Twitter Bootstrap, jQuery UI or pure jQuery
 *         http://vitalets.github.io/x-editable/docs.html
 */
define(['layout/module', 'x-editable'], function (module) {

    "use strict";

    return module.registerDirective('xeditable', function($timeout, $log){

    	function link (scope, element, attrs, ngModel) {

            var defaults = {
                // http://vitalets.github.io/x-editable/docs.html
                // display: function(value, srcData) {
                //     ngModel.$setViewValue(value);
                //     // scope.$apply();
                // }
            };

            var inited = false;

            var initXeditable = function() {

                var options = scope.options || {};
        		var initOptions = angular.extend(defaults, options);

                //$log.log(initOptions);
                element.editable('destroy');
                element.editable(initOptions);
            }

            scope.$watch("options", function(newValue) {

                if(!newValue) {
                    return false;
                }

                initXeditable();

                //$log.log("Options changed...");

            }, true);

        }

        return {
        	restrict: 'A',
        	require: "ngModel",
            scope: {
                options: "="
            },
        	link: link

        }
    })
});