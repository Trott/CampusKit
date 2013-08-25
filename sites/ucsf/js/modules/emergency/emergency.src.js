(function () {
    'use strict';
    angular.module('emergency', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/emergency', {templateUrl: 'emergency/mainMenu.html'});
    }]);
}());