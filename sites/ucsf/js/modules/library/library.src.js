(function () {
    'use strict';

    angular.module('library', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/library', {templateUrl: 'library/mainMenu.html'})
        .when('/library/locations', {controller: 'locationsLibraryController', templateUrl: 'library/locations.html'})
        .when('/library/help', {controller: 'helpLibraryController', templateUrl: 'library/help.html'});
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
    }])
    .controller('helpLibraryController', ['$scope', '$window', function ($scope, $window) {
        var bookmarklet = $window.document.getElementById('library_remote_access_bookmarklet');

        $scope.selectBookmarklet = function () {
            bookmarklet.select();
        };

        $scope.resetBookmarkletUrl = function () {
            $scope.bookmarkletUrl = 'javascript:void((function(){location.href=\'https://ucsf.idm.oclc.org/login?qurl=\' + encodeURIComponent(location.href);})());';
        };

        $scope.resetBookmarkletUrl();
    }]);
}());