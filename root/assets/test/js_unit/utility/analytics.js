/**
 * Unit tests for ucsf.analytics
 *
 * @author trott
 * @copyright Copyright (c) 2012 UC Regents
 * @version 20120226
 *
 * @requires ucsf.analytics
 * @requires qunit
 *
 */

module("utility/analytics.js", {
    setup: function() {
        this._gaq_orig = _gaq;
        _gaq = [];
    },
    teardown: function() {
        _gaq = this._gaq_orig;
    }
});

test("ucsf.analytics.trackPageview() global and path keys, no path match", function()
{
    ucsf.analytics.trackPageview("/bar/baz.html");
    same(_gaq,
        [["_trackPageview", "/bar/baz.html"]],
        "reporting should occur for global key only");
});

test("ucsf.analytics.trackPageview() global and path keys, path match", function()
{
    ucsf.analytics.trackPageview("/library/baz.html");
    same(_gaq,
        [["_trackPageview", "/library/baz.html"],["t0._trackPageview", "/library/baz.html"]],
        "reporting should occur if for both keys");
});

test("ucsf.analytics constructor notes native app", function()
{
    _gaq = [];
    var save = _gaq;
    ucsf.analytics.init('some random UA string prefix and then mwf-native-iphone/2.1');
    var success = false;

    for (var i=0; i<save.length; i++) {
        if (save[i][0]==='_setCustomVar' && save[i][1]===1 &&
            save[i][2]==='mwf_native_client' && save[i][3]==='1') {
            success=true;
        }
    }
    ok(success, 'analytics constructor should note native app');
});

 test("ucsf.analytics constructor notes iOS native app", function() {
    _gaq = [];
    var save = _gaq;
    ucsf.analytics.init('some random UA string prefix and then MWF-Native-iOS/1.2.07');
    var success = false;

    for (var i=0; i<save.length; i++) {
        if (save[i][0]==='_setCustomVar' && save[i][1]===1 &&
            save[i][2]==='mwf_native_client' && save[i][3]==='1') {
            success=true;
        }
    }
    ok(success, 'analytics constructor should note native app');
 });