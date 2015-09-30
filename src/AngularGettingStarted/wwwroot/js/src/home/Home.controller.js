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

        // "Public" functions

        // "Private" properties

        // Initialisation

        // "Public" function definitions

        // "Private" function definitions

        // Event Subscriptions
    }
})();