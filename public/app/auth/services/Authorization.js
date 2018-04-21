/**
 * @Created by vishal rana.
 * Path: app\auth\services\Authorize.js
 */
define(['auth/module'], function (module) {
	
	'use strict';
	return module.registerService('Authorization', function ($rootScope, $http, $cookies,User,notificationService,$state) {
			var authToken;
			function authorizationException(message) {
				this.message = message;
				this.name = "AuthorizationException";
			}
			

			this.console = function(msg){
				var flag = true;
				if(flag){
					connsole.log(msg);
				}
			}

			var self = this;

			this.login = function (username, password) {
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
					url    : appConfig.apiURL + 'user/login',
					method : "POST",
					headers: { 'Content-Type': 'application/json' },
					data   : params
				}
				return $http(requestObj)
					.success(function (data, status, headers, config) {
						if(data.error){
							notificationService.error("Please enter valid credentials.")
							 throw new authorizationException("Please enter valid credentials.") ;
						}
						else if(data.response.responseCode == 400){
							notificationService.error("Please enter valid credentials.")

							throw new authorizationException("Check your email and password.")}
						else{
						$http.defaults.headers.common.Authorization = data.response.accessToken;
						$http.defaults.headers.common['Accept-Language'] = $cookies.get('_locale');
						$cookies.put("_Token", data.response.accessToken);
						$cookies.put("expDate", data[".expires"]);
						// console.log(data.response.userProfile._id)
						window.localStorage.setItem('_identity',data.response.userProfile._id)
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

						console.log(data);

					});
			};

			this.sendRequest = function (headers, method, url, data) {
				if (headers == null) {
					throw new authorizationException("Not logged in");
				}

				$http.defaults.headers.common.Authorization =  headers;
				// $cookies.put("_RequestVerificationToken", authToken);
				var obj = {
						url    : url,
						method : method,
						headers: headers,
						data   : data
				}

				return obj;
				
			};

			this.register = function(userData){
				userData.dob = userData.day + '-'+userData.month+ '-'+userData.year
				delete userData.day;
				delete userData.month;
				delete userData.year;
				userData.privileged =0
				userData.country = "INDIA"
				if(userData.password != userData.confirm){
					notificationService.error("password / confirm password disn't match.")
							 throw new authorizationException("password / confirm password disn't match.") ;
				}else{
					delete userData.confirm;
				var requestObj = {
					url    : appConfig.apiURL + 'user/register',
					method : "POST",
					headers: { 'Content-Type': 'application/json' },
					data   : JSON.stringify(userData)
				}

				return $http(requestObj)
					.success(function (data, status, headers, config) {
						if(data.error){
							notificationService.error("Please try after some time.")
							 throw new authorizationException("Please try after some time.") ;
						}
						else if(data.response.responseCode == 400)
							throw new authorizationException("Please try after some time.")
						else{
							
						return data
						}  
						
						// User.initUserInfo();

						//******************************************************************************************************
						// userIsAuthorized field is added to avoid throwing error messages if user is unauthorized.
						//******************************************************************************************************
						// $rootScope.userIsAuthorized = true;
					})
					.error(function (data, status, headers, config) {

						console.log(data);

					});

				}
			};


			this.checkAvailability = function(){

				if(window.localStorage.getItem('_identity') && $cookies.get("_Token")){
					return true;
				}else{
					return false;
				}
			};

			this.logoutClear = function(){
				$state.transitionTo('logout')
			};

			this.dailyUpdate = function(){
				var content = this.sendRequest($cookies.get('_Token'),"GET",appConfig.apiURL+'user/dailyActivity');
				return $http(content)
				.success(function (data) {
						if(data.error){
							notificationService.error("Please try after some time.")
							 throw new authorizationException("Please try after some time.") ;
						}
						else if(data.response.responseCode == 400)
							throw new authorizationException("Please try after some time.")
						else{
							// console.log(data)
						return data;
						}  
						
						// User.initUserInfo();

						//******************************************************************************************************
						// userIsAuthorized field is added to avoid throwing error messages if user is unauthorized.
						//******************************************************************************************************
						// $rootScope.userIsAuthorized = true;
					})
					.error(function (data, status, headers, config) {

						console.log(data);

					});
;
			};

			this.getFeeds = function(){
				var content = this.sendRequest($cookies.get('_Token'),"GET",appConfig.apiURL+'connect/feeds');
				return $http(content)
				.success(function (data) {
						if(!data.status){
							notificationService.error("Please try after some time.")
							 throw new authorizationException("Please try after some time.") ;
						}
						else if(data.response.responseCode == 400)
							throw new authorizationException("Please try after some time.")
						else{
							// console.log(data)
						return data.response;
						}  
						
						// User.initUserInfo();

						//******************************************************************************************************
						// userIsAuthorized field is added to avoid throwing error messages if user is unauthorized.
						//******************************************************************************************************
						// $rootScope.userIsAuthorized = true;
					})
					.error(function (data, status, headers, config) {

						console.log(data);

					});
			};


				this.checkDiff = function(){
					var content = this.sendRequest($cookies.get('_Token'),"GET",appConfig.apiURL+'connect/checkDiff');
				return $http(content)
				.success(function (data) {
						if(!data.status){
							notificationService.error("Please try after some time.")
							 throw new authorizationException("Please try after some time.") ;
						}
						// else if(data.response.responseCode == 400)
						// 	throw new authorizationException("Please try after some time.")
						else{
							// console.log(data)
						return data;
						}  
						
						// User.initUserInfo();

						//******************************************************************************************************
						// userIsAuthorized field is added to avoid throwing error messages if user is unauthorized.
						//******************************************************************************************************
						// $rootScope.userIsAuthorized = true;
					})
					.error(function (data, status, headers, config) {

						console.log(data);

					});
				}


			this.createFeeds = function(content){
				var content = this.sendRequest($cookies.get('_Token'),"POST",appConfig.apiURL+'connect/createFeed',content);
					return $http(content)
				.success(function (data) {
						if(!data.status){
							notificationService.error("Please try after some time.")
							 throw new authorizationException("Please try after some time.") ;
						}
						else if(data.response.responseCode == 400)
							throw new authorizationException("Please try after some time.")
						else{
							// console.log(data)
						return data;
						}  
						
						// User.initUserInfo();

						//******************************************************************************************************
						// userIsAuthorized field is added to avoid throwing error messages if user is unauthorized.
						//******************************************************************************************************
						// $rootScope.userIsAuthorized = true;
					})
					.error(function (data, status, headers, config) {

						console.log(data);

					});
			};

			this.uploadFile = function(myFile){
					console.log(myFile)
			        var uploadUrl = appConfig.apiURL+'connect/uploadFile';
			        var fd = new FormData();
			        fd.append('file', myFile);

			      return  $http.post(uploadUrl,fd, {
			            transformRequest: angular.identity,
			            headers: {'Content-Type': undefined,authorization:$cookies.get('_Token')}
			        })
			        .success(function(data){
			          console.log("success!!");
			          console.log(data)
			          return data.response
			        })
			        .error(function(){
			          console.log("error!!");
			        });
			};

			this.likeFeed = function(feedId){
					// var uploadUrl = appConfig.apiURL+'connect/likeFeed?postId='+feedId;
					var content = this.sendRequest($cookies.get('_Token'),"GET",appConfig.apiURL+'connect/likeFeed?postId='+feedId);
				 return $http(content)
				.success(function (data) {
						if(!data.status){
							notificationService.error("Please try after some time.")
							 throw new authorizationException("Please try after some time.") ;
						}
						// else if(data.response.responseCode == 400)
						// 	throw new authorizationException("Please try after some time.")
						else{
							// console.log(data)
						return data;
						}  
						
						// User.initUserInfo();

						//******************************************************************************************************
						// userIsAuthorized field is added to avoid throwing error messages if user is unauthorized.
						//******************************************************************************************************
						// $rootScope.userIsAuthorized = true;
					})
					.error(function (data, status, headers, config) {

						console.log(data);

					});
			};


			this.commentFeed = function(id,text){
					// var uploadUrl = appConfig.apiURL+'connect/likeFeed?postId='+feedId;
					var content = this.sendRequest($cookies.get('_Token'),"POSt",appConfig.apiURL+'connect/commentFeed?postId='+id,text);
				 return $http(content)
				.success(function (data) {
						if(!data.status){
							notificationService.error("Please try after some time.")
							 throw new authorizationException("Please try after some time.") ;
						}
						// else if(data.response.responseCode == 400)
						// 	throw new authorizationException("Please try after some time.")
						else{
							// console.log(data)
						return data;
						}  
						
						// User.initUserInfo();

						//******************************************************************************************************
						// userIsAuthorized field is added to avoid throwing error messages if user is unauthorized.
						//******************************************************************************************************
						// $rootScope.userIsAuthorized = true;
					})
					.error(function (data, status, headers, config) {

						console.log(data);

					});
			};


			this.getRooms =  function(){
					// var uploadUrl = appConfig.apiURL+'connect/likeFeed?postId='+feedId;
					var content = this.sendRequest($cookies.get('_Token'),"GET",appConfig.apiURL+'user/viewRooms');
				 return $http(content)
				.success(function (data) {
						if(!data.status){
							notificationService.error("Please try after some time.")
							 throw new authorizationException("Please try after some time.") ;
						}
						// else if(data.response.responseCode == 400)
						// 	throw new authorizationException("Please try after some time.")
						else{
							// console.log(data)
						return data;
						}  
						
						// User.initUserInfo();

						//******************************************************************************************************
						// userIsAuthorized field is added to avoid throwing error messages if user is unauthorized.
						//******************************************************************************************************
						// $rootScope.userIsAuthorized = true;
					})
					.error(function (data, status, headers, config) {

						console.log(data);

					});
			};

				this.viewAll =  function(){
					// var uploadUrl = appConfig.apiURL+'connect/likeFeed?postId='+feedId;
					var content = this.sendRequest($cookies.get('_Token'),"GET",appConfig.apiURL+'user/viewAll');
				 return $http(content)
				.success(function (data) {
						if(!data.status){
							notificationService.error("Please try after some time.")
							 throw new authorizationException("Please try after some time.") ;
						}
						// else if(data.response.responseCode == 400)
						// 	throw new authorizationException("Please try after some time.")
						else{
							// console.log(data)
						return data;
						}  
						
						// User.initUserInfo();

						//******************************************************************************************************
						// userIsAuthorized field is added to avoid throwing error messages if user is unauthorized.
						//******************************************************************************************************
						// $rootScope.userIsAuthorized = true;
					})
					.error(function (data, status, headers, config) {

						console.log(data);

					});
			};

				this.createRoom =  function(value){
					// var uploadUrl = appConfig.apiURL+'connect/likeFeed?postId='+feedId;
					var content = this.sendRequest($cookies.get('_Token'),"POST",appConfig.apiURL+'user/createRoom',value);
				 return $http(content)
				.success(function (data) {
						if(!data.status){
							notificationService.error("Please try after some time.")
							 throw new authorizationException("Please try after some time.") ;
						}
						// else if(data.response.responseCode == 400)
						// 	throw new authorizationException("Please try after some time.")
						else{
							// console.log(data)
						return data;
						}  
						
						// User.initUserInfo();

						//******************************************************************************************************
						// userIsAuthorized field is added to avoid throwing error messages if user is unauthorized.
						//******************************************************************************************************
						// $rootScope.userIsAuthorized = true;
					})
					.error(function (data, status, headers, config) {

						console.log(data);

					});
			};
		}
	);

});