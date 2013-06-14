var _dirq = _dirq || [];
var ucsf = ucsf || {};

ucsf.directory = (function () {
    var me = {};

    me.renderSearchResults = function (response) {
        if (response.error) {
            window.alert(response.error.message);
            return;
        }
        var result = response.data || [];
        //TODO: this and all the other rendered stuff should be templates with 
        // defaults and the option to pass in one to override.
        var resultCount = result.length>20 ? 20 : result.length;
        var searchHTML = '<div class="menu"><h1>Search Results (' + resultCount + ')</h1>';
        if (resultCount === 20) {
            searchHTML = searchHTML + '<p class="info">Results limited to 20.</p>';
        }
        if (resultCount === 0) {
            searchHTML = searchHTML + '<p class="info">No results found.</p>';
        } else {
            searchHTML = searchHTML + '<ol>';
            for (var i=0; i<resultCount; i++) {
                // Skip if we don't have a name or id, which should never happen.
                if (! (result[i].hasOwnProperty('id') && result[i].hasOwnProperty('name'))) {
                    continue;
                }
                searchHTML = searchHTML + '<li><a href="/directory/detail/?' + encodeURIComponent(result[i].id) + '">';
                searchHTML = searchHTML + '<span style="">';
                searchHTML = searchHTML + result[i].name;
                if (result[i].hasOwnProperty('department')) {
                    searchHTML = searchHTML + ' &ndash; ' + result[i].department;
                }
                searchHTML = searchHTML + '</span>';
            }
            searchHTML = searchHTML + "</ol>";
        }
        searchHTML = searchHTML + "</div>";

        var resultsElement = document.getElementById("searchresults");
        resultsElement.innerHTML = searchHTML;
        resultsElement.scrollIntoView();

    };

    me.renderDetail = function (response) {
        var template = new Hogan.Template(
            function(c,p,i){var _=this;_.b(i=i||"");if(!_.s(_.f("data",c,p,1),c,p,1,0,0,"")){_.b("<div class=\"content\"><p class=\"info\">No details available.</p></div>");}if(_.s(_.f("data",c,p,1),c,p,0,95,1146,"{{ }}")){_.rs(c,p,function(c,p,_){if(_.s(_.d(".",c,p,1),c,p,0,101,1140,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<div class=\"menu detailed\" id=\"ucsf_directory_detail_menu\"><h1>");_.b(_.v(_.f("name",c,p,0)));if(_.s(_.f("degrees",c,p,1),c,p,0,184,191,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(", ");_.b(_.v(_.d(".",c,p,0)));});c.pop();}_.b("</h1><ol id=\"ucsf_directory_detail_menu_list\">");if(_.s(_.f("phones",c,p,1),c,p,0,260,644,"{{ }}")){_.rs(c,p,function(c,p,_){if(_.s(_.f("main",c,p,1),c,p,0,269,321,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><a href=\"tel:");_.b(_.v(_.d(".",c,p,0)));_.b("\">Campus Phone: ");_.b(_.v(_.d(".",c,p,0)));_.b("</a></li>");});c.pop();}if(_.s(_.f("alternate",c,p,1),c,p,0,344,401,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><a href=\"tel:");_.b(_.v(_.d(".",c,p,0)));_.b("\">Alt. Campus Phone: ");_.b(_.v(_.d(".",c,p,0)));_.b("</a></li>");});c.pop();}if(_.s(_.f("privatePractice",c,p,1),c,p,0,435,491,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><a href=\"tel:");_.b(_.v(_.d(".",c,p,0)));_.b("\">Private Practice: ");_.b(_.v(_.d(".",c,p,0)));_.b("</a></li>");});c.pop();}if(_.s(_.f("mobile",c,p,1),c,p,0,522,568,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><a href=\"tel:");_.b(_.v(_.d(".",c,p,0)));_.b("\">Mobile: ");_.b(_.v(_.d(".",c,p,0)));_.b("</a></li>");});c.pop();}if(_.s(_.f("pager",c,p,1),c,p,0,589,634,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><a href=\"tel:");_.b(_.v(_.d(".",c,p,0)));_.b("\">Pager: ");_.b(_.v(_.d(".",c,p,0)));_.b("</a></li>");});c.pop();}});c.pop();}if(_.s(_.f("email",c,p,1),c,p,0,665,713,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><a href=\"mailto:");_.b(_.v(_.d(".",c,p,0)));_.b("\">Email: ");_.b(_.v(_.d(".",c,p,0)));_.b("</a></li>");});c.pop();}_.b("</ol></div><div class=\"content\"><ul class=\"ucsf-directory\">");if(_.s(_.f("department",c,p,1),c,p,0,797,855,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><span class=\"smallprint\">Department:</span> ");_.b(_.v(_.d(".",c,p,0)));_.b("</li>");});c.pop();}if(_.s(_.f("title",c,p,1),c,p,0,880,933,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><span class=\"smallprint\">Title:</span> ");_.b(_.v(_.d(".",c,p,0)));_.b("</li>");});c.pop();}if(_.s(_.f("campusBox",c,p,1),c,p,0,957,1015,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><span class=\"smallprint\">Campus Box:</span> ");_.b(_.v(_.d(".",c,p,0)));_.b("</li>");});c.pop();}if(_.s(_.f("address",c,p,1),c,p,0,1041,1117,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><span class=\"smallprint\">Postal Address:</span><br><pre>");_.b(_.v(_.d(".",c,p,0)));_.b("</pre></li>");});c.pop();}_.b("</ul></div>");});c.pop();}});c.pop();}return _.fl();}
        );
        var detailElement = document.getElementById('ucsf_directory_detail');
        detailElement.innerHTML = template.render(response);
        if (response.data && response.data[0] && response.data[0].id) {
            me.id = response.data[0].id;
            var script = document.createElement('script');
            script.setAttribute("src","http://profiles.ucsf.edu/CustomAPI/v1/JSONProfile.aspx?FNO=" + me.id + "&callback=ucsf.directory.addPhotoAndProfileUrl");
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    };

    me.addPhotoAndProfileUrl = function (data) {
        if (data.hasOwnProperty("Profiles")) {
            if ((data.Profiles instanceof Array) && (data.Profiles.length > 0)) {
                var myProfile = data.Profiles[0];
                if (myProfile.hasOwnProperty("PhotoURL")) {
                    var profilePhoto = document.createElement("img");
                    profilePhoto.setAttribute("src","http://src.sencha.io/80/80/"+myProfile.PhotoURL);
                    profilePhoto.setAttribute("alt","");
                    profilePhoto.setAttribute("style","border-top-right-radius:0;float:left");
                    var dirMenu = document.getElementById('ucsf_directory_detail_menu');
                    var dirHeader = dirMenu.firstChild;
                    dirHeader.setAttribute("style","height:52px;padding-top:20px;border-radius:.5em .5em 0 0;");
                    dirMenu.insertBefore(profilePhoto,dirHeader);
                }

                if (myProfile.hasOwnProperty("ProfilesURL")) {
                    var profileLink = document.createElement("a");
                    profileLink.setAttribute("href","/research/?fno=" + me.id);
                    profileLink.innerHTML = 'Research &amp; Publications';
                    var currentItem = document.createElement("li");
                    currentItem.appendChild(profileLink);
                    document.getElementById("ucsf_directory_detail_menu_list").appendChild(currentItem);
                }
            }
        }
    };

    return me;
}());

Modernizr.load({
    load: 'http://apis.ucsf.edu/jsapi?person',
    callback: function () {
        var oldq = typeof _dirq === "undefined" ? [] : _dirq;
        _dirq = {
            push: function (param) {
                param[0].apikey = 'c631ef46e918c82cf81ef4869f0029d4';
                return UCSF.Person.search.apply(ucsf.directory, param);
            }
        };

        for (var i=0, len=oldq.length; i<len; i++) {
            _dirq.push(oldq[i]);
        }
    }
});