'use strict';

var cardController = angular.module('journalBoardController', []);

cardController.controller('CardCtrl', function($mdMedia, $scope, Entry, $location) {
  $scope.$watch(function() { return $mdMedia('xs'); }, function() {
    if($mdMedia('xs')) {
      $location.path('/list');
    } else {
      $location.path('/board'); 
    }
  });
  
  $scope.hideLatest = false;
  
  $scope.hideEntry = function() {
    $scope.hideLatest = !$scope.hideLatest;
  }
  
  
 $scope.getEmoticonPath = function(emotion) {
    return getEmoticon(emotion);
 }
  
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  $scope.daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  $scope.currDate = new Date();
  
  $scope.currMonth = months[$scope.currDate.getMonth()];
  
  $scope.currMonthEntries = [];
  
  $scope.latestEntry;
  
  $scope.userEntries = Entry.get(function(data) { 
    console.log(data);
    
    if (data.entries) {
      var allEntries = data.entries;
      
      $scope.latestEntry = allEntries[0];
        
      for (var i = 0; i < allEntries.length; i++) {
        var sqlDate = allEntries[i].entryTime;
        
        var d = new Date(sqlDate);
        
        allEntries[i].entryTime = d;       

        if (d.getMonth() === $scope.currDate.getMonth() && d.getFullYear() === $scope.currDate.getFullYear()) {
          $scope.currMonthEntries.push(allEntries[i]);
        }
      }
    }
    
  });
  
  
  
});
  