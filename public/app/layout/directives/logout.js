/**
 * Created by Dante Garcia on 5/19/15
 * Filename: public/app/layout/directives/logout.js
 */
define(['layout/module'
], function (module) {

    'use strict';

    return module.registerDirective('logoutForm', function () {

        return {

            restrict: 'A',
            controller: function ($scope, $state, $rootScope) {

                var UserInfo = '';

                var strNo = $rootScope.getWord('No');
                var strYes = $rootScope.getWord('Yes');
	            var strConfirm = $rootScope.getWord('MsgPleaseConfirm');

                //Disable confirmation buttons after selction.
                var disableConfirmationButtons = function(){
                    angular.element('#bot1-Msg1').attr('disabled', 'disabled');
                    angular.element('#bot2-Msg1').attr('disabled', 'disabled');
                };


                $('#logoutLink').on('click', function(){

                    if($scope.user)
                        UserInfo = $scope.user.username;
                    else
                        UserInfo = 'User';

                    var msgContent = $rootScope.getWord('LogOut') +" <strong>"+ UserInfo +"</strong>?";

                    $.SmartMessageBox({
                        title: strConfirm,
                        content: msgContent,
                        //buttons: '[No][Yes]'
                        buttons: '[' + strNo + '][' + strYes + ']'


                    },

                        function (ButtonPressed) {
                        if (ButtonPressed === strYes) {
                            disableConfirmationButtons();
                            // $scope.startSpinner();
                            $rootScope.startSpinner();
                            $state.go('logout');
                        }
                        if (ButtonPressed === strNo) {
                            disableConfirmationButtons();
                            //TODO: Some message to show the user.
                        }

                    });
                });
            }
        }
    });
});
