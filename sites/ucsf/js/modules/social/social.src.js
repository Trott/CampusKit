(function () {
    'use strict';
    angular.module('social', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/social', {templateUrl: 'social/mainMenu.html'});
    }]);
}());