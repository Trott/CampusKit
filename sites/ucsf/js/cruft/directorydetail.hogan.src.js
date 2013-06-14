// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '{{^data}}';
    template += '<div class="content"><p class="info">No details available.</p></div>';
    template += '{{/data}}';
    template += '{{#data}}{{#.}}';
    template += '<div class="menu detailed" id="ucsf_directory_detail_menu">';
    template += '<h1>{{name}}{{#degrees}}, {{.}}{{/degrees}}</h1>';
    template += '<ol id="ucsf_directory_detail_menu_list">';
    template += '{{#phones}}';
        template += '{{#main}}<li><a href="tel:{{.}}">Campus Phone: {{.}}</a></li>{{/main}}';
        template += '{{#alternate}}<li><a href="tel:{{.}}">Alt. Campus Phone: {{.}}</a></li>{{/alternate}}';
        template += '{{#privatePractice}}<li><a href="tel:{{.}}">Private Practice: {{.}}</a></li>{{/privatePractice}}';
        template += '{{#mobile}}<li><a href="tel:{{.}}">Mobile: {{.}}</a></li>{{/mobile}}';
        template += '{{#pager}}<li><a href="tel:{{.}}">Pager: {{.}}</a></li>{{/pager}}';
    template += '{{/phones}}';
    template += '{{#email}}';
    template += '<li><a href="mailto:{{.}}">Email: {{.}}</a></li>';
    template += '{{/email}}';
    template += '</ol>';
    template += '</div>';

    template += '<div class="content">';
    template += '<ul class="ucsf-directory">';
    template += '{{#department}}';
    template += '<li><span class="smallprint">Department:</span> {{.}}</li>';
    template += '{{/department}}';

    template += '{{#title}}';
    template += '<li><span class="smallprint">Title:</span> {{.}}</li>';
    template += '{{/title}}';

    template += '{{#campusBox}}';
    template += '<li><span class="smallprint">Campus Box:</span> {{.}}</li>';
    template += '{{/campusBox}}';

    template += '{{#address}}';
    template += '<li><span class="smallprint">Postal Address:</span><br><pre>{{.}}</pre></li>';
    template += '{{/address}}';

    template += '</ul>';
    template += '</div>';

    template += '{{/.}}{{/data}}';

// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);