define(['app'], function (app) {
	"use strict";

	return app.controller("LanguagesCtrl", LanguagesCtrl);

	function LanguagesCtrl($scope, $rootScope, Language, $cookies, $location) {

		Language.getLanguages(function (data) {

			$rootScope.languages = data;

			/********************************************************************************************/
			//If cookie exist use the cookie to default the current language
			/********************************************************************************************/
			if ($cookies.get('_locale')) {
				$rootScope.currentLanguage = _(data)
					.filter(function (data) {
						return data.key == $cookies.get('_locale');
					})
					.value()[0];
			}

			/********************************************************************************************/
			//If no cookie is set or the cookie is deleted. We set it back to defaults from the app.config
			/********************************************************************************************/
			if (!$cookies.get('_locale')) {
				 $cookies.put('_locale', appConfig.default_language.key) ;
				$rootScope.currentLanguage = appConfig.default_language;
				Language.getLang($cookies.get('_locale'), function (data) {
					$rootScope.lang = data;
				});
			}

			/********************************************************************************************/
			// If current language is not set we use the app.config defaults
			/********************************************************************************************/
			if (!$rootScope.currentLanguage) {
				$rootScope.currentLanguage = appConfig.default_language;
			}

		});

		/***********************************************************************************************/
		// On language change set the cookie as well as the current language and get the localized list.
		/***********************************************************************************************/
		$scope.selectLanguage = function (language) {

			$cookies.put('_locale', language.key);
			$cookies.put('formValidationKey',language.formValidationKey);

			$rootScope.currentLanguage = language;

			Language.getLang(language.key, function (data) {
				$rootScope.lang = data;
				appConfig.languages = data;
			});

			//TODO: This is not the final solution.
			//We must compile the Language directive to change the language on the fly
			//Refresh page with new language settings
			if ($location.path() == '/') {
				location.reload();
			} else {
				$location.path('/');
				location.reload();
			}
		};
	}

});