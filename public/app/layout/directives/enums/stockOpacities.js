/**
 * Created by Pardha Mugunda on 5/26/2015.
 * Path: app/layout/directives/enums/stockOpacities.js
 */

define(['layout/module',
    'lodash'
], function (module) {

    'use strict';

    module.registerDirective('stockOpacities', function ($rootScope, DefaultApiService) {
        return {
            restrict: 'EA',
            replace: true,
            //templateUrl: 'app/layout/partials/enums/stock-opacities-dd.tpl.html',
            link: function (scope, elements, attributes) {

                var apiCallType = 'JsTypes?type=';
               // scope.stkopacity = scope.ctrlstockOpacitieswValue;
                var selectedValue=-1;
                /*
                 *
                 * DG - If archive attribute is equals true, set var archive is equals true else is equals false.
                 *
                 * */


                var archive = attributes.archive == 'true' || false;
                var populateEnums = function (enums) {

                    scope.stockOpacities = [];//Only change this scope variable to populate dropdown menu.
                    scope.enumOrders = {};
                    var enumIndex = 0;
                    scope.orderStatus = '';
                    _.forEach(enums, function (enumKey, enumValue) {
                      scope.stockOpacities.push({
                                    name: $rootScope.getWord(enumKey),
                                    statEnum: enumValue,
                                    value: enumIndex
                                });
                                if(scope.ctrlstockOpacitieswValue==enumValue)
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
                DefaultApiService.getAllListCall(apiCallType + 'Mis.Interfaces.Enums.StockOpacities')
                    .success(function (data) {
                        populateEnums(data);
                        scope.stockOpacity = scope.stockOpacities[selectedValue];
                    });
            }
        }
    });
});



