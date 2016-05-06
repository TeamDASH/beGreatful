'use strict';

var beGreatfulApp = angular.module('beGreatfulApp', ['ngRoute','ngMaterial', 'loginController', 'accountController', 'entryController', 'navController','cardController', 'userService']);


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
        when('/nav', {
            templateUrl: 'app/components/SideNav/nav.html',
            controller: 'NavCtrl'
        }).
        when('/card', {
            templateUrl: 'app/components/journalcard/journalcard.html',
            controller: 'CardCtrl'
        }).
        otherwise({
            redirectTo: '/login'
        });   
}]);

beGreatfulApp.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    
});