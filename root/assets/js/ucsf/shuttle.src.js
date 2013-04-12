ucsf.shuttle = (function () {
	var me = {};

    me.save = function () {
        if(Modernizr.localstorage) {
            localStorage.shuttle_start = document.getElementById("ucsf_shuttle_starting_from").selectedIndex;
            localStorage.shuttle_end = document.getElementById("ucsf_shuttle_ending_at").selectedIndex;
        }
    };

    //TODO: Is this still needed after we eliminate the PHP stuff?
    me.swap = function () {
        if(Modernizr.localstorage){
            var temp = localStorage.shuttle_start;
            localStorage.shuttle_start = localStorage.shuttle_end;
            localStorage.shuttle_end = temp;
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
            function(c,p,i){var _=this;_.b(i=i||"");_.b("<form action=\"javascript:ucsf.shuttle.plan()\"><h2>Trip Planner</h2><select name=\"begin\" id=\"ucsf_shuttle_starting_from\">");if(_.s(_.f("stops",c,p,1),c,p,0,130,193,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<option value=\"");if(_.s(_.f("id",c,p,1),c,p,0,152,158,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.v(_.f("id",c,p,0)));});c.pop();}_.b("\">From ");_.b(_.v(_.f("stopName",c,p,0)));_.b("</option>");});c.pop();}_.b("</select>");if(!_.s(_.f("stops",c,p,1),c,p,1,0,0,"")){_.b("<p>Content could not be loaded.</p>");}_.b("<button type=\"button\" id=\"reverse_trip\" class=\"reverse_trip\">&uarr;&darr;</button><select name=\"end\" id=\"ucsf_shuttle_ending_at\">");if(_.s(_.f("stops",c,p,1),c,p,0,406,467,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<option value=\"");if(_.s(_.f("id",c,p,1),c,p,0,428,434,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.v(_.f("id",c,p,0)));});c.pop();}_.b("\">To ");_.b(_.v(_.f("stopName",c,p,0)));_.b("</option>");});c.pop();}_.b("</select>");if(!_.s(_.f("stops",c,p,1),c,p,1,0,0,"")){_.b("<p>Content could not be loaded.</p>");}_.b("<input type=\"submit\" name=\"route\" value=\"Route Trip\"  /></form>");return _.fl();}
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

    me.plan = function () {
        //TODO: plan a trip
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

