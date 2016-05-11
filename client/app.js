'use strict';

var beGreatfulApp = angular.module('beGreatfulApp', ['ngMaterial', 'loginController', 'accountController', 'journalController', 'journalBoardController', 'navController', 'ui.router', 'userService', 'entryService']);

beGreatfulApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('journal');
    
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/app/components/login/login.html',
            controller: 'LoginCtrl'
        })
        .state('createaccount', {
            url: '/signup',
            templateUrl: '/app/components/createaccount/createaccount.html',
            controller: 'AccountCtrl',
            authenticate: false
            
        })
        .state('journal', {
            url: '/journal',
            templateUrl: 'app/components/journal/journal.html',
            authenticate: true
        });
        
});

beGreatfulApp.run(
    function($rootScope, $state, Login) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
        if (toState.authenticate) {
            Login.get({}, function(isLoggedIn) {
                if (isLoggedIn.error) {
                    $state.transitionTo('login');
                    event.preventDefault();
                }
            })
        }
        // if (toState.authenticate && !Auth) {
        //     $state.transitionTo('login');
        //     event.preventDefault();
        // }
    });
});