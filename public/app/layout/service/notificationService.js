/**
 * Created by vishal.
 * Path: public/app/layout/service/notificationService.js
 */

define(['auth/module'], function (module) {
    'use strict';

    return  module.registerFactory('notificationService', function (notificationMessages, $rootScope) {
        
        var confirmInProgress = false;
        var notificationService =  {

            // confirmDelete: function(id, itemName, scope){
            //     if(confirmInProgress)
            //         return;

            //     confirmInProgress = true;
            //     $.SmartMessageBox({
            //         title: notificationMessages.confirmTitle(),
            //         content: notificationMessages.confirmDeleteMessage() + " " + itemName,
            //         buttons: '[No][Yes]'
            //     }, function (ButtonPressed) {
            //         confirmInProgress = false;
            //         if (ButtonPressed === "Yes") {
            //             scope.deleteOnConfirm(id, itemName);
            //         }
            //     });
            // },
               loginSuccess : function(){
                 $.smallBox({
                    title: notificationMessages.successCreateTitle()  ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successLoginMessage().replace('{1}', 'vishal') + "</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            },
            
           
        };
        return notificationService;
    });
});



