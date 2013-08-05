(function () {
    'use strict';
    angular.module('main', ['angularytics', 'shuttle', 'directory', 'news', 'maps', 'library', 'fitness', 'events', 'social', 'emergency', 'about', 'feedback'])
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
        .when('/', {templateUrl: 'partials/main/mainMenu.html'})
        .otherwise({redirectTo: '/'});
    }])
    .controller('backButtonController', ['$scope', '$location', function ($scope, $location) {
        var getHideBackButton = function () {
            return $location.path() === '/';
        };

        $scope.$watch(getHideBackButton, function() { $scope.hideBackButton = getHideBackButton(); });
    }]);
}());