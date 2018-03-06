/**
 * Created by Dante Garcia on 5/7/2015.
 * Path: app\auth\services\Authorize.js
 */
define(['auth/module'], function (module) {

	'use strict';
	return module.registerService('Authorization', function ($rootScope, $http, $cookies) {
			var authToken;

			function authorizationException(message) {
				this.message = message;
				this.name = "AuthorizationException";
			}

			this.login = function (username, password) {

				//******************************************************************************************************
				// Resetting the Authorization in the header if it exists and you are trying to login
				//******************************************************************************************************
				$http.defaults.headers.common.Authorization = undefined;

				var params = "grant_type=password&username=" + username + "&password=" + password;
				return $http({
					url    : appConfig.apiURL + '/user/GetAuthorizeToken',
					method : "POST",
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					data   : params
				})
					.success(function (data, status, headers, config) {
						$http.defaults.headers.common.Authorization = "Bearer " + data.access_token;
						$http.defaults.headers.common['Accept-Language'] = $cookies.get('_locale');
						$cookies.put("_Token", data.access_token);
						$cookies.put("expDate", data[".expires"]);
						authToken = data.access_token;
						User.initUserInfo();

						//******************************************************************************************************
						// userIsAuthorized field is added to avoid throwing error messages if user is unauthorized.
						//******************************************************************************************************
						$rootScope.userIsAuthorized = true;
					})
					.error(function (data, status, headers, config) {

						console.log(data.error_description);

					});
			};

			this.sendRequest = function (headers, method, url, data) {
				if (authToken == null) {
					throw new authorizationException("not logged in");
				}

				$http.defaults.headers.common.Authorization = "Bearer " + authToken;
				$cookies.put("_RequestVerificationToken", authToken);



				$http({
					url    : url,
					method : method,
					headers: headers,
					data   : data
				});
			}
		}
	);

});