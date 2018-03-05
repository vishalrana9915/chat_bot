'use strict';
var app = angular.module('chat_bot', [
     'ui.router'         
    ]);


app.config(function($stateProvider, $urlRouterProvider, $httpProvider ) {
   
    $stateProvider
       
      .state('signup', {
        url: '/signup',
        controller: 'signupCtrl',
        templateUrl: 'template/partial/signup.html',
        resolve:{
            socket: function(){
              
            }
        }
      })

      .state('login', {
        url: '/login',
        controller: 'loginCtrl',
        templateUrl: 'template/partial/login.html',
        resolve:{
          
        }
      });

    $urlRouterProvider.otherwise('/signup');

   // console.log('enter in appp');
})



