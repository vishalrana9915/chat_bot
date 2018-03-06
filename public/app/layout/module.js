/**
 * Created by vishal rana 
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
			.state('app', {
				abstract: true,
				data:{
					requiresLogin:true
				},
				views   : {
					root: {
						templateUrl: 'app/layout/layout.tpl.html',
						resolve    : {
							deps: $couchPotatoProvider.resolveDependencies([
								'auth/directives/loginInfo',
								'layout/directives/logout',
								'modules/graphs/directives/inline/sparklineContainer',
								'layout/directives/input/smartSelect2'
							])
						}
					}
				}
			});
		$urlRouterProvider.otherwise('/');
	});

	module.run(function ($couchPotato) {
		module.lazy = $couchPotato;
	});

	return module;
});
