(function () {
    "use strict";
    
    angular.module('common')
    .service('SignUpService', SignUpService);
    
    
    SignUpService.$inject = ['$http', 'ApiPath'];
    function SignUpService($http, ApiPath) {
      var service = this;
    
      service.getCategories = function () {
        return $http.get(ApiPath + '/categories.json').then(function (response) {
          return response.data;
        });
      };
    
    
      service.getMenuItems = function (category) {
        var config = {};
        if (category) {
          config.params = {'category': category};
        }
    
        return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
          return response.data;
        });
      };
    
    }
    
    
    
    })();
    