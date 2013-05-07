// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '{{#times}}';
    template += '<p>Content goes here!</p>';
    template += '{{/times}}';
    template += '{{^times}}';
    template += '<p>Could not load content.</p>';
    template += '{{/times}}';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);