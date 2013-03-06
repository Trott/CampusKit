var ucsf = ucsf || {};

Modernizr.load({
    load: 'http://apis.ucsf.edu.trott.jit.su/static/UCSF.People.js?apikey=abcdefg'
});

ucsf.directory = {
    search: function () {
        var progressHTML = '<div><section class="center"><progress>Loading...</progress></section></div>';
        document.getElementById("searchresults").innerHTML = progressHTML;
        var that = this;
        UCSF.People.search(
            {
                keywords: document.getElementById('searchform').keywords.value,
                limit: 10,
                fields: ['name', 'link', 'picture']
            },
            function (response) { that.render(response); });
    },
    render: function (response) {
        if (response.error) {
            window.alert(response.error.message);
            return;
        }
        var result = response.data;
        //TODO: this and the progress meter should be a template with a default and the option to pass in one to override.
        //TODO: Although this is probably good for API sample code.
        var searchHTML = '<div class="menu"><h1>Search Results (' + result.length + ')</h1><ol>';
        for (var i=0; i<result.length; i++) {
            searchHTML = searchHTML + '<li><a style="padding:0em;overflow:auto;" href="' + result[i].link + '">';
            searchHTML = searchHTML + '<img style="float:left;" src="' + result[i].picture.data.url + '" alt="">';
            searchHTML = searchHTML + '<span style="display:inline-block;padding:1em">' + result[i].name + '</span>';
            searchHTML = searchHTML + '</a></li>';
        }
        searchHTML = searchHTML + "</ol></div>";

        document.getElementById("searchresults").innerHTML = searchHTML;
    }
};
