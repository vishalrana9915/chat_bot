/**
 * Created by Dante Garcia on 12/9/2015.
 * Path: public/app/layout/directives/expandCollapseRow.js
 */
define(['layout/module'], function (module) {

	'use strict';

	return module.registerDirective('expandCollapseRow', function ($rootScope, $compile, $filter) {
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

							scope.objectHtml = scope.genChildRowHtml(childScope.d);
							row.child(scope.objectHtml).show();

							tr.addClass('shown');
						}
					});
				}
			}
		}
	});
});