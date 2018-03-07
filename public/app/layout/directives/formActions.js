/**
 * Created by Shawn Miller on 5/12/2015.
 * Path: public/app/layout/directives/formActions.js
 */
define(['layout/module',
	'lodash'
], function (module, _) {

	'use strict';

	module.registerDirective('formActions', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'app/layout/partials/form-actions.tpl.html',
			link:function(scope, elements, attributes) {


				/*********************************************************
				 * Added text attribute for create button from directive
				 **********************************************************/
				scope.createText = 'Create';
				if (attributes.createText) {
					scope.createText = attributes.createText;
				}

				scope.cancelText = 'Cancel';
                if (attributes.cancelText) {
                    scope.cancelText = attributes.cancelText;
                }

				/*********************************************************
				* Added isolated div for close button -Dante G. 8/27/2015*
				**********************************************************/
				if(attributes.readOnly)
					scope.activeView = true;

				if (attributes.showcheck)
					attributes.vshowCheck = attributes.showcheck;

				scope.showCheck = attributes.vshowCheck;

				$('#submitAnother').on('click', function(){
					$(this).submit();
				});

				/***********************************************************
				 * Disable submit buttons after form is submitted -Dante G.*
				 ***********************************************************/
				var form = $("form").attr('id');

				$('#'+form).on('submit', function(){
					angular.element('#btn1').attr('disabled', 'disabled');
					angular.element('#btn2').attr('disabled', 'disabled');
					angular.element('#btnSave').attr('disabled', 'disabled');
				});
			}
		}
	});
});


