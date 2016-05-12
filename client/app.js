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
            views: {
                "": {
                    templateUrl: 'app/components/journal/journal.html'
                },
                "sidebar": {
                    templateUrl: "app/components/sidenav/nav.html"
                },
                "topbar": {
                    templateUrl: "app/components/sidenav/topnav.html"
                }
            },
            authenticate: false
        })
        .state('board', {
            url: '/board',
            views: {
                "": {
                    templateUrl: 'app/components/journalboard/journalboard.html'
                },
                "sidebar": {
                    templateUrl: "app/components/sidenav/nav.html"
                },
                "topbar": {
                    templateUrl: "app/components/sidenav/topnav.html"
                }
            },
            templateUrl: 'app/components/journalboard/journalboard.html',
            controller: 'JournalCtrl',
            authenticate: false
        })
        .state('list', {
            url: '/list',
            views: {
                "": {
                    templateUrl: 'app/components/journalcard/journallist.html'
                },
                "sidebar": {
                    templateUrl: "app/components/sidenav/nav.html"
                },
                "topbar": {
                    templateUrl: "app/components/sidenav/topnav.html"
                }
            },
            templateUrl: 'app/components/journalcard/journallist.html',
            controller: 'CardCtrl',
            authenticate: false
        })
        .state('sidebar', {
            url: '/sidebar',
            templateUrl: 'app/components/sidenav/nav.html',
            controller: 'NavCtrl'
        })
        .state('topbar', {
            url: '/topbar',
            templateUrl: 'app/components/sidenav/topnav.html',
            controller: 'NavCtrl'
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