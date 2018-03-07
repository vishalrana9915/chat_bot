define(['layout/module',
    'lodash'
], function (module, _) {

    'use strict';

    module.registerDirective('bigBreadcrumbs', function ($rootScope, $compile) {






        return {

            restrict: 'E',
            replace: true,
            template: '<div><h1 class="page-title txt-color-blueDark"></h1></div>',
            scope: {
                items: '=',
                icon: '@'
            },

            link: function (scope, element) {

                //https://lodash.com/docs#first
                //Gets the first element of array.
                var first = _.first(scope.items);

                //We we haven't included and icon default to home
                var icon = scope.icon || 'home';

                element.find('h1').append('<i class="fa-fw fa fa-' + icon + '"></i> ' + $rootScope.getWord(first) );

                //https://lodash.com/docs#rest
                //Gets all but the first element of array.
                try{
                    _.rest(scope.items).forEach(function (item) {
                        item =  $rootScope.getWord(item);
                        element.find('h1').append(' <span>> ' + item + '</span>');
                    });
                }
                catch(err){

                }
            }
        };
    });
});
