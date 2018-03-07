/**
 * Created by Dante Garcia on  10/23/2016.
 * Path: public/app/layout/service/facilityRoutingService.js
 */
define(['layout/module'], function (module) {

    'use strict';

    return module.registerService('fileUploadService', function ($rootScope) {

        return {
            createFileFormData : function(files, data){

                var formData = new FormData();

                if(files == null || files == undefined || files.length <=0){
                    console.log('No files found!');
                    return 0;
                }

                for (var i = 0; i < files.length; i++)
                    formData.append('files[]', files[i]);

                if(data){
                    _.forEach(data, function (n, key) {
                        formData.append(key, n);
                    });
                }
                return formData;
            }
        };
    });
});