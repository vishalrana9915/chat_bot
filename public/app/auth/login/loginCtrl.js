define(['auth/module','io', 'form-validator-bootstrap', 'form-validator-mandatoryicon'], function (module,io) {

    "use strict";
          module.registerController('LoginCtrl', function ($rootScope,
                                                            $scope, 
                                                            $state, 
                                                            User, 
                                                            Authorization, 
                                                            $location, 
                                                            $http, 
                                                            $cookies,
                                                            notificationService) {
 
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
            $rootScope.startSpinner()

            Authorization.login(
                $scope.userInfo.username,
                $scope.userInfo.password)

                .success(function (data) {
                    $scope.stopSpinner();
                    User.initUserInfo()                      
                        notificationService.loginSuccess();
                        
                })

                .error(function (response) {
                    // $scope.stopSpinner();
                        console.log("in Error")

                });
        };





              
    });
});
