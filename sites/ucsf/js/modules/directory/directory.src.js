(function () {
    'use strict';
    var apikey = 'c631ef46e918c82cf81ef4869f0029d4';
    var allowedCharsOnly = function (value) {
        // This is done for convenience/sanity, not security.
        // Client-side checks are easily bypassed, duh.
        // Server-side still needs to gracefully handle anything thrown at it.
        return value.replace(/[^A-Za-z :"'\-]/g, ' ');
    };
    angular.module('directory', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/directory', {templateUrl: 'directory/searchForm.html', controller: 'directorySearchController'})
        .when('/directory/:keywords', {templateUrl: 'directory/searchForm.html', controller: 'directorySearchController'});
    }])
    .factory('DirectoryService', function() {
        return {
            search: function(options, successCallback, failureCallback) {
                var keywords = allowedCharsOnly(options.searchTerms);

                if (window.UCSF && window.UCSF.Person && typeof window.UCSF.Person.search === 'function') {
                    window.UCSF.Person.search(
                        {
                            apikey: apikey,
                            q: keywords
                        },
                        successCallback,
                        failureCallback
                    );
                } else {
                    failureCallback();
                }
            }
        };
    })
    .controller(
        'directorySearchController',
        ['$scope', '$location', '$routeParams', "DirectoryService", function ($scope, $location, $routeParams, DirectoryService) {
            $scope.searchSubmitted = false;
            $scope.loading = false;
            $scope.loadError = false;
            $scope.results = {};
            $scope.keywords = $routeParams.keywords || '';

            $scope.search = function () {
                $location.url('/directory/' + allowedCharsOnly($scope.keywords));
            };

            $scope.load = function () {
                if ($routeParams.keywords) {
                    $scope.loading = true;
                    $scope.searchSubmitted = true;
                    $scope.loadError = false;

                    DirectoryService.search(
                        { searchTerms: $routeParams.keywords },
                        function (data) {
                            $scope.$apply(function () {
                                $scope.loading = false;
                                $scope.loadError = false;
                                $scope.results = data;
                            });
                        },
                        function () {
                            $scope.loading = false;
                            $scope.loadError = true;
                        }
                    );
                }
            };

            $scope.load();
        }]
    );
}());
