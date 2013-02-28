// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '{{#locationList}}';
    template += '<li><a href="/maps/map/?loc={{name}}">{{name}}</a></li>';
    template += '{{/locationList}}';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);