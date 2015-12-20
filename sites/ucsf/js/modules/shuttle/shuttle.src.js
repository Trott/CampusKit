(function () {
    'use strict';
    angular.module('shuttle', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/shuttle', {templateUrl: 'shuttle/mainMenu.html'})
        .when('/shuttle/planner', {templateUrl: 'shuttle/planner.html', controller: 'planShuttleController'})
        .when('/shuttle/planner/:fromPlace/:toPlace/:when/:time/:date', {templateUrl: 'shuttle/planner.html', controller: 'planShuttleController'})
        .when('/shuttle/list', {templateUrl: 'shuttle/routeList.html', controller: 'routeMenuShuttleController'})
        .when('/shuttle/schedule//:stop', {templateUrl: 'shuttle/routeList.html', controller: 'routeMenuShuttleController'})
        .when('/shuttle/locations', {templateUrl: 'shuttle/stopList.html', controller: 'stopShuttleController'})
        .when('/shuttle/schedule/:route', {templateUrl: 'shuttle/stopList.html', controller: 'stopShuttleController'})
        .when('/shuttle/schedule/:route/:stop', {templateUrl: 'shuttle/schedule.html', controller: 'scheduleShuttleController'});
    }])
    .factory('ShuttleService', ['$rootScope', function ($scope) {
        var wrapper = function (functionName, options, successCallback, failureCallback) {
            var attempts = 1;
            var functionToTry;

            var exponentialBackoff = function (functionToRetry) {
                var maxInterval = (Math.pow(2, attempts) - 1) * 1000;

                if (maxInterval > 30*1000) {
                    maxInterval = 30*1000; // maximum wait time is 30 seconds
                }

                var waitTime = Math.random() * maxInterval;
                setTimeout(function () {
                    attempts++;
                    functionToRetry();
                }, waitTime);
            };

            var wrappedSuccess = function (data) {
                successCallback(data);
                $scope.$apply();
            };


            var wrappedFailure = function (error, data) {
                exponentialBackoff(functionToTry);
                failureCallback(error, data);
                $scope.$apply();
            };

            if (typeof UCSF === "object" && UCSF.Shuttle) {
                functionToTry = function () {
                    UCSF.Shuttle[functionName](options, wrappedSuccess, wrappedFailure);
                };
                functionToTry();
            } else {
                failureCallback();
            }
        };
        return {
            times: function (options, successCallback, failureCallback) {
                wrapper('times', options, successCallback, failureCallback);
            },
            stops: function (options, successCallback, failureCallback) {
                wrapper('stops', options, successCallback, failureCallback);
            },
            predictions: function (options, successCallback, failureCallback) {
                wrapper('predictions', options, successCallback, failureCallback);
            },
            routes: function (options, successCallback, failureCallback) {
                wrapper('routes', options, successCallback, failureCallback);
            },
            plan: function (options, successCallback, failureCallback) {
                wrapper('plan', options, successCallback, failureCallback);
            }
        };
    }])
    .controller(
        'scheduleShuttleController',
        ['$window', function ($window) {
           $window.location.href = 'http://campuslifeservices.ucsf.edu/transportation/services/shuttles/service_alerts';
        }]
    )
    .controller(
        'stopShuttleController',
        ['$window', function ($window) {
            $window.location.href = 'http://campuslifeservices.ucsf.edu/transportation/services/shuttles/service_alerts';
        }]
    )
    .controller(
        'routeMenuShuttleController',
        ['$window', function ($window) {
            $window.location.href = 'http://campuslifeservices.ucsf.edu/transportation/services/shuttles/service_alerts';
        }]
    )
    .controller(
        'planShuttleController',
        ['$window', function ($window) {
            $window.location.href = 'http://campuslifeservices.ucsf.edu/transportation/services/shuttles/service_alerts';
        }]
    );
}());
