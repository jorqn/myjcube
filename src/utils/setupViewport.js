(function () {
    "use strict"

    function isMobile() {
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	    return true;
	}
	return false;
    }

    window.mobileMode = isMobile();
    if(window.mobileMode) {
	var meta = document.createElement('meta');
	meta.setAttribute("name", "viewport");
	meta.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0");
	document.head.appendChild(meta);
    }    

})()
