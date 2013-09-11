(function () {
    'use strict';
    angular.module('fitness', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/fitness/schedule', {templateUrl: 'fitness/schedule.html', controller: 'scheduleFitnessController'})
        .when('/fitness/locations', {templateUrl: 'fitness/locations.html'})
        .when('/fitness', {templateUrl: 'fitness/mainMenu.html'});
    }])
    .factory('FitnessService', function () {
        return {
            schedule: function (options, successCallback, failureCallback) {
                if (window.UCSF && window.UCSF.Fitness && typeof window.UCSF.Fitness.schedule === 'function') {
                    window.UCSF.Fitness.schedule(
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
    .controller(
        'scheduleFitnessController',
        ['$scope', 'FitnessService', function ($scope, FitnessService) {
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

            var successCallback = function (data) {
                $scope.$apply(function () {
                    $scope.loading = false;
                    $scope.loadError = !! data.error;
                    $scope.loaded = ! $scope.loadError;

                    $scope.classes = data.classes;
                });
            };

            var failureCallback = function () {
                $scope.loading = false;
                $scope.loadError = true;
            };

            $scope.load = function() {
                $scope.loading = true;
                $scope.loadError = false;
                $scope.loaded = false;
                FitnessService.schedule({}, successCallback, failureCallback);
            };

            $scope.load();
        }]
    );
}());