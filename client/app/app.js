'use strict';

var beGreatfulApp = angular.module('beGreatfulApp', ['ngRoute','loginController', 'accountController']);


beGreatfulApp.config(['$routeProvider', 
function($routeProvider) {
    $routeProvider. 
        when('/login', {
            templateUrl: 'app/components/login/login.html', 
            controller: 'LoginCtrl'
        }).        
        when('/createaccount', {
            templateUrl: 'app/components/createAccount/createaccount.html',
            controller: 'AccountCtrl'
        }).
        otherwise({
            redirectTo: '/login'
        });   
}]);