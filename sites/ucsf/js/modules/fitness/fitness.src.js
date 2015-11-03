(function () {
    'use strict';
    angular.module('fitness', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/fitness', {templateUrl: 'fitness/mainMenu.html'});
    }]);
}());