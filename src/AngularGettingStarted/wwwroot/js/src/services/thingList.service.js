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
            addThing: addThing,
            getThing: getThing,
            updateThing: updateThing,
            removeThing: removeThing
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
            return $http.post("/api/thinglist", { "Value": thing }).then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    if (response.status === 409) {
                        throw new Error("AlreadyExists");
                    } else {
                        // Re-throw for default handling.
                        throw errResponse;
                    }
                }
            );
        }

        function getThing(thing) {
            return $http.get("/api/thinglist/" + thing).then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    // If this was a not found, simply return null.
                    if (response.status === 404) {
                        return null;
                    } else {
                        // Re-throw for default handling.
                        throw errResponse;
                    }
                }
            );
        }

        function updateThing(thing, thingWithDetails) {
            return $http.put("/api/thinglist" + thing, thingWithDetails).then(
                function (response) {
                    return response.data;
                },
                function (errResponse) {
                    // If this was a not found, throw a specific error.
                    if (response.status === 404) {
                        throw new Error("DoesntExist");
                    } else {
                        // Re-throw for default handling.
                        throw errResponse;
                    }
                }
            );
        }

        function removeThing(thing) {
            return $http.delete("/api/thinglist/" + thing).then(
                function (response) {
                    return response.data;
                }, 
                function (errReponse) {
                    // If this was a not found, throw a specific error.
                    if (response.status === 404) {
                        throw new Error("DoesntExist");
                    } else {
                        // Re-throw for default handling.
                        throw errResponse;
                    }
                }
            );
        }
}
})();