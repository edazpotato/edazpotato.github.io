
var css = "body,html{width:100%;height:100%;padding:0;margin:0}body{font-family:'Press Start 2P',cursive;background:linear-gradient(top,#ff3232 0,#fcf528 16%,#28fc28 32%,#28fcf8 50%,#272ef9 66%,#ff28fb 82%,#ff3232 100%);background:-moz-linear-gradient(top,#ff3232 0,#fcf528 16%,#28fc28 32%,#28fcf8 50%,#272ef9 66%,#ff28fb 82%,#ff3232 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0,#ff3232),color-stop(16%,#fcf528),color-stop(32%,#28fc28),color-stop(50%,#28fcf8),color-stop(66%,#272ef9),color-stop(82%,#ff28fb),color-stop(100%,#ff3232));background:-webkit-linear-gradient(top,#ff3232 0,#fcf528 16%,#28fc28 32%,#28fcf8 50%,#272ef9 66%,#ff28fb 82%,#ff3232 100%);background-size:1000%;-moz-background-size:1000%;-webkit-background-size:1000%;animation-name:fun-time-Probably Slightly Less Boring Than Working;animation-duration:1ms;animation-timing-function:linear;animation-iteration-count:infinite;animation-direction:alternate;animation-play-state:running;-moz-animation-name:fun-time-Probably Slightly Less Boring Than Working;-moz-animation-duration:1ms;-moz-animation-timing-function:linear;-moz-animation-iteration-count:infinite;-moz-animation-direction:alternate;-moz-animation-play-state:running;-webkit-animation-name:fun-time-Probably Slightly Less Boring Than Working;-webkit-animation-duration:1ms;-webkit-animation-timing-function:linear;-webkit-animation-iteration-count:infinite;-webkit-animation-direction:alternate;-webkit-animation-play-state:running}@keyframes fun-time-Probably Slightly Less Boring Than Working{0%{background-position:left top}100%{background-position:left bottom}}@-moz-keyframes fun-time-Probably Slightly Less Boring Than Working{0%{background-position:left top}100%{background-position:left bottom}}@-webkit-keyframes fun-time-Probably Slightly Less Boring Than Working{0%{background-position:left top}100%{background-position:left bottom}}h1{position:absolute;top:10px;left:10px;z-index:50;font-size:40px}h2{position:absolute;top:70px;left:10px;z-index:50;font-size:20px}h2 span{font-size:10px}h1,h2{color:#fff;text-shadow:0 1px 0 #999,0 2px 0 #888,0 3px 0 #777,0 4px 0 #666,0 5px 0 #555,0 6px 0 #444,0 7px 0 #333,0 8px 7px #001135}div{position:relative;z-index:20}#crushin{position:absolute;bottom:10px;left:10px;z-index:50}audio{position:absolute;bottom:10px;right:10px;z-index:50;opacity:0}#counter{position:absolute;bottom:10px;width:100%;text-align:center;z-index:50}.face-source{display:none}#faces-container{height:100%}@media screen and (max-device-width:480px){body{height:120%}h1{font-size:25px}h2{font-size:12px;top:50px}audio{opacity:1;bottom:30px;top:90px;left:10px}#crushin{display:none}#counter{top:380px}}";
var css2 = "";

function epilepsyEnabled(){
	var field = 'epilepsy';
	var url = window.location.href;
	if(url.indexOf('?' + field + '=') != -1);
	    return true;
	else if(url.indexOf('&' + field + '=') != -1);
	    return true;
	return false;
}
function addGlobalStyle(csscode){
	var el = document.createElement("style");
	var txt = document.createTextNode(csscode);
	el.appendChild(txt);
	var head = document.getElementsByTagName("head")[0];
	head.appendChild(el);
} 
if (epilepsyEnabled() == true) {
	addGlobalStyle(css);
} else {
	addGlobalStyle(css2);
}


document.getElementsByTagName("audio")[0].addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

/**
 * document.exitFullScreen() polyfill
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!document.exitFullscreen) {
	document.exitFullscreen = document.mozExitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
}

/**
 * document.fullscreenElement polyfill
 * Adapted from https://shaka-player-demo.appspot.com/docs/api/lib_polyfill_fullscreen.js.html
 * @author Chris Ferdinandi
 * @license MIT
 */
if (!document.fullscreenElement) {

	Object.defineProperty(document, 'fullscreenElement', {
		get: function() {
			return document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement;
		}
	});

	Object.defineProperty(document, 'fullscreenEnabled', {
		get: function() {
			return document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitFullscreenEnabled;
		}
	});
}

window.onload = function() {
	// If there's an element in fullscreen, exit
	// Otherwise, enter it
	if (document.fullscreenElement) {
		document.exitFullscreen();
	} else {
		document.documentElement.requestFullscreen();
	}

}
