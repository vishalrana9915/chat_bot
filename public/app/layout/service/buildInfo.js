/**
 * Created by DanGar on 8/26/2016.
 * Path: ../app/layout/service/buildInfo.js
 */


define(['app'], function (module) {

    'use strict';

    module.registerService('buildInfo', function () {

        var currentBuildInfo = appConfig.build;

        return {
            getBuildInfo : function(){
                return currentBuildInfo;
            },
            setBuildInfo : function(data){
                currentBuildInfo = data;
            },
            correctPath: function(pathExpression){

                var newPath = '';

                if(pathExpression.indexOf("app") >= 0){
                    newPath = pathExpression.replace("app", currentBuildInfo);
                }else if(pathExpression.indexOf(currentBuildInfo) >= 0){
                    newPath = pathExpression;
                }else{
                    newPath = currentBuildInfo + '/' + pathExpression;
                }

                return newPath;
            }
        };

    });
});