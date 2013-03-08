var ucsf = ucsf || {};

//TODO: apikey
//TODO: 20 results => tell user results limited to 20
//TODO: empty query should return the form, not 20 results
//TODO: 0 results looks crappy. Make better.

Modernizr.load({
    load: 'http://apis.ucsf.edu.trott.jit.su/static/UCSF.Person.js?apikey=abcdefg'
});

ucsf.directory = {
    search: function () {
        document.getElementById("ucsf_directory_search_submit").disabled = true;
        var progressHTML = '<div><section class="center"><progress>Loading...</progress></section></div>';
        document.getElementById("searchresults").innerHTML = progressHTML;
        var that = this;
        UCSF.Person.search(
            {
                first_name: document.getElementById('ucsf_directory_search_form').first_name.value,
                last_name: document.getElementById('ucsf_directory_search_form').last_name.value,
                dep_name: document.getElementById('ucsf_directory_search_form').department.value
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
        var result = response.result || [];
        //TODO: this and the progress meter should be a template with a default and the option to pass in one to override.
        //TODO: Although this is probably good for API sample code.
        var searchHTML = '<div class="menu"><h1>Search Results (' + result.length + ')</h1>';
        if (result.length === 20) {
            searchHTML = searchHTML + '<p class="info">Results limited to 20.</p>';
        }
        searchHTML = searchHTML + '<ol>';
        for (var i=0; i<result.length; i++) {
            searchHTML = searchHTML + '<li><a href="#">';
            searchHTML = searchHTML + '<span style="display:inline-block;padding:1em">';
            searchHTML = searchHTML + result[i].displayName + ' &ndash; ' + result[i].department;
            searchHTML = searchHTML + '</span>';
            searchHTML = searchHTML + '</a></li>';
        }
        searchHTML = searchHTML + "</ol></div>";

        document.getElementById("searchresults").innerHTML = searchHTML;
    }
};