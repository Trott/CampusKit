(function () {
    'use strict';
    angular.module('library', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/library', {templateUrl: 'partials/library/mainMenu.html'})
        .when('/library/locations', {templateUrl: 'partials/library/locations.html'})
        .when('/library/help', {templateUrl: 'partials/library/help.html'});
    }]);
}());