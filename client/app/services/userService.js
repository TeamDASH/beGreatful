var userService = angular.module('userService', ['ngResource']);

userService.factory('User', ['$resource', 
    function($resource) {
        return $resource('/api/users', {}, {
        });
    }]);
    
userService.factory('Login', ['$resource',
    function($resource) {
        return $resource('/api/login')
    }]);
