/**
 * Created by Pardha Mugunda on 5/26/2015.
 * Path:
 */
/**
 * Created by Pardha Mugunda on 6/30/2015.
 * Path: app/layout/directives/enums/costCenterTypeCategories.js
 */

define(['layout/module',
    'lodash'
], function (module) {

    'use strict';

    module.registerDirective('costCenterTypeCategories', function ($rootScope, DefaultApiService) {
        return {
            restrict: 'EA',
            replace: true,
          //  templateUrl: 'app/layout/partials/enums/stock-types-dd.tpl.html',
            link: function (scope, elements, attributes) {

                var apiCallType = 'JsTypes?type=';

                var selectedValue=-1;
                var populateEnums = function (enums) {

                    scope.costCenterTypeCategories = [];//Only change this scope variable to populate dropdown menu.
                    var enumIndex = 0;
                    _.forEach(enums, function (enumKey, enumValue) {
                                scope.costCenterTypeCategories.push({
                                    name: $rootScope.getWord(enumKey),
                                    statEnum: enumValue,
                                    value: enumIndex
                                });
                                if(scope.ctrlcostCenterTypeCategoriesValue==enumValue)
                                    selectedValue=enumIndex;

                                enumIndex++;
                    });
                };

                DefaultApiService.getAllListCall(apiCallType + 'Mis.Interfaces.Enums.CostCenterTypeCategories')
                    .success(function (data) {
                        populateEnums(data);
                        scope.costCenterTypeCategory = scope.costCenterTypeCategories[selectedValue];
                    });
            }
        }
    });
});



