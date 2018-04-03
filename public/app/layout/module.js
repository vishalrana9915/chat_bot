/**
 * Filename: public/app/layout/module.js
 */
define(['angular',
	'angular-couch-potato',
	'angular-ui-router'], function (ng, couchPotato) {
	"use strict";

	var module = ng.module('app.layout', ['ui.router']);

	couchPotato.configureApp(module);

	module.config(function ($stateProvider, $couchPotatoProvider, $urlRouterProvider) {

		$stateProvider
			.state('layout', {
				url:'/layout',
				// abstract: true,
				data:{
					requiresLogin:true
				},
				views   : {
					root: {
						templateUrl: 'app/modules/dashboard/views/baseFile.html',
						controller:'headerCtrl',
						resolve    : {
							deps: $couchPotatoProvider.resolveDependencies([
								'modules/dashboard/controllers/baseFile'
							]),
							stat:function(){
								alert("hello")
							}
						}
					}
				}
			});
		$urlRouterProvider.otherwise('/layout');
	});

	module.run(function ($couchPotato) {
		module.lazy = $couchPotato;
	});

	return module;
});
