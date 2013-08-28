(function () {
    'use strict';
    angular.module('news', ['rssReader'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/news', {templateUrl: 'news/mainMenu.html', controller: 'newsController'});
    }])
    .controller(
        'newsController',
        ['$scope', 'rssReaderService', function ($scope, rssReaderService) {
            $scope.load = function () {
                var promise = rssReaderService.getRssData(
                    'http://feeds.feedburner.com/UCSF_News',
                    $scope,
                    {localStorageKey: 'feed_ucsf_news'}
                );
                promise.then(
                    function(feed) {
                        $scope.feed = feed;
                    }
                );
            };

            $scope.load();
        }]
    );
}());
