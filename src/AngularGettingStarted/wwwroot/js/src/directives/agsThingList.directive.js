(function () {
    'use strict';
    // Registers this directive with the Angular module "app"
    angular.module('app').directive('agsThingList', agsThingList);

    function agsThingList() {
        var directive = {
            // The link function is where we do any manipulation of the
            // HTML:
            link: link,
            // Define the template:
            templateUrl: "js/src/directives/agsThingList.html",
            // Define the inputs/outputs of this directive:
            scope: {
                list: "=things",
                removing: "=removing",
                removeItem: "&onRemoveItem"
            },
            // Restrict where this directive can be used - E=element, 
            // A=attribute, EA=either.
            restrict: "E",
            // Define a controller for this directive.
            controller: agsThingListController,
            // Define the alias for the controller for use in the 
            // template
            controllerAs: "agsThingList",
            // Ensure our input/output scope above is tied to our 
            // controller below.
            bindToController: true
        }

        return directive;

        function link(scope, el, attr, ctrl) {
        }
    }

    // Inject any services and data this controller depends on.
    agsThingListController.$inject = [];

    function agsThingListController() {
        var vm = this;
        // "Public" properties
        // Added by directive scope:
        // vm.list
        // vm.removing

        // "Public" functions

        // "Private" properties

        // Initialisation

        // "Public" function definitions

        // "Private" function definitions

        // Event Subscriptions
    }
})();