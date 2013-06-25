(function () {
    function scriptAppend(src) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        document.body.appendChild(script);
    }
    scriptAppend('phonegap.js');
    scriptAppend('childbrowser.js');
}());

// document.addEventListener('deviceready', function () {
//     'use strict';
//
//     ... Go crazy with the PhoneGap APIs and plugins here ...
//
// }, false);