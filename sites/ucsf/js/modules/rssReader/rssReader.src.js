(function () {
    'use strict';
    angular.module('rssReader', [])
    .factory('rssReaderService', ['$q', function ($q) {
        return {
            getRssData: function (feedUrl, scope, options) {
                var deferred = $q.defer();

                var localStorageKey = options.localStorageKey;
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
                    if (localStorageKey) {
                        deferred.resolve(loadFromStorage(localStorageKey));
                    }
                    deferred.resolve({});
                    return;
                }

                Modernizr.load([{load:'http://www.google.com/jsapi', callback: function() {
                    google.load("feeds", "1",
                        {
                            nocss: true,
                            callback: function () {
                                var feed = new google.feeds.Feed(feedUrl);

                                feed.setNumEntries(10);

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

                                            minutes = dateObject.getMinutes();
                                            if (minutes < 10) {
                                                minutes = "0" + minutes;
                                            }
                                            hours = dateObject.getHours();
                                            designation = hours < 12 ? 'AM' : 'PM';
                                            if (hours > 12) {
                                                hours = hours - 12;
                                            }
                                            if (hours === 0) {
                                                hours = 12;
                                            }

                                            dateTime.time = hours + ':' +
                                                minutes + ' ' +
                                                designation;

                                            thisEntry.dateTime = dateTime;
                                        }

                                        deferred.resolve(content.feed);
                                        if (Modernizr.localstorage) {
                                            window.localStorage.setItem(localStorageKey, JSON.stringify(content));
                                        }
                                    } else {
                                        if (localStorageKey) {
                                            deferred.resolve(loadFromStorage(localStorageKey).feed);
                                        } else {
                                            deferred.resolve({});
                                        }
                                    }
                                    scope.$apply();
                                });
                            }
                        }
                    );
                }}]);
                return deferred.promise;
            }
        };
    }]);
}());