// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '<h2>Suggested Routes</h2>';
    template += '{{#itineraries}}';
    template += '<div>';
    template += '<h3>Option {{index}}</h3>';
    template += '<h4>{{startTimeFormatted}} - {{endTimeFormatted}} ({{durationFormatted}} mins)</h4>';
    template += '<ol>';
    template += '{{#legs}}';
    template += '{{#bus}}';
    template += '<li><ul>';
    template += '<li><strong>From:</strong> {{fromName}}</li>';
    template += '<li><strong>To:</strong> {{toName}}</li>';
    template += '<li><strong>Shuttle:</strong> {{route}} <div class="shuttle-color {{routeId}}"></div></li>';
    template += '<li><strong>Depart:</strong> {{startTime}}</li>';
    template += '<li><strong>Arrive:</strong> {{endTime}}</li>';
    template += '</ul></li>';
    template += '{{/bus}}';
    template += '{{#walk}}';
    template += '<li>Walk to {{toName}}</li>';
    template += '{{/walk}}';
    template += '{{/legs}}';
    template += '</ol>';
    template += '</div>';
    template += '{{/itineraries}}';
    template += '{{^itineraries}}';
    template += '<p>No options found.</p>';
    template += '{{/itineraries}}';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);