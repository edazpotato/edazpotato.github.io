var rick = {
  load: function(el){
    rickvid = '<iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&loop=1&modestbranding=1&showinfo=0&rel=0&theme=light&fs=0&color=white&controls=0&disablekb=1" width="560" height="315" frameborder="0"></iframe>';
    if (el.innerHTML.length < 1) {
      el.innerHTML = rickvid;
    }
  },
  roll: function(){
    document.getElementById("rick_modal").checked = true;
  }
}
Mousetrap.bind('up up down down left right left right b a enter', function() {
  rick.load(document.getElementById("rick_video_container"));
  rick.roll();
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
