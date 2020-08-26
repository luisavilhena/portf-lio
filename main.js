var apresentation = document.getElementById("apresentation");


window.onscroll = function() {
	if (window.pageYOffset > 1000) {
			apresentation.style.display = "none";
	} else {
		apresentation.style.display = "block";
	}
}

