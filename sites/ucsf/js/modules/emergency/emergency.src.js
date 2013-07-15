(function () {
    'use strict';
    angular.module('emergency', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/emergency', {templateUrl: 'partials/emergency/mainMenu.html'});
    }]);
}());