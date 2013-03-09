/**
 *
 * @author trott
 * @copyright Copyright (c) 2010-12 UC Regents
 * @version 20120208
 */

// Google Analytics API requires this to be a global
var _gaq = _gaq || [];

ucsf.analytics = (function(){
    var me = {};
    // Key for the entire site. Tracks everything.
    var key = "UA-15855907-1";
    // Keys for just particular paths. Tracks only things in those paths.
    var pathKeys = [{
        a:"UA-552286-29",
        s:"/library/"
    }];

    me.trackPageview = function(url) {
        url = url || window.location.pathname + window.location.search + window.location.hash;
        _gaq.push(["_trackPageview",url]);

        for (var i = 0; i < pathKeys.length; i++) {
            if (url.substring(0,pathKeys[i].s.length) === pathKeys[i].s) {
                _gaq.push(["t"+i+"._trackPageview",url]);
            }
        }
    };

    me.init = function(ua) {
        ua = ua || navigator.userAgent;
        _gaq.push(["_setAccount", key]);

        for (var i = 0; i < pathKeys.length; i++) {
            _gaq.push(["t"+i+"._setAccount",pathKeys[i].a]);
        }

        if (/ mwf\-native\-[a-z]*\/[\d\.]*$/i.test(ua)) {
            // Special tracking for native client.
            // @todo: Make this configurable (on|off, at least) and customizable
            //   (might want to track native container version number, for example)
            // @todo: Unit test this by not loading _gaq object and just leaving it as an array.
            _gaq.push(['_setCustomVar', 1, 'mwf_native_client', '1']);
        }

        _gaq.push(['_setSiteSpeedSampleRate', 100]);

        this.trackPageview();
    };

    var script = document.createElement("script");
    script.src = "//www.google-analytics.com/ga.js";
    document.getElementsByTagName("head")[0].appendChild(script);

    return me;
}());

ucsf.analytics.init();