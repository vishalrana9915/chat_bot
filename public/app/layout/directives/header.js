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
				console.log("in html directive")

				var socket = io.connect(appConfig.socketURL)
		        let userInitial = window.localStorage.getItem('_identity')
		        socket.emit('initChat',userInitial);
		        socket.on('initComplete',function(msg){
		        notificationService.confirmation(msg);
            })

			}
}

		});

	});