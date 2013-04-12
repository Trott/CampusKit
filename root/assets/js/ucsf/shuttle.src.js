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
        var form = document.getElementById('ucsf_shuttle_trip_form'),
            start = document.getElementById('ucsf_shuttle_starting_from'),
            end = document.getElementById('ucsf_shuttle_ending_at');
        var template = new Hogan.Template(
            function(c,p,i){var _=this;_.b(i=i||"");_.b("<form action=\"javascript:ucsf.shuttle.plan()\"><h2>Trip Planner</h2><select name=\"begin\" id=\"ucsf_shuttle_starting_from\">");if(_.s(_.f("stops",c,p,1),c,p,0,130,193,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<option value=\"");if(_.s(_.f("id",c,p,1),c,p,0,152,158,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.v(_.f("id",c,p,0)));});c.pop();}_.b("\">From ");_.b(_.v(_.f("stopName",c,p,0)));_.b("</option>");});c.pop();}if(!_.s(_.f("stops",c,p,1),c,p,1,0,0,"")){_.b("<p>Content could not be loaded.</p>");}_.b("</select><button type=\"button\" id=\"reverse_trip\" class=\"reverse_trip\">&uarr;&darr;</button><select name=\"end\" id=\"ucsf_shuttle_ending_at\">");if(_.s(_.f("stops",c,p,1),c,p,0,406,469,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<option value=\"");if(_.s(_.f("id",c,p,1),c,p,0,428,434,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(_.v(_.f("id",c,p,0)));});c.pop();}_.b("\">From ");_.b(_.v(_.f("stopName",c,p,0)));_.b("</option>");});c.pop();}if(!_.s(_.f("stops",c,p,1),c,p,1,0,0,"")){_.b("<p>Content could not be loaded.</p>");}_.b("</select><input type=\"submit\" name=\"route\" value=\"Route Trip\"  /></form>");return _.fl();}
        );
        form.innerHTML = template.render(response);
        //TODO: Get JSON, render Hogan template
        //TODO: if we can't get stops from network, use localstorage?
        //TODO: sort the results!

        if (Modernizr.localstorage) {
            if (localStorage.shuttle_start) {
                start.selectedIndex = parseInt(localStorage.shuttle_start, 10);
            }
            if (localStorage.shuttle_end) {
                end.selectedIndex = parseInt(localStorage.shuttle_end, 10);
            }
        }

        var reverseButton = document.getElementById('reverse_trip');
        if (reverseButton !== null) {
            reverseButton.onclick = function () {
                var temp;
                if (start !== null && end !== null) {
                    temp = start.selectedIndex;
                    start.selectedIndex = end.selectedIndex;
                    end.selectedIndex = temp;
                }
            };
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

