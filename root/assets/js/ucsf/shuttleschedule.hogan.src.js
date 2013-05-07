// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '<ul>{{#times}}';
    template += '<li>{{formattedTime}}</li>';
    template += '{{/times}}</ul>';
    template += '{{^times}}';
    template += '<li>No shuttle times found for selected date.</li>';
    template += '{{/times}}';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);