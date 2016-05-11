var entryService = angular.module('entryService', ['ngResource']);

entryService.factory('Entry', ['$resource',
    function($resource) {
        return $resource('/api/entries');
    }]);