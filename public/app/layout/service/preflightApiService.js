/**
 * Created by Dante Garcia on 7/01/2016.
 * Path: app/layout/service/preflightApiService.js
 */
define(['layout/module'], function (module) {

    'use strict';

    return module.registerService('PreflightApiService', function ($http, $q) {

        return {

            getProfileList : function () {
                return $http({
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    url : appConfig.preflightApiURL + '/api/ProfileManagement'
                });
            },

            getImpositionList : function(){
                return $http({
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    url : appConfig.preflightApiURL + '/api/ImpositionTemplate'
                });
            },
            createObjectCall : function (api, payload) {
                return $http({
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    url : appConfig.apiURL + '/api/' + api,
                    data : payload
                });
            },

            createObjectCallWithDomainModel : function (api, payload, domainModel) {
                return $http({
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json;domain-model=' + domainModel
                    },
                    url : appConfig.apiURL + '/api/' + api,
                    data : payload
                });
            },
            readImpositionTemplate : function (payloadId) {
                return $http({
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    url : appConfig.preflightApiURL + '/api/ImpositionTemplate/' + payloadId
                });
            },
            readPreflightObject : function (payloadId) {
                return $http({
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    url : appConfig.preflightApiURL + '/api/ProfileManagement/' + payloadId
                });
            },

            readObjectCallWithObject : function (api, payloadId, object) {
                return $http({
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    url : appConfig.apiURL + '/api/' + api + '/' + payloadId + '/' + object
                });
            },

            updateObjectCall : function (api, payload) {
                return $http({
                    method : 'PUT',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    url : appConfig.apiURL + '/api/' + api + '/' + payload.id,
                    data : payload
                });
            },

            updateObjectCallWithDomainModel : function (api, payload, domainModel) {
                return $http({
                    method : 'PUT',
                    headers : {
                        'Content-Type' : 'application/json;domain-model=' + domainModel
                    },
                    url : appConfig.apiURL + '/api/' + api + '/' + payload.id,
                    data : payload
                });
            },

            deleteObjectCall : function (api, payloadId) {
                return $http({
                    method : 'DELETE',
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    url : api + '/' + payloadId
                });
            },

            deleteObjectWithContractCall : function (api, payloadId, payload, domainModel) {
                if (domainModel)
                    domainModel = 'domain-model=' + domainModel;
                else
                    domainModel = "";

                return $http({
                    method : 'DELETE',
                    headers : {
                        'Content-Type' : 'application/json;' + domainModel
                    },
                    url : appConfig.apiURL + '/api/' + api + '/' + payloadId,
                    data : payload
                });
            },

            createObjectWithDomainModel : function (api, payloadId, payload, domainModel) {
                if (domainModel)
                    domainModel = 'domain-model=' + domainModel;
                else
                    domainModel = "";

                return $http({
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json;' + domainModel
                    },
                    url : appConfig.apiURL + '/api/' + api + '/' + payloadId,
                    data : payload
                });
            },

            //SSM -- CURRENTLY USED ON HEADER.TPL.HTML
            changeFacility : function (facilityId) {
                return $http({
                    method : 'PUT',
                    url : appConfig.apiURL + '/api/CurrentFacility/' + facilityId
                })
            },

            lookupObjects : function (objectName) {
                return $http({
                    method : 'GET',
                    url : appConfig.apiURL + '/api/Lookup?LookupType=' + objectName
                });
            },

            getPreflightListCall : function (api) {
                return $http({
                    method : 'GET',
                    url : appConfig.preflightURL + '/api/' + api
                });
            },

            readPreflightObjectCall : function (api, payloadId) {
                return $http({
                    method : 'GET',
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    url : appConfig.preflightURL + '/api/' + api + '/' + payloadId
                });
            },

            createPreflightObjectCallWithDomainModel : function (api, payload, domainModel) {
                return $http({
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json;domain-model=' + domainModel
                    },
                    url : appConfig.preflightURL + '/api/' + api,
                    data : payload
                });
            },

            updatePreflightObjectCall : function (api, payload) {
                return $http({
                    method : 'PUT',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    url : appConfig.preflightURL + '/api/' + api + '/' + payload.id,
                    data : payload
                });
            },

            deletePreflightObjectCall : function (api, payloadId) {
                return $http({
                    method : 'DELETE',
                    headers : {
                        'Content-Type' : 'application/x-www-form-urlencoded'
                    },
                    url : appConfig.preflightURL + '/api/' + api + '/' + payloadId
                });
            },

            booleanCall : function(api, payloadId, payload, domainModel){
                return $http({
                    method : 'POST',
                    headers : {
                        'Content-Type' : "application/json;domain-model="+domainModel
                    },
                    url : appConfig.apiURL + '/api/' + api + '/' + payloadId,
                    data:payload
                });
            },
            getImpositionDetails: function (callback) {
                return $http.get(appConfig.build + '/modules/workflow-management/data/imposition/imposition.json')
                    .success(function (data) {
                        return data;
                    })
                    .error(function () {
                        $log.log('Error: ' + data.toString());
                        callback([]);
                    });
            }
        };

    });
});
