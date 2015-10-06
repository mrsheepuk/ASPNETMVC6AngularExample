(function () {
    'use strict';
    angular.module('app').controller('ThingDetail', ThingDetail);

    ThingDetail.$inject = ["thing", "thingListService"];

    function ThingDetail(thing, thingListService) {
        var vm = this;
        // "Public" properties
        vm.thing = thing;
        vm.saving = false;
        vm.errMsg = null;

        // "Public" functions
        vm.save = save;

        // "Private" properties

        // Initialisation

        // "Public" function definitions
        function save() {
            vm.saving = true;
            thingListService.updateThing(vm.thing.Value, vm.thing).then(
                function (updatedThing) {
                    // In case the server has changed anything, 
                    // update our local thing (e.g. if we had an "updatedTime"
                    // property managed by the server).
                    vm.thing = updatedThing;
                    vm.saving = false;
                },
                // Catch any errors and display a message.
                function (err) {
                    vm.saving = false;
                    vm.errMsg = err.message;
                }
            );
        }

        // "Private" function definitions

        // Event Subscriptions
    }
})();