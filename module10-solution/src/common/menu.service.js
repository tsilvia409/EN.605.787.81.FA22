(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(function (response) {
      return response.data;
    });
  };
  

  service.getDishDetails = function (splitShortName) {
    return $http.get(ApiPath + '/menu_items/' + splitShortName.category + '/menu_items/' + splitShortName.menuNumber + '.json').then(function (response) {
      return response;
    })
    .catch(function (err) {
      return Error("No such menu number exists")
    });
  };


  // Helper function to create a new object with parsed menu item short name
  service.parseShortName = function (shortName) {
    // Set all letters to uppercase to make input case insensitive
    shortName = shortName.toUpperCase();

    // Check if user formatting is correct
    if (shortName.match(/^[A-Z]+[1-9][0-9]*$/)) {
      var splitShortName = {};

      // Set category attribute as matched alphabetic characters
      splitShortName.category = shortName.match(/^[A-Z]+/);
      splitShortName.menuNumber = shortName.match(/[1-9][0-9]*$/) - 1;

      // Return split short name object
      return splitShortName;

    // Return null if invalid shortName format
    } else {
      return null;
    }
  };

}


})();
