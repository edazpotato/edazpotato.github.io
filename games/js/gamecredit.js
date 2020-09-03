function creditPopup(name, source) {
	var styleEl = document.createElement("style");
	styleEl.innerText = ".creditpPopup {position: absolute; right: 10; top: 0; border-raidus: 30px; height: 5vh; width: auto; padding: 10%; background-color: #ffffff; color: #000000;}\n .creditPopup p {font-size: 2vw; opacity: 80%;}";
	document.body.appendChild(styleEl);
	var pEl = document.createElement("p");
	pEl.innerHTML = "Click <a href=\"" + source + "\" target=\"_blank\" rel=\"noreferer\">here</a> to view the original version of " + name;
	var boxEl = document.createElement("div");
	boxEl.classList.add("creditPopup");
	boxEl.appendChild(pEl);
	document.body.insertBefore(boxEl, document.body.firstChild);
	function hidePopup() {
		var el = document.getElementsByClassName("creditPopup")[0];
		el.style.display = "none";
	}
	//setTimeout(hidePopup, 10000)
}
