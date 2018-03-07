/**
 * Created by Dante Garcia on 9/26/2016.
 * Path: app/layout/service/appendPropertyService.js
 */

define(['layout/module'], function (module) {

    'use strict';

    module.registerFactory('appendProperty', function () {

        return {
            appendToObject : function(obj, propertyNamesAry, dataToAppend){

                var addProperty, propertyData;

                for(var pNames=0;pNames < propertyNamesAry.length; pNames++){

                    addProperty = propertyNamesAry[pNames];
                    propertyData = dataToAppend[propertyNamesAry[pNames]];

                    obj[addProperty] = propertyData;
                }

               return obj;
            },
            /*****************************************************************
            * Default - Use this method to create new object/array reference.*
            *****************************************************************/
            appendPerProperty : function(obj, propertyNamesAry, dataToAppend){
                var newObj = {};
                var addProperty, propertyData;

                for(var pNames=0;pNames < propertyNamesAry.length; pNames++){

                    addProperty = propertyNamesAry[pNames];
                    propertyData = dataToAppend[propertyNamesAry[pNames]];

                    newObj[addProperty] = propertyData;
                }
                return angular.copy(newObj);
            },
            appendPerPropertyKeepReference : function(obj, propertyNamesAry, dataToAppend){
                var newObj = {};
                var addProperty, propertyData;

                for(var pNames=0;pNames < propertyNamesAry.length; pNames++){

                    addProperty = propertyNamesAry[pNames];
                    propertyData = dataToAppend[propertyNamesAry[pNames]];

                    newObj[addProperty] = propertyData;
                }
                return newObj;
            }
        };

    });
});