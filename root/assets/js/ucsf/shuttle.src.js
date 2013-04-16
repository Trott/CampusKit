ucsf.shuttle = (function () {
	var me = {};

    function formatTime(timestamp) {
        var date = new Date(timestamp);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    }

    me.save = function () {
        if(Modernizr.localstorage) {
            localStorage.shuttle_start = document.getElementById("ucsf_shuttle_starting_from").selectedIndex;
            localStorage.shuttle_end = document.getElementById("ucsf_shuttle_ending_at").selectedIndex;
        }
    };

    me.renderForm = function (response) {
        var form = document.getElementById('ucsf_shuttle_trip_form');

        if (!response.hasOwnProperty('stops') && Modernizr.localstorage && localStorage.shuttle_stops) {
            try {
                response.stops = JSON.parse(localStorage.shuttle_stops);
            } catch(e) {
                // localStorage JSON string is corrupt. delete it.
                localStorage.removeItem('shuttle_stops');
            }
        }

        // Sort alphabetically by stopName
        if (response.hasOwnProperty('stops')) {
            response.stops.sort(function compare(a,b) {
                if (a.stopName < b.stopName) {
                    return -1;
                }
                if (a.stopName > b.stopName) {
                    return 1;
                }
                return 0;
            });
        }

        var template = new Hogan.Template(
            function(c,p,i){var _=this;_.b(i=i||"");_.b("<form action=\"javascript:ucsf.shuttle.plan()\"><h2>Trip Planner</h2><select name=\"begin\" id=\"ucsf_shuttle_starting_from\">");if(_.s(_.f("stops",c,p,1),c,p,0,130,207,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<option value=\"");if(_.s(_.f("id",c,p,1),c,p,0,152,172,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.v(_.f("agencyId",c,p,0)));_.b("_");_.b(_.v(_.f("id",c,p,0)));});c.pop();}_.b("\">From ");_.b(_.v(_.f("stopName",c,p,0)));_.b("</option>");});c.pop();}_.b("</select>");if(!_.s(_.f("stops",c,p,1),c,p,1,0,0,"")){_.b("<p>Content could not be loaded.</p>");}_.b("<button type=\"button\" id=\"reverse_trip\" class=\"reverse_trip\">&uarr;&darr;</button><select name=\"end\" id=\"ucsf_shuttle_ending_at\">");if(_.s(_.f("stops",c,p,1),c,p,0,420,495,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<option value=\"");if(_.s(_.f("id",c,p,1),c,p,0,442,462,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.v(_.f("agencyId",c,p,0)));_.b("_");_.b(_.v(_.f("id",c,p,0)));});c.pop();}_.b("\">To ");_.b(_.v(_.f("stopName",c,p,0)));_.b("</option>");});c.pop();}_.b("</select>");if(!_.s(_.f("stops",c,p,1),c,p,1,0,0,"")){_.b("<p>Content could not be loaded.</p>");}_.b("<input type=\"submit\" name=\"route\" value=\"Route Trip\"  /></form>");return _.fl();}
        );
        form.innerHTML = template.render(response);
        var start = document.getElementById('ucsf_shuttle_starting_from'),
            end = document.getElementById('ucsf_shuttle_ending_at');

        //TODO: Should store value, not index, in localStorage for saved start/stop points, but need to then provide
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

        if (Modernizr.localstorage && response.hasOwnProperty('stops')) {
            localStorage.shuttle_stops = JSON.stringify(response.stops);
        }
    };

    me.renderTrip = function (response) {
         var plan = response.plan || {};

         //TODO: Do not show an itinerary more than 2 hours from the target time

        // For each itinerary: add index; format startTime, endTime, and duration
        if (plan.hasOwnProperty('itineraries')) {
            var index = 1;
            for (var i=0; i<plan.itineraries.length; i++) {
                // Only use itineraries that are less than 2 hours (e.g., not overnight)
                if (plan.itineraries[i].duration < 2 * 60 * 60 * 1000) {
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
                    plan.itineraries.splice(i,1);
                }
            }
        }

        var template = new Hogan.Template(
            function(c,p,i){var _=this;_.b(i=i||"");_.b("<h2>Suggested Routes</h2>");if(_.s(_.f("itineraries",c,p,1),c,p,0,41,568,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<div><h3>Option ");_.b(_.v(_.f("index",c,p,0)));_.b("</h3><h4>");_.b(_.v(_.f("startTimeFormatted",c,p,0)));_.b(" - ");_.b(_.v(_.f("endTimeFormatted",c,p,0)));_.b(" (");_.b(_.v(_.f("durationFormatted",c,p,0)));_.b(" mins)</h4><ol>");if(_.s(_.f("legs",c,p,1),c,p,0,167,548,"{{ }}")){_.rs(c,p,function(c,p,_){if(_.s(_.f("bus",c,p,1),c,p,0,175,459,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><ul><li><strong>From:</strong> ");_.b(_.v(_.f("fromName",c,p,0)));_.b("</li><li><strong>To:</strong> ");_.b(_.v(_.f("toName",c,p,0)));_.b("</li><li><strong>Shuttle:</strong> ");_.b(_.v(_.f("route",c,p,0)));_.b(" <div class=\"shuttle-color ");_.b(_.v(_.f("routeId",c,p,0)));_.b("\"></div></li><li><strong>Depart:</strong> ");_.b(_.v(_.f("startTime",c,p,0)));_.b("</li><li><strong>Arrive:</strong> ");_.b(_.v(_.f("endTime",c,p,0)));_.b("</li></ul></li>");});c.pop();}if(_.s(_.f("walk",c,p,1),c,p,0,476,539,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><ul><li><strong>Walk to:</strong> ");_.b(_.v(_.f("toName",c,p,0)));_.b("</li></ul></li>");});c.pop();}});c.pop();}_.b("</ol></div>");});c.pop();}if(!_.s(_.f("itineraries",c,p,1),c,p,1,0,0,"")){_.b("<p>No options found.</p>");}return _.fl();}
        );
        document.getElementById('ucsf_shuttle_itineraries').innerHTML=template.render(plan);
    };

    me.plan = function () {
        //TODO: send time/date to UCSF.Shuttle.plan()
        //TODO: send arriveBy to UCSF.Shuttle.plan()
        UCSF.Shuttle.plan(
            {
                apikey:'c631ef46e918c82cf81ef4869f0029d4',
                fromPlace:document.getElementById('ucsf_shuttle_starting_from').value,
                toPlace:document.getElementById('ucsf_shuttle_ending_at').value
            },
            ucsf.shuttle.renderTrip
        );
        me.save();
    };

    return me;
}());

Modernizr.load({
    load: 'http://apis.ucsf.edu/static/UCSF.Shuttle.js',
    callback: function () {
        var form = document.getElementById('ucsf_shuttle_trip_form');
        if (form) {
            UCSF.Shuttle.stops({apikey:'c631ef46e918c82cf81ef4869f0029d4'}, ucsf.shuttle.renderForm);
        }

    }
});

