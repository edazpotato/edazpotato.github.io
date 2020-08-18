function updateLinks(e){
  console.log(e);
  var source = event.target || event.srcElement;
  console.log(source);
  for (var el of document.getElementById("sidebar-items").children) {
    var kid = el.children[0];
    kid.classList.remove("active");
  }
  source.classList.add("active-link");
}

function setup(){
  for (var el of document.getElementById("sidebar-items").children) {
    var kid = el.children[0];
      kid.addEventListener("click", updateLinks);
  }
}

document.addEventListener("DOMContentLoaded", function(){
  setup();
});
