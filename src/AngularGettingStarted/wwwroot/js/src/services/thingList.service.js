(function () {
    'use strict';
    // Register our service on our module.
    angular.module('app').factory('thingListService', thingListService);

    // Inject the dependencies - we'll use the angular-provided $http 
    // service to interact with the server. 
    thingListService.$inject = ['$http']

    // Define our service - note that Angular will ensure that whatever
    // we've specified in our $inject clause above will get injected as
    // parameters here, allowing us to use that within our service.
    function thingListService($http) {
        // Define the public interface for the service here
        var service = {
            getThings: getThings,
            addThing: addThing
        };

        // Return the interface.
        return service;

        // Define the functions referenced by the service interface
        // above here:
        function getThings() {
            return $http.get("/api/thinglist").then(function (response) {
                return response.data;
            });
        }

        function addThing(thing) {
            return $http.post("/api/thinglist", { "Value": thing }).then(function (response) {
                return response.data;
            });
        }
}
})();