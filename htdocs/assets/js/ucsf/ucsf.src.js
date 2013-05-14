var ucsf = ucsf || {};

ucsf.spin = function (el) {
	el.innerHTML = '<div class="spinner"></div>';
	document.body.setAttribute("style", "background:rgba(0,0,0,0.5)");
};

FastClick.attach(document.body);