var rick = {
  roll: function(){
    document.getElementById("rick_modal").checked = true;
  }
}
Mousetrap.bind('up up down down left right left right b a enter', function() {
    rick.roll();
});

window.addEventListener('scroll', function() {
  // Hide arrow button when scrolling down the page 
  var scrollPosition = window.scrollY; 
  var arrow = document.getElementById('arrow'); 
  if (scrollPosition >= 100) {
    arrow.classList.add('hide'); 
  } else {
    arrow.classList.remove('hide'); 
  }
});

/* picnic.css javascript stuff */
document.onkeydown = function(e){
  if (e.keyCode == 27) {
    var mods = document.querySelectorAll('.modal > [type=checkbox]');
    [].forEach.call(mods, function(mod){ mod.checked = false; });
  }
}
document.addEventListener("DOMContentLoaded", function() {
  [].forEach.call(document.querySelectorAll('.dropimage'), function(img){
    img.onchange = function(e){
      var inputfile = this, reader = new FileReader();
      reader.onloadend = function(){
        inputfile.style['background-image'] = 'url('+reader.result+')';
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  });
});
