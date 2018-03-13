define(['auth/module', 'form-validator-bootstrap', 'form-validator-mandatoryicon'], function (module) {
    
      "use strict";

    module.registerDirective('signupForm', function ($rootScope) {

    	return {
    		restrict: 'EA',
            replace: true,
            templateUrl: 'app/auth/partials/signup.tpl.html',
            link: function (scope, form) {

          //   	function randomNumber(min, max) {
        		// 	return Math.floor(Math.random() * (max - min + 1) + min);
   						 // }

		    }
        }
    	})

})

