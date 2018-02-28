'use strict';
var app = angular.module('chat_bot', [
     'ui.router'         
    ]);


app.config(function($stateProvider, $urlRouterProvider, $httpProvider ) {
   
    $stateProvider
       
      .state('login', {
        url: '/login',
        controller: 'loginCtrl',
        templateUrl: 'template/partial/login.html'
      })


    $urlRouterProvider.otherwise('/login');

   // console.log('enter in appp');
})



