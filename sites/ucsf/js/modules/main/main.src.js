(function () {
    'use strict';
    angular.module('main', ['shuttle', 'fitness', 'social', 'emergency', 'about', 'feedback'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/', {templateUrl: 'partials/main/mainMenu.html'})
        .otherwise({redirectTo: '/'});
    }])
    .controller('backButtonController', ['$scope', '$location', function ($scope, $location) {
        var getHideBackButton = function () {
            return $location.path() === '/';
        };

        $scope.$watch(getHideBackButton, function() { $scope.hideBackButton = getHideBackButton(); });
    }]);
}());