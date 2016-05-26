'use strict';

var journalController = angular.module('journalController', []);

journalController.controller('JournalCtrl', function ($scope, Entry, $location) {
    $scope.title="Journal";
    $scope.entry = new Entry();
    
    $scope.currDate = new Date();
    
    $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    $scope.daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    $scope.entryReminder = "Please fill out at least one thought!";
    
    $scope.moodReminder = "Please select a mood!";
    
    $scope.entryReminderDisplay = false;
    $scope.moodReminderDisplay = false;
    
    $scope.tags = [];
    $scope.menuItems = ['great','good','okay','poor','awful'];
    $scope.emotion = '';
    
    $scope.setActive = function(menuItem) {
        $scope.emotion = menuItem;
    }
    
    $scope.createEntry = function(entry) {
        $scope.entryReminderDisplay = false;
        $scope.moodReminderDisplay = false;
        console.log(checkValidity());
        if (checkValidity()) {
            Entry.save(entry, function(response) {
                console.log(response);
                if (response.entry) {
                    $location.path('/board');
                }
            });
        } else {
            if (!$scope.entry.entryThought1) {
                $location.path('/entryone');
                $scope.entryReminderDisplay = true;
            }
        }
    }
    
    function checkValidity() {
        return ($scope.entry.entryThought1 && $scope.entry.entryMood);
    }
});

