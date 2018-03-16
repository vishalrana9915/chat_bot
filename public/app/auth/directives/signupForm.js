define(['auth/module', 'form-validator-bootstrap', 'form-validator-mandatoryicon'], function (module) {
    
      "use strict";

    module.registerDirective('signupForm', function ($rootScope) {
// Sign up directive 

    	return {
    		    restrict: 'EA',   //restricting to elements and attributes
            replace: true,
            templateUrl: 'app/auth/partials/registerForm.tpl.html', //template url 
             link: function (scope, form) {
                // $(form).formValidation({
                //    framework: 'bootstrap',
                //     icon: {
                //         valid: 'fa fa-ok',
                //         invalid: 'fa fa-times',
                //         validating: 'fa fa-sync-alt'
                //     },
                //     fields: {
                //         firstName: {
                //             validators: {
                //                 notEmpty: {
                //                     message: 'First name is required'
                //                 },
                //                 stringLength: {
                //                     min: 1,
                //                     max: 30,
                //                     message: 'First name must be more than 1 and less than 30 characters long'
                //                 },
                //                        regexp: {
                //                            regexp: /(([a-zA-Z]+))+$/,
                //                            message: 'The username can only consist of alphabetical, number, dot and underscore'
                //                        }
                //             }
                //         }
                //       }
                //     })
              }
        }
    	})

})

