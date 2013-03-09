//TODO: detailed info when you click the name

var ucsf = ucsf || {};

Modernizr.load({
    load: 'http://apis.ucsf.edu.trott.jit.su/static/UCSF.Person.js?apikey=abcdefg'
});

ucsf.directory = {
    search: function () {
        document.getElementById("ucsf_directory_search_submit").disabled = true;
        var that = this,
            fn = document.getElementById('ucsf_directory_search_form').first_name.value,
            ln = document.getElementById('ucsf_directory_search_form').last_name.value,
            dep = document.getElementById('ucsf_directory_search_form').department.value;
        if (!fn && !ln && !dep) {
            // Nothing submitted in form, render empty result.
            that.render({});
            return;
        }
        var progressHTML = '<div><section class="center"><progress>Loading...</progress></section></div>';
        document.getElementById("searchresults").innerHTML = progressHTML;
        UCSF.Person.search(
            {
                first_name: fn,
                last_name: ln,
                dep_name: dep
            },
            function (response) { that.render(response); }
        );
    },
    render: function (response) {
        document.getElementById("ucsf_directory_search_submit").disabled = false;
        if (response.error) {
            window.alert(response.error.message);
            return;
        }
        var result = response.data || [];
        //TODO: this and the progress meter should be a template with a default and the option to pass in one to override.
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
    }
};