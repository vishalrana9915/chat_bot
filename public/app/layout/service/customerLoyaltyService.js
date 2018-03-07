/**
 * Created by Pancham Bhagwat on 07/13/2015.
 * Path: public/app/layout/service/customerLoyaltyService.js
 */
define(['layout/module'], function (module) {

	'use strict';

	return module.registerService('customerLoyaltyService', function ($rootScope) {

		var bdpIcon = '';
		var srIcon = '';
		var maIcon = '';

		return {

			getCustomerLoyaltyStatus : function (data) {
				var rewardsProgramHtml = "";

				if (data.bizDevProgram) {
					bdpIcon = '<i class="fa fa-university fa-fw loyalty-status" tooltip-placement="bottom" uib-tooltip="' +data.bizDevProgram+ '"></i>';
					rewardsProgramHtml += bdpIcon;
				}

				if (data.rewardsNumber) {
				srIcon = '<i class="fa fa-certificate fa-fw loyalty-status" tooltip-placement="bottom" uib-tooltip="' +data.rewardsNumber+ '"></i>';
					rewardsProgramHtml += srIcon;
				}

				if (data.managedAccountNumber) {
				maIcon = '<i class="fa fa-briefcase fa-fw loyalty-status" tooltip-placement="bottom"   uib-tooltip="' +data.managedAccountNumber+ '"></i>';
					rewardsProgramHtml += maIcon;
				}

				return rewardsProgramHtml
			},
			createRouteLink : function(id, number, hasNotes, changeFunction){
				
				var link = "<a href='javascript:void(0)' ng-click=\"viewItem(" + id + ")\">" + number + "</a>";

				//Orders List nested jobs list uses viewJobItem method.
				if(changeFunction == 'viewJobItem'){
					link = "<a href='javascript:void(0)' ng-click=\"viewJobItem(" + id + ")\">" + number + "</a>";
				}

				var toolTipMessage = $rootScope.getWord('UserNotes');
				var hasNotesIcon = '<span> </span><i class="fa fa-file-text" uib-tooltip="'+toolTipMessage+'"></i>';
						
				if(hasNotes){
					return link + hasNotesIcon;
				}
				return link;
			}
		};
	});
});
