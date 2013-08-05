(function () {
    'use strict';
    var apikey = 'c631ef46e918c82cf81ef4869f0029d4';
    angular.module('fitness', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/fitness/schedule', {templateUrl: 'partials/fitness/schedule.html', controller: 'scheduleFitnessController'})
        .when('/fitness/locations', {templateUrl: 'partials/fitness/locations.html'})
        .when('/fitness', {templateUrl: 'partials/fitness/mainMenu.html'});
    }])
    .controller(
        'scheduleFitnessController',
        ['$scope', function ($scope) {
            $scope.loading = true;
            $scope.loadError = false;
            $scope.loaded = false;

            $scope.query = '';
            $scope.filter = function (elem) {
                switch ($scope.filter.type) {
                    case "mbclasses":
                        return elem.name.indexOf('Mission Bay') !== -1;
                    case "pclasses":
                        return elem.name.indexOf('Parnassus') !== -1;
                    case "mbopool":
                        return elem.location === "Outdoor Pool (Mission Bay)";
                    case "mbipool":
                        return elem.location === "Indoor Pool (Mission Bay)";
                    case "pipool":
                        return elem.location === "Indoor Pool (Parnassus)";
                    default:
                        return true;
                }
            };
            $scope.filter.type = 'all';

            var options = {
                apikey: apikey
            };

            if (window.UCSF && window.UCSF.Fitness && typeof window.UCSF.Fitness.schedule === 'function') {
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