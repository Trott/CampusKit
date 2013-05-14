ucsf.callAnalytics = function (event) {
    "use strict";
    // Analytics fires on page load, so if we're redirecting from something
    // without a hash to the default hash, don't do anything.
    if (event.oldURL.indexOf('#') !== -1) {
        var path = (window.location.hash === '#/main_menu') ? '/' : window.location.hash.substr(4);
        ucsf.analytics.trackPageview(path);
    }
};

if ('addEventListener' in window) {
	window.addEventListener('hashchange', ucsf.callAnalytics, false);
}