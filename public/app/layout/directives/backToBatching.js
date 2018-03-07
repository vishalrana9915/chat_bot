/**
 * Created by Srikanth on 9/28/2017.
 * Path: app\layout\directives\backToBatching.js
 */
define(['layout/module'
], function (module) {

    'use strict';

    module.registerDirective('backToBatching', function () {

        return {

            restrict: 'E',
            replace: true,
            templateUrl: 'app/layout/partials/back-to-batching.tpl.html',

            link:function(scope, elements, attributes){

                if(attributes.label) {
                    attributes.buttonLabel = attributes.label;
                }

                scope.buttonLabel = attributes.buttonLabel;

            }
        }
    });
});
