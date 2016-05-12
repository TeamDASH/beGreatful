'use strict';

var journalController = angular.module('journalController', []);

journalController.controller('JournalCtrl', function ($scope, Entry, $location) {
    $scope.entry = new Entry();
    
    $scope.entry.entryMood = "feliz";
    
    $scope.entry.moreThoughts = "no more thoughts";
    
    $scope.createEntry = function(entry) {
        Entry.save(entry, function(response) {
            console.log(response);
            if (response.success) {
                $location.path('/journalboard')
            }
        });
    }
});