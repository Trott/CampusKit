(function () {
    'use strict';
    angular.module('main', ['shuttle'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/', {templateUrl: 'partials/main/main_menu.html'});
    }]);
}());