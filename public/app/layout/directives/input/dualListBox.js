/**
 * Created by Shawn Miller on 6/19/2015.
 * Path: public/app/layout/directives/input/dualListBox.js
 * Notes:   See :   http://www.virtuosoft.eu/code/bootstrap-duallistbox/
 *                  https://lodash.com/docs
 */
define(['layout/module', 'lodash', 'bootstrap-duallistbox'], function (module, _) {

    'use strict';

    return module.registerDirective('dualListBox', function ($rootScope) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
	            //  element.removeAttr('dual-list-box data-dual-list-box');

                //Creates an object composed of the picked object properties


                var aOptions = _.pick(attrs, ['nonSelectedFilter']);

                scope.nonSelectedListLabel = $rootScope.getWord('Nonselected');
                scope.selectedListLabel = $rootScope.getWord('Selected');
                if (attrs.nonSelectedListLabel) {
                    attrs.nonSelectedListLabel = attrs.nonSelectedListLabel;
                    scope.nonSelectedListLabel = attrs.nonSelectedListLabel;
                }
                if (attrs.selectedListLabel) {
                    attrs.nonSelectedListLabel = attrs.selectedListLabel;
                    scope.selectedListLabel = attrs.selectedListLabel;
                }



                //Assigns own enumerable properties of source object(s) to the destination object
                var options = _.extend(aOptions, {
                    bootstrap2Compatible: false,
                    nonSelectedListLabel: scope.nonSelectedListLabel ,   //false: can be a string specifying the name of the non selected list.
                    selectedListLabel: scope.selectedListLabel,          //false: can be a string specifying the name of the selected list.
                    preserveSelectionOnMove: 'all',         //false: can be 'all' (for selecting both moved elements and
                                                            //the already selected ones in the target list) or 'moved' (for selecting moved elements only)
                    moveOnSelect: false ,                   //determines whether to move options upon selection. This option is forced to true on the Android browser.
                    selectorMinimalHeight: 400,
                    showFilterInputs: true                  //whether to show filter inputs.
                });

                scope.listenToModel = function () {
                    // When ngModel changes, refresh the list
                    // controller.$formatters.push(refresh);
                    scope.$watch(attrs.ngModel, function () {
                        init();
                        refresh();
                    });
                };

                var refresh = function() {
                    element.bootstrapDualListbox('refresh');
                };

                var init = function() {
                    // Init the plugin
                    element.bootstrapDualListbox(options);
                };
                scope.listenToModel();

            }
        }
    });
});