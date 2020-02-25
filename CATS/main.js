/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
window.addEventListener("load", () => {
	function updateElements(data) {
		var imgSrc = data[0].url;
		var titleText = "Meooow";
		document.getElementById("Img").src = imgSrc;
		document.title = titleText;
		document.getElementById("titleSpace").innerHTML = titleText;
		document.getElementById("desc").innerHTML = "Thanks to <a href=\"https://thecatapi.com\">TheCatAPI.com</a> for the cat images!";
	};
	const url = new URL("https://api.thecatapi.com/v1/images/search");
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.responseType = "json";
	xhr.setRequestHeader("x-api-key", "f13319fb-96d3-4712-80e3-bf9401f77b62");
	xhr.send();
	
	xhr.onload = function() {
	  console.log(`Loaded: ${xhr.status} ${JSON.stringify(xhr.response)}`);
	  updateElements(xhr.response)
	};

	xhr.onerror = function(e) { // only triggers if the request couldn't be made at all
	  console.error(`Network Error - ${e}`);
	};
});
