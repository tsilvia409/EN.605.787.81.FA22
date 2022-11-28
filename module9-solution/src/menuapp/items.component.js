(function () {
    'use strict';
    // Item component with direct binding to itemList from controller
    angular.module('MenuApp')
    .component('items', {
      templateUrl: 'src/menuapp/templates/items.template.html',
      bindings: {
        itemList: '<'
      }
    });
    
})();