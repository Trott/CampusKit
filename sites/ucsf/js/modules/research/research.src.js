(function () {
    'use strict';
    angular.module('research', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/research/:profileId', {templateUrl: 'research/profile.html', controller: 'researchProfileController'});
    }])
    .controller(
        'researchProfileController',
        ['$scope', '$routeParams', "$http", function ($scope, $routeParams, $http) {
            $scope.loading = true;
            $scope.loadError = false;
            // profileId should only contain numeric characters
            var profileId = $routeParams.profileId.replace(/\D/g,'');

            $scope.load = function () {
                $http({
                    method: 'GET',
                    url: 'http://api.profiles.ucsf.edu/json/v2/?publications=full&mobile=on&ProfilesNodeID=' + profileId
                }).success(
                    function (data, status, headers, config) {
                        $scope.loading = false;
                        $scope.loadError = false;
                        $scope.profiles = data.Profiles;
                    }
                ).error(
                    function (data, status, headers, config) {
                        $scope.loading = false;
                        $scope.loadError = true;
                    }
                );
            };

            $scope.load();
        }]
    );
}());
