
define(['auth/module', 'form-validator-bootstrap', 'form-validator-mandatoryicon'], function (module) {
    
      "use strict";

    module.registerDirective('loginAuthForm', function ($rootScope) {
    
     return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'app/auth/partials/loginForm.html',
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
                                    message: 'The username is required'
                                },
                                stringLength: {
                                    min: 6,
                                    max: 36,
                                    message: 'The username must be more than 6 and less than 30 characters long'
                                },
                                       regexp: {
                                           regexp: /(([a-zA-Z0-9\-?\.?]+)@(([a-zA-Z0-9\-_]+\.)+)([a-z]{2,3}))+$/,
                                           message: 'The username can only consist of alphabetical, number, dot and underscore'
                                       }
                            }
                        },
                        password: {
                            validators: {
                                notEmpty: {
                                    message: 'The password is required'
                                },
                                stringLength: {
                                    min: 6,
                                    max: 40,
                                    message: 'Please select a strong password'
                                }
                            }
                        }
                    }
                    
                }).on('success.form.fv',function(e){
                     e.preventDefault();
                     scope.loginUser(scope.userInfo)
                })
            }
     }
    
    })
    
})