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
var prettifyXml = function(xml) {
var reg = /(>)\s*(<)(\/*)/g; // updated Mar 30, 2015
        var wsexp = / *(.*) +\n/g;
        var contexp = /(<.+>)(.+\n)/g;
        xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
        var pad = 0;
        var formatted = '';
        var lines = xml.split('\n');
        var indent = 0;
        var lastType = 'other';
        // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions 
        var transitions = {
            'single->single': 0,
            'single->closing': -1,
            'single->opening': 0,
            'single->other': 0,
            'closing->single': 0,
            'closing->closing': -1,
            'closing->opening': 0,
            'closing->other': 0,
            'opening->single': 1,
            'opening->closing': 0,
            'opening->opening': 1,
            'opening->other': 1,
            'other->single': 0,
            'other->closing': -1,
            'other->opening': 0,
            'other->other': 0
        };

        for (var i = 0; i < lines.length; i++) {
            var ln = lines[i];

            // Luca Viggiani 2017-07-03: handle optional <?xml ... ?> declaration
            if (ln.match(/\s*<\?xml/)) {
                formatted += ln + "\n";
                continue;
            }
            // ---

            var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
            var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
            var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
            var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
            var fromTo = lastType + '->' + type;
            lastType = type;
            var padding = '';

            indent += transitions[fromTo];
            for (var j = 0; j < indent; j++) {
                padding += '\t';
            }
            if (fromTo == 'opening->closing')
                formatted = formatted.substr(0, formatted.length - 1) + ln + '\n'; // substr removes line break (\n) from prev loop
            else
                formatted += padding + ln + '\n';
        }
        // escape xml by replacing tags with html entities
        var escaped = formatted.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
        return escaped;
}
/* csv */
function tableifyCSV(data) {
	var lines = data.split("\n");
	var output = [];
	var i;
	for (i = 0; i < lines.length; i++)
	    output.push("<tr><td>"
	                + lines[i].slice(0,-1).split(",").join("</td><td>")
	                + "</td></tr>");
	return "<table>" + output.join("") + "</table>";
}
function isCSV(csv) {
	try {
		var data = csv.split(",").filter(function(){return true;});
		if (data.length >= 2) {
			return true
		}
		return false
	} catch(e) {
		return false;
	}
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
			appEl.innerHTML = "<pre>" + syntaxHighlightJson(str) + "</pre>";
			document.title = "Fetched JSON!";
		} else if (isCSV(text)) {
			var csv = text;
			var table = tableifyCSV(csv);
			appEl.innerHTML = table;
			document.title = "Fetched CSV!";
		} else if (isXML(text)) {
			var xml = text;
			var prettyXml = prettifyXml(xml);
			appEl.innerHTML = "<pre>" + prettyXml + "</pre>";
			document.title = "Fetched XML!";
		} else {
			oopsie("The provided data is not in a supported data type (JSON, XML, CSV)")
		}
	} catch (e) {
		oopsie(e)
	}
}
