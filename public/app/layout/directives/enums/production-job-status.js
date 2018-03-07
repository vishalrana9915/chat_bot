//Mis.Interfaces.Enums.Production.JobStatus
/**
 * Created by Dante Garcia on 5/24/2015.
 * Path: app/layout/directives/enums/production-job-status.js
 */
define(['layout/module', 'lodash'], function (module) {

    'use strict';

    module.registerDirective('jobStatus', function ($rootScope) {
        return {
            restrict: 'EA',
            templateUrl: 'app/layout/partials/enums/job-status-dd.tpl.html',
            link:function(scope){

                scope.jobStatusEnums = []; //Only change this scope variable to populate dropdown menu.
                var ignoreJobStatuses = ['WaitingFiles', 'ShippedFromProductionCenter'];
                var i = 3;


                scope.jobStatusEnums.push({
                    name: $rootScope.getWord('WipStatus'),
                    enumValue: 'wip',
                    value: 0,
                    group: $rootScope.getWord('GroupStatus')
                });

                scope.jobStatusEnums.push({
                    name: $rootScope.getWord('ActiveWIP'),
                    enumValue: 'active',
                    value: 1,
                    group: $rootScope.getWord('GroupStatus')
                });

                scope.jobStatusEnums.push({
                    name: $rootScope.getWord('InactiveStatus'),
                    enumValue: 'inactive',
                    value: 2,
                    group: $rootScope.getWord('GroupStatus')
                });

                _.forEach(scope.jobStatuses, function(status, value){
                    if(_.indexOf(ignoreJobStatuses, status) == -1) {

                        scope.jobStatusEnums.push({
                            name: scope.jobStatusesLocalised[value],
                            enumValue: value,
                            value: i,
                            group: $rootScope.getWord('IndividualStatus')
                        });
                        i++;
                    }
                });

                scope.bindJobStatus = function(){
                    if(scope.jobStatus) {
                        scope.jobStatus = _.find(scope.jobStatusEnums, function (item) {
                            return item.enumValue == scope.jobStatus.enumValue;
                        });
                    }
                };

                scope.$watch('jobStatus',function(){
                    scope.bindJobStatus();
                });
            }
        }
    });
});


