var NEWS_URLS = ["www.washingtonpost.com", "www.foxnews.com", "", "", ""]
var ARTICLE_SUMMARIES = 
{
	"http://www.foxnews.com/us/2017/08/31/harvey-scams-abound-as-crooks-prey-on-disaster-victims-and-altruistic-americans.html":
	{
		"link":"https://www.washingtonpost.com/news/posteverything/wp/2017/08/31/poor-texans-are-going-to-suffer-the-most-in-harvey-thanks-to-state-politics/",
		"summary":"Victims of Tropical Storm Harvey found shelter in the Max Bowl bowling alley of Port Arthur, Tex. This bill, drafted by state Sen. Kelly Hancock, (R-North Richland Hills) and signed into law recently by Gov. Greg Abbott, will drastically limit homeowners' ability to combat underpayment and late payment on their flood insurance claims. And Texas has just given their insurance companies the edge. Demand federal climate legislation, demand your own cities prepare for the challenges ahead, and send us help any way you can."
	},
	"https://www.washingtonpost.com/news/posteverything/wp/2017/08/31/poor-texans-are-going-to-suffer-the-most-in-harvey-thanks-to-state-politics/":
	{
		"link":"http://www.foxnews.com/us/2017/08/31/harvey-scams-abound-as-crooks-prey-on-disaster-victims-and-altruistic-americans.html",
		"summary":"Targeting both Harvey victims and those looking to donate to relief efforts, scam artists are using the storm - and people's sense of charity - the swindle thousands of dollars from unwitting targets.\nThere have been numerous reports of people receiving phone calls, text messages, emails or posts on their social media accounts that ask for money for Harvey relief efforts.\nPhishing Scams: Hard to avoid and even harder to trace, email phishing scams have become the con of choice for hackers looking to rip-off altruistic Americans.\nThese crooks send out messages via email or social media with links that promise to help you aid Harvey victims.\nAlso another red flag is groups asking for money transfers as most legitimate organizations don't solicit these types of donations."
	}
}

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
  if (url.indexOf("?") > -1){
  	url=url.substring(0,url.indexOf("?"))
  }
  console.log("URL without ?")
  console.log(url)
  if (Object.keys(ARTICLE_SUMMARIES).indexOf(url) > -1){
  	var link = ARTICLE_SUMMARIES[url]["link"]
  	var newbaselink = link.split( '/' )[2];
  	$('#popup-title').text("Hey, we see you are looking at an article on " + baseurl + ".");
  	$('#popup-title').show();

  	$('#popup-link-to-source').text("Check out this article on " + newbaselink + " instead.");
  	$('#popup-link-to-source').attr("href", link);
  	$('#popup-link-to-source').show();


  	var summary = ARTICLE_SUMMARIES[url]["summary"]
  	$('#popup-summary').text(summary);
  	$('#popup-summary').show();


  }
  else if (NEWS_URLS.indexOf(baseurl) > -1){

  	$('#popup-title').text("Hey, we have suggestions for your on this site.");
  	$('#popup-link-to-source').hide();
  	$('#popup-summary').text("Keep an eye on the logo. If it changes color, click the icon for a link to an article of a different viewpoint.");

  }
  else{
  	// This is not a site we care about.
  	$('#popup-title').text("We don't care about this site and neither should you.");
  	$('#popup-link-to-source').hide();
  	$('#popup-summary').hide();

  }
}