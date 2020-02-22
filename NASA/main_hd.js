/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
window.addEventListener("load", () => {
	function updateElements(data) {
		var hdSrc = data.hdurl;
		var titleText = data.title;
		var descText = data.explanation;
		document.getElementById("dailyImg").src = hdSrc;
		document.title = titleText;
		document.getElementById("titleSpace").innerHTML = titleText;
		document.getElementById("desc").innerHTML = descText;
	}
	//somehing
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
	getJSON("https://api.nasa.gov/planetary/apod?api_key=hmtsujfQhwO6bMIVzbMVuUasBTDWBnvfUMBRN2Tc", (err, data) => {
		if (err !== null) {
			console.error("Something went wrong: " + err);
		} else {
			updateElements(data);
		}
	});
});
