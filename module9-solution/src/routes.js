(function () {
    'use strict';
    
    angular.module('MenuApp')
    .config(RoutesConfig);
    
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
    
      // Redirect to home page if no other URL matches
      $urlRouterProvider.otherwise('/');
    
      // *** Set up UI states ***
      $stateProvider
    
      // Home page
      .state('home', {
        url: '/',
        templateUrl: 'src/menuapp/templates/home.template.html'
      })
    
      // Categories page
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/menuapp/templates/main-categories.template.html',
        controller: 'CategoriesController as categories',
        resolve: {
            categoryData: ['MenuDataService', function(MenuDataService)
            {
                return MenuDataService.getAllCategories()
                    .then(function (categories) {
                        return categories.data;
                    });
            }]
        }
      })

      // Items page
      .state('items', {
        url: '/items/{catShortName}',
        templateUrl: 'src/menuapp/templates/main-items.template.html',
        controller: 'ItemsController as items',
        resolve: {
            items: ['$stateParams','MenuDataService', 
            function($stateParams, MenuDataService) {
                return MenuDataService.getItemsForCategory($stateParams.catShortName)
                    .then(function (items) {
                        return items.data.menu_items;
                    });
            }]
        }
      });
    }
    
    })();
    