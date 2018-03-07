/**
 * Created by Shawn Miller on 5/12/2015.
 * Path: public/app/layout/directives/input/datePicker.js
 * Notes:
 */
define(['layout/module', 'jquery-ui'], function (module) {
    "use strict";

    return module.registerDirective('datePicker', function () {
        return {
            restrict: 'A',
            link: function (scope, tElement, tAttributes) {
                tElement.removeAttr('datePicker');

                var onSelectCallbacks = [];

                if (tAttributes.minRestrict) {
                    onSelectCallbacks.push(function (selectedDate) {
                        $(tAttributes.minRestrict).datepicker('option', 'minDate', selectedDate);
                    });
                }

                if (tAttributes.maxRestrict) {
                    onSelectCallbacks.push(function (selectedDate) {
                        $(tAttributes.maxRestrict).datepicker('option', 'maxDate', selectedDate);
                    });
                }

                var options = {
                    prevText: '<i class="fa fa-chevron-left"></i>',
                    nextText: '<i class="fa fa-chevron-right"></i>',
                    /*onSelect: function (selectedDate) {
                        //if(tAttributes.minRestrict && tAttributes.maxRestrict)//TODO: Implement Getters for callback functions.
                          //  angular.forEach(onSelectCallbacks, function (callback) {
                            //    callback.call(this, selectedDate)
                            //});
                    }*/
                };


                if (tAttributes.numberOfMonths) options.numberOfMonths = parseInt(tAttributes.numberOfMonths);

                if (tAttributes.dateFormat) options.dateFormat = tAttributes.dateFormat;

                if (tAttributes.defaultDate) options.defaultDate = tAttributes.defaultDate;

                if (tAttributes.changeMonth) options.changeMonth = tAttributes.changeMonth == "true";


                tElement.datepicker(options)

            }
        }
    })
});