var ucsf = ucsf || {};
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
            function(c,p,i){var _=this;_.b(i=i||"");_.b("<form id=\"ucsf_shuttle_trip_form\" action=\"/shuttle/planner/\"><h2>Trip Planner</h2><select name=\"begin\" id=\"ucsf_shuttle_starting_from\">");if(_.s(_.f("stops",c,p,1),c,p,0,145,221,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<option value=\"");if(_.s(_.f("id",c,p,1),c,p,0,167,186,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.v(_.f("agencyId",c,p,0)));_.b("_");_.b(_.v(_.f("id",c,p,0)));});c.pop();}_.b("\">From ");_.b(_.v(_.f("stopName",c,p,0)));_.b("</option>");});c.pop();}_.b("</select>");if(!_.s(_.f("stops",c,p,1),c,p,1,0,0,"")){_.b("<p>Content could not be loaded.</p>");}_.b("<button type=\"button\" id=\"reverse_trip\" class=\"reverse_trip\">&uarr;&darr;</button><select name=\"end\" id=\"ucsf_shuttle_ending_at\">");if(_.s(_.f("stops",c,p,1),c,p,0,434,508,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<option value=\"");if(_.s(_.f("id",c,p,1),c,p,0,456,475,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.v(_.f("agencyId",c,p,0)));_.b("_");_.b(_.v(_.f("id",c,p,0)));});c.pop();}_.b("\">To ");_.b(_.v(_.f("stopName",c,p,0)));_.b("</option>");});c.pop();}_.b("</select>");if(!_.s(_.f("stops",c,p,1),c,p,1,0,0,"")){_.b("<p>Content could not be loaded.</p>");}_.b("<fieldset disabled name=\"datetime\"><legend><select class=\"compact\" name=\"when\" onchange=\"form.datetime.disabled = value=='now'\"><option value=\"now\">Leave now</option><option value=\"depart\">Depart at</option><option value=\"arrive\">Arrive by</option></select></legend><select class=\"compact\" name=\"time\"><option value=\"6:00am\">6:00am</option><option value=\"6:15am\">6:15am</option><option value=\"6:30am\">6:30am</option><option value=\"6:45am\">6:45am</option><option value=\"7:00am\">7:00am</option><option value=\"7:15am\">7:15am</option><option value=\"7:30am\">7:30am</option><option value=\"7:45am\">7:45am</option><option value=\"8:00am\">8:00am</option><option value=\"8:15am\">8:15am</option><option value=\"8:30am\">8:30am</option><option value=\"8:45am\">8:45am</option><option value=\"9:00am\">9:00am</option><option value=\"9:15am\">9:15am</option><option value=\"9:30am\">9:30am</option><option value=\"9:45am\">9:45am</option><option value=\"10:00am\">10:00am</option><option value=\"10:15am\">10:15am</option><option value=\"10:30am\">10:30am</option><option value=\"10:45am\">10:45am</option><option value=\"11:00am\">11:00am</option><option value=\"11:15am\">11:15am</option><option value=\"11:30am\">11:30am</option><option value=\"11:45am\">11:45am</option><option value=\"12:00pm\">12:00pm</option><option value=\"12:15pm\">12:15pm</option><option value=\"12:30pm\">12:30pm</option><option value=\"12:45pm\">12:45pm</option><option value=\"1:00pm\">1:00pm</option><option value=\"1:15pm\">1:15pm</option><option value=\"1:30pm\">1:30pm</option><option value=\"1:45pm\">1:45pm</option><option value=\"2:00pm\">2:00pm</option><option value=\"2:15pm\">2:15pm</option><option value=\"2:30pm\">2:30pm</option><option value=\"2:45pm\">2:45pm</option><option value=\"3:00pm\">3:00pm</option><option value=\"3:15pm\">3:15pm</option><option value=\"3:30pm\">3:30pm</option><option value=\"3:45pm\">3:45pm</option><option value=\"4:00pm\">4:00pm</option><option value=\"4:15pm\">4:15pm</option><option value=\"4:30pm\">4:30pm</option><option value=\"4:45pm\">4:45pm</option><option value=\"5:00pm\">5:00pm</option><option value=\"5:15pm\">5:15pm</option><option value=\"5:30pm\">5:30pm</option><option value=\"5:45pm\">5:45pm</option><option value=\"6:00pm\">6:00pm</option><option value=\"6:15pm\">6:15pm</option><option value=\"6:30pm\">6:30pm</option><option value=\"6:45pm\">6:45pm</option><option value=\"7:00pm\">7:00pm</option><option value=\"7:15pm\">7:15pm</option><option value=\"7:30pm\">7:30pm</option><option value=\"7:45pm\">7:45pm</option><option value=\"8:00pm\">8:00pm</option><option value=\"8:15pm\">8:15pm</option><option value=\"8:30pm\">8:30pm</option><option value=\"8:45pm\">8:45pm</option><option value=\"9:00pm\">9:00pm</option></select><select class=\"compact\" name=\"date\"><option value=\"0\">Today</option><option value=\"1\">Tomorrow</option><option value=\"2\">In 2 days</option><option value=\"3\">In 3 days</option></select></fieldset><input type=\"submit\" name=\"route\" value=\"Route Trip\"  /></form>");return _.fl();}
        );
        formContainer.innerHTML = template.render(response);

        var form = document.getElementById('ucsf_shuttle_trip_form'),
            start = form.begin,
            end = form.end;

        // If there are query parameters, set forms using that, otherwise current time + localstorage.
        var search = window.location.search.replace(/\+/g," ");
        if (search) {
            var startValue = decodeURIComponent( (/[&?]begin=([^&]*)/.exec(search)||["",""])[1] ),
                endValue = decodeURIComponent( (/[&?]end=([^&]*)/.exec(search)||["",""])[1] ),
                whenValue = decodeURIComponent( (/[&?]when=([^&]*)/.exec(search)||["",""])[1] ),
                timeValue = decodeURIComponent( (/[&?]time=([^&]*)/.exec(search)||["",""])[1] ),
                dateValue = decodeURIComponent( (/[&?]date=([^&]*)/.exec(search)||["",""])[1] );

            start.value = startValue || start.value;
            end.value = endValue || end.value;
            form.when.value = whenValue || form.when.value;
            form.time.value = timeValue || form.time.value;
            form.date.value = dateValue || form.date.value;
            me.plan();
        } else {
            form.time.value = formatTime(Date.now(),{minutesIncrement:15});

            // Should store value, not index, in localStorage for saved start/stop points, but need to then provide
            //       that value to querySelector() in a way that rules out the possibility of code injection. For now,
            //       just doing the index for security.

            if (Modernizr.localstorage && start && end) {
                if (localStorage.shuttle_start) {
                    start.selectedIndex = parseInt(localStorage.shuttle_start, 10);
                } else {
                    var from = start.querySelector('option[value="ucsf_Parnassus"]');
                    if (from) {
                        start.selectedIndex = from.index;
                    }
                }
                if (localStorage.shuttle_end) {
                    end.selectedIndex = parseInt(localStorage.shuttle_end, 10);
                } else {
                    var to = end.querySelector('option[value="ucsf_MB"]');
                    if (to) {
                        end.selectedIndex = to.index;
                    }
                }
            }
        }

        form.datetime.disabled = form.when.value==="now";

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

    function renderList(listName, response, templateFunction) {
        var list = document.getElementById('ucsf_shuttle_list_'+listName);
        if (!list) {
            return;
        }
        list.innerHTML = new Hogan.Template(templateFunction).render(response);
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

    // Compares on stopName if it's there, otherwise routeShortName.
    function compare(a,b) {
        var compareOn = a.stopName ? 'stopName' : 'routeShortName';
        if (a[compareOn] < b[compareOn]) {
            return -1;
        }
        if (a[compareOn] > b[compareOn]) {
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

    me.renderStops = function (response) {
        response.stops = response.stops || dataFromLocalStorage('shuttle_stops');

        // Sort alphabetically by stopName
        if (response.stops) {
            response.stops.sort(compare);
        }

        renderForm(response);
        renderList(
            'location',
            response,
            function(c,p,i){var _=this;_.b(i=i||"");_.b("<h2>Shuttles By Location</h2><ol>");if(_.s(_.f("stops",c,p,1),c,p,0,43,123,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><a href=\"/shuttle/list/?");if(_.s(_.f("id",c,p,1),c,p,0,87,93,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.v(_.f("id",c,p,0)));});c.pop();}_.b("\">");_.b(_.v(_.f("stopName",c,p,0)));_.b("</a></li>");});c.pop();}_.b("</ol>");if(!_.s(_.f("stops",c,p,1),c,p,1,0,0,"")){_.b("<p>Could not load content.</p>");}return _.fl();}
        );

        dataToLocalStorage('shuttle_stops', response.stops);
    };

    me.renderRoutes = function (response) {
        response.routes = response.routes || dataFromLocalStorage('shuttle_routes');

        // Sort alphabetically by routeName
        if (response.routes) {
            response.routes.sort(compare);
        }

        renderList(
            'color',
            response,
            function(c,p,i){var _=this;_.b(i=i||"");_.b("<h2>Shuttles ");if(_.s(_.f("stop",c,p,1),c,p,0,22,38,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("for ");_.b(_.v(_.f("stopName",c,p,0)));});c.pop();}_.b("</h2><ol>");if(_.s(_.f("routes",c,p,1),c,p,0,67,205,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><a href=\"/shuttle/schedule/route?");if(_.s(_.f("id",c,p,1),c,p,0,108,114,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.v(_.f("id",c,p,0)));});c.pop();}_.b("\"><div class=\"shuttle-color ");if(_.s(_.f("id",c,p,1),c,p,0,156,162,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.v(_.f("id",c,p,0)));});c.pop();}_.b("\"></div> ");_.b(_.v(_.f("routeShortName",c,p,0)));_.b("</a></li>");});c.pop();}_.b("</ol>");if(!_.s(_.f("routes",c,p,1),c,p,1,0,0,"")){_.b("<p>Could not load content.</p>");}return _.fl();}
        );

        dataToLocalStorage('shuttle_routes', response.routes);
    };

    me.renderScheduleMenu = function (response) {
        var resultsElement = document.getElementById('ucsf_shuttle_schedule');
        if (resultsElement) {
            var template = new Hogan.Template(
                function(c,p,i){var _=this;_.b(i=i||"");if(_.s(_.f("route",c,p,1),c,p,0,10,123,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<h2>");_.b(_.v(_.f("routeShortName",c,p,0)));_.b(" Shuttle Schedule</h2><ol id=\"ucsf-schedule-container\" data-routeId=\"");if(_.s(_.f("id",c,p,1),c,p,0,108,114,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.v(_.f("id",c,p,0)));});c.pop();}_.b("\">");});c.pop();}if(_.s(_.f("stops",c,p,1),c,p,0,143,658,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><a href=\"#\" data-stopId=\"");if(_.s(_.f("id",c,p,1),c,p,0,179,185,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.v(_.f("id",c,p,0)));});c.pop();}_.b("\" onclick=\"ucsf.shuttle.renderSchedule.target=this;ucsf.shuttle.renderSchedule.startTime=new Date().setHours(0,0,0,0);UCSF.Shuttle.times({apikey:'c631ef46e918c82cf81ef4869f0029d4',");if(_.s(_.f("id",c,p,1),c,p,0,379,395,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("stopId:'");_.b(_.v(_.f("id",c,p,0)));_.b("',");});c.pop();}_.b("routeId:document.getElementById('ucsf-schedule-container').getAttribute('data-routeId'),startTime:ucsf.shuttle.renderSchedule.startTime,endTime:ucsf.shuttle.renderSchedule.startTime+86399999},ucsf.shuttle.renderSchedule);return false\">");_.b(_.v(_.f("stopName",c,p,0)));_.b("</a></li>");});c.pop();}_.b("</ol>");if(!_.s(_.f("stops",c,p,1),c,p,1,0,0,"")){_.b("<p>Could not load content.</p>");}return _.fl();}
            );
            resultsElement.innerHTML = template.render(response);
        }
    };

    me.renderSchedule = function(response) {
        response.date = me.renderSchedule.startTime || Date.now();
        response.formattedDate = new Date(response.date).toDateString();

        if (response.times && response.times instanceof Array && response.times.length > 0) {
            for (var i=0, l=response.times.length; i<l; i++) {
                response.times[i].formattedTime = formatTime(response.times[i].time * 1000);
            }
        }
        var target = ucsf.shuttle.renderSchedule.target;
        if (target && target.innerHTML) {
            var template = new Hogan.Template(
                function(c,p,i){var _=this;_.b(i=i||"");_.b("<h3>");_.b(_.v(_.f("formattedDate",c,p,0)));_.b("</h3><button onclick=\"ucsf.shuttle.renderSchedule.startTime=");_.b(_.v(_.f("date",c,p,0)));_.b("-86400000;ucsf.shuttle.renderSchedule.target=this.parentNode.previousSibling;UCSF.Shuttle.times({apikey:'c631ef46e918c82cf81ef4869f0029d4',stopId:ucsf.shuttle.renderSchedule.target.getAttribute('data-stopId'),routeId:document.getElementById('ucsf-schedule-container').getAttribute('data-routeId'),startTime:ucsf.shuttle.renderSchedule.startTime,endTime:ucsf.shuttle.renderSchedule.startTime+86399999},ucsf.shuttle.renderSchedule)\">Previous Day</button><button onclick=\"ucsf.shuttle.renderSchedule.startTime=");_.b(_.v(_.f("date",c,p,0)));_.b("+86400000;ucsf.shuttle.renderSchedule.target=this.parentNode.previousSibling;UCSF.Shuttle.times({apikey:'c631ef46e918c82cf81ef4869f0029d4',stopId:ucsf.shuttle.renderSchedule.target.getAttribute('data-stopId'),routeId:document.getElementById('ucsf-schedule-container').getAttribute('data-routeId'),startTime:ucsf.shuttle.renderSchedule.startTime,endTime:ucsf.shuttle.renderSchedule.startTime+86399999},ucsf.shuttle.renderSchedule)\">Next Day</button><ol class=\"shuttle-times-listing\">");if(_.s(_.f("times",c,p,1),c,p,0,1118,1144,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li>");_.b(_.v(_.f("formattedTime",c,p,0)));_.b("</li>");});c.pop();}if(!_.s(_.f("times",c,p,1),c,p,1,0,0,"")){_.b("<li>No times found for selected date.</li>");}_.b("</ol>");return _.fl();}
            );
            var resultsHTML = template.render(response);
            if (target.nextSibling) {
                target.nextSibling.innerHTML = resultsHTML;
            } else {
                var resultsElement = document.createElement('div');
                resultsElement.innerHTML = resultsHTML;
                target.parentNode.insertBefore(resultsElement);
            }
        }
    };

    me.renderTrip = function (response) {
         var plan = response.plan || {};

        // For each itinerary: add index; format startTime, endTime, and duration
        if (plan.hasOwnProperty('itineraries')) {
            // Used to check that the plan is within four hours of the target time.
            var datestamp = plan.date ? plan.date : Date.now();
            // Used to check that the plan is within four hours of the target time.
            var fourHours = 4 * 60 * 60 * 1000;


            var index=1;
            var itinerariesCount = plan.itineraries.length;
            var removalQueue = [];
            var massagedLeg;
            var tripSteps;
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
                        tripSteps = plan.itineraries[i].legs.length;
                        for (var j=0; j<tripSteps; j++) {
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
            function(c,p,i){var _=this;_.b(i=i||"");_.b("<h2>Suggested Routes</h2>");if(_.s(_.f("itineraries",c,p,1),c,p,0,41,568,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<div><h3>Option ");_.b(_.v(_.f("index",c,p,0)));_.b("</h3><h4>");_.b(_.v(_.f("startTimeFormatted",c,p,0)));_.b(" - ");_.b(_.v(_.f("endTimeFormatted",c,p,0)));_.b(" (");_.b(_.v(_.f("durationFormatted",c,p,0)));_.b(" mins)</h4><ol>");if(_.s(_.f("legs",c,p,1),c,p,0,167,548,"{{ }}")){_.rs(c,p,function(c,p,_){if(_.s(_.f("bus",c,p,1),c,p,0,175,459,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><ul><li><strong>From:</strong> ");_.b(_.v(_.f("fromName",c,p,0)));_.b("</li><li><strong>To:</strong> ");_.b(_.v(_.f("toName",c,p,0)));_.b("</li><li><strong>Shuttle:</strong> ");_.b(_.v(_.f("route",c,p,0)));_.b(" <div class=\"shuttle-color ");_.b(_.v(_.f("routeId",c,p,0)));_.b("\"></div></li><li><strong>Depart:</strong> ");_.b(_.v(_.f("startTime",c,p,0)));_.b("</li><li><strong>Arrive:</strong> ");_.b(_.v(_.f("endTime",c,p,0)));_.b("</li></ul></li>");});c.pop();}if(_.s(_.f("walk",c,p,1),c,p,0,476,539,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><ul><li><strong>Walk to:</strong> ");_.b(_.v(_.f("toName",c,p,0)));_.b("</li></ul></li>");});c.pop();}});c.pop();}_.b("</ol></div>");});c.pop();}if(!_.s(_.f("itineraries",c,p,1),c,p,1,0,0,"")){_.b("<p>No options found.</p>");}return _.fl();}
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

            date.setDate(date.getDate() + parseInt(form.date.value, 10));
            options.date = (date.getMonth()+1) + '/' + (date.getDate()) + '/' + date.getFullYear();
        }
        var resultsElement = document.getElementById('ucsf_shuttle_itineraries');
        resultsElement.innerHTML='<div><section class="center"><progress><div class="spinner"></div></progress></section></div>';
        UCSF.Shuttle.plan(options, ucsf.shuttle.renderTrip);
        me.save();
    };

    return me;
}());

Modernizr.load({
    load: 'http://apis.ucsf.edu/static/UCSF.Shuttle.js',
    callback: function () {
        var apikey='c631ef46e918c82cf81ef4869f0029d4';
        UCSF.Shuttle.stops({apikey:apikey}, ucsf.shuttle.renderStops);
        if (window.location.pathname === "/shuttle/list/") {
            UCSF.Shuttle.routes({apikey:apikey, stopId:decodeURIComponent(window.location.search.substr(1))}, ucsf.shuttle.renderRoutes);
        }
        if ((window.location.pathname === "/shuttle/schedule/route/") && window.location.search) {
            UCSF.Shuttle.stops({apikey:apikey, routeId:decodeURIComponent(window.location.search.substr(1))}, ucsf.shuttle.renderScheduleMenu);
        }
    }
});