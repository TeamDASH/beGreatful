'use strict';

var beGreatfulApp = angular.module('beGreatfulApp', ['ngRoute','ngMaterial', 'loginController', 'accountController', 'userService']);


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
        when('/journal', {
            templateUrl: 'app/components/journal/journal.html'
        }).
        otherwise({
            redirectTo: '/login'
        });   
}]);