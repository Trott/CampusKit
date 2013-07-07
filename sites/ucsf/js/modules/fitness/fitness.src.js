// TODO: implmenet search filter
(function () {
    'use strict';
    var apikey = 'c631ef46e918c82cf81ef4869f0029d4';
    angular.module('fitness', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/', {templateUrl: 'partials/schedule.html', controller: 'scheduleController'})
        .otherwise({redirectTo: '/'});
    }])
    .controller(
        'scheduleController',
        ['$scope', function ($scope) {
            $scope.loading = true;
            $scope.loadError = false;
            $scope.loaded = false;

            $scope.query = "";

            var options = {
                apikey: apikey
            };

            if (window.UCSF && window.UCSF.Fitness && typeof window.UCSF.Fitness.schedule === "function") {
                window.UCSF.Fitness.schedule(
                    options,
                    function (data) {
                        $scope.$apply(function () {
                            $scope.loading = false;
                            $scope.loadError = !! data.error;
                            $scope.loaded = ! $scope.loadError;

                            $scope.classes = data.classes;
                        });
                    },
                    function () {
                        $scope.$apply(function () {
                            $scope.loading = false;
                            $scope.loadError = true;
                        });
                    }
                );
            } else {
                $scope.loading = false;
                $scope.loadError = true;
            }
        }]
    );
}());