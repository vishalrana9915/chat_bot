/**
 * Created by Dante Garcia on 5/22/2015.
 * Path: app/layout/directives/tableActions.js
 */
define(['layout/module',
    'lodash', 'to-markdown'
], function (module) {

    'use strict';

    module.registerDirective('misRowActions', function (dtEncoder) {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope) {

                scope.tableActions = function (objectId, objectName, readOnly, commandTypes, objectType) {

                    var stringifyIdVar = "'" + objectId + "'";
                    var stringNameVar = "'" + he.encode(dtEncoder.escapeQuotes(objectName)) + "'";


                    scope.stringifyIdVar = stringifyIdVar;
                    scope.stringNameVar = stringNameVar;

                    var actionItems = '';
                    var buttonColor = "btn-primary";

                    var viewButton = '<a href-void tooltip-placement="bottom" data-tooltip-container="body" uib-tooltip="{{getWord(\'View\')}}"  class="btn ' + buttonColor + '" ng-click="viewItem(' + stringifyIdVar + ')" ><i class="fa fa-search fa-lg"></i></a>';
                    var editButton = '<a href-void tooltip-placement="bottom" data-tooltip-container="body" uib-tooltip="{{getWord(\'Edit\')}}" class="btn ' + buttonColor + '" ng-click="editItem(' + stringifyIdVar + ')" ><i class="fa fa-pencil-square-o fa-lg"></i></a>';
                    var deleteButton = '<a href-void tooltip-placement="bottom" data-tooltip-container="body" uib-tooltip="{{getWord(\'Delete\')}}" class="btn ' + buttonColor + '" ng-click="deleteItem(' + stringifyIdVar + ',' + stringNameVar + ')" ><i class="fa fa-trash-o fa-lg"></i></a>';
                    var duplicateButton = '<a href-void tooltip-placement="bottom" uib-tooltip="{{getWord(\'Duplicate\')}}" class="btn ' + buttonColor + '" ng-click="duplicateItem(' + stringifyIdVar + ')" ><i class="fa fa-clone fa-lg"></i></a>';
                    var passwordButton = '<a href-void tooltip-placement="bottom" data-tooltip-container="body" uib-tooltip="{{getWord(\'Password\')}}" class="btn ' + buttonColor + '" ng-click="updatePassword(' + stringifyIdVar + ')" ><i class="fa fa-key fa-lg"></i></a>';

                    if (commandTypes) {
                        _.forEach(commandTypes, function (item) {
                            switch (item) {
                                case 1:
                                    if (readOnly) {
                                        //actionItems += '<li><a href-void  ng-click="viewItem(' + stringifyIdVar + ')" ><i class="fa fa-search fa-fw fa-lg"></i> View </a></li>';
                                        actionItems += viewButton;

                                    }
                                    break;
                                case 2:
                                    if (!readOnly) {
                                        //actionItems += '<li><a href-void ng-click="editItem(' + stringifyIdVar + ')" ><i class="fa fa-pencil-square-o  fa-fw fa-lg"></i> Edit </a></li>';
                                        actionItems += editButton;

                                    }
                                    break;
                                case 3:
                                    if (!readOnly) {
                                        //actionItems += '<li><a href-void ng-click="deleteItem(' + stringifyIdVar + ',' + stringNameVar + ')" ><i class="fa fa-trash-o  fa-fw fa-lg"></i> Delete </a></li>';
                                        actionItems += deleteButton;

                                    }
                                    break;
                                case 4:
                                    if (!readOnly) {
                                        //actionItems += '<li><a href-void ng-click="updatePassword(' + stringifyIdVar + ')" ><i class="fa fa-key fa-fw  fa-lg"></i> Update Password </a></li>';
                                        actionItems += passwordButton;

                                    }
                                    break;
                            }
                        });
                    }
                    else if (objectType) {

                        switch (objectType.type) {
                            case 'Imposition':
                                if (readOnly)
                                    actionItems += viewButton;
                                else {
                                    actionItems += editButton;
                                    actionItems += duplicateButton;
                                    actionItems += deleteButton;
                                }
                                break;
                        }

                    }
                    else {
                        if (readOnly) {
                            //actionItems += '<li><a href-void ng-click="viewItem(' + stringifyIdVar + ')" ><i class="fa fa-search fa-fw  fa-lg"></i> View </a></li>';
                            actionItems += viewButton;

                        }
                        else {
                            //actionItems += '<li><a href-void ng-click="editItem(' + stringifyIdVar + ')" ><i class="fa fa-pencil-square-o fa-fw fa-lg"></i> Edit </a></li>';
                            //actionItems += '<li><a href-void ng-click="deleteItem(' + stringifyIdVar + ',' + stringNameVar + ')"><i class="fa fa-trash-o fa-fw fa-lg"></i> Delete </a></li>';
                            actionItems += editButton;
                            actionItems += deleteButton;

                        }
                    }

                    // return '<div class="btn-group btn-group-sm" role="group">' + actionItems + '</div>'
                    return '<div class="btn-group btn-group-sm" role="group">' + actionItems + '</div>'


                    /*
                     return "<div class=\"btn-group display-inline text-align-left open\" data-dropdown=\"\">" +
                     "	<button class=\"btn btn-sm btn-default dropdown-toggle\" aria-haspopup=\"true\" aria-expanded=\"true\"><i class=\"fa fa-cog fa-fw fa-lg\"></i></button>" +
                     "	<ul class=\"dropdown-menu  pull-right\">"
                     + actionItems +
                     /!*"		<li class=\"divider\"></li>" +
                     "		<li class=\"text-align-center\"><a href-void=\"\" href=\"#\">Cancel</a></li>" +
                     *!/
                     "	</ul>" +
                     "</div>";
                     */
                };

                scope.setObjectLevel = function (level) {

                    switch (level) {
                        case 1:
                            return '<i tooltip-placement="bottom" uib-tooltip="{{getWord(\'Global\')}}" class="fa fa-globe fa-2x object-level"></i>';
                        case 2:
                            return '<i tooltip-placement="bottom" uib-tooltip="{{user.curFacilityGrpName}}" class="fa fa-group fa-2x object-level"></i>';
                        default:
                            return '';
                    }
                };

                scope.setObjectLevelAllLabels = function (level) {

                    switch (level) {
                        case 1:
                            return '<i tooltip-placement="bottom" uib-tooltip="{{getWord(\'Global\')}}" class="fa fa-globe fa-2x object-level"></i>';
                        case 2:
                            return '<i tooltip-placement="bottom" uib-tooltip="{{user.curFacilityGrpName}}" class="fa fa-group fa-2x object-level"></i>';
                        case 3:
                            return '<i tooltip-placement="bottom" uib-tooltip="{{user.curFacilityName}}" class="fa fa-building fa-2x object-level"></i>';
                        default:
                            return '';
                    }
                };

                //// TODO: PB: Needs to be reworked to not use html to compare
                scope.isAccessible = function (data, html) {

                    var editHtml = '<a title="{{getWord(Edit)}} + data.jobNumber" style="color: silver;" class="fa fa-search fa-2x"></a>';

                    if (scope.object == 'OrdersArchive')
                        return editHtml;

                    //var currentFacilityId = localStorage.getItem('CurrentFacilityId');
                    //if(currentFacilityId) {
                    //    if (currentFacilityId != data.productionFacilityId && data.productionFacilityId != data.facilityId)
                    //        return editHtml
                    //}
                    return html;
                };

                scope.showCheckBox = function (data, command) {

                    var customAttributes = "";
                    var stringifyIdVar = "'" + data.id + "'";
                    var stringNameVar = "'" + he.encode(dtEncoder.escapeQuotes(data.name)) + "'";
                    var checked = '';

                    /*if(data.isDisabled || data.isSystemAdmin || data.isClosed || data.isTestFacility)
                     checked = 'checked';*/

                    if (!data.name) {
                        stringNameVar = "'" + data.login + "'";
                    }

                    switch (command) {
                        case 'Disable':
                            customAttributes = 'id="dis_' + data.id + '" name="chkDis_' + data.id + '" ng-click="enableDisableItem(' + stringifyIdVar + ', ' + stringNameVar + ', ' + data.isDisabled + ')"';
                            break;
                        case 'SystemAdmin':
                            customAttributes = 'id="sys_' + data.id + '" name="chkSys_' + data.id + '" ng-click="invokeRevokeSystemAdminRights(' + stringifyIdVar + ', ' + stringNameVar + ', ' + data.isSystemAdmin + ')"';
                            break;
                        case 'Close':
                            customAttributes = 'id="cls_' + data.id + '" name="chkCls_' + data.id + '" ng-click="closeItem(' + stringifyIdVar + ', ' + stringNameVar + ', ' + data.isClosed + ')"';
                            break;
                        case 'Test':
                            customAttributes = 'id="test_' + data.id + '" name="chkTest_' + data.id + '" ng-click="setTestItem(' + stringifyIdVar + ', ' + stringNameVar + ', ' + data.isTestFacility + ')"';
                            break;
                    }

                    return '<label class="checkbox"><input type="checkbox" ' + customAttributes + ' ' + checked + '><i></i></label>';
                };
            }
        }
    });
});


