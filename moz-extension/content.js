//alert("Hello from your Chrome extension!")
var links=document.getElementsByTagName('a'), hrefs = [];
var links_string = "";

let myPort = browser.runtime.connect({name:"port-from-cs"});
myPort.postMessage({greeting: "hello from content script"});

myPort.onMessage.addListener(function(m) {
  //console.log("In content script, received message from background script: ");
  //console.log(m.sentip);
  console.log("resolved: " + m.resolvedad)
});

document.body.addEventListener("click", function() {
  myPort.postMessage({greeting: "they clicked the page!"});
});

var getLocation = function(href) {
	var l = document.createElement("a");
	l.href = href;
	return l;
};

var isUriImage = function(uri) {
    //make sure we remove any nasty GET params 
    uri = uri.split('?')[0];
    //moving on now
    var parts = uri.split('.');
    var extension = parts[parts.length-1];
    var imageTypes = ['jpg','jpeg','tiff','png','gif','bmp']
    if(imageTypes.indexOf(extension) !== -1) {
        return true;   
    }
}

function preload_images() {
	var image_arr = document.getElementsByTagName('a'); 
	console.log("Inside preload()");
	var images = new Array();
	for (var i = 0; i < image_arr.length; i++) {
		console.log(image_arr[i].href);
		if(isUriImage(image_arr[i].href)){
			images.push(image_arr[i].href);
		console.log("this is an image\n");
		console.log(image_arr[i].href);	
		}
	}
	image_arr_final = new Array();
	for(i= 0 ;i<images.length;i++ ){
		console.log("Preloading now:");
		console.log(images[i]);
		console.log("\n===========\n");
		images_arr_final[i] = new Image();
        images_arr_fina[i].src  = images[i];
	}
}
//preload_images()

for (var i = 0; i<links.length; i++)
{   
	hrefs.push(links[i].href);
	console.log(links[i].href);	
	var l = getLocation(links[i].href);
	myPort.postMessage({hostname: l.hostname});
	console.log("hostname: " + l.hostname);
	function httpGet(theUrl)
	{
		var xmlHttp = new XMLHttpRequest();
		
		xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
		xmlHttp.setRequestHeader('Access-Control-Allow-Headers', '*');
    	
		xmlHttp.send( null );
    	return xmlHttp.responseText;
	}
	var httpGet_res = httpGet("http://api.konvert.me/forward-dns/www.google.com");
	links_string = links_string + "," + httpGet_res;
	}
//alert("The links on this page are :\n" + links_string);


