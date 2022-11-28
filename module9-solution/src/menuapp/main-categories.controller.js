(function () {
    'use strict';
    
    angular.module('MenuApp')
    .controller('CategoriesController', CategoriesController);
    
    // Inject retrieved category data from resolve in routes
    CategoriesController.$inject = ['categoryData'];
    function CategoriesController(categoryData) {
      var categories = this;
      // Set categoryData as the data from the resolve
      categories.categoryData = categoryData;
    }
    
    })();