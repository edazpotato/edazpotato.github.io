/* main stuff*/
var appEl = document.getElementById("app");
doTheThings();

/* functions for validating and parseing data types */

/*json */
function isJson(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}
function syntaxHighlightJson(json) {
	json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
		var cls = 'number';
		if (/^"/.test(match)) {
			if (/:$/.test(match)) {
				cls = 'key';
			} else {
				cls = 'string';
			}
		} else if (/true|false/.test(match)) {
			cls = 'boolean';
		} else if (/null/.test(match)) {
			cls = 'null';
		}
		return '<span class="' + cls + '">' + match + '</span>';
	});
}
/* xml */
function isXML(xmlStr) {
	var parseXml;

	if (typeof window.DOMParser != "undefined") {
		parseXml = function(xmlStr) {
			return (new window.DOMParser()).parseFromString(xmlStr, "text/xml");
		};
	} else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
		parseXml = function(xmlStr) {
			var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = "false";
			xmlDoc.loadXML(xmlStr);
			return xmlDoc;
		};
	} else {
		return false;
	}

	try {
		parseXml(xmlStr);
	} catch (e) {
		return false;
	}
	return true;
}
var prettifyXml = function(sourceXml) {
	var xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
	var xsltDoc = new DOMParser().parseFromString([
		// describes how we want to modify the XML - indent everything
		'<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">',
		'  <xsl:strip-space elements="*"/>',
		'  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
		'    <xsl:value-of select="normalize-space(.)"/>',
		'  </xsl:template>',
		'  <xsl:template match="node()|@*">',
		'    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>',
		'  </xsl:template>',
		'  <xsl:output indent="yes"/>',
		'</xsl:stylesheet>',
	].join('\n'), 'application/xml');

	var xsltProcessor = new XSLTProcessor();
	xsltProcessor.importStylesheet(xsltDoc);
	var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
	var resultXml = new XMLSerializer().serializeToString(resultDoc);
	return resultXml;
}
/* csv */
function tabilifyCSV(data) {
	var lines = data.split("\n");
	var output = [];
	var i;
	for (i = 0; i < lines.length; i++)
	    output.push("<tr><td>"
	                + lines[i].slice(0,-1).split(",").join("</td><td>")
	                + "</td></tr>");
	return "<table>" + output.join("") + "</table>";
}
/* other functions */
function oopsie(e) {
	console.error("CRRRRITICAL ERORORRRR!!!: " + e);
	appEl.innerHTML = '<span class="key">An error occured!</span><br/><span class="boolean"><i>Perhaps the data is no vaild JSON or XML or CSV or you didn\'t provide a valid url in the <code class="string">url</code> query parameter</i></span><br/><br/><span class="number">Example usage: <code class="null">https://edazpotato.github.io/fetch?url=https://edazpotato.github.io/example.json</code></span>';
	document.title = "Something went wrong while fetching!"
}
async function doTheThings() {
	try {
		document.title = "Fetching..."
		var getParams = function(url) {
			var params = {};
			var parser = document.createElement('a');
			parser.href = url;
			var query = parser.search.substring(1);
			var vars = query.split('&');
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split('=');
				params[pair[0]] = decodeURIComponent(pair[1]);
			}
			return params;
		};
		var params = getParams(window.location.href);
		var url = params.url;
		var res = await fetch(url);
		var text = await res.text();
		if (isJson(text)) {
			var json = JSON.parse(text);
			var str = JSON.stringify(json, undefined, 4);
			appEl.innerHTML = syntaxHighlightJson(str);
			document.title = "Fetched JSON!";
		} else if (isXML(text)) {
			var xml = text;
			var prettyXml = prettifyXml(xml);
			appEl.innerText = prettyXml;
			document.title = "Fetched XML!";
		} else if (isCSV(text)) {
			var xml = text;
			var table = tableifyCSV(xml);
			appEl.innerHTML = table;
			document.title = "Fetched CSV!";
		} else {
			oopsie("The provided data is not in a supported data type (JSON, XML, CSV)")
		}
	} catch (e) {
		oopsie(e)
	}
}
