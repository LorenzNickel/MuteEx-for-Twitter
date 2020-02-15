window.onload = function() {
	var div = document.getElementById('info');
	document.getElementById('add').onclick = function() {
		chrome.storage.sync.get(['expressions'], function (result) {
			if(result.expressions) {
				expressions = result.expressions;
			} else {
				expressions = [];
			}
			expressions.push(document.getElementById('expression').value);
			chrome.storage.sync.set({expressions: expressions}, function() {
				div.innerHTML = "Expression has been added!";
				showList();
			});
		});
	};
	showList();
}

function showList() {
	chrome.storage.sync.get(['expressions'], function (result) {
		if(result.expressions) {
			expressions = result.expressions;
		} else {
			expressions = [];
		}
		var div = document.getElementById('list');
		var table = '';
		table += '<table>';
		for(var i = 0; i < expressions.length; i++) {
			table += '<tr>';
			table += '<td>'+expressions[i]+'</td>';
			table += '<td><button type="button" id="remove_'+i+'">X</button></td>';
			table += '<tr>';
		}
		table += '</table>';
		div.innerHTML = table;
		for(var i = 0; i < expressions.length; i++) {
			document.getElementById('remove_'+i).onclick = function(mouse) {
				chrome.storage.sync.get(['expressions'], function (result) {
					if(result.expressions) {
						expressions = result.expressions;
					} else {
						expressions = [];
					}
					newlist = expressions;
					for(var j = 0; j < expressions.length; j++) {
						if('remove_'+j === mouse.target.id) {
							newlist.splice(j, 1);
						};
					}
					chrome.storage.sync.set({expressions: newlist}, function() {
						document.getElementById('info').innerHTML = "Expression has been removed!";
						showList();
					});
				});
			};
		}
	});
}