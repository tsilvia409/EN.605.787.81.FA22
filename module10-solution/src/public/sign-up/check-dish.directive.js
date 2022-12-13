(function () {
    "use strict";
    
    angular.module('public')
    .directive('checkDish', checkDishFunc);

    // Create async validator attribute directive for checking if short name is valid
    checkDishFunc.$inject = ['MenuService', '$q'];
    function checkDishFunc(MenuService, $q) {
        return {
            // Based on documentation from https://docs.angularjs.org/guide/forms
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                
                ctrl.$asyncValidators.invalidShortName =  function(viewValue) {
                    // If short name is of an invalid format, automatically reject
                    if (!MenuService.parseShortName(viewValue)) {
                        return $q.reject();
                    } else {
                    // Else return promise from call to getDishDetails
                        var shortName = MenuService.parseShortName(viewValue);
                        return MenuService.getDishDetails(shortName).then(function (response){
                            if (response.data) {
                                return response.data
                            } else {
                                return $q.reject();
                            }
                        })
                    }
                }
                console.log(ctrl);
            }


        }
    }
})();