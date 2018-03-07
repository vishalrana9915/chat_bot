/**
 * Created by Dante Garcia on 2/01/2017.
 * Path: public/app/layout/directives/barcodeScanner.js
 */
define(['layout/module', 'jquery'], function (module, $) {

    'use strict';

    $.root_ = $('body');
    var root = window;


    var fadeAnimation = 450;

    module.registerDirective('barcodeScanner', function ($log, DefaultApiService, $location, systemRefreshService, $state, $timeout, $rootScope, barcodeScannerService) {

        var bcScanner = barcodeScannerService;
        var link = function (scope, element) {
            scope.barcode = '';
            if (appConfig.facility_selector) {

                // CREATE DYNAMIC MODAL INSTANCE
                var modal = $('<div id="barcodeScannerModal" class="modal fade"tabindex="-1" role="dialog" aria-labelledby="remoteModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"></div></div></div>');


                // ATTACH MODAL TO BODY
                modal.appendTo("body");

                scope.facilitySelected = 'disabled';

                //INITIALIZE FACILITIES SELECT OPTIONS
                scope.facilities = [];

                DefaultApiService.readObjectCall('Facilities', 'Lookup')
                    .success(function (facilities) {
                        scope.removeCurrentFacility(facilities);
                    });

                element.on("click", function (e) {

                    //MAKE THE CALL IF ARRAY IS NOT POPULATED.
                    if ((systemRefreshService.getFacilitiesRefreshFlag()) || (scope.facilities.length < 1)) {
                        DefaultApiService.readObjectCall('Facilities', 'Lookup')
                            .success(function (facilities) {
                                scope.removeCurrentFacility(facilities);
                                systemRefreshService.resetFacilityFreshFlag();
                            });
                    }

                    //FADE IN DURATION
                    $('#barcode-scanner-btn .popover').fadeIn(fadeAnimation);

                    e.preventDefault();
                });

                scope.removeCurrentFacility = function (facilities) {
                    scope.facilities = _.remove(facilities, function (facility) {
                        if (scope.user) {
                            return facility.id != scope.user.curFacilityId;
                        }
                        return facility;
                    });
                };

                $(document).mouseup(function (e) {

                    if (!$('#barcode-scanner-btn .popover').is(e.target) && $('#barcode-scanner-btn .popover').has(e.target).length === 0) {
                        var ignoreClassList = ['select2-results__option', 'select2-search__field', 'select2-results__options']
                        var ignoreFade = false;

                        _.forEach(ignoreClassList, function (classItem) {
                            if (e.target.classList.contains(classItem)) {
                                ignoreFade = true;
                            }
                        });

                        if (!ignoreFade) {
                            $('#barcode-scanner-btn .popover').fadeOut(fadeAnimation);
                        }
                    }

                    var $eventSelect = $("#cboBarcodeScanner");
                    $eventSelect.on("select2:close", function (e) {
                        e.preventDefault();
                        $('#set-barcode-scanner-btn').focus();
                        //$(this).next("#set-facility-btn").focus();
                    });


                });

                element.bind("keydown keypress", function (event) {
                    if (event.which === 13) {
                        console.log('This works!');
                        // scope.$apply(function (){
                        // 	scope.$eval(attrs.myEnter);
                        // });

                        event.preventDefault();
                    }
                });

                scope.listenEnter = function (e) {

                    if (e.keyCode == 13) {
                        console.log('test');
                    }
                }

                //*****************************************************//
                //** BUTTON CLICK FACILITY SET                       **//
                //*****************************************************//
                $("#set-barcode-scanner-btn").on("click", function () {
                    scope.changeFacility();
                });

                //*****************************************************//
                //** BUTTON CLICK FACILITY CLOSE                     **//
                //*****************************************************//
                $("#close-barcode-scanner-btn").on("click", function () {
                    $('#barcode-scanner-btn .popover').fadeOut(fadeAnimation);
                });

                //*****************************************************//
                //** BUTTON CLICK FACILITY HELP                      **//
                //*****************************************************//

                $("#barcode-scanner-command-btn").on("click", function () {
                    $('#cboBarcodeScanner').focus();
                });

            }
            else {
                //HIDE FACILITY BUTTON
                $("#barcode-scanner-btn").addClass("display-none");
            }

            /*#######################################################
             #					START SCANNING PROCESS.				#
             #########################################################*/

            scope.startScanning = function () {
                if (scope.barcode.length > 0) {
                    bcScanner.startScanningProcess(scope.barcode)
                        .success(function () {
                            scope.barcode = '';
                            $('#close-barcode-scanner-btn').click();
                        }).error(function () {
                        scope.barcode = '';
                    });
                }
            };

            scope.activateScanClick = function () {
                scope.startScanning();
            };

            scope.activateScan = function (e) {
                if (e.keyCode == 13) {
                    scope.startScanning();
                }
            };

            /*########################################################
             #					END SCANNING PROCESS.				 #
             ##########################################################*/

        };//eo variable link

        return {
            restrict: 'AE',
            link: link
        }
    });

});
