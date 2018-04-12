/**
 * Created by vishal on  04/11/2018.
 * Path: public/app/layout/service/facilityRoutingService.js
 */
define(['app'], function (module) {

    'use strict';

    return module.registerService('fileUploadService', function ($rootScope) {

        return {
            createFileFormData : function(files){
                console.log(files["0"])
                var myFormData = new FormData();

                if(files == null || files == undefined || files.length <=0){
                    console.log('No files found!');
                    return 0;
                }else{
                    // for (var i = 0; i < files.length; i++)
                    myFormData.append('file', files);

                // if(data){
                //     _.forEach(data, function (n, key) {
                //         formData.append(key, n);
                //     });
                // }
                    console.log(myFormData);
                
                return myFormData;
                }

                
            }
        };
    });
});