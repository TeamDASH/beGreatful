'use strict';

var cardController = angular.module('cardController', []);

cardController.controller('CardCtrl', function ($scope) {
    $scope.users = ['Fabio', 'Leonardo', 'Thomas', 'Gabriele', 'Fabrizio', 'John', 'Luis', 'Kate', 'Max'];
});