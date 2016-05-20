'use strict';

var loginController = angular.module('loginController', []);

loginController.controller('LoginCtrl', function ($scope, Login, Entry, $location) {
  $scope.user = new Login();
  
  $scope.serverMessage = 'HELLO';
  
  $scope.login = function(user) {
    Login.save(user, function(response) {
      console.log(response);
      if (response.success) {
        $scope.serverMessage = "";
        Entry.get(function(data) { 
            console.log(data);
            if (data.entries) {
               var latestEntry = data.entries[0];
               console.log(latestEntry);
               console.log(new Date(latestEntry.entryTime).getDate());
               console.log(new Date(latestEntry.entryTime).getDate() == new Date().getDate());
               if (new Date(latestEntry.entryTime).getDate() == new Date().getDate()) {
                  console.log('going to board');
                  $location.path('/board');
               } else {
                 console.log('going to journal');
                  $location.path('/journal');
               }
             }
         });  
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