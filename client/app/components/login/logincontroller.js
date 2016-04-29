'use strict';

var loginController = angular.module('loginController', []);

loginController.controller('LoginCtrl', function ($scope, Login, $location) {
  $scope.text = 'woooo';
  
  $scope.user = new Login();
  
  $scope.login = function(user) {
    Login.save(user, function(response) {
      if (response.success) {
        $location.path('/journal')
      } 
    });
  };
  
});