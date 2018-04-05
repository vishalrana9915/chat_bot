define(['auth/module'], function (module) {

    "use strict";
        module.registerController('signupCtrl', function ($rootScope,$scope, $state, $location, $http, $cookies,Authorization,notificationService) {

			console.log("in signup ctrl")   	

			$scope.userInfo ={}
			$scope.monthInfo =['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
			$scope.daysInfo=[]
			$scope.yearInfo=[]
			$scope.daysInit = function(){
					for(var i=1;i<=31;i++)
						$scope.daysInfo.push(i)
				}
			$scope.yearInit = function(){
					for(var j=1965;j<=2017;j++)
						$scope.yearInfo.push(j)
				}


			$scope.signup = function (data){
				console.log(data)
				$rootScope.startSpinner()
				Authorization.register(data)
                .success(function (result) {
                    $scope.stopSpinner();
                    if(result.status){                    
                        // notificationService.loginSuccess();
                         notificationService.registerSuccess();
                        $state.transitionTo('login')
                    }
                   
                        
                })

                .error(function (response) {
                    $scope.stopSpinner();
                        console.log("in Error")

                });

			}

			$scope.daysInit();
			$scope.yearInit();
			// $scope.signup();
    });
});
