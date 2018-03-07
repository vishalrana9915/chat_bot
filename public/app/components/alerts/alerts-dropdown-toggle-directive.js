/**
 * Created by Shawn Miller on 7/28/2015.
 * Path: app/components/alerts/alerts-dropdown-toggle-directive.js
 */

define(['app'], function (app) {
    "use strict";

    return app.directive('alertsDropdownToggle', function ($log) {

        var link = function ($scope, $element, attrs) {
            var alerts_ajax_dropdown = null;

            $element.on('click', function () {
                var badge = $(this).find('.badge');

                if (badge.hasClass('bg-color-red')) {
                    //Remove class and set counter to zero
                    //badge.removeClass('bg-color-red').text(0);
                    badge.removeClass('bg-color-red');
                }

                alerts_ajax_dropdown = $(this).next('.alerts-ajax-dropdown');

                if (!alerts_ajax_dropdown.is(':visible')) {

                    alerts_ajax_dropdown.fadeIn(150);

                    $(this).addClass('active');
                }
                else {
                    alerts_ajax_dropdown.fadeOut(150);
                    $(this).removeClass('active');
                }
            });

            $(document).mouseup(function (e) {
                if (alerts_ajax_dropdown && !alerts_ajax_dropdown.is(e.target) && alerts_ajax_dropdown.has(e.target).length === 0) {
                    alerts_ajax_dropdown.fadeOut(150);
                    $element.removeClass('active');
                }
            });
        }

        return {
            restrict: 'EA',
            link: link
        }
    })
});