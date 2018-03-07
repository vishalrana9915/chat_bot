/**
 * Created by Shawn Miller on 10/16/2015.
 * Path: public/app/layout/directives/tableActionsDropdown.js
 */
define(['layout/module',
    'lodash', 'to-markdown'
], function (module) {

    'use strict';

    module.registerDirective('tableActionsDropdown', function (dtEncoder) {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope) {

                scope.tableActions = function(objectId, objectName, readOnly, commandTypes){

                    var stringifyIdVar = "'" + objectId + "'";
                    var stringNameVar = "'"+ he.encode(dtEncoder.escapeQuotes(objectName)) +"'";


                    scope.stringifyIdVar = stringifyIdVar;
                    scope.stringNameVar = stringNameVar;

                    var actionItems = '';
                    var buttonColor = "btn-primary";
                    if(commandTypes) {
                        _.forEach(commandTypes, function (item) {
                            switch (item) {
                                case 1:
                                    if (readOnly)
                                        actionItems += '<li> <a href-void ng-click="viewItem(' + stringifyIdVar + ')" > <i class="fa fa-search fa-lg"></i> View </a> </li>';
                                    break;
                                case 2:
                                    if (!readOnly)
                                        actionItems += '<li> <a href-void ng-click="editItem(' + stringifyIdVar + ')" > <i class="fa fa-pencil-square-o fa-lg"></i> Edit </a> </li>';
                                    break;
                                case 3:
                                    if (!readOnly)
                                        actionItems += '<li> <a href-void ng-click="deleteItem(' + stringifyIdVar + ',' + stringNameVar + ')" > <i class="fa fa-trash-o fa-lg"></i> Delete </a> </li>';
                                    break;
                                case 4:
                                    if (!readOnly)
                                        actionItems += '<li> <a href-void ng-click="updatePassword(' + stringifyIdVar + ')" > <i class="fa fa-key fa-lg"></i> Change Password </a> </li>';
                                    break;
                            }
                        });
                    }
                    else {
                        if (readOnly)
                            actionItems += '<a href-void tooltip-placement="bottom" uib-tooltip="{{getWord(\'View\')}}"  class="btn ' + buttonColor + '" ng-click="viewItem(' + stringifyIdVar + ')" ><i class="fa fa-search fa-lg"></i></a>';
                        else {
                            actionItems += '<a href-void tooltip-placement="bottom" uib-tooltip="{{getWord(\'Edit\')}}" class="btn ' + buttonColor + '" ng-click="editItem(' + stringifyIdVar + ')" ><i class="fa fa-pencil-square-o fa-lg"></i></a>';
                            actionItems += '<a href-void tooltip-placement="bottom" uib-tooltip="{{getWord(\'Delete\')}}" class="btn ' + buttonColor + '" ng-click="deleteItem(' + stringifyIdVar + ',' + stringNameVar + ')"><i class="fa fa-trash-o fa-lg"></i></a>';
                        }
                    }


                    //Wrap in Button Group
                    //return '<div class="btn-group btn-group-sm" role="group">' + actionItems + '</div>'

                    return '<div class="btn-group display-inline pull-right text-align-left open" data-dropdown="">'  +
                    '<button class="btn btn-sm btn-primary dropdown-toggle" aria-haspopup="true" aria-expanded="true"><i class="fa fa-cog fa-lg"></i></button>'  +
                    '<ul class="dropdown-menu dropdown-menu-sm pull-right">'  +
                    + actionItems +
                    '<li class="divider"></li><li class="text-align-center"><a href-void="" href="#">Cancel</a></li></ul></div>';
                };

                scope.setObjectLevel = function(level){

                    switch(level){
                        case 1:
                            return '<i tooltip-placement="bottom" uib-tooltip="{{getWord(\'Global\')}}" class="fa fa-globe fa-2x object-level"></i>';
                        case 2:
                            return '<i tooltip-placement="bottom" uib-tooltip="{{user.curFacilityGrpName}}" class="fa fa-group fa-2x object-level"></i>';
                        default:
                            return '';
                    }
                };

                //// TODO: PB: Needs to be reworked to not use html to compare
                scope.isAccessible = function(data, html){

                    var editHtml ='<a title="{{getWord(Edit)}} + data.jobNumber" style="color: silver;" class="fa fa-search fa-2x"></a>';

                    if (scope.object == 'OrdersArchive')
                        return editHtml;

                    //var currentFacilityId = localStorage.getItem('CurrentFacilityId');
                    //if(currentFacilityId) {
                    //    if (currentFacilityId != data.productionFacilityId && data.productionFacilityId != data.facilityId)
                    //        return editHtml
                    //}
                    return html;
                };

                scope.showCheckBox = function(data, command){

                    var customAttributes = "";
                    var stringifyIdVar = "'" + data.id + "'";
                    var stringNameVar = "'" + he.encode(dtEncoder.escapeQuotes(data.name)) + "'";
                    var checked = '';

                    /*if(data.isDisabled || data.isSystemAdmin || data.isClosed || data.isTestFacility)
                        checked = 'checked';*/

                    if(!data.name) {
                        stringNameVar = "'" + data.login + "'";
                    }

                    switch(command) {
                        case 'Disable':
                            customAttributes = 'id="dis_' + data.id + '" name="chkDis_' + data.id + '" ng-click="enableDisableItem(' + stringifyIdVar +', ' + stringNameVar+ ', ' + data.isDisabled + ')"';
                            break;
                        case 'SystemAdmin':
                            customAttributes = 'id="sys_' + data.id + '" name="chkSys_' + data.id + '" ng-click="invokeRevokeSystemAdminRights(' + stringifyIdVar +', ' + stringNameVar+ ', ' + data.isSystemAdmin + ')"';
                            break;
                        case 'Close':
                            customAttributes = 'id="cls_' + data.id + '" name="chkCls_' + data.id + '" ng-click="closeItem(' + stringifyIdVar +', ' + stringNameVar+ ', ' + data.isClosed + ')"';
                            break;
                        case 'Test':
                            customAttributes = 'id="test_' + data.id + '" name="chkTest_' + data.id + '" ng-click="setTestItem(' + stringifyIdVar +', ' + stringNameVar+ ', ' + data.isTestFacility+ ')"';
                            break;
                    }

                    return '<label class="checkbox"><input type="checkbox" ' + customAttributes  + ' ' + checked + '><i></i></label>';
                };
            }
        }
    });
});


