/**
 * Created by DanGar on 3/17/17.
 */
define(['layout/module'], function(module){

    'use strict';

    module.registerService('errorNotificationsService', function($rootScope){
       return  {
           notifyError: function(errorMsg){
                   $.bigBox({
                       title: $rootScope.getWord('Error'),
                       content: errorMsg,
                       color: "#C46A69",
                       icon: "fa fa-warning shake animated",
                       //number: ++errorCounter,
                       timeout: 6000
                   });
           }
       };
    });
});