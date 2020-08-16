console.log("Yay it works.")

var hoverCards = document.getElementsByClassName("3dhover");
console.log(hoverCards)
for (var el of hoverCards) {

	/* 3D hover effect from this article: https://technokami.in/3d-hover-effect-using-javascript-animations-css-html */
	var height = el.clientHeight
	var width = el.clientWidth

	el.addEventListener('mousemove', handleMove)

	function handleMove(e) {

	  var xVal = e.layerX;
	  var yVal = e.layerY;
	  
	  var yRotation = 1.5 * ((xVal - width / 2) / width);
	  
	  var xRotation = -1.5 * ((yVal - height / 2) / height);
	  
	  var string = 'perspective(500px) scale(1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';
	  
	  el.style.transform = string;
	}

	el.addEventListener('mouseout', function() {
	  el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
	});

}
