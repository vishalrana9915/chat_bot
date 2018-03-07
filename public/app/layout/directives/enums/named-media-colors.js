/**
 * Created by Pardha Mugunda on 5/26/2015.
 * Path: app/layout/directives/enums/named-media-colors.js
 */

define(['layout/module',
    'lodash'
], function (module) {

    'use strict';

    module.registerDirective('namedMediaColors', function ($rootScope, DefaultApiService) {
        return {
            restrict: 'EA',
            replace: true,
           // templateUrl: 'app/layout/partials/enums/named-media-colors-dd.tpl.html',
            link:function(scope, elements, attributes ){

                var apiCallType = 'JsTypes?type=';
                scope.jdfName=scope.controllerValue;
                /*
                 *
                 * DG - If archive attribute is equals true, set var archive is equals true else is equals false.
                 *
                 * */


                var archive = attributes.archive == 'true' || false;

                var populateEnums = function(enums){

                    scope.namedMediaColors = [];//Only change this scope variable to populate dropdown menu.
                    scope.enumOrders = {};
                    var enumIndex = 0;
                    scope.orderStatus = '';
                    angular.forEach(enums, function (enumKey, enumValue) {
                        if(archive){

                            if (jQuery.inArray(enumValue, enumsForArchive) > -1) {
                                scope.namedMediaColors.push({
                                    name: $rootScope.getWord(enumKey),
                                    statEnum: enumValue,
                                    value: enumValue
                                });
                                enumIndex++;
                            }


                        }else{
                            if (jQuery.inArray(enumValue, enumsForArchive) == -1) {
                                scope.namedMediaColors.push({
                                    name: $rootScope.getWord(enumKey),
                                    statEnum: enumValue,
                                    value: enumValue
                                });
                                enumIndex++;
                            }
                        }
                    });
                };

                /*
                 * Initialize call for Orders Statuses...
                 * TODO: Avoid another call if the statuses have already being loaded.
                 *
                 **/
                var enumsForArchive = [];
                DefaultApiService.getAllListCall(apiCallType + 'Mis.Interfaces.Enums.NamedMediaColors')
                    .success(function(data){
                      populateEnums(data);
                    });
            }
        }
    });
});


