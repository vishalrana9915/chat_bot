/**
 * @Created by vishal rana.
 * Path: app\auth\services\Authorize.js
 */
define(['auth/module'], function (module) {
	
	'use strict';
	return module.registerService('Authorization', function ($rootScope, $http, $cookies,User) {
			var authToken;
			function authorizationException(message) {
				this.message = message;
				this.name = "AuthorizationException";
			}

			this.login = function (username, password) {
					console.log("checking base url==>"+appConfig.apiURL)
				//******************************************************************************************************
				// Resetting the Authorization in the header if it exists and you are trying to login
				//******************************************************************************************************
				$http.defaults.headers.common.Authorization = undefined;

				var params = {
					email:username,
					password:password
				}
				// "grant_type=password&username=" + username + "&password=" + password;
				var requestObj = {
					url    : appConfig.apiURL + 'user/logins',
					method : "POST",
					headers: { 'Content-Type': 'application/json' },
					data   : params
				}
				return $http(requestObj)
					.success(function (data, status, headers, config) {
						console.log("reqobj-=>"+JSON.stringify(data))
						if(data.error){
							 console.log(error);
						}
						else if(data.response.responseCode == 400)
							 console.log("Check your password and email.")
						else{
								$http.defaults.headers.common.Authorization = "Bearer " + data.response.accessToken;
						$http.defaults.headers.common['Accept-Language'] = $cookies.get('_locale');
						$cookies.put("_Token", data.response.accessToken);
						$cookies.put("expDate", data[".expires"]);
						authToken = data.response.accessToken;
						return data
						}  
						
						// User.initUserInfo();

						//******************************************************************************************************
						// userIsAuthorized field is added to avoid throwing error messages if user is unauthorized.
						//******************************************************************************************************
						// $rootScope.userIsAuthorized = true;
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