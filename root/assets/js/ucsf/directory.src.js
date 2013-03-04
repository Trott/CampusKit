var ucsf = ucsf || {};

window.fbAsyncInit = function() {
    FB.init({
      appId      : '320467564723114', // App ID
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : false  // parse XFBML
  });

    FB.Event.subscribe('auth.statusChange', ucsf.directory.handleStatusChange);
};

  // Load the SDK Asynchronously
  (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
}(document));

ucsf.directory = {
    handleStatusChange: function (response) {
        document.body.className = response.authResponse ? "connected" : "not_connected";
    },
    search: function () {
        var that = this;
        if (document.body.className !== "connected") {
            FB.login(function(response) {
                if (document.body.className !== "connected") {
                    window.alert('Sign in with Facebook first to search');
                    return;
                } else {
                    that.search();
                }
            }, {scope:'email'});
            return;
        }
        FB.api('/search?q=' +
            encodeURIComponent(document.getElementById('searchform').keywords.value) +
            '&type=user',
            { limit: 10, fields: ['name', 'link', 'picture'] },
            function (response) { that.render(response); });
    },
    render: function (response) {
        if (response.error) {
            window.alert(response.error.message);
            return;
        }
        var result = response.data;
        //TODO: this should be a template with a default and the option to pass in one to override
        var searchHTML = "<ol>";
        for (var i=0; i<result.length; i++) {
            searchHTML = searchHTML + '<li><a style="padding:0em;overflow:auto;" href="' + result[i].link + '">';
            searchHTML = searchHTML + '<img style="float:left;" src="' + result[i].picture.data.url + '" alt="">';
            searchHTML = searchHTML + '<span style="display:inline-block;padding:1em">' + result[i].name + '</span>';
            searchHTML = searchHTML + '</a></li>';
        }
        searchHTML = searchHTML + "</ol>";
        searchHTML = "<h1>Search Results (" + result.length + ")</h1>" + searchHTML;

        document.getElementById("searchresults").innerHTML = searchHTML;
    }
};
