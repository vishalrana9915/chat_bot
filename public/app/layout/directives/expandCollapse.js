define(['layout/module'], function (module) {

    'use strict';

    return module.registerDirective('expandCollapse', function ($rootScope, $compile, $filter, jobRouteService, customerLoyaltyService) {
      return {
        link: function(scope, element, attrs) {

            var childFormat = element.find('.smart-datatable-child-format');
            if(childFormat.length){
                var childFormatTemplate = childFormat.remove().html();
                element.on('click', childFormat.data('childControl'), function () {

                    var tr = $(this).closest('tr');
                    var _dataTable = $('#' + attrs.id).DataTable();
                    var row = _dataTable.row( tr );
                    if ( row.child.isShown() ) {
                        // This row is already open - close it
                        row.child.hide();
                        tr.removeClass('shown');
                    }
                    else {
                        var tbl = $(this).closest('tbody');
                        var rows = tbl[0].children;
                        angular.forEach(rows, function (tr, key) {
                            var row = _dataTable.row( tr );
                            if (row.child.isShown()) {
                                // This row is already open - close it
                                row.child.hide();
                                tr.classList.remove('shown');
                            }
                        });

                        // Open this row
                        var childScope = scope.$new();
                        childScope.d = row.data();
                        var html = $compile(childFormatTemplate)(childScope);
                        row.child( html ).show();


                        // Will loop through this only if there are jobs within the object
                        if (childScope.d.jobs) {
                            var jobsHtml = '<tr>';
                            angular.forEach(childScope.d.jobs, function (value, key) {
                                var priority = "";
                                jobsHtml += '<tr>';

                                //******************************************************************************************//
                                // SSM 07/02/2015 - We are no longer painting rows. Functionality has been replaced with    //
                                // Warning and Danger labels                                                                //
                                //******************************************************************************************//

                                if (value.isExpedite) {
                                    priority = '<span class="label label-warning margin-right-5">' + $rootScope.getWord('Rush') + '</span>';
                                }
                                if (value.isReprint) {
                                    priority += '<span class="label label-danger">' + $rootScope.getWord('Redo') + '</span>';
                                }

                                var productionFacilityName = value.productionFacilityName;
                                if(!productionFacilityName) {
                                    productionFacilityName = value.facilityName;
                                }


                                // TODO: PB: Needs to be reworked.
                                //var html = '<a href="javascript:void(0)" ng-click="viewJobItem(\'' + value.id + '\')" >' + value.jobNo + '</a>';
						        var stringifyId = "'" + value.id + "'";
                                var html = customerLoyaltyService.createRouteLink(stringifyId, value.jobNo, value.hasJobNotes, 'viewJobItem');
                                if (html != scope.isAccessible(value, html))
                                    html = '<a style="color: grey">' + value.jobNo + '</a>';

                                jobsHtml += '<td>' + html + '</td>';

                                jobsHtml += '<td>' + priority + '</td>';

                                jobsHtml += '<td>' + $rootScope.getWord(scope.jobStatuses[value.jobStatus]);

                                jobsHtml += '&nbsp;' + jobRouteService.getJobRoutedTemplate(value);

                                if(value.shouldRerouteToFacilityId){
                                    jobsHtml += '&nbsp;' + '<i class="fa fa-truck" tooltip-placement="bottom" uib-tooltip="{{getWord(\'ShouldBeRouted\')}}"></i>';
                                }

                                jobsHtml += '</td>';

                                jobsHtml += '<td>' + productionFacilityName + '</td>';
                                jobsHtml += '<td>' + $filter('timeFilter')(value.estimatedRunTime, 'mm','dd:hh:mm','','noColon') + '</td>';
                                jobsHtml += '</tr>'
                            });

                            $('#dtOrderJobs-tbody').append( $compile(jobsHtml)(scope) );
                            $('#thOrderNo').append(childScope.d.orderNo);
                            $('#thNoOfJobs').append(childScope.d.numberOfJobsInOrder);
                        }

                        tr.addClass('shown');
                    }
                });
            }
        }
      }
    });
});