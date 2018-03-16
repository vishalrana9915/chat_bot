/**
 * Created by pbhagwat on 6/28/2015.
 * Path: public/app/layout/service/notificationMessages.js
 */

define(['app'], function (module) {

	'use strict';

	module.registerFactory('notificationMessages', function ($rootScope) {

		var notificationMessages = {
			successCreateTitle : function(){
				return $rootScope.getWord('Sucess ful')
			},
			successLoginMessage : function () {
				return $rootScope.getWord('Success');
			}
		};
		return notificationMessages;
	});
});



