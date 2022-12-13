(function () {
    "use strict";
    
    angular.module('common')
    .service('MyInfoService', MyInfoService);
    
    
    function MyInfoService() {
        var service = this;

        service.setRegInfo = function (userDetails, dishDetails) {
          if (dishDetails) {
            service.user = {};
            service.user.name = userDetails.fName + ' ' + userDetails.lName;
            service.user.email = userDetails.email;
            service.user.phone = userDetails.phone;
            service.user.dishNum = userDetails.dishNum;
            service.user.dishCat = userDetails.dishCategory[0];
            service.user.dishShortName = dishDetails.short_name;
            service.user.dishTitle = dishDetails.name;
            service.user.dishDescription = dishDetails.description;
            return true;
          } else {
            return false;
          }
        };

        service.getRegInfo = function () {
           return service.user;
        };
      };

    
    })();
    