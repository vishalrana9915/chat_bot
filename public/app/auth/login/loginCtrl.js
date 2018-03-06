define(['auth/module'], function (module) {

    "use strict";

    module.registerController('LoginCtrl', function ($rootScope, $scope, $state, User, Authorization, $location, $http, $cookies) {

        console.log("in login ctrl");

        $scope.userInfo = {
            username: '',
            password: ''
        };

        if ($cookies.get('username') != null) {
            $scope.userInfo.username = $cookies.get('username');
        }

        var currentDate = new Date();
        if ($cookies.get('_Token'))
            var tokenDate = new Date($cookies.get('expDate'));

        if ($cookies.get('_Token') && (tokenDate >= currentDate)) {
            $location.path('/');
        }

        $scope.loginUser = function (userInfo) {

            if ($scope.userInfo.rememberMe && $scope.userInfo.username) {
                $cookies.put("username", $scope.userInfo.username);
            }

            $scope.startSpinner();

            Authorization.login(
                $scope.userInfo.username,
                $scope.userInfo.password)

                .success(function (data) {
                    $scope.stopSpinner();

                    if ($rootScope.previousUrl) {
                        $location.path($rootScope.previousUrl);
                    } else {
                        $location.path('/');
                    }
                })

                .error(function (response) {
                    $scope.stopSpinner();
                });
        };
    });
});
