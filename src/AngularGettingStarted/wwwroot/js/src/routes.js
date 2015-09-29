(function () {
    'use strict';

    angular.module('app').config(configureRoutes);

    configureRoutes.$inject =
      ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function configureRoutes($stateProvider, $urlRouterProvider,
      $locationProvider) {

        // Routes go here

        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);
    }

})();