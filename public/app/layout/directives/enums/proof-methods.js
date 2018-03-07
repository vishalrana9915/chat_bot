﻿//Mis.Interfaces.Enums.Production.JobStatus
/**
 * Created by Dante Garcia on 5/24/2015.
 * Path: app/layout/directives/enums/proof-methods.js
 */
define(['layout/module',
    'lodash'
], function (module) {

    'use strict';

    module.registerDirective('proofMethods', function ($rootScope, DefaultApiService) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'app/layout/partials/enums/proof-methods-dd.tpl.html',
            link:function(scope, elements, attributes ){

                var apiCallType = 'JsTypes?type=';

                /*
                 * DG - If archive attribute is equals true, set var archive is equals true else is equals false.
                 * */
                var archive = attributes.archive == 'true' || false;

                var populateEnums = function(enums){

                    scope.proofMethods = [];//Only change this scope variable to populate dropdown menu.
                    scope.enumOrders = {};
                    var enumIndex = 0;
                    scope.orderStatus = '';
                    angular.forEach(enums, function (enumKey, enumValue) {
                        if(archive){

                            if (jQuery.inArray(enumValue, enumsForArchive) > -1) {
                                scope.proofMethods.push({
                                    name: $rootScope.getWord(enumKey),
                                    statEnum: enumKey,
                                    value: enumIndex
                                });
                                enumIndex++;
                            }


                        }else{
                            if (jQuery.inArray(enumValue, enumsForArchive) == -1) {
                                scope.proofMethods.push({
                                    name: $rootScope.getWord(enumKey),
                                    statEnum: enumKey,
                                    value: enumIndex
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
                DefaultApiService.getAllListCall(apiCallType + 'Mis.Interfaces.Enums.ProofMethods')
                    .success(function(data){
                        if(archive)
                            enumsForArchive = [];//TODO: Need to set enum archive elements.
                        else
                            enumsForArchive = [];
                        populateEnums(data);
                    });
            }
        }
    });
});


