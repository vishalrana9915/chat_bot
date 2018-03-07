/**
 * Written by Dante G.  4/13/2017
 */
var Utilities;
(function (Utilities) {
    var DualListTracker = (function () {
        /**
         *
         * @param assginedItemValues - Assigned item values.
         * @param assignedItemObject - Available (Remaining) item complete object.
         * @param lodash
         */
        function DualListTracker(assginedItemValues, assignedItemObject, lodash) {
            var self = this;
            self.assignedItemsIdTracker = assginedItemValues;
            self.assignedItemsObject = assignedItemObject;
            self.unselectedItemIds = [];
            self.lodash = lodash;
        }
        DualListTracker.prototype.getUnselectedItemIds = function () {
            var self = this, _ = self.lodash;
            return self.unselectedItemIds;
        };
        DualListTracker.prototype.setUnselectedItemIds = function (data) {
            var self = this, _ = self.lodash;
            self.unselectedItemIds = data;
        };
        DualListTracker.prototype.initTrackers = function (tracker, fullObject) {
            var self = this, _ = self.lodash;
            self.assignedItemsIdTracker = tracker;
            self.assignedItemsObject = fullObject;
        };
        DualListTracker.prototype.trackAssignedItems = function (itemsTracker, assignedItemsResponse) {
            var self = this, _ = self.lodash;
            for (var i = 0; i < itemsTracker.length; i++)
                self.assignedItemsIdTracker.push(itemsTracker[i]);
            for (var j = 0; j < assignedItemsResponse.length; j++)
                self.assignedItemsObject.push(assignedItemsResponse[j]);
        };
        DualListTracker.prototype.removeAssignedItems = function (batchItems, itemType) {
            var self = this, _ = self.lodash;
            /*******************************************************
                    * Removes item from being tracked.                  -DG
                    *******************************************************/
            var unselectedItemsIds = self.unselectedItemIds;
            for (var i = 0; i < unselectedItemsIds.length; i++)
                _.remove(self.assignedItemsIdTracker, function (trackedItem) {
                    return trackedItem == unselectedItemsIds[i];
                });
            /*******************************************************
             * Remove items from the Assigned Items stored in the server -DG
             *******************************************************/
            switch (itemType) {
                case 'pressCategory':
                    for (var j = 0; j < batchItems.length; j++) {
                        _.remove(self.assignedItemsObject, function (assignedItem) {
                            return assignedItem.pressClassInkId == batchItems[j];
                        });
                    }
                    break;
                case 'supportFacility':
                    for (var j = 0; j < batchItems.length; j++) {
                        _.remove(self.assignedItemsObject, function (assignedItem) {
                            return assignedItem.id == batchItems[j];
                        });
                    }
                    break;
                case 'FacilityGroupFacility':
                    for (var j = 0; j < batchItems.length; j++) {
                        _.remove(self.assignedItemsObject, function (assignedItem) {
                            return assignedItem.id == batchItems[j];
                        });
                    }
                    break;
                case 'SystemUserFacility':
                    for (var j = 0; j < batchItems.length; j++) {
                        _.remove(self.assignedItemsObject, function (assignedItem) {
                            return assignedItem.id == batchItems[j];
                        });
                    }
                    break;
                case 'SystemUserFacilityAdmin':
                    for (var j = 0; j < batchItems.length; j++) {
                        _.remove(self.assignedItemsObject, function (assignedItem) {
                            return assignedItem.id == batchItems[j];
                        });
                    }
                    break;
                case 'SystemUserRole':
                    for (var j = 0; j < batchItems.length; j++) {
                        _.remove(self.assignedItemsObject, function (assignedItem) {
                            return assignedItem.id == batchItems[j];
                        });
                    }
                    break;
                case 'SystemMenuItemRole':
                    for (var j = 0; j < batchItems.length; j++) {
                        _.remove(self.assignedItemsObject, function (assignedItem) {
                            return assignedItem.id == batchItems[j];
                        });
                    }
                    break;
                case 'SystemRoleCommand':
                    for (var j = 0; j < batchItems.length; j++) {
                        _.remove(self.assignedItemsObject, function (assignedItem) {
                            return assignedItem.id == batchItems[j];
                        });
                    }
                    break;
            }
        };
        DualListTracker.prototype.newAssignment = function (scopeAssignedItems) {
            var self = this, _ = self.lodash;
            return _.difference(scopeAssignedItems, self.assignedItemsIdTracker);
        };
        DualListTracker.prototype.alreadyAssigned = function (scopeAssignedItems) {
            var self = this, _ = self.lodash;
            var diff = _.difference(scopeAssignedItems, self.assignedItemsIdTracker);
            //return _.difference(scopeAssignedItems, assignedItemsIdTracker);
            if (diff.length > 0)
                return false;
            else
                return true;
        };
        DualListTracker.prototype.removeUnselectedItems = function (curSelected, itemType) {
            var self = this, _ = self.lodash;
            /**************************************************************
             * curSelected ...Current list scope model.                 -DG
             * itemType ...There will be several uses for this method.  -DG
             **************************************************************/
            var tempRemArray = self.assignedItemsObject; //Get a temporary array of assignedInks.
            //Get the difference between unselected inks and assigned inks..
            var unselectedItems = _.xor(self.assignedItemsIdTracker, curSelected);
            self.unselectedItemIds = unselectedItems;
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
                            if (suppFacility.supportingFacilityId == unselectedItems[i]) {
                                itemIds.push(suppFacility.id); //Push to the Id of the object where the Item is referenced.
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
                            if ((command.name || command.commandName) == unselectedItems[i]) {
                                itemIds.push(command.id);
                            }
                        });
                        break;
                }
            //Create batch of Id's
            var batchRemoveItems = [];
            for (var i = 0; i < itemIds.length; i++)
                batchRemoveItems.push(itemIds[i]);
            return batchRemoveItems; //Batch of id's that will be sent for removal.
        };
        return DualListTracker;
    }());
    Utilities.DualListTracker = DualListTracker;
})(Utilities || (Utilities = {}));
