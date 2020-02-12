/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
window.addEventListener("load", () => {
	function updateElements(data) {
		var imgSrc = data.img;
		var titleText = data.title;
		var creditText = "Todays comic from <a href=\"https://xkcd.com\">XKCD.com</a>";
    var postLink = "https://xkcd.com/"+data.num;
    var imgAltText = data.alt;
		document.getElementById("Img").src = imgSrc;
    document.getElementById("Img").alt = imgAltText;
		document.title = titleText;
		document.getElementById("titleSpace").innerHTML = titleText;
		document.getElementById("desc").innerHTML = creditText;
    document.getElementById("postLink").setAttribute("href", postLink);
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
	getJSON("https://xkcd.com/info.0.json", (err, data) => {
		if (err !== null) {
			console.error("Something went wrong: " + err);
		} else {
			updateElements(data);
		}
	});
});
