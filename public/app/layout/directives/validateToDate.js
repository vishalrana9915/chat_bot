/**
 * Created by Pancham Bhagwat on 05/29/2015.
 * Path: app/layout/directives/validateToDate.js
 */


define(['layout/module'], function (module) {

    'use strict';

// This directive is used for To Date Range
// It compares the To Date and From Date, Checks to make sure To Date is dated after/on same date as compared to From Date
// Checks the input format is valid which is MM/DD//YYYY but accepts M/D/YYYY format as well

    module.registerDirective('validateToDate', function () {
        return {
            retrict: 'A',
            require: 'ngModel',
            controller: function ($scope, $filter) {
                var dateregex = /^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/(199\d|[2-9]\d{3})$/;


                $scope.$watch('toDate', function (newval, oldval) {

                    var validToDateFlag = dateregex.test($scope.toDate);
                    var validFromDateFlag = dateregex.test($scope.fromDate);

                    if (validFromDateFlag) {
                        var dateParserFrom = Date.parse($scope.fromDate);
                        var fromDateValid = new Date(dateParserFrom).toISOString();

                        if (validToDateFlag) {
                            var dateParserTo = Date.parse($scope.toDate);
                            var toDateValid = new Date(dateParserTo).toISOString();
                            $scope.validToDate = false;
                            $scope.toDate = $filter('date')(toDateValid, 'MM/dd/yyyy');
                            if (toDateValid < fromDateValid) {
                                $scope.toDate = $scope.fromDate;
                            }
                            ;
                        }
                        else if (!validToDateFlag) {
                            $scope.validToDate = true;
                        }
                    }
                    else {
                        $scope.validToDate = true;
                    }


                    if (!$scope.toDate) {
                        $scope.toDate = '';
                        $scope.validToDate = false;
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