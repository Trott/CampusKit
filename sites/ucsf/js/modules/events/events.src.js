(function () {
    'use strict';
    angular.module('events', ['rssReader'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/events', {templateUrl: 'events/academicEvents.html', controller: 'academicEventsController'});
    }])
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