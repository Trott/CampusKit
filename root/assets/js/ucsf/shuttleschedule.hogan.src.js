// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '<h3>{{formattedDate}}</h3>';
    template += '<ol class="shuttle-times-listing">{{#times}}';
    template += '<li>{{formattedTime}}</li>';
    template += '{{/times}}';
    template += '{{^times}}';
    template += '<li>No times found for selected date.</li>';
    template += '{{/times}}</ol>';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);