/**
 * Created by Dante Garcia on 7/30/2015.
 * Path:    app/layout/service/dualListFactory.js
 */

define(['layout/module'], function (module) {

    'use strict';

    module.registerFactory('dualListFactory', function () {
        var unselectedItemIds = '';
        var assignedItemsIdTracker = '';
        var assignedItemsObject = '';
        return {
            removeUnselectedItemsObsolete: function (assigned, tracker, curSelected, itemType) {

                var tempRemArray = assigned;//Get a temporary array of assignedInks.

                //Get the difference between unselected inks and assigned inks..
                var unselectedItems = _.xor(tracker, curSelected);
                unselectedItemIds = unselectedItems;

                //Pull Assign inks that match unselected inks.
                var itemIds = [];
                for (var i = 0; i < unselectedItems.length; i++)
                    switch (itemType) {
                        case 'pressCategory':
                            _.findIndex(tempRemArray, function (ink) {
                                if (ink.id == unselectedItems[i]) {
                                    itemIds.push(ink.pressClassInkId);
                                }
                            });
                            break;
                    }
                //Create batch of Press Class Inks Id's
                var batchRemoveItems = [];
                for (var i = 0; i < itemIds.length; i++)
                    batchRemoveItems.push(itemIds[i]);

                return batchRemoveItems;
            },
            getUnselectedItemIds: function () {
                return unselectedItemIds;
            },
            setUnselectedItemIds: function (data) {
                unselectedItemIds = data;
            },
            //Initialize items trackers. Will be used for removed and assigned items.
            initTrackers: function (tracker, fullObject) {
                assignedItemsIdTracker = tracker;
                assignedItemsObject = fullObject;
            },
            //Track every item that has been assigned.
            trackAssignedItems: function (itemsTracker, assignedItemsResponse) {
                //itemsTracker... This variable tracks the items.
                //assignedItemsIdTracker... Tracks items that havee been assign.
                for (var i = 0; i < itemsTracker.length; i++)
                    assignedItemsIdTracker.push(itemsTracker[i]);

                for (var j = 0; j < assignedItemsResponse.length; j++)
                    assignedItemsObject.push(assignedItemsResponse[j]);
            },
            //Removes items from tracker.
            removeAssignedItems: function (batchItems, itemType) {

                /*******************************************************
                 * Removes item from being tracked.                  -DG
                 *******************************************************/
                for (var i = 0; i < unselectedItemIds.length; i++)
                    _.remove(assignedItemsIdTracker, function (trackedItem) {
                        return trackedItem == unselectedItemIds[i]
                    });

                /*******************************************************
                 * Remove items from the Assigned Items stored in the server -DG
                 *******************************************************/
                switch (itemType) {
                    case 'pressCategory':
                        for (var j = 0; j < batchItems.length; j++) {
                            _.remove(assignedItemsObject, function (assignedItem) {
                                    return assignedItem.pressClassInkId == batchItems[j];
                                }
                            );
                        }
                        break;
                    case 'supportFacility':
                        for (var j = 0; j < batchItems.length; j++) {
                            _.remove(assignedItemsObject, function (assignedItem) {
                                    return assignedItem.id == batchItems[j];
                                }
                            );
                        }
                        break;
                    case 'FacilityGroupFacility':
                        for (var j = 0; j < batchItems.length; j++) {
                            _.remove(assignedItemsObject, function (assignedItem) {
                                    return assignedItem.id == batchItems[j];
                                }
                            );
                        }
                        break;
                    case 'SystemUserFacility':
                        for (var j = 0; j < batchItems.length; j++) {
                            _.remove(assignedItemsObject, function (assignedItem) {
                                    return assignedItem.id == batchItems[j];
                                }
                            );
                        }
                        break;
                    case 'SystemUserFacilityAdmin':
                        for (var j = 0; j < batchItems.length; j++) {
                            _.remove(assignedItemsObject, function (assignedItem) {
                                    return assignedItem.id == batchItems[j];
                                }
                            );
                        }
                        break;
                    case 'SystemUserRole':
                        for (var j = 0; j < batchItems.length; j++) {
                            _.remove(assignedItemsObject, function (assignedItem) {
                                    return assignedItem.id == batchItems[j];
                                }
                            );
                        }
                        break;
                    case 'SystemMenuItemRole':
                        for (var j = 0; j < batchItems.length; j++) {
                            _.remove(assignedItemsObject, function (assignedItem) {
                                    return assignedItem.id == batchItems[j];
                                }
                            );
                        }
                        break;
                    case 'SystemRoleCommand':
                        for (var j = 0; j < batchItems.length; j++) {
                            _.remove(assignedItemsObject, function (assignedItem) {
                                    return assignedItem.id == batchItems[j];
                                }
                            );
                        }
                        break;

                }
            },
            //Calculates if the item/s haven't already been assigned
            newAssignment : function(scopeAssignedItems){

                var diff = _.difference(scopeAssignedItems, assignedItemsIdTracker);
                return diff;
            },
            alreadyAssigned: function (scopeAssignedItems) {
                var diff = _.difference(scopeAssignedItems, assignedItemsIdTracker);
                //return _.difference(scopeAssignedItems, assignedItemsIdTracker);

                if (diff.length > 0)
                    return false;
                else
                    return true;
            },
            //Creates the remove batch to pass it to the call.
            removeUnselectedItems: function (curSelected, itemType) {

                /**************************************************************
                 * curSelected ...Current list scope model.                 -DG
                 * itemType ...There will be several uses for this method.  -DG
                 **************************************************************/

                var tempRemArray = assignedItemsObject;//Get a temporary array of assignedInks.

                //Get the difference between unselected inks and assigned inks..
                var unselectedItems = _.xor(assignedItemsIdTracker, curSelected);
                unselectedItemIds = unselectedItems;

                //Pull Assign items that match unselected items.
                var itemIds = [];
                for (var i = 0; i < unselectedItems.length; i++)
                    switch (itemType) {
                        case 'pressCategory':
                            _.findIndex(tempRemArray, function (ink) {
                                if (ink.id == unselectedItems[i]) {
                                    itemIds.push(ink.pressClassInkId);
                                }
                            });
                            break;
                        case 'supportFacility':
                            _.findIndex(tempRemArray, function (suppFacility) {
                                if (suppFacility.supportingFacilityId == unselectedItems[i]) {//Match Item Id with Object Id
                                    itemIds.push(suppFacility.id);//Push to the Id of the object where the Item is referenced.
                                }
                            });
                            break;
                        case 'FacilityGroupFacility':
                            _.findIndex(tempRemArray, function (facility) {
                                if (facility.facilityId == unselectedItems[i]) {
                                    itemIds.push(facility.id);
                                }
                            });
                            break;
                        case 'SystemUserFacility':
                            _.findIndex(tempRemArray, function (facility) {
                                if (facility.facilityId == unselectedItems[i]) {
                                    itemIds.push(facility.id);
                                }
                            });
                            break;
                        case 'SystemUserFacilityAdmin':
                            _.findIndex(tempRemArray, function (facility) {
                                if (facility.id == unselectedItems[i]) {
                                    itemIds.push(facility.id);
                                }
                            });
                            break;
                        case 'SystemUserRole':
                            _.findIndex(tempRemArray, function (role) {
                                if (role.systemRoleId == unselectedItems[i]) {
                                    itemIds.push(role.id);
                                }
                            });
                            break;
                        case 'SystemMenuItemRole':
                            _.findIndex(tempRemArray, function (role) {
                                if (role.systemRoleId == unselectedItems[i]) {
                                    itemIds.push(role.id);
                                }
                            });
                            break;
                        case 'SystemRoleCommand':
                            _.findIndex(tempRemArray, function (command) {
                                if (command.name == unselectedItems[i] || command.commandName == unselectedItems[i]) {
                                    itemIds.push(command.id);
                                }
                            });
                            break;
                    }
                //Create batch of Id's
                var batchRemoveItems = [];
                for (var i = 0; i < itemIds.length; i++)
                    batchRemoveItems.push(itemIds[i]);

                return batchRemoveItems;//Batch of id's that will be sent for removal.
            }
        };

    });
});