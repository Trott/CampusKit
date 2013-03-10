// require hogan
var hogan = require("hogan.js");

// construct template string
var template = '{{^data}}';
    template += '<div class="content"><p class="info">No details available.</p></div>';
    template += '{{/data}}';
    template += '{{#data}}{{#.}}';
    template += '<div class="menu detailed">';
    template += '<h1>{{name}}{{#degrees}}, {{.}}{{/degrees}}</h1>';
    template += '<ol>';
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

//TODO: this
// <script type="text/javascript">
//     function getPhoto(data) {
//         if (data.hasOwnProperty("Profiles")) {
//             if ((data.Profiles instanceof Array) && (data.Profiles.length > 0)) {
//                 var myProfile = data.Profiles[0];
//                 if (myProfile.hasOwnProperty("PhotoURL")) {
//                     var profilePhoto = document.createElement("img");
//                     profilePhoto.setAttribute("src","http://src.sencha.io/80/80/"+myProfile.PhotoURL);
//                     profilePhoto.setAttribute("alt","");
//                     profilePhoto.setAttribute("style","border-top-right-radius:0;float:left");
//                     var dirMenu = document.getElementById('dir-menu');
//                     var dirHeader = dirMenu.firstChild;
//                     var headerHeight = dirHeader.nextSibling.clientHeight;
//                     dirHeader.nextSibling.setAttribute("style","height:52px;padding-top:20px;border-radius:.5em .5em 0 0;");
//                     dirMenu.insertBefore(profilePhoto,dirHeader);
//                 }
                
//                 if (myProfile.hasOwnProperty("ProfilesURL")) {
//                     var profileLink = document.createElement("a");
//                     profileLink.setAttribute("href","/research/?fno=<?php echo urlencode($key); ?>");
//                     profileLink.innerHTML = 'Research &amp; Publications';
//                     var currentItem = document.createElement("li");
//                     currentItem.appendChild(profileLink);
//                     currentItem.setAttribute("class","menu-last");
//                     document.getElementById("dir-menu-list").appendChild(currentItem);
//                 }
//             }
//         }
//     }
//     var script = document.createElement('script');
//     script.setAttribute("src","http://profiles.ucsf.edu/CustomAPI/v1/JSONProfile.aspx?FNO=<?php echo urlencode($key); ?>&callback=getPhoto");

//     document.getElementsByTagName('head')[0].appendChild(script);
// </script>





// compile template
var output = hogan.compile(template, {asString: true});

console.log(output);