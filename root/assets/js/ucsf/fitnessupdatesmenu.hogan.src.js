// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '{{#feed}}';
    template += '<a href="/fitness/updates">{{title}}';
    template += '{{#entries}}';
    template += '<br><span class="smallprint light">{{title}}</span>';
    template += '{{/entries}}';
    template += '{{^entries}}';
    template += '<br><span class="smallprint light">There are no updates at this time.</span>';
    template += '{{/entries}}';
    template += '</a>';
    template += '{{/feed}}';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);