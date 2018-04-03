define(['auth/module', 'form-validator-bootstrap', 'form-validator-mandatoryicon'], function (module) {
    
      "use strict";

    module.registerDirective('signupForm', function ($rootScope,$state) {
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
                        username: {
                            validators: {
                                notEmpty: {
                                    message: 'Username is required'
                                },
                                stringLength: {
                                    min: 6,
                                    max: 18,
                                    message: 'Username must be more than 6 characters.'
                                },
                                       regexp: {
                                           regexp: /(([a-zA-Z]+))+$/,
                                           message: 'Username can only consist of alphabets.'
                                       }
                            }
                        },
                        email: {
                           validators: {
                                notEmpty: {
                                    message: 'Email is required'
                                },
                                stringLength: {
                                    min: 6,
                                    max: 36,
                                    message: 'Email must be more than 6 and less than 36 characters long'
                                },
                                       regexp: {
                                           regexp: /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/,
                                           message: 'Invalid Email.'
                                       }
                            }
                        },
                        password: {
                           validators: {
                                notEmpty: {
                                    message: 'Password is required'
                                },
                                stringLength: {
                                    min: 6,
                                    max: 36,
                                    message: 'password must be more than 6 characters.'
                                }
                            }
                        },
                        confirmPassword: {
                           validators: {
                                notEmpty: {
                                    message: 'Confirm Password is required'
                                },
                                stringLength: {
                                    min: 6,
                                    max: 36,
                                    message: 'Confirm Password must be more than 6 characters.'
                                }
                            }
                        }

                      }
                    }).on('success.form.fv',function(e){
                     e.preventDefault();
                     // scope.loginUser(scope.userInfo)
                })


                    scope.state = function (){
                      console.log("in function ");
                      $state.transitionTo('log.dashboard')
                    }

              }
        }
    	})

})

