var ucsf = ucsf || {};

ucsf.spin = function (el) {
    el.innerHTML = '<div class="spinner"></div>';
    document.body.setAttribute("style", "background:rgba(0,0,0,0.5)");
};

(function () {
    if (document.addEventListener && document.getElementByClassName) {
        var icons = document.getElementByClassName('dashboard_icon');
        for (var i=0, l=icons.length; i<l; i++) {
            icons[i].addEventListener('click', ucsf.spin, false);
        }
    }
}());