/**
 * Created by Pardha Mugunda on 5/26/2015.
 * Path:
 */
/**
 * Created by Pardha Mugunda on 5/26/2015.
 * Path: app/layout/directives/enums/stockTypeDetails.js
 */

define(['layout/module',
    'lodash'
], function (module) {

    'use strict';

    module.registerDirective('mediaTypeDetails', function ($rootScope, DefaultApiService) {
        return {
            restrict: 'EA',
            replace: true,
            //templateUrl: 'app/layout/partials/enums/stock-types-details-dd.tpl.html',
            link: function (scope, elements, attributes) {

                var apiCallType = 'JsTypes?type=';
                //scope.stkTypedetails = scope.ctrlstockTypeDetailsValue;
                var selectedValue=-1;
                /*
                 *
                 * DG - If archive attribute is equals true, set var archive is equals true else is equals false.
                 *
                 * */


                var archive = attributes.archive == 'true' || false;
                var populateEnums = function (enums) {

                    scope.mediaTypeDetails = [];//Only change this scope variable to populate dropdown menu.
                    scope.enumOrders = {};
                    var enumIndex = 0;
                    scope.orderStatus = '';
                    _.forEach(enums, function (enumKey, enumValue) {
                        scope.mediaTypeDetails.push({
                                    name: $rootScope.getWord(enumKey),
                                    statEnum: enumValue,
                                    value: enumIndex
                                });
                                if(scope.ctrlstockTypeDetailsValue==enumValue)
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
                DefaultApiService.getAllListCall(apiCallType + 'Mis.Interfaces.Enums.MediaTypeDetails')
                    .success(function (data) {
                        populateEnums(data);
                        scope.mediaTypeDetail = scope.mediaTypeDetails[selectedValue];
                    });
            }
        }
    });
});



