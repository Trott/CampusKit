/* global UCSF, angular, Modernizr, localStorage */
/* former schedule render code:

ucsf.shuttle.renderSchedule)

*/
(function () {
    'use strict';
    var apikey = 'c631ef46e918c82cf81ef4869f0029d4';
    angular.module('shuttle', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/', {templateUrl: 'partials/main_menu.html'})
        .when('/planner', {templateUrl: 'partials/planner.html', controller: 'planController'})
        .when('/planner/:fromPlace/:toPlace/:when/:time/:date', {templateUrl: 'partials/planner.html', controller: 'planController'})
        .when('/list', {templateUrl: 'partials/routeList.html', controller: 'routeMenuController'})
        .when('/schedule//:stop', {templateUrl: 'partials/routeList.html', controller: 'routeMenuController'})
        .when('/locations', {templateUrl: 'partials/stopList.html', controller: 'stopController'})
        .when('/schedule/:route', {templateUrl: 'partials/stopList.html', controller: 'stopController'})
        .when('/schedule/:route/:stop', {templateUrl: 'partials/schedule.html', controller: 'scheduleController'})
        .otherwise({redirectTo: '/'});
    }])
    .controller(
        'scheduleController',
        ['$scope', '$routeParams', '$filter', function ($scope, $routeParams, $filter) {
            $scope.loading = true;
            $scope.loadError = false;
            $scope.loaded = false;

            var startTime = new Date().setHours(0,0,0,0);

            var options = {
                apikey: apikey,
                routeId: $routeParams.route,
                stopId: $routeParams.stop,
                startTime: startTime,
                endTime: startTime + 86399999
            };

            var getTimes = function () {
                UCSF.Shuttle.times(
                    options,
                    function (data) {
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
                        $scope.$apply();
                    },
                    function () {
                        $scope.loading = false;
                        $scope.loadError = true;
                        $scope.$apply();
                    }
                );
            };

            $scope.changeDay = function (changeBy) {
                var changeInMs = changeBy * 86400000;
                startTime = options.startTime += changeInMs;
                options.endTime += changeInMs;
                $scope.loading = true;
                $scope.loaded = false;
                getTimes();
            };

            getTimes();

            // Look up stop name. Yup. Its own request. Lame. Total opportunity to improve things here, someone, anyone?
            UCSF.Shuttle.stops(
                {apikey: apikey, routeId: $routeParams.route},
                function (data) {
                    var stop = $filter('filter')(data.stops, function (elem) {
                        return elem.id && elem.id.id === $routeParams.stop;
                    }).pop();
                    $scope.stopName = stop && stop.stopName;
                    $scope.$apply();
                },
                function () {
                    // Couldn't load the stop name. Not crucial. Fail silently.
                }
            );
        }]
    )
    .controller(
        'stopController',
        ['$scope', '$routeParams', function ($scope, $routeParams) {
            $scope.loading = true;
            $scope.loadError = false;
            var options = {
                apikey: apikey
            };
            if ($routeParams.route) {
                options.routeId = $routeParams.route;
            }

            UCSF.Shuttle.stops(
                options,
                function (data) {
                    window.console.log(options);
                    window.console.log(data);
                    $scope.loading = false;
                    $scope.stops = data.stops || [];

                    if (data.route && data.route.id) {
                        $scope.routeShortName = data.route.routeShortName || '';
                        $scope.routeId = data.route.id.id;
                    }
                    $scope.loadError = $scope.stops.length === 0;
                    $scope.$apply();
                },
                function () {
                    $scope.loading = false;
                    $scope.loadError = true;
                    $scope.$apply();
                }
            );
        }]
    )
    .controller(
        'routeMenuController',
        ['$scope', '$routeParams', function ($scope, $routeParams) {
            $scope.loading = true;
            $scope.loadError = false;
            var options = {apikey: apikey};
            if ($routeParams.stop) {
                options.stopId = $routeParams.stop;
            }
            UCSF.Shuttle.routes(
                options,
                function (data) {
                    $scope.loading = false;
                    $scope.routes = data.routes || {};
                    $scope.$apply();
                },
                function () {
                    $scope.loading = false;
                    $scope.loadError = true;
                    $scope.$apply();
                }
            );
        }]
    )
    .controller(
        'planController',
        ['$scope', '$filter', '$location', '$routeParams', function ($scope, $filter, $location, $routeParams) {
            var xhrFunction,
                xhrOptions;

            $scope.planLoading = false;
            $scope.planLoaded = false;
            $scope.planLoadError = false;

            if ($routeParams.fromPlace && $routeParams.toPlace && $routeParams.when && $routeParams.time && $routeParams.date) {
                var planXhrParams = {
                    apikey: apikey,
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

                UCSF.Shuttle.plan(
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
                        $scope.$apply();
                    },
                    function () {
                        $scope.planLoading = false;
                        $scope.planLoadError = true;
                        $scope.$apply();
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
            $scope.stopsLoadError = false;
            $scope.stopsLoaded = false;

            UCSF.Shuttle.stops(
                {apikey: apikey},
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
                        $scope.stopsLoadError = true;
                    }
                    $scope.$apply();
                },
                function () {
                    $scope.stopsLoading = false;
                    $scope.stopsLoadError = true;
                    $scope.$apply();
                }
            );

            $scope.plan = function () {
                var fromPlace = $scope.begin.id.agencyId + '_' + $scope.begin.id.id,
                toPlace = $scope.end.id.agencyId + '_' + $scope.end.id.id;

                if (Modernizr.localstorage) {
                    localStorage.shuttleStart = $scope.stops.indexOf($scope.begin);
                    localStorage.shuttleEnd = $scope.stops.indexOf($scope.end);
                }

                $location.url('/planner/' + [fromPlace, toPlace, $scope.when, $scope.time, $scope.date].join('/'));
            };
        }]
    );
}());