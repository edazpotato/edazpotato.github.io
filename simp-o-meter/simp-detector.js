function loop(ctx) {
  
}

function setup() {
  var canvas = document.getElementById("simpcanvas");
  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
  }
  img.src = "https://edazpoato.github.io/assets/simpometer-bg.png";
  loop(ctx)
}
document.addEventListener("DOMContentLoaded", setup);
