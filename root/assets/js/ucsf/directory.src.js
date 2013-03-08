var ucsf = ucsf || {};

//TODO: apikey
//TODO: disable search button and renable it once results show up
//TODO: 20 results => tell user results limited to 20

Modernizr.load({
    load: 'http://apis.ucsf.edu.trott.jit.su/static/UCSF.Person.js?apikey=abcdefg'
});

ucsf.directory = {
    search: function () {
        var progressHTML = '<div><section class="center"><progress>Loading...</progress></section></div>';
        document.getElementById("searchresults").innerHTML = progressHTML;
        var that = this;
        UCSF.Person.search(
            {
                first_name: document.getElementById('searchform').first_name.value,
                last_name: document.getElementById('searchform').last_name.value,
                dep_name: document.getElementById('searchform').department.value
            },
            function (response) { that.render(response); });
    },
    render: function (response) {
        if (response.error) {
            window.alert(response.error.message);
            return;
        }
        var result = response.result || [];
        //TODO: this and the progress meter should be a template with a default and the option to pass in one to override.
        //TODO: Although this is probably good for API sample code.
        var searchHTML = '<div class="menu"><h1>Search Results (' + result.length + ')</h1><ol>';
        for (var i=0; i<result.length; i++) {
            searchHTML = searchHTML + '<li><a href="#">';
//            searchHTML = searchHTML + '<img style="float:left;" src="' + result[i].picture.data.url + '" alt="">';
            searchHTML = searchHTML + '<span style="display:inline-block;padding:1em">';
            searchHTML = searchHTML + result[i].displayName + ' &ndash; ' + result[i].department;
            searchHTML = searchHTML + '</span>';
            searchHTML = searchHTML + '</a></li>';
        }
        searchHTML = searchHTML + "</ol></div>";

        document.getElementById("searchresults").innerHTML = searchHTML;
    }
};
