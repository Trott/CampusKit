var _gaq = [
    ['_setAccount', 'UA-15855907-1'],
    ['_setSiteSpeedSampleRate', 100]
];

//TODO: 
//         a:"UA-552286-29",
//         s:"/library/"

// Special tracking for native client.
if (/ mwf\-native\-[a-z]*\/[\d\.]*$/i.test(navigator.userAgent)) {
    _gaq.push(["_setCustomVar", 1, "mwf_native_client", "1"]);
}

// Special tracking for the Library. Should probably just move the Library stuff to
//    its own ding-dang server.
if (window.location.pathname.substring(0,9) === '/library/') {
    _gaq.push(["t0._setAccount", "UA-552286-29"]);
    _gaq.push(["t0._trackPageview"]);
}

_gaq.push(["_trackPageview"]);

(function(d) {
    var g = d.createElement("script"),
        s = d.scripts[0];
    g.src = "//www.google-analytics.com/ga.js";
    s.parentNode.insertBefore(g, s);
}(document));