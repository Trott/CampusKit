var ucsf = ucsf || {};

ucsf.spin = function (el) {
	el.innerHTML = '<div class="spinner"></div>';
	// Check that setAttribute() exists so that IE7 doesn't blow up
	// if ('setAttribute' in document.body) {
    //  document.body.setAttribute("style", "background:rgba(0,0,0,0.5)");
	// }
	return true;
};

FastClick.attach(document.body);