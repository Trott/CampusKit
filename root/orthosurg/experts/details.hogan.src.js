// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '<div class="menu detailed">';
    template += '<h2>{{title}}</h2>';
    template += '<ol>';
    template += '{{#experts}}';
    template += '<li>';
    template += '<a class="no-ext-ind" rel="external" href="{{LINK}}">';
    template += '<div><span class="external">{{NAME}}</span></div>';
    template += '<div class="smallprint light">{{POSITION}}</div>';
    template += '<div class="smallprint light">{{LOCATION}}</div>';
    template += '</a>';
    template += '{{/experts}}';
    template += '</ol>';
    template += '</div>';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);