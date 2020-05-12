// JavaScript Document
var reportsElement = document.getElementById("reports");
getReports();

function getReports() {
	fetch("/macpoc-website/investors/reports/reports.json")
		.then(response => response.json())
		.then(json => {
			doTheThings(json);
			console.log("Loaded file: " + json)
		});
}

function doTheThings(json) {
	const reports = json.reports;
	console.log("Loop about to run: " + reports)
	for (const report of reports) {
		console.log("Loop iterated" + report)
		var reportLink = document.createElement("a");
		reportLink.setAttribute("href", report.path);
		reportLink.setAttribute("target", "_blank");
		var reportText = document.createTextNode(report.name);
		reportLink.appendChild(reportText);

		var listItem = document.createElement("li");
		listItem.setAttribute("class", "col");
		listItem.appendChild(reportLink);
		var listItemSpacer = document.createElement("li");
		listItemSpacer.setAttribute("class", "li-line col");

		var listItemContainer = document.createElement("div");
		listItemContainer.setAttribute("class", "list-element-container");
		listItemContainer.appendChild(listItem);
		listItemContainer.appendChild(listItemSpacer);
		reportsElement.appendChild(listItemContainer);
	}
}
