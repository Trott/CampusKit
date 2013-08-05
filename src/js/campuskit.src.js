FastClick.attach(document.body);

// FastClick + offline appcache + links to pages not in offline appcache + iOS Safari =
//  links that do nothing when they should report a "you're offline!" error
// If we convert everything to SPA, we'll still need something like this
//  for offsite links.
//
// TODO: Since most people don't use appcache (and we're not using it either), and many
//  that use it won't have offsite links, maybe this can all go anyway?

if (window.addEventListener) {
    window.addEventListener(
        'click',
        function () {
            if (window.navigator.onLine !== void 0 && window.navigator.onLine === false) {
                // Wait 100 ms to let appcached content load so we don't throw the alert
                // if either the browser knows to put up a "you're offline!" page or if
                // the page is in the appcache.
                window.setTimeout(
                    function () {
                        window.alert('Some content may not be available because you are offline.');
                    },
                    100
                );
            }
        },
        false
    );
}

