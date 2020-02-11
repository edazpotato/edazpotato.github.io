/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
window.addEventListener("load", () => {
	function updateElements(data) {
		var imgSrc = data.file;
		var titleText = "Meooow";
		document.getElementById("Img").src = imgSrc;
		document.title = titleText;
		document.getElementById("titleSpace").innerHTML = titleText;
		document.getElementById("desc").innerHTML = "Thanks to <a href=\"https://random.cat\">random.cat</a> for the cat images!";
	}
	//something
	var getJSON = function(url, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.responseType = "json";
		xhr.onload = function() {
			var status = xhr.status;
			if (status === 200) {
				callback(null, xhr.response);
			} else {
				callback(status, xhr.response);
			}
		};
		xhr.send();
	};
	getJSON("https://aws.random.cat/meow", (err, data) => {
		if (err !== null) {
			console.error("Something went wrong: " + err);
		} else {
			updateElements(data);
		}
	});
});
