// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '<div class="menu detailed">';
    template += '<h2>{{title}}</h2>';
    template += '<ol>';
    template += '{{#experts}}';
    template += '<li>';
    template += '<a href="tel:{{TEL}}">';
    template += '<div>{{NAME}}</div>';
    template += '<div class=smallprint>{{POSITION}}</div>';
    template += '<div class=smallprint>{{LOCATION}}</div>';
    template += '<div class=smallprint>{{LOCATION2}}</div>';
    template += '<div class=smallprint>{{TEL}}</div>';
    template += '</a>';
    template += '{{/experts}}';
    template += '</ol>';
    template += '</div>';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);