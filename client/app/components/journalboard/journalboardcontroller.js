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
  
 $scope.getEmoticonPath = function(emotion) {
    return getEmoticon(emotion);
 }
  
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  $scope.daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  $scope.currDate = new Date();
  
  $scope.currMonth = months[$scope.currDate.getMonth()];
  
  $scope.currMonthEntries = [];
  
  $scope.userEntries = Entry.get(function(data) {
    console.log(data);
    console.log(data.entries.length);
    
    var allEntries = data.entries;
    
    for (var i = 0; i < allEntries.length; i++) {
      var sqlDate = allEntries[i].entryTime;
      console.log(sqlDate);
      
      var d = new Date(sqlDate);
      
      console.log(d);
      
      allEntries[i].entryTime = d;
      
      console.log(allEntries[i].entryTime);

      if (d.getMonth() === $scope.currDate.getMonth() && d.getFullYear() === $scope.currDate.getFullYear()) {
        console.log('pushing to currMonthEntries');
        $scope.currMonthEntries.push(allEntries[i]);
      }
    }
  });
  
  
  
});
  