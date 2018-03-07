/**
 * Created by DanGar on 4/15/2016.
 * Path: layout/service/multiSelectorDDService.js
 */

define(['layout/module'], function (module) {

    'use strict';

    module.registerService('multiSelectorDDService', function () {

        var createdList = [];
        var preparedList = [];
        return {

             /*createList : function(mainList, groupList){

                console.log(mainList);
                console.log(groupList);

                return createdList = [];
            },*/

            createGroupedList : function(overrideParam) {

                preparedList = [];///Avoid duplicate values.
                var valueCounter = 0;

                ///Array list must contain objects.
                _.forEach(overrideParam, function (parameter) {
                    _.forEach(parameter.list, function (listItem) {
                        preparedList.push(listItem);
                        listItem.group = parameter.listName;
                        listItem.groupEnum = parameter.groupEnum;
                        listItem.value = valueCounter;
                        valueCounter++;
                    })

                });
                return preparedList;
            },
            createList : function(overrideParam) {
                //TODO: To be implemented.
                _.forEach(overrideParam, function (parameter) {
                    _.forEach(parameter.list, function (listItem) {
                        preparedList.push(listItem);
                    })

                });
                return preparedList;
            }

        };

    });
});