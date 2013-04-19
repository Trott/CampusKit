// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '<h2>Shuttles {{#foofoofoo}}for {{barbarbar}}{{/foofoofoo}}</h2>';
    template += '<ol>';
    template += '{{#shuttles}}';
    template += '<li>';
    template += '<a href="/shuttle/schedule/?id={{#id}}{{id}}{{/id}}"><div class="shuttle-color {{routeId}}"></div> {{route}}</a>';
    template += '</li>';
    template += '{{/shuttles}}';
    template += '</ol>';
    template += '{{^shuttles}}';
    template += '<p>Could not load content.</p>';
    template += '{{/shuttles}}';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);