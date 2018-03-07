/**
 * Created by Shawn Miller on 9/3/2015.
 * Path: public/app/layout/directives/input/intlTel.js
 */
define(['layout/module', 'intl-tel-input-master', 'intl-tel-utils'], function (module) {

	'use strict';

	return module.registerDirective('intlTel', function () {
		return {
			restrict: 'A',
			compile: function (tElement, tAttributes) {

				//Remove attribute
				tElement.removeAttr('intl-tel data-intl-tel');

				//Set plugin options
				var options = {
					autoFormat : true,
					autoHideDialCode: false,
					preferredCountries : ['us', 'ca']
				};

				//Initialise it on input element
				tElement.intlTelInput(options);
			}
		}
	});
});