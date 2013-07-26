(function () {
    'use strict';
    var apikey = 'c631ef46e918c82cf81ef4869f0029d4';

    angular.module('library', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/library', {templateUrl: 'partials/library/mainMenu.html'})
        .when('/library/locations', {controller: 'locationsLibraryController', templateUrl: 'partials/library/locations.html'})
        .when('/library/help', {templateUrl: 'partials/library/help.html'});
    }])
    .controller('locationsLibraryController', ['$scope', function ($scope) {
        $scope.loading = true;
        $scope.loaded = false;
        $scope.loadError = false;

        if (window.UCSF && window.UCSF.Library && typeof window.UCSF.Library.hours === 'function') {
            window.UCSF.Library.hours(
                {apikey:apikey}, 
                function (data) {
                    $scope.$apply(function () {
                        $scope.loading = false;
                        $scope.loaded = true;
                        $scope.locations = data.locations;
                    });
                },
                function () {
                    $scope.$apply(function () {
                        $scope.loading = false;
                        $scope.loadError = true;
                    });
                }
            );

        }
    }]);
}());