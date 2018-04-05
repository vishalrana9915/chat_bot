define(['auth/module', 'auth/services/Authorization'], function (module) {

	'use strict';

	return module.registerFactory('User', function ($http, $q,$cookies) {
		var dfd = $q.defer();
		
		var UserModel = {	
			initialized: dfd.promise,
			userId				: undefined,
			name				: undefined,
			email				: undefined,
			isDisabled			: undefined,
			isDeleted			: undefined,
			picture    			: undefined,
			defaultCurrencyCode : undefined,
			brokerApiHost		: undefined
		};
		return {

			initUserInfo:function(){

					return $http({
						method: 'GET',
						url: appConfig.apiURL + 'user/currentUser',
						headers: {
							'Content-Type': 'application/json'
						}
					})
						.success(function (response) {
							UserModel.userId				= 	response.response.userDetails.userId || UserModel.userId;
							UserModel.name					= 	response.response.userDetails.name || UserModel.name;
							UserModel.email 				= 	response.response.userDetails.email || UserModel.email;
							UserModel.picture 				=   "styles/img/avatars/male.png";

							$cookies.put('userObj',JSON.stringify(UserModel));
							
							dfd.resolve(UserModel)
						})
						.error(function (response) {
							dfd.reject(response);
						});

						dfd.promise;
				},
					getUserInfo:function(){
						let resultUser = (UserModel.name) ? UserModel :  $cookies.get('userObj');
					return resultUser;
				}

		};

	});

});
