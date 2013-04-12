// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '<form action="javascript:ucsf.shuttle.plan()">';
    template += '<h2>Trip Planner</h2>';
    template += '<select name="begin" id="ucsf_shuttle_starting_from">';
    template += '{{#stops}}';
    template += '<option value="{{#id}}{{id}}{{/id}}">From {{stopName}}</option>';
    template += '{{/stops}}';
    template += '{{^stops}}';
    template += '<p>Content could not be loaded.</p>';
    template += '{{/stops}}';
    template += '</select>';
    template += '<button type="button" id="reverse_trip" class="reverse_trip">&uarr;&darr;</button>';
    template += '<select name="end" id="ucsf_shuttle_ending_at">';
    template += '{{#stops}}';
    template += '<option value="{{#id}}{{id}}{{/id}}">To {{stopName}}</option>';
    template += '{{/stops}}';
    template += '{{^stops}}';
    template += '<p>Content could not be loaded.</p>';
    template += '{{/stops}}';
    template += '</select>';
    //TODO: Figure out the best time selector based on the format required by OTP, and implement it here.
    // Current code:
/*    
    <select id="time" name="time">
        <option value="0">Leave Now</option>
        <option value="60">Depart in 1 hour</option>
        <option value="120">Depart in 2 hours</option>
        <option value="180">Depart in 3 hours</option>
        <option value="240">Depart in 4 hours</option>
        <option value="300">Depart in 5 hours</option>
        <option value="360">Depart in 6 hours</option>
        <option value="420">Depart in 7 hours</option>
        <option value="480">Depart in 8 hours</option>
    </select>
*/

    template += '<input type="submit" name="route" value="Route Trip"  />';
    template += '</form>';


// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);