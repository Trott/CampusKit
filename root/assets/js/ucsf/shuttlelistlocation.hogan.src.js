// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '<h2>Shuttles By Location</h2>';
    template += '<ol>';
    template += '{{#stops}}';
    template += '<li><a href="/shuttle/list/color/?id={{#id}}{{id}}{{/id}}">{{stopName}}</a></li>';
    template += '{{/stops}}';
    template += '</ol>';
    template += '{{^stops}}';
    template += '<p>Could not load content.</p>';
    template += '{{/stops}}';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);