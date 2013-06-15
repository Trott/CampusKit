// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '{{#title}}';
    template += '<div class="menu detailed">';
    template += '<h2>{{title}}</h2>';
    template += '<ol>';
    template += '{{/title}}';
    template += '{{#post}}';
    template += '  <li>';
    template += '    <a href="{{POST_LINK}}"><span class="external">{{POST_TITLE}}</span>';
    template += '    <div class="smallprint light">{{POST_DATE}}</div></a>';
    template += '{{/post}}';
    template += '</ol>';
    template += '</div>';
    template += '{{^post}}';
    template += '<div class="content">';
    template += '<p>Content could not be loaded.</p>';
    template += '</div>';
    template += '{{/post}}';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);