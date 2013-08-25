(function () {
    'use strict';
    angular.module('events', ['rssReader'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/events', {templateUrl: 'events/mainMenu.html'})
        .when('/events/ucsfevents', {templateUrl: 'events/ucsfEvents.html', controller: 'eventsController'})
        .when('/events/academicevents', {templateUrl: 'events/academicEvents.html', controller: 'academicEventsController'});
    }])
    .controller(
        'eventsController',
        ['$scope', 'rssReaderService', function ($scope, rssReaderService) {
            var promise = rssReaderService.getRssData(
                'http://feeds2.feedburner.com/ucsf/event-calendar',
                $scope,
                {localStorageKey: 'feed_ucsf_events'}
            );
            promise.then(
                function(feed) {
                    $scope.feed = feed;
                }
            );
        }]
    )
    .controller(
        'academicEventsController',
        ['$scope', 'rssReaderService', function ($scope, rssReaderService) {
            var promise = rssReaderService.getRssData(
                'http://25livepub.collegenet.com/calendars/fae-1.rss',
                $scope,
                {localStorageKey: 'feed_academic_events'}
            );
            promise.then(
                function(feed) {
                    $scope.feed = feed;
                }
            );
        }]
    );
}());