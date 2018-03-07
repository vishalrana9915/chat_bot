/**
 * Created by Pardha Mugunda on 6/18/2015.
 * Path: app/layout/directives/enums/currencyCodes.js
 */

define(['layout/module',
    'lodash'
], function (module) {

    'use strict';

    module.registerDirective('currencyCodes', function ($rootScope, DefaultApiService) {
        return {
            restrict: 'EA',
            replace: true,
          //  templateUrl: 'app/layout/partials/enums/stock-types-dd.tpl.html',
            link: function (scope, elements, attributes) {

                var apiCallType = 'JsTypes?type=';
                var selectedValue=-1;
                var populateEnums = function (enums) {

                    scope.currencyCodes = [];//Only change this scope variable to populate dropdown menu.

                    var enumIndex = 0;
                    scope.orderStatus = '';
                    _.forEach(enums, function (enumKey, enumValue) {
                                scope.currencyCodes.push({
                                    name: $rootScope.getWord(enumKey),
                                    statEnum: enumValue,
                                    value: enumIndex
                                });
                                if(scope.ctrlCurrencyCodeValue==enumValue)
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
                DefaultApiService.getAllListCall(apiCallType + 'Qpp.Common.QppMoney.CurrencyCodes')
                    .success(function (data) {
                        populateEnums(data);
                        scope.currencyCode = scope.currencyCodes[selectedValue];
                    });
            }
        }
    });
});



