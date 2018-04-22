/**
 * Created by Vishal rana .
 * Path: public/app/layout/directives/customSpinner.js
 * Notes: Directive for using the spin.js plugin
 */
define(['app', 'jquery', 'spinner-js', 'lodash','io'],
	function (module, $, Spinner, _,io) {
		'use strict';

		module.registerDirective('headingInitial', function ($rootScope,notificationService) {
			return {
				restrict: 'EA',
				replace: true,
				templateUrl: 'app/modules/dashboard/partials/header.html',
				link: function (scope, element, attributes) {
				var socket = io.connect(appConfig.socketURL)
		        var userInitial = window.localStorage.getItem('_identity')
		        socket.emit('initChat',userInitial);
		        socket.on('initComplete',function(msg){
            })


		        $rootScope.$on('getChat',function(idx,roomId){

		        	socket.emit('getChatting',roomId)


		        })

		        socket.on('allChat',function(data){
		        	$rootScope.$broadcast('successChat',data)
		        })


		        $rootScope.$on('sendMessageTo',function(identity,data){
		        	socket.emit('sendMessage',data);
		        	socket.on('msgSentSuccess',function(dam){
		        	socket.emit('getChatting',data.details.roomId);
		        })
		        	
		        })

		        


			}
}

		});

	});