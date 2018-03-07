/**
 * Created by Dante Garcia on 5/23/2015.
 * Path: app/layout/directives/enums/customOrderStatus.js
 */
define(['layout/module', 'lodash'], function (module, _) {

    'use strict';

    module.registerDirective('customOrderStatus', function () {
        return {
            restrict: 'EA',
            //replace: true,
            templateUrl: 'app/layout/partials/enums/order-status-dd.tpl.html',
            link:function(scope, element, attributes ){

                $('select').attr('id', attributes.id);

                scope.orderStatusEnums = [];
                var ignoreOrderStatuses = ['Unknown'];
                var filterOrderStatuses = ['Complete', 'Cancelled'];
                var i = 0;

                if(scope.object == "ClosedOrders") {
                    filterOrderStatuses = ['New', 'Hold', 'ReadyForProduction', 'InProduction', 'ReadyForPickup', 'ReadyForShipment', 'InTransit'];
                }

                _.forEach(scope.orderStatuses, function(status, value) {
                    if(_.indexOf(filterOrderStatuses, status) == -1){
                        if(_.indexOf(ignoreOrderStatuses, status) == -1) {
                            scope.orderStatusEnums.push({
                                name: scope.orderStatusesLocalised[value],
                                enumValue: value,
                                value: i
                            });
                            i++
                        }
                    }
                });

                scope.bindOrderStatus = function(){
                    if(scope.orderStatus) {
                        scope.orderStatus = scope.orderStatusEnums[scope.orderStatus.value]
                    }
                };

                scope.$watch('orderStatus',function(){
                    scope.bindOrderStatus();
                });
            }
        }
    });
});


