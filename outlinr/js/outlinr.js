function updateLinks(e){
  console.log(e);
}

function setup(){
  for (var el of document.getElementById("sidebar-items").children) {
      el.addEventListener("click", updateLinks);
  }
}

document.addEventListener("DOMContentLoaded", function(){
  setup();
});
