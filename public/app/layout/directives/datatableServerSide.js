/**
 * Created by Pancham Bhagwat on 05/21/2015.
 * Filename: public/app/layout/directives/datatableServerSide.js
 */
define(['layout/module',
	'moment',
	'datatables',
	'datatables-responsive',
	'datatables-colvis',
	'datatables-tools',
	'datatables-bootstrap'
], function (module, moment) {

	'use strict';

	return module.registerDirective('datatableServerSide', function ($compile, $filter, $cookies, $rootScope) {

		var noResultsMessage = "<strong>" + $rootScope.getWord('NoResultsFound') + "</strong>";

		//Get Cookie for use with DataTable Internationalisation plug-in.
		//See options.oLanguage below where returned variable is used.
		if ($cookies.get('_locale') != null) {
			var locale = "plugin/datatables-plugins/i18n/" + $cookies.get('_locale') + ".json";
		}

		return {
			restrict: 'A',
			scope: {
				tableOptions: '='
			},

			link: function (scope, element, attributes) {
				/* // DOM Position key index //

				 l - Length changing (dropdown)
				 f - Filtering input (search)
				 t - The Table! (datatable)
				 i - Information (records)
				 p - Pagination (paging)
				 r - Processing
				 < and > - div elements
				 <"#id" and > - div with an id
				 <"class" and > - div with a class
				 <"#id.class" and > - div with an id and class

				 Also see: http://legacy.datatables.net/usage/features
				 */

				//// This extend is required for server side exporting
				$.fn.dataTable.TableTools.buttons.download = $.extend(
					true,
					{},
					$.fn.dataTable.TableTools.buttonBase,
					{}
				);

				var actiondropdown = "" +
					'<div id="pnlSelectedActions" class="btn-group dropdown" uib-dropdown>' +
					'   <button id="btnMultiAction" ng-disabled="countJobsSelected()<1" class="btn btn-success margin-right-5 dropdown-toggle" uib-dropdown-toggle aria-haspopup="true" aria-expanded="false">' +
					'   {{getWord("ActionSelected")}} <span class="caret"></span>' +
					'	</button>' +
					'	<ul uib-dropdown-menu class="dropdown-menu">' +
					'		<li><a href-void ng-click="DownloadJobTicketList()">{{getWord("PrintJobTickets")}}</a></li>' +
                    '		<li><a href-void ng-click="DownloadShippingSlipList()">{{getWord("PrintShippingSlip")}}</a></li>' +
					'		<li a-disabled="!checkDownloadFiles()"><a a-disabled="!checkDownloadFiles()" href-void ng-click="downloadJobsListFiles()">{{getWord("DownloadFiles")}}</a></li>' +
					'		<li ng-if="currentNextStatus || isRoutable" class="divider"></li>' +
					'		<li><a href-void ng-click="setToStatus()" ng-if="currentNextStatus">{{currentNextStatus}}</a></li>' +
					'		<li a-disabled="!isRoutable"><a href-void a-disabled="!isRoutable" ng-click="routeJobs()">{{getWord("RouteJobs")}}</a></li>' +
					'	</ul>' +
					'</div> ';

				var actionSelectedDropdown = "" +
					'<div id="pnlSelectedActions" class="btn-group dropdown" uib-dropdown>' +
					'   <button id="btnMultiAction" ng-disabled="countJobsSelected()<1" class="btn btn-success margin-right-5 dropdown-toggle" uib-dropdown-toggle aria-haspopup="true" aria-expanded="false">' +
					'   {{getWord("ActionSelected")}} <span class="caret"></span>' +
					'	</button>' +
					'	<ul uib-dropdown-menu class="dropdown-menu">' +
					'		<li><a href-void ng-click="DownloadJobTicketList()">{{getWord("PrintJobTickets")}}</a></li>' +
                    '		<li><a href-void ng-click="DownloadShippingSlipList()">{{getWord("PrintShippingSlip")}}</a></li>' +
					'		<li a-disabled="!checkDownloadFiles()"><a a-disabled="!checkDownloadFiles()" href-void ng-click="downloadJobsListFiles()">{{getWord("DownloadFiles")}}</a></li>' +
					'		<li ng-if="currentNextStatus || isRoutable" class="divider"></li>' +
					'		<li><a href-void ng-click="setToStatus()" ng-if="currentNextStatus">{{currentNextStatus}}</a></li>' +
					'		<li><a href-void id="dtRoutePending_dtAcceptRoute" ng-click="massAcceptRoutes()">{{getWord("AcceptSelected")}}</a></li>' +
					'	</ul>' +
					'</div> ';

				var exportHtml = '<a id="lnkExport" ng-click="exportPdf()" class="btn btn-default margin-right-5 margin-left-5" >{{getWord("Export")}}</a>';

				var options = {
					autoWidth: false,
					serverSide: true,
					stateSave: true,
					filter: false,

					"smartResponsiveHelper": null,
					"sDom": '<"dt-toolbar"<"#filteredContainer.col-xs-12 col-lg-6 col-md-6 col-sm-6"><"col-lg-6 col-md-6 col-sm-6 hidden-xs"<"#fooBar.pull-right"l> >r>' +
					't' +
					'<"dt-toolbar-footer"<"col-sm-6 col-xs-12 hidden-xs"i><"col-xs-12 col-sm-6"p>>',

					"fnInitComplete": function (oSettings, json) {
						//alert( 'DataTables has finished its initialisation.' );
					},

					oLanguage: {
						"sSearch": "<span class='input-group-addon input-sm'><i class='glyphicon glyphicon-search'></i></span>",
						"sLengthMenu": "_MENU_",
						"sEmptyTable": noResultsMessage
						, "sUrl": locale
					},

					"fnHeaderCallback": function (nHead) {

						var fooBar = $('#fooBar')[0];
						var searchedHtml = '';

						$compile(angular.element(nHead))(scope.$parent);

						if ($('#filteredContainer')[0]) {
							$('#filteredContainer')[0].innerHTML = '';
						}

						if (scope.$parent.searchPerformed) {
							searchedHtml += '<div><strong class="k k-top-left">' + $rootScope.getWord('Searchedby') + ': </strong><span>' + unescape(scope.$parent.searchPerformed) + '</span></div>';
						}

						if (scope.$parent.filterPerformed) {
							searchedHtml += '<div><strong class="k k-top-left">' + $rootScope.getWord('Filteredby') + ': </strong><span>' + unescape(scope.$parent.filterPerformed) + '</span></div>';
						}

						$('#filteredContainer').prepend($compile(searchedHtml)(scope.$parent));

						if ($('#dtJobs')[0]) {
							if(!$('#pnlSelectedActions')[0]) {
								$("#fooBar").append($compile(actiondropdown)(scope.$parent));
							}
						}

						/**************************************************************/
						/* ROUTE PENDING FUNCTIONALITY                                */
						/**************************************************************/
						// Original
						// if (!$('#dtRoutePending_dtAcceptRoute')[0]) {
						// 	$("#dtRoutePending_length").before($compile('<a class="btn btn-success margin-right-5" id="dtRoutePending_dtAcceptRoute" ng-click="massAcceptRoutes()">' + $rootScope.getWord('AcceptSelected') + '</a>')(scope.$parent));
						// }

						if (!$('#dtRoutePending_dtAcceptRoute')[0]) {
							$('#dtRoutePending_length').before($compile(actionSelectedDropdown)(scope.$parent));
						}


						if (!$('#lnkExport')[0]) {
							$("#fooBar").append($compile(exportHtml)(scope.$parent));
						}

					},

					"fnPreDrawCallback": function () {
						// Initialize the responsive datatables helper once.
						if (!this.smartResponsiveHelper) {
							this.smartResponsiveHelper = new ResponsiveDatatablesHelper(element, {
								tablet: 1024,
								phone: 480
							});
						}
					},

					"fnRowCallback": function (nRow) {
						this.smartResponsiveHelper.createExpandIcon(nRow);
					},

					'stateSaveParams': function (oSettings, oData) {
						//// Save the filter parameters to local storage
						scope.saveFilterParamsToLocalStorage(oSettings, oData);
					},

					'stateLoadParams': function () {
						var data = localStorage.getItem('DataTables_' + scope.$parent.object + window.location.pathname);
						var stateObj = JSON.parse(data);
						if (stateObj)
							scope.$parent.pageLength = stateObj.length;
						return stateObj;
					},

					"fnDrawCallback": function (oSettings) {
						this.smartResponsiveHelper.respond();
					},

					"footerCallback": function (row, data, start, end, display) {
						var createDivId = "#" + attributes.id + "_info";
						var footerSection = angular.element(createDivId);
						//footerSection[0].outerText;
						setTimeout(function () {

							//This is only a quick fix to release 8/19/2015
							var getText = footerSection[0].textContent;
							var shortenText = getText.split('(');
							footerSection[0].textContent = shortenText[0];

						}, 1);

					},

					"fnServerData": function (sSource, aoData, fnCallback, oSettings) {
						// scope.$parent.startSpinner();
                        $rootScope.startSpinner();
						/*#################################################################################################
						 Support for saving state of the user from edit view to list view
						 #################################################################################################*/
						if (scope.$parent.searchedObj && scope.$parent.searchedObj.length > 0) {
							//$('#filterCollapse').addClass('in');
							for (var j = 0; j < scope.$parent.searchedObj.length; j++) {
								switch (scope.$parent.searchedObj[j].name) {
									case 'FilterCols':
										scope.$parent.searchBy = scope.$parent.searchedObj[j].value;
										break;
									case 'Filter':
										scope.$parent.searchText = scope.$parent.searchedObj[j].value;
										break;
									case 'OrderPriority':
										scope.$parent.orderPriority = scope.$parent.orderPriorities[scope.$parent.searchedObj[j].value.value];
										break;
									case 'OrderStatus':
										scope.$parent.orderStatus = scope.$parent.searchedObj[j].value;
										break;
									case 'JobPriority':
										scope.$parent.jobPriority = scope.$parent.jobPriorities[scope.$parent.searchedObj[j].value.value];
										break;
									case 'JobStatus':
										scope.$parent.jobStatus = scope.$parent.searchedObj[j].value;
										break;
									case 'LoyaltyStatus':
										scope.$parent.loyaltyStatus = scope.$parent.loyaltyStatuses[scope.$parent.searchedObj[j].value.value];
										scope.$parent.otherSelectionJSONToTextConversion(scope.$parent.searchedObj[j].value);
										break;
									case 'ShippingMethod':
										scope.$parent.shippingMethod = scope.$parent.shippingMethods[scope.$parent.searchedObj[j].value.value];
										break;
									case 'DeliveryRoute':
										scope.$parent.deliveryRoute = scope.$parent.searchedObj[j].value;
										scope.$parent.otherSelectionJSONToTextConversion(scope.$parent.deliveryRoute);
										break;
									case 'PastDue':
										scope.$parent.isPastDue = scope.$parent.searchedObj[j].value;
										break;
									case 'DateFilter':
										scope.$parent.dateType = scope.$parent.searchedObj[j].value;
										break;
									case 'StartDate':
										scope.$parent.fromDate = scope.$parent.searchedObj[j].value;
										break;
									case 'EndDate':
										scope.$parent.toDate = scope.$parent.searchedObj[j].value;
										break;
									case 'SearchApplied':
										scope.$parent.searchApplied = scope.$parent.searchedObj[j].value;
										break;
									case 'FilterApplied':
										scope.$parent.filterApplied = scope.$parent.searchedObj[j].value;
										break;
									case 'JobProductCellType':
										scope.$parent.jobProductCellType = scope.$parent.searchedObj[j].value;
										scope.$parent.otherSelectionJSONToTextConversion(scope.$parent.jobProductCellType);
										break;
									case 'IsPickup':
										scope.$parent.isPickup = scope.$parent.searchedObj[j].value;
										scope.$parent.otherSelectionJSONToTextConversion(scope.$parent.isPickup);
										break;
								}
							}
						}

						scope.$parent.searchedObj = null;
						localStorage.setItem('DataTables_Filtered_' + scope.$parent.object + window.location.pathname, scope.$parent.searchedObj);

						///#################################################################################################

						var sortedColumn = {};
						for (var i = 0; i < aoData.length; i++) {
							if (aoData[i].name == 'order')
								sortedColumn = aoData[i].value[0];
						}

						aoData = []; //Clear out all extra DataTables Parameters.
						aoData.push({"name": "OrderBy", "value": scope.$parent.tableColumns[sortedColumn.column]});

						if (sortedColumn.dir == 'asc')
							aoData.push({"name": "Descending", "value": "false"});
						else
							aoData.push({"name": "Descending", "value": "true"});

						aoData.push({
							"name": "PageSize",
							"value": oSettings._iDisplayLength
						});


						/*###############################################################################################
						 For displaying the correct page number
						 #################################################################################################*/
						var pgIndex = Math.round(oSettings._iDisplayStart / oSettings._iDisplayLength);
						scope.$parent.pageNum = pgIndex;
						if (scope.$parent.pageLength == oSettings._iDisplayLength) {
							pgIndex += 1;
						}
						else {
							var pages = Math.ceil(oSettings._iRecordsDisplay / oSettings._iDisplayLength);
							if (oSettings._iDisplayLength < oSettings._iDisplayStart) {
								for (var i = 1; i <= pages; i++) {
									if (((i * oSettings._iDisplayLength) <= oSettings._iDisplayStart) &&
										(((i + 1) * oSettings._iDisplayLength) > oSettings._iDisplayStart)) {
										oSettings._iDisplayStart = (i * oSettings._iDisplayLength);
										break;
									}
								}
							}
						}

						aoData.push({
							"name": "PageIndex",
							"value": pgIndex
						});

						/*if (scope.$parent.object && !scope.$parent.filterApplied)
							aoData.push({
								"name": "JobStatus",
								"value": 'active'
							});*/

						scope.$parent.filterApplied = true;

						scope.$parent.pageLength = oSettings._iDisplayLength;

						scope.$parent.searchPerformed = "";
						if (scope.$parent.searchApplied) {
							if (scope.$parent.searchText && scope.$parent.searchText.length > 0) {
								aoData.push({"name": "FilterCols", "value": scope.$parent.searchBy.backendName});
								aoData.push({"name": "Filter", "value": unescape(scope.$parent.searchText)});
								scope.$parent.searchPerformed = scope.$parent.searchText;
							}
						}

						scope.$parent.filterPerformed = "";
						if (scope.$parent.filterApplied) {
							if (scope.$parent.orderPriority) {
								if (scope.$parent.orderPriority.backendName == 'none') {
									aoData.push({"name": "ContainsReprint", "value": "false"});
									aoData.push({"name": "IsUrgent", "value": "false"});
								} else
									aoData.push({"name": scope.$parent.orderPriority.backendName, "value": 'true'});

								scope.$parent.filterPerformed += scope.$parent.orderPriority.name;
							}
							if (scope.$parent.jobPriority) {
								if (scope.$parent.jobPriority.backendName == 'none') {
									aoData.push({"name": "IsReprint", "value": "false"});
									aoData.push({"name": "IsExpedite", "value": "false"});
								} else
									aoData.push({"name": scope.$parent.jobPriority.backendName, "value": 'true'});

								scope.$parent.filterPerformed += scope.$parent.jobPriority.name;
							}

							if (scope.$parent.orderStatus) {
								aoData.push({"name": "OrderStatus", "value": scope.$parent.orderStatus.enumValue});
								if (scope.$parent.filterPerformed.length > 0) {
									scope.$parent.filterPerformed += ' || ';
								}
								scope.$parent.filterPerformed += scope.$parent.orderStatus.name;
							}

							if (scope.$parent.jobStatus) {
								aoData.push({"name": "JobStatus", "value": scope.$parent.jobStatus.enumValue});
								if (scope.$parent.filterPerformed.length > 0) {
									scope.$parent.filterPerformed += ' || ';
								}
								scope.$parent.filterPerformed += scope.$parent.jobStatus.name;
							}
							else{
                                aoData.push({"name": "JobStatus", "value": ''});
                                if (scope.$parent.filterPerformed.length > 0) {
                                    scope.$parent.filterPerformed += '';
                                }
                                scope.$parent.filterPerformed += '';
							}


							if (scope.$parent.loyaltyStatus) {
								aoData.push({"name": scope.$parent.loyaltyStatus.backendName, "value": true});
								if (scope.$parent.filterPerformed.length > 0) {
									scope.$parent.filterPerformed += ' || ';
								}
								scope.$parent.filterPerformed += scope.$parent.loyaltyStatus.name;
							}
							if (scope.$parent.isPickup) {
								aoData.push({"name": 'IsPickup', "value": scope.$parent.isPickup.boolValue});
								if (scope.$parent.filterPerformed.length > 0) {
									scope.$parent.filterPerformed += ' || ';
								}
								scope.$parent.filterPerformed += scope.$parent.isPickup.name;
							}

							if (scope.$parent.shippingMethod) {
								aoData.push({"name": scope.$parent.shippingMethod.backendName, "value": true});
								if (scope.$parent.filterPerformed.length > 0) {
									scope.$parent.filterPerformed += ' || ';
								}
								scope.$parent.filterPerformed += scope.$parent.shippingMethod.name;
							}

							if (scope.$parent.jobProductCellType) {
								aoData.push({
									"name": "JobProductCellTypeId",
									"value": scope.$parent.jobProductCellType.id
								});
								if (scope.$parent.filterPerformed.length > 0) {
									scope.$parent.filterPerformed += ' || ';
								}
								scope.$parent.filterPerformed += scope.$parent.jobProductCellType.name;
							}

							if (scope.$parent.deliveryRoute) {
								aoData.push({
									"name": "DeliveryRouteId",
									"value": scope.$parent.deliveryRoute.id
								});
								if (scope.$parent.filterPerformed.length > 0) {
									scope.$parent.filterPerformed += ' || ';
								}
								scope.$parent.filterPerformed += scope.$parent.deliveryRoute.name;
							}

							if (scope.$parent.isPastDue) {
								aoData.push({"name": "PastDue", "value": 'true'});
								if (scope.$parent.filterPerformed.length > 0) {
									scope.$parent.filterPerformed += ' || ';
								}
								scope.$parent.filterPerformed += 'Past Due';

								var date = moment().format("YYYY-MM-DD HH:mm:ss");
								aoData.push({"name": "DateNow", "value": moment(date).utc().unix()});
							}


							if (scope.$parent.fromDate && !scope.$parent.toDate) {
								scope.$parent.toDate = scope.$parent.fromDate;
							}

							if (scope.$parent.dateType && scope.$parent.fromDate && scope.$parent.toDate) {
								//aoData.push({"name": "StartDate", "value": moment(scope.$parent.fromDate).utc().format("YYYY-MM-DD HH:mm:ss")});
								//aoData.push({"name": "EndDate", "value": moment(scope.$parent.toDate).utc().format("YYYY-MM-DD HH:mm:ss")});
								aoData.push({"name": "DateFilter", "value": scope.$parent.dateType});
								var startDate = moment(new Date(scope.$parent.fromDate)).format("YYYY-MM-DD HH:mm:ss");
								var endDate = moment(new Date(scope.$parent.toDate));
								endDate = moment(endDate).add(1, "days");
								endDate = moment(endDate).subtract(1, 'seconds');
								endDate = moment(endDate).format("YYYY-MM-DD HH:mm:ss");

								aoData.push({"name": "StartDate", "value": moment(startDate).utc().unix()});
								aoData.push({"name": "EndDate", "value": moment(endDate).utc().unix()});
								if (scope.$parent.filterPerformed.length > 0) {
									scope.$parent.filterPerformed += ' || ';
								}

								scope.$parent.filterPerformed += scope.$parent.fromDate;
								scope.$parent.filterPerformed += ' to ';
								scope.$parent.filterPerformed += scope.$parent.toDate;
							}
						}


						//// This export url is used to export
						scope.$parent.exportUrl = appConfig.apiURL + "/api/" + scope.$parent.object + "?";
						for (var j = 0; j < aoData.length; j++) {

							if (j != 0)
								scope.$parent.exportUrl += '&';

							if (aoData[j].name == 'PageSize') {
								scope.$parent.exportUrl += aoData[j].name + "=100000";
							}
							else {
								scope.$parent.exportUrl += aoData[j].name + "=" + aoData[j].value;
							}
						}

						oSettings.jqXHR = $.ajax({
							"type": "GET",
							"cache": false,
							"url": appConfig.apiURL + "/api/" + scope.$parent.object,
							"data": aoData,
							beforeSend: function (xhr) {
								xhr.setRequestHeader('Authorization', "Bearer " + $cookies.get('_Token'));
								xhr.setRequestHeader('Accept-Language', $cookies.get('_locale'));
								//xhr.setRequestHeader('MisDate', moment().utc().format());
							},
							success: function (json) {
								json.iTotalRecords = json.paging.records;
								json.iTotalDisplayRecords = json.paging.total;
								oSettings.json = json;
								// scope.$parent.stopSpinner();
                                $rootScope.stopSpinner();
								scope.$parent[scope.$parent.object] = json.data;
								if (scope.$parent.previousSelectedJobs) {
									scope.$parent.previousSelectedJobs(json.data);
								}
								fnCallback(json);
							},
							error: function () {
								// scope.$parent.stopSpinner();
                                $rootScope.stopSpinner();
							}
						});
					}
				};

				if (attributes.tableOptions) {
					options = angular.extend(options, scope.tableOptions)
				}
				var _dataTable = element.DataTable(options);
			},

			controller: function ($scope) {


				$scope.$parent.exportPdf = function(){
					$.ajax({
						"type": "GET",
						"url": $scope.$parent.exportUrl + "&format=csv",
						"cache": false,
						beforeSend: function (xhr) {
							xhr.setRequestHeader('Authorization', "Bearer " + $cookies.get('_Token'));
							xhr.setRequestHeader('Accept-Language', $cookies.get('_locale'));

						},
						"success": function (json) {
							var d = new Date();
							var dt = d.toDateString();
							var link = document.createElement("a");
							document.body.appendChild(link);
							link.setAttribute('id', 'downloadExport');
							if (navigator.msSaveBlob) { // IE 10+
								navigator.msSaveBlob(new Blob([json], {type: 'text/csv;charset=utf-8;'}), $scope.$parent.object + "_" + dt + ".csv");
							} else {
								link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(json));
								link.setAttribute('download', $scope.$parent.object + "_" + dt + ".csv");
							}
							link.click();
						}
					});
				};

				//// Save filter and search params to local storage
				$scope.saveFilterParamsToLocalStorage = function (oSettings, oData) {
					localStorage.setItem('DataTables_' + $scope.$parent.object + window.location.pathname, JSON.stringify(oData));

					var saveSearchedObj = [];

					if ($scope.$parent.searchApplied) {
						saveSearchedObj.push({"name": "SearchApplied", "value": $scope.$parent.searchApplied});
						if ($scope.$parent.searchText && $scope.$parent.searchText.length > 0) {
							saveSearchedObj.push({"name": "FilterCols", "value": $scope.$parent.searchBy});
							$scope.$parent.searchText = unescape($scope.$parent.searchText);
							saveSearchedObj.push({"name": "Filter", "value": escape($scope.$parent.searchText)});
							$scope.$parent.searchText = unescape($scope.$parent.searchText);
						}
					}

					if ($scope.$parent.filterApplied) {
						saveSearchedObj.push({"name": "FilterApplied", "value": $scope.$parent.filterApplied});

						if ($scope.$parent.orderPriority) {
							saveSearchedObj.push({"name": "OrderPriority", "value": $scope.$parent.orderPriority});
						}

						if ($scope.$parent.orderStatus) {
							saveSearchedObj.push({"name": "OrderStatus", "value": $scope.$parent.orderStatus});
						}

						if ($scope.$parent.jobPriority) {
							saveSearchedObj.push({"name": "JobPriority", "value": $scope.$parent.jobPriority});
						}

						if ($scope.$parent.jobStatus) {
							saveSearchedObj.push({"name": "JobStatus", "value": $scope.$parent.jobStatus});
						}
						else{
                            saveSearchedObj.push({"name": "JobStatus", "value": ''});
						}

						if ($scope.$parent.jobProductCellType) {
							saveSearchedObj.push({
								"name": "JobProductCellType",
								"value": $scope.$parent.jobProductCellType
							});
						}

						if ($scope.$parent.loyaltyStatus) {
							saveSearchedObj.push({"name": "LoyaltyStatus", "value": $scope.$parent.loyaltyStatus});
						}

						if ($scope.$parent.shippingMethod) {
							saveSearchedObj.push({"name": "ShippingMethod", "value": $scope.$parent.shippingMethod});
						}

						if ($scope.$parent.deliveryRoute) {
							saveSearchedObj.push({"name": "DeliveryRoute", "value": $scope.$parent.deliveryRoute});
						}

						if ($scope.$parent.isPastDue) {
							saveSearchedObj.push({"name": "PastDue", "value": true});
						}

						if ($scope.$parent.isPickup) {
							//scope.$parent.isPickup.value
							saveSearchedObj.push({"name": "IsPickup", "value": $scope.$parent.isPickup});
						}

						if ($scope.$parent.dateType && $scope.$parent.fromDate && $scope.$parent.toDate) {
							saveSearchedObj.push({"name": "DateFilter", "value": $scope.$parent.dateType});
							saveSearchedObj.push({"name": "StartDate", "value": $scope.$parent.fromDate});
							saveSearchedObj.push({"name": "EndDate", "value": $scope.$parent.toDate});
						}
					}

					localStorage.setItem('DataTables_Filtered_' + $scope.$parent.object + window.location.pathname, JSON.stringify(saveSearchedObj));
				};
			}
		};
	});
});

