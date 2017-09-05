var NEWS_URLS = ["www.washingtonpost.com", "www.foxnews.com", "", "", ""]

$( document ).ready(function() {
	GetArticleSummary()
});

function GetArticleSummary(){
	var query = { active: true, currentWindow: true };
	chrome.tabs.query(query, getUrlFromTabs);
}

function getUrlFromTabs(tabs) {
  var currentTab = tabs[0]; // there will be only one in this array
  console.log(currentTab); // also has properties like currentTab.id
  var url = currentTab["url"]
  console.log(url)
  var pathArray = url.split( '/' );
  var baseurl = pathArray[2];
  console.log(baseurl)
  if (NEWS_URLS.indexOf(baseurl) > -1){

  	console.log("Logging from popup.js")
  	$('#popup-summary').text("This is a summary THO!!!")

  }
  else{
  	// This is not a site we care about.
  	$('#popup-title').text("We don't care about this site and neither should you.");
  	$('#popup-link-to-source').hide();
  	$('#popup-summary').hide();

  }
}