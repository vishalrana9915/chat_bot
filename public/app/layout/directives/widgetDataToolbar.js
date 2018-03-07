/**
 * Created by Shawn Miller on 5/9/2015.
 * Project Name: Trunk
 * Filename: widgetDataToolbar Ver. 1.001
 * Path: public/app/layout/directives/widgetDataToolbar.js
 * Notes:
 *
 */
define(['layout/module'
], function (module) {

    'use strict';

	module.registerDirective('widgetDataToolbar', function ($rootScope) {

        return {

            restrict: 'E',
            replace: true,
            templateUrl: 'app/layout/partials/widget-data-toolbar.tpl.html',

	        link: function (scope, elements, attributes) {

                if (attributes.label)
                    attributes.buttonLabel = attributes.label;

		        scope.label = $rootScope.getWord(attributes.buttonLabel);

            }

        }

	});

});
