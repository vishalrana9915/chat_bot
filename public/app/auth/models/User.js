define(['auth/module', 'auth/services/Authorization'], function (module) {

	'use strict';

	return module.registerFactory('User', function ($http, $q) {
		var dfd = $q.defer();

		var UserModel = {
			initialized: dfd.promise,
			userId				: undefined,
			firstName			: undefined,
			lastName			: undefined,
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

							UserModel.userId				= response._id;
							UserModel.firstName				= response.firstName;
							UserModel.lastName				= response.lastName;
							UserModel.email 				= response.email;
							UserModel.isDeleted 			= response.isDeleted;

							UserModel.picture = "styles/img/avatars/male.png";

							userSessionService.setUserSessionInfo(response);

							dfd.resolve(UserModel)
						})
						.error(function (response) {
							console.log(response);
						});
				},
					getUserInfo:function(){
					return UserModel;
				}

		};

	});

});
