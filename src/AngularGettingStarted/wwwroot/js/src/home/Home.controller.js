(function () {
    'use strict';
    // Registers this controller with the Angular module "app"
    angular.module('app').controller('Home', Home);

    // Inject the services and data this controller depends on - this is how we wire 
    // services to controllers.
    Home.$inject = ["thingListService", "thingList"];

    // Define the controller - the parameters passed into this function will be 
    // auto-provided by angular based on the $inject line above.
    function Home(thingListService, thingList) {
        var vm = this;
        // "Public" properties
        vm.list = thingList;
        vm.newItem = "";
        vm.adding = false;
        vm.removing = false;

        // "Public" functions
        vm.addItem = addItem;
        vm.removeItem = removeItem;

        // "Private" properties

        // Initialisation
        //refreshList();

        // "Public" function definitions
        function addItem() {
            // We don't want to add empty entries - we will change this to show an
            // error later.
            if (vm.newItem.length == 0) return;

            vm.adding = true;
            thingListService.addThing(vm.newItem).then(function (response) {
                // Thing added, clear the textbox and reload the list.
                vm.newItem = "";
                return refreshList();
            }).then(function () {
                // Finished refreshing, so finished adding.
                vm.adding = false;
            });
        }

        function removeItem(itemToRemove) {
            vm.removing = true;
            thingListService.removeThing(itemToRemove).then(function () {
                return refreshList();
            }).then(function () {
                vm.removing = false;
            });
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