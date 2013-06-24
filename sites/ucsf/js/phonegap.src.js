/* global cordova, document, window */

window.alert('checking for addEventListener');
if (document.addEventListener) {
    window.alert('adding deviceready callback');
    document.addEventListener('deviceready', function () {
        'use strict';

        window.alert('deviceready!');

        var navBar = cordova.require('cordova/plugin/iOSNavigationBar');

        navBar.init();

        navBar.create();
        // or to apply a certain style (one of "Black", "BlackOpaque", "BlackTranslucent", "Default"):
        // navBar.create("BlackOpaque")
        // or with a yellow tint color (note: parameters might be changed to one object in a later version)
        // navBar.create('BlackOpaque', {tintColorRgba: '255,255,0,255'})

        //navBar.hideLeftButton();
        navBar.hideRightButton();

        navBar.setTitle('UCSF Mobile');
        // or with a logo image
        //navBar.setLogo("SomeImageFileFromResourcesOrURL.png")

        navBar.showLeftButton();
        //navBar.showRightButton()

        // Create left navigation button with a title (you can either have a title or an image, not both!)
        //navBar.setupLeftButton('Text', null, function() {
        //    alert("left nav button tapped")
        //})

        // Create right navigation button from a system-predefined button (see the full list in NativeControls.m)
        // or from an image
        // navBar.setupRightButton(
        //     null,
        //     "barButton:Bookmarks", // or your own file like "/www/stylesheets/images/ajax-loader.png",
        //     function() {
        //         alert("right nav button tapped")
        //     }
        // )

        navBar.setupLeftButton(
            null,
            'barButton:Back',
            function () {
                window.history.go(-1);
            });

        // You can also enable/disable a button
        //navBar.setLeftButtonEnabled(true)
        //navBar.setRightButtonEnabled(true) // enabled (default)

        // or change the tint color (>= iOS 5)
        //navBar.setLeftButtonTint('255,0,0,128') // strong red
        //navBar.setRightButtonTint('20,180,0,60') // green

        navBar.show();
    }, false);
    window.alert('added deviceready callback');
}