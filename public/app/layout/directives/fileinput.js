/**
 * Created by Vishal rana .
 * Path: public/app/layout/directives/side.js
 */
define(['app', 'jquery'],
	function (module, $) {
		'use strict';

		module.registerDirective('fileModel', function ($rootScope,$parse) {
		 return {
		       restrict: 'A',
			    link: function(scope, element, attrs) {
			        var model = $parse(attrs.fileModel);
			        var modelSetter = model.assign;

			        element.bind('change', function(){
			            scope.$apply(function(){
			                modelSetter(scope, element[0].files[0]);
			            });
			        });
			    }
		    }

		});

	});