var replaceTextInNode = function(parentNode,wage) {
	// Iterate through all the HTML elements on the page:
	for (var i = parentNode.childNodes.length - 1; i >= 0; i--) {
		var node = parentNode.childNodes[i];

		// Check if the element is a text node:
		if (node.nodeType == Element.TEXT_NODE) {
			// Check if text node contains a dollar value (requires dollar sign at the beginning, and proper dollar format: $XX.YY)
			if (node.textContent.match(/\$[0-9]+\.[0-9][0-9](?:[^0-9]|$)/i)) {
				// Store cost in array (technically stores all prices in the text element, but we will only use the first at index 0):
				var prices = node.textContent.match(/\$[0-9,]+\.[0-9][0-9](?:[^0-9]|$)/i);
				var price = prices[0];

				if (price.length == node.textContent.trim().length) {
					// Calculate hours needed to work to cover cost, and add to text string:
					var calculatedTime = price.replace("$", "");
					calculatedTime = Math.round((calculatedTime / wage) * 100) / 100;
					node.textContent = node.textContent.replace(price, price + " (" + calculatedTime + " hours)");

					// Add a wrapper div around text element containing price:
					var parent = node.parentNode;
					var wrapper = document.createElement('div');
					wrapper.setAttribute('class', 'linkWrapper');
					parent.replaceChild(wrapper, node);
					wrapper.appendChild(node);
					console.log("Before domain extract");

					// Get page URL base:
					var domain = extractDomain(document.domain);

					// Create a hoverbox:
					var hoverbox = document.createElement('div');
					hoverbox.setAttribute('class', 'hoverbox');
					var floatprice = Number(price.substring(1,price.length));
					var hiddenbox = document.createElement('div');
					hiddenbox.setAttribute('visibility','hidden');
					hiddenbox.id = "hiddenscrape";
					hiddenbox.innerHTML = domain + "," + price

					hoverbox.innerHTML = "At $"+wage+"/hr, it will take " + calculatedTime + " hours of work to cover the cost of this purchase.<br><br>Do you still plan to buy this item?<br><div id=\"yesBtn\" class=\"ext-button green\" onclick=\"logData(\"" + domain.trim() + "\", " + floatprice + ")\">Yes</div><div id=\"NoBtn\" class=\"ext-button red\" >No</div>";
					wrapper.appendChild(hoverbox);


					document.getElementById("yesBtn").addEventListener("click", function(){
					    chrome.storage.sync.get('tac-list', function(data) {
							l = data['tac-list']


							var timestamp = new Date().valueOf();
							l.push([timestamp, [domain, floatprice]]);
							var obj = {};
							obj['tac-list'] = l;
							console.log("logging new vendor data")
							store_pref(obj);
						});
					});

					document.getElementById("NoBtn").addEventListener("click", function(){
					    chrome.storage.sync.get('tac-savings', function(data) {
					    	var l
					    	if (Object.keys(data).length === 0 && data.constructor === Object){
								l = []
							}
							else{
								l = data['tac-savings']

							}
							alert("You just saved $" + floatprice.toFixed(2) + " and " + Number(floatprice / wage).toFixed(2) + " hours of work!")
							var timestamp = new Date().valueOf();
							l.push([timestamp, [domain, floatprice]]);
							var obj = {};
							obj['tac-savings'] = l;
							console.log("logging new vendor data to savings list.")
							store_pref(obj);
						});
					});
				}
			}
		} else if (node.nodeType == Element.ELEMENT_NODE) {
			replaceTextInNode(node,wage);
		}
	}
};


chrome.storage.sync.get('tac-wage', function(data){
	console.log(data)
	var wage;
	if (!(Object.keys(data).length === 0 && data.constructor === Object)){
		console.log("initializing from wage.")
		wage = data['tac-wage']		
	}
	else{
		console.log("No inputs for tac-wage. initializing.")
		var obj = {} 
		obj['tac-wage'] = 0.0
		store_pref(obj);
		wage = data['tac-wage']
	}
	
replaceTextInNode(document.body,wage);

});

// Derived from stackoverflow.com/questions/8498592/extract-root-domain-name-from-string
// http://www.hottopic.com/product/twenty-one-pilots-logo-guys-pajama-pants/10565776.html?cgid=guys-pajamas
function extractDomain(url) {
	var domain;

	if (url.indexOf("://") > -1) {
		domain = url.split('/')[2];
		domain = domain.split('/')[0]
	} else {
		domain = url.split('/')[0];
	}

	domain = domain.split(':')[0];
	console.log(domain)
	return domain;
}
/*
function hideHoverbox1() {
	var hoverboxes = document.getElementsByClassName("hoverbox")
	for (var i = 0; i < hoverboxes.length; i++) {
		hoverboxes[i].setAttribute("display", "none");
	}
}*/

function logData(vendor, price) {
	chrome.storage.sync.get('tac-list', function(data) {
		l = data['tac-list']
		var timestamp = new Date().valueOf();
		l.push([timestamp, [vendor, price]]);
		var obj = {};
		obj['tac-list'] = l;
		console.log("logging new vendor data")
		store_pref(obj);

	});
}

function store_pref(obj){
	chrome.storage.sync.set(obj, function() {
	// Notify that we saved.
		console.log("saved! ")
		console.log(obj)
	});
}

