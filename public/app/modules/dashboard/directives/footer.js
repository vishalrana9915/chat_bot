define(['auth/module'], function (module) {
    
      "use strict";

    module.registerDirective('footerDir', function ($rootScope) {
    
     return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'app/modules/dashboard/partials/footer.html',
            link: function (scope, form) {


            }
        }
    })
})