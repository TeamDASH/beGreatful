'use strict';

var accountController = angular.module('accountController', []);

accountController.controller('AccountCtrl', function ($scope, User, $location) {
  
  $scope.user = new User();
  
  // check to see if email is already in use after user clicks off of the email field

  // send new account information to server 
  // requires email, firstName, lastName, password1 and password2 as POST parameters
  $scope.createAccount = function(user) {
    User.save(user, function(response) {
      console.log(response);
      if (response.success) {
        console.log('should redirect');
        $location.path('/login');
      }
    });
  }
});