/**
 * Created by Pardha Mugunda on 5/26/2015.
 * Path: app/layout/directives/enums/media-intent-coatings.js
 */

define(['layout/module',
    'lodash'
], function (module) {

    'use strict';

    module.registerDirective('frontMediaIntentCoatings', function ($rootScope, DefaultApiService) {
        return {
            restrict: 'EA',
            replace: true,
           // templateUrl: 'app/layout/partials/enums/front-media-intent-coatings-dd.tpl.html',
            link: function (scope, elements, attributes) {

                var apiCallType = 'JsTypes?type=';
                //scope.frontMediaIntentCoat = scope.ctrlfrontMediaIntentCoatingValue;
                var selectedValue=-1;
                /*
                 *
                 * DG - If archive attribute is equals true, set var archive is equals true else is equals false.
                 *
                 * */


                var archive = false;//attributes.archive == 'true' || false;
                var populateEnums = function (enums) {

                    scope.frontMediaIntentCoatings = [];//Only change this scope variable to populate dropdown menu.
                    scope.enumOrders = {};
                    var enumIndex = 0;
                    scope.orderStatus = '';
                    angular.forEach(enums, function (enumKey, enumValue) {
                      //  if (archive) {

                           // if (jQuery.inArray(enumValue, enumsForArchive) > -1) {
                                scope.frontMediaIntentCoatings.push({
                                    name: $rootScope.getWord(enumKey),
                                    statEnum: enumValue,
                                    value: enumIndex
                                });
                        if(scope.ctrlfrontMediaIntentCoatingValue==enumValue)
                            selectedValue=enumIndex;
                                enumIndex++;
                            //}


                        //} else {
                        //    if (jQuery.inArray(enumValue, enumsForArchive) == -1) {
                        //        scope.frontMediaIntentCoatings.push({
                        //            name: $rootScope.getWord(enumKey),
                        //            statEnum: enumKey,
                        //            value: enumIndex
                        //        });
                        //        enumIndex++;
                        //    }
                        //}
                    });
                };

                /*
                 * Initialize call for Orders Statuses...
                 * TODO: Avoid another call if the statuses have already being loaded.
                 *
                 **/
                var enumsForArchive = [];
                DefaultApiService.getAllListCall(apiCallType + 'Mis.Interfaces.Enums.MediaIntentCoatings')
                    .success(function (data) {
                        populateEnums(data);
                        scope.frontMediaIntentCoating = scope.frontMediaIntentCoatings[selectedValue];
                    });
            }
        }
    });
});



