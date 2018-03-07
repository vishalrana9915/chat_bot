/**
 * Created by Pancham Bhagwat on 05/29/2015.
 * Path: app/layout/directives/validateFromDate.js
 * Notes: This directive is used for From Date Range
 *          It compares the From Date and To Date, Checks to make sure From Date is dated before/on same date as
 *          compared to To Date.
 *          Checks the input format is valid which is MM/DD//YYYY but accepts M/D/YYYY format as well
 */


define(['layout/module'], function (module) {

    'use strict';

    module.registerDirective('validateFromDate', function () {
        return {
            retrict: 'A',
            require: 'ngModel',
            controller: function ($scope, $filter) {
                var dateregex = /^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/(199\d|[2-9]\d{3})$/;

                $scope.$watch('fromDate', function (newval, oldval) {

                    var validFromDateFlag = dateregex.test($scope.fromDate);
                    var validToDateFlag = dateregex.test($scope.toDate);

                    if (validFromDateFlag)
                    {
                        var dateParserFrom = Date.parse($scope.fromDate);
                        var fromDateValid = new Date(dateParserFrom).toISOString();
                        $scope.validFromDate = false;
                        $scope.fromDate = $filter('date')(fromDateValid, 'MM/dd/yyyy');

                        if (validToDateFlag)
                        {
                            var dateParserTo = Date.parse($scope.toDate);
                            var toDateValid = new Date(dateParserTo).toISOString();
                            if (toDateValid < fromDateValid) {
                                $scope.toDate = '';
                            }
                        }
                    }
                    else if (!validFromDateFlag)
                    {
                        $scope.validFromDate = true;
                        $scope.toDate = '';
                        $scope.validToDate = false;
                    }

                    if (!$scope.fromDate) {
                        $scope.toDate = '';
                        $scope.validFromDate = false;
                    }
                });

            },
            link: function (scope, element, attrs) {
                element.datepicker({
                    dateFormat: "mm/dd/yy",
                    prevText: '<i class="fa fa-chevron-left"></i>',
                    nextText: '<i class="fa fa-chevron-right"></i>'
                });

                element.on('click', function () {
                    $('.ui-datepicker-next').attr('title', 'Next');
                    $('.ui-datepicker-prev').attr('title', 'Previous');
                    $('#ui-datepicker-div').on('click', function () {
                        $('.ui-datepicker-next').attr('title', 'Next');
                        $('.ui-datepicker-prev').attr('title', 'Previous');
                    });

                });
            }
        };
    });
});