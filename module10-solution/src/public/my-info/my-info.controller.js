(function () {
    "use strict";
    
    angular.module('public')
    .controller('MyInfoController', MyInfoController);
    
    MyInfoController.$inject = ['MyInfoService'];
    function MyInfoController(MyInfoService) {
        var infoCtrl = this;

        infoCtrl.details = MyInfoService.getRegInfo();

    }
    
})();