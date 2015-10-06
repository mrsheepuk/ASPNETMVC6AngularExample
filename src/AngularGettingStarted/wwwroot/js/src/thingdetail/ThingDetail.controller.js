(function () {
    'use strict';
    angular.module('app').controller('ThingDetail', ThingDetail);

    ThingDetail.$inject = ["thing"];

    function ThingDetail(thing) {
        var vm = this;
        // "Public" properties
        vm.thing = thing;

        // "Public" functions

        // "Private" properties

        // Initialisation

        // "Public" function definitions

        // "Private" function definitions

        // Event Subscriptions
    }
})();