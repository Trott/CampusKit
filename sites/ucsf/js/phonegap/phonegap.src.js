(function () {
    var scriptAppend = function (src) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        document.body.appendChild(script);
    };

    var basePath = window.localStorage.getItem('basePath') || (function () {
        var href = window.location.href;
        var basePath = href.substr(0, href.lastIndexOf('/') + 1);
        window.localStorage.setItem('basePath', basePath);
        return basePath;
    }());

    scriptAppend('phonegap.js');
    scriptAppend('GAPlugin.js');
}());

document.addEventListener('deviceready',
    function () {

        var gaPlugin = window.plugins.gaPlugin;
        var doNothing = function () {};

        gaPlugin.init(doNothing, doNothing, "UA-42301127-1", 10);

        window.addEventListener('unload',
            function () {
                gaPlugin.exit(doNothing, doNothing);
            },
            false
        );

        // regexp to get relevant part of the path
        var regexp = /\/www\/(.*)/;

        var trackPage = function (href) {
            gaPlugin.trackPage(doNothing, doNothing, regexp.exec(window.location.href)[1]);
        };

        document.body.addEventListener('click',
            function (e) {
                // Open external links in the system browser.
                if ( e.srcElement ) {
                    var element = e.srcElement;
                    while (element.nodeName !== 'BODY') {
                        if (element.nodeName === 'A') {
                            if (element.rel === "external") {
                                window.open(element.href, '_system');
                                e.preventDefault();
                            } else {
                                trackPage(element.href);
                            }
                            break;
                        }
                        element = element.parentNode;
                    }
                }
            },
            false
        );

        trackPage(window.location.href);
    },
    false
);
