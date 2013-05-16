FastClick.attach(document.body);

// FastClick + offline appcache + entities not in offline appcache =
//  links that do nothing when they should report a "you're offline!" error
// If we convert everything to SPA, we'll still need something like this
//  for offsite links.

if (window.addEventListener) {
    window.addEventListener(
        'unload',
        function() {
            if (window.navigator.onLine && window.navigator.onLine === false) {
                window.alert('Some content may not be available because you are offline.');
            }
        },
        false
    );
}