/**
 * Created by vishal.
 * Path: public/app/components/notification-fly-outs/notificationFlyOut.js
 */

define(['app'], function (module) {

    'use strict';

    module.registerDirective('notificationFlyOut', function (buildInfo) {
        return {
            restrict: 'EA',
            replace: true,
            link: function (scope, elements, attributes) {
                scope.isActive = function (tab) {
                    return scope.activeTab === tab;
                };

                scope.setTab = function (activityType) {
                    scope.activeTab = activityType;
                };
            },
            templateUrl: function(elem, attributes) {
                return buildInfo.correctPath(attributes.templateUrl);
            }
        }
    });
});
