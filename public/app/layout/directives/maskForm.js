/**
 * Created by Jaskaran Singh on 02/23/2016.
 * Path: public/app/layout/directives/maskForm.js
 */
define(['layout/module'], function (module) {

	'use strict';

	module.registerDirective('maskForm', function () {
		return {
			restrict: 'A',


			link: function (scope) {

				scope.triggerMask = function(divId){
					$('#'+divId).addClass("pgoverlay");

				};
				scope.disableMask = function(divId){
					$('#'+divId).removeClass("pgoverlay");
				};
			}
		}
	});
});
