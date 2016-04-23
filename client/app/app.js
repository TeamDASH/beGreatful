'use strict';

var beGreatfulApp = angular.module('beGreatfulApp', ['ngRoute','loginController']);


beGreatfulApp.config(['$routeProvider', 
function($routeProvider) {
    $routeProvider. 
        when('/login', {
            templateUrl: 'app/components/login/login.html', 
            controller: 'LoginCtrl'
        }).
        otherwise({
            redirectTo: '/login'
        });   
}]);