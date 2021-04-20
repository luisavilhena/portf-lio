var apresentation = document.getElementById("apresentation");


window.onscroll = function() {
	if (window.pageYOffset > 1000) {
			apresentation.style.display = "none";
	} else {
		apresentation.style.display = "block";
	}
}

$(document).ready(function() {
  var $magic = $(".magic"),
      magicWHalf = $magic.width() / 2;
      // magicHeight = $magic.mousemo7e();
  // console.log(magicHeight)

  // $(document).on("mousemove", function() {
  //   $magic.css
  // })
  $(document).on("mousemove", function(e) {
    $magic.css({"left": e.pageX - 650, "top": e.pageY - magicWHalf});
  });
});

