/**
 * Created by Dante Garcia on 2/02/2017.
 * Path: app/layout/service/dataTableValueEncoderFactory.js
 */

define(['layout/module'], function (module) {

    'use strict';

    module.registerFactory('barcodeScannerService', function ($log,$rootScope, $state, DefaultApiService, facilityRouteService) {

        var das = DefaultApiService;
        return {
            /*
             Encode all the string fields for DataTables.
             PropertyNames should only reference fields that contain string values.

             var propertyNames = [
             'name',
             'type',
             'region',
             'externalCode'
             ];
             */
            activateScanner: function () {
            },
            processBarcode: function (barcode) {
                $rootScope.startSpinner();
                console.log(barcode);
                try {
                    return das.readObjectCall('LookUpObject', barcode)
                        .success(function (data) {
                            switch (data.route) {
                                case 1:
                                    $state.go(facilityRouteService.getOrdersViewScreen(), {'id':data.id});
                                    break;
                                case 2:
                                    $state.go(facilityRouteService.getJobViewScreen(), {'id':data.id});
                                    break;
                                case 3:
                                    $state.go(facilityRouteService.getClosedOrdersViewScreen(), {'id':data.id});
                                    break;
                            }
                            $rootScope.stopSpinner();
                        })
                        .error(function () {
                            $rootScope.stopSpinner();
                        });
                } catch (e) {
                    console.log(e);
                }

            },
            startScanningProcess: function (barcode) {
                return this.processBarcode(barcode);
            },


        };

    });
});