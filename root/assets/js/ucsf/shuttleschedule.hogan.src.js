// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '{{#times}}';
    template += '<ul>';
    template += '<li>{{formattedTime}}</li>';
    template += '</ul>';
    template += '{{/times}}';
    template += '{{^times}}';
    template += '<p>Could not load content.</p>';
    template += '{{/times}}';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);