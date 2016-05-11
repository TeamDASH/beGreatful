'use strict';

var cardController = angular.module('journalBoardController', []);

cardController.controller('CardCtrl', function($mdMedia, $scope, $location) {
  $scope.$watch(function() { return $mdMedia('xs'); }, function() {
    if($mdMedia('xs')) {
    $location.path('/list');
    } else {
       $location.path('/card'); 
    }
  });
  $scope.users = ['Fabio', 'Leonardo', 'Thomas', 'Gabriele', 'Fabrizio', 'John', 'Luis', 'Kate', 'Max'];
});
  