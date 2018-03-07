/**
 * Created by Shawn Miller on 7/2/2015.
 * Path: public/app/layout/directives/input/colorPicker.js
 */
define(['layout/module', 'lodash', 'bootstrap-colorpicker'], function (module, _) {

    'use strict';

    return module.registerDirective('colorPicker', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, tElement, tAttributes) {

                tElement.removeAttr('color-picker data-color-picker');

                var aOptions = _.pick(tAttributes, ['']);

                var options = _.extend(aOptions, {});

                tElement.colorpicker(options);

                scope.backGroundColor = {'background-color': scope.color};

                $('.colorpicker').colorpicker().on('changeColor', function(ev){
                    scope.color = ev.color.toHex();
                    scope.backGroundColor = {'background-color': ev.color.toHex()};
                });

                $('.colorpicker').colorpicker().on('hide', function(ev){
                    ev.target.disabled = false;
                    ev.target.value = !scope.color ? "" : scope.color;
                });
                $('.colorpicker').colorpicker().on('show', function(ev){
                    ev.target.disabled = true;
                });

            }
        }
    });
});
