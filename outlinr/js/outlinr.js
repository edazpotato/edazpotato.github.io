function updateTabs(){
  for (var el of document.getElementById("content").children) {
    var kid = el.children[0];
    kid.classList.remove("active");
  }
  var hash = location.hash;
  var anchorID = hash.slice(1);
  var activeTab = document.getElementByID(anchorID);
  activeTab.classList.add("active");
}

function updateLinks(e){
  for (var el of document.getElementById("sidebar-items").children) {
    var kid = el.children[0];
    kid.classList.remove("active-link");
  }
  var source = event.target || event.srcElement;
  source.classList.add("active-link");
  updateTabs();
}

function setup(){
  location.hash = "/home";
  updateTabs();
  for (var el of document.getElementById("sidebar-items").children) {
    var kid = el.children[0];
      kid.addEventListener("click", updateLinks);
  }
}

document.addEventListener("DOMContentLoaded", function(){
  setup();
});
