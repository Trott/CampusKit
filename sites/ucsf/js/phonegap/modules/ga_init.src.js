// Since we're not a single-page-app (yet?), we need this for sub-pages.
// If we were a single-page-app, we could just do this on deviceready in phonegap.src.js.
(function () {
    var doNothing = function () {};

    var gaInit = function () {
        if (window.plugins && window.plugins.gaPlugin) {
            var gaPlugin = window.plugins.gaPlugin;
            gaPlugin.init(doNothing, doNothing, "UA-42301127-1", 10);

            window.addEventListener('unload', function () {gaPlugin.exit(doNothing, doNothing);}, false);
            gaPlugin.trackPage(doNothing, doNothing, window.location.href);
            // You may be tempted to put a hashchange event listener here, but alas, that won't work
            // for Angular, which is the only place in this app that we care about it. You'll need to
            // do something like http://stackoverflow.com/a/13426400/436641 but you'll need to have code
            // that won't break on the web side. Probably the answer is to use a _gaq queue in both PhoneGap and web.
            // Will create an issue in GitHub.
        } else {
            setTimeout(gaInit, 100);
        }
    };

    gaInit();
}());
