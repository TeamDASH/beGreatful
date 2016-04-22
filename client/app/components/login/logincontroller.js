'use strict';

var loginController = angular.module('loginController', []);

loginCtrl.controller('LoginCtrl', ['$scope', 
    function($scope) {
        $scope.test = 'hello';
    }
 ])