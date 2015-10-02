(function () {
    'use strict';
    // Registers this controller with the Angular module "app"
    angular.module('app').controller('Home', Home);

    // Inject the services and data this controller depends on - this is how we wire 
    // services to controllers.
    Home.$inject = ["thingListService"];

    // Define the controller - the parameters passed into this function will be 
    // auto-provided by angular based on the $inject line above.
    function Home(thingListService) {
        var vm = this;
        // "Public" properties
        vm.list = [];
        vm.newItem = "";

        // "Public" functions
        vm.addItem = addItem;
        vm.removeItem = removeItem;

        // "Private" properties

        // Initialisation
        refreshList();

        // "Public" function definitions
        function addItem() {
            // We don't want to add empty entries - we will change this to show an
            // error later.
            if (vm.newItem.length == 0) return;

            // If we're still here, add whatever to the list, then clear the newItem
            // property.
            vm.list.push(vm.newItem);
            vm.newItem = "";
        }

        function removeItem(itemToRemove) {
            // Check where the item to remove is located in the array.
            var ind = vm.list.indexOf(itemToRemove);
            // If we have found the item to remove, splice it out.
            if (ind > -1) vm.list.splice(ind, 1);
        }

        // "Private" function definitions
        function refreshList() {
            return thingListService.getThings().then(function (things) {
                vm.list.length = 0;
                // Add each thing to our local array.
                for (var x = 0; x < things.length; x++)
                    vm.list.push(things[x]);;
            });
        }

        // Event Subscriptions
    }
})();