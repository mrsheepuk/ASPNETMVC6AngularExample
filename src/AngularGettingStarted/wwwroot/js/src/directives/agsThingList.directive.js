(function () {
    'use strict';
    // Registers this directive with the Angular module "app"
    angular.module('app').directive('agsThingList', agsThingList);

    function agsThingList() {
        var directive = {
            link: link,
            templateUrl: "",
            restrict: "EA",
            controller: agsThingListController,
            controllerAs: "agsThingList"
        }

        function link(scope, el, attr, ctrl) {

        }
    }

    // Inject the services and data this controller depends on - this is how we wire 
    // services to controllers.
    agsThingListController.$inject = [];

    function agsThingListController() {
        var vm = this;
        // "Public" properties

        // "Public" functions

        // "Private" properties

        // Initialisation

        // "Public" function definitions

        // "Private" function definitions

        // Event Subscriptions
    }
})();