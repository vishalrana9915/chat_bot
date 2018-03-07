/**
 * Created by Pardha Mugunda on 5/29/2015.
 * Path: app/layout/directives/enums/reprintReasonCategories.js
 */

define(['layout/module',
    'lodash'
], function (module) {

    'use strict';

    module.registerDirective('reprintReasonCategories', function ($rootScope, DefaultApiService) {
        return {
            restrict: 'EA',
            replace: true,
            //templateUrl: 'app/layout/partials/enums/reprint-reason-categories-dd.tpl.html',
            link: function (scope, elements, attributes) {

                var apiCallType = 'JsTypes?type=';
               // scope.reprintReasonCategoryValue = scope.ctrlReprintReasonCategoryValue;
                /*
                 *
                 * DG - If archive attribute is equals true, set var archive is equals true else is equals false.
                 *
                 * */
                var archive = attributes.archive == 'true' || false;
                var selectedValue=-1;

                var populateEnums = function (enums) {

                    scope.reprintReasonCategories = [];//Only change this scope variable to populate dropdown menu.
                    scope.enumOrders = {};
                    var enumIndex = 0;
                    scope.orderStatus = '';
                    _.forEach(enums, function (enumKey, enumValue) {
                       scope.reprintReasonCategories.push({
                                    name: $rootScope.getWord(enumKey),
                                    statEnum: enumValue,
                                    value: enumValue
                                });
                                if(scope.ctrlreprintReasonCategoryValue==enumValue)
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
                DefaultApiService.getAllListCall(apiCallType + 'Mis.Interfaces.Enums.ReprintReasonCategories')
                    .success(function (data) {
                        populateEnums(data);
                        scope.reprintReasonCategoryValue = scope.reprintReasonCategories[selectedValue];
                    });
            }
        }
    });
});



