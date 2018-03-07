/**
 * Created by Pardha Mugunda on 5/26/2015.
 * Path:
 */
/**
 * Created by Pardha Mugunda on 5/26/2015.
 * Path: app/layout/directives/enums/0ptimalPrintTechnologies.js
 */

define(['layout/module',
    'lodash'
], function (module) {

    'use strict';

    module.registerDirective('optimalPrintTechnologies', function ($rootScope, DefaultApiService) {
        return {
            restrict: 'EA',
            replace: true,
           //templateUrl: 'app/layout/partials/enums/optimal-print-technologies-dd.tpl.html',
            link: function (scope, elements, attributes) {

                var apiCallType = 'JsTypes?type=';
                //scope.optPrintTechnology = scope.ctrlOptimalPrintTechnologiesValue;
                var selectedValue=-1;
                /*
                 *
                 * DG - If archive attribute is equals true, set var archive is equals true else is equals false.
                 *
                 * */


                var archive = attributes.archive == 'true' || false;
                var populateEnums = function (enums) {

                    scope.optimalPrintTechnologies = [];//Only change this scope variable to populate dropdown menu.
                    scope.enumOrders = {};
                    var enumIndex = 0;
                    scope.orderStatus = '';
                    _.forEach(enums, function (enumKey, enumValue) {
                       scope.optimalPrintTechnologies.push({
                                    name: $rootScope.getWord(enumKey),
                                    statEnum: enumValue,
                                    value: enumIndex
                                });
                                if(scope.ctrlOptimalPrintTechnologiesValue==enumValue)
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
                DefaultApiService.getAllListCall(apiCallType + 'Mis.Interfaces.Enums.OptimalPrintTechnologies')
                    .success(function (data) {
                        populateEnums(data);
                        scope.optimalPrintTechnology = scope.optimalPrintTechnologies[selectedValue];
                    });
            }
        }
    });
});



