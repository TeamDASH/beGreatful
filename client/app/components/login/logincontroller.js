'use strict';

var loginController = angular.module('loginController', []);

loginController.controller('LoginCtrl', function ($scope, Login, $location) {
  $scope.user = new Login();
  
  $scope.serverMessage = 'HELLO';
  
  $scope.login = function(user) {
    Login.save(user, function(response) {
      console.log(response);
      if (response.success) {
        $scope.serverMessage = "";
        $scope.formLogin.$setValidity('specificError', true);
        $location.path('/journal')
      } else {
        $scope.serverMessage = response.error;
        $scope.formLogin.$setValidity('specificError', false);
        console.log($scope.formLogin.$valid);
        console.log($scope.serverMessage);
      }
    });
  };
  
  $scope.isLoggedIn = function() {
    Login.get({}, function(response) {
      console.log(response);
      if (response.success) {
        return true;
      }
      return false;
    });
  }
});