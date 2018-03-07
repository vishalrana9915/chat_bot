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
            //templateUrl: 'app/layout/partials/enums/named-media-colors-dd.tpl.html',
            link:function(scope, elements, attributes ){

                var apiCallType = 'JsTypes?type=';

                /*
                 *
                 * DG - If archive attribute is equals true, set var archive is equals true else is equals false.
                 *
                 * */


                var archive = attributes.archive == 'true' || false;
                var selectedValue=-1;
                var populateEnums = function(enums){

                    scope.namedMediaColors = [];//Only change this scope variable to populate dropdown menu.
                    scope.enumOrders = {};
                    var enumIndex = 0;
                    scope.orderStatus = '';
                    _.forEach(enums, function (enumKey, enumValue) {
                      scope.namedMediaColors.push({
                                    name: $rootScope.getWord(enumKey),
                                    statEnum: enumValue,
                                    value: enumValue
                                });
                                if(scope.controllerValue==enumValue)
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
                DefaultApiService.getAllListCall(apiCallType + 'Mis.Interfaces.Enums.NamedMediaColors')
                    .success(function(data){
                      populateEnums(data);
                        scope.namedMediaColor = scope.namedMediaColors[selectedValue];
                    });
            }
        }
    });
});


