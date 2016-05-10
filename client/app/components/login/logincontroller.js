'use strict';

var loginController = angular.module('loginController', []);

loginController.controller('LoginCtrl', function ($scope, Login, $location) {
  $scope.user = new Login();
  
  $scope.login = function(user) {
    Login.save(user, function(response) {
      console.log(response);
      if (response.success) {
        $location.path('/journal')
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