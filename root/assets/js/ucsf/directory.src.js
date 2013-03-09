var _dirq = _dirq || [];
//TODO: detailed info when you click the name

ucsf.directory = (function () {
    "use strict";
    var me = {};

    me.search = function () {
        document.getElementById("ucsf_directory_search_submit").disabled = true;
        var that = this,
            fn = document.getElementById('ucsf_directory_search_form').first_name.value,
            ln = document.getElementById('ucsf_directory_search_form').last_name.value,
            dep = document.getElementById('ucsf_directory_search_form').department.value;
        if (!fn && !ln && !dep) {
            // Nothing submitted in form, render empty result.
            that.renderSearchResults({});
            return;
        }
        var progressHTML = '<div><section class="center"><progress>Loading...</progress></section></div>';
        document.getElementById("searchresults").innerHTML = progressHTML;
        _dirq.push([{
                first_name: fn,
                last_name: ln,
                dep_name: dep
            },
            function (response) { that.renderSearchResults(response); }]);
    };

    me.renderSearchResults = function (response) {
        document.getElementById("ucsf_directory_search_submit").disabled = false;
        if (response.error) {
            window.alert(response.error.message);
            return;
        }
        var result = response.data || [];
        //TODO: this and all the other rendered stuff (including the progress meter) 
        // should be templates with defaults and the option to pass in one to override.
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

        document.getElementById("searchresults").innerHTML = searchHTML;
    };

    me.renderDetail = function (response) {
        var template = new Hogan.Template(
            function(c,p,i){var _=this;_.b(i=i||"");if(!_.s(_.f("data",c,p,1),c,p,1,0,0,"")){_.b("<div class=\"content\"><p class=\"info\">No details available.</p></div>");}if(_.s(_.f("data",c,p,1),c,p,0,95,1077,"{{ }}")){_.rs(c,p,function(c,p,_){if(_.s(_.d(".",c,p,1),c,p,0,101,1071,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<div class=\"menu detailed\"><h1>");_.b(_.v(_.f("name",c,p,0)));if(_.s(_.f("degrees",c,p,1),c,p,0,152,159,"{{ }}")){_.rs(c,p,function(c,p,_){_.b(", ");_.b(_.v(_.d(".",c,p,0)));});c.pop();}_.b("</h1><ol>");if(_.s(_.f("phones",c,p,1),c,p,0,191,575,"{{ }}")){_.rs(c,p,function(c,p,_){if(_.s(_.f("main",c,p,1),c,p,0,200,252,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><a href=\"tel:");_.b(_.v(_.d(".",c,p,0)));_.b("\">Campus Phone: ");_.b(_.v(_.d(".",c,p,0)));_.b("</a></li>");});c.pop();}if(_.s(_.f("alternate",c,p,1),c,p,0,275,332,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><a href=\"tel:");_.b(_.v(_.d(".",c,p,0)));_.b("\">Alt. Campus Phone: ");_.b(_.v(_.d(".",c,p,0)));_.b("</a></li>");});c.pop();}if(_.s(_.f("privatePractice",c,p,1),c,p,0,366,422,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><a href=\"tel:");_.b(_.v(_.d(".",c,p,0)));_.b("\">Private Practice: ");_.b(_.v(_.d(".",c,p,0)));_.b("</a></li>");});c.pop();}if(_.s(_.f("mobile",c,p,1),c,p,0,453,499,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><a href=\"tel:");_.b(_.v(_.d(".",c,p,0)));_.b("\">Mobile: ");_.b(_.v(_.d(".",c,p,0)));_.b("</a></li>");});c.pop();}if(_.s(_.f("pager",c,p,1),c,p,0,520,565,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><a href=\"tel:");_.b(_.v(_.d(".",c,p,0)));_.b("\">Pager: ");_.b(_.v(_.d(".",c,p,0)));_.b("</a></li>");});c.pop();}});c.pop();}if(_.s(_.f("email",c,p,1),c,p,0,596,644,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><a href=\"mailto:");_.b(_.v(_.d(".",c,p,0)));_.b("\">Email: ");_.b(_.v(_.d(".",c,p,0)));_.b("</a></li>");});c.pop();}_.b("</ol></div><div class=\"content\"><ul class=\"ucsf-directory\">");if(_.s(_.f("department",c,p,1),c,p,0,728,786,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><span class=\"smallprint\">Department:</span> ");_.b(_.v(_.d(".",c,p,0)));_.b("</li>");});c.pop();}if(_.s(_.f("title",c,p,1),c,p,0,811,864,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><span class=\"smallprint\">Title:</span> ");_.b(_.v(_.d(".",c,p,0)));_.b("</li>");});c.pop();}if(_.s(_.f("campusBox",c,p,1),c,p,0,888,946,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><span class=\"smallprint\">Campus Box:</span> ");_.b(_.v(_.d(".",c,p,0)));_.b("</li>");});c.pop();}if(_.s(_.f("address",c,p,1),c,p,0,972,1048,"{{ }}")){_.rs(c,p,function(c,p,_){_.b("<li><span class=\"smallprint\">Postal Address:</span><br><pre>");_.b(_.v(_.d(".",c,p,0)));_.b("</pre></li>");});c.pop();}_.b("</ul></div>");});c.pop();}});c.pop();}return _.fl();}
        );
        var detailElement = document.getElementById('ucsf_directory_detail');
        detailElement.innerHTML = template.render(response);
    };

    return me;
}());

Modernizr.load({
    load: 'http://apis.ucsf.edu.trott.jit.su/static/UCSF.Person.js?apikey=abcdefg',
    callback: function () {
        var oldq = typeof _dirq === "undefined" ? [] : _dirq;
        _dirq = {
            push: function (param) {
                return UCSF.Person.search.apply(ucsf.directory, param);
            }
        };

        for (var i=0, len=oldq.length; i<len; i++) {
            _dirq.push(oldq[i]);
        }
    }
});