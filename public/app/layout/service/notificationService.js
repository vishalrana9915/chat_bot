/**
 * Created by vishal.
 * Path: public/app/layout/service/notificationService.js
 */

define(['layout/module'], function (module) {

    'use strict';

    module.registerFactory('notificationService', function (notificationMessages, dtEncoder, $rootScope) {
        var confirmInProgress = false;
        var notificationService = {
            confirmDelete: function(id, itemName, scope){
                if(confirmInProgress)
                    return;

                confirmInProgress = true;
                $.SmartMessageBox({
                    title: notificationMessages.confirmTitle(),
                    content: notificationMessages.confirmDeleteMessage() + " " + itemName,
                    buttons: '[No][Yes]'
                }, function (ButtonPressed) {
                    confirmInProgress = false;
                    if (ButtonPressed === "Yes") {
                        scope.deleteOnConfirm(id, itemName);
                    }
                });
            },

            loginSuccess : function(){

            },
            confirmPrintRemove: function(id, itemName, scope, itemStatus){
                if(confirmInProgress)
                    return;

                confirmInProgress = true;
                $.SmartMessageBox({
                    title: notificationMessages.confirmTitle(),
                    content: notificationMessages.confirmPrintRemoveMessage() + " " + itemName + " " + $rootScope.getWord('fromPrintJob'),
                    buttons: '[No][Yes]'
                }, function (ButtonPressed) {
                    confirmInProgress = false;
                    if (ButtonPressed === "Yes") {
                        scope.deleteOnPrintConfirm(id, itemName, itemStatus);
                    }
                });
            },
            confirmPrintCancel: function(id, itemName, scope, itemStatus){
                if(confirmInProgress)
                    return;

                confirmInProgress = true;
                $.SmartMessageBox({
                    title: notificationMessages.confirmTitle(),
                    content: notificationMessages.confirmPrintCancelMessage() + " " + itemName + " " + $rootScope.getWord('fromPrintJob'),
                    buttons: '[No][Yes]'
                }, function (ButtonPressed) {
                    confirmInProgress = false;
                    if (ButtonPressed === "Yes") {
                        scope.deleteOnPrintConfirm(id, itemName, itemStatus);
                    }
                });
            },
            confirmUpdate: function(id, itemName, scope, title, message){
                if(confirmInProgress)
                    return;

                confirmInProgress = true;
                $.SmartMessageBox({
                    title: title,
                    content: message,
                    buttons: '[No][Yes]'
                }, function (ButtonPressed) {
                    confirmInProgress = false;
                    if (ButtonPressed === "Yes") {
                        scope.updateJobStatus(id, itemName);
                    }
                });
            },
            notifyDeleteSuccess: function (itemName) {
                $.smallBox({
                    title: notificationMessages.successDeleteTitle() ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successDeleteMessage() + " " + itemName + "</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });

            },
            notifyPrintRemoveSuccess: function (itemName,jobNo) {
                $.smallBox({
                    title: notificationMessages.successPrintDeleteTitle() ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successPrintRemoveMessage().replace('{1}', he.encode(dtEncoder.escapeQuotes(jobNo))) + "</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });

            },
            notifyPrintCancelSuccess: function (itemName,jobNo) {
                $.smallBox({
                    title: notificationMessages.successPrintDeleteTitle() ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successPrintCancelMessage().replace('{1}', he.encode(dtEncoder.escapeQuotes(jobNo))) + "</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });

            },
            notifyCreateSuccess: function (itemName) {
                $.smallBox({
                    title: notificationMessages.successCreateTitle()  ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successCreateMessage().replace('{1}', he.encode(dtEncoder.escapeQuotes(itemName))) + "</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });

            },
            notifyEditSuccess: function (itemName) {
                $.smallBox({
                    title: notificationMessages.successEditTitle()  ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successEditMessage().replace('{1}', itemName) + "</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });

            },
            notifyAssignationSuccess:function(itemType, itemPlural){
                $.smallBox({
                    title: notificationMessages.successAssignTitle()  ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successAssignMessage().replace('{1}', itemType).replace('{2}', itemPlural)+"</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            },
            notifyAcceptSuccess:function(itemType, itemPlural){
                $.smallBox({
                    title: notificationMessages.successEditTitle()  ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successAcceptanceMessage().replace('{1}', itemType).replace('{2}', itemPlural)+"</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            },
            notifyRemoveSuccess:function(itemType, itemPlural){
                $.smallBox({
                    title: notificationMessages.successRemoveTitle()  ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successRemoveMessage().replace('{1}', itemType).replace('{2}', itemPlural)+"</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            },
            notifyCreateAssignSuccess:function(itemName){
                $.smallBox({
                    title: notificationMessages.successCreateTitle()  ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successCreateAssignMessage().replace('{1}', itemName)+"</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            },
            notifyEditAssignSuccess:function(itemName){
                $.smallBox({
                    title: notificationMessages.successEditTitle()  ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successEditAssignMessage().replace('{1}', itemName)+"</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            },
            confirmDeleteUnAssignSuccess:function(id, itemName, scope){
                $.SmartMessageBox({
                    title: notificationMessages.confirmTitle(),
                    content: notificationMessages.confirmRemoveUnAssignMessage().replace('{1}', itemName),
                    buttons: '[No][Yes]'
                }, function (ButtonPressed) {
                    if (ButtonPressed === "Yes") {
                        scope.deleteOnConfirm(id, itemName);
                    }
                });
            },
            notifyDeleteUnAssignSuccess:function(itemName){
                $.smallBox({
                    title: notificationMessages.successEditTitle()  ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.notifyDeleteUnAssignMessage().replace('{1}', itemName)+"</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            },
            notifyRerouteAcceptedSuccess: function (itemName) {
                $.smallBox({
                    title: notificationMessages.successRouteTitle()  ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successRouteAcceptedMessage() + "</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            },
            notifyRerouteDeclinedSuccess: function (itemName) {
                $.smallBox({
                    title: notificationMessages.successRouteTitle()  ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successRouteDeclinedMessage() + "</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            },
            notifyRerouteInitiatedSuccess: function (itemName) {
                $.smallBox({
                    title: notificationMessages.successRouteTitle()  ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successRouteInitiatedMessage() + "</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            },
            notifyEnableSuccess: function (itemName) {
                $.smallBox({
                    title: notificationMessages.successEnableTitle() ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successEnableMessage().replace('{1}', itemName) + "</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });

            },
            notifyActivationSuccess: function (itemName) {
                $.smallBox({
                    title: notificationMessages.successEnableTitle() ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successActivationMessage().replace('{1}', itemName) + "</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });

            },
            notifyDisableSuccess: function (itemName) {
                $.smallBox({
                    title: notificationMessages.successDisableTitle() ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successDisableMessage().replace('{1}', itemName) + "</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            },
            notifyDeactivationSuccess: function (itemName) {
                $.smallBox({
                    title: notificationMessages.successDisableTitle() ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successDeactivationMessage().replace('{1}', itemName) + "</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            },
            notifyClosedSuccess : function(itemName){
                $.smallBox({
                    title: notificationMessages.successClosedTitle() ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successClosedMessage().replace('{1}', itemName) + "</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            },
            notifyOpenedSuccess : function(itemName){
                $.smallBox({
                    title: notificationMessages.successOpenedTitle() ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successOpenedMessage().replace('{1}', itemName) + "</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            },
            notifyAssignTestSuccess : function(itemName){
                $.smallBox({
                    title: notificationMessages.successAssignTestTitle() ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successAssignTestMessage().replace('{1}', itemName) + "</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            },
            notifyUnAssignTestSuccess : function(itemName){
                $.smallBox({
                    title: notificationMessages.successUnAssignTestTitle() ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successUnAssignTestMessage().replace('{1}', itemName) + "</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            },
            notifyInvokeSystemAdminSuccess: function (itemName) {
                $.smallBox({
                    title: notificationMessages.successSystemAdminTitle() ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successInvokeSystemAdminMessage().replace('{1}', itemName) + "</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });

            },
            notifyRevokeSystemAdminSuccess: function (itemName) {
                $.smallBox({
                    title: notificationMessages.successSystemAdminTitle() ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successRevokeSystemAdminMessage().replace('{1}', itemName) + "</i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });
            },
            notifyStatusUpdateSuccess: function (itemName) {
                $.smallBox({
                    title: notificationMessages.successStatusUpdateTitle() ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successStatusUpdateMessage().replace('{1}', '<strong>' + itemName) + "</strong></i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });

            },
            notifySkipJobSuccess: function (itemName) {
                $.smallBox({
                    title: notificationMessages.skipJobTitle() ,
                    content: "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successSkipJobMessage().replace('{1}', '<strong>' + itemName) + "</strong></i>",
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });

            },
            notifyClickedSuccess: function (itemName,jobNo) {
                var notificationContent;
                switch(itemName) {
                    case 'PrintProof':
                        notificationContent =  "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successProofMessage().replace('{1}', he.encode(dtEncoder.escapeQuotes(jobNo))) + "</i>"
                        break;
                    case 'Send':
                        notificationContent =  "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successClickMessage().replace('{1}', he.encode(dtEncoder.escapeQuotes(jobNo))) + "</i>"
                        break;
                    case 'SendHold':
                        notificationContent =  "<i class='fa fa-clock-o'></i> <i>" + notificationMessages.successHoldMessage().replace('{1}', he.encode(dtEncoder.escapeQuotes(jobNo))) + "</i>"
                        break;
                }
                $.smallBox({
                    title: notificationMessages.successClickTitle()  ,
                    content: notificationContent,
                    color: appConfig.smallBoxSuccess,
                    iconSmall: "fa fa-check fa-2x fadeInRight animated",
                    timeout: 4000
                });

            }
        };
        return notificationService;
    });
});



