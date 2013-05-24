var ucsf = ucsf || {};

ucsf.FreeFood = {
    Controller: function (scope) {
        scope.isLoading = true;

        Modernizr.load({
            load: "http://apis.ucsf.edu/jsapi?free_food",
            callback: function () {
                var apikey='c631ef46e918c82cf81ef4869f0029d4';
                UCSF.FreeFood.events(
                    {apikey:apikey},
                    function(result) { scope.events = result.events || {};}
                );
           }
       });
    }
};

ucsf.FreeFood.Controller.$inject = ["$scope"];