// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '<ol class="shuttle-times-listing">{{#times}}';
    template += '<li>{{formattedTime}}</li>';
    template += '{{/times}}';
    template += '{{^times}}';
    template += '<li>No shuttle times found for selected date.</li>';
    template += '{{/times}}</ol>';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);