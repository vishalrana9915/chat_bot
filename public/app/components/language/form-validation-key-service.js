/**
 * Created by Shawn Miller on 9/2/2015.
 * Path: public/app/components/language/form-validation-key-service.js
 */
define(['app', 'form-validator-i18n'], function (app) {
	"use strict";

	return app.factory('formValidationKeyService', function ($cookies) {
		
		var validationKey = 'en_US';
		function initializeKey() {
			if ($cookies.get('formValidationKey')) {
				validationKey = $cookies.get('formValidationKey');
				require(['form-validator-' + validationKey]);
			} else {
				$cookies.put('formValidationKey', validationKey);
				require(['form-validator-' + validationKey]);
			}
		}

		return {
			initializeKey: function(){
				initializeKey()
			},
			getValidationKey: function(){
				return validationKey;
			}
		};
	})
});
