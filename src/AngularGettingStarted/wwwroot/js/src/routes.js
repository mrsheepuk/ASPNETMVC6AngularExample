(function () {
    'use strict';

    angular.module('app').config(configureRoutes);

    configureRoutes.$inject =
      ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function configureRoutes($stateProvider, $urlRouterProvider,
      $locationProvider) {

        // Routes go here
        $stateProvider.state('home', {
            url: '/',                             // URL to match
            templateUrl: 'js/src/home/home.html', // Template to use
            controller: 'Home as home'            // Controller ("Home") and its alias for referencing it inside the template ("home") 
        });

        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);
    }

})();