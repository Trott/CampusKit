(function () {
    'use strict';
    angular.module('social', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/social', {templateUrl: 'partials/social/mainMenu.html'});
    }]);
}());