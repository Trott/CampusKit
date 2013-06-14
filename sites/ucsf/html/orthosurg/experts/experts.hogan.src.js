// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '<div class="menu">';
    template += '<h2>{{title}}</h2>';
    template += '<ol>';
    template += '{{#entries}}';
    template += '  <li>';
    template += '    <a href="?{{LINK}}">{{DESCRIPTION}}</a>';
    template += '{{/entries}}';
    template += '</ol>';
    template += '</div>';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);