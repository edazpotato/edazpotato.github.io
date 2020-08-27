function setup(){
  if (location.hash == ""){
    location.hash = "home";
  }
}

document.addEventListener("DOMContentLoaded", function(){
  setup();
});
