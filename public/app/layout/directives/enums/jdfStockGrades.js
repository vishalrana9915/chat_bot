/**
 * Created by Pardha Mugunda on 6/3/2015.
 * Path: app/layout/directives/enums/JdfStockGrades.js
 */

define(['layout/module',
    'lodash'
], function (module) {

    'use strict';

    module.registerDirective('jdfStockGrades', function ($rootScope, DefaultApiService) {
        return {
            restrict: 'EA',
            replace: true,
           // templateUrl: 'app/layout/partials/enums/jdf-stock-grades-dd.tpl.html',
            link: function (scope, elements, attributes) {

                var apiCallType = 'JsTypes?type=';
                //scope.reprintReasonTypeValue = scope.ctrlReprintReasonCategoryValue;

                /*
                 *
                 * DG - If archive attribute is equals true, set var archive is equals true else is equals false.
                 *
                 * */


                var archive = attributes.archive == 'true' || false;

                var selectedValue=-1;
                var populateEnums = function (enums) {

                    scope.jdfStockGrades = [];//Only change this scope variable to populate dropdown menu.
                    scope.enumOrders = {};
                    var enumIndex = 0;
                    scope.orderStatus = '';
                    _.forEach(enums, function (enumKey, enumValue) {
                      scope.jdfStockGrades.push({
                                    name: $rootScope.getWord(enumKey),
                                    statEnum: enumValue,
                                    value: enumValue

                                });
                                if(scope.ctrlJdfStockGradeValue==enumValue)
                                    selectedValue=enumIndex;
                                enumIndex++;
                      });

                };

                /*
                 * Initialize call for Orders Statuses...
                 * TODO: Avoid another call if the statuses have already being loaded.
                 *
                 **/
                var enumsForArchive = [];
                DefaultApiService.getAllListCall(apiCallType + 'Mis.Interfaces.Enums.JdfStockGrades')
                    .success(function (data) {
                        populateEnums(data);
                        scope.jdfStockGradeValue = scope.jdfStockGrades[selectedValue];
                    });
            }
        }
    });
});



