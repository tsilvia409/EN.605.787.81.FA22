(function () {
    'use strict';
    
    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .filter('angs', AngularDollarsFilter)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);
    
    // Inject ShoppingListCheckOffService into ToBuyController for use of business logic across controllers
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
      var toBuy = this;

      toBuy.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

      toBuy.checkOff = function(itemIndex) {
        ShoppingListCheckOffService.moveToAlreadyBought(itemIndex);
      }
    }

    // Inject ShoppingListCheckOffService into ToBuyController for use of business logic across controllers
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var alreadyBought = this;

      alreadyBought.alreadyBoughtItems = ShoppingListCheckOffService.getAlreadyBoughtItems();
    }

    // Filter to return number in "angular dollars" format (three dollar signs)
    function AngularDollarsFilter() {
      return function (input) {
        // Concatenate desired currency with input and format with two decimal places
        input = "$$$" + Number(input).toFixed(2);
        return input;
      }
    }

    // Service to set initial shopping list array and share data between controllers
    function ShoppingListCheckOffService() {
      var service = this;
      
      // Set initial array of to buy items
      var initialToBuyList = [
        {
          name: "napkins",
          quantity: "100",
          pricePerItem: "2"
        },
        {
          name: "lemons",
          quantity: "5",
          pricePerItem: "10"
        },
        {
          name: "potatoes",
          quantity: "20",
          pricePerItem: "4"
        },
        {
          name: "coca-cola cans",
          quantity: "20",
          pricePerItem: "1"
        },
        {
          name: "bagels",
          quantity: "3",
          pricePerItem: "1.50"
        }
      ];

      // Set initial values for both arrays and empty check
      var toBuyItems = initialToBuyList;
      var alreadyBoughtItems = [];
      
      service.moveToAlreadyBought = function (itemIndex) {
        var item = toBuyItems[itemIndex];
        alreadyBoughtItems.push(item);
        toBuyItems.splice(itemIndex, 1);

      }


      // Getter functions to be used by controllers
      service.getToBuyItems = function () {
        return toBuyItems;
      };

      service.getAlreadyBoughtItems = function () {
        return alreadyBoughtItems;
      };

    }
    
  })();