(function () {
    'use strict';
    angular.module('feedback', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/feedback', {templateUrl: 'feedback/mainMenu.html'});
    }]);
}());