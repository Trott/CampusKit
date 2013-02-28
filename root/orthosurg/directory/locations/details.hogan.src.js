// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '<div class="menu detailed">';
    template += '<h2>{{title}}</h2>';
    template += '<ol>';
    template += '{{#entries}}';
    template += '  <li>';
    template += '    <a href="tel:{{PHONE}}">';
    template += '        <div>{{NAME2}}</div>{{NAME1}}';
    template += '        <div class="smallprint light">{{STREET1}}</div>';
    template += '        <div class="smallprint light">{{STREET2}}</div>';
    template += '        <div class="smallprint light">{{PHONE}}</div>';
    template += '    </a>';
    template += '{{/entries}}';
    template += '</ol>';
    template += '</div>';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);