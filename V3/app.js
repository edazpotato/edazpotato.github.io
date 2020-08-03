var rick = {
  roll: function(){
    document.getElementById("rick_modal").checked = true;
  }
}
Mousetrap.bind('up up down down left right left right b a enter', function() {
    rick.roll();
});

/* picnic.css javascript stuff */
document.onkeydown = function(e){
  if (e.keyCode == 27) {
    var mods = document.querySelectorAll('.modal > [type=checkbox]');
    [].forEach.call(mods, function(mod){ mod.checked = false; });
  }
}
