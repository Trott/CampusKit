// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '<p>{{#times}}';
    template += '{{formattedTime}}<br>';
    template += '{{/times}}';
    template += '{{^times}}';
    template += 'No shuttle times found for selected date.';
    template += '{{/times}}</p>';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);