(function () {
    'use strict';
    var apikey = 'c631ef46e918c82cf81ef4869f0029d4';
    angular.module('directory', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/directory', {templateUrl: 'partials/directory/searchForm.html', controller: 'directorySearchController'})
        .when('/directory/:keywords', {templateUrl: 'partials/directory/searchForm.html', controller: 'directorySearchController'});
    }])
    . controller(
        'directorySearchController',
        ['$scope', '$location', '$routeParams', function ($scope, $location, $routeParams) {
            $scope.searchSubmitted = false;
            $scope.loading = false;
            $scope.loadError = false;
            $scope.results = {};

            var allowedCharsOnly = function (value) {
                // Only allow alphabetic characters, space, colon, and quotation mark.
                // This is done for convenience/sanity, not security.
                // Client-side checks are easily bypassed, duh.
                // Server-side still needs to gracefully handle anything thrown at it.
                return value.replace(/[^A-Za-z :"]/g, ' ');
            };

            $scope.search = function () {
                $location.url('/directory/' + allowedCharsOnly($scope.keywords));
            };

            if ($routeParams.keywords) {
                $scope.keywords = allowedCharsOnly($routeParams.keywords);
                $scope.loading = true;
                $scope.searchSubmitted = true;
                $scope.loadError = false;

                if (window.UCSF && window.UCSF.Person && typeof window.UCSF.Person.search === 'function') {
                    window.UCSF.Person.search(
                        {
                            apikey: apikey,
                            q: $scope.keywords
                        },
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
                } else {
                    $scope.loading = false;
                    $scope.loadError = true;
                }
            }
        }]
    );
}());
