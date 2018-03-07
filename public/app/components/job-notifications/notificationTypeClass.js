/**
 * Created by Pancham Bhagwat on 09/26/2015.
 * Path: public/app/components/notifications/notificationTypeClass.js
 */
define(['app'], function (module) {

    'use strict';

    module.registerFilter('notificationTypeClass', function () {
        return function (input) {
            input = input || '';
            switch (input) {
                case 'Declined':
                case 'Redo':
                case 'PastDue':
                    return 'label-danger';
                case 'Accepted':
                    return 'label-info';
                case 'Incoming':
                case 'New':
                    return 'label-success';
                case 'Pickup':
                case 'Rush':
                case 'Hold':
                    return 'label-warning';
            }
            return;
        };
    });

    module.registerFilter('bdp', function ($rootScope) {

        var staplesRewardsLabel = $rootScope.getWord('StaplesRewards');
        var businessDevelopmentPartnersLabel = $rootScope.getWord('BusinessDevelopmentPartners');
        var managedAccountLabel = $rootScope.getWord('ManagedAccount');

        return function (input) {

            var out = "";
            if (input.rewardsNumber) {
                out += '<i class="fa fa-certificate fa-lg" title="' + staplesRewardsLabel + '"></i>';
            }
            if (input.bizDevProgram) {
                out += '<i class="fa fa-university fa-lg" title="' + businessDevelopmentPartnersLabel + '"></i>';
            }
            if (input.managedAccountNumber) {
                out += '<i class="fa fa-briefcase fa-lg" title="' + managedAccountLabel + '"></i>';
            }
            return out;
        };
    });


});