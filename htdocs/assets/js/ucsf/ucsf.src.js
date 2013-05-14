var ucsf = ucsf || {};

ucsf.spin = function (el) {
	el.innerHTML = '<div class="spinner"></div>';
	// Check that setAttribute() exists so that IE doesn't blow up
	if ('setAttribute' in document.body) {
		document.body.setAttribute("style", "background:rgba(0,0,0,0.5)");
	}
};

FastClick.attach(document.body);