(function () {
    'use strict';
    
    angular.module('data')
    .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http', 'ApiBasePath'];
    function MenuDataService($http, ApiBasePath) {
        var service = this;

        // Get list of menu categories
        service.getAllCategories = function() {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")
              })
              
              .catch(function (errorResponse) {
                console.log(errorResponse.message);
              });
        };

       // Get list of menu items in category based on catShortName
       service.getItemsForCategory = function(categoryShortName) {
        return $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items/" + categoryShortName + ".json")
          })
          
          .catch(function (errorResponse) {
            console.log(errorResponse.message);
          });
        };
    }

})();