define(['auth/module', 'form-validator-bootstrap', 'form-validator-mandatoryicon'], function (module) {
    
      "use strict";

    module.registerDirective('signupForm', function ($rootScope) {
// Sign up directive 
    	return {
    		restrict: 'EA',   //restricting to elements and attributes
            replace: true,
            templateUrl: 'app/auth/partials/registerForm.html', //template url 
             link: function (scope, form) {
                $(form).formValidation({
                   framework: 'bootstrap',
                    icon: {
                        valid: 'fa fa-ok',
                        invalid: 'fa fa-times',
                        validating: 'fa fa-sync-alt'
                    },
                    fields: {
                        firstName: {
                            validators: {
                                notEmpty: {
                                    message: 'First name is required'
                                },
                                stringLength: {
                                    min: 1,
                                    max: 30,
                                    message: 'First name must be more than 1 and less than 30 characters long'
                                },
                                       regexp: {
                                           regexp: /(([a-zA-Z]+))+$/,
                                           message: 'First name can only consist of alphabets.'
                                       }
                            }
                        },
                        lastName: {
                           validators: {
                                notEmpty: {
                                    message: 'Last name is required'
                                },
                                stringLength: {
                                    min: 1,
                                    max: 30,
                                    message: 'Last name must be more than 1 and less than 30 characters long'
                                },
                                       regexp: {
                                           regexp: /(([a-zA-Z]+))+$/,
                                           message: 'Last name can only consist of alphabets.'
                                       }
                            }
                        },
                        dateOfBirth: {
                           validators: {
                                notEmpty: {
                                    message: 'Birth date is required'
                                }
                            }
                        }

                      }
                    }).on('success.form.fv',function(e){
                     e.preventDefault();
                     // scope.loginUser(scope.userInfo)
                })
              }
        }
    	})

})

