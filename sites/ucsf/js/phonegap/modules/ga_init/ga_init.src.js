// Since we're not a single-page-app (yet?), we need this for sub-pages.
// If we were a single-page-app, we could just do this on deviceready in phonegap.src.js.
(function () {
    var gaPlugin;
    var doNothing = function () {};

    gaPlugin = window.plugins.gaPlugin;
    gaPlugin.init(doNothing, doNothing, "UA-42301127-1", 10);
    window.addEventListener('unload', function () {gaPlugin.exit(doNothing, doNothing);}, false);
    gaPlugin.trackPage(doNothing, doNothing, window.location.href);
    window.addEventListener('hashchange', function () {
        window.alert('begin hashchange');
        gaPlugin.trackPage(doNothing, doNothing, window.location.href);
        window.alert('end hashchange');
    }, false);
    window.alert('did not bomb out');
}());
