ucsf.shuttle = (function () {
	var me = {};

    function formatTime(timestamp, options) {
        options = options || {};
        var date = new Date(timestamp);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var minutesIncrement = options.minutesIncrement ? options.minutesIncrement : 1;
        minutes = Math.floor(minutes/minutesIncrement) * minutesIncrement;
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        return hours + ':' + minutes + ampm;
    }

    function renderForm(response) {
        var formContainer = document.getElementById('ucsf_shuttle_trip_form_container');

        if (! formContainer) {
            return;
        }

        var template = new Hogan.Template(
            function(c,p,i){var _=this;_.b(i=i||"");_.b("<form id=\"ucsf_shuttle_trip_form\" action=\"javascript:ucsf.shuttle.plan()\"><h2>Trip Planner</h2><select name=\"begin\" id=\"ucsf_shuttle_starting_from\">");if(_.s(_.f("stops",c,p,1),c,p,0,130,206,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<option value=\"");if(_.s(_.f("id",c,p,1),c,p,0,152,171,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.v(_.f("agencyId",c,p,0)));_.b("_");_.b(_.v(_.f("id",c,p,0)));});c.pop();}_.b("\">From ");_.b(_.v(_.f("stopName",c,p,0)));_.b("</option>");});c.pop();}_.b("</select>");if(!_.s(_.f("stops",c,p,1),c,p,1,0,0,"")){_.b("<p>Content could not be loaded.</p>");}_.b("<button type=\"button\" id=\"reverse_trip\" class=\"reverse_trip\">&uarr;&darr;</button><select name=\"end\" id=\"ucsf_shuttle_ending_at\">");if(_.s(_.f("stops",c,p,1),c,p,0,419,493,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<option value=\"");if(_.s(_.f("id",c,p,1),c,p,0,441,460,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.v(_.f("agencyId",c,p,0)));_.b("_");_.b(_.v(_.f("id",c,p,0)));});c.pop();}_.b("\">To ");_.b(_.v(_.f("stopName",c,p,0)));_.b("</option>");});c.pop();}_.b("</select>");if(!_.s(_.f("stops",c,p,1),c,p,1,0,0,"")){_.b("<p>Content could not be loaded.</p>");}_.b("<fieldset disabled name=\"datetime\"><legend><select class=\"compact\" name=\"when\" onchange=\"form.datetime.disabled = value=='now'\"><option value=\"now\">Leave now</option><option value=\"depart\">Depart at</option><option value=\"arrive\">Arrive by</option></select></legend><select class=\"compact\" name=\"date\"><option value=\"today\">Today</option><option value=\"tomorrow\">Tomorrow</option></select><select class=\"compact\" name=\"time\"><option value=\"6:00am\">6:00am</option><option value=\"6:15am\">6:15am</option><option value=\"6:30am\">6:30am</option><option value=\"6:45am\">6:45am</option><option value=\"7:00am\">7:00am</option><option value=\"7:15am\">7:15am</option><option value=\"7:30am\">7:30am</option><option value=\"7:45am\">7:45am</option><option value=\"8:00am\">8:00am</option><option value=\"8:15am\">8:15am</option><option value=\"8:30am\">8:30am</option><option value=\"8:45am\">8:45am</option><option value=\"9:00am\">9:00am</option><option value=\"9:15am\">9:15am</option><option value=\"9:30am\">9:30am</option><option value=\"9:45am\">9:45am</option><option value=\"10:00am\">10:00am</option><option value=\"10:15am\">10:15am</option><option value=\"10:30am\">10:30am</option><option value=\"10:45am\">10:45am</option><option value=\"11:00am\">11:00am</option><option value=\"11:15am\">11:15am</option><option value=\"11:30am\">11:30am</option><option value=\"11:45am\">11:45am</option><option value=\"12:00pm\">12:00pm</option><option value=\"12:15pm\">12:15pm</option><option value=\"12:30pm\">12:30pm</option><option value=\"12:45pm\">12:45pm</option><option value=\"1:00pm\">1:00pm</option><option value=\"1:15pm\">1:15pm</option><option value=\"1:30pm\">1:30pm</option><option value=\"1:45pm\">1:45pm</option><option value=\"2:00pm\">2:00pm</option><option value=\"2:15pm\">2:15pm</option><option value=\"2:30pm\">2:30pm</option><option value=\"2:45pm\">2:45pm</option><option value=\"3:00pm\">3:00pm</option><option value=\"3:15pm\">3:15pm</option><option value=\"3:30pm\">3:30pm</option><option value=\"3:45pm\">3:45pm</option><option value=\"4:00pm\">4:00pm</option><option value=\"4:15pm\">4:15pm</option><option value=\"4:30pm\">4:30pm</option><option value=\"4:45pm\">4:45pm</option><option value=\"5:00pm\">5:00pm</option><option value=\"5:15pm\">5:15pm</option><option value=\"5:30pm\">5:30pm</option><option value=\"5:45pm\">5:45pm</option><option value=\"6:00pm\">6:00pm</option><option value=\"6:15pm\">6:15pm</option><option value=\"6:30pm\">6:30pm</option><option value=\"6:45pm\">6:45pm</option><option value=\"7:00pm\">7:00pm</option><option value=\"7:15pm\">7:15pm</option><option value=\"7:30pm\">7:30pm</option><option value=\"7:45pm\">7:45pm</option><option value=\"8:00pm\">8:00pm</option><option value=\"8:15pm\">8:15pm</option><option value=\"8:30pm\">8:30pm</option><option value=\"8:45pm\">8:45pm</option><option value=\"9:00pm\">9:00pm</option></select></fieldset><input type=\"submit\" name=\"route\" value=\"Route Trip\"  /></form>");return _.fl();}
        );
        formContainer.innerHTML = template.render(response);

        var now = formatTime(Date.now(),{minutesIncrement:15});
        document.getElementById('ucsf_shuttle_trip_form').time.value = now;

        var start = document.getElementById('ucsf_shuttle_starting_from'),
            end = document.getElementById('ucsf_shuttle_ending_at');

        // Should store value, not index, in localStorage for saved start/stop points, but need to then provide
        //       that value to querySelector() in a way that rules out the possibility of code injection. For now,
        //       just doing the index for security.

        if (Modernizr.localstorage && start && end) {
            if (localStorage.shuttle_start) {
                start.selectedIndex = parseInt(localStorage.shuttle_start, 10);
            } else {
                var from = start.querySelector('option[value="Parnassus"]');
                if (from) {
                    start.selectedIndex = from.index;
                }
            }
            if (localStorage.shuttle_end) {
                end.selectedIndex = parseInt(localStorage.shuttle_end, 10);
            } else {
                var to = end.querySelector('option[value="MB"]');
                if (to) {
                    end.selectedIndex = to.index;
                }
            }
        }

        var reverseButton = document.getElementById('reverse_trip');
        if (reverseButton) {
            reverseButton.onclick = function () {
                var temp;
                if (start && end) {
                    temp = start.selectedIndex;
                    start.selectedIndex = end.selectedIndex;
                    end.selectedIndex = temp;
                }
            };
        }
    }

    function renderListLocation(response) {
        var listLocation = document.getElementById('ucsf_shuttle_list_location');

        if (!listLocation) {
            return;
        }

        var template = new Hogan.Template(
            function(c,p,i){var _=this;_.b(i=i||"");_.b("<h2>Shuttles By Location</h2><ol>");if(_.s(_.f("stops",c,p,1),c,p,0,43,123,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><a href=\"/shuttle/list/color/?id=");if(_.s(_.f("id",c,p,1),c,p,0,87,93,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.v(_.f("id",c,p,0)));});c.pop();}_.b("\">");_.b(_.v(_.f("stopName",c,p,0)));_.b("</a></li>");});c.pop();}_.b("</ol>");if(!_.s(_.f("stops",c,p,1),c,p,1,0,0,"")){_.b("<p>Could not load content.</p>");}return _.fl();}
        );

        listLocation.innerHTML = template.render(response);
    }

    function dataFromLocalStorage(key) {
        var rv = null;
        if (Modernizr.localstorage && localStorage[key]) {
            try {
                rv = JSON.parse(localStorage[key]);
            } catch(e) {
                // localStorage JSON string is corrupt. delete it.
                localStorage.removeItem('shuttle_stops');
            }
        }
        return rv;
    }

    function dataToLocalStorage(key, value) {
        if (Modernizr.localstorage && value) {
            localStorage[key] = JSON.stringify(value);
        }
    }

    function compare(a,b) {
        if (a.stopName < b.stopName) {
            return -1;
        }
        if (a.stopName > b.stopName) {
            return 1;
        }
        return 0;
    }

    me.save = function () {
        if(Modernizr.localstorage) {
            localStorage.shuttle_start = document.getElementById("ucsf_shuttle_starting_from").selectedIndex;
            localStorage.shuttle_end = document.getElementById("ucsf_shuttle_ending_at").selectedIndex;
        }
    };

    me.renderStopData = function (response) {
        response.stops = response.stops || dataFromLocalStorage('shuttle_stops');

        // Sort alphabetically by stopName
        if (response.stops) {
            response.stops.sort(compare);
        }

        renderForm(response);
        renderListLocation(response);

        dataToLocalStorage('shuttle_stops', response.stops);
    };

    me.renderRouteData = function (response) {
        response.routes = response.routes || dataFromLocalStorage('shuttle_routes');

        if (response.routes) {
            response.routes.sort(compare);
        }

        //TODO:
        //renderListColor(response);

        dataToLocalStorage('shuttle_routes', response.routes);
    };

    me.renderTrip = function (response) {
         var plan = response.plan || {};

         //TODO: Ugh, can't route if a destination is a station. But if you substitute 
         //     a lat/long, you can end up with pointless walking instructions at end.

        // For each itinerary: add index; format startTime, endTime, and duration
        if (plan.hasOwnProperty('itineraries')) {
            // Used to check that the plan is within four hours of the target time.
            var datestamp = plan.date ? plan.date : Date.now();
            // Used to check that the plan is within four hours of the target time.
            var fourHours = 4 * 60 * 60 * 1000;


            var index=1;
            var itinerariesCount = plan.itineraries.length;
            var removalQueue = [];
            // Decrement with while rather than increment with for so that splice() doesn't mess up the loop
            for (var i=0; i<itinerariesCount; i++) {
                // Only use itineraries that are less than 2 hours (e.g., not overnight)
                // This check should probably be happening on the server side.
                // Then check that the time is within four hours of what was chosen
                // so the user doesn't get a trip for the next day.
                if ((plan.itineraries[i].duration < 2 * 60 * 60 * 1000) &&
                    (plan.itineraries[i].endTime >= datestamp - fourHours) &&
                    (plan.itineraries[i].endTime <= datestamp + fourHours)) {
                    plan.itineraries[i].index = index;
                    index++;
                    plan.itineraries[i].startTimeFormatted = formatTime(plan.itineraries[i].startTime);
                    plan.itineraries[i].endTimeFormatted = formatTime(plan.itineraries[i].endTime);
                    plan.itineraries[i].durationFormatted = Math.round(plan.itineraries[i].duration / (60 * 1000));
                    if (plan.itineraries[i].hasOwnProperty('legs')) {
                        var massagedLeg;
                        for (var j=0; j<plan.itineraries[i].legs.length; j++) {
                            // For each leg: format startTime, endTime
                            massagedLeg = {};
                            massagedLeg.toName = plan.itineraries[i].legs[j].to.name;

                            if (plan.itineraries[i].legs[j].mode === "BUS") {
                                massagedLeg.fromName = plan.itineraries[i].legs[j].from.name;
                                massagedLeg.route = plan.itineraries[i].legs[j].route;
                                massagedLeg.routeId = plan.itineraries[i].legs[j].routeId;
                                massagedLeg.startTime = formatTime(plan.itineraries[i].legs[j].startTime);
                                massagedLeg.endTime = formatTime(plan.itineraries[i].legs[j].endTime);
                                plan.itineraries[i].legs[j].bus = massagedLeg;
                            }
                            if (plan.itineraries[i].legs[j].mode === "WALK") {
                                plan.itineraries[i].legs[j].walk = massagedLeg;
                            }
                        }
                    }
                } else {
                    removalQueue.push(i);
                }
            }
            // Start from end so splice() doesn't mess up
            i = removalQueue.length;
            while (i--) {
                plan.itineraries.splice(removalQueue[i],1);
            }
        }

        var template = new Hogan.Template(
            function(c,p,i){var _=this;_.b(i=i||"");_.b("<h2>Suggested Routes</h2>");if(_.s(_.f("itineraries",c,p,1),c,p,0,41,568,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<div><h3>Option ");_.b(_.v(_.f("index",c,p,0)));_.b("</h3><h4>");_.b(_.v(_.f("startTimeFormatted",c,p,0)));_.b(" - ");_.b(_.v(_.f("endTimeFormatted",c,p,0)));_.b(" (");_.b(_.v(_.f("durationFormatted",c,p,0)));_.b(" mins)</h4><ol>");if(_.s(_.f("legs",c,p,1),c,p,0,167,548,"{{ }}")){_.rs(c,p,function(c,p,_){if(_.s(_.f("bus",c,p,1),c,p,0,175,459,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><ul><li><strong>From:</strong> ");_.b(_.v(_.f("fromName",c,p,0)));_.b("</li><li><strong>To:</strong> ");_.b(_.v(_.f("toName",c,p,0)));_.b("</li><li><strong>Shuttle:</strong> ");_.b(_.v(_.f("route",c,p,0)));_.b(" <div class=\"shuttle-color ");_.b(_.v(_.f("routeId",c,p,0)));_.b("\"></div></li><li><strong>Depart:</strong> ");_.b(_.v(_.f("startTime",c,p,0)));_.b("</li><li><strong>Arrive:</strong> ");_.b(_.v(_.f("endTime",c,p,0)));_.b("</li></ul></li>");});c.pop();}if(_.s(_.f("walk",c,p,1),c,p,0,476,539,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><ul><li><strong>Go to:</strong> ");_.b(_.v(_.f("toName",c,p,0)));_.b("</li></ul></li>");});c.pop();}});c.pop();}_.b("</ol></div>");});c.pop();}if(!_.s(_.f("itineraries",c,p,1),c,p,1,0,0,"")){_.b("<p>No options found.</p>");}return _.fl();}
        );
        var resultsElement = document.getElementById('ucsf_shuttle_itineraries');
        resultsElement.innerHTML=template.render(plan);
        resultsElement.scrollIntoView();

    };

    me.plan = function () {
        var form = document.getElementById('ucsf_shuttle_trip_form'),
            options = {
                apikey:'c631ef46e918c82cf81ef4869f0029d4',
                fromPlace:form.begin.value,
                toPlace:form.end.value
            };

        if (form.when.value !== "now") {
            var date = new Date();
            options.arriveBy = form.when.value==="arrive";
            options.time = form.time.value;
            if (form.date.value === "tomorrow") {
                date.setDate(date.getDate() + 1);
            }
            options.date = (date.getMonth()+1) + '/' + (date.getDate()) + '/' + date.getFullYear();
        }
        var resultsElement = document.getElementById('ucsf_shuttle_itineraries');
        resultsElement.innerHTML='<div><section class="center"><progress>Loading...</progress></section></div>';
        UCSF.Shuttle.plan(options, ucsf.shuttle.renderTrip);
        me.save();
    };

    return me;
}());

Modernizr.load({
    load: 'http://apis.ucsf.edu/static/UCSF.Shuttle.js',
    callback: function () {
        UCSF.Shuttle.stops({apikey:'c631ef46e918c82cf81ef4869f0029d4'}, ucsf.shuttle.renderStopData);
        //TODO:
        //UCSF.Shuttle.routes({apikey:'c631ef46e918c82cf81ef4869f0029d4'}, ucsf.shuttle.renderRouteData);
    }
});

//TODO: schedules
//TODO: make sure all the old URLs work for schedules, or at least get redirected reasonably
//TODO: form should default to Parnassus and Mission Bay if nothing else is set

