/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
window.addEventListener("load", () => {
	function updateElements() {
		var imgSrc = "https://cataas.com/cat/";
		var titleText = "Meooow";
		document.getElementById("Img").src = imgSrc;
		document.title = titleText;
		document.getElementById("titleSpace").innerHTML = titleText;
		document.getElementById("desc").innerHTML = "Thanks to <a href=\"https://cataas.com\">CAT AS A SERVICE</a> for the cat images!";
	}
	updateElements();
});
