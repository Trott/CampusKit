(function () {
    function scriptAppend(src) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        document.body.appendChild(script);
    }
    scriptAppend('phonegap.js');
    scriptAppend('GAPlugin.js');
}());

var gaPlugin;

document.addEventListener('deviceready',
    function () {
        'use strict';
        var href = window.location.href;
        var basepath = href.substr(0, href.lastIndexOf('/') + 1);

        var anchors = document.getElementsByTagName('a');
        for (var i=0, l=anchors.length; i<l; i++) {
            anchors[i].setAttribute('onclick', 'window.open("' + anchors[i].href + '", "_blank", "location=no,transitionstyle=crossdissolve"); return false');
        }

        var doNothing = function () {};
        gaPlugin = window.plugins.gaPlugin;
        gaPlugin.init(doNothing, doNothing, "UA-42301127-1", 10);
        document.addEventListener('unload', function () {gaPlugin.exit(doNothing, doNothing);}, false);
    },
    false
);
