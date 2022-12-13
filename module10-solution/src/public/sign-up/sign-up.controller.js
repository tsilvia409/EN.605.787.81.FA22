(function () {
    "use strict";
    
    angular.module('public')
    .controller('SignUpController', SignUpController);
    
    SignUpController.$inject = ['MenuService', 'MyInfoService'];
    function SignUpController(MenuService, MyInfoService) {
        var reg = this;
        reg.user = {};
        reg.error = null;
        reg.submit = function () {
            // Get split short name for use in REST call and in retrieving favorite dish image
            var dishShortName = MenuService.parseShortName(reg.user.dish);

            // Get dish details as promse and then use response to call setRegInfo
            MenuService.getDishDetails(dishShortName).then(function(response){
                reg.completed = true;
                var dishDetails = response.data;

                // Clear all user details
                var userDetails = {};
                userDetails.fName = reg.user.fName;
                userDetails.lName = reg.user.lName;
                userDetails.email = reg.user.email;
                userDetails.phone = reg.user.phone;
                userDetails.dishNum = reg.user.dish;
                userDetails.dishCategory = dishShortName.category;

                // Store result of setting registration info for error handling if there was an issue
                var setRegSuccess = MyInfoService.setRegInfo(userDetails, dishDetails);
                if (!setRegSuccess) {
                    reg.error = true;
                }
            });
        };
    }
     
    })();