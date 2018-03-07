/**
 * Created by Shawn Miller on 4/18/2015.
 * Filename: public/app/layout/directives/datatableColumnFilter.js
 */
define(['layout/module',
	'datatables',
	'datatables-responsive',
	'datatables-colvis',
	'datatables-tools',
	'datatables-bootstrap'
], function (module) {

	'use strict';

	return module.registerDirective('datatableColumnFilter', function () {

		//Get Cookie for use with DataTable Internationalisation plug-in.
		//See options.oLanguage below where returned variable is used.
		if ($cookies.get('_locale') != null) {
			var locale = "plugin/datatables-plugins/i18n/" + $cookies.get('_locale') + ".json";
		}

		return {
			restrict: 'A',
			link: function (scope, element, attributes) {
				/* // DOM Position key index //

				 l - Length changing (dropdown)
				 f - Filtering input (search)
				 t - The Table! (datatable)
				 i - Information (records)
				 p - Pagination (paging)
				 r - pRocessing
				 < and > - div elements
				 <"#id" and > - div with an id
				 <"class" and > - div with a class
				 <"#id.class" and > - div with an id and class

				 Also see: http://legacy.datatables.net/usage/features
				 */

				var responsiveHelper = undefined;

				var breakpointDefinition = {
					tablet: 1024,
					phone: 480
				};

				var otable = element.DataTable({
					//"bFilter": false,
					//"bInfo": false,
					//"bLengthChange": false
					//"bAutoWidth": false,
					//"bPaginate": false,
					//"bStateSave": true // saves sort state using localStorage
					"sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6 hidden-xs'f><'col-sm-6 col-xs-12 hidden-xs'<'toolbar'>>r>" +
					"t" +
					"<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
					oLanguage: {
						"sSearch": "<span class='input-group-addon input-sm'><i class='glyphicon glyphicon-search'></i></span> ",
						"sEmptyTable": "No Results Found",
						"sUrl": locale
					},

					"autoWidth": false,

					"preDrawCallback": function () {
						// Initialize the responsive datatables helper once.
						if (!responsiveHelper) {
							responsiveHelper = new ResponsiveDatatablesHelper(element, breakpointDefinition);
						}
					},

					"rowCallback": function (nRow) {
						responsiveHelper.createExpandIcon(nRow);
					},

					"drawCallback": function (oSettings) {
						responsiveHelper.respond();
					},

					"fnHeaderCallback": function (nHead) {
						$compile(angular.element(nHead))(scope.$parent);
					}

				});

				// custom toolbar
				element.parent().find("div.toolbar").html('<div class="text-right"><img src="styles/img/logo.png" alt="SmartAdmin" style="width: 111px; margin-top: 3px; margin-right: 10px;"></div>');

				// Apply the filter
				element.on('keyup change', 'thead th input[type=text]', function () {

					otable
						.column($(this).parent().index() + ':visible')
						.search(this.value)
						.draw();

				});
			}
		}
	});
});
