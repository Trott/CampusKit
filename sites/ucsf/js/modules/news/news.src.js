(function () {
    'use strict';
    angular.module('news', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/news', {templateUrl: 'partials/news/mainMenu.html', controller: 'newsController'});
    }])
    .controller(
        'newsController',
        ['$scope', function ($scope) {
            var loadFromStorage = function (storageId) {
                var stored;
                if (Modernizr.localstorage) {
                    stored = window.localStorage.getItem(storageId);
                    if (stored !== null) {
                        return JSON.parse(stored);
                    }
                }
                return {};
            };

            if (! navigator.onLine) {
                $scope.feed = loadFromStorage('ucsf_news_feed').feed;
                $scope.apply();
            } else {
                Modernizr.load([{load:'http://www.google.com/jsapi', callback: function() {
                    google.load("feeds", "1",
                        {
                            nocss: true,
                            callback: function () {
                                var feed = new google.feeds.Feed('http://feeds.feedburner.com/UCSF_News');

                                feed.load(function (result) {
                                    var i,
                                    thisEntry,
                                    dateTime,
                                    dateObject,
                                    hours,
                                    minutes,
                                    designation,
                                    content = {};

                                    if (! result.error) {
                                        content = {
                                            "feed": this.feed
                                        };
                                        for (i = 0; i < content.feed.entries.length; i = i + 1) {
                                            thisEntry = content.feed.entries[i];
                                            dateTime = {};
                                            dateObject = new Date(thisEntry.publishedDate);
                                            dateTime.date = dateObject.toLocaleDateString();
                                            thisEntry.dateTime = dateTime;
                                        }

                                        if (Modernizr.localstorage) {
                                            window.localStorage.setItem('feed_ucsf_news', JSON.stringify(content));
                                        }
                                        $scope.feed = content.feed;
                                        $scope.$apply();
                                    } else {
                                        $scope.feed = loadFromStorage('feed_ucsf_news').feed;
                                        $scope.$apply();
                                    }
                                });

                            }
                        }
                    );
                }}]);
            }
        }]
    );

}());
