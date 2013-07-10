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
    scriptAppend(basePath + 'GAPlugin.js');
    scriptAppend(basePath + 'js/modules/ga_init.js');
}());

document.addEventListener('deviceready',
    function () {
        document.body.addEventListener('click',
            function (e) {
                if ( e.srcElement && e.srcElement.nodeName === "A" ){
                    e.PreventDefault();
                    window.open('e.srcElement.href', '_system');
                }
            },
            true
        );
    },
    false
);
