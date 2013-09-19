(function () {
    'use strict';
    angular.module('research', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/research/:profileId', {templateUrl: 'research/profile.html', controller: 'researchProfileController'});
    }])
    .factory('ProfileService', function() {
        return {
            profile: function(options, successCallback, failureCallback) {
                if (window.UCSF && window.UCSF.Profile && typeof window.UCSF.Profile.get === 'function') {
                    window.UCSF.Profile.get(
                        options,
                        successCallback,
                        failureCallback
                    );
                } else {
                    failureCallback();
                }
            }
        };
    })
    .controller(
        'researchProfileController',
        ['$scope', '$routeParams', "ProfileService", function ($scope, $routeParams, ProfileService) {
            $scope.loading = true;
            $scope.loadError = false;
            // profileId should only contain numeric characters
            var profileId = $routeParams.profileId.replace(/\D/g,'');

            $scope.load = function () {
                ProfileService.profile(
                    { id: profileId },
                    function (data) {
                        $scope.$apply(function () {
                            $scope.loading = false;
                            $scope.loadError = false;
                            $scope.profiles = data.profiles;
                        });
                    },
                    function () {
                        $scope.loading = false;
                        $scope.loadError = true;
                    }
                );
            };

            $scope.load();
        }]
    );
}());
