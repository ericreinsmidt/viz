var xhr = false;
function makeRequest(url) {
	if (window.XMLHttpRequest)
	{
		xhr = new XMLHttpRequest();
	}
	else {
		if (window.ActiveXObject)
		{
			try { xhr = new ActiveXObject("Microsoft.XMLHTTP"); }
			catch (e) { }
		}
	}
	if (xhr) {
		xhr.onreadystatechange = showContents;
		xhr.open("GET", url, true);
		xhr.send(null);
	} else {
		document.write("ERROR - could not create XMLHttpRequest");
	}
}
 
function showContents() 
{
	var doc = '';
	if (xhr.readyState == 4) 
	{
		if (xhr.status == 200 || xhr.status == 0) 
		{
			doc = xhr.responseText;
			dispCSV(doc);
		} else {
			document.write("ERROR - " + xhr.status);
	 	}
	}
}
function dispCSV(csvdoc) {
	lines = csvdoc.split("\n");
	var html_string = "<table style=\"display:none;\">"+
	"<caption>" + lines[0] + "</caption>"+
	"<thead>"+
	"<tr>"+
	"<td></td>";

	categories = lines[1].split(",");
	for (var i = 0;i<categories.length;i++) {
		html_string += "<th scope=\"col\">";
		html_string += categories[i];
		html_string += "</th>";
	}
	html_string += "</tr></thead><tbody>";

	for (var i = 2; i < lines.length; i++) {
		elems = lines[i].split(",");
		html_string += "<tr><th scope=\"row\">" + elems[0] + "</th>";
		for (var j = 1; j < elems.length; j++) {
			html_string += "<td>" + elems[j] + "</td>";
		}
		html_string += "</tr>";
	}
	html_string += "</tbody></table>";
	$('#data_div').html(html_string);
	$('table').visualize({type: 'bar', width: '420px'});
	$('#buttons2').html("<a class=\"myButton\" onclick=\"$('.visualize').remove(); $('table').visualize({type: 'pie', height: '300px', width: '420px'});\">Pie</a> <a class=\"myButton\" onclick=\"$('.visualize').remove(); $('table').visualize({type: 'bar', width: '420px'});\">Bar</a> <a class=\"myButton\" onclick=\"$('.visualize').remove(); $('table').visualize({type: 'area', width: '420px'});\">Area</a> <a class=\"myButton\" onclick=\"$('.visualize').remove(); $('table').visualize({type: 'line', width: '420px'});\">Line</a>");
}