function updatescale() {
  
}

function setup() {
  var canvas = document.getElementById("simpcanvas");
  var ctx = canvas.getContext("2d");
  var scale = new Image();
  scale.onload = function() {
    ctx.drawImage(scale, 0, 0);
  }
  scale.src = "https://edazpoato.github.io/assets/scale.webp";
}
document.addEventListener("DOMContentLoaded", setup);
