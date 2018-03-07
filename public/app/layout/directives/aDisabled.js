/**
 * Created by Shawn Miller on 6/16/2015.
 * Path: public/app/layout/directives/aDisabled.js
 */
define(['layout/module'
], function (module) {

    'use strict';

    module.registerDirective('aDisabled', function ($compile) {

        return {
            compile: function(tElement, tAttrs, transclude) {

                //Use either attribute.
                var disableAttr = tAttrs["ngDisabled"] || tAttrs["aDisabled"];

                //Disable ngClick
                tAttrs["ngClick"] = "!("+disableAttr+") && ("+tAttrs["ngClick"]+")";

                //Toggle "disabled" to class when aDisabled becomes true
                return function (scope, iElement, iAttrs) {
                    scope.$watch(iAttrs["aDisabled"], function(newValue) {
                        if (newValue !== undefined) {
                            iElement.toggleClass("disabled", newValue);
                        }
                    });

                    //Disable href on click
                    iElement.on("click", function(e) {
                        if (scope.$eval(iAttrs["aDisabled"])) {
                            e.preventDefault();
                        }
                    });

                };
            }
        }
    });
});