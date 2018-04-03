/**
 * Created by pbhagwat on 6/28/2015.
 * Path: public/app/layout/service/notificationMessages.js
 */

define(['app'], function (module) {

	'use strict';

	module.registerFactory('notificationMessages', function ($rootScope) {

		var notificationMessages = {
			successCreateTitle : function(){
				return '<h2>'+$rootScope.getWord('loginMsg')+'</h2>'
			},
			successLoginMessage : function () {
				return $rootScope.getWord('SuccessLogin');
			}
		};
		return notificationMessages;
	});
});



