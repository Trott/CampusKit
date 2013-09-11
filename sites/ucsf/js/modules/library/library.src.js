(function () {
    'use strict';

    angular.module('library', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/library', {templateUrl: 'library/mainMenu.html'})
        .when('/library/locations', {controller: 'locationsLibraryController', templateUrl: 'library/locations.html'})
        .when('/library/help', {templateUrl: 'library/help.html'});
    }])
    .factory('LibraryService', function () {
        return {
            hours: function (options, successCallback, failureCallback) {
                if (window.UCSF && window.UCSF.Library && typeof window.UCSF.Library.hours === 'function') {
                    window.UCSF.Library.hours(
                        {},
                        successCallback,
                        failureCallback
                        );
                } else {
                    failureCallback();
                }
            }
        };
    })
    .controller('locationsLibraryController', ['$scope', 'LibraryService', function ($scope, LibraryService) {
        var successCallback = function (data) {
            $scope.loading = false;
            $scope.loaded = true;
            $scope.locations = data.locations;
        };

        var failureCallback = function () {
            $scope.loading = false;
            $scope.loadError = true;
        };

        $scope.load = function () {
            $scope.loading = true;
            $scope.loaded = false;
            $scope.loadError = false;

            LibraryService.hours({}, successCallback, failureCallback);
        };

        $scope.load();
    }]);
}());