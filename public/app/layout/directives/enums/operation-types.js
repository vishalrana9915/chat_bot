//Mis.Interfaces.Enums.Production.JobStatus
/**
 * Created by Dante Garcia on 5/24/2015.
 * Path: app/layout/directives/enums/operation-types.js
 */
define(['layout/module',
    'lodash'
], function (module) {

    'use strict';

    module.registerDirective('operationTypes', function ($rootScope, DefaultApiService) {
        return {
            link:function(scope, elements, attributes ){

                var apiCallType = 'JsTypes?type=';

                /*
                 * DG - If archive attribute is equals true, set var archive is equals true else is equals false.
                 * */
                var selectedValue = -1;
                var populateEnums = function(enums){

                    scope.operationTypes = [];//Only change this scope variable to populate dropdown menu.
                    var enumIndex = 0;

                    _.forEach(enums, function (enumKey, enumValue) {
                        scope.operationTypes.push({
                            name: $rootScope.getWord(enumKey),
                            statEnum: enumValue,
                            value: enumIndex
                        });
                        //if(scope.ctrlstockTypesValue == enumValue)
                        //    selectedValue = enumIndex;
                        enumIndex++;
                    });
                };

                /*
                 * Initialize call for Orders Statuses...
                 * TODO: Avoid another call if the statuses have already being loaded.
                 *
                 **/
                DefaultApiService.getAllListCall(apiCallType + 'Mis.Interfaces.Enums.Production.OperationTypes')
                    .success(function(data){
                        populateEnums(data);
                        //scope.stockType = scope.stockTypes[selectedValue];
                    });
            }
        }
    });
});


