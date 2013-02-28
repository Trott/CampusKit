// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '<section class="content">';
	template += '{{#feed}}';
    template += '<h1>{{title}}</h1>';
    template += '{{#entries}}';
    template += '<section><h3>{{title}}</h3>';
    template += '{{{content}}}</section>';
    template += '{{/entries}}';
    template += '{{^entries}}';
    template += 'Content could not be loaded. <a href="window.location.reload()">Try again.</a>';
    template += '{{/entries}}';
    template += '{{/feed}}';
    template += '</section>';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);