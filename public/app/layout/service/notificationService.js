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
            error:function(msg){
                 toastr.error(notificationMessages.error(msg),notificationMessages.errorTitle())
            },
            registerSuccess:function(){
                 toastr.success(notificationMessages.successMessage(),notificationMessages.successRegisterTitle())
            },
            confirmation : function(msg){
                 toastr.success(notificationMessages.socketMessage(msg),notificationMessages.socketTitle())
            }
           
        };
        return notificationService;
    });
});



