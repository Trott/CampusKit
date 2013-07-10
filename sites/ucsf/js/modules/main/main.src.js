(function () {
    'use strict';
    angular.module('main', ['shuttle'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/', {templateUrl: 'main/partials/main_menu.html'});
    }]);
}());