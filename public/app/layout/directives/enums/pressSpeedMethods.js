/**
 * Created by Pardha Mugunda on 06/16/2015.
 * Path: app/layout/directives/enums/pressSpeedMethods.js
 */

define(['layout/module',
    'lodash'
], function (module) {

    'use strict';

    module.registerDirective('pressSpeedMethods', function ($rootScope, DefaultApiService) {
        return {
            restrict: 'EA',
            replace: true,
            //templateUrl: 'app/layout/partials/enums/named-media-colors-dd.tpl.html',
            link:function(scope, elements, attributes ){

                var apiCallType = 'JsTypes?type=';

                var archive = attributes.archive == 'true' || false;
                var selectedValue=-1;
                var populateEnums = function(enums){

                    scope.pressSpeedMethods = [];//Only change this scope variable to populate dropdown menu.
                    scope.enumOrders = {};
                    var enumIndex = 0;
                    scope.orderStatus = '';
                    _.forEach(enums, function (enumKey, enumValue) {
                      scope.pressSpeedMethods.push({
                                    name: $rootScope.getWord(enumKey),
                                    statEnum: enumValue,
                                    value: enumValue
                                });
                                if(scope.pressSpeedMethodCtrlValue==enumValue)
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
                DefaultApiService.getAllListCall(apiCallType + 'Mis.Interfaces.Enums.PressSpeedMethods')
                    .success(function(data){
                      populateEnums(data);
                        scope.pressSpeedMethod = scope.pressSpeedMethods[selectedValue];
                    });
            }
        }
    });
});


