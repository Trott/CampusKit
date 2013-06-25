(function () {
    var script = document.createElement('script');
    script.type="text/javascript";
    script.src="phonegap.js";
    document.body.appendChild(script);
}());

if (document.addEventListener) {
    document.addEventListener('deviceready', function () {
        'use strict';
        // Go crazy with the PhoneGap APIs and plugins here.
    }, false);
}