(function () {
    'use strict';
    var apikey = 'c631ef46e918c82cf81ef4869f0029d4';
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
    .run(['$rootScope', function ($rootScope) {$rootScope.hideBackButton = false;}])
    .factory('ShuttleService', ['$rootScope', function ($scope) {
        var wrapper = function (functionName, options, successCallback, failureCallback) {
            var wrappedSuccess = function (data) {
                successCallback(data);
                $scope.$apply();
            };
            var wrappedFailure = function (error, data) {
                failureCallback(error, data);
                $scope.$apply();
            };
            if (typeof UCSF === "object" && UCSF.Shuttle) {
                options.apikey = apikey;
                UCSF.Shuttle[functionName](options, wrappedSuccess, wrappedFailure);
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
        ['$scope', '$routeParams', '$filter', '$timeout', 'ShuttleService', function ($scope, $routeParams, $filter, $timeout, ShuttleService) {
            $scope.loading = true;
            $scope.loadError = false;
            $scope.loaded = false;

            var startTime = new Date().setHours(0,0,0,0);

            var options = {
                routeId: $routeParams.route,
                stopId: $routeParams.stop,
                startTime: startTime,
                endTime: startTime + 86399999
            };

            var successCallback = function (data) {
                $scope.loading = false;
                $scope.loadError = !! data.error;
                $scope.loaded = ! $scope.loadError;
                $scope.times = [];
                if (data.times && data.times.length > 0) {
                    $scope.times = data.times;
                    var sample = data.times[0];
                    if (sample && sample.trip) {
                        $scope.routeShortName = sample.trip.route && sample.trip.route.shortName;
                        $scope.routeId = sample.trip.routeId && sample.trip.routeId.id;
                    }
                }
                $scope.startTime = startTime;
            };

            var failureCallback = function () {
                $scope.loading = false;
                $scope.loadError = true;
            };

            $scope.changeDay = function (changeBy) {
                var changeInMs = changeBy * 86400000;
                startTime = options.startTime += changeInMs;
                options.endTime += changeInMs;
                $scope.loading = true;
                $scope.loaded = false;
                ShuttleService.times(options, successCallback, failureCallback);
            };

            $scope.load = function () {

                ShuttleService.times(options, successCallback, failureCallback);

                ShuttleService.stops(
                    {routeId: $routeParams.route},
                    function (data) {
                            var stop = $filter('filter')(data.stops, function (elem) {
                                return elem.id && elem.id.id === $routeParams.stop;
                            }).pop();
                            $scope.stopName = stop && stop.stopName;
                    },
                    function () {
                        // Couldn't load the stop name. Not crucial. Fail silently.
                    }
                );
            };

            $scope.load();

            var timeout;

            var updatePredictions = function () {
                ShuttleService.predictions(
                    {routeId: $routeParams.route, stopId: $routeParams.stop},
                    function (data) {
                        var times = data.times.slice(0,3);
                        $scope.predictions = {times: times};
                        // Update these predictions in 30 seconds
                        timeout = $timeout(updatePredictions, 30 * 1000);
                    },
                    function () {
                        //Couldn't load prediction data.
                        //Remove any prediction data that was there before
                        // so that we don't show stale data.
                        $scope.predictions = {};
                        //Try again in 30 seconds.
                        timeout = $timeout(updatePredictions, 30 * 1000);
                    }
                );
            };

            $scope.$on('$destroy', function () {
                if (timeout) {
                    $timeout.cancel(timeout);
                }
            });

            // And one last call to get prediction data.
            updatePredictions();
        }]
    )
    .controller(
        'stopShuttleController',
        ['$scope', '$routeParams', 'ShuttleService', function ($scope, $routeParams, ShuttleService) {
            $scope.loading = true;
            $scope.loadError = false;
            var options = {};
            if ($routeParams.route) {
                options.routeId = $routeParams.route;
            }

            $scope.load = function () {

                ShuttleService.stops(
                    options,
                    function (data) {
                        $scope.loading = false;
                        $scope.stops = data.stops || [];

                        if (data.route && data.route.id) {
                            $scope.routeShortName = data.route.routeShortName || '';
                            $scope.routeLongName = data.route.routeLongName || '';
                            $scope.routeId = data.route.id.id;
                        }
                        $scope.loadError = $scope.stops.length === 0;
                    },
                    function () {
                        $scope.loading = false;
                        $scope.loadError = true;
                    }
                );
            };

            $scope.load();
        }]
    )
    .controller(
        'routeMenuShuttleController',
        ['$scope', '$routeParams', 'ShuttleService', function ($scope, $routeParams, ShuttleService) {
            $scope.loading = true;
            $scope.loadError = false;
            var options = {};
            if ($routeParams.stop) {
                options.stopId = $routeParams.stop;
            }

            $scope.load = function () {
                ShuttleService.routes(
                    options,
                    function (data) {
                        $scope.loading = false;
                        $scope.routes = data.routes || {};
                    },
                    function () {
                        $scope.loading = false;
                        $scope.loadError = true;
                    }
                );
            };

            $scope.load();
        }]
    )
    .controller(
        'planShuttleController',
        ['$scope', '$filter', '$location', '$routeParams', 'ShuttleService', function ($scope, $filter, $location, $routeParams, ShuttleService) {
            var xhrFunction,
            xhrOptions;

            $scope.planLoading = false;
            $scope.planLoaded = false;
            $scope.loadError = false;

            $scope.load = function () {

                if ($routeParams.fromPlace && $routeParams.toPlace && $routeParams.when && $routeParams.time && $routeParams.date) {
                    var planXhrParams = {
                        fromPlace: $routeParams.fromPlace,
                        toPlace: $routeParams.toPlace
                    };

                    $scope.when = $routeParams.when;
                    $scope.time = $routeParams.time;
                    $scope.date = $routeParams.date;

                    if ($routeParams.when !== 'now') {
                        planXhrParams.arriveBy = $routeParams.when === 'arrive';
                        planXhrParams.time = $routeParams.time;
                        var date = new Date();
                        date.setDate(date.getDate() + parseInt($routeParams.date, 10));
                        planXhrParams.date = $filter('date')(date, 'M/d/yyyy');
                    }

                    $scope.planLoading = true;

                    ShuttleService.plan(
                        planXhrParams,
                            function (data) {
                            $scope.planLoading = false;
                            $scope.planLoaded = true;
                            var plan = data.plan || {};
                            if (plan.itineraries) {
                                // Used to check that the plan is within four hours of the target time.
                                var datestamp = plan.date ? plan.date : Date.now();
                                var fourHours = 4 * 60 * 60 * 1000;
                                var index = 1;
                                var itinerariesCount = plan.itineraries.length;
                                var removalQueue = [];
                                var massagedLeg;
                                var tripSteps;
                                var thisItinerary;
                                // Decrement with while rather than increment with for so that splice() doesn't mess up the loop
                                for (var i = 0; i < itinerariesCount; i++) {
                                    thisItinerary = plan.itineraries[i];
                                    // Only use itineraries that are less than 2 hours (e.g., not overnight)
                                    // This check should probably be happening on the server side.
                                    // Then check that the time is within four hours of what was chosen
                                    // so the user doesn't get a trip for the next day.
                                    if ((thisItinerary.duration < 2 * 60 * 60 * 1000) && (thisItinerary.endTime >= datestamp - fourHours) && (thisItinerary.endTime <= datestamp + fourHours)) {
                                        thisItinerary.index = index;
                                        index++;
                                        thisItinerary.startTimeFormatted = $filter('date')(thisItinerary.startTime, 'shortTime');
                                        thisItinerary.endTimeFormatted = $filter('date')(thisItinerary.endTime, 'shortTime');
                                        thisItinerary.durationFormatted = Math.round(thisItinerary.duration / (60 * 1000));
                                        if (thisItinerary.hasOwnProperty('legs')) {
                                            tripSteps = thisItinerary.legs.length;
                                            for (var j = 0; j < tripSteps; j++) {
                                                massagedLeg = {};
                                                massagedLeg.toName = thisItinerary.legs[j].to.name;

                                                if (thisItinerary.legs[j].mode === 'BUS') {
                                                    massagedLeg.fromName = thisItinerary.legs[j].from.name;
                                                    massagedLeg.route = thisItinerary.legs[j].route;
                                                    massagedLeg.routeId = thisItinerary.legs[j].routeId;
                                                    massagedLeg.startTime = $filter('date')(thisItinerary.legs[j].startTime, 'shortTime');
                                                    massagedLeg.endTime = $filter('date')(thisItinerary.legs[j].endTime, 'shortTime');
                                                    thisItinerary.legs[j].bus = massagedLeg;
                                                }

                                                if (thisItinerary.legs[j].mode === 'WALK') {
                                                    thisItinerary.legs[j].walk = massagedLeg;
                                                }
                                            }
                                        }
                                    } else {
                                        removalQueue.push(i);
                                    }
                                }
                                // Start from end so splice() doesn't mess up
                                i = removalQueue.length;
                                while (i--) {
                                    plan.itineraries.splice(removalQueue[i], 1);
                                }
                                $scope.itineraries = plan.itineraries;
                            }
                        },
                        function () {
                            $scope.planLoading = false;
                            $scope.loadError = true;
                        }
                    );
                }


                if (! $scope.time) {
                    var now = Date.now(),
                    minutes = Math.floor(parseInt($filter('date')(now, 'mm'), 10) / 15) * 15;
                    if (minutes === 0) {
                        minutes = '00';
                    }
                    $scope.time = $filter('date')(now, 'h:' + minutes + ' a');
                }
                $scope.when = $scope.when || 'now';
                $scope.date = $scope.date || 0;

                $scope.stopsLoading = true;
                $scope.stopsLoaded = false;

                ShuttleService.stops(
                    {},
                    function (data) {
                        $scope.stopsLoading = false;
                        if (data.stops) {
                            $scope.stops = $filter('orderBy')(data.stops, 'stopName');

                            $scope.begin = $filter('filter')($scope.stops,
                                function (elem) {
                                    return elem.stopName === 'Parnassus Campus';
                                }
                                )[0];
                            $scope.end = $filter('filter')($scope.stops,
                                function (elem) {
                                    return elem.stopName === 'Mission Bay Campus';
                                }
                                )[0];
                            if (Modernizr.localstorage) {
                                if (localStorage.shuttleStart) {
                                    $scope.begin = $scope.stops[localStorage.shuttleStart] || $scope.begin;
                                }
                                if (localStorage.shuttleEnd) {
                                    $scope.end = $scope.stops[localStorage.shuttleEnd] || $scope.end;
                                }
                            }
                            $scope.stopsLoaded = true;
                        } else {
                            $scope.loadError = true;
                        }
                    },
                    function () {
                        $scope.stopsLoading = false;
                        $scope.loadError = true;
                    }
                );
            };

            $scope.load();

            $scope.plan = function () {
                var fromPlace = $scope.begin.id.agencyId + '_' + $scope.begin.id.id,
                toPlace = $scope.end.id.agencyId + '_' + $scope.end.id.id;

                if (Modernizr.localstorage) {
                    localStorage.shuttleStart = $scope.stops.indexOf($scope.begin);
                    localStorage.shuttleEnd = $scope.stops.indexOf($scope.end);
                }

                $location.url('/shuttle/planner/' + [fromPlace, toPlace, $scope.when, $scope.time, $scope.date].join('/'));
            };
        }]
    );
}());