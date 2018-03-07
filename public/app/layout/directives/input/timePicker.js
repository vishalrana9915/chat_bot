/**
 * Created by Shawn Miller on 5/12/2015.
 * Path: public/app/layout/directives/input/timePicker.js
 * Notes:
 */
define(['layout/module', 'moment', 'bootstrap-timepicker'], function (module, moment) {

    'use strict';

    return module.registerDirective('timePicker', function () {
        return {
            restrict: 'A',
            link: function (scope, tElement, tAttributes) {
                tElement.removeAttr('time-picker data-time-picker');
                /*
                  TODO: This on-click function wrap should only be temporary. -DG
                  There is an issue preventing the time picker from being initialize when the directive
                  is instantiated.
                */

                var setDefaultTime = 'current';
                moment.fn.roundNext15Min = function () {
                    var intervals = Math.floor(this.minutes() / 15);
                    if(this.minutes() % 15 != 0)
                        intervals++;
                    if(intervals == 4) {
                        this.add('hours', 1);
                        intervals = 0;
                    }
                    this.minutes(intervals * 15);
                    this.seconds(0);
                    return this;
            };

                if(tAttributes.redo)
                    setDefaultTime = moment().roundNext15Min().add(15,'minutes').format('hh:mm A');

                tElement.on('click', function(){//Initialize timePicker

                    tElement.timepicker({
                        showInputs : false, //Remove Text boxes.
                        defaultTime: setDefaultTime
                    });
                    //this.click();//Initialize popup.
                });


                //TODO: Once the timePicker init is fixed remove ng-click from HTML template. -DG
                scope.initTimePicker=function(){//Initialize timePicker popup with label click.
                    tElement.click();
                };
            }
        }
    });
});
