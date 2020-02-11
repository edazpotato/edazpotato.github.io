/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
window.addEventListener("load", () => {
	function updateElements(data) {
		var imgSrc = data.url;
		var titleText = data.title;
		var creditText = "That meme was from r/"+data.subreddit+"!";
    		var postLink = data.postLink;
		document.getElementById("memeImg").src = imgSrc;
		document.title = titleText;
		document.getElementById("titleSpace").innerHTML = titleText;
		document.getElementById("credit").innerHTML = creditText;
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
	getJSON("https://meme-api.herokuapp.com/gimme", (err, data) => {
		if (err !== null) {
			console.error("Something went wrong: " + err);
		} else {
			updateElements(data);
		}
	});
});
