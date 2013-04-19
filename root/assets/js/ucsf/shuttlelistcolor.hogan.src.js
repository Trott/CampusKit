// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '<h2>Shuttles {{#foofoofoo}}for {{barbarbar}}{{/foofoofoo}}</h2>';
    template += '<ol>';
    template += '{{#routes}}';
    template += '<li>';
    template += '<a href="/shuttle/schedule/?id={{#id}}{{id}}{{/id}}"><div class="shuttle-color {{#id}}{{id}}{{/id}}"></div> {{routeShortName}}</a>';
    template += '</li>';
    template += '{{/routes}}';
    template += '</ol>';
    template += '{{^routes}}';
    template += '<p>Could not load content.</p>';
    template += '{{/routes}}';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);