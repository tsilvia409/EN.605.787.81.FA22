(function () {
    'use strict';
    
    angular.module('MenuApp')
    .controller('ItemsController', ItemsController);
    
    // Inject retrieved menu item data from resolve in routes
    ItemsController.$inject = ['items'];
    function ItemsController(items) {
      var itemDetail = this;
      // Set itemData as the data from the resolve
      itemDetail.itemData = items;
      console.log(itemDetail.itemData);
    }
    
    })();