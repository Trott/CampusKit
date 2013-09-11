var ucsf = ucsf || {};

ucsf.FreeFood = {
    Controller: function (scope) {
        scope.isLoading = true;
        scope.message = "";
        scope.events = [];

        Modernizr.load({
            load: "http://apis.ucsf.edu/jsapi?free_food",
            callback: function () {
                var innerCallback = function (result) {
                        scope.$apply(function () {
                            scope.events = result.events || [];
                            scope.isLoading = false;
                            if (! scope.events.length) {
                                scope.message = "No listings found. Please try again later.";
                            }
                        });
                    };
                UCSF.FreeFood.events(
                    {},
                    innerCallback,
                    innerCallback
                );
           }
        });

    }
};

ucsf.FreeFood.Controller.$inject = ["$scope"];