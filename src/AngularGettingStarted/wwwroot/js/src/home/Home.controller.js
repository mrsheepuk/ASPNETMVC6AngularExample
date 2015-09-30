(function () {
    'use strict';
    // Registers this controller with the Angular module "app"
    angular.module('app').controller('Home', Home);

    // Inject the services and data this controller depends on - this is how we wire 
    // services to controllers.
    Home.$inject = [];

    // Define the controller - the parameters passed into this function will be 
    // auto-provided by angular based on the $inject line above.
    function Home() {
        var vm = this;
        // "Public" properties
        vm.list = ["Example String 1", "A second Thing!"];

        // "Public" functions
        vm.addItem = addItem;

        // "Private" properties

        // Initialisation

        // "Public" function definitions
        function addItem(itemToAdd) {
            // Add the length of the array to the end of the string - Angular de-duplicates the
            // array when displaying so we'll only see one entry if we keep adding the same value.
            vm.list.push(itemToAdd + (vm.list.length + 1));
        }

        // "Private" function definitions

        // Event Subscriptions
    }
})();