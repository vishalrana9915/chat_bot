/**
 * Created by Shawn Miller on 3/9/2015.
 * Project Name: Kodiak MIS
 * Filename: public/app/layout/directives/stateBreadcrumbs.js
 * Notes:
 *
 */
define(['layout/module'], function (module) {

    'use strict';

    module.registerDirective('stateBreadcrumbs', function ($rootScope, $state, $log) {

        return {

            restrict: 'E',
            replace: true,
            template: '<ol class="breadcrumb"><li>Home</li></ol>',

            link: function (scope, element) {

                function setBreadcrumbs(breadcrumbs) {

                    var html = '<li>' + $rootScope.getWord('Home') + '</li>';

                    angular.forEach(breadcrumbs, function (crumb) {
                        html += '<li>' + $rootScope.getWord(crumb) + '</li>'
                    });

                    element.html(html)
                }// eo fn setBreadcrumbs

                function fetchBreadcrumbs(stateName, breadcrunbs) {

                    var state = $state.get(stateName);

                    if (state && state.data && state.data.title && breadcrunbs.indexOf(state.data.title) == -1) {
                        breadcrunbs.unshift(state.data.title)
                    }

                    var parentName = stateName.replace(/.?\w+$/, '');
                    if (parentName) {
                        return fetchBreadcrumbs(parentName, breadcrunbs);
                    } else {
                        return breadcrunbs;
                    }
                }// eo fn fetchBreadcrumbs

                function processState(state) {
                    var breadcrumbs;
                    if (state.data && state.data.breadcrumbs) {
                        breadcrumbs = state.data.breadcrumbs;
                    } else {
                        breadcrumbs = fetchBreadcrumbs(state.name, []);
                    }
                    setBreadcrumbs(breadcrumbs);
                }// eo fn processState

                processState($state.current);

                $rootScope.$on('$stateChangeStart', function (event, state) {
                    processState(state);
                })

            }// eo link

        }// eo return

    });// eo module.registerDirective

});// eo define
