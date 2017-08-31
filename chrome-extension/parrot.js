var NEWS_URLS = ["", "", "", "", ""]


window.onload=CheckUrl

function CheckUrl(){
	console.log("THIS IS FROM PARROT!");
	var pathArray = location.href.split( '/' );
	//var protocol = pathArray[0];
	var baseurl = pathArray[2];
	//var url = protocol + '//' + host;
	console.log(baseurl)



	//CHECK IF URL IS IN OUR LIST OF HARD CODED SOURCES
	//IF IT IS, THEN LAUNCH THE POPUP.
}