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
			},
			error:function(msg){
				return $rootScope.getWord(msg);
			},
			errorTitle:function(){
				return '<h2>'+$rootScope.getWord('error')+'</h2>'
			},
			successMessage : function(){
				return $rootScope.getWord('Successregister');
			},
			successRegisterTitle: function(){
				return '<h2>'+$rootScope.getWord('registerMsg')+'</h2>'
			},
			socketMessage: function(msg){
				return $rootScope.getWord(msg);
			},
			socketTitle:function(){
				return '<h2>'+$rootScope.getWord('realtime')+'</h2>'
			}
		};
		return notificationMessages;
	});
});



