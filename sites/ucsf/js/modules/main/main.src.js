(function () {
    'use strict';
    angular.module('main', ['angularytics', 'shuttle', 'directory', 'news', 'library', 'fitness', 'events', 'social', 'emergency', 'about', 'feedback', 'research'])
    .config(['$compileProvider', function ($compileProvider) {
        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    }])
    .config(['AngularyticsProvider', function(AngularyticsProvider) {
        AngularyticsProvider.setEventHandlers(['Google']);
    }]).run(['Angularytics', function(Angularytics) {
        Angularytics.init();
    }])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/', {templateUrl: 'main/mainMenu.html'})
        .otherwise({redirectTo: '/'});
    }])
    .controller('navigationController', ['$scope', '$location', function ($scope, $location) {
        var getHideNavigation = function () {
            return $location.path() === '/';
        };

        $scope.$watch(getHideNavigation, function() { $scope.hideNavigation = getHideNavigation(); });
    }]);
}());