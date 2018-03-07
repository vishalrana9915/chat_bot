/**
 * Created by Shawn Miller on 5/12/2015.
 * Path: public/app/layout/directives/formActions.js
 */
define(['layout/module',
    'lodash'
], function (module, _) {

    'use strict';

    module.registerDirective('jobFormActions', function ($rootScope, $compile) {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'app/layout/partials/job-form-actions.tpl.html',
            link: function (scope, elements, attributes) {


                var htmlButtonTemplate = '';

                /*********************************************************
                 * Added text attribute for create button from directive *
                 *********************************************************/
                var form = $("form").attr('id');

                scope.$watch('formButtons', function () {
                    htmlButtonTemplate = "";
                    _.forEach(scope.formButtons, function (button) {
                        htmlButtonTemplate += '<button id="' + button.buttonId + '" ';

                        if (button.buttonAttributes)
                            for (var i = 0; i < button.buttonAttributes.length; i++)
                                htmlButtonTemplate += button.buttonAttributes[i].attributeName + '=' + button.buttonAttributes[i].attributeValue

                        htmlButtonTemplate += ' ng-bind="getWord(\'' + button.buttonLabel + '\')"></button>&nbsp;';
                    });

                    scope.buttonTemplate = $compile(htmlButtonTemplate)(scope);
                    elements.parent().find('#hostButtons').html($compile(htmlButtonTemplate)(scope));
                });

                scope.actionText = 'Save';
                if (attributes.actiontext) {
                    scope.actionText = attributes.actiontext;
                }
                if (attributes.otheraction) {
                    scope.otherAction = attributes.otheraction;
                }

                var myButton = {
                    buttonName: 'PassCheck',
                    buttonActions: [{'qcFailed': true}, {'qcFailed': false}]
                };

                scope.showSkipJob = attributes.showskipjob === 'true' ? true : false;

                scope.showPrevNextJob = attributes.showprevnext === 'true' ? true : false;
                
                
                scope.displayPaginationInfo = function(number, Total){
                    if(Total > 0)
                        return $rootScope.getWord('FormActionPaginationLabel').replace('{1}', number).replace('{2}', Total)
                };
                

                /***********************************************************
                 * Disable submit buttons after form is submitted -Dante G.*
                 ***********************************************************/
                scope.submitForm = function(form){
                    $('#' + form).submit();
                };
            }
        }
    });
});


