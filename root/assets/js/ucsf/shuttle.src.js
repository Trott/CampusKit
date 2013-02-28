/* globals: Modernizr:true */
ucsf.shuttle = (function () {
	var me = {},
    start = document.getElementById('starting_from'),
    end = document.getElementById('ending_at'),
    reverseButton = document.getElementById('reverse_trip');

    if(Modernizr.localstorage){
        if (localStorage.shuttle_start) {
            if (start !== null) {
                start.selectedIndex = parseInt(localStorage.shuttle_start, 10);
            }
        }
        if (localStorage.shuttle_end) {
            if (end !== null) {
                end.selectedIndex = parseInt(localStorage.shuttle_end, 10);
            }
        }
    }

    me.save = function () {
        if(Modernizr.localstorage) {
            localStorage.shuttle_start = document.getElementById("starting_from").selectedIndex;
            localStorage.shuttle_end = document.getElementById("ending_at").selectedIndex;
        }
    };

    me.swap = function () {
        if(Modernizr.localstorage){
            var temp = localStorage.shuttle_start;
            localStorage.shuttle_start = localStorage.shuttle_end;
            localStorage.shuttle_end = temp;
        }
    };

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

    return me;
} ());
