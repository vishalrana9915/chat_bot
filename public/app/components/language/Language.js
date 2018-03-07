define(['app'], function (app) {
	"use strict";

	return app.factory('Language', function ($http, $rootScope, $cookies) {

		function initializeLanguage() {
			/***********************************************************************************************/
			// Use cookie to get localization for set cookie using defaults if missing and get localizations
			/***********************************************************************************************/
			var loadLanguageKey = appConfig.default_language.key;

			if ($cookies.get('_locale'))
				loadLanguageKey = $cookies.get('_locale');
			else
				$cookies._locale = appConfig.default_language.key;

			/***********************************************************************************************/
			// Get localized list
			/***********************************************************************************************/
			getLanguage(loadLanguageKey, function (data) {
				$rootScope.lang = data;
			});

			/***********************************************************************************************/
			// Get localized word from the loc
			/***********************************************************************************************/
			$rootScope.getWord = function (key) {
				if($rootScope.lang === undefined) {
					return key;
				}

				if ($rootScope.lang[key]) {
					return $rootScope.lang[key];
				}

				return key;
			};
		}

		function getLanguage(key, callback) {
			$http.get('api/langs/' + key + '.json').success(function (data) {
				callback(data);
			}).error(function () {
				callback([]);
			});
		}

		function getLanguages(callback) {
			$http.get('api/languages.json').success(function (data) {
				callback(data);
			}).error(function () {
				callback([]);
			});
		}

		return {
			initializeLanguage : function () {
				initializeLanguage();
			},
			getLang : function (type, callback) {
				getLanguage(type, callback);
			},
			getLanguages : function (callback) {
				getLanguages(callback);
			}
		}
	})
});
