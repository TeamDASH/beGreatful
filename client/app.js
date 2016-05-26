'use strict';

var beGreatfulApp = angular.module('beGreatfulApp', ['ngMaterial', 'ngMessages', 'ngAnimate','angular-preload-image','loginController', 'accountController', 'journalController', 'journalBoardController', 'navController', 'ui.router', 'userService', 'entryService', 'availabilityValidator']);

beGreatfulApp.config(function($stateProvider, $urlRouterProvider) {
 
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/app/components/login/login.html',
            controller: 'LoginCtrl',
            authenticate: false
        })
        .state('createaccount', {
            url: '/signup',
            templateUrl: '/app/components/createaccount/createaccount.html',
            controller: 'AccountCtrl',
            authenticate: false
            
        })
        .state('journal', {
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
            controller: 'JournalCtrl',
            authenticate: true
        })
        .state('journal.entryone', {
            url: '/entryone',
            templateUrl: 'app/components/journal/journal-1.html',
            authenticate: true           
        })    
        .state('journal.entrytwo', {
            url: '/entrytwo',
            templateUrl: '/app/components/journal/journal-2.html',
            authenticate: true          
        })
        .state('journal.entrythree', {
            url: '/entrythree',
            templateUrl: '/app/components/journal/journal-3.html',
            authenticate: true          
        })
        .state('journal.thoughts', {
            url: '/morethoughts',
            templateUrl: '/app/components/journal/journal-thoughts.html',
            authenticate: true          
        })
        .state('journal.check', {
            url: '/checkin',
            templateUrl: '/app/components/journal/journal-check.html',
            authenticate: true         
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
            authenticate: true
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
            authenticate: true
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
        })
        .state('community', {
            url: '/community',
            views: {
                "": {
                    templateUrl: 'app/components/community/community.html'
                },
                "sidebar": {
                    templateUrl: "app/components/sidenav/nav.html"
                },
                "topbar": {
                    templateUrl: "app/components/sidenav/topnav.html"
                }
            },
            authenticate: true
        })
        .state('progress', {
            url: '/progress',
            views: {
                "": {
                    templateUrl: 'app/components/progress/progress.html'
                },
                "sidebar": {
                    templateUrl: "app/components/sidenav/nav.html"
                },
                "topbar": {
                    templateUrl: "app/components/sidenav/topnav.html"
                }
            },
            authenticate: true
        })
        .state('account', {
            url: '/me',
            views: {
                "": {
                    templateUrl: 'app/components/account/account.html'
                },
                "sidebar": {
                    templateUrl: "app/components/sidenav/nav.html"
                },
                "topbar": {
                    templateUrl: "app/components/sidenav/topnav.html"
                }
            },
            authenticate: true
        });
      $urlRouterProvider.otherwise('/entryone');
   
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
    });
});




