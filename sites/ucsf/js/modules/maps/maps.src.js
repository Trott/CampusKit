(function () {
    'use strict';
    angular.module('maps', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/maps', {templateUrl: 'partials/maps/mainMenu.html'})
        .when('/maps/locations', {templateUrl: 'partials/maps/locations.html', controller: 'mapsLocationController'})
        .when('/maps/map/:location', {templateUrl: 'partials/maps/map.html', controller: 'mapsMapController'});
    }])
    .value('locationList', [
        {'lat': 37.767569, 'lon': -122.392223, 'zoom': 17, 'name': 'Mission Bay', 'marker': false},
        {'lat': 37.763154, 'lon': -122.457941, 'zoom': 17, 'name': 'Parnassus', 'marker': false},
        {'lat': 37.7846389, 'lon': -122.439604, 'zoom': 18, 'name': 'Mt. Zion', 'marker': false},
        {'lat': 37.7555365, 'lon': -122.405038, 'zoom': 17, 'name': 'SFGH', 'marker': false},
        {'lat': 37.764085, 'lon': -122.459684, 'zoom': 17, 'name': '145 Irving', 'marker': true},
        {'lat': 37.768730, 'lon':-122.395966, 'zoom': 17, 'name': '1500 Owens', 'marker': true},
        {'lat': 37.754719, 'lon':-122.4055, 'zoom': 17, 'name': '2550 23rd St. (SFGH Bldg. 9)', 'marker': true},
        {'lat': 37.763964, 'lon':-122.457349, 'zoom': 17, 'name': 'Ambulatory Care Building', 'marker': true},
        {'lat': 37.767609, 'lon':-122.391534, 'zoom': 17, 'name': 'Byers Hall', 'marker': true},
        {'lat': 37.776485, 'lon':-122.392202, 'zoom': 17, 'name': 'China Basin', 'marker': true},
        {'lat': 37.762967, 'lon':-122.459089, 'zoom': 17, 'name': 'Clinical Sciences', 'marker': true},
        {'lat': 37.762438, 'lon':-122.460851, 'zoom': 17, 'name': 'Dentistry', 'marker': true},
        {'lat': 37.770071, 'lon':-122.389591, 'zoom': 17, 'name': 'Diller Cancer Research Building', 'marker': true},
        {'lat': 37.762265, 'lon':-122.461473, 'zoom': 17, 'name': 'Faculty Alumni House', 'marker': true},
        {'lat': 37.767609, 'lon':-122.391534, 'zoom': 17, 'name': 'Genentech Hall', 'marker': true},
        {'lat': 37.767809, 'lon':-122.394109, 'zoom': 17, 'name': 'Gladstone Institute', 'marker': true},
        {'lat': 37.763145, 'lon':-122.458197, 'zoom': 17, 'name': 'Health Sciences East', 'marker': true},
        {'lat': 37.763145, 'lon':-122.458197, 'zoom': 17, 'name': 'Health Sciences West', 'marker': true},
        {'lat': 37.763308, 'lon':-122.4591, 'zoom': 17, 'name': 'Kalmanovitz Library', 'marker': true},
        {'lat': 37.760732, 'lon':-122.460725, 'zoom': 17, 'name': 'Kirkham Child Care', 'marker': true},
        {'lat': 37.762135, 'lon':-122.460024, 'zoom': 17, 'name': 'Koret Vision', 'marker': true},
        {'lat': 37.763617, 'lon':-122.456789, 'zoom': 17, 'name': 'Langley Porter Psychiatric Institute', 'marker': true},
        {'lat': 37.763154, 'lon':-122.457841, 'zoom': 17, 'name': 'Long Hospital', 'marker': true},
        {'lat': 37.762889, 'lon':-122.460227, 'zoom': 17, 'name': 'Lucia Child Care', 'marker': true},
        {'lat': 37.761002, 'lon':-122.460350, 'zoom': 17, 'name': 'Medical Research IV', 'marker': true},
        {'lat': 37.763145, 'lon':-122.458197, 'zoom': 17, 'name': 'Medical Sciences', 'marker': true},
        {'lat': 37.763371, 'lon':-122.458488, 'zoom': 17, 'name': 'Millberry Union', 'marker': true},
        {'lat': 37.769015, 'lon':-122.389536, 'zoom': 17, 'name': 'Mission Bay Housing East', 'marker': true},
        {'lat': 37.769683, 'lon':-122.389951, 'zoom': 17, 'name': 'Mission Bay Housing North', 'marker': true},
        {'lat': 37.768930, 'lon':-122.390750, 'zoom': 17, 'name': 'Mission Bay Housing South', 'marker': true},
        {'lat': 37.769495, 'lon':-122.390704, 'zoom': 17, 'name': 'Mission Bay Housing West', 'marker': true},
        {'lat': 37.763154, 'lon':-122.457841, 'zoom': 17, 'name': 'Moffitt Hospital', 'marker': true},
        {'lat': 37.762967, 'lon':-122.459189, 'zoom': 17, 'name': 'Nursing Building', 'marker': true},
        {'lat': 37.764121, 'lon':-122.458674, 'zoom': 17, 'name': 'Parking Garage Entrance', 'marker': true},
        {'lat': 37.760432, 'lon':-122.461453, 'zoom': 17, 'name': 'Proctor Foundation', 'marker': true},
        {'lat': 37.763145, 'lon':-122.458197, 'zoom': 17, 'name': 'Regeneration Medicine Building', 'marker': true},
        {'lat': 37.769212, 'lon':-122.391189, 'zoom': 17, 'name': 'Rock Hall', 'marker': true},
        {'lat': 37.767903, 'lon':-122.393506, 'zoom': 17, 'name': 'Rutter Center', 'marker': true},
        {'lat': 37.755482, 'lon':-122.4044, 'zoom': 17, 'name': 'San Francisco General Hospital', 'marker': true},
        {'lat': 37.770427, 'lon':-122.390548, 'zoom': 17, 'name': 'Smith Cancer Research Building', 'marker': true},
        {'lat': 37.767900, 'lon':-122.389356, 'zoom': 17, 'name': 'Third Street Parking Garage', 'marker': true},
        {'lat': 37.762728, 'lon':-122.459943, 'zoom': 17, 'name': 'UC Hall', 'marker': true},
        {'lat': 37.784654, 'lon':-122.439373, 'zoom': 17, 'name': 'UCSF Medical Center at Mt. Zion', 'marker': true},
        {'lat': 37.769765, 'lon': -122.426147, 'zoom': 12, 'name': 'All Campuses', 'marker': false}
    ])
    .controller(
        'mapsLocationController',
        ['$scope', 'locationList', function ($scope, locationList) {
            $scope.locationList = locationList;
        }]
    )
    .controller(
        'mapsMapController',
        ['$scope', '$routeParams', '$window', 'locationList',
            function ($scope, $routeParams, $window, locationList) {
                $window.ucsfMapsCallback = function () {
                    var locationCode = $routeParams.location,
                        mapLocation;

                    for (var i = 0; i < locationList.length; i++) {
                        if (locationList[i].name === locationCode) {
                            mapLocation = locationList[i];
                            break;
                        }
                        if (locationList[i].name === 'All Campuses') {
                            mapLocation = locationList[i];
                        }
                    }

                    var mapTypeId = 'UCSF Custom Map';
                    var mapStyle = [
                        {featureType:"administrative", elementType:"all", stylers:[{hue:"#dae6c3"},{saturation:22},{lightness:-5}]},
                        {featureType:"landscape", elementType:"all", stylers:[{hue:"#dae6c3"},{saturation:16},{lightness:-7}]},
                        {featureType:"road", elementType:"geometry", stylers:[{hue:"#ffffff"},{saturation:-100},{lightness:100}]},
                        {featureType: "road.local", elementType: "labels", stylers: [{ visibility: "off" }]}
                    ];

                    var styledMap = new google.maps.StyledMapType(mapStyle);

                    var mapType = new google.maps.ImageMapType({
                        tileSize: new google.maps.Size(256,256),
                        getTileUrl: function(coord,zoom) {
                            return "http://apis.ucsf.edu/map/tile/"+zoom+"/"+coord.x+"/"+coord.y;
                        }
                    });

                    var map = new google.maps.Map(document.getElementById("map_canvas"),
                        {center:new google.maps.LatLng(mapLocation.lat,mapLocation.lon),
                            mapTypeId:google.maps.MapTypeId.ROADMAP,
                            zoom:mapLocation.zoom,
                            mapTypeControl:false}
                            );
                    map.overlayMapTypes.insertAt(0, mapType);

                    map.mapTypes.set(mapTypeId, styledMap);
                    map.setMapTypeId(mapTypeId);

                    if (mapLocation.marker) {
                        google.maps.event.addListener(
                            new google.maps.Marker({
                                position: new google.maps.LatLng(mapLocation.lat, mapLocation.lon),
                                map: map,
                                title: mapLocation.name }),
                            'click',
                            function(){
                                var info = new google.maps.InfoWindow({
                                    content: "<div>" + mapLocation.name + "</div><div><a href=\"https://maps.google.com/maps?daddr=" +
                                    mapLocation.lat + "," + mapLocation.lon + "\">Directions</a></div>",
                                    position: new google.maps.LatLng(mapLocation.lat, mapLocation.lon)
                                });
                                info.open(map);
                            }
                        );
                    }
                };

                if (! $window.google || ! $window.google.maps) {
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = "http://maps.googleapis.com/maps/api/js?&sensor=false&callback=ucsfMapsCallback";
                    document.body.appendChild(script);
                } else {
                    $window.ucsfMapsCallback();
                }
            }
        ]
    );
}());




