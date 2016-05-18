'use strict';

var journalController = angular.module('journalController', []);

journalController.controller('JournalCtrl', function ($scope, Entry, $location) {
    $scope.entry = new Entry();
    
    $scope.entry.entryMood = '';
    
    $scope.entry.moreThoughts = "no more thoughts";
    $scope.tags=['Family', 'Nature', 'Friends'];
    $scope.menuItems = ['great','good','okay','poor','awful'];
    $scope.emotion = '';
    
    $scope.setActive = function(menuItem) {
        $scope.emotion = menuItem;
    }
    
    $scope.createEntry = function(entry) {
        console.log(entry);
        Entry.save(entry, function(response) {
            console.log(response);
            if (response.success) {
                $location.path('/journalboard')
            }
        });
    }
});

