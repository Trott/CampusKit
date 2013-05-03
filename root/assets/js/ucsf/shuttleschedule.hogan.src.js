// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '<h2>{{#route}}{{routeShortName}} {{/route}}Shuttle Schedule</h2>';
	template += '<ol>';
    template += '{{#stops}}';
    template += '<li><a href="#">{{stopName}}</a></li>';
    template += '{{/stops}}';
    template += '</ol>';
    template += '{{^stops}}';
    template += '<p>Could not load content.</p>';
    template += '{{/stops}}';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);