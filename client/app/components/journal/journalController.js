'use strict';

var journalController = angular.module('journalController', []);

journalController.controller('JournalCtrl', function ($scope, Entry, $location) {
    $scope.entry = new Entry();
    
    $scope.entry.entryMood = "feliz";
    
    $scope.entry.moreThoughts = "no more thoughts";
    $scope.tags=['Apple', 'Banana', 'Orange'];
    $scope.menuItems = ['great','good','okay','poor','awful'];
    $scope.emotion = $scope.menuItems[0];
    
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

/*function DemoCtrl ($timeout, $q) {
    var self = this;

    //self.readonly = false;

    // Lists of fruit names and Vegetable objects
    self.fruitNames = ['Apple', 'Banana', 'Orange'];
    
    
  }*/