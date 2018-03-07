/**
 * Created by pbhagwat on 6/28/2015.
 * Path: public/app/layout/service/notificationMessages.js
 */

define(['layout/module'], function (module) {

	'use strict';

	module.registerFactory('notificationMessages', function ($rootScope) {

		var notificationMessages = {
			confirmTitle : function () {
				return $rootScope.getWord('MsgPleaseConfirm');
			},
			confirmDeleteMessage : function () {
				return $rootScope.getWord('MsgDeleteMessage');
			},
			confirmPrintRemoveMessage : function () {
				return $rootScope.getWord('MsgRemoveMessage');
			},
			confirmPrintCancelMessage : function () {
				return $rootScope.getWord('MsgCancelMessage');
			},
			confirmJobPickedUpMessage : function () {
				return $rootScope.getWord('MsgMarkJobPickUp');
			},
			successDeleteTitle : function () {
				return $rootScope.getWord('MsgSuccessfullyDeleted');
			},
			successPrintDeleteTitle : function () {
				return $rootScope.getWord('MsgSuccessfullyAborted');
			},
			successDeleteMessage : function () {
				return $rootScope.getWord('MsgDeleteConfirmation');
			},
			successPrintRemoveMessage : function () {
				return $rootScope.getWord('MsgRemoveConfirmation');
			},
			successPrintCancelMessage : function () {
				return $rootScope.getWord('MsgCancelConfirmation');
			},
			successCreateTitle : function () {
				return $rootScope.getWord('MsgSuccessCreateTitle');
			},
			successCreateMessage : function () {
				return $rootScope.getWord('MsgCreateConfirmation');
			},
			successEditTitle : function () {
				return $rootScope.getWord('MsgSuccessEditTitle');
			},
			successEditMessage : function () {
				return $rootScope.getWord('MsgEditConfirmation');
			},
			successAssignTitle : function () {
				return $rootScope.getWord('MsgAssignSuccessTitle');
			},
			successAssignMessage : function () {
				return $rootScope.getWord('MsgAssignSuccessConfirmation');
			},
			successRemoveTitle : function () {
				return $rootScope.getWord('MsgRemoveSuccessTitle');
			},
			successRemoveMessage : function () {
				return $rootScope.getWord('MsgRemoveSuccessConfirmation');
			},
			successAcceptanceMessage:function(){
				return $rootScope.getWord('MsgAcceptSuccessConfirmation');
			},
			successCreateAssignMessage : function () {
				return $rootScope.getWord('MsgCreateAssignConfirmation');
			},
			successEditAssignMessage : function () {
				return $rootScope.getWord('MsgEditAssignConfirmation');
			},
			confirmRemoveUnAssignMessage : function () {
				return $rootScope.getWord('MsgRemUnAssignConfirmation');
			},
			notifyDeleteUnAssignMessage : function () {
				return $rootScope.getWord('MsgRemUnAssign');
			},
			successRouteTitle : function () {
				return $rootScope.getWord('JobRouteTitle');
			},
			successRouteAcceptedMessage : function () {
				return $rootScope.getWord('MessageRouteAccepted');
			},
			successRouteDeclinedMessage : function () {
				return $rootScope.getWord('MessageRouteDeclined');
			},
			successRouteInitiatedMessage : function () {
				return $rootScope.getWord('MessageRouteInitiated');
			},
			successEnableTitle : function () {
				return $rootScope.getWord('MsgEnableTitle');
			},
			successEnableMessage : function () {
				return $rootScope.getWord('MsgEnableConfirmation');
			},
			successActivationMessage : function () {
				return $rootScope.getWord('MsgActivationConfirmation');
			},
			successDisableTitle : function () {
				return $rootScope.getWord('MsgDisableTitle');
			},
			successDisableMessage : function () {
				return $rootScope.getWord('MsgDisableConfirmation');
			},
			successDeactivationMessage : function () {
				return $rootScope.getWord('MsgDeactivationConfirmation');
			},
			successClosedTitle : function(){
				return $rootScope.getWord('MsgClosedTitle');
			},
			successClosedMessage : function(){
				return $rootScope.getWord('MsgClosedConfirmation');
			},
			successOpenedTitle : function(){
				return $rootScope.getWord('MsgOpenedTitle');
			},
			successOpenedMessage : function(){
				return $rootScope.getWord('MsgOpenedConfirmation');
			},
			successAssignTestTitle : function(){
				return $rootScope.getWord('MsgAssignTestTitle');
			},
			successUnAssignTestTitle : function(){
				return $rootScope.getWord('MsgUnAssignTestTitle');
			},
			successAssignTestMessage : function(){
				return $rootScope.getWord('MsgAssignTestConfirmation');
			},
			successUnAssignTestMessage : function(){
				return $rootScope.getWord('MsgUnAssignConfirmation');
			},
			successSystemAdminTitle : function () {
				return $rootScope.getWord('MsgSuccessSystemAdminTitle');
			},
			successInvokeSystemAdminMessage : function () {
				return $rootScope.getWord('MsgInvokeSystemAdminConfirmation');
			},
			successRevokeSystemAdminMessage : function () {
				return $rootScope.getWord('MsgRevokeSystemAdminConfirmation');
			},
			successStatusUpdateTitle : function () {
				return $rootScope.getWord('TitleJobStatus');
			},
			successStatusUpdateMessage : function () {
				return $rootScope.getWord('StatusUpdateMessage');
			},
			skipJobTitle: function () {
				return $rootScope.getWord('SkipJobTitle');
			},
			successSkipJobMessage : function () {
				return $rootScope.getWord('SkippedJobNoMessage');
			},
			successClickTitle : function () {
				return $rootScope.getWord('Success');
			},
			successClickMessage : function () {
				return $rootScope.getWord('MsgClickConfirmation');
			},
            successHoldMessage : function () {
                return $rootScope.getWord('MsgHoldConfirmation');
            },
            successProofMessage : function () {
                return $rootScope.getWord('MsgProofConfirmation');
            }
		};
		return notificationMessages;
	});
});



