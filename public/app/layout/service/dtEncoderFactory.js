/**
 * Created by Dante Garcia on 9/26/2015.
 * Path: app/layout/service/dataTableValueEncoderFactory.js
 */

define(['layout/module'], function (module) {

    'use strict';

    module.registerFactory('dtEncoder', function () {

        return {
            /*
                Encode all the string fields for DataTables.
                PropertyNames should only reference fields that contain string values.

                var propertyNames = [
                    'name',
                    'type',
                    'region',
                    'externalCode'
                ];
            */
            dtEncodeValues : function(data, propertyNames){

                if(data && data.length > 0) {
                    for (var pNames = 0; pNames < propertyNames.length; pNames++) {
                        for (var arrayIdx = 0; arrayIdx < data.length; arrayIdx++) {
                            try {
                                data[arrayIdx][propertyNames[pNames]] = (data[arrayIdx][propertyNames[pNames]]) ?
                                    he.encode(data[arrayIdx][propertyNames[pNames]]) :
                                    data[arrayIdx][propertyNames[pNames]];
                            } catch (e) {
                                console.log(e);
                                console.log('Please ensure that indexes reference Only string values.')
                            }
                        }
                    }
                }
                return data;
            },
            escapeQuotes : function(stringData){

                var newString = '';
                var stringLength = (stringData) ? stringData.length : 0;

                if(stringData){
                    if (((stringData[0] == '"') || (stringData[0] == "'"))) {
                        newString += "";
                    }

                    for (var i = 0; i < stringData.length; i++) {

                        if ((stringData[i] == '"') || (stringData[i] == "'")) {
                            newString += "\\";
                        }
                        newString += stringData[i];
                    }

                    if ((stringData[stringLength - 1] == '"') || (stringData[stringLength - 1] == "'"))
                        newString += "";

                }else
                    newString = '</>';

                    return newString;
            }

        };

    });
});