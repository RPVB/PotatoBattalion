console.log("test");


var targets = [] // holds links
var spritzObject = false;

window.onload = function(){
	findLinks();
}


function findLinks(){
	var links = document.body.getElementsByTagName("a");
	hookOnLinks(links);
}

function hookOnLinks(links){
	for(var i = 0; i < links.length; i++){
		link = links[i];
		url = link.getAttribute("href");

		if(validUrl(url)){
			targets.push({"dom":link,"url":url});	
			link.addEventListener("mouseover", hover, false);
		}
	}
}

function hover(event){
	var target = event.target;
	getData(target.getAttribute("href"),function(data){
		sendToSpritz(data);
	});
}


var fetchedData = {};

function getData(url, callback){

	if(url in fetchedData){
		callback(fetchedData[url])
		return;
	}


	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(callback) {
	    if (xhr.readyState == 4) {
	    	fetchedData[url] = xhr.responseText;
	        callback(xhr.responseText);
	    }
	}.bind(null, callback)
	xhr.open('GET', 'load.php?url='+url, true);
	xhr.send(null);

}

function sendToSpritz(data){
	create_spritz(data, function(spritz){

		var spritzHolder = document.getElementById("spritz_holder");
		spritzHolder.addEventListener("mouseout", spritz.stopHover, false); 
		
	});
}

function validUrl(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}