'use strict';

var cardController = angular.module('journalBoardController', []);

cardController.controller('CardCtrl', function($mdMedia, $scope, Entry, $location) {
  $scope.$watch(function() { return $mdMedia('xs'); }, function() {
    if($mdMedia('xs')) {
      $location.path('/list');
    } else {
      $location.path('/board'); 
    }
  });
  
  $scope.userEntries = Entry.get(function(data) {
    console.log(data);
  });
  $scope.users = ['Fabio', 'Leonardo', 'Thomas', 'Gabriele', 'Fabrizio', 'John', 'Luis', 'Kate', 'Max'];
});
  