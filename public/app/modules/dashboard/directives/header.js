define(['auth/module'], function (module) {
    
      "use strict";

    module.registerDirective('headerDir', function ($rootScope) {
    
     return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'app/modules/dashboard/partials/header.html',
            link: function (scope, form) {


            }
        }
    })
})