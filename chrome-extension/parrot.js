var NEWS_URLS = ["www.washingtonpost.com", "www.foxnews.com", "", "", ""]


window.onload=CheckUrl

function CheckUrl(){
	console.log("THIS IS FROM PARROT!");
	var pathArray = location.href.split( '/' );
	//var protocol = pathArray[0];
	var baseurl = pathArray[2];
	//var url = protocol + '//' + host;
	console.log(baseurl);
    console.log(NEWS_URLS.indexOf(baseurl));
	if (NEWS_URLS.indexOf(baseurl) > -1){
		popitup("popup.html")
	}

	//CHECK IF URL IS IN OUR LIST OF HARD CODED SOURCES
	//IF IT IS, THEN LAUNCH THE POPUP.
}

function popitup(url) {
	// newwindow=window.open(url,'name','height=200,width=150');
	// if (window.focus) {newwindow.focus()}
    chrome.runtime.sendMessage({ "newIconPath" : "img/ShootTheParrotLogo2_128.png" });
	return false;
}
