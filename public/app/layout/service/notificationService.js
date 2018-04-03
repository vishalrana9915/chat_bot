/**
 * Created by vishal.
 * Path: public/app/layout/service/notificationService.js
 */

define(['auth/module'], function (module) {
    'use strict';

    return  module.registerFactory('notificationService', function (notificationMessages, $rootScope,toastr) {
        var confirmInProgress = false;
        var notificationService =  {
               loginSuccess : function(){
                toastr.success(notificationMessages.successLoginMessage(),notificationMessages.successCreateTitle())
            },
            
           
        };
        return notificationService;
    });
});



