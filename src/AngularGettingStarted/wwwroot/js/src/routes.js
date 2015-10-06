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
            controller: 'Home as home',           // Controller ("Home") and its alias for referencing it inside the template ("home") 
            resolve: {
                thingList: ["thingListService", function (thingListService) {
                    return thingListService.getThings();
                }]
            }
        }).state('detail', {
            url: '/things/:thing',
            templateUrl: 'js/src/thingdetail/thingdetail.html',
            controller: 'ThingDetail as thingDetail',
            resolve: {
                thing: ["thingListService", "$stateParams", function (thingListService, $stateParams) {
                    // The injected "$stateParams" gets its parameters from 
                    // the URL defined above.
                    return thingListService.getThing($stateParams.thing);
                }]
            }
        });


        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);
    }

})();