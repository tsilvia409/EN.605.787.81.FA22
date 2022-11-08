(function () {
    'use strict';
    
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems',FoundItemsDirective);
    

    function FoundItemsDirective() {
      var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
          found: '<',
          error: '@error',
          onRemove: '&'
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'items',
        bindToController: true
      };
    
      return ddo;
    }

    function FoundItemsDirectiveController() {
      var items = this;
      
      // directive controller function to handle checking for any kind of error
      items.noErrors = function () {
        if (items.found && items.found.length > 0) {
          return true;
        } else {
          return false;
        }
      };
    }

    // Inject MenuSearchService into NarrowItDownController to provide search functionality of descriptions
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
      var menu = this;

      menu.matchMenuItems = function(searchTerm) {
        console.log(menu.error);
        // call MenuSearchService's getMatachedMenuItems and handle response
        var matchResult = MenuSearchService.getMatchedMenuItems(searchTerm).then(function(data) {
          // reset scope level variables
          menu.found = [];
          menu.error = null;
          if (searchTerm && data.length > 0) {
            menu.found= data;
          } else {
            console.log("ENTERS");
            menu.error = 'Nothing found';
          }
        // catch the promise's error if error returned by endpoint
        }).catch(function() {
          menu.error = 'Unable to retrive menu items due to an issue reaching menu endpoint.';
        });

        // remove item from found when menu.removeItem is called
        menu.removeItem = function(itemIndex) {
          menu.found.splice(itemIndex, 1);
          if (menu.found.length <= 0) {
            menu.error = 'Nothing found';
          } 
        }
      }
  }
    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {
      var service = this;

      // retrieve array of all menu items whose descriptions match the searchTerm passed into service
      service.getMatchedMenuItems = function (searchTerm) {
        return $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items.json")
        }).then(function (result) {
          // declare empty array for found items
          var foundItems = [];
          for (var item of result.data.menu_items) {
            // process result and only keep items that match
            // NOTE: this IS case sensitive since no requirements were made on handling cases
            if (item.description.includes(searchTerm)) {
              foundItems.push(item);
            };
          }
          // return processed items
          return foundItems;

        })
        .catch(function (errorResponse) {
          console.log(errorResponse.message);
        });
      };
    }
    
  })();