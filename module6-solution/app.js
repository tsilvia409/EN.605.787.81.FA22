(function () {
    'use strict';
    
    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);
    
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        // initialize scope variables which will be set below
      $scope.lunchListString = "";
      $scope.messagePlaceholder = "";
      $scope.messageType = ""
    
      $scope.checkLunchList = function () {
        // Create array out of lunchListString from html
        var lunchList = $scope.lunchListString.split(',');
        // Create filtered array from lunchLust
        var filteredLunchList = getFilteredList(lunchList);
        // Set messagePlaceholder as return value of checkLunchListLength function
        $scope.messagePlaceholder = checkLunchListLength(filteredLunchList);
      };

      // check if lunch list is empty, just right, or too much
      function checkLunchListLength(lunchList) {
        if (lunchList.length > 0) {
            $scope.messageType = "validLength"
            if (lunchList.length >= 1 && lunchList.length <= 3) {
                return "Enjoy!";
            } else {
                return "Too much!";
            }
        } else {
            $scope.messageType = "invalidLength"
            return "Please enter data first";
        }
      }

      // Get list with empty strings removed - following filter 
      // documentation from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
      function getFilteredList(lunchList) {
        return lunchList.filter(getNotEmpty);
      }

      // Helper function to check if element is not empty
      function getNotEmpty(arrayElement) {
        return arrayElement.trim().length > 0;
      }
    
    }
    })();