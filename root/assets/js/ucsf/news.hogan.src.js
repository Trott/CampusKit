// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '{{#feed}}';
    template += '<div class="menu detailed">';
    template += '<h2>{{title}}</h2>';
    template += '<ol>';
    template += '{{#entries}}';
    template += '  <li>';
    template += '    <a class="no-ext-ind" rel="external" href="{{link}}"><span class="external">{{title}}</span>';
    template += '    <div class="smallprint light">{{dateTime.date}}</div>';
    template += '    <div class="smallprint light">{{dateTime.time}}</div></a>';
    template += '{{/entries}}';
    template += '</ol>';
    template += '</div>';
    template += '{{/feed}}';
    template += '{{^feed}}';
    template += '<div class="content">';
    template += '<p>Content could not be loaded.</p>';
    template += '</div>';
    template += '{{/feed}}';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);