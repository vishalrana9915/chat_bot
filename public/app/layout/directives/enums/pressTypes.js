/**
 * Created by Pardha Mugunda on 06/16/2015.
 * Path: app/layout/directives/enums/pressTypes.js
 */

define(['layout/module',
    'lodash'
], function (module) {

    'use strict';

    module.registerDirective('pressTypes', function ($rootScope, DefaultApiService) {
        return {
            restrict: 'EA',
            replace: true,
            //templateUrl: 'app/layout/partials/enums/named-media-colors-dd.tpl.html',
            link:function(scope, elements, attributes ){

                var apiCallType = 'JsTypes?type=';

                var archive = attributes.archive == 'true' || false;
                var selectedValue=-1;
                var populateEnums = function(enums){

                    scope.pressTypes = [];//Only change this scope variable to populate dropdown menu.
                    var enumIndex = 0;
                    _.forEach(enums, function (enumKey, enumValue) {
                      scope.pressTypes.push({
                                    name: $rootScope.getWord(enumKey),
                                    statEnum: enumValue,
                                    value: enumValue
                                });
                                if(scope.pressTypeCtrlValue==enumValue)
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
                DefaultApiService.getAllListCall(apiCallType + 'Mis.Interfaces.Enums.PressTypes')
                    .success(function(data){
                      populateEnums(data);
                        scope.pressType = scope.pressTypes[selectedValue];
                    });
            }
        }
    });
});

